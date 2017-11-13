package portal

import grails.transaction.Transactional
import grails.util.Holders
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.apache.commons.lang3.StringUtils
import org.codehaus.groovy.grails.commons.DefaultGrailsDomainClassProperty
import org.codehaus.groovy.grails.commons.GrailsDomainClass
import org.codehaus.groovy.grails.plugins.DomainClassGrailsPlugin
import portal.DAO.AIMSQL
import java.time.*
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle


/*
OVERALL SYNC STRATEGY:
1. Get new Objects (with columns) from DMU that havn't been yet created in Mysql
2. Check updated Objects ID to DMU, if the object no longer exists in DMU, mark INACTIVE in mysql

 */

@Transactional
class SyncService {
    def grailsApplication = Holders.grailsApplication

    def aimSqlService
    def mySqlService
    def dateTimeService
    def syncLog
    def jsonOutput = new JsonOutput()
    def jsonSlurper = new JsonSlurper()
    static updatesNeeded = 0
    boolean checkOnly = false


    /*********** LOGGING METHODS**********/
    def initializeSyncLog(){
        def syncLogFilePath = grailsApplication.config.grails.syncLogPath 
        log.info syncLogFilePath
        new File(syncLogFilePath).delete()
        syncLog = new File(syncLogFilePath)

        syncLog(dateTimeService.getNeeisLocalDateTime())
    }

    def syncLog(logText){
        log.info logText
        syncLog << logText + "\n"
    }

    /*********** METHODS**********/
    def syncAllWithDMU(){
        def tablesToSync = grailsApplication.config.grails.mysqlToAimTableMap

        initializeSyncLog()
        syncLog("SYNCING DATA WITH DMU")

        /*TEST*/
//        importMissingPropertiesForTable('Products')
//        importMissingLimits()
//        mySqlService.getNonNullableColumnsList('Products')
        /*TEST*/

        syncLog("\tCHECKING MYSQL TABLE COMPATIBILITY WITH AIM")
        tablesToSync.each{
            def mysqlTableName = it.key
            def compatibility = ""
            if(isCompatibleWithAim(mysqlTableName) == true){
                compatibility = "GOOD"
            }
            else{
                compatibility = "NOT COMPATIBLE"
            }
            syncLog("\t${mysqlTableName.toUpperCase()} COMPATIBILITY: ${compatibility}")
        }

        tablesToSync.each{
            def mysqlTableName = it.key
            syncLog(mysqlTableName.toUpperCase() + ": ")
            importMissingRecordsForTable(mysqlTableName)

            importMissingPropertiesForTable(mysqlTableName)
        }

        //MAKE SURE LIMIT AND DEDUCT ARRAYS ARE BUILT
//        buildLimitArrays()

//        syncLog("LIMITS:")
//        importMissingLimits()

//        syncLog("FORMS:")
//        buildFormIDArrays()
//        syncLog("TODO: IMPORT FORMS")
//        importFormsFromAIM()


        return renderSyncLogHTML(syncLog.text)
    }

    def checkForUpdates(){
        lastSynced()
        updatesNeeded = 0
        checkOnly = true

        //SETUP
        def tablesToSync = grailsApplication.config.grails.mysqlToAimTableMap
        initializeSyncLog()
        syncLog("CHECKING SYNC STATUS")
        syncLog("\tCHECKING MYSQL TABLE COMPATIBILITY WITH AIM")

        log.info tablesToSync

        //BEGIN SYNC
        tablesToSync.each{
            def mysqlTableName = it.key
            def compatibility = ""
            if(isCompatibleWithAim(mysqlTableName) == true){
                compatibility = "GOOD"
            }
            else{
                compatibility = "NOT COMPATIBLE"
            }
            syncLog("\t${mysqlTableName.toUpperCase()} COMPATIBILITY: ${compatibility}")
        }

        tablesToSync.each{
            def mysqlTableName = it.key
            syncLog(mysqlTableName.toUpperCase() + ": ")
            importMissingRecordsForTable(mysqlTableName)
            importMissingPropertiesForTable(mysqlTableName)
        }

        syncLog("TOTAL UPDATES NEEDED: $updatesNeeded")

        updatesNeeded = 0
        checkOnly = false
        return renderSyncLogHTML(syncLog.text)
    }

