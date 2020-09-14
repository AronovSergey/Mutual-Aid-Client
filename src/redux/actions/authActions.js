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

export const createUser = (firstName, lastName, email, password) => (dispatch) => {
    dispatch({ type: REGISTER_LOADING }); 
    axios.post('https://www.mutual-aid.me/api/v1.0/users', {
        "email": email,
        "password": password,
        "first_name": firstName,
        "last_name": lastName,
    })
    .then(response => {
        if(response.data.error) { 
            showNotification(response.data.message, ERROR);
            dispatch({ type: REGISTER_FAIL });
        } else {
            dispatch({ type: CREATE_USER });
            showNotification("User registration has succeeded!", SUCCESS);
        }
    })
    .catch(error => {
        showNotification(error.response.data, ERROR);
        dispatch({ type: REGISTER_FAIL });
    });
};

export const signIn = (password, email) => (dispatch) => {
    dispatch({ type: IS_AUTH_LOADING });
    axios.post('https://www.mutual-aid.me/api/v1.0/user/login', {
        "email": email,
        "password": password
    })
    .then(response => {
            const token = response.data;
            setLocalStorageAuth(token);
            dispatch({ type: SIGN_IN, payload:{ token } });
    })
    .catch(error => {
        //showNotification(error.response.data, ERROR);
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