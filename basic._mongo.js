"use strict";
const log = console.log;
const { Store } = require("./models/store");

function getAllStores(thenCallBack, errorCallback) {
  Store.find().then(thenCallBack).catch(errorCallback);
}

function getStoreByID(thenCallBack, errorCallback, storeID) {
  Store.findById(storeID).then(thenCallBack).catch(errorCallback);
}

module.exports = { getStoreByID, getAllStores };
