package portal

class Forms {
    String formID
    String formName
    String usages
    String useCondition //Class, Limit
    String covClass
    String covLimit
    String questionIDArray
    String type
    String state

    String activeFlag


    static constraints = {
        formID(unique:true)
        formName nullable: true
        formName maxSize: 1000

        questionIDArray nullable:true
        type nullable:true
        state nullable:true

        usages nullable:true
        useCondition nullable:true
        covClass nullable:true
        covLimit nullable:true

        activeFlag nullable:true
        activeFlag maxSize: 1
    }

    static mapping = {
        questionIDArray type: 'text'
        usages type:'text'
    }
}