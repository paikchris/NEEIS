/*
CONCEPT: ALLOW UNDERWRITERS TO BUILD LOGIC FOR INDIVIDUAL RATE CODES
EACH RATE CODE ULTIMATELY NEEDS A PREMIUM, WHETHER ITS A DOLLAR AMOUNT OR ZERO.
EACH RATE CODE ALSO CAN CHANGE LIMITS, OTHER RATE CODE ATTRIBUTES VALUES.
RATE CODE ATTRIBUTES:
1.RATE
2.PREMIUM
3.EXPOSURE BASIS
4.EXPOSURE VALUE

EDIT: ALLOW FOR RULES FOR ENTIRE PAGE USING OBJECTS
ORDER OF LOGIC:
1. CONDITION (always, if, if else, else) (condition statements)
2. OBJECT (ex. rateCode, limitid, questionID, etc)
3. OBJECT ATTRIBUTE (ex. rate, premium, limit value)
4. OPERATOR (ex =, >, <, is one of)
5. TEST VALUE (ex. text, num, array)
5.1 (OPTIONAL) (AND | OR) (ANOTHER CONDITION STATEMENT)
6. ACTION (ex. change, show, hide, minus, add etc. )
7. TARGET OBJECT (ex. rateCode, limitid)
8. TARGET OBJECT ATTRIBUTE (ex. rate, premium, limit, etc.)
9. TARGET OBJECT VALUE (ex. .04, smdkfsl, etc)

RULES CAN BE CONVERTED TO JAVASCRIPT LOGIC USING eval()

TARGET PAGE HAS TO HAVE ALL ITEMS IN OBJECT FORM

CONDITION IDS: always, if, ifElse, else

 */

//DATA STATE MODEL CLASSES
var rulesDataModelObject
var PREVIEW_MODAL_DOMOBJECT
var RATESHEETWELL_DOMOBJECT
var ADDRULEMODAL_DOMOBJECT
var RULESETEXECUTOR_DOMOBJECT

