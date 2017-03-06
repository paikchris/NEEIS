package portal

import groovy.sql.Sql

class AdminController {
    def dataSource_aim
    def beforeInterceptor = [action: this.&checkUser]


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
    def data() {
        log.info "DATA MANAGEMENT"
        log.info params

        def riskCategories = RiskCategory.list();
        def riskCategoryColumns = riskCategories[0].domainClass.persistentProperties*.name

        def riskTypes = RiskType.list();
        def subCategories = RiskType.findAllWhere(subCategoryFlag: "Y")


        [user: session.user, riskCategories:riskCategories, subCategories:subCategories, riskTypes:riskTypes ]
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
        }


        render 'good'
    }

}
