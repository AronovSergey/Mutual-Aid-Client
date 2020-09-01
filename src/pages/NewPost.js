import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { categories, initPostValues } from "../utils/consts/newPostConsts";
import { createPost } from "../redux/actions/postsActions";
import ImageUpload from "../components/ImageUpload";
import PostButton from "../components/PostButton";

const useStyles = makeStyles((theme) => ({
    rootPaper: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "6em",
        borderRadius: 3,
        textAlign: "center",
        marginLeft: "50px",
      },
  }));

const NewPost = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
//    const fixedOptions = [];  

    const [postValues, setPostValues] = useState(initPostValues);
    const { postTitle, postContent, postImage } = postValues;
    const [tagsValue, setTagsValue] = useState([]);
//    const { token } = useSelector((state) => state.auth);
    const { isPostBeingCreated, isPostCreated } = useSelector(
        (state) => state.posts
    );

    const resetValues = useCallback(() => {
        setPostValues(initPostValues);
        setTagsValue([]);
    }, [setPostValues, setTagsValue]);

    useEffect(() => {
        if (isPostCreated) resetValues();
    }, [isPostCreated]);

    // usage of useCallBack hook in order to prevent function re-rendering
    const handlePostValuesChange = useCallback((event) => {
        const { name, value } = event.target;

        setPostValues((prevPostValues) => {
            return {
                ...prevPostValues,
                [name]: value,
            };
        });

        }, [setPostValues, postTitle, postContent]
    );

    const handleImageChange = useCallback(
        (event) => {
          setPostValues((prevPostValues) => {
            return {
              ...prevPostValues,
              postImage: event.target.files[0],
            };
          });
        }, [setPostValues, postImage]
    );

    const handleSubmitPost = useCallback(() => {
        dispatch(createPost(postTitle, postContent, postImage));
        }, [postTitle, postContent, postImage]
    );
    

    return (
        <Paper className={classes.rootPaper} elevation={4}>
        `  <Container>
                <TextField
                    fullWidth
                    margin="normal"
                    name="postTitle"
                    label="Post Title"
                    variant="outlined"
                    value={postTitle}
                    onChange={handlePostValuesChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="postContent"
                    label="Post Content"
                    multiline
                    rows={5}
                    variant="outlined"
                    value={postContent}
                    onChange={handlePostValuesChange}
                />
                <ImageUpload handleImageChange={handleImageChange} />
                <PostButton
                    buttonName={"Post"}
                    handleSubmit={handleSubmitPost}
                />
            </Container>`
        </Paper>
    );
};

export default NewPost;