package portal

import grails.test.mixin.TestMixin
import grails.test.mixin.TestFor
import grails.test.mixin.support.GrailsUnitTestMixin
import spock.lang.Specification
import sun.security.krb5.internal.AuthContext

import org.slf4j.Logger
import org.slf4j.LoggerFactory


/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
//@TestMixin(GrailsUnitTestMixin)
@TestFor(AuthController)
class AuthControllerSpec extends Specification {

    Logger log = LoggerFactory.getLogger(AuthControllerSpec)



    def setup() {
        //AuthController aController = new AuthController()
        log.info "******* IN THE SETUP() *******"
    }

    def cleanup() {
    }

    void "test existing user Aim/Online"() {

        when:
        controller.registerUser()
        controller.email  = "andee@neeis.com"

        then:
        log.info "******* EXISTING USER AIM/WEB *******"
        controller.userExistsInAIM == true
        controller.registerError == "User with that email already exists" //in the Aim

    }

    void "test existing non-user Aim/Online"() {

        when:
        controller.registerUser()
        controller.email  = "carolinne@neeis.com"

        then:
        controller.userExistsInAIM == false
        controller.u != null
        controller.registerError != "User with that email already exists"

    }

    void "test existing non-user Online"() {

        when:
        controller.registerUser()
        controller.email  = "pheonix@hrh.com"

        then:
        controller.userExistsInAIM == false
        controller.u != null
        controller.registerError != "User with that email already exists"

    }
}



