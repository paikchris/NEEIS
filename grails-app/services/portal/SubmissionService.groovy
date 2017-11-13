package portal

import grails.transaction.Transactional
import groovy.sql.GroovyResultSet
import groovy.sql.GroovyRowResult
import groovy.sql.Sql

import java.sql.ResultSetMetaData
import java.sql.Types
import java.util.Map.Entry
import groovy.json.JsonSlurper
import groovy.json.JsonOutput
import grails.util.Environment

import sun.misc.BASE64Decoder
import groovy.xml.*
import wslite.soap.*
import wslite.http.auth.*
import org.apache.commons.net.ftp.FTPClient
import org.apache.commons.net.ftp.FTP;
import sun.misc.BASE64Decoder;
import portal.Utils.FileTransferHelper;


@Transactional
class SubmissionService {
    def dataSource_aim
    def aimSqlService
    def dateTimeService
    def utilService
    def mailService
    def pdfService


    Sql aimDB
    def jsonSlurper = new JsonSlurper()
    def jsonOutput = new JsonOutput()

    def webQuoteFee = 0.0
    def webQuoteFeeNoTax = 15.0
    def webQuoteIntValue = 15
    def webQuoteFeeString = "\$15.00"
    def defaultAgentPct = 10.0
    def defaultGrossPct = 5.0

    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
    def dateSimple = 'MM/dd/yyyy'

    def saveSubmission(submissionMap){
        log.info "SAVING SUBMISSION"


        submissionMap.timestamp = dateTimeService.getNeeisLocalDateTime()

        Producer producerRecord = Producer.findByProducerID(submissionMap.brokerCompanyID)
        User userRecord = User.findByEmail(submissionMap.brokerEmail)

        //ADD AIMCONTACTID TO SUBMISSIONMAP
        submissionMap.aimContactID = userRecord.aimContactID


        def quoteID = ""
        def indicationStatus = ""
        def renderMessage = ""
        if(submissionMap.versionMode == true){
            //SAVE TO AIM FIRST

            def quoteAndIndicationStatus = saveVersionToAIM(submissionMap)

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

            quoteIDCoverages.split(",").each{
                def aimQuoteID = it.split(";")[0]
                quoteID = quoteID + it.split(";")[0] + ","

                s = new portal.Submissions(submittedBy: submissionMap.brokerEmail, aimQuoteID: submissionMap.originalQuoteID, aimVersion: submissionMap.versionLetter, namedInsured: submissionMap.namedInsured, submitDate: timestamp,
                        coverages: 'COV', statusCode: "ACK", underwriter: submissionMap.acctExecID +"@neeis.com", questionAnswerMap: jsonOutput.toJson(submissionMap.allQuestionMap),
                        uwQuestionMap:jsonOutput.toJson(submissionMap.uwQuestionsMap), uwQuestionsOrder:jsonOutput.toJson(submissionMap.uwQuestionForIndicationArray),
                        submitGroupID: submitGroupID, operationType: submissionMap.operationName, userInputMap: jsonOutput.toJson(submissionMap.userInputMap))
                s.save(flush: true, failOnError: true)

            }

            if (quoteID.endsWith(",")) {
                quoteID = quoteID.substring(0, quoteID.length() - 1);
            }

            renderMessage =  quoteID + "&;&" + indicationStatus
        }
        else{
            //ASSIGN UNDERWRITER TO SUBMISSION
            submissionMap.acctExecID = getDefaultUnderwriterIDForBroker(userRecord)
            submissionMap.acctExecName = getDefaultUnderwriterNameForBroker(submissionMap.acctExecID)

            //GET INSURED ID REFERENCE KEY
            submissionMap.insuredID = aimSqlService.getKeyFieldReferenceID()

            //SAVE TO AIM FIRST
            def quoteAndIndicationStatus = saveSubmissionToAIM(submissionMap)

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

            quoteIDCoverages.split(",").each{
                def aimQuoteID = it.split(";")[0]
                quoteID = quoteID + it.split(";")[0] + ","

                s = new portal.Submissions(submittedBy: submissionMap.brokerEmail, aimQuoteID: it.split(";")[0], aimVersion: "A", namedInsured: submissionMap.namedInsured, submitDate: timestamp,
                        coverages: 'COV', statusCode: "ACK", underwriter: submissionMap.acctExecID +"@neeis.com", questionAnswerMap: jsonOutput.toJson(submissionMap.allQuestionMap),
                        uwQuestionMap:jsonOutput.toJson(submissionMap.uwQuestionsMap), uwQuestionsOrder:jsonOutput.toJson(submissionMap.uwQuestionForIndicationArray),
                        submitGroupID: submitGroupID, operationType: submissionMap.operationName, userInputMap: jsonOutput.toJson(submissionMap.userInputMap))
                s.save(flush: true, failOnError: true)

            }

            if (quoteID.endsWith(",")) {
                quoteID = quoteID.substring(0, quoteID.length() - 1);
            }

            renderMessage =  quoteID + "&;&" + indicationStatus
        }


        return renderMessage

    }

