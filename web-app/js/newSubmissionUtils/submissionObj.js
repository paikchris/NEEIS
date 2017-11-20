function Submission(){
    this.versionMode = function(){ return versionMode }
    this.versionLetter = function(){ return versionLetter }
    this.originalVersion = function(){ return versionLetter }
    this.originalQuoteID = function() {return originalQuoteID }
    //INSURED INFO
    this.namedInsured = function(){ return $('#namedInsured').val().trim()}
    this.namedInsuredContact = function(){ return $('#namedInsuredContact').val().trim()}
    this.namedInsuredEmail = function(){ return $('#namedInsuredEmail').val().trim()}
    this.namedInsuredPhone = function(){ return $('#namedInsuredPhone').val().trim()}
    this.streetAddressMailing = function(){ return $('#streetAddressMailing').val().trim()}
    this.cityMailing = function(){ return $('#cityMailing').val().trim()}
    this.zipCodeMailing = function(){ return $('#zipCodeMailing').val().trim()}
    this.stateMailing = function(){ return $('#stateMailing').val().trim()}
    this.dbaName = function(){ return ($('#dbaName').length > 0 ? $('#dbaName').val().trim() : "") }
    this.FEINSSN = function(){ return ($('#FEINSSN').length > 0 ? $('#FEINSSN').val().trim() : "") }
    this.businessStructureID = function(){
        return ( $('#businessStructureSelect').length > 0 && $('#businessStructureSelect').val() !== 'invalid' ?
        $('#businessStructureSelect').val().trim() : "")
    }
    this.NCCI = function(){ return ($('#NCCIInput').length > 0 ? $('#NCCIInput').val().trim() : "") }
    this.SIC = function(){ return ($('#SICInput').length > 0 ? $('#SICInput').val().trim() : "") }
    this.website = function(){ return ($('#websiteInput').length > 0 ? $('#websiteInput').val().trim() : "") }

    //SUBMISSION INFO
    this.proposedEffective = function(){ return $('#proposedEffectiveDate').val().trim()}
    this.proposedExpiration = function(){ return $('#proposedExpirationDate').val().trim()}
    this.proposedTermLength = function(){ return $('#proposedTermLength').val().trim()}
    this.proposedTermLengthInt = function(){ return parseInt( $('#proposedTermLength').val().split(' ')[0].trim() ) }

    //BROKER INFO
    this.brokerName = function(){ return $('#brokerName').val().trim()}
    this.brokerEmail = function(){ return $('#brokerEmail').val().trim()}
    this.brokerCompanyID = function(){ return $('#brokerCompany').val().trim()}
    this.brokerPhoneNumber = function(){ return $('#brokerPhone').val().trim() }

    //QUESTIONS
    this.requiredQuestionsMap = function(){ return buildRequiredQuestionAndAnswerMap() }
    this.uwQuestionsMap = function() { return buildUWQuestionAndAnswerMap() }
    this.uwQuestionForIndicationArray = function() { return buildUWQuestionsForIndication() }
    


    //OPERATION
    this.operationID = function(){ return getSelectedOperationID() }
    this.operationName = function(){ return $("#operationsDropdown option:selected").text().trim()}

    //COVERAGES, PRODUCTS   
    this.coverages = function(){ return getCoveragesSelectedArray() }
    this.products = function(){ return getProductsSelectedArray() }
    this.coveragesAndProducts = function(){ return buildCoverageAndProductSelectedMap() }
    // this.lobMap = function(){ return buildLOBMap() }

    //LIMITS, DEDUCT
    this.limitMap = function(){ return buildLimitMapForSelectedProducts() }
    this.deductMap = function(){ return buildDeductMapForSelectedProducts() }
    this.limitDeductMap = function(){ return buildLimitDeductMapForAllProducts() }

    //PREMIUMS
    this.premiumMap = function(){ return buildPremiumMap() }

    //FEES
    this.brokerFee = function(){ return $('#brokerFeeInput').val().trim()}

    //TERMS
    this.terms = function(){ return buildTermsStringForAllProducts() }

    //HTML INPUT MAP
    this.userInputMap = function(){ return buildUserInputMap()}



    this.getObject = function() {
        var n = {}

        for(var i=0; i < Object.keys(this).length; i++){
            var propertyName = Object.keys(this)[i]

            if(propertyName === 'getObject'){
                //SKIP SELF
            }
            else if (typeof this[propertyName] === "function" ) {
                n[propertyName] = this[propertyName]()
            }
            else{
                n[propertyName] = this[propertyName]
            }
        }

        return n
    }
}