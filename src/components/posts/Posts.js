import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from './../../UI/CircularProgress';
import { fetchAllPosts, fetchRecommended, fetchSearch } from "../../redux/actions/postsActions";
import Error from './../sharedComponents/Error';
import Post from './Post';

const useStyles = makeStyles({
  root: {
    margin: "5em",
    textAlign: "center",
  },
});

const Posts = ({ postsType, searchExpression }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { posts, loading, fetched, error } = useSelector(
    (state) => state.posts
  );
  
  useEffect(() => {
    if(postsType === 'mainPosts')
      dispatch(fetchAllPosts(token));
    else if(postsType === 'searchResults' )
      dispatch(fetchSearch(searchExpression, token))
    else if(postsType === 'recommended')
      dispatch(fetchRecommended(token))
   }, [searchExpression, postsType, dispatch, token]);

  return (
    <div className={classes.root}>
      {loading && (<CircularProgress/>)}
      {fetched && 
        posts.map(post => <Post postData={post} key={post._id} />)
      }
      {fetched && !loading && postsType === 'searchResults' &&  posts.length === 0 &&
        <h1>There are no results that match your search</h1>
      }
      {error && <Error>Fetching Error</Error>}
    </div>
  );
};

export default Posts;