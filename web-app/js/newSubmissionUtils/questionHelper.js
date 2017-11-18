//IMPORT HTML AND QUESTIONS FOR CHOSEN RISK TYPE. TEMPLATES ARE LOCATED IN /views/forms/.
// IF TEMPLATE IS NOT IMPORTING CORRECTLY MAKE SURE TO ADD NECESSARY METHOD IN THE FORMS CONTROLLER


var closeButton = "<button type='button' class='close' aria-label='Close'>" +
    "<span aria-hidden='true'>&times;</span></button>"


function getQuestionObjectByID(qID){
    for(var i=0;i<questions.length;i++){
        if(questions[i].questionID != null){
            if(questions[i].questionID === qID){
                return questions[i]
            }
        }
    }
}

function getQuestionHTML(qID, options){
    var question = getQuestionObjectByID(qID)


    var questionText = (typeof options.questionText === 'undefined') ? question.questionText : options.questionText

    //DIV CONTAINER
    var gridSize = (typeof options.gridSize === 'undefined') ? question.gridSize : options.gridSize
    var gridColumns = (typeof options.gridColumns === 'undefined') ? question.gridColumns : options.gridColumns
    var containerClass = (typeof options.containerClass === 'undefined') ? question.containerClass : options.containerClass
    var containerDataAttr = (typeof options.containerDataAttr === 'undefined') ? question.containerDataAttr : options.containerDataAttr
    var containerStyle = (typeof options.containerStyle === 'undefined') ? question.containerStyle : options.containerStyle

    //FORM GROUP
    var formGroupClass = (typeof options.formGroupClass === 'undefined') ? question.formGroupClass : options.formGroupClass
    var formGroupStyle = (typeof options.formGroupStyle === 'undefined') ? question.formGroupStyle : options.formGroupStyle
    var formGroupDataAttr = (typeof options.formGroupDataAttr === 'undefined') ? question.formGroupDataAttr : options.formGroupDataAttr

    //INPUT
    var inputType = (typeof options.inputType === 'undefined') ? question.inputType : options.inputType
    var inputClass = (typeof options.inputClass === 'undefined') ? question.inputClass : options.inputClass
    var inputDataAttr = (typeof options.inputDataAttr === 'undefined') ? question.inputDataAttr : options.inputDataAttr
    var inputStyle = (typeof options.inputStyle === 'undefined') ? question.inputStyle : options.inputStyle
    var required = (typeof options.required === 'undefined') ? question.required : options.required
    var attachments = (typeof options.attachments === 'undefined') ? question.attachments : options.attachments
    var disabled = (typeof options.disabled === 'undefined') ? question.disabled : options.disabled
    var htmlDataReviewName = (typeof options.htmlDataReviewName === 'undefined') ? question.htmlDataReviewName : options.htmlDataReviewName
    var htmlPlaceholder = (typeof options.htmlPlaceholder === 'undefined') ? question.htmlPlaceholder : options.htmlPlaceholder
    var maxLength = (typeof options.maxLength === 'undefined') ? question.maxLength : options.maxLength
    var htmlCheckboxRadioValText = (typeof options.htmlCheckboxRadioValText === 'undefined') ? question.htmlCheckboxRadioValText : options.htmlCheckboxRadioValText
    var dropdownOptionsValText = (typeof options.dropdownOptionsValText === 'undefined') ? question.dropdownOptionsValText : options.dropdownOptionsValText
    var multiColumnMap = (typeof options.multiColumnMap === 'undefined') ? question.multiColumnMap : options.multiColumnMap


    //INPUT GROUP STUFF
    var inputAddOnLeft = (typeof options.inputAddOnLeft === 'undefined') ? question.inputAddOnLeft : options.inputAddOnLeft
    var inputAddOnRight = (typeof options.inputAddOnRight === 'undefined') ? question.inputAddOnRight : options.inputAddOnRight
    var inputButtonText = (typeof options.inputButtonText === 'undefined') ? question.inputButtonText : options.inputButtonText
    var inputAddOnText = (typeof options.inputAddOnText === 'undefined') ? question.inputAddOnText : options.inputAddOnText

    //ICON
    var faIconLeft = (typeof options.faIconLeft === 'undefined') ? false : options.faIconLeft
    if(faIconLeft === false && question.faIconLeft === 'Y'){
        faIconLeft = true
    }

    var faIconRight = (typeof options.faIconRight === 'undefined') ? false : options.faIconRight
    if(faIconRight === false && question.faIconRight === 'Y'){
        faIconRight = true
    }
    var faIconClass = (typeof options.faIconClass === 'undefined') ? question.faIconClass : options.faIconClass
    var faIconStyle = (typeof options.faIconStyle === 'undefined') ? question.faIconStyle : options.faIconStyle

    //HIDDEN DIV STUFF
    var hiddenQuestionTriggerIDMap = (typeof options.hiddenQuestionTriggerIDMap === 'undefined') ? question.hiddenQuestionTriggerIDMap : options.hiddenQuestionTriggerIDMap




    //CONTAINER ELEMENT, WIDTH AND GRID SIZE
    var questionContainerElem = $(
        "<div class='col-" + gridSize + "-" + gridColumns + " " + containerClass + "' " +
        formatDataAttributeStringFromMap(containerDataAttr) + "" +
        "style='" + containerStyle + "'" +
        "> " +
        "</div>")


    //FORM GROUP, BOOTSTRAP FORMATTING
    var formGroupElem = $("<div class='form-group " + formGroupClass + "' style='" + formGroupStyle + "' " + formatDataAttributeStringFromMap(formGroupDataAttr) + ">" + "</div> ")

    //FONT AWESOME ICON, LEFT
    if(faIconLeft){
        var faIconLeftElem = $("<i class='fa fa-" + faIconClass + "' aria-hidden='true'  style='" + faIconStyle + "'></i>")
        $(formGroupElem).prepend($(faIconLeft))
    }



    //INPUT ELEMENTS
    var inputElement
    var questionLabelElement
    if(inputType === 'text' || inputType === 'number'){

        //QUESTION LABEL
        questionLabelElement= $("<label class='questionText'>" + questionText + "</label>")
        $(formGroupElem).append($(questionLabelElement))

        inputElement = $(
            "<input class='" + inputClass + "' " +
            "type='" + inputType + "' " +
            "data-reviewName='" + htmlDataReviewName + "' " +
            formatDataAttributeStringFromMap(inputDataAttr) + " " +
            "style='" + inputStyle + "' " +
            "id='" + qID + "' " +
            "placeholder='" + htmlPlaceholder + "' " +
            ">")

        //IF INPUT HAS A MAX LENGTH
        if(maxLength !== undefined && maxLength !== null && maxLength.trim().length !== 0){
            $(inputElement).attr('maxLength', maxLength)
        }

        //IF INPUT HAS A ATTACH BUTTON
        if(attachments === 'Y'){
            var inputGroupDivContainer = $("<div class='input-group'></div>")
            var attachButtonHTML = $(
                "<span class='input-group-btn'>" +
                "   <button class='btn btn-primary attachButton' style='padding-left:6px;'>" +
                "       <i class='fa fa-fw fa-paperclip' aria-hidden='true' style='margin-right:4px;'>" +
                "       </i>Attach" +
                "   </button>" +
                "</span>"
            )

            //ATTACH BUTTONS ARE ON THE RIGHT, SO APPEND THE INPUT FIRST, AND THEN THE ATTACH BUTTON SECOND TO THE INPUT GROUP
            $(inputGroupDivContainer).append($(inputElement))
            $(inputGroupDivContainer).append($(attachButtonHTML))

            inputElement = $(inputGroupDivContainer)
        }

        if(inputAddOnLeft === 'Y'){
            var inputGroupDivContainer = $("<div class='input-group'></div>")
            var inputAddOnHTML = $(
                "<span class='input-group-addon'>" + inputAddOnText +
                "</span>"
            )

            //CHECK IF A INPUT GROUP EXISTS ALREADY
            if($(inputElement).hasClass('input-group') === true){
                inputGroupDivContainer = $(inputElement)

                //IF IT EXISTS ALREADY, INPUT AND ANOTHER GROUP WAS ADDED. JUST PREPEND
                $(inputGroupDivContainer).prepend($(inputAddOnHTML))
            }
            else{


                $(inputGroupDivContainer).append($(inputAddOnHTML))
                $(inputGroupDivContainer).append($(inputElement))

                inputElement = $(inputGroupDivContainer)
            }

        }


        //IF INPUT HAS A LEFT OR RIGHT INPUT SPAN
    }
    else if(inputType === 'multiColumnInput'){
        //QUESTION LABEL
        var tempMultiRowContainer = $('<div></div>')

        var tempFormGroupElem = $("<div class='form-group col-xs-12" + "' style='padding-left:2px; padding-right:2px; margin-bottom:0px'>" + "</div> ")
        questionLabelElement= $("<label class='questionText'>" + questionText + "</label>")
        $(tempFormGroupElem).append($(questionLabelElement))
        $(tempMultiRowContainer).append( $(tempFormGroupElem) )

        console.log(multiColumnMap)
        if( multiColumnMap ){
            var multiColumnMapObject = jsonStringToObject(multiColumnMap)
            var columnArray = Object.keys(multiColumnMapObject)
            var thisRowContainerElement = $(
                "<div class='multiRowContainer' style='margin-bottom:15px;'>" +
                "</div>")
            var thisRowElement = $("<div class='row col-xs-12 multiRow'></div>")

            for(var i=0; i<columnArray.length;i++){

                var thisColumnName = columnArray[i]
                var thisColumnMap = jsonStringToObject(multiColumnMap)[thisColumnName]
                var thisColumnWidth = thisColumnMap['width']
                var thisColumnInputClass = thisColumnMap['inputClass']
                var thisColumnInputType = thisColumnMap['inputType']
                var thisColumnInputPlaceholder = thisColumnMap['columnPlaceholder']
                var thisColumnInputAttributes = thisColumnMap['attributes']


                var thisColumnHTML = $(
                    "<div class='" + thisColumnWidth+ "' style='padding-left:2px; padding-right:2px'>"+
                    "   <div class='form-group' style='margin-bottom:2px;'>" +
                    "       <input class='" + thisColumnInputClass + " " + thisColumnName + "' " +
                    "           type='" + thisColumnInputType + "' " +
                    "           " + thisColumnInputAttributes + " " +
                    "           placeholder='" + thisColumnInputPlaceholder + "'>" +
                    "       </input>" +
                    "   </div>" +
                    "</div> ")

                $(thisRowElement).append( $(thisColumnHTML) )
            }
            
            //ADD BUTTONS
            var buttonColHTML = $(
                "<div class='col-xs-2' style='padding-left:2px; padding-right:2px'>" +
                "   <button type='button' class='btn btn-xs btn-success multiRowInputAddButton' style='font-size:9px'>" +
                "       <i class='fa fa-plus' aria-hidden='true'></i>" +
                "   </button>" +
                "   <button type='button' class='btn btn-xs btn-danger multiRowInputRemoveButton' style='font-size:9px'>" +
                "       <i class='fa fa-minus' aria-hidden='true'></i>" +
                "   </button>" +
                "</div>"
            )
            $(thisRowElement).append( $(buttonColHTML) )
            $(thisRowContainerElement).append( $(thisRowElement) )

        }

        $(tempMultiRowContainer).append( $(thisRowContainerElement) )


        inputElement = $( $(tempMultiRowContainer).html() )
    }
    else if(inputType === 'textarea'){

        //QUESTION LABEL
        questionLabelElement= $("<label class='questionText'>" + questionText + "</label>")
        $(formGroupElem).append($(questionLabelElement))

        inputElement = $(
            "<textarea class='" + inputClass + "' " +
            "data-reviewName='" + htmlDataReviewName + "' " +
            formatDataAttributeStringFromMap(inputDataAttr) + " " +
            "style='" + inputStyle + "' " +
            "id='" + qID + "' " +
            "placeholder='" + htmlPlaceholder + "' " +
            ">")

        if(maxLength !== undefined && maxLength !== null && maxLength.trim().length !== 0){
            $(inputElement).attr('maxLength', maxLength)
        }

        //IF INPUT HAS A ATTACH BUTTON
        if(attachments === 'Y'){
            var tempContainer = $("<div></div>")

            var attachButtonHTML = $(
                "   <button class='btn btn-primary attachButton pull-right' style='padding-left:6px'>" +
                "       <i class='fa fa-fw fa-paperclip' aria-hidden='true' style=''>" +
                "       </i>" +
                "       <span>Attach</span>" +
                "   </button>"
            )

            //ATTACH BUTTONS ARE ON THE RIGHT, SO APPEND THE INPUT FIRST, AND THEN THE ATTACH BUTTON SECOND TO THE INPUT GROUP
            $(tempContainer).append($(inputElement))
            $(tempContainer).append($(attachButtonHTML))

            inputElement = $(tempContainer)
        }
    }
    else if(inputType === 'checkbox'){
        //QUESTION LABEL
        questionLabelElement= $("<label class='questionText'>" + questionText + "</label>")
        $(formGroupElem).append($(questionLabelElement))

        var checkboxOptionValTextMap = jsonStringToObject(htmlCheckboxRadioValText)
        var checkboxOptionValueArray = Object.keys(checkboxOptionValTextMap)
        var defaultChecked = question.defaultChecked

        var allCheckboxesElements = $("<div><br></div>")
        for(var i=0;i<checkboxOptionValueArray.length;i++){
            var thisCheckboxOptionValue = checkboxOptionValueArray[i]
            var thisCheckboxOptionText = checkboxOptionValTextMap[thisCheckboxOptionValue]

            inputElement = $(
                "<label class='checkboxVerticalLayout questionOptionLabel'>" +
                "   <input type='" + inputType + "' class='" + inputClass + "' " +
                "       data-reviewName='" + htmlDataReviewName + "' " +
                "       value='" + thisCheckboxOptionValue + "'" +
                "       name='" + qID + "_CheckboxGroup'" +
                "       id='" + qID + "_" + thisCheckboxOptionValue + "'/> " + thisCheckboxOptionText +
                "</label>" +
                "<br>"
            )

            if(defaultChecked != null && defaultChecked === thisOptionValue){
                $(inputElement).attr('checked', 'checked')
            }

            $(allCheckboxesElements).append($(inputElement))
        }
        var allCheckboxesHTML = $(allCheckboxesElements).html()
        inputElement = $(allCheckboxesHTML)
    }
    else if(inputType === 'radio'){
        //QUESTION LABEL
        questionLabelElement= $("<label class='questionText'>" + questionText + "</label>")
        $(formGroupElem).append($(questionLabelElement))

        var radioOptionValTextMap = jsonStringToObject(htmlCheckboxRadioValText)
        var radioOptionValueArray = Object.keys(radioOptionValTextMap)
        var defaultChecked = question.defaultChecked

        var allRadioElements = $("<div><br></div>")

        for(var i=0;i<radioOptionValueArray.length;i++){
            var thisRadioOptionValue = radioOptionValueArray[i]
            var thisRadioOptionText = radioOptionValTextMap[thisRadioOptionValue]

            inputElement = $(
                "<label class='radio-inline questionOptionLabel'>" +
                "   <input type='" + inputType + "' class='" + inputClass + "' " +
                "       data-reviewName='" + htmlDataReviewName + "' " +
                "       name='" + qID + "_RadioGroup' " +
                "       value='" + thisRadioOptionValue + "'" +
                "       id='" + qID + "_" + thisRadioOptionValue + "'" +
                "       style='margin-top: -5px;'/> " + thisRadioOptionText +
                "</label>"
            )

            if(defaultChecked != null && defaultChecked === thisOptionValue){
                $(inputElement).attr('checked', 'checked')
            }

            $(allRadioElements).append($(inputElement))
        }
        var allRadioHTML = $(allRadioElements).html()
        inputElement = $(allRadioHTML)
    }
    else if(inputType === 'dropdown'){
        //QUESTION LABEL
        questionLabelElement= $("<label class='questionText'>" + questionText + "</label>")
        $(formGroupElem).append($(questionLabelElement))

        inputElement = $(
            "<select type='" + inputType + "' class='" + inputClass + "' " +
            "   data-reviewName='" + htmlDataReviewName + "' " +
            "   id='" + qID + "' " +
            "> " +
            "</select>"
        )

        if(dropdownOptionsValText !== null){
            var dropdownOptionsValTextMap = jsonStringToObject(dropdownOptionsValText)
            var dropdownOptionsValueArray = Object.keys(dropdownOptionsValTextMap)

            for(var i=0;i<dropdownOptionsValueArray.length;i++){
                var thisOptionValue = dropdownOptionsValueArray[i]
                var thisOptionText = dropdownOptionsValTextMap[thisOptionValue]


                var optionElement = $("<option value='" + thisOptionValue + "' >" + thisOptionText + "</option>")
                if(i === 0){
                    optionElement = $("<option value='invalid' >Select One</option>")
                    $(optionElement).attr('selected', 'selected')
                }

                $(inputElement).append($(optionElement))
            }
        }



    }
    else if(inputType === 'custom_mailingAddress'){
        //QUESTION LABEL
        questionLabelElement= $("<label class='questionText'>" + questionText + "</label>")
        $(formGroupElem).append($(questionLabelElement))

        inputElement = $(
            "<div class='addressAutoCompleteContainer '> " +
            "   <div class = 'form-group'> " +
            "           <input class='form-control addressAutoCompleteInput streetAddressInput ' type='text' placeholder='Street address' id='" + qID + "_StreetAddress' onFocus='geolocate()' /> " +
            "   </div> " +
            "   <div class='form-group'> " +
            "       <input class='form-control autoCompleteCity cityInput' type='text' placeholder = 'City' id='" + qID + "_City'  /> " +
            "   </div> " +
            "   <div class='row'> " +
            "       <div class='form-group col-xs-6'> " +
            "           <input class='form-control autoCompleteZipcode zipcodeInput' type='text' placeholder = 'Zip Code' id='" + qID + "_Zipcode' data-lengthrequired='5' maxlength='6'/> " +
            "       </div> " +
            "      <div class='form-group col-xs-6'> " +
            "           <select class='form-control autoCompleteState stateAddressInput' data-reviewName='State' id='" + qID + "_State' > " +
            "               <option value='invalid' selected='selected'>State</option>" +
            "               <option value='AL'>Alabama</option> " +
            "               <option value='AK'>Alaska</option> " +
            "               <option value='AZ'>Arizona</option> " +
            "               <option value='AR'>Arkansas</option> " +
            "               <option value='CA'>California</option> " +
            "               <option value='CO'>Colorado</option> " +
            "               <option value='CT'>Connecticut</option> " +
            "               <option value='DE'>Delaware</option> " +
            "               <option value='DC'>District Of Columbia</option>" +
            "               <option value='FL'>Florida</option>" +
            "               <option value='GA'>Georgia</option>" +
            "               <option value='GU'>Guam</option> " +
            "               <option value='HI'>Hawaii</option> " +
            "               <option value='ID'>Idaho</option> " +
            "               <option value='IL'>Illinois</option> " +
            "               <option value='IN'>Indiana</option> " +
            "               <option value='IA'>Iowa</option> " +
            "               <option value='KS'>Kansas</option> " +
            "               <option value='KY'>Kentucky</option> " +
            "               <option value='LA'>Louisiana</option> " +
            "               <option value='ME'>Maine</option> " +
            "               <option value='MD'>Maryland</option> " +
            "               <option value='MA'>Massachusetts</option> " +
            "               <option value='MI'>Michigan</option> " +
            "               <option value='MN'>Minnesota</option>   " +
            "               <option value='MS'>Mississippi</option> " +
            "               <option value='MO'>Missouri</option> " +
            "               <option value='MT'>Montana</option> " +
            "               <option value='NE'>Nebraska</option> " +
            "               <option value='NV'>Nevada</option>  " +
            "               <option value='NH'>New Hampshire</option>" +
            "               <option value='NJ'>New Jersey</option>" +
            "               <option value='NM'>New Mexico</option> " +
            "               <option value='NY'>New York</option> " +
            "               <option value='NC'>North Carolina</option>" +
            "               <option value='ND'>North Dakota</option> " +
            "               <option value='OH'>Ohio</option>" +
            "               <option value='OK'>Oklahoma</option> " +
            "               <option value='OR'>Oregon</option>  " +
            "               <option value='PA'>Pennsylvania</option> " +
            "               <option value='PR'>Puerto Rico</option> " +
            "               <option value='RI'>Rhode Island</option>" +
            "               <option value='SC'>South Carolina</option> " +
            "               <option value='SD'>South Dakota</option> " +
            "               <option value='TN'>Tennessee</option> " +
            "               <option value='TX'>Texas</option> " +
            "               <option value='UT'>Utah</option> " +
            "               <option value='VT'>Vermont</option> " +
            "               <option value='VI'>Virgin Islands</option>" +
            "               <option value='VA'>Virginia</option> " +
            "               <option value='WA'>Washington</option> " +
            "               <option value='WV'>West Virginia</option> " +
            "               <option value='WI'>Wisconsin</option> " +
            "               <option value='WY'>Wyoming</option> " +
            "           </select> " +
            "       </div> " +
            "   </div> " +
            "</div>"
        )

        if(required === 'Y'){
            $(inputElement).find('input').each(function(){
                $(this).attr('required', 'required')
            })
        }


        //IF INPUT HAS A MAX LENGTH
        if(maxLength !== undefined && maxLength !== null && maxLength.trim().length !== 0){
            $(inputElement).attr('maxLength', maxLength)
        }

        //IF INPUT HAS A ATTACH BUTTON
        if(attachments === 'Y'){
            var inputGroupDivContainer = $("<div class='input-group'></div>")
            var attachButtonHTML = $(
                "<span class='input-group-btn'>" +
                "   <button class='btn btn-primary attachButton' style='padding-left:6px;'>" +
                "       <i class='fa fa-fw fa-paperclip' aria-hidden='true' style='margin-right:4px;'>" +
                "       </i>Attach" +
                "   </button>" +
                "</span>"
            )

            //ATTACH BUTTONS ARE ON THE RIGHT, SO APPEND THE INPUT FIRST, AND THEN THE ATTACH BUTTON SECOND TO THE INPUT GROUP
            $(inputGroupDivContainer).append($(inputElement))
            $(inputGroupDivContainer).append($(attachButtonHTML))

            inputElement = $(inputGroupDivContainer)
        }



        //IF INPUT HAS A LEFT OR RIGHT INPUT SPAN
    }
    else{
        //QUESTION LABEL
        questionLabelElement= $("<label class='questionText'>" + questionText + "</label>")
        $(formGroupElem).append($(questionLabelElement))

        inputElement = $(
            "<input class='" + inputClass + "' " +
            "type='" + inputType + "' " +
            formatDataAttributeStringFromMap(inputDataAttr) + " " +
            "style='" + inputStyle + "' " +
            "id='" + qID + "' " +
            ">")
    }

    $(formGroupElem).append($(inputElement))

    //ADD ANY HIDDEN DIVS FOR THIS QUESTION
    if($(inputElement).find('.hasHiddenDiv').length > 0){
        var hiddenTriggerMap = jsonStringToObject(hiddenQuestionTriggerIDMap)


        var allHiddenQuestionContainer = $("<div class='hiddenDivContainer' style='display:none'></div>")

        //LOOP THROUGH ALL INPUTS IN THIS QUESTION WITH HIDDEN DIVS
        $(inputElement).find('.hasHiddenDiv').each(function(){
            var thisHiddenGroupName = ""
            var isCheckboxOrRadioGroup = false

            //IF THIS INPUT IS RADIO OR CHECKBOX USE THE GROUP NAME TO IDENTIFY THE HIDDEN GROUP
            if(inputType === 'radio' || inputType === 'checkbox'){
                thisHiddenGroupName = $(this).attr('name')
                isCheckboxOrRadioGroup = true
            }
            else{
                thisHiddenGroupName = $(this).attr('id')
            }

            var hiddenTriggerMapForThisInput = jsonStringToObject(hiddenTriggerMap[thisHiddenGroupName])

            var hiddenDivsTriggeredByThisInput = Object.keys(hiddenTriggerMapForThisInput)

            //LOOP THROUGH THE HIDDEN QUESTIONS FOR THIS INPUT
            for(var q=0;q<hiddenDivsTriggeredByThisInput.length;q++){
                var hiddenQuestionID = hiddenDivsTriggeredByThisInput[q]
                var hiddenQuestionElement = $(getNewSubmissionHiddenUWQuestion(hiddenQuestionID))

                var valuesThisDivIsUnhiddenArray = hiddenTriggerMapForThisInput[hiddenQuestionID]

                //ADD HIDDEN GROUP NAME TO HIDDEN QUESTION
                $(hiddenQuestionElement).attr('data-hiddengroupname', '' + thisHiddenGroupName + "_HiddenGroup")

                //ADD THE UNHIDE TRIGGER
                $(hiddenQuestionElement).attr('data-unhidetrigger', valuesThisDivIsUnhiddenArray.toString())

                //ADD HIDDEN QUESTION TO HIDDEN QUESTION CONTAINER
                $(allHiddenQuestionContainer).append( $(hiddenQuestionElement) )
            }


            //IF RADIO OR CHECKBOX DON'T NEED TO LOOP MORE THAN ONCE, ALL VALUES SHOULD BE IN THE TRIGGER MAP
            if(isCheckboxOrRadioGroup){
                return false
            }
        })

        //ADD HIDDEN QUESTIONS CONTAINER AFTER INPUT
        $(formGroupElem).append($(allHiddenQuestionContainer))
    }

    //FONT AWESOME ICON RIGHT SIDE
    if(faIconRight){
        var faIconRightElem = $("<i class='fa fa-" + faIconClass + "' aria-hidden='true'  style='" + faIconStyle + "'></i>")
        $(formGroupElem).append($(faIconRightElem))
    }



    //INSERT INTO CONTAINER
    $(questionContainerElem).html($(formGroupElem))

    if(options.closeButton){
        var closeButtonElement = $(closeButton)
        $(questionContainerElem).append($(closeButtonElement))
    }

    //WRAP QUESTION HTML IN TEMP DIV AND GET WHOLE HTML
    return $('<div>').append($(questionContainerElem).clone()).html()
}


