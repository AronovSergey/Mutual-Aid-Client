import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import CircularProgress from '../UI/CircularProgress';

const NotLoggedInPages = props => {
    return (
        <Switch>    
            <Redirect from="/" exact to="/login"/>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/main" exact component={CircularProgress}/>
            <Route render={()=><h1>Not found</h1>}/>
        </Switch> 
    );
};
export default NotLoggedInPages;