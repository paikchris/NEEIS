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

    def createIndicationPDF(jsonSerial, dataSource_aim){
        log.info "INTELLEDOX"
        log.info "JSON ==== " + jsonSerial

        FileTransferHelper fileHelper = new FileTransferHelper();

        def totalPolicyFee = 0;



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
\t\t<name> John Kim </name>
\t\t<date> 11-6-2016 </date>
\t\t<phone> (703)350-3365 </phone>
\t\t<address> 1111 New Empire </address>
\t\t<addressCity>Herndon</addressCity>
\t\t<addressState> VA </addressState>
\t\t<addressZip>20171</addressZip>
\t\t<agent> Andee </agent>
\t\t<agentLicenseNumber>111</agentLicenseNumber>
\t\t<agentEmail> johnkimsinbox@gmail.com </agentEmail>
\t\t<agentPhone>(703)350-3364 </agentPhone>
\t\t<submission> 001 </submission>
\t\t<dateStart> 11-08-2016 - 11-08-2017 </dateStart>
\t\t<annualOrShort> Annual </annualOrShort>
\t\t<insuranceCompany> INFOWARS </insuranceCompany>
\t\t<insuranceLicenseNumber>222</insuranceLicenseNumber>
\t\t<primaryName> Andee </primaryName>
\t\t<primaryPhone> (123)456-7890 </primaryPhone>
\t\t<primaryFax> (123)456-7891 </primaryFax>
\t\t<primaryEmail> AndeeAbad@test.com </primaryEmail>
\t\t<physicalAddress> 1112 New Empire Redondo Beach CA</physicalAddress>
\t\t<website> www.Neesis.com</website>
\t\t<total>Total:</total>
\t\t<totalCost>\$</totalCost>
\t\t<underwriter>Jason Debolt</underwriter>
\t\t<underwriterPhone>7037778888</underwriterPhone>
\t\t<underwriterFax>7037778888</underwriterFax>
\t\t<underwriterEmail>test@test.com</underwriterEmail>
\t\t<riskDescription>laundromat</riskDescription>
\t\t<insuranceCoverage>EPK CPK</insuranceCoverage>
\t\t<locationOfRiskAddress>12222</locationOfRiskAddress>
\t\t<locationOfRiskCity>CA</locationOfRiskCity>
\t\t<locationOfRiskZip>90277</locationOfRiskZip>
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
\t</basicInfo>
\t
\t""";
        soapXML = soapXML + """
\t<premiumSummaryTable>""";

        if(jsonSerial.getAt("premSummary").split(";&&;").size() > 0) {
            log.info("PREM SUMMARY");
            jsonSerial.getAt("premSummary").split(";&&;").each{
                log.info("PREM SUMMARY" + it);
                if(it.length() > 0){
                    if(it.split(";&;")[0] == "Taxes and Fees" || it.split(";&;")[0] == "Premium Distribution"){
                        soapXML = soapXML + """
\t\t<premiumSummary package="${it.split(";&;")[0]}">

\t\t\t<cost>  </cost>
\t\t</premiumSummary>"""
                    }
                    else if(it.split(";&;")[0] == "Policy Fee") {

                    }
                    else {
                        soapXML = soapXML + """
\t\t<premiumSummary package="   ${it.split(";&;")[0]}">

\t\t\t<cost>${it.split(";&;")[1]} </cost>
\t\t</premiumSummary>"""
                    }

                }
                else{

                }
            }
        }
        else{
            log.info jsonSerial.getAt("premiumAllLOBTotal")
            soapXML = soapXML + """
\t\t<premiumSummary package="Total">

\t\t\t<cost>  </cost>
\t\t</premiumSummary>"""
        }


///////////////////TOTAL POLICY FEE
        soapXML = soapXML + """
\t\t<premiumSummary package="Policy Fee">

\t\t\t<cost>\$${jsonSerial.getAt("totalPolicyFee")}.00 </cost>
\t\t</premiumSummary>"""

        soapXML = soapXML + """
\t</premiumSummaryTable>
\t""";

////////////////////////////CPK Table
        if(jsonSerial.getAt("cpkLOB").length() > 1){

            soapXML = soapXML + """
\t<CPKTable>
\t\t<CPKROW>
\t""";
            jsonSerial.getAt("cpkLOB").split(";&&;").each{
                if(it.length() > 0){
                    soapXML = soapXML + """
\t\t<CPK packageCPK="${it.split(";&;")[0]}">
\t\t\t<limitCPK> ${it.split(";&;")[1]} </limitCPK>
\t\t\t<deductibleCPK> ${it.split(";&;").size() >=3 ? it.split(";&;")[2] : ""} </deductibleCPK>
\t\t</CPK>
\t"""
                }
                else{

                }
            }
            soapXML = soapXML + """
\t\t</CPKROW>
\t</CPKTable>
\t""";
        }
        else if(jsonSerial.getAt("cglLOB").length() > 1){

            soapXML = soapXML + """
\t<CPKTable>
\t\t<CPKROW>
\t""";
            jsonSerial.getAt("cglLOB").split(";&&;").each{
                if(it.length() > 0){
                    soapXML = soapXML + """
\t\t<CPK packageCPK="${it.split(";&;")[0]}">
\t\t\t<limitCPK> ${it.split(";&;")[1]} </limitCPK>
\t\t\t<deductibleCPK> ${it.split(";&;").size() >=3 ? it.split(";&;")[2] : ""} </deductibleCPK>
\t\t</CPK>
\t"""
                }
                else{

                }
            }
            soapXML = soapXML + """
\t\t</CPKROW>
\t</CPKTable>
\t""";
        }

////////////////////////////EPKG Table
        if(jsonSerial.getAt("epkgLOB").length() > 1){
//            log.info("EPKGLOB SUMMARY");
            soapXML = soapXML + """
\t<EPKTable>
\t\t<EPKROW>
\t""";
            jsonSerial.getAt("epkgLOB").split(";&&;").each{
                if(it.length() > 0){
                    soapXML = soapXML + """

\t\t<EPK packageEPK="${it.split(";&;")[0]}">
\t\t\t<limitEPK> ${it.split(";&;")[1]} </limitEPK>
\t\t\t<deductibleEPK> ${it.split(";&;").size() >=3 ? it.split(";&;")[2] : ""} </deductibleEPK>
\t\t</EPK>
\t"""
                }
                else{

                }
            }
            soapXML = soapXML + """
\t\t</EPKROW>
\t</EPKTable>
\t""";
        }


soapXML = soapXML + """
\t<term>
\t\t<terms> ${jsonSerial.getAt("termsInsert")} </terms>
\t</term>

\t<policyFormEndorsement>
\t\t<policyForm> ${jsonSerial.getAt("endorseInsert")} </policyForm>
\t</policyFormEndorsement>

\t<rateTable>
\t\t<rateRange ratePackage="rate package 1">
\t\t\t<rate>  </rate>
\t\t</rateRange>
\t\t<rateRange ratePackage="rate package 2">
\t\t\t<rate>  </rate>
\t\t</rateRange>
\t\t<rateRange ratePackage="rate package 3">
\t\t\t<rate>  </rate>
\t\t</rateRange>
\t</rateTable>

\t<budgetInformation>
\t\t<budget> ${jsonSerial.getAt("totalBudgetConfirm")} </budget>
\t\t<numberProduction> 1 </numberProduction>
\t\t<maxBudget> N/A </maxBudget>
\t\t<workOthers> N/A </workOthers>
\t\t<sourceFinance> ${jsonSerial.getAt("sourceOfFinancing")} </sourceFinance>
\t\t<mediaType> N/A </mediaType>
\t\t<frequencyDevelopment> N/A </frequencyDevelopment>
\t</budgetInformation>

\t<productionInformation>
\t\t<script> ${jsonSerial.getAt("story")} </script>
\t\t<productions>
\t\t\t<production typeOfProduction="Type Of Production">
\t\t\t\t<typeProductions>
\t\t\t\t\t<typeProduction>
\t\t\t\t\t\t<name>${jsonSerial.getAt("productionType")}</name>
\t\t\t\t\t</typeProduction>
\t\t\t\t</typeProductions>
\t\t\t</production>
\t\t</productions>

\t\t<risks>
\t\t\t<risk riskDeclared="Declared Risks">
\t\t\t\t<declaredRisks>
\t\t\t\t\t<declaredRisk>
\t\t\t\t\t\t<name> ${jsonSerial.getAt("productionInvolves")}</name>
\t\t\t\t\t</declaredRisk>
\t\t\t\t</declaredRisks>
\t\t\t</risk>
\t\t</risks>

\t</productionInformation>

\t<keyPersonnel>
\t\t<producer>
\t\t\t<producerName> ${jsonSerial.getAt("producer")} </producerName>
\t\t\t<producerYoe> N/A </producerYoe>
\t\t\t<producerProject>N/A</producerProject>
\t\t</producer>

\t\t<director>
\t\t\t<directorName> ${jsonSerial.getAt("director")} </directorName>
\t\t\t<directorYeo> N/A </directorYeo>
\t\t\t<directorProject>N/A</directorProject>
\t\t</director>

\t\t<stunt>
\t\t\t<stuntName> N/A </stuntName>
\t\t\t<stuntYeo> N/A </stuntYeo>
\t\t\t<stuntProject> N/A </stuntProject>
\t\t</stunt>

\t\t<cine>
\t\t\t<cineName> N/A </cineName>
\t\t\t<cineYeo> N/A </cineYeo>
\t\t\t<cineProject> N/A </cineProject>
\t\t</cine>

\t\t<principal>
\t\t\t<principalName> ${jsonSerial.getAt("nameOfPrincipal")} </principalName>
\t\t\t<principalYeo> N/A </principalYeo>
\t\t\t<principalProject> N/A </principalProject>
\t\t</principal>
\t</keyPersonnel>
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

        log.info response.text
        def fileName = "Indication A.pdf"
        log.info("NEW FOLDER QUOTE = " + jsonSerial.getAt("allQuoteIDs"))
        def quoteID = jsonSerial.getAt("allQuoteIDs").split(",")[0].split(";")[0]
        def a = new XmlSlurper().parseText(response.text)
        def nodeToSerialize = a."**".find {it.name() == 'BinaryFile'}
        def pdfBinaryFile = nodeToSerialize.text();
        def folderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/${quoteID}/")
        log.info folderPath
//        def webrootDir = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/${quoteID}/${fileName}");
//        def folderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/${quoteID}/")
//        def folder = new File ( folderPath)
//        folder.mkdirs()
//
//        BASE64Decoder decoder = new BASE64Decoder();
//        byte[] decodedBytes = decoder.decodeBuffer(nodeToSerialize.text());
//
//        InputStream is = new ByteArrayInputStream(decodedBytes );
//        DataOutputStream out = new DataOutputStream(new  BufferedOutputStream(new FileOutputStream(new File(webrootDir))));
//        int c;
//        while((c = is.read()) != -1) {
//            out.writeByte(c);
//        }
//        out.close();
//        is.close();

        fileHelper.saveBinaryFileToLocalPath(pdfBinaryFile, folderPath, fileName);

        fileHelper.ftpFileToAIM(fileName, folderPath, quoteID, dataSource_aim);

        return "good"
    }

    def createCertificatePDF(){
        log.info "INTELLEDOX CERT"
//        log.info "JSON ==== " + jsonSerial

        def soapXML = """<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>8285f070-4e75-4ab2-a265-e81d7e4b2517</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>2c1ce06a-100f-40c8-b4d4-af4057349532</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<certificate>
\t\t
\t\t<date>n</date>
\t\t<producer>n</producer>
\t\t<producerAddress>n</producerAddress>
\t\t<insured>n</insured>
\t\t<insuredAddress>n</insuredAddress>
\t\t<contactName>n</contactName>
\t\t<contactPhone>n</contactPhone>
\t\t<contactFax>n</contactFax>
\t\t<contactEmail>n</contactEmail>
\t\t<insurer>n</insurer>
\t\t<NAIC>n</NAIC>
\t\t<certificateNumber>n</certificateNumber>
\t\t<revisionNumber>n</revisionNumber>

\t\t<insrltrGen>A</insrltrGen>
\t\t<cbGenCommercialGeneralLiability>cb</cbGenCommercialGeneralLiability>
\t\t<cbGenClaimsMade>cb</cbGenClaimsMade>
\t\t<cbGenOccur>cb</cbGenOccur>
\t\t<cbGenPolicy>cb</cbGenPolicy>
\t\t<cbGenProject>cb</cbGenProject>
\t\t<cbGenLoc>cb</cbGenLoc>
\t\t<genAddl>Y</genAddl>
\t\t<genSubr>Y</genSubr>
\t\t<generalPolicyNumber>n</generalPolicyNumber>
\t\t<genStart>n</genStart>
\t\t<genEnd>n</genEnd>
\t\t<genEachLimit>1</genEachLimit>
\t\t<genFireLimit>1</genFireLimit>
\t\t<genMedLimit>1</genMedLimit>
\t\t<genPersonalLimit>1</genPersonalLimit>
\t\t<genAggregateLimit>1</genAggregateLimit>
\t\t<genProductsLimit>1</genProductsLimit>

\t\t<insrltrAuto>A</insrltrAuto>
\t\t<cbAutoAny>cb</cbAutoAny>
\t\t<cbAutoAllOwned>cb</cbAutoAllOwned>
\t\t<cbAutoHiredAuto>cb</cbAutoHiredAuto>
\t\t<cbAutoPhysicalDamages>cb</cbAutoPhysicalDamages>
\t\t<cbAutoScheduledAuto>cb</cbAutoScheduledAuto>
\t\t<cbAutoNonOwnedAuto>cb</cbAutoNonOwnedAuto>
\t\t<autoAddl>Y</autoAddl>
\t\t<autoSubr>Y</autoSubr>
\t\t<autoPolicyNumber>n</autoPolicyNumber>
\t\t<autoStart>n</autoStart>
\t\t<autoEnd>n</autoEnd>
\t\t<autoCombinedSingleLimit>1</autoCombinedSingleLimit>
\t\t<autoBodilyInjuryPersonLimit>1</autoBodilyInjuryPersonLimit>
\t\t<autoBodilyInjuryAccidentLimit>1</autoBodilyInjuryAccidentLimit>
\t\t<autoPropertyDamageLimit>1</autoPropertyDamageLimit>

\t\t<insrltrUmbrella>A</insrltrUmbrella>
\t\t<cbUmbrellaLiab>cb</cbUmbrellaLiab>
\t\t<cbUmbrellaExcessLiab>cb</cbUmbrellaExcessLiab>
\t\t<cbUmbrellaDeductible>cb</cbUmbrellaDeductible>
\t\t<cbUmbrellaRetention>cb</cbUmbrellaRetention>
\t\t<cbUmbrellaOccur>cb</cbUmbrellaOccur>
\t\t<cbUmbrellaClaimsMade>cb</cbUmbrellaClaimsMade>
\t\t<umbrellaRetentionLimit>1</umbrellaRetentionLimit>
\t\t<umbrellaAddl>Y</umbrellaAddl>
\t\t<umbrellaSubr>Y</umbrellaSubr>
\t\t<umbrellaPolicyNumber>n</umbrellaPolicyNumber>
\t\t<umbrellaStart>n</umbrellaStart>
\t\t<umbrellaEnd>n</umbrellaEnd>
\t\t<umbrellaEachOccurrenceLimit>1</umbrellaEachOccurrenceLimit>
\t\t<umbrellaAggregateLimit>1</umbrellaAggregateLimit>

\t\t<insrltrWorkersComp>A</insrltrWorkersComp>
\t\t<cbWorkerCompMemberExcluded>cb</cbWorkerCompMemberExcluded>
\t\t<workersCompDescriptionNH>n</workersCompDescriptionNH>
\t\t<workersCompSubr>Y</workersCompSubr>
\t\t<workersCompPolicyNumber>n</workersCompPolicyNumber>
\t\t<workersCompStart>n</workersCompStart>
\t\t<workersCompEnd>n</workersCompEnd>
\t\t<cbWorkersCompStatutoryLimits>cb</cbWorkersCompStatutoryLimits>
\t\t<cbWorkersCompOther>cb</cbWorkersCompOther>
\t\t<workersCompEachAccidentLimit>1</workersCompEachAccidentLimit>
\t\t<workersCompDiseaseEmployeeLimit>1</workersCompDiseaseEmployeeLimit>
\t\t<workersCompDiseasePolicyLimit>1</workersCompDiseasePolicyLimit>

\t\t<insrltrOther>A</insrltrOther>
\t\t<riskType>n</riskType>
\t\t<otherAddl>Y</otherAddl>
\t\t<otherSubr>Y</otherSubr>
\t\t<otherPolicyNumber>n</otherPolicyNumber>
\t\t<otherStart>n</otherStart>
\t\t<otherEnd>n</otherEnd>
\t\t<otherLimit>1</otherLimit>

\t\t<additionalRemarks>Remarks</additionalRemarks>
\t\t<certificateHolder>Cert Holder</certificateHolder>
\t\t
\t</certificate>
</application>]]></int:Data>
                </int:ProvidedData>
            </int:providedData>
            <int:options>
                <int:ReturnDocuments>true</int:ReturnDocuments>
                <int:RunProviders>false</int:RunProviders>
                <int:LogGeneration>false</int:LogGeneration>
            </int:options>
        </int:GenerateWithData>
    </x:Body>
</x:Envelope>"""

        log.info soapXML

        def client = new SOAPClient('http://138.91.159.55/Produce/Service/GenerateDoc.asmx?WSDL')
        client.authorization = new HTTPBasicAuthorization("admin", "admin")
        def response = client.send(SOAPAction:'http://services.dpm.com.au/intelledox/GenerateWithData', soapXML)

        log.info response.text

        def a = new XmlSlurper().parseText(response.text)
        def nodeToSerialize = a."**".find {it.name() == 'BinaryFile'}

//        def nodeAsText = XmlUtil.serialize()
//        log.info nodeToSerialize.text()
        def webrootDir = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/${jsonSerial.getAt("quoteID")}/testcert.pdf");
//        DataOutputStream os = new DataOutputStream(new FileOutputStream(webrootDir));
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] decodedBytes = decoder.decodeBuffer(nodeToSerialize.text());
//        os.writeBytes(decodedBytes)
////        os.writeInt(nodeToSerialize.text());
//        os.close();