    def saveSubmissionToAIM(submissionMap){
        log.info "SAVE SUBMISSION TO AIM"
        Sql aimsql = new Sql(dataSource_aim)


        submissionMap['dateAdded'] = submissionMap.timestamp

        //INSERT NEW INSURED
        def insuredMap = [InsuredID:"'${submissionMap.insuredID}'",
                          NamedInsured: "'${submissionMap.namedInsured}'",
                          NameType: "'B'",
                          DBAName: "'${submissionMap.dbaName}'",
                          Address1: "'${submissionMap.streetAddressMailing}'",
                          Address2: 'NULL',
                          City: "'${submissionMap.cityMailing}'",
                          State: "'${submissionMap.stateMailing}'",
                          Zip: "'${submissionMap.zipCodeMailing}'",
                          ProducerID: "'${submissionMap.brokerCompanyID}'",
                          AcctExec: "'${submissionMap.acctExecName}'",
                          DirectBillFlag: "'N'",
                          MailAddress1: "'${submissionMap.streetAddressMailing}}'",
                          MailCity: "'${submissionMap.cityMailing}'",
                          MailState: "'${submissionMap.stateMailing}'",
                          MailZip: "'${submissionMap.zipCodeMailing}'",
                          ContactName: "'${submissionMap.brokerName}'",
                          Phone: "'${submissionMap.brokerPhone}'",
                          Fax: 'NULL',
                          EMail: "'${submissionMap.brokerEmail}'",
                          SSN: "'${submissionMap.FEINSSN}'",
                          AcctExecID: "'${submissionMap.acctExecID}'",
                          DateAdded: "'${submissionMap.timestamp}'",
                          BusinessStructureID: "'${submissionMap.businessStructureID}'",
                          NCCI: "'${submissionMap.NCCI}'",
                          SicID: "'${submissionMap.SIC}'",
                          Attention: "'${submissionMap.brokerName}'",
                          ContactID: "'${submissionMap.aimContactID}'",
                          TeamID: "'TeamID'",
                          InsuredKey_PK: "'${submissionMap.insuredID}'",
                          GroupKey_FK: "'3941'", //3941 = COMMERCIAL WHOLESALE
                          FlagProspect: "'N'",
                          Website: "'${submissionMap.website}'",
                          Country: "'US'"
        ]
        aimSqlService.insertRecord("Insured", insuredMap)

        //INSERT PRODUCTS
        def productDetailArray = []

        submissionMap.coveragesAndProducts.each{ key,value ->
            def coverageID = key
            def productID = value.productID
            def productMap = [:]

            Products productRecord = Products.findByProductID(productID)
            def taxMap = aimSqlService.getTaxInfo(submissionMap.stateMailing)

            productMap = buildProductMapForAIMTables(productID, submissionMap, taxMap)

            //GET TOTAL PREMIUM FOR ALL PRODUCTS
//            submissionMap.premiumTotal = submissionMap.premiumTotal + productMap.premium

//            submissionMap.totalTaxAmount = 0
//            submissionMap.premiumMap.taxLines.each{
//                submissionMap.totalTaxAmount = submissionMap.totalTaxAmount + it.value
//            }

            def versionMap = [
                       QuoteID: "'${productMap.quoteID}'",
                       VerOriginal: "'A'",
                       Version: "'A'",
                       Financed: "'Y'",
                       Brokerage: "'N'" ,
                       Indicator: "'N'" ,
                       DirectBillFlag: "'N'" ,
                       ProposedTerm: "'${submissionMap.proposedTermLengthInt}'",
                       UnderLyingCoverage: "''" ,
                       PolicyTerm: "'${submissionMap.proposedTermLength}'" ,
                       VersionID: "'${productMap.quoteID}A'" ,
                       CompanyID:"'${productRecord.riskCompanyID}'",
                       ProductID:"'${productID}'" ,
                       Premium: "'${productMap.premium}'",
                       Non_Premium: "'${webQuoteFee}'",
                       NonTax_Premium: "'${webQuoteFeeNoTax}'",
                       FlagFeeCalc:"'N'",
                       Quoted:"'${submissionMap.timestamp}'",
                       Limits:"'${productMap.limitString}'",
                       Subject:"'${productRecord.terms}'",
                       Endorsement: "'${productRecord.forms}'",
                       Taxed: "'Y'",
                       MEP: "''",
                       Rate:"''",
                       LobDistrib: "'${buildProductLobDistribString(productMap)}'",
                       LobDistribSched: "'${buildProductLobDistribSchedString(productMap)}'",
                       GrossComm:"'${productMap.grossComm}'",
                       AgentComm:"'${productMap.agentComm}'",
                       Deductible:"'${productMap.deductString}'",
                       CoInsure:"''",
                       StatusID:"'ACK'",
                       MarketID:"'${productMap.marketID}'",
                       Tax1:"'${productMap.tax1}'",
                       Tax2:"'${productMap.tax2}'",
                       Tax3:"'${productMap.tax3}'",
                       Tax4:"'${productMap.tax4}'",
                       TaxesPaidBy:"'${productMap.taxesPaidBy}'",
                       TaxesPaidByID:"'${productMap.taxesPaidByID}'",
                       FeeSchedule:"'${productMap.feeSchedule}'",
                       PremDistrib:"'${productMap.versionPremDist}'",
                       FormID:"'OCR'",
                       RateInfo:"'${productMap.rateInfo}'",
                       CommPaid:"'${productMap.agentCommCalc}'",
                       ProposedEffective:"'${submissionMap.proposedEffective}'" ,
                       ProposedExpiration:"'${submissionMap.proposedExpiration}'" ,
                       TaxDistrib:"'${productMap.taxDistrib}'",
                       DeductType:"''",
                       LOB_Limit1:"''",
                       LOB_Limit2:"''",
                       LOB_Limit3:"''",
                       LOB_Limit4:"''",
                       LOB_Limit5:"''",
                       LOB_Limit6:"''",
                       LOB_Deduct1:"''",
                       LOB_Deduct2:"''",
                       LOB_Limit1Value:"'0'",
                       LOB_Limit2Value:"'0'",
                       LOB_Limit3Value:"'0'",
                       LOB_Limit4Value:"'0'",
                       LOB_Limit5Value:"'0'",
                       LOB_Limit6Value:"'0'",
                       LOB_Deduct1Value:"'0'",
                       LOB_Deduct2Value:"'0'",
                       TerrorActStatus:"'WAIVED'",
                       FlagOverrideCalc:"'N'",
                       TerrorTaxes:"'0.00'",
                       FlagMultiOption:"''",
                       LOB_Coverage1:"''",
                       LOB_Coverage2:"''",
                       LOB_Coverage3:"''",
                       LOB_Coverage4:"''",
                       LOB_Coverage5:"''",
                       LOB_Coverage6:"''",
                       LOB_DeductType1:"''",
                       LOB_DeductType2:"''",
                       TaxwoTRIA1:"'${productMap.tax1}'",
                       TaxwoTRIA2:"'${productMap.tax2}'",
                       TaxwoTRIA3:"'${productMap.tax3}'",
                       TaxwoTRIA4:"'${productMap.tax4}'",
                       LOB_Coverage7:"''",
                       LOB_Coverage8:"''",
                       LOB_Limit7:"''",
                       LOB_Limit8:"''",
                       LOB_Limit7Value:"'0'",
                       LOB_Limit8Value:"'0'",
                       PremiumProperty:"'0.00'",
                       PremiumLiability:"'0.00'",
                       PremiumOther:"'0.00'",
                       Tax1Name:"'${productMap.tax1Name}'",
                       Tax2Name:"'${productMap.tax2Name}'",
                       Tax3Name:"'${productMap.tax3Name}'",
                       Tax4Name:"'${productMap.tax4Name}'",
                       AgentDeposit:"'-${productMap.agentCommCalc}'",
                       TaxwoTRIA5:"'0.00'",
                       Tax5:"'0.00'",
                       Tax5Name:"''",
                       LOB_Coverage9:"''",
                       LOB_Limit9:"''",
                       LOB_Limit9Value:"'0'",
                       TaxwoTRIA6:"'0.00'",
                       Tax6Name:"''",
                       TaxwoTRIA7:"'0.00'",
                       Tax7Name:"''",
                       TaxwoTRIA8:"'0.00'",
                       Tax8Name:"''",
                       Tax6:"'0.00'",
                       Tax7:"'0.00'",
                       Tax8:"'0.00'",
                       InsuredDeposit:"'0.00'",
                       AgentDepositwoTRIA:"'-${productMap.agentCommCalc}'",
                       InsuredDepositwoTRIA:"'0.00'",
                       ReferenceKey_FK:"'${productMap.productReferenceID}'"
            ]
            aimSqlService.insertRecord("Version", versionMap)



            def quoteMap = [
                       QuoteID: "'${productMap.quoteID}'",
                       ProducerID:"'${submissionMap.brokerCompanyID}'",
                       ProductID:"'${productMap.productID}'" ,
                       NamedInsured:"'${submissionMap.namedInsured}'",
                       UserID:"'web'",
                       Received: "'${submissionMap.timestamp}'",
                       Acknowledged: "'${submissionMap.timestamp}'",
                       Quoted: "'${submissionMap.timestamp}'",
                       TeamID:"'01'",
                       DivisionID:"'00'",
                       StatusID:"'ACK'",
                       CreatedID:"'web'",
                       Renewal:"'N'",
                       OpenItem:"'N'",
                       VersionCounter:"'A'",
                       InsuredID: "'${submissionMap.insuredID}'",
                       Description:"'${productMap.productName}'",
                       Address1: "'${submissionMap.streetAddressMailing}'",
                       Address2:"''",
                       City: "'${submissionMap.cityMailing}'",
                       State: "'${submissionMap.stateMailing}'",
                       Zip: "'${submissionMap.zipCodeMailing}'",
                       AcctExec:"'${submissionMap.acctExecID}'",
                       CsrID:"'web'",
                       ReferenceID: "'${productMap.productReferenceID}'",
                       SubmitGrpID:"'${productMap.submitGroupID}'",
                       TaxState:"'${submissionMap.stateMailing}'",
                       CoverageID:"'${productMap.coverageID}'",
                       SuspenseFlag:"'N'",
                       ClaimsFlag:"'N'",
                       ActivePolicyFlag:"'N'",
                       LossHistory:"''",
                       LargeLossHistory:"''",
                       Exposures:"''",
                       AIM_TransDate:"'${submissionMap.timestamp}'",
                       AccountKey_FK:"'${submissionMap.insuredID}'",
                       CompanyID:"'${productMap.companyID}'",
                       SubmitTypeID:"'NEW'",
                       FlagRPG:"'N'",
                       CountryID:"''",
                       FlagTaxExempt:"''",
                       FlagNonResidentAgt:"'N'",
                       DBAName:"''",
                       MailAddress1:"''",
                       MailAddress2:"''",
                       MailCity:"''",
                       MailState:"''",
                       MailZip:"''",
                       Attention: "'${submissionMap.brokerName}'",
                       Quoted:"'${submissionMap.timestamp}'",
                       Effective:"'${submissionMap.proposedEffective}'" ,
                       Expiration:"'${submissionMap.proposedExpiration}'" ,
                       ContactID:"'${submissionMap.aimContactID}'",
                       UserDefinedStr1:"'${submissionMap.aimContactID}'", //keep track of which agent created quotes
            ]
            aimSqlService.insertRecord("Quote", quoteMap)

            submissionMap.notesFormatted = ""
            submissionMap.allQuestionMap.each{
                def questionMap = it
                def questionAnswer = ""
                def questionText = ""
                if(questionMap.questionText){
                    questionText = questionMap.questionText
                }
                if(questionMap.answer){
                    questionAnswer = questionMap.answer
                }
                submissionMap.notesFormatted = submissionMap.notesFormatted + "${questionText}: ${questionAnswer} " + "\n"
            }

            def noteMap = [ReferenceID: "'${productMap.quoteID}'",
                       UserID:"'web'",
                       DateTime: "'${submissionMap.timestamp}'",
                       Subject: "'Underwriter Questions'",
                       Note: "'${submissionMap.notesFormatted}'",
                       PurgeDate: 'NULL',
                       StatusID: 'NULL',
                       AlternateRefID: 'NULL',
                       DateAddedTo: 'NULL',
                       AddedByUserID: 'NULL']

            aimSqlService.insertRecord("Notes", noteMap)

            aimsql.execute "INSERT INTO dbo.taaQuoteActivity (QuoteID) VALUES (${productMap.quoteID})"

            aimsql.execute "INSERT INTO dbo.taaQuoteExtendedDetail (QuoteID) VALUES(${productMap.quoteID})"

            aimsql.call("{call dbo.AddTransaction( '${productMap.quoteID}', 'web', 'New business submission recvd', '${submissionMap.timestamp}', 'NBS', NULL, NULL, 'A', " +
                    "0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
                log.info "ADD TRANSACTION ID $num"
            }

            aimsql.call("{call dbo.AddTransaction( '${productMap.quoteID}', 'web', 'Quote version A', '${submissionMap.timestamp}', 'QPF', NULL, 'R', 'A', " +
                    "0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
                log.info "ADD TRANSACTION ID $num"
            }

            aimsql.call("{call dbo.spAddSuspense( ${Sql.INTEGER}, '${productMap.quoteID}', '${productMap.quoteID}', 'SQR', '${submissionMap.acctExecID}', 'web', 'F', '01', " +
                    "'${submissionMap.timestamp}', '${submissionMap.timestamp}', NULL) }") { num ->
                log.info "ADD TRANSACTION ID $num"
            }

//            aimsql.commit();


//            allQuoteIDs = allQuoteIDs + quoteID + ";" + coverageID + ",";
            productDetailArray << productMap
        }

        log.info(productDetailArray)

        //TOTAL PREMIUM
        submissionMap.premiumTotal = getSubmissionTotalPremiumForAllProducts(submissionMap)

        //TOTAL POLICY FEE IS $15 PER PRODUCT
        def totalPolicyFee = 15 * (productDetailArray.size())


        submissionMap['totalPolicyFee'] = totalPolicyFee

        def indicationStatus = "good"
        pdfService.createIndicationDoc(submissionMap, productDetailArray)
        def SL2FormStatus = createSL2FormPDF(submissionMap, productDetailArray)
        return productDetailArray.quoteID.join(", ") + "&;&" + indicationStatus + SL2FormStatus


    }

