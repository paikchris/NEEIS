package portal

import groovy.sql.Sql
import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.URLENC
import portal.DAO.*



class AuthController {

    def dataSource_aim
    AIMSQL aimDAO = new AIMSQL();
    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
    def mailService
    def groovyPageRenderer
    def bcryptService

    def check(){
        log.info params
        log.info "Checking Session"
        log.info "Session = " + session.user

        logMemoryStats()

        if(session.user == null){
            //i.e. user not logged in
            log.info("Not logged in")
//
            return false
        }
        else{
            return true;
        }
    }

    def checkAJAXRequest(){
        log.info params
        log.info "Checking Session"
        log.info "Session = " + session.user

        if(session.user == null){
            //i.e. user not logged in
            log.info("Not logged in")
//
            return false
        }
        else{
            return true;
        }
    }

    def index() {
    }
    def iesupport(){

    }
    def logMemoryStats(){
        int mb = 1024*1024;
        //Getting the runtime reference from system
        Runtime runtime = Runtime.getRuntime();
//        log.info("##### Heap utilization statistics [MB] #####");

        //Print used memory
        log.info("Used Memory:" + (runtime.totalMemory() - runtime.freeMemory()) / mb);

        //Print free memory
        log.info("Free Memory:" + runtime.freeMemory() / mb);

        //Print total available memory
        log.info("Total Memory:" + runtime.totalMemory() / mb);

        //Print Maximum available memory
        log.info("Max Memory:" + runtime.maxMemory() / mb);
    }
    def register() {
        log.info("REGISTER PAGE");
        log.info params;

//        Sql aimsql = new Sql(dataSource_aim)
//        def agencies =[];
//
//        aimsql.eachRow("SELECT     Name, ProducerID, StatusID, Prospect, AwardLvl, Address1, Address2, City, State, Zip, Prefix, Phone, Fax, Account_RepID, Tax_ID, Commission, CommissionLvl, \n" +
//                "                      Max_Comm, Calc_Type, TypeID, Pmt_Type, TermsID, Tax1099, ParentID, ParentFlag, License, EO_Carrier, EO_PolicyID, EO_Limits, PrincipalID, CountyID, \n" +
//                "                      MktTerritory, BranchID, ApplicationDate, TerminatedDate, Sub, Last_Visit, TargetVolume, CollectTax, MapToID, AcctingID, AutoKeyID, AwardDate, BestRating, \n" +
//                "                      ConditionCd, EMail, Established, EO_Expiration, LegalName, MailAddress1, MailAddress2, MailCity, MailState, MailZip, MktgGroupID, PaymentTermsID, \n" +
//                "                      PrimaryContactID, StructureID, WebSite, LicenseExpiration, ReferenceID, LastContactDate, ActiveFlag, AcuityKey, SpecialCodes, AllowRenewals, AllowAccounting, \n" +
//                "                      AllowNewBusiness, AllowPolicyServicing, StatusNote, Comment, BillToParent, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgState, AcctgZip, AcctgPhone, AcctgFax, \n" +
//                "                      DateProducerAgreement, DateProducerProfile, ServiceUWID, ClassCode, SourceOfLead, FlagAllowSubProducerPay, FlagPaidByStatement, Taxable, DateAdded, \n" +
//                "                      DateModified, CreatedByID, ModifiedByID, MonthlySvcFee, PaymentMethod, PaidThrough, PaymentStart, Status, PriorAgency, PriorAgencyID, SuspenseReason, \n" +
//                "                      SortName, TermDays, TermFrom, FlagOverRideComp, InvTranCode, NonPremium, FlagChargeServiceFee, IsCP, AvailableMarkets, Territory, CaptiveAgent, \n" +
//                "                      ProfessionalAffiliation, MktRepID, CsrID, ProcessBatchKey_FK, AuthorizedTeams, LOBAccess, CountyName, RollbookDate, CommMethodID, FlagDisplayPopupNote, \n" +
//                "                      AcctgEMail, AcctgContactKey_FK, ContactKey_FK, DateIRFileCreated, FinanceMapCode, FlagExportToFinance, CountryID, MailCountryID, AcctgCountryID, \n" +
//                "                      MembershipKey_FK, MembershipExp, Membership2Key_FK, Membership2Exp, Membership3Key_FK, Membership3Exp, NPR, DandB\n" +
//                "FROM         Producer\n" +
//                "ORDER BY Name") {
//                def row = [:]
//                row['Name'] = it.Name;
//                row['ReferenceID'] = it.ReferenceID;
//                row['ProducerID'] = it.ProducerID;
//                agencies.add(row)
//            }
//        log.info agencies

        [registerError: params.registerError ]
    }
    def registerUser(){
        log.info("begin #registerUser()");
        log.info("params: " + params);

        def userRole = "Broker";
        def error = false;
        def defaultUW = ""
        User u;
        try{
            log.info("begin try to find by email block");
            def userReferenceID = 0;
            def userExistsInAIM = false;
            def aimsql = new Sql(dataSource_aim)

            aimsql.withTransaction {
                aimsql.eachRow("SELECT     NameKeyPK, Name, IDCode, NameTypeID, TypeID, Address1, Address2, City, State, PostalCode, AddressKey, Country, MailAddress1, MailAddress2, MailCity, \n" +
                    "                      MailState, MailPostalCode, MailAddressKey, Phone, Extension, Fax, PhoneAltType, Home, PhoneAltType2, Remarks, Title, OwnerKey_FK, Email, URL, StatusID, \n" +
                    "                      ActiveFlag, SSN_TaxID, FlagPhysicalAddr, FlagAccountingAddr, FlagPrimaryContact, FlagCompany, PositionID, TitleID, Salutation, CreatedByID, DateAdded, \n" +
                    "                      DateModified, SortName, OwnerID, CustomGrpID, FlagContact, PreviousPhone, PreviousFax, AcctExec, CsrID, AcctExecName, CsrName, OtherGroupID, \n" +
                    "                      FlagUseOwnerPhone, FlagUseOwnerFax, FlagUseOwnerAddress, MktRepID, MktRepName, CommMethodID, AcctgEMail, MobilePhone, PhoneOther, ExchangeKey_FK, \n" +
                    "                      FlagPhoneBookOnly, LicenseNbr, UserField1, ModifiedByID, MapToID, NameTypeSubID, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgPostalCode, AcctgState, \n" +
                    "                      Flag1099, GLAcct, DefaultInvAmt, Terms, DefaultInvDescription, Contact, AcctgPhone, AcctgFax, DefaultInvBasis, FlagMonthlyPayment, FlagOneTime, \n" +
                    "                      LastStatementKey_FK, CountryID, MailCountryID\n" +
                    "FROM         taaNameMaster\n" +
                    "WHERE     (Email = '${params.email}')") {
                log.info "Broker is in AIM"
                userExistsInAIM = true;
                log.info "about to assign it.NameKeyPK..."
                userReferenceID = it.NameKeyPK
                }
                log.info("finished email lookup loop");
            }

            if(userExistsInAIM){
                log.info("userExistsInAIM: true");
            }
            else{
                log.info("user not in AIM. begin aimsql.call...");
                aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
                    log.info "userReferenceID $num"
                    userReferenceID = num
                }
                def now = new Date()
                def timestamp = now.format(dateFormat, timeZone)

                log.info("begin aimsql.execute insert");
                aimsql.withTransaction {
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
                        "  ('${params.firstName} ${params.lastName}', 'I', ${userReferenceID}, '${params.agencyID}', 'A', NULL, NULL, \n" +
                        "   NULL, NULL, NULL, NULL, NULL, NULL, NULL, \n" +
                        "   NULL, NULL, NULL, NULL, NULL, NULL, \n" +
                        "   NULL, NULL, NULL, NULL, NULL, NULL, \n" +
                        "   '', NULL, ${params.agencyPIN}, '${params.email}', NULL, NULL, 'Y', \n" +
                        "   NULL, NULL, NULL, NULL, \n" +
                        "   NULL, NULL, NULL, '${params.firstName}', 'jason', '${timestamp}', \n" +
                        "   '${timestamp}', NULL, NULL, NULL, NULL, \n" +
                        "   NULL, NULL, NULL, 'N', \n" +
                        "   NULL, NULL)"
                    log.info("ending aim execute. begin aim commit.")
                    aimsql.commit();
                    log.info("ending aim commit");
                }
            }

            log.info("begin create user");
            u = new User(userRole:userRole, email:params.email, password:params.password.encodeAsBcrypt(),
                    company:params.agencyID, firstName: params.firstName, lastName: params.lastName, phoneNumber: params.phoneNumber, defaultUnderwriter: "",aimContactID:userReferenceID)
            u.save(flush: true, failOnError: true)
            log.info("end create user" + u.password);



//            def http = new HTTPBuilder( 'http://104.131.41.129:3000/register' )
//            def postBody = [email: params.email, pw: params.password, producerID: params.company, nameKeyPK: userReferenceID] // will be url-encoded
//
//            http.post( path: '/register', body: postBody,
//                    requestContentType: URLENC ) { resp ->
//
//                log.info "POST Success: ${resp.statusLine}"
////                assert resp.statusLine.statusCode == 201
//            }
        }

