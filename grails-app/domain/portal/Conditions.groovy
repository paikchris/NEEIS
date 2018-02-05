package portal

class Conditions {
    String conditionID
    String type
    String description
    String questionID
    String format
    String actionTargetOptions
    String actionTargetID
    String actionModifierOptions
    String actionRequiredModifiers
    String modifierValueMap

    static constraints = {
        conditionID unique: true
        type inList: ["basis", "operator", "limitBasis"], maxSize: 20
        description nullable: true
        questionID nullable: true
        format nullable: true
        actionTargetOptions nullable:true
        actionTargetID nullable:true
        actionModifierOptions nullable:true
        modifierValueMap nullable:true
        actionRequiredModifiers nullable:true
    }
}
