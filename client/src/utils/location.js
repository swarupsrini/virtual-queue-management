export const getCurLocation = () => {
  return new Promise((res) => {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        res({ lat: result.coords.latitude, long: result.coords.longitude });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
};
