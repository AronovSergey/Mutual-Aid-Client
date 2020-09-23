import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';  
import { submitComment } from './../../redux/actions/postsActions';

//MUI Stuff
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: theme.textField,
    button: theme.button,
    visibleSeparator: theme.visibleSeparator
}))

const CommentFrom = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const postID = props.postID;
    const [body, setBody] = useState("");
    const { token } = useSelector((state) => state.auth);
    const userHandle = useSelector((state) => state.users.userProfile.user_name);
    const userImage = useSelector((state) => state.users.userProfile.imageURL);
    

    const handleSubmit = () => {
        dispatch(submitComment(postID, userHandle, userImage, body, token));
        setBody("");
    }

    const handleChange = (event) => {
        setBody(event.target.value)
    }

    return (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
            <TextField
                name="body"
                type="text"
                label="Comment on post"
                variant="outlined"
                value={body}
                onChange={handleChange}
                fullWidth
                className={classes.textField}
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
            >
                Submit
            </Button>
            <hr className={classes.visibleSeparator} />
        </Grid>
    )
}

export default CommentFrom;
