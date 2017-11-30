package portal

import grails.converters.JSON
import grails.util.Holders
import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import groovy.sql.Sql
import portal.DAO.AIMSQL
import portal.DAO.Intelledox
import portal.Utils.GORMHelper
import org.apache.commons.lang3.StringUtils


class AdminController {
    def beforeInterceptor = [action: this.&checkUser]
    def grailsApplication = Holders.grailsApplication


    //SERVICES
    def syncService
    def mySqlService
    def aimSqlService
    def utilService

    //DATA SOURCES
    def dataSource_aim

    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
    AIMSQL aimDAO = new AIMSQL();
    Intelledox intelledoxDAO = new Intelledox();
    GORMHelper gormHelper = new GORMHelper()
    def jsonSlurper = new JsonSlurper()
    JsonOutput jsonOutput = new JsonOutput()
    def jsonBuilder = new JsonBuilder()


    def checkUser() {
        println "CHECK USER"
        println params

        AuthController ac = new AuthController()
        def loggedIn = ac.check()

        if(loggedIn){
            if(session.user.admin == "true"){

            }
            else{
                redirect(controller:'main', action:'index')
            }

        }
        else
        {
            redirect(controller:'auth', action:'index')
        }

    }

    def index() {

        [user: session.user ]
    }

    def data(){
        log.info "DATA MANAGEMENT"
        log.info params

        def riskCategories = RiskCategory.list();
        def riskCategoryColumns = riskCategories[0].domainClass.persistentProperties*.name

        def riskTypes = RiskType.list();
        def subCategories = RiskType.findAllWhere(subCategoryFlag: "Y")

        def coverageClasses = Coverages.findAllByActiveFlag("Y");
        coverageClasses = coverageClasses.sort{ it.coverageName}

        def products = Products.findAllByActiveFlag("Y");
        products = products.sort{ it.coverage}
        def productCategories = Products.list().unique {it.coverage}

        List <Forms> forms = Forms.findAllWhere(activeFlag: "Y")
        String formsObject = utilService.gormResultsToJSObject(forms)


        [user: session.user, riskCategories:riskCategories, subCategories:subCategories, riskTypes:riskTypes, products:products,
         productCategories: productCategories, coverageClasses:coverageClasses, forms:formsObject]
    }

    def datab(){
        log.info "DATA MANAGEMENT"
        log.info params


        //PRODUCTS
        List <Products> productResults = Products.list()
        productResults.sort{ it.productID }
        String products = utilService.gormResultsToJSObject(productResults)

        //OPERATIONS
        List <Operations> operationResults = Operations.list()
        operationResults.sort{ it.description }
        String operations = utilService.gormResultsToJSObject(operationResults)


        //OPERATION CATEGORIES
        List operationCategoryResults = []
        operationResults.each{
            if( it.description.contains(" - ") ){
                def operationCategoryMap = [:]
                operationCategoryMap.operationID = it.operationID
                operationCategoryMap.description = it.description.split(" - ")[0].trim()

                operationCategoryResults << operationCategoryMap
            }
        }
        operationCategoryResults = operationCategoryResults.unique{ it.description }
        String operationCategories = new JsonBuilder(operationCategoryResults).toString()

        //COVERAGES
        List <Coverages> coverageResults = Coverages.list()
        coverageResults.sort{ it.coverageCode }
        String coverages = utilService.gormResultsToJSObject(coverageResults)

        //CONDITION BASIS
        List <Conditions> conditionBasisResults = Conditions.findAllByTypeInList(['basis', 'limitBasis'])
        log.info conditionBasisResults.description
        String conditionBasis = utilService.gormResultsToJSObject(conditionBasisResults)

        //CONDITION OPERATORS
        List <Conditions> conditionOperatorsResults = Conditions.findAllWhere(type: "operator")
        String conditionOperators = utilService.gormResultsToJSObject(conditionOperatorsResults)

        //QUESTIONS
        List <Questions> questionResults = Questions.list()

        questionResults.sort{ it.weight }
        log.info questionResults.weight
        String questions = utilService.gormResultsToJSObject(questionResults)

        //QUESTION CATEGORIES
        List <QuestionCategory> questionCategoryResults = QuestionCategory.list()
        questionCategoryResults.sort{ it.weight }
        log.info questionCategoryResults.weight
        String questionCategories = utilService.gormResultsToJSObject(questionCategoryResults)

        //RATING BASIS
        List <RatingBasis> ratingBasisResults = RatingBasis.list()
        ratingBasisResults.sort{ it.description }
        String ratingBasis = utilService.gormResultsToJSObject(ratingBasisResults)

        //RATES
        List <Rates> rateResults = portal.Rates.list()
        rateResults.sort { it.rateID }
        String rates = utilService.gormResultsToJSObject(rateResults)

        //COMPANY
        List <Company> companyResults = Company.list()
        String companies = utilService.gormResultsToJSObject(companyResults)

        //FORMS
        List <Forms> formResults = Forms.list()
        formResults.sort { it.formID }
        String forms = utilService.gormResultsToJSObject(formResults)




        [user: session.user, operations: operations,
         productResults:productResults, products:products,
         operationCategoryResults:operationCategoryResults, operationCategories:operationCategories,
         conditionBasisResults: conditionBasisResults, conditionBasis: conditionBasis, conditionOperatorsResults:conditionOperatorsResults,
         conditionOperators: conditionOperators,
         questionResults:questionResults, questions:questions,
         questionCategoryResults:questionCategoryResults, questionCategories:questionCategories,
         rateResults:rateResults, rates:rates, companyResults:companyResults, companies:companies, formResults:formResults, forms:forms,
         operationResults: operationResults, coverages: coverages, coverageResults: coverageResults, ratingBasisResults:ratingBasisResults, ratingBasis:ratingBasis ]
    }

