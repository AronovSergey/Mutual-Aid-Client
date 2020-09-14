import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

import postsReducer from './reducers/postsReducer';
import authReducer from './reducers/authReducer';


const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;