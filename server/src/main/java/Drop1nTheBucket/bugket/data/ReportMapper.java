package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.Report;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReportMapper implements RowMapper<Report> {

    @Override
    public Report mapRow(ResultSet rs, int i) throws SQLException {
        Report report = new Report();
        report.setReportId(rs.getInt("report_id"));
        report.setTitle(rs.getString("title"));
        report.setIssueDescription(rs.getString("issue_description"));
        report.setReplicationInstructions(rs.getString("replication_instructions"));
        report.setPostDate(rs.getDate("date_of_reporting").toLocalDate());
        report.setCompletionStatus(rs.getBoolean("completion_status"));
        report.setAuthorUsername(rs.getString("username"));

        return report;
    }
}
