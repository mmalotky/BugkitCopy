package Drop1nTheBucket.bugket.data;

import java.util.ArrayList;
import java.util.List;

public class VoteRepositoryDouble implements VoteRepository {
    @Override
    public List<String> checkVoters(int reportId) {
        ArrayList<String> voters = new ArrayList<>();
        voters.add("admin");
        return voters;
    }

    @Override
    public boolean addVote(String username, int reportId) {
        return true;
    }

    @Override
    public boolean deleteVote(String username, int reportId) {
        return true;
    }
}