    def quickCheck(){
        updatesNeeded = 0
        checkOnly = true

        //SETUP
        def tablesToSync = grailsApplication.config.grails.mysqlToAimTableMap
        initializeSyncLog()
        syncLog("CHECKING SYNC STATUS")
        syncLog("\tCHECKING MYSQL TABLE COMPATIBILITY WITH AIM")

        //BEGIN SYNC
        tablesToSync.each{
            def mysqlTableName = it.key
            syncLog(mysqlTableName.toUpperCase() + ": ")
            importMissingRecordsForTable(mysqlTableName)
            importMissingPropertiesForTable(mysqlTableName)
        }

        syncLog("TOTAL UPDATES NEEDED: $updatesNeeded")

        updatesNeeded = 0
        checkOnly = false
        return updatesNeeded
    }

    //PRINT LAST SYNCED DATE AND TIME TO LOG
    def lastSynced(){
        def syncLogFilePath = grailsApplication.config.grails.syncLogPath

        try{
            def syncFile = new File(syncLogFilePath)
            def lines = syncFile.readLines()
            log.info("LAST SYNCED")
            log.info(lines[0])
        }
        catch(Exception e){

        }

    }

    //CHECK DOMAIN CLASS TO SEE IF TYPE AND CONSTRAINTS ARE CORRECT, RETURNS TRUE IF TYPES ARE COMPATIBLE
    boolean isCompatibleWithAim(String tableName){
        Class mysqlTable = mySqlService.getClazz(tableName)
        String mysqlTableName = tableName
        String aimsqlTableName = mySqlService.getAimTable(tableName)
        Map columnMap = mysqlTable.columnMap

        boolean isCompatible = true

        columnMap.each{
            def mysqlColumnName = it.key
            def aimsqlColumnName = it.value

            Class mysqlColClass = mySqlService.getClassTypeOfColumn(mysqlTableName, mysqlColumnName)
            Class aimsqlColClass = aimSqlService.getClassTypeOfColumn(aimsqlTableName, aimsqlColumnName)

            if(mysqlColClass != aimsqlColClass){
                log.info("INCOMPATIBLE TYPES FOR COLUMN: $mysqlColumnName - $aimsqlColumnName")
                log.info("MYSQL: $mysqlColClass, AIMSQL $aimsqlColClass")
                isCompatible = false;
            }
        }

        return isCompatible
    }

    /*********** IMPORT METHODS**********/

    //IMPORT RECORDS FROM AIM THAT DON'T EXIST
    def importMissingRecordsForTable(String tableName){
        /*
        IMPORT RULES:
        1. IMPORT MISSING ROWS
        2. ENSURE NON-NULLABLE COLUMNS IN MYSQL ARE NOT NULL DURING IMPORT
         */
        Class mysqlTable = mySqlService.getClazz(tableName)
        String aimsqlTableName = mySqlService.getAimTable(tableName)
        Map columnMap = mysqlTable.columnMap
        ArrayList nonNullableColumns = mySqlService.getNonNullableColumnsList(tableName)

        syncLog("\tIMPORT MISSING RECORDS FOR ${tableName.toUpperCase()}")

        //GET ROWS FROM AIMSQL TABLE, AND ITERATE THROUGH ALL ROWS
        def aimsqlRows = aimSqlService.selectAllFromTableWithFormatting(aimsqlTableName)
        def importedCount = 0

        aimsqlRows.each{
            //CHECK IF RECORD EXISTS IN MYSQL, IF IT DOES NOT EXIST INSERT INTO MYSQL
            def aimSqlRecord = it
            def aimPrimaryKey = mysqlTable.aimPrimaryKey
            def mysqlRecord = mysqlTable.find("from ${tableName} as r where r.${mysqlTable.mysqlPrimaryKey}='${aimSqlRecord[aimPrimaryKey]}'")
            if(mysqlRecord == null){
                if(checkOnly){
                    updatesNeeded++
                }
                else{
                    importedCount++
                    syncLog("\t\tIMPORTING ${it[mysqlTable.aimPrimaryKey]} FROM AIM")

                    def insertMap = [:]
                    columnMap.each{
                        def mysqlColumn = it.key
                        def aimsqlColumn = it.value

                        insertMap[mysqlColumn] = aimSqlRecord[aimsqlColumn]
                    }

                    //MAKE SURE THE ROW TO INSERT DOES NOT HAVE NON-NULLABLE COLUMNS THAT ARE NULL
                    nonNullableColumns.each{
                        def nonNullableColumnName = it
                        if(insertMap.containsKey(nonNullableColumnName)){
                            //Do nothing
                        }
                        else{
                            //ENTER BLANK VALUE TO AVOID NON NULL VIOLATION
                            def colClassType = (mySqlService.getClassTypeOfColumn(tableName, nonNullableColumnName))

                            if(colClassType == "class java.lang.String"){
                                insertMap[nonNullableColumnName] = ""
                            }
                            else{
                                insertMap[nonNullableColumnName] = 0
                            }
                        }

                    }

                    mysqlRecord = mysqlTable.newInstance(insertMap)

                    mysqlRecord.save(flush: true, failOnError: true)
                }

            }
        }

        if(importedCount == 0){
            syncLog('\t\tNo Missing Records')
        }
        else{
            syncLog('\t\tImported ' + importedCount + " records")
        }

    }

