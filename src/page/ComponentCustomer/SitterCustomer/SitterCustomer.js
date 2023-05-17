import React, { useState } from "react";
import "./SitterCustomer.css";
import logo from "../../../assets/images/Logo.png";
import homeImage from "../../../assets/images/sitter.jpg";
import "./SitterCustomer.css";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import BecomeSitter from "../../../lib/ModalInput/BecomeSitter/BecomeSitter";
import CustomerService from "../../../config/service/CustomerService";
import {
    faBusinessTime,
    faHouseChimneyMedical,
    faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SitterCustomer = () => {
    const [becomeSitter, setBecomeSitter] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const handleInputCustom = () => {
        setBecomeSitter(false);
    };

    const handleConfirmBecomeSitter = (allValue) => {
        CustomerService.becomeSitter({
            address: allValue.address,
            district: allValue.district,
            city: allValue.city,
            yearOfExperience: parseInt(allValue.yearOfExperience),
            description: allValue.description,
            userId: allValue.userId,
        }).then((res) => {
            if (res.requestId) {
                setErrorServer(false);
                setErrorMessage("");
                setBecomeSitter(false);
            } else {
                setErrorServer(false);
                setErrorMessage(res.message);
                setBecomeSitter(false);
            }
        });
    };

    const DivBecomeSitter = (
        <ModalInput
            show={becomeSitter}
            handleInputCustom={handleInputCustom}
            content={
                <BecomeSitter
                    handleInputCustom={handleInputCustom}
                    handleConfirmBecomeSitter={handleConfirmBecomeSitter}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleBecomeSitter = () => {
        setBecomeSitter(true);
    };

    return (
        <div>
            <div className="home-container">
                <header className="sitter-header">
                    <div className="overlay">
                        <img src={logo} className="logo" alt="logo" />
                        <h5 className="subtitle">Get paid to play with pets</h5>
                        <button
                            onClick={handleBecomeSitter}
                            className="contact-button"
                        >
                            Become a sitter
                        </button>
                    </div>
                </header>

                <section id="about">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h3 className="section-title">Why Pet Mate?</h3>
                                <p className="mb-1 font-weight-bold">
                                    At Pet Mate, we're passionate about pets and
                                    their well-being. Our store is dedicated to
                                    providing high-quality pet care services
                                    that cater to the unique needs of each pet.
                                    Our team of experienced and caring
                                    professionals understands that every pet is
                                    special, and we work hard to ensure that
                                    each one receives personalized attention and
                                    care. From grooming and boarding to training
                                    and veterinary care, we offer a range of
                                    services that are designed to keep your
                                    furry friend healthy and happy. When you
                                    choose Pet Mate, you can rest assured that
                                    your pet is in good hands. We pride
                                    ourselves on our commitment to excellence,
                                    and we strive to provide the best possible
                                    care for every pet that walks through our
                                    doors. So why choose Pet Mate? Because we're
                                    passionate about pets, and we're committed
                                    to providing the best possible care for your
                                    furry friend.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col">
                                        <img
                                            src={homeImage}
                                            className="w-100 rounded shadow"
                                            alt="headmaster"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team">
                    <h3 className="section-title mb-5 text-center">
                        How it works
                    </h3>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faBusinessTime}
                                        style={{
                                            width: "120px",
                                            height: "110px",
                                        }}
                                    />
                                    <h3 className="my-3">
                                        Create your profile
                                    </h3>
                                    <h5 className="my-3">
                                        We guide you through building a profile
                                        that showcases information pet owners
                                        care about.
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faHouseChimneyMedical}
                                        style={{
                                            width: "120px",
                                            height: "110px",
                                        }}
                                    />
                                    <h3 className="my-3">Accept requests</h3>
                                    <h5 className="my-3">
                                        Tell us the types of pets you want to
                                        care for and the dates that work for
                                        you. You make your own schedule.
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faPaw}
                                        style={{
                                            width: "120px",
                                            height: "110px",
                                        }}
                                    />
                                    <h3 className="my-3">Get paid</h3>
                                    <h5 className="my-3">
                                        Payments are ready for withdrawal two
                                        days after you have completed a service.
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {becomeSitter ? DivBecomeSitter : null}
        </div>
    );
};

export default SitterCustomer;
