import { SET_LOADING, UPDATE_POSTS } from "./actionTypes";
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
