package portal

class Certwords {

    String submissionID
    String description
    String producerid
    String agent
    String additionalInsured
    String ops
    String certType
    String certFormat
    String useForms
    String aiType

    static constraints = {
        submissionID(nullable:true)
        description nullable:true
        producerid nullable:true
        agent nullable:true
        additionalInsured nullable:true
        ops nullable:true
        certType nullable:true
        certFormat nullable:true
        useForms nullable:true
        aiType nullable:true
    }
}
