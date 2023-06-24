import React, { useState, useEffect } from "react";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import "./Payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../lib/Loading/Loading";
import CustomerService from "../../config/service/CustomerService";

const Payment = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        changeStatus();
    }, []);

    const changeStatus = () => {
        const params = new URLSearchParams(window.location.search);
        const responseCode = params.get("vnp_ResponseCode");
        const requestInfo = params.get("vnp_OrderInfo");
        const requestId = requestInfo.split(":")[1];
        if (responseCode === "00") {
            CustomerService.validRequest(requestId).then((res) => {
                if (res === true) {
                    setIsSuccess(true);
                    setIsLoading(false);
                } else {
                    setIsSuccess(false);
                    setIsLoading(false);
                    alert(res.message);
                }
            });
        } else {
            setIsSuccess(false);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="payment-container">
                {isSuccess ? (
                    <div className="success">
                        <FontAwesomeIcon
                            className="icon"
                            icon={faCircleCheck}
                        />
                        <p>Payment processed successfully</p>
                    </div>
                ) : (
                    <div className="failure">
                        <FontAwesomeIcon
                            className="icon"
                            icon={faTimesCircle}
                        />
                        <p>Payment failed</p>
                    </div>
                )}
            </div>
            <Footer />
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default Payment;
