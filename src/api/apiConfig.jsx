import { env } from "../config/env";

const BACK_END_URL = env.BACK_END_URL || "http://192.168.0.118:8082";

const API_ENDPOINTS = {
    LOGIN: `${BACK_END_URL}/api/user/login`,
    GOOGLE_OAUTH: `${BACK_END_URL}/api/user/login/callback/google`,
    LOGOUT: `${BACK_END_URL}/api/user/logout`,
    SIGNUP: `${BACK_END_URL}/api/user/sign-up`,
    GET_USER: `${BACK_END_URL}/api/user`,
    UPDATE_USER: `${BACK_END_URL}/api/user`,
    OTP: `${BACK_END_URL}/api/user/otp`,
    VERIFY_OTP: `${BACK_END_URL}/api/user/otp`,
    POST_FOLLOW: `${BACK_END_URL}/api/user/follow`,
    GET_SUGGEST: `${BACK_END_URL}/api/user/suggest`,
    GET_FOLLOWING: `${BACK_END_URL}/api/user/follow`,
    ACCEPT_FOLLOW_REQUEST: `${BACK_END_URL}/api/user/follow`,
    DELETE_UNFOLLOW: `${BACK_END_URL}/api/user/follow`,
    GET_FOLLOWERS: `${BACK_END_URL}/api/user/follow`,

    POST_CREATE: `${BACK_END_URL}/api/media/post`,
    GET_POSTLIST: `${BACK_END_URL}/api/media/post`,
    DELETE_POST: `${BACK_END_URL}/api/media/post`,
    UPDATE_POST: `${BACK_END_URL}/api/media/post`,
    RE_POST: `${BACK_END_URL}/api/media/post`,
    POST_REPORT: `${BACK_END_URL}/api/report`,
    REPORT_DELETE: `${BACK_END_URL}/api/report`,

    POST_LIKE: `${BACK_END_URL}/api/media/like`,
    DELETE_LIKE: `${BACK_END_URL}/api/media/like`,

    POST_COMMNET: `${BACK_END_URL}/api/media/comment`,
    GET_COMMENT: `${BACK_END_URL}/api/media/comment`,
    UPDATE_COMMENT: `${BACK_END_URL}/api/media/comment`,
    DELETE_COMMENT: `${BACK_END_URL}/api/media/comment`,

    POST_BOOKMARK: `${BACK_END_URL}/api/media/bookmark`,
    GET_BOOKMARK: `${BACK_END_URL}/api/media/bookmark`,
    DELETE_BOOKMARK: `${BACK_END_URL}/api/media/bookmark`,

    POST_PIN: `${BACK_END_URL}/api/media/pin`,
    GET_PIN: `${BACK_END_URL}/api/media/pin`,
    DELETE_UNPIN: `${BACK_END_URL}/api/media/pin`,

    POST_PRODUCT: `${BACK_END_URL}/api/marketplace/product`,
    GET_ALL_PRODUCT: `${BACK_END_URL}/api/marketplace/product`,
    UPDATE_PRODUCT: `${BACK_END_URL}/api/marketplace/product`,
    DELETE_PRODUCT: `${BACK_END_URL}/api/marketplace/product`,
    CHECKOUT: `${BACK_END_URL}/api/transaction/checkout`,
    GET_ACCOUNT_STATUS: `${BACK_END_URL}/api/transaction/account-status`,
    ACCOUNT_CREATE: `${BACK_END_URL}/api/transaction/account-create`,
    DASHBOARD: `${BACK_END_URL}/api/transaction/dashboard`,
    GET_TRANSACTION: `${BACK_END_URL}/api/transaction`,
    GET_ANALYTICS: `${BACK_END_URL}/api/transaction/analytics`,

    POST_WISHLIST: `${BACK_END_URL}/api/marketplace/wishlist`,
    DELETE_WISHLIST: `${BACK_END_URL}/api/marketplace/wishlist`,
    GET_ALL_WISHLIST: `${BACK_END_URL}/api/marketplace/wishlist`,

    GET_ALL_NOTIFICATION: `${BACK_END_URL}/api/notification`,

    //ADMIN API
    STATUS_PRODUCT: `${BACK_END_URL}/api/marketplace/product/publish`,
    SEND_EMAIL: `${BACK_END_URL}/api/email`,
    REPORT_COUNT: `${BACK_END_URL}/api/report/counts`,
    REPORT: `${BACK_END_URL}/api/report`,
};

export default API_ENDPOINTS;
