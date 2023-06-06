import HandleApi from "../api/HandleAPI";

const getServiceFromSitter = async (id) => {
    return await HandleApi.APIGetWithToken(`provider/services/user/${id}`);
};

const getAllServices = async () => {
    return await HandleApi.APIGetWithToken(`services`);
};

const createService = async (params) => {
    return await HandleApi.APIPostWithToken(`provider`, params);
};

const getSitterIdByUserId = async (id) => {
    return await HandleApi.APIGetWithToken(`sitter/user/${id}`);
};

const getAllRequestBySitter = async (id) => {
    return await HandleApi.APIGetWithToken(`requests/sitter/${id}`);
};

const SitterService = {
    getServiceFromSitter,
    getAllServices,
    createService,
    getSitterIdByUserId,
    getAllRequestBySitter,
};

export default SitterService;