    def uploadForm() {
        log.info params
        log.info "FORM ID ===== "  + params.formID

        def f = request.getFile('formFile')
        def formSavePath = servletContext.getRealPath("/docs/forms/${params.formID}.pdf")
        if (f.empty) {
            flash.message = 'file cannot be empty'
            render(view: 'uploadForm')
            return
        }
        f.transferTo(new File(formSavePath))
//        response.sendError(200, 'Done')
        render "Uploaded, Press back"
    }

    def syncAllWithDMU(){
        log.info "SYNCING WITH DMU"
        log.info params
        render syncService.syncAllWithDMU()
    }

    def checkSyncWithDMU(){
        log.info "CHECKING SYNC STATUS"
        log.info params
        render syncService.checkForUpdates()
    }


    //DATA ACCESS
    def refreshProducts(){
        log.info "REFRESH PRODUCTS"
        log.info params

        List <Products> productResults = Products.list()
        productResults.sort{ it.productID }
        String products = utilService.gormResultsToJSObject(productResults)

        render products
    }
    def refreshOperationCategories(){
        log.info "REFRESH OPERATION CATEGORIES"
        log.info params

        List <Operations> operationResults = Operations.list()
        List operationCategoryResults = []
        operationResults.each{
            if( it.description.contains(" - ") ){
                def operationCategoryMap = [:]
                operationCategoryMap.operationID = it.operationID
                operationCategoryMap.description = it.description.split(" - ")[0].trim()

                operationCategoryResults << operationCategoryMap
            }
        }
        operationCategoryResults = operationCategoryResults.unique{ it.description }
        String operationCategories = new JsonBuilder(operationCategoryResults).toString()

        render operationCategories
    }
    def refreshOperations(){
        log.info "REFRESH OPERATIONS"
        log.info params

        List <Operations> operationResults = Operations.list()
        operationResults.sort{ it.description }
        String operations = utilService.gormResultsToJSObject(operationResults)

        render operations
    }
    def refreshCoverages(){
        log.info "REFRESH COVERAGES"
        log.info params

        List <Coverages> coverageResults = Coverages.list()
        String coverages = utilService.gormResultsToJSObject(coverageResults)

        render coverages
    }
    def refreshConditionBasis(){
        log.info "REFRESH CONDITION BASIS"
        log.info params

        List <Conditions> conditionBasisResults = Conditions.findAllWhere(type: "basis")
        String conditionBasis = utilService.gormResultsToJSObject(conditionBasisResults)

        render conditionBasis
    }
    def refreshConditionOperators(){
        log.info "REFRESH CONDITION OPERATORS"
        log.info params

        List <Conditions> conditionOperatorsResults = Conditions.findAllWhere(type: "operator")
        String conditionOperators = utilService.gormResultsToJSObject(conditionOperatorsResults)

        render conditionOperators
    }
    def refreshQuestions(){
        log.info "REFRESH QUESTIONS"
        log.info params

        List <Questions> questionResults = Questions.list()
        questionResults.sort{ it.weight }

        String questions = utilService.gormResultsToJSObject(questionResults)

        render questions
    }
    def refreshQuestionCategories(){
        log.info "REFRESH QUESTIONS CATEGORIES"
        log.info params

        List <QuestionCategory> questionCategoryResults = QuestionCategory.list()
        questionCategoryResults.sort{ it.weight }
        log.info questionCategoryResults.weight
        String questionCategories = utilService.gormResultsToJSObject(questionCategoryResults)

        render questionCategories
    }
    def refreshRatingBasis(){
        log.info "REFRESH RATING BASIS"
        log.info params

        List <RatingBasis> ratingBasisResults = RatingBasis.list()
        ratingBasisResults.sort{ it.description }
        String ratingBasis = utilService.gormResultsToJSObject(ratingBasisResults)

        render ratingBasis
    }
    def refreshRates(){
        log.info "REFRESH RATES"
        log.info params

        List <Rates> rateResults = portal.Rates.list()
        rateResults.sort { it.rateID }
        String rates = utilService.gormResultsToJSObject(rateResults)

        render rates
    }
    def refreshCompanies(){
        log.info "REFRESH COMPANIES"
        log.info params

        List <Company> companyResults = Company.list()
        String companies = utilService.gormResultsToJSObject(companyResults)

        render companies
    }
    def refreshForms(){
        log.info "REFRESH FORMS"
        log.info params

        List <Forms> formResults = Forms.list()
        String forms = utilService.gormResultsToJSObject(formResults)

        render forms
    }

    def createOperationRecord(){
        render syncService.createOperation(params)
    }
    def saveOperationsChanges(){
        render syncService.saveOperationsChanges(params)
    }
    def deleteOperation(){
        render syncService.deleteOperation(params)
    }

    def createCoverage(){
        render syncService.createCoverage(params)
    }
    def saveCoverageChanges(){
        render syncService.saveCoverageChanges(params)
    }

