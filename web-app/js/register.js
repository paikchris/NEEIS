$(document).ready(function () {
    $(document.body).on('focus', '.phoneNumberMask' ,function(){
        //this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3');
        //alert ("OK");
        $(".phoneNumberMask").mask("(999)999-9999");
        
    });

    $(document.body).on('focusout', '#agencyID' ,function(){
        checkAgencyNameExists();
    });
    $(document.body).on('focusout', '#agencyPIN' ,function(){
        checkAgencyPIN()
    });
    //required to initialize bootstrap popover functionality
    $(function () {
        $('[data-toggle="popover"]').popover()
    });


    $(document).on('focusout', '.required', function (){
        console.log('exiting a required field');
        isInputFilled(this);

        //VALIDATE EMAILS
        if($(this).hasClass('emailInput')){
            isEmailInputValid(this);
        }

        //VALIDATE PASSWORDS (MUST BE 6 CHARACTERS MIN)
        if($(this).hasClass('passwordInput')){
            isPasswordLengthGood(this);
        }

        if($(this).hasClass('passwordVerify')){
            doesPasswordsMatch();
        }

        // console.log(validateRegisterForm())
        // if(validateRegisterForm()){
        //     $('#submitButton').prop('disabled', false)
        // }
        // else{
        //     $('#submitButton').prop('disabled', true)
        // }



    });

    $(document).on('focusout', '.forgotPassword', function (){
        isInputFilled(this);

        //VALIDATE EMAILS
        isEmailFormatValid(this);
    });

    $(document).on('click', '#submitButton', function (event){
        console.info("reg.js: validating register form...");
        if(validateRegisterForm()){
            console.info("good form");
            $.ajax({
                method: "POST",
                url: "/auth/registerUser",
                data: {email: $('#email').val().trim(),
                    password: $('#password').val().trim(),
                    firstName:$('#firstName').val().trim(),
                    lastName:$('#lastName').val().trim(),
                    company:$('#agencyID').val().trim(),
                    phoneNumber:$('#phoneNumber').val().trim().replace(/\D/g,'')
                }
            })
                .done(function (msg) {
                    window.location.href = "./../main/index.gsp?test=test";
                });
        }
        else{
            console.info("bad form...");
        }
        event.preventDefault();
    });

    // for Get Appointed Page
    $(document).on('click', '#getAppointedButton', function (event){
        if(validateAppointmentForm()){
            alert("Thanks!");
        }
        else{
            event.preventDefault();
        }
    });

    // this masks the phone number input while allowing the 'required' validation
    document.getElementById('phoneNumberInput').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
});

function markInputAsError(inputElem, helpBlockMessage){
    $(inputElem).closest(".form-group").removeClass("has-success");
    $(inputElem).siblings(".help-block").html("");
    $(inputElem).siblings(".glyphicon-ok").css('display','none');

    $(inputElem).closest(".form-group").addClass("has-error");
    $(inputElem).siblings(".help-block").html(helpBlockMessage);
    $(inputElem).siblings(".glyphicon-remove").css('display','');
}

function markInputAsOk(inputElem, helpBlockMessage){
    $(inputElem).closest(".form-group").removeClass("has-error");
    $(inputElem).siblings(".help-block").html("");
    $(inputElem).siblings(".glyphicon-remove").css('display','none');

    $(inputElem).closest(".form-group").addClass("has-success");
    $(inputElem).siblings(".help-block").html(helpBlockMessage);
    $(inputElem).siblings(".glyphicon-ok").css('display','');
}

function checkAgencyNameExists(){
    $.ajax({
        method: "POST",
        url: "/async/checkAgencyID",
        data: {agencyID: $('#agencyID').val().trim()
        }
    })
        .done(function (msg) {

            if(msg.trim().length > 1){
                //alert(msg.length)
                // $('#agencyID').closest(".form-group").removeClass("has-error");
                // $('#agencyID').siblings(".help-block").html(msg);
                markInputAsOk($('#agencyID'), msg)
            }
            else{
                // $('#agencyID').closest(".form-group").addClass("has-error");
                // $('#agencyID').siblings(".help-block").html("No Agency Found");
                markInputAsError($('#agencyID'), "Agency Not Found")

            }
        });
}

function checkAgencyPIN(){
    $.ajax({
        method: "POST",
        url: "/async/checkAgencyPIN",
        data: {agencyID: $('#agencyID').val().trim(),
            agencyPIN: $('#agencyPIN').val().trim()
        }
    })
        .done(function (msg) {

            if(msg.trim().length > 1){
                //alert(msg.length)
                // $('#agencyPIN').closest(".form-group").removeClass("has-error");
                // $('#agencyPIN').siblings(".help-block").html("");
                markInputAsOk($('#agencyPIN'), "PIN is Correct")
            }
            else{
                // $('#agencyPIN').closest(".form-group").addClass("has-error");
                // $('#agencyPIN').siblings(".help-block").html("PIN Incorrect");
                markInputAsError($('#agencyPIN'), "PIN Incorrect")

            }
        });
}

