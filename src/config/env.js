import { config } from "dotenv";

config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRETE: process.env.GOOGLE_CLIENT_SECRETE || "",
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL || "",
  GOOGLE_REDIRECT_BUSINESS_URL: process.env.GOOGLE_REDIRECT_BUSINESS_URL || "",
};
