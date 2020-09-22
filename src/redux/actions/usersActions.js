import axios from 'axios';
import { ERROR, SUCCESS } from '../../utils/consts/notificationTypes';
import { showNotification } from './../../UI/notificationToast';
import { 
    SET_USER_PROFILE, 
    LOADING_USER_PROFILE, 
    SET_PROFILE_IMAGE, 
    LOADING_PROFILE_IMAGE,
    SET_USER_DETAILS,
    LOADING_USER_DETAILS,
    SET_USER_LIKES,
} from './../actions/types';


export const fetchUserProfile = (token) => (dispatch) => {
    dispatch({ type: LOADING_USER_PROFILE });
    axios.get('https://www.mutual-aid.me/api/v1.0/user/profile',{
        headers: {
            "auth-token": token,
        }
    })
    .then((response) => {
        dispatch({ type: SET_USER_PROFILE, payload: response.data });
    })
    .catch((error) => {
        if(error.response) showNotification(error.response.data, ERROR);
    })
};

export const uploadImage = (token, formData, userID) => (dispatch) => {
    dispatch({ type: LOADING_PROFILE_IMAGE });
    axios.post('https://www.mutual-aid.me/api/v1.0/images', formData)
    .then((response) => {
        const imageURL = response.data;
        dispatch({ type: SET_PROFILE_IMAGE, payload: { imageURL }});
        axios.put(`https://www.mutual-aid.me/api/v1.0/user/${userID}`,
        {
            user: {imageURL},
        },
        {
            headers: {
                "auth-token": token,
            }
        })
        .then((response) => {
            showNotification(response.data, SUCCESS)
        })
        .catch((error) => {
            if(error.response) showNotification(error.response.data, ERROR);
        })
    })
    .catch((error) => {
        if(error.response) showNotification(error.response.data, ERROR);
    })
};

export const editUserDetails = (token, user, userID) => (dispatch) => {
    dispatch({ type:LOADING_USER_DETAILS });
    axios.put(`https://www.mutual-aid.me/api/v1.0/user/${userID}`, 
        {
            user
        },
        {
            headers: {
                "auth-token": token,
            }
        })
        .then((response) => {
            dispatch({ type: SET_USER_DETAILS, payload: { user }});
            showNotification(response.data, SUCCESS)
        })
        .catch((error) => {
            if(error.response) showNotification(error.response.data, ERROR);
        })
};

export const fetchUserLikes = (token) => (dispatch) => {
    axios.get('https://www.mutual-aid.me/api/v1.0/likes',{
        headers: {
            "auth-token": token,
        }
    })
    .then((response) => {
        dispatch({ type: SET_USER_LIKES, payload: {likes: response.data} });
    })
    .catch((error) => {
        if(error.response) showNotification(error.response.data, ERROR);
    })
}