//QUESTION BUILDERS FOR DATA MANAGEMENT PAGE
function getRequiredQuestionHTML(qID){
    if(getQuestionObjectByID(qID)){
        var options = {
            gridColumns: "2",
            containerClass: "requiredQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'",
            closeButton: true,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)
        return stringHTML
    }
}
function getUWQuestionHTML(qID){
    if(getQuestionObjectByID(qID)) {

        var options = {
            gridColumns: "2",
            containerClass: "uwQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'",
            closeButton: true,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)
        return stringHTML
    }
}
function getRequiredQuestionHTML_noCloseButton(qID){
    if(getQuestionObjectByID(qID)) {

        var options = {
            gridColumns: "2",
            containerClass: "requiredQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'",
            closeButton: false,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)
        return stringHTML
    }
}
function getRequiredQuestionHTML_noCloseButton_RatingBasisDataPage(qID){
    if(getQuestionObjectByID(qID)) {

        var options = {
            gridColumns: "3",
            containerClass: "requiredQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'",
            closeButton: false,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)
        return stringHTML
    }
}
function getUWQuestionHTML_noClosebutton(qID){
    if(getQuestionObjectByID(qID)) {

        var options = {
            gridColumns: "2",
            containerClass: "uwQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'",
            closeButton: false,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)
        return stringHTML
    }
}
function getNewSubmissionUWPreviewQuestion(qID, options){
    if(getQuestionObjectByID(qID)) {
        //DEFAULT VALUES
        var gridColumns = '12'
        var containerClass = " " + qID + ""
        var containerDataAttr = "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'"
        var closeButton = false
        var required = false
        var splitPanel = false


        //SET OPTIONS IF THEY EXIST
        if(options !== undefined){
            gridColumns = (typeof options.gridColumns === 'undefined') ? undefined : options.gridColumns
            containerClass = (typeof options.containerClass === 'undefined') ? containerClass : options.containerClass
            containerDataAttr = (typeof options.containerDataAttr === 'undefined') ? containerDataAttr : options.containerDataAttr
            closeButton = (typeof options.closeButton === 'undefined') ? closeButton : options.closeButton
            required = (typeof options.required === 'undefined') ? required : options.required
            splitPanel = (typeof options.splitPanel === 'undefined') ? splitPanel : options.splitPanel

        }

        var options = {
            gridColumns: gridColumns,
            containerClass: containerClass,
            containerDataAttr: containerDataAttr,
            closeButton: closeButton,
            required: required
        }

        var stringHTML = getQuestionHTML(qID, options)


        //SPLIT PANEL FORMAT
        if(splitPanel === true){
            var splitColumnContainer =
                "<div class='row uwQuestionRow'>" +
                "   <div class='col-xs-6 questionLeftColumn'>" + stringHTML +
                "   </div>" +
                "   <div class='col-xs-6 questionRightColumn'>"  +
                "   </div>" +
                "</div>"
            stringHTML = splitColumnContainer
        }


        return stringHTML
    }
}


