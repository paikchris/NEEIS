package portal

class Ratings {
    String rateCodeID
    String code
    String state
    String company
    String cov

    String description


    String product
    BigDecimal rate
    String howProcessed
    BigDecimal flat
    BigDecimal premium
    String premiumLogic
    String nonMod
    String howMpProcessed

    static constraints = {
        rateCodeID unique:true
        rateCodeID nullable:false
        code nullable: false
        state nullable: false
        company nullable: false
        cov nullable: false

        description nullable: true
        product nullable: true
        rate nullable: true
        rate (scale: 4, maxSize:32)
        howProcessed nullable: true
        flat nullable: true
        premium nullable: true
        premiumLogic nullable: true;
        nonMod nullable: true
        howMpProcessed nullable: true
    }

    static mapping = {
        premiumLogic type:'text'
    }
}
