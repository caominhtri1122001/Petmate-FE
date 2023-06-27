const ROUTES = {
    HOME_PAGE: {
        HOME_PATH: "/",
    },

    ADMIN_PAGE: {
        ADMIN_HOME: "/admin",
        BLOG_ADMIN: "/admin/blog",
        BLOG_UPDATE_ADMIN: "/admin/blog/:id",
        MANAGE_BLOG_ADMIN: "/admin/manage-blog",
        ACCOUNT_ADMIN: "/admin/account",
        SITTER_ADMIN: "/admin/sitter",
        PET_ADMIN: "/admin/pet",
        SERVICE_ADMIN: "/admin/service",
        REQUEST_ADMIN: "/admin/request",
    },

    CUSTOMER_PAGE: {
        SERVICE_PAGE: "/customer/service",
        CUSTOMER_PROFILE_PAGE: "/customer/profile",
        CUSTOMER_BECOME_SITTER_PAGE: "/customer/sitter",
        CUSTOMER_REQUEST: "/customer/request",
        CUSTOMER_ASSISTANT: "/customer/chatbot",
        CUSTOMER_PAYMENT: "/payment",
    },

    SITTER_PAGE: {
        SITTER_SERVICE_PAGE: "/sitter/service",
        SITTER_PROFILE_PAGE: "/sitter/profile",
        SITTER_REQUEST: "/sitter/request",
        SITTER_SCHEDULES: "/sitter/schedules",
        SITTER_ASSISTANT: "/sitter/chatbot",
    },

    BLOG_PAGE: {
        HOME_PATH: "/blog",
        DETAIL_BLOG: "/detail/:id",
    },

    NOT_FOUND_PAGE: {
        path: "*",
        NOT_FOUND: "/not-found",
    },
};

export default ROUTES;
