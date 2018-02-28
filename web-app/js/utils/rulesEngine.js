var rulesEngineIsRunning = false;

///////////////SETUP FUNCTIONS////////////////////////
function initRulesEngine(){
    initRuleListeners()
    initRulesEngineContainers()
}
function initRulesEngineContainers(){
    $('.rulesEngineContainer').html(getInitRulesRow())

    formatAllRuleRows()
}
function initRuleListeners(){
    $(document.body).on('click', 'button.initRulesButton', function(e) {
        initRuleButtonRowAction(this)
        formatAllRuleRows()
    });

    $(document.body).on('change', '.ruleEngineElement', function(e) {
        formatAllRuleRows()
    });

    //CONDITION CHANGE LISTENERS
    $(document.body).on('change', '.ruleConditionBasis', function(e) {
        conditionBasisChangeAction(this)
    });



    //RULE ROW BUTTON LISTENERS
    $(document.body).on('click', 'button.addRuleRowButton', function(e) {
        addRuleRow(this)
        formatAllRuleRows()
    });
    $(document.body).on('click', 'button.addSubRulesButton', function(e) {
        addSubRulesRow(this)
        formatAllRuleRows()
    });
    $(document.body).on('click', 'button.removeRuleRowButton', function(e) {
        removeRuleRow(this)
        formatAllRuleRows()
    });
    $(document.body).on('click', 'button.moveRuleRowDownButton', function(e) {
        moveRuleRowDown(this)
        formatAllRuleRows()
    });
    $(document.body).on('click', 'button.moveRuleRowUpButton', function(e) {
        moveRuleRowUp(this)
        formatAllRuleRows()
    });
    $(document.body).on('click', 'button.addRuleActionButton', function(e) {
        addActionRow(this)
        formatAllRuleRows()
    });

    //RULE ACTION BUTTON LISTENERS
    $(document.body).on('click', 'button.removeRuleActionContainerButton', function(e) {
        removeActionContainer(this)
        formatAllRuleRows()
    });
    $(document.body).on('click', 'button.addRuleModifierButton', function(e) {
        addRuleModifierRow(this)
        formatAllRuleRows()
    });
    $(document.body).on('click', 'button.moveActionRowUpButton', function(e) {
        moveActionRowUp(this)
        formatAllRuleRows()
    });
    $(document.body).on('click', 'button.moveActionRowDownButton', function(e) {
        moveActionRowDown(this)
        formatAllRuleRows()
    });


    //RULE MODIFIER BUTTON LISTENERS
    $(document.body).on('click', 'button.removeRuleModifierContainerButton', function(e) {
        removeRuleModifierRow(this)
        formatAllRuleRows()
    });

}

///////////////DATA MANAGEMENT PAGE FUNCTIONS////////////////////////
function getNewRuleRowsContainer(){
    return ruleRowsContainerHTML()
}
function getInitRulesRow(){
    return initRulesRowHTML()
}
function initRuleButtonRowAction(button){
    $(button).closest('.rulesEngineContainer').html(getNewRuleRowsContainer())
    $(button).closest('.initButtonRow').remove()

}

