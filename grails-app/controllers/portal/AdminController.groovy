package portal

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
    def data() {
        log.info "DATA MANAGEMENT"
        log.info params

        def riskCategories = RiskCategory.list();
        def riskCategoryColumns = riskCategories[0].domainClass.persistentProperties*.name

        def riskTypes = RiskType.list();
        def subCategories = RiskType.findAllWhere(subCategoryFlag: "Y")

        def products = Products.list();

        def coverages = Coverages.list();


        [user: session.user, riskCategories:riskCategories, subCategories:subCategories, riskTypes:riskTypes, products:products, coverages:coverages ]
    }

    def saveRiskTypeChanges(){

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
