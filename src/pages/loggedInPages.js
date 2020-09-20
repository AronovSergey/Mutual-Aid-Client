import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import postsPage from './postsPage';
import NewPost from './newPost';
import TestPage from './testPage';
import Profile from './profile';

const LoggedInPages = props => {
    return (
        <Switch>
            <Redirect from="/" exact to="/main"/>
            <Route path="/main" exact component={postsPage}/>
            <Route path="/new_post" exact component={NewPost}/>
            <Route path="/test_page" exact component={TestPage}/>
            <Route path='/profile' exact component={Profile}/>
            <Route render={()=><h1>Page not found</h1>}/>
        </Switch> 
    );
};

export default LoggedInPages;