//QUESTION BUILDERS FOR NEW SUBMISSION PAGE
function getNewSubmissionRequiredQuestion(qID){
    var questionObject = getQuestionObjectByID(qID)

    if(questionObject) {
        var gridsize = "4"
        var options = {
            gridColumns: gridsize,
            containerClass: "requiredQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' " +
                "data-weight='" + questionObject.weight + "' " +
                "data-inputtype='" + questionObject.inputType  + "'" +
                "data-gridsize='" + gridsize  + "'",
            closeButton: false,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)

        if(options.required === true){
            var tempElement = $(stringHTML).attr('required', 'true')

            stringHTML = $(tempElement).html()

        }

        return stringHTML
    }
}
function getNewSubmissionUWQuestion(qID, options){
    var questionObject = getQuestionObjectByID(qID)

    if(questionObject) {
        //DEFAULT VALUES
        var gridColumns = '12'
        var containerClass = "uwQuestion " + qID + ""
        var containerDataAttr = "data-questionid='" + qID + "' data-weight='" + questionObject.weight + "' data-inputtype='" + questionObject.inputType  + "'"
        var closeButton = false
        var required = false
        var splitPanel = true


        //SET OPTIONS IF THEY EXIST
        if(options !== undefined){
            gridColumns = (typeof options.gridColumns === 'undefined') ? undefined : options.gridColumns
            containerClass = (typeof options.containerClass === 'undefined') ? containerClass : options.containerClass
            containerDataAttr = (typeof options.containerDataAttr === 'undefined') ? containerDataAttr : options.containerDataAttr
            closeButton = (typeof options.closeButton === 'undefined') ? closeButton : options.closeButton
            required = (typeof options.required === 'undefined') ? required : options.required
            splitPanel = (typeof options.splitPanel === 'undefined') ? splitPanel : options.splitPanel

        }

        var options = {
            gridColumns: gridColumns,
            containerClass: containerClass,
            containerDataAttr: containerDataAttr,
            closeButton: closeButton,
            required: required
        }

        var stringHTML = getQuestionHTML(qID, options)


        //SPLIT PANEL FORMAT
        if(splitPanel === true){
            var splitColumnContainer =
                "<div class='row uwQuestionRow'>" +
                "   <div class='col-xs-6 questionLeftColumn'>" + stringHTML +
                "   </div>" +
                "   <div class='col-xs-6 questionRightColumn'>"  +
                "   </div>" +
                "</div>"
            stringHTML = splitColumnContainer
        }


        return stringHTML
    }
}

