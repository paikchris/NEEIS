package portal

import grails.util.Environment
import groovy.xml.*
import net.sf.json.JSON
import org.apache.commons.lang.StringUtils
import wslite.soap.*
import wslite.http.auth.*
import com.google.gson.JsonObject
import com.google.gson.Gson
import groovy.sql.Sql
import helper.Utils;
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import groovy.json.JsonBuilder
import java.text.DecimalFormat
import portal.DAO.*
import java.text.SimpleDateFormat;
import java.text.NumberFormat;
import org.apache.commons.net.ftp.FTPClient
import org.apache.commons.net.ftp.FTP;
import sun.misc.BASE64Decoder;
import portal.Utils.FileTransferHelper;
import portal.Utils.TestDataHelper;
import portal.Utils.ProductHelper;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.StringEscapeUtils;

class CertController {
    def beforeInterceptor = [action: this.&checkUser]
    def grailsLinkGenerator

    def dataSource_aim
    AIMSQL aimDAO = new AIMSQL();
    Intelledox intelledoxHelper = new Intelledox();
    TestDataHelper testDataHelper = new TestDataHelper();
    ProductHelper productHelper = new ProductHelper();

    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
    def dateSimple = 'MM/dd/yyyy'

    def checkUser() {
        println "CHECK USER"
        println params
        AuthController ac = new AuthController()
        def isLoggedIn = ac.checkAJAXRequest()

        if (isLoggedIn) {
        } else {
            render "Session Expired," + grailsLinkGenerator.serverBaseURL + "/auth/login"

            return false
        }
    }

