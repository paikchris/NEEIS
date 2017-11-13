package portal

import grails.util.Environment
import java.io.IOException;
import grails.transaction.Transactional
import grails.util.Holders
import groovy.json.JsonSlurper
import groovy.json.JsonOutput
import portal.Utils.FileTransferHelper

@Transactional
class NotificationService {
    def grailsApplication = Holders.grailsApplication
    def dataSource_aim
    def aimSqlService
    def mySqlService
    def dateTimeService
    def utilService
    def jsonOutput = new JsonOutput()
    def jsonSlurper = new JsonSlurper()

    ////////////////////////WEB SERVICE CALL FUNCTIONS FROM BROWSER////////////////////////
    def getNotificationMap(params, userID) {
        log.info "RETRIEVING NOTIFICATIONS WEB SERVICE"
        log.info params
        def renderMessage = ""

        try {

            //FIND THE USER RECORD IN MYSQL DATABASE
            User userRecord = User.get(userID)

            //GET THE NOTIFICATION MAP FROM THE USER RECORD, CONVERT IT FROM JSON STRING FORMAT TO A GROOVY MAP
            def notificationMap = jsonSlurper.parseText(userRecord.notificationMap)

            //ASSIGN THE NOTIFICATION MAP TO THE RENDER MESSAGE
            renderMessage = userRecord.notificationMap
        }
        catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

        return renderMessage
    }

    //WEB SERVICE TO ADD A NEW NOTIFICATION FOR CURRENT SESSION USER
    def addNewNotification(notificationCode, userID) {
        log.info "ADDING NEW NOTIFICATION"

        def renderMessage = "Success"

        try {
            //GET NOTIFICATION TEXT FOR NOTIFICATION CODE FROM DATABASE
            NotificationCodes notificationRecord = NotificationCodes.findByCode(notificationCode)

            //BUILD THE NOTIFICATION MAP TO ADD TO ARRAY
            def notificationMap = [:]
            notificationMap.notificationID = generateUniqueID()
            notificationMap.code = notificationRecord.code
            notificationMap.displayText = notificationRecord.displayText
            notificationMap.viewed = "N"

            //FIND THE USER RECORD IN MYSQL DATABASE
            User userRecord = User.get(userID)

            //GET THE NOTIFICATION MAP FROM THE USER RECORD, CONVERT IT FROM JSON STRING FORMAT TO A GROOVY MAP
            def notificationArray = jsonSlurper.parseText(userRecord.notificationMap)

            //ADD NOTIFICATION MAP TO NOTIFICATION ARRAY
            notificationArray << notificationMap



            //SAVE THE NOTIFICATION ARRAY BACK TO USER RECORD IN DB
            userRecord.notificationMap = jsonOutput.toJson(notificationArray)
            userRecord.save(flush: true, failOnError: true)
        }
        catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

        return renderMessage

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
    def addNewNotification(notificationCode){
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