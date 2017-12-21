package portal

import groovy.json.JsonSlurper
import groovy.json.JsonOutput
import groovy.sql.Sql
import helper.Utils;
import portal.DAO.*
import portal.Utils.Email;

class MainController {
    def aimSqlService
    def utilService
    def mailService
    def submissionService
    def pdfService
    def mySqlService
    def notificationService
    def dashboardService

    def beforeInterceptor = [action: this.&checkUser]
    def dataSource_aim
    AIMSQL aimDAO = new AIMSQL();
    Email emailHelper = new Email()

    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
    def jsonSlurper = new JsonSlurper()
    def jsonOutput = new JsonOutput()

    def checkUser() {
        println "CHECK USER"
        println params
        AuthController ac = new AuthController()
        def loggedIn = ac.check()

        if(loggedIn){

        }
        else
        {
            redirect(controller:'auth', action:'index')
        }
    }


    def index() {
        def todaysDateFormat = 'EEEE MMMM d, yyyy'
        def now = new Date()
        def todaysDate = now.format(todaysDateFormat, timeZone)

        //MESSAGES
        def groupedMessages = getGroupedMessages();
        def countUnread = 0;
        groupedMessages.each{
            def isUnread = false;
            it.eachWithIndex{ m, index ->
                if(index==0){

                }
                else{
                    if(m.unread=="true"){
                        isUnread = true;
                        countUnread++;
//                        return false;
                    }
                    log.info m.sentDateTime
                }

            }
        }


        log.info groupedMessages;

        //SUBMISSIONS
        def submissions;
        def submissionsUnderReview;
        def submissionsQuoted;
        if(session.user.userRole == "Broker"){
            log.info("Broker")
            submissions = Submissions.findAllBySubmittedBy(session.user.email,[sort: "submitDate",order: "desc"])
            log.info(submissions)
            submissionsQuoted = submissions.collect();
            submissionsUnderReview = submissions.collect();
            submissionsQuoted.removeAll{
                it.statusCode != "QO"
            }
            submissionsUnderReview.removeAll{
                it.statusCode != "UR"
            }
            submissions.each{

            }
        }
        else if(session.user.userRole == "Underwriter"){
            submissions = Submissions.findAllByUnderwriterOrSubmittedBy(session.user.email,session.user.email,[sort: "submitDate",order: "desc", max:5])
            log.info(submissions)
            submissionsQuoted = submissions.collect();
            submissionsUnderReview = submissions.collect();
            submissionsQuoted.removeAll{
                it.statusCode != "QO"
            }
            submissionsUnderReview.removeAll{
                it.statusCode != "UR"
            }
            submissions.each{

            }
        }
        else if(session.user.userRole == "Admin"){
            submissions = Submissions.findAll([sort: "submitDate",order: "desc"])
            log.info(submissions)
            submissions.each{

            }
        }

        [user: session.user, messageChains:groupedMessages, messagesUnreadCount: countUnread,
         submissions: submissions, submissionsQuoted: submissionsQuoted, submissionsUnderReview: submissionsUnderReview,
        todaysDate: todaysDate]
    }

    def newSubmissionV2() {
        //RISK CATEGORIES
        List <RiskCategory> riskCategoryResults = RiskCategory.findAllWhere(activeFlag: "Y")
        String riskCategories = utilService.gormResultsToJSObject(riskCategoryResults)

        //RISK TYPES
        List <RiskType> riskTypeResults = RiskType.findAllWhere(activeFlag: "Y")
        String riskTypes = utilService.gormResultsToJSObject(riskTypeResults)

        //PRODUCTS
        List <Products> productResults = Products.findAllWhere(activeFlag: "Y")
        String products = utilService.gormResultsToJSObject(productResults)

        //PRODUCT CONDITIONS
        List <Conditions> productConditionResults = Conditions.findAllByTypeInList(['basis', 'limitBasis'])
        String productConditions = utilService.gormResultsToJSObject(productConditionResults)

        //OPERATIONS
        List <Operations> operationResults = Operations.findAllWhere(activeFlag: "Y")
        operationResults.sort{ it.description }
        String operations = utilService.gormResultsToJSObject(operationResults)

        //COVERAGES
        List <Coverages> coverageResults = Coverages.findAllWhere(activeFlag: "Y")
        String coverages = utilService.gormResultsToJSObject(coverageResults)

        //QUESTIONS
        List <Questions> questionResults = Questions.list()
        questionResults.sort{ it.weight }
        String questions = utilService.gormResultsToJSObject(questionResults)

        //QUESTION CATEGORIES
        List <QuestionCategory> questionCategoryResults = QuestionCategory.list()
        questionCategoryResults.sort{ it.weight }
        String questionCategories = utilService.gormResultsToJSObject(questionCategoryResults)

        //RATING BASIS
        List <RatingBasis> ratingBasisResults = RatingBasis.list()
        String ratingBasis = utilService.gormResultsToJSObject(ratingBasisResults)

        //RATES
        List <Rates> rateResults = portal.Rates.list()
        String rates = utilService.gormResultsToJSObject(rateResults)





        //////////VERSION STUFF///////////
        def versionMode = false;
        def versionLetter = "A"
        def originalVersion = "A"
        def originalQuoteID = ""
        def versionMap = [:]


        //AIM VARIABLES
        def quoteRecord
        def quoteRecordJSON
        def versionRecords, dvVersionRecords, dvVersionView
        def versionRecordsJSON, dvVersionRecordsJSON,dvVersionViewJSON

        //MYSQL VARIABLES
        Submissions submissionRecord
        def submissionRecordJSON

        //QUESTION ANSWER VARIABLES
        def questionAnswerMap, questionAnswerOrganizedMap
        def questionAnswerMapJSON, questionAnswerOrganizedMapJSON

        if(params.newVersion == "true"){
            versionMode = true
            def versionQuoteID = params.q
            //CHECK FOR QUOTE ID, AND USER HAS PERMISSION TO VIEW
            quoteRecord = aimSqlService.selectRecords("Quote", [QuoteID: versionQuoteID, ContactID:session.user.aimContactID])[0]
            quoteRecordJSON = jsonOutput.toJson(quoteRecord)

            log.info quoteRecord
            if(quoteRecord.size() > 0){
                submissionRecord = Submissions.findByAimQuoteID(versionQuoteID)
                submissionRecordJSON = utilService.gormResultsToJSObject(submissionRecord)

                questionAnswerMap = jsonSlurper.parseText(submissionRecord.uwQuestionMap)
                questionAnswerMapJSON = jsonOutput.toJson(questionAnswerMap)
                questionAnswerOrganizedMap = jsonSlurper.parseText(submissionRecord.uwQuestionsOrder)
                questionAnswerOrganizedMapJSON = jsonOutput.toJson(questionAnswerOrganizedMap)

                versionRecords = aimSqlService.selectRecords("Version", [QuoteID: versionQuoteID])
                dvVersionRecords = aimSqlService.selectRecords("dvVersionRecord", [QuoteID: versionQuoteID])
                dvVersionView = aimSqlService.selectRecords("dvVersionView", [QuoteID: versionQuoteID])

                versionRecordsJSON = jsonOutput.toJson(versionRecords)
                dvVersionRecordsJSON = jsonOutput.toJson(dvVersionRecords)
                dvVersionViewJSON = jsonOutput.toJson(dvVersionView)
            }

            //SET VERSION LETTER
            versionLetter = jsonOutput.toJson(submissionService.getNextVersionLetter(params.vfrom))
            originalVersion = jsonOutput.toJson(params.vfrom)
            originalQuoteID = jsonOutput.toJson(params.q)


            log.info "VERSION LETTER ====== " + versionLetter
        }

        def filmRiskTypes = RiskType.findAllWhere(riskTypeCategory: "FP");
        def editingVersion;
        def allVersionsInMysql = [];
        def aimSqlAllVersions = [];
        def mysqlSubmissionResult = [];
        def questionAnswerMapString;
        def dvResults =[];
        def verResults =[];
        def quoteResults = [];
        if(params.version == "NV"){
            versionMode=true;

            //GET DV VERSION TABLE DETAILS FOR THIS SPECIFIC VERSION, AIMSQL
            def where = "(QuoteID='" + params.quoteID + "') AND (Version = '" + params.editingVersion + "')";
            dvResults = aimSqlService.selectAllFromTableWhereWithFormatting("dvVersionView", where, dataSource_aim)

            //GET VERSION TABLE DETAILS FOR THIS SPECIFIC VERSION, AIMSQL
            where = "(QuoteID='" + params.quoteID + "') AND (Version = '" + params.editingVersion + "')";
            verResults = aimSqlService.selectAllFromTableWhereWithFormatting("Version", where, dataSource_aim)

            //GET QUOTE TABLE DETAILS FOR THIS SPECIFIC VERSION, AIMSQL
            where = "(QuoteID='" + params.quoteID + "')";
            quoteResults = aimSqlService.selectAllFromTableWhereWithFormatting("Quote", where, dataSource_aim)

            //FIND ALL VERSIONS FOR THIS QUOTEID IN MYSQL
            allVersionsInMysql = Submissions.findAllWhere(aimQuoteID: "" + params.quoteID);

            //FIND ALL VERSIONS FOR THIS QUOTEID IN AIMSQL
            where = "(QuoteID='" + params.quoteID + "')";
            aimSqlAllVersions = aimSqlService.selectAllFromTableWhereWithFormatting("dvVersionView", where, dataSource_aim)
            aimSqlAllVersions.sort { a, b -> a.Version <=> b.Version }

            //LOOP THROUGH AIMSQL RESULTS TO FIND THE LAST VERSION LETTER, SET THIS NEW VERSION TO THE NEXT LETTER
            if(aimSqlAllVersions.size() > 0){
                String value = aimSqlAllVersions.last().Version
                value = value.replaceAll("\"", "").replace("'", "");
                log.info value
                int charValue = value.charAt(0);
                versionLetter = String.valueOf( (char) (charValue + 1));
                log.info versionLetter
            }

            //CHECK IF MYSQL RECORD EXISTS. IF EXISTS GET THE QUESTION ANSWER MAP

            mysqlSubmissionResult =  Submissions.findByAimQuoteIDAndAimVersion(params.quoteID, params.editingVersion)
            questionAnswerMapJSON = jsonSlurper.parseText(mysqlSubmissionResult.questionAnswerMap)
            questionAnswerMapString = JsonOutput.toJson(questionAnswerMapJSON)

            log.info questionAnswerMapString
//            log.info dvResults[0].QuoteID
//            log.info verResults[0]
//            log.info quoteResults[0].CoverageID

//            quotingVersionMap = [
//
//            ]
        }




        [user: session.user,
         riskCategories:riskCategories, riskCategoryResults:riskCategoryResults,
         riskTypes:riskTypes, riskTypeResults:riskTypeResults,
         products:products, productConditionResults:productConditionResults, productConditions:productConditions,
         operations: operations, operationResults: operationResults,
         coverages: coverages, coverageResults: coverageResults,
         questionResults:questionResults, questions:questions,
         questionCategoryResults:questionCategoryResults, questionCategories:questionCategories,
         ratingBasisResults:ratingBasisResults, ratingBasis:ratingBasis,
         rateResults:rateResults, rates:rates,

         versionMode:versionMode,
         originalVersion: params.editingVersion,
         questionAnswerMapString:questionAnswerMapString, dvResults: dvResults[0], verResults:verResults[0], quoteResults:quoteResults[0],

         quoteRecord:quoteRecord, versionRecords:versionRecords, dvVersionRecords:dvVersionRecords, dvVersionView:dvVersionView, submissionRecord:submissionRecord,
         quoteRecordJSON:quoteRecordJSON, versionRecordsJSON:versionRecordsJSON, dvVersionRecordsJSON:dvVersionRecordsJSON, dvVersionViewJSON:dvVersionViewJSON,
         submissionRecordJSON: submissionRecordJSON, questionAnswerMap:questionAnswerMap, questionAnswerOrganizedMap:questionAnswerOrganizedMap, questionAnswerMapJSON:questionAnswerMapJSON,
         questionAnswerOrganizedMapJSON:questionAnswerOrganizedMapJSON, versionLetter:versionLetter, originalVersion:originalVersion, originalQuoteID: originalQuoteID
        ]
    }

