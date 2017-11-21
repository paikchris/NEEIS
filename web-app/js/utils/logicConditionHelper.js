
//DATA PAGE

function fillPackageLOBRateConditionsVersion2(lobInfoContainer, lobRateConditionArray){
    var rateConditionsContainer = $(lobInfoContainer).find('.logicConditionRowsContainer')
    var lobID = $(lobInfoContainer).attr('data-covid')
    $(rateConditionsContainer).html("")

    fillLogicRowContainerWithLogicArray(lobRateConditionArray, rateConditionsContainer, lobID, "RATE")


    checkFormatOfAllRows( $(rateConditionsContainer) )
    formatConditionBasisInputs()
}
function buildLogicArrayForLogicContainer(logicConditionRowsContainer){
    var logicArray = []

    $(logicConditionRowsContainer).children('.logicConditionRow').each(function(){
        var mainLogicContainer = $(this).children('.mainLogicContainer')
        var subLogicContainer = $(this).children('.subLogicConditionRow')

        var thisRowLogicMap = {}
        if($(mainLogicContainer).length > 0){
            thisRowLogicMap.logicCondition = $(mainLogicContainer).find('.rowConditionDropdown').val()
            thisRowLogicMap.conditionBasis = $(mainLogicContainer).find('.conditionBasis').val()
            thisRowLogicMap.conditionOperator = $(mainLogicContainer).find('.conditionOperator').val()
            thisRowLogicMap.conditionBasisValue = $(mainLogicContainer).find('.conditionBasisValue').val()
            thisRowLogicMap.outputID = $(mainLogicContainer).find('.conditionOutputSelect').val()
        }

        //IF SUB LOGIC EXISTS
        var subConditionArray = []
        if( $(subLogicContainer).length > 0 ){
            subConditionArray = buildLogicArrayForLogicContainer(subLogicContainer)
        }

        thisRowLogicMap.subLogic = subConditionArray

        logicArray.push(thisRowLogicMap)
    })

    return logicArray
}
function fillLogicRowContainerWithLogicArray(logicArray, logicRowsContainer, COVID, RATE_OR_PRODUCT){
    for(var i=0;i<logicArray.length; i++){
        var logicRow
        if(RATE_OR_PRODUCT === "RATE"){
            logicRow = $(blankLogicRowHTML(COVID, RATE_OR_PRODUCT))
        }
        else if(RATE_OR_PRODUCT === "PRODUCT"){
            logicRow = $(blankLogicRowHTML(COVID, RATE_OR_PRODUCT))
        }

        var thisConditionMap = jsonStringToObject(logicArray[i])
        var conditionBasis = thisConditionMap.conditionBasis
        var conditionBasisValue = thisConditionMap.conditionBasisValue
        var conditionOperator = thisConditionMap.conditionOperator
        var logicCondition = thisConditionMap.logicCondition
        var outputID
        //TEMP
        if(thisConditionMap.outputID){
            outputID = thisConditionMap.outputID
        }
        else if( thisConditionMap.rateID){
            outputID = thisConditionMap.rateID
        }
        else if( thisConditionMap.productID){
            outputID = thisConditionMap.productID
        }

        $(logicRow).find('.rowConditionDropdown').val(logicCondition)
        rowConditionDropdownChange($(logicRow).find('.rowConditionDropdown'))
        $(logicRow).find('.conditionBasis').val(conditionBasis)
        logicConditionBasisDropdownChange($(logicRow).find('.conditionBasis'))

        $(logicRow).find('.conditionOperator').val(conditionOperator)
        $(logicRow).find('.conditionBasisValue').val(conditionBasisValue)
        $(logicRow).find('.conditionOutputSelect').val(outputID)


        //BUILD SUB LOGIC CONDITION ROWS
        var sublogicArray = jsonStringToObject(thisConditionMap.subLogic)
        if(sublogicArray !== undefined && sublogicArray.length > 0){
            addSubLogicConditionRowClick( $(logicRow).find('.addSubLogicConditionRow') )
            var sublogicContainer = $(logicRow).find('.subLogicConditionRow')
            $(sublogicContainer).find('.logicConditionRow').remove()

            fillLogicRowContainerWithLogicArray(sublogicArray, sublogicContainer, COVID, RATE_OR_PRODUCT)
        }

        $(logicRowsContainer).append($(logicRow))
    }
}
function logicConditionBasisDropdownChange(dropdown){
    var thisConditionRow = $(dropdown).closest('.mainLogicContainer')
    var productConditionValue = $(dropdown).val()


    if(productConditionValue === 'GPC'){
        setConditionInputToMoney(thisConditionRow)
    }
    else if(productConditionValue === 'BTL' ){
        setConditionInputToMoney(thisConditionRow)
    }
    else if(productConditionValue === 'SQFT' ){
        setConditionInputToText(thisConditionRow)
    }
    else if(productConditionValue === 'CAST' ){
        setConditionInputToText(thisConditionRow)
    }
    else if(productConditionValue === 'STATE' ){
        setConditionInputToStateDropdown(thisConditionRow)
    }
    else if(productConditionValue === 'COVID' ){
        setConditionInputToCoverageDropdown(thisConditionRow)
    }
    else if(productConditionValue === 'POLICYLENGTH'){
        setConditionInputToNumber(thisConditionRow)
    }
    else if(productConditionValue === 'DICEVSFEATURE'){
        setConditionInputToText(thisConditionRow)
    }

    $(thisConditionRow).find('.conditionBasisValue').addClass('onChangeSaveOperation')

    formatConditionBasisInputs()
}
function formatConditionBasisInputs(){
    $('.logicConditionRowsContainer').each(function(){
        var productConditionBasisDropdown = $(this).find('.conditionBasis')
        var productConditionBasisID = $(productConditionBasisDropdown).val()
        var conditionValueInput = $(this).find('.conditionBasisValue')

        if(productConditionBasisID === 'GPC' || productConditionBasisID === 'BTL'){
            $(conditionValueInput).addClass('maskMoney')
            maskMoneyThisInput($(conditionValueInput) )
        }
        else{
            $(conditionValueInput).removeClass('maskMoney')
            $(conditionValueInput).maskMoney('destroy')
            $(conditionValueInput).attr("placeholder", "")
        }

        numericInputOnlyInit()
    })


}
function blankLogicRowHTML(COV_OR_LOB_ID, RATE_OR_PRODUCT){
    var htmlString = "" +
        "   <div class='col-xs-12 packageRate logicConditionRow'>" +
        "       <div class='row mainLogicContainer' style='margin-left: -5px;'>" +
        "           <div class='col-xs-1' style=''>" +
        "               <select class='form-control rowConditionDropdown onChangeSaveOperation'>" +
        "                   <option class='alwaysOption' value='ALWAYS'>ALWAYS</option>" +
        "                   <option class='ifOption' value='IF'>IF</option>" +
        "                   <option class='ifElseOption' value='IFELSE' >IF ELSE</option>" +
        "                   <option class='elseOption' value='ELSE' >ELSE</option>" +
        "               </select>" +
        "           </div>" +
        "           <div class='col-xs-1' style='visibility:hidden'>" +
        "               <select class='form-control conditionBasis onChangeSaveOperation'>"

    for(var i=0;i<conditionBasis.length;i++){
        htmlString = htmlString +
            "               <option value='" + conditionBasis[i].conditionID + "'>" + conditionBasis[i].description + "</option>"
    }

    htmlString = htmlString +
        "               </select>" +
        "           </div>" +
        "           <div class='col-xs-1' style='visibility:hidden'>" +
        "               <select class='form-control conditionOperator onChangeSaveOperation'>"

    for(var i=0;i<conditionOperators.length;i++){
        htmlString = htmlString +
            "               <option value='" + conditionOperators[i].conditionID + "'>" + conditionOperators[i].description + "</option>"
    }

    htmlString = htmlString +
        "               </select>" +
        "           </div>" +
        "           <div class='col-xs-2' style='visibility:hidden'>" +
        "               <div class='form-group'>" +
        "                   <input class='form-control conditionBasisValue maskMoney onChangeSaveOperation' type='text' data-precision='0' data-prefix='$'>" +
        "               </div>" +
        "           </div>" +
        "           <div class='col-xs-4'>" +
        "               <select class='form-control conditionOutputSelect onChangeSaveOperation " + COV_OR_LOB_ID + "_RateForCoverageSelect'" +
        "                   data-covid='" + COV_OR_LOB_ID + "'>"

    if(RATE_OR_PRODUCT === 'RATE'){
        for(var i=0;i<rates.length;i++){
            htmlString = htmlString +
                "               <option value='" + rates[i].rateID + "'>" + rates[i].rateID + " - " + rates[i].description + "</option>"
        }
    }
    else if(RATE_OR_PRODUCT === 'PRODUCT'){
        for(var i=0;i<products.length;i++){
            if(products[i].coverage === COV_OR_LOB_ID ){
                htmlString = htmlString +
                    "               <option value='" + products[i].productID + "'>" + products[i].productID + " - " + products[i].productName + "</option>"
            }
        }
    }


    htmlString = htmlString +
        "               </select>" +
        "           </div>" +
        "           <div class='col-xs-3 buttonColumn' style='visibility:hidden'>" +
        "               <button class='btn btn-sm btn-primary pull-left addLogicConditionRow' style='margin-left:10px;'>" +
        "                   <span>Add Row</span>" +
        "               </button>" +
        "               <button class='btn btn-sm pull-left addSubLogicConditionRow'>" +
        "                   <span>Add Sub Logic</span>" +
        "               </button>" +
        "               <button class='btn btn-xs btn-success pull-left moveLogicRowDownButton onChangeSaveOperation' style='border-radius:20px; margin-left:10px;font-size:10px;'>" +
        "                   <i class='fa fa-arrow-down' aria-hidden='true'></i>" +
        "               </button>" +
        "               <button class='btn btn-xs btn-success pull-left moveLogicRowUpButton onChangeSaveOperation' style='border-radius:20px;  font-size:10px;'>" +
        "                   <i class='fa fa-arrow-up' aria-hidden='true'></i>" +
        "               </button>" +
        "               <button class='btn btn-sm btn-danger pull-right removeLogicConditionRow onChangeSaveOperation' style='display:none'>" +
        "                   <span>Remove</span>" +
        "               </button>" +
        "           </div>" +
        "       </div>" +
        "   </div>"

    return htmlString
}



