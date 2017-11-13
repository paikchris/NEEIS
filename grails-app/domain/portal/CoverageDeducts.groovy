package portal

class CoverageDeducts {
    static isAimTable = false

    String productID
    Integer displayOrder
    String activeFlag

    String deductDescription
    String deductAmount

    String deductOptionsFlag
    String deductOptionsArray
    String deductCustomizableFlag
    String deductMaxLimit

    String deductFlatPremiumFlag
    String deductFlatPremium
    String deductRatedPremiumFlag
    BigDecimal deductRateValue
    Double deductMinPremium

    String optionalFlag

    static constraints = {
        productID nullable:true, maxSize: 8
        displayOrder nullable:true
        activeFlag nullable:false, inList: ["N", "Y"]

        deductDescription nullable:true
        deductAmount nullable:false

        deductOptionsFlag nullable:false, inList: ["N", "Y"] //IF YES, BROKER WILL CHOOSE FROM DROPDOWN OF OPTIONS
        deductOptionsArray nullable:true //DIFFERENT OPTIONS FOR THIS LIMIT, SHOULD BE AN ARRAY OF IDS
        deductCustomizableFlag nullable:false, inList: ["N", "Y"] //IF YES, A INPUT FIELD SHOULD BE SHOWN ALLOWING USER TO ENTER LIMIT
        deductMaxLimit nullable: true


        deductFlatPremiumFlag nullable:false, inList: ["N", "Y"]
        deductFlatPremium nullable:true
        deductRatedPremiumFlag nullable:false, inList: ["N", "Y"]
        deductRateValue nullable:true
        deductMinPremium nullable:true

        optionalFlag nullable:false, inList: ["N", "Y"]

    }

    static mapping = {
        deductOptionsArray type:'text'
        deductOptionsFlag defaultValue:'N'
        deductCustomizableFlag defaultValue:'N'
        deductFlatPremiumFlag defaultValue:'N'
        deductRatedPremiumFlag defaultValue:'N'
        optionalFlag defaultValue:'N'
    }
}
