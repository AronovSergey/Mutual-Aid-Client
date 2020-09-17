import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserProfile, uploadImage } from '../redux/actions/usersActions';
import dayjs from 'dayjs';
import CircularProgress from './../UI/CircularProgress';
import MyButton from './../components/sharedComponents/MyButton';
//MUI Stuff
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
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

    const { email, password, first_name, last_name, imageURL, bio, website, location, createdAt } = useSelector(
        (state) => state.users.userProfile);
    const { isLoading, fetched } = useSelector((state) => state.users);  

    useEffect(() => {
        dispatch(fetchUserProfile());
      }, []);

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        dispatch(uploadImage(formData));
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
                            <MyButton
                                tip="Edit profile picture"
                                onClick={handleEditPicture}
                                btnClassName="button"
                            >
                                <EditIcon color="primary" />
                            </MyButton>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink 
                                component={Link} 
                                to={`/user/${first_name}`}
                                color="primary"
                                variant="h5"
                            >
                                {first_name}
                            </MuiLink>
                           
                            <hr />
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
                    
                </Paper>
            )}  
        </div>
    );
}

export default Profile;