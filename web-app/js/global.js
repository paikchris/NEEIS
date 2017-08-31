/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {
    //ALLOW TAB TO SWITCH FOCUSES OF INPUTS
    $(document.body).on('keydown', ':input', function(e) {
        // console.log(e.which)
        if( e.which === 9 ) {
            // alert();
            var inputsFocusableArray = $(':input:visible').not(':disabled')
            var currentIndex = inputsFocusableArray.index(e.target)

            var nextIndex = (currentIndex + 1)
            if(currentIndex === inputsFocusableArray.length-1){
                nextIndex = 0
            }

            inputsFocusableArray.eq(nextIndex).focus();

            e.preventDefault()
            e.stopPropagation();
        }
    });

    //SIDEBAR JS
    $("#sidebar-wrapper").hover(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    //INITIALIZE GLOBAL LISTENERS
    initializeGlobalListeners()

    //NAVBAR LISTENERS

    //BUTTON LISTENERS




    //"MY ACCOUNT" JAVASCRIPT (MOVE THIS TO NEW FILE)
    $( "#myAccountButton" ).click(function() {
        $('#myAccountModal').modal('show');
    });
    $( "#settingsButton" ).click(function() {
        $('#settingsModal').modal('show');
    });
    $( "#openResetPasswordButton" ).click(function() {
        $('#myAccountModal').modal('hide');
        $('#resetPasswordModal').modal('show');
    });
    $( "#resetPasswordButton" ).click(function() {
        //alert();
        var currentPass = $('#currentPassword').val();
        var newPass = $('#newPassword').val();
        var confirmNewPass = $('#confirmNewPassword').val();

        if(validateResetForm()){
            $.ajax({
                method: "POST",
                url: "/auth/resetPassword",
                data: {currentPass: currentPass, newPass: newPass, confirmNewPass: confirmNewPass}
            })
                .done(function (msg) {
                    alert(msg);
                    if(msg === "good"){
                        $('#resetPasswordModal').modal('hide');
                        window.location.href = "./../main/index";
                    }
                    else{
                        alert("Password reset error");

                    }
                });
        }

    });
    $(document).on('focusout', '.requiredResetPassword', function (){
        if($(this).val().trim().length ==0){
            $(this).closest(".form-group").addClass("has-error");
        }
        else{
            $(this).closest(".form-group").removeClass("has-error");
        }

        //VALIDATE PASSWORDS (MUST BE 6 CHARACTERS MIN)
        if($(this).hasClass('passwordInput')){
            if($(this).val().trim().length <6){
                $(this).closest(".form-group").addClass("has-error");
                $(this).siblings(".help-block").html("Must be at least 6 characters");
            }
            else{
                $(this).closest(".form-group").removeClass("has-error");
                $(this).siblings(".help-block").html("");
            }
        }

        if($(this).hasClass('passwordVerify')){
            if($(this).val().trim() === $('#newPassword').val().trim()){
                $(this).closest(".form-group").removeClass("has-error");
                $('#newPassword').closest(".form-group").removeClass("has-error");
                $(this).siblings(".help-block").html("");
                $('#newPassword').siblings(".help-block").html("");


            }
            else{
                $(this).closest(".form-group").addClass("has-error");
                $('#newPassword').closest(".form-group").addClass("has-error");
                $(this).siblings(".help-block").html("Passwords must match");
                $('#newPassword').siblings(".help-block").html("Passwords must match");
            }
            if($('#newPassword').val().trim().length <6){
                $('#newPassword').closest(".form-group").addClass("has-error");
                $('#newPassword').siblings(".help-block").html("Must be at least 6 characters");
                $(this).closest(".form-group").addClass("has-error");
                $(this).siblings(".help-block").html("");
            }
        }
    });


});