    //FILL IN MISSING PROPERTIES FOR RECORDS FROM AIM
    def importMissingPropertiesForTable(String tableName){
        /*
        IMPORT RULES:
        1. IMPORT MISSING COLUMN DETAILS
        2. MARK DELETED RECORDS IN AIMSQL INACTIVE IN MYSQL
         */
        Class mysqlTable = mySqlService.getClazz(tableName)
        String aimsqlTableName = mySqlService.getAimTable(tableName)
        Map<String,String> columnMap = mysqlTable.columnMap
        def aimPrimaryKey = mysqlTable.aimPrimaryKey
        def mysqlPrimaryKey = mysqlTable.mysqlPrimaryKey

        def aimsqlRows = aimSqlService.selectAllFromTableWithFormatting(aimsqlTableName)

        syncLog("\tCHECKING COLUMNS ARE SYNCED FOR: ${tableName}")
        syncLog("\t${columnMap}")
        def rowsInMysqlTable = mysqlTable.list()

        def importedCount = 0
        rowsInMysqlTable.each{
            def mysqlRow = it

            //FIND CORRESPONDING RECORD IN AIM
            def aimRow = aimsqlRows.find{
                it[aimPrimaryKey] == mysqlRow[mysqlPrimaryKey]
            }
            if(aimRow != null){
                columnMap.each{
                    def mysqlColumn = it.key
                    def aimsqlColumn = it.value

                    def mysqlColumnVal = mysqlRow[mysqlColumn]
                    def aimsqlColumnVal = aimRow[aimsqlColumn]


                    //IF VALUES ARE A STRING, TRIM WHITESPACE (DO THIS FILTER FIRST, TO CATCH BLANK SPACES THAT SHOULD BE NULL)
                    if(mysqlColumnVal.getClass() == String){
                        mysqlColumnVal = mysqlColumnVal.trim()
                    }
                    if(aimsqlColumnVal.getClass() == String){
                        aimsqlColumnVal = aimsqlColumnVal.trim()
                    }

                    //IF MYSQL VAL IS NULL, SHOULD BE EQUAL TO THE AIM VALUE OF '' OR NULL
                    if(mysqlColumnVal == null && (aimsqlColumnVal =='' || aimsqlColumnVal == null ) ){
                        mysqlColumnVal = aimsqlColumnVal
                    }

                    if(!mysqlColumnVal.equals(aimsqlColumnVal) ){
                        if(checkOnly){
                            updatesNeeded++
                        }
                        else{
                            syncLog("\t\tFIXING ${mysqlRow[mysqlTable.mysqlPrimaryKey]}, CHANGING ${mysqlColumn} FROM ${mysqlColumnVal } TO ${aimsqlColumnVal}")
                            def updateRecord = mysqlTable.find("from ${tableName} as r where  r.${mysqlTable.mysqlPrimaryKey}='${aimRow[aimPrimaryKey]}'")
                            updateRecord[mysqlColumn] = aimsqlColumnVal
                            updateRecord.save(flush: true, failOnError: true)
                            importedCount++
                        }
                    }

                    //ACP_OPERATIONS TABLE IN AIM DOES NOT HAVE A ACTIVE FLAG COLUMN. ALL RECORDS ARE ACTIVE
                    if(tableName == 'Operations'){
                        //SINCE THIS OPERATION RECORD EXISTS IN THE ACP_OPERATIONS TABLE IT IS ACTIVE
                        if(mysqlRow.activeFlag == 'N'){
                            syncLog("\t\t${mysqlRow[mysqlTable.mysqlPrimaryKey]} IS ACTIVE IN AIM, MAKING ${mysqlRow[mysqlTable.mysqlPrimaryKey]} ACTIVE IN MYSQL")
                            mysqlRow.activeFlag = 'Y'
                            mysqlRow.save(flush: true, failOnError: true)
                            importedCount++
                        }
                    }
                }
            }
            else{
                //IF THIS ROW NO LONGER EXISTS IN AIMSQL, DEACTIVATE IT IN MYSQL
                if(mysqlRow.activeFlag == 'Y'){
                    syncLog("\t\t${mysqlRow[mysqlTable.mysqlPrimaryKey]} WAS DELETED IN AIMSQL, DEACTIVATING ${mysqlRow[mysqlTable.mysqlPrimaryKey]} ")
                    mysqlRow.activeFlag = 'N'
                    mysqlRow.save(flush: true, failOnError: true)
                    importedCount++
                }

            }
        }

        if(importedCount == 0){
            syncLog('\t\tNo Missing Column Information')
        }
        else{
            syncLog('\t\tImported ' + importedCount + " Column Info")
        }
    }

