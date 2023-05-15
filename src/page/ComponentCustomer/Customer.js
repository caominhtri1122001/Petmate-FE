import React, { useEffect, useState } from "react";
import "./Customer.css";
import Logo from "../../assets/images/Logo.png";
import AccountService from "../../config/service/AccountService";
import Loading from "../../lib/Loading/Loading";

const Customer = () => {
    const [customerInfo, setCustomerInfo] = useState({
        firstName: "",
        lastName: "",
        image: "",
        role: "",
        emailAddress: "",
        dateOfBirth: "",
    });
    const [state, setState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getInfoCustomer();
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
                emailAddress: res.emailAddress,
                dateOfBirth: res.dateOfBirth,
            });
            setIsLoading(false);
        });
    };

    const CustomerContent = ({ customerInfo }) => (
        // <div className="parents-item">
        <div className="student-item">
            <div className="left-student-content">
                <img src={customerInfo.image} alt="customerImage" />
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
                            <p>{customerInfo.parent_phone}</p>
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
                        <i class="fa fa-solid fa-mars-and-venus"></i>
                        <div className="text">
                            <h4>Gender</h4>
                            <p>
                                {customerInfo.parent_gender ? "Male" : "Female"}
                            </p>
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

    return (
        <div className="main-student-container">
            <div className="header-title">
                <h3>CUSTOMER INFORMATION</h3>
            </div>
            <div className="detail-content">
                <CustomerContent customerInfo={customerInfo} />
            </div>
            <div className="main-contact">
                <button className="contact-button">Contact</button>
            </div>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default Customer;
