package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.AppUser;
import Drop1nTheBucket.bugket.models.Report;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
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
        hasRun = false;
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

    @Test
    void shouldFindAllByUsername(){
        List<Report> reports = repository.findByUsername("admin");
        assertEquals(2, reports.size());

        reports = repository.findByUsername("test");
        assertEquals(1, reports.size());
    }

    @Test
    void shouldCreate() {

        Report report = new Report(
                "test", "test", "test", LocalDate.of(2023,01,01), false, "test"
        );

        Report actual = repository.create(report);
        assertNotNull(actual);
        assertEquals("test", actual.getTitle());
        assertEquals(4, actual.getReportId());
        assertEquals("test", actual.getAuthorUsername());
    }
}