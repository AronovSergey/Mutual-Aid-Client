import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from './../../redux/actions/postsActions';
import MyButton from './../sharedComponents/MyButton';


//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles({
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '58%'
    }
  });

const CommentDeleteButton = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const handleDelete = () => {
        dispatch(deleteComment(props.commentID, token))
    }

    return (
        <Fragment>
            <MyButton 
                tip="Delete Post"
                onClick={handleDelete}
                btnClassName={classes.deleteButton}
            >
                <ClearIcon color="secondary"/>
            </MyButton>
        </Fragment>
    )
}

export default CommentDeleteButton;
