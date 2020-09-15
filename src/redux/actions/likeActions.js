import axios from 'axios';
import { showNotification } from './../../UI/notificationToast';
import { SUCCESS, ERROR } from '../../utils/consts/notificationTypes';

export const likeStatus = (postID, token) => (dispatch) => {
    axios.get(`https://www.mutual-aid.me/api/v1.0/likes/${postID}`, {
        headers:{ "auth-token" : token } 
    })
    .then((response) => {
        console.log(response.data)
        return(response.data)
    })
    .catch((error) => {
        if(error.response) showNotification(error.response.data, ERROR);
    });
}