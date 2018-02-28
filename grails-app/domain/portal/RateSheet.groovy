package portal

class RateSheet {
    String rateSheetID
    String description
    String rateSheetArray
    String cov
    String company

    static constraints = {
        rateSheetID unique:true
        rateSheetID nullable: false
        rateSheetArray nullable: false
        cov nullable: false
        company nullable:false

    }
    static mapping = {
        rateSheetArray type: 'text'
    }
}
