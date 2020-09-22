import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost} from './../../redux/actions/postsActions';
import MyButton from './../sharedComponents/MyButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const LikeButton = (props) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const likePostHandler = () =>{
        dispatch(likePost(props._id, token))
    }
    
    const unlikePostHandler = () =>{
        dispatch(unlikePost(props._id, token))
    }
    
    return (
        <div>
            {props.isLiked && (
                <MyButton 
                    tip="Undo like"
                    onClick={unlikePostHandler}
                >
                    <FavoriteIcon color="primary"/>
                </MyButton>
            )}
            {!props.isLiked && (
                <MyButton 
                    tip="Like"
                    onClick={likePostHandler}
                >
                    <FavoriteBorderIcon color="primary"/>
                </MyButton>
            )}
            <span>{props.likes} Likes</span>
        </div>
        
    )
}

export default LikeButton
