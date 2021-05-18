import { UPDATE_POSTS, SET_LOADING, ADD_POST } from "../actions/actionTypes";
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
        case UPDATE_POSTS:
            return { ...state, posts: [...state.posts, ...action.posts], loading: false };
        default:
            return state;
    }
}
