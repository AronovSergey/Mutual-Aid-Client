import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { fetchSpecificPost } from '../redux/actions/postsActions';
import Content from './../components/FullPostContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorPage from './../pages/ErrorPage';
//import CommentsBox from "../components/CommentsBox";  
//import LikeButton from "../components/LikeButton";

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

const FullPost = () => {
    const id = useParams().id;
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchSpecificPost(id));
    }, []);

    const { post, loading, error, fetched } = useSelector((state) => state.posts.fullPost);


    return (
      <div className={classes.root}>
        {loading && (
          <CircularProgress
            className={classes.loading}
            size="200px"
            thickness={1}
          />
        )}
        {fetched && <Content post={post} />}
        {error && <ErrorPage />}
      </div>
    );
};

export default FullPost;