    def downloadCert = { 
        log.info("DOWNLOADING CERT")
        log.info params
        Sql aimsql = new Sql(dataSource_aim)
        try{
            def certDateFormat = 'MM/dd/yyyy'
            def now = new Date()
            def timestamp = now.format(certDateFormat, timeZone)


            params['date']= timestamp;

            def submissionInfo = Submissions.findAllByAimQuoteID(params.quoteID,[sort: "submitDate",order: "asc"])


            log.info submissionInfo

            def record = [:]

//            aimsql.eachRow( "SELECT * FROM dvVersionView WHERE QuoteID = '" + params.quoteID + "' ORDER BY Version ASC") {
//                log.info it
////            QuoteID:0620057, Version:A, VersionCompanyID:RM0057, ProductID:BARCPKGP, Premium:1234.0000, Non_Premium:[null], Misc_Premium:[null],
////            NonTax_Premium:[null], QuoteExpires:[null], Financed:Y, Taxed:Y, MEP:, Rate:, GrossComm:0.0, AgentComm:0.0, Coinsure:, SubmitDate:[null],
////            SubmitPOC:[null], MarketID:SAFELL, VerOriginal:A, StatusID:QO, CoverageName:Barbican Film GL-NOAL Annual CPkg,
////                    CompanyName:Lloyd's of London / Barbican Syndicate 1955, CompanyFax:[null], CompanyPhone:, MarketName:Safeonline LLP, MarketFax:, ' +
////                    'MarketPhone:4402079544410, ProposedEffective:1900-01-01 00:00:00.0, ProposedExpiration:1900-01-01 00:00:00.0, TotalTax:0.0000, ' +
////                    'TotalFees:0.0000, Total:1234.0000, VersionID:0620057A   , TerrorActPremium:[null], TerrorActStatus:WAIVED, MarketContactKey_FK:[null], NAIC:[null]
//                record['QuoteID'] = it.QuoteID
//                record['Version'] = it.Version
//                record['ProductID'] = it.ProductID
//                record['CoverageName'] = it.CoverageName
//                record['VersionCompanyID'] = it.VersionCompanyID
//                record['CompanyName'] = it.CompanyName
//                record['Premium'] = it.Premium
//                record['GrossComm'] = it.GrossComm
//                record['AgentComm'] = it.AgentComm
//                record['MarketID'] = it.MarketID
//                record['VerOriginal'] = it.VerOriginal
//                record['StatusID'] = it.StatusID
//                record['MarketName'] = it.MarketName
//                record['MarketFax'] = it.MarketFax
//                record['MarketPhone'] = it.MarketPhone
//                record['CompanyName'] = it.CompanyName
//                record['ProposedEffective'] = it.ProposedEffective
//                record['ProposedExpiration'] = it.ProposedExpiration
//                record['TotalTax'] = it.TotalTax
//                record['TotalFees'] = it.TotalFees
//                record['Total'] = it.Total
//                record['VersionID'] = it.VersionID
//                record['TerrorActPremium'] = it.TerrorActPremium
//                record['TerrorActStatus'] = it.TerrorActStatus
//            }



//            SELECT     QuoteID, VerOriginal, Version, LobID, LobSubID, CompanyID, ProductID, Premium, Non_Premium, Misc_Premium, NonTax_Premium, Quoted, Expires, Limits, Subject,
//                       Endorsement, Financed, Taxed, MEP, Rate, GrossComm, AgentComm, Brokerage, Deductible, CoInsure, StatusID, ReasonID, SubmitDate, SubmitPOC, MarketID,
//                       Apportionment, Tax1, Tax2, Tax3, Tax4, FormID, RateInfo, Indicator, PendingSuspenseID, CommPaid, AggregateLimits, DeductibleVal, BoundFlag, DirectBillFlag,
//                       ProposedEffective, ProposedExpiration, ProposedTerm, Retroactive, RetroPeriod, UnderLyingCoverage, MultiOption, MiscPrem1, MiscPrem2, MiscPrem3, NonTax1,
//                       NonTax2, NonPrem1, NonPrem2, PaymentRecv, PremDownPayment, Valuation, Retention, AIM_TransDate, InvoiceCodes, TaxDistrib, PremDistrib, CAP_Limit,
//                       EPL_Limit, TakenOut_RatedTerm, PolicyTerm, PolicyForm, BillToCompanyID, StatementKey_FK, PaymentKey_FK, CommRecvd, VersionID, MarketContactKey_FK, TIV,
//                       CompanyFees, UnderLyingLimitsSum, PunitiveDamage, ThirdPartyLimits, AnnualPremium, AnnualFees, FlagCollectMuniTax, TrueExpire, WrittenLimits, AttachPoint,
//                       LineSlip, CoverageFormID, PositionID, LobDistrib, TotalTax, Total, TotalAmount, TaxesPaidBy, ResubmitDate, FeeSchedule, LobDistribSched, DeductType,
//                       PremiumFinanceFee, LOB_Field1, LOB_Field2, LOB_Field3, LOB_Flag1, LOB_Prem1, LOB_Prem2, LOB_Prem3, LOB_Limit1, LOB_Limit2, LOB_Limit3, LOB_Limit4,
//                       LOB_Limit5, LOB_Limit6, LOB_Deduct1, LOB_Deduct2, LOB_Limit1Value, LOB_Limit2Value, LOB_Limit3Value, LOB_Limit4Value, LOB_Limit5Value, LOB_Limit6Value,
//                       LOB_Deduct1Value, LOB_Deduct2Value, TaxesPaidByID, FlagMultiStateTax, MultiStateDistrib, AdmittedPremium, RatedPremium, APR, AmountFinanced,
//                       DownPayment, Payments, FinCharge, TotalPayment, NumPayments, FinanceDueDate, ReferenceKey_FK, RemitAmount, CollectAmount, DownFactor,
//                       TerrorActPremium, TerrorActGrossComm, TerrorActAgentComm, TerrorActMEP, TerrorActStatus, FlagOverrideCalc, TerrorTaxes, FlagFinanceWithTRIA, FlagMultiOption,
//                       FlagFeeCalc, ParticipantCo1ID, ParticipantCo2ID, ParticipantCo3ID, UserDefinedStr1, UserDefinedStr2, UserDefinedStr3, UserDefinedStr4, UserDefinedDate1,
//                       UserDefinedValue1, LOB_Coverage1, LOB_Coverage2, LOB_Coverage3, LOB_Coverage4, LOB_Coverage5, LOB_Coverage6, LOB_DeductType1, LOB_DeductType2,
//                       DeclinationReasonID, ERPOption, ERPDays, ERPPercent, ERPPremium, TaxwoTRIA1, TaxwoTRIA2, TaxwoTRIA3, TaxwoTRIA4, LOB_Prem4, LOB_Coverage7,
//                       LOB_Coverage8, LOB_Limit7, LOB_Limit8, LOB_Limit7Value, LOB_Limit8Value, LOB_Prem5, LOB_Prem6, LOB_Prem7, LOB_Prem8, CoverageList,
//                       DocucorpFormList, TerrorActPremium_GL, FlagRecalcTaxes, DateMktResponseRecvd, CancelClause, PremiumProperty, PremiumLiability, PremiumOther,
//                       EndorsementKey_FK, DefaultRiskCompanyID, MarketPOCKey_FK, ExcludedFinPrem, AggregateLimitsTemp, RetentionTemp, RetentionTemp2, RetentionValue,
//                       Tax1Name, Tax2Name, Tax3Name, Tax4Name, AgentDeposit, EndorseForms, TaxwoTRIA5, Tax5, Tax5Name, LOB_Coverage9, LOB_Limit9, LOB_Limit9Value,
//                       LOB_Prem9, FeeSchedule2, TaxwoTRIA6, Tax6Name, TaxwoTRIA7, Tax7Name, TaxwoTRIA8, Tax8Name, Tax6, Tax7, Tax8, InsuredDeposit, CopiedFrom,
//                       InstallmentPlanID, DownPaymentAmt, Installments, FrequencyID, InstallmentFee, InstallmentFeeID, AgentDepositwoTRIA, InsuredDepositwoTRIA, InstallFeeInfo,
//                       InstallFeeInvKey, InstallmentFeeFirst
//            FROM         Version
//            WHERE     (QuoteID = '0623019')
//            aimsql.eachRow( "SELECT *  " +
//                    "FROM Version " +
//                    "WHERE QuoteID='" + params.quoteID + "'") {
//                log.info "Quote Record =========== " + it
//                record['Limits'] = it.Limits
//                record['Deductible'] =  it.Deductible
//            }





//        WHERE     (QuoteID IN ('0622031', '0622032', '0622033', '0622034')) AND (CoverageID IN ('CPK', 'CGL')) AND (StatusID IN ('BND', 'BND', 'PIF'))
            aimsql.eachRow( "SELECT TOP (1) *  " +
                    "FROM dbo.Quote with (NOLOCK) " +
                    "WHERE QuoteID='" + params.quoteID +
                    "' ORDER BY  QuoteID ASC") {
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
                record['AccountKey_FK'] = it.AccountKey_FK
                record['CompanyID'] = it.CompanyID
                record['Effective'] = it.Effective
                record['Expiration'] = it.Expiration

                record['SubmitGrpID'] = it.SubmitGrpID
            }

            def insuredMap = [:]
            aimsql.eachRow( "SELECT *  FROM dbo.Insured with (NOLOCK) WHERE InsuredID='" + record['InsuredID'] +
                    "' ORDER BY  InsuredID ASC") {
                log.info "Insured Record =========== " + it
                record['InsuredPhone'] = it.Phone
                record['InsuredEmail'] = it.EMail
                record['InsuredWebsite'] = it.Website
                record['MailAddress1'] = it.MailAddress1
                record['MailCity'] = it.MailCity
                record['MailState'] = it.MailState
                record['MailZip'] = it.MailZip
                record['TableKey_FK'] = 17561  //DOESN'T CHANGE?
                record['ContactID'] = it.ContactID
                log.info "CONTACT ID = " + record['ContactID']
                //AccountKey_FK = 87533
//        TableKey_FK=17561 (Constant)
                //ContactID=3631 (Use as NameKeyPK)
            }

            aimsql.eachRow( "SELECT *  FROM Company with (NOLOCK) " +
                    "WHERE CompanyID='" + record['CompanyID'] + "'") {
                record['companyName'] = it.Name
                record['companyNAIC'] = it.NAIC //NAIC needs to be entered in AIM
            }


//            SELECT     TOP (1) ReferenceID, RecordKey_PK, TableKey_FK, Description, ProdType, PolTerm, NameOfProduction, Contact, ContactEmail, ContactPhone, ContactFax, BusType,
//        PhysicalAddress, YearsExperience, Terms, Budget, KeyPersonnel, ProposedDate, PPDates, BioResume, BioResumeStunt, Script, NamedInsureds, Risks,
//        ProductionTypes, OtherProdDesc, MediaType, ViewFrequency, Locations, Principals, NoProdsPerYear, MaxCostOneProd, PostForOthers, Officers, PhotographyStart,
//        PhotographyEnd, PayrollCompany, SourceOfFinance, Website, Losses, STUNTS, StuntQ, PYROS, PyroQ, ColdSoreQ, Health, Warranty, VetCert, ACORD, Effective,
//        Expires, DriverName, DriverLicNo, RentalHouse, RentalHouseAddr, RentalStart, RentalEnd, EXPLAIN, FEINSSN, WC_SchedMod, SystemReq
//        FROM         tud_UWInfo
//        WHERE     (ReferenceID = '87533') AND (TableKey_FK = '17561')
            def tudUWInfoMap = [:]
            aimsql.eachRow( "SELECT TOP (1) *  " +
                    "FROM tud_UWInfo with (NOLOCK) " +
                    "WHERE (ReferenceID = '${record['AccountKey_FK']}') AND (TableKey_FK = '${record['TableKey_FK']}') " ){
                record['ContactPhone'] = it.ContactPhone
                record['ContactFax'] = it.ContactFax
                record['ContactEmail'] = it.ContactEmail
                log.info "CONTACT INFO = " + it
            }
            if(record['ContactPhone'] == null){
                record['ContactPhone'] = session.user.phoneNumber

                log.info record['ContactPhone']
                record['ContactPhone'] = String.format("(%s) %s-%s", record['ContactPhone'].substring(0, 3), record['ContactPhone'].substring(3, 6),
                        record['ContactPhone'].substring(6, 10));

            }
            if(record['ContactFax'] == null){
                record['ContactFax'] = ""
            }
            if(record['ContactEmail'] == null){
                record['ContactEmail'] = session.user.email
            }

//            SELECT     TOP (1) NameKeyPK, Name, IDCode, NameTypeID, TypeID, Address1, Address2, City, State, PostalCode, AddressKey, Country, MailAddress1, MailAddress2, MailCity,
//        MailState, MailPostalCode, MailAddressKey, Phone, Extension, Fax, PhoneAltType, Home, PhoneAltType2, Remarks, Title, OwnerKey_FK, Email, URL, StatusID,
//        ActiveFlag, SSN_TaxID, FlagPhysicalAddr, FlagAccountingAddr, FlagPrimaryContact, FlagCompany, PositionID, TitleID, Salutation, CreatedByID, DateAdded,
//        DateModified, SortName, OwnerID, CustomGrpID, FlagContact, PreviousPhone, PreviousFax, AcctExec, CsrID, AcctExecName, CsrName, OtherGroupID,
//        FlagUseOwnerPhone, FlagUseOwnerFax, FlagUseOwnerAddress, MktRepID, MktRepName, CommMethodID, AcctgEMail, MobilePhone, PhoneOther, ExchangeKey_FK,
//        FlagPhoneBookOnly, LicenseNbr, UserField1, ModifiedByID, MapToID, NameTypeSubID, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgPostalCode, AcctgState,
//        Flag1099, GLAcct, DefaultInvAmt, Terms, DefaultInvDescription, Contact, AcctgPhone, AcctgFax, DefaultInvBasis, FlagMonthlyPayment, FlagOneTime,
//        LastStatementKey_FK, CountryID, MailCountryID
//        FROM         taaNameMaster
//        WHERE     (NameKeyPK = '36311')
            def taaNameMasterMap = [:]
            if(record['ContactID'] == null){

            }
            else{
                aimsql.eachRow( "SELECT TOP (1) *  " +
                        "FROM taaNameMaster with (NOLOCK) " +
                        "WHERE (NameKeyPK = '${record['ContactID']}')" ){

                }
            }


            def companyMap = [:]
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
                    "FROM         Producer with (NOLOCK) \n" +
                    "WHERE     (ProducerID = 'AGT007')") {

                companyMap['Name']=it.Name
            }

//            params['producer']= session.user.firstName + " " + session.user.lastName;
            params['producer']= "Truman Van Dyke Company"
            params['producerAddress']= "6767 Forest Lawn Drive, #301\n" +
                    "Los Angeles, CA 90068";


            params['insured']= record['NamedInsured']
            params['insuredAddress']= "${record['MailAddress1']}\n" +
                    "${record['MailCity']}, ${record['MailState']} ${record['MailZip']}";
            params['contactName']= record['Attention']
            params['contactPhone']= record['ContactPhone']
            params['contactFax']= record['ContactFax']
            params['contactEmail']= record['ContactEmail']
            params['insurer']= record['companyName']
            params['NAIC']= record['companyNAIC']
            params['certificateNumber']= ""  //LEAVING BLANK FOR NOW
            params['revisionNumber']= ""     //LEAVING BLANK FOR NOW


            //INITIALIZE ALL VALUES FIRST
            params['insrltrOther']= ""
            params['riskType']= ""
            params['otherAddl']= ""
            params['otherSubr']= ""
            params['otherPolicyNumber']= ""
            params['otherStart']= ""
            params['otherEnd']= ""
            params['otherLimit']= ""
            params['insrltrGen']= ""
            params['cbGenCommercialGeneralLiability']= ""
            params['cbGenClaimsMade']= ""
            params['cbGenOccur']= ""
            params['cbGenPolicy']= ""
            params['cbGenProject']= ""
            params['cbGenLoc']= ""
            params['genAddl']= ""
            params['genSubr']= ""
            params['generalPolicyNumber']= ""
            params['genStart']= ""
            params['genEnd'] = ""
            params['genEachLimit']= ""
            params['genFireLimit']= ""
            params['genMedLimit']= ""
            params['genPersonalLimit']= ""
            params['genAggregateLimit']= ""
            params['genProductsLimit']= ""

            params['insrltrAuto']= ""
            params['cbAutoAny']= ""
            params['cbAutoAllOwned']= ""
            params['cbAutoHiredAuto']= ""
            params['cbAutoPhysicalDamages']= ""
            params['cbAutoScheduledAuto']= ""
            params['cbAutoNonOwnedAuto']= ""

            params['autoAddl']= ""
            params['autoSubr']= ""

            params['autoPolicyNumber']= ""
            params['autoStart']= ""
            params['autoEnd']= ""

            params['autoCombinedSingleLimit']= ""
            params['autoBodilyInjuryPersonLimit']= ""
            params['autoBodilyInjuryAccidentLimit']= ""
            params['autoCombinedSingleLimit'] = ""
            params['autoPropertyDamageLimit'] = ""


            params['insrltrUmbrella']= ""
            params['cbUmbrellaLiab']= ""
            params['cbUmbrellaExcessLiab']= ""
            params['cbUmbrellaDeductible']= ""
            params['cbUmbrellaRetention']= ""

            params['cbUmbrellaOccur']= ""
            params['cbUmbrellaClaimsMade']= ""

            params['umbrellaRetentionLimit']= ""
            params['umbrellaAddl']= ""
            params['umbrellaSubr']= ""

            params['umbrellaPolicyNumber']= ""
            params['umbrellaStart']= ""
            params['umbrellaEnd']= ""
            params['umbrellaEachOccurrenceLimit']= ""
            params['umbrellaAggregateLimit']= ""

            params['insrltrWorkersComp']= ""
            params['cbWorkerCompMemberExcluded']= ""
            params['workersCompDescriptionNH']= ""
            params['workersCompSubr']= ""
            params['workersCompPolicyNumber']= ""

            params['workersCompStart']= ""
            params['workersCompEnd']= ""

            params['cbWorkersCompStatutoryLimits']= ""
            params['cbWorkersCompOther']= ""
            params['workersCompEachAccidentLimit']= ""

            params['workersCompDiseaseEmployeeLimit']= ""
            params['workersCompDiseasePolicyLimit']= ""


            params['additionalRemarks']= ""
            params['certificateHolder']= ""


            if(record['Expiration'] != null){
                params['genEnd']= record['Expiration']
            }
            else {
                params['genEnd'] = ""
            }

            def relatedSubmissions = []
            def relatedSubmissionObj=[:]
            log.info("SUBMIT GROUP ID = " + record['SubmitGrpID'])
            aimsql.eachRow("SELECT QuoteID, CoverageID " +
                    "FROM Quote with (NOLOCK) " +
                    "WHERE (SubmitGrpID = '" + record['SubmitGrpID'] + "') ") {
                relatedSubmissionObj=[:]
                relatedSubmissionObj['aimQuoteID'] = it.QuoteID
                relatedSubmissionObj['coverages'] = it.CoverageID
                relatedSubmissions.push(relatedSubmissionObj)

                log.info it
            }
//            def relatedSubmissions = Submissions.findAllBySubmitGroupID(submissionInfo[0].submitGroupID)
            def tempSubmission;
            def tempQuoteID;
            log.info("ALL RELATED: " + relatedSubmissions)
            params['cpkLOB'] =""
            params['cglLOB'] = ""
            params['epkgLOB'] = ""
            relatedSubmissions.each{
                tempQuoteID = it.aimQuoteID
                log.info "PROCESSING: " + tempQuoteID
                log.info "PROCESSING: " + it.coverages
                aimsql.eachRow( "SELECT  *  " +
                        "FROM Version with (NOLOCK) " +
                        "WHERE QuoteID='" + tempQuoteID + "'") {
                    log.info "Limits Record =========== " + it.Limits
                    record['Limits'] = it.Limits
                    record['Deductible'] = it.Deductible
                }
                aimsql.eachRow( "SELECT TOP (1) *  " +
                        "FROM dbo.Quote with (NOLOCK) " +
                        "WHERE QuoteID='" + tempQuoteID +
                        "' ORDER BY  QuoteID ASC") {
                    if(it.PolicyID == null){
                        record['PolicyID'] = ""
                    }
                    else{
                        record['PolicyID'] = it.PolicyID
                    }

                    try{
                        record['Effective'] =  it.Effective.format(dateSimple, timeZone)
                        record['Expiration'] = it.Expiration.format(dateSimple, timeZone)
                    }
                    catch(Exception e){
                        StringWriter sw = new StringWriter();
                        e.printStackTrace(new PrintWriter(sw));
                        String exceptionAsString = sw.toString();
                        log.info("Error Details - " + exceptionAsString)
                        record['Effective'] =  ""
                        record['Expiration'] = ""
                    }

                }
//                def date = Date.parse("yyyy-MM-dd HH:mm:ss.SSS", dateStr)
//                def timestamp = (Date.parse("yyyy-MM-dd HH:mm:ss.SSS", dateStr)).format(dateSimple, timeZone)
                log.info "STARTING LOB FOR ==== " + it.coverages
                if(it.coverages == "EPKG"){
                    params['insrltrOther']= "A"
                    params['riskType']= "Entertainment Package"
                    params['otherAddl']= ""
                    params['otherSubr']= ""
                    params['otherPolicyNumber']= record['PolicyID']
                    params['otherStart']= record['Effective']
                    params['otherEnd']= record['Expiration']
                    params['otherLimit']= "See Attached" //Needs to allow text


                    //BUILD LOB
                    def limitMap = [:]
                    def deductMap = [:]
                    def limitAmount
                    def limitDesc
                    record['Limits'].split(/\r\n|\n|\r/).each {
                        log.info it
                        limitAmount = it.split('\t').size() > 1 ? it.split('\t')[0] : "";
                        limitDesc = it.split('\t').size() > 1 ? it.split('\t')[1] : it.split('\t')[0];
                        limitDesc = limitDesc.minus("EPKG:")
                        limitMap["${limitDesc}"] = limitAmount;
                    }
                    def deductAmount
                    def deductDesc
                    record['Deductible'].split(/\r\n|\n|\r/).each {
                        log.info it
                        deductAmount = it.split('\t').size() > 1 ? it.split('\t')[0] : "";
                        deductDesc = it.split('\t').size() > 1 ? it.split('\t')[1] : it.split('\t')[0];
                        deductDesc = deductDesc.minus("EPKG:")
                        deductMap["${deductDesc}"] = deductAmount;
                    }

                    def epkgLOB ="";
                    limitMap.each{ k, v ->
                        def tempDeduct = deductMap["${k}"]
                        epkgLOB = epkgLOB + "${k} ;&;${v} ;&;${tempDeduct} ;&&;"
                    }

                    params['epkgLOB'] = epkgLOB



                }
                else if ( it.coverages == "CGL" || it.coverages =="CPK"){
                    params['insrltrGen']= "A"
                    params['cbGenCommercialGeneralLiability']= "X"
                    params['cbGenClaimsMade']= ""
                    params['cbGenOccur']= "X"
                    params['cbGenPolicy']= "X"
                    params['cbGenProject']= ""
                    params['cbGenLoc']= ""
                    params['genAddl']= "Y"

                    if(record['Limits'].contains("Waiver Of Subrogation")){
                        params['genSubr']= "Y"
                    }
                    else{
                        params['genSubr']= ""
                    }


                    //BOUND POLICY INFO
                    if(record['PolicyID'] != null){
                        params['generalPolicyNumber']= record['PolicyID']
                    }
                    else{
                        params['generalPolicyNumber']= ""
                    }

                    if(record['Effective'] != null){
                        params['genStart']= record['Effective']
                    }
                    else{
                        params['genStart']= ""
                    }

                    if(record['Expiration'] != null){
                        params['genEnd']= record['Expiration']
                    }
                    else{
                        params['genEnd']= ""
                    }

//                    $1,000,000	CGL:Each Occurrence
//                    $1,000,000	CGL:General Aggregate Limit
//                    $1,000,000	CGL:Products &amp; Completed Operations
//                    $1,000,000	CGL:Personal &amp; Advertising Injury
//                    $100,000	CGL:Fire Damage (Any One Fire)
//                    CGL:Blanket Additional Insured Endorsement
//                    CGL:Waiver of Subrogation
//                    $5,000	CGL:Additional Charge to Include Medical Payments

                    //LIMIT AMOUNT INFO
                    def limitAmount;
                    def limitDesc;
                    NumberFormat format = NumberFormat.getCurrencyInstance();
                    Number number;
                    def limitTag = "";

                    log.info("STARTING LIMITS")
                    log.info (record['Limits'])
                    record['Limits'].split(/\r\n|\n|\r/).each{
                        limitTag = "";
                        log.info "PROCESSING THIS LIMIT: " + it
                        limitAmount = it.split('\t').size() > 1 ? it.split('\t')[0] : "";
                        limitDesc = it.split('\t').size() > 1 ? it.split('\t')[1] : it.split('\t')[0];

                        log.info(limitDesc + "  -  " + limitAmount)
                        if(StringUtils.containsIgnoreCase(limitDesc, "Each Occurrence")){
                            limitTag = "genEachLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Fire Damage (Any One Fire)")){
                            limitTag = "genFireLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Medical Payments")){
                            limitTag = "genMedLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Personal &amp; Advertising Injury")){
                            limitTag = "genPersonalLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "General Aggregate Limit")){
                            limitTag = "genAggregateLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Products &amp; Completed Operations")){
                            limitTag = "genProductsLimit"
                        }

