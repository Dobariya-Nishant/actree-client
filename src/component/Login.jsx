import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  //Link,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
//import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import { AuthTypeEnum } from "../enums/oauth";
import { env } from "../config/env";

const Login = () => {
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    accountType: "",
  });
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const message = localStorage.getItem("logoutMessage");
    if (message) {
      toast.success(message);
      localStorage.removeItem("logoutMessage");
    }
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setErrors((prev) => ({ ...prev }));
  };

  function googleOauthURL(userType) {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      redirect_uri:
        env.GOOGLE_REDIRECT_URL || "http://localhost:3000/auth/callback",
      client_id:
        env.GOOGLE_CLIENT_ID ||
        "274136206982-naj76ba4l49nqieh60ce0o4lkep704n3.apps.googleusercontent.com",
      response_type: "code",
      state: JSON.stringify({
        type: selectedOption,
        authType: AuthTypeEnum.GOOGLE,
      }),
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const qs = new URLSearchParams(options);

    const url = `${rootUrl}?${qs.toString()}`;

    window.location.href = url;
  }

  const handleOauth = async (authType) => {
    try {
      if (authType === AuthTypeEnum.LOCAL) {
        throw new Error("Auth type is not valid");
      }
      const data = await networkRequest(
        "GET",
        API_ENDPOINTS.GOOGLE_OAUTH,
        {},
        {},
        { authType, type: selectedOption },
        {},
        "no-cors"
      );
    } catch (error) {
      console.log("Oauth Error", error);
    }
  };

  const handleSubmit = async () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        setLoading(true);
        const response = await networkRequest("POST", API_ENDPOINTS.LOGIN, {
          email,
          password,
        });
        if (response.statusCode === 200) {
          console.log("Login successful", response.data);

          if (!response?.data?.session?.token) {
            throw new Error("Token not found !!");
          }
          localStorage.setItem("token", response?.data?.session?.token);
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.href = "/socialMedia";
          navigate("/socialMedia");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        if (error.response && error.response.data) {
          const { statusCode, message } = error.response.data;
          setGeneralError(message || "An error occurred. Please try again.");
        } else {
          setGeneralError("An error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const commonStyles = {
    mb: 2,
    maxWidth: "400px",
    height: "40px",
    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
    },
    "& .MuiInputBase-input": {
      fontSize: "1rem",
      padding: "8px 8px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.75rem",
    },
  };

  return (
    <>
      <Box
        sx={{
          py: 1,
          px: 10,
        }}
      >
        <img
          src="assets/images/navbar/activatreelogo.png"
          alt="Tree Design"
          style={{ height: "50px", width: "auto", marginLeft: "12%" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          //height: "100vh",
          px: 2,
        }}
      >
        {/* <ToastContainer /> */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              width: { xs: "30%", sm: "10%" },
            }}
          >
            <img
              className="mb-10"
              src="assets/images/navbar/loginimg.png"
              alt="Tree Design"
              style={{ borderRadius: 8 }}
            />
          </Box>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Welcome Back, Log In Here
          </Typography>
          <Typography sx={{ mb: 4, color: "gray" }}>
            It’s Easy! Just Take A Minute To Provide The Details.
          </Typography>

          <FormControl fullWidth sx={commonStyles}>
            <InputLabel>Select Account Type</InputLabel>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              label="Choose Option"
              fullWidth
            >
              <MenuItem value="individual">Individual Account</MenuItem>
              <MenuItem value="business">
                Business / Organization Account
              </MenuItem>
            </Select>
          </FormControl>
          {/* {errors.accountType && (
                        <Typography color="error" variant="body2">
                            {errors.accountType}
                        </Typography>
                    )} */}

          <Button
            variant="outlined"
            onClick={() => googleOauthURL(AuthTypeEnum.GOOGLE)}
            startIcon={
              <img
                src="assets/images/navbar/icon_google.png"
                alt="Google Logo"
              />
            }
            disabled={!selectedOption}
            sx={{
              commonStyles,
              mb: 2,
              width: "100%",
              maxWidth: "400px",
              height: "40px",
              borderRadius: 10,
              textTransform: "none",
            }}
          >
            Continue with Google
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleOauth(AuthTypeEnum.APPLE)}
            startIcon={<AppleIcon sx={{ color: "#000000" }} />}
            disabled={!selectedOption}
            sx={{
              mb: 2,
              width: "100%",
              maxWidth: "400px",
              height: "40px",
              borderRadius: 10,
              textTransform: "none",
            }}
          >
            Continue with Apple
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleOauth(AuthTypeEnum.FACEBOOK)}
            startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
            disabled={!selectedOption}
            sx={{
              mb: 2,
              width: "100%",
              maxWidth: "400px",
              height: "40px",
              borderRadius: 10,
              textTransform: "none",
            }}
          >
            Continue with Facebook
          </Button>
          <Typography sx={{ my: 2 }}></Typography>

          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              mb: 2,
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                borderRadius: 10,
              },
              "& .MuiInputBase-input": {
                fontSize: "1rem",
                padding: "10px 10px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
              },
            }}
          />
          {generalError && (
            <Typography color="error" sx={{ mb: 2 }}>
              {generalError}
            </Typography>
          )}
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              mb: 1,
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                borderRadius: 10,
              },
              "& .MuiInputBase-input": {
                fontSize: "1rem",
                padding: "10px 10px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
              mb: 2,
            }}
          >
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Link to="#" style={{ color: "#9A00A9" }}>
              Reset Password
            </Link>
          </Box>
          <Button
            variant="contained"
            onClick={handleSubmit}
            //disabled={!selectedOption}
            sx={{
              background:
                "linear-gradient(to right, #9A00A9, #580097, #29008B)",
              borderRadius: 10,
              width: "100%",
              maxWidth: "400px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Typography sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Link to="/signup" underline="none" style={{ color: "#131010" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            p: 1,
          }}
        >
          <img
            src="assets/images/navbar/loginimg.png"
            alt="Tree Design"
            style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Login;
