var testRateInfoMap = {}
var testPolicyInfoMap = {}

function calculatePackageTotalPremium(packageID, selectedLOBIDArray){
    var totalPackagePremium = 0
    var operationObject = getCurrentOperationTypeObject()
    var coverageMap = getCoverageObject(packageID)
    var productID = getProductIDForCoverage(packageID)
    var productObject = getProductOptionObject(packageID, productID)
    // var productObject = getProductObjectFromProductID(getProductIDForCoverage(packageID))
    var rateID = productObject.rateCode
    var rateObject = getRateObjectByID(rateID)
    var ratingBasisID = rateObject.rateBasis
    var ratingBasisObject = getRatingBasisObjectByID(ratingBasisID)

    var packageBasePremium = calculateTotalCoveragePremium(productObject, rateObject, ratingBasisObject)
    totalPackagePremium = totalPackagePremium + packageBasePremium


    var thisCoveragePackageMap = JSON.parse(operationObject.coveragePackageMap)[packageID]
    for(var i=0;i<selectedLOBIDArray.length;i++){
        var lobID = selectedLOBIDArray[i]
        var lobInfoMap = getLOBObjectFromPackageMap(packageID, lobID)
        var lobRateID = getRateIDForPackageLOB(packageID, lobID)
        var lobRateObject = getRateObjectByID(lobRateID)
        var lobRatingBasisID = lobRateObject.rateBasis
        var lobRatingBasisObject = getRatingBasisObjectByID(lobRatingBasisID)

        var thisLOBPremium = calculateTotalCoveragePremium(false, lobRateObject, lobRatingBasisObject, packageID)

        totalPackagePremium = totalPackagePremium + thisLOBPremium
    }

    return totalPackagePremium
}

function calculateTotalCoveragePremium(productObject, rateMap, ratingBasisMap){
    var rateBasis = rateMap.rateBasis
    var premium = 0

    premium = calculateProductOptionPremium(productObject)

    return parseFloat(premium)
}

function checkAdditionalOptionsForPremiumChangesBACKUP(productObject, currentPremium){
    var updatedPremium = currentPremium
    var additionalOptionArray = getSelectedProductAdditionalOptionMap()[productObject.productID]

    if(additionalOptionArray){
        for(var i=0; i<additionalOptionArray.length; i++){
            var additionalOptionID = additionalOptionArray[i]

            if(additionalOptionID === 'MED'){
                var premiumToAdd = 25
                updatedPremium = parseFloat(updatedPremium) + parseFloat(premiumToAdd)
            }

            if(additionalOptionID === 'BAI'){
                var premiumToAdd = 100
                updatedPremium = parseFloat(updatedPremium) + parseFloat(premiumToAdd)
            }

            if(additionalOptionID === 'WOS'){
                var premiumToAdd = 100
                updatedPremium = parseFloat(updatedPremium) + parseFloat(premiumToAdd)
            }

            if(additionalOptionID === 'INCAGG'){
                var premiumToAdd = 250
                updatedPremium = parseFloat(updatedPremium) + parseFloat(premiumToAdd)
            }
            if(additionalOptionID === 'CIVAUTH100'){
                var premiumToAdd = 250
                updatedPremium = parseFloat(updatedPremium) + parseFloat(premiumToAdd)
            }
            if(additionalOptionID === 'CIVAUTH500'){
                var premiumToAdd = 500
                updatedPremium = parseFloat(updatedPremium) + parseFloat(premiumToAdd)
            }
        }
    }


    return updatedPremium
}
function checkAdditionalOptionsForPremiumChanges(productObject, currentPremium) {
    var applyMinPremiumsToAdd = 0
    var premiumsToAdd = 0


    //CHECK LIMIT ARRAY FOR PRODUCT LIMIT OPTIONS
    if(productObject.limitArray){
        var limitArray = jsonStringToObject(productObject.limitArray)
        for(var i=0; i<limitArray.length; i++) {
            var limitMap = jsonStringToObject(limitArray[i])

            if (limitMap.limitProductOption) {
                var optionCheckboxElement = $("#" + productObject.productID + "_" + i + "_ProductOptionCheckbox")

                //CHECK IF PRODUCT OPTION CHECKBOX EXISTS, AND IS CHECKED
                if( $(optionCheckboxElement).length > 0 && $(optionCheckboxElement).is(':checked') ){
                    //PRODUCT OPTION ACTIONS

                    //1. ADDITIONAL PREMIUM
                    if(limitMap.productOptionAdditionalPremium){
                        var additionalPremium = limitMap.productOptionAdditionalPremium

                        //IF APPLY MIN PREMIUM IS TRUE. CHECK IF MIN PREMIUM IS MET
                        if(limitMap.applyMinPremium){
                            applyMinPremiumsToAdd = parseFloat(applyMinPremiumsToAdd) + parseFloat(additionalPremium)
                        }
                        else{
                            premiumsToAdd = parseFloat(premiumsToAdd) + parseFloat(additionalPremium)
                        }

                    }
                }
            }
        }
    }

    var optionPremiumMap = {}
    optionPremiumMap.applyMPPremiums = applyMinPremiumsToAdd
    optionPremiumMap.nonAppliedPremiums = premiumsToAdd

    return optionPremiumMap
}

function calculateLimitPremium(rateMap, limitDescString, userInputLimit){
    var limitRateArray = jsonStringToObject(rateMap.limitRateArray)
    var premium


    for(var i=0;i<limitRateArray.length; i++){
        var thisLimitRateMap = jsonStringToObject(limitRateArray[i])

        if(thisLimitRateMap.limitDescription === limitDescString.trim()){
            var limitDescription = thisLimitRateMap.limitDescription
            var limitRateValue = parseFloat(thisLimitRateMap.rateValue)
            var limitMinPremium = getFloatValueOfMoney(thisLimitRateMap.minPremium)

            if(userInputLimit){
                var userInputFloatValue = getFloatValueOfMoney(userInputLimit)

                premium = userInputFloatValue * limitRateValue

                if(premium < limitMinPremium){
                    premium = limitMinPremium
                }
            }
            else{
                premium = limitMinPremium
            }


            return premium
        }
    }

    return undefined
}

function calculatePackageLOBPremium(){
    
}

