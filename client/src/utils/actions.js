/* Utility functions to help with back-end calls and global information. */

export const REFRESH_INTERVAL = 3000;

export const login = (setUser, data) => {
  // call backend to login, get the user (if valid) and call the setUser
  // to set it to the returned value
  if (
    (data.userName === "user" && data.password === "user") ||
    (data.userName === "admin" && data.password === "admin")
  ) {
    setUser({ username: data.userName });
    return true;
  }
};

export const signup = (setUser, data) => {
  // call backend to sign up, get the user (if valid) and call the setUser
  // to set it to the returned value
  // if backend returns error for some of the fields, then return an array
  // of all the string names of the fields errorring
  setUser({ username: data.userName });
  return true;
};

export const getUserStore = async (setUser, setStore) => {
  setUser({ username: "hello" });
  setStore({
    id: 1,
    name: "Walmart",
    address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
    inStore: 54,
    inQueue: 10,
    customer_visits: [
      {user_id: "1001", time_of_entry: new Date(2020, 8, 11)}
    ]
  });
};

export const deactivateQueueCall = async (setStore) => {};

export const emptyQueueCall = async (setStore) => {
  setStore({
    id: 1,
    name: "Walmart",
    address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
    inStore: 54,
    inQueue: 0,
  });
};

export const customerExitedCall = async (setStore) => {};

export const getNumVisitsToday = async (store, setStore) => {
  const dayStart = new Date()
  dayStart.setHours(0)
  dayStart.setMinutes(0)
  dayStart.setSeconds(0)

  let num_visits_today = 0
  while(num_visits_today < store.customer_visits.length &&
    dayStart < store.customer_visits[num_visits_today].time_of_entry){
    num_visits_today+=1
  }
  store.num_visits_today = num_visits_today
  setStore(store)
};
