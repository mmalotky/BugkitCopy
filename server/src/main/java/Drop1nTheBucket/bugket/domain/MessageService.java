package Drop1nTheBucket.bugket.domain;

import Drop1nTheBucket.bugket.models.Message;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    public List<Message> getMessagesById(int reportId) {
        return null;
    }

    public Result<Message> add(Message message) {
        return null;
    }

    public Result<Void> delete(int messageId) {
        return null;
    }
}
