import HandleApi from "../api/HandleAPI";

const becomeSitter = async (params) => {
    return await HandleApi.APIPostWithToken(`sitter/register`, params);
};

const getSitterAround = async () => {
    return await HandleApi.APIGetWithToken(`sitter/getSitter`);
};

const CustomerService = {
    becomeSitter,
    getSitterAround,
};

export default CustomerService;