function getRangePremiumAndDetail(rangeMap, policyInfoMap, rateBasis, ignoreMinPrem){
    //ASSUMES THIS RANGE HAS NO ADDITIONAL CONDITION
    //console.log("GET RANGE PREMIUM")
    //console.log("rangeMap")
    //console.log(rangeMap)
    //console.log("policyInfoMap")
    //console.log(policyInfoMap)
    var testRangeMap = {
        from: "0",
        to: "Any",
        rateValue:"-",
        rateType: "percent",
        minPrem: "$200"
    }
    var testPolicyInfoMap = {
        gpc: 100000,
        termLength: 10
    }

    var rangePremium = 0.0
    var rateVal = 0
    var calculationDetailString = ""

    calculationDetailString = calculationDetailString + "\n"


    //RATE BY RATE TYPE
    if(rangeMap.rateType === "percent" || rangeMap.rateType === "Flat Rate"){
        var rateVal = getDoubleValueOfPercent(rangeMap.rateValue)
        rangePremium = policyInfoMap.gpc  * (rateVal/100)

        //FORMAT PREMIUM DETAIL DESCRIPTION
        //IF THE RATE IS A PERCENT, MUST RATE BY BUDGET NOT TERM LENGTH

        calculationDetailString = calculationDetailString + "Premium: " + formatMoney( policyInfoMap.gpc  ) + " * (" + rateVal + "/100) = " + formatMoney( rangePremium ) + "\n"

    }
    else if(rangeMap.rateType === "premium"){
        rangePremium = getIntValueOfMoney( rangeMap.rateValue )

        calculationDetailString = calculationDetailString + "Premium: " + formatMoney(rangePremium) + "\n"

    }
    else if(rangeMap.rateType === "custom"){
        var customExpression = rangeMap.rateValue
        var lobID = rangeMap.lobID
        var limit = getIntValueOfMoney(policyInfoMap.limitValue)
        var gpc = getIntValueOfMoney(policyInfoMap.gpc)
        var termLength = policyInfoMap.termLength
        var scope = {
            G:gpc,
            L:limit,
            d:termLength
        }



        rangePremium = getIntValueOfMoney( Math.ceil( math.eval(customExpression, scope) ) )
        //
        calculationDetailString = calculationDetailString + "Premium: " + customExpression + " = " + customExpression.replace('G', gpc).replace('L', limit).replace('d', termLength) + " = " +
            rangePremium + "\n"

    }


    //CHECK MIN PREMIUM
    if(ignoreMinPrem === false){
        if(rangePremium < getIntValueOfMoney( rangeMap.minPrem ) ){
            rangePremium = getIntValueOfMoney( rangeMap.minPrem )

            calculationDetailString = calculationDetailString + "*=> Min Premium: " + formatMoney(rangePremium) + "\n"
        }
    }



    //console.log(calculationDetailString)
    return { rangePremium:rangePremium, detail: calculationDetailString }

    
}

