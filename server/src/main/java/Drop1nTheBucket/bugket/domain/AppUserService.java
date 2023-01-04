package Drop1nTheBucket.bugket.domain;

import Drop1nTheBucket.bugket.data.AppUserRepository;
import Drop1nTheBucket.bugket.models.AppUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserService implements UserDetailsService {


    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository){
        this.appUserRepository = appUserRepository;
    }

    @Override
    public AppUser loadUserByUsername(String username) throws UsernameNotFoundException{
        return appUserRepository.findByUsername(username);
    }

}
