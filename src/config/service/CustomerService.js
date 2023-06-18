import HandleApi from "../api/HandleAPI";

const becomeSitter = async (params) => {
    return await HandleApi.APIPostWithToken(`sitter/register`, params);
};

const getSitterAround = async () => {
    return await HandleApi.APIGetWithToken(`sitter/getSitter`);
};

const getSitterById = async (id) => {
    return await HandleApi.APIGetWithToken(`sitter/${id}`);
};

const getServiceBySitter = async (id) => {
    return await HandleApi.APIGetWithToken(`provider/services/${id}`);
};

const contactSitter = async (params) => {
    return await HandleApi.APIPostWithToken(`requests`, params);
};

const cancelRequest = async (id) => {
    return await HandleApi.APIGetWithToken(`requests/cancel/${id}`);
};

const getAllRequestByUser = async (id) => {
    return await HandleApi.APIGetWithToken(`requests/${id}`);
};

const chatBot = async (params) => {
    return await HandleApi.APIPostWithToken(`openai`, params);
};

const CustomerService = {
    becomeSitter,
    getSitterAround,
    getSitterById,
    getServiceBySitter,
    contactSitter,
    cancelRequest,
    getAllRequestByUser,
    chatBot,
};

export default CustomerService;
