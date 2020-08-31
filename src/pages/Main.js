import React from "react";
import Posts from "../components/Posts";
import { fetchAllPosts } from "../redux/actions/postsActions";

const Main = () => {
    return(
        <Posts action={fetchAllPosts} postsType="mainPosts" />
    );
}

export default Main;