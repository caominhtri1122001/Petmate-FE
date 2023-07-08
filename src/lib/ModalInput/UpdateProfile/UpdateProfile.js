import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import Logo from "../../../assets/images/Logo.png";
import AccountService from "../../../config/service/AccountService";

const UpdateProfile = (props) => {
    let date = new Date().toLocaleDateString();

    const [allValues, setAllValues] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: `${date.split("/")[2]}-${
            date.split("/")[0] < 10
                ? "0" + date.split("/")[0]
                : date.split("/")[0]
        }-${
            date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
        }`,
        emailAddress: "",
        gender: null,
        phone: "",
        image: null,
    });

    const [profileError, setProfileError] = useState({
        firstName: false,
        lastName: false,
        dateOfBirth: false,
        emailAddress: false,
        gender: false,
        phone: false,
        image: null,
    });

    // Set default Avatar
    const [avatar, setAvatar] = useState(Logo);
    const [isChangeImage, setIsChangeImage] = useState(false);

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    useEffect(() => {
        AccountService.getAccountsById(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            !!res.image
                ? setAvatar(res.image)
                : setAvatar(Logo);
            setAllValues({
                firstName: res.firstName,
                lastName: res.lastName,
                dateOfBirth: res.dateOfBirth.split("T")[0],
                emailAddress: res.emailAddress,
                gender: `${res.gender}`,
                phone: res.phone,
            });
        });
    }, []);

    const handleUpdateProfileAccount = () => {
        let firstName = false;
        let lastName = false;
        let dateOfBirth = false;
        let emailAddress = false;
        let gender = false;
        let phone = false;
        let image = null;
        // let address = false;
        // let password = false;
        // let confirmPassword = false;

        let check = false;
        if (allValues.firstName.length < 2) {
            firstName = true;
            check = true;
        } else firstName = false;

        if (allValues.lastName.length < 2) {
            lastName = true;
            check = true;
        } else lastName = false;

        if (validateEmail(allValues.emailAddress) === false) {
            emailAddress = true;
            check = true;
        } else emailAddress = false;

        // if (allValuesPrincipal.password.length < 6) {
        //     password = true;
        //     check = true;
        // } else if (
        //     allValuesPrincipal.confirmPassword !== allValuesPrincipal.password
        // ) {
        //     confirmPassword = true;
        //     check = true;
        // } else {
        //     password = false;
        //     confirmPassword = false;
        // }

        let dateNow = new Date().toLocaleDateString();

        let dateConvert = `${dateNow.split("/")[2]}-${dateNow.split("/")[1] < 10
            ? "0" + dateNow.split("/")[1]
            : dateNow.split("/")[1]
            }-${dateNow.split("/")[0] < 10
                ? "0" + dateNow.split("/")[0]
                : dateNow.split("/")[0]
            }`;

        if (dateConvert < allValues.dateOfBirth) {
            dateOfBirth = true;
            check = true;
        } else {
            dateOfBirth = false;
            allValues.dateOfBirth =
            allValues.dateOfBirth + "T00:00:00.000Z";
        };

        if (!allValues.gender) {
            gender = true;
            check = true;
        } else gender = false;

        if (
            isNaN(parseInt(allValues.phone)) ||
            allValues.phone.length !== 10
        ) {
            phone = true;
            check = true;
        } else phone = false;

        // if (
        //     allValues.address.length > 100 ||
        //     allValues.address.length < 2
        // ) {
        //     address = true;
        //     check = true;
        // } else address = false;

        if (!!allValues.image) {
            let imgList = allValues.image.name.split(".");
            if (
                imgList[imgList.length - 1] !== "png" &&
                imgList[imgList.length - 1] !== "jpg"
            ) {
                image = true;
                check = true;
            } else image = false;
        }

        setProfileError({
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            emailAddress: emailAddress,
            gender: gender,
            phone: phone,
            image: image,
            // address: address,
            // password: password,
            // confirmPassword: confirmPassword,
        });
        if (!check) {
            props.handleConfirmUpdateAccount(allValues, isChangeImage);
        }
    };

    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateProfileAccount();
    };

    const changeHandlerProfile = (e) => {
        setAllValues({
            ...allValues,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerProfileIMG = (e) => {
        setAllValues({
            firstName: allValues.firstName,
            lastName: allValues.lastName,
            dateOfBirth: allValues.dateOfBirth,
            emailAddress: allValues.emailAddress,
            gender: allValues.gender,
            phone: allValues.phone,
            image: e.target.files[0],
            // address: allValues.address,
            // password: allValues.password,
            // confirmPassword: allValues.confirmPassword,
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
            setIsChangeImage(true);
        } catch (err) {
            console.log(err);
        }
    };

    const FormAccountPrincipal = (
        <div className="form-admin-content">
            <h4>Update Account Information</h4>
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
                    <div className="avatar-profile">
                        <img id="update-profile" src={avatar} alt="avatar" />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose image
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="img"
                            onChange={changeHandlerProfileIMG}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.image
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            The selected file is not valid
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>First Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            value={allValues.firstName}
                            onChange={changeHandlerProfile}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            First Name must be greater than 2 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Last Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="lastName"
                            placeholder="Enter last name"
                            value={allValues.lastName}
                            onChange={changeHandlerProfile}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.lastName
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Last Name must be greater than 2 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Date of Birth</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="dateOfBirth"
                            placeholder="Enter Date Of Birth"
                            value={allValues.dateOfBirth}
                            onChange={changeHandlerProfile}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.dateOfBirth
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid birthday
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Gender</h4>
                        <div className="radio-btn">
                            <div className="radio">
                                <input
                                    type="radio"
                                    value={true}
                                    name="gender"
                                    onChange={changeHandlerProfile}
                                    checked={allValues.gender === "true"}
                                />
                                Male
                                <input
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerProfile}
                                    checked={allValues.gender === "false"}
                                />
                                Female
                            </div>
                            <label
                                className={
                                    "error" +
                                    (profileError.gender
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No gender selected
                            </label>
                        </div>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Phone Number</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            value={allValues.phone}
                            onChange={changeHandlerProfile}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.phone
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Phone must be 10 numeric characters
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Email</h4>
                        <input
                            className="input-content"
                            type="email"
                            name="emailAddress"
                            placeholder="Enter email"
                            value={allValues.emailAddress}
                            onChange={changeHandlerProfile}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.email
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Email
                        </label>
                    </div>
                    {/* <div className="type-input">
                        <h4>Address</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="address"
                            placeholder="Enter home address"
                            value={allValues.address}
                            onChange={changeHandlerProfile}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.address
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Address is required.
                        </label>
                    </div> */}
                </div>
            </div>
        </div>
    );

    const FormUpdateAccount = (
        <div className="form-update-account">
            {FormAccountPrincipal}
            <div className="form-update-profile-button">
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                >
                    Cancel
                </button>
                <button type="submit" onClick={clickUpdate} className="btn-ok">
                    Update
                </button>
            </div>
        </div>
    );

    return <div className="update-account-form">{FormUpdateAccount}</div>;
};

export default UpdateProfile;
