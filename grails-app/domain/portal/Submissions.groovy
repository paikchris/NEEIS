package portal

class Submissions {

    String aimQuoteID
    String submittedBy
    String namedInsured
    String submitDate
    String coverages
    String statusCode
    String underwriter
    String seenByUW



    static constraints = {
        namedInsured(nullable: true)
        coverages(nullable: true)
        underwriter(nullable: true)
        seenByUW(nullable: true)
    }
}