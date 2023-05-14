import React, { useState, useEffect } from "react";
import Login from "../Login/Login";
import Logo from "../../assets/images/Logo.png";
import "./Header.css";
import AuthenticationService from "../../config/service/AuthenticationService";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const Header = () => {
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        let dataLogin = JSON.parse(localStorage.getItem("@Login"));
        const decoded = dataLogin && jwt_decode(dataLogin.jwt);
        if (decoded && decoded.exp * 1000 > Date.now()) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
            AuthenticationService.clearDataLogin();
        }
    }, []);

    const HandleOpenLogin = () => {
        setIsShowLogin(!isShowLogin);
    };

    const HandleCloseLogin = () => {
        setIsShowLogin(false);
    };

    const handleRenderButtonLogin = (
        <button onClick={HandleOpenLogin} className="button-login">
            Login
        </button>
    );

    const HandleLoginSuccess = () => {
        setIsLogin(true);
    };

    const ViewLogin = (
        <Login
            show={isShowLogin}
            HandleCloseLogin={HandleCloseLogin}
            HandleLoginSuccess={HandleLoginSuccess}
        />
    );

    // const ViewUserHeader = <UserHeader />;

    return (
        <header>
            <nav>
                <div className="nav-content">
                    <Link to="/">
                        <div className="nav-logo">
                            <img src={Logo} alt="logo"></img>
                            <h3>Pet Mate</h3>
                        </div>
                    </Link>
                    {isLogin ? null : handleRenderButtonLogin}
                </div>
            </nav>
            <div>{isShowLogin ? ViewLogin : null}</div>
        </header>
    );
};

export default Header;
