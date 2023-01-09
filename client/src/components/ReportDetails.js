import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

function ReportDetails() {
    const VOTE_URL = "http://localhost:8080/api/vote";
    const [report, setReport] = useState(
        {
            "reportId": 1,
            "title": "Bad Error",
            "issueDescription": "It broke my computer",
            "replicationInstructions": "Throw the computer into the lake",
            "postDate": "2022-10-12",
            "voteCount": 0,
            "completionStatus": false,
            "authorUsername": "test"
          }
    );
    
    const [voted, setVoted] = useState(false);
    
    const context = useContext(AuthContext);

    let admin = false;
    if(context) {
        admin = context.userData.authorities.includes("ADMIN");
    }

    const checkVoters = function () {
        if(!context) {
            return;
        }

        fetch(VOTE_URL + "/check/" + report.reportId, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {
            if(response.status == 200) {
                console.log(response);
                return response.json();
            }
            else{
                console.log(response);
            }
        })
        .then((json) => {
            console.log(json);
            setVoted(json);
        })
    }
    
    useEffect(checkVoters, []);

    const submitVote = function () {
        fetch(VOTE_URL + "/" + report.reportId, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {
            console.log(response);
            checkVoters();
        })
    }

    const removeVote = function () {
        fetch(VOTE_URL + "/" + report.reportId, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {
            console.log(response);
            checkVoters();
        })
    }

    const updateStatus = function(status) {
        fetch("http://localhost:8080/api/reports/update/" + report.reportId + "/" + status, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {
            console.log(response);
        })
    }

    

    if(!report) {
        return (
            <div>
                <p>Select a report for more retails.</p>
            </div>
        )
    }

    return (
        <div>
            <h5>{report.title}</h5>
            {
                report.completionStatus ?
                <p>Complete</p>
                : <p>Incomplete</p>
            }
            <p>By: {report.authorUsername}</p>
            <p>Posted: {report.postDate}</p>

            <h6>Issue Description</h6>
            <p>{report.issueDescription}</p>

            <h6>Replication Instructions</h6>
            <p>{report.replicationInstructions}</p>

            <p>Votes: {report.voteCount}</p>

            {
                context ? 
                (
                    voted ?
                    <button type="button" onClick={removeVote}>Remove Vote</button>
                    : <button type="button" onClick={submitVote}>Vote</button>
                )
                
                : <></>
            }

            {
                admin ?
                (
                    report.completionStatus ?
                    <button type="button" onClick={() => updateStatus(false)}>Mark as Incomplete</button>
                    : <button type="button" onClick={() => updateStatus(true)}>Mark as Complete</button>
                )
                : <></>
            }
        </div>
    );
}

export default ReportDetails;