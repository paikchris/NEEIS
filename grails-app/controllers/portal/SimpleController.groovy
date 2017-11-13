package portal

import portal.User


class SimpleController {

    String testString;
    String testEmail;
    LessSimpleController less;

    SimpleController() {
        testString = "";
        testEmail = "not tested";
        less  = new LessSimpleController();
    }

    def index(int input) {
        if (input == 1) {
            int out  =  input + less.numOne;
            testString = "**** INPUT " + out + " PASSED ***"
        }
        else {
            testString = "**** INPUT " + input + " FAIL ***"
        }
    }

    def emailVerif(String em) {
        def userRecord = User.findAllByEmail(em)
        log.info '******* I AM HERE'
        log.info(User.list().size())
        if (userRecord.size() != 0) {
            testEmail = "existing";
        }
        else {
            testEmail = "non-existing";
        }
    }
}
