import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { fetchSpecificPost } from '../redux/actions/postsActions';
import Content from '../components/posts/FullPostContent';
import CircularProgress from './../UI/CircularProgress';
import ErrorPage from './errorPage';
//import CommentsBox from "../components/CommentsBox";  
//import LikeButton from "../components/LikeButton";

const useStyles = makeStyles({
  root: {
    margin: "5em",
    textAlign: "center",
  },
});

const FullPost = () => {
    const id = useParams().id;
    const dispatch = useDispatch();
    const classes = useStyles();
    const { post, loading, error, fetched } = useSelector((state) => state.posts.fullPost);

    useEffect(() => {
        dispatch(fetchSpecificPost(id));
    }, []);

    return (
      <div className={classes.root}>
        {loading && (<CircularProgress />)}
        {fetched && <Content post={post} />}
        {error && <ErrorPage />}
      </div>
    );
};

export default FullPost;