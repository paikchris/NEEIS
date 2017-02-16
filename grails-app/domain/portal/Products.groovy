package portal

class Products {

    String productID
    String productName
    String coverage
    String lobs
    BigDecimal flatPremium
    BigDecimal rate
    BigDecimal minPremium
    String nohaOption //I= Included , OF=Optional Flat, OR = Optional w/Rate
    String nohaRate
    String optionalLines //

    static constraints = {
        productID(unique:true)
        coverage nullable:true
        lobs nullable:true
        rate nullable:true
        rate (scale: 4, maxSize:32)
        productName nullable:true
        nohaOption nullable:true
        optionalLines nullable:true
        flatPremium nullable:true
        flatPremium (scale: 2, maxSize:32)

        minPremium nullable:true
        flatPremium (scale: 2, maxSize:32)

    }
}