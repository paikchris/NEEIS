/**
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



var riskChosen;
$(document).ready(function() {

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

    //CHECKBOXES THAT HIDE AND SHOW FIELDS
    $(document.body).on('change', '#tvSeriesCheckBox', function() {
        if ($("#tvSeriesCheckBox").is(':checked')) {
            $('#specFilmNumEpisodesText').css("display", "");
        }
        else {
            $('#specFilmNumEpisodesText').css("display", "none");
        }
    });

    $(document.body).on('change', '#showFilmLocationsCheckbox', function() {
        if ($("#showFilmLocationsCheckbox").is(':checked')) {
            $('#filmingLocationInfo').css("display", "");
        }
        else {
            $('#filmingLocationInfo').css("display", "none");
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


    //NUMBER OF CAST MEMBERS
    $(document.body).on('change', '#numberOfCastMembers', function() {
        if ($.isNumeric($(this).val())) {
            var htmlString = "";

            var finalString = "";
            //alert($(this).val());
            if (parseInt($(this).val()) <= 10) {
                for (var i = 0; i < parseInt($(this).val()); i++) {
                    htmlString = "<div class='row'>" +
                        "<div class='col-xs-6'>" +
                        "<div class='form-group'>" +
                        "<input type='text' class='form-control  castMemberName' id='castMember" + i + "NameInput' data-reviewName='Cast Member Name, Age, Role'" +
                        "name='castMemberName' placeholder='Name'/>" +
                        "</div>" +
                        "</div>" +
                        "<div class='col-xs-2'>" +
                        "<div class='form-group'>" +
                        "<input type='text' class='form-control  castMemberAge' id='castMember" + i + "AgeInput' data-reviewName='Cast Member Name, Age, Role'" +
                        "name='castMemberAge' placeholder='Age'/>" +
                        "</div>" +
                        "</div>" +
                        "<div class='col-xs-4'>" +
                        "<div class='form-group'>" +
                        "<input type='text' class='form-control  castMemberRole' id='castMember" + i + "RoleInput' data-reviewName='Cast Member Name, Age, Role'" +
                        "name='castMemberRole' placeholder='Role'/>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    finalString = finalString + htmlString;
                }
            }
            else {
                alert("Please enter only up to 10 cast members.")
                $(this).val("10");
                for (var i = 0; i < 10; i++) {
                    htmlString = "<div class='row'>" +
                        "<div class='col-xs-6'>" +
                        "<div class='form-group'>" +
                        "<input type='text' class='form-control  castMemberName' id='castMember" + i + "NameInput' data-reviewName='Cast Member Name, Age, Role'" +
                        "name='castMemberName' placeholder='Name'/>" +
                        "</div>" +
                        "</div>" +
                        "<div class='col-xs-2'>" +
                        "<div class='form-group'>" +
                        "<input type='text' class='form-control  castMemberAge' id='castMember" + i + "AgeInput' data-reviewName='Cast Member Name, Age, Role'" +
                        "name='castMemberAge' placeholder='Age'/>" +
                        "</div>" +
                        "</div>" +
                        "<div class='col-xs-4'>" +
                        "<div class='form-group'>" +
                        "<input type='text' class='form-control  castMemberRole' id='castMember" + i + "RoleInput' data-reviewName='Cast Member Name, Age, Role'" +
                        "name='castMemberRole' placeholder='Role'/>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    finalString = finalString + htmlString;
                }
            }

            $('#castMemberDetailContainer').html(finalString);
        }
        else {
            $(this).val("");
        }




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


    //$(document.body).on('change', '#productionInvolvesNoneAbove' ,function(){
    //    //alert("NONE");
    //    if($("#productionInvolvesNoneAbove").is(':checked')) {
    //
    //    }
    //    else{
    //
    //    }
    //});

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
    $('#totalBudgetInput').maskMoney({
        prefix: '$',
        precision: "0"
    });
    $('#totalBudgetConfirm').maskMoney({
        prefix: '$',
        precision: "0"
    });
    $('#costOfHireInput').maskMoney({
        prefix: '$',
        precision: "0"
    });
    $('#brokerFeeInput').maskMoney({
        prefix: '$',
        precision: "0"
    });

    $(document.body).on('change', '#totalBudgetInput, #totalBudgetConfirm', function() {
        //alert("Budget change");

    });

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
    //$(document.body).on('change', '#principalPhotographyDateStart, #principalPhotographyDateEnd' ,function(){
    //    //alert("Budget change");
    //    var termLength;
    //    var datesAreValid = true;
    //    var today = new Date();
    //    today.setHours(0, 0, 0, 0);
    //    var mdyEffective = $('#principalPhotographyDateStart').val().split('/');
    //    var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0]-1, mdyEffective[1]);
    //
    //    var mdyProposedEffective =  $('#proposedEffectiveDate').val().split('/');
    //    var mdyProposedEffectiveObject = new Date(mdyProposedEffective[2], mdyProposedEffective[0]-1, mdyProposedEffective[1]);
    //
    //    if (mdyEffectiveDateObject.getTime() < today.getTime()) {
    //        alert("Effective Date must be a present or future date");
    //        $(this).val("");
    //        datesAreValid = false;
    //    }
    //
    //
    //    var riskChosen = $("li.active").children("a.riskOptionLink").html().trim();
    //
    //
    //        if($(this).attr("id") === "principalPhotographyDateStart"  && mdyEffectiveDateObject.getTime() >= today.getTime()
    //            && mdyEffectiveDateObject.getTime() >= mdyProposedEffectiveObject.getTime()   ){
    //            //alert(mdyEffectiveDateObject);
    //            var day = mdyEffectiveDateObject.getDate();
    //            if (day < 10) { day = '0' + day; }
    //            var monthIndex = mdyEffectiveDateObject.getMonth() + 1;
    //            if (monthIndex < 10) { monthIndex = '0' + monthIndex; }
    //            var year = mdyEffectiveDateObject.getFullYear() + 1;
    //            $("#principalPhotographyDateEnd").val( (monthIndex) + "/" + day + "/" + year);
    //            $("#proposedEffectiveDate").val($("#principalPhotographyDateStart").val());
    //            $("#proposedExpirationDate").val($("#principalPhotographyDateEnd").val());
    //            $('#proposedTermLength').val(365 + " Days")
    //        }
    //        else{
    //            //alert("not valid");
    //            $("#principalPhotographyDateStart").val( "");
    //            $("#principalPhotographyDateEnd").val( "");
    //            $("#proposedEffectiveDate").val("");
    //            $("#proposedExpirationDate").val("");
    //            $('#proposedTermLength').val("")
    //        }
    //
    //
    //});
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
        $('#filmingLocationInfo').find('.locationFilm').each(function() {
            count++
            htmlString = $(this).html();
            htmlString = htmlString.replace("Filming Location #1", " Filming Location # " + (count + 1));
            htmlString = htmlString.replace("Filming Location # " + count, "Filming Location # " + (count + 1));
        });
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
                var filmingLocationHeader = $(this).find('h5').html();
                if (filmingLocationHeader == "Filming Location #1") {}
                else {
                    $(this).find('h5').html("Filming Location # " + count);
                }
            });
        }
    });
    // add and remove filming location
    $(document.body).on('change', '#PIP1InputRadio, #PIP2InputRadio, #PIP3InputRadio, #PIP4InputRadio, #PIP5InputRadio, #PIPChoiceInputRadio', function() {
        //alert($('#PIP3InputRadio').is(':checked'));
        if ($("li.active").length > 0) {
            riskChosen = getRiskTypeChosen();
        }
        else {
            riskChosen = reviewRiskChosen; //FROM REVIEW SUBMISSION MODAL
        }
        $("#EPKGoptions").css("display", "");


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
                year = dat.getFullYear();
                $("#proposedExpirationDate").val((monthIndex) + "/" + day + "/" + year);
                $('#proposedTermLength').val(60 + " Days");
                $("#CPKCGLcoverage").trigger('change');
            }

            if (riskChosen === "Film Projects With Cast (No Work Comp)") {
                $("#EPKGoptions").css("display", "");
                $("#EPKGNOHAOption").css("display", "none");

            }
            else {
                $("#EPKGoptions").css("display", "");
                $("#EPKGNOHAOption").css("display", "");
            }

            $('#EPKGNOHAAdditionalCoverage').prop("checked", false);


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
        if ($('#EPKGcoverage').is(':checked')) {
            if (riskChosen === "Film Projects With Cast (No Work Comp)") {
                $(".FILMWITHCASTNOWCOptions").css("display", "");
                //$('#EPKGCASTAdditionalCoverage').prop("checked", true);
                //$('#EPKGCASTAdditionalCoverage').trigger('click');
                //$('#EPKGCASTEssentialOption').css("display","");


            }
            else {
                //$('#EPKGCASTAdditionalCoverage').prop("checked", false);
                $("FILMWITHCASTNOWCOptions").css("display", "none");
                //$('#EPKGCASTEssentialOption').css("display","none");
            }
            //alert();
            if ($("#PIPChoiceInput").is(":visible")) {
                $('#PIPChoiceInputRadio').prop("checked", true);
                $('#PIPChoiceInputRadio').trigger("change");

            }
            else {
                $('#PIP5InputRadio').prop("checked", true);
                $('#PIP5InputRadio').trigger("change");
            }
            $("#EPKGoptions").css("display", "");
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




    var date_input = $('input[name="date"]'); //our date input has the name "date"
    var container = $('#page-content-wrapper');
    var options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        orientation: "auto top",
        autoclose: true,
    };
    date_input.datepicker(options);


    $(':file').change(function() {
        var file = this.files[0];

        var name = file.name;
        var size = file.size;
        var type = file.type;
        var ext = $(this).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['zip', 'doc', 'docx', 'xlsx', 'xls', 'pdf', 'txt']) == -1) {
            alert('Only .zip, .doc, .docx, .xlsx, .xls, .pdf, .txt are permitted');
            $(this).val('');
        }
        else {
            //alert(name);

            //alert('Only .zip, .doc, .docx, .xlsx, .xls, .pdf are permitted');
            var iconFilePath = "";
            if (ext == "zip") {
                iconFilePath = "zipIcon.png"
            }
            else if (ext == "doc") {
                iconFilePath = "docIcon.png"
            }
            else if (ext == "docx") {
                iconFilePath = "docxIcon.png"
            }
            else if (ext == "xls") {
                iconFilePath = "xlsIcon.png"
            }
            else if (ext == "xlsx") {
                iconFilePath = "xlsxIcon.png"
            }
            else if (ext == "pdf") {
                iconFilePath = "pdfIcon.png"
            }
            else if (ext == "txt") {
                iconFilePath = "txtIcon.png"
            }
            else {
                iconFilePath = "fileIcon.png"
            }

            $("#" + $(this).attr('id') + 'Span').closest(".fileNameContainer").css("display", "");
            $("#" + $(this).attr('id') + 'Span').html("<img src='/portal/images/" + iconFilePath + "' height='16' width='16' style='margin-right:5px'/>" + name);
        }
        //console.log(this.files[0]);
        //Your validation
    });

    $(document.body).on('click', '.attachClearButton', function() {
        $(this).closest('.fileNameContainer').find('.fileNameSpan').html("");
        var spanID = $(this).closest('.fileNameContainer').find('.fileNameSpan').attr('id');
        $("#" + spanID.replace("Span", "")).val('');
        //alert("#" + spanID.replace("Span",""));

    });


    //Coverage Checkboxes
    $(document.body).on('keyup', '#totalBudgetConfirm', function() {
        //console.log($(this).val());
        if ($(this).val().trim().length > 0 && $(this).val() != "$0.00") {
            $('#coverageOptionsReview').addClass("panel-primary");
            $('#coverageOptionsReview').removeClass("panel-default");
            $('#coverageOptionsReview').parent().css("color", "#1f1f1f");
            $('#coverageOptionsTitle').css("color", "#fff");
            $('#loadingModal').show();
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
            getProductsForRisk();
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
    $(document.body).on('keyup', '#costOfHireInput', function() {
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

                    }
                    else {
                        if (termLength >= 365) {
                            $('.AnnualOptions').css("display", "");
                        }
                        else {
                            $('.AnnualOptions').css("display", "none");
                        }
                    }


                }
                else {

                }


                ratePremiums($('#totalBudgetconfirm'));
            }

            //alert();
        });

    //$(document.body).on('change', '.PIPCHOILimitsInput' ,function(){
    //    //alert();
    //    var tempLimit = parseInt($(this).val().replace(/\$|,/g, ''));
    //    //console.log("LIMIT AMOUNT1 === " + tempLimit)
    //    if(riskChosen === "Film Projects With Cast (No Work Comp)"){
    //        tempLimit = Math.ceil(tempLimit / 1000) * 1000;
    //        //limitAmount = tempLimit
    //    }
    //    //console.log("LIMIT AMOUNT === " + tempLimit)
    //    $(this).val(formatMoney(tempLimit));
    //    $(this).trigger('keyup');
    //
    //});


    $(document.body).on('keyup', '.PIPCHOILimitsInput', function() {
        //console.log("change");
        var limitAmount = $(this).val().replace(/\$|,/g, '');
        var rate = 0.0;
        var coverageLine = $(this).parent().siblings(".coverageColumn").find("span").html();
        var minPremium = 0;
        var premium = 0;
        var maxLimit = 0;
        var termLength = parseInt($("#proposedTermLength").val().split(" ")[0]);

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

        if ($('#runRatesButton').length > 0) {
            extraRate = $('#PIPCHOI_extraRate').val() / 100;
            extraMP = $('#PIPCHOI_extraMP').val();
            thirdRate = $('#PIPCHOI_thirdRate').val() / 100;
            thirdMP = $('#PIPCHOI_thirdMP').val();
            propsRate = $('#PIPCHOI_propsRate').val() / 100;
            propsMP = $('#PIPCHOI_propsMP').val();
            miscRate = $('#PIPCHOI_miscRate').val() / 100;
            miscMP = $('#PIPCHOI_miscMP').val();
            castRate = $('#PIPCHOI_castRate').val() / 100;
            castMP = $('#PIPCHOI_castMP').val();
            //alert();
        }


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


        //console.log("PREMIUM AMOUNT1 === " + premium)
        //alert(limitAmount + "+" + rate + "=" + premium);
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
        $(".PIPCHOIPremiumLine").each(function() {
            totalPremium = totalPremium + parseInt($(this).html().replace(/\$|,/g, ''));
        });

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


});

function checkPhotographyDates() {

}



function ratePremiums(thisObj) {
    console.log("Rating Premiums");
    var rateMap = {};
    var val = $(thisObj).val();
    if ($("li.active").length > 0) {
        riskChosen = getRiskTypeChosen();
    }
    else if (thisObj === "runRatesButton") {
        riskChosen = reviewRiskChosen; //FROM REVIEW SUBMISSION MODAL]
        $('#rateContainer :input').each(function() {
            rateMap["" + $(this).attr('id')] = $(this).val();

        });


        //RE RUNNING RATES
        //PIP1

    }
    //alert(rateMap.toString)
    var prodString = $(".productsSelect option[value='" + val + "']").text();
    var productsSelected = "";
    var additionalProducts = "";
    var pipChoiOptions = "";




    ///////////////////////////// Film Projects With Cast (No Work Comp)
    if (riskChosen === "Film Projects With Cast (No Work Comp)") {
        if ($('#EPKGcoverage').is(':checked')) {
            productsSelected = productsSelected + "EPKG" + ":" + "EPKG37" + ",";
        }
        if ($('#CPKInputRadio').is(':checked')) {
            productsSelected = productsSelected + $('#CPKInputRadio').attr('class').replace("coverageRadioButton ", "") + ":" + $('#CPKInputRadio').val() + ",";
            if ($('#CPKInputRadio').hasClass("CPK")) {
                productsSelected = productsSelected + "NOAL" + ":" + "NOAL01" + ",";
            }
        }
        if ($('#CGLInputRadio').is(':checked')) {
            productsSelected = productsSelected + $('#CGLInputRadio').attr('class').replace("coverageRadioButton ", "") + ":" + $('#CGLInputRadio').val() + ",";
        }
        //if($('#EPKGCASTAdditionalCoverage').is(':checked')){
        //    additionalProducts = additionalProducts + "EPKGCASTAdditionalCoverage" + ":" + "EPKGCASTAdditionalCoverage" + ",";
        //}

        if ($('#EPKGCASTEssentialAdditionalCoverage').is(':checked')) {
            additionalProducts = additionalProducts + "EPKGCASTEssentialAdditionalCoverage" + ":" + "EPKGCASTEssentialAdditionalCoverage" + ",";
        }
        //alert($("#hardwareElectronicDataCheckbox").is(':checked'));
        $(".additionalCoverageCheckboxEPKG").each(function(index) {
            if ($(this).is(':checked')) {
                additionalProducts = additionalProducts + $(this).attr("id") + ":" + $(this).attr("id") + ",";
            }
        });
    }
    else {
        $(".coverageRadioButton").each(function(index) {
            if ($(this).is(':checked')) {
                productsSelected = productsSelected + $(this).attr('class').replace("coverageRadioButton ", "") + ":" + $(this).val() + ",";
                if ($(this).hasClass("CPK")) {
                    productsSelected = productsSelected + "NOAL" + ":" + "NOAL01" + ",";
                }
            }
        });
        $(".additionalCoverageCheckboxEPKG").each(function(index) {
            if ($(this).is(':checked')) {
                additionalProducts = additionalProducts + $(this).attr("id") + ":" + $(this).attr("id") + ",";
            }
        });
    }

    ///////////////////////////// Film Projects With Cast (No Work Comp)


    $("#EPKGNOHAAdditionalCoverage").each(function(index) {
        if ($(this).is(':checked')) {
            productsSelected = productsSelected + "NOHA" + ":" + $(this).val() + ",";
        }
    });

    $(".additionalCoverageCheckboxCPKCGL").each(function(index) {
        if ($(this).is(':checked')) {
            additionalProducts = additionalProducts + $(this).attr("id") + ":" + $(this).attr("id") + ",";
        }
    });

    $('.PIPCHOIOption').each(function(index) {
        if ($(this).is(':checked')) {
            pipChoiOptions = pipChoiOptions + $(this).attr('id') + ",";
        }

    });
    $(".additionalCoverageCheckboxPIP5").each(function(index) {
        if ($(this).is(':checked')) {
            additionalProducts = additionalProducts + $(this).attr("id") + ":" + $(this).attr("id") + ",";
        }
    });


    //alert(productsSelected);

    var CGLNOALLimit = "";
    var elem = document.createElement('textarea');
    $('.PIPCHOILimitsInput').each(function(index) {
        elem.innerHTML = $(this).parent().siblings(".coverageColumn").children().first().html();
        var decoded = elem.value;
        if ($(this).val().length == 0) {
            pipchoiceLimits = pipchoiceLimits + decoded + "&;&" + 0 + "&;;&";
            $(this).val("0");
            //$(this).val($('#totalBudgetConfirm').val());
        }
        else {
            pipchoiceLimits = pipchoiceLimits + decoded + "&;&" + $(this).val() + "&;;&";
        }

        //var tempLimit = $("#totalBudgetInput").val().replace(/\$|,/g, '')
        //console.log("LIMIT AMOUNT1 === " + tempLimit)
        //if(riskChosen === "Film Projects With Cast (No Work Comp)"){
        //    tempLimit = parseInt($("#totalBudgetInput").val().replace(/\$|,/g, ''));
        //    tempLimit = Math.ceil(tempLimit / 1000) * 1000;
        //}
        //console.log("LIMIT AMOUNT === " + tempLimit)

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
    //console.log(pipChoiceMisc);
    $('.CPKNOHALimitsInput').each(function(index) {
        elem.innerHTML = $(this).parent().siblings(".coverageColumn").children().first().html();
        var decoded = elem.value;
        if (decoded === "Hired Auto Physical Damage") {
            CGLNOALLimit = $(this).val();
        }
    });
    //console.log(pipchoiceLimits);
    //alert(productsSelected)
    //alert(additionalProducts)
    if (productsSelected.length > 0 && parseFloat($("#totalBudgetConfirm").val().replace(/\$|,/g, '')) > 0) {
        //console.log($('#costOfHireInput').val());
        //alert(pipchoiceLimits)

        $.ajax({
                method: "POST",
                url: "/portal/Async/ratePremiums",
                //url: "/portal/Async/newRatePremiums",
                data: {
                    riskType: riskChosen,
                    productsSelected: productsSelected,
                    pipChoiOptions: pipChoiOptions,
                    pipChoiceLimits: pipchoiceLimits.replace(/\$|,/g, ''),
                    additionalProducts: additionalProducts,
                    totalBudget: $("#totalBudgetConfirm").val().replace(/\$|,/g, ''),
                    proposedTermLength: $("#proposedTermLength").val(),
                    costOfHire: $('#costOfHireInput').val().replace(/\$|,/g, ''),
                    castEssentialNum: $('#castEssentialInput').val(),
                    rateMap: JSON.stringify(rateMap)

                }
            })
            .done(function(msg) {
                //alert(msg);
                //alert( "Data Saved: " + msg );
                responseJSON = JSON.parse(msg);
                //alert(responseJSON.coverages.length);

                if ($('#runRatesButton').length > 0) { //IF IN REVIEW PANEL AND RERUNNING RATES
                    var tempRateMap = {}
                    ////PIP1 RATING
                    //submissionRateMap["pip1_negativeFilmVideoRateMinPrem"] = pip1_negativeFilmVideoRateMinPrem
                    //submissionRateMap["pip1_faultyStockCameraProcessingRateMinPrem"] = pip1_faultyStockCameraProcessingRateMinPrem
                    //submissionRateMap["pip1_miscRentedEquipRateMinPrem"] = pip1_miscRentedEquipRateMinPrem
                    //submissionRateMap["pip1_propsSetWardrobeRateMinPrem"] = pip1_propsSetWardrobeRateMinPrem
                    //submissionRateMap["pip1_thirdPartyPropDamageRateMinPrem"] = pip1_thirdPartyPropDamageRateMinPrem
                    //submissionRateMap["pip1_extraExpenseRateMinPrem"] = pip1_extraExpenseRateMinPrem
                    //submissionRateMap["pip1_minPremium"] = pip1_minPremium
                    for (var i = 0; i < responseJSON.coverages.length; i++) {
                        if (responseJSON.coverages[i].coverageCode === "EPKG") {
                            $('#PIPCHOIRatesRow').css('display', 'none');
                            $('#PIP1RatesRow').css('display', 'none');
                            $('#PIP2RatesRow').css('display', 'none');
                            $('#PIP3RatesRow').css('display', 'none');
                            $('#PIP4RatesRow').css('display', 'none');
                            $('#PIP5RatesRow').css('display', 'none');
                            tempRateMap = responseJSON.coverages[i].submissionRateMap;
                            if (responseJSON.coverages[i].productCode === "PIP CHOI") {
                                $('#PIPCHOIRatesRow').css('display', '')

                            }
                            else if (responseJSON.coverages[i].productCode === "PIP 1") {

                                $('#PIP1RatesRow').css('display', '')
                            }
                            else if (responseJSON.coverages[i].productCode === "PIP 2") {

                                $('#PIP2RatesRow').css('display', '')
                            }
                            else if (responseJSON.coverages[i].productCode === "PIP 3") {

                                $('#PIP3RatesRow').css('display', '')
                            }
                            else if (responseJSON.coverages[i].productCode === "PIP 4") {

                                $('#PIP4RatesRow').css('display', '')
                            }
                            else if (responseJSON.coverages[i].productCode === "PIP 4") {

                                $('#PIP5RatesRow').css('display', '')
                            }
                            $('#PIPCHOI_miscRate').val(tempRateMap['pipChoice_miscRentedEquipRateMinPrem'][0]);
                            $('#PIPCHOI_miscMP').val(tempRateMap['pipChoice_miscRentedEquipRateMinPrem'][1]);
                            $('#PIPCHOI_propsRate').val(tempRateMap['pipChoice_propsSetWardrobeRateMinPrem'][0]);
                            $('#PIPCHOI_propsMP').val(tempRateMap['pipChoice_propsSetWardrobeRateMinPrem'][1]);
                            $('#PIPCHOI_thirdRate').val(tempRateMap['pipChoice_thirdPartyPropDamageRateMinPrem'][0]);
                            $('#PIPCHOI_thirdMP').val(tempRateMap['pipChoice_thirdPartyPropDamageRateMinPrem'][1]);
                            $('#PIPCHOI_extraRate').val(tempRateMap['pipChoice_extraExpenseRateMinPrem'][0]);
                            $('#PIPCHOI_extraMP').val(tempRateMap['pipChoice_extraExpenseRateMinPrem'][1]);
                            $('#PIPCHOI_NOHARate').val(tempRateMap['pipChoice_NOHARateMinPrem'][0]);
                            $('#PIPCHOI_NOHAMP').val(tempRateMap['pipChoice_NOHARateMinPrem'][1]);

                            $('#PIP1_Rate').val("flat");
                            $('#PIP1_MP').val(tempRateMap['pip1_minPremium']);

                            $('#PIP2_Rate').val("flat");
                            $('#PIP2_MP').val(tempRateMap['pip2_PIP2premium']);
                            $('#PIP2_NOHARate').val(tempRateMap['pip2_NOHARateMinPrem'][0]);
                            $('#PIP2_NOHAMP').val(tempRateMap['pip2_NOHARateMinPrem'][1]);

                            $('#PIP3_Rate').val(tempRateMap['pip3_negativeFilmVideoRateMinPrem'][0]);
                            $('#PIP3_MP').val(tempRateMap['pip3_negativeFilmVideoRateMinPrem'][1]);

                            $('#PIP4_Rate').val(tempRateMap['pip4_negativeFilmVideoRateMinPrem'][0]);
                            $('#PIP4_MP').val(tempRateMap['pip4_negativeFilmVideoRateMinPrem'][1]);

                            $('#PIP5_Rate').val(tempRateMap['pip5_negativeFilmVideoRateMinPrem'][0]);
                            $('#PIP5_MP').val(tempRateMap['pip5_negativeFilmVideoRateMinPrem'][1]);









                        }
                    }



                    //
                    //

                    //
                    ////PIP2 RATING
                    //submissionRateMap["pip2_PIP2premium"] = pip2_PIP2premium
                    //submissionRateMap["pip2_negativeFilmVideoRateMinPrem"] = pip2_negativeFilmVideoRateMinPrem
                    //submissionRateMap["pip2_faultyStockCameraProcessingRateMinPrem"] = pip2_faultyStockCameraProcessingRateMinPrem
                    //submissionRateMap["pip2_miscRentedEquipRateMinPrem"] = pip2_miscRentedEquipRateMinPrem
                    //submissionRateMap["pip2_propsSetWardrobeRateMinPrem"] = pip2_propsSetWardrobeRateMinPrem
                    //submissionRateMap["pip2_thirdPartyPropDamageRateMinPrem"] = pip2_thirdPartyPropDamageRateMinPrem
                    //submissionRateMap["pip2_extraExpenseRateMinPrem"] = pip2_extraExpenseRateMinPrem
                    //submissionRateMap["pip2_officeContentsRateMinPrem"] = pip2_officeContentsRateMinPrem
                    //submissionRateMap["pip2_NOHARateMinPrem"] = pip2_NOHARateMinPrem
                    //
                    ////PIP3 RATING
                    //submissionRateMap["pip3_negativeFilmVideoRateMinPrem"] = pip3_negativeFilmVideoRateMinPrem
                    //
                    ////PIP4
                    //submissionRateMap["pip4_negativeFilmVideoRateMinPrem"] = pip4_negativeFilmVideoRateMinPrem
                    //
                    ////PIP5
                    //submissionRateMap["pip5_negativeFilmVideoRateMinPrem"] =pip5_negativeFilmVideoRateMinPrem
                    //submissionRateMap["pip5_civilAuthority100Limit"] = pip5_civilAuthority100Limit
                    //submissionRateMap["pip5_civilAuthority500Limit"] = pip5_civilAuthority500Limit
                }

                var limitDeductibleString = "";
                var lobDistString = "";
                var CPKincluded = false;
                var EPKGincluded = false;
                var termsInsert = "";
                var beginTerms = "";
                var endorseInsert = "";
                for (var i = 0; i < responseJSON.coverages.length; i++) {
                    if (responseJSON.coverages[i].coverageCode === "CPK") {
                        CPKincluded = true;
                        beginTerms = responseJSON.coverages[i].beginTerms;
                    }
                    if (responseJSON.coverages[i].coverageCode === "EPKG") {
                        EPKGincluded = true;
                        beginTerms = responseJSON.coverages[i].beginTerms;
                    }
                }
                for (var i = 0; i < responseJSON.coverages.length; i++) {
                    //alert(Object.keys(responseJSON.coverages[i].limits));
                    if (responseJSON.coverages[i].coverageCode === "NOHA") {
                        continue;
                    }

                    limitDeductibleString = limitDeductibleString + "<div class='row coverageCodeRow'>" +
                        "<div class='col-xs-6 ' >";
                    if (responseJSON.coverages[i].coverageCode === "NOAL" && CPKincluded) {
                        limitDeductibleString = limitDeductibleString + "<strong class='coverageCodeString' style='font-size:13px'>" + "NOAL" + "</strong>";
                        limitDeductibleString = limitDeductibleString + "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span'>" + "-" + "</span>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<strong style='font-size:13px'>" + "</strong>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span'>" + "-" + "</span>" +
                            "</div>" +
                            "</div>";
                    }
                    else if (responseJSON.coverages[i].coverageCode === "EPKG") {
                        if (responseJSON.coverages[i].productCode === "PIP CHOI") {
                            limitDeductibleString = limitDeductibleString + "<strong class='coverageCodeString' style='font-size:13px'>" + "EPKG" + "</strong>";
                            limitDeductibleString = limitDeductibleString +
                                "<span class='productID_pull' id='" + responseJSON.coverages[i].productCode.replace(/ /g, "") + "' data-cov='" + responseJSON.coverages[i].coverageCode + "' style='display:none'>" + responseJSON.coverages[i].productCode + "</span>";

                            limitDeductibleString = limitDeductibleString + "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span style='font-size:9px;'>" + "*Max $1,000,000" + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<strong style='font-size:13px'>" + "</strong>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span>" + "-" + "</span>" +
                                "</div>" +
                                "</div>";
                        }
                        else if (responseJSON.coverages[i].productCode === "PIP 1") {
                            limitDeductibleString = limitDeductibleString + "<strong class='coverageCodeString' style='font-size:13px'>" + "EPKG" + "</strong>";
                            limitDeductibleString = limitDeductibleString +
                                "<span class='productID_pull' id='" + responseJSON.coverages[i].productCode.replace(/ /g, "") + "' data-cov='" + responseJSON.coverages[i].coverageCode + "' style='display:none'>" + responseJSON.coverages[i].productCode + "</span>";
                            limitDeductibleString = limitDeductibleString + "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span style='font-size:9px;'>" + "" + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<strong style='font-size:13px'>" + "</strong>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span>" + "-" + "</span>" +
                                "</div>" +
                                "</div>";
                        }
                        else {
                            limitDeductibleString = limitDeductibleString + "<strong class='coverageCodeString' style='font-size:13px'>" + responseJSON.coverages[i].coverageCode + "</strong>";
                            limitDeductibleString = limitDeductibleString +
                                "<span class='productID_pull' id='" + responseJSON.coverages[i].productCode.replace(/ /g, "") + "' data-cov='" + responseJSON.coverages[i].coverageCode + "' style='display:none'>" + responseJSON.coverages[i].productCode + "</span>";
                            limitDeductibleString = limitDeductibleString + "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span'>" + "-" + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<strong style='font-size:13px'>" + "</strong>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span'>" + "-" + "</span>" +
                                "</div>" +
                                "</div>";
                        }

                    }
                    else if (responseJSON.coverages[i].coverageCode === "CPK") {
                        limitDeductibleString = limitDeductibleString + "<strong class='coverageCodeString' style='font-size:13px'>" + "CGL" + "</strong>";
                        limitDeductibleString = limitDeductibleString +
                            "<span class='productID_pull' id='" + responseJSON.coverages[i].productCode.replace(/ /g, "") + "' data-cov='" + responseJSON.coverages[i].coverageCode + "' style='display:none'>" + responseJSON.coverages[i].productCode + "</span>";
                        limitDeductibleString = limitDeductibleString + "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span>" + "-" + "</span>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<strong style='font-size:13px'>" + "</strong>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span>" + "-" + "</span>" +
                            "</div>" +
                            "</div>";
                    }
                    else {
                        limitDeductibleString = limitDeductibleString + "<strong class='coverageCodeString' style='font-size:13px'>" + responseJSON.coverages[i].coverageCode + "</strong>";
                        limitDeductibleString = limitDeductibleString +
                            "<span class='productID_pull' id='" + responseJSON.coverages[i].productCode.replace(/ /g, "") + "' data-cov='" + responseJSON.coverages[i].coverageCode + "' style='display:none'>" + responseJSON.coverages[i].productCode + "</span>";
                        limitDeductibleString = limitDeductibleString + "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span'>" + "-" + "</span>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<strong style='font-size:13px'>" + "</strong>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span'>" + "-" + "</span>" +
                            "</div>" +
                            "</div>";
                    }


                    var limitLines = Object.keys(responseJSON.coverages[i].limits);
                    if (responseJSON.coverages[i].coverageCode === "EPKG") {
                        if (limitLines.indexOf("Cast Insurance") > -1) {
                            limitLines.splice(limitLines.indexOf("Cast Insurance"), 1);
                            limitLines.push("Cast Insurance");
                        }
                        if (limitLines.indexOf("Cast Essential") > -1) {
                            limitLines.splice(limitLines.indexOf("Cast Essential"), 1);
                            limitLines.push("Cast Essential");
                        }
                        if (limitLines.indexOf("Negative Film & Videotape") > -1) {
                            limitLines.splice(limitLines.indexOf("Negative Film & Videotape"), 1);
                            limitLines.push("Negative Film & Videotape");
                        }
                        if (limitLines.indexOf("Faulty Stock & Camera Processing") > -1) {
                            limitLines.splice(limitLines.indexOf("Faulty Stock & Camera Processing"), 1);
                            limitLines.push("Faulty Stock & Camera Processing");
                        }
                        if (limitLines.indexOf("Miscellaneous Rented Equipment") > -1) {
                            limitLines.splice(limitLines.indexOf("Miscellaneous Rented Equipment"), 1);
                            limitLines.push("Miscellaneous Rented Equipment");
                        }
                        if (limitLines.indexOf("INC:Non-Owned Auto Physical Damage") > -1) {
                            limitLines.splice(limitLines.indexOf("INC:Non-Owned Auto Physical Damage"), 1);
                            limitLines.push("INC:Non-Owned Auto Physical Damage");
                        }
                        if (limitLines.indexOf("Extra Expense") > -1) {
                            limitLines.splice(limitLines.indexOf("Extra Expense"), 1);
                            limitLines.push("Extra Expense");
                        }
                        if (limitLines.indexOf("Props, Sets & Wardrobe") > -1) {
                            limitLines.splice(limitLines.indexOf("Props, Sets & Wardrobe"), 1);
                            limitLines.push("Props, Sets & Wardrobe");
                        }
                        if (limitLines.indexOf("Third Party Prop Damage Liab") > -1) {
                            limitLines.splice(limitLines.indexOf("Third Party Prop Damage Liab"), 1);
                            limitLines.push("Third Party Prop Damage Liab");
                        }
                        if (limitLines.indexOf("Office Contents") > -1) {
                            limitLines.splice(limitLines.indexOf("Office Contents"), 1);
                            limitLines.push("Office Contents");
                        }
                        if (limitLines.indexOf("Money & Securities") > -1) {
                            limitLines.splice(limitLines.indexOf("Money & Securities"), 1);
                            limitLines.push("Money & Securities");
                        }
                        if (limitLines.indexOf("Civil Authority (US Only)") > -1) {
                            limitLines.splice(limitLines.indexOf("Civil Authority (US Only)"), 1);
                            limitLines.push("Civil Authority (US Only)");
                        }
                        if (limitLines.indexOf("Money and Currency") > -1) {
                            limitLines.splice(limitLines.indexOf("Money and Currency"), 1);
                            limitLines.push("Money and Currency");
                        }
                        if (limitLines.indexOf("Furs, Jewelry, Art & Antiques") > -1) {
                            limitLines.splice(limitLines.indexOf("Furs, Jewelry, Art & Antiques"), 1);
                            limitLines.push("Furs, Jewelry, Art & Antiques");
                        }
                        if (limitLines.indexOf("Talent and Non Budgeted Costs") > -1) {
                            limitLines.splice(limitLines.indexOf("Talent and Non Budgeted Costs"), 1);
                            limitLines.push("Talent and Non Budgeted Costs");
                        }
                        if (limitLines.indexOf("Administrative Costs") > -1) {
                            limitLines.splice(limitLines.indexOf("Administrative Costs"), 1);
                            limitLines.push("Administrative Costs");
                        }
                        if (limitLines.indexOf("Hardware") > -1) {
                            limitLines.splice(limitLines.indexOf("Hardware"), 1);
                            limitLines.push("Hardware");
                        }
                        if (limitLines.indexOf("Data and Media") > -1) {
                            limitLines.splice(limitLines.indexOf("Data and Media"), 1);
                            limitLines.push("Data and Media");
                        }
                        if (limitLines.indexOf("Electronic Data Extra Expense") > -1) {
                            limitLines.splice(limitLines.indexOf("Electronic Data Extra Expense"), 1);
                            limitLines.push("Electronic Data Extra Expense");
                        }
                        //
                        if (limitLines.indexOf("Animal Mortality") > -1) {
                            limitLines.splice(limitLines.indexOf("Animal Mortality"), 1);
                            limitLines.push("Animal Mortality");
                        }

                        if (limitLines.indexOf("Animal Mortality Under Cast Insurance (Domestic Birds/Fish)") > -1) {
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Domestic Birds/Fish)"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Domestic Birds/Fish)");
                        }
                        if (limitLines.indexOf("Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)") > -1) {
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)");
                        }
                        if (limitLines.indexOf("Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))") > -1) {
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))");
                        }
                        if (limitLines.indexOf("Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))") > -1) {
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))");
                        }
                        if (limitLines.indexOf("Animal Mortality Under Cast Insurance (Farm Animals)") > -1) {
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Farm Animals)"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Farm Animals)");
                        }
                        if (limitLines.indexOf("Animal Mortality Under Cast Insurance (Wild Cats (Caged))") > -1) {
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Wild Cats (Caged))"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Wild Cats (Caged))");
                        }
                        if (limitLines.indexOf("Animal Mortality Under Cast Insurance (All Others - Refer Only)") > -1) {
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (All Others - Refer Only)"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (All Others - Refer Only)");
                        }



                        if (limitLines.indexOf("Hired Auto Physical Damage") > -1) {
                            limitLines.splice(limitLines.indexOf("Hired Auto Physical Damage"), 1);
                            limitLines.push("Hired Auto Physical Damage");
                        }
                    }
                    else if (responseJSON.coverages[i].coverageCode === "CPK" || responseJSON.coverages[i].coverageCode === "CGL") {
                        if (limitLines.indexOf("Each Occurrence") > -1) {
                            limitLines.splice(limitLines.indexOf("Each Occurrence"), 1);
                            limitLines.push("Each Occurrence");
                        }
                        if (limitLines.indexOf("General Aggregate Limit") > -1) {
                            limitLines.splice(limitLines.indexOf("General Aggregate Limit"), 1);
                            limitLines.push("General Aggregate Limit");
                        }
                        if (limitLines.indexOf("Products & Completed Operations") > -1) {
                            limitLines.splice(limitLines.indexOf("Products & Completed Operations"), 1);
                            limitLines.push("Products & Completed Operations");
                        }
                        if (limitLines.indexOf("Personal & Advertising Injury") > -1) {
                            limitLines.splice(limitLines.indexOf("Personal & Advertising Injury"), 1);
                            limitLines.push("Personal & Advertising Injury");
                        }
                        if (limitLines.indexOf("Fire Damage (Any One Fire)") > -1) {
                            limitLines.splice(limitLines.indexOf("Fire Damage (Any One Fire)"), 1);
                            limitLines.push("Fire Damage (Any One Fire)");
                        }

                        if (limitLines.indexOf("Medical Payments (Per Person)") > -1) {
                            limitLines.splice(limitLines.indexOf("Medical Payments (Per Person)"), 1);
                            limitLines.push("Medical Payments (Per Person)");
                        }
                        if (limitLines.indexOf("Increased Agg Limit") > -1) {
                            limitLines.splice(limitLines.indexOf("Increased Agg Limit"), 1);
                            limitLines.push("Increased Agg Limit");
                        }
                        if (limitLines.indexOf("Blanket Additional Insured Endorsement") > -1) {
                            limitLines.splice(limitLines.indexOf("Blanket Additional Insured Endorsement"), 1);
                            limitLines.push("Blanket Additional Insured Endorsement");
                        }
                        if (limitLines.indexOf("Waiver of Subrogation") > -1) {
                            limitLines.splice(limitLines.indexOf("Waiver of Subrogation"), 1);
                            limitLines.push("Waiver of Subrogation");
                        }
                        if (limitLines.indexOf("Additional Charge to Include Medical Payments") > -1) {
                            limitLines.splice(limitLines.indexOf("Additional Charge to Include Medical Payments"), 1);
                            limitLines.push("Additional Charge to Include Medical Payments");
                        }


                        if (limitLines.indexOf("Non-Owned & Hired Auto Liability") > -1) {
                            limitLines.splice(limitLines.indexOf("Non-Owned & Hired Auto Liability"), 1);
                            limitLines.push("Non-Owned & Hired Auto Liability");
                        }

                        //PUSH IN FRONT

                    }


                    limitLines.forEach(function(key, index) {
                        //alert.log(e);
                        if (key === "Non-Owned Auto Physical Damage" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                                responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3")) {
                            return;
                        }
                        var premiumForCoverageLine = "";
                        if (responseJSON.coverages[i].premiums[key]) {
                            premiumForCoverageLine = responseJSON.coverages[i].premiums[key][1];
                            //console.log("Premium: " + premiumForCoverageLine);
                        }
                        else {
                            premiumForCoverageLine = "undefined";
                        }

                        limitDeductibleString = limitDeductibleString + "<div class='row lobRow " +
                            responseJSON.coverages[i].productCode.replace(/ /g, "_") + " " +
                            responseJSON.coverages[i].coverageCode + " " +
                            responseJSON.coverages[i].coverageCode + "_LOBRow'";
                        if (index % 2 == 0) {
                            if (key === "Miscellaneous Rented Equipment" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                                    responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3")) {
                                limitDeductibleString = limitDeductibleString + " style= 'background-color: rgba(38, 80, 159, 0.13); height:44px'";
                            }
                            else {
                                limitDeductibleString = limitDeductibleString + " style= 'background-color: rgba(38, 80, 159, 0.13)'";
                            }

                        }
                        limitDeductibleString = limitDeductibleString + ">" +
                            "<div class='col-xs-6 coverageColumn' style='padding-left:20px'>";

                        if (key === "Miscellaneous Rented Equipment" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                                responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3")) {
                            limitDeductibleString = limitDeductibleString + "<span>" + key + "</span>" + "<br><span>Non-Owned Auto Physical Damage</span>" +
                                "</div>" +
                                "<div class='col-xs-2 limitColumn'>";
                        }
                        else if (key === "INC:Non-Owned Auto Physical Damage") {
                            limitDeductibleString = limitDeductibleString + "<span>" + key.split(":")[1] + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 limitColumn' style='line-height: 1.3'>";
                        }
                        else if (key === "Cast Essential") {
                            limitDeductibleString = limitDeductibleString + "<span>" + key + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 limitColumn' style='line-height: 1.3'>";
                        }
                        else {
                            limitDeductibleString = limitDeductibleString + "<span>" + key + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 limitColumn'>";
                        }



                        if (responseJSON.coverages[i].productCode === "PIP CHOI") {
                            if (key === "Hired Auto Physical Damage") {
                                limitDeductibleString = limitDeductibleString + "<span class='limit'>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span>";
                            }
                            else if (key === "Cast Essential") {
                                limitDeductibleString = limitDeductibleString + "<span class='limit' style='font-size:9px'>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span>";
                            }
                            else {
                                limitDeductibleString = limitDeductibleString + "<input class='form-control limit PIPCHOILimitsInput " + key.replace(/\s+/g, '').replace(/[^a-zA-Z-]/g, '') + "' type='text' placeholder = '$' name='numBuildings' " +
                                    "style='font-size: 12px;padding: 2px;margin-top: 3px; margin-bottom:3px; height: 20px;'/>";
                            }

                        }
                        else if (key === "Miscellaneous Rented Equipment" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                                responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3")) {
                            limitDeductibleString = limitDeductibleString + "<span class='limit'>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span> <br><span></span>";
                        }
                        else if (responseJSON.coverages[i].coverageCode === "NOAL" && CPKincluded) {
                            limitDeductibleString = limitDeductibleString + "<span class='limit'>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span>";
                        }
                        else {
                            if (key === "Cast Essential") {
                                limitDeductibleString = limitDeductibleString + "<span class='limit' style='font-size:11px'>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span>";
                            }
                            else if (key === "INC:Non-Owned Auto Physical Damage") {
                                limitDeductibleString = limitDeductibleString + "<span class='limit' style='font-size:11px;'>" + formatMoney(responseJSON.coverages[i].limits[key].split(":")[0]) + "</span>";
                            }
                            else {
                                limitDeductibleString = limitDeductibleString + "<span class='limit'>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span>";
                            }

                        }




                        limitDeductibleString = limitDeductibleString + "</div>";


                        if (key === "Miscellaneous Rented Equipment" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                                responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3")) {
                            limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 premiumColumn'>" +
                                "<span class='premium " + responseJSON.coverages[i].productCode.replace(/ /g, '') + "PremiumLine' >" + formatMoney(premiumForCoverageLine) + "</span> <br><span></span>" +
                                "</div>";
                        }
                        else if (key === "Cast Essential") {
                            limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 premiumColumn' style=''>" +
                                "<span class='premium " + responseJSON.coverages[i].productCode.replace(/ /g, '') + "PremiumLine' >" + formatMoney(premiumForCoverageLine) + "</span>" +
                                "</div>";
                        }
                        else {
                            limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 premiumColumn'>" +
                                "<span class='premium " + responseJSON.coverages[i].productCode.replace(/ /g, '') + "PremiumLine' >" + formatMoney(premiumForCoverageLine) + "</span>" +
                                "</div>";
                        }

                        if (key === "Miscellaneous Rented Equipment" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                                responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3")) {
                            limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 deductibleColumn'>" +
                                "<span class='deductible " + responseJSON.coverages[i].productCode.replace(/ /g, '') + "DeductLine'>" + formatMoney(responseJSON.coverages[i].deductibles[key]) +
                                "</span><br>" +
                                "<span class='deductible NOHADeductLine'>" + formatMoney(responseJSON.coverages[i].deductibles["Non-Owned Auto Physical Damage"]) +
                                "</span>";
                        }
                        else if (key === "Cast Essential") {
                            limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 deductibleColumn' style=''>" +
                                "<span class='deductible " + responseJSON.coverages[i].productCode.replace(/ /g, '') + "DeductLine'>" + formatMoney(responseJSON.coverages[i].deductibles[key]) +
                                "</span>";
                        }
                        else {
                            limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 deductibleColumn'>" +
                                "<span class='deductible " + responseJSON.coverages[i].productCode.replace(/ /g, '') + "DeductLine'>" + formatMoney(responseJSON.coverages[i].deductibles[key]) +
                                "</span>";
                        }
                        limitDeductibleString = limitDeductibleString + "</div>" +
                            "</div>";
                    });
                    limitDeductibleString = limitDeductibleString + "<div class='row' style='border-top: 1px solid rgba(0, 0, 0, 0.19);'>" +
                        "<div class='col-xs-6 ' >" +
                        "<strong style='font-size:13px'>" + "</strong>" +
                        "</div>" +
                        "<div class='col-xs-2 ' >" +
                        "<span'>" + "-" + "</span>" +
                        "</div>" +
                        "<div class='col-xs-2 ' >" +
                        "<strong style='font-size:13px' class='" + responseJSON.coverages[i].productCode.replace(/ /g, '_') + " productTotalPremium" +
                        "' id='" + responseJSON.coverages[i].productCode.replace(/ /g, '') + "PremiumTotal'>" + formatMoney(responseJSON.coverages[i].productTotalPremium) + "</strong>" +
                        "</div>" +
                        "<div class='col-xs-2 ' >" +
                        "<span'>" + "-" + "</span>" +
                        "</div>" +
                        "</div>";
                    limitDeductibleString = limitDeductibleString + "<span id='" + responseJSON.coverages[i].coverageCode + "_RateInfo' style='display:none'>" +
                        responseJSON.coverages[i].rateInfo + "</span>";
                    limitDeductibleString = limitDeductibleString + "<br>";

                    var lobLines = Object.keys(responseJSON.coverages[i].lobDist);
                    lobLines.forEach(function(key, index) {
                        for (var k = 0; k < responseJSON.coverages[i].lobDist[key].split(";").length; k++) {
                            if (responseJSON.coverages[i].lobDist[key].split(";")[k].length > 0) {
                                lobDistString = lobDistString + "<div class='row'";
                                if (index % 2 == 0) {
                                    lobDistString = lobDistString + " style= 'background-color: rgba(38, 80, 159, 0.13)'";
                                }
                                lobDistString = lobDistString + ">" +
                                    "<div class='col-xs-4'>" +
                                    "<span class='lineOfBusinessSpan'>" + responseJSON.coverages[i].lobDist[key].split(";")[k].split(",")[0] + "</span>" +
                                    "</div>" +
                                    "<div class='col-xs-3'>" +
                                    "<span class='premiumSpan' id='" + responseJSON.coverages[i].coverageCode + "PremiumLOBTotal'>" + formatMoney(responseJSON.coverages[i].lobDist[key].split(";")[k].split(",")[1]) + "</span>" +
                                    "</div>" +
                                    "<div class='col-xs-3'>" +
                                    "<span class='agentPercentSpan'>" + responseJSON.coverages[i].lobDist[key].split(";")[k].split(",")[3] + "</span>" +
                                    "</div>" +
                                    "</div>";
                            }
                        }


                    });

                    if (responseJSON.coverages[i].coverageCode != "NOAL") {
                        //termsInsert = termsInsert +
                        //    responseJSON.coverages[i].coverageCode + " - " + responseJSON.coverages[i].productCode + "\n"  +  responseJSON.coverages[i].terms + "\n\n\n";
                        endorseInsert = endorseInsert +
                            responseJSON.coverages[i].coverageCode + " - " + responseJSON.coverages[i].productCode + "\n" +
                            responseJSON.coverages[i].endorse + "\n\n\n";
                    }







                    if (responseJSON.coverages[i].productCode === "PIP CHOI") {
                        $('#limitsHeader').html("Please Enter Desired Limits");
                    }
                }

                $("#limitsDeductPremiumInsert").html(limitDeductibleString);
                $("#premDistributionInsert").html(lobDistString);
                $("#termsInsert").html(beginTerms + termsInsert);
                $("#endorseInsert").html(endorseInsert);
                var disclaimerInsert = "*TRIA is rejected as per form LMA 5091 U.S. Terrorism Risk Insurance Act 2002.  " +
                    "TRIA can be afforded for an additional premium charge equal to 1% of the total premium indication.";
                $("#disclaimerInsert").html(disclaimerInsert);

                //$("#premDistributionInsert").html(lobDistString);

                //Add NOAL to CPK if valid
                //console.log("lENGTH = " + $('.NOAL01PremiumTotal').length)
                if ($('#NOAL01PremiumTotal').length > 0) {
                    var noalPrem = $('#NOAL01PremiumTotal').html();
                    var cpkPrem = $('#BARCPKGCPremiumTotal').html();

                    var v1 = noalPrem;
                    v1 = v1.replace("$", "");
                    v1 = v1.replace(/,/g, "");

                    var v2 = cpkPrem;
                    v2 = v2.replace("$", "");
                    v2 = v2.replace(/,/g, "");

                    $("#CPKPremiumLOBTotal").html(formatMoney(parseFloat(v1) + parseFloat(v2)));




                }

                $('.PIPCHOILimitsInput').maskMoney({
                    prefix: '$',
                    precision: "0"
                });

                //var tempLimit = parseInt($("#totalBudgetInput").val().replace(/\$|,/g, ''));
                //console.log("LIMIT AMOUNT1 === " + tempLimit)
                //if(riskChosen === "Film Projects With Cast (No Work Comp)"){
                //    tempLimit = Math.ceil(tempLimit / 1000) * 1000;
                //}
                //console.log("LIMIT AMOUNT === " + tempLimit / 1000)

                $('.PIPCHOILimitsInput').val($("#totalBudgetInput").val());
                if (pipChoiceMisc.length > 0) {
                    $(".MiscellaneousRentedEquipment").val(pipChoiceMisc);
                }
                if (pipChoiceExtra.length > 0) {
                    $(".ExtraExpense").val(pipChoiceExtra);
                }
                if (pipChoiceProps.length > 0) {
                    $(".PropsSetsWardrobe").val(pipChoiceProps);
                }
                if (pipChoiceThird.length > 0) {
                    $(".ThirdPartyPropDamageLiab").val(pipChoiceThird);
                }
                if (pipChoiceNOHA.length > 0) {
                    $(".HiredAutoPhysicalDamage").val(pipChoiceNOHA);
                }
                if (pipChoiceCast.length > 0) {
                    $(".CastInsurance").val(pipChoiceCast);
                }
                if (pipChoiceCastEssential.length > 0) {
                    $(".CastEssential").val(pipChoiceCastEssential);
                }

                $('.PIPCHOILimitsInput').trigger("keyup");
                $('.CPKNOHALimitsInput').maskMoney({
                    prefix: '$',
                    precision: "0"
                });
                $('.CPKNOHALimitsInput').val($("#totalBudgetConfirm").val().split(".")[0]);
                if (CGLNOALLimit.length > 0) {
                    $(".HiredAutoPhysicalDamage").val(CGLNOALLimit);
                }
                $('.CPKNOHALimitsInput').trigger("keyup");
                getTaxInfo();
                totalUpPremiumAndTax();
                addOverflowTransitionClass();
                $('#castInsuranceRequiredCheckBox').trigger('change');

            });

    }
    else {
        //alert("clear all");
        $("#limitsDeductPremiumInsert").html("");
        $("#premDistributionInsert").html("");
        $("#termsInsert").html("");
        $("#endorseInsert").html("");
        $("#taxRows").html("");
        $("#premiumAllLOBTotal").html("");
        $("#disclaimerInsert").html("");
    }
    //alert("");

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
    $('.premiumSpan, .taxSpan').each(function() {
        //console.log("TOTALING === " + $(this).html())
        if ($.isNumeric($(this).html())) {
            totalPremium = totalPremium + parseFloat($(this).html());
        }
        else if ($(this).html().substring(0, 1) === "\$") {
            var v = $(this).html();
            v = v.replace("$", "");
            v = v.replace(/,/g, "");
            //console.log("PREMIUM LINE ===== " + v);
            //v = ("$"+v+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            totalPremium = totalPremium + parseFloat(v);
        }
    });
    $("#premiumAllLOBTotal").html(formatTaxAndFee(totalPremium));
}

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

//function buildReview() {
//    $("#reviewRiskType").html($("li.active").children("a.riskOptionLink").html().trim());
//    //alert($("#namedInsured").html());
//    $("#reviewNamedInsured").html($("#namedInsured").val());
//    $("#reviewMailingAddress").html($("#googleAutoAddress").val());
//    $("#reviewMailingCity").html($("#cityMailing").val());
//    $("#reviewMailingZipcode").html($("#zipCodeMailing").val());
//    $("#reviewMailingState").html($("#stateMailing").val());
//    $("#reviewPhoneNumber").html($("#phoneNumber").val());
//    $("#reviewEmail").html($("#namedInsuredEmail").val());
//    $("#reviewWebsite").html($("#website").val());
//
//    $("#reviewTotalBudget").html($("#totalBudgetConfirm").val());
//    $("#reviewPrincipalPhotographyDates").html($("#principalPhotographyDateStart").val() + " to " + $("#principalPhotographyDateEnd").val());
//    $("#reviewProposedEffective").html($("#proposedEffectiveDate").val());
//    $("#reviewProposedExpiration").html($("#proposedExpirationDate").val());
//    $("#reviewProposedTerm").html($("#proposedTermLength").val());
//    $("#reviewSubject").html($("#endorseInsert").html());
//
//
//    $("#reviewNameProduction").html($("#titleOfProduction").val());
//    $("#reviewNameProductionCompany").html($("#nameOfProductionCompany").val());
//    $("#reviewNamePrincipals").html($("#nameOfPrincipal").val());
//    $("#reviewNumberYearsExperience").html($("#numberOfYearsOfExperience").val());
//    $("#reviewPriorLosses").html($("#listOfPriorLosses").val());
//
//    var limitValueArray = [];
//    $("#limitsDeductPremiumInsert").find('.limitColumn').each(function () {
//        if ($(this).find('input').length) {
//            limitValueArray.push($(this).find('input').val());
//        }
//    });
//    var htmlString = $("#limitsDeductPremiumInsert").html();
//    var object = $('<div/>').html(htmlString).contents();
//    object.find('.limitColumn').each(function (index) {
//        if ($(this).find('input').length) {
//            $(this).html("<span>" + limitValueArray[index] + "<span>");
//        }
//    });
//    $("#reviewLimitsDeducts").html(object);
//
//    var str = $("<div />").append($('#premDistributionInsert').clone()).html();
//        str = str + $("<div />").append($('.TaxHeaderRow').clone()[0]).html();
//    str = str + $("<div />").append($('#taxRows').clone()[0]).html();
//    str = str + $("<div />").append($('.TotalPremiumRow').clone()[0]).html();
//    $("#reviewPremDistribution").html( str);
//    $("#reviewTerms").html($("#termsInsert").html());
//    //$("#reviewSubject").html($("#subjectInsert").html());
//    $("#reviewBrokerFee").html($("#brokerFeeInput").val());
//
//    var reviewString = "";
//    var checkboxesReviewed = "";
//    var blankAnswer = "To Follow"
//    $(".showReview").each(function () {
//        if ($(this).css("display") != "none") {
//            if ($(this).is("select")) {
//                // the input field is not a select
//                var answer = "";
//                if ($(this).find(":selected").text().length > 0) {
//                    answer = $(this).find(":selected").text()
//                }
//                else {
//                    answer = blankAnswer;
//                }
//                reviewString = reviewString + "<div class='row'>" +
//                    "<div class='col-xs-3 text-left'>" +
//                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
//                    "</div>" +
//                    "<div class='col-xs-9'>" +
//                    "<div class='reviewSpan' id='reviewBrokerFee'>" + answer + "</div>" +
//                    "</div>" +
//                    "</div>";
//                reviewString = reviewString + "<br>";
//
//                //STORE IN UW QUESTIONS
//                uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
//                uwQuestionsOrder.push($(this).attr("data-reviewName"));
//
//            }
//            else if ($(this).is(':checkbox') && $(this).attr("data-reviewName")) {
//                // the input field is not a select
//                //alert($(this).attr("data-reviewName") + " - " + checkboxesReviewed + " - " +  checkboxesReviewed.indexOf($(this).attr("data-reviewName")));
//                if (checkboxesReviewed.indexOf($(this).attr("data-reviewName")) == -1) {
//                    var checkboxesCheckedString = "";
//
//                    var answer = "";
//
//
//                    reviewString = reviewString + "<div class='row'>" +
//                        "<div class='col-xs-3 text-left'>" +
//                        "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
//                        "</div>";
//
//                    $('input[data-reviewName="' + $(this).attr("data-reviewName") + '"]').each(function () {
//                        if ($(this).is(":checked")) {
//                            //alert($(this).val());
//                            checkboxesCheckedString = checkboxesCheckedString + $(this).val() + ", ";
//                        }
//                    });
//                    checkboxesCheckedString = checkboxesCheckedString.replace(/,\s*$/, "");
//
//                    if (checkboxesCheckedString.length > 0) {
//                        answer = checkboxesCheckedString;
//                    }
//                    else {
//                        answer = blankAnswer;
//                    }
//
//                    reviewString = reviewString + "<div class='col-xs-9'>" +
//                        "<div class='reviewSpan' id='reviewBrokerFee'>" + answer + "</div>" +
//                        "</div>";
//
//                    reviewString = reviewString + "</div>";
//                    reviewString = reviewString + "<br>";
//                    checkboxesReviewed = checkboxesReviewed + $(this).attr("data-reviewName") + ";";
//
//
//                    //STORE IN UW QUESTIONS
//                    uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
//                    uwQuestionsOrder.push($(this).attr("data-reviewName"));
//                }
//                else {
//
//                }
//
//            }
//            else if ($(this).is(':radio') && $(this).attr("data-reviewName")) {
//                var answer = "";
//                if ($("input:radio[name='" + $(this).attr('name') + "']:checked").val().length > 0) {
//                    answer = $("input:radio[name='" + $(this).attr('name') + "']:checked").val();
//                }
//                else {
//                    answer = blankAnswer;
//                }
//
//                reviewString = reviewString + "<div class='row'>" +
//                    "<div class='col-xs-3 text-left'>" +
//                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
//                    "</div>" +
//                    "<div class='col-xs-9'>" +
//                    "<div class='reviewSpan' id='reviewBrokerFee'>" + answer + "</div>" +
//                    "</div>" +
//                    "</div>";
//                reviewString = reviewString + "<br>";
//
//                //STORE IN UW QUESTIONS
//                uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
//                uwQuestionsOrder.push($(this).attr("data-reviewName"));
//            }
//            else if ($(this).attr("id") === "numberOfCastMembers") {
//                var answer = "";
//                $("#castMemberDetailContainer").find('.row').each(function(){
//                    if ($(this).css("display") != "none") {
//                        if($(this).find(".castMemberName").val().trim().length > 0){
//                            answer = answer + $(this).find(".castMemberName").val() + "," + $(this).find(".castMemberAge").val() + "," + $(this).find(".castMemberRole").val() + "\n"
//
//                        }
//                    }
//
//                });
//
//                if(answer === ""){
//                    answer = "To Follow";
//                }
//
//                reviewString = reviewString + "<div class='row'>" +
//                    "<div class='col-xs-3 text-left'>" +
//                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
//                    "</div>" +
//                    "<div class='col-xs-9'>" +
//                    "<div class='reviewSpan' id='reviewBrokerFee'>" + answer + "</div>" +
//                    "</div>" +
//                    "</div>";
//                reviewString = reviewString + "<br>";
//
//                //STORE IN UW QUESTIONS
//                uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
//                uwQuestionsOrder.push($(this).attr("data-reviewName"));
//            }
//            else {
//                var answer = "";
//                if ($(this).val().length > 0) {
//                    answer = $(this).val()
//                }
//                else {
//                    answer = blankAnswer;
//                }
//
//                reviewString = reviewString + "<div class='row'>" +
//                    "<div class='col-xs-3 text-left'>" +
//                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
//                    "</div>" +
//                    "<div class='col-xs-9'>" +
//                    "<div class='reviewSpan' id='reviewBrokerFee'>" + answer + "</div>" +
//                    "</div>" +
//                    "</div>";
//                reviewString = reviewString + "<br>";
//
//                //STORE IN UW QUESTIONS
//                uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
//                uwQuestionsOrder.push($(this).attr("data-reviewName"));
//            }
//
//            //console.log($(this).attr("data-reviewName"));
//        }
//
//
//    });
//    //alert("review String: " + reviewString);
//    $("#otherReviewInsert").html(reviewString);
//
//    //ATTACHED FILES
//    var filesInsert = "";
//    $(':file').each(function(){
//        var file = this.files[0];
//        if(file === undefined){
//
//        }
//        else{
//            var ext = $(this).val().split('.').pop().toLowerCase();
//
//            //alert('Only .zip, .doc, .docx, .xlsx, .xls, .pdf are permitted');
//            var iconFilePath = "";
//            if(ext == "zip") {
//                iconFilePath = "zipIcon.png"
//            }
//            else if(ext == "doc"){
//                iconFilePath = "docIcon.png"
//            }
//            else if(ext == "docx"){
//                iconFilePath = "docxIcon.png"
//            }
//            else if(ext == "xls"){
//                iconFilePath = "xlsIcon.png"
//            }
//            else if(ext == "xlsx"){
//                iconFilePath = "xlsxIcon.png"
//            }
//            else if(ext == "pdf"){
//                iconFilePath = "pdfIcon.png"
//            }
//            else if(ext == "txt"){
//                iconFilePath = "txtIcon.png"
//            }
//            else{
//                iconFilePath = "fileIcon.png"
//            }
//
//           //console.log("Change: " + file);
//
//            var name = file.name;
//            var size = file.size;
//            var type = file.type;
//            filesInsert = filesInsert +
//                "<div class='row'>" +
//                "<div class='col-xs-12 text-left'>" +
//                "<div class='reviewSpan' id='review'><img src='/portal/images/" + iconFilePath + "' height='16' width='16' style='margin-right:10px'/>" + name + "</div>" +
//                "</div>" +
//                "</div>";
//        }
//
//    });
//
//    $('#reviewAttachedFilesInsert').html(filesInsert);
//
//}
