import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import { ArrowBack } from "@mui/icons-material";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

export default function AddNewCategory() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        displayMedia: [],
        orignalMedia: [],
    });
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [platformFee, setPlatformFee] = useState("0.00%");
    const [sellerReceive, setSellerReceive] = useState("$0.00");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };

    const handleDisplayImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                displayMedia: [
                    ...prevData.displayMedia,
                    ...files.map((file) => ({
                        file: file,
                        name: file.name,
                        type: file.type
                    }))
                ],
                orignalMedia: [
                    ...prevData.orignalMedia,
                    ...files.map((file) => ({
                        file: file,
                        name: file.name,
                        type: file.type
                    }))
                ],
            }));
        }
    };
    const handleVideoAudioPDFUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const allowedTypes = ["video/", "audio/", "application/pdf"];
            const validFiles = files.filter((file) =>
                allowedTypes.some((type) => file.type.startsWith(type))
            );
            if (validFiles.length > 0) {
                setFormData((prevData) => ({
                    ...prevData,
                    orignalMedia: [
                        ...prevData.orignalMedia,
                        ...validFiles.map((file) => ({
                            file: file,
                            name: file.name,
                            type: file.type
                        }))
                    ]
                }));
            }
        }
    };
    const handlePriceChange = (e) => {
        let enteredPrice = parseFloat(e.target.value);
        if (isNaN(enteredPrice)) {
            setPrice("");
            setPlatformFee("0.00%");
            setSellerReceive("$0.00");
            return;
        }
        setPrice(enteredPrice);
        let fee = (enteredPrice * 25) / 100;
        let finalAmount = enteredPrice - fee;
        setPlatformFee(`${fee.toFixed(2)}%`);
        setSellerReceive(`$${finalAmount.toFixed(2)}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Product Name is required";
        if (!formData.category) newErrors.category = "Product Category is required";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const uploadData = new FormData();
        uploadData.append("name", formData.name);
        uploadData.append("category", formData.category);
        uploadData.append("description", formData.description);
        uploadData.append("price", price);
        formData.displayMedia.forEach((media, index) => {
            uploadData.append(`displayMedia`, media.file);
        });
        formData.orignalMedia.forEach((media, index) => {
            uploadData.append("orignalMedia", media.file);
        });
        Object.keys(uploadData).forEach((key) => {
            uploadData.append(key, uploadData[key]);
        });
        console.log("Submitting Data: ", uploadData);
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.POST_PRODUCT, uploadData);
            if (response.statusCode === 200) {
                console.log("Category created successFully!");
                navigate("/ProductSellerList");
            } else {
                console.error("Failed to create category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleBack = () => {
        navigate("/ProductSellerList");
    };

    return (
        <>
            <style>{`
                .submit-btn {
                    background: linear-gradient(to right, #9A00A9, #580097, #29008B);
                    border-radius: 30px;
                    padding: 8px 20px;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    display: block;
                    width: 150px;
                    text-align: center;
                    margin: 20px auto;
                    font-size: 16px;
                    font-weight: bold;
                }

                .form-container {
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                }
                .form-control {
                    border-radius: 30px;
                }

                label {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }
                
                .span {
                    font-size: 12px;
                    color: #777;
                }
                .required {
                    color: red;
                }

                .upload-box {
                    border: 2px dashed #ddd;
                    padding: 40px;
                    text-align: center;
                    border-radius: 10px;
                    color: #666;
                    //height: 250px;
                }
                
                .upload-note {
                    font-size: 12px;
                    color: #777;
                }

                .image-preview {
                    display: grid;
                    gap: 10px;
                    margin-top: 15px;
                    //justify-content: center;
                    grid-template-columns: repeat(4, 1fr);
                }

                .image-thumb {
                    width: 70px;
                    height: 70px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f9f9f9;
                }

                .radio-group {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .radio-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .radio-label input {
                    display: none;
                }

                .custom-radio {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #580097;
                    border-radius: 50%;
                    display: inline-block;
                    position: relative;
                }

                .radio-label input:checked + .custom-radio {
                    background-color: #580097;
                }

                .radio-label input:checked + .custom-radio::after {
                    content: "";
                    width: 10px;
                    height: 10px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                @media (max-width: 768px) {
                    .form-container {
                        padding: 15px;
                    }
                    .submit-btn {
                        width: 100%;
                    }
                    .image-preview {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 1px;
                    }
                    .image-thumb {
                        width: 60px;
                        height: 60px;
                    }
                }
                @media (max-width: 820px) {
                    .image-preview {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 1px;
                    }
                    .image-thumb {
                        width: 60px;
                        height: 60px;
                    }
                }                    
            `}</style>

            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <h6 className="mb-3" onClick={handleBack}><ArrowBack className="me-2" /> Add New Cateogry</h6>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="form-container">
                                                <h6 className="mb-3">Category Detail</h6><hr></hr>
                                                <label>Product Name <span className="required">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control mb-2 ${errors.name ? "is-invalid" : ""}`}
                                                    name="name"
                                                    placeholder="Enter Product Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}

                                                <label>Product Category <span className="required">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control mb-2 ${errors.category ? "is-invalid" : ""}`}
                                                    name="category"
                                                    placeholder="Enter Category Name"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                />
                                                {errors.category && <div className="invalid-feedback">{errors.category}</div>}

                                                <label>Description</label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    placeholder="Enter Product Description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    cols="10"
                                                    rows="3"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-container">
                                                            <h6 className="mb-3">Price Detail</h6><hr></hr>
                                                            <label>Price * <span className="span">(Total amount the client will see on your proposal)</span></label>
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                name="price"
                                                                value={price}
                                                                onChange={handlePriceChange}
                                                                placeholder="Enter Price"
                                                            />

                                                            <label>25% Activatree Service Fee</label>
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                value={platformFee}
                                                                placeholder="%0.00"
                                                                disabled
                                                            />

                                                            <label>You’ll Receive <span className="span">(The estimated amount you’ll receive after service fee)</span></label>
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                name="sellerReceive"
                                                                value={sellerReceive}
                                                                placeholder="$0.00"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="form-container">
                                                <h6 className="mb-3">Upload Images</h6><hr></hr>
                                                <label className="image-upload">
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/png, image/jpeg, image/jpg"
                                                        onChange={handleDisplayImageUpload}
                                                        style={{ display: "none" }}
                                                    />
                                                    <div className="upload-box">
                                                        <i className="bi bi-cloud-upload"></i>
                                                        <p>Drop your images here, or click to browse</p>
                                                        <span className="upload-note">PNG, JPG Files are allowed</span>
                                                    </div>
                                                </label>
                                                <div className="image-preview">
                                                    {formData.displayMedia.length > 0 ? (
                                                        formData.displayMedia.map((image, index) => (
                                                            <div key={index} className="image-thumb">
                                                                <img src={URL.createObjectURL(image.file)} alt="Preview" className="thumbnail-image" />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        Array.from({ length: 4 }).map((_, index) => (
                                                            <div key={index} className="image-thumb">
                                                                <i className="bi bi-cloud-upload upload-icon"></i>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-container">
                                                <h6 className="mb-3">Upload Video/Audio/PDF</h6><hr></hr>
                                                <label className="video-upload">
                                                    <input
                                                        type="file"
                                                        accept="video/mp4, video/avi, video/mov, audio/mpeg, audio/wav, application/pdf"
                                                        multiple
                                                        onChange={handleVideoAudioPDFUpload}
                                                        style={{ display: "none" }}
                                                    />
                                                    <div className="upload-box">
                                                        <i className="bi bi-cloud-upload"></i>
                                                        <p>Drop & Drop files to upload.</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="submit-btn">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
