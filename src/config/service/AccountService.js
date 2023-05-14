import HandleApi from "../api/HandleAPI";

const getAccountsById = async (id) => {
    return await HandleApi.APIGetWithToken(`account/${id}`);
};

const updateAccountsById = async (id, params) => {
    return await HandleApi.APIPutWithTokenIMG(`account/${id}`, params);
};

const resetPasswordById = async (id) => {
    return await HandleApi.APIPost(`account/reset-password/${id}`);
};

const AccountService = {
    getAccountsById,
    updateAccountsById,
    resetPasswordById,
};

export default AccountService;
