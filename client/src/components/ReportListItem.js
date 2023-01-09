import React from "react";

function ReportListItem({report, setReport}) {
    return (
        <button type="button" onClick={() => setReport(report)}>{report.title} - {report.title} - {report.postDate}</button>
    );
}

export default ReportListItem;