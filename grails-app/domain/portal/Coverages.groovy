package portal

class Coverages {

    String coverageCode
    String coverageName

    static constraints = {
        coverageCode(unique:true)
    }
}