    def createProductRecord(){
        log.info "CREATING NEW PRODUCT RECORD 1"
        log.info params


        def renderMessage = "Success"

        try{
            def productID = params.productID.toUpperCase()
            def productName = params.productName
            def coverageCode = params.coverageCode
            def companyID = params.companyID
            def productKey_PK = aimSqlService.getKeyFieldReferenceID()
            def activeFlag = params.activeFlag


            //CHECK AIMSQL FOR EXISTING PRODUCTID
            def results = aimSqlService.selectFromTableWhere("Product", "ProductID = '" + productID + "'")
            if(results.size() == 0){
                //SAVE CHANGES TO AIM
                aimSqlService.insertRecord("Product", [
                        ProductID: "'${productID}'",
                        Description: "'${productName}'",
                        CoverageID: "'${coverageCode}'",
                        CompanyID: "'${companyID}'",
                        ProductKey_PK: "'${productKey_PK}'",
                        ActiveFlag: "'${activeFlag}'"]
                )

                Products productRecord = new Products(
                        productID: productID,
                        productName: productName,
                        coverage: coverageCode,
                        rateCode: "NONE",
                        riskCompanyID: companyID,
                        activeFlag:activeFlag)
                productRecord.save(flush: true, failOnError: true)
            }
            else{
                throw new Exception("Product Already Exists")
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
    def saveProductChanges(){
        render syncService.saveProductChanges(params)
    }

    def createRateRecord(){
        log.info "CREATING NEW RATE RECORD"
        log.info params

        def renderMessage = "Success"

        try{
            def rateID = params.rateID.toUpperCase()
            def rateName = params.rateName
            def ratingBasis = params.ratingBasis

            Rates rateRecord = new Rates(
                    rateID: rateID,
                    rateCode: rateID,
                    description: rateName,
                    ratingBasis: ratingBasis)
            rateRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        render renderMessage
    }
    def saveRateChanges(){
        log.info "SAVING RATE CHANGES"
        log.info params

        def renderMessage = "Success"

        try{


            Rates rateRecord = Rates.findByRateID(params.rateID)

            rateRecord.rateID = params.rateID
            rateRecord.rateCode = params.rateID
            rateRecord.description = params.description
            rateRecord.rateBasis = params.rateBasis

            if(params.rateBasis == 'LIMIT'){
                def limitRateArray = jsonSlurper.parseText(params.limitRateAray)
                rateRecord.limitRateArray = jsonOutput.toJson(limitRateArray)
            }
            else if(params.rateBasis == 'BRACKET'){
                def bracketRateArray = jsonSlurper.parseText(params.bracketRateArray)
                rateRecord.bracketRateArray = jsonOutput.toJson(bracketRateArray)
                rateRecord.minPremium = params.minPremium
            }
            else if(params.rateBasis == 'FLAT'){
                rateRecord.flatAmount = params.flatAmount
            }
            else{
                rateRecord.rateValue = params.rateValue.toBigDecimal()
                rateRecord.minPremium = params.minPremium
            }

            rateRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

        render renderMessage
    }

    def createRatingBasisRecord(){
        log.info "CREATING NEW RATING BASIS RECORD"
        log.info params

        def renderMessage = "Success"

        try{
            def basisID = params.ratingBasisID.toUpperCase()
            def description = params.ratingBasisDescription

            RatingBasis rateRecord = new RatingBasis(
                    basisID: basisID,
                    description: description)
            rateRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        render renderMessage
    }
    def saveRatingBasisChanges(){
        log.info "SAVING RATING BASIS CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def requiredQuestions = jsonSlurper.parseText(params.requiredQuestions)


            RatingBasis ratingBasisRecord = RatingBasis.findByBasisID(params.basisID)

            ratingBasisRecord.basisID = params.basisID
            ratingBasisRecord.description = params.description
            ratingBasisRecord.requiredQuestions = jsonOutput.toJson(requiredQuestions)
            ratingBasisRecord.basisQuestionID = params.basisQuestionID

            ratingBasisRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

        render renderMessage
    }

    def createNewQuestion(){
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

        render renderMessage
    }
    def saveQuestionChanges(){
        log.info "SAVING QUESTION CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def questionMap = jsonSlurper.parseText(params.questionMap)

            Questions questionRecord = Questions.get(questionMap.id)

            questionRecord.questionID = questionMap.questionID
            questionRecord.questionType = questionMap.questionType
            questionRecord.questionText = questionMap.questionText
            questionRecord.category = questionMap.category

            questionRecord.weight = questionMap.weight
            questionRecord.hiddenFlag = questionMap.hiddenFlag
            questionRecord.gridSize = questionMap.gridSize
            questionRecord.gridColumns = questionMap.gridColumns
            questionRecord.containerClass = questionMap.containerClass
            questionRecord.containerDataAttr = questionMap.containerDataAttr
            questionRecord.containerStyle = questionMap.containerStyle
            questionRecord.inputClass = questionMap.inputClass
            questionRecord.inputType = questionMap.inputType
            questionRecord.inputStyle = questionMap.inputStyle
            questionRecord.inputDataAttr = questionMap.inputDataAttr
            questionRecord.required = questionMap.required
            questionRecord.disabled = questionMap.disabled
            questionRecord.inputAddOnLeft = questionMap.inputAddOnLeft
            questionRecord.inputAddOnRight = questionMap.inputAddOnRight
            questionRecord.inputButtonText = questionMap.inputButtonText
            questionRecord.inputAddOnText = questionMap.inputAddOnText
            questionRecord.faIconLeft = questionMap.faIconLeft
            questionRecord.faIconRight = questionMap.faIconRight
            questionRecord.faIconClass = questionMap.faIconClass
            questionRecord.faIconStyle = questionMap.faIconStyle
            questionRecord.formGroupClass = questionMap.formGroupClass
            questionRecord.formGroupStyle = questionMap.formGroupStyle
            questionRecord.formGroupDataAttr = questionMap.formGroupDataAttr
            questionRecord.htmlCheckboxRadioValText = jsonOutput.toJson(questionMap.htmlCheckboxRadioValText)
            questionRecord.htmlDataReviewName = questionMap.htmlDataReviewName
            questionRecord.htmlPlaceholder = questionMap.htmlPlaceholder
            questionRecord.attachments = questionMap.attachments

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
    def deleteQuestion(){
        log.info "DELETING QUESTION $params.questionID"
        log.info params


        def renderMessage = "Success"

        try{
            Questions questionRecord = Questions.findByQuestionID(params.questionID)
            questionRecord.delete(flush: true, failOnError: true)

            //LOOK FOR USAGES AND DELETE
            Operations allOperations = Operations.list()

            allOperations.each{
                def operationRecord = it

                operationRecord.underwriterQuestionsMap.replaceAll("\"${params.questionID}\",", "")


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

    def createNewQuestionCategory(){
        log.info "CREATING NEW QUESTION CATEGORY RECORD"
        log.info params

        def renderMessage = "Success"

        try{
            def categoryCode = params.categoryCode
            def categoryName = params.categoryName
            def weight = params.weight



            QuestionCategory questionCategoryRecord = new QuestionCategory(
                    categoryCode: categoryCode,
                    categoryName: categoryName,
                    coverageCategoryFlag: 'N',
                    weight: weight
            )

            questionCategoryRecord.save(flush: true, failOnError: true)

            QuestionCategory qid = QuestionCategory.findByCategoryCode(categoryCode)
            def dataid = qid.id

            renderMessage = renderMessage + ":" + dataid
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        render renderMessage
    }
    def saveQuestionCategoryChanges(){
        log.info "SAVING QUESTION CATEGORY CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            QuestionCategory questionCategory = QuestionCategory.get(params.questionCategoryID)

            def oldCategoryCode = questionCategory.categoryCode
            def oldCategoryName = questionCategory.categoryName

            questionCategory.categoryCode = params.questionCategoryCode
            questionCategory.categoryName = params.questionCategoryName

            questionCategory.save(flush: true, failOnError: true)

            //CHANGE QUESTIONS WITH THIS CATEGORY
            def questionRecords = Questions.findAllByCategory(oldCategoryCode)
            questionRecords.each{
                log.info it
                Questions thisQuestionRecord = it

                thisQuestionRecord.category = params.questionCategoryCode

                thisQuestionRecord.save(flush: true, failOnError: true)
            }


            renderMessage = renderMessage + ":" + oldCategoryCode

        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        render renderMessage
    }
    def saveQuestionOrganizationChanges(){
        log.info "SAVING QUESTION ORGANIZATION CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def questionCategoryArray = jsonSlurper.parseText(params.questionCategoryMap)
            def questionOrderArray = jsonSlurper.parseText(params.questionOrderMap)

            questionCategoryArray.each{
                def categoryID = it.id
                def categoryCode = it.code
                def categoryName = it.name
                def categoryWeight = it.weight

                QuestionCategory categoryRecord = QuestionCategory.get(categoryID)
                if(categoryRecord != null){
                    categoryRecord.categoryCode = categoryCode
                    categoryRecord.categoryName = categoryName
                    categoryRecord.weight = categoryWeight

                    categoryRecord.save(flush: true, failOnError: true)
                }

            }

            questionOrderArray.each{
                def id = it.id
                def questionID = it.questionID
                def categoryID = it.categoryID
                def weight = it.weight

                Questions questionRecord = Questions.get(id)

                if(questionRecord != null){
                    questionRecord.questionID = questionID
                    questionRecord.category = categoryID
                    questionRecord.weight = weight

                    questionRecord.save(flush: true, failOnError: true)
                }
            }

        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }


        render renderMessage
    }
    def deleteQuestionCategory(){
        log.info "DELETING QUESTION CATEGORHY $params.categoryID"
        log.info params


        def renderMessage = "Success"

        try{
            QuestionCategory categoryRecord = QuestionCategory.get(params.categoryID)
            categoryRecord.delete(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        render renderMessage
    }

    def saveFormChanges(){
        log.info "SAVING FORM CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def dataid = params.id
            def formID = params.formID
            def formName = params.formName

            Forms formRecord = Forms.get(dataid)

            if(formRecord != null){
                def oldFormID = formRecord.formID
                formRecord.formID = formID
                formRecord.formName = formName

                formRecord.save(flush: true, failOnError: true)

                if(oldFormID != formID){
                    renameFormFile(oldFormID, formID)
                }
            }
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

        render renderMessage
    }
    def renameFormFile(oldFileName, newFileName){
        def formFilePath = servletContext.getRealPath("/docs/forms/${oldFileName}.pdf")
        def newFilePath = servletContext.getRealPath("/docs/forms/${newFileName}.pdf")

        def renderMessage = "Success"
        //CHECK IF FILE EXISTS
        try{
            def oldFile = new File(formFilePath)
            if(oldFile.exists()){
                oldFile.renameTo newFilePath
            }
            else{
                renderMessage = "File doesn't exist"
            }

        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

        return renderMessage
    }

    def importCoverageClassesFromAIM(){
        render syncService.importFromAIM_Coverages()

    }

    def importProductsFromAIM(){
        //Imports Products from AIM that don't exist on the website yet
        log.info "IMPORT PRODUCTS"
        log.info params

        def results = aimDAO.selectAllFromTableWithFormatting("Product", dataSource_aim)

        def productRecord
        results.each{
            productRecord = Products.findByProductID(it.ProductID)
            def productID = it.ProductID
            if(productRecord == null){
                //LOOP THROUGH ALL FORMS TO BUILD FORM LIST ARRAY
                def allFormsForProduct = it.Endorse
                def formIDArray = []
                allFormsForProduct.split('\n').each{
                    if(StringUtils.countMatches(it, ' - ') >= 1){
                        def formID = it.split(' - ')[0]

                        formIDArray.push(formID)
                    }
                }

                //LOOP THROUGH ALL COVERAGE LIMITS
                def limitString = it.Limits
                def deductString = it.Deduct

                limitString.split("\\r\\n|\\n|\\r").each{
                    if(it.trim().size() > 0 && it.split("\t").size() > 1){
                        //GET LIMIT DETAILS
                        log.info it
                        def limitVal = it.split("\t")[0]
                        def limitName = it.split("\t")[1]
                        limitName = limitName.substring(limitName.indexOf(':') + 1)

                        //GET DEDUCT DETAILS IF DEDUCT EXISTS for LIMITNAME
                        def deductVal = ""
                        def deductName = ""

                        deductString.split("\\r\\n|\\n|\\r").each{
                            if(it.trim().size() > 0 && it.split("\t").size() > 1){
                                deductName = it.split("\t")[1]
                                deductName = deductName.substring(deductName.indexOf(':') + 1)
                                if(deductName == limitName){
                                    deductVal = it.split("\t")[0]
                                }
                                else{
                                    deductVal=""
                                    deductName = ""
                                }
                            }
                        }

                        def covLimitCode = productID.replaceAll("\\s","") + "_" + limitName.split("(?<=[\\S])[\\S]*\\s*").join().toLowerCase().replaceAll("[^A-Za-z]+", "")

                        def covLimitRecord = CoverageLimits.findByCovLimCode(covLimitCode)
                        if(covLimitRecord == null){
                            //IF COV LIMIT RECORD IS NULL
                            covLimitRecord = new portal.CoverageLimits(productID: productID, covLimCode: covLimitCode, covLimName: limitName,
                                    covLimit: limitVal, covDeductible: deductVal)
                            covLimitRecord.save(flush: true, failOnError: true)
                        }
                        else{

                        }
                    }
                }

                productRecord = new portal.Products(productID: it.ProductID, productName: it.Description, coverage: it.CoverageID,
                        riskCompanyID: it.CompanyID, marketCompanyID: it.BillCompanyID, terms: it.Subject, formIDS: jsonOutput.toJson(formIDArray), forms: it.Endorse, grossPct: it.GrossComm, agentPct: it.AgentComm,
                        limits: it.Limits, deduct: it.Deduct, lobDist: it.LobDist, activeFlag: it.ActiveFlag)
                productRecord.save(flush: true, failOnError: true)
            }
        }


        //GO BACK AND BUILD FORM ID LISTS FOR ALL PRODUCTS
        def products = Products.list()
        log.info products
        products.each{
            productRecord = it

            def allFormsForProduct = productRecord.forms
            def formIDArray = []
            if(allFormsForProduct != null){
                allFormsForProduct.split('\n').each{
                    if(StringUtils.countMatches(it, ' - ') >= 1){
                        def formID = it.split(' - ')[0]
                        def formRecord = Forms.findByFormID(formID)
                        if(formRecord != null){
                            def formName = formRecord.formName

                            def tempFormMap = [
                                    formID : formID,
                                    formName: formName
                            ]
//                            log.info tempFormMap
                            formIDArray.push(jsonOutput.toJson(tempFormMap))
                        }

                    }
                }
                productRecord.formIDS = jsonOutput.toJson(formIDArray)
                productRecord.save(flush: true, failOnError: true)
            }
        }

        render "DONE, Press Back to Go Back"
    }

    def importFormsFromAIM(){
        //LOOP THROUGH ALL AIMSQL PRODUCTS, CHECK THE FORMS FOR EACH PRODUCTS AND ADDS MISSING FORMS TO MYSQL
        def results = aimDAO.selectAllFromTableWithFormatting("Product", dataSource_aim)

        def formRecord
        results.each{
            def productID = it.ProductID
            def allFormsForProduct = it.Endorse

            allFormsForProduct.split('\n').each{
                if(StringUtils.countMatches(it, ' - ') >= 1){
                    def formID = it.split(' - ')[0]
                    def formName = it.substring(it.lastIndexOf(' - ') + 1)
                    formName = formName.substring(formName.indexOf(':') + 1)
                    if(formID.trim().size() > 0){
                        formRecord = Forms.findByFormID(formID)
                        def usageArray = []
                        if(formRecord == null){
                            usageArray.push(productID)
                            log.info "INSERT: " + jsonOutput.toJson(usageArray)
                            formRecord = new portal.Forms(formID: formID, formName: formName, usages: jsonOutput.toJson(usageArray))
                            formRecord.save(flush: true, failOnError: true)
                        }
                        else{
                            def usageString = formRecord.usages
                            usageArray = jsonSlurper.parseText(usageString)

                            String prodIDString = productID
                            log.info "UPDATE: " + usageArray + " - " + productID + ", CONTAINS: " + usageArray.contains(prodIDString)
                            if(usageArray.contains(prodIDString) == false){
                                usageArray.push(productID)

                                formRecord.usages = jsonOutput.toJson(usageArray)
                                formRecord.save(flush: true, failOnError: true)
                            }

                        }
                    }


                }
            }

//
        }

        render "DONE, Press Back to Go Back"
    }

    def addNewProductToAIM(){
        log.info "DATA MANAGEMENT"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)

        def productPrimaryKey
        aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
            log.info "ReferenceID $num"
            productPrimaryKey = num
        }


    }

    def getRiskTypeDetails(){
        log.info "GETTING DETAILS FOR RISK"
        log.info params

        def riskRecord = RiskType.get(params.riskTypeID)

        if(riskRecord != null){
            def result =[:]
            result.id = riskRecord.id
            result.riskTypeCategory = riskRecord.riskTypeCategory
            result.riskTypeCode = riskRecord.riskTypeCode
            result.riskTypeName = riskRecord.riskTypeName
            result.products = riskRecord.products
            result.productConditions = riskRecord.productConditions



            log.info result
            render jsonOutput.toJson(result)
        }
        else{
            render ""
        }
    }

    def getProductDetails(){
        log.info "GETTING DETAILS FOR PRODUCT"
        log.info params

        def errorOccurred = false;
        def responseMap= [:]


        //GET PRODUCT RECORDS
        def productRecord = Products.get(params.productID)
        if(productRecord != null){
            def productColumnList = productRecord.domainClass.persistentProperties*.name
            def productMap =[:]
            productColumnList.each{
                productMap[it] = productRecord.getAt(it)
            }

            productMap.id = productRecord.id

            responseMap.product = productMap
        }
        else{
            errorOccurred = true;
        }

        //GET COV LIMIT RECORDS
        def covLimitRecords = CoverageLimits.findAllWhere(productID: productRecord.productID)
        if(covLimitRecords != null){
            def covLimitRecordsArray = []
            //LOOP THROUGH ALL COV LIMIT RECORD RESULTS
            covLimitRecords.each{
                def covLimitRec = it;
                def covLimitRecordMap =[:]
                //LOOP THROUGH ALL THE COLUMNS AND MAP EACH COLUMN TO A TEMPORARY MAP
                def covLimitColumnList = covLimitRec.domainClass.persistentProperties*.name
                covLimitColumnList.each{
                    def covLimitColumn = it
                    covLimitRecordMap[covLimitColumn] = covLimitRec.getAt(covLimitColumn)
                }
                covLimitRecordMap.id = covLimitRec.id

                //ADD TEMPORARY COV LIMIT MAP TO FINAL COV LIMIT ARRAY
                covLimitRecordsArray << covLimitRecordMap
            }
            responseMap.covLimits = covLimitRecordsArray
        }
        else{
            errorOccurred = true;
        }

        //GET FORMS RECORDS
        def formRecords = Forms.list()
        if(formRecords != null){
            def formRecordsArray = []
            //LOOP THROUGH ALL COV LIMIT RECORD RESULTS
            formRecords.each{
                def formRec = it;
                def formRecordMap =[:]
                //LOOP THROUGH ALL THE COLUMNS AND MAP EACH COLUMN TO A TEMPORARY MAP
                def formColumnList = formRec.domainClass.persistentProperties*.name
                formColumnList.each{
                    def formColumn = it
                    formRecordMap[formColumn] = formRec.getAt(formColumn)
                }
                formRecordMap.id = formRec.id

                //ADD TEMPORARY COV LIMIT MAP TO FINAL COV LIMIT ARRAY
                formRecordsArray << formRecordMap
            }
            responseMap.forms = formRecordsArray
        }
        else{
            errorOccurred = true;
        }



        //RENDER RESPONSE
        if(errorOccurred){
            render "Error"
        }
        else{
            render jsonOutput.toJson(responseMap)
            log.info "FINISHED"
        }


    }

    def saveRiskTypeChanges(){
        log.info "SAVING RISK TYPE CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def riskTypeObject = jsonSlurper.parseText(params.riskTypeObject)

            RiskType riskRecord = RiskType.get(riskTypeObject.id)

            log.info jsonOutput.toJson(riskTypeObject.productConditions)
            log.info riskTypeObject.riskTypeCategory

            riskRecord.riskTypeCategory = riskTypeObject.riskTypeCategory
            riskRecord.riskTypeCode = riskTypeObject.riskTypeCode
            riskRecord.riskTypeName = riskTypeObject.riskTypeName
            riskRecord.products = riskTypeObject.products
            riskRecord.productConditions = jsonOutput.toJson(riskTypeObject.productConditions)

            riskRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

        render renderMessage
    }


    def fixCompanyLogos(){
        log.info "FIXING AIM CONTACT IDS"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)

        //ADD MISSING COMPANIES TO AGENCY TABLE
        def userList = User.list();
        def agencyList = Agency.list();
        log.info "AGENCY LIST: " + agencyList.agencyID

        userList.each{
            def userRecord = it;

            //CHECK IF COMPANY ID IS IN AGENCY TABLE
            if(userRecord.company != null){
                if(agencyList.agencyID.contains(userRecord.company)){
                    log.info(it.company + " COMPANY EXISTS, CHECKING IF LOGO PATH IS NOT EMPTY")

                    def agencyRecordToCheck = Agency.findAllWhere(agencyID: userRecord.company)
                    if(agencyRecordToCheck.logoFileName !=null && agencyRecordToCheck.logoFileName.size() > 0){
                        log.info(it.company + " LOGO EXISTS")
                        log.info(it.company + " OK")
                    }
                    else{
                        log.info(it.company + " LOGO DOES NOT EXIST, ADDING DEFAULT")
                        agencyRecordToCheck.logoFileName = "default"
                        agencyRecordToCheck.save(flush: true, failOnError: true);
                    }
                }
                else{
                    log.info "COMPANY DOES NOT EXIST, ADDING AND SETTING TO DEFAULT"
                    def a = new portal.Agency(agencyID:userRecord.company, agencyPin:"", logoFileName:"default")
                    a.save(flush: true, failOnError: true)

                }
            }

        }


        agencyList.each{
            def agencyRecord = it;


        }
    }

    def fixUserAimContactIDs(){
        log.info "FIXING AIM CONTACT IDS"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)

        def userList = User.list();
        userList.each{
            def user = it;
            it.email
            aimsql.eachRow("SELECT     NameKeyPK, Name, IDCode, NameTypeID, TypeID, Address1, Address2, City, State, PostalCode, AddressKey, Country, MailAddress1, MailAddress2, MailCity, \n" +
                    "                      MailState, MailPostalCode, MailAddressKey, Phone, Extension, Fax, PhoneAltType, Home, PhoneAltType2, Remarks, Title, OwnerKey_FK, Email, URL, StatusID, \n" +
                    "                      ActiveFlag, SSN_TaxID, FlagPhysicalAddr, FlagAccountingAddr, FlagPrimaryContact, FlagCompany, PositionID, TitleID, Salutation, CreatedByID, DateAdded, \n" +
                    "                      DateModified, SortName, OwnerID, CustomGrpID, FlagContact, PreviousPhone, PreviousFax, AcctExec, CsrID, AcctExecName, CsrName, OtherGroupID, \n" +
                    "                      FlagUseOwnerPhone, FlagUseOwnerFax, FlagUseOwnerAddress, MktRepID, MktRepName, CommMethodID, AcctgEMail, MobilePhone, PhoneOther, ExchangeKey_FK, \n" +
                    "                      FlagPhoneBookOnly, LicenseNbr, UserField1, ModifiedByID, MapToID, NameTypeSubID, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgPostalCode, AcctgState, \n" +
                    "                      Flag1099, GLAcct, DefaultInvAmt, Terms, DefaultInvDescription, Contact, AcctgPhone, AcctgFax, DefaultInvBasis, FlagMonthlyPayment, FlagOneTime, \n" +
                    "                      LastStatementKey_FK, CountryID, MailCountryID\n" +
                    "FROM         taaNameMaster\n" +
                    "WHERE     (Email = '${it.email}')") {
                log.info it.email
                if(user.aimContactID != it.NameKeyPK){
                    user.aimContactID = it.NameKeyPK
                    user.save(flush: true, failOnError: true);
                }
            }

            if(it.aimContactID == null){
                aimsql.eachRow("SELECT     NameKeyPK, Name, IDCode, NameTypeID, TypeID, Address1, Address2, City, State, PostalCode, AddressKey, Country, MailAddress1, MailAddress2, MailCity, \n" +
                        "                      MailState, MailPostalCode, MailAddressKey, Phone, Extension, Fax, PhoneAltType, Home, PhoneAltType2, Remarks, Title, OwnerKey_FK, Email, URL, StatusID, \n" +
                        "                      ActiveFlag, SSN_TaxID, FlagPhysicalAddr, FlagAccountingAddr, FlagPrimaryContact, FlagCompany, PositionID, TitleID, Salutation, CreatedByID, DateAdded, \n" +
                        "                      DateModified, SortName, OwnerID, CustomGrpID, FlagContact, PreviousPhone, PreviousFax, AcctExec, CsrID, AcctExecName, CsrName, OtherGroupID, \n" +
                        "                      FlagUseOwnerPhone, FlagUseOwnerFax, FlagUseOwnerAddress, MktRepID, MktRepName, CommMethodID, AcctgEMail, MobilePhone, PhoneOther, ExchangeKey_FK, \n" +
                        "                      FlagPhoneBookOnly, LicenseNbr, UserField1, ModifiedByID, MapToID, NameTypeSubID, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgPostalCode, AcctgState, \n" +
                        "                      Flag1099, GLAcct, DefaultInvAmt, Terms, DefaultInvDescription, Contact, AcctgPhone, AcctgFax, DefaultInvBasis, FlagMonthlyPayment, FlagOneTime, \n" +
                        "                      LastStatementKey_FK, CountryID, MailCountryID\n" +
                        "FROM         taaNameMaster\n" +
                        "WHERE     (Name = '${it.firstName} ${it.lastName}')") {

                        user.aimContactID = it.NameKeyPK
                        user.save(flush: true, failOnError: true);

                }
            }

            if(it.aimContactID == null && user.company !=null){ //if still can't be found in name master, create entry
                def userReferenceID = 0;
                aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
                    log.info "userReferenceID $num"
                    userReferenceID = num
                }

                def nameMasterOwnerKey;
                aimsql.eachRow("SELECT     Name, ProducerID, StatusID, Prospect, AwardLvl, Address1, Address2, City, State, Zip, Prefix, Phone, Fax, Account_RepID, Tax_ID, Commission, CommissionLvl, \n" +
                        "                      Max_Comm, Calc_Type, TypeID, Pmt_Type, TermsID, Tax1099, ParentID, ParentFlag, License, EO_Carrier, EO_PolicyID, EO_Limits, PrincipalID, CountyID, \n" +
                        "                      MktTerritory, BranchID, ApplicationDate, TerminatedDate, Sub, Last_Visit, TargetVolume, CollectTax, MapToID, AcctingID, AutoKeyID, AwardDate, BestRating, \n" +
                        "                      ConditionCd, EMail, Established, EO_Expiration, LegalName, MailAddress1, MailAddress2, MailCity, MailState, MailZip, MktgGroupID, PaymentTermsID, \n" +
                        "                      PrimaryContactID, StructureID, WebSite, LicenseExpiration, ReferenceID, LastContactDate, ActiveFlag, AcuityKey, SpecialCodes, AllowRenewals, AllowAccounting, \n" +
                        "                      AllowNewBusiness, AllowPolicyServicing, StatusNote, Comment, BillToParent, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgState, AcctgZip, AcctgPhone, AcctgFax, \n" +
                        "                      DateProducerAgreement, DateProducerProfile, ServiceUWID, ClassCode, SourceOfLead, FlagAllowSubProducerPay, FlagPaidByStatement, Taxable, DateAdded, \n" +
                        "                      DateModified, CreatedByID, ModifiedByID, MonthlySvcFee, PaymentMethod, PaidThrough, PaymentStart, Status, PriorAgency, PriorAgencyID, SuspenseReason, \n" +
                        "                      SortName, TermDays, TermFrom, FlagOverRideComp, InvTranCode, NonPremium, FlagChargeServiceFee, IsCP, AvailableMarkets, Territory, CaptiveAgent, \n" +
                        "                      ProfessionalAffiliation, MktRepID, CsrID, ProcessBatchKey_FK, AuthorizedTeams, LOBAccess, CountyName, RollbookDate, CommMethodID, FlagDisplayPopupNote, \n" +
                        "                      AcctgEMail, AcctgContactKey_FK, ContactKey_FK, DateIRFileCreated, FinanceMapCode, FlagExportToFinance, CountryID, MailCountryID, AcctgCountryID, \n" +
                        "                      MembershipKey_FK, MembershipExp, Membership2Key_FK, Membership2Exp, Membership3Key_FK, Membership3Exp, NPR, DandB\n" +
                        "FROM         Producer with (NOLOCK)\n" +
                        "WHERE         ProducerID='${user.company}'\n" +
                        "ORDER BY Name") {
//                    log.info "Result: " + it.ReferenceID
                    nameMasterOwnerKey = it.ReferenceID
                }

                def now = new Date()
                def timestamp = now.format(dateFormat, timeZone)
                aimsql.execute "insert into taaNameMaster\n" +
                        "  (Name, NameTypeID, NameKeyPK, IDCode, TypeID, Address1, Address2, City, \n" +
                        "   State, PostalCode, AddressKey, Country, MailAddress1, MailAddress2, \n" +
                        "   MailCity, MailState, MailPostalCode, MailAddressKey, Phone, Extension, \n" +
                        "   Fax, PhoneAltType, Home, PhoneAltType2, MobilePhone, PhoneOther, Remarks, \n" +
                        "   Title, OwnerKey_FK, Email, URL, StatusID, ActiveFlag, SSN_TaxID, FlagPhysicalAddr, \n" +
                        "   FlagAccountingAddr, FlagPrimaryContact, FlagCompany, PositionID, TitleID, \n" +
                        "   Salutation, CreatedByID, DateAdded, DateModified, SortName, OwnerID, \n" +
                        "   FlagContact, FlagUseOwnerPhone, FlagUseOwnerFax, FlagUseOwnerAddress, \n" +
                        "   CommMethodID, FlagPhoneBookOnly, LicenseNbr, UserField1)\n" +
                        "values\n" +
                        "  ('${user.firstName} ${user.lastName}', 'I', ${userReferenceID}, '${user.company}', 'A', NULL, NULL, \n" +
                        "   NULL, NULL, NULL, NULL, NULL, NULL, NULL, \n" +
                        "   NULL, NULL, NULL, NULL, NULL, NULL, \n" +
                        "   NULL, NULL, NULL, NULL, NULL, NULL, \n" +
                        "   '', NULL, ${nameMasterOwnerKey}, NULL, NULL, NULL, 'Y', \n" +
                        "   NULL, NULL, NULL, NULL, \n" +
                        "   NULL, NULL, NULL, '${user.firstName}', 'jason', '${timestamp}', \n" +
                        "   '${timestamp}', NULL, NULL, NULL, NULL, \n" +
                        "   NULL, NULL, NULL, 'N', \n" +
                        "   NULL, NULL)";


                if(aimsql.updateCount == 1){
                    user.aimContactID = userReferenceID
                    user.save(flush: true, failOnError: true);
                }


            }
        }


        render 'good'
    }


    def emergencyIndication(){
        intelledoxDAO.createEmergencyIndicationPDF(dataSource_aim)

    }

   
}
