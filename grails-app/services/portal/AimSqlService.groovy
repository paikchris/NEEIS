package portal

import grails.transaction.Transactional
import groovy.sql.GroovyResultSet
import groovy.sql.GroovyRowResult
import groovy.sql.Sql

import java.sql.ResultSetMetaData
import java.sql.Types
import java.util.Map.Entry

@Transactional
class AimSqlService {
    def dataSource_aim
    def grailsApplication
    Sql aimDB

    //RETURNS LIST of MAPS [:] OF {[COLUMN:VALUE],[COLUMN:VALUE]}
    def selectAllFromTableWhereWithFormatting(String table, String where){
        log.info "AIMDAO SELECT * FROM $table WHERE $where"
        aimDB = new Sql(dataSource_aim)

        def resultSetArray =[]

        aimDB.eachRow("SELECT     * \n" +
                "FROM         $table \n" +
                "WHERE     $where") {
            GroovyResultSet row = it
            ResultSetMetaData metaData = row.getMetaData()
            def rowMap = [:]

            row.toRowResult().eachWithIndex{ Entry rowItem, int i ->
                def index = i + 1
                def columnName = rowItem.key
                def columnValue = rowItem.value

//                log.info "${columnName}"
                if(columnValue == null){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.String'){
                    rowMap[columnName] = formatLineBreaksForLinux(columnValue)
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.Integer'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.Double'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.Short'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.sql.Timestamp'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.math.BigDecimal'){
//                    log.info "\tPRECISION: ${metaData.getPrecision(index)}"
//                    log.info "\tSCALE: ${metaData.getScale(index)}"
                    rowMap[columnName] = columnValue
                }
                else{
                    rowMap[columnName] = columnValue
                }
            }

            resultSetArray << rowMap
        }
        return resultSetArray
    }

    //RETURNS LIST of MAPS [:] OF {[COLUMN:VALUE],
    def selectAllFromTableWithFormatting(String table){
        log.info "AIMDAO SELECT * FROM $table"
        aimDB = new Sql(dataSource_aim)

        def resultSetArray =[]

        aimDB.eachRow("SELECT    * \n" +
                "FROM         $table ") {
            GroovyResultSet row = it
            ResultSetMetaData metaData = row.getMetaData()
            def rowMap = [:]

            row.toRowResult().eachWithIndex{ Entry rowItem, int i ->
                def index = i + 1
                def columnName = rowItem.key
                def columnValue = rowItem.value

//                log.info "${columnName}"

                if(columnValue == null){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.String'){
                    rowMap[columnName] = formatLineBreaksForLinux(columnValue)
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.Integer'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.Double'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.Short'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.sql.Timestamp'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.math.BigDecimal'){
//                    log.info "\tPRECISION: ${metaData.getPrecision(index)}"
//                    log.info "\tSCALE: ${metaData.getScale(index)}"
                    rowMap[columnName] = columnValue
                }
                else{
                    rowMap[columnName] = columnValue
                }
            }

            resultSetArray << rowMap
        }
        return resultSetArray
    }

    def selectFromTableWhere(tableName, whereString){
        Sql aimsql = new Sql(dataSource_aim)
        def rowMap=[:]
        def rows =[];
        def meta;
        aimsql.eachRow("SELECT     * \n" +
                "FROM         $tableName \n" +
                "WHERE     $whereString") {
            rowMap = [:]
            meta = it.getMetaData();
            def colDataType;
            it.toRowResult().eachWithIndex { rowItem, index ->
                colDataType = meta.getColumnTypeName(index+1);
                if(colDataType.equalsIgnoreCase("varchar") || colDataType.equalsIgnoreCase("char") ||
                        colDataType.equalsIgnoreCase("text") ){
                    rowMap[rowItem.key] = "$rowItem.value";
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
//                    log.info colDataType
                    "$rowItem.value"

                    def string
//                    log.info d.split(" ").size()
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
//                    log.info colDataType
                    rowMap[rowItem.key] = rowItem.value;
                }

            }
            rows << rowMap
        }

        return rows
    }

    def aimSelectQuery(String sqlString){
        Sql aimsql = new Sql(dataSource_aim)
        def rowMap=[:]
        def rows =[];
        def meta;
        aimsql.eachRow(sqlString) {
            rowMap = [:]
            meta = it.getMetaData();
            def colDataType;
            it.toRowResult().eachWithIndex { rowItem, index ->
                colDataType = meta.getColumnTypeName(index+1);
                if(colDataType.equalsIgnoreCase("varchar") || colDataType.equalsIgnoreCase("char") ||
                        colDataType.equalsIgnoreCase("text") ){
                    rowMap[rowItem.key] = "$rowItem.value";
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
//                    log.info colDataType
                    "$rowItem.value"

                    def string
//                    log.info d.split(" ").size()
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
//                    log.info colDataType
                    rowMap[rowItem.key] = rowItem.value;
                }

            }
            rows << rowMap
        }

        return rows
    }

