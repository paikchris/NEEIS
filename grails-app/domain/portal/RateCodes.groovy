package portal

class RateCodes {
    String code
    String description
    String cov
    String howProcessed
    String toEqualCode

    static constraints = {
        code nullable: true
        description nullable: true
        cov nullable: true
        howProcessed nullable: true
        toEqualCode nullable: true

    }
}
