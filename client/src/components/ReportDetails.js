import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Message from "./Message";

function ReportDetails({report, refresh, SERVER_URL}) {
    const VOTE_URL = SERVER_URL + "/api/vote";
    
    const [voted, setVoted] = useState(false);
    const [messages, setMessages] = useState([]);
    
    const context = useContext(AuthContext);

    let auth = false;
    if(context) {
        auth = context.userData.authorities.includes("ADMIN") 
        || context.userData.authorities.includes("DEV");
    }

    const checkVoters = function () {
        if(!context || !report) {
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
        .then(setVoted)
    }
    
    useEffect(checkVoters, [report]);

    const submitVote = function () {
        fetch(VOTE_URL + "/" + report.reportId, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {
            console.log(response);
            refresh();
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
            refresh();
        })
    }

    const updateStatus = function(status) {
        fetch(SERVER_URL + "/api/reports/update/" + report.reportId + "/" + status, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {
            console.log(response);
            refresh();
        })
    }

    const getMessages = function () {
        fetch(SERVER_URL + "/api/messages/" + report.reportId)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((json) => {
            setMessages(json);
        })
    }

    useEffect(getMessages, [report]);

    if(!report) {
        return (
            <div className="col m-3 p-3">
                <h3>Report Details</h3>
                <p>Select a report for more retails.</p>
            </div>
        )
    }

    return (
        <div className="col text-center m-3 p-3">
            <h3>Report Details</h3>
            <div className="p-3 text-left bg-white border">
                <h5>{report.title}</h5>
                {
                    report.completionStatus ?
                    <p className="text-success">Complete</p>
                    : <p className="text-danger">Incomplete</p>
                }
                <p>By: <span className="text-info text-uppercase">{report.authorUsername}</span> | Posted: {report.postDate}</p>

                <h6>Issue Description</h6>
                <p>{report.issueDescription}</p>

                <h6>Replication Instructions</h6>
                <p>{report.replicationInstructions}</p>
            </div>
            

            <p>Votes: {report.voteCount}</p>

            {
                context ? 
                (
                    voted ?
                    <button className="btn btn-primary m-2" type="button" onClick={removeVote}>Remove Vote</button>
                    : <button className="btn btn-primary m-2" type="button" onClick={submitVote}>Vote</button>
                )
                
                : <></>
            }
            <br/>
            {
                auth ?
                (
                    report.completionStatus ?
                    <button className="btn btn-danger m-2" type="button" onClick={() => updateStatus(false)}>Mark as Incomplete</button>
                    : <button className="btn btn-success m-2" type="button" onClick={() => updateStatus(true)}>Mark as Complete</button>
                )
                : <></>
            }
            <h4>Messages</h4>
            {
                messages.map((message) => {
                    return <Message 
                        key={message.messageId} 
                        message={message}
                        SERVER_URL={SERVER_URL}
                        getMessages={getMessages}
                    />
                })
            }

        </div>
    );
}

export default ReportDetails;