/* Utility functions to help with back-end calls and global information. */

import datetime from "date-and-time";

export const REFRESH_INTERVAL = 3000;
// In minutes
export const AVG_WAIT_TIME = 3;

const base = "http://localhost:5000";

const fetchOptions = {
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
  credentials: "include", // REMOVE IF BUILDING
};

export const readCookie = (setCurrentUser) => {
  const url = base + "/check-session";

  fetch(url, { ...fetchOptions })
    .then((res) => {
      if (res.status === 200) return res.json();
    })
    .then((res) => {
      if (res && res.currentUser) {
        setCurrentUser({ currentUser: res.currentUser, __t: res.__t });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const login = (setUser, data) => {
  const url = base + "/login";
  fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    ...fetchOptions,
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      else {
        alert("Invalid login credentials!");
        throw "Invalid login credentials!";
      }
    })
    .then((res) => {
      setUser(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signup = (setUser, data) => {
  let url = base;
  if (data.__t === "visitor") url += "/newCustomer";
  else if (data.__t === "owner") url += "/newOwner";
  else if (data.__t === "employee") url += "/newEmployee";
  else console.error("Invalid user type in signup");

  fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    ...fetchOptions,
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      if (res.status === 403) {
        alert("These credentials have been taken!");
        throw "Signup credentials have been taken!";
      }
    })
    .then((res) => {
      login(setUser, data);
      return res;
    })
    .then((res) => {
      if (data.__t === "owner") {
        const url1 = base + "/newStore";
        fetch(url1, {
          method: "post",
          body: JSON.stringify({
            name: "Default Store",
            address: "Default Address",
            verified: false,
            owner_id: res._id,
            employee_ids: [],
            open_time: "09:00:00 AM",
            close_time: "05:00:00 PM",
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => console.log("created store:", res));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserById = async (id, setUser) => {
  const url = `http://localhost:5000/getUserById?user_id=${id}`;
  fetch(url, {
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      setUser(res);
    });
};

export const getStoreById = async (id, setStore) => {
  const url = `http://localhost:5000/getStoreById?store_id=${id}`;
  fetch(url, {
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      const temp = datetime.parse(res.open_time, "hh:mm:ss A");
      const temp2 = datetime.parse(res.close_time, "hh:mm:ss A");
      res.open_time = temp;
      res.close_time = temp2;
      setStore(res);
    });
};

export const getUserStore = async (setUser, setStore) => {
  setUser({
    username: "user",
    email: "user@user.com",
    password: "user",
    phone_number: "123",
  });
  const store = {
    id: 1,
    owner_id: "1",
    name: "Walmart",
    address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
    employee_ids: [],
    in_store: 54,
    open_time: datetime.parse("09:00:00 AM", "hh:mm:ss A"),
    close_time: datetime.parse("08:00:00 PM", "hh:mm:ss A"),
    customer_visits: [
      {
        user_id: "1001",
        entry_time: datetime.parse(
          "Aug 14 2020 06:00:00 PM",
          "MMM D YYYY hh:mm:ss A"
        ),
        exit_time: "",
      },
      {
        user_id: "1001",
        entry_time: datetime.parse(
          "Aug 14 2020 05:00:00 PM",
          "MMM D YYYY hh:mm:ss A"
        ),
        exit_time: "",
      },
      {
        user_id: "1001",
        entry_time: datetime.parse(
          "Aug 14 2020 04:00:00 PM",
          "MMM D YYYY hh:mm:ss A"
        ),
        exit_time: "",
      },
      {
        user_id: "1001",
        entry_time: datetime.parse(
          "Aug 14 2020 03:00:00 PM",
          "MMM D YYYY hh:mm:ss A"
        ),
        exit_time: datetime.parse(
          "Aug 14 2020 03:10:00 PM",
          "MMM D YYYY hh:mm:ss A"
        ),
      },
      {
        user_id: "1001",
        entry_time: datetime.parse(
          "Aug 14 2020 02:00:00 PM",
          "MMM D YYYY hh:mm:ss A"
        ),
        exit_time: datetime.parse(
          "Aug 14 2020 02:10:00 PM",
          "MMM D YYYY hh:mm:ss A"
        ),
      },
      {
        user_id: "1001",
        entry_time: datetime.parse(
          "Aug 14 2020 01:00:00 PM",
          "MMM D YYYY hh:mm:ss A"
        ),
        exit_time: datetime.parse(
          "Aug 14 2020 01:10:00 PM",
          "MMM D YYYY hh:mm:ss A"
        ),
      },
    ],
  };
  getQueue(store, () => {});
  getForeCastWaitTime(store, () => {});
  setStore(store);
};

export const resetStoreCall = async (setStore) => {
  setStore({
    id: 1,
    owner_id: "1",
    name: "Walmart",
    address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
    employee_ids: [],
    open_time: datetime.parse("09:00:00 AM", "hh:mm:ss A"),
    close_time: datetime.parse("08:00:00 PM", "hh:mm:ss A"),
  });
};

export const saveUserSettingsCall = async (
  user,
  setUser,
  setUserError,
  setPhoneError,
  setEmailError,
  setPassError,
  setNewPassError
) => {
  const url = `http://localhost:5000/updateUser`;
  fetch(url, Object.assign({}, fetchOptions, {
    method: 'PATCH',
    body: JSON.stringify(user)
  }))
  // call backend to set 'user', if any errors set them
  return [];
};

export const saveStoreSettingsCall = async (
  store,
  setStore,
  storeError,
  addressError,
  openTimeError,
  closeTimeError
) => {
  console.log(store)
  const url = `http://localhost:5000/updateStore?store_id=${store.id}`;
  fetch(url, Object.assign({}, fetchOptions, {
    method: 'PATCH',
    body: JSON.stringify(store)
  }))
  // call backend to set 'store', if any errors set them
  return [];
};

export const deactivateQueueCall = async (setStore) => {};

export const emptyQueueCall = async (setStore) => {
  setStore({
    id: 1,
    name: "Walmart",
    address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
    in_store: 54,
    in_queue: 0,
  });
};

export const customerExitedCall = async (setStore) => {
  setStore((store) => ({ ...store, in_store: store.in_store - 1 }));
};

export const getQueue = async (store, setStore) => {
  let i = 0;
  while (
    i < store.customer_visits.length &&
    (store.customer_visits[i].exit_time == "" ||
      store.customer_visits[i].exit_time == null)
  ) {
    i++;
  }
  store.queue = store.customer_visits.slice(0, i);
  store.in_queue = store.queue.length;
  setStore(store);
};

export const getForeCastWaitTime = async (store, setStore) => {
  const queue_size = store.queue.length;
  store.forecast_wait_time = queue_size * AVG_WAIT_TIME;
  setStore(store);
};

export const getAllStores = () => {
  const url = base + "/getAllStores";
  return fetch(url, {
    ...fetchOptions,
  });
};

export const getUserFavStores = (callback) => {
  const url = base + "/getUserFavStores";
  return fetch(url, {
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res);
    });
};

export const getAllUsers = () => {
  const url = base + "/getAllUsers";
  return fetch(url, {
    ...fetchOptions,
  });
};

export const getEventsByStoreId = (store, setStore) => {
  const url = base + `/getEventsByStoreId?store_id=${store._id}`;
  fetch(url, {
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      res.map((n) => {
        n.entry_time = datetime.parse(n.entry_time, "MMM D YYYY hh:mm:ss A");
        n.exit_time =
          n.exit_time != ""
            ? datetime.parse(n.exit_time, "MMM D YYYY hh:mm:ss A")
            : null;
        return n;
      });
      store.customer_visits = res;
      setStore(store);
    });
};

export const joinQueue = (user_id, store_id) => {
  const url = `http://localhost:5000/newEvent`;
  fetch(url, Object.assign({}, fetchOptions, {
    method: 'POST',
    body: JSON.stringify({
      store_id: store_id,
      user_id: user_id,
      entry_time: datetime.format(new Date(), "MMM D YYYY hh:mm:ss A"),
      exit_time: "",
    })
  }))
};

export const getDistance = (userLat, userLong, storeLat, storeLong) => {
  const url =
    base +
    `/getDistance?fromLat=${userLat}&fromLong=${userLong}&toLat=${storeLat}&toLong=${storeLong}`;

  return fetch(url, {
    ...fetchOptions,
  });
};

export const updateUserFavs = (callback, bool, store_id) => {
  const url = base + `/updateUserFavStores?bool=${bool}&store_id=${store_id}`;
  fetch(url, {
    method: "post",
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res);
    });
};

export const sendAnnouncement = (store, msg) => {
  // call backend to send announcement for the store
};