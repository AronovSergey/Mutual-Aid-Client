import axios from 'axios';
import { convertingTagsToAnArray } from './../../utils/dataManipulation/postQueries';
import {
    CREATE_POST,
    IS_POST_CREATE_LOADING,
    CREATE_POST_ERROR,
    FETCH_ALL_POSTS,
    IS_ALL_POSTS_LOADING,
    FETCH_ALL_POSTS_ERROR,
    IS_SPECIFIC_POST_LOADING,
    FETCH_SPECIFIC_POSTS,
    FETCH_SPECIFIC_POST_ERROR,
} from "./types";
import { showNotification } from './../../UI/notificationToast';
import { SUCCESS, ERROR } from '../../utils/consts/notificationTypes';

export const createPost = (postTitle, postContent, tagsValue, postImage, token) => (dispatch) => {
    dispatch({ type: IS_POST_CREATE_LOADING }); 

    const formData = new FormData();
    formData.append("image", postImage);

    axios.post('https://www.mutual-aid.me/api/v1.0/images', formData)
    .then(function (response) {
        const imageURL = response.data;
        axios.post('https://www.mutual-aid.me/api/v1.0/posts', {
                "title" : postTitle,
                "content" : postContent,
                "tags": convertingTagsToAnArray(tagsValue),
                "imageURL" : imageURL,
            },
            {
                headers:{
                     "auth-token" : token 
                    } 
            },
        )
        .then(response => {
            dispatch({ type: CREATE_POST, payload: { post: response.data.post } });
            showNotification("Post submission has succeeded!", SUCCESS);
        })
        .catch(error => {
            if(error.response) showNotification(error.response.data, ERROR);
            dispatch({ type: CREATE_POST_ERROR });
        });
    })
    .catch(error => {
        if (error.response) showNotification(error.response.data, ERROR);
        dispatch({ type: CREATE_POST_ERROR });
    });
}

export const fetchAllPosts = (token) => (dispatch) => {
    dispatch({ type: IS_ALL_POSTS_LOADING });
    axios.get('https://www.mutual-aid.me/api/v1.0/posts', {
        headers:{ "auth-token" : token } 
    })
    .then((response) => {
        dispatch({ type: FETCH_ALL_POSTS, payload: response.data.posts});
    })
    .catch((error) => {
        if(error.response) showNotification(error.response.data, ERROR);
        dispatch({ type: FETCH_ALL_POSTS_ERROR });   
    });
}

export const fetchSpecificPost = (postID, token) => (dispatch) => {
    dispatch({ type: IS_SPECIFIC_POST_LOADING });
    axios.get(`https://www.mutual-aid.me/api/v1.0/posts/${postID}`, {
        headers:{ "auth-token" : token } 
    })
    .then((response) => {
        dispatch({ type: FETCH_SPECIFIC_POSTS, payload: { post: response.data.post } });
    })
    .catch((error) => {
        if(error.response) showNotification(error.response.data, ERROR);
        dispatch({ type: FETCH_SPECIFIC_POST_ERROR });
    });
}