package portal.DAO

import groovy.json.JsonSlurper
import groovy.sql.Sql
import portal.DAO.Intelledox;

class AIMSQL {
    Intelledox asyncController = new Intelledox();

    def stateAbbrevToNameMAP = [
            AL: "Alabama",
            AK: "Alaska",
            AB: "Alberta",
            AZ: "Arizona",
            AR: "Arkansas",
            BC: "British Columbia",
            CA: "California",
            CO: "Colorado",
            CT: "Connecticut",
            DE: "Delaware",
            DC: "District Of Columbia",
            FL: "Florida",
            GA: "Georgia",
            GU: "Guam",
            HI: "Hawaii",
            ID: "Idaho",
            IL: "Illinois",
            IN: "Indiana",
            IA: "Iowa",
            KS: "Kansas",
            KY: "Kentucky",
            LA: "Louisiana",
            ME: "Maine",
            MB: "Manitoba",
            MD: "Maryland",
            MA: "Massachusetts",
            MI: "Michigan",
            MN: "Minnesota",
            MS: "Mississippi",
            MO: "Missouri",
            MT: "Montana",
            NE: "Nebraska",
            NV: "Nevada",
            NB: "New Brunswick",
            NH: "New Hampshire",
            NJ: "New Jersey",
            NM: "New Mexico",
            NY: "New York",
            NF: "Newfoundland",
            NC: "North Carolina",
            ND: "North Dakota",
            NT: "Northwest Territories",
            NS: "Nova Scotia",
            NU: "Nunavut",
            OH: "Ohio",
            OK: "Oklahoma",
            ON: "Ontario",
            OR: "Oregon",
            PA: "Pennsylvania",
            PE: "Prince Edward Island",
            PR: "Puerto Rico",
            QC: "Quebec",
            RI: "Rhode Island",
            SK: "Saskatchewan",
            SC: "South Carolina",
            SD: "South Dakota",
            TN: "Tennessee",
            TX: "Texas",
            UT: "Utah",
            VT: "Vermont",
            VI: "Virgin Islands",
            VA: "Virginia",
            WA: "Washington",
            WV: "West Virginia",
            WI: "Wisconsin",
            WY: "Wyoming",
            YT: "Yukon Territory"
    ]




    def test(){
        log.info "testDAO"

    }

    def saveNewSubmission(policyFormJSON, dataSource_aim, user, underwriter){
        log.info "AIMDAO SAVE"
        log.info user.email
        def testjson = new JsonSlurper().parseText(policyFormJSON)
        log.info testjson

        def quoteID =0;
        def allQuoteIDs = "";
//        log.info testjson.getAt("namedInsured")
        def stateNameToAbbrevMAP = [
                "":"",
                Alabama:"AL",
                Alaska:"AK",
                Arizona:"AZ",
                Arkansas:"AR",
                California:"CA",
                Colorado:"CO",
                Connecticut:"CT",
                Delaware:"DE",
                "District Of Columbia":"DC",
                Florida:"FL",
                Georgia:"GA",
                Hawaii:"HI",
                Idaho:"ID",
                Illinois:"IL",
                Indiana:"IN",
                Iowa:"IA",
                Kansas:"KS",
                Kentucky:"KY",
                Louisiana:"LA",
                Maine:"ME",
                Maryland:"MD",
                Massachusetts:"MA",
                Michigan:"MI",
                Minnesota:"MN",
                Mississippi:"MS",
                Missouri:"MO",
                Montana:"MT",
                Nebraska:"NE",
                Nevada:"NV",
                "New Hampshire":"NH",
                "New Jersey":"NJ",
                "New Mexico":"NM",
                "New York":"NY",
                "North Carolina":"NC",
                "North Dakota":"ND",
                Ohio:"OH",
                Oklahoma:"OK",
                Oregon:"OR",
                Pennsylvania:"PA",
                "Rhode Island":"RI",
                "South Carolina":"SC",
                "South Dakota":"SD",
                Tennessee:"TN",
                Texas:"TX",
                Utah:"UT",
                Vermont:"VT",
                Virginia:"VA",
                Washington:"WA",
                "West Virginia":"WV",
                Wisconsin:"WI",
                Wyoming:"WY",
                "Guam": "GU",
                'Puerto Rico':"PR",
                "Virgin Islands":"VI"
        ]

        def businessStructureID = [
                "":"",
                'corporation':"COR",
                'individual':"IND",
                "LLC": "LC",
                'LLP':"LP",
                "partnership":"PAR",
                "soleProprietorship":"SP"
        ]

        def insuredID = 0;
        Sql aimsql = new Sql(dataSource_aim)
        aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
            log.info "InsuredID $num"
            insuredID = num
        }


        def now = new Date()
        def timestamp = now.toTimestamp()
        log.info testjson.getAt("stateMailing")

