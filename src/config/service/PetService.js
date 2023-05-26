import HandleApi from "../api/HandleAPI";

const getPetsByUserId = async (id) => {
    return await HandleApi.APIGetWithToken(`pets/user/${id}`);
};

const createPet = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`pets`, params);
};

const PetService = {
    getPetsByUserId,
    createPet,
};

export default PetService;