    Class getClassTypeOfColumn(String table, String columnName){
        Class columnClass

        aimDB = new Sql(dataSource_aim)
        aimDB.eachRow("SELECT     TOP 1 * \n" +
                "FROM         $table ") {
            GroovyResultSet row = it
            ResultSetMetaData metaData = row.getMetaData()

            row.toRowResult().eachWithIndex { Entry rowItem, int i ->
                if(rowItem.key == columnName){
                    def index = i+1
//                    log.info "GETTING AIM CLASS: $rowItem.key"
                    String columnClassName = metaData.getColumnClassName(index)
                    columnClass = Class.forName(columnClassName)
                }
            }
        }
        return columnClass


    }

    //PRINT TABLE INFO
    def printTableInfo(String table){
        log.info "AIM TABLE INFO: $table"

        aimDB = new Sql(dataSource_aim)
        aimDB.eachRow("SELECT     TOP 1 * \n" +
                "FROM         $table ") {
            GroovyResultSet row = it
            ResultSetMetaData metaData = row.getMetaData()

            //ITERATE THROUGH THE COLUMNS OF TABLE
            row.toRowResult().eachWithIndex{ Entry rowItem, int i ->
                log.info "${rowItem.key}"
                printMetaData(metaData, i)
            }
        }
    }

    //PROVIDE TABLENAME AND COLUMNNAME AND GET COLUMN INFO
    def printColumnInfo(String table, String columnName){
        log.info "AIM TABLE INFO: $table"

        aimDB = new Sql(dataSource_aim)
        aimDB.eachRow("SELECT     TOP 1 * \n" +
                "FROM         $table ") {
            GroovyResultSet row = it
            ResultSetMetaData metaData = row.getMetaData()

            row.toRowResult().eachWithIndex { Entry rowItem, int i ->
                if(rowItem.key == columnName){
                    log.info "${rowItem.key}"
                    printMetaData(metaData, i)
                }
            }
        }
    }

    def printMetaData(ResultSetMetaData metaData, int columnIndex){
        def index = columnIndex + 1
        log.info "\tSQL TYPE #: ${metaData.getColumnType(index)}"
        log.info "\tSQL COLUMN TYPE: ${metaData.getColumnTypeName(index)}"
        log.info "\tJAVA CLASS TYPE: ${metaData.getColumnClassName(index)}"
        log.info "\tMAX SIZE: ${metaData.getColumnDisplaySize(index)}"
        log.info "\tCOLUMN NAME: ${metaData.getColumnName(index)}"
        log.info "\tPRECISION: ${metaData.getPrecision(index)}"
        log.info "\tSCALE: ${metaData.getScale(index)}"
        log.info "\tSCHEMA: ${metaData.getSchemaName(index)}"
        log.info "\tTABLE: ${metaData.getTableName(index)}"
        log.info "\tIS CURRENCY: ${metaData.isCurrency(index)}"
        log.info "\tIS NULLABLE: ${metaData.isNullable(index)}"
    }

    def formatLineBreaksForLinux(String s){
        return s.replaceAll("\\r\\n|\\n|\\r", "\n")
    }

    //UPDATE, INSERT, SELECTS
    def updateRecord(String tableName, updateMap, whereMap){
        Sql aimsql = new Sql(dataSource_aim)
        updateMap = cleanSQLMap(updateMap, tableName, dataSource_aim)
        whereMap = cleanSQLMap(whereMap, tableName, dataSource_aim)

        String updateStatement = "UPDATE $tableName \n"

        def setStatement =  "SET "
        updateMap.each{ column, value ->
            setStatement = setStatement + "$column = $value, "
        }
        setStatement = setStatement.trim()
        setStatement = setStatement.substring(0, setStatement.length() - 1)
        setStatement = setStatement + "\n"

        def whereStatement = "WHERE "
        whereMap.each{ column, value ->
            whereStatement = whereStatement + "($column = $value) AND "
        }
        whereStatement = whereStatement.trim()
        whereStatement = whereStatement.substring(0, whereStatement.length() - 3)

        aimsql.executeUpdate(updateStatement +
                    setStatement +
                    whereStatement )

    }

