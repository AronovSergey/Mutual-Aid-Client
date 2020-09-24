import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from './../../redux/actions/postsActions';


//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
    deleteButton: {
        display: 'flex',
        position: 'absolute',
        left: '100%',
        top: '72%'
    },
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
            <Tooltip 
                onClick={handleDelete} 
                title="Delete Post" 
                placement="top"
                className={classes.deleteButton}
            >
                <ClearIcon color="secondary"/>
            </Tooltip>
        </Fragment>
    )
}

export default CommentDeleteButton;
