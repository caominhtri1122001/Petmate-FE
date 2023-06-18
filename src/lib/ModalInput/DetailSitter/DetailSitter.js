import React, { useEffect, useState } from "react";
import "./DetailSitter.css";
import Logo from "../../../assets/images/Logo.png";
import CustomerService from "../../../config/service/CustomerService";
import ContactSitter from "../ContactSitter/ContactSitter";
import ModalInput from "../ModalInput";

const DetailSitter = (props) => {
    const [allValuesSitter, setAllValuesSitter] = useState({
        userId: "",
        sitterId: "",
        name: "",
        image: "",
        phone: "",
        address: "",
        email: "",
        yearOfExperience: "",
        description: "",
    });
    const [avatar, setAvatar] = useState(Logo);
    const [contact, setContact] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getSitterInfor();
    }, []);

    const getSitterInfor = () => {
        CustomerService.getSitterById(props.sitterId).then((res) => {
            !!res.userImage ? setAvatar(res.userImage) : setAvatar(Logo);
            setAllValuesSitter({
                userId: res.userId,
                sitterId: res.sitterId,
                name: res.firstname + " " + res.lastName,
                phone: res.phone,
                address:
                    res.address.split(",")[0] + "," + res.address.split(",")[3],
                email: res.emailAddress,
                yearOfExperience: res.yearOfExperience,
                description: res.description,
            });
        });
    };

    const FormSitter = (
        <div className="form-admin-content">
            <h4>Sitter Information</h4>
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
                    <div className="avatar-teacher">
                        <img src={avatar} alt="avatar" />
                        <input id="upload-photo" type="file" name="image" />
                    </div>
                    <div className="type-input" style={{ marginTop: 20 }}>
                        <h4>Your sitter's name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={allValuesSitter.name}
                        />
                    </div>
                    <div className="type-input" style={{ marginTop: 20 }}>
                        <h4>Phone number</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={allValuesSitter.phone}
                        />
                    </div>
                    <div className="type-input" style={{ marginTop: 20 }}>
                        <h4>Email Address</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={allValuesSitter.email}
                        />
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input" style={{ marginTop: 165 }}>
                        <h4>Address</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="breed"
                            placeholder="Enter your sitter's breed"
                            value={allValuesSitter.address}
                        />
                    </div>
                    <div className="type-input" style={{ marginTop: 22 }}>
                        <h4>Year of Experience</h4>
                        <input
                            className="input-content"
                            type="number"
                            name="age"
                            placeholder="Enter your sitter's age"
                            value={allValuesSitter.yearOfExperience}
                        />
                    </div>
                    <div className="type-input">
                        <h4>Description</h4>
                        <input
                            style={{ height: 65 }}
                            className="input-content"
                            type="text"
                            name="weight"
                            value={allValuesSitter.description}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const clickSave = (e) => {
        e.preventDefault();
        setContact(true);
    };

    const handleInputCustom = () => {
        setContact(false);
    };

    const handleConfirmContactSitter = (allValue, servicePrice) => {
        CustomerService.contactSitter({
            userId: allValue.userId,
            sitterId: allValue.sitterId,
            petId: allValue.petId,
            price: servicePrice,
            serviceId: allValue.serviceId,
            startDate: allValue.startDate,
            endDate: allValue.endDate,
            startTime: allValue.startTime,
            endTime: allValue.endTime,
            message: allValue.message,
            address: allValue.address,
        }).then((res) => {
            if (res) {
                setErrorServer(false);
                setErrorMessage("");
                setContact(false);
            } else {
                setErrorServer(true);
                setErrorMessage(res.message);
                setContact(true);
            }
        });
    };

    const DivShowContact = (
        <ModalInput
            show={contact}
            handleInputCustom={handleInputCustom}
            content={
                <ContactSitter
                    id={allValuesSitter.sitterId}
                    sitterName={allValuesSitter.name}
                    handleInputCustom={handleInputCustom}
                    handleConfirmContactSitter={handleConfirmContactSitter}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const FormBecomeSitter = (
        <div className="form-add-account">
            {FormSitter}

            <div className="test">
                <button type="submit" onClick={clickSave} className="btn-ok">
                    Contact
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

    return <div className="add-account-form">
        {FormBecomeSitter}
        {contact ? DivShowContact : null}
    </div>;
};

export default DetailSitter;
