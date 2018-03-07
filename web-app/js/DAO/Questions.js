function Question(options){
    this.CONSTANT_VALUES = {
        inputType: {
            validValues: {
                text: {
                    id: 'text',
                    displayText: 'Text',
                    questionTypes: {
                        basicText:{
                            id:'basicText',
                            displayText: 'Default',
                            classString: 'form-control questionAnswer showReview',
                            defaultPlaceholder: ""
                        },
                        email:{
                            id:'email',
                            displayText: 'Email',
                            classString: 'form-control questionAnswer showReview emailInput',
                            defaultPlaceholder: "name@email.com"
                        },
                        phone:{
                            id:'phone',
                            displayText: 'Phone Number',
                            classString: 'form-control questionAnswer phoneNumberMask',
                            defaultPlaceholder: "(123) 123-4567"
                        },
                        currency:{
                            id:'currency',
                            displayText: 'Currency',
                            classString: 'form-control questionAnswer showReview maskMoney',
                            defaultPlaceholder: "$0"
                        },
                        numeric:{
                            id:'numeric',
                            displayText: 'Numeric Only',
                            classString: 'form-control questionAnswer numericInputOnly',
                            defaultPlaceholder: "0"
                        },
                        percent:{
                            id:'percent',
                            displayText: 'Percent',
                            classString: 'form-control questionAnswer percentInput',
                            defaultPlaceholder: "0%"
                        }
                        
                    }
                },
                dropdown: {
                    id: 'dropdown',
                    displayText: 'Dropdown',
                    questionTypes: {
                        select:{
                            id:'select',
                            displayText: 'Default',
                            classString: 'form-control questionAnswer showReview'
                        }
                    }
                },
                radio: {
                    id: 'radio',
                    displayText: 'Radio Buttons',
                    questionTypes: {
                        radio:{
                            id:'radio',
                            displayText: 'Default',
                            classString: 'questionAnswer showReview'
                        }

                    }
                },
                checkbox: {
                    id: 'checkbox',
                    displayText: 'Checkbox',
                    questionTypes: {
                        checkbox:{
                            id:'checkbox',
                            displayText: 'Default',
                            classString: 'questionAnswer showReview'
                        }

                    }
                }
            }
        }
    }

    this.id = (options && options.id ? options.id : '' )
    this.questionType = (options && options.questionType ? options.questionType : 'basicText' )
    this.questionID = (options && options.questionID ? options.questionID : '' )
    this.questionText = (options && options.questionText ? options.questionText : '')
    this.labelStyle = (options && options.labelStyle ? options.labelStyle : '')

    //DIV CONTAINER
    this.gridSize = (options && options.gridSize ? options.gridSize : 'xs')
    this.gridColumns = (options && options.gridColumns ? options.gridColumns : '12')
    this.containerClass = (options && options.containerClass ? options.containerClass : '')
    this.containerDataAttr = (options && options.containerDataAttr ? options.containerDataAttr : '')
    this.containerStyle = (options && options.containerStyle ? options.containerStyle : '')

    //FORM GROUP CONTAINER
    this.formGroupClass = (options && options.formGroupClass ? options.formGroupClass : '')
    this.formGroupStyle = (options && options.formGroupStyle ? options.formGroupStyle : '')
    this.formGroupDataAttr = (options && options.formGroupDataAttr ? options.formGroupDataAttr : '')

    //INPUT
    this.inputType = (options && options.inputType ? options.inputType : 'text')
    this.inputClass = (options && options.inputClass ? options.inputClass : 'form-control questionAnswer showReview')
    this.inputDataAttr = (options && options.inputDataAttr ? options.inputDataAttr : '')
    this.inputStyle = (options && options.inputStyle ? options.inputStyle : '')
    this.required = (options && options.required ? options.required : '')
    this.attachments = (options && options.attachments ? options.attachments : '')
    this.disabled = (options && options.disabled ? options.disabled : '')
    this.htmlDataReviewName = (options && options.htmlDataReviewName ? options.htmlDataReviewName : '')
    this.htmlPlaceholder = (options && options.htmlPlaceholder ? options.htmlPlaceholder : '')
    this.maxLength = (options && options.maxLength ? options.maxLength : '')
    this.htmlCheckboxRadioValText = (options && options.htmlCheckboxRadioValText ? options.htmlCheckboxRadioValText : '')
    this.dropdownOptionsValText = (options && options.dropdownOptionsValText ? options.dropdownOptionsValText : '')
    this.multiColumnMap = (options && options.multiColumnMap ? options.multiColumnMap : '')
    this.defaultChecked = (options && options.defaultChecked ? options.defaultChecked : '')


    //INPUT GROUP STUFF
    this.inputAddOnLeft = (options && options.inputAddOnLeft ? options.inputAddOnLeft : '')
    this.inputAddOnRight = (options && options.inputAddOnRight ? options.inputAddOnRight : '')
    this.inputButtonText = (options && options.inputButtonText ? options.inputButtonText : '')
    this.inputAddOnText = (options && options.inputAddOnText ? options.inputAddOnText : '')

    //ICON
    this.faIconLeft = (options && options.faIconLeft ? options.faIconLeft : '')
    if(this.faIconLeft === false && options.faIconLeft === 'Y'){
        this.faIconLeft = true
    }
    this.faIconRight = (options && options.faIconRight ? options.faIconRight : '')
    if(this.thisfaIconRight === false && options.faIconRight === 'Y'){
        this.faIconRight = true
    }
    this.faIconClass = (options && options.faIconClass ? options.faIconClass : '')
    this.faIconStyle = (options && options.faIconStyle ? options.faIconStyle : '')

    //NON DATABASE PROPERTIES
    this.questionAnswer = (options && options.questionAnswer ? options.questionAnswer : '')

    //DATA VALIDATION FUNCTIONS
    this.inputType_IsValid = function(){
        //TODO: MAKE THIS USE THE CONSTANT VALID VALUES LATER
        if(this.inputType.trim().length > 0){
            return true
        }
        else{
            return false
        }
    }
    this.questionType_IsValid = function(){
        if( this.getQuestionTypes(this.inputType).indexOf( this.questionType ) > -1 ){
            return true
        }
        else{
            return false
        }
    }
    this.inputClass_IsValid = function(){
        var baseClassString = this.getQuestionTypeClassString(this.inputType, this.questionType)

        //CHECK IF THE BASE CLASS STRING IS STILL IN CLASS STRING, OTHER ENTRIES CAN EXIST BUT THE BASE MUST BE THERE
        if( this.inputClass.indexOf(baseClassString) > -1 ){
            return true
        }
        else{
            return false
        }
    }
    this.isValid = function(){
        //RUN ALL VALIDATIONS
        if( this.inputType_IsValid() &&
            this.questionType_IsValid() &&
            this.inputClass_IsValid()){
            return true
        }
        else{
            return false
        }

    }

    //DOM ELEMENT FUNCTIONS
    this.DOMElement = function(options){
        //SET FINAL VALUES
        var question = this
        question.id = (options && options.id ? options.id : this.id )
        question.questionType = (options && options.questionType ? options.questionType : this.questionType )
        question.questionID = (options && options.questionID ? options.questionID : this.questionID )
        question.questionText = (options && options.questionText ? options.questionText : this.questionText)
        question.labelStyle = (options && options.labelStyle ? options.labelStyle : this.labelStyle)

        //DIV CONTAINER
        question.gridSize = (options && options.gridSize ? options.gridSize : this.gridSize)
        question.gridColumns = (options && options.gridColumns ? options.gridColumns : this.gridColumns)
        question.containerClass = (options && options.containerClass ? options.containerClass : this.containerClass)
        question.containerDataAttr = (options && options.containerDataAttr ? options.containerDataAttr : this.containerDataAttr )
        question.containerStyle = (options && options.containerStyle ? options.containerStyle : this.containerStyle)

        //FORM GROUP CONTAINER
        question.formGroupClass = (options && options.formGroupClass ? options.formGroupClass : this.formGroupClass)
        question.formGroupStyle = (options && options.formGroupStyle ? options.formGroupStyle : this.formGroupStyle)
        question.formGroupDataAttr = (options && options.formGroupDataAttr ? options.formGroupDataAttr : this.formGroupDataAttr)

        //INPUT
        question.inputType = (options && options.inputType ? options.inputType : this.inputType)
        question.inputClass = (options && options.inputClass ? options.inputClass : this.inputClass)
        question.inputDataAttr = (options && options.inputDataAttr ? options.inputDataAttr : this.inputDataAttr)
        question.inputStyle = (options && options.inputStyle ? options.inputStyle : this.inputStyle)
        question.required = (options && options.required ? options.required : this.required)
        question.attachments = (options && options.attachments ? options.attachments : this.attachments)
        question.disabled = (options && options.disabled ? options.disabled : this.disabled)
        question.htmlDataReviewName = (options && options.htmlDataReviewName ? options.htmlDataReviewName : this.htmlDataReviewName)
        question.htmlPlaceholder = (options && options.htmlPlaceholder ? options.htmlPlaceholder : this.htmlPlaceholder)
        question.maxLength = (options && options.maxLength ? options.maxLength : this.maxLength)
        question.htmlCheckboxRadioValText = (options && options.htmlCheckboxRadioValText ? options.htmlCheckboxRadioValText : this.htmlCheckboxRadioValText)
        question.dropdownOptionsValText = (options && options.dropdownOptionsValText ? options.dropdownOptionsValText : this.dropdownOptionsValText)
        question.multiColumnMap = (options && options.multiColumnMap ? options.multiColumnMap : this.multiColumnMap)
        question.defaultChecked = (options && options.defaultChecked ? options.defaultChecked : this.defaultChecked)


        //INPUT GROUP STUFF
        question.inputAddOnLeft = (options && options.inputAddOnLeft ? options.inputAddOnLeft : this.inputAddOnLeft)
        question.inputAddOnRight = (options && options.inputAddOnRight ? options.inputAddOnRight : this.inputAddOnRight)
        question.inputButtonText = (options && options.inputButtonText ? options.inputButtonText : this.inputButtonText)
        question.inputAddOnText = (options && options.inputAddOnText ? options.inputAddOnText : this.inputAddOnText)

        //ICON
        question.faIconLeft = (options && options.faIconLeft ? options.faIconLeft : this.faIconLeft)
        if(question.faIconLeft === false && options.faIconLeft === 'Y'){
            question.faIconLeft = true
        }
        question.faIconRight = (options && options.faIconRight ? options.faIconRight : this.faIconRight)
        if(question.thisfaIconRight === false && options.faIconRight === 'Y'){
            question.faIconRight = true
        }
        question.faIconClass = (options && options.faIconClass ? options.faIconClass : this.faIconClass)
        question.faIconStyle = (options && options.faIconStyle ? options.faIconStyle : this.faIconStyle)

        //CONTAINER ELEMENT SETUP
        var questionContainerElem = $(
            "<div class='col-" + question.gridSize + "-" + question.gridColumns + " " + question.containerClass + "' " +
                question.formatDataAttributeStringFromMap(question.containerDataAttr) + "" +
            "   style='" + question.containerStyle + "'" +
            "> " +
            "</div>")


        //FORM GROUP CONTAINER SETUP
        var formGroupElem = $(
            "<div class='form-group " + question.formGroupClass + "' " +
            "   style='" + question.formGroupStyle + "' " +
            "   " + question.formatDataAttributeStringFromMap(question.formGroupDataAttr) +
            ">" +
            "</div> ")

        //FONT AWESOME ICON, LEFT
        if(question.faIconLeft){
            var faIconLeftElem = $("<i class='fa fa-" + question.faIconClass + "' aria-hidden='true'  style='" + question.faIconStyle + "'></i>")
            $(formGroupElem).prepend($(faIconLeftElem))
        }

        //INPUT ELEMENT SETUP
        var inputElement
        var questionLabelElement
        if(question.inputType === 'text' || question.inputType === 'number'){
            //QUESTION LABEL
            questionLabelElement= $(
                "<label class='questionText control-label' " +
                "   style='" + question.labelStyle + " " +
                "'>" +
                    question.questionText +
                "</label>"
            )
            $(formGroupElem).append($(questionLabelElement))

            inputElement = $(
                "<input class='" + question.inputClass + "' " +
                "   type='" + question.inputType + "' " +
                "   data-reviewName='" + question.htmlDataReviewName + "' " +
                    question.formatDataAttributeStringFromMap(question.inputDataAttr) + " " +
                "   style='" + question.inputStyle + "' " +
                "   id='" + question.questionID + "' " +
                "   placeholder='" + question.htmlPlaceholder + "' " +
                "   value='" + question.questionAnswer + "' " +
                ">")

            //IF INPUT HAS A MAX LENGTH
            if(question.maxLength !== undefined && question.maxLength !== null && question.maxLength.trim().length !== 0){
                $(inputElement).attr('maxLength', question.maxLength)
            }

            //IF INPUT HAS A ATTACH BUTTON
            if(question.attachments === 'Y'){
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

            if(question.inputAddOnLeft === 'Y'){
                var inputGroupDivContainer = $("<div class='input-group'></div>")
                var inputAddOnHTML = $(
                    "<span class='input-group-addon'>" + question.inputAddOnText +
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
        else if(question.inputType === 'multiColumnInput'){
            //QUESTION LABEL
            var tempMultiRowContainer = $('<div></div>')

            var tempFormGroupElem = $("<div class='form-group col-xs-12" + "' style='padding-left:2px; padding-right:2px; margin-bottom:0px'>" + "</div> ")
            questionLabelElement= $("<label class='questionText control-label'>" + question.questionText + "</label>")
            $(tempFormGroupElem).append($(questionLabelElement))
            $(tempMultiRowContainer).append( $(tempFormGroupElem) )

            if( question.multiColumnMap ){
                var multiColumnMapObject = jsonStringToObject(question.multiColumnMap)
                var columnArray = Object.keys(multiColumnMapObject)
                var thisRowContainerElement = $(
                    "<div class='multiRowContainer' style='margin-bottom:15px;'>" +
                    "</div>")
                var thisRowElement = $("<div class='row col-xs-12 multiRow'></div>")

                for(var i=0; i<columnArray.length;i++){

                    var thisColumnName = columnArray[i]
                    var thisColumnMap = jsonStringToObject(question.multiColumnMap)[thisColumnName]
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
        else if(question.inputType === 'textarea'){
            //QUESTION LABEL
            questionLabelElement= $("<label class='questionText control-label'>" + question.questionText + "</label>")
            $(formGroupElem).append($(questionLabelElement))

            inputElement = $(
                "<textarea class='" + question.inputClass + "' " +
                "data-reviewName='" + question.htmlDataReviewName + "' " +
                question.formatDataAttributeStringFromMap(question.inputDataAttr) + " " +
                "style='" + question.inputStyle + "' " +
                "id='" + question.questionID + "' " +
                "placeholder='" + question.htmlPlaceholder + "' " +
                ">")

            if(question.maxLength !== undefined && question.maxLength !== null && question.maxLength.trim().length !== 0){
                $(inputElement).attr('maxLength',question.maxLength)
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
        else if(question.inputType === 'checkbox'){
            //QUESTION LABEL
            questionLabelElement= $("<label class='questionText control-label'>" + question.questionText + "</label>")
            $(formGroupElem).append($(questionLabelElement))

            var checkboxOptionValTextMap = jsonStringToObject(question.htmlCheckboxRadioValText)
            var checkboxOptionValueArray = Object.keys(checkboxOptionValTextMap)
            var defaultChecked = question.defaultChecked

            var allCheckboxesElements = $("<div><br></div>")
            for(var i=0;i<checkboxOptionValueArray.length;i++){
                var thisCheckboxOptionValue = checkboxOptionValueArray[i]
                var thisCheckboxOptionText = checkboxOptionValTextMap[thisCheckboxOptionValue]

                inputElement = $(
                    "<label class='checkboxVerticalLayout questionOptionLabel control-label'>" +
                    "   <input type='" + question.inputType + "' class='" + question.inputClass + "' " +
                    "       data-reviewName='" + question.htmlDataReviewName + "' " +
                    "       value='" + thisCheckboxOptionValue + "'" +
                    "       name='" + question.questionID + "_CheckboxGroup'" +
                    "       id='" + question.questionID + "_" + thisCheckboxOptionValue + "'/> " + thisCheckboxOptionText +
                    "</label>" +
                    "<br>"
                )

                if(defaultChecked != null && defaultChecked === thisCheckboxOptionValue){
                    $(inputElement).attr('checked', 'checked')
                }

                $(allCheckboxesElements).append($(inputElement))
            }
            var allCheckboxesHTML = $(allCheckboxesElements).html()
            inputElement = $(allCheckboxesHTML)
        }
        else if(question.inputType === 'radio'){
            //QUESTION LABEL
            questionLabelElement= $("<label class='questionText control-label'>" + question.questionText + "</label>")
            $(formGroupElem).append($(questionLabelElement))

            var radioOptionValTextMap = jsonStringToObject(question.htmlCheckboxRadioValText)
            var radioOptionValueArray = Object.keys(radioOptionValTextMap)
            var defaultChecked = question.defaultChecked

            var allRadioElements = $("<div><br></div>")

            for(var i=0;i<radioOptionValueArray.length;i++){
                var thisRadioOptionValue = radioOptionValueArray[i]
                var thisRadioOptionText = radioOptionValTextMap[thisRadioOptionValue]

                inputElement = $(
                    "<label class='radio-inline questionOptionLabel'>" +
                    "   <input type='" + question.inputType + "' class='" + question.inputClass + "' " +
                    "       data-reviewName='" + question.htmlDataReviewName + "' " +
                    "       name='" + question.questionID + "_RadioGroup' " +
                    "       value='" + thisRadioOptionValue + "'" +
                    "       id='" + question.questionID + "_" + thisRadioOptionValue + "'" +
                    "       style='height:auto;'/> " + thisRadioOptionText +
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
        else if(question.inputType === 'dropdown'){
            //QUESTION LABEL
            questionLabelElement= $("<label class='questionText control-label'>" + question.questionText + "</label>")
            $(formGroupElem).append($(questionLabelElement))

            inputElement = $(
                "<select type='" + question.inputType + "' class='" + question.inputClass + "' " +
                "   data-reviewName='" + question.htmlDataReviewName + "' " +
                "   id='" + question.questionID + "' " +
                "> " +
                "</select>"
            )

            if(question.dropdownOptionsValText !== null){
                var dropdownOptionsValTextMap = jsonStringToObject(question.dropdownOptionsValText)
                var dropdownOptionsValueArray = Object.keys(dropdownOptionsValTextMap)

                if(dropdownOptionsValueArray[0] !== 'invalid'){
                    optionElement = $("<option value='invalid' >Select One</option>")
                    $(inputElement).append($(optionElement))
                }

                for(var i=0;i<dropdownOptionsValueArray.length;i++){
                    var thisOptionValue = dropdownOptionsValueArray[i]
                    var thisOptionText = dropdownOptionsValTextMap[thisOptionValue]

                    var selectedText = ""
                    if(question.questionAnswer === thisOptionValue){
                        selectedText = "selected"
                    }


                    var optionElement = $("<option value='" + thisOptionValue + "' " + selectedText + " >" + thisOptionText + "</option>")

                    $(inputElement).append($(optionElement))
                }
            }



        }
        else if(question.inputType === 'custom_mailingAddress'){
            //QUESTION LABEL
            questionLabelElement= $("<label class='questionText control-label'>" + question.questionText + "</label>")
            $(formGroupElem).append($(questionLabelElement))

            inputElement = $(
                "<div class='addressAutoCompleteContainer '> " +
                "   <div class = 'form-group'> " +
                "           <input class='form-control addressAutoCompleteInput streetAddressInput ' type='text' placeholder='Street address' id='" + question.questionID + "_StreetAddress' onFocus='geolocate()' /> " +
                "   </div> " +
                "   <div class='form-group'> " +
                "       <input class='form-control autoCompleteCity cityInput' type='text' placeholder = 'City' id='" + question.questionID + "_City'  /> " +
                "   </div> " +
                "   <div class='row'> " +
                "       <div class='form-group col-xs-6'> " +
                "           <input class='form-control autoCompleteZipcode zipcodeInput' type='text' placeholder = 'Zip Code' id='" + question.questionID + "_Zipcode' data-lengthrequired='5' maxlength='6'/> " +
                "       </div> " +
                "      <div class='form-group col-xs-6'> " +
                "           <select class='form-control autoCompleteState stateAddressInput' data-reviewName='State' id='" + question.questionID + "_State' > " +
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


            //IF INPUT HAS A MAX LENGTH
            if(question.maxLength !== undefined && question.maxLength !== null && question.maxLength.trim().length !== 0){
                $(inputElement).attr('maxLength', question.maxLength)
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
            questionLabelElement= $("<label class='questionText control-label'>" + question.questionText + "</label>")
            $(formGroupElem).append($(questionLabelElement))

            inputElement = $(
                "<input class='" + question.nputClass + "' " +
                "type='" + question.inputType + "' " +
                question.formatDataAttributeStringFromMap(question.inputDataAttr) + " " +
                "style='" + question.inputStyle + "' " +
                "id='" + question.questionID + "' " +
                ">")
        }

        if(question.required === 'Y'){
            $(inputElement).find('input').each(function(){
                $(this).attr('required', 'required')
            })
            $(inputElement).find('select').each(function(){
                $(this).attr('required', 'required')
            })
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
                if(question.inputType === 'radio' || question.inputType === 'checkbox'){
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
        if(question.faIconRight){
            var faIconRightElem = $("<i class='fa fa-" + question.faIconClass + "' aria-hidden='true'  style='" + question.faIconStyle + "'></i>")
            $(formGroupElem).append($(faIconRightElem))
        }



        //INSERT INTO CONTAINER
        $(questionContainerElem).html($(formGroupElem))

        if(question.closeButton){
            var closeButtonElement = $(closeButton)
            $(questionContainerElem).append($(closeButtonElement))
        }

        //WRAP QUESTION HTML IN TEMP DIV AND GET WHOLE HTML
        return $('<div>').append($(questionContainerElem).clone()).html()
    }
    this.questionBuilderPreview_DOMElement = function(){
        //ANY VALUES SET HERE WILL OVERRIDE CURRENT OBJECTS VALUE
        var options = {
            gridSize: "6"
        }

        this.DOMElement(options)
    }

    //DOM ELEMENT HELPER FUNCTIONS
    this.formatDataAttributeStringFromMap = function(inputDataAttrJSON){
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

        return attrString
    }

    //DATA CHANGES FUNCTIONS
    this.setProperty = function(property, value){
        var oldValue = this[property]

        this[property] = value

        //IF THE INPUT TYPE CHANGES, RESET THE QUESTION TYPE
        if(property === 'inputType'){
            //CHANGE QUESTION TYPE TO DEFAULT
            this.questionType = this.getQuestionTypes(value)[0]
        }

        //IF INPUT TYPE OR QUESTION TYPE CHANGES
        if(property === 'inputType' || property === 'questionType'){
            //RESET TO THE BASE CLASS STRING
            this.resetQuestionClassString()

            //RESET THE PLACEHOLDER VALUE
            this.resetHTMLPlaceholder()
        }

        //IF CURRENCY, NEED TO ADD DATA ATTRIBUTES FOR MASK MONEY
        if(property === 'questionType' || value === 'currency'){
            this.inputDataAttr =  JSON.stringify({
                "data-precision": "0",
                "data-prefix": "$"
            })
        }



        if(this.isValid()){
            return true
        }
        else{
            this[property] = oldValue
            return false
        }

    }
    this.resetQuestionClassString = function(){
        this.inputClass = this.getQuestionTypeClassString(this.inputType, this.questionType)
    }
    this.resetHTMLPlaceholder = function(){
        this.htmlPlaceholder = this.getDefaultHTMLPlaceholder(this.inputType, this.questionType)
    }


    //CONSTANT VALUE LOOKUP FUNCTIONS
    this.getConstantValuesForPropertyName = function(propertyName){
        return this.CONSTANT_VALUES[propertyName]
    }
    this.getValidValues = function(propertyName){
        return Object.keys( this.getConstantValuesForPropertyName(propertyName).validValues )
    }
    this.getInputTypeDisplayText = function(inputTypeID){
        return this.getConstantValuesForPropertyName('inputType').validValues[inputTypeID].displayText
    }
    this.getQuestionTypes = function(inputTypeID){
        return Object.keys( this.getConstantValuesForPropertyName('inputType').validValues[inputTypeID].questionTypes )
    }
    this.getQuestionTypeDisplayText = function(inputTypeID, questionTypeID){
        return this.getConstantValuesForPropertyName('inputType').validValues[inputTypeID].questionTypes[questionTypeID].displayText
    }
    this.getQuestionTypeClassString = function(inputTypeID, questionTypeID){
        return this.getConstantValuesForPropertyName('inputType').validValues[inputTypeID].questionTypes[questionTypeID].classString
    }
    this.getDefaultHTMLPlaceholder = function(inputTypeID, questionTypeID){
        if( this.getConstantValuesForPropertyName('inputType').validValues[inputTypeID].questionTypes[questionTypeID].defaultPlaceholder ){
            return this.getConstantValuesForPropertyName('inputType').validValues[inputTypeID].questionTypes[questionTypeID].defaultPlaceholder
        }
        else{
            return ""
        }
    }

    //LISTENER AND INIT FUNCTIONS
    this.datePickerInit = function(){
        //DATE PICKER SETUP
        var date_input = $('.datepicker'); //our date input has the name "date"
        var container = $('#page-content-wrapper');
        var options = {
            assumeNearbyYear: true,
            autoclose: true,
            format: 'mm/dd/yyyy',
            startDate: '01/01/2000',
            container: container,
            todayHighlight: true,
            orientation: "auto bottom",
            enableOnReadonly: false
        };
        date_input.datepicker(options);
    }
    this.maskMoneyInit = function(){
        $('.maskMoney').each(function (){
            var options = {}

            if( $(this).attr('data-prefix') ){
                options.prefix = $(this).attr('data-prefix')
            }
            if( $(this).attr('data-precision') ){
                options.precision = $(this).attr('data-precision')
            }
            if( $(this).attr('data-suffix') ){
                options.suffix = $(this).attr('data-suffix')
            }
            if( $(this).attr('data-affixesStay') ){
                options.affixesStay = $(this).attr('data-affixesStay')
            }
            if( $(this).attr('data-thousands') ){
                options.thousands = $(this).attr('data-thousands')
            }
            if( $(this).attr('data-decimal') ){
                options.decimal = $(this).attr('data-decimal')
            }
            if( $(this).attr('data-allowZero') ){
                options.allowZero = $(this).attr('data-allowZero')
            }
            if( $(this).attr('data-allowNegative') ){
                options.allowNegative = $(this).attr('data-allowNegative')
            }

            $(this).maskMoney(options)
            $(this).maskMoney('mask')
        });
    }
    this.checkboxHiddenDivInit = function(){
        $(document.body).on('change', '.checkboxHiddenDiv', function(e) {
            if( $(this).is(':checked')){
                $(this).closest('.checkboxAndHiddenDivContainer').find('.hiddenContainer').css('display', '')
            }
            else{
                $(this).closest('.checkboxAndHiddenDivContainer').find('.hiddenContainer').css('display', 'none')
            }
        });
    }
    this.checkboxNoneOfAboveListener = function(){
        $(document.body).on('change', 'input[type="checkbox"]', function(e) {
            var checkboxGroupName = $(this).attr('name')

            if($(this).val() === 'none' && $(this).is(':checked')){
                $('input[type="checkbox"][name="' + checkboxGroupName + '"]:visible:checked').prop('checked', false)
                $(this).prop('checked', true)
            }
            else if($(this).val() !== 'none' && $(this).is(':checked')){
                $('input[type="checkbox"][name="' + checkboxGroupName + '"][value="none"]').prop('checked', false)

            }
        });
    }
    this.radioHiddenDivInit = function(){
        $(document.body).on('change', '.radioWithHiddenDiv_Radio', function(e) {
            //GET GROUP
            var groupName = $(this).attr('name')

            var radioGroupCheckedValue = $("input:radio[name ='" + groupName + "']:checked").val();

            //RESET ALL HIDDEN DIVS, HIDE ALL
            $(this).closest('.radioWithHiddenDiv_Container').children('.radioWithHiddenDiv_HiddenDivContainer').css('display','none')
            $(this).closest('.radioWithHiddenDiv_Container').children('.radioWithHiddenDiv_HiddenDivContainer').children('.radioHiddenDiv').css('display','none')

            //SHOW THE SELECTED HIDDEN DIV
            $(this).closest('.radioWithHiddenDiv_Container').children('.radioWithHiddenDiv_HiddenDivContainer').css('display','')
            $(this).closest('.radioWithHiddenDiv_Container').children('.radioWithHiddenDiv_HiddenDivContainer').children('#' + groupName + 'Container_' + radioGroupCheckedValue).css('display', '')

        });
    }
    this.hasHiddenDivInputInit = function(){
        $(document.body).on('change', '.hasHiddenDiv', function(e) {
            var isRadioOrCheckbox = false
            var hiddenGroupName = ""
            var inputValue = ""

            var inputType = $(this).attr('type')
            if(inputType === 'checkbox' || inputType === 'radio'){
                isRadioOrCheckbox = true
                hiddenGroupName = $(this).attr('name') + "_HiddenGroup"
                inputValue = $("input[name='" + $(this).attr('name') + "']:checked").val()
            }else{
                hiddenGroupName = $(this).attr('id')
                inputValue = $(this).val()
            }

            //HIDE ALL IN GROUP FIRST
            $("*[data-hiddengroupname='" + hiddenGroupName + "']").closest('.hiddenDivContainer').css('display', 'none')

            //SHOW ONLY DIVS TRIGGERED BY INPUT VALUE
            $("*[data-hiddengroupname='" + hiddenGroupName + "'][data-unhidetrigger='" + inputValue + "']").closest('.hiddenDivContainer').css('display', '')
        });
    }
    this.closeButtonListener = function(){
        $(document.body).on('click', 'button.close', function(e) {
            $(this).parent().remove()
        });
    }
    this.maskPercentInputInit = function(){
        $(document.body).off('change', 'input.percentInput').on('change', 'input.percentInput', function(e) {
            var originalValueString = $(this).val()

            var floatValue = parseFloat( numeral(originalValueString).format('0[.]0') )

            if(floatValue > 100){
                floatValue = 100
            }
            // var formattedPercent = numeral(originalValueString).format('0') + "%"
            var formattedPercent = floatValue + "%"
            $(this).val( formattedPercent )
            e.stopPropagation()
            e.preventDefault()
        });
    }
    this.capitalizeFirstLettersInputInit = function(){
        $(document.body).on('change', 'input.capitalizeFirstLetters', function(e) {
            var originalString = $(this).val()
            var capitalizedFirstLettersString = capitalizeFirstLetters( originalString )
            // console.log(capitalizedFirstLettersString)
            $(this).val( capitalizedFirstLettersString )
        });
    }
    this.emailInputInit = function(){
        $(document.body).on('change', 'input.emailInput', function(e) {
            function emailQuickValidateInput(emailInput){
                if (ValidateEmail($(emailInput).val()) === false) {
                    markClosestFormGroup_Error(emailInput)
                }
                else {
                    markClosestFormGroup_Success(emailInput)
                }
            }
        });
    }
    this.numericInputOnlyInit = function(){
        $(document.body).off('change', 'input.numericInputOnly').on('change', 'input.numericInputOnly', function(e) {
            var originalString = $(this).val()
            var stringWithOnlyNumbers = removeAllNonNumbersFromString(originalString)

            $(this).val( stringWithOnlyNumbers )
        });

    }
    this.noSpacesInputInit = function(){
        $(document.body).on('change', '.noSpacesInput', function(e) {
            var originalString = $(this).val().trim()

            $(this).val(replaceAllSpacesWith(originalString, ""))
        });
    }
    this.phoneNumberMaskInit = function(){
        //MASK PHONE NUMBER FORMAT
        $(document.body).on('focus', '.phoneNumberMask', function () {
            $(".phoneNumberMask").mask("(999) 999-9999");
        });
    }
    this.multiRowInputInit = function(){
        $(document.body).off('click', 'button.multiRowInputAddButton').on('click', 'button.multiRowInputAddButton', function(e) {
            var thisRow = $(this).closest('.multiRow')
            var multiRowContainer = $(this).closest('.multiRowContainer')

            //clone and clear
            var newRow = $(thisRow).clone()
            $(newRow).find('input').each(function(){
                $(this).val("")
            })

            $(thisRow).after($(newRow))

            initializeGlobalListeners()

        });

        $(document.body).off('click', 'button.multiRowInputRemoveButton').on('click', 'button.multiRowInputRemoveButton', function(e) {
            var thisRow = $(this).closest('.multiRow')
            var multiRowContainer = $(this).closest('.multiRowContainer')

            //DELETE ONLY IF MORE THAN ONE ROW
            if( $(multiRowContainer).find('.multiRow').length > 1){
                $(thisRow).remove()

            }

        });
    }
    this.initListeners = function(){
        this.datePickerInit()
        this.maskMoneyInit()
        this.checkboxHiddenDivInit()
        this.checkboxNoneOfAboveListener()
        this.radioHiddenDivInit()
        this.hasHiddenDivInputInit()
        this.closeButtonListener()
        this.maskPercentInputInit()
        this.capitalizeFirstLettersInputInit()
        this.emailInputInit()
        this.numericInputOnlyInit()
        this.noSpacesInputInit()
        this.phoneNumberMaskInit()
        this.multiRowInputInit()
    }

    //DB FUNCTIONS
    this.save = function(){
        console.log( this )

        $.ajax({
            method: "POST",
            url: "/Data/saveQuestion",
            data: {
                question: JSON.stringify( this )
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    refreshQuestionCategories()
                    refreshQuestions()
                    // alert("Saved")
                    setFooterStatusUpToDate()
                    updateQuestionPreview(questionID)
                }
                else if(msg === "Error"){
                    // alert("Error Saving")
                    setFooterStatusSaveError()
                }
                else{
                    alert(msg)
                }
            });
    }

    function saveQuestionChanges(questionID){
        //CHECK IF ALL REQUIRED FIELDS ARE FILLED
        var questionEditRow = $(".questionEditRow[data-questionid='" + questionID + "']")
        var questionDetailContainer = $(questionEditRow).find('.questionDetailContainer')
        var questionAttachmentsInput = $(questionEditRow).find('.questionAttachmentsCheckbox')
        var questionID = $(questionDetailContainer).find('.questionIDInput').val()
        var questionMap = getQuestionObjectFromQuestionID(questionID)

        questionMap.id = $(questionEditRow).attr('data-id')
        questionMap.questionID = $(questionDetailContainer).find('.questionIDInput').val()
        questionMap.questionType = $(questionDetailContainer).find('.questionTypeDropdown').val()
        questionMap.questionText = $(questionDetailContainer).find('.questionTextInput').val()
        questionMap.category = $(questionDetailContainer).closest('.questionCategoryPanelBody').attr('data-categorycode')

        // questionMap.weight = $(questionEditRow).index()
        // questionMap.hiddenFlag = "N"
        // questionMap.gridSize = "xs"
        // questionMap.gridColumns = "3"
        // questionMap.containerClass = ""
        // questionMap.containerDataAttr = ""
        // questionMap.containerStyle = ""
        // questionMap.inputClass = "form-control questionAnswer showReview"
        // questionMap.inputType = "text"
        // questionMap.inputStyle = ""
        // questionMap.inputDataAttr = ""
        // questionMap.required = "N"
        // questionMap.disabled = "N"
        // questionMap.inputAddOnLeft = "N"
        // questionMap.inputAddOnRight = "N"
        // questionMap.inputButtonText = ""
        // questionMap.inputAddOnText = ""
        // questionMap.faIconLeft = "N"
        // questionMap.faIconRight = "N"
        // questionMap.faIconClass = ""
        // questionMap.faIconStyle = ""
        // questionMap.formGroupClass = ""
        // questionMap.formGroupStyle = ""
        // questionMap.formGroupDataAttr = ""
        // questionMap.htmlCheckboxRadioValText = ""
        questionMap.htmlDataReviewName = questionMap.questionText
        // questionMap.htmlPlaceholder = ""
        // questionMap.attachments = "N"


        if(questionMap.questionID.length === 0 || questionMap.questionText.length === 0 || questionMap.questionCategory === 'invalid'){
            alert("Complete All Fields")
        }
        else{
            if(questionMap.questionType === 'invalid'){

            }
            else if(questionMap.questionType === 'basicText'){
                questionMap.inputType = 'text'
            }
            else if(questionMap.questionType === 'textarea'){
                questionMap.inputType = 'textarea'
            }
            else if(questionMap.questionType === 'custom_mailingAddress'){
                questionMap.inputType = 'custom_mailingAddress'
            }
            else if(questionMap.questionType === 'datepicker'){
                questionMap.inputType = 'text'
            }
            else if(questionMap.questionType === 'checkbox'){
                questionMap.inputType = 'checkbox'
                questionMap.htmlCheckboxRadioValText = buildCheckboxRadioValTextMap(questionID)
            }
            else if(questionMap.questionType === 'radio'){
                questionMap.inputType = 'radio'
                questionMap.htmlCheckboxRadioValText = buildCheckboxRadioValTextMap(questionID)
            }
            else if(questionMap.questionType === 'dropdown'){
                questionMap.inputType = 'dropdown'
                questionMap.dropdownOptionsValText = buildDropdownOptionsValTextMap(questionID)
            }
            else if(questionMap.questionType === 'multiColumn'){
                questionMap.inputType = 'multiColumnInput'
                questionMap.multiColumnMap = buildMultiColumnMap(questionID)
            }

            //ATTACHMENTS
            if( questionAttachmentsInput.is(':visible') && questionAttachmentsInput.prop('checked') === true ){
                questionMap.attachments = "Y"
            }

            setFooterStatusSaving()
            $.ajax({
                method: "POST",
                url: "/Admin/saveQuestionChanges",
                data: {
                    questionMap: JSON.stringify( questionMap )
                }
            })
                .done(function(msg) {
                    if(msg === "Success"){
                        refreshQuestionCategories()
                        refreshQuestions()
                        // alert("Saved")
                        setFooterStatusUpToDate()
                        updateQuestionPreview(questionID)
                    }
                    else if(msg === "Error"){
                        // alert("Error Saving")
                        setFooterStatusSaveError()
                    }
                    else{
                        alert(msg)
                    }
                });
        }
    }


    this.initListeners()
}

function QuestionBuilder(options){
    this.questionObject = (options && options.questionObject ? options.questionObject : new Question() )

    //DOM ELEMENTS
    this.DOMElement = function(){
        var htmlString = "" +
            "   <div class='modal-dialog' role='document' id='questionBuilderModalDialog'> " +
            "       <div class='modal-content'> " +
            "           <div class='modal-header'> " +
            "               <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button> " +
            "               <h4 class='modal-title'>Create A Question</h4> " +
            "           </div> " +
            "           <div class='modal-body'> " +
            "               <div class='row'>" +
                                this.questionBuilderInputTypeDropdown_DOMElement() +
            "               </div>" +
            "               <div class='row'>" +
                                this.questionBuilder_QuestionType_DOMElement(this.questionObject.inputType) +
            "               </div>" +
            "               <div class='row'>" +
                                this.questionBuilderQuestionTextInput_DOMElement() +
            "               </div>" +
            "               <div class='row'>" +
                                this.questionBuilderInput_hiddenFlag_DOMElement() +
            "               </div>" +
            "               <div class='row'>" +
                                this.questionBuilderInput_required_DOMElement() +
            "               </div>" +
            "               <div class='row'>" +
                                this.questionBuilderInput_attachments_DOMElement() +
            "               </div>" +
            "               <div class='well' id='inputTypeFormContainer' style='margin-top:20px;'>"

        if(this.questionObject.inputType === 'text'){
            htmlString = htmlString +
                this.inputTypeForm_text_DOMElement()
        }
        else if(this.questionObject.inputType === 'dropdown'){
            htmlString = htmlString +
                this.inputTypeForm_dropdown_DOMElement()
        }
        else if(this.questionObject.inputType === 'radio'){
            htmlString = htmlString +
                this.inputTypeForm_radio_DOMElement()
        }
        else if(this.questionObject.inputType === 'checkbox'){
            htmlString = htmlString +
                this.inputTypeForm_checkbox_DOMElement()
        }

        htmlString = htmlString +
            "               </div>" +
            "               <div class='row' style='margin-top:40px;'>" +
            "                   <div class='col-xs-12'>" +
            "                       <label>Question Preview</label>" +
            "                   </div>" +
            "               </div>" +
            "               <div class='well' id='questionPreviewContainer' >" +
                                this.questionPreview_DOMElement() +
            "               </div>" +
            "               <div class='row'>" +
            "                   <div class='col-xs-12'>" +
            "                       <button type='button' class='btn btn-xs pull-right btn-default questionBuilder_CancelQuestionButton' style='font-size:14px'> Cancel" +
            "                       </button>" +
            "                       <button type='button' class='btn btn-xs pull-right btn-success questionBuilder_SaveQuestionButton' style='font-size:14px;'> Save" +
            "                       </button>" +
            "                   </div>"
            "               </div>" +
            "           </div> " +
            "       </div> " +
            "   </div> "

        return htmlString
    }

    //GLOBAL QUESTION INPUTS
    this.questionBuilderInputTypeDropdown_DOMElement = function(){
        var htmlString = "" +
            "<div class='col-xs-6'>" +
            "   <div class='form-group'>" +
            "       <label>Question Format</label>" +
            "       <select class='form-control questionBuilderInput' id='questionBuilder_QuestionTypeDropdown' " +
            "           data-class='Question' " +
            "           data-id='" + this.questionObject.id + "' " +
            "           data-property='inputType' " +
            // "           value='" + this.questionObject.questionAnswer + "' " +
            "       >"



        var inputTypesArray = this.questionObject.getValidValues('inputType')
        for(var i=0;i<inputTypesArray.length;i++){
            var inputTypeID = inputTypesArray[i]
            var selected = ""

            if(this.questionObject.inputType === inputTypeID){
                selected = "selected"
            }
            htmlString = htmlString +
                "<option value='" + inputTypeID + "' " + selected + ">" + this.questionObject.getInputTypeDisplayText(inputTypeID) + "</option>"
        }

        htmlString = htmlString +
            "       </select>" +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.questionBuilder_QuestionType_DOMElement = function(inputTypeID){
        var htmlString = ""

        if(this.questionObject.inputType_IsValid()){
            htmlString = htmlString +
                "<div class='col-xs-6'>" +
                "   <div class='form-group'>" +
                "       <label>Question Type</label>" +
                "       <select class='form-control questionBuilderInput' " +
                "           id='questionBuilder_TextQuestionTypeDropdown' " +
                "           data-class='Question' " +
                "           data-id='" + this.questionObject.id + "' " +
                "           data-property='questionType' " +
                ">"

            var questionTypesArray = this.questionObject.getQuestionTypes(inputTypeID)
            for(var i=0;i<questionTypesArray.length;i++){
                var questionTypeID = questionTypesArray[i]
                var selected = ""

                if(this.questionObject.questionType === questionTypeID){
                    selected = "selected"
                }

                htmlString = htmlString +
                    "<option value='" + questionTypeID + "'" + selected + ">" + this.questionObject.getQuestionTypeDisplayText(inputTypeID, questionTypeID) + "</option>"
            }

            htmlString = htmlString +
                "       </select>" +
                "   </div>" +
                "</div>"


        }
        return htmlString
    }
    this.questionBuilderQuestionTextInput_DOMElement = function(){
        var value = (this.questionObject.questionText.trim().length > 0 ? this.questionObject.questionText : 'The Question being asked to the Broker...')
        this.questionObject.questionText = value
        var htmlString = "" +
            "<div class='col-xs-12'>" +
            "<div class='form-group'>" +
            "   <label>Question To Ask:</label>" +
            "   <input type='text' class='form-control questionBuilderInput' " +
            "       id='questionBuilder_QuestionTextInput' " +
            "       value='" + value + "' " +
            "       data-class='Question' " +
            "       data-id='" + this.questionObject.id + "' " +
            "       data-property='questionText' " +
            "       placeholder='The Question being asked to the Broker...' " +
            "   >" +
            "</div>" +
            "</div>"


        return htmlString
    }

    //DOME ELEMENTS: INPUT TYPE SECTIONS
    this.inputTypeForm_text_DOMElement = function(){
        var htmlString = "" +
            "<div class='row'>" +
            this.questionBuilderInput_htmlPlaceholder_DOMElement() +
            "</div>"

        if(this.questionObject.questionType === 'basicText'){
            htmlString = htmlString +
                "<div class='row'>" +
                this.questionBuilderInput_maxLength_DOMElement() +
                "</div>"

        }
        else if(this.questionObject.questionType === 'email'){

        }
        else if(this.questionObject.questionType === 'phone'){

        }
        else if(this.questionObject.questionType === 'currency'){
            htmlString = htmlString +
                "<div class='row'>" +
                this.questionBuilderInput_CurrencyInputs_DOMElement() +
                "</div>"
        }
        else if(this.questionObject.questionType === 'numeric'){

        }
        else if(this.questionObject.questionType === 'percent'){

        }



        return htmlString
    }
    this.inputTypeForm_dropdown_DOMElement = function(){
        var htmlString = "" +
            "<div class='row'>" +
            this.questionBuilderInput_dropdownOptionsValText_DOMElement() +
            "</div>" +
            "<div class='row'>" +
            "   <div class='col-xs-12'>" +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.inputTypeForm_radio_DOMElement = function(){
        var htmlString = "" +
            "<div class='row'>" +
            this.questionBuilderInput_htmlCheckboxRadioValText_DOMElement() +
            "</div>" +
            "<div class='row'>" +
            "   <div class='col-xs-12'>" +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.inputTypeForm_checkbox_DOMElement = function(){
        var htmlString = "" +
            "<div class='row'>" +
            this.questionBuilderInput_htmlCheckboxRadioValText_DOMElement() +
            "</div>" +
            "<div class='row'>" +
            "   <div class='col-xs-12'>" +
            "   </div>" +
            "</div>"

        return htmlString
    }

    //BASIC QUESTION ATTRIBUTE QUESTIONS THAT DIRECTLY CAN REPLACE SAVED DB VALUES
    this.questionBuilderInput_htmlPlaceholder_DOMElement = function(){
        var property = "htmlPlaceholder"
        var value = (this.questionObject[property].trim().length > 0 ? this.questionObject[property] : 'Hint Text')

        //SET THE VALUE HERE TO MAKE THE QUESTION PREVIEW REFLECT THIS VALUE
        this.questionObject[property] = value

        var htmlString = "" +
            "<div class='col-xs-8'>" +
            "<div class='form-group'>" +
            "   <label>Hint Text</label>" +
            "   <input type='text' class='form-control questionBuilderInput' " +
            "       id='questionBuilder_" + property + "' " +
            "       value='" + value + "' " +
            "       data-class='Question' " +
            "       data-id='" + this.questionObject.id + "' " +
            "       data-property='" + property + "' " +
            "       placeholder='Hint Text' " +
            "   >" +
            "</div>" +
            "</div>"


        return htmlString
    }
    this.questionBuilderInput_hiddenFlag_DOMElement = function(){
        var property = "hiddenFlag"
        var checked = (this.questionObject[property] === 'Y' ? 'checked' : '')
        var htmlString = "" +
            "<div class='col-xs-12'>" +
            "   <div class='form-group'>" +
            "       <div class='checkbox'> " +
            "           <label> " +
            "               <input type='checkbox' " +
            "                   class='questionBuilderInput' " +
            "                   id='questionBuilder_" + property + "' " +
            "                   data-class='Question' " +
            "                   data-id='" + this.questionObject.id + "' " +
            "                   data-property='" + property + "' " +
            checked +
            "               > Has Hidden Section " +
            "           </label> " +
            "       </div>" +
            "   </div>" +
            "</div>"

        // return htmlString
        return "" //TODO: IMPLEMENT
    }
    this.questionBuilderInput_maxLength_DOMElement = function(){
        var property = "maxLength"
        var value = (this.questionObject[property].trim().length > 0 ? this.questionObject[property] : '')
        var htmlString = "" +
            "<div class='col-xs-9'>" +
            "<div class='form-group'>" +
            "   <label>Max Length (Leave Blank for no limit on Characters) </label>" +
            "   <input type='text' class='form-control questionBuilderInput' " +
            "       id='questionBuilder_" + property + "' " +
            "       value='" + value + "' " +
            "       data-class='Question' " +
            "       data-id='" + this.questionObject.id + "' " +
            "       data-property='" + property + "' " +
            "       placeholder='' " +
            "       style='width:30%' " +

            "   >" +
            "</div>" +
            "</div>"


        return htmlString
    }
    this.questionBuilderInput_required_DOMElement = function(){
        var property = "required"
        var checked = (this.questionObject[property] === 'Y' ? 'checked' : '')
        var htmlString = "" +
            "<div class='col-xs-12'>" +
            "   <div class='form-group'>" +
            "       <div class='checkbox'> " +
            "           <label> " +
            "               <input type='checkbox' " +
            "                   class='questionBuilderInput' " +
            "                   id='questionBuilder_" + property + "' " +
            "                   data-class='Question' " +
            "                   data-id='" + this.questionObject.id + "' " +
            "                   data-property='" + property + "' " +
                                checked +
            "               > Required Question (Forces Broker to answer before moving on) " +
            "           </label> " +
            "       </div>" +
            "   </div>" +
            "</div>"

        return htmlString
        // return ""
    }
    this.questionBuilderInput_attachments_DOMElement = function(){
        var property = "attachments"
        var checked = (this.questionObject[property] === 'Y' ? 'checked' : '')
        var htmlString = "" +
            "<div class='col-xs-12'>" +
            "   <div class='form-group'>" +
            "       <div class='checkbox'> " +
            "           <label> " +
            "               <input type='checkbox' " +
            "                   class='questionBuilderInput' " +
            "                   id='questionBuilder_" + property + "' " +
            "                   data-class='Question' " +
            "                   data-id='" + this.questionObject.id + "' " +
            "                   data-property='" + property + "' " +
            checked +
            "               > Attachments (This question allows user to upload attachments) " +
            "           </label> " +
            "       </div>" +
            "   </div>" +
            "</div>"

        return htmlString
        // return "" //TODO: IMPLEMENT
    }

    //SPECIAL INPUTS THAT REQUIRE EXTRA SETUP
    this.questionBuilderInput_capitalFirstLetters_DOMElement = function(){
        var property = ""
        var checked = (this.questionObject[property] === 'Y' ? 'checked' : '')
        var htmlString = ""

        // return htmlString
        return "" //TODO: IMPLEMENT
    }
    this.questionBuilderInput_CurrencyInputs_DOMElement = function(){
        var property = 'inputDataAttr'
        var dataAttributeMap

        try{
            //CHECK FOR CURRENCY DATA ATTRIBUTES
            dataAttributeMap = JSON.parse( this.questionObject.inputDataAttr )

            if(dataAttributeMap["data-precision"]){
                //IF KEY EXISTS, DO NOTHING
            }
            else{
                //IF KEY DOESN'T EXIST, ADD IT, SET IT TO DEFAULT
                dataAttributeMap["data-precision"] = "0"
            }

            if(dataAttributeMap["data-prefix"]){
                //IF KEY EXISTS, DO NOTHING
            }
            else{
                //IF KEY DOES NOT EXIST, ADD IT, SET IT TO DEFAULT
                dataAttributeMap["data-prefix"] = "$"
            }
        }
        catch(e){
            //IF THERE IS AN ERROR, CREATE MAP, AND SET IT TO CURRENCY DEFAULTS

            dataAttributeMap = {
                "data-precision": "0",
                "data-prefix": "$"
            }
            this.questionObject.inputDataAttr = JSON.stringify(dataAttributeMap)
        }

        var htmlString = "" +
            "<div class='col-xs-3'>" +
            "   <div class='form-group'>" +
            "       <div class='radio'> " +
            "           <label> " +
            "               <input type='radio' " +
            "                   class='questionBuilderInput' " +
            "                   name='questionBuilder_inputDataAttr_precision' " +
            "                   data-class='Question' " +
            "                   data-id='" + this.questionObject.id + "' " +
            "                   data-property='" + property + "' " +
            "                   value='0' " +
            ( dataAttributeMap["data-precision"] && dataAttributeMap["data-precision"] === '0' ? 'checked' : '') +
            "               > Whole Dollars Only " +
            "           </label> " +
            "       </div>" +
            "       <div class='radio'> " +
            "           <label> " +
            "               <input type='radio' " +
            "                   class='questionBuilderInput' " +
            "                   name='questionBuilder_inputDataAttr_precision' " +
            "                   data-class='Question' " +
            "                   data-id='" + this.questionObject.id + "' " +
            "                   data-property='" + property + "' " +
            "                   value='2' " +
            ( dataAttributeMap["data-precision"] && dataAttributeMap["data-precision"] === '2' ? 'checked' : '') +
            "               > Dollars and Cents " +
            "           </label> " +
            "       </div>" +
            "   </div>" +
            "</div>"


        return htmlString
    }

    this.questionBuilderInput_htmlCheckboxRadioValText_DOMElement = function(){
        var property = "htmlCheckboxRadioValText"
        var htmlString = ""

        //CHECK IF CHECKBOX RADIO OPTIONS MAP EXIST
        var htmlCheckboxRadioValText
        if( this.questionObject.htmlCheckboxRadioValText && this.questionObject.htmlCheckboxRadioValText.trim().length > 0 ){
            htmlCheckboxRadioValText = JSON.parse( this.questionObject.htmlCheckboxRadioValText )
        }
        else{
            htmlCheckboxRadioValText = {}
        }

        //LOOP THROUGH THE CHECKBOX RADIO OPTIONS MAP, IF IT EXISTS AND GET THE OPTION VALUES
        if(htmlCheckboxRadioValText){
            htmlString = htmlString +
                "<div class='col-xs-8'>" +
                "   <label>Options</label>" +
                "</div>" +
                "<div class='col-xs-12'>"

            var checkboxRadioOptionKeys = Object.keys( htmlCheckboxRadioValText )
            if( checkboxRadioOptionKeys.length === 0){
                htmlString = htmlString + this.questionBuilderInput_checkboxRadioOptionInput_DOMElement('newOption','', 0)
            }
            else{
                for(var i=0;i<checkboxRadioOptionKeys.length ;i++){
                    var optionValue =  checkboxRadioOptionKeys[i]
                    var optionText = htmlCheckboxRadioValText[optionValue]

                    htmlString = htmlString +
                        this.questionBuilderInput_checkboxRadioOptionInput_DOMElement(optionValue,optionText, i)

                }
            }

        }
        else{
            htmlString = htmlString +
                "<div class='col-xs-8'>" +
                "   <label>Options</label>" +
                "</div>" +
                "<div class='col-xs-12'>" +
                this.questionBuilderInput_checkboxRadioOptionInput_DOMElement('newOption', '', 0)
        }


        htmlString = htmlString +
            "<div class='row' style='margin-top: 16px;'>" +
                this.questionBuilderInput_checkboxNoneOfTheAboveOptionFlag_DOMElement() +
            "</div>"

        htmlString = htmlString +
            "</div>"

        return htmlString
    }
    this.questionBuilderInput_checkboxRadioOptionInput_DOMElement = function(optionValue, optionText, i){
        var value = optionValue
        var text = optionText
        var index = i

        //IF THIS IS THE DEFAULT 'INVALID' OPTION, DISABLE THE ID INPUT
        var disabled = ""
        if(value === 'none'){
            disabled = "disabled"
        }
        else if( value === 'newOption' ){
            value = ''
        }

        var htmlString = "" +
            "<div class='row checkboxRadioOptionsRow'>" +
            "   <div class='col-xs-4' style=''>" +
            "      <div class='input-group'> " +
            "          <span class='input-group-addon'>ID</span> " +
            "          <input type='text' class='form-control questionBuilderInput checkboxRadioOptionIDInput ' " +
            "              placeholder='Option' " +
            "              id='questionBuilder_" + "checkboxRadioOptionsValText"  + "_" + index + "_value' " +
            "              value='" + value + "' " +
            "              data-class='Question' " +
            "              data-id='" + this.questionObject.id + "' " +
            "              data-property='htmlCheckboxRadioValText' " +
            "              " + disabled + "" +

            "          > " +
            "      </div>" +
            "   </div>" +
            "   <div class='col-xs-6'>" +
            "      <div class='input-group'> " +
            "          <span class='input-group-addon'>Desc.</span> " +
            "          <input type='text' class='form-control questionBuilderInput checkboxRadioOptionDescInput' " +
            "              placeholder='Option' " +
            "              id='questionBuilder_" + "checkboxRadioOptionsValText"  + "_" + index + "_text' " +
            "              value='" + text + "' " +
            "              data-class='Question' " +
            "              data-id='" + this.questionObject.id + "' " +
            "              data-property='htmlCheckboxRadioValText' " +
            "          > " +
            "      </div>" +
            "   </div>" +
            "   <div class='col-xs-2'>" +
            "      <button type='button' class='btn btn-xs btn-success addCheckboxRadioOptionButton' style='font-size:9px'>" +
            "          <i class='fa fa-plus' aria-hidden='true'></i>" +
            "      </button>" +
            "      <button type='button' class='btn btn-xs btn-danger removeCheckboxRadioOptionButton' style='font-size:9px'>" +
            "          <i class='fa fa-minus' aria-hidden='true'></i>" +
            "   </div>" +
            "</div>"

        return htmlString
    }
    this.questionBuilderInput_checkboxNoneOfTheAboveOptionFlag_DOMElement = function(){
        var property = "checkboxRadioNoneAbove"

        //IF THE HTMLCHECKBOXRADIOVAL MAP HAS A NONE OF THE ABOVE VALUE MARK THIS CHECKBOX CHECKED
        var checkboxValTextMap
        if( this.questionObject.htmlCheckboxRadioValText && this.questionObject.htmlCheckboxRadioValText.trim().length > 0 ){
            checkboxValTextMap = JSON.parse( this.questionObject.htmlCheckboxRadioValText )
        }
        else{
            checkboxValTextMap = {}
        }

        var checked = ""
        if( checkboxValTextMap && checkboxValTextMap.none ){
            checked = "checked"
        }

        var htmlString = "" +
            "<div class='col-xs-12'>" +
            "   <div class='form-group'>" +
            "       <div class='checkbox'> " +
            "           <label> " +
            "               <input type='checkbox' " +
            "                   class='questionBuilderInput' " +
            "                   id='questionBuilder_" + property + "' " +
            "                   data-class='Question' " +
            "                   data-id='" + this.questionObject.id + "' " +
            "                   data-property='" + property + "' " +
            checked +
            "               > Has a 'None of the Above' Option " +
            "           </label> " +
            "       </div>" +
            "   </div>" +
            "</div>"

        return htmlString
        // return ""
    }


    this.questionBuilderInput_defaultChecked_DOMElement = function(){
        var property = ""
        var checked = (this.questionObject[property] === 'Y' ? 'checked' : '')
        var htmlString = ""

        // return htmlString
        return "" //TODO: IMPLEMENT
    }
    this.questionBuilderInput_htmlInputName_DOMElement = function(){
        var property = ""
        var checked = (this.questionObject[property] === 'Y' ? 'checked' : '')
        var htmlString = ""

        // return htmlString
        return "" //TODO: IMPLEMENT
    }

    this.questionBuilderInput_dropdownOptionsValText_DOMElement = function(){
        var property = "dropdownOptionsValText"
        var htmlString = ""

        //CHECK IF DROPDOWN OPTIONS MAP EXIST
        var dropdownOptionsValText
        if( this.questionObject.dropdownOptionsValText && this.questionObject.dropdownOptionsValText.trim().length > 0 ){
            dropdownOptionsValText = JSON.parse( this.questionObject.dropdownOptionsValText )
        }
        else{
            dropdownOptionsValText = {}
        }

        var invalidValue = 'invalid'
        var invalidText = 'Please Select One'

        //LOOP THROUGH THE DROPDOWN OPTIONS MAP, IF IT EXISTS AND GET THE OPTION VALUES
        if(dropdownOptionsValText){

            if(dropdownOptionsValText.invalid){
                invalidText = dropdownOptionsValText.invalid
            }

            htmlString = htmlString +
                "<div class='col-xs-8'>" +
                "   <label>Dropdown Options</label>" +
                "</div>" +
                "<div class='col-xs-12'>" +
                    this.questionBuilderInput_dropdownOptionInput_DOMElement(invalidValue, invalidText, 0)

            var dropdownOptionKeys = Object.keys( dropdownOptionsValText )
            for(var i=0;i<dropdownOptionKeys.length ;i++){
                var optionValue =  dropdownOptionKeys[i]
                var optionText = dropdownOptionsValText[optionValue]

                if(optionValue === 'invalid'){
                    //SKIP IF INVALID, ITS ALREADY BEEN HANDLED
                }
                else{
                    htmlString = htmlString +
                        this.questionBuilderInput_dropdownOptionInput_DOMElement(optionValue,optionText, i)
                }
            }
        }
        else{
            htmlString = htmlString +
                "<div class='col-xs-8'>" +
                "   <label>Dropdown Options</label>" +
                "</div>" +
                "<div class='col-xs-12'>" +
                this.questionBuilderInput_dropdownOptionInput_DOMElement(invalidValue, invalidText, 0)
        }

        htmlString = htmlString +
            "</div>"

        return htmlString
    }
    this.questionBuilderInput_dropdownOptionInput_DOMElement = function(optionValue, optionText, i){
        var value = optionValue
        var text = optionText
        var index = i

        //IF THIS IS THE DEFAULT 'INVALID' OPTION, DISABLE THE ID INPUT
        var disabled = ""
        if(value === 'invalid'){
            disabled = "disabled"
        }
        else if( value === 'newOption' ){
            value = ''
        }

        var htmlString = "" +
            "<div class='row dropdownOptionsRow'>" +
            "   <div class='col-xs-4' style=''>" +
            "      <div class='input-group'> " +
            "          <span class='input-group-addon'>ID</span> " +
            "          <input type='text' class='form-control questionBuilderInput dropdownOptionIDInput ' " +
            "              placeholder='Option' " +
            "              id='questionBuilder_" + "dropdownOptionsValText"  + "_" + index + "_value' " +
            "              value='" + value + "' " +
            "              data-class='Question' " +
            "              data-id='" + this.questionObject.id + "' " +
            "              data-property='dropdownOptionsValText' " +
            "              " + disabled + "" +

            "          > " +
            "      </div>" +
            "   </div>" +
            "   <div class='col-xs-6'>" +
            "      <div class='input-group'> " +
            "          <span class='input-group-addon'>Desc.</span> " +
            "          <input type='text' class='form-control questionBuilderInput dropdownOptionDescInput' " +
            "              placeholder='Option' " +
            "              id='questionBuilder_" + "dropdownOptionsValText"  + "_" + index + "_text' " +
            "              value='" + text + "' " +
            "              data-class='Question' " +
            "              data-id='" + this.questionObject.id + "' " +
            "              data-property='dropdownOptionsValText' " +
            "          > " +
            "      </div>" +
            "   </div>" +
            "   <div class='col-xs-2'>" +
            "      <button type='button' class='btn btn-xs btn-success addDropdownOptionButton' style='font-size:9px'>" +
            "          <i class='fa fa-plus' aria-hidden='true'></i>" +
            "      </button>" +
            "      <button type='button' class='btn btn-xs btn-danger removeDropdownOptionButton' style='font-size:9px'>" +
            "          <i class='fa fa-minus' aria-hidden='true'></i>" +
            "   </div>" +
            "</div>"




        return htmlString
    }


    //QUESTION PREVIEW DOM ELEMENT
    this.questionPreview_DOMElement = function(){
        var htmlString = "" +
            "<div class='row'>" +
            this.questionObject.DOMElement() +
            "</div>"

        return htmlString
    }

    //DOM ACTION FUNCTIONS
    this.openQuestionBuilderModal = function(){
        $('#dynamicModalContainer').html( this.DOMElement() )

        $('.modal').modal('hide')

        setTimeout(function() {
            $('#dynamicModalContainer').modal('show')
        }, 500);

    }
    this.redraw = function(){
        $('#dynamicModalContainer').html( this.DOMElement() )

        this.questionObject.initListeners()
    }
    this.questionInputElementChange = function(inputElement){
        var classType = $(inputElement).attr('data-class')
        var id = $(inputElement).attr('data-id')
        var property = $(inputElement).attr('data-property')
        var value = ""

        if(property === 'inputDataAttr'){
            //REBUILD THE DATA MAP
            var precision = $('input[name="questionBuilder_inputDataAttr_precision"]:checked').val()
            value = JSON.parse(this.questionObject.inputDataAttr)
            value['data-precision'] = precision
            value = JSON.stringify(value)
        }
        else if(property === 'dropdownOptionsValText'){
            //REBUILD THE DATA MAP
            var newOptionsMap = {}
            $('#questionBuilderModalDialog .dropdownOptionsRow').each(function(){
                var optionID = $(this).find('.dropdownOptionIDInput').val()
                var optionText = $(this).find('.dropdownOptionDescInput').val()

                newOptionsMap[optionID] = optionText
            })

            value = JSON.stringify( newOptionsMap )
        }
        else if(property === 'htmlCheckboxRadioValText'){
            //REBUILD THE DATA MAP
            var newOptionsMap = {}
            $('#questionBuilderModalDialog .checkboxRadioOptionsRow').each(function(){
                var optionID = $(this).find('.checkboxRadioOptionIDInput').val()
                var optionText = $(this).find('.checkboxRadioOptionDescInput').val()

                newOptionsMap[optionID] = optionText
            })

            value = JSON.stringify( newOptionsMap )
        }
        else if(property === 'checkboxRadioNoneAbove'){
            //RESET THE PROPERTY TO HTMLCHECKBOXRADIOVALTEXT
            property = 'htmlCheckboxRadioValText'

            if( $(inputElement).is(':checked') ){
                //IF NONE OF THE ABOVE OPTION IS CHECKED, NEED TO ADD A 'NONE' OPTION
                var newOptionsMap = {}

                //BUILD A MAP FROM EXISTING OPTIONS
                $('#questionBuilderModalDialog .checkboxRadioOptionsRow').each(function(){
                    var optionID = $(this).find('.checkboxRadioOptionIDInput').val()
                    var optionText = $(this).find('.checkboxRadioOptionDescInput').val()

                    newOptionsMap[optionID] = optionText
                })

                //ADD THE NONE OPTION
                newOptionsMap.none = "None of the Above"

                value = JSON.stringify( newOptionsMap )

            }
            else{
                //IF THE NONE OF THE ABOVE OPTION IS NOT CHECKED
                var newOptionsMap = {}

                //BUILD A MAP FROM EXISTING OPTIONS
                $('#questionBuilderModalDialog .checkboxRadioOptionsRow').each(function(){
                    var optionID = $(this).find('.checkboxRadioOptionIDInput').val()
                    var optionText = $(this).find('.checkboxRadioOptionDescInput').val()

                    newOptionsMap[optionID] = optionText
                })

                //REMOVE THE 'NONE' OPTION
                if(newOptionsMap.none){
                    delete newOptionsMap.none
                }

                value = JSON.stringify( newOptionsMap )
            }
        }
        else if($(inputElement).is(':text')){
            value = $(inputElement).val()
        }
        else if($(inputElement).is('select')){
            value = $(inputElement).val()
        }
        else if($(inputElement).is(':checkbox')){
            if($(inputElement).is(':checked')){
                value = "Y"
            }
            else{
                value = "N"
            }

        }
        else if($(inputElement).is(':radio')){
            value = $(inputElement).val()
        }

        if(classType === 'Question'){
            var result = this.questionObject.setProperty(property, value)

            if(result){
                //DO NOTHING
            }
            else{
                alert('Changes Not Valid')
            }

            this.redraw()
        }
    }
    this.dropdownOptionsAddOption = function(button){
        var optionMap

        //NEED TO MAKE SURE ALL ID INPUTS ARE VALID FIRST
        var invalidInputsCount = 0

        $('#questionBuilderModalDialog .dropdownOptionsRow').each(function(){
            var optionIDInput = $(this).find('.dropdownOptionIDInput')
            var optionDescInput = $(this).find('.dropdownOptionDescInput')
            var optionID = $(optionIDInput).val()
            var optionDesc = $(optionDescInput).val()

            if( optionID.trim().length === 0){
                markClosestFormGroup_Error( optionIDInput)
                invalidInputsCount++
            }

            if(optionDesc.trim().length === 0){
                markClosestFormGroup_Error( optionDescInput)
                invalidInputsCount++
            }

        })

        if(invalidInputsCount > 0){
            //IF THERE ARE INVALID IDS, DON'T PROCEED
        }
        else{
            if(this.questionObject.dropdownOptionsValText.trim().length > 0){
                optionMap = JSON.parse( this.questionObject.dropdownOptionsValText )
            }
            else{
                optionMap = {}
            }
            optionMap.newOption = ""

            this.questionObject.dropdownOptionsValText = JSON.stringify( optionMap )

            this.redraw()
        }
    }
    this.dropdownOptionsRemoveOption = function(button){
        //FIND THE OPTION ID
        var value = $(button).closest('#questionBuilderModalDialog .dropdownOptionsRow').find('.dropdownOptionIDInput').val()

        //FIND THE OBJECT IN MAP
        if(value.trim().length === 0){
            value = 'newOption'
        }
        var map = JSON.parse( this.questionObject.dropdownOptionsValText )
        delete map[value]
        this.questionObject.dropdownOptionsValText = JSON.stringify( map )

        this.redraw()

    }
    this.checkboxRadioOptionsAddOption = function(button){
        var optionMap

        //NEED TO MAKE SURE ALL ID INPUTS ARE VALID FIRST
        var invalidInputsCount = 0

        $('#questionBuilderModalDialog .checkboxRadioOptionsRow').each(function(){
            var optionIDInput = $(this).find('.checkboxRadioOptionIDInput')
            var optionDescInput = $(this).find('.checkboxRadioOptionDescInput')
            var optionID = $(optionIDInput).val()
            var optionDesc = $(optionDescInput).val()

            if( optionID.trim().length === 0){
                markClosestFormGroup_Error( optionIDInput)
                invalidInputsCount++
            }

            if(optionDesc.trim().length === 0){
                markClosestFormGroup_Error( optionDescInput)
                invalidInputsCount++
            }

        })

        if(invalidInputsCount > 0){
            //IF THERE ARE INVALID IDS, DON'T PROCEED
        }
        else{
            if(this.questionObject.htmlCheckboxRadioValText.trim().length > 0){
                optionMap = JSON.parse( this.questionObject.htmlCheckboxRadioValText )
            }
            else{
                optionMap = {}
            }
            optionMap.newOption = ""

            this.questionObject.htmlCheckboxRadioValText = JSON.stringify( optionMap )

            this.redraw()
        }
    }
    this.checkboxRadioOptionsRemoveOption = function(button){
        //FIND THE OPTION ID
        var value = $(button).closest('#questionBuilderModalDialog .checkboxRadioOptionsRow').find('.checkboxRadioOptionIDInput').val()

        //FIND THE OBJECT IN MAP
        if(value.trim().length === 0){
            //IF VALUE FOR ID IS BLANK THEN THIS WAS THE NEWOPTION.
            value = 'newOption'
        }

        if( this.questionObject.htmlCheckboxRadioValText.trim().length > 0 ){
            var map = JSON.parse( this.questionObject.htmlCheckboxRadioValText )
            delete map[value]
            this.questionObject.htmlCheckboxRadioValText = JSON.stringify( map )

            this.redraw()
        }

    }

    //QUESTION BUILDER SAVE FUNCTION
    this.saveQuestion = function(){
        this.questionObject.save()
    }




    //LISTENERS
    this.listeners = function(){
        var QUESTIONBUILDER = this

        //MODAL LISTENERS
        $(document.body).on('change', '#questionBuilderModalDialog .questionBuilderInput', function() {
            QUESTIONBUILDER.questionInputElementChange(this)
        });

        $(document.body).on('click', '#questionBuilderModalDialog .questionBuilder_SaveQuestionButton', function() {
            QUESTIONBUILDER.saveQuestion(this)
        });

        //DROPDOWN OPTIONS MULTI ROW LISTENERS
        $(document.body).on('click', '#questionBuilderModalDialog .addDropdownOptionButton', function() {
            QUESTIONBUILDER.dropdownOptionsAddOption(this)
        });

        $(document.body).on('click', '#questionBuilderModalDialog .removeDropdownOptionButton', function() {
            QUESTIONBUILDER.dropdownOptionsRemoveOption(this)
        });

        //CHECKBOX RADIO OPTIONS MULTI ROW LISTENERS
        $(document.body).on('click', '#questionBuilderModalDialog .addCheckboxRadioOptionButton', function() {
            QUESTIONBUILDER.checkboxRadioOptionsAddOption(this)
        });

        $(document.body).on('click', '#questionBuilderModalDialog .removeCheckboxRadioOptionButton', function() {
            QUESTIONBUILDER.checkboxRadioOptionsRemoveOption(this)
        });


    }
    this.init = function(){
        this.listeners()
    }
    this.init()
}
