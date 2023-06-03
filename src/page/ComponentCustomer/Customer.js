import React, { useEffect, useState } from "react";
import "./Customer.css";
import Logo from "../../assets/images/Logo.png";
import AccountService from "../../config/service/AccountService";
import PetService from "../../config/service/PetService";
import Loading from "../../lib/Loading/Loading";
import PetPicture from "../../assets/images/pet_login.png";
import ModalInput from "../../lib/ModalInput/ModalInput";
import AddPet from "../../lib/ModalInput/AddPet/AddPet";
import UpdatePet from "../../lib/ModalInput/UpdatePet/UpdatePet";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../lib/ConfirmAlert/ConfirmAlert";

const Customer = () => {
    const [pets, setPets] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        firstName: "",
        lastName: "",
        image: "",
        gender: "",
        phone: "",
        role: "",
        emailAddress: "",
        dateOfBirth: "",
    });
    const [state, setState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddPet, setIsAddPet] = useState(false);
    const [isUpdatePet, setIsUpdatePet] = useState(false);
    const [idPet, setIdPet] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        getInfoCustomer();
        getInfoPets();
    }, [state]);

    const getInfoCustomer = () => {
        setIsLoading(true);
        AccountService.getAccountsById(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            let customerImage = "";
            if (!!res.image) {
                customerImage = `${res.image}`;
            } else customerImage = Logo;
            setCustomerInfo({
                firstName: res.firstName,
                lastName: res.lastName,
                image: customerImage,
                role: res.role,
                gender: res.gender,
                phone: res.phone,
                emailAddress: res.emailAddress,
                dateOfBirth: res.dateOfBirth,
            });
            setIsLoading(false);
        });
    };

    const getInfoPets = () => {
        setIsLoading(true);
        PetService.getPetsByUserId(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    id: item.id,
                    name: item.name,
                    species: item.species,
                    breed: item.breed,
                    age: item.age,
                    gender: item.gender,
                    weight: item.weight,
                    petImgUrl:
                        item.petImgUrl === null ? PetPicture : item.petImgUrl,
                    userId: item.userId,
                };
            });
            setPets(dataSources);
            setIsLoading(false);
        });
    };

    const CustomerContent = ({ customerInfo }) => (
        <div className="student-item">
            <div className="left-student-content">
                <img src={customerInfo.image} alt="customerImage" />
                <div className="main-contact">
                    <button className="contact-button">Contact</button>
                </div>
            </div>

            <div className="between-student-content">
                <div className="student-info-parents">
                    <div className="item-content">
                        <i className="fa fa-solid fa-user-tie"></i>
                        <div className="detail-item-content">
                            <h4>First Name</h4>
                            <p>{customerInfo.firstName}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fa fa-solid fa-envelope"></i>
                        <div className="text">
                            <h4>Email</h4>
                            <p>{customerInfo.emailAddress}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fa fa-phone"></i>
                        <div className="text">
                            <h4>Phone Number</h4>
                            <p>{customerInfo.phone}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fa fa-solid fa-cake-candles"></i>
                        <div className="text">
                            <h4>Date Of birth</h4>
                            <p>
                                {new Date(
                                    customerInfo.dateOfBirth
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-student-content">
                <div className="student-info-parents">
                    <div className="item-content">
                        <i className="fa fa-suitcase" aria-hidden="true"></i>
                        <div className="text">
                            <h4>Last Name</h4>
                            <p>{customerInfo.lastName}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fa fa-solid fa-location-dot"></i>
                        <div className="text">
                            <h4>Address</h4>
                            <p>{customerInfo.parent_address}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fa fa-solid fa-mars-and-venus"></i>
                        <div className="text">
                            <h4>Gender</h4>
                            <p>{customerInfo.gender ? "Male" : "Female"}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fa fa-solid fa-location-dot"></i>
                        <div className="text">
                            <h4>Joined</h4>
                            <p>{customerInfo.parent_address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleViewDetail = (e) => {
        e.preventDefault();
        setIdPet(e.target.parentElement.getAttribute("data-key"));
        setIsUpdatePet(true);
    };

    const handleRemove = (e) => {
        e.preventDefault();
        setIdPet(e.target.parentElement.getAttribute("data-key"));
        setIsDelete(true);
    };

    const PetContent = ({ pets }) => {
        return (
            <div className="pet-content">
                {pets.map((item) => {
                    return (
                        <div
                            className="pet-card"
                            key={item.key}
                            data-key={item.id}
                        >
                            <img src={item.petImgUrl} alt="pet" />
                            <h4 style={{ marginTop: 10 }}>
                                Pet Name : {item.name}
                            </h4>
                            <h4>Age: {item.age} years</h4>
                            <button
                                onClick={handleViewDetail}
                                className="button-view-detail"
                            >
                                View Detail
                            </button>
                            <button
                                onClick={handleRemove}
                                className="button-remove"
                            >
                                Remove
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    };

    const handleAddPet = () => {
        setIsAddPet(true);
    };

    const handleInputCustom = () => {
        setIsAddPet(false);
        setIsUpdatePet(false);
    };

    const handleConfirmAddPet = (allValue) => {
        var formData = new FormData();
        formData.append("name", allValue.name);
        formData.append("species", allValue.species);
        formData.append("breed", allValue.breed);
        formData.append("age", allValue.age);
        formData.append("gender", allValue.gender);
        formData.append("weight", allValue.weight);
        formData.append("image", allValue.image);
        formData.append("owner", allValue.owner);
        PetService.createPet(formData).then((res) => {
            if (res.name) {
                setState(!state);
                setIsAddPet(false);
                setErrorMessage("");
                setErrorServer(false);
            } else {
                setIsAddPet(true);
                setErrorMessage(res.message);
                setErrorServer(true);
            }
        });
    };

    const handleConfirmUpdatePet = (allValue, isChangeImage) => {
        var formData = new FormData();
        formData.append("name", allValue.name);
        formData.append("species", allValue.species);
        formData.append("breed", allValue.breed);
        formData.append("age", allValue.age);
        formData.append("gender", allValue.gender);
        formData.append("weight", allValue.weight);
        if (isChangeImage) {
            formData.append("image", allValue.image);
        }
        formData.append("owner", allValue.owner);
        PetService.updatePetById(idPet, formData).then((res) => {
            if (res === true) {
                setState(!state);
                setIsUpdatePet(false);
                setErrorMessage("");
                setErrorServer(false);
            } else {
                setIsUpdatePet(true);
                setErrorMessage(res.message);
                setErrorServer(true);
            }
        });
    };

    const DivAddPet = (
        <ModalInput
            show={isAddPet}
            handleInputCustom={handleInputCustom}
            content={
                <AddPet
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddPet={handleConfirmAddPet}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const DivUpdatePet = (
        <ModalInput
            show={isUpdatePet}
            handleInputCustom={handleInputCustom}
            content={
                <UpdatePet
                    petId={idPet}
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdatePet={handleConfirmUpdatePet}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleDelete = () => {
        PetService.deletePetById(idPet).then((res) => {
            if (res == true) {
                setState(!state);
            }
        });

        setIsDelete(false);
    };

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to delete this pet?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    return (
        <div className="main-student-container">
            <div className="header-title">
                <h3>CUSTOMER INFORMATION</h3>
            </div>
            <div className="detail-content">
                <CustomerContent customerInfo={customerInfo} />
            </div>
            <div className="header-title">
                <h3>PET INFORMATION</h3>
            </div>
            <div className="pet-detail">
                {pets !== [] ? (
                    <PetContent pets={pets} />
                ) : (
                    <h4>There's no pet.</h4>
                )}
            </div>
            <button className="add-new-pet" onClick={handleAddPet}>
                {" "}
                Add new pet
            </button>
            {isDelete ? ConfirmDelete : null}
            {isAddPet ? DivAddPet : null}
            {isUpdatePet ? DivUpdatePet : null}
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default Customer;
