package portal

import groovy.sql.Sql
import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.URLENC
import portal.DAO.*

class UserController {

    def dataSource_aim
    def bcryptService
    AIMSQL aimDAO = new AIMSQL();
    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'

    def resetPassword() {
        log.info("#user.resetPassword params: " + params)
        def user = User.findByEmail(params.email);
        def token = Token.findByValue(params.token);
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

    def update() {
        log.info("update action entered...");
        def user = User.findByEmail(session.user.email);
        try{
            def aimsql = new Sql(dataSource_aim)

            def now = new Date()
            def timestamp = now.format(dateFormat, timeZone)
            log.info("begin aimsql.execute update");
            aimsql.withTransaction {
                aimsql.execute "UPDATE taaNameMaster\n" +
                    "SET Name = '${params.firstName} ${params.lastName}',\n" +
                    "Phone = '${params.phoneNumber}'\n" +
                    "where NameKeyPK = ${user.aimContactID};"
                log.info("ending aim execute. begin aim commit.")
                aimsql.commit();
                log.info("ending aim commit");
            }
        }
        catch(Exception e){
            log.info("exception caught: " + e);
            redirect(controller:'main', action:'index', params: [registerError: "Update failed."]);
        }

        log.info("user: " + user + ", class: " + user.class);
        user.firstName = params.firstName;
        user.lastName = params.lastName;
        user.phoneNumber = params.phoneNumber;
        log.info("params: " + params);
        user.save(flush:true);
        def updatedUser = User.findByEmail(session.user.email);
        session.user = updatedUser;
        render "Account updated.";
    }
}      
