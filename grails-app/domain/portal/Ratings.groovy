package portal

class Ratings {
    String code
    String description
    String state
    String company
    String cov
    String product
    BigDecimal rate
    String howProcessed
    BigDecimal flat
    BigDecimal premium
    String nonMod
    String howMpProcessed

    static constraints = {
        code nullable: true
        description nullable: true
        state nullable: true
        company nullable: true
        cov nullable: true
        product nullable: true
        rate nullable: true
        rate (scale: 4, maxSize:32)
        howProcessed nullable: true
        flat nullable: true
        premium nullable: true
        nonMod nullable: true
        howMpProcessed nullable: true
    }
}
