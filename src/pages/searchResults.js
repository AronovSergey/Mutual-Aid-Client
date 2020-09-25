import React from 'react';
import Posts from './../components/posts/Posts';

const searchResults = (props) => {
    const search_expression = props.match.params.search_expression.toLowerCase();

    return(
        <Posts postsType="searchResults" searchExpression={search_expression}/>
    );
}

export default searchResults;
