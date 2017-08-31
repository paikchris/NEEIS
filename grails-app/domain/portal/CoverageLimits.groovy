package portal

class CoverageLimits {
    static isAimTable = false
    static mysqlPrimaryKey = 'covLimCode'

    String covLimCode
    String covLimName
    String covLimit
    String covDeductible
    String covPremium
    String flatPremium
    BigDecimal rateValue
    String minPremium
    String productID
    String optionalFlag
    Integer displayOrder
    String includedFlag
    String type
    String otherOptionsMap
    String additionalOptionsMap

    static constraints = {
        covLimCode unique:true
        covLimName nullable:true
        covLimit nullable:true
        covDeductible nullable:true
        covPremium nullable:true
        flatPremium nullable:true
        rateValue nullable:true
        productID nullable:true, maxSize: 8
        minPremium nullable:true
        optionalFlag nullable:true
        displayOrder nullable:true
        includedFlag nullable: true
        type nullable:true
        otherOptionsMap nullable:true
        additionalOptionsMap nullable:true
    }

    static mapping = {
        otherOptionsMap type: 'text'
    }
}
