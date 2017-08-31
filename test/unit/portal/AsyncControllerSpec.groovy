package portal

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestFor(AsyncController)
class AsyncControllerSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "Setup Test"() {
        when:
        controller.hello()

        then:
        response.text == 'hello'
    }
}
