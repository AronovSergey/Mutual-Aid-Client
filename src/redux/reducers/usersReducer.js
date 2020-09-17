import { SET_USER_PROFILE, LOADING_USER_PROFILE } from './../actions/types';

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
        case LOADING_USER_PROFILE:
            return{
                ...state,
                isLoading: true,
            }
        default:
            return state;
    }

}