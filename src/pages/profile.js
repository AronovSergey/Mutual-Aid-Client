import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchUserProfile, uploadImage } from '../redux/actions/usersActions';
import CircularProgress from './../UI/CircularProgress';
import EditDetails from './../components/users/EditDetails';
//MUI Stuff
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    paper: theme.paper,
    profile: theme.profile,
   }));

const Profile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { _id, first_name, last_name, user_name, imageURL, bio, website, location, createdAt } = useSelector(
        (state) => state.users.userProfile);
    const { isLoading, fetched } = useSelector((state) => state.users);  

    useEffect(() => {
        dispatch(fetchUserProfile(token));
      }, []);

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        dispatch(uploadImage(token, formData, _id));
    };
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };  

    return(
        <div>
            {isLoading && (<CircularProgress/>)}
            {fetched && (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={imageURL} alt="profile" className="profile-image" />
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={handleImageChange}
                            />
                            <Tooltip title="Edit profile picture" placement="top">
                                <IconButton onClick={handleEditPicture} className="button">
                                    <EditIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink 
                                component={Link} 
                                to={`/user/${user_name}`}
                                color="primary"
                                variant="h5"
                            >
                                {user_name}
                            </MuiLink>
                           
                            <hr />
                            {first_name && last_name && (
                                <Fragment>
                                    <Typography variant="body2">
                                        {`${first_name} ${last_name}`}
                                    </Typography>
                                    <hr />
                                </Fragment>
                            )}
                            {bio && <Typography variant="body2">{bio}</Typography>}
                            <hr />
                            {location && (
                                <Fragment>
                                    <LocationOn color="primary"/> <span>{location}</span>
                                    <hr />
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <LinkIcon color="primary" />
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        {`  ${website}`}
                                    </a>
                                    <hr />
                                </Fragment>
                            )}
                            <CalendarToday color="primary" />{' '}
                            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        </div>
                    </div>
                    <EditDetails />
                </Paper>
            )}  
        </div>
    );
}

export default Profile;