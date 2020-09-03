import axios from 'axios';
import { convertingTagsToAnArray } from './../../utils/dataManipulation/postQueries';
import {
    CREATE_POST,
    IS_POST_CREATE_LOADING,
    CREATE_POST_ERROR,
    FETCH_ALL_POSTS,
} from "./types";
import { showNotification } from './../../UI/notificationToast';
import { SUCCESS, ERROR } from '../../utils/consts/notificationTypes';

export const createPost = (postTitle, postContent, tagsValue, postImage) => (dispatch) => {
    dispatch({ type: IS_POST_CREATE_LOADING }); 

    const formData = new FormData();
    formData.append("image", postImage);

    axios.post('http://46.101.210.202/api/v1.0/images', formData)
    .then(function (response) {
        const imageURL = response.data;
        axios.post('http://46.101.210.202/api/v1.0/posts', {
            "title" : postTitle,
            "content" : postContent,
            "tags": convertingTagsToAnArray(tagsValue),
            "imageURL" : imageURL,
        })
        .then(response => {
            if(response.data.error) { 
                showNotification(response.data.message, ERROR);
                dispatch({ type: CREATE_POST_ERROR });
            } else {
                dispatch({ type: CREATE_POST, payload: { post: response.data.post } });
                showNotification(response.data.message, SUCCESS);
            }
        })
    })
    .catch(error => {
        dispatch({ type: CREATE_POST_ERROR });
        showNotification(
            "Something went wrong. Please try to submit a post again later.",
            ERROR);
        console.log(error);
    });
}

export const fetchAllPosts = () => (dispatch) => {
    axios.get('http://46.101.210.202/api/v1.0/posts')
    .then(function (response) {
        dispatch({ type: FETCH_ALL_POSTS, payload: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })
}