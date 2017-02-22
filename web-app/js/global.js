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
