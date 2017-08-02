package portal

class ProductLOB {

    String lobCode
    String lobName
    String lobLimit
    String lobDeductible
    String lobPremium
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
        lobCode(unique:true)
        lobName nullable:true
        lobLimit nullable:true
        lobDeductible nullable:true
        flatPremium nullable:true
        rateValue nullable:true
        productID nullable:true
        minPremium nullable:true
        optionalFlag nullable:true
        displayOrder nullable:true
        type nullable:true
        lobPremium nullable:true
        otherOptionsMap nullable:true
        additionalOptionsMap nullable:true
    }

    static mapping = {
        otherOptionsMap type: 'text'
    }
}
