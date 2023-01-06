package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.Report;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReportMapper implements RowMapper<Report> {

    @Override
    public Report mapRow(ResultSet rs, int i) throws SQLException {
        return new Report(
                rs.getString("title"),
                rs.getString("issue_description"),
                rs.getString("replication_instructions"),
                rs.getDate("date_of_reporting").toLocalDate(),
                rs.getBoolean("completion_status"),
                rs.getString("username")
        );
    }
}
