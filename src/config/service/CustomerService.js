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

const getAllRequestByUser = async (id) => {
    return await HandleApi.APIGetWithToken(`requests/${id}`);
};

const CustomerService = {
    becomeSitter,
    getSitterAround,
    getSitterById,
    getServiceBySitter,
    contactSitter,
    getAllRequestByUser
};

export default CustomerService;
