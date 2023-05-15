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

//Customer
import CustomerRoute from "./CustomerRoute/CustomerRoute";
import Customer from "../page/ComponentCustomer/Customer";

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
                    {/* Customer Route */}
                    <CustomerRoute
                        component={Customer}
                        exact
                        path={ROUTES.CUSTOMER_PAGE.CUSTOMER_PROFILE_PAGE}
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
