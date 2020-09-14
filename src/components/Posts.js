import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorPage from './../pages/ErrorPage';
import Post from './Post';

const useStyles = makeStyles({
  root: {
    margin: "5em",
    textAlign: "center",
  },
  loading: {
    margin: "0 auto",
    marginTop: "50px",
  },
});

const Posts = ({ action, postsType }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
     dispatch(action(token));
   }, []);

    
  const { posts, loading, fetched, error } = useSelector(
    (state) => state.posts[postsType]
  );

  return (
    <div className={classes.root}>
      {loading && (
        <CircularProgress
          className={classes.loading}
          size="200px"
          thickness={1}
        />
      )}
      {fetched && posts.map((post) => <Post postData={post} key={post._id} />)}
      {error && <ErrorPage />}
    </div>
  );
};

export default Posts;