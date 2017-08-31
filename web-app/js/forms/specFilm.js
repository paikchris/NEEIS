/*
 * Created by paikchris on 8/23/16.
 */

var pipchoiceLimits = "";
var pipChoiceMisc = "";
var pipChoiceExtra = "";
var pipChoiceProps = "";
var pipChoiceThird = "";
var pipChoiceNOHA = "";
var pipChoiceCast = "";
var pipChoiceCastEssential = "";

var riskHasCast = false;
var riskHasWC = false;
var specFilmJSScriptIsLoaded = true;



var riskChosen;
function specFilmInit(){
    initializeListeners()
}

$(document).ready(function() {
    specFilmInit()
});

function initializeListeners(){
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

    // MONEY FORMAT
    inputMoneyFormat();

    // PERCENTAGE FORMAT
    $(document.body).on('focus', '.percent' ,function(){
        formatPercentage(this);
    });

    //NUMBER FORMAT
    // $('input[type="number"]').mask('0#');

    //CHECKBOXES THAT HIDE AND SHOW FIELDS
    $(document.body).on('change', '#tvSeriesCheckBox', function() {
        if ($("#tvSeriesCheckBox").is(':checked')) {
            $('#specFilmNumEpisodesText').css("display", "");
            $(".numberEpisodesInput").addClass("showReview");
        }
        else {
            $('#specFilmNumEpisodesText').css("display", "none");
            $(".numberEpisodesInput").removeClass("showReview");
        }
    });

    $(document.body).on('change', '#EPKGCASTEssentialAdditionalCoverage', function() {
        if ($("#EPKGCASTEssentialAdditionalCoverage").is(':checked')) {
            $('#castEssentialDiv').css("display", "");
        }
        else {
            $('#castEssentialDiv').css("display", "none");
            $("#castEssentialInput").prop("checked", false);
        }
    });

    $(document.body).on('change', '#showFilmLocationsCheckbox', function() {
        var date_input = $('.datepicker');
        date_input.datepicker(options);
        if ($("#showFilmLocationsCheckbox").is(':checked')) {
            $('#filmingLocationInfo').css("display", "");
            $(".filmLocationLocation").addClass("showReview");
            $(".filmLocationStart").addClass("showReview");
            $(".filmLocationEnd").addClass("showReview");
        }
        else {
            $('#filmingLocationInfo').css("display", "none");
            $(".filmLocationLocation").removeClass("showReview");
            $(".filmLocationStart").removeClass("showReview");
            $(".filmLocationEnd").removeClass("showReview");
        }
    });

    $(document.body).on('change', 'input[name="postProductionForOthers"]', function() {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#hideMe").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#hideMe").css('display', "none");
        }
    });

    $(document.body).on('click', '.castRowDeleteIcon', function(){
        $(this).closest('.row').remove();
        var numCast = $('#castMemberDetailContainer .row').length
        $('#numberOfCastMembers').attr('placeholder', '');
        $('#numberOfCastMembers').val(numCast)
    });

    $(document.body).on('click', '#addCastMemberButton', function(){
        var htmlString = "<div class='row'>" +
            "<div class='col-xs-6'>" +
            "<div class='form-group'>" +
            "<input type='text' class='form-control  castMemberName'  data-reviewname='Cast Member Name, Age, Role' " +
            "name='castMemberName' placeholder='Name'>" +
            "</div>" +
            "</div>" +

            "<div class='col-xs-2'>" +
            "<div class='form-group'>" +
            "<input type='text' class='form-control  castMemberAge'  data-reviewname='Cast Member Name, Age, Role'" +
            "name='castMemberAge' placeholder='Age'>" +
            "</div>" +
            "</div>" +

            "<div class='col-xs-4' style=''>" +
            "<div class='col-xs-10' style='padding:0px;'>" +
            "<input type='text' class='form-control  castMemberRole' id='castMember0RoleInput' data-reviewname='Cast Member Name, Age, Role'" +
            "name='castMemberRole' placeholder='Role' style=''>" +
            "</div>" +
            "<div class='col-xs-2' style='padding:0px;'>" +
            "<i class='fa fa-times-circle castRowDeleteIcon' aria-hidden='true' style=''></i>" +
            "</div>" +
            "</div>"

        $('#castMemberDetailContainer').append(htmlString);

        var numCast = $('#castMemberDetailContainer .row').length
        $('#numberOfCastMembers').attr('placeholder', '');

        $('#numberOfCastMembers').val(numCast)

    });

    $(document.body).on('change', '.productionInvolvesCheckbox', function() {
        //console.log("CHECKBOX")
        if ($(this).attr('id') === "productionInvolvesNoneAbove") {
            $(".productionInvolvesCheckbox").prop("checked", false);
            $("#productionInvolvesNoneAbove").prop("checked", true);
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "none");
            $('#stuntCoordinatorName').css("display", "none");
            $('#participantsSigningWaivers').css("display", "none");
            $('#pyrotechnicsAttachContainer').css("display", "none");

            //$('#noneOfAboveWords').css("display", "none");
        }
        else {
            $("#productionInvolvesNoneAbove").prop("checked", false);
            //$('#noneOfAboveWords').css("display", "");
        }

        if ($("#showFilmLocationsCheckbox").is(':checked')) {
            $('#filmingLocationInfo').css("display", "");
        }
        else {
            $('#filmingLocationInfo').css("display", "none");
        }
    });



    $(document.body).on('change', '#otherProductionType', function() {
        if ($("#otherProductionType").is(':checked')) {
            $('#specFilmOtherDescribe').css("display", "");
        }
        else {
            $('#specFilmOtherDescribe').css("display", "none");
        }
    });

    $(document.body).on('change', '#pyrotechnicsCheckbox', function() {
        if ($("#pyrotechnicsCheckbox").is(':checked')) {
            $('#pyrotechnicsAttachContainer').css("display", "");
        }
        else {
            $('#pyrotechnicsAttachContainer').css("display", "none");
        }
    });
    $(document.body).on('change', '#stuntsHazardousCheckbox', function() {
        if ($("#stuntsHazardousCheckbox").is(':checked')) {
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "");
            $('#stuntCoordinatorName').css("display", "");
            $('#participantsSigningWaivers').css("display", "");
        }
        else {
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "none");
            $('#stuntCoordinatorName').css("display", "none");
            $('#participantsSigningWaivers').css("display", "none");

        }
    });
    $(document.body).on('change', 'input[name="insuranceCancelled"]', function() {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#insuranceCancelledContainer").css('display', "");
            $("#insuredCancelledExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#insuranceCancelledContainer").css('display', "none");
            $("#insuredCancelledExplain").css('display', "none");
        }
    });
    $(document.body).on('change', 'input[name="equipmentOwnedRented"]', function() {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#equipmentOwnedRentedContainer").css('display', "");
            $("#equipmentOwned").css('display', "");
            $("#equipmentRented").css('display', "");
            $("#equipmentLimit").css('display', "");
            $("#equipmentSchedule").css('display', "");
            $("#equipmentLocation").css('display', "");
            $("#equipmentSecurity").css('display', "");
            $("#equipmentInventory").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#equipmentOwnedRentedContainer").css('display', "none");
            $("#equipmentOwned").css('display', "none");
            $("#equipmentRented").css('display', "none");
            $("#equipmentLimit").css('display', "none");
            $("#equipmentSchedule").css('display', "none");
            $("#equipmentLocation").css('display', "none");
            $("#equipmentSecurity").css('display', "none");
            $("#equipmentInventory").css('display', "none");
        }
    });
    $(document.body).on('change', 'input[name="errorOmissionsLiability"]', function() {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#errorOmissionsLiabilityContainer").css('display', "");
            $("#errorOmissionsLiability").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#errorOmissionsLiabilityContainer").css('display', "none");
            $("#errorOmissionsLiability").css('display', "none");

        }
    });
    // Cast Member Insurance
    $(document.body).on('change', '#castInsuranceRequiredCheckBox', function() {
        if ($("#castInsuranceRequiredCheckBox").is(':checked')) {
            $("#castInsuranceRequiredContainer").css("display", "");
            var htmlString = $(".coverageCodeString:first").html().split("<")[0];
            htmlString = htmlString + "<span id='castInsuranceDisclaimer' style='font-size: 9px;padding-left: 9px;font-weight: 300;'> *Cast Insurance is covered </span>";
            $(".coverageCodeString:first").html(htmlString);
            //$("#castInsuranceInfo").html("Cast Insurance is covered");
        }
        else {
            $("#castInsuranceRequiredContainer").css("display", "none");
            var htmlString = $(".coverageCodeString:first").html().split("<")[0];
            htmlString = htmlString + "<span id='castInsuranceDisclaimer' style='font-size: 9px;padding-left: 9px;font-weight: 300;'> *Cast Insurance is NOT covered </span>";
            $(".coverageCodeString:first").html(htmlString);
            //$("#castInsuranceInfo").html("Cast Insurance not covered");
        }
    });
    // Cast Member Insurance



    $(document.body).on('change', '#principalPhotographyDateStart, #principalPhotographyDateEnd', function() {
        var datesAreValid = false;

        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var mdyEffective = $('#principalPhotographyDateStart').val().split('/');
        var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);

        var mdyExpiration = $('#principalPhotographyDateEnd').val().split('/');
        var mdyExpirationDateObject = new Date(mdyExpiration[2], mdyExpiration[0] - 1, mdyExpiration[1]);


        var mdyProposedEffective = $('#proposedEffectiveDate').val().split('/');
        var mdyProposedEffectiveDateObject = new Date(mdyProposedEffective[2], mdyProposedEffective[0] - 1, mdyProposedEffective[1]);

        var mdyProposedExpiration = $('#proposedExpirationDate').val().split('/');
        var mdyProposedExpirationDateObject = new Date(mdyProposedExpiration[2], mdyProposedExpiration[0] - 1, mdyProposedExpiration[1]);
        //alert(mdyEffectiveDateObject + " ====== " + mdyProposedEffectiveDateObject);
        if (mdyEffectiveDateObject.getTime() < mdyProposedEffectiveDateObject.getTime()) {
            //alert();

            if (mdyEffectiveDateObject.getTime() < today.getTime()) {

                $('#alertMessageContent').html("Photography Begin Date must be a present or future date");
                $('#alertMessageModal').modal('show');
                $(this).val($('#proposedEffectiveDate').val());
            }
            else {
                $('#alertMessageContent').html("Photography Begin Date cannot be before Effective Date");
                $('#alertMessageModal').modal('show');
                $(this).val($('#proposedEffectiveDate').val());

            }
            datesAreValid = false;
        }
        else if (mdyExpirationDateObject.getTime() > mdyProposedExpirationDateObject.getTime()) {
            $('#alertMessageContent').html("Photography End Date cannot be after Expiration Date");
            $('#alertMessageModal').modal('show');
            $(this).val($('#proposedExpirationDate').val());
        }

    });

    $(document.body).on('change', '#ksd', function() {
        //alert("Budget change");
        var date = $(this).val();
        $("#principalPhotographyDateEnd").val(date);
        $("#proposedExpirationDate").val(date);
        checkPhotographyDates();
    });


    // add and remove cast member
    $(document.body).on('click', '.addCastMember', function() {
        var htmlString = "";
        var count = 0;
        $('#castMemberInfo').children('.castMember').each(function() {
            count++
            htmlString = $(this).html();
            htmlString = htmlString.replace("Cast Member #1", " Cast Member # " + (count + 1));
            htmlString = htmlString.replace("Cast Member # " + count, "Cast Member # " + (count + 1));
        });
        $("#castMemberInfo").append("<div class='castMember'>" + htmlString + "</div>");
    });

    $(document.body).on('click', '.removeCastMember', function() {
        var htmlString = "";
        var count = 0;
        if ($(this).closest('.castMember').find('h5').html() === "Cast Member #1") {}
        else {
            $(this).closest('.castMember').remove();
            $('#castMemberInfo').children('.castMember').each(function() {
                count++
                var castMemberHeader = $(this).find('h5').html();
                if (castMemberHeader == "Cast Member #1") {}
                else {
                    $(this).find('h5').html("Cast Member # " + count);
                }
            });
        }
    });
    // add and remove cast member

    // add and remove filming location
    $(document.body).on('click', '.addFilmLocation', function() {
        var htmlString = "";
        var count = 0;
        count = $('#filmingLocationInfo').find('.locationFilm').length + 1;
        var htmlElem = $('#filmingLocationInfo').find('.locationFilm').first()
        htmlString = $(htmlElem).html();
        htmlString = htmlString.replace("Filming Location #1", " Filming Location # " + (count));
        htmlString = htmlString.replace(/(\(.)/g, "(" + (count) );
        htmlString = htmlString.replace("id=\"filmingLocation1", "id=\"filmingLocation" + (count) );
        htmlString = htmlString.replace("id=\"filmingStart1", "id=\"filmingStart" + (count) );
        htmlString = htmlString.replace("id=\"filmingEnd1", "id=\"filmingEnd" + (count) );

        // $('#filmingLocationInfo').find('.locationFilm').each(function() {
        //     htmlString = $(this).html();
        //     htmlString = htmlString.replace("Filming Location #1", " Filming Location # " + (count + 1));
        //     htmlString = htmlString.replace("Filming Location # " + count, "Filming Location # " + (count + 1));
        //     htmlString = htmlString.replace(/(\(.)/g, "(" + (count + 1) );
        //     htmlString = htmlString.replace("id=\"filmingLocation1", "id=\"filmingLocation" + (count + 1) );
        //     htmlString = htmlString.replace("id=\"filmingStart1", "id=\"filmingStart" + (count + 1) );
        //     htmlString = htmlString.replace("id=\"filmingEnd1", "id=\"filmingEnd" + (count + 1) );
        // });
        $("#filmingLocationInfo").append("<div class='locationFilm'>" + htmlString + "</div>");

        var date_input = $('.datepicker');
        date_input.datepicker(options);
    });

    $(document.body).on('click', '.removeFilmLocation', function() {
        var htmlString = "";
        var count = 0;
        if ($(this).closest('.locationFilm').find('h5').html() === "Filming Location #1") {}
        else {
            $(this).closest('.locationFilm').remove();
            $('#filmingLocationInfo').find('.locationFilm').each(function() {
                count++
                var filmingLocationHeader = $(this).find('h5.filmingLocationHeader').html();
                if (filmingLocationHeader == "Filming Location #1") {}
                else {
                    $(this).find('h5.filmingLocationHeader').html("Filming Location # " + count);

                    $(this).find('input.filmLocationLocation').attr("id","filmingLocation" + count);
                    $(this).find('input.filmLocationLocation').attr("data-reviewname","Filming Location (" + count + ")");

                    $(this).find('input.filmLocationStart').attr("id","filmingStart" + count);
                    $(this).find('input.filmLocationStart').attr("data-reviewname","Start Date (" + count + ")");

                    $(this).find('input.filmLocationEnd').attr("id","filmingEnd" + count);
                    $(this).find('input.filmLocationEnd').attr("data-reviewname","End Date (" + count + ")");

                }
            });
        }
    });
    // add and remove filming location
    $(document.body).on('change', '#PIP1InputRadio, #PIP2InputRadio, #PIP3InputRadio, #PIP4InputRadio, #PIP5InputRadio, #PIPChoiceInputRadio', function() {
        //alert($('#PIP3InputRadio').is(':checked'));
        // console.log("RADIO BUTTON CHANGE")
        if ($("li.active").length > 0) {
            riskChosen = getRiskTypeChosen();
        }
        else {
            riskChosen = reviewRiskChosen; //FROM REVIEW SUBMISSION MODAL
        }
        $("#EPKGoptions").css("display", "");
        $('.AnnualOptions').css("display", "none");


        if (riskChosen === "Film Projects With Cast (No Work Comp)") {
            $("#EPKGNOHAOption").css("display", "none");
            $("#EPKGCASTEssentialOption").css("display", "");
        }
        else {
            $("#EPKGNOHAOption").css("display", "");
            $("#EPKGCASTEssentialOption").css("display", "none");
        }

        if ($('#PIP1InputRadio').is(':checked') || $('#PIP2InputRadio').is(':checked') ||
            $('#PIP3InputRadio').is(':checked') || $('#PIP4InputRadio').is(':checked') ||
            $('#PIP5InputRadio').is(':checked') || $('#PIPChoiceInputRadio').is(':checked')) {
            $('#EPKGcoverage').prop("checked", true);
            $("#EPKGoptions").css("display", "");


            if ($('#PIP5InputRadio').is(':checked') == false) {
                $('.PIP5Options').css("display", "none");
                $('#EPKGCIVIL100AdditionalCoverage').prop("checked", false);
                $('#EPKGCIVIL500AdditionalCoverage').prop("checked", false);
                $('.additionalCoverageCheckboxPIP5').prop("checked", false);
            }
            else if ($('#PIP5InputRadio').is(':checked') == true) {
                $("#EPKGoptions").css("display", "");
                $('.PIP5Options').css("display", "");
                $("#EPKGNOHAOption").css("display", "none");
                $('#EPKGNOHAAdditionalCoverage').prop("checked", false);
            }




        }
        if ($('#PIPChoiceInputRadio').is(':checked')) {
            $('#pipChoiceSelections').css('display', '');
            $('#PIPChoice_ExtraExpense').prop("checked", true);
            $('#PIPChoice_MiscRented').prop("checked", true);
            $('#PIPChoice_Props').prop("checked", true);
            $('#PIPChoice_ThirdParty').prop("checked", true);

        }
        else {
            $('#pipChoiceSelections').css('display', 'none');
            $('#PIPChoice_ExtraExpense').prop("checked", false);
            $('#PIPChoice_MiscRented').prop("checked", false);
            $('#PIPChoice_Props').prop("checked", false);
            $('#PIPChoice_ThirdParty').prop("checked", false);
        }
        //uncheck NOHA if NOHA is included in Misc Rental Equip
        if ($('#PIP1InputRadio').is(':checked') || $('#PIP2InputRadio').is(':checked') || $('#PIP3InputRadio').is(':checked') ||
            $('#PIP4InputRadio').is(':checked') || $('#PIP5InputRadio').is(':checked')) {
            var termLength;
            var datesAreValid = true;
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            var mdyEffective = $('#proposedEffectiveDate').val().split('/');
            var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0] - 1, mdyEffective[1]);
            var day = mdyEffectiveDateObject.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var monthIndex = mdyEffectiveDateObject.getMonth() + 1;
            if (monthIndex < 10) {
                monthIndex = '0' + monthIndex;
            }
            var year = mdyEffectiveDateObject.getFullYear();

            if ($('#PIP3InputRadio').is(':checked') || $('#PIP4InputRadio').is(':checked') || $('#PIP5InputRadio').is(':checked')) {
                year = mdyEffectiveDateObject.getFullYear() + 1;
                $("#proposedExpirationDate").val((monthIndex) + "/" + day + "/" + year);
                $('#proposedTermLength').val(365 + " Days");
                pulseInputChange($('#proposedTermLength'));
                $("#CPKCGLcoverage").trigger('change');

            }
            else if ($('#PIP1InputRadio').is(':checked') || $('#PIP2InputRadio').is(':checked')) {
                var dat = new Date(mdyEffectiveDateObject.valueOf());
                dat.setDate(dat.getDate() + 60);
                day = dat.getDate();
                monthIndex = dat.getMonth() + 1;
                if (monthIndex < 10) {
                    monthIndex = '0' + monthIndex;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                // alert("pip2: " + day)
                year = dat.getFullYear();
                $("#proposedExpirationDate").val((monthIndex) + "/" + day + "/" + year);
                $('#proposedTermLength').val(60 + " Days");
                pulseInputChange($('#proposedTermLength'));
                $("#CPKCGLcoverage").trigger('change');
            }

            if (riskChosen === "Film Projects With Cast (No Work Comp)") {
                $("#EPKGoptions").css("display", "");
                $("#EPKGNOHAOption").css("display", "none");

            }
            else {
                if($('#PIP3InputRadio').is(':checked') || $('#PIP4InputRadio').is(':checked') || $('#PIP5InputRadio').is(':checked')){
                    // console.log("PIP 5 HIDE NOHA")
                    // $("#EPKGoptions").css("display", "none");
                    $("#EPKGNOHAOption").css("display", "none");
                    if($('#PIP5InputRadio').is(':checked')){
                        $("#EPKGoptions").css("display", "");
                    }
                    else{
                        $("#EPKGoptions").css("display", "none");
                    }
                }
                else{
                    $("#EPKGoptions").css("display", "");
                    $("#EPKGNOHAOption").css("display", "");
                }

            }

            if($('#EPKGNOHAAdditionalCoverage').is(":checked")){
                $('#EPKGNOHAAdditionalCoverage').prop("checked", true);
            }
            else{
                $('#EPKGNOHAAdditionalCoverage').prop("checked", false);
            }



        }
        else if ($('#PIP5InputRadio').is(':checked')) {

            $("#EPKGoptions").css("display", "");
            $('.PIP5Options').css("display", "");
            $("#EPKGNOHAOption").css("display", "none");
            $('#EPKGNOHAAdditionalCoverage').prop("checked", false);
        }




    });

    $(document.body).on('change', '#EPKGcoverage', function() {
        //alert();
        // console.log("EPKGCOVERAGE BUTTON CHANGE")

        if ($('#EPKGcoverage').is(':checked')) {
            if (riskChosen === "Film Projects With Cast (No Work Comp)") {
                $(".FILMWITHCASTNOWCOptions").css("display", "");
                $(".PIP5Only").css("display", "none");
            }
            else {
                $(".FILMWITHCASTNOWCOptions").css("display", "none");
                $(".PIP5Only").css("display", "");
            }
            $("#EPKGoptions").css("display", "");
            $('#EPKGProductsDiv').find('input:radio').first().prop("checked", true);
            $('#EPKGProductsDiv').find('input:radio').first().trigger('change')
        }
        else {
            $('#PIP1InputRadio').prop("checked", false);
            $('#PIP2InputRadio').prop("checked", false);
            $('#PIP3InputRadio').prop("checked", false);
            $('#PIP4InputRadio').prop("checked", false);
            $('#PIP5InputRadio').prop("checked", false);
            $('#PIPChoiceInputRadio').prop("checked", false);
            $('.additionalCoverageCheckboxEPKG').prop("checked", false);
            $("#EPKGoptions").css("display", "none");

            $('#pipChoiceSelections').css('display', 'none');
            $('#PIPChoice_ExtraExpense').prop("checked", false);
            $('#PIPChoice_MiscRented').prop("checked", false);
            $('#PIPChoice_Props').prop("checked", false);
            $('#PIPChoice_ThirdParty').prop("checked", false);
        }
    });

    $(document.body).on('change', '#CPKInputRadio, #CGLInputRadio', function() {
        if ($('#CPKInputRadio').is(':checked') || $('#CGLInputRadio').is(':checked')) {
            $('#CPKCGLcoverage').prop("checked", true);
            $("#CPKCGLoptions").css("display", "");
            if ($('#CPKInputRadio').is(':checked')) {
                $("#costOfHireDiv").css("display", "");
                $("#costOfHireInput").val("$");
            }
            else {
                $("#costOfHireDiv").css("display", "none");
                $("#costOfHireInput").val("$");
            }

            var termLength = parseInt($("#proposedTermLength").val().split(" ")[0]);
            if (termLength <= 60) {
                $("#BAIAdditionalCoverage").parent().css("display", "none");
                $("#BAIAdditionalCoverage").prop("checked", false);
            }
            else {
                $("#BAIAdditionalCoverage").parent().css("display", "");
                $("#BAIAdditionalCoverage").prop("checked", false);
            }
            if (termLength <= 30) {

                $("#EAIAdditionalCoverage").parent().css("display", "none");
                $("#WOSAdditionalCoverage").parent().css("display", "none");
                $("#MEDAdditionalCoverage").parent().css("display", "");
                $("#AGGAdditionalCoverage").parent().css("display", "");


                $("#EAIAdditionalCoverage").prop("checked", false);
                $("#WOSAdditionalCoverage").prop("checked", false);
                $("#MEDAdditionalCoverage").prop("checked", false);
                $("#AGGAdditionalCoverage").prop("checked", false);
            }
            else {

                $("#EAIAdditionalCoverage").parent().css("display", "");
                $("#WOSAdditionalCoverage").parent().css("display", "");
                $("#MEDAdditionalCoverage").parent().css("display", "");
                $("#AGGAdditionalCoverage").parent().css("display", "");


                $("#EAIAdditionalCoverage").prop("checked", false);
                $("#WOSAdditionalCoverage").prop("checked", false);
                $("#MEDAdditionalCoverage").prop("checked", false);
                $("#AGGAdditionalCoverage").prop("checked", false);
            }
        }
    });

    $(document.body).on('change', '#CPKCGLcoverage', function() {
        if ($('#CPKCGLcoverage').is(':checked')) {
            $('#CPKInputRadio').prop("checked", true);
            $('#CPKInputRadio').trigger("change");
            $("#CPKCGLoptions").css("display", "");
            if ($('#CPKInputRadio').is(':checked')) {
                $("#costOfHireDiv").css("display", "");
                $("#costOfHireInput").val("$");
            }

            var termLength = parseInt($("#proposedTermLength").val().split(" ")[0]);
            if (termLength <= 60) {
                $("#BAIAdditionalCoverage").parent().css("display", "none");
                $("#BAIAdditionalCoverage").prop("checked", false);
            }
            else {
                $("#BAIAdditionalCoverage").parent().css("display", "");
                $("#BAIAdditionalCoverage").prop("checked", false);
            }
            if (termLength <= 30) {
                $("#EAIAdditionalCoverage").parent().css("display", "none");
                $("#WOSAdditionalCoverage").parent().css("display", "none");
                $("#MEDAdditionalCoverage").parent().css("display", "");
                $("#AGGAdditionalCoverage").parent().css("display", "");

                $("#EAIAdditionalCoverage").prop("checked", false);
                $("#WOSAdditionalCoverage").prop("checked", false);
                $("#MEDAdditionalCoverage").prop("checked", false);
                $("#AGGAdditionalCoverage").prop("checked", false);
            }
            else {
                $("#EAIAdditionalCoverage").parent().css("display", "");
                $("#WOSAdditionalCoverage").parent().css("display", "");
                $("#MEDAdditionalCoverage").parent().css("display", "");
                $("#AGGAdditionalCoverage").parent().css("display", "");

                $("#EAIAdditionalCoverage").prop("checked", false);
                $("#WOSAdditionalCoverage").prop("checked", false);
                $("#MEDAdditionalCoverage").prop("checked", false);
                $("#AGGAdditionalCoverage").prop("checked", false);
            }
        }
        else {
            $('#CPKInputRadio').prop("checked", false);
            $('#CGLInputRadio').prop("checked", false);
            $('.additionalCoverageCheckboxCPKCGL').prop("checked", false);
            $("#CPKCGLoptions").css("display", "none");
            $("#costOfHireDiv").css("display", "none");
            $("#costOfHireInput").val("$");
            $("#BAIAdditionalCoverage").parent().css("display", "none");
            $("#EAIAdditionalCoverage").parent().css("display", "none");
            $("#WOSAdditionalCoverage").parent().css("display", "none");
            $("#MEDAdditionalCoverage").parent().css("display", "");
            $("#AGGAdditionalCoverage").parent().css("display", "none");

            $("#BAIAdditionalCoverage").prop("checked", false);
            $("#EAIAdditionalCoverage").prop("checked", false);
            $("#WOSAdditionalCoverage").prop("checked", false);
            $("#MEDAdditionalCoverage").prop("checked", false);
            $("#AGGAdditionalCoverage").prop("checked", false);
        }
        return false;
    });







    $(document.body).on('click', '.attachClearButton', function() {
        $(this).closest('.fileNameContainer').find('.fileNameSpan').html("");
        var spanID = $(this).closest('.fileNameContainer').find('.fileNameSpan').attr('id');
        $("#" + spanID.replace("Span", "")).val('');
        //alert("#" + spanID.replace("Span",""));

    });


    //Coverage Checkboxes
    var focusinBudget = "";
    $(document.body).on('focusin', '#totalBudgetConfirm', function(e) {
        focusinBudget = $(this).val();
    });
    $(document.body).on('keyup', '#totalBudgetConfirm', function(e) {
        if($(this).val() === focusinBudget){
            enableCoverageOptionsContainer()
        }
        else{
            disableCoverageOptionsContainer()
        }
    });

    var focusinRateAdjust = "";
    $(document.body).on('focusin', '.rateAdjust', function(e) {
        focusinRateAdjust = $(this).val();
    });
    $(document.body).on('keyup', 'rateAdjust', function(e) {
        if($(this).val() === focusinBudget){
            enableCoverageOptionsContainer()
        }
        else{
            disableCoverageOptionsContainer()
        }
    });



    $(document.body).on('change', '#totalBudgetConfirm', function() {
        //console.log($(this).val());
        if ($(this).val().trim().length > 0 && $(this).val() != "$0.00") {
            $('#coverageOptionsReview').addClass("panel-primary");
            $('#coverageOptionsReview').removeClass("panel-default");
            $('#coverageOptionsReview').parent().css("color", "#1f1f1f");
            $('#coverageOptionsTitle').css("color", "#fff");
            // $('#loadingModal').modal('show');
            //console.log($("li.active").html());
            //if ($("li.active").length > 0) {
            //    getProductsForRisk();
            //}

            //console.log("budget confirm rating");
            var budget = $(this).val();
            $("#totalBudgetInput").val(budget);
            $("#totalBudgetConfirm").val(budget);

            //console.log($("#totalBudgetConfirm").val().split(".")[0]);
            $('.PIPCHOILimitsInput').val($("#totalBudgetConfirm").val().split(".")[0]);
            $('.CPKNOHALimitsInput').val($("#totalBudgetConfirm").val().split(".")[0]);

            //var tempLimit = $("#totalBudgetInput").val().replace(/\$|,/g, '')
            //console.log("LIMIT AMOUNT1 === " + tempLimit)
            //if(riskChosen === "Film Projects With Cast (No Work Comp)"){
            //    tempLimit = parseInt($("#totalBudgetInput").val().replace(/\$|,/g, ''));
            //    tempLimit = Math.ceil(tempLimit / 1000) * 1000;
            //}
            //console.log("LIMIT AMOUNT === " + tempLimit)


            pipChoiceMisc = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceExtra = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceProps = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceThird = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceNOHA = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceCast = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceCastEssential = $("#totalBudgetConfirm").val().split(".")[0];

            //pipChoiceMisc = formatMoney(tempLimit);
            //pipChoiceExtra = formatMoney(tempLimit);
            //pipChoiceProps = formatMoney(tempLimit);
            //pipChoiceThird = formatMoney(tempLimit);
            //pipChoiceNOHA = formatMoney(tempLimit);
            if (riskChosen === "Film Projects Without Cast (With Work Comp)" || riskChosen === "Film Projects With Cast (With Work Comp)") {
                clearProductChoices();
            }
            else{
                getProductsForRisk();
            }
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



        //ratePremiums(this);
    });
    $(document.body).on('change', '#costOfHireInput', function() {
        //console.log("CALL FROM COST OF HIRE")
        ratePremiums(this);
    });

    var currentChecked;
    $(document.body).on('click', '.additionalCoverageCheckboxPIP5', function() {
        //alert(currentChecked + "=" + $(this).attr('id'));
        if ($(this).attr('id') === currentChecked) {
            $('.additionalCoverageCheckboxPIP5').prop('checked', false);
            $('.additionalCoverageCheckboxPIP5').trigger('change');
            currentChecked = "";
        }

        if ($('#EPKGCIVIL100AdditionalCoverage').is(':checked')) {
            currentChecked = $('#EPKGCIVIL100AdditionalCoverage').attr('id');
        }
        else if ($('#EPKGCIVIL500AdditionalCoverage').is(':checked')) {
            currentChecked = $('#EPKGCIVIL500AdditionalCoverage').attr('id');
        }
    });

    var currentCheckedEPKG37;
    $(document.body).on('click', '.FWCNWCCheckbox', function() {
        //alert(currentChecked + "=" + $(this).attr('id'));
        if ($(this).attr('id') === currentCheckedEPKG37) {
            $('.FWCNWCCheckbox').prop('checked', false);
            $('.FWCNWCCheckbox').trigger('change');
            currentCheckedEPKG37 = "";
        }

        if ($('#EPKGFWCNWCCIVIL100AdditionalCoverage').is(':checked')) {
            currentCheckedEPKG37 = $('#EPKGFWCNWCCIVIL100AdditionalCoverage').attr('id');
        }
        else if ($('#EPKGFWCNWCCIVIL500AdditionalCoverage').is(':checked')) {
            currentCheckedEPKG37 = $('#EPKGFWCNWCCIVIL500AdditionalCoverage').attr('id');
        }
    });

    $(document.body).on('change', '.coverageInput, .additionalCoverageCheckboxEPKG, .additionalCoverageCheckboxCPKCGL, #EPKGNOHAAdditionalCoverage, #EPKGcoverage' +
        '#EPKGCASTEssentialAdditionalCoverage, .FWCNWCCheckbox, #totalBudgetConfirm, .additionalCoverageCheckboxPIP5, .PIPCHOIOption, #castEssentialInput',
        function() {
            //console.log("CALL FROM COVERAGEINPUT CHANGE AND OTHERS")
            //console.log($(this));
            var termLength = parseInt($("#proposedTermLength").val().split(" ")[0]);
            if ($('#totalBudgetConfirm').val().length > 1) {
                //IF ANNUAL POLICY SHOW ANNUAL OPTIONS
                if ($('#EPKGcoverage').is(':checked')) {
                    if ($('#PIPChoiceInputRadio').is(':checked')) {
                        // if (termLength >= 365) {
                        //     $('.AnnualOptions').css("display", "");
                        // }
                        // else {
                        //     $('.AnnualOptions').css("display", "none");
                        // }
                    }
                    else {
                        if (termLength >= 365) {
                            // $('.AnnualOptions').css("display", "");
                        }
                        else {
                            // $('.AnnualOptions').css("display", "none");
                        }
                    }
                }
                else {

                }


                ratePremiums($('#totalBudgetconfirm'));
            }

            //alert();
        });



    $(document.body).on('keyup', '.PIPCHOILimitsInput', function() {
        //console.log("change");
        var limitAmount = $(this).val().replace(/\$|,/g, '');
        var rate = 0.0;
        var coverageLine = $(this).parent().siblings(".coverageColumn").find("span").html();
        var minPremium = 0;
        var premium = 0;
        var maxLimit = 0;
        var termLength = parseInt($("#proposedTermLength").val().split(" ")[0]);
        var pipChoiceTotalMinPrem = 250

        var extraRate = .0010
        var extraMP = 100
        var thirdRate = .0005
        var thirdMP = 100
        var propsRate = .005
        var propsMP = 100
        var miscRate = .005
        var miscMP = 100
        var castRate = 1.1
        var castMP = 100

        if (coverageLine.indexOf("Extra Expense") > -1) {
            rate = extraRate;
            minPremium = extraMP;
            maxLimit = 1000000;
        }
        else if (coverageLine.indexOf("Third Party Prop Damage Liab") > -1) {
            rate = thirdRate;
            minPremium = thirdMP;
            maxLimit = 1000000;
        }
        else if (coverageLine.indexOf("Props, Sets") > -1) {
            rate = propsRate;
            minPremium = propsMP;
            maxLimit = 1000000;
        }
        else if (coverageLine.indexOf("Miscellaneous Rented Equipment") > -1) {
            rate = miscRate;
            minPremium = miscMP;
            maxLimit = 1000000;
        }
        else if (coverageLine.indexOf("Cast Insurance") > -1) {
            rate = 1.1;
            minPremium = 100;
            maxLimit = 1000000;
        }


        if (limitAmount > maxLimit) {
            //alert("Maximum Limit for this Product is  " + maxLimit);
            //FORMAT CURRENCY
            $(this).val("$" + maxLimit.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

            //return;
            limitAmount = maxLimit;
        }

        if (coverageLine.indexOf("Cast Insurance") > -1) {
            //console.log("LIMIT AMOUNT1 === " + limitAmount)
            //console.log("RATE AMOUNT1 === " + rate)
            premium = (limitAmount * rate) / 100;
        }
        else {
            if (termLength <= 30) {
                premium = ((((limitAmount * rate) / 365) * termLength) * 10);
            }
            else {
                premium = limitAmount * rate;
            }
        }


        if (premium < minPremium) {
            premium = minPremium;
        }

        $(this).parent().siblings(".premiumColumn").find(".PIPCHOIPremiumLine").html(formatMoney(premium));


        var deductAmount = 0;
        if (limitAmount <= 250000) {
            deductAmount = 2500;
        }
        else if (limitAmount > 250000 && limitAmount <= 500000) {
            deductAmount = 2500;
        }
        else if (limitAmount > 500000) {
            deductAmount = 2500;
        }
        $(this).parent().siblings(".deductibleColumn").find(".PIPCHOIDeductLine").html(formatMoney(deductAmount));

        var totalPremium = 0;

        $('div#coverageOptionsReview div#limitsDeductPremiumInsert span.PIPCHOIPremiumLine').each(function() {
            totalPremium = totalPremium + parseInt($(this).html().replace(/\$|,/g, ''));
        });

        if(totalPremium < pipChoiceTotalMinPrem){
            totalPremium = 250
        }
        // console.log("PIPCHOI: " + totalPremium);
        $("#PIPCHOIPremiumTotal").html(formatMoney(totalPremium));
        $("#EPKGPremiumLOBTotal").html(formatMoney(totalPremium));

        ////RECALCULATE ALL LOBS AND TOTAL
        //var totalAllLOBPremium = 0.0;
        //$('.premiumSpan').each(function () {
        //    if($.isNumeric($(this).html())){
        //        totalAllLOBPremium = totalAllLOBPremium + parseFloat($(this).html());
        //    }
        //});

        totalUpPremiumAndTax();
        var elem = document.createElement('textarea');
        pipchoiceLimits = "";
        $('.PIPCHOILimitsInput').each(function(index) {
            elem.innerHTML = $(this).parent().siblings(".coverageColumn").children().first().html();
            var decoded = elem.value;
            if ($(this).val().length == 0) {
                if ($('#totalBudgetConfirm').val().length > 0) {
                    pipchoiceLimits = pipchoiceLimits + decoded + "&;&" + $('#totalBudgetConfirm').val() + "&;;&";
                    $(this).val($('#totalBudgetConfirm').val());
                }
                else {
                    pipchoiceLimits = pipchoiceLimits + decoded + "&;&" + 0 + "&;;&";
                    $(this).val("0");
                }

            }
            else {
                pipchoiceLimits = pipchoiceLimits + decoded + "&;&" + $(this).val() + "&;;&";
            }



            if (decoded === "Miscellaneous Rented Equipment") {
                pipChoiceMisc = $(this).val();
            }
            else if (decoded === "Extra Expense") {
                pipChoiceExtra = $(this).val();
            }
            else if (decoded === "Props, Sets & Wardrobe") {
                pipChoiceProps = $(this).val();
            }
            else if (decoded === "Third Party Prop Damage Liab") {
                pipChoiceThird = $(this).val();
            }
            else if (decoded === "Hired Auto Physical Damage") {
                pipChoiceNOHA = $(this).val();
            }
            else if (decoded === "Cast Insurance") {
                pipChoiceCast = $(this).val();
            }
            else if (decoded === "Cast Essential") {
                pipChoiceCastEssential = $(this).val();
            }
        });




        //FIX TAXES
        if($('#taxRateInfoDiv').length > 0){
            // console.log("tax String = " + $('#taxRateInfoDiv').attr('data-taxstring'))
            var taxString = $('#taxRateInfoDiv').attr('data-taxstring');
            calculateTaxesFromTaxString(taxString);
        }


    });


    $(document.body).on('keyup', '.CPKNOHALimitsInput', function() {
        //console.log("change");
        var limitAmount = $(this).val().replace(/\$|,/g, '');
        var rate = .06;
        var minPremium = 500;
        var premium = 0;
        var maxLimit = 1000000;

        premium = limitAmount * rate;
        //alert(limitAmount + "+" + rate + "=" + premium);
        if (premium < minPremium) {
            premium = minPremium;
        }

        $(this).parent().siblings(".premiumColumn").find(".NOAL01PremiumLine").html(premium);

        var totalPremium = 0;
        $(".NOAL01PremiumLine").each(function() {
            totalPremium = totalPremium + parseInt($(this).html().replace(/\$|,/g, ''));
        });

        $("#NOAL01PremiumTotal").html(totalPremium);
    });
}

function checkWCandCastInputs(){
    if ($("li.active").length > 0) {
        riskChosen = getRiskTypeChosen();
    }
    else {
        riskChosen = reviewRiskChosen; //FROM REVIEW SUBMISSION MODAL
    }

    if (riskChosen === "Film Projects Without Cast (No Work Comp)") {
        riskHasCast = false;
        riskHasWC = false;
    }
    else if (riskChosen === "Film Projects Without Cast (With Work Comp)") {
        riskHasCast = false;
        riskHasWC = true;
    }
    else if (riskChosen === "Film Projects With Cast (No Work Comp)") {
        riskHasCast = true;
        riskHasWC = false;
        $('#EPKGCASTOption').css("display", "");
        //$('#EPKGCASTEssentialOption').css("display", "");
        $(document.body).on('change', '#EPKGCASTEssentialAdditionalCoverage', function() {
            if ($("#EPKGCASTEssentialAdditionalCoverage").is(':checked')) {
                $('#castEssentialDiv').css("display", "");
            }
            else {
                $('#castEssentialDiv').css("display", "none");
                $("#castEssentialInput").prop("checked", false);
            }
        });

        //REMOVE PHYSICAL LOCATION INFO PARTS
        $('.physicalAddressNumBuildings').parent().remove();
        $('.physicalAddressHabUnits').parent().remove();
        $('.physicalAddressCommSqFt').parent().remove();
        $('.interestSelect').parent().remove();
    }
    else if (riskChosen === "Film Projects With Cast (With Work Comp)") {
        riskHasCast = true;
        riskHasWC = true;
    }

    if (riskHasCast) {
        $('#questionListPriorFilmProjects').css('display', '');
        $('#listOfPriorFilms').css('display', '');
        $('#questionTotalAbove').css('display', '');
        $('#totalAboveLine').css('display', '');

        $('#questionTotalBelow').css('display', '');
        $('#totalBelowLine').css('display', '');

        $('#questionTotalPost').css('display', '');
        $('#totalPostProductionCost').css('display', '');

        $('#questionFilmingLocations').css('display', '');
        $('#questionSourceFinancing').css('display', '');
        $('#sourceOfFinancing').css('display', '');

        $('#questionCompletionBondRequired').css('display', '');
        $('#questionsCast').css('display', '');
        $('#numberOfCastMembers').css('display', '');
        $('.castMemberName').css('display', '');
        $('.castMemberAge').css('display', '');
        $('.castMemberRole').css('display', '');
    }
    else {
        $('#questionListPriorFilmProjects').css('display', 'none');
        $('#listOfPriorFilms').css('display', 'none');

        $('#questionTotalAbove').css('display', 'none');
        $('#totalAboveLine').css('display', 'none');

        $('#questionTotalBelow').css('display', 'none');
        $('#totalBelowLine').css('display', 'none');

        $('#questionTotalPost').css('display', 'none');
        $('#totalPostProductionCost').css('display', 'none');

        $('#questionFilmingLocations').css('display', 'none');
        $('#questionSourceFinancing').css('display', 'none');
        $('#sourceOfFinancing').css('display', 'none');

        $('#questionCompletionBondRequired').css('display', 'none');
        $('#questionsCast').css('display', 'none');
        $('#numberOfCastMembers').css('display', 'none');
        $('.castMemberName').css('display', 'none');
        $('.castMemberAge').css('display', 'none');
        $('.castMemberRole').css('display', 'none');
    }

    if (riskHasWC) {
        $('#questionListPriorFilmProjects').css('display', '');
        $('#listOfPriorFilms').css('display', '');
        $('#statesOfHire').css('display', '');
        $('#statesOfHireAndPayroll').css('display', '');
        $('#questionFilmingLocations').css('display', '');
        $('#questionSourceFinancing').css('display', '');
        $('#sourceOfFinancing').css('display', '');
        $('#questionCompletionBondRequired').css('display', '');
    }
    else {
        $('#workCompCoverageRequested').css('display', 'none');
        $('#statesOfHire').css('display', 'none');
        $('#statesOfHireAndPayroll').css('display', 'none');
        $('#namesOfOfficers').css('display', 'none');
        $('#namesOfficerTitleOwnership').css('display', 'none');
        $('#namesOfOfficersExcluded').css('display', 'none');
        $('#officersExcludedUnderWC').css('display', 'none');
    }
}

function checkPhotographyDates() {

}

function formatPercentage(elem){
        $(elem).mask("9?9%");

        $(elem).on("blur", function() {
            var jObj = $(this);
            var jVal = jObj.val();
            jObj.val((jVal.length === 1) ? jVal + '%' : jVal);
        })
}





function addOverflowTransitionClass() {
    $('.NOHADeductLine').parent().addClass("deductibleColumnTwoLine")
    $(".deductibleColumn").each(function(index) {
        var largestInnerHeight = 0;
        var combinedInnerHeight = 0;
        $(this).find('span').each(function(index) {
            combinedInnerHeight = combinedInnerHeight + $(this).innerHeight();
            if ($(this).innerHeight() > largestInnerHeight) {
                largestInnerHeight = $(this).innerHeight();
            }
        });
        //alert( $(this).innerHeight() + " - " + largestInnerHeight +" - " + $(this).html());

        //if (largestInnerHeight >  $(this).innerHeight() || combinedInnerHeight > $(this).innerHeight() ) {
        if ($(this).innerHeight() > 24) {

            $(this).addClass("deductibleColumnOverflow");
            //$(this).append("<span class='glyphicon glyphicon-arrow-down'> </span>")
        }
    });
}

function totalUpPremiumAndTax() {
    //alert();

    var totalPremium = 0.0;
    $('div#coverageInfoPanel .premiumSpan, div#coverageInfoPanel .taxSpan').each(function() {

        if ($.isNumeric($(this).html())) {
            // console.log("TOTALING === " + parseFloat($(this).html()));
            totalPremium = totalPremium + parseFloat($(this).html());
        }
        else if ($(this).html().substring(0, 1) === "\$") {
            // console.log("TOTALING === " + $(this).html())
            var v = $(this).html();
            v = v.replace("$", "");
            v = v.replace(/,/g, "");
            // console.log("TOTALING ===== " + v);
            //v = ("$"+v+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            totalPremium = totalPremium + parseFloat(v);
        }
    });
    $("#premiumAllLOBTotal").html(formatTaxAndFee(totalPremium));
}
function inputMoneyFormat() {
// MONEY FORMAT
    $('#maxCostOneProduction').maskMoney({prefix: '$', precision: "0"});
    $('#totalAboveLine').maskMoney({prefix: '$', precision: "0"});
    $('#totalBelowLine').maskMoney({prefix: '$', precision: "0"});
    $('#totalPostProductionCost').maskMoney({prefix: '$', precision: "0"});
    $('#annualPayroll').maskMoney({prefix: '$', precision: "0"});
    $('#umbrellaLimitRequested').maskMoney({prefix: '$', precision: "0"});
    $('#equipmentLimit').maskMoney({prefix: '$', precision: "0"});
    $('.errorOmissionsLiability').maskMoney({prefix: '$', precision: "0"});
    $('#errorOmissionsLiability').maskMoney({prefix: '$', precision: "0"});
    $('#totalBudgetInput').maskMoney({prefix: '$', precision: "0"});
    $('#totalBudgetConfirm').maskMoney({prefix: '$', precision: "0"});
    $('#costOfHireInput').maskMoney({prefix: '$', precision: "0"});
    $('#brokerFeeInput').maskMoney({prefix: '$', precision: "0"});

};
function buildProductIDArray(data, termLength) {
    var productID = "";
    var termLength = parseInt(termLength.split(" "));
    if (riskChosen === "Film Projects With Cast (No Work Comp)") {
        if ($('#EPKGcoverage').is(':checked')) {
            productID = productID + "EPKG37" + ";";
            //EPKG37RateInfo = $('#EPKG37_RateInfo').html();
            //data["EPKG37RateInfo"] = EPKG37RateInfo;
        }
        EPKGRateInfo = $('#EPKG_RateInfo').html();
        data["EPKGRateInfo"] = EPKGRateInfo;
    }
    else {
        if ($('#PIPChoiceInputRadio').is(':checked')) {
            productID = productID + "PIP CHOI" + ";";
            //pipChoiRateInfo = $('#PIPCHOI_RateInfo').html();
            //data["pipChoiRateInfo"] = pipChoiRateInfo;

        }
        if ($('#PIP1InputRadio').is(':checked')) {
            productID = productID + "PIP 1" + ";";
            //pip1RateInfo = $('#PIP1_RateInfo').html();
            //data["pip1RateInfo"] = pip1RateInfo;
        }
        if ($('#PIP2InputRadio').is(':checked')) {
            productID = productID + "PIP 2" + ";";
            //pip2RateInfo = $('#PIP2_RateInfo').html();
            //data["pip2RateInfo"] = pip2RateInfo;
        }
        if ($('#PIP3InputRadio').is(':checked')) {
            productID = productID + "PIP 3" + ";";
            //pip3RateInfo = $('#PIP3_RateInfo').html();
            //data["pip3RateInfo"] = pip3RateInfo;
        }
        if ($('#PIP4InputRadio').is(':checked')) {
            productID = productID + "PIP 4" + ";";
            //pip4RateInfo = $('#PIP4_RateInfo').html();
            //data["pip4RateInfo"] = pip4RateInfo;
        }
        if ($('#PIP5InputRadio').is(':checked')) {
            productID = productID + "PIP 5" + ";";
            //pip5RateInfo = $('#PIP5_RateInfo').html();
            //data["pip5RateInfo"] = pip5RateInfo;
        }
        EPKGRateInfo = $('#EPKG_RateInfo').html();
        data["EPKGRateInfo"] = EPKGRateInfo;
    }

    if ($('#CPKInputRadio').is(':checked')) {
        if (termLength > 30) {
            if (riskChosen === "Film Projects Without Cast (No Work Comp)" || riskChosen === "Film Projects With Cast (No Work Comp)") {
                productID = productID + "BARCPKSF" + ";";
            }
            else if (riskChosen === "Annual Blanket Film Projects (DICE)") {
                productID = productID + "BARCPKGP" + ";";
            }


        }
        else if (termLength <= 30) {
            productID = productID + "BARCPKGC" + ";";
        }
        CPKRateInfo = $('#CPK_RateInfo').html();
        NOALRateInfo = $('#NOAL_RateInfo').html();
        data["CPKRateInfo"] = CPKRateInfo + NOALRateInfo;

    }
    if ($('#CGLInputRadio').is(':checked')) {
        if (termLength > 30) {
            if (riskChosen === "Film Projects Without Cast (No Work Comp)" || riskChosen === "Film Projects With Cast (No Work Comp)") {
                productID = productID + "BARCPKSF" + ";";
            }
            else if (riskChosen === "Annual Blanket Film Projects (DICE)") {
                productID = productID + "BARCPKGP" + ";";
            }

        }
        else if (termLength <= 30) {
            productID = productID + "BARCPKGC" + ";";
        }
        CGLRateInfo = $('#CGL_RateInfo').html();
        data["CGLRateInfo"] = CGLRateInfo;
    }

    return productID;
}

