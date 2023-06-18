import React, { useEffect, useState } from "react";
import "./UpdateService.css";
import AdminService from "../../../config/service/AdminService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";

const UpdateService = (props) => {
    const [allValuesService, setAllValuesService] = useState({
        name: "",
        typeService: "",
    });
    const [serviceError, setServiceError] = useState({
        name: false,
        typeService: false,
    });

    useEffect(() => {
        AdminService.getServiceById(props.id).then(
            (res) => {
                setAllValuesService({
                    name: res.name,
                    typeService: res.serviceType,
                });
            }
        );
    }, []);

    const changeHandler = (e) => {
        setAllValuesService({
            ...allValuesService,
            [e.target.name]: e.target.value,
        });
    };

    const FormService = (
        <div className="form-admin-content">
            <h1>Update Service</h1>
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
                    <div className="type-input">
                        <h4>Type Service</h4>
                        <div className="radio-btn-species">
                            <div className="radio">
                                <input
                                    id="per_day"
                                    type="radio"
                                    value="PER DAY"
                                    name="typeService"
                                    onChange={changeHandler}
                                    checked={
                                        allValuesService.typeService === "PER DAY"
                                    }
                                />
                                <label htmlFor="per_day">
                                    <FontAwesomeIcon
                                        className="icon fa-regular"
                                        icon={faCalendarDays}
                                    />

                                    <span>Per Day</span>
                                </label>
                                <input
                                    id="per_service"
                                    type="radio"
                                    value="PER SERVING"
                                    name="typeService"
                                    onChange={changeHandler}
                                    checked={
                                        allValuesService.typeService === "PER SERVING"
                                    }
                                />
                                <label htmlFor="per_service">
                                    <FontAwesomeIcon
                                        className="icon fa-regular"
                                        icon={faClock}
                                    />
                                    <span>Per Service</span>
                                </label>
                            </div>
                            <label
                                className={
                                    "error" +
                                    (serviceError.typeService
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No type service selected
                            </label>
                        </div>
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
            props.handleConfirmUpdateService(allValuesService);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleAddService();
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

    return <div className="add-servicer-admin-form">{FormUpdateService}</div>;
};

export default UpdateService;
