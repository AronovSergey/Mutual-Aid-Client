import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from './../../UI/CircularProgress';
import { fetchAllPosts, fetchRecommended } from "../../redux/actions/postsActions";
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
    if(postsType === 'searchResults' || postsType === 'mainPosts')
      dispatch(fetchAllPosts(token));
    else if(postsType === 'recommended')
      dispatch(fetchRecommended(token))
   }, [postsType, dispatch, token]);

  return (
    <div className={classes.root}>
      {loading && (<CircularProgress/>)}
      {fetched && (postsType === 'mainPosts' || postsType === 'recommended') && 
        posts.map(post => <Post postData={post} key={post._id} />)
      }
      {fetched && postsType === 'searchResults' && 
        posts.filter(
          post => post.author.toLowerCase().search(searchExpression) >= 0 ||
                  post.title.toLowerCase().search(searchExpression) >= 0 ||
                  post.content.toLowerCase().search(searchExpression) >= 0)
          .map(post => <Post postData={post} key={post._id} />) 
      }
      {error && <Error>Fetching Error</Error>}
    </div>
  );
};

export default Posts;