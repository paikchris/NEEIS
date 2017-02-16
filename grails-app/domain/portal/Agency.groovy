package portal

class Agency {

    String agencyID
    String agencyPin

    static constraints = {
        agencyID(unique:true)
    }
}
