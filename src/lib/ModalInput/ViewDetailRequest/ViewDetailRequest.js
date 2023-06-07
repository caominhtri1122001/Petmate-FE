import React, { useState } from "react";
import "./ViewDetailRequest.css";
import { useEffect } from "react";
import SitterService from "../../../config/service/SitterService";

const ViewDetailRequest = (props) => {
    const [allValuesRequest, setAllValuesRequest] = useState({
        name: "",
        price: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        message: "",
        address: "",
    });

    useEffect(() => {
        SitterService.viewDetailRequest(props.id).then((res) => {
            setAllValuesRequest({
                name: res.serviceName,
                price: res.price,
                startDate: res.startDate,
                endDate: res.endDate,
                startTime: res.startTime,
                endTime: res.endTime,
                address: res.address,
                message: res.message,
            });
        });
    }, []);

    const FormViewDetail = (
        <div className="form-admin-content">
            <h1>Detail</h1>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="type-input">
                        <h4>Service's Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            readOnly
                            value={allValuesRequest.name}
                        />
                    </div>
                    <div className="type-input">
                        <h4>Price ($)</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="address"
                            readOnly
                            value={allValuesRequest.price}
                        />
                    </div>
                    <div className="type-input">
                        <h4>Home's Address</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="address"
                            readOnly
                            value={allValuesRequest.address}
                        />
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
                            readOnly
                        />
                    </div>
                    <div className="type-input">
                        <h4>End Date</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="endDate"
                            value={allValuesRequest.endDate}
                            readOnly
                        />
                    </div>
                    <div className="type-input">
                        <h4>Start Time</h4>
                        <input
                            className="input-content"
                            type="time"
                            name="startTime"
                            value={allValuesRequest.startTime}
                            readOnly
                        />
                    </div>
                    <div className="type-input">
                        <h4>End Time</h4>
                        <input
                            className="input-content"
                            type="time"
                            name="endTime"
                            value={allValuesRequest.endTime}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <h4>Message</h4>
            <div className="type-input-container">
                <input
                    className="input-content-description"
                    type="text"
                    name="message"
                    readOnly
                    value={allValuesRequest.message}
                />
            </div>
        </div>
    );

    const FormViewDetailRequest = (
        <div className="form-add-account">
            {FormViewDetail}

            <div className="test">
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                    style={{ marginLeft: 20 }}
                >
                    Close
                </button>
            </div>
        </div>
    );

    return <div className="add-account-form">{FormViewDetailRequest}</div>;
};

export default ViewDetailRequest;
