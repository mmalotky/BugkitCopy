package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.App;
import Drop1nTheBucket.bugket.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository{

    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    @Transactional
    public AppUser findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = """
                select user_id, username, password_hash, enabled
                from registered_user
                where username = ?;
                """;

        return jdbcTemplate.query(sql, new AppUserMapper(roles), username).stream().findFirst().orElse(null);
    }

    private List<String> getRolesByUsername(String username){
        final String sql = """
                select name
                from role
                join registered_user ru on role.role_id = ru.role_id
                where name = ?
                """;
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), username);
    }
}
