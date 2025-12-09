import React, { useState } from "react";
import "./AdTargetPopup.css";


const AdTargetPopup = ({ closePopup }) => {
    const [activeTab, setActiveTab] = useState(1);
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(25);

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxAge - 1);
        setMinAge(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minAge + 1);
        setMaxAge(value);
    };

    const [adFormat, setAdFormat] = useState("Image Ad");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const [showPreviewPopup, setShowPreviewPopup] = useState(false);
    const [ratio, setRatio] = useState("16:9");
    const [previewImage, setPreviewImage] = useState(null);

    const handlePreviewUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
        }
    };


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

    const interestsData = [
        {
            title: "Entertainment",
            items: [
                "Movie", "TV Show", "Music", "Book", "Literature", "Podcasts",
                "Audiobooks", "Celebrity News", "Pop Culture"
            ]
        },
        {
            title: "Technology & Innovation",
            items: [
                "Gadgets", "Devices", "Programming & Software Development",
                "AI & Machine Learning", "Blockchain & Cryptocurrency",
                "Startups & Entrepreneurship"
            ]
        },
        {
            title: "Health & Wellness",
            items: [
                "Mental Health", "Nutrition & Dieting", "Exercise & Fitness",
                "Alternative Medicine", "Holistic Health"
            ]
        },
        {
            title: "Business & Finance",
            items: [
                "Investing", "Entrepreneurship", "Personal Finance", "Marketing"
            ]
        },
        {
            title: "Education & Career Development",
            items: [
                "Skill Development", "Professional Networking",
                "Career Guidance & Job Search", "Online Courses & Certifications"
            ]
        },
        {
            title: "Lifestyle & Fashion",
            items: [
                "Fashion & Style", "Beauty & Skincare", "Home & Interior Design",
                "Sustainable Living & Minimalism"
            ]
        },
        {
            title: "Food & Drink",
            items: [
                "Cooking & Recipes", "Dining Out & Restaurant Reviews",
                "Wine & Craft Beer", "Health & Diet Foods"
            ]
        },
        {
            title: "Causes & Social Impact",
            items: [
                "Environmental Sustainability", "Social Justice & Activism",
                "Charities & Non-Profit Initiatives", "Volunteering Opportunities"
            ]
        },
        {
            title: "Family & Relationships",
            items: [
                "Parenting & Family Life", "Relationships & Dating Advice",
                "Mental Wellness & Relationships"
            ]
        },
        {
            title: "NFTs & Digital Art",
            items: [
                "Gaming NFTs", "Music NFTs", "Collectibles",
                "Pixel Arts", "Fractal Arts"
            ]
        },
        {
            title: "Virtual Reality & Augmented Reality",
            items: [
                "Fully immersive virtual reality", "AR gaming", "Biomedical VR-AR"
            ]
        },
        {
            title: "Photography & Videography",
            items: [
                "Abstract photography", "Aerial photography", "Architectural photography",
                "Aviation photography", "Event videography", "Brand documentaries",
                "Product videos", "Documentary films"
            ]
        }
    ];

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);

    const toggleItem = (item) => {
        if (selected.includes(item)) {
            setSelected(selected.filter((i) => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    };

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
                                        <div className="age-values-box">
                                            <span className="value-box">{minAge}</span>
                                            <span className="value-box">{maxAge}</span>
                                        </div>
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

                                {/* <label>Interests & Keywords</label>
                                <select>
                                    <option>Select Interests</option>
                                </select> */}

                                <div className="interest-container">
                                    <label className="interest-label">Interests & Keywords</label>

                                    {/* Selected Tags */}
                                    <div className="selected-box" onClick={() => setOpen(!open)}>
                                        {selected.length === 0 ? (
                                            <span className="placeholders">Select Interests</span>
                                        ) : (
                                            selected.map((item) => (
                                                <span key={item} className="tag">{item}</span>
                                            ))
                                        )}
                                    </div>

                                    {/* DROPDOWN */}
                                    {open && (
                                        <div className="dropdown">
                                            {interestsData.map((cat) => (
                                                <div key={cat.title} className="category-block">
                                                    <h4 className="category-title">{cat.title}</h4>
                                                    <ul className="category-list">
                                                        {cat.items.map((item) => (
                                                            <li key={item}>
                                                                <label className="item-label">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selected.includes(item)}
                                                                        onChange={() => toggleItem(item)}
                                                                    />
                                                                    {item}
                                                                </label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <label>Estimated Audience Size</label>
                                <input type="text" placeholder="Audience Size" />
                                <div className="preview-link">
                                    <button className="next-btn" onClick={() => setActiveTab(1)}>
                                        Privious
                                    </button>
                                    <button
                                        className="next-btn"
                                        onClick={() => setActiveTab(2)}
                                    >
                                        Next
                                    </button>
                                </div>
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

                                <div className="upload-info">
                                    <div
                                        className="preview-link"
                                        onClick={() => setShowPreview(true)}
                                    >
                                        <span>Show Preview</span>
                                        <i className="fa fa-eye"></i>
                                    </div>
                                    <div
                                        className="preview-link"
                                        onClick={() => setShowPreviewPopup(true)}
                                    >
                                        <span>Customize Preview</span>
                                        <i className="fa fa-eye"></i>
                                    </div>
                                </div>

                                {showPreview && uploadedImage && (
                                    <div className="preview-overlay">
                                        <div className="preview-popup-image">
                                            <div className="preview-header">
                                                <h3>Ad Preview</h3>
                                                <button
                                                    className="close-btn"
                                                    onClick={() => setShowPreview(false)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            <hr className="divider" />
                                            <div className="preview-body-image">
                                                <div className="preview-text-box">
                                                    <p>
                                                        Experience the luxurious tranquility of our beauty product, inspired by serene
                                                        oases enveloped in lush greenery and tranquil waters. 🌿💧 Unleash your natural
                                                        beauty with our cosmetic company's exquisite offering.
                                                    </p>
                                                </div>
                                                <img
                                                    src={uploadedImage}
                                                    alt="Uploaded"
                                                    className="preview-image"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {/* ==== PREVIEW POPUP ==== */}
                                {showPreviewPopup && uploadedImage && (
                                    <div className="preview-popup-overlay">
                                        <div className="preview-popup">

                                            {/* HEADER */}
                                            <div className="preview-header">
                                                <h3>Upload Image / Video</h3>

                                                <button
                                                    className="close-btn"
                                                    onClick={() => setShowPreviewPopup(false)}
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            <hr className="popup-divider" />
                                            <div className="preview-top-row">
                                                <span className="image-ad-label">Image Ad</span>
                                                <label className="upload-image-btn">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        hidden
                                                    />
                                                    <i className="fa fa-plus"></i> Upload Image
                                                </label>
                                            </div>

                                            <div className="preview-body">
                                                <div className="ratio-section">
                                                    <h6>Aspect ratio</h6>
                                                    <label className="ratio-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={ratio === "16:9"}
                                                            onChange={() => setRatio("16:9")}
                                                        />
                                                        Horizontal (16:9)
                                                    </label>
                                                    <label className="ratio-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={ratio === "9:16"}
                                                            onChange={() => setRatio("9:16")}
                                                        />
                                                        Vertical
                                                        (9:16)
                                                    </label>
                                                    <label className="ratio-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={ratio === "1:1"}
                                                            onChange={() => setRatio("1:1")}
                                                        />
                                                        Square (1:1)
                                                    </label>
                                                </div>
                                                <div className="preview-image-side">
                                                    <div className="preview-image-wrapper">
                                                        <img src={uploadedImage} alt="preview" />
                                                        <button
                                                            className="delete-img-icon"
                                                            onClick={() => setUploadedImage(null)}
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="preview-footer">
                                                <button
                                                    className="cancel-btn"
                                                    onClick={() => setShowPreviewPopup(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button className="continue-btn">
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}


                                <div className="preview-link">
                                    <button className="next-btn" onClick={() => setActiveTab(1)}>
                                        Previous
                                    </button>
                                    <button className="next-btn" onClick={() => setActiveTab(3)}>
                                        Next
                                    </button>
                                </div>
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
                                <div className="preview-link">
                                    <button className="next-btn" onClick={() => setActiveTab(2)}>
                                        Previous
                                    </button>
                                    <button
                                        className="review-btn"
                                        onClick={() => setActiveTab(4)}
                                    >
                                        Review & Confirm
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB 4 */}
                        {activeTab === 4 && (
                            <div className="tab-box">
                                <label>Adverting Goal</label>
                                <div className="goal-options">
                                    <label className="goal-type"><input type="radio" name="goal" checked />Reach</label>
                                    <label className="goal-type"><input type="radio" name="goal" />Engagements</label>
                                </div>
                                <div className="goal-options">
                                    <label className="goal-type"><input type="radio" name="goal" />Website Traffic</label>
                                    <label className="goal-type"><input type="radio" name="goal" />Promote My Product</label>
                                </div>
                                <label>Target Audience Details</label>
                                <label>Location</label>
                                <select>
                                    <option>USA</option>
                                    <option>India</option>
                                    <option>Afghanistan</option>
                                    <option>Bangladesh</option>
                                    <option>China</option>
                                    <option>Egypt</option>
                                    <option>Indonesia</option>
                                    <option>Japan</option>
                                </select>
                                <select>
                                    <option>California</option>
                                    <option>Gujarat</option>
                                    <option>Panjab</option>
                                    <option>Delhi</option>
                                    <option>UP</option>
                                    <option>Maharastra</option>
                                </select>
                                <div>
                                    <label className="age-title">Age Range</label>
                                    <div className="age-range-container">
                                        <div className="age-values-box">
                                            <span className="value-box">{minAge}</span>
                                            <span className="value-box">{maxAge}</span>
                                        </div>
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
                                <select>
                                    <option>Business</option>
                                    <option>Marketing</option>
                                    <option>Retail</option>
                                </select>
                                <label>Estimated Audience Size</label>
                                <input type="text" value="30000" placeholder="Audience Size" />
                                <h6 className="title">Daily Budget</h6>
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
                                <label>Budget Duration</label>
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
                                <label>Total Budget</label>
                                <div className="total-box">
                                    ${totalBudget.toFixed(2)}
                                </div>
                                <div className="reach-box">
                                    <div className="reach-header">
                                        <label>Estimated Daily Reach & Impressions</label>
                                        <i className="fa fa-info-circle info-icon"></i>
                                    </div>
                                    <div className="reach-row">
                                        <span className="reach-title">Reach:</span>
                                        <span className="reach-value">3,300 – 11,000</span>
                                    </div>
                                    <div className="progress-track">
                                        <div className="progress-fill"></div>
                                    </div>
                                    <div className="reach-row">
                                        <span className="reach-title">Impressions:</span>
                                        <span className="reach-value">1,000 – 15,000</span>
                                    </div>
                                    <div className="progress-track">
                                        <div className="progress-fill"></div>
                                    </div>
                                </div>
                                <div className="preview-link">
                                    <button className="next-btn" onClick={() => setActiveTab(3)}>
                                        Privious
                                    </button>
                                    <button className="edit-btn">
                                        Edit
                                    </button>
                                    <button className="next-btn">Publish</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdTargetPopup;