    def saveVersion(submissionMap){
        log.info "SAVING VERSION"


        //SAVE TO AIM
        saveVersionToAIM(submissionMap)


    }

    def saveVersionToAIM(submissionMap){
        log.info "SAVE VERSION TO AIM"
        Sql aimsql = new Sql(dataSource_aim)


        def productDetailArray = []
        submissionMap.coveragesAndProducts.each { key, value ->
            def coverageID = key
            def productID = value.productID
            def productMap = [:]

            Products productRecord = Products.findByProductID(productID)
            def taxMap = aimSqlService.getTaxInfo(submissionMap.stateMailing)

            productMap = buildProductMapForAIMTables(productID, submissionMap, taxMap)

            //VERSION TABLE
            def versionMap = [
                    QuoteID: "'${productMap.quoteID}'",
                    VerOriginal: "'${submissionMap.originalVersion}'",
                    Version: "'${submissionMap.versionLetter}'",
                    Financed: "'Y'",
                    Brokerage: "'N'" ,
                    Indicator: "'N'" ,
                    DirectBillFlag: "'N'" ,
                    ProposedTerm: "'${submissionMap.proposedTermLengthInt}'",
                    UnderLyingCoverage: "''" ,
                    PolicyTerm: "'${submissionMap.proposedTermLength}'" ,
                    VersionID: "'${productMap.quoteID}A'" ,
                    CompanyID:"'${productRecord.riskCompanyID}'",
                    ProductID:"'${productID}'" ,
                    Premium: "'${productMap.premium}'",
                    Non_Premium: "'${webQuoteFee}'",
                    NonTax_Premium: "'${webQuoteFeeNoTax}'",
                    FlagFeeCalc:"'N'",
                    Quoted:"'${submissionMap.timestamp}'",
                    Limits:"'${productMap.limitString}'",
                    Subject:"'${productRecord.terms}'",
                    Endorsement: "'${productRecord.forms}'",
                    Taxed: "'Y'",
                    MEP: "''",
                    Rate:"''",
                    LobDistrib: "'${buildProductLobDistribString(productMap)}'",
                    LobDistribSched: "'${buildProductLobDistribSchedString(productMap)}'",
                    GrossComm:"'${productMap.grossComm}'",
                    AgentComm:"'${productMap.agentComm}'",
                    Deductible:"'${productMap.deductString}'",
                    CoInsure:"''",
                    StatusID:"'ACK'",
                    MarketID:"'${productMap.marketID}'",
                    Tax1:"'${productMap.tax1}'",
                    Tax2:"'${productMap.tax2}'",
                    Tax3:"'${productMap.tax3}'",
                    Tax4:"'${productMap.tax4}'",
                    TaxesPaidBy:"'${productMap.taxesPaidBy}'",
                    TaxesPaidByID:"'${productMap.taxesPaidByID}'",
                    FeeSchedule:"'${productMap.feeSchedule}'",
                    PremDistrib:"'${productMap.versionPremDist}'",
                    FormID:"'OCR'",
                    RateInfo:"'${productMap.rateInfo}'",
                    CommPaid:"'${productMap.agentCommCalc}'",
                    ProposedEffective:"'${submissionMap.proposedEffective}'" ,
                    ProposedExpiration:"'${submissionMap.proposedExpiration}'" ,
                    TaxDistrib:"'${productMap.taxDistrib}'",
                    DeductType:"''",
                    LOB_Limit1:"''",
                    LOB_Limit2:"''",
                    LOB_Limit3:"''",
                    LOB_Limit4:"''",
                    LOB_Limit5:"''",
                    LOB_Limit6:"''",
                    LOB_Deduct1:"''",
                    LOB_Deduct2:"''",
                    LOB_Limit1Value:"'0'",
                    LOB_Limit2Value:"'0'",
                    LOB_Limit3Value:"'0'",
                    LOB_Limit4Value:"'0'",
                    LOB_Limit5Value:"'0'",
                    LOB_Limit6Value:"'0'",
                    LOB_Deduct1Value:"'0'",
                    LOB_Deduct2Value:"'0'",
                    TerrorActStatus:"'WAIVED'",
                    FlagOverrideCalc:"'N'",
                    TerrorTaxes:"'0.00'",
                    FlagMultiOption:"''",
                    LOB_Coverage1:"''",
                    LOB_Coverage2:"''",
                    LOB_Coverage3:"''",
                    LOB_Coverage4:"''",
                    LOB_Coverage5:"''",
                    LOB_Coverage6:"''",
                    LOB_DeductType1:"''",
                    LOB_DeductType2:"''",
                    TaxwoTRIA1:"'${productMap.tax1}'",
                    TaxwoTRIA2:"'${productMap.tax2}'",
                    TaxwoTRIA3:"'${productMap.tax3}'",
                    TaxwoTRIA4:"'${productMap.tax4}'",
                    LOB_Coverage7:"''",
                    LOB_Coverage8:"''",
                    LOB_Limit7:"''",
                    LOB_Limit8:"''",
                    LOB_Limit7Value:"'0'",
                    LOB_Limit8Value:"'0'",
                    PremiumProperty:"'0.00'",
                    PremiumLiability:"'0.00'",
                    PremiumOther:"'0.00'",
                    Tax1Name:"'${productMap.tax1Name}'",
                    Tax2Name:"'${productMap.tax2Name}'",
                    Tax3Name:"'${productMap.tax3Name}'",
                    Tax4Name:"'${productMap.tax4Name}'",
                    AgentDeposit:"'-${productMap.agentCommCalc}'",
                    TaxwoTRIA5:"'0.00'",
                    Tax5:"'0.00'",
                    Tax5Name:"''",
                    LOB_Coverage9:"''",
                    LOB_Limit9:"''",
                    LOB_Limit9Value:"'0'",
                    TaxwoTRIA6:"'0.00'",
                    Tax6Name:"''",
                    TaxwoTRIA7:"'0.00'",
                    Tax7Name:"''",
                    TaxwoTRIA8:"'0.00'",
                    Tax8Name:"''",
                    Tax6:"'0.00'",
                    Tax7:"'0.00'",
                    Tax8:"'0.00'",
                    InsuredDeposit:"'0.00'",
                    AgentDepositwoTRIA:"'-${productMap.agentCommCalc}'",
                    InsuredDepositwoTRIA:"'0.00'",
                    ReferenceKey_FK:"'${productMap.productReferenceID}'"
            ]
            aimSqlService.insertRecord("Version", versionMap)


            //UPDATE QUOTE ACTIVITY

            //UPDATE NOTES
            def noteMap = [ReferenceID: "'${productMap.quoteID}'",
                           UserID:"'web'",
                           DateTime: "'${submissionMap.timestamp}'",
                           Subject: "'Underwriter Questions'",
                           Note: "'Version Created'",
                           PurgeDate: 'NULL',
                           StatusID: 'NULL',
                           AlternateRefID: 'NULL',
                           DateAddedTo: 'NULL',
                           AddedByUserID: 'NULL']
            aimSqlService.insertRecord("Notes", noteMap)


            aimsql.call("{call dbo.AddTransaction( '${productMap.quoteID}', 'web', 'Quote version A', '${submissionMap.timestamp}', 'QPF', NULL, 'R', 'A', " +
                    "0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
                log.info "ADD TRANSACTION ID $num"
            }


            //SUSPENSE
            aimsql.call("{call dbo.spAddSuspense( ${Sql.INTEGER}, '${productMap.quoteID}', '${productMap.quoteID}', 'SQR', '${submissionMap.acctExecID}', 'web', 'F', '01', " +
                    "'${submissionMap.timestamp}', '${submissionMap.timestamp}', NULL) }") { num ->
                log.info "ADD TRANSACTION ID $num"
            }


            productDetailArray << productMap
        }

        //TOTAL PREMIUM
        submissionMap.premiumTotal = getSubmissionTotalPremiumForAllProducts(submissionMap)

        //TOTAL POLICY FEE IS $15 PER PRODUCT
        def totalPolicyFee = 15 * (productDetailArray.size())


        submissionMap['totalPolicyFee'] = totalPolicyFee

        def indicationStatus = "good"
        pdfService.createIndicationDoc(submissionMap, productDetailArray)
        def SL2FormStatus = createSL2FormPDF(submissionMap, productDetailArray)
        return productDetailArray.quoteID.join(", ") + "&;&" + indicationStatus + SL2FormStatus
    }



