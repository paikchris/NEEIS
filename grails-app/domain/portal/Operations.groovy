package portal

class Operations {
    static isAimTable = true
    static aimPrimaryKey = 'StatusID'
    static mysqlPrimaryKey = 'operationID'
    static columnMap = [
            'operationID' : 'StatusID',
            'description': 'Description'
    ]

    String operationID
    String description
    String coverages
    String coverageProductMap
    String underwriterQuestionsMap
    String requiredQuestionsMap
    String weightOrderedRequiredQuestions

    static constraints = {
        operationID unique:true, maxSize: 3
        description nullable: true, maxSize: 55
        coverages nullable:true
        coverageProductMap nullable: true
        underwriterQuestionsMap nullable: true
        requiredQuestionsMap nullable:true
        weightOrderedRequiredQuestions nullable: true
    }

    static mapping = {
        coverageProductMap type: 'text'
        underwriterQuestionsMap type:'text'
        weightOrderedRequiredQuestions type:'text'
    }
}
