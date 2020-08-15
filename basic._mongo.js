"use strict";
const log = console.log;
const { Store } = require("./models/store");
const { User } = require("./models/user");
const { Event } = require("./models/events");

function getAllStores(thenCallBack, errorCallback) {
  Store.find({ lat: { $ne: 100 } })
    .then(thenCallBack)
    .catch(errorCallback);
}

function getAllUsers(thenCallBack, errorCallback) {
  User.find().then(thenCallBack).catch(errorCallback);
}

function getStoreByID(thenCallBack, errorCallback, storeID) {
  Store.findById(storeID).then(thenCallBack).catch(errorCallback);
}
function getUserByID(thenCallBack, errorCallback, userID) {
  User.findById(userID).then(thenCallBack).catch(errorCallback);
}

function getEventsByStoreID(thenCallBack, errorCallback, storeID) {
  Event.find({ store_id: storeID }).then(thenCallBack).catch(errorCallback);
}

function updateUser(thenCallBack, errorCallback, user_id, user) {
  User.findByIdAndUpdate(user_id, user).then(thenCallBack).catch(errorCallback);
}
function updateStore(thenCallBack, errorCallback, store_id, store) {
  Store.findByIdAndUpdate(store_id, store)
    .then(thenCallBack)
    .catch(errorCallback);
}

function getJoinedEventByUserID(thenCallBack, errorCallback, userID) {
  Event.find({ user_id: userID, exit_time: "" })
    .then(thenCallBack)
    .catch(errorCallback);
}

module.exports = {
  getStoreByID,
  getAllStores,
  getEventsByStoreID,
  getAllUsers,
  getUserByID,
  updateUser,
  updateStore,
  getJoinedEventByUserID,
};
