import React from "react";

function ReportListItem({report, setReport}) {
    return (
        <button className="w-100 h-25 bg-white border" type="button" onClick={() => setReport(report)}>{report.title} <br/> {report.authorUsername} | {report.postDate}</button>
    );
}

export default ReportListItem;