                        if(limitDesc.length()>0 && limitAmount.matches(".*\\d+.*")){
                            log.info("Assigning: " + limitTag + "  -  " + limitAmount)
                            number = format.parse(limitAmount);
                            params["${limitTag}"]= number.toString()
                            log.info("Assigning: " + limitTag + "  -  " + number.toString())
                        }

                    }


                    //BUILD LOB
                    def limitMap = [:]
                    def deductMap = [:]

                    record['Limits'].split(/\r\n|\n|\r/).each {
                        log.info it
                        limitAmount = it.split('\t').size() > 1 ? it.split('\t')[0] : "";
                        limitDesc = it.split('\t').size() > 1 ? it.split('\t')[1] : it.split('\t')[0];
                        limitDesc = limitDesc.minus("CPK:")
                        limitDesc = limitDesc.minus("CGL:")
                        limitMap["${limitDesc}"] = limitAmount;
                    }
                    def deductAmount
                    def deductDesc
                    record['Deductible'].split(/\r\n|\n|\r/).each {
                        log.info it
                        deductAmount = it.split('\t').size() > 1 ? it.split('\t')[0] : "";
                        deductDesc = it.split('\t').size() > 1 ? it.split('\t')[1] : it.split('\t')[0];
                        deductDesc = deductDesc.minus("CPK:")
                        deductDesc = deductDesc.minus("CGL:")
                        deductMap["${deductDesc}"] = deductAmount;
                    }

                    def cglLOB ="";
                    def tempDeduct;
                    limitMap.each{ k, v ->
                        tempDeduct = deductMap["${k}"]
                        cglLOB = cglLOB + "${k} ;&;${v} ;&;${tempDeduct} ;&&;"
                    }
