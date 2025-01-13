import axios from "axios";

export const networkRequest = async (
  method,
  url,
  body = {},
  headers = {},
  queryParams = {},
  urlParams = {}
) => {
  try {
    const formData = new FormData();

    //debugger;

    if (method !== "GET" && method !== "HEAD" && !body instanceof FormData) {
      for (const key in body) {
        formData.append(key, body[key]);
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
      config.data = !body instanceof FormData ? formData : body;
      if (!config.headers) {
        config.headers = {};
      }
      config.headers["Content-Type"] = "multipart/form-data";
    }

    const response = await axios(config);

    return response.data;
  } catch (error) {
    console.error("Error with network request:", error);
    throw error;
  }
};
