/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {
    $("#sidebar-wrapper").hover(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

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
                url: "/portal/auth/resetPassword",
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