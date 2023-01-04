package Drop1nTheBucket.bugket.domain;

import Drop1nTheBucket.bugket.data.AppUserRepository;
import Drop1nTheBucket.bugket.models.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AppUserServiceTest {

    @Autowired
    AppUserService service;

    @MockBean
    AppUserRepository repository;

    @Test
    void findByUsername() {
        AppUser expected = (AppUser) service.loadUserByUsername("test");
        when(repository.findByUsername("test")).thenReturn(expected);
    }
}