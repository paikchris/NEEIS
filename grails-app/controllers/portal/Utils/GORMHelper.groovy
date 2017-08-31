package portal.Utils

import groovy.json.JsonSlurper
import groovy.sql.Sql
import groovy.xml.*
import portal.DAO.AIMSQL;
import grails.util.Environment

class GORMHelper {
    def getDomainClassList(){
        return grailsApplication.getArtefacts("Domain")*.clazz
    }
    def getPublicDomainClassList(){
        return grailsApplication.getArtefacts("Domain")*.clazz
    }
    def extractProperties(obj) {
        obj.getClass()
                .declaredFields
                .findAll { !it.synthetic }
                .collectEntries { field ->
            [field.name, obj."$field.name"]
        }
    }

    def getResultMap(record){
        HashMap result = [
                value: true,
                *:extractProperties(record)
        ]

//        record.getClass().declaredFields.findAll { !it.synthetic }.each {
//            log.info it
//        }
        return result
    }

}
