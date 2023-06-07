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

const updateService = async (id, price) => {
    return await HandleApi.APIPatchWithToken(`provider/${id}?price=${price}`);
};

const deleteService = async (id) => {
    return await HandleApi.APIDelete(`provider/${id}`);
};

const enableService = async (id) => {
    return await HandleApi.APIGetWithToken(`provider/enable/${id}`);
};

const getSitterIdByUserId = async (id) => {
    return await HandleApi.APIGetWithToken(`sitter/user/${id}`);
};

const getAllRequestBySitter = async (id) => {
    return await HandleApi.APIGetWithToken(`requests/sitter/${id}`);
};

const viewDetailRequest = async (id) => {
    return await HandleApi.APIGetWithToken(`requests/detail/${id}`);
};

const SitterService = {
    getServiceFromSitter,
    getAllServices,
    createService,
    updateService,
    deleteService,
    enableService,
    getSitterIdByUserId,
    getAllRequestBySitter,
    viewDetailRequest,
};

export default SitterService;
