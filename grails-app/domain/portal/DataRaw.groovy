package portal

class DataRaw {

    String identifier
    String quoteID
    String params
    String endStatus
    String endStatusDetail

    static constraints = {
        params nullable:true
        params (maxSize: 9000)
        endStatus nullable:true
        quoteID nullable:true
        endStatusDetail nullable:true
        endStatusDetail(maxSize: 9000)
    }
}