//                    limitMap.each{
//                        key, value -> log.info "|${key}|";
//                    }
//                    deductMap.each{ k, v ->
//                        log.info "|" + k + "|"
//                        log.info limitMap.containsKey("${k}")
//                        if(limitMap.containsKey("${k}")){
//
//                        }
//                        else{
//                            tempDeduct = deductMap["${k}"]
//                            cglLOB = cglLOB + "${k} ;&; ;&;${tempDeduct} ;&&;"
//                        }
//                    }

                    params['cglLOB'] = cglLOB

                }

                //AUTO INSURANCE
                if(it.coverages =="CPK"){
                    params['insrltrAuto']= "A"
                    params['cbAutoAny']= ""
                    params['cbAutoAllOwned']= ""
                    params['cbAutoHiredAuto']= "X"
                    params['cbAutoPhysicalDamages']= ""
                    params['cbAutoScheduledAuto']= ""
                    params['cbAutoNonOwnedAuto']= "X"

                    params['autoAddl']= ""
                    params['autoSubr']= ""

                    params['autoPolicyNumber']= params['generalPolicyNumber']
                    params['autoStart']= params['genStart']
                    params['autoEnd']= params['genEnd']

                    params['autoCombinedSingleLimit']= ""
                    params['autoBodilyInjuryPersonLimit']= ""
                    params['autoBodilyInjuryAccidentLimit']= ""
                    params['autoPropertyDamageLimit']= ""

                    def limitAmount;
                    def limitDesc;
                    NumberFormat format = NumberFormat.getCurrencyInstance();
                    Number number;
                    def limitTag = "";
                    record['Limits'].split(/\r\n|\n|\r/).each {
                        limitAmount = it.split('\t').size() > 1 ? it.split('\t')[0] : "";
                        limitDesc = it.split('\t').size() > 1 ? it.split('\t')[1] : it.split('\t')[0];
                        if (StringUtils.containsIgnoreCase(limitDesc, "Non-Owned &amp; Hired Auto Liability")) {
                            number = format.parse(limitAmount);
                            params['autoCombinedSingleLimit'] = number.toString()
                        }
                    }
                }

                //UMBRELLA INSURANCE
                params['insrltrUmbrella']= ""
                params['cbUmbrellaLiab']= ""
                params['cbUmbrellaExcessLiab']= ""
                params['cbUmbrellaDeductible']= ""
                params['cbUmbrellaRetention']= ""

                params['cbUmbrellaOccur']= ""
                params['cbUmbrellaClaimsMade']= ""

                params['umbrellaRetentionLimit']= ""
                params['umbrellaAddl']= ""
                params['umbrellaSubr']= ""

                params['umbrellaPolicyNumber']= ""
                params['umbrellaStart']= ""
                params['umbrellaEnd']= ""
                params['umbrellaEachOccurrenceLimit']= ""
                params['umbrellaAggregateLimit']= ""


                //WORKERS COMP INSURANCE
                params['insrltrWorkersComp']= ""
                params['cbWorkerCompMemberExcluded']= ""
                params['workersCompDescriptionNH']= ""
                params['workersCompSubr']= ""
                params['workersCompPolicyNumber']= ""

                params['workersCompStart']= ""
                params['workersCompEnd']= ""

                params['cbWorkersCompStatutoryLimits']= ""
                params['cbWorkersCompOther']= ""
                params['workersCompEachAccidentLimit']= ""

                params['workersCompDiseaseEmployeeLimit']= ""
                params['workersCompDiseasePolicyLimit']= ""
            }

