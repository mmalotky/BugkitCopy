package Drop1nTheBucket.bugket.domain;

import Drop1nTheBucket.bugket.data.ReportRepository;
import Drop1nTheBucket.bugket.data.ReportRepositoryDouble;
import Drop1nTheBucket.bugket.models.Report;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ReportsServiceTest {

    ReportRepository repository = new ReportRepositoryDouble();
    ReportsService service = new ReportsService(repository);

    @Test
    void shouldFindAll() {
        List<Report> expected = repository.findAll();
        List<Report> actual = service.getAll();
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void shouldFindIncomplete() {
        List<Report> expected = repository.findIncomplete();
        List<Report> actual = service.getAllIncomplete();
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void shouldFindByUsername() {
        List<Report> expected = repository.findByUsername("test");
        List<Report> actual = service.getByUsername("test");
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void shouldCreate() {
        Report expected = new Report(
                "Ate my homework", "The program deleted my file", "Save a Word document at any time",
                LocalDate.of(2022, 03, 13), false, "test"
        );
        Result<Report> result = service.add(expected);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldFindByVote() {
        List<Report> expected = repository.findByVote("test");
        List<Report> actual = service.getByVote("test");
        assertEquals(expected.size(), actual.size());
    }



}