import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import postsPage from './postsPage';
import searchResults from './searchResults';
import CircularProgress from '../UI/CircularProgress';

const NotLoggedInPages = props => {
    return (
        <Switch>    
            <Redirect from="/" exact to="/main"/>
            <Redirect from="/new_post" exact to="/login"/>
            <Redirect from="/users" to="/login"/>
            <Redirect from="/recommended" to="/login"/>
            <Route path="/main" exact component={postsPage}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/main" exact component={CircularProgress}/>
            <Route path="/posts/search/:search_expression" exact component={searchResults}/>
            <Route render={()=><h1>Not found</h1>}/>
        </Switch> 
    );
};
export default NotLoggedInPages;