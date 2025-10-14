import React, { useState, useEffect } from "react";
import API_ENDPOINTS from "../../api/apiConfig";
import { networkRequest } from "../../utils/networkRequest";


const NewReportAnalytics = () => {
    const [reports, setReports] = useState([]);
    const categories = [
        { name: "Sexual Content", image: "SexualContent.png" },
        { name: "Abuse & Harassment", image: "AbuseHarassment.png" },
        { name: "Hate Speech", image: "HateSpeech.png" },
        { name: "Child safety", image: "ChildSafety.png" },
        { name: "Privacy", image: "Privacy.png" },
        { name: "Spam", image: "Spam.png" },
        { name: "Suicide or self-harm", image: "Suicideorselfharm.png" },
        { name: "Sensitive or disturbing media", image: "Sensitive.png" },
        { name: "Impersonation", image: "Impersonation.png" },
        { name: "Violent & hateful entities", image: "Violent.png" },
        { name: "Fake account", image: "FakeAccount.png" },
        { name: "Illegal goods", image: "IllegalGoods.png" },
    ];

    useEffect(() => {
        getAllReports();
    }, []);

    const getAllReports = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.REPORT_COUNT, {}, {});
            if (response.statusCode === 200) {
                console.log("Response:", response);
                setReports(response.data);
            } else {
                console.error("Failed to fetch report post:", response.message);
            }
        } catch (error) {
            console.error("Error fetching report post:", error);
        }
    };
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">Report Analytics</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        {categories.map((category, index) => {
                            const report = reports.find((r) => r._id === category.name);
                            return (
                                <div key={index} className="col-md-3">
                                    <div className="card mini-stats-wid">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p className="text-muted fw-medium fw-bold">{category.name}</p>
                                                    <h4 className="mb-0 fw-bold">{report ? report.count : 0}</h4>
                                                </div>
                                                <div className="flex-shrink-0 align-self-center">
                                                    <img src={`../assets/admin/assets/${category.image}`} alt={category.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default NewReportAnalytics;