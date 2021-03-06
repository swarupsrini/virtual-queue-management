/* Utility functions to help with back-end calls and global information. */
import datetime from "date-and-time";

export const REFRESH_INTERVAL = 3000;
// In minutes
export const AVG_WAIT_TIME_SCALE = 3;

// const base = "http://localhost:5000";
const base = "";

const fetchOptions = {
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
  // credentials: "include", // REMOVE IF BUILDING
};

export const readCookie = (setCurrentUser) => {
  const url = base + "/check-session";

  fetch(url, { ...fetchOptions })
    .then((res) => {
      if (res.status === 200) return res.json();
      else throw "Check session failed";
    })
    .then((res) => {
      if (res && res.currentUser) {
        setCurrentUser({ currentUser: res.currentUser, __t: res.__t });
      }
    })
    .catch((error) => {
      console.log(error);
      setCurrentUser(null);
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

export const logout = () => {
  const url = base + "/logout";
  fetch(url, {
    ...fetchOptions,
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
            name: "Default",
            address:
              "Please visit the settings page to set your store's settings.",
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
          .then((res) => console.log("created store:", res))
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUserById = async (id, setUser) => {
  const url = base + `/getUserById?user_id=${id}`;
  fetch(url, {
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      setUser(res);
    });
};

export const getStoreById = async (id, setStore) => {
  const url = base + `/getStoreById?store_id=${id}`;
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
  const url = base + "/getUserStore";
  fetch(url, { ...fetchOptions })
    .then((res) => {
      if (res.status === 200) return res.json();
      if (res.status === 400) throw "getUserStore failed!";
    })
    .then((res) => {
      setUser(res.user);
      if (res.store) setStore(res.store);
    })
    .catch((e) => console.error(e));
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

export const saveUserSettingsCall = async (user, setUser) => {
  getUserStore(
    (cur_user) => {
      let ext = "";
      if (cur_user.__t === "Admin") {
        ext = "/updateUserAdmin";
      } else {
        ext = "/updateUser";
      }
      const url = base + ext;
      fetch(
        url,
        Object.assign({}, fetchOptions, {
          method: "PATCH",
          body: JSON.stringify(user),
        })
      ).then((res) => {
        if (res.status === 200) alert("Your settings have been updated!");
        else if (res.status === 402) {
          alert("Wrong password");
          throw "Wrong password";
        } else if (res.status === 403) {
          alert("These credentials have been taken!");
          throw "Signup credentials have been taken!";
        }
      });
    },
    () => {}
  );
};

export const saveStoreSettingsCall = async (store, setStore) => {
  getUserStore(
    () => {},
    (backEndStore) => {
      const url = base + `/updateStore?store_id=${backEndStore._id}`;
      console.log(store.employee_ids);
      fetch(
        url,
        Object.assign({}, fetchOptions, {
          method: "PATCH",
          body: JSON.stringify({
            name: store.name,
            address: store.address,
            open_time: datetime.format(store.open_time, "hh:mm:ss A"),
            close_time: datetime.format(store.close_time, "hh:mm:ss A"),
            owner_id: store.owner_id,
            employee_ids: store.employee_ids,
            lat: store.lat,
            long: store.long,
            //lat long verified in store
          }),
        })
      ).then((res) => {
        if (res.status === 200) alert("Your settings have been updated!");
      });
    }
  );
  return [];
};

export const saveStoreSettingsCallAdmin = async (store, setStore) => {
  const url = base + `/updateStore?store_id=${store._id}`;
  fetch(
    url,
    Object.assign({}, fetchOptions, {
      method: "PATCH",
      body: JSON.stringify({
        name: store.name,
        address: store.address,
        open_time: datetime.format(store.open_time, "hh:mm:ss A"),
        close_time: datetime.format(store.close_time, "hh:mm:ss A"),
        owner_id: store.owner_id,
        employee_ids: store.employee_ids,
        lat: store.lat,
        long: store.long,
        //lat long verified in store
      }),
    })
  ).then((res) => {
    if (res.status === 200) alert("Your settings have been updated!");
  });
  return [];
};

export const deactivateQueueCall = async (store, setStore) => {
  console.log("deactivating");
  const url = base + `/queueChanged?store_id=${store._id}`;
  const newStore = {
    ...store,
    activated: !store.activated,
  };
  console.log(newStore);
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify(newStore),
    ...fetchOptions,
  })
    .then((res) => {
      setStore(newStore);
    })
    .catch((error) => console.log(error));
};

export const customerChangedCall = async (store, setStore, inc) => {
  console.log("customer changed call");
  const url = base + `/queueChanged?store_id=${store._id}`;
  const newStore = {
    ...store,
    in_store: store.in_store + inc < 0 ? 0 : store.in_store + inc,
  };
  console.log(newStore);
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify(newStore),
    ...fetchOptions,
  })
    .then((res) => {
      console.log("return from response");
      console.log(res);
      setStore(newStore);
    })
    .catch((error) => console.log(error));
};

export const grantVerificationCall = async (store, setStore, verified) => {
  console.log("grant verification");
  const url = base + `/queueChanged?store_id=${store._id}`;
  const newStore = {
    ...store,
    verified: verified,
    open_time:
      store.open_time instanceof Date
        ? datetime.format(store.open_time, "hh:mm:ss A")
        : store.open_time,
    close_time:
      store.close_time instanceof Date
        ? datetime.format(store.close_time, "hh:mm:ss A")
        : store.close_time,
  };
  console.log(newStore);
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify(newStore),
    ...fetchOptions,
  })
    .then((res) => {
      setStore({
        ...newStore,
        open_time:
          store.open_time instanceof String
            ? datetime.parse(store.open_time, "hh:mm:ss A")
            : store.open_time,
        close_time:
          store.close_time instanceof String
            ? datetime.parse(store.close_time, "hh:mm:ss A")
            : store.close_time,
      });
    })
    .catch((error) => console.log(error));
};

export const getQueue = async (store, setStore) => {
  store.queue = [];
  store.customer_visits.forEach((e) => {
    if (e.exit_time === "" || e.exit_time === null) {
      store.queue.push(e);
    }
  });
  store.queue.sort((a, b) =>
    datetime.subtract(a.entry_time, b.entry_time).toSeconds()
  );
  store.in_queue = store.queue.length;
  setStore(store);
};

export const getForeCastWaitTime = async (store, setStore, id) => {
  const pos = store.queue.findIndex((e) => e.user_id === id);
  const position = pos < 0 ? 0 : pos;
  console.log(position);
  store.forecast_wait_time = position * AVG_WAIT_TIME_SCALE;
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
    })
    .catch((error) => {
      console.log("ERRORRR");
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
          n.exit_time !== ""
            ? datetime.parse(n.exit_time, "MMM D YYYY hh:mm:ss A")
            : null;
        return n;
      });
      store.customer_visits = res;
      setStore(store);
    });
};

