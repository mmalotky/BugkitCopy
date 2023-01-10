import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import ReportDetails from "./ReportDetails";
import ReportListItem from "./ReportListItem";
import ViewFilter from "./ViewFilter";

function ViewBugs() {
    const REPORT_URL = "http://localhost:8080/api/reports"
    const [reports, setReports] = useState([]);
    const [report, setReport] = useState();
    const [view, setView] = useState("");
    const context = useContext(AuthContext);

    const getIncomplete = function() {
        fetch(REPORT_URL + "/incomplete")
        .then((response) => {return response.json()})
        .then((json) => {
            setReports(json);
            setView("INCOMPLETE");
        })
    }

    useEffect(getIncomplete, []);

    const getAll = function() {
        fetch(REPORT_URL, {
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {return response.json()})
        .then((json) => {
            setReports(json);
            setView("ALL");
        })
    }

    const getMyReports = function() {
        fetch(REPORT_URL + "/author", {
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {return response.json()})
        .then((json) => {
            setReports(json);
            setView("MY_REPORTS");
        })
    }

    const getVoted = function() {
        fetch(REPORT_URL + "/voted", {
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {return response.json()})
        .then((json) => {
            setReports(json);
            setView("VOTED");
        })
    }

    const updateReport = function () {
        let findReport = [];
        if(report) {
            findReport = reports.filter((r) => {return r.reportId === report.reportId});
        }
        
        let newReport = null;
        if(findReport.length === 1){
            newReport = findReport[0];
        }

        setReport(newReport);
    }

    useEffect(updateReport, [reports]);

    const refresh = function () {
        switch(view) {
            case "ALL":
                getAll();
                break;
            case "INCOMPLETE":
                getIncomplete();
                break;
            case "MY_REPORTS":
                getMyReports();
                break;
            case "VOTED":
                getVoted();
                break;
        }
    }

    return (
        <div className="container">
            <div className="row bg-light p-5">
                <ReportDetails
                    report = {report}
                    refresh = {refresh}
                />
                <div className="col text-center m-3 p-3">
                    <h3>Reports List</h3>
                    {reports.length === 0 ? <div>Loading...</div> :
                    reports.map((r) => {
                        return <ReportListItem 
                            key = {r.reportId}
                            report = {r}
                            setReport = {setReport}
                        />
                    })}
                </div>
                {
                    context ?
                    <ViewFilter
                        getIncomplete = {getIncomplete}
                        getAll = {getAll}
                        getMyReports = {getMyReports}
                        getVoted = {getVoted}
                    />
                    : <></>
                }
            </div>
            
        </div>
    );
}

export default ViewBugs;