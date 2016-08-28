package portal

class AuthController {

    def index() {
    }
    def register() {
        log.info("REGISTER PAGE");
    }
    def registerUser(){
        log.info("REGISTERING USER")
        log.info params;

        def userRole = "Broker";
        def error = false;
        User u;
        try{
            u = new portal.User(userRole:userRole, email:params.email, password:params.password,
                    company:params.company, firstName: params.firstName, lastName: params.lastName,)
            u.save(flush: true, failOnError: true)


        }
        catch(Exception e){
            error=true;
            log.info(e)
            if(User.findWhere(email:params.email) ){
                log.info("User with that email already exists.")
            }
            redirect(controller:'auth', action:'register')
        }

        if(error==false){
            session.user = u
            log.info(u)

            redirect(controller:'main', action:'index')
        }

    }

    def check(){
        print params
        print "Checking Session"
        print "Session = " + session.user

        if(!session.user){
            //i.e. user not logged in

                redirect(controller:'auth', action:'login')
                return false


        }
        else{
            return true;
        }
    }

    def login(){
        log.info("LOGGING IN")
        log.info(params)

        def user = User.findWhere(email:params.email, password:params.password)


        session.user = user
        log.info(user)

        if (user){
            log.info "Logged In"
            redirect(controller:'main',action:'index')

        }
        else{
            log.info "Log In Fail"
            redirect(controller:'auth',action:'index')
        }




    }
    def logout(){
        println "LOGOUT"
        session.user = null;
        redirect(url: "/")
    }
}
