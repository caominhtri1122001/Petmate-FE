import React, { useState, useEffect } from "react";
import "./UpdateServiceSitter.css";
import SitterService from "../../../config/service/SitterService";
import Select from "react-select";

const UpdateServiceSitter = (props) => {
    const [allValuesService, setAllValuesService] = useState({
        price: "",
    });
    const [serviceError, setServiceError] = useState({
        price: false,
    });

    const changeHandler = (e) => {
        setAllValuesService({
            ...allValuesService,
            [e.target.name]: e.target.value,
        });
    };

    const FormService = (
        <div className="form-admin-content">
            <h1>Update price service.</h1>
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
                        <h4>Price</h4>
                        <input
                            className="input-content"
                            type="number"
                            name="price"
                            placeholder="Enter your price"
                            value={allValuesService.price}
                            onChange={changeHandler}
                        />
                        <label
                            className={
                                "error" +
                                (serviceError.price
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Price must be numberic
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleChangePassword = () => {
        let price = false;
        let check = false;

        if (
            !allValuesService.price ||
            !Number.isInteger(parseFloat(allValuesService.price))
        ) {
            price = true;
            check = true;
        } else price = false;

        setServiceError({
            price: price,
        });

        if (!check) {
            props.handleConfirmUpdateService(allValuesService);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleChangePassword();
    };

    const FormUpdateService = (
        <div className="form-add-account">
            {FormService}

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

    return (
        <div className="update-servicer-provider-form">{FormUpdateService}</div>
    );
};

export default UpdateServiceSitter;
