package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.App;
import Drop1nTheBucket.bugket.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
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

    @Override
    @Transactional
    public AppUser create(AppUser user){
        final String sql = """
                insert into registered_user(username, password_hash, role_id)\s
                		values (?, ?, (SELECT role_id from `role` where `name` = ?));
                """;

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            ps.setString(3, String.valueOf(user.getAuthorities().stream()
                    .findFirst().orElse(null)));
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }

        user.setId(keyHolder.getKey().intValue());

        return user;
    }

    public boolean editUserRole(String username, String newRole){
        final String sql = """
                update registered_user set
                role_id = (select role_id from `role` where `name` = ?)
                where username = ?
                """;

        return jdbcTemplate.update(sql,
                newRole, username) > 0;
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
