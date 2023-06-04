import React, { useState } from "react";
import "./ContactSitter.css";
import { useEffect } from "react";
import CustomerService from "../../../config/service/CustomerService";
import PetService from "../../../config/service/PetService";
import Select from "react-select";

const ContactSitter = (props) => {
    const [allValuesRequest, setAllValuesRequest] = useState({
        userId: JSON.parse(localStorage.getItem("@Login")).userId,
        sitterId: props.id,
        petId: "",
        serviceId: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        message: "",
        address: "",
    });
    const [requestError, setRequestError] = useState({
        userId: "",
        sitterId: "",
        petId: "",
        serviceId: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        message: "",
        address: "",
    });
    const [services, setServices] = useState([]);
    const [pets, setPets] = useState([]);
    const [serviceDropValue, setServiceDropValue] = useState();
    const [petDropValue, setPetDropValue] = useState();

    useEffect(() => {
        CustomerService.getServiceBySitter(props.id).then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    value: item.id,
                    label: item.name + " - " + item.price,
                };
            });
            setServices(dataSources);
        });
        PetService.getPetsByUserId(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    value: item.id,
                    label: "Your " + item.species + ": " + item.name,
                };
            });
            setPets(dataSources);
        });
    }, []);

    const changeHandlerRequest = (e) => {
        setAllValuesRequest({
            ...allValuesRequest,
            [e.target.name]: e.target.value,
        });
    };

    const handleServiceChange = (event) => {
        setServiceDropValue(event);
        setAllValuesRequest({
            ...allValuesRequest,
            serviceId: event.value,
        });
    };

    const handlePetChange = (event) => {
        setPetDropValue(event);
        setAllValuesRequest({
            ...allValuesRequest,
            petId: event.value,
        });
    };

    const FormPet = (
        <div className="form-admin-content">
            <h1>Contact {props.sitterName}</h1>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                {props.errorMessage}
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="type-input">
                        <h4>Sitter's services</h4>
                        {/* {!requestError.serviceId ? (
                            <h4>Sitter's services</h4>
                        ) : (
                            <label className="error error-show">
                                Invalid Service
                            </label>
                        )} */}

                        <Select
                            className="dropdown-class"
                            value={serviceDropValue}
                            onChange={handleServiceChange}
                            options={services}
                            placeholder="Here is all sitter's services"
                            maxMenuHeight={150}
                        />
                        <label
                            className={
                                "error" +
                                (requestError.serviceId
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Service
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Your pets</h4>
                        <Select
                            className="dropdown-class"
                            value={petDropValue}
                            onChange={handlePetChange}
                            options={pets}
                            placeholder="Here is all your pets"
                            maxMenuHeight={150}
                        />
                        <label
                            className={
                                "error" +
                                (requestError.serviceId
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Pet
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Your home's address</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            value={allValuesRequest.addres}
                            onChange={changeHandlerRequest}
                        />
                        <label
                            className={
                                "error" +
                                (requestError.address
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be greater than 2 chars
                        </label>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Start Date</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="startDate"
                            value={allValuesRequest.startDate}
                            onChange={changeHandlerRequest}
                        />
                        <label
                            className={
                                "error" +
                                (requestError.startDate
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid date
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>End Date</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="endDate"
                            value={allValuesRequest.endDate}
                            onChange={changeHandlerRequest}
                        />
                        <label
                            className={
                                "error" +
                                (requestError.endDate
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid date
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Start Time</h4>
                        <input
                            className="input-content"
                            type="time"
                            name="startTime"
                            value={allValuesRequest.startTime}
                            onChange={changeHandlerRequest}
                        />
                        <label
                            className={
                                "error" +
                                (requestError.startTime
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid time
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>End Time</h4>
                        <input
                            className="input-content"
                            type="time"
                            name="endTime"
                            value={allValuesRequest.endTime}
                            onChange={changeHandlerRequest}
                        />
                        <label
                            className={
                                "error" +
                                (requestError.endTime
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid time
                        </label>
                    </div>
                </div>
            </div>
            <h4>Message</h4>
            <div className="type-input-container">
                <input
                    className="input-content-description"
                    type="text"
                    name="message"
                    placeholder="Write a message or a note for sitter"
                    value={allValuesRequest.message}
                    onChange={changeHandlerRequest}
                />
                <label
                    className={
                        "error" +
                        (requestError.message ? " error-show" : " error-hidden")
                    }
                >
                    Invalid message
                </label>
            </div>
        </div>
    );

    const handleContactSitter = () => {
        let petId = false;
        let serviceId = false;
        let startDate = false;
        let endDate = false;
        let startTime = false;
        let endTime = false;
        let message = false;
        let address = false;
        let check = false;

        if (!allValuesRequest.petId) {
            petId = true;
            check = true;
        } else petId = false;

        if (!allValuesRequest.serviceId) {
            serviceId = true;
            check = true;
        } else {
            serviceId = false;
        }

        if (!allValuesRequest.startDate) {
            startDate = true;
            check = true;
        } else {
            startDate = false;
        }

        if (
            !allValuesRequest.endDate ||
            allValuesRequest.endDate < allValuesRequest.startDate
        ) {
            endDate = true;
            check = true;
        } else {
            endDate = false;
        }

        if (!allValuesRequest.startTime) {
            startTime = true;
            check = true;
        } else {
            startTime = false;
        }

        if (
            !allValuesRequest.endTime ||
            allValuesRequest.endTime <= allValuesRequest.startTime
        ) {
            endTime = true;
            check = true;
        } else {
            endTime = false;
        }

        if (!allValuesRequest.address) {
            address = true;
            check = true;
        } else {
            address = false;
        }

        setRequestError({
            petId: petId,
            serviceId: serviceId,
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            message: message,
            address: address,
        });

        if (!check) {
            props.handleConfirmContactSitter(allValuesRequest);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleContactSitter();
    };

    const FormBecomeSitter = (
        <div className="form-add-account">
            {FormPet}

            <div className="test">
                <button type="submit" onClick={clickSave} className="btn-ok">
                    Submit
                </button>
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                    style={{ marginLeft: 20 }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    return <div className="add-account-form">{FormBecomeSitter}</div>;
};

export default ContactSitter;
