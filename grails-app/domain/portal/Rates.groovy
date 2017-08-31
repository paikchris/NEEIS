package portal

class Rates {
    String state
    String rateID
    String rateCode
    String description
    BigDecimal rateValue
    String coverageID
    String rateBasis

    static constraints = {
        state nullable: true
        rateID unique: true
        rateCode unique: true
        rateValue nullable: true
        rateValue (scale: 4, maxSize:32)
        coverageID nullable:true
        rateBasis nullable:true
    }
    static mapping = {
    }
}