function getTotalPremiumAndDetail(rateInfoMap, policyInfoMap, isPrimary){
    //console.log("GET TOTAL AND DETAIL")
    //console.log(rateInfoMap)
    var primaryRatingBasis = rateInfoMap.basisName
    var rateInfoArray = rateInfoMap.rateInfo

    var totalPremium = 0.0
    var rateCalcDetail = ""
    var finalRateCalcDetail = ""



    //IF RATING A GPC BASED PREMIUM
    if(primaryRatingBasis === "gpc"){
        var gpcAmount = getIntValueOfMoney( policyInfoMap.gpc )
        var termLength = parseInt( policyInfoMap.termLength )


        //IF THIS IS THE PRIMARY RATE BASIS, ADD HEADER STRING FOR RATE CALC DETAIL
        if(isPrimary){
            rateCalcDetail = rateCalcDetail + "Primary Rating Basis: GPC\n"
            rateCalcDetail = rateCalcDetail + "GPC: " + formatMoney( gpcAmount ) + "\n"
        }

        //LOOP RANGES UNTIL BUDGET IS IN THE CORRECT RANGE
        for(var i = 0; i<rateInfoArray.length; i++){
            var from = getIntValueOfMoney( rateInfoArray[i].from )
            var to = rateInfoArray[i].to
            if(rateInfoArray[i].to.toLowerCase() === "any"){
                to = gpcAmount + 1
            }
            else{
                to = getIntValueOfMoney(rateInfoArray[i].to)
            }
            var rateValue = rateInfoArray[i].rateValue
            var rateType = rateInfoArray[i].rateType
            var minPrem = rateInfoArray[i].minPrem


            rateCalcDetail = rateCalcDetail + "If GPC is " + formatMoney( from ) + " to " + formatMoney( rateInfoArray[i].to ) + ", " + rateType + " = " + rateValue + ", Min Prem = " + minPrem

            //IF BUDGET FALLS WITHIN THIS RANGE
            if( gpcAmount >= from && gpcAmount <= to){
                //IF ADDITIONAL CONDITIONS EXIST, RATE THE ADDITIONAL CONDITION
                if(rateInfoArray[i].hasOwnProperty('additionalRate')){
                    var additional_rateInfoArray = rateInfoArray[i].additionalRate

                    //LOOP THROUGH ADDITIONAL RATING BASIS'S
                    //console.log("ADDITIONAL")
                    //console.log(additional_rateInfoArray)
                    for(var j=0; j < additional_rateInfoArray.length; j++){
                        var additional_rateInfoMap = additional_rateInfoArray[j]
                        var additional_totalPremiumAndDetail = getTotalPremiumAndDetail(additional_rateInfoMap, policyInfoMap, false)
                        finalRateCalcDetail = additional_totalPremiumAndDetail.finalRateCalcDetail

                        totalPremium = additional_totalPremiumAndDetail.totalPremium
                        rateCalcDetail = rateCalcDetail + "\n" + additional_totalPremiumAndDetail.detail.trim().replace(/^/gm, "\t") + "\n";
                    }
                }
                //IF ADDITIONAL CONDITIONS DO NOT EXIST, RATE ORIGINAL CONDITION
                else{
                    rateCalcDetail = rateCalcDetail.substring(0, rateCalcDetail.lastIndexOf("\n")) + "\n=> " + rateCalcDetail.substring(rateCalcDetail.lastIndexOf("\n")+1, rateCalcDetail.length)
                    rateCalcDetail = rateCalcDetail + "\n"

                    var rateAgainstVal = gpcAmount
                    var rangePremiumAndDetail = getRangePremiumAndDetail(rateInfoArray[i], policyInfoMap, primaryRatingBasis, rateAgainstVal)
                    //console.log(rangePremiumAndDetail)

                    totalPremium = rangePremiumAndDetail.rangePremium
                    finalRateCalcDetail = rangePremiumAndDetail.detail
                }
            }
            //IF NOT WITHIN THIS RANGE, CHECK FOR ADDITIONAL CONDITION TO PRINT ONLY NOT RATE
            else if(rateInfoArray[i].hasOwnProperty('additionalRate')){
                var additional_rateInfoArray = rateInfoArray[i].additionalRate

                //LOOP THROUGH ADDITIONAL RATING BASIS'S
                for(var j=0; j < additional_rateInfoArray.length; j++){
                    var additional_rateInfoMap = additional_rateInfoArray[j]
                    var additional_totalPremiumAndDetail = getTotalPremiumAndDetail(additional_rateInfoMap, policyInfoMap, false)

                    //REPLACE THE ARROW INDICATING CHOSEN RANGE FOR RATE BECAUSE THIS IS DISPLAY ONLY, NOT THE CHOSEN RATE
                    var additional_detailDisplayOnly = additional_totalPremiumAndDetail.detail.replace("=>", "")

                    rateCalcDetail = rateCalcDetail + "\n" + additional_detailDisplayOnly.trim().replace(/^/gm, "\t") + "\n";
                }
            }
            //IF NOT WITHIN THIS RANGE, SKIP TO NEXT RANGE
            else{
                rateCalcDetail = rateCalcDetail + "\n"
            }
        }
    }
    //IF RATING A TERM LENGTH BASED PREMIUM
    else if(primaryRatingBasis === "termLength"){
        var gpcAmount = getIntValueOfMoney( policyInfoMap.gpc )
        var termLength = parseInt( policyInfoMap.termLength )

        //IF THIS IS THE PRIMARY RATE BASIS, ADD HEADER STRING FOR RATE CALC DETAIL
        if(isPrimary) {
            rateCalcDetail = rateCalcDetail + "Primary Rating Basis: Term Length\n"
            rateCalcDetail = rateCalcDetail + "Term Length: " + termLength + "\n"
        }

        //LOOP RANGES UNTIL TERM LENGTH IS IN THE CORRECT RANGE
        for(var i = 0; i<rateInfoArray.length; i++){
            //console.log("TERM LENGTH")
            //console.log( policyInfoMap )
            var from = parseInt( rateInfoArray[i].from )
            var to = rateInfoArray[i].to
            if(rateInfoArray[i].to.toLowerCase() === "any"){
                to = termLength + 1
            }
            else{
                to = parseInt(rateInfoArray[i].to)
            }
            var rateValue = rateInfoArray[i].rateValue
            var rateType = rateInfoArray[i].rateType
            var minPrem = rateInfoArray[i].minPrem

            rateCalcDetail = rateCalcDetail + "If Term Length is " + from + " to " + rateInfoArray[i].to + " Days, " + rateType + " = " + rateValue + ", Min Prem = " + minPrem

            //IF TERM LENGTH FALLS WITHIN THIS RANGE
            if( termLength >= from && termLength <= to){
                //IF ADDITIONAL CONDITIONS EXIST, RATE THE ADDITIONAL CONDITION
                if(rateInfoArray[i].hasOwnProperty('additionalRate')){
                    var additional_rateInfoArray = rateInfoArray[i].additionalRate

                    //LOOP THROUGH ADDITIONAL RATING BASIS'S
                    for(var j=0; j < additional_rateInfoArray.length; j++){
                        var additional_rateInfoMap = additional_rateInfoArray[j]
                        var additional_totalPremiumAndDetail = getTotalPremiumAndDetail(additional_rateInfoMap, policyInfoMap, false)
                        finalRateCalcDetail = additional_totalPremiumAndDetail.finalRateCalcDetail

                        totalPremium = additional_totalPremiumAndDetail.totalPremium
                        rateCalcDetail = rateCalcDetail + "\n" + additional_totalPremiumAndDetail.detail.trim().replace(/^/gm, "\t") + "\n";
                    }
                }
                //IF ADDITIONAL CONDITIONS DO NOT EXIST, RATE ORIGINAL CONDITION
                else{
                    rateCalcDetail = rateCalcDetail.substring(0, rateCalcDetail.lastIndexOf("\n")) + "\n=> " + rateCalcDetail.substring(rateCalcDetail.lastIndexOf("\n")+1, rateCalcDetail.length)
                    rateCalcDetail = rateCalcDetail + "\n"

                    var rateAgainstVal = termLength
                    var rangePremiumAndDetail = getRangePremiumAndDetail(rateInfoArray[i], policyInfoMap, primaryRatingBasis, rateAgainstVal)

                    totalPremium = rangePremiumAndDetail.rangePremium
                    finalRateCalcDetail = rangePremiumAndDetail.detail
                }
            }
            //IF NOT WITHIN THIS RANGE, CHECK FOR ADDITIONAL CONDITION TO PRINT ONLY NOT RATE
            else if(rateInfoArray[i].hasOwnProperty('additionalRate')){
                var additional_rateInfoArray = rateInfoArray[i].additionalRate

                //LOOP THROUGH ADDITIONAL RATING BASIS'S
                for(var j=0; j < additional_rateInfoArray.length; j++){
                    var additional_rateInfoMap = additional_rateInfoArray[j]
                    var additional_totalPremiumAndDetail = getTotalPremiumAndDetail(additional_rateInfoMap, policyInfoMap, false)

                    //REPLACE THE ARROW INDICATING CHOSEN RANGE FOR RATE BECAUSE THIS IS DISPLAY ONLY, NOT THE CHOSEN RATE
                    var additional_detailDisplayOnly = additional_totalPremiumAndDetail.detail.replace("=>", "")

                    rateCalcDetail = rateCalcDetail + "\n" + additional_detailDisplayOnly.trim().replace(/^/gm, "\t") + "\n";
                }

            }
            //IF NOT WITHIN THIS RANGE, SKIP TO NEXT RANGE
            else{
                rateCalcDetail = rateCalcDetail + "\n"
            }
        }
    }
    else if(primaryRatingBasis === "flatRate"){
        var gpcAmount = getIntValueOfMoney( policyInfoMap.gpc )
        var termLength = parseInt( policyInfoMap.termLength )

        var rateType = rateInfoArray[0].rateType
        var rateValue = rateInfoArray[0].rateValue


        //IF THIS IS THE PRIMARY RATE BASIS, ADD HEADER STRING FOR RATE CALC DETAIL
        if(isPrimary) {
            rateCalcDetail = rateCalcDetail + "Primary Rating Basis: Flat Rate\n"
            rateCalcDetail = rateCalcDetail + "GPC: " + gpcAmount + "\n"
            rateCalcDetail = rateCalcDetail + "Term Length: " + termLength + "\n"
        }

        if(rateType === "Flat Premium"){
            rateCalcDetail = rateCalcDetail + "Flat Premium is " + rateValue
        }
        else if(rateType === "Flat Rate"){
            var minPremium = rateInfoArray[0].minPrem
            rateCalcDetail = rateCalcDetail + "Min Premium: " + minPremium + "\n"
            rateCalcDetail = rateCalcDetail + "Flat Rate is " + rateValue + "\n"

            var rateAgainstVal = termLength
            var rangePremiumAndDetail = getRangePremiumAndDetail(rateInfoArray[0], policyInfoMap, primaryRatingBasis, rateAgainstVal)


            totalPremium = rangePremiumAndDetail.rangePremium
            finalRateCalcDetail = rangePremiumAndDetail.detail
        }

    }
    else if(primaryRatingBasis === "limits"){
        var gpcAmount = getIntValueOfMoney( policyInfoMap.gpc )
        var termLength = parseInt( policyInfoMap.termLength )
        var limits_finalCalcDetail = []

        var totalMinPrem = rateInfoMap.totalMinPrem

        //ITERATE THROUGH EACH LOB
        $('#limitRatingLOBRangeContainer > div > div.col-xs-12 > .multiRangeContainer').each(function(){
            var lobName = $(this).attr('data-lobname')
            var lobID = $(this).attr('data-lobid')

            var limitGiven = getIntValueOfMoney(policyInfoMap['lob_' + lobID].limitValue)
            rateCalcDetail = rateCalcDetail + lobName + " Rating Info\n"

            rateInfoArray = rateInfoMap['lobRateInfo_' + lobID].rateInfo
            for(var i = 0; i<rateInfoArray.length; i++){
                var from = getIntValueOfMoney( rateInfoArray[i].from )
                var to = rateInfoArray[i].to
                if(rateInfoArray[i].to.toLowerCase() === "any"){
                    to = limitGiven + 1
                }
                else{
                    to = getIntValueOfMoney(rateInfoArray[i].to)
                }
                var rateValue = rateInfoArray[i].rateValue
                var rateType = rateInfoArray[i].rateType
                var minPrem = rateInfoArray[i].minPrem


                rateCalcDetail = rateCalcDetail + "\tIf Limit is " + formatMoney( from ) + " to " + formatMoney( rateInfoArray[i].to ) + ", " + rateType + " = " + rateValue + ", Min Prem = " + minPrem

                //IF LIMIT FALLS WITHIN THIS RANGE
                if( limitGiven >= from && limitGiven <= to){
                    //IF ADDITIONAL CONDITIONS EXIST, RATE THE ADDITIONAL CONDITION
                    if(rateInfoArray[i].hasOwnProperty('additionalRate')){
                        var additional_rateInfoArray = rateInfoArray[i].additionalRate

                        //LOOP THROUGH ADDITIONAL RATING BASIS'S
                        for(var j=0; j < additional_rateInfoArray.length; j++){
                            var additional_rateInfoMap = additional_rateInfoArray[j]
                            var additional_totalPremiumAndDetail = getTotalPremiumAndDetail(additional_rateInfoMap, policyInfoMap['lob_' + lobID], false)

                            totalPremium = additional_totalPremiumAndDetail.totalPremium

                            finalRateCalcDetail = lobName + " \n\t" + additional_totalPremiumAndDetail.finalRateCalcDetail.substring(1)
                            limits_finalCalcDetail.push(finalRateCalcDetail)

                            rateCalcDetail = rateCalcDetail + "\n" + additional_totalPremiumAndDetail.detail.trim().replace(/^/gm, "\t\t") + "\n";
                        }
                    }
                    //IF ADDITIONAL CONDITIONS DO NOT EXIST, RATE ORIGINAL CONDITION
                    else{
                        rateCalcDetail = rateCalcDetail.substring(0, rateCalcDetail.lastIndexOf("\n")) + "\n=> " + rateCalcDetail.substring(rateCalcDetail.lastIndexOf("\n")+1, rateCalcDetail.length)
                        rateCalcDetail = rateCalcDetail + "\n"

                        var rateAgainstVal = gpcAmount
                        var rangePremiumAndDetail = getRangePremiumAndDetail(rateInfoArray[i], policyInfoMap['lob_' + lobID], primaryRatingBasis, rateAgainstVal)


                        totalPremium = rangePremiumAndDetail.rangePremium
                        finalRateCalcDetail = lobName + " \n\t" + rangePremiumAndDetail.detail.substring(1) //cuts off /n at beginning of string
                        limits_finalCalcDetail.push(finalRateCalcDetail)
                    }
                }
                //IF NOT WITHIN THIS RANGE, CHECK FOR ADDITIONAL CONDITION TO PRINT ONLY NOT RATE
                else if(rateInfoArray[i].hasOwnProperty('additionalRate')){
                    var additional_rateInfoArray = rateInfoArray[i].additionalRate

                    //LOOP THROUGH ADDITIONAL RATING BASIS'S
                    for(var j=0; j < additional_rateInfoArray.length; j++){
                        var additional_rateInfoMap = additional_rateInfoArray[j]
                        var additional_totalPremiumAndDetail = getTotalPremiumAndDetail(additional_rateInfoMap, policyInfoMap['lob_' + lobID], false)

                        //REPLACE THE ARROW INDICATING CHOSEN RANGE FOR RATE BECAUSE THIS IS DISPLAY ONLY, NOT THE CHOSEN RATE
                        var additional_detailDisplayOnly = additional_totalPremiumAndDetail.detail.replace("=>", "")

                        rateCalcDetail = rateCalcDetail + "\n" + additional_detailDisplayOnly.trim().replace(/^/gm, "\t") + "\n";
                    }
                }
                //IF NOT WITHIN THIS RANGE, SKIP TO NEXT RANGE
                else{
                    rateCalcDetail = rateCalcDetail + "\n"
                }
            }

        })

        finalRateCalcDetail = "\n";
        for(var li = 0; li<limits_finalCalcDetail.length; li++){
            finalRateCalcDetail = finalRateCalcDetail + limits_finalCalcDetail[li]
        }
    }
    else if(primaryRatingBasis === "budgetAgg"){
        var gpcAmount = getIntValueOfMoney( policyInfoMap.gpc )
        var termLength = parseInt( policyInfoMap.termLength )

        var remainingGPC = gpcAmount;

        var runningPremium = 0;


        //IF THIS IS THE PRIMARY RATE BASIS, ADD HEADER STRING FOR RATE CALC DETAIL
        if(isPrimary){
            rateCalcDetail = rateCalcDetail + "Primary Rating Basis: GPC\n"
            rateCalcDetail = rateCalcDetail + "GPC: " + formatMoney( gpcAmount ) + "\n"
        }

        //LOOP RANGES UNTIL BUDGET IS IN THE CORRECT RANGE
        for(var i = 0; i<rateInfoArray.length; i++){
            var from = getIntValueOfMoney( rateInfoArray[i].from )
            var to = rateInfoArray[i].to
            if(rateInfoArray[i].to.toLowerCase() === "any"){
                to = gpcAmount + 1
            }
            else{
                to = getIntValueOfMoney(rateInfoArray[i].to)
            }
            var rateValue = rateInfoArray[i].rateValue
            var rateType = rateInfoArray[i].rateType
            var minPrem = rateInfoArray[i].minPrem

            //SINCE THIS IS BUDGET AGG, MUST ORDER THE RATING INSTEAD OF USING ARROWS '=>'
            if(gpcAmount >= to ){
                rateCalcDetail = rateCalcDetail + (i+1) + ") "
                remainingGPC = remainingGPC - to;

                var budgetAggMap = {
                    gpc: (to - from),
                    termLength:termLength
                }
                var ignoreMinPrem = true;
                var tempDetail = getRangePremiumAndDetail(rateInfoArray[i], budgetAggMap, primaryRatingBasis, ignoreMinPrem)

                runningPremium = runningPremium + tempDetail.rangePremium
                finalRateCalcDetail = finalRateCalcDetail + (tempDetail.detail).substring(0, (tempDetail.detail).length -1)
            }
            else if( gpcAmount >= from) {
                rateCalcDetail = rateCalcDetail + (i+1) + ") "
                remainingGPC = Math.abs(gpcAmount - from)

                var budgetAggMap = {
                    gpc:remainingGPC,
                    termLength:termLength
                }
                var ignoreMinPrem = true;
                var tempDetail = getRangePremiumAndDetail(rateInfoArray[i], budgetAggMap, primaryRatingBasis, ignoreMinPrem)

                runningPremium = runningPremium + tempDetail.rangePremium

                finalRateCalcDetail = finalRateCalcDetail  + tempDetail.detail + "AGGREGATE PREMIUM = "  + formatMoney(runningPremium) + "\n"
                if(runningPremium < getIntValueOfMoney(rateInfoArray[i].minPrem)){
                    runningPremium  = getIntValueOfMoney(rateInfoArray[i].minPrem)
                    finalRateCalcDetail = finalRateCalcDetail + "=> MIN PREM = " + runningPremium
                }

            }
            rateCalcDetail = rateCalcDetail + "If Budget Agg is " + formatMoney( from ) + " to " + formatMoney( rateInfoArray[i].to ) + ", " + rateType + " = " + rateValue + ", Min Prem = " + minPrem

            //IF BUDGET FALLS WITHIN THIS RANGE
            if( gpcAmount >= from && gpcAmount <= to){
                //IF ADDITIONAL CONDITIONS EXIST, RATE THE ADDITIONAL CONDITION
                if(rateInfoArray[i].hasOwnProperty('additionalRate')){
                    var additional_rateInfoArray = rateInfoArray[i].additionalRate

                    //LOOP THROUGH ADDITIONAL RATING BASIS'S
                    //console.log("ADDITIONAL")
                    //console.log(additional_rateInfoArray)
                    for(var j=0; j < additional_rateInfoArray.length; j++){
                        var additional_rateInfoMap = additional_rateInfoArray[j]
                        var additional_totalPremiumAndDetail = getTotalPremiumAndDetail(additional_rateInfoMap, policyInfoMap, false)
                        // finalRateCalcDetail = additional_totalPremiumAndDetail.finalRateCalcDetail

                        totalPremium = additional_totalPremiumAndDetail.totalPremium
                        rateCalcDetail = rateCalcDetail + "\n" + additional_totalPremiumAndDetail.detail.trim().replace(/^/gm, "\t") + "\n";
                    }
                }
                //IF ADDITIONAL CONDITIONS DO NOT EXIST, RATE ORIGINAL CONDITION
                else{
                    rateCalcDetail = rateCalcDetail.substring(0, rateCalcDetail.lastIndexOf("\n")) + "\n=> " + rateCalcDetail.substring(rateCalcDetail.lastIndexOf("\n")+1, rateCalcDetail.length)
                    rateCalcDetail = rateCalcDetail + "\n"

                    var rateAgainstVal = gpcAmount
                    // var rangePremiumAndDetail = getRangePremiumAndDetail(rateInfoArray[i], policyInfoMap, primaryRatingBasis, rateAgainstVal)
                    //console.log(rangePremiumAndDetail)

                    // totalPremium = rangePremiumAndDetail.rangePremium
                    // finalRateCalcDetail = rangePremiumAndDetail.detail
                }
            }
            //IF NOT WITHIN THIS RANGE, CHECK FOR ADDITIONAL CONDITION TO PRINT ONLY NOT RATE
            else if(rateInfoArray[i].hasOwnProperty('additionalRate')){
                var additional_rateInfoArray = rateInfoArray[i].additionalRate

                //LOOP THROUGH ADDITIONAL RATING BASIS'S
                for(var j=0; j < additional_rateInfoArray.length; j++){
                    var additional_rateInfoMap = additional_rateInfoArray[j]
                    var additional_totalPremiumAndDetail = getTotalPremiumAndDetail(additional_rateInfoMap, policyInfoMap, false)

                    //REPLACE THE ARROW INDICATING CHOSEN RANGE FOR RATE BECAUSE THIS IS DISPLAY ONLY, NOT THE CHOSEN RATE
                    var additional_detailDisplayOnly = additional_totalPremiumAndDetail.detail.replace("=>", "")

                    rateCalcDetail = rateCalcDetail + "\n" + additional_detailDisplayOnly.trim().replace(/^/gm, "\t") + "\n";
                }
            }
            //IF NOT WITHIN THIS RANGE, SKIP TO NEXT RANGE
            else{
                rateCalcDetail = rateCalcDetail + "\n"
            }
        }
    }


    if(isPrimary){
        rateCalcDetail = rateCalcDetail +  finalRateCalcDetail
    }
    else{
        rateCalcDetail = rateCalcDetail
    }





    return { totalPremium:totalPremium, detail: rateCalcDetail, finalRateCalcDetail: finalRateCalcDetail }
}