function validateEmail(email) {
    console.log("begin #validateEmail");
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateRegisterForm(){
    console.log("begin #validateRegisterForm");
    var validForm = true;


    //CHECK ALL REQUIRED FIELDS ARE FILLED
    $('.required').each(function(){
        console.log("call #isInputFilled");
        validForm = isInputFilled(this);
        console.log ("REQUIRED FIELDS: " + validForm)
    });
 
    console.log("call #isEmailInputValid");
    validForm = isEmailInputValid($('.emailInput'));
    console.log ("email FIELDS: " + validForm)


    validForm = isPasswordLengthGood($('#password'));
    console.log ("password FIELDS: " + validForm)


    validForm = doesPasswordsMatch();
    console.log ("password match FIELDS: " + validForm)


    if($('.has-error').length > 0){
        validForm = false;
    }

    console.log ("Validate form result: " + validForm);
    return validForm;
}

function validateAppointmentForm(){
    var validForm;
    var inputFilled;

    //CHECK ALL REQUIRED FIELDS ARE FILLED
    $('.required').each(function(){
        inputFilled = isInputFilled(this);
        if(inputFilled == false) {
            validForm = false;
        }
    });
    if(validForm == false){
        return validForm;
    }

    validForm = isEmailInputValid($('.emailInput'));
    console.log ("email FIELDS: " + validForm)

    // if($('.has-error').length > 0){
    //     validForm =  false;
    // }

    return validForm;
}

function isInputFilled(inputElem){
    if($(inputElem).val().trim().length ==0){
        // $(inputElem).closest(".form-group").addClass("has-error");
        markInputAsError(inputElem, "Please complete field.")
        return false;
    } else {
        // $(inputElem).closest(".form-group").removeClass("has-error");
        markInputAsOk(inputElem);
        return true;
    }
}

function isEmailInputValid(inputElem){
    console.log("begin #isEmailInputValid");
    var isValidEmail = false;
    if(validateEmail($(inputElem).val().trim()) == false){
        console.log("email format wrong");
        //sends parent because the '@' form field add-on affects the heirarchy         
        markInputAsError($(inputElem).parent(), "Invalid email address.")
        isValidEmail =  false;
    }else{
        console.log("email validated true");
        // $(inputElem).closest(".form-group").removeClass("has-error");
        // $(inputElem).siblings(".help-block").html("");
        console.log("marking input as ok")
        markInputAsOk($(inputElem).parent())
        isValidEmail =  true;
    }

    if(isValidEmail){

        console.log("valid email... start ajax check");
        $.ajax({
            method: "POST",
            url: "/auth/checkEmail",
            data: {email: $('#email').val().trim()
            }
        })
            .done(function (msg) {
                if(msg.split(":")[0] === "Error"){
                    markInputAsError($('#email').parent(), msg.split(":")[1])
                }
                else if(msg.split(":")[0] === "OK"){
                    markInputAsOk($('#email').parent(), msg.split(":")[1])
                }

            });
    
    }
}

// put in own function because reverse functionality needed - must be existing email
function isEmailFormatValid(inputElem){
    var emailFormatValid = false;
    if(validateEmail($(inputElem).val().trim()) == false){
        console.log("email format wrong");
        //sends parent because the '@' form field add-on affects the heirarchy         
        markInputAsError($(inputElem).parent(), "Invalid email address.")
        $('.submitButton').addClass('disabled');    
        emailFormatValid = false;
    }else{
        console.log("email in correct format");
        console.log("marking input as ok");
        markInputAsOk($(inputElem).parent());
        emailFormatValid = true;
    }
}

function isPasswordLengthGood(inputElem){
    if($(inputElem).val().trim().length <6){
        // $(inputElem).closest(".form-group").addClass("has-error");
        // $(inputElem).siblings(".help-block").html("Must be at least 6 characters");
        markInputAsError(inputElem, "Must be at least 6 characters")
        return false;
    }
    else{
        // $(inputElem).closest(".form-group").removeClass("has-error");
        // $(inputElem).siblings(".help-block").html("");
        markInputAsOk(inputElem, "")
        return true;
    }
}

function doesPasswordsMatch(){
    var passwordOK = false;
    if($('#passwordVerify').val().trim() === $('#password').val().trim()){
        // $('#passwordVerify').closest(".form-group").removeClass("has-error");
        // $('#password').closest(".form-group").removeClass("has-error");
        // $('#passwordVerify').siblings(".help-block").html("");
        // $('#password').siblings(".help-block").html("");

        markInputAsOk($('#passwordVerify'), "")
        markInputAsOk($('#password'), "")


        passwordOK = true;
    }
    else{
        // $('#passwordVerify').closest(".form-group").addClass("has-error");
        // $('#password').closest(".form-group").addClass("has-error");
        // $('#passwordVerify').siblings(".help-block").html("Passwords must match");
        // $('#password').siblings(".help-block").html("Passwords must match");

        markInputAsError($('#passwordVerify'), "Passwords must match")
        markInputAsError($('#password'), "Passwords must match")


        passwordOK =  false;
    }
    if($('#password').val().trim().length <6){
        // $('#password').closest(".form-group").addClass("has-error");
        // $('#password').siblings(".help-block").html("Must be at least 6 characters");
        // $('#passwordVerify').closest(".form-group").addClass("has-error");
        // $('#passwordVerify').siblings(".help-block").html("");

        markInputAsError($('#passwordVerify'), "Passwords must match")
        markInputAsError($('#password'), "Passwords must match")

        passwordOK =  false;
    }

    return passwordOK;
}


