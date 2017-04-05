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

    def index() {
    }
    def iesupport(){

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
        log.info("REGISTERING USER")
        log.info params;

        def userRole = "Broker";
        def error = false;
        def defaultUW = ""
        User u;
        try{
            def userReferenceID = 0;
            aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
                log.info "userReferenceID $num"
                userReferenceID = num
            }

            u = new portal.User(userRole:userRole, email:params.email, password:params.password,
                    company:params.company, firstName: params.firstName, lastName: params.lastName, phoneNumber: params.phoneNumber, aimContactID:userReferenceID)
            u.save(flush: true, failOnError: true)


            def now = new Date()
            def timestamp = now.format(dateFormat, timeZone)

            Sql aimsql = new Sql(dataSource_aim)



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
                    "   '', NULL, ${params.agencyPIN}, NULL, NULL, NULL, 'Y', \n" +
                    "   NULL, NULL, NULL, NULL, \n" +
                    "   NULL, NULL, NULL, '${params.firstName}', 'jason', '${timestamp}', \n" +
                    "   '${timestamp}', NULL, NULL, NULL, NULL, \n" +
                    "   NULL, NULL, NULL, 'N', \n" +
                    "   NULL, NULL)"
            aimsql.commit();

            def http = new HTTPBuilder( 'http://104.131.41.129:3000/register' )
            def postBody = [email: params.email, pw: params.password, producerID: params.company, nameKeyPK: userReferenceID] // will be url-encoded

            http.post( path: '/register', body: postBody,
                    requestContentType: URLENC ) { resp ->

                log.info "POST Success: ${resp.statusLine}"
//                assert resp.statusLine.statusCode == 201
            }
        }
        catch(Exception e){
            error=true;
            log.info(e)
            if(User.findWhere(email:params.email) ){
                log.info("User with that email already exists.")
            }
            redirect(controller:'auth', action:'register', params: [registerError: "User with that email already exists"])
        }

        if(error==false){
            session.user = u
            log.info(u)
            redirect(controller:'main', action:'index')
        }

    }

    def check(){
        log.info params
        log.info "Checking Session"
        log.info "Session = " + session.user

        if(!session.user){
            //i.e. user not logged in
                log.info("Not logged in")
                redirect(controller:'auth', action:'login')
                return false


        }
        else{
            return true;
        }
    }

    def resetPassword(){
        log.info("PASSWORD RESET ACTION1")
        log.info(params)

        log.info("session user: " + session.user.password)

        def renderString = ""

        if(params.currentPass == session.user.password){
            try{
                def userRecord = User.findWhere(email:session.user.email, password:params.currentPass);
                log.info (userRecord.email)
                log.info (userRecord.password)
                userRecord.password = params.newPass;
                userRecord.save(flush: true, failOnError: true)
                log.info (userRecord.password)

                session.user = null;
//                redirect(url: "/")

                def user = User.findWhere(email:userRecord.email, password:userRecord.password)
                session.user = user

                renderString = "good"


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
            renderString = "wrong password"

        }
        log.info "render final error"
        render renderString

    }



    def login(){
        log.info("LOGGING IN")
        log.info(params)
        request.getHeaderNames().each {
            log.info(it+":"+request.getHeader(it))
        }

        def user = User.findWhere(email:params.email, password:params.password)


        session.user = user
        log.info(user)

        if (user){
            log.info "Logged In"
            redirect(controller:'main',action:'index')

        }
        else{
            log.info "Log In Fail"
            redirect(controller:'auth',action:'index')
        }




    }
    def logout(){
        println "LOGOUT"
        session.user = null;
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
}
