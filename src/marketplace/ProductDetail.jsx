import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import { FaStar } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import { ArrowBack } from "@mui/icons-material";

const ProductDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [openModal, setOpenModal] = useState(false);
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

    const handleBack = () => navigate("/marketplace");
    const handleReadBook = () => {
        if (product?.orignalMedia?.length > 0) {
            const bookUrl = product.orignalMedia[0]?.url;
            if (bookUrl) {
                const viewerUrl = `http://docs.google.com/gview?url=${encodeURIComponent(bookUrl)}&embedded=true`;
                window.open(viewerUrl, "_blank");
            } else {
                alert("PDF file not found!");
            }
        } else {
            alert("No PDF available!");
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

    if (!product) return <p>Loading...</p>;
    const isEBook = product.category === "e-books" && product.orignalMedia.length > 0;
    const bookUrl = isEBook ? product.orignalMedia[0]?.url : "";
    return (
        <>
            <style>
                {`
                    .img-fluid {
                        width: 500px;
                        height: 500px;
                    }
                    .thumb-img {
                        width: 60px;
                        height: 60px;
                        object-fit: cover;
                        border-radius: 5px;
                        transition: transform 0.3s ease-in-out;
                    }
                    .product-price {
                        color: #29008B;
                        font-size: 24px;
                        margin: 10px 0;
                    }
                    .buttons {
                        align-item: center;
                        display: flex;
                        border-radius: 30px;
                        margin-top: 5px;
                        font-size: 14px;
                        color: #131010;
                    }
                    .submit-btn {
                        background: linear-gradient(to right, #9A00A9, #580097);
                        color: white;
                        border-radius: 30px;
                        font-size: 14px;
                        text-decoration: none;
                        margin-top: 5px;
                        text-align: center;
                    }
                    @media (max-width: 767px) {
                        .thumbnail-images {
                            display: none !important;
                            justify-content: center;
                            gap: 10px;
                        }
                        .product-title {
                            margin-top: 10px;
                        }
                    }
                    @media (max-width: 576px) {
                        .thumbnail-images {
                            display: none !important;
                        }
                        .product-title {
                            margin-top: 10px;
                        }
                        .product-price {
                            color: #29008B;
                            font-size: 24px;
                            margin: 10px 0;
                        }
                    }
                    @media (max-width: 425px) {
                        .thumbnail-images {
                            display: none !important;
                        }
                        .main-image {
                            width: 100%;
                            max-width: 100%;
                            overflow: hidden;
                            position: relative;
                        }

                        .main-image img {
                            max-height: 250px;
                            width: 100%;
                            object-fit: contain;
                        }
                        .main-image {
                            position: relative;
                        }

                        .main-image::before,
                        .main-image::after {
                            content: "‹";
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            background: rgba(0, 0, 0, 0.5);
                            color: white;
                            border: none;
                            padding: 10px;
                            cursor: pointer;
                            border-radius: 50%;
                            font-size: 18px;
                        }

                        .main-image::before {
                            left: 10px;
                        }

                        .main-image::after {
                            content: "›";
                            right: 10px;
                        }
                        .product-title {
                            margin-top: 10px;
                        }
                        .product-info h5 {
                            margin-bottom: 15px;
                        }
                        .product-info p {
                            margin: 5px 0;
                        }
                        
                        .buttons {
                            align-item: center;
                            display: flex;
                            border-radius: 30px;
                            margin-top: 15px;
                            color: #131010;
                        }
                        .submit-btn {
                            background: linear-gradient(to right, #9A00A9, #580097);
                            color: white;
                            border-radius: 30px;
                            padding: 10px 20px;
                            text-decoration: none;
                            display: inline-block;
                            margin-top: 15px;
                        }                    
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <div className="head-area mb-4">
                                <h6 onClick={handleBack} style={{ cursor: "pointer", color: "#29008B" }}>
                                    <ArrowBack className="me-2" />
                                    {product.name}
                                </h6>
                            </div>
                            <div className="row">
                                {/* <div className="col-md-1 col-12 d-flex flex-column">
                                    <div className="thumbnail-images d-flex flex-column gap-2">
                                        {product.displayMedia.map((media, index) => (
                                            <img
                                                key={index}
                                                src={media.url}
                                                alt={`Thumb${index}`}
                                                className="thumb-img mb-2"
                                                style={{
                                                    cursor: "pointer",
                                                    border: selectedImage === media.url ? "2px solid blue" : "2px solid transparent",
                                                    borderRadius: "5px",
                                                    padding: "2px",
                                                }}
                                                onClick={() => setSelectedImage(media.url)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 d-flex">
                                    <div className="main-image">
                                        <img
                                            src={selectedImage}
                                            alt="Product"
                                            className="img-fluid"
                                            style={{ borderRadius: "10px" }}
                                        />
                                    </div>
                                </div> */}
                                <div className="col-md-1 col-12 d-flex flex-column">
                                    <div className="thumbnail-images d-flex flex-column gap-2">
                                        {product.displayMedia.map((media, index) => (
                                            <div
                                                key={index}
                                                className="thumb-media mb-2"
                                                style={{
                                                    cursor: "pointer",
                                                    border: selectedImage === media.url ? "2px solid blue" : "2px solid transparent",
                                                    borderRadius: "5px",
                                                    padding: "2px",
                                                }}
                                                onClick={() => setSelectedImage(media.url)}
                                            >
                                                {media.type === "video" ? (
                                                    <video
                                                        src={media.url}
                                                        className="thumb-img"
                                                        style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                                                        muted
                                                    />
                                                ) : (
                                                    <img
                                                        src={media.url}
                                                        alt={`Thumb${index}`}
                                                        className="thumb-img"
                                                        style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 d-flex">
                                    <div className="main-image">
                                        {selectedImage.includes(".mp4") || selectedImage.includes(".webm") ? (
                                            <video
                                                src={selectedImage}
                                                controls
                                                className="img-fluid"
                                                style={{ borderRadius: "10px", width: "100%" }}
                                            />
                                        ) : (
                                            <img
                                                src={selectedImage}
                                                alt="Product"
                                                className="img-fluid"
                                                style={{ borderRadius: "10px" }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-5 col-12">
                                    <h6 className="product-title">{product.name}</h6>
                                    <p className="product-price">${product.price} <span>Inclusive of taxes</span></p>
                                    <div className="rating mb-2">⭐⭐⭐⭐⭐</div>
                                    {product.category === "e-books" && (
                                        <div className="product-highlights">
                                            <p>Print Length:<strong> {product.printLength} Pages </strong></p>
                                            <p>Language: <strong>{product.language} </strong></p>
                                            <p>Publisher:<strong> {product.publisher} </strong></p>
                                            <p>Publication Date:<strong>
                                                {new Date(product.publishedDate).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}</strong>
                                            </p>
                                        </div>
                                    )}
                                    {product.category === "digital arts graphics" && (
                                        <div className="product-highlights">
                                            <p>Size:<strong> {product.size} Pages </strong></p>
                                            <p>Product Dimension: <strong>{product.dimension} </strong></p>
                                            <p>Publication Date:<strong>
                                                {new Date(product.publishedDate).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}</strong>
                                            </p>
                                        </div>
                                    )}
                                    {product.category === "music audio files" && (
                                        <div className="product-highlights">
                                            <p>Product Dimension: <strong>{product.dimension} </strong></p>
                                            <p>Item part number:<strong> {product.itemPartNumber} </strong></p>
                                            <p>Country of Origin:<strong>{product.countryOfOrigin}</strong></p>
                                        </div>
                                    )}
                                    {product.category === "videos" && (
                                        <div className="product-highlights">
                                            <p>Publisher:<strong>
                                                {new Date(product.publishedDate).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}</strong>
                                            </p>
                                            <p>Resolution: <strong>{product.resolution} </strong></p>
                                            <p>Frame Rate:<strong> {product.frameRate} </strong></p>
                                        </div>
                                    )}
                                    {product.category === "fonts" && (
                                        <div className="product-highlights">
                                            <p>Font For:<strong> {product.fontFor} </strong></p>
                                        </div>
                                    )}
                                    {product.category === "website theme plugins" && (
                                        <div className="product-highlights">
                                            <p>Publisher: <strong>
                                                ({product.publisher}
                                                {new Date(product.publishedDate).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })})</strong></p>
                                            <p>Layout: <strong>{product.layout}</strong></p>
                                            <p>Compatible Browsers: <strong>{product.compatibleBrowsers?.join(", ")}</strong></p>
                                            <p>Tags: <strong>{product.tags?.join(", ")}</strong></p>
                                        </div>
                                    )}
                                    {product.category === "digital templates" && (
                                        <div className="product-highlights">
                                            <p>File Size:<strong> {product.size} </strong></p>
                                            <p>Product Dimension: <strong>{product.dimension} </strong></p>
                                        </div>
                                    )}
                                    {product.category === "educational courses" && (
                                        <div className="product-highlights">
                                            <p>Language: <strong>{product.language} </strong></p>
                                        </div>
                                    )}
                                    <div className="buttons mt-10 d-flex flex-wrap m-0">
                                        {product.category === "e-books" && (
                                            <button className="btn btn-outline-secondary buttons" onClick={handleReadBook}>
                                                Read Book Sample
                                            </button>
                                        )}
                                        {product.category === "music audio files" && (
                                            <button className="btn btn-outline-secondary buttons">
                                                Audio Sample
                                            </button>
                                        )}
                                        {product.category === "website theme plugins" && (
                                            <button className="btn btn-outline-secondary buttons">
                                                Website Theme Preview
                                            </button>
                                        )}
                                    </div>
                                    {product.isPurchased ? (
                                        <button
                                            className="submit-btn mt-5 w-100"
                                            onClick={handleDownloadAll}
                                        >
                                            Download
                                        </button>
                                    ) : (
                                        <Link to={`/BuyNow/${product._id}`} className="submit-btn mt-5 w-100">Buy Now</Link>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="popular-area mb-5 d-center flex-wrap gap-3 justify-content-between mt-5">
                                        <ul className="nav flex-wrap gap-2 tab-area" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link d-center active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description-tab-pane"
                                                    type="button" role="tab" aria-controls="description-tab-pane" aria-selected="true">Product Description</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link d-center" id="product-details-tab" data-bs-toggle="tab" data-bs-target="#product-details-tab-pane"
                                                    type="button" role="tab" aria-controls="product-details-tab-pane" aria-selected="false">Product Details</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link d-center" id="about-author-tab" data-bs-toggle="tab" data-bs-target="#about-author-tab-pane"
                                                    type="button" role="tab" aria-controls="about-author-tab-pane" aria-selected="false">About Author</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link d-center" id="about-seller-tab" data-bs-toggle="tab" data-bs-target="#about-seller-tab-pane"
                                                    type="button" role="tab" aria-controls="about-seller-tab-pane" aria-selected="false">About Seller</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link d-center" id="review-rating-tab" data-bs-toggle="tab" data-bs-target="#review-rating-tab-pane"
                                                    type="button" role="tab" aria-controls="review-rating-tab-pane" aria-selected="false">Customer Review & Rating</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="description-tab-pane" role="tabpanel" aria-labelledby="description-tab" tabIndex="0">
                                            <div className="row cus-mar friend-request">
                                                <div className="col-xl-12 col-sm-12 col-12">
                                                    <div className="single-box p-5">
                                                        <div className="single-input text-start">
                                                            <p className="mdtxt mt-6">{product.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="product-details-tab-pane" role="tabpanel" aria-labelledby="product-details-tab" tabIndex="0">
                                            <div className="row cus-mar friend-request">
                                                <div className="col-xl-12 col-sm-12 col-12">
                                                    <div className="single-box p-5">
                                                        {product.category === "e-books" && (
                                                            <div className="single-input text-start">
                                                                <p>Publisher: <strong>
                                                                    ({product.publisher}
                                                                    {new Date(product.publishedDate).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })})</strong></p>
                                                                <p>Language: <strong>{product.language}</strong></p>
                                                                <p>Print Length: <strong>{product.printLength} Pages</strong></p>
                                                            </div>
                                                        )}
                                                        {product.category === "digital arts graphics" && (
                                                            <div className="single-input text-start">
                                                                <p>Size:<strong> {product.size} Pages </strong></p>
                                                                <p>Product Dimension: <strong>{product.dimension} </strong></p>
                                                                <p>Publication Date:<strong>
                                                                    {new Date(product.publishedDate).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })}</strong></p>
                                                            </div>
                                                        )}
                                                        {product.category === "music audio files" && (
                                                            <div className="single-input text-start">
                                                                <p>Product Dimension: <strong>{product.dimension} </strong></p>
                                                                <p>Item part number:<strong> {product.itemPartNumber} </strong></p>
                                                                <p>Country of Origin:<strong>{product.countryOfOrigin}</strong></p>
                                                            </div>
                                                        )}
                                                        {product.category === "videos" && (
                                                            <div className="single-input text-start">
                                                                <p>Publisher:<strong>
                                                                    {new Date(product.publishedDate).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })}</strong>
                                                                </p>
                                                                <p>Resolution: <strong>{product.resolution} </strong></p>
                                                                <p>Frame Rate:<strong> {product.frameRate} </strong></p>
                                                            </div>
                                                        )}
                                                        {product.category === "fonts" && (
                                                            <div className="single-input text-start">
                                                                <p>Font For:<strong> {product.fontFor} </strong></p>
                                                            </div>
                                                        )}
                                                        {product.category === "website theme plugins" && (
                                                            <div className="single-input text-start">
                                                                <p>Publisher: <strong>
                                                                    ({product.publisher}
                                                                    {new Date(product.publishedDate).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })})</strong></p>
                                                                <p>Layout: <strong>{product.layout}</strong></p>
                                                                <p>Compatible Browsers: <strong>{product.compatibleBrowsers?.join(", ")}</strong></p>
                                                                <p>Tags: <strong>{product.tags?.join(", ")}</strong></p>
                                                            </div>
                                                        )}
                                                        {product.category === "digital templates" && (
                                                            <div className="single-input text-start">
                                                                <p>File Size:<strong> {product.size} </strong></p>
                                                                <p>Product Dimension: <strong>{product.dimension} </strong></p>
                                                            </div>
                                                        )}
                                                        {product.category === "educational courses" && (
                                                            <div className="single-input text-start">
                                                                <p>Language: <strong>{product.language} </strong></p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="about-author-tab-pane" role="tabpanel" aria-labelledby="about-author-tab" tabIndex="0">
                                            <div className="row cus-mar friend-request">
                                                <div className="col-xl-12 col-sm-12 col-12">
                                                    <div className="single-box p-5">
                                                        <div className="profile-area d-center position-relative align-items-center justify-content-between">
                                                            <div className="avatar-item d-flex gap-3 align-items-start">
                                                                <div className="avatar-item">
                                                                    <img className="avatar-img max-un"
                                                                        alt="avatar"
                                                                        src="https://activatree-storage.s3.me-central-1.amazonaws.com/profile/c8cb3b16-aed4-4cdd-98da-16a6e890f822_undefined"
                                                                        style={{ borderRadius: "50px", width: "60px", height: "60px" }} />
                                                                </div>
                                                                <div className="info-area">
                                                                    <h5 className="m-0"><Link href="#" className="mdtxt text-start">{product.authorName}</Link></h5>
                                                                    <div className="avatar-item d-flex gap-3 align-items-start">
                                                                        <span className="m-0 text-start">{product.authorAbout}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="about-seller-tab-pane" role="tabpanel" aria-labelledby="about-seller-tab" tabIndex="0">
                                            <div className="row cus-mar friend-request">
                                                <div className="col-xl-12 col-sm-12 col-12">
                                                    <div className="single-box p-5">
                                                        <div className="profile-area d-center position-relative align-items-center justify-content-between">
                                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                                <div className="avatar-item">
                                                                    <img className="avatar-img max-un"
                                                                        alt="avatar"
                                                                        src="https://activatree-storage.s3.me-central-1.amazonaws.com/profile/c8cb3b16-aed4-4cdd-98da-16a6e890f822_undefined"
                                                                        style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                                                                </div>
                                                                <div className="info-area">
                                                                    <h6 className="m-0"><Link href="#" className="mdtxt">{product.seller.userName}</Link></h6>
                                                                    <p className="mdtxt">@{product.seller.userName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="btn-group cus-dropdown dropend">
                                                                <p>Joined Date: <strong>21 Jan, 2022</strong></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="review-rating-tab-pane" role="tabpanel" aria-labelledby="review-rating-tab" tabIndex="0">
                                            <div className="row cus-mar friend-request">
                                                <div className="col-xl-12 col-sm-12 col-12">
                                                    <div className="single-box p-5">
                                                        <div className="row mt-4">
                                                            <div className="col-md-4 py-10">
                                                                <span>Total Reviews</span>
                                                                <h5>100</h5>
                                                            </div>
                                                            <div className="col-md-4 py-10">
                                                                <span>Average Rating</span>
                                                                <h5>4.5 <FaStar className="text-warning" /><FaStar className="text-warning" /><FaStar className="text-warning" /><FaStar className="text-warning" /><FaStar className="text-muted" /></h5>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="rating-breakdown mt-3">
                                                                    {[5, 4, 3, 2, 1].map((star) => (
                                                                        <div key={star} className="d-flex align-items-center mb-1">
                                                                            <span>{star}</span>
                                                                            <div className="progress w-50 mx-2">
                                                                                <div className="progress-bar bg-warning" style={{ width: `${star * 14}%` }}></div>
                                                                            </div>
                                                                            <span>{star * 5}%</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row mt-1">
                                                            <div className="col-md-4">
                                                                <h6 className="mdtxt">Add Rating</h6>
                                                                <div className="">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <FaStar key={i} className="text-secondary fs-4 me-2" />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <h6 className="mdtxt text-start mb-1">Add Review</h6>
                                                                <textarea type="text" className="form-control" placeholder="Add Review Here" />
                                                            </div>
                                                            <div className="col-md-4 mt-4">
                                                                <button className="submit-btn text-start">Submit</button>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="profile-area d-center position-relative align-items-center justify-content-between">
                                                            <div className="avatar-item d-flex gap-3 align-items-start">
                                                                <div className="avatar-item">
                                                                    <img className="avatar-img max-un"
                                                                        alt="avatar"
                                                                        src="https://activatree-storage.s3.me-central-1.amazonaws.com/profile/c8cb3b16-aed4-4cdd-98da-16a6e890f822_undefined"
                                                                        style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                                                                </div>
                                                                <div className="info-area text-start">
                                                                    <h6 className="m-0"><Link href="#" className="mdtxt">Lama</Link></h6>
                                                                    <p className="mdtxt"> ⭐⭐⭐⭐⭐ Dec 12, 2024 </p>
                                                                    <p className="mdtxt">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="profile-area d-center position-relative align-items-center justify-content-between mt-5">
                                                            <div className="avatar-item d-flex gap-3 align-items-start">
                                                                <div className="avatar-item">
                                                                    <img className="avatar-img max-un"
                                                                        alt="avatar"
                                                                        src="https://activatree-storage.s3.me-central-1.amazonaws.com/profile/c8cb3b16-aed4-4cdd-98da-16a6e890f822_undefined"
                                                                        style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                                                                </div>
                                                                <div className="info-area text-start">
                                                                    <h6 className="m-0"><Link href="#" className="mdtxt">Lama</Link></h6>
                                                                    <p className="mdtxt"> ⭐⭐⭐⭐⭐ Dec 12, 2024 </p>
                                                                    <p className="mdtxt">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="profile-area d-center position-relative align-items-center justify-content-between mt-5">
                                                            <div className="avatar-item d-flex gap-3 align-items-start">
                                                                <div className="avatar-item">
                                                                    <img className="avatar-img max-un"
                                                                        alt="avatar"
                                                                        src="https://activatree-storage.s3.me-central-1.amazonaws.com/profile/c8cb3b16-aed4-4cdd-98da-16a6e890f822_undefined"
                                                                        style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                                                                </div>
                                                                <div className="info-area text-start">
                                                                    <h6 className="m-0"><Link href="#" className="mdtxt">Lama</Link></h6>
                                                                    <p className="mdtxt"> ⭐⭐⭐⭐⭐ Dec 12, 2024 </p>
                                                                    <p className="mdtxt">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h6 className="mt-5"><Link href="#" className="mdtxt">View More</Link></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </>
    );
};
export default ProductDetail;
