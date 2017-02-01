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
        submissionID(unique:true)
        description(unique:true)
        producerid(unique:true)
        agent(unique:true)
        additionalInsured(unique:true)
        ops(unique:true)
        certType(unique:true)
        certFormat(unique:true)
        useForms(unique:true)
        aiType(unique:true)
    }
}
