import axios from 'axios';
import {
    REGISTER_LOADING,
    CREATE_USER,
    REGISTER_FAIL,
    IS_AUTH_LOADING,
    AUTH_ERROR,
    SIGN_IN,
    LOGOUT_SUCCESS,
} from './types';
import {
    setLocalStorageAuth,
    emptyLocalStorage,
} from "../../utils/consts/authConsts";
import { showNotification } from './../../UI/notificationToast';
import { SUCCESS, ERROR } from '../../utils/consts/notificationTypes';

export const createUser = (userName, email, password) => (dispatch) => {
    console.log(userName, email, password)
    dispatch({ type: REGISTER_LOADING }); 
    axios.post('https://www.mutual-aid.me/api/v1.0/user/register', {
        "email": email,
        "password": password,
        "user_name": userName
    })
    .then(response => {
            dispatch({ type: CREATE_USER });
            showNotification("User registration has succeeded!", SUCCESS);
    })
    .catch(error => {
        if(error.response) showNotification(error.response.data, ERROR);
        dispatch({ type: REGISTER_FAIL });
    });
};

export const signIn = (password, email, history) => (dispatch) => {
    dispatch({ type: IS_AUTH_LOADING });
    axios.post('https://www.mutual-aid.me/api/v1.0/user/login', {
        "email": email,
        "password": password
    })
    .then(response => {
            const token = response.data;
            setLocalStorageAuth(token);
            axios.defaults.headers.common["auth-token"] = token;
            dispatch({ type: SIGN_IN, payload:{ token } });
            history.push({pathname: `/main`});
    })
    .catch(error => {
        if(error.response) showNotification(error.response.data, ERROR);
        dispatch({ type: AUTH_ERROR });
        emptyLocalStorage();
    });
};

export const logout = () => {
    emptyLocalStorage();
    return {
      type: LOGOUT_SUCCESS,
    };
  };