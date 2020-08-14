"use strict";
const log = console.log;
const { Store } = require("./models/store");
const { User } = require("./models/user");

function getAllStores(thenCallBack, errorCallback) {
  Store.find().then(thenCallBack).catch(errorCallback);
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
module.exports = { getStoreByID, getAllStores, getAllUsers, getUserByID };
