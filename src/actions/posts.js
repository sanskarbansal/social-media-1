import { APIurls } from "../helpers/urls";
import { ADD_POST, SET_LOADING, TOGGLE_LIKE, UPDATE_POSTS } from "./actionTypes";
// export const fetchPosts = () => {
//     return (dispatch) => {
//         const url = "https://jsonplaceholder.typicode.com/posts";
//         dispatch(setLoading(true));
//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 dispatch(updatePosts(data));
//             });
//     };
// };

export const setLoading = (flag) => ({
    type: SET_LOADING,
    loading: flag,
});

export const updatePosts = (posts) => {
    return {
        type: UPDATE_POSTS,
        posts,
    };
};

export const addPost = (post) => ({
    type: ADD_POST,
    post,
});

export const createPost = (post) => (dispatch) => {
    fetch(`${APIurls.createPost}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify(post),
    })
        .then((res) => res.json())
        .then((data) => {
            dispatch(addPost(data));
            console.log(data);
        });
};
export const fetchPosts = (posts) => (dispatch) => {
    // dispatch();
    // console.log("called");
    fetch(APIurls.getPosts, {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
    })
        .then((res) => res.json())
        .then((data) => dispatch(updatePosts(data.posts)))
        .catch((err) => console.log(err));
};

// export const

export const updateLike = (paylod) => ({
    type: TOGGLE_LIKE,
    paylod,
});

export const toggleLike = (likeOfId) => (dispatch) => {
    fetch(APIurls.toggleLike, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            likeOfId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            dispatch(updateLike({ ...data, likeOfId }));
        });
};
