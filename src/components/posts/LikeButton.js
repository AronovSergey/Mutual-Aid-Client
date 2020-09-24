import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost} from './../../redux/actions/postsActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        padding: 15,
    },
    span: {
        marginLeft: 10,
        marginRight: 10,
    }
  }));

const LikeButton = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const likePostHandler = () =>{
        dispatch(likePost(props._id, token))
    }
    
    const unlikePostHandler = () =>{
        dispatch(unlikePost(props._id, token))
    }
    
    return (
        <div className={classes.button}>
            {props.isLiked && (
                <Tooltip 
                    onClick={unlikePostHandler} 
                    title="Undo like" 
                    placement="top"
                >
                    <FavoriteIcon color="primary"/>
                </Tooltip>
            )}
            {!props.isLiked && (
                <Tooltip 
                    onClick={likePostHandler} 
                    title="Like" 
                    placement="top"
                >
                    <FavoriteBorderIcon color="primary"/>
                </Tooltip>
            )}
            <span className={classes.span}>{props.likes} Likes</span>
        </div>
        
    )
}

export default LikeButton