//FORMATTING FUNCTIONS
function formatAllRuleRows(){
    $('.ruleRowsContainer').each(function(){
        var thisRuleRowsContainer = $(this)

        //IF THIS RULE ROW CONTAINER IS EMPTY, INSERT THE INITIAL ADD ROW BUTTON
        if( $(thisRuleRowsContainer).children('.ruleRow').length === 0 && $(thisRuleRowsContainer).parent().hasClass('rulesEngineContainer')){
            $(this).replaceWith(getInitRulesRow())
        }
        else{
            $(thisRuleRowsContainer).children('.ruleRow').each(function(ruleRowIndex){
                var thisRuleRow = $(this)

                //IF THIS RULE ROW HAS A SUB RULES ROWS, REMOVE ACTION RULES CONTAINERS
                if($(thisRuleRow).children('.subRuleRowsContainer').children('.ruleRow').length > 0){
                    $(thisRuleRow).children('.ruleActionRowsContainer').children('.ruleActionContainer').remove()
                }

                $(thisRuleRow).children('.ruleConditionContainer').each(function(){
                    var thisRuleConditionContainer = $(this)

                    var conditionStatementElement = $(thisRuleConditionContainer).find('.ruleConditionStatement')
                    var conditionBasisElement = $(thisRuleConditionContainer).find('.ruleConditionBasis')
                    var conditionOperatorElement = $(thisRuleConditionContainer).find('.ruleConditionOperator')
                    var conditionTestValueElement = $(thisRuleConditionContainer).find('.ruleConditionTestValue')

                    //IF FIRST RULE ROW, HIDE IFELSE AND ELSE, AND HIDE TRASH/REMOVE BUTTON
                    if(ruleRowIndex === 0 && !$(thisRuleRowsContainer).hasClass('subRuleRowsContainer') ){
                        $(conditionStatementElement).find('option').css('display','')
                        $(conditionStatementElement).find('.ifElseOption').css('display','none')
                        $(conditionStatementElement).find('.elseOption').css('display','none')

                        //SHOW BUTTONS
                        $(thisRuleConditionContainer).children('.rulesButtonColumn').children('button').css('display', '')
                        $(thisRuleConditionContainer).children('.rulesButtonColumn').children('button').css('visibility', '')
                        // $(thisRuleConditionContainer).children('.rulesButtonColumn').children('.removeRuleRowButton').css('visibility', 'hidden')
                    }
                    else{
                        $(conditionStatementElement).find('option').css('display','')
                        $(conditionStatementElement).find('.alwaysOption').css('display','none')

                        //SHOW REMOVE BUTTON IF NOT FIRST ROW
                        $(thisRuleConditionContainer).children('.rulesButtonColumn').children('button').css('display', '')
                        $(thisRuleConditionContainer).children('.rulesButtonColumn').children('button').css('visibility', '')

                        if($(conditionStatementElement).val() === 'ALWAYS'){
                            $(conditionStatementElement).val('IF')
                        }
                    }

                    //IF CONDITION STATEMENT IS 'ALWAYS' HIDE CONDITION INPUTS
                    if($(conditionStatementElement).val() === 'ALWAYS' || $(conditionStatementElement).val() === 'ELSE' ){
                        hideRuleElement(conditionBasisElement)
                        resetRuleElementValue(conditionBasisElement)

                        hideRuleElement(conditionOperatorElement)
                        resetRuleElementValue(conditionOperatorElement)

                        hideRuleElement(conditionTestValueElement)
                        resetRuleElementValue(conditionTestValueElement)
                    }
                    else{
                        showRuleElement(conditionBasisElement)
                        showRuleElement(conditionOperatorElement)
                        showRuleElement(conditionTestValueElement)

                        //FORMAT CONDITION TEST VALUE INPUTS
                        conditionBasisChangeAction(conditionBasisElement)
                    }

                    //FORMAT CONDITION TEST VALUE ELEMENT.
                    formatConditionTestValueInput(conditionTestValueElement)
                })

                $(thisRuleRow).children('.ruleActionRowsContainer').each(function(){
                    var thisRuleActionRowsContainer = $(this)

                    $(thisRuleActionRowsContainer).children('.ruleActionContainer').each(function(ruleActionIndex){
                        var thisRuleActionContainer = $(this)

                        //IF FIRST ACTION ROW, HIDE REMOVE BUTTON
                        if(ruleActionIndex === 0){
                            //HIDE ONLY REMOVE BUTTON
                            $(thisRuleActionContainer).children('.ruleActionRow').children('.rulesButtonColumn').children('button').css('display', '')
                            $(thisRuleActionContainer).children('.ruleActionRow').children('.rulesButtonColumn').children('button').css('visibility', '')
                            $(thisRuleActionContainer).children('.ruleActionRow').children('.rulesButtonColumn').children('.removeRuleActionContainerButton').css('visibility', 'hidden')
                        }
                        else{
                            $(thisRuleActionContainer).children('.ruleActionRow').children('.rulesButtonColumn').children('button').css('display', '')
                            $(thisRuleActionContainer).children('.ruleActionRow').children('.rulesButtonColumn').children('button').css('visibility', '')
                        }

                        //FILL ACTION STATEMENT DROPDOWN WITH STATEMENTS FOR ACTION TARGET
                        var actionStatementDropdown = $(thisRuleActionContainer).children('.ruleActionRow').find('select.ruleConditionActionStatement')
                        formatActionStatementDropdown(actionStatementDropdown)

                        var actionTargetDropdown = $(thisRuleActionContainer).children('.ruleActionRow').find('.ruleConditionActionTarget')
                        insertRequiredModifiers(actionTargetDropdown)

                        //FORMAT MODIFIERS
                        $(thisRuleActionContainer).children('.ruleModifierRowsContainer').children('.ruleModifierRow').each(function(){
                            var thisRuleModifierRow = $(this)

                            var ruleConditionForDropdown = $(thisRuleModifierRow).find('.ruleConditionForTarget')
                            formatModifierConditionForDropdown(ruleConditionForDropdown)

                            var ruleConditionForValueInput = $(thisRuleModifierRow).find('.ruleConditionForValue')
                            formatModifierConditionForTargetInput(ruleConditionForValueInput)
                        })
                    })



                })

                $(thisRuleRow).children('.subRuleRowsContainer').each(function(){
                    var thisSubRuleRowsContainer = $(this)
                })
            })
        }
    })


}
function formatConditionTestValueInput(conditionTestValueElement){
    var conditionBasisElement = $(conditionTestValueElement).closest('.ruleConditionContainer').find('.ruleConditionBasis')
    var conditionBasisID = $(conditionBasisElement).val()
    var conditionBasisObject = getRuleEngineObject(conditionBasisID)
    var testValueElementContainer = $(conditionTestValueElement).parent('div')
    var testValue = $(conditionTestValueElement).val()


    if(conditionBasisObject){
        if(conditionBasisObject.questionID){
            //IF CONDITION BASIS HAS A QUESTION ID, CHECK FOR TYPE OF QUESTION
            var questionID = conditionBasisObject.questionID
            var questionObject = getQuestionObjectForID(questionID)

            if(questionObject.inputType === 'radio' || questionObject.inputType === 'checkbox'){
                var htmlCheckboxRadioValText = JSON.parse(questionObject.htmlCheckboxRadioValText)
                var optionsArray = Object.keys(htmlCheckboxRadioValText)

                var newElement = $(ruleConditionTestValueDropdownHTML(optionsArray))

                $(testValueElementContainer).replaceWith( $(newElement) )

                $(newElement).find('select').val(testValue)
            }
            else if(questionObject.inputType === 'dropdown'){
                var dropdownOptionsValText = JSON.parse(questionObject.dropdownOptionsValText)
                var optionsArray = Object.keys(dropdownOptionsValText)

                var newElement = $(ruleConditionTestValueDropdownHTML(optionsArray))

                $(testValueElementContainer).replaceWith( $(newElement) )
                $(newElement).find('select').val(testValue)
            }
            else{
                var newElement = $(ruleConditionTestValueHTML())

                $(testValueElementContainer).replaceWith( $(newElement) )
                $(newElement).find('input').val(testValue)

                if(conditionBasisObject.format === 'text'){
                    convertConditionTestValue_Text($(newElement))
                }
                else if(conditionBasisObject.format === 'number'){
                    convertConditionTestValue_Number($(newElement))
                }
            }

        }
        else{
            var newElement = $(ruleConditionTestValueHTML())

            $(testValueElementContainer).replaceWith( $(newElement) )
            $(newElement).find('input').val(testValue)

            if(conditionBasisObject.format === 'text'){
                convertConditionTestValue_Text($(newElement))
            }
            else if(conditionBasisObject.format === 'number'){
                convertConditionTestValue_Number($(newElement))
            }
        }
    }
}
function formatActionStatementDropdown(actionStatementDropdown){
    var ruleActionRow = $(actionStatementDropdown).closest('.ruleActionRow')
    var actionTargetDropdown = $(ruleActionRow).find('select.ruleConditionActionTarget')
    var actionTargetID = $(actionTargetDropdown).val()
    var actionTargetObject = getRuleEngineObject(actionTargetID)

    if(actionTargetObject){
        var actionTargetOptionsArray = jsonStringToObject(actionTargetObject.actionTargetOptions)

        var previousActionStatementValue = $(actionStatementDropdown).val()
        $(actionStatementDropdown).children('option').remove()

        for(var i=0;i<actionTargetOptionsArray.length;i++){
            var actionStatementID = actionTargetOptionsArray[i]
            var actionStatmentObject = getRuleEngineObject(actionStatementID)
            var actionStatementDescription = actionStatmentObject.description

            $(actionStatementDropdown).append( $(actionStatementOptionHTML(actionStatementID, actionStatementDescription)) )
        }
        $(actionStatementDropdown).val(previousActionStatementValue)
    }


}
function formatModifierConditionForDropdown(ruleConditionForDropdown){
    var ruleModifierRow = $(ruleConditionForDropdown).closest('.ruleModifierRow')
    var actionTargetID = $(ruleModifierRow).closest('.ruleModifierRowsContainer').siblings('.ruleActionRow').find('select.ruleConditionActionTarget').val()

    var actionTargetObject = getRuleEngineObject(actionTargetID)

    if(actionTargetObject.actionModifierOptions){
        var actionModifierOptionsArray = jsonStringToObject(actionTargetObject.actionModifierOptions)

        var previousRuleConditionForValue = $(ruleConditionForDropdown).val()
        $(ruleConditionForDropdown).children('option').remove()

        for(var i=0;i<actionModifierOptionsArray.length;i++){
            var modifierID = actionModifierOptionsArray[i]
            var modifierObject = getRuleEngineObject(modifierID)
            var modifierDescription = modifierObject.description

            $(ruleConditionForDropdown).append( $(ruleConditionForOptionHTML(modifierID, modifierDescription)) )
        }
        $(ruleConditionForDropdown).val(previousRuleConditionForValue)
    }
}
function formatModifierConditionForTargetInput(ruleConditionForValueInput){
    var ruleConditionForTargetDropdown = $(ruleConditionForValueInput).closest('.ruleModifierRow').find('.ruleConditionForTarget')
    var modifierID = $(ruleConditionForTargetDropdown).val()
    var modifierObject = getRuleEngineObject(modifierID)
    var modifierValueInputContainer = $(ruleConditionForValueInput).parent('div')
    var previousModifierValue = $(ruleConditionForValueInput).val()
    var covID = $(ruleConditionForValueInput).closest('.rulesEngineContainer').attr('data-covid')


    if(modifierObject){
        if(modifierObject.modifierValueMap){
            var newModifierValueInput = $(ruleConditionForValueOptionDropdownHTML())
            var modifierValueMap = JSON.parse(modifierObject.modifierValueMap)

            var modifierObjectID = modifierValueMap.objectID
            var modifierValueAttribute = modifierValueMap.attribute
            var modifierDescriptionAttribute = modifierValueMap.descriptionAttr

            var modifierValueArray = window[modifierObjectID]
            for(var i=0;i<modifierValueArray.length;i++){
                var optionElement = ruleConditionForValueOptionHTML( modifierValueArray[i][modifierValueAttribute], modifierValueArray[i][modifierDescriptionAttribute] )
                $(newModifierValueInput).find('select').append( $(optionElement) )
            }

            $(modifierValueInputContainer).replaceWith( $(newModifierValueInput) )

            //IF PREVIOUS VALUE IS BLANK OR INVALID, INSERT DEFAULT value. ELSE SELECT PREV VALUE
            if($(newModifierValueInput).find('select').find("option[value='" + previousModifierValue + "']").length === 0){
                if(modifierID === 'COVERAGE'){
                    $(newModifierValueInput).find('select').val(covID)
                }
                else if(modifierID === 'RATEFOR'){
                    var actionTargetID = $(newModifierValueInput).closest('.ruleActionContainer').children('.ruleActionRow').find('select.ruleConditionActionTarget').val()
                    if(actionTargetID === 'PRODUCT'){
                        var productID = $(newModifierValueInput).closest('.ruleActionContainer').children('.ruleActionRow').find('.ruleConditionActionValue').val()
                        var productObject = getProductObjectByID(productID)

                        if(productObject){
                            var rateID = productObject.rateCode

                            $(newModifierValueInput).find('select').val(rateID)
                        }
                    }
                    else{
                        $(newModifierValueInput).find('select').val(covID)
                    }
                }
            }
            else{
                $(newModifierValueInput).find('select').val(previousModifierValue)
            }
        }
        else{
            var newModifierValueInput = $(ruleConditionForValueHTML())
            $(modifierValueInputContainer).replaceWith( $(newModifierValueInput) )
            $(newModifierValueInput).val(previousModifierValue)

        }
    }
}
function insertRequiredModifiers(actionTargetDropdown){
    var actionTargetID = $(actionTargetDropdown).val()
    var actionTargetObject = getRuleEngineObject(actionTargetID)

    if(actionTargetObject){
        var actionTargetRequiredModifiers = JSON.parse(actionTargetObject.actionRequiredModifiers)
        var ruleModifierRowsContainer = $(actionTargetDropdown).closest('.ruleActionContainer').children('.ruleModifierRowsContainer')


        if(actionTargetRequiredModifiers){

            for(var i=0; i<actionTargetRequiredModifiers.length;i++){
                var newModifierRow = $(ruleModifierHTML())
                var modifierID = actionTargetRequiredModifiers[i]

                //CHECK IF REQUIRED MODIFIER ROW ALREADY EXISTS
                var exists = false
                $(ruleModifierRowsContainer).find('.ruleConditionForTarget').each(function(){
                    if( modifierID === $(this).val() ){
                        exists = true
                    }
                })

                //IF MODIFIER ROW DOESN'T EXIST ADD IT
                if(exists === false){
                    $(ruleModifierRowsContainer).append($(newModifierRow))
                    $(newModifierRow).find('.ruleConditionForTarget').val(modifierID)
                }
            }
        }
    }
}
function hideRuleElement(element){
    $(element).css('display', 'none')
}
function showRuleElement(element){
    $(element).css('display', '')
}
function resetRuleElementValue(element){
    $(element).val('')
    //
    // if($(element).is(":input")){
    //     $(element).val('')
    // }
    // else if($(element).is(":select")){
    //
    // }
}