    //USE PRODUCTS LIST TO IMPORT LIMITS
    def importMissingLimits(){
        def aimProducts = aimSqlService.selectAllFromTableWithFormatting("Product")

        def importedCount = 0
        aimProducts.each{
            def productID = it.ProductID
            def mysqlProductRecord =  Products.findByProductID(it.ProductID)

            //LOOP THROUGH ALL COVERAGE LIMITS
            def limitString = it.Limits
            def deductString = it.Deduct

            limitString.split("\\r\\n|\\n|\\r").each{
                if(it.trim().size() > 0 && it.split("\t").size() > 1){
                    //GET LIMIT DETAILS
                    def limitVal = it.split("\t")[0]
                    def limitName = it.split("\t")[1]
                    limitName = limitName.substring(limitName.indexOf(':') + 1)

                    //GET DEDUCT DETAILS IF DEDUCT EXISTS for LIMITNAME
                    def deductVal = ""
                    def deductName = ""

                    deductString.split("\\r\\n|\\n|\\r").each{
                        if(it.trim().size() > 0 && it.split("\t").size() > 1){
                            deductName = it.split("\t")[1]
                            deductName = deductName.substring(deductName.indexOf(':') + 1)
                            if(deductName == limitName){
                                deductVal = it.split("\t")[0]
                            }
                            else{
                                deductVal=""
                                deductName = ""
                            }
                        }
                    }

                    def covLimitCode = productID.replaceAll("\\s","") + "_" + limitName.split("(?<=[\\S])[\\S]*\\s*").join().toLowerCase().replaceAll("[^A-Za-z]+", "")

                    def covLimitRecord = CoverageLimits.findByCovLimCode(covLimitCode)


                    if(covLimitRecord == null){
                        if(checkOnly){
//                            log.info "HELLO $covLimitCode"
                            updatesNeeded++
                        }
                        else{
                            //IF COV LIMIT RECORD IS NULL
                            covLimitRecord = new portal.CoverageLimits(productID: productID, covLimCode: covLimitCode, covLimName: limitName,
                                    covLimit: limitVal, covDeductible: deductVal)
                            covLimitRecord.save(flush: true, failOnError: true)
                            syncLog("\tIMPORTING LIMIT " + covLimitCode)
                            importedCount++
                        }

                    }
                    else{

                    }


                }
            }
        }

        if(importedCount == 0){
            syncLog('\tNo Missing Limit Information')
        }
        else{
            syncLog('\tImported ' + importedCount + " Limits")
        }
    }

