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
    String uwQuestionMap
    String uwQuestionsOrder
    String submitGroupID




    static constraints = {
        namedInsured(nullable: true)
        coverages(nullable: true)
        underwriter(nullable: true)
        seenByUW(nullable: true)
        questionAnswerMap(nullable: true)
        questionAnswerMap(maxSize: 8000)
        uwQuestionMap(nullable: true)
        uwQuestionMap(maxSize: 8000)
        uwQuestionsOrder(nullable: true)
        uwQuestionsOrder(maxSize: 8000)
        submitGroupID(nullable: true)
    }
}