//        byte[] biteToRead = texto.getBytes();
        InputStream is = new ByteArrayInputStream(decodedBytes );
        DataOutputStream out = new DataOutputStream(new  BufferedOutputStream(new FileOutputStream(new File(webrootDir))));
        int c;
        while((c = is.read()) != -1) {
            out.writeByte(c);
        }
        out.close();
        is.close();

        return "good"
    }


    def getCertificateBytes(params){
        log.info "INTELLEDOX CERT BYTES"
        log.info params

        def soapXML = """<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>8285f070-4e75-4ab2-a265-e81d7e4b2517</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>2c1ce06a-100f-40c8-b4d4-af4057349532</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<certificate>
\t\t
\t\t<date>n</date>
\t\t<producer>n</producer>
\t\t<producerAddress>n</producerAddress>
\t\t<insured>n</insured>
\t\t<insuredAddress>n</insuredAddress>
\t\t<contactName>n</contactName>
\t\t<contactPhone>n</contactPhone>
\t\t<contactFax>n</contactFax>
\t\t<contactEmail>n</contactEmail>
\t\t<insurer>n</insurer>
\t\t<NAIC>n</NAIC>
\t\t<certificateNumber>n</certificateNumber>
\t\t<revisionNumber>n</revisionNumber>

\t\t<insrltrGen>A</insrltrGen>
\t\t<cbGenCommercialGeneralLiability>cb</cbGenCommercialGeneralLiability>
\t\t<cbGenClaimsMade>cb</cbGenClaimsMade>
\t\t<cbGenOccur>cb</cbGenOccur>
\t\t<cbGenPolicy>cb</cbGenPolicy>
\t\t<cbGenProject>cb</cbGenProject>
\t\t<cbGenLoc>cb</cbGenLoc>
\t\t<genAddl>Y</genAddl>
\t\t<genSubr>Y</genSubr>
\t\t<generalPolicyNumber>n</generalPolicyNumber>
\t\t<genStart>n</genStart>
\t\t<genEnd>n</genEnd>
\t\t<genEachLimit>1</genEachLimit>
\t\t<genFireLimit>1</genFireLimit>
\t\t<genMedLimit>1</genMedLimit>
\t\t<genPersonalLimit>1</genPersonalLimit>
\t\t<genAggregateLimit>1</genAggregateLimit>
\t\t<genProductsLimit>1</genProductsLimit>

\t\t<insrltrAuto>A</insrltrAuto>
\t\t<cbAutoAny>cb</cbAutoAny>
\t\t<cbAutoAllOwned>cb</cbAutoAllOwned>
\t\t<cbAutoHiredAuto>cb</cbAutoHiredAuto>
\t\t<cbAutoPhysicalDamages>cb</cbAutoPhysicalDamages>
\t\t<cbAutoScheduledAuto>cb</cbAutoScheduledAuto>
\t\t<cbAutoNonOwnedAuto>cb</cbAutoNonOwnedAuto>
\t\t<autoAddl>Y</autoAddl>
\t\t<autoSubr>Y</autoSubr>
\t\t<autoPolicyNumber>n</autoPolicyNumber>
\t\t<autoStart>n</autoStart>
\t\t<autoEnd>n</autoEnd>
\t\t<autoCombinedSingleLimit>1</autoCombinedSingleLimit>
\t\t<autoBodilyInjuryPersonLimit>1</autoBodilyInjuryPersonLimit>
\t\t<autoBodilyInjuryAccidentLimit>1</autoBodilyInjuryAccidentLimit>
\t\t<autoPropertyDamageLimit>1</autoPropertyDamageLimit>

\t\t<insrltrUmbrella>A</insrltrUmbrella>
\t\t<cbUmbrellaLiab>cb</cbUmbrellaLiab>
\t\t<cbUmbrellaExcessLiab>cb</cbUmbrellaExcessLiab>
\t\t<cbUmbrellaDeductible>cb</cbUmbrellaDeductible>
\t\t<cbUmbrellaRetention>cb</cbUmbrellaRetention>
\t\t<cbUmbrellaOccur>cb</cbUmbrellaOccur>
\t\t<cbUmbrellaClaimsMade>cb</cbUmbrellaClaimsMade>
\t\t<umbrellaRetentionLimit>1</umbrellaRetentionLimit>
\t\t<umbrellaAddl>Y</umbrellaAddl>
\t\t<umbrellaSubr>Y</umbrellaSubr>
\t\t<umbrellaPolicyNumber>n</umbrellaPolicyNumber>
\t\t<umbrellaStart>n</umbrellaStart>
\t\t<umbrellaEnd>n</umbrellaEnd>
\t\t<umbrellaEachOccurrenceLimit>1</umbrellaEachOccurrenceLimit>
\t\t<umbrellaAggregateLimit>1</umbrellaAggregateLimit>

\t\t<insrltrWorkersComp>A</insrltrWorkersComp>
\t\t<cbWorkerCompMemberExcluded>cb</cbWorkerCompMemberExcluded>
\t\t<workersCompDescriptionNH>n</workersCompDescriptionNH>
\t\t<workersCompSubr>Y</workersCompSubr>
\t\t<workersCompPolicyNumber>n</workersCompPolicyNumber>
\t\t<workersCompStart>n</workersCompStart>
\t\t<workersCompEnd>n</workersCompEnd>
\t\t<cbWorkersCompStatutoryLimits>cb</cbWorkersCompStatutoryLimits>
\t\t<cbWorkersCompOther>cb</cbWorkersCompOther>
\t\t<workersCompEachAccidentLimit>1</workersCompEachAccidentLimit>
\t\t<workersCompDiseaseEmployeeLimit>1</workersCompDiseaseEmployeeLimit>
\t\t<workersCompDiseasePolicyLimit>1</workersCompDiseasePolicyLimit>

\t\t<insrltrOther>A</insrltrOther>
\t\t<riskType>n</riskType>
\t\t<otherAddl>Y</otherAddl>
\t\t<otherSubr>Y</otherSubr>
\t\t<otherPolicyNumber>n</otherPolicyNumber>
\t\t<otherStart>n</otherStart>
\t\t<otherEnd>n</otherEnd>
\t\t<otherLimit>1</otherLimit>

\t\t<additionalRemarks>Remarks</additionalRemarks>
\t\t<certificateHolder>Cert Holder</certificateHolder>
\t\t
\t</certificate>
</application>]]></int:Data>
                </int:ProvidedData>
            </int:providedData>
            <int:options>
                <int:ReturnDocuments>true</int:ReturnDocuments>
                <int:RunProviders>false</int:RunProviders>
                <int:LogGeneration>false</int:LogGeneration>
            </int:options>
        </int:GenerateWithData>
    </x:Body>
</x:Envelope>"""

        log.info soapXML

        def client = new SOAPClient('http://138.91.159.55/Produce/Service/GenerateDoc.asmx?WSDL')
        client.authorization = new HTTPBasicAuthorization("admin", "admin")
        def response = client.send(SOAPAction:'http://services.dpm.com.au/intelledox/GenerateWithData', soapXML)

        log.info response.text

        def a = new XmlSlurper().parseText(response.text)
        def nodeToSerialize = a."**".find {it.name() == 'BinaryFile'}

//        def nodeAsText = XmlUtil.serialize()
//        log.info nodeToSerialize.text()
//        def webrootDir = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/${jsonSerial.getAt("quoteID")}/testcert.pdf");
//        DataOutputStream os = new DataOutputStream(new FileOutputStream(webrootDir));
        BASE64Decoder decoder = new BASE64Decoder();
//        log.info nodeToSerialize.text()
        byte[] decodedBytes = decoder.decodeBuffer(nodeToSerialize.text());
//        os.writeBytes(decodedBytes)
////        os.writeInt(nodeToSerialize.text());
//        os.close();


//        byte[] biteToRead = texto.getBytes();
//        InputStream is = new ByteArrayInputStream(decodedBytes );
//        DataOutputStream out = new DataOutputStream(new  BufferedOutputStream(new FileOutputStream(new File(webrootDir))));
//        int c;
//        while((c = is.read()) != -1) {
//            out.writeByte(c);
//        }
//        out.close();
//        is.close();

        return decodedBytes;
    }
}

