import React, { useState } from "react";
import "./AddService.css";

const AddService = (props) => {
    const [allValuesService, setAllValuesService] = useState({
        name: "",
    });
    const [serviceError, setServiceError] = useState({
        name: false,
    });

    const changeHandler = (e) => {
        setAllValuesService({
            ...allValuesService,
            [e.target.name]: e.target.value,
        });
    };

    const FormService = (
        <div className="form-admin-content">
            <h1>Add Service</h1>
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
                        <h4>Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter your name service"
                            value={allValuesService.name}
                            onChange={changeHandler}
                        />
                        <label
                            className={
                                "error" +
                                (serviceError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Input name please
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleAddService = () => {
        let name = false;
        let check = false;

        if (!allValuesService.name) {
            name = true;
            check = true;
        } else name = false;

        setServiceError({
            name: name,
        });

        if (!check) {
            props.handleConfirmAddService(allValuesService);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleAddService();
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

    return <div className="update-servicer-provider-form">{FormAddService}</div>;
};

export default AddService;
