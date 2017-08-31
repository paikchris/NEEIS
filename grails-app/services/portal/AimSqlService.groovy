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

}
