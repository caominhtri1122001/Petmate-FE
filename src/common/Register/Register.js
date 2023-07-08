import React, { useState } from "react";
import "./Register.css";
import loginPicture from "../../assets/images/register.jpg";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
import AuthenticationService from "../../config/service/AuthenticationService";

const Register = (props) => {
    const [errorServer, setErrorServer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [allValueRegister, setAllValueRegister] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
    });

    const [registerError, setRegisterError] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
    });

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegister = (event) => {
        event.preventDefault();

        let firstName = false;
        let lastName = false;
        let emailAddress = false;
        let password = false;
        let confirmPassword = false;
        let dateOfBirth = false;
        let gender = false;
        let phone = false;

        let check = false;

        if (!allValueRegister.firstName) {
            firstName = true;
            check = true;
        } else firstName = false;

        if (!allValueRegister.lastName) {
            lastName = true;
            check = true;
        } else lastName = false;

        if (validateEmail(allValueRegister.emailAddress) === false) {
            emailAddress = true;
            check = true;
        } else emailAddress = false;

        if (allValueRegister.password.length < 6) {
            password = true;
            check = true;
        } else if (
            allValueRegister.confirmPassword !== allValueRegister.password
        ) {
            confirmPassword = true;
            check = true;
        } else {
            password = false;
            confirmPassword = false;
        }

        if (
            isNaN(parseInt(allValueRegister.phone)) ||
            allValueRegister.phone.length !== 10
        ) {
            phone = true;
            check = true;
        } else phone = false;

        let dateNow = new Date().toLocaleDateString('en');

        let dateConvert = `${dateNow.split("/")[2]}-${
            dateNow.split("/")[0] < 10
                ? "0" + dateNow.split("/")[0]
                : dateNow.split("/")[0]
        }-${
            dateNow.split("/")[1] < 10
                ? "0" + dateNow.split("/")[1]
                : dateNow.split("/")[1]
        }`;

        if (dateConvert < allValueRegister.dateOfBirth) {
            dateOfBirth = true;
            check = true;
        } else {
            dateOfBirth = false;
            allValueRegister.dateOfBirth =
                allValueRegister.dateOfBirth + "T00:00:00.000Z";
        }

        if (allValueRegister.dateOfBirth == "T00:00:00.000Z") {
            dateOfBirth = true;
            check = true;
        } else {
            dateOfBirth = false;
        }

        if (!allValueRegister.gender) {
            gender = true;
            check = true;
        } else gender = false;

        setRegisterError({
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            emailAddress: emailAddress,
            gender: gender,
            phone: phone,
            password: password,
            confirmPassword: confirmPassword,
        });

        if (check) {
            return;
        } else {
            AuthenticationService.postRegister({
                firstName: allValueRegister.firstName,
                lastName: allValueRegister.lastName,
                emailAddress: allValueRegister.emailAddress,
                password: allValueRegister.password,
                dateOfBirth: allValueRegister.dateOfBirth,
                gender: allValueRegister.gender,
                phone: allValueRegister.phone,
            })
                .then((res) => {
                    if (res.userId) {
                        props.HandleCloseRegister();
                        props.HandleRegisterSuccess();
                        AuthenticationService.saveDataLogin(res);
                    } else {
                        setErrorServer(true);
                    }
                })
                .catch(() => setIsLoading(false));
        }
    };

    const handleChange = (e) => {
        setAllValueRegister({
            ...allValueRegister,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <ModalCustom
                show={props.show}
                handleCloseModalCustom={props.HandleCloseRegister}
                content={
                    <div className="login-container">
                        <form onSubmit={handleRegister}>
                            <div className="login-content">
                                <div className="left-content">
                                    <h1>Pet Mate</h1>
                                    <img
                                        src={loginPicture}
                                        alt="loginpicture"
                                    ></img>
                                </div>
                                <div className="line-middle"></div>
                                <div className="right-content">
                                    <h1>Register</h1>
                                    <input
                                        type="text"
                                        name="emailAddress"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        value={allValueRegister.emailAddress}
                                    />
                                    <label
                                        className={
                                            "error" +
                                            (registerError.emailAddress
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Invalid Email
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={allValueRegister.password}
                                        onChange={handleChange}
                                    />
                                    <label
                                        className={
                                            "error" +
                                            (registerError.password
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Password must be at least 6 chars long
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Re-type password"
                                        value={allValueRegister.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <label
                                        className={
                                            "error" +
                                            (registerError.confirmPassword
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Confirm password must match the
                                        password.
                                    </label>
                                    <div className="name-wrapper">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First name"
                                            value={allValueRegister.firstName}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name"
                                            value={allValueRegister.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone number"
                                        value={allValueRegister.phone}
                                        onChange={handleChange}
                                    />
                                    <label
                                        className={
                                            "error" +
                                            (registerError.phone
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Phone number must be number and has 10
                                        characters.
                                    </label>
                                    <input
                                        className="input-content"
                                        type="date"
                                        name="dateOfBirth"
                                        placeholder="Enter Date Of Birth"
                                        value={allValueRegister.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                    <label
                                        className={
                                            "error" +
                                            (registerError.dateOfBirth
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Invalid birthday
                                    </label>
                                    <div className="radio-btn">
                                        <div className="radio">
                                            <input
                                                type="radio"
                                                value={true}
                                                name="gender"
                                                onChange={handleChange}
                                            />
                                            Male
                                            <input
                                                type="radio"
                                                value={false}
                                                name="gender"
                                                onChange={handleChange}
                                            />
                                            Female
                                        </div>
                                        <label
                                            className={
                                                "error" +
                                                (registerError.gender
                                                    ? " error-show"
                                                    : " error-hidden")
                                            }
                                        >
                                            No gender selected
                                        </label>
                                    </div>
                                    <button type="submit" className="login">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    );
};

export default Register;
