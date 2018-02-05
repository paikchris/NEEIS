package portal

class Rates {
    String state
    String rateID
    String rateType
    String rateMethod
    String rateCode
    String rateBasis
    String description
    BigDecimal rateValue
    String minPremium
    String coverageID
    String limitRateArray
    String bracketRateArray
    String flatAmount
    String tieredQuestionID


    static constraints = {
        state nullable: true
        rateID unique: true
        rateType nullable:true
        rateMethod nullable:true
        rateCode nullable:true
        rateBasis nullable:true
        rateValue nullable: true
        rateValue (scale: 4, maxSize:32)
        minPremium nullable:true
        coverageID nullable:true
        limitRateArray nullable:true
        bracketRateArray nullable:true
        flatAmount nullable:true
        tieredQuestionID nullable:true
    }
    static mapping = {
        limitRateArray type: 'text'
        bracketRateArray type: 'text'
    }
}
