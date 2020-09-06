import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import NewPost from './NewPost';
import TestPage from './TestPage';
import FullPost from './FullPost';
import SignUp from './SignUp';

const LoggedInPages = props => {
    return (
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/new_post" exact component={NewPost}/>
            <Route path="/test_page" exact component={TestPage}/>
            <Route path="/posts/post/:id" exact component={FullPost}/>
            <Route path="/sign_up" exact component={SignUp}/>
        </Switch> 
    );
};

export default LoggedInPages;