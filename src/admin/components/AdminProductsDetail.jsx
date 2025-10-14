import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";

import API_ENDPOINTS from "../../api/apiConfig";
import { networkRequest } from "../../utils/networkRequest";
import Footer from "./Footer";

const AdminProductsDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        if (id) {
            getProductDetailById(id);
        }
    }, [id]);

    const getProductDetailById = async (productId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ALL_PRODUCT, {}, {}, { productId });
            if (response.statusCode === 200) {
                console.log("product Details", response);
                setProduct(response.data.product);
                if (response.data.product.displayMedia.length > 0) {
                    setSelectedImage(response.data.product.displayMedia[0].url);
                }
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const handleDownloadAll = async () => {
        if (product?.orignalMedia?.length) {
            for (const item of product.orignalMedia) {
                try {
                    const response = await fetch(item.url);
                    if (!response.ok) throw new Error(`Failed to fetch: ${item.url}`);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = item.url.split("/").pop();
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                } catch (error) {
                    console.error("Download failed:", error);
                }
            }
        }
    };

    const handleProductApprove = async (productId) => {
        try {
            const response = await networkRequest("PATCH", API_ENDPOINTS.STATUS_PRODUCT, { productId, status: "approved" });
            if (response.statusCode === 200) {
                console.log("Product approve successfully!");
                navigate("/admin/products");
            } else {
                console.log("Failed to approve product.");
            }
        } catch (error) {
            console.error("Error approve product:", error);
        }
    };

    const handleProductDecline = async (productId) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.STATUS_PRODUCT, { productId, status: "reject" });
            if (response.statusCode === 200) {
                console.log("Product decline successfully!");
                navigate("/admin/products");
            } else {
                console.log("Failed to decline product.");
            }
        } catch (error) {
            console.error("Error decline product:", error);
        }
    };

    const [formData, setFormData] = useState({
        toEmail: "",
        subject: "",
        text: ""
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!formData.toEmail) {
            newErrors.toEmail = "Email is required";
        } else if (!validateEmail(formData.toEmail)) {
            newErrors.toEmail = "Invalid email format";
        }
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.text) newErrors.text = "Message is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSuccessMessage("");

        try {
            const response = await networkRequest("POST", API_ENDPOINTS.SEND_EMAIL, formData);
            if (response.statusCode === 201) {
                setSuccessMessage("Email sent successfully!");
                setFormData({ toEmail: "", subject: "", text: "" });
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setErrors({ apiError: "Failed to send email. Please try again later." });
        }
    };

    const SendEmail = async () => {
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.SEND_EMAIL, {}, {}, {});
            if (response.statusCode === 200) {
                console.log("Email send succesfully");
            }
        } catch (error) {
            console.error("Error send email:", error);
        }
    };

    return (
        <>
            <style>
                {`
                    .main-image-container {
                        text-align: center;
                        margin-bottom: 10px;
                    }

                    .main-image {
                        //width: 100%;
                        max-height: 300px;
                        object-fit: cover;
                        //border-radius: 12px;
                        //box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
                    }

                    .thumbnail-row {
                        display: flex;
                        justify-content: center;
                        gap: 10px;
                    }

                    .thumbnail {
                        width: 80px;
                        height: 80px;
                        object-fit: cover;
                        border-radius: 8px;
                        transition: all 0.3s ease-in-out;
                        cursor: pointer;
                        border: 2px solid transparent;
                    }

                    .thumbnail:hover,
                    .thumbnail.active {
                        border-color: #00d2ff;
                        transform: scale(1.1);
                    }
                    .cmn-btn {
                        background: linear-gradient(to right, rgb(154, 0, 169), rgb(88, 0, 151), rgb(41, 0, 139));
                        padding: 10px 15px;
                        color: var(--bs-white);
                        display: inline-flex;
                        align-items: center;
                        font-size: 14px;
                        z-index: 0;
                        border-radius: 40px;
                        transition: 0.3s;
                    }
                    .cmn-btn-decline {
                        background: #FDD7D4;
                        padding: 10px 15px;
                        color: #FA1702;
                        display: inline-flex;
                        align-items: center;
                        font-size: 14px;
                        z-index: 0;
                        border-radius: 40px;
                        transition: 0.3s;
                    }
                    .form-control {
                            border-radius: 40px; 
                    }
                `}
            </style>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">View Products</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="mt-4 mt-xl-3">
                                                    <div className="product-detai-imgs">
                                                        <div className="main-image-container">
                                                            <img src={selectedImage} alt="Product" className="main-image" />
                                                        </div>
                                                        <div className="thumbnail-row">
                                                            {product?.displayMedia.map((media, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={media.url}
                                                                    alt="Thumbnail"
                                                                    className={`thumbnail ${selectedImage === media.url ? "active" : ""}`}
                                                                    onClick={() => setSelectedImage(media.url)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="mt-4 mt-xl-3">
                                                    <h4 className="mt-1 mb-2"><b>{product?.name}</b></h4>
                                                    <h5 className="mb-4">Price : <span className="text-muted me-2"></span><b>${product?.price}</b></h5>
                                                    <div className="row mb-2">
                                                        {product?.category === "e-books" && (
                                                            <div className="col-md-12">
                                                                <div>
                                                                    <p className="text-muted"> Print Length: {product?.printLength} Pages</p>
                                                                    <p className="text-muted"> Language : {product?.language}</p>
                                                                    <p className="text-muted"> Published : {product.publisher}</p>
                                                                    <p className="text-muted"> Publication Date: {new Date(product?.publishedDate).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {product?.category === "digital arts graphics" && (
                                                            <div className="col-md-12">
                                                                <div>
                                                                    <p className="text-muted"> Size: {product?.size} </p>
                                                                    <p className="text-muted"> Dimension : {product?.dimension}</p>
                                                                    <p className="text-muted"> Publication Date: {new Date(product?.publishedDate).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {product?.category === "music audio files" && (
                                                            <div className="col-md-12">
                                                                <div>
                                                                    <p className="text-muted"> Dimension : {product?.dimension}</p>
                                                                    <p className="text-muted"> Item part number: {product?.itemPartNumber}</p>
                                                                    <p className="text-muted"> Country of Origin: {product?.countryOfOrigin}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {product?.category === "videos" && (
                                                            <div className="col-md-12">
                                                                <div>
                                                                    <p className="text-muted"> Publisher : {new Date(product?.publishedDate).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })}</p>
                                                                    <p className="text-muted"> Resolution: {product?.resolution}</p>
                                                                    <p className="text-muted"> Frame Rate: {product?.frameRate}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {product?.category === "fonts" && (
                                                            <div className="col-md-12">
                                                                <div>
                                                                    <p className="text-muted"> Font For: {product?.fontFor}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {product?.category === "website theme plugins" && (
                                                            <div className="col-md-12">
                                                                <div>
                                                                    <p className="text-muted"> Publisher : {new Date(product?.publishedDate).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })}</p>
                                                                    <p className="text-muted"> Layout: {product?.layout}</p>
                                                                    <p className="text-muted"> Compatible Browsers: {product?.compatibleBrowsers?.join(", ")}</p>
                                                                    <p className="text-muted"> Tags: {product?.tags?.join(", ")}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {product?.category === "digital templates" && (
                                                            <div className="col-md-12">
                                                                <div>
                                                                    <p className="text-muted"> Publisher : {new Date(product?.publishedDate).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })}</p>
                                                                    <p className="text-muted"> File Size: {product?.size}</p>
                                                                    <p className="text-muted"> Product Dimension: {product?.dimension}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {product?.category === "educational courses" && (
                                                            <div className="col-md-12">
                                                                <div>
                                                                    <p className="text-muted"> Language : {product?.language}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-muted mb-2">Description : {product?.description}</p>
                                                    <div className="text">
                                                        {product?.status === "pending" && (
                                                            <>
                                                                <button type="button" className="mt-2 me-1 cmn-btn" onClick={() => handleProductApprove(product._id)}>Approve</button>
                                                                <button type="button" className="mt-2 cmn-btn-decline" onClick={() => handleProductDecline(product._id)}>Decline</button>
                                                            </>
                                                        )}
                                                        {product?.status === "approved" && (
                                                            <>
                                                                <button type="button" className="mt-2 cmn-btn-decline" onClick={() => handleProductDecline(product._id)}>Decline</button>
                                                            </>
                                                        )}
                                                        {product?.status === "reject" && (
                                                            <>
                                                                <button type="button" className="mt-2 me-1 cmn-btn" onClick={() => handleProductApprove(product._id)}>Approve</button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title mb-3 me-2">Seller Information</h5>
                                                <hr />
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 me-3">
                                                        <img src={product?.seller?.profilePicture || "../../assets/admin/assets/images/users/avatar-1.jpg"} alt="" className="avatar-sm rounded-circle img-thumbnail" />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1">
                                                                <div className="text-muted">
                                                                    <h5 className="mb-1">{product?.seller?.userName}</h5>
                                                                    <p className="mb-0">@{product?.seller?.userName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0 dropdown ms-2">
                                                                <h5 className="mb-1">Joined Date</h5>
                                                                <p className="mb-0">21 Jan, 2024</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title mb-3 me-2">Download Product Content</h5><hr />
                                                <p className="text-muted font-size-14 mb-2">Subscribe our newletter and get notification to stay update.</p>
                                                <div className="d-flex flex-wrap align-items-start">
                                                    <div className="ms-auto align-self-end">
                                                        <div className="text">
                                                            <button type="button" className="mt-2 me-1 cmn-btn" onClick={handleDownloadAll}>Download</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="card-title mb-4">Product Notes for Seller </h4><hr />
                                                    <form className="" onSubmit={handleSubmit}>
                                                        <div className="row">
                                                            <div className="mb-3 col-lg-12">
                                                                <label className="visually-hidden">Email To</label>
                                                                <input
                                                                    type="email"
                                                                    name="toEmail"
                                                                    className="form-control"
                                                                    placeholder="Email To"
                                                                    value={formData.toEmail}
                                                                    onChange={handleChange}
                                                                />
                                                                {errors.toEmail && <small className="text-danger">{errors.toEmail}</small>}
                                                            </div>
                                                            <div className="mb-3 col-lg-12">
                                                                <label className="visually-hidden">Subject</label>
                                                                <input
                                                                    type="text"
                                                                    name="subject"
                                                                    className="form-control"
                                                                    placeholder="Subject"
                                                                    value={formData.subject}
                                                                    onChange={handleChange}
                                                                />
                                                                {errors.subject && <small className="text-danger">{errors.subject}</small>}
                                                            </div>
                                                            <div className="mb-3 col-lg-12">
                                                                <label className="visually-hidden">Message</label>
                                                                <textarea
                                                                    type="text"
                                                                    name="text"
                                                                    className="form-control"
                                                                    placeholder="Message"
                                                                    value={formData.text}
                                                                    onChange={handleChange}
                                                                ></textarea>
                                                                {errors.text && <small className="text-danger">{errors.text}</small>}
                                                            </div>
                                                            <div className="col-lg-12 text-center">
                                                                <button type="submit" className="mt-2 me-1 cmn-btn">Send Email</button>
                                                            </div>
                                                            {successMessage && <p className="text-success text-center mt-2">{successMessage}</p>}
                                                            {errors.apiError && <p className="text-danger text-center mt-2">{errors.apiError}</p>}
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};
export default AdminProductsDetail;