    //LOGO FILE
    def getAgencyLogoFileName(agencyID){
        log.info "GET LOGO FILE NAME"

        def logoFile
        def agencyRecord = Agency.findAllWhere(agencyID: agencyID)

        if (agencyRecord.empty) {
            // logic for handling no rows
            logoFile = "Barbican.png"
        }
        else if(agencyRecord != null && agencyRecord.logoFileName != null){
            if(agencyRecord.logoFileName == "default"){
                logoFile = "Barbican.png"
            }
            else{
                logoFile = agencyRecord[0].logoFileName
            }
        }
        else{
           logoFile = "Barbican.png"
        }

        return logoFile
    }

    //LIMIT AND DEDUCTIBLES
    def buildLimitString(limitArray, coverageID){
        log.info "BUILDING LIMIT STRING"
        def finalString = ""

        limitArray.each{
            def limitAmount = it.limitAmount
            def limitDescription = it.limitDescription

            finalString = finalString + limitAmount + "\t" + "$coverageID:" + limitDescription + "\n"
        }

        return finalString
    }

    def buildDeductString(deductArray, coverageID){
        log.info "BUILDING DEDUCT STRING"
        def finalString = ""

        deductArray.each{
            def deductAmount = it.deductAmount
            def deductDescription = it.deductDescription

            finalString = finalString + deductAmount + "\t" + "$coverageID:" + deductDescription + "\n"
        }

        return finalString
    }

