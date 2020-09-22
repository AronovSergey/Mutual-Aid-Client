import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from './LikeButton';
import MyButton from './../sharedComponents/MyButton';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
//Icons
import ChatIcon from '@material-ui/icons/Chat';


const useStyles = makeStyles({
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
});

const Post = ({ postData }) => {
  const { _id, author, date, title, content, imageURL, tags, likes, commentCount = 0  } = postData;
  const [isLiked, setIsLiked] = useState(false);
  const userLikes = useSelector((state) => state.users.likes);  
  const classes = useStyles();
  dayjs.extend(relativeTime);

  useEffect(() => {
    setIsLiked(userLikes && userLikes.find(like => like.postID === _id))
  }, [userLikes])

  

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
            <MyButton tip="comments">
              <ChatIcon color="primary"/>
            </MyButton>
            <span>{commentCount} comments</span>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;