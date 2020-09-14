export const setLocalStorageAuth = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isAuth", true);
  };
  
export const emptyLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
  };