import { 
    SET_USER_PROFILE, 
    LOADING_USER_PROFILE,
    SET_PROFILE_IMAGE, 
    LOADING_PROFILE_IMAGE,
    SET_USER_DETAILS,
    LOADING_USER_DETAILS,
 } from './../actions/types';

const initialState = {
    userProfile: [],
    isLoading: false,
    fetched: false,
    likes: [],
    notifications: [],
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
        default:
            return state;
    }

}