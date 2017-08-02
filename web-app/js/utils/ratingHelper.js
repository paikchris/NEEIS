var testRateInfoMap = {}
var testPolicyInfoMap = {}



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


function calculatePercentRate(){

}
function calculateFlatRate(){

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