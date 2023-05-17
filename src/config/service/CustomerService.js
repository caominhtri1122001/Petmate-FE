import HandleApi from "../api/HandleAPI";

const becomeSitter = async (params) => {
    return await HandleApi.APIPostWithToken(`sitter/register`, params);
};

const CustomerService = {
    becomeSitter,
};

export default CustomerService;
