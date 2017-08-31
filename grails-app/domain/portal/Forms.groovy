package portal

class Forms {
    String formID
    String formName
    String usages
    String useCondition //Class, Limit
    String covClass
    String covLimit


    String activeFlag


    static constraints = {
        formID(unique:true)
        formName nullable: true
        formName maxSize: 1000

        usages nullable:true
        useCondition nullable:true
        covClass nullable:true
        covLimit nullable:true

        activeFlag nullable:true
        activeFlag maxSize: 1, validator:{ it.toUpperCase() == it }
    }
}