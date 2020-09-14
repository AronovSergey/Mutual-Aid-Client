import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

const NotLoggedInPages = props => {
    return (
        <Switch>    
            <Redirect from="/" exact to="/sign_in"/>
            <Route path="/sign_in" exact component={SignIn}/>
            <Route path="/sign_up" exact component={SignUp}/>
            <Route render={()=><h1>Not found</h1>}/>
        </Switch> 
    );
};


export default NotLoggedInPages;