//CONDITION FUNCTIONS
function conditionBasisChangeAction(dropdown){
    var conditionBasisID = $(dropdown).val()

    var conditionBasisObject = getRuleEngineObject(conditionBasisID)

    if(conditionBasisObject && conditionBasisObject.format){
        var conditionTestValueInput = $(dropdown).closest('.ruleConditionContainer').find('input.ruleConditionTestValue')

        if(conditionBasisObject.format === 'text'){
            convertConditionTestValue_Text(conditionTestValueInput)
        }
        else if(conditionBasisObject.format === 'number'){
            convertConditionTestValue_Number(conditionTestValueInput)
        }
    }
}
function convertConditionTestValue_Text(input){
    $(input).prop('type', 'text')
}
function convertConditionTestValue_Number(input){
    $(input).prop('type', 'number')

}

//RULE ROW BUTTON FUNCTIONS
function addRuleRow(button){
    var thisRuleRow = $(button).closest('.ruleRow')

    $(thisRuleRow).after($(ruleRowHTML()))
}
function addSubRulesRow(button){
    var ruleRowElement = $(button).closest('.ruleRow')
    var ruleActionRowsContainer = $(ruleRowElement).children('.ruleActionRowsContainer')
    var subRulesContainer = $(ruleRowElement).children('.subRuleRowsContainer')

    if($(ruleActionRowsContainer).children('.ruleActionContainer').length > 1 ){
        if ( confirm('Adding Sub Rules will remove Rule Actions') ) {
            $(subRulesContainer).append($(ruleRowHTML()))
        }
    }
    else{
        $(subRulesContainer).append($(ruleRowHTML()))
    }


}
function removeRuleRow(button){
    var rulesEngineContainer = $(button).closest('.rulesEngineContainer')
    var ruleRowsContainer = $(button).closest('.ruleRowsContainer')
    var thisRuleRow = $(button).closest('.ruleRow')

    if($(ruleRowsContainer).hasClass('subRuleRowsContainer') ){
        if( $(ruleRowsContainer).find('.ruleRow').length === 1 ){
            $(thisRuleRow).remove()
            $(ruleRowsContainer).closest('.ruleRow').find('.ruleActionRowsContainer').html(ruleActionContainerHTML())
        }
        else{
            $(thisRuleRow).remove()
        }
    }
    else{

    }

    if( $(ruleRowsContainer).find('.ruleRow').length > 1 ){
        $(thisRuleRow).remove()
    }
    else{
        $(ruleRowsContainer).remove()
        $(rulesEngineContainer).html(getInitRulesRow())
    }
}
function moveRuleRowUp(button){
    var rulesRowContainer = $(button).closest('.ruleRowsContainer')
    var thisRuleRow = $(button).closest('.ruleRow')
    var thisRowIndex = $(thisRuleRow).index()

    if(thisRowIndex === 0){

    }
    else{
        $(rulesRowContainer).children('.ruleRow').eq(thisRowIndex-1).before($(thisRuleRow))
    }
}
function moveRuleRowDown(button){
    var rulesRowContainer = $(button).closest('.ruleRowsContainer')
    var thisRuleRow = $(button).closest('.ruleRow')
    var thisRowIndex = $(thisRuleRow).index()
    var lastIndex = $(rulesRowContainer).children('.ruleRow').length

    if(thisRowIndex === lastIndex){

    }
    else{
        $(rulesRowContainer).children('.ruleRow').eq(thisRowIndex+1).after($(thisRuleRow))
    }
}
function addActionRow(button){
    var actionRowsContainer = $(button).closest('.ruleActionRowsContainer')
    var thisActionRow = $(button).closest('.ruleActionContainer')

    $(thisActionRow).after($(ruleActionContainerHTML()))
}

//RULE ACTION ROW BUTTON FUNCTIONS
function removeActionContainer(button){
    var ruleActionRowsContainer = $(button).closest('.ruleActionRowsContainer')
    var ruleActionContainer = $(button).closest('.ruleActionContainer')

    if( $(ruleActionRowsContainer).find('.ruleActionContainer').length > 1  ){
        $(ruleActionContainer).remove()
    }
}
function moveActionRowUp(button){
    var actionRowsContainer = $(button).closest('.ruleActionRowsContainer')
    var thisActionContainer = $(button).closest('.ruleActionContainer')
    var thisIndex = $(thisActionContainer).index()

    if(thisIndex === 0){

    }
    else{
        $(actionRowsContainer).children('.ruleActionContainer').eq(thisIndex-1).before($(thisActionContainer))
    }
}
function moveActionRowDown(button){
    var actionRowsContainer = $(button).closest('.ruleActionRowsContainer')
    var thisActionContainer = $(button).closest('.ruleActionContainer')
    var thisIndex = $(thisActionContainer).index()
    var lastIndex = $(actionRowsContainer).children('.ruleActionContainer').length

    if(thisIndex === lastIndex){

    }
    else{
        $(actionRowsContainer).children('.ruleActionContainer').eq(thisIndex+1).after($(thisActionContainer))
    }
}
function addRuleModifierRow(button){
    var ruleActionContainer = $(button).closest('.ruleActionContainer')
    var ruleModifierRowsContainer = $(ruleActionContainer).find('.ruleModifierRowsContainer')

    $(ruleModifierRowsContainer).append($(ruleModifierHTML()))
}

//RULE MODIFIER ROW BUTTON FUNCTIONS
function removeRuleModifierRow(button){
    var ruleModifierElement = $(button).closest('.ruleModifierRow')

    $(ruleModifierElement).remove()

}


///////////////HTML ELEMENTS////////////////////////
function initRulesRowHTML(){
    var htmlString = "" +
        "<div class='row initButtonRow'>" +
        "   <div class='col-xs-12'>" +
        "       <button class='btn btn-primary initRulesButton' style=''> " +
        "           <i class='fa fa-plus'></i> Add Rule" +
        "       </button> " +
        "   </div>" +
        "</div>"

    return htmlString
}
function ruleRowsContainerHTML(){
    var htmlString = "" +
        "<div class='row ruleRowsContainer'>" +
            ruleRowHTML() +
        "</div>"

    return htmlString
}
function subRuleRowsContainerHTML(){
    var htmlString = "" +
        "<div class='row ruleRowsContainer subRuleRowsContainer'>" +
        "</div>"

    return htmlString
}
function ruleRowHTML(){
    var htmlString = "" +
        "<div class='col-xs-12 ruleRow'>" +
            ruleConditionContainerHTML() +
            ruleActionRowsContainerHTML() +
            subRuleRowsContainerHTML() +
        "</div>"

    return htmlString
}
function ruleConditionContainerHTML(){
    var htmlString = "" +
        "<div class='row ruleConditionContainer' style=''> " +
            ruleConditionStatementDropdownHTML() +
            ruleConditionBasisDropdownHTML() +
            ruleConditionOperatorDropdownHTML() +
            ruleConditionTestValueHTML() +

            rulesButtonColumnHTML('ruleConditionContainer') +
            ruleRowIcon('ruleConditionContainer') +
        "</div>"

    return htmlString
}
function ruleActionRowsContainerHTML(){
    var htmlString = "" +
        "<div class='row ruleActionRowsContainer' > " +
        ruleActionContainerHTML() +
        "</div>"

    return htmlString
}
function ruleActionContainerHTML(){
    var htmlString = "" +
        "<div class='col-xs-12 ruleActionContainer' > " +
        ruleActionHTML() +
        ruleModifierRowsContainerHTML() +
        "</div>"

    return htmlString
}
function ruleModifierRowsContainerHTML(){
    var htmlString = "" +
        "<div class='col-xs-12 ruleModifierRowsContainer' > " +
        "</div>"

    return htmlString
}

