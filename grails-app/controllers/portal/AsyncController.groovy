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
import portal.Utils.GORMHelper;
import portal.Utils.Email;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.StringEscapeUtils;

class AsyncController {
    def jsonSerial
    def dataSource_aim
    def mailService
    def beforeInterceptor = [action: this.&checkUser]
    def grailsLinkGenerator
    def AIMDBService

    def jsonSlurper = new JsonSlurper()
    def jsonOutput = new JsonOutput()



    PdfBox pdfHelper = new PdfBox()
    AIMSQL aimDAO = new AIMSQL();
    Email emailHelper = new Email()
    Intelledox intelledoxHelper = new Intelledox();
    TestDataHelper testDataHelper = new TestDataHelper();
    GORMHelper gormHelper = new GORMHelper();
    ProductHelper productHelper = new ProductHelper();

    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
    def dateSimple = 'MM/dd/yyyy'



    def checkUser() {
        println "CHECK USER"
        println params
        AuthController ac = new AuthController()
        def isLoggedIn = ac.checkAJAXRequest()

        if(isLoggedIn){
        }
        else{
            render "Session Expired," + grailsLinkGenerator.serverBaseURL + "/auth/login"



            return false
        }
    }

    def getProductsForCoverageV2(){
        log.info("GETTING PRODUCTS FOR COVERAGE V2")
        log.info(params);
        Sql aimsql = new Sql(dataSource_aim)
        productHelper.testLogicLoad();

        def submissionDetailMap = new JsonSlurper().parseText(params.dataMap)

        def riskProducts = RiskType.findWhere(riskTypeName: params.riskType)

        def coveragesAndProducts = new JsonSlurper().parseText(riskProducts.products)


        def returnArray = productHelper.getProductsForRisk(coveragesAndProducts, submissionDetailMap);

        def jsonResponse = JsonOutput.toJson(returnArray)
        log.info JsonOutput.prettyPrint(jsonResponse)

        render JsonOutput.prettyPrint(jsonResponse)
    }

    def getProductsForCoverage() {
        //GETTING LIST OF PRODUCTS AVAILABLE FOR EACH COVERAGE AVAILABLE FOR SUBMISSION RISK TYPE

        log.info("GETTING PRODUCTS FOR COVERAGE")
        log.info(params);


        Sql aimsql = new Sql(dataSource_aim)

        def renderString = "";
        def riskCoverages = RiskType.findWhere(riskTypeName: params.riskType)
        def coveragesAvailableCodesArray
        def termLength = params.proposedTermLength.split(" ")[0]
        if (riskCoverages.coverages) {
            log.info ("ALL COVERAGES ==== " + riskCoverages.coverages);
            coveragesAvailableCodesArray = riskCoverages.coverages.split(",");
            log.info coveragesAvailableCodesArray;
            coveragesAvailableCodesArray.each {
                log.info "THIS COVERAGE === " + it
                def test = Coverages.findWhere(coverageCode: it);
                log.info test

                renderString = renderString + it + "&,&" + test.coverageName + "&;&"
                if (params.riskType == "Film Projects Without Cast (No Work Comp)" || params.riskType == "Film Projects With Cast (No Work Comp)" ||params.riskType == "Specific Film Projects Test") {

                    if (it == "EPKG") {
//                        log.info "SPECIFIC FILM" + params.totalGrossBudget.toFloat()
                        if (params.riskType == "Film Projects With Cast (No Work Comp)"){

                        }
                        else{
                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct with (NOLOCK) " +
                                    "WHERE (ProductID = 'PIP CHOI') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }

                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct with (NOLOCK) " +
                                    "WHERE (ProductID = 'PIP 1') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }

                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct with (NOLOCK) " +
                                    "WHERE (ProductID = 'PIP 2') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }


                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct with (NOLOCK) " +
                                    "WHERE (ProductID = 'PIP 3') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }

                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct with (NOLOCK) " +
                                    "WHERE (ProductID = 'PIP 4') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }


                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct with (NOLOCK) " +
                                    "WHERE (ProductID = 'PIP 5') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }
                            if ((params.totalGrossBudget.toFloat() <= 100000)) {

                            }
                            if ((params.totalGrossBudget.toFloat() > 0 && params.totalGrossBudget.toFloat() <= 200000)) {

                            }
                            if ((params.totalGrossBudget.toFloat() > 0 && params.totalGrossBudget.toFloat() <= 300000)) {

                            }
                            if ((params.totalGrossBudget.toFloat() > 300000 && params.totalGrossBudget.toFloat() <= 400000)) {

                            }
                            if ((params.totalGrossBudget.toFloat() > 400000)) {

                            }
                        }


                    }
                    else if (it == "CPK") {
                        aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                "FROM lkpProduct with (NOLOCK) " +
                                "WHERE (CoverageID = '" + it + "') AND (ActiveFlag = 'Y')") {
                            if (it.ProductID.startsWith("BAR")) {
                                log.info "PRODUCTS BAR ======== " + it.ProductID
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }

                        }
                    } else {
                        aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                "FROM lkpProduct with (NOLOCK) " +
                                "WHERE (CoverageID = '" + it + "') AND (ActiveFlag = 'Y')") {
                            log.info("${it.CoverageID} : ${it.ProductID}")

                            renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";

                        }
                    }

                }
                else {
                    aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                            "FROM lkpProduct with (NOLOCK) " +
                            "WHERE (CoverageID = '" + it + "') AND (ActiveFlag = 'Y')") {

                        renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";


                    }
                }



                log.info renderString

                renderString = renderString + "&nextCoverage&";
            }
        }

        if (params.riskType == "Specific Film Projects" || params.riskType == "Specific Film Projects Test") {
            if (params.totalGrossBudget.toFloat() > 500000) {
                renderString = renderString + "DICE" + "&,&" + "DICE" + "&,&" + "DICE" + "&;;&" + "&nextCoverage&";
                renderString = renderString + "SPECIFICFILMPROD" + "&,&" + "SPECIFICFILMPROD" + "&,&" + "SPECIFICFILMPROD" + "&;;&";
            }

        }

        render renderString
    }

    def getProductsForCoverageV3(){
        log.info("GETTING PRODUCTS FOR COVERAGE V3")
        log.info(params);
        Sql aimsql = new Sql(dataSource_aim)
        def submissionDetailMap = new JsonSlurper().parseText(params.dataMap)

        def riskProducts = RiskType.findWhere(riskTypeName: submissionDetailMap.risk)

        log.info JsonOutput.prettyPrint(riskProducts.products)

        render "Good"
    }

    def getProductsForRiskType(){
        log.info "GETTING PRODUCTS FOR RISK"
        log.info params

        def riskRecord = RiskType.findByRiskTypeCode(params.riskTypeCode, [max:1])

        log.info riskRecord
        if(riskRecord.products != null){
            def productCodesArray = riskRecord.products.split(",")
            log.info  productCodesArray

            //BUILD JSON RESPONSE OF PRODUCTS AND THEIR DETAILS
            def productArray = []

            productCodesArray.each{
                if(it.trim().size() > 0){
                    log.info it
                    def productRecord = Products.findByProductID(it.trim())
                    log.info productRecord

                    def rowMap = [:]
                    productRecord.properties.each{
                        rowMap[it.key] = it.value
                    }
                    productArray << rowMap
                }
            }

            //SORT PRODUCTS BY COVERAGE
            productArray.sort { it.coverage.toLowerCase() }
            render jsonOutput.toJson(productArray)
        }
        else{
            render ""
        }
    }



    def getLimitsDeductibles() {
        log.info("GETTING LIMITS AND DEDUCTIBLES FOR PRODUCT")
        log.info(params);

        Sql aimsql = new Sql(dataSource_aim)
        String renderString = ""
        aimsql.eachRow("SELECT Limits, Deduct, Subject, Endorse, LobDistrib, ActiveFlag " +
                "FROM Product with (NOLOCK) " +
                "WHERE (ProductID = '" + params.productID + "') ") {
            renderString = renderString + it.Limits + ";####&&&&;" + it.Deduct + ";####&&&&;" + it.Subject + ";####&&&&;" + it.Endorse + ";####&&&&;" + it.LobDistrib + ";";
        }

        render renderString
    }

    def getAvailableCoveragesForRiskType() {
        log.info("GETTING AVAILABLE COVERAGES FOR RISK TYPE")
        log.info(params);

        def riskCoverages = RiskType.findWhere(riskTypeName: params.riskType)
        def coverageNames = "";
        riskCoverages.coverages.split(",").each {
            def coverage = Coverages.findWhere(coverageCode: it)
            coverageNames = coverageNames + coverage.coverageName + ","
        }


        String renderString = ""

        renderString = riskCoverages.coverages + ";&&;" + coverageNames;

        render renderString
    }


    def getAllRiskTypesForCategory(){
        log.info "GET ALL RISK TYPES FOR CATEGORY"
        log.info params

        def riskTypes = RiskType.list();

        render(contentType: 'text/json') {[
                'riskTypes': riskTypes,
                'status': riskTypes ? "OK" : "Nothing present"
        ]}
    }

    def getAttachmentsList(){
        log.info("GET LIST OF ATTACHMENTS")
        log.info(params);

        FileTransferHelper fileHelper = new FileTransferHelper();

        def renderString = fileHelper.getFileList(params.quoteID);

        render renderString;
    }

    def ajaxDownloadAttachment = {
        log.info("DOWNLOADING ATTACHMENT1")
        log.info params

//        def webrootDir = servletContext.getRealPath("/attachments/0620862/")
//        def file = new File(webrootDir, "Indication A.pdf")
//        log.info "FILE BYTES"
//        log.info file.bytes
        FileTransferHelper fileHelper = new FileTransferHelper();

        byte[] renderStringBytesArray = fileHelper.getAIMAttachment(params.q, params.f);
//        File testFile = new File();

        log.info(renderStringBytesArray)
        if (renderStringBytesArray)
        {
            response.setContentType("application/octet-stream") // or or image/JPEG or text/xml or whatever type the file is
            response.setHeader("Content-disposition", "attachment;filename=\"${params.f}\"")
            response.outputStream << renderStringBytesArray
        }
        else render "Error!" // appropriate error handling
    }
    def addNewInsured(){
        log.info "SAVING ADDITIONAL INSURED"
        log.info params

        def renderString = ""
        try{
            def newAdditionalInsured = new Certwords (description: params.description, producerid: session.user.company, additionalInsured: params.additionalInsured, ops: params.ops)
            newAdditionalInsured.save(flush: true, failOnError: true)
            log.info(newAdditionalInsured.id)
            renderString = "Success:" + newAdditionalInsured.id

        }
        catch(Exception e){
            log.info (e)
            renderString = "error"
        }

        render renderString

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



            log.info("PRODUCER ID === " + record['ProducerID'])
            aimsql.eachRow("SELECT     *\n" +
                    "FROM         Producer with (NOLOCK)\n" +
                    "WHERE     ProducerID='${record['ProducerID']}'" ) {
                log.info("PRODUCER DETAILS ==== " + it.Name)
                params['brokerCompanyName'] = it.Name
                params['brokerCompanyAddress'] = it.Address1
                params['brokerCompanyCity'] = it.City
                params['brokerCompanyState'] = it.State
                params['brokerCompanyZip'] = it.Zip
                params['brokerCompanyPhone'] = it.Phone
                params['brokerCompanyLicense'] = it.License
            }

//            params['producer']= session.user.firstName + " " + session.user.lastName;
            params['producer']= params['brokerCompanyName']
            params['producerAddress']= params['brokerCompanyAddress']

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
                params['genEnd']= ""
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
                        record['Effective'] =  it.Effective.format(dateSimple)
                        record['Expiration'] = it.Expiration.format(dateSimple)
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
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Personal & Advertising Injury")){
                            limitTag = "genPersonalLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "General Aggregate Limit")){
                            limitTag = "genAggregateLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Products & Completed Operations")){
                            limitTag = "genProductsLimit"
                        }
