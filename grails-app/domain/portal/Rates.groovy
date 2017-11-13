package portal

class Rates {
    String state
    String rateID
    String rateCode
    String rateBasis
    String description
    BigDecimal rateValue
    String minPremium
    String coverageID
    String limitRateArray
    String bracketRateArray
    String flatAmount


    static constraints = {
        state nullable: true
        rateID unique: true
        rateCode unique: true
        rateBasis nullable:true
        rateValue nullable: true
        rateValue (scale: 4, maxSize:32)
        minPremium nullable:true
        coverageID nullable:true
        limitRateArray nullable:true
        bracketRateArray nullable:true
        flatAmount nullable:true
    }
    static mapping = {
        limitRateArray type: 'text'
        bracketRateArray type: 'text'
    }
}
