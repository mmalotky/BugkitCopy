package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.Report;

import java.util.List;

public interface ReportRepository {
    List<Report> findAll();

    List<Report> findIncomplete();
}
