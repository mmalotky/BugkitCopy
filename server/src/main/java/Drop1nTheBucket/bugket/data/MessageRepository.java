package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.Message;

import java.util.List;

public interface MessageRepository {

    List<Message> findAllForReport(int reportId);

    Message create(Message message);

    boolean deleteMessage(int messageId);
}
