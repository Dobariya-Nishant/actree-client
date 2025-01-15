export const env = {
  PORT: Number(process.env.REACT_APP_PORT) || 5000,
  USER_SERVICE_URL: "https://api.user.activatree.com" || "",
  POST_SERVICE_URL: "https://api.post.activatree.com" || "",
  GOOGLE_CLIENT_ID:
    "274136206982-naj76ba4l49nqieh60ce0o4lkep704n3.apps.googleusercontent.com" ||
    "",
  GOOGLE_CLIENT_SECRETE: process.env.REACT_APP_GOOGLE_CLIENT_SECRETE || "",
  GOOGLE_REDIRECT_URL: "https://activatree.com/auth/callback" || "",
};
