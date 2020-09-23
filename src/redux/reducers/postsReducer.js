import {
    CREATE_POST,
    IS_POST_CREATE_LOADING,
    CREATE_POST_ERROR,
    FETCH_ALL_POSTS,
    IS_ALL_POSTS_LOADING,
    FETCH_ALL_POSTS_ERROR,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    IS_COMMENTS_LOADING,
    FETCH_POSTS_COMMENTS,
} from "../actions/types";

const initialState = {
    loading: false,
    fetched: true,
    error: false,
    //New post erea
    isPostBeingCreated: false,
    //Main page erea
    posts: [],
    //Comments erea 
    loadingComments: false,
    postComments: [],
};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case IS_POST_CREATE_LOADING:
            return {
                ...state,
                isPostBeingCreated: true,
            };
        case CREATE_POST:
            return {
                ...state,
                isPostBeingCreated: false,
                posts: [action.payload.post, ...state.posts],
            }
        case CREATE_POST_ERROR:
            return {
                ...state,
                isPostBeingCreated: false,
            };    
        case FETCH_ALL_POSTS:
            return{
                ...state,
                loading: false,
                fetched: true,
                posts: action.payload,
            };

        case IS_ALL_POSTS_LOADING:
            return {
                ...state,
                loading: true,
            };  
        case FETCH_ALL_POSTS_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };  
        case LIKE_POST:
        case UNLIKE_POST:
            const indexLike = state.posts.findIndex(
                (post) => post._id === action.payload.post._id);
            state.posts[indexLike] = action.payload.post; 
            return {
                ...state
            };
        case DELETE_POST:
            console.log(action.payload.postID)
            const indexDelete = state.posts.findIndex(
                post => post._id === action.payload.postID
            );
            console.log(indexDelete)
            state.posts.splice(indexDelete, 1);
            return {
                ...state 
            }
        case IS_COMMENTS_LOADING:
            return {
                ...state,
                loadingComments: true
            }
        case FETCH_POSTS_COMMENTS:
            return {
                ...state,
                postComments: action.payload.comments,
                loadingComments: false
            };  
        default:
            return state;    
    }
}


  