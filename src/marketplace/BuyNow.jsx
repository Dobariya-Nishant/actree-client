import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Modal, Button } from "react-bootstrap";
import Slider from '@mui/material/Slider';
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PugRbL5cycjHNBiKZIaA0PzRRY8rO8RMSxZKkiNb8mjbh2tU6aDS8qyAkBt9VwfHb8xYervJps3yNbPgAx7F3Xn005wMbtJsH");
const BuyNow = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const [tipAmount, setTipAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productId) {
            getAllSellerProducts(productId);
        }
    }, [productId]);

    const getAllSellerProducts = async (productId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ALL_PRODUCT, {}, {}, { productId });
            if (response.statusCode === 200) {
                setProduct(response.data.product);
            } else {
                console.error("Failed to fetch products:", response.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // const subtotal = Number(product?.price) || 0;
    // const tipAmountValue = Number(tipAmount) || 0;
    // const transactionFee = ((subtotal + tipAmountValue) * 0.0299) + 0.30;
    // const taxRate = 0.04;
    // const taxAmount = (subtotal * taxRate) || 0;
    // const total = (subtotal + transactionFee + tipAmountValue + taxAmount).toFixed(2);

    const subtotal = Number(product?.price) || 0;
    const tipAmountValue = Number(tipAmount) || 0;
    const transactionFee = ((subtotal + tipAmountValue) * 0.029) + 0.30;
    const taxRate = 0.04;
    const taxAmount = subtotal * taxRate;
    const total = (subtotal + transactionFee + tipAmountValue + taxAmount).toFixed(2);

    const handlePayment = async () => {
        const stripe = await stripePromise;
        const productData = {
            productId: productId,
            tipAmount: tipAmount,
        };
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.CHECKOUT, productData);
            if (response?.data?.sessionId) {
                window.location.href = response?.data?.sessionUrl
            } else {
                console.error("Checkout session creation failed", response);
            }
        } catch (error) {
            console.error("Error in handlePayment:", error);
        }
    };

    const handleBack = () => {
        navigate("/product/1");
    };

    function valuetext(value) {
        return `${value}°C`;
    }

    const handleSliderChange = (event, newValue) => {
        setTipAmount(newValue);
    };

    return (
        <>
            <style>
                {`
                    .custom-gradient-btn {
                        background-color: #9A00A9;
                        color: white;
                        border: none;
                        border-radius: 25px;
                        font-size: 1rem;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: none;
                        max-height: fit-content;
                        margin-left: 250px;
                    }
                    .custom-gradient-btn:hover {
                        background-color: #9A00A9;
                        color: white;
                        box-shadow: none;
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="mb-2">
                            <h5
                                className="text-primary ml-5"
                                style={{ color: "#131010", cursor: "pointer", marginLeft: "21%" }}
                                onClick={handleBack}
                            >
                                <ArrowBack className="me-2" />
                                Checkout
                            </h5>
                        </div>
                        <div className="col-lg-7 col-md-12">
                            <div
                                className="card p-3 mb-4"
                                style={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center w-100">
                                        <img
                                            src="../assets/images/marketplace-img-1.png"
                                            alt="Product"
                                            style={{
                                                borderRadius: "8px",
                                                marginRight: "12px",
                                                width: "100px",
                                            }}
                                        />
                                        <div className="w-100">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h6 className="mb-1" style={{ flexGrow: 1 }}>{product?.name || ""}</h6>
                                                <h6 className="mb-0" style={{ whiteSpace: "nowrap", color: "#29008B" }}>
                                                    ${product?.price}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="card p-3 mb-4"
                                style={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                }}
                            >
                                <div className="d-flex justify-content-between">
                                    <h6>InfinaTips For Seller
                                        <span role="img" aria-label="info">
                                            <img src="../assets/images/marketplace/chackout/tips.png" alt="Tips" />
                                        </span>
                                    </h6>
                                    <div className="d-flex">
                                        <button className="btn custom-gradient-btn h-50">Custom Tip</button>
                                    </div>
                                    <div className="d-flex">
                                        <img src="../assets/images/marketplace/chackout/tree.png" alt="Tree" />
                                    </div>
                                </div>

                                <Slider
                                    aria-label="Temperature"
                                    value={tipAmount}
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={100}
                                    step={5}
                                    onChange={handleSliderChange}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value) => `$${value}`}
                                    sx={{
                                        width: "70%",
                                        height: 10,
                                        borderRadius: 50,
                                        marginTop: -5,
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: '#9A00A9',
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: '#9A00A9',
                                        },
                                        '& .MuiSlider-rail': {
                                            backgroundColor: '#F6D1F9',
                                        },
                                        '& .MuiSlider-marked .MuiSlider-mark': {
                                            backgroundColor: '#F6D1F9',
                                        },
                                        '& .MuiSlider-valueLabel': {
                                            backgroundColor: '#9A00A9',
                                            color: '#fff',
                                            borderRadius: "30px",
                                        },
                                    }}
                                />
                                <div className="d-flex justify-content-between mt-2" style={{ width: "70%" }}>
                                    <span>$0</span>
                                    <span>$10</span>
                                    <span>$20</span>
                                    <span>$40</span>
                                    <span>$60</span>
                                    <span>$80</span>
                                    <span>$100</span>
                                </div>
                            </div>
                            <div
                                className="card p-3"
                                style={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    backgroundColor: "#F5F1FF",
                                }}
                            >
                                <h6>Order Summary</h6>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>US ${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Transaction Fee</span>
                                    <span>US ${transactionFee.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Infina Tips</span>
                                    <span>US ${parseFloat(tipAmount).toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Tax</span>
                                    <span>US ${taxAmount.toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <strong>Total</strong>
                                    <strong>US ${total}</strong>
                                </div>
                            </div>
                            <button
                                onClick={handlePayment}
                                className="btn custom-gradient-btn mt-3 w-50"
                                style={{ marginLeft: "100px" }}
                            >
                                Pay Now
                            </button>
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                centered
                                className="payment-success-modal"
                            >
                                <div className="card-body">
                                    <div
                                        className="card text-center"
                                        style={{
                                            border: "none",
                                            borderRadius: "15px",
                                            overflow: "hidden",
                                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <div
                                            className="card-header"
                                            style={{
                                                background: "linear-gradient(90deg, #9a00a9, #580097)",
                                                padding: "20px",
                                            }}
                                        ></div>

                                        <div className="card-body" style={{ padding: "30px" }}>
                                            <div
                                                style={{
                                                    background: "#FFF7E8",
                                                    borderRadius: "50%",
                                                    width: "80px",
                                                    height: "80px",
                                                    margin: "0 auto",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <i
                                                    className="bi bi-check-circle-fill"
                                                    style={{
                                                        fontSize: "3rem",
                                                        color: "#FFBE0B",
                                                    }}
                                                ></i>
                                            </div>
                                            <h5
                                                style={{
                                                    fontWeight: "600",
                                                    margin: "15px 0 5px",
                                                    color: "#333333",
                                                }}
                                            >
                                                Your payment successfully processed
                                            </h5>
                                            <p style={{ color: "#666666", fontSize: "1rem" }}>
                                                We’ve received your <strong>$68.98</strong> payment, <strong>John</strong>
                                            </p>
                                            <hr></hr>
                                            <div
                                                className=""
                                                style={{
                                                    maxWidth: "400px",
                                                    textAlign: "left",
                                                    fontSize: "0.95rem",
                                                    marginTop: "20px",
                                                    color: "#333333",
                                                }}
                                            >
                                                <div
                                                    className="d-flex justify-content-between"
                                                    style={{ marginBottom: "8px" }}
                                                >
                                                    <span>Transaction Date</span>
                                                    <span>2024, Nov 20</span>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between"
                                                    style={{ marginBottom: "8px" }}
                                                >
                                                    <span>Payment Method</span>
                                                    <span>Mastercard</span>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between"
                                                    style={{ marginBottom: "8px" }}
                                                >
                                                    <span>Payer</span>
                                                    <span>John Tomas</span>
                                                </div>
                                                <hr></hr>
                                                <div
                                                    className="d-flex justify-content-between"
                                                    style={{ marginBottom: "8px" }}
                                                >
                                                    <span>Subtotal</span>
                                                    <span>$14.99</span>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between"
                                                    style={{ marginBottom: "8px" }}
                                                >
                                                    <span>Transaction Fee</span>
                                                    <span>$1.38</span>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between"
                                                    style={{ marginBottom: "8px" }}
                                                >
                                                    <span>Infina Tips</span>
                                                    <span>$15</span>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between"
                                                    style={{ marginBottom: "8px" }}
                                                >
                                                    <span>Tax</span>
                                                    <span>4%</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <strong>Total</strong>
                                                    <strong style={{ color: "#9A00A9" }}>$32.62</strong>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mt-4">
                                                <Button
                                                    variant="outline-dark"
                                                    style={{
                                                        marginRight: "10px",
                                                        borderRadius: "20px",
                                                        padding: "5px 20px",
                                                        fontWeight: "500",
                                                    }}
                                                    onClick={() => alert("Downloading Invoice...")}
                                                >
                                                    Download Invoice
                                                </Button>
                                                <Button
                                                    style={{
                                                        backgroundColor: "#9A00A9",
                                                        color: "white",
                                                        borderRadius: "20px",
                                                        padding: "5px 20px",
                                                        fontWeight: "500",
                                                        border: "none",
                                                    }}
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Back to Website
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BuyNow;
