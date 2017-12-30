package portal

class UserController {

    def dataSource_aim
    def bcryptService

    def resetPassword() {
        log.info("#user.resetPassword params: " + params)
        def user = User.findByEmail(params.email);
        def token = Token.findByValue(params.token);
        log.info(user);
        log.info(token);
        if(user && token) {
            log.info("user and token present");
            user.password = params.password.encodeAsBcrypt();
            user.save(flush:true);
            token.delete(flush:true);
            redirect(controller: "auth", action: "login", params: [email: params.email, password: params.password]);  
        } else {
            flash.error = "There was a problem.";
            log.info(flash.error + ": redirecting to auth/forgotPassword");
            redirect(controller:"auth",action:"forgotPassword");
        }
    }

}