function RulesDataModel(){
    //PRIVATE
    this.dataModel

    //INIT METHOD
    this.init = function(){
        this.dataModel = {
            ruleSets: {} // MUST BE ARRAY OF RULE SET OBJECTS (STATES)
        }
    }

    //PUBLIC METHODS
    this.parseJSON = function(dataModelJSON){
        var JSONDataModel = JSON.parse(dataModelJSON)

        var ruleSetKeys = Object.keys( JSONDataModel.ruleSets )

        for(var i=0;i<ruleSetKeys.length; i++){
            var ruleSetKey = ruleSetKeys[i]

            var thisRulesArray = JSONDataModel.ruleSets[ruleSetKey].rules
            if(thisRulesArray){
                for(var j=0;j<thisRulesArray.length; j++){
                    var thisRuleJSON = thisRulesArray[j]

                    var thisConditionsArray = thisRuleJSON.conditions
                    if(thisConditionsArray){
                        for(var k=0; k<thisConditionsArray.length; k++){
                            var thisBooleanLogicArray = thisConditionsArray[k].booleanLogic
                            if(thisBooleanLogicArray){
                                for(var m=0; m<thisBooleanLogicArray.length; m++){
                                    if(thisBooleanLogicArray[m].boolType === 'BoolExpression'){
                                        thisBooleanLogicArray[m] = new BoolExpression(thisBooleanLogicArray[m])
                                    }
                                    else if(thisBooleanLogicArray[m].boolType === 'BoolOperator'){
                                        thisBooleanLogicArray[m] = new BoolOperator(thisBooleanLogicArray[m])
                                    }
                                    if(thisBooleanLogicArray[m].boolType === 'BoolCharacter'){
                                        thisBooleanLogicArray[m] = new BoolCharacter(thisBooleanLogicArray[m])
                                    }
                                }
                            }

                            var thisActionsArray = thisConditionsArray[k].actions
                            if(thisActionsArray){
                                for(var m=0; m<thisActionsArray.length; m++){
                                    thisActionsArray[m] = new Action(thisActionsArray[m])
                                }
                            }

                            thisConditionsArray[k] = new Condition(thisConditionsArray[k])
                        }
                    }

                    var thisConditionalRulesArray = thisRuleJSON.conditionalRules
                    if(thisConditionalRulesArray){
                        for(var k=0; k<thisConditionalRulesArray.length;k++){
                            thisConditionalRulesArray[k] =  new Rule(thisConditionalRulesArray[k])
                        }
                    }

                    thisRulesArray[j] = new Rule(thisRulesArray[j])
                }
            }

            // var thisVariablesArray = JSONDataModel.ruleSets[ruleSetKey].variables
            var thisVariablesMap = JSONDataModel.ruleSets[ruleSetKey].variables
            var thisVariablesMapKeys = Object.keys(thisVariablesMap)

            if(thisVariablesMap && thisVariablesMapKeys){
                for(var j=0;j<thisVariablesMapKeys.length; j++){
                    thisVariablesMap[thisVariablesMapKeys[j]] = new RuleSetVariable(thisVariablesMap[thisVariablesMapKeys[j]])
                }
            }

            JSONDataModel.ruleSets[ruleSetKey] = new RuleSet( JSONDataModel.ruleSets[ruleSetKey] )
        }

        this.setModel(JSONDataModel)
    }
    this.getModel = function(){
        return this.dataModel
    }
    this.setModel = function(modelObject){
        this.dataModel = modelObject
    }
    this.getRuleSet = function(ruleSetID){
        return this.dataModel.ruleSets[ruleSetID]
    }
    this.getRuleSetVariable = function(variableID, ruleSetID){
        return this.getRuleSet(ruleSetID).variables[variableID]
    }
    this.getRuleSetVariableByName = function(variableName, ruleSetID){
        var variableMap = this.getRuleSet(ruleSetID).variables
        var variableKeys = Object.keys(variableMap)

        for(var i=0;i<variableKeys.length;i++){
            var variableID = variableKeys[i]

            if(variableMap[variableID].name === variableName){
                return variableMap[variableID]
            }
        }

    }
    this.getRule = function(ruleID, ruleSetID){
        return searchArrayForObjectWithKey(this.dataModel.ruleSets[ruleSetID].rules , 'id', ruleID)
    }
    this.getRuleIndex = function(ruleID, ruleSetID){
        var rulesArray = this.getRuleSet(ruleSetID).rules
        for(var i=0;i<rulesArray.length;i++){
            if(rulesArray[i].id && rulesArray[i].id === ruleID){
                //RETURN OBJECT FOUND
                return i
            }
        }
    }
    this.getConditionalRule = function(ruleSetID, parentRuleID, conditionalRuleID){
        var conditionalRulesArray = this.getRule(parentRuleID, ruleSetID).conditionalRules

        return searchArrayForObjectWithKey(conditionalRulesArray, 'id', conditionalRuleID)

    }
    this.getCondition = function(conditionID, ruleID, ruleSetID){
        return searchArrayForObjectWithKey(this.getRule(ruleID, ruleSetID).conditions , 'id', conditionID)
    }
    this.getBoolObject = function(boolObjectID, conditionID, ruleID, ruleSetID){
        var booleanLogicArray = this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic

        return searchArrayForObjectWithKey(booleanLogicArray , 'id', boolObjectID)
    }
    this.getBoolObjectIndex = function(boolObjectID, conditionID, ruleID, ruleSetID){
        var booleanLogicArray = this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic
        for(var i=0;i<booleanLogicArray.length;i++){
            if(booleanLogicArray[i].id && booleanLogicArray[i].id === boolObjectID){
                //RETURN OBJECT FOUND
                return i
            }
        }
    }
    this.getBoolObject_AtIndex = function(index, conditionID, ruleID, ruleSetID){
        var booleanLogicArray = this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic

        return booleanLogicArray[index]
    }
    this.getBoolExpression = function(boolExpressionID, conditionID, ruleID, ruleSetID){
        var booleanLogicArray = this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic

        return searchArrayForObjectWithKey(booleanLogicArray , 'id', boolExpressionID)
    }
    this.getBoolExpressionIndex = function(boolExpressionID, conditionID, ruleID, ruleSetID){
        var booleanLogicArray = this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic
        for(var i=0;i<booleanLogicArray.length;i++){
            if(booleanLogicArray[i].id && booleanLogicArray[i].id === boolExpressionID){
                //RETURN OBJECT FOUND
                return i
            }
        }
    }
    this.getAction = function(actionID, conditionID, ruleID, ruleSetID){
        var actionsArray = this.getCondition(conditionID, ruleID, ruleSetID).actions

        return searchArrayForObjectWithKey(actionsArray, 'id', actionID)
    }
    this.getActionIndex = function(actionID, conditionID, ruleID, ruleSetID){
        var actionsArray = this.getCondition(conditionID, ruleID, ruleSetID).actions
        for(var i=0;i<actionsArray.length;i++){
            if(actionsArray[i].id && actionsArray[i].id === actionID){
                //RETURN OBJECT FOUND
                return i
            }
        }
    }
    this.getProductID = function(ruleSetID){
        return this.getRuleSet(ruleSetID).productID
    }

    //INSERT FUNCTIONS
    this.addRule = function(ruleSetID, index, ruleObject){
        var rulesArray = this.getRuleSet(ruleSetID).rules

        rulesArray.splice(index, 0, ruleObject)
    }
    this.addCondition = function(ruleSetID, ruleID, conditionObj){
        this.getRule(ruleID, ruleSetID).conditions.push(conditionObj)
    }
    this.addBoolExpression = function(ruleSetID, ruleID, conditionID, boolExpressionObj){
        this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic.push(boolExpressionObj)
    }
    this.addBoolExpression_AtIndex = function(ruleSetID, ruleID, conditionID, boolExpressionObj, index){
        var booleanLogicArray = this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic

        booleanLogicArray.splice(index, 0, boolExpressionObj)
    }
    this.addBoolOperator_AtIndex = function(ruleSetID, ruleID, conditionID, boolOperatorObj, index){
        var booleanLogicArray = this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic

        booleanLogicArray.splice(index, 0, boolOperatorObj)
    }
    this.addAction = function (ruleSetID, ruleID, conditionID, actionObj){
        this.getCondition(conditionID, ruleID, ruleSetID).actions.push(actionObj)
    }
    this.addRateSheetVariable = function(ruleSetID, variableObj){
        this.getRuleSet(ruleSetID).variables[variableObj.id] = variableObj
    }

    //REMOVE FUNCTIONS
    this.removeRuleSetVariable = function(variableID, ruleSetID){
        delete this.getRuleSet(ruleSetID).variables[variableID]
    }
    this.removeRule = function(ruleID, ruleSetID){
        var rulesArray = this.getRuleSet(ruleSetID).rules
        var indexToDelete = -1

        for(var i=0;i<rulesArray.length;i++){
            if(rulesArray[i].id === ruleID){
                indexToDelete = i
            }
        }

        if(indexToDelete >= 0){
            rulesArray.splice(indexToDelete,1);
        }
    }
    this.removeBoolExpression = function(ruleSetID, ruleID, conditionID, boolExpressionID){
        var booleanLogicArray = this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic
        var indexToDelete = -1

        for(var i=0;i<booleanLogicArray.length;i++){
            if(booleanLogicArray[i].id === boolExpressionID){
                indexToDelete = i
            }
        }

        if(indexToDelete >= 0){
            booleanLogicArray.splice(indexToDelete,1);
        }
    }
    this.clearBooleanLogicArray = function(ruleSetID, ruleID, conditionID){
        this.getCondition(conditionID, ruleID, ruleSetID).booleanLogic = []
    }
    this.removeAction = function(ruleSetID, ruleID, conditionID, actionID){
        var actionsArray = this.getCondition(conditionID, ruleID, ruleSetID).actions
        var indexToDelete = -1

        for(var i=0;i<actionsArray.length;i++){
            if(actionsArray[i].id === actionID){
                indexToDelete = i
            }
        }

        if(indexToDelete >= 0){
            actionsArray.splice(indexToDelete,1);
        }
    }

    //SHIFTING INDEX FUNCTIONS
    this.moveRuleTo = function(ruleID, ruleSetID, index){
        var ruleObject = this.getRule(ruleID, ruleSetID)
        this.removeRule(ruleID, ruleSetID)
        this.addRule(ruleSetID, index, ruleObject)
    }

    //DATA SETTER FUNCTIONS
    this.setConditionStatement = function(conditionID, ruleID, ruleSetID, statement){
        var conditionObj = this.getCondition(conditionID, ruleID, ruleSetID)
        conditionObj.statement = statement
    }
    this.setRule = function(ruleID, ruleSetID, ruleObject){
        var rulesArray = this.dataModel.ruleSets[ruleSetID].rules
        var ruleIndex = searchArrayForObjectWithKey_GetIndex( rulesArray, 'id', ruleID)

        if(ruleIndex !== undefined){
            rulesArray[ruleIndex] = ruleObject
        }
    }
    this.setProductID = function(productID, ruleSetID){
        this.getRuleSet(ruleSetID).productID = productID
    }
    this.setCovID = function(covID, ruleSetID){
        this.getRuleSet(ruleSetID).covID = covID
    }
    this.setRuleSetVariableValue_ByName = function(ruleSetID, variableName, newValue){
        this.getRuleSetVariableByName(variableName, ruleSetID).value = newValue
    }

    //INIT
    this.init()
}
function RuleSet(options){ //REPRESENTS STATES AND THEIR RATING RULES
    this.id = (options && options.id ? options.id : generateUniqueID() )
    this.rules = (options && options.rules ? options.rules : [] ) //ARRAY OF RULE OBJECTS (RATE CODES)
    this.variables = (options && options.variables ? options.variables : {
        minPremium: 0,
        premium: 0,
        rate: 0
    } )
    this.productID = (options && options.productID ? options.productID : '' )
    this.covID = (options && options.covID ? options.covID : '' )


    this.init = function(){
    }

    //DATA PAGE: RATE SHEET TABLE
    this.DOMElement = function(){
        var options = {
            ruleSetObject: this
        }
        return new RateSheetWell( options ).DOMElement()
    }
    this.rateCodeRows_DOMElement = function(){
        //BUILD RATE SHEET HTML FROM CURRENT RULES BUILDER DATA STATE MODEL
        var htmlString = ""

        if(this.rules && this.rules.length > 0){
            //LOOP THROUGH THE STATES RATE CODES, INSERT INTO RIGHT CONTAINERS
            for(var i=0;i<this.rules.length;i++) {
                var ruleObject = this.rules[i]

                htmlString = htmlString + ruleObject.DOMElement({rowNum: i})
            }
        }
        return htmlString
    }

    //VALIDATION
    this.variablesArrayIsValid = function(){
        //CHECK TO SEE ALL VARIABLE OBJECTS ARE VALID
        var variableIDS = this.getVariableIDSArray()
        for(var i=0;i<variableIDS.length;i++){

            if( !this.variables[variableIDS[i]].isValid() ){
                return false
            }
        }

        return true
    }

    //UTIL
    this.getVariableIDSArray = function(){
        return Object.keys(this.variables)
    }

    //RUN FUNCTIONS
    this.run = function(status){
        /*
        RETURNS TRUE IF ALL RULES EXECUTE
        RETURNS STATUS OBJECT IF THERE WAS A STATUS OBJ
         */
        var variablesMap = this.variables
        var rulesArray = this.rules

        //START RUN
        for(var i=0;i<rulesArray.length;i++){
            var ruleObj = rulesArray[i]

            //SETUP RUN STATUS OBJECT FOR THIS RULE
            var ruleRunStatusObject = {
                id: ruleObj.id,
                status: '',
                requiredQuestions: []
            }
            status.rulesResults.push(ruleRunStatusObject)

            //RUN RULE OBJ
            status = ruleObj.run(status)

            //UPDATE STATUS
            ruleRunStatusObject.status = status.runStatus

            if(status.runStatus === true){
                continue
            }
            else{
                return status
            }
        }

        return status
    }

}
function RuleSetVariable(options){
    //CONSTANTS
    this.validTypes = ['boolean', 'number', 'string', 'formula']

    //PROPERTIES
    this.id = (options && options.id ? options.id : generateUniqueID() )
    this.type = (options && options.type ? options.type : 'string' )
    this.name = (options && options.name ? options.name : '' )
    this.value = (options && options.value !== undefined ? options.value : '' )

    //DOM ELEMENTS
    this.DOMElement = function(){
        var htmlString = "" +
            "<div class='ruleSetVariableContainer' " +
            "   data-class='" + this.constructor.name + "' " +
            "   data-property='this' " +
            "   data-id='" + this.id + "' " +
            ">" +
                this.validTypesDropdown_DOMElement() +
                this.variableNameInput_DOMElement() +
                this.variableValueInput_DOMElement() +
                this.validationFeedback_DOMElement() +
                ( this.isValid() ? '' : this.addVariableButton_DOMElement() ) +
                this.cancelVariableButton_DOMElement() +
            "</div>"

        return htmlString
    }
    this.validTypesDropdown_DOMElement = function(){
        var validationClass = ""
        var selected = ""

        if(this.typeIsValid()){
            selected = "selected"
            validationClass = "has-success"
        }
        else{
            validationClass = "has-error"
        }

        var htmlString = "" +
            "<div class='form-group variableTypeFormGroup " + validationClass + "'>" +
            "   <select class='form-control ruleSetVariableType' " +
            "       data-class='" + this.constructor.name + "' " +
            "       data-property='type' " +
            "       data-id='" + this.id + "' " +
            "   >"


        for(var i=0;i<this.validTypes.length;i++){
            htmlString = htmlString +
                "<option value='" + this.validTypes[i] + "' " + (this.type === this.validTypes[i] ? selected : '') + ">" + this.validTypes[i] + "</option>"
        }

        htmlString = htmlString +
            "   </select>" +
            "</div>"

        return htmlString
    }
    this.variableNameInput_DOMElement = function(){
        var validationClass = ""
        var selected = ""

        if(this.nameIsValid()){
            selected = "selected"
            validationClass = "has-success"
        }
        else{
            validationClass = "has-error"
        }

        var htmlString =
            "<div class='form-group variableNameFormGroup " + validationClass + "'>" +
            "   <input class='form-control input-xs noSpacesInput ruleSetVariableName ' type='text' " +
            "      placeholder='Variable ID'" +
            "      value='" + this.name + "'" +
            "      data-class='" + this.constructor.name + "' " +
            "      data-property='name' " +
            "      data-id='" + this.id + "' " +
            "   >" +
            "</div>"

        return htmlString
    }
    this.variableValueInput_DOMElement = function(){
        var validationClass = ""

        if(this.valueIsValid()){
            validationClass = "has-success"
        }
        else{
            validationClass = "has-error"
        }

        var htmlString = "" +
            "<div class='form-group variableValueFormGroup " + validationClass + "'>"

        if( this.type === 'boolean' ){
            var selected = ""
            htmlString = htmlString +
                "<select class='form-control ruleSetVariableValue'" +
                "   data-class='" + this.constructor.name + "' " +
                "   data-property='value' " +
                "   data-id='" + this.id + "' " +
                ">" +
                "   <option value='true' " + (this.value === true ? 'selected' : '' ) + ">True</option>" +
                "   <option value='false' " + (this.value === false ? 'selected' : '') + ">False</option>" +
                "</select>"
        }
        else if( this.type === 'string' || this.type === 'number'){
            htmlString = htmlString +
                "<input class='form-control input-xs ruleSetVariableValue' type='text' " +
                "   placeholder='Variable Value'" +
                "   value='" + this.value + "'" +
                "   data-class='" + this.constructor.name + "' " +
                "   data-property='value' " +
                "   data-id='" + this.id + "' " +
                ">"
        }
        else if( this.type === 'formula'){

            if(this.value.trim().length === 0){
                this.value = '='
            }

            htmlString = htmlString +
                "<input class='form-control input-xs ruleSetVariableValue' type='text' " +
                "   placeholder='Formula'" +
                "   value='" + this.value.replace(/(['"])/g, "&quot;") + "'" +
                "   data-class='" + this.constructor.name + "' " +
                "   data-property='value' " +
                "   data-id='" + this.id + "' " +
                ">"
        }

        htmlString = htmlString +
            "</div>"

        return htmlString

    }
    this.validationFeedback_DOMElement = function(){
        var htmlString = "" +
            "<div class='variableValidationFeedback'>"
        if(this.isValid()){
            htmlString = htmlString +
                "<i class='fa fa-check' aria-hidden='true' style='color:green'></i>"
        }
        else{
            htmlString = htmlString +
                "<i class='fa fa-exclamation-triangle' aria-hidden='true' style='color:#bf0c0ccc'></i>"
        }

        htmlString = htmlString  +
            "</div>"

        return htmlString
    }
    this.cancelVariableButton_DOMElement = function(){
        var htmlString = "" +
            "       <button type='button' class='btn btn-xs btn-danger cancelRateSheetVariableButton pull-right' style='font-size:9px'>" +
            "            <i class='fa fa-times' aria-hidden='true'></i>" +
            "       </button>"

        return htmlString
    }
    this.addVariableButton_DOMElement = function(){
        var htmlString = "" +
        "       <button type='button' class='btn btn-xs btn-success submitRateSheetVariableButton pull-right' style='font-size:9px'>" +
        "            <i class='fa fa-check' aria-hidden='true'></i>" +
        "       </button>"

        return htmlString
    }

    //VALIDATION
    this.typeIsValid = function(){
        if( this.validTypes.indexOf( this.type ) > -1){
            return true
        }
        else{
            return false
        }
    }
    this.nameIsValid = function(){
        //NO WHITE SPACES ALLOWED
        if(this.name.indexOf(' ') > -1 || this.name.trim().length === 0){
            return false
        }
        else{
            return true
        }
    }
    this.valueIsValid = function(){
        if( this.type === 'string' || this.type === 'number' || this.type === 'boolean'){
            if( typeof this.value === this.type){
                return true
            }
            else{
                return false
            }
        }
        else if (this.type === 'formula'){
            if(this.value.charAt(0) === '=' && this.value.trim().length > 1){
                return true
            }
            else{
                return false
            }
        }

    }
    this.isValid = function(){
        if(this.typeIsValid() && this.nameIsValid() && this.valueIsValid()){
            return true
        }
        else{
            return false
        }
    }

    //FORMULA FUNCTIONS
    this.evalFormula = function(options){
        //ALL FORMULAS SHOULD START WITH A EQUAL SIGN
        try{
            if(this.type === 'formula' && this.value.charAt(0) === '='){
                var formulaString = this.value.substring(1, this.value.length)

                return eval(formulaString)
            }
            else{
                return undefined
            }
        }
        catch(e){
            return "N/A"
        }

    }
    function varValue(variableName){
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        var variableObj = rulesDataModelObject.getRuleSetVariableByName(variableName, ruleSetID)
        if( variableObj.type === 'formula'){
            return variableObj.evalFormula()
        }
        else{
            return rulesDataModelObject.getRuleSetVariableByName(variableName, ruleSetID).value
        }

    }
    function questionAnswer(questionID){
        return parseFloat( RULESETEXECUTOR_DOMOBJECT.getQuestionValue(questionID) )
    }



}
function Rule(options){
    //REPRESENTS RATE CODE
    //PARENT IDS
    this.ruleSetID = (options && options.ruleSetID ? options.ruleSetID : '' )

    //ATTR
    this.id = (options && options.id ? options.id : generateUniqueID() )
    this.rateCodeID = (options && options.rateCodeID ? options.rateCodeID : '' )
    this.conditions = (options && options.conditions ? options.conditions : [] ) // ARRAY OF CONDITION OBJECTS, REPRESENTS PREVIEW MODAL
    this.code = (options && options.code ? options.code : getRateCodeObjectByID(this.rateCodeID).code )
    this.description = (options && options.description ? options.description : getRateCodeObjectByID(this.rateCodeID).description )
    this.conditionalRules = (options && options.conditionalRules ? options.conditionalRules : [])

    //DATABASE OPTIONS
    this.howProcessed = (options && options.howProcessed ? options.howProcessed : '' )
    this.premiumLogic = (options && options.premiumLogic ? options.premiumLogic : '' )
    this.premium = (options && options.premium ? options.premium : '' )

    //DATA PAGE: RATE CODE ROW
    this.DOMElement = function (options){
        var rowNum = (options.rowNum !== undefined ? options.rowNum : '' )
        var rowColor = ""

        var conditionalRowClass = (options && options.isConditionalRow === true ? 'conditionalRow' : '')

        if(RULESETEXECUTOR_DOMOBJECT.testInProgress === true){
            rowColor = 'background-color: rgba(109, 109, 109, 0.52)'

            var ruleRunResults = searchArrayForObjectWithKey(RULESETEXECUTOR_DOMOBJECT.currentRunResults.rulesResults, 'id', this.id)

            if(ruleRunResults){
                if( ruleRunResults.status === true ){
                    //RULE PASSED
                    rowColor = 'background-color: rgba(104, 205, 145, 0.61)'
                }
                else if( ruleRunResults.status === false ){
                    rowColor = 'background-color: rgba(205, 104, 104, 0.61)'
                }
                else if( ruleRunResults.status === undefined ){
                    rowColor = 'background-color: rgba(186, 193, 95, 0.41)'
                }
            }
        }
        else{
            if( rowNum % 2 === 0 ){
                rowColor = 'background-color: rgba(230, 230, 230, 0.31)'
            }
            else{
                rowColor = 'background-color: rgba(177, 213, 224, 0.21)'
            }
        }


        var htmlString = "" +
            "<div class='row rateSheetRow " + conditionalRowClass + "' style='" + rowColor + "'" +
            (options && options.isConditionalRow === true ? "data-parentruleid='" + options.parentRuleID + "'" : '') +
            "   data-id='" + this.id + "'" +
            "   data-rateCodeID='" + this.rateCodeID + "'" +
            "   data-rateID='" + this.code + "'" +
            "   data-howprocessed='" + this.howProcessed + "'" +
            ">" +
            "   <div class='col-xs-1'>"

        htmlString = htmlString +
            "       <span class='rateSheetLineNumber'>" + rowNum + "</span>" +
            "   </div>" +
            "   <div class='col-xs-1'>" +
            "       <span>" + this.code + " </span>" +
            "   </div>" +
            "   <div class='col-xs-3'>" +
            "       <span>" + this.description + "</span>" +
            "   </div>" +
            "   <div class='col-xs-5'>" +
            "       <div class='rateSheetRowPreview'>" +
            "           <div class='col-xs-2' style='padding:0px;'>" +
            "           <button type='button' class='btn btn-xs btn-info editPremiumLogicButton' style=''>" +
            "               <i class='fa fa-code' aria-hidden='true'></i>" +
            "           </button>"

        if(this.getPlainEnglishTranslationNumLines() > 1){
            htmlString = htmlString +
                "           <button type='button' class='btn btn-xs btn-primary pull-right expandPremiumLogicDisplayButton' style=''>" +
                "               <i class='fa fa-expand' aria-hidden='true'></i>" +
                "           </button>" +
                "           <button type='button' class='btn btn-xs btn-primary pull-right compressPremiumLogicDisplayButton' style='display:none'>" +
                "               <i class='fa fa-compress' aria-hidden='true'></i>" +
                "           </button>"
        }

        htmlString = htmlString +
            "           </div>" +
            "           <div class='col-xs-10'>" +
                            this.getPlainEnglishTranslation() +
            "           </div>" +
            "       </div>" +
            "   </div>" +
            "   <div class='col-xs-2'>" +
            "       <button type='button' class='btn btn-xs btn-info rateSheetRowMoveUpButton pull-right' style='font-size:9px'>" +
            "            <i class='fa fa-caret-up' aria-hidden='true'></i>" +
            "       </button>" +
            "       <button type='button' class='btn btn-xs btn-info rateSheetRowMoveDownButton pull-right' style='font-size:9px'>" +
            "            <i class='fa fa-caret-down' aria-hidden='true'></i>" +
            "       </button>" +
            "       <button type='button' class='btn btn-xs btn-danger rateSheetRowDeleteButton pull-right' style='font-size:9px'>" +
            "            <i class='fa fa-times' aria-hidden='true'></i>" +
            "       </button>" +
            "       <button type='button' class='btn btn-xs btn-success addRuleButton pull-right' style='font-size:9px'>" +
            "            <i class='fa fa-plus' aria-hidden='true'></i>" +
            "       </button>" +
            "   </div>" +
            "</div>" + this.conditionRules_DOMElement()

        return htmlString
    }
    this.conditionRules_DOMElement = function(options){
        var conditionalRowNumSpan = "<span style='padding-left:20px'> <i class='fa fa-level-up fa-rotate-90' aria-hidden='true'></i> </span>"
        var htmlString = ""

        if(this.conditionalRules && this.conditionalRules.length > 0){
            //LOOP THROUGH THE STATES RATE CODES, INSERT INTO RIGHT CONTAINERS
            for(var i=0;i<this.conditionalRules.length;i++){
                var ruleObject = this.conditionalRules[i]
                var options = {
                    rowNum: conditionalRowNumSpan,
                    isConditionalRow: true,
                    parentRuleID: this.id
                }

                htmlString = htmlString + ruleObject.DOMElement(options)
            }
        }
        return htmlString
    }

    //HELPER FUNCTIONS
    this.getPlainEnglishTranslationNumLines = function(options){
        return (this.getPlainEnglishTranslation().match(/rowPreviewText/g) || []).length;
    }
    this.getPlainEnglishTranslation = function(options){
        var displayText = ""

        for(var i=0; i<this.conditions.length;i++){
            var conditionObj = this.conditions[i]

            displayText = displayText + conditionObj.getPlainEnglishTranslation()
        }

        return displayText
    }
    this.refreshConditionalRules = function(options){
        this.conditionalRules = []
        var conditionalArray = this.conditions

        for(var i=0;i<conditionalArray.length; i++){
            var actionsArray = conditionalArray[i].actions

            for(var j=0;j<actionsArray.length; j++){
                var actionObj = actionsArray[j]

                if(actionObj.targetID === 'rule' && actionObj.targetAttributeName_Value.trim().length > 0){
                    var ruleID = actionObj.targetAttributeName_Value

                    //FIND THIS RULE IN THE CURRENT RULE SET AND MOVE IT INTO THE CONDITIONAL RULE ARRAY
                    var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
                    var thisRulesArray = rulesDataModelObject.getRuleSet(ruleSetID).rules
                    for(var k=0;k<thisRulesArray.length; k++){

                        var thisRuleObj = thisRulesArray[k]

                        if(thisRuleObj.id === ruleID){
                            this.conditionalRules.push( thisRuleObj )

                            //REMOVE THE RULE OBJECT FROM THE ORIGINAL RULE SET
                            rulesDataModelObject.removeRule(ruleID, ruleSetID)
                        }
                    }
                }

            }
        }
    }
    this.isConditionalRule = function(){
        /*
        CONDITIONAL RULES ARE REFERRED TO IN ANOTHER RULES CONDITION.
        RETURNS A MAP
        isConditional = true if this rule is conditional
        references array holds objects with rule and condition ids where it is referenced
         */
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        var rulesArray = rulesDataModelObject.getRuleSet(ruleSetID).rules

        var returnObject = {
            isConditional: false,
            references: []
        }

        for(var i=0;i<rulesArray.length;i++){
            var ruleObj = rulesArray[i]
            var conditionArray = ruleObj.conditions

            for(var j=0;j<conditionArray.length;j++){
                var conditionObj = conditionArray[j]
                var actionsArray = conditionObj.actions

                for(var b=0;b<actionsArray.length;b++){
                    var actionObj = actionsArray[b]

                    if( actionObj.targetAttributeName === 'ruleID' && actionObj.targetAttributeName_Value === this.id ){
                        var refObject = {
                            ruleID: ruleObj.id,
                            conditionID: conditionObj.id
                        }
                        returnObject.isConditional = true
                        returnObject.references.push(refObject)
                    }

                }
            }
        }

        return returnObject
    }

    //RUN FUNCTIONS
    this.run = function(status){
        /*
        RUN CONDITIONS ARRAY IN SETS OF IF BLOCKS. IF, IF ELSE, ELSE, ONLY ONE CONDITION MAX IN EACH IF BLOCK CAN EXECUTE
         */
        var conditionsArray = this.conditions
        var inIfBlock = false

        for(var i=0;i<conditionsArray.length;i++){
            var conditionObj = conditionsArray[i]

            if(conditionObj.statement.trim().length > 0){
                //CHECK FOR START OF IF BLOCK
                if(conditionObj.statement === 'if'){
                    inIfBlock = true
                }

                status = conditionObj.run(status)

                if(status.runStatus === true ){
                    i = this.skipToNextConditionBlock(i, conditionsArray)
                    continue
                }
                else if(status.runStatus === false){
                    continue
                }
                else if( status.runStatus === undefined){
                    //IF THE RUN STATUS IS UNDEFINED, THERE WAS AN ERROR
                    //CONTINUE EVALUATING OTHER CONDITIONS OUTSIDE THE CURRENT 'IF' BRANCH

                    //LOOK FOR THE NEXT 'IF' OR 'ALWAYS'
                    i = this.skipToNextConditionBlock(i, conditionsArray)
                    continue
                }

                //CHECK FOR END OF IF BLOCK
                if(conditionObj.statement === 'else' || conditionObj.statement === 'always'){
                    inIfBlock = false
                }
            }
        }

        return status
    }
    this.skipToNextConditionBlock = function(index, conditionsArray){
        for(index++;index<conditionsArray.length;index++){
            if(conditionsArray[index].statement === 'if' || conditionsArray[index].statement === 'always'){
                return index
            }
        }

        //IF ANOTHER CONDITION BLOCK CAN'T BE FOUND, RETURN THE MAX INDEX
        return conditionsArray.length
    }
}
function Condition(options){
    this.CONSTANT_VALUES = {
        statement: {
            hintButtonText: 'Condition',
            validValues: {
                always: {
                    id: 'always',
                    displayText: 'Always',
                    bootstrapColorClass: 'danger'
                },
                if: {
                    id: 'if',
                    displayText: 'If',
                    bootstrapColorClass: 'danger'
                },
                ifElse: {
                    id: 'ifElse',
                    displayText: 'If Else',
                    bootstrapColorClass: 'danger'
                },
                else: {
                    id: 'else',
                    displayText: 'Else',
                    bootstrapColorClass: 'danger'
                }
            },
            defaultValue: ''
        },
        booleanLogic: {
            hintButtonText: 'Object Type',
            validValues: {
                always: {
                    id: 'always',
                    displayText: 'Always',
                    bootstrapColorClass: 'danger'
                },
                if: {
                    id: 'if',
                    displayText: 'If',
                    bootstrapColorClass: 'danger'
                },
                ifElse: {
                    id: 'ifElse',
                    displayText: 'If Else',
                    bootstrapColorClass: 'danger'
                },
                else: {
                    id: 'else',
                    displayText: 'Else',
                    bootstrapColorClass: 'danger'
                }
            },
            defaultValue: ''
        }
    }

    this.valid_statements = Object.keys(this.CONSTANT_VALUES.statement)
    this.id =  (options && options.id ? options.id : generateUniqueID() )
    this.statement = (options && options.statement ? options.statement : '' ) // always, if, ifElse, or else
    this.booleanLogic = (options && options.booleanLogic ? options.booleanLogic : [] ) //ARRAY OF '(', ')', '&&', '||', boolFunctions, and boolExpressions,
    this.actions = (options && options.actions ? options.actions : [] ) //ARRAY OF ACTION OBJECTS TO EXECUTE IF BOOLEAN LOGIC IS TRUE

    //DOM ELEMENT FUNCTIONS
    this.DOMElement = function (options){
        //THE VIEW REPRESENTATION OF A CONDITION OBJECT
        var options = {
            conditionObject: this,
            rowNum: (options && options.rowNum !== undefined ? options.rowNum : '' )
        }
        return new PreviewRow(options).DOMElement()
    }
    this.statement_DOMElement = function(){
        var options = {}
        var htmlString = "<div class='condition_statement_ObjectContainer dataModelObject previewModalRow' data-id='" + this.id + "'>"

        //THIS SHOULD ONLY RETURN A ELEMENT IF STATEMENT IS COMPLETE OR VALID
        if(this.statementIsValid()){
            options = this.getPreviewObjectOptions('statement', this.statement)

            htmlString = htmlString + new PreviewObject(options).DOMElement()
        }
        else{
            options = this.getHintOptions()

            if(options){
                htmlString = htmlString + new PreviewHint(options).DOMElement()
            }
        }

        htmlString = htmlString + "</div>"

        return htmlString
    }
    this.booleanLogic_DOMElement = function (){
        var options = {
            conditionID: this.id
        }

        var htmlString = "" +
            "<div class='condition_booleanLogic_ObjectContainer dataModelObject'>"

        if( this.statement !== 'always' && this.statement !== 'else'){
            for(var i=0;i<this.booleanLogic.length; i++){
                //CHECK TO SEE WHAT TYPE OF BOOL OBJECT THIS IS
                if( this.booleanLogic[i].boolType === 'BoolExpression'){

                }
                else if( this.booleanLogic[i].boolType === 'BoolCharacter'){

                }
                else if( this.booleanLogic[i].boolType === 'BoolOperator'){

                }


                //LOOP THROUGH BOOL EXPRESSION OBJECTS
                var boolObject = this.booleanLogic[i]

                htmlString = htmlString + boolObject.DOMElement(options)
            }


        }

        htmlString = htmlString +
            "</div>"

        return htmlString

    }
    this.actions_DOMElement = function(){
        //CHECK IF ACTIONS HAS A ACTION OBJECT AND NOT EMPTY
        var options = {
            conditionID: this.id
        }

        var htmlString = "" +
            "<div class='condition_actions_ObjectContainer dataModelObject'>"

        for(var i=0;i<this.actions.length; i++){
            var actionObj = this.actions[i]

            htmlString = htmlString + actionObj.DOMElement(options)
        }

        htmlString = htmlString +
            "</div>"

        return htmlString
    }
    this.hint_DOMElement = function(){
        var hintOptions = this.getHintOptions()
        var htmlString = ""

        if(hintOptions){
            htmlString = "" +
                new PreviewHint(hintOptions).DOMElement()
        }

        return htmlString
    }

    //PREVIEW OBJECT AND HINT DATA FUNCTIONS
    this.getNextPropertyToFill = function(){
        if( !this.statementIsValid() ){
            return 'statement'
        }
        else if( !this.booleanLogicIsValid() ){
            return 'booleanLogic'
        }
        else if( !this.actionsIsValid() ){
            return 'actions'
        }
        else{
            return 'complete'
        }
    }
    this.getPreviewObjectOptions = function(propertyName, propertyValue){
        var options = {
            bootstrapColorClass: this.getColorClass(propertyName, propertyValue),
            buttonText: this.getDisplayText(propertyName, propertyValue),
            class: this.constructor.name,
            property: propertyName,
            dropdownOptions: this.getDropdownOptionsForProperty(propertyName, propertyValue)
        }

        return options
    }
    this.getHintOptions = function(){
        var hintOptions = {
            buttonText: 'Button Text',
            dropdownOptions: []
        }

        var nextProperty = this.getNextPropertyToFill()

        if(nextProperty === 'statement'){
            hintOptions.buttonText = this.getHintButtonText(nextProperty)
            hintOptions.dropdownOptions = this.getDropdownOptionsForProperty(nextProperty, this[nextProperty])
        }
        else if(nextProperty === 'booleanLogic'){
            //CHECK IF BOOLEAN LOGIC ARRAY IS EMPTY
            if(this.booleanLogic.length === 0){
                nextProperty = 'objectType'
                hintOptions.buttonText = new BoolExpression().getHintButtonText(nextProperty)
                hintOptions.dropdownOptions = new BoolExpression().getDropdownOptionsForProperty(nextProperty, this[nextProperty])
            }
            else{
                //LOOP THROUGH BOOLEAN LOGIC ARRAY, CHECKING BOOL EXPRESSIONS IF THEY'RE COMPLETE
                for(var i=0;i<this.booleanLogic.length; i++){
                    var boolExpressionObj = this.booleanLogic[i]

                    if( boolExpressionObj.isValid() ){
                        //IF BOOL EXPRESSION IS VALID AND COMPLETE
                        continue
                    }
                    else{
                        //IF BOOL EXPRESSION IS NOT VALID AND COMPLETE
                        nextProperty = boolExpressionObj.getNextPropertyToFill()

                        hintOptions.buttonText = boolExpressionObj.getHintButtonText(nextProperty)
                        hintOptions.dropdownOptions = boolExpressionObj.getDropdownOptionsForProperty(nextProperty, this[nextProperty])
                    }
                }
            }
        }
        else if(nextProperty === 'actions'){

        }


        return hintOptions
    }
    this.getDropdownOptionsForProperty = function(propertyName){
        //RETURNS THE DROPDOWN OPTIONS NEEDED TO PASS INTO HINT OR PREVIEW OBJECT
        var dropdownOptions = []

        var optionIDS = this.getValidValues(propertyName)

        for(var i=0;i<optionIDS.length; i++ ){
            var options = {
                class: this.constructor.name,
                property: propertyName,
                propertyValue: optionIDS[i],
                displayText: this.getDisplayText(propertyName, optionIDS[i])
            }

            if(propertyName === 'statement'){

            }
            else if(propertyName === 'objectType'){
                options.class = 'BoolExpression'
                options.property = 'objectType'
                options.propertyValue = 'question'
                options.optionText = 'Question'
            }
            else if(propertyName === 'objectID'){
                options.class = 'BoolExpression'
                options.property = 'objectID'
                options.propertyValue = 'questionID'
                options.displayText = 'QuestionsID'
            }
            dropdownOptions.push(options)
        }

        return dropdownOptions
    }

    //VALIDATION
    this.statementIsValid = function(){
        if( this.statement.trim().length > 0 && this.getValidValues('statement').indexOf( this.statement ) > -1 ){
            return true
        }
        else{
            return false
        }
    }
    this.booleanLogicIsValid = function(){
        /*
        SHOULD RETURN TRUE IF THERE IS AT LEAST ONE BOOL EXPRESSION THAT IS COMPLETE AND VALID
         */
        if( this.booleanLogic.length > 0 && (this.statement === 'if' || this.statement === 'ifElse') ){
            //SEE IF THERE IS AT LEAST ONE BOOL EXPRESSION THAT IS VALID
            for(var i=0;i<this.booleanLogic.length;i++){
                if(this.booleanLogic[i].isValid() === true){
                    return true
                }
            }

            //RETURN FALSE IF THERE IS NOT A VALID BOOL EXPRESSION
            return false
        }
        else if( this.booleanLogic.length === 0 && (this.statement === 'always' || this.statement === 'else') ){
            return true
        }


        //RETURN FALSE IF BOOLEAN LOGIC ARRAY IS EMPTY
        return false
    }
    this.actionsIsValid = function(){
        if( this.actions.length > 0){
            //VALIDATE ALL ACTION OBJECTS
            for(var i=0;i<this.actions.length;i++){
                if(this.actions[i].isValid() === false){
                    return false
                }
            }

            //RETURN TRUE IF ACTIONS ARRAY IS NOT EMPTY, AND ALL ACTION OBJECTS ARE VALID
            return true
        }
        else{
            return false
        }
    }
    this.isValid = function(){
        if( this.statementIsValid() && this.booleanLogicIsValid() &&
            this.actionsIsValid() ){
            return true
        }
        else{
            return false
        }
    }

    //CLASS CONSTANTS FUNCTIONS
    this.getConstantValuesForPropertyName = function(propertyName){
        return this.CONSTANT_VALUES[propertyName]
    }
    this.getColorClass = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].bootstrapColorClass
    }
    this.getDisplayText = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].displayText
    }
    this.getHintButtonText = function(propertyName){
        return this.getConstantValuesForPropertyName(propertyName).hintButtonText
    }
    this.getValidValues = function(propertyName){
        return Object.keys( this.getConstantValuesForPropertyName(propertyName).validValues )
    }

    //QUESTION/INPUT FUNCTIONS
    this.getQuestionIDS_AllPossible= function(){
        var booleanLogicArray = this.booleanLogic
        var questionIDArray = []

        for(var i=0;i<booleanLogicArray.length;i++){
            var thisBoolExpression = booleanLogicArray[i]

            if(thisBoolExpression.objectType === 'question' && thisBoolExpression.objectID_ValueIsValid()){
                questionIDArray.push(thisBoolExpression.objectID_Value)
            }
        }

        return questionIDArray
    }

    //PLAIN ENGLISH FUNCTIONS
    this.getPlainEnglishTranslation = function(){
        var displayText = "" +
            "<div class='rowPreviewText'>" +
            "   <div class='col-xs-1'>" + this.statement + "</div> "

        var booleanLogicArray = this.booleanLogic

        for(var j=0;j<booleanLogicArray.length;j++){
            var boolObject = booleanLogicArray[j]

            displayText = displayText +
                "<div class='col-xs-11'>" + boolObject.getPlainEnglishTranslation() + "</div> "
        }

        var actionsArray = this.actions
        for(var j=0;j<actionsArray.length;j++){
            var actionObj = actionsArray[j]
            var actionFuncBootstrapClass = ""
            var actionTextBootstrapClass = "col-xs-11"

            if( booleanLogicArray.length > 0){
                //ADD INDENT
                actionFuncBootstrapClass = "col-xs-offset-1"
                actionTextBootstrapClass = "col-xs-10"

            }
            displayText = displayText +
                "   <div class='" + actionFuncBootstrapClass + " col-xs-1' >" + actionObj.actionFunction + "</div> "


            displayText = displayText +
                "<div class='" + actionTextBootstrapClass + "'>" + actionObj.getPlainEnglishTranslation() + "</div> "

        }

        displayText = displayText +
            "</div>"

        return displayText
    }

    //RUN FUNCTIONS
    this.run = function(status){
        /*
        IF THE BOOLEAN LOGIC RETURNS TRUE, EXECUTE ACTIONS, IF ALL EXECUTE SUCCESSFULLY RETURN TRUE
        IF THE BOOLEAN LOGIC RETURNS FALSE, DON'T EXECUTE ACTIONS, RETURN FALSE
        IF THE BOOLEAN LOGIC RETURNS UNDEFINED, DON'T EXECUTE ACTIONS, RETURN UNDEFINED
         */

        if(this.statement === 'if' || this.statement === 'ifElse'){
            status = this.runBooleanLogic(status)

            if(status.runStatus === true){
                //EXECUTE ACTIONS
                this.runActions(status)
                return status
            }
            else if(status.runStatus === false){
                status.runStatus = false
                return status
            }
            else{
                return status
            }
        }
        else if(this.statement === 'always' || this.statement === 'else'){
            this.runActions(status)
            return status
        }
    }
    this.runBooleanLogic = function(status){
        /*
        RUN THROUGH ALL BOOL OBJECTS. STORE EXPRESSION RESULTS AS TRUE OR FALSE IN RESULTS ARRAY.
        THEN IF THERE ARE OPERATORS SEE IF FULL BOOL ARRAY IS MET
         */
        var booleanLogicArray = this.booleanLogic
        var boolArrayRunResults = []

        for(var i=0;i<booleanLogicArray.length; i++){
            var boolObject = booleanLogicArray[i]

            if(boolObject.boolType === 'BoolExpression'){
                status = boolObject.run(status)
                boolArrayRunResults.push( status.runStatus )
            }
            else if(boolObject.boolType === 'BoolOperator'){
                boolArrayRunResults.push( boolObject.operator )
            }
            else if(boolObject.boolType === 'BoolCharacter'){

            }

            if(status.runStatus === undefined){
                //QUIT THIS BOOLEAN LOGIC ARRAY DUE TO MISSING QUESTION
                return status
            }

            //
        }

        //EVALUATE FULL BOOL LOGIC ARRAY
        if(boolArrayRunResults[boolArrayRunResults.length - 1 ] === true ||
            boolArrayRunResults[boolArrayRunResults.length - 1 ] === false ){

            var runResultFullString = ""
            for(var j=0;j<boolArrayRunResults.length;j++){
                var result = boolArrayRunResults[j]

                if(result === 'and'){
                    result = '&&'
                }
                else if(result === 'or'){
                    result = '||'
                }

                runResultFullString = runResultFullString + result
            }

            status.runStatus =  eval(runResultFullString)

            return status
        }
        else{
            //CANNOT END ON A BOOL OPERATOR
            status.runStatus = false
            status.message = "Boolean Logic Array can't end with Bool Operator (" + boolArrayRunResults.join() + ")"
            return status
        }
    }
    this.runActions = function(status){
        var actionsArray = this.actions
        var actionsRunResults = []

        for(var i=0;i<actionsArray.length;i++){
            var actionObject = actionsArray[i]

            status = actionObject.run(status)
        }


    }
}
function BoolExpression(options){
    //CAN ONLY BE INSERTED INTO CONDITIONAL STATEMENT OBJECTS 'booleanLogic' Array
    // A BOOL EXPRESSION OBJECT CAN BE PASSED INTO BOOL FUNCTION AND EVALUATED AS TRUE OR FALSE
    //REPRESENTS (X==Y)
    this.boolType = 'BoolExpression'
    this.CONSTANT_VALUES = {
        objectType: {
            hintButtonText: 'Object Type',
            validValues: {
                question:{
                    id: 'question',
                    displayText: 'Question',
                    bootstrapColorClass: 'info'
                },
                rate:{
                    id: 'rate',
                    displayText: 'Rate',
                    bootstrapColorClass: 'info'
                },
                limit:{
                    id: 'limit',
                    displayText: 'Limit',
                    bootstrapColorClass: 'info'
                }
            },
            defaultValue: ''
        },
        objectID: {
            hintButtonText: 'Object ID',
            validValues: {
                questionID:{
                    id: 'questionID',
                    displayText: 'Question ID',
                    bootstrapColorClass: 'info',
                    DOMElementFunction: 'this.questionIDDropdown_DOMElement()',
                    required: {
                        propertyName: 'objectType',
                        propertyValue: 'question'
                    }
                },
                rateID:{
                    id: 'rateID',
                    displayText: 'Rate ID',
                    bootstrapColorClass: 'info',
                    required: {
                        propertyName: 'objectType',
                        propertyValue: 'rate'
                    }
                },
                limitID:{
                    id: 'limitID',
                    displayText: 'Limit ID',
                    bootstrapColorClass: 'info',
                    requiredObjectType: 'limit',
                    required: {
                        propertyName: 'objectType',
                        propertyValue: 'limit'
                    }
                }

            },
            defaultValue: ''
        },
        attributeName: {
            hintButtonText: 'Attribute Name',
            validValues: {
                questionAnswer:{
                    id: 'questionAnswer',
                    displayText: 'Answer',
                    bootstrapColorClass: 'info',
                    required: {
                        propertyName: 'objectType',
                        propertyValue: 'question'
                    }
                }
            },
            defaultValue: ''
        },
        operator: {
            hintButtonText: 'Operator',
            validValues: {
                equals:{
                    id: 'equals',
                    displayText: '=',
                    bootstrapColorClass: 'info'
                },
                lessThan:{
                    id: 'lessThan',
                    displayText: '<',
                    bootstrapColorClass: 'info'
                },
                lessThanOrEqual:{
                    id: 'lessThanOrEqual',
                    displayText: '<=',
                    bootstrapColorClass: 'info'
                },
                moreThan:{
                    id: 'moreThan',
                    displayText: '>',
                    bootstrapColorClass: 'info'
                },
                moreThanOrEqual:{
                    id: 'moreThanOrEqual',
                    displayText: '>=',
                    bootstrapColorClass: 'info'
                },
            },
            defaultValue: ''

        },
        attributeValue: {
            hintButtonText: 'Attribute Value',
            validValues: {
                questionAnswerValue:{
                    id: 'questionAnswerValue',
                    displayText: 'Q.A. Value',
                    bootstrapColorClass: 'info',
                    DOMElementFunction: 'this.questionAnswerValueInput_DOMElement()',
                    required: {
                        propertyName: 'attributeName',
                        propertyValue: 'questionAnswer'
                    }
                }
            },
            defaultValue: ''
        }
    }

    this.id = (options && options.id ? options.id : generateUniqueID() )
    this.objectType = (options && options.objectType ? options.objectType : '' )
    this.objectID = (options && options.objectID ? options.objectID : '' )
    this.attributeName = (options && options.attributeName ? options.attributeName : '' )
    this.operator = (options && options.operator ? options.operator : '')
    this.attributeValue = (options && options.attributeValue ? options.attributeValue : '' )

    this.objectID_Value = (options && options.objectID_Value ? options.objectID_Value : '' )
    this.attributeValue_Value = (options && options.attributeValue_Value ? options.attributeValue_Value : '' )

    //DOM ELEMENT FUNCTIONS
    this.DOMElement = function (options){
        //DO A DATA DATA CLEAN UP BEFORE DELIVERING DOM ELEMENT
        this.cleanupData()

        var htmlString = "" +
            "<div class='condition_booleanLogic_boolObject_ObjectContainer dataModelObject previewModalRow' " +
            "   data-class='" + this.constructor.name + "' " +
            "   data-property='this' " +
            "   data-id='" + this.id + "' " +
            ">"

        if(this.getNextPropertyToFill() === 'objectType'){
            htmlString = htmlString +
                this.objectType_DOMElement()
        }
        else if(this.getNextPropertyToFill() === 'objectID'){
            htmlString = htmlString +
                this.objectType_DOMElement() +
                this.objectID_DOMElement()
        }
        else if(this.getNextPropertyToFill() === 'objectID_Value'){
            htmlString = htmlString +
                this.objectType_DOMElement() +
                this.objectID_DOMElement()
        }
        else if(this.getNextPropertyToFill() === 'attributeName'){
            htmlString = htmlString +
                this.objectType_DOMElement() +
                this.objectID_DOMElement() +
                this.attributeName_DOMElement()
        }
        else if(this.getNextPropertyToFill() === 'operator'){
            htmlString = htmlString +
                this.objectType_DOMElement() +
                this.objectID_DOMElement() +
                this.attributeName_DOMElement() +
                this.operator_DOMElement()
        }
        else if(this.getNextPropertyToFill() === 'attributeValue'){
            htmlString = htmlString +
                this.objectType_DOMElement() +
                this.objectID_DOMElement() +
                this.attributeName_DOMElement() +
                this.operator_DOMElement() +
                this.attributeValue_DOMElement()
        }
        else if(this.getNextPropertyToFill() === 'attributeValue_Value'){
            htmlString = htmlString +
                this.objectType_DOMElement() +
                this.objectID_DOMElement() +
                this.attributeName_DOMElement() +
                this.operator_DOMElement() +
                this.attributeValue_DOMElement()
        }
        else if(this.getNextPropertyToFill() === 'complete'){
            var conditionID = options.conditionID
            var ruleID = PREVIEW_MODAL_DOMOBJECT.ruleObject.id
            var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
            var boolObjectIndex = rulesDataModelObject.getBoolObjectIndex(this.id, conditionID, ruleID, ruleSetID)

            htmlString = htmlString +
                this.objectType_DOMElement() +
                this.objectID_DOMElement() +
                this.attributeName_DOMElement() +
                this.operator_DOMElement() +
                this.attributeValue_DOMElement() +
                this.addAnotherActionButton_DOMElement() +
                ( boolObjectIndex === 0 ? '' : this.removeThisActionButton_DOMElement( ) )
        }

        htmlString = htmlString +
            "</div>"

        return htmlString
    }
    this.objectType_DOMElement = function () {
        var htmlString = ""
        var options = {}

        if(this.objectTypeIsValid()){
            options = this.getPreviewObjectOptions('objectType', this.objectType)

            htmlString = htmlString + new PreviewObject(options).DOMElement()
        }
        else{
            options = this.getHintOptions()

            if(options){
                htmlString = htmlString + new PreviewHint(options).DOMElement()
            }
        }


        return htmlString
    }
    this.objectID_DOMElement = function(){
        var htmlString = ""
        var options = {}

        if(this.objectIDIsValid()){
            //OBJECT ID DISPLAY ELEMENT WILL DEPEND ON THE OBJECT TYPE
            var inputFunction = this.getDOMElementFunction('objectID', this.objectID)
            if( inputFunction ){
                options = this.getPreviewInputOptions('objectID', this.objectID)
                //IF THERE IS A INPUT FUNCTION FOR THE CURRENT OBJECT TYPE
                htmlString = htmlString + new PreviewInput(options).DOMElement()
                // htmlString = htmlString + eval(inputFunction)
            }
            else{
                //IF THERE IS NO INPUT FUNCTION
                options = this.getPreviewObjectOptions('objectID', this.objectID)

                htmlString = htmlString + new PreviewObject(options).DOMElement()
            }
        }
        else{
            options = this.getHintOptions()

            if(options){
                htmlString = htmlString + new PreviewHint(options).DOMElement()
            }

        }

        return htmlString
    }
    this.attributeName_DOMElement = function(){
        var htmlString = ""
        var options = {}

        if(this.attributeNameIsValid()){
            options = this.getPreviewObjectOptions('attributeName', this.attributeName)

            htmlString = htmlString + new PreviewObject(options).DOMElement()
        }
        else{
            options = this.getHintOptions()

            htmlString = htmlString + new PreviewHint(options).DOMElement()
        }

        return htmlString
    }
    this.operator_DOMElement = function(){
        var htmlString = ""
        var options = {}

        if(this.operatorIsValid()){
            options = this.getPreviewObjectOptions('operator', this.operator)

            htmlString = htmlString + new PreviewObject(options).DOMElement()
        }
        else{
            options = this.getHintOptions()

            htmlString = htmlString + new PreviewHint(options).DOMElement()
        }


        return htmlString
    }
    this.attributeValue_DOMElement = function(){
        var htmlString = ""
        var options = {}

        if(this.attributeValueIsValid()){
            var inputFunction = this.getDOMElementFunction('attributeValue', this.attributeValue)

            if( inputFunction ){
                options = this.getPreviewInputOptions('attributeValue', this.attributeValue)
                //IF THERE IS A INPUT FUNCTION FOR THE CURRENT OBJECT TYPE
                htmlString = htmlString + new PreviewInput(options).DOMElement()
            }
            else{
                //IF THERE IS NO INPUT FUNCTION
                options = this.getPreviewObjectOptions('attributeValue', this.attributeValue)

                htmlString = htmlString + new PreviewObject(options).DOMElement()
            }
        }
        else{
            options = this.getHintOptions()

            htmlString = htmlString + new PreviewHint(options).DOMElement()
        }


        return htmlString
    }
    this.hint_DOMElement = function(){
        var hintOptions = this.getHintOptions()
        var htmlString = ""

        if(this.hintOptions){
            htmlString = "" +
                new PreviewHint(hintOptions).DOMElement()
        }

        return htmlString
    }
    this.addAnotherActionButton_DOMElement = function(){
        var htmlString =
            "<button type='button' class='btn btn-xs btn-success addBoolExpressionButton'>" +
            "   <i class='fa fa-plus' aria-hidden='true'></i>" +
            "   " +
            "</button> "

        return htmlString
    }
    this.removeThisActionButton_DOMElement = function(){
        var htmlString =
            "<button type='button' class='btn btn-xs btn-danger removeBoolExpressionButton'>" +
            "   <i class='fa fa-minus' aria-hidden='true'></i>" +
            "   " +
            "</button> "

        return htmlString
    }

    //INPUT DOM ELEMENT FUNCTIONS
    this.questionIDDropdown_DOMElement = function(){
        var htmlString = "" +
            "<select class='logicPreviewInput' data-class='" + this.constructor.name + "' data-property='objectID_Value' >" +
            "<option value='invalid' selected>Select Question ID</option>"

        for(var i=0;i<questions.length;i++){
            var selectedText = ""
            if(this.objectIDIsValid() && this.objectID_Value === questions[i].questionID){
                selectedText = 'selected'
            }

            htmlString = htmlString +
                "<option value='" + questions[i].questionID + "' " + selectedText + ">" +
                questions[i].questionID + "</option>"
        }

        htmlString = htmlString +
            "</select>"

        return htmlString
    }
    this.questionAnswerValueInput_DOMElement = function(){
        //THIS INPUT DEPENDS ON THE QUESTION ID CHOSEN

        var questionID = this.objectID_Value
        var questionObject = getQuestionObjectForID(questionID)
        var htmlString = ""

        if(questionObject && questionObject.questionType === 'dropdown'){
            var questionOptionsValTextMap = JSON.parse(questionObject.dropdownOptionsValText)
            var questionChoicesKeys = Object.keys(questionOptionsValTextMap)

            htmlString = htmlString +
                "<select class='logicPreviewInput' data-class='" + this.constructor.name + "' data-property='attributeValue_Value'>"

            for(var i=0;i<questionChoicesKeys.length;i++){
                var questionOptionID = questionChoicesKeys[i]
                var questionOptionText = questionOptionsValTextMap[questionChoicesKeys[i]]

                var selectedText = ""
                if(this.attributeValue_ValueIsValid() && this.attributeValue_Value === questionOptionID){
                    selectedText = 'selected'
                }

                htmlString = htmlString +
                    "<option value='" + questionOptionID + "' " + selectedText + ">" + questionOptionText + "</option>"
            }

            htmlString = htmlString +
                "</select>"

        }
        else if(questionObject && questionObject.questionType === 'radio'){
            var questionOptionsValTextMap = JSON.parse(questionObject.htmlCheckboxRadioValText)
            var questionChoicesKeys = Object.keys(questionOptionsValTextMap)

            htmlString = htmlString +
                "<select class='logicPreviewInput' data-class='" + this.constructor.name + "' data-property='attributeValue_Value'>"

            for(var i=0;i<questionChoicesKeys.length;i++){
                var questionOptionID = questionChoicesKeys[i]
                var questionOptionText = questionOptionsValTextMap[questionChoicesKeys[i]]

                var selectedText = ""
                if(this.attributeValue_ValueIsValid() && this.attributeValue_Value === questionOptionID){
                    selectedText = 'selected'
                }

                htmlString = htmlString +
                    "<option value='" + questionOptionID + "' " + selectedText + ">" + questionOptionText + "</option>"
            }

            htmlString = htmlString +
                "</select>"
        }
        else{
            var value = ""
            if(this.attributeValue_ValueIsValid()){
                value = this.attributeValue_Value
            }

            htmlString = htmlString +
                "<input class='form-control logicPreviewInput' type='text' " +
                "data-class='" + this.constructor.name + "' data-property='attributeValue_Value' value='" + value + "'>"
        }


        return htmlString

    }

    //PREVIEW OBJECT AND HINT DATA FUNCTIONS
    this.getNextPropertyToFill = function(){
        if( !this.objectTypeIsValid() ){
            return 'objectType'
        }
        else if( !this.objectIDIsValid() ){
            return 'objectID'
        }
        else if( !this.objectID_ValueIsValid() ){
            return 'objectID_Value'
        }
        else if( !this.attributeNameIsValid() ){
            return 'attributeName'
        }
        else if( !this.operatorIsValid() ){
            return 'operator'
        }
        else if( !this.attributeValueIsValid() ){
            return 'attributeValue'
        }
        else if( !this.attributeValue_ValueIsValid() ){
            return 'attributeValue_Value'
        }
        else{
            return 'complete'
        }

    }
    this.getPreviewObjectOptions = function(propertyName, propertyValue){
        var options = {
            bootstrapColorClass: this.getColorClass(propertyName, propertyValue),
            buttonText: this.getDisplayText(propertyName, propertyValue),
            class: this.constructor.name,
            property: propertyName,
            dropdownOptions: this.getDropdownOptionsForProperty(propertyName, propertyValue)
        }

        return options
    }
    this.getPreviewInputOptions = function(propertyName, propertyValue){
        var options = {
            bootstrapColorClass: this.getColorClass(propertyName, propertyValue),
            buttonText: this.getDisplayText(propertyName, propertyValue),
            class: this.constructor.name,
            property: propertyName,
            dropdownOptions: this.getDropdownOptionsForProperty(propertyName, propertyValue),
            inputDOMElement: eval(this.getDOMElementFunction(propertyName, propertyValue))
        }

        return options
    }
    this.getHintOptions = function(){
        var hintOptions = {
            buttonText: 'Button Text',
            dropdownOptions: []

        }

        var nextProperty = this.getNextPropertyToFill()
        hintOptions.buttonText = this.getHintButtonText(nextProperty)
        hintOptions.dropdownOptions = this.getDropdownOptionsForProperty(nextProperty)

        return hintOptions
    }
    this.getDropdownOptionsForProperty = function(propertyName){
        //RETURNS THE DROPDOWN OPTIONS NEEDED TO PASS INTO HINT OR PREVIEW OBJECT
        var dropdownOptions = []

        var optionIDS = this.getValidValues(propertyName)

        for(var i=0;i<optionIDS.length; i++ ){
            //CHECK IF THIS OPTION IS CURRENTLY ALLOWED
            if( this.checkIfRequirementMetForThisPropertyValue(propertyName, optionIDS[i])){
                var options = {
                    class: this.constructor.name,
                    property: propertyName,
                    propertyValue: optionIDS[i],
                    displayText: this.getDisplayText(propertyName, optionIDS[i])
                }

                dropdownOptions.push(options)
            }
        }

        return dropdownOptions
    }

    //VALIDATION
    this.objectTypeIsValid = function(){
        if( this.objectType.trim().length > 0){
            return true
        }

        return false
    }
    this.objectIDIsValid = function(){
        if( this.objectID.trim().length > 0){
            return true
        }
        return false
    }
    this.objectID_ValueIsValid = function(){
        if( this.objectID_Value.trim().length > 0 && this.objectID_Value !== 'invalid'){
            return true
        }
        else{
            return false
        }
    }
    this.attributeNameIsValid = function(){
        if( this.attributeName.trim().length > 0){
           return true
        }
        return false
    }
    this.operatorIsValid = function(){
        if( this.operator.trim().length > 0){
            return true
        }
        return false
    }
    this.attributeValueIsValid = function(){
        if( this.attributeValue.trim().length > 0){
            return true
        }
        return false
    }
    this.attributeValue_ValueIsValid = function(){
        if( this.attributeValue_Value.trim().length > 0 && this.attributeValue_Value !== 'invalid'){
            return true
        }
        else{
            return false
        }
    }
    this.isValid = function(){
        if( this.objectTypeIsValid() && this.objectIDIsValid() &&
            this.attributeNameIsValid() && this.attributeValueIsValid() && this.operatorIsValid()){
            return true
        }
        else{
            return false
        }
    }

    //DATA CLEAN UP
    this.cleanupData = function(){
        //THROUGH VALUES AND CHECK IF A REQUIRED MAP EXISTS
        var propertyNamesArray = this.getPropertyNames()

        for(var i=0;i<propertyNamesArray.length; i++){
            var propName = propertyNamesArray[i]
            var propValue = this[propName]

            //CHECK IF REQUIRED MAP EXISTS FOR THIS PROPERTY NAME AND VALUE
            if( this.getRequiredMap(propName, propValue) ){
                //CHECK IF REQUIREMENTS ARE MET

                if( this.checkIfRequirementMetForThisPropertyValue(propName, propValue) ){
                    //IF REQUIREMENTS ARE SATISFIED, DO NOTHING
                }
                else{
                    //IF REQUIREMENTS ARE NOT MET, RESET TO DEFAULT VALUE
                    this[propName] = this.getDefaultValueForProperty(propName)
                }
            }
        }


    }
    this.checkIfRequirementMetForThisPropertyValue = function(propertyName, id){
        var requiredMap = this.getRequiredMap(propertyName, id)

        if(requiredMap){
            if( this[requiredMap.propertyName] === requiredMap.propertyValue ){
                return true
            }
            else{
                return false
            }
        }
        else{
            return true
        }

    }

    //POTENTIAL OBJECT CLASS FUNCTIONS
    this.getConstantValuesForPropertyName = function(propertyName){
        return this.CONSTANT_VALUES[propertyName]
    }
    this.getColorClass = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].bootstrapColorClass
    }
    this.getDisplayText = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].displayText
    }
    this.getHintButtonText = function(propertyName){
        return this.getConstantValuesForPropertyName(propertyName).hintButtonText
    }
    this.getValidValues = function(propertyName){
        return Object.keys( this.getConstantValuesForPropertyName(propertyName).validValues )
    }
    this.getDOMElementFunction = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].DOMElementFunction

    }
    this.getPropertyNames = function(){
        return Object.keys( this.CONSTANT_VALUES )
    }
    this.getRequiredMap = function(propertyName, id){
        try{
            return this.getConstantValuesForPropertyName(propertyName).validValues[id].required
        }
        catch(e){
            return undefined
        }
    }
    this.getDefaultValueForProperty = function(propertyName){
        return this.getConstantValuesForPropertyName(propertyName).defaultValue
    }

    //PLAIN ENGLISH FUNCTIONS
    this.getPlainEnglishTranslation = function(){
        var displayText = ""

        if(this.objectType === 'question'){
            if(this.objectID === 'questionID'){
                var questionID = this.objectID_Value
                var questionText = getQuestionObjectForID(questionID).questionText
                var questionAttributeName = this.getDisplayText('attributeName', this.attributeName)
                var operatorText = this.getDisplayText('operator', this.operator)
                var testValue = this.getQuestionPlainAnswerValue( questionID, this.attributeValue_Value )

                displayText = displayText +
                    "<div style='width:100%'>The <span style='font-weight:500'>Answer</span> to: </div>" +
                    "   <div style='padding-left:16px;'>" +
                            getRateSheetRowPreviewQuestionHTML(questionID)  +
                    "       <span style='font-weight:500'>"  + operatorText + " " + testValue + "</span>" +
                    "   </div>"


            }
        }
        else if( this.objectType === 'rate'){

        }
        else if( this.objectType === 'limit'){

        }

        return displayText
    }
    this.getQuestionPlainAnswerValue = function(questionID, value){
        var questionAnswerText = ""

        var questionObj = getQuestionObjectForID(questionID)

        if(questionObj){
            if(questionObj.questionType === 'dropdown'){
                return JSON.parse( questionObj.dropdownOptionsValText )[value]
            }
            else if( questionObj.questionType === 'radio' || questionObj.questionType === 'checkbox'){
                return JSON.parse( questionObj.htmlCheckboxRadioValText )[value]
            }
        }

        return value

    }


    //RUN FUNCTIONS
    this.run = function(status){
        //BOOL EXPRESSION RUN NEEDS TO TEST A TEST VALUE AND ACTUAL VALUE
        /*
        RETURN TRUE IF THIS BOOL EXPRESSION IS TRUE
        RETURN FALSE IF THIS BOOL EXPRESSION IS FALSE
        RETURN A STATUS OBJECT IF CANNOT BE DETERMINED
         */
        var testValue
        var actualValue

        //CHECK CONDITION OBJECT TYPE
        if(this.objectType === 'question'){
            if(this.objectID === 'questionID'){
                var questionID = this.objectID_Value
                var runResultQuestionObject = {
                    questionID: questionID
                }
                if( this.attributeName === 'questionAnswer'){
                    //CHECK IF THE QUESTION HAS BEEN ASKED
                    if( RULESETEXECUTOR_DOMOBJECT.isQuestionExist(questionID) ){
                        actualValue = RULESETEXECUTOR_DOMOBJECT.getQuestionValue(questionID)
                        testValue = this.attributeValue_Value
                    }
                    else{
                        //QUESTION DOES NOT EXIST, WAS NOT ASKED
                        status.runStatus = false
                        return status
                    }
                }

            }
        }

        //CHECK IF VALUES SATISFY CONDITION OPERATOR
        var options = {
            testValue: testValue,
            actualValue: actualValue
        }

        status.runStatus = this.isConditionMet(options)

        return status

    }
    this.isConditionMet = function(options) {
        //RETURNS TRUE IF CONDITION IS TRUE
        //RETURN FALSE IF CONDITION IS NOT MET
        //RETURN UNDEFINED IF CANNOT BE DETERMINED

        var operator = this.operator

        if(operator === 'equals'){
            if(options.actualValue === options.testValue){
                return true
            }
            else{
                return false
            }
        }

        //RETURN UNDEFINED IF CANNOT BE DETERMINED
        return undefined

    }

}
function BoolCharacter(options){
    this.boolType = 'BoolCharacter'
    this.id = (options && options.id ? options.id : generateUniqueID() )

    this.character = (options && options.character ? options.character : '' )

    //RUN FUNCTIONS
    this.run = function(options){

    }
}
function BoolOperator(options){
    this.boolType = 'BoolOperator'
    this.CONSTANT_VALUES = {
        operator: {
            hintButtonText: 'Operator',
            validValues: {
                and: {
                    id: 'and',
                    displayText: 'AND',
                    bootstrapColorClass: 'danger'
                },
                or: {
                    id: 'or',
                    displayText: 'OR',
                    bootstrapColorClass: 'danger'
                }
            },
            defaultValue: ''
        }
    }

    this.id = (options && options.id ? options.id : generateUniqueID() )

    this.operator = (options && options.operator ? options.operator : '' )

    this.DOMElement = function(){
        var options = {}
        var htmlString = "<div class='condition_booleanLogic_boolObject_ObjectContainer dataModelObject previewModalRow' data-id='" + this.id + "'>"

        //THIS SHOULD ONLY RETURN A ELEMENT IF STATEMENT IS COMPLETE OR VALID
        if(this.operatorIsValid()){
            options = this.getPreviewObjectOptions('operator', this.operator)

            htmlString = htmlString + new PreviewObject(options).DOMElement()
        }
        else{
            options = this.getHintOptions()

            if(options){
                htmlString = htmlString + new PreviewHint(options).DOMElement()
            }
        }

        htmlString = htmlString + "</div>"

        return htmlString
    }

    //PREVIEW OBJECT AND HINT DATA FUNCTIONS
    this.getNextPropertyToFill = function(){
        if( !this.operatorIsValid() ){
            return 'operator'
        }
        else{
            return 'complete'
        }
    }
    this.getPreviewObjectOptions = function(propertyName, propertyValue){
        var options = {
            bootstrapColorClass: this.getColorClass(propertyName, propertyValue),
            buttonText: this.getDisplayText(propertyName, propertyValue),
            class: this.constructor.name,
            property: propertyName,
            dropdownOptions: this.getDropdownOptionsForProperty(propertyName, propertyValue)
        }

        return options
    }
    this.getHintOptions = function(){
        var hintOptions = {
            buttonText: 'Button Text',
            dropdownOptions: []
        }

        var nextProperty = this.getNextPropertyToFill()

        if(nextProperty === 'operator'){
            hintOptions.buttonText = this.getHintButtonText(nextProperty)
            hintOptions.dropdownOptions = this.getDropdownOptionsForProperty(nextProperty, this[nextProperty])
        }


        return hintOptions
    }
    this.getDropdownOptionsForProperty = function(propertyName){
        //RETURNS THE DROPDOWN OPTIONS NEEDED TO PASS INTO HINT OR PREVIEW OBJECT
        var dropdownOptions = []

        var optionIDS = this.getValidValues(propertyName)

        for(var i=0;i<optionIDS.length; i++ ){
            var options = {
                class: this.constructor.name,
                property: propertyName,
                propertyValue: optionIDS[i],
                displayText: this.getDisplayText(propertyName, optionIDS[i])
            }

            if(propertyName === 'operator'){

            }
            dropdownOptions.push(options)
        }

        return dropdownOptions
    }

    this.operatorIsValid = function(){
        if( this.operator.trim().length > 0 && this.getValidValues('operator').indexOf( this.operator ) > -1 ){
            return true
        }
        else{
            return false
        }
    }
    this.isValid = function(){
        if( this.operatorIsValid() ){
            return true
        }
        else{
            return false
        }
    }

    //CLASS CONSTANTS FUNCTIONS
    this.getConstantValuesForPropertyName = function(propertyName){
        return this.CONSTANT_VALUES[propertyName]
    }
    this.getColorClass = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].bootstrapColorClass
    }
    this.getDisplayText = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].displayText
    }
    this.getHintButtonText = function(propertyName){
        return this.getConstantValuesForPropertyName(propertyName).hintButtonText
    }
    this.getValidValues = function(propertyName){
        return Object.keys( this.getConstantValuesForPropertyName(propertyName).validValues )
    }


    //RUN FUNCTIONS
    this.run = function(options){

    }
}
function Action(options){
    this.CONSTANT_VALUES = {
        actionFunction: {
            hintButtonText: 'Action Function',
            validValues: {
                change:{
                    id: 'change',
                    displayText: 'Change',
                    bootstrapColorClass: 'success'
                },
                set:{
                    id: 'set',
                    displayText: 'Set',
                    bootstrapColorClass: 'success'
                },
                runNext:{
                    id: 'runNext',
                    displayText: 'Run Next',
                    bootstrapColorClass: 'success'
                },
                ask:{
                    id: 'ask',
                    displayText: 'Ask',
                    bootstrapColorClass: 'success'
                }
            },
            defaultValue: ''
        },
        targetID: {
            hintButtonText: 'Target ID',
            validValues: {
                questionID:{
                    id: 'questionID',
                    displayText: 'Question ID',
                    bootstrapColorClass: 'success',
                    required: {
                        propertyName: 'actionFunction',
                        propertyValue: 'ask'
                    }
                },
                rateSheetVariable:{
                    id: 'rateSheetVariable',
                    displayText: 'Rate Sheet Variable',
                    bootstrapColorClass: 'success'
                },
                limit:{
                    id: 'limit',
                    displayText: 'Limit',
                    bootstrapColorClass: 'success'
                },
                rule:{
                    id: 'rule',
                    displayText: 'Rule',
                    bootstrapColorClass: 'success',
                    required: {
                        propertyName: 'actionFunction',
                        propertyValue: 'runNext'
                    }
                }
            },
            defaultValue: ''
        },
        targetAttributeName: {
            hintButtonText: 'Target Attribute Name',
            validValues: {
                targetQuestionID:{
                    id: 'targetQuestionID',
                    displayText: 'Question ID',
                    bootstrapColorClass: 'success',
                    DOMElementFunction: 'this.questionIDDropdown_DOMElement()',
                    required: {
                        propertyName: 'targetID',
                        propertyValue: 'questionID'
                    }
                },
                targetQuestionAnswer:{
                    id: 'targetQuestionAnswer',
                    displayText: 'Target Question Answer',
                    bootstrapColorClass: 'success',
                    required: {
                        propertyName: 'targetID',
                        propertyValue: 'questionID'
                    }
                },
                rateSheetVariableName:{
                    id: 'rateSheetVariableName',
                    displayText: 'Variable Name',
                    bootstrapColorClass: 'success',
                    DOMElementFunction: 'this.rateSheetVariableDropdown_DOMElement()',
                    required: {
                        propertyName: 'targetID',
                        propertyValue: 'rateSheetVariable'
                    }
                },
                limitDescription:{
                    id: 'limitDescription',
                    displayText: 'Limit Description',
                    bootstrapColorClass: 'success',
                    DOMElementFunction: 'this.limitDescriptionDropdown_DOMElement()',
                    required: {
                        propertyName: 'targetID',
                        propertyValue: 'limit'
                    }
                },
                limitValue:{
                    id: 'limitValue',
                    displayText: 'Limit Value',
                    bootstrapColorClass: 'success',
                    DOMElementFunction: 'this.limitDescriptionDropdown_DOMElement()',
                    required: {
                        propertyName: 'targetID',
                        propertyValue: 'limit'
                    }
                },
                ruleID:{
                    id: 'ruleID',
                    displayText: 'Rule',
                    bootstrapColorClass: 'success',
                    DOMElementFunction: 'this.rateSheetRulesDropdown_DOMElement()',
                    required: {
                        propertyName: 'targetID',
                        propertyValue: 'rule'
                    }
                }
            },
            defaultValue: ''
        },
        targetAttributeValue: {
            hintButtonText: 'Target Attribute Value',
            validValues: {
                targetQuestionValue:{
                    id: 'targetQuestionValue',
                    displayText: 'Target Question Value',
                    bootstrapColorClass: 'success',
                    required: {
                        propertyName: 'targetID',
                        propertyValue: 'questionID'
                    }
                },
                rateSheetVariableValue:{
                    id: 'rateSheetVariableValue',
                    displayText: 'Variable Value',
                    bootstrapColorClass: 'success',
                    DOMElementFunction: 'this.rateSheetVariableValueInput_DOMElement()',
                    required: {
                        propertyName: 'targetID',
                        propertyValue: 'rateSheetVariable'
                    }
                },
                limitDescriptionValue:{
                    id: 'limitDescriptionValue',
                    displayText: 'Limit Description Value',
                    bootstrapColorClass: 'success',
                    DOMElementFunction: 'this.limitDescriptionInput_DOMElement()',
                    required: {
                        propertyName: 'targetAttributeName',
                        propertyValue: 'limitDescription'
                    }
                },
                limitValueValue:{
                    id: 'limitValueValue',
                    displayText: 'Limit Value',
                    bootstrapColorClass: 'success',
                    DOMElementFunction: 'this.limitValueInput_DOMElement()',
                    required: {
                        propertyName: 'targetAttributeName',
                        propertyValue: 'limitValue'
                    }
                },
                ruleValue:{
                    id: 'ruleValue',
                    displayText: 'Run Rule Next',
                    bootstrapColorClass: 'success'
                }

            },
            defaultValue: ''
        }
    }

    this.id = (options && options.id ? options.id : generateUniqueID() )
    this.actionFunction = (options && options.actionFunction ? options.actionFunction : '' )
    this.targetID = (options && options.targetID ? options.targetID : '' )
    this.targetAttributeName = (options && options.targetAttributeName ? options.targetAttributeName : '' )
    this.targetAttributeValue = (options && options.targetAttributeValue ? options.targetAttributeValue : '')

    //INPUT VALUES
    this.targetAttributeName_Value = (options && options.targetAttributeName_Value ? options.targetAttributeName_Value : '' )
    this.targetAttributeValue_Value = (options && options.targetAttributeValue_Value ? options.targetAttributeValue_Value : '' )


    //DOM ELEMENT FUNCTIONS
    this.DOMElement = function (options){
        this.cleanupData()
        var htmlString = "" +
            "<div class='condition_actions_action_ObjectContainer dataModelObject previewModalRow' " +
            "   data-class='" + this.constructor.name + "' " +
            "   data-property='this' " +
            "   data-id='" + this.id + "' " +
            ">"

        if(this.getNextPropertyToFill() === 'actionFunction'){
            htmlString = htmlString +
                this.actionFunction_DOMElement()
        }
        else if(this.getNextPropertyToFill() === 'targetID'){
            htmlString = htmlString +
                this.actionFunction_DOMElement() +
                this.targetID_DOMElement() +
                this.removeThisActionButton_DOMElement()

        }
        else if(this.getNextPropertyToFill() === 'targetAttributeName'){
            htmlString = htmlString +
                this.actionFunction_DOMElement() +
                this.targetID_DOMElement() +
                this.targetAttributeName_DOMElement() +
                this.removeThisActionButton_DOMElement()

        }
        else if(this.getNextPropertyToFill() === 'targetAttributeName_Value'){
            htmlString = htmlString +
                this.actionFunction_DOMElement() +
                this.targetID_DOMElement() +
                this.targetAttributeName_DOMElement() +
                this.removeThisActionButton_DOMElement()
        }

        else if(this.getNextPropertyToFill() === 'targetAttributeValue'){
            htmlString = htmlString +
                this.actionFunction_DOMElement() +
                this.targetID_DOMElement() +
                this.targetAttributeName_DOMElement() +
                this.targetAttributeValue_DOMElement() +
                this.removeThisActionButton_DOMElement()
        }
        else if(this.getNextPropertyToFill() === 'complete'){
            var conditionID = options.conditionID
            var ruleID = PREVIEW_MODAL_DOMOBJECT.ruleObject.id
            var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
            var actionObjectIndex = rulesDataModelObject.getActionIndex(this.id, conditionID, ruleID, ruleSetID)

            htmlString = htmlString +
                this.actionFunction_DOMElement() +
                this.targetID_DOMElement() +
                this.targetAttributeName_DOMElement() +
                this.targetAttributeValue_DOMElement() +
                this.addAnotherActionButton_DOMElement() +
                ( actionObjectIndex === 0 ? '' : this.removeThisActionButton_DOMElement() )

        }

        htmlString = htmlString +
            "</div>"

        return htmlString
    }
    this.actionFunction_DOMElement = function(){
        var htmlString = ""
        var options = {}

        if(this.actionFunctionIsValid()){
            options = this.getPreviewObjectOptions('actionFunction', this.actionFunction)

            htmlString = htmlString + new PreviewObject(options).DOMElement()
        }
        else{
            options = this.getHintOptions()

            if(options){
                htmlString = htmlString + new PreviewHint(options).DOMElement()
            }
        }


        return htmlString
    }
    this.targetID_DOMElement = function(){
        var htmlString = ""
        var options = {}

        if(this.targetIDIsValid()){
            options = this.getPreviewObjectOptions('targetID', this.targetID)

            htmlString = htmlString + new PreviewObject(options).DOMElement()
        }
        else{
            options = this.getHintOptions()

            if(options){
                htmlString = htmlString + new PreviewHint(options).DOMElement()
            }
        }


        return htmlString
    }
    this.targetAttributeName_DOMElement = function(){
        var htmlString = ""
        var options = {}

        if(this.targetAttributeNameIsValid()){
            //OBJECT ID DISPLAY ELEMENT WILL DEPEND ON THE OBJECT TYPE
            var inputFunction = this.getDOMElementFunction('targetAttributeName', this.targetAttributeName)
            if( inputFunction ){
                options = this.getPreviewInputOptions('targetAttributeName', this.targetAttributeName)
                //IF THERE IS A INPUT FUNCTION FOR THE CURRENT OBJECT TYPE
                htmlString = htmlString + new PreviewInput(options).DOMElement()
                // htmlString = htmlString + eval(inputFunction)
            }
            else{
                //IF THERE IS NO INPUT FUNCTION
                options = this.getPreviewObjectOptions('targetAttributeName', this.targetAttributeName)

                htmlString = htmlString + new PreviewObject(options).DOMElement()
            }
        }
        else{
            options = this.getHintOptions()

            if(options){
                htmlString = htmlString + new PreviewHint(options).DOMElement()
            }

        }

        return htmlString
    }
    this.targetAttributeValue_DOMElement = function(){
        var htmlString = ""
        var options = {}

        if(this.targetAttributeValueIsValid()){
            //OBJECT ID DISPLAY ELEMENT WILL DEPEND ON THE OBJECT TYPE
            var inputFunction = this.getDOMElementFunction('targetAttributeValue', this.targetAttributeValue)
            if( inputFunction ){
                options = this.getPreviewInputOptions('targetAttributeValue', this.targetAttributeValue)
                //IF THERE IS A INPUT FUNCTION FOR THE CURRENT OBJECT TYPE
                htmlString = htmlString + new PreviewInput(options).DOMElement()
                // htmlString = htmlString + eval(inputFunction)
            }
            else{
                //IF THERE IS NO INPUT FUNCTION
                options = this.getPreviewObjectOptions('targetAttributeValue', this.targetAttributeValue)

                htmlString = htmlString + new PreviewObject(options).DOMElement()
            }
        }
        else{
            options = this.getHintOptions()

            if(options){
                htmlString = htmlString + new PreviewHint(options).DOMElement()
            }

        }

        return htmlString
    }
    this.addAnotherActionButton_DOMElement = function(){
        var htmlString =
            "<button type='button' class='btn btn-xs btn-success addAnotherActionButton'>" +
            "   <i class='fa fa-plus' aria-hidden='true'></i>" +
            "   " +
            "</button> "

        return htmlString
    }
    this.removeThisActionButton_DOMElement = function(){
        var htmlString =
            "<button type='button' class='btn btn-xs btn-danger removeThisActionButton'>" +
            "   <i class='fa fa-minus' aria-hidden='true'></i>" +
            "   " +
            "</button> "

        return htmlString
    }

    //PREVIEW OBJECT INPUT FUNCTIONS
    this.rateSheetVariableDropdown_DOMElement = function(){
        var htmlString = "" +
            "<select class='logicPreviewInput' data-class='" + this.constructor.name + "' data-property='targetAttributeName_Value' >" +
            "<option value='invalid'>Select Variable Name</option>"


        //GET RULE ID OF THIS ACTION OBJECT
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id

        var variableMap = rulesDataModelObject.getRuleSet(ruleSetID).variables
        var variableMapKeys = Object.keys(variableMap)

        for(var i=0;i<variableMapKeys.length;i++) {
            var variableID = variableMapKeys[i]
            var variableObj = variableMap[variableID]
            var selectedText = ""
            if( this.targetAttributeNameIsValid() && variableObj.name === this.targetAttributeName_Value ){
                selectedText = 'selected'
            }

            htmlString = htmlString +
                "<option value='" + variableObj.name + "' " + selectedText + ">" + variableObj.name + "</option>"
        }

        htmlString = htmlString +
            "</select>"

        return htmlString
    }
    this.rateSheetVariableValueInput_DOMElement = function(){
        //THIS INPUT DEPENDS ON THE QUESTION ID CHOSEN

        var variableName = this.targetAttributeName_Value
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        var variableObject = rulesDataModelObject.getRuleSetVariableByName(variableName, ruleSetID)
        var htmlString = ""


        htmlString = htmlString +
            "<input class='form-control logicPreviewInput' type='text' " +
            "data-class='" + this.constructor.name + "' " +
            "data-property='targetAttributeValue_Value' " +
            "value='" + this.targetAttributeValue_Value.replace(/(['"])/g, "&quot;") + "'" +

            ">"


        return htmlString

    }
    this.limitDescriptionDropdown_DOMElement = function(){
        var ruleSetObject = rulesDataModelObject.getRuleSet(RATESHEETWELL_DOMOBJECT.ruleSetObject.id)
        var htmlString = "" +
            "<select class='logicPreviewInput' data-class='" + this.constructor.name + "' data-property='targetAttributeName_Value' >" +
            "<option value='invalid'>Select Limit</option>"

        try{
            var productLimitArray = JSON.parse( getProductObjectByID(ruleSetObject.productID).limitArray )
            for(var i=0;i<productLimitArray.length; i++){
                var limitDescription = productLimitArray[i].limitDescription
                var selectedText = ""

                if(limitDescription === this.targetAttributeName_Value){
                    selectedText = "selected"
                }

                htmlString = htmlString +
                    "<option value='" + limitDescription + "' " + selectedText + ">" + limitDescription + "</option>"
            }

            htmlString = htmlString +
                "</select>"

            return htmlString
        }
        catch(e){
            return
                "<select class='logicPreviewInput' data-class='" + this.constructor.name + "' data-property='targetAttributeName_Value' >" +
                "   <option value='invalid'>No Limit Array</option>" +
                "</select>"
        }


    }
    this.limitDescriptionInput_DOMElement = function(){
        var htmlString = ""

        htmlString = htmlString +
            "<input class='form-control logicPreviewInput' type='text' " +
            "data-class='" + this.constructor.name + "' data-property='targetAttributeValue_Value' value='" + this.targetAttributeValue_Value + "'>"


        return htmlString
    }
    this.limitValueInput_DOMElement = function(){
        var htmlString = ""

        htmlString = htmlString +
            "<input class='form-control logicPreviewInput' type='text' " +
            "data-class='" + this.constructor.name + "' data-property='targetAttributeValue_Value' value='" + this.targetAttributeValue_Value + "'>"


        return htmlString
    }
    this.rateSheetRulesDropdown_DOMElement = function(){
        var htmlString = "" +
            "<select class='logicPreviewInput' data-class='" + this.constructor.name + "' data-property='targetAttributeName_Value' >" +
            "<option value='invalid'>Select Rule</option>"


        //GET RULE ID OF THIS ACTION OBJECT
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id

        var rulesArray = rulesDataModelObject.getRuleSet(ruleSetID).rules

        for(var i=0;i<rulesArray.length;i++) {
            var ruleObj = rulesArray[i]
            var ruleID = ruleObj.id

            if(PREVIEW_MODAL_DOMOBJECT.ruleID !== ruleID){
                var selectedText = ""

                if( this.targetAttributeNameIsValid() && ruleObj.id === this.targetAttributeName_Value ){
                    selectedText = 'selected'
                }

                htmlString = htmlString +
                    "<option value='" + ruleObj.id + "' " + selectedText + ">" + ruleObj.code + "-" + ruleObj.description + "</option>"
            }

        }

        htmlString = htmlString +
            "</select>"

        return htmlString
    }
    this.questionIDDropdown_DOMElement = function(){
        var htmlString = "" +
            "<select class='logicPreviewInput' data-class='" + this.constructor.name + "' data-property='targetAttributeName_Value' >" +
            "<option value='invalid' selected>Select Question ID</option>"

        for(var i=0;i<questions.length;i++){
            var selectedText = ""
            if(this.targetIDIsValid() && this.targetAttributeName_Value === questions[i].questionID){
                selectedText = 'selected'
            }

            htmlString = htmlString +
                "<option value='" + questions[i].questionID + "' " + selectedText + ">" +
                questions[i].questionID + "</option>"
        }

        htmlString = htmlString +
            "</select>"

        return htmlString
    }

    //DATA CLEAN UP
    this.cleanupData = function(){
        //THROUGH VALUES AND CHECK IF A REQUIRED MAP EXISTS
        var propertyNamesArray = this.getPropertyNames()

        for(var i=0;i<propertyNamesArray.length; i++){
            var propName = propertyNamesArray[i]
            var propValue = this[propName]

            //CHECK IF REQUIRED MAP EXISTS FOR THIS PROPERTY NAME AND VALUE
            if( this.getRequiredMap(propName, propValue) ){
                //CHECK IF REQUIREMENTS ARE MET

                if( this.checkIfRequirementMetForThisPropertyValue(propName, propValue) ){
                    //IF REQUIREMENTS ARE SATISFIED, DO NOTHING
                }
                else{
                    //IF REQUIREMENTS ARE NOT MET, RESET TO DEFAULT VALUE
                    this[propName] = this.getDefaultValueForProperty(propName)
                }
            }
        }


    }
    this.checkIfRequirementMetForThisPropertyValue = function(propertyName, id){
        var requiredMap = this.getRequiredMap(propertyName, id)

        if(requiredMap){
            if( this[requiredMap.propertyName] === requiredMap.propertyValue ){
                return true
            }
            else{
                return false
            }
        }
        else{
            return true
        }

    }

    //PREVIEW OBJECT AND HINT DATA FUNCTIONS
    this.getNextPropertyToFill = function(){
        if( !this.actionFunctionIsValid() ){
            return 'actionFunction'
        }
        else if( !this.targetIDIsValid() ){
            return 'targetID'
        }
        else if( !this.targetAttributeNameIsValid() ){
            return 'targetAttributeName'
        }
        else if( !this.targetAttributeName_ValueIsValid() ){
            return 'targetAttributeName_Value'
        }
        else if( !this.targetAttributeValueIsValid() ){
            return 'targetAttributeValue'
        }
        else{
            return 'complete'
        }

    }
    this.getPreviewObjectOptions = function(propertyName, propertyValue){
        var options = {
            bootstrapColorClass: this.getColorClass(propertyName, propertyValue),
            buttonText: this.getDisplayText(propertyName, propertyValue),
            class: this.constructor.name,
            property: propertyName,
            dropdownOptions: this.getDropdownOptionsForProperty(propertyName, propertyValue)
        }

        return options
    }
    this.getPreviewInputOptions = function(propertyName, propertyValue){
        var options = {
            bootstrapColorClass: this.getColorClass(propertyName, propertyValue),
            buttonText: this.getDisplayText(propertyName, propertyValue),
            class: this.constructor.name,
            property: propertyName,
            dropdownOptions: this.getDropdownOptionsForProperty(propertyName, propertyValue),
            inputDOMElement: eval(this.getDOMElementFunction(propertyName, propertyValue))
        }

        return options
    }
    this.getHintOptions = function(){
        var hintOptions = {
            buttonText: 'Button Text',
            dropdownOptions: []

        }

        var nextProperty = this.getNextPropertyToFill()
        hintOptions.buttonText = this.getHintButtonText(nextProperty)
        hintOptions.dropdownOptions = this.getDropdownOptionsForProperty(nextProperty)

        return hintOptions
    }
    this.getDropdownOptionsForProperty = function(propertyName){
        //RETURNS THE DROPDOWN OPTIONS NEEDED TO PASS INTO HINT OR PREVIEW OBJECT
        var dropdownOptions = []

        var optionIDS = this.getValidValues(propertyName)

        for(var i=0;i<optionIDS.length; i++ ){
            //CHECK IF THIS OPTION IS CURRENTLY ALLOWED
            if( this.checkIfRequirementMetForThisPropertyValue(propertyName, optionIDS[i])){
                var options = {
                    class: this.constructor.name,
                    property: propertyName,
                    propertyValue: optionIDS[i],
                    displayText: this.getDisplayText(propertyName, optionIDS[i])
                }

                dropdownOptions.push(options)
            }
        }

        return dropdownOptions
    }

    //VALIDATION
    this.actionFunctionIsValid = function(){
        if( this.actionFunction.trim().length > 0){
            return true
        }

        return false
    }
    this.targetIDIsValid = function(){
        if( this.targetID.trim().length > 0){
            return true
        }
        return false
    }
    this.targetAttributeNameIsValid = function(){
        if( this.targetAttributeName.trim().length > 0){
            return true
        }
        return false
    }
    this.targetAttributeName_ValueIsValid = function(){
        if( this.targetAttributeName_Value.trim().length > 0){
            return true
        }
        return false
    }
    this.targetAttributeValueIsValid = function(){
        if( this.targetAttributeValue.trim().length > 0){
            return true
        }
        return false
    }
    this.isValid = function(){
        if( this.actionFunctionIsValid() && this.targetIDIsValid() &&
            this.targetAttributeNameIsValid() && this.targetAttributeValueIsValid()){
            return true
        }
        else{
            return false
        }
    }

    //POTENTIAL OBJECT CLASS FUNCTIONS
    this.getConstantValuesForPropertyName = function(propertyName){
        return this.CONSTANT_VALUES[propertyName]
    }
    this.getColorClass = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].bootstrapColorClass
    }
    this.getDisplayText = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].displayText
    }
    this.getHintButtonText = function(propertyName){
        return this.getConstantValuesForPropertyName(propertyName).hintButtonText
    }
    this.getValidValues = function(propertyName){
        return Object.keys( this.getConstantValuesForPropertyName(propertyName).validValues )
    }
    this.getDOMElementFunction = function(propertyName, id){
        return this.getConstantValuesForPropertyName(propertyName).validValues[id].DOMElementFunction
    }
    this.getRequiredMap = function(propertyName, id){
        try{
            return this.getConstantValuesForPropertyName(propertyName).validValues[id].required
        }
        catch(e){
            return undefined
        }
    }
    this.getPropertyNames = function(){
        return Object.keys( this.CONSTANT_VALUES )
    }
    this.getDefaultValueForProperty = function(propertyName){
        return this.getConstantValuesForPropertyName(propertyName).defaultValue
    }

    //PLAIN ENGLISH FUNCTIONS
    this.getPlainEnglishTranslation = function(){
        var displayText = ""

        if(this.actionFunction === 'ask'){
            var questionID = this.targetAttributeName_Value
            displayText = displayText + getRateSheetRowPreviewQuestionHTML(questionID)

        }

        return displayText
    }


    //RUN FUNCTIONS
    this.run = function(status){
        if( this.actionFunction === 'ask' && this.targetID === 'questionID'){
            status = this.askQuestion(status)
        }
        else if( ( this.actionFunction === 'set' || this.actionFunction === 'change' ) && this.targetID === 'rateSheetVariable'){
            status = this.setVariableValue(status)
        }
        else if( ( this.actionFunction === 'change' ) && this.targetID === 'limit' && this.targetAttributeName === 'limitValue'){
            status = this.changeLimitValue(status)
        }

        return status
    }
    this.askQuestion = function(status){
        var questionID = this.targetAttributeName_Value
        var runResultQuestionObject = {
            questionID: questionID
        }

        //ADD QUESTION TO REQUIRED QUESTION ARRAY
        if( searchArrayForObjectWithKey(status.rulesResults[status.rulesResults.length-1].requiredQuestions, 'questionID', questionID) === undefined ){
            status.rulesResults[status.rulesResults.length - 1].requiredQuestions.push(runResultQuestionObject)
        }

        return status
    }
    this.setVariableValue = function(status){
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        var variableName = this.targetAttributeName_Value

        rulesDataModelObject.setRuleSetVariableValue_ByName(ruleSetID, variableName, this.targetAttributeValue_Value)
    }
    this.changeLimitValue = function(status){
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        var productID = rulesDataModelObject.getProductID(ruleSetID)

        var limitDescription = this.targetAttributeName_Value
        var newLimitValue = this.targetAttributeValue_Value

        //LOOK FOR LIMIT ROW WITH DESCRIPTION
        // $(".limitValue." + productID + "_LimitRow_LimitValue[data-limitdescription='" + limitDescription + "'").html(newLimitValue)
        var limitArray = JSON.parse( RULESETEXECUTOR_DOMOBJECT.productObj.limitArray )

        for(var i=0;i<limitArray.length;i++){
            var limitMap = limitArray[i]
            if( limitMap.limitDescription === limitDescription ){
                limitMap.limitAmount = newLimitValue
            }
        }

        RULESETEXECUTOR_DOMOBJECT.productObj.limitArray =  JSON.stringify(limitArray)


    }
}

