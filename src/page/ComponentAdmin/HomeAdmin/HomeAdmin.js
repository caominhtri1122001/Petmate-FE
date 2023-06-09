import React from "react";
import "./HomeAdmin.css";
import PictureWelcome from "../../../assets/images/welcome.png";
import { useHistory } from "react-router-dom";

function HomeAdmin() {
    const history = useHistory();
    const HandleBackToHome = () => {
        history.push("/");
    };
    return (
        <div className="common">
            <div className="home-message">
                <i className="fa fa-circle one"></i>
                <i className="fa fa-circle two"></i>
                <i className="fa fa-circle three"></i>
                <i className="fa fa-circle four"></i>
                <i className="fa fa-circle five"></i>
                <i className="fa fa-circle six"></i>
                <i className="fa fa-circle seven"></i>
                <i className="fa fa-circle eight"></i>
                <h1>Hello</h1>
                <h3>Welcome to the admin page.</h3>
                <button className="btnBack" onClick={HandleBackToHome}>
                    Go to Home
                </button>
            </div>
            <div className="home-image">
                <img src={PictureWelcome} alt="welcome" />
            </div>
        </div>
    );
}

export default HomeAdmin;
