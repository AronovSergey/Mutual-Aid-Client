import React, { useState, useCallback } from 'react';
import { useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { initPostValues } from "../utils/consts/newPostConsts";
import { createPost } from "../redux/actions/postsActions";
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

    const [postValues, setPostValues] = useState(initPostValues);
    const { postTitle, postContent } = postValues;

    // usage of useCallBack hook in order to prevent function re-rendering
    const handlePostValuesChange = useCallback((event) => {
        const { name, value } = event.target;

        setPostValues((prevPostValues) => {
            return {
                ...prevPostValues,
                [name]: value,
            };
        });

        },[postTitle, postContent]
    );

    const handleSubmitPost = useCallback(() => {
        dispatch(createPost(postTitle, postContent));
        }, [postTitle, postContent]
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
                <PostButton
                    buttonName={"Post"}
                    handleSubmit={handleSubmitPost}
                />
            </Container>`
        </Paper>
    );
};

export default NewPost;