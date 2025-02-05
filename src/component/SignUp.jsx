import React, { useState, useEffect } from 'react';
import { useSignUpContext } from "../context/SignUpContext";
import { useNavigate } from "react-router-dom";
import { Box, TextField, InputAdornment, IconButton, Button, Typography, Select, MenuItem, FormControl, Checkbox, FormControlLabel, InputLabel, CircularProgress, } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import { AuthTypeEnum } from "../enums/oauth";
import { env } from "../config/env";

const SignUp = () => {
    const navigate = useNavigate();
    const { signUpData, updateSignUpData } = useSignUpContext();
    const [showPassword, setShowPassword] = useState(false);
    const [type, setSelectedOption] = useState('');
    const [formData, setFormData] = useState({
        type: '',
        fullName: '',
        userName: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [otpVerified, setOtpVerified] = useState(false);

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
                type: type,
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
                { authType, type: type },
                {},
                "no-cors"
            );
        } catch (error) {
            console.log("Oauth Error", error);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setErrors({});
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        updateSignUpData(name, value);
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (type === 'individual') {
            if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
            if (!formData.userName) newErrors.userName = 'User Name is required.';
            if (!formData.email) newErrors.email = 'Email is required.';
            if (!formData.password) newErrors.password = 'Password is required.';
        } else if (type === 'business') {
            if (!formData.businessName) newErrors.businessName = 'Business Name is required.';
            if (!formData.userName) newErrors.userName = 'User Name is required.';
            if (!formData.email) newErrors.email = 'Email is required.';
            if (!formData.password) newErrors.password = 'Password is required.';
            if (!formData.businessCategory) newErrors.businessCategory = 'Business Category is required.';
        } else {
            newErrors.type = 'Please Select a Account Type.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setIsLoading(true);
        try {
            const response = await networkRequest("post", API_ENDPOINTS.OTP, {
                email: formData.email,
                type: "sign-up",
            });
            if (response.statusCode === 201) {
                const otpFromResponse = response.data?.otp;
                if (otpFromResponse && otpFromResponse.length === 4) {
                    setOtp(otpFromResponse.split(''));
                    setIsOtpSent(true);
                }
            } else {
                console.error("OTP API failed:", response);
                alert(response.message || "Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error while sending OTP:", error.response?.data || error.message);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (value, index) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < otp.length - 1) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            nextInput && nextInput.focus();
        }
    };

    const validateOtp = () => {
        if (otp.join('').length < 4) {
            alert("Please enter the complete OTP.");
            return false;
        }
        return true;
    };

    const handleSubmitOTPVeryfy = async () => {
        if (!validateOtp()) return;
        setIsLoading(true);
        try {
            const response = await networkRequest("PATCH", API_ENDPOINTS.VERIFY_OTP, {
                email: formData.email,
                otp: otp.join(''),
            });
            if (response.statusCode === 201) {
                setOtpVerified(true);
                updateSignUpData({ otpVerified: true });
                navigate('/individualSignUp');
            } else {
                alert("OTP verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during OTP verification:", error);
            alert("An error occurred while verifying OTP.");
        } finally {
            setIsLoading(false);
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
            <style>
                {`
                    @media (max-width: 1024px) {
                        img[alt="Tree Design"] {
                            margin-left: 0 !important;
                        }
                    }
                `}
            </style>
            <Box
                sx={{
                    py: 1, px: 10,
                }}
            >
                <img
                    src="assets/images/navbar/activatreelogo.png"
                    alt="Tree Design"
                    style={{
                        height: "60px",
                        width: "auto",
                        marginLeft: "13%",
                    }}
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
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        Sign Up
                    </Typography>
                    <Typography sx={{ mb: 4, color: "gray" }}>
                        It’s Easy! Just Take A Minute To Provide The Details.
                    </Typography>

                    <FormControl fullWidth sx={commonStyles}>
                        <InputLabel>Select Account Type</InputLabel>
                        <Select
                            value={type}
                            //onChange={handleSelectChange}
                            onChange={(event) => {
                                const selectedValue = event.target.value;
                                setSelectedOption(selectedValue);
                                updateSignUpData("type", selectedValue);
                                setErrors((prevErrors) => ({ ...prevErrors, type: '' }));
                            }}
                            label="Choose Option"
                            fullWidth
                        >
                            <MenuItem value="individual">Individual Account</MenuItem>
                            <MenuItem value="business">Business / Organization Account</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.type && (
                        <Typography color="error">{errors.type}</Typography>
                    )}

                    {type === 'individual' && (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => googleOauthURL(AuthTypeEnum.GOOGLE)}
                                startIcon={
                                    <img
                                        src="assets/images/navbar/icon_google.png"
                                        alt="Google Logo"
                                    />
                                }
                                //disabled={!type}
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
                                startIcon={<AppleIcon sx={{ color: "#000000" }} />}
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
                                startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
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
                            <TextField
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                error={!!errors.fullName}
                                helperText={errors.fullName}
                                variant="outlined"
                                fullWidth
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
                            <TextField
                                label="User Name"
                                name="userName"
                                value={formData.userName}
                                onChange={handleInputChange}
                                error={!!errors.userName}
                                helperText={errors.userName}
                                variant="outlined"
                                fullWidth
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
                            <TextField
                                label="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                variant="outlined"
                                fullWidth
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
                            <TextField
                                label="Password"
                                variant="outlined"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                fullWidth
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
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </>
                    )}

                    {type === 'business' && (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => googleOauthURL(AuthTypeEnum.GOOGLE)}
                                startIcon={
                                    <img
                                        src="assets/images/navbar/icon_google.png"
                                        alt="Google Logo"
                                    />
                                }
                                //disabled={!selectedOption}
                                sx={{
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
                                startIcon={<AppleIcon sx={{ color: "#000000" }} />}
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
                                startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
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
                            <TextField
                                label="Business Name"
                                variant="outlined"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleInputChange}
                                error={!!errors.businessName}
                                helperText={errors.businessName}
                                fullWidth
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
                            <TextField
                                label="User Name/Handle"
                                variant="outlined"
                                name="userName"
                                value={formData.userName}
                                onChange={handleInputChange}
                                error={!!errors.userName}
                                helperText={errors.userName}
                                fullWidth
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
                            <TextField
                                label="Email Address"
                                variant="outlined"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                fullWidth
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
                            <TextField
                                label="Password"
                                variant="outlined"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                fullWidth
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
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <FormControl fullWidth sx={commonStyles}>
                                <InputLabel>Business Category</InputLabel>
                                <Select
                                    // value={selectedOption}
                                    // onChange={handleSelectChange}
                                    name="businessCategory"
                                    value={formData.businessCategory}
                                    onChange={handleInputChange}
                                    error={!!errors.businessCategory}
                                    label="Choose Option"
                                    fullWidth
                                >
                                    <MenuItem value="Retail">Retail</MenuItem>
                                    <MenuItem value="Service">Service</MenuItem>
                                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                                    <MenuItem value="Hospitality">Hospitality</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}

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
                        <FormControlLabel
                            control={<Checkbox />}
                            label={
                                <>
                                    By signing up, I agree and accept the
                                    <Typography
                                        component="span"
                                        style={{ color: "#9A00A9" }}
                                    >
                                        Terms of Use
                                    </Typography>
                                    {" "}and{" "}
                                    <Typography
                                        component="span"
                                        style={{ color: "#9A00A9" }}
                                    >
                                        Privacy Policy
                                    </Typography>.
                                </>
                            }
                        />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        sx={{
                            background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                            borderRadius: 10,
                            width: "100%",
                            maxWidth: "400px",
                        }}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Get 4-Digit Code'}
                    </Button>
                    <Typography sx={{ mt: 2 }}>
                        Already have an account?
                        <Link to="/login" underline="none" sx={{ color: "purple" }}>
                            Login
                        </Link>
                    </Typography>
                    {/* {otp && (
                        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                            Your OTP: {otp}
                        </Typography>
                    )} */}

                    {isOtpSent && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                                Enter Your Code
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4 }}>
                                We Sent a Code to <b>{formData.email}</b>
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 2,
                                    mb: 2,
                                }}
                            >
                                {otp.map((value, index) => (
                                    <TextField
                                        key={index}
                                        id={`otp-input-${index}`}
                                        value={value}
                                        onChange={(e) => handleOtpChange(e.target.value, index)}
                                        inputProps={{
                                            maxLength: 1,
                                            style: {
                                                textAlign: "center",
                                                fontSize: "24px",
                                                fontWeight: "bold",
                                                width: "20px",
                                                height: "20px",
                                            },
                                        }}
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{ mb: 4, cursor: "pointer" }}
                            >
                                Don’t receive the email? <b>Click to Resend</b>
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={handleSubmitOTPVeryfy}
                                disabled={isLoading}
                                sx={{
                                    background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                    borderRadius: 10,
                                    padding: "10px 20px",
                                    color: "#fff",
                                    width: "100%",
                                    maxWidth: "400px",
                                }}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Continue"}
                            </Button>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
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

export default SignUp;