//NEW SUBMISSION PAGE
function getConditionBasisObject(conditionBasisID){
    for(var i=0; i < conditionBasisArray.length; i++ ){
        if(conditionBasisArray[i].conditionID === conditionBasisID){
            return conditionBasisArray[i]
        }
    }
}
function evaluateLogicConditionRowVersion2(logicConditionRowMap){
    var rowLogicCondition = logicConditionRowMap.logicCondition
    var outputID = logicConditionRowMap.outputID

    if(rowLogicCondition === "ALWAYS"){
        return outputID
    }
    else{
        var conditionOperator = logicConditionRowMap.conditionOperator
        var conditionBasis = logicConditionRowMap.conditionBasis
        var conditionBasisValue = formatBasisValue(logicConditionRowMap.conditionBasisValue)

        //GET ACTUAL BASIS VALUE
        var actualBasisValue = getActualBasisValue(conditionBasis)

        if(actualBasisValue !== undefined && actualBasisValue !== null ){
            //IF THIS LOGIC CONDITION IS TRUE
            if( evaluateCondition(conditionOperator, conditionBasisValue, actualBasisValue) ){
                //CHECK FOR SUB LOGIC CONDITIONS

                var subLogicArray = jsonStringToObject(logicConditionRowMap.subLogic)

                //IF SUBLOGIC ROWS EXIST
                if(subLogicArray !== null && subLogicArray !== undefined && subLogicArray.length > 0){
                    for(var i=0;i<subLogicArray.length;i++){
                        var subLogicConditionRowMap = jsonStringToObject(subLogicArray[i])
                        var subLogicOutputID = subLogicConditionRowMap.outputID

                        if( evaluateLogicConditionRowVersion2(subLogicConditionRowMap) ){
                            return subLogicOutputID
                        }
                        else{
                            continue
                        }
                    }
                }
                else{
                    return outputID
                }
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }

    return false
}
function evaluateCondition(conditionOperator, conditionBasisValue, actualBasisValue){
    //WHAT IS THE OPERATOR (<,>,<=,>=, etc), AND IS CONDITION TRUE
    if(conditionOperator === 'LESSTHAN'){
        if(actualBasisValue < conditionBasisValue){
            return true
        }
    }
    else if(conditionOperator === 'LESSEQUAL'){
        if(actualBasisValue <= conditionBasisValue){
            return true
        }
    }
    else if(conditionOperator === 'GREATERTHAN'){
        if(actualBasisValue > conditionBasisValue){
            return true
        }
    }
    else if(conditionOperator === 'GREATEREQUAL'){
        if(actualBasisValue >= conditionBasisValue){
            return true
        }
    }
    else if(conditionOperator === 'EQUAL'){
        if(actualBasisValue === conditionBasisValue){
            return true
        }
    }

    return false
}
function getActualBasisValue(conditionBasis){
    var conditionBasisInputID = getConditionBasisInputFromConditionBasisID(conditionBasis)
    var questionObject = getQuestionObjectForID(conditionBasisInputID)

    //CHECK IF QUESTION EXISTS ON PAGE, IF NOT RETURN UNDEFINED
    if( $('#step-2 #' + conditionBasisInputID).length > 0){
        if( questionObject.inputType === 'radio' || questionObject.inputType === 'checkbox' ){
            var conditionBasisInput = $('div.requiredQuestion.' + conditionBasisInputID)
            var actualBasisValue = $(conditionBasisInput).find("input[type='" + questionObject.inputType + "']:checked").val()

            if(actualBasisValue){

            }
            else{
                actualBasisValue = ""
            }

            return formatBasisValue(actualBasisValue)
        }
        else{
            var conditionBasisInput = $('#' + conditionBasisInputID)
            var actualBasisValue = $(conditionBasisInput).val()

            if(conditionBasis === "POLICYLENGTH"){
                actualBasisValue = removeAllNonNumbersFromString(actualBasisValue)
            }

            return formatBasisValue(actualBasisValue)
        }
    }
    else if( questionObject.inputType === 'radio' ){
        var conditionBasisInput = $('div.requiredQuestion.' + conditionBasisInputID)
        var actualBasisValue = $(conditionBasisInput).find("input[type='" + questionObject.inputType + "']:checked").val()

        if(actualBasisValue){

        }
        else{
            actualBasisValue = ""
        }

        return formatBasisValue(actualBasisValue)
    }
    else if( questionObject.inputType === 'checkbox' ){
        var conditionBasisInput = $('div.requiredQuestion.' + conditionBasisInputID)
        var actualBasisValue = $(conditionBasisInput).find("input[type='" + questionObject.inputType + "']:checked").val()

        return formatBasisValue(actualBasisValue)
    }
    else{
        return undefined
    }

}
function formatBasisValue(conditionBasisValue){
    //IF CONDITION BASIS IS MONEY
    if( isStringMoney(conditionBasisValue)){
        return getFloatValueOfMoney(conditionBasisValue)
    }
    //IF CONDITION BASIS IS A NUMBER
    else if( isNaN(conditionBasisValue) === false ){
        return getFloatValueOfMoney(conditionBasisValue)
    }
    else{
        return conditionBasisValue
    }
}
function getRequiredQuestionsForProductLogicConditions(coverageProductMap){
    var coverageProductMapKeys = Object.keys(coverageProductMap)
    var requiredQuestionsMap = {}

    for(var i=0; i<coverageProductMapKeys.length; i++){
        var covID = coverageProductMapKeys[i]
        var logicConditionRows = coverageProductMap[covID]
        var requiredQuestionsArray = []

        for(var j=0; j<logicConditionRows.length; j++){
            var logicConditionRow = logicConditionRows[j]
            var logicCondition = logicConditionRow.logicCondition

            if(logicCondition !== 'ALWAYS'){
                var conditionBasisID = logicConditionRow.conditionBasis
                var requiredQuestion = getConditionBasisObject(conditionBasisID).questionID

                requiredQuestionsArray.push(requiredQuestion)

                //CHECK FOR SUBLOGIC REQUIRED QUESTIONS
                if(logicConditionRow.subLogic){
                    var subLogicArray = logicConditionRow.subLogic

                    for(var k=0;k<subLogicArray.length;k++){
                        var subLogicRow = subLogicArray[k]
                        var subLogicCondition = subLogicRow.logicCondition

                        if(subLogicCondition !== 'ALWAYS'){
                            var subLogicConditionBasisID = subLogicRow.conditionBasis
                            var subLogicRequiredQuestion = getConditionBasisObject(subLogicConditionBasisID).questionID

                            requiredQuestionsArray.push(subLogicRequiredQuestion)
                        }
                    }
                }

            }

        }

        requiredQuestionsMap[covID] = requiredQuestionsArray
    }

    return requiredQuestionsMap
}
function getConditionBasisInputFromConditionBasisID(conditionBasisID){
    for(var i=0;i<productConditions.length;i++){
        if(productConditions[i].conditionID === conditionBasisID){
            return productConditions[i].questionID
        }
    }
}