export const joinQueue = (store_id) => {
  const url = base + "/joinQueue";
  fetch(
    url,
    Object.assign({}, fetchOptions, {
      method: "POST",
      body: JSON.stringify({
        store_id: store_id,
        entry_time: datetime.format(new Date(), "MMM D YYYY hh:mm:ss A"),
        exit_time: "",
      }),
    })
  );
};

export const updateEvent = (event) => {
  const url = base + "/updateEvent";
  const event1 = {
    ...event,
    entry_time: datetime.format(event.entry_time, "MMM D YYYY hh:mm:ss A"),
    exit_time:
      event.exit_time === null
        ? ""
        : datetime.format(event.exit_time, "MMM D YYYY hh:mm:ss A"),
  };
  console.log(JSON.stringify(event1));
  fetch(url, {
    method: "post",
    body: JSON.stringify(event1),
    ...fetchOptions,
  });
};

export const exitQueue = () => {
  const url = base + "/exitQueue";
  fetch(
    url,
    Object.assign({}, fetchOptions, {
      method: "POST",
      body: JSON.stringify({
        exit_time: datetime.format(new Date(), "MMM D YYYY hh:mm:ss A"),
      }),
    })
  );
};

export const getEventsByStoreIdSync = (storeID) => {
  const url = base + `/getEventsByStoreId?store_id=${storeID}`;
  return fetch(url, {
    ...fetchOptions,
  });
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
  const url = base + `/queueChanged?store_id=${store._id}`;
  console.log("send announcment");
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      ...store,
      announcement: msg,
    }),
    ...fetchOptions,
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const getCurrentUser = (setUser) => {
  const url = base + `/getCurrentUser`;
  fetch(url, {
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setUser(res);
    });
};

export const getStoreIdFromJoinedQueue = (callback) => {
  const url = base + "/getStoreIdFromJoinedQueue";
  fetch(url, {
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res.store_id);
    })
    .catch((error) => {
      callback("exited");
      console.log(error);
    });
};

export const getUserId = (callback) => {
  const url = base + "/getUserId";
  fetch(url, {
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res.user_id);
    })
    .catch((error) => {
      callback("default");
      console.log(error);
    });
};

export const getFancyQueue = (callback) => {
  const url = base + "/getFancyQueue";
  fetch(url, {
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res.queue);
    })
    .catch((error) => {
      console.log(error);
      callback([]);
    });
};

export const deleteUser = () => {
  const url = base + `/deleteUser`;
  console.log("a");
  fetch(url, {
    method: "delete",
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {})
    .catch((error) => {
      console.log(error);
    });
};

export const checkValidEmployee = (username, callback) => {
  const url = base + `/checkValidEmployee?username=${username}`;
  fetch(url, {
    method: "get",
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      callback(res);
    })
    .catch((error) => {
      callback({ valid: "incorrect" });
    });
};
