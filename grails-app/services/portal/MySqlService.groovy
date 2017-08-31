package portal

import grails.transaction.Transactional
import grails.util.Holders
import org.codehaus.groovy.grails.commons.DefaultGrailsDomainClassProperty
import org.codehaus.groovy.grails.commons.GrailsDomainClass
import org.codehaus.groovy.grails.validation.ConstrainedProperty

@Transactional
class MySqlService {
    def grailsApplication = Holders.grailsApplication
    def aimSqlService
    def utilService

    //GET GRAILS DOMAIN CLASS FROM STRING
    GrailsDomainClass getDomainClass(String tableName){
        String fullClassName = "portal." + tableName
        Class clazz = grailsApplication.getDomainClass(fullClassName).clazz
        GrailsDomainClass table = clazz.newInstance().domainClass

        return table
    }
    Class getClazz(String tableName){
        String fullClassName = "portal." + tableName
        Class clazz = grailsApplication.getDomainClass(fullClassName).clazz
        return clazz
    }

    //GET STRING OF JUST THE DOMAIN NAME
    String getDomainNameFromInstance(Object domainInstance){
        Class c = domainInstance.getClass()
        String s = domainInstance.getClass().toString()
        return s.replace("class ${utilService.getOnlyPackageName(c)}.","")
    }

    ArrayList <DefaultGrailsDomainClassProperty> getColumnPropertiesList(String tableName){
        Class clazz = getClazz(tableName)
        ArrayList <DefaultGrailsDomainClassProperty> columnPropertiesList = clazz.newInstance().domainClass.persistentProperties

        return columnPropertiesList
    }

    //GET LIST OF ALL COLUMNS IN TABLE
    ArrayList getColumnNameList(CharSequence tableName){
        Class clazz = getClazz(tableName)
        ArrayList <DefaultGrailsDomainClassProperty> columnList = clazz.newInstance().domainClass.persistentProperties*.name

        return columnList
    }
    ArrayList getColumnNameList_FromInstance(Object domainInstance){
        String s = getDomainNameFromInstance(domainInstance)

        return getColumnNameList(s)
    }

    //GET PROPERTIES OF THIS COLUMN IN THIS TABLE
    DefaultGrailsDomainClassProperty getColumnProperties(String tableName, String columnName){
        Class clazz = getClazz(tableName)
        ArrayList <DefaultGrailsDomainClassProperty> list = getColumnPropertiesList(tableName)
        DefaultGrailsDomainClassProperty propertyMap = list.find{it.name == columnName}

        return propertyMap
    }

    //GET CLASS TYPE OF MYSQL COLUMN
    Class getClassTypeOfColumn(String tableName, String columnName){
        log.info "$tableName $columnName"
        Class clazz = getClazz(tableName)
        ArrayList <DefaultGrailsDomainClassProperty> list = getColumnPropertiesList(tableName)
        DefaultGrailsDomainClassProperty propertyMap = list.find{it.name == columnName}

        return propertyMap.type
    }

    //GET LIST OF COLUMNS REQUIRED IN TABLE
    ArrayList getColumnList_NonNull(CharSequence tableName){
        Class tableClass = getClazz(tableName)

        def columnList = []
        tableClass.constraints.each{
            Map.Entry constraintEntry = it
            def columnName = constraintEntry.key

            ConstrainedProperty constraints = constraintEntry.value
            if(constraints.nullable == false){
                columnList.push(columnName)
            }
        }

        return columnList
    }

    //GET NAME OF AIM TABLE FROM MYSQL TABLE
    String getAimTable(String mysqlTable){
        def mysqlToAimTableMap = grailsApplication.config.grails.mysqlToAimTableMap
        return mysqlToAimTableMap[mysqlTable]
    }

    //GET AIM RECORD FOR mysql Row
    LinkedHashMap getAimRecord(row){
        def aimTable = getAimTable(row.getDomainClass().getShortName())
        def aimPrimaryKey = row.aimPrimaryKey
        def mysqlPrimaryKey = row.mysqlPrimaryKey
        def recordID = row[mysqlPrimaryKey]

        def where = "${aimPrimaryKey}='${recordID}'"
        return aimSqlService.selectAllFromTableWhereWithFormatting(aimTable, where)[0]
    }

    //GET NAME OF MYSQL TABLE FROM AIM TABLE
    def getMysqlTableFromAimTable(String aimTable) {
        def mysqlToAimTableMap = grailsApplication.config.aimTableMapping

        return mysqlToAimTableMap.find { it.value == aimTable }?.key
    }

    //IS THE MYSQL ROW'S AIM MAPPED COLUMNS SYNCED?
    def isMysqlRowSyncedToAim(mysqlRow){
        def columnMap = mysqlRow.getDomainClass().clazz.columnMap
        def aimRow = getAimRecord(mysqlRow)

        columnMap.each{
            def mysqlColumn = it.key
            def aimsqlColumn = it.value

            if(mysqlRow[mysqlColumn] != aimRow[aimsqlColumn]){
                log.info mysqlColumn
                log.info (mysqlRow[mysqlColumn] + " == " + aimRow[aimsqlColumn])
                log.info "NOT EQUAL"
            }

//            log.info row[mysqlColumn]
        }
    }

    //CONVERT GROOVY ROW RESULT TO LIST OF MAPS
    List getResultCollection(List results){
        ArrayList columnList = getColumnNameList_FromInstance(results[0])
        ArrayList newListOfResults = []
        results.each{
            def row = it
            def rowMap = [:]
           columnList.each {
               def columnName = it
               def columnValue = row[it]
               rowMap["${columnName}"] = columnValue
//               log.info(rowMap.keySet())
           }
            newListOfResults.push(rowMap)
        }

        return newListOfResults
    }










}
