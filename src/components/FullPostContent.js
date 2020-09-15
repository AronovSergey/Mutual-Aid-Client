import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStylesPaper } from '../theme';
import LikeButton from './LikeButton'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    img: {
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "1em",
      marginTop: "0.5em",
      width: theme.spacing(30),
      height: theme.spacing(25),
    },
    content: {
      margin: "1.5em",
    },
  }));

const FullPostContent = ({ post }) => {
    const classes = useStyles();
    return(
      <React.Fragment>
        <Paper elevation={4} className={useStylesPaper().rootPaper}>
            <Container className={classes.content}>
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="body2">{post.tags}</Typography>
            <Typography variant="body3">{post.author}</Typography>
            <Avatar
                variant="square"
                src={post.imageURL}
                className={classes.img}
            />
            <Typography variant="body1">{post.content}</Typography>
            <LikeButton postId={post._id} />
            </Container>
        </Paper>
        {/* <CommentsBox postId={id} /> */}
      </React.Fragment>
    );
}

export default FullPostContent;