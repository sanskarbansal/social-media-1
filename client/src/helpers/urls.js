const url = "http://localhost:1337/api/v1";
export const APIurls = {
    login: `${url}/user/login`,
    signup: `${url}/user/signup`,
    createPost: `${url}/post/create`,
    getPosts: (limit, page) => `${url}/post/get?limit=${limit}&page=${page}`,
    deletePost: `${url}/post/delete`,
    toggleLike: `${url}/like/toggle`,
    createComment: `${url}/comment/create`,
};
