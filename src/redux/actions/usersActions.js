import axios from 'axios';
import { ERROR } from '../../utils/consts/notificationTypes';
import { showNotification } from './../../UI/notificationToast';
import { SET_USER_PROFILE, LOADING_USER_PROFILE } from './../actions/types';


export const fetchUserProfile = () => (dispatch) => {
    dispatch({ type: LOADING_USER_PROFILE });
    axios.get('https://www.mutual-aid.me/api/v1.0/user/profile')
    .then((response) => {
        dispatch({ type: SET_USER_PROFILE, payload: response.data });
    })
    .catch((error) => {
        if(error.response) showNotification(error.response.data, ERROR);
    })
}

export const uploadImage = (formData) => (dispatch) => {
    //dispatch({ type: LOADING_USER });
    axios.post('https://www.mutual-aid.me/api/v1.0/images', formData)
    .then((res) => {
      console.log(res)
    //dispatch(getUserData());
    })
    .catch((err) => console.log(err));
  };