//                            SPECIAL EVENTS
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Each Event (Premises Damage Limit)")) {
                            limitTag = "genFireLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Products &amp; Completed Work Total Limit")){
                            limitTag = "genProductsLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Each Event (Medical Expense Limit)")){
                            limitTag = "genMedLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Each Event Limit")){
                            limitTag = "genEachLimit"
                        }
                        else if(StringUtils.containsIgnoreCase(limitDesc, "Personal Injury (Each Person Limit)")){
                            limitTag = "genPersonalLimit"
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
                        if (StringUtils.containsIgnoreCase(limitDesc, "Non-Owned & Hired Auto Liability")) {
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
            params['submissionPolicyID'] = record['PolicyID']


            //GENERATE CERT AND SAVE IT TO LOCAL AND AIM SERVER
            def pathToCert = intelledoxHelper.createCertPDF(params, dataSource_aim);
            log.info("PATH TO CERT FILE: " + pathToCert)
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

    def uploadAttachedFile(){
        log.info("CHECKING AJAX ATTACH BUTTON")
        log.info(params);
        FileTransferHelper fileHelper = new FileTransferHelper();
        Sql aimsql = new Sql(dataSource_aim)


        def temporaryFilesFolderPath = servletContext.getRealPath("/attachments/temp/")
        def attachedFile
        def responseString = "";

        if(params.file instanceof org.springframework.web.multipart.commons.CommonsMultipartFile){
            try{
                log.info("STORING ALL ATTACHMENTS IN " + temporaryFilesFolderPath)
                def fileRealName
                def tempFilename

                fileRealName = params.file.getFileItem().name
                tempFilename = params.fileUUID;
                attachedFile = params.file;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempFilename)
                responseString = "Upload Completed"

            } catch (IOException e) {
                StringWriter sw = new StringWriter();
                e.printStackTrace(new PrintWriter(sw));
                String exceptionAsString = sw.toString();
                log.info("Error Details - " + exceptionAsString)
                responseString = "Error Details - " + exceptionAsString
            } finally {
                try {

                } catch (IOException ex) {
                    log.info ex
                    ex.printStackTrace();
                }
            }
        }

        render responseString
    }

    def removeTempFile(){
        log.info("CHECKING AJAX ATTACH BUTTON")
        log.info(params);
        FileTransferHelper fileHelper = new FileTransferHelper();

        def temporaryFilesFolderPath = servletContext.getRealPath("/attachments/temp/")
        def attachedFile
        def responseString = "";

        try{
            log.info("REMOVING TEMP FILE " + temporaryFilesFolderPath)

            def status = fileHelper.deleteLocalTempFile(temporaryFilesFolderPath, params.fileUUID)
            if(status == true){
                responseString = "File Removed"
            }
            else{
                responseString = "Error"
            }

        } catch (IOException e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            responseString = "Error Details - " + exceptionAsString
        } finally {
            try {

            } catch (IOException ex) {
                log.info ex
                ex.printStackTrace();
            }
        }

        render responseString
    }

    def attachAndUploadFiles(){
        log.info("UPLOADING FILES TO AIMSQL")
        log.info(params);
        FileTransferHelper fileHelper = new FileTransferHelper();
        Sql aimsql = new Sql(dataSource_aim)

        def attachedFileMap = new JsonSlurper().parseText(params.attachedFileMap)

        def temporaryFilesFolderPath = servletContext.getRealPath("/attachments/temp/")
        def attachedFile

        def filesToCleanUp = [];
        try {
        attachedFileMap.each{ key, value ->
            log.info "key = " + key
            log.info "value = " + value

                def fileRealName = value.fileName
                def tempFilename = value.uuid

                def srcStream
                def cpStream
                def dstStream
                def keepFileHereStream

                def fileName;
                params.quoteIDs.split(",").each {
                    def quoteID = it
                    def localFolderPath = servletContext.getRealPath("/attachments/${it}/") //app directory
                    boolean done = false;

                    log.info("MOVING FILES FROM TEMP FOLDER TO QUOTE FOLDER= " + it)
                    log.info(localFolderPath)
                    File fileDest = new File(localFolderPath)
                    fileDest.mkdirs();
                    fileName = fileRealName
                    log.info("COPYING: " + tempFilename + ", " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempFilename).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    //add file to list of clean up files
                    if (!filesToCleanUp.contains(tempFilename)) {
                        filesToCleanUp.add(tempFilename);
                    }

//                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)


                    if (done) {
                        log.info("The first file is uploaded successfully.");
                    }
                }
            }

                //FTP FILES TO AIM
                def ftpResponse = fileHelper.ftpFileToAIMBULK(attachedFileMap, temporaryFilesFolderPath, params.quoteIDs, dataSource_aim)


                //CLEAN UP TEMPORARY FILES
                if(ftpResponse.contains("Success")){
                    filesToCleanUp.each{
                        log.info("REMOVING TEMP FILE " + it)
                        def removeStatus = fileHelper.deleteLocalTempFile(temporaryFilesFolderPath, it)
                        if(removeStatus == true){
                            log.info "File Removed"
                        }
                        else{
                            log.info "Error"
                        }
                    }
                }
            } catch (IOException e) {
                StringWriter sw = new StringWriter();
                e.printStackTrace(new PrintWriter(sw));
                String exceptionAsString = sw.toString();
                log.info("Error Details - " + exceptionAsString)
            } finally {
                try {
                } catch (IOException ex) {
                    log.info ex
                    ex.printStackTrace();
                }
            }


        render "Upload Completed"
    }

    def ajaxAttachNew() {
        log.info("CHECKING AJAX ATTACH BUTTON")
        log.info(params);
        FileTransferHelper fileHelper = new FileTransferHelper();
        Sql aimsql = new Sql(dataSource_aim)
        FTPClient ftpClient = new FTPClient();

        def temporaryFilesFolderPath = servletContext.getRealPath("/attachments/temp/")
        def attachedFile

        params.each{ key, value ->
            log.info value
            if(value instanceof org.springframework.web.multipart.commons.CommonsMultipartFile){
                log.info "is File"
                try{
                    log.info("STORING ALL ATTACHMENTS IN " + temporaryFilesFolderPath)
                    def fileRealName
                    def tempFilename

                    fileRealName = params.getAt(key).getFileItem().name
                    tempFilename = params.quoteIDs.replaceAll(",","") + "_" + key + "_" + System.currentTimeMillis();
                    attachedFile = params.getAt(key);
                    fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempFilename)

                    String server = "47.180.31.157";
                    int port = 21;
                    String user = "web_ftp";
                    String pass = "Get@4Files";

                    def srcStream
                    def cpStream
                    def dstStream
                    def keepFileHereStream

                    ftpClient.connect(server, port);
                    ftpClient.login(user, pass);
                    ftpClient.enterLocalPassiveMode();

                    ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
                    def fileName;
                    params.quoteIDs.split(",").each {
                        def quoteID = it
                        def localFolderPath = servletContext.getRealPath("/attachments/${it}/") //app directory
                        boolean done = false;

                        log.info("STORING ALL ATTACHMENTS IN AIM FOR = " + it)
                        log.info(localFolderPath)
                        File fileDest = new File(localFolderPath)
                        fileDest.mkdirs();


                            fileName = key + "-" + fileRealName
                            log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)

                            srcStream = new File(temporaryFilesFolderPath, tempFilename).newDataInputStream()
                            dstStream = new File(localFolderPath, fileName).newDataOutputStream()

                            dstStream << srcStream

                            srcStream.close()
                            dstStream.close()

                            fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)



                        if (done) {
                            log.info("The first file is uploaded successfully.");
                        }
                    }
                } catch (IOException e) {
                    StringWriter sw = new StringWriter();
                    e.printStackTrace(new PrintWriter(sw));
                    String exceptionAsString = sw.toString();
                    log.info("Error Details - " + exceptionAsString)
                } finally {
                    try {
                        if (ftpClient.isConnected()) {
                            ftpClient.logout();
                            ftpClient.disconnect();
                        }
                    } catch (IOException ex) {
                        log.info ex
                        ex.printStackTrace();
                    }
                }
            }
        }

        render "Upload Completed"
    }

    def saveProgressStoreAttachedFiles() {
        log.info("Store Temporary Saved Files")
        log.info(params);
        FileTransferHelper fileHelper = new FileTransferHelper();
        Sql aimsql = new Sql(dataSource_aim)
        FTPClient ftpClient = new FTPClient();

        def temporaryFilesFolderPath = servletContext.getRealPath("/attachments/temp/")
        def attachedFile

        params.each{ key, value ->
            log.info value
            if(value instanceof org.springframework.web.multipart.commons.CommonsMultipartFile){
                log.info "is File"
                try{
                    log.info("STORING ALL ATTACHMENTS IN " + temporaryFilesFolderPath)
                    def fileRealName
                    def tempFilename

                    fileRealName = params.getAt(key).getFileItem().name
                    tempFilename = params.uuid + "#NEUUID#" + key + "#NEUUID#" + fileRealName;
                    attachedFile = params.getAt(key);
                    fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempFilename)

                } catch (IOException e) {
                    StringWriter sw = new StringWriter();
                    e.printStackTrace(new PrintWriter(sw));
                    String exceptionAsString = sw.toString();
                    log.info("Error Details - " + exceptionAsString)
                } finally {
                    try {
                        if (ftpClient.isConnected()) {
                            ftpClient.logout();
                            ftpClient.disconnect();
                        }
                    } catch (IOException ex) {
                        log.info ex
                        ex.printStackTrace();
                    }
                }
            }
        }

        render "Upload Completed"
    }

    def ajaxAttach() {
        log.info("CHECKING AJAX ATTACH BUTTON")
        log.info(params);
        FileTransferHelper fileHelper = new FileTransferHelper();
        Sql aimsql = new Sql(dataSource_aim)
        FTPClient ftpClient = new FTPClient();

        def temporaryFilesFolderPath = servletContext.getRealPath("/attachments/temp/")
        def attachedFile

        try{
            log.info("STORING ALL ATTACHMENTS IN " + temporaryFilesFolderPath)
            def bioFileRealName
            def tempBioFileName
            if (params.bioFile != "undefined") {
                bioFileRealName = params.bioFile.getFileItem().name
                tempBioFileName = params.quoteIDs.replaceAll(",","") + "_bio_" + System.currentTimeMillis();
                attachedFile = params.bioFile;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempBioFileName)
            }

            def lossesFileRealName
            def tempLossesFileName
            if (params.lossesFile != "undefined") {
                lossesFileRealName = params.lossesFile.getFileItem().name
                tempLossesFileName = params.quoteIDs.replaceAll(",","") + "_losses_" + System.currentTimeMillis();
                attachedFile = params.lossesFile;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempLossesFileName)
            }

            def pyroFileRealName
            def tempPyroFileName
            if (params.pyroFile != "undefined") {
                pyroFileRealName = params.pyroFile.getFileItem().name
                tempPyroFileName = params.quoteIDs.replaceAll(",","") + "_pyro_" + System.currentTimeMillis();
                attachedFile = params.pyroFile;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempPyroFileName)
            }

            def stuntsFileRealName
            def tempStuntsFileName
            if (params.stuntsFile != "undefined") {
                stuntsFileRealName = params.stuntsFile.getFileItem().name
                tempStuntsFileName = params.quoteIDs.replaceAll(",","") + "_stunts_" + System.currentTimeMillis();
                attachedFile = params.stuntsFile;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempStuntsFileName)
            }

            def animalFileRealName
            def tempAnimalFileName
            if (params.animalPDF != "undefined") {
                animalFileRealName = params.animalPDF.getFileItem().name
                tempAnimalFileName = params.quoteIDs.replaceAll(",","") + "_animal_" + System.currentTimeMillis();
                attachedFile = params.animalPDF;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempAnimalFileName)
            }

            def droneFileRealName
            def tempDroneFileName
            if (params.dronePDF != "undefined") {
                droneFileRealName = params.dronePDF.getFileItem().name
                tempDroneFileName = params.quoteIDs.replaceAll(",","") + "_drone_" + System.currentTimeMillis();
                attachedFile = params.dronePDF;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempDroneFileName)
            }

            def equipScheduleFileRealName
            def tempEquipScheduleFileName
            if (params.equipScheduleFile != "undefined") {
                equipScheduleFileRealName = params.equipScheduleFile.getFileItem().name
                tempEquipScheduleFileName = params.quoteIDs.replaceAll(",","") + "_equipSchedule_" + System.currentTimeMillis();
                attachedFile = params.equipScheduleFile;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempEquipScheduleFileName)
            }

            def doodFileRealName
            def tempDoodFileName
            if (params.doodFile != "undefined") {
                doodFileRealName = params.doodFile.getFileItem().name
                tempDoodFileName = params.quoteIDs.replaceAll(",","") + "_dood_" + System.currentTimeMillis();
                attachedFile = params.doodFile;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempDoodFileName)
            }

            def treatmentFileRealName
            def tempTreatmentFileName
            if (params.treatmentFile != "undefined") {
                treatmentFileRealName = params.treatmentFile.getFileItem().name
                tempTreatmentFileName = params.quoteIDs.replaceAll(",","") + "_treatment_" + System.currentTimeMillis();
                attachedFile = params.treatmentFile;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempTreatmentFileName)
            }

            def budgetFileRealName
            def tempBudgetFileName
            if (params.budgetFile != "undefined") {
                budgetFileRealName = params.budgetFile.getFileItem().name
                tempBudgetFileName = params.quoteIDs + "_budget_" + System.currentTimeMillis();
                attachedFile = params.budgetFile;
                fileHelper.saveAttachedFileToLocalPath(attachedFile, temporaryFilesFolderPath, tempBudgetFileName)
            }


            String server = "47.180.31.157";
            int port = 21;
            String user = "web_ftp";
            String pass = "Get@4Files";

            def srcStream
            def cpStream
            def dstStream
            def keepFileHereStream

            ftpClient.connect(server, port);
            ftpClient.login(user, pass);
            ftpClient.enterLocalPassiveMode();

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            def fileName;
            params.quoteIDs.split(",").each {
                def quoteID = it
                def localFolderPath = servletContext.getRealPath("/attachments/${it}/") //app directory
                boolean done = false;

                log.info("STORING ALL ATTACHMENTS IN AIM FOR = " + it)
                log.info(localFolderPath)
                File fileDest = new File(localFolderPath)
                fileDest.mkdirs();


                if (params.bioFile != "undefined") {
                    fileName = "bio-" + bioFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)

                    srcStream = new File(temporaryFilesFolderPath, tempBioFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()

                    dstStream << srcStream

                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)
                }

                if (params.lossesFile != "undefined") {
                    fileName = "losses-" + lossesFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempLossesFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)
                }

                if (params.pyroFile != "undefined") {
                    fileName = "pyro-" + pyroFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempPyroFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)

                }

                if (params.stuntsFile != "undefined") {
                    fileName = "stunts-" + stuntsFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempStuntsFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)
                }

                if (params.animalPDF != "undefined") {
                    fileName = "animal-" + animalFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempAnimalFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)
                }

                if (params.dronePDF != "undefined") {
                    fileName = "drone-" + droneFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempDroneFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)
                }

                if (params.equipScheduleFile != "undefined") {
                    fileName = "equip-" + equipScheduleFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempEquipScheduleFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)
                }

                if (params.doodFile != "undefined") {
                    fileName = "dood-" + doodFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempDoodFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)
                }

                if (params.treatmentFile != "undefined") {
                    fileName = "treatment-" + treatmentFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempTreatmentFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)
                }

                if (params.budgetFile != "undefined") {
                    fileName = "budget-" + budgetFileRealName
                    log.info("COPYING FILE TO ATTACHMENTS LOCAL: " + fileName)
                    srcStream = new File(temporaryFilesFolderPath, tempBudgetFileName).newDataInputStream()
                    dstStream = new File(localFolderPath, fileName).newDataOutputStream()
                    dstStream << srcStream
                    srcStream.close()
                    dstStream.close()

                    fileHelper.ftpFileToAIM(fileName, localFolderPath, quoteID, dataSource_aim)
                }
                if (done) {
                    log.info("The first file is uploaded successfully.");
                }
            }
        } catch (IOException e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
        } finally {
            try {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }
            } catch (IOException ex) {
                log.info ex
                ex.printStackTrace();
            }
        }






        render "Upload Completed"
    }


    def newRatePremiums(){
        log.info("RATING PREMIUMS (NEW METHOD)")
        log.info(params);
        Sql aimsql = new Sql(dataSource_aim)

        def totalBudget = params.totalBudget.toDouble()
        def optionalProducts = new JsonSlurper().parseText(params.optionalProducts)

        def jsonResponse = "";
        def arrayOfCoverageDetails = [];

        def pipChoiceLimitsArray = params.pipChoiceLimits.split("&;;&");
        def pipChoiceLimitsMap = [:]
        def termLength = params.proposedTermLength.split(" ")[0].toInteger();

        //Filter Products selected to format (PIP CHOI, BARCPGK )
        def productsToRate = [];
        (params.productsSelected.split(",") as List).each{
            productsToRate.add(it.split(":")[1])
        }
        log.info productsToRate





        //SELECT PRODUCTS FROM DB
        def products = Products.where {
            productID in productsToRate

        }.list()


        //RATE EACH PRODUCT
        products.each{ product ->
            log.info ("RATING: " + product.productID)
            def mainRate;
            float productTotalPremium =0;

            def limitsMap =[:]
            def customLimitsMap = [:]
            def deductsMap = [:]
            def premiumsMap = [:]
            def terms = product.terms
            def forms = product.forms
            def rateInfo

            //LOOP THROUGH ALL LOBS (LIMITS/DEDUCTIBLES/LOB PREMIUMS)
            def productLOBS = ProductLOB.findAllByProductID(product.productID, [sort: "displayOrder",order: "asc"])
            log.info productLOBS
            productLOBS.each{ productLOB ->
                def lobMinPremium = productLOB.minPremium;
                float lobPremium =0;

                //IF THIS LOB IS OPTIONAL, CHECK IF LOB WAS SELECTED
                if(productLOB.optionalFlag == "Y"){
                    def productLOBName = productLOB.lobCode;
//                    log.info("LOB: " + optionalProducts[productLOBName])
                    if(productLOBName.split("_")[1] == "NOHA"){
                        productLOBName = productLOBName.split("_")[1];
                    }
                    else{
                        productLOBName = productLOB.lobCode
                    }
                    if(optionalProducts[productLOBName] != "true"){ // if optional and params does not include option
                        return
                    }

                }

                //LIMIT CALCULATIONS
                def customData = new JsonSlurper().parseText(params.customData)
                if(productLOB.lobLimit == "custom"){ //if limits are customizable by the user
                    def nameOfCustomLimitInputInView = "${(productLOB.lobName).replaceAll("[^a-zA-Z]+","").replaceAll("\\s","")}LimitInput";

                    limitsMap[productLOB.lobName] = productLOB.lobLimit
                    customLimitsMap[productLOB.lobName] = customData.getAt(nameOfCustomLimitInputInView)
                }
                else{//if limits are not customizable
                    limitsMap[productLOB.lobName] = productLOB.lobLimit
                }

                //DEDUCTIBLE CALCULATIONS
                deductsMap[productLOB.lobName] = productLOB.lobDeductible


                //LOB PREMIUMS
                if(productLOB.includedFlag == "Y"){ //Included no premium
                    premiumsMap[productLOB.lobName] = "incl"
                }
                else if (productLOB.flatPremium != null){ //Flat Premium
                    premiumsMap[productLOB.lobName] = productLOB.flatPremium
                }
                else if (productLOB.rateValue != null){ //Premium based on rate
                    //Determine if rate is based on limit or budget

                    if(productLOB.lobLimit == "custom"){ //RATE BASED ON CUSTOM LIMIT
                        NumberFormat format = NumberFormat.getCurrencyInstance();

                        def customLimitAmount = customLimitsMap[productLOB.lobName].replaceAll("[\$,]", "");
                        lobPremium = (productLOB.rateValue.toFloat() * customLimitAmount.toFloat()) / 100
                    }
                    else{
                        lobPremium = (productLOB.rateValue.toFloat() * totalBudget) / 100
                    }

                    //IF LOB has a minimum premium, CHECK IF LOB PREMIUM MEETS MINIMUM PREMIUM
                    if(lobMinPremium != null){
                        if(lobPremium < lobMinPremium.toFloat()){
                            lobPremium = lobMinPremium.toFloat()
                        }
                    }

                    premiumsMap[productLOB.lobName] = lobPremium
                    productTotalPremium = productTotalPremium + lobPremium
                }
            }


            //PRODUCT RATING
            if(product.flatPremium != null){ //if product premium is flat rate
                productTotalPremium = product.flatPremium
            }
            else if(product.rateBasis == "budget"){ //if product premium is based on budget
                productTotalPremium = (product.rate.toFloat() * totalBudget) /100
            }
            else if(product.rateBasis == "limit"){ //if product premium is based on limit
                //SHOULD ALREADY BE CALCULATED IN LOB LOOP
            }

            //CHECK IF PRODUCT MEETS MINIMUM PREMIUM
            if(productTotalPremium < product.minPremium){
                productTotalPremium = product.minPremium
            }


            rateInfo = "EPKG\tRate\tPremium\tCoverage\tMin Prem\n";
            rateInfo = rateInfo + "EPKG\tflat\t\$500\t\t\n";
            rateInfo = rateInfo + "EPKG\tflat\tincl\tNegative Film & Videotape\t\n";
            rateInfo = rateInfo + "EPKG\tflat\tincl\tFaulty Stock & Camera Processing\t\n";
            rateInfo = rateInfo + "EPKG\tflat\tincl\tMiscellaneous Rented Equipment\t\n";;
            rateInfo = rateInfo + "EPKG\tflat\tincl\tProps, Sets & Wardrobe\t\n";
            rateInfo = rateInfo + "EPKG\tflat\tincl\tThird Party Prop Damage Liab\t\n";
            rateInfo = rateInfo + "EPKG\tflat\tincl\tExtra Expense\t\n";


            if(product.flatPremium != null){
                log.info "FLAT RATE"
            }
            else{
                log.info "NOT A FLAT RATE"
            }

            def limitsMapJson = JsonOutput.toJson(limitsMap)
            def customLimitsMapJson = JsonOutput.toJson(customLimitsMap)
            def deductsMapJson = JsonOutput.toJson(deductsMap)
            def premiumsMapJson = JsonOutput.toJson(premiumsMap)


            def coverageJson = JsonOutput.toJson(
                    coverageCode: product.coverage,
                    coverageLongName: product.coverageLongName,
                    productCode: product.productID,
                    productTotalPremium: productTotalPremium,
                    limits: new JsonSlurper().parseText(limitsMapJson),
                    customLimits: new JsonSlurper().parseText(customLimitsMapJson),
                    deductibles: new JsonSlurper().parseText(deductsMapJson),
                    premiums: new JsonSlurper().parseText(premiumsMapJson),
                    terms: terms,
                    forms: forms,
                    rateInfo: rateInfo,
                    agentPct: product.agentPct,
                    grossPct: product.grossPct
            )
            arrayOfCoverageDetails.add(new JsonSlurper().parseText(coverageJson))
        }



        jsonResponse = JsonOutput.toJson(
                coverages: arrayOfCoverageDetails
        )
        log.info JsonOutput.prettyPrint(jsonResponse)

        render JsonOutput.prettyPrint(jsonResponse)
//        render "good"
    }

    def ratePremiumsSGP(){
        log.info("RATING PREMIUMS SGP")
        log.info(params);
        Sql aimsql = new Sql(dataSource_aim)

        def dataMap = new JsonSlurper().parseText(params.dataMap)
        def totalBudgetString = dataMap.totalBudget
        def totalBudgetFloat = Float.parseFloat(totalBudgetString.replaceAll("[\$,]", "")) ;

        def jsonResponse = "";
        def cglLobMap = [:];
        def cglDeductsMap = [:];
        def cglLimitsMap = [:];
        def cglPremiumsMap = [:];
        def arrayOfCoverageDetails = [];
        def cglTerms = "";
        def universalForms = "IL DS 00 (09-08) -  Common Policy Declarations\n" +
                "IL 00 01 (10-10) -  Signature Page\n" +
                "IL 00 17 (11-98) -  Common Policy Conditions\n" +
                "IL 00 21 (09-08) -  Nuclear Energy Liability Exclusion Endorsement\n" +
                "IL 02 70 (08-11) -  California Changes -Cancellation and Nonrenewal\n" +
                "IL 09 35 (07-02) -  Exclusion of Certain Computer-Related Losses\n" +
                "IL 09 85 (01-08) -  Disclosure Pursuant to Terrorism Risk Insurance Act\n";

        def cglForms = "";
        def cglRateInfo = "";
        def cglPremium = 0;
        def cglBaseCalculatedPremium = 0;

        if(dataMap.SGPProduct == "silver"){
            def silverPremium = 0;

            //CALCULATE BASIC CGL
            if(dataMap.CGLSelected == true){
                def cglMinPrem = 450;
                def cglRate = 0.5;
                def miscLimit = dataMap.MiscLimitSelected;

                cglPremium = (totalBudgetFloat * cglRate)/100
                if(cglPremium < cglMinPrem){
                    cglPremium = cglMinPrem;
                }
                cglBaseCalculatedPremium = cglPremium;
//                def cglPremiumString = "\$ " + NumberFormat.getNumberInstance(Locale.US).format(cglPremium);


                cglLobMap["General Aggregate Limit"] = "";
                cglLobMap["Products & Completed Operations Agg Limit"] = "";
                cglLobMap["Personal & Advertising Injury (Any One Person or Organization)"] = "";
                cglLobMap["Each Occurrence Limit"] = "";
                cglLobMap["Damage to Premises Rented to You Limit"] = "";
                cglLobMap["Medical Expense"] = "";
                cglLobMap["General Liability Terrorism"] = "";

                cglPremiumsMap["General Aggregate Limit"] = "";
                cglPremiumsMap["Products & Completed Operations Agg Limit"] = "";
                cglPremiumsMap["Personal & Advertising Injury (Any One Person or Organization)"] = "";
                cglPremiumsMap["Each Occurrence Limit"] = "";
                cglPremiumsMap["Damage to Premises Rented to You Limit"] = "";
                cglPremiumsMap["Medical Expense"] = "";
                cglPremiumsMap["General Liability Terrorism"] = "incl";

                cglLimitsMap["General Aggregate Limit"] = "\$2,000,000";
                cglLimitsMap["Products & Completed Operations Agg Limit"] = "\$1,000,000";
                cglLimitsMap["Personal & Advertising Injury (Any One Person or Organization)"] = "\$1,000,000";
                cglLimitsMap["Each Occurrence Limit"] = "\$1,000,000";
                cglLimitsMap["Damage to Premises Rented to You Limit"] = "\$100,000";
                cglLimitsMap["Medical Expense"] = "Excluded";
                cglLimitsMap["General Liability Terrorism"] = "";

                cglDeductsMap["General Aggregate Limit"] = "";
                cglDeductsMap["Products & Completed Operations Agg Limit"] = "";
                cglDeductsMap["Personal & Advertising Injury (Any One Person or Organization)"] = "";
                cglDeductsMap["Each Occurrence Limit"] = "";
                cglDeductsMap["Damage to Premises Rented to You Limit"] = "";
                cglDeductsMap["Medical Expense"] = "";
                cglDeductsMap["General Liability Terrorism"] = "";

                cglRateInfo = "Basis: Gross Production Cost (GPC)\t${totalBudgetString}\n" +
                        "Rate per \$1,000 GPC\t\$ 5.00\n" +
                        "Minimum Premium\t\$ 450\n" +
                        "Blanket Additional Insured\tIncluded\n";

                cglTerms = "Commercial General Liability\n" +
                        "\n" +
                        "NO EXTENSIONS WILL BE ALLOWED AFTER COVERAGE IS BOUND.\n" +
                        "SUBJECT TO:\n" +
                        "Receipt of Bio/Resume of Film Producer/Entity and Website Information.\n" +
                        "A minimum of 3 years industry experience.\n" +
                        "Insured productions are limited to Documentaries, Industrial Films, Commercials, Education Films, Training Films, Corporate Films, and similar Commercial Media Productions and Small Budget Feature Films.\n" +
                        "Productions are filmed in the U.S. only.\n" +
                        "Prior Losses do not exceed \$5,000 for the past 3 years.\n" +
                        "Coverage has not been declined, cancelled or non-renewed.\n" +
                        "EXCLUDES:\n" +
                        "Reality TV Shows\n" +
                        "Adult films\n" +
                        "Hidden camera filming\n" +
                        "Any use of: Watercraft, Aircraft, Stunts, Car Chases/Racing and Pyrotechnics\n" +
                        "Injury to Participants\n" +
                        "The following types of productions are \"Insured Productions\" under this Policy:\n" +
                        "Productions with total Gross Production Costs no more than \$1.\n" +
                        "Productions where the Production Shoot is 30 days or less.\n" +
                        "Covered Property does not include:\n" +
                        "Negative or Digital Film, Data and Records, Costume, Jewelry, Furs, Art, Antiques, Valuable Papers, Currency, Aircraft, Watercraft Mobile Vehicles, Furniture and Fixtures, Animals, Growing Plants.\n" +
                        "We will not pay for loss or damage caused by or resulting from any of the following: Delay, loss of use, loss of market, interruption of business, or any other consequential loss, unless specifically added by an endorsement."

                cglForms = "CG DS 01 (10-01) -  Commercial General Liability Declarations\n" +
                        "CG 00 01 (04-13) -  Commercial General Liability Coverage Form\n" +
                        "CG 00 68 (05-09) -  Recording And Distribution of Material or Information In Violation of Law Exclusion\n" +
                        "CG 20 23 (04-13) -  Additional Insured -Executors, Administrators, Trustees or Beneficiaries\n" +
                        "CG 20 26 (04-13) -  Additional insured -Designated Person or Organization -Any person or organization when you and such person or organization have agreed in writing in a contract or agreement that such person or organization be added as an additional insured on your policy prior to performance of the agreement.\n" +
                        "CG 20 34 (04-13) -  Additional Insured -Lessor of Leased Equipment -Automatic Status When Required in Lease\n" +
                        "CG 21 44 (07-98) -  Limitation of Coverage to Designated Premises or Project -Coverage is Limited to DICE and Commercial Media Productions only.\n" +
                        "CG 21 46 (07-98) -  Abuse or Molestation Exclusion\n" +
                        "CG 21 47 (12-07) -  Employment-Related Practices Exclusion\n" +
                        "CG 21 67 (12-04) -  Fungi or Bacteria Exclusion\n" +
                        "CG 21 71 (06-08) -  Exclusion Of Other Acts Of Terrorism Committed Outside The United States; Cap On Losses From Certified Acts of Terrorism\n" +
                        "CG 21 76 (01-08) -  Exclusion of Punitive Damages Related to a Certified Act of Terrorism\n" +
                        "CG 21 84 (01-08) -  Exclusion of Certified Acts of Nuclear, Biological or Chemical Acts\n" +
                        "CG 21 96 (03-05) -  Silica or Silica-Related Dust Exclusion\n" +
                        "CG 24 04 (05-09) -  Waiver Of Transfer Rights Of Recovery Against Others To Us\n" +
                        "CG 32 34 (01-05) -  California Changes\n" +
                        "GL 0001 (06-10) -  Absolute Asbestos Exclusion\n" +
                        "GL 0002 (06-10) -  Absolute Lead Exclusion\n" +
                        "GL 0008 (06-10) -  Amendment of Employment Definition (Temporary Employee)\n" +
                        "GL 0019 (06-10) -  Cross Liability Exclusion\n" +
                        "GL 0029 (06-10) -  Exclusion -Designated Activities\n" +
                        "GL 0030 (06-10) -  Exclusion -Fireworks With Exception for Concussion Effects, Flashpots and Smokepots\n" +
                        "GL 0035 (06-10) -  Exclusion -Personal And Advertising Injury Liability -Entertainment Industry\n" +
                        "GL 0038 (06-10) -  Exclusion -Sport, Athletic, Event, Exhibition or Performance Participants\n" +
                        "GL 0041 (06-10) -  Knowledge of Occurrence\n" +
                        "GL 0042 (06-10) -  Limitation -No Stacking of Occurrence Limits of Insurance\n" +
                        "GL 0339 (08-14) -  WrapGap Endorsement Operations Insured Under Wrap-Up Program\n";

                if(dataMap.BAISelected == true){
                    cglLobMap["Blanket Additional Insured"] = "";
                    cglPremiumsMap["Blanket Additional Insured"] = "incl";
                    cglLimitsMap["Blanket Additional Insured"] = "";
                    cglDeductsMap["Blanket Additional Insured"] = "";

                }
                if(dataMap.WOSSelected == true){
                    cglLobMap["Waiver of Subrogation"] = "";
                    cglPremiumsMap["Waiver of Subrogation"] = "\$250";
                    cglLimitsMap["Waiver of Subrogation"] = "Included \$250 AP";
                    cglDeductsMap["Waiver of Subrogation"] = "";

                    cglPremium = cglPremium + 250

                    cglRateInfo = cglRateInfo + "Waiver of Subrogation\t\$250"
                }
                if(dataMap.MedSelected == true){
                    cglLobMap["Medical Expense"] = ""
                    cglPremiumsMap["Medical Expense"] = "\$250";
                    cglLimitsMap["Medical Expense"] = "\$5,000";
                    cglDeductsMap["Medical Expense"] = "";

                    cglPremium = cglPremium + 250

                    cglRateInfo = cglRateInfo + "Medical Expense Coverage\t\$250\n";
                }


            }

            //RATE MISC EQUIP IF SELECTED
            if(dataMap.MiscSelected == true){
                def miscMinPrem = 100
                def miscRate = 0.5;
                def miscPremium  = 0;
                def miscLimit = dataMap.MiscLimitSelected;
                def miscLimitFloat= Float.parseFloat(miscLimit.replaceAll("[\$,]", "")) ;
                log.info("MISC LIMIT = " + miscLimitFloat)
                //CALCULATE PREMIUM
                miscPremium = (miscLimitFloat * miscRate)/100
                if(miscPremium < miscMinPrem){
                    miscPremium = miscMinPrem;
                }
                def miscPremiumString = "\$ " + NumberFormat.getNumberInstance(Locale.US).format(miscPremium);

                //DETERMIN CORRECT DEDUCTIBLE

                def miscDeductible = ""
                if(miscLimitFloat <= 50000){
                    miscDeductible = "\$ 1,000";
                }
                else if(miscLimitFloat > 50000 && miscLimitFloat <= 150000){
                    miscDeductible = "\$ 1,500";

                }
                else if(miscLimitFloat > 150000 && miscLimitFloat <= 350000){
                    miscDeductible = "\$ 2,000";

                }
                else if(miscLimitFloat > 150000 && miscLimitFloat <= 1000000){
                    miscDeductible = "\$ 2,500";

                }
                else if(miscLimitFloat > 1000000 ){
                    miscDeductible = "Refer";
                }


                //ASSIGN PREMIUMS, LIMITS, DEDUCTS
                cglLobMap["Miscellaneous Equipment Limit"] = "";
                cglPremiumsMap["Miscellaneous Equipment Limit"] = miscPremiumString;
                cglLimitsMap["Miscellaneous Equipment Limit"] = miscLimit;

                //CHOOSING MISC EQUIP ASSIGNS CGL DEDUCTS
                cglDeductsMap["General Aggregate Limit"] = "Nil";
                cglDeductsMap["Products & Completed Operations Agg Limit"] = "Nil";
                cglDeductsMap["Personal & Advertising Injury (Any One Person or Organization)"] = "Nil";
                cglDeductsMap["Each Occurrence Limit"] = "Nil";
                cglDeductsMap["Damage to Premises Rented to You Limit"] = "Nil";
                cglDeductsMap["Medical Expense"] = "Nil";
                cglDeductsMap["General Liability Terrorism"] = "Nil";
                cglDeductsMap["Miscellaneous Equipment Limit"] = miscDeductible;

                cglForms = cglForms + "IM 00 85 (06-10)\tPersonal Property Floater Policy\n" +
                        "IM 01 30 (10-10)\tPersonal Property Floater Policy Supplemental Declarations\n" +
                        "IM 01 87 (08 14)\tWrapGap Endorsement Property Insured Under Wrap-Up Program\n";

                cglRateInfo = cglRateInfo + "Miscellaneous Equipment Limit\t${miscLimit}\n" +
                        "Rate Per \$100\t\$ 0.50\n" +
                        "Minimum Premium\t\$ 100";
            }

            
            //ORGANIZE INFO INTO MAP
            def cgllimitsMapJson = JsonOutput.toJson(cglLimitsMap)
            def cgldeductsMapJson = JsonOutput.toJson(cglDeductsMap)
            def cglpremiumsMapJson = JsonOutput.toJson(cglPremiumsMap)
            def cgllobMapJson = JsonOutput.toJson(cglLobMap)


            def coverageJson = JsonOutput.toJson(
                    coverageCode: "CGL",
                    productCode: "TBD",
                    productTotalPremium: cglPremium,
                    basePremium: cglBaseCalculatedPremium,
                    limits: new JsonSlurper().parseText(cgllimitsMapJson),
                    deductibles: new JsonSlurper().parseText(cgldeductsMapJson),
                    premiums: new JsonSlurper().parseText(cglpremiumsMapJson),
                    lobDist: new JsonSlurper().parseText(cgllobMapJson),
                    terms: cglTerms,
                    endorse: cglForms,
                    rateInfo: cglRateInfo
            )
            arrayOfCoverageDetails.add(new JsonSlurper().parseText(coverageJson))

        }
        else if(dataMap.SGPProduct == "gold"){

        }
        else if(dataMap.SGPProduct == "platinum"){

        }



        jsonResponse = JsonOutput.toJson(
                coverages: arrayOfCoverageDetails
        )
        log.info JsonOutput.prettyPrint(jsonResponse)


        render JsonOutput.prettyPrint(jsonResponse)

    }

    def ratePremiums() {
        log.info("RATING PREMIUMS")
        log.info(params);

        log.info JsonOutput.prettyPrint(params.rateMap)
        def rateMap = new JsonSlurper().parseText(params.rateMap)


        Sql aimsql = new Sql(dataSource_aim)

        //PIP CHOICE RATING
        def pipChoice_miscRentedEquipRateMinPrem = [0.5, 100];
        def pipChoice_propsSetWardrobeRateMinPrem = [0.5, 100];
        def pipChoice_thirdPartyPropDamageRateMinPrem = [0.05, 100];
        def pipChoice_extraExpenseRateMinPrem = [0.1, 100];
        def pipChoice_rate = pipChoice_miscRentedEquipRateMinPrem[0];
        def pipChoice_minPremium = pipChoice_miscRentedEquipRateMinPrem[1];
        def pipChoice_NOHARateMinPrem = ["flat", 750];

        //PIP1 RATING
        def pip1_negativeFilmVideoRateMinPrem = ["flat", "incl"];
        def pip1_faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
        def pip1_miscRentedEquipRateMinPrem = ["flat", "incl"];
        def pip1_propsSetWardrobeRateMinPrem = ["flat", "incl"];
        def pip1_thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
        def pip1_extraExpenseRateMinPrem = ["flat", "incl"];
        def pip1_minPremium = 500;

        //PIP2 RATING
        def pip2_PIP2premium = 1000;
        def pip2_negativeFilmVideoRateMinPrem = ["flat", "incl"];
        def pip2_faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
        def pip2_miscRentedEquipRateMinPrem = ["flat", "incl"];
        def pip2_propsSetWardrobeRateMinPrem = ["flat", "incl"];
        def pip2_thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
        def pip2_extraExpenseRateMinPrem = ["flat", "incl"];
        def pip2_officeContentsRateMinPrem = ["flat", "incl"];
        def pip2_NOHARateMinPrem = ["flat", 500];

        //PIP3 RATING
        def pip3_negativeFilmVideoRateMinPrem = [0.6, 1500];

        //PIP4
        def pip4_negativeFilmVideoRateMinPrem = [0.6, 2000];

        //PIP5
        def pip5_negativeFilmVideoRateMinPrem = [0.6, 2500];
        def pip5_civilAuthority100Limit = ["flat", 250];
        def pip5_civilAuthority500Limit = ["flat", 500];

        if(rateMap.size()> 1){
            for (String k : rateMap.keySet()) {
                if(rateMap[k] == ""){
                    rateMap[k] = "0"
                }

            }
            log.info "ADJUSTING RATES"

            pipChoice_miscRentedEquipRateMinPrem = [ rateMap['PIPCHOI_miscRate'].toDouble(), rateMap['PIPCHOI_miscMP'].toInteger()];
            pipChoice_propsSetWardrobeRateMinPrem = [ rateMap['PIPCHOI_propsRate'].toDouble(), rateMap['PIPCHOI_propsMP'].toInteger()];
            pipChoice_thirdPartyPropDamageRateMinPrem = [ rateMap['PIPCHOI_thirdRate'].toDouble(), rateMap['PIPCHOI_thirdMP'].toInteger()];
            pipChoice_extraExpenseRateMinPrem = [ rateMap['PIPCHOI_extraRate'].toDouble(), rateMap['PIPCHOI_extraMP'].toInteger()];
            pipChoice_rate = pipChoice_miscRentedEquipRateMinPrem[0];
            pipChoice_minPremium = pipChoice_miscRentedEquipRateMinPrem[1];
            pipChoice_NOHARateMinPrem = [ 'flat', rateMap['PIPCHOI_NOHAMP'].toInteger()];

            //PIP1 RATING
            pip1_negativeFilmVideoRateMinPrem = ["flat", "incl"];
            pip1_faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
            pip1_miscRentedEquipRateMinPrem = ["flat", "incl"];
            pip1_propsSetWardrobeRateMinPrem = ["flat", "incl"];
            pip1_thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
            pip1_extraExpenseRateMinPrem = ["flat", "incl"];
            pip1_minPremium = rateMap['PIP1_MP'].toInteger();

            //PIP2 RATING
            pip2_PIP2premium = rateMap['PIP2_MP'];
            pip2_negativeFilmVideoRateMinPrem = ["flat", "incl"];
            pip2_faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
            pip2_miscRentedEquipRateMinPrem = ["flat", "incl"];
            pip2_propsSetWardrobeRateMinPrem = ["flat", "incl"];
            pip2_thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
            pip2_extraExpenseRateMinPrem = ["flat", "incl"];
            pip2_officeContentsRateMinPrem = ["flat", "incl"];
            pip2_NOHARateMinPrem = [ 'flat', rateMap['PIP2_NOHAMP'].toInteger()];

            //PIP3 RATING
            pip3_negativeFilmVideoRateMinPrem = [ rateMap['PIP3_Rate'].toDouble(), rateMap['PIP3_MP'].toInteger()];

            //PIP4
            pip4_negativeFilmVideoRateMinPrem = [ rateMap['PIP4_Rate'].toDouble(), rateMap['PIP4_MP'].toInteger()];

            //PIP5
            pip5_negativeFilmVideoRateMinPrem = [ rateMap['PIP5_Rate'].toDouble(), rateMap['PIP5_MP'].toInteger()];
            pip5_civilAuthority100Limit = ["flat", rateMap['PIP5_civil100MP'].toInteger()];
            pip5_civilAuthority500Limit = ["flat", rateMap['PIP5_civil500MP'].toInteger()];
        }

        def submissionRateMap = [:]
        submissionRateMap["pipChoice_miscRentedEquipRateMinPrem"] = pipChoice_miscRentedEquipRateMinPrem
        submissionRateMap["pipChoice_propsSetWardrobeRateMinPrem"] = pipChoice_propsSetWardrobeRateMinPrem
        submissionRateMap["pipChoice_thirdPartyPropDamageRateMinPrem"] = pipChoice_thirdPartyPropDamageRateMinPrem
        submissionRateMap["pipChoice_extraExpenseRateMinPrem"] = pipChoice_extraExpenseRateMinPrem
        submissionRateMap["pipChoice_rate"] = pipChoice_rate
        submissionRateMap["pipChoice_minPremium"] = pipChoice_minPremium
        submissionRateMap["pipChoice_NOHARateMinPrem"] = pipChoice_NOHARateMinPrem

        //PIP1 RATING
        submissionRateMap["pip1_negativeFilmVideoRateMinPrem"] = pip1_negativeFilmVideoRateMinPrem
        submissionRateMap["pip1_faultyStockCameraProcessingRateMinPrem"] = pip1_faultyStockCameraProcessingRateMinPrem
        submissionRateMap["pip1_miscRentedEquipRateMinPrem"] = pip1_miscRentedEquipRateMinPrem
        submissionRateMap["pip1_propsSetWardrobeRateMinPrem"] = pip1_propsSetWardrobeRateMinPrem
        submissionRateMap["pip1_thirdPartyPropDamageRateMinPrem"] = pip1_thirdPartyPropDamageRateMinPrem
        submissionRateMap["pip1_extraExpenseRateMinPrem"] = pip1_extraExpenseRateMinPrem
        submissionRateMap["pip1_minPremium"] = pip1_minPremium

        //PIP2 RATING
        submissionRateMap["pip2_PIP2premium"] = pip2_PIP2premium
        submissionRateMap["pip2_negativeFilmVideoRateMinPrem"] = pip2_negativeFilmVideoRateMinPrem
        submissionRateMap["pip2_faultyStockCameraProcessingRateMinPrem"] = pip2_faultyStockCameraProcessingRateMinPrem
        submissionRateMap["pip2_miscRentedEquipRateMinPrem"] = pip2_miscRentedEquipRateMinPrem
        submissionRateMap["pip2_propsSetWardrobeRateMinPrem"] = pip2_propsSetWardrobeRateMinPrem
        submissionRateMap["pip2_thirdPartyPropDamageRateMinPrem"] = pip2_thirdPartyPropDamageRateMinPrem
        submissionRateMap["pip2_extraExpenseRateMinPrem"] = pip2_extraExpenseRateMinPrem
        submissionRateMap["pip2_officeContentsRateMinPrem"] = pip2_officeContentsRateMinPrem
        submissionRateMap["pip2_NOHARateMinPrem"] = pip2_NOHARateMinPrem

        //PIP3 RATING
        submissionRateMap["pip3_negativeFilmVideoRateMinPrem"] = pip3_negativeFilmVideoRateMinPrem

        //PIP4
        submissionRateMap["pip4_negativeFilmVideoRateMinPrem"] = pip4_negativeFilmVideoRateMinPrem

        //PIP5
        submissionRateMap["pip5_negativeFilmVideoRateMinPrem"] =pip5_negativeFilmVideoRateMinPrem
        submissionRateMap["pip5_civilAuthority100Limit"] = pip5_civilAuthority100Limit
        submissionRateMap["pip5_civilAuthority500Limit"] = pip5_civilAuthority500Limit

        NumberFormat moneyFormat = NumberFormat.getCurrencyInstance();

        def jsonResponse = "";
        def arrayOfCoverageDetails = [];
        def pipChoiceLimitsArray = params.pipChoiceLimits.split("&;;&");
        def pipChoiceLimitsMap = [:]
        def termLength = params.proposedTermLength.split(" ")[0].toInteger();


        if (params.pipChoiceLimits.length() > 1) {
            for (def i = 0; i < pipChoiceLimitsArray.size(); i++) {
                log.info pipChoiceLimitsArray[i]
                pipChoiceLimitsMap[pipChoiceLimitsArray[i].split("&;&")[0]] = pipChoiceLimitsArray[i].split("&;&")[1];
            }
        }


        if (params.riskType == "Film Projects Without Cast (No Work Comp)" || params.riskType == "Film Projects With Cast (No Work Comp)" || params.riskType == "Specific Film Projects Test") {
            def NOHALOB = "";
            def NOHALimitsMap = [:];
            def NOHADeductsMap = [:];
            def NOHAPremiumsMap = [:];
            params.productsSelected.split(",").each {
                if (it.length() > 1) {
                    log.info "NAME OF PRODUCT: " + it.split(":")[1]
                    def productID = it.split(":")[1];
                    def coverageID = it.split(":")[0];

                    def detailsJSON = {};
                    def productTotalPremium = 0.0;

                    def coverageList = [];
                    def limitsMap = [:];
                    def deductsMap = [:];
                    def premiumsMap = [:];
                    def lobDistMap = [:];
                    def subjectString = "";
                    def endorseString = "";
                    def lobString = "";
                    def agentPct = "";
                    def grossPct = "";
                    def additionaLOBString = "";
                    def rateInfo = "";
                    def indicationRateInfo = "";
                    def twoSpaces = "  ";

                    //GET DEFAULT LIMITS, DEDUCTIBLES, AND TERMS FOR PRODUCT IN DMU AIM
                    log.info("ORIGINAL PRODUCT ID: " + productID)
                    String renderString = ""
                    aimsql.eachRow("SELECT Limits, Deduct, Subject, Endorse, LobDistrib, ActiveFlag " +
                            "FROM Product with (NOLOCK)" +
                            "WHERE (ProductID = '" + productID + "') ") {
                        renderString = renderString + it.Limits + ";####&&&&;" + it.Deduct + ";####&&&&;" + it.Subject + ";####&&&&;" + it.Endorse + ";####&&&&;" + it.LobDistrib + ";";

                        //BUILD A LIST OF COVERAGES FOR THIS PRODUCT
                        it.Limits.split('\r').each {
                            if (it.contains(":")) {
                                def key = it.split('\t')[1].split(":")[1]
                                limitsMap[key] = it.split('\t')[0]
                            }
                        }
                        it.Deduct.split('\r').each {
                            if (it.contains(":")) {
                                def key = it.split('\t')[1].split(":")[1]
                                deductsMap[key] = it.split('\t')[0]
                            }
                        }

                        subjectString = it.Subject;
                        log.info subjectString
                        endorseString = it.Endorse;

                        lobString = it.LobDistrib;
                    }
                    log.info("ORIGINAL LOB STRING: " + lobString)
                    try{
                        agentPct = lobString.split('\r')[0].split('\t')[3].trim();
                        log.info(session.user.company)
                        if(session.user.company == "TVD"){
                            agentPct = "17.5"
                            log.info "AGENT PCT: " + agentPct
                            log.info "COV ID: " + coverageID
                        }
                    }
                    catch(Exception e){
                        agentPct = "";
                    }

                    try{
                        grossPct = lobString.split('\r')[0].split('\t')[2].trim();
                    }
                    catch(Exception e){
                        grossPct = "";
                    }

                    if (coverageID == "EPKG") {
                        if (productID == "PIP CHOI") {
                            def premium = 0.0
                            def deductAmount = 0;
                            def pipChoiceTotalMinPrem = 250
                            def miscRentedEquipRateMinPrem = pipChoice_miscRentedEquipRateMinPrem;
                            def propsSetWardrobeRateMinPrem = pipChoice_propsSetWardrobeRateMinPrem;
                            def thirdPartyPropDamageRateMinPrem = pipChoice_thirdPartyPropDamageRateMinPrem;
                            def extraExpenseRateMinPrem = pipChoice_extraExpenseRateMinPrem;
                            def tempLimit = 0;
                            def rate = miscRentedEquipRateMinPrem[0];
                            def minPremium = miscRentedEquipRateMinPrem[1];


                            rateInfo = "EPKG\tRate\tPremium\tCoverage\tMin Prem\n";

                            //CUSTOM DEDUCTIBLES
                            def tempDeductiblesMap = [:];

                            tempDeductiblesMap["Extra Expense"] = "Up to \$1,000,000"
                            tempDeductiblesMap["Props, Sets & Wardrobe"] = "Up to \$1,000,000"
                            tempDeductiblesMap["Third Party Prop Damage Liab"] = "Up to \$1,000,000"

                            //CALCULATE IF MISC RENTED EQUIPMENT PREMIUM
                            if(params.pipChoiOptions.contains("PIPChoice_MiscRented")){
                                tempDeductiblesMap["Miscellaneous Rented Equipment"] = "Up to \$1,000,000"
                                rate = miscRentedEquipRateMinPrem[0]; //.5
                                minPremium = miscRentedEquipRateMinPrem[1]; //100

                                log.info((params.totalBudget.toDouble() * rate))
                                if (pipChoiceLimitsMap["Miscellaneous Rented Equipment"]) {
                                    tempLimit = pipChoiceLimitsMap["Miscellaneous Rented Equipment"].toDouble();
                                } else {
                                    tempLimit = params.totalBudget.toDouble();
                                }

                                if(termLength <= 30){
                                    premium = ((premium/365) * termLength) * 10
                                }
                                else{
                                    premium = (tempLimit * rate) / 100;
                                }

                                if (premium > minPremium) {
//                                    premium = (tempLimit * rate) / 100;

                                } else {
                                    premium = minPremium
                                }

                                tempDeductiblesMap["Miscellaneous Rented Equipment"] = calcPIP3Deductibles(params.totalBudget.toDouble())
                                productTotalPremium = productTotalPremium + premium;
                                premiumsMap["Miscellaneous Rented Equipment"] = [rate, premium];



//                                log.info(formatter.format(amt));
                                rateInfo = rateInfo + "EPKG\t${rate}\t${moneyFormat.format(premium)}\tMiscellaneous Rented Equipment\t${moneyFormat.format(minPremium)}\n";

                            }
                            else{
                                limitsMap.remove("Miscellaneous Rented Equipment")
                                deductsMap.remove("Miscellaneous Rented Equipment")
                            }


                            //CALCULATE PROPS SET WARDROBE PREMIUM
                            if(params.pipChoiOptions.contains("PIPChoice_Props")){
                                rate = propsSetWardrobeRateMinPrem[0];
                                minPremium = propsSetWardrobeRateMinPrem[1];

                                if (pipChoiceLimitsMap["Props, Sets & Wardrobe"]) {
                                    tempLimit = pipChoiceLimitsMap["Props, Sets & Wardrobe"].toDouble();
                                } else {
                                    tempLimit = params.totalBudget.toDouble();
                                }

                                premium = (tempLimit * rate) / 100;
                                if (premium > minPremium) {
                                    premium = (tempLimit * rate) / 100;
                                } else {
                                    premium = minPremium
                                }

                                tempDeductiblesMap["Props, Sets & Wardrobe"] = calcPIP3Deductibles(params.totalBudget.toDouble())
                                productTotalPremium = productTotalPremium + premium;
                                premiumsMap["Props, Sets & Wardrobe"] = [rate, premium];



                                rateInfo = rateInfo + "EPKG\t${rate}\t${moneyFormat.format(premium)}\tProps, Sets & Wardrobe\t${moneyFormat.format(minPremium)}\n";

                            }
                            else{
                                limitsMap.remove("Props, Sets & Wardrobe")
                                deductsMap.remove("Props, Sets & Wardrobe")
                            }


                            //CALCULATE THIRD PARTY PROPERTY DAMAGE PREMIUM
                            if(params.pipChoiOptions.contains("PIPChoice_ThirdParty")){
                                rate = thirdPartyPropDamageRateMinPrem[0];
                                minPremium = thirdPartyPropDamageRateMinPrem[1];

                                if (pipChoiceLimitsMap["Third Party Prop Damage Liab"]) {
                                    tempLimit = pipChoiceLimitsMap["Third Party Prop Damage Liab"].toDouble();

                                } else {
                                    tempLimit = params.totalBudget.toDouble();
                                }

                                premium = (tempLimit * rate) / 100;
                                if (premium > minPremium) {
                                    premium = (tempLimit * rate) / 100;
                                } else {
                                    premium = minPremium
                                }

                                tempDeductiblesMap["Third Party Prop Damage Liab"] = calcPIP3Deductibles(params.totalBudget.toDouble())
                                productTotalPremium = productTotalPremium + premium;
                                premiumsMap["Third Party Prop Damage Liab"] = [rate, premium];



                                rateInfo = rateInfo + "EPKG\t${rate}\t${moneyFormat.format(premium)}\tThird Party Prop Damage Liab\t${moneyFormat.format(minPremium)}\n";
                            }
                            else{
                                limitsMap.remove("Third Party Prop Damage Liab")
                                deductsMap.remove("Third Party Prop Damage Liab")
                            }


                            //CALCULATE EXTRA EXPENSE PREMIUM
                            if(params.pipChoiOptions.contains("PIPChoice_ExtraExpense")){
                                rate = extraExpenseRateMinPrem[0];
                                minPremium = extraExpenseRateMinPrem[1];

                                if (pipChoiceLimitsMap["Extra Expense"]) {
                                    tempLimit = pipChoiceLimitsMap["Extra Expense"].toDouble();
                                } else {
                                    tempLimit = params.totalBudget.toDouble();
                                }

                                premium = (tempLimit * rate) / 100;
                                if (premium > minPremium) {
                                    premium = (tempLimit * rate) / 100;
                                } else {
                                    premium = minPremium
                                }

                                tempDeductiblesMap["Extra Expense"] = calcPIP3Deductibles(params.totalBudget.toDouble())
                                productTotalPremium = productTotalPremium + premium;
                                premiumsMap["Extra Expense"] = [rate, premium];



                                rateInfo = rateInfo + "EPKG\t${rate}\t${moneyFormat.format(premium)}\tExtra Expense\t${moneyFormat.format(minPremium)}\n";
                            }
                            else{
                                limitsMap.remove("Extra Expense")
                                deductsMap.remove("Extra Expense")
                            }

                            //CHECK IF TOTAL PREMIUM MEETS TOTAL MIN PREMIUM
                            if(productTotalPremium < pipChoiceTotalMinPrem){
                                productTotalPremium = pipChoiceTotalMinPrem
                            }


                            if (params.productsSelected.contains("NOHA")) {
                                def NOHARateMinPrem = pipChoice_NOHARateMinPrem;

                                premiumsMap["Hired Auto Physical Damage"] = NOHARateMinPrem;
                                tempDeductiblesMap["Hired Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Hired Auto Physical Damage"] = "\$1,000,000"
                                rateInfo = rateInfo + "EPKG\t${rate}\t${moneyFormat.format(premium)}\tHired Auto Physical Damage\t${moneyFormat.format(minPremium)}\n";

                            }
                            else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired & Non-Owned Auto Physical Damage")
                            }
                            deductsMap = tempDeductiblesMap;

                        }
                        else if (productID == "PIP 1") {

                            def negativeFilmVideoRateMinPrem = pip1_negativeFilmVideoRateMinPrem;
                            def faultyStockCameraProcessingRateMinPrem = pip1_faultyStockCameraProcessingRateMinPrem;
                            def miscRentedEquipRateMinPrem = pip1_miscRentedEquipRateMinPrem;
                            def propsSetWardrobeRateMinPrem = pip1_propsSetWardrobeRateMinPrem;
                            def thirdPartyPropDamageRateMinPrem = pip1_thirdPartyPropDamageRateMinPrem;
                            def extraExpenseRateMinPrem = pip1_extraExpenseRateMinPrem;

                            //PIP 1 Premium is a flat rate of 500
                            def premium = pip1_minPremium;
                            productTotalPremium = premium;

                            premiumsMap["Negative Film & Videotape"] = negativeFilmVideoRateMinPrem;
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;

                            rateInfo = "EPKG\tRate\tPremium\tCoverage\tMin Prem\n";
                            rateInfo = rateInfo + "EPKG\tflat\t\$500\t\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tNegative Film & Videotape\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tFaulty Stock & Camera Processing\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tMiscellaneous Rented Equipment\t\n";;
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tProps, Sets & Wardrobe\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tThird Party Prop Damage Liab\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tExtra Expense\t\n";

                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rate\tFlat\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Premium\t\$500\n";


                            def tempLimit = params.totalBudget.toDouble()


                            if (params.productsSelected.contains("NOHA")) {
                                def NOHARateMinPrem = ["flat", 500];

                                premiumsMap["Hired Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Hired Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Hired Auto Physical Damage"] = "\$1,000,000"
                                productTotalPremium = productTotalPremium + NOHARateMinPrem[1]

                                rateInfo = rateInfo + "EPKG\tflat\t\$500\tHired Auto Physical Damage\t\n";

                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Hired Auto Physical Damage\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}${twoSpaces}Rate\t${NOHARateMinPrem[0]}\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}${twoSpaces}Premium\t${NOHARateMinPrem[1]}\n";

                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired & Non-Owned Auto Physical Damage")
                            }
                            indicationRateInfo = indicationRateInfo + "Entertainment Package Premium\t${moneyFormat.format(productTotalPremium)}\n";
                        }
                        else if (productID == "PIP 2") {
                            def PIP2premium = pip2_PIP2premium;
                            def negativeFilmVideoRateMinPrem = pip2_negativeFilmVideoRateMinPrem;
                            def faultyStockCameraProcessingRateMinPrem = pip2_faultyStockCameraProcessingRateMinPrem;
                            def miscRentedEquipRateMinPrem = pip2_miscRentedEquipRateMinPrem;
                            def propsSetWardrobeRateMinPrem = pip2_propsSetWardrobeRateMinPrem;
                            def thirdPartyPropDamageRateMinPrem = pip2_thirdPartyPropDamageRateMinPrem;
                            def extraExpenseRateMinPrem = pip2_extraExpenseRateMinPrem;
                            def officeContentsRateMinPrem = pip2_officeContentsRateMinPrem;

                            //PIP 2 Premium is a flat rate of 1000
                            def premium = PIP2premium;
                            productTotalPremium = premium;

                            premiumsMap["Negative Film & Videotape"] = negativeFilmVideoRateMinPrem;
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;
                            premiumsMap["Office Contents"] = officeContentsRateMinPrem;


                            rateInfo = "EPKG\tRate\tPremium\tCoverage\tMin Prem\n";
                            rateInfo = rateInfo + "EPKG\tflat\t\$1,000\t\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tNegative Film & Videotape\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tFaulty Stock & Camera Processing\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tMiscellaneous Rented Equipment\t\n";;
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tProps, Sets & Wardrobe\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tThird Party Prop Damage Liab\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tExtra Expense\t\n";
                            rateInfo = rateInfo + "EPKG\tflat\tincl\tOffice Contents\t\n";

                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rate\tFlat\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Premium\t\$1000\n";

                            def tempLimit = params.totalBudget.toDouble()

                            if (params.productsSelected.contains("NOHA")) {
                                def NOHARateMinPrem = pip2_NOHARateMinPrem;

                                premiumsMap["Hired Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Hired Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Hired Auto Physical Damage"] = "\$1,000,000"
                                productTotalPremium = productTotalPremium + NOHARateMinPrem[1]
                                rateInfo = rateInfo + "EPKG\tflat\t\$500\tHired Auto Physical Damage\t\n";

                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Hired Auto Physical Damage\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}${twoSpaces}Rate\t${NOHARateMinPrem[0]}\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}${twoSpaces}Premium\t${NOHARateMinPrem[1]}\n";
                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired & Non-Owned Auto Physical Damage")
                            }

                            indicationRateInfo = indicationRateInfo + "Entertainment Package Premium\t${moneyFormat.format(productTotalPremium)}\n";

                        }
                        else if (productID == "PIP 3") {
                            def premium = 0.0;

                            def negativeFilmVideoRateMinPrem = pip3_negativeFilmVideoRateMinPrem; //[0.6, 1500];
                            def faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
                            def miscRentedEquipRateMinPrem = ["flat", "incl"];
                            def propsSetWardrobeRateMinPrem = ["flat", "incl"];
                            def thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
                            def extraExpenseRateMinPrem = ["flat", "incl"];
                            def officeContentsRateMinPrem = ["flat", "incl"];

                            //CALCULATE IF MINIMUM PREMIUM IS MET
                            def rate = negativeFilmVideoRateMinPrem[0];
                            def minPremium = negativeFilmVideoRateMinPrem[1];
                            if (((params.totalBudget.toDouble().toDouble() * rate) / 100) > minPremium) {
                                premium = (params.totalBudget.toDouble().toDouble() * rate) / 100;
                            } else {
                                premium = minPremium
                            }
                            productTotalPremium = premium

                            premiumsMap["Negative Film & Videotape"] = [rate, "incl"];
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;
                            premiumsMap["Office Contents"] = officeContentsRateMinPrem;

                            deductsMap["Miscellaneous Rented Equipment"] = "\$2,500"

                            rateInfo = "EPKG\tRate\tPremium\tCoverage\tMin Prem\n";
                            rateInfo = rateInfo + "EPKG\t${rate}\t${moneyFormat.format(productTotalPremium)}\t\t${moneyFormat.format(minPremium)}\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tNegative Film & Videotape\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tFaulty Stock & Camera Processing\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tMiscellaneous Rented Equipment\t\n";;
                            rateInfo = rateInfo + "EPKG\t\tincl\tProps, Sets & Wardrobe\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tThird Party Prop Damage Liab\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tExtra Expense\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tOffice Contents\t\n";

                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rate\t${rate}\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Min Premium\t${moneyFormat.format(minPremium)}\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rated Premium\t${moneyFormat.format(productTotalPremium)}\n";

                            //IF FILM WITH CAST AND NO WC, ROUND LIMITS TO NEAREST 1000'S
                            def tempLimit = params.totalBudget.toDouble()
                            deductsMap.remove("Miscellaneous Rented Equipment*")
                            deductsMap.remove("*Hired Auto Physical Damage")
                            if (true) {
                                def NOHARateMinPrem = ["flat", "incl"];

                                premiumsMap["Non-Owned Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Non-Owned Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Non-Owned Auto Physical Damage"] = "\$1,000,000"
                                rateInfo = rateInfo + "EPKG\t\tincl\tNon-Owned Auto Physical Damage\t\n";

                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("*Hired Auto Physical Damage")

                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")
                            }



                        }
                        else if (productID == "PIP 4") {
                            def premium = 0.0
                            def negativeFilmVideoRateMinPrem = pip4_negativeFilmVideoRateMinPrem; //[0.6, 2000]
                            def faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
                            def miscRentedEquipRateMinPrem = ["flat", "incl"];
                            def propsSetWardrobeRateMinPrem = ["flat", "incl"];
                            def thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
                            def extraExpenseRateMinPrem = ["flat", "incl"];
                            def officeContentsRateMinPrem = ["flat", "incl"];

                            //CALCULATE IF MINIMUM PREMIUM IS MET
                            def rate = negativeFilmVideoRateMinPrem[0];
                            def minPremium = negativeFilmVideoRateMinPrem[1];

                            if (((params.totalBudget.toDouble() * rate) / 100) > minPremium) {
                                premium = (params.totalBudget.toDouble() * rate) / 100;
                            } else {
                                premium = minPremium
                            }
                            productTotalPremium = premium

                            premiumsMap["Negative Film & Videotape"] = [rate, "incl"];
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;
                            premiumsMap["Office Contents"] = officeContentsRateMinPrem;

                            rateInfo = "EPKG\tRate\tPremium\tCoverage\tMin Prem\n";
                            rateInfo = rateInfo + "EPKG\t${rate}\t${moneyFormat.format(productTotalPremium)}\t\t${moneyFormat.format(minPremium)}\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tNegative Film & Videotape\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tFaulty Stock & Camera Processing\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tMiscellaneous Rented Equipment\t\n";;
                            rateInfo = rateInfo + "EPKG\t\tincl\tProps, Sets & Wardrobe\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tThird Party Prop Damage Liab\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tExtra Expense\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tOffice Contents\t\n";

                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rate\t${rate}\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Min Premium\t${moneyFormat.format(minPremium)}\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rated Premium\t${moneyFormat.format(productTotalPremium)}\n";


                            deductsMap["Miscellaneous Rented Equipment"] = "\$3,500";
                            deductsMap.remove("Miscellaneous Rented Equipment*")
                            deductsMap.remove("Hired Auto Physical Damage*")
                            //IF FILM WITH CAST AND NO WC, ROUND LIMITS TO NEAREST 1000'S
                            def tempLimit = params.totalBudget.toDouble()

                            if (true) {
                                def NOHARateMinPrem = ["flat", "incl"];

                                premiumsMap["Non-Owned Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Non-Owned Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Non-Owned Auto Physical Damage"] = "\$1,000,000"
                                rateInfo = rateInfo + "EPKG\t\tincl\tNon-Owned Auto Physical Damage\t\n";

                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")

                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")
                            }

                        }
                        else if (productID == "PIP 5") {
                            def premium = 0.0
                            def negativeFilmVideoRateMinPrem = [0.6, 2500];
                            def faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
                            def miscRentedEquipRateMinPrem = ["flat", "incl"];
                            def propsSetWardrobeRateMinPrem = ["flat", "incl"];
                            def thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
                            def extraExpenseRateMinPrem = ["flat", "incl"];
                            def officeContentsRateMinPrem = ["flat", "incl"];
                            def civilAuthority100Limit = ["flat", 250];
                            def civilAuthority500Limit = ["flat", 500];

                            //CALCULATE IF MINIMUM PREMIUM IS MET
                            def rate = negativeFilmVideoRateMinPrem[0];
                            def minPremium = negativeFilmVideoRateMinPrem[1];


                            productTotalPremium = (params.totalBudget.toDouble() * rate) / 100;

                            premiumsMap["Negative Film & Videotape"] = [rate, "incl"];
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;
                            premiumsMap["Office Contents"] = officeContentsRateMinPrem;

                            rateInfo = "EPKG\tRate\tPremium\tCoverage\tMin Prem\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tNegative Film & Videotape\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tFaulty Stock & Camera Processing\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tMiscellaneous Rented Equipment\t\n";;
                            rateInfo = rateInfo + "EPKG\t\tincl\tProps, Sets & Wardrobe\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tThird Party Prop Damage Liab\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tExtra Expense\t\n";
                            rateInfo = rateInfo + "EPKG\t\tincl\tOffice Contents\t\n";

                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rate\t${rate}\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Min Premium\t${moneyFormat.format(minPremium)}\n";


//                            deductsMap["Miscellaneous Rented Equipment"] = deductsMap["Miscellaneous Rented Equipment*"]
                            deductsMap["Miscellaneous Rented Equipment"] = "\$3,500";
                            deductsMap.remove("Miscellaneous Rented Equipment*")
                            deductsMap.remove("Hired Auto Physical Damage*")
                            //IF FILM WITH CAST AND NO WC, ROUND LIMITS TO NEAREST 1000'S
                            def tempLimit = params.totalBudget.toDouble()

//                            def deductsMap = [:];



                            if (params.additionalProducts.contains("EPKGCIVIL100AdditionalCoverage")) {
                                premiumsMap["Civil Authority (US Only)"] = civilAuthority100Limit;
                                deductsMap["Civil Authority (US Only)"] = "\$3500";
                                limitsMap["Civil Authority (US Only)"] = "\$100000";
                                productTotalPremium = productTotalPremium + civilAuthority100Limit[1];
                                rateInfo = rateInfo + "EPKG\tflat\t\$250\tCivil Authority (US Only)\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Civil Authority (US Only)\t\$250\n";

                            } else if (params.additionalProducts.contains("EPKGCIVIL500AdditionalCoverage")) {
                                premiumsMap["Civil Authority (US Only)"] = civilAuthority500Limit;
                                deductsMap["Civil Authority (US Only)"] = "\$5000";
                                limitsMap["Civil Authority (US Only)"] = "\$500000";
                                productTotalPremium = productTotalPremium + civilAuthority500Limit[1];
                                rateInfo = rateInfo + "EPKG\tflat\t\$500\tCivil Authority (US Only)\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Civil Authority (US Only)\t\$500\n";
                            }

                            if (params.additionalProducts.contains("EPKGBirdsFishAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Domestic Birds/Fish)"] = ["flat", 100];
                                deductsMap["Animal Mortality Under Cast Insurance (Domestic Birds/Fish)"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Domestic Birds/Fish)"] = "\$25000";
                                productTotalPremium = productTotalPremium + 100;
                                rateInfo = rateInfo + "EPKG\tflat\t\$100\tAnimal Mortality Under Cast Insurance (Domestic Birds/Fish)\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Animal Mortality Under Cast Insurance (Domestic Birds/Fish)\t\$100\n";
                            }
                            if (params.additionalProducts.contains("EPKGDogsAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)"] = ["flat", 150];
                                deductsMap["Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)"] = "\$25000";
                                productTotalPremium = productTotalPremium + 150;
                                rateInfo = rateInfo + "EPKG\tflat\t\$150\tAnimal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)\t\$150\n";

                            }
                            if (params.additionalProducts.contains("EPKGReptilesAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))"] = ["flat", 150];
                                deductsMap["Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))"] = "\$25000";
                                productTotalPremium = productTotalPremium + 150;
                                rateInfo = rateInfo + "EPKG\tflat\t\$150\tAnimal Mortality Under Cast Insurance (Reptiles (Non-Venomous))\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))\t\$150\n";

                            }
                            if (params.additionalProducts.contains("EPKGSmallOtherAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))"] = ["flat", 200];
                                deductsMap["Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))"] = "\$25000";
                                productTotalPremium = productTotalPremium + 200;
                                rateInfo = rateInfo + "EPKG\tflat\t\$200\tAnimal Mortality Under Cast Insurance (Small Domestic Animals (Other))\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))\t\$200\n";

                            }
                            if (params.additionalProducts.contains("EPKGFarmAnimalsAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Farm Animals)"] = ["flat", 250];
                                deductsMap["Animal Mortality Under Cast Insurance (Farm Animals)"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Farm Animals)"] = "\$25000";
                                productTotalPremium = productTotalPremium + 250;
                                rateInfo = rateInfo + "EPKG\tflat\t\$250\tAnimal Mortality Under Cast Insurance (Farm Animals)\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Animal Mortality Under Cast Insurance (Farm Animals)\t\$250\n";

                            }
                            if (params.additionalProducts.contains("EPKGWildCatsAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Wild Cats (Caged))"] = ["flat", 500];
                                deductsMap["Animal Mortality Under Cast Insurance (Wild Cats (Caged))"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Wild Cats (Caged))"] = "\$25000";
                                productTotalPremium = productTotalPremium + 500;
                                rateInfo = rateInfo + "EPKG\tflat\t\$500\tAnimal Mortality Under Cast Insurance (Wild Cats (Caged))\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Animal Mortality Under Cast Insurance (Wild Cats (Caged))\t\$500\n";

                            }
                            if (params.additionalProducts.contains("EPKGOtherReferAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (All Others - Refer Only)"] = ["flat", "Refer"];
                                deductsMap["Animal Mortality Under Cast Insurance (All Others - Refer Only)"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (All Others - Refer Only)"] = "\$25000";
                                rateInfo = rateInfo + "EPKG\tflat\tRefer\tAnimal Mortality Under Cast Insurance (All Others - Refer Only)\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Animal Mortality Under Cast Insurance (All Others - Refer Only)\tRefer\n";

                            }

                                premiumsMap["Money and Currency"] = ["flat", "incl"];
                                deductsMap["Money and Currency"] = "\$2,500";
                                limitsMap["Money and Currency"] = "\$25,000";
                                productTotalPremium = productTotalPremium + 0;
                                rateInfo = rateInfo + "EPKG\tflat\tincl\tMoney and Currency\t\n";

                                premiumsMap["Furs, Jewelry, Art & Antiques"] = ["flat", "incl"];
                                deductsMap["Furs, Jewelry, Art & Antiques"] = "\$2,500";
                                limitsMap["Furs, Jewelry, Art & Antiques"] = "\$25,000";
                                productTotalPremium = productTotalPremium + 0;
                                rateInfo = rateInfo + "EPKG\tflat\tincl\tFurs, Jewelry, Art & Antiques\t\n";

                                premiumsMap["Talent and Non Budgeted Costs"] = ["flat", "incl"];
                                deductsMap["Talent and Non Budgeted Costs"] = "\$2,500";
                                limitsMap["Talent and Non Budgeted Costs"] = "\$25,000";
                                productTotalPremium = productTotalPremium + 0;
                                rateInfo = rateInfo + "EPKG\tflat\tincl\tTalent and Non Budgeted Costs\t\n";

                                premiumsMap["Administrative Costs"] = ["flat", "incl"];
                                deductsMap["Administrative Costs"] = "\$2,500";
                                limitsMap["Administrative Costs"] = "\$25,000";
                                productTotalPremium = productTotalPremium + 0;
                                rateInfo = rateInfo + "EPKG\tflat\tincl\tAdministrative Costs\t\n";

                                premiumsMap["Hardware"] = ["flat", "incl"];
                                deductsMap["Hardware"] = "\$2,500";
                                limitsMap["Hardware"] = "\$25,000";
                                productTotalPremium = productTotalPremium + 0;
                                rateInfo = rateInfo + "EPKG\tflat\tincl\tHardware\t\n";

                                premiumsMap["Data and Media"] = ["flat", "incl"];
                                deductsMap["Data and Media"] = "\$2,500";
                                limitsMap["Data and Media"] = "\$25,000";
                                productTotalPremium = productTotalPremium + 0;
                                rateInfo = rateInfo + "EPKG\tflat\tincl\tData and Media\t\n";

                                premiumsMap["Electronic Data Extra Expense"] = ["flat", "incl"];
                                deductsMap["Electronic Data Extra Expense"] = "\$2,500";
                                limitsMap["Electronic Data Extra Expense"] = "\$25,000";
                                productTotalPremium = productTotalPremium + 0;
                                rateInfo = rateInfo + "EPKG\tflat\tincl\tExtra Expense\t\n";

                            if (true) {
                                def NOHARateMinPrem = ["flat", "incl"];

                                premiumsMap["Non-Owned Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Non-Owned Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Non-Owned Auto Physical Damage"] = "\$1,000,000"

                                rateInfo = rateInfo + "EPKG\t\tincl\tNon-Owned Auto Physical Damage\t\n";


                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")

                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")
                            }

                            if ( productTotalPremium > minPremium) {
                                productTotalPremium = productTotalPremium
                            } else {
                                productTotalPremium = minPremium
                            }
                            rateInfo = rateInfo + "EPKG\t${rate}\t${moneyFormat.format(productTotalPremium)}\t\t${moneyFormat.format(minPremium)}\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rated Premium\t${moneyFormat.format(productTotalPremium)}\n";

                        }
                        else if (productID == "EPKG37"){
                            def tempLimitsMap = [:]
                            def tempDeductsMap = [:]
                            def tempPremiumsMap = [:]
                            def premium = 0.0
                            def castInsuranceMinPrem = ["flat", "incl"];
                            def negativeFilmVideoRateMinPrem = ["flat", "incl"];
                            def faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
                            def miscRentedEquipRateMinPrem = ["flat", "incl"];
                            def propsSetWardrobeRateMinPrem = ["flat", "incl"];
                            def thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
                            def extraExpenseRateMinPrem = ["flat", "incl"];
                            def officeContentsRateMinPrem = ["flat", "incl"];

                            //CALCULATE IF MINIMUM PREMIUM IS MET
                            ///GPC RATE = .65-1.45
                            ///NIPC RATE = .5-1.10
                            def rate = 1;
                            def minPremium = 5750;

                            if (((params.totalBudget.toDouble() * rate) / 100) > minPremium) {
                                premium = (params.totalBudget.toDouble() * rate) / 100;
                            } else {
                                premium = minPremium
                            }
                            productTotalPremium = premium

                            tempPremiumsMap["Negative Film & Videotape"] = negativeFilmVideoRateMinPrem;
                            tempPremiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            tempPremiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            tempPremiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            tempPremiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            tempPremiumsMap["Extra Expense"] = extraExpenseRateMinPrem;
                            tempPremiumsMap["Office Contents"] = officeContentsRateMinPrem;

                            tempLimitsMap["Negative Film & Videotape"] = "\$" + params.totalBudget;
                            tempLimitsMap["Faulty Stock & Camera Processing"] = "\$" + params.totalBudget;
                            tempLimitsMap["Miscellaneous Rented Equipment"] = "\$1,000,000";
                            tempLimitsMap["Props, Sets & Wardrobe"] = "\$1,000,000";
                            tempLimitsMap["Third Party Prop Damage Liab"] = "\$1,000,000";
                            tempLimitsMap["Extra Expense"] = "\$1,000,000";
                            tempLimitsMap["Office Contents"] = "\$50,000";

                            tempDeductsMap["Negative Film & Videotape"] = "\$5,000";
                            tempDeductsMap["Faulty Stock & Camera Processing"] = "\$5,000";
                            tempDeductsMap["Miscellaneous Rented Equipment"] = "\$3,500";
                            tempDeductsMap["Props, Sets & Wardrobe"] = "\$2,500";
                            tempDeductsMap["Third Party Prop Damage Liab"] = "\$2,500";
                            tempDeductsMap["Extra Expense"] = "\$3,500";
                            tempDeductsMap["Office Contents"] = "\$1,000";



                            if(params.riskType == "Film Projects With Cast (No Work Comp)"){
                                def tempLimit = params.totalBudget.toDouble()
                                tempLimit = Math.ceil(tempLimit / 1000) * 1000;

                                tempPremiumsMap["Cast Insurance (Up to 10)"] = ["flat", premium];
                                tempDeductsMap["Cast Insurance (Up to 10)"] = "\$25,000";
                                tempLimitsMap["Cast Insurance (Up to 10)"] = "\$" + String.format("%.0f", tempLimit.trunc());

                                tempPremiumsMap["INC:Non-Owned Auto Physical Damage"] = ["flat", "incl"];
                                tempLimitsMap["INC:Non-Owned Auto Physical Damage"] = "Included Under Misc. Rented Equip." ;
//                                tempDeductsMap["INC:Non-Owned Auto Physical Damage"] = "";
                                tempDeductsMap["INC:Non-Owned Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";

                                //IF FILM WITH CAST AND NO WC, ROUND LIMITS TO NEAREST 1000'S
                                tempLimitsMap["Negative Film & Videotape"] = "\$" + String.format("%.0f", tempLimit.trunc())
                                tempLimitsMap["Faulty Stock & Camera Processing"] = "\$" + String.format("%.0f", tempLimit.trunc())

                                rateInfo = "EPKG\tRate\tPremium\tCoverage\tMin Prem\n";
                                rateInfo = rateInfo + "EPKG\t${rate}\t${moneyFormat.format(premium)}\t\t${moneyFormat.format(minPremium)}\n";
                                rateInfo = rateInfo + "EPKG\t\tincl\tNegative Film & Videotape\t\n";
                                rateInfo = rateInfo + "EPKG\t\tincl\tFaulty Stock & Camera Processing\t\n";
                                rateInfo = rateInfo + "EPKG\t\tincl\tMiscellaneous Rented Equipment\t\n";;
                                rateInfo = rateInfo + "EPKG\t\tincl\tProps, Sets & Wardrobe\t\n";
                                rateInfo = rateInfo + "EPKG\t\tincl\tThird Party Prop Damage Liab\t\n";
                                rateInfo = rateInfo + "EPKG\t\tincl\tExtra Expense\t\n";
                                rateInfo = rateInfo + "EPKG\t\tincl\tOffice Contents\t\n";
                                rateInfo = rateInfo + "EPKG\t\tincl\tNon-Owned Auto Physical Damage\t\n";

                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rate\t${rate}\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Min Premium\t${moneyFormat.format(minPremium)}\n";

                                if (params.additionalProducts.contains("EPKGCASTEssentialAdditionalCoverage")) {
                                    def castPremium = (params.totalBudget.toDouble() *  1.1) / 100
                                    def castEssentialNum =0;
                                    if(params.castEssentialNum.isInteger()){
                                        castEssentialNum = params.castEssentialNum.toInteger();
                                    }

                                    def costPerEssential = 3500;
                                    def totalCastEssentialCost = costPerEssential*castEssentialNum
                                    tempPremiumsMap["Cast Essential"] = ["flat", totalCastEssentialCost];
                                    tempDeductsMap["Cast Essential"] = "Nil";
                                    tempLimitsMap["Cast Essential"] = "Included Under Cast" ;
                                    productTotalPremium = productTotalPremium + (totalCastEssentialCost);
                                    rateInfo = rateInfo + "EPKG\t1.1\t${totalCastEssentialCost}\tCast Essential\t\n";

                                }

                                if (params.additionalProducts.contains("EPKGFWCNWCCIVIL100AdditionalCoverage")) {
                                    tempPremiumsMap["Civil Authority (US Only)"] = ["flat", 250];
                                    tempDeductsMap["Civil Authority (US Only)"] = "\$7,000";
                                    tempLimitsMap["Civil Authority (US Only)"] = "\$100,000";
                                    productTotalPremium = productTotalPremium + 250;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$250\tCivil Authority (US Only)\t\n";
                                }
                                else if (params.additionalProducts.contains("EPKGFWCNWCCIVIL500AdditionalCoverage")) {
                                    tempPremiumsMap["Civil Authority (US Only)"] = ["flat", 550];
                                    tempDeductsMap["Civil Authority (US Only)"] = "\$10,000";
                                    tempLimitsMap["Civil Authority (US Only)"] = "\$100,000+";
                                    productTotalPremium = productTotalPremium + 550;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$550\tCivil Authority (US Only)\t\n";

                                }

                                if (params.additionalProducts.contains("EPKGFWCNWCAnimalAdditionalCoverage")) {
                                    tempPremiumsMap["Animal Mortality"] = ["flat", 250];
                                    tempDeductsMap["Animal Mortality"] = "\$2,500";
                                    tempLimitsMap["Animal Mortality"] = "\$2,500";
                                    productTotalPremium = productTotalPremium + 250;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$250\tAnimal Mortality\t\n";
                                }

                                if (params.additionalProducts.contains("EPKGBirdsFishAdditionalCoverage")) {
                                    tempPremiumsMap["Animal Mortality (Birds or Fish)"] = ["flat", 250];
                                    tempDeductsMap["Animal Mortality (Birds or Fish)"] = "\$2,500";
                                    tempLimitsMap["Animal Mortality (Birds or Fish)"] = "\$2,500";
                                    productTotalPremium = productTotalPremium + 250;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$250\tAnimal Mortality (Birds or Fish)\t\n";
                                }

                                if (params.additionalProducts.contains("EPKGDogsAdditionalCoverage")) {
                                    tempPremiumsMap["Animal Mortality (Dogs w/ Breed Exceptions)"] = ["flat", 250];
                                    tempDeductsMap["Animal Mortality (Dogs w/ Breed Exceptions)"] = "\$2,500";
                                    tempLimitsMap["Animal Mortality (Dogs w/ Breed Exceptions)"] = "\$2,500";
                                    productTotalPremium = productTotalPremium + 250;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$250\tAnimal Mortality (Dogs w/ Breed Exceptions)\t\n";
                                }

                                if (params.additionalProducts.contains("EPKGReptilesAdditionalCoverage")) {
                                    tempPremiumsMap["Animal Mortality (Reptiles Non-Venomous)"] = ["flat", 250];
                                    tempDeductsMap["Animal Mortality (Reptiles Non-Venomous)"] = "\$2,500";
                                    tempLimitsMap["Animal Mortality (Reptiles Non-Venomous)"] = "\$2,500";
                                    productTotalPremium = productTotalPremium + 250;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$250\tAnimal Mortality (Reptiles Non-Venomous)\t\n";
                                }

                                if (params.additionalProducts.contains("EPKGSmallOtherAdditionalCoverage")) {
                                    tempPremiumsMap["Animal Mortality (Small Domestic Animals - Other)"] = ["flat", 250];
                                    tempDeductsMap["Animal Mortality (Small Domestic Animals - Other)"] = "\$2,500";
                                    tempLimitsMap["Animal Mortality (Small Domestic Animals - Other)"] = "\$2,500";
                                    productTotalPremium = productTotalPremium + 250;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$250\tAnimal Mortality (Small Domestic Animals - Other)\t\n";
                                }

                                if (params.additionalProducts.contains("EPKGFarmAnimalsAdditionalCoverage")) {
                                    tempPremiumsMap["Animal Mortality (Farm Animals)"] = ["flat", 250];
                                    tempDeductsMap["Animal Mortality (Farm Animals)"] = "\$2,500";
                                    tempLimitsMap["Animal Mortality (Farm Animals)"] = "\$2,500";
                                    productTotalPremium = productTotalPremium + 250;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$250\tAnimal Mortality (Farm Animals)\t\n";
                                }

                                if (params.additionalProducts.contains("EPKGWildCatsAdditionalCoverage")) {
                                    tempPremiumsMap["Animal Mortality (Wild Cats - Caged)"] = ["flat", 250];
                                    tempDeductsMap["Animal Mortality (Wild Cats - Caged)"] = "\$2,500";
                                    tempLimitsMap["Animal Mortality (Wild Cats - Caged)"] = "\$2,500";
                                    productTotalPremium = productTotalPremium + 250;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$250\tAnimal Mortality (Wild Cats - Caged)\t\n";
                                }

                                if (params.additionalProducts.contains("EPKGOtherReferAdditionalCoverage")) {
                                    tempPremiumsMap["Animal Mortality (All Others - Refer Only)"] = ["flat", "incl"];
                                    tempDeductsMap["Animal Mortality (All Others - Refer Only)"] = "\$2,500";
                                    tempLimitsMap["Animal Mortality (All Others - Refer Only)"] = "\$2,500";
                                    productTotalPremium = productTotalPremium + 0;
                                    rateInfo = rateInfo + "EPKG\tflat\t\$0\tAnimal Mortality (All Others - Refer Only)\t\n";
                                }

                                if (params.additionalProducts.contains("EPKGMoneySecurityAdditionalCoverage")) {

                                    productTotalPremium = productTotalPremium + 0;
                                }

                                    tempPremiumsMap["Money and Currency"] = ["flat", "incl"];
                                    tempDeductsMap["Money and Currency"] = "\$2,500";
                                    tempLimitsMap["Money and Currency"] = "\$25,000";
                                    productTotalPremium = productTotalPremium + 0;
                                    rateInfo = rateInfo + "EPKG\tflat\tincl\tMoney and Currency\t\n";

                                    tempPremiumsMap["Furs, Jewelry, Art & Antiques"] = ["flat", "incl"];
                                    tempDeductsMap["Furs, Jewelry, Art & Antiques"] = "\$2,500";
                                    tempLimitsMap["Furs, Jewelry, Art & Antiques"] = "\$25,000";
                                    productTotalPremium = productTotalPremium + 0;
                                    rateInfo = rateInfo + "EPKG\tflat\tincl\tFurs, Jewelry, Art & Antiques\t\n";

                                    tempPremiumsMap["Talent and Non Budgeted Costs"] = ["flat", "incl"];
                                    tempDeductsMap["Talent and Non Budgeted Costs"] = "\$2,500";
                                    tempLimitsMap["Talent and Non Budgeted Costs"] = "\$25,000";
                                    productTotalPremium = productTotalPremium + 0;
                                    rateInfo = rateInfo + "EPKG\tflat\tincl\tTalent and Non Budgeted Costs\t\n";

                                    tempPremiumsMap["Administrative Costs"] = ["flat", "incl"];
                                    tempDeductsMap["Administrative Costs"] = "\$2,500";
                                    tempLimitsMap["Administrative Costs"] = "\$25,000";
                                    productTotalPremium = productTotalPremium + 0;
                                    rateInfo = rateInfo + "EPKG\tflat\tincl\tAdministrative Costs\t\n";

                                    tempPremiumsMap["Hardware"] = ["flat", "incl"];
                                    tempDeductsMap["Hardware"] = "\$2,500";
                                    tempLimitsMap["Hardware"] = "\$25,000";
                                    productTotalPremium = productTotalPremium + 0;
                                    rateInfo = rateInfo + "EPKG\tflat\tincl\tHardware\t\n";

                                    tempPremiumsMap["Data and Media"] = ["flat", "incl"];
                                    tempDeductsMap["Data and Media"] = "\$2,500";
                                    tempLimitsMap["Data and Media"] = "\$25,000";
                                    productTotalPremium = productTotalPremium + 0;
                                    rateInfo = rateInfo + "EPKG\tflat\tincl\tData and Media\t\n";

                                    tempPremiumsMap["Electronic Data Extra Expense"] = ["flat", "incl"];
                                    tempDeductsMap["Electronic Data Extra Expense"] = "\$2,500";
                                    tempLimitsMap["Electronic Data Extra Expense"] = "\$25,000";
                                    productTotalPremium = productTotalPremium + 0;
                                    rateInfo = rateInfo + "EPKG\tflat\tincl\tExtra Expense\t\n";

                                lobString = "Entertainment Package" + "\t" + Math.ceil(productTotalPremium) + "\t" + grossPct + "\t" + agentPct+"\r"
                                limitsMap = tempLimitsMap
                                deductsMap = tempDeductsMap
                                premiumsMap = tempPremiumsMap
                            }
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rated Premium\t${moneyFormat.format(productTotalPremium)}\n";

                        }

                        lobString = "Entertainment Package" + "\t" + Math.ceil(productTotalPremium) + "\t" + grossPct + "\t" + agentPct+"\r"
                    }
                    else if (coverageID == "CGL" || coverageID == "CPK") {
                        def rate = 0.0;
                        def premium = 0;
                        def minPremium = 0;

                        def tempLimitsMap = [:]
                        def tempDeductsMap = [:]
                        def tempPremiumsMap = [:]
                        if(params.riskType == "Film Projects With Cast (No Work Comp)"){
                            if(termLength <= 60){
                                tempLimitsMap["Blanket Additional Insured Endorsement"] = "";
                                tempDeductsMap["Blanket Additional Insured Endorsement"] = "";
                            }

                            if (params.additionalProducts.contains("AGGAdditionalCoverage")) {
                                tempLimitsMap["General Aggregate Limit"] = "\$2000000"
                                rate = 0.324
                                minPremium = 1500
                            }
                            else{
                                tempLimitsMap["General Aggregate Limit"] = "\$1000000"
                                rate = 0.319
                                minPremium = 1500
                            }
                            tempLimitsMap["Products & Completed Operations"] = "\$1000000"
                            tempLimitsMap["Personal & Advertising Injury"] = "\$1000000"
                            tempLimitsMap["Each Occurrence"] = "\$1000000"
                            tempLimitsMap["Fire Damage (Any One Fire)"] = "\$100000"


                            tempDeductsMap["General Aggregate Limit"] = "Nil"
                            tempDeductsMap["Products & Completed Operations"] = "Nil"
                            tempDeductsMap["Personal & Advertising Injury"] = "Nil"
                            tempDeductsMap["Each Occurrence"] = "Nil"
                            tempDeductsMap["Fire Damage (Any One Fire)"] = "Nil"

                        }
                        else{
                            if(termLength <= 60){
                                tempLimitsMap["Blanket Additional Insured Endorsement"] = "";
                                tempDeductsMap["Blanket Additional Insured Endorsement"] = "";//$500
                            }
                            if (termLength <= 30) {
                                rate = 0.319
                                minPremium = 450

                                if (params.additionalProducts.contains("AGGAdditionalCoverage")) {
                                    tempLimitsMap["General Aggregate Limit"] = "\$2000000"
                                }
                                else{
                                    tempLimitsMap["General Aggregate Limit"] = "\$1000000"
                                }
                                tempLimitsMap["Products & Completed Operations"] = "\$1000000"
                                tempLimitsMap["Personal & Advertising Injury"] = "\$1000000"
                                tempLimitsMap["Each Occurrence"] = "\$1000000"
                                tempLimitsMap["Fire Damage (Any One Fire)"] = "\$100000"

                                tempDeductsMap["General Aggregate Limit"] = "Nil"
                                tempDeductsMap["Products & Completed Operations"] = "Nil"
                                tempDeductsMap["Personal & Advertising Injury"] = "Nil"
                                tempDeductsMap["Each Occurrence"] = "Nil"
                                tempDeductsMap["Fire Damage (Any One Fire)"] = "Nil"

                            }
                            else if (termLength <= 60) {
                                rate = 0.324
                                minPremium = 500

                                if (params.additionalProducts.contains("AGGAdditionalCoverage")) {
                                    tempLimitsMap["General Aggregate Limit"] = "\$2000000"
                                }
                                else{
                                    tempLimitsMap["General Aggregate Limit"] = "\$1000000"
                                }
                                tempLimitsMap["Products & Completed Operations"] = "\$1000000"
                                tempLimitsMap["Personal & Advertising Injury"] = "\$1000000"
                                tempLimitsMap["Each Occurrence"] = "\$1000000"
                                tempLimitsMap["Fire Damage (Any One Fire)"] = "\$100000"

                                tempDeductsMap["General Aggregate Limit"] = "Nil"
                                tempDeductsMap["Products & Completed Operations"] = "Nil"
                                tempDeductsMap["Personal & Advertising Injury"] = "Nil"
                                tempDeductsMap["Each Occurrence"] = "Nil"
                                tempDeductsMap["Fire Damage (Any One Fire)"] = "Nil"

                            }
                            else {
                                rate = 0.324
                                minPremium = 1000

                                if (params.additionalProducts.contains("AGGAdditionalCoverage")) {
                                    tempLimitsMap["General Aggregate Limit"] = "\$2000000"
                                }
                                else{
                                    tempLimitsMap["General Aggregate Limit"] = "\$1000000"
                                }
                                tempLimitsMap["Products & Completed Operations"] = "\$1000000"
                                tempLimitsMap["Personal & Advertising Injury"] = "\$1000000"
                                tempLimitsMap["Each Occurrence"] = "\$1000000"
                                tempLimitsMap["Fire Damage (Any One Fire)"] = "\$100000"

                                tempDeductsMap["General Aggregate Limit"] = "Nil"
                                tempDeductsMap["Products & Completed Operations"] = "Nil"
                                tempDeductsMap["Personal & Advertising Injury"] = "Nil"
                                tempDeductsMap["Each Occurrence"] = "Nil"
                                tempDeductsMap["Fire Damage (Any One Fire)"] = "Nil"
                            }
                        }

                        log.info "RATE " + rate
                        log.info "params.totalBudget " + params.totalBudget

                        def totalBudget = params.totalBudget.toDouble();
                        def remainingBudget = totalBudget;
                        def premiumRunningTotal = 0.0;

                        //1ST $500,000 RATING
                        if(totalBudget > 500000){
                            remainingBudget = totalBudget - 500000;
                            premiumRunningTotal = (500000 * rate) / 100
                        }
                        else{
                            premiumRunningTotal = (totalBudget * rate) / 100;
                            remainingBudget = 0;
                        }
                        log.info("1st 500,000")
                        log.info premiumRunningTotal

                        //SECOND $500,000 RATING
                        if(remainingBudget > 500000){
                            remainingBudget = remainingBudget - 500000;
                            premiumRunningTotal = premiumRunningTotal + ((500000 * 0.162) / 100)
                        }
                        else{
                            premiumRunningTotal =  premiumRunningTotal + (remainingBudget * 0.162) / 100;
                            remainingBudget = 0;
                        }
                        log.info("2nd 500,000")
                        log.info premiumRunningTotal

                        //NEXT $1 MILLION RATING
                        if(remainingBudget > 1000000){
                            remainingBudget = remainingBudget - 1000000;
                            premiumRunningTotal = premiumRunningTotal + ((1000000 * 0.101) / 100)
                        }
                        else{
                            premiumRunningTotal = premiumRunningTotal + (remainingBudget * 0.101) / 100;
                            remainingBudget = 0;
                        }
                        log.info("3rd 500,000")
                        log.info premiumRunningTotal

                        //NEXT $3 MILLION RATING
                        if(remainingBudget > 3000000){
                            remainingBudget = remainingBudget - 3000000;
                            premiumRunningTotal = premiumRunningTotal + ((3000000 * 0.077) / 100)
                        }
                        else{
                            premiumRunningTotal = premiumRunningTotal + (remainingBudget * 0.077) / 100;
                            remainingBudget = 0;
                        }

                        //NEXT $5 MILLION RATING
                        if(remainingBudget > 5000000){
                            remainingBudget = remainingBudget - 5000000;
                            premiumRunningTotal = premiumRunningTotal + ((5000000 * 0.056) / 100)
                        }
                        else{
                            premiumRunningTotal = premiumRunningTotal + (remainingBudget * 0.056) / 100;
                            remainingBudget = 0;
                        }

                        //NEXT $10 MILLION RATING
                        if(remainingBudget > 5000000){
                            remainingBudget = remainingBudget - 5000000;
                            premiumRunningTotal = premiumRunningTotal + ((5000000 * 0.044) / 100)
                        }
                        else{
                            premiumRunningTotal = premiumRunningTotal + (remainingBudget * 0.044) / 100;
                            remainingBudget = 0;
                        }

                        if ( premiumRunningTotal > minPremium) {
                            premium = premiumRunningTotal;
                        } else {
                            premium = minPremium
                        }

                        productTotalPremium = (double) premium



                        log.info "PREMIUMS " + Math.ceil(productTotalPremium)
                        log.info "PREMIUMS " + productTotalPremium.getClass()
//                        premium = String.format("%.2f", (double)premium);


                        tempPremiumsMap["General Aggregate Limit"] = [rate, Math.ceil(productTotalPremium)]
                        tempPremiumsMap["Products & Completed Operations"] = ["flat", "incl"]
                        tempPremiumsMap["Personal & Advertising Injury"] = ["flat", "incl"]
                        tempPremiumsMap["Each Occurrence"] = ["flat", "incl"]
                        tempPremiumsMap["Fire Damage (Any One Fire)"] = ["flat", "incl"]
                        tempPremiumsMap["Blanket Additional Insured Endorsement"] = ["flat", "incl"]
                        tempPremiumsMap["Medical Expense Limit (Any One Person)"] = ["flat", "incl"]

                        if(coverageID == "CGL"){
                            lobString = "Commercial General Liability" + "\t" + Math.ceil(productTotalPremium) + "\t" + grossPct + "\t" + agentPct+"\r"
                            rateInfo = "CGL\tRate\tPremium\tCoverage\tMin Prem\n";
                            def newEndorseString = ""
                            endorseString.split("\r\n").each(){
                                log.info("ROW:" + it);
                                def formName = it.split("-")[1].trim();
                                log.info("Form Name:" + it);
                                if(formName.indexOf("NOAL:") == -1){
                                    newEndorseString = newEndorseString + it + "\r\n";
                                }
                            }

                            endorseString = newEndorseString;
                        }
                        else if(coverageID == "CPK"){
                            lobString = "Commercial Package" + "\t" + Math.ceil(productTotalPremium) + "\t" + grossPct + "\t" + agentPct+"\r"
                            rateInfo = "CPK\tRate\tPremium\tCoverage\tMin Prem\n";
                        }

                        log.info "PREMIUMS " + lobString


                        rateInfo = rateInfo + "${coverageID}\t${rate}\t${moneyFormat.format(productTotalPremium)}\t\t${moneyFormat.format(minPremium)}\n";
                        rateInfo = rateInfo + "${coverageID}\t\tincl\tGeneral Aggregate Limit\t\n";
                        rateInfo = rateInfo + "${coverageID}\t\tincl\tProducts & Completed Operations\t\n";
                        rateInfo = rateInfo + "${coverageID}\t\tincl\tPersonal & Advertising Injury\t\n";;
                        rateInfo = rateInfo + "${coverageID}\t\tincl\tEach Occurrence\t\n";
                        rateInfo = rateInfo + "${coverageID}\t\tincl\tFire Damage (Any One Fire)\t\n";
                        rateInfo = rateInfo + "${coverageID}\t\tincl\tMedical Expense Limit (Any One Person)\t\n";

                        indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rate\t${rate}\n";
                        indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Min Premium\t${moneyFormat.format(minPremium)}\n";

                        if (params.additionalProducts) {
                            if (params.additionalProducts.contains("BAIAdditionalCoverage")) {
                                if(params.riskType == "Film Projects With Cast (No Work Comp)"){
                                    tempPremiumsMap["Blanket Additional Insured Endorsement"] = ["flat", 500];
                                    tempDeductsMap["Blanket Additional Insured Endorsement"] = "";
                                    tempLimitsMap["Blanket Additional Insured Endorsement"] = "Included"
                                    productTotalPremium = productTotalPremium + 500
                                    rateInfo = rateInfo + "${coverageID}\tflat\t\$500\tBlanket Additional Insured Endorsement\t\n";
                                    indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Blanket Additional Insured Endorsement\t\$500\n";

                                }
                                else{
                                    tempPremiumsMap["Blanket Additional Insured Endorsement"] = ["flat", 100];
                                    tempDeductsMap["Blanket Additional Insured Endorsement"] = "";
                                    tempLimitsMap["Blanket Additional Insured Endorsement"] = "Included"
                                    productTotalPremium = productTotalPremium + 100
                                    rateInfo = rateInfo + "${coverageID}\tflat\t\$100\tBlanket Additional Insured Endorsement\t\n";
                                    indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Blanket Additional Insured Endorsement\t\$100\n";
                                }

                            }
                            if (params.additionalProducts.contains("WOSAdditionalCoverage")) {
                                tempPremiumsMap["Waiver of Subrogation"] = ["flat", 100];
                                tempDeductsMap["Waiver of Subrogation"] = "";
                                tempLimitsMap["Waiver of Subrogation"] = "Included"
                                productTotalPremium = productTotalPremium + 100
                                rateInfo = rateInfo + "${coverageID}\tflat\t\$100\tWaiver of Subrogation\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Waiver of Subrogation\t\$100\n";
                            }
                            if (params.additionalProducts.contains("EAIAdditionalCoverage")) {
                                tempPremiumsMap["Additional Charge to Include Medical Payments"] = ["flat", 100];
                                tempDeductsMap["Additional Charge to Include Medical Payments"] = "";
                                tempLimitsMap["Additional Charge to Include Medical Payments"] = "\$5,000"
                                productTotalPremium = productTotalPremium + 100
                                rateInfo = rateInfo + "${coverageID}\tflat\t\$100\tAdditional Charge to Include Medical Payments\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Additional Charge to Include Medical Payments\t\$100\n";

                            }
                            if (params.additionalProducts.contains("MEDAdditionalCoverage")) {
                                tempPremiumsMap["Medical Payments (Per Person)"] = ["flat", 25];
                                tempDeductsMap["Medical Payments (Per Person)"] = "Nil";
                                tempLimitsMap["Medical Payments (Per Person)"] = "\$5,000"
                                productTotalPremium = productTotalPremium + 25
                                rateInfo = rateInfo + "${coverageID}\tflat\t\$25\tMedical Payments (Per Person)\t\n";
                                indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Medical Payments (Per Person)\t\$25\n";
                            }
                            if (params.additionalProducts.contains("AGGAdditionalCoverage")) {
                                if(params.riskType == "Film Projects With Cast (No Work Comp) test"){
                                    tempPremiumsMap["Increased Agg Limit"] = ["flat", ""];
                                    tempDeductsMap["Increased Agg Limit"] = "";
                                    tempLimitsMap["Increased Agg Limit"] = "Included"
//                                    productTotalPremium = productTotalPremium + 250
                                    rateInfo = rateInfo + "${coverageID}\t\t\tIncreased Agg Limit\t\n";

                                }
                                else{
                                    tempDeductsMap["Increased Agg Limit"] = "";
                                    tempLimitsMap["Increased Agg Limit"] = "Included"
                                    if(termLength <= 90){
                                        tempPremiumsMap["Increased Agg Limit"] = ["flat", 0];
                                        productTotalPremium = productTotalPremium + 0
                                        rateInfo = rateInfo + "${coverageID}\tflat\t\0\tIncreased Agg Limit\t\n";
                                    }
                                    else{
                                        tempPremiumsMap["Increased Agg Limit"] = ["flat", 250];
                                        productTotalPremium = productTotalPremium + 250
                                        rateInfo = rateInfo + "${coverageID}\tflat\t\$250\tIncreased Agg Limit\t\n";
                                        indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Increased Agg Limit\t\$250\n";

                                    }

                                }

                            }

                        }
                        limitsMap = tempLimitsMap
                        deductsMap = tempDeductsMap
                        premiumsMap = tempPremiumsMap
                        indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rated Premium\t${moneyFormat.format(productTotalPremium)}\n";


                    } else if (coverageID == "NOHA" || coverageID == "NOAL") {
//                        def termLength = params.proposedTermLength.split(" ")[0].toInteger();
                        if (params.productsSelected.contains("CPK:")) {
                            def NOHARateMinPrem = [6.0, 500.0];
                            if (termLength <= 30) {
                                NOHARateMinPrem = [6.0, 450.0];
                            }
                            else if(params.riskType == "Film Projects With Cast (No Work Comp)"){
                                NOHARateMinPrem = [6.0, 500.0];
                            }
                            else {
                                NOHARateMinPrem = [6.0, 500.0];
                            }


                            def NOHApremium = 0.0;

                            def NOHArate = NOHARateMinPrem[0];
                            def NOHAminPremium = NOHARateMinPrem[1];

                            def costOfHire = 0;
                            if (params.costOfHire.length() > 0) {
                                costOfHire = params.costOfHire.toDouble()
                            }
                            if (((costOfHire * NOHArate) / 100) > NOHAminPremium) {
                                NOHApremium = (double) (costOfHire * NOHArate) / 100;
                            } else {
                                NOHApremium = (double) NOHAminPremium
                            }

                            //NOAL:Aggregate Limit
                            premiumsMap["Non-Owned & Hired Auto Liability"] = [6.0, Math.ceil(NOHApremium)];
                            deductsMap["Non-Owned & Hired Auto Liability"] = "Nil";
                            limitsMap["Non-Owned & Hired Auto Liability"] = "\$1,000,000"
                            productTotalPremium = productTotalPremium + NOHApremium
                            rateInfo = rateInfo + "${coverageID}\t${NOHArate}\t${moneyFormat.format(NOHApremium)}\tNon-Owned & Hired Auto Liability COH:${moneyFormat.format(costOfHire)}\t\n";
                            indicationRateInfo = indicationRateInfo + "Non-Owned & Hired Auto Liability\t\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rate\t${NOHArate}\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Cost of Hire\t${moneyFormat.format(costOfHire)}\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Min Premium\t${moneyFormat.format(NOHAminPremium)}\n";
                            indicationRateInfo = indicationRateInfo + "${twoSpaces}${twoSpaces}Rated Premium\t${moneyFormat.format(NOHApremium)}\n";





                            limitsMap.remove("Hired Auto Physical Damage")
                            deductsMap.remove("Hired Auto Physical Damage")
                        } else {

                        }


                    }


                    def updatedLobString = "";
                    if (lobString) {
                        log.info "LOB STRING = " + lobString
                        log.info "PREMIUM = " + productTotalPremium
                        log.info "PREMIUM = " + productTotalPremium.getClass()
                        log.info "Coverage ID = " + coverageID
                        productTotalPremium = (double) productTotalPremium
                        productTotalPremium = Math.ceil(productTotalPremium)
                        lobString.split('\r').each {
                            if (it.split('\t')[0].length() > 1) {
//                            log.info it
                                updatedLobString = updatedLobString + it.split('\t')[0] + "," + Math.ceil(productTotalPremium) + "," + it.split('\t')[2] + "," + it.split('\t')[3] + ";";
//                                if(coverageID == "CGL" || coverageID == "CPK"){
//                                    if(params.additionalProducts){
//                                        if(params.additionalProducts.contains("BAIAdditionalCoverage")){
//                                            updatedLobString = updatedLobString + "Blanket Additional Insured" + "," + "500" + "," + "," + ";"
//                                        }
//                                    }
//                                    if(params.additionalProducts){
//                                        if(params.additionalProducts.contains("EAIAdditionalCoverage")){
//                                            updatedLobString = updatedLobString + "Each Additional Insured" + "," + "100" + "," + "," + ";"
//                                        }
//                                    }
//                                    if(params.additionalProducts){
//                                        if(params.additionalProducts.contains("WOSAdditionalCoverage")){
//                                            updatedLobString = updatedLobString + "Waiver Of Subrogation" + "," + "100" + "," + "," + ";"
//                                        }
//                                    }
//                                }

                            }
                        }
                    } else {

                    }

                    lobDistMap[productID] = updatedLobString;
                    log.info "Updated LOB: " + updatedLobString
                    log.info "PRODUCT ID: " + productID
                    log.info deductsMap



                    def limitsMapJson = JsonOutput.toJson(limitsMap)
                    def deductsMapJson = JsonOutput.toJson(deductsMap)
                    def premiumsMapJson = JsonOutput.toJson(premiumsMap)
                    def lobDistMapJson = JsonOutput.toJson(lobDistMap)
                    def submissionRateMapJson = JsonOutput.toJson(submissionRateMap)

                    def beginTerms ="";
                    //EDITING TERMS
                    if(subjectString!=null){
                        log.info subjectString
                        def endSearchString = "United States of America";
                        def beginCut = subjectString.indexOf("THIS INSURANCE IS UNDERWRITTEN BY UNDERWRITERS ");
                        def endCut = subjectString.indexOf(endSearchString);

                        if(endCut > -1){
                            beginTerms = subjectString.substring(0, endCut + endSearchString.length()) + "\n\n";
                            subjectString = subjectString.substring(endCut + endSearchString.length()).trim();
                        }
                    }



                    def coverageJson = JsonOutput.toJson(
                            coverageCode: coverageID,
                            productCode: productID,
                            productTotalPremium: productTotalPremium,
                            limits: new JsonSlurper().parseText(limitsMapJson),
                            deductibles: new JsonSlurper().parseText(deductsMapJson),
                            premiums: new JsonSlurper().parseText(premiumsMapJson),
                            lobDist: new JsonSlurper().parseText(lobDistMapJson),
                            terms: subjectString,
                            endorse: endorseString,
                            beginTerms: beginTerms,
                            rateInfo: rateInfo,
                            indicationRateInfo: indicationRateInfo,
                            submissionRateMap: new JsonSlurper().parseText(submissionRateMapJson)
                    )
                    arrayOfCoverageDetails.add(new JsonSlurper().parseText(coverageJson))
                }

            }
        }

