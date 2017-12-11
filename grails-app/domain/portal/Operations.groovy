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
    String coverageShowMap
    String coveragePackageMap
    String coverageProductMap
    String underwriterQuestionsMap
    String requiredQuestionsMap
    String weightOrderedRequiredQuestions
    String activeFlag
    String bindingAuthority
    String monolineCoverages

    static constraints = {
        operationID unique:true, maxSize: 3
        description nullable: true, maxSize: 55
        coverages nullable:true
        coverageShowMap nullable:true
        coveragePackageMap nullable:true
        coverageProductMap nullable: true
        underwriterQuestionsMap nullable: true
        requiredQuestionsMap nullable:true
        weightOrderedRequiredQuestions nullable: true
        activeFlag nullable:true, maxSize:1
        bindingAuthority nullable:true, maxSize:1
        monolineCoverages nullable:true
    }

    static mapping = {
        coverageShowMap type:'text'
        coveragePackageMap type:'text'
        coverageProductMap type: 'text'
        underwriterQuestionsMap type:'text'
        weightOrderedRequiredQuestions type:'text'
        requiredQuestionsMap type:'text'
        monolineCoverages type:'text'
    }
}
