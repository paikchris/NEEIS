package portal

class DataRaw {

    String identifier
    String quoteID
    String params
    String endStatus
    String endStatusDetail

    static constraints = {
        params nullable:true
        endStatus nullable:true
        quoteID nullable:true
        endStatusDetail nullable:true
    }
}
