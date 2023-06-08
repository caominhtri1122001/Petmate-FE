import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "../../config/service/AuthenticationService";
import "./BlogRoute.css";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";

const BlogRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        component={(props) =>
            AuthenticationService.isLogin() &&
            JSON.parse(localStorage.getItem("@Login")).role === "ADMIN" ? (
                <div className="">
                    <Header />
                    <Component {...props} />
                    <Footer />
                </div>
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

export default BlogRoute;