//        log.info jsonResponse
        jsonResponse = JsonOutput.toJson(
                coverages: arrayOfCoverageDetails

        )
        log.info JsonOutput.prettyPrint(jsonResponse)


        render JsonOutput.prettyPrint(jsonResponse)
    }

    def calcPIP3Deductibles(totalBudget) {
        def deductAmount = 0;
        if (params.totalBudget.toDouble() <= 250000) {
            deductAmount = 2500;
        } else if (params.totalBudget.toDouble() > 250000 && params.totalBudget.toDouble() <= 500000) {
            deductAmount = 2500;
        } else if (params.totalBudget.toDouble() > 500000) {
            deductAmount = 2500;
        }

        return deductAmount;
    }
//
//    def saveSubmissionToAIMv2() {
//      log.info "SAVING SUBMISSION TO AIMSQLV2"
//      log.info params
//      def dataMap = new JsonSlurper().parseText(params.dataMap)
//
//      def quoteID ="";
//
//      try {
//          def quoteIDCoverages = aimDAO.saveNewSubmissionv2(dataMap, dataSource_aim, session.user)
//          log.info "QuoteID: " + quoteIDCoverages
//          quoteID = quoteIDCoverages;
//          //0620584;EPKG,0620585;CPK
//        //   def submitGroupID = ""
//        //   quoteIDCoverages.split(",").each{
//        //       submitGroupID = submitGroupID + it.split(";")[0] + ","
//        //   }
//        //   if (submitGroupID.endsWith(",")) {
//        //       submitGroupID = submitGroupID.substring(0, submitGroupID.length() - 1);
//        //   }
//
//          //
//        //   def now = new Date()
//        //   def timestamp = now.format(dateFormat, timeZone)
//          //
//        //   log.info jsonParams.getAt("namedInsured")
//          //
//        //   Submissions s;
//          //
//        //   quoteIDCoverages.split(",").each{
//        //       quoteID = quoteID + it.split(";")[0] + ","
//          //
//        //       s = new portal.Submissions(submittedBy: session.user.email, aimQuoteID: it.split(";")[0], namedInsured: jsonParams.getAt("namedInsured"), submitDate: timestamp,
//        //               coverages: it.split(";")[1], statusCode: "QO", underwriter: accountExec+"@neeis.com", questionAnswerMap: params.questionAnswerMap,
//        //               uwQuestionMap:uwQuestionsMap, uwQuestionsOrder:uwQuestionsOrder, submitGroupID: submitGroupID)
//        //       s.save(flush: true, failOnError: true)
//        //   }
//          //
//        //   log.info "REDIRECTING"
//        //   if (quoteID.endsWith(",")) {
//        //       quoteID = quoteID.substring(0, quoteID.length() - 1);
//        //   }
//      }
//      catch (Exception e) {
//          StringWriter sw = new StringWriter();
//          e.printStackTrace(new PrintWriter(sw));
//          String exceptionAsString = sw.toString();
//          log.info("Error Details - " + exceptionAsString)
//          quoteID = "Error Details - " + e
//      }
//
//      render quoteID
//    }


    def saveSubmissionToAIM() {
        log.info "SAVING SUBMISSION TO AIMSQL"
        log.info params

        def quoteID ="";
        def indicationStatus="";

        //SAVE INSURED
        try {
            //GATHERING TEST DATA
            // def testDataRecord = testDataHelper.saveParams("savingSubmissionToAIM", JsonOutput.prettyPrint(JsonOutput.toJson(dataMap)))
            def dataMap = new JsonSlurper().parseText(params.dataMap)
            def uwQuestionsOrder = params.uwQuestionsOrder.split("&;&");
            def uwQuestionsMap = new JsonSlurper().parseText(params.uwQuestionsMap)

            //ADDITIONAL INFORMATION NECESSARY FOR INDICATION PDF
            Sql aimsql = new Sql(dataSource_aim)
            aimsql.eachRow("SELECT     *\n" +
                    "FROM         Producer with (NOLOCK)\n" +
                    "WHERE     ProducerID='${session.user.company}'" ) {

                dataMap.brokerCompanyName = it.Name
                dataMap.brokerCompanyAddress = it.Address1
                dataMap.brokerCompanyCity = it.City
                dataMap.brokerCompanyState = it.State
                dataMap.brokerCompanyZip = it.Zip
                dataMap.brokerCompanyPhone = it.Phone
                dataMap.brokerCompanyLicense = it.License
            }
            aimsql.eachRow("SELECT     *\n" +
                    "FROM         UserID with (NOLOCK)\n" +
                    "WHERE     UserID='${dataMap.accountExec}'" ) {

                dataMap.underwriterPhone = it.Wk_Phone
                dataMap.underwriterFax = it.Wk_Fax
            }

            //SET LOGO
            def agencyRecord = Agency.findAllWhere(agencyID: session.user.company)
            if (agencyRecord.empty) {
                // logic for handling no rows
                dataMap.logoFile = "Barbican.png"
            }
            else if(agencyRecord != null && agencyRecord.logoFileName != null){
                if(agencyRecord.logoFileName == "default"){
                    dataMap.logoFile = "Barbican.png"
                }
                else{
                    dataMap.logoFile = agencyRecord[0].logoFileName
                }
            }
            else{
                dataMap.logoFile = "Barbican.png"
            }


            def quoteAndIndicationStatus = aimDAO.saveNewSubmission(dataMap, dataSource_aim, session.user, uwQuestionsMap, uwQuestionsOrder)
            def quoteIDCoverages = quoteAndIndicationStatus.split("&;&")[0]
            indicationStatus = quoteAndIndicationStatus.split("&;&")[1]
            log.info "QuoteID: " + quoteIDCoverages
            //0620584;EPKG,0620585;CPK
            def submitGroupID = ""
            quoteIDCoverages.split(",").each{
                submitGroupID = submitGroupID + it.split(";")[0] + ","
            }
            if (submitGroupID.endsWith(",")) {
                submitGroupID = submitGroupID.substring(0, submitGroupID.length() - 1);
            }


            def now = new Date()
            def timestamp = now.format(dateFormat, timeZone)


            Submissions s;
            log.info uwQuestionsMap

            quoteIDCoverages.split(",").each{
                quoteID = quoteID + it.split(";")[0] + ","

                s = new portal.Submissions(submittedBy: session.user.email, aimQuoteID: it.split(";")[0], aimVersion: "A", namedInsured: dataMap.getAt("namedInsured"), submitDate: timestamp,
                        coverages: it.split(";")[1], statusCode: "QO", underwriter: dataMap.getAt('accountExec')+"@neeis.com", questionAnswerMap: params.questionAnswerMap,
                        uwQuestionMap:uwQuestionsMap, uwQuestionsOrder:uwQuestionsOrder, submitGroupID: submitGroupID)
                s.save(flush: true, failOnError: true)
            }

            if (quoteID.endsWith(",")) {
                quoteID = quoteID.substring(0, quoteID.length() - 1);
            }
        }
        catch (Exception e) {
            StringWriter writer = new StringWriter();
            PrintWriter printWriter = new PrintWriter( writer );
            e.printStackTrace( printWriter );
            printWriter.flush();
            String stackTrace = writer.toString();
            log.info("Error Details - " + stackTrace)

            quoteID = "Error Details - " + e
            // testDataRecord.endStatus = "Error"
            // testDataRecord.endStatusDetail = exceptionAsString
        }




        render quoteID + "&;&" + indicationStatus

    }

    def saveSpecialEventSubmission(){
        log.info "SAVING SPECIAL EVENT SUBMISSION TO AIMSQL"
        log.info params
        def quoteID ="";

        //SAVE INSURED
        try {
            def dataMap = new JsonSlurper().parseText(params.dataMap)
            def uwQuestionsOrder = params.uwQuestionsOrder.split("&;&");
            def uwQuestionsMap = new JsonSlurper().parseText(params.uwQuestionsMap)

            //ADDITIONAL INFORMATION NECESSARY FOR INDICATION PDF
            Sql aimsql = new Sql(dataSource_aim)
            aimsql.eachRow("SELECT     *\n" +
                    "FROM         Producer with (NOLOCK)\n" +
                    "WHERE     ProducerID='${session.user.company}'" ) {

                dataMap.brokerCompanyName = it.Name
                dataMap.brokerCompanyAddress = it.Address1
                dataMap.brokerCompanyCity = it.City
                dataMap.brokerCompanyState = it.State
                dataMap.brokerCompanyZip = it.Zip
                dataMap.brokerCompanyPhone = it.Phone
                dataMap.brokerCompanyLicense = it.License
            }
            aimsql.eachRow("SELECT     *\n" +
                    "FROM         UserID with (NOLOCK)\n" +
                    "WHERE     UserID='${dataMap.accountExec}'" ) {

                dataMap.underwriterPhone = it.Wk_Phone
                dataMap.underwriterFax = it.Wk_Fax
            }
            //SET LOGO
            def agencyRecord = Agency.findAllWhere(agencyID: session.user.company)
            if(agencyRecord != null && agencyRecord.logoFileName != null){
                if(agencyRecord.logoFileName == "default"){
                    dataMap.logoFile = "Prosight.png"
                }
                else{
                    dataMap.logoFile = agencyRecord[0].logoFileName
                }
            }
            else{
                dataMap.logoFile = "Prosight.png"
            }


//            def quoteAndIndicationStatus = aimDAO.saveNewSpecialEventSubmission(dataMap, dataSource_aim, session.user, uwQuestionsMap, uwQuestionsOrder)
//            def quoteIDCoverages = quoteAndIndicationStatus.split("&;&")[0]
//            indicationStatus = quoteAndIndicationStatus.split("&;&")[1]
//            log.info "QuoteID: " + quoteIDCoverages
//            //0620584;EPKG,0620585;CPK
//            def submitGroupID = ""
//            quoteIDCoverages.split(",").each{
//                submitGroupID = submitGroupID + it.split(";")[0] + ","
//            }
//            if (submitGroupID.endsWith(",")) {
//                submitGroupID = submitGroupID.substring(0, submitGroupID.length() - 1);
//            }


            def quoteIDCoverages = aimDAO.saveNewSpecialEventSubmission(dataMap, dataSource_aim, session.user, uwQuestionsMap, uwQuestionsOrder)
            log.info "QuoteID: " + quoteIDCoverages
            //0620584;EPKG,0620585;CPK
            def submitGroupID = ""
            quoteIDCoverages.split(",").each{
                submitGroupID = submitGroupID + it.split(";")[0] + ","
            }
            if (submitGroupID.endsWith(",")) {
                submitGroupID = submitGroupID.substring(0, submitGroupID.length() - 1);
            }

            def now = new Date()
            def timestamp = now.format(dateFormat, timeZone)


            Submissions s;

            quoteIDCoverages.split(",").each{
                quoteID = quoteID + it.split(";")[0] + ","

                s = new portal.Submissions(submittedBy: session.user.email, aimQuoteID: it.split(";")[0],  aimVersion: "A", namedInsured: dataMap.getAt("namedInsured"), submitDate: timestamp,
                        coverages: it.split(";")[1], statusCode: "QO", underwriter: dataMap.getAt('accountExec')+"@neeis.com", questionAnswerMap: params.questionAnswerMap,
                        uwQuestionMap:uwQuestionsMap, uwQuestionsOrder:uwQuestionsOrder, submitGroupID: submitGroupID)
                s.save(flush: true, failOnError: true)
            }

            log.info "REDIRECTING"
            if (quoteID.endsWith(",")) {
                quoteID = quoteID.substring(0, quoteID.length() - 1);
            }
            // testDataRecord.endStatus = "Success"
            //
            // //GATHERING TEST DATA
            // testDataRecord.quoteID = quoteID
            // testDataRecord.save(flush: true, failOnError: true)
        }
        catch (Exception e) {
            StringWriter writer = new StringWriter();
            PrintWriter printWriter = new PrintWriter( writer );
            e.printStackTrace( printWriter );
            printWriter.flush();
            String stackTrace = writer.toString();
            log.info("Error Details - " + stackTrace)

            quoteID = "Error Details - " + e
            // testDataRecord.endStatus = "Error"
            // testDataRecord.endStatusDetail = exceptionAsString
        }




        render quoteID
    }

    def getProductInfo(){
        log.info "GETTING TAX INFO"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)

    }

    def getTaxInfo(){
        log.info "GETTING TAX INFO"
        log.info params

        Sql aimsql = new Sql(dataSource_aim)

        def resultsString = "";
//        def taxState = testjson.getAt("stateMailing");
        def taxCodes = [:];

        aimsql.eachRow("SELECT     TransCode, TransTypeID, Description, FlatAmount_Flag, Rate, CollectedBy, AllowOverRide, State, FlagUserSelected, AP_AccountID, IncludeFees, RoundingRule, \n" +
                "                      RecordKey_PK, PremiumBasis, BasisSection, FlatRateFlag, TaxValue, TaxCodeID, FlagFullyEarned, FlagPolicyOnly, TaxRate, MinAmount, MaxAmount, AppliesTo, \n" +
                "                      CompanyID, Municipality\n" +
                "FROM         dvTaxTable with (NOLOCK)\n" +
                "WHERE     (State LIKE '${params.state}') AND (ISNULL(Municipality, '') = '') OR\n" +
                "                      (State LIKE '${params.state}') AND (Municipality = '')\n" +
                "ORDER BY Description") {

            taxCodes["${it.TransCode}"] =  it.Description;
        }

        aimsql.eachRow("SELECT     State, TaxValue, FlatRateFlag, Effective, Expiration, IncludeFees, PK_TaxID, CountyID, TaxCodeID, CompanyID, TaxValueNew, CollectedBy, PaidTo, AllowOverRide, \n" +
                "                      RoundingRule, TaxLine, TaxPercentange, CoverageID_Old, TaxPercentage, StateName, DateAdded, CreatedByID, SystemReq, RecordKey_PK, CoverageID, \n" +
                "                      FlagPolicyOnly, AdmittedTax, FlagFullyEarned, ZipCodeStart, ZipCodeEnd, FlagUserSelected, MinAmount, MaxAmount, PremiumBasis, BasisSection, \n" +
                "                      FlagNonResidentTax, AppliesTo, ExcludeTRIA, FlagUseEndorsementDate, Municipality, ExemptInsuredTax\n" +
                "FROM         TaxTable WITH (NOLOCK)\n" +
                "WHERE     (State = '${params.state}') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AppliesTo, 'ALL') = 'ALL') AND (ISNULL(AdmittedTax, 'N') = 'N') AND \n" +
                "                      (ISNULL(ExemptInsuredTax, 'N') = 'N') OR\n" +
                "                      (State = '${params.state}') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AdmittedTax, 'N') = 'N') AND (ISNULL(ExemptInsuredTax, 'N') = 'N') AND \n" +
                "                      (AppliesTo = 'RES')\n" +
                "ORDER BY TaxLine, SUBSTRING(CoverageID, 1, 25)") {

            resultsString = resultsString + it.TaxCodeID + "&,&" + taxCodes["${it.TaxCodeID}"] + "&,&" + it.TaxValue +  "&;;&";
        }
        log.info "TAX STRING ==== " +resultsString

        render resultsString
    }

    def searchSubmissions(){
        log.info "SEARCHING..."
        log.info params

        def resultsString = "";f
        Sql aimsql = new Sql(dataSource_aim)
        def submissions;




        if(session.user.userRole == "Underwriter" || session.user.userRole == "Admin"){

//      WEBSITE SEARCH RESULTS
            submissions = Submissions.findAllByNamedInsuredIlike("%${params.searchString}%",[sort: "submitDate",order: "desc"])
            log.info(submissions)

            def submissionsAimQuoteID = Submissions.findAllByAimQuoteIDIlike("%${params.searchString}%",[sort: "submitDate",order: "desc"])
            log.info(submissionsAimQuoteID)
            def submissionsSubmittedBy = Submissions.findAllBySubmittedByIlike("%${params.searchString}%",[sort: "submitDate",order: "desc"])
            log.info(submissionsSubmittedBy)
            def submissionsCoverages = Submissions.findAllByCoveragesIlike("%${params.searchString}%",[sort: "submitDate",order: "desc"])
            log.info(submissionsCoverages)


            submissions.addAll(submissionsAimQuoteID)
            submissions.addAll(submissionsSubmittedBy)
            submissions.addAll(submissionsCoverages)

            //AIMSQL SEARCH RESULTS
            aimsql.eachRow("SELECT QuoteID, NamedInsured, CoverageID, Received\n" +
                    "FROM Quote with (NOLOCK)\n" +
                    "WHERE (QuoteID LIKE '%${params.searchString}%') OR\n" +
                    "(NamedInsured LIKE '%${params.searchString}%') OR\n" +
                    "(CoverageID LIKE '%${params.searchString}%') \n" +
                    "ORDER BY Received DESC") {
                def row = [:]
                row['aimQuoteID'] = it.QuoteID;
                row['namedInsured'] = it.NamedInsured;
                row['coverages'] = it.CoverageID;
                row['submittedBy'] = "AIM";
                row['statusCode'] = it.StatusID;
                row['underwriter'] = it.AcctExec;
                row['submitDate'] = it.Received;
//            resultsString = resultsString + it.QuoteID + "&,&" + it.NamedInsured + "&,&" + it.CoverageID + "&,&" + " " + "&,&" + it.Received + "&;;&";
                submissions.add(row)
            }
        }
        else if(session.user.userRole == "Broker"){

            //BROKERS ONLY SEARCH WEB DATABASE ONLY, NOT AIM
            submissions = Submissions.findAllByNamedInsuredIlike("%${params.searchString}%","%${session.user.userRole}%",[sort: "submitDate",order: "asc"])

            def submissionsAimQuoteID = Submissions.findAllByAimQuoteIDIlike("%${params.searchString}%",[sort: "submitDate",order: "asc"])
            log.info(submissionsAimQuoteID)
            def submissionsSubmittedBy = Submissions.findAllBySubmittedByIlike("%${params.searchString}%",[sort: "submitDate",order: "asc"])
            log.info(submissionsSubmittedBy)
            def submissionsCoverages = Submissions.findAllByCoveragesIlike("%${params.searchString}%",[sort: "submitDate",order: "asc"])
            log.info(submissionsCoverages)


            submissions.addAll(submissionsAimQuoteID)
            submissions.addAll(submissionsSubmittedBy)
            submissions.addAll(submissionsCoverages)
            submissions.removeAll{
                it.submittedBy != session.user.email
            }
        }


        submissions = submissions.sort{it.aimQuoteID}
        submissions = submissions.reverse()
        submissions.each{
            resultsString = resultsString + it.aimQuoteID + "&,&" + it.namedInsured + "&,&" + it.coverages + "&,&" + it.submittedBy + "&,&" + it.submitDate +
                    "&,&" + it.statusCode + "&,&" + it.underwriter + "&;;&";
        }


        if (resultsString.endsWith("&;;&")) {
            resultsString = resultsString.substring(0, resultsString.length() - 4);
        }

        render resultsString
    }


    def checkAgencyID(){
        log.info "CHECKING AGENCY ID"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)
        def agencies =[];

        def string = "";
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
                "WHERE         (ProducerID='${params.agencyID}') AND (ActiveFlag = 'Y')\n" +
                "ORDER BY Name") {
            log.info "Result: " + it.Name
            string = it.Name
        }
        render string;
    }

    def checkAgencyPIN(){
        log.info "CHECKING AGENCY PIN"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)
        def agencies =[];

        def string = "";
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
                "WHERE         ProducerID='${params.agencyID}'\n" +
                "ORDER BY Name") {
            log.info "Result: " + it.ReferenceID
            if(params.agencyPIN == ""+it.ReferenceID){
                log.info "Match: "
                string = it.ReferenceID
            }

        }
        render string;
    }

    def getQuestionsForRiskType() {
        log.info "GETTING QUESTIONS FOR RISK TYPE"
        log.info params

        def resultsString ="";

//        def questionCategories = portal.Questions.list().unique { it.category }.category;

        def questions

        if(params.questionCategory == "entertainer"){
            questions = Questions.findAllWhere(entertainer: "Y");
            log.info questions
        }
        else if(params.questionCategory == "specialEvents"){
            questions = Questions.findAllWhere(specialEvents: "Y");
            log.info questions
        }
        else if(params.questionCategory == "office"){
            questions = Questions.findAllWhere(office: "Y");
            log.info questions
        }
        else if(params.questionCategory == "shellCorp"){
            questions = Questions.findAllWhere(shellCorp: "Y");
            log.info questions
        }
        else if(params.questionCategory == "venueTenantUser"){
            questions = Questions.findAllWhere(venueTenantUser: "Y");
            log.info questions
        }
        else if(params.questionCategory == "ancillaryEntertainmentRisk"){
            questions = Questions.findAllWhere(ancillaryEntertainmentRisk: "Y");
            log.info questions
        }
        questions = questions.sort{it.weight}

        questions.each{
            resultsString = resultsString +
                    it.category + "&,&" +
                    it.htmlID + "&,&" +
                    it.htmlClass + "&,&" +
                    it.htmlInputType +"&,&" +
                    it.htmlInputName +"&,&" +
                    it.htmlInputValue +"&,&" +
                    it.htmlCheckboxRadioText +"&,&" +
                    it.defaultChecked +"&,&" +
                    it.dropdownOptionsValText +"&,&" +
                    it.htmlDataReviewName +"&,&" +
                    it.htmlPlaceholder +"&,&" +
                    it.questionText +"&,&" +
                    it.htmlStyle +"&,&" +
                    it.required +"&,&" +
                    it.attachments +"&,&" +
                    it.questionGroup +"&,&" +
                    it.weight + "&;&";
        }

//        def questionCategories = questions.unique{it.category}.category;
        def questionCategories = QuestionCategory.findAll();
        questionCategories.removeIf { it.categoryName == "Coverages" } //COVERAGE QUESTIONS WILL BE DEALT WITH SEPARATELY
        questionCategories = questionCategories.sort{it.weight}
//        questionCategories = questionCategories.reverse()
        resultsString = resultsString + "&;;&" + questionCategories.categoryName;

        log.info questionCategories.categoryName

        render resultsString



    }

    def findUserFromName(){
        log.info "Find User"
        log.info params

        def broker = User.findWhere(email:params.brokerEmail)
        log.info broker

        if (broker){
            render broker[0].email

        }
        else{
            broker = User.findAllByFirstNameIlikeAndLastName("%${params.brokerName.split(" ")[0]}%", "${params.brokerName.split(" ")[1]}")
            if(broker){
                render broker[0].email

            }
            else{
                render "User Not Found"
            }
        }

    }

    def sendMessage(){
        log.info "GETTING QUESTIONS FOR RISK TYPE"
        log.info params

        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)
        log.info timestamp
        NeeisMessages m;
        try {


            m = new portal.NeeisMessages(subject: params.subject,
                    messageType: params.messageType, //firstMessage, replyMessage,
                    body: params.messageBody,
                    sender: session.user.email,
                    recipient: params.recipient,
                    sentDateTime: timestamp,
                    attachments: "",
                    replyTo: params.replyTo,
                    messagesInChain: 0, //will be updated after insert
                    messageChainID: params.messageChainID,
                    unread: "true");

            m.save(flush: true, failOnError: true)

            m.messageChainID = m.id;
            m.save(flush: true, failOnError: true)
        }
        catch (Exception e) {
            StringWriter writer = new StringWriter();
            PrintWriter printWriter = new PrintWriter( writer );
            e.printStackTrace( printWriter );
            printWriter.flush();
            String stackTrace = writer.toString();
            log.info("Error Details - " + stackTrace)
        }

        //Need to get and update number of messages in chain
        def allMessagesInChain = NeeisMessages.findAllByMessageChainID(m.messageChainID);

        def numMessagesInChain = allMessagesInChain[0].messagesInChain
        numMessagesInChain = allMessagesInChain.size();


        def updatedRecords = NeeisMessages.executeUpdate("update NeeisMessages set messagesInChain = ? where messageChainID = ?", [numMessagesInChain, m.messageChainID])


        render "good"
    }

    def markMessagesRead() {
        log.info "MARK MESSAGES READ"
        log.info params


        def updatedRecords = NeeisMessages.executeUpdate("update NeeisMessages set unread = ? where messageChainID = ?", ["false", Integer.parseInt(params.messageChainRead)])




        render "good;" + params.messageChainRead
    }

    def assignSubmissionToUW(){
        log.info "ASSIGN SUBMISSION TO UW"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)

        def underwriter = User.findWhere(email:params.assignUW);
        def underwriterName = underwriter.firstName + " " + underwriter.lastName
        def underwriterUsername = params.assignUW.split("@")[0];

        def updatedRecords = Submissions.executeUpdate("update Submissions set underwriter = ? where aimQuoteID = ?", [params.assignUW, params.aimQuoteID])

