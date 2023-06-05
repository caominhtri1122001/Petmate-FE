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

const SitterService = {
    getServiceFromSitter,
    getAllServices,
    createService,
};

export default SitterService;
