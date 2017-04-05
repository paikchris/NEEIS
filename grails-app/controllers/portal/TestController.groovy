package portal

import groovy.sql.Sql
import helper.Utils;
import portal.DAO.*

class TestController {

    def beforeInterceptor = [action: this.&checkUser]
    def dataSource_aim
    AIMSQL aimDAO = new AIMSQL();  

    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'

    def checkUser() {
        println "CHECK USER"
        println params
        AuthController ac = new AuthController()
        def test = ac.check()

        //println "TEST WASSSSS " + session.user;

    }
    def SpecRunner(){
        [user: session.user]
    }


}