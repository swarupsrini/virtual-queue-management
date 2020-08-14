/* Utility functions to help with back-end calls and global information. */

import datetime from "date-and-time";

export const REFRESH_INTERVAL = 3000;
// In minutes
export const AVG_WAIT_TIME = 3;

const base = "http://localhost:5000";

export const readCookie = (setCurrentUser) => {
  const url = base + "/check-session";

  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res && res.currentUser) {
        console.log({ currentUser: res.currentUser, __t: res.__t });
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
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      else {
        alert("Invalid credentials!");
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
  if (data.type === "visitor") url += "/newCustomer";
  else if (data.type === "owner") url += "/newOwner";
  else if (data.type === "employee") url += "/newEmployee";
  else console.error("Invalid user type in signup");

  console.log(data);

  fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      if (res.status === 403) {
        alert("These credentials have been taken!");
        throw "Signup credentials have been taken!";
      }
    })
    .then((res) => {
      login(setUser, res);
      return res;
    })
    .then((res) => {
      if (data.type === "owner") {
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
  setUser({
    username: "user",
    email: "user@user.com",
    password: "user",
    phone_number: "123",
  });
};

export const getStoreById = async (id, setStore) => {
  setStore({
    owner_id: "1",
    name: "Walmart",
    address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
    employee_ids: [],
    open_time: datetime.parse("09:00:00 AM", "hh:mm:ss A"),
    close_time: datetime.parse("08:00:00 PM", "hh:mm:ss A"),
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
    store.customer_visits[i].exit_time == ""
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
  const url = "http://localhost:5000/getAllStores";
  return fetch(url);
};

export const getAllUsers = () => {
  const url = "http://localhost:5000/getAllUsers";
  return fetch(url);
};

export const getDistance = (userLat, userLong, storeLat, storeLong) => {
  const url = `http://localhost:5000/getDistance?fromLat=${userLat}&fromLong=${userLong}&toLat=${storeLat}&toLong=${storeLong}`;

  return fetch(url);
};

export const sendAnnouncement = (store, msg) => {
  // call backend to send announcement for the store
};
