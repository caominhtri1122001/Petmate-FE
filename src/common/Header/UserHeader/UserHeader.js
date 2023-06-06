import React, { useEffect, useRef, useState } from "react";
import "./UserHeader.css";
import AuthenticationService from "../../../config/service/AuthenticationService";
import ROUTES from "../../../constants/routes";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import AvatarDropdown from "../AvatarDropdown/AvatarDropdown";

function useOutsideAlerter(ref, handle) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handle(event);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handle]);
}

function UserHeader() {
    let history = useHistory();
    const [avatar, setAvatar] = useState(Logo);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setOpen(false);
    });

    useEffect(() => {
        if (AuthenticationService.isLogin()) {
            if (!!JSON.parse(localStorage.getItem("@Login")).image) {
                setAvatar(JSON.parse(localStorage.getItem("@Login")).image);
            }
        }
    }, []);

    const optionsCustomers = [
        { key: 1, label: "Home", link: ROUTES.HOME_PAGE.HOME_PATH },
        {
            key: 2,
            label: "Dashboard",
            link: ROUTES.CUSTOMER_PAGE.CUSTOMER_PROFILE_PAGE,
        },
        { key: 3, label: "Services", link: ROUTES.CUSTOMER_PAGE.SERVICE_PAGE },
        {
            key: 4,
            label: "Sitter",
            link: ROUTES.CUSTOMER_PAGE.CUSTOMER_BECOME_SITTER_PAGE,
        },
        {
            key: 5,
            label: "Request",
            link: ROUTES.CUSTOMER_PAGE.CUSTOMER_REQUEST,
        },
    ];

    const optionsStaffs = [
        { key: 1, label: "Home", link: ROUTES.HOME_PAGE.HOME_PATH },
        {
            key: 2,
            label: "Dashboard",
            link: ROUTES.SITTER_PAGE.SITTER_PROFILE_PAGE,
        },
        {
            key: 3,
            label: "Service",
            link: ROUTES.SITTER_PAGE.SITTER_SERVICE_PAGE,
        },
        {
            key: 4,
            label: "Request",
            link: ROUTES.SITTER_PAGE.SITTER_REQUEST,
        },
        {
            key: 5,
            label: "Schedules",
            link: ROUTES.SITTER_PAGE.SITTER_SCHEDULES,
        },
    ];

    const optionsAdmin = [
        {
            key: 2,
            label: "Admin",
            link: ROUTES.ADMIN_PAGE.ADMIN_HOME,
        },
        {
            key: 3,
            label: "Accounts",
            link: ROUTES.ADMIN_PAGE.ACCOUNT_ADMIN,
        },
    ];

    const ItemHeader = ({ options }) => {
        return (
            <div className="item-header">
                {options.map((option) => (
                    <Link
                        className={
                            window.location.pathname === option.link
                                ? "active-menu"
                                : ""
                        }
                        key={option.key}
                        to={option.link}
                    >
                        {option.label}
                    </Link>
                ))}
            </div>
        );
    };

    const HandleLogout = () => {
        AuthenticationService.clearDataLogin();
        history.push("/");
    };

    return (
        <div className="user-header">
            <ItemHeader
                options={
                    AuthenticationService.isAdmin()
                        ? optionsAdmin
                        : AuthenticationService.isCustomer()
                        ? optionsCustomers
                        : AuthenticationService.isStaff()
                        ? optionsStaffs
                        : null
                }
            />
            <div className="info-header">
                <h5>
                    {AuthenticationService.isAdmin()
                        ? AuthenticationService.getData().name.toString()
                        : AuthenticationService.isCustomer()
                        ? AuthenticationService.getData().name.toString()
                        : AuthenticationService.getData().name.toString()}
                </h5>
                <h6>{AuthenticationService.getData().role.toUpperCase()}</h6>
            </div>
            <div className="avatar" ref={wrapperRef}>
                <img src={avatar} alt="avatar" onClick={() => setOpen(!open)} />
                {open ? <AvatarDropdown HandleLogout={HandleLogout} /> : null}
            </div>
        </div>
    );
}

export default UserHeader;
