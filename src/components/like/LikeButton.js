import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsMount } from "../../customHooks/useIsMount";
import {
    likeStatus
} from "../../redux/actions/likeActions";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const LikeButton = ({ postId }) => {
    const classes = useStyles();
    const [isLiked, setIsLiked] = useState(false);
    const isMount = useIsMount();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
  //const { likedPostsIds } = useSelector((state) => state.likes);

    useEffect(() => {
            setIsLiked(dispatch(likeStatus(postId, token)))
    }, []);

    const handleOnClick = () => (isLiked ? setIsLiked(false) : setIsLiked(true));


  return (
    <div className={classes.root}>
      <IconButton aria-label="like" onClick={handleOnClick}>
        {isLiked ? (
          <ThumbUpAltIcon color="primary" />
        ) : (
          <ThumbUpAltOutlinedIcon color="primary" />
        )}
      </IconButton>
    </div>
  );
};

export default LikeButton;