import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import NewPost from './NewPost';


const LoggedInPages = props => {
    return (
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/new_post" exact component={NewPost}/>
        </Switch> 
    );
};

export default LoggedInPages;