package portal

class Agency {

    String agencyID
    String agencyPin
    String logoFileName

    static constraints = {
        agencyID(unique:true)
        agencyPin nullable:true
        logoFileName nullable:true
    }
}
