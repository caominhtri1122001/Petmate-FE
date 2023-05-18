import HandleApi from "../api/HandleAPI";

const postLogin = async (params) => {
    return await HandleApi.APIPost("users/login", params);
};

const postRegister = async (params) => {
    return await HandleApi.APIPost("users/register", params);
};

const saveDataLogin = (data) => {
    localStorage.setItem("@Login", JSON.stringify(data));
};

const clearDataLogin = () => {
    localStorage.removeItem("@Login");
};

const isLogin = () => {
    return !!localStorage.getItem("@Login");
};

const isAdmin = () => {
    return JSON.parse(localStorage.getItem("@Login")).role === "ADMIN";
};

const isCustomer = () => {
    return JSON.parse(localStorage.getItem("@Login")).role === "CUSTOMER";
};

const isStaff = () => {
    return JSON.parse(localStorage.getItem("@Login")).role === "EMPLOYEE";
};

const getData = () => {
    return JSON.parse(localStorage.getItem("@Login"));
};

const ChangePassword = async (id, params) => {
    return await HandleApi.APIPutWithToken(`authentication/${id}`, params);
};

const AuthenticationService = {
    postLogin,
    postRegister,
    saveDataLogin,
    clearDataLogin,
    isLogin,
    isAdmin,
    isCustomer,
    isStaff,
    getData,
    ChangePassword,
};

export default AuthenticationService;
