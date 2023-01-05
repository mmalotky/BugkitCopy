package Drop1nTheBucket.bugket.controllers;

import Drop1nTheBucket.bugket.domain.AppUserService;
import Drop1nTheBucket.bugket.domain.Result;
import Drop1nTheBucket.bugket.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AppUserController {

    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/users")
    public List<AppUser> findAll(){
        return appUserService.getAllAppUsers();
    }

    @PutMapping("/update_user/{username}/{newRole}")
    public ResponseEntity<?> updateUserRole(String username, String newRole) {
        Result<Void> result = appUserService.editUserRoleByUsername(username, newRole);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(getStatus(result));
    }

    private HttpStatus getStatus(Result<Void> result) {
        switch (result.getStatus()) {
            case INVALID:
                return HttpStatus.PRECONDITION_FAILED;
            case DUPLICATE:
                return HttpStatus.FORBIDDEN;
            case NOT_FOUND:
                return HttpStatus.NOT_FOUND;
        }
        return HttpStatus.NO_CONTENT;
    }

}
