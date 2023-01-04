package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    AppUserJdbcTemplateRepository repository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    static boolean hasRun = false;

    @BeforeEach
    void setup(){
        if(!hasRun){
            hasRun = true;
            jdbcTemplate.update("call set_known_good_state();");
        }
    }

    @Test
    void findByUsername() {
        AppUser user = repository.findByUsername("admin");
        assertNotNull(user);
        assertEquals("admin", user.getUsername());
    }

    @Test
    void create(){
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        AppUser user = new AppUser("test", "$2a$12$3PhY0/FTNphEECCdkBmE6e.VbWgkZKNXuhBlnkkI9rvYlr4qvXqdi", true, roles);
        AppUser actual = repository.create(user);
        assertNotNull(actual);
        assertEquals("test", actual.getUsername());
    }
}