        catch(Exception e){
            error=true;
            log.info("exception caught: " + e)
            if(portal.User.findWhere(email:params.email) ){
                log.info("User with that email already exists.")
            }
            redirect(controller:'auth', action:'register', params: [registerError: "User with that email already exists"])
        }

        if(error==false) {

            session.user = u;
            log.info("user: " + u)
            redirect(controller: 'main', action: 'index')
        }

    }



    def changePassword(){
        log.info("PASSWORD CHANGE")
        log.info("params: " + params)

        log.info("session user: " + session.user.password)

        def renderString = ""

        log.info("checking password...");
        if(bcryptService.checkPassword(params.currentPass, session.user.password)){
            log.info("current password verified");
            try{
                def userRecord = User.findWhere(email:session.user.email)  // ,password:userRecord.password
                userRecord.password = params.newPass.encodeAsBcrypt();
                userRecord.save(flush: true, failOnError: true)

                session.user = null;
//                redirect(url: "/")

                def user = User.findWhere(email:userRecord.email) // ,password:userRecord.password
                session.user = user

                renderString = "Password updated."


            }
            catch (Exception e) {
                StringWriter sw = new StringWriter();
                e.printStackTrace(new PrintWriter(sw));
                String exceptionAsString = sw.toString();
                log.info("Error Details - " + exceptionAsString)
                log.info("error")
                renderString = (exceptionAsString)
            }

        }
        else{
            log.info("wrong password")
            renderString = "Incorrect current password."

        }
        log.info("renderString returned... " + renderString);
        render renderString
    }



    def login(){
        log.info("LOGGING IN")
        log.info("Params: " + params)
        request.getHeaderNames().each {
            log.info(it+":"+request.getHeader(it))
        }

        def user = User.findByEmail(params.email);

        if(user) {
            log.info("User found.");
            
            // check if hashed password in database
            try {
                if(bcryptService.checkPassword(params.password, user.password)) {
                }
            }
            // catch unencrypted passwords and encrypt
            catch (IllegalArgumentException illegalArgument) {
                log.info("Password not encrypted. Encrypting...");
                user.password = user.password.encodeAsBcrypt();
                user.merge(flush:true);
                log.info("... saved.");
            }
            

            // check entered password against encrypted password in database
            if(bcryptService.checkPassword(params.password, user.password)) {
                log.info("Encrypted password authenticated.");
                session.user = user;
                log.info("Logged In: " + session.user);
                
                // FIX AIM CONTACT ID IF NULL
                if(session.user.aimContactID == null){
                    aimSqlService.fixUserAimContactID(submissionMap.brokerEmail)
                }

                redirect(controller:'main',action:'index');
                return;
            }
        } 
        
        // display friendly message for incorrect credentials
        log.info("No user found or incorrect password.");
        flash.error = "Invalid Email/Password";
        redirect(controller:'auth',action:'index');
    }

    def logout(){
        log.info("LOGGING OUT")
        session.user = null;
        log.info("User session info: " + session.user)
        log.info "Logged Out"
        redirect(url: "/")
    }

    def insertUserIntoAIMPhoneBook(){

    }

    def createSessionForLegacyNeeis(){
        def http = new HTTPBuilder( 'http://104.131.41.129:3000/redirect' )
        def postBody = [email: "test15@test.com", password: "newpassword"] // will be url-encoded

        http.post( path: '/redirect', body: postBody,
                requestContentType: URLENC ) { resp ->

            log.info "POST Success: ${resp.statusLine}"
//                assert resp.statusLine.statusCode == 201
        }

        render "good"
    }

    def checkEmail(){
        log.info "CHECKING EMAIL"
        log.info("Params: " + params)
        def renderString = "";
        if(User.findWhere(email:params.email) ){
            renderString = "Error:User with that email already exists."
            log.info renderString
        }
        else{
            renderString = "OK:Email/Username is available"
            log.info renderString
        }
        render text: renderString;
    }

    def getAppointed() {
    }

    def sendGetAppointedEmail(mailService) {
        def content = groovyPageRenderer.render(view: '/emails/getAppointedEmail')
        mailService.sendMail {
            multipart true
            to "${params.contactEmail}"
            cc "travis@neeis.com" // dev only, change for production
            from "service@neeis.com"
            subject "NEEIS Broker Appointment Application"
            html(content)
            attachBytes 'NEEIS_Broker_Contract.pdf','application/pdf', new File('./web-app/attachments/NEEIS_Broker_Contract.pdf').readBytes()
        }
        mailService.sendMail {
            to "travis.smith@mac.com" // dev only, change for production
            subject "NEEIS Appointment Information Request Notification"
            body "An email with appointment information has been sent to the following agency:\n\n" +
                "Agency Name: ${params.agency}\n" +
                "Agency Contact: ${params.agencyContact}\n" +
                "Agency Address: ${params.agencyStreet}, ${params.agencyCity}, ${params.agencyState}" + " ${params.agencyZipCode}\n" +
                "Contact Email: ${params.contactEmail}\n" +
                "Phone: ${params.agencyPhone}\n\n" +
                "Thank you."
        }
        redirect(url: "/auth/appointmentRequestThanks");
    }

    def appointmentRequestThanks() {}

    def forgotPassword() {}

    def sendPasswordResetEmail() {
        def user = User.findWhere(email:params.email)
        if(user){
            def token = Token.findByEmail(user.email)
            if(!token) {
                token = new Token(email: user.email)
                token.save(flush: true);
            }
                mailService.sendMail {
                to "travis@neeis.com" //dev only, change for production -- change to ${user.email}
                subject "NEEIS Password Reset"
                // dev only, change URL link for production 
                body "A request has been made to reset your NEEIS user password. Click the link below to create a new password...\n\n" +
                    "http://localhost:8080/auth/resetPassword?e=" + user.email + "&t=" + token.value + "\n\n" +
                    "This link will expire in 24 hours.\n\n" +
                    "Thank you!\n\n" +
                    "New Empire Entertainment Insurance Services\n" +
                    "1216 Hermosa Avenue, Suite A\n" +
                    "Hermosa Beach, CA 90254"
            }
            flash.notice = "Check your email for a link to reset your password.";
            redirect(controller:'auth',action:'passwordEmailConfirmation');
        } else {
            flash.error = "Email address not found.";
            redirect(controller:'auth',action:'forgotPassword');
        }   
    }

    def resetPassword() {
        log.info("#auth.resetPassword params:" + params)
        def token = Token.findByEmail(params.e)
        log.info("token: " + token)
        if(token && (token.value == params.t) && (token.isActive())) {
            log.info("token valid, rendering form")
            [email: params.e, token: params.t]    
        } else {
            render(view:'invalidToken');
        }
    }

    def passwordEmailConfirmation() {}

}
