import React from "react";

function ReportListItem({report, setReport}) {
    return (
        <button className="w-100 h-25 bg-white border" type="button" onClick={() => setReport(report)}>
            {report.title} <br/> 
            <span className="text-uppercase text-info">{report.authorUsername}</span> | {new Date(report.postDate).toLocaleDateString("en-US")}
        </button>
    );
}

export default ReportListItem;