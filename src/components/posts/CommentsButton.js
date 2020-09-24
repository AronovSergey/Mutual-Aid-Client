import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComments } from './../../redux/actions/postsActions';
import Comments from './Comments.js';
import CommentFrom from './CommentFrom';

//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        padding: 15,
    },
    span: {
        marginLeft: 10,
        marginRight: 30,
    }
  }));


const CommentsButton = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { token } = useSelector((state) => state.auth);

    const handleOpen = () => {
        dispatch(fetchAllComments(props.postID, token))
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <div className={classes.button}>
                <Tooltip 
                    onClick={handleOpen} 
                    title="comments" 
                    placement="top"
                >
                    <ChatIcon color="primary"/>
                </Tooltip>
                <span className={classes.span}>{props.comments} comments</span>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Comments : 
                </DialogTitle>
                <DialogContent>
                    <CommentFrom
                        postID={props.postID}
                    />
                    <Comments/>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
        
    )
}

export default CommentsButton