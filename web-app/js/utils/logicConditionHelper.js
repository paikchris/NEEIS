
//DATA PAGE
function fillPackageLOBRateConditionsVersion2(lobInfoContainer, lobRateConditionArray){
    var rateConditionsContainer = $(lobInfoContainer).find('.logicConditionRowsContainer')
    var lobID = $(lobInfoContainer).attr('data-covid')
    $(rateConditionsContainer).html("")

    fillLogicRowContainerWithLogicArray(lobRateConditionArray, rateConditionsContainer, lobID, "RATE", 'OPERATION')


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
            thisRowLogicMap.limitRateID = $('#ratePage_RatesDropdown').val()
            thisRowLogicMap.logicCondition = $(mainLogicContainer).find('.rowConditionDropdown').val()
            thisRowLogicMap.conditionBasis = $(mainLogicContainer).find('.conditionBasis').val()
            thisRowLogicMap.conditionOperator = $(mainLogicContainer).find('.conditionOperator').val()
            thisRowLogicMap.conditionBasisValue = $(mainLogicContainer).find('.conditionBasisValue').val()
            thisRowLogicMap.outputID = $(mainLogicContainer).find('.conditionOutput').val()

            if($(mainLogicContainer).find('.deductDescription').length > 0 ){
                thisRowLogicMap.outputValue = $(mainLogicContainer).find('.conditionOutputValue').val()
                thisRowLogicMap.deductDescription = $(mainLogicContainer).find('.deductDescription').val()
                thisRowLogicMap.limitDescription = $(mainLogicContainer).closest('.logicConditionRowsContainer').attr('data-limitdescription')

            }
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
function fillLogicRowContainerWithLogicArray(logicArray, logicRowsContainer, COVID, CONDITIONOUTPUT_TYPE, PAGE_TAB_ID){
    for(var i=0;i<logicArray.length; i++){
        var logicRow
        if(CONDITIONOUTPUT_TYPE === "RATE"){
            logicRow = $(blankLogicRowHTML(COVID, CONDITIONOUTPUT_TYPE, PAGE_TAB_ID))
        }
        else if(CONDITIONOUTPUT_TYPE === "PRODUCT"){
            logicRow = $(blankLogicRowHTML(COVID, CONDITIONOUTPUT_TYPE, PAGE_TAB_ID))
        }
        else if(CONDITIONOUTPUT_TYPE === "LIMIT"){
            logicRow = $(blankLogicRowHTML(COVID, CONDITIONOUTPUT_TYPE, PAGE_TAB_ID))
        }

        var thisConditionMap = jsonStringToObject(logicArray[i])
        var conditionBasis = thisConditionMap.conditionBasis
        var conditionBasisValue = thisConditionMap.conditionBasisValue
        var conditionOperator = thisConditionMap.conditionOperator
        var logicCondition = thisConditionMap.logicCondition
        var outputID

        //TEMPORARY
        if(thisConditionMap.outputID){
            outputID = thisConditionMap.outputID
        }
        else if( thisConditionMap.rateID){
            outputID = thisConditionMap.rateID
        }
        else if( thisConditionMap.productID){
            outputID = thisConditionMap.productID
        }

        //IF LIMIT, THIS WILL HAVE OUTPUTVALUE AS WELL
        var outputValue
        var deductDescription
        if(thisConditionMap.outputValue){
            outputValue = thisConditionMap.outputValue
            deductDescription = thisConditionMap.deductDescription
            $(logicRow).find('.conditionOutputValue').val(outputValue)
            $(logicRow).find('.deductDescription').val(deductDescription)

        }



        $(logicRow).find('.rowConditionDropdown').val(logicCondition)
        rowConditionDropdownChange($(logicRow).find('.rowConditionDropdown'))
        $(logicRow).find('.conditionBasis').val(conditionBasis)
        logicConditionBasisDropdownChange($(logicRow).find('.conditionBasis'))

        $(logicRow).find('.conditionOperator').val(conditionOperator)
        $(logicRow).find('.conditionBasisValue').val(conditionBasisValue)
        $(logicRow).find('.conditionOutput').val(outputID)


        //BUILD SUB LOGIC CONDITION ROWS
        var sublogicArray = jsonStringToObject(thisConditionMap.subLogic)
        if(sublogicArray !== undefined && sublogicArray.length > 0){
            addSubLogicConditionRowClick( $(logicRow).find('.addSubLogicConditionRow') )
            var sublogicContainer = $(logicRow).find('.subLogicConditionRow')
            $(sublogicContainer).find('.logicConditionRow').remove()

            fillLogicRowContainerWithLogicArray(sublogicArray, sublogicContainer, COVID, CONDITIONOUTPUT_TYPE, PAGE_TAB_ID)
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
function blankLogicRowHTML(COV_OR_LOB_ID, CONDITIONOUTPUT_TYPE, PAGE_TAB_ID){
    /*
    COV_OR_LOB_ID: The ID of the coverage or Package LOB this logic row will be inserted to
    CONDITIONOUTPUT_TYPE: Condition Output Type (RATE, PRODUCT)
    PAGE_TAB_ID: The page this logic row will be used in (OPERATION, RATE)
     */

    var onChangeClassString = ""
    if(PAGE_TAB_ID === 'OPERATION'){
        onChangeClassString = "onChangeSaveOperation"
    }
    else if(PAGE_TAB_ID === 'RATE'){
        onChangeClassString = "onChangeSaveRate"
    }

    var htmlString = "" +
        "   <div class='col-xs-12 logicConditionRow'>" +
        "       <div class='row mainLogicContainer' style='margin-left: -5px;'>" +
        "           <div class='col-xs-1' style=''>" +
        getRowConditionDropdownHTML(PAGE_TAB_ID)

    htmlString = htmlString +
        "           </div>" +
        "           <div class='col-xs-1' style='visibility:hidden'>" +
        getConditionBasisDropdownHTML(PAGE_TAB_ID) +
        "           </div>" +
        "           <div class='col-xs-1' style='visibility:hidden'>" +
        getConditionOperatorsDropdownHTML(PAGE_TAB_ID) +
        "           </div>" +
        "           <div class='col-xs-1' style='visibility:hidden'>" +
        "               <div class='form-group'>" +
        "                   <input class='form-control conditionBasisValue maskMoney " + onChangeClassString + "' type='text' data-precision='0' data-prefix='$'>" +
        "               </div>" +
        "           </div>"

    if(CONDITIONOUTPUT_TYPE === 'RATE'){
        htmlString = htmlString +
            "           <div class='col-xs-4'>" +
            "               <select class='form-control conditionOutput " + onChangeClassString + "'>"

        for(var i=0;i<rates.length;i++){
            htmlString = htmlString +
                "               <option value='" + rates[i].rateID + "'>" + rates[i].rateID + " - " + rates[i].description + "</option>"
        }

        htmlString = htmlString +
            "               </select>" +
            "           </div>"

    }
    else if(CONDITIONOUTPUT_TYPE === 'PRODUCT'){
        htmlString = htmlString +
            "           <div class='col-xs-4'>" +
            "               <select class='form-control conditionOutput " + onChangeClassString + "'>"

        for(var i=0;i<products.length;i++){
            if(products[i].coverage === COV_OR_LOB_ID ){
                htmlString = htmlString +
                    "               <option value='" + products[i].productID + "'>" + products[i].productID + " - " + products[i].productName + "</option>"
            }
        }

        htmlString = htmlString +
            "               </select>" +
            "           </div>"
    }
    else if(CONDITIONOUTPUT_TYPE === 'LIMIT'){
        htmlString = htmlString +
            "           <div class='col-xs-2' style='visibility:hidden'>" +
            "               <select class='form-control conditionOutput " + onChangeClassString + "'>"

        htmlString = htmlString +
        "                   <option value='DEDUCTCHANGES'>Deduct Value Changes To</option>"

        htmlString = htmlString +
            "               </select>" +
            "           </div>"

        htmlString = htmlString +
            "           <div class='col-xs-2' style='visibility:hidden' >" +
            "               <input class='form-control deductDescription " + onChangeClassString + "'>" +
            "           </div>" +
            "           <div class='col-xs-1' style='visibility:hidden' >" +
            "               <input class='form-control conditionOutputValue " + onChangeClassString + "'>" +
            "           </div>"

    }


    htmlString = htmlString +

        "           <div class='col-xs-3 buttonColumn' style='visibility:hidden'>" +
        "               <button class='btn btn-sm btn-primary pull-left addLogicConditionRow' style='margin-left:10px;'>" +
        "                   <span>Add Row</span>" +
        "               </button>" +
        "               <button class='btn btn-sm pull-left addSubLogicConditionRow'>" +
        "                   <span>Add Sub Logic</span>" +
        "               </button>" +
        "               <button class='btn btn-xs btn-success pull-left moveLogicRowDownButton " + onChangeClassString + "' style='border-radius:20px; margin-left:10px;font-size:10px;'>" +
        "                   <i class='fa fa-arrow-down' aria-hidden='true'></i>" +
        "               </button>" +
        "               <button class='btn btn-xs btn-success pull-left moveLogicRowUpButton " + onChangeClassString + "' style='border-radius:20px;  font-size:10px;'>" +
        "                   <i class='fa fa-arrow-up' aria-hidden='true'></i>" +
        "               </button>" +
        "               <button class='btn btn-sm btn-danger pull-right removeLogicConditionRow " + onChangeClassString + "' style='display:none'>" +
        "                   <span>Remove</span>" +
        "               </button>" +
        "           </div>" +
        "       </div>" +
        "   </div>"

    return htmlString
}

//LIMIT LOGIC
function initLimitLogicContainer(element){
    /*
    INSERTS THE STARTING CONTAINER FOR LIMIT LOGIC
     */

    var htmlString = "" +
        "<div class='row logicConditionRowsContainer rowContainer'>" +
        blankLogicRowHTML(false, 'LIMIT', 'RATE') +
        "</div>"

    
    $(element).html(htmlString)
}
function updateOrAddLimitLogicRowsContainerForLimit(limitDescription, limitIndexPosition){
    var limitLogicContainer = $('#limitLogicInitContainer')

    //FIND CONTAINER USING LIMIT INDEX POSITION
    var logicConditionContainer = $(limitLogicContainer).find('.logicConditionRowsContainer').eq(limitIndexPosition)

    if(logicConditionContainer.length !== 0){
        $(logicConditionContainer).attr('data-limitdescription', limitDescription)
        $(logicConditionContainer).find('.limitLogicHeader > span').html(limitDescription)
    }
    else{
        var htmlString = "" +
            "<div class='col-xs-12 row logicConditionRowsContainer rowContainer' data-limitdescription='" + limitDescription + "'>" +
            "   <div class='limitLogicHeader'>" +
            "       <span style='font-weight:500; padding-left: 11px;'>" + limitDescription + "</span>" +
            "   </div>" +
            blankLogicRowHTML(false, 'LIMIT', 'RATE') +
            "</div>"
        $(limitLogicContainer).append(htmlString)
    }

}
function limitLogicHeaderHTML(){
    var headerRowHTML = "" +
        "<div class='col-xs-12 row' class='limitLogicHeaderRow'>" +
        "   <div class='col-xs-1'>" +
        "       <h6>Condition</h6>" +
        "   </div>" +
        "   <div class='col-xs-2'>" +
        "       <h6></h6>" +
        "   </div>" +
        "   <div class='col-xs-1'>" +
        "   </div>" +
        "   <div class='col-xs-2'>" +
        "       <h6></h6>" +
        "   </div>" +
        "   <div class='col-xs-2'>" +
        "       <h6>Then</h6>" +
        "   </div>" +
        "</div>"

    return headerRowHTML
}
function blankLimitLogicRowHTML(){
    var htmlString = "" +
        "<div class='col-xs-12 logicConditionRow limitEffectLogicRow '>" +
        "   <div class='mainLogicContainer'>" +
        "       <div class='col-xs-1'>" +
        "           <div class='form-group'>" +
        "               <select class='form-control rowConditionDropDown onChangeSaveRate' >" +
        "                   <option>IF</option>" +
        "                   <option>IF ELSE</option>" +
        "               </select>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-2'>" +
        "           <div class='form-group'>" +
        "               <select class='form-control conditionBasis onChangeSaveRate'>" +
        "                   <option>Limit Description is</option>" +
        "                   <option>Limit Value is</option>" +
        "               </select>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-1'>" +
        "           <div class='form-group'>" +
        "               <select class='form-control conditionOperator onChangeSaveRate'>" +
        getConditionOperatorsDropdownHTML("OPERATION") +
        "               </select>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-2'>" +
        "           <div class='form-group'>" +
        "               <input class='form-control conditionBasisValue onChangeSaveRate'  type='text'>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-2'>" +
        "           <div class='form-group'>" +
        "               <select class='form-control conditionOutputBasis onChangeSaveRate' >" +
        "                   <option>Deduct Value Changes To</option>" +
        "               </select>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-2'>" +
        "           <div class='form-group'>" +
        "               <input class='form-control conditionOutput onChangeSaveRate'  type='text'>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-2'>" +
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
        "       </div>" +
        "   </div>" +
        "</div>"

    return htmlString

}
function removeLimitLogicRowByIndex(index){
    var limitLogicContainer = $('#limitLogicInitContainer')

    //FIND CONTAINER USING LIMIT INDEX POSITION
    $(limitLogicContainer).find('.logicConditionRowsContainer').eq(index).remove()


}


//UTIL
function getConditionOperatorsDropdownHTML(PAGEID){
    var pageClassString = ""
    if(PAGEID === "OPERATION"){
        pageClassString = "onChangeSaveOperation"
    }
    else if(PAGEID === "RATE"){
        pageClassString = "onChangeSaveRate"
    }

    var htmlString = "" +
        "<select class='form-control conditionOperator " + pageClassString + "'>"

    for(var i=0;i<conditionOperators.length;i++){
        htmlString = htmlString +
            "   <option value='" + conditionOperators[i].conditionID + "'>" + conditionOperators[i].description + "</option>"
    }

    htmlString = htmlString +
        "</select>"

    return htmlString
}
function getConditionBasisDropdownHTML(PAGEID){
    var pageClassString = ""
    var conditionBasisType = ""
    if(PAGEID === "OPERATION"){
        pageClassString = "onChangeSaveOperation"
        conditionBasisType = "basis"
    }
    else if(PAGEID === "RATE"){
        pageClassString = "onChangeSaveRate"
        conditionBasisType = "limitBasis"
    }

    var htmlString = "" +
        "<select class='form-control conditionBasis " + pageClassString + "'>"

    for(var i=0;i<conditionBasis.length;i++){
        if(conditionBasis[i].type === conditionBasisType){
            htmlString = htmlString +
                "   <option value='" + conditionBasis[i].conditionID + "'>" + conditionBasis[i].description + "</option>"
        }

    }

    htmlString = htmlString +
        "</select>"

    return htmlString
}
function getRowConditionDropdownHTML(PAGEID){
    var pageClassString = ""
    if(PAGEID === "OPERATION"){
        pageClassString = "onChangeSaveOperation"
        var htmlString = "" +
            "<select class='form-control rowConditionDropdown " + pageClassString + "'>" +
            "   <option class='alwaysOption' value='ALWAYS'>ALWAYS</option>" +
            "   <option class='ifOption' value='IF'>IF</option>" +
            "   <option class='ifElseOption' value='IFELSE' >IF ELSE</option>" +
            "   <option class='elseOption' value='ELSE' >ELSE</option>" +
            "</select>"
    }
    else if(PAGEID === "RATE"){
        pageClassString = "onChangeSaveRate"
        var htmlString = "" +
            "<select class='form-control rowConditionDropdown " + pageClassString + "'>" +
            "   <option class='noneOption' value='NONE'>NONE</option>" +
            "   <option class='ifOption' value='IF'>IF</option>" +
            "   <option class='ifElseOption' value='IFELSE' >IF ELSE</option>" +
            "   <option class='elseOption' value='ELSE' >ELSE</option>" +
            "</select>"
    }

    return htmlString
}

function rowConditionDropdownChange(dropdown){
    var thisConditionRow = $(dropdown).closest('.mainLogicContainer')
    var rowConditionValue = $(dropdown).val()

    if(rowConditionValue === 'ALWAYS'){
        hideAllConditionalInputs(thisConditionRow)
    }
    else if(rowConditionValue === 'NONE' ){
        hideAllLogicRowInputs(thisConditionRow)
    }
    else if(rowConditionValue === 'IF' ){
        showAllConditionalInputs(thisConditionRow)
    }
    else if(rowConditionValue === 'IFELSE' ){
        showAllConditionalInputs(thisConditionRow)
    }
    else if(rowConditionValue === 'ELSE' ){
        hideAllConditionalInputs(thisConditionRow)
    }
}
function hideAllConditionalInputs(thisRow){
    //HIDE ALL
    $(thisRow).children().css('visibility', 'hidden')

    //SHOW PRODUCT SELECT
    $(thisRow).find('.conditionOutput').closest('div').css('visibility', '')
    $(thisRow).find('.rowConditionDropdown').closest('div').css('visibility', '')
    $(thisRow).find('.deductDescription').closest('div').css('visibility', '')
    $(thisRow).find('.conditionOutputValue').closest('div').css('visibility', '')


    //SHOW BUTTONS
    $(thisRow).children('.buttonColumn').css('visibility', '')
}
function hideAllLogicRowInputs(thisRow){
    //HIDE ALL
    $(thisRow).children().css('visibility', 'hidden')

    $(thisRow).find('.rowConditionDropdown').closest('div').css('visibility', '')

    //SHOW BUTTONS
    $(thisRow).children('.buttonColumn').css('visibility', '')
}
function showAllConditionalInputs(thisRow){
    //SHOW  ALL
    $(thisRow).children().css('visibility', '')

}

function addSubLogicConditionRowClick(button){
    var thisRow = $(button).closest('.logicConditionRow')
    var thisRowConditionValue = $(thisRow).find('.rowConditionDropdown').val()


    var newRow = $(thisRow).clone()
    var newRowProductConditionBasisDropdown = $(newRow).find('.conditionBasis')
    $(newRow).find('.rowConditionDropdown').val(thisRowConditionValue)

    //DISABLE FURTHER SUB LOGIC
    // $(newRow).find('.addSubLogicConditionRow').css('display','none')

    var subLogicContainer
    //IF SUB CONDITION ROW EXISTS
    if( $(thisRow).children('.subLogicConditionRow').length > 0 ){
        // subLogicContainer = $(thisRow).find('.subLogicConditionRow')
    }
    else{
        subLogicContainer = $(
            "<div class='row subLogicConditionRow rowContainer'>" +
            "</div>"
        )

        $(thisRow).append($(subLogicContainer))
        $(subLogicContainer).append($(newRow))
        $(newRowProductConditionBasisDropdown).trigger('change')
        checkFormatOfAllRows(thisRow)
    }
}
function addLogicConditionRowClick(button){
    var thisRow = $(button).closest('.logicConditionRow')
    var thisRowConditionValue = $(thisRow).find('.rowConditionDropdown').val()


    var newRow = $(thisRow).clone()
    $(newRow).find('.subLogicConditionRow').remove()
    var newRowProductConditionBasisDropdown = $(newRow).find('.conditionBasis')
    $(newRow).find('.rowConditionDropdown').val(thisRowConditionValue)

    $(thisRow).after($(newRow))
    $(newRowProductConditionBasisDropdown).trigger('change')
    checkFormatOfAllRows(thisRow)
}
function removeLogicConditionRowClick(button){
    var container = $(button).closest('.rowContainer')
    var thisRow = $(button).closest('.logicConditionRow')
    $(thisRow).remove()

    if( $(container).find('.logicConditionRow').length === 0 && $(container).hasClass('subLogicConditionRow') ){
        $(container).remove()
    }

    checkFormatOfAllRows(thisRow)

}
function checkFormatOfAllRows(thisRow){
    var logicContainer = $(thisRow).closest('.logicConditionRowsContainer')

    //HIDING/SHOWING REMOVE BUTTONS
    $(logicContainer).find('.logicConditionRow').each(function(index){
        var thisLogicRow = $(this)
        var addRowButton = $(this).find('.addLogicConditionRow')
        var removeRowButton = $(this).find('.removeLogicConditionRow')

        if(index === 0){
            $(removeRowButton).css('display', 'none')
        }
        else{
            $(removeRowButton).css('display', '')
        }

    })


    //CHECKING ROW LOGIC VALUES
    var previousRow = ''
    var fullLogicOptionsHTML =
        "<option class='alwaysOption' value='ALWAYS'>ALWAYS</option> " +
        "<option class='ifOption' value='IF'>IF</option> " +
        "<option class='ifElseOption' value='IFELSE' style='display:none'>IF ELSE</option> " +
        "<option class='elseOption' value='ELSE' style='display:none'>ELSE</option>"
    var firstLogicOptionsHTML =
        "<option class='alwaysOption' value='ALWAYS'>ALWAYS</option> " +
        "<option class='ifOption' value='IF'>IF</option> "
    var firstLimitLogicOptionsHTML =
        "<option class='noneOption' value='NONE'>NONE</option> " +
        "<option class='ifOption' value='IF'>IF</option> "
    var secondLogicOptionHTML =
        "<option class='ifOption' value='IF'>IF</option> " +
        "<option class='ifElseOption' value='IFELSE' style='display:none'>IF ELSE</option> " +
        "<option class='elseOption' value='ELSE' style='display:none'>ELSE</option>"

    $(logicContainer).parent().find('.rowContainer').each(function(index){
        var thisRowContainer = $(this)

        $(thisRowContainer).children('.logicConditionRow').each(function(count){
            var thisRow = $(this)
            var thisMainLogicContainer = $(thisRow).children('.mainLogicContainer')
            var thisLogicConditionDropdown = $(thisMainLogicContainer).find('.rowConditionDropdown')
            var thisLogicConditionValue = $(thisLogicConditionDropdown).val()


            //IF FIRST ROW, REMOVE ALL OTHER OPTIONS EXCEPT 'ALWAYS', 'IF'
            if(count == 0){
                if($('.tab-pane.active').attr('id') === 'ratesPage'){
                    $(thisLogicConditionDropdown).html(firstLimitLogicOptionsHTML)
                    $(thisLogicConditionDropdown).val(thisLogicConditionValue)
                }
                else{
                    $(thisLogicConditionDropdown).html(firstLogicOptionsHTML)
                    $(thisLogicConditionDropdown).val(thisLogicConditionValue)
                }

            }
            else if( count > 0){
                $(thisLogicConditionDropdown).html(secondLogicOptionHTML)
                $(thisLogicConditionDropdown).val(thisLogicConditionValue)
            }


            //CHECK IF THIS ROW HAS SUBLOGIC, IF YES, HIDE THE RATE/PRODUCT DROPDOWN in MainLogicRow
            if( $(thisRow).children('.subLogicConditionRow').length > 0 ){
                $(thisMainLogicContainer).find('.conditionOutput').css('display', 'none')
            }
            else{
                $(thisMainLogicContainer).find('.conditionOutput').css('display', '')
            }
        })



    })
}
function moveLogicRowUp(upButton){
    var container = $(upButton).closest('.rowContainer')
    var thisRow = $(upButton).closest('.logicConditionRow')
    var thisRowIndex = $(thisRow).index()

    if(thisRowIndex === 0){

    }
    else{
        $(container).children('.logicConditionRow').eq(thisRowIndex-1).before($(thisRow))
    }

    checkFormatOfAllRows(thisRow)

}
function moveLogicRowDown(downButton){
    var container = $(downButton).closest('.rowContainer')
    var thisRow = $(downButton).closest('.logicConditionRow')
    var thisRowIndex = $(thisRow).index()
    var lastIndex = $(container).children('.logicConditionRow').length

    if(thisRowIndex === lastIndex){

    }
    else{
        $(container).children('.logicConditionRow').eq(thisRowIndex+1).after($(thisRow))

    }

    checkFormatOfAllRows(thisRow)

}


//NEW SUBMISSION PAGE
function getConditionBasisObject(conditionBasisID){
    for(var i=0; i < conditionBasisArray.length; i++ ){
        if(conditionBasisArray[i].conditionID === conditionBasisID){
            return conditionBasisArray[i]
        }
    }
}
function evaluateLogicConditionArray(logicConditionArray){
    var outputID

    if(logicConditionArray !== null && logicConditionArray !== undefined){
        //IF COVERAGE CONDITION IS 'ALWAYS'
        if(logicConditionArray[0].logicCondition === 'ALWAYS'){
            if(logicConditionArray[0].outputID){
                outputID = logicConditionArray[0].outputID
            }
            else if(logicConditionArray[0].productID){
                outputID = logicConditionArray[0].productID
            }
            else if(logicConditionArray[0].rateID){
                outputID = logicConditionArray[0].rateID
            }

            return outputID

        }
        else if(logicConditionArray[0].logicCondition === 'NONE'){

        }
        //IF COVERAGE CONDITION IS 'IF'
        else{
            // else if(logicConditionArray[0].logicCondition === 'IF'){
            //ITERATE THROUGH CONDITIONS, WILL ACCEPT FIRST CONDITION THAT'S VALID
            for(var i=0; i<logicConditionArray.length; i++){
                if( evaluateLogicConditionRow(logicConditionArray[i]) === false ){
                    continue
                }
                else{
                    return evaluateLogicConditionRow(logicConditionArray[i])

                }
            }
        }

    }
}
function evaluateLogicConditionRow(logicConditionRow){
    var rowLogicCondition = logicConditionRow.logicCondition
    var outputID

    if(logicConditionRow.outputID){
        outputID = logicConditionRow.outputID

        if(logicConditionRow.deductDescription){
            //IF THIS OUTPUT WILL CHANGE A DEDUCT VALUE
            outputID = {}
            outputID.deductDescription = logicConditionRow.deductDescription
            outputID.outputValue = logicConditionRow.outputValue
        }
    }
    else if(logicConditionRow.productID){
        outputID = logicConditionRow.productID
    }
    else if(logicConditionRow.rateID){
        outputID = logicConditionRow.rateID
    }


    if(rowLogicCondition === "ALWAYS"){
        return outputID
    }
    else if(rowLogicCondition === "ELSE"){
        var subLogicArray = jsonStringToObject(logicConditionRow.subLogic)

        //IF SUBLOGIC ROWS EXIST
        if(subLogicArray !== null && subLogicArray !== undefined && subLogicArray.length > 0){
            return evaluateLogicConditionArray(subLogicArray)
        }
        else{
            return outputID
        }
    }
    else if(rowLogicCondition === "NONE"){
    }
    else{
        var conditionOperator = logicConditionRow.conditionOperator
        var conditionBasis = logicConditionRow.conditionBasis
        var conditionBasisValue = formatBasisValue(logicConditionRow.conditionBasisValue)

        //GET ACTUAL BASIS VALUE
        var actualBasisValue = getActualBasisValue(logicConditionRow)

        if(actualBasisValue !== undefined && actualBasisValue !== null ){
            //IF THIS LOGIC CONDITION IS TRUE
            if( evaluateCondition(conditionOperator, conditionBasisValue, actualBasisValue) ){
                //CHECK FOR SUB LOGIC CONDITIONS

                var subLogicArray = jsonStringToObject(logicConditionRow.subLogic)

                //IF SUBLOGIC ROWS EXIST
                if(subLogicArray !== null && subLogicArray !== undefined && subLogicArray.length > 0){
                    for(var i=0;i<subLogicArray.length;i++){
                        var subLogicConditionRowMap = jsonStringToObject(subLogicArray[i])
                        var subLogicOutputID = subLogicConditionRowMap.outputID

                        if(subLogicConditionRowMap.outputID){
                            subLogicOutputID = subLogicConditionRowMap.outputID
                        }
                        else if(subLogicConditionRowMap.productID){
                            subLogicOutputID = subLogicConditionRowMap.productID
                        }
                        else if(subLogicConditionRowMap.rateID){
                            subLogicOutputID = subLogicConditionRowMap.rateID
                        }

                        if( evaluateLogicConditionRow(subLogicConditionRowMap) ){
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
function getActualBasisValue(logicConditionRow){
    var conditionBasis = logicConditionRow.conditionBasis

    if(conditionBasis === "LIMITVALUEIS"){
        var limitDescription = logicConditionRow.limitDescription
        var limitRateID = logicConditionRow.limitRateID

        //FIND THE LIMIT INPUT TO FIND THE VALUE
        var actualValue = undefined
        $('input.limitValue').each(function(){
            var thisLimitInputRateID = $(this).attr('data-rateid').trim()
            var thisLimitDescription = $(this).attr('data-limitdescription').trim()
            var thisLimitCovID = $(this).closest('.coverageLimDeductContainer').attr('data-covid').trim()

            if(thisLimitDescription === limitDescription && thisLimitInputRateID === limitRateID ){
                actualValue = formatBasisValue( $(this).val() )
            }
        })

        return actualValue
    }
    else{
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


}
function formatBasisValue(conditionBasisValue){
    //IF CONDITION BASIS IS MONEY
    if( isStringMoney(conditionBasisValue)){
        return getFloatValueOfMoney(conditionBasisValue)
    }
    else if(conditionBasisValue.trim().length === 0){
        //IF BLANK
        return 0
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