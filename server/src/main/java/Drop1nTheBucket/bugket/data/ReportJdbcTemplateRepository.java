package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.AppUser;
import Drop1nTheBucket.bugket.models.Report;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
    public Report create(Report report) {
        final String sql = """
                insert into reports (title, issue_description, replication_instructions, date_of_reporting, completion_status, user_id
                values (?, ?, ?, ?, ?, ?);
                """;

        //write prepared statements section
    }

}