//RULE CONDITION ELEMENTS
function ruleConditionStatementDropdownHTML(){
    var htmlString = "" +
        "<div class='col-xs-1'> " +
        "   <select class='form-control ruleConditionStatement  ruleEngineElement'> " +
        "   <option class='alwaysOption' value='ALWAYS'>ALWAYS</option> " +
        "   <option class='ifOption' value='IF'>IF</option> " +
        "   <option class='ifElseOption' value='IFELSE' >IF ELSE</option> " +
        "   <option class='elseOption' value='ELSE' >ELSE</option> " +
        "   </select> " +
        "</div> "

    return htmlString
}
function ruleConditionBasisDropdownHTML(){
    var htmlString = "" +
        "<div class='col-xs-2' style=''> " +
        "   <select class='form-control ruleConditionBasis  ruleEngineElement'> "
        // "       <option value=''>-</option>"

    for(var i=0;i<ruleEngineObjects.length; i++){
        if(ruleEngineObjects[i].type === 'basis'){
            htmlString = htmlString +
                "   <option value='" + ruleEngineObjects[i].conditionID + "'>" + ruleEngineObjects[i].description + "</option>"
        }
    }

    htmlString = htmlString +
        "   </select> " +
        "</div> "

    return htmlString
}
function ruleConditionOperatorDropdownHTML(){
    var htmlString = "" +
        "<div class='col-xs-1' style=''> " +
        "   <select class='form-control ruleConditionOperator  ruleEngineElement'> "
        // "       <option value=''>-</option>"

    for(var i=0;i<ruleEngineObjects.length; i++){
        if(ruleEngineObjects[i].type === 'operator'){
            htmlString = htmlString +
                "   <option value='" + ruleEngineObjects[i].conditionID + "'>" + ruleEngineObjects[i].description + "</option>"
        }
    }

    htmlString = htmlString +
        "   </select> " +
        "</div> "

    return htmlString
}
function ruleConditionTestValueHTML(){
    var htmlString = "" +
        "<div class='col-xs-2' style=''> " +
        "   <input class='form-control ruleConditionTestValue  ruleEngineElement' type='text' data-precision='0' data-prefix='$'> " +
        "</div> "

    return htmlString
}
function ruleConditionTestValueDropdownHTML(optionsArray){
    var htmlString = "" +
        "<div class='col-xs-2' style=''> " +
        "   <select class='form-control ruleConditionTestValue  ruleEngineElement'> "

    for(var i=0;i<optionsArray.length;i++){
        htmlString = htmlString +
            "   <option value='" + optionsArray[i] + "'>" + optionsArray[i] + "</option>"

    }

    htmlString = htmlString
        "   </select>" +
        "</div> "

    return htmlString
}

//RULE ACTION ELEMENTS
function ruleActionHTML(){
    var htmlString = "" +
        "<div class='col-xs-12 ruleActionRow'> " +
        ruleConditionActionTargetHTML() +
        ruleConditionActionStatementHTML() +
        ruleConditionActionValueHTML() +
        rulesButtonColumnHTML('ruleActionRow') +
        ruleRowIcon('ruleActionRow') +
        "</div> "

    return htmlString
}
function ruleConditionActionStatementHTML(){
    var htmlString = "" +
        "<div class='col-xs-1'> " +
        "   <select class='form-control ruleConditionActionStatement  ruleEngineElement'> "

    for(var i=0;i<ruleEngineObjects.length; i++){
        if(ruleEngineObjects[i].type === 'actionStatement'){
            htmlString = htmlString +
                actionStatementOptionHTML(ruleEngineObjects[i].conditionID, ruleEngineObjects[i].description)
        }
    }

    htmlString = htmlString +
        "   </select> " +
        "</div> "

    return htmlString
}
function ruleConditionActionTargetHTML(){
    var htmlString = "" +
        "<div class='col-xs-2'> " +
        "   <select class='form-control ruleConditionActionTarget  ruleEngineElement'> " +
        "       <option value=''>-</option>"

    for(var i=0;i<ruleEngineObjects.length; i++){
        if(ruleEngineObjects[i].type === 'actionTarget'){
            htmlString = htmlString +
                "   <option value='" + ruleEngineObjects[i].conditionID + "'>" + ruleEngineObjects[i].description + "</option>"
        }
    }

    htmlString = htmlString +
        "   </select> " +
        "</div> "

    return htmlString
}
function ruleConditionActionValueHTML(){
    var htmlString = "" +
        "<div class='col-xs-2'> " +
        "   <input class='form-control ruleConditionActionValue  ruleEngineElement' type='text'> " +
        "</div> "

    return htmlString
}
function actionStatementOptionHTML(conditionID, description){
    return "   <option value='" + conditionID + "'>" + description + "</option>"
}

//RULE MODIFIER FUNCTIONS
function ruleModifierHTML(){
    var htmlString = "" +
        "<div class='col-xs-12 ruleModifierRow'> " +
        ruleConditionForTargetHTML() +
        ruleConditionForValueHTML() +
        rulesButtonColumnHTML('ruleModifierRow') +
        ruleRowIcon('ruleModifierRow') +
        "</div> "

    return htmlString
}
function ruleConditionForTargetHTML(){
    var htmlString = "" +
        "<div class='col-xs-2'> " +
        "   <select class='form-control ruleConditionForTarget  ruleEngineElement'> "

    for(var i=0;i<ruleEngineObjects.length; i++){
        if(ruleEngineObjects[i].type === 'forTarget'){
            htmlString = htmlString +
                "   <option value='" + ruleEngineObjects[i].conditionID + "'>" + ruleEngineObjects[i].description + "</option>"
        }
    }

    htmlString = htmlString +
        "   </select> " +
        "</div> "

    return htmlString
}
function ruleConditionForValueHTML(){
    var htmlString = "" +
        "<div class='col-xs-2'> " +
        "   <input class='form-control ruleConditionForValue  ruleEngineElement' type='text'> " +
        "</div> "

    return htmlString
}
function ruleConditionForOptionHTML(modifierID, description){
    return "   <option value='" + modifierID + "'>" + description + "</option>"
}
function ruleConditionForValueOptionHTML(value, description){
    return "   <option value='" + value + "'>" + description + "</option>"
}
function ruleConditionForValueOptionDropdownHTML(){
    var htmlString = "" +
        "<div class='col-xs-2'> " +
        "   <select class='form-control ruleConditionForValue ruleEngineElement'></select> " +
        "</div> "

    return htmlString
}


//BUTTONS HTML
function rulesButtonColumnHTML(rowType){
    var htmlString = ""


    if(rowType === 'ruleConditionContainer'){
        htmlString = htmlString +
            "<div class='col-xs-3 col-xs-offset-3 rulesButtonColumn' style=''> " +
            addRuleRowButtonHTML() +
            addSubRulesButtonHTML() +
            moveRuleRowUpButtonHTML() +
            moveRuleRowDownButtonHTML() +
            removeRuleRowButtonHTML()
    }
    else if(rowType === 'ruleActionRow'){
        htmlString = htmlString +
            "<div class='col-xs-3 col-xs-offset-4 rulesButtonColumn' style=''> " +
            addRuleActionButtonHTML() +
            addRuleModifierButtonHTML() +
            moveActionRowUpButtonHTML() +
            moveActionRowDownButtonHTML() +
            removeRuleActionContainerButtonHTML()
    }
    else if(rowType === 'ruleModifierRow'){
        htmlString = htmlString +
            "<div class='col-xs-3 col-xs-offset-5 rulesButtonColumn' style=''> " +
            addRuleModifierButtonHTML() +
            moveModifierRowUpButtonHTML() +
            moveModifierRowDownButtonHTML() +
            removeRuleModifierContainerButtonHTML()
    }
    else{
    }

    htmlString = htmlString +
        "</div> "

    return htmlString
}
function addRuleRowButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-sm btn-primary addRuleRowButton' style=''> " +
        "   <i class='fa fa-plus'></i> " +
        "</button> "

    return htmlString
}
function addSubRulesButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-sm addSubRulesButton' style=''> " +
        "   <i class='fa fa-plus'></i> " +
        "   <i class='fa fa-level-up fa-rotate-90'></i> " +
        "</button> "

    return htmlString
}
function addRuleActionButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-sm addRuleActionButton'> " +
        "   <i class='fa fa-plus'></i> " +
        "   <i class='fa fa-bolt'></i> " +
        "</button> "

    return htmlString
}
function addRuleModifierButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-sm addRuleModifierButton'> " +
        "   <i class='fa fa-plus'></i> " +
        "   <i class='fa fa-random'></i> " +
        "</button>"

    return htmlString
}
function moveRuleRowUpButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-xs btn-success moveRuleRowUpButton '> " +
        "   <i class='fa fa-arrow-up' aria-hidden='true'></i> " +
        "</button> "

    return htmlString
}
function moveRuleRowDownButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-xs btn-success moveRuleRowDownButton '> " +
        "   <i class='fa fa-arrow-down' aria-hidden='true'></i> " +
        "</button> "

    return htmlString
}
function moveActionRowUpButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-xs btn-success moveActionRowUpButton '> " +
        "   <i class='fa fa-arrow-up' aria-hidden='true'></i> " +
        "</button> "

    return htmlString
}
function moveActionRowDownButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-xs btn-success moveActionRowDownButton '> " +
        "   <i class='fa fa-arrow-down' aria-hidden='true'></i> " +
        "</button> "

    return htmlString
}
function moveModifierRowUpButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-xs btn-success moveModifierRowUpButton '> " +
        "   <i class='fa fa-arrow-up' aria-hidden='true'></i> " +
        "</button> "

    return htmlString
}
function moveModifierRowDownButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-xs btn-success moveModifierRowDownButton '> " +
        "   <i class='fa fa-arrow-down' aria-hidden='true'></i> " +
        "</button> "

    return htmlString
}
function removeRuleRowButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-sm btn-danger removeRuleRowButton ' style=''> " +
        "   <i class='fa fa-trash-o'></i> " +
        "</button> "

    return htmlString
}
function removeRuleActionContainerButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-sm btn-danger removeRuleActionContainerButton ' style=''> " +
        "   <i class='fa fa-trash-o'></i> " +
        "</button> "

    return htmlString
}
function removeRuleModifierContainerButtonHTML(){
    var htmlString = "" +
        "<button class='btn btn-sm btn-danger removeRuleModifierContainerButton ' style=''> " +
        "   <i class='fa fa-trash-o'></i> " +
        "</button> "

    return htmlString
}

