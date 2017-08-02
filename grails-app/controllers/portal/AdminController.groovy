package portal

import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import groovy.sql.Sql
import portal.DAO.AIMSQL
import portal.DAO.Intelledox

//TESTING SSHFS

class AdminController {
    def dataSource_aim
    def beforeInterceptor = [action: this.&checkUser]
    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
    AIMSQL aimDAO = new AIMSQL();
    Intelledox intelledoxDAO = new Intelledox();
    def jsonSlurper = new JsonSlurper()
    def jsonOutput = new JsonOutput()



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

    def emergencyIndication(){
        intelledoxDAO.createEmergencyIndicationPDF(dataSource_aim)

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
        log.info riskTypes.id
        def subCategories = RiskType.findAllWhere(subCategoryFlag: "Y")

        def products = Products.list();
        products = products.sort{ it.coverage}
        def productCategories = Products.list().unique {it.coverage}

        def coverages = Coverages.list();


        [user: session.user, riskCategories:riskCategories, subCategories:subCategories, riskTypes:riskTypes, products:products,
         productCategories: productCategories, coverages:coverages ]
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

        //GET LOB RECORDS
        def lobRecords = ProductLOB.findAllWhere(productID: productRecord.productID)
        if(lobRecords != null){
            def lobRecordsArray = []
            //LOOP THROUGH ALL LOB RECORD RESULTS
            lobRecords.each{
                def lobRec = it;
                def lobRecordMap =[:]
                //LOOP THROUGH ALL THE COLUMNS AND MAP EACH COLUMN TO A TEMPORARY MAP
                def lobColumnList = lobRec.domainClass.persistentProperties*.name
                lobColumnList.each{
                    def lobColumn = it
                    lobRecordMap[lobColumn] = lobRec.getAt(lobColumn)
                }
                lobRecordMap.id = lobRec.id

                //ADD TEMPORARY LOB MAP TO FINAL LOB ARRAY
                lobRecordsArray << lobRecordMap
            }
            responseMap.lobs = lobRecordsArray
        }
        else{
            errorOccurred = true;
        }

        //GET FORMS RECORDS
        def formRecords = Forms.list()
        if(formRecords != null){
            def formRecordsArray = []
            //LOOP THROUGH ALL LOB RECORD RESULTS
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

                //ADD TEMPORARY LOB MAP TO FINAL LOB ARRAY
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

    def saveProductChanges(){
        log.info "SAVING PRODUCT CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            //SAVING PRODUCT
            def productObject = jsonSlurper.parseText(params.productObject)
            log.info productObject.id
            
            productObject.rateInfo = jsonOutput.toJson(productObject.rateInfo)

            Products productRecord = Products.get(productObject.id)

            def columnList = productRecord.domainClass.persistentProperties*.name

            columnList.each{
                productRecord[it] = productObject[it]
            }
            productRecord.save(flush: true, failOnError: true)


            //SAVING LOB
            def lobObject = jsonSlurper.parseText(params.lobObject)
            lobObject.each {
                def thisLOBObject = it

                thisLOBObject.otherOptionsMap = jsonOutput.toJson(thisLOBObject.otherOptionsMap)
                ProductLOB lobRecord = ProductLOB.get(it.id)

                def lobColumnList = lobRecord.domainClass.persistantProperties*.name

                lobColumnList.each{
                    lobRecord[it] = thisLOBObject[it]
                }

                lobRecord.save(flush: true, failOnError: true)
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