        /////////SAVE INSURED
        def map = [InsuredID:"'${insuredID}'",
                   NamedInsured: "'${testjson.getAt("namedInsured")}'",
                   NameType: "'B'",
                   DBAName: "'${testjson.getAt("namedInsured")}'",
                   Prefix: 'NULL',
                   First_Name: 'NULL',
                   Last_Name: 'NULL',
                   Middle_Name: 'NULL',
                   Suffix: 'NULL',
                   CombinedName: 'NULL',
                   Address1: "'${testjson.getAt("streetNameMailing")}'",
                   Address2: 'NULL',
                   City: "'${testjson.getAt("cityMailing")}'",
                   State: "'${testjson.getAt("stateMailing")}'",
                   Zip: "'${testjson.getAt("zipCodeMailing")}'",
                   AddressID: 'NULL',
                   ProducerID: "'TVD'",
                   AcctExec: "'UserID'",
                   AcctAsst: 'NULL',
                   CSR: 'NULL',
                   Entity: 'NULL',
                   FormMakerName: 'NULL',
                   DirectBillFlag: "'N'",
                   MailAddress1: "'${testjson.getAt("streetNameMailing")}'",
                   MailAddress2: 'NULL',
                   MailCity: "'${testjson.getAt("cityMailing")}'",
                   MailState: "'${testjson.getAt("stateMailing")}'",
                   MailZip: "'${testjson.getAt("zipCodeMailing")}'",
                   ContactName: 'NULL',
                   Phone: "'${testjson.getAt("phoneNumber")}'",
                   Fax: 'NULL',
                   EMail: "'${testjson.getAt("namedInsuredEmail")}'",
                   DateOfBirth: 'NULL',
                   SSN: "'${testjson.getAt("FEINSSN")}'",
                   PhoneExt: 'NULL',
                   WorkPhone: 'NULL',
                   AcctExecID: "'UserID'",
                   AcuityKey: 'NULL',
                   DateAdded: "'${timestamp.format("MM/dd/yyyy hh:mm:ss a")}'",
                   VehicleCount: 'NULL',
                   BusinessStructureID: "'${businessStructureID[testjson.getAt("businessStructure")]}'",
                   NCCI: "'${testjson.getAt("NCCI")}'",
                   Employees: 'NULL',
                   Payroll: 'NULL',
                   SicID: "'${testjson.getAt("SIC")}'",
                   Attention: 'NULL',
                   ContactID: 'NULL',
                   ClaimCount: 'NULL',
                   PolicyCount: 'NULL',
                   TeamID: "'TeamID'",
                   InsuredKey_PK: "'${insuredID}'",
                   GroupKey_FK: 'NULL',
                   FlagProspect: "'N'",
                   FlagAssigned: 'NULL',
                   MembershipTypeID: 'NULL',
                   ParentKey_FK: 'NULL',
                   License: 'NULL',
                   CareOfKey_FK: 'NULL',
                   Website: "'${testjson.getAt("website")}'",
                   SLA: 'NULL',
                   Exempt: 'NULL',
                   RackleyClientKey_FK: 'NULL',
                   MapToID: 'NULL',
                   Notes: 'NULL',
                   Country: "'US'",
                   FileNo: 'NULL',
                   DateConverted: 'NULL',
                   UserDefinedStr1: 'NULL',
                   UserDefinedStr2: 'NULL',
                   UserDefinedStr3: 'NULL',
                   UserDefinedStr4: 'NULL',
                   UserDefinedDate1: 'NULL',
                   UserDefinedValue1: 'NULL',
                   CountryID: 'NULL',
                   ParentInsuredName : 'NULL'
        ]
        aimsql.execute "insert into Insured (InsuredID, NamedInsured, NameType, DBAName, Prefix, First_Name, Last_Name,\n" +
                "                Middle_Name, Suffix, CombinedName, Address1, Address2, City, State,\n" +
                "                Zip, AddressID, ProducerID, AcctExec, AcctAsst, CSR, Entity, FormMakerName,\n" +
                "                DirectBillFlag, MailAddress1, MailAddress2, MailCity, MailState, MailZip,\n" +
                "                ContactName, Phone, Fax, EMail, DateOfBirth, SSN, PhoneExt, WorkPhone,\n" +
                "                AcctExecID, AcuityKey, DateAdded, VehicleCount, BusinessStructureID,\n" +
                "                NCCI, Employees, Payroll, SicID, Attention, ContactID, ClaimCount, PolicyCount,\n" +
                "                TeamID, InsuredKey_PK, GroupKey_FK, FlagProspect, FlagAssigned, MembershipTypeID,\n" +
                "                ParentKey_FK, License, CareOfKey_FK, Website, SLA, Exempt, RackleyClientKey_FK,\n" +
                "                MapToID, Notes, Country, FileNo, DateConverted, UserDefinedStr1, UserDefinedStr2,\n" +
                "                UserDefinedStr3, UserDefinedStr4, UserDefinedDate1, UserDefinedValue1,\n" +
                "                CountryID, ParentInsuredName) values " +
                "($map.InsuredID, $map.NamedInsured, $map.NameType, $map.DBAName, $map.Prefix, $map.First_Name, $map.Last_Name, $map.Middle_Name, " +
                "$map.Suffix, $map.CombinedName, $map.Address1, $map.Address2, $map.City, $map.State, $map.Zip, $map.AddressID, $map.ProducerID, $map.AcctExec, " +
                "$map.AcctAsst, $map.CSR, $map.Entity, $map.FormMakerName, $map.DirectBillFlag, $map.MailAddress1, $map.MailAddress2, $map.MailCity, $map.MailState, " +
                "$map.MailZip, $map.ContactName, $map.Phone, $map.Fax, $map.EMail, $map.DateOfBirth, $map.SSN, $map.PhoneExt, $map.WorkPhone, $map.AcctExecID, " +
                "$map.AcuityKey, $map.DateAdded, $map.VehicleCount, $map.BusinessStructureID, $map.NCCI, $map.Employees, $map.Payroll, $map.SicID, $map.Attention, " +
                "$map.ContactID, $map.ClaimCount, $map.PolicyCount, $map.TeamID, $map.InsuredKey_PK, $map.GroupKey_FK, $map.FlagProspect, $map.FlagAssigned, " +
                "$map.MembershipTypeID, $map.ParentKey_FK, $map.License, $map.CareOfKey_FK, $map.Website, $map.SLA, $map.Exempt, $map.RackleyClientKey_FK, $map.MapToID, " +
                "$map.Notes, $map.Country, $map.FileNo, $map.DateConverted, $map.UserDefinedStr1, $map.UserDefinedStr2, $map.UserDefinedStr3, $map.UserDefinedStr4, " +
                "$map.UserDefinedDate1, $map.UserDefinedValue1, $map.CountryID, $map.ParentInsuredName)"

