import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ROUTES from "../constants/routes";
import MainLayout from "../layout/MainLayout";
import PublicRoute from "./PublicRoute";
import Home from "../page/Home/Home";
import NotFound from "../page/NotFound/NotFound";

//Admin
import AdminRoute from "./AdminRoute/AdminRoute";
import HomeAdmin from "../page/ComponentAdmin/HomeAdmin/HomeAdmin";
import AccountAdmin from "../page/ComponentAdmin/AccountAdmin/AccountAdmin";
import SitterAdmin from "../page/ComponentAdmin/SitterAdmin/SitterAdmin";
import PetAdmin from "../page/ComponentAdmin/PetAdmin/PetAdmin";
import ServiceAdmin from "../page/ComponentAdmin/ServiceAdmin/ServiceAdmin";
import BlogAdmin from "../page/ComponentAdmin/BlogAdmin/BlogAdmin";

//Customer
import CustomerRoute from "./CustomerRoute/CustomerRoute";
import Customer from "../page/ComponentCustomer/Customer";
import SitterCustomer from "../page/ComponentCustomer/SitterCustomer/SitterCustomer";
import ServiceCustomer from "../page/ComponentCustomer/ServiceCustomer/ServiceCustomer";
import RequestCustomer from "../page/ComponentCustomer/RequestCustomer/RequestCustomer";

//Sitter
import StaffRoute from "./StaffRoute/StaffRoute";
import Sitter from "../page/ComponentStaff/Sitter";
import ServiceSitter from "../page/ComponentStaff/ServiceSitter/ServiceSitter";
import RequestSitter from "../page/ComponentStaff/RequestSitter/RequestSitter";
import ScheduleSitter from "../page/ComponentStaff/ScheduleSitter/ScheduleSitter";

//Blog
import Blog from "../page/Blog/Blog";
import BlogRoute from "./BlogRoute/BlogRoute";
const Routes = () => {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <PublicRoute
                        component={Home}
                        exact
                        path={ROUTES.HOME_PAGE.HOME_PATH}
                    />

                    {/* Admin Route */}
                    <AdminRoute
                        component={HomeAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.ADMIN_HOME}
                    />
                    <AdminRoute
                        component={AccountAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.ACCOUNT_ADMIN}
                    />
                    <AdminRoute
                        component={SitterAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.SITTER_ADMIN}
                    />
                    <AdminRoute
                        component={PetAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.PET_ADMIN}
                    />
                    <AdminRoute
                        component={ServiceAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.SERVICE_ADMIN}
                    />
                    <BlogRoute
                        component={BlogAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.BLOG_ADMIN}
                    />
                    {/* Customer Route */}
                    <CustomerRoute
                        component={Customer}
                        exact
                        path={ROUTES.CUSTOMER_PAGE.CUSTOMER_PROFILE_PAGE}
                    />
                    <CustomerRoute
                        component={ServiceCustomer}
                        exact
                        path={ROUTES.CUSTOMER_PAGE.SERVICE_PAGE}
                    />
                    <CustomerRoute
                        component={SitterCustomer}
                        exact
                        path={ROUTES.CUSTOMER_PAGE.CUSTOMER_BECOME_SITTER_PAGE}
                    />
                    <CustomerRoute
                        component={RequestCustomer}
                        exact
                        path={ROUTES.CUSTOMER_PAGE.CUSTOMER_REQUEST}
                    />

                    {/* Sitter */}

                    <StaffRoute
                        component={Sitter}
                        exact
                        path={ROUTES.SITTER_PAGE.SITTER_PROFILE_PAGE}
                    />

                    <StaffRoute
                        component={ServiceSitter}
                        exact
                        path={ROUTES.SITTER_PAGE.SITTER_SERVICE_PAGE}
                    />

                    <StaffRoute
                        component={RequestSitter}
                        exact
                        path={ROUTES.SITTER_PAGE.SITTER_REQUEST}
                    />

                    <StaffRoute
                        component={ScheduleSitter}
                        exact
                        path={ROUTES.SITTER_PAGE.SITTER_SCHEDULES}
                    />

                    {/* Blog  */}
                    <PublicRoute
                        component={Blog}
                        path={ROUTES.BLOG_PAGE.HOME_PATH}
                    />

                    {/* Others - Must be the last */}
                    <PublicRoute
                        component={NotFound}
                        path={ROUTES.NOT_FOUND_PAGE.path}
                    />
                </Switch>
            </MainLayout>
        </Router>
    );
};

export default Routes;
