import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function ViewFilter({getIncomplete, getAll, getMyReports, getVoted}) {
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
                <button className="w-100 h-25 bg-white border" type="button" onClick={getAll}>View All</button>
                : <></>
            }
            <button className="w-100 h-25 bg-white border" type="button" onClick={getIncomplete}>Incomplete</button>
            <button className="w-100 h-25 bg-white border" type="button" onClick={getMyReports}>My Reports</button>
            <button className="w-100 h-25 bg-white border" type="button" onClick={getVoted}>Voted</button>
        </div>
    );
}

export default ViewFilter;