import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from './../redux/actions/usersActions';
import { fetchAllPosts } from './../redux/actions/postsActions';
import Post from './../components/posts/Post';
import CircularProgress from './../UI/CircularProgress';
import StaticProfile from './../components/users/StaticProfile';
import ProfileSkeleton from './../components/users/ProfileSkeleton';
//MUI Stuff
import Grid from '@material-ui/core/Grid';

const User = (props) => {
    const dispatch = useDispatch();
    const user_name = props.match.params.user_name;
    const { token } = useSelector((state) => state.auth);
    const { posts } = useSelector((state) => state.posts);
    const { user, isLoading } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchAllPosts(token));
        dispatch(getUserData(user_name, token));
    }, [user_name, dispatch, token]);
    
    return (
        <div>
            {isLoading && (<CircularProgress/>)}

            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {!isLoading && posts.filter(post => post.author === user_name).length < 1  && (
                        <p>No screams from this user</p>
                    )}
                    {!isLoading && posts && (
                        posts.filter(post => post.author === user_name)
                        .map((post) =>  <Post postData={post} key={post._id} />)
                    )}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {!isLoading && !user && (
                        <ProfileSkeleton />
                    )}
                    {!isLoading && user && (
                        <StaticProfile profile={user} />
                    )}
                </Grid>
            </Grid>
        </div>
    )
}

export default User;
