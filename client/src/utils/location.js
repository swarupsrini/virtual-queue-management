"use strict";

export const getCurLocation = (callback) => {
  new Promise((res) => {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        res(result.coords);
      },
      () => {},
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }).then((coords) => {
    callback({ lat: coords.latitude, long: coords.longitude });
  });
};
