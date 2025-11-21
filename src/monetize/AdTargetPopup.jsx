import React, { useState } from "react";
import "./AdTargetPopup.css";


const AdTargetPopup = ({ closePopup }) => {
    const [activeTab, setActiveTab] = useState(1);

    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(25);

    // Lower handle logic
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxAge - 1);
        setMinAge(value);
    };

    // Upper handle logic
    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minAge + 1);
        setMaxAge(value);
    };

    // ADD THIS 👇
    const [adFormat, setAdFormat] = useState("Image Ad");
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            //setUploadedImage(URL.createObjectURL(file));
            const url = URL.createObjectURL(file);
            setUploadedImage(url);
        }
    };

    const [dailyBudget, setDailyBudget] = useState(5);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const totalBudget = startDate && endDate
        ? dailyBudget * ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
        : 0;


    return (
        <div className="ad-popup-overlay">
            <div className="ad-popup">
                {/* TOP HEADER */}
                <div className="popup-header">
                    <h3>Activatree Ad Manager</h3>
                    <button onClick={closePopup} className="close-btn">×</button>
                </div>
                <div className="ad-popup-body">
                    {/* LEFT STEPS */}
                    <div className="steps-left">
                        <div className={`step ${activeTab === 1 ? "active" : ""}`}>
                            <span>01</span> Define Target Audience
                        </div>
                        <div className={`step ${activeTab === 2 ? "active" : ""}`}>
                            <span>02</span> Choose Ad Format
                        </div>
                        <div className={`step ${activeTab === 3 ? "active" : ""}`}>
                            <span>03</span> Set Budget & Duration
                        </div>
                        <div className={`step ${activeTab === 4 ? "active" : ""}`}>
                            <span>04</span> Review & Confirm
                        </div>
                    </div>

                    {/* RIGHT AREA */}
                    <div className="right-content">

                        {/* TAB 1 */}
                        {activeTab === 1 && (
                            <div className="tab-box">
                                <label>Ad Name</label>
                                <input type="text" placeholder="New Ad Name" />
                                <label>Location</label>
                                <select>
                                    <option>Select Country</option>
                                    <option>India</option>
                                    <option>USA</option>
                                    <option>Afghanistan</option>
                                    <option>Bangladesh</option>
                                    <option>China</option>
                                    <option>Egypt</option>
                                    <option>Indonesia</option>
                                    <option>Japan</option>
                                </select>
                                <select>
                                    <option>Select State</option>
                                    <option>Gujarat</option>
                                    <option>Panjab</option>
                                    <option>Delhi</option>
                                    <option>UP</option>
                                    <option>Maharastra</option>
                                </select>
                                <select>
                                    <option>Select City</option>
                                    <option>Gujarat</option>
                                    <option>Panjab</option>
                                    <option>Delhi</option>
                                    <option>UP</option>
                                    <option>Maharastra</option>
                                </select>
                                <div>
                                    <label className="age-title">Age Range</label>

                                    <div className="age-range-container">

                                        {/* White rounded values */}
                                        <div className="age-values-box">
                                            <span className="value-box">{minAge}</span>
                                            <span className="value-box">{maxAge}</span>
                                        </div>

                                        {/* Slider */}
                                        <div className="age-slider-wrapper">
                                            <div
                                                className="track-active"
                                                style={{
                                                    left: `${((minAge - 18) / (65 - 18)) * 100}%`,
                                                    right: `${100 - ((maxAge - 18) / (65 - 18)) * 100}%`,
                                                }}
                                            />

                                            <input
                                                type="range"
                                                min="18"
                                                max="65"
                                                value={minAge}
                                                onChange={handleMinChange}
                                                className="age-slider lower"
                                            />

                                            <input
                                                type="range"
                                                min="18"
                                                max="65"
                                                value={maxAge}
                                                onChange={handleMaxChange}
                                                className="age-slider upper"
                                            />
                                        </div>

                                        {/* Bottom labels */}
                                        <div className="age-limit-labels">
                                            <span>18</span>
                                            <span>65</span>
                                        </div>
                                    </div>
                                </div>
                                <label>Gender</label>
                                <div className="gender-options">
                                    <label className="gender-type"><input type="radio" name="gender" /> All</label>
                                    <label className="gender-type"><input type="radio" name="gender" /> Male</label>
                                    <label className="gender-type"><input type="radio" name="gender" /> Female</label>
                                </div>
                                <label>Interests & Keywords</label>
                                <select><option>Select Interests</option></select>
                                <label>Estimated Audience Size</label>
                                <input type="text" placeholder="Audience Size" />
                                <button
                                    className="next-btn"
                                    onClick={() => setActiveTab(2)}
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        {/* TAB 2 */}
                        {activeTab === 2 && (
                            <div className="choose-format-tab">
                                <h4 className="tab-title">Choose Ad Format</h4>
                                <div className="ad-format-options">
                                    <label className="format-option">
                                        <input
                                            type="radio"
                                            name="adFormat"
                                            value="Image Ad"
                                            checked={adFormat === "Image Ad"}
                                            onChange={() => setAdFormat("Image Ad")}
                                        />
                                        <div>
                                            <h5>Image Ad</h5>
                                            <p>Upload a single image with a caption field.</p>
                                        </div>
                                    </label>
                                    <label className="format-option">
                                        <input
                                            type="radio"
                                            name="adFormat"
                                            value="Video Ad"
                                            checked={adFormat === "Video Ad"}
                                            onChange={() => setAdFormat("Video Ad")}
                                        />
                                        <div>
                                            <h5>Video Ad</h5>
                                            <p>Upload a video (with recommended dimensions and duration limits).</p>
                                        </div>
                                    </label>
                                    <label className="format-option">
                                        <input
                                            type="radio"
                                            name="adFormat"
                                            value="Carousel Ad"
                                            checked={adFormat === "Carousel Ad"}
                                            onChange={() => setAdFormat("Carousel Ad")}
                                        />
                                        <div>
                                            <h5>Carousel Ad</h5>
                                            <p>Option to upload multiple images/videos with separate links.</p>
                                        </div>
                                    </label>
                                    <label className="format-option">
                                        <input
                                            type="radio"
                                            name="adFormat"
                                            value="Text Ad"
                                            checked={adFormat === "Text Ad"}
                                            onChange={() => setAdFormat("Text Ad")}
                                        />
                                        <div>
                                            <h5>Text Ad</h5>
                                            <p>Minimalist ad with headline, description.</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="divider-line"></div>
                                <h4 className="upload-title">Image Upload</h4>
                                <input
                                    type="file"
                                    id="imgUploadInput"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageUpload}
                                />
                                <div className="upload-box">
                                    {uploadedImage && (
                                        <img
                                            src={uploadedImage}
                                            alt="preview"
                                            className="upload-preview"
                                        />
                                    )}

                                    <div className="upload-info">
                                        <h5>{uploadedImage ? "Upload Image" : "No Image Uploaded"}</h5>
                                        <button
                                            className="change-img-btn"
                                            onClick={() =>
                                                document.getElementById("imgUploadInput").click()
                                            }
                                        >
                                            {uploadedImage ? "Change Image" : "Upload Image"}
                                        </button>
                                        {uploadedImage && (
                                            <button
                                                className="delete-img-btn"
                                                onClick={() => setUploadedImage(null)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Text Headline"
                                    className="ad-input"
                                />
                                <textarea
                                    placeholder="Description"
                                    className="ad-textarea"
                                ></textarea>
                                <div className="preview-link">
                                    <span>Show Preview</span>
                                    <i className="fa fa-eye"></i>
                                </div>
                                <button className="next-btn" onClick={() => setActiveTab(3)}>
                                    Next
                                </button>
                            </div>
                        )}

                        {/* TAB 3 */}
                        {activeTab === 3 && (
                            <div className="tab-box">
                                <h4 className="title">Daily Budget</h4>
                                <div className="slider-box">
                                    <span className="budget-bubble">${dailyBudget}</span>
                                    <span className="budget-value">${dailyBudget.toFixed(2)}</span>

                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={dailyBudget}
                                        onChange={(e) => setDailyBudget(Number(e.target.value))}
                                        className="budget-slider"
                                    />


                                    <div className="budget-labels">
                                        <span>$0</span>
                                        <span>$20</span>
                                        <span>$40</span>
                                        <span>$60</span>
                                        <span>$80</span>
                                        <span>$100</span>
                                    </div>
                                </div>

                                <h4 className="title">Budget Duration</h4>
                                <div className="date-row">
                                    <div className="date-input">
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="date-input">
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <p className="info-text">
                                    Estimated Results Panel Displays projected impressions, clicks, and reach based on budget.
                                </p>
                                <h4 className="title">Total Budget</h4>
                                <div className="total-box">
                                    ${totalBudget.toFixed(2)}
                                </div>
                                <button
                                    className="review-btn"
                                    onClick={() => setActiveTab(4)}
                                >
                                    Review & Confirm
                                </button>
                            </div>
                        )}

                        {/* TAB 4 */}
                        {activeTab === 4 && (
                            <div className="tab-box">
                                <h4>Review & Confirm</h4>
                                <button className="next-btn">Publish</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdTargetPopup;
