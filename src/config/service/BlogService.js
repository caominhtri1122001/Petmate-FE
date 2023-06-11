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

const BlogService = {
    getAllTags,
    getAllBlogs,
    getBlogById,
};

export default BlogService;
