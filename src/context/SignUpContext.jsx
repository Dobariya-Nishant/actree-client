import React, { createContext, useContext, useState } from "react";

const initialSignUpData = {
    type: "",
    fullName: "",
    userName: "",
    email: "",
    password: "",
    profilePicture: null,
    phoneNumber: "",
    bio: "",
    dateOfBirth: "",
    gender: "",
    location: "",
    address: "",
    operatingHours: "",
    businessCategory: "",
};

const SignUpContext = React.createContext();

export const SignUpProvider = ({ children }) => {
    const [signUpData, setSignUpData] = useState(initialSignUpData);

    const updateSignUpData = (key, value) => {
        setSignUpData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <SignUpContext.Provider value={{ signUpData, updateSignUpData }}>
            {children}
        </SignUpContext.Provider>
    );
};

export const useSignUpContext = () => React.useContext(SignUpContext);



// import React, { createContext, useContext, useState } from "react";

// const SignUpContext = createContext();

// export const useSignUpContext = () => useContext(SignUpContext);

// export const SignUpProvider = ({ children }) => {
//     const [signUpData, setSignUpData] = useState({
//         fullName: "",
//         userName: "",
//         email: "",
//         password: "",
//         otpVerified: false,
//         phoneNumber: "",
//         bio: "",
//         dateOfBirth: "",
//         gender: "",
//         profilePicture: null,
//         location: "",
//     });
//     const updateSignUpData = (newData) => {
//         setSignUpData((prev) => ({ ...prev, ...newData }));
//     };

//     return (
//         <SignUpContext.Provider value={{ signUpData, updateSignUpData }}>
//             {children}
//         </SignUpContext.Provider>
//     );
// };