//        aimsql.execute "UPDATE dbo.Version\n" +
//                "SET StatusID = '" + params.statusCode +  "'\n" +
//                "WHERE QuoteID = " + params.aimQuoteID + "; ";

        aimsql.execute "UPDATE dbo.Quote\n" +
                "SET AcctExec = '" + underwriterUsername +  "'\n" +
                "WHERE QuoteID = " + params.aimQuoteID + "; ";
        aimsql.commit();


//        aimDAO.updateSubmissionActivity(params.aimQuoteID, description, params.statusCode, typeID, quoteVersion, dataSource_aim)

        render "good"
    }

    def changeSubmissionStatus(){
        log.info "CHANGE SUBMISSION STATUS!!!!!!!!!!!!!!!!!!"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)

        def updatedRecords = Submissions.executeUpdate("update Submissions set statusCode = ? where aimQuoteID = ?", [params.statusCode, params.aimQuoteID])

        aimsql.withTransaction {
            aimsql.executeUpdate("UPDATE dbo.Version\n" +
                    "SET StatusID = ?\n" +
                    "WHERE dbo.Version.QuoteID = ?; ", [params.statusCode, params.aimQuoteID]);
//
            aimsql.executeUpdate("UPDATE dbo.Quote\n" +
                    "SET StatusID = ?\n" +
                    "WHERE dbo.Quote.QuoteID = ?; ", [params.statusCode, params.aimQuoteID]);

            aimsql.executeUpdate("UPDATE dvQuoteView\n" +
                    "SET StatusID = ?\n" +
                    "WHERE QuoteID = ?; ", [params.statusCode, params.aimQuoteID]);
            aimsql.commit();
        }