    def insertRecord(String tableName, insertMap){
        Sql aimsql = new Sql(dataSource_aim)
        insertMap = cleanSQLMap(insertMap, tableName, dataSource_aim)

        String insertStatement = "INSERT $tableName ("

        insertMap.each{ column, value ->
            insertStatement = insertStatement + "$column, "
        }
        insertStatement = insertStatement.trim()
        insertStatement = insertStatement.substring(0, insertStatement.length() - 1)
        insertStatement = insertStatement + ") values ("

        insertMap.each{ column, value ->
            insertStatement = insertStatement + "$value, "
        }
        insertStatement = insertStatement.trim()
        insertStatement = insertStatement.substring(0, insertStatement.length() - 1)
        insertStatement = insertStatement + ")"

        aimsql.execute(insertStatement )

//        aimsql.execute "insert into Insured (InsuredID, NamedInsured, NameType, DBAName, Prefix, First_Name, Last_Name,\n" +
//                "                Middle_Name, Suffix, CombinedName, Address1, Address2, City, State,\n" +
//                "                Zip, AddressID, ProducerID, AcctExec, AcctAsst, CSR, Entity, FormMakerName,\n" +
//                "                DirectBillFlag, MailAddress1, MailAddress2, MailCity, MailState, MailZip,\n" +
//                "                ContactName, Phone, Fax, EMail, DateOfBirth, SSN, PhoneExt, WorkPhone,\n" +
//                "                AcctExecID, AcuityKey, DateAdded, VehicleCount, BusinessStructureID,\n" +
//                "                NCCI, Employees, Payroll, SicID, Attention, ContactID, ClaimCount, PolicyCount,\n" +
//                "                TeamID, InsuredKey_PK, GroupKey_FK, FlagProspect, FlagAssigned, MembershipTypeID,\n" +
//                "                ParentKey_FK, License, CareOfKey_FK, Website, SLA, Exempt, RackleyClientKey_FK,\n" +
//                "                MapToID, Notes, Country, FileNo, DateConverted, UserDefinedStr1, UserDefinedStr2,\n" +
//                "                UserDefinedStr3, UserDefinedStr4, UserDefinedDate1, UserDefinedValue1,\n" +
//                "                CountryID, ParentInsuredName) values " +
//                "($insuredMap.InsuredID, $insuredMap.NamedInsured, $insuredMap.NameType, $insuredMap.DBAName, $insuredMap.Prefix, $insuredMap.First_Name, $insuredMap.Last_Name, $insuredMap.Middle_Name, " +
//                "$insuredMap.Suffix, $insuredMap.CombinedName, $insuredMap.Address1, $insuredMap.Address2, $insuredMap.City, $insuredMap.State, $insuredMap.Zip, $insuredMap.AddressID, $insuredMap.ProducerID, $insuredMap.AcctExec, " +
//                "$insuredMap.AcctAsst, $insuredMap.CSR, $insuredMap.Entity, $insuredMap.FormMakerName, $insuredMap.DirectBillFlag, $insuredMap.MailAddress1, $insuredMap.MailAddress2, $insuredMap.MailCity, $insuredMap.MailState, " +
//                "$insuredMap.MailZip, $insuredMap.ContactName, $insuredMap.Phone, $insuredMap.Fax, $insuredMap.EMail, $insuredMap.DateOfBirth, $insuredMap.SSN, $insuredMap.PhoneExt, $insuredMap.WorkPhone, $insuredMap.AcctExecID, " +
//                "$insuredMap.AcuityKey, $insuredMap.DateAdded, $insuredMap.VehicleCount, $insuredMap.BusinessStructureID, $insuredMap.NCCI, $insuredMap.Employees, $insuredMap.Payroll, $insuredMap.SicID, $insuredMap.Attention, " +
//                "$insuredMap.ContactID, $insuredMap.ClaimCount, $insuredMap.PolicyCount, $insuredMap.TeamID, $insuredMap.InsuredKey_PK, $insuredMap.GroupKey_FK, $insuredMap.FlagProspect, $insuredMap.FlagAssigned, " +
//                "$insuredMap.MembershipTypeID, $insuredMap.ParentKey_FK, $insuredMap.License, $insuredMap.CareOfKey_FK, $insuredMap.Website, $insuredMap.SLA, $insuredMap.Exempt, $insuredMap.RackleyClientKey_FK, $insuredMap.MapToID, " +
//                "$insuredMap.Notes, $insuredMap.Country, $insuredMap.FileNo, $insuredMap.DateConverted, $insuredMap.UserDefinedStr1, $insuredMap.UserDefinedStr2, $insuredMap.UserDefinedStr3, $insuredMap.UserDefinedStr4, " +
//                "$insuredMap.UserDefinedDate1, $insuredMap.UserDefinedValue1, $insuredMap.CountryID, $insuredMap.ParentInsuredName)"
    }

