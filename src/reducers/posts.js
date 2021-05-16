import { UPDATE_POSTS, SET_LOADING } from "../actions/actionTypes";
export default function posts(state = { posts: [], loading: false }, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case UPDATE_POSTS:
            return { ...state, posts: [...state.posts, ...action.posts], loading: false };
        default:
            return state;
    }
}
