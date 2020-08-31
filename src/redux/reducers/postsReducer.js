const initialState = {
    postTitle: '',
    postContent: '',
    mainPosts: {
        posts: [],
        loading: false,
        fetched: true,
        error: false,
    },
};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_POST':
            return{
                ...state,
                postTitle: action.payload.postTitle,
                postContent: action.payload.postContent,
            }
        case 'FETCH_ALL_POSTS':
            console.log(action.payload);
            return{
                ...state,
                mainPosts: {
                    ...state.mainPosts,
                    posts: action.payload,
                },
            }
        default:
            return state;    
    }
}


  