//RULE ROW ICONS
function ruleRowIcon(rowType){
    var htmlString = ""
    if(rowType === 'ruleConditionContainer'){
    }
    else if(rowType === 'ruleActionRow'){
        htmlString = htmlString +
            "<i class='fa fa-bolt ruleRowIcon'></i> "
    }
    else if(rowType === 'ruleModifierRow'){
        htmlString = htmlString +
        "<i class='fa fa-random ruleRowIcon'></i> "
    }
    else{
    }

    return htmlString
}

///////////////BUILD RULES ENGINE JSON FUNCTIONS////////////////////////
function buildRulesEngineMapForOperation(){

    var rulesEngineMap = {}

    //OPERATION GLOBAL RULES
    var globalRuleRowsContainer = $('#operationGlobal_RulesEngineContainer').children('.ruleRowsContainer')
    rulesEngineMap.global = buildRulesArrayForRulesContainer(globalRuleRowsContainer)

    //COVERAGE PRODUCTS
    $('#coveragesAllowedContainer').find('.coverageCheckbox:checked').each(function(){
        var covID = $(this).attr('data-covid')
        var ruleRowsContainer = $('#' + covID + '_RulesEngineContainer').children('.ruleRowsContainer')

        rulesEngineMap[covID] = buildRulesArrayForRulesContainer(ruleRowsContainer)
    })

    return rulesEngineMap
}
function buildRulesArrayForRulesContainer(ruleRowsContainer){
    var rulesArray = []

    $(ruleRowsContainer).children('.ruleRow').each(function(){
        var thisRuleRowMap = {}
        var thisRuleRow = $(this)
        var ruleConditionContainer = $(thisRuleRow).children('.ruleConditionContainer')
        var ruleActionRowsContainer = $(thisRuleRow).children('.ruleActionRowsContainer')
        var subRuleRowsContainer = $(thisRuleRow).children('.subRuleRowsContainer')

        //CONDITIONS
        var conditionsArray = []
        var conditionMap = {}
        var ruleConditionStatement = $(ruleConditionContainer).find('.ruleConditionStatement').val()
        var ruleConditionBasis = $(ruleConditionContainer).find('.ruleConditionBasis').val()
        var ruleConditionOperator = $(ruleConditionContainer).find('.ruleConditionOperator').val()
        var ruleConditionTestValue = $(ruleConditionContainer).find('.ruleConditionTestValue').val()

        if(ruleConditionStatement !== undefined && ruleConditionStatement !== null && ruleConditionStatement.trim().length > 0 ){
            conditionMap.conditionStatement = ruleConditionStatement
        }
        if(ruleConditionBasis !== undefined && ruleConditionBasis !== null && ruleConditionBasis.trim().length > 0 ){
            conditionMap.conditionBasis = ruleConditionBasis
        }
        if(ruleConditionOperator !== undefined && ruleConditionOperator !== null && ruleConditionOperator.trim().length > 0 ){
            conditionMap.conditionOperator = ruleConditionOperator
        }
        if(ruleConditionTestValue !== undefined && ruleConditionTestValue !== null && ruleConditionTestValue.trim().length > 0 ){
            conditionMap.conditionTestValue = ruleConditionTestValue
        }

        conditionsArray.push(conditionMap)
        thisRuleRowMap.conditions = conditionsArray

        //ACTIONS
        if($(ruleActionRowsContainer).children('.ruleActionContainer').length > 0){
            var actionsArray = []
            $(ruleActionRowsContainer).children('.ruleActionContainer').each(function(){
                var actionMap = {}
                var thisRuleActionContainer = $(this)

                //ACTION
                var thisActionRow = $(thisRuleActionContainer).children('.ruleActionRow')

                var ruleConditionActionStatement = $(thisActionRow).find('.ruleConditionActionStatement').val()
                var ruleConditionActionTarget = $(thisActionRow).find('.ruleConditionActionTarget').val()
                var ruleConditionActionValue = $(thisActionRow).find('.ruleConditionActionValue').val()

                if(ruleConditionActionStatement !== undefined && ruleConditionActionStatement !== null && ruleConditionActionStatement.trim().length > 0 ){
                    actionMap.conditionActionStatement = ruleConditionActionStatement
                }
                if(ruleConditionActionTarget !== undefined && ruleConditionActionTarget !== null && ruleConditionActionTarget.trim().length > 0 ){
                    actionMap.conditionActionTarget = ruleConditionActionTarget
                }
                if(ruleConditionActionValue !== undefined && ruleConditionActionValue !== null && ruleConditionActionValue.trim().length > 0 ){
                    actionMap.conditionActionValue = ruleConditionActionValue
                }

                //ACTION MODIFIER
                var thisRuleModifierRowsContainer = $(thisRuleActionContainer).children('.ruleModifierRowsContainer')
                if($(thisRuleModifierRowsContainer).children('.ruleModifierRow').length > 0){
                    var modifierArray = []
                    $(thisRuleModifierRowsContainer).children('.ruleModifierRow').each(function(){
                        var modifierMap = {}
                        var thisRuleModifierRow = $(this)

                        var ruleConditionForTarget = $(thisRuleModifierRow).find('.ruleConditionForTarget').val()
                        var ruleConditionForValue = $(thisRuleModifierRow).find('.ruleConditionForValue').val()

                        if(ruleConditionForTarget !== undefined && ruleConditionForTarget !== null && ruleConditionForTarget.trim().length > 0 ){
                            modifierMap.conditionForTarget = ruleConditionForTarget
                        }
                        if(ruleConditionForValue !== undefined && ruleConditionForValue !== null && ruleConditionForValue.trim().length > 0 ){
                            modifierMap.conditionForValue = ruleConditionForValue
                        }

                        modifierArray.push(modifierMap)
                    })
                    actionMap.modifiers = modifierArray
                }

                actionsArray.push(actionMap)
            })
            thisRuleRowMap.actions = actionsArray
        }
        //SUB RULES
        else if($(subRuleRowsContainer).children('.ruleRow').length > 0){
            thisRuleRowMap.subRules = buildRulesArrayForRulesContainer(subRuleRowsContainer)
        }

        rulesArray.push(thisRuleRowMap)
    })

    return rulesArray
}

