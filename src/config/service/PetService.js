import HandleApi from "../api/HandleAPI";

const getPetsByUserId = async (id) => {
    return await HandleApi.APIGetWithToken(`pets/user/${id}`);
};

const createPet = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`pets`, params);
};

const getPetById = async (id) => {
    return await HandleApi.APIGetWithToken(`pets/${id}`);
};

const updatePetById = async (id, params) => {
    return await HandleApi.APIPatchWithTokenIMG(`pets/${id}`, params);
};

const deletePetById = async (id) => {
    return await HandleApi.APIDelete(`pets/${id}`);
};

const PetService = {
    getPetsByUserId,
    createPet,
    getPetById,
    updatePetById,
    deletePetById,
};

export default PetService;