function RuleSetExecutor(options){
    this.ruleSetObject = (options && options.ruleSetObject ? options.ruleSetObject : undefined)
    this.currentQuestions = (options && options.currentQuestions ? options.currentQuestions : [])
    this.productObj = (options && options.ruleSetObject ? options.ruleSetObject : undefined)
    this.testInProgress = false
    this.currentRunResults = {}

    //TEST FUNCTIONS
    this.startTest = function(options){
        this.ruleSetObject = RATESHEETWELL_DOMOBJECT.ruleSetObject
        this.testInProgress = true
        this.productObj = getProductObjectByID(rulesDataModelObject.getProductID(RATESHEETWELL_DOMOBJECT.ruleSetObject.id))

        this.runRuleSet()

        RATESHEETWELL_DOMOBJECT.redraw()
    }
    this.stopTest = function(options){
        this.testInProgress = false
        this.currentRunResults = {}

        RATESHEETWELL_DOMOBJECT.redraw()

    }

    //RUN FUNCTIONS
    this.runRuleSet = function(options){
        if(options && options.ruleSetObject){
            this.ruleSetObject = options.ruleSetObject
        }

        var status = {
            runStatus: true,
            message: '',
            rulesResults: [],
            lastRuleID: ''
        }

        //SAVE CURRENT QUESTIONS AND ANSWERS
        this.currentQuestions = this.getCurrentQuestionsAndAnswers( {mode:'test'} )

        var runStatus = this.ruleSetObject.run(status)
        this.currentRunResults = runStatus

        //LOOP THROUGH RESULTS
        if(runStatus.rulesResults.length > 0){
            //CLEAR SAVED QUESTIONS
            var newQuestionsArray = []
            for(var i=0;i<runStatus.rulesResults.length;i++){
                var ruleRunResult = runStatus.rulesResults[i]
                var missingQuestionIDS = ruleRunResult.missingQuestions
                var requiredQuestions = ruleRunResult.requiredQuestions


                //RE ADD ALL REQUIRED QUESTIONS THAT ARE STILL REQUIRED
                for(var j=0;j<requiredQuestions.length;j++){
                    var questionID = requiredQuestions[j].questionID

                    //SEARCH PREVIOUSLY EXISTING QUESTIONS TO FIND THE PREVIOUS QUESTION ANSWER
                    var searchQuestionObj = searchArrayForObjectWithKey(this.currentQuestions, 'questionID', questionID)

                    //SEARCH THE NEW QUESTION ARRAY TO SEE IF IT WAS ALREADY ADDED
                    var newQuestionsSearchObj = searchArrayForObjectWithKey(newQuestionsArray, 'questionID', questionID)


                    if( newQuestionsSearchObj === undefined){
                        var questionObject = {
                        questionID: questionID,
                        answer: ''
                        }

                        if(searchQuestionObj){
                            questionObject.answer = searchQuestionObj.answer
                        }

                        newQuestionsArray.push(questionObject)
                    }
                }
            }

            //REFRESH QUESTIONS
            this.currentQuestions = newQuestionsArray

        }

        RATESHEETWELL_DOMOBJECT.redraw()
    }

    this.getCurrentQuestionsAndAnswers = function(options){
        var questionIDArray = []
        var questionsContainerElement = ''
        if(options.mode === 'test'){
            questionsContainerElement = '.rateSheetInputsContainer'
        }
        else if(options.mode === 'newSubmission'){
            questionsContainerElement = ''
        }

        $(questionsContainerElement).find('.requiredQuestion').each(function(){
            var questionID = $(this).attr('data-questionid')
            var questionObject = {
                questionID: questionID,
                answer: RULESETEXECUTOR_DOMOBJECT.getQuestionValue(questionID)
            }
            questionIDArray.push( questionObject )
        })

        return questionIDArray
    }
    this.isQuestionExist = function(questionID){
        // if( $('.requiredQuestion.ruleBuilderQuestion.' + questionID ).length > 0 ){
        //     return true
        // }
        // else{
        //     return false
        // }
        if( searchArrayForObjectWithKey(this.currentQuestions, 'questionID', questionID) !== undefined){
            return true
        }
        else{
            return false
        }
    }
    this.getQuestionValue = function(questionID){
        var questionContainer = $("div.requiredQuestion[data-questionid='" + questionID + "']")
        var questionAnswer = ""

        $(questionContainer).find('input,select').each(function(){
            if($(this).attr('type') === 'radio'){
                if($(this).is(':checked')){
                    questionAnswer = $(this).val()
                }
                else{

                }
            }
            else if($(this).attr('type') === 'checkbox'){
                if($(this).is(':checked')){
                    questionAnswer = questionAnswer + $(this).val() + ", "
                }
                else{

                }
            }
            else{
                questionAnswer = $(this).val()
            }
        })


        if(questionAnswer.trim().length === 0){
            questionAnswer = undefined
        }

        return questionAnswer
    }
    this.redrawQuestions = function(options){
        RATESHEETWELL_DOMOBJECT.redraw()
    }

}