    def buildLimitArrays(){
        def products = Products.list()

        products.each{
            def deductString = it.deduct
            def limitString = it.limits
            def deductArray = []
            def limitArray = []
            if(limitString != null){
                limitString.split("\\r\\n|\\n|\\r").each{
                    if(it.trim().size() > 0 && it.split("\t").size() > 1){
                        def tempLimitMap = [:]
                        //GET LIMIT DETAILS
                        def limitVal = it.split("\t")[0]
                        def limitDescription = it.split("\t")[1]
                        limitDescription = limitDescription.substring(limitDescription.indexOf(':') + 1)

                        tempLimitMap.limitAmount = limitVal
                        tempLimitMap.limitDescription = limitDescription

                        limitArray << tempLimitMap
                    }
                }
            }

            if(deductString != null) {
                deductString.split("\\r\\n|\\n|\\r").each {
                    if (it.trim().size() > 0 && it.split("\t").size() > 1) {
                        def tempDeductMap = [:]
                        //GET LIMIT DETAILS
                        def deductAmount = it.split("\t")[0]
                        def deductDescription = it.split("\t")[1]
                        deductDescription = deductDescription.substring(deductDescription.indexOf(':') + 1)

                        tempDeductMap.deductAmount = deductAmount
                        tempDeductMap.deductDescription = deductDescription

                        deductArray << tempDeductMap
                    }
                }
            }
            it.limitArray = jsonOutput.toJson(limitArray)
            it.deductArray = jsonOutput.toJson(deductArray)
        }

    }

    def importFormsFromAIM(){
        //LOOP THROUGH ALL AIMSQL PRODUCTS, CHECK THE FORMS FOR EACH PRODUCTS AND ADDS MISSING FORMS TO MYSQL
        def results = aimSqlService.selectAllFromTableWithFormatting('Product')

        def formRecord
        def importedCount = 0
        def updatedCount = 0
        results.each{

            def productID = it.ProductID
            def allFormsForProduct = it.Endorse
//            log.info "CHECKING $productID"

            if(allFormsForProduct!=null){
                allFormsForProduct.split("\\r\\n|\\n|\\r").each{
                    if(StringUtils.countMatches(it, ' - ') >= 1){
                        def formID = it.split(' - ')[0]
                        def formName = it.substring(it.lastIndexOf(' - ') + 1)
                        formName = formName.substring(formName.indexOf(':') + 1)
                        if(formID.trim().size() > 0){
                            formRecord = Forms.findByFormID(formID)
                            def usageArray = []
                            if(formRecord == null){
                                if(checkOnly){
                                    updatesNeeded++
                                }
                                else{
                                    usageArray.push(productID)
                                    formRecord = new portal.Forms(formID: formID, formName: formName, usages: jsonOutput.toJson(usageArray), activeFlag: 'Y')
                                    formRecord.save(flush: true, failOnError: true)
                                    syncLog("\tIMPORTING FORM: ${formID}")
                                    importedCount++
                                }

                            }
                            else{
                                def usageString = formRecord.usages
                                usageArray = jsonSlurper.parseText(usageString)

                                String prodIDString = productID
                                if(usageArray.contains(prodIDString) == false){
                                    if(checkOnly){
                                        updatesNeeded++
                                    }
                                    else{
                                        usageArray.push(productID)

                                        formRecord.usages = jsonOutput.toJson(usageArray)
                                        formRecord.save(flush: true, failOnError: true)
                                        updatedCount++
//                                   syncLog("\tUPDATING FORM: ${formID}")
                                    }

                                }

                            }
                        }


                    }
                }
            }

        }

        if(importedCount == 0){
            syncLog('\tNo Missing Forms')
        }
        else{
            syncLog('\tImported ' + importedCount + " Limits")
        }
        if(updatedCount == 0){
            syncLog('\tNo Updates Needed')
        }
        else{
            syncLog('\tUpdated ' + updatedCount + " Limits")
        }
    }

    //CAUTION: WILL OVERWRITE ANY CUSTOMIZATION DONE ON WEBSITE
    def buildFormIDArrays(){
        def aimProducts = aimSqlService.selectAllFromTableWithFormatting("Product")
        def importedCount = 0
        aimProducts.each{
            def productID = it.ProductID
            def productRecord = Products.findByProductID(productID)

            //LOOP THROUGH ALL FORMS TO BUILD FORM LIST ARRAY
            def allFormsForProduct = it.Endorse
            def formIDArray = []
            if(allFormsForProduct !=null){
                allFormsForProduct.split("\\r\\n|\\n|\\r").each{
                    if(StringUtils.countMatches(it, ' - ') >= 1){
                        def formID = it.split(' - ')[0]

                        formIDArray.push(formID)
                    }
                }
            }


            productRecord.formIDS = jsonOutput.toJson(formIDArray)
            productRecord.save()
            syncLog("\tBUILDING FORM ID ARRAY FOR ${productID}")
        }
    }

