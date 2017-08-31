package portal

import grails.transaction.Transactional
import grails.util.Holders
import groovy.json.JsonBuilder


@Transactional
class UtilService {
    def grailsApplication = Holders.grailsApplication
    def mySqlService


    String getOnlyPackageName(Class c){
        String s = c.package.toString()
        return s.replace('package','').trim()
    }

    String gormResultsToJSObject(List results){
        ArrayList resultCollection = mySqlService.getResultCollection(results)
        new JsonBuilder(resultCollection).toString()
    }





}
