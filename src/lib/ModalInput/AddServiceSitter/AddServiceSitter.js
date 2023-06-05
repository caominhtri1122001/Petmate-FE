import React, { useState, useEffect } from "react";
import "./AddServiceSitter.css";
import SitterService from "../../../config/service/SitterService";
import Select from "react-select";

const AddServiceSitter = (props) => {
    const [allValuesService, setAllValuesService] = useState({
        name: "",
        price: "",
        sitterId: props.sitterId,
    });
    const [serviceError, setServiceError] = useState({
        name: false,
        price: false,
        sitterId: false,
    });
    const [services, setServices] = useState([]);
    const [serviceDropValue, setServiceDropValue] = useState();

    useEffect(() => {
        SitterService.getAllServices().then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    value: item.id,
                    label: item.name,
                };
            });
            setServices(dataSources);
        });
    }, []);

    const changeHandler = (e) => {
        setAllValuesService({
            ...allValuesService,
            [e.target.name]: e.target.value,
        });
    };

    const handleServiceChange = (event) => {
        setServiceDropValue(event);
        setAllValuesService({
            ...allValuesService,
            name: event.label,
        });
    };

    const FormService = (
        <div className="form-admin-content">
            <h1>Adding new service.</h1>
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
                    <div
                        className="type-input"
                        style={{ marginBottom: 200, marginTop: 50 }}
                    >
                        <h4>All services</h4>
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
                                (serviceError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Service
                        </label>
                    </div>
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
        let name = false;
        let price = false;
        let check = false;

        if (!allValuesService.name) {
            name = true;
            check = true;
        } else name = false;

        if (!allValuesService.price) {
            price = true;
            check = true;
        } else price = false;

        setServiceError({
            name: name,
            price: price,
        });

        if (!check) {
            props.handleConfirmAddService(allValuesService);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleChangePassword();
    };

    const FormAddService = (
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

    return <div className="add-account-form">{FormAddService}</div>;
};

export default AddServiceSitter;
