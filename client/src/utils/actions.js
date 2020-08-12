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
      {user_id: "1001", entry_time: new Date(2020, 8, 11)}
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
    dayStart < store.customer_visits[num_visits_today].entry_time){
    num_visits_today+=1
  }
  store.num_visits_today = num_visits_today
  setStore(store)
};

export const getAvgAdmissions = async (store, setStore) => {
  //Event.findById(store.id).then((store) => {console.log(store)}
  const hour_to_num_admissions = {}
  for(let i=store.open_time;i<store.close_time;i++){
    hour_to_num_admissions[i] = 0
  }
  let num_days = 0
  let last_day = 0;
  let last_month = 0;
  let last_year = 0;
  for(let i=0;i<store.customer_visits.length;i++){
    const visit = store.customer_visits[i].entry_time
    const visit_hour = visit.getHours()
    
    if(visit.getDay() != last_day || visit.getMonth() != last_month || visit.getYear() != last_year){
      last_day = visit.getDay()
      last_month = visit.getMonth()
      last_year = visit.getYear()
      num_days+=1
    }
    hour_to_num_admissions[visit_hour] += 1
  }
  for(let i=store.open_time;i<store.close_time;i++){
    hour_to_num_admissions[i] = hour_to_num_admissions[i]/num_days
  }

  store.avg_num_admissions = hour_to_num_admissions
  setStore(store)
};

export const getLeastBusyTime = async (store, setStore) => {
  let least_busy_time = null;
  let least_num_admissions = null;
  for(let i=store.open_time;i<store.close_time;i++){
    const num_admissions = store.avg_num_admissions[i]
    if(least_busy_time == null || num_admissions < least_num_admissions){
      least_busy_time = i
      least_num_admissions = num_admissions
    }
  }
  store.least_busy_time = least_busy_time
  setStore(store)
}

export const getMostBusyTime = async (store, setStore) => {
  let most_busy_time = null;
  let most_num_admissions = null;
  for(let i=store.open_time;i<store.close_time;i++){
    const num_admissions = store.avg_num_admissions[i]
    if(most_busy_time == null || num_admissions > most_num_admissions){
      most_busy_time = i
      most_num_admissions = num_admissions
    }
  }
  store.most_busy_time = most_busy_time
  setStore(store)
}

export const getForeCastWaitTime = async (store, setStore) => {
  store.forecast_wait_time = 20
  setStore(store)
}