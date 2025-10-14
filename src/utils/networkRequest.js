import axios from "axios";
import { env } from "../config/env";

export const networkRequest = async (
  method,
  url,
  body = {},
  headers = {},
  queryParams = {},
  urlParams = {},
  isAdmin = false
) => {
  try {
    const formData = new FormData();

    if (method !== "GET" && method !== "HEAD" && !(body instanceof FormData)) {
      for (const key in body) {
        if (Array.isArray(body[key])) {
          body[key].forEach((file) => {
            formData.append(key, file);
          });
        } else {
          formData.append(key, body[key]);
        }
      }
    }

    const token = localStorage.getItem("token");

    if (!headers?.authorization && token) {
      headers.authorization = token;
    }

    const config = {
      method: method,
      url,
      headers: headers,
      params: queryParams,
    };

    if (method !== "GET" && method !== "HEAD") {
      config.data = !(body instanceof FormData) ? formData : body;
      if (!config.headers) {
        config.headers = {};
      }
      config.headers["Content-Type"] = "multipart/form-data";
    }
    //debugger;
    const response = await axios(config);

    //debugger;

    return response.data;
  } catch (error) {
    //debugger;
    console.error("Error with network request:", error);

    // console.log(window.location.href);

    debugger;

    if (
      error.response &&
      error.response.status === 401 &&
      !isAdmin &&
      window.location.href != `${env.FRONT_END_URL}/` &&
      url != `${env.BACK_END_URL}/api/notification`
    ) {
      console.warn("Session expired. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    // throw error;
  }
};
