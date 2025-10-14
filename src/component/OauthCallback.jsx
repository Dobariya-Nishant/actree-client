import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  async function name() {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = JSON.parse(params.get("state"));
    debugger
    if (code) {
      const response = await networkRequest(
        "GET",
        API_ENDPOINTS.GOOGLE_OAUTH,
        {},
        {},
        { authType: state.authType, type: state.type, code },
        {}
      );

      if (!response?.data?.session?.token) {
        throw new Error("Token not found !!");
      }

      localStorage.setItem("token", response?.data?.session?.token);

      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/socialMedia";
      navigate("/socialMedia");
    } else {
      // Handle error: code not found or other issues
      console.error("No authorization code found");
    }
  }

  useEffect(() => {
    name();
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