    def buildProductLobDistribString(productMap){
        def productLobDistrib =  "${productMap.coverageID}\t${productMap.productPremium}\t${productMap.grossComm}\t${productMap.agentComm}\t\n"

        return productLobDistrib
    }

    def buildProductLobDistribSchedString(productMap){
        def productLobDistribSched =  "${productMap.coverageName}\t${productMap.productPremium}\t${productMap.agentComm}\t\n"

        return productLobDistribSched
    }

    //PRODUCT MAP
    def buildProductMapForAIMTables(productID, submissionMap, taxMap){
        def productMap = [:]

        Products productRecord = Products.findByProductID(productID)

        //GET PRODUCT DETAILS
        productMap.productID = productID
        productMap.coverageID = productRecord.coverage
        productMap.coverageName = getCoverageNameFromCovID( productMap.coverageID )
        productMap.productName = productRecord.productName
        productMap.productReferenceID = aimSqlService.getKeyFieldReferenceID()

        if(submissionMap.versionMode == true) {
            productMap.quoteID = submissionMap.originalQuoteID
        }
        else{
            productMap.quoteID = aimSqlService.getSubmitNumber()
        }
        productMap.submitGroupID = submissionMap.products[0]

        productMap.limitMap = jsonSlurper.parseText( productRecord.limitArray )
        productMap.limitString = buildLimitString( productMap.limitMap, productMap.coverageID )
        productMap.deductMap = jsonSlurper.parseText( productRecord.deductArray )
        productMap.deductString = buildDeductString( productMap.deductMap, productMap.coverageID )

        productMap.premium = submissionMap.premiumMap[productMap.coverageID].premium
        productMap.premiumString = productMap.premiumString
        productMap.grossComm = productRecord.grossPct != null ? productRecord.grossPct : defaultGrossPct
        productMap.agentComm = productRecord.agentPct != null ? productRecord.agentPct : defaultAgentPct
        productMap.agentCommCalc = productMap.premium * (productMap.agentComm/100)
        productMap.companyID = productRecord.riskCompanyID

        Company companyRecord = Company.findByCompanyID(productMap.companyID)
        productMap.insuranceCompanyName = companyRecord.name
        productMap.marketID = productRecord.marketCompanyID

        //TAX STUFF
        productMap.tax1Name = (submissionMap.premiumMap.taxLines[0] != null ? submissionMap.premiumMap.taxLines[0].name : "")
        productMap.tax2Name = (submissionMap.premiumMap.taxLines[1] != null ? submissionMap.premiumMap.taxLines[1].name : "")
        productMap.tax3Name = (submissionMap.premiumMap.taxLines[2] != null ? submissionMap.premiumMap.taxLines[2].name : "")
        productMap.tax4Name = (submissionMap.premiumMap.taxLines[3] != null ? submissionMap.premiumMap.taxLines[3].name : "")
        productMap.tax1 = (submissionMap.premiumMap.taxLines[0] != null ? submissionMap.premiumMap.taxLines[0].value : "")
        productMap.tax2 = (submissionMap.premiumMap.taxLines[1] != null ? submissionMap.premiumMap.taxLines[1].value : "")
        productMap.tax3 = (submissionMap.premiumMap.taxLines[2] != null ? submissionMap.premiumMap.taxLines[2].value : "")
        productMap.tax4 = (submissionMap.premiumMap.taxLines[3] != null ? submissionMap.premiumMap.taxLines[3].value : "")
        productMap.taxesPaidBy = taxMap.taxesPaidBy
        productMap.taxesPaidByID = taxMap.taxesPaidByID
        productMap.taxDistrib = ""

        taxMap.each{ k,v ->
            log.info k
            log.info v
            def taxCodeID = k
            def taxMapForTaxCode = v

            if( !taxMapForTaxCode instanceof String  && taxMapForTaxCode.containsKey("taxCodeID")){
                productMap.taxDistrib = productMap.taxDistrib +
                        taxMapForTaxCode.taxCodeID + "\t" +
                        (productMap.premium.toDouble() * taxMapForTaxCode.taxValue) + "\t" +
                        taxMapForTaxCode.taxesPaidBy + "\t" +
                        taxMapForTaxCode.companyID + "\t" +
                        taxMapForTaxCode.roundingRule + "\t" +
                        taxMapForTaxCode.taxValue + "\n";
            }
        }


        //FEES
        productMap.webQuoteFeeString = webQuoteFeeString
        productMap.webQuoteIntValue = webQuoteIntValue
        productMap.webQuoteFeeNoTax = webQuoteFeeNoTax

        productMap.brokerFee = utilService.moneyStringToFloat(submissionMap.brokerFee)
        productMap.brokerFeeString = submissionMap.brokerFee
        productMap.feeSchedule = "Policy Fee\t" + webQuoteFeeString + "\n"
        productMap.versionPremDist = "FEE" + "\t" + productMap.webQuoteIntValue + "\t" + "A" + "\t00\tY\tN\t\n"

        if(productMap.brokerFee && productMap.brokerFee > 0){
            productMap.feeSchedule = productMap.feeSchedule + "Broker Fee\t" +  productMap.brokerFee
            productMap.versionPremDist =  productMap.versionPremDist + "ABF" + "\t" + productMap.brokerFee + "\t" + "R" + "\tRAGENT\tY\tN\t\n"
            productMap.webQuoteFeeNoTax = productMap.webQuoteFeeNoTax + productMap.brokerFee
        }



        //RATE INFO
        productMap.rateInfo = ""


        //LOB DISTRIBUTION
        if(productRecord.lobDist != null){
            productMap.lobDistribSched = productRecord.lobDist.split('\n')[0].split('\t')[0] + "\t" + productMap.premium + "\t15.0"
        }
        else{
            productMap.lobDistribSched = ""
        }

        if(productMap.coverageID != null && productMap.premium != null && productMap.grossComm != null && productMap.agentComm != null){
            productMap.lobDistrib = productMap.coverageID + "\t" + productMap.premium + "\t" + productMap.grossComm + "\t" + productMap.agentComm + "\t\n";
        }
        else{
            productMap.lobDistrib = ""
        }

        return productMap
    }

