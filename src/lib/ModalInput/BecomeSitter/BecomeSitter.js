import React, { useState } from "react";
import "./BecomeSitter.css";

const BecomeSitter = (props) => {
    const [allValuesSitter, setAllValuesSitter] = useState({
        address: "",
        district: "",
        city: "",
        yearOfExperience: 0,
        description: "",
        userId: JSON.parse(localStorage.getItem("@Login")).userId,
    });
    const [sitterError, setsitterError] = useState({
        address: "",
        district: "",
        city: "",
        yearOfExperience: "",
        description: "",
        userId: "",
    });

    const changeHandlerSitter = (e) => {
        setAllValuesSitter({
            ...allValuesSitter,
            [e.target.name]: e.target.value,
        });
    };

    const FormSitter = (
        <div className="form-admin-content">
            <h1>Becoming Sitter</h1>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                {props.errorMessage}
            </label>
            <div className="form-teacher-content" style={{ height: 200 }}>
                <div className="teacher-content-left">
                    <div className="type-input">
                        <h4>Address Line</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="address"
                            placeholder="Enter your address line"
                            value={allValuesSitter.address}
                            onChange={changeHandlerSitter}
                        />
                        <label
                            className={
                                "error" +
                                (sitterError.address
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Address
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>District</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="district"
                            placeholder="Enter your district or sub-district"
                            value={allValuesSitter.district}
                            onChange={changeHandlerSitter}
                        />
                        <label
                            className={
                                "error" +
                                (sitterError.district
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid district
                        </label>
                    </div>
                </div>
                <div className="teacher-content-right-class">
                    <div className="type-input">
                        <h4>City</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="city"
                            placeholder="Enter your city"
                            value={allValuesSitter.city}
                            onChange={changeHandlerSitter}
                        />
                        <label
                            className={
                                "error" +
                                (sitterError.city
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid City
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Year of Experience</h4>
                        <input
                            className="input-content"
                            type="number"
                            name="yearOfExperience"
                            placeholder="Enter year of experience"
                            value={allValuesSitter.yearOfExperience}
                            onChange={changeHandlerSitter}
                        />
                        <label
                            className={
                                "error" +
                                (sitterError.yearOfExperience
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid type
                        </label>
                    </div>
                </div>
            </div>
            <h4>Description</h4>
            <div className="type-input-container">
                <input
                    className="input-content-description"
                    type="text"
                    name="description"
                    placeholder="Write a description about yourself"
                    value={allValuesSitter.description}
                    onChange={changeHandlerSitter}
                />
                <label
                    className={
                        "error" +
                        (sitterError.description
                            ? " error-show"
                            : " error-hidden")
                    }
                >
                    Invalid description
                </label>
            </div>
        </div>
    );

    const handleBecomeSitter = () => {
        let address = false;
        let district = false;
        let city = false;
        let yearOfExperience = false;
        let description = false;
        let check = false;
        if (!allValuesSitter.address) {
            address = true;
            check = true;
        } else address = false;

        if (!allValuesSitter.district) {
            district = true;
            check = true;
        } else {
            district = false;
        }

        if (!allValuesSitter.city) {
            city = true;
            check = true;
        } else {
            city = false;
        }

        if (!allValuesSitter.description) {
            description = true;
            check = true;
        } else {
            description = false;
        }

        if (!allValuesSitter.yearOfExperience) {
            yearOfExperience = true;
            check = true;
        } else {
            yearOfExperience = false;
        }

        setsitterError({
            address: address,
            district: district,
            city: city,
            yearOfExperience: yearOfExperience,
            description: description,
        });

        if (!check) {
            props.handleConfirmBecomeSitter(allValuesSitter);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleBecomeSitter();
    };

    const FormBecomeSitter = (
        <div className="form-add-account">
            {FormSitter}

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

export default BecomeSitter;