///////////////CONVERT RULES ENGINE JSON TO HTML////////////////////////
function buildRulesEngineHTMLFromRulesArray(rulesArray){
    var ruleEngineContainer = $('<div class="rulesEngineContainer"></div>')
    var ruleRowsContainer = $(ruleRowsContainerHTML()).empty()

    $(ruleEngineContainer).html( $(ruleRowsContainer) )

    for(var i=0;i<rulesArray.length;i++){
        var ruleMap = rulesArray[i]

        //GET A NEW RULE ROW ELEMENT
        var newRuleRow = $(ruleRowHTML())

        //SET THE CONDITION VALUES
        var conditionsArray = ruleMap.conditions
        var conditionMap = conditionsArray[0]
        $(newRuleRow).children('.ruleConditionContainer').find('.ruleConditionStatement').val(conditionMap.conditionStatement)

        if(conditionMap.conditionBasis){
            $(newRuleRow).children('.ruleConditionContainer').find('.ruleConditionBasis').val(conditionMap.conditionBasis)
        }
        if(conditionMap.conditionOperator){
            $(newRuleRow).children('.ruleConditionContainer').find('.ruleConditionOperator').val(conditionMap.conditionOperator)
        }
        if(conditionMap.conditionTestValue){
            $(newRuleRow).children('.ruleConditionContainer').find('.ruleConditionTestValue').val(conditionMap.conditionTestValue)
        }


        //BUILD ACTION ROWS IF ACTIONS EXIST
        if(ruleMap.actions){
            var ruleActionRowsContainer = $(newRuleRow).children('.ruleActionRowsContainer')
            $(ruleActionRowsContainer).empty()

            var actionsArray = ruleMap.actions

            for(var j=0;j<actionsArray.length;j++){
                var actionMap = actionsArray[j]

                var newRuleActionContainer = $(ruleActionContainerHTML())
                $(ruleActionRowsContainer).append( $(newRuleActionContainer) )

                if(actionMap.conditionActionStatement){
                    $(newRuleActionContainer).children('.ruleActionRow').find('.ruleConditionActionStatement').val(actionMap.conditionActionStatement)
                }
                if(actionMap.conditionActionTarget){
                    $(newRuleActionContainer).children('.ruleActionRow').find('.ruleConditionActionTarget').val(actionMap.conditionActionTarget)
                }
                if(actionMap.conditionActionValue){
                    $(newRuleActionContainer).children('.ruleActionRow').find('.ruleConditionActionValue').val(actionMap.conditionActionValue)
                }


                //BUILD MODIFIER ROWS IF MODIFIERS EXIST
                if(actionMap.modifiers){
                    var ruleModifierRowsContainer = $(newRuleActionContainer).children('.ruleModifierRowsContainer')
                    $(ruleModifierRowsContainer).empty()

                    var modifiersArray = actionMap.modifiers

                    for(var k=0; k<modifiersArray.length;k++){
                        var modifierMap = modifiersArray[k]

                        var newRuleModifierRow = $(ruleModifierHTML())
                        $(ruleModifierRowsContainer).append( $(newRuleModifierRow) )

                        if(modifierMap.conditionForTarget){
                            $(newRuleModifierRow).find('.ruleConditionForTarget').val(modifierMap.conditionForTarget)
                        }
                        if(modifierMap.conditionForValue){
                            $(newRuleModifierRow).find('.ruleConditionForValue').val(modifierMap.conditionForValue)
                        }
                    }
                }
            }
        }

        //BUILD SUB RULES IF SUB RULES EXIST
        if(ruleMap.subRules){
            var subRulesArray = ruleMap.subRules

            var subRuleRowsContainer = $(buildRulesEngineHTMLFromRulesArray(subRulesArray))
            $(subRuleRowsContainer).addClass('subRuleRowsContainer')

            $(newRuleRow).append( $(subRuleRowsContainer) )
        }
        $(ruleRowsContainer).append( $(newRuleRow) )

    }

    return $(ruleEngineContainer).children('.ruleRowsContainer')
}


///////////////RULE ENGINE DATABASE OBJECT FUNCTIONS////////////////////////
function getRuleEngineObject(conditionID){
    for(var i=0;i<ruleEngineObjects.length; i++){
        if(ruleEngineObjects[i].conditionID === conditionID){
            return ruleEngineObjects[i]
        }
    }
}



///////////////NEW SUBMISSION PAGE RULES ENGINE FUNCTIONS////////////////////////
function buildRulesEngineHTML_Data(){
    var operationObject = getCurrentOperationTypeObject()
    var rulesEngineMap = jsonStringToObject(operationObject.rulesEngineMap)

    //GLOBAL RULES
    if( (rulesEngineMap !== null && rulesEngineMap !== undefined) &&
        (rulesEngineMap.global !== null && rulesEngineMap.global !== undefined) &&
        rulesEngineMap.global.length > 0){
        var globalRuleEngineContainer = $('#operationGlobal_RulesEngineContainer')
        $(globalRuleEngineContainer).empty()
        var globalRulesArray = rulesEngineMap.global
        var globalRuleEngineHTML = $(buildRulesEngineHTMLFromRulesArray(globalRulesArray))


        $(globalRuleEngineContainer).append( $(globalRuleEngineHTML) )

    }

    //COVERAGE RULES

    $('#coveragesAllowedContainer .coverageCheckbox').each(function() {
        if ($(this).attr('disabled') === undefined) {
            var thisCovID = $(this).attr('data-covid')
            var ruleEngineContainer = $('#' + thisCovID + '_RulesEngineContainer')

            if( (rulesEngineMap !== null && rulesEngineMap !== undefined) && rulesEngineMap[thisCovID]){
                var rulesArray = rulesEngineMap[thisCovID]

                $(ruleEngineContainer).empty()

                var ruleEngineHTML = $(buildRulesEngineHTMLFromRulesArray(rulesArray))



                //APPEND TO KEEP INPUT VALUES
                $(ruleEngineContainer).append( $(ruleEngineHTML) )
            }

        }
    })

    formatAllRuleRows()
}

///////////////NEW SUBMISSION QUESTION FUNCTIONS////////////////////////
function getRequiredRulesEngineQuestions(){
    var rulesEngineMap = getRulesEngineMapForSelectedOperation()

    if(rulesEngineMap){
        var rulesEngineMapKeys = Object.keys(rulesEngineMap)

        /////////////////ALWAYS GET GLOBAL QUESTIONS FIRST/////////////////
        if(rulesEngineMap.global.length > 0){
            var rulesArray = rulesEngineMap.global

            getRulesArrayRequiredQuestions(rulesArray)
        }


        /////////////////GET COVERAGE QUESTIONS/////////////////
        //REMOVE GLOBAL FROM KEYS
        if(rulesEngineMapKeys.indexOf('global') != -1) {
            rulesEngineMapKeys.splice(rulesEngineMapKeys.indexOf('global'), 1);
        }

        if(rulesEngineMapKeys.length > 0){
            for(var i=0;i<rulesEngineMapKeys.length;i++){
                var covID = rulesEngineMapKeys[i]

                //IF COVERAGE IS SELECTED, GET QUESTIONS FOR COVERAGE
                if(getCoveragesAndPackagesSelectedArray().indexOf(covID) > -1){
                    var rulesArray = rulesEngineMap[covID]

                    getRulesArrayRequiredQuestions(rulesArray)
                }
            }
        }
    }
}
function getRulesArrayRequiredQuestions(rulesArray){
    var requiredQuestions = []
    for(var i=0;i<rulesArray.length;i++){
        var rulesMap = rulesArray[i]

        //CONDITION
        var conditionsArray = rulesMap.conditions




    }

    return requiredQuestions
}
function doesQuestionExistOnPage(questionID){
    //DOES REQUIRED QUESTION CONTAINER EXIST

    if( questionID === 'stateMailing'){
        //SPECIAL CASES
        if( $('div#step-1 #stateMailing').length > 0){
            return true
        }
        else{
            return false
        }
    }
    else{
        if( $('div.' + questionID + '.requiredQuestion:visible').length > 0){
            return true
        }
        else{
            return false
        }
    }


}
function isQuestionAnswerValid(conditionMap){
    return getConditionBasisActualValue(conditionMap)
}
function isAllRuleEngineQuestionsOnPage(){
    var missingQuestionIDs = runRulesForOperation()

    var checkedForValidityQuestionIDArray = []
    for(var i=0;i<missingQuestionIDs.length;i++){
        var questionID = missingQuestionIDs[i]

        if(getQuestionObjectForID(questionID)){
            checkedForValidityQuestionIDArray.push(questionID)
        }
        else{

        }
    }

    if(checkedForValidityQuestionIDArray.length === 0){
        return true
    }
    else{
        return false
    }
}



