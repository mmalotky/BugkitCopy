import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import ReportDetails from "./ReportDetails";
import ReportListItem from "./ReportListItem";
import SearchBar from "./SearchBar";
import ViewFilter from "./ViewFilter";

function ViewBugs() {
    const REPORT_URL = "http://localhost:8080/api/reports"
    const [reports, setReports] = useState([]);
    const [report, setReport] = useState();
    const [hidden, setHidden] = useState([]);
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

    const sortByVote = function () {
        const sorted = [...reports].sort((a, b) => b.voteCount - a.voteCount);
        setReports(sorted);
    }

    const sortByNewest = function () {
        const sorted = [...reports].sort((a, b) => b.postDate > a.postDate ? 1 : -1);
        setReports(sorted);
    }

    const sortByOldest = function () {
        const sorted = [...reports].sort((a, b) => b.postDate > a.postDate ? -1 : 1);
        setReports(sorted);
    }

    const sortByAuthor = function () {
        const sorted = [...reports].sort((a, b) => b.authorUsername > a.authorUsername ? -1 : 1);
        setReports(sorted);
    }
    
    const search = function (searchTerm) {
        let newList = [];
        reports.map((r) => {
            if(!{...r}.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                newList.push(r);
            }
            return r;
        });

        setHidden(newList);
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
                    <SearchBar search={search}/>
                    {reports.length === 0 ? <div>Loading...</div> :
                    reports.map((r) => {
                        return <div key = {r.reportId} className={hidden.includes(r) ? "d-none" : ""}>
                            <ReportListItem
                                report = {r}
                                setReport = {setReport}
                            />
                        </div>
                    })}
                </div>
                {
                    context ?
                    <ViewFilter
                        getIncomplete = {getIncomplete}
                        getAll = {getAll}
                        getMyReports = {getMyReports}
                        getVoted = {getVoted}
                        sortByVote = {sortByVote}
                        sortByNewest = {sortByNewest}
                        sortByOldest = {sortByOldest}
                        sortByAuthor = {sortByAuthor}
                    />
                    : <></>
                }
            </div>
            
        </div>
    );
}

export default ViewBugs;