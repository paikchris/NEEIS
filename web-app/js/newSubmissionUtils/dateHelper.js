var today


function initializeDateInputAndFunctions() {
    //DATE VALIDATION FUNCTION

    //INIT STUFF
    today = new Date();
    today.setHours(0, 0, 0, 0);

    $(document).on('change', '#proposedEffectiveDate, #proposedExpirationDate', function () {
        isExpirationAfterEffective()
        calculateProposedTermLength();
    });

    //CALCULATING PROPOSED TERM LENGTH
    $(document).on('change', '#proposedTermLength', function () {
        var termLengthValue = $(this).val().trim()
        setProposedTermLength(termLengthValue)
    });

    //COPYING MAILING ADDRESS TO PHYSICAL ADDRESS
    $(document).on('change', '#addressTheSame', function () {
        if ($('#addressTheSame').is(':checked')) {
            var physicalAddressDiv = $("#locationDivContainer").children('.locationDiv').eq(0);
            //alert($("input[name='streetNameMailing']").val());
            //alert(physicalAddressDiv.html());
            //alert($("#stateMailing").val());
            physicalAddressDiv.find("input[name='streetName']").val($("input[name='streetNameMailing']").val());
            physicalAddressDiv.find("input[name='city']").val($("input[name='cityMailing']").val());
            physicalAddressDiv.find("select[name='state']").val($("#stateMailing").val());
            physicalAddressDiv.find("input[name='zipCode']").val($("input[name='zipCodeMailing']").val());
        }
        else {}
    });
}

function getTodaysDateString(){
    return today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear()
}

function isExpirationAfterEffective(){
    if( validateThisInput($('#proposedEffectiveDate')) === "VALID" && validateThisInput($('#proposedExpirationDate')) === "VALID"){
        var mdyEffective = $('#proposedEffectiveDate').val().split('/');
        var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);
        var mdyExpiration = $('#proposedExpirationDate').val().split('/');
        var mdyExpirationDateObject = new Date(mdyExpiration[2], mdyExpiration[0] - 1, mdyExpiration[1]);

        var days = Math.round((mdyExpirationDateObject - mdyEffectiveDateObject) / (1000 * 60 * 60 * 24));

        if (days < 1) {
            $('#alertMessageContent').html("Expiration Date must be after the Effective Date");
            $('#alertMessageModal').modal('show');
            $(this).val("");
            $('#proposedTermLength').val("");
            $('#proposedExpirationDate').datepicker('update', '')
            return false
        }
        else{
            return true
        }
    }

}

function calculateProposedTermLength(){
    var mdyEffective = $('#proposedEffectiveDate').val().split('/');
    var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);
    var mdyExpiration = $('#proposedExpirationDate').val().split('/');
    var mdyExpirationDateObject = new Date(mdyExpiration[2], mdyExpiration[0] - 1, mdyExpiration[1]);

    var days = Math.round((mdyExpirationDateObject - mdyEffectiveDateObject) / (1000 * 60 * 60 * 24));
    if (days == 1) {
        $('#proposedTermLength').val(days + " Day")
        pulseInputChange($('#proposedTermLength'))
    }
    else if (days > 1 && days <= 365) {
        $('#proposedTermLength').val(days + " Days")
        pulseInputChange($('#proposedTermLength'))
    }
    else if (days > 365) {
        $('#alertMessageContent').html("Policy term cannot exceed 365 Days");
        $('#alertMessageModal').modal('show');
        $('#proposedTermLength').val("");
    }
    else{
        $('#proposedTermLength').val("");
    }

    validateThisInput($('#proposedTermLength'))
}



function isProposedEffectiveValid(){
    try{
        var dateString = $('#proposedEffectiveDate').val()

        //Check if blank
        if(dateString.trim().length === 0){
            return false;
        }

        //Check if present or future date
        var mdyEffective = $('#proposedEffectiveDate').val().split('/');
        var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);

        if (mdyEffectiveDateObject.getTime() < today.getTime()) {
            return false
        }
        else{
           return true
        }
    }
    catch(e){
        console.log(e.message)
        return false
    }

}
function setDatepickerDate(datepickerElement, dateString){
    $(datepickerElement).datepicker('update', dateString)
}
function setEffectiveToToday(){
    $('#proposedEffectiveDate').datepicker('update', getTodaysDateString())
}
function setProposedTermLength(policyLength){
    var policyTermLengthElement = $('#proposedTermLength')
    var length = policyLength.split(" ")[0];

    if( $('#proposedEffectiveDate').val().trim().length === 0 ){
        setEffectiveToToday()
    }

    if (isNaN(length)) {
        $(policyTermLengthElement).val($(policyTermLengthElement).val().replace(/\D/g, '') + " Days");
        pulseInputChange($('#proposedTermLength'));
        if ($(policyTermLengthElement).val().split(" ")[0].length == 0) {
            var mdyEffective = $('#proposedEffectiveDate').val().split('/');
            var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);
            var newDate = new Date(mdyEffectiveDateObject.setTime(mdyEffectiveDateObject.getTime() + 1 * 86400000));


            var day = newDate.getDate();

            var monthIndex = newDate.getMonth() + 1;

            if (day < 10) {
                day = '0' + day;
            }
            if (monthIndex < 10) {
                monthIndex = '0' + monthIndex;
            }
            var year = newDate.getFullYear();


            $(policyTermLengthElement).val("1 Days");
        }
        $("#proposedExpirationDate").val((monthIndex) + "/" + day + "/" + year);
        $("#proposedExpirationDate").trigger('change');
    }
    else {
        //console.log(length);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var mdyEffective = $('#proposedEffectiveDate').val().split('/');
        var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);
        var newDate = new Date(mdyEffectiveDateObject.setTime(mdyEffectiveDateObject.getTime() + length * 86400000));


        var day = newDate.getDate();

        var monthIndex = newDate.getMonth() + 1;

        if (day < 10) {
            day = '0' + day;
        }
        if (monthIndex < 10) {
            monthIndex = '0' + monthIndex;
        }
        var year = newDate.getFullYear();

        $("#proposedExpirationDate").val((monthIndex) + "/" + day + "/" + year);
        $(policyTermLengthElement).val(length + " Days");
        pulseInputChange($('#proposedTermLength'));

        if ($(policyTermLengthElement).val().split(" ")[0].length == 0) {
            $(policyTermLengthElement).val("1 Days");

            newDate = new Date(mdyEffectiveDateObject.setTime(mdyEffectiveDateObject.getTime() + 1 * 86400000));
            $("#proposedExpirationDate").val((monthIndex) + "/" + day + "/" + year);

        }
        $("#proposedExpirationDate").trigger('change');
    }
}