///////////////NEW SUBMISSION PAGE RULES ENGINE FUNCTIONS////////////////////////
function getRulesEngineMapForSelectedOperation(){
    var operationObject = getCurrentOperationTypeObject()
    var rulesEngineMap = jsonStringToObject(operationObject.rulesEngineMap)

    return rulesEngineMap
}
function runRulesForOperation(){
    var missingQuestions = []

    if(rulesEngineIsRunning === false){
        try{
            rulesEngineIsRunning = true
            var rulesEngineMap = getRulesEngineMapForSelectedOperation()

            if(rulesEngineMap){
                var rulesEngineMapKeys = Object.keys(rulesEngineMap)

                /////////////////ALWAYS RUN GLOBAL RULES FIRST/////////////////
                if(rulesEngineMap.global.length > 0){
                    var rulesArray = rulesEngineMap.global

                    missingQuestions = missingQuestions.concat(runRulesArray(rulesArray, 'global'))
                }


                /////////////////RUN COVERAGE RULES/////////////////
                //REMOVE GLOBAL FROM KEYS
                if(rulesEngineMapKeys.indexOf('global') != -1) {
                    rulesEngineMapKeys.splice(rulesEngineMapKeys.indexOf('global'), 1);
                }

                if(rulesEngineMapKeys.length > 0){
                    for(var i=0;i<rulesEngineMapKeys.length;i++){
                        var covID = rulesEngineMapKeys[i]

                        //IF COVERAGE IS SELECTED, RUN RULES FOR COVERAGE
                        if(getCoveragesAndPackagesSelectedArray().indexOf(covID) > -1){
                            var rulesArray = rulesEngineMap[covID]

                            // if(mode === 'RATE QUESTIONS'){
                            //     missingQuestions = missingQuestions.concat(runRulesArray(rulesArray, mode))
                            // }
                            // else if(mode === 'RUN'){
                            //     runRulesArray(rulesArray)
                            // }
                            missingQuestions = missingQuestions.concat(runRulesArray(rulesArray, covID))
                        }
                    }
                }
            }

            //IF THERE ARE MISSING QUESTIONS, UPDATE QUESTIONS
            if(missingQuestions.length > 0 ){
                updateQuestions(missingQuestions)
                // return missingQuestions
            }
        }
        finally{
            rulesEngineIsRunning = false
        }
    }
}