    def selectRecords(String tableName, whereMap){
        Sql aimsql = new Sql(dataSource_aim)
        def resultSetArray =[]

        whereMap = cleanSQLMap(whereMap, tableName, dataSource_aim)

        def whereStatement = "WHERE "
        whereMap.each{ column, value ->
            whereStatement = whereStatement + "($column = $value) AND "
        }
        whereStatement = whereStatement.trim()
        whereStatement = whereStatement.substring(0, whereStatement.length() - 3)

        aimsql.eachRow("SELECT * " +
                "FROM $tableName " +
                whereStatement) {
            GroovyResultSet row = it
            ResultSetMetaData metaData = row.getMetaData()
            def rowMap = [:]

            row.toRowResult().eachWithIndex{ Entry rowItem, int i ->
                def index = i + 1
                def columnName = rowItem.key
                def columnValue = rowItem.value

                if(columnValue == null){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.String'){
                    rowMap[columnName] = formatLineBreaksForLinux(columnValue)
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.Integer'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.Double'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.lang.Short'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.sql.Timestamp'){
                    rowMap[columnName] = columnValue
                }
                else if(metaData.getColumnClassName(index) == 'java.math.BigDecimal'){
//                    log.info "\tPRECISION: ${metaData.getPrecision(index)}"
//                    log.info "\tSCALE: ${metaData.getScale(index)}"
                    rowMap[columnName] = columnValue
                }
                else{
                    rowMap[columnName] = columnValue
                }
            }

            resultSetArray << rowMap
        }

        return resultSetArray

    }


    //UTILS
    def getKeyFieldReferenceID(){
        log.info "GET KEYFIELD"
        Sql aimsql = new Sql(dataSource_aim)
        Integer refID = -1
        aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
            refID = num
        }