        def referenceID = 0;
        testjson.getAt("productID").split(";").each{
            log.info it
            aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
                log.info "ReferenceID $num"
                referenceID = num
            }



            aimsql.call("{call dbo.GetSubmitNumber(${Sql.VARCHAR})}") { num ->
                log.info "Quote ID $num"
                quoteID = num
            }

            def productMap = [:]

            def productLimits = "";
            def productDeduct = "";
            def productSubject = "";
            def productEndorse = "";
            def productLobDistrib = "";
            def productCompanyID = ""

            def productID = it;
            log.info "PRODUCT ID === " + productID
            aimsql.eachRow("SELECT Limits, Deduct, Subject, Endorse, LobDistrib, ActiveFlag, CompanyID " +
                    "FROM Product " +
                    "WHERE (ProductID = '" + productID + "') ") {
                productMap['productLimits'] = it.Limits
                productMap['productDeduct'] = it.Deduct
                productMap['productSubject'] = it.Subject
                productMap['productEndorse'] = it.Endorse
                productMap['productLobDistrib'] = it.LobDistrib
                productMap['productCompanyID'] = it.CompanyID
                log.info "Product === " + it
            }

            def companyMap = [:]
            aimsql.eachRow("SELECT Name " +
                    "FROM Company " +
                    "WHERE (CompanyID = '" + productMap['productCompanyID'] + "') ") {

                log.info "COMPANY === " + it.Name
                companyMap['companyName'] = it.Name
            }

            log.info "Quote ID: " + quoteID
            /////////SAVE VERSION
            def proposedTermLength = testjson.getAt("proposedTermLength").split(" ")[0].toInteger();
            log.info proposedTermLength


            def limitsString = "";
            def deductsString = "";
            def coverageID = "";
            def stringLOB = "";
            if(productID == "PIP CHOI" || productID == "PIP 1" || productID == "PIP 2"|| productID == "PIP 3"|| productID == "PIP 4"|| productID == "PIP 5"){
                limitsString = testjson.getAt("EPKGlimitsString");
                deductsString = testjson.getAt("EPKGdeductsString");
                coverageID = "EPKG";
                if(testjson.getAt("epkgLOB").length() > 1){
                    stringLOB = testjson.getAt("epkgLOB");
                }
            }
            else if(productID == "BARCPKSF" || productID == "BARCPKGP"||productID == "BARCPKGC"){
                limitsString = testjson.getAt("CPKlimitsString");
                deductsString = testjson.getAt("CPKdeductsString");
                coverageID = "CPK";

                if(testjson.getAt("cpkLOB").length() > 1){
                    stringLOB = testjson.getAt("cpkLOB");
                }
                else if(testjson.getAt("cglLOB").length() > 1){
                    stringLOB = testjson.getAt("cglLOB");
                }
            }




            def count = 0;
            for (def i = 0; i < stringLOB.split(";&&;").size(); i++ ){
                count++
            }
            for(; count < 9; count++){
                stringLOB = stringLOB + " ;&; " + " ;&; " +  " ;&&;"
            }

            log.info "LOB SIZE ===== " + stringLOB.split(";&&;").size();
            log.info "LOB ===== " + stringLOB.split(";&&;");
            log.info "LOB ===== " + stringLOB.split(";&&;")[0].split(";&;").size();
            log.info "LOB ===== " + stringLOB.split(";&&;")[0].split(";&;")[1];
            log.info "LIMITS ===== " + productMap['productLimits'].replaceAll("'","''");

            def LOB_Coverage1 = "";
            def LOB_Coverage2 = "";
            def LOB_Coverage3 = "";
            def LOB_Coverage4 = "";
            def LOB_Coverage5 = "";
            def LOB_Coverage6 = "";
            def LOB_Coverage7 = "";
            def LOB_Coverage8 = "";
            def LOB_Coverage9 = "";

            LOB_Coverage1 = "";
            LOB_Coverage2 = "";
            LOB_Coverage3 = "";
            LOB_Coverage4 = "";
            LOB_Coverage5 = "";
            LOB_Coverage6 = "";
            LOB_Coverage7 = "";
            LOB_Coverage8 = "";
            LOB_Coverage9 = "";

            def LOB_Limit1 = "";
            def LOB_Limit2 = "";
            def LOB_Limit3 = "";
            def LOB_Limit4 = "";
            def LOB_Limit5 = "";
            def LOB_Limit6 = "";
            def LOB_Limit7 = "";
            def LOB_Limit8 = "";
            def LOB_Limit9 = "";


            def LOB_Limit1Value = 0;
            def LOB_Limit2Value = 0;
            def LOB_Limit3Value = 0;
            def LOB_Limit4Value = 0;
            def LOB_Limit5Value = 0;
            def LOB_Limit6Value = 0;
            def LOB_Limit7Value = 0;
            def LOB_Limit8Value = 0;
            def LOB_Limit9Value = 0;

