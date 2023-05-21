import React, { useState, useEffect } from "react";
import "./UpdateAccount.css";
import Logo from "../../../assets/images/Logo.png";
import AccountService from "../../../config/service/AccountService";

const UpdateAccount = (props) => {
    let date = new Date().toLocaleDateString();

    //properties
    const [allValuesAccount, setAllValuesAccount] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: `${date.split("/")[2]}-${date.split("/")[0] < 10
            ? "0" + date.split("/")[0]
            : date.split("/")[0]
            }-${date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
            }`,
        emailAddress: "",
        gender: null,
        phone: "",
        image: null,
        role: "",
        // address: "",
        // password: "",
        // confirmPassword: "",
    });

    //Error for validate
    const [accountError, setAccountError] = useState({
        firstName: false,
        lastName: false,
        dateOfBirth: false,
        emailAddress: false,
        gender: false,
        phone: false,
        image: null,
        // address: false,
        // password: false,
        // confirmPassword: false,
    });

    // Set default Avatar
    const [avatar, setAvatar] = useState(Logo);

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    //fetch data
    useEffect(() => {
        AccountService.getAccountsById(props.AccountId).then(
            (res) => {
                !!res.image
                    ? setAvatar(res.image)
                    : setAvatar(Logo);
                setAllValuesAccount({
                    firstName: res.firstName,
                    lastName:
                        res.lastName,
                    dateOfBirth:
                        res.dateOfBirth.split(
                            "T"
                        )[0],
                    emailAddress: res.emailAddress,
                    gender: `${res.gender}`,
                    phone: res.phone,
                    role: res.role,
                    // address: res.address,
                    // password: "",
                    // confirmPassword: "",
                });
            }
        );
    }, []);

    const handleUpdateAccount = () => {
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
        if (allValuesAccount.firstName.length < 2) {
            firstName = true;
            check = true;
        } else firstName = false;

        if (allValuesAccount.lastName.length < 2) {
            lastName = true;
            check = true;
        } else lastName = false;

        if (validateEmail(allValuesAccount.emailAddress) === false) {
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

        let dateConvert = `${dateNow.split("/")[2]}-${dateNow.split("/")[0] < 10
            ? "0" + dateNow.split("/")[0]
            : dateNow.split("/")[0]
            }-${dateNow.split("/")[1] < 10
                ? "0" + dateNow.split("/")[1]
                : dateNow.split("/")[1]
            }`;

        if (dateConvert < allValuesAccount.dateOfBirth) {
            dateOfBirth = true;
            check = true;
        } else dateOfBirth = false;

        if (!allValuesAccount.gender) {
            gender = true;
            check = true;
        } else gender = false;

        if (
            isNaN(parseInt(allValuesAccount.phone)) ||
            allValuesAccount.phone.length !== 10
        ) {
            phone = true;
            check = true;
        } else phone = false;

        // if (
        //     allValuesAccount.address.length > 100 ||
        //     allValuesAccount.address.length < 2
        // ) {
        //     address = true;
        //     check = true;
        // } else address = false;

        if (!!allValuesAccount.image) {
            let imgList = allValuesAccount.image.name.split(".");
            if (
                imgList[imgList.length - 1] !== "png" &&
                imgList[imgList.length - 1] !== "jpg"
            ) {
                image = true;
                check = true;
            } else image = false;
        }

        setAccountError({
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
            props.handleConfirmUpdateAccount(allValuesAccount);
        }
    };

    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateAccount();
    };

    const changeHandlerAccount = (e) => {
        setAllValuesAccount({
            ...allValuesAccount,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerAccountIMG = (e) => {
        setAllValuesAccount({
            firstName: allValuesAccount.name,
            lastName: allValuesAccount.username,
            dateOfBirth: allValuesAccount.dateOfBirth,
            email: allValuesAccount.email,
            gender: allValuesAccount.gender,
            phone: allValuesAccount.phone,
            image: e.target.files[0],
            // address: allValuesAccount.address,
            // password: allValuesAccount.password,
            // confirmPassword: allValuesAccount.confirmPassword,
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };

    const FormAccount = (
        <div className="form-admin-content">
            <h4>Update Account</h4>
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
                    <div className="avatar-teacher">
                        <img src={avatar} alt="avatar" />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose image
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="image"
                            onChange={changeHandlerAccountIMG}
                        />
                        <label
                            className={
                                "error" +
                                (accountError.image
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
                            value={allValuesAccount.firstName}
                            onChange={changeHandlerAccount}
                        />
                        <label
                            className={
                                "error" +
                                (accountError.firstName
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            First name must be greater than 2 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Last Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="lastName"
                            placeholder="Enter first name"
                            value={allValuesAccount.lastName}
                            onChange={changeHandlerAccount}
                        />
                        <label
                            className={
                                "error" +
                                (accountError.lastName
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Last name must be greater than 2 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Date of Birth</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="dateOfBirth"
                            placeholder="Enter Date Of Birth"
                            value={allValuesAccount.dateOfBirth}
                            onChange={changeHandlerAccount}
                        />
                        <label
                            className={
                                "error" +
                                (accountError.dateOfBirth
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
                                    onChange={changeHandlerAccount}
                                    checked={
                                        allValuesAccount.gender === "true"
                                    }
                                />
                                Male
                                <input
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerAccount}
                                    checked={
                                        allValuesAccount.gender === "false"
                                    }
                                />
                                Female
                            </div>
                            <label
                                className={
                                    "error" +
                                    (accountError.gender
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
                            value={allValuesAccount.phone}
                            onChange={changeHandlerAccount}
                        />
                        <label
                            className={
                                "error" +
                                (accountError.phone
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
                            value={allValuesAccount.emailAddress}
                            onChange={changeHandlerAccount}
                        />
                        <label
                            className={
                                "error" +
                                (accountError.emailAddress
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
                            value={allValuesAccount.address}
                            onChange={changeHandlerAccount}
                        />
                        <label
                            className={
                                "error" +
                                (accountError.address
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Address is required.
                        </label>
                    </div> */}
                    {/* <div className="type-input">
                        <h4>Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="password"
                            placeholder="Enter password "
                            value={allValuesPrincipal.password}
                            onChange={changeHandlerPrincipal}
                        />
                        <label
                            className={
                                "error" +
                                (principalError.password
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password must be at least 6 chars long
                        </label>
                    </div> */}
                    {/* <div className="type-input">
                        <h4>Confirm Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="confirmPassword"
                            placeholder="Enter password "
                            value={allValuesPrincipal.confirmPassword}
                            onChange={changeHandlerPrincipal}
                        />
                        <label
                            className={
                                "error" +
                                (principalError.confirmPassword
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password incorrect
                        </label>
                    </div> */}
                </div>
            </div>
        </div>
    );


    const FormUpdateAccount = (
        <div className="form-add-account">
            {FormAccount}
            <button type="submit" onClick={clickUpdate} className="btn-ok" style={{ marginRight: 20 }}>
                Update
            </button>
            <button onClick={props.handleInputCustom} className="btn-cancel" >
                Cancel
            </button>


        </div>
    );

    return <div className="add-account-form">{FormUpdateAccount}</div>;
};

export default UpdateAccount;
