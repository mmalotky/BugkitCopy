import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function ViewFilter(props) {
    const context = useContext(AuthContext);

    let admin = false;
    if(context) {
        admin = context.userData.authorities.includes("ADMIN");
    }

    return (
        <div className="col text-center m-3 p-3">
            <h3>Filter Reports</h3>
            {
                admin ?
                <button className="w-100 bg-white border" type="button" onClick={props.getAll}>View All</button>
                : <></>
            }
            <button className="w-100 bg-white border" type="button" onClick={props.getIncomplete}>Incomplete</button>
            <button className="w-100 bg-white border" type="button" onClick={props.getMyReports}>My Reports</button>
            <button className="w-100 bg-white border" type="button" onClick={props.getVoted}>Voted</button>

            <h3>Order By</h3>
            <button className="w-100 bg-white border" type="button" onClick={props.sortByVote}>Votes</button>
            <button className="w-100 bg-white border" type="button" onClick={props.sortByNewest}>Newest</button>
            <button className="w-100 bg-white border" type="button" onClick={props.sortByOldest}>Oldest</button>
            <button className="w-100 bg-white border" type="button" onClick={props.sortByAuthor}>Author</button>
        </div>
    );
}

export default ViewFilter;