            def LOB_DeductType1 = "";
            def LOB_DeductType2 = "";


            def deductVal1 = "";
            def deductVal2 = "";

            def LOB_Deduct1 = "";
            def LOB_Deduct2 =  "";

            LOB_Deduct1 = "";
            LOB_Deduct2 = "";

            def LOB_Deduct1Value= 0;
            def LOB_Deduct2Value =  0;

//            def LOB_Coverage1 = stringLOB.split(";&&;")[0].split(";&;")[0]
//            def LOB_Coverage2 = stringLOB.split(";&&;")[1].split(";&;")[0]
//            def LOB_Coverage3 = stringLOB.split(";&&;")[2].split(";&;")[0]
//            def LOB_Coverage4 = stringLOB.split(";&&;")[3].split(";&;")[0]
//            def LOB_Coverage5 = stringLOB.split(";&&;")[4].split(";&;")[0]
//            def LOB_Coverage6 = stringLOB.split(";&&;")[5].split(";&;")[0]
//            def LOB_Coverage7 = stringLOB.split(";&&;")[6].split(";&;")[0]
//            def LOB_Coverage8 = stringLOB.split(";&&;")[7].split(";&;")[0]
//            def LOB_Coverage9 = stringLOB.split(";&&;")[8].split(";&;")[0]
//
//            LOB_Coverage1 = LOB_Coverage1.length() > 31 ? LOB_Coverage1.substring(0,31) : LOB_Coverage1
//            LOB_Coverage2 = LOB_Coverage2.length() > 31 ? LOB_Coverage2.substring(0,31) : LOB_Coverage2
//            LOB_Coverage3 = LOB_Coverage3.length() > 31 ? LOB_Coverage3.substring(0,31) : LOB_Coverage3
//            LOB_Coverage4 = LOB_Coverage4.length() > 31 ? LOB_Coverage4.substring(0,31) : LOB_Coverage4
//            LOB_Coverage5 = LOB_Coverage5.length() > 31 ? LOB_Coverage5.substring(0,31) : LOB_Coverage5
//            LOB_Coverage6 = LOB_Coverage6.length() > 31 ? LOB_Coverage6.substring(0,31) : LOB_Coverage6
//            LOB_Coverage7 = LOB_Coverage7.length() > 31 ? LOB_Coverage7.substring(0,31) : LOB_Coverage7
//            LOB_Coverage8 = LOB_Coverage8.length() > 31 ? LOB_Coverage8.substring(0,31) : LOB_Coverage8
//            LOB_Coverage9 = LOB_Coverage9.length() > 31 ? LOB_Coverage9.substring(0,31) : LOB_Coverage9
//
//            def LOB_Limit1 = stringLOB.split(";&&;")[0].split(";&;")[1];
//            def LOB_Limit2 = stringLOB.split(";&&;")[1].split(";&;")[1];
//            def LOB_Limit3 = stringLOB.split(";&&;")[2].split(";&;")[1];
//            def LOB_Limit4 = stringLOB.split(";&&;")[3].split(";&;")[1];
//            def LOB_Limit5 = stringLOB.split(";&&;")[4].split(";&;")[1];
//            def LOB_Limit6 = stringLOB.split(";&&;")[5].split(";&;")[1];
//            def LOB_Limit7 = stringLOB.split(";&&;")[6].split(";&;")[1];
//            def LOB_Limit8 = stringLOB.split(";&&;")[7].split(";&;")[1];
//            def LOB_Limit9 = stringLOB.split(";&&;")[8].split(";&;")[1];
//
//
//            def LOB_Limit1Value = stringLOB.split(";&&;")[0].split(";&;")[1].trim().isEmpty() ? "" : Double.parseDouble(stringLOB.split(";&&;")[0].split(";&;")[1].replaceAll("[^\\d.]", ""));
//            def LOB_Limit2Value = stringLOB.split(";&&;")[1].split(";&;")[1].trim().isEmpty() ? "" : Double.parseDouble(stringLOB.split(";&&;")[1].split(";&;")[1].replaceAll("[^\\d.]", ""));
//            def LOB_Limit3Value = stringLOB.split(";&&;")[2].split(";&;")[1].trim().isEmpty() ? "" : Double.parseDouble(stringLOB.split(";&&;")[2].split(";&;")[1].replaceAll("[^\\d.]", ""));
//            def LOB_Limit4Value = stringLOB.split(";&&;")[3].split(";&;")[1].trim().isEmpty() ? "" : Double.parseDouble(stringLOB.split(";&&;")[3].split(";&;")[1].replaceAll("[^\\d.]", ""));
//            def LOB_Limit5Value = stringLOB.split(";&&;")[4].split(";&;")[1].trim().isEmpty() ? "" : Double.parseDouble(stringLOB.split(";&&;")[4].split(";&;")[1].replaceAll("[^\\d.]", ""));
//            def LOB_Limit6Value = stringLOB.split(";&&;")[5].split(";&;")[1].trim().isEmpty() ? "" : Double.parseDouble(stringLOB.split(";&&;")[5].split(";&;")[1].replaceAll("[^\\d.]", ""));
//            def LOB_Limit7Value = stringLOB.split(";&&;")[6].split(";&;")[1].trim().isEmpty() ? "" : Double.parseDouble(stringLOB.split(";&&;")[6].split(";&;")[1].replaceAll("[^\\d.]", ""));
//            def LOB_Limit8Value = stringLOB.split(";&&;")[7].split(";&;")[1].trim().isEmpty() ? "" : Double.parseDouble(stringLOB.split(";&&;")[7].split(";&;")[1].replaceAll("[^\\d.]", ""));
//            def LOB_Limit9Value = stringLOB.split(";&&;")[8].split(";&;")[1].trim().isEmpty() ? "" : Double.parseDouble(stringLOB.split(";&&;")[8].split(";&;")[1].replaceAll("[^\\d.]", ""));
//
//
//            def LOB_DeductType1 = stringLOB.split(";&&;")[0].split(";&;")[0];
//            def LOB_DeductType2 = stringLOB.split(";&&;")[1].split(";&;")[0];
//
//            LOB_DeductType1 = LOB_DeductType1.length() > 31 ? LOB_DeductType1.substring(0,31) : LOB_DeductType1
//            LOB_DeductType2 = LOB_DeductType2.length() > 31 ? LOB_DeductType2.substring(0,31) : LOB_DeductType2
//
//            def deductVal1 = "";
//
//            if(stringLOB.split(";&&;")[0].split(";&;").size() >=3){
//                deductVal1 = stringLOB.split(";&&;")[0].split(";&;")[2];
//            }
//            else{
//                deductVal1 ="";
//            }
//
//            def deductVal2 = "";
//            if(stringLOB.split(";&&;")[1].split(";&;").size() >=3){
//                deductVal2 = stringLOB.split(";&&;")[1].split(";&;")[2];
//            }
//            else{
//                deductVal2 ="";
//            }
//
//            def LOB_Deduct1 = deductVal1.trim().isEmpty() ? "" : deductVal1;
//            def LOB_Deduct2 =  deductVal2.trim().isEmpty() ? "" : deductVal2;
//
//            LOB_Deduct1 = LOB_Deduct1.length() > 31 ? LOB_Deduct1.substring(0,31) : LOB_Deduct1
//            LOB_Deduct2 = LOB_Deduct2.length() > 31 ? LOB_Deduct2.substring(0,31) : LOB_Deduct2
//
//            def LOB_Deduct1Value= deductVal1.trim().replaceAll("[^\\d.]", "").isEmpty() ? "" : Double.parseDouble(deductVal1);
//            def LOB_Deduct2Value =  deductVal2.trim().replaceAll("[^\\d.]", "").isEmpty() ? "" : Double.parseDouble(deductVal2);