function getNewSubmissionHiddenUWQuestion(qID, options){
    if(getQuestionObjectByID(qID)) {
        //DEFAULT VALUES
        var gridColumns = '12'
        var containerClass = "uwQuestion " + qID + ""
        var containerDataAttr = "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'"
        var closeButton = false
        var required = false
        var splitPanel = true


        //SET OPTIONS IF THEY EXIST
        if(options !== undefined){
            gridColumns = (typeof options.gridColumns === 'undefined') ? undefined : options.gridColumns
            containerClass = (typeof options.containerClass === 'undefined') ? containerClass : options.containerClass
            containerDataAttr = (typeof options.containerDataAttr === 'undefined') ? containerDataAttr : options.containerDataAttr
            closeButton = (typeof options.closeButton === 'undefined') ? closeButton : options.closeButton
            required = (typeof options.required === 'undefined') ? required : options.required
            splitPanel = (typeof options.splitPanel === 'undefined') ? splitPanel : options.splitPanel

        }

        var options = {
            gridColumns: gridColumns,
            containerClass: containerClass,
            containerDataAttr: containerDataAttr,
            closeButton: closeButton,
            required: required
        }

        var stringHTML = getQuestionHTML(qID, options)


        //SPLIT PANEL FORMAT
        if(splitPanel === false){
            var splitColumnContainer =
                "<div class='row uwQuestionRow'>" +
                "   <div class='col-xs-6 questionLeftColumn'>" + stringHTML +
                "   </div>" +
                "   <div class='col-xs-6 questionRightColumn'>"  +
                "   </div>" +
                "</div>"
            stringHTML = splitColumnContainer
        }


        return stringHTML
    }
}
function getQuestionGroupContainer(questionGroupID){
    var questionGroupHTML =
        "<div class='row uwQuestionGroupRow'>" +
        "   <div class='col-xs-12 uwQuestionGroup' data-questiongroupid='" + questionGroupID + "'> " +
        "       <div class='' id='" + questionGroupID + "_QuestionGroupContainer'>" +
        "       </div>" +
        "   </div>" +
        "</div>"

    return questionGroupHTML
}

//OTHER STUFF
function formatDataAttributeStringFromMap(inputDataAttrJSON){
    var attrString = ""

    if(inputDataAttrJSON === undefined || inputDataAttrJSON === null || inputDataAttrJSON.trim().length === 0){

    }
    else{
        var attrMap = jsonStringToObject(inputDataAttrJSON)

        if(typeof attrMap === "string"){
            //ALREADY CAME AS FORMATTED DATA STRING
            attrString = attrMap
        }
        else if(typeof attrMap === "object"){
            var attrKeys = Object.keys(attrMap)

            for(var i=0;i<attrKeys.length;i++){
                var thisAttrKey = attrKeys[i]
                var thisAttrValue = attrMap[thisAttrKey]

                attrString = attrString + thisAttrKey + "='" + thisAttrValue + "' "
            }
        }

    }

    // console.log(attrString)

    return attrString
}
function getInputType(qID){
    var questionObject = getQuestionObjectByID(qID)

}
