import { env } from "../config/env";

const USER_SERVICE_URL = env.USER_SERVICE_URL || "http://192.168.0.118:8081";
const POST_SERVICE_URL = env.POST_SERVICE_URL || "http://192.168.0.118:8082";

const API_ENDPOINTS = {
    LOGIN: `${USER_SERVICE_URL}/api/user/login`,
    GOOGLE_OAUTH: `${USER_SERVICE_URL}/api/user/login/callback/google`,
    LOGOUT: `${USER_SERVICE_URL}/api/user/logout`,
    SIGNUP: `${USER_SERVICE_URL}/api/user/sign-up`,
    GET_USER: `${USER_SERVICE_URL}/api/user`,
    UPDATE_USER: `${USER_SERVICE_URL}/api/user`,
    OTP: `${USER_SERVICE_URL}/api/user/otp`,
    VERIFY_OTP: `${USER_SERVICE_URL}/api/user/otp`,
    POST_FOLLOW: `${USER_SERVICE_URL}/api/user/follow`,
    GET_SUGGEST: `${USER_SERVICE_URL}/api/user/suggest`,
    GET_FOLLOWING: `${USER_SERVICE_URL}/api/user/follow`,
    ACCEPT_FOLLOW_REQUEST: `${USER_SERVICE_URL}/api/user/follow`,
    DELETE_UNFOLLOW: `${USER_SERVICE_URL}/api/user/follow`,
    GET_FOLLOWERS: `${USER_SERVICE_URL}/api/user/follow`,


    POST_CREATE: `${POST_SERVICE_URL}/api/media/post`,
    GET_POSTLIST: `${POST_SERVICE_URL}/api/media/post`,
    DELETE_POST: `${POST_SERVICE_URL}/api/media/post`,
    UPDATE_POST: `${POST_SERVICE_URL}/api/media/post`,
    RE_POST: `${POST_SERVICE_URL}/api/media/post`,

    POST_LIKE: `${POST_SERVICE_URL}/api/media/like`,
    DELETE_LIKE: `${POST_SERVICE_URL}/api/media/like`,

    POST_COMMNET: `${POST_SERVICE_URL}/api/media/comment`,
    GET_COMMENT: `${POST_SERVICE_URL}/api/media/comment`,
    UPDATE_COMMENT: `${POST_SERVICE_URL}/api/media/comment`,
    DELETE_COMMENT: `${POST_SERVICE_URL}/api/media/comment`,

    POST_BOOKMARK: `${POST_SERVICE_URL}/api/media/bookmark`,
    GET_BOOKMARK: `${POST_SERVICE_URL}/api/media/bookmark`,
    DELETE_BOOKMARK: `${POST_SERVICE_URL}/api/media/bookmark`,

    POST_PIN: `${POST_SERVICE_URL}/api/media/pin`,
    GET_PIN: `${POST_SERVICE_URL}/api/media/pin`,
    DELETE_UNPIN: `${POST_SERVICE_URL}/api/media/pin`,


};

export default API_ENDPOINTS;
