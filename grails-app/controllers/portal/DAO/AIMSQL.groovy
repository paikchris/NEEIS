package portal.DAO

import grails.util.Environment
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import groovy.sql.Sql
import groovy.xml.XmlUtil
import portal.DAO.Intelledox;
import groovy.json.JsonOutput.*
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.StringEscapeUtils
import sun.swing.StringUIClientPropertyKey;



class AIMSQL {
    Intelledox intelledoxController = new Intelledox();

    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'

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




    def test(){
        log.info "testDAO"

    }
    def saveNewSpecialEventSubmission(dataMap, dataSource_aim, user, uwQuestionsMap, uwQuestionsOrder) {
        log.info "AIMDAO SPECIAL EVENT SAVE"
        Sql aimsql = new Sql(dataSource_aim)
        log.info dataMap

////        def testjson = policyFormJSON
//        log.info testjson

        def quoteID =0;
        def allQuoteIDs = "";

        def insuredID = 0;
        def brokerName = user.firstName + " " + user.lastName;

        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)

        aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
            log.info "InsuredID $num"
            insuredID = num
        }

        def map = [InsuredID        : "'${insuredID}'",
                   NamedInsured     : "'${dataMap.getAt("namedInsured").replaceAll("'", "''")}'",
                   NameType         : "'B'",
                   DBAName          : "'${dataMap.getAt("namedInsured").replaceAll("'", "''")}'",
                   Prefix           : 'NULL',
                   First_Name       : 'NULL',
                   Last_Name        : 'NULL',
                   Middle_Name      : 'NULL',
                   Suffix           : 'NULL',
                   CombinedName     : 'NULL',
                   Address1         : "'${dataMap.getAt("streetNameMailing")}'",
                   Address2         : 'NULL',
                   City             : "'${dataMap.getAt("cityMailing")}'",
                   State            : "'${dataMap.getAt("stateMailing")}'",
                   Zip              : "'${dataMap.getAt("zipCodeMailing")}'",
                   AddressID        : 'NULL',
                   ProducerID       : "'${dataMap.getAt("userCompany")}'",
                   AcctExec         : "'${dataMap.getAt("accountExecName")}'",
                   AcctAsst         : 'NULL',
                   CSR              : 'NULL',
                   Entity           : 'NULL',
                   FormMakerName    : 'NULL',
                   DirectBillFlag   : "'N'",
                   MailAddress1     : "'${dataMap.getAt("streetNameMailing")}'",
                   MailAddress2     : 'NULL',
                   MailCity         : "'${dataMap.getAt("cityMailing")}'",
                   MailState        : "'${dataMap.getAt("stateMailing")}'",
                   MailZip          : "'${dataMap.getAt("zipCodeMailing")}'",
                   ContactName      : "'${brokerName.take(35)}'",
                   Phone            : "'${dataMap.getAt("phoneNumber")}'",
                   Fax              : 'NULL',
                   EMail            : "'${dataMap.getAt("namedInsuredEmail")}'",
                   DateOfBirth      : 'NULL',
                   SSN              : "'${dataMap.getAt("FEINSSN")}'",
                   PhoneExt         : 'NULL',
                   WorkPhone        : 'NULL',
                   AcctExecID       : "'${dataMap.getAt("accountExec")}'",
                   AcuityKey        : 'NULL',
                   DateAdded        : "'${timestamp}'",
                   VehicleCount     : 'NULL',
                   BusinessStructureID: "'${businessStructureID[dataMap.getAt("businessStructure")]}'",
                   NCCI             : "'${dataMap.getAt("NCCI")}'",
                   Employees        : 'NULL',
                   Payroll          : 'NULL',
                   SicID            : "'${dataMap.getAt("SIC")}'",
                   Attention        : "'${dataMap.getAt("attention")}'",
                   ContactID        : "'${dataMap.getAt("aimContactID")}'",
                   ClaimCount       : 'NULL',
                   PolicyCount      : 'NULL',
                   TeamID           : "'TeamID'",
                   InsuredKey_PK    : "'${insuredID}'",
                   GroupKey_FK      : "'3941'", //COMMERCIAL WHOLESALE
                   FlagProspect     : "'N'",
                   FlagAssigned     : 'NULL',
                   MembershipTypeID : 'NULL',
                   ParentKey_FK     : 'NULL',
                   License          : 'NULL',
                   CareOfKey_FK     : 'NULL',
                   Website          : "'${dataMap.getAt("website")}'",
                   SLA              : 'NULL',
                   Exempt           : 'NULL',
                   RackleyClientKey_FK: 'NULL',
                   MapToID          : 'NULL',
                   Notes            : 'NULL',
                   Country          : "'US'",
                   FileNo           : 'NULL',
                   DateConverted    : 'NULL',
                   UserDefinedStr1  : 'NULL',
                   UserDefinedStr2  : 'NULL',
                   UserDefinedStr3  : 'NULL',
                   UserDefinedStr4  : 'NULL',
                   UserDefinedDate1 : 'NULL',
                   UserDefinedValue1: 'NULL',
                   CountryID        : 'NULL',
                   ParentInsuredName: 'NULL'
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

        aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
            log.info "ReferenceID $num"
            referenceID = num
        }

        aimsql.call("{call dbo.GetSubmitNumber(${Sql.VARCHAR})}") { num ->
            log.info "Quote ID $num"
            quoteID = num
        }


        def productMap = [:]

        def productID = dataMap.getAt("productID")
        def limitsString = dataMap.getAt("limitsString").trim();
        def deductsString = dataMap.getAt("deductsString").trim();
        def coverageID = "CGL";
        def stringLOB = dataMap.getAt("lobString");
        def premium = dataMap.getAt("premiumAllLOBTotal").replaceAll('[$,]', '')
        def premiumRaw = dataMap.getAt("premiumAllLOBTotal")


        aimsql.eachRow("SELECT Limits, Deduct, Subject, Endorse, LobDistrib, ActiveFlag, CompanyID, GrossComm, AgentComm, Rate " +
                "FROM Product WITH (NOLOCK) " +
                "WHERE (ProductID = '" + productID + "') ") {
            productMap['productLimits'] = it.Limits
            productMap['productDeduct'] = it.Deduct
            productMap['productSubject'] = it.Subject
            productMap['productEndorse'] = it.Endorse
            productMap['productLobDistrib'] = it.LobDistrib
            productMap['productCompanyID'] = it.CompanyID
            productMap['productGrossComm'] = it.GrossComm
            productMap['productAgentComm'] = it.AgentComm
            productMap['productRate'] = it.Rate
            productMap['productLobDistribSched'] = it.LobDistrib
            productMap['productRateInfo'] = "";
        }

        def companyMap = [:]
        aimsql.eachRow("SELECT Name, NAIC, Phone " +
                "FROM Company WITH (NOLOCK) " +
                "WHERE (CompanyID = '" + productMap['productCompanyID'] + "') ") {
            companyMap['companyName'] = it.Name
            companyMap['companyNAIC'] = it.NAIC
            companyMap['companyPhone'] = it.Phone
        }

        //////////////////////////////////////////
        //TAXES AND FEES
        ////////////////////////////////////////
        def taxString= "";
        def tax1Amount = "";
        def tax2Amount = "";
        def tax3Amount = "";
        def tax4Amount = "";

        def tax1Name = "";
        def tax2Name = "";
        def tax3Name = "";
        def tax4Name = "";

        def taxesPaidBy = "";
        def taxesPaidByID = "";
        def taxCount = 0;


        def webQuoteFee = 0 
        def webQuoteFeeNoTax = 0
        def feeSchedule
        def versionPremDist
        def agentCommCalculation

        log.info "TAX AMOUNT ++"  +  taxString

        def versionmap = [QuoteID: "'${quoteID}'",
                          VerOriginal: "'A'",
                          Version: "'A'",
                          Financed: "'Y'",
                          Brokerage: "'N'" ,
                          Indicator: "'N'" ,
                          DirectBillFlag: "'N'" ,
                          ProposedTerm: "'${dataMap.getAt("proposedTermLength").toInteger()}'",
                          UnderLyingCoverage: "''" ,
                          PolicyTerm: "'${dataMap.getAt("proposedTermLength")}'" ,
                          VersionID: "'${quoteID}A'" ,
                          CompanyID:"'${productMap['productCompanyID'].replaceAll("'","''")}'",
                          ProductID:"'${productID}'" ,
                          Premium: "'${premium}'",
                          Non_Premium: "'${webQuoteFee}'",
                          NonTax_Premium: "'${webQuoteFeeNoTax}'",
                          FlagFeeCalc:"'N'",
                          Quoted:"'${timestamp}'",
                          Limits:"'${limitsString}'",
                          Subject:"'${productMap['productSubject'].replaceAll("'","''")}'",
                          Endorsement: "'${productMap['productEndorse'].replaceAll("'","''")}'",
                          Taxed: "'Y'",
                          MEP: "''",
                          Rate:"''",
                          LobDistrib: "'${productMap['productLobDistrib']}'",
                          LobDistribSched: "'${productMap['productLobDistribSched']}'",
                          GrossComm:"'${productMap['productGrossComm']}'",
                          AgentComm:"'${productMap['productAgentComm']}'",
                          Deductible:"'${deductsString}'",
                          CoInsure:"''",
                          StatusID:"'${dataMap.getAt("statusID")}'",
                          MarketID:"'SAFELL'",
                          Tax1:"'${tax1Amount}'",
                          Tax2:"'${tax2Amount}'",
                          Tax3:"'${tax3Amount}'",
                          Tax4:"'${tax4Amount}'",
                          TaxesPaidBy:"'${taxesPaidBy}'",
                          TaxesPaidByID:"'${taxesPaidByID}'",
                          FeeSchedule:"'${feeSchedule}'",
                          PremDistrib:"'${versionPremDist}'",
                          FormID:"'OCR'",
                          RateInfo:"'${productMap['productRateInfo']}'",
                          CommPaid:"''",
                          ProposedEffective:"'${dataMap.getAt("proposedEffectiveDate")}'" ,
                          ProposedExpiration:"'${dataMap.getAt("proposedExpirationDate")}'" ,
                          TaxDistrib:"'${taxString}'",
                          DeductType:"''",
                          LOB_Limit1:"''",
                          LOB_Limit2:"''",
                          LOB_Limit3:"''",
                          LOB_Limit4:"''",
                          LOB_Limit5:"''",
                          LOB_Limit6:"''",
                          LOB_Deduct1:"''",
                          LOB_Deduct2:"''",
                          LOB_Limit1Value:"''",
                          LOB_Limit2Value:"''",
                          LOB_Limit3Value:"''",
                          LOB_Limit4Value:"''",
                          LOB_Limit5Value:"''",
                          LOB_Limit6Value:"''",
                          LOB_Deduct1Value:"''",
                          LOB_Deduct2Value:"''",
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
                          TaxwoTRIA1:"'${tax1Amount}'",
                          TaxwoTRIA2:"'${tax2Amount}'",
                          TaxwoTRIA3:"'${tax3Amount}'",
                          TaxwoTRIA4:"'${tax4Amount}'",
                          LOB_Coverage7:"''",
                          LOB_Coverage8:"''",
                          LOB_Limit7:"''",
                          LOB_Limit8:"''",
                          LOB_Limit7Value:"''",
                          LOB_Limit8Value:"''",
                          PremiumProperty:"'0.00'",
                          PremiumLiability:"'0.00'",
                          PremiumOther:"'0.00'",
                          Tax1Name:"'${tax1Name}'",
                          Tax2Name:"'${tax2Name}'",
                          Tax3Name:"'${tax3Name}'",
                          Tax4Name:"'${tax4Name}'",
                          AgentDeposit:"''",
                          TaxwoTRIA5:"'0.00'",
                          Tax5:"'0.00'",
                          Tax5Name:"''",
                          LOB_Coverage9:"''",
                          LOB_Limit9:"''",
                          LOB_Limit9Value:"''",
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
                          AgentDepositwoTRIA:"''",
                          InsuredDepositwoTRIA:"'0.00'",
                          ReferenceKey_FK:"'${referenceID}'"
        ]
        aimsql.execute "INSERT INTO dbo.Version (QuoteID, VerOriginal, Version, Financed, Taxed, Brokerage, Indicator, DirectBillFlag, ProposedTerm, UnderLyingCoverage, " +
                "PolicyTerm, VersionID, CompanyID, ProductID, Premium, Quoted, Limits, Subject, Endorsement, MEP, Rate, GrossComm, AgentComm, Deductible, " +
                "CoInsure, StatusID, MarketID, Tax1, Tax2, Tax3, Tax4, FormID, RateInfo, CommPaid, ProposedEffective, ProposedExpiration, TaxDistrib, " +
                "DeductType, LOB_Limit1, LOB_Limit2, LOB_Limit3, LOB_Limit4, LOB_Limit5, LOB_Limit6, LOB_Deduct1, LOB_Deduct2, LOB_Limit1Value, LOB_Limit2Value, " +
                "LOB_Limit3Value, LOB_Limit4Value, LOB_Limit5Value, LOB_Limit6Value, LOB_Deduct1Value, LOB_Deduct2Value, TerrorActStatus, FlagOverrideCalc, " +
                "TerrorTaxes, FlagMultiOption, LOB_Coverage1, LOB_Coverage2, LOB_Coverage3, LOB_Coverage4, LOB_Coverage5, LOB_Coverage6, LOB_DeductType1, LOB_DeductType2, " +
                "TaxwoTRIA1, TaxwoTRIA2, TaxwoTRIA3, TaxwoTRIA4, LOB_Coverage7, LOB_Coverage8, LOB_Limit7, LOB_Limit8, LOB_Limit7Value, LOB_Limit8Value, PremiumProperty, " +
                "PremiumLiability, PremiumOther, Tax1Name, Tax2Name, Tax3Name, Tax4Name, AgentDeposit, TaxwoTRIA5, Tax5, Tax5Name, LOB_Coverage9, LOB_Limit9, LOB_Limit9Value, " +
                "TaxwoTRIA6, Tax6Name, TaxwoTRIA7, Tax7Name, TaxwoTRIA8, Tax8Name, Tax6, Tax7, Tax8, InsuredDeposit, AgentDepositwoTRIA, InsuredDepositwoTRIA," +
                "Non_Premium, NonTax_Premium, FlagFeeCalc, TaxesPaidBy, TaxesPaidByID, FeeSchedule, PremDistrib, LobDistribSched, LobDistrib, ReferenceKey_FK) " +
                "values " +
                "($versionmap.QuoteID, $versionmap.VerOriginal, $versionmap.Version, $versionmap.Financed, $versionmap.Taxed, $versionmap.Brokerage, $versionmap.Indicator, $versionmap.DirectBillFlag, $versionmap.ProposedTerm, $versionmap.UnderLyingCoverage, " +
                "$versionmap.PolicyTerm, $versionmap.VersionID, $versionmap.CompanyID, $versionmap.ProductID, $versionmap.Premium, $versionmap.Quoted, $versionmap.Limits, $versionmap.Subject, $versionmap.Endorsement, $versionmap.MEP, $versionmap.Rate, $versionmap.GrossComm, $versionmap.AgentComm, $versionmap.Deductible, " +
                "$versionmap.CoInsure, $versionmap.StatusID, $versionmap.MarketID, $versionmap.Tax1, $versionmap.Tax2, $versionmap.Tax3, $versionmap.Tax4, $versionmap.FormID, $versionmap.RateInfo, $versionmap.CommPaid, $versionmap.ProposedEffective, $versionmap.ProposedExpiration, $versionmap.TaxDistrib, " +
                "$versionmap.DeductType, $versionmap.LOB_Limit1, $versionmap.LOB_Limit2, $versionmap.LOB_Limit3, $versionmap.LOB_Limit4, $versionmap.LOB_Limit5, $versionmap.LOB_Limit6, $versionmap.LOB_Deduct1, $versionmap.LOB_Deduct2, $versionmap.LOB_Limit1Value, $versionmap.LOB_Limit2Value, " +
                "$versionmap.LOB_Limit3Value, $versionmap.LOB_Limit4Value, $versionmap.LOB_Limit5Value, $versionmap.LOB_Limit6Value, $versionmap.LOB_Deduct1Value, $versionmap.LOB_Deduct2Value, $versionmap.TerrorActStatus, $versionmap.FlagOverrideCalc, " +
                "$versionmap.TerrorTaxes, $versionmap.FlagMultiOption, $versionmap.LOB_Coverage1, $versionmap.LOB_Coverage2, $versionmap.LOB_Coverage3, $versionmap.LOB_Coverage4, $versionmap.LOB_Coverage5, $versionmap.LOB_Coverage6, $versionmap.LOB_DeductType1, $versionmap.LOB_DeductType2, " +
                "$versionmap.TaxwoTRIA1, $versionmap.TaxwoTRIA2, $versionmap.TaxwoTRIA3, $versionmap.TaxwoTRIA4, $versionmap.LOB_Coverage7, $versionmap.LOB_Coverage8, $versionmap.LOB_Limit7, $versionmap.LOB_Limit8, $versionmap.LOB_Limit7Value, $versionmap.LOB_Limit8Value, $versionmap.PremiumProperty, " +
                "$versionmap.PremiumLiability, $versionmap.PremiumOther, $versionmap.Tax1Name, $versionmap.Tax2Name, $versionmap.Tax3Name, $versionmap.Tax4Name, $versionmap.AgentDeposit, $versionmap.TaxwoTRIA5, $versionmap.Tax5, $versionmap.Tax5Name, $versionmap.LOB_Coverage9, $versionmap.LOB_Limit9, $versionmap.LOB_Limit9Value, " +
                "$versionmap.TaxwoTRIA6, $versionmap.Tax6Name, $versionmap.TaxwoTRIA7, $versionmap.Tax7Name, $versionmap.TaxwoTRIA8, $versionmap.Tax8Name, $versionmap.Tax6, $versionmap.Tax7, $versionmap.Tax8, $versionmap.InsuredDeposit, $versionmap.AgentDepositwoTRIA, $versionmap.InsuredDepositwoTRIA," +
                "$versionmap.Non_Premium, $versionmap.NonTax_Premium, $versionmap.FlagFeeCalc, $versionmap.TaxesPaidBy, $versionmap.TaxesPaidByID, $versionmap.FeeSchedule, $versionmap.PremDistrib, $versionmap.LobDistribSched, $versionmap.LobDistrib, $versionmap.ReferenceKey_FK)"

        def submitGroupID = quoteID

        def quotemap = [QuoteID: "'${quoteID}'",
                        ProducerID:"'${user.company}'",
                        ProductID:"'${productID}'" ,
                        NamedInsured:"'${dataMap.getAt("namedInsured").replaceAll("'","''")}'",
                        UserID:"'web'",
                        Received: "'${timestamp}'",
                        Acknowledged: "'${timestamp}'",
                        Quoted: "'${timestamp}'",
                        TeamID:"'01'",
                        DivisionID:"'00'",
                        StatusID:"'${dataMap.getAt("statusID")}'",
                        CreatedID:"'web'",
                        Renewal:"'N'",
                        OpenItem:"'N'",
                        VersionCounter:"'A'",
                        InsuredID: "'${insuredID}'",
                        Description:"'Feature Film'",
                        Address1: "'${dataMap.getAt("streetNameMailing")}'",
                        Address2:"''",
                        City: "'${dataMap.getAt("cityMailing")}'",
                        State: "'${dataMap.getAt("stateMailing")}'",
                        Zip: "'${dataMap.getAt("zipCodeMailing")}'",
                        AcctExec:"'${dataMap.getAt("accountExec")}'",
                        CsrID:"'web'",
                        ReferenceID: "'${referenceID}'",
                        SubmitGrpID:"'${submitGroupID}'",
                        TaxState:"''",
                        CoverageID:"'${coverageID}'",
                        SuspenseFlag:"'N'",
                        ClaimsFlag:"'N'",
                        ActivePolicyFlag:"'N'",
                        LossHistory:"''",
                        LargeLossHistory:"''",
                        Exposures:"''",
                        AIM_TransDate:"'${timestamp}'",
                        AccountKey_FK:"'${insuredID}'",
                        CompanyID:"'${productMap['productCompanyID'].replaceAll("'","''")}'",
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
                        Attention: "'${user.firstName} ${user.lastName}'",
                        Quoted:"'${timestamp}'",
                        Effective:"'${dataMap.getAt("proposedEffectiveDate")}'" ,
                        Expiration:"'${dataMap.getAt("proposedExpirationDate")}'" ,
                        ContactID:"'${user.aimContactID}'",
                        UserDefinedStr1:"'${user.id}'", //keep track of which agent created quotes
        ]
        aimsql.execute "INSERT INTO dbo.Quote (QuoteID ,ProducerID , ProductID, NamedInsured ,UserID ,Received , Acknowledged, Quoted, TeamID ,DivisionID ,StatusID ,CreatedID ,\n" +
                "                Renewal ,OpenItem ,VersionCounter ,InsuredID ,Description ,Address1 ,Address2 ,City ,State ,Zip ,AcctExec ,\n" +
                "                CsrID ,ReferenceID ,SubmitGrpID ,TaxState ,CoverageID ,SuspenseFlag ,ClaimsFlag ,ActivePolicyFlag ,LossHistory ,\n" +
                "                LargeLossHistory ,Exposures ,AIM_TransDate ,AccountKey_FK ,CompanyID ,SubmitTypeID ,FlagRPG ,CountryID ,FlagTaxExempt ,\n" +
                "                FlagNonResidentAgt ,DBAName ,MailAddress1 ,MailAddress2 ,MailCity ,MailState ,MailZip, Attention, UserDefinedStr1, ContactID ) values " +
                "($quotemap.QuoteID ,$quotemap.ProducerID , $quotemap.ProductID, $quotemap.NamedInsured ,$quotemap.UserID ,$quotemap.Received ,$quotemap.Acknowledged ,$quotemap.Quoted,$quotemap.TeamID ,$quotemap.DivisionID ,$quotemap.StatusID ,$quotemap.CreatedID ," +
                "$quotemap.Renewal ,$quotemap.OpenItem ,$quotemap.VersionCounter ,$quotemap.InsuredID ,$quotemap.Description ,$quotemap.Address1 ,$quotemap.Address2 ,$quotemap.City ,$quotemap.State ,$quotemap.Zip ,$quotemap.AcctExec ," +
                "$quotemap.CsrID ,$quotemap.ReferenceID ,$quotemap.SubmitGrpID ,$quotemap.TaxState ,$quotemap.CoverageID ,$quotemap.SuspenseFlag ,$quotemap.ClaimsFlag ,$quotemap.ActivePolicyFlag ,$quotemap.LossHistory ," +
                "$quotemap.LargeLossHistory ,$quotemap.Exposures ,$quotemap.AIM_TransDate ,$quotemap.AccountKey_FK ,$quotemap.CompanyID ,$quotemap.SubmitTypeID ,$quotemap.FlagRPG ,$quotemap.CountryID ,$quotemap.FlagTaxExempt ," +
                "$quotemap.FlagNonResidentAgt ,$quotemap.DBAName ,$quotemap.MailAddress1 ,$quotemap.MailAddress2 ,$quotemap.MailCity ,$quotemap.MailState ,$quotemap.MailZip, $quotemap.Attention, $quotemap.UserDefinedStr1, $quotemap.ContactID )"


        def notesFormatted = "";
        uwQuestionsOrder.each{
            notesFormatted = notesFormatted + "${it}: " + uwQuestionsMap.getAt(it) + "\n";
        }
        def noteMap = [ReferenceID: "'${quoteID}'",
                       UserID:"'web'",
                       DateTime: "'${timestamp}'",
                       Subject: "'Underwriter Questions'",
                       Note: "'${notesFormatted}'",
                       PurgeDate: 'NULL',
                       StatusID: 'NULL',
                       AlternateRefID: 'NULL',
                       DateAddedTo: 'NULL',
                       AddedByUserID: 'NULL'
        ]



        aimsql.execute "INSERT INTO dbo.Notes (ReferenceID, UserID, DateTime, Subject, Note, PurgeDate, StatusID, AlternateRefID, DateAddedTo, \n" +
                "AddedByUserID) values " +
                "($noteMap.ReferenceID ,$noteMap.UserID , $noteMap.DateTime, $noteMap.Subject ,$noteMap.Note ,$noteMap.PurgeDate ,$noteMap.StatusID ,$noteMap.AlternateRefID," +
                "$noteMap.DateAddedTo ,$noteMap.AddedByUserID)"

        def taaQuoteMap = [QuoteID: "'${quoteID}'"]

        aimsql.execute "INSERT INTO taaQuoteActivity (QuoteID) VALUES ('${quoteID}')"

        aimsql.execute "INSERT INTO taaQuoteExtendedDetail (QuoteID) VALUES('${quoteID}')"

        //exec dbo.AddTransaction  @ReferenceID='0620017',@UserID='web',@Description='New business submission recvd',
        //@Date='2016-10-08 11:40:26:747',@StatusID='NBS',@ImageID=NULL,@TypeID=NULL,@QuoteVersion='A',@ToNameKey=0,
        //@DocTemplateID=NULL,@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
        aimsql.call("{call dbo.AddTransaction( '${quoteID}', 'web', 'New business submission recvd', '${timestamp}', 'NBS', NULL, NULL, 'A', " +
                "0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
            log.info "ADD TRANSACTION ID $num"
        }


        //exec dbo.AddTransaction  @ReferenceID='0620022',@UserID='web',@Description='Quote version A',@Date='2016-10-11 08:03:02:477',@StatusID='QPF',
        //@ImageID=NULL,@TypeID='R',@QuoteVersion='A',@ToNameKey=0,@DocTemplateID=NULL,@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
        aimsql.call("{call dbo.AddTransaction( '${quoteID}', 'web', 'Quote version A', '${timestamp}', 'QPF', NULL, 'R', 'A', " +
                "0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
            log.info "ADD TRANSACTION ID $num"
        }


        //exec dbo.spAddSuspense  @SuspenseID=@p1 output,@ReferenceID='0620022',@AlternateID='0620022',@ReasonID='SQR',@UserID='shauna',@SuspendedByID='web',
        //@TypeID='F',@TeamID='01',@DateEntered='2016-10-11 00:00:00:000',@SuspenseDate='2016-10-17 00:00:00:000',@Comments=NULL
        aimsql.call("{call dbo.spAddSuspense( ${Sql.INTEGER}, '${quoteID}', '${quoteID}', 'SQR', '${dataMap.accountExec}', 'web', 'F', '01', " +
                "'${timestamp}', '${timestamp}', NULL) }") { num ->
            log.info "ADD TRANSACTION ID $num"
        }
        aimsql.commit();


        dataMap['dateAdded'] = map.DateAdded;
        dataMap['quoteID'] = quotemap.QuoteID;
        dataMap['insuranceCompany'] = companyMap.companyName;
        dataMap['insuranceCompanyPhone'] = companyMap.companyPhone;
        dataMap['brokerEmail'] = user.email
        dataMap['brokerFirstName'] = user.firstName
        dataMap['brokerLastName'] = user.lastName
        dataMap['brokerPhoneNumber'] = user.phoneNumber

        allQuoteIDs = allQuoteIDs + quoteID + ";" + coverageID + ",";

        log.info(allQuoteIDs)
        if(allQuoteIDs.charAt(allQuoteIDs.length() - 1) == ','){
            allQuoteIDs = allQuoteIDs.substring(0, allQuoteIDs.length()-1);
        }
        def totalPolicyFee = 15 * (allQuoteIDs.split(",").size());


        dataMap['totalPolicyFee'] = totalPolicyFee;
        dataMap['allQuoteIDs'] = allQuoteIDs;
        log.info("BEFORE SENDING TO INTELLEDOX = "+  dataMap['allQuoteIDs'])

        intelledoxController.createIndicationSpecialEventsPDF(dataMap, uwQuestionsMap, uwQuestionsOrder, dataSource_aim)

        return allQuoteIDs
    }

    def saveNewSubmission(policyFormJSON, dataSource_aim, user, uwQuestionsMap, uwQuestionsOrder){
        log.info "AIMDAO SAVE"
        log.info user.email
        Sql aimsql = new Sql(dataSource_aim)

        def testjson = policyFormJSON
        log.info testjson

        def quoteID =0;
        def allQuoteIDs = "";

        def insuredID = 0; 
        def brokerName = user.firstName + " " + user.lastName;



        aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
            log.info "InsuredID $num"
            insuredID = num
        }


        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)

        ///////SAVE INSURED
        def map = [InsuredID:"'${insuredID}'",
                   NamedInsured: "'${testjson.getAt("namedInsured").replaceAll("'","''")}'",
                   NameType: "'B'",
                   DBAName: "'${testjson.getAt("namedInsured").replaceAll("'","''")}'",
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
                   ProducerID: "'${testjson.getAt("userCompany")}'",
                   AcctExec: "'${testjson.getAt("accountExecName")}'",
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
                   ContactName: "'${brokerName.take(35)}'",
                   Phone: "'${testjson.getAt("phoneNumber")}'",
                   Fax: 'NULL',
                   EMail: "'${testjson.getAt("namedInsuredEmail")}'",
                   DateOfBirth: 'NULL',
                   SSN: "'${testjson.getAt("FEINSSN")}'",
                   PhoneExt: 'NULL',
                   WorkPhone: 'NULL',
                   AcctExecID: "'${testjson.getAt("accountExec")}'",
                   AcuityKey: 'NULL',
                   DateAdded: "'${timestamp}'",
                   VehicleCount: 'NULL',
                   BusinessStructureID: "'${businessStructureID[testjson.getAt("businessStructure")]}'",
                   NCCI: "'${testjson.getAt("NCCI")}'",
                   Employees: 'NULL',
                   Payroll: 'NULL',
                   SicID: "'${testjson.getAt("SIC")}'",
                   Attention: "'${testjson.getAt("attention")}'",
                   ContactID: "'${testjson.getAt("aimContactID")}'",
                   ClaimCount: 'NULL',
                   PolicyCount: 'NULL',
                   TeamID: "'TeamID'",
                   InsuredKey_PK: "'${insuredID}'",
                   GroupKey_FK: "'3941'", //COMMERCIAL WHOLESALE
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
        def submitGroupID;
        def productIndex = 0;
        testjson.getAt("productID").each{
            def productID = it;
            log.info "Product: " + productID
            productIndex = productIndex + 1;

            aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
                log.info "ReferenceID $num"
                referenceID = num
            }

            aimsql.call("{call dbo.GetSubmitNumber(${Sql.VARCHAR})}") { num ->
                log.info "Quote ID $num"
                quoteID = num
            }

            if(productIndex == 1){
                submitGroupID = quoteID
            }

            def productMap = [:]
            def premium ="";
            def premiumRaw = "";
            def stringLOB = "";
            def limitsString = "";
            def deductsString = "";
            def coverageID = "";


            if(productID == "PIP CHOI" || productID == "PIP 1" || productID == "PIP 2"|| productID == "PIP 3"|| productID == "PIP 4"||
                    productID == "PIP 5" || productID == "EPKG37"){
                limitsString = StringUtils.chomp(StringEscapeUtils.unescapeXml(testjson.getAt("EPKGlimitsString").trim()));
                deductsString = StringUtils.chomp(StringEscapeUtils.unescapeXml(testjson.getAt("EPKGdeductsString").trim()));
                coverageID = "EPKG";
                if(testjson.getAt("epkgLOB").length() > 1){
                    stringLOB = testjson.getAt("epkgLOB");
                }
                premium = testjson.getAt("EPKGPremium").replaceAll('[$,]', '')
                premiumRaw = testjson.getAt("EPKGPremium")
            }
            else if(productID == "BARCPKSF" || productID == "BARCPKGP"||productID == "BARCPKGC"){
                limitsString = StringUtils.chomp(StringEscapeUtils.unescapeXml(testjson.getAt("CPKlimitsString").trim()));
                deductsString = StringUtils.chomp(StringEscapeUtils.unescapeXml(testjson.getAt("CPKdeductsString").trim()));
                coverageID = "CPK";

                if(testjson.getAt("cpkLOB").length() > 1){
                    stringLOB = testjson.getAt("cpkLOB");
                    premium = testjson.getAt("CPKPremium").replaceAll('[$,]', '')
                    premiumRaw = testjson.getAt("CPKPremium")
                    coverageID = "CPK";
                }
                else if(testjson.getAt("cglLOB").length() > 1){
                    stringLOB = testjson.getAt("cglLOB");
                    premium = testjson.getAt("CGLPremium").replaceAll('[$,]', '')
                    premiumRaw = testjson.getAt("CGLPremium")
                    coverageID = "CGL";
                }
            }

            aimsql.eachRow("SELECT Limits, Deduct, Subject, Endorse, LobDistrib, ActiveFlag, CompanyID, GrossComm, AgentComm, Rate " +
                    "FROM Product WITH (NOLOCK) " +
                    "WHERE (ProductID = '" + productID + "') ") {
                productMap['productLimits'] = it.Limits
                productMap['productDeduct'] = it.Deduct
                productMap['productSubject'] = it.Subject
                productMap['productEndorse'] = it.Endorse
                productMap['productLobDistrib'] = it.LobDistrib
                productMap['productCompanyID'] = it.CompanyID
                productMap['productGrossComm'] = it.GrossComm
                productMap['productAgentComm'] = it.AgentComm
                productMap['productRate'] = it.Rate
                productMap['productLobDistribSched'] = it.LobDistrib
                productMap['productRateInfo'] = "";

                if(coverageID == "EPKG"){
                    productMap['productLobDistribSched'] = it.LobDistrib.split('\n')[0].split('\t')[0] + "\t" + premiumRaw + "\t15.0"
                    productMap['productLobDistrib'] = "EPKG\t" + premium + "\t28.0\t15.0\t\n";
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t";

                    productMap['productRateInfo'] = StringEscapeUtils.unescapeXml(testjson.getAt("EPKGRateInfo"));

                }
                else if(coverageID == "CPK"){
                    productMap['productLobDistribSched'] = "Commercial General Liability\t" + testjson.getAt("CPKPremiumOnly") + "\t15.0\n" +
                            "NOA Liability\t" + testjson.getAt("NOALPremiumOnly") + "\t15.0"
                    productMap['productLobDistrib'] = "CGL\t" + testjson.getAt("CPKPremiumOnly").replaceAll('[$,]', '') + "\t28.0\t15.0\t\n" +
                            "NOAL\t" + testjson.getAt("NOALPremiumOnly").replaceAll('[$,]', '') + "\t28.0\t15.0\t\n" ;
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t";
                    productMap['productRateInfo'] = StringEscapeUtils.unescapeXml(testjson.getAt("CPKRateInfo"));

                    productMap['productEndorse'] = testjson.getAt("endorseInsert")

                }
                else if(coverageID == "CGL"){
                    productMap['productLobDistribSched'] = "Commercial General Liability\t" + premiumRaw + "\t15.0"
                    productMap['productLobDistrib'] = "CGL\t" + premium + "\t28.0\t15.0\t\n" ;
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t\n" +
                    // "\t\t0\t0\t";
                    productMap['productRateInfo'] = StringEscapeUtils.unescapeXml(testjson.getAt("CGLRateInfo"));

                }
                else{
                    productMap['productLobDistribSched'] = it.LobDistrib
                }
            }
            log.info("PRODUCT RATE INFO: " + productMap['productRateInfo'] )
            log.info("PRODUCT Limits INFO: " + limitsString )
            def companyMap = [:]
            aimsql.eachRow("SELECT Name, NAIC " +
                    "FROM Company WITH (NOLOCK) " +
                    "WHERE (CompanyID = '" + productMap['productCompanyID'] + "') ") {
                companyMap['companyName'] = it.Name
                companyMap['companyNAIC'] = it.NAIC
            }

            /////////SAVE VERSION
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



            //GET TAX INFO
            def taxCodes = [:];
            def taxState = testjson.getAt("stateMailing");
            aimsql.eachRow("SELECT     TransCode, TransTypeID, Description, FlatAmount_Flag, Rate, CollectedBy, AllowOverRide, State, FlagUserSelected, AP_AccountID, IncludeFees, RoundingRule, \n" +
                    "                      RecordKey_PK, PremiumBasis, BasisSection, FlatRateFlag, TaxValue, TaxCodeID, FlagFullyEarned, FlagPolicyOnly, TaxRate, MinAmount, MaxAmount, AppliesTo, \n" +
                    "                      CompanyID, Municipality\n" +
                    "FROM         dvTaxTable WITH (NOLOCK) \n" +
                    "WHERE     (State LIKE '${taxState}') AND (ISNULL(Municipality, '') = '') OR\n" +
                    "                      (State LIKE '${taxState}') AND (Municipality = '')\n" +
                    "ORDER BY Description") {

                taxCodes["${it.TransCode}"] =  it.Description;
            }
            log.info "TAX AMOUNT sldkfjsldjf+"
            def agentCommCalculation = premium.toDouble() * (productMap['productAgentComm']/100);

            def taxString= "";
            def tax1Amount = "";
            def tax2Amount = "";
            def tax3Amount = "";
            def tax4Amount = "";

            def tax1Name = "";
            def tax2Name = "";
            def tax3Name = "";
            def tax4Name = "";

            def taxesPaidBy = "";
            def taxesPaidByID = "";
            def taxCount = 0;
            aimsql.eachRow("SELECT     State, TaxValue, FlatRateFlag, Effective, Expiration, IncludeFees, PK_TaxID, CountyID, TaxCodeID, CompanyID, TaxValueNew, CollectedBy, PaidTo, AllowOverRide, \n" +
                    "                      RoundingRule, TaxLine, TaxPercentange, CoverageID_Old, TaxPercentage, StateName, DateAdded, CreatedByID, SystemReq, RecordKey_PK, CoverageID, \n" +
                    "                      FlagPolicyOnly, AdmittedTax, FlagFullyEarned, ZipCodeStart, ZipCodeEnd, FlagUserSelected, MinAmount, MaxAmount, PremiumBasis, BasisSection, \n" +
                    "                      FlagNonResidentTax, AppliesTo, ExcludeTRIA, FlagUseEndorsementDate, Municipality, ExemptInsuredTax\n" +
                    "FROM         TaxTable WITH (NOLOCK)\n" +
                    "WHERE     (State = '${taxState}') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AppliesTo, 'ALL') = 'ALL') AND (ISNULL(AdmittedTax, 'N') = 'N') AND \n" +
                    "                      (ISNULL(ExemptInsuredTax, 'N') = 'N') OR\n" +
                    "                      (State = '${taxState}') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AdmittedTax, 'N') = 'N') AND (ISNULL(ExemptInsuredTax, 'N') = 'N') AND \n" +
                    "                      (AppliesTo = 'RES')\n" +
                    "ORDER BY TaxLine, SUBSTRING(CoverageID, 1, 25)") {
                taxCount++;
                if(taxCount == 1){
                    tax1Amount = premium.toDouble() * it.TaxValue;
                    tax1Name = taxCodes["${it.TaxCodeID}"]
                    taxesPaidByID = it.CompanyID
                }
                else if(taxCount == 2){
                    tax2Amount = premium.toDouble() * it.TaxValue;
                    tax2Name = taxCodes["${it.TaxCodeID}"]
                }
                if(taxCount == 3){
                    tax3Amount = premium.toDouble() * it.TaxValue;
                    tax3Name = taxCodes["${it.TaxCodeID}"]
                }
                if(taxCount == 4){
                    tax4Amount = premium.toDouble() * it.TaxValue;
                    tax4Name = taxCodes["${it.TaxCodeID}"]
                }
                taxString = taxString + it.TaxCodeID + "\t" + (premium.toDouble() * it.TaxValue) + "\t" + it.CollectedBy +
                        "\t" + it.CompanyID + "\t" + it.RoundingRule + "\t" + it.TaxValue + "\n";

                taxesPaidBy = it.CollectedBy;

            }
            log.info "TAX AMOUNT ++"  +  taxString


            log.info "Premium ===== " +  premium
            def brokerFee= testjson.getAt("brokerFee").replaceAll('[$,]', '')
            def webQuoteFee = 0.0
            def webQuoteFeeNoTax = 15.0
            def webQuoteFeeString = "\$15.00"
            def feeSchedule = "Policy Fee\t" + webQuoteFeeString + "\n"
            def versionPremDist = "FEE" + "\t" + "15" + "\t" + "A" + "\t00\tY\tN\t\n"

            log.info "BROKER FEE ===== " +  brokerFee
            if(brokerFee?.trim() && Double.parseDouble(brokerFee) > 0){
                feeSchedule = feeSchedule + "Broker Fee\t" + testjson.getAt("brokerFee")
                versionPremDist =  versionPremDist + "ABF" + "\t" + brokerFee + "\t" + "R" + "\tRAGENT\tY\tN\t\n"
                webQuoteFeeNoTax = webQuoteFeeNoTax + Double.parseDouble(brokerFee)
            }

            def versionmap = [QuoteID: "'${quoteID}'",
                              VerOriginal: "'A'",
                              Version: "'A'",
                              Financed: "'Y'",
                              Brokerage: "'N'" ,
                              Indicator: "'N'" ,
                              DirectBillFlag: "'N'" ,
                              ProposedTerm: "'${testjson.getAt("proposedTermLength").toInteger()}'",
                              UnderLyingCoverage: "''" ,
                              PolicyTerm: "'${testjson.getAt("proposedTermLength")}'" ,
                              VersionID: "'${quoteID}A'" ,
                              CompanyID:"'${productMap['productCompanyID'].replaceAll("'","''")}'",
                              ProductID:"'${productID}'" ,
                              Premium: "'${premium}'",
                              Non_Premium: "'${webQuoteFee}'",
                              NonTax_Premium: "'${webQuoteFeeNoTax}'",
                              FlagFeeCalc:"'N'",
                              Quoted:"'${timestamp}'",
                              Limits:"'${limitsString}'",
                              Subject:"'${productMap['productSubject'].replaceAll("'","''")}'",
                              Endorsement: "'${productMap['productEndorse'].replaceAll("'","''")}'",
                              Taxed: "'Y'",
                              MEP: "''",
                              Rate:"''",
                              LobDistrib: "'${productMap['productLobDistrib']}'",
                              LobDistribSched: "'${productMap['productLobDistribSched']}'",
                              GrossComm:"'${productMap['productGrossComm']}'",
                              AgentComm:"'${productMap['productAgentComm']}'",
                              Deductible:"'${deductsString}'",
                              CoInsure:"''",
                              StatusID:"'${testjson.getAt("statusID")}'",
                              MarketID:"'SAFELL'",
                              Tax1:"'${tax1Amount}'",
                              Tax2:"'${tax2Amount}'",
                              Tax3:"'${tax3Amount}'",
                              Tax4:"'${tax4Amount}'",
                              TaxesPaidBy:"'${taxesPaidBy}'",
                              TaxesPaidByID:"'${taxesPaidByID}'",
                              FeeSchedule:"'${feeSchedule}'",
                              PremDistrib:"'${versionPremDist}'",
                              FormID:"'OCR'",
                              RateInfo:"'${productMap['productRateInfo']}'",
                              CommPaid:"'${agentCommCalculation}'",
                              ProposedEffective:"'${testjson.getAt("proposedEffectiveDate")}'" ,
                              ProposedExpiration:"'${testjson.getAt("proposedExpirationDate")}'" ,
                              TaxDistrib:"'${taxString}'",
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
                              TaxwoTRIA1:"'${tax1Amount}'",
                              TaxwoTRIA2:"'${tax2Amount}'",
                              TaxwoTRIA3:"'${tax3Amount}'",
                              TaxwoTRIA4:"'${tax4Amount}'",
                              LOB_Coverage7:"'${LOB_Coverage7}'",
                              LOB_Coverage8:"'${LOB_Coverage8}'",
                              LOB_Limit7:"'${LOB_Limit7}'",
                              LOB_Limit8:"'${LOB_Limit8}'",
                              LOB_Limit7Value:"'${LOB_Limit7Value}'",
                              LOB_Limit8Value:"'${LOB_Limit8Value}'",
                              PremiumProperty:"'0.00'",
                              PremiumLiability:"'0.00'",
                              PremiumOther:"'0.00'",
                              Tax1Name:"'${tax1Name}'",
                              Tax2Name:"'${tax2Name}'",
                              Tax3Name:"'${tax3Name}'",
                              Tax4Name:"'${tax4Name}'",
                              AgentDeposit:"'-${agentCommCalculation}'",
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
                              AgentDepositwoTRIA:"'-${agentCommCalculation}'",
                              InsuredDepositwoTRIA:"'0.00'",
                              ReferenceKey_FK:"'${referenceID}'"
            ]
            aimsql.execute "INSERT INTO dbo.Version (QuoteID, VerOriginal, Version, Financed, Taxed, Brokerage, Indicator, DirectBillFlag, ProposedTerm, UnderLyingCoverage, " +
                    "PolicyTerm, VersionID, CompanyID, ProductID, Premium, Quoted, Limits, Subject, Endorsement, MEP, Rate, GrossComm, AgentComm, Deductible, " +
                    "CoInsure, StatusID, MarketID, Tax1, Tax2, Tax3, Tax4, FormID, RateInfo, CommPaid, ProposedEffective, ProposedExpiration, TaxDistrib, " +
                    "DeductType, LOB_Limit1, LOB_Limit2, LOB_Limit3, LOB_Limit4, LOB_Limit5, LOB_Limit6, LOB_Deduct1, LOB_Deduct2, LOB_Limit1Value, LOB_Limit2Value, " +
                    "LOB_Limit3Value, LOB_Limit4Value, LOB_Limit5Value, LOB_Limit6Value, LOB_Deduct1Value, LOB_Deduct2Value, TerrorActStatus, FlagOverrideCalc, " +
                    "TerrorTaxes, FlagMultiOption, LOB_Coverage1, LOB_Coverage2, LOB_Coverage3, LOB_Coverage4, LOB_Coverage5, LOB_Coverage6, LOB_DeductType1, LOB_DeductType2, " +
                    "TaxwoTRIA1, TaxwoTRIA2, TaxwoTRIA3, TaxwoTRIA4, LOB_Coverage7, LOB_Coverage8, LOB_Limit7, LOB_Limit8, LOB_Limit7Value, LOB_Limit8Value, PremiumProperty, " +
                    "PremiumLiability, PremiumOther, Tax1Name, Tax2Name, Tax3Name, Tax4Name, AgentDeposit, TaxwoTRIA5, Tax5, Tax5Name, LOB_Coverage9, LOB_Limit9, LOB_Limit9Value, " +
                    "TaxwoTRIA6, Tax6Name, TaxwoTRIA7, Tax7Name, TaxwoTRIA8, Tax8Name, Tax6, Tax7, Tax8, InsuredDeposit, AgentDepositwoTRIA, InsuredDepositwoTRIA," +
                    "Non_Premium, NonTax_Premium, FlagFeeCalc, TaxesPaidBy, TaxesPaidByID, FeeSchedule, PremDistrib, LobDistribSched, LobDistrib, ReferenceKey_FK) " +
                    "values " +
                    "($versionmap.QuoteID, $versionmap.VerOriginal, $versionmap.Version, $versionmap.Financed, $versionmap.Taxed, $versionmap.Brokerage, $versionmap.Indicator, $versionmap.DirectBillFlag, $versionmap.ProposedTerm, $versionmap.UnderLyingCoverage, " +
                    "$versionmap.PolicyTerm, $versionmap.VersionID, $versionmap.CompanyID, $versionmap.ProductID, $versionmap.Premium, $versionmap.Quoted, $versionmap.Limits, $versionmap.Subject, $versionmap.Endorsement, $versionmap.MEP, $versionmap.Rate, $versionmap.GrossComm, $versionmap.AgentComm, $versionmap.Deductible, " +
                    "$versionmap.CoInsure, $versionmap.StatusID, $versionmap.MarketID, $versionmap.Tax1, $versionmap.Tax2, $versionmap.Tax3, $versionmap.Tax4, $versionmap.FormID, $versionmap.RateInfo, $versionmap.CommPaid, $versionmap.ProposedEffective, $versionmap.ProposedExpiration, $versionmap.TaxDistrib, " +
                    "$versionmap.DeductType, $versionmap.LOB_Limit1, $versionmap.LOB_Limit2, $versionmap.LOB_Limit3, $versionmap.LOB_Limit4, $versionmap.LOB_Limit5, $versionmap.LOB_Limit6, $versionmap.LOB_Deduct1, $versionmap.LOB_Deduct2, $versionmap.LOB_Limit1Value, $versionmap.LOB_Limit2Value, " +
                    "$versionmap.LOB_Limit3Value, $versionmap.LOB_Limit4Value, $versionmap.LOB_Limit5Value, $versionmap.LOB_Limit6Value, $versionmap.LOB_Deduct1Value, $versionmap.LOB_Deduct2Value, $versionmap.TerrorActStatus, $versionmap.FlagOverrideCalc, " +
                    "$versionmap.TerrorTaxes, $versionmap.FlagMultiOption, $versionmap.LOB_Coverage1, $versionmap.LOB_Coverage2, $versionmap.LOB_Coverage3, $versionmap.LOB_Coverage4, $versionmap.LOB_Coverage5, $versionmap.LOB_Coverage6, $versionmap.LOB_DeductType1, $versionmap.LOB_DeductType2, " +
                    "$versionmap.TaxwoTRIA1, $versionmap.TaxwoTRIA2, $versionmap.TaxwoTRIA3, $versionmap.TaxwoTRIA4, $versionmap.LOB_Coverage7, $versionmap.LOB_Coverage8, $versionmap.LOB_Limit7, $versionmap.LOB_Limit8, $versionmap.LOB_Limit7Value, $versionmap.LOB_Limit8Value, $versionmap.PremiumProperty, " +
                    "$versionmap.PremiumLiability, $versionmap.PremiumOther, $versionmap.Tax1Name, $versionmap.Tax2Name, $versionmap.Tax3Name, $versionmap.Tax4Name, $versionmap.AgentDeposit, $versionmap.TaxwoTRIA5, $versionmap.Tax5, $versionmap.Tax5Name, $versionmap.LOB_Coverage9, $versionmap.LOB_Limit9, $versionmap.LOB_Limit9Value, " +
                    "$versionmap.TaxwoTRIA6, $versionmap.Tax6Name, $versionmap.TaxwoTRIA7, $versionmap.Tax7Name, $versionmap.TaxwoTRIA8, $versionmap.Tax8Name, $versionmap.Tax6, $versionmap.Tax7, $versionmap.Tax8, $versionmap.InsuredDeposit, $versionmap.AgentDepositwoTRIA, $versionmap.InsuredDepositwoTRIA," +
                    "$versionmap.Non_Premium, $versionmap.NonTax_Premium, $versionmap.FlagFeeCalc, $versionmap.TaxesPaidBy, $versionmap.TaxesPaidByID, $versionmap.FeeSchedule, $versionmap.PremDistrib, $versionmap.LobDistribSched, $versionmap.LobDistrib, $versionmap.ReferenceKey_FK)"

            log.info("Testing Step = " + testjson.getAt("totalBudgetConfirm"))

            def totalBudget = Double.parseDouble(testjson.getAt("totalBudgetConfirm").replaceAll('[$,]', ''));
            log.info("Testing Step1")

            def quotemap = [QuoteID: "'${quoteID}'",
                            ProducerID:"'${user.company}'",
                            ProductID:"'${productID}'" ,
                            NamedInsured:"'${testjson.getAt("namedInsured").replaceAll("'","''")}'",
                            UserID:"'web'",
                            Received: "'${timestamp}'",
                            Acknowledged: "'${timestamp}'",
                            Quoted: "'${timestamp}'",
                            TeamID:"'01'",
                            DivisionID:"'00'",
                            StatusID:"'${testjson.getAt("statusID")}'",
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
                            AcctExec:"'${testjson.getAt("accountExec")}'",
                            CsrID:"'web'",
                            ReferenceID: "'${referenceID}'",
                            SubmitGrpID:"'${submitGroupID}'",
                            TaxState:"'${taxState}'",
                            CoverageID:"'${coverageID}'",
                            SuspenseFlag:"'N'",
                            ClaimsFlag:"'N'",
                            ActivePolicyFlag:"'N'",
                            LossHistory:"''",
                            LargeLossHistory:"''",
                            Exposures:"''",
                            AIM_TransDate:"'${timestamp}'",
                            AccountKey_FK:"'${insuredID}'",
                            CompanyID:"'${productMap['productCompanyID'].replaceAll("'","''")}'",
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
                            Attention: "'${user.firstName} ${user.lastName}'",
                            Quoted:"'${timestamp}'",
                            Effective:"'${testjson.getAt("proposedEffectiveDate")}'" ,
                            Expiration:"'${testjson.getAt("proposedExpirationDate")}'" ,
                            ContactID:"'${user.aimContactID}'",
                            UserDefinedStr1:"'${user.id}'", //keep track of which agent created quotes
            ]
            aimsql.execute "INSERT INTO dbo.Quote (QuoteID ,ProducerID , ProductID, NamedInsured ,UserID ,Received , Acknowledged, Quoted, TeamID ,DivisionID ,StatusID ,CreatedID ,\n" +
                    "                Renewal ,OpenItem ,VersionCounter ,InsuredID ,Description ,Address1 ,Address2 ,City ,State ,Zip ,AcctExec ,\n" +
                    "                CsrID ,ReferenceID ,SubmitGrpID ,TaxState ,CoverageID ,SuspenseFlag ,ClaimsFlag ,ActivePolicyFlag ,LossHistory ,\n" +
                    "                LargeLossHistory ,Exposures ,AIM_TransDate ,AccountKey_FK ,CompanyID ,SubmitTypeID ,FlagRPG ,CountryID ,FlagTaxExempt ,\n" +
                    "                FlagNonResidentAgt ,DBAName ,MailAddress1 ,MailAddress2 ,MailCity ,MailState ,MailZip, Attention, UserDefinedStr1, ContactID ) values " +
                    "($quotemap.QuoteID ,$quotemap.ProducerID , $quotemap.ProductID, $quotemap.NamedInsured ,$quotemap.UserID ,$quotemap.Received ,$quotemap.Acknowledged ,$quotemap.Quoted,$quotemap.TeamID ,$quotemap.DivisionID ,$quotemap.StatusID ,$quotemap.CreatedID ," +
                    "$quotemap.Renewal ,$quotemap.OpenItem ,$quotemap.VersionCounter ,$quotemap.InsuredID ,$quotemap.Description ,$quotemap.Address1 ,$quotemap.Address2 ,$quotemap.City ,$quotemap.State ,$quotemap.Zip ,$quotemap.AcctExec ," +
                    "$quotemap.CsrID ,$quotemap.ReferenceID ,$quotemap.SubmitGrpID ,$quotemap.TaxState ,$quotemap.CoverageID ,$quotemap.SuspenseFlag ,$quotemap.ClaimsFlag ,$quotemap.ActivePolicyFlag ,$quotemap.LossHistory ," +
                    "$quotemap.LargeLossHistory ,$quotemap.Exposures ,$quotemap.AIM_TransDate ,$quotemap.AccountKey_FK ,$quotemap.CompanyID ,$quotemap.SubmitTypeID ,$quotemap.FlagRPG ,$quotemap.CountryID ,$quotemap.FlagTaxExempt ," +
                    "$quotemap.FlagNonResidentAgt ,$quotemap.DBAName ,$quotemap.MailAddress1 ,$quotemap.MailAddress2 ,$quotemap.MailCity ,$quotemap.MailState ,$quotemap.MailZip, $quotemap.Attention, $quotemap.UserDefinedStr1, $quotemap.ContactID )"


            def notesFormatted = "";
            uwQuestionsOrder.each{
                notesFormatted = notesFormatted + "${it}: " + uwQuestionsMap.getAt(it) + "\n";
            }
            def noteMap = [ReferenceID: "'${quoteID}'",
                           UserID:"'web'",
                           DateTime: "'${timestamp}'",
                           Subject: "'Underwriter Questions'",
                           Note: "'${notesFormatted}'",
                           PurgeDate: 'NULL',
                           StatusID: 'NULL',
                           AlternateRefID: 'NULL',
                           DateAddedTo: 'NULL',
                           AddedByUserID: 'NULL']



            aimsql.execute "INSERT INTO dbo.Notes (ReferenceID, UserID, DateTime, Subject, Note, PurgeDate, StatusID, AlternateRefID, DateAddedTo, \n" +
                    "AddedByUserID) values " +
                    "($noteMap.ReferenceID ,$noteMap.UserID , $noteMap.DateTime, $noteMap.Subject ,$noteMap.Note ,$noteMap.PurgeDate ,$noteMap.StatusID ,$noteMap.AlternateRefID," +
                    "$noteMap.DateAddedTo ,$noteMap.AddedByUserID)"

            def taaQuoteMap = [QuoteID: "'${quoteID}'"]

            aimsql.execute "INSERT INTO taaQuoteActivity (QuoteID) VALUES ('${quoteID}')"

            aimsql.execute "INSERT INTO taaQuoteExtendedDetail (QuoteID) VALUES('${quoteID}')"

            //exec dbo.AddTransaction  @ReferenceID='0620017',@UserID='web',@Description='New business submission recvd',
            //@Date='2016-10-08 11:40:26:747',@StatusID='NBS',@ImageID=NULL,@TypeID=NULL,@QuoteVersion='A',@ToNameKey=0,
            //@DocTemplateID=NULL,@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
            aimsql.call("{call dbo.AddTransaction( '${quoteID}', 'web', 'New business submission recvd', '${timestamp}', 'NBS', NULL, NULL, 'A', " +
                    "0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
                log.info "ADD TRANSACTION ID $num"
            }


            //exec dbo.AddTransaction  @ReferenceID='0620022',@UserID='web',@Description='Quote version A',@Date='2016-10-11 08:03:02:477',@StatusID='QPF',
            //@ImageID=NULL,@TypeID='R',@QuoteVersion='A',@ToNameKey=0,@DocTemplateID=NULL,@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
            aimsql.call("{call dbo.AddTransaction( '${quoteID}', 'web', 'Quote version A', '${timestamp}', 'QPF', NULL, 'R', 'A', " +
                    "0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
                log.info "ADD TRANSACTION ID $num"
            }


            //exec dbo.spAddSuspense  @SuspenseID=@p1 output,@ReferenceID='0620022',@AlternateID='0620022',@ReasonID='SQR',@UserID='shauna',@SuspendedByID='web',
            //@TypeID='F',@TeamID='01',@DateEntered='2016-10-11 00:00:00:000',@SuspenseDate='2016-10-17 00:00:00:000',@Comments=NULL
            aimsql.call("{call dbo.spAddSuspense( ${Sql.INTEGER}, '${quoteID}', '${quoteID}', 'SQR', '${testjson.accountExec}', 'web', 'F', '01', " +
                    "'${timestamp}', '${timestamp}', NULL) }") { num ->
                log.info "ADD TRANSACTION ID $num"
            }
            aimsql.commit();


            testjson['dateAdded'] = map.DateAdded;
            testjson['quoteID'] = quotemap.QuoteID;
            testjson['insuranceCompany'] = companyMap.companyName;
            testjson['brokerEmail'] = user.email
            testjson['brokerFirstName'] = user.firstName
            testjson['brokerLastName'] = user.lastName
            testjson['brokerPhoneNumber'] = user.phoneNumber

            allQuoteIDs = allQuoteIDs + quoteID + ";" + coverageID + ",";
        }
        log.info(allQuoteIDs)
        if(allQuoteIDs.charAt(allQuoteIDs.length() - 1) == ','){
            allQuoteIDs = allQuoteIDs.substring(0, allQuoteIDs.length()-1);
        }
        def totalPolicyFee = 15 * (allQuoteIDs.split(",").size());


        testjson['totalPolicyFee'] = totalPolicyFee;
        testjson['allQuoteIDs'] = allQuoteIDs;
        log.info("BEFORE SENDING TO INTELLEDOX = "+  testjson['allQuoteIDs'])

        def indicationStatus = intelledoxController.createIndicationPDF(testjson, uwQuestionsMap, uwQuestionsOrder, dataSource_aim)

        return allQuoteIDs + "&;&" + indicationStatus
    }

    def updateSubmissionActivity(quoteID, description, statusCode, typeID, quoteVersion, dataSource_aim){
        //        exec dbo.AddTransaction  @ReferenceID='0620022',@UserID='web',@Description='Quote version A',@Date='2016-10-11 08:03:02:477',@StatusID='QPF',
//        @ImageID=NULL,@TypeID='R',@QuoteVersion='A',@ToNameKey=0,@DocTemplateID=NULL,@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
        Sql aimsql = new Sql(dataSource_aim)
        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)
        aimsql.call("{call dbo.AddTransaction( '${quoteID}', 'web', '${description}', '${timestamp}', '${statusCode}', NULL, '${typeID}'," +
                " '${quoteVersion}', 0, NULL, 0, '1899-12-30 00:00:00:000')}") { num ->
            log.info "ADD TRANSACTION ID $num"
        }
    }

    def saveToQuote(policyFormJSON, dataSource_aim, insuredID){
        log.info "AIMDAO SAVE"
        def testjson = new JsonSlurper().parseText(policyFormJSON)
        log.info testjson.getAt("namedInsured")

        Sql aimsql = new Sql(dataSource_aim)
        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)

        return insuredID
    }

    def updateSubmissionStatus(){

    }

    def insertUserIntoAIMPhoneBook(user){

    }

    def logFileUpload(localFileName, localFolderPath, quoteID, dataSource_aim){
        Sql aimsql = new Sql(dataSource_aim)
        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)
        def oleAttachKey = "";
        def referenceKey_FK = "";
        aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'oleAttachKey')}") { num ->
            log.info "oleAttachKey $num"
            oleAttachKey = num
        }

        aimsql.eachRow("SELECT     ReferenceKey_FK\n" +
                "FROM         Version WITH (NOLOCK)\n" +
                "WHERE     (QuoteID =  ${quoteID}) "
        ) {

            referenceKey_FK =  it.ReferenceKey_FK;
        }

        /////////SAVE INSURED
        String folder
        if (Environment.current == Environment.DEVELOPMENT) {
            folder = "ATTACHTEST";
        }
        else if (Environment.current == Environment.PRODUCTION) {
            folder = "ATTACH";
        }
        def map = [oleAttachKey_PK: "${oleAttachKey}",
                   ownerKey_FK: "'${referenceKey_FK}'",
                   fileName: "'${localFileName}'",
                   dirPath: "'Z:\\${folder}\\${quoteID}'",
                   description: "''",
                   fileTypeID: "'LOG'",
                   addedByID: "'web'",
                   dateAdded: "'${timestamp}'",
                   modifiedByID: "NULL",
                   dateModified: "NULL",
                   allowChangeFlag: "'0'",
                   OriginalFileNamePath: "'Z:\\${folder}\\${quoteID}'",
                   EMailReferenceKey_FK: "NULL",
                   UNCPath: "'\\aimsql\\aimapp\\${folder}\\${quoteID}'",
                   FileSize: "NULL",
                   DateTimeStamp: "NULL",
                   Folder: "NULL",
                   MD5Digest: "NULL",
                   FlagAllowChange: "NULL",
                   SecurityLvl: "NULL",
                   CategoryID: "'OTH'",
                   ActiveFlag: "NULL",
                   Version: "NULL"
        ]
        aimsql.execute "insert into OleAttach1 " +
                "(oleAttachKey_PK, ownerKey_FK, fileName, dirPath, description, fileTypeID, " +
                "addedByID, dateAdded, modifiedByID, dateModified, allowChangeFlag, OriginalFileNamePath, " +
                "EMailReferenceKey_FK, UNCPath, FileSize, DateTimeStamp, Folder, MD5Digest, " +
                "FlagAllowChange, SecurityLvl, CategoryID, ActiveFlag, Version) " +
                "values " +
                "($map.oleAttachKey_PK, $map.ownerKey_FK, $map.fileName, $map.dirPath, $map.description, $map.fileTypeID, " +
                "$map.addedByID, $map.dateAdded, $map.modifiedByID, $map.dateModified, $map.allowChangeFlag, $map.OriginalFileNamePath, " +
                "$map.EMailReferenceKey_FK, $map.UNCPath, $map.FileSize, $map.DateTimeStamp, $map.Folder, $map.MD5Digest, " +
                "$map.FlagAllowChange, $map.SecurityLvl, $map.CategoryID, $map.ActiveFlag, $map.Version) "
        aimsql.commit();

        log.info "INSERTED INTO AIM"
    }

    def generateCert(){
        intelledoxController.createCertificatePDF()

        return "good"
    }

    def getAttachmentsList(quoteID, dataSource_aim){
        log.info("GET ATTACHMENTS LIST")


        Sql aimsql = new Sql(dataSource_aim)
        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)
        def oleAttachKey = "";
        def referenceKey_FK = "";

        def renderString = "";

        aimsql.eachRow("SELECT     ReferenceKey_FK\n" +
                "FROM         Version WITH (NOLOCK)\n" +
                "WHERE     (QuoteID =  ${quoteID}) "
        ) {

            referenceKey_FK =  it.ReferenceKey_FK;

        }

        aimsql.eachRow("SELECT     *\n" +
                "FROM         OleAttach1 WITH (NOLOCK)\n" +
                "WHERE     (ownerKey_FK =  ${referenceKey_FK}) "
        ) {
//            log.info ("ATTACHMENT: " + it);
            renderString = renderString + it.fileName + "&,&" + it.FileSize + "&;&"
        }

        log.info renderString;

        return renderString;
    }


    def bindPrepare(params, dataSource_aim){
        log.info "AIMDAO BIND"
        log.info params

        Sql aimsql = new Sql(dataSource_aim)

        def producerID;
        def statusID;
        def flag;
        def companyID
        def taxState
        def divisionID
        def productID
        def effective
        def proposedEffective
        def teamID
        def referenceID
        def policyID
        def isInvoiced = false;
        def hasPolicyNum = false;

        aimsql.eachRow("SELECT     QuoteID, Attention, CreatedID, NamedInsured, CoverageID, Received, StatusID, " +
                "AcctExec, SubmitGrpID, ContactID, ProducerID, CompanyID, TaxState, DivisionID, ProductID, Effective, " +
                "TeamID, ReferenceID, PolicyID \n" +
                "FROM         Quote \n" +
                "WHERE     (QuoteID = '${params.aimQuoteID}')") {
            producerID = it.ProducerID
            statusID = it.StatusID
            companyID = it.CompanyID
            taxState = it.TaxState
            divisionID = it.DivisionID
            productID = it.ProductID
            effective = it.Effective
            teamID = it.TeamID
            referenceID = it.ReferenceID
            policyID = it.PolicyID
            if(policyID != null){
                hasPolicyNum = true;
            }
        }
        log.info params.aimQuoteID

        aimsql.eachRow("SELECT     QuoteID, ProposedEffective, ProductID, CompanyID \n" +
                "FROM         Version \n" +
                "WHERE     (QuoteID = '${params.aimQuoteID}')") {
            proposedEffective = it.ProposedEffective
            if(productID == null){
                productID = it.ProductID
            }
            if(companyID == null){
                companyID = it.CompanyID
            }
        }


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        //GET COMMENTS REGARDING AGENCY/PRODUCER ABOUT BINDING
        aimsql.eachRow( "SELECT     Comment \n" +
                "FROM         Producer  \n" +
                "WHERE     (ProducerID = '" + producerID + "') AND (FlagDisplayPopupNote = 'Y')" ) {
            flag = it.Comment
        }
        log.info producerID + " FLAG: " + flag
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        //GET STATUS OF QUOTE, SHOULD BE APPROVED
        /*
        SELECT StatusID FROM Quote (NOLOCK) WHERE QuoteID = '0623189'
         */
        aimsql.eachRow( "SELECT     StatusID\n" +
                "FROM         Quote WITH (NOLOCK)\n" +
                "WHERE     (QuoteID = '$params.aimQuoteID')" ) {
            log.info "StatusID: " + it
        }
        //****************************************************************************************************************


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        //GET COUNT OF IDENTICAL QUOTES, SHOULD EQUAL 1
        /*
        aimsql.eachRow( "SELECT     COUNT(*)\n" +
                "FROM         Quote\n" +
                "WHERE     (QuoteID = '0623186') AND (VersionBound IS NULL) AND (ProducerID = 'TVD') AND (NamedInsured = 'Test1') AND (TypeID IS NULL) AND (UserID = 'web') AND \n" +
                "(Attention = 'Andee Abad') AND (Received = '20170227 20:35:50.936') AND (Acknowledged = '20170227 20:35:50.936') AND (Quoted = '20170227 20:35:50.936') AND \n" +
                "(TeamID = '01') AND (DivisionID = '00') AND (StatusID = 'WB3') AND (CreatedID = 'web') AND (Renewal = 'N') AND (OldPolicyID IS NULL) AND (OldVersion IS NULL) AND \n" +
                "(OldExpiration IS NULL) AND (OpenItem = 'N') AND (PolicyID IS NULL) AND (VersionCounter = 'A') AND (InsuredID = '91213') AND (Description = 'Feature Film') AND \n" +
                "(FileLocation IS NULL) AND (Address1 = '23444') AND (Address2 = '') AND (City = 'Csldkf') AND (State = 'CA') AND (Zip = '23423') AND (Bound IS NULL) AND \n" +
                "(Submitted IS NULL) AND (SubmitType IS NULL) AND (NoteAttached IS NULL) AND (AcctExec = 'jason') AND (InsuredInterest IS NULL) AND (EC IS NULL) AND \n" +
                "(BndPremium IS NULL) AND (BndFee IS NULL) AND (CompanyID = 'RM0057') AND (ProductID IS NULL) AND (Effective IS NULL) AND (Expiration IS NULL) AND \n" +
                "(Setup IS NULL) AND (PolicyMailOut IS NULL) AND (BinderRev IS NULL) AND (PriorCarrier IS NULL) AND (TargetPremium IS NULL) AND (CsrID = 'web') AND \n" +
                "(PolicyVer IS NULL) AND (OldQuoteID IS NULL) AND (PolicyGrpID IS NULL) AND (PendingSuspenseID IS NULL) AND (ReferenceID = 91214) AND (MapToID IS NULL) AND\n" +
                " (SubmitGrpID = '0623186') AND (AcctAsst IS NULL) AND (TaxState = 'CA') AND (SicID IS NULL) AND (CoverageID = 'EPKG') AND (OldPremium IS NULL) AND \n" +
                "(AddressID IS NULL) AND (OldEffective IS NULL) AND (TaxBasis IS NULL) AND (QuoteRequiredBy IS NULL) AND (RequiredLimits IS NULL) AND \n" +
                "(RequiredDeduct IS NULL) AND (Retroactive IS NULL) AND (PrevCancelFlag IS NULL) AND (PrevNonRenew IS NULL) AND (PriorPremium IS NULL) AND \n" +
                "(PriorLimits IS NULL) AND (UWCheckList IS NULL) AND (FileSetup IS NULL) AND (ContactID = 24936) AND (SuspenseFlag = 'N') AND (PriorDeductible IS NULL) AND \n" +
                "(CategoryID IS NULL) AND (StructureID IS NULL) AND (RenewalStatusID IS NULL) AND (ClaimsFlag = 'N') AND (ActivePolicyFlag = 'N') AND (Assets IS NULL) AND \n" +
                "(PublicEntity IS NULL) AND (VentureID IS NULL) AND (IncorporatedState IS NULL) AND (ReInsuranceFlag IS NULL) AND (TaxedPaidBy IS NULL) AND \n" +
                "(Employees IS NULL) AND (Stock_52wk IS NULL) AND (NetIncome IS NULL) AND (PriorLimitsNew IS NULL) AND (LargeLossHistory = '') AND (DateOfApp IS NULL) AND \n" +
                "(Stock_High IS NULL) AND (Stock_Low IS NULL) AND (Stock_Current IS NULL) AND (MarketCap IS NULL) AND (AIM_TransDate = '20170227 20:35:50.936') AND \n" +
                "(LostBusinessFlag IS NULL) AND (YearEst IS NULL) AND (LostBusiness_Carrier IS NULL) AND (LostBusiness_Premium IS NULL) AND (AccountKey_FK = 91213) AND \n" +
                "(FlagRewrite IS NULL) AND (flagWIP IS NULL) AND (RenewalQuoteID IS NULL) AND (QuoteDueDate IS NULL) AND (QuoteStatus IS NULL) AND (BinderExpires IS NULL) \n" +
                "AND (TIV IS NULL) AND (InvoicedPremium IS NULL) AND (InvoicedFee IS NULL) AND (InvoicedCommRev IS NULL) AND (SplitAccount IS NULL) AND \n" +
                "(FileCloseReason IS NULL) AND (FileCloseReasonID IS NULL) AND (SourceOfLeadID IS NULL) AND (ServiceUWID IS NULL) AND (SubmitTypeID = 'NEW') AND \n" +
                "(SubProducerID IS NULL) AND (AgtAccountNumber IS NULL) AND (BndMarketID IS NULL) AND (RefQuoteID IS NULL) AND (FlagHeldFile IS NULL) AND \n" +
                "(HeldFileMessage IS NULL) AND (TermPremium IS NULL) AND (ProcessBatchKey_FK IS NULL) AND (PolicyInception IS NULL) AND (ClassID IS NULL) AND \n" +
                "(ScheduleIRM IS NULL) AND (ClaimExpRM IS NULL) AND (DateAppRecvd IS NULL) AND (DateLossRunRecvd IS NULL) AND (CoverageEffective IS NULL) AND \n" +
                "(CoverageExpired IS NULL) AND (SLA IS NULL) AND (Class IS NULL) AND (IRFileNum IS NULL) AND (IRDrawer IS NULL) AND (FlagOverRideBy IS NULL) AND \n" +
                "(RackleyQuoteID IS NULL) AND (FlagCourtesyFiling IS NULL) AND (FlagRPG = 'N') AND (CurrencyType IS NULL) AND (CurrencySymbol IS NULL) AND (FileNo IS NULL) \n" +
                "AND (UserDefinedStr1 = '8') AND (UserDefinedStr2 IS NULL) AND (UserDefinedStr3 IS NULL) AND (UserDefinedStr4 IS NULL) AND (UserDefinedDate1 IS NULL) AND \n" +
                "(UserDefinedValue1 IS NULL) AND (ReservedContractID IS NULL) AND (CountryID = '') AND (RatingKey_FK IS NULL) AND (eAttached IS NULL) AND (NewField IS NULL) \n" +
                "AND (TotalCoinsuranceLimit IS NULL) AND (TotalCoinsurancePremium IS NULL) AND (CurrencyExchRate IS NULL) AND (Invoiced IS NULL) AND (OtherLead IS NULL) \n" +
                "AND (LeadCarrierID IS NULL) AND (RenewTypeID IS NULL) AND (IsoCode IS NULL) AND (CedingPolicyID IS NULL) AND (CedingPolicyDate IS NULL) AND \n" +
                "(ConversionStatusID IS NULL) AND (FlagTaxExempt = '') AND (Units IS NULL) AND (SubUnits IS NULL) AND (LicenseAgtKey_FK IS NULL) AND \n" +
                "(ContractPlanKey_FK IS NULL) AND (AltStatusID IS NULL) AND (FlagNonResidentAgt = 'N') AND (CedingPolicyEndDate IS NULL) AND (TargetPremPercent IS NULL) AND \n" +
                "(AgentContactKey_FK IS NULL) AND (LAGACoverage IS NULL) AND (LAGALimoRateKey_FK IS NULL) AND (FirewallTeamID IS NULL) AND \n" +
                "(CurrencyExchRate_Old IS NULL) AND (MarketCapValue IS NULL) AND (ExternalNoteFile IS NULL) AND (PriorRate IS NULL) AND (DBAName = '') AND (MailAddress1 = '')\n" +
                " AND (MailAddress2 = '') AND (MailCity = '') AND (MailState = '') AND (MailZip = '') AND (RatingID_FK IS NULL) AND (HereOn IS NULL) AND (TaxMunicipality IS NULL)" ) {
        }
        */


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        //GET PRODUCER COMMENT INFO
        /*
        SELECT     LEN(LTRIM(CONVERT(varchar(255), ISNULL(Comment, '')))) AS Expr1
        FROM         Producer WITH (NOLOCK)
        WHERE     (ProducerID = 'TVD')
         */
        aimsql.eachRow( "SELECT     LEN(LTRIM(CONVERT(varchar(255), ISNULL(Comment, '')))) AS Expr1\n" +
                "FROM         Producer WITH (NOLOCK)\n" +
                "WHERE     (ProducerID = '$producerID')" ) {
            log.info "Producer Comments: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     ReferenceKey_FK, RecordKey_PK, Limits_Building, Limits_PersonalProperty, Limits_OtherStructures, Limits_BusinessIncomeUse, Limits_FloodQuake, Limits_Fire,
                      Limits_EDPComputer, Limits_PersonalLiablity, Limits_PremisesLiablity, Limits_PhysicalDamage, Limits_CSL, Limits_BI_Accident, Limits_BI_Person, Limits_PIP,
                      Limits_GeneralAggregate, Limits_ProductAgg, Limits_Occurrence, Limits_MedPay, Limits_Other1, Limits_Other2, Limits_Other3, Limits_Theft, TotalInsuredValue,
                      ProbableMaxLoss, Deduct_Flood, Deduct_Quake, Deduct_Wind, Deduct_Theft, Deduct_Collision, Deduct_Comp, Deduct_WaterDamage, Deduct_Liability,
                      Deduct_Other1, Deduct_Other2, Deduct_Total, FlagInspectionRequired, FlagWindCovered, RadiusOfTravel, RadiusOfTravelID, Rate, RatePer, Rate_Building,
                      Rate_Contents, Rate_Liability, Rate_Other1, Premium_Property, Premium_Liability, Premium_Other1, ISOCode, CSP_PropertyCodeID, CSP_PropertyCode,
                      NumberofLocations, NumberofUnits, Construction, ConstructionID, ProtectionClass, ClassCode, Occupancy, OccupancyID, OccupancyType, OccupancyTypeID,
                      Description, Address1, Address2, Address3, City, State, Zip, County, Territory, Zone, FlagKeyLocation, FlagSummaryRecord, LocationNumber, QuoteID, DateAdded,
                      DateModified, CreatedByID, ModifiedByID, CoverageID, Premium, AttachPoint, SizeOfLayer, Limits_AllPerils, RiskDetailKey_PK, SizeOfLayerValue, AttachPointValue,
                      CatDed
        FROM         taaRiskDetail_Coding WITH (NOLOCK)
        WHERE     (QuoteID = '0623189')
         */
        aimsql.eachRow( "SELECT     ReferenceKey_FK, RecordKey_PK, Limits_Building, Limits_PersonalProperty, Limits_OtherStructures, Limits_BusinessIncomeUse, Limits_FloodQuake, Limits_Fire, \n" +
                "Limits_EDPComputer, Limits_PersonalLiablity, Limits_PremisesLiablity, Limits_PhysicalDamage, Limits_CSL, Limits_BI_Accident, Limits_BI_Person, Limits_PIP, \n" +
                "Limits_GeneralAggregate, Limits_ProductAgg, Limits_Occurrence, Limits_MedPay, Limits_Other1, Limits_Other2, Limits_Other3, Limits_Theft, TotalInsuredValue, \n" +
                "ProbableMaxLoss, Deduct_Flood, Deduct_Quake, Deduct_Wind, Deduct_Theft, Deduct_Collision, Deduct_Comp, Deduct_WaterDamage, Deduct_Liability, \n" +
                "Deduct_Other1, Deduct_Other2, Deduct_Total, FlagInspectionRequired, FlagWindCovered, RadiusOfTravel, RadiusOfTravelID, Rate, RatePer, Rate_Building, \n" +
                "Rate_Contents, Rate_Liability, Rate_Other1, Premium_Property, Premium_Liability, Premium_Other1, ISOCode, CSP_PropertyCodeID, CSP_PropertyCode, \n" +
                "NumberofLocations, NumberofUnits, Construction, ConstructionID, ProtectionClass, ClassCode, Occupancy, OccupancyID, OccupancyType, OccupancyTypeID, \n" +
                "Description, Address1, Address2, Address3, City, State, Zip, County, Territory, Zone, FlagKeyLocation, FlagSummaryRecord, LocationNumber, QuoteID, DateAdded, \n" +
                "DateModified, CreatedByID, ModifiedByID, CoverageID, Premium, AttachPoint, SizeOfLayer, Limits_AllPerils, RiskDetailKey_PK, SizeOfLayerValue, AttachPointValue, \n" +
                "CatDed\n" +
                "FROM         taaRiskDetail_Coding WITH (NOLOCK)\n" +
                "WHERE     (QuoteID = '$params.aimQuoteID')" ) {
            log.info "taaRiskDetail_Coding: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     ReferenceKey_FK, EndorsementKey_PK, Description, FormID, DateAdded, Premium, FTPremium, RiskDetailKey_FK, CreatedByID, CoverageID, EndorseFormKey_FK,
                      Effective, DateDropped, DocumentTemplateID, EndorseDate, OrderNumber, FlagRequired, FlagEdited
        FROM         taaPolicyEndorsement WITH (NOLOCK)
        WHERE     (ReferenceKey_FK = 91226)
        ORDER BY OrderNumber
         */
        aimsql.eachRow("SELECT ReferenceKey_FK, EndorsementKey_PK, Description, FormID, DateAdded, Premium, FTPremium, RiskDetailKey_FK, CreatedByID, CoverageID, EndorseFormKey_FK, \n" +
                "Effective, DateDropped, DocumentTemplateID, EndorseDate, OrderNumber, FlagRequired, FlagEdited\n" +
                "FROM taaPolicyEndorsement WITH (NOLOCK)\n" +
                "WHERE (ReferenceKey_FK = $referenceID)\n" +
                "ORDER BY OrderNumber" ) {
            log.info "taaPolicyEndorsement: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SEEMS LIKE A QUERY TO COUNT SUBMISSIONS IDENTICAL QUOTES
        SELECT     COUNT(*) AS Expr1
        FROM         Version
        WHERE     (QuoteID = '0623189') AND (VerOriginal = 'A') AND (Version = 'A') AND (LobID IS NULL) AND (LobSubID IS NULL) AND (CompanyID = 'RM0057') AND
                      (ProductID = 'EPKG37') AND (Premium = CONVERT(money, '5750.00')) AND (Non_Premium = CONVERT(money, '0.00')) AND (Misc_Premium IS NULL) AND
                      (NonTax_Premium = CONVERT(money, '15.00')) AND (Quoted = '20170227 20:59:06.296') AND (Expires IS NULL) AND (Financed = 'Y') AND (Taxed = 'Y') AND (MEP = '')
                      AND (Rate = '') AND (GrossComm = 28.0) AND (AgentComm = 15.0) AND (Brokerage = 'N') AND (CoInsure = '') AND (StatusID = 'WB3') AND (SubmitDate IS NULL) AND
                      (SubmitPOC IS NULL) AND (MarketID = 'SAFELL') AND (Apportionment IS NULL) AND (Tax1 = CONVERT(money, '172.50')) AND (Tax2 = CONVERT(money, '11.50')) AND
                      (Tax3 = CONVERT(money, '0.00')) AND (Tax4 = CONVERT(money, '0.00')) AND (FormID = 'OCR') AND (Indicator = 'N') AND (PendingSuspenseID IS NULL) AND
                      (CommPaid = CONVERT(money, '862.50')) AND (AggregateLimits IS NULL) AND (DeductibleVal IS NULL) AND (BoundFlag IS NULL) AND (DirectBillFlag = 'N') AND
                      (ProposedEffective = '20170301 00:00:00.000') AND (ProposedExpiration = '20180301 00:00:00.000') AND (ProposedTerm = 365) AND (Retroactive IS NULL) AND
                      (RetroPeriod IS NULL) AND (MiscPrem1 IS NULL) AND (MiscPrem2 IS NULL) AND (MiscPrem3 IS NULL) AND (NonTax1 IS NULL) AND (NonTax2 IS NULL) AND
                      (NonPrem1 IS NULL) AND (NonPrem2 IS NULL) AND (PaymentRecv IS NULL) AND (PremDownPayment IS NULL) AND (Valuation IS NULL) AND (Retention IS NULL) AND
                      (AIM_TransDate IS NULL) AND (InvoiceCodes IS NULL) AND (TaxDistrib = 'SLT	172.5	A	CADOI	0	0.03 SOF	11.5	A	CA_SLA	0	0.002 ')
                      AND (PremDistrib = 'FEE	15	A	00	Y	N	') AND
                      (CAP_Limit IS NULL) AND (EPL_Limit IS NULL) AND (TakenOut_RatedTerm IS NULL) AND (PolicyTerm = '365 Days') AND (PolicyForm IS NULL) AND
                      (BillToCompanyID IS NULL) AND (StatementKey_FK IS NULL) AND (PaymentKey_FK IS NULL) AND (CommRecvd IS NULL) AND (VersionID = '0623189A') AND
                      (MarketContactKey_FK IS NULL) AND (TIV IS NULL) AND (CompanyFees IS NULL) AND (UnderLyingLimitsSum IS NULL) AND (PunitiveDamage IS NULL) AND
                      (ThirdPartyLimits IS NULL) AND (AnnualPremium IS NULL) AND (AnnualFees IS NULL) AND (FlagCollectMuniTax IS NULL) AND (TrueExpire IS NULL) AND
                      (WrittenLimits IS NULL) AND (AttachPoint IS NULL) AND (LineSlip IS NULL) AND (CoverageFormID IS NULL) AND (PositionID IS NULL) AND
                      (LobDistrib = 'EPKG	5750	28.0	15.0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	') AND (TotalTax IS NULL) AND (Total IS NULL)
                      AND (TotalAmount IS NULL) AND (TaxesPaidBy = 'A') AND (ResubmitDate IS NULL) AND (FeeSchedule = 'Policy Fee	$15.00')
                      AND (LobDistribSched = 'Entertainment Package	$5,750	15.0') AND (DeductType = '') AND
                      (PremiumFinanceFee IS NULL) AND (LOB_Field1 IS NULL) AND (LOB_Field2 IS NULL) AND (LOB_Field3 IS NULL) AND (LOB_Flag1 IS NULL) AND (LOB_Prem1 IS NULL)
                       AND (LOB_Prem2 IS NULL) AND (LOB_Prem3 IS NULL) AND (LOB_Limit1 = '') AND (LOB_Limit2 = '') AND (LOB_Limit3 = '') AND (LOB_Limit4 = '') AND (LOB_Limit5 = '')
                      AND (LOB_Limit6 = '') AND (LOB_Deduct1 = '') AND (LOB_Deduct2 = '') AND (LOB_Limit1Value = CONVERT(money, '0.00')) AND (LOB_Limit2Value = CONVERT(money,
                      '0.00')) AND (LOB_Limit3Value = CONVERT(money, '0.00')) AND (LOB_Limit4Value = CONVERT(money, '0.00')) AND (LOB_Limit5Value = CONVERT(money, '0.00')) AND
                      (LOB_Limit6Value = CONVERT(money, '0.00')) AND (LOB_Deduct1Value = CONVERT(money, '0.00')) AND (LOB_Deduct2Value = CONVERT(money, '0.00')) AND
                      (TaxesPaidByID = 'CADOI') AND (FlagMultiStateTax IS NULL) AND (MultiStateDistrib IS NULL) AND (AdmittedPremium IS NULL) AND (RatedPremium IS NULL) AND
                      (APR IS NULL) AND (AmountFinanced IS NULL) AND (DownPayment IS NULL) AND (Payments IS NULL) AND (FinCharge IS NULL) AND (TotalPayment IS NULL) AND
                      (NumPayments IS NULL) AND (FinanceDueDate IS NULL) AND (ReferenceKey_FK = 91226) AND (RemitAmount IS NULL) AND (CollectAmount IS NULL) AND
                      (DownFactor IS NULL) AND (TerrorActPremium IS NULL) AND (TerrorActGrossComm IS NULL) AND (TerrorActAgentComm IS NULL) AND (TerrorActMEP IS NULL) AND
                      (TerrorActStatus = 'WAIVED') AND (FlagOverrideCalc = 'N') AND (TerrorTaxes = CONVERT(money, '0.00')) AND (FlagFinanceWithTRIA IS NULL) AND (FlagMultiOption = '')
                       AND (FlagFeeCalc = 'N') AND (ParticipantCo1ID IS NULL) AND (ParticipantCo2ID IS NULL) AND (ParticipantCo3ID IS NULL) AND (UserDefinedStr1 IS NULL) AND
                      (UserDefinedStr2 IS NULL) AND (UserDefinedStr3 IS NULL) AND (UserDefinedStr4 IS NULL) AND (UserDefinedDate1 IS NULL) AND (UserDefinedValue1 IS NULL) AND
                      (LOB_Coverage1 = '') AND (LOB_Coverage2 = '') AND (LOB_Coverage3 = '') AND (LOB_Coverage4 = '') AND (LOB_Coverage5 = '') AND (LOB_Coverage6 = '') AND
                      (LOB_DeductType1 = '') AND (LOB_DeductType2 = '') AND (DeclinationReasonID IS NULL) AND (ERPOption IS NULL) AND (ERPDays IS NULL) AND
                      (ERPPercent IS NULL) AND (ERPPremium IS NULL) AND (TaxwoTRIA1 = CONVERT(money, '172.50')) AND (TaxwoTRIA2 = CONVERT(money, '11.50')) AND
                      (TaxwoTRIA3 = CONVERT(money, '0.00')) AND (TaxwoTRIA4 = CONVERT(money, '0.00')) AND (LOB_Prem4 IS NULL) AND (LOB_Coverage7 = '') AND
                      (LOB_Coverage8 = '') AND (LOB_Limit7 = '') AND (LOB_Limit8 = '') AND (LOB_Limit7Value = CONVERT(money, '0.00')) AND (LOB_Limit8Value = CONVERT(money,
                      '0.00')) AND (LOB_Prem5 IS NULL) AND (LOB_Prem6 IS NULL) AND (LOB_Prem7 IS NULL) AND (LOB_Prem8 IS NULL) AND (CoverageList IS NULL) AND
                      (DocucorpFormList IS NULL) AND (TerrorActPremium_GL IS NULL) AND (FlagRecalcTaxes IS NULL) AND (DateMktResponseRecvd IS NULL) AND
                      (CancelClause IS NULL) AND (PremiumProperty = CONVERT(money, '0.00')) AND (PremiumLiability = CONVERT(money, '0.00')) AND (PremiumOther = CONVERT(money,
                       '0.00')) AND (EndorsementKey_FK IS NULL) AND (DefaultRiskCompanyID IS NULL) AND (MarketPOCKey_FK IS NULL) AND (ExcludedFinPrem IS NULL) AND
                      (AggregateLimitsTemp IS NULL) AND (RetentionTemp IS NULL) AND (RetentionTemp2 IS NULL) AND (RetentionValue IS NULL) AND (Tax1Name = 'Surplus Lines Tax')
                      AND (Tax2Name = 'Stamping Office Fee') AND (Tax3Name = '') AND (Tax4Name = '') AND (AgentDeposit = CONVERT(money, '-862.50')) AND
                      (TaxwoTRIA5 = CONVERT(money, '0.00')) AND (Tax5 = CONVERT(money, '0.00')) AND (Tax5Name = '') AND (LOB_Coverage9 = '') AND (LOB_Limit9 = '') AND
                      (LOB_Limit9Value = CONVERT(money, '0.00')) AND (LOB_Prem9 IS NULL) AND (FeeSchedule2 IS NULL) AND (TaxwoTRIA6 = CONVERT(money, '0.00')) AND
                      (Tax6Name = '') AND (TaxwoTRIA7 = CONVERT(money, '0.00')) AND (Tax7Name = '') AND (TaxwoTRIA8 = CONVERT(money, '0.00')) AND (Tax8Name = '') AND
                      (Tax6 = CONVERT(money, '0.00')) AND (Tax7 = CONVERT(money, '0.00')) AND (Tax8 = CONVERT(money, '0.00')) AND (InsuredDeposit = CONVERT(money, '0.00')) AND
                      (CopiedFrom IS NULL) AND (InstallmentPlanID IS NULL) AND (DownPaymentAmt IS NULL) AND (Installments IS NULL) AND (FrequencyID IS NULL) AND
                      (InstallmentFee IS NULL) AND (InstallmentFeeID IS NULL) AND (AgentDepositwoTRIA = CONVERT(money, '-862.50')) AND (InsuredDepositwoTRIA = CONVERT(money,
                      '0.00')) AND (InstallFeeInfo IS NULL) AND (InstallFeeInvKey IS NULL) AND (InstallmentFeeFirst IS NULL)
         */
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     OwnerID, State, SLALicense, Taxed, Comments
        FROM         CompAdmt WITH (NOLOCK)
        WHERE     (OwnerID = 'RM0057') AND (State = 'CA')
         */
        aimsql.eachRow("SELECT     OwnerID, State, SLALicense, Taxed, Comments\n" +
                "FROM         CompAdmt WITH (NOLOCK)\n" +
                "WHERE     (OwnerID = '$companyID') AND (State = '$taxState')" ) {
            log.info "CompAdmt: " + it
        }
        //****************************************************************************************************************


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     InvoiceID, InvoiceKey_PK, QuoteID, PolicyKey_FK, Effective, ProducerID, BillingType, BillToCode, Premium, Non_Premium, Misc_Premium, NonTax_Premium, Tax1,
                      Tax2, Tax3, Tax4, InvoiceTypeID, PolicyID, Description, TaxState, InvoiceTotal, BillToAddressID, PaymentToAddressID, MemoInvoiceFlag, OutStandingAmt,
                      DirectBillFlag, InstallmentPlanID, DueDate, NumberOfPayments, TotalGrossComm, TotalAgentComm, TotalDue, TotalPayable, Note, GrossComm, AgentComm,
                      CompanyCollectedFees, AgencyCollectedFees, TotalPremium, InstallmentID, PayableID, InstallmentFlag, Message, TaxPaidBy, Taxed, TaxesPaidByID, UserHoldFlag,
                      CourtesyFilingID, DefaultPayableID, Ledger, ReversedFlag, PostDate, FrequencyID, IncludeAgentComm, IncludeCompanyFee, IncludeAgencyComm,
                      IncludeAgencyFee, DownPercent, StatusID, InstallmentItem, Initial_InvoiceFlag, PayToCode, AcuityTargetCompanyID, InsuredID, TeamID, InvoicedByID,
                      AcuityStatusID, InvoiceDate, OwnerKey_FK, InstallmentTotal, Address1, Address2, City, State, Zip, RemitAddress1, RemitAddress2, RemitCity, RemitState, RemitZip,
                      InvTypeID, EndorsementKey_FK, ExportDate, HeldSuspenseKey, InvoiceTerms, InstallPayOOBFlag, AgencyCollectedTaxes, TotalFeeRevenue, TotalNetDueCompany,
                      AccountingEffectiveDate, ReversedInvoiceKey, ExportStatusID, AcuityBatchKey, ProgramID, TotalInstallmentsDue, RiskLimits, RiskZip, RiskCounty, PaidByStatement,
                      DownPaymentAmt, PayToDueDate, DateCreated, FinanceID, FlagFinanced, Endorsement, CompanyCollectedTaxes, TotalTaxes, FlagSplit, MarketID, ContractID,
                      OtherTaxes, OtherExpense, AcctExec, CurrencyType, CurrencyAmount, ProductID, CoverageID, OwnerKey_SK, ZipPlus, TotalFeeExpense, TotalRevenue,
                      TotalFeeCommission, DatePrinted, GLPeriod, FlagRebill, TotalPayments, TermPremium, MinimumPremium, ProcessBatchKey_FK, EffectiveDate, DivisionID,
                      DateTaxesFiled, FlagMultiPremium, DatePremiumReported, AdmittedPremium, FlagOverrideComm, CommissionSplitKey_FK, Entity, CstCtr, ProductionSplitKey_FK,
                      TotalAgentCommOnly, TotalAgentFeeTaxes, TotalAPCompany, TotalAPTax, TotalNetFeeRevenue, TotalNetComm, Expiration, TotalNetRevenue, TotalFees,
                      FlagCourtesyFiler, FlagProductionSplit, SourcePremium, RebillInvoiceKey_FK, DownPaymentMemo, TotalBasisAmount, CompanyID, InvoicePostedByID,
                      TerrorismPremium_GL, TerrorismPremium, FlagSuppress, FlaggedAR, FlaggedAP, MapToID, Tax5, Tax6, Tax7, Tax8, AddToExisting, AR_AccountID, BatchID,
                      StatusID_Old, StatusID_Old2, OLD_AcuityTargetCompanyID, DateBackOutFiled, PerArchFiled, ArchBatchKey, FlagCancelFiledToArch, TaxKeyPK, OrigPolNum,
                      DateTaxesAccepted, FlagFileSLSO, SLSOErrorType, SLSOBatchKey_FK, MasterInstallKey_FK, FlagMasterInstall, DepositPremium, InstallmentNo, AggregateLimits,
                      FlagMailedOut, FlagEscrow
        FROM         InvoiceHeader WITH (NOLOCK)
        WHERE     (PolicyKey_FK = NULL)
        ORDER BY InvoiceKey_PK
         */
        aimsql.eachRow("SELECT * \n" +
                "FROM InvoiceHeader WITH (NOLOCK)\n" +
                "WHERE (PolicyKey_FK = $policyID)\n" +
                "ORDER BY InvoiceKey_PK" ) {
            log.info "InvoiceHeader: " + it
            if(it != null){
                isInvoiced = true
            }
        }
        //****************************************************************************************************************

        ////////////////////////////////////////////////////CHECK IF SUBMISSION ALREADY HAS POLICY NUMBER/////////////////////////////////////////////////////////
        if(hasPolicyNum){
            return "hasPolicyNum"
        }
        ////////////////////////////////////////////////////CHECK IF SUBMISSION IS ALREADY INVOICED/////////////////////////////////////////////////////////
        else if(isInvoiced){
            return "isInvoiced"
        }
        //////////////////////////////////////IF SUBMISSION IS NOT ALREADY INVOICED AND OK TO PROCEED WITH POLICY/////////////////////////////////////////////////////////
        else{
            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            //GET A REFERENCEID
            def policyKeyID =0;
            aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
                log.info "PolicyKeyID $num"
                policyKeyID = num
            }
//          log.info "PolicyKeyID $policyKeyID"
            //****************************************************************************************************************
            return policyKeyID
        }


        /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////UP TO WHERE USER HAS CLICKED THE FIRST INITAL BIND BUTTON/////////////////////////////////////////////////////////
        ////////////////////////////////////////////////USER HAS NOT CLICKED ON A POLICY NUMBER METHOD YET/////////////////////////////////////////////////////////
        ////////////////////////////////////////////////SHOULD NOW BE SHOWN POLICY NUMBER OPTIONS/////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

    }

    def bindGetPolicyNumberFromRegister(params, dataSource_aim) {
        log.info "AIMDAO BIND GET POLICY NUMBER FROM REGISTER"
        log.info params

        Sql aimsql = new Sql(dataSource_aim)

        def producerID;
        def statusID;
        def flag;
        def companyID
        def taxState
        def divisionID
        def productID
        def effective
        def proposedEffective
        def teamID
        def referenceID
        def policyID
        def isInvoiced = false;
        def hasPolicyNum = false;

        aimsql.eachRow("SELECT     QuoteID, Attention, CreatedID, NamedInsured, CoverageID, Received, StatusID, " +
                "AcctExec, SubmitGrpID, ContactID, ProducerID, CompanyID, TaxState, DivisionID, ProductID, Effective, " +
                "TeamID, ReferenceID, PolicyID \n" +
                "FROM         Quote \n" +
                "WHERE     (QuoteID = '${params.aimQuoteID}')") {
            producerID = it.ProducerID
            statusID = it.StatusID
            companyID = it.CompanyID
            taxState = it.TaxState
            divisionID = it.DivisionID
            productID = it.ProductID
            effective = it.Effective
            teamID = it.TeamID
            referenceID = it.ReferenceID
            policyID = it.PolicyID
            if(policyID != null){
                hasPolicyNum = true;
            }
        }
        log.info params.aimQuoteID

        aimsql.eachRow("SELECT     QuoteID, ProposedEffective, ProductID, CompanyID \n" +
                "FROM         Version \n" +
                "WHERE     (QuoteID = '${params.aimQuoteID}')") {
            proposedEffective = it.ProposedEffective
            if(productID == null){
                productID = it.ProductID
            }
            if(companyID == null){
                companyID = it.CompanyID
            }
        }


        /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////USER HAS CLICKED GET POLICY NUMBER FROM REGISTER/////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        EXEC spGetPolicyRegister @CompanyID = 'RM0057', @DivisionID = '00', @TaxState = 'CA', @ProductID = 'EPKG37', @Effective = '3/1/2017', @TeamID = '01'
         */
        def p1 = companyID
        def p2 = divisionID
        def p3 = taxState
        def p4 = productID
        def p5 = proposedEffective
        def p6 = 0
        def p7 = teamID
        log.info "companyID: " + companyID
        log.info "divisionID: " + divisionID
        log.info "taxState: " + taxState
        log.info "productID: " + productID
        log.info "proposedEffective: " + proposedEffective
        log.info "teamID: " + teamID
        def rows = aimsql.callWithRows("{call dbo.spGetPolicyRegister('$p1', '$p2', '$p3', '$p4', '$p5', $p6, '$p7', ${Sql.ALL_RESULT_SETS})}") { num ->
            log.info "ReferenceID $num"
        }
        log.info rows
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     FlagDivProductPolReg
        FROM         Control WITH (NOLOCK)
         */
        aimsql.eachRow("SELECT FlagDivProductPolReg\n" +
                "FROM Control WITH (NOLOCK)" ) {
            log.info "Control-FlagDivProductPolReg: " + it
        }
        //****************************************************************************************************************

        return rows;


    }

    def bindReviewSubmission(params, dataSource_aim) {
        log.info "AIMDAO BIND REVIEW SUBMISSION"
        log.info params

        Sql aimsql = new Sql(dataSource_aim)

        def producerID;
        def statusID;
        def flag;
        def companyID
        def taxState
        def divisionID
        def productID
        def effective
        def proposedEffective
        def teamID
        def referenceID
        def policyID
        def coverageID

        aimsql.eachRow("SELECT     QuoteID, Attention, CreatedID, NamedInsured, CoverageID, Received, StatusID, " +
                "AcctExec, SubmitGrpID, ContactID, ProducerID, CompanyID, TaxState, DivisionID, ProductID, Effective, " +
                "TeamID, ReferenceID, PolicyID, CoverageID \n" +
                "FROM         Quote \n" +
                "WHERE     (QuoteID = '${params.aimQuoteID}')") {
            producerID = it.ProducerID
            statusID = it.StatusID
            companyID = it.CompanyID
            taxState = it.TaxState
            divisionID = it.DivisionID
            productID = it.ProductID
            effective = it.Effective
            teamID = it.TeamID
            referenceID = it.ReferenceID
            policyID = it.PolicyID
            coverageID = it.CoverageID
        }
        log.info params.aimQuoteID

        aimsql.eachRow("SELECT     QuoteID, ProposedEffective, ProductID, CompanyID \n" +
                "FROM         Version \n" +
                "WHERE     (QuoteID = '${params.aimQuoteID}')") {
            proposedEffective = it.ProposedEffective
            if (productID == null) {
                productID = it.ProductID
            }
            if (companyID == null) {
                companyID = it.CompanyID
            }
        }

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        UPDATE    Register
        SET              PolicyID = 'NESF16-008', Issued = 'Y', QuoteID = '0623189', UserID = 'web'
        WHERE     (CompanyID = 'RM0057') AND (PolicyID = 'NESF16-008') AND (Issued = 'N')
         */
        log.info "UPDATE    Register\n" +
                "SET PolicyID = '$params.policyNumber', Issued = 'Y', QuoteID = '$params.aimQuoteID', UserID = 'web'\n" +
                "WHERE (CompanyID = '$companyID') AND (PolicyID = '$params.policyNumber') AND (Issued = 'N')"
        aimsql.execute("UPDATE    Register\n" +
                "SET PolicyID = '$params.policyNumber', Issued = 'Y', QuoteID = '$params.aimQuoteID', UserID = 'web'\n" +
                "WHERE (CompanyID = '$companyID') AND (PolicyID = '$params.policyNumber') AND (Issued = 'N')" )
        log.info "Rows Updated (Suspense): " + aimsql.getUpdateCount()
        //****************************************************************************************************************


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//      exec dbo.AddTransaction  @ReferenceID='0623189',@UserID='web',@Description='Policy NESF16-008 assigned from register by UW',
//      @Date='2017-03-05 13:34:02:267',@StatusID='PNA',@ImageID=NULL,@TypeID=NULL,@QuoteVersion='A',@ToNameKey=0,@DocTemplateID=NULL,@AttachmentIcon=0,
//      @SourceDateTime='1899-12-30 00:00:00:000'
        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)
        def p1 = params.aimQuoteID
        def p2 = "web"
        def p3 = "Policy $params.policyNumber assigned from register by UW"
        def p4 = timestamp
        def p5 = "PNA"
        def p6 = null //imageID
        def p7 = null  //'B' = Binder
        def p8 = 'A' //QuoteVersion
        def p9 = 0  //ToNameKey
        def p10 = null //DocTemplateID
        def p11 = 0 //AttachmentIcon
        def p12 = '1899-12-30 00:00:00:000' //SourceDateTime
        def addTransactionRows = aimsql.call("{call dbo.AddTransaction( '$p1', '$p2', '$p3', '$p4', '$p5', $p6, " +
                "$p7, '$p8', $p9, $p10, $p11, '$p12')}") { num ->
            log.info "addTransaction: $num"
        }
        log.info "addTransactionRows: " + addTransactionRows
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     LowPolicyTrigger
        FROM         Control WITH (NOLOCK)
         */
        aimsql.eachRow("SELECT LowPolicyTrigger\n" +
                "FROM Control WITH (NOLOCK)" ) {
            log.info "Control-LowPolicyTrigger: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     AdminEmail
        FROM         Control WITH (NOLOCK)
         */
        aimsql.eachRow("SELECT     TransDecript\n" +
                "FROM         Status WITH (NOLOCK)\n" +
                "WHERE     (StatusID = 'QED')" ) {
            log.info "Control-TransDecript: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     FlagExpandedULGridFormat
        FROM         Control WITH (NOLOCK)
         */
        aimsql.eachRow("SELECT     FlagExpandedULGridFormat\n" +
                "FROM         Control WITH (NOLOCK)" ) {
            log.info "Control-FlagExpandedULGridFormat: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID
        FROM         lkpProduct
        WHERE     (CompanyID = 'RM0057') OR (CompanyID = 'ALL')
        ORDER BY Description
         */
        aimsql.eachRow("SELECT     ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID\n" +
                "FROM         lkpProduct\n" +
                "WHERE     (CompanyID = '$companyID') OR (CompanyID = 'ALL')\n" +
                "ORDER BY Description" ) {
            log.info "lkpProduct: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     CRPartTeams
        FROM         Control WITH (NOLOCK)
         */
        aimsql.eachRow("SELECT     CRPartTeams\n" +
                "FROM         Control WITH (NOLOCK)" ) {
            log.info "CRPartTeams: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     FlagHidePremiumLOB
        FROM         Control WITH (NOLOCK)
         */
        aimsql.eachRow("SELECT     FlagHidePremiumLOB\n" +
                "FROM         Control WITH (NOLOCK)" ) {
            log.info "FlagHidePremiumLOB: " + it
        }
        //****************************************************************************************************************


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     DefaultRatingProgram
        FROM         Control WITH (NOLOCK)
         */
        aimsql.eachRow("SELECT     DefaultRatingProgram\n" +
                "FROM         Control WITH (NOLOCK)" ) {
            log.info "DefaultRatingProgram: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     LOBScreen
        FROM         Coverage WITH (NOLOCK)
        WHERE     (CoverageID = 'EPKG')
         */
        aimsql.eachRow("SELECT     LOBScreen\n" +
                "FROM         Coverage WITH (NOLOCK)\n" +
                "WHERE     (CoverageID = '$coverageID')" ) {
            log.info "LOBScreen: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     FlagPremFinFromQuote
        FROM         Control WITH (NOLOCK)
         */
        aimsql.eachRow("SELECT     FlagPremFinFromQuote \n" +
                "FROM         Control WITH (NOLOCK)" ) {
            log.info "FlagPremFinFromQuote: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     ActiveFlag, ReplacementProductID, ExpirationDate
        FROM         Product WITH (NOLOCK)
        WHERE     (ProductID = 'EPKG37')
         */
        aimsql.eachRow("SELECT     ActiveFlag, ReplacementProductID, ExpirationDate\n" +
                "FROM         Product WITH (NOLOCK)\n" +
                "WHERE     (ProductID = '$productID')" ) {
            log.info "Product: " + it
        }
        //****************************************************************************************************************
    }

    def bind(params, dataSource_aim) {
        log.info "AIMDAO BIND"
        log.info params

        Sql aimsql = new Sql(dataSource_aim)

        def producerID;
        def statusID;
        def flag;
        def companyID
        def taxState
        def divisionID
        def productID
        def effective
        def proposedEffective
        def proposedExpiration
        def proposedTerm
        def teamID
        def taxed
        def quoteContactID
        def acctExec
        def marketID
        def premium
        def nonTaxPrem
        def grossComm
        def agentComm
        def totalTaxes
        def version_referenceKeyID

        def submissionInfoMap=[:]
        def versionRecordMap = [];
        def quoteRecordMap = [:];

        def where = "(QuoteID='$params.aimQuoteID')";
        quoteRecordMap = selectAllFromTableWhereWithFormatting("Quote", where, dataSource_aim)[0]

        versionRecordMap = selectAllFromTableWhereWithFormatting("Version", where, dataSource_aim)[0]

        aimsql.eachRow("SELECT     QuoteID, Attention, CreatedID, NamedInsured, CoverageID, Received, StatusID, " +
                "AcctExec, SubmitGrpID, ContactID, ProducerID, CompanyID, TaxState, DivisionID, ProductID, Effective, TeamID \n" +
                "FROM         Quote \n" +
                "WHERE     (QuoteID = '${params.aimQuoteID}')") {
            producerID = it.ProducerID
            statusID = it.StatusID
            companyID = it.CompanyID
            taxState = it.TaxState
            divisionID = it.DivisionID
            productID = it.ProductID
            effective = it.Effective
            teamID = it.TeamID
            quoteContactID = it.ContactID
            acctExec = it.AcctExec

            it.toRowResult().each { key, val ->
                submissionInfoMap["Quote-" + key] = val;
            }
        }

        aimsql.eachRow("SELECT     QuoteID, ProposedEffective, ProposedExpiration, ProposedTerm, ProductID, Taxed, CompanyID, " +
                "MarketID, Premium, NonTax_Premium, GrossComm, AgentComm, ReferenceKey_FK, " +
                "Tax1, Tax2, Tax3, Tax4  \n" +
                "FROM         Version \n" +
                "WHERE     (QuoteID = '${params.aimQuoteID}')") {
            proposedEffective = it.ProposedEffective
            proposedExpiration = it.ProposedExpiration
            proposedTerm = it.ProposedTerm
            taxed = it.Taxed
            marketID = it.MarketID
            premium = it.Premium
            nonTaxPrem = it.NonTax_Premium
            grossComm = it.GrossComm
            agentComm = it.AgentComm
            version_referenceKeyID = it.ReferenceKey_FK

            totalTaxes = it.Tax1 + it.Tax2 + it.Tax3 + it.Tax4

            if (productID == null) {
                productID = it.ProductID
            }
            if (companyID == null) {
                companyID = it.CompanyID
            }
            if(effective == null){
                effective = it.ProposedEffective
            }

            it.toRowResult().each { key, val ->
                submissionInfoMap["Version-" + key] = val;

            }
        }

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        SELECT     Name, Address1, Address2, Phone, Zip_Plus, Country, City, State, Fax, AddressID, NAIC, Principal, UserDrive, AttachDir, FinancingFlag, LoginMethod, Days_Receipt,
                      Tax_ID, LocalList, MetroList, NonLDAreaCodes, Server, FaxServer, MonoState, TaxRate1, TaxRate2, TaxRate3, TaxRate4, SaveDir, DefaultState,
                      DefaultSearchMethod, InvoiceTerm, AutoCalcTaxes, LicensedStates, AccountingSystem, IsMktCompany, LockSystemFlag, FlagInvoiceDetail, BDEAlias,
                      FlagOverRideTax, DefaultPrinter, DefaultFaxDriver, FlagIntegratedRating, FlagOverwriteFees, protectOnSpellCheck, FlagOverwriteComm, ReturnListFormat,
                      DownPaymentPercent, ShowDBA, NameType, CharCase, FlagAllowOnFlyAdds, RecordFeeByTaxableStatus, AllowDirectInputForFees, DefaultInvoiceTeamID,
                      CompanyDefaultToNonAdmitted, CheckAgentLicensing, LvlBackDateCancels, LvlSuspensedAgentOverride, LvlRemoveDocProtection, LvlGrossCommChg,
                      LvlAgentCommChg, LvlEditInvoice, DeleteSuspenses, HighlightRequiredFields, PolicyTerm, WarnOnCommChg, LvlBindWithSuspendedAgents, BackDatePeriod,
                      AllowDuplicateFees, LvlDocumentDesigner, LvlAgentMaint, LvlCompanyMaint, LvlProductMaint, LvlTeamMaint, LvlUserMaint, LvlLookupCodes, LvlDataEditor,
                      LvlPolRegMaint, LvlInvoiceRegister, LvlAdHocQuery, LvlCrystalReports, LvlReportsManager, HideMenuItems, LvlInvoiceWithoutPolNo, CheckSuspensesOnStartUp,
                      LicenseMod, LvlBindInactivePolicy, DateFormat, Epoch, BinderBill, RemitToDivisionAddr, ExportInvoiceDetail, MgaID, ForceVerifyTaxes, LvlChangeMEP,
                      UseInsuredSearch, FlagFullAudit, StdTerms, SortActivityLogAsc, AllowDeleteProtectedFields, WindowsTerminalServer, LvlChgBillingMethod, ComputeCancelPremium,
                      AcctgAddress1, AcctgAddress2, AcctgCity, AcctgState, AcctgZip, AcctgContact, AcctgPhone, MailAddress1, MailAddress2, MailCity, MailState, MailZip, BuildVersion,
                      DatabaseVersion, DefaultPolicySeperator, FlagOutLookEMail, LvlChangeTaxFactors, FlagSQL7, FlagInstallToCurrentMonth, FlagAllowCancelExpiredPolicies,
                      FlagUseProductionSplit, LvlChangeStatusCode, FlagExpandedULGridFormat, FlagInternationalAddrFormat, FlagUseQuickQuote, FlagWarnUnInvoicedPolicy,
                      FlagCrystalRptInvoice, LvlChangeProgramDefaults, LvlAdjustBoundAgyComm, LvlAllowCommOverPay, FlagHTMLHelp, FlagAddRiskUnits, FlagUseCoverageDetail,
                      LvlDMU, LvlEisMon, Afd_V2, FlagHideAPTab, LvlShowAllData, LvlShowTeamData, FlagUseSeperateInsuredID, FlagDmu, DefaultCompanyID,
                      FlagWarnUserOnInvalidPrinter, BindMonthsInPast, BindMonthsInFuture, FlagInvoiceRequired, AcctgFax, LvlChangeMEP_Old, FlagInstallToCurrentMonth_OLD,
                      FlagInstallToOld_v2, FlagSQL7_Old, LvlChangeTaxFactors_Old, ShowAllData, FlagAllowInvoiceBackDate, FlagUseShadowPrinter, ShadowPrinterDriver,
                      FlagUseDivision, FlagUseDivisionName, FlagPaidByStatement, FlagCashBasis, FlagAllowZeroComm, DefaultRatingProgram, DefaultRatingExportDir,
                      DefaultRatingImportDir, DefaultRatingFileExt, FlagPostDBCommToAP, FlagPreventInsuredEdit, FlagDivProductPolReg, FlagInstallAcctgEffDate, FlagPadGridWithTab,
                      FlagTermPremiumRequired, FlagShowCoverageEndorseTab, LvlRenewalMgr, FlagSuppressInstallSchedules, FlagManageSQLLogin, FlagAllowUnSyncLogin,
                      LvlAllowTransactionDescriptChg, LvlAssocProgram, LvlDefaultText, LvlNAIC, LvlChangePaidByStatement, ServicePolicyFee, ServiceFeeTranCd, RecvTermsID,
                      RecvTermFrom, TermsID, TermFrom, TermDays, FlagAgentPayByStatement, FlagUseSessionDir, FlagDebugMode, LvlViewUnAppliedPayments,
                      FlagEnableClaimReplication, DefaultInvoiceMessage, FlagHidePremiumLOB, FlagSortPickLists, FlagFilterProductByCoverage, FlagSuspenseToCSR,
                      FlagProhibitQuoteInsuredEdit, DefaultPremFinanceFee, FlagMapF12KeyToIR, ImageRightPrintDirectory, IRDrawer, IRDrawerID, LvlCancelAnySuspense,
                      FlagCopyCancelDateToExpiration, FlagUseImageRightPCL, FlagTrackClaimDetail, FlagDisplayIRConfirmation, FlagAllowNamedInsuredEdit, FlagUseClaimHistDetail,
                      FlagCheckMGALicense, LvlAllowTransactionDescriptCh, FlagAllowTransactionDescriptCh, FlagUseOutlookCOM, FlagEnableF9Key, FlagUseNewFeeSchedule,
                      FlagUseReportsAlias, DefaultSearchFields, FlagUseAdmittedPremium, UCnt, LCnt, LvlRating, LvlPhoneBook, LvlInvoiceCodes, LvlStatusCodes, LvlTaxTable,
                      FlagIRDropPrint, FlagManualSelectFinancePlan, LvlCourtesyFiling, BinderExpiresDays, FlagFilterRiskCo, LvlAllowBinderBackDate, DefaultPhoneFilter,
                      FlagUseMasterKey, DefaultInspectionCompanyID, ProductionFilter, FlagUseLocalCRPE, DefaultEntity, DefaultCstCtr, DefaultPDFDriver, DefaultCaptureDriver,
                      FlagCopyAttachments, DefaultSubmitMethod, FlagFinanceWithTRIA, FlagMultiStateTaxes, FlagEndorseDetail, FlagLayeredProperty, FlagRPG,
                      LvlOverRideRequiredFields, FlagAutoCalcFees, TemplateFinanceAgreement, FlagMarketWizardv2, FlagDisplayDualSearch, FlagShowUserInbox,
                      FlagShowInternetInbox, FlagUseMGACode, LvlManageClaims, IntraNetLink, FlagAllowCreditInstallments, FlagResetPrinter, UseNormalScreenResMode,
                      FlagSupressCurrencySymbol, AcctExecLabel, CsrLabel, MktgReptLabel, TimeOut, FlagAllowInstallmentEdit, ReportLinkKey, FlagBlobSupport, DomainName,
                      FlagCashWithAppActive, LvlRemoveAttachment, LvlProductionReports, DateAdded, DateModified, CreatedByID, ModifiedByID, ActiveFlag, CommPercision,
                      LvlReverseInvoice, FlagUseProductionSplit_v2, FlagAllocation_v2, ExternalAttachDir, FlagOnlyEMailAsPDF, MinimumPasswordLength, PasswordRules,
                      EMailRefFormat, FlagRackley, FlagCreateAttachment, FlagLOB_v2, FlagCaptureDocumentEMail, ActivitySQL, AdminEmail, SupportEMail, InvoicePeriod,
                      FlagRemovePhoneChar, IRNamingFormat, FlagRepositionIR, FlagIRByFileRefNo, FlagPDFFactory, ClaimNumberMethod, ExcludedTables, IRFileNumFormat,
                      FlagFilterMarketByCoverage, FlagFilterRiskCoByCoverage, Entity, CstCtr, FlagFireWallOn, ParamExpireDays, ParamQuoteExpiresDays, ParamQuoteOldDays,
                      FlagEnableCisDailyMaintJob, DailyMaintStartTime, LvlNonPremiumBinderChg, BDEFIx, FlagDocucorpDLL, FlagUseWordDLL, FlagAutoCreateIRFile, FlagFinancePro,
                      FlagMaintainPolHist, LvlInvoice, LvlProductionLog, FlagEnableRequiredFields, FlagAllowMultiCompanyPlans, FlagAllowPlansOnInvoice, FlagCustomRenewalProcess,
                      PhoneBookFilter, FlagGlobalF8, IRField1, IRField2, IRField3, IRField4, IRField5, IRFUPPath, FlagIRUserIndex, FlagMultiOptionGrid, FlagSyncFieldLength,
                      FlagAIMClient, FlagNewInvNoOnReverse, FlagUseCommPropCoverages, FlagUseAppRole, AppValue, FlagDisableAgtRecordChg, FieldTest, MSWORD,
                      SECURITY_TYPE, Count, Old_LvlAllowCommOverPay, FlagProhibitInvoicing, ContactsPath, FlagMaskPW, FlagAllowInvContractAll, FlagPremFinFromQuote, BordDLL,
                      FlagAttachTaxAffidavit, FlagSwapSectionLabels, FlagBlockWhiteText, CustomBuild, AgtDepPctPremium, AgtDepPctFees, AgtDepPctTaxes, ExternalNoteDirectory,
                      LowPolicyTrigger, FlagUseAcctExecForFees, FlagProhibitQuoteAddressEdit, FlagSuppressSuspOnInstall, FlagExpChgLvl9InvReg, FlagUsePrevDocument,
                      AgtDepMinPrem, AgtDepCoverages, FlagPolEndDescrip, FlagCanadianProvinces, FlagDocManageType, DCCabinet, DCTempDir, FlagDCBypassAttachDir,
                      DCAttachCategory, LnStagingDir, LNAutoCaptureDir, LibertyNetDir, FlagEndFormV2, RSUITargetDir, attArchiveDir, FlagUseFormsV2, attArchivePeriod, FlagLotusEMail,
                      CRPartTeams, FlagMultiPremInstall, DCCabinetQuery, DCFilter, FlagInstallV2, FlagCombineIRUserIndex, FlagEndRoundToCents, FlagEnableWC
            FROM         Control WITH (NOLOCK)
         */
        aimsql.eachRow("SELECT     * \n" +
                "FROM         Control WITH (NOLOCK)") {
            log.info "Control: " + it
        }
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        //EXEC spGetBinderNumber '0623193', 'CA', 'Y', '00', 'NESF16-005', '3/2/2017'
        def p1 = params.aimQuoteID
        def p2 = taxState
        def p3 = taxed
        def p4 = divisionID
        def p5 = params.policyNumber
        def p6 = params.proposedEffective

        def spGetBinderNumberRows = aimsql.callWithRows("{call dbo.spGetBinderNumber('$p1', '$p2', '$p3', '$p4', '$p5', $p6)}") { num ->
            log.info "GetBinderNumber $num"
        }
        log.info "GetBinderNumber Rows: " + spGetBinderNumberRows
        //****************************************************************************************************************

        aimsql.withTransaction {
            //STARTING TRANSACTION
            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            log.info params.aimQuoteID
            log.info params.policyNumber
            aimsql.execute("UPDATE Suspense\n" +
                    "SET AlternateID = '" + params.policyNumber + "'\n" +
                    "WHERE (ReferenceID = '" + params.aimQuoteID + "') AND IsNull(AlternateID, 'X') <> '" + params.policyNumber+ "'")

            log.info "Rows Updated (Suspense): " + aimsql.getUpdateCount()
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            aimsql.eachRow("SELECT     TransDecript\n" +
                    "FROM         Status WITH (NOLOCK)\n" +
                    "WHERE     (StatusID = 'BND')") {
                log.info "Status: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            aimsql.eachRow("SELECT     COUNT(DocumentID) AS Expr1\n" +
                    "FROM         [Document] WITH (NOLOCK)\n" +
                    "WHERE     (DocumentID = 'BINDERF')") {
                log.info "Document: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            aimsql.eachRow("SELECT     DocumentID, TypeID, Description, Comments, DataSet, FlagCrystalReport, StatusID, RTF, DefaultDays, SuspenseTypeID, DefaultReasonID, DefaultActionID, \n" +
                    "                      DateBasisID, FlagAllowActivityEntryEdit, DefaultSuspToID, AttachName, TeamID, DivisionID, ActiveFlag, SecurityLvl, DocumentKey_PK, AddressFromID, AddressToID, \n" +
                    "                      FlagOfficeSpecific\n" +
                    "FROM         dvDocumentTemplate\n" +
                    "WHERE     (DocumentID = 'BINDER')") {
                log.info "dvDocumentTemplate (Binder): " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            aimsql.eachRow("SELECT     DocumentID, TypeID, Description, Comments, DataSet, FlagCrystalReport, StatusID, RTF, DefaultDays, SuspenseTypeID, DefaultReasonID, DefaultActionID, \n" +
                    "                      DateBasisID, FlagAllowActivityEntryEdit, DefaultSuspToID, AttachName, TeamID, DivisionID, ActiveFlag, SecurityLvl, DocumentKey_PK, AddressFromID, AddressToID, \n" +
                    "                      FlagOfficeSpecific\n" +
                    "FROM         dvDocumentTemplate\n" +
                    "WHERE     (DocumentID = '00_BINDER')") {
                log.info "dvDocumentTemplate (00_Binder): " + it

            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            aimsql.eachRow("SELECT     DocumentID, TypeID, Description, Comments, DataSet, FlagCrystalReport, StatusID, RTF, DefaultDays, SuspenseTypeID, DefaultReasonID, DefaultActionID, \n" +
                    "                      DateBasisID, FlagAllowActivityEntryEdit, DefaultSuspToID, AttachName, TeamID, DivisionID, ActiveFlag, SecurityLvl, DocumentKey_PK, AddressFromID, AddressToID, \n" +
                    "                      FlagOfficeSpecific\n" +
                    "FROM         dvDocumentTemplate\n" +
                    "WHERE     (DocumentID = 'BINDER')") {
                log.info "dvDocumentTemplate (Binder): " + it

            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            aimsql.eachRow("SELECT     DocumentID, Description, StatusID, TypeID, RTF, WPForm, TeamID, SecurityLvl, Comments, DataSet, LogoName_NULL, Attachments, Memo, CreatedBy, SystemReq, \n" +
                    "                      LogoName, AttachmentFlag, EndorsementFlag, SuspenseTypeID, DefaultDays, DefaultReasonID, DefaultActionID, AddressToID, AddressFromID, EmailFormat, \n" +
                    "                      CreateDate, ModifiedDate, LvlRemoveProtection, DocumentKey_PK, FlagGeneralDocument, DateBasisID, DefaultSuspToID, DefaultHeaderStyle, \n" +
                    "                      DefaultHeaderStylePage, DefaultPageFooter, ActiveFlag, FlagCrystalReport, FlagOfficeSpecific, SuspenseToPosition, FlagAllowActivityEntryEdit, IRDocType, IRDrawer, \n" +
                    "                      IRPackage, IRFlowID, IRDefaultUserID, IRStepID, IRFlagPrint, IRDrawerID, FlagCheckForStateVersion, AttachName, SaveWithAttachments, DefaultPrinter, \n" +
                    "                      DefaultCopies, DivisionID, DCCategory\n" +
                    "FROM         [Document] WITH (NOLOCK)\n" +
                    "WHERE     (DocumentID = 'BINDER')") {
                log.info "Document (Binder): " + it

            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            aimsql.eachRow("SELECT     FlagAttachTaxAffidavit\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Control: " + it

            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            p1 = quoteContactID
            p2 = "AGT" //CAN'T TELL IF THIS IS CONSTANT OR BEING PULLED
            p3 = producerID
            log.info quoteContactID
            log.info producerID
            def getRecipientDataRows = aimsql.callWithRows("{call dbo.spGetRecipientData('$p1', '$p2', '$p3')}") { num ->
                log.info "RecipientData: $num"
            }
            log.info "getRecipientDataRows: " + getRecipientDataRows

            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            p1 = acctExec
            p2 = "EXC" //CAN'T TELL IF THIS IS CONSTANT OR BEING PULLED
            def getSenderDataRows = aimsql.callWithRows("{call dbo.spGetSenderData( '$p1', '$p2')}") { num ->
                log.info "SenderData: $num"
            }
            log.info getSenderDataRows
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//      exec dbo.lkpCommonData_v1  @CompanyID='RM0057',@MarketID='SAFELL',@QuoteID='0623191',@productID='EPKG37',@producerID='TVD',
//      @UserID='web',@Premium=$5750.0000,@Fees=$15.0000,@Taxes=$184.0000,@GrossComm=28,@AgentComm=15,@CedingCompanyID=NULL
            p1 = companyID
            p2 = marketID
            p3 = params.aimQuoteID
            p4 = productID
            p5 = producerID
            p6 = "web"
            def p7 = premium
            def p8 = nonTaxPrem
            def p9 = totalTaxes
            def p10 = grossComm
            def p11 = agentComm
            def p12 = null

            def lkpCommonDataRows = aimsql.callWithRows("{call dbo.lkpCommonData_v1('$p1', '$p2', '$p3', '$p4', '$p5', '$p6', " +
                    "'$p7', '$p8', '$p9', '$p10', '$p11', '$p12')}") { num ->
                log.info "lkpCommonData: $num"
            }
            log.info "lkpCommonDataRows: " + lkpCommonDataRows
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        set @p4=29828
//        exec dbo.ImagePost1  @origID=NULL,@img=0x7B5C727466315C616E73695C64656,@att=NULL,@newID=@p4 output,@Update=NULL,@ReferenceID=91265,@Type='B',@Version=NULL,@DocumentID='BINDER'
//        p1 = null //@origID
//        p2 = 23333443 //Binary data for Image file
//        p3 = null //@att
//        p4 = null //@imageID
//        p5 = null //@Update
//        p6 = 91265 //@ReferenceID
//        p7 = 'B' //@Type
//        p8 = null //@Version
//        p9 = "Binder" //@DocumentID
//
//        def imagePost1 = aimsql.callWithRows("{call dbo.imagePost1('$p1', '$p2', '$p3', ${Sql.ALL_RESULT_SETS}, '$p5', '$p6', " +
//                "'$p7', '$p8', '$p9')}") { num ->
//            log.info "New ImageID $num"
//        }
//        log.info "imagePost1: " + imagePost1
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        exec dbo.AddTransaction  @ReferenceID='0623191',@UserID='web',@Description='Coverage bound on version A',@Date='2017-03-02 05:31:44:157',
//        @StatusID='BND',@ImageID=NULL,@TypeID=NULL,@QuoteVersion='A',@ToNameKey=0,@DocTemplateID=NULL,@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
            def now = new Date()
            def timestamp = now.format(dateFormat, timeZone)
            p1 = params.aimQuoteID
            p2 = "web"
            p3 = "Coverage bound on version A"
            p4 = timestamp
            p5 = "BND"
            p6 = null //imageID
            p7 = null  //'B' = Binder
            p8 = 'A' //QuoteVersion
            p9 = 0  //ToNameKey
            p10 = null //DocTemplateID
            p11 = 0 //AttachmentIcon
            p12 = '1899-12-30 00:00:00:000' //SourceDateTime
            def addTransactionRows = aimsql.call("{call dbo.AddTransaction( '$p1', '$p2', '$p3', '$p4', '$p5', $p6, " +
                    "$p7, '$p8', $p9, $p10, $p11, '$p12')}") { num ->
                log.info "addTransaction: $num"
            }
            log.info "addTransactionRows: " + lkpCommonDataRows
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            aimsql.eachRow("SELECT     TransDecript\n" +
                    "FROM         Status WITH (NOLOCK)\n" +
                    "WHERE     (StatusID = 'BPF')") {
                log.info "Status: " + it
            }
            //****************************************************************************************************************



            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        INSERT INTO dbo.Policy (QuoteID ,PolicyID ,PolicyKey_PK ,Version ,Effective ,Expiration ,Inception ,
//        Term ,Bound ,StatusID ,Endorsement ,PolicySource ,CompanyID ,ProductID ,EffectiveTime ,ActivePolicyFlag ,AIM_TransDate ,
//        PolicyGroupKey_FK ,AccountKey_FK ,PremiumWritten ,PremiumTerm ,FlagInspectionRequired ,FlagOverrideServiceUW ,DefaultBillingType )
//        VALUES ('0623191', 'NESF16-006', 91403, '0', '20170302 00:00:00.000', '20180302 00:00:00.000', '20170302 00:00:00.000', 365,
//        '20170302 00:00:00.000', 'PIF', '1', 'R', 'RM0057', 'EPKG37', '12:01 AM', 'Y', '20170302 05:31:44.160', 91403, 91264,
//        convert(money,'5750.00'), convert(money,'5750.00'), 'N', 'N', 'AB')
            //AccountKey_FK = Version.ReferenceKey_FK
            now = new Date();
            def  policy_timestamp = now.format(dateFormat, timeZone);
            log.info policy_timestamp.split(" ")[0].replace("-", "") + " " + "00:00:00.000"
            policy_timestamp = policy_timestamp.split(" ")[0].replace("-", "") + " " + "00:00:00.000"
            now = new Date();
            def aimTrans_timestamp = now.format(dateFormat, timeZone);
            log.info timestamp
            aimsql.execute("INSERT INTO dbo.Policy (QuoteID ,PolicyID ,PolicyKey_PK ,Version ,Effective ,Expiration ,Inception ," +
                    "Term ,Bound ,StatusID ,Endorsement ,PolicySource ,CompanyID ,ProductID ,EffectiveTime ,ActivePolicyFlag ,AIM_TransDate ," +
                    "PolicyGroupKey_FK ,AccountKey_FK ,PremiumWritten ,PremiumTerm ,FlagInspectionRequired ,FlagOverrideServiceUW ,DefaultBillingType )  " +
                    "VALUES ('$params.aimQuoteID', '$params.policyNumber', $params.policyKeyID, '0', '$proposedEffective', '$proposedExpiration', '$policy_timestamp', $proposedTerm, " +
                    "'$policy_timestamp', 'PIF', '1', 'R', '$companyID', '$productID', '12:01 AM', 'Y', '$aimTrans_timestamp', $params.policyKeyID, $version_referenceKeyID, " +
                    "convert(money,'$premium'), convert(money,'$premium'), 'N', 'N', 'AB')")
            log.info "Rows Updated (Insert into Policy): " + aimsql.getUpdateCount()
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        SELECT *
//        FROM dbo.Policy WHERE QuoteID='0623191' AND PolicyID='NESF16-006'
            aimsql.eachRow("SELECT     QuoteID, PolicyID, PolicyKey_PK, Version, PolicyGrpID, Effective, Expiration, Inception, Term, BillingType, NewAccountIndicator, RateDate, MailToCode, \n" +
                    "PolicyStatusDate, BillingAccountNumber, Bound, BoundTime, SetupDate, MailoutDate, FinanceCompanyID, Cancellation, CancelEffective, CancellationReason, \n" +
                    "NonRenewalCode, NonRenewBy, Reinstated, Invoiced, Units, UnitType, LocationZip, ClaimsPending, ClaimsMade, LossesPaid, BillToCode, StatusID, Endorsement, \n" +
                    "AdditionalInsureds, InspectionOrdered, EC, Operations, SICID, Location, CancelTime_Old, CancelRequestedBy, ReturnPrem, ReturnRate, PolicySource, CompanyID, \n" +
                    "ProductID, ContractID, WrittenPremium, Control_State, Financed, BinderType, RewriteCompanyID, RewritePolicyID, RewriteDate, TypeID, BillTo, RenewalQuoteID, \n" +
                    "AuditID, AuditInception, AuditType, AuditPremium, AuditOutstanding, DeductType, PolicyForm, InstallID, SuspID, InvoiceDate, FormMakerName, TermPremiumAdj, \n" +
                    "PolicyPrintDate, EffectiveTime, ActivePolicyFlag, Limit1, Coverage1, Limit2, Coverage2, Limit3, Coverage3, Limit4, Coverage4, AIM_TransDate, PolicyGroupKey_FK, \n" +
                    "AccountKey_FK, CancelTime, PolicyTerm, InspectionCo_FK, LoanNumber, ReinsuranceCategory, PendingNOCKey_FK, ContractName, ContractKey_FK, \n" +
                    "DateInspectionOrdered, DateNOC, DateRenewalNotice, AmountFinanced, CountCancelled, CountEndorsed, CountRenewed, CountClaims, PremiumWritten, \n" +
                    "PremiumBilled, PremiumAdjustments, PremiumTerm, PremiumReturn, DateRenewalLetter, FlagFinancingFunded, FlagSubjectToAudit, FlagConfirmation, \n" +
                    "DateAuditReviewed, AuditReceivedBy, DateAuditReceived, AuditReviewedBy, InspectionOrderedBy, DateInspectionReceived, InspectionReceivedBy, \n" +
                    "DateInspectionReviewed, InspectionReviewedBy, FlagInspectionRequired, InspectionFile, DatePolicyReceived, DateReceived, FlagOverrideServiceUW, \n" +
                    "TRIAReceivedDate, ERPEffective, ERPExpiration, DefaultBillingType, ProductionSplitKey_FK, InvoiceKey_FK, BasisPremiumTerm, FlagLapseInCoverage, \n" +
                    "DateInspectionBilled, InspectionInvoiceNumber, InspectionCost, InspectionPhotosRecvd, InspectionComments, InspectionInvoiceDate, FlagPremFinAgentFunded, \n" +
                    "PremiumConvertedTerm, DateInspectionReordered, InspectionReorderedBy, MasterInstallKey_FK, LastInstallExported, EscrowInvoiceKey_FK, EscrowPremium, \n" +
                    "EscrowInvoiceDate, EscrowInvoiced\n" +
                    "FROM         Policy\n" +
                    "WHERE     (QuoteID = '$params.aimQuoteID') AND (PolicyID = '$params.policyNumber')") {
                log.info "Policy: " + it
            }
            //****************************************************************************************************************



            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        SELECT *
//        FROM dbo.Policy WHERE QuoteID='0623191' '
            aimsql.eachRow("SELECT     QuoteID, PolicyID, PolicyKey_PK, Version, PolicyGrpID, Effective, Expiration, Inception, Term, BillingType, NewAccountIndicator, RateDate, MailToCode, \n" +
                    "PolicyStatusDate, BillingAccountNumber, Bound, BoundTime, SetupDate, MailoutDate, FinanceCompanyID, Cancellation, CancelEffective, CancellationReason, \n" +
                    "NonRenewalCode, NonRenewBy, Reinstated, Invoiced, Units, UnitType, LocationZip, ClaimsPending, ClaimsMade, LossesPaid, BillToCode, StatusID, Endorsement, \n" +
                    "AdditionalInsureds, InspectionOrdered, EC, Operations, SICID, Location, CancelTime_Old, CancelRequestedBy, ReturnPrem, ReturnRate, PolicySource, CompanyID, \n" +
                    "ProductID, ContractID, WrittenPremium, Control_State, Financed, BinderType, RewriteCompanyID, RewritePolicyID, RewriteDate, TypeID, BillTo, RenewalQuoteID, \n" +
                    "AuditID, AuditInception, AuditType, AuditPremium, AuditOutstanding, DeductType, PolicyForm, InstallID, SuspID, InvoiceDate, FormMakerName, TermPremiumAdj, \n" +
                    "PolicyPrintDate, EffectiveTime, ActivePolicyFlag, Limit1, Coverage1, Limit2, Coverage2, Limit3, Coverage3, Limit4, Coverage4, AIM_TransDate, PolicyGroupKey_FK, \n" +
                    "AccountKey_FK, CancelTime, PolicyTerm, InspectionCo_FK, LoanNumber, ReinsuranceCategory, PendingNOCKey_FK, ContractName, ContractKey_FK, \n" +
                    "DateInspectionOrdered, DateNOC, DateRenewalNotice, AmountFinanced, CountCancelled, CountEndorsed, CountRenewed, CountClaims, PremiumWritten, \n" +
                    "PremiumBilled, PremiumAdjustments, PremiumTerm, PremiumReturn, DateRenewalLetter, FlagFinancingFunded, FlagSubjectToAudit, FlagConfirmation, \n" +
                    "DateAuditReviewed, AuditReceivedBy, DateAuditReceived, AuditReviewedBy, InspectionOrderedBy, DateInspectionReceived, InspectionReceivedBy, \n" +
                    "DateInspectionReviewed, InspectionReviewedBy, FlagInspectionRequired, InspectionFile, DatePolicyReceived, DateReceived, FlagOverrideServiceUW, \n" +
                    "TRIAReceivedDate, ERPEffective, ERPExpiration, DefaultBillingType, ProductionSplitKey_FK, InvoiceKey_FK, BasisPremiumTerm, FlagLapseInCoverage, \n" +
                    "DateInspectionBilled, InspectionInvoiceNumber, InspectionCost, InspectionPhotosRecvd, InspectionComments, InspectionInvoiceDate, FlagPremFinAgentFunded, \n" +
                    "PremiumConvertedTerm, DateInspectionReordered, InspectionReorderedBy, MasterInstallKey_FK, LastInstallExported, EscrowInvoiceKey_FK, EscrowPremium, \n" +
                    "EscrowInvoiceDate, EscrowInvoiced\n" +
                    "FROM         Policy\n" +
                    "WHERE     (QuoteID = '$params.aimQuoteID')") {
                log.info "Policy: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        SELECT *
//        FROM         InvoiceHeader WITH (NOLOCK)
//        WHERE     (PolicyKey_FK = 91403)
//        ORDER BY InvoiceKey_PK
            aimsql.eachRow("SELECT     InvoiceID, InvoiceKey_PK, QuoteID, PolicyKey_FK, Effective, ProducerID, BillingType, BillToCode, Premium, Non_Premium, Misc_Premium, NonTax_Premium, Tax1, \n" +
                    "Tax2, Tax3, Tax4, InvoiceTypeID, PolicyID, Description, TaxState, InvoiceTotal, BillToAddressID, PaymentToAddressID, MemoInvoiceFlag, OutStandingAmt, \n" +
                    "DirectBillFlag, InstallmentPlanID, DueDate, NumberOfPayments, TotalGrossComm, TotalAgentComm, TotalDue, TotalPayable, Note, GrossComm, AgentComm, \n" +
                    "CompanyCollectedFees, AgencyCollectedFees, TotalPremium, InstallmentID, PayableID, InstallmentFlag, Message, TaxPaidBy, Taxed, TaxesPaidByID, UserHoldFlag, \n" +
                    "CourtesyFilingID, DefaultPayableID, Ledger, ReversedFlag, PostDate, FrequencyID, IncludeAgentComm, IncludeCompanyFee, IncludeAgencyComm, \n" +
                    "IncludeAgencyFee, DownPercent, StatusID, InstallmentItem, Initial_InvoiceFlag, PayToCode, AcuityTargetCompanyID, InsuredID, TeamID, InvoicedByID, \n" +
                    "AcuityStatusID, InvoiceDate, OwnerKey_FK, InstallmentTotal, Address1, Address2, City, State, Zip, RemitAddress1, RemitAddress2, RemitCity, RemitState, RemitZip, \n" +
                    "InvTypeID, EndorsementKey_FK, ExportDate, HeldSuspenseKey, InvoiceTerms, InstallPayOOBFlag, AgencyCollectedTaxes, TotalFeeRevenue, TotalNetDueCompany, \n" +
                    "AccountingEffectiveDate, ReversedInvoiceKey, ExportStatusID, AcuityBatchKey, ProgramID, TotalInstallmentsDue, RiskLimits, RiskZip, RiskCounty, PaidByStatement, \n" +
                    "DownPaymentAmt, PayToDueDate, DateCreated, FinanceID, FlagFinanced, Endorsement, CompanyCollectedTaxes, TotalTaxes, FlagSplit, MarketID, ContractID, \n" +
                    "OtherTaxes, OtherExpense, AcctExec, CurrencyType, CurrencyAmount, ProductID, CoverageID, OwnerKey_SK, ZipPlus, TotalFeeExpense, TotalRevenue, \n" +
                    "TotalFeeCommission, DatePrinted, GLPeriod, FlagRebill, TotalPayments, TermPremium, MinimumPremium, ProcessBatchKey_FK, EffectiveDate, DivisionID, \n" +
                    "DateTaxesFiled, FlagMultiPremium, DatePremiumReported, AdmittedPremium, FlagOverrideComm, CommissionSplitKey_FK, Entity, CstCtr, ProductionSplitKey_FK, \n" +
                    "TotalAgentCommOnly, TotalAgentFeeTaxes, TotalAPCompany, TotalAPTax, TotalNetFeeRevenue, TotalNetComm, Expiration, TotalNetRevenue, TotalFees, \n" +
                    "FlagCourtesyFiler, FlagProductionSplit, SourcePremium, RebillInvoiceKey_FK, DownPaymentMemo, TotalBasisAmount, CompanyID, InvoicePostedByID, \n" +
                    "TerrorismPremium_GL, TerrorismPremium, FlagSuppress, FlaggedAR, FlaggedAP, MapToID, Tax5, Tax6, Tax7, Tax8, AddToExisting, AR_AccountID, BatchID, \n" +
                    "StatusID_Old, StatusID_Old2, OLD_AcuityTargetCompanyID, DateBackOutFiled, PerArchFiled, ArchBatchKey, FlagCancelFiledToArch, TaxKeyPK, OrigPolNum, \n" +
                    "DateTaxesAccepted, FlagFileSLSO, SLSOErrorType, SLSOBatchKey_FK, MasterInstallKey_FK, FlagMasterInstall, DepositPremium, InstallmentNo, AggregateLimits, \n" +
                    "FlagMailedOut, FlagEscrow\n" +
                    "FROM         InvoiceHeader WITH (NOLOCK)\n" +
                    "WHERE     (PolicyKey_FK = $params.policyKeyID)\n" +
                    "ORDER BY InvoiceKey_PK") {
                log.info "Invoice Header: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            UPDATE dbo.Version
            SET Version=NULL,
            Limits='$24,000	EPKG:Cast Insurance (Up to 10)',
            Deductible='$25,000	EPKG:Cast Insurance (Up to 10)',
            StatusID='BND',RateInfo='EPKG	Rate	Premium	Coverage	Min Prem', AggregateLimits=convert(money,'24000.00'),
            DeductibleVal=convert(money,'25000.00'),BoundFlag='Y',UnderLyingCoverage='', TaxDistrib='SLT	172.5	A',
            PremiumFinanceFee=convert(money,'0.00'),LOB_Limit1='$24,000',LOB_Limit2='$24,000',LOB_Limit3='$24,000',LOB_Limit4='$1,000,000',
            LOB_Limit5='Included Under Misc. Rented Equip.',LOB_Limit6='$1,000,000',LOB_Deduct1='$25,000',LOB_Deduct2='$5,000',
            LOB_Limit1Value=convert(money,'24000.00'),LOB_Limit2Value=convert(money,'24000.00'),LOB_Limit3Value=convert(money,'24000.00'),
            LOB_Limit4Value=convert(money,'1000000.00'),LOB_Limit6Value=convert(money,'1000000.00'),LOB_Deduct1Value=convert(money,'25000.00'),
            LOB_Deduct2Value=convert(money,'5000.00'),APR=0.07,AmountFinanced=convert(money,'5738.50'),DownPayment=convert(money,'210.50'),
            Payments=convert(money,'637.79'),FinCharge=convert(money,'1.61'),TotalPayment=convert(money,'5740.11'),NumPayments=9,DownFactor=0.002,
            LOB_Coverage1='EPKG:Cast Insurance (Up to 10)',LOB_Coverage2='EPKG:Negative Film &amp; Videota',LOB_Coverage3='EPKG:Faulty Stock &amp; Camera P',
            LOB_Coverage4='EPKG:Miscellaneous Rented Equipm',LOB_Coverage5='EPKG:Non-Owned Auto Physical Dam',LOB_Coverage6='EPKG:Extra Expense',
            LOB_DeductType1='EPKG:Cast Insurance (Up to 10)',LOB_DeductType2='EPKG:Negative Film &amp; Videota',LOB_Coverage7='EPKG:Props, Sets &amp; Wardrobe',
            LOB_Coverage8='EPKG:Third Party Prop Damage Lia',LOB_Limit7='$1,000,000',LOB_Limit8='$1,000,000',LOB_Limit7Value=convert(money,'1000000.00'),
            LOB_Limit8Value=convert(money,'1000000.00'),LOB_Coverage9='EPKG:Office Contents',LOB_Limit9='$50,000',LOB_Limit9Value=convert(money,'50000.00')
            WHERE QuoteID='0623191' AND VerOriginal='A' AND Version='A' AND LobID IS NULL  AND LobSubID IS NULL  AND CompanyID='RM0057' AND ProductID='EPKG37'
            AND Premium=convert(money,'5750.00') AND Non_Premium=convert(money,'0.00') AND Misc_Premium IS NULL  AND NonTax_Premium=convert(money,'15.00')
            AND Quoted='20170227 23:21:35.516' AND Expires IS NULL  AND Financed='Y' AND Taxed='Y' AND MEP='' AND Rate='' AND GrossComm=28.0 AND AgentComm=15.0
            AND Brokerage='N' AND CoInsure='' AND StatusID='WB3' AND SubmitDate IS NULL  AND SubmitPOC IS NULL  AND MarketID='SAFELL' AND Apportionment IS NULL
            AND Tax1=convert(money,'172.50') AND Tax2=convert(money,'11.50') AND Tax3=convert(money,'0.00') AND Tax4=convert(money,'0.00') AND FormID='OCR'
            AND Indicator='N' AND PendingSuspenseID IS NULL  AND CommPaid=convert(money,'862.50') AND AggregateLimits IS NULL  AND DeductibleVal IS NULL
            AND BoundFlag IS NULL  AND DirectBillFlag='N' AND ProposedEffective='20170302 00:00:00.000' AND ProposedExpiration='20180302 00:00:00.000'
            AND ProposedTerm=365 AND Retroactive IS NULL  AND RetroPeriod IS NULL  AND MiscPrem1 IS NULL  AND MiscPrem2 IS NULL  AND MiscPrem3 IS NULL
            AND NonTax1 IS NULL  AND NonTax2 IS NULL  AND NonPrem1 IS NULL  AND NonPrem2 IS NULL  AND PaymentRecv IS NULL  AND PremDownPayment IS NULL
            AND Valuation IS NULL  AND Retention IS NULL  AND AIM_TransDate IS NULL  AND InvoiceCodes IS NULL  AND TaxDistrib='SLT	172.5	A	CADOI	0	0.03
            SOF	11.5	A	CA_SLA	0	0.002' AND PremDistrib='FEE	15	A	00	Y	N' AND CAP_Limit IS NULL  AND EPL_Limit IS NULL  AND TakenOut_RatedTerm IS NULL
            AND PolicyTerm='365 Days' AND PolicyForm IS NULL  AND BillToCompanyID IS NULL  AND StatementKey_FK IS NULL  AND PaymentKey_FK IS NULL
            AND CommRecvd IS NULL  AND VersionID='0623191A' AND MarketContactKey_FK IS NULL  AND TIV IS NULL  AND CompanyFees IS NULL
            AND UnderLyingLimitsSum IS NULL  AND PunitiveDamage IS NULL  AND ThirdPartyLimits IS NULL  AND AnnualPremium IS NULL  AND AnnualFees IS NULL
             AND FlagCollectMuniTax IS NULL  AND TrueExpire IS NULL  AND WrittenLimits IS NULL  AND AttachPoint IS NULL  AND LineSlip IS NULL  AND CoverageFormID IS NULL
             AND PositionID IS NULL  AND LobDistrib='EPKG	5750	28.0	15.0' AND TotalTax IS NULL  AND Total IS NULL  AND TotalAmount IS NULL  AND TaxesPaidBy='A'
             AND ResubmitDate IS NULL  AND FeeSchedule='Policy Fee	$15.00' AND LobDistribSched='Entertainment Package	$5,750	15.0' AND DeductType=''
             AND PremiumFinanceFee IS NULL  AND LOB_Field1 IS NULL  AND LOB_Field2 IS NULL  AND LOB_Field3 IS NULL  AND LOB_Flag1 IS NULL  AND LOB_Prem1 IS NULL
             AND LOB_Prem2 IS NULL  AND LOB_Prem3 IS NULL  AND LOB_Limit1='' AND LOB_Limit2='' AND LOB_Limit3='' AND LOB_Limit4='' AND LOB_Limit5='' AND LOB_Limit6=''
             AND LOB_Deduct1='' AND LOB_Deduct2='' AND LOB_Limit1Value=convert(money,'0.00') AND LOB_Limit2Value=convert(money,'0.00') AND LOB_Limit3Value=convert(money,'0.00')
             AND LOB_Limit4Value=convert(money,'0.00') AND LOB_Limit5Value=convert(money,'0.00') AND LOB_Limit6Value=convert(money,'0.00')
             AND LOB_Deduct1Value=convert(money,'0.00') AND LOB_Deduct2Value=convert(money,'0.00') AND TaxesPaidByID='CADOI' AND FlagMultiStateTax IS NULL  AND MultiStateDistrib IS NULL
             AND AdmittedPremium IS NULL  AND RatedPremium IS NULL  AND APR IS NULL  AND AmountFinanced IS NULL  AND DownPayment IS NULL  AND Payments IS NULL  AND FinCharge IS NULL
             AND TotalPayment IS NULL  AND NumPayments IS NULL  AND FinanceDueDate IS NULL  AND ReferenceKey_FK=91265 AND RemitAmount IS NULL  AND CollectAmount IS NULL
             AND DownFactor IS NULL  AND TerrorActPremium IS NULL  AND TerrorActGrossComm IS NULL  AND TerrorActAgentComm IS NULL  AND TerrorActMEP IS NULL
             AND TerrorActStatus='WAIVED' AND FlagOverrideCalc='N' AND TerrorTaxes=convert(money,'0.00') AND FlagFinanceWithTRIA IS NULL  AND FlagMultiOption=''
             AND FlagFeeCalc='N' AND ParticipantCo1ID IS NULL  AND ParticipantCo2ID IS NULL  AND ParticipantCo3ID IS NULL  AND UserDefinedStr1 IS NULL
             AND UserDefinedStr2 IS NULL  AND UserDefinedStr3 IS NULL  AND UserDefinedStr4 IS NULL  AND UserDefinedDate1 IS NULL  AND UserDefinedValue1 IS NULL
             AND LOB_Coverage1='' AND LOB_Coverage2='' AND LOB_Coverage3='' AND LOB_Coverage4='' AND LOB_Coverage5='' AND LOB_Coverage6='' AND LOB_DeductType1=''
             AND LOB_DeductType2='' AND DeclinationReasonID IS NULL  AND ERPOption IS NULL  AND ERPDays IS NULL  AND ERPPercent IS NULL  AND ERPPremium IS NULL
             AND TaxwoTRIA1=convert(money,'172.50') AND TaxwoTRIA2=convert(money,'11.50') AND TaxwoTRIA3=convert(money,'0.00') AND TaxwoTRIA4=convert(money,'0.00')
             AND LOB_Prem4 IS NULL  AND LOB_Coverage7='' AND LOB_Coverage8='' AND LOB_Limit7='' AND LOB_Limit8='' AND LOB_Limit7Value=convert(money,'0.00')
             AND LOB_Limit8Value=convert(money,'0.00') AND LOB_Prem5 IS NULL  AND LOB_Prem6 IS NULL  AND LOB_Prem7 IS NULL  AND LOB_Prem8 IS NULL  AND CoverageList IS NULL
             AND DocucorpFormList IS NULL  AND TerrorActPremium_GL IS NULL  AND FlagRecalcTaxes IS NULL  AND DateMktResponseRecvd IS NULL  AND CancelClause IS NULL
             AND PremiumProperty=convert(money,'0.00') AND PremiumLiability=convert(money,'0.00') AND PremiumOther=convert(money,'0.00') AND EndorsementKey_FK IS NULL
             AND DefaultRiskCompanyID IS NULL  AND MarketPOCKey_FK IS NULL  AND ExcludedFinPrem IS NULL  AND AggregateLimitsTemp IS NULL  AND RetentionTemp IS NULL
             AND RetentionTemp2 IS NULL  AND RetentionValue IS NULL  AND Tax1Name='Surplus Lines Tax' AND Tax2Name='Stamping Office Fee' AND Tax3Name='' AND Tax4Name=''
             AND AgentDeposit=convert(money,'-862.50') AND TaxwoTRIA5=convert(money,'0.00') AND Tax5=convert(money,'0.00') AND Tax5Name='' AND LOB_Coverage9='' AND LOB_Limit9=''
             AND LOB_Limit9Value=convert(money,'0.00') AND LOB_Prem9 IS NULL  AND FeeSchedule2 IS NULL  AND TaxwoTRIA6=convert(money,'0.00') AND Tax6Name=''
             AND TaxwoTRIA7=convert(money,'0.00') AND Tax7Name='' AND TaxwoTRIA8=convert(money,'0.00') AND Tax8Name='' AND Tax6=convert(money,'0.00')
             AND Tax7=convert(money,'0.00') AND Tax8=convert(money,'0.00') AND InsuredDeposit=convert(money,'0.00') AND CopiedFrom IS NULL  AND InstallmentPlanID IS NULL
             AND DownPaymentAmt IS NULL  AND Installments IS NULL  AND FrequencyID IS NULL  AND InstallmentFee IS NULL  AND InstallmentFeeID IS NULL
             AND AgentDepositwoTRIA=convert(money,'-862.50') AND InsuredDepositwoTRIA=convert(money,'0.00') AND InstallFeeInfo IS NULL  AND InstallFeeInvKey IS NULL
             AND InstallmentFeeFirst IS NULL
             */
            log.info "UPDATE dbo.Version\n " +
                    "SET Version=NULL, Limits=${versionRecordMap['Limits']}, Deductible=${versionRecordMap['Deductible']}, " +
                    "StatusID='BND', RateInfo=${versionRecordMap['RateInfo']}, AggregateLimits='',\n" +
                    "DeductibleVal='' ,BoundFlag='Y',UnderLyingCoverage='', TaxDistrib=${versionRecordMap['TaxDistrib']},\n" +
                    "PremiumFinanceFee='', LOB_Limit1=${versionRecordMap['LOB_Limit1']}, LOB_Limit2=${versionRecordMap['LOB_Limit2']}, " +
                    "LOB_Limit3=${versionRecordMap['LOB_Limit3']}, LOB_Limit4=${versionRecordMap['LOB_Limit4']}, \n" +
                    "LOB_Limit5=${versionRecordMap['LOB_Limit5']},LOB_Limit6=${versionRecordMap['LOB_Limit6']}, " +
                    "LOB_Deduct1=${versionRecordMap['LOB_Deduct1']}, LOB_Deduct2=${versionRecordMap['LOB_Deduct2']}, \n" +
//                "LOB_Limit1Value=${versionRecordMap['LOB_Limit1Value']}, LOB_Limit2Value=:LOB_Limit2Value, LOB_Limit3Value=:LOB_Limit3Value,\n" +
//                "        LOB_Limit4Value=:LOB_Limit4Value, LOB_Limit6Value=:LOB_Limit6Value, LOB_Deduct1Value=:LOB_Deduct1Value, \n" +
//                    "        LOB_Deduct2Value=:LOB_Deduct2Value, " +
                    "APR='', AmountFinanced='', DownPayment='', \n" +
                    "        Payments='', FinCharge='', TotalPayment='', NumPayments='', DownFactor=''" +
//                    ", LOB_Coverage1=:LOB_Coverage1, LOB_Coverage2=:LOB_Coverage2, LOB_Coverage3=:LOB_Coverage3, \n" +
//                    "        LOB_Coverage4=:LOB_Coverage4, LOB_Coverage5=:LOB_Coverage5,LOB_Coverage6=:LOB_Coverage6,\n" +
//                    "        LOB_DeductType1=:LOB_DeductType1,LOB_DeductType2=:LOB_DeductType2,LOB_Coverage7=:LOB_Coverage7,\n" +
//                    "        LOB_Coverage8=:LOB_Coverage8,LOB_Limit7=:LOB_Limit7,LOB_Limit8=:LOB_Limit8,LOB_Limit7Value=:LOB_Limit8,\n" +
//                    "        LOB_Limit8Value=:LOB_Limit8Value,LOB_Coverage9=:LOB_Coverage9,LOB_Limit9=:LOB_Limit9,LOB_Limit9Value=:LOB_Limit9Value \n" +

                    "WHERE QuoteID=${versionRecordMap['QuoteID']} AND VerOriginal=${versionRecordMap['VerOriginal']}"
            aimsql.execute("UPDATE dbo.Version\n " +
                    "SET Version=NULL, Limits=${versionRecordMap['Limits']}, Deductible=${versionRecordMap['Deductible']}, " +
                    "StatusID='BND', RateInfo=${versionRecordMap['RateInfo']}, AggregateLimits='',\n" +
                    "DeductibleVal='' ,BoundFlag='Y',UnderLyingCoverage='', TaxDistrib=${versionRecordMap['TaxDistrib']},\n" +
                    "PremiumFinanceFee='', LOB_Limit1=${versionRecordMap['LOB_Limit1']}, LOB_Limit2=${versionRecordMap['LOB_Limit2']}, " +
                    "LOB_Limit3=${versionRecordMap['LOB_Limit3']}, LOB_Limit4=${versionRecordMap['LOB_Limit4']}, \n" +
                    "LOB_Limit5=${versionRecordMap['LOB_Limit5']},LOB_Limit6=${versionRecordMap['LOB_Limit6']}, " +
                    "LOB_Deduct1=${versionRecordMap['LOB_Deduct1']}, LOB_Deduct2=${versionRecordMap['LOB_Deduct2']}, \n" +
//                "LOB_Limit1Value=${versionRecordMap['LOB_Limit1Value']}, LOB_Limit2Value=:LOB_Limit2Value, LOB_Limit3Value=:LOB_Limit3Value,\n" +
//                "        LOB_Limit4Value=:LOB_Limit4Value, LOB_Limit6Value=:LOB_Limit6Value, LOB_Deduct1Value=:LOB_Deduct1Value, \n" +
//                    "        LOB_Deduct2Value=:LOB_Deduct2Value, " +
                    "APR='', AmountFinanced='', DownPayment='', \n" +
                    "        Payments='', FinCharge='', TotalPayment='', NumPayments='', DownFactor=''" +
//                    ", LOB_Coverage1=:LOB_Coverage1, LOB_Coverage2=:LOB_Coverage2, LOB_Coverage3=:LOB_Coverage3, \n" +
//                    "        LOB_Coverage4=:LOB_Coverage4, LOB_Coverage5=:LOB_Coverage5,LOB_Coverage6=:LOB_Coverage6,\n" +
//                    "        LOB_DeductType1=:LOB_DeductType1,LOB_DeductType2=:LOB_DeductType2,LOB_Coverage7=:LOB_Coverage7,\n" +
//                    "        LOB_Coverage8=:LOB_Coverage8,LOB_Limit7=:LOB_Limit7,LOB_Limit8=:LOB_Limit8,LOB_Limit7Value=:LOB_Limit8,\n" +
//                    "        LOB_Limit8Value=:LOB_Limit8Value,LOB_Coverage9=:LOB_Coverage9,LOB_Limit9=:LOB_Limit9,LOB_Limit9Value=:LOB_Limit9Value \n" +

                    "WHERE QuoteID=${versionRecordMap['QuoteID']} AND VerOriginal=${versionRecordMap['VerOriginal']}")
            log.info "Rows Updated (Update into Version): " + aimsql.getUpdateCount()
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        SELECT *  FROM dbo.Version WHERE QuoteID='0623191' AND VerOriginal='A'
            aimsql.eachRow("SELECT QuoteID ,VerOriginal ,Version ,LobID ,LobSubID ,CompanyID ,ProductID ,Premium ,Non_Premium ,Misc_Premium ,NonTax_Premium ," +
                    "Quoted ,Expires ,Limits ,Subject ,Endorsement ,Financed ,Taxed ,MEP ,Rate ,GrossComm, AgentComm ,Brokerage ,Deductible ,CoInsure ,StatusID ,ReasonID ," +
                    "SubmitDate ,SubmitPOC ,MarketID ,Apportionment ,Tax1 ,Tax2 ,Tax3 ,Tax4 ,FormID ,RateInfo ,Indicator ,PendingSuspenseID ,CommPaid ,AggregateLimits \n" +
                    ",DeductibleVal ,BoundFlag ,DirectBillFlag ,ProposedEffective ,ProposedExpiration ,ProposedTerm ,Retroactive ,RetroPeriod ,UnderLyingCoverage ,MultiOption ," +
                    "MiscPrem1 ,MiscPrem2 ,MiscPrem3 ,NonTax1 ,NonTax2 ,NonPrem1,NonPrem2 ,PaymentRecv ,PremDownPayment ,Valuation ,Retention ,AIM_TransDate ,InvoiceCodes ," +
                    "TaxDistrib ,PremDistrib ,CAP_Limit ,EPL_Limit ,TakenOut_RatedTerm, PolicyTerm ,PolicyForm ,BillToCompanyID ,StatementKey_FK, PaymentKey_FK ,CommRecvd ," +
                    "VersionID ,MarketContactKey_FK ,TIV ,CompanyFees ,UnderLyingLimitsSum ,PunitiveDamage ,ThirdPartyLimits ,AnnualPremium ,AnnualFees ,FlagCollectMuniTax ," +
                    "TrueExpire ,WrittenLimits ,AttachPoint, LineSlip ,CoverageFormID ,PositionID ,LobDistrib ,TotalTax ,Total ,TotalAmount ,TaxesPaidBy ,ResubmitDate ," +
                    "FeeSchedule ,LobDistribSched ,DeductType ,PremiumFinanceFee ,LOB_Field1 ,LOB_Field2 ,LOB_Field3 ,LOB_Flag1, LOB_Prem1 ,LOB_Prem2 ,LOB_Prem3 ,LOB_Limit1 ," +
                    "LOB_Limit2 ,LOB_Limit3 ,LOB_Limit4 ,LOB_Limit5 ,LOB_Limit6 ,LOB_Deduct1 ,LOB_Deduct2 ,LOB_Limit1Value ,LOB_Limit2Value ,LOB_Limit3Value ,LOB_Limit4Value ," +
                    "LOB_Limit5Value,LOB_Limit6Value ,LOB_Deduct1Value ,LOB_Deduct2Value ,TaxesPaidByID ,FlagMultiStateTax ,MultiStateDistrib ,AdmittedPremium ,RatedPremium ," +
                    "APR ,AmountFinanced ,DownPayment ,Payments ,FinCharge ,TotalPayment ,NumPayments ,FinanceDueDate ,ReferenceKey_FK ,RemitAmount ,CollectAmount ,DownFactor ," +
                    "TerrorActPremium ,TerrorActGrossComm ,TerrorActAgentComm ,TerrorActMEP ,TerrorActStatus ,FlagOverrideCalc ,TerrorTaxes ,FlagFinanceWithTRIA ," +
                    "FlagMultiOption ,FlagFeeCalc ,ParticipantCo1ID ,ParticipantCo2ID ,ParticipantCo3ID ,UserDefinedStr1 ,UserDefinedStr2 ,UserDefinedStr3 ,UserDefinedStr4 ," +
                    "UserDefinedDate1 ,UserDefinedValue1 ,LOB_Coverage1 ,LOB_Coverage2 ,LOB_Coverage3 ,LOB_Coverage4 ,LOB_Coverage5 ,LOB_Coverage6 ,LOB_DeductType1 ," +
                    "LOB_DeductType2 ,DeclinationReasonID ,ERPOption ,ERPDays ,ERPPercent ,ERPPremium ,TaxwoTRIA1 ,TaxwoTRIA2 ,TaxwoTRIA3 ,TaxwoTRIA4 ,LOB_Prem4 ,LOB_Coverage7 ," +
                    "LOB_Coverage8 ,LOB_Limit7 ,LOB_Limit8 ,LOB_Limit7Value ,LOB_Limit8Value ,LOB_Prem5 ,LOB_Prem6 ,LOB_Prem7 ,LOB_Prem8 ,CoverageList ,DocucorpFormList ," +
                    "TerrorActPremium_GL ,FlagRecalcTaxes ,DateMktResponseRecvd ,CancelClause ,PremiumProperty ,PremiumLiability ,PremiumOther ,EndorsementKey_FK ," +
                    "DefaultRiskCompanyID ,MarketPOCKey_FK ,ExcludedFinPrem ,AggregateLimitsTemp ,RetentionTemp ,RetentionTemp2 ,RetentionValue ,Tax1Name ,Tax2Name ,Tax3Name ," +
                    "Tax4Name ,AgentDeposit ,EndorseForms ,TaxwoTRIA5 ,Tax5 ,Tax5Name ,LOB_Coverage9 ,LOB_Limit9 ,LOB_Limit9Value ,LOB_Prem9 ,FeeSchedule2 ,TaxwoTRIA6 ,Tax6Name ," +
                    "TaxwoTRIA7 ,Tax7Name ,TaxwoTRIA8 ,Tax8Name ,Tax6 ,Tax7 ,Tax8 ,InsuredDeposit ,CopiedFrom ,InstallmentPlanID ,DownPaymentAmt ,Installments ,FrequencyID ," +
                    "InstallmentFee ,InstallmentFeeID ,AgentDepositwoTRIA ,InsuredDepositwoTRIA ,InstallFeeInfo ,InstallFeeInvKey ,InstallmentFeeFirst  " +
                    "FROM dbo.Version " +
                    "WHERE QuoteID='" + params.aimQuoteID + "' AND VerOriginal='A'") {
                log.info "Select Version: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        SELECT *  FROM dbo.Version WHERE QuoteID='0623191' AND VerOriginal='A'
            aimsql.eachRow("SELECT     OwnerID, State, SLALicense, Taxed, Comments\n" +
                    "FROM         CompAdmt WITH (NOLOCK)\n" +
                    "WHERE     (OwnerID = 'RM0057') AND (State = 'CA')") {
                log.info "CompAdmt: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            UPDATE dbo.Quote
            SET VersionBound='A',StatusID='BIF',PolicyID='NESF16-006',Bound='20170302 00:00:00.000',BndPremium=convert(money,'5750.00'),BndFee=convert(money,'15.00'),
            ProductID='EPKG37',Effective='20170302 00:00:00.000',Expiration='20180302 00:00:00.000',PolicyVer='0',ActivePolicyFlag='Y',AIM_TransDate='20170302 00:00:00.000',
            BndMarketID='SAFELL',PolicyInception='20170302 00:00:00.000',CoverageExpired='20180302 00:00:00.000'

            WHERE QuoteID='0623191' AND VersionBound IS NULL  AND ProducerID='TVD' AND NamedInsured='Sdkfjlsklll' AND TypeID IS NULL  AND UserID='web' AND Attention='Andee Abad'
            AND Received='20170227 23:21:35.516' AND Acknowledged='20170227 23:21:35.516' AND Quoted='20170227 23:21:35.516' AND TeamID='01' AND DivisionID='00' AND StatusID='WB3'
            AND CreatedID='web' AND Renewal='N' AND OldPolicyID IS NULL  AND OldVersion IS NULL  AND OldExpiration IS NULL  AND OpenItem='N' AND PolicyID IS NULL
            AND VersionCounter='A' AND InsuredID='91264' AND Description='Feature Film' AND FileLocation IS NULL  AND Address1='3444' AND Address2='' AND City='sldkfj'
            AND State='CA' AND Zip='23099' AND Bound IS NULL  AND Submitted IS NULL  AND SubmitType IS NULL  AND NoteAttached IS NULL  AND AcctExec='jason'
            AND InsuredInterest IS NULL  AND EC IS NULL  AND BndPremium IS NULL  AND BndFee IS NULL  AND CompanyID='RM0057' AND ProductID IS NULL  AND Effective IS NULL
            AND Expiration IS NULL  AND Setup IS NULL  AND PolicyMailOut IS NULL  AND BinderRev IS NULL  AND PriorCarrier IS NULL  AND TargetPremium IS NULL
            AND CsrID='web' AND PolicyVer IS NULL  AND OldQuoteID IS NULL  AND PolicyGrpID IS NULL  AND PendingSuspenseID IS NULL  AND ReferenceID=91265 AND MapToID IS NULL
            AND SubmitGrpID='0623191' AND AcctAsst IS NULL  AND TaxState='CA' AND SicID IS NULL  AND CoverageID='EPKG' AND OldPremium IS NULL  AND AddressID IS NULL
            AND OldEffective IS NULL  AND TaxBasis IS NULL AND QuoteRequiredBy IS NULL  AND RequiredLimits IS NULL  AND RequiredDeduct IS NULL  AND Retroactive IS NULL
            AND PrevCancelFlag IS NULL  AND PrevNonRenew IS NULL  AND PriorPremium IS NULL  AND PriorLimits IS NULL  AND UWCheckList IS NULL  AND FileSetup IS NULL
            AND ContactID=24936 AND SuspenseFlag='N' AND PriorDeductible IS NULL  AND CategoryID IS NULL  AND StructureID IS NULL  AND RenewalStatusID IS NULL
            AND ClaimsFlag='N' AND ActivePolicyFlag='N' AND Assets IS NULL  AND PublicEntity IS NULL  AND VentureID IS NULL  AND IncorporatedState IS NULL
            AND ReInsuranceFlag IS NULL  AND TaxedPaidBy IS NULL  AND Employees IS NULL  AND Stock_52wk IS NULL  AND NetIncome IS NULL  AND PriorLimitsNew IS NULL
            AND LargeLossHistory='' AND DateOfApp IS NULL  AND Stock_High IS NULL  AND Stock_Low IS NULL  AND Stock_Current IS NULL  AND MarketCap IS NULL
            AND AIM_TransDate='20170227 23:21:35.516' AND LostBusinessFlag IS NULL  AND YearEst IS NULL  AND LostBusiness_Carrier IS NULL  AND LostBusiness_Premium IS NULL
            AND AccountKey_FK=91264 AND FlagRewrite IS NULL  AND flagWIP IS NULL  AND RenewalQuoteID IS NULL  AND QuoteDueDate IS NULL  AND QuoteStatus IS
            NULL  AND BinderExpires IS NULL  AND TIV IS NULL  AND InvoicedPremium IS NULL  AND InvoicedFee IS NULL  AND InvoicedCommRev IS NULL  AND SplitAccount IS NULL
            AND FileCloseReason IS NULL  AND FileCloseReasonID IS NULL  AND SourceOfLeadID IS NULL  AND ServiceUWID IS NULL  AND SubmitTypeID='NEW' AND SubProducerID IS NULL
            AND AgtAccountNumber IS NULL  AND BndMarketID IS NULL  AND RefQuoteID IS NULL  AND FlagHeldFile IS NULL  AND HeldFileMessage IS NULL  AND TermPremium IS NULL
            AND ProcessBatchKey_FK IS NULL  AND PolicyInception IS NULL  AND ClassID IS NULL  AND ScheduleIRM IS NULL  AND ClaimExpRM IS NULL  AND DateAppRecvd IS NULL
            AND DateLossRunRecvd IS NULL  AND CoverageEffective IS NULL  AND CoverageExpired IS NULL  AND SLA IS NULL  AND Class IS NULL  AND IRFileNum IS NULL
            AND IRDrawer IS NULL  AND FlagOverRideBy IS NULL  AND RackleyQuoteID IS NULL  AND FlagCourtesyFiling IS NULL  AND FlagRPG='N' AND CurrencyType IS NULL
            AND CurrencySymbol IS NULL  AND FileNo IS NULL  AND UserDefinedStr1='8' AND UserDefinedStr2 IS NULL  AND UserDefinedStr3 IS NULL  AND UserDefinedStr4 IS NULL
            AND UserDefinedDate1 IS NULL  AND UserDefinedValue1 IS NULL  AND ReservedContractID IS NULL  AND CountryID='' AND RatingKey_FK IS NULL  AND eAttached IS NULL
            AND NewField IS NULL  AND TotalCoinsuranceLimit IS NULL  AND TotalCoinsurancePremium IS NULL  AND CurrencyExchRate IS NULL  AND Invoiced IS NULL  AND OtherLead IS NULL
            AND LeadCarrierID IS NULL  AND RenewTypeID IS NULL  AND IsoCode IS NULL  AND CedingPolicyID IS NULL  AND CedingPolicyDate IS NULL  AND ConversionStatusID IS NULL
            AND FlagTaxExempt='' AND Units IS NULL  AND SubUnits IS NULL  AND LicenseAgtKey_FK IS NULL  AND ContractPlanKey_FK IS NULL  AND AltStatusID IS NULL
            AND FlagNonResidentAgt='N' AND CedingPolicyEndDate IS NULL  AND TargetPremPercent IS NULL  AND AgentContactKey_FK IS NULL  AND LAGACoverage IS NULL
            AND LAGALimoRateKey_FK IS NULL  AND FirewallTeamID IS NULL  AND CurrencyExchRate_Old IS NULL  AND MarketCapValue IS NULL  AND ExternalNoteFile IS NULL
            AND PriorRate IS NULL  AND DBAName='' AND MailAddress1='' AND MailAddress2='' AND MailCity='' AND MailState='' AND MailZip='' AND RatingID_FK IS NULL  AND HereOn IS NULL
            AND TaxMunicipality IS NULL
             */
            def quotenow = new Date();
            log.info quotenow
            def quotetimestamp = quotenow.format(dateFormat, timeZone);
            log.info quotetimestamp
            log.info quotetimestamp.split(" ")[0].replace("-", "") + " " + "00:00:00.000"
            quotetimestamp = quotetimestamp.split(" ")[0].replace("-", "") + " " + "00:00:00.000"
            log.info "UPDATE    Quote \n" +
                    "SET VersionBound = 'A', " +
                    "StatusID = 'BIF', " +
                    "PolicyID = '${params.policyNumber}', " +
                    "Bound = '$quotetimestamp', " +
                    "BndPremium = CONVERT(money, ${quoteRecordMap['BndPremium']}), \n" +
                    "BndFee = CONVERT(money, ${quoteRecordMap['BndFee']}), " +
                    "ProductID = '$productID', " +
                    "Effective = ${quoteRecordMap['Effective']}, " +  //WILL NEED TO CHANGE
                    "Expiration = ${quoteRecordMap['Expiration']}, " + //WILL NEED TO CHANGE
                    "PolicyVer = '0', " +
                    "ActivePolicyFlag = 'Y', " +
                    "AIM_TransDate = '$quotetimestamp', " +
                    "BndMarketID = '$marketID', " +
                    "PolicyInception = '$quotetimestamp', " +
                    "CoverageExpired = ${quoteRecordMap['Expiration']} \n" + //WILL NEED TO CHANGE
                    "WHERE     (QuoteID = ${quoteRecordMap['QuoteID']}) AND (ProducerID = ${quoteRecordMap['ProducerID']}) "
            aimsql.execute("UPDATE    Quote \n" +
                    "SET VersionBound = 'A', " +
                    "StatusID = 'BIF', " +
                    "PolicyID = '${params.policyNumber}', " +
                    "Bound = '$quotetimestamp', " +
                    "BndPremium = CONVERT(money, ${quoteRecordMap['BndPremium']}), \n" +
                    "BndFee = CONVERT(money, ${quoteRecordMap['BndFee']}), " +
                    "ProductID = '$productID', " +
                    "Effective = ${quoteRecordMap['Effective']}, " +  //WILL NEED TO CHANGE
                    "Expiration = ${quoteRecordMap['Expiration']}, " + //WILL NEED TO CHANGE
                    "PolicyVer = '0', " +
                    "ActivePolicyFlag = 'Y', " +
                    "AIM_TransDate = '$quotetimestamp', " +
                    "BndMarketID = '$marketID', " +
                    "PolicyInception = '$quotetimestamp', " +
                    "CoverageExpired = ${quoteRecordMap['Expiration']} \n" + //WILL NEED TO CHANGE
                    "WHERE     (QuoteID = ${quoteRecordMap['QuoteID']}) AND (ProducerID = ${quoteRecordMap['ProducerID']}) ")
            log.info "Rows Updated (Update into Quo): " + aimsql.getUpdateCount()

            //****************************************************************************************************************



            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     QuoteID, VersionBound, ProducerID, NamedInsured, TypeID, UserID, Attention, Received, Acknowledged, Quoted, TeamID, DivisionID, StatusID, CreatedID, Renewal,
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
            FROM         Quote
            WHERE     (QuoteID = '0623191')
             */
            aimsql.eachRow("SELECT     * \n" +
                    "FROM         Quote\n" +
                    "WHERE     (QuoteID = '" + params.aimQuoteID + "')") {
                log.info "Quote: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     SUM(Premium) AS Premium, SUM(TotalFees) AS Fees, SUM(TotalTaxes) AS Taxes, SUM(TermPremium) AS PremiumTerm, - SUM(TotalAgentComm) AS Commission,
                          SUM(TotalDue) AS AmountDue, SUM(OutStandingAmt) AS PolicyBal, SUM(TotalPayments) AS Payments
            FROM         InvoiceHeader WITH (NOLOCK)
            WHERE     (QuoteID = '0623191') AND (StatusID IN ('P', 'E')) AND (MemoInvoiceFlag IS NULL)
             */
            aimsql.eachRow("SELECT     SUM(Premium) AS Premium, SUM(TotalFees) AS Fees, SUM(TotalTaxes) AS Taxes, SUM(TermPremium) AS PremiumTerm, - SUM(TotalAgentComm) AS Commission, \n" +
                    "                      SUM(TotalDue) AS AmountDue, SUM(OutStandingAmt) AS PolicyBal, SUM(TotalPayments) AS Payments\n" +
                    "FROM         InvoiceHeader WITH (NOLOCK)\n" +
                    "WHERE     (QuoteID = '" + params.aimQuoteID + "') AND (StatusID IN ('P', 'E')) AND (MemoInvoiceFlag IS NULL)") {
                log.info "InvoiceHeader: " + it
            }
            //****************************************************************************************************************



            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     SUM(Premium) AS Premium, SUM(TotalFees) AS Fees, SUM(TotalTaxes) AS Taxes, SUM(TermPremium) AS PremiumTerm, - SUM(TotalAgentComm) AS Commission,
                          SUM(TotalDue) AS AmountDue, SUM(OutStandingAmt) AS PolicyBal, SUM(TotalPayments) AS Payments
            FROM         InvoiceHeader WITH (NOLOCK)
            WHERE     (QuoteID = '0623191') AND (StatusID IN ('P', 'E')) AND (MemoInvoiceFlag IS NULL)
             */
            aimsql.eachRow("SELECT     LEN(LTRIM(CONVERT(varchar(255), ISNULL(Comment, '')))) AS Expr1\n" +
                    "FROM         Producer WITH (NOLOCK)\n" +
                    "WHERE     (ProducerID = 'TVD')") {
                log.info "Producer: " + it
            }
            //****************************************************************************************************************



            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     ReferenceKey_FK, EndorsementKey_PK, Description, FormID, DateAdded, Premium, FTPremium, RiskDetailKey_FK, CreatedByID, CoverageID, EndorseFormKey_FK,
                          Effective, DateDropped, DocumentTemplateID, EndorseDate, OrderNumber, FlagRequired, FlagEdited
            FROM         taaPolicyEndorsement WITH (NOLOCK)
            WHERE     (ReferenceKey_FK = 91265)
            ORDER BY OrderNumber
             */
            aimsql.eachRow("SELECT     ReferenceKey_FK, EndorsementKey_PK, Description, FormID, DateAdded, Premium, FTPremium, RiskDetailKey_FK, CreatedByID, CoverageID, EndorseFormKey_FK, \n" +
                    "                      Effective, DateDropped, DocumentTemplateID, EndorseDate, OrderNumber, FlagRequired, FlagEdited\n" +
                    "FROM         taaPolicyEndorsement WITH (NOLOCK)\n" +
                    "WHERE     (ReferenceKey_FK = 91265)\n" +
                    "ORDER BY OrderNumber") {
                log.info "taaPolicyEndorsement: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        exec dbo.AddTransaction  @ReferenceID='0623191',@UserID='web',@Description='Binder Printed/Faxed  saved/not printed',@Date='2017-03-02 05:31:44:657',
//        @StatusID='BPF',@ImageID='29828',@TypeID='M',@QuoteVersion='A',@ToNameKey=24936,@DocTemplateID='BINDER',@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
            now = new Date();
            timestamp = now.format(dateFormat, timeZone);
            p1 = params.aimQuoteID
            p2 = "web"
            p3 = "Binder Printed/Faxed  saved/not printed"
            p4 = timestamp
            p5 = "BPF"
            p6 = null //imageID
            p7 = null  //'M' = ?
            p8 = 'A' //QuoteVersion
            p9 = 0  //ToNameKey ?
            p10 = null //DocTemplateID
            p11 = 0 //AttachmentIcon
            p12 = '1899-12-30 00:00:00:000' //SourceDateTime
            def addTransactionBPFRows = aimsql.call("{call dbo.AddTransaction( '$p1', '$p2', '$p3', '$p4', '$p5', $p6, " +
                    "$p7, '$p8', '$p9', $p10, '$p11', '$p12')}") { num ->
                log.info "addTransaction: $num"
            }
            log.info "addTransactionRows: " + addTransactionBPFRows
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     ReferenceID, TransID, UserID, Description, Date, TypeID, StatusID, ImageID, PremiumAmt, PolicyTrans, MktingTrans, ClaimsTrans, FinanceTrans, AccountingDocID,
                          ImageIconID, QuoteVersion, ToNameKey, SystemDate, NoteIconID, FlagCurrentProcess, DocumentSequence, BatchProcessKey_FK, DocTemplateID, FlagDistibution,
                          FlagDistribution, AttachmentIcon, SourceDateTime, FolderName, Temp, SessionID, FolderName AS Folder, ISNULL(SourceDateTime, Date) AS SortDate
            FROM         Activity WITH (NOLOCK)
            WHERE     (ReferenceID = '0623191')
            ORDER BY Date DESC
             */
            aimsql.eachRow("SELECT     ReferenceID, TransID, UserID, Description, Date, TypeID, StatusID, ImageID, PremiumAmt, PolicyTrans, MktingTrans, ClaimsTrans, FinanceTrans, AccountingDocID, \n" +
                    "ImageIconID, QuoteVersion, ToNameKey, SystemDate, NoteIconID, FlagCurrentProcess, DocumentSequence, BatchProcessKey_FK, DocTemplateID, FlagDistibution, \n" +
                    "FlagDistribution, AttachmentIcon, SourceDateTime, FolderName, Temp, SessionID, FolderName AS Folder, ISNULL(SourceDateTime, Date) AS SortDate\n" +
                    "FROM         Activity WITH (NOLOCK)\n" +
                    "WHERE     (ReferenceID = '0623191')\n" +
                    "ORDER BY Date DESC") {
                log.info "Actvitiy: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     TeamID
            FROM         UserID WITH (NOLOCK)
            WHERE     (UserID = 'jason')
             */
            aimsql.eachRow("SELECT     TeamID\n" +
                    "FROM         UserID WITH (NOLOCK)\n" +
                    "WHERE     (UserID = 'jason')") {
                log.info "UserID: " + it
            }
            //****************************************************************************************************************

///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//        declare @p1 int
//        set @p1=510642
//        exec dbo.spAddSuspense  @SuspenseID=@p1 output,@ReferenceID='0623191',@AlternateID='NESF16-006',@ReasonID='ISS',@UserID='jason',@SuspendedByID='web',
//        @TypeID='F',@TeamID='01',@DateEntered='2017-03-02 00:00:00:000',@SuspenseDate='2017-03-02 00:00:00:000',@Comments=NULL
//        select @p1
            now = new Date();
            timestamp = now.format(dateFormat, timeZone);
            p1 = params.aimQuoteID
            p2 = "" //Policy Number
            p3 = "" // ReasonID
            p4 = "" // UserID
            p5 = "web" //SuspendedByID
            p6 = "F" //TypeID
            p7 = "01"  //TeamID
            p8 = "" //Date Entered
            p9 = ""  //Suspense Date
            p10 = null //Comments
            def spAddSuspenseRows = aimsql.callWithAllRows("{call dbo.spAddSuspense(${Sql.ALL_RESULT_SETS}, '$p1', '$p2', '$p3', '$p4', '$p5', '$p6', " +
                    "'$p7', '$p8', '$p9', '$p10')}") { num ->
                log.info "spAddSuspense: $num"
            }
            log.info "spAddSuspenseRows: " + spAddSuspenseRows
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     FlagInvoiceRequired
            FROM         Control WITH (NOLOCK)
             */
            aimsql.eachRow("SELECT     FlagInvoiceRequired\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Control: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     BinderBillOption
            FROM         Company WITH (NOLOCK)
            WHERE     (CompanyID = 'SAFELL')
             */
            aimsql.eachRow("SELECT     BinderBillOption\n" +
                    "FROM         Company WITH (NOLOCK)\n" +
                    "WHERE     (CompanyID = 'SAFELL')") {
                log.info "Company: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            EXEC	@return_value = [dbo].[spInvCheckInvoiceStatus]
            @QuoteID = N'0623191',
            @EndorseKey = 0,
            @Count = @Count OUTPUT

            SELECT	@Count as N'@Count'
            SELECT	'Return Value' = @return_value
            */
            p1 = params.aimQuoteID
            p2 = "" //Endorse Key
            p3 = "" // Count
            def spInvCheckInvoiceStatusRows = aimsql.callWithAllRows("{call dbo.spInvCheckInvoiceStatus(${Sql.ALL_RESULT_SETS}, '$p1', '$p2', '$p3')}") { num ->
                log.info "spInvCheckInvoiceStatus $num"
            }
            log.info "spInvCheckInvoiceStatusRows: " + spInvCheckInvoiceStatusRows
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     InvoiceID, InvoiceKey_PK, QuoteID, PolicyKey_FK, Effective, ProducerID, BillingType, BillToCode, Premium, Non_Premium, Misc_Premium, NonTax_Premium, Tax1,
                          Tax2, Tax3, Tax4, InvoiceTypeID, PolicyID, Description, TaxState, InvoiceTotal, BillToAddressID, PaymentToAddressID, MemoInvoiceFlag, OutStandingAmt,
                          DirectBillFlag, InstallmentPlanID, DueDate, NumberOfPayments, TotalGrossComm, TotalAgentComm, TotalDue, TotalPayable, Note, GrossComm, AgentComm,
                          CompanyCollectedFees, AgencyCollectedFees, TotalPremium, InstallmentID, PayableID, InstallmentFlag, Message, TaxPaidBy, Taxed, TaxesPaidByID, UserHoldFlag,
                          CourtesyFilingID, DefaultPayableID, Ledger, ReversedFlag, PostDate, FrequencyID, IncludeAgentComm, IncludeCompanyFee, IncludeAgencyComm,
                          IncludeAgencyFee, DownPercent, StatusID, InstallmentItem, Initial_InvoiceFlag, PayToCode, AcuityTargetCompanyID, InsuredID, TeamID, InvoicedByID,
                          AcuityStatusID, InvoiceDate, OwnerKey_FK, InstallmentTotal, Address1, Address2, City, State, Zip, RemitAddress1, RemitAddress2, RemitCity, RemitState, RemitZip,
                          InvTypeID, EndorsementKey_FK, ExportDate, HeldSuspenseKey, InvoiceTerms, InstallPayOOBFlag, AgencyCollectedTaxes, TotalFeeRevenue, TotalNetDueCompany,
                          AccountingEffectiveDate, ReversedInvoiceKey, ExportStatusID, AcuityBatchKey, ProgramID, TotalInstallmentsDue, RiskLimits, RiskZip, RiskCounty, PaidByStatement,
                          DownPaymentAmt, PayToDueDate, DateCreated, FinanceID, FlagFinanced, Endorsement, CompanyCollectedTaxes, TotalTaxes, FlagSplit, MarketID, ContractID,
                          OtherTaxes, OtherExpense, AcctExec, CurrencyType, CurrencyAmount, ProductID, CoverageID, OwnerKey_SK, ZipPlus, TotalFeeExpense, TotalRevenue,
                          TotalFeeCommission, DatePrinted, GLPeriod, FlagRebill, TotalPayments, TermPremium, MinimumPremium, ProcessBatchKey_FK, EffectiveDate, DivisionID,
                          DateTaxesFiled, FlagMultiPremium, DatePremiumReported, AdmittedPremium, FlagOverrideComm, CommissionSplitKey_FK, Entity, CstCtr, ProductionSplitKey_FK,
                          TotalAgentCommOnly, TotalAgentFeeTaxes, TotalAPCompany, TotalAPTax, TotalNetFeeRevenue, TotalNetComm, Expiration, TotalNetRevenue, TotalFees,
                          FlagCourtesyFiler, FlagProductionSplit, SourcePremium, RebillInvoiceKey_FK, DownPaymentMemo, TotalBasisAmount, CompanyID, InvoicePostedByID,
                          TerrorismPremium_GL, TerrorismPremium, FlagSuppress, FlaggedAR, FlaggedAP, MapToID, Tax5, Tax6, Tax7, Tax8, AddToExisting, AR_AccountID, BatchID,
                          StatusID_Old, StatusID_Old2, OLD_AcuityTargetCompanyID, DateBackOutFiled, PerArchFiled, ArchBatchKey, FlagCancelFiledToArch, TaxKeyPK, OrigPolNum,
                          DateTaxesAccepted, FlagFileSLSO, SLSOErrorType, SLSOBatchKey_FK, MasterInstallKey_FK, FlagMasterInstall, DepositPremium, InstallmentNo, AggregateLimits,
                          FlagMailedOut, FlagEscrow
            FROM         InvoiceHeader WITH (NOLOCK)
            WHERE     (InvoiceKey_PK = 0)
             */
            aimsql.eachRow("SELECT    * \n" +
                    "FROM         InvoiceHeader WITH (NOLOCK)\n" +
                    "WHERE     (InvoiceKey_PK = 0)") {
                log.info "InvoiceHeader: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     InvoiceKey_FK, InvoiceDetailKey_PK, TransCd, Description, Amount, GrossComm, AgentComm, Revenue_Amt, Expense_Amt, AP_Amt, AR_Amt, Tax1_Amt, Tax2_Amt,
                          Tax3_Amt, Tax4_Amt, LineTypeID, CollectedBy, PayableID, GLAcctID, PaidAmount, PaymentKey_FK, PaidInFullFlag, PayToCode, ChargingParty, RevenueFee_Amt,
                          InvoiceID, CoverageID, SplitLineKey_FK, ComputeAgtComm, ComputeAgyComm, FlagSplitPayable, ContractID, MarketID, DBCommExp_Amt, FlagManualEdit,
                          FlagFullyEarned, ReturnFactor, ReturnPremium, ReturnMethodID, TermPremium, FlagAdjustment, MinimumPremium, MEP, OwedByCode, RiskCompanyID,
                          BasisAmount, LimitsValue, Limits, Deductible, DeductibleValue, ItemDueDate, DateReported, LineKey_FK, FlagSuppressReport, QuoteID, LineSlip, Tax5_Amt,
                          Tax6_Amt, Tax7_Amt, Tax8_Amt, TaxRate, ContactID, OrigInvoiceKey_FK, OrigInvoiceDetailKey_FK, FleetUnitKey_FK, InstallmentID
            FROM         InvoiceDetail WITH (NOLOCK)
            WHERE     (InvoiceKey_FK = NULL)
            ORDER BY InvoiceDetailKey_PK, PayableID
             */
            aimsql.eachRow("SELECT     InvoiceKey_FK, InvoiceDetailKey_PK, TransCd, Description, Amount, GrossComm, AgentComm, Revenue_Amt, Expense_Amt, AP_Amt, AR_Amt, Tax1_Amt, Tax2_Amt, \n" +
                    "                      Tax3_Amt, Tax4_Amt, LineTypeID, CollectedBy, PayableID, GLAcctID, PaidAmount, PaymentKey_FK, PaidInFullFlag, PayToCode, ChargingParty, RevenueFee_Amt, \n" +
                    "                      InvoiceID, CoverageID, SplitLineKey_FK, ComputeAgtComm, ComputeAgyComm, FlagSplitPayable, ContractID, MarketID, DBCommExp_Amt, FlagManualEdit, \n" +
                    "                      FlagFullyEarned, ReturnFactor, ReturnPremium, ReturnMethodID, TermPremium, FlagAdjustment, MinimumPremium, MEP, OwedByCode, RiskCompanyID, \n" +
                    "                      BasisAmount, LimitsValue, Limits, Deductible, DeductibleValue, ItemDueDate, DateReported, LineKey_FK, FlagSuppressReport, QuoteID, LineSlip, Tax5_Amt, \n" +
                    "                      Tax6_Amt, Tax7_Amt, Tax8_Amt, TaxRate, ContactID, OrigInvoiceKey_FK, OrigInvoiceDetailKey_FK, FleetUnitKey_FK, InstallmentID\n" +
                    "FROM         InvoiceDetail WITH (NOLOCK)\n" +
                    "WHERE     (InvoiceKey_FK = NULL)\n" +
                    "ORDER BY InvoiceDetailKey_PK, PayableID") {
                log.info "InvoiceDetail: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     TransCode, TransTypeID, Description, Rate, VersionTbl_Field, GrossComm, AgentComm, AP_AccountID, CollectedBy, AR_Acct, AP_Acct, Revenue_Acct, Expense_Acct,
                          Clearing_Acct, AcuityTranGroup, FlatAmount_Flag, Revenue_Acct_DB, AllowOverRide, CompanyID, CoverageID, ActiveFlag, TranCodeKey_SK, NonTaxableFee,
                          Comment, DateAdded, DateModified, CreatedByID, ModifiedByID, SystemRequired, FlagInvoiceReason, InvoiceReason, RecordKey_PK, MapToID,
                          FlagCreditTransaction, MinAmount, MaxAmount, FlagRPGRevenue, RoundingRule, FlagIncludeTRIAPremium, FlagMemoTransCode, AllowOverRideChargingParty
            FROM         InvoiceTranCode WITH (NOLOCK)
            ORDER BY Description
             */
            aimsql.eachRow("SELECT     TransCode, TransTypeID, Description, Rate, VersionTbl_Field, GrossComm, AgentComm, AP_AccountID, CollectedBy, AR_Acct, AP_Acct, Revenue_Acct, Expense_Acct, \n" +
                    "                      Clearing_Acct, AcuityTranGroup, FlatAmount_Flag, Revenue_Acct_DB, AllowOverRide, CompanyID, CoverageID, ActiveFlag, TranCodeKey_SK, NonTaxableFee, \n" +
                    "                      Comment, DateAdded, DateModified, CreatedByID, ModifiedByID, SystemRequired, FlagInvoiceReason, InvoiceReason, RecordKey_PK, MapToID, \n" +
                    "                      FlagCreditTransaction, MinAmount, MaxAmount, FlagRPGRevenue, RoundingRule, FlagIncludeTRIAPremium, FlagMemoTransCode, AllowOverRideChargingParty\n" +
                    "FROM         InvoiceTranCode WITH (NOLOCK)\n" +
                    "ORDER BY Description") {
                log.info "InvoiceTranCode: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     QuoteID, PolicyID, Effective, Expiration, ProducerID, InsuredID, NamedInsured, ReferenceID, Renewal, TaxState, CSRid, TeamID, Attention, StatusID, AcctExec,
                          CoverageID, OldPolicyID, ActivePolicyFlag, Bound, RiskCompanyID, RiskCompany, Premium, Non_Premium, Misc_Premium, NonTax_Premium, TotalFees, Tax1,
                          Tax2, Tax3, Tax4, Tax5, Tax6, Tax7, Tax8, Taxes, Taxed, AgentComm, GrossComm, ProductID, TaxDistrib, PremDistrib, LobDistrib, DirectBillFlag, Brokerage,
                          CommPaid, PayToCompanyID, VerOriginal, TotalAmount, MEP, VersionID, Description, MarketName, DueInDays, DivisionID, ProducerName, ProducerAddress,
                          ProducerAddress2, ProducerCity, ProducerState, ProducerZip, Financed, LoanNumber, FinanceCompanyID, InvoiceDate, FlagCourtesyFiling, TerrorActMEP,
                          TemplateInvoice, ContactID, MarketContactKey_FK, FlagBillOffBasis, RatedPremium, LastInstallExported
            FROM         dvPolicyInvoiceDetail
            WHERE     (QuoteID = '0623191')
             */
            aimsql.eachRow("SELECT     QuoteID, PolicyID, Effective, Expiration, ProducerID, InsuredID, NamedInsured, ReferenceID, Renewal, TaxState, CSRid, TeamID, Attention, StatusID, AcctExec, \n" +
                    "                      CoverageID, OldPolicyID, ActivePolicyFlag, Bound, RiskCompanyID, RiskCompany, Premium, Non_Premium, Misc_Premium, NonTax_Premium, TotalFees, Tax1, \n" +
                    "                      Tax2, Tax3, Tax4, Tax5, Tax6, Tax7, Tax8, Taxes, Taxed, AgentComm, GrossComm, ProductID, TaxDistrib, PremDistrib, LobDistrib, DirectBillFlag, Brokerage, \n" +
                    "                      CommPaid, PayToCompanyID, VerOriginal, TotalAmount, MEP, VersionID, Description, MarketName, DueInDays, DivisionID, ProducerName, ProducerAddress, \n" +
                    "                      ProducerAddress2, ProducerCity, ProducerState, ProducerZip, Financed, LoanNumber, FinanceCompanyID, InvoiceDate, FlagCourtesyFiling, TerrorActMEP, \n" +
                    "                      TemplateInvoice, ContactID, MarketContactKey_FK, FlagBillOffBasis, RatedPremium, LastInstallExported\n" +
                    "FROM         dvPolicyInvoiceDetail\n" +
                    "WHERE     (QuoteID = '0623191')") {
                log.info "dvPolicyInoiceDetail: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     TeamID
            FROM         Team WITH (NOLOCK)
            WHERE     (TeamID = '01') AND (ISNULL(ActiveFlag, 'Y') = 'Y')
             */
            aimsql.eachRow("SELECT     TeamID\n" +
                    "FROM         Team WITH (NOLOCK)\n" +
                    "WHERE     (TeamID = '01') AND (ISNULL(ActiveFlag, 'Y') = 'Y')") {
                log.info "Team: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     CompanyID, BillCompanyID
            FROM         Company WITH (NOLOCK)
            WHERE     (CompanyID = 'SAFELL')
             */
            aimsql.eachRow("SELECT     CompanyID, BillCompanyID\n" +
                    "FROM         Company WITH (NOLOCK)\n" +
                    "WHERE     (CompanyID = 'SAFELL')") {
                log.info "Company: " + it
            }
            //****************************************************************************************************************



            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            declare @p1 int
            set @p1=91404
            exec dbo.GetKeyField  @KeyValue=@p1 output,@FieldName='ReferenceID'
            select @p1
             */
            def referenceID =0;
            aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
                log.info "ReferenceID $num"
                referenceID = num
            }

            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     FlagPaidByStatement
            FROM         Producer WITH (NOLOCK)
            WHERE     (ProducerID = 'TVD') AND (ProducerID IS NOT NULL)
             */
            aimsql.eachRow("SELECT     FlagPaidByStatement\n" +
                    "FROM         Producer WITH (NOLOCK)\n" +
                    "WHERE     (ProducerID = 'TVD') AND (ProducerID IS NOT NULL)") {
                log.info "Producer: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     COUNT(*) AS Expr1
            FROM         InvoiceHeader WITH (NOLOCK)
            WHERE     (QuoteID = '0623191') AND (QuoteID IS NOT NULL)
             */
            aimsql.eachRow("SELECT     COUNT(*) AS Expr1\n" +
                    "FROM         InvoiceHeader WITH (NOLOCK)\n" +
                    "WHERE     (QuoteID = '0623191') AND (QuoteID IS NOT NULL)") {
                log.info "InvoiceHeader: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     DefaultInvoiceMessage
            FROM         Control WITH (NOLOCK)
             */
            aimsql.eachRow("SELECT     DefaultInvoiceMessage\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Control: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     InvoiceKey_FK, InvoiceDetailKey_PK, TransCd, Description, Amount, GrossComm, AgentComm, Revenue_Amt, Expense_Amt, AP_Amt, AR_Amt, Tax1_Amt, Tax2_Amt,
                          Tax3_Amt, Tax4_Amt, LineTypeID, CollectedBy, PayableID, GLAcctID, PaidAmount, PaymentKey_FK, PaidInFullFlag, PayToCode, ChargingParty, RevenueFee_Amt,
                          InvoiceID, CoverageID, SplitLineKey_FK, ComputeAgtComm, ComputeAgyComm, FlagSplitPayable, ContractID, MarketID, DBCommExp_Amt, FlagManualEdit,
                          FlagFullyEarned, ReturnFactor, ReturnPremium, ReturnMethodID, TermPremium, FlagAdjustment, MinimumPremium, MEP, OwedByCode, RiskCompanyID,
                          BasisAmount, LimitsValue, Limits, Deductible, DeductibleValue, ItemDueDate, DateReported, LineKey_FK, FlagSuppressReport, QuoteID, LineSlip, Tax5_Amt,
                          Tax6_Amt, Tax7_Amt, Tax8_Amt, TaxRate, ContactID, OrigInvoiceKey_FK, OrigInvoiceDetailKey_FK, FleetUnitKey_FK, InstallmentID
            FROM         InvoiceDetail WITH (NOLOCK)
            WHERE     (InvoiceKey_FK = 91404)
            ORDER BY InvoiceDetailKey_PK, PayableID
             */
            aimsql.eachRow("SELECT     InvoiceKey_FK, InvoiceDetailKey_PK, TransCd, Description, Amount, GrossComm, AgentComm, Revenue_Amt, Expense_Amt, AP_Amt, AR_Amt, Tax1_Amt, Tax2_Amt, \n" +
                    "                      Tax3_Amt, Tax4_Amt, LineTypeID, CollectedBy, PayableID, GLAcctID, PaidAmount, PaymentKey_FK, PaidInFullFlag, PayToCode, ChargingParty, RevenueFee_Amt, \n" +
                    "                      InvoiceID, CoverageID, SplitLineKey_FK, ComputeAgtComm, ComputeAgyComm, FlagSplitPayable, ContractID, MarketID, DBCommExp_Amt, FlagManualEdit, \n" +
                    "                      FlagFullyEarned, ReturnFactor, ReturnPremium, ReturnMethodID, TermPremium, FlagAdjustment, MinimumPremium, MEP, OwedByCode, RiskCompanyID, \n" +
                    "                      BasisAmount, LimitsValue, Limits, Deductible, DeductibleValue, ItemDueDate, DateReported, LineKey_FK, FlagSuppressReport, QuoteID, LineSlip, Tax5_Amt, \n" +
                    "                      Tax6_Amt, Tax7_Amt, Tax8_Amt, TaxRate, ContactID, OrigInvoiceKey_FK, OrigInvoiceDetailKey_FK, FleetUnitKey_FK, InstallmentID\n" +
                    "FROM         InvoiceDetail WITH (NOLOCK)\n" +
                    "WHERE     (InvoiceKey_FK = 91404)\n" +
                    "ORDER BY InvoiceDetailKey_PK, PayableID") {
                log.info "InvoiceDetail: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     ISNULL(T.CstCtr, ISNULL(D.Entity, C.CstCtr)) AS CstCtr, ISNULL(T.Entity, ISNULL(D.Entity, C.Entity)) AS Entity
            FROM         Division AS D INNER JOIN
                                  Team AS T ON D.DivisionID = T.DivisionID CROSS JOIN
                                  Control AS C
            WHERE     (T.TeamID = '01')
             */
            aimsql.eachRow("SELECT     ISNULL(T.CstCtr, ISNULL(D.Entity, C.CstCtr)) AS CstCtr, ISNULL(T.Entity, ISNULL(D.Entity, C.Entity)) AS Entity\n" +
                    "FROM         Division AS D INNER JOIN\n" +
                    "                      Team AS T ON D.DivisionID = T.DivisionID CROSS JOIN\n" +
                    "                      Control AS C\n" +
                    "WHERE     (T.TeamID = '01')") {
                log.info "Division join Team join Control: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//      EXEC spComputeDueDates 'TVD', 'SAFELL', '01', '3/2/2017', '0623191'
            p1 = producerID
            p2 = marketID
            p3 = teamID
            p4 = effective
            p5 = params.aimQuoteID
            log.info effective

            def spComputeDueDatesRows = aimsql.callWithRows("{call dbo.spComputeDueDates('$p1', '$p2', '$p3', '$p4', '$p5')}") { num ->
                log.info "spComputeDueDates $num"
            }
            log.info "spComputeDueDatesRows: " + spComputeDueDatesRows
            //****************************************************************************************************************



            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     Description, InvoiceTypeID
            FROM         dvInvoiceTypeCode WITH (NOLOCK)
            ORDER BY Description
             */
            aimsql.eachRow("SELECT     Description, InvoiceTypeID\n" +
                    "FROM         dvInvoiceTypeCode WITH (NOLOCK)\n" +
                    "ORDER BY Description") {
                log.info "dvInvoiceTypeCode: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     TeamID AS DivisionID, Name
            FROM         Team WITH (NOLOCK)
            ORDER BY Name
             */
            aimsql.eachRow("SELECT     TeamID AS DivisionID, Name\n" +
                    "FROM         Team WITH (NOLOCK)\n" +
                    "ORDER BY Name") {
                log.info "Team: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     Teamid, Name, Phone, Fax, Divisionid, Activeflag
            FROM         lkpTeam
            ORDER BY Name
             */
            aimsql.eachRow("SELECT     Teamid, Name, Phone, Fax, Divisionid, Activeflag\n" +
                    "FROM         lkpTeam\n" +
                    "ORDER BY Name") {
                log.info "lkpTeam: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     Description, Message
            FROM         InvoiceMessage WITH (NOLOCK)
            WHERE     (ActiveFlag <> 'N')
            ORDER BY Message
             */
            aimsql.eachRow("SELECT     Description, Message\n" +
                    "FROM         InvoiceMessage WITH (NOLOCK)\n" +
                    "WHERE     (ActiveFlag <> 'N')\n" +
                    "ORDER BY Message") {
                log.info "InvoiceMessage: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     FlagUseProductionSplit
            FROM         Control WITH (NOLOCK)
             */
            aimsql.eachRow("SELECT     FlagUseProductionSplit\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Control: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     FlagUseCoverageDetail
            FROM         Control WITH (NOLOCK)
             */
            aimsql.eachRow("SELECT     FlagUseCoverageDetail\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Control2: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     FlagAllowPlansOnInvoice
            FROM         Control WITH (NOLOCK)
             */
            aimsql.eachRow("SELECT     FlagAllowPlansOnInvoice\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Control3: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     FlagAllowInvContractAll
            FROM         Control WITH (NOLOCK)
             */
            aimsql.eachRow("SELECT     FlagAllowInvContractAll\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Company4: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     LvlChangePaidByStatement
            FROM         Control WITH (NOLOCK)
             */
            aimsql.eachRow("SELECT     LvlChangePaidByStatement\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Control5: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     CompanyID, CurrentContractNbr, FlagContractRequired
            FROM         Company WITH (NOLOCK)
            WHERE     (CompanyID = 'SAFELL')
             */
            aimsql.eachRow("SELECT     CompanyID, CurrentContractNbr, FlagContractRequired\n" +
                    "FROM         Company WITH (NOLOCK)\n" +
                    "WHERE     (CompanyID = 'SAFELL')") {
                log.info "Company: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     C.FlagContractRequired, P.FlagContractRequired AS Expr1
            FROM         Product AS P WITH (NOLOCK) INNER JOIN
                                  Company AS C WITH (NOLOCK) ON P.CompanyID = C.CompanyID
            WHERE     (P.ProductID = 'EPKG37')
             */
            aimsql.eachRow("SELECT     C.FlagContractRequired, P.FlagContractRequired AS Expr1\n" +
                    "FROM         Product AS P WITH (NOLOCK) INNER JOIN\n" +
                    "                      Company AS C WITH (NOLOCK) ON P.CompanyID = C.CompanyID\n" +
                    "WHERE     (P.ProductID = 'EPKG37')") {
                log.info "Product join Company: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     FlagPremiumAllocationReq
            FROM         Product WITH (NOLOCK)
            WHERE     (CompanyID = 'SAFELL')
             */
            aimsql.eachRow("SELECT     FlagPremiumAllocationReq\n" +
                    "FROM         Product WITH (NOLOCK)\n" +
                    "WHERE     (CompanyID = 'SAFELL')") {
                log.info "Product: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     QuoteID
            FROM         taaPremiumAllocation WITH (NOLOCK)
            WHERE     (QuoteID = '0623191') AND (FlagMaster = 'Y') AND (PremiumRecordKey_PK > 0)
             */
            aimsql.eachRow("SELECT     QuoteID\n" +
                    "FROM         taaPremiumAllocation WITH (NOLOCK)\n" +
                    "WHERE     (QuoteID = '0623191') AND (FlagMaster = 'Y') AND (PremiumRecordKey_PK > 0)") {
                log.info "taaPremiumAllocation: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     QuoteID
            FROM         taaPolicyCoverageDetail WITH (NOLOCK)
            WHERE     (QuoteID = '0623191')
             */
            aimsql.eachRow("SELECT     QuoteID\n" +
                    "FROM         taaPolicyCoverageDetail WITH (NOLOCK)\n" +
                    "WHERE     (QuoteID = '0623191')") {
                log.info "taaPolicyCoverageDetail: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            exec dbo.spCreatePremiumAllocation  @QuoteID='0623191',@InvoiceKey=91404,@EndorsementKey=0,@Premium=$5750.0000
             */
            p1 = params.aimQuoteID
            p2 = "" //InvoiceKey
            p3 = "" //EndorsementKey
            p4 = "" //Premium
            aimsql.call("{call dbo.spCreatePremiumAllocation('$p1', '$p2', '$p3', '$p4')}") { num ->
                log.info "spCreatePremiumAllocation $num"
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     QuoteID, InvoiceKey_FK, PremiumRecordKey_PK, FlagMaster, EndorsementKey_FK, CoverageID, GrossComm, AgentComm, MarketID, TreatyKey_FK,
                          BillToCompanyID, WrittenPremium, BilledPremium, LineSlip, CompanyName, ContractNumber, Limits, AttachPoint, PartOf, MEP, RiskCompanyID, InvoiceLine,
                          BasisAmount, LimitsLineSlip, CoverageSectionID, LineKey_FK, LimitsGL, LimitsLineSlipGL, PremiumGL, LineSlipGL, LimitsLineSlipOther, LineSlipOther,
                          PremiumOther, PremiumTotal, LimitsOther, CRPartLimit
            FROM         taaPremiumAllocation
            WHERE     (QuoteID = '0623191') AND (InvoiceKey_FK = 91404)
            ORDER BY QuoteID, InvoiceKey_FK
             */
            aimsql.eachRow("SELECT     QuoteID, InvoiceKey_FK, PremiumRecordKey_PK, FlagMaster, EndorsementKey_FK, CoverageID, GrossComm, AgentComm, MarketID, TreatyKey_FK, \n" +
                    "                      BillToCompanyID, WrittenPremium, BilledPremium, LineSlip, CompanyName, ContractNumber, Limits, AttachPoint, PartOf, MEP, RiskCompanyID, InvoiceLine, \n" +
                    "                      BasisAmount, LimitsLineSlip, CoverageSectionID, LineKey_FK, LimitsGL, LimitsLineSlipGL, PremiumGL, LineSlipGL, LimitsLineSlipOther, LineSlipOther, \n" +
                    "PremiumOther, PremiumTotal, LimitsOther, CRPartLimit\n" +
                    "FROM         taaPremiumAllocation\n" +
                    "WHERE     (QuoteID = '0623191') AND (InvoiceKey_FK = 91404)\n" +
                    "ORDER BY QuoteID, InvoiceKey_FK") {
                log.info "taaPremiumAllocation: " + it
            }
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     CompanyKey_FK, ContractKey_PK, Effective, ContractYear, ContractNumber, Expiration, GrossComm, CoverageID, ProductID, DateAdded, DateModified, AggPremium,
                          AggClaims, AggFees, Description, FlagAllLines, StatusID, MaxGrossComm, MaxLimits, CompanyID, ActiveFlag, CoverageSectionID, FlagLeadContract,
                          LimitsLineSlipGL, LimitsLineSlip, LineSlip, LineSlipGL, LineSlipOther, LimitsLineSlipOther
            FROM         taaCompanyContract WITH (NOLOCK)
            WHERE     (CompanyID = 'SAFELL') AND ('3/2/2017' BETWEEN Effective AND Expiration)
            ORDER BY Description
             */
            aimsql.eachRow("SELECT     CompanyKey_FK, ContractKey_PK, Effective, ContractYear, ContractNumber, Expiration, GrossComm, CoverageID, ProductID, DateAdded, DateModified, AggPremium, \n" +
                    "                      AggClaims, AggFees, Description, FlagAllLines, StatusID, MaxGrossComm, MaxLimits, CompanyID, ActiveFlag, CoverageSectionID, FlagLeadContract, \n" +
                    "                      LimitsLineSlipGL, LimitsLineSlip, LineSlip, LineSlipGL, LineSlipOther, LimitsLineSlipOther\n" +
                    "FROM         taaCompanyContract WITH (NOLOCK)\n" +
                    "WHERE     (CompanyID = 'SAFELL') AND ('3/2/2017' BETWEEN Effective AND Expiration)\n" +
                    "ORDER BY Description") {
                log.info "taaCompanyContract: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     MailAddress1 AS Address1, MailAddress2 AS Address2, MailCity AS City, MailState AS State, MailZip AS Zip
            FROM         Producer WITH (NOLOCK)
            WHERE     (ProducerID = 'TVD')
             */
            aimsql.eachRow("SELECT     MailAddress1 AS Address1, MailAddress2 AS Address2, MailCity AS City, MailState AS State, MailZip AS Zip\n" +
                    "FROM         Producer WITH (NOLOCK)\n" +
                    "WHERE     (ProducerID = 'TVD')") {
                log.info "Producer: " + it
            }
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//      EXEC spGetRemitToAddress '01'
            p1 = teamID

            def spGetRemitToAddressRows = aimsql.callWithRows("{call dbo.spGetRemitToAddress('$p1')}") { num ->
                log.info "spGetRemitToAddress $num"
            }
            log.info "spGetRemitToAddressRows: " + spGetRemitToAddressRows
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            SELECT     LvlChgBillingMethod
            FROM         Control WITH (NOLOCK)
             */
            aimsql.eachRow("SELECT     LvlChgBillingMethod\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Control: " + it
            }
            //****************************************************************************************************************

        }

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////AIMSQL DATABASE HELPER METHODS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    def testAIM(table, where, dataSource_aim){
        log.info "AIMDAO SELECT * FROM $table WHERE $where"
        //RETURNS LIST of MAPS [:] OF {[COLUMN:VALUE],

        Sql aimsql = new Sql(dataSource_aim)
        def rowMap=[:]
        def rows =[];
        def meta;
        aimsql.eachRow("SELECT     * \n" +
                "FROM         $table \n" +
                "WHERE     $where") {

            meta = it.getMetaData();
            it.toRowResult().eachWithIndex { rowItem, index ->
                rowMap[rowItem.key] = rowItem.value;
//                log.info rowItem.key + ":" + rowItem.value;
            }
            rows.add(rowMap)
        }

        //PRINT IN JSON FORMAT
//        log.info JsonOutput.prettyPrint((JsonOutput.toJson(rows)));

        //PRINT EACH ROW IN NEW LINE
//        rows.each{
//            log.info it
//        }
        row1
        return rows
    }

    def printTableInfo(table, dataSource_aim){
        log.info "AIMDAO PRINT COLUMN INFO ABOUT TABLE: $table";

        Sql aimsql = new Sql(dataSource_aim)
        def meta;
        aimsql.eachRow("SELECT  top 1   * \n" +
                "FROM         $table") {

            meta = it.getMetaData();
            it.toRowResult().eachWithIndex { rowItem, index ->
                log.info "$rowItem.key: $rowItem.value (${meta.getColumnTypeName(index+1)}(${meta.getColumnDisplaySize(index+1)}))" +
                        "[${meta.isNullable(index+1) == 1 ? "Nullable" : "Cannot be Null"}] ";
//                log.info meta.getColumnName(index+1)
//                log.info meta.getColumnTypeName(index+1)
//                log.info meta.getColumnDisplaySize(index+1)
//                log.info meta.isCurrency(index+1)
//                log.info meta.isNullable(index+1)
            }
        }
    }

    def selectAllFromTableWhereWithFormatting(table, where, dataSource_aim){
        log.info "AIMDAO SELECT * FROM $table WHERE $where"
        //RETURNS LIST of MAPS [:] OF {[COLUMN:VALUE],

        Sql aimsql = new Sql(dataSource_aim)
        def rowMap=[:]
        def rows =[];
        def meta;
        aimsql.eachRow("SELECT     * \n" +
                "FROM         $table \n" +
                "WHERE     $where") {

            meta = it.getMetaData();
            def colDataType;
            it.toRowResult().eachWithIndex { rowItem, index ->
                colDataType = meta.getColumnTypeName(index+1);
                if(colDataType.equalsIgnoreCase("varchar") || colDataType.equalsIgnoreCase("char") ||
                        colDataType.equalsIgnoreCase("text") ){
                    rowMap[rowItem.key] = "'$rowItem.value'";
//                    log.info colDataType
//                    log.info rowMap[rowItem.key]
                }
                else if(colDataType.equalsIgnoreCase("money")){
                    if(rowItem.value == null){
                        rowMap[rowItem.key] = "''";

                    }
                    else{
                        rowMap[rowItem.key] = "'$rowItem.value'";
                    }
                }
                else if(colDataType.equalsIgnoreCase("datetime")){
                    def d = "$rowItem.value"
                    log.info colDataType
                    "$rowItem.value"

                    def string
                    log.info d.split(" ").size()
                    if(rowItem.value == null){
                        string = ""
                    }  
                    else if(d.split(" ").size()>1){
                        string = d.split(" ")[0].replace("-","") + " " + d.split(" ")[1];
                    }
                    else{
                        string = "$rowItem.value"
                    }
                    rowMap[rowItem.key] = "'$string'";

                }

                else{
                    log.info colDataType
                    rowMap[rowItem.key] = rowItem.value;
                }

            }
            rows.add(rowMap)
        }

        //PRINT IN JSON FORMAT
        //log.info JsonOutput.prettyPrint((JsonOutput.toJson(rows)));

        //PRINT EACH ROW IN NEW LINE
        /*
        rows.each{
            log.info it
        }
         */

        return rows
    }
}