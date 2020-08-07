/* Utility functions to help with back-end calls and global information. */

export const REFRESH_INTERVAL = 3000;

export const login = (setUser, userName, password) => {
  // call backend to login, get the user (if valid) and call the setUser
  // to set it to the returned value
  setUser({ username: userName });
};
