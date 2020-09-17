import React from "react";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

//MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

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
});

const Post = ({ postData }) => {
  const { author, date, title, content, imageURL, tags } = postData;
  const classes = useStyles();
  dayjs.extend(relativeTime);
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
            className={classes.pos}
            color="textSecondary"
            noWrap={true}
          >
            {`Tags : ${tags.toString()}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;