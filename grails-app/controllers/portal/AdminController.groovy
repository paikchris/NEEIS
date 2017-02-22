package portal

class AdminController {

    def beforeInterceptor = [action: this.&checkUser]


    def checkUser() {
        println "CHECK USER"
        println params
        AuthController ac = new AuthController()
        def test = ac.check()

        //println "TEST WASSSSS " + session.user;
        if(session.user.admin == "true"){
            //user is admin
        }
        else{
            redirect(controller:'main', action:'index')
        }

    }

    def index() {

        [user: session.user ]
    }
    def data() {
        log.info "DATA MANAGEMENT"
        log.info params



        [user: session.user ]
    }

}
