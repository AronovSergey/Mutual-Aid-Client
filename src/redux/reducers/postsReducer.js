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
} from "../actions/types";

const initialState = {
    isPostBeingCreated: false,
    mainPosts: {
        posts: [],
        loading: false,
        fetched: true,
        error: false,
    },
    fullPost: {
        post: null,
        loading: false,
        fetched: false,
        error: false,
    },
    userPosts: {
        posts: [],
        loading: false,
        fetched: false,
        error: false,
    },
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
                mainPosts: {
                    ...state.mainPosts,
                    posts: [action.payload.post, ...state.mainPosts.posts],
                },
                userPosts: {
                    ...state.userPosts,
                    posts: [action.payload.post, ...state.userPosts.posts],
                },
            };
        case FETCH_ALL_POSTS:
            return{
                ...state,
                mainPosts: {
                    ...state.mainPosts,
                    loading: false,
                    fetched: true,
                    posts: action.payload,
                },
            };
        case CREATE_POST_ERROR:
            return {
                ...state,
                isPostBeingCreated: false,
            };    
        case IS_ALL_POSTS_LOADING:
            return {
                ...state,
                mainPosts: {
                    ...state.mainPosts,
                    loading: true,
                },
            };  
        case FETCH_ALL_POSTS_ERROR:
            return {
                ...state,
                mainPosts: {
                    ...state.mainPosts,
                    loading: false,
                    error: true,
                },
            };  
        case FETCH_SPECIFIC_POSTS:
            return {
                ...state,
                fullPost: {
                    post: action.payload.post,
                    loading: false,
                    fetched: true,
                    error: false,
                }
            };  
        case IS_SPECIFIC_POST_LOADING:
            return {
                ...state,
                fullPost: {
                    ...state.fullPost,
                    loading: true,
                }
            }; 
        case FETCH_SPECIFIC_POST_ERROR:
            return {
                ...state,
                fullPost: {
                    ...state.fullPost,
                    loading: false,
                    error: true,
                }
            };
        default:
            return state;    
    }
}


  