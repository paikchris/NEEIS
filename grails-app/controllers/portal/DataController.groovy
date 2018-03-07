package portal

import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

class DataController {
    def jsonSlurper = new JsonSlurper()
    JsonOutput jsonOutput = new JsonOutput()
    def jsonBuilder = new JsonBuilder()

    def index() { }

    def saveQuestion(){
        log.info "CREATING NEW QUESTION RECORD"
//        log.info params

        def renderMessage = "Success"

        try{
            def questionObject = jsonSlurper.parseText(params.question)

            //SEE IF QUESTION EXISTS
            Questions questionRecord = Questions.get(questionObject.id)

            if(questionRecord && questionRecord.size() > 0){
                //IF A RECORD WITH THE ID WAS FOUND, SAVE CHANGES

            }
            else{
                //IF QUESTION RECORD DOES NOT EXIST, SAVE NEW
                def newMap = [:]

                //LOOP OVER THE COLUMN NAMES
                Questions.declaredFields.each {
                    if (!it.synthetic) {
                        log.info it.name

                        //SEE IF THIS IS A COLUMN NAME THAT ALSO EXISTS IN THE JSON OBJECT
                        if( questionObject[it.name] != null ){
                            //IF IT EXISTS, ADD IT TO MAP TO BE SAVED
                            newMap[it.name] = questionObject[it.name]
                        }
                    }
                }

                log.info newMap
                //TODO: WORKING ON SAVE
                questionRecord = new Questions(newMap)

            }

            questionRecord.save(flush: true, failOnError: true)

        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        render renderMessage
    }

    def saveQuestionBACK(){
        log.info "CREATING NEW QUESTION RECORD"
        log.info params

        def renderMessage = "Success"

        try{
            def questionID = params.questionID
            def questionText = params.questionText
            def questionCategory = params.questionCategory

            Questions questionRecord = new Questions(
                    questionID: questionID,
                    questionText: questionText,
                    questionType: 'basicText',
                    category: questionCategory,
                    weight: 1000,
                    hiddenFlag: "N",
                    gridSize: "xs",
                    gridColumns: "3",
                    containerClass: "",
                    containerDataAttr: "",
                    containerStyle: "",
                    inputClass: "form-control questionAnswer showReview",
                    inputType: "text",
                    inputStyle: "",
                    inputDataAttr: "",
                    required: "N",
                    disabled: "N",
                    inputAddOnLeft: "N",
                    inputAddOnRight: "N",
                    inputButtonText: "",
                    inputAddOnText: "",
                    faIconLeft: "N",
                    faIconRight: "N",
                    faIconClass: "",
                    faIconStyle: "",
                    formGroupClass: "",
                    formGroupStyle: "",
                    formGroupDataAttr: "",
                    htmlCheckboxRadioValText: "",
                    htmlPlaceholder: "",
                    attachments: "N"
            )


            log.info questionRecord.containerClass
            questionRecord.save(flush: true, failOnError: true)

        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }
    }
}
