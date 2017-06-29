function initializeDateInputAndFunctions() {
    //DATE PICKER SETUP
    var date_input = $('.datepicker'); //our date input has the name "date"
    var container = $('#page-content-wrapper');
    var options = {
        assumeNearbyYear: true,
        autoclose: true,
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        orientation: "auto bottom",
        enableOnReadonly: false
    };
    date_input.datepicker(options);



    //DATE VALIDATION FUNCTION
    $('#proposedEffectiveDate, #proposedExpirationDate').change(function(e) {
        //alert($('#proposedEffectiveDate').val() + " " + $('#proposedExpirationDate').val());

        var riskChosen = getRiskTypeChosen();
        var riskCategory = getRiskCategoryChosen();
        var termLength;
        var datesAreValid = false;

        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var mdyEffective = $('#proposedEffectiveDate').val().split('/');
        var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);


        if ($(this).attr('id') === "proposedEffectiveDate") {

            if (mdyEffectiveDateObject.getTime() < today.getTime()) {
                //console.log(e);
                //alert("]Effective Date must be a present or future date");
                $('#alertMessageContent').html("Effective Date must be a present or future date");
                $('#alertMessageModal').modal('show');
                $(this).val(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                datesAreValid = false;
            }
            else if (riskChosen === "Film Projects With Cast (No Work Comp)") {
                var termLengthTemp;
                var datesAreValidTemp = true;
                var todayTemp = new Date();
                todayTemp.setHours(0, 0, 0, 0);
                var mdyEffectiveTemp = $('#proposedEffectiveDate').val().split('/');
                var mdyEffectiveDateObjectTemp = new Date(mdyEffectiveTemp[2], mdyEffectiveTemp[0] - 1, mdyEffectiveTemp[1]);
                var dayTemp = mdyEffectiveDateObjectTemp.getDate();
                if (dayTemp < 10) {
                    dayTemp = '0' + dayTemp;
                }
                var monthIndexTemp = mdyEffectiveDateObjectTemp.getMonth() + 1;
                if (monthIndexTemp < 10) {
                    monthIndexTemp = '0' + monthIndexTemp;
                }
                var yearTemp = mdyEffectiveDateObject.getFullYear();
                yearTemp = mdyEffectiveDateObjectTemp.getFullYear() + 1;
                $("#proposedExpirationDate").val((monthIndexTemp) + "/" + dayTemp + "/" + yearTemp);
                $("#proposedExpirationDate").prop('placeholder', '');
                $('#proposedTermLength').val(365 + " Days");
                pulseInputChange($('#proposedTermLength'));
            }
            else if (riskChosen === "Film Projects Without Cast (No Work Comp)") {
                var termLengthTemp;
                var datesAreValidTemp = true;
                var todayTemp = new Date();
                todayTemp.setHours(0, 0, 0, 0);
                var mdyEffectiveTemp = $('#proposedEffectiveDate').val().split('/');
                var mdyEffectiveDateObjectTemp = new Date(mdyEffectiveTemp[2], mdyEffectiveTemp[0] - 1, mdyEffectiveTemp[1]);
                var dayTemp = mdyEffectiveDateObjectTemp.getDate();
                if (dayTemp < 10) {
                    dayTemp = '0' + dayTemp;
                }
                var monthIndexTemp = mdyEffectiveDateObjectTemp.getMonth() + 1;
                if (monthIndexTemp < 10) {
                    monthIndexTemp = '0' + monthIndexTemp;
                }
                var yearTemp = mdyEffectiveDateObject.getFullYear();
                yearTemp = mdyEffectiveDateObjectTemp.getFullYear() + 1;
                $("#proposedExpirationDate").val((monthIndexTemp) + "/" + dayTemp + "/" + yearTemp);
                $("#proposedExpirationDate").prop('placeholder', '');
                $('#proposedTermLength').val(365 + " Days");
                pulseInputChange($('#proposedTermLength'));
            }
            else if (riskChosen.indexOf("Film Projects") > -1) {
                //console.log("DO NOTHING")
            }
            else if (riskCategory === "Special Events") {
                var termLengthTemp;
                var datesAreValidTemp = true;
                var todayTemp = new Date();
                todayTemp.setHours(0, 0, 0, 0);
                var mdyEffectiveTemp = $('#proposedEffectiveDate').val().split('/');
                var mdyEffectiveDateObjectTemp = new Date(mdyEffectiveTemp[2], mdyEffectiveTemp[0] - 1, mdyEffectiveTemp[1]);
                mdyEffectiveDateObjectTemp.setDate(mdyEffectiveDateObjectTemp.getDate() + 5);
                var dayTemp = mdyEffectiveDateObjectTemp.getDate();
                if (dayTemp < 10) {
                    dayTemp = '0' + dayTemp;
                }
                var monthIndexTemp = mdyEffectiveDateObjectTemp.getMonth() + 1;
                if (monthIndexTemp < 10) {
                    monthIndexTemp = '0' + monthIndexTemp;
                }
                var yearTemp = mdyEffectiveDateObject.getFullYear();
                //yearTemp = mdyEffectiveDateObjectTemp.getFullYear() + 1;
                $("#proposedExpirationDate").val((monthIndexTemp) + "/" + dayTemp + "/" + yearTemp);
                $('#proposedTermLength').val(5 + " Days");
                pulseInputChange($('#proposedTermLength'));
            }
            else {
                var termLengthTemp;
                var datesAreValidTemp = true;
                var todayTemp = new Date();
                todayTemp.setHours(0, 0, 0, 0);
                var mdyEffectiveTemp = $('#proposedEffectiveDate').val().split('/');
                var mdyEffectiveDateObjectTemp = new Date(mdyEffectiveTemp[2], mdyEffectiveTemp[0] - 1, mdyEffectiveTemp[1]);
                var dayTemp = mdyEffectiveDateObjectTemp.getDate();
                if (dayTemp < 10) {
                    dayTemp = '0' + dayTemp;
                }
                var monthIndexTemp = mdyEffectiveDateObjectTemp.getMonth() + 1;
                if (monthIndexTemp < 10) {
                    monthIndexTemp = '0' + monthIndexTemp;
                }
                var yearTemp = mdyEffectiveDateObject.getFullYear();
                yearTemp = mdyEffectiveDateObjectTemp.getFullYear() + 1;
                $("#proposedExpirationDate").val((monthIndexTemp) + "/" + dayTemp + "/" + yearTemp);
                $('#proposedTermLength').val(365 + " Days");
                pulseInputChange($('#proposedTermLength'));
            }

        }


        if ($('#proposedEffectiveDate').val().length == 10 && $('#proposedExpirationDate').val().length == 10) {
            var mdyEffective = $('#proposedEffectiveDate').val().split('/');
            var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);
            var mdyExpiration = $('#proposedExpirationDate').val().split('/');
            var mdyExpirationDateObject = new Date(mdyExpiration[2], mdyExpiration[0] - 1, mdyExpiration[1]);
            if ((mdyEffective[2].length == 4 && mdyExpiration[2].length == 4)) { //ENSURE THE YEAR IS 4 DIGITS LONG



                var days = Math.round((mdyExpirationDateObject - mdyEffectiveDateObject) / (1000 * 60 * 60 * 24));
                //alert(days);
                if (days == 1) {
                    $('#proposedTermLength').val(days + " Day")
                    datesAreValid = true;
                }
                else if (days > 1) {
                    $('#proposedTermLength').val(days + " Days")
                    pulseInputChange($('#proposedTermLength'));
                    datesAreValid = true;
                }
                else if (days < 1) {
                    $('#alertMessageContent').html("Expiration Date must be after the Effective Date");
                    $('#alertMessageModal').modal('show');
                    $(this).val("");
                    $('#proposedTermLength').val("");
                    datesAreValid = false;
                }
                if (days > 365) {
                    $('#alertMessageContent').html("Policy Term cannot exceed 1 year");
                    $('#alertMessageModal').modal('show');
                    $('#proposedExpirationDate').val("");
                    $('#proposedTermLength').val("");
                    datesAreValid = false;
                }

            }
            else {
                $(this).val("");
                $('#proposedTermLength').val("");
                datesAreValid = false;
            }

        }
        else {
            $('#proposedTermLength').val("");
            datesAreValid = false;
        }


        if (riskChosen.indexOf("Film Projects") > -1) {
            if (datesAreValid && $('#totalBudgetConfirm').val().trim().length > 0) {
                //alert($('#totalBudgetConfirm').val());
                $('#coverageOptionsReview').addClass("panel-primary");
                $('#coverageOptionsReview').removeClass("panel-default");
                $('#coverageOptionsReview').parent().css("color", "#1f1f1f");
                $('#coverageOptionsTitle').css("color", "#fff");
                $('#loadingModal').show();
                if ($("li.active").length > 0) {
                    getProductsForRisk();
                }

                $('#principalPhotographyDateStart').val($('#proposedEffectiveDate').val());
                $('#principalPhotographyDateEnd').val($('#proposedExpirationDate').val());
            }
            else {
                $('#coverageOptionsReview').addClass("panel-default");
                $('#coverageOptionsReview').removeClass("panel-primary");
                $('#coverageOptionsReview').parent().css("color", "rgba(31, 31, 31, 0.35)");
                $('#coverageOptionsTitle').css("color", "rgba(31, 31, 31, 0.35)");
                $('#EPKGcoverage').prop("checked", false);
                $('#EPKGcoverage').trigger('change');
                $('#CPKCGLcoverage').prop("checked", false);
                $('#CPKCGLcoverage').trigger('change');

                clearProductChoices();

            }
        }
        else {

            if (datesAreValid) {
                //alert($('#totalBudgetConfirm').val());
                $('#coverageOptionsReview').addClass("panel-primary");
                $('#coverageOptionsReview').removeClass("panel-default");
                $('#coverageOptionsReview').parent().css("color", "#1f1f1f");
                $('#coverageOptionsTitle').css("color", "#fff");
                $('#loadingModal').show();
                if ($("li.active").length > 0) {
                    getProductsForRisk();
                }

                $('#principalPhotographyDateStart').val($('#proposedEffectiveDate').val());
                $('#principalPhotographyDateEnd').val($('#proposedExpirationDate').val());
            }
            else {
                $('#coverageOptionsReview').addClass("panel-default");
                $('#coverageOptionsReview').removeClass("panel-primary");
                $('#coverageOptionsReview').parent().css("color", "rgba(31, 31, 31, 0.35)");
                $('#coverageOptionsTitle').css("color", "rgba(31, 31, 31, 0.35)");
                $('#EPKGcoverage').prop("checked", false);
                $('#EPKGcoverage').trigger('change');
                $('#CPKCGLcoverage').prop("checked", false);
                $('#CPKCGLcoverage').trigger('change');

                clearProductChoices();

            }

        }

        $('#CPKInputRadio').trigger("change");
    });

    //CALCULATING PROPOSED TERM LENGTH
    $("#proposedTermLength").click(function() {
        //var input = document.getElementById("test");
        var string = $(this).val()
        var count = 0;
        for (var i = 0; i < $(this).val().length; i++) {
            if (isNaN(string.charAt(i))) {
                //console.log(string.charAt(i));
                count = i;
                break;
            }
        }
        this.setSelectionRange(0, count - 1); // Highlights "Cup"
        this.focus();
    });

    //CALCULATING PROPOSED TERM LENGTH
    $("#proposedTermLength").change(function() {
        var length = $(this).val().split(" ")[0];
        if (isNaN(length)) {
            $(this).val($(this).val().replace(/\D/g, '') + " Days");
            pulseInputChange($('#proposedTermLength'));
            if ($(this).val().split(" ")[0].length == 0) {
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


                $(this).val("1 Days");
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
            $(this).val(length + " Days");
            pulseInputChange($('#proposedTermLength'));

            if ($(this).val().split(" ")[0].length == 0) {
                $(this).val("1 Days");

                newDate = new Date(mdyEffectiveDateObject.setTime(mdyEffectiveDateObject.getTime() + 1 * 86400000));
                $("#proposedExpirationDate").val((monthIndex) + "/" + day + "/" + year);

            }
            $("#proposedExpirationDate").trigger('change');
        }
    });

    //COPYING MAILING ADDRESS TO PHYSICAL ADDRESS
    $('#addressTheSame').change(function() {
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