function runRulesArray(rulesArray, covID){
    var missingQuestions = []

    for(var i=0;i<rulesArray.length;i++){
        var rulesMap = rulesArray[i]

        //CONDITION
        var conditionsArray = rulesMap.conditions
        var conditionMap = conditionsArray[0]

        //CHECK IF THIS CONDITION HAS A QUESTION
        if(conditionMap.conditionStatement === 'IF' || conditionMap.conditionStatement === 'IFELSE'){
            //ADD QUESTION TO LIST OF QUESTIONS
            var conditionBasisID = conditionMap.conditionBasis

            if(conditionBasisID === 'STATE'){
                //SPECIAL CASES WHEN QUESTION DOESN'T NEED TO BE ADDED
            }
            else{
                var questionID = getQuestionIDforConditionBasisID(conditionBasisID)
                var questionType = ""

                if(covID === 'global'){
                    questionType = "global"
                }
                else{
                    questionType = "coverage"
                }

                var questionObject = {
                    questionID: questionID,
                    type: questionType
                }

                missingQuestions.push(questionObject)
            }

        }

        //CONDITION RESULT
        var conditionResult = evaluateCondition(conditionMap)

        if(conditionResult === true){

            //CHECK IF THERE IS ACTION
            if(rulesMap.actions){
                var actionsArray = rulesMap.actions

                missingQuestions = missingQuestions.concat(runActionArray(conditionMap, actionsArray))
            }
            else{
                var subRulesArray = rulesMap.subRules

                missingQuestions = missingQuestions.concat(runRulesArray(subRulesArray, covID))

            }

            //IF THIS CONDITION WAS A 'IF' OR 'IFELSE' AND IT WAS TRUE, NEED TO SKIP ANY OTHER 'IFELSE' IN THIS GROUP
            if(conditionMap.conditionStatement === 'IF' || conditionMap.conditionStatement === 'IFELSE'){
                //ITERATE UNTIL THE NEXT 'IF' OR 'ALWAYS'
                for(var c=i+1; c<rulesArray.length; c++){
                    var tempConditionsMap = rulesArray[c].conditions[0]

                    if( tempConditionsMap.conditionStatement === 'IF' || tempConditionsMap.conditionStatement === 'ALWAYS'){
                        break;
                    }
                    else{
                        i = c
                    }
                }
            }
        }
        else if(conditionResult === false){
            //IF CONDITION IS FALSE, MOVE TO NEXT CONDITION
            continue
        }
        else if(conditionResult === 'MISSING QUESTION'){
            //ADD QUESTION TO PAGE

            continue

        }
        else if(conditionResult === 'QUESTION NOT ANSWERED'){
            //STOP AND WAIT FOR QUESTION TO BE ANSWERED
            continue
        }
        else if(conditionResult === 'OTHER ERROR'){
            throw "Rules Engine Error"
        }
        else{
            throw "Rules Engine Error"
        }

    }

    return missingQuestions
}
function evaluateCondition(conditionMap){
    //TRIES TO EVALUATE CONDITION, RETURNS TRUE OR FALSE
    //IF CONDITION CAN'T BE EVALUATED, RETURNS INCOMPLETE
    try{
        if(conditionMap.conditionStatement === 'ALWAYS'){
            return true
        }
        else if(conditionMap.conditionStatement === 'IF' || conditionMap.conditionStatement === 'IFELSE'){
            var conditionBasisID = conditionMap.conditionBasis
            var questionID = getQuestionIDforConditionBasisID(conditionBasisID)

            //CHECK FIRST IF CONDITION CAN BE EVALUATED
            var canConditionEvaluate = canConditionMapBeEvaluated(conditionMap)
            if(canConditionEvaluate === true){
                if(conditionMap.conditionBasis === 'COVID'){
                    //CONDITION IS BASED ON COVERAGE CHECKBOX BEING SELECTED OR NOT
                    var covID = conditionMap.conditionTestValue
                    var covCheckboxElement = $('#' + covID + '_CoverageCheckbox')
                    var operator = conditionMap.conditionOperator

                    if(operator === 'EQUAL'){ //COV IS CHECKED = TRUE
                        if( $(covCheckboxElement).is(':checked') ){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                    else if(operator === 'NOTEQUAL'){ //COV IS NOT CHECKED = TRUE
                        if( $(covCheckboxElement).is(':checked') ){
                            return false
                        }
                        else{
                            return true
                        }
                    }
                    else{
                        return false
                    }
                }
                if(conditionMap.conditionBasis === 'COVANDPRODUCTSELECTED'){
                    //CONDITION IS BASED ON COVERAGE CHECKBOX BEING SELECTED OR NOT AND PRODUCT BEING SELECTED OR NOT
                    var covID = conditionMap.conditionTestValue
                    var covCheckboxElement = $('#' + covID + '_CoverageCheckbox')
                    var operator = conditionMap.conditionOperator

                    if(operator === 'EQUAL'){ //COV IS CHECKED
                        if( $(covCheckboxElement).is(':checked') ){
                            //CHECK IF ANY PRODUCT IS SELECTED

                            if(savedProductsSelected[covID]){
                                return true //COVERAGE AND PRODUCT IS SELECTED
                            }
                            else{
                                return false //COVERAGE IS SELECTED BUT PRODUCT IS NOT
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
                else{
                    var testValue = conditionMap.conditionTestValue
                    var actualValue = getConditionBasisActualValue(conditionMap)
                    var operator = conditionMap.conditionOperator

                    var format = getRuleEngineObject(conditionMap.conditionBasis).format
                    if(format === "number" ){
                        testValue = parseFloat(testValue)
                        actualValue = parseFloat(actualValue)
                    }
                    else if(format === "text"){
                        testValue = testValue + ""
                        actualValue = actualValue + ""
                    }

                    if(operator === 'LESSTHAN'){
                        if(actualValue < testValue){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                    else if(operator === 'LESSEQUAL'){
                        if(actualValue <= testValue){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                    else if(operator === 'GREATERTHAN'){
                        if(actualValue > testValue){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                    else if(operator === 'GREATEREQUAL'){
                        if(actualValue >= testValue){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                    else if(operator === 'EQUAL'){
                        if(actualValue === testValue){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                    else if(operator === 'NOTEQUAL'){
                        if(actualValue !== testValue){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                }



            }
            else{
                //CONDITION CAN'T BE EVALUATED PROPERLY
                //MISSING QUESTIONS OR QUESTION NOT ANSWERED
                return canConditionEvaluate
            }

        }
        else if(conditionMap.conditionStatement === 'ELSE'){
            return true
        }
    }
    catch(e){
        console.log(e.message)
        throw "Condition Error"
    }
}
function canConditionMapBeEvaluated(conditionMap){
    //CHECK IF THIS CONDITION BASIS HAS A VALID QUESTION ID
    var conditionBasisID = conditionMap.conditionBasis

    if(conditionBasisID === 'COVID'){
        //IF CONDITION IS BASED ON COVERAGE CHECKBOXES SELECTED, CHECK IF COV ID FOR CHECKBOX IS DEFINED, IS A STRING, AND IS NOT BLANK
        if( conditionMap.conditionTestValue !== undefined && conditionMap.conditionTestValue !== null &&
            (typeof conditionMap.conditionTestValue === 'string' || conditionMap.conditionTestValue instanceof String) &&
            conditionMap.conditionTestValue.trim().length > 0){
            return true
        }
        else{
            return false
        }

    }
    if(conditionMap.conditionBasis === 'COVANDPRODUCTSELECTED'){
        //IF CONDITION IS BASED ON COVERAGE CHECKBOXES SELECTED, CHECK IF COV ID FOR CHECKBOX IS DEFINED, IS A STRING, AND IS NOT BLANK
        if( conditionMap.conditionTestValue !== undefined && conditionMap.conditionTestValue !== null &&
            (typeof conditionMap.conditionTestValue === 'string' || conditionMap.conditionTestValue instanceof String) &&
            conditionMap.conditionTestValue.trim().length > 0){
            return true
        }
        else{
            return false
        }
    }
    else{
        //FOR QUESTION BASED CONDITIONS
        var conditionBasisQuestionID = getRuleEngineObject(conditionBasisID).questionID
        if(conditionBasisQuestionID){
            if( doesQuestionExistOnPage(conditionBasisQuestionID)){
                if(isQuestionAnswerValid(conditionMap) !== undefined && isQuestionAnswerValid(conditionMap) !== null ){
                    return true
                }
                else{
                    //STOP AND WAIT FOR QUESTION TO BE ANSWERED
                    return "QUESTION NOT ANSWERED"
                }
            }
            else{
                //IF QUESTION DOESN'T EXIST ON PAGE
                // requiredQuestions.push(conditionBasisQuestionID)
                return "MISSING QUESTION"
            }
        }
        else{
            //IF THIS CONDITION BASIS IS NOT QUESTION BASED
            return "OTHER ERROR"
        }
    }

}
function getConditionBasisActualValue(conditionMap){
    var conditionBasisID = conditionMap.conditionBasis

    if(conditionBasisID === "LIMITVALUEIS"){
        var limitDescription = conditionMap.limitDescription
        var limitRateID = conditionMap.limitRateID

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
        var conditionBasisInputID = getRuleEngineObject(conditionBasisID).questionID
        var questionObject = getQuestionObjectForID(conditionBasisInputID)

        //CHECK IF QUESTION EXISTS ON PAGE, IF NOT RETURN UNDEFINED
        if( doesQuestionExistOnPage(questionObject.questionID)){
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

                if(conditionBasisID === "POLICYLENGTH"){
                    if(actualBasisValue && actualBasisValue.trim().length > 0){
                        actualBasisValue = removeAllNonNumbersFromString(actualBasisValue)
                    }
                    else{
                        actualBasisValue = undefined
                        return actualBasisValue
                    }
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
            var actualBasisValue

            //CHECK IF MORE THAN ONE CHECKBOX IS CHECKED
            if( $(conditionBasisInput).find("input[type='" + questionObject.inputType + "']:checked").length > 1 ){
                var checkboxesCheckedArray = $(conditionBasisInput).find("input[type='" + questionObject.inputType + "']:checked")
                var actualValuesArray = []

                for(var i=0;i<checkboxesCheckedArray;i++){
                    actualValuesArray.push( $(checkboxesCheckedArray).val() )
                }

                actualBasisValue = actualValuesArray.toString()
            }
            else{
                actualBasisValue = $(conditionBasisInput).find("input[type='" + questionObject.inputType + "']:checked").val()
            }

            if(actualBasisValue){
                return formatBasisValue(actualBasisValue)
            }
            else{
                return undefined
            }

        }
        else{
            return undefined
        }
    }
}
function getQuestionIDforConditionBasisID(conditionBasisID){
    var questionID = getRuleEngineObject(conditionBasisID).questionID

    return questionID
}
function getQuestionObjectForID(questionID){
    for(var i=0;i<questions.length;i++){
        if(questionID === questions[i].questionID){
            return questions[i]
        }
    }

}
function runActionArray(conditionMap, actionsArray){
    var missingQuestions = []

    for(var i=0;i<actionsArray.length;i++){
        var actionMap = actionsArray[i]

        var actionStatement = actionMap.conditionActionStatement
        var actionTarget = actionMap.conditionActionTarget

        if(actionStatement === 'SELECT'){
            //SELECT CAN BE CHECKBOX, RADIO, OR
            if(actionTarget === 'PRODUCT'){

            }
            else if(actionTarget === 'POLICYTERM'){

            }
            else if(actionTarget === 'QUESTIONANSWER'){

            }
        }
        else if(actionStatement === 'SHOW'){
            if(actionTarget === 'PRODUCT'){
                var productObject = getProductObjectFromProductID(actionMap.conditionActionValue)

                addProductOption(productObject)


                if(actionMap.modifiers && actionMap.modifiers.length > 0){
                    var modifiersArray = actionMap.modifiers

                    //RUN MODIFIERS
                    var coverageID = productObject.coverage
                    for(var m=0;m<modifiersArray.length;m++){
                        var modifierMap = modifiersArray[m]

                        if(modifierMap.conditionForTarget === 'COVERAGE'){
                            coverageID = modifiersArray[m].conditionForValue

                            // addProductCardToDisplay(actionMap.conditionActionValue, coverageID)
                            addProductOption_SpecificCovID(productObject, coverageID)
                        }
                        else if(modifierMap.conditionForTarget === 'RATEFOR'){
                            var rateID = modifiersArray[m].conditionForValue

                            updateRateForProductOption(coverageID, productObject, rateID)

                            var rateObject = getRateObjectByID(rateID)
                            var ratingBasis = rateObject.rateBasis
                            var ratingBasisObject = getRatingBasisObjectByID(ratingBasis)

                            //GET TIERED RATING
                            var questionID
                            if(ratingBasis === 'BRACKET'){
                                questionID = rateObject.tieredQuestionID
                            }
                            else if(ratingBasis === 'RATESHEET'){
                                //WC RATE SHEETS REQUIRE 2RATE RATE CODES TO HAVE INPUTS
                                var rateSheetObject = getRateSheetObjectByID(rateID)
                                var rateSheetArray = JSON.parse(rateSheetObject.rateSheetArray)


                                var state = getInsuredMailingState()
                                var rateCodeArrayForState = rateSheetArray[state]

                                //LOOP THROUGH RATE CODE ARRAY TO FIND 2RATE RATE CODES
                                for(var i=0;i<rateCodeArrayForState.length;i++){
                                    var rateCode = rateCodeArrayForState[i]
                                    var rateCodeObject = getWCRateObjectByIDAndState(rateCode, state, productObject.productID)

                                    if(rateCodeObject.howProcessed === '2RATE'){
                                        var wcQuestionID =  rateCode + '_WCPayroll'

                                        var wcQuestionObject = {
                                            questionID: wcQuestionID,
                                            type: 'rate'
                                        }

                                        missingQuestions.push(wcQuestionObject)
                                    }
                                }


                            }
                            else{
                                questionID = ratingBasisObject.basisQuestionID
                            }

                            if(questionID){
                                var questionObject = {
                                    questionID: questionID,
                                    type: 'rate'
                                }

                                missingQuestions.push(questionObject)
                            }


                        }

                    }
                }
            }
            else if(actionTarget === 'COVERAGECHECKBOX_ACTIONTARGET'){
                //MOVE CHECKBOX TO BE INDENTED AND UNDERNEATH THE TRIGGERING CHECKBOX
                var covIDToShow = actionMap.conditionActionValue
                var triggeringCovID = conditionMap.conditionTestValue
                moveCheckboxUnderCovID(covIDToShow, triggeringCovID)

                showCoverageCheckboxByCovID(actionMap.conditionActionValue)
            }
        }
        else if(actionStatement === 'HIDE'){
            if(actionTarget === 'COVERAGECHECKBOX_ACTIONTARGET'){
                hideCoverageCheckboxByCovID(actionMap.conditionActionValue)
            }
        }
        else if(actionStatement === 'CHANGE'){
            if(actionTarget === 'POLICYTERM'){
                setProposedTermLength(actionMap.conditionActionValue)

            }
        }

    }


    // if(mode === 'GLOBAL QUESTIONS'){
    //     return missingQuestions
    // }
    // else if(mode === 'RATE QUESTIONS'){
    //     return missingQuestions
    // }
    // else if(mode === 'RUN'){
    //     return undefined
    // }

    return missingQuestions

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


//ACTION FUNCTIONS
