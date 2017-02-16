$(document).ready(function () {
    $(document.body).on('focus', '.phoneNumberMask' ,function(){
        //this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3');
        //alert ("OK");
        $(".phoneNumberMask").mask("(999)999-9999");
    });

    $(document.body).on('focusout', '#agencyID' ,function(){
        $.ajax({
            method: "POST",
            url: "/portal/async/checkAgencyID",
            data: {agencyID: $('#agencyID').val().trim()
            }
        })
            .done(function (msg) {

                if(msg.trim().length > 1){
                    //alert(msg.length)
                    $('#agencyID').closest(".form-group").removeClass("has-error");
                    $('#agencyID').siblings(".help-block").html(msg);
                }
                else{
                    $('#agencyID').closest(".form-group").addClass("has-error");
                    $('#agencyID').siblings(".help-block").html("No Agency Found");
                }
            });
    });
    $(document.body).on('focusout', '#agencyPIN' ,function(){
        $.ajax({
            method: "POST",
            url: "/portal/async/checkAgencyPIN",
            data: {agencyID: $('#agencyID').val().trim(),
                agencyPIN: $('#agencyPIN').val().trim()
            }
        })
            .done(function (msg) {

                if(msg.trim().length > 1){
                    //alert(msg.length)
                    $('#agencyPIN').closest(".form-group").removeClass("has-error");
                    $('#agencyPIN').siblings(".help-block").html("");
                }
                else{
                    $('#agencyPIN').closest(".form-group").addClass("has-error");
                    $('#agencyPIN').siblings(".help-block").html("PIN Incorrect");
                }
            });
    });

    $(document).on('focusout', '.required', function (){
        if($(this).val().trim().length ==0){
            $(this).closest(".form-group").addClass("has-error");
        }
        else{
            $(this).closest(".form-group").removeClass("has-error");
        }

        //VALIDATE EMAILS
        if($(this).hasClass('emailInput')){
            if(validateEmail($(this).val().trim())){
                $(this).closest(".form-group").removeClass("has-error");
            }
            else{
                $(this).closest(".form-group").addClass("has-error");
            }
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
            if($(this).val().trim() === $('#password').val().trim()){
                $(this).closest(".form-group").removeClass("has-error");
                $('#password').closest(".form-group").removeClass("has-error");
                $(this).siblings(".help-block").html("");
                $('#password').siblings(".help-block").html("");


            }
            else{
                $(this).closest(".form-group").addClass("has-error");
                $('#password').closest(".form-group").addClass("has-error");
                $(this).siblings(".help-block").html("Passwords must match");
                $('#password').siblings(".help-block").html("Passwords must match");
            }
            if($('#password').val().trim().length <6){
                $('#password').closest(".form-group").addClass("has-error");
                $('#password').siblings(".help-block").html("Must be at least 6 characters");
                $(this).closest(".form-group").addClass("has-error");
                $(this).siblings(".help-block").html("");
            }
        }




    });

    $(document).on('click', '#submitButton', function (event){
        console.log(validateRegisterForm());
        //alert("registering");
        if(validateRegisterForm()){
            alert("good form");
            //$.ajax({
            //    method: "POST",
            //    url: "/portal/auth/registerUser",
            //    data: {email: $('#email').val().trim(),
            //        password: $('#password').val().trim(),
            //        firstName:$('#firstName').val().trim(),
            //        lastName:$('#lastName').val().trim(),
            //        company:$('#company').val().trim(),
            //        phoneNumber:$('#phoneNumber').val().trim().replace(/\D/g,'')
            //    }
            //})
            //    .done(function (msg) {
            //
            //    });
        }
        else{
            alert("Please complete all required fields")
            event.preventDefault();
        }
    });
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateRegisterForm(){
    var validForm = true;
    if($('.required').val().trim().length == 0 ){
        $(this).closest(".form-group").addClass("has-error");
        validForm = false;
    }

    if(validateEmail($('.emailInput').val().trim()) == false){
        $('.emailInput').closest(".form-group").addClass("has-error");
        $('.emailInput').siblings(".help-block").html("Not a valid Email");
        validForm = false;
    }

    if($('#password').val().trim().length < 6){
        $('#password').closest(".form-group").addClass("has-error");
        $('#password').siblings(".help-block").html("Must be at least 6 characters");
        validForm =  false
    }

    if($('#passwordVerify').val().trim() !== $('#password').val().trim() ){
        $('#passwordVerify').closest(".form-group").addClass("has-error");
        $('#passwordVerify').siblings(".help-block").html("Passwords do not match");
        validForm = false;
    }

    if($('.has-error').length > 0){

        validForm =  false;
    }

    return validForm;


}