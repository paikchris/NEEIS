package portal.Utils

import grails.util.Environment
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import groovy.sql.Sql
import portal.DAO.Intelledox;
import groovy.json.JsonOutput.*
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.StringEscapeUtils;
import portal.DAO.Intelledox;
import portal.RiskType


class ProductHelper {
    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'

    def testLogicLoad(){
        def riskRecord = RiskType.findWhere(riskTypeName: 'Film Projects Without Cast (No Work Comp)');
        def coveragesForRisk =[]

        def coverage =[
            coverage: 'EPKG',
            description: 'Entertainment Package',
            products: []
        ];
        def productsForThisCoverage = [];
        //EXAMPLE FOR Film Projects Without Cast (No Work Comp
        //PIP CHOICE
        def product = [
            id: 'PIP CHOI',
            logic: [],
            optionalLOBs:[],
            optionalProducts:[]
        ]
        String[] logicArray = ['all']
        def productLogicBasis = [];
        productLogicBasis << logicArray
        product.logic = productLogicBasis
        def productRecord = portal.Products.findWhere(productID: product.id);
        def optionalLOBs = portal.ProductLOB.where {
            productID == product.id && optionalLOB == "Y"
        }
        product.optionalLOBs = optionalLOBs.lobCode
        def optionalProducts = portal.ProductLOB.where{
            productID == product.id && optionalProduct == "Y"
        }
        product.optionalProducts = optionalProducts.lobCode
        coverage.products << product

        //PIP 1
        product = [
            id: 'PIP 1',
            logic: []
        ]
        logicArray = ['budget', '<=', '100000']
        productLogicBasis = [];
        productLogicBasis << logicArray
        product.logic = productLogicBasis
        coverage.products << product

        //PIP 2
        product = [
            id: 'PIP 2',
            logic: []
        ]
        logicArray = ['all']
        productLogicBasis = [];
        productLogicBasis << logicArray
        product.logic = productLogicBasis
        coverage.products << product

        //PIP 3
        product = [
            id: 'PIP 3',
            logic: []
        ]
        logicArray = ['budget', '<=', '400000']
        productLogicBasis = [];
        productLogicBasis << logicArray
        product.logic = productLogicBasis
        coverage.products << product

        //PIP 4
        product = [
            id: 'PIP 4',
            logic: []
        ]
        logicArray = ['budget', '<=', '400000']
        productLogicBasis = [];
        productLogicBasis << logicArray
        product.logic = productLogicBasis
        coverage.products << product

        //PIP 5
        product = [
            id: 'PIP 5',
            logic: []
        ]
        logicArray = ['budget', '>', '500000']
        productLogicBasis = [];
        productLogicBasis << logicArray
        product.logic = productLogicBasis
        coverage.products << product
        coveragesForRisk << coverage



        coverage =[
            coverage: 'CGL',
            description: 'Commercial General Liability',
            products: []
        ];
        productsForThisCoverage =[];
        //BARCPKGC_CPK
        product = [
            id: 'BARCPKGC_CPK',
            logic: []
        ]
        logicArray = ['all']
        productLogicBasis = [];
        productLogicBasis << logicArray
        product.logic = productLogicBasis
        coverage.products << product

        //BARCPKGC_CGL
        product = [
            id: 'BARCPKGC_CGL',
            logic: []
        ]
        logicArray = ['all'];
        productLogicBasis = [];
        productLogicBasis << logicArray
        product.logic = productLogicBasis
        coverage.products << product
        coveragesForRisk << coverage

        def allProductsCoverages = JsonOutput.toJson(coveragesForRisk)
        riskRecord.products =  allProductsCoverages;
        riskRecord.save(flush: true, failOnError: true)
    }



    // RETURN MAP WITH COVERAGE AND PRODUCTS
    // [ COVERAGE
    def getProductsForRisk(coveragesAndProducts, submissionDetailMap){
        def returnArray = [];

        //LOOP THROUGH COVERAGES
        coveragesAndProducts.each{
            def allProductsForThisCoverage = it.products
            def returnCoveragesMap = [
                id: it.coverage,
                description: it.description,
                products: []
            ]
            def returnProductsForThisCoverage = [];

            //LOOP THROUGH PRODUCTS FOR THIS COVERAGE
            allProductsForThisCoverage.each{
                def product = it
                log.info it
                //LOGIC TO CHOOSE PRODUCTS
                product.logic.each{
                    if(it.size() == 1){
                        if(it[0] == "all"){
                            returnProductsForThisCoverage << product
                        }
                    }
                    else if(it.size() == 3){
                        if(it[1] == '<'){
                            if(submissionDetailMap[it[0]] < it[2].toInteger()){
                                returnProductsForThisCoverage << product
                            }
                        }else if(it[1] == '>='){
                            if(submissionDetailMap[it[0]] >= it[2].toInteger()){
                                returnProductsForThisCoverage << product
                            }
                        }
                        else if(it[1] == '>'){
                            if(submissionDetailMap[it[0]] > it[2].toInteger()){
                                returnProductsForThisCoverage << product
                            }
                        }
                        else if(it[1] == '<='){
                            if(submissionDetailMap[it[0]] <= it[2].toInteger()){
                                returnProductsForThisCoverage << product
                            }
                        }
                        else if(it[1] == '=='){
                            if(submissionDetailMap[it[0]] == it[2].toInteger()){
                                returnProductsForThisCoverage << product
                            }
                        }
                        else if(it[1] == '!='){
                            if(submissionDetailMap[it[0]] == it[2].toInteger()){
                                returnProductsForThisCoverage << product
                            }
                        }
                    }
                }
                returnCoveragesMap.products = returnProductsForThisCoverage;
                //OPTIONAL LOBS
            }
            returnArray << returnCoveragesMap;
        }


        return returnArray
    }
}
