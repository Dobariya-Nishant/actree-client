import { config } from "dotenv";

config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "",
  POST_SERVICE_URL: process.env.POST_SERVICE_URL || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRETE: process.env.GOOGLE_CLIENT_SECRETE || "",
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL || "",
};
