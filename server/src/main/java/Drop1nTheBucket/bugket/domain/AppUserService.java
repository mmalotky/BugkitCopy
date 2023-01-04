package Drop1nTheBucket.bugket.domain;

import Drop1nTheBucket.bugket.data.AppUserRepository;
import Drop1nTheBucket.bugket.models.AppUser;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {


    private final AppUserRepository appUserRepository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepository appUserRepository, PasswordEncoder encoder){
        this.appUserRepository = appUserRepository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        AppUser appUser = appUserRepository.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username = " not found");
        }
        return appUser;
    }

    public Result<AppUser> create(String username, String password) {
        Result<AppUser> result = validate(username, password);
        if (!result.isSuccess()) {
            return result;
        }

        password = encoder.encode(password);

        AppUser appUser = new AppUser(0, username, password, true, List.of("User"));

        try {
            appUser = appUserRepository.create(appUser);
            result.setPayload(appUser);
        } catch (DuplicateKeyException ex) {
            result.addMessage(ActionStatus.INVALID, "The provided username already exists");
        }
        return result;
    }

    private Result<AppUser> validate(String username, String password) {
        Result<AppUser> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addMessage(ActionStatus.INVALID, "username is required");
            return result;
        }

        if (password == null) {
            result.addMessage(ActionStatus.INVALID, "password is required");
            return result;
        }

        if (username.length() > 100) {
            result.addMessage(ActionStatus.INVALID, "username must be less than 100 characters");
        }
        return result;
    }

}
