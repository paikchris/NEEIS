package portal.DAO

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

    def createIndicationPDF(jsonSerial, uwQuestionsMap, uwQuestionsOrder, dataSource_aim){
        log.info "INTELLEDOX"
        log.info "JSON ==== " + jsonSerial
        try
        {
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
            if(jsonSerial.getAt("cglLOB").length() > 1){
                coverages = coverages + "CGL "
            }
            if(jsonSerial.getAt("cpkLOB").length() > 1){
                coverages = coverages + "CPK "
            }
            if(jsonSerial.getAt("epkgLOB").length() > 1){
                coverages = coverages + "EPKG "
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
\t\t<logo>c:\\IntelledoxLogo\\trumanVanDyke.png</logo>
\t\t<nameOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('namedInsured'))}</nameOfInsured>
\t\t<brokerCompanyName>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyName'))}</brokerCompanyName>
\t\t<brokerCompanyAddress>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyAddress'))}</brokerCompanyAddress>
\t\t<brokerCompanyAddressCity>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyCity'))}</brokerCompanyAddressCity>
\t\t<brokerCompanyAddressState>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyState'))}</brokerCompanyAddressState>
\t\t<brokerCompanyAddressZip>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyZip'))}</brokerCompanyAddressZip>
\t\t<brokerCompanyPhone>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyPhone'))}</brokerCompanyPhone>
\t\t<brokerCompanyLicenseNumber>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense'))}</brokerCompanyLicenseNumber>
\t\t<agentName>${XmlUtil.escapeXml(jsonSerial.getAt('attention'))}</agentName>
\t\t<agentLicenseNumber>${ XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense')) ? XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense')) : ""}</agentLicenseNumber>
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
\t\t<riskDescription>${XmlUtil.escapeXml(jsonSerial.getAt("riskCategoryChosen"))}, ${XmlUtil.escapeXml(jsonSerial.getAt("riskTypeChosen"))}</riskDescription>
\t\t<locationOfRiskAddress>${XmlUtil.escapeXml(jsonSerial.getAt("filmingLocation"))}</locationOfRiskAddress>
\t\t<insuranceCoverage>${coverages}</insuranceCoverage>
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
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt('cityMailing'))}, ${XmlUtil.escapeXml(jsonSerial.getAt('stateMailing'))} ${XmlUtil.escapeXml(jsonSerial.getAt('zipCodeMailing'))}"></nameInsured>
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
\t\t\t<policyTerm policyTermColOne="Proposed Effective: ${XmlUtil.escapeXml(jsonSerial.getAt("proposedEffectiveDate"))} - ${XmlUtil.escapeXml(jsonSerial.getAt("proposedExpirationDate"))}"></policyTerm>
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
                        if(it.split("\\t")[0] == "Premium Distribution"){

                        }
                        else if (it.split("\\t")[0] == "Taxes and Fees" ) {
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
            }
            else {
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

            if(jsonSerial.getAt("cpkLOB").length() > 1){
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Commercial Package - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("cpkLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >=3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            else if(jsonSerial.getAt("cglLOB").length() > 1){
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Commercial General Liability - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("cglLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >=3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            if(jsonSerial.getAt("epkgLOB").length() > 1){
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Entertainment Package - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("epkgLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >=3 ? it.split("\t")[2] : ""} </coverageDeductible>
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

            if(jsonSerial.getAt("epkgLOB").length() > 1){
                jsonSerial.getAt("endorseInsertEPKG").split("\n").eachWithIndex { row, index ->
                    if (row.length() > 0) {
                        if(index ==0){
                            soapXML = soapXML + """
\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>${XmlUtil.escapeXml(row)}</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>
"""
                        }
                        else{
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
            if(jsonSerial.getAt("cpkLOB").length() > 1){
                jsonSerial.getAt("endorseInsertCPK").split("\n").eachWithIndex { row, index ->
                    if (row.length() > 0) {
                        if(index ==0){
                            soapXML = soapXML + """
\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>${XmlUtil.escapeXml(row)}</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>
"""
                        }
                        else{
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
            else if(jsonSerial.getAt("cglLOB").length() > 1){
                jsonSerial.getAt("endorseInsertCGL").split("\n").eachWithIndex { row, index ->
                    if (row.length() > 0) {
                        if(index ==0){
                            soapXML = soapXML + """
\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>${XmlUtil.escapeXml(row)}</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>
"""
                        }
                        else{
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
            uwQuestionsOrder.each{

                soapXML = soapXML + """

\t\t\t<notes notesQuestion="${XmlUtil.escapeXml("${it}")}">
\t\t\t\t<notesAnswer>${XmlUtil.escapeXml(uwQuestionsMap["${it}"])}</notesAnswer>
\t\t\t</notes>"""
            }
            soapXML = soapXML + """
\t\t</notesRow>
\t</notesTable>"""


            soapXML = soapXML + """
\t<ratingTable>
\t"""

            if(jsonSerial.getAt("EPKGRateInfo") != null){
                soapXML = soapXML + """
\t
\t
\t\t<ratingHeader>Rating</ratingHeader>
\t\t<ratingRow>
\t\t\t<rating ratingName="Entertainment Package">
\t\t\t\t<ratingPrice>${XmlUtil.escapeXml(jsonSerial.getAt("EPKGRateInfo"))}</ratingPrice>
\t\t\t</rating>
\t\t</ratingRow>"""
            }
            if(jsonSerial.getAt("CPKRateInfo") != null){
                soapXML = soapXML + """
\t
\t
\t\t<ratingRow>
\t\t\t<rating ratingName="Commercial Package">
\t\t\t\t<ratingPrice>${XmlUtil.escapeXml(jsonSerial.getAt("CPKRateInfo"))}</ratingPrice>
\t\t\t</rating>
\t\t</ratingRow>"""
            }
            else if(jsonSerial.getAt("CGLRateInfo") != null){
                soapXML = soapXML + """
\t
\t
\t\t<ratingRow>
\t\t\t<rating ratingName="Commercial General Liability">
\t\t\t\t<ratingPrice>${XmlUtil.escapeXml(jsonSerial.getAt("CGLRateInfo"))}</ratingPrice>
\t\t\t</rating>
\t\t</ratingRow>"""
            }

            soapXML = soapXML + """
\t</ratingTable>
\t"""


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
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("streetNameMailing"))} ${XmlUtil.escapeXml(jsonSerial.getAt("cityMailing"))}, ${XmlUtil.escapeXml(jsonSerial.getAt("stateMailing"))} ${XmlUtil.escapeXml(jsonSerial.getAt("zipCodeMailing"))} </applicantInformationColTwo>
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

            if(jsonSerial.getAt("sourceOfFinancing") != null){
                soapXML = soapXML + """      
\t\t\t<budgetInformation budgetInformationColOne="Source of Financing">
\t\t\t\t<budgetInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("sourceOfFinancing"))} </budgetInformationColTwo>
\t\t\t</budgetInformation>"""
            }

            soapXML = soapXML + """
\t\t</budgetInformationRow>
\t</budgetInformationTable>

\t
\t<productionInformationTable>
\t\t<productionInformationHeader>Production Information</productionInformationHeader>
\t\t<productionInformationRow>
\t\t\t<productionInformationName productionInformationColOne="Types of Production:">
\t\t\t\t<productionInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("productionType"))} </productionInformationColTwo>
\t\t\t</productionInformationName>
\t\t\t<productionInformationName productionInformationColOne="Script / Story:">
\t\t\t\t<productionInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("story"))} </productionInformationColTwo>
\t\t</productionInformationName>
\t\t</productionInformationRow>
\t</productionInformationTable>

\t<principalPhotographyTable>
\t\t<principalPhotographyHeader>Principal Photography</principalPhotographyHeader>
\t\t<principalPhotographyRow>
\t\t\t<principalPhotographyName startPrincipalPhoto="${XmlUtil.escapeXml(jsonSerial.getAt("principalPhotographyDateStart"))} - ">
\t\t\t\t<endPrincipalPhoto>${XmlUtil.escapeXml(jsonSerial.getAt("principalPhotographyDateStart"))}</endPrincipalPhoto>
\t\t\t\t<locationPrincipalPhoto></locationPrincipalPhoto>
\t\t\t</principalPhotographyName>
\t\t</principalPhotographyRow>
\t</principalPhotographyTable>

\t<keyPersonnelTable>
\t\t<keyPersonnelHeader>Key Personnel</keyPersonnelHeader>
\t\t<keyPersonnelRow>
\t\t\t<keyPerson keyPersonnel="Director">
\t\t\t\t<keyPersonnelName>${XmlUtil.escapeXml(jsonSerial.getAt("director"))}</keyPersonnelName>
\t\t\t\t<keyPersonnelYOE></keyPersonnelYOE>
\t\t\t\t<keyPersonnelPrior></keyPersonnelPrior>
\t\t\t</keyPerson>
\t\t\t<keyPerson keyPersonnel="Producer">
\t\t\t\t<keyPersonnelName>${XmlUtil.escapeXml(jsonSerial.getAt("producer"))}</keyPersonnelName>
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
</x:Envelope>"""

            log.info soapXML

            def client = new SOAPClient('http://138.91.159.55/Produce/Service/GenerateDoc.asmx?WSDL')
            client.authorization = new HTTPBasicAuthorization("admin", "admin")
            def response = client.send(SOAPAction:'http://services.dpm.com.au/intelledox/GenerateWithData', soapXML)

//            log.info response.text.substring(0,1500);
            log.info response.text
            def fileName = "Indication A.pdf"

            def a = new XmlSlurper().parseText(response.text)
            def nodeToSerialize = a."**".find {it.name() == 'BinaryFile'}
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
        catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            return "Indication Error"
        }




    }

    def createIndicationSpecialEventsPDF(jsonSerial, uwQuestionsMap, uwQuestionsOrder, dataSource_aim){
        log.info "INTELLEDOX"
        log.info "JSON ==== " + jsonSerial
        try
        {
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
            if(jsonSerial.getAt("cglLOB").length() > 1){
                coverages = coverages + "CGL "
            }
            if(jsonSerial.getAt("cumbLOB").length() > 1){
                coverages = coverages + "CUMB "
            }
            if(jsonSerial.getAt("alcoholLOB").length() > 1){
                coverages = coverages + "ALCOHOL "
            }
            if(jsonSerial.getAt("wcLOB").length() > 1){
                coverages = coverages + "WC "
            }
            if(jsonSerial.getAt("noalLOB").length() > 1){
                coverages = coverages + "NOAL "
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
\t\t<logo>c:\\IntelledoxLogo\\proSight.png</logo>
\t\t<nameOfInsured>${XmlUtil.escapeXml(jsonSerial.getAt('namedInsured'))}</nameOfInsured>
\t\t<brokerCompanyName>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyName'))}</brokerCompanyName>
\t\t<brokerCompanyAddress>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyAddress'))}</brokerCompanyAddress>
\t\t<brokerCompanyAddressCity>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyCity'))}</brokerCompanyAddressCity>
\t\t<brokerCompanyAddressState>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyState'))}</brokerCompanyAddressState>
\t\t<brokerCompanyAddressZip>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyZip'))}</brokerCompanyAddressZip>
\t\t<brokerCompanyPhone>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyPhone'))}</brokerCompanyPhone>
\t\t<brokerCompanyLicenseNumber>${XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense'))}</brokerCompanyLicenseNumber>
\t\t<agentName>${XmlUtil.escapeXml(jsonSerial.getAt('attention'))}</agentName>
\t\t<agentLicenseNumber>${ XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense')) ? XmlUtil.escapeXml(jsonSerial.getAt('brokerCompanyLicense')) : ""}</agentLicenseNumber>
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
\t\t<riskDescription>${XmlUtil.escapeXml(jsonSerial.getAt("riskCategoryChosen"))}, ${XmlUtil.escapeXml(jsonSerial.getAt("riskTypeChosen"))}</riskDescription>
\t\t<locationOfRiskAddress>${XmlUtil.escapeXml(jsonSerial.getAt("filmingLocation"))}</locationOfRiskAddress>
\t\t<insuranceCoverage>${coverages}</insuranceCoverage>
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
\t\t<insuranceCompany>${XmlUtil.escapeXml(jsonSerial.getAt("insuranceCompany"))}</insuranceCompany>
\t</basicInfo>
\t
\t<namedInsuredTable>
\t\t<namedInsuredHeader>Named Insured</namedInsuredHeader>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt("namedInsured"))}"></nameInsured>
\t\t\t<nameInsuredColTwo>Contact: ${XmlUtil.escapeXml(jsonSerial.getAt("principalName"))}</nameInsuredColTwo>
\t\t</namedInsuredRow>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt('streetNameMailing'))}"></nameInsured>
\t\t\t<nameInsuredColTwo>Email: ${XmlUtil.escapeXml(jsonSerial.getAt("principalEmail"))}</nameInsuredColTwo>
\t\t</namedInsuredRow>
\t\t<namedInsuredRow>
\t\t\t<nameInsured nameInsuredColOne="${XmlUtil.escapeXml(jsonSerial.getAt('cityMailing'))}, ${XmlUtil.escapeXml(jsonSerial.getAt('stateMailing'))} ${XmlUtil.escapeXml(jsonSerial.getAt('zipCodeMailing'))}"></nameInsured>
\t\t\t<nameInsuredColTwo>Phone: ${XmlUtil.escapeXml(jsonSerial.getAt("principalPhone"))}</nameInsuredColTwo>
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
\t\t\t<policyTerm policyTermColOne="Proposed Effective: ${XmlUtil.escapeXml(jsonSerial.getAt("proposedEffectiveDate"))} - ${XmlUtil.escapeXml(jsonSerial.getAt("proposedExpirationDate"))}"></policyTerm>
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
                        if(it.split("\\t")[0] == "Premium Distribution"){

                        }
                        else if (it.split("\\t")[0] == "Taxes and Fees" ) {
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
            }
            else {
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

            if(jsonSerial.getAt("cglLOB").length() > 1){
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Commercial Package Policy - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("cglLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >=3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            else if(jsonSerial.getAt("cumbLOB").length() > 1){
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Host Liquor - Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("cumbLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >=3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            if(jsonSerial.getAt("alcoholLOB").length() > 1){
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Non-Owned and Hired Automobile- Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("alcoholLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >=3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            if(jsonSerial.getAt("wcLOB").length() > 1){
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Umbrella- Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("wcLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >=3 ? it.split("\t")[2] : ""} </coverageDeductible>
\t\t</coverage>
\t"""
                    }
                }
                soapXML = soapXML + """
\t\t</coverageRow>
\t</coverageTable>"""
            }
            if(jsonSerial.getAt("noalLOB").length() > 1){
                soapXML = soapXML + """
\t<coverageTable>
\t\t<coverageHeader>Workers Compensation- Limits/Deductibles</coverageHeader>
\t\t<coverageRow>""";
                jsonSerial.getAt("noalLOB").split("\n").each {
                    if (it.length() > 0) {
                        soapXML = soapXML + """
\t\t<coverage coveragePackage="${it.split("\t")[0]}">
\t\t\t<coverageLimit> ${it.split("\t")[1]} </coverageLimit>
\t\t\t<coverageDeductible> ${it.split("\t").size() >=3 ? it.split("\t")[2] : ""} </coverageDeductible>
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
            if(jsonSerial.getAt("cglLOB").length() > 1){
                jsonSerial.getAt("endorseInsert").split("\n").eachWithIndex { row, index ->
                    if (row.length() > 0) {
                        if(index ==0){
                            soapXML = soapXML + """
\t<policyFormEndorsementHeaders>
\t\t<policyFormEndorsementHeader>${XmlUtil.escapeXml(row)}</policyFormEndorsementHeader>
\t\t\t<policyFormEndorsementRow>
"""
                        }
                        else{
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
            uwQuestionsOrder.each{

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
\t\t\t\t<applicantInformationColTwo>${XmlUtil.escapeXml(jsonSerial.getAt("streetNameMailing"))} ${XmlUtil.escapeXml(jsonSerial.getAt("cityMailing"))}, ${XmlUtil.escapeXml(jsonSerial.getAt("stateMailing"))} ${XmlUtil.escapeXml(jsonSerial.getAt("zipCodeMailing"))} </applicantInformationColTwo>
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
\t</applicantInformationTable>


\t
\t<productionInformationTable>
\t\t<productionInformationHeader>Event Information</productionInformationHeader>
\t\t<productionInformationRow>
\t\t\t<productionInformationName productionInformationColOne="Types of Event:">
\t\t\t\t<productionInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("totalAttendance"))} </productionInformationColTwo>
\t\t\t</productionInformationName>
\t\t\t<productionInformationName productionInformationColOne="Total Attendance:">
\t\t\t\t<productionInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("totalAttendance"))} </productionInformationColTwo>
\t\t</productionInformationName>
\t\t\t<productionInformationName productionInformationColOne="Largest Number of Attendees Per Day:">
\t\t\t\t<productionInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("attendeePerDay"))} </productionInformationColTwo>
\t\t</productionInformationName>
\t\t\t<productionInformationName productionInformationColOne="Event Location:">
\t\t\t\t<productionInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("eventState"))} </productionInformationColTwo>
\t\t</productionInformationName>
\t\t\t<productionInformationName productionInformationColOne="Primary Business Operation:">
\t\t\t\t<productionInformationColTwo> ${XmlUtil.escapeXml(jsonSerial.getAt("primaryBusinessOperation"))} </productionInformationColTwo>
\t\t</productionInformationName>
\t\t</productionInformationRow>
\t</productionInformationTable>

\t<principalPhotographyTable>
\t\t<principalPhotographyHeader></principalPhotographyHeader>
\t</principalPhotographyTable>

\t<keyPersonnelTable>
\t\t<keyPersonnelHeader></keyPersonnelHeader>
\t</keyPersonnelTable>


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
            def response = client.send(SOAPAction:'http://services.dpm.com.au/intelledox/GenerateWithData', soapXML)

//            log.info response.text.substring(0,1500);
            log.info response.text
            def fileName = "Indication A.pdf"

            def a = new XmlSlurper().parseText(response.text)
            def nodeToSerialize = a."**".find {it.name() == 'BinaryFile'}
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
        catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            return "Indication Error"
        }




    }

    def createCertPDF(params, dataSource_aim){
        log.info "INTELLEDOX CERT BYTES"
        log.info params
        FileTransferHelper fileHelper = new FileTransferHelper();
        def projectGUID="";
        if(params.ai == "true"){
            //WITH AI FORM
            projectGUID="8285f070-4e75-4ab2-a265-e81d7e4b2517"
        }
        else{
            //WITHOUT AI FORM
            projectGUID = "d83d80e6-3683-4589-a747-24e98b14765c"
        }

        def soapXML = """<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>${projectGUID}</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>2c1ce06a-100f-40c8-b4d4-af4057349532</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<certificate>
\t\t
\t\t<date>${params.date}</date>
\t\t<producer>${params.producer}</producer>
\t\t<producerAddress>${params.producerAddress}</producerAddress>
\t\t<insured>${params.insured}</insured>
\t\t<insuredAddress>${params.insuredAddress}</insuredAddress>
\t\t<contactName>${params.contactName}</contactName>
\t\t<contactPhone>${params.contactPhone}</contactPhone>
\t\t<contactFax>${params.contactFax}</contactFax>
\t\t<contactEmail>${params.contactEmail}</contactEmail>
\t\t<insurer>${params.insurer}</insurer>
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




        ////CPK GENERAL LIABILITY TABLE
        if(params.getAt("cpkLOB").length() > 1) {
            soapXML = soapXML + """
\t<GeneralTable>
\t\t<GeneralROW>""";
            params.getAt("cpkLOB").split(";&&;").each {
                if (it.length() > 0) {
                    soapXML = soapXML + """
\t\t\t<General packageGeneral="${it.split(";&;")[0]}">
\t\t\t\t<limitGeneral> ${it.split(";&;")[1]} </limitGeneral>
\t\t\t\t<deductibleGeneral> ${it.split(";&;").size() >=3 ? it.split(";&;")[2] : ""} </deductibleGeneral>
\t\t\t</General>"""
                }
            }
            soapXML = soapXML + """
\t\t</GeneralROW>
\t</GeneralTable>"""
        }

        ////CGL GENERAL LIABILITY TABLE
        if(params.getAt("cglLOB").length() > 1) {
            soapXML = soapXML + """
\t<GeneralTable>
\t\t<GeneralROW>""";
            params.getAt("cglLOB").split(";&&;").each {
                if (it.length() > 0) {
                    soapXML = soapXML + """
\t\t\t<General packageGeneral="${it.split(";&;")[0]}">
\t\t\t\t<limitGeneral> ${it.split(";&;")[1]} </limitGeneral>
\t\t\t\t<deductibleGeneral> ${it.split(";&;").size() >=3 ? it.split(";&;")[2] : ""} </deductibleGeneral>
\t\t\t</General>"""
                }
            }
            soapXML = soapXML + """
\t\t</GeneralROW>
\t</GeneralTable>"""
        }


        ////EPKG TABLE
        if(params.getAt("epkgLOB").length() > 1) {
            soapXML = soapXML + """
\t<EPKTable>
\t\t<EPKROW>""";
            params.getAt("epkgLOB").split(";&&;").each {
                if (it.length() > 0) {
                    soapXML = soapXML + """
\t\t\t<EPK packageEPK="${it.split(";&;")[0]}">
\t\t\t\t<limitEPK> ${it.split(";&;")[1]} </limitEPK>
\t\t\t\t<deductibleEPK> ${it.split(";&;").size() >=3 ? it.split(";&;")[2] : ""} </deductibleEPK>
\t\t\t</EPK>"""
                }
            }
            soapXML = soapXML + """
\t\t</EPKROW>
\t</EPKTable>"""
        }


//\t<AutoTable>
//\t\t<AutoROW>
//\t\t\t<Auto packageAuto="Employee Benefits Liability">
//\t\t\t\t<limitAuto> \$1,000 </limitAuto>
//\t\t\t\t<deductibleAuto> \$500 </deductibleAuto>
//\t\t\t</Auto>
//\t\t\t<Auto packageAuto="Employee Benefits Liability2">
//\t\t\t\t<limitAuto> \$1,000 </limitAuto>
//\t\t\t\t<deductibleAuto> \$500 </deductibleAuto>
//\t\t\t</Auto>
//\t\t</AutoROW>
//\t</AutoTable>
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
        def response = client.send(SOAPAction:'http://services.dpm.com.au/intelledox/GenerateWithData', soapXML)

//        log.info response.text

        log.info response.text.substring(0,1000)
        def fileName = "Certificate-" + params.insured + ".pdf"

        def a = new XmlSlurper().parseText(response.text)
        def nodeToSerialize = a."**".find {it.name() == 'BinaryFile'}
        def pdfBinaryFile = nodeToSerialize.text();

//        def quoteID = it.split(";")[0]
        def folderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/${params.quoteID}")
        log.info folderPath

        fileName = fileHelper.ftpFileToAIM(fileName, folderPath, params.quoteID, dataSource_aim);

        fileHelper.saveBinaryFileToLocalPath(pdfBinaryFile, folderPath, fileName);




        return folderPath + "/" + fileName;
    }


def createBindingPDF(jsonSerial, uwQuestionsMap, uwQuestionsOrder, dataSource_aim){
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
\t\t<brokerCompany></brokerCompany>
\t\t<insured>${XmlUtil.escapeXml(jsonSerial.getAt('namedInsured'))}</insured>
\t\t<insuredStreet>${jsonSerial.getAt("streetNameMailing")}</insuredStreet>
\t\t<insuredCity>${jsonSerial.getAt("cityMailing")}</insuredCity>
\t\t<insuredState>${jsonSerial.getAt("stateMailing")}</insuredState>
\t\t<insuredZip>${jsonSerial.getAt("zipCodeMailing")}</insuredZip>
\t\t<coverageType>${coverages}</coverageType>
\t\t<emailBody></emailBody>
\t\t<insurer>${jsonSerial.getAt("insuranceCompany")}</insurer>
\t\t<fees></fees>
\t\t<policyNumber></policyNumber>
\t\t<premium></premium>
\t\t<producer></producer>
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
}
