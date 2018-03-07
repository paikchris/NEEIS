


//ASSIGN LISTENERS. CHECKS FOR REQUIRED INPUT NOT TO BE BLANK ON CHANGE OR FOCUS OUT
function initializeListenerForNoBlankRequiredFields(){
    //CHANGE
    $(document).on('change', ":input[required]:visible", function() {
        validateThisInput(this)
    });

    //FOCUS OUT
    $(document).on('focusout', ':input[required]:visible', function() {
        validateThisInput(this)
    });

}

function validateFields() {
    var valid = true;
    var message = "";

    //VALIDATE REQUIRED FIELDS
    $(':input[required]:visible').each(function(index) {
        validateThisInput(this)

        if( this.hasAttribute('data-lengthrequired')){
            var lengthRequired = parseInt($(this).attr('data-lengthrequired'));

            if ($(this).val().trim().length == lengthRequired) {
                $(this).closest(".form-group").removeClass("has-error");
            }
            else {
                $(this).closest(".form-group").addClass("has-error");
            }

        }
        else{
            if ($(this).val().length == 0) {
                valid = false;
                message = message + "Please complete all required fields\n"
                $(this).closest(".form-group").addClass("has-error");
            }
            else {
                $(this).closest(".form-group").removeClass("has-error");
            }
        }

    });

    //VALIDATE DROPDOWNS
    $('select[required]:visible').each(function(index) {
        validateThisInput(this)

        if ($(this).val() == 'invalid') {
            valid = false;
            message = message + "Please complete all required fields (Select)\n"
            $(this).closest(".form-group").addClass("has-error");
        }
        else {
            $(this).closest(".form-group").removeClass("has-error");
        }
    });

    //VALIDATE CHECKBOXES
    $('.checkboxGroupRequired:visible').each(function(index) {

        if ($(this).find('input:checked').length == 0) {
            valid = false
            message = message + "Please complete all required fields (Checkbox)\n"
            $(this).closest(".form-group").addClass("has-error");
        }
        else {
            $(this).closest(".form-group").removeClass("has-error");
        }
    });

    //VALIDATE EMAIL
    $('#namedInsuredEmail:visible').each(function() {
        //console.log(ValidateEmail($(this).val()));
        if (!ValidateEmail($(this).val())) {
            valid = false;
            message = message + "Not a valid email  \n"
            $(this).closest(".form-group").addClass("has-error");
        }
        else {
            $(this).closest(".form-group").removeClass("has-error");
        }
    });

    $('#zipCodeMailing:visible').each(function() {
        var lengthOfZip = $(this).val().trim().length;
        if(lengthOfZip != 5){
            valid = false;
            message = message + "Not a valid zipcode  \n"
            $(this).closest(".form-group").addClass("has-error");
        }
        else {
            $(this).closest(".form-group").removeClass("has-error");
        }

    });

    if(message.length > 0){
        console.log("Error: " + message);
    }

    return [valid, message];
}

function validate(){
    var isValid = true;
    //VALIDATE REQUIRED FIELDS
    $(':input[required]:visible, select[required]:visible').each(function(index) {
        if( validateThisInput(this) !== "VALID"){
            isValid = false
        }
    });

    return isValid
}

