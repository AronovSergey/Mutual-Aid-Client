import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import CommentsButton from './CommentsButton';

//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    height: 300,
  },
  content:{
    padding: 25,
    objectFit: 'cover',
  },
  action:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const Post = ({ postData }) => {
  dayjs.extend(relativeTime);
  const classes = useStyles();
  const { _id, author, date, title, content, imageURL, tags, likes, comments } = postData;
  const [isLiked, setIsLiked] = useState(false);
  const userLikes = useSelector((state) => state.users.likes);  
  const user_name = useSelector((state) => state.users.userProfile.user_name);
  

  useEffect(() => {
    setIsLiked(userLikes && userLikes.find(like => like.postID === _id))
  }, [userLikes, _id]);

  

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.image}
          image={imageURL}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography 
            variant="h3" 
          >
            {title}
          </Typography>

          <Typography 
            variant="h5" 
            component={Link} 
            to={`/users/${author}`}
            color='primary'
          >
            {author}
          </Typography>


          <Typography 
            variant="body2" 
            color="textSecondary"
          >
            {dayjs(date).fromNow()}
          </Typography>

          <Typography 
            variant="body1"
          >
            {content}
          </Typography>

          <Typography
            color="textSecondary"
            noWrap={true}
          >
            {`Tags : ${tags.toString()}`}
          </Typography>

          <div className={classes.action}>
            <LikeButton
              isLiked={isLiked}
              _id={_id}
              likes={likes}
            />

            <CommentsButton
              postID={_id}
              comments={comments}
            />

            {user_name === author && (
              <DeleteButton postID={_id}/>
            )}
          </div>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;