    def getSubmissionTotalPremiumForAllProducts(submissionMap){
        def totalPremium = 0

        submissionMap.coveragesAndProducts.each { key, value ->
            def coverageID = key
            def productPremium = submissionMap.premiumMap[coverageID].premium

            totalPremium = totalPremium + productPremium
        }

        return totalPremium
    }

    def getSubmissionTotalTax(submissionMap){
        submissionMap.coveragesAndProducts.each { key, value ->

        }

    }

    //COVERAGES
    def getCoverageNameFromCovID(covID){
        Coverages coverageRecord = Coverages.findByCoverageCode(covID)

        return coverageRecord.coverageName
    }

    //GET UNDERWRITER
    def getDefaultUnderwriterIDForBroker(userRecord){
        def acctExecID = ""
        if(userRecord.defaultUnderwriter == null || userRecord.defaultUnderwriter.trim().length() == 0){
            acctExecID = 'jason'
        }
        else{
            acctExecID = userRecord.defaultUnderwriter
        }


        return acctExecID
    }
    def getDefaultUnderwriterNameForBroker(acctExecID){
        def aimUserRecord = aimSqlService.selectRecords("UserID", [UserID: acctExecID])
        def underwriterName = aimUserRecord.Name

        return underwriterName
    }

    //TAX STUFF
    def getTaxInfo(){
        log.info "GETTING TAX INFO"
        log.info params

        Sql aimsql = new Sql(dataSource_aim)

//        def aimUserRecord = aimSqlService.selectRecords("dvTaxTable", [UserID: submissionMap.acctExecID])
//        submissionMap.acctExecName = aimUserRecord.Name

        def resultsString = "";
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

    def getTaxMap(premiumMap){
        def taxMap = [:]
        def taxLines

    }



    //PDF STUFF
    def createSL2FormPDF(submissionMap, productDetailArray) {
        log.info "INTELLEDOX"
        try {
            def indicationDateFormat = 'MM/dd/yyyy'
            def now = new Date()
            def timeZone = TimeZone.getTimeZone('PST')
            def timestamp = now.format(indicationDateFormat, timeZone)

            def coverages = "";
            FileTransferHelper fileHelper = new FileTransferHelper();

            def soapXML = """<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>28a2009a-e7ec-49f3-af5f-0d8e1a36fd89</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>a35fe254-6068-45cb-babe-af24d5f8e5c9</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<basicInfo>
\t\t<nameOfInsured>${utilService.xmlClean(submissionMap.namedInsured)}</nameOfInsured>
\t\t<addressOfInsured>${utilService.xmlClean(submissionMap.streetAddressMailing)}</addressOfInsured>
\t\t<addressCityOfInsured>${utilService.xmlClean(submissionMap.cityMailing)}</addressCityOfInsured>
\t\t<addressZipOfInsured>${utilService.xmlClean(submissionMap.zipCodeMailing)}</addressZipOfInsured>
\t\t<riskDescription>${utilService.xmlClean(submissionMap.operationName)}</riskDescription>
\t\t<locationOfRiskAddress>${utilService.xmlClean(submissionMap.stateMailing)}</locationOfRiskAddress>
\t\t<insuranceCoverage>${utilService.xmlClean(submissionMap.coverages.join(", "))}</insuranceCoverage>
\t\t<RiskPurchasingGroupName></RiskPurchasingGroupName>
\t\t<RiskPurchasingGroupAddress></RiskPurchasingGroupAddress>
\t\t<nameOtherAgent></nameOtherAgent>
\t\t<date>${timestamp}</date>
\t\t<dateStart>${utilService.xmlClean(submissionMap.proposedEffective)}</dateStart>
\t</basicInfo>
</application>]]></int:Data>
                </int:ProvidedData>
            </int:providedData>
            <int:options>
                <int:ReturnDocuments>true</int:ReturnDocuments>
                <int:RunProviders>1</int:RunProviders>
                <int:LogGeneration>true</int:LogGeneration>
            </int:options>
        </int:GenerateWithData>
    </x:Body>
</x:Envelope>"""

            log.info soapXML

            def client = new SOAPClient('http://138.91.159.55/Produce/Service/GenerateDoc.asmx?WSDL')
            client.authorization = new HTTPBasicAuthorization("admin", "admin")
            def response = client.send(SOAPAction: 'http://services.dpm.com.au/intelledox/GenerateWithData', soapXML)

            if (response.text.length() > 1500) {
                log.info response.text.substring(0, 1500);
            } else {
                log.info response.text
            }

            def fileName = "SL2.pdf"

            def a = new XmlSlurper().parseText(response.text)
            def nodeToSerialize = a."**".find { it.name() == 'BinaryFile' }
            def pdfBinaryFile = nodeToSerialize.text();


            productDetailArray.quoteID.each {
                def quoteID = it
                def folderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/${quoteID}/")
                log.info folderPath

                fileHelper.saveBinaryFileToLocalPath(pdfBinaryFile, folderPath, fileName);

                fileHelper.ftpFileToAIM(fileName, folderPath, quoteID, dataSource_aim);
            }

            return "good"
        }
        catch (Exception e) {
            StringWriter writer = new StringWriter();
            PrintWriter printWriter = new PrintWriter(writer);
            e.printStackTrace(printWriter);
            printWriter.flush();
            String stackTrace = writer.toString();
            log.info("Error Details - " + stackTrace)

            return "SL2 Error"
        }


    }

    //VERSION LETTER
    def getNextVersionLetter(thisVersionLetter){
        //GET NEXT VERSION LETTER

        int charValue = thisVersionLetter.charAt(0);
        return String.valueOf( (char) (charValue + 1));


//        for (char alphabet = 'A'; alphabet <= 'Z'; alphabet++) {
//            log.info alphabet;
//        }
    }


}
