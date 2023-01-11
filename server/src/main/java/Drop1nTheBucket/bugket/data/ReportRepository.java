package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.Report;

import java.util.List;

public interface ReportRepository {
    List<Report> findAll();

    List<Report> findIncomplete();

    List<Report> findByUsername(String username);

    Report create(Report report);

    List<Report> findByVote(String username);

    boolean updateStatus(int id, boolean status);
}
