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
    String questionAnswerMap




    static constraints = {
        namedInsured(nullable: true)
        coverages(nullable: true)
        underwriter(nullable: true)
        seenByUW(nullable: true)
        questionAnswerMap(nullable: true)
        questionAnswerMap(maxSize: 6000)
    }
}