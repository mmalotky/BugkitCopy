package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.Message;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MessageJdbcTemplateRepository implements MessageRepository {

    private final JdbcTemplate jdbcTemplate;

    public MessageJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Message> findAllForReport(int reportId) {
        final String sql = """
                select message_id, message, post_date, ru.username
                from messages m
                inner join registered_user ru on m.user_id = ru.user_id
                inner join reports r on m.report_id = r.report_id
                where r.report_id = ?;
                """;
        return jdbcTemplate.query(sql, new MessageMapper(), reportId);
    }
}
