package portal

class MainController {

    def beforeInterceptor = [action: this.&checkUser]


    def checkUser() {
        println "CHECK USER"
        println params
        AuthController ac = new AuthController()
        def test = ac.check()

        //println "TEST WASSSSS " + session.user;

    }

    def index() {

        [user: session.user ]
    }



    def newSubmission() {
        String[] operationTypes = ["sldfj", "slifjsdlkjf"];

        [user: session.user, operationTypes:operationTypes]
    }
}