    def getTaxInfo(){
        log.info "GETTING TAX INFO"
        log.info params

        def taxMap = aimSqlService.getTaxInfo(params.state)

        render jsonOutput.toJson(taxMap)
    }

    def submitSubmission(){
        log.info("SUBMIT SUBMISSION")
        log.info(params);

        def renderMessage = ""

        try{
            def submissionMap = jsonSlurper.parseText(params.submissionMap)
            renderMessage = submissionService.saveSubmission(submissionMap)



            //SEND EMAIL NOTIFICATION
            //            def testMap = [
            //                    brokerEmail: "andee.abad@icloud.com",
            //                    nameOfInsured: submissionMap.namedInsured,
            //                    submissionID: aimQuoteID,
            //                    underwriterEmail: "Andee@neeis.com",
            //                    brokerName: submissionMap.acctExecID,
            //                    brokerPhone: submissionMap.brokerPhoneNumber,
            //                    brokerAgency: submissionMap.brokerCompanyID
            //            ]
            def testMap = [
                    brokerEmail: "andee.abad@icloud.com",
                    nameOfInsured: submissionMap.namedInsured,
                    submissionID: "QUOTEID",
                    underwriterEmail: "Andee@neeis.com",
                    brokerName: submissionMap.acctExecID,
                    brokerPhone: submissionMap.brokerPhoneNumber,
                    brokerAgency: submissionMap.brokerCompanyID
            ]

            log.info testMap.getClass()

            emailHelper.sendMessage(mailService, testMap)

            notificationService.addNewNotification("SUBMISSIONSUBMIT", session.user.id)

            render renderMessage
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

    }

    def newSubmissionConfirm(){
        log.info "CONFIRM NEW SUBMISSION"
        log.info params

        def submissionIDs = "";
        def submissionIDArray = params.submissionID.split(";")[0]
        def coverages = "";
        def submission;
        params.submissionID.split(",").each{
            def quoteID = it.trim()
            if(quoteID.size() > 0){
                log.info quoteID
                submission = Submissions.findAllByAimQuoteID(quoteID)
                submissionIDs = submissionIDs + submission[0].aimQuoteID + ","
                coverages = coverages + submission[0].coverages + ","
            }
        }

        if (submissionIDs.endsWith(",")) {
            submissionIDs = submissionIDs.substring(0, submissionIDs.length() - 1);
        }
        if (coverages.endsWith(",")) {
            coverages = coverages.substring(0, coverages.length() - 1);
        }

        log.info(submissionIDs)


        [user: session.user, submission: submission, submissionIDs: submissionIDs, coverages: coverages, pdfError:params.pdfError]
    }

    // OLD STUFF

    def newSubmission() {
        //RISK CATEGORIES
        List <RiskCategory> riskCategoryResults = RiskCategory.findAllWhere(activeFlag: "Y")
        String riskCategories = utilService.gormResultsToJSObject(riskCategoryResults)

        //RISK TYPES
        List <RiskType> riskTypeResults = RiskType.findAllWhere(activeFlag: "Y")
        String riskTypes = utilService.gormResultsToJSObject(riskTypeResults)

        //PRODUCTS
        List <Products> productResults = Products.findAllWhere(activeFlag: "Y")
        String products = utilService.gormResultsToJSObject(productResults)

        def filmRiskTypes = RiskType.findAllWhere(riskTypeCategory: "FP");

        def versionMode = false;
        def versionLetter = "A"
        def editingVersion;
        def allVersionsInMysql = [];
        def aimSqlAllVersions = [];
        def mysqlSubmissionResult = [];
        def questionAnswerMapJSON;
        def questionAnswerMapString;
        def dvResults =[];
        def verResults =[];
        def quoteResults = [];
        if(params.version == "NV"){
            versionMode=true;

            //GET DV VERSION TABLE DETAILS FOR THIS SPECIFIC VERSION, AIMSQL
            def where = "(QuoteID='" + params.quoteID + "') AND (Version = '" + params.editingVersion + "')";
            dvResults = aimSqlService.selectAllFromTableWhereWithFormatting("dvVersionView", where, dataSource_aim)

            //GET VERSION TABLE DETAILS FOR THIS SPECIFIC VERSION, AIMSQL
            where = "(QuoteID='" + params.quoteID + "') AND (Version = '" + params.editingVersion + "')";
            verResults = aimSqlService.selectAllFromTableWhereWithFormatting("Version", where, dataSource_aim)

            //GET QUOTE TABLE DETAILS FOR THIS SPECIFIC VERSION, AIMSQL
            where = "(QuoteID='" + params.quoteID + "')";
            quoteResults = aimSqlService.selectAllFromTableWhereWithFormatting("Quote", where, dataSource_aim)

            //FIND ALL VERSIONS FOR THIS QUOTEID IN MYSQL
            allVersionsInMysql = Submissions.findAllWhere(aimQuoteID: "" + params.quoteID);

            //FIND ALL VERSIONS FOR THIS QUOTEID IN AIMSQL
            where = "(QuoteID='" + params.quoteID + "')";
            aimSqlAllVersions = aimSqlService.selectAllFromTableWhereWithFormatting("dvVersionView", where, dataSource_aim)
            aimSqlAllVersions.sort { a, b -> a.Version <=> b.Version }

            //LOOP THROUGH AIMSQL RESULTS TO FIND THE LAST VERSION LETTER, SET THIS NEW VERSION TO THE NEXT LETTER
            if(aimSqlAllVersions.size() > 0){
                String value = aimSqlAllVersions.last().Version
                value = value.replaceAll("\"", "").replace("'", "");
                log.info value
                int charValue = value.charAt(0);
                versionLetter = String.valueOf( (char) (charValue + 1));
                log.info versionLetter
            }

            //CHECK IF MYSQL RECORD EXISTS. IF EXISTS GET THE QUESTION ANSWER MAP

            mysqlSubmissionResult =  Submissions.findByAimQuoteIDAndAimVersion(params.quoteID, params.editingVersion)
            questionAnswerMapJSON = jsonSlurper.parseText(mysqlSubmissionResult.questionAnswerMap)
            questionAnswerMapString = JsonOutput.toJson(questionAnswerMapJSON)

            log.info questionAnswerMapString
//            log.info dvResults[0].QuoteID
//            log.info verResults[0]
//            log.info quoteResults[0].CoverageID

//            quotingVersionMap = [
//
//            ]
        }




        [user: session.user,
         riskCategories:riskCategories, riskCategoryResults:riskCategoryResults,
         riskTypes:riskTypes, riskTypeResults:riskTypeResults, filmRiskTypes:filmRiskTypes,
         products:products,
         versionMode:versionMode,
         versionLetter:versionLetter, originalVersion: params.editingVersion, questionAnswerMap: questionAnswerMapJSON,
         questionAnswerMapString:questionAnswerMapString, dvResults: dvResults[0], verResults:verResults[0], quoteResults:quoteResults[0]]
    }

    def resetp(){
        log.info("PASSWORD RESET PAGE")
        log.info(params)

        [user: session.user]
    }

    def messages(){
        log.info ("MY Messages")
        log.info (params)

        def groupedMessages = getGroupedMessages();
        log.info groupedMessages;
        def initial
        if(!params.intial){
            if(groupedMessages.size() > 0){
                initial = (groupedMessages[0])[1].messageChainID
            }
        }
        else{
            initial = params.initial
        }

        log.info initial
        log.info groupedMessages;
        [user: session.user, messageChains:groupedMessages, initialChainView: initial]

    }

    def checkNamedInsured(){
        log.info ("CHECKING NAMED INSURED")
        log.info (params)

        Sql aimsql = new Sql(dataSource_aim)
        def countP = 0;
        def countM =0;
        def matchingSubmissions = "";

        def producerIDMatch = false;
        def matchingQuoteIDs = "";
        def possibleRenewal = false;

        def matchingNamedInsureds = "";
        def matchingRenewals = "";
        def matchingInactivePolicies ="";
        def exactMatch = false;
        def potentialMatch = false;
        def renderString = "";

        //IF EXACT MATCH
        log.info("CHECKING EXACT MATCHES")
        aimsql.eachRow( "SELECT * FROM dvSearchInsured_v2 WITH (NOLOCK) WHERE (NamedInsured = '" + params.checkName + "')" +
                " AND (Zip = '" + params.zipCodeMailing + "')") {
            log.info(params.checkName + "(" + params.zipCodeMailing + ") EXACTLY Matches " + "&;&" + it.NamedInsured + "&;&" + it.Zip)
            exactMatch = true;
            matchingNamedInsureds = matchingNamedInsureds  + it.NamedInsured + "&;;&"

            if(it.ProducerID == session.user.company){
                aimsql.eachRow( "SELECT * FROM Quote WITH (NOLOCK) WHERE  (InsuredID = '" + it.InsuredID + "')" ) {
                    possibleRenewal = true;
                    if(it.ActivePolicyFlag == "Y"){
                        matchingRenewals = matchingRenewals + it.QuoteID + "&;&" + it.NamedInsured + "&;&" + it.ProducerID + "&;&" + it.ActivePolicyFlag + "&;;&";
                        log.info("Matched Active Policy: " + it.QuoteID + "&;&" + it.NamedInsured + "&;&" + it.ProducerID + "&;&" + it.ActivePolicyFlag );
                    }
                    else{
                        matchingRenewals = matchingRenewals + it.QuoteID + "&;&" + it.NamedInsured + "&;&" + it.ProducerID + "&;&" + it.ActivePolicyFlag + "&;;&";
                        log.info("Matched NON Active Policy: " + it.QuoteID + "&;&" + it.NamedInsured + "&;&" + it.ProducerID + "&;&" + it.ActivePolicyFlag );
                    }
                }
                if(possibleRenewal == true){
                    log.info("MATCHES EXACTLY TO A EXISTING POLICY FROM THIS AGENCY")
                    renderString = "RENEWAL&;;&" + matchingRenewals
                }
                else{
                    log.info("MATCHES EXACTLY TO A NAMED INSURED FROM THIS AGENCY BUT NO EXISTING POLICY/QUOTE")
                    renderString = "OK&;;&" + matchingNamedInsureds
                }

            }
            else{
                log.info("MATCHES EXACTLY TO A NAMED INSURED FROM A DIFFERENT AGENCY")
                renderString = "BOR&;;&" + matchingNamedInsureds
            }
        }

        if(exactMatch){
//            render renderString
        }
        else{
            //IF THERE ARE NO EXACT MATCHES CHECK IF SIMILAR IF GIVEN NAME IS LONGER THAN 4 CHAR
            if(params.checkName.length() >= 3){
                log.info("CHECKING SIMILAR MATCHES")
                aimsql.eachRow( "SELECT * FROM dvSearchInsured_v2 WITH (NOLOCK) WHERE (NamedInsured LIKE '%" + params.checkName + "%')" +
                        " AND (Zip = '" + params.zipCodeMailing + "')") {
                    log.info(params.checkName + "(" + params.zipCodeMailing + ") SIMILAR Matches " + "&;&" + it.NamedInsured + "&;&" + it.Zip)
                    potentialMatch = true;
                    matchingNamedInsureds = matchingNamedInsureds  + it.NamedInsured + "&;;&"
                    if(it.ProducerID == session.user.company){
                        aimsql.eachRow( "SELECT * FROM Quote WITH (NOLOCK) WHERE  (InsuredID = '" + it.InsuredID + "')" ) {
                            possibleRenewal = true;
                            if(it.ActivePolicyFlag == "Y"){
                                matchingRenewals = matchingRenewals + it.QuoteID + "&;&" + it.NamedInsured + "&;&" + it.ProducerID + "&;&" + it.ActivePolicyFlag + "&;;&";
                                log.info("Matched Active Policy: " + it.QuoteID + "&;&" + it.NamedInsured + "&;&" + it.ProducerID + "&;&" + it.ActivePolicyFlag );
                            }
                            else{
                                matchingRenewals = matchingRenewals + it.QuoteID + "&;&" + it.NamedInsured + "&;&" + it.ProducerID + "&;&" + it.ActivePolicyFlag + "&;;&";
                                log.info("Matched NON Active Policy: " + it.QuoteID + "&;&" + it.NamedInsured + "&;&" + it.ProducerID + "&;&" + it.ActivePolicyFlag );
                            }
                        }
                        if(possibleRenewal == true){
                            log.info("MATCHES SIMILARLY TO A EXISTING POLICY FROM THIS AGENCY")
                            renderString = "RENEWAL&;;&" + matchingRenewals
                        }
                        else{
                            log.info("MATCHES SIMILARLY TO A NAMED INSURED FROM THIS AGENCY BUT NO EXISTING POLICY/QUOTE")
                            renderString = "OK&;;&" + matchingNamedInsureds
                        }

                    }
                    else{
                        log.info("MATCHES EXACTLY TO A NAMED INSURED FROM A DIFFERENT AGENCY")
                        renderString = "BOR&;;&" + matchingNamedInsureds
                    }
                }
            }
            else{
                log.info("NAMED INSURED IS NOT LONGER THAN NEEDED CHAR LENGTH, SKIPPING SIMILAR MATCHES")
            }
        }

        if(potentialMatch == false && exactMatch == false && possibleRenewal == false){
            renderString = "OK"
        }
//
//        aimsql.eachRow( "SELECT * FROM dvSearchInsured_v2 WITH (NOLOCK) WHERE (NamedInsured LIKE '%" + params.checkName + "%')" +
//                " AND (Zip = '" + params.zipCodeMailing + "')") {
//            log.info "HELLOO"
//            //LEVENSHTEIN ALGORITHM TO DETERMINE HOW ALIKE TWO STRINGS ARE
//            int lfd = Utils.levenshteinDistance(params.checkName, it.NamedInsured)
//            String s1 = params.checkName;
//            String s2 = it.NamedInsured;
//
//            double ratio = ((double) lfd) / (Math.max(s1.length(), s2.length()));
//
//            log.info params.checkName + " - " + "$it.NamedInsured" + " " + ratio;
//            matchingSubmissions = matchingSubmissions + it.NamedInsured + "&,&"
//            if(ratio <0.05){
//                if(it.producerID == session.user.company){
//                    aimsql.eachRow( "SELECT * FROM Quote WITH (NOLOCK) WHERE  (InsuredID = '" + it.InsuredID + "') " +
//                            "AND (ActivePolicyFlag = 'Y')" ) {
//                        possibleRenewal = true;
//                        matchingQuoteIDs = matchingQuoteIDs + it.QuoteID + "&;&" + it.NamedInsured + "&;&" + it.ProducerID + "&;;&";
//                    }
//                }
//                else{
//                    countM++
//                }
//            }
//        }
//
//
//
//         //Implement this later
//        if(countM > 0){ //IF NAMED INSURED MATCHES OTHER INSUREDS IN SYSTEM
//            renderString = countM
//            renderString = renderString + "&;&" + matchingSubmissions
//        }
//        else if(possibleRenewal){ //IF NAMED INSURED IS A POSSIBLE RENEWAL BY THE SAME COMPANY
//            renderString = "RENEWAL:" + matchingQuoteIDs
//        }
//
        log.info "Render: " + renderString
        render renderString

    }

    def sandbox() {
        log.info ("sandbox")
        log.info (params)

        [user: session.user]
    }

    def certs() {
        log.info ("CERT MAIN PAGE")
        log.info (params)
//
//        SELECT     TOP (1) QuoteID, VersionBound, ProducerID, NamedInsured, TypeID, UserID, Attention, Received, Acknowledged, Quoted, TeamID, DivisionID, StatusID, CreatedID,
//        Renewal, OldPolicyID, OldVersion, OldExpiration, OpenItem, Notes, PolicyID, VersionCounter, InsuredID, Description, FileLocation, Address1, Address2, City, State,
//        Zip, Bound, Submitted, SubmitType, NoteAttached, AcctExec, InsuredInterest, RiskInformation, EC, BndPremium, BndFee, CompanyID, ProductID, Effective, Expiration,
//        Setup, PolicyMailOut, BinderRev, PriorCarrier, TargetPremium, CsrID, PolicyVer, OldQuoteID, PolicyGrpID, PendingSuspenseID, ReferenceID, MapToID, SubmitGrpID,
//        AcctAsst, TaxState, SicID, CoverageID, OldPremium, AddressID, OldEffective, TaxBasis, QuoteRequiredBy, RequiredLimits, RequiredDeduct, Retroactive,
//        PrevCancelFlag, PrevNonRenew, PriorPremium, PriorLimits, UWCheckList, FileSetup, ContactID, SuspenseFlag, PriorDeductible, CategoryID, StructureID,
//        RenewalStatusID, ClaimsFlag, ActivePolicyFlag, Assets, PublicEntity, VentureID, IncorporatedState, ReInsuranceFlag, TaxedPaidBy, LayeredCoverage, Employees,
//        Stock_52wk, NetIncome, LossHistory, PriorLimitsNew, LargeLossHistory, DateOfApp, Stock_High, Stock_Low, Stock_Current, MarketCap, Exposures, AIM_TransDate,
//        LostBusinessFlag, YearEst, LostBusiness_Carrier, LostBusiness_Premium, AccountKey_FK, FlagRewrite, flagWIP, RenewalQuoteID, QuoteDueDate, QuoteStatus,
//        BinderExpires, TIV, InvoicedPremium, InvoicedFee, InvoicedCommRev, SplitAccount, FileCloseReason, FileCloseReasonID, SourceOfLeadID, ServiceUWID,
//        SubmitTypeID, SubProducerID, AgtAccountNumber, BndMarketID, RefQuoteID, FlagHeldFile, HeldFileMessage, TermPremium, ProcessBatchKey_FK, PolicyInception,
//        ClassID, ScheduleIRM, ClaimExpRM, DateAppRecvd, DateLossRunRecvd, CoverageEffective, CoverageExpired, SLA, Class, IRFileNum, IRDrawer, FlagOverRideBy,
//        RackleyQuoteID, FlagCourtesyFiling, FlagRPG, CurrencyType, CurrencySymbol, FileNo, UserDefinedStr1, UserDefinedStr2, UserDefinedStr3, UserDefinedStr4,
//        UserDefinedDate1, UserDefinedValue1, ReservedContractID, CountryID, RatingKey_FK, eAttached, NewField, TotalCoinsuranceLimit, TotalCoinsurancePremium,
//        CurrencyExchRate, Invoiced, OtherLead, LeadCarrierID, RenewTypeID, IsoCode, CedingPolicyID, CedingPolicyDate, ConversionStatusID, FlagTaxExempt, Units,
//        SubUnits, LicenseAgtKey_FK, ContractPlanKey_FK, AltStatusID, FlagNonResidentAgt, CedingPolicyEndDate, TargetPremPercent, AgentContactKey_FK, LAGACoverage,
//        LAGALimoRateKey_FK, FirewallTeamID, CurrencyExchRate_Old, MarketCapValue, ExternalNoteFile, PriorRate, DBAName, MailAddress1, MailAddress2, MailCity,
//        MailState, MailZip, RatingID_FK, HereOn, TaxMunicipality
//        FROM         Quote
//        WHERE     (QuoteID IN ('0622031', '0622032', '0622033', '0622034')) AND (CoverageID IN ('CPK', 'CGL')) AND (StatusID IN ('BND', 'BIF', 'PIF'))

//CGL was 0622031, InsuredID = 87532

//        SELECT     TOP (1) InsuredID, NamedInsured, NameType, DBAName, Prefix, First_Name, Last_Name, Middle_Name, Suffix, CombinedName, Address1, Address2, City, State, Zip,
//        AddressID, ProducerID, Reference, AcctExec, AcctAsst, CSR, Entity, FormMakerName, DirectBillFlag, MailAddress1, MailAddress2, MailCity, MailState, MailZip,
//        ContactName, Phone, Fax, EMail, DateOfBirth, SSN, PhoneExt, WorkPhone, AcctExecID, AcuityKey, DateAdded, VehicleCount, BusinessStructureID, NCCI, Employees,
//        Payroll, SicID, Attention, ContactID, ClaimCount, PolicyCount, TeamID, InsuredKey_PK, GroupKey_FK, FlagProspect, FlagAssigned, MembershipTypeID, ParentKey_FK,
//        License, CareOfKey_FK, Website, SLA, Exempt, RackleyClientKey_FK, MapToID, Notes, Country, FileNo, DateConverted, UserDefinedStr1, UserDefinedStr2,
//        UserDefinedStr3, UserDefinedStr4, UserDefinedDate1, UserDefinedValue1, CountryID, AcctgInsuredID, ParentInsuredName, FlagParentInsured,
//        NotUsed_AcuityID
//        FROM         Insured
//        WHERE     (InsuredID = '87532')

        //AccountKey_FK = 87533
//        TableKey_FK=17561 (Constant)
        //ContactID=3631 (Use as NameKeyPK)

//        SELECT     TOP (1) QuoteID, VersionBound, ProducerID, NamedInsured, TypeID, UserID, Attention, Received, Acknowledged, Quoted, TeamID, DivisionID, StatusID, CreatedID,
//        Renewal, OldPolicyID, OldVersion, OldExpiration, OpenItem, Notes, PolicyID, VersionCounter, InsuredID, Description, FileLocation, Address1, Address2, City, State,
//        Zip, Bound, Submitted, SubmitType, NoteAttached, AcctExec, InsuredInterest, RiskInformation, EC, BndPremium, BndFee, CompanyID, ProductID, Effective, Expiration,
//        Setup, PolicyMailOut, BinderRev, PriorCarrier, TargetPremium, CsrID, PolicyVer, OldQuoteID, PolicyGrpID, PendingSuspenseID, ReferenceID, MapToID, SubmitGrpID,
//        AcctAsst, TaxState, SicID, CoverageID, OldPremium, AddressID, OldEffective, TaxBasis, QuoteRequiredBy, RequiredLimits, RequiredDeduct, Retroactive,
//        PrevCancelFlag, PrevNonRenew, PriorPremium, PriorLimits, UWCheckList, FileSetup, ContactID, SuspenseFlag, PriorDeductible, CategoryID, StructureID,
//        RenewalStatusID, ClaimsFlag, ActivePolicyFlag, Assets, PublicEntity, VentureID, IncorporatedState, ReInsuranceFlag, TaxedPaidBy, LayeredCoverage, Employees,
//        Stock_52wk, NetIncome, LossHistory, PriorLimitsNew, LargeLossHistory, DateOfApp, Stock_High, Stock_Low, Stock_Current, MarketCap, Exposures, AIM_TransDate,
//        LostBusinessFlag, YearEst, LostBusiness_Carrier, LostBusiness_Premium, AccountKey_FK, FlagRewrite, flagWIP, RenewalQuoteID, QuoteDueDate, QuoteStatus,
//        BinderExpires, TIV, InvoicedPremium, InvoicedFee, InvoicedCommRev, SplitAccount, FileCloseReason, FileCloseReasonID, SourceOfLeadID, ServiceUWID,
//        SubmitTypeID, SubProducerID, AgtAccountNumber, BndMarketID, RefQuoteID, FlagHeldFile, HeldFileMessage, TermPremium, ProcessBatchKey_FK, PolicyInception,
//        ClassID, ScheduleIRM, ClaimExpRM, DateAppRecvd, DateLossRunRecvd, CoverageEffective, CoverageExpired, SLA, Class, IRFileNum, IRDrawer, FlagOverRideBy,
//        RackleyQuoteID, FlagCourtesyFiling, FlagRPG, CurrencyType, CurrencySymbol, FileNo, UserDefinedStr1, UserDefinedStr2, UserDefinedStr3, UserDefinedStr4,
//        UserDefinedDate1, UserDefinedValue1, ReservedContractID, CountryID, RatingKey_FK, eAttached, NewField, TotalCoinsuranceLimit, TotalCoinsurancePremium,
//        CurrencyExchRate, Invoiced, OtherLead, LeadCarrierID, RenewTypeID, IsoCode, CedingPolicyID, CedingPolicyDate, ConversionStatusID, FlagTaxExempt, Units,
//        SubUnits, LicenseAgtKey_FK, ContractPlanKey_FK, AltStatusID, FlagNonResidentAgt, CedingPolicyEndDate, TargetPremPercent, AgentContactKey_FK, LAGACoverage,
//        LAGALimoRateKey_FK, FirewallTeamID, CurrencyExchRate_Old, MarketCapValue, ExternalNoteFile, PriorRate, DBAName, MailAddress1, MailAddress2, MailCity,
//        MailState, MailZip, RatingID_FK, HereOn, TaxMunicipality
//        FROM         Quote
//        WHERE     (QuoteID = '0622030')

//        SELECT     TOP (1) ReferenceID, RecordKey_PK, TableKey_FK, Description, ProdType, PolTerm, NameOfProduction, Contact, ContactEmail, ContactPhone, ContactFax, BusType,
//        PhysicalAddress, YearsExperience, Terms, Budget, KeyPersonnel, ProposedDate, PPDates, BioResume, BioResumeStunt, Script, NamedInsureds, Risks,
//        ProductionTypes, OtherProdDesc, MediaType, ViewFrequency, Locations, Principals, NoProdsPerYear, MaxCostOneProd, PostForOthers, Officers, PhotographyStart,
//        PhotographyEnd, PayrollCompany, SourceOfFinance, Website, Losses, STUNTS, StuntQ, PYROS, PyroQ, ColdSoreQ, Health, Warranty, VetCert, ACORD, Effective,
//        Expires, DriverName, DriverLicNo, RentalHouse, RentalHouseAddr, RentalStart, RentalEnd, EXPLAIN, FEINSSN, WC_SchedMod, SystemReq
//        FROM         tud_UWInfo
//        WHERE     (ReferenceID = '87533') AND (TableKey_FK = '17561')

//


//        SELECT     TOP (1) NameKeyPK, Name, IDCode, NameTypeID, TypeID, Address1, Address2, City, State, PostalCode, AddressKey, Country, MailAddress1, MailAddress2, MailCity,
//        MailState, MailPostalCode, MailAddressKey, Phone, Extension, Fax, PhoneAltType, Home, PhoneAltType2, Remarks, Title, OwnerKey_FK, Email, URL, StatusID,
//        ActiveFlag, SSN_TaxID, FlagPhysicalAddr, FlagAccountingAddr, FlagPrimaryContact, FlagCompany, PositionID, TitleID, Salutation, CreatedByID, DateAdded,
//        DateModified, SortName, OwnerID, CustomGrpID, FlagContact, PreviousPhone, PreviousFax, AcctExec, CsrID, AcctExecName, CsrName, OtherGroupID,
//        FlagUseOwnerPhone, FlagUseOwnerFax, FlagUseOwnerAddress, MktRepID, MktRepName, CommMethodID, AcctgEMail, MobilePhone, PhoneOther, ExchangeKey_FK,
//        FlagPhoneBookOnly, LicenseNbr, UserField1, ModifiedByID, MapToID, NameTypeSubID, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgPostalCode, AcctgState,
//        Flag1099, GLAcct, DefaultInvAmt, Terms, DefaultInvDescription, Contact, AcctgPhone, AcctgFax, DefaultInvBasis, FlagMonthlyPayment, FlagOneTime,
//        LastStatementKey_FK, CountryID, MailCountryID
//        FROM         taaNameMaster
//        WHERE     (NameKeyPK = '36311')


    }

    def submissionsBACKUP(){
        log.info ("MY SUBMISSION")
        log.info (params)
        Sql aimsql = new Sql(dataSource_aim)


        def submissions = [];

        def timeZone = TimeZone.getTimeZone('PST')
        def now = new Date()
        def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
        def timestamp = now.format(dateFormat, timeZone)


        if(session.user.userRole == "Broker"){
            //GET SUBMISSIONS LIST FOR BROKER (MYSQL)
            def webSubmissions = Submissions.where{
                aimQuoteID != null && submittedBy == session.user.email
            }

            def webQuotesString = ";";
            webSubmissions.each{
                webQuotesString = webQuotesString + it.aimQuoteID + ";"
            }

            def submissionObj=[:];

            if(params.search){
                log.info ("Search: " + params.s)
                //AIMSQL SEARCH RESULTS
                aimsql.eachRow("SELECT     QuoteID, Attention, CreatedID, NamedInsured, CoverageID, Received, StatusID, AcctExec, SubmitGrpID, ContactID\n" +
                        "FROM         Quote WITH (NOLOCK)\n" +
                        "WHERE     (QuoteID LIKE '%${params.s}%') AND (ContactID = '${session.user.aimContactID}') OR\n" +
                        "                      (NamedInsured LIKE '%${params.s}%') AND (ContactID = '${session.user.aimContactID}') OR\n" +
                        "                      (CoverageID LIKE '%${params.s}%') AND (ContactID = '${session.user.aimContactID}')\n" +
                        "ORDER BY Received DESC") {

                    def web= "false"
                    if(webQuotesString.contains(it.QuoteID)){
                        web = "true"
                    }
                    submissionObj = [aimQuoteID: it.QuoteID,
                                     submittedBy: it.Attention,
                                     brokerEmail: it.CreatedID,
                                     namedInsured: it.NamedInsured,
                                     submitDate: it.Received,
                                     coverages: it.CoverageID,
                                     statusCode: it.StatusID,
                                     underwriter: it.AcctExec,
                                     seenByUW: "N",
                                     submitGroupID: it.SubmitGrpID,
                                     web: web
                    ]
                    submissions.add(submissionObj)
                }
            }
            else{
                //AIMSQL SEARCH RESULTS
                if(session.user.aimContactID == null){
                    submissions = webSubmissions;
                }
                else{
                    aimsql.eachRow("SELECT     QuoteID, Attention, CreatedID, NamedInsured, CoverageID, Received, StatusID, AcctExec, SubmitGrpID, ContactID\n" +
                            "FROM         Quote WITH (NOLOCK)\n" +
                            "WHERE     (ContactID = '${session.user.aimContactID}') \n" +
                            "ORDER BY Received DESC") {

                        def web= "false"
                        if(webQuotesString.contains(it.QuoteID)){
                            web = "true"
                        }
                        submissionObj = [aimQuoteID: it.QuoteID,
                                         submittedBy: it.Attention,
                                         brokerEmail: it.CreatedID,
                                         namedInsured: it.NamedInsured,
                                         submitDate: it.Received,
                                         coverages: it.CoverageID,
                                         statusCode: it.StatusID,
                                         underwriter: it.AcctExec,
                                         seenByUW: "N",
                                         submitGroupID: it.SubmitGrpID,
                                         web: web
                        ]
                        submissions.add(submissionObj)
                    }
                }

            }

        }
        else if(session.user.userRole == "Underwriter"){
            def webSubmissions = Submissions.where{
                aimQuoteID != null
            }
            log.info ("Web Submissions: " + webSubmissions.getClass())
            def webQuotesString = ";";
            webSubmissions.each{
                webQuotesString = webQuotesString + it.aimQuoteID + ";"
            }
            def submissionObj=[:];
            if(params.search){
                //AIMSQL SEARCH RESULTS
                aimsql.eachRow("SELECT     QuoteID, Attention, CreatedID, NamedInsured, CoverageID, Received, StatusID, AcctExec, SubmitGrpID, ContactID\n" +
                        "FROM         Quote WITH (NOLOCK)\n" +
                        "WHERE     (QuoteID LIKE '%${params.s}%') OR\n" +
                        "          (NamedInsured LIKE '%${params.s}%') OR\n" +
                        "          (Attention LIKE '%${params.s}%') OR\n" +
                        "          (AcctExec LIKE '%${params.s}%') OR\n" +
                        "          (CoverageID LIKE '%${params.s}%')\n" +
                        "ORDER BY Received DESC") {

                    def web= "false"
                    if(webQuotesString.contains(it.QuoteID)){
                        web = "true"
                    }
                    submissionObj = [aimQuoteID: it.QuoteID,
                                     submittedBy: it.Attention,
                                     brokerEmail: it.CreatedID,
                                     namedInsured: it.NamedInsured,
                                     submitDate: it.Received,
                                     coverages: it.CoverageID,
                                     statusCode: it.StatusID,
                                     underwriter: it.AcctExec,
                                     seenByUW: "N",
                                     submitGroupID: it.SubmitGrpID,
                                     web: web
                    ]
                    submissions.add(submissionObj)
                }

                def whereString = " (QuoteID LIKE '%${params.s}%') OR\n" +
                        "          (NamedInsured LIKE '%${params.s}%') OR\n" +
                        "          (Attention LIKE '%${params.s}%') OR\n" +
                        "          (AcctExec LIKE '%${params.s}%') OR\n" +
                        "          (CoverageID LIKE '%${params.s}%')\n" +
                        "ORDER BY Received DESC"
                def testRecords = aimSqlService.selectAllFromTableWhereWithFormatting("Quote", whereString)
                log.info "SUBMISSIONS ==========="
                testRecords.each{
                    log.info it
                }
            }
            else{
                aimsql.eachRow( "SELECT Top 100 * FROM Quote with (NOLOCK) ORDER BY Received DESC") {
                    def web= "false"
                    if(webQuotesString.contains(it.QuoteID)){
                        web = "true"
                    }
                    submissionObj = [aimQuoteID: it.QuoteID,
                                     submittedBy: it.Attention,
                                     brokerEmail: it.CreatedID,
                                     namedInsured: it.NamedInsured,
                                     submitDate: it.Received,
                                     coverages: it.CoverageID,
                                     statusCode: it.StatusID,
                                     underwriter: it.AcctExec,
                                     seenByUW: "N",
                                     submitGroupID: it.SubmitGrpID,
                                     web: web
                    ]
                    submissions.add(submissionObj)
                }


            }

            log.info(submissions)


        }
        else if(session.user.userRole == "Admin"){
            submissions = Submissions.findAll([sort: "submitDate",order: "desc"])
            log.info(submissions)
            submissions.each{

            }
        }


        //GET CERT INFO
        def additionalInsuredList;
        try{
            log.info session.user.company
            additionalInsuredList = Certwords.findAllByProducerid(session.user.company,[sort: "description",order: "desc"]);
            log.info additionalInsuredList;
        }
        catch (Exception e){
            log.info e
        }

        //GET NEEIS UNDERWRITER LIST
        def neeisUWList;
        try{
            neeisUWList = User.findAllByUserRole("Underwriter",[sort: "firstName",order: "desc"]);
            log.info neeisUWList
        }
        catch (Exception e){
            log.info e
        }


        //NEW STUFF
        def aimSQLSubmissions = aimSqlService.aimSelectQuery("SELECT Top 100 * FROM Quote with (NOLOCK) ORDER BY Received DESC")
        log.info "SUBMISSIONS ==========="
        def submissionList = jsonOutput.toJson(aimSQLSubmissions)

        [user: session.user, submissions: submissions, submissionList: submissionList, additionalInsuredList: additionalInsuredList, timestamp:timestamp, neeisUWList:neeisUWList]
    }

    def submissions(){
        log.info ("MY SUBMISSION")
        log.info (params)
        Sql aimsql = new Sql(dataSource_aim)


        def submissionList = [];
        def submissions = []

        def timeZone = TimeZone.getTimeZone('PST')
        def now = new Date()
        def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
        def timestamp = now.format(dateFormat, timeZone)


        if(session.user.userRole == "Broker"){

        }
        else if(session.user.userRole == "Underwriter"){

            //GET SUBMISSIONS IN MYSQL
            def mySqlSubmissions = Submissions.list()
            mySqlSubmissions = mySqlService.getResultCollection(mySqlSubmissions)

            def webSubmissionIDArray = []
            def webSubmissionsMap = [:]
            mySqlSubmissions.each{
                String quoteID = it.aimQuoteID
                webSubmissionIDArray << quoteID
                webSubmissionsMap[quoteID] = it
            }


            //GET SUBMISSIONS IN AIM
            def aimSqlSubmissions = aimSqlService.aimSelectQuery("SELECT Top 100 * FROM Quote with (NOLOCK) ORDER BY Received DESC")
            def aimSqlSubmissionsMap = [:]
            aimSqlSubmissions.each{
                String quoteID = it.QuoteID
                aimSqlSubmissionsMap[quoteID] = it
            }


            //BUILD SUBMISSION LIST FOR BROWSER
            aimSqlSubmissions.each{
                String quoteID = it.QuoteID
                def submissionMap = [:]

                submissionMap.aimsql = aimSqlSubmissionsMap[quoteID]
                if(webSubmissionsMap.containsKey(quoteID)){
                    submissionMap.mysql = webSubmissionsMap[quoteID]
                    submissionMap.webFlag = "Y"
                }
                else{
                    submissionMap.webFlag = "N"
                }

                submissionList << submissionMap
            }
            submissionList = jsonOutput.toJson(submissionList)

        }
        else if(session.user.userRole == "Admin"){
        }


        //GET CERT INFO
        def additionalInsuredList;
        try{
            log.info session.user.company
            additionalInsuredList = Certwords.findAllByProducerid(session.user.company,[sort: "description",order: "desc"]);
            log.info additionalInsuredList;
        }
        catch (Exception e){
            log.info e
        }

        //GET NEEIS UNDERWRITER LIST
        def neeisUWList;
        try{
            neeisUWList = User.findAllByUserRole("Underwriter",[sort: "firstName",order: "desc"]);
            log.info neeisUWList
        }
        catch (Exception e){
            log.info e
        }




        [user: session.user, submissions: submissions, submissionList: submissionList, additionalInsuredList: additionalInsuredList, timestamp:timestamp, neeisUWList:neeisUWList]
    }

    def submissionDetail(){
        log.info ("SUBMISSION DETAIL")
        log.info (params)


        //AIM VARIABLES
        def versionRecords, dvVersionRecords, dvVersionView
        def versionRecordsJSON, dvVersionRecordsJSON,dvVersionViewJSON

        //MYSQL VARIABLES
        Submissions submissionRecord
        def submissionRecordJSON

        //QUESTION ANSWER VARIABLES
        def questionAnswerMap, questionAnswerOrganizedMap
        def questionAnswerMapJSON, questionAnswerOrganizedMapJSON



        //CHECK FOR QUOTE ID, AND USER HAS PERMISSION TO VIEW
        def quoteRecord = aimSqlService.selectRecords("Quote", [QuoteID: params.quoteID, ContactID:session.user.aimContactID])[0]
        def quoteRecordJSON = jsonOutput.toJson(quoteRecord)


        if(quoteRecord.size() > 0){
            submissionRecord = Submissions.findByAimQuoteID(params.quoteID)
            submissionRecordJSON = utilService.gormResultsToJSObject(submissionRecord)

            questionAnswerMap = jsonSlurper.parseText(submissionRecord.uwQuestionMap)
            questionAnswerMapJSON = jsonOutput.toJson(questionAnswerMap)
            questionAnswerOrganizedMap = jsonSlurper.parseText(submissionRecord.uwQuestionsOrder)
            questionAnswerOrganizedMapJSON = jsonOutput.toJson(questionAnswerOrganizedMap)

            versionRecords = aimSqlService.selectRecords("Version", [QuoteID: params.quoteID])
            dvVersionRecords = aimSqlService.selectRecords("dvVersionRecord", [QuoteID: params.quoteID])
            dvVersionView = aimSqlService.selectRecords("dvVersionView", [QuoteID: params.quoteID])

            versionRecordsJSON = jsonOutput.toJson(versionRecords)
            dvVersionRecordsJSON = jsonOutput.toJson(dvVersionRecords)
            dvVersionViewJSON = jsonOutput.toJson(dvVersionView)
        }

        [user: session.user,
         quoteRecord:quoteRecord, versionRecords:versionRecords, dvVersionRecords:dvVersionRecords, dvVersionView:dvVersionView, submissionRecord:submissionRecord,
         quoteRecordJSON:quoteRecordJSON, versionRecordsJSON:versionRecordsJSON, dvVersionRecordsJSON:dvVersionRecordsJSON, dvVersionViewJSON:dvVersionViewJSON,
         submissionRecordJSON: submissionRecordJSON, questionAnswerMap:questionAnswerMap, questionAnswerOrganizedMap:questionAnswerOrganizedMap, questionAnswerMapJSON:questionAnswerMapJSON,
         questionAnswerOrganizedMapJSON:questionAnswerOrganizedMapJSON]
    }


    def getCertWords(){
        log.info ("GETTING CERT WORDS")
        log.info (params)

        def additionalInsuredList;
        try{
            log.info params.additionalID
            additionalInsuredList = Certwords.get(params.additionalID);
            log.info additionalInsuredList;
        }
        catch (Exception e){
            log.info e
        }

        render "" + additionalInsuredList.ops + "&;&" + additionalInsuredList.additionalInsured
    }

    def submissionView(){
        log.info ("Viewing Submission")
        log.info (params)

        Sql aimsql = new Sql(dataSource_aim)

        def record =[:]

        aimsql.eachRow( "SELECT * FROM dvVersionView with (NOLOCK) WHERE QuoteID = '" + params.s + "' ORDER BY Version ASC") {
            log.info it
//            QuoteID:0620057, Version:A, VersionCompanyID:RM0057, ProductID:BARCPKGP, Premium:1234.0000, Non_Premium:[null], Misc_Premium:[null],
//            NonTax_Premium:[null], QuoteExpires:[null], Financed:Y, Taxed:Y, MEP:, Rate:, GrossComm:0.0, AgentComm:0.0, Coinsure:, SubmitDate:[null],
//            SubmitPOC:[null], MarketID:SAFELL, VerOriginal:A, StatusID:QO, CoverageName:Barbican Film GL-NOAL Annual CPkg,
//                    CompanyName:Lloyd's of London / Barbican Syndicate 1955, CompanyFax:[null], CompanyPhone:, MarketName:Safeonline LLP, MarketFax:, ' +
//                    'MarketPhone:4402079544410, ProposedEffective:1900-01-01 00:00:00.0, ProposedExpiration:1900-01-01 00:00:00.0, TotalTax:0.0000, ' +
//                    'TotalFees:0.0000, Total:1234.0000, VersionID:0620057A   , TerrorActPremium:[null], TerrorActStatus:WAIVED, MarketContactKey_FK:[null], NAIC:[null]
            record['QuoteID'] = it.QuoteID
            record['Version'] = it.Version
            record['ProductID'] = it.ProductID
            record['CoverageName'] = it.CoverageName
            record['VersionCompanyID'] = it.VersionCompanyID
            record['CompanyName'] = it.CompanyName
            record['Premium'] = it.Premium
            record['GrossComm'] = it.GrossComm
            record['AgentComm'] = it.AgentComm
            record['MarketID'] = it.MarketID
            record['VerOriginal'] = it.VerOriginal
            record['StatusID'] = it.StatusID
            record['MarketName'] = it.MarketName
            record['MarketFax'] = it.MarketFax
            record['MarketPhone'] = it.MarketPhone
            record['CompanyName'] = it.CompanyName
            record['ProposedEffective'] = it.ProposedEffective
            record['ProposedExpiration'] = it.ProposedExpiration
            record['TotalTax'] = it.TotalTax
            record['TotalFees'] = it.TotalFees
            record['Total'] = it.Total
            record['VersionID'] = it.VersionID
            record['TerrorActPremium'] = it.TerrorActPremium
            record['TerrorActStatus'] = it.TerrorActStatus
        }

        aimsql.eachRow( "SELECT *  FROM dbo.Version with (NOLOCK) WHERE QuoteID='" + record['QuoteID'] +
                "' AND VerOriginal='" + record['VerOriginal'] + "' ORDER BY  QuoteID ASC , VerOriginal ASC") {

//            [QuoteID:0620057, VerOriginal:A, Version:A, LobID:[null], LobSubID:[null], CompanyID:RM0057, ProductID:BARCPKGP, Premium:1234.0000, Non_Premium:[null],
//             Misc_Premium:[null], NonTax_Premium:[null], Quoted, Subject:, Endorsement:, Financed:Y, Taxed:Y, MEP:, Rate:, GrossComm:0.0, AgentComm:0.0, Brokerage:N,
//             Dedu, CoInsure:, StatusID:QO, ReasonID:[null], SubmitDate:[null], SubmitPOC:[null], MarketID:SAFELL, Apportionment:[null], Tax1:0.0000, Tax2:0.0000, Tax3:0.0000,
//             Tax4:0.0000, FormID:OCR, RateInfo:, Indicator:N, PendingSuspenseID:[null], CommPaid:0.0000, AggregateLimits:[null], DeductibleVal:[null], BoundFlag:[null],
//             DirectBillFlag:N, ProposedEffective:1900-01-01 00:00:00.0, ProposedExpiration:1900-01-01 00:00:00.0, ProposedTerm:26, Retroactive:[null], RetroPeriod:[null],
//             UnderLyingCoverage:, MultiOption:[null], MiscPrem1:[null], MiscPrem2:[null], MiscPrem3:[null], NonTax1:[null], NonTax2:[null], NonPrem1:[null], NonPrem2:[null],
//             PaymentRecv:[null], PremDownPayment:[null], Valuation:[null], Retention:[null], AIM_TransDate:[null], InvoiceCodes:[null], TaxDistrib:, PremDistrib:[null],
//             CAP_Limit:[null], EPL_Limit:[null], TakenOut_RatedTerm:[null], PolicyTerm:26 Days, PolicyForm:[null], BillToCompanyID:[null], StatementKey_FK:[null],
//             PaymentKey_FK:[null], CommRecvd:[null], VersionID:0620057A   , MarketContactKey_FK:[null], TIV:[null], CompanyFees:[null], UnderLyingLimitsSum:[null],
//             PunitiveDamage:[null], ThirdPartyLimits:[null], AnnualPremium:[null], AnnualFees:[null], FlagCollectMuniTax:[null], TrueExpire:[null], WrittenLimits:[null],
//             AttachPoint:[null], LineSlip:[null], CoverageFormID:[null], PositionID:[null], LobDistrib:[null], TotalTax:[null], Total:[null], TotalAmount:[null],
//             TaxesPaidBy:[null], ResubmitDate:[null], FeeSchedule:[null], LobDistribSched:[null], DeductType: , PremiumFinanceFee:[null], LOB_Field1:[null], LOB_Field2:[null],
//             LOB_Field3:[null], LOB_Flag1:[null], LOB_Prem1:[null], LOB_Prem2:[null], LOB_Prem3:[null], LOB_Limit1:$2000000, LOB_Limit2:$1000000, LOB_Limit3:$1000000,
//             LOB_Limit4:$1000000, LOB_Limit5:$100000, LOB_Limit6:$5000, LOB_Deduct1:Nil, LOB_Deduct2:Nil, LOB_Limit1Value:2000000.0000, LOB_Limit2Value:1000000.0000,
//             LOB_Limit3Value:1000000.0000, LOB_Limit4Value:1000000.0000, LOB_Limit5Value:100000.0000, LOB_Limit6Value:5000.0000, LOB_Deduct1Value:0.0000, LOB_Deduct2Value:0.0000,
//             TaxesPaidByID:[null], FlagMultiStateTax:[null], MultiStateDistrib:[null], AdmittedPremium:[null], RatedPremium:[null], APR:[null], AmountFinanced:[null],
//             DownPayment:[null], Payments:[null], FinCharge:[null], TotalPayment:[null], NumPayments:[null], FinanceDueDate:[null], ReferenceKey_FK:[null], RemitAmount:[null],
//             CollectAmount:[null], DownFactor:[null], TerrorActPremium:[null], TerrorActGrossComm:[null], TerrorActAgentComm:[null], TerrorActMEP:[null], TerrorActStatus:WAIVED,
//             FlagOverrideCalc:N, TerrorTaxes:0.0000, FlagFinanceWithTRIA:[null], FlagMultiOption: , FlagFeeCalc:[null], ParticipantCo1ID:[null], ParticipantCo2ID:[null],
//             ParticipantCo3ID:[null], UserDefinedStr1:[null], UserDefinedStr2:[null], UserDefinedStr3:[null], UserDefinedStr4:[null], UserDefinedDate1:[null],
//             UserDefinedValue1:[null], LOB_Coverage1:CGL:General Aggregate Limit, LOB_Coverage2:CGL:Products or Completed Operat, LOB_Coverage3:CGL:Personal & Advertising Injur,
//             LOB_Coverage4:CGL:Each Occurrence Limit, LOB_Coverage5:CGL:Damage to Premises Rented to, LOB_Coverage6:CGL:Medical Expense Limit (Any O,
//                    LOB_DeductType1:CGL:Bodily Injury/Property Damag, LOB_DeductType2:CGL:Damages to Premises Rented t, DeclinationReasonID:[null], ERPOption:[null],
//                    ERPDays:[null], ERPPercent:[null], ERPPremium:[null], TaxwoTRIA1:0.0000, TaxwoTRIA2:0.0000, TaxwoTRIA3:0.0000, TaxwoTRIA4:0.0000, LOB_Prem4:[null],
//                    LOB_Coverage7:NOAL:Aggregate Limit            , LOB_Coverage8:                                , LOB_Limit7:$1000000, LOB_Limit8:, LOB_Limit7Value:1000000.0000,
//                    LOB_Limit8Value:0.0000, LOB_Prem5:[null], LOB_Prem6:[null], LOB_Prem7:[null], LOB_Prem8:[null], CoverageList:[null], DocucorpFormList:[null],
//                    TerrorActPremium_GL:[null], FlagRecalcTaxes:[null], DateMktResponseRecvd:[null], CancelClause:[null], PremiumProperty:0.0000, PremiumLiability:0.0000,
//                    PremiumOther:23423.0000, EndorsementKey_FK:[null], DefaultRiskCompanyID:[null], MarketPOCKey_FK:[null], ExcludedFinPrem:[null], AggregateLimitsTemp:[null],
//                    RetentionTemp:[null], RetentionTemp2:[null], RetentionValue:[null], Tax1Name:, Tax2Name:, Tax3Name:, Tax4Name:, AgentDeposit:-4099.0300, EndorseForms:[null],
//                    TaxwoTRIA5:0.0000, Tax5:0.0000, Tax5Name:, LOB_Coverage9:, LOB_Limit9:, LOB_Limit9Value:0.0000, LOB_Prem9:[null], FeeSchedule2:[null], TaxwoTRIA6:0.0000,
//                    Tax6Name:, TaxwoTRIA7:0.0000, Tax7Name:, TaxwoTRIA8:0.0000, Tax8Name:, Tax6:0.0000, Tax7:0.0000, Tax8:0.0000, InsuredDeposit:0.0000, CopiedFrom:[null],
//                    InstallmentPlanID:[null], DownPaymentAmt:[null], Installments:[null], FrequencyID:[null], InstallmentFee:[null], InstallmentFeeID:[null],
//                    AgentDepositwoTRIA:-4099.0300, InsuredDepositwoTRIA:0.0000, InstallFeeInfo:[null], InstallFeeInvKey:[null], InstallmentFeeFirst:[null]]

            log.info "VERSION =========== " + it

            record['LOB_Limit1'] = it.LOB_Limit1
            record['LOB_Limit2'] = it.LOB_Limit2
            record['LOB_Limit3'] = it.LOB_Limit3
            record['LOB_Limit4'] = it.LOB_Limit4
            record['LOB_Limit5'] = it.LOB_Limit5
            record['LOB_Limit6'] = it.LOB_Limit6
            record['LOB_Limit7'] = it.LOB_Limit7
            record['LOB_Limit8'] = it.LOB_Limit8
            record['LOB_Limit9'] = it.LOB_Limit9

            record['LOB_Coverage1'] = it.LOB_Coverage1
            record['LOB_Coverage2'] = it.LOB_Coverage2
            record['LOB_Coverage3'] = it.LOB_Coverage3
            record['LOB_Coverage4'] = it.LOB_Coverage4
            record['LOB_Coverage5'] = it.LOB_Coverage5
            record['LOB_Coverage6'] = it.LOB_Coverage6
            record['LOB_Coverage7'] = it.LOB_Coverage7
            record['LOB_Coverage8'] = it.LOB_Coverage8
            record['LOB_Coverage9'] = it.LOB_Coverage9

            record['LOB_DeductType1'] = it.LOB_DeductType1
            record['LOB_DeductType2'] = it.LOB_DeductType2

            record['LOB_Deduct1'] = it.LOB_Deduct1
            record['LOB_Deduct2'] = it.LOB_Deduct2

            record['Subject'] = it.Subject
            record['Endorsement'] = it.Endorsement
            record['VersionRate'] = it.Rate
            record['VersionCoInsure'] = it.CoInsure
            record['VersionMEP'] = it.MEP

            record['DirectBillFlag'] = it.DirectBillFlag
            record['Brokerage'] = it.Brokerage
            record['Indicator'] = it.Indicator

            record['Taxed'] = it.Taxed

            record['Financed'] = it.Financed


        }

        aimsql.eachRow( "SELECT *  FROM dbo.Quote with (NOLOCK) WHERE QuoteID='" + record['QuoteID'] +
                "' ORDER BY  QuoteID ASC") {
//            [QuoteID:0620057, VersionBound:[null], ProducerID:TVD, NamedInsured:, TypeID:[null], UserID:web, Attention:[null], Received:2016-10-16 01:05:57.44,
//             Acknowledged:[null], Quoted:[null], TeamID:01, DivisionID:00, StatusID:QO, CreatedID:web, Renewal:N, OldPolicyID:[null], OldVersion:[null], OldExpiration:[null],
//             OpenItem:N, Notes:[null], PolicyID:[null], VersionCounter:A, InsuredID:81112, Description:Feature Film, FileLocation:[null], Address1:, Address2:, City:, State:,
//             Zip:, Bound:[null], Submitted:[null], SubmitType:[null], NoteAttached:[null], AcctExec:shauna, InsuredInterest:[null], RiskInformation:[null], EC:[null],
//             BndPremium:[null], BndFee:[null], CompanyID:[null], ProductID:[null], Effective:[null], Expiration:[null], Setup:[null], PolicyMailOut:[null], BinderRev:[null],
//             PriorCarrier:[null], TargetPremium:[null], CsrID:web, PolicyVer:[null], OldQuoteID:[null], PolicyGrpID:[null], PendingSuspenseID:[null], ReferenceID:81112,
//             MapToID:[null], SubmitGrpID:0620057, AcctAsst:[null], TaxState:, SicID:[null], CoverageID:CPK, OldPremium:[null], AddressID:[null], OldEffective:[null],
//             TaxBasis:[null], QuoteRequiredBy:[null], RequiredLimits:[null], RequiredDeduct:[null], Retroactive:[null], PrevCancelFlag:[null], PrevNonRenew:[null],
//             PriorPremium:[null], PriorLimits:[null], UWCheckList:[null], FileSetup:[null], ContactID:[null], SuspenseFlag:N, PriorDeductible:[null], CategoryID:[null],
//             StructureID:[null], RenewalStatusID:[null], ClaimsFlag:N, ActivePolicyFlag:N, Assets:[null], PublicEntity:[null], VentureID:[null], IncorporatedState:[null],
//             ReInsuranceFlag:[null], TaxedPaidBy:[null], LayeredCoverage:[null], Employees:[null], Stock_52wk:[null], NetIncome:[null], LossHistory:, PriorLimitsNew:[null],
//             LargeLossHistory:, DateOfApp:[null], Stock_High:[null], Stock_Low:[null], Stock_Current:[null], MarketCap:[null], Exposures:, AIM_TransDate:2016-10-16 01:05:57.44,
//             LostBusinessFlag:[null], YearEst:[null], LostBusiness_Carrier:[null], LostBusiness_Premium:[null], AccountKey_FK:81112, FlagRewrite:[null], flagWIP:[null],
//             RenewalQuoteID:[null], QuoteDueDate:[null], QuoteStatus:[null], BinderExpires:[null], TIV:[null], InvoicedPremium:[null], InvoicedFee:[null], InvoicedCommRev:[null],
//             SplitAccount:[null], FileCloseReason:[null], FileCloseReasonID:[null], SourceOfLeadID:[null], ServiceUWID:[null], SubmitTypeID:NEW, SubProducerID:[null],
//             AgtAccountNumber:[null], BndMarketID:[null], RefQuoteID:[null], FlagHeldFile:[null], HeldFileMessage:[null], TermPremium:[null], ProcessBatchKey_FK:[null],
//             PolicyInception:[null], ClassID:[null], ScheduleIRM:[null], ClaimExpRM:[null], DateAppRecvd:[null], DateLossRunRecvd:[null], CoverageEffective:[null],
//             CoverageExpired:[null], SLA:[null], Class:[null], IRFileNum:[null], IRDrawer:[null], FlagOverRideBy:[null], RackleyQuoteID:[null], FlagCourtesyFiling:[null],
//             FlagRPG:N, CurrencyType:[null], CurrencySymbol:[null], FileNo:[null], UserDefinedStr1:[null], UserDefinedStr2:[null], UserDefinedStr3:[null], UserDefinedStr4:[null],
//             UserDefinedDate1:[null], UserDefinedValue1:[null], ReservedContractID:[null], CountryID:, RatingKey_FK:[null], eAttached:[null], NewField:[null],
//             TotalCoinsuranceLimit:[null], TotalCoinsurancePremium:[null], CurrencyExchRate:[null], Invoiced:[null], OtherLead:[null], LeadCarrierID:[null], RenewTypeID:[null],
//             IsoCode:[null], CedingPolicyID:[null], CedingPolicyDate:[null], ConversionStatusID:[null], FlagTaxExempt: , Units:[null], SubUnits:[null], LicenseAgtKey_FK:[null],
//             ContractPlanKey_FK:[null], AltStatusID:[null], FlagNonResidentAgt:N, CedingPolicyEndDate:[null], TargetPremPercent:[null], AgentContactKey_FK:[null],
//             LAGACoverage:[null], LAGALimoRateKey_FK:[null], FirewallTeamID:[null], CurrencyExchRate_Old:[null], MarketCapValue:[null], ExternalNoteFile:[null], PriorRate:[null],
//             DBAName:, MailAddress1:, MailAddress2:, MailCity:, MailState:, MailZip:, RatingID_FK:[null], HereOn:[null], TaxMunicipality:[null]]

            log.info "Quote Record =========== " + it
            record['NamedInsured'] = it.NamedInsured
            record['InsuredID'] = it.InsuredID
            record['PolicyID'] = it.PolicyID
            record['PolicyVer'] = it.PolicyVer
            record['ProducerID'] = it.ProducerID
            record['Attention'] = it.Attention
            record['Description'] = it.Description
            record['Received'] = it.Received
            record['Acknowledged'] = it.Acknowledged
            record['Quoted'] = it.Quoted
            record['Bound'] = it.Bound
            record['PolicyMailOut'] = it.PolicyMailOut
            record['BndPremium'] = it.BndPremium
            record['BndFee'] = it.BndFee
            record['TeamID'] = it.TeamID
            record['AcctExec'] = it.AcctExec
            record['ReinsuranceFlag'] = it.ReinsuranceFlag
            record['Renewal'] = it.Renewal
            record['FlagRPG'] = it.FlagRPG
        }


        aimsql.eachRow( "SELECT *  FROM dbo.Policy with (NOLOCK) WHERE QuoteID='" + record['QuoteID'] +
                "' ORDER BY  QuoteID ASC") {
//            [QuoteID:0609186, VersionBound:[null], ProducerID:TVD, NamedInsured:test, TypeID:[null], UserID:ckim, Attention:JonPaul Evans, Received:2013-11-11 13:34:00.0,
//             Acknowledged:[null], Quoted:2013-11-11 13:35:00.0, TeamID:01, DivisionID:[null], StatusID:FCL, CreatedID:[null], Renewal:[null], OldPolicyID:[null],
//             OldVersion:[null], OldExpiration:[null], OpenItem:N, Notes:[null], PolicyID:[null], VersionCounter:A, InsuredID:40964, Description:DICE - Producer,
//             FileLocation:[null], Address1:123 test ave, Address2:, City:los angeles , State:CA, Zip:90027, Bound:[null], Submitted:[null], SubmitType:[null],
//             NoteAttached:[null], AcctExec:ckim, InsuredInterest:[null], RiskInformation:[null], EC:[null], BndPremium:[null], BndFee:[null], CompanyID:[null],
//             ProductID:CGL11, Effective:[null], Expiration:[null], Setup:[null], PolicyMailOut:[null], BinderRev:[null], PriorCarrier:[null], TargetPremium:[null],
//             CsrID:[null], PolicyVer:[null], OldQuoteID:[null], PolicyGrpID:[null], PendingSuspenseID:[null], ReferenceID:41648, MapToID:[null], SubmitGrpID:0609186,
//             AcctAsst:[null], TaxState:CA, SicID:[null], CoverageID:CGL, OldPremium:[null], AddressID:[null], OldEffective:[null], TaxBasis:[null], QuoteRequiredBy:[null],
//             RequiredLimits:[null], RequiredDeduct:[null], Retroactive:[null], PrevCancelFlag:[null], PrevNonRenew:[null], PriorPremium:[null], PriorLimits:[null],
//             UWCheckList:[null], FileSetup:[null], ContactID:[null], SuspenseFlag:[null], PriorDeductible:[null], CategoryID:[null], StructureID:[null], RenewalStatusID:[null],
//             ClaimsFlag:[null], ActivePolicyFlag:[null], Assets:[null], PublicEntity:[null], VentureID:[null], IncorporatedState:[null], ReInsuranceFlag:[null],
//             TaxedPaidBy:[null], LayeredCoverage:[null], Employees:[null], Stock_52wk:[null], NetIncome:[null], LossHistory:[null], PriorLimitsNew:[null], LargeLossHistory:[null],
//             DateOfApp:[null], Stock_High:[null], Stock_Low:[null], Stock_Current:[null], MarketCap:[null], Exposures:[null], AIM_TransDate:2013-11-12 00:00:00.0,
//             LostBusinessFlag:[null], YearEst:[null], LostBusiness_Carrier:[null], LostBusiness_Premium:[null], AccountKey_FK:41648, FlagRewrite:[null], flagWIP:[null],
//             RenewalQuoteID:[null], QuoteDueDate:[null], QuoteStatus:[null], BinderExpires:[null], TIV:[null], InvoicedPremium:[null], InvoicedFee:[null], InvoicedCommRev:[null],
//             SplitAccount:[null], FileCloseReason:, FileCloseReasonID:[null], SourceOfLeadID:[null], ServiceUWID:[null], SubmitTypeID:[null], SubProducerID:[null],
//             AgtAccountNumber:[null], BndMarketID:[null], RefQuoteID:[null], FlagHeldFile:[null], HeldFileMessage:[null], TermPremium:[null], ProcessBatchKey_FK:[null],
//             PolicyInception:[null], ClassID:[null], ScheduleIRM:[null], ClaimExpRM:[null], DateAppRecvd:[null], DateLossRunRecvd:[null], CoverageEffective:[null],
//             CoverageExpired:[null], SLA:[null], Class:[null], IRFileNum:[null], IRDrawer:[null], FlagOverRideBy:[null], RackleyQuoteID:[null], FlagCourtesyFiling:[null],
//             FlagRPG:[null], CurrencyType:[null], CurrencySymbol:[null], FileNo:[null], UserDefinedStr1:[null], UserDefinedStr2:[null], UserDefinedStr3:[null],
//             UserDefinedStr4:[null], UserDefinedDate1:[null], UserDefinedValue1:[null], ReservedContractID:[null], CountryID:[null], RatingKey_FK:[null], eAttached:[null],
//             NewField:[null], TotalCoinsuranceLimit:[null], TotalCoinsurancePremium:[null], CurrencyExchRate:[null], Invoiced:[null], OtherLead:[null], LeadCarrierID:[null],
//             RenewTypeID:[null], IsoCode:[null], CedingPolicyID:[null], CedingPolicyDate:[null], ConversionStatusID:[null], FlagTaxExempt:[null], Units:[null], SubUnits:[null],
//             LicenseAgtKey_FK:[null], ContractPlanKey_FK:[null], AltStatusID:[null], FlagNonResidentAgt:[null], CedingPolicyEndDate:[null], TargetPremPercent:[null],
//             AgentContactKey_FK:[null], LAGACoverage:[null], LAGALimoRateKey_FK:[null], FirewallTeamID:[null], CurrencyExchRate_Old:[null], MarketCapValue:[null],
//             ExternalNoteFile:[null], PriorRate:[null], DBAName:[null], MailAddress1:[null], MailAddress2:[null], MailCity:[null], MailState:[null], MailZip:[null],
//             RatingID_FK:[null], HereOn:[null], TaxMunicipality:[null]]

            log.info "Policy Record =========== " + it
            record['Effective'] = it.Effective
            record['Expiration'] = it.Expiration
            record['BoundTime'] = it.BoundTime
            record['PolicyStatusID'] = it.StatusID
            record['InvoiceDate'] = it.InvoiceDate
            record['CancelTime'] = it.CancelTime
            record['PolicyKey_PK'] = it.PolicyKey_PK
            record['FlagSubjectToAudit'] = it.FlagSubjectToAudit
        }

        aimsql.eachRow( "SELECT *  FROM dbo.Insured with (NOLOCK) WHERE InsuredID='" + record['InsuredID'] +
                "' ORDER BY  InsuredID ASC") {
//            [InsuredID:40964, NamedInsured:test, NameType:[null], DBAName:, Prefix:[null], First_Name:[null], Last_Name:[null], Middle_Name:[null],
//             Suffix:[null], CombinedName:[null], Address1:123 test ave, Address2:, City:los angeles , State:CA, Zip:90027, AddressID:[null],
//             ProducerID:TVD, Reference:[null], AcctExec:ckim, AcctAsst:[null], CSR:[null], Entity:[null], FormMakerName:[null], DirectBillFlag:[null],
//             MailAddress1:123 test ave, MailAddress2:, MailCity:los angeles , MailState:CA, MailZip:90027, ContactName:NULL, Phone:[null], Fax:[null],
//             EMail:NULL, DateOfBirth:[null], SSN:[null], PhoneExt:[null], WorkPhone:[null], AcctExecID:[null], AcuityKey:[null],
//             DateAdded:2013-10-15 12:05:00.0, VehicleCount:[null], BusinessStructureID:[null], NCCI:[null], Employees:[null], Payroll:[null],
//             SicID:[null], Attention:JonPaul Evans, ContactID:36311, ClaimCount:[null], PolicyCount:[null], TeamID:[null], InsuredKey_PK:40964,
//             GroupKey_FK:[null], FlagProspect:[null], FlagAssigned:[null], MembershipTypeID:[null], ParentKey_FK:[null], License:[null],
//             CareOfKey_FK:[null], Website:[null], SLA:[null], Exempt:[null], RackleyClientKey_FK:[null], MapToID:[null], Notes:[null], Country:[null],
//             FileNo:[null], DateConverted:[null], UserDefinedStr1:[null], UserDefinedStr2:[null], UserDefinedStr3:[null], UserDefinedStr4:[null],
//             UserDefinedDate1:[null], UserDefinedValue1:[null], CountryID:[null], AcctgInsuredID:[null], ParentInsuredName:[null], FlagParentInsured:[null], NotUsed_AcuityID:[null]]

            log.info "Insured Record =========== " + it
            record['InsuredPhone'] = it.Phone
            record['InsuredEmail'] = it.EMail
            record['InsuredWebsite'] = it.Website
            record['MailAddress1'] = it.MailAddress1
            record['MailCity'] = it.MailCity
            record['MailState'] = it.MailState
            record['MailZip'] = it.MailZip

        }

        aimsql.eachRow( "SELECT *  FROM dbo.Producer with (NOLOCK) WHERE ProducerID='" + record['ProducerID'] +
                "' ORDER BY ProducerID ASC") {
            record['ProducerName'] = it.Name
        }

        try{
            aimsql.eachRow( "select * from invoiceHeader (NOLOCK) where policyKey_FK=" + record['PolicyKey_PK'] + "order by InvoiceKey_PK") {
                log.info "INVOICE HEADER ============ " +it
                record['InvoiceID'] = it.InvoiceID
            }
        }
        catch (Exception e){
            log.info e
        }




        def activity = aimsql.rows( "SELECT ReferenceID, TransID, UserID, Description, Date, TypeID, StatusID, ImageID, PremiumAmt, PolicyTrans, MktingTrans, ClaimsTrans, FinanceTrans, " +
                "AccountingDocID, ImageIconID, QuoteVersion, ToNameKey, SystemDate, NoteIconID, FlagCurrentProcess, DocumentSequence, BatchProcessKey_FK, DocTemplateID, " +
                "FlagDistibution, FlagDistribution, AttachmentIcon, SourceDateTime, FolderName, Temp, SessionID, FolderName AS Folder, ISNULL(SourceDateTime, Date) AS SortDate " +
                "FROM Activity WITH (NOLOCK) " +
                "WHERE (ReferenceID = '" + record['QuoteID'] + "') " +
                "ORDER BY Date DESC")
            log.info "ACTIVITY  ============ " +activity


        def notes = aimsql.rows( "SELECT     ReferenceID, NoteID, UserID, DateTime, Subject, Note, PurgeDate, StatusID, AlternateRefID, DateAddedTo, AddedByUserID, " +
                "ModifiedByID, DateModified " +
                "FROM Notes WITH (NOLOCK) " +
                "WHERE (ReferenceID = '" + record['QuoteID'] + "') " +
                "ORDER BY DateTime DESC")
        log.info "NOTES  ============ " + notes

        def invoice = aimsql.rows( "SELECT * FROM dvacAFDPayments with (NOLOCK) " +
                "WHERE InvNo LIKE '" + record['InvoiceID'] + "' " +
                "AND InvNo IS NOT NULL")
        log.info "Invoice Accounting  ============ " + invoice

        def invoiceHeader = aimsql.rows( "select * from invoiceHeader (NOLOCK) " +
                "where policyKey_FK=" + record['PolicyKey_PK'] + " " +
                "order by InvoiceKey_PK")
        log.info "Invoice Header  ============ " + invoiceHeader




//        def map = record.collect{[it, it]}
        log.info record
        log.info record
//        def finalMap = map.listIterator().reverse().collectEntries()

//        [finalMap: finalMap]



        [user: session.user, record:record, activity:activity, notes:notes, invoice:invoice, invoiceHeader:invoiceHeader]
    }



    def downloadPDF = {
//        def sub = Submissions.get(params.id)
        log.info params
        def webrootDir = servletContext.getRealPath("/attachments/${params.q}")
        def file = new File(webrootDir, "Indication A.pdf")
            if (file.exists())
            {
                response.setContentType("application/octet-stream") // or or image/JPEG or text/xml or whatever type the file is
                response.setHeader("Content-disposition", "attachment;filename=\"${file.name}\"")
                response.outputStream << file.bytes
            }
            else render "Error!" // appropriate error handling
        }

    def downloadForm = {
        log.info params
        def webrootDir = servletContext.getRealPath("/docs/forms")
        def file = new File(webrootDir, "${params.formID}.pdf")
        if (file.exists())
        {
            response.setContentType("application/octet-stream") // or or image/JPEG or text/xml or whatever type the file is
            response.setHeader("Content-disposition", "attachment;filename=\"${file.name}\"")
            response.outputStream << file.bytes
        }
        else render "Error!" // appropriate error handling
    }
    def getGroupedMessages(){
        def messages;
        def messageChainList = []
        messages = NeeisMessages.findAllByRecipientOrSender(session.user.email,session.user.email,[sort: "sentDateTime",order: "desc"])
        messages.each{
            if(messageChainList.contains(it.messageChainID)){

            }
            else{
                messageChainList.add(it.messageChainID)
            }
        }

        def groupedMessages = [];
        messageChainList.each {
            log.info "TESTING == " + it
            def messagesInChain = messages.findAll { m -> m.messageChainID == it }

            def conversationWith = "";
            messagesInChain.each{

                if(it.sender != session.user.email){
                    conversationWith = it.sender
                    return false;
                }
                else if(it.recipient != session.user.email){
                    conversationWith = it.recipient
                    return false;
                }
                else{


                }
            }
            log.info "TESTING == " + conversationWith
            messagesInChain.add(0, conversationWith)
            groupedMessages.add(messagesInChain)
        }

        return groupedMessages;
    }

    def testPDF(){
        log.info "TESTING PDF"
        log.info params

        render pdfService.createIndicationDoc(submissionMap, productDetailArray)



    }

//
//UNDERWRITER DASHBOARD SUBMISSION TABLE AJAX CALL FROM dashboard.js / Call DashboardService.groovy to receive Submission Data as JSON Object -> Convert to JS String
//render String to dashboard.js
//(data received: UserRole will need to set up a check to verify underwriter status)
    def getUnderwriterDashboardTableData(){

        def jsString = dashboardService.getUnderwriterDashboardTableRows()

//        log.info jsString
        render jsString
//        log.info ("controller")
    }
}