//        aimsql.call("{call dbo.spUpdateStatus( '${quoteID}', 'web', '${description}', '${timestamp}', '${statusCode}', NULL, '${typeID}'," +
//                " '${quoteVersion}', 0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
//            log.info "ADD TRANSACTION ID $num"
//        }

        // aimsql.call("{call dbo.spUpdateStatus(?, ?)}", [params.statusCode, params.aimQuoteID])




        def description = "";
        def typeID = "";
        def quoteVersion = "A";
        if(params.statusCode == "WRA"){
            description = "Web Approval Request"
        }
        else if(params.statusCode == "WB3"){
            description = "Web Approved"
        }
        else if(params.statusCode == "BRQ"){
            description = "Bind Request"
        }
        else if(params.statusCode == "BND"){
            description = "Bound"
        }


        aimDAO.updateSubmissionActivity(params.aimQuoteID, description, params.statusCode, typeID, quoteVersion, dataSource_aim)

        render "good"
    }

    def getQuestionAnswers(){
        log.info "GETTING SUBMISSION QUESTION ANSWERS"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)

        def submissionInfo = Submissions.findAllByAimQuoteID(params.quoteID)

        def submissionInfoMap=[:]
        if(submissionInfo.size() >0){
            submissionInfoMap = new JsonSlurper().parseText(submissionInfo[0].questionAnswerMap)
            submissionInfoMap['webSubmission'] = "true"
            submissionInfoMap['uwQuestionsMap'] = submissionInfo[0].uwQuestionMap;
            submissionInfoMap['questionAnswerMap'] = submissionInfo[0].questionAnswerMap;
            submissionInfoMap['uwQuestionsOrder'] = submissionInfo[0].uwQuestionsOrder;
        }

        /*
        QuoteID, VersionBound, ProducerID, NamedInsured, TypeID, UserID, Attention, Received, Acknowledged, Quoted, TeamID, DivisionID, StatusID, CreatedID, Renewal,
        OldPolicyID, OldVersion, OldExpiration, OpenItem, Notes, PolicyID, VersionCounter, InsuredID, Description, FileLocation, Address1, Address2, City, State, Zip, Bound,
        Submitted, SubmitType, NoteAttached, AcctExec, InsuredInterest, RiskInformation, EC, BndPremium, BndFee, CompanyID, ProductID, Effective, Expiration, Setup,
        PolicyMailOut, BinderRev, PriorCarrier, TargetPremium, CsrID, PolicyVer, OldQuoteID, PolicyGrpID, PendingSuspenseID, ReferenceID, MapToID, SubmitGrpID,
        AcctAsst, TaxState, SicID, CoverageID, OldPremium, AddressID, OldEffective, TaxBasis, QuoteRequiredBy, RequiredLimits, RequiredDeduct, Retroactive,
        PrevCancelFlag, PrevNonRenew, PriorPremium, PriorLimits, UWCheckList, FileSetup, ContactID, SuspenseFlag, PriorDeductible, CategoryID, StructureID,
        RenewalStatusID, ClaimsFlag, ActivePolicyFlag, Assets, PublicEntity, VentureID, IncorporatedState, ReInsuranceFlag, TaxedPaidBy, LayeredCoverage, Employees,
        Stock_52wk, NetIncome, LossHistory, PriorLimitsNew, LargeLossHistory, DateOfApp, Stock_High, Stock_Low, Stock_Current, MarketCap, Exposures, AIM_TransDate,
        LostBusinessFlag, YearEst, LostBusiness_Carrier, LostBusiness_Premium, AccountKey_FK, FlagRewrite, flagWIP, RenewalQuoteID, QuoteDueDate, QuoteStatus,
        BinderExpires, TIV, InvoicedPremium, InvoicedFee, InvoicedCommRev, SplitAccount, FileCloseReason, FileCloseReasonID, SourceOfLeadID, ServiceUWID,
        SubmitTypeID, SubProducerID, AgtAccountNumber, BndMarketID, RefQuoteID, FlagHeldFile, HeldFileMessage, TermPremium, ProcessBatchKey_FK, PolicyInception,
        ClassID, ScheduleIRM, ClaimExpRM, DateAppRecvd, DateLossRunRecvd, CoverageEffective, CoverageExpired, SLA, Class, IRFileNum, IRDrawer, FlagOverRideBy,
        RackleyQuoteID, FlagCourtesyFiling, FlagRPG, CurrencyType, CurrencySymbol, FileNo, UserDefinedStr1, UserDefinedStr2, UserDefinedStr3, UserDefinedStr4,
        UserDefinedDate1, UserDefinedValue1, ReservedContractID, CountryID, RatingKey_FK, eAttached, NewField, TotalCoinsuranceLimit, TotalCoinsurancePremium,
        CurrencyExchRate, Invoiced, OtherLead, LeadCarrierID, RenewTypeID, IsoCode, CedingPolicyID, CedingPolicyDate, ConversionStatusID, FlagTaxExempt, Units,
        SubUnits, LicenseAgtKey_FK, ContractPlanKey_FK, AltStatusID, FlagNonResidentAgt, CedingPolicyEndDate, TargetPremPercent, AgentContactKey_FK, LAGACoverage,
        LAGALimoRateKey_FK, FirewallTeamID, CurrencyExchRate_Old, MarketCapValue, ExternalNoteFile, PriorRate, DBAName, MailAddress1, MailAddress2, MailCity,
        MailState, MailZip, RatingID_FK, HereOn, TaxMunicipality
        */
        def row;
        aimsql.eachRow("SELECT * " +
                "FROM Quote with (NOLOCK) " +
                "WHERE (QuoteID = '" + params.quoteID + "') ") {
            submissionInfoMap['aimQuoteID'] = it.QuoteID
            submissionInfoMap['namedInsured'] = it.NamedInsured
            submissionInfoMap['coverages'] = it.CoverageID
            submissionInfoMap['statusCode'] = it.StatusID
            submissionInfoMap['submittedBy'] = it.Attention
            submissionInfoMap['underwriter'] = it.AcctExec
            it.toRowResult().each { key, val ->
                if(val){
                    submissionInfoMap["Quote-" + key] = val;
                }
            }
        }
        aimsql.eachRow("SELECT * " +
                "FROM Version with (NOLOCK) " +
                "WHERE (QuoteID = '" + params.quoteID + "') ") {
            it.toRowResult().each { key, val ->
                if(val){
                    submissionInfoMap["Version-" + key] = val;
                }
            }
        }
        aimsql.eachRow("SELECT * " +
                "FROM Insured with (NOLOCK) " +
                "WHERE (InsuredID = '" + submissionInfoMap['Quote-InsuredID'] + "') ") {
            it.toRowResult().each { key, val ->
                if(val){
                    submissionInfoMap["Insured-" + key] = val;
                }
            }
        }
        aimsql.eachRow("SELECT * " +
                "FROM Status with (NOLOCK) " +
                "WHERE (StatusID = '" + submissionInfoMap['Quote-StatusID'] + "') ") {
            it.toRowResult().each { key, val ->
                if(val){
                    submissionInfoMap["Status-" + key] = val;
                }
            }
        }

        aimsql.eachRow("SELECT * " +
                "FROM Company with (NOLOCK) " +
                "WHERE (CompanyID = '" + submissionInfoMap['Quote-CompanyID'] + "') ") {
            it.toRowResult().each { key, val ->
                if(val){
                    submissionInfoMap["Company-" + key] = val;
                }
            }
        }
        aimsql.eachRow("SELECT * " +
                "FROM Product with (NOLOCK) " +
                "WHERE (ProductID = '" + submissionInfoMap['Version-ProductID'] + "') ") {
            it.toRowResult().each { key, val ->
                if(val){
                    submissionInfoMap["Product-" + key] = val;
                }
            }
        }


        if(submissionInfo.size() ==0){
            log.info "NOT WEB"
            submissionInfoMap['riskChosen'] = "AIM"

            render JsonOutput.toJson(submissionInfoMap)
        }
        else{
            submissionInfoMap['aimQuoteID'] = submissionInfo.aimQuoteID
            submissionInfoMap['namedInsured'] = submissionInfo.namedInsured
            submissionInfoMap['coverages'] = submissionInfo.coverages
            submissionInfoMap['statusCode'] = submissionInfo.statusCode
            submissionInfoMap['submittedBy'] = submissionInfo.submittedBy
            submissionInfoMap['underwriter'] = submissionInfo.underwriter

//            log.info submissionInfoMap
            log.info "UW QUESTIONS ORDER: " +  submissionInfoMap['questionAnswerMap']

            render JsonOutput.toJson(submissionInfoMap)
        }



    }

    def autoSaveProgress(){
        log.info "AUTO SAVE SUBMISSION"
//        log.info params
        def savedDataMap = new JsonSlurper().parseText(params.savedDataMap)

        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)
