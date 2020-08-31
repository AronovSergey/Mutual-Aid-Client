const axios = require('axios');



export const createPost = (postTitle, postContent) => { 
    axios.post('http://127.0.0.1:8080/api/v1.0/posts', {
        "title" : postTitle,
        "text" : postContent,
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    return { type: 'CREATE_POST', payload: { postTitle, postContent } }
}

export const fetchAllPosts = () => (dispatch) => {
    axios.get('http://127.0.0.1:8080/api/v1.0/posts')
    .then(function (response) {
        dispatch({ type: 'FETCH_ALL_POSTS', payload: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })
}