    /***********RENDER SYNC LOG TO BROWSER **********/
    def renderSyncLogHTML(logText){
        def renderString =
                "<div style='font-size:10px; line-height:1.2em; text-align:left'>" +
                "   <div style='white-space:pre; overflow:auto; max-height:600px'>" + logText +  "</div>" +
                "</div>"

        return renderString
    }



    /***********DATA SAVING AND UPDATING FUNCTIONS **********/
    //CREATE METHODS
    def createCoverage(params){
        log.info "CREATING NEW COVERAGE RECORD "
        log.info params

        def renderMessage = "Success"

        try{
            def coverageCode = params.coverageCode.toUpperCase()
            def coverageName = params.coverageName
            def activeFlag = params.activeFlag

            //SAVE CHANGES TO AIM
            aimSqlService.insertRecord("Coverage", [CoverageID: "'${coverageCode}'", Description: "'${coverageName}'", ActiveFlag: "'${activeFlag}'"])

            Coverages coverageRecord = new Coverages (coverageCode: coverageCode, coverageName: coverageName, activeFlag:activeFlag, packageFlag: 'N', coverageOffered: 'N', listTypeID: 'C')
            coverageRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        return renderMessage
    }

    def createOperation(params){
        log.info "CREATING NEW OPERATION RECORD "
        log.info params

        def renderMessage = "Success"

        try{
            def operationID = params.operationID.toUpperCase()
            def description = params.operationDescription
            def activeFlag = params.activeFlag

            //SAVE CHANGES TO AIM
            aimSqlService.insertRecord("LkpCodes", [StatusID: "'${operationID}'", Description: "'${description}'", ActiveFlag: "'${activeFlag}'", TypeID: "'OPS'"])

            Operations operationRecord = new Operations(operationID: operationID, description: description, activeFlag:activeFlag)
            operationRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        return renderMessage
    }

    def deleteOperation(params){
        log.info "DELETING OPERATION RECORD "
        log.info params

        def renderMessage = "Success"

        try{
            def operationID = params.operationID
            def description = params.operationDescription
            def activeFlag = params.activeFlag

            //DELETE IN AIM
            aimSqlService.insertRecord("LkpCodes", [StatusID: "'${operationID}'", Description: "'${description}'", ActiveFlag: "'${activeFlag}'"])

            Operations operationRecord = new Operations(operationID: operationID, description: description, activeFlag:activeFlag)
            operationRecord.save(flush: true, failOnError: true)
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error " + exceptionAsString
        }

        return renderMessage
    }

    //SAVE CHANGES TO MYSQL AND AIM
    def saveOperationsChanges(params){
        log.info "SAVING OPERATIONS CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def operationID = params.operationID
            def description = params.operationDescription
            def activeFlag = params.activeFlag
            def bindingAuthority = params.bindingAuthority
            def coveragePackageMap = jsonSlurper.parseText(params.coveragePackageMap)
            def coverageProductMap = jsonSlurper.parseText(params.coverageProductMap)
            def uwQuestionsMap = jsonSlurper.parseText(params.uwQuestionsMap)
            def requiredQuestionsMap = jsonSlurper.parseText(params.requiredQuestionsMap)
            def weightOrderedRequiredQuestions = jsonSlurper.parseText(params.weightOrderedRequiredQuestions)
            def monolineCoveragesArray = jsonSlurper.parseText(params.monolineArray)


            log.info operationID
            Operations operationRecord = Operations.findByOperationID(operationID)

            operationRecord.description = description
            operationRecord.activeFlag = activeFlag
            operationRecord.bindingAuthority = bindingAuthority
            operationRecord.coveragePackageMap = jsonOutput.toJson(coveragePackageMap)
            operationRecord.coverageProductMap = jsonOutput.toJson(coverageProductMap)
            operationRecord.underwriterQuestionsMap = jsonOutput.toJson(uwQuestionsMap)
            operationRecord.requiredQuestionsMap = jsonOutput.toJson(requiredQuestionsMap)
            operationRecord.weightOrderedRequiredQuestions = jsonOutput.toJson(weightOrderedRequiredQuestions)
            operationRecord.monolineCoverages = jsonOutput.toJson(monolineCoveragesArray)

            operationRecord.save(flush: true, failOnError: true)

            //SAVE CHANGES TO AIM
            aimSqlService.updateRecord("LkpCodes", [Description: "'${description}'", ActiveFlag: "'${activeFlag}'"], [StatusID: "'${operationID}'", TypeID: "'OPS'"])
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }

        log.info renderMessage
        return renderMessage
    }

    def saveProductChanges(params){
        log.info "SAVING PRODUCT CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def productID = params.productID
            def formIDArray = jsonSlurper.parseText(params.formIDArray)
            def limitArray = jsonSlurper.parseText(params.limitArray)
            def deductArray = jsonSlurper.parseText(params.deductArray)
            def requiredQuestions = jsonSlurper.parseText(params.requiredQuestions)
            def uwQuestions = jsonSlurper.parseText(params.uwQuestions)
            def productMap = jsonSlurper.parseText(params.productMap)
            def additionalOptionsArray = jsonSlurper.parseText(params.additionalOptionsArray)



            def limitString = ""
            limitArray.each{
                def limitDescription = it.limitDescription
                def limitAmount = it.limitAmount
                limitString = limitString + limitAmount + "\t" + limitDescription + "\n"
            }

            def deductString = ""
            deductArray.each{
                def deductDescription = it.deductDescription
                def deductAmount = it.deductAmount
                deductString = deductString + deductDescription + "\t" + deductAmount + "\n"
            }

            Products productRecord = Products.findByProductID(productID)


            productRecord.productID = productMap.productID
            productRecord.formIDS = jsonOutput.toJson(formIDArray)
            productRecord.productName = productMap.productName
            productRecord.marketCompanyID = productMap.marketCompanyID
            productRecord.riskCompanyID = productMap.riskCompanyID
            productRecord.coverage = productMap.coverage
            productRecord.rateCode = productMap.rateCode
            productRecord.terms = productMap.terms
            productRecord.limitArray = jsonOutput.toJson(limitArray)
            productRecord.deductArray = jsonOutput.toJson(deductArray)
            productRecord.limits = limitString
            productRecord.deduct = deductString
            productRecord.requiredQuestions = jsonOutput.toJson(requiredQuestions)
            productRecord.uwQuestions = jsonOutput.toJson(uwQuestions)
            productRecord.activeFlag = (productMap.activeFlag == 'Y' || productMap.activeFlag == 'N') ? productMap.activeFlag : 'N'
            productRecord.additionalOptionsArray = jsonOutput.toJson(additionalOptionsArray)

            productRecord.save(flush: true, failOnError: true)

            //SAVE CHANGES TO AIM
            aimSqlService.updateRecord("Product", [
                    CoverageID: "'${productMap.coverage}'",
                    ActiveFlag: "'${(productMap.activeFlag == 'Y' || productMap.activeFlag == 'N') ? productMap.activeFlag : 'N'}'",
                    CompanyID: "'${productMap.riskCompanyID}'",
                    BillCompanyID: "'${productMap.marketCompanyID}'",
                    Description: "'${productMap.productName}'",
                    Limits: "'${limitString}'",
                    Deduct: "'${deductString}'",
                    Subject: "'${productMap.terms}'",
                    Endorse: "'${productMap.forms}'"
            ], [ProductID: "'${productID}'"])
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }


        return renderMessage
    }

