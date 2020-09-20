import React, { Fragment, useCallback, useState } from "react";
//Redux Stuff
import { useDispatch, useSelector } from 'react-redux';
import { editUserDetails } from './../../redux/actions/usersActions';
//MUI Stuff
import { makeStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from "@material-ui/core/Typography";
//Icons
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    button: {
        left: '48%',
    },
    textField: theme.textField
}));

const EditDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.users.userProfile);
    const [userValues, setUserValues] = useState(user);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onChange = useCallback((event) => {
        const { name, value } = event.target;

        setUserValues((prevUserValues) => {
            if (prevUserValues[name]) {
                return {
                    ...prevUserValues,
                    [name]: value,
                };
            } else {
                prevUserValues[name] = value;
                return prevUserValues;
            }
        });
    }, []);

    const handleSubmitPost = useCallback(() => {
        dispatch(editUserDetails(token, userValues, userValues._id));
        handleClose();
    }, [userValues, setUserValues]);

    return (
        <Fragment>
            <Tooltip title="Edit details" placement="top">
                <IconButton onClick={handleOpen} className={classes.button}>
                    <EditIcon fontSize="large" color="primary"/>
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >   
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="first_name"
                            type="text"
                            label="First Nmae"
                            placeholder="First Name"
                            className={classes.textField}
                            value={userValues.first_name}
                            onChange={onChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name="last_name"
                            type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            className={classes.textField}
                            value={userValues.last_name}
                            onChange={onChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            className={classes.textField}
                            value={userValues.bio}
                            onChange={onChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Your personal/professinal website"
                            className={classes.textField}
                            value={userValues.website}
                            onChange={onChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where you live"
                            className={classes.textField}
                            value={userValues.location}
                            onChange={onChange}
                            fullWidth
                            variant="outlined"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitPost} color="primary">
                        Save
                    </Button>

                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default EditDetails
