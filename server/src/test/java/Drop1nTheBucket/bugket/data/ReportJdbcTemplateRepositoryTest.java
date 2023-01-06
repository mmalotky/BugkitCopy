package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.Report;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ReportJdbcTemplateRepositoryTest {

    @Autowired
    ReportJdbcTemplateRepository repository;

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
    void shouldFindAll() {
        List<Report> reports = repository.findAll();
        assertEquals(3, reports.size());
    }

    @Test
    void shouldFindIncomplete() {
        List<Report> reports = repository.findIncomplete();
        assertEquals(2, reports.size());
    }
}