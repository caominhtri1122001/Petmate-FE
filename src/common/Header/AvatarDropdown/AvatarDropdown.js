import React, { useState } from "react";
import "./AvatarDropdown.css";
import ChangePassword from "../../../lib/ModalInput/ChangePassword/ChangePassword";
import ModalInput from "../../../lib/ModalInput/ModalInput.js";
import AuthenticationService from "../../../config/service/AuthenticationService";
import ChangeProfile from "../../../lib/ModalInput/UpdateProfile/UpdateProfile";
import AccountService from "../../../config/service/AccountService";

const AvatarDropdown = (props) => {
    const [changePassword, setChangePassword] = useState(false);
    const [changeProfile, setChangeProfile] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputCustom = () => {
        setChangePassword(false);
        setChangeProfile(false);
        setErrorServer("");
    };

    const handleConfirmChangePassword = (allValue) => {
        AuthenticationService.ChangePassword(
            JSON.parse(localStorage.getItem("@Login")).userId,
            {
                oldPassword: allValue.old,
                password: allValue.newP
            }
        ).then((res) => {
            if (res == true) {
                setChangePassword(false);
                setErrorMessage("");
                setErrorServer(false);
            } else {
                setChangePassword(true);
                setErrorMessage(res.message);
                setErrorServer(true);
            }
        });
    };

    const DivChangePassword = (
        <ModalInput
            show={changePassword}
            handleInputCustom={handleInputCustom}
            content={
                <ChangePassword
                    handleInputCustom={handleInputCustom}
                    handleConfirmChangePassword={handleConfirmChangePassword}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleConfirmUpdateAccount = (allValue, isChangeImage) => {
        var formData = new FormData();
        formData.append("firstName", allValue.firstName);
        formData.append("lastName", allValue.lastName);
        formData.append("emailAddress", allValue.emailAddress);
        formData.append("dateOfBirth", allValue.dateOfBirth);
        formData.append("gender", allValue.gender);
        formData.append("phone", allValue.phone);
        if (isChangeImage) {
            formData.append("image", allValue.image);
        }
        AccountService.updateProfileUser(
            JSON.parse(localStorage.getItem("@Login")).userId,
            formData
        ).then((res) => {
            if (res == true) {
                setChangeProfile(false);
                setErrorMessage("");
                setErrorServer(false);
            } else {
                setChangeProfile(true);
                setErrorMessage(res.message);
                setErrorServer(true);
            }
        });
    };

    const DivChangeProfile = (
        <ModalInput
            show={changeProfile}
            handleInputCustom={handleInputCustom}
            content={
                <ChangeProfile
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateAccount={handleConfirmUpdateAccount}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleChangePassword = () => {
        setChangePassword(true);
    };

    const handleChangeProfile = () => {
        setChangeProfile(true);
    };

    return (
        <div className="dropdown-avatar">
            <button onClick={handleChangeProfile}>Change Profile</button>
            <button onClick={handleChangePassword}>Change Password</button>
            <button onClick={props.HandleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
            </button>
            {changePassword ? DivChangePassword : null}
            {changeProfile ? DivChangeProfile : null}
        </div>
    );
};

export default AvatarDropdown;