function updateDeductiblesBasedOnLimitInputs(){
    //LOOP THROUGH ALL COVERAGE LIMIT DEDUCT CONTAINERS
    $('.coverageLimDeductContainer').each(function(){
        var covID = $(this).attr('data-covid')
        var coverageObject = getCoverageObject(covID)

        //LOOP THROUGH LIMIT INPUTS IN THIS COVERAGE CONTAINER
        $(this).find('input.limitValue').each(function(){
            var limitDescription = $(this).attr('data-limitdescription')
            var rateID = $(this).attr('data-rateid')
            var rateObject = getRateObjectByID(rateID)
            var limitRateArray = jsonStringToObject(rateObject.limitRateArray)

            var limitLogicArray
            for(var i=0;i<limitRateArray.length;i++){
                if(limitRateArray[i].limitDescription === limitDescription){
                    limitLogicArray = limitRateArray[i].limitLogic
                }
            }
            var deductChangeMap = evaluateLogicConditionArray(limitLogicArray)
            var deductDescription = deductChangeMap.deductDescription
            var deductValue = deductChangeMap.outputValue

            //CHANGE THE DEDUCTS
            $(".deductValue[data-deductdescription='" + deductDescription + "']").html(deductValue)

        })
    })

    var coveragesAndPackagesArray = getCoveragesAndPackagesSelectedArray()

    for(var i=0;i<coveragesAndPackagesArray.length;i++){
        var covID = coveragesAndPackagesArray[i]
        var coverageObject = getCoverageObject(covID)
        if(coverageObject.packageFlag === 'Y'){
            var lobSelectedArray = getLOBSSelectedInPackageArray(covID)
        }
        else{

        }
    }
}


