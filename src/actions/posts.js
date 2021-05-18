import { APIurls } from "../helpers/urls";
import { ADD_POST, SET_LOADING, UPDATE_POSTS } from "./actionTypes";
export const fetchPosts = () => {
    return (dispatch) => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        dispatch(setLoading(true));
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                dispatch(updatePosts(data));
            });
    };
};

export const setLoading = (flag) => ({
    type: SET_LOADING,
    loading: flag,
});

export const updatePosts = (posts) => ({
    type: UPDATE_POSTS,
    posts,
});

export const addPost = (post) => ({
    type: ADD_POST,
    post,
});

export const createPost = (post) => (dispatch) => {
    console.log(post);
    fetch(`${APIurls.createPost}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify(post),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
};