        return refID
    }
    def getSubmitNumber(){
        log.info "GET SUBMIT NUMBER"
        Sql aimsql = new Sql(dataSource_aim)

        def quoteID
        aimsql.call("{call dbo.GetSubmitNumber(${Sql.VARCHAR})}") { num ->
            quoteID = num
        }

        return quoteID
    }
    def getTaxInfo(state){
        log.info "GETTING TAX INFO"

        Sql aimsql = new Sql(dataSource_aim)
        def resultsString = "";
        def taxCodes = [:]

        taxCodes.taxDistrib = ""
        taxCodes.taxesPaidBy = ""
        taxCodes.taxesPaidByID = ""

        aimsql.eachRow("SELECT     TransCode, TransTypeID, Description, FlatAmount_Flag, Rate, CollectedBy, AllowOverRide, State, FlagUserSelected, AP_AccountID, IncludeFees, RoundingRule, \n" +
                "                      RecordKey_PK, PremiumBasis, BasisSection, FlatRateFlag, TaxValue, TaxCodeID, FlagFullyEarned, FlagPolicyOnly, TaxRate, MinAmount, MaxAmount, AppliesTo, \n" +
                "                      CompanyID, Municipality\n" +
                "FROM         dvTaxTable with (NOLOCK)\n" +
                "WHERE     (State LIKE '${state}') AND (ISNULL(Municipality, '') = '') OR\n" +
                "                      (State LIKE '${state}') AND (Municipality = '')\n" +
                "ORDER BY Description") {

            def taxCodeMap = [:]
            taxCodeMap.name = it.Description
            taxCodes["${it.TransCode}"] =  taxCodeMap
        }



        aimsql.eachRow("SELECT     State, TaxValue, FlatRateFlag, Effective, Expiration, IncludeFees, PK_TaxID, CountyID, TaxCodeID, CompanyID, TaxValueNew, CollectedBy, PaidTo, AllowOverRide, \n" +
                "                      RoundingRule, TaxLine, TaxPercentange, CoverageID_Old, TaxPercentage, StateName, DateAdded, CreatedByID, SystemReq, RecordKey_PK, CoverageID, \n" +
                "                      FlagPolicyOnly, AdmittedTax, FlagFullyEarned, ZipCodeStart, ZipCodeEnd, FlagUserSelected, MinAmount, MaxAmount, PremiumBasis, BasisSection, \n" +
                "                      FlagNonResidentTax, AppliesTo, ExcludeTRIA, FlagUseEndorsementDate, Municipality, ExemptInsuredTax\n" +
                "FROM         TaxTable WITH (NOLOCK)\n" +
                "WHERE     (State = '${state}') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AppliesTo, 'ALL') = 'ALL') AND (ISNULL(AdmittedTax, 'N') = 'N') AND \n" +
                "                      (ISNULL(ExemptInsuredTax, 'N') = 'N') OR\n" +
                "                      (State = '${state}') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AdmittedTax, 'N') = 'N') AND (ISNULL(ExemptInsuredTax, 'N') = 'N') AND \n" +
                "                      (AppliesTo = 'RES')\n" +
                "ORDER BY TaxLine, SUBSTRING(CoverageID, 1, 25)") {

            def taxCodeMap  = taxCodes["${it.taxCodeID}"]
            if(taxCodeMap == null){
                taxCodeMap = [:]
                taxCodeMap.name = it.TaxCodeID
            }

            taxCodeMap.taxCodeID = it.TaxCodeID
            taxCodeMap.taxValue = it.TaxValue
            taxCodeMap.taxesPaidBy = it.CollectedBy
            taxCodeMap.companyID = it.CompanyID
            taxCodeMap.roundingRule = it.RoundingRule

            if(it.CollectedBy != null){
                taxCodes.taxesPaidBy = it.CollectedBy
            }

            if(it.CompanyID != null){
                taxCodes.taxesPaidByID = it.CompanyID
            }

            log.info taxCodeMap
        }


        return taxCodes
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
        log.info "AIMDAO PRINT COLUMN INFO ABOUT TABLE: $table"

        Sql aimsql = new Sql(dataSource_aim)
        def meta
        aimsql.eachRow("SELECT  top 1   * \n" +
                "FROM         $table") {

            meta = it.getMetaData()
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

    def fixUserAimContactID(userEmail){
        log.info "FIXING AIM CONTACT ID FOR " + userEmail

        Sql aimsql = new Sql(dataSource_aim)

        def userRecord = User.findByEmail(userEmail)

        aimsql.eachRow("SELECT     NameKeyPK, Name, IDCode, NameTypeID, TypeID, Address1, Address2, City, State, PostalCode, AddressKey, Country, MailAddress1, MailAddress2, MailCity, \n" +
                "                      MailState, MailPostalCode, MailAddressKey, Phone, Extension, Fax, PhoneAltType, Home, PhoneAltType2, Remarks, Title, OwnerKey_FK, Email, URL, StatusID, \n" +
                "                      ActiveFlag, SSN_TaxID, FlagPhysicalAddr, FlagAccountingAddr, FlagPrimaryContact, FlagCompany, PositionID, TitleID, Salutation, CreatedByID, DateAdded, \n" +
                "                      DateModified, SortName, OwnerID, CustomGrpID, FlagContact, PreviousPhone, PreviousFax, AcctExec, CsrID, AcctExecName, CsrName, OtherGroupID, \n" +
                "                      FlagUseOwnerPhone, FlagUseOwnerFax, FlagUseOwnerAddress, MktRepID, MktRepName, CommMethodID, AcctgEMail, MobilePhone, PhoneOther, ExchangeKey_FK, \n" +
                "                      FlagPhoneBookOnly, LicenseNbr, UserField1, ModifiedByID, MapToID, NameTypeSubID, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgPostalCode, AcctgState, \n" +
                "                      Flag1099, GLAcct, DefaultInvAmt, Terms, DefaultInvDescription, Contact, AcctgPhone, AcctgFax, DefaultInvBasis, FlagMonthlyPayment, FlagOneTime, \n" +
                "                      LastStatementKey_FK, CountryID, MailCountryID\n" +
                "FROM         taaNameMaster\n" +
                "WHERE     (Email = '${userRecord.email}')") {
            if(userRecord.aimContactID != it.NameKeyPK){
                userRecord.aimContactID = it.NameKeyPK
                userRecord.save(flush: true, failOnError: true);
            }
        }

        if(userRecord.aimContactID == null){
            aimsql.eachRow("SELECT     NameKeyPK, Name, IDCode, NameTypeID, TypeID, Address1, Address2, City, State, PostalCode, AddressKey, Country, MailAddress1, MailAddress2, MailCity, \n" +
                    "                      MailState, MailPostalCode, MailAddressKey, Phone, Extension, Fax, PhoneAltType, Home, PhoneAltType2, Remarks, Title, OwnerKey_FK, Email, URL, StatusID, \n" +
                    "                      ActiveFlag, SSN_TaxID, FlagPhysicalAddr, FlagAccountingAddr, FlagPrimaryContact, FlagCompany, PositionID, TitleID, Salutation, CreatedByID, DateAdded, \n" +
                    "                      DateModified, SortName, OwnerID, CustomGrpID, FlagContact, PreviousPhone, PreviousFax, AcctExec, CsrID, AcctExecName, CsrName, OtherGroupID, \n" +
                    "                      FlagUseOwnerPhone, FlagUseOwnerFax, FlagUseOwnerAddress, MktRepID, MktRepName, CommMethodID, AcctgEMail, MobilePhone, PhoneOther, ExchangeKey_FK, \n" +
                    "                      FlagPhoneBookOnly, LicenseNbr, UserField1, ModifiedByID, MapToID, NameTypeSubID, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgPostalCode, AcctgState, \n" +
                    "                      Flag1099, GLAcct, DefaultInvAmt, Terms, DefaultInvDescription, Contact, AcctgPhone, AcctgFax, DefaultInvBasis, FlagMonthlyPayment, FlagOneTime, \n" +
                    "                      LastStatementKey_FK, CountryID, MailCountryID\n" +
                    "FROM         taaNameMaster\n" +
                    "WHERE     (Name = '${userRecord.firstName} ${userRecord.lastName}')") {

                userRecord.aimContactID = it.NameKeyPK
                userRecord.save(flush: true, failOnError: true);

            }
        }

        if(userRecord.aimContactID == null && userRecord.company !=null){ //if still can't be found in name master, create entry
            def userReferenceID = 0;
            aimsql.call("{call dbo.GetKeyField(${Sql.INTEGER}, 'ReferenceID')}") { num ->
                log.info "userReferenceID $num"
                userReferenceID = num
            }

            def nameMasterOwnerKey;
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
                    "WHERE         ProducerID='${userRecord.company}'\n" +
                    "ORDER BY Name") {
                nameMasterOwnerKey = it.ReferenceID
            }

            def now = new Date()
            def timestamp = now.format(dateFormat, timeZone)
            aimsql.execute "insert into taaNameMaster\n" +
                    "  (Name, NameTypeID, NameKeyPK, IDCode, TypeID, Address1, Address2, City, \n" +
                    "   State, PostalCode, AddressKey, Country, MailAddress1, MailAddress2, \n" +
                    "   MailCity, MailState, MailPostalCode, MailAddressKey, Phone, Extension, \n" +
                    "   Fax, PhoneAltType, Home, PhoneAltType2, MobilePhone, PhoneOther, Remarks, \n" +
                    "   Title, OwnerKey_FK, Email, URL, StatusID, ActiveFlag, SSN_TaxID, FlagPhysicalAddr, \n" +
                    "   FlagAccountingAddr, FlagPrimaryContact, FlagCompany, PositionID, TitleID, \n" +
                    "   Salutation, CreatedByID, DateAdded, DateModified, SortName, OwnerID, \n" +
                    "   FlagContact, FlagUseOwnerPhone, FlagUseOwnerFax, FlagUseOwnerAddress, \n" +
                    "   CommMethodID, FlagPhoneBookOnly, LicenseNbr, UserField1)\n" +
                    "values\n" +
                    "  ('${userRecord.firstName} ${userRecord.lastName}', 'I', ${userReferenceID}, '${userRecord.company}', 'A', NULL, NULL, \n" +
                    "   NULL, NULL, NULL, NULL, NULL, NULL, NULL, \n" +
                    "   NULL, NULL, NULL, NULL, NULL, NULL, \n" +
                    "   NULL, NULL, NULL, NULL, NULL, NULL, \n" +
                    "   '', NULL, ${nameMasterOwnerKey}, NULL, NULL, NULL, 'Y', \n" +
                    "   NULL, NULL, NULL, NULL, \n" +
                    "   NULL, NULL, NULL, '${userRecord.firstName}', 'jason', '${timestamp}', \n" +
                    "   '${timestamp}', NULL, NULL, NULL, NULL, \n" +
                    "   NULL, NULL, NULL, 'N', \n" +
                    "   NULL, NULL)";


            if(aimsql.updateCount == 1){
                userRecord.aimContactID = userReferenceID
                userRecord.save(flush: true, failOnError: true);
            }


        }


        return 'good'
    }




}