function calculateProductOptionPremium(productObject){
    var rateMap = getRateObjectByID(productObject.rateCode)
    var rateBasis = rateMap.rateBasis
    var ratingBasisMap = getRatingBasisObjectByID(rateBasis)
    var premium = 0
    var additionalOptionPremiums = {}

    if(rateBasis !== "invalid"){
        if(rateBasis === 'LIMIT'){
            var limitRateArray = jsonStringToObject( rateMap.limitRateArray )

            for(var i=0;i<limitRateArray.length;i++){
                var limDescription = limitRateArray[i].limitDescription
                var userInputValue = getLimitValueFromLimitDescription(productObject.coverage, limitRateArray[i])


                premium = calculateLimitPremium(rateMap, limDescription, userInputValue)
            }
        }
        else if(rateBasis === 'BRACKET'){
            var basisQuestionID = rateMap.tieredQuestionID
            var basisQuestionValue = getFloatValueOfMoney($('#' + basisQuestionID).val())

            var bracketRateArray = jsonStringToObject(rateMap.bracketRateArray)

            var remainingAmountOfQuestionValue = basisQuestionValue
            for(var i=0;i<bracketRateArray.length;i++) {
                var thisBracketMap = jsonStringToObject(bracketRateArray[i])
                var rateValue = parseFloat(thisBracketMap.rateValue)
                var upto = parseFloat(thisBracketMap.upto)

                if (remainingAmountOfQuestionValue > upto) {
                    remainingAmountOfQuestionValue = remainingAmountOfQuestionValue - upto
                    premium = premium + (upto * rateValue)
                }
                else {
                    premium = premium + (remainingAmountOfQuestionValue * rateValue)
                    remainingAmountOfQuestionValue = 0
                }
            }

        }
        else if(rateBasis === 'FLAT'){
            var flatAmount = parseFloat(rateMap.flatAmount)

            premium = flatAmount
        }
        else if(rateBasis === 'RATESHEET'){
            runWCRateSheet('TOTAL', productObject)
        }
        else{
            var rateValue = parseFloat(rateMap.rateValue)
            var basisQuestionID = ratingBasisMap.basisQuestionID
            var basisQuestionValue = getFloatValueOfMoney($('#' + basisQuestionID).val())

            premium = basisQuestionValue * rateValue

        }

        //CHECK ADDITIONAL OPTIONS
        if(productObject){
            additionalOptionPremiums = checkAdditionalOptionsForPremiumChanges(productObject, premium)

            //ADD OPTION PREMIUMS THAT COUNT TOWARD MIN PREMIUM
            premium = parseFloat(premium) + parseFloat(additionalOptionPremiums.applyMPPremiums)
        }

        //CHECK MIN PREMIUM IS MET
        if(rateMap.minPremium){
            var minPremium = rateMap.minPremium

            if(premium < minPremium){
                premium = minPremium
            }
        }

        //ADD ADDITIONAL OPTION PREMIUMS THAT ARE ADDED AFTER MIN PREMIUM CHECK
        if(additionalOptionPremiums.nonAppliedPremiums){
            premium = parseFloat(premium) + parseFloat(additionalOptionPremiums.nonAppliedPremiums)
        }
    }

    return parseFloat(premium)
}

