import HandleApi from "../api/HandleAPI";

const getAllTags = async () => {
    return await HandleApi.APIGetWithToken(`tags`);
};

const getAllBlogs = async () => {
    return await HandleApi.APIGetWithToken(`posts`);
};

const getBlogById = async (id) => {
    return await HandleApi.APIGetWithToken(`posts/${id}`);
};

const getAllComment = async (id) => {
    return await HandleApi.APIGetWithToken(`comments/${id}`);
};

const createComment = async (params) => {
    return await HandleApi.APIPostWithToken(`comments`, params);
};

const BlogService = {
    getAllTags,
    getAllBlogs,
    getBlogById,
    getAllComment,
    createComment,
};

export default BlogService;
