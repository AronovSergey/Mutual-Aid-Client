import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from './../../UI/CircularProgress';
import Error from './../sharedComponents/Error';
import Post from './Post';

const useStyles = makeStyles({
  root: {
    margin: "5em",
    textAlign: "center",
  },
});

const Posts = ({ action, postsType }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { posts, loading, fetched, error } = useSelector(
    (state) => state.posts
  );
  

  useEffect(() => {
     dispatch(action(token));
   }, []);

  return (
    <div className={classes.root}>
      {loading && (<CircularProgress/>)}
      {fetched && posts.map((post) => <Post postData={post} key={post._id} />)}
      {error && <Error>Fetching Error</Error>}
    </div>
  );
};

export default Posts;