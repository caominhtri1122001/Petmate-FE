import HandleApi from "../api/HandleAPI";

const getAccountsById = async (id) => {
    return await HandleApi.APIGetWithToken(`users/${id}`);
};

const updateProfileUser = async (id, params) => {
    return await HandleApi.APIPatchWithTokenIMG(`users/${id}`, params);
};

const changePasswordUser = async (id, params) => {
    return await HandleApi.APIPostWithToken(`users/changePassword/${id}`, params);
};

const resetPasswordById = async (id) => {
    return await HandleApi.APIPost(`users/reset-password/${id}`);
};

const getAllAccount = async () => {
    return await HandleApi.APIGetWithToken(`users/getAllUser`);
};

const updateAccountsCustomerById = async (id, params) => {
    return await HandleApi.APIPatchWithTokenIMG(`admins/customer/${id}`, params);
};

const updateAccountsEmployeeById = async (id, params) => {
    return await HandleApi.APIPatchWithTokenIMG(`admins/employee/${id}`, params);
};

const updateAccountsAdminById = async (id, params) => {
    return await HandleApi.APIPatchWithTokenIMG(`admins/${id}`, params);
};

const deleteAccountCustomersById = async (id) => {
    return await HandleApi.APIDelete(`admins/customer/${id}`);
};

const deleteAccountEmployeesById = async (id) => {
    return await HandleApi.APIDelete(`admins/employee/${id}`);
};

const deleteAccountAdminById = async (id) => {
    return await HandleApi.APIDelete(`admins/${id}`);
};

const resetPasswordToDefaultById = async (id) => {
    return await HandleApi.APIGetWithToken(`admins/reset-password/${id}`);
};

const addAdminAccount = async (params) => {
    return await HandleApi.APIPostWithToken(`admins`, params);
};

const AccountService = {
    getAccountsById,
    updateProfileUser,
    changePasswordUser,
    resetPasswordById,
    getAllAccount,
    updateAccountsCustomerById,
    updateAccountsEmployeeById,
    updateAccountsAdminById,
    deleteAccountCustomersById,
    deleteAccountEmployeesById,
    deleteAccountAdminById,
    resetPasswordToDefaultById,
    addAdminAccount,
};

export default AccountService;
