import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI
import { makeStyles } from '@material-ui/styles';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles(theme => ({
    paper: theme.paper,
    profile: theme.profile,
   }));

const StaticProfile = (props) => {
    const classes = useStyles();
    const { _id, first_name, last_name, user_name, imageURL, bio, website, location, createdAt } = props.profile;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageURL} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${user_name}`}
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
              <LocationOn color="primary" /> <span>{location}</span>
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
  );
};

export default StaticProfile;