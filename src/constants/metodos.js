export const user = () => {
  return sessionStorage.getItem(btoa("user"))
    ? JSON.parse(atob(sessionStorage.getItem(btoa("user"))))
    : null;
};
