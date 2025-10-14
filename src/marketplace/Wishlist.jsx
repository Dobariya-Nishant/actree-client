import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

const Wishlist = () => {
    const [whishlist, setWhishlist] = useState([]);

    useEffect(() => {
        getAllWhishlist();
    }, []);

    const getAllWhishlist = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ALL_WISHLIST, {}, {});
            if (response.statusCode === 200) {
                //console.log("response", response.data);
                setWhishlist(response.data);
            }
        } catch (error) {
            console.error("Error fetching whishlist:", error);
        }
    };

    const handleWishlist = async (productId) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_WISHLIST, { productId });
            if (response.statusCode === 200) {
                console.log(`Product ${productId} removed from wishlist`);
                getAllWhishlist();
            }
        } catch (error) {
            console.error("Error adding product to wishlist:", error);
        }
    };

    const handleDownloadAll = async (product) => {
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

    return (
        <>
            <style>
                {`            
                    @media (max-width: 768px) {
                        .single-box .row > div {
                            margin-bottom: 10px;
                        }
                        .cmn-btn {
                            display: block;
                            width: 100%;
                            text-align: center;
                        }
                        .avatar-img {
                            height: 200px;
                            width: auto;
                            object-fit: cover;
                        }
                    }
                    .avatar-img {
                        height: 150px;
                        width: auto;
                        object-fit: cover;
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <div className="head-area mb-5">
                                <h6>Product Wishlist</h6>
                            </div>
                            <div className="row cus-mar mt-5">
                                {whishlist.map((whishlistObj) => (
                                    <div key={whishlistObj.product._id} className="col-xl-3 col-lg-8 col-md-6">
                                        <div className="single-box marketplace-item p-2 p-sm-1">
                                            <div className="avatar-area position-relative">
                                                <div className="wishlist-icon position-absolute top-0 end-0 p-2"
                                                    onClick={() => handleWishlist(whishlistObj.product._id)}
                                                >
                                                    <i className="fas fa-heart"
                                                        style={{
                                                            backgroundColor: "#FFFFFF",
                                                            color: "#E22C27",
                                                            fontSize: '20px',
                                                            cursor: 'pointer',
                                                            borderRadius: '50%',
                                                            padding: '8px',
                                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                                        }}>
                                                    </i>
                                                </div>
                                                {whishlistObj.product.category === "videos" ? (
                                                    <video
                                                        width="50"
                                                        height="140"
                                                        controls
                                                        muted
                                                        className="product-video w-100"
                                                    >
                                                        <source src={whishlistObj.product.displayMedia?.[0]?.url} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : (
                                                    <img
                                                        className="avatar-img w-100"
                                                        src={whishlistObj.product.displayMedia[0]?.url || "../assets/images/marketplace-img-1.png"}
                                                        alt={whishlistObj.product.name}
                                                    />
                                                )}
                                            </div>
                                            <div className="info-box mt-1 text-start">
                                                <h6>{whishlistObj.product.name}</h6>
                                                <p>{whishlistObj.product.category}</p>
                                            </div>
                                            <div className="head-area mt-5 d-flex justify-content-between">
                                                <div className="d-flex w-100 gap-3 align-items-center justify-content-between">
                                                    <div className="d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <h6 className="" style={{ color: "#29008B" }}>${whishlistObj.product.price}</h6>
                                                        </div>
                                                        <div className="text-area text-start">
                                                            <h6 className="m-0">
                                                                {whishlistObj.product.isPurchased ? (
                                                                    <button
                                                                        className="cmn-btn"
                                                                        style={{
                                                                            background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                                                            borderRadius: 30,
                                                                        }}
                                                                        onClick={() => handleDownloadAll(whishlistObj.product)}
                                                                    >
                                                                        Download
                                                                    </button>
                                                                ) : (
                                                                    <Link to={`/product_detail/${whishlistObj.product._id}`} className="cmn-btn"
                                                                        style={{
                                                                            background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                                                            borderRadius: 30,
                                                                        }}
                                                                    >Buy Now</Link>
                                                                )}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    // <div key={whishlist._id} className="row cus-mar mt-5">
                                    //     <div className="col-xl-3 col-lg-8 col-md-6">
                                    //         <div className="single-box marketplace-item p-2 p-sm-1">
                                    //             <div className="avatar-area position-relative">
                                    //                 <div className="wishlist-icon position-absolute top-0 end-0 p-2">
                                    //                     <i className="fas fa-heart"
                                    //                         style={{
                                    //                             backgroundColor: "#FFFFFF",
                                    //                             color: "#E22C27",
                                    //                             fontSize: '20px',
                                    //                             cursor: 'pointer',
                                    //                             borderRadius: '50%',
                                    //                             padding: '8px',
                                    //                             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                    //                         }}>
                                    //                     </i>
                                    //                 </div>
                                    //                 <img className="avatar-img w-100" src="../assets/images/marketplace-img-1.png" alt="avatar" />
                                    //             </div>
                                    //             <div className="info-box mt-1 text-start">
                                    //                 <a href="marketplace-details.html"><h6>Filmora 14 Video Editor</h6></a>
                                    //                 <p>Software</p>
                                    //             </div>
                                    //             <div className="head-area mt-5 d-flex justify-content-between">
                                    //                 <div className="d-flex w-100 gap-3 align-items-center justify-content-between">
                                    //                     <div className="d-flex gap-3 align-items-center">
                                    //                         <div className="avatar-item">
                                    //                             <h6 className="" style={{ color: "#29008B" }}>$49.99</h6>
                                    //                         </div>
                                    //                         <div className="text-area text-start">
                                    //                             <h6 className="m-0">
                                    //                                 <Link to="/product_detail" className=" cmn-btn"
                                    //                                     style={{
                                    //                                         background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                    //                                         borderRadius: 30,
                                    //                                     }}
                                    //                                 >Buy Now</Link>
                                    //                             </h6>
                                    //                         </div>
                                    //                     </div>
                                    //                 </div>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    // </div>

                                ))}
                            </div>
                        </div>
                    </div >
                </div >
            </main >
        </>
    );
};

export default Wishlist;
