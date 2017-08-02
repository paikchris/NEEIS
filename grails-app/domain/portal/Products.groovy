package portal

class Products {

    String productID
    String aimProductID
    String productName
    String coverage
    String coverageLongName
    String lobs
    BigDecimal flatPremium
    BigDecimal rate
    String rateBasis
    BigDecimal minPremium
    String nohaOption //I= Included , OF=Optional Flat, OR = Optional w/Rate
    String nohaRate
    String optionalLines //
    String terms
    String forms
    BigDecimal agentPct
    BigDecimal grossPct
    String rateInfo

    static constraints = {
        productID(unique:true)
        coverage nullable:true
        coverageLongName nullable:true
        lobs nullable:true
        rate nullable:true
        rate (scale: 4, maxSize:32)
        productName nullable:true
        nohaOption nullable:true
        optionalLines nullable:true
        flatPremium nullable:true
        flatPremium (scale: 2, maxSize:32)
        terms(nullable: true)
        terms(maxSize: 8000)
        forms(nullable: true)
        forms(maxSize: 8000)

        rateBasis nullable:true


        agentPct nullable:true
        agentPct (scale: 4, maxSize:32)

        grossPct nullable:true
        grossPct (scale: 4, maxSize:32)

        minPremium nullable:true
        flatPremium (scale: 2, maxSize:32) 

        rateInfo nullable:true
    }

    static mapping = {
        rateInfo type: 'text'
    }

    def getDisplayName(column){
        def names = [
                "productName": "Product Name",
                "productID": "Product ID",
                "aimProductID": "AIM Product ID",
                "coverage": "Coverage"
        ]

        return names[column]
    }
    def getDisplayOrder(){
        def order = [
            "productName",
            "productID",
            "aimProductID",
                "coverage"
        ]
    }
}