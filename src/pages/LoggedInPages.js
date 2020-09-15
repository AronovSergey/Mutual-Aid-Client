import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './Main';
import NewPost from './NewPost';
import TestPage from './TestPage';
import FullPost from './FullPost';

const LoggedInPages = props => {
    return (
        <Switch>
            <Redirect from="/" exact to="/main"/>
            <Route path="/main" exact component={Main}/>
            <Route path="/new_post" exact component={NewPost}/>
            <Route path="/test_page" exact component={TestPage}/>
            <Route path="/posts/post/:id" exact component={FullPost}/>
            <Route render={()=><h1>Page not found</h1>}/>
        </Switch> 
    );
};

export default LoggedInPages;