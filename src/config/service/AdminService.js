import HandleApi from "../api/HandleAPI";

const getSitterRequests = async () => {
    return await HandleApi.APIGetWithToken(`sitter/requests`);
};

const acceptSitterRequest = async (id) => {
    return await HandleApi.APIGetWithToken(`sitter/requests/${id}`);
};

const deleteSitterRequest = async (id) => {
    return await HandleApi.APIDelete(`sitter/requests/${id}`);
};

const getAllService = async () => {
    return await HandleApi.APIGetWithToken(`services`);
};

const createService = async (params) => {
    return await HandleApi.APIPostWithToken(`services`, params);
};

const getServiceById = async (id) => {
    return await HandleApi.APIGetWithToken(`services/${id}`);
};

const updateServiceById = async (id, params) => {
    return await HandleApi.APIPatchWithTokenIMG(`services/${id}`, params);
};

const createBlog = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`posts`, params);
};

const uploadImg = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`firebase`, params);
};

const AdminService = {
    getSitterRequests,
    acceptSitterRequest,
    deleteSitterRequest,
    getAllService,
    createService,
    getServiceById,
    updateServiceById,
    createBlog,
    uploadImg,
};

export default AdminService;
