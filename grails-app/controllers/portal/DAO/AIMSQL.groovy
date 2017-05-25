package portal.DAO

import grails.util.Environment
import grails.util.Holders
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
                          MarketID:"'RM0039'",
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
                       Note: "'${notesFormatted.replaceAll("'","''")}'",
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

        if(allQuoteIDs.endsWith(",")){
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


        insuredID = getKeyField("ReferenceID", aimsql)
//        aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
//            insuredID = num
//        }


        def now = new Date()
        def timestamp = now.format(dateFormat, timeZone)

        ///////SAVE INSURED
        def tempMap = [InsuredID:"'${insuredID}'",
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

        def map = cleanSQLMap(tempMap, "Insured", dataSource_aim)



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

            tempMap = [QuoteID: "'${quoteID}'",
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

            def versionMap = cleanSQLMap(tempMap, "Version", dataSource_aim)
            
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
                    "($versionMap.QuoteID, $versionMap.VerOriginal, $versionMap.Version, $versionMap.Financed, $versionMap.Taxed, $versionMap.Brokerage, $versionMap.Indicator, $versionMap.DirectBillFlag, $versionMap.ProposedTerm, $versionMap.UnderLyingCoverage, " +
                    "$versionMap.PolicyTerm, $versionMap.VersionID, $versionMap.CompanyID, $versionMap.ProductID, $versionMap.Premium, $versionMap.Quoted, $versionMap.Limits, $versionMap.Subject, $versionMap.Endorsement, $versionMap.MEP, $versionMap.Rate, $versionMap.GrossComm, $versionMap.AgentComm, $versionMap.Deductible, " +
                    "$versionMap.CoInsure, $versionMap.StatusID, $versionMap.MarketID, $versionMap.Tax1, $versionMap.Tax2, $versionMap.Tax3, $versionMap.Tax4, $versionMap.FormID, $versionMap.RateInfo, $versionMap.CommPaid, $versionMap.ProposedEffective, $versionMap.ProposedExpiration, $versionMap.TaxDistrib, " +
                    "$versionMap.DeductType, $versionMap.LOB_Limit1, $versionMap.LOB_Limit2, $versionMap.LOB_Limit3, $versionMap.LOB_Limit4, $versionMap.LOB_Limit5, $versionMap.LOB_Limit6, $versionMap.LOB_Deduct1, $versionMap.LOB_Deduct2, $versionMap.LOB_Limit1Value, $versionMap.LOB_Limit2Value, " +
                    "$versionMap.LOB_Limit3Value, $versionMap.LOB_Limit4Value, $versionMap.LOB_Limit5Value, $versionMap.LOB_Limit6Value, $versionMap.LOB_Deduct1Value, $versionMap.LOB_Deduct2Value, $versionMap.TerrorActStatus, $versionMap.FlagOverrideCalc, " +
                    "$versionMap.TerrorTaxes, $versionMap.FlagMultiOption, $versionMap.LOB_Coverage1, $versionMap.LOB_Coverage2, $versionMap.LOB_Coverage3, $versionMap.LOB_Coverage4, $versionMap.LOB_Coverage5, $versionMap.LOB_Coverage6, $versionMap.LOB_DeductType1, $versionMap.LOB_DeductType2, " +
                    "$versionMap.TaxwoTRIA1, $versionMap.TaxwoTRIA2, $versionMap.TaxwoTRIA3, $versionMap.TaxwoTRIA4, $versionMap.LOB_Coverage7, $versionMap.LOB_Coverage8, $versionMap.LOB_Limit7, $versionMap.LOB_Limit8, $versionMap.LOB_Limit7Value, $versionMap.LOB_Limit8Value, $versionMap.PremiumProperty, " +
                    "$versionMap.PremiumLiability, $versionMap.PremiumOther, $versionMap.Tax1Name, $versionMap.Tax2Name, $versionMap.Tax3Name, $versionMap.Tax4Name, $versionMap.AgentDeposit, $versionMap.TaxwoTRIA5, $versionMap.Tax5, $versionMap.Tax5Name, $versionMap.LOB_Coverage9, $versionMap.LOB_Limit9, $versionMap.LOB_Limit9Value, " +
                    "$versionMap.TaxwoTRIA6, $versionMap.Tax6Name, $versionMap.TaxwoTRIA7, $versionMap.Tax7Name, $versionMap.TaxwoTRIA8, $versionMap.Tax8Name, $versionMap.Tax6, $versionMap.Tax7, $versionMap.Tax8, $versionMap.InsuredDeposit, $versionMap.AgentDepositwoTRIA, $versionMap.InsuredDepositwoTRIA," +
                    "$versionMap.Non_Premium, $versionMap.NonTax_Premium, $versionMap.FlagFeeCalc, $versionMap.TaxesPaidBy, $versionMap.TaxesPaidByID, $versionMap.FeeSchedule, $versionMap.PremDistrib, $versionMap.LobDistribSched, $versionMap.LobDistrib, $versionMap.ReferenceKey_FK)"

            log.info("Testing Step = " + testjson.getAt("totalBudgetConfirm"))

            def totalBudget = Double.parseDouble(testjson.getAt("totalBudgetConfirm").replaceAll('[$,]', ''));
            log.info("Testing Step1")

            tempMap = [QuoteID: "'${quoteID}'",
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

            def quotemap = cleanSQLMap(tempMap, "Quote", dataSource_aim)

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
            tempMap = [ReferenceID: "'${quoteID}'",
                           UserID:"'web'",
                           DateTime: "'${timestamp}'",
                           Subject: "'Underwriter Questions'",
                           Note: "'${notesFormatted.replaceAll("'","''")}'",
                           PurgeDate: 'NULL',
                           StatusID: 'NULL',
                           AlternateRefID: 'NULL',
                           DateAddedTo: 'NULL',
                           AddedByUserID: 'NULL']

            def noteMap = cleanSQLMap(tempMap, "Notes", dataSource_aim)


            aimsql.execute "INSERT INTO dbo.Notes (ReferenceID, UserID, DateTime, Subject, Note, PurgeDate, StatusID, AlternateRefID, DateAddedTo, \n" +
                    "AddedByUserID) values " +
                    "($noteMap.ReferenceID ,$noteMap.UserID , $noteMap.DateTime, $noteMap.Subject ,$noteMap.Note ,$noteMap.PurgeDate ,$noteMap.StatusID ,$noteMap.AlternateRefID," +
                    "$noteMap.DateAddedTo ,$noteMap.AddedByUserID)"

            tempMap = [QuoteID: "'${quoteID}'"]

            def taaQuoteMap = cleanSQLMap(tempMap, "taaQuoteActivity", dataSource_aim)

            aimsql.execute "INSERT INTO dbo.taaQuoteActivity (QuoteID) VALUES (${quoteID})"

            aimsql.execute "INSERT INTO dbo.taaQuoteExtendedDetail (QuoteID) VALUES(${quoteID})"

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
        log.info "SQL: " + "{call dbo.spGetPolicyRegister('$p1', '$p2', '$p3', '$p4', '$p5', $p6, '$p7', ${Sql.ALL_RESULT_SETS})}"
//        def rows = aimsql.callWithAllRows("{call dbo.spGetPolicyRegister('$p1', '$p2', '$p3', '$p4', '$p5', $p6, '$p7', ${Sql.ALL_RESULT_SETS})}") { num ->
//            log.info "ReferenceID $num"
//        }
        def rows = aimsql.callWithAllRows("{call dbo.spGetPolicyRegister('$p1', '$p2', '$p3', '$p4', '$p5', $p6, '$p7')}"){ dwells ->
            log.info "dwells: " + dwells
        }

//      List rows = aimsql.rows("{call dbo.spGetPolicyRegister('$p1', '$p2', '$p3', '$p4', '$p5', $p6, '$p7', ${Sql.ALL_RESULT_SETS})}")

        log.info rows
        log.info rows.size()
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

    def bind(params, dataMap, dataSource_aim) {
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

        aimsql.eachRow("SELECT     * \n" +
                "FROM         Control WITH (NOLOCK)") {
            log.info "Control: " + it
        }*/
        //****************************************************************************************************************

        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        //EXEC spGetBinderNumber '0623193', 'CA', 'Y', '00', 'NESF16-005', '3/2/2017'
        /*
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
        */
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
            /*
            aimsql.eachRow("SELECT     TransDecript\n" +
                    "FROM         Status WITH (NOLOCK)\n" +
                    "WHERE     (StatusID = 'BND')") {
                log.info "Status: " + it
            }
            */
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            aimsql.eachRow("SELECT     COUNT(DocumentID) AS Expr1\n" +
                    "FROM         [Document] WITH (NOLOCK)\n" +
                    "WHERE     (DocumentID = 'BINDERF')") {
                log.info "Document: " + it
            }
            */
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            aimsql.eachRow("SELECT     DocumentID, TypeID, Description, Comments, DataSet, FlagCrystalReport, StatusID, RTF, DefaultDays, SuspenseTypeID, DefaultReasonID, DefaultActionID, \n" +
                    "                      DateBasisID, FlagAllowActivityEntryEdit, DefaultSuspToID, AttachName, TeamID, DivisionID, ActiveFlag, SecurityLvl, DocumentKey_PK, AddressFromID, AddressToID, \n" +
                    "                      FlagOfficeSpecific\n" +
                    "FROM         dvDocumentTemplate\n" +
                    "WHERE     (DocumentID = 'BINDER')") {
                log.info "dvDocumentTemplate (Binder): " + it
            }
            */
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            aimsql.eachRow("SELECT     DocumentID, TypeID, Description, Comments, DataSet, FlagCrystalReport, StatusID, RTF, DefaultDays, SuspenseTypeID, DefaultReasonID, DefaultActionID, \n" +
                    "                      DateBasisID, FlagAllowActivityEntryEdit, DefaultSuspToID, AttachName, TeamID, DivisionID, ActiveFlag, SecurityLvl, DocumentKey_PK, AddressFromID, AddressToID, \n" +
                    "                      FlagOfficeSpecific\n" +
                    "FROM         dvDocumentTemplate\n" +
                    "WHERE     (DocumentID = '00_BINDER')") {
                log.info "dvDocumentTemplate (00_Binder): " + it
            }
            */
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            aimsql.eachRow("SELECT     DocumentID, TypeID, Description, Comments, DataSet, FlagCrystalReport, StatusID, RTF, DefaultDays, SuspenseTypeID, DefaultReasonID, DefaultActionID, \n" +
                    "                      DateBasisID, FlagAllowActivityEntryEdit, DefaultSuspToID, AttachName, TeamID, DivisionID, ActiveFlag, SecurityLvl, DocumentKey_PK, AddressFromID, AddressToID, \n" +
                    "                      FlagOfficeSpecific\n" +
                    "FROM         dvDocumentTemplate\n" +
                    "WHERE     (DocumentID = 'BINDER')") {
                log.info "dvDocumentTemplate (Binder): " + it

            }
            */
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
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
            */
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            aimsql.eachRow("SELECT     FlagAttachTaxAffidavit\n" +
                    "FROM         Control WITH (NOLOCK)") {
                log.info "Control: " + it
            }
            */
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            p1 = quoteContactID
            p2 = "AGT" //CAN'T TELL IF THIS IS CONSTANT OR BEING PULLED
            p3 = producerID
            log.info quoteContactID
            log.info producerID
            def getRecipientDataRows = aimsql.callWithRows("{call dbo.spGetRecipientData('$p1', '$p2', '$p3')}") { num ->
                log.info "RecipientData: $num"
            }
            log.info "getRecipientDataRows: " + getRecipientDataRows
            */
            //****************************************************************************************************************

            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            p1 = acctExec
            p2 = "EXC" //CAN'T TELL IF THIS IS CONSTANT OR BEING PULLED
            def getSenderDataRows = aimsql.callWithRows("{call dbo.spGetSenderData( '$p1', '$p2')}") { num ->
                log.info "SenderData: $num"
            }
            log.info getSenderDataRows
            */
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//          exec dbo.lkpCommonData_v1  @CompanyID='RM0057',@MarketID='SAFELL',@QuoteID='0623191',@productID='EPKG37',@producerID='TVD',
//          @UserID='web',@Premium=$5750.0000,@Fees=$15.0000,@Taxes=$184.0000,@GrossComm=28,@AgentComm=15,@CedingCompanyID=NULL
            /*
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
            */
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//          set @p4=29828
//          exec dbo.ImagePost1  @origID=NULL,@img=0x7B5C727466315C616E73695C64656,@att=NULL,@newID=@p4 output,@Update=NULL,@ReferenceID=91265,@Type='B',@Version=NULL,@DocumentID='BINDER'
            p1 = null //@origID
            p2 = 23333443 //Binary data for Image file
            p3 = null //@att
            p4 = null //@imageID
            p5 = null //@Update
            p6 = 91265 //@ReferenceID
            p7 = 'B' //@Type
            p8 = null //@Version
            p9 = "Binder" //@DocumentID

            def imagePost1 = aimsql.callWithRows("{call dbo.imagePost1('$p1', '$p2', '$p3', ${Sql.ALL_RESULT_SETS}, '$p5', '$p6', " +
                    "'$p7', '$p8', '$p9')}") { num ->
                log.info "New ImageID $num"
            }
            log.info "imagePost1: " + imagePost1
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
//          exec dbo.AddTransaction  @ReferenceID='0623191',@UserID='web',@Description='Coverage bound on version A',@Date='2017-03-02 05:31:44:157',
//          @StatusID='BND',@ImageID=NULL,@TypeID=NULL,@QuoteVersion='A',@ToNameKey=0,@DocTemplateID=NULL,@AttachmentIcon=0,@SourceDateTime='1899-12-30 00:00:00:000'
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
            log.info "addTransactionRows: " + addTransactionRows
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            /*
            aimsql.eachRow("SELECT     TransDecript\n" +
                    "FROM         Status WITH (NOLOCK)\n" +
                    "WHERE     (StatusID = 'BPF')") {
                log.info "Status: " + it
            }
            */
            //****************************************************************************************************************


            ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
            now = new Date();
            def  policy_timestamp = now.format(dateFormat, timeZone);
            policy_timestamp = policy_timestamp.split(" ")[0].replace("-", "") + " " + "00:00:00.000"
            log.info policy_timestamp

            now = new Date();
            def aimTrans_timestamp = now.format(dateFormat, timeZone);

            aimsql.execute("INSERT INTO dbo.Policy (QuoteID ,PolicyID ,PolicyKey_PK ,Version ,Effective ,Expiration ,Inception ," +
                    "Term ,Bound ,StatusID ,Endorsement ,PolicySource ,CompanyID ,ProductID ,EffectiveTime ,ActivePolicyFlag ,AIM_TransDate ," +
                    "PolicyGroupKey_FK ,AccountKey_FK ,PremiumWritten ,PremiumTerm ,FlagInspectionRequired ,FlagOverrideServiceUW ,DefaultBillingType )  " +
                    "VALUES ('$params.aimQuoteID', '$params.policyNumber', $params.policyKeyID, '0', '$proposedEffective', '$proposedExpiration', '$policy_timestamp', $proposedTerm, " +
                    "'$policy_timestamp', 'PIF', '1', 'R', '$companyID', '$productID', '12:01 AM', 'Y', '$aimTrans_timestamp', $params.policyKeyID, $version_referenceKeyID, " +
                    "convert(money,'$premium'), convert(money,'$premium'), 'N', 'N', 'AB')")
            log.info "Rows Updated (Insert into Policy): " + aimsql.getUpdateCount()
            //****************************************************************************************************************

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


            def quotenow = new Date();
            log.info quotenow
            def quotetimestamp = quotenow.format(dateFormat, timeZone);
            quotetimestamp = quotetimestamp.split(" ")[0].replace("-", "") + " " + "00:00:00.000"
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
            declare @p1 int
            set @p1=510642
            exec dbo.spAddSuspense  @SuspenseID=@p1 output,@ReferenceID='0623191',@AlternateID='NESF16-006',@ReasonID='ISS',@UserID='jason',@SuspendedByID='web',
            @TypeID='F',@TeamID='01',@DateEntered='2017-03-02 00:00:00:000',@SuspenseDate='2017-03-02 00:00:00:000',@Comments=NULL
            select @p1
            */
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
//          EXEC spComputeDueDates 'TVD', 'SAFELL', '01', '3/2/2017', '0623191'
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
//          EXEC spGetRemitToAddress '01'
            p1 = teamID

            def spGetRemitToAddressRows = aimsql.callWithRows("{call dbo.spGetRemitToAddress('$p1')}") { num ->
                log.info "spGetRemitToAddress $num"
            }
            log.info "spGetRemitToAddressRows: " + spGetRemitToAddressRows
            //****************************************************************************************************************
        }

    }

    def invoice(){

        /*****************************************************************************************************************
         Inserting Invoice
         ******************************************************************************************************************/


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
         declare @p1 int
        set @p1=513029
        exec dbo.spAddSuspense  @SuspenseID=@p1 output,@ReferenceID='0623945',@AlternateID='NEBF16-017',@ReasonID='ISS',@UserID='jason',@SuspendedByID='web',@TypeID='F',@TeamID='01',@DateEntered='2017-05-22 00:00:00:000',@SuspenseDate='2017-05-22 00:00:00:000',@Comments=NULL
        select @p1
         */
        /*
        EXEC spInvCheckInvoiceStatus '0623945', 0
        //GETS THE NUMBER OF INVOICES ASSOCIATED WITH THIS QUOTE ID
        */
        p1 = params.aimQuoteID
        p2 = 0 //Endorse Key
        aimsql.call("{call dbo.spInvCheckInvoiceStatus('$p1', $p2)}") { num ->
            log.info "Checking Invoice Status: $num"
        }
        //****************************************************************************************************************


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        declare @p1 int
        set @p1=93109 -> InvoiceKey_PK in InvoiceHeader table
        exec dbo.GetKeyField  @KeyValue=@p1 output,@FieldName='ReferenceID'
        select @p1
        RETURNS THE InvoiceKey_PK to be inserted into the InvoiceHeaderTable
        */
        p1 = ""
        p2 = "ReferenceID" //Endorse Key
        def invoiceKey = 0;
        aimsql.call("{call dbo.GetKeyField('$p1', '$p2')}") { num ->
            log.info "InvoiceKey_PK: $num"
            invoiceKey = num;
        }
        //****************************************************************************************************************


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        EXEC spComputeDueDates 'TVD', 'SAFELL', '01', '5/16/2017', '0623945
        */
        p1 = producerID //ProducerID
        p2 = marketID //MarketID
        p3 = teamID //TeamID
        p4 = effective //EffectiveDate
        p5 = params.aimQuoteID //QuoteID
        def spComputeDueDates = aimsql.call("{call dbo.spComputeDueDates('$p1', '$p2', '$p3', '$p4', '$p5')}") { num ->
            log.info "spComputeDueDates: $num"
        }
        log.info "spComputeDueDatesRows: $spComputeDueDates"
        //****************************************************************************************************************


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        exec dbo.spCreatePremiumAllocation  @QuoteID='0623945',@InvoiceKey=93109,@EndorsementKey=0,@Premium=$1128.0000
         */
        p1 = params.aimQuoteID //QuoteID
        // producerID //ProducerID
        p2 = marketID //MarketID
        p3 = teamID //TeamID
        p4 = effective //EffectiveDate
        aimsql.call("{call dbo.spCreatePremiumAllocation('$p1', '$p2', '$p3', '$p4', '$p5')}") { num ->
            log.info "spCreatePremiumAllocation: $num"
        }
        //****************************************************************************************************************


        ///////////////////////////////////////////////////////SQL/////////////////////////////////////////////////////////
        /*
        EXEC spGetRemitToAddress '01'
         */
        p1 = teamID //QuoteID
        def spGetRemitAddressRows = aimsql.call("{call dbo.spGetRemitToAddress('$p1')}") { num ->
            log.info "spGetRemitToAddress: $num"
        }
        log.info "spGetRemitAddressRows: $spGetRemitAddressRows"
        //****************************************************************************************************************


        /*
        declare @p1 int
        set @p1=3200681
        exec dbo.GetKeyField  @KeyValue=@p1 output,@FieldName='RecordKey'
        select @p1
         */

        /*
        declare @p1 int
        set @p1=3200682
        exec dbo.GetKeyField  @KeyValue=@p1 output,@FieldName='RecordKey'
        select @p1
         */

        /*
        declare @p1 int
        set @p1=3200683
        exec dbo.GetKeyField  @KeyValue=@p1 output,@FieldName='RecordKey'
        select @p1
         */

        /*
        declare @p1 int
        set @p1=3200684
        exec dbo.GetKeyField  @KeyValue=@p1 output,@FieldName='RecordKey'
        select @p1
         */


        //////////////////////////////// GETTING TAXES /////////////////////////////////////////////////////////
        def taxString = "";
        def taxCodes = [:];
        aimsql.eachRow("SELECT     TransCode, TransTypeID, Description, FlatAmount_Flag, Rate, CollectedBy, AllowOverRide, State, FlagUserSelected, AP_AccountID, IncludeFees, RoundingRule, \n" +
                "RecordKey_PK, PremiumBasis, BasisSection, FlatRateFlag, TaxValue, TaxCodeID, FlagFullyEarned, FlagPolicyOnly, TaxRate, MinAmount, MaxAmount, AppliesTo, \n" +
                "CompanyID, Municipality\n" +
                "FROM      dvTaxTable with (NOLOCK)\n" +
                "WHERE     (State LIKE '${params.state}') AND (ISNULL(Municipality, '') = '') OR\n" +
                "           (State LIKE '${params.state}') AND (Municipality = '')\n" +
                "ORDER BY Description") {
            taxCodes["${it.TransCode}"] =  it.Description;
        }

        def taxMap = [:]
        aimsql.eachRow("SELECT     State, TaxValue, FlatRateFlag, Effective, Expiration, IncludeFees, PK_TaxID, CountyID, TaxCodeID, CompanyID, TaxValueNew, CollectedBy, PaidTo, AllowOverRide, \n" +
                "RoundingRule, TaxLine, TaxPercentange, CoverageID_Old, TaxPercentage, StateName, DateAdded, CreatedByID, SystemReq, RecordKey_PK, CoverageID, \n" +
                "FlagPolicyOnly, AdmittedTax, FlagFullyEarned, ZipCodeStart, ZipCodeEnd, FlagUserSelected, MinAmount, MaxAmount, PremiumBasis, BasisSection, \n" +
                "FlagNonResidentTax, AppliesTo, ExcludeTRIA, FlagUseEndorsementDate, Municipality, ExemptInsuredTax\n" +
                "FROM       TaxTable WITH (NOLOCK)\n" +
                "WHERE     (State = '${params.state}') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AppliesTo, 'ALL') = 'ALL') AND (ISNULL(AdmittedTax, 'N') = 'N') AND \n" +
                "(ISNULL(ExemptInsuredTax, 'N') = 'N') OR\n" +
                "(State = '${params.state}') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AdmittedTax, 'N') = 'N') AND (ISNULL(ExemptInsuredTax, 'N') = 'N') AND \n" +
                "(AppliesTo = 'RES')\n" +
                "ORDER BY TaxLine, SUBSTRING(CoverageID, 1, 25)") {
            def taxDescription = taxCodes["${it.TaxCodeID}"];
            taxString = taxString + it.TaxCodeID + "&,&" + taxDescription + "&,&" + it.TaxValue +  "&;;&";
        }
        log.info "TAX STRING ==== " +taxString
        //****************************************************************************************************************

        /*
        declare @p1 int
        set @p1=15757
        exec dbo.GetKeyField  @KeyValue=@p1 output,@FieldName='InvoiceID'
        select @p1
        */
        p1 = ""
        p2 = "InvoiceID" //FieldName
        def invoiceID = 0;

        aimsql.call("{call dbo.GetKeyField('$p1', '$p2')}") { num ->
            log.info "InvoiceID: $num"
            invoiceID = num;
        }

        /*
        insert into InvoiceDetail
          (InvoiceKey_FK, InvoiceDetailKey_PK, InvoiceID, LineTypeID, TransCd,
           Description, Amount, GrossComm, AgentComm, Revenue_Amt, Expense_Amt,
           AP_Amt, AR_Amt, RevenueFee_Amt, CollectedBy, PayableID, CoverageID,
           ComputeAgtComm, ComputeAgyComm, MarketID, ContractID, DBCommExp_Amt,
           FlagManualEdit, FlagSplitPayable, SplitLineKey_FK, PaidAmount, TermPremium,
           FlagAdjustment, MinimumPremium, MEP, PayToCode, RiskCompanyID, BasisAmount,
           LimitsValue, Limits, Deductible, DeductibleValue, LineKey_FK, DateReported,
           FlagSuppressReport, TaxRate)
        values
          (93109, 1, NULL, 'P', 'NBS',
           'Entertainment Package', 1128.0, 28.0, 15.0, 315.84, 169.2,
           812.16, 958.8, NULL, 'C', 'SAFELL', 'EPKG',
           'Y', NULL, 'SAFELL', '', NULL,
           NULL, NULL, NULL, NULL, 1128.0,
           NULL, NULL, '', 'SAFELL', 'RM0057',
           1128.0, NULL, NULL, NULL, NULL,
           0, NULL, NULL, NULL)
        */
        def premDistArray = params.premiumDistString.split("&;&");

        for(def c=0; c < premDistArray; c++){
            def invoiceDetailMap = [
                    InvoiceKey_FK: invoiceKey,
                    InvoiceDetailKey_PK: c,
                    InvoiceID: "NULL",
                    LineTypeID: dataMap.LineTypeID,
                    TransCd: dataMap.TransCd,
                    Description: dataMap.Description,
                    Amount: dataMap.Amount,
                    GrossComm: "",
                    AgentComm: "",
                    Revenue_Amt: "",
                    Expense_Amt: "",
                    AP_Amt: "",
                    AR_Amt: "",
                    RevenueFee_Amt: "",
                    CollectedBy: "",
                    PayableID: "",
                    CoverageID: "",
                    ComputeAgtComm: "",
                    ComputeAgyComm: "",
                    MarketID: "",
                    ContractID: "",
                    DBCommExp_Amt: "",
                    FlagManualEdit: "",
                    FlagSplitPayable: "",
                    SplitLineKey_FK: "",
                    PaidAmount: "",
                    TermPremium: "",
                    FlagAdjustment: "",
                    MinimumPremium: "",
                    MEP: "",
                    PayToCode: "",
                    RiskCompanyID: "",
                    BasisAmount: "",
                    LimitsValue: "",
                    Limits: "",
                    Deductible: "",
                    DeductibleValue: "",
                    LineKey_FK: "",
                    DateReported: "",
                    FlagSuppressReport: "",
                    TaxRate: ""
            ]


            aimsql.execute("insert into InvoiceDetail\n" +
                    "(InvoiceKey_FK, InvoiceDetailKey_PK, InvoiceID, LineTypeID, TransCd,\n" +
                    " Description, Amount, GrossComm, AgentComm, Revenue_Amt, Expense_Amt,\n" +
                    " AP_Amt, AR_Amt, RevenueFee_Amt, CollectedBy, PayableID, CoverageID,\n" +
                    " ComputeAgtComm, ComputeAgyComm, MarketID, ContractID, DBCommExp_Amt,\n" +
                    " FlagManualEdit, FlagSplitPayable, SplitLineKey_FK, PaidAmount, TermPremium,\n" +
                    " FlagAdjustment, MinimumPremium, MEP, PayToCode, RiskCompanyID, BasisAmount,\n" +
                    " LimitsValue, Limits, Deductible, DeductibleValue, LineKey_FK, DateReported,\n" +
                    " FlagSuppressReport, TaxRate) " +
                    "VALUES ('$invoiceDetailMap.InvoiceKey_FK', '$invoiceDetailMap.InvoiceDetailKey_PK', '$invoiceDetailMap.InvoiceID', '$invoiceDetailMap.LineTypeID', '$invoiceDetailMap.TransCd', \n" +
                    "'$invoiceDetailMap.Description', '$invoiceDetailMap.Amount', '$invoiceDetailMap.GrossComm', '$invoiceDetailMap.AgentComm', '$invoiceDetailMap.Revenue_Amt', '$invoiceDetailMap.Expense_Amt', \n" +
                    "'$invoiceDetailMap.AP_Amt', '$invoiceDetailMap.AR_Amt', '$invoiceDetailMap.RevenueFee_Amt', '$invoiceDetailMap.CollectedBy', '$invoiceDetailMap.PayableID', '$invoiceDetailMap.CoverageID', \n" +
                    "'$invoiceDetailMap.ComputeAgtComm', '$invoiceDetailMap.ComputeAgyComm', '$invoiceDetailMap.MarketID', '$invoiceDetailMap.ContractID', '$invoiceDetailMap.DBCommExp_Amt', \n" +
                    "'$invoiceDetailMap.FlagManualEdit', '$invoiceDetailMap.FlagSplitPayable', '$invoiceDetailMap.SplitLineKey_FK', '$invoiceDetailMap.PaidAmount', '$invoiceDetailMap.TermPremium', \n" +
                    "'$invoiceDetailMap.FlagAdjustment', '$invoiceDetailMap.MinimumPremium', '$invoiceDetailMap.MEP', '$invoiceDetailMap.PayToCode', '$invoiceDetailMap.RiskCompanyID', '$invoiceDetailMap.BasisAmount', \n" +
                    "'$invoiceDetailMap.LimitsValue', '$invoiceDetailMap.Limits', '$invoiceDetailMap.Deductible', '$invoiceDetailMap.DeductibleValue', '$invoiceDetailMap.LineKey_FK', '$invoiceDetailMap.DateReported', \n" +
                    "'$invoiceDetailMap.FlagSuppressReport', '$invoiceDetailMap.TaxRate)")
            log.info "Rows Updated (Insert into InvoiceDetail): " + aimsql.getUpdateCount()


        }


        /*
           insert into InvoiceDetail
          (InvoiceKey_FK, InvoiceDetailKey_PK, InvoiceID, LineTypeID, TransCd,
           Description, Amount, GrossComm, AgentComm, Revenue_Amt, Expense_Amt,
           AP_Amt, AR_Amt, RevenueFee_Amt, CollectedBy, PayableID, CoverageID,
           ComputeAgtComm, ComputeAgyComm, MarketID, ContractID, DBCommExp_Amt,
           FlagManualEdit, FlagSplitPayable, SplitLineKey_FK, PaidAmount, TermPremium,
           FlagAdjustment, MinimumPremium, MEP, PayToCode, RiskCompanyID, BasisAmount,
           LimitsValue, Limits, Deductible, DeductibleValue, LineKey_FK, DateReported,
           FlagSuppressReport, TaxRate)
        values
          (93109, 2, NULL, 'F', 'FEE',
           'Policy Fee', 15.0, 100.0, NULL, 15.0, NULL,
           0.0, 15.0, 15.0, 'A', '00', 'EPKG',
           'Y', NULL, '00', '', NULL,
           NULL, NULL, NULL, NULL, NULL,
           NULL, NULL, NULL, '00', 'RM0057',
           15.0, NULL, NULL, NULL, NULL,
           0, NULL, NULL, NULL)

        insert into InvoiceDetail
          (InvoiceKey_FK, InvoiceDetailKey_PK, InvoiceID, LineTypeID, TransCd,
           Description, Amount, GrossComm, AgentComm, Revenue_Amt, Expense_Amt,
           AP_Amt, AR_Amt, RevenueFee_Amt, CollectedBy, PayableID, CoverageID,
           ComputeAgtComm, ComputeAgyComm, MarketID, ContractID, DBCommExp_Amt,
           FlagManualEdit, FlagSplitPayable, SplitLineKey_FK, PaidAmount, TermPremium,
           FlagAdjustment, MinimumPremium, MEP, PayToCode, RiskCompanyID, BasisAmount,
           LimitsValue, Limits, Deductible, DeductibleValue, LineKey_FK, DateReported,
           FlagSuppressReport, TaxRate)
        values
          (93109, 3, NULL, 'T', 'SLT',
           'Surplus Lines Tax', 33.84, NULL, NULL, NULL, NULL,
           33.84, 33.84, NULL, 'A', 'CADOI', 'EPKG',
           'Y', NULL, 'CADOI', '', NULL,
           NULL, NULL, NULL, NULL, NULL,
           NULL, NULL, NULL, 'CADOI', 'CADOI',
           33.84, NULL, NULL, NULL, NULL,
           0, NULL, NULL, 0.03)

         insert into InvoiceDetail
          (InvoiceKey_FK, InvoiceDetailKey_PK, InvoiceID, LineTypeID, TransCd,
           Description, Amount, GrossComm, AgentComm, Revenue_Amt, Expense_Amt,
           AP_Amt, AR_Amt, RevenueFee_Amt, CollectedBy, PayableID, CoverageID,
           ComputeAgtComm, ComputeAgyComm, MarketID, ContractID, DBCommExp_Amt,
           FlagManualEdit, FlagSplitPayable, SplitLineKey_FK, PaidAmount, TermPremium,
           FlagAdjustment, MinimumPremium, MEP, PayToCode, RiskCompanyID, BasisAmount,
           LimitsValue, Limits, Deductible, DeductibleValue, LineKey_FK, DateReported,
           FlagSuppressReport, TaxRate)
        values
          (93109, 4, NULL, 'T', 'SOF',
           'Stamping Office Fee', 2.26, NULL, NULL, NULL, NULL,
           2.26, 2.26, NULL, 'A', 'CA_SLA', 'EPKG',
           'Y', NULL, 'CA_SLA', '', NULL,
           NULL, NULL, NULL, NULL, NULL,
           NULL, NULL, NULL, 'CA_SLA', 'CA_SLA',
           2.26, NULL, NULL, NULL, NULL,
           0, NULL, NULL, 0.002)
         */



        /*
        insert into InvoiceHeader
          (InvoiceID, InvoiceKey_PK, QuoteID, PolicyKey_FK, Effective, ProducerID,BillingType, BillToCode, Premium, Non_Premium, Misc_Premium, NonTax_Premium,
           Tax1, Tax2, Tax3, Tax4, InvoiceTypeID, PolicyID, Description, TaxState,InvoiceTotal, BillToAddressID, PaymentToAddressID, MemoInvoiceFlag,
           OutStandingAmt, DirectBillFlag, InstallmentPlanID, DueDate, NumberOfPayments,TotalGrossComm, TotalAgentComm, TotalDue, TotalPayable, Note, GrossComm,
           AgentComm, CompanyCollectedFees, AgencyCollectedFees, TotalPremium,InstallmentID, PayableID, InstallmentFlag, Message, TaxPaidBy, Taxed,
           TaxesPaidByID, UserHoldFlag, CourtesyFilingID, DefaultPayableID, Ledger,ReversedFlag, PostDate, FrequencyID, IncludeAgentComm, IncludeCompanyFee,
           IncludeAgencyComm, IncludeAgencyFee, DownPercent, StatusID, InstallmentItem,Initial_InvoiceFlag, PayToCode, AcuityTargetCompanyID, InsuredID, TeamID,
           InvoicedByID, AcuityStatusID, InvoiceDate, OwnerKey_FK, InstallmentTotal,Address1, Address2, City, State, Zip, RemitAddress1, RemitAddress2,
           RemitCity, RemitState, RemitZip, InvTypeID, EndorsementKey_FK, ExportDate,HeldSuspenseKey, InvoiceTerms, InstallPayOOBFlag, AgencyCollectedTaxes,
           TotalFeeRevenue, TotalNetDueCompany, AccountingEffectiveDate, ReversedInvoiceKey,ExportStatusID, AcuityBatchKey, ProgramID, TotalInstallmentsDue, RiskLimits,
           RiskZip, RiskCounty, PaidByStatement, DownPaymentAmt, PayToDueDate,DateCreated, FinanceID, FlagFinanced, Endorsement, CompanyCollectedTaxes,
           TotalTaxes, FlagSplit, MarketID, ContractID, OtherTaxes, OtherExpense,AcctExec, CurrencyType, CurrencyAmount, ProductID, CoverageID, OwnerKey_SK,
           ZipPlus, TotalFeeExpense, TotalRevenue, DatePrinted, GLPeriod, FlagRebill,TotalPayments, TermPremium, MinimumPremium, ProcessBatchKey_FK, DivisionID,
           DateTaxesFiled, FlagMultiPremium, DatePremiumReported, AdmittedPremium,FlagOverrideComm, CommissionSplitKey_FK, ProductionSplitKey_FK, TotalAgentCommOnly,
           TotalAgentFeeTaxes, TotalAPCompany, TotalAPTax, TotalNetFeeRevenue,TotalNetComm, Expiration, TotalNetRevenue, TotalFees, FlagCourtesyFiler,
           FlagProductionSplit, SourcePremium, RebillInvoiceKey_FK, DownPaymentMemo,TotalBasisAmount, CompanyID, InvoicePostedByID, FlagSuppress, AggregateLimits)
        values
          ('015757', 93109, '0623945', 93108, '20170516 00:00:00.000', 'TVD','AB', 'TVD', 1128.0, 0.0, 0.0, 15.0,33.84, 2.26, 0.0, 0.0, 'NBS', 'NEBF16-017', 'New Business',
           'CA', 1179.1, 0, NULL, NULL,NULL, 'N', NULL, '20170601 00:00:00.000', NULL,315.84, 169.2, 1009.9, 848.26, '', 28.0,15.0, 0.0, 15.0, 1128.0,NULL, NULL, 'N', '', NULL,
           'Y', NULL, NULL, NULL, 'SAFELL',NULL, NULL, NULL, NULL, NULL,NULL, NULL, NULL, NULL,'P', NULL, NULL, NULL, '01','92975', '01', 'web', NULL, '20170522 00:00:00.000', NULL,NULL, '6767 Forest Lawn Drive, #301', '', 'Los Angeles', 'CA', '90068', '1611 S. Catalina Avenue, Suite 208',
           '', 'Redondo Beach', 'CA', '90277', NULL, NULL,NULL, NULL, 10, NULL, 36.1,15.0, 812.16, '20170522 00:00:00.000', NULL,NULL, NULL, NULL, NULL,NULL, NULL, NULL, 'N', NULL,
           '20170621 00:00:00.000', '20170522 16:48:53.770', NULL, 'N', NULL,0.0, 36.1, NULL, 'SAFELL', '',0.0, 0.0, 'jason', '', NULL,'PIP CHOI', 'EPKG', NULL, NULL, NULL, NULL,NULL, NULL, 'N', NULL, 1128.0,
           0.0, NULL, '00', NULL,'N', '20170522 00:00:00.000', 0.0, NULL,1, 0, 169.2,0.0, 812.16, NULL, 15.0,146.64, '20170615 00:00:00.000', NULL, 15.0, '',
           'N', 1128.0, NULL, NULL,1179.1, 'RM0057', NULL, NULL, 50000.0)
         */
        def invoiceHeaderMap = [
                InvoiceID: "",
                InvoiceKey_PK: "",
                QuoteID: "",
                PolicyKey_FK: "",
                Effective: "",
                ProducerID: "",
                BillingType: "",
                BillToCode: "",
                Premium: "",
                Non_Premium: "",
                Misc_Premium: "",
                NonTax_Premium: "",
                Tax1: "",
                Tax2: "",
                Tax3: "",
                Tax4: "",
                InvoiceTypeID: "",
                PolicyID: "",
                Description: "",
                TaxState: "",InvoiceTotal: "",
                BillToAddressID: "",
                PaymentToAddressID: "",
                MemoInvoiceFlag: "",
                OutStandingAmt: "",
                DirectBillFlag: "",
                InstallmentPlanID: "",
                DueDate: "",
                NumberOfPayments: "",TotalGrossComm: "",
                TotalAgentComm: "",
                TotalDue: "",
                TotalPayable: "",
                Note: "",
                GrossComm: "",
                AgentComm: "",
                CompanyCollectedFees: "",
                AgencyCollectedFees: "",
                TotalPremium: "",InstallmentID: "",
                PayableID: "",
                InstallmentFlag: "",
                Message: "",
                TaxPaidBy: "",
                Taxed: "",
                TaxesPaidByID: "",
                UserHoldFlag: "",
                CourtesyFilingID: "",
                DefaultPayableID: "",
                Ledger: "",ReversedFlag: "",
                PostDate: "",
                FrequencyID: "",
                IncludeAgentComm: "",
                IncludeCompanyFee: "",
                IncludeAgencyComm: "",
                IncludeAgencyFee: "",
                DownPercent: "",
                StatusID: "",
                InstallmentItem: "",Initial_InvoiceFlag: "",
                PayToCode: "",
                AcuityTargetCompanyID: "",
                InsuredID: "",
                TeamID: "",
                InvoicedByID: "",
                AcuityStatusID: "",
                InvoiceDate: "",
                OwnerKey_FK: "",
                InstallmentTotal: "",Address1: "",
                Address2: "",
                City: "",
                State: "",
                Zip: "",
                RemitAddress1: "",
                RemitAddress2: "",
                RemitCity: "",
                RemitState: "",
                RemitZip: "",
                InvTypeID: "",
                EndorsementKey_FK: "",
                ExportDate: "",HeldSuspenseKey: "",
                InvoiceTerms: "",
                InstallPayOOBFlag: "",
                AgencyCollectedTaxes: "",
                TotalFeeRevenue: "",
                TotalNetDueCompany: "",
                AccountingEffectiveDate: "",
                ReversedInvoiceKey: "",ExportStatusID: "",
                AcuityBatchKey: "",
                ProgramID: "",
                TotalInstallmentsDue: "",
                RiskLimits: "",
                RiskZip: "",
                RiskCounty: "",
                PaidByStatement: "",
                DownPaymentAmt: "",
                PayToDueDate: "",DateCreated: "",
                FinanceID: "",
                FlagFinanced: "",
                Endorsement: "",
                CompanyCollectedTaxes: "",
                TotalTaxes: "",
                FlagSplit: "",
                MarketID: "",
                ContractID: "",
                OtherTaxes: "",
                OtherExpense: "",AcctExec: "",
                CurrencyType: "",
                CurrencyAmount: "",
                ProductID: "",
                CoverageID: "",
                OwnerKey_SK: "",
                ZipPlus: "",
                TotalFeeExpense: "",
                TotalRevenue: "",
                DatePrinted: "",
                GLPeriod: "",
                FlagRebill: "",TotalPayments: "",
                TermPremium: "",
                MinimumPremium: "",
                ProcessBatchKey_FK: "",
                DivisionID: "",
                DateTaxesFiled: "",
                FlagMultiPremium: "",
                DatePremiumReported: "",
                AdmittedPremium: "",FlagOverrideComm: "",
                CommissionSplitKey_FK: "",
                ProductionSplitKey_FK: "",
                TotalAgentCommOnly: "",
                TotalAgentFeeTaxes: "",
                TotalAPCompany: "",
                TotalAPTax: "",
                TotalNetFeeRevenue: "",TotalNetComm: "",
                Expiration: "",
                TotalNetRevenue: "",
                TotalFees: "",
                FlagCourtesyFiler: "",
                FlagProductionSplit: "",
                SourcePremium: "",
                RebillInvoiceKey_FK: "",
                DownPaymentMemo: "",TotalBasisAmount: "",
                CompanyID: "",
                InvoicePostedByID: "",
                FlagSuppress: "",
                AggregateLimits: ""
        ]

//            aimsql.execute("insert into InvoiceHeader\n" +
//                    "(InvoiceID, InvoiceKey_PK, QuoteID, PolicyKey_FK, Effective, ProducerID,BillingType, BillToCode, Premium, Non_Premium, Misc_Premium, NonTax_Premium,\n" +
//                    "Tax1, Tax2, Tax3, Tax4, InvoiceTypeID, PolicyID, Description, TaxState,InvoiceTotal, BillToAddressID, PaymentToAddressID, MemoInvoiceFlag,\n" +
//                    "OutStandingAmt, DirectBillFlag, InstallmentPlanID, DueDate, NumberOfPayments,TotalGrossComm, TotalAgentComm, TotalDue, TotalPayable, Note, GrossComm,\n" +
//                    "AgentComm, CompanyCollectedFees, AgencyCollectedFees, TotalPremium,InstallmentID, PayableID, InstallmentFlag, Message, TaxPaidBy, Taxed,\n" +
//                    "TaxesPaidByID, UserHoldFlag, CourtesyFilingID, DefaultPayableID, Ledger,ReversedFlag, PostDate, FrequencyID, IncludeAgentComm, IncludeCompanyFee,\n" +
//                    "IncludeAgencyComm, IncludeAgencyFee, DownPercent, StatusID, InstallmentItem,Initial_InvoiceFlag, PayToCode, AcuityTargetCompanyID, InsuredID, TeamID,\n" +
//                    "InvoicedByID, AcuityStatusID, InvoiceDate, OwnerKey_FK, InstallmentTotal,Address1, Address2, City, State, Zip, RemitAddress1, RemitAddress2,\n" +
//                    "RemitCity, RemitState, RemitZip, InvTypeID, EndorsementKey_FK, ExportDate,HeldSuspenseKey, InvoiceTerms, InstallPayOOBFlag, AgencyCollectedTaxes,\n" +
//                    "TotalFeeRevenue, TotalNetDueCompany, AccountingEffectiveDate, ReversedInvoiceKey,ExportStatusID, AcuityBatchKey, ProgramID, TotalInstallmentsDue, RiskLimits,\n" +
//                    "RiskZip, RiskCounty, PaidByStatement, DownPaymentAmt, PayToDueDate,DateCreated, FinanceID, FlagFinanced, Endorsement, CompanyCollectedTaxes,\n" +
//                    "TotalTaxes, FlagSplit, MarketID, ContractID, OtherTaxes, OtherExpense,AcctExec, CurrencyType, CurrencyAmount, ProductID, CoverageID, OwnerKey_SK,\n" +
//                    "ZipPlus, TotalFeeExpense, TotalRevenue, DatePrinted, GLPeriod, FlagRebill,TotalPayments, TermPremium, MinimumPremium, ProcessBatchKey_FK, DivisionID,\n" +
//                    "DateTaxesFiled, FlagMultiPremium, DatePremiumReported, AdmittedPremium,FlagOverrideComm, CommissionSplitKey_FK, ProductionSplitKey_FK, TotalAgentCommOnly,\n" +
//                    "TotalAgentFeeTaxes, TotalAPCompany, TotalAPTax, TotalNetFeeRevenue,TotalNetComm, Expiration, TotalNetRevenue, TotalFees, FlagCourtesyFiler,\n" +
//                    "FlagProductionSplit, SourcePremium, RebillInvoiceKey_FK, DownPaymentMemo,TotalBasisAmount, CompanyID, InvoicePostedByID, FlagSuppress, AggregateLimits) \n" +
//                    "VALUES ('$invoiceHeaderMap.InvoiceID', '$invoiceHeaderMap.'$invoiceHeaderMap.InvoiceKey_PK', '$invoiceHeaderMap.QuoteID', '$invoiceHeaderMap.PolicyKey_FK', " +
//                    "'$invoiceHeaderMap.Effective', '$invoiceHeaderMap.ProducerID,BillingType', '$invoiceHeaderMap.BillToCode', '$invoiceHeaderMap.Premium', '$invoiceHeaderMap.Non_Premium', " +
//                    "'$invoiceHeaderMap.Misc_Premium', '$invoiceHeaderMap.NonTax_Premium', '$invoiceHeaderMap.Tax1', '$invoiceHeaderMap.Tax2', '$invoiceHeaderMap.Tax3', " +
//                    "'$invoiceHeaderMap.Tax4', '$invoiceHeaderMap.InvoiceTypeID', '$invoiceHeaderMap.PolicyID', '$invoiceHeaderMap.Description', " +
//                    "'$invoiceHeaderMap.TaxState,InvoiceTotal', '$invoiceHeaderMap.BillToAddressID', '$invoiceHeaderMap.PaymentToAddressID', " +
//                    "'$invoiceHeaderMap.MemoInvoiceFlag', '$invoiceHeaderMap.OutStandingAmt', '$invoiceHeaderMap.DirectBillFlag', '$invoiceHeaderMap.InstallmentPlanID', " +
//                    "'$invoiceHeaderMap.DueDate', '$invoiceHeaderMap.NumberOfPayments,TotalGrossComm', '$invoiceHeaderMap.TotalAgentComm', '$invoiceHeaderMap.TotalDue', " +
//                    "'$invoiceHeaderMap.TotalPayable', '$invoiceHeaderMap.Note', '$invoiceHeaderMap.GrossComm', '$invoiceHeaderMap.AgentComm', " +
//                    "'$invoiceHeaderMap.CompanyCollectedFees', '$invoiceHeaderMap.AgencyCollectedFees', '$invoiceHeaderMap.TotalPremium,InstallmentID', " +
//                    "'$invoiceHeaderMap.PayableID', '$invoiceHeaderMap.InstallmentFlag', '$invoiceHeaderMap.Message', '$invoiceHeaderMap.TaxPaidBy', " +
//                    "'$invoiceHeaderMap.Taxed', '$invoiceHeaderMap.TaxesPaidByID', '$invoiceHeaderMap.UserHoldFlag', '$invoiceHeaderMap.CourtesyFilingID', " +
//                    "'$invoiceHeaderMap.DefaultPayableID', '$invoiceHeaderMap.Ledger,ReversedFlag', '$invoiceHeaderMap.PostDate', '$invoiceHeaderMap.FrequencyID', " +
//                    "'$invoiceHeaderMap.IncludeAgentComm', '$invoiceHeaderMap.IncludeCompanyFee', '$invoiceHeaderMap.IncludeAgencyComm', '$invoiceHeaderMap.IncludeAgencyFee', " +
//                    "'$invoiceHeaderMap.DownPercent', '$invoiceHeaderMap.StatusID', '$invoiceHeaderMap.InstallmentItem,Initial_InvoiceFlag', '$invoiceHeaderMap.PayToCode', " +
//                    "'$invoiceHeaderMap.AcuityTargetCompanyID', '$invoiceHeaderMap.InsuredID', '$invoiceHeaderMap.TeamID', '$invoiceHeaderMap.InvoicedByID', " +
//                    "'$invoiceHeaderMap.AcuityStatusID', '$invoiceHeaderMap.InvoiceDate', '$invoiceHeaderMap.OwnerKey_FK', '$invoiceHeaderMap.InstallmentTotal,Address1', " +
//                    "'$invoiceHeaderMap.Address2', '$invoiceHeaderMap.City', '$invoiceHeaderMap.State', '$invoiceHeaderMap.Zip', '$invoiceHeaderMap.RemitAddress1', " +
//                    "'$invoiceHeaderMap.RemitAddress2', '$invoiceHeaderMap.RemitCity', '$invoiceHeaderMap.RemitState', '$invoiceHeaderMap.RemitZip', " +
//                    "'$invoiceHeaderMap.InvTypeID', '$invoiceHeaderMap.EndorsementKey_FK', '$invoiceHeaderMap.ExportDate,HeldSuspenseKey', " +
//                    "'$invoiceHeaderMap.InvoiceTerms', '$invoiceHeaderMap.InstallPayOOBFlag', '$invoiceHeaderMap.AgencyCollectedTaxes', " +
//                    "'$invoiceHeaderMap.TotalFeeRevenue', '$invoiceHeaderMap.TotalNetDueCompany', '$invoiceHeaderMap.AccountingEffectiveDate', " +
//                    "'$invoiceHeaderMap.ReversedInvoiceKey,ExportStatusID', '$invoiceHeaderMap.AcuityBatchKey', '$invoiceHeaderMap.ProgramID', " +
//                    "'$invoiceHeaderMap.TotalInstallmentsDue', '$invoiceHeaderMap.RiskLimits', '$invoiceHeaderMap.RiskZip', '$invoiceHeaderMap.RiskCounty', " +
//                    "'$invoiceHeaderMap.PaidByStatement', '$invoiceHeaderMap.DownPaymentAmt', '$invoiceHeaderMap.PayToDueDate,DateCreated', '$invoiceHeaderMap.FinanceID', " +
//                    "'$invoiceHeaderMap.FlagFinanced', '$invoiceHeaderMap.Endorsement', '$invoiceHeaderMap.CompanyCollectedTaxes', '$invoiceHeaderMap.TotalTaxes', " +
//                    "'$invoiceHeaderMap.FlagSplit', '$invoiceHeaderMap.MarketID', '$invoiceHeaderMap.ContractID', '$invoiceHeaderMap.OtherTaxes', " +
//                    "'$invoiceHeaderMap.OtherExpense,AcctExec', '$invoiceHeaderMap.CurrencyType', '$invoiceHeaderMap.CurrencyAmount', '$invoiceHeaderMap.ProductID', " +
//                    "'$invoiceHeaderMap.CoverageID', '$invoiceHeaderMap.OwnerKey_SK', '$invoiceHeaderMap.ZipPlus', '$invoiceHeaderMap.TotalFeeExpense', " +
//                    "'$invoiceHeaderMap.TotalRevenue', '$invoiceHeaderMap.DatePrinted', '$invoiceHeaderMap.GLPeriod', '$invoiceHeaderMap.FlagRebill,TotalPayments', " +
//                    "'$invoiceHeaderMap.TermPremium', '$invoiceHeaderMap.MinimumPremium', '$invoiceHeaderMap.ProcessBatchKey_FK', '$invoiceHeaderMap.DivisionID', " +
//                    "'$invoiceHeaderMap.DateTaxesFiled', '$invoiceHeaderMap.FlagMultiPremium', '$invoiceHeaderMap.DatePremiumReported', " +
//                    "'$invoiceHeaderMap.AdmittedPremium,FlagOverrideComm', '$invoiceHeaderMap.CommissionSplitKey_FK', '$invoiceHeaderMap.ProductionSplitKey_FK', " +
//                    "'$invoiceHeaderMap.TotalAgentCommOnly', '$invoiceHeaderMap.TotalAgentFeeTaxes', '$invoiceHeaderMap.TotalAPCompany', '$invoiceHeaderMap.TotalAPTax', " +
//                    "'$invoiceHeaderMap.TotalNetFeeRevenue,TotalNetComm', '$invoiceHeaderMap.Expiration', '$invoiceHeaderMap.TotalNetRevenue', '$invoiceHeaderMap.TotalFees', " +
//                    "'$invoiceHeaderMap.FlagCourtesyFiler', '$invoiceHeaderMap.FlagProductionSplit', '$invoiceHeaderMap.SourcePremium', " +
//                    "'$invoiceHeaderMap.RebillInvoiceKey_FK', '$invoiceHeaderMap.DownPaymentMemo,TotalBasisAmount', '$invoiceHeaderMap.CompanyID', " +
//                    "'$invoiceHeaderMap.InvoicePostedByID', '$invoiceHeaderMap.FlagSuppress', '$invoiceHeaderMap.AggregateLimits)")

//            log.info "Rows Updated (Insert into InvoiceDetail): " + aimsql.getUpdateCount()

        /*
        Exec spInvUpdatePremiumAllocation "0623945", 93109
         */
//            p1 = params.aimQuoteID //QuoteID
//            p2 = invoiceKey //InvoiceKey
//            aimsql.call("{call dbo.spInvUpdatePremiumAllocation('$p1', $p2)}") { num ->
//                log.info "spInvUpdatePremiumAllocation: $num"
//            }

        /*
        exec dbo.AddTransaction  @ReferenceID='0623945',@UserID='web',@Description='Invoice #015757 created by web',@Date='2017-05-22 16:52:51:653',
        @StatusID='INV',@ImageID='93109',@TypeID='I', @QuoteVersion=NULL,@ToNameKey=NULL,@DocTemplateID=NULL,@AttachmentIcon=NULL,
        @SourceDateTime='1899-12-30 00:00:00:000'
         */
        now = new Date();
        timestamp = now.format(dateFormat, timeZone);
        p1 = params.aimQuoteID
        p2 = "web"
        p3 = "Invoice #$invoiceID created by web"
        p4 = timestamp
        p5 = "INV"
        p6 = invoiceKey //InvoiceKey
        p7 = I  //I
        p8 = null //QuoteVersion
        p9 = null //ToNameKey
        p10 = null //DocTemplateID
        p11 = null //AttachmentIcon
        p12 = '1899-12-30 00:00:00:000' //SourceDateTime
        aimsql.call("{call dbo.AddTransaction( '$p1', '$p2', '$p3', '$p4', '$p5', $p6, " +
                "$p7, '$p8', '$p9', $p10, '$p11', '$p12')}") { num ->
            log.info "addTransaction: $num"
        }

        /*
        EXEC spInvUpdatePremiumRecord '0623945', 93109, 'Y'
         */
        p1 = params.aimQuoteID //QuoteID
        p2 = invoiceKey //InvoiceKey
        p3 = "Y"
        aimsql.call("{call dbo.spInvUpdatePremiumRecord('$p1', $p2, '$p3')}") { num ->
            log.info "spInvUpdatePremiumRecord: $num"
        }

        /*
        UPDATE dbo.Policy SET Invoiced='Y',InvoiceDate='20170522 00:00:00.000',AIM_TransDate='20170522 16:52:57.873',InvoiceKey_FK=93109
        WHERE QuoteID='0623945' AND PolicyID='NEBF16-017' AND PolicyKey_PK=93108 AND Version='0' AND PolicyGrpID IS NULL
        AND Effective='20170516 00:00:00.000' AND Expiration='20170615 00:00:00.000' AND Inception='20170516 00:00:00.000'
        AND Term=30 AND BillingType IS NULL  AND NewAccountIndicator IS NULL  AND RateDate IS NULL  AND MailToCode IS NULL
        AND PolicyStatusDate IS NULL  AND BillingAccountNumber IS NULL  AND Bound='20170522 00:00:00.000' AND BoundTime IS NULL
        AND SetupDate IS NULL  AND MailoutDate IS NULL  AND FinanceCompanyID IS NULL  AND Cancellation IS NULL  AND
        CancelEffective IS NULL  AND CancellationReason IS NULL  AND NonRenewalCode IS NULL  AND NonRenewBy IS NULL
        AND Reinstated IS NULL  AND Invoiced IS NULL  AND Units IS NULL  AND UnitType IS NULL  AND LocationZip IS NULL
        AND ClaimsPending IS NULL  AND ClaimsMade IS NULL  AND LossesPaid IS NULL  AND BillToCode IS NULL  AND StatusID='PIF'
        AND Endorsement='1' AND AdditionalInsureds IS NULL  AND InspectionOrdered IS NULL  AND EC IS NULL  AND Operations IS NULL
        AND SICID IS NULL  AND CancelTime_Old IS NULL  AND CancelRequestedBy IS NULL  AND ReturnPrem IS NULL  AND ReturnRate IS NULL
        AND PolicySource='R' AND CompanyID='RM0057' AND ProductID='PIP CHOI' AND ContractID IS NULL  AND WrittenPremium IS NULL  AND
        Control_State IS NULL  AND Financed IS NULL  AND BinderType IS NULL  AND RewriteCompanyID IS NULL  AND RewritePolicyID IS NULL
        AND RewriteDate IS NULL  AND TypeID IS NULL  AND BillTo IS NULL  AND RenewalQuoteID IS NULL  AND AuditID IS
        NULL  AND AuditInception IS NULL  AND AuditType IS NULL  AND AuditPremium IS NULL  AND AuditOutstanding IS NULL
        AND DeductType IS NULL  AND PolicyForm IS NULL  AND InstallID IS NULL  AND SuspID IS NULL  AND InvoiceDate IS NULL  AND
        TermPremiumAdj IS NULL  AND PolicyPrintDate IS NULL  AND EffectiveTime='12:01 AM' AND ActivePolicyFlag='Y'
        AND Limit1 IS NULL  AND Coverage1 IS NULL  AND Limit2 IS NULL  AND Coverage2 IS NULL  AND Limit3 IS NULL  AND Coverage3 IS NULL
        AND Limit4 IS NULL  AND Coverage4 IS NULL  AND AIM_TransDate='20170522 16:47:57.343' AND PolicyGroupKey_FK=93108
        AND AccountKey_FK=92975 AND CancelTime IS NULL  AND PolicyTerm IS NULL  AND InspectionCo_FK IS NULL  AND LoanNumber IS NULL
        AND ReinsuranceCategory IS NULL  AND PendingNOCKey_FK IS NULL  AND ContractName IS NULL  AND ContractKey_FK IS NULL
        AND DateInspectionOrdered IS NULL  AND DateNOC IS NULL  AND DateRenewalNotice IS NULL  AND AmountFinanced IS NULL
        AND CountCancelled IS NULL  AND CountEndorsed IS NULL  AND CountRenewed IS NULL  AND CountClaims IS NULL
        AND PremiumWritten=convert(money,'1128.00') AND PremiumBilled IS NULL  AND PremiumAdjustments IS NULL
        AND PremiumTerm=convert(money,'1128.00') AND PremiumReturn IS NULL  AND DateRenewalLetter IS NULL
        AND FlagFinancingFunded IS NULL  AND FlagSubjectToAudit IS NULL  AND FlagConfirmation IS NULL
        AND DateAuditReviewed IS NULL AND AuditReceivedBy IS NULL  AND DateAuditReceived IS NULL  AND AuditReviewedBy IS NULL
        AND InspectionOrderedBy IS NULL  AND DateInspectionReceived IS NULL  AND InspectionReceivedBy IS NULL  AND DateInspectionReviewed IS NULL
        AND InspectionReviewedBy IS NULL  AND FlagInspectionRequired='N' AND InspectionFile IS NULL  AND DatePolicyReceived IS NULL
        AND DateReceived IS NULL  AND FlagOverrideServiceUW='N' AND TRIAReceivedDate IS NULL  AND ERPEffective IS NULL
        AND ERPExpiration IS NULL  AND DefaultBillingType='AB' AND ProductionSplitKey_FK IS NULL  AND InvoiceKey_FK IS NULL
        AND BasisPremiumTerm IS NULL  AND FlagLapseInCoverage IS NULL  AND DateInspectionBilled IS NULL  AND InspectionInvoiceNumber IS NULL
        AND InspectionCost IS NULL  AND InspectionPhotosRecvd IS NULL  AND InspectionInvoiceDate IS NULL
        AND FlagPremFinAgentFunded IS NULL  AND PremiumConvertedTerm IS NULL  AND DateInspectionReordered IS NULL
        AND InspectionReorderedBy IS NULL  AND MasterInstallKey_FK IS NULL  AND LastInstallExported IS NULL  AND EscrowInvoiceKey_FK IS NULL
        AND EscrowPremium IS NULL  AND EscrowInvoiceDate IS NULL  AND EscrowInvoiced IS NULL
        */
        aimsql.execute("dbo.Policy " +
                "SET Invoiced='Y',InvoiceDate='20170522 00:00:00.000',AIM_TransDate='20170522 16:52:57.873',InvoiceKey_FK=93109 " +
                "WHERE QuoteID='0623945' AND PolicyID='NEBF16-017' AND PolicyKey_PK=93108 AND Version='0' AND PolicyGrpID IS NULL" +
                "AND Effective='20170516 00:00:00.000' AND Expiration='20170615 00:00:00.000' AND Inception='20170516 00:00:00.000'" +
                "AND Term=30 AND BillingType IS NULL  AND NewAccountIndicator IS NULL  AND RateDate IS NULL  AND MailToCode IS NULL" +
                "AND PolicyStatusDate IS NULL  AND BillingAccountNumber IS NULL  AND Bound='20170522 00:00:00.000' AND BoundTime IS NULL" +
                "AND SetupDate IS NULL  AND MailoutDate IS NULL  AND FinanceCompanyID IS NULL  AND Cancellation IS NULL  AND" +
                "CancelEffective IS NULL  AND CancellationReason IS NULL  AND NonRenewalCode IS NULL  AND NonRenewBy IS NULL " +
                "AND Reinstated IS NULL  AND Invoiced IS NULL  AND Units IS NULL  AND UnitType IS NULL  AND LocationZip IS NULL " +
                "AND ClaimsPending IS NULL  AND ClaimsMade IS NULL  AND LossesPaid IS NULL  AND BillToCode IS NULL  AND StatusID='PIF'" +
                "AND Endorsement='1' AND AdditionalInsureds IS NULL  AND InspectionOrdered IS NULL  AND EC IS NULL  AND Operations IS NULL" +
                "AND SICID IS NULL  AND CancelTime_Old IS NULL  AND CancelRequestedBy IS NULL  AND ReturnPrem IS NULL  AND ReturnRate IS NULL" +
                "AND PolicySource='R' AND CompanyID='RM0057' AND ProductID='PIP CHOI' AND ContractID IS NULL  AND WrittenPremium IS NULL  AND" +
                "Control_State IS NULL  AND Financed IS NULL  AND BinderType IS NULL  AND RewriteCompanyID IS NULL  AND RewritePolicyID IS NULL" +
                "AND RewriteDate IS NULL  AND TypeID IS NULL  AND BillTo IS NULL  AND RenewalQuoteID IS NULL  AND AuditID IS" +
                "NULL  AND AuditInception IS NULL  AND AuditType IS NULL  AND AuditPremium IS NULL  AND AuditOutstanding IS NULL" +
                "AND DeductType IS NULL  AND PolicyForm IS NULL  AND InstallID IS NULL  AND SuspID IS NULL  AND InvoiceDate IS NULL  AND" +
                "TermPremiumAdj IS NULL  AND PolicyPrintDate IS NULL  AND EffectiveTime='12:01 AM' AND ActivePolicyFlag='Y' AND Limit1 IS NULL" +
                "AND Coverage1 IS NULL  AND Limit2 IS NULL  AND Coverage2 IS NULL  AND Limit3 IS NULL  AND Coverage3 IS NULL" +
                "AND Limit4 IS NULL  AND Coverage4 IS NULL  AND AIM_TransDate='20170522 16:47:57.343' AND PolicyGroupKey_FK=93108" +
                "AND AccountKey_FK=92975 AND CancelTime IS NULL  AND PolicyTerm IS NULL  AND InspectionCo_FK IS NULL  AND LoanNumber IS NULL" +
                "AND ReinsuranceCategory IS NULL  AND PendingNOCKey_FK IS NULL  AND ContractName IS NULL  AND ContractKey_FK IS NULL" +
                "AND DateInspectionOrdered IS NULL  AND DateNOC IS NULL  AND DateRenewalNotice IS NULL  AND AmountFinanced IS NULL" +
                "AND CountCancelled IS NULL  AND CountEndorsed IS NULL  AND CountRenewed IS NULL  AND CountClaims IS NULL" +
                "AND PremiumWritten=convert(money,'1128.00') AND PremiumBilled IS NULL  AND PremiumAdjustments IS NULL" +
                "AND PremiumTerm=convert(money,'1128.00') AND PremiumReturn IS NULL  AND DateRenewalLetter IS NULL" +
                "AND FlagFinancingFunded IS NULL  AND FlagSubjectToAudit IS NULL  AND FlagConfirmation IS NULL  AND DateAuditReviewed IS NULL" +
                "AND AuditReceivedBy IS NULL  AND DateAuditReceived IS NULL  AND AuditReviewedBy IS NULL  AND InspectionOrderedBy IS NULL" +
                "AND DateInspectionReceived IS NULL  AND InspectionReceivedBy IS NULL  AND DateInspectionReviewed IS NULL" +
                "AND InspectionReviewedBy IS NULL  AND FlagInspectionRequired='N' AND InspectionFile IS NULL  AND DatePolicyReceived IS NULL" +
                "AND DateReceived IS NULL  AND FlagOverrideServiceUW='N' AND TRIAReceivedDate IS NULL  AND ERPEffective IS NULL" +
                "AND ERPExpiration IS NULL  AND DefaultBillingType='AB' AND ProductionSplitKey_FK IS NULL  AND InvoiceKey_FK IS NULL" +
                "AND BasisPremiumTerm IS NULL  AND FlagLapseInCoverage IS NULL  AND DateInspectionBilled IS NULL  AND InspectionInvoiceNumber IS NULL" +
                "AND InspectionCost IS NULL  AND InspectionPhotosRecvd IS NULL  AND InspectionInvoiceDate IS NULL  AND FlagPremFinAgentFunded IS NULL" +
                "AND PremiumConvertedTerm IS NULL  AND DateInspectionReordered IS NULL AND InspectionReorderedBy IS NULL  AND MasterInstallKey_FK IS NULL" +
                "AND LastInstallExported IS NULL  AND EscrowInvoiceKey_FK IS NULL  AND EscrowPremium IS NULL  AND EscrowInvoiceDate IS NULL" +
                "AND EscrowInvoiced IS NULL")
        log.info "Rows Updated (Update into Quo): " + aimsql.getUpdateCount()


        /*
        EXEC spGetStateProductMessage 'CA', 'PIP CHOI', 1
         */

//            p1 = taxState //QuoteID
//            p2 = productID //InvoiceKey
//            p3 = "Y"
//            aimsql.call("{call dbo.spGetStateProductMessage('$p1', $p2, '$p3')}") { num ->
//                log.info "spInvUpdatePremiumRecord: $num"
//            }

//            def invoiceMap = [InvoiceID: '',
//                              InvoiceKey_PK: '',
//                              QuoteID: '',
//                              PolicyKey_FK: '',
//                              Effective: '',
//                              ProducerID: '',
//                              BillingType: '',
//                              BillToCode: '',
//                              Premium: '',
//                              Non_Premium: '',
//                              Misc_Premium: '',
//                              NonTax_Premium: '',
//                              Tax1: '',
//                              Tax2: '',
//                              Tax3: '',
//                              Tax4: '',
//                              InvoiceTypeID: '',
//                              PolicyID: '',
//                              Description: '',
//                              TaxState: '',
//                              InvoiceTotal: '',
//                              BillToAddressID: '',
//                              PaymentToAddressID: '',
//                              MemoInvoiceFlag: '',
//                              OutStandingAmt: '',
//                              DirectBillFlag: '',
//                              InstallmentPlanID: '',
//                              DueDate: '',
//                              NumberOfPayments: '',
//                              TotalGrossComm: '',
//                              TotalAgentComm: '',
//                              TotalDue: '',
//                              TotalPayable: '',
//                              Note: '',
//                              GrossComm: '', AgentComm: '',
//                              CompanyCollectedFees: '',
//                              AgencyCollectedFees: '',
//                              TotalPremium: '',
//                              InstallmentID: '',
//                              PayableID: '',
//                              InstallmentFlag: '',
//                              Message: '',
//                              TaxPaidBy: '',
//                              Taxed: '',
//                              TaxesPaidByID: '',
//                              UserHoldFlag: '',
//                              CourtesyFilingID: '',
//                              DefaultPayableID: '',
//                              Ledger: '',
//                              ReversedFlag: '',
//                              PostDate: '',
//                              FrequencyID: '',
//                              IncludeAgentComm: '',
//                              IncludeCompanyFee: '',
//                              IncludeAgencyComm: '',
//                              IncludeAgencyFee: '',
//                              DownPercent: '',
//                              StatusID: '',
//                              InstallmentItem: '',
//                              Initial_InvoiceFlag: '',
//                              PayToCode: '',
//                              AcuityTargetCompanyID: '',
//                              InsuredID: '',
//                              TeamID: '',
//                              InvoicedByID: '',
//                              AcuityStatusID: '',
//                              InvoiceDate: '',
//                              OwnerKey_FK: '',
//                              InstallmentTotal: '',
//                              Address1: '',
//                              Address2: '',
//                              City: '',
//                              State: '',
//                              Zip: '',
//                              RemitAddress1: '',
//                              RemitAddress2: '',
//                              RemitCity: '',
//                              RemitState: '',
//                              RemitZip: '',InvTypeID: '',
//                              EndorsementKey_FK: '',
//                              ExportDate: '',
//                              HeldSuspenseKey: '',
//                              InvoiceTerms: '',
//                              InstallPayOOBFlag: '',
//                              AgencyCollectedTaxes: '',
//                              TotalFeeRevenue: '',
//                              TotalNetDueCompany: '',
//                              AccountingEffectiveDate: '',
//                              ReversedInvoiceKey: '',
//                              ExportStatusID: '',
//                              AcuityBatchKey: '',
//                              ProgramID: '',
//                              TotalInstallmentsDue: '',
//                              RiskLimits: '',
//                              RiskZip: '',
//                              RiskCounty: '',
//                              PaidByStatement: '',
//                              DownPaymentAmt: '',
//                              PayToDueDate: '',
//                              DateCreated: '',
//                              FinanceID: '',
//                              FlagFinanced: '',
//                              Endorsement: '',
//                              CompanyCollectedTaxes: '',
//                              TotalTaxes: '',
//                              FlagSplit: '',
//                              MarketID: '',
//                              ContractID: '',
//                              OtherTaxes: '',
//                              OtherExpense: '',
//                              AcctExec: '',
//                              CurrencyType: '',
//                              CurrencyAmount: '',
//                              ProductID: '',
//                              CoverageID: '',
//                              OwnerKey_SK: '',
//                              ZipPlus: '',
//                              TotalFeeExpense: '',
//                              TotalRevenue: '',
//                              TotalFeeCommission: '',
//                              DatePrinted: '',
//                              GLPeriod: '',
//                              FlagRebill: '',
//                              TotalPayments: '',
//                              TermPremium: '',
//                              MinimumPremium: '',
//                              ProcessBatchKey_FK: '',
//                              EffectiveDate: '',
//                              DivisionID: '',
//                              DateTaxesFiled: '',
//                              FlagMultiPremium: '',
//                              DatePremiumReported: '',
//                              AdmittedPremium: '',
//                              FlagOverrideComm: '',
//                              CommissionSplitKey_FK: '',
//                              Entity: '',
//                              CstCtr: '',
//                              ProductionSplitKey_FK: '',
//                              TotalAgentCommOnly: '',
//                              TotalAgentFeeTaxes: '',
//                              TotalAPCompany: '',
//                              TotalAPTax: '',
//                              TotalNetFeeRevenue: '',
//                              TotalNetComm: '',
//                              Expiration: '',
//                              TotalNetRevenue: '',
//                              TotalFees: '',
//                              FlagCourtesyFiler: '',
//                              FlagProductionSplit: '',
//                              SourcePremium: '',
//                              RebillInvoiceKey_FK: '',
//                              DownPaymentMemo: '',
//                              TotalBasisAmount: '',
//                              CompanyID: '',
//                              InvoicePostedByID: '',
//                              TerrorismPremium_GL: '',
//                              TerrorismPremium: '',
//                              FlagSuppress: '',
//                              FlaggedAR: '',
//                              FlaggedAP: '',
//                              MapToID: '',
//                              Tax5: '',
//                              Tax6: '',
//                              Tax7: '',
//                              Tax8: '',
//                              AddToExisting: '',
//                              AR_AccountID: '',
//                              BatchID: '',
//                              StatusID_Old: '',
//                              StatusID_Old2: '',
//                              OLD_AcuityTargetCompanyID: '',
//                              DateBackOutFiled: '',
//                              PerArchFiled: '',
//                              ArchBatchKey: '',
//                              FlagCancelFiledToArch: '',
//                              TaxKeyPK: '',
//                              OrigPolNum: '',
//                              DateTaxesAccepted: '',
//                              FlagFileSLSO: '',
//                              SLSOErrorType: '',
//                              SLSOBatchKey_FK: '',
//                              MasterInstallKey_FK: '',
//                              FlagMasterInstall: '',
//                              DepositPremium: '',
//                              InstallmentNo: '',
//                              AggregateLimits: '',
//                              FlagMailedOut: '',
//                              FlagEscrow: ''
//            ]
//
//            aimsql.execute("Insert into dbo.InvoiceHeader (InvoiceID, InvoiceKey_PK, QuoteID, PolicyKey_FK, Effective, ProducerID, BillingType, BillToCode, Premium, Non_Premium, Misc_Premium, NonTax_Premium, Tax1, \n" +
//                    "Tax2, Tax3, Tax4, InvoiceTypeID, PolicyID, Description, TaxState, InvoiceTotal, BillToAddressID, PaymentToAddressID, MemoInvoiceFlag, OutStandingAmt, \n" +
//                    "DirectBillFlag, InstallmentPlanID, DueDate, NumberOfPayments, TotalGrossComm, TotalAgentComm, TotalDue, TotalPayable, Note, GrossComm, AgentComm, \n" +
//                    "CompanyCollectedFees, AgencyCollectedFees, TotalPremium, InstallmentID, PayableID, InstallmentFlag, Message, TaxPaidBy, Taxed, TaxesPaidByID, UserHoldFlag, \n" +
//                    "CourtesyFilingID, DefaultPayableID, Ledger, ReversedFlag, PostDate, FrequencyID, IncludeAgentComm, IncludeCompanyFee, IncludeAgencyComm, \n" +
//                    "IncludeAgencyFee, DownPercent, StatusID, InstallmentItem, Initial_InvoiceFlag, PayToCode, AcuityTargetCompanyID, InsuredID, TeamID, InvoicedByID, \n" +
//                    "AcuityStatusID, InvoiceDate, OwnerKey_FK, InstallmentTotal, Address1, Address2, City, State, Zip, RemitAddress1, RemitAddress2, RemitCity, RemitState, RemitZip, \n" +
//                    "InvTypeID, EndorsementKey_FK, ExportDate, HeldSuspenseKey, InvoiceTerms, InstallPayOOBFlag, AgencyCollectedTaxes, TotalFeeRevenue, TotalNetDueCompany, \n" +
//                    "AccountingEffectiveDate, ReversedInvoiceKey, ExportStatusID, AcuityBatchKey, ProgramID, TotalInstallmentsDue, RiskLimits, RiskZip, RiskCounty, PaidByStatement, \n" +
//                    "DownPaymentAmt, PayToDueDate, DateCreated, FinanceID, FlagFinanced, Endorsement, CompanyCollectedTaxes, TotalTaxes, FlagSplit, MarketID, ContractID, \n" +
//                    "OtherTaxes, OtherExpense, AcctExec, CurrencyType, CurrencyAmount, ProductID, CoverageID, OwnerKey_SK, ZipPlus, TotalFeeExpense, TotalRevenue, \n" +
//                    "TotalFeeCommission, DatePrinted, GLPeriod, FlagRebill, TotalPayments, TermPremium, MinimumPremium, ProcessBatchKey_FK, EffectiveDate, DivisionID, \n" +
//                    " DateTaxesFiled, FlagMultiPremium, DatePremiumReported, AdmittedPremium, FlagOverrideComm, CommissionSplitKey_FK, Entity, CstCtr, ProductionSplitKey_FK, \n" +
//                    "TotalAgentCommOnly, TotalAgentFeeTaxes, TotalAPCompany, TotalAPTax, TotalNetFeeRevenue, TotalNetComm, Expiration, TotalNetRevenue, TotalFees, \n" +
//                    "FlagCourtesyFiler, FlagProductionSplit, SourcePremium, RebillInvoiceKey_FK, DownPaymentMemo, TotalBasisAmount, CompanyID, InvoicePostedByID, \n" +
//                    "TerrorismPremium_GL, TerrorismPremium, FlagSuppress, FlaggedAR, FlaggedAP, MapToID, Tax5, Tax6, Tax7, Tax8, AddToExisting, AR_AccountID, BatchID, \n" +
//                    "StatusID_Old, StatusID_Old2, OLD_AcuityTargetCompanyID, DateBackOutFiled, PerArchFiled, ArchBatchKey, FlagCancelFiledToArch, TaxKeyPK, OrigPolNum, \n" +
//                    "DateTaxesAccepted, FlagFileSLSO, SLSOErrorType, SLSOBatchKey_FK, MasterInstallKey_FK, FlagMasterInstall, DepositPremium, InstallmentNo, AggregateLimits, \n" +
//                    "FlagMailedOut, FlagEscrow)  " +
//                    "VALUES ('$invoiceMap.InvoiceID', '$invoiceMap.InvoiceKey_PK', '$invoiceMap.QuoteID', '$invoiceMap.PolicyKey_FK', '$invoiceMap.Effective', " +
//                    "'$invoiceMap.ProducerID', '$invoiceMap.BillingType', '$invoiceMap.BillToCode', '$invoiceMap.Premium', '$invoiceMap.Non_Premium', '$invoiceMap.Misc_Premium', " +
//                    "'$invoiceMap.NonTax_Premium', '$invoiceMap.Tax1', '$invoiceMap.Tax2', '$invoiceMap.Tax3', '$invoiceMap.Tax4', '$invoiceMap.InvoiceTypeID', '$invoiceMap.PolicyID', " +
//                    "'$invoiceMap.Description', '$invoiceMap.TaxState', '$invoiceMap.InvoiceTotal', '$invoiceMap.BillToAddressID', '$invoiceMap.PaymentToAddressID', " +
//                    "'$invoiceMap.MemoInvoiceFlag', '$invoiceMap.OutStandingAmt', '$invoiceMap.DirectBillFlag', '$invoiceMap.InstallmentPlanID', '$invoiceMap.DueDate', " +
//                    "'$invoiceMap.NumberOfPayments', '$invoiceMap.TotalGrossComm', '$invoiceMap.TotalAgentComm', '$invoiceMap.TotalDue', '$invoiceMap.TotalPayable', " +
//                    "'$invoiceMap.Note', '$invoiceMap.GrossComm', '$invoiceMap.AgentComm', '$invoiceMap.CompanyCollectedFees', '$invoiceMap.AgencyCollectedFees', " +
//                    "'$invoiceMap.TotalPremium', '$invoiceMap.InstallmentID', '$invoiceMap.PayableID', '$invoiceMap.InstallmentFlag', '$invoiceMap.Message', " +
//                    "'$invoiceMap.TaxPaidBy', '$invoiceMap.Taxed', '$invoiceMap.TaxesPaidByID', '$invoiceMap.UserHoldFlag', '$invoiceMap.CourtesyFilingID', " +
//                    "'$invoiceMap.DefaultPayableID', '$invoiceMap.Ledger', '$invoiceMap.ReversedFlag', '$invoiceMap.PostDate', '$invoiceMap.FrequencyID', " +
//                    "'$invoiceMap.IncludeAgentComm', '$invoiceMap.IncludeCompanyFee', '$invoiceMap.IncludeAgencyComm', '$invoiceMap.IncludeAgencyFee', " +
//                    "'$invoiceMap.DownPercent', '$invoiceMap.StatusID', '$invoiceMap.InstallmentItem', '$invoiceMap.Initial_InvoiceFlag', '$invoiceMap.PayToCode', " +
//                    "'$invoiceMap.AcuityTargetCompanyID', '$invoiceMap.InsuredID', '$invoiceMap.TeamID', '$invoiceMap.InvoicedByID', '$invoiceMap.AcuityStatusID', " +
//                    "'$invoiceMap.InvoiceDate', '$invoiceMap.OwnerKey_FK', '$invoiceMap.InstallmentTotal', '$invoiceMap.Address1', '$invoiceMap.Address2', " +
//                    "'$invoiceMap.City', '$invoiceMap.State', '$invoiceMap.Zip', '$invoiceMap.RemitAddress1', '$invoiceMap.RemitAddress2', '$invoiceMap.RemitCity', " +
//                    "'$invoiceMap.RemitState', '$invoiceMap.RemitZip', '$invoiceMap.InvTypeID', '$invoiceMap.EndorsementKey_FK', '$invoiceMap.ExportDate', " +
//                    "'$invoiceMap.HeldSuspenseKey', '$invoiceMap.InvoiceTerms', '$invoiceMap.InstallPayOOBFlag', '$invoiceMap.AgencyCollectedTaxes', " +
//                    "'$invoiceMap.TotalFeeRevenue', '$invoiceMap.TotalNetDueCompany', '$invoiceMap.AccountingEffectiveDate', '$invoiceMap.ReversedInvoiceKey', " +
//                    "'$invoiceMap.ExportStatusID', '$invoiceMap.AcuityBatchKey', '$invoiceMap.ProgramID', '$invoiceMap.TotalInstallmentsDue', '$invoiceMap.RiskLimits', " +
//                    "'$invoiceMap.RiskZip', '$invoiceMap.RiskCounty', '$invoiceMap.PaidByStatement', '$invoiceMap.DownPaymentAmt', '$invoiceMap.PayToDueDate', " +
//                    "'$invoiceMap.DateCreated', '$invoiceMap.FinanceID', '$invoiceMap.FlagFinanced', '$invoiceMap.Endorsement', '$invoiceMap.CompanyCollectedTaxes', " +
//                    "'$invoiceMap.TotalTaxes', '$invoiceMap.FlagSplit', '$invoiceMap.MarketID', '$invoiceMap.ContractID', '$invoiceMap.OtherTaxes', " +
//                    "'$invoiceMap.OtherExpense', '$invoiceMap.AcctExec', '$invoiceMap.CurrencyType', '$invoiceMap.CurrencyAmount', '$invoiceMap.ProductID', " +
//                    "'$invoiceMap.CoverageID', '$invoiceMap.OwnerKey_SK', '$invoiceMap.ZipPlus', '$invoiceMap.TotalFeeExpense', '$invoiceMap.TotalRevenue', " +
//                    "'$invoiceMap.TotalFeeCommission', '$invoiceMap.DatePrinted', '$invoiceMap.GLPeriod', '$invoiceMap.FlagRebill', '$invoiceMap.TotalPayments', " +
//                    "'$invoiceMap.TermPremium', '$invoiceMap.MinimumPremium', '$invoiceMap.ProcessBatchKey_FK', '$invoiceMap.EffectiveDate', '$invoiceMap.DivisionID', " +
//                    "'$invoiceMap.DateTaxesFiled', '$invoiceMap.FlagMultiPremium', '$invoiceMap.DatePremiumReported', '$invoiceMap.AdmittedPremium', " +
//                    "'$invoiceMap.FlagOverrideComm', '$invoiceMap.CommissionSplitKey_FK', '$invoiceMap.Entity', '$invoiceMap.CstCtr', '$invoiceMap.ProductionSplitKey_FK', " +
//                    "'$invoiceMap.TotalAgentCommOnly', '$invoiceMap.TotalAgentFeeTaxes', '$invoiceMap.TotalAPCompany', '$invoiceMap.TotalAPTax', " +
//                    "'$invoiceMap.TotalNetFeeRevenue', '$invoiceMap.TotalNetComm', '$invoiceMap.Expiration', '$invoiceMap.TotalNetRevenue', '$invoiceMap.TotalFees', " +
//                    "'$invoiceMap.FlagCourtesyFiler', '$invoiceMap.FlagProductionSplit', '$invoiceMap.SourcePremium', '$invoiceMap.RebillInvoiceKey_FK', " +
//                    "'$invoiceMap.DownPaymentMemo', '$invoiceMap.TotalBasisAmount', '$invoiceMap.CompanyID', '$invoiceMap.InvoicePostedByID', " +
//                    "'$invoiceMap.TerrorismPremium_GL', '$invoiceMap.TerrorismPremium', '$invoiceMap.FlagSuppress', '$invoiceMap.FlaggedAR', " +
//                    "'$invoiceMap.FlaggedAP', '$invoiceMap.MapToID', '$invoiceMap.Tax5', '$invoiceMap.Tax6', '$invoiceMap.Tax7', '$invoiceMap.Tax8', " +
//                    "'$invoiceMap.AddToExisting', '$invoiceMap.AR_AccountID', '$invoiceMap.BatchID', '$invoiceMap.StatusID_Old', '$invoiceMap.StatusID_Old2', " +
//                    "'$invoiceMap.OLD_AcuityTargetCompanyID', '$invoiceMap.DateBackOutFiled', '$invoiceMap.PerArchFiled', '$invoiceMap.ArchBatchKey', " +
//                    "'$invoiceMap.FlagCancelFiledToArch', '$invoiceMap.TaxKeyPK', '$invoiceMap.OrigPolNum', '$invoiceMap.DateTaxesAccepted', '$invoiceMap.FlagFileSLSO', " +
//                    "'$invoiceMap.SLSOErrorType', '$invoiceMap.SLSOBatchKey_FK', '$invoiceMap.MasterInstallKey_FK', '$invoiceMap.FlagMasterInstall', " +
//                    "'$invoiceMap.DepositPremium', '$invoiceMap.InstallmentNo', '$invoiceMap.AggregateLimits', '$invoiceMap.FlagMailedOut', '$invoiceMap.FlagEscrow)")
//


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

    def getKeyField(keyFieldName, aimsql){
        def returnValue = "";
        aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
            returnValue = num
        }

        return returnValue;
    }

    //CLEANS DATA BEFORE INSERT OR UPDATES, ALSO CHECKS LENGTHS TO AVOID ERRORS
    def cleanSQLMap(map, tableName, dataSource_aim){
        log.info "Cleaning Map for $tableName"
        def cleanedMap = [:]
        def columnIsNullableMap = getTableColumnsIsNullableMap(tableName, dataSource_aim)
        def columnTypeLengthMap = getTableColumnsTypeLengthMap(tableName, dataSource_aim)

        map.each{ k, v -> //k = Column Name, v = Value to be Inserted
//            log.info "${k}:${v}"
//            log.info "Original: " + v
//            log.info "Class: " + v.getClass();


            //CHECK IF VALUE IS  A STRING
            if(v instanceof String || v instanceof GString){
                def tempString = v.trim();

                //CHECK IF STRING IS SUPPOSED TO REPRESENT NULL
                if(tempString.equalsIgnoreCase("null")){
                    //CHECK IF THIS COLUMN IS ALLOWED TO BE NULL FOR THIS SQL TABLE
                    if(columnIsNullableMap["${k}"]){
                        cleanedMap["${k}"] = "NULL";
                    }
                    else{
                        throw new Exception("Not a valid entry for $k. Cannot be Null");
                    }

                }
                else{
                    //CHECK IF VALUE STARTS AND END WITH QUOTES
                    if(tempString.startsWith("'") && tempString.endsWith("'") ) {
                        //REMOVE THE QUTOES TEMPORARILY TO GET ACTUAL VALUE OF STRING
                        tempString = tempString.substring(1, tempString.length() - 1);
                    }

                    //CHECK IF STRING LENGTH WILL FIT INTO SQL DB
                    def colWidth = columnTypeLengthMap["${k}"].getAt(1);

                    if(tempString.size() > colWidth){
                        throw new Exception("Not a valid entry for $k. Max length of entry should be $colWidth");
                    }

                    tempString = tempString.replace("\"", "\\\"").replace("'", "''")


                    cleanedMap["${k}"] = "'$tempString'";
//                    log.info "Changed : " + cleanedMap["${k}"]
//                    log.info "Changed : " + cleanedMap["${k}"].getClass()
                }
            }
            else{
                cleanedMap["${k}"] = v
//                log.info "Not Changed : " + v
            }
        }

        return cleanedMap
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
//                log.info meta.getColumnDisplaySize(int column)
            }
        }
    }

    def getTableColumnsIsNullableMap(table, dataSource_aim){
        log.info "AIMDAO getTableColumnsIsNullableMap INFO ABOUT TABLE: $table";

        Sql aimsql = new Sql(dataSource_aim)
        def meta;
        def columnIsNullableMap= [:]
        aimsql.eachRow("SELECT  top 1   * \n" +
                "FROM         $table") {
            meta = it.getMetaData();

            it.toRowResult().eachWithIndex { rowItem, index ->
                columnIsNullableMap["$rowItem.key"] = meta.isNullable(index+1) == 1 ? true : false
            }
        }

        return columnIsNullableMap
    }

    def getTableColumnsTypeLengthMap(table, dataSource_aim){
        log.info "AIMDAO getTableColumnsTypeLengthMap INFO ABOUT TABLE: $table";

        Sql aimsql = new Sql(dataSource_aim)
        def meta;
        def columnTypeLengthMap= [:]
        aimsql.eachRow("SELECT  top 1   * \n" +
                "FROM         $table") {

            meta = it.getMetaData();
            it.toRowResult().eachWithIndex { rowItem, index ->
                columnTypeLengthMap["$rowItem.key"] = [ meta.getColumnTypeName(index+1), meta.getColumnDisplaySize(index+1) ]
            }
        }

        return columnTypeLengthMap
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