//DOM ELEMENT CLASSES
function RateSheetWell(options){
    //CONSTANTS
    this.tableColumnValues = [
        {
            id: 'rowNum',
            text: '#',
            width: '1'
        },
        {
            id: 'code',
            text: 'Code',
            width: '1'
        },
        {
            id: 'description',
            text: 'Description',
            width: '3'
        },
        {
            id: 'premiumLogic',
            text: 'premiumLogic',
            width: '5'
        },
        {
            id: 'buttonColumn',
            text: '',
            width: '2'
        },
    ]

    this.rateSheetWellContainer = $('#rateSheet_StateChosen')
    this.ruleSetObject = (options && options.ruleSetObject ? options.ruleSetObject : undefined)

    this.setRuleSetObject = function(ruleSetID){
        this.ruleSetObject = rulesDataModelObject.getRuleSet(ruleSetID)
    }

    //DOM ELEMENTS
    this.DOMElement = function(){
        var htmlString = "" +
            this.buttonRow_DOMElement() +
            this.rateSheetVariables_DOMElement() +
            this.tableHeader_DOMElement() +
            this.rateSheetWell_DOMElement() +
            new RateSheeTestWell( {
                ruleSetObject: this.ruleSetObject,
                ruleSetExecutorObject: RULESETEXECUTOR_DOMOBJECT
            }).DOMElement()

        return htmlString
    }
    this.productIDDropdown_DOMElement = function(){
        var htmlString = "" +
            "<select class='form-control' id='rateSheetProductDropdown' >" +
            "   <option value='invalid' selected>Select Product ID</option>"

        for(var i=0;i<products.length;i++){
            if(products[i].coverage === this.ruleSetObject.covID){
                var selectedText = ""
                if( this.ruleSetObject.productID === products[i].productID){
                    selectedText = 'selected'
                }

                htmlString = htmlString +
                    "<option value='" + products[i].productID + "' " + selectedText + ">" +
                    products[i].productID + "</option>"
            }
        }

        htmlString = htmlString +
            "</select>"

        return htmlString
    }
    this.rateSheetVariables_DOMElement = function(){
        var htmlString =
            "<div class='row'> " +
            "   <div class='col-xs-6' id='rateSheetVariablesContainer'> "

        if(this.ruleSetObject.getVariableIDSArray().length === 0){
        }
        else{
            //LOOP THROUGH VARIABLES AND CREATE ELEMENTS FOR EACH
            var variableIDArray = this.ruleSetObject.getVariableIDSArray()

            for(var i=0;i<variableIDArray.length;i++){
                htmlString = htmlString + this.ruleSetObject.variables[variableIDArray[i]].DOMElement()
            }
        }

        htmlString = htmlString +
            "   </div> " +
            "</div> " +
            "<br>"

        return htmlString
    }
    this.buttonRow_DOMElement = function(){
        var htmlString =
            "<div class='row'> " +
            "   <div class='col-xs-6'>" +
            "       " + this.productIDDropdown_DOMElement() +
            "   </div>" +
            "   <div class='col-xs-6'> " +
            "       <button class='btn btn-sm btn-primary pull-right addRatedPremiumButton' style=''> " +
            "           <i class='fa fa-plus'></i> Add Rate Code " +
            "       </button> " +
            "       <button class='btn btn-sm btn-primary pull-right addRateSheetVariableButton' style=''> " +
            "           <i class='fa fa-plus'></i> Add Variable " +
            "       </button> " +
            "       <button class='btn btn-sm btn-primary pull-right' style=''> " +
            "           <i class='fa fa-copy'></i> Copy Current to Other States " +
            "       </button> " +
            "   </div> " +
            "</div> " +
            "<br>"

        return htmlString
    }
    this.tableHeader_DOMElement = function(){
        var htmlString =
            "<div class='row rateSheetRowsHeader'> "

        var columnIDArray = this.getTableColumnIDSArray()
        for(var i=0;i<columnIDArray.length;i++){
            var columnID = columnIDArray[i]

            var width = this.getTableColumnWidth(columnID)
            var text = this.getTableColumnText(columnID)

            htmlString = htmlString +
                "<div class='col-xs-" + width + "'>" +
                "   <label>" + text + "</label>" +
                "</div>"
        }

        htmlString = htmlString +
            "</div> "

        return htmlString
    }
    this.rateSheetWell_DOMElement = function(){
        var htmlString = "" +
            "<div class='row' id='rateSheetRowsContainer'> " +
            "   <div class='col-xs-12 rowContainer' id='mainRateSheetRows'> " +
            this.ruleSetObject.rateCodeRows_DOMElement() +
            "   </div> " +
            "</div>"

        return htmlString
    }
    this.newRuleRowPlaceholder_DOMElement = function(options){
        var insertAfterIndex = (options && options.insertAfterIndex ? options.insertAfterIndex : 0)

        var htmlString = "" +
            "<div class='row placeHolderRow' style='margin-top: 24px; margin-bottom: 18px;' " +
            "   data-insertafterindex='" + insertAfterIndex + "'" +
            "   data-rulesetid='" + this.code + "'" +
            ">" +
            "   <div class='col-xs-1'>" +
            "       <label>New Rule</label>" +
            "   </div>" +
            "   <div class='col-xs-1'>" +
            "           <input class='form-control input-xs newRule_codeInput' type='text'>" +
            "   </div>" +
            "   <div class='col-xs-3'>" +
            "           <input class='form-control input-xs newRule_descriptionInput' type='text'>" +
            "   </div>" +
            "   <div class='col-xs-2'>" +
            "       <button type='button' class='btn btn-xs btn-danger rulePlaceholderRowCancelButton' style='font-size:9px'>" +
            "            <i class='fa fa-times' aria-hidden='true'></i>" +
            "       </button>" +
            "       <button type='button' class='btn btn-xs btn-success rulePlaceholderRowSubmitButton' style='font-size:9px'>" +
            "            <i class='fa fa-check' aria-hidden='true'></i>" +
            "       </button>" +
            "   </div>" +
            "</div>"

        return htmlString

    }

    //REDRAW/REFRESH FUNCTIONS
    this.redraw = function(){
        $('#rateSheet_StateChosen').html( this.DOMElement() )
    }
    this.addNewRulePlaceHolderRow = function(buttonClicked){
        var buttonClickedRow = $(buttonClicked).closest('.rateSheetRow')
        var buttonClickedRowIndex = $(buttonClicked).closest('.rateSheetRow').index()

        //ADD PLACEHOLDER ROW AFTER THE CLICKED ROW
        $(buttonClickedRow).after( this.newRuleRowPlaceholder_DOMElement({insertAfterIndex: buttonClickedRowIndex}))
    }

    //DOM LISTENER FUNCTIONS
    this.validateNewRule = function(){

    }
    this.saveNewRule = function (submitButton){
        var placeHolderRuleElement = $(submitButton).closest('.placeHolderRow')
        var index = $(placeHolderRuleElement).attr('data-insertafterindex')
        var code = $(placeHolderRuleElement).find('.newRule_codeInput').val()
        var description = $(placeHolderRuleElement).find('.newRule_descriptionInput').val()
        var company = $('#rateSheetCompanyInput').val()
        var state = getSelectedRateSheetState()
        var coverage = $('#rateSheetCoverageIDInput').val()
        var rateCodeID = code + "_" + company + "_" + generateUniqueID()


        if(rateCodeID.length === 0 || code.length === 0 || company === 'invalid' || state === 'invalid' || coverage === 'invalid' || description.length === 0){
            alert("Complete All Fields")
        }
        else{
            setFooterStatusSaving()
            $.ajax({
                method: "POST",
                url: "/Admin/createRateCode",
                data: {
                    rateCodeID: rateCodeID,
                    code: code,
                    company: company,
                    state: state,
                    coverage: coverage,
                    description: description
                }
            })
                .done(function(msg) {
                    if(msg === "Success"){
                        setFooterStatusUpToDate()
                        RATESHEETWELL_DOMOBJECT.refreshRateCodeAfterSave(rateCodeID, index)
                    }
                    else if(msg === "Error"){
                        setFooterStatusSaveError()
                        alert("Error Saving")
                    }
                    else{
                        setFooterStatusSaveError()
                        alert(msg)
                    }
                });
        }

    }
    this.refreshRateCodeAfterSave = function(rateCodeID, index){
        $.ajax({
            method: "POST",
            url: "/Admin/refreshRateCodes",
            data: {
            }
        })
            .done(function(msg) {
                if(msg === "Error"){
                    console.log("Error: refreshRates")
                }
                else{
                    rateCodes = jsonStringToObject(msg)
                    //ADD NEW RULE TO CURRENT RULESET
                    var newRateCodeObj = getRateCodeObjectByID(rateCodeID.toUpperCase())
                    newRateCodeObj = jQuery.extend(true, {}, newRateCodeObj)
                    newRateCodeObj.id = generateUniqueID()
                    if(newRateCodeObj){
                        var ruleObject = new Rule(newRateCodeObj)
                        rulesDataModelObject.addRule(RATESHEETWELL_DOMOBJECT.ruleSetObject.id, parseInt(index)+1, ruleObject)
                        RATESHEETWELL_DOMOBJECT.redraw()
                    }
                }
            });
    }
    this.cancelAddNewRule = function(){
        RATESHEETWELL_DOMOBJECT.redraw()
    }
    this.saveNewVariable = function(submitButton){
        var ruleSetVariableContainer = $(submitButton).closest('.ruleSetVariableContainer')
        var variableID = $(ruleSetVariableContainer).attr('data-id')

        var type = $(ruleSetVariableContainer).find('.ruleSetVariableType').val()
        var name = $(ruleSetVariableContainer).find('.ruleSetVariableName').val()
        var value = $(ruleSetVariableContainer).find('.ruleSetVariableValue').val()

        var variableObj = rulesDataModelObject.getRuleSetVariable(variableID, this.ruleSetObject.id)
        variableObj.type = type
        variableObj.name = name
        variableObj.value = value

        RATESHEETWELL_DOMOBJECT.redraw()
    }
    this.cancelNewVariable = function(cancelButton){
        var ruleSetVariableContainer = $(cancelButton).closest('.ruleSetVariableContainer')
        var variableID = $(ruleSetVariableContainer).attr('data-id')

        rulesDataModelObject.removeRuleSetVariable(variableID, this.ruleSetObject.id)

        //HIDE VARIABLE INPUTS
        RATESHEETWELL_DOMOBJECT.redraw()
    }
    this.deleteRuleFromRuleSet = function(deleteButton){
        var ruleID = $(deleteButton).closest('.rateSheetRow').attr('data-id')
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        rulesDataModelObject.removeRule(ruleID, ruleSetID)

        this.redraw()
    }
    this.shiftRuleUp = function(upButton){
        var ruleID = $(upButton).closest('.rateSheetRow').attr('data-id')
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        var currentIndex = parseInt( $(upButton).closest('.rateSheetRow').index() )
        var moveToIndex = parseInt( currentIndex - 1)

        rulesDataModelObject.moveRuleTo(ruleID, ruleSetID,  moveToIndex)

        this.redraw()

    }
    this.shiftRuleDown = function(downButton){
        var ruleID = $(downButton).closest('.rateSheetRow').attr('data-id')
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        var currentIndex = parseInt( $(downButton).closest('.rateSheetRow').index() )
        var moveToIndex = parseInt( currentIndex + 1)

        rulesDataModelObject.moveRuleTo(ruleID, ruleSetID,  moveToIndex)

        this.redraw()
    }
    this.productIDDropdownChange = function(dropdown){
        var productID = $(dropdown).val()
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id

        if(productID !== 'invalid'){
            rulesDataModelObject.setProductID(productID, ruleSetID)
        }

        this.redraw()
    }
    this.covIDDropdownChange = function(dropdown){
        var covID = $(dropdown).val()
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id

        if(covID !== 'invalid'){
            rulesDataModelObject.setCovID(covID, ruleSetID)
        }

        this.redraw()
    }
    this.expandRateSheetRow = function(button){
        //HIDE EXPAND BUTTON
        $(button).css('display', 'none')

        //SHOW MINIMIZE BUTTON
        $(button).siblings('.compressPremiumLogicDisplayButton').css('display', '')

        //INCREASE ROW HEIGHT
        $(button).closest('.rateSheetRow').css('max-height', '10000px')
    }
    this.compressRateSheetRow = function(button){
        //HIDE COMPRESS BUTTON
        $(button).css('display', 'none')

        //SHOW EXPAND BUTTON
        $(button).siblings('.expandPremiumLogicDisplayButton').css('display', '')

        //INCREASE ROW HEIGHT
        $(button).closest('.rateSheetRow').css('max-height', '22px')
    }

    //UTIL
    this.getTableColumnIDSArray = function(){
        var tableColumnIDArray = []
        for(var i=0;i<this.tableColumnValues.length; i++){
            tableColumnIDArray.push( this.tableColumnValues[i].id )
        }

        return tableColumnIDArray
    }
    this.getTableColumnInfoMap = function(columnID){
        return searchArrayForObjectWithKey(this.tableColumnValues, 'id', columnID)
    }
    this.getTableColumnWidth = function(columnID){
        return this.getTableColumnInfoMap(columnID).width
    }
    this.getTableColumnText = function(columnID){
        return this.getTableColumnInfoMap(columnID).text
    }


}
function RateSheeTestWell(options){
    this.ruleSetObject = (options && options.ruleSetObject ? options.ruleSetObject : undefined)
    this.executorObject = (options && options.ruleSetExecutorObject ? options.ruleSetExecutorObject : undefined)

    this.DOMElement = function(){
        var htmlString = "" +
            "<div id='rateSheetTestContainer' style='margin-top:20px;'>" +
            "   <div class='row'>" +
            "       <div class='col-xs-12'>" +
            "           <h5>Test Rate Sheet</h5>" +
            "       </div>" +
            "   </div>"

        if(this.executorObject.testInProgress === true){
            htmlString = htmlString +
                this.runningTestButtonGroup_DOMElement() +
                this.rateSheetInputsContainer_DOMElement() +
                this.rateSheetTestLimitsDeductsContainer_DOMElement()
        }
        else{
            htmlString = htmlString + this.startTestButton_DOMElement()
        }

        htmlString = htmlString +
            "</div>"

        return htmlString
    }
    this.startTestButton_DOMElement = function(){
        var htmlString = "" +
            "<div class='row'>" +
            "   <div class='col-xs-12'>" +
            "       <button type='button' class='btn btn-xs btn-success rateSheetTestStartButton' style='font-size:12px'>" +
            "            <i class='fa fa-play' aria-hidden='true'></i>" + " Test Rate Sheet "
            "       </button>" +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.runningTestButtonGroup_DOMElement = function(){
        var htmlString = "" +
            "<div class='row'>" +
            "   <div class='col-xs-12'>" +
            "       <button type='button' class='btn btn-xs btn-success rateSheetNextStepButton' style='font-size:12px'>" +
            "            <i class='fa fa-step-forward' aria-hidden='true'></i>" + " Next Step " +
            "       </button>" +
            "       <button type='button' class='btn btn-xs btn-danger rateSheetStopTestButton' style='font-size:12px'>" +
            "            <i class='fa fa-stop' aria-hidden='true'></i>" + " Stop Test " +
            "       </button>" +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.rateSheetInputsContainer_DOMElement = function(){
        var htmlString = "" +
            "<div class='row'>" +
            "   <div class='col-xs-8 rateSheetInputsContainer'>"


        // var questionIDArray = this.getQuestionIDSForRuleSet_AllPossible()
        var questionObjectArray = RULESETEXECUTOR_DOMOBJECT.currentQuestions

        for(var i=0;i<questionObjectArray.length;i++){
            var questionID = questionObjectArray[i].questionID
            var questionAnswer = questionObjectArray[i].answer

            htmlString = htmlString + getRateSheetTestQuestionHTML(questionID, questionAnswer)
        }

        htmlString = htmlString +
            "   </div>" +
            "   <div class='col-xs-4 rateSheetTestVariablesContainer'>" +
                    this.rateSheetTestVariables_DOMElement() +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.rateSheetTestVariables_DOMElement = function(){
        var htmlString = ""

        if(this.ruleSetObject.getVariableIDSArray().length === 0){
        }
        else{
            //LOOP THROUGH VARIABLES AND CREATE ELEMENTS FOR EACH
            var variableIDArray = this.ruleSetObject.getVariableIDSArray()

            for(var i=0;i<variableIDArray.length;i++){

                htmlString = htmlString +
                    "<div class='col-xs-12'>" +
                    "   <span style='font-weight:500'>" + this.ruleSetObject.variables[variableIDArray[i]].name + ": </span>" +
                    "   <span>" + this.ruleSetObject.variables[variableIDArray[i]].value + "</span>"



                if(this.ruleSetObject.variables[variableIDArray[i]].type === 'formula'){
                    htmlString = htmlString +
                        "   <span style='font-weight:500'> = " + this.ruleSetObject.variables[variableIDArray[i]].evalFormula() + "</span>"

                }

                htmlString = htmlString +
                    "</div>"
            }
        }

        return htmlString
    }
    this.rateSheetTestLimitsDeductsContainer_DOMElement = function(){
        //TODO: CREATE LIMIT CHANGING ACTION FUNCTION
        var htmlString =
            "<div class='row' style='margin-top:30px;'>" +
            "   <div class='col-xs-6'>" +
                    this.rateSheetLimits_DOMElement() +
            "   </div>" +
            "   <div class='col-xs-6'>" +
            this.rateSheetDeducts_DOMElement() +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.rateSheetLimits_DOMElement = function(){
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        var productID = rulesDataModelObject.getProductID(ruleSetID)
        var productObj = RULESETEXECUTOR_DOMOBJECT.productObj

        var limitArray = JSON.parse( productObj.limitArray)
        var htmlString = ""

        for(var i=0;i<limitArray.length;i++){
            var limitMap = jsonStringToObject( limitArray[i] )
            var limitDescription = limitMap.limitDescription
            var limitAmount = limitMap.limitAmount

            //CHECK IF THERE IS A ACTION THAT HAS CHANGED THE LIMIT BEFORE REDRAWING


            htmlString = htmlString +
                "<div class='row limitRow " + productID + "_LimitRow' data-limitdescription='" + limitDescription + "'>" +
                "   <div class='col-xs-4'>" +
                "       <span class='limitValue " + productID + "_LimitRow_LimitValue' " +
                "           data-limitdescription='" + limitDescription + "'>" + limitAmount + "</span>" +
                "   </div>" +
                "   <div class='col-xs-8'>" +
                "       <span class='limitDescription " + productID + "_LimitRow_LimitDescription' " +
                "           data-limitdescription='" + limitDescription + "'>" + limitDescription + "</span>" +
                "   </div>" +
                "</div>"
        }

        return htmlString
    }
    this.rateSheetDeducts_DOMElement = function(){
        var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
        var productID = rulesDataModelObject.getProductID(ruleSetID)
        var productObj =  RULESETEXECUTOR_DOMOBJECT.productObj

        var deductArray = JSON.parse( productObj.deductArray)
        var htmlString = ""

        for(var i=0;i<deductArray.length;i++){
            var deductMap = jsonStringToObject( deductArray[i] )
            var deductDescription = deductMap.deductDescription
            var deductAmount = deductMap.deductAmount

            htmlString = htmlString +
                "<div class='row deductRow " + productID + "_DeductRow' data-deductdescription='" + deductDescription + "'>" +
                "   <div class='col-xs-4'>" +
                "       <span class='deductValue " + productID + "_DeductRow_DeductValue' " +
                "           data-deductdescription='" + deductDescription + "'>" + deductAmount + "</span>" +
                "   </div>" +
                "   <div class='col-xs-8'>" +
                "       <span class='deductDescription " + productID + "_DeductRow_DeductDescription' " +
                "           data-deductdescription='" + deductDescription + "'>" + deductDescription + "</span>" +
                "   </div>" +
                "</div>"
        }

        return htmlString
    }


    this.redraw = function(){
        $('#rateSheet_StateChosen').html( this.DOMElement() )
    }

    //QUESTION FUNCTIONS
    this.getQuestionIDSForRuleSet_AllPossible = function(){
        //LOOP THROUGHN ALL RULES IN THE RULE SET
        var questionIDArray = []
        var thisRulesArray = this.ruleSetObject.rules

        for(var i=0;i<thisRulesArray.length;i++){
            var thisRule = thisRulesArray[i]

            var thisRuleConditionsArray = thisRule.conditions

            for(var j=0;j<thisRuleConditionsArray.length;j++){
                var thisCondition = thisRuleConditionsArray[j]

                questionIDArray = questionIDArray.concat( thisCondition.getQuestionIDS_AllPossible() )
            }
        }

        questionIDArray = filterArrayForDuplicates(questionIDArray)

        return questionIDArray
    }
}
function RateSheetVariable(options){
    //CREATE A SIMPLE USER FRIENDLY BUTTON OR INPUT FOR SETTING VARIBLE IDS AND VARIABLE NAMES
    this.variableObject = (options && options.variableObject ? options.variableObject : undefined )

    //DOM ELEMENTS
    this.DOMElement = function(){
        var htmlString = htmlString +
            ""

        return htmlString
    }
}

function AddRuleModal(options){
    this.modalContainer = $('#selectRateCodeModal')
    this.covID = (options && options.covID ? options.covID : '' )
    this.state =  (options && options.state ? options.state : '' )
    this.company = (options && options.company ? options.company : '' )

    this.DOMElement = function(){
        var htmlString = "" +
            "<div class='modal-dialog' role='document' style='width: 1000px;'> " +
            "   <div class='modal-content'> " +
                    this.modalHeader_DOMElement() +
                    this.modalBody_DOMElement() +
            "   </div> " +
            "</div> "


        return htmlString
    }
    this.modalHeader_DOMElement = function(){
        var htmlString = "" +
            "       <div class='modal-header'> " +
            "           <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button> " +
            "           <h4 class='modal-title'>Select Rate Code</h4> " +
            "       </div> "

        return htmlString
    }
    this.modalOptionsButtonRow = function(){
        var htmlString = "" +
            "<div class='row'>" +
            "   <div class='col-xs-12'>" +
            "       <button type='button' class='btn btn-sm btn-success' style='margin-left: 10px' onclick='createNewRateCodeModal()'>New Rate Code</button> " +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.modalBody_DOMElement = function(){
        var htmlString = "" +
            "       <div class='modal-body'> " +
                        this.modalOptionsButtonRow() +
            "           <div id='selectRateCodeModalBodyContainer' style='padding-top:10px; padding-bottom:10px;'> " +
                            this.modalRuleRowsHeader_DOMElement() +
                            this.modalRuleRows_DOMElement() +
            "           </div> " +
                        this.modalFooterButtonRow_DOMElement() +
            "       </div> "

        return htmlString
    }
    this.modalRuleRowsHeader_DOMElement = function(){
        var htmlString = "" +
            "<div class='row'> " +
            "   <div class='col-xs-1'> " +
            "       <label class=''> Select" +
            "       </label>" +
            "   </div> " +
            "   <div class='col-xs-1'>" +
            "       <label class=''> Rate Code" +
            "       </label>" +
            "   </div>" +
            "   <div class='col-xs-4'>" +
            "       <label class=''> Description" +
            "       </label>" +
            "   </div>" +
            "   <div class='col-xs-1'>" +
            "       <label class=''> Rate" +
            "       </label>" +
            "   </div>" +
            "   <div class='col-xs-1'>" +
            "       <label class=''> Premium" +
            "       </label>" +
            "   </div>" +
            "   <div class='col-xs-1'>" +
            "       <label class=''> Non Mod" +
            "       </label>" +
            "   </div>" +
            "   <div class='col-xs-1'>" +
            "       <label class=''> Flat" +
            "       </label>" +
            "   </div>" +
            "   <div class='col-xs-1'>" +
            "       <label class=''> How Processed" +
            "       </label>" +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.modalRuleRows_DOMElement = function(){
        var htmlString = ""

        for (var i = 0; i < rateCodes.length; i++) {
            if (this.state === rateCodes[i].state &&
                this.company === rateCodes[i].company &&
                this.covID === rateCodes[i].cov) {

                var rateCodeID = rateCodes[i].rateCodeID
                var rateCode = rateCodes[i].code
                var rateDescription = rateCodes[i].description
                var rateValue = rateCodes[i].rate
                var ratePremium = rateCodes[i].premium
                var rateFlatFlag = rateCodes[i].flat
                var rateNonModFlag = rateCodes[i].nonMod
                var rateHowProcessed = rateCodes[i].howProcessed

                var backgroundcolor = ""
                if (i % 2 === 0) {
                    backgroundcolor = "background-color: #8bdffb21;"
                }

                htmlString = htmlString +
                    "<div class='row addRateRow' style='" + backgroundcolor + "'> " +
                    "   <div class='col-xs-1'> " +
                    "       <label class='checkBoxLabel checkboxVerticalLayout'> " +
                    "           <input type='checkbox' class='addRateCheckbox' value='" + rateCodeID + "' id='" + rateCodeID + "_AddRateCheckbox'>" +
                    "       </label>" +
                    "   </div> " +
                    "   <div class='col-xs-1'>" +
                    "       <span>" + rateCode +
                    "       </span>" +
                    "   </div>" +
                    "   <div class='col-xs-4'>" +
                    "       <span>" + rateDescription +
                    "       </span>" +
                    "   </div>" +
                    "   <div class='col-xs-1'>" +
                    "       <span>" + rateValue +
                    "       </span>" +
                    "   </div>" +
                    "   <div class='col-xs-1'>" +
                    "       <span>" + ratePremium +
                    "       </span>" +
                    "   </div>" +
                    "   <div class='col-xs-1'>" +
                    "       <span>" + rateNonModFlag +
                    "       </span>" +
                    "   </div>" +
                    "   <div class='col-xs-1'>" +
                    "       <span>" + rateFlatFlag +
                    "       </span>" +
                    "   </div>" +
                    "   <div class='col-xs-1'>" +
                    "       <span>" + rateHowProcessed +
                    "       </span>" +
                    "   </div>" +
                    "</div>"


            }
        }

        return htmlString

    }
    this.modalFooterButtonRow_DOMElement = function(){
        var htmlString = "" +
            "           <div class='row'> " +
            "               <div class='col-xs-6'> " +
            "               </div> " +
            "               <div class='col-xs-6'> " +
            "                   <button type='button' class='btn btn-sm btn-primary pull-right' style='margin-left: 10px' onclick='addSelectedRateCodes()'>Add Selected</button> " +
            "                   <button type='button' class='btn btn-sm btn-primary pull-right' onclick='$('.modal').modal('hide')'>Cancel</button> " +
            "               </div> " +
            "           </div>"

        return htmlString
    }

    //VIEW ACTIONS
    this.openModal = function(){
        $(this.modalContainer).modal('show')
    }

    //REDRAW
    this.redraw = function(){
        this.covID = getRateSheetObjectByID( $('#rateSheetPage_RateSheetsDropdown').val() ).cov
        this.state = getSelectedRateSheetState()
        this.company = getRateSheetObjectByID( $('#rateSheetPage_RateSheetsDropdown').val() ).company

        $(this.modalContainer).html( this.DOMElement() )
    }

    //HELPER FUNCTIONS
}

function PreviewModal(options){
    this.previewModalContainer = $('#previewModalContentContainer')
    this.ruleSetID = (options && options.ruleSetID ? options.ruleSetID : undefined)
    this.ruleID = (options && options.ruleID ? options.ruleID : undefined)
    this.ruleObject = (options && options.ruleObject ? options.ruleObject : undefined)
    this.conditionsArray = []
    this.actionFunction = (options && options.id ? options.id : '' )

    //VIEW ELEMENTS
    this.DOMElement = function(){
        var htmlString = "" +
            this.previewModalHeader_DOMElement() +
            "<div class='modal-body' id='previewModalBodyContainer'>" + "" +
            "   <div class='row'>" +
            "       <div class='col-xs-10'>" +
                        this.previewModalTitle_DOMElement() +
                        this.previewModalRuleRows_DOMElement() +
            "       </div>"
            "       <div class='col-xs-2'>" +
            "       </div>" +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.previewModalHeader_DOMElement = function(){
        var htmlString = "" +
            "<div class='modal-header'> " +
            "   <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button> " +
            "   <h4 class='modal-title'>Rate Code: " + this.ruleObject.id+ "</h4> " +
            "</div>"
        return htmlString
    }
    this.previewModalTitle_DOMElement = function(){
        var htmlString = "" +
            "<h5 id='previewModalHeader'>What should this Rate Sheet Row do?</h5>"

        return htmlString
    }
    this.previewModalRuleRows_DOMElement = function(){
        var htmlString = "" +
            "<div class='well' id='logicBuilderRowsContainer' " +
            "   data-ruleid='" + this.ruleObject.id + "'" +
            "   data-class='Rule'" +
            "   data-property='this'" +
            ">"

        if(this.ruleObject && this.ruleObject.conditions.length > 0){
            var conditionObject
            for(var i=0;i<this.ruleObject.conditions.length; i++){
                conditionObject = this.ruleObject.conditions[i]
                htmlString = htmlString + conditionObject.DOMElement( {rowNum:i} )
            }

            //CHECK IF LAST CONDITION OBJECT IS COMPLETE/VALID. IF VALID THEN START A NEW ROW
            if( conditionObject.isValid() ){
                var newConditionObj = new Condition()
                rulesDataModelObject.addCondition(this.ruleSetID, this.ruleID, newConditionObj)
                htmlString = htmlString + newConditionObj.DOMElement( {rowNum:this.getNextRowNum()} )
            }
        }
        else{
            //IF NO CONDITIONS EXIST, INITIALIZE THE FIRST CONDITION
            var firstConditionObj = new Condition()
            rulesDataModelObject.addCondition(this.ruleSetID, this.ruleID, firstConditionObj)
            htmlString = htmlString + firstConditionObj.DOMElement( {rowNum: 0} )
        }


        htmlString = htmlString +
            "</div>"

        return htmlString
    }

    //VIEW LISTENERS
    this.previewObjectDropdownOptionClickAction = function(element){
        this.hintDropdownOptionClickAction(element)
    }
    this.hintDropdownOptionClickAction = function(element){
        var ruleSetID = this.findElementsRuleSetID(element)
        var ruleID = this.findElementsRuleID(element)
        var conditionID = this.findElementsConditionID(element)

        var targetClass = $(element).attr('data-class')
        var targetProperty = $(element).attr('data-property')
        var targetValue

        //IF THE CHANGED OBJECT WAS A INPUT
        if($(element).is('input, select')){
            targetValue = $(element).val()
        }
        else{
            targetValue = $(element).attr('data-propertyValue')
        }

        //GET THE CONDITION OBJECT THAT CORRESPONDS TO HINT CLICKED
        var conditionObj = rulesDataModelObject.getCondition(conditionID, ruleID, ruleSetID)
        if(targetClass === 'Condition'){
            conditionObj[targetProperty] = targetValue

            //CREATE A NEW BOOL EXPRESSION OBJECT IF THE BOOLEAN LOGIC ARRAY IS EMPTY
            if( conditionObj.booleanLogic.length === 0 && ( conditionObj.statement === 'if' || conditionObj.statement === 'ifElse') ){
                rulesDataModelObject.addBoolExpression(ruleSetID, ruleID, conditionID, new BoolExpression())
            }

            if(conditionObj.statement === 'always' || conditionObj.statement === 'else'){
                rulesDataModelObject.clearBooleanLogicArray(ruleSetID, ruleID, conditionID)

                if( conditionObj.booleanLogicIsValid() &&  conditionObj.actions.length === 0 ){
                    rulesDataModelObject.addAction(ruleSetID, ruleID, conditionID, new Action())
                }
            }
        }
        else if(targetClass === 'BoolExpression'){
            //TWO CASES
            //1. BOOL EXPRESSION OBJECT HASN'T BEEN CREATED YET
            //2. BOOL EXPRESSION OBJECT EXISTS
            var boolExpressionID = this.findElementsBoolExpressionID(element)
            var boolExpressionObj = rulesDataModelObject.getBoolExpression(boolExpressionID, conditionID,ruleID, ruleSetID)

            if(boolExpressionObj === undefined){
                rulesDataModelObject.addBoolExpression(ruleSetID, ruleID, conditionID, new BoolExpression())
            }

            boolExpressionObj[targetProperty] = targetValue

            //CREATE NEW ACTION OBJECT IF BOOL EXPRESSIONS IS NOW COMPLETE, AND IF ACTIONS ARRAY IS EMPTY
            if( conditionObj.booleanLogicIsValid() &&  conditionObj.actions.length === 0 ){
                rulesDataModelObject.addAction(ruleSetID, ruleID, conditionID, new Action())
            }
        }
        else if(targetClass === 'BoolOperator'){
            //TWO CASES
            //1. BOOL EXPRESSION OBJECT HASN'T BEEN CREATED YET
            //2. BOOL EXPRESSION OBJECT EXISTS
            var boolOperatorID = this.findElementsBoolOperatorID(element)
            var boolOperatorObj = rulesDataModelObject.getBoolObject(boolOperatorID, conditionID,ruleID, ruleSetID)

            if(boolOperatorObj === undefined){
                rulesDataModelObject.addBoolExpression(ruleSetID, ruleID, conditionID, new BoolOperator())
            }

            boolOperatorObj[targetProperty] = targetValue

            //CREATE A NEW BOOL EXPRESSION OBJECT IF THERE IS NO BOOL EXPRESSION AFTER THIS OPERATOR
            var thisIndex = rulesDataModelObject.getBoolObjectIndex(boolOperatorID, conditionID, ruleID, ruleSetID)
            var nextIndex = parseInt(thisIndex) + 1
            var boolObjectAtNextIndex = rulesDataModelObject.getBoolObject_AtIndex(nextIndex, conditionID, ruleID, ruleSetID)

            if(boolObjectAtNextIndex === undefined || boolObjectAtNextIndex.boolType !== 'BoolExpression'){
                rulesDataModelObject.addBoolExpression_AtIndex(ruleSetID, ruleID, conditionID, new BoolExpression(), nextIndex)
            }


            //CREATE NEW ACTION OBJECT IF BOOL EXPRESSIONS IS NOW COMPLETE, AND IF ACTIONS ARRAY IS EMPTY
            if( conditionObj.booleanLogicIsValid() &&  conditionObj.actions.length === 0 ){
                rulesDataModelObject.addAction(ruleSetID, ruleID, conditionID, new Action())
            }
        }
        else if(targetClass === 'Action'){
            var actionID = this.findElementsActionID(element)
            var actionObj = rulesDataModelObject.getAction(actionID, conditionID, ruleID, ruleSetID)
            var targetID = actionObj.targetID

            if(actionObj === undefined){
                rulesDataModelObject.addAction(ruleSetID, ruleID, conditionID, new Action())
            }

            if(actionObj.targetID === 'rateSheetVariable' && targetProperty === 'targetAttributeValue_Value'){
                //IF THIS IS A VARIABLE VALUE, NEED TO CHECK VALUE MATCHES TYPE
                var variableName = actionObj.targetAttributeName_Value
                var ruleSetID = RATESHEETWELL_DOMOBJECT.ruleSetObject.id
                var variableObj = rulesDataModelObject.getRuleSetVariableByName(variableName, ruleSetID)
                var type = variableObj.type

                if(type === 'number'){
                    if( isNaN(targetValue) ){
                        alert("Not a number")
                    }
                    else{
                        targetValue = parseFloat(targetValue)
                    }

                }
                else if(type === 'boolean'){
                    targetValue = (targetValue === 'true')
                }


            }

            actionObj[targetProperty] = targetValue
        }

        this.redrawPreviewModal()
    }
    this.addAnotherActionButtonClickAction = function(button){
        var conditionID = $(button).closest('.logicBuilderRow').attr('data-id')

        rulesDataModelObject.addAction(this.ruleSetID, this.ruleID, conditionID, new Action())
    }
    this.removeThisActionButtonClickAction = function(button){
        var conditionID = $(button).closest('.logicBuilderRow').attr('data-id')
        var actionID = $(button).closest('.condition_actions_action_ObjectContainer').attr('data-id')

        rulesDataModelObject.removeAction(this.ruleSetID, this.ruleID, conditionID, actionID)
    }
    this.addBoolExpressionButtonClickAction = function(button){
        var conditionID = $(button).closest('.logicBuilderRow').attr('data-id')
        var boolExpressionID = $(button).closest('.condition_booleanLogic_boolObject_ObjectContainer').attr('data-id')

        //ADD BOOL OPERATOR BEFORE ADDING NEW CONDITION
        var index = rulesDataModelObject.getBoolExpressionIndex(boolExpressionID, conditionID, this.ruleID, this.ruleSetID)
        var indexToInsert = parseInt(index) + 1

        rulesDataModelObject.addBoolOperator_AtIndex(this.ruleSetID, this.ruleID, conditionID, new BoolOperator(), indexToInsert)

    }
    this.removeBoolExpressionButtonClickAction = function(button){
        var conditionID = $(button).closest('.logicBuilderRow').attr('data-id')
        var boolExpressionID = $(button).closest('.condition_booleanLogic_boolObject_ObjectContainer').attr('data-id')

        rulesDataModelObject.removeBoolExpression(this.ruleSetID, this.ruleID, conditionID, boolExpressionID)
    }

    this.openModal = function(ruleID, parentRuleID){
        this.ruleID = ruleID
        this.ruleSetID = getSelectedRateSheetState()

        if(parentRuleID){
            //IF CONDITIONAL ROW
            this.ruleObject = rulesDataModelObject.getConditionalRule(this.ruleSetID, parentRuleID, ruleID)
        }
        else{
            //IF NOT CONDITIONAL ROW
            this.ruleObject = rulesDataModelObject.getRule(this.ruleID, this.ruleSetID)
        }

        this.redrawPreviewModal()
        $('#editRateCodeLogic').modal('show')
    }
    this.appendRowToPreview = function(newRuleRowElement){
        $('#logicBuilderRowsContainer').append( $(newRuleRowElement) )
    }
    this.redrawPreviewModal = function() {
        this.clearPreviewModal()

        $(this.previewModalContainer).html( this.DOMElement() )
    }
    this.clearPreviewModal = function() {
        $(this.previewModalContainer).html('')
    }
    this.formatConditionRows = function(){
        $('#logicBuilderRowsContainer').find('.logicBuilderRow').each(function(index){
            //RENUMBER ROW CORRECTLY
            $(this).find('.rowNumberSpan').html(index)

        })
    }
    this.getNextRowNum = function(){
        return $('#logicBuilderRowsContainer').find('.row.logicBuilderRow').length
    }

    //GETTING DATA FROM ELEMENTS
    this.findElementsRuleSetID = function(element){
        return getSelectedRateSheetState()
    }
    this.findElementsRuleID = function(element){
        return $('#logicBuilderRowsContainer').attr('data-ruleid')
    }
    this.findElementsConditionID = function(element){
        return $(element).closest('.logicBuilderRow').attr('data-id')
    }
    this.findElementsBoolExpressionID = function(element){
        return $(element).closest('.condition_booleanLogic_boolObject_ObjectContainer').attr('data-id')
    }
    this.findElementsBoolOperatorID = function(element){
        return $(element).closest('.condition_booleanLogic_boolObject_ObjectContainer').attr('data-id')
    }
    this.findElementsActionID = function(element){
        return $(element).closest('.condition_actions_action_ObjectContainer').attr('data-id')
    }

}
function PreviewRow(options){
    this.conditionObject = (options && options.conditionObject && options.conditionObject ? options.conditionObject  : '' )
    this.rowNum = (options && options.rowNum !== undefined ? options.rowNum : '' )
    this.class = 'Condition'
    this.property = 'this'

    this.DOMElement = function() {
        //THE VIEW REPRESENTATION OF A CONDITION OBJECT
        var htmlString = "" +
            "<div class='row logicBuilderRow' " +
            "   data-class='" + this.class + "' data-property='" + this.property + "' data-id='" + this.conditionObject.id + "' " +
            ">" +
            "   <div class='col-xs-1'>" +
            "       <span class='rowNumberSpan'>" + this.rowNum + "</span>" +
            "   </div>" +
            "   <div class='col-xs-11'>" +
            "       <div class='rulePreviewObjects' >"

        var nextProperty = this.conditionObject.getNextPropertyToFill()

        if(nextProperty === 'statement'){
            htmlString = htmlString + this.conditionObject.statement_DOMElement()
        }
        else if(nextProperty === 'booleanLogic'){
            htmlString = htmlString + this.conditionObject.statement_DOMElement()
            htmlString = htmlString + this.conditionObject.booleanLogic_DOMElement()
        }
        else if(nextProperty === 'actions'){
            htmlString = htmlString + this.conditionObject.statement_DOMElement()
            htmlString = htmlString + this.conditionObject.booleanLogic_DOMElement()
            htmlString = htmlString + this.conditionObject.actions_DOMElement()
        }
        else if(nextProperty === 'complete'){
            //IF 'COMPLETE' THEN NEW ROW NEEDS TO BE CREATED
            htmlString = htmlString + this.conditionObject.statement_DOMElement()
            htmlString = htmlString + this.conditionObject.booleanLogic_DOMElement()
            htmlString = htmlString + this.conditionObject.actions_DOMElement()
        }

        htmlString = htmlString +
            "       </div>" +
            "   </div>" +
            "</div>"

        return htmlString

    }

}
function PreviewObject(options){
    //MAKE THIS JUST A TEMPLATE CLASS. EACH DATA OBJECT WILL TAKE THE DOM ELEMENT AND CUSTOMIZE.
    //SO BASICALLY A PARENT CLASS FOR THE PREVIEW OBJECT, EACH OBJECT WILL DEFINE.
    this.class = (options ? options.constructor.name : '' ) //THE CLASS NAME OF THIS PREVIEW OBJECT
    this.property = (options && options.objectProperty ? options.objectProperty : '' ) //THE PROPERTY OF THE PREVIEW OBJECT
    this.bootstrapColorClass = (options && options.bootstrapColorClass ? options.bootstrapColorClass : 'default' )
    this.buttonText = (options && options.buttonText ? options.buttonText : '' )
    this.dropdownOptions = (options && options.dropdownOptions ? options.dropdownOptions : [] )

    this.DOMElement = function() {
        var htmlString = "" +
            "<div class='logicPreviewObjectContainer' " +
            "   data-class='" + this.class + "' data-property='" + this.property + "'" +
            ">" +
            "   <div class='btn-group logicPreviewObject'>" +
            "       <button type='button' class='btn btn-xs btn-" + this.bootstrapColorClass + " dropdown-toggle logicPreviewBtnGroupButton' " +
            "       data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                        this.buttonText + " <span class='caret'></span>" +
            "       </button>" +
            "       <ul class='dropdown-menu previewObjectDropdownMenu'>" +
            "       " + this.DOMElement_DropdownOptions() +
            "       </ul>" +
            "   </div>" +
            "</div>"

        return htmlString
    }

    this.DOMElement_DropdownOptions = function (){
        var optionHTML = ""

        for(var i=0;i<this.dropdownOptions.length; i++){
            optionHTML = optionHTML +
                "<li><a " +
                "   data-class='" + this.dropdownOptions[i].class + "' " +
                "   data-property='" + this.dropdownOptions[i].property + "'" +
                "   data-propertyvalue='" + this.dropdownOptions[i].propertyValue + "'" +
                ">" +
                this.dropdownOptions[i].displayText + "" +
                "</a></li>"
        }

        return optionHTML
    }
}
function PreviewInput(options){
    this.class = (options ? options.constructor.name : '' ) //THE CLASS NAME OF THIS PREVIEW OBJECT
    this.property = (options && options.objectProperty ? options.objectProperty : '' ) //THE PROPERTY OF THE PREVIEW OBJECT
    this.bootstrapColorClass = (options && options.bootstrapColorClass ? options.bootstrapColorClass : 'default' )
    this.buttonText = (options && options.buttonText ? options.buttonText : '' )
    this.dropdownOptions = (options && options.dropdownOptions ? options.dropdownOptions : [] )
    this.inputDOMElement = (options && options.inputDOMElement ? options.inputDOMElement : '' )

    this.DOMElement = function() {
        var htmlString = "" +
            "<div class='logicPreviewObjectContainer' " +
            "   data-class='" + this.class + "' data-property='" + this.property + "'" +
            ">" +
            "   <div class='btn-group logicPreviewInputContainer'>" +
            "       <button type='button' class='btn btn-xs btn-" + this.bootstrapColorClass + " dropdown-toggle logicPreviewBtnGroupButton' " +
            "       data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
            this.buttonText + " <span class='caret'></span>" +
            "       </button>" +
            "       <ul class='dropdown-menu previewObjectDropdownMenu'>" +
            "       " + this.DOMElement_DropdownOptions() +
            "       </ul>" +
            "       <div class='previewObjectInputContainer'>" +
                        this.inputDOMElement +
            "       </div>" +
            "   </div>" +
            "</div>"

        return htmlString
    }

    this.DOMElement_DropdownOptions = function (){
        var optionHTML = ""

        for(var i=0;i<this.dropdownOptions.length; i++){
            optionHTML = optionHTML +
                "<li><a " +
                "   data-class='" + this.dropdownOptions[i].class + "' " +
                "   data-property='" + this.dropdownOptions[i].property + "'" +
                "   data-propertyvalue='" + this.dropdownOptions[i].propertyValue + "'" +
                ">" +
                this.dropdownOptions[i].displayText + "" +
                "</a></li>"
        }

        return optionHTML
    }
}
function PreviewHint(options){
    //ARE THESE NECESSARY
    this.buttonText = (options && options.buttonText ? options.buttonText : 'Hint' )
    this.dropdownOptions = (options && options.dropdownOptions ? options.dropdownOptions :
            [{
                class: 'Condition',
                property: 'statement',
                optionText: 'Hint Example 1'
            }]
        )

    this.DOMElement = function (){
        var htmlString = "" +
            "<div class='logicPreviewObjectContainer'>" +
            "<div class='btn-group logicPreviewHintObject' data-type='" + "" + "'>" +
            "   <button type='button' class='btn btn-xs btn-default dropdown-toggle logicPreviewHint' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
            this.buttonText + " <span class='caret'></span>" +
            "   </button>" +
            "   <ul class='dropdown-menu previewHintDropdownMenu'>" +
            "       " + this.DOMElement_DropdownOptions() +
            "   </ul>" +
            "</div>" +
            "</div>"

        return htmlString
    }

    this.DOMElement_DropdownOptions = function (){
        var optionHTML = ""

        for(var i=0;i<this.dropdownOptions.length; i++){
            optionHTML = optionHTML +
                "<li><a " +
                "   data-class='" + this.dropdownOptions[i].class + "' " +
                "   data-property='" + this.dropdownOptions[i].property + "'" +
                "   data-propertyvalue='" + this.dropdownOptions[i].propertyValue + "'" +
                ">" +
                    this.dropdownOptions[i].displayText + "" +
                "</a></li>"
        }

        return optionHTML
    }

}
function PreviewDropdownOption(options){
    //TARGET IS THE OBJECT TO CHANGE WHEN THIS OPTION IS CHOSEN
    this.targetClass = (options && options.targetClass ? options.targetClass : '' )
    this.targetProperty = (options && options.property ? options.property : '' )
    this.targetPropertyValue = (options && options.propertyValue ? options.propertyValue : '' )
    this.optionText = (options && options.optionText ? options.optionText : '' )

    this.DOMElement = function (){
        var optionHTML = "" +
            "<li><a " +
            "   data-class='" + this.dropdownOptions[i].class + "' " +
            "   data-property='" + this.dropdownOptions[i].property + "'" +
            "   data-propertyvalue='" + this.dropdownOptions[i].propertyValue + "'" +
            ">" +
            this.dropdownOptions[i].optionText + "" +
            "</a></li>"


        return optionHTML
    }



}



var RULE_BUILDER_ROWS_CONTAINER_ID = 'logicBuilderRowsContainer'
var LOGIC_BUILDER_ROW_CLASS = 'logicBuilderRow'

//INIT FUNCTIONS
function initRulesBuilder(){
    rulesDataModelObject = new RulesDataModel()
    PREVIEW_MODAL_DOMOBJECT = new PreviewModal()
    RATESHEETWELL_DOMOBJECT = new RateSheetWell()
    ADDRULEMODAL_DOMOBJECT = new AddRuleModal()
    RULESETEXECUTOR_DOMOBJECT = new RuleSetExecutor()
    initRulesBuilderListeners()
}
function initRulesBuilderListeners(){
    $(document.body).on('click', 'button.logicBuilderButton', function(e) {
        logicBuilderButtonAction(this)
    });

    $(document.body).on('click', '.' + LOGIC_BUILDER_ROW_CLASS, function(e) {
        ruleBuilderRowClickAction(this)
    });

    $(document.body).on('click', '.logicPreviewBtnGroupButton, .logicPreviewHint', function(e) {
        e.stopPropagation()

        $(this).dropdown('toggle')
    });


    //PREVIEW OBJECT DROPDOWN OPTION CLICK
    $(document.body).on('click', 'ul.previewObjectDropdownMenu > li > a', function(e) {
        // previewObjectSelectAction(this)
        PREVIEW_MODAL_DOMOBJECT.previewObjectDropdownOptionClickAction(this)

    });
    $(document.body).on('click', 'ul.previewHintDropdownMenu > li > a', function(e) {
        PREVIEW_MODAL_DOMOBJECT.hintDropdownOptionClickAction(this)
        // previewHintSelectAction(this)
    });
    $(document.body).on('click', '.addAnotherActionButton', function(e) {
        PREVIEW_MODAL_DOMOBJECT.addAnotherActionButtonClickAction(this)
        PREVIEW_MODAL_DOMOBJECT.redrawPreviewModal()
        // previewHintSelectAction(this)
    });
    $(document.body).on('click', '.removeThisActionButton', function(e) {
        PREVIEW_MODAL_DOMOBJECT.removeThisActionButtonClickAction(this)
        PREVIEW_MODAL_DOMOBJECT.redrawPreviewModal()
        // previewHintSelectAction(this)
    });
    $(document.body).on('click', '.addBoolExpressionButton', function(e) {
        PREVIEW_MODAL_DOMOBJECT.addBoolExpressionButtonClickAction(this)
        PREVIEW_MODAL_DOMOBJECT.redrawPreviewModal()
        // previewHintSelectAction(this)
    });
    $(document.body).on('click', '.removeBoolExpressionButton', function(e) {
        PREVIEW_MODAL_DOMOBJECT.removeBoolExpressionButtonClickAction(this)
        PREVIEW_MODAL_DOMOBJECT.redrawPreviewModal()
        // previewHintSelectAction(this)
    });



    //PREVIEW OBJECT INPUTS CHANGE ACTION
    $(document.body).on('change', '.logicPreviewInput', function(e) {
        PREVIEW_MODAL_DOMOBJECT.hintDropdownOptionClickAction(this)
    });


    //RATE SHEET BUTTON LISTENERS
    $(document.body).on('click', 'button.addRateSheetVariableButton', function(e) {
        var ruleSetID = getSelectedRateSheetState()

        //CHECK IF ALL VARIABLES ARE COMPLETE
        if(rulesDataModelObject.getRuleSet(ruleSetID).variablesArrayIsValid()){
            var variableObj = new RuleSetVariable()
            rulesDataModelObject.addRateSheetVariable(ruleSetID, variableObj)
            RATESHEETWELL_DOMOBJECT.redraw()
        }

    });
    $(document.body).on('change', '.ruleSetVariableName, .ruleSetVariableValue, .ruleSetVariableType', function(e) {

        try{
            var ruleSetVariableID = $(this).attr('data-id')
            var ruleSetID = getSelectedRateSheetState()
            var type = $(this).closest('.ruleSetVariableContainer').find('.ruleSetVariableType').val()

            var variableObj = rulesDataModelObject.getRuleSetVariable(ruleSetVariableID, ruleSetID)
            var propertyName = $(this).attr('data-property')
            var propertyValue = $(this).val()

            if(propertyName === 'value'){
                if(type === 'number'){
                    if( isNaN(propertyValue) ){
                        alert("Not a number")
                    }
                    else{
                        propertyValue = parseFloat(propertyValue)
                    }

                }
                else if(type === 'boolean'){
                    propertyValue = (propertyValue === 'true')
                }
            }


            variableObj[propertyName] = propertyValue

        }
        catch(e){
            alert("Problem with Variable")
        }

        RATESHEETWELL_DOMOBJECT.redraw()

    });
    $(document.body).on('click', 'button.addRuleButton', function(e) {
        RATESHEETWELL_DOMOBJECT.addNewRulePlaceHolderRow(this)
    });
    $(document.body).on('click', 'button.rulePlaceholderRowSubmitButton', function(e) {
        RATESHEETWELL_DOMOBJECT.saveNewRule(this)
    });
    $(document.body).on('click', 'button.rulePlaceholderRowCancelButton', function(e) {
        RATESHEETWELL_DOMOBJECT.cancelAddNewRule(this)
    });
    $(document.body).on('click', 'button.submitRateSheetVariableButton', function(e) {
        RATESHEETWELL_DOMOBJECT.saveNewVariable(this)
    });
    $(document.body).on('click', 'button.cancelRateSheetVariableButton', function(e) {
        RATESHEETWELL_DOMOBJECT.cancelNewVariable(this)
    });

    $(document.body).on('click', '.rateSheetRowMoveUpButton', function(e) {
        RATESHEETWELL_DOMOBJECT.shiftRuleUp(this)
        // moveRateSheetRowUp(this)
    })
    $(document.body).on('click', '.rateSheetRowMoveDownButton', function(e) {
        RATESHEETWELL_DOMOBJECT.shiftRuleDown(this)
        // moveRateSheetRowDown(this)
    })
    $(document.body).on('click', '.rateSheetRowDeleteButton', function(e) {
        RATESHEETWELL_DOMOBJECT.deleteRuleFromRuleSet(this)
    })
    $(document.body).on('click', '.expandPremiumLogicDisplayButton', function(e) {
        RATESHEETWELL_DOMOBJECT.expandRateSheetRow(this)
    })
    $(document.body).on('click', '.compressPremiumLogicDisplayButton', function(e) {
        RATESHEETWELL_DOMOBJECT.compressRateSheetRow(this)
    })


    $(document.body).on('change', '#rateSheetProductDropdown', function(e) {
        RATESHEETWELL_DOMOBJECT.productIDDropdownChange(this)
    })
    $(document.body).on('change', '#rateSheetCoverageIDInput', function(e) {
        RATESHEETWELL_DOMOBJECT.covIDDropdownChange(this)
    })



    //RATE SHEET TEST LISTENERS
    $(document.body).on('click', 'button.rateSheetTestStartButton', function(e) {
        RULESETEXECUTOR_DOMOBJECT.startTest()
    })
    $(document.body).on('click', 'button.rateSheetStopTestButton', function(e) {
        RULESETEXECUTOR_DOMOBJECT.stopTest()
    })
    $(document.body).on('change', '.requiredQuestion select, .requiredQuestion input', function(e) {
        RULESETEXECUTOR_DOMOBJECT.runRuleSet()
    })











}
function showLogicBuilderModal(rateCodeRow){
    //FILL RATE CODE ID DAT ATTRIBUTE
    var rateCodeID = $(rateCodeRow).attr('data-ratecodeid')
    var ruleID = $(rateCodeRow).attr('data-id')

    if($(rateCodeRow).hasClass('conditionalRow')){
        var parentRuleID = $(rateCodeRow).attr('data-parentruleid')

        PREVIEW_MODAL_DOMOBJECT.openModal(ruleID, parentRuleID)
    }
    else{
        PREVIEW_MODAL_DOMOBJECT.openModal(ruleID)
    }


}

//////////////VIEW AND UI FUNCTIONS/////////////

//VIEW DATA MODEL REPRESENTATIONS
function VIEWOBJECT_Condition(conditionObj){
    var htmlString = "" +
        "           <div class='condition_ObjectContainer dataModelObject' data-id='" + "" + "'>" +
        "              <div class='condition_statement_ObjectContainer dataModelObject'>" +
        previewObjectHTML(TYPE_CONDITION_STATEMENT_ID, conditionObj.statement) +
        "              </div>" +
        "              <div class='condition_booleanLogic_ObjectContainer dataModelObject'>" +
        condition_booleanLogic_POHTML +
        "              </div>" +
        "              <div class='condition_action_ObjectContainer dataModelObject'>" +
        "              </div>" +
        "           </div>"
}
function DMVR_ConditionStatement(){

}

//VIEW ELEMENTS FACTORY
function previewObjectHTML(type, value, rowElement, inputValue){
    if(LOGIC_CONSTANTS[value].inputHTMLType){
        //IF THIS PREVIEW OBJECT IS A INPUT
        var htmlString = "" +
            "<div class='logicPreviewObjectContainer'>" +
                buildPreviewObjectInputHTML(type, value, rowElement) +
            "</div>"

        return htmlString
    }
    else{
        //IF THIS PREVIEW OBJECT IS NOT A INPUT
        var labelColor = LOGIC_CONSTANTS[type].objectClass
        var labelText = LOGIC_CONSTANTS[value].objectText

        var dropdownOptionsHTML = buildObjectDropdownOptionsHTML(type, value, rowElement)
        // var optionalInputHTML = buildPreviewObjectInputHTML(type, value, rowElement)

        var htmlString = "" +
            "<div class='logicPreviewObjectContainer'>" +
            "<div class='btn-group logicPreviewObject' data-type='" + type + "' data-value='" + value + "'>" +
            "   <button type='button' class='btn btn-xs btn-" + labelColor + " dropdown-toggle logicPreviewBtnGroupButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
            labelText + " <span class='caret'></span>" +
            "   </button>" +
            "   <ul class='dropdown-menu previewObjectDropdownMenu'>" +
            "       " + dropdownOptionsHTML +
            "   </ul>" +
            "</div>" +
            "</div>"

        return htmlString
    }

}
function previewObjectHintHTML(rowElement, type){
    var htmlString = ""

    if(type && type.trim().length > 0){
        var lastPreviewObjectInRow = getRowLastPreviewObjectElement(rowElement)
        var lastPreviewObjectType = getRowLastPreviewObjectType(rowElement)
        var lastPreviewObjectValue = getRowLastPreviewObjectValue(rowElement)

        var labelText = ""
        var dropdownOptionsHTML = ""

        labelText = LOGIC_CONSTANTS[type].labelText
        dropdownOptionsHTML = buildHintDropdownOptionsHTML(rowElement, type)


        htmlString = htmlString +
            "<div class='logicPreviewObjectContainer'>" +
            "<div class='btn-group logicPreviewHintObject' data-type='" + type + "'>" +
            "   <button type='button' class='btn btn-xs btn-default dropdown-toggle logicPreviewHint' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
            labelText + " <span class='caret'></span>" +
            "   </button>" +
            "   <ul class='dropdown-menu previewHintDropdownMenu'>" +
            "       " + dropdownOptionsHTML +
            "   </ul>" +
            "</div>" +
            "</div>"
    }
    return htmlString
}
function previewRowElement(index, conditionObj){
    //THE VIEW REPRESENTATION OF A CONDITION OBJECT
    var rowNum = (index !== undefined ? index : '' )
    var previewObjectsHTML = ''
    var condition_statement_POHTML = ''
    var condition_booleanLogic_POHTML = ''

    var conditionID = (conditionObj.id ? conditionObj.id : '' )

    if(conditionObj.statement){
        condition_statement_POHTML =  previewObjectHTML(TYPE_CONDITION_STATEMENT_ID, conditionObj.statement)
    }
    if(conditionObj.booleanLogic && conditionObj.booleanLogic.length > 0){
        var booleanLogicArray = conditionObj.booleanLogic

        //LOOP THROUGH DATA MODEL CONDITIONS BOOLEAN LOGIC ARRAY
        for(var i=0;i<booleanLogicArray.length; i++){
            //CHECK IF THIS IS A BOOL EXPRESSION OBJECT
            if(booleanLogicArray[i].objectType){
                var boolExpressionObject = booleanLogicArray[i]
                var boolExpressionObjectContainerHTML = "" +
                    "<div class='condition_booleanLogic_boolObject_ObjectContainer dataModelObject' data-id='" + boolExpressionObject.id + "'>"


                if(boolExpressionObject.objectType.trim().length > 0){
                    boolExpressionObjectContainerHTML = boolExpressionObjectContainerHTML + previewObjectHTML(TYPE_CONDITION_OBJECT_TYPE_ID, boolExpressionObject.objectType)
                }
                if(boolExpressionObject.objectID.trim().length > 0){
                    boolExpressionObjectContainerHTML = boolExpressionObjectContainerHTML + previewObjectHTML(TYPE_CONDITION_OBJECT_ID_ID, boolExpressionObject.objectID)
                }
                if(boolExpressionObject.attributeName.trim().length > 0){
                    boolExpressionObjectContainerHTML = boolExpressionObjectContainerHTML + previewObjectHTML(TYPE_CONDITION_ATTRIBUTE_NAME_ID, boolExpressionObject.attributeName)
                }
                if(boolExpressionObject.operator.trim().length > 0){
                    boolExpressionObjectContainerHTML = boolExpressionObjectContainerHTML + previewObjectHTML(TYPE_CONDITION_OPERATOR_ID, boolExpressionObject.operator)
                }
                if(boolExpressionObject.attributeValue.trim().length > 0){
                    boolExpressionObjectContainerHTML = boolExpressionObjectContainerHTML + previewObjectHTML(TYPE_CONDITION_ATTRIBUTE_VALUE_ID, boolExpressionObject.attributeValue)
                }

                boolExpressionObjectContainerHTML = boolExpressionObjectContainerHTML +
                    "</div>"

                condition_booleanLogic_POHTML = condition_booleanLogic_POHTML + boolExpressionObjectContainerHTML
            }
        }

    }

    if(conditionObj){
        //IF CONDITION OBJECT WAS GIVEN
        var booleanLogic  = (conditionObj.booleanLogic ? conditionObj.booleanLogic : '' )
        var actions = (conditionObj.actions ? conditionObj.actions : '' )


        // var conditionStatementHTML = statement ? previewObjectHTML(TYPE_CONDITION_STATEMENT_ID, conditionStatement) : ''
        var booleanLogicHTML = '' //TODO: CREATE FUNCTION TO CONVERT BOOLEAN LOGIC ARRAY TO VIEW ELEMENTS
        var actionsHTML = '' //TODO: CREATE FUNCTION TO CONVERT ACTIONS ARRAY TO VIEW ELEMENTS

        // previewObjectsHTML = conditionStatementHTML
    }
    else{
        //IF NO CONDITION OBJECT WAS PASSED, THEN CREATE A BLANK ROW

    }




    var htmlString = "" +
        "<div class='row " + LOGIC_BUILDER_ROW_CLASS + "' data-conditionuuid='" + conditionID + "'>" +
        "   <div class='col-xs-1'>" +
        "       <span class='rowNumberSpan'>" + rowNum + "</span>" +
        "   </div>" +
        "   <div class='col-xs-11'>" +
        "       <div class='rulePreviewObjects' >" +
        "           <div class='condition_ObjectContainer dataModelObject' data-objectType='' data-id='" + conditionID + "'>" +
        "              <div class='condition_statement_ObjectContainer dataModelObject'>" +
                            condition_statement_POHTML +
        "              </div>" +
        "              <div class='condition_booleanLogic_ObjectContainer dataModelObject'>" +
                            condition_booleanLogic_POHTML +
        "              </div>" +
        "              <div class='condition_action_ObjectContainer dataModelObject'>" +
        "              </div>" +
        "           </div>" +

                    previewObjectsHTML +
        "       </div>" +
        "   </div>" +
        "</div>"

    return htmlString
}
function previewDropdownOptionHTML(type, value, dataModelID){
    var optionHTML = "" +
    "       <li><a data-type='" + type + "' data-value='" + value + "' data-id='" + dataModelID + "'>" + LOGIC_CONSTANTS[value].objectText + "</a></li>"

    return optionHTML
}
function buildPreviewObjectInputHTML(type, value, rowElement){
    if( LOGIC_CONSTANTS[value].inputHTMLFunction ){
        var optionalInputHTML = "" +
            "<div class='previewObjectInput' data-type='" + type + "' data-value='" + value + "'> "

        optionalInputHTML = optionalInputHTML + eval( LOGIC_CONSTANTS[value].inputHTMLFunction )


        optionalInputHTML = optionalInputHTML +
            "</div>"

        return optionalInputHTML
    }
    else{
        return ""
    }
}
function buildHintDropdownOptionsHTML(rowElement, hintType){
    var dropdownOptionsHTML = ''
    var lastPreviewObjectValue = getRowLastPreviewObjectValue(rowElement)
    var dataModelID = getRowLastPreviewObjectDataModelID(rowElement)

    if(lastPreviewObjectValue){
        var hintOptionsArray = LOGIC_CONSTANTS[lastPreviewObjectValue].nextHintOptions

        for(var i=0;i<hintOptionsArray.length; i++){
            var optionID = hintOptionsArray[i]
            dropdownOptionsHTML = dropdownOptionsHTML +
                previewDropdownOptionHTML(hintType, optionID, dataModelID)
        }
    }
    else{
        dropdownOptionsHTML = dropdownOptionsHTML +
            "       <li><a data-type='" + hintType + "' data-value='" + CONDITION_STATEMENT_ALWAYS_ID + "'>Always</a></li>" +
            "       <li><a data-type='" + hintType + "' data-value='" + CONDITION_STATEMENT_IF_ID + "'>If</a></li>" +
            "       <li><a data-type='" + hintType + "' data-value='" + CONDITION_STATEMENT_IF_ELSE_ID + "'>If Else</a></li>" +
            "       <li><a data-type='" + hintType + "' data-value='" + CONDITION_STATEMENT_ELSE_ID + "'>Else</a></li>"
    }


    return dropdownOptionsHTML
}
function buildObjectDropdownOptionsHTML(type, value, rowElement){
    var dropdownOptionsHTML = ''

    var categoryOptionsArray = LOGIC_CONSTANTS[type].categoryOptions

    for(var i=0;i<categoryOptionsArray.length; i++){
        var optionID = categoryOptionsArray[i]
        dropdownOptionsHTML = dropdownOptionsHTML +
            previewDropdownOptionHTML(type, optionID)
    }

    return dropdownOptionsHTML
}



//PREVIEW OBJECT INPUT HTML FUNCTIONS, THESE HAVE TO RETURN HTML STRINGS
function questionIDDropdown(){
    var htmlString = "" +
        "<select>" +
        "<option value='invalid' selected>Select Question ID</option>"

    for(var i=0;i<questions.length;i++){
        htmlString = htmlString +
            "<option value='" + questions[i].questionID + "'>" + questions[i].questionID + "</option>"
    }

    htmlString = htmlString +
        "</select>"

    return htmlString
}
function questionAnswerInput(rowElement){
    var questionID = getRowObjectInputValue(rowElement)
    var questionObject = getQuestionObjectForID(questionID)
    var htmlString = ""

    if(questionObject.questionType === 'dropdown'){
        var questionOptionsValTextMap = JSON.parse(questionObject.dropdownOptionsValText)
        var questionChoicesKeys = Object.keys(questionOptionsValTextMap)

        htmlString = htmlString +
            "<select>"

        for(var i=0;i<questionChoicesKeys.length;i++){
            var questionOptionID = questionChoicesKeys[i]
            var questionOptionText = questionOptionsValTextMap[questionChoicesKeys[i]]

            htmlString = htmlString +
                "<option value='" + questionOptionID + "'>" + questionOptionText + "</option>"
        }

        htmlString = htmlString +
            "</select>"

    }
    else if(questionObject.questionType === 'radio'){
        var questionOptionsValTextMap = JSON.parse(questionObject.htmlCheckboxRadioValText)
        var questionChoicesKeys = Object.keys(questionOptionsValTextMap)

        htmlString = htmlString +
            "<select>"

        for(var i=0;i<questionChoicesKeys.length;i++){
            var questionOptionID = questionChoicesKeys[i]
            var questionOptionText = questionOptionsValTextMap[questionChoicesKeys[i]]

            htmlString = htmlString +
                "<option value='" + questionOptionID + "'>" + questionOptionText + "</option>"
        }

        htmlString = htmlString +
            "</select>"
    }

    return htmlString
}

//VIEW INFO RETRIEVAL FUNCTIONS
function getRowContainerElement(element){
    return $(element).closest('.logicBuilderRow')
}
function getRowLastPreviewObjectElement(rowElement){
    return $(rowElement).find('.rulePreviewObjects .logicPreviewObject').last().closest('.logicPreviewObjectContainer')
}
function getRowLastPreviewObjectType(rowElement){
    return $(getRowLastPreviewObjectElement(rowElement)).find('.logicPreviewObject').attr('data-type')
}
function getRowLastPreviewObjectValue(rowElement){
    return $(getRowLastPreviewObjectElement(rowElement)).find('.logicPreviewObject').attr('data-value')
}
function getRowLastPreviewObjectDataModelID(rowElement){
    return getRowLastPreviewObjectElement(rowElement).closest('.dataModelObject').attr('data-id')
}
function getRowAttributeNameObjectElement(rowElement){
    return $(rowElement).find(".logicPreviewObject[data-type='" + TYPE_CONDITION_ATTRIBUTE_NAME_ID + "']")
}
function getRowAttributeNameValue(rowElement){
    return $(getRowAttributeNameObjectElement(rowElement)).attr('data-value')
}
function getRowObjectElement(rowElement){
    return $(rowElement).find(".logicPreviewObject[data-type='" + TYPE_CONDITION_OBJECT_ID_ID + "']")
}
function getRowObjectValue(rowElement){
    return $(getRowObjectElement(rowElement)).attr('data-value')
}
function getRowObjectInputValue(rowElement){
    return getRowObjectElement(rowElement).siblings('.previewObjectInput').find('input, select').val()
}
function isLastPreviewObjectInRow(previewObjectElement){
    var rulePreviewObjectsContainer = $(previewObjectElement).closest('.rulePreviewObjects')
    var numPreviewObjectsInThisRow = $(rulePreviewObjectsContainer).find('.logicPreviewObjectContainer').length
    var thisLogicPreviewObjectContainer = $(previewObjectElement).closest('.logicPreviewObjectContainer')
    var thisLogicPreviewObjectIndex = $(thisLogicPreviewObjectContainer).index()

    if(numPreviewObjectsInThisRow === (thisLogicPreviewObjectIndex + 1) ){
        //THIS IS THE LAST PREVIEW OBJECT IN THE ROW
        return true
    }
    else{
        return false
    }
}
function clearPreviewObjectsAfterElement(element){
    //CLEAR THE PREVIEW OBJECTS THAT FOLLOW THIS OBJECT
    var category = ""
    var logicPreviewObjectContainer = $(element).closest('.logicPreviewObjectContainer')
    var type = $(element).attr('data-type')

    $(logicPreviewObjectContainer).next()

    while($(logicPreviewObjectContainer).next().length > 0){
        var nextPreviewObject = $(logicPreviewObjectContainer).next()
        $(nextPreviewObject).remove()

    }
    
    
}

//VIEW REFRESH/REFORMAT
function redrawConditionsPreviewBACKUP(ruleObject){
    /*
    DRAWS THE PREVIEW FOR A RULE OBJECT(RATE CODE) CONDITIONS
     */

    clearAllConditionRows()

    if(ruleObject){
        var conditions = ruleObject.conditions
        for(var i=0;i<conditions.length;i++){
            var conditionObject = conditions[i]
            appendRowToPreview( $(previewRowElement(i, conditionObject)) )
        }
    }

    //IF NO ROWS WERE INSERTED, CREATE A STARTER ROW
    if( $('#' + RULE_BUILDER_ROWS_CONTAINER_ID + ' .' + LOGIC_BUILDER_ROW_CLASS).length === 0){
        appendRowToPreview( $(previewRowElement()))
    }

    //MAKE FIRST RULE ROW ACTIVE
    $('#' + RULE_BUILDER_ROWS_CONTAINER_ID + ' .' + LOGIC_BUILDER_ROW_CLASS).first().addClass('active')

    formatLogicBuilderRows()

}
function redrawConditionsPreview(){
    clearAllConditionRows()

    var conditionsArray = getConditionsArrayForPreview()

    for(var i=0;i<conditionsArray.length; i++){
        var conditionObject = conditionsArray[i]

        appendRowToPreview( $(previewRowElement(i, conditionObject)) )
    }

    formatLogicBuilderRows()

}
function clearAllConditionRows(){
    $('#' + RULE_BUILDER_ROWS_CONTAINER_ID).html('')
}
function formatLogicBuilderRows(){
    $('#' + RULE_BUILDER_ROWS_CONTAINER_ID).find('.' + LOGIC_BUILDER_ROW_CLASS).each(function(index){
        //RENUMBER ROW CORRECTLY
        $(this).find('.rowNumberSpan').html(index)

        //ADD CORRECT HINT OBJECTS TO END OF ROW, IF READY
        addNextHintToRow(this)
    })

}
function addNextHintToRow(rowElement){
    //LOOKS AT GIVEN ROW TO SEE WHAT HINT OBJECT IS NEEDED NEXT
    var lastPreviewObject = getRowLastPreviewObjectElement(rowElement)
    var lastPreviewObjectType = getRowLastPreviewObjectType(rowElement)
    var lastPreviewObjectValue = getRowLastPreviewObjectValue(rowElement)

    //IF LAST PREVIEW OBJECT IS A HINT ALREADY, EXIT
    if($(lastPreviewObject).find('.logicPreviewHintObject').length > 0){
        return undefined
    }

    //CHECK IF PREVIEW OBJECT HAS INPUTS THAT ARE NOT FILLED
    if( $(lastPreviewObject).find('.previewObjectInput').length > 0 ){
        var previewInputElement = $(lastPreviewObject).find('input,select')

        if($(previewInputElement).is('input')){
            if( $(previewInputElement).val().trim().length === 0 ){
                return undefined
            }
        }
        else if($(previewInputElement).is('select')){
            if( $(previewInputElement).val().trim() === 'invalid' ){
                return undefined
            }
        }
    }



    if(lastPreviewObjectType === undefined){
        insertPreviewHintObject($(rowElement), TYPE_CONDITION_STATEMENT_ID)
    }
    else{
        insertPreviewHintObject($(rowElement), LOGIC_CONSTANTS[lastPreviewObjectValue].nextHintID)
    }

}

//MODAL PREVIEW UPDATES
function insertPreviewObject(ruleRowElement, type, value){
    $(ruleRowElement).find('.rulePreviewObjects').append(previewObjectHTML(type, value, rowElement))
}
function insertPreviewHintObject(ruleRowElement, type){
    $(ruleRowElement).find('.rulePreviewObjects').append(previewObjectHintHTML(ruleRowElement, type))
}
function appendRowToPreview(newRuleRowElement){
    $('#' + RULE_BUILDER_ROWS_CONTAINER_ID).append( $(newRuleRowElement) )
}
function previewObjectChangeAction(element){
    //IF THE CHANGE OCCURRED ON A HINT OBJECT, AND NO OBJECTS EXIST AFTER THIS ONE JUST ADD.
    //IF THE CHANGE OCCURRED ON A ALREADY SELECTED OBJECT, CHANGE THIS OBJECT AND CLEAR THE REST OF THE CONDITIONS OR ACTIONS

    var rowElement = $(element).closest('.logicBuilderRow')
    var type = $(element).attr('data-type')
    var value = $(element).attr('data-value')
    var previewObjectElement = $(previewObjectHTML(type, value, rowElement))

    var previewHintButtonGroup = $(element).closest('.logicPreviewObjectContainer')

    if(isLastPreviewObjectInRow(element)){

    }
    else{
        //THE PREVIEW OBJECT CHANGE OCCURRED ON A PREVIOUSLY SELECTED OBJECT
        clearPreviewObjectsAfterElement(element)
    }
    $(previewHintButtonGroup).replaceWith($(previewObjectElement))
    formatLogicBuilderRows()
}
function previewObjectSelectAction(element){
    var previewInputContainer
    var type
    var value
    var dataModelObjectID

    if($(element).is('input') || $(element).is('select')){
        previewInputContainer = $(element).closest('.previewObjectInput')
        type = $(previewInputContainer).attr('data-type')
        value = $(element).val()
        dataModelObjectID = $(previewInputContainer).closest('.dataModelObject').attr('data-id')
    }
    else{
        type = $(element).attr('data-type')
        value = $(element).attr('data-value')
        dataModelObjectID = $(element).attr('data-id')
    }

    var conditionRowID = getRowConditionID(element)
    var conditionSubObject = LOGIC_CONSTANTS[type].conditionSubObj
    var conditionObject = getConditionObjectForRowOrElement(element)


    if(conditionSubObject.trim().length > 0 ){
        if(conditionSubObject === 'booleanLogic'){
            if(conditionObject.booleanLogic.length === 0 ){
                //IF BOOLEAN LOGIC ARRAY IS EMPTY, INITIALIZE A NEW BOOL EXPRESSION OBJECT
                var options = {}
                options[type] = value
                var newBoolExpressionObject = newBoolExpression(options)
                conditionObject[conditionSubObject].push(newBoolExpressionObject)
            }
            else{
                //IF BOOLEAN LOGIC IS NOT EMPTY, LOOP THROUGH BOOLEAN LOGIC ARRAY
                var booleanLogicArray = conditionObject.booleanLogic
                var boolExpressionObject = searchArrayForObjectWithKey(conditionObject.booleanLogic, 'id', dataModelObjectID)
                boolExpressionObject[type] = value
            }

        }

        conditionObject[conditionSubObject][type] = value
    }
    else{
        conditionObject[type] = value
    }

    redrawConditionsPreview()
}
function previewHintSelectAction(element){
    //SELECTING A HINT DROPDOWN OPTION SHOULD ADJUST THE DATA MODEL AND REDRAW
    var ruleSetID = getSelectedRateSheetState()
    var ruleID = getRuleSet()
}
function previewInputChangeAction(element){
    //SELECTING A HINT DROPDOWN OPTION SHOULD ADJUST THE DATA MODEL AND REDRAW
    var inputContainer = $('.previewObjectInput')

    var type =  $(inputContainer).attr('data-type')
    var value = $(element).val() //FOR INPUTS THE VALUE WILL THE THE INPUT VALUE
    var conditionSubObject = LOGIC_CONSTANTS[type].conditionSubObj
    var dataModelObjectID = $(element).closest('.dataModelObject').attr('data-id')
    var conditionRowID = getRowConditionID(element)
    var conditionSubObject = LOGIC_CONSTANTS[type].conditionSubObj
    var conditionObject = getConditionObjectForRowOrElement(element)

    if(conditionSubObject.trim().length > 0 ){
        if(conditionSubObject === 'booleanLogic'){
            if(conditionObject.booleanLogic.length === 0 ){
                //IF BOOLEAN LOGIC ARRAY IS EMPTY, INITIALIZE A NEW BOOL EXPRESSION OBJECT
                var options = {}
                options[type] = value
                var newBoolExpressionObject = newBoolExpression(options)
                conditionObject[conditionSubObject].push(newBoolExpressionObject)
            }
            else{
                //IF BOOLEAN LOGIC IS NOT EMPTY, LOOP THROUGH BOOLEAN LOGIC ARRAY
                var booleanLogicArray = conditionObject.booleanLogic
                var boolExpressionObject = searchArrayForObjectWithKey(conditionObject.booleanLogic, 'id', dataModelObjectID)
                boolExpressionObject[type] = value
            }

        }

        conditionObject[conditionSubObject][type] = value
    }
    else{
        conditionObject[type] = value
    }

    redrawConditionsPreview()
}


//VIEW DATA UTIL FUNCTIONS
function getRowConditionID(element){
    return $(element).closest('.logicBuilderRow').attr('data-conditionuuid')
}
function getSelectedRowConditionID(){
    return $('.logicBuilderRow.active').attr('data-conditionuuid')
}


//VIEW ACTIONS
function logicBuilderButtonAction(button){
    var ruleKey = $(button).attr('data-rulekey')
    var ruleValue = $(button).attr('data-rulevalue')
    var previewText = $(button).attr('datat-previewtext')

    //ADD TO SELECTED ROW OBECT
    var selectedRowNumber = getSelectedRuleRowNumber()
    var selectedRowObject = getSelectedRuleRowObject()

    selectedRowObject[ruleKey] = ruleValue

    redrawConditionsPreview()

    //RESELECT SELECTED ROW
    $('.' + LOGIC_BUILDER_ROW_CLASS).eq(selectedRowNumber).click()

}
function ruleBuilderRowClickAction(row){
    if($(row).hasClass('active')){
        //IF THIS ROW IS ALREADY ACTIVE

        //OPTION:1 DO NOTHING


        //OPTION2: DESELECT
        // $(row).removeClass('active')
    }
    else{
        $('.' + LOGIC_BUILDER_ROW_CLASS).removeClass('active')
        $(row).addClass('active')
    }

    // formatControlPanel()
}



//VIEW INSERT/DELETE FUNCTIONS


//VIEW SHOW/HIDE FUNCTIONS




//DEPRECATED FUNCTIONS
function formatControlPanel(){
    var numRows = $('.' + LOGIC_BUILDER_ROW_CLASS).length
    var numActiveRows = $('.' + LOGIC_BUILDER_ROW_CLASS + '.active').length

    if( numRows === 0){

    }

    //CHECK A ROW IS ACTIVE TO EDIT
    if(numActiveRows === 0){
        showNoActiveRowNotice()
    }
    else{
        showRuleBuilderControlPanel()
    }

    //REFORMAT THE OPTIONS AVAILABLE FOR THE ROW
    var selectedRowObject = getSelectedRuleRowObject()
    var selectedRowNum = getSelectedRuleRowNumber()
    var controlPanelContainer = $('#rulesBuilderControlPanel')
    $(controlPanelContainer).html("")

    //1.CHECK FOR CONDITION
    if(!selectedRowObject.condition){
        //IF CONDITION DOESN'T EXIST FORCE USER TO ADD ONE
        $(controlPanelContainer).append(controlPanelHeaderHTML(TYPE_CONDITION_STATEMENT_ID))
        if(selectedRowNum === 0){
            $(controlPanelContainer).append(controlPanelButtonHTML(CONDITION_STATEMENT_ALWAYS_ID))
            $(controlPanelContainer).append(controlPanelButtonHTML(CONDITION_STATEMENT_IF_ID))
        }
    }
    else{
        //IF CONDITION EXISTS, CHECK IF CONDITION BASIS IS NEEDED
        if(selectedRowObject.condition === CONDITION_STATEMENT_ALWAYS_ID || selectedRowObject.condition === CONDITION_STATEMENT_ELSE_ID ){

        }
        else{
            $(controlPanelContainer).append(controlPanelHeaderHTML('conditionBasis'))
        }
    }

    if(!selectedRowObject.conditionBasis){

    }

}
function controlPanelButtonHTML(id){
    var ruleKey = ""
    var ruleValue = ""
    var previewText = ""

    if(id === "always"){
        ruleKey = TYPE_CONDITION_STATEMENT_ID
        ruleValue = "always"
        previewText = "Always"
        buttonText = "Always"
    }
    else if(id === "if"){
        ruleKey = TYPE_CONDITION_STATEMENT_ID
        ruleValue = "if"
        previewText = "If"
        buttonText = "If"
    }

    var htmlString = "" +
        "<button type='button' class='btn btn-xs btn-primary logicBuilderButton' " +
        "data-rulekey='" + ruleKey + "' data-rulevalue='" + ruleValue + "' data-previewtext='" + previewText + "'>" + buttonText + "</button>"

    return htmlString
}
function controlPanelHeaderHTML(id){
    var headerText = ""

    if(id === TYPE_CONDITION_STATEMENT_ID){
        headerText = "Condition:"
    }
    else if(id === "conditionBasis"){
        headerText = "If what?"
    }

    var htmlString = "" +
        "<h5>" + headerText + "</h5>"

    return htmlString
}
function showNoActiveRowNotice(){
    $('#rulesBuilderNoRowSelectedContainer').css('display', '')
    hideRuleBuilderControlPanel()
}
function hideNoActiveRowNotice(){
    $('#rulesBuilderNoRowSelectedContainer').css('display', 'none')
}
function showRuleBuilderControlPanel(){
    $('#rulesBuilderControlPanel').css('display', '')
    hideNoActiveRowNotice()
}
function hideRuleBuilderControlPanel(){
    $('#rulesBuilderControlPanel').css('display', 'none')
}




////////////////////////////////////////////////////////////////////
////////////////// DATA STATE FUNCTIONS /////////////////
////////////////////////////////////////////////////////////////////

//STATE OBJECT TEMPLATES
function newRuleSet(options){ //REPRESENTS STATES
    var ruleSet = {
        id: '',
        rules: [] //ARRAY OF RULE OBJECTS (RATE CODES)
    }

    return ruleSet
}
function newRule(options){ //REPRESENTS RATE CODE
    var rule = {
        id:'',
        conditions:[] // ARRAY OF CONDITION OBJECTS
    }

    return rule
}
function newCondition(options){
    //CAN ONLY BE INSERTED INTO RULE OBJECTS 'conditions' Array
    //CONDITION OBJECTS REPRESENT COMPLETE CONDITION STATEMENTS
    //ex. if(x==y || x==7)

    var condition = {
        id: (options && options.id ? options.id : generateUniqueID() ),
        statement: (options && options.statement ? options.statement : '' ), // always, if, ifElse, or else
        booleanLogic: (options && options.booleanLogic ? options.booleanLogic : [] ), //ARRAY OF '(', ')', '&&', '||', boolFunctions, and boolExpressions,
        actions: (options && options.actions ? options.actions : [] ) //ARRAY OF ACTION OBJECTS TO EXECUTE IF BOOLEAN LOGIC IS TRUE
    }
    return condition
}
function newBoolExpression(options){
    //CAN ONLY BE INSERTED INTO CONDITIONAL STATEMENT OBJECTS 'booleanLogic' Array
    // A BOOL EXPRESSION OBJECT CAN BE PASSED INTO BOOL FUNCTION AND EVALUATED AS TRUE OR FALSE
    //REPRESENTS (X==Y)
    var boolExpression = {
        id: (options && options.objectID ? options.objectID : generateUniqueID() ),
        objectType:(options && options.objectType ? options.objectType : '' ),
        objectID: (options && options.objectID ? options.objectID : '' ),
        attributeName: (options && options.attributeName ? options.attributeName : '' ),
        operator: (options && options.operator ? options.operator : ''),
        attributeValue: (options && options.attributeValue ? options.attributeValue : '' )
    }

    return boolExpression
}
function newObjectObj(options){
    var objectObj = {
        id: (options && options.objectID ? options.objectID : generateUniqueID() ),
        objectType:(options && options.objectType ? options.objectType : '' ),
        objectID: (options && options.objectID ? options.objectID : '' ),
        attributeName: (options && options.attributeName ? options.attributeName : '' ),
        operator: (options && options.operator ? options.operator : ''),
        attributeValue: (options && options.attributeValue ? options.attributeValue : '' )
    }

    return objectObj
}
function newAction(options){
    var action = {
        id: '',
        actionFunction: '',
        targetID: '',
        attributeName: '',
        attributeValue: '',
    }

    return action
}

//STATE CHANGE FUNCTIONS
function resetMasterArray(){
    rulesStateModel = []
}

//STATE INSERT FUNCTIONS
function insertRuleSet(ruleSetObj, index){
    /*
    RULE SETS CAN ONLY BE ADDED TO THE RULES STATE MODEL: ruleSets ARRAY
     */
    // return addObjectToArray(rulesStateModel.ruleSets, ruleSetObj, index)
    addObjectToObject(rulesStateModel.ruleSets, ruleSetObj.id, ruleSetObj)
}
function insertRule(ruleObj, ruleSetID, indexToInsert){
    /*
    RULE OBJECTS CAN ONLY BE ADDED TO A RULE SET OBJECT'S 'rules' ARRAY
     */
    //ADD RULE TO RULESET OBJECT
    return addObjectToArray(getRuleSet(ruleSetID).rules, ruleObj, indexToInsert)
}
function insertCondition(conditionObj, ruleObj, indexToInsert){
    /*
    CONDITIONAL STATEMENT OBJECTS CAN ONLY BE ADDED TO A RULE OBJECT'S 'conditions' ARRAY
     */

    return addObjectToArray(ruleObj.conditions, conditionObj, indexToInsert)
}
function insertBoolExpression(boolExpressionObj, conditionObj, indexToInsert){
    /*
    BOOL EXPRESSION OBJECTS CAN ONLY BE ADDED TO A CONDITIONAL STATEMENT'S 'booleanLogic' ARRAY
     */

    return addObjectToArray(conditionObj.booleanLogic, boolExpressionObj, indexToInsert)
}
function insertAction(actionObj, ruleObj, indexToInsert){
    /*
    ACTION OBJECTS CAN ONLY BE ADDED TO A CONDITION OBJECT'S 'actions' ARRAY
     */

    return addObjectToArray(ruleObj.actions, actionObj, indexToInsert)
}

//STATE GETTER FUNCTIONS
function getRuleSet(ruleSetID){
    //RETURNS RULES SET OBJECT
    return searchArrayForObjectWithKey(rulesStateModel.ruleSets , 'id', ruleSetID)
}
function getRuleSetID(ruleSetObj){
    return ruleSetObj.id
}
function getRuleSetRules(ruleSetObj){
    return ruleSetObj.rules
}

function getRule(ruleID, ruleSetIDorOBJ){
    //RETURNS RULE OBJECT OR UNDEFINED
    if(typeof ruleSetIDorOBJ === 'string'){
        //EXPECT THIS TO BE AN ID
        return searchArrayForObjectWithKey(getRuleSet(ruleSetIDorOBJ).rules , 'id', ruleID)
    }
    else{
        //EXPECT THIS TO BE OBJ
        return searchArrayForObjectWithKey(ruleSetIDorOBJ.rules , 'id', ruleID)
    }
}
function getRuleID(ruleObj){
    return ruleObj.id
}
function getRuleCondtions(ruleObj){
    return ruleObj.conditions
}
function getRuleActions(ruleObj){
    return ruleObj.actions
}

function getCondition(conditionID, ruleOBJ){
    //RETURNS CONDITION OBJECT OR UNDEFINED
    return searchArrayForObjectWithKey(ruleOBJ.rules , 'id', conditionID)

}
function getConditionID(conditionObj){
    return conditionObj.id
}
function getConditionStatement(conditionObj){
    return conditionObj.statement
}
function getConditionBooleanLogic(conditionObj){
    return conditionObj.booleanLogic
}

function getBoolExpression(boolExpressionID, conditionObj){
    //RETURNS BOOL EXPRESSION OBJECT OR UNDEFINED
    return searchArrayForObjectWithKey(conditionObj.booleanLogic , 'id', boolExpressionID)
}
function getBoolExpressionID(boolExpObj){
    return boolExpObj.id
}
function getBoolExpressionObjectID(boolExpObj){
    return boolExpObj.objectID
}
function getBoolExpressionAttributeName(boolExpObj){
    return boolExpObj.attributeName
}
function getBoolExpressionAttributeValue(boolExpObj){
    return boolExpObj.attributeValue
}

function getAction(actionID, conditionOBJ){
    //RETURNS CONDITION OBJECT OR UNDEFINED
    return searchArrayForObjectWithKey(conditionOBJ.rules , 'id', conditionID)

}
function getActionID(actionObj){
    return actionObj.id
}
function getActionFunction(actionObj){
    return actionObj.actionFunction
}
function getActionTargetID(actionObj){
    return actionObj.targetID
}
function getActionAttributeName(actionObj){
    return actionObj.attributeName
}
function getActionAttributeValue(actionObj){
    return actionObj.attributeValue
}

//STATE SETTER FUNCTIONS
function setRuleSetArray(savedRuleSetArray){
    rulesStateModel = savedRuleSetArray
}
function setRuleSetID(id, ruleSetObj){
    ruleSetObj.id = id
}
function setRuleID(id, ruleObj){
    ruleObj.id = id
}
function setConditionID(id, conditionObj){
    conditionObj.id = id
}
function setConditionStatement(statement, conditionObj){
    conditionObj.statement = statement
}
function setConditionBooleanLogic(){

}
function setBoolExpressionID(id, boolExpObj){
    boolExpObj.id = id
}
function setActionID(id, actionObj){
    actionObj.id = id
}



//DATA MODEL UTIL FUNCTIONS
function addObjectToArray(array, insertObj, index){
    if(index){
        //INSERTS AT INDEX
        array.splice(index, 0, insertObj);

        return true
    }
    else{
        //IF INDEX WASN'T GIVEN, INSERT AT END
        array.push(insertObj)

        return true
    }

    //RETURN UNDEFINED IF UNSUCCESSFUL
    return undefined
}
function addObjectToObject(object, key, insertObj){
    if(!object[key]){
        object[key] = insertObj
        return true
    }
    else{
        //KEY ALREADY EXISTS
        return undefined
    }

    return undefined
}
function searchArrayForObjectWithKey(array, key, value){
    //SEARCHES AN ARRAY FOR AN OBJECT WITH AN ATTRIBUTE 'key' = value
    for(var i=0;i<array.length;i++){
        if(array[i][key] && array[i][key] === value){
            //RETURN OBJECT FOUND
            return array[i]
        }
    }

    //RETURN UNDEFINED IF NOT FOUND
    return undefined
}
function searchArrayForObjectWithKey_GetIndex(array, key, value){
    //SEARCHES AN ARRAY FOR AN OBJECT WITH AN ATTRIBUTE 'key' = value
    for(var i=0;i<array.length;i++){
        if(array[i][key] && array[i][key] === value){
            //RETURN INDEX
            return i
        }
    }

    //RETURN UNDEFINED IF NOT FOUND
    return undefined
}
function generateUniqueID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


//RATE SHEET (DATA MANAGEMENT PAGE) UTIL FUNCTIONS
function getConditionsArrayForPreview(){
    var rateCodeArray = rulesDataModelObject.getModel().ruleSets[getSelectedRateSheetState()].rules
    var rateCodeRuleObject = searchArrayForObjectWithKey(rateCodeArray, 'id', CURRENT_RATECODEID_IN_PREVIEW)

    return rateCodeRuleObject.conditions
}
function getConditionObjectForRowOrElement(element){
    var conditionID = getRowConditionID(getRowContainerElement(element))

    return searchArrayForObjectWithKey( getConditionsArrayForPreview(), 'id', conditionID )
}
function getConditionObjectForSelectedPreviewRow(){
    //GET CONDITION ID FOR CONDITION OBJECT
    var conditionID = getSelectedRowConditionID()

    return searchArrayForObjectWithKey( getConditionsArrayForPreview(), 'id', conditionID )
}

function printStateRules(){
    console.log(rulesStateModel.ruleSets[getSelectedRateSheetState()].rules)
}
function printConditions(){
    console.log(PREVIEW_CONDITION_OBJECT)
}
