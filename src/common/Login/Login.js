import React, { useState } from "react";
import "./Login.css";
import loginPicture from "../../assets/images/petLoginSide.png";
import Logo from "../../assets/images/Logo.png";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
import AuthenticationService from "../../config/service/AuthenticationService";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = (event) => {
        event.preventDefault();
        var check = false;
        if (check) {
            return;
        } else {
            AuthenticationService.postLogin({
                email: document.querySelector("#input-username").value,
                password: document.querySelector("#input-password").value,
            })
                .then((res) => {
                    if (res.userId) {
                        props.HandleCloseLogin();
                        props.HandleLoginSuccess();
                        AuthenticationService.saveDataLogin(res);
                        if (res.role === "ADMIN")
                            // history.push(ROUTES.NOT_FOUND_PAGE);
                            history.push("/admin");
                    } else {
                        setErrorServer(true);
                        // setErrorMessage("Does Not Exists");
                    }
                })
                .catch(() => setIsLoading(false));
        }
    };

    const handleChange = (e) => {
        if (e.target.id === "input-username") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };

    return (
        <div>
            <ModalCustom
                show={props.show}
                handleCloseModalCustom={props.HandleCloseLogin}
                content={
                    <div className="login-container">
                        <form onSubmit={handleLogin}>
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
                                    <img src={Logo} alt="logo"></img>
                                    <h1>Login</h1>
                                    <label
                                        className={
                                            "error" +
                                            (errorServer
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Incorrect email or password
                                    </label>
                                    <input
                                        id="input-username"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        onChange={handleChange}
                                        value={email}
                                    />
                                    <label
                                        className={
                                            "error" +
                                            (errorEmail
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Invalid Email
                                    </label>
                                    <input
                                        id="input-password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handleChange}
                                    />
                                    <label
                                        className={
                                            "error" +
                                            (errorPassword
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Password must be at least 6 chars long
                                    </label>
                                    <button type="submit" className="login">
                                        Login
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

export default Login;
