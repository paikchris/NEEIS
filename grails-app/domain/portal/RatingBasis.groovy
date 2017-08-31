package portal

class RatingBasis {
    String basisID
    String description
    String requiredQuestions
    String basisQuestionID



    static constraints = {
        basisID unique: true
        requiredQuestions nullable: true
        basisQuestionID nullable:true
    }

    static mapping = {
        requiredQuestions type: 'text'
    }
}
