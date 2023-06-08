const ROUTES = {
    HOME_PAGE: {
        HOME_PATH: "/",
    },

    ADMIN_PAGE: {
        ADMIN_HOME: "/admin",
        BLOG_ADMIN: "/admin/blog",
        ACCOUNT_ADMIN: "/admin/account",
        SITTER_ADMIN: "/admin/sitter",
        PET_ADMIN: "/admin/pet",
        SERVICE_ADMIN: "/admin/service",
    },

    CUSTOMER_PAGE: {
        SERVICE_PAGE: "/customer/service",
        CUSTOMER_PROFILE_PAGE: "/customer/profile",
        CUSTOMER_BECOME_SITTER_PAGE: "/customer/sitter",
        CUSTOMER_REQUEST: "/customer/request",
    },

    SITTER_PAGE: {
        SITTER_SERVICE_PAGE: "/sitter/service",
        SITTER_PROFILE_PAGE: "/sitter/profile",
        SITTER_REQUEST: "/sitter/request,",
        SITTER_SCHEDULES: "/sitter/schedules",
    },

    BLOG_PAGE: {
        HOME_PATH: "/blog",
    },

    NOT_FOUND_PAGE: {
        path: "*",
    },
};

export default ROUTES;
