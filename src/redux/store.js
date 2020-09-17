import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

import postsReducer from './reducers/postsReducer';
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/usersReducer';


const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  users: usersReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;