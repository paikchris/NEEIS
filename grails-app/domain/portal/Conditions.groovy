package portal

class Conditions {
    String conditionID
    String type
    String description
    String questionID

    static constraints = {
        conditionID unique: true
        type inList: ["basis", "operator", "limitBasis"]
        description nullable: true
        questionID nullable: true

    }
}
