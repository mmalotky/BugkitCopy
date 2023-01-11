package Drop1nTheBucket.bugket.domain;

import Drop1nTheBucket.bugket.data.MessageRepository;
import Drop1nTheBucket.bugket.models.Message;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository repository;

    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }

    public List<Message> findAll(int reportId) {
        return repository.findAllForReport(reportId);
    }

    public Result<Message> add(Message message) {
        Result<Message> result = validate(message);

        if (result.isSuccess()) {
            repository.create(message);
            result.setPayload(message);
        }
        return result;
    }

    public Result<Void> delete(int messageId) {
        Result<Void> result = new Result<>();

        boolean success = repository.deleteMessage(messageId);
        if(!success) {
            result.addMessage(ActionStatus.INVALID, "Failed to delete message");
            return result;
        }
        return result;
    }


    private Result<Message> validate(Message message) {
        Result<Message> result = new Result<>();
        if (message == null) {
            result.addMessage(ActionStatus.INVALID, "Message cannot be null");
        }
        if(message.getMessage() == null) {
            result.addMessage(ActionStatus.INVALID, "Message text cannot be null");
        }
        return result;
    }
}
