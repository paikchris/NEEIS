package portal

class QuestionCategory {

    String categoryName
    String categoryCode
    Integer weight
    String coverageCategoryFlag



    static constraints = {
        categoryName(unique:true)
        categoryCode(unique:true)
        weight nullable:true
        coverageCategoryFlag nullable:true, maxSize:1, validator:{ it.toUpperCase() == it }


    }
}