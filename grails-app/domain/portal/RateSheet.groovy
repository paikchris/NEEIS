package portal

class RateSheet {
    String rateSheetID
    String description
    String rateSheetArray

    static constraints = {
        rateSheetID nullable: false
        rateSheetArray nullable: false

    }
    static mapping = {
        rateSheetArray type: 'text'
    }
}
