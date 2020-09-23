import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComments } from './../../redux/actions/postsActions'
import MyButton from './../sharedComponents/MyButton';
import Comments from './Comments.js';

//MUI Stuff
import ChatIcon from '@material-ui/icons/Chat';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


const LikeButton = (props) => {
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
            <MyButton 
                tip="comments"
                onClick={handleOpen}>
              <ChatIcon color="primary"/>
            </MyButton>
            <span>{props.comments} comments</span>

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
                    <Comments/>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                    >
                        New Comment
                    </Button>
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

export default LikeButton