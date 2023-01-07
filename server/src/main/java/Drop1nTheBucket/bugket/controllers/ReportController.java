package Drop1nTheBucket.bugket.controllers;

import Drop1nTheBucket.bugket.domain.ActionStatus;
import Drop1nTheBucket.bugket.domain.ReportsService;
import Drop1nTheBucket.bugket.domain.Result;
import Drop1nTheBucket.bugket.models.Report;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    ReportsService service;

    public ReportController(ReportsService service) {
        this.service = service;
    }

    @GetMapping
    public List<Report> getAll() {
        return service.getAll();
    }

    @GetMapping("/incomplete")
    public List<Report> getAllIncomplete() {
        return service.getAllIncomplete();
    }

    @GetMapping("/author/{username}")
    public List<Report> getByUsername(@PathVariable String username) {
        return service.getByUsername(username);
    }

    @GetMapping("/voted/{username}")
    public List<Report> getByVote(@PathVariable String username) {
        return service.getByVote(username);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Report report) {
        Result<Report> result = service.add(report);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}/{status}")
    public ResponseEntity<?> updateStatus(@PathVariable int id, @PathVariable boolean status) {
        Result<Void> result = service.updateStatus(id, status);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
    }
}
