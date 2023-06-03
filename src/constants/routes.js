const ROUTES = {
    HOME_PAGE: {
        HOME_PATH: "/",
    },

    ADMIN_PAGE: {
        ADMIN_HOME: "/admin",
        ACCOUNT_ADMIN: "/admin/account",
        SITTER_ADMIN: "/admin/sitter",
        PET_ADMIN: "/admin/pet",
    },

    CUSTOMER_PAGE: {
        SERVICE_PAGE: "/customer/service",
        CUSTOMER_PROFILE_PAGE: "/customer/profile",
        CUSTOMER_BECOME_SITTER_PAGE: "/customer/sitter",
    },

    BLOG_PAGE: {
        HOME_PATH: "/blog",
    },

    NOT_FOUND_PAGE: {
        path: "*",
    },
};

export default ROUTES;