//RETURNS VALID OR ERROR MESSAGE STRING
function validateThisInput(input){
    var message = "VALID"
    markClosestFormGroup_Clear(input)

    //BY TYPE
    if($(input).is(":text[required]")){
        if( $(input).val().trim().length === 0 ){
            message = message + "Required Field (" + $(input).attr('id') + ") cannot be blank \n"
            markClosestFormGroup_Error(input)
            return message;
        }
        else{
            markClosestFormGroup_Success(input)
        }
    }
    else if($(input).is(":radio[required]")){
        var radioGroupName = $(input).attr('name')
        var valueOfRadioGroup = $('input[required][type="radio"][name="' + radioGroupName + '"]:visible:checked').val()

        if( valueOfRadioGroup === undefined || valueOfRadioGroup.trim().length === 0 ){
            message = message + "Required Field (" + $(input).attr('id') + ") cannot be blank \n"
            markClosestFormGroup_Error(input)
            return message;
        }
        else{
            markClosestFormGroup_Success(input)
        }
    }
    else if($(input).is(":checkbox[required]")){
        var checkboxGroupName = $(input).attr('name')
        var valuesOfCheckboxGroup = []

        $('input[required][type="checkbox"][name="' + checkboxGroupName + '"]:visible:checked').each(function(){
            valuesOfCheckboxGroup.push( $(this).val() )
        })



        if( valuesOfCheckboxGroup.length === 0 ){
            message = message + "Required Field (" + $(input).attr('id') + ") cannot be blank \n"
            markClosestFormGroup_Error(input)
            return message;
        }
        else{
            markClosestFormGroup_Success(input)
        }
    }
    else if($(input).is("select[required]")){
        if( $(input).val().trim().length === 0 || $(input).val() === 'invalid'){
            message = message + "Required Field (" + $(input).attr('id') + ") cannot be blank \n"
            markClosestFormGroup_Error(input)
            return message;
        }
        else{
            markClosestFormGroup_Success(input)
        }
    }

    //BY CLASS TYPE
    if($(input).hasClass('datepicker')){
        if( validateDatePickerInput(input) === false ){
            message = "Please enter dates in MM/DD/YY format \n"
            markClosestFormGroup_Error(input)

            return message;
        }
        else{
            markClosestFormGroup_Success(input)
        }

    }
    else if($(input).hasClass('emailInput')){
        if (ValidateEmail($(input).val()) === false) {
            message = message + "Email is incorrect format \n"
            markClosestFormGroup_Error(input)
            return message;
        }
        else {
            markClosestFormGroup_Success(input)
        }
    }
    else if ($(input).hasClass("phoneNumberMask") ) {
        if(($(input).val().trim().indexOf("_") > -1) ){
            message = message + "Phone is Invalid \n"
            markClosestFormGroup_Error(input)
            return message;
        }
        else{
            markClosestFormGroup_Success(input)
        }
    }
    else if ($(input).hasClass("stateAddressInput") ){
        if($(input).val() === "invalid"){
            message = message + "Phone is Invalid \n"
            markClosestFormGroup_Error(input)
            return message;
        }
        else{
            markClosestFormGroup_Success(input)
        }
    }
    else if($(input).hasClass("zipcodeInput") ){
        if ($(input).val().trim().length != 5){
            // alert("zipcode not correct")

            message = "ZipCode not correct \n"
            markClosestFormGroup_Error(input)

            return message;
        }
        else{
            markClosestFormGroup_Success(input)
        }
    }


    //INDIVIDUAL ELEMENTS
    if($(input).attr('id') === "namedInsured"){
        var originalName = $(input).val();
        var formattedName = capitalizeFirstLetters(originalName);
        $(input).val( formattedName );
        $("#nameOfProductionCompany").val(formattedName);
        $("#nameOfProductionCompany").attr('placeholder', '');
    }

    else if($(input).attr('id') === "proposedEffectiveDate"){
        var mdyEffective = $('#proposedEffectiveDate').val().split('/');
        var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);
        var isValid = true

        //MUST BE TODAYS DATE OR LATER
        if (mdyEffectiveDateObject.getTime() < today.getTime()) {
            //SET DATE TO TODAYS DATE
            $('#proposedEffectiveDate').datepicker('update', getTodaysDateString())

            showAlert("Effective Date must be a present or future date")
            message = "Effective Date must be a present or future date \n"
            markClosestFormGroup_Error(input)
            return message;
        }
        else{
            markClosestFormGroup_Success(input)

        }

    }
    else if($(input).attr('id') === "proposedExpirationDate"){

    }
    else if($(input).attr('id') === "proposedTermLength"){
        if($(input).val().indexOf('Days') == -1){
            message = message + "Term Length not correct format \n"
            markClosestFormGroup_Error(input)
            return message;
        }
        else{
            markClosestFormGroup_Success(input)
        }
    }

    return message
}

//EMAIL VALIDATION
function ValidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function emailQuickValidateInput(emailInput){
    if (ValidateEmail($(emailInput).val()) === false) {
        markClosestFormGroup_Error(emailInput)
    }
    else {
        markClosestFormGroup_Success(emailInput)
    }
}

//RETURNS TRUE IF VALID, FALSE = INVALID
function validateDatePickerInput(input){
    var dateValue = $(input).val()
    var month = dateValue.split('/')[0]
    var date = dateValue.split('/')[1]
    var year = dateValue.split('/')[2]

    if (dateValue.length !== 10 && dateValue.split('/').length !== 3) {
        return false;
    }

    if(year.length !== 4){
        return false
    }

    if( month.length !== 2){
        return false
    }
    if( date.length !== 2){
        return false
    }

    return true
}

function isInputBlank(){

}

function markClosestFormGroup_Error(input){
    markClosestFormGroup_Clear(input)
    $(input).closest(".form-group, .input-group").addClass("has-error");
}
function markClosestFormGroup_Success(input){
    markClosestFormGroup_Clear(input)
    $(input).closest(".form-group, .input-group").addClass("has-success");
}
function markClosestFormGroup_Clear(input){
    $(input).closest(".form-group, .input-group").removeClass("has-success");
    $(input).closest(".form-group, .input-group").removeClass("has-error");

}

function pulseInputChange(element){

    setTimeout(function(){
        element.addClass('pulse')
    }, 200);
    setTimeout(function(){
        element.removeClass('pulse')
    }, 400);
    setTimeout(function(){
        element.addClass('pulse')
    }, 700);
    setTimeout(function(){
        element.removeClass('pulse')
    }, 850);
}