//            submissionInfo[0].submitGroupID
//            params['insrltrGen']= "A"

            /*]


            <insrltrOther>A</insrltrOther>
            <riskType>n</riskType>
            <otherAddl>Y</otherAddl>
            <otherSubr>Y</otherSubr>
            <otherPolicyNumber>n</otherPolicyNumber>
            <otherStart>n</otherStart>
            <otherEnd>n</otherEnd>
            <otherLimit>1</otherLimit>

            <additionalRemarks>Remarks</additionalRemarks>
            <certificateHolder>Cert Holder</certificateHolder>
             */
            log.info params.h
            params['additionalRemarks']= params.r
            params['certificateHolder']= params.h


            //GENERATE CERT AND SAVE IT TO LOCAL AND AIM SERVER
            def pathToCert = intelledoxHelper.createCertPDF(params, dataSource_aim);

            def certFile = new File(pathToCert)
            if (certFile.exists()) {
                log.info("building response" + certFile.exists())
                response.setContentType("application/octet-stream") // or or image/JPEG or text/xml or whatever type the file is
                response.setHeader("Content-disposition", "attachment;filename=\"${certFile.name}\"")
                log.info("cert file: " + certFile.name)
                response.outputStream << certFile.bytes
                log.info "done"
//                    render certFile.bytes
            }
            else{
                render "Error!" // appropriate error handling
            }
        }
        catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
        }

    }
}