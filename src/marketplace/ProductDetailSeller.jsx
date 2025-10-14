import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import { ArrowBack } from "@mui/icons-material";

export default function ProductDetailSeller() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeImage, setActiveImage] = useState("");

    useEffect(() => {
        const existingData = {
            images: [
                "../assets/images/marketplace-img-1.png",
                "../assets/images/marketplace-img-2.png",
                "../assets/images/marketplace-img-3.png",
                "../assets/images/marketplace-img-4.png",
                "../assets/images/marketplace-img-5.png",
                "../assets/images/marketplace-img-6.png",
            ],
        };
        setImages(existingData.images);
        setActiveImage(existingData.images[0]);
    }, []);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex + 5 < images.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleThumbnailClick = (img) => {
        setActiveImage(img);
    };

    const handleBack = () => {
        navigate("/productslist");
    };

    return (
        <>
            <style>{`
                .detail-product-wrapper {
                    display: flex;
                    gap: 20px;
                }

                .left-section, .right-section {
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
                    border-radius: 50px;
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
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                    justify-content: center;
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
                    cursor: pointer;
                    transition: transform 0.2s ease-in-out;
                }
                .image-thumb:hover {
                    transform: scale(1.1);
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

                .nav-buttons {
                    font-size: 24px;
                    cursor: pointer;
                    user-select: none;
                    padding: 20px 0px;
                    //border: 1px solid #ddd;
                    border-radius: 50%;
                    background: #ffffff;
                    transition: 0.2s;
                }

                .nav-buttons:hover {
                    background: #ddd;
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
                    font-size: 16px;
                    margin-left: 10px;
                }

                .description {
                    font-size: 16px;
                    color: #777;
                    margin-left: 10px;
                }
                .dotlist {
                    list-style-type: disc !important;
                }

            `}</style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <h6 className="mb-3" onClick={handleBack}><ArrowBack className="me-2" />Product Detail</h6>
                            <div className="detail-product-wrapper">
                                <div className="right-section">
                                    <div className="box upload-images">
                                        <label className="image-upload">
                                            <div className="upload-box">
                                                <img src={activeImage} alt="Main Preview" />
                                            </div>
                                        </label>
                                        <div className="image-preview">
                                            <span className="nav-buttons" onClick={handlePrev}>&lt;</span>

                                            {images.slice(currentIndex, currentIndex + 5).map((img, index) => (
                                                <div key={index} className="image-thumb" onClick={() => handleThumbnailClick(img)}>
                                                    <img src={img} alt={`Thumbnail ${index}`} className="thumbnail-image" />
                                                </div>
                                            ))}
                                            <span className="nav-buttons" onClick={handleNext}>&gt;</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="left-section">
                                    <div className="box price-detail">
                                        <h6 className="text-end"><span
                                            style={{
                                                backgroundColor: "#D1FFCC",
                                                color: "#3DB22F",
                                                padding: "0px 10px",
                                                borderRadius: "30px",
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Active
                                        </span></h6>
                                        <h6 className="text-start">Filmora 14 Video Editor - More AI, Videos in Less Clicks | All future Upgrades with Transferable License</h6>
                                        <hr></hr>
                                        <div className="price-item">
                                            <div className="description">Price:
                                                <span className="price-label">$11.24</span>
                                            </div>
                                        </div>
                                        <div className="price-item">
                                            <div className="description">Brand:
                                                <span className="price-label">Signal 10</span>
                                            </div>
                                        </div>
                                        <div className="price-item">
                                            <div className="description">Platform:
                                                <span className="price-label">Windows</span>
                                            </div>
                                        </div>
                                        <div className="price-item">
                                            <div className="description">Platform for Display:
                                                <span className="price-label">Windo</span>
                                            </div>
                                        </div>
                                        <div className="price-item">
                                            <div className="description">Edition:
                                                <span className="price-label">Lifetime</span>
                                            </div>
                                        </div>
                                        <div className="price-item">
                                            <div className="description">Description:
                                                <ul className="dotlist">
                                                    <li className="description m-5">Lifetime Plan Limitation : Includes Free Lifetime Effects marked with Downword (⬇) arrow. Some effects marked with Pink (💎) diamond require a separate purchase. Also Includes 1000 AI credits.</li>
                                                    <li className="description m-5">Try before you buy: To ensure optimal performance and compatibility, we strongly recommend trying the product using the free trial version before purchasing. Due to the product's nature, it is non-returnable.</li>
                                                    <li className="description m-5">Activate on Your Work & Home PC: Install Filmora on both your work and home PCs for added flexibility. However, the license can only be active on one PC at a time (applicable to the Lifetime Plan).</li>

                                                </ul>
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
}
