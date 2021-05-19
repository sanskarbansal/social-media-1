import { UPDATE_POSTS, SET_LOADING, ADD_POST, TOGGLE_LIKE } from "../actions/actionTypes";
export default function posts(state = { posts: [], loading: false }, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case ADD_POST:
            return {
                posts: [action.post, ...state.posts],
                loading: false,
            };
        case TOGGLE_LIKE:
            const posts = state.posts.map((post) => {
                if (post._id === action.paylod.likeOfId) {
                    if (!action.paylod.deleted) post["likes"] = [action.paylod.like, ...post.likes];
                    else {
                        post["likes"] = post["likes"].filter((like) => like._id !== action.paylod.likeId);
                    }
                }
                return post;
            });
            return { ...state, posts };
        case UPDATE_POSTS:
            return { ...state, posts: [...state.posts, ...action.posts], loading: false };
        default:
            return state;
    }
}
