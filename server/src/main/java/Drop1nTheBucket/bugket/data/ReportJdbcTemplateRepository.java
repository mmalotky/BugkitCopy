package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.AppUser;
import Drop1nTheBucket.bugket.models.Report;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ReportJdbcTemplateRepository implements ReportRepository {

    private final JdbcTemplate jdbcTemplate;

    public ReportJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Report> findAll() {
        final String sql = """
                select report_id, title, issue_description, 
                replication_instructions, date_of_reporting, completion_status, ru.username
                from reports
                inner join registered_user ru on reports.user_id = ru.user_id;
                """;
        return jdbcTemplate.query(sql, new ReportMapper());
    }

    @Override
    public List<Report> findIncomplete() {
        final String sql = """
                select report_id, title, issue_description, 
                replication_instructions, date_of_reporting, completion_status, ru.username
                from reports             
                inner join registered_user ru on reports.user_id = ru.user_id
                where completion_status = 0;
                """;
        return jdbcTemplate.query(sql, new ReportMapper());
    }

    @Override
    public List<Report> findByUsername(String username){
        final String sql = """
                select title, issue_description, replication_instructions, date_of_reporting, completion_status, ru.username
                from reports r
                join registered_user ru on r.user_id = ru.user_id
                where ru.username = ?
                """;
        return jdbcTemplate.query(sql, new ReportMapper(), username);
    }
// Tried figuring the sql join but couldn't -Alex
//    @Override
//    public List<Report> findByVote(String username){
//        final String sql = """
//                select title, issue_description, replication_instructions, date_of_reporting, completion_status, ru.username
//                from reports r
//                join registered_user ru on r.user_id = ru.user_id
//                where ru.username = ?
//                """;
//        return jdbcTemplate.query(sql, new ReportMapper(), username);
//    }

    @Override
    public Report create(Report report) {
        final String sql = """
                insert into reports (title, issue_description, replication_instructions, date_of_reporting, completion_status, user_id)
                values (?, ?, ?, ?, ?, (select user_id from registered_user where username = ?));
                """;

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, report.getTitle());
            ps.setString(2, report.getIssueDescription());
            ps.setString(3, report.getReplicationInstructions());
            ps.setDate(4,java.sql.Date.valueOf(report.getPostDate()));
            ps.setBoolean(5, report.isCompletionStatus());
            ps.setString(6, report.getAuthorUsername());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }

        report.setReportId(keyHolder.getKey().intValue());
        return report;
    }







}
