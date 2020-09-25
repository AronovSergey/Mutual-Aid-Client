import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import postsPage from './postsPage';
import newPost from './newPost';
import testPage from './testPage';
import profile from './profile';
import user from './user';
import searchResults from './searchResults';

const LoggedInPages = props => {
    return (
        <Switch>
            <Redirect from="/" exact to="/main"/>
            <Route path="/main" exact component={postsPage}/>
            <Route path="/new_post" exact component={newPost}/>
            <Route path="/test_page" exact component={testPage}/>
            <Route path="/profile" exact component={profile}/>
            <Route path="/users/:user_name" exact component={user}/>
            <Route path="/posts/search/:search_expression" exact component={searchResults}/>
            <Route render={()=><h1>Page not found</h1>}/>
        </Switch> 
    );
};

export default LoggedInPages;