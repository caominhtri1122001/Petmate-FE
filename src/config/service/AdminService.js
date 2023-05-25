import HandleApi from "../api/HandleAPI";

const getSitterRequests = async () => {
    return await HandleApi.APIGetWithToken(`sitter/requests`);
};

const acceptSitterRequest = async (id) => {
    return await HandleApi.APIGetWithToken(`sitter/requests/${id}`);
};

const deleteSitterRequest = async (id) => {
    return await HandleApi.APIDelete(`sitter/requests/${id}`);
};

const AdminService = {
    getSitterRequests,
    acceptSitterRequest,
    deleteSitterRequest,
};

export default AdminService;
