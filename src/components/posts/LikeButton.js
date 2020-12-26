import React from 'react';
import {debounce} from 'lodash';
import { useHistory } from "react-router";
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
    const history = useHistory();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const likePostHandler = debounce( () =>{
        if(token)
            dispatch(likePost(props._id, token))
        else
            history.push({pathname: `/login`})
    }, 200);
    
    const unlikePostHandler = debounce(() =>{
        dispatch(unlikePost(props._id, token))
    }, 200);
    
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