            log.info "TEST ===== " +  LOB_Coverage1.length()
            def versionmap = [QuoteID: "'${quoteID}'",
                              VerOriginal: "'A'",
                              Version: "'A'",
                              Financed: "'Y'",
                              Brokerage: "'N'" ,
                              Indicator: "'N'" ,
                              DirectBillFlag: "'N'" ,
                              ProposedTerm: proposedTermLength ,
                              UnderLyingCoverage: "''" ,
                              PolicyTerm: "'${testjson.getAt("proposedTermLength")}'" ,
                              VersionID: "'${quoteID}A'" ,
                              CompanyID:"'${productMap['productCompanyID'].replaceAll("'","''")}'",
                              ProductID:"'${productID}'" ,
                              Premium: "'${testjson.getAt("premiumAllLOBTotal").replaceAll('[$,]', '')}'",
                              Quoted:"'${timestamp.format('yyyyMMdd HH:mm:ss.SSS')}'",
                              Limits:"'${limitsString}'",
                              Subject:"'${productMap['productSubject'].replaceAll("'","''")}'",
                              Endorsement: "'${productMap['productEndorse'].replaceAll("'","''")}'",
                              Taxed: "'Y'",
                              MEP: "''",
                              Rate:"''",
                              GrossComm:"''",
                              AgentComm:"''",
                              Deductible:"'${deductsString}'",
                              CoInsure:"''",
                              StatusID:"'QO'",
                              MarketID:"'SAFELL'",
                              Tax1:"''",
                              Tax2:"''",
                              Tax3:"''",
                              Tax4:"''",
                              FormID:"'OCR'",
                              RateInfo:"''",
                              CommPaid:"''",
                              ProposedEffective:"''",
                              ProposedExpiration:"''",
                              TaxDistrib:"''",
                              DeductType:"''",
                              LOB_Limit1:"'${LOB_Limit1}'",
                              LOB_Limit2:"'${LOB_Limit2}'",
                              LOB_Limit3:"'${LOB_Limit3}'",
                              LOB_Limit4:"'${LOB_Limit4}'",
                              LOB_Limit5:"'${LOB_Limit5}'",
                              LOB_Limit6:"'${LOB_Limit6}'",
                              LOB_Deduct1:"'${LOB_Deduct1}'",
                              LOB_Deduct2:"'${LOB_Deduct2}'",
                              LOB_Limit1Value:"'${LOB_Limit1Value}'",
                              LOB_Limit2Value:"'${LOB_Limit2Value}'",
                              LOB_Limit3Value:"'${LOB_Limit3Value}'",
                              LOB_Limit4Value:"'${LOB_Limit4Value}'",
                              LOB_Limit5Value:"'${LOB_Limit5Value}'",
                              LOB_Limit6Value:"'${LOB_Limit6Value}'",
                              LOB_Deduct1Value:"'${LOB_Deduct1Value}'",
                              LOB_Deduct2Value:"'${LOB_Deduct2Value}'",
                              TerrorActStatus:"'WAIVED'",
                              FlagOverrideCalc:"'N'",
                              TerrorTaxes:"'0.00'",
                              FlagMultiOption:"''",
                              LOB_Coverage1:"'${LOB_Coverage1}'",
                              LOB_Coverage2:"'${LOB_Coverage2}'",
                              LOB_Coverage3:"'${LOB_Coverage3}'",
                              LOB_Coverage4:"'${LOB_Coverage4}'",
                              LOB_Coverage5:"'${LOB_Coverage5}'",
                              LOB_Coverage6:"'${LOB_Coverage6}'",
                              LOB_DeductType1:"'${LOB_DeductType1}'",
                              LOB_DeductType2:"'${LOB_DeductType2}'",
                              TaxwoTRIA1:"'0.00'",
                              TaxwoTRIA2:"'0.00'",
                              TaxwoTRIA3:"'0.00'",
                              TaxwoTRIA4:"'0.00'",
                              LOB_Coverage7:"'${LOB_Coverage7}'",
                              LOB_Coverage8:"'${LOB_Coverage8}'",
                              LOB_Limit7:"'${LOB_Limit7}'",
                              LOB_Limit8:"'${LOB_Limit8}'",
                              LOB_Limit7Value:"'${LOB_Limit7Value}'",
                              LOB_Limit8Value:"'${LOB_Limit8Value}'",
                              PremiumProperty:"'0.00'",
                              PremiumLiability:"'0.00'",
                              PremiumOther:"'23423.00'",
                              Tax1Name:"''",
                              Tax2Name:"''",
                              Tax3Name:"''",
                              Tax4Name:"''",
                              AgentDeposit:"'-4099.03'",
                              TaxwoTRIA5:"'0.00'",
                              Tax5:"'0.00'",
                              Tax5Name:"''",
                              LOB_Coverage9:"'${LOB_Coverage9}'",
                              LOB_Limit9:"'${LOB_Limit9}'",
                              LOB_Limit9Value:"'${LOB_Limit9Value}'",
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
                              AgentDepositwoTRIA:"'-4099.03'",
                              InsuredDepositwoTRIA:"'0.00'"
            ]
            aimsql.execute "INSERT INTO dbo.Version (QuoteID, VerOriginal, Version, Financed, Taxed, Brokerage, Indicator, DirectBillFlag, ProposedTerm, UnderLyingCoverage, " +
                    "PolicyTerm, VersionID, CompanyID, ProductID, Premium, Quoted, Limits, Subject, Endorsement, MEP, Rate, GrossComm, AgentComm, Deductible, " +
                    "CoInsure, StatusID, MarketID, Tax1, Tax2, Tax3, Tax4, FormID, RateInfo, CommPaid, ProposedEffective, ProposedExpiration, TaxDistrib, " +
                    "DeductType, LOB_Limit1, LOB_Limit2, LOB_Limit3, LOB_Limit4, LOB_Limit5, LOB_Limit6, LOB_Deduct1, LOB_Deduct2, LOB_Limit1Value, LOB_Limit2Value, " +
                    "LOB_Limit3Value, LOB_Limit4Value, LOB_Limit5Value, LOB_Limit6Value, LOB_Deduct1Value, LOB_Deduct2Value, TerrorActStatus, FlagOverrideCalc, " +
                    "TerrorTaxes, FlagMultiOption, LOB_Coverage1, LOB_Coverage2, LOB_Coverage3, LOB_Coverage4, LOB_Coverage5, LOB_Coverage6, LOB_DeductType1, LOB_DeductType2, " +
                    "TaxwoTRIA1, TaxwoTRIA2, TaxwoTRIA3, TaxwoTRIA4, LOB_Coverage7, LOB_Coverage8, LOB_Limit7, LOB_Limit8, LOB_Limit7Value, LOB_Limit8Value, PremiumProperty, " +
                    "PremiumLiability, PremiumOther, Tax1Name, Tax2Name, Tax3Name, Tax4Name, AgentDeposit, TaxwoTRIA5, Tax5, Tax5Name, LOB_Coverage9, LOB_Limit9, LOB_Limit9Value, " +
                    "TaxwoTRIA6, Tax6Name, TaxwoTRIA7, Tax7Name, TaxwoTRIA8, Tax8Name, Tax6, Tax7, Tax8, InsuredDeposit, AgentDepositwoTRIA, InsuredDepositwoTRIA) " +
                    "values " +
                    "($versionmap.QuoteID, $versionmap.VerOriginal, $versionmap.Version, $versionmap.Financed, $versionmap.Taxed, $versionmap.Brokerage, $versionmap.Indicator, $versionmap.DirectBillFlag, $versionmap.ProposedTerm, $versionmap.UnderLyingCoverage, " +
                    "$versionmap.PolicyTerm, $versionmap.VersionID, $versionmap.CompanyID, $versionmap.ProductID, $versionmap.Premium, $versionmap.Quoted, $versionmap.Limits, $versionmap.Subject, $versionmap.Endorsement, $versionmap.MEP, $versionmap.Rate, $versionmap.GrossComm, $versionmap.AgentComm, $versionmap.Deductible, " +
                    "$versionmap.CoInsure, $versionmap.StatusID, $versionmap.MarketID, $versionmap.Tax1, $versionmap.Tax2, $versionmap.Tax3, $versionmap.Tax4, $versionmap.FormID, $versionmap.RateInfo, $versionmap.CommPaid, $versionmap.ProposedEffective, $versionmap.ProposedExpiration, $versionmap.TaxDistrib, " +
                    "$versionmap.DeductType, $versionmap.LOB_Limit1, $versionmap.LOB_Limit2, $versionmap.LOB_Limit3, $versionmap.LOB_Limit4, $versionmap.LOB_Limit5, $versionmap.LOB_Limit6, $versionmap.LOB_Deduct1, $versionmap.LOB_Deduct2, $versionmap.LOB_Limit1Value, $versionmap.LOB_Limit2Value, " +
                    "$versionmap.LOB_Limit3Value, $versionmap.LOB_Limit4Value, $versionmap.LOB_Limit5Value, $versionmap.LOB_Limit6Value, $versionmap.LOB_Deduct1Value, $versionmap.LOB_Deduct2Value, $versionmap.TerrorActStatus, $versionmap.FlagOverrideCalc, " +
                    "$versionmap.TerrorTaxes, $versionmap.FlagMultiOption, $versionmap.LOB_Coverage1, $versionmap.LOB_Coverage2, $versionmap.LOB_Coverage3, $versionmap.LOB_Coverage4, $versionmap.LOB_Coverage5, $versionmap.LOB_Coverage6, $versionmap.LOB_DeductType1, $versionmap.LOB_DeductType2, " +
                    "$versionmap.TaxwoTRIA1, $versionmap.TaxwoTRIA2, $versionmap.TaxwoTRIA3, $versionmap.TaxwoTRIA4, $versionmap.LOB_Coverage7, $versionmap.LOB_Coverage8, $versionmap.LOB_Limit7, $versionmap.LOB_Limit8, $versionmap.LOB_Limit7Value, $versionmap.LOB_Limit8Value, $versionmap.PremiumProperty, " +
                    "$versionmap.PremiumLiability, $versionmap.PremiumOther, $versionmap.Tax1Name, $versionmap.Tax2Name, $versionmap.Tax3Name, $versionmap.Tax4Name, $versionmap.AgentDeposit, $versionmap.TaxwoTRIA5, $versionmap.Tax5, $versionmap.Tax5Name, $versionmap.LOB_Coverage9, $versionmap.LOB_Limit9, $versionmap.LOB_Limit9Value, " +
                    "$versionmap.TaxwoTRIA6, $versionmap.Tax6Name, $versionmap.TaxwoTRIA7, $versionmap.Tax7Name, $versionmap.TaxwoTRIA8, $versionmap.Tax8Name, $versionmap.Tax6, $versionmap.Tax7, $versionmap.Tax8, $versionmap.InsuredDeposit, $versionmap.AgentDepositwoTRIA, $versionmap.InsuredDepositwoTRIA)"

