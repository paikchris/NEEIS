package portal

import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

class DataController {
    def jsonSlurper = new JsonSlurper()
    JsonOutput jsonOutput = new JsonOutput()
    def jsonBuilder = new JsonBuilder()

    def utilService

    def index() { }

    def saveQuestion(){
        log.info "CREATING NEW QUESTION RECORD"
        log.info params

        def renderMessage = "Success"

        try{
            def questionObject = jsonSlurper.parseText(params.question)

            //SEE IF QUESTION ID ALREADY IS TAKEN
            def questionIDCheck = Questions.findByQuestionID(params.questionID)

            if(questionIDCheck){
                //IF  QUESTION ID EXISTS
                renderMessage = "Question ID already exists"
            }
            else{
                //SEE IF DB ID IS TAKEN
                Questions questionRecord = Questions.get(questionObject.id)
                log.info questionRecord
                if(questionRecord == null ){
                    //IF QUESTION RECORD DOES NOT EXIST, SAVE NEW
                    def newMap = [:]

                    //LOOP OVER THE COLUMN NAMES
                    Questions.declaredFields.each {
                        if (!it.synthetic) {
                            //SEE IF THIS IS A COLUMN NAME THAT ALSO EXISTS IN THE JSON OBJECT
                            if( questionObject[it.name] != null ){
                                //IF IT EXISTS, ADD IT TO MAP TO BE SAVED
                                newMap[it.name] = questionObject[it.name]
                            }
                        }
                    }
                    questionRecord = new Questions(newMap)

                    questionRecord.save(flush: true, failOnError: true)

                }
            }
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        render renderMessage
    }

    def isQuestionIDUnique(){
        log.info "CHECKING QUESTION ID UNIQUENESS"
        log.info params

        def renderMessage = ""

        try{
            //SEE IF QUESTION EXISTS
            def questionRecord = Questions.findByQuestionID(params.questionID)

            if(questionRecord){
                //IF  QUESTION ID EXISTS
                renderMessage = "false"
            }
            else{
                renderMessage = "true"
            }


        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        render renderMessage
    }

    def refreshQuestions(){
        log.info "REFRESH QUESTIONS"
        log.info params

        List <Questions> questionResults = Questions.list()
        questionResults.sort{ it.weight }

        String questions = utilService.gormResultsToJSObject(questionResults)

        render questions
    }


    //TYPE AHEAD DATA
    def getRateCodesTypeahead(){
        List <Ratings> rateResults = Ratings.list()
        def renderArray = []
        def keys = ['id', 'description']


        //version 2
        rateResults.sort{ it.description }
        String rateCodes = utilService.gormResultsToJSObject(rateResults)

        log.info rateCodes
        render rateCodes
    }
    def getRateCode(){
        log.info params

        Ratings rateResults = Ratings.get(params.dbID)

        String results
        if(rateResults != null){
            results = utilService.gormResultsToJSObject(rateResults)
        }

        log.info results
        render results
    }
    def typeaheadData_Questions(){
        List <Questions> questionResults = Questions.list()

        questionResults.sort{ it.questionText }
        String results = utilService.gormResultsToJSObject(questionResults)

        log.info results
        render results
    }


}
