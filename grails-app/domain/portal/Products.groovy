package portal

import groovy.json.JsonSlurper

class Products {
    static isAimTable = true
    static aimPrimaryKey = 'ProductID'
    static mysqlPrimaryKey = 'productID'
    static columnMap = [
            "productID": "ProductID",
            "productName": "Description",
            "coverage": "CoverageID",
            "lobDist": "LobDistrib",
            "terms": "Subject",
            "forms": "Endorse",
            "agentPct": "AgentComm",
            "grossPct": "GrossComm",
            "riskCompanyID": "CompanyID",
            "marketCompanyID": "BillCompanyID",
            "activeFlag": "ActiveFlag",
            "limits": "Limits",
            "deduct": "Deduct"
    ]

    String productID
    String productName
    String coverage
    String lobDist
    BigDecimal flatPremium
    BigDecimal rate
    String rateBasis
    BigDecimal minPremium

    String nohaOption //I= Included , OF=Optional Flat, OR = Optional w/Rate
    String nohaRate
    String optionalLines //

    String terms
    String forms
    String formIDS
    BigDecimal agentPct
    BigDecimal grossPct
    String rateInfo
    String limits
    String limitArray
    String deduct
    String deductArray

    String riskCompanyID
    String marketCompanyID
    String activeFlag

    String rateCode
    String uwQuestions
    String requiredQuestions

    static constraints = {
        productID unique:true, maxSize: 8
        productName maxSize: 55
        coverage maxSize: 6
        lobDist nullable:true, maxSize: 240
        flatPremium nullable:true, scale: 2, maxSize:32
        rate nullable:true
        rate (scale: 4, maxSize:32)
        rateBasis nullable:true
        minPremium nullable:true

        nohaOption nullable:true
        nohaRate nullable:true
        optionalLines nullable:true

        terms nullable: true
        forms nullable: true
        formIDS nullable: true
        agentPct nullable:true, scale: 4, maxSize:32
        grossPct nullable:true, scale: 4, maxSize:32
        rateInfo nullable:true
        limits nullable: true
        limitArray nullable:true
        deduct nullable: true
        deductArray nullable: true

        riskCompanyID nullable:true, maxSize: 6
        marketCompanyID nullable:true, maxSize:6
        activeFlag nullable:true, maxSize:1, validator:{ it.toUpperCase() == it }

        rateCode nullable: false
        uwQuestions nullable: true
        requiredQuestions nullable: true

    }

    static mapping = {
        rateInfo type: 'text'
        terms type:'text'
        forms type:'text'
        formIDS type:'text'
        limits type:'text'
        limitArray type:'text'
        deduct type:'text'
        deductArray type:'text'
        rateCode defaultValue: 'NONE'
        uwQuestions type:'text'
        requiredQuestions type:'text'
    }

    def getDisplayName(column){
        def names = [
                "productName": "Product Name",
                "productID": "Product ID",
                "coverage": "Coverage"
        ]

        return names[column]
    }
    def getDisplayOrder(){
        def order = [
            "productName",
            "productID",
            "coverage"
        ]
    }
}