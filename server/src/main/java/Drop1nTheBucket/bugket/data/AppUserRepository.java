package Drop1nTheBucket.bugket.data;

import Drop1nTheBucket.bugket.models.AppUser;

import java.util.List;

public interface AppUserRepository {

    List<AppUser> findAll();

    AppUser findByUsername(String username);

    AppUser create(AppUser user);

    boolean editUserRole(String username, String newRole);

    List<String> getRolesList();
}
