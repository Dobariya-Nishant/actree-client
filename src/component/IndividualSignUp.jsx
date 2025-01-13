import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpContext } from "../context/SignUpContext";
//import API_ENDPOINTS from "../api/apiConfig";
//import { networkRequest } from "../utils/networkRequest";

const IndividualSignUp = () => {
    const navigate = useNavigate();
    const { signUpData } = useSignUpContext();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [gender, setSelectedOption] = useState('');
    const [showForm, setShowForm] = useState(true);
    //const { type } = signUpData;
    // const [userType, setUserType] = useState("");
    const [formData, setFormData] = useState({
        phoneNumber: signUpData.phoneNumber || '',
        bio: signUpData.bio || '',
        dateOfBirth: signUpData.dateOfBirth || '',
        gender: signUpData.gender || '',
        profilePicture: signUpData.profilePicture || null,
        type: signUpData.type || ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevData) => ({ ...prevData, profilePicture: file }));
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        setFormData((prevData) => ({ ...prevData, gender: selectedValue }));
        updateSignUpData("gender", selectedValue);
        setErrors((prevErrors) => ({ ...prevErrors, gender: '' }));
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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        //console.log("Hello User", user)
        const token = localStorage.getItem("token");
        if (user) {
            // setUserType(user.type || "");
            setFormData({
                type: user.type || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.bio || "",
                //dateOfBirth: user.dateOfBirth || "",
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : "",
                //gender: user.gender || "",
                location: user.location || "",
                profilePicture: user.profilePicture || null,
            });
            setSelectedOption(user.gender || "");
        }
    }, []);

    const { updateSignUpData } = useSignUpContext();
    const handleNext = () => {
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) return
            updateSignUpData(key, formData[key]);
        });
        setShowForm(false);
        navigate("/connectSocials");

    };
    return (
        <>
            <Box sx={{ py: 1, px: 10, }}>
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
                    px: 2,
                }}
            >
                {showForm ? (
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
                        {formData.type === "individual" ? (
                            <>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    Individual Sign Up
                                </Typography>
                                <Typography sx={{ mb: 4, color: "gray" }}>
                                    Optional Information
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "right",
                                        justifyContent: "start",
                                        gap: 2,
                                        mb: 2,
                                    }}
                                >
                                    <img
                                        src="assets/images/navbar/User Image.png"
                                        alt="User"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <Button style={{ backgroundColor: "#9A00A9", }}
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        sx={{
                                            mb: 2,
                                            maxWidth: "200px",
                                            borderRadius: "50px",
                                            "& .MuiOutlinedInput-root": {
                                                color: "white",
                                            },
                                            "&:hover": {
                                                color: "white",
                                            },
                                        }}
                                    >
                                        Upload a Picture
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            fullWidth

                                        />
                                    </Button>
                                </Box>
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    InputLabelProps={{ shrink: true }}
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
                                    label="About Me..."
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    error={!!errors.bio}
                                    helperText={errors.bio}
                                    InputLabelProps={{ shrink: true }}
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
                                    label="Date Of Birth"
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    error={!!errors.dateOfBirth}
                                    helperText={errors.dateOfBirth}
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                <FormControl fullWidth sx={commonStyles}>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={gender}
                                        onChange={handleSelectChange}
                                        label="Choose Option"
                                        fullWidth
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* {errors.gender && (
                                    <Typography color="error">{errors.gender}</Typography>
                                )} */}
                                <TextField
                                    label="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    error={!!errors.location}
                                    helperText={errors.location}
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
                            </>
                        ) : (
                            <>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    Business Sign Up
                                </Typography>
                                <Typography sx={{ mb: 4, color: "gray" }}>
                                    Other Information
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "right",
                                        justifyContent: "start",
                                        gap: 2,
                                        mb: 2,
                                    }}
                                >
                                    <img
                                        src="assets/images/navbar/User Image.png"
                                        alt="User"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <Button style={{ backgroundColor: "#9A00A9", }}
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        sx={{
                                            mb: 2,
                                            maxWidth: "200px",
                                            borderRadius: "50px",
                                            "& .MuiOutlinedInput-root": {
                                                color: "white",
                                            },
                                            "&:hover": {
                                                color: "white",
                                            },
                                        }}
                                    >
                                        Upload a Picture
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            fullWidth

                                        />
                                    </Button>
                                </Box>
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
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
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    error={!!errors.address}
                                    helperText={errors.address}
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
                                    label="About Company"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    error={!!errors.bio}
                                    helperText={errors.bio}
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
                                    label="Operating Hours"
                                    name="operatingHours"
                                    value={formData.operatingHours}
                                    onChange={handleInputChange}
                                    error={!!errors.operatingHours}
                                    helperText={errors.operatingHours}
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
                            </>
                        )}
                        <Typography sx={{ mb: 2, color: "#9A00A9", marginLeft: "30%" }}
                            onClick={handleNext}
                        >
                            Skip for Now
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                                background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                borderRadius: 10,
                                width: "100%",
                                maxWidth: "400px",
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Next'}
                        </Button>
                        <Typography sx={{ mt: 2 }}>
                            Already have an account?
                            <Link to="/login" underline="none" sx={{ color: "purple" }}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="h5" sx={{ mt: 4 }}>
                        Redirecting to Connect Your Socials...
                    </Typography>
                )}
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
            </Box >
        </>
    );
};
export default IndividualSignUp;
