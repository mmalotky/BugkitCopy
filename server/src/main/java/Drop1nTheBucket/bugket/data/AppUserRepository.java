package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.AppUser;
import org.springframework.dao.DataAccessException;

public interface AppUserRepository {

    AppUser findByUsername(String username);

}