function calculateProductOptionPremium_RatedPremium(productObject){
    var rateMap = getRateObjectByID(productObject.rateCode)
    var rateBasis = rateMap.rateBasis
    var ratingBasisMap = getRatingBasisObjectByID(rateBasis)
    var premium = 0
    var additionalOptionPremiums = {}

    if(rateBasis !== "invalid"){
        if(rateBasis === 'LIMIT'){
            var limitRateArray = jsonStringToObject( rateMap.limitRateArray )

            for(var i=0;i<limitRateArray.length;i++){
                var limDescription = limitRateArray[i].limitDescription
                var userInputValue = getLimitValueFromLimitDescription(productObject.coverage, limitRateArray[i])


                premium = calculateLimitPremium(rateMap, limDescription, userInputValue)
            }
        }
        else if(rateBasis === 'BRACKET'){
            var basisQuestionID = rateMap.tieredQuestionID
            var basisQuestionValue = getFloatValueOfMoney($('#' + basisQuestionID).val())

            var bracketRateArray = jsonStringToObject(rateMap.bracketRateArray)

            var remainingAmountOfQuestionValue = basisQuestionValue
            for(var i=0;i<bracketRateArray.length;i++) {
                var thisBracketMap = jsonStringToObject(bracketRateArray[i])
                var rateValue = parseFloat(thisBracketMap.rateValue)
                var upto = parseFloat(thisBracketMap.upto)

                if (remainingAmountOfQuestionValue > upto) {
                    remainingAmountOfQuestionValue = remainingAmountOfQuestionValue - upto
                    premium = premium + (upto * rateValue)
                }
                else {
                    premium = premium + (remainingAmountOfQuestionValue * rateValue)
                    remainingAmountOfQuestionValue = 0
                }
            }

        }
        else if(rateBasis === 'FLAT'){
            var flatAmount = parseFloat(rateMap.flatAmount)

            premium = flatAmount
        }
        else{
            var rateValue = parseFloat(rateMap.rateValue)
            var basisQuestionID = ratingBasisMap.basisQuestionID
            var basisQuestionValue = getFloatValueOfMoney($('#' + basisQuestionID).val())

            premium = basisQuestionValue * rateValue

        }

        //CHECK ADDITIONAL OPTIONS
        if(productObject){
            additionalOptionPremiums = checkAdditionalOptionsForPremiumChanges(productObject, premium)

            //ADD OPTION PREMIUMS THAT COUNT TOWARD RATED PREMIUM
            premium = parseFloat(premium) + parseFloat(additionalOptionPremiums.applyMPPremiums)
        }


    }

    return parseFloat(premium)
}