            def accountExec = underwriter;
            def totalBudget = Double.parseDouble(testjson.getAt("totalBudget").minus("\$").minus(","));


            log.info accountExec

            def quotemap = [QuoteID: "'${quoteID}'",
                            ProducerID:"'TVD'",
                            NamedInsured:"'${testjson.getAt("namedInsured")}'",
                            UserID:"'web'",
                            Received: "'${timestamp.format("yyyyMMdd HH:mm:ss.SSS")}'",
                            TeamID:"'01'",
                            DivisionID:"'00'",
                            StatusID:"'QO'",
                            CreatedID:"'web'",
                            Renewal:"'N'",
                            OpenItem:"'N'",
                            VersionCounter:"'A'",
                            InsuredID: "'${insuredID}'",
                            Description:"'Feature Film'",
                            Address1: "'${testjson.getAt("streetNameMailing")}'",
                            Address2:"''",
                            City: "'${testjson.getAt("cityMailing")}'",
                            State: "'${testjson.getAt("stateMailing")}'",
                            Zip: "'${testjson.getAt("zipCodeMailing")}'",
                            AcctExec:"'${accountExec}'",
                            CsrID:"'web'",
                            ReferenceID: "'${referenceID}'",
                            SubmitGrpID:"'${quoteID}'",
                            TaxState:"''",
                            CoverageID:"'${coverageID}'",
                            SuspenseFlag:"'N'",
                            ClaimsFlag:"'N'",
                            ActivePolicyFlag:"'N'",
                            LossHistory:"''",
                            LargeLossHistory:"''",
                            Exposures:"''",
                            AIM_TransDate:"'${timestamp.format("yyyyMMdd HH:mm:ss.SSS")}'",
                            AccountKey_FK:"'${insuredID}'",
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
                            Quoted:"'${timestamp.format("yyyyMMdd HH:mm:ss.SSS")}'",
                            Effective:"'${timestamp.format("yyyyMMdd HH:mm:ss.SSS")}'"
            ]
            aimsql.execute "INSERT INTO dbo.Quote (QuoteID ,ProducerID ,NamedInsured ,UserID ,Received ,TeamID ,DivisionID ,StatusID ,CreatedID ,\n" +
                    "                Renewal ,OpenItem ,VersionCounter ,InsuredID ,Description ,Address1 ,Address2 ,City ,State ,Zip ,AcctExec ,\n" +
                    "                CsrID ,ReferenceID ,SubmitGrpID ,TaxState ,CoverageID ,SuspenseFlag ,ClaimsFlag ,ActivePolicyFlag ,LossHistory ,\n" +
                    "                LargeLossHistory ,Exposures ,AIM_TransDate ,AccountKey_FK ,SubmitTypeID ,FlagRPG ,CountryID ,FlagTaxExempt ,\n" +
                    "                FlagNonResidentAgt ,DBAName ,MailAddress1 ,MailAddress2 ,MailCity ,MailState ,MailZip ) values " +
                    "($quotemap.QuoteID ,$quotemap.ProducerID ,$quotemap.NamedInsured ,$quotemap.UserID ,$quotemap.Received ,$quotemap.TeamID ,$quotemap.DivisionID ,$quotemap.StatusID ,$quotemap.CreatedID ," +
                    "$quotemap.Renewal ,$quotemap.OpenItem ,$quotemap.VersionCounter ,$quotemap.InsuredID ,$quotemap.Description ,$quotemap.Address1 ,$quotemap.Address2 ,$quotemap.City ,$quotemap.State ,$quotemap.Zip ,$quotemap.AcctExec ," +
                    "$quotemap.CsrID ,$quotemap.ReferenceID ,$quotemap.SubmitGrpID ,$quotemap.TaxState ,$quotemap.CoverageID ,$quotemap.SuspenseFlag ,$quotemap.ClaimsFlag ,$quotemap.ActivePolicyFlag ,$quotemap.LossHistory ," +
                    "$quotemap.LargeLossHistory ,$quotemap.Exposures ,$quotemap.AIM_TransDate ,$quotemap.AccountKey_FK ,$quotemap.SubmitTypeID ,$quotemap.FlagRPG ,$quotemap.CountryID ,$quotemap.FlagTaxExempt ," +
                    "$quotemap.FlagNonResidentAgt ,$quotemap.DBAName ,$quotemap.MailAddress1 ,$quotemap.MailAddress2 ,$quotemap.MailCity ,$quotemap.MailState ,$quotemap.MailZip )"



