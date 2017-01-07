package portal.DAO

import groovy.json.JsonSlurper
import groovy.sql.Sql
import sun.misc.BASE64Decoder
import groovy.xml.*
import wslite.soap.*
import wslite.http.auth.*

class Intelledox {

    def createIndicationPDF(jsonSerial){
        log.info "INTELLEDOX"
        log.info "JSON ==== " + jsonSerial

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
\t\t<name>${jsonSerial.getAt("nameOfProductionCompany")} </name>
\t\t<date> ${jsonSerial.getAt("dateAdded").substring(1, jsonSerial.getAt("dateAdded").length()-1).split(" ")[0]} </date>
\t\t<phone> ${jsonSerial.getAt("phoneNumber")} </phone>
\t\t<address> ${jsonSerial.getAt("streetNameMailing")}, ${jsonSerial.getAt("cityMailing")}, ${jsonSerial.getAt("stateMailing")} ${jsonSerial.getAt("zipCodeMailing")} </address>
\t\t<agent> ${jsonSerial.getAt("brokerFirstName")} ${jsonSerial.getAt("brokerLastName")} </agent>
\t\t<agentEmail> ${jsonSerial.getAt("brokerEmail")} </agentEmail>
\t\t<agentPhone> ${jsonSerial.getAt("brokerPhoneNumber")} </agentPhone>
\t\t<submission> ${jsonSerial.getAt("quoteID").substring(1, jsonSerial.getAt("quoteID").length()-1)} </submission>
\t\t<dateStart> ${jsonSerial.getAt("proposedEffectiveDate")} - ${jsonSerial.getAt("proposedExpirationDate")} </dateStart>
\t\t<annualOrShort> ${jsonSerial.getAt("proposedTermLength")} </annualOrShort>
\t\t<insuranceCompany> ${jsonSerial.getAt("insuranceCompany")} </insuranceCompany>
\t\t<primaryName> ${jsonSerial.getAt("namedInsured")} </primaryName>
\t\t<primaryPhone> ${jsonSerial.getAt("phoneNumber")} </primaryPhone>
\t\t<primaryFax> ${jsonSerial.getAt("phoneNumber")} </primaryFax>
\t\t<primaryEmail> ${jsonSerial.getAt("namedInsuredEmail")} </primaryEmail>
\t\t<physicalAddress> ${jsonSerial.getAt("streetNameMailing")}, ${jsonSerial.getAt("cityMailing")}, ${jsonSerial.getAt("stateMailing")}, ${jsonSerial.getAt("zipCodeMailing")} </physicalAddress>
\t\t<website> ${jsonSerial.getAt("website")} </website>
\t</basicInfo>
\t
\t""";
        soapXML = soapXML + """
\t<premiumSummaryTable>""";

        if(jsonSerial.getAt("premSummary").split(";&&;").size() > 0) {
            log.info("PREM SUMMARY");
            jsonSerial.getAt("premSummary").split(";&&;").each{
                if(it.length() > 0){
                    soapXML = soapXML + """
\t\t<premiumSummary package="${it.split(";&;")[0]}">

\t\t\t<cost> ${it.split(";&;")[1]} </cost>
\t\t</premiumSummary>"""
                }
                else{

                }
            }
        }
        else{
            soapXML = soapXML + """
\t\t<premiumSummary package="Total">

\t\t\t<cost> 0 </cost>
\t\t</premiumSummary>"""
        }

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
        def webrootDir = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/testpdf.pdf");
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

    def createCertificatePDF(jsonSerial){
        log.info "INTELLEDOX"
        log.info "JSON ==== " + jsonSerial

        def soapXML = """<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://services.dpm.com.au/intelledox/">
    <x:Header/>
    <x:Body>
        <int:GenerateWithData>
            <int:userName>admin</int:userName>
            <int:password>admin</int:password>
            <int:projectGroupGuid>a2962264-75d3-42a6-9a48-389a7cb59520</int:projectGroupGuid>
            <int:providedData>
                <int:ProvidedData>
                    <int:DataServiceGuid>2c1ce06a-100f-40c8-b4d4-af4057349532</int:DataServiceGuid>
                    <int:Data><![CDATA[<?xml version="1.0" encoding="utf-8"?>
<application>
\t<certificate>
\t\t<date>${jsonSerial.getAt("")} </date>
\t\t<producer>${jsonSerial.getAt("")} </producer>
\t\t<producerAddress>${jsonSerial.getAt("")} </producerAddress>
\t\t<insured>${jsonSerial.getAt("")} </insured>
\t\t<insuredAddress>${jsonSerial.getAt("")} </insuredAddress>
\t\t<contactName>${jsonSerial.getAt("")} </contactName>
\t\t<contactPhone>${jsonSerial.getAt("")} </contactPhone>
\t\t<contactFax>${jsonSerial.getAt("")} </contactFax>
\t\t<contactEmail>${jsonSerial.getAt("")} </contactEmail>
\t\t<insurer>${jsonSerial.getAt("")} </insurer>
\t\t<NAIC>${jsonSerial.getAt("")} </NAIC>
\t\t<certificateNumber>${jsonSerial.getAt("")} </certificateNumber>
\t\t<revisionNumber>${jsonSerial.getAt("")} </revisionNumber>

\t\t<insrltrGen>${jsonSerial.getAt("")} </insrltrGen>
\t\t<cbGenCommercialGeneralLiability>${jsonSerial.getAt("")} </cbGenCommercialGeneralLiability>
\t\t<cbGenClaimsMade>${jsonSerial.getAt("")} </cbGenClaimsMade>
\t\t<cbGenOccur>${jsonSerial.getAt("")} </cbGenOccur>
\t\t<cbGenPolicy>${jsonSerial.getAt("")} </cbGenPolicy>
\t\t<cbGenProject>${jsonSerial.getAt("")} </cbGenProject>
\t\t<cbGenLoc>${jsonSerial.getAt("")} </cbGenLoc>
\t\t<genAddl>${jsonSerial.getAt("")} </genAddl>
\t\t<genSubr>${jsonSerial.getAt("")} </genSubr>
\t\t<generalPolicyNumber>${jsonSerial.getAt("")} </generalPolicyNumber>
\t\t<genStart>${jsonSerial.getAt("")} </genStart>
\t\t<genEnd>${jsonSerial.getAt("")} </genEnd>
\t\t<genEachLimit>${jsonSerial.getAt("")} </genEachLimit>
\t\t<genFireLimit>${jsonSerial.getAt("")} </genFireLimit>
\t\t<genMedLimit>${jsonSerial.getAt("")} </genMedLimit>
\t\t<genPersonalLimit>${jsonSerial.getAt("")} </genPersonalLimit>
\t\t<genAggregateLimit>${jsonSerial.getAt("")} </genAggregateLimit>
\t\t<genProductsLimit>${jsonSerial.getAt("")} </genProductsLimit>

\t\t<insrltrAuto>${jsonSerial.getAt("")} </insrltrAuto>
\t\t<cbAutoAny>${jsonSerial.getAt("")} </cbAutoAny>
\t\t<cbAutoAllOwned>${jsonSerial.getAt("")} </cbAutoAllOwned>
\t\t<cbAutoHiredAuto>${jsonSerial.getAt("")} </cbAutoHiredAuto>
\t\t<cbAutoPhysicalDamages>${jsonSerial.getAt("")} </cbAutoPhysicalDamages>
\t\t<cbAutoScheduledAuto>${jsonSerial.getAt("")} </cbAutoScheduledAuto>
\t\t<cbAutoNonOwnedAuto>${jsonSerial.getAt("")} </cbAutoNonOwnedAuto>
\t\t<autoAddl>${jsonSerial.getAt("")} </autoAddl>
\t\t<autoSubr>${jsonSerial.getAt("")} </autoSubr>
\t\t<autoPolicyNumber>${jsonSerial.getAt("")} </autoPolicyNumber>
\t\t<autoStart>${jsonSerial.getAt("")} </autoStart>
\t\t<autoEnd>${jsonSerial.getAt("")} </autoEnd>
\t\t<autoCombinedSingleLimit>${jsonSerial.getAt("")} </autoCombinedSingleLimit>
\t\t<autoBodilyInjuryPersonLimit>${jsonSerial.getAt("")} </autoBodilyInjuryPersonLimit>
\t\t<autoBodilyInjuryAccidentLimit>${jsonSerial.getAt("")} </autoBodilyInjuryAccidentLimit>
\t\t<autoPropertyDamageLimit>${jsonSerial.getAt("")} </autoPropertyDamageLimit>

\t\t<insrltrUmbrella>${jsonSerial.getAt("")} </insrltrUmbrella>
\t\t<cbUmbrellaLiab>${jsonSerial.getAt("")} </cbUmbrellaLiab>
\t\t<cbUmbrellaExcessLiab>${jsonSerial.getAt("")} </cbUmbrellaExcessLiab>
\t\t<cbUmbrellaDeductible>${jsonSerial.getAt("")} </cbUmbrellaDeductible>
\t\t<cbUmbrellaRetention>${jsonSerial.getAt("")} </cbUmbrellaRetention>
\t\t<cbUmbrellaOccur>${jsonSerial.getAt("")} </cbUmbrellaOccur>
\t\t<cbUmbrellaClaimsMade>${jsonSerial.getAt("")} </cbUmbrellaClaimsMade>
\t\t<umbrellaRetentionLimit>${jsonSerial.getAt("")} </umbrellaRetentionLimit>
\t\t<umbrellaAddl>${jsonSerial.getAt("")} </umbrellaAddl>
\t\t<umbrellaSubr>${jsonSerial.getAt("")} </umbrellaSubr>
\t\t<umbrellaPolicyNumber>${jsonSerial.getAt("")} </umbrellaPolicyNumber>
\t\t<umbrellaStart>${jsonSerial.getAt("")} </umbrellaStart>
\t\t<umbrellaEnd>${jsonSerial.getAt("")} </umbrellaEnd>
\t\t<umbrellaEachOccurrenceLimit>${jsonSerial.getAt("")} </umbrellaEachOccurrenceLimit>
\t\t<umbrellaAggregateLimit>${jsonSerial.getAt("")} </umbrellaAggregateLimit>

\t\t<insrltrWorkersComp>${jsonSerial.getAt("")} </insrltrWorkersComp>
\t\t<cbWorkerCompMemberExcluded>${jsonSerial.getAt("")} </cbWorkerCompMemberExcluded>
\t\t<workersCompDescriptionNH>${jsonSerial.getAt("")} </workersCompDescriptionNH>
\t\t<workersCompSubr>${jsonSerial.getAt("")} </workersCompSubr>
\t\t<workersCompPolicyNumber>${jsonSerial.getAt("")} </workersCompPolicyNumber>
\t\t<workersCompStart>${jsonSerial.getAt("")} </workersCompStart>
\t\t<workersCompEnd>${jsonSerial.getAt("")} </workersCompEnd>
\t\t<cbWorkersCompStatutoryLimits>${jsonSerial.getAt("")} </cbWorkersCompStatutoryLimits>
\t\t<cbWorkersCompOther>${jsonSerial.getAt("")} </cbWorkersCompOther>
\t\t<workersCompEachAccidentLimit>${jsonSerial.getAt("")} </workersCompEachAccidentLimit>
\t\t<workersCompDiseaseEmployeeLimit>${jsonSerial.getAt("")} </workersCompDiseaseEmployeeLimit>
\t\t<workersCompDiseasePolicyLimit>${jsonSerial.getAt("")} </workersCompDiseasePolicyLimit>

\t\t<insrltrOther>${jsonSerial.getAt("")} </insrltrOther>
\t\t<riskType>${jsonSerial.getAt("")} </riskType>
\t\t<otherAddl>${jsonSerial.getAt("")} </otherAddl>
\t\t<otherSubr>${jsonSerial.getAt("")} </otherSubr>
\t\t<otherPolicyNumber>${jsonSerial.getAt("")} </otherPolicyNumber>
\t\t<otherStart>${jsonSerial.getAt("")} </otherStart>
\t\t<otherEnd>${jsonSerial.getAt("")} </otherEnd>
\t\t<otherLimit>${jsonSerial.getAt("")} </otherLimit>

\t\t<additionalRemarks>${jsonSerial.getAt("")} </additionalRemarks>
\t\t<certificateHolder>${jsonSerial.getAt("")} </certificateHolder>

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
        def webrootDir = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/testpdf.pdf");
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
}