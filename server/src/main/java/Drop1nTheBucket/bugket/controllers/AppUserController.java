package Drop1nTheBucket.bugket.controllers;

import Drop1nTheBucket.bugket.domain.AppUserService;
import Drop1nTheBucket.bugket.domain.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AppUserController {
    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PutMapping("/update_user/{username}/{newRole")
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