function canProductPremiumCalculate(productObject){
    var rateMap = getRateObjectByID(productObject.rateCode)
    var rateBasis = rateMap.rateBasis
    var ratingBasisMap = getRatingBasisObjectByID(rateBasis)

    if(rateBasis !== "invalid"){
        if(rateBasis === 'LIMIT'){
            var limitRateArray = jsonStringToObject( rateMap.limitRateArray )

            for(var i=0;i<limitRateArray.length;i++){
                //CHECK IF LIMIT EXISTS
                var userInputValue = getLimitValueFromLimitDescription(productObject.coverage, limitRateArray[i])
                if(userInputValue){
                    return true
                }
                else{
                    return false
                }
            }
        }
        else if(rateBasis === 'BRACKET'){
            var basisQuestionID = rateMap.tieredQuestionID

            if( doesQuestionExistOnPage(basisQuestionID) ){
                return true
            }
            else{
                return false
            }
        }
        else if(rateBasis === 'FLAT'){
            return true
        }
        else if(rateBasis === 'RATESHEET'){
            //WC RATE SHEET REQUIRES 2PREM RATE CODES TO HAVE INPUTS

        }
        else{
            var basisQuestionID = ratingBasisMap.basisQuestionID

            if( doesQuestionExistOnPage(basisQuestionID) ){
                return true
            }
            else{
                return false
            }
        }

        //CHECK ADDITIONAL OPTIONS
        if(productObject){
            var additionalOptionPremiums = {}
            additionalOptionPremiums = checkAdditionalOptionsForPremiumChanges(productObject)
        }
    }
}

function getRatingBasisQuestionAbbrev(questionID){
    var basisAbbrev = ""

    if(questionID === 'totalBudgetConfirm'){
        basisAbbrev = "GPC"
    }
    else if(questionID === 'belowTheLineTotal'){
        basisAbbrev = "BTL"
    }
    else if(questionID === 'nipcInput'){
        basisAbbrev = "NIPC"
    }

    return basisAbbrev
}


