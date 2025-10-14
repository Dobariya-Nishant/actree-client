import React, { useState } from "react";
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
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
                }, {}, {}, {}, true);
                if (response.statusCode === 200) {
                    console.log("Login successful", response.data);
                    if (!response?.data?.session?.token) {
                        throw new Error("Token not found !");
                    }
                    localStorage.setItem("token", response?.data?.session?.token);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigate("/admin/Dashboard");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                if (error.response && error.response.data) {
                    const { message } = error.response.data;
                    setGeneralError(message || "An error occurred. Please try again.");
                    navigate("/admin/login");
                } else {
                    setGeneralError("An error occurred. Please try again later.");
                    navigate("/admin/login");
                }
            } finally {
                setLoading(false);
            }
        }
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
                    py: 1,
                    px: 10,
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <img
                    src="../assets/images/navbar/activatreelogo.png"
                    alt="Tree Design"
                    style={{
                        height: "50px",
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
                    <Box
                        sx={{
                            display: { xs: "block", md: "none" },
                            width: { xs: "30%", sm: "10%" },
                        }}
                    >
                        <img
                            className="mb-10"
                            src="../assets/images/navbar/loginimg.png"
                            alt="Tree Design"
                            style={{ borderRadius: 8 }}
                        />
                    </Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        Log In
                    </Typography>
                    <Typography sx={{ mb: 4, color: "gray" }}>
                        It’s easy! Just take a minute provide the details.
                    </Typography>

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
                        src="../assets/images/navbar/loginimg.png"
                        alt="Tree Design"
                        style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default AdminLogin;