//INITIALIZE GLOBAL LISTENERS
function initializeGlobalListeners(){
    datePickerInit()

    checkboxHiddenDivInit()
    radioHiddenDivInit()
    closeButtonListener()
    maskMoneyInit()
}
function datePickerInit(){
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
function maskMoneyInit(){
    var options = {}
    $('.maskMoney').each(function (){
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

        $(this).maskMoney(options);
    });

}
function closeButtonListener(){
    $(document.body).on('click', 'button.close', function(e) {
        $(this).parent().remove()
    });
}

//HTML CONSTANTS


//BUTTON ICON FUNCTIONS
function spinnerHTML(){
    var s = $("<i class='fa fa-spinner fa-spin fa-fw leftButtonIcon'></i>")
    return s
}
function addLoadingSpinnerToButton_left(btnElement){
    //ONLY ADD SPINNER IF NO SPINNER ALREADY
    if($(btnElement).children('i.fa-spinner').length == 0){
        $(btnElement).prepend(spinnerHTML())
    }
}
function removeLoadingSpinnerFromButton(btnElement){
    $(btnElement).children('i.fa-spinner').remove()
}


//INPUT DECORATION FUNCTIONS
function inputSpinnerHTML(optionalLoadingText){
    var s = "<span class='form-control-feedback inputSpinner'  style='right: 16px;top: 27px;font-size: 16px;width: 140px; color: rgb(47,97,155)'> ";

    if(optionalLoadingText){
        s = s + "<span style='font-size: 12px; font-weight: 400;'>" + optionalLoadingText+ "</span> "
    }
    s = s + "<i class='fa fa-spinner fa-spin '></i> " +
        "</span>"

    return $(s)
}
function glyphiconInputHTML(glyphiconClass){
    var s = "<span class='glyphicon glyphicon-" + glyphiconClass + " form-control-feedback' aria-hidden='true' style='top: 29px; right: 15px;' >" +
        "</span>"

    return $(s)
}
function addLoadingSpinnerToInput_right(input, optionalLoadingText){
    if($(input).siblings('span.inputSpinner').length === 0){
        $(input).after(inputSpinnerHTML(optionalLoadingText))
    }
}
function removeLoadingSpinnerFromInput(input){
    $(input).siblings('span.inputSpinner').remove()
}
function addGlyphToInput_right(input, glyphiconClass){
    if($(input).siblings('span.glyphicon').length === 0){
        $(input).after(glyphiconInputHTML(glyphiconClass))
    }
}
function removeGlyphFromInput(input){
    $(input).siblings('span.glyphicon').remove()
}

//CHECKBOX AND HIDDEN DIVS
function checkboxHiddenDivInit(){
    $(document.body).on('change', '.checkboxHiddenDiv', function(e) {
        if( $(this).is(':checked')){
            $(this).closest('.checkboxAndHiddenDivContainer').find('.hiddenContainer').css('display', '')
        }
        else{
            $(this).closest('.checkboxAndHiddenDivContainer').find('.hiddenContainer').css('display', 'none')
        }
    });
}
function radioHiddenDivInit(){
    /*
    <div class="row radioWithHiddenDiv_Container">
       <div class='col-xs-2 form-group radioWithHiddenDiv_RadioContainer'>
            <p><input type='checkbox' class='radioWithHiddenDiv_Radio' name="${coverage.coverageCode}_radioGroup"
                      id='${coverage.coverageCode}radio' value="Always"/> Always
            </p>
            <p><input type='checkbox' class='radioWithHiddenDiv_Radio' name="${coverage.coverageCode}_radioGroup"
                    id='${coverage.coverageCode}radio' value="Sometimes"/> Sometimes
            </p>
       </div>
       <div class="radioWithHiddenDiv_HiddenDivContainer" style="display:none">
            <div class="radioHiddenDiv" id="${coverage.coverageCode}_radioGroup_Always"> ALWAYS
            </div>
            <div class="radioHiddenDiv" id="${coverage.coverageCode}_radioGroup_Sometimes"> SOMETIMES
            </div>
       </div>
   </div>
     */
    console.log('RADIO')
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


//ALERT MESSAGE FUNCTIONS
function showAlert(message){
    $('#alertMessageContent').html(message)

    $('#alertMessageModal').modal('show')
}


//MOVE THIS TO ANOTHER FILE
function validateResetForm(){
    var validReset = true;
    $('.requiredResetPassword').each(function () {
        if($(this).val().trim().length ==0){
            $(this).closest(".form-group").addClass("has-error");
            validReset = false;
            return false;
        }
        else{
            $(this).closest(".form-group").removeClass("has-error");
        }


        //VALIDATE PASSWORDS (MUST BE 6 CHARACTERS MIN)
        if($(this).hasClass('passwordInput')){
            if($(this).val().trim().length <6){
                $(this).closest(".form-group").addClass("has-error");
                $(this).siblings(".help-block").html("Must be at least 6 characters");
                validReset = false;
                return false;
            }
            else{
                $(this).closest(".form-group").removeClass("has-error");
                $(this).siblings(".help-block").html("");
            }
        }

        if($(this).hasClass('passwordVerify')){
            if($(this).val().trim() === $('#newPassword').val().trim()){
                $(this).closest(".form-group").removeClass("has-error");
                $('#newPassword').closest(".form-group").removeClass("has-error");
                $(this).siblings(".help-block").html("");
                $('#newPassword').siblings(".help-block").html("");


            }
            else{
                $(this).closest(".form-group").addClass("has-error");
                $('#newPassword').closest(".form-group").addClass("has-error");
                $(this).siblings(".help-block").html("Passwords must match");
                $('#newPassword').siblings(".help-block").html("Passwords must match");
                validReset = false;
                return false;
            }
            if($('#newPassword').val().trim().length <6){
                $('#newPassword').closest(".form-group").addClass("has-error");
                $('#newPassword').siblings(".help-block").html("Must be at least 6 characters");
                $(this).closest(".form-group").addClass("has-error");
                $(this).siblings(".help-block").html("");
                validReset = false;
                return false;
            }
        }
    });

    return validReset;
}

function sqlToJsDate(sqlDate){

    var offset = new Date().getTimezoneOffset();

    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    sqlDate = sqlDate.split("+")[0];
    console.log(sqlDate)
    var sqlDateArr1 = sqlDate.split("-");
    //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) - 1).toString();

    var sqlDateArr2
    if(sqlDateArr1[2].indexOf("T") > -1){
        sqlDateArr2 = sqlDateArr1[2].split("T");
    }
    else{
        sqlDateArr2 = sqlDateArr1[2].split(" ");
    }

    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    var sDay = sqlDateArr2[0];
    var sqlDateArr3 = sqlDateArr2[1].split(":");
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    var sHour = sqlDateArr3[0];
    var sMinute = sqlDateArr3[1];
    var sqlDateArr4 = sqlDateArr3[2].split(".");
    //format of sqlDateArr4[] = ['ss','ms']
    var sSecond = sqlDateArr4[0];
    var sMillisecond = sqlDateArr4[1];

    console.log(sYear + "," + sMonth + "," + sDay + "," + sHour + "," + sMinute + "," + sSecond + "," + sMillisecond)

    //IF NO MILLISECONDS
    var returnDate;
    if(sMillisecond){
        returnDate = new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond,sMillisecond);

    }
    else{
        returnDate = new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond);
    }
    //console.log(returnDate.setMinutes(returnDate.getMinutes() - offset));
    returnDate.setMinutes(returnDate.getMinutes() - offset);
    return returnDate

}