//RATING LOGIC
function runWCRateSheet(MODE, productObject){
    //IF MODE IS PREMIUMDISPLAY: BUILD PREMIUMLINEHTML AND RETURN IT
    //IF MODE IS TOTAL: RETURN TOTAL PREMIUM AND FEES

    var covID = productObject.coverage
    var productID = productObject.productID
    var coverageMap = getCoverageObject(covID)

    var rateID = productObject.rateCode
    var rateSheetObject = getRateSheetObjectByID(rateID)
    var rateSheetArray = JSON.parse(rateSheetObject.rateSheetArray)

    var state = getInsuredMailingState()
    var rateCodeArray = rateSheetArray[state]

    var premiumLineHTML = ""

    //PREMIUM LINES HEADER ROW
    premiumLineHTML = premiumLineHTML +
        "<div class='row premiumLineRow premiumHeaderRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
        "   <div class='col-xs-8' style='height: 12px;'>" +
        "   </div>" +
        "   <div class='col-xs-2' style='padding:0px; text-align: center; height: 12px;'>" +
        "       <span style='font-size:12px;'>Estimated Premiums</span>" +
        "   </div>" +
        "   <div class='col-xs-4'> " +
        "       <span class='premiumLine_description' style=''>" + coverageMap.coverageName + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class=''>" + "Basis" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class=''>" + "Rate" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-1' style='padding:0px; text-align: center;'> " +
        "       <span class='' style='font-size:9px;'>" + "Subj. to Mod" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-1' style='padding:0px; text-align: center;'> " +
        "       <span class='' style='font-size:9px;'>" + "All Others" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'>" +
        "   </div>" +
        "</div>"

    var payrollInputTotal = 0
    var payrollPremiumTotal = 0
    var premiumTotalAgainstMP = 0
    var employerLiabilityPremiumTotal = 0
    var rateSheetTotalPremium = 0
    var rateSheetTotalFees = 0
    var rateSheetTotalPremiumAndFees = 0

    //LOOP TRHOUGH RATE CODES TO INSERT NECESSARY LINES
    for(var i=0; i<rateCodeArray.length; i++){
        var rateCode = rateCodeArray[i]
        var rateCodeObject = getWCRateObjectByIDAndState(rateCode, state, productObject.productID)

        var howProcessed = rateCodeObject.howProcessed

        var testResultRowObject = {
            code: rateCode,
            description: rateCodeObject.description
        }

        //BUILD EACH ROW BASED ON WHAT THE RATE CODE AND HOW IT IS PROCESSED
        if(howProcessed === "1STD"){
            continue;
        }
        else if(howProcessed === '2RATE'){
            //PAYROLL PREMIUM ROW

            //FIND THE INPUT WITH THE RATE CODE
            testResultRowObject.basisValue = getIntValueOfMoney($("#" + rateCode + "_WCPayroll").val())
            testResultRowObject.rate = rateCodeObject.rate

            var thisPayrollPremium = Math.round( ( parseFloat(testResultRowObject.basisValue) * parseFloat(testResultRowObject.rate) ) / 100 )
            testResultRowObject.modPrem = thisPayrollPremium

            premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(testResultRowObject, coverageMap)
            payrollPremiumTotal = parseFloat(payrollPremiumTotal) + parseFloat(thisPayrollPremium)
            premiumTotalAgainstMP = parseFloat(premiumTotalAgainstMP) + parseFloat(thisPayrollPremium)
            rateSheetTotalPremium = parseFloat(rateSheetTotalPremium) + parseFloat(thisPayrollPremium)
            payrollInputTotal = parseFloat(payrollInputTotal) + parseFloat(testResultRowObject.basisValue)
        }
        else if(howProcessed === '3PREM'){
            if(rateCodeObject.nonMod === '1' ){
                testResultRowObject.otherPrem = rateCodeObject.premium
            }
            else{
                testResultRowObject.modPrem = rateCodeObject.premium
            }

            premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(testResultRowObject, coverageMap)
            premiumTotalAgainstMP = parseFloat(premiumTotalAgainstMP) + parseFloat(rateCodeObject.premium)
            rateSheetTotalPremium = parseFloat(rateSheetTotalPremium) + parseFloat(rateCodeObject.premium)

        }
        else if(howProcessed === '4EL'){
            //ADD PREMIUMS FOR PAYROLL
            var employerLiabilityPrem = Math.round( (parseFloat(payrollPremiumTotal) * parseFloat(rateCodeObject.rate)) / 100 )

            testResultRowObject.basisValue = payrollPremiumTotal
            testResultRowObject.rate = rateCodeObject.rate
            testResultRowObject.modPrem = employerLiabilityPrem

            premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(testResultRowObject, coverageMap)

            //MAKE THE EMPLOYER LIABILITY MIN PREMIUM ROW
            var elMPRowObject = {
                code:rateCode,
                description: 'Employers Liability to Equal Minimum of ' + formatMoney(rateCodeObject.premium),
                basisValue: employerLiabilityPrem
            }

            //CHECK IF EMPLOYER LIABILITY MIN PREMIUM IS MET
            if( (parseFloat(rateCodeObject.premium) - parseFloat(employerLiabilityPrem)) > 0 ){ //NOT MET
                elMPRowObject.modPrem = parseFloat(rateCodeObject.premium) - parseFloat(employerLiabilityPrem)

                premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(elMPRowObject, coverageMap)
            }
            else{ //MET
                elMPRowObject.modPrem = 0
            }



            premiumTotalAgainstMP = parseFloat(premiumTotalAgainstMP) + parseFloat(employerLiabilityPrem)
            premiumTotalAgainstMP = parseFloat(premiumTotalAgainstMP) + parseFloat(elMPRowObject.modPrem)

            employerLiabilityPremiumTotal = parseFloat(employerLiabilityPremiumTotal) + parseFloat(employerLiabilityPrem)
            employerLiabilityPremiumTotal = parseFloat(employerLiabilityPremiumTotal) + parseFloat(elMPRowObject.modPrem)

            rateSheetTotalPremium = parseFloat(rateSheetTotalPremium) + parseFloat(employerLiabilityPrem)
            rateSheetTotalPremium = parseFloat(rateSheetTotalPremium) + parseFloat(elMPRowObject.modPrem)
        }
        else if(howProcessed === '5MP'){
            var minPrem = rateCodeObject.premium
            if( ( parseFloat(minPrem) - parseFloat(premiumTotalAgainstMP) ) > 0 ){ //NOT MET
                testResultRowObject.modPrem = parseFloat(minPrem) - parseFloat(premiumTotalAgainstMP)

                testResultRowObject.description = rateCodeObject.description + " " + formatMoney(minPrem)
                testResultRowObject.basisValue = premiumTotalAgainstMP
                testResultRowObject.rate = formatMoney(minPrem)

                premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(testResultRowObject, coverageMap)
            }
            else{ //MET
                testResultRowObject.modPrem = 0
            }

            rateSheetTotalPremium = parseFloat(rateSheetTotalPremium) + parseFloat(testResultRowObject.modPrem)

        }
        else if(howProcessed === '6PDISC'){
            var premDiscountBasisValue = 0
            if( (parseFloat(payrollPremiumTotal) + parseFloat(employerLiabilityPremiumTotal)) > parseFloat(rateCodeObject.premium) ){//IF PREMIUM IS HIGH ENOUGH FOR DISCOUNT
                premDiscountBasisValue = (parseFloat(payrollPremiumTotal) + parseFloat(employerLiabilityPremiumTotal)) - parseFloat(rateCodeObject.premium)
            }

            var premDiscount = Math.round(0 - ( (parseFloat(premDiscountBasisValue) * parseFloat(rateCodeObject.rate))/100 ) )

            testResultRowObject.basisValue = premDiscountBasisValue
            testResultRowObject.rate = rateCodeObject.rate
            testResultRowObject.modPrem = premDiscount

            premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(testResultRowObject, coverageMap)

            rateSheetTotalPremium = parseFloat(rateSheetTotalPremium) + parseFloat(testResultRowObject.modPrem)

        }
        else if(howProcessed === 'FEE_PR'){
            var rate = rateCodeObject.rate

            var premium = Math.round( ( parseFloat(payrollInputTotal) * parseFloat(rate) ) / 100 )
            if(rateCodeObject.nonMod === '1' ){
                testResultRowObject.otherPrem = premium
            }
            else{
                testResultRowObject.modPrem = premium
            }

            testResultRowObject.basisValue = payrollInputTotal
            testResultRowObject.rate  = rate

            premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(testResultRowObject, coverageMap)

            rateSheetTotalPremium = parseFloat(rateSheetTotalPremium) + parseFloat(premium)
        }
        else if(howProcessed === 'FEE_RATE'){
            var totalPremium = 0

            testResultRowObject.basisValue = rateSheetTotalPremium
            testResultRowObject.rate = rateCodeObject.rate

            var premium = Math.round( ( parseFloat(rateSheetTotalPremium) * parseFloat(rateCodeObject.rate) ) / 100 )
            if(rateCodeObject.nonMod === '1' ){
                testResultRowObject.otherPrem = premium
            }
            else{
                testResultRowObject.modPrem = premium
            }

            premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(testResultRowObject, coverageMap)

            rateSheetTotalFees = parseFloat(rateSheetTotalFees) + parseFloat(premium)

        }
        else if(howProcessed === 'FEE_EL' || howProcessed === 'FEE_ME'){
            var basisValue = parseFloat(payrollPremiumTotal) + parseFloat(employerLiabilityPremiumTotal)

            var rate = rateCodeObject.rate

            var premium = Math.round( ( parseFloat(basisValue) * parseFloat(rate) ) / 100 )
            if(rateCodeObject.nonMod === '1' ){
                testResultRowObject.otherPrem = premium
            }
            else{
                testResultRowObject.modPrem = premium
            }

            testResultRowObject.basisValue = basisValue
            testResultRowObject.rate = rate

            premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(testResultRowObject, coverageMap)

            rateSheetTotalFees = parseFloat(rateSheetTotalFees) + parseFloat(premium)

        }
        else if(howProcessed === 'FEE_MEL'){

            var basisValue = parseFloat(payrollPremiumTotal)

            var rate = rateCodeObject.rate

            var premium = Math.round( ( parseFloat(basisValue) * parseFloat(rate) ) / 100 )
            if(rateCodeObject.nonMod === '1' ){
                testResultRowObject.otherPrem = premium
            }
            else{
                testResultRowObject.modPrem = premium
            }

            testResultRowObject.basisValue = basisValue
            testResultRowObject.rate = rate

            premiumLineHTML = premiumLineHTML + getPremiumLineHTML_WCRateSheet(testResultRowObject, coverageMap)

            rateSheetTotalFees = parseFloat(rateSheetTotalFees) + parseFloat(premium)
        }
        else if(howProcessed === 'FEE_WV'){
            //TODO: WEST VIRGINIA NOT COMPLETE YET

        }
    }

    rateSheetTotalPremiumAndFees = parseFloat(rateSheetTotalPremium) + parseFloat(rateSheetTotalFees)

    //COVERAGE TOTAL LINE
    premiumLineHTML = premiumLineHTML +
        "<div class='row premiumLineRow premiumCoverageTotalRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
        "   <div class='col-xs-4'> " +
        "       <span class='premiumLine_description' style=''>" + covID + " Total" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class=''>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class=''>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class=''>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_premium coverageTotalPremium'>" + formatMoney(rateSheetTotalPremiumAndFees) + "</span> " +
        "   </div> " +
        "</div>"

    if(MODE === 'PREMIUMDISPLAY'){
        return premiumLineHTML
    }
    else if(MODE === 'TOTAL'){
        return rateSheetTotalPremiumAndFees
    }
    else if(MODE === 'TOTALPREMIUM'){
        return rateSheetTotalPremium
    }
    else if(MODE === 'TOTALFEES'){
        return rateSheetTotalFees
    }
}



