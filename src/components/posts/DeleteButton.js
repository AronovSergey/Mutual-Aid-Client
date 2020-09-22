import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from './../../redux/actions/postsActions';
import MyButton from './../sharedComponents/MyButton';


//MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


const DeleteButton = (props) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { token } = useSelector((state) => state.auth);
    

    const handleOpenChanges = () => {
        setOpen(!open);
    }

    const handleDelete = () => {
        dispatch(deletePost(props.postID, token))
        setOpen(false);
    }

    return (
        <Fragment>
            <MyButton 
                tip="Delete Post"
                onClick={handleOpenChanges}
            >
                <DeleteOutlineIcon color="secondary"/>
            </MyButton>
            <Dialog
                open={open}
                onClose={handleOpenChanges}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure want to delete this post?
                </DialogTitle>
                <DialogActions>
                    <Button
                        onClick={handleOpenChanges}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="secondary"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default DeleteButton
