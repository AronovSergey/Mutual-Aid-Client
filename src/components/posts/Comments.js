import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import CircularProgress from './../../UI/CircularProgress';

//MUI Stuff
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
      },
      commentData: {
        marginLeft: 20
      },
      invisibleSeparator: theme.invisibleSeparator,
      visibleSeparator: theme.visibleSeparator,
  })) 

const Comments = () => {
    const classes = useStyles();
    const { postComments, loadingComments } = useSelector((state) => state.posts);

    return (
        <div>
            {loadingComments && (<CircularProgress/>)}
            {!loadingComments && (
                <Grid container>
                    {postComments.map((comment, index) => {
                        const{ _id, userHandle, postID, body, userImage, createdAt} = comment;
                        return (
                            <Fragment key={_id}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={2}>
                                            <img
                                            src={userImage}
                                            alt="comment"
                                            className={classes.commentImage}
                                            />
                                        </Grid>
                                        <Grid item sm={9}>
                                            <div className={classes.commentData}>
                                                <Typography
                                                    variant="h5"
                                                    component={Link}
                                                    to={`/users/${userHandle}`}
                                                    color="primary"
                                                >
                                                    {userHandle}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {dayjs(createdAt).format('h:mm a, DD MMMM YYYY')}
                                                </Typography>
                                                <hr className={classes.invisibleSeparator} />
                                                <Typography variabnt="body1">{body}</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {index !== postComments.length - 1 && (
                                    <hr className={classes.visibleSeparator} />
                                )}
                            </Fragment>
                        )
                    })}
                </Grid>
            )}
        </div>
        
    )
}

export default Comments
