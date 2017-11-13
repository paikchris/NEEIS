package portal

import grails.test.mixin.TestFor
import spock.lang.Specification


@TestFor(SimpleController)

@Mock([User])
class SimpleControllerSpec extends Specification {


    def setup() {

        log.info "******* SIMPLE TESTING ****"
    }

    def cleanup() {
    }

    void "test INDEX with input ONE"() {

        given:
        def sample = new SimpleController();

        when:
        sample.index(1)

        then:
        sample.testString == "**** INPUT 2 PASSED ***";
    }

    void "test INDEX with input TWO"() {

        given:
        def sample = new SimpleController();

        when:
        sample.index(2)

        then:
        sample.testString == "**** INPUT 2 FAIL ***";
    }

    void "test USER_VERIF with email input"() {
        given:
        def sample = new SimpleController();
        String email = "carolinnem@outlook.com";

        when:
        sample.emailVerif(email);

        then:
        sample.testEmail == "existing";
    }
}
