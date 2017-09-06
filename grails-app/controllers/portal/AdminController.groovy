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
        log.info "CHECK USER"
        log.info params

        log.info session.user

        AuthController ac = new AuthController()
        def test = ac.check()
        //println "TEST WASSSSS " + session.user;
        if(test == true && session.user.admin == "true"){
            //user is admin
        }
        else if(test == true){
            redirect(controller:'main', action:'index')
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

        //RISK CATEGORIES
        List <RiskCategory> riskCategoryResults = RiskCategory.findAllWhere(activeFlag: "Y")
        String riskCategories = utilService.gormResultsToJSObject(riskCategoryResults)

        //RISK TYPES
        List <RiskType> riskTypeResults = RiskType.findAllWhere(activeFlag: "Y")
        String riskTypes = utilService.gormResultsToJSObject(riskTypeResults)

        //PRODUCTS
        List <Products> productResults = Products.findAllWhere(activeFlag: "Y")
        String products = utilService.gormResultsToJSObject(productResults)

        //OPERATIONS
        List <Operations> operationResults = Operations.list()
        String operations = utilService.gormResultsToJSObject(operationResults)

        //COVERAGES
        List <Coverages> coverageResults = Coverages.findAllWhere(activeFlag: "Y")
        String coverages = utilService.gormResultsToJSObject(coverageResults)

        //CONDITION BASIS
        List <Conditions> conditionBasisResults = Conditions.findAllWhere(type: "basis")
        String conditionBasis = utilService.gormResultsToJSObject(conditionBasisResults)

        //CONDITION OPERATORS
        List <Conditions> conditionOperatorsResults = Conditions.findAllWhere(type: "operator")
        String conditionOperators = utilService.gormResultsToJSObject(conditionBasisResults)

        //QUESTIONS
        List <Questions> questionResults = Questions.list()
        String questions = utilService.gormResultsToJSObject(questionResults)

        //RATING BASIS
        List <RatingBasis> ratingBasisResults = RatingBasis.list()
        String ratingBasis = utilService.gormResultsToJSObject(ratingBasisResults)

        //RATES
        List <Rates> rateResults = portal.Rates.list()
        String rates = utilService.gormResultsToJSObject(rateResults)

        //COMPANY
        List <Company> companyResults = Company.list()
        String companies = utilService.gormResultsToJSObject(companyResults)

        //FORMS
        List <Forms> formResults = Forms.list()
        String forms = utilService.gormResultsToJSObject(formResults)




        [user: session.user, riskCategories:riskCategories, riskCategoryResults:riskCategoryResults,
         riskTypes:riskTypes, riskTypeResults:riskTypeResults, operations: operations, productResults:productResults, products:products,
         conditionBasisResults: conditionBasisResults, conditionBasis: conditionBasis, conditionOperatorsResults:conditionOperatorsResults,
         conditionOperators: conditionOperators, questionResults:questionResults, questions:questions,
         rateResults:rateResults, rates:rates, companyResults:companyResults, companies:companies, formResults:formResults, forms:forms,
         operationResults: operationResults, coverages: coverages, coverageResults: coverageResults, ratingBasisResults:ratingBasisResults, ratingBasis:ratingBasis ]
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

    def emergencyIndication(){
        intelledoxDAO.createEmergencyIndicationPDF(dataSource_aim)

    }


    def saveOperationsChanges(){
        log.info "SAVING OPERATIONS CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def coverageProductMap = jsonSlurper.parseText(params.coverageProductMap)
            def uwQuestionsMap = jsonSlurper.parseText(params.uwQuestionsMap)
            def requiredQuestionsMap = jsonSlurper.parseText(params.requiredQuestionsMap)
            def weightOrderedRequiredQuestions = jsonSlurper.parseText(params.weightOrderedRequiredQuestions)

            Operations operationRecord = Operations.findByOperationID(params.operationID)

            operationRecord.coverageProductMap = jsonOutput.toJson(coverageProductMap)
            operationRecord.underwriterQuestionsMap = jsonOutput.toJson(uwQuestionsMap)
            operationRecord.requiredQuestionsMap = jsonOutput.toJson(requiredQuestionsMap)
            operationRecord.weightOrderedRequiredQuestions = jsonOutput.toJson(weightOrderedRequiredQuestions)


            operationRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
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

    def saveProductChanges(){
        log.info "SAVING PRODUCT CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def formIDArray = jsonSlurper.parseText(params.formIDArray)
            def limitArray = jsonSlurper.parseText(params.limitArray)
            def deductArray = jsonSlurper.parseText(params.deductArray)
            def requiredQuestions = jsonSlurper.parseText(params.requiredQuestions)

            def productMap = jsonSlurper.parseText(params.productMap)

            Products productRecord = Products.findByProductID(params.productID)

            productRecord.productID = productMap.productID
            productRecord.formIDS = jsonOutput.toJson(formIDArray)
            productRecord.productName = productMap.productName
            productRecord.marketCompanyID = productMap.marketCompanyID
            productRecord.coverage = productMap.coverage
            productRecord.rateCode = productMap.rateCode
            productRecord.terms = productMap.terms
            productRecord.limitArray = jsonOutput.toJson(limitArray)
            productRecord.deductArray = jsonOutput.toJson(deductArray)
            productRecord.requiredQuestions = jsonOutput.toJson(requiredQuestions)

            productRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }


        render renderMessage
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



}
