package portal

import grails.transaction.Transactional
import grails.util.Holders
import groovy.json.JsonBuilder
import groovy.xml.*
import java.text.NumberFormat;
import java.util.Locale;


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
        return new JsonBuilder(resultCollection).toString()
    }

    String gormResultsToJSObject(Object result){
        def resultCollection = mySqlService.getRowResultMap(result)
        return new JsonBuilder(resultCollection).toString()
    }


    Float moneyStringToFloat(moneyString){
        return moneyString.replaceAll('[$,]', '').toFloat()
    }

    def floatToMoneyString(floatAmount){
        Locale usd = new Locale("en", "US")
        NumberFormat usFormat = NumberFormat.getCurrencyInstance(usd);

        return usFormat.format(floatAmount)
    }

    String xmlClean(str){
        if(str != null){
            //Make sure str is a string
            str = "" + str
            return XmlUtil.escapeXml(str)
        }
        else{
            return ""
        }
    }









}
