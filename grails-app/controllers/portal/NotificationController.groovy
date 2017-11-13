package portal

import grails.util.Environment
import groovy.xml.*
import net.sf.json.JSON
import org.apache.commons.lang.StringUtils
import wslite.soap.*
import wslite.http.auth.*
import com.google.gson.JsonObject
import com.google.gson.Gson
import groovy.sql.Sql
import helper.Utils;
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import groovy.json.JsonBuilder
import java.text.DecimalFormat
import portal.DAO.*
import java.text.SimpleDateFormat;
import java.text.NumberFormat;
import org.apache.commons.net.ftp.FTPClient
import org.apache.commons.net.ftp.FTP;
import sun.misc.BASE64Decoder;
import portal.Utils.FileTransferHelper;
import portal.Utils.TestDataHelper;
import portal.Utils.ProductHelper;
import portal.Utils.GORMHelper;
import portal.Utils.Email;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.StringEscapeUtils;

class NotificationController {
    def jsonSerial
    def dataSource_aim
    def mailService
    def beforeInterceptor = [action: this.&checkUser]
    def grailsLinkGenerator
    def AIMDBService
    def notificationService

    def jsonSlurper = new JsonSlurper()
    def jsonOutput = new JsonOutput()

    def checkUser() {
        println "CHECK USER"
        println params
        AuthController ac = new AuthController()
        def isLoggedIn = ac.checkAJAXRequest()

        if (isLoggedIn) {
        } else {
            render "Session Expired," + grailsLinkGenerator.serverBaseURL + "/auth/login"



            return false
        }
    }

    ////////////////////////WEB SERVICE CALL FUNCTIONS FROM BROWSER////////////////////////
    //GETS THE CURRENT SESSION USER NOTIFICATIONS AND SENDS IT AS RESPONSE TO THE BROWSER
    def getNotificationMap() {
        log.info "RETRIEVING NOTIFICATIONS WEB SERVICE"
        log.info params

        render notificationService.getNotificationMap(params, session.user.id)
    }

    //WEB SERVICE TO ADD A NEW NOTIFICATION FOR CURRENT SESSION USER
    def addNewNotification() {
        log.info "ADDING NEW NOTIFICATION"
        log.info params

        render notificationService.addNewNotification(params.notificationCode, session.user.id)

    }

    //WEB SERVICE TO MARK NOTIFICATIONS IDS IN PARAMS ARRAY AS VIEWED
    def markNotificationsAsViewed(){
        log.info "MARKING NOTIFICATIONS AS VIEWED"
        log.info params
        try {
        //1. GET THE CURRENT USER RECORD
        def userID = session.user.id
        //2. GET THE USER NOTIFICATIONS ARRAY
        User userRecord = User.get(userID)
        //GET THE NOTIFICATION MAP FROM THE USER RECORD, CONVERT IT FROM JSON STRING FORMAT TO A GROOVY MAP
        def notificationArray = jsonSlurper.parseText(userRecord.notificationMap)



        def notificationUniqueIDJsonArray = params.notificationUniqueIDArray

        //3. MAKE SURE USER NOTIFICATIONS ARRAY IS A GROOVY ARRAY, NOT A JSON ARRAY STRING
        def notificationIDsToMarkViewedArray = jsonSlurper.parseText(notificationUniqueIDJsonArray)

        //4. LOOP THROUGH THE USER NOTIFICATIONS ARRAY
        notificationArray.each {
            //5. IF THE notificationIDsToMarkViewedArray ARE IN THE USER NOTIFICATIONS ARRAY, CHANGE THE NOTIFICATION TO VIEWED = 'Y'
            if (notificationArray.notificationID == notificationUniqueIDJsonArray) {
                notificationArray.viewed = "Y"
            }
        }

        //6. SAVE BACK TO USER RECORD
        //7. SAVE USER RECORD TO DATABASE
        userRecord.notificationArray = notificationArray
        userRecord.save(flush: true, failOnError: true)


        }
        catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

        render renderMessage

        //FINISH THE CODE
        //1. GET THE CURRENT USER RECORD
        //2. GET THE USER NOTIFICATIONS ARRAY
        //3. MAKE SURE USER NOTIFICATIONS ARRAY IS A GROOVY ARRAY, NOT A JSON ARRAY STRING
        //4. LOOP THROUGH THE USER NOTIFICATIONS ARRAY
        //5. IF THE notificationIDsToMarkViewedArray ARE IN THE USER NOTIFICATIONS ARRAY, CHANGE THE NOTIFICATION TO VIEWED = 'Y'
        //6. SAVE BACK TO USER RECORD
        //7. SAVE USER RECORD TO DATABASE
    }



    ////////////////////////REGULAR NOTIFICATION FUNCTIONS////////////////////////
    def addNewNotification1(notificationCode){
        //GET NOTIFICATION TEXT FOR CODE FROM DATABASE
        NotificationCodes notificationRecord = NotificationCodes.findByCode(notificationCode)

        //BUILD THE NOTIFICATION MAP TO ADD TO ARRAY
        def notificationMap = [:]
        notificationMap.notificationID = generateUniqueID()
        notificationMap.code = notificationRecord.code
        notificationMap.displayText = notificationRecord.displayText
        notificationMap.viewed = "N"

        //GET THE USER ID OF THE USER LOGGED IN
        def userID = session.user.id

        //FIND THE USER RECORD IN MYSQL DATABASE
        User userRecord = User.get(userID)

        //GET THE NOTIFICATION MAP FROM THE USER RECORD, CONVERT IT FROM JSON STRING FORMAT TO A GROOVY MAP
        def notificationArray = jsonSlurper.parseText(userRecord.notificationMap)

        //SAVE THE NOTIFICATION ARRAY BACK TO USER RECORD IN DB
        userRecord.notificationMap = notificationArray
        userRecord.save(flush: true, failOnError: true)
    }


    def generateUniqueID() {
        return Math.abs(new Random().nextInt() % 9999999999) + 1
    }

}
