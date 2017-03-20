package portal

class ProductLOB {

    String lobCode
    String lobName
    String lobLimit
    String lobDeductible
    String flatPremium
    BigDecimal rateValue
    String minPremium
    String productID
    String optionalFlag
    Integer displayOrder
    String includedFlag
    String optionalProduct
    String optionalLOB 

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
        optionalProduct nullable:true
        optionalLOB nullable:true
    }
}