    def saveCoverageChanges(params){
        log.info "SAVING COVERAGE CHANGES"
        log.info params

        def renderMessage = "Success"

        try{
            def coverageObjectMap = jsonSlurper.parseText(params.coverageMap)


            Coverages coverageRecord = Coverages.findByCoverageCode(coverageObjectMap.coverageCode)

            coverageRecord.coverageCode = coverageObjectMap.coverageCode
            coverageRecord.coverageName = coverageObjectMap.coverageName
            coverageRecord.listTypeID = coverageObjectMap.listTypeID
            coverageRecord.coverageOffered = coverageObjectMap.coverageOffered
            coverageRecord.activeFlag = coverageObjectMap.activeFlag
            coverageRecord.packageFlag = coverageObjectMap.packageFlag

            coverageRecord.save(flush: true, failOnError: true)

            //SAVE CHANGES TO AIM
            aimSqlService.updateRecord("Coverage", [
                    CoverageID: "'${coverageRecord.coverageCode}'",
                    Description: "'${coverageRecord.coverageName}'",
                    ListTypeID: "'${coverageRecord.listTypeID}'",
                    ActiveFlag: "'${coverageRecord.activeFlag}'"
            ], [CoverageID: "'${coverageRecord.coverageCode}'"])
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            renderMessage = "Error"
        }


        return renderMessage
    }
}
