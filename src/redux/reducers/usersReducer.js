import { 
    SET_USER_PROFILE, 
    LOADING_USER_PROFILE,
    SET_PROFILE_IMAGE, 
    LOADING_PROFILE_IMAGE,
    SET_USER_DETAILS,
    LOADING_USER_DETAILS,
    LIKE_POST,
    UNLIKE_POST,
    SET_USER_LIKES,
    DELETE_USER_LIKES,
    LOADING_USER_DATA,
    SET_USER_DATA,
 } from './../actions/types';

const initialState = {
    userProfile: [],
    isLoading: false,
    fetched: false,
    likes: [],
    notifications: [],
    user: {},
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload.user,
                isLoading: false,
                fetched: true,
            };

        case LOADING_USER_DETAILS:
        case LOADING_PROFILE_IMAGE:    
        case LOADING_USER_PROFILE: 
        case LOADING_USER_DATA:  
            return{
                ...state,
                isLoading: true,
                fetched: false,
            };
        case SET_PROFILE_IMAGE:
            return{
                ...state,
                userProfile: {
                    ...state.userProfile,
                    imageURL: action.payload.imageURL,
                },
                isLoading: false,
                fetched: true,
            };
        case SET_USER_DETAILS: 
        return{
            ...state,
            userProfile: action.payload.user,
            isLoading: false,
            fetched: true,
        };
        case LIKE_POST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                  {
                    userHandle: state.userProfile._id,
                    postID: action.payload.post._id
                  }
                ]
              };
        case UNLIKE_POST:
            return{
                ...state,
                likes: state.likes.filter(
                    like => like.postID !== action.payload.post._id
                )
            }
        case SET_USER_LIKES:
            return{
                ...state,
                likes: action.payload.likes
            }
        case DELETE_USER_LIKES:
            return{
                ...state,
                likes: []
            }
        case SET_USER_DATA:
            return{
                ...state,
                user: action.payload.user,
            }     
        default:
            return state;
    }

}