package Drop1nTheBucket.bugket.domain;

import Drop1nTheBucket.bugket.data.AppUserRepository;
import Drop1nTheBucket.bugket.models.AppUser;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository){
        this.appUserRepository = appUserRepository;
    }

    public AppUser findByUsername(String username){
        return appUserRepository.findByUsername(username);
    }

}
