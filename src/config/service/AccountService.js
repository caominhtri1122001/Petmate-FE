import HandleApi from "../api/HandleAPI";

const getAccountsById = async (id) => {
    return await HandleApi.APIGetWithToken(`users/${id}`);
};

const updateAccountsById = async (id, params) => {
    return await HandleApi.APIPutWithTokenIMG(`users/${id}`, params);
};

const resetPasswordById = async (id) => {
    return await HandleApi.APIPost(`users/reset-password/${id}`);
};

const AccountService = {
    getAccountsById,
    updateAccountsById,
    resetPasswordById,
};

export default AccountService;
