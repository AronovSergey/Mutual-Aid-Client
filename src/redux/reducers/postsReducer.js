import {
    CREATE_POST,
    IS_POST_CREATE_LOADING,
    CREATE_POST_ERROR,
    FETCH_ALL_POSTS,
} from "../actions/types";

const initialState = {
    isPostCreated: false,
    isPostBeingCreated: false,
    mainPosts: {
        posts: [],
        loading: false,
        fetched: true,
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
                isPostCreated: true,
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
                    posts: action.payload,
                },
            };
        case CREATE_POST_ERROR:
            return {
                ...state,
                isPostBeingCreated: false,
            };    
        default:
            return state;    
    }
}


  