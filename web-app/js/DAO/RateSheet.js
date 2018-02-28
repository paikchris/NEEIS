function RateSheet(options){
    this.rateSheetID = (options && options.ruleSetID ? options.ruleSetID : '')
    this.description = (options && options.description ? options.description : '')
    this.rateSheetArray = (options && options.rateSheetArray ? options.rateSheetArray : [])
    this.cov = (options && options.cov ? options.cov : '')
    this.company = (options && options.company ? options.company : '')

    //DOM ELEMENTS
    this.rateSheetDataPage_DOMElement = function(){

    }

}