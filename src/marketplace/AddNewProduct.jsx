import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import { ArrowBack } from "@mui/icons-material";
import Select from 'react-select';
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

export default function AddNewProduct() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleImageUpload = (event) => {
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
                ]
            }));
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        brand: "",
        platform: "",
        description: "",
        price: "",
        displayMedia: [],
        orignalMedia: [],
    });

    const categoryOptions = [
        { value: "e-books", label: "e-books" },
        { value: "video", label: "video" },
        { value: "text", label: "text" },
        { value: "images", label: "images" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            prevData[name] = value;
            return structuredClone(prevData);
        });

        setErrors((prevErrors) => {
            prevErrors[name] = "";
            return structuredClone(prevErrors);
        });
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };
        if (name === "price") {
            const price = parseFloat(value) || 0;
            const serviceFee = (price * 25) / 100;
            const receiveAmount = price - serviceFee;
            newFormData = {
                ...newFormData,
                servicefee: serviceFee.toFixed(2),
                serviceAmount: receiveAmount.toFixed(2),
            };
        }
        setFormData(newFormData);
    };

    const handleCategoryChange = (selectedOption) => {
        setFormData({ ...formData, category: selectedOption.value });
        setErrors({ ...errors, category: "" });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Product Name is required";
        if (!formData.category) newErrors.category = "Product Category is required";
        if (!formData.price.trim()) newErrors.price = "Price is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const AddNewProduct = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const submitData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key !== "displayMedia" && key !== "orignalMedia") {
                submitData.append(key, formData[key]);
            }
        });
        if (formData.displayMedia.length === 0) {
            console.error("Error: No images selected!");
            setErrors((prevErrors) => ({
                ...prevErrors,
                displayMedia: "At least one image is required.",
            }));
            return;
        }
        formData.displayMedia.forEach((fileObj) => {
            submitData.append("displayMedia", fileObj.file);
        });
        formData.orignalMedia.forEach((fileObj) => {
            submitData.append("orignalMedia", fileObj.file);
        });
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.POST_PRODUCT, submitData);
            if (response.statusCode === 200) {
                console.log("product created successfully!");
                navigate("/ProductSellerList");
            } else {
                console.error("Failed to create product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleBack = () => {
        navigate("/ProductSellerList");
    };

    return (
        <>
            <style>{`
                .add-product-wrapper {
                    display: flex;
                    gap: 20px;
                }

                .left-section,
                .right-section {
                    flex: 1;
                }

                .box {
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                }

                h6 {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }

                label {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }

                input,
                textarea,
                select {
                    width: 100%;
                    height: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    font-size: 14px;
                    border-radius: 30px;
                }

                textarea {
                    height: 80px;
                    resize: none;
                }

                .category-brand {
                    display: flex;
                    gap: 10px;
                }

                // .category-brand select,
                // .category-brand input {
                //     flex: 1;
                // }

                .price-item {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .upload-images {
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    padding: 15px;
                    background: #fff;
                }

                .upload-images h6 {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .upload-box {
                    border: 2px dashed #ccc;
                    border-radius: 10px;
                    padding: 50px;
                    text-align: center;
                    cursor: pointer;
                    background: #f9f9f9;
                    height: 250px;
                }

                .upload-box i {
                    font-size: 40px;
                    color: #999;
                    display: block;
                    margin-bottom: 10px;
                }

                .upload-box p {
                    font-weight: 600;
                    font-size: 14px;
                    color: #333;
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

                .thumbnail-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                }

                .upload-icon {
                    font-size: 25px;
                    color: #999;
                }

                .price-detail {
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    padding: 15px;
                    background: #fff;
                }

                .price-detail h6 {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .price-detail hr {
                    border: 0;
                    border-top: 1px solid #eee;
                    margin: 10px 0;
                }

                .price-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 12px 0;
                }

                .price-label {
                    font-weight: 600;
                    font-size: 14px;
                }

                .required {
                    color: red;
                    margin-left: 4px;
                }

                .description {
                    font-size: 12px;
                    color: #777;
                    margin-left: 5px;
                }

                .price-value {
                    font-size: 14px;
                    font-weight: 600;
                    background: #f8f8f8;
                    padding: 6px 12px;
                    border-radius: 20px;
                    min-width: 80px;
                    text-align: center;
                }

                .price-value:focus {
                    border-color: #007bff;
                }

                .error {
                    color: red;
                    font-size: 12px;
                    margin-top: 5px;
                }

            `}</style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <h6 className="mb-3" onClick={handleBack}><ArrowBack className="me-2" />Add Product</h6>
                            <div className="add-product-wrapper">
                                <div className="left-section">
                                    <div className="box product-detail">
                                        <h6>Product Detail</h6>
                                        <hr></hr>
                                        <label>Product Name <span className="required">*</span></label>
                                        <input type="text" placeholder="Enter Product Name" name="name" value={formData.name} onChange={handleChange} />
                                        {errors.name && <span className="error">{errors.name}</span>}
                                        <label>Product Category <span className="required">*</span></label>
                                        <Select name="category" options={categoryOptions} onChange={handleCategoryChange} />
                                        {errors.category && <span className="error">{errors.category}</span>}
                                        <label>Brand</label>
                                        <input type="text" placeholder="Enter Brand" name="brand" value={formData.brand} onChange={handleChange} />
                                        <label>Platform</label>
                                        <input type="text" placeholder="Platform" name="platform" value={formData.platform} onChange={handleChange} />
                                        <label>Description</label>
                                        <textarea placeholder="Enter Product Description" name="description" value={formData.description} onChange={handleChange}></textarea>
                                    </div>
                                    <div className="box price-detail">
                                        <h6>Price Detail</h6>
                                        <hr></hr>
                                        <label>Price<span className="required">*</span><span className="description">(Total amount the client will see on your proposal)</span></label>
                                        <input
                                            type="number"
                                            placeholder="$0.00"
                                            name="price"
                                            value={formData.price}
                                            onChange={handlePriceChange} />
                                        {errors.price && <span className="error">{errors.price}</span>}
                                        <label>25% Activatree Service Fee</label>
                                        <input
                                            type="number"
                                            placeholder="$0.00"
                                            name="servicefee"
                                            value={formData.servicefee}
                                            readOnly
                                        />
                                        <label> You'll Receive<span className="description">(The estimated amount you'll receive after service fee)</span></label>
                                        <input
                                            type="number"
                                            placeholder="$0.00"
                                            name="serviceAmount"
                                            value={formData.serviceAmount}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="right-section">
                                    <div className="box upload-images">
                                        <h6>Upload Images</h6>
                                        <hr />
                                        <label className="image-upload">
                                            <input type="file"
                                                multiple
                                                onChange={handleImageUpload}
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
                                    <div className="box additional-info">
                                        <h6 onClick={() => setIsOpen(!isOpen)} className="accordion-header">
                                            Additional Information
                                            <span className={`accordion-icon ${isOpen ? "open" : ""}`}>&#9660;</span>
                                            <hr></hr>
                                        </h6>
                                        {isOpen && (
                                            <div className="accordion-content">
                                                <label>Platform for Display</label>
                                                <input type="text"
                                                    placeholder="Display Platform"
                                                />
                                                <label>Edition</label>
                                                <input type="text"
                                                    placeholder="Edition"
                                                    name="edition"
                                                    value={formData.edition}
                                                    onChange={handleChange}
                                                />
                                                <label>Features</label>
                                                <textarea
                                                    placeholder="Enter Product Features"
                                                    name="features"
                                                    value={formData.features}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={AddNewProduct}
                                style={{
                                    background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                    borderRadius: 30,
                                    padding: "5px",
                                    display: "block",
                                    textAlign: "center",
                                    color: "#fff",
                                    textDecoration: "none",
                                    width: "10%",
                                    marginLeft: "40%",
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
