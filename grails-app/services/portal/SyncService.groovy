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

        syncLog("LIMITS:")
        importMissingLimits()

        syncLog("FORMS:")
        buildFormIDArrays()
        syncLog("TODO: IMPORT FORMS")
        importFormsFromAIM()


        return "<span style='white-space:pre; font-size:10px'>" + syncLog.text+  "</span>"
    }

    def checkForUpdates(){
        lastSynced()
        updatesNeeded = 0
        checkOnly = true

        def tablesToSync = grailsApplication.config.grails.mysqlToAimTableMap

        initializeSyncLog()
        syncLog("CHECKING SYNC STATUS")

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
        syncLog("LIMITS:")
        importMissingLimits()

        syncLog("FORMS:")
        importFormsFromAIM()

        syncLog("TOTAL UPDATES NEEDED: $updatesNeeded")

        updatesNeeded = 0
        checkOnly = false
        return "<span style='white-space:pre; font-size:10px'>" + syncLog.text+  "</span>"
    }

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
        Class mysqlTable = mySqlService.getClazz(tableName)
        String aimsqlTableName = mySqlService.getAimTable(tableName)
        Map columnMap = mysqlTable.columnMap

        syncLog("\tIMPORT MISSING RECORDS FOR ${tableName.toUpperCase()}")

        //GET ROWS FROM AIMSQL TABLE, AND ITERATE THROUGH ALL COVERAGES
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
    def importMissingPropertiesForTableBACKUP(String tableName){
        Class mysqlTable = mySqlService.getClazz(tableName)
        String aimsqlTableName = mySqlService.getAimTable(tableName)
        Map<String,String> columnMap = mysqlTable.columnMap
        def aimPrimaryKey = mysqlTable.aimPrimaryKey
        def aimsqlRows = aimSqlService.selectAllFromTableWithFormatting(aimsqlTableName)


        syncLog("\tCHECKING COLUMNS ARE SYNCED FOR: ${tableName}")
        syncLog("\t${columnMap}")
        def rowsInMysqlTable = mysqlTable.list()

        def importedCount = 0
        rowsInMysqlTable.each{
            def mysqlRow = it
            def aimRow = mySqlService.getAimRecord(mysqlRow)
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


            }
        }

        if(importedCount == 0){
            syncLog('\t\tNo Missing Column Information')
        }
        else{
            syncLog('\t\tImported ' + importedCount + " Column Info")
        }
    }
    def importMissingPropertiesForTable(String tableName){
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


    /*********** DEPRECATED **********/

    //IMPORT COVERAGE CLASSES FROM AIM THAT DON'T EXIST
    def importFromAIM_Coverages(){
        syncLog("IMPORT MISSING COVERAGES")
        //GET ROWS FROM AIMSQL 'COVERAGE' TABLE, AND ITERATE THROUGH ALL COVERAGES
        def results = aimSqlService.selectAllFromTableWithFormatting("Coverage")
        def importedCount = 0
        results.each{
            //CHECK IF COVERAGE EXISTS IN MYSQL, IF IT DOES NOT EXIST INSERT INTO MYSQL
            def coverageRecord = Coverages.findByCoverageCode(it.CoverageID)
            if(coverageRecord == null){
                importedCount++
                syncLog('\t' + it.CoverageID)
                coverageRecord = new portal.Coverages(coverageCode: it.CoverageID, coverageName: it.Description, activeFlag: it.ActiveFlag)
                coverageRecord.save(flush: true, failOnError: true)
            }
        }

        if(importedCount == 0){
            syncLog('\tNo Missing Coverages')
        }
        else{
            syncLog('\tImported ' + importedCount + " Coverages")
        }

    }



}
