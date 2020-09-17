import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './main';
import NewPost from './newPost';
import TestPage from './testPage';
import FullPost from './fullPost';
import Profile from './profile';

const LoggedInPages = props => {
    return (
        <Switch>
            <Redirect from="/" exact to="/main"/>
            <Route path="/main" exact component={Main}/>
            <Route path="/new_post" exact component={NewPost}/>
            <Route path="/test_page" exact component={TestPage}/>
            <Route path="/posts/post/:id" exact component={FullPost}/>
            <Route path='/profile' exact component={Profile}/>
            <Route render={()=><h1>Page not found</h1>}/>
        </Switch> 
    );
};

export default LoggedInPages;