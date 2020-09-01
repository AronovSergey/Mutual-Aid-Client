const axios = require('axios');



export const createPost = (postTitle, postContent, postImage) => (dispatch) => { 
    const formData = new FormData();
    formData.append("image", postImage);

    axios.post('http://46.101.210.202/api/v1.0/images', formData)
    .then(function (response) {
        const imageURL = response.data;

        axios.post('http://46.101.210.202/api/v1.0/posts', {
            "title" : postTitle,
            "content" : postContent,
            "imageURL" : imageURL,
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    })
    .catch(function (error) {
        console.log(error);
    });

    return { type: 'CREATE_POST', payload: { postTitle, postContent } }
}

export const fetchAllPosts = () => (dispatch) => {
    axios.get('http://46.101.210.202/api/v1.0/posts')
    .then(function (response) {
        dispatch({ type: 'FETCH_ALL_POSTS', payload: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })
}