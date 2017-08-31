package portal

class QuestionCategory {

    String categoryName
    Integer weight



    static constraints = {
        categoryName(unique:true)

        weight nullable:true


    }
}