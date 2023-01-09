import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function ViewFilter({getIncomplete, getAll, getMyReports, getVoted}) {
    const context = useContext(AuthContext);

    let admin = false;
    if(context) {
        admin = context.userData.authorities.includes("ADMIN");
    }

    return (
        <div className="col">
            <h3>Filter Reports</h3>
            {
                admin ?
                <button type="button" onClick={getAll}>View All</button>
                : <></>
            }
            <button type="button" onClick={getIncomplete}>Incomplete</button>
            <button type="button" onClick={getMyReports}>My Reports</button>
            <button type="button" onClick={getVoted}>Voted</button>
        </div>
    );
}

export default ViewFilter;