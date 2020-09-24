import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categories, initPostValues } from '../utils/consts/newPostConsts';
import { createPost } from '../redux/actions/postsActions';
import TagsAutoComplete from '../components/posts/TagsAutoComplete';
import ImageUpload from '../components/posts/ImageUpload';
import SubmitButton from '../components/posts/SubmitButton';
import {
    isTagsLengthValid,
    isPostTitleValid,
    isPostContentValid,
    displayPostTitleError,
    displayPostContentError,
    postTitleTextHelper,
    PostContentTextHelper,
} from '../utils/errorHandlers/inputErrorHandler';
//MUI Stuff
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    rootPaper: theme.rootPaper
  })) 

const NewPost = props => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const fixedOptions = [];  
    const [postValues, setPostValues] = useState(initPostValues);
    const { postTitle, postContent, postImage } = postValues;
    const [tagsValue, setTagsValue] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { isPostBeingCreated } = useSelector((state) => state.posts);
    const { user_name } = useSelector((state) => state.users.userProfile);

    const resetValues = useCallback(() => {
        setPostValues(initPostValues);
        setTagsValue([]);
    }, [setPostValues, setTagsValue]);

    // usage of useCallBack hook in order to prevent function re-rendering
    const handlePostValuesChange = useCallback((event) => {
        const { name, value } = event.target;

        setPostValues((prevPostValues) => {
            return {
                ...prevPostValues,
                [name]: value,
            };
        });

    }, [setPostValues]);
    
    // usage of useCallBack hook in order to prevent function re-rendering
    const handleTagsChange = useCallback(
        (event, newValue) => {
        setTagsValue([
            ...fixedOptions,
            ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
    }, [setTagsValue, fixedOptions]);

    // usage of useCallBack hook in order to prevent function re-rendering
    const handleImageChange = useCallback(
        (event) => {
          setPostValues((prevPostValues) => {
            return {
              ...prevPostValues,
              postImage: event.target.files[0],
            };
          });
    }, [setPostValues]);

    const handleSubmitPost = useCallback(() => {
        dispatch(createPost(user_name, postTitle, postContent, tagsValue, postImage, token));
        resetValues();
    }, [user_name, postTitle, postContent, tagsValue, postImage, dispatch, resetValues, token]);
    
    // usage of useCallBack hook in order to prevent function re-rendering
    const isSendButtonEnabled = useCallback(
        () =>
        isPostTitleValid(postTitle) &&
        isPostContentValid(postContent) &&
        isTagsLengthValid(tagsValue) &&
        postImage,
        [postTitle, postContent, tagsValue, postImage]
    );

    return (
        <Paper className={classes.rootPaper} elevation={4}>
        `  <Container>
                <TextField
                    error={Boolean(displayPostTitleError(postTitle))}
                    helperText={postTitleTextHelper(postTitle)}
                    fullWidth
                    margin="normal"
                    name="postTitle"
                    label="Post Title"
                    variant="outlined"
                    value={postTitle}
                    onChange={handlePostValuesChange}
                />
                <TextField
                    error={Boolean(displayPostContentError(postContent))}
                    helperText={PostContentTextHelper(postContent)}
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
                <TagsAutoComplete
                    name="tagsValue"
                    categories={categories}
                    fixedOptions={fixedOptions}
                    value={tagsValue}
                    setValue={setTagsValue}
                    handleChange={handleTagsChange}
                />
                <ImageUpload handleImageChange={handleImageChange} />
                <SubmitButton
                    disabled={!isSendButtonEnabled() || isPostBeingCreated}
                    buttonName={"Post"}
                    handleSubmit={handleSubmitPost}
                />
            </Container>`
        </Paper>
    );
};

export default NewPost;