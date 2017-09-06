package portal

class CoverageLimits {
    static isAimTable = false

    String productID
    Integer displayOrder
    String activeFlag

    String limitDescription
    String limitAmount

    String limitOptionsFlag
    String limitOptionsArray
    String limitCustomizableFlag
    String limitMaxLimit

    String limitFlatPremiumFlag
    String limitFlatPremium
    String limitRatedPremiumFlag
    BigDecimal limitRateValue
    Double limitMinPremium

    String optionalFlag

    static constraints = {
        productID nullable:true, maxSize: 8
        displayOrder nullable:true
        activeFlag nullable:false, inList: ["N", "Y"]

        limitDescription nullable:true
        limitAmount nullable:false

        limitOptionsFlag nullable:false, inList: ["N", "Y"] //IF YES, BROKER WILL CHOOSE FROM DROPDOWN OF OPTIONS
        limitOptionsArray nullable:true //DIFFERENT OPTIONS FOR THIS LIMIT, SHOULD BE AN ARRAY OF IDS
        limitCustomizableFlag nullable:false, inList: ["N", "Y"] //IF YES, A INPUT FIELD SHOULD BE SHOWN ALLOWING USER TO ENTER LIMIT
        limitMaxLimit nullable: true


        limitFlatPremiumFlag nullable:false, inList: ["N", "Y"]
        limitFlatPremium nullable:true
        limitRatedPremiumFlag nullable:false, inList: ["N", "Y"]
        limitRateValue nullable:true
        limitMinPremium nullable:true

        optionalFlag nullable:false, inList: ["N", "Y"]

    }

    static mapping = {
        limitOptionsArray type:'text'
        limitOptionsFlag defaultValue:'N'
        limitCustomizableFlag defaultValue:'N'
        limitFlatPremiumFlag defaultValue:'N'
        limitRatedPremiumFlag defaultValue:'N'
        optionalFlag defaultValue:'N'
    }
}
