package Drop1nTheBucket.bugket.domain;

import Drop1nTheBucket.bugket.data.ReportRepository;
import Drop1nTheBucket.bugket.data.ReportRepositoryDouble;
import Drop1nTheBucket.bugket.models.Report;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ReportsServiceTest {

    ReportRepository repository = new ReportRepositoryDouble();
    ReportsService service = new ReportsService(repository);

    @Test
    void shouldFindAll() {
        List<Report> expected = repository.findAll();
        List<Report> actual = service.getAll();
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void shouldFindIncomplete() {
        List<Report> expected = repository.findIncomplete();
        List<Report> actual = service.getAllIncomplete();
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void shouldFindByUsername() {
        List<Report> expected = repository.findByUsername("test");
        List<Report> actual = service.getByUsername("test");
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void shouldCreate() {
        Report expected = new Report(
                "Ate my homework", "The program deleted my file", "Save a Word document at any time",
                LocalDate.of(2022, 03, 13), false, "test"
        );
        Result<Report> result = service.add(expected);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotCreateNull() {
        Report report = new Report(
                null, null, null,
                null, false, null
        );
        Result<Report> result = service.add(report);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotCreateWithNullTitle() {
        Report report = new Report(
                null, "The program deleted my file", "Save a Word document at any time",
                LocalDate.of(2022, 03, 13), false, "test"
        );
        Result<Report> result = service.add(report);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldNotCreateWithNullIssueDescription() {
        Report report = new Report(
                "Ate my homework", null, "Save a Word document at any time",
                LocalDate.of(2022, 03, 13), false, "test"
        );
        Result<Report> result = service.add(report);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }
    @Test
    void shouldNotCreateWithNullReplicationInstructions() {
        Report report = new Report(
                "Ate my homework", "The program deleted my file", null,
                LocalDate.of(2022, 03, 13), false, "test"
        );
        Result<Report> result = service.add(report);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }
    @Test
    void shouldNotCreateWithNullAuthor() {
        Report report = new Report(
                "Ate my homework", "The program deleted my file", "Save a Word document at any time",
                LocalDate.of(2022, 03, 13), false, null
        );
        Result<Report> result = service.add(report);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldNotCreateWithInvalidTitle() {
        Report report = new Report (
                "Aqxiaaxdlmtcechwmmtipmsvhvuvlmpthbdzzqcgjsidjlckyjctztuuzzzmyzcrvuvjcygjhqooxwhbrtmxqewsrrzwmozjyjvljn",
                "The program deleted my file", "Save a Word document at any time",
                LocalDate.of(2022, 03, 13), false, "test"
        );
        Result<Report> result = service.add(report);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldNotCreateWithInvalidIssueDescription() {
        Report report = new Report(
                "Test", "arqnynrcqezptztbgalaolqaipmddxperkgfndcxgokcjxyjcayqzuwejnavtrbwgyhclsqvuwderg" +
                "wsbamjcnfzahmegpqijwkmschzuzfvdavojailurgyhorxslpzbmfrftkzwqyhnmgilozezaviaqccbfwwwmvofkdjhllstjdalrcts" +
                "wdcjgbzagqhiphjttsnbthggghbwzgqplalpppmajtmrdhajeadvimxlqhcgdbrlfpojezzavqyellgvtbxqbolkumfjzbsdjxcrsycv" +
                "tvgjrmiopstpbgvoikbollkrvlymdgrcbpganmsfpeqcrfdnwsxfmjlzosucysoixunlomzqheohtlrtvpgdcmvxdqmdyenjylkvxoj" +
                "doxklejxxzzbsewmulvdxuonrxtzwxqikkcvywgeadinrjmlfujzysewntmrasbjqgkwxltkrcyhbtapnpmeeaxqbxzdzigzdxjhmgn" +
                "fpodoyulywoaywntxtmbsjgqfxfnwmlaunbzppndevtplfethjiqffsqbmhvhrzrepgmfmsyanhnjwkdipabwtlgnoklkhzvtckvamer" +
                "ampfplabpslmqplrynkoyfizcdrmdsctycamwmaepymvwnrvxqowjqphfptqugrgjxsymhscplqdsrfhwrynqisdlfwaboqrbmbvfpam" +
                "ifumtomheywzubfzmzetmulnucdfctnymfpunbszmfsmezvbyrbmxllctnotbzdmonqweqkwhztlzovqroaiutncxpsmilbzsvzklhnb" +
                "nufalsgoxfoockkukfsvkvbssovhvcavhnsfejkvcsjrywhtouyzzndlqylebioaohsgnqmiiagdtvxdosmyqqiafxxpzciaccjualf" +
                "xadhlqtevwqbhhfoziqogpmlqkilzweqbhgehzgzdorplboxceauwmvveuubnfjxrunbpnjkeoprxqjudteppdmtkwocacrpxdzsbcq" +
                "lopyxyuafgljorlu",
                "Save a Word document at any time",
                LocalDate.of(2022, 03, 13), false, "test"
        );
        Result<Report> result = service.add(report);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldNotAddWithInvalidReplicationInstructions() {
        Report report = new Report(
                "Test", "The program deleted my file","arqnynrcqezptztbgalaolqaipmddx" +
                "perkgfndcxgokcjxyjcayqzuwejnavtrbwgyhclsqvuwderg" +
                "wsbamjcnfzahmegpqijwkmschzuzfvdavojailurgyhorxslpzbmfrftkzwqyhnmgilozezaviaqccbfwwwmvofkdjhllstjdalrcts" +
                "wdcjgbzagqhiphjttsnbthggghbwzgqplalpppmajtmrdhajeadvimxlqhcgdbrlfpojezzavqyellgvtbxqbolkumfjzbsdjxcrsycv" +
                "tvgjrmiopstpbgvoikbollkrvlymdgrcbpganmsfpeqcrfdnwsxfmjlzosucysoixunlomzqheohtlrtvpgdcmvxdqmdyenjylkvxoj" +
                "doxklejxxzzbsewmulvdxuonrxtzwxqikkcvywgeadinrjmlfujzysewntmrasbjqgkwxltkrcyhbtapnpmeeaxqbxzdzigzdxjhmgn" +
                "fpodoyulywoaywntxtmbsjgqfxfnwmlaunbzppndevtplfethjiqffsqbmhvhrzrepgmfmsyanhnjwkdipabwtlgnoklkhzvtckvamer" +
                "ampfplabpslmqplrynkoyfizcdrmdsctycamwmaepymvwnrvxqowjqphfptqugrgjxsymhscplqdsrfhwrynqisdlfwaboqrbmbvfpam" +
                "ifumtomheywzubfzmzetmulnucdfctnymfpunbszmfsmezvbyrbmxllctnotbzdmonqweqkwhztlzovqroaiutncxpsmilbzsvzklhnb" +
                "nufalsgoxfoockkukfsvkvbssovhvcavhnsfejkvcsjrywhtouyzzndlqylebioaohsgnqmiiagdtvxdosmyqqiafxxpzciaccjualf" +
                "xadhlqtevwqbhhfoziqogpmlqkilzweqbhgehzgzdorplboxceauwmvveuubnfjxrunbpnjkeoprxqjudteppdmtkwocacrpxdzsbcq" +
                "lopyxyuafgljorlu",

                LocalDate.of(2022, 03, 13), false, "test"
        );
        Result<Report> result = service.add(report);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldFindByVote() {
        List<Report> expected = repository.findByVote("test");
        List<Report> actual = service.getByVote("test");
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void shouldUpdate() {
        boolean expected = repository.updateStatus(1, true);
        Result actual = service.updateStatus(1, true);
        assertEquals(expected, actual.isSuccess());
    }

    @Test
    void shouldNotUpdateWithInvalidId() {
        Result result = service.updateStatus(0, true);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

}