//        log.info timestamp

        SavedSubmissions m;
        try {
            m = new portal.SavedSubmissions(saveName: "autoSave_" + timestamp,
                    user: session.user.id, //firstMessage, replyMessage,
                    saveDateTime: timestamp,
                    autosaveFlag: "Y",
                    saveData: params.savedDataMap);
            m.save(flush: true, failOnError: true)

        }
        catch (Exception e) {
            StringWriter writer = new StringWriter();
            PrintWriter printWriter = new PrintWriter( writer );
            e.printStackTrace( printWriter );
            printWriter.flush();
            String stackTrace = writer.toString();
            log.info("Error Details - " + stackTrace)
        }

        render "good"
    }

    def saveSubmissionProgress(){
        log.info "SAVE SUBMISSION"
        log.info params
        def savedDataMap = new JsonSlurper().parseText(params.savedDataMap)

        def namedInsured = savedDataMap.namedInsured
        def riskType = savedDataMap.riskChosen

        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)

        SavedSubmissions m;
        def responseString ="";
        def autosaveFlag = "N"
        if(params.autosave == "true"){
            autosaveFlag = "Y"
        }
        try {
            m = new portal.SavedSubmissions(saveName: params.saveName,
                    user: session.user.id, //firstMessage, replyMessage,
                    saveDateTime: timestamp,
                    autosaveFlag: autosaveFlag,
                    saveData: params.savedDataMap);
            m.save(flush: true, failOnError: true)
            responseString = "Success"


            //CLEAN UP OLD AUTOSAVES
            Integer sessionUserID = (int) (long) session.user.id;
            def oldSubmissions = SavedSubmissions.findAll(sort:"saveDateTime") {
                user == sessionUserID && autosaveFlag == "Y"
            }


            log.info "oldSubmissions Size: " + oldSubmissions.size()
            def maxAutoSavesAllowed = 4
            if(oldSubmissions.size() > maxAutoSavesAllowed){
                log.info "TIME TO DELETE: "

                for(def i = 0; i < (oldSubmissions.size()-maxAutoSavesAllowed); i++){
                    //THIS LOOP WILL DELETE OLD SUBMISSIONS UNTIL THERE ARE ONLY A MAX OF 10 SAVED FOR USER
                    log.info "DELETING SUBMISSION SAVE: " + oldSubmissions.get(i)

                    def submissionToDelete = oldSubmissions.get(i)
                    submissionToDelete.delete(flush: true, failOnError: true);

                }
            }

            //cleanup Old submission saves
            if(false){ //USE THIS IF YOU NEED TO LIMIT USERS TO A CERTAIN NUMBER OF SAVES
                oldSubmissions = SavedSubmissions.findAll("from SavedSubmissions as s where s.user=? order by s.saveDateTime",
                        [sessionUserID], [max: 20, offset: 0])
                log.info "oldSubmissions Size: " + oldSubmissions.size()
                if(oldSubmissions.size() > 10){
                    log.info "TIME TO DELETE: "

                    for(def i = 0; i < (oldSubmissions.size()-10); i++){
                        //THIS LOOP WILL DELETE OLD SUBMISSIONS UNTIL THERE ARE ONLY A MAX OF 10 SAVED FOR USER
                        log.info "DELETING SUBMISSION SAVE: " + oldSubmissions.get(i)

                        def submissionToDelete = oldSubmissions.get(i)
                        submissionToDelete.delete(flush: true, failOnError: true);

                    }
                }
            }



            log.info oldSubmissions


        }
        catch (Exception e) {
            StringWriter writer = new StringWriter();
            PrintWriter printWriter = new PrintWriter( writer );
            e.printStackTrace( printWriter );
            printWriter.flush();
            String stackTrace = writer.toString();
            log.info("Error Details - " + stackTrace)
            responseString = "Error"
        }
        log.info responseString
        render responseString
    }

    def getSavedSubmissions(){ 
        log.info "GET SAVED SUBMISSION"
        log.info params
        def builder = new JsonBuilder()

        Integer userID = (int) (long) session.user.id;

        def savedSubmissions = SavedSubmissions.findAll("from SavedSubmissions as s where s.user=? order by s.saveDateTime desc",
                [userID], [max: 10, offset: 0])

        log.info savedSubmissions.getClass()
        String jsonString = new Gson().toJson(savedSubmissions);

        render jsonString
    }

    def bindPrepare(){
        log.info "BIND PREPARE"
        log.info params

        render  JsonOutput.toJson(aimDAO.bindPrepare(params, dataSource_aim));
    }

    def bindGetPolicyNumbersFromRegister(){
        log.info "GET POLICY NUMBERS FROM REGISTER"
        log.info params

        render  JsonOutput.toJson(aimDAO.bindGetPolicyNumberFromRegister(params, dataSource_aim));
    }

    def bindReviewSubmissionDetails(){
        log.info "BINDING, ASSIGN POLICY NUMBER, REVIEW SUBMISSION DETAILS"
        log.info params

//        render  JsonOutput.toJson(aimDAO.bindReviewSubmission(params, dataSource_aim));
        render "good"
    }

    def bindSubmission(){
        log.info "BIND SUBMISSION"
        log.info params

//        def dataMap = new JsonSlurper().parseText(params.dataMap)

        render  JsonOutput.toJson(aimDAO.bind(params, dataSource_aim));
    }

    def getVersionsForQuote(){
        log.info "GET VERSIONS FOR QUOTE"
        log.info params

        String renderString = ""
        def dvResults =[];

//        def where = "(QuoteID='$params.quoteID')";
        def where = "(QuoteID='" + params.quoteID + "')";
        dvResults = AIMDBService.selectAllFromTableWhereWithFormatting("dvVersionView", where, dataSource_aim)
        log.info "BEFORE SORT"
        dvResults.each{
            log.info it.Version
        }
        dvResults.sort { a, b -> a.Version <=> b.Version }
        log.info "AFTER SORT"
        dvResults.each{
            log.info it.Version
        }

        def verResults =[];
        where = "(QuoteID='" + params.quoteID + "')";
        verResults = AIMDBService.selectAllFromTableWhereWithFormatting("Version", where, dataSource_aim)
        log.info "BEFORE SORT"
        verResults.each{
            log.info it.Version
        }
        verResults.sort { a, b -> a.Version <=> b.Version }
        log.info "AFTER SORT"
        verResults.each{
            log.info it.Version
        }



        def response = [:]
        
        response.dvVersionViewData = dvResults
        response.versionData = verResults

        renderString = new JsonBuilder(response).toPrettyString()

        log.info renderString
        render new JsonBuilder(response).toPrettyString()

    }


    def emailTest(){
        log.info "EMAIL TEST"
        log.info params

        def testMap = [
                brokerEmail: "johnkimsinbox@gmail.com",
                nameOfInsured: "TEST NAME",
                submissionID: "00102"
        ]

        emailHelper.sendMessage(mailService, testMap)

        render "Success"
    }
    def testPdf(){
        log.info "PDF TEST"
        log.info params

        PdfBox pdfHelper1 = new PdfBox()
        PdfBox pdfHelper2 = new PdfBox()

        pdfHelper1.pdf = 1
        pdfHelper2.pdf = 2

        pdfHelper.createDoc()

        render "Success"
    }
}
