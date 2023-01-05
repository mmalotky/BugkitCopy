package Drop1nTheBucket.bugket.domain;

import Drop1nTheBucket.bugket.data.AppUserRepository;
import Drop1nTheBucket.bugket.data.AppUserRepositoryDouble;
import Drop1nTheBucket.bugket.models.AppUser;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppUserServiceTest {

    AppUserRepository repository = new AppUserRepositoryDouble();
    AppUserService service = new AppUserService(repository, new BCryptPasswordEncoder());

    @Test
    void shouldFindAllAppUsers(){
        List<AppUser> expected = repository.findAll();
        List<AppUser> actual = service.getAllAppUsers();
        assertEquals(expected.size(), actual.size());
    }


    @Test
    void shouldFindByUsername() {
        List<String> userRole = new ArrayList<>();
        userRole.add("USER");
        AppUser expected = new AppUser("test","$2a$10$7JquBL6mi2OO85djCq4jUecR/aKurpmW8Niv1ohxNtoJdoNZPrcKK", true, userRole);
        AppUser actual = (AppUser) service.loadUserByUsername("test");
        assertEquals(expected.getUsername(), actual.getUsername());
    }

    @Test
    void shouldCreate(){

    }

}