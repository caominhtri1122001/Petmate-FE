import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ROUTES from "../constants/routes";
import MainLayout from "../layout/MainLayout";
import PublicRoute from "./PublicRoute";
import Home from "../page/Home/Home";
import NotFound from "../page/NotFound/NotFound";
import Payment from "../page/Payment/Payment";

//Admin
import AdminRoute from "./AdminRoute/AdminRoute";
import HomeAdmin from "../page/ComponentAdmin/HomeAdmin/HomeAdmin";
import AccountAdmin from "../page/ComponentAdmin/AccountAdmin/AccountAdmin";
import SitterAdmin from "../page/ComponentAdmin/SitterAdmin/SitterAdmin";
import PetAdmin from "../page/ComponentAdmin/PetAdmin/PetAdmin";
import ServiceAdmin from "../page/ComponentAdmin/ServiceAdmin/ServiceAdmin";
import BlogAdmin from "../page/ComponentAdmin/BlogAdmin/BlogAdmin";
import UpdateBlogAdmin from "../page/ComponentAdmin/UpdateBlogAdmin/UpdateBlogAdmin";
import ManageBlogAdmin from "../page/ComponentAdmin/ManageBlogAdmin/ManageBlogAdmin";

//Customer
import CustomerRoute from "./CustomerRoute/CustomerRoute";
import Customer from "../page/ComponentCustomer/Customer";
import SitterCustomer from "../page/ComponentCustomer/SitterCustomer/SitterCustomer";
import ServiceCustomer from "../page/ComponentCustomer/ServiceCustomer/ServiceCustomer";
import RequestCustomer from "../page/ComponentCustomer/RequestCustomer/RequestCustomer";
import AssistanceCustomer from "../page/ComponentCustomer/AssistanceCustomer/AssistanceCustomer";

//Sitter
import StaffRoute from "./StaffRoute/StaffRoute";
import Sitter from "../page/ComponentStaff/Sitter";
import ServiceSitter from "../page/ComponentStaff/ServiceSitter/ServiceSitter";
import RequestSitter from "../page/ComponentStaff/RequestSitter/RequestSitter";
import ScheduleSitter from "../page/ComponentStaff/ScheduleSitter/ScheduleSitter";
import AssistanceSitter from "../page/ComponentStaff/AssistanceSitter/AssistanceSitter";

//Blog
import Blog from "../page/Blog/Blog";
import BlogRoute from "./BlogRoute/BlogRoute";
import DetailBlog from "../page/Blog/DetailBlog/DetailBlog";
import RequestAdmin from "../page/ComponentAdmin/RequestAdmin/RequestAdmin";

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
                    <AdminRoute
                        component={RequestAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.REQUEST_ADMIN}
                    />
                    <AdminRoute
                        component={ManageBlogAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.MANAGE_BLOG_ADMIN}
                    />
                    <BlogRoute
                        component={BlogAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.BLOG_ADMIN}
                    />
                    <BlogRoute
                        component={UpdateBlogAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.BLOG_UPDATE_ADMIN}
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
                    <CustomerRoute
                        component={AssistanceCustomer}
                        exact
                        path={ROUTES.CUSTOMER_PAGE.CUSTOMER_ASSISTANT}
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
                    <StaffRoute
                        component={AssistanceSitter}
                        exact
                        path={ROUTES.SITTER_PAGE.SITTER_ASSISTANT}
                    />

                    {/* Blog  */}
                    <PublicRoute
                        component={Blog}
                        exact
                        path={ROUTES.BLOG_PAGE.HOME_PATH}
                    />
                    <PublicRoute
                        component={DetailBlog}
                        path={ROUTES.BLOG_PAGE.DETAIL_BLOG}
                    />

                    {/* Payment */}
                    <PublicRoute
                        component={Payment}
                        path={ROUTES.CUSTOMER_PAGE.CUSTOMER_PAYMENT}
                    />

                    {/* Others - Must be the last */}
                    <PublicRoute
                        component={NotFound}
                        path={ROUTES.NOT_FOUND_PAGE.path}
                    />
                    <PublicRoute
                        component={NotFound}
                        path={ROUTES.NOT_FOUND_PAGE.NOT_FOUND}
                    />
                </Switch>
            </MainLayout>
        </Router>
    );
};

export default Routes;
