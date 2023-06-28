import HandleApi from "../api/HandleAPI";

const becomeSitter = async (params) => {
    return await HandleApi.APIPostWithToken(`sitter/register`, params);
};

const getSitterAround = async (lat, lng) => {
    return await HandleApi.APIGetWithToken(
        `sitter/getSitter?lat=${lat}&lng=${lng}`
    );
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

const doPayment = async (price, info) => {
    return await HandleApi.APIGetWithToken(
        `payment?price=${price}&info=${info}`
    );
};

const validRequest = async (id) => {
    return await HandleApi.APIGetWithToken(`requests/payment/${id}`);
};

const getLocationByAddressInput = async (params) => {
    return await HandleApi.APIGetWithToken(
        `sitter/getLocation?address=${params}`
    );
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
    doPayment,
    validRequest,
    getLocationByAddressInput,
};

export default CustomerService;