            def taaQuoteMap = [QuoteID: "'${quoteID}'"]

            aimsql.execute "INSERT INTO taaQuoteActivity (QuoteID) VALUES ('${quoteID}')"

            aimsql.execute "INSERT INTO taaQuoteExtendedDetail (QuoteID) VALUES('${quoteID}')"

//        exec dbo.AddTransaction  @ReferenceID='0620017',@UserID='web',@Description='New business submission recvd',
//        @Date='2016-10-08 11:40:26:747',@StatusID='NBS',@ImageID=NULL,@TypeID=NULL,@QuoteVersion='A',@ToNameKey=0,
//        @DocTemplateID=NULL,@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
            aimsql.call("{call dbo.AddTransaction( '${quoteID}', 'web', 'New business submission recvd', '${timestamp.format('yyyy-MM-dd HH:mm:ss.SSS')}', 'NBS', NULL, NULL, 'A', " +
                    "0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
                log.info "ADD TRANSACTION ID $num"
            }


//        exec dbo.AddTransaction  @ReferenceID='0620022',@UserID='web',@Description='Quote version A',@Date='2016-10-11 08:03:02:477',@StatusID='QPF',
//        @ImageID=NULL,@TypeID='R',@QuoteVersion='A',@ToNameKey=0,@DocTemplateID=NULL,@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
            aimsql.call("{call dbo.AddTransaction( '${quoteID}', 'web', 'Quote version A', '${timestamp.format('yyyy-MM-dd HH:mm:ss.SSS')}', 'QPF', NULL, 'R', 'A', " +
                    "0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
                log.info "ADD TRANSACTION ID $num"
            }


//        exec dbo.spAddSuspense  @SuspenseID=@p1 output,@ReferenceID='0620022',@AlternateID='0620022',@ReasonID='SQR',@UserID='shauna',@SuspendedByID='web',
//        @TypeID='F',@TeamID='01',@DateEntered='2016-10-11 00:00:00:000',@SuspenseDate='2016-10-17 00:00:00:000',@Comments=NULL
            aimsql.call("{call dbo.spAddSuspense( ${Sql.INTEGER}, '${quoteID}', '${quoteID}', 'SQR', 'shauna', 'web', 'F', '01', " +
                    "'${timestamp.format('yyyy-MM-dd HH:mm:ss.SSS')}', '${timestamp.format('yyyy-MM-dd HH:mm:ss.SSS')}', NULL) }") { num ->
                log.info "ADD TRANSACTION ID $num"
            }


            testjson['dateAdded'] = map.DateAdded;
            testjson['quoteID'] = quotemap.QuoteID;
            testjson['insuranceCompany'] = companyMap.companyName;
            testjson['brokerEmail'] = user.email
            testjson['brokerFirstName'] = user.firstName
            testjson['brokerLastName'] = user.lastName
            testjson['brokerPhoneNumber'] = user.phoneNumber

            allQuoteIDs = allQuoteIDs + quoteID + ";" + coverageID + ",";
        }
        if(allQuoteIDs.charAt(allQuoteIDs.length() - 1) == ','){
            allQuoteIDs = allQuoteIDs.substring(0, allQuoteIDs.length()-1);
        }





        asyncController.createIndicationPDF(testjson)

        return allQuoteIDs
    }

    def saveToQuote(policyFormJSON, dataSource_aim, insuredID){
        log.info "AIMDAO SAVE"
        def testjson = new JsonSlurper().parseText(policyFormJSON)
        log.info testjson.getAt("namedInsured")

        Sql aimsql = new Sql(dataSource_aim)
        def now = new Date()
        def timestamp = now.toTimestamp()




        return insuredID
    }

    def insertUserIntoAIMPhoneBook(user){

    }
}