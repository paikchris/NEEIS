package portal

class UWQuestions {

    String questionID
    String questionHTML




    static constraints = {
        questionID unique: true
        questionHTML nullable: true

    }
    static mapping = {
        questionHTML type: 'text'
    }
}