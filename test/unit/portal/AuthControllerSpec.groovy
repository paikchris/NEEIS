package portal

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification


@TestFor(AuthController)
@Mock([User])
class AuthControllerSpec extends Specification {

    void "TESTING VALID LOGIN " (){

        setup:
        user.save()
        controller.params.email = "carolinnem@outlook.com";
        controller.params.password = "password";

        when:
        request.method = 'POST';
        controller.login();

        then:
        response.redirectUrl != null;
        response.redirectedUrl == "/main/newSubmission";

        where:
        user = new User(firstName:"Carolinne",
                        lastName: "Mesquita",
                        email: "carolinnem@outlook.com",
                        password: "password",
                        userRole: "Underwriter");

    }

    void "TESTING INVALID LOGIN " (){

        setup:
        user.save()
        controller.params.email = "carolinnem@neeis.com";
        controller.params.password = "password";

        when:
        request.method = 'POST';
        controller.login();

        then:
        response.redirectUrl != null;
        response.redirectedUrl == "/auth/index";

        where:
        user = new User();

    }

    void "TESTING LOGOUT" (){

        when:
        controller.logout();

        then:
        response.redirectUrl == "/";
    }

    void "TESTING CHECK EXISTING EMAIL" (){ // not working
        setup:
        user.save()
        controller.params.email = "carolinnem@outlook.com";

        when:
        request.method = 'POST';
        controller.checkEmail();

        then:
        response.text == "Error:User with that email already exists.";

        where:
        user = new User(firstName:"Carolinne",
                lastName: "Mesquita",
                email: "carolinnem@outlook.com",
                password: "password",
                userRole: "Underwriter");
    }

    void "TESTING CHECK NON-EXISTING EMAIL" (){ // not working
        setup:
        user.save()
        controller.params.email = "carolinnem@neeis.com";

        when:
        request.method = 'POST';
        controller.checkEmail();

        then:
        response.text == "OK:Email/Username is available";

        where:
        user = new User();
    }
}



