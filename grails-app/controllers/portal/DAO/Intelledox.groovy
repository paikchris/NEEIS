package portal.DAO

import grails.util.Environment
import groovy.json.JsonSlurper
import groovy.sql.Sql
import sun.misc.BASE64Decoder
import groovy.xml.*
import wslite.soap.*
import wslite.http.auth.*
import org.apache.commons.net.ftp.FTPClient
import org.apache.commons.net.ftp.FTP;
import sun.misc.BASE64Decoder;
import portal.Utils.FileTransferHelper;

class Intelledox {


    def createIndicationPDF(jsonSerial, uwQuestionsMap, uwQuestionsOrder, dataSource_aim) {
        log.info "INTELLEDOX"
        log.info "JSON ==== " + jsonSerial
        try {
            def indicationDateFormat = 'MM/dd/yyyy'
            def now = new Date()
            def timeZone = TimeZone.getTimeZone('PST')
            def timestamp = now.format(indicationDateFormat, timeZone)

//            jsonSerial.keySet().each{
//                log.info it
//                if(jsonSerial[it] && jsonSerial[it] instanceof String){
//                    if(jsonSerial[it].indexOf("&amp;") > -1){
//
//                    }
//                    else{
//                        log.info jsonSerial[it] + " -> " +  XmlUtil.escapeXml(jsonSerial[it])
//                        jsonSerial[it] = XmlUtil.escapeXml(jsonSerial[it])
//                    }
//
//                }
//            }

            FileTransferHelper fileHelper = new FileTransferHelper();

            def totalPolicyFee = 0;
            def coverages = "";
            if (jsonSerial.getAt("cglLOB").length() > 1) {
                coverages = coverages + "CGL "
            }
            if (jsonSerial.getAt("cpkLOB").length() > 1) {
                coverages = coverages + "CPK "
            }
            if (jsonSerial.getAt("epkgLOB").length() > 1) {
                coverages = coverages + "EPKG "
            }

            //BROKER HEADER STUFF
            def brokerCompanyName = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyName'));
            def brokerCompanyAddress = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyAddress'));
            def brokerCompanyAddressCity = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyCity'));
            def brokerCompanyState = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyState'));
            def brokerCompanyZip = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyZip'));
            def brokerCompanyPhone = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyPhone'));
            def brokerCompanyLicense = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense'));


            def environment = ""
            if (Environment.current == Environment.DEVELOPMENT) {
                environment = "dev";
            }
            else if (Environment.current == Environment.PRODUCTION) {
                environment = "prod";
            }

            def soapXML = """<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>a2962264-75d3-42a6-9a48-389a7cb59520</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>ab704e33-cf56-4406-9fc3-2b10f1de1a04</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<basicInfo>
\t\t<environment>${environment}</environment>
\t\t<logo>c:\\IntelledoxLogo\\${XmlUtil.escapeXml(jsonSerial.getAt('logoFile'))}</logo>
\t\t<nameOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('namedInsured'))}</nameOfInsured>
\t\t<brokerCompanyName>${brokerCompanyName}</brokerCompanyName>"""

            if (brokerCompanyAddress != null) {
                soapXML = soapXML + """
\t\t<brokerCompanyAddress>${brokerCompanyAddress}</brokerCompanyAddress>"""
            }
            if (brokerCompanyAddressCity != null) {
                soapXML = soapXML + """
\t\t<brokerCompanyAddressCity>${brokerCompanyAddressCity}</brokerCompanyAddressCity>"""
            }
            if (brokerCompanyState != null) {
                soapXML = soapXML + """
\t\t<brokerCompanyAddressState>,${brokerCompanyState}</brokerCompanyAddressState>"""
            }
            if (brokerCompanyZip != null) {
                soapXML = soapXML + """
\t\t<brokerCompanyAddressZip>${brokerCompanyZip}</brokerCompanyAddressZip>"""
            }
            if (brokerCompanyPhone != null) {
                soapXML = soapXML + """
\t\t<brokerCompanyPhone>${brokerCompanyPhone}</brokerCompanyPhone>"""
            }
            if (brokerCompanyLicense != null) {
                soapXML = soapXML + """
\t\t<brokerCompanyLicenseNumber>CALicNo:${brokerCompanyLicense}</brokerCompanyLicenseNumber>"""
            }

            soapXML = soapXML + """
\t\t<agentName>${XmlUtil.escapeXml(jsonSerial.getAt('attention'))}</agentName>
\t\t<agentLicenseNumber>${
                XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense')) ? XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense')) : ""
            }</agentLicenseNumber>
\t\t<agentEmail>${XmlUtil.escapeXml(jsonSerial.getAt('brokerEmail'))}</agentEmail>
\t\t<agentPhone>${XmlUtil.escapeXml(jsonSerial.getAt('brokerPhone'))}</agentPhone>
\t\t<date>${timestamp}</date>
\t\t<dateStart>${XmlUtil.escapeXml(jsonSerial.getAt('proposedEffectiveDate'))}</dateStart>
\t\t<submission>${XmlUtil.escapeXml(jsonSerial.getAt('allQuoteIDs').split(';')[0])}</submission>
\t\t<underwriter>"Jessica Maher"</underwriter>
\t\t<underwriterPhone>"(424) 634-7394"</underwriterPhone>
\t\t<underwriterFax>${XmlUtil.escapeXml(jsonSerial.getAt('underwriterFax'))}</underwriterFax>
\t\t<underwriterEmail>jessica@neeis.com</underwriterEmail>
\t\t<total>Total:</total>
\t\t<totalCost>${XmlUtil.escapeXml(jsonSerial.getAt('premiumAllLOBTotal'))}</totalCost>
\t\t<addressOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('streetNameMailing'))}</addressOfInsured>
\t\t<addressCityOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('cityMailing'))}</addressCityOfInsured>
\t\t<addressZipOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('zipCodeMailing'))}</addressZipOfInsured>
\t\t<riskDescription>${XmlUtil.escapeXml(jsonSerial.getAt("riskCategory"))}, ${
                XmlUtil.escapeXml(jsonSerial.getAt("riskChosen"))
            }</riskDescription>
\t\t<locationOfRiskAddress>${XmlUtil.escapeXml(jsonSerial.getAt("filmingLocation"))}</locationOfRiskAddress>
\t\t<insuranceCoverage>${coverages}</insuranceCoverage>
\t\t<insuranceCompany>${XmlUtil.escapeXml(jsonSerial.getAt("insuranceCompany"))}</insuranceCompany>
\t</basicInfo>
\t
\t<namedInsuredTable>
\t\t<namedInsuredHeader>Named Insured</namedInsuredHeader>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt("nameOfProductionCompany"))}"></nameInsured>
\t\t\t<nameInsuredColTwo>Contact: ${XmlUtil.escapeXml(jsonSerial.getAt("insuredContactName"))}</nameInsuredColTwo>
\t\t</namedInsuredRow>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt('streetNameMailing'))}"></nameInsured>
\t\t\t<nameInsuredColTwo>Email: ${XmlUtil.escapeXml(jsonSerial.getAt("namedInsuredEmail"))}</nameInsuredColTwo>
\t\t</namedInsuredRow>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt('cityMailing'))}, ${
                XmlUtil.escapeXml(jsonSerial.getAt('stateMailing'))
            } ${XmlUtil.escapeXml(jsonSerial.getAt('zipCodeMailing'))}"></nameInsured>
\t\t\t<nameInsuredColTwo>Phone: ${XmlUtil.escapeXml(jsonSerial.getAt("phoneNumber"))}</nameInsuredColTwo>
\t\t</namedInsuredRow>
\t</namedInsuredTable>
\t
\t<insuranceCompanyTable>
\t\t<insuranceCompanyHeader>Insurance Company</insuranceCompanyHeader>
\t\t<insuranceCompanyRow>
\t\t\t<insuranceCompany insuranceCompanyColOne="${XmlUtil.escapeXml(jsonSerial.getAt("insuranceCompany"))}"></insuranceCompany>
\t\t</insuranceCompanyRow>
\t</insuranceCompanyTable>
\t
\t<policyTermTable>
\t\t<policyTermHeader>Policy Term</policyTermHeader>
\t\t<policyTermRow>
\t\t\t<policyTerm policyTermColOne="Policy Term: ${XmlUtil.escapeXml(jsonSerial.getAt("proposedTermLengthString"))}"></policyTerm>
\t\t</policyTermRow>
\t\t<policyTermRow>
\t\t\t<policyTerm policyTermColOne="Proposed Effective: ${
                XmlUtil.escapeXml(jsonSerial.getAt("proposedEffectiveDate"))
            } - ${XmlUtil.escapeXml(jsonSerial.getAt("proposedExpirationDate"))}"></policyTerm>
\t\t</policyTermRow>
\t</policyTermTable>
\t""";
            soapXML = soapXML + """
\t<premiumSummaryTable>
\t\t<premiumSummaryHeader>Premium Summary</premiumSummaryHeader>
\t\t<premiumSummaryRow>""";
            if (jsonSerial.getAt("premSummary").split("\n").size() > 0) {
                jsonSerial.getAt("premSummary").split("\n").each {
                    if (it.length() > 0) {
                        if (it.split("\\t")[0] == "Premium Distribution") {

                        } else if (it.split("\\t")[0] == "Taxes and Fees") {
                            soapXML = soapXML + """
\t\t<premiumSummary premiumSummaryPackage="${it.split("\\t")[0]}">
\t\t\t<premiumSummaryCost>  </premiumSummaryCost>
\t\t</premiumSummary>"""
                        } else if (it.split("\\t")[0] == "Policy Fee") {
                            soapXML = soapXML + """
\t\t<premiumSummary premiumSummaryPackage="   ${it.split("\\t")[0]}">
\t\t\t<premiumSummaryCost>${it.split("\t")[1]} </premiumSummaryCost>
\t\t</premiumSummary>"""
                        } else {
                            soapXML = soapXML + """
\t\t<premiumSummary premiumSummaryPackage="   ${it.split("\\t")[0]}">
\t\t\t<premiumSummaryCost>${it.split("\t")[1]} </premiumSummaryCost>
\t\t</premiumSummary>"""
                        }

                    } else {

                    }
                }
            } else {
                log.info jsonSerial.getAt("premiumAllLOBTotal")
                soapXML = soapXML + """
\\t\\t<premiumSummary package="Total">
\\t\\t\\t<cost>  </cost>
\\t\\t</premiumSummary>"""
            }
            soapXML = soapXML + """
\t\t</premiumSummaryRow>
\t</premiumSummaryTable>""";

            ///////////////////Product descriptions and Limit/Deduct Breakdowns
            if (jsonSerial.getAt("cpkLOB").length() > 1) {
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Commercial Package - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("cpkLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >= 3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            } else if (jsonSerial.getAt("cglLOB").length() > 1) {
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Commercial General Liability - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("cglLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >= 3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            if (jsonSerial.getAt("epkgLOB").length() > 1) {
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Entertainment Package - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("epkgLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >= 3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }


            soapXML = soapXML + """
\t<termsTable>
\t\t<termHeader>Terms</termHeader>
\t\t<term>
\t\t\t<terms>${XmlUtil.escapeXml(jsonSerial.getAt("termsInsert"))} </terms>
\t\t</term>
\t</termsTable>"""

            soapXML = soapXML + """
\t<policyFormEndorsementTable>
\t\t<policyFormEndorsementTitle>Policy Form / Endorsement</policyFormEndorsementTitle>
\t</policyFormEndorsementTable>
"""

            if (jsonSerial.getAt("epkgLOB").length() > 1) {
                jsonSerial.getAt("endorseInsertEPKG").split("\n").eachWithIndex { row, index ->


                    if (row.length() > 0) {
                        if (index == 0) {
                            soapXML = soapXML + """
\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>${XmlUtil.escapeXml(row)}</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>
"""
                        } else {
                            if (row.split(" - ").size() > 1) {
                                soapXML = soapXML + """
\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="${XmlUtil.escapeXml(row.split(" - ")[0])}">
\t\t\t\t\t\t<policyFormEndorsementName>${XmlUtil.escapeXml(row.split(" - ")[1].replaceAll(".*:", ""))}</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>
"""
                            } else {
                                soapXML = soapXML + """
\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="${XmlUtil.escapeXml(row)}">
\t\t\t\t\t\t<policyFormEndorsementName></policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>
"""
                            }

                        }
                    }
                }
                soapXML = soapXML + """
\t\t\t</policyFormEndorsementRow>
\t</policyFormEndorsementHeaders>
"""

            }
            if (jsonSerial.getAt("cpkLOB").length() > 1) {
                jsonSerial.getAt("endorseInsertCPK").split("\n").eachWithIndex { row, index ->
                    if (row.length() > 0) {
                        if (index == 0) {
                            soapXML = soapXML + """
\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>${XmlUtil.escapeXml(row)}</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>
"""
                        } else {
                            if (row.split(" - ").size() > 1) {
                                soapXML = soapXML + """
\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="${XmlUtil.escapeXml(row.split(" - ")[0])}">
\t\t\t\t\t\t<policyFormEndorsementName>${XmlUtil.escapeXml(row.split(" - ")[1].replaceAll(".*:", ""))}</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>
"""
                            } else {
                                soapXML = soapXML + """
\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="${XmlUtil.escapeXml(row)}">
\t\t\t\t\t\t<policyFormEndorsementName></policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>
"""
                            }

                        }
                    }
                }
                soapXML = soapXML + """
\t\t\t</policyFormEndorsementRow>
\t</policyFormEndorsementHeaders>
"""
            } else if (jsonSerial.getAt("cglLOB").length() > 1) {
                jsonSerial.getAt("endorseInsertCGL").split("\n").eachWithIndex { row, index ->
                    if (row.length() > 0) {
                        if (index == 0) {
                            soapXML = soapXML + """
\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>${XmlUtil.escapeXml(row)}</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>
"""
                        } else {
                            if (row.split(" - ").size() > 1) {
                                soapXML = soapXML + """
\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="${XmlUtil.escapeXml(row.split(" - ")[0])}">
\t\t\t\t\t\t<policyFormEndorsementName>${XmlUtil.escapeXml(row.split(" - ")[1].replaceAll(".*:", ""))}</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>
"""
                            } else {
                                soapXML = soapXML + """
\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="${XmlUtil.escapeXml(row)}">
\t\t\t\t\t\t<policyFormEndorsementName></policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>
"""
                            }

                        }
                    }
                }
                soapXML = soapXML + """
\t\t\t</policyFormEndorsementRow>
\t</policyFormEndorsementHeaders>
"""
            }


            soapXML = soapXML + """
\t<notesTable>
\t\t<notesHeader>Underwriting Questions</notesHeader>
\t\t<notesRow>"""
            uwQuestionsOrder.each {

                soapXML = soapXML + """

\t\t\t<notes notesQuestion="${XmlUtil.escapeXml("${it}")}">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(uwQuestionsMap["${it}"])}</notesAnswer>
\t\t\t</notes>"""
            }

/*
            //POLICY FORM INFO
            //OPTED TO LIST EACH ONE SEPARATELY AND NOT LOOP TO ENSURE ORDER OF INFORMATION
            soapXML = soapXML + """
\t\t\t<notes notesQuestion=" ">
\t\t\t\t<notesAnswer> </notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion=" ">
\t\t\t\t<notesAnswer> </notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="POLICY INFORMATION">
\t\t\t\t<notesAnswer></notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Named Insured">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(jsonSerial.getAt('namedInsured'))}</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Address">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(jsonSerial.getAt('streetNameMailing'))}</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="City/State/Zip">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(jsonSerial.getAt('cityMailing'))}, ${XmlUtil.escapeXml(jsonSerial.getAt('stateMailing'))} ${XmlUtil.escapeXml(jsonSerial.getAt('zipCodeMailing'))}</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Business Structure">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(jsonSerial.getAt('businessStructure'))}</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Domiciled State">
\t\t\t\t<notesAnswer>?? Not sure yet</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Effective Date">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(jsonSerial.getAt('proposedEffectiveDate'))}</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Expiration Date">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(jsonSerial.getAt('proposedExpirationDate'))}</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Policy Term Length">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(jsonSerial.getAt('proposedTermLength'))}</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Operations/Description">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(jsonSerial.getAt('story'))}</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Total Budget">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(jsonSerial.getAt('totalBudgetConfirm'))}</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Rate">
\t\t\t\t<notesAnswer>See Rating Section</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Premium">
\t\t\t\t<notesAnswer>See Premium Summary Section</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Terrorism">
\t\t\t\t<notesAnswer>??? Attn: Andee, Can't find a place we ask if terrorism is included or rejected</notesAnswer>
\t\t\t</notes>
\t\t\t<notes notesQuestion="Taxes">
\t\t\t\t<notesAnswer>??? Need more time to complete</notesAnswer>
\t\t\t</notes>

"""
*/


            soapXML = soapXML + """
\t\t</notesRow>
\t</notesTable>"""


            soapXML = soapXML + """

\t
\t<applicantInformationTable>
\t\t<applicantInformationHeader>Application Information</applicantInformationHeader>
\t\t<applicantInformationRow>
\t\t\t<applicantInformation applicantInformationColOne="Name of Production Company">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("nameOfProductionCompany"))}</applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Title of Production">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("titleOfProduction"))}</applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Website">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("website"))}</applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Mailing Address">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("streetNameMailing"))} ${
                XmlUtil.escapeXml(jsonSerial.getAt("cityMailing"))
            }, ${XmlUtil.escapeXml(jsonSerial.getAt("stateMailing"))} ${
                XmlUtil.escapeXml(jsonSerial.getAt("zipCodeMailing"))
            } </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Primary Contact Name">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("insuredContactName"))} </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Tel No">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("phoneNumber"))} </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Email">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("namedInsuredEmail"))} </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t</applicantInformationRow>
\t</applicantInformationTable>

\t
\t<budgetInformationTable>
\t\t<budgetInformationHeader>Budget Information</budgetInformationHeader>
\t\t<budgetInformationRow>
\t\t\t<budgetInformation budgetInformationColOne="Gross Production Cost">
\t\t\t\t<budgetInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("totalBudgetConfirm"))} </budgetInformationColTwo>
\t\t\t</budgetInformation>
\t\t\t<budgetInformation budgetInformationColOne="Budget Attached">
\t\t\t\t<budgetInformationColTwo> Top Sheet of Budget is required </budgetInformationColTwo>
\t\t\t</budgetInformation>
"""

            if (jsonSerial.getAt("sourceOfFinancing") != null) {
                soapXML = soapXML + """      
\t\t\t<budgetInformation budgetInformationColOne="Source of Financing">
\t\t\t\t<budgetInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("sourceOfFinancing"))} </budgetInformationColTwo>
\t\t\t</budgetInformation>"""
            }

            soapXML = soapXML + """
\t\t</budgetInformationRow>
\t</budgetInformationTable>

\t<ratingTable>
\t\t<ratingHeader>Rating</ratingHeader>
\t"""

            if (jsonSerial.getAt("EPKGIndicationRateInfo") != null) {
                soapXML = soapXML + """
\\t\\t<ratingRow>
\\t\\t\\t<rating ratingName="Entertainment Package">
\\t\\t\\t\\t<ratingPrice>  </ratingPrice>
\\t\\t\\t</rating>"""

                jsonSerial.getAt("EPKGIndicationRateInfo").split("\\n").eachWithIndex { row, index ->
                    log.info("ROW: " + row)
                    if (row.split("\\t").size() > 1) {
                        soapXML = soapXML + """
\\t\\t\\t<rating ratingName="${row.split("\\t")[0]}">
\\t\\t\\t\\t<ratingPrice> ${XmlUtil.escapeXml(row.split("\\t")[1])}</ratingPrice>
\\t\\t\\t</rating>"""
                    } else {
                        soapXML = soapXML + """
\\t\\t\\t<rating ratingName="${row.split("\\t")[0]}">
\\t\\t\\t\\t<ratingPrice></ratingPrice>
\\t\\t\\t</rating>"""
                    }
                }
                soapXML = soapXML + """
\\t\\t</ratingRow>"""
            }
            if (jsonSerial.getAt("CPKIndicationRateInfo") != null) {
                soapXML = soapXML + """
\\t\\t<ratingRow>
\\t\\t\\t<rating ratingName="Commercial Package">
\\t\\t\\t\\t<ratingPrice>  </ratingPrice>
\\t\\t\\t</rating>"""

                jsonSerial.getAt("CPKIndicationRateInfo").split("\\n").eachWithIndex { row, index ->
                    log.info("ROW: " + row)
                    if (row.split("\\t").size() > 1) {
                        soapXML = soapXML + """
\\t\\t\\t<rating ratingName="${row.split("\\t")[0]}">
\\t\\t\\t\\t<ratingPrice> ${XmlUtil.escapeXml(row.split("\\t")[1])}</ratingPrice>
\\t\\t\\t</rating>"""
                    } else {
                        soapXML = soapXML + """
\\t\\t\\t<rating ratingName="${row.split("\\t")[0]}">
\\t\\t\\t\\t<ratingPrice></ratingPrice>
\\t\\t\\t</rating>"""
                    }
                }
                soapXML = soapXML + """
\\t\\t</ratingRow>"""
            } else if (jsonSerial.getAt("CGLIndicationRateInfo") != null) {
                soapXML = soapXML + """
\\t\\t<ratingRow>
\\t\\t\\t<rating ratingName="Commercial General Liability">
\\t\\t\\t\\t<ratingPrice>  </ratingPrice>
\\t\\t\\t</rating>"""

                jsonSerial.getAt("CGLIndicationRateInfo").split("\\n").eachWithIndex { row, index ->
                    log.info("ROW: " + row)
                    if (row.split("\\t").size() > 1) {
                        soapXML = soapXML + """
\\t\\t\\t<rating ratingName="${row.split("\\t")[0]}">
\\t\\t\\t\\t<ratingPrice> ${XmlUtil.escapeXml(row.split("\\t")[1])}</ratingPrice>
\\t\\t\\t</rating>"""
                    } else {
                        soapXML = soapXML + """
\\t\\t\\t<rating ratingName="${row.split("\\t")[0]}">
\\t\\t\\t\\t<ratingPrice></ratingPrice>
\\t\\t\\t</rating>"""
                    }
                }
                soapXML = soapXML + """
\\t\\t</ratingRow>"""
            }

            soapXML = soapXML + """
\\t</ratingTable>
\\t"""


            soapXML = soapXML + """

\t<extraForms> </extraForms>


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

            def fileName = "Indication A.pdf"

            def a = new XmlSlurper().parseText(response.text)
            def nodeToSerialize = a."**".find { it.name() == 'BinaryFile' }
            def pdfBinaryFile = nodeToSerialize.text();

//            throw new IOException()
            log.info("NEW FOLDER QUOTE = " + jsonSerial.getAt("allQuoteIDs"))
//        def quoteID = jsonSerial.getAt("allQuoteIDs").split(",")[0].split(";")[0]

            jsonSerial.getAt("allQuoteIDs").split(",").each {
                def quoteID = it.split(";")[0]
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

            return "Indication Error"
        }


    }

    def createIndicationSpecialEventsPDF(jsonSerial, uwQuestionsMap, uwQuestionsOrder, dataSource_aim) {
        log.info "INTELLEDOX"
        log.info "JSON ==== " + jsonSerial
        try {
            def indicationDateFormat = 'MM/dd/yyyy'
            def now = new Date()
            def timeZone = TimeZone.getTimeZone('PST')
            def timestamp = now.format(indicationDateFormat, timeZone)

//            jsonSerial.keySet().each{
//                log.info it
//                if(jsonSerial[it] && jsonSerial[it] instanceof String){
//                    if(jsonSerial[it].indexOf("&amp;") > -1){
//
//                    }
//                    else{
//                        log.info jsonSerial[it] + " -> " +  XmlUtil.escapeXml(jsonSerial[it])
//                        jsonSerial[it] = XmlUtil.escapeXml(jsonSerial[it])
//                    }
//
//                }
//            }

            FileTransferHelper fileHelper = new FileTransferHelper();

            def totalPolicyFee = 0;
            def coverages = "";
            if (jsonSerial.getAt("cglLOB").length() > 1) {
                coverages = coverages + "CGL "
            }
            if (jsonSerial.getAt("alcoholLOB").length() > 1) {
                coverages = coverages + "ALCOHOL "
            }

            //BROKER HEADER STUFF
            def brokerCompanyName = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyName'));
            def brokerCompanyAddress = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyAddress'));
            def brokerCompanyAddressCity = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyCity'));
            def brokerCompanyState = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyState'));
            def brokerCompanyZip = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyZip'));
            def brokerCompanyPhone = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyPhone'));
            def brokerCompanyLicense = XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense'));

            def environment = ""
            if (Environment.current == Environment.DEVELOPMENT) {
                environment = "dev";
            }
            else if (Environment.current == Environment.PRODUCTION) {
                environment = "prod";
            }

            def soapXML = """<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>a2962264-75d3-42a6-9a48-389a7cb59520</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>ab704e33-cf56-4406-9fc3-2b10f1de1a04</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<basicInfo>
\t\t<environment>${environment}</environment>
\t\t<logo>c:\\IntelledoxLogo\\${XmlUtil.escapeXml(jsonSerial.getAt('logoFile'))}</logo>
\t\t<nameOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('namedInsured'))}</nameOfInsured>
\t\t<brokerCompanyName>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyName'))}</brokerCompanyName>"""

            if (brokerCompanyAddress != null) {
                soapXML = soapXML + """
\\t\\t<brokerCompanyAddress>${brokerCompanyAddress}</brokerCompanyAddress>"""
            }
            if (brokerCompanyAddressCity != null) {
                soapXML = soapXML + """
\\t\\t<brokerCompanyAddressCity>${brokerCompanyAddressCity}</brokerCompanyAddressCity>"""
            }
            if (brokerCompanyState != null) {
                soapXML = soapXML + """
\\t\\t<brokerCompanyAddressState>,${brokerCompanyState}</brokerCompanyAddressState>"""
            }
            if (brokerCompanyZip != null) {
                soapXML = soapXML + """
\\t\\t<brokerCompanyAddressZip>${brokerCompanyZip}</brokerCompanyAddressZip>"""
            }
            if (brokerCompanyPhone != null) {
                soapXML = soapXML + """
\t\t<brokerCompanyPhone>${brokerCompanyPhone}</brokerCompanyPhone>"""
            }
            if (brokerCompanyLicense != null) {
                soapXML = soapXML + """
\\t\\t<brokerCompanyLicenseNumber> CALicNo:${brokerCompanyLicense}</brokerCompanyLicenseNumber>"""
            }

            soapXML = soapXML + """
\t\t<agentName>${XmlUtil.escapeXml(jsonSerial.getAt('attention'))}</agentName>
\t\t<agentLicenseNumber>${
                XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense')) ? XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense')) : ""
            }</agentLicenseNumber>
\t\t<agentEmail>${XmlUtil.escapeXml(jsonSerial.getAt('brokerEmail'))}</agentEmail>
\t\t<agentPhone>${XmlUtil.escapeXml(jsonSerial.getAt('brokerPhone'))}</agentPhone>
\t\t<date>${timestamp}</date>
\t\t<dateStart>${XmlUtil.escapeXml(jsonSerial.getAt('proposedEffective'))}</dateStart>
\t\t<submission>${XmlUtil.escapeXml(jsonSerial.getAt('allQuoteIDs').split(';')[0])}</submission>
\t\t<underwriter>${XmlUtil.escapeXml(jsonSerial.getAt('accountExecName'))}</underwriter>
\t\t<underwriterPhone>${XmlUtil.escapeXml(jsonSerial.getAt('underwriterPhone'))}</underwriterPhone>
\t\t<underwriterFax>${XmlUtil.escapeXml(jsonSerial.getAt('underwriterFax'))}</underwriterFax>
\t\t<underwriterEmail>${XmlUtil.escapeXml(jsonSerial.getAt('accountExecEmail'))}</underwriterEmail>
\t\t<total>Total:</total>
\t\t<totalCost>${XmlUtil.escapeXml(jsonSerial.getAt('premiumAllLOBTotal'))}</totalCost>
\t\t<addressOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('streetNameMailing'))}</addressOfInsured>
\t\t<addressCityOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('cityMailing'))}</addressCityOfInsured>
\t\t<addressZipOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('zipCodeMailing'))}</addressZipOfInsured>
\t\t<riskDescription>${XmlUtil.escapeXml(jsonSerial.getAt("riskCategory"))}, ${
                XmlUtil.escapeXml(jsonSerial.getAt("riskChosen"))
            }</riskDescription>
\t\t<locationOfRiskAddress>${XmlUtil.escapeXml(jsonSerial.getAt("filmingLocation"))}</locationOfRiskAddress>
\t\t<insuranceCoverage>${coverages}</insuranceCoverage>
\t\t<insuranceCompany>${XmlUtil.escapeXml(jsonSerial.getAt("insuranceCompany"))}</insuranceCompany>
\t</basicInfo>
\t
\t<namedInsuredTable>
\t\t<namedInsuredHeader>Named Insured</namedInsuredHeader>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt("namedInsured"))}"></nameInsured>
\t\t\t<nameInsuredColTwo></nameInsuredColTwo>
\t\t</namedInsuredRow>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt('streetNameMailing'))}"></nameInsured>
\t\t\t<nameInsuredColTwo></nameInsuredColTwo>
\t\t</namedInsuredRow>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt('cityMailing'))}, ${
                XmlUtil.escapeXml(jsonSerial.getAt('stateMailing'))
            } ${XmlUtil.escapeXml(jsonSerial.getAt('zipCodeMailing'))}"></nameInsured>
\t\t\t<nameInsuredColTwo></nameInsuredColTwo>
\t\t</namedInsuredRow>
\t</namedInsuredTable>
\t
\t<insuranceCompanyTable>
\t\t<insuranceCompanyHeader>Insurance Company</insuranceCompanyHeader>
\t\t<insuranceCompanyRow>
\t\t\t<insuranceCompany insuranceCompanyColOne="${XmlUtil.escapeXml(jsonSerial.getAt("insuranceCompany"))}"></insuranceCompany>
\t\t</insuranceCompanyRow>
\t</insuranceCompanyTable>
\t
\t<policyTermTable>
\t\t<policyTermHeader>Policy Term</policyTermHeader>
\t\t<policyTermRow>
\t\t\t<policyTerm policyTermColOne="Policy Term: ${XmlUtil.escapeXml(jsonSerial.getAt("proposedEffectiveDate"))}"></policyTerm>
\t\t</policyTermRow>
\t\t<policyTermRow>
\t\t\t<policyTerm policyTermColOne="Proposed Effective: ${
                XmlUtil.escapeXml(jsonSerial.getAt("proposedEffectiveDate"))
            } - ${XmlUtil.escapeXml(jsonSerial.getAt("proposedExpirationDate"))}"></policyTerm>
\t\t</policyTermRow>
\t</policyTermTable>
\t""";
            soapXML = soapXML + """
\t<premiumSummaryTable>
\t\t<premiumSummaryHeader>Premium Summary</premiumSummaryHeader>
\t\t<premiumSummaryRow>""";
            if (jsonSerial.getAt("premSummary").split("\n").size() > 0) {
                jsonSerial.getAt("premSummary").split("\n").each {
                    if (it.length() > 0) {
                        if (it.split("\\t")[0] == "Premium Distribution") {

                        } else if (it.split("\\t")[0] == "Taxes and Fees") {
                            soapXML = soapXML + """
\t\t<premiumSummary premiumSummaryPackage="${it.split("\\t")[0]}">
\t\t\t<premiumSummaryCost>  </premiumSummaryCost>
\t\t</premiumSummary>"""
                        } else if (it.split("\\t")[0] == "Policy Fee") {
                            soapXML = soapXML + """
\t\t<premiumSummary premiumSummaryPackage="   ${it.split("\\t")[0]}">
\t\t\t<premiumSummaryCost>${it.split("\t")[1]} </premiumSummaryCost>
\t\t</premiumSummary>"""
                        } else {
                            soapXML = soapXML + """
\t\t<premiumSummary premiumSummaryPackage="   ${it.split("\\t")[0]}">
\t\t\t<premiumSummaryCost>${it.split("\t")[1]} </premiumSummaryCost>
\t\t</premiumSummary>"""
                        }

                    } else {

                    }
                }
            } else {
                log.info jsonSerial.getAt("premiumAllLOBTotal")
                soapXML = soapXML + """
\\t\\t<premiumSummary package="Total">
\\t\\t\\t<cost>  </cost>
\\t\\t</premiumSummary>"""
            }
            soapXML = soapXML + """
\t\t</premiumSummaryRow>
\t</premiumSummaryTable>""";

            ///////////////////Product descriptions and Limit/Deduct Breakdowns

            if (jsonSerial.getAt("cglLOB").length() > 1) {
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Commercial Package Policy - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("cglLOB").split("\n").each {
                    if (it.length() > 0) {
                        log.info("CGLLOB TESTING ===== " + it)
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >= 3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            if (jsonSerial.getAt("alcoholLOB").length() > 1) {
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Non-Owned and Hired Automobile- Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("alcoholLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >= 3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }



            soapXML = soapXML + """
\t<termsTable>
\t\t<termHeader>Terms</termHeader>
\t\t<term>
\t\t\t<terms>${XmlUtil.escapeXml(jsonSerial.getAt("termsInsert"))} </terms>
\t\t</term>
\t</termsTable>"""

            soapXML = soapXML + """
\t<policyFormEndorsementTable>
\t\t<policyFormEndorsementTitle>Policy Form / Endorsement</policyFormEndorsementTitle>
\t</policyFormEndorsementTable>
"""
            log.info(jsonSerial.getAt("endorseInsert"))
            if (jsonSerial.getAt("cglLOB").length() > 1) {
                jsonSerial.getAt("endorseInsert").split("\n").eachWithIndex { row, index ->
                    if (row.length() > 0) {
                        if (index == 0) {
                            soapXML = soapXML + """
\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>${XmlUtil.escapeXml(row)}</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>
"""
                        } else {
                            log.info row
                            log.info row.split(" - ")[0]
                            log.info row.split(" - ")[1]

                            soapXML = soapXML + """
\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="${XmlUtil.escapeXml(row.split(" - ")[0])}">
\t\t\t\t\t\t<policyFormEndorsementName>${XmlUtil.escapeXml(row.split(" - ")[1])}</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>
"""
                        }
                    }
                }
                soapXML = soapXML + """
\t\t\t</policyFormEndorsementRow>
\t</policyFormEndorsementHeaders>
"""

            }
            soapXML = soapXML + """
\t<notesTable>
\t\t<notesHeader>Underwriting Questions</notesHeader>
\t\t<notesRow>"""
            uwQuestionsOrder.each {

                soapXML = soapXML + """

\t\t\t<notes notesQuestion="${XmlUtil.escapeXml("${it}")}">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(uwQuestionsMap["${it}"])}</notesAnswer>
\t\t\t</notes>"""
            }
            soapXML = soapXML + """
\t\t</notesRow>
\t</notesTable>"""

//            soapXML = soapXML + """
//\t<ratingTable>
//\t"""
//
//            if(jsonSerial.getAt("EPKGRateInfo") != null){
//                soapXML = soapXML + """
//\t
//\t
//\t\t<ratingHeader>Rating</ratingHeader>
//\t\t<ratingRow>
//\t\t\t<rating ratingName="Entertainment Package">
//\t\t\t\t<ratingPrice>${XmlUtil.escapeXml(jsonSerial.getAt("EPKGRateInfo"))}</ratingPrice>
//\t\t\t</rating>
//\t\t</ratingRow>"""
//            }
//            if(jsonSerial.getAt("CPKRateInfo") != null){
//                soapXML = soapXML + """
//\t
//\t
//\t\t<ratingRow>
//\t\t\t<rating ratingName="Commercial Package">
//\t\t\t\t<ratingPrice>${XmlUtil.escapeXml(jsonSerial.getAt("CPKRateInfo"))}</ratingPrice>
//\t\t\t</rating>
//\t\t</ratingRow>"""
//            }
//            else if(jsonSerial.getAt("CGLRateInfo") != null){
//                soapXML = soapXML + """
//\t
//\t
//\t\t<ratingRow>
//\t\t\t<rating ratingName="Commercial General Liability">
//\t\t\t\t<ratingPrice>${XmlUtil.escapeXml(jsonSerial.getAt("CGLRateInfo"))}</ratingPrice>
//\t\t\t</rating>
//\t\t</ratingRow>"""
//            }
//
//            soapXML = soapXML + """
//\t</ratingTable>
//\t"""


            soapXML = soapXML + """
\t
\t<applicantInformationTable>
\t\t<applicantInformationHeader>Application Information</applicantInformationHeader>
\t\t<applicantInformationRow>
\t\t\t<applicantInformation applicantInformationColOne="Name of Insured">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("namedInsured"))}</applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Website">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("website"))}</applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Mailing Address">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("streetNameMailing"))} ${
                XmlUtil.escapeXml(jsonSerial.getAt("cityMailing"))
            }, ${XmlUtil.escapeXml(jsonSerial.getAt("stateMailing"))} ${
                XmlUtil.escapeXml(jsonSerial.getAt("zipCodeMailing"))
            } </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Primary Contact Name">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("namedInsured"))} </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Tel No">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("phoneNumber"))} </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Email">
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("namedInsuredEmail"))} </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t</applicantInformationRow>
\t</applicantInformationTable>"""

            soapXML = soapXML + """
\t<ratingTable>
\t\t<ratingHeader>Rating</ratingHeader>
\t"""
            if (jsonSerial.getAt("CGLIndicationRateInfo") != null) {
                soapXML = soapXML + """
\t\t<ratingRow>
\t\t\t<rating ratingName="Commercial General Liability">
\t\t\t\t<ratingPrice>  </ratingPrice>
\t\t\t</rating>"""

                jsonSerial.getAt("CGLIndicationRateInfo").split("\n").eachWithIndex { row, index ->
                    log.info("ROW: " + row)
                    if (row.split("\t").size() > 1) {
                        soapXML = soapXML + """
\t\t\t<rating ratingName="${row.split("\t")[0]}">
\t\t\t\t<ratingPrice> ${XmlUtil.escapeXml(row.split("\t")[1])}</ratingPrice>
\t\t\t</rating>"""
                    } else {
                        soapXML = soapXML + """
\t\t\t<rating ratingName="${row.split("\t")[0]}">
\t\t\t\t<ratingPrice></ratingPrice>
\t\t\t</rating>"""
                    }
                }
                soapXML = soapXML + """
\t\t</ratingRow>"""
            }
            soapXML = soapXML + """
\t</ratingTable>
\t



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

            def fileName = "Indication A.pdf"

            def a = new XmlSlurper().parseText(response.text)
            def nodeToSerialize = a."**".find { it.name() == 'BinaryFile' }
            def pdfBinaryFile = nodeToSerialize.text();

//            throw new IOException()
            log.info("NEW FOLDER QUOTE = " + jsonSerial.getAt("allQuoteIDs"))
//        def quoteID = jsonSerial.getAt("allQuoteIDs").split(",")[0].split(";")[0]

            jsonSerial.getAt("allQuoteIDs").split(",").each {
                def quoteID = it.split(";")[0]
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

            return "Indication Error"
        }


    }

    def createCertPDF(params, dataSource_aim) {
        log.info "INTELLEDOX CERT BYTES"
        log.info params
        FileTransferHelper fileHelper = new FileTransferHelper();
        def projectGUID = "";
        if (params.ai == "true") {
            //WITH AI FORM
            projectGUID = "8285f070-4e75-4ab2-a265-e81d7e4b2517"
        } else {
            //WITHOUT AI FORM
            projectGUID = "d83d80e6-3683-4589-a747-24e98b14765c"
        }

        def soapXML = """<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>d83d80e6-3683-4589-a747-24e98b14765c</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>2c1ce06a-100f-40c8-b4d4-af4057349532</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<certificate>
\t\t
\t\t<date>${params.date}</date>
\t\t<brokerCompanyName>${params.brokerCompanyName}</brokerCompanyName>
\t\t<brokerCompanyAddress>${params.brokerCompanyAddress + "\n" + params.brokerCompanyCity + "," + params.brokerCompanyState + " " + params.brokerCompanyZip}</brokerCompanyAddress>
\t\t<insured>${params.insured}</insured>
\t\t<insuredAddress>${params.insuredAddress}</insuredAddress>
\t\t<agentName>${params.contactName}</agentName>
\t\t<agentPhone>${params.contactPhone}</agentPhone>
\t\t<agentFax>${params.contactFax}</agentFax>
\t\t<agentEmail>${params.contactEmail}</agentEmail>
\t\t<insuranceCompanyName>${XmlUtil.escapeXml(params.insurer)}</insuranceCompanyName>
\t\t<NAIC>${params.NAIC}</NAIC>
\t\t<certificateNumber>${params.certificateNumber}</certificateNumber>
\t\t<revisionNumber>${params.revisionNumber}</revisionNumber>
\t\t<submissionID>${params.otherPolicyNumber + "\n" + params.generalPolicyNumber + "\n" + params.autoPolicyNumber}</submissionID>
\t\t<broker>${params['contactName']}</broker>

\t\t<insrltrGen>${params.insrltrGen}</insrltrGen>
\t\t<cbGenCommercialGeneralLiability>${params.cbGenCommercialGeneralLiability}</cbGenCommercialGeneralLiability>
\t\t<cbGenClaimsMade>${params.cbGenClaimsMade}</cbGenClaimsMade>
\t\t<cbGenOccur>${params.cbGenOccur}</cbGenOccur>
\t\t<cbGenPolicy>${params.cbGenPolicy}</cbGenPolicy>
\t\t<cbGenProject>${params.cbGenProject}</cbGenProject>
\t\t<cbGenLoc>${params.cbGenLoc}</cbGenLoc>
\t\t<genAddl>${params.genAddl}</genAddl>
\t\t<genSubr>${params.genSubr}</genSubr>
\t\t<generalPolicyNumber>${params.generalPolicyNumber}</generalPolicyNumber>
\t\t<genStart>${params.genStart}</genStart>
\t\t<genEnd>${params.genEnd}</genEnd>
\t\t<genEachLimit>${params.genEachLimit}</genEachLimit>
\t\t<genFireLimit>${params.genFireLimit}</genFireLimit>
\t\t<genMedLimit>${params.genMedLimit}</genMedLimit>
\t\t<genPersonalLimit>${params.genPersonalLimit}</genPersonalLimit>
\t\t<genAggregateLimit>${params.genAggregateLimit}</genAggregateLimit>
\t\t<genProductsLimit>${params.genProductsLimit}</genProductsLimit>

\t\t<insrltrAuto>${params.insrltrAuto}</insrltrAuto>
\t\t<cbAutoAny>${params.cbAutoAny}</cbAutoAny>
\t\t<cbAutoAllOwned>${params.cbAutoAllOwned}</cbAutoAllOwned>
\t\t<cbAutoHiredAuto>${params.cbAutoHiredAuto}</cbAutoHiredAuto>
\t\t<cbAutoPhysicalDamages>${params.cbAutoPhysicalDamages}</cbAutoPhysicalDamages>
\t\t<cbAutoScheduledAuto>${params.cbAutoScheduledAuto}</cbAutoScheduledAuto>
\t\t<cbAutoNonOwnedAuto>${params.cbAutoNonOwnedAuto}</cbAutoNonOwnedAuto>
\t\t<autoAddl>${params.autoAddl}</autoAddl>
\t\t<autoSubr>${params.autoSubr}</autoSubr>
\t\t<autoPolicyNumber>${params.autoPolicyNumber}</autoPolicyNumber>
\t\t<autoStart>${params.autoStart}</autoStart>
\t\t<autoEnd>${params.autoEnd}</autoEnd>
\t\t<autoCombinedSingleLimit>${params.autoCombinedSingleLimit}</autoCombinedSingleLimit>
\t\t<autoBodilyInjuryPersonLimit>${params.autoBodilyInjuryPersonLimit}</autoBodilyInjuryPersonLimit>
\t\t<autoBodilyInjuryAccidentLimit>${params.autoBodilyInjuryAccidentLimit}</autoBodilyInjuryAccidentLimit>
\t\t<autoPropertyDamageLimit>${params.autoPropertyDamageLimit}</autoPropertyDamageLimit>

\t\t<insrltrUmbrella></insrltrUmbrella>
\t\t<cbUmbrellaLiab></cbUmbrellaLiab>
\t\t<cbUmbrellaExcessLiab></cbUmbrellaExcessLiab>
\t\t<cbUmbrellaDeductible></cbUmbrellaDeductible>
\t\t<cbUmbrellaRetention></cbUmbrellaRetention>
\t\t<cbUmbrellaOccur></cbUmbrellaOccur>
\t\t<cbUmbrellaClaimsMade></cbUmbrellaClaimsMade>
\t\t<umbrellaRetentionLimit></umbrellaRetentionLimit>
\t\t<umbrellaAddl></umbrellaAddl>
\t\t<umbrellaSubr></umbrellaSubr>
\t\t<umbrellaPolicyNumber></umbrellaPolicyNumber>
\t\t<umbrellaStart></umbrellaStart>
\t\t<umbrellaEnd></umbrellaEnd>
\t\t<umbrellaEachOccurrenceLimit></umbrellaEachOccurrenceLimit>
\t\t<umbrellaAggregateLimit></umbrellaAggregateLimit>

\t\t<insrltrWorkersComp></insrltrWorkersComp>
\t\t<cbWorkerCompMemberExcluded></cbWorkerCompMemberExcluded>
\t\t<workersCompDescriptionNH></workersCompDescriptionNH>
\t\t<workersCompSubr></workersCompSubr>
\t\t<workersCompPolicyNumber></workersCompPolicyNumber>
\t\t<workersCompStart></workersCompStart>
\t\t<workersCompEnd></workersCompEnd>
\t\t<cbWorkersCompStatutoryLimits></cbWorkersCompStatutoryLimits>
\t\t<cbWorkersCompOther></cbWorkersCompOther>
\t\t<workersCompEachAccidentLimit></workersCompEachAccidentLimit>
\t\t<workersCompDiseaseEmployeeLimit></workersCompDiseaseEmployeeLimit>
\t\t<workersCompDiseasePolicyLimit></workersCompDiseasePolicyLimit>

\t\t<insrltrOther>${params.insrltrOther}</insrltrOther>
\t\t<riskType>${params.riskType}</riskType>
\t\t<otherAddl>${params.otherAddl}</otherAddl>
\t\t<otherSubr>${params.otherSubr}</otherSubr>
\t\t<otherPolicyNumber>${params.otherPolicyNumber}</otherPolicyNumber>
\t\t<otherStart>${params.otherStart}</otherStart>
\t\t<otherEnd>${params.otherEnd}</otherEnd>
\t\t<otherLimit>${params.otherLimit}</otherLimit>

\t\t<additionalRemarks>${params.additionalRemarks}</additionalRemarks>
\t\t<certificateHolder>${params.certificateHolder}</certificateHolder>
\t\t
\t\t<nameOfOrganization>${params.certificateHolder}</nameOfOrganization>
\t\t<nameOfOrganizationInformation>${params.additionalRemarks}</nameOfOrganizationInformation>
\t</certificate>"""

        if (params.ai == "true") {
            soapXML = soapXML + """    
\t<aOneForm>
\t\t<policyNumber>${params.submissionPolicyID}</policyNumber>
\t</aOneForm>"""
        }


        if (params.getAt("epkgLOB").length() > 1) {

            ////CPK GENERAL LIABILITY TABLE
            if (params.getAt("cpkLOB").length() > 1) {
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Commercial Package - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                params.getAt("cpkLOB").split(";&&;").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t\t<coverage coveragePackage="${XmlUtil.escapeXml(it.split(";&;")[0])}">
\t\t\t\t<coverageLimit> ${it.split(";&;")[1]} </coverageLimit>
\t\t\t\t<coverageDeductible> ${it.split(";&;").size() >= 3 ? it.split(";&;")[2] : ""} </coverageDeductible>
\t\t\t</coverage>"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            ////CGL GENERAL LIABILITY TABLE
            if (params.getAt("cglLOB").length() > 1) {
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Commercial General Liability - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                params.getAt("cglLOB").split(";&&;").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t\t<coverage coveragePackage="${XmlUtil.escapeXml(it.split(";&;")[0])}">
\t\t\t\t<coverageLimit> ${it.split(";&;")[1]} </coverageLimit>
\t\t\t\t<coverageDeductible> ${it.split(";&;").size() >= 3 ? it.split(";&;")[2] : ""} </coverageDeductible>
\t\t\t</coverage>"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            ////EPKG TABLE
            if (params.getAt("epkgLOB").length() > 1) {
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Entertainment Package - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                params.getAt("epkgLOB").split(";&&;").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t\t<coverage coveragePackage="${XmlUtil.escapeXml(it.split(";&;")[0])}">
\t\t\t\t<coverageLimit> ${it.split(";&;")[1]} </coverageLimit>
\t\t\t\t<coverageDeductible> ${it.split(";&;").size() >= 3 ? it.split(";&;")[2] : ""} </coverageDeductible>
\t\t\t</coverage>"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
        }

        soapXML = soapXML + """

</application>]]></int:Data>
\t\t\t\t</int:ProvidedData>
\t\t\t</int:providedData>
\t\t\t<int:options>
\t\t\t\t<int:ReturnDocuments>true</int:ReturnDocuments>
\t\t\t\t<int:RunProviders>1</int:RunProviders>
\t\t\t\t<int:LogGeneration>true</int:LogGeneration>
\t\t\t</int:options>
\t\t</int:GenerateWithData>
    </x:Body>
</x:Envelope>"""

        log.info soapXML

        def client = new SOAPClient('http://138.91.159.55/Produce/Service/GenerateDoc.asmx?WSDL')
        client.authorization = new HTTPBasicAuthorization("admin", "admin")
        def response = client.send(SOAPAction: 'http://services.dpm.com.au/intelledox/GenerateWithData', soapXML)

//        log.info response.text

        log.info response.text.substring(0, 1000)
        def fileName = "Certificate-" + params.insured + ".pdf"

        def a = new XmlSlurper().parseText(response.text)
        def nodeToSerialize = a."**".find { it.name() == 'BinaryFile' }
        def pdfBinaryFile = nodeToSerialize.text();

//        def quoteID = it.split(";")[0]
        def tempFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp")
        def folderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/${params.quoteID}")
        log.info folderPath

        fileHelper.saveBinaryFileToLocalPath(pdfBinaryFile, tempFolderPath, fileName);

        fileName = fileHelper.ftpFileToAIM(fileName, tempFolderPath, params.quoteID, dataSource_aim);

        fileHelper.saveBinaryFileToLocalPath(pdfBinaryFile, folderPath, fileName);





        return folderPath + "/" + fileName;
    }

    def createSL2FormPDF(jsonSerial, uwQuestionsMap, uwQuestionsOrder, dataSource_aim) {
        log.info "INTELLEDOX"
        log.info "JSON ==== " + jsonSerial
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
\t\t<nameOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt("nameOfProductionCompany"))}</nameOfInsured>
\t\t<addressOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('streetNameMailing'))}</addressOfInsured>
\t\t<addressCityOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('cityMailing'))}</addressCityOfInsured>
\t\t<addressZipOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('zipCodeMailing'))}</addressZipOfInsured>
\t\t<riskDescription>${XmlUtil.escapeXml(jsonSerial.getAt("riskCategory"))}, ${
                XmlUtil.escapeXml(jsonSerial.getAt("riskChosen"))
            }</riskDescription>
\t\t<locationOfRiskAddress>${XmlUtil.escapeXml(jsonSerial.getAt("filmingLocation"))}</locationOfRiskAddress>
\t\t<insuranceCoverage>${coverages}</insuranceCoverage>
\t\t<RiskPurchasingGroupName></RiskPurchasingGroupName>
\t\t<RiskPurchasingGroupAddress></RiskPurchasingGroupAddress>
\t\t<nameOtherAgent></nameOtherAgent>
\t\t<date>${timestamp}</date>
\t\t<dateStart>${XmlUtil.escapeXml(jsonSerial.getAt('proposedEffectiveDate'))}</dateStart>
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

//            throw new IOException()
            log.info("NEW FOLDER QUOTE = " + jsonSerial.getAt("allQuoteIDs"))
//        def quoteID = jsonSerial.getAt("allQuoteIDs").split(",")[0].split(";")[0]

            jsonSerial.getAt("allQuoteIDs").split(",").each {
                def quoteID = it.split(";")[0]
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

    def createBindingPDF(jsonSerial, uwQuestionsMap, uwQuestionsOrder, dataSource_aim) {
        log.info "INTELLEDOX"
        log.info "JSON ==== " + jsonSerial

        FileTransferHelper fileHelper = new FileTransferHelper();



        def soapXML = """<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>afa418e4-ccea-403d-8eb6-b822ee2943d2</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>83931a73-1d33-4a70-b942-ea92d5aee282</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<binding>
\t\t<date>${jsonSerial.getAt("dateAdded").substring(1, jsonSerial.getAt("dateAdded").length() - 1).split(" ")[0]}</date>
\t\t<startDate>${jsonSerial.getAt("proposedEffectiveDate")} </startDate>
\t\t<effectiveDate>${jsonSerial.getAt("proposedEffectiveDate")} - ${jsonSerial.getAt("proposedExpirationDate")} </effectiveDate>
\t\t<endDate>${jsonSerial.getAt("proposedExpirationDate")}</endDate>
\t\t<broker>${jsonSerial.getAt("brokerFirstName")} ${jsonSerial.getAt("brokerLastName")}</broker>
\t\t<insured>${XmlUtil.escapeXml(jsonSerial.getAt('namedInsured'))}</insured>
\t\t<insuredStreet>${jsonSerial.getAt("streetNameMailing")}</insuredStreet>
\t\t<insuredCity>${jsonSerial.getAt("cityMailing")}</insuredCity>
\t\t<insuredState>${jsonSerial.getAt("stateMailing")}</insuredState>
\t\t<insuredZip>${jsonSerial.getAt("zipCodeMailing")}</insuredZip>
\t\t<coverageType>${coverages}</coverageType>
\t\t<emailBody>We are pleased to enclose the attached Insurance Binder as per your Binding Instructions. We will forward the insurance policy as soon as received from the carrier. 
 
Please note that premium is due within 20 days from the effective date of this binder regardless of when the policy is issued. 
 
Thank you for your order.  We appreciate your business. 
 
Should you have any questions, please do not hesitate to call. 
 
</emailBody>
\t\t<insurer>${jsonSerial.getAt("insuranceCompany")}</insurer>
\t\t<fees></fees>
\t\t<policyNumber></policyNumber>
\t\t<premium></premium>
\t\t<producer>${brokerCompanyName}</producer>
\t\t<referenceNumber></referenceNumber>
\t\t<term></term>
\t\t<total></total>
\t\t<triaPremium></triaPremium>
\t\t<underwriter>Shauna DeBolt</underwriter>
\t\t<underwriterEmail>shauna@neeis.com</underwriterEmail>
\t\t<underwriterTitle>Vice-President, Underwriting Manager </underwriterTitle>
\t\t<underwriterPhoneNumber>3102653803</underwriterPhoneNumber>
\t\t<coverage>${coverages}</coverage>
\t</binding>
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

//    log.info soapXML
//
//    def client = new SOAPClient('http://138.91.159.55/Produce/Service/GenerateDoc.asmx?WSDL')
//    client.authorization = new HTTPBasicAuthorization("admin", "admin")
//    def response = client.send(SOAPAction:'http://services.dpm.com.au/intelledox/GenerateWithData', soapXML)
//
//    log.info response.text
//    def fileName = "Indication A.pdf"
//
//    def a = new XmlSlurper().parseText(response.text)
//    def nodeToSerialize = a."**".find {it.name() == 'BinaryFile'}
//    def pdfBinaryFile = nodeToSerialize.text();
//
//    log.info("NEW FOLDER QUOTE = " + jsonSerial.getAt("allQuoteIDs"))
////        def quoteID = jsonSerial.getAt("allQuoteIDs").split(",")[0].split(";")[0]
//
//    jsonSerial.getAt("allQuoteIDs").split(",").each {
//        def quoteID = it.split(";")[0]
//        def folderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/${quoteID}/")
//        log.info folderPath
//
//        fileHelper.saveBinaryFileToLocalPath(pdfBinaryFile, folderPath, fileName);
//
//        fileHelper.ftpFileToAIM(fileName, folderPath, quoteID, dataSource_aim);
//    }


        return "good"
    }


    def createEmergencyIndicationPDF(dataSource_aim) {
        log.info "INTELLEDOX Emergency Indication"
        def allQuoteIDs = "0000000"
        try {
            def indicationDateFormat = 'MM/dd/yyyy'
            def now = new Date()
            def timeZone = TimeZone.getTimeZone('PST')


            FileTransferHelper fileHelper = new FileTransferHelper();



            def soapXML = """
<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>a2962264-75d3-42a6-9a48-389a7cb59520</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>ab704e33-cf56-4406-9fc3-2b10f1de1a04</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<basicInfo>
\t\t<logo>c:\\IntelledoxLogo\\Barbican.png</logo>
\t\t<nameOfInsured>FEUD &amp; Twentieth Century Fox Film Entertainment &amp; 21st Century Fox Subsidiaries &amp; Divisions</nameOfInsured>
\t\t<brokerCompanyName>Highly Protected Risk (HPR) Insurance Services</brokerCompanyName>
\t\t<brokerCompanyAddress>1000 Potomac Street NW  Suite 5000</brokerCompanyAddress>
\t\t<brokerCompanyAddressCity>Washington</brokerCompanyAddressCity>
\t\t<brokerCompanyAddressState>,DC</brokerCompanyAddressState>
\t\t<brokerCompanyAddressZip>20007</brokerCompanyAddressZip>
\t\t<brokerCompanyPhone>(202) 567-7636</brokerCompanyPhone>
\t\t<agentName>David Combes</agentName>
\t\t<agentLicenseNumber></agentLicenseNumber>
\t\t<agentEmail>david@davidkcombes.com</agentEmail>
\t\t<agentPhone>2025677636</agentPhone>
\t\t<date>05/17/2017</date>
\t\t<dateStart>null</dateStart>
\t\t<submission>0624886</submission>
\t\t<underwriter>Jason DeBolt</underwriter>
\t\t<underwriterPhone>(310) 265-3804</underwriterPhone>
\t\t<underwriterFax>(310) 265-3805</underwriterFax>
\t\t<underwriterEmail>jason@neeis.com</underwriterEmail>
\t\t<total>Total:</total>
\t\t<totalCost>\$319,201.80</totalCost>
\t\t<addressOfInsured>10201 West Pico Blvd</addressOfInsured>
\t\t<addressCityOfInsured>Los Angeles</addressCityOfInsured>
\t\t<addressZipOfInsured>90036</addressZipOfInsured>
\t\t<riskDescription>null, null</riskDescription>
\t\t<locationOfRiskAddress>Blank</locationOfRiskAddress>
\t\t<insuranceCoverage>CPK EPKG </insuranceCoverage>
\t\t<cbGDY>cb</cbGDY>
\t\t<cbGDN>cb</cbGDN>
\t\t<cbCAARPY>cb</cbCAARPY>
\t\t<cbCAARPN>cb</cbCAARPN>
\t\t<cbCAARPIneligibleY>cb</cbCAARPIneligibleY>
\t\t<cbCAARPIneligibleN>cb</cbCAARPIneligibleN>
\t\t<cbHealthY>cb</cbHealthY>
\t\t<cbHealthN>cb</cbHealthN>
\t\t<RiskPurchasingGroupName></RiskPurchasingGroupName>
\t\t<RiskPurchasingGroupAddress></RiskPurchasingGroupAddress>
\t\t<nameOtherAgent></nameOtherAgent>
\t\t<insuranceCompany>Lloyd&apos;s of London / Barbican Syndicate 1955</insuranceCompany>
\t</basicInfo>

\t<namedInsuredTable>
\t\t<namedInsuredHeader>Named Insured</namedInsuredHeader>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="FEUD &amp; Twentieth Century Fox Film Entertainment &amp; 21st Century Fox Subsidiaries &amp; Divisions"></nameInsured>
\t\t\t<nameInsuredColTwo>Contact: Twentieth Century Fox</nameInsuredColTwo>
\t\t</namedInsuredRow>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="10201 West Pico Blvd"></nameInsured>
\t\t\t<nameInsuredColTwo>Email: david@davidkcombes.com</nameInsuredColTwo>
\t\t</namedInsuredRow>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="Los Angeles, CA 90036"></nameInsured>
\t\t\t<nameInsuredColTwo>Phone: (202) 567-7636</nameInsuredColTwo>
\t\t</namedInsuredRow>
\t</namedInsuredTable>

\t<insuranceCompanyTable>
\t\t<insuranceCompanyHeader>Insurance Company</insuranceCompanyHeader>
\t\t<insuranceCompanyRow>
\t\t\t<insuranceCompany insuranceCompanyColOne="Lloyd&apos;s of London / Barbican Syndicate 1955"></insuranceCompany>
\t\t</insuranceCompanyRow>
\t</insuranceCompanyTable>

\t<policyTermTable>
\t\t<policyTermHeader>Policy Term</policyTermHeader>
\t\t<policyTermRow>
\t\t\t<policyTerm policyTermColOne="Policy Term: 365 Days"></policyTerm>
\t\t</policyTermRow>
\t\t<policyTermRow>
\t\t\t<policyTerm policyTermColOne="Proposed Effective: 06/30/2017 - 06/30/2018"></policyTerm>
\t\t</policyTermRow>
\t</policyTermTable>

\t<premiumSummaryTable>
\t\t<premiumSummaryHeader>Premium Summary</premiumSummaryHeader>
\t\t<premiumSummaryRow>
\t\t<premiumSummary premiumSummaryPackage="   Entertainment Package">
\t\t\t<premiumSummaryCost>\$297,250 </premiumSummaryCost>
\t\t</premiumSummary>
\t\t<premiumSummary premiumSummaryPackage="   Commercial Package">
\t\t\t<premiumSummaryCost>\$12,025 </premiumSummaryCost>
\t\t</premiumSummary>
\t\t<premiumSummary premiumSummaryPackage="Taxes and Fees">
\t\t\t<premiumSummaryCost>  </premiumSummaryCost>
\t\t</premiumSummary>
\t\t<premiumSummary premiumSummaryPackage="   Surplus Lines Tax(0.03)">
\t\t\t<premiumSummaryCost>\$9,278.25 </premiumSummaryCost>
\t\t</premiumSummary>
\t\t<premiumSummary premiumSummaryPackage="   Stamping Office Fee(0.002)">
\t\t\t<premiumSummaryCost>\$618.55 </premiumSummaryCost>
\t\t</premiumSummary>
\t\t<premiumSummary premiumSummaryPackage="   Policy Fee">
\t\t\t<premiumSummaryCost>\$30.00 </premiumSummaryCost>
\t\t</premiumSummary>
\t\t</premiumSummaryRow>
\t</premiumSummaryTable>
\t<coverageTable>
\t\t<coverageHeader>Commercial Package - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>
\t\t<coverage coveragePackage="Each Occurrence ">
\t\t\t<coverageLimit> \$1,000,000  </coverageLimit>
\t\t\t<coverageDeductible> Nil </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="General Aggregate Limit ">
\t\t\t<coverageLimit> \$2,000,000  </coverageLimit>
\t\t\t<coverageDeductible> Nil </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Products &amp; Completed Operations ">
\t\t\t<coverageLimit> \$1,000,000  </coverageLimit>
\t\t\t<coverageDeductible> Nil </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Personal &amp; Advertising Injury ">
\t\t\t<coverageLimit> \$1,000,000  </coverageLimit>
\t\t\t<coverageDeductible> Nil </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Fire Damage (Any One Fire) ">
\t\t\t<coverageLimit> \$100,000  </coverageLimit>
\t\t\t<coverageDeductible> Nil </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Medical Payments (Per Person) ">
\t\t\t<coverageLimit> \$5,000  </coverageLimit>
\t\t\t<coverageDeductible> Nil </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Increased Agg Limit ">
\t\t\t<coverageLimit> Included  </coverageLimit>
\t\t\t<coverageDeductible>  </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Blanket Additional Insured Endorsement ">
\t\t\t<coverageLimit> Included  </coverageLimit>
\t\t\t<coverageDeductible>  </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Non-Owned &amp; Hired Auto Liability ">
\t\t\t<coverageLimit> \$1,000,000  </coverageLimit>
\t\t\t<coverageDeductible> Nil </coverageDeductible>
\t\t</coverage>

\t\t</coverageRow>
\t</coverageTable>
\t<coverageTable>
\t\t<coverageHeader>Entertainment Package - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>
\t\t<coverage coveragePackage="Cast Insurance (Up to 10) ">
\t\t\t<coverageLimit> \$29,700,000  </coverageLimit>
\t\t\t<coverageDeductible> \$25,000 </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Negative Film &amp; Videotape ">
\t\t\t<coverageLimit> \$29,700,000  </coverageLimit>
\t\t\t<coverageDeductible> \$5,000 </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Faulty Stock &amp; Camera Processing ">
\t\t\t<coverageLimit> \$29,700,000  </coverageLimit>
\t\t\t<coverageDeductible> \$5,000 </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Miscellaneous Rented Equipment ">
\t\t\t<coverageLimit> \$1,000,000  </coverageLimit>
\t\t\t<coverageDeductible> \$3,500 </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Non-Owned Auto Physical Damage ">
\t\t\t<coverageLimit> Included Under Misc. Rented Equip.  </coverageLimit>
\t\t\t<coverageDeductible> 10% of Loss (\$1,500 Min / \$10,000) </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Extra Expense ">
\t\t\t<coverageLimit> \$1,000,000  </coverageLimit>
\t\t\t<coverageDeductible> \$3,500 </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Props, Sets &amp; Wardrobe ">
\t\t\t<coverageLimit> \$1,000,000  </coverageLimit>
\t\t\t<coverageDeductible> \$2,500 </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Third Party Prop Damage Liab ">
\t\t\t<coverageLimit> \$1,000,000  </coverageLimit>
\t\t\t<coverageDeductible> \$2,500 </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Office Contents ">
\t\t\t<coverageLimit> \$50,000  </coverageLimit>
\t\t\t<coverageDeductible> \$1,000 </coverageDeductible>
\t\t</coverage>

\t\t<coverage coveragePackage="Civil Authority (US Only) ">
\t\t\t<coverageLimit> \$100,000  </coverageLimit>
\t\t\t<coverageDeductible> \$7,000 </coverageDeductible>
\t\t</coverage>

\t\t</coverageRow>
\t</coverageTable>
\t<termsTable>
\t\t<termHeader>Terms</termHeader>
\t\t<term>
\t\t\t<terms>THIS INSURANCE IS UNDERWRITTEN BY UNDERWRITERS AT LLOYD&apos;S OF LONDON, REF. No. B1333ECB150004, 100% BARBICAN SYNDICATE 1955.

SUBJECTIVITY TO BIND:
\t- Signed Surplus Lines Forms as per State Requirements
\t- Signed TRIA Rejection Form.

NOTE: Proposal descriptions are for summary purposes only. For a detailed description of the terms of the policy, please refer to the policy forms. Specimens of all of the below policy forms and endorsements are attached. Please note that this Quote contains only a general description of coverage provided.

Proposed Insured must be domiciled in the United States of America

 </terms>
\t\t</term>
\t</termsTable>
\t<policyFormEndorsementTable>
\t\t<policyFormEndorsementTitle>Policy Form / Endorsement</policyFormEndorsementTitle>
\t</policyFormEndorsementTable>

\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>EPKG - EPKG37</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="SLC3 USA NMA2868">
\t\t\t\t\t\t<policyFormEndorsementName>Form Approved by Lloyds Market Association</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="NE 04 14">
\t\t\t\t\t\t<policyFormEndorsementName>Film Package Policy</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="LMA 5020">
\t\t\t\t\t\t<policyFormEndorsementName>Service of Suit Clause (U.S.A.)</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="LMA 5021">
\t\t\t\t\t\t<policyFormEndorsementName>Applicable Law (U.S.A.)</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="NMA 2918">
\t\t\t\t\t\t<policyFormEndorsementName>War and Terrorism Exclusion Endorsement</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="NMA 2340">
\t\t\t\t\t\t<policyFormEndorsementName>Seepage and/or Pollutants and/or Contamination Exclusion Clause</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="LMA 5091">
\t\t\t\t\t\t<policyFormEndorsementName>U.S. Terrorism Risk Insurance Act of 2002 New and Renewal</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="LMA 5092">
\t\t\t\t\t\t<policyFormEndorsementName>U.S. Terrorism Risk Insurance Act of 2002 Not Purchased Clause, but only where the Insured elects not to purchase terrorism coverage in accordance with TRIA.</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="LMA 5209">
\t\t\t\t\t\t<policyFormEndorsementName>Direct Binding Authority Endorsement </policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="LSW 1001">
\t\t\t\t\t\t<policyFormEndorsementName>Several Liability Notice</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="LSW 1135B">
\t\t\t\t\t\t<policyFormEndorsementName>Lloyd&apos;s Privacy Policy Statement</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="LSW1146D">
\t\t\t\t\t\t<policyFormEndorsementName>California Mandatory Disclosure Statement</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="Applicable State Specific Surplus Lines Notices and Disclosures - ">
\t\t\t\t\t\t<policyFormEndorsementName></policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t</policyFormEndorsementRow>
\t</policyFormEndorsementHeaders>

\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>CPK - BARCPKGC</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="NE CM 0000 11 14">
\t\t\t\t\t\t<policyFormEndorsementName>Commercial General Liability Declarations</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="SLC-3(USA) NMA2868 (24/08/00)">
\t\t\t\t\t\t<policyFormEndorsementName>Lloyds Certificate</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG DS 01 10 01">
\t\t\t\t\t\t<policyFormEndorsementName>Commercial General Liability Declarations</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 00 01 04 13">
\t\t\t\t\t\t<policyFormEndorsementName>Commercial General Liability Coverage Form</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 21 44 07 98">
\t\t\t\t\t\t<policyFormEndorsementName>Limitation of Coverage to Designated Premises or Project</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG E02 AS 08 04">
\t\t\t\t\t\t<policyFormEndorsementName>Exclusions and Limitations Personal Injury and Advertising Injury</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG E01 AS 08 04">
\t\t\t\t\t\t<policyFormEndorsementName>Additional Exclusions, Limitations &amp;amp; Amendments</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="GL 0030 0610">
\t\t\t\t\t\t<policyFormEndorsementName>Exclusion-Fireworks with Exception for Concussion Effects, Flashpots and Smokepots</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="GL 0035 0610">
\t\t\t\t\t\t<policyFormEndorsementName>Exclusion-Personal and Advertising Injury Liability-Entertainment Industry</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="GL 0038 0610">
\t\t\t\t\t\t<policyFormEndorsementName>Exclusion-Sport, Athletic, Event, Exhibition or Performance Participants</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 21 47 12 07">
\t\t\t\t\t\t<policyFormEndorsementName>Employment-Related Practices Exclusion</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 00 68 05 09)">
\t\t\t\t\t\t<policyFormEndorsementName>Recording and Distribution of Material or Information in Violation of Law Exclusion</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG E42 AS 08 04">
\t\t\t\t\t\t<policyFormEndorsementName>Exclusion-Feature Films for Theatrical Release</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 21 46 07 98">
\t\t\t\t\t\t<policyFormEndorsementName>Abuse or Molestation Exclusion</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG E26 AS 08 04">
\t\t\t\t\t\t<policyFormEndorsementName>Knowledge-Notice of Occurrence</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG E31 AS 08 03">
\t\t\t\t\t\t<policyFormEndorsementName>Unintentional Errors &amp;amp; Omissions</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG E24 AS 08 04">
\t\t\t\t\t\t<policyFormEndorsementName>Liberalization Clause</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="GL 0041 0610">
\t\t\t\t\t\t<policyFormEndorsementName>Knowledge of Occurrence</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="GL 0019 0610">
\t\t\t\t\t\t<policyFormEndorsementName>Cross Liability Exclusion</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="GL 0008 0610">
\t\t\t\t\t\t<policyFormEndorsementName>Amendment of Employee Definition (Temporary Employee)</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="GL 0042 0610">
\t\t\t\t\t\t<policyFormEndorsementName>Limitation-No Stacking of Occurrence Limits of Insurance</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="GL 0001 0610">
\t\t\t\t\t\t<policyFormEndorsementName>Absolute Asbestos Exclusion</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="GL 0002 0610">
\t\t\t\t\t\t<policyFormEndorsementName>Absolute Lead Exclusion</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 21 67 12 04">
\t\t\t\t\t\t<policyFormEndorsementName>Fungi or Bacteria Exclusion</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 21 76 01 08">
\t\t\t\t\t\t<policyFormEndorsementName>Exclusion of Punitive Damages Related to a Certified Act of Terrorism</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 21 96 03 05">
\t\t\t\t\t\t<policyFormEndorsementName>Silica or Silica-Related Dust Exclusion</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 21 49 09 99">
\t\t\t\t\t\t<policyFormEndorsementName>Total Pollution Exclusion Endorsement</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 21 75 06 08">
\t\t\t\t\t\t<policyFormEndorsementName>Exclusion of Certified Acts of Terrorism</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CG 32 34 01 05">
\t\t\t\t\t\t<policyFormEndorsementName>California Changes</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="AI CD 71 OB 04">
\t\t\t\t\t\t<policyFormEndorsementName>Business Auto Coverage Form Declarations</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CA E02 AS 01 07">
\t\t\t\t\t\t<policyFormEndorsementName>Business Auto Coverage Form</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CA 00 01 03 10">
\t\t\t\t\t\t<policyFormEndorsementName>Business Auto Coverage Form</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CA 20 54 10 01">
\t\t\t\t\t\t<policyFormEndorsementName>Employee Hired Autos</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="AU 0011 0910">
\t\t\t\t\t\t<policyFormEndorsementName>Explanation of Premium Basis</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="AU 0013 0910">
\t\t\t\t\t\t<policyFormEndorsementName>Mexico Endorsement</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="AU 0017 0910">
\t\t\t\t\t\t<policyFormEndorsementName>Who is an Insured Amended</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CA 23 84 01 06">
\t\t\t\t\t\t<policyFormEndorsementName>Exclusion of Terrorism</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CA 01 43 05 07">
\t\t\t\t\t\t<policyFormEndorsementName>California Changes</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="IL 02 70 08 11">
\t\t\t\t\t\t<policyFormEndorsementName>California Changes-Cancellation and NonRenewal</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CL 0100 03 99">
\t\t\t\t\t\t<policyFormEndorsementName>Common Policy Conditions</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="CL 0700 10 06">
\t\t\t\t\t\t<policyFormEndorsementName>Virus or Bacteria Exclusion</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="IL 00 17 11 98">
\t\t\t\t\t\t<policyFormEndorsementName>Common Policy Conditions</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="IL 00 21 09 08">
\t\t\t\t\t\t<policyFormEndorsementName>Nuclear Energy Liability Exclusion Endorsement</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="LMA5091 12 07">
\t\t\t\t\t\t<policyFormEndorsementName>US Terrorism Risk Insurance Act of 2002 Amended</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t\t<policyFormEndorsement policyFormEndorsementCode="D-1(Eff July 21, 2011)">
\t\t\t\t\t\t<policyFormEndorsementName>Notice Disclosure to Insured</policyFormEndorsementName>
\t\t\t\t</policyFormEndorsement>

\t\t\t</policyFormEndorsementRow>
\t</policyFormEndorsementHeaders>

\t<notesTable>
\t\t<notesHeader>Underwriting Questions</notesHeader>
\t\t<notesRow>

\t\t\t<notes notesQuestion="Name Of Production Company">
\t\t\t\t<notesAnswer>FEUD &amp; Twentieth Century Fox Film Entertainment &amp; 21st Century Fox Subsidiaries &amp; Divisions</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Title of Production">
\t\t\t\t<notesAnswer>FEUD - Season 2</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Name of Principals">
\t\t\t\t<notesAnswer>Twentieth Century Fox</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Years Experience">
\t\t\t\t<notesAnswer>30</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Prior Losses">
\t\t\t\t<notesAnswer>None</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Maximum Cost of Any One Production">
\t\t\t\t<notesAnswer>\$2,970,000</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Type of Production">
\t\t\t\t<notesAnswer>TV Series</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Number of Episodes">
\t\t\t\t<notesAnswer>10</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Special Hazards Declared">
\t\t\t\t<notesAnswer>None</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Do you do post production or special effects for others?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Are you involved in film distribution?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Has your insurance have ever been cancelled or declined?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Misc Equipment Coverage Requested?">
\t\t\t\t<notesAnswer>Yes</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Misc Equipment Owned or Rented?">
\t\t\t\t<notesAnswer>Rented</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="What Equipment Limit is Requested?">
\t\t\t\t<notesAnswer>\$1,000,000</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Provide Equipment Schedule if any one item exceeds \$10,000 in value">
\t\t\t\t<notesAnswer>To Follow</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Where is equipment kept when not in use?">
\t\t\t\t<notesAnswer>20th Century Fox Studios</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Security Measures against theft, loss, and damage">
\t\t\t\t<notesAnswer>20th Century Fox Security</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Method of Inventory">
\t\t\t\t<notesAnswer>Standard Company Procedures</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Is Foreign GL, Hired Auto and Workers Comp Required?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Do you require Film Producer Error and Omissions Liability? If yes, what limits? Please complete online application and submit for quoting">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Producer">
\t\t\t\t<notesAnswer>Jon Robin Baitz</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Director">
\t\t\t\t<notesAnswer>DeDe Gardner</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Source of Financing">
\t\t\t\t<notesAnswer>Twentieth Century Fox</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Completion Bond Required?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Filming Location (1)">
\t\t\t\t<notesAnswer>Los Angeles</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Start Date (1)">
\t\t\t\t<notesAnswer>06/30/2017</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="End Date (1)">
\t\t\t\t<notesAnswer>08/30/2017</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Story / Synopsis">
\t\t\t\t<notesAnswer>Rivalry between Bette Davis &amp; Joan Crawford, exploring how these 2 women endured sexism, ageism, misogyny while struggling to hang on to fame in their twilight years.</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Number of Cast Members">
\t\t\t\t<notesAnswer>Matthew Broderick,,
Sarah Paulson,,
Jessica Lange,,
Jackie Hoffman,,
Kate Bates,,
Dominic Burges,,
Joel Kelley Dauten,,
Alfred Molina,,
Catherine Zeta-Jones,,
Joel Kelly-Dauten,,
</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Total Above-The-Line">
\t\t\t\t<notesAnswer>To Follow</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Total Below-The-Line">
\t\t\t\t<notesAnswer>To Follow</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Total Post Production Cost">
\t\t\t\t<notesAnswer>To Follow</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Will Payroll Service Co provide primary Work Comp Coverage?">
\t\t\t\t<notesAnswer>Yes</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Physical Street Address">
\t\t\t\t<notesAnswer>10201 West Pico Blvd</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Physical City">
\t\t\t\t<notesAnswer>Los Angeles</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Physical Zipcode">
\t\t\t\t<notesAnswer>90036</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Business Structure">
\t\t\t\t<notesAnswer>Corporation</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="FEIN/SSN">
\t\t\t\t<notesAnswer>26-0075658</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="SIC">
\t\t\t\t<notesAnswer>7812</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="NAIC">
\t\t\t\t<notesAnswer>512110</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Name Of Production Company">
\t\t\t\t<notesAnswer>FEUD &amp; Twentieth Century Fox Film Entertainment &amp; 21st Century Fox Subsidiaries &amp; Divisions</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Title of Production">
\t\t\t\t<notesAnswer>FEUD - Season 2</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Name of Principals">
\t\t\t\t<notesAnswer>Twentieth Century Fox</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Years Experience">
\t\t\t\t<notesAnswer>30</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Prior Losses">
\t\t\t\t<notesAnswer>None</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Maximum Cost of Any One Production">
\t\t\t\t<notesAnswer>\$2,970,000</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Type of Production">
\t\t\t\t<notesAnswer>TV Series</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Number of Episodes">
\t\t\t\t<notesAnswer>10</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Special Hazards Declared">
\t\t\t\t<notesAnswer>None</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Do you do post production or special effects for others?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Are you involved in film distribution?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Has your insurance have ever been cancelled or declined?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Misc Equipment Coverage Requested?">
\t\t\t\t<notesAnswer>Yes</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Misc Equipment Owned or Rented?">
\t\t\t\t<notesAnswer>Rented</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="What Equipment Limit is Requested?">
\t\t\t\t<notesAnswer>\$1,000,000</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Provide Equipment Schedule if any one item exceeds \$10,000 in value">
\t\t\t\t<notesAnswer>To Follow</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Where is equipment kept when not in use?">
\t\t\t\t<notesAnswer>20th Century Fox Studios</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Security Measures against theft, loss, and damage">
\t\t\t\t<notesAnswer>20th Century Fox Security</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Method of Inventory">
\t\t\t\t<notesAnswer>Standard Company Procedures</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Is Foreign GL, Hired Auto and Workers Comp Required?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Do you require Film Producer Error and Omissions Liability? If yes, what limits? Please complete online application and submit for quoting">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Producer">
\t\t\t\t<notesAnswer>Jon Robin Baitz</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Director">
\t\t\t\t<notesAnswer>DeDe Gardner</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Source of Financing">
\t\t\t\t<notesAnswer>Twentieth Century Fox</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Completion Bond Required?">
\t\t\t\t<notesAnswer>No</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Filming Location (1)">
\t\t\t\t<notesAnswer>Los Angeles</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Start Date (1)">
\t\t\t\t<notesAnswer>06/30/2017</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="End Date (1)">
\t\t\t\t<notesAnswer>08/30/2017</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Story / Synopsis">
\t\t\t\t<notesAnswer>Rivalry between Bette Davis &amp; Joan Crawford, exploring how these 2 women endured sexism, ageism, misogyny while struggling to hang on to fame in their twilight years.</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Number of Cast Members">
\t\t\t\t<notesAnswer>Matthew Broderick,,
Sarah Paulson,,
Jessica Lange,,
Jackie Hoffman,,
Kate Bates,,
Dominic Burges,,
Joel Kelley Dauten,,
Alfred Molina,,
Catherine Zeta-Jones,,
Joel Kelly-Dauten,,
</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Total Above-The-Line">
\t\t\t\t<notesAnswer>To Follow</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Total Below-The-Line">
\t\t\t\t<notesAnswer>To Follow</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Total Post Production Cost">
\t\t\t\t<notesAnswer>To Follow</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Will Payroll Service Co provide primary Work Comp Coverage?">
\t\t\t\t<notesAnswer>Yes</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Physical Street Address">
\t\t\t\t<notesAnswer>10201 West Pico Blvd</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Physical City">
\t\t\t\t<notesAnswer>Los Angeles</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Physical Zipcode">
\t\t\t\t<notesAnswer>90036</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="Business Structure">
\t\t\t\t<notesAnswer>Corporation</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="FEIN/SSN">
\t\t\t\t<notesAnswer>26-0075658</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="SIC">
\t\t\t\t<notesAnswer>7812</notesAnswer>
\t\t\t</notes>

\t\t\t<notes notesQuestion="NAIC">
\t\t\t\t<notesAnswer>512110</notesAnswer>
\t\t\t</notes>
\t\t</notesRow>
\t</notesTable>
\t<ratingTable>
\t\t<ratingHeader>Rating</ratingHeader>

\t\t<ratingRow>
\t\t\t<rating ratingName="Entertainment Package">
\t\t\t\t<ratingPrice>  </ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Rate">
\t\t\t\t<ratingPrice> 1</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Min Premium">
\t\t\t\t<ratingPrice> \$5,750.00</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Rated Premium">
\t\t\t\t<ratingPrice> \$297,250.00</ratingPrice>
\t\t\t</rating>
\t\t</ratingRow>
\t\t<ratingRow>
\t\t\t<rating ratingName="Commercial Package">
\t\t\t\t<ratingPrice>  </ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Rate">
\t\t\t\t<ratingPrice> 0.324</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Min Premium">
\t\t\t\t<ratingPrice> \$1,750.00</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Blanket Additional Insured Endorsement">
\t\t\t\t<ratingPrice> \$500</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Medical Payments (Per Person)">
\t\t\t\t<ratingPrice> \$25</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Increased Agg Limit">
\t\t\t\t<ratingPrice> \$250</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Rated Premium">
\t\t\t\t<ratingPrice> \$11,525.00</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="Non-Owned &amp; Hired Auto Liability">
\t\t\t\t<ratingPrice></ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Rate">
\t\t\t\t<ratingPrice> 6.0</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Cost of Hire">
\t\t\t\t<ratingPrice> \$5,500.00</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Min Premium">
\t\t\t\t<ratingPrice> \$500.00</ratingPrice>
\t\t\t</rating>
\t\t\t<rating ratingName="    Rated Premium">
\t\t\t\t<ratingPrice> \$500.00</ratingPrice>
\t\t\t</rating>
\t\t</ratingRow>
\t</ratingTable>


\t<applicantInformationTable>
\t\t<applicantInformationHeader>Application Information</applicantInformationHeader>
\t\t<applicantInformationRow>
\t\t\t<applicantInformation applicantInformationColOne="Name of Production Company">
\t\t\t\t<applicantInformationColTwo>FEUD &amp; Twentieth Century Fox Film Entertainment &amp; 21st Century Fox Subsidiaries &amp; Divisions</applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Title of Production">
\t\t\t\t<applicantInformationColTwo>FEUD - Season 2</applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Website">
\t\t\t\t<applicantInformationColTwo>www.feud.com</applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Mailing Address">
\t\t\t\t<applicantInformationColTwo>10201 West Pico Blvd Los Angeles, CA 90036 </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Primary Contact Name">
\t\t\t\t<applicantInformationColTwo>Twentieth Century Fox </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Tel No">
\t\t\t\t<applicantInformationColTwo>(202) 567-7636 </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t\t<applicantInformation applicantInformationColOne="Email">
\t\t\t\t<applicantInformationColTwo>david@davidkcombes.com </applicantInformationColTwo>
\t\t\t</applicantInformation>
\t\t</applicantInformationRow>
\t</applicantInformationTable>


\t<budgetInformationTable>
\t\t<budgetInformationHeader>Budget Information</budgetInformationHeader>
\t\t<budgetInformationRow>
\t\t\t<budgetInformation budgetInformationColOne="Gross Production Cost">
\t\t\t\t<budgetInformationColTwo> \$29,700,000 </budgetInformationColTwo>
\t\t\t</budgetInformation>
\t\t\t<budgetInformation budgetInformationColOne="Budget Attached">
\t\t\t\t<budgetInformationColTwo> Top Sheet of Budget is required </budgetInformationColTwo>
\t\t\t</budgetInformation>

\t\t</budgetInformationRow>
\t</budgetInformationTable>


\t<productionInformationTable>
\t\t<productionInformationHeader>Production Information</productionInformationHeader>
\t\t<productionInformationRow>
\t\t\t<productionInformationName productionInformationColOne="Types of Production:">
\t\t\t\t<productionInformationColTwo> TV Series </productionInformationColTwo>
\t\t\t</productionInformationName>
\t\t\t<productionInformationName productionInformationColOne="Script / Story:">
\t\t\t\t<productionInformationColTwo> Rivalry between Bette Davis &amp; Joan Crawford, exploring how these 2 women endured sexism, ageism, misogyny while struggling to hang on to fame in their twilight years. </productionInformationColTwo>
\t\t</productionInformationName>
\t\t</productionInformationRow>
\t</productionInformationTable>

\t<principalPhotographyTable>
\t\t<principalPhotographyHeader>Principal Photography</principalPhotographyHeader>
\t\t<principalPhotographyRow>
\t\t\t<principalPhotographyName startPrincipalPhoto="06/30/2017">
\t\t\t\t<endPrincipalPhoto>08/30/2017</endPrincipalPhoto>
\t\t\t\t<locationPrincipalPhoto>Los Angeles</locationPrincipalPhoto>
\t\t\t</principalPhotographyName>
\t\t</principalPhotographyRow>

\t</principalPhotographyTable>

\t<keyPersonnelTable>
\t\t<keyPersonnelHeader>Key Personnel</keyPersonnelHeader>
\t\t<keyPersonnelRow>
\t\t\t<keyPerson keyPersonnel="Director">
\t\t\t\t<keyPersonnelName>DeDe Gardner</keyPersonnelName>
\t\t\t\t<keyPersonnelYOE></keyPersonnelYOE>
\t\t\t\t<keyPersonnelPrior></keyPersonnelPrior>
\t\t\t</keyPerson>
\t\t\t<keyPerson keyPersonnel="Producer">
\t\t\t\t<keyPersonnelName>Jon Robin Baitz</keyPersonnelName>
\t\t\t\t<keyPersonnelYOE></keyPersonnelYOE>
\t\t\t\t<keyPersonnelPrior></keyPersonnelPrior>
\t\t\t</keyPerson>
\t\t</keyPersonnelRow>
\t</keyPersonnelTable>

\t<extraForms> </extraForms>


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
</x:Envelope>
"""

            log.info soapXML

            def client = new SOAPClient('http://138.91.159.55/Produce/Service/GenerateDoc.asmx?WSDL')
            client.authorization = new HTTPBasicAuthorization("admin", "admin")
            def response = client.send(SOAPAction: 'http://services.dpm.com.au/intelledox/GenerateWithData', soapXML)

            if (response.text.length() > 1500) {
                log.info response.text.substring(0, 1500);
            } else {
                log.info response.text
            }

            def fileName = "Indication A.pdf"

            def a = new XmlSlurper().parseText(response.text)
            def nodeToSerialize = a."**".find { it.name() == 'BinaryFile' }
            def pdfBinaryFile = nodeToSerialize.text();


            allQuoteIDs.split(",").each {
                def quoteID = it.split(";")[0]
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

            return "Indication Error"
        }


    }
}

//<underwriter>${XmlUtil.escapeXml(jsonSerial.getAt('accountExecName'))}</underwriter>
//\t\t<underwriterPhone>${XmlUtil.escapeXml(jsonSerial.getAt('underwriterPhone'))}</underwriterPhone>
//\t\t<underwriterFax>${XmlUtil.escapeXml(jsonSerial.getAt('underwriterFax'))}</underwriterFax>
//\t\t<underwriterEmail>${XmlUtil.escapeXml(jsonSerial.getAt('accountExecEmail'))}</underwriterEmail>