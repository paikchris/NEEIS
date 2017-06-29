/**
 * Created by paikchris on 8/23/16.
 */

var versionMode
var autoSaveMap = {};
var loadedAutoSaveMap;
var currentStep;
var namedInsuredConflict = false;
var BORrequested = false;
var renewalRequested = false;
var uwQuestionsMap = {};
var uwQuestionsOrder = [];
var loadingSaveInProgress = false;
var specFilmsScriptLoaded = false;
var currentSubmissionWasLoadedFromSave = false;
var loadedSubmissionMap = {};
var ratePremiumsRunning = false;


function newSubmissionInit() {
    //SAVE AND LOAD STUFF (newSubmissionUtils/progressSaveLoad.js)
    checkForSavedSubmissions();
    // setIntervalToAutoSave(10000);
    setSubmissionToAutoSaveOnQuit(true);
    initializeSubmissionSaveAndLoadButtons();
    // initializeAutoSaveLoadProgressButtons();

    //INPUT VALIDATION STUFF (utils/formValidation.js)
    initializeListnerForNoBlankRequiredFields();

    //DATE FUNCTIONS SETUP (newSubmissionUtils/dateHelper.js)
    initializeDateInputAndFunctions();
    initializeBORFunctions();
    intializeFileAttachButtons();

    clickChangeListenerInit()
    stepWizardInit()


}


$(document).ready(function () {
    newSubmissionInit();

    if(versionMode ==true){
        $('.card').eq(0).click();
    }
});



function clickChangeListenerInit(){
    //WHEN THE STATE CHANGES IN STEP 3, UPDATE PREMIUMS FOR TAX
    $(document).on('change', '#stateMailing', function () {
        stateChangeAction(this);
    });

    //GOTO STEP 2 AFTER CLICKING ON RISKTYPE
    $(document).on('change', '.riskTypeDropdown', function () {
        $('#nextButtonStep1').trigger('click');
    });

    //SETUP ENTER KEY TO DISMISS ALERTMESSAGEMODAL
    $(document).keyup(function (e) {
        keyPressChecker(e)
    });


    //RATE PREMIUMS WHEN COVERAGE CHECKBOX IS CLICKED
    $(document.body).on('change', '.coverageCheckbox', function () {
        coverageCheckBoxAction(this)
    });

    ///FILMING LOCATION ADD REMOVE BUTTONS
    $(document.body).on('click', '.addLocation', function () {
        filmingLocationAdd(this)
    });

    //FILMING LOCATION ADD REMOVE BUTTONS
    $(document.body).on('click', '.removeLocation', function () {
        filmingLocationRemove(this)
    });

    //MASK PHONE NUMBER FORMAT
    $(document.body).on('focus', '.phoneNumberMask', function () {
        $(".phoneNumberMask").mask("(999) 999-9999");
    });

    //CLICK HANDLER FOR RISK CATEGORY CARDS
    $(document.body).on('click', '.card', function () {
        riskCategoryCardClickAction(this)
    });

    //CLICK HANDLER FOR SELECTING RISKTYPE
    $(document.body).on('click', 'a.riskOptionLink', function () {
        return riskTypeClickAction(this)
    });

}

function keyPressChecker(e){
    if (e.keyCode == 13) {
        if ($('#alertMessageModal').hasClass('in')) {
            $('#alertMessageModal').modal('hide');
        }
    }
}

function stateChangeAction(elem){
    var chosenState = $(elem).val();

    if (chosenState === "AK" ||
        chosenState === "CA" ||
        chosenState === "CT" ||
        chosenState === "GA" ||
        chosenState === "HI" ||
        chosenState === "IA" ||
        chosenState === "LA" ||
        chosenState === "MA" ||
        chosenState === "NV" ||
        chosenState === "NJ" ||
        chosenState === "PA" ||
        chosenState === "TX" ||
        chosenState === "UT" ||
        chosenState === "NY") {
        //LICENSED STATE
    }
    else if (chosenState == "invalid") {

    }
    else {
        //UNLICENSED STATE
        alert($(elem).val() + " requires further review before providing a quote. Feel free to continue with your submission and a NEEIS Underwriter will contact you.");
    }

    if (riskChosen.indexOf("Film Projects") > -1) {
        ratePremiums()


    }
}

function coverageCheckBoxAction(elem){
    if ($("#proposedTermLength").val().trim().length < 1) {
        alert("Please enter coverage dates.")
        if ($(elem).is(':checked')) {
            elem.checked = false
        }
        else {
            elem.checked = false;
        }
    }
    else {
        //alert();
        if ($(elem).is(':checked')) {
            $(elem).parent().parent().next().find('.productsSelect').css("display", "");
        }
        else {
            $(elem).parent().parent().next().find('.productsSelect').css("display", "none");
        }

    }
}

function filmingLocationAdd(elem){
    var htmlString = "";
    var count = 0;
    $('#locationDivContainer').children('.locationDiv').each(function () {
        //alert($(this).html());
        count++
        //alert(count);
        htmlString = $(elem).html();
        htmlString = htmlString.replace("Physical Address", "Location " + (count + 1));
        htmlString = htmlString.replace("Location " + count, "Location " + (count + 1));
    });

    $("#locationDivContainer").append("<div class='locationDiv'>" + htmlString + "</div>");

}

function filmingLocationRemove(elem){
    var htmlString = "";
    var count = 0;
    //alert($(elem).closest('.locationDiv').find('h5').html())
    if ($(elem).closest('.locationDiv').find('h5').html() === "Physical Address") {

    }
    else {
        $(elem).closest('.locationDiv').remove();
        $('#locationDivContainer').children('.locationDiv').each(function () {
            //alert($(elem).html());
            count++
            var locationHeader = $(elem).find('h5').html();
            //alert(locationHeader);
            if (locationHeader == "Physical Address") {

            }
            else {
                $(elem).find('h5').html("Location " + count);
            }

            //htmlString = $(elem).html();
            //htmlString = htmlString.replace("Location " + count , "Location " + (count+1));
        });
    }
    //$("#locationDivContainer").append("<br><br><div class='locationDiv'>" + htmlString + "</div>");
}

function riskCategoryCardClickAction(elem){
    if ($(elem).hasClass("cardselected")) {
        $(elem).removeClass("cardselected");
        $(elem).addClass("card-unselected");
        $(".drawer").removeClass("open");
    }
    else {
        $('.cardselected').each(function () {
            $(elem).removeClass("cardselected");
            $(elem).addClass("card-unselected");

        });
        $(".drawer").removeClass("open");
        $(elem).addClass("cardselected");
        $(elem).removeClass("card-unselected");

        $(elem).parent().siblings(".drawerContainer").children(".drawer").addClass("open");
    }
}

function riskTypeClickAction(elem){
    $('.riskTypeDropdown').css('display', "none");
    $('a.riskOptionLink').parent().removeClass("active");
    $('a.riskOptionLink').parent().addClass("inactive");
    $(elem).parent().addClass("active");
    $(elem).parent().removeClass("inactive");

    if ($(elem).hasClass("riskOptionDropDown")) {
        $(elem).find('select').css('display', "");
    }
    else {
        $('#nextButtonStep1').trigger('click');

    }
    return false;
}

function stepWizardInit(){
    /////////////////////////////////////////////////////////
    //FORM WIZARD CODE
    /////////////////////////////////////////////////////////
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        //console.log(currentStep)
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);
        //console.log($('.btn-primary').html());




        if (!$item.hasClass('disabled') && !$($item)[0].hasAttribute("disabled")) {
            if ($item.attr('id') == "buttonCircleStep4") {
                buildReview();
            }

            if (parseInt($('.btn-primary').html()) > parseInt($(this).html())) {
                navListItems.removeClass('btn-primary').addClass('btn-default');
                $item.addClass('btn-primary');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
            else if (loadingSaveInProgress == true) {
                navListItems.removeClass('btn-primary').addClass('btn-default');
                $item.addClass('btn-primary');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
            else {
                var valid = validateFields();
                if (valid[0]) {
                    navListItems.removeClass('btn-primary').addClass('btn-default');
                    $item.addClass('btn-primary');
                    allWells.hide();
                    $target.show();
                    $target.find('input:eq(0)').focus();
                }
            }


        }
        currentStep = parseInt($('.btn-primary').html());
        //console.log(currentStep)
    });

    allNextBtn.click(function (e) {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;


        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");

            }
        }
        isValid = validateFields();

        if (isValid[0] && $("li.active").length > 0) {
            $('#loadingModal').modal('show');

            var riskChosen = getRiskTypeChosen();

            var riskCategory = getRiskCategoryChosen();
            //alert(riskCategory);
            $('#riskCategoryHeader').html(riskCategory);
            $('#riskTypeHeader').html(riskChosen);
            //alert(riskCategory);


            if (e.target.id == "nextButtonStep1") {
                //IF STARTING FORM OVER LOCK ALL THE OTHER STEPS
                $('#buttonCircleStep2').attr('disabled', 'disabled');
                $('#buttonCircleStep3').attr('disabled', 'disabled');
                $('#buttonCircleStep4').attr('disabled', 'disabled');

                //SHOW SAVE BUTTON
                $('#saveProgress').css('display', '');

                currentStep = 1;
                BORrequested = false;
                $('#BORRequestNotification').css('display', "none");
                if ($("li.active").length > 0) {
                    //LOGIC FOR DISPLAYING WHICH COVERAGE FORM TO DISPLAY
                    $('#totalBudgetConfirmGroup').css('display', 'none');
                    $('#premiumExpectedInputGroup').css('display', 'none');
                    $('#howManyDaysIsTheEventGroup').css('display', 'none');
                    $('#estimatedTotalAttendanceGroup').css('display', 'none');
                    $('#largestNumberAttendeesGroup').css('display', 'none');
                    $('#premiumExpectedInput').maskMoney({
                        prefix: '$',
                        precision: "0"
                    });
                    $('#selectStateGroup').css('display', 'none');
                    //alert(riskCategory)
                    if (riskChosen === "Film Projects Without Cast (With Work Comp)" || riskChosen === "Film Projects With Cast (With Work Comp)") {
                        $('#totalBudgetConfirmGroup').css('display', '');
                        var finishedLoading1 = false;
                        var finishedLoading2 = false;
                        var finishedLoading3 = false;
                        $("#insuredInfoInsert").load("./../forms/specFilm #insuredInfo", function () {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageCheckboxesDiv").load("./../forms/specFilm #coverageSGPCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/specFilm #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            var scriptPath = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                            script.src = scriptPath;
                            head.appendChild(script);

                            //WAIT TO ENSURE SPECFILMS HAS LOADED
                            while ($("script[src*='" + scriptPath + "']").length === 0) {
                                // console.log("still Loading");
                            }
                            //LOAD SGP JS FILE
                            var sgpScript = document.createElement("script");
                            // set the type attribute
                            sgpScript.type = "application/javascript";
                            // make the script element load file

                            sgpScript.src = '/js/forms/sgpFilm.js' + "?ts=" + new Date().getTime();
                            ;
                            // finally insert the element to the body element in order to load the script
                            document.body.appendChild(sgpScript);

                            finishedLoading2 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }


                        });
                    }
                    else if (riskChosen.indexOf("Film Projects") > -1) {
                        $('#totalBudgetConfirmGroup').css('display', '');

                        var head = document.getElementsByTagName('head')[0];
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                        head.appendChild(script);
                        script.onload = function () {
                            // console.log('specFilms loaded.');
                            specFilmsScriptLoaded = true;
                        };


                        var finishedLoading1 = false;
                        var finishedLoading2 = false;
                        var finishedLoading3 = false;
                        $("#insuredInfoInsert").load("./../forms/specFilm #insuredInfo", function () {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageCheckboxesDiv").load("./../forms/specFilm #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/specFilm #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            var scriptPath = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                            script.src = scriptPath;
                            head.appendChild(script);

                            //WAIT TO ENSURE SPECFILMS HAS LOADED
                            while ($("script[src*='" + scriptPath + "']").length === 0) {
                                // console.log("still Loading");
                            }
                            //LOAD SGP JS FILE
                            var sgpScript = document.createElement("script");
                            // set the type attribute
                            sgpScript.type = "application/javascript";
                            // make the script element load file

                            sgpScript.src = '/js/forms/sgpFilm.js' + "?ts=" + new Date().getTime();
                            ;
                            // finally insert the element to the body element in order to load the script
                            document.body.appendChild(sgpScript);

                            finishedLoading2 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });


                    }
                    else if (riskCategory === "Entertainer") {
                        $('#premiumExpectedInputGroup').css('display', '');
                        // $('#howManyDaysIsTheEventGroup').css('display', '');
                        // $('#estimatedTotalAttendanceGroup').css('display', '');
                        // $('#largestNumberAttendeesGroup').css('display', '');

                        $("#insuredInfoInsert").load("./../forms/entertainerForm #insuredInfo", function () {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/entertainerForm #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/entertainerForm #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                            var script1 = document.createElement('script');
                            script1.type = 'text/javascript';
                            script1.src = '/js/forms/entertainer.js' + "?ts=" + new Date().getTime();
                            head.appendChild(script1);
                            finishedLoading2 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        //$('#totalBudgetConfirmGroup').css('display', 'none');
                    }
                    else if (riskCategory === "Special Events") {
                        //alert(riskCategory)
                        $('#premiumExpectedInputGroup').css('display', '');
                        $('#howManyDaysIsTheEventGroup').css('display', '');
                        $('#estimatedTotalAttendanceGroup').css('display', '');
                        $('#largestNumberAttendeesGroup').css('display', '');
                        $('#selectStateGroup').css('display', '');

                        if (riskChosen === "Exhibitor" ||
                            riskChosen === "Concessionaires Non Food Sales" ||
                            riskChosen === "Concessionaires Food Sales" ||
                            riskChosen === "Attractions / Performers") {
                            $('.separatePolicyGroup').css('display', '');
                            $('#numberOfExhibitorsGroup').css('display', '');
                            $('#selectStateGroup').css('display', '');

                            $("#insuredInfoInsert").load("./../forms/specialEventVendor #insuredInfo", function () {
                                finishedLoading1 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });
                            $("#coverageInfoPanel").load("./../forms/specialEventVendor #coverageCheckboxesDiv", function () {
                                finishedLoading3 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });
                            $("#riskSpecificInsert").load("./../forms/specialEventVendor #riskSpecificInfo", function () {
                                var head = document.getElementsByTagName('head')[0];
                                var script = document.createElement('script');
                                script.type = 'text/javascript';
                                script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                                var script1 = document.createElement('script');
                                script1.type = 'text/javascript';
                                script1.src = '/js/forms/specialEventVendor.js' + "?ts=" + new Date().getTime();
                                head.appendChild(script1);
                                finishedLoading2 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });


                        }
                        else {
                            $("#insuredInfoInsert").load("./../forms/specialEventLiability #insuredInfo", function () {
                                finishedLoading1 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });
                            $("#coverageInfoPanel").load("./../forms/specialEventLiability #coverageCheckboxesDiv", function () {
                                finishedLoading3 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });
                            $("#riskSpecificInsert").load("./../forms/specialEventLiability #riskSpecificInfo", function () {
                                var head = document.getElementsByTagName('head')[0];
                                var script = document.createElement('script');
                                script.type = 'text/javascript';
                                script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                                var script1 = document.createElement('script');
                                script1.type = 'text/javascript';
                                script1.src = '/js/forms/specialEventLiability.js' + "?ts=" + new Date().getTime();
                                head.appendChild(script1);
                                finishedLoading2 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });
                        }
                        //$('#totalBudgetConfirmGroup').css('display', 'none');
                    }
                    else if (riskCategory === "Office") {
                        $('#premiumExpectedInputGroup').css('display', '');
                        // $('#howManyDaysIsTheEventGroup').css('display', '');
                        // $('#estimatedTotalAttendanceGroup').css('display', '');
                        // $('#largestNumberAttendeesGroup').css('display', '');

                        $("#insuredInfoInsert").load("./../forms/office #insuredInfo", function () {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/office #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/office #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                            var script1 = document.createElement('script');
                            script1.type = 'text/javascript';
                            script1.src = '/js/forms/office.js' + "?ts=" + new Date().getTime();
                            head.appendChild(script1);
                            finishedLoading2 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        //$('#totalBudgetConfirmGroup').css('display', 'none');
                    }
                    else if (riskCategory === "Shell Corporation") {
                        //alert(riskCategory)
                        $('#premiumExpectedInputGroup').css('display', '');
                        // $('#howManyDaysIsTheEventGroup').css('display', '');
                        // $('#estimatedTotalAttendanceGroup').css('display', '');
                        // $('#largestNumberAttendeesGroup').css('display', '');

                        $("#insuredInfoInsert").load("./../forms/shellCorp #insuredInfo", function () {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/shellCorp #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/shellCorp #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                            var script1 = document.createElement('script');
                            script1.type = 'text/javascript';
                            script1.src = '/js/forms/shellCorp.js' + "?ts=" + new Date().getTime();
                            head.appendChild(script1);
                            finishedLoading2 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        //$('#totalBudgetConfirmGroup').css('display', 'none');
                    }
                    else if (riskCategory === "Venue / Tenant User") {
                        $('#premiumExpectedInputGroup').css('display', '');
                        $('#howManyDaysIsTheEventGroup').css('display', '');
                        $('#estimatedTotalAttendanceGroup').css('display', '');
                        $('#largestNumberAttendeesGroup').css('display', '');
                        $('#selectStateGroup').css('display', '');

                        $("#insuredInfoInsert").load("./../forms/venueTenantUser #insuredInfo", function () {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/venueTenantUser #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/venueTenantUser #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                            var script1 = document.createElement('script');
                            script1.type = 'text/javascript';
                            script1.src = '/js/forms/venueTenantUser.js' + "?ts=" + new Date().getTime();
                            head.appendChild(script1);
                            finishedLoading2 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        //$('#totalBudgetConfirmGroup').css('display', 'none');
                    }
                    else if (riskCategory === "Ancillary Entertainment Risk") {
                        $('#premiumExpectedInputGroup').css('display', '');
                        // $('#howManyDaysIsTheEventGroup').css('display', '');
                        // $('#estimatedTotalAttendanceGroup').css('display', '');
                        // $('#largestNumberAttendeesGroup').css('display', '');

                        $("#insuredInfoInsert").load("./../forms/ancillaryEntertainmentRisk #insuredInfo", function () {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/ancillaryEntertainmentRisk #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/ancillaryEntertainmentRisk #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                            var script1 = document.createElement('script');
                            script1.type = 'text/javascript';
                            script1.src = '/js/forms/ancillaryEntertainmentRisk.js' + "?ts=" + new Date().getTime();
                            head.appendChild(script1);
                            finishedLoading2 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        //$('#totalBudgetConfirmGroup').css('display', 'none');
                    }
                    else if (riskChosen.indexOf("Comedian") > -1) {
                        $('#premiumExpectedInputGroup').css('display', '');
                        $('#howManyDaysIsTheEventGroup').css('display', '');
                        $('#estimatedTotalAttendanceGroup').css('display', '');
                        $('#largestNumberAttendeesGroup').css('display', '');

                        $("#riskSpecificInsert").load("./../forms/otherForm.gsp #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/js/forms/otherForm.js' + "?ts=" + new Date().getTime();
                            head.appendChild(script);
                            $('#loadingModal').modal('hide');
                        });
                    }
                    else {
                        $('#premiumExpectedInputGroup').css('display', '');
                        $('#howManyDaysIsTheEventGroup').css('display', '');
                        $('#estimatedTotalAttendanceGroup').css('display', '');
                        $('#largestNumberAttendeesGroup').css('display', '');
                        var finishedLoading1 = false;
                        var finishedLoading2 = false;
                        var finishedLoading3 = false;
                        $("#insuredInfoInsert").load("./../forms/otherForm #insuredInfo", function () {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageCheckboxesDiv").load("./../forms/otherForm #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/otherForm #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/js/forms/otherForm.js' + "?ts=" + new Date().getTime();
                            head.appendChild(script);
                            finishedLoading2 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                    }
                    if (riskChosen === "Film Projects Without Cast (With Work Comp)" || riskChosen === "Film Projects With Cast (With Work Comp)") {
                        clearProductChoices();
                    }
                    else {
                        getProductsForRisk();
                    }
                }
                else {
                    alert("Please select a risk option");
                    $('#loadingModal').modal('hide');
                    return false;
                }

            }
            else if (e.target.id == "nextButtonStep2") {
                currentStep = 2;
                if (riskChosen.indexOf("Film Projects") > -1) {
                    if (!($('#EPKGcoverage').is(':checked') || $('#CPKCGLcoverage').is(':checked'))) {

                        $('#loadingModal').modal('hide');
                        $('#alertMessageContent').html("Please Select a Product");
                        $('#alertMessageModal').modal('show');
                        return;
                    }

                    $('#principalPhotographyDateStart').val($('#proposedEffectiveDate').val());
                    $('#principalPhotographyDateEnd').val($('#proposedExpirationDate').val());
                    $('#totalBudgetInput').val($('#totalBudgetConfirm').val());
                    $('#loadingModal').modal('hide');

                    checkWCandCastInputs();
                }
                else {
                    $('#loadingModal').modal('hide');
                }
            }
            else if (e.target.id == "nextButtonStep3") {
                if (namedInsuredConflict == true) {
                    $('#loadingModal').modal('hide');
                    $('#alertMessageContent').html("Please resolve conflict.");
                    $('#alertMessageModal').modal('show');
                    return;
                }
                else {
                    currentStep = 3;
                    buildReview();
                    $('#loadingModal').modal('hide');
                }

                $('#loadingModal').modal('hide');
            }
            else if (e.target.id == "nextButtonStep4") {
                currentStep = 4;
                var validSubmission = true;
                $('#progressBarModal').modal('show');
                var riskCategory = getRiskCategoryChosen();
                if (riskChosen.indexOf("Film Projects") > -1) {
                    var dataMap = getSubmissionMap();
                    var validSubmissionMessage = validateSubmission(dataMap);
                    if (validSubmissionMessage === true) {
                        var totalBudgetParam = $("#totalBudgetInput").val().replace(/\$|,/g, '')
                        var proposedTermParam = $("#proposedTermLength").val()
                        var namedInsuredParam = $('#namedInsured').val()

                        submitPolicyToAIM(riskChosen, totalBudgetParam, proposedTermParam, namedInsuredParam,
                            autoSaveMap, uwQuestionsMap, uwQuestionsOrder, dataMap, BORrequested)
                        /*
                        $('#progressBarHeader').html("Please wait, your submission is being processed.")
                        $('.progress-bar').attr('aria-valuenow', "75").animate({
                            width: "75%"
                        }, 25000);

                        var newSubmissionConfirmParam = "";
                        autoSaveFunction();

                        /////TEST FOR BROKER OF RECORD STATUS
                        $.ajax({
                            method: "POST",
                            url: "/Async/saveSubmissionToAIM",
                            data: {
                                riskType: riskChosen,
                                totalGrossBudget: $("#totalBudgetInput").val().replace(/\$|,/g, ''),
                                proposedTermLength: $("#proposedTermLength").val(),
                                namedInsured: $('#namedInsured').val(),
                                questionAnswerMap: JSON.stringify(autoSaveMap),
                                uwQuestionsMap: JSON.stringify(uwQuestionsMap),
                                uwQuestionsOrder: uwQuestionsOrder.join("&;&"),
                                dataMap: JSON.stringify(dataMap),
                                BORrequested: BORrequested
                            }
                        })
                            .done(function (msg) {
                                //alert(msg);
                                //0620584,0620585
                                var indicationPDFError = false;
                                if (msg.split("&;&")[1] === "Indication Error") {
                                    alert("Submission was successful however, the Indication PDF is currently not available. Please contact your underwriter for further details. ");
                                    // $('#alertMessageModal').modal('show');
                                    indicationPDFError = true;
                                }

                                if (!msg.startsWith("Error")) {
                                    newSubmissionConfirmParam = msg;
                                    //console.log("UPLOADING FILES");
                                    //ATTACH FILES

                                    var formData = new FormData();
                                    var formDataNew = getFormDataWithAllAttachedFilesNew();

                                    var quoteIDs = msg.split("&;&")[0];

                                    //NEW STUFF
                                    var submissionHasFile = false;
                                    if (Object.keys(attachedFileMap).length != 0) {
                                        submissionHasFile = true;
                                        formData.append("attachedFileMap", JSON.stringify(attachedFileMap))
                                    }

                                    if (submissionHasFile) {
                                        $('.progress-bar').attr('aria-valuenow', "75").animate({
                                            width: "75%"
                                        }, 2000);

                                        formData.append('quoteIDs', quoteIDs);
                                        $.ajax({
                                            method: "POST",
                                            url: "/async/attachAndUploadFiles",
                                            data: formData,
                                            cache: false,
                                            contentType: false,
                                            processData: false
                                        }).done(function (msg) {
                                            //console.log("Finished Uploading");
                                            $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
                                            $('#progressBarModal').modal('hide');

                                            //CLEAR AUTOSAVE INFO
                                            autoSaveMap = {};
                                            Cookies.remove('autosaveData');

                                            //REDIRECT TO SAVE SUCCESSFUL PAGE
                                            window.location.href = "./../main/newSubmissionConfirm.gsp?submissionID=" + newSubmissionConfirmParam + "&pdfError=" + indicationPDFError;

                                        });
                                    }
                                    // var submissionHasFile = false;
                                    // $('input:file').each(function(){
                                    //     var file = $(this).get(0).files[0];
                                    //     if(file){
                                    //         submissionHasFile = true;
                                    //         formData.append($(this).attr('id'), file);
                                    //     }
                                    // });
                                    //
                                    // if (submissionHasFile) {
                                    //     $('.progress-bar').attr('aria-valuenow', "75").animate({
                                    //         width: "75%"
                                    //     }, 2000);
                                    //
                                    //     formData.append('quoteIDs', quoteIDs);
                                    //
                                    //     $.ajax({
                                    //         method: "POST",
                                    //         url: "/async/ajaxAttachNew",
                                    //         data: formData,
                                    //         cache: false,
                                    //         contentType: false,
                                    //         processData: false
                                    //     })
                                    //         .done(function(msg) {
                                    //             //console.log("Finished Uploading");
                                    //             $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
                                    //             $('#progressBarModal').modal('hide');
                                    //
                                    //             //CLEAR AUTOSAVE INFO
                                    //             autoSaveMap = {};
                                    //             Cookies.remove('autosaveData');
                                    //
                                    //             //REDIRECT TO SAVE SUCCESSFUL PAGE
                                    //             window.location.href = "./../main/newSubmissionConfirm.gsp?submissionID=" + newSubmissionConfirmParam + "&pdfError=" + indicationPDFError;
                                    //
                                    //         });
                                    // }
                                    else {
                                        //console.log ("REDIRECTING");
                                        $('.progress-bar').attr('aria-valuenow', "100").animate({
                                            width: "100%"
                                        }, 2000);
                                        $('#progressBarModal').modal('hide');

                                        //CLEAR AUTOSAVE INFO
                                        autoSaveMap = {};
                                        Cookies.remove('autosaveData');

                                        //REDIRECT TO SAVE SUCCESSFUL PAGE
                                        window.location.href = "./../main/newSubmissionConfirm.gsp?submissionID=" + newSubmissionConfirmParam + "&pdfError=" + indicationPDFError;
                                    }
                                }
                                else {
                                    $('#progressBarModal').modal('hide');
                                    alert(msg)
                                }


                            });

                        */
                    }
                    else {
                        $('#progressBarModal').modal('hide');
                        alert("Error: Submission has errors " + validSubmissionMessage);

                    }


                    $('#loadingModal').modal('hide');
                }
                else if (riskCategory == "Special Events") {
                    var dataMap = getSubmissionMapSP(); //FROM AIMHELPER.JS
                    $('#progressBarHeader').html("Please wait, your submission is being processed.")
                    $('.progress-bar').attr('aria-valuenow', "75").animate({
                        width: "75%"
                    }, 25000);

                    autoSaveFunction();

                    /////TEST FOR BROKER OF RECORD STATUS
                    $.ajax({
                        method: "POST",
                        url: "/Async/saveSpecialEventSubmission",
                        data: {
                            questionAnswerMap: JSON.stringify(autoSaveMap),
                            uwQuestionsMap: JSON.stringify(uwQuestionsMap),
                            uwQuestionsOrder: uwQuestionsOrder.join("&;&"),
                            dataMap: JSON.stringify(dataMap),
                            BORrequested: BORrequested
                        }
                    })
                        .done(function (msg) {

                            var indicationPDFError = false;

                            if (!msg.startsWith("Error")) {
                                newSubmissionConfirmParam = msg;
                                //console.log("UPLOADING FILES");
                                //ATTACH FILES

                                var formData = new FormData();
                                var formDataNew = getFormDataWithAllAttachedFilesNew();

                                var quoteIDs = msg.split("&;&")[0];
                                var submissionHasFile = false;

                                //NEW STUFF
                                if (Object.keys(attachedFileMap).length != 0) {
                                    submissionHasFile = true;
                                    formData.append("attachedFileMap", JSON.stringify(attachedFileMap))
                                }

                                if (submissionHasFile) {
                                    $('.progress-bar').attr('aria-valuenow', "75").animate({
                                        width: "75%"
                                    }, 2000);

                                    formData.append('quoteIDs', quoteIDs);
                                    $.ajax({
                                        method: "POST",
                                        url: "/async/attachAndUploadFiles",
                                        data: formData,
                                        cache: false,
                                        contentType: false,
                                        processData: false
                                    }).done(function (msg) {
                                        //console.log("Finished Uploading");
                                        $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
                                        $('#progressBarModal').modal('hide');

                                        //CLEAR AUTOSAVE INFO
                                        autoSaveMap = {};
                                        Cookies.remove('autosaveData');

                                        //REDIRECT TO SAVE SUCCESSFUL PAGE
                                        window.location.href = "./../main/newSubmissionConfirm.gsp?submissionID=" + newSubmissionConfirmParam + "&pdfError=" + indicationPDFError;

                                    });
                                }
                                else {
                                    //console.log ("REDIRECTING");
                                    $('.progress-bar').attr('aria-valuenow', "100").animate({
                                        width: "100%"
                                    }, 2000);
                                    $('#progressBarModal').modal('hide');

                                    //CLEAR AUTOSAVE INFO
                                    autoSaveMap = {};
                                    Cookies.remove('autosaveData');

                                    //REDIRECT TO SAVE SUCCESSFUL PAGE
                                    window.location.href = "./../main/newSubmissionConfirm.gsp?submissionID=" + newSubmissionConfirmParam + "&pdfError=" + indicationPDFError;
                                }
                            }
                            else {
                                $('#progressBarModal').modal('hide');
                                alert(msg)
                            }
                        });
                }
                else {
                    //THE ACTIONS THAT WILL BE TAKEN AFTER THEY PUSH THE FINAL SUBMIT BUTTON
                    //
                    // $('#progressBarModal').modal('show');
                    $('#progressBarModal').modal('hide');
                    var dataMap = {};
                    // $('#limitsDeductPremiumInsert .coverageCodeString').each(function() {
                    //     coverageCodes = coverageCodes + $(this).html() + ",";
                    // });
                    // coverageCodes = coverageCodes.replace(/,\s*$/, "");

                    //REQUIRED FIELDS, ALL MUST BE FILLED OUT
                    dataMap["riskTypeChosen"] = getRiskTypeChosen();
                    dataMap["riskCategoryChosen"] = getRiskCategoryChosen();
                    dataMap['proposedTermLength'] = $("#proposedTermLength").val();
                    dataMap["uwQuestionsMap"] = JSON.stringify(uwQuestionsMap);
                    dataMap["uwQuestionsOrder"] = uwQuestionsOrder.join("&;&");
                    dataMap['questionAnswerMap'] = JSON.stringify(autoSaveMap),
                        dataMap['accountExec'] = "jason"; //DEFAULT TO JASON FOR NOW


                    var premSummary = "";
                    var productsArray = []
                    $('#reviewPanelContainer .productID_pull').each(function () {
                        var productObj = {}
                        productObj["productID"] = $(this).html().trim();
                        productObj["coveragedID"] = $(this).attr('data-cov');

                        productObj["premium"] = $('.productTotalPremium.SPEVENTS').first().html().trim();

                        productObj["limitsString"] = "";
                        productObj["deductsString"] = "";
                        productObj["stringLOB"] = "";

                        $(".lobRow." + productObj["productID"] + "." + productObj["coveragedID"]).each(function () {
                            var lim = $(this).find('.limit').html().trim();
                            var ded = $(this).find('.deduct').html().trim();
                            if (lim == null) {
                                lim = "";
                            }
                            if (ded == null) {
                                ded = "";
                            }
                            //limitsstring current format
                            //"$400,000\tEPKG:Miscellaneous Rented Equipment\n$400,000\tEPKG:Extra Expense\n$400,000\tEPKG:Props, Sets &amp; Wardrobe\n$400,000\tEPKG:Third Party Prop Damage Liab\n",
                            productObj["limitsString"] = productObj["limitsString"] + lim + "\t" + $(this).find('.lob').html().trim() + "\n"

                            //deductsstring current format
                            //"$2,500\tEPKG:Miscellaneous Rented Equipment\n$2,500\tEPKG:Extra Expense\n$2,500\tEPKG:Props, Sets &amp; Wardrobe\n$2,500\tEPKG:Third Party Prop Damage Liab\n",

                            productObj["deductsString"] = productObj["deductsString"] + ded + "\t" + $(this).find('.lob').html().trim() + "\n"

                            //stringLOB current format
                            //Each Occurrence ;&;$1,000,000 ;&;Nil;&&;General Aggregate Limit ;&;$1,000,000 ;&;Nil;&&;Products &amp; Completed Operations ;&;$1,000,000 ;&;Nil;&&;Personal &amp;
                            //Advertising Injury ;&;$1,000,000 ;&;Nil;&&;Fire Damage (Any One Fire) ;&;$100,000 ;&;Nil;&&;Blanket Additional Insured Endorsement ;&; ;&;Nil;&&;Non-Owned &amp;
                            //Hired Auto Liability ;&;$1,000,000 ;&;;&&;",
                            productObj["stringLOB"] = productObj["stringLOB"] + $(this).find('.lob').html().trim() + " ;&;" + lim + " ;&;" + ded + ";&&;"
                        });

                        //prem summary
                        //current format "Entertainment Package;&;$1,188;&&;",
                        productsArray.push(productObj);
                    });
                    // dataMap['productID'] = buildProductObject(dataMap, dataMap['proposedTermLength']); //return a string in the format ProductID;ProductID;
                    dataMap['products'] = productsArray;
                    dataMap['premiumAllLOBTotal'] = $('#premiumAllLOBTotal').html();
                    dataMap['statusID'] = "QO";
                    dataMap['proposedEffectiveDate'] = $('#proposedEffectiveDate').val()
                    dataMap['proposedExpirationDate'] = $('#proposedExpirationDate').val()
                    dataMap['totalBudgetConfirm'] = $("#totalBudgetConfirm").val().replace(/\$|,/g, '');


                    dataMap['brokerFee'] = $("#brokerFeeInput").val()
                    dataMap['namedInsured'] = $('#namedInsured').val();
                    dataMap['streetNameMailing'] = $('#streetNameMailing').val();
                    dataMap['cityMailing'] = $('#cityMailing').val();
                    dataMap['stateMailing'] = $('#stateMailing').val();
                    dataMap['zipCodeMailing'] = $('#zipCodeMailing').val();
                    dataMap['phoneNumber'] = $('#phoneNumber').val();
                    dataMap['FEINSSN'] = $('#FEINSSN').val();
                    dataMap['NCCI'] = $('#NCCI').val();
                    dataMap['SIC'] = $('#SIC').val();
                    dataMap['website'] = $('#website').val();
                    dataMap['BORrequested'] = BORrequested;

                    var dataString = JSON.stringify(dataMap, null, 4);
                    // console.log(dataString);


                    $.ajax({
                        method: "POST",
                        url: "/Async/saveSubmissionToAIMv2",
                        data: {
                            dataMap: JSON.stringify(dataMap),
                            riskType: riskChosen,
                            proposedTermLength: $("#proposedTermLength").val(),
                            namedInsured: $('#namedInsured').val(),
                            coverageCodes: coverageCodes,
                            questionAnswerMap: JSON.stringify(autoSaveMap),
                            uwQuestionsMap: JSON.stringify(uwQuestionsMap),
                            uwQuestionsOrder: uwQuestionsOrder.join("&;&"),
                            BORrequested: BORrequested
                        }
                    })
                        .done(function (msg) {
                            alert(msg);
                        });


                    //sendSubmissiontoAIM();
                }
            }
            $('#loadingModal').modal('hide');
            nextStepWizard.removeAttr('disabled').trigger('click');
            // $('html, body').animate({
            //     scrollTop: 0
            // }, 'fast');
            $('html,body').scrollTop(0);
        }
        else {
            if ($('#step-1').is(":visible")) {
                $('#alertMessageContent').html("Please Select Risk Type");
                $('#alertMessageModal').modal('show');
                if ($('.drawer.open').length > 0) {
                    $('html, body').animate({
                        scrollTop: ($('.drawer.open').first().offset().top) - 300
                    }, "fast");
                }
                else {
                    // $('html, body').animate({
                    //     scrollTop: 0
                    // }, "fast");
                    $('html,body').scrollTop(0);
                }

            }
            else if ($('#step-2').is(":visible")) {
                $('#alertMessageContent').html("Please complete required fields.");
                $('#alertMessageModal').modal('show');
                $('html, body').animate({
                    scrollTop: ($(".has-error").first().offset().top) - 300
                }, "fast");
            }
            else if ($('#step-3').is(":visible")) {
                $('#alertMessageContent').html("Please complete required fields.");
                $('#alertMessageModal').modal('show');
                $('html, body').animate({
                    scrollTop: ($(".has-error").first().offset().top) - 300
                }, "fast");
            }
            else if ($('#step-4').is(":visible")) {
                $('#alertMessageContent').html("Please complete required fields.");
                $('#alertMessageModal').modal('show');
                $('html, body').animate({
                    scrollTop: ($(".has-error").first().offset().top) - 300
                }, "fast");
            }


        }
    });

    allPrevBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");


        $(".form-group").removeClass("has-error");
        prevStepWizard.removeAttr('disabled').trigger('click');
    });

    //NEEDED TO SET THE PAGE TO STEP 1 AFTER WIZARD SETUP FOR SOME REASON
    $('div.setup-panel div a.btn-primary').trigger('click');
}

function clearProductChoices() {

    $('.EPKGDiv').css("display", "");
    $('.CPKDiv').css("display", "");
    $("#EPKGNOHAOption").css("display", "");
    $('#PIPChoiceInput').css("display", "none");
    $('#pipChoiceSelections').css("display", "none");
    $('#PIP1Input').css("display", "none");
    $('#PIP2Input').css("display", "none");
    $('#PIP3Input').css("display", "none");
    $('#PIP4Input').css("display", "none");
    $('#PIP5Input').css("display", "none");
    $('.PIP5Options').css("display", "none");
    $('#DICEOptions').css("display", "none");
    $('#SPECIFICOptions').css("display", "none");
}

function getRiskTypeChosen() {
    //console.log("getting risk type")
    var riskString = "";
    if ($("li.active").length > 0) {
        if ($("li.active").children("a.riskOptionLink").hasClass('riskOptionDropDown')) {
            //console.log($("li.active").children("a.riskOptionLink").find('.riskTypeDropdown').val());
            riskString = $("li.active").children("a.riskOptionLink").find('.riskTypeDropdown').val()
        }
        else {
            riskString = $("li.active").children("a.riskOptionLink").html().trim();
        }
    }
    return riskString
}

function getRiskCategoryChosen() {
    var category = "";
    if ($("li.active").length > 0) {
        category = $("li.active").closest('.drawerContainer').closest('.row').find('.media-heading').html().trim();
    }
    return category;
}

function logIntoLegacyNeeis() {
    $('#producerIDhidden').html().trim();
    window.location.href = "http://104.131.41.129:3000/redirect?email=test15@test.com&password=newpassword&producerID=TVD";

}

function ratePremiums(thisObj) {
    // console.log("Rating Premiums");
    ratePremiumsRunning = true;
    var rateMap = {};
    var val = $(thisObj).val();
    if ($("li.active").length > 0) {
        riskChosen = getRiskTypeChosen();
    }
    else if (thisObj === "runRatesButton") {
        riskChosen = reviewRiskChosen; //FROM REVIEW SUBMISSION MODAL]
        $('#rateContainer :input').each(function () {
            rateMap["" + $(this).attr('id')] = $(this).val();

        });

    }

    //IF SGP FILM
    if (riskChosen === "Film Projects Without Cast (With Work Comp)" || riskChosen === "Film Projects With Cast (With Work Comp)") {
        ratePremiumsSGP();
    }
    else {//IF BARBICAN FILM
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
            $(".additionalCoverageCheckboxEPKG").each(function (index) {
                if ($(this).is(':checked')) {
                    additionalProducts = additionalProducts + $(this).attr("id") + ":" + $(this).attr("id") + ",";
                }
            });

        }
        else {
            $(".coverageRadioButton").each(function (index) {
                if ($(this).is(':checked')) {
                    productsSelected = productsSelected + $(this).attr('class').replace("coverageRadioButton ", "") + ":" + $(this).val() + ",";
                    if ($(this).hasClass("CPK")) {
                        productsSelected = productsSelected + "NOAL" + ":" + "NOAL01" + ",";
                    }
                }
            });
            $(".additionalCoverageCheckboxEPKG").each(function (index) {
                if ($(this).is(':checked')) {
                    additionalProducts = additionalProducts + $(this).attr("id") + ":" + $(this).attr("id") + ",";
                }
            });
        }

        ///////////////////////////// Film Projects With Cast (No Work Comp)


        $("#EPKGNOHAAdditionalCoverage").each(function (index) {
            if ($(this).is(':checked')) {
                productsSelected = productsSelected + "NOHA" + ":" + $(this).val() + ",";
            }
        });

        $(".additionalCoverageCheckboxCPKCGL").each(function (index) {
            if ($(this).is(':checked')) {
                additionalProducts = additionalProducts + $(this).attr("id") + ":" + $(this).attr("id") + ",";
            }
        });

        $('.PIPCHOIOption').each(function (index) {
            if ($(this).is(':checked')) {
                pipChoiOptions = pipChoiOptions + $(this).attr('id') + ",";
            }

        });
        $(".additionalCoverageCheckboxPIP5").each(function (index) {
            if ($(this).is(':checked')) {
                additionalProducts = additionalProducts + $(this).attr("id") + ":" + $(this).attr("id") + ",";
            }
        });


        //alert(productsSelected);

        var CGLNOALLimit = "";
        var elem = document.createElement('textarea');
        $('.PIPCHOILimitsInput').each(function (index) {
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
        $('.CPKNOHALimitsInput').each(function (index) {
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
            if (riskChosen === "Film Projects Without Cast (With Work Comp)" || riskChosen === "Film Projects With Cast (With Work Comp)") {
                ratePremiumsRunning = false;
            }
            else {
                $.ajax({
                    method: "POST",
                    url: "/Async/ratePremiums",
                    //url: "/Async/newRatePremiums",
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
                    .done(function (msg) {
                        // alert(msg);
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

                                if (limitLines.indexOf("Animal Mortality (Birds or Fish)") > -1) {
                                    limitLines.splice(limitLines.indexOf("Animal Mortality (Birds or Fish)"), 1);
                                    limitLines.push("Animal Mortality (Birds or Fish)");
                                }
                                if (limitLines.indexOf("Animal Mortality (Dogs w/ Breed Exceptions)") > -1) {
                                    limitLines.splice(limitLines.indexOf("Animal Mortality (Dogs w/ Breed Exceptions)"), 1);
                                    limitLines.push("Animal Mortality (Dogs w/ Breed Exceptions)");
                                }
                                if (limitLines.indexOf("Animal Mortality (Reptiles Non-Venomous)") > -1) {
                                    limitLines.splice(limitLines.indexOf("Animal Mortality (Reptiles Non-Venomous)"), 1);
                                    limitLines.push("Animal Mortality (Reptiles Non-Venomous)");
                                }
                                if (limitLines.indexOf("Animal Mortality (Small Domestic Animals - Other)") > -1) {
                                    limitLines.splice(limitLines.indexOf("Animal Mortality (Small Domestic Animals - Other)"), 1);
                                    limitLines.push("Animal Mortality (Small Domestic Animals - Other)");
                                }
                                if (limitLines.indexOf("Animal Mortality (Farm Animals)") > -1) {
                                    limitLines.splice(limitLines.indexOf("Animal Mortality (Farm Animals)"), 1);
                                    limitLines.push("Animal Mortality (Farm Animals)");
                                }
                                if (limitLines.indexOf("Animal Mortality (Wild Cats - Caged)") > -1) {
                                    limitLines.splice(limitLines.indexOf("Animal Mortality (Wild Cats - Caged)"), 1);
                                    limitLines.push("Animal Mortality (Wild Cats - Caged)");
                                }
                                if (limitLines.indexOf("Animal Mortality (All Others - Refer Only)") > -1) {
                                    limitLines.splice(limitLines.indexOf("Animal Mortality (All Others - Refer Only)"), 1);
                                    limitLines.push("Animal Mortality (All Others - Refer Only)");
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


                            limitLines.forEach(function (key, index) {
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
                                    limitDeductibleString = limitDeductibleString + "<span>" + key + "</span>" + "<br>" +
                                        "<span style='margin-left: 20px; font-size: 12px;'>Non-Owned Auto Physical Damage</span>" +
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

                                    limitDeductibleString = limitDeductibleString + "<span class='limit'>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span> " +
                                        "<br>" +
                                        "<span style='font-size: 12px;'>Included</span>";


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
                                        "<span class='deductible " + responseJSON.coverages[i].productCode.replace(/ /g, '') + "DeductLine' style='font-size: 14px;padding-left:8px;'>" + formatMoney(responseJSON.coverages[i].deductibles[key]) +
                                        "</span><br>" +
                                        "<span class='deductible NOHADeductLine' >" + formatMoney(responseJSON.coverages[i].deductibles["Non-Owned Auto Physical Damage"]) +
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
                            limitDeductibleString = limitDeductibleString + "<span id='" + responseJSON.coverages[i].coverageCode + "_IndicationRateInfo' style='display:none'>" +
                                responseJSON.coverages[i].indicationRateInfo + "</span>";
                            limitDeductibleString = limitDeductibleString + "<br>";

                            var lobLines = Object.keys(responseJSON.coverages[i].lobDist);
                            lobLines.forEach(function (key, index) {
                                for (var k = 0; k < responseJSON.coverages[i].lobDist[key].split(";").length; k++) {
                                    if (responseJSON.coverages[i].lobDist[key].split(";")[k].length > 0) {
                                        lobDistString = lobDistString + "<div class='row'";
                                        if (index % 2 == 0) {
                                            lobDistString = lobDistString + " style= 'background-color: rgba(38, 80, 159, 0.13); padding-left:10px;'";
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
                                var prefix = "ALL:";
                                var find = prefix;
                                var re = new RegExp(find, 'g');
                                var endorseBody = responseJSON.coverages[i].endorse;

                                endorseBody = endorseBody.replace(re, '');

                                prefix = "EPKG:";
                                find = prefix;
                                re = new RegExp(find, 'g');
                                endorseBody = endorseBody.replace(re, '');

                                prefix = "CPK:";
                                find = prefix;
                                re = new RegExp(find, 'g');
                                endorseBody = endorseBody.replace(re, '');

                                prefix = "CGL:";
                                find = prefix;
                                re = new RegExp(find, 'g');
                                endorseBody = endorseBody.replace(re, '');

                                prefix = "NOAL:";
                                find = prefix;
                                re = new RegExp(find, 'g');
                                endorseBody = endorseBody.replace(re, '');

                                prefix = "NOHA:";
                                find = prefix;
                                re = new RegExp(find, 'g');
                                endorseBody = endorseBody.replace(re, '');

                                endorseInsert = endorseInsert +
                                    "<span id='" + responseJSON.coverages[i].coverageCode + "_EndorsementForms'>" +
                                    responseJSON.coverages[i].coverageCode + " - " + responseJSON.coverages[i].productCode + "\n" +
                                    endorseBody + "\n\n\n" +
                                    "</span>"
                                ;
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
                        ratePremiumsRunning = false;
                        enableCoverageOptionsContainer()
                    });

            }


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
            ratePremiumsRunning = false;
        }

    }
    enableCoverageOptionsContainer()

}

function disableCoverageOptionsContainer(){
    // $('#coverageOptionsContainer').css('color', 'rgba(31, 31, 31, 0.35)')

    $('#coverageOptionsReview').addClass("panel-default");
    $('#coverageOptionsReview').removeClass("panel-primary");
    $('#coverageOptionsReview').parent().css("color", "rgba(31, 31, 31, 0.35)");
    $('#coverageOptionsTitle').css("color", "rgba(31, 31, 31, 0.35)");

}

function enableCoverageOptionsContainer(){
    $('#coverageOptionsReview').addClass("panel-primary");
    $('#coverageOptionsReview').removeClass("panel-default");
    $('#coverageOptionsReview').parent().css("color", "#1f1f1f");
    $('#coverageOptionsTitle').css("color", "#fff");

}

function ratePremiumsSGP(){
    ratePremiumsRunning = true;
    var numProductSelected = $('.productOptionRadio:checked').length

    var dataMap = getPremiumInfoMapSGP();
    if ( numProductSelected > 0 && parseFloat($("#totalBudgetConfirm").val().replace(/\$|,/g, '')) > 0) {
        $.ajax({
            method: "POST",
            url: "/Async/ratePremiumsSGP",
            //url: "/Async/newRatePremiums",
            data: {
                riskType: riskChosen,
                dataMap: JSON.stringify(dataMap)

            }
        })
            .done(function(msg) {
                // alert(msg);
                //alert( "Data Saved: " + msg );
                var responseJSON = JSON.parse(msg);
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

                }

                var limitDeductibleString = "";
                var lobDistString = "";
                var CPKincluded = false;
                var EPKGincluded = false;
                var termsInsert = "";
                var beginTerms = "";
                var endorseInsert = "";

                for (var i = 0; i < responseJSON.coverages.length; i++) {
                    limitDeductibleString = limitDeductibleString + "<div class='row coverageCodeRow'>" +
                        "<div class='col-xs-6 ' >";
                    limitDeductibleString = limitDeductibleString + "<strong class='coverageCodeString' style='font-size:13px'>" + responseJSON.coverages[i].coverageCode + "</strong>";
                    limitDeductibleString = limitDeductibleString +
                        "<span class='productID_pull' id='" + responseJSON.coverages[i].productCode.replace(/ /g, "") + "' data-cov='" + responseJSON.coverages[i].coverageCode + "' style='display:none'>" + responseJSON.coverages[i].productCode + "</span>";
                    limitDeductibleString = limitDeductibleString + "</div>" +
                        "<div class='col-xs-2 ' >" +
                        "<span'>" + "-" + "</span>" +
                        "</div>" +
                        "<div class='col-xs-2 ' >" +
                        "<span style='font-size:13px'>"  + "</span>" +
                        "</div>" +
                        "<div class='col-xs-2 ' >" +
                        "<span'>" + "-" + "</span>" +
                        "</div>" +
                        "</div>";

                    var lobLines = Object.keys(responseJSON.coverages[i].lobDist);
                    if (responseJSON.coverages[i].coverageCode === "EPKG") {
                        if (lobLines.indexOf("Cast Insurance") > -1) {
                            lobLines.splice(lobLines.indexOf("Cast Insurance"), 1);
                            lobLines.push("Cast Insurance");
                        }
                        if (lobLines.indexOf("Cast Essential") > -1) {
                            lobLines.splice(lobLines.indexOf("Cast Essential"), 1);
                            lobLines.push("Cast Essential");
                        }
                        if (lobLines.indexOf("Negative Film & Videotape") > -1) {
                            lobLines.splice(lobLines.indexOf("Negative Film & Videotape"), 1);
                            lobLines.push("Negative Film & Videotape");
                        }
                        if (lobLines.indexOf("Faulty Stock & Camera Processing") > -1) {
                            lobLines.splice(lobLines.indexOf("Faulty Stock & Camera Processing"), 1);
                            lobLines.push("Faulty Stock & Camera Processing");
                        }
                        if (lobLines.indexOf("Miscellaneous Rented Equipment") > -1) {
                            lobLines.splice(lobLines.indexOf("Miscellaneous Rented Equipment"), 1);
                            lobLines.push("Miscellaneous Rented Equipment");
                        }
                        if (lobLines.indexOf("INC:Non-Owned Auto Physical Damage") > -1) {
                            lobLines.splice(lobLines.indexOf("INC:Non-Owned Auto Physical Damage"), 1);
                            lobLines.push("INC:Non-Owned Auto Physical Damage");
                        }
                        if (lobLines.indexOf("Extra Expense") > -1) {
                            lobLines.splice(lobLines.indexOf("Extra Expense"), 1);
                            lobLines.push("Extra Expense");
                        }
                        if (lobLines.indexOf("Props, Sets & Wardrobe") > -1) {
                            lobLines.splice(lobLines.indexOf("Props, Sets & Wardrobe"), 1);
                            lobLines.push("Props, Sets & Wardrobe");
                        }
                        if (lobLines.indexOf("Third Party Prop Damage Liab") > -1) {
                            lobLines.splice(lobLines.indexOf("Third Party Prop Damage Liab"), 1);
                            lobLines.push("Third Party Prop Damage Liab");
                        }
                        if (lobLines.indexOf("Office Contents") > -1) {
                            lobLines.splice(lobLines.indexOf("Office Contents"), 1);
                            lobLines.push("Office Contents");
                        }
                        if (lobLines.indexOf("Civil Authority (US Only)") > -1) {
                            lobLines.splice(lobLines.indexOf("Civil Authority (US Only)"), 1);
                            lobLines.push("Civil Authority (US Only)");
                        }
                        if (lobLines.indexOf("Money and Currency") > -1) {
                            lobLines.splice(lobLines.indexOf("Money and Currency"), 1);
                            lobLines.push("Money and Currency");
                        }
                        if (lobLines.indexOf("Furs, Jewelry, Art & Antiques") > -1) {
                            lobLines.splice(lobLines.indexOf("Furs, Jewelry, Art & Antiques"), 1);
                            lobLines.push("Furs, Jewelry, Art & Antiques");
                        }
                        if (lobLines.indexOf("Talent and Non Budgeted Costs") > -1) {
                            lobLines.splice(lobLines.indexOf("Talent and Non Budgeted Costs"), 1);
                            lobLines.push("Talent and Non Budgeted Costs");
                        }
                        if (lobLines.indexOf("Administrative Costs") > -1) {
                            lobLines.splice(lobLines.indexOf("Administrative Costs"), 1);
                            lobLines.push("Administrative Costs");
                        }
                        if (lobLines.indexOf("Hardware") > -1) {
                            lobLines.splice(lobLines.indexOf("Hardware"), 1);
                            lobLines.push("Hardware");
                        }
                        if (lobLines.indexOf("Data and Media") > -1) {
                            lobLines.splice(lobLines.indexOf("Data and Media"), 1);
                            lobLines.push("Data and Media");
                        }
                        if (lobLines.indexOf("Electronic Data Extra Expense") > -1) {
                            lobLines.splice(lobLines.indexOf("Electronic Data Extra Expense"), 1);
                            lobLines.push("Electronic Data Extra Expense");
                        }
                        //
                        if (lobLines.indexOf("Animal Mortality") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality"), 1);
                            lobLines.push("Animal Mortality");
                        }

                        if (lobLines.indexOf("Animal Mortality Under Cast Insurance (Domestic Birds/Fish)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality Under Cast Insurance (Domestic Birds/Fish)"), 1);
                            lobLines.push("Animal Mortality Under Cast Insurance (Domestic Birds/Fish)");
                        }
                        if (lobLines.indexOf("Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)"), 1);
                            lobLines.push("Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)");
                        }
                        if (lobLines.indexOf("Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))"), 1);
                            lobLines.push("Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))");
                        }
                        if (lobLines.indexOf("Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))"), 1);
                            lobLines.push("Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))");
                        }
                        if (lobLines.indexOf("Animal Mortality Under Cast Insurance (Farm Animals)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality Under Cast Insurance (Farm Animals)"), 1);
                            lobLines.push("Animal Mortality Under Cast Insurance (Farm Animals)");
                        }
                        if (lobLines.indexOf("Animal Mortality Under Cast Insurance (Wild Cats (Caged))") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality Under Cast Insurance (Wild Cats (Caged))"), 1);
                            lobLines.push("Animal Mortality Under Cast Insurance (Wild Cats (Caged))");
                        }
                        if (lobLines.indexOf("Animal Mortality Under Cast Insurance (All Others - Refer Only)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality Under Cast Insurance (All Others - Refer Only)"), 1);
                            lobLines.push("Animal Mortality Under Cast Insurance (All Others - Refer Only)");
                        }

                        if (lobLines.indexOf("Animal Mortality (Birds or Fish)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality (Birds or Fish)"), 1);
                            lobLines.push("Animal Mortality (Birds or Fish)");
                        }
                        if (lobLines.indexOf("Animal Mortality (Dogs w/ Breed Exceptions)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality (Dogs w/ Breed Exceptions)"), 1);
                            lobLines.push("Animal Mortality (Dogs w/ Breed Exceptions)");
                        }
                        if (lobLines.indexOf("Animal Mortality (Reptiles Non-Venomous)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality (Reptiles Non-Venomous)"), 1);
                            lobLines.push("Animal Mortality (Reptiles Non-Venomous)");
                        }
                        if (lobLines.indexOf("Animal Mortality (Small Domestic Animals - Other)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality (Small Domestic Animals - Other)"), 1);
                            lobLines.push("Animal Mortality (Small Domestic Animals - Other)");
                        }
                        if (lobLines.indexOf("Animal Mortality (Farm Animals)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality (Farm Animals)"), 1);
                            lobLines.push("Animal Mortality (Farm Animals)");
                        }
                        if (lobLines.indexOf("Animal Mortality (Wild Cats - Caged)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality (Wild Cats - Caged)"), 1);
                            lobLines.push("Animal Mortality (Wild Cats - Caged)");
                        }
                        if (lobLines.indexOf("Animal Mortality (All Others - Refer Only)") > -1) {
                            lobLines.splice(lobLines.indexOf("Animal Mortality (All Others - Refer Only)"), 1);
                            lobLines.push("Animal Mortality (All Others - Refer Only)");
                        }


                        if (lobLines.indexOf("Hired Auto Physical Damage") > -1) {
                            lobLines.splice(lobLines.indexOf("Hired Auto Physical Damage"), 1);
                            lobLines.push("Hired Auto Physical Damage");
                        }
                    }

                    else if (responseJSON.coverages[i].coverageCode === "CPK" || responseJSON.coverages[i].coverageCode === "CGL") {
                        if (lobLines.indexOf("General Aggregate Limit") > -1) {
                            // alert("in")
                            lobLines.splice(lobLines.indexOf("General Aggregate Limit"), 1);
                            lobLines.push("General Aggregate Limit");
                        }
                        if (lobLines.indexOf("Products & Completed Operations Agg Limit") > -1) {
                            lobLines.splice(lobLines.indexOf("Products & Completed Operations Agg Limit"), 1);
                            lobLines.push("Products & Completed Operations Agg Limit");
                        }
                        if (lobLines.indexOf("Personal & Advertising Injury (Any One Person or Organization)") > -1) {
                            lobLines.splice(lobLines.indexOf("Personal & Advertising Injury (Any One Person or Organization)"), 1);
                            lobLines.push("Personal & Advertising Injury (Any One Person or Organization)");
                        }
                        if (lobLines.indexOf("Each Occurrence Limit") > -1) {
                            lobLines.splice(lobLines.indexOf("Each Occurrence Limit"), 1);
                            lobLines.push("Each Occurrence Limit");
                        }
                        if (lobLines.indexOf("Damage to Premises Rented to You Limit") > -1) {
                            lobLines.splice(lobLines.indexOf("Damage to Premises Rented to You Limit"), 1);
                            lobLines.push("Damage to Premises Rented to You Limit");
                        }

                        if (lobLines.indexOf("Increased Agg Limit") > -1) {
                            lobLines.splice(lobLines.indexOf("Increased Agg Limit"), 1);
                            lobLines.push("Increased Agg Limit");
                        }
                        if (lobLines.indexOf("General Liability Terrorism") > -1) {
                            lobLines.splice(lobLines.indexOf("General Liability Terrorism"), 1);
                            lobLines.push("General Liability Terrorism");
                        }
                        if (lobLines.indexOf("Blanket Additional Insured") > -1) {
                            lobLines.splice(lobLines.indexOf("Blanket Additional Insured"), 1);
                            lobLines.push("Blanket Additional Insured");
                        }
                        if (lobLines.indexOf("Waiver of Subrogation") > -1) {
                            lobLines.splice(lobLines.indexOf("Waiver of Subrogation"), 1);
                            lobLines.push("Waiver of Subrogation");
                        }
                        if (lobLines.indexOf("Medical Expense") > -1) {
                            lobLines.splice(lobLines.indexOf("Medical Expense"), 1);
                            lobLines.push("Medical Expense");
                        }
                        if (lobLines.indexOf("Miscellaneous Equipment Limit") > -1) {
                            lobLines.splice(lobLines.indexOf("Miscellaneous Equipment Limit"), 1);
                            lobLines.push("Miscellaneous Equipment Limit");
                        }

                        //PUSH IN FRONT

                    }
                    // alert(lobLines)

                    lobLines.forEach(function (key, index) {
                        var premiumForCoverageLine = "";
                        if (responseJSON.coverages[i].premiums[key]) {
                            premiumForCoverageLine = responseJSON.coverages[i].premiums[key];
                        }
                        else {
                            premiumForCoverageLine = "";
                        }

                        limitDeductibleString = limitDeductibleString + "<div class='row lobRow " +
                            responseJSON.coverages[i].productCode.replace(/ /g, "_") + " " +
                            responseJSON.coverages[i].coverageCode + " " +
                            responseJSON.coverages[i].coverageCode + "_LOBRow'";
                        if (index % 2 == 0) {
                            limitDeductibleString = limitDeductibleString + " style= 'background-color: rgba(38, 80, 159, 0.13)'";
                        }
                        limitDeductibleString = limitDeductibleString + ">" +
                            "<div class='col-xs-6 coverageColumn' style='padding-left:20px'>";

                        limitDeductibleString = limitDeductibleString + "<span>" + key + "</span>" +
                            "</div>" +
                            "<div class='col-xs-2 limitColumn'>";

                        limitDeductibleString = limitDeductibleString + "<span class='limit'>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span>";
                        limitDeductibleString = limitDeductibleString + "</div>";


                        limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 premiumColumn'>" +
                            "<span class='premium " + responseJSON.coverages[i].productCode.replace(/ /g, '') + "PremiumLine' >" + formatMoney(premiumForCoverageLine) + "</span>" +
                            "</div>";

                        limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 deductibleColumn'>" +
                            "<span class='deductible " + responseJSON.coverages[i].productCode.replace(/ /g, '') + "DeductLine'>" + formatMoney(responseJSON.coverages[i].deductibles[key]) +
                            "</span>";

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


                    lobLines.forEach(function (key, index) {
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

                $('.CPKNOHALimitsInput').trigger("keyup");
                getTaxInfo();
                totalUpPremiumAndTax();
                addOverflowTransitionClass();
                $('#castInsuranceRequiredCheckBox').trigger('change');
                ratePremiumsRunning = false;
            });
    }
    else{
        ratePremiumsRunning = false;
    }
}

function buildReview() {
    $("#reviewRiskType").html($("li.active").children("a.riskOptionLink").html().trim());
    //alert($("#namedInsured").html());
    $("#reviewNamedInsured").html($("#namedInsured").val());
    $("#reviewMailingAddress").html($("#googleAutoAddress").val());
    // console.log($("#cityMailing").val())
    $("#reviewMailingCity").html($("#cityMailing").val());
    $("#reviewMailingZipcode").html($("#zipCodeMailing").val());
    $("#reviewMailingState").html($("#stateMailing").val());
    $("#reviewPhoneNumber").html($("#phoneNumber").val());
    $("#reviewEmail").html($("#namedInsuredEmail").val());
    $("#reviewWebsite").html($("#website").val());

    $("#reviewTotalBudget").html($("#totalBudgetConfirm").val());
    $("#reviewPrincipalPhotographyDates").html($("#principalPhotographyDateStart").val() + " to " + $("#principalPhotographyDateEnd").val());
    $("#reviewProposedEffective").html($("#proposedEffectiveDate").val());
    $("#reviewProposedExpiration").html($("#proposedExpirationDate").val());
    $("#reviewProposedTerm").html($("#proposedTermLength").val());
    $("#reviewSubject").html($("#endorseInsert").html());


    $("#reviewNameProduction").html($("#titleOfProduction").val());
    $("#reviewNameProductionCompany").html($("#nameOfProductionCompany").val());
    $("#reviewNamePrincipals").html($("#nameOfPrincipal").val());
    $("#reviewNumberYearsExperience").html($("#numberOfYearsOfExperience").val());
    $("#reviewPriorLosses").html($("#listOfPriorLosses").val());

    $('#reviewLimitsDeducts').html("");
    var riskCategory = getRiskCategoryChosen();
    if (riskCategory == "Special Events") {
        $("#reviewEventDays").html($("#howManyDaysIsTheEvent").val());
        $("#reviewTotalAttendance").html($("#estimatedTotalAttendance").val());
        $("#reviewLargestAttendees").html($("#largestNumberAttendees").val());

        $(".specialEventsTableReview").css('display', "");
        $(".filmProductionTableReview").css('display', "none");
        $(".premiumReviewEvents").css('display', "");
        $(".premiumReviewFilm").css('display', "none");
        $(".totalBudgetReview").css('display', "none");
        $(".photographyDatesReviewTable").css('display', "none");
        $(".eventDaysReview").css('display', "");
        $(".totalAttendanceReview").css('display', "");
        $(".largestAttendeesReview").css('display', "");

        // INDICATION RATING
        specialEventsRateInfoCalculator()

        var newHtmlString = "";
        $("div#step-2 .showReviewTable").each(function () {
            newHtmlString = newHtmlString + $(this).wrap('<p/>').parent().html();
        });
        $("div#step-3 .showReviewTable").each(function () {
            newHtmlString = newHtmlString + $(this).wrap('<p/>').parent().html();
        });
        var newObject = $('<div/>').html(newHtmlString).contents();


        $(newObject).find('.limitSelect').each(function () {
            var text = $(this).children(':selected').text()
            var htmlString = "<span class='limit'>" + text + "</span>"

            $(this).replaceWith(htmlString);
        });

        // console.log($(newObject))
        // console.log($(newObject).find('.limitInput'))


        $(newObject).find('.limitInput').each(function () {
            // console.log ($(this))
            // console.log ($(this).val())
            var elemID = $(this).attr('id');
            var text = $('#' + elemID).val()
            var htmlString = "<span class='limit'>" + text + "</span>"
            $(this).replaceWith(htmlString);
        });
        // $(newObject).find('#limitMiscellaneous').each(function(){
        //     // console.log ($(this))
        //     // console.log ($(this).val())
        //     var text = $(this).val()
        //     var htmlString = "<span class='limit'>" + text + "</span>"
        //
        //     $(this).replaceWith(htmlString);
        // });


        $("#reviewLimitsDeductsSP").html(newObject);
        var premString = "";
        $('.premDistributionInsert').each(function () {
            premString = premString + $(this).html();
        });

        var str = $("<div />").append($('#premDistributionInsert').clone()).html();
        str = str + $("<div />").append($('.TaxHeaderRow').clone()[0]).html();
        str = str + $("<div />").append($('#taxRows').clone()[0]).html();
        // str = str + $("<div />").append($('.TotalPremiumRow').clone()[0]).html();
        str = str + premString;
        $("#reviewPremDistributionSP").html(str);
        $("#reviewTerms").html($("#termsInsert").html());
        //$("#reviewSubject").html($("#subjectInsert").html());
        $("#reviewBrokerFee").html($("#brokerFeeInput").val());
    }
    else {
        //FOR PIPCHOICE ONLY
        var limitValueArray = [];
        $("#limitsDeductPremiumInsert").find('.limitColumn').each(function () {
            if ($(this).find('input').length) {
                limitValueArray.push($(this).find('input').val());
            }
        });

        var newHtmlString = "";
        $(".showReviewTable").each(function () {
            newHtmlString = newHtmlString + $(this).wrap('<p/>').parent().html();


        });
        var newObject = $('<div/>').html(newHtmlString).contents();
        newObject.find('.limitColumn').each(function (index) {
            if ($(this).find('input').length) {
                $(this).html("<span class='limit'>" + limitValueArray[index] + "</span>");
            }
        });

        $("#reviewLimitsDeducts").html(newObject);
        var premString = "";
        $('.premDistributionInsert').each(function () {
            premString = premString + $(this).html();
        });


        var str = $("<div />").append($('#premDistributionInsert').clone()).html();
        str = str + $("<div />").append($('.TaxHeaderRow').clone()[0]).html();
        str = str + $("<div />").append($('#taxRows').clone()[0]).html();
        str = str + $("<div />").append($('.TotalPremiumRow').clone()[0]).html();
        str = str + premString;
        $("#reviewPremDistribution").html(str);
        $("#reviewTerms").html($("#termsInsert").html());
        //$("#reviewSubject").html($("#subjectInsert").html());
        $("#reviewBrokerFee").html($("#brokerFeeInput").val());
    }
    var reviewString = "";
    var checkboxesReviewed = "";
    var blankAnswer = "To Follow"

    //RESET UWQUESTIONS
    uwQuestionsMap = {};
    uwQuestionsOrder = [];

    $(".showReview").each(function () {
        if ($(this).is(':visible')) {
            //if ($(this).css("display") != "none") {
            if ($(this).is("select")) {
                // the input field is not a select
                var answer = "";
                if ($(this).find(":selected").text().length > 0) {
                    answer = $(this).find(":selected").text()
                }
                else {
                    answer = blankAnswer;
                }
                reviewString = reviewString + "<div class='row'>" +
                    "<div class='col-xs-3 text-left'>" +
                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
                    "</div>" +
                    "<div class='col-xs-9'>" +
                    "<div class='reviewSpan uwReviewQuestion' id='review' data-originalID='" + $(this).attr('id') + "' >" + answer + "</div>" +
                    "</div>" +
                    "</div>";
                reviewString = reviewString + "<br>";

                //STORE IN UW QUESTIONS
                uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
                uwQuestionsOrder.push($(this).attr("data-reviewName"));

            }
            else if ($(this).is(':checkbox') && $(this).attr("data-reviewName")) {
                // the input field is not a select
                //alert($(this).attr("data-reviewName") + " - " + checkboxesReviewed + " - " +  checkboxesReviewed.indexOf($(this).attr("data-reviewName")));
                if (checkboxesReviewed.indexOf($(this).attr("data-reviewName")) == -1) {
                    var checkboxesCheckedString = "";

                    var answer = "";


                    reviewString = reviewString + "<div class='row'>" +
                        "<div class='col-xs-3 text-left'>" +
                        "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
                        "</div>";

                    $('input[data-reviewName="' + $(this).attr("data-reviewName") + '"]').each(function () {
                        if ($(this).is(":checked")) {
                            //alert($(this).val());
                            checkboxesCheckedString = checkboxesCheckedString + $(this).val() + ", ";
                        }
                    });
                    checkboxesCheckedString = checkboxesCheckedString.replace(/,\s*$/, "");

                    if (checkboxesCheckedString.length > 0) {
                        answer = checkboxesCheckedString;
                    }
                    else {
                        //answer = blankAnswer;
                        answer = "None";
                    }

                    reviewString = reviewString + "<div class='col-xs-9'>" +
                        "<div class='reviewSpan'>" + answer + "</div>" +
                        "</div>";

                    reviewString = reviewString + "</div>";
                    reviewString = reviewString + "<br>";
                    checkboxesReviewed = checkboxesReviewed + $(this).attr("data-reviewName") + ";";


                    //STORE IN UW QUESTIONS
                    uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
                    uwQuestionsOrder.push($(this).attr("data-reviewName"));
                }
                else {

                }

            }
            else if ($(this).is(':radio') && $(this).attr("data-reviewName")) {
                var answer = "";
                if ($("input:radio[name='" + $(this).attr('name') + "']:checked").val().length > 0) {
                    answer = $("input:radio[name='" + $(this).attr('name') + "']:checked").val();
                }
                else {
                    answer = blankAnswer;
                    //answer = "None";
                }

                reviewString = reviewString + "<div class='row'>" +
                    "<div class='col-xs-3 text-left'>" +
                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
                    "</div>" +
                    "<div class='col-xs-9'>" +
                    "<div class='reviewSpan' >" + answer + "</div>" +
                    "</div>" +
                    "</div>";
                reviewString = reviewString + "<br>";

                //STORE IN UW QUESTIONS
                uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
                uwQuestionsOrder.push($(this).attr("data-reviewName"));
            }
            else if ($(this).attr("id") === "numberOfCastMembers") {
                var answer = "";
                $("#castMemberDetailContainer").find('.row').each(function () {
                    if ($(this).css("display") != "none") {
                        if ($(this).find(".castMemberName").val().trim().length > 0) {
                            answer = answer + $(this).find(".castMemberName").val() + ",\t" + $(this).find(".castMemberAge").val() + ",\t" + $(this).find(".castMemberRole").val() + "\n"

                        }
                    }

                });

                if (answer === "") {
                    answer = "To Follow";
                }
                reviewString = reviewString + "<div class='row'>" +
                    "<div class='col-xs-3 text-left'>" +
                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
                    "</div>" +
                    "<div class='col-xs-9'>" +
                    "<div class='reviewSpan' style='white-space: pre-line'>" + $(this).val() + "</div>" +
                    "</div>" +
                    "</div>";

                reviewString = reviewString + "<div class='row'>" +
                    "<div class='col-xs-3 text-left'>" +
                    "<label class='reviewLabel '>" + "Cast Members" + "</label><br>" +
                    "</div>" +
                    "<div class='col-xs-9'>" +
                    "<div class='reviewSpan' style='white-space: pre-line'>" + answer + "</div>" +
                    "</div>" +
                    "</div>";
                reviewString = reviewString + "<br>";

                //STORE IN UW QUESTIONS
                uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
                uwQuestionsOrder.push($(this).attr("data-reviewName"));
            }
            else {
                var answer = "";
                if ($(this).val().length > 0) {
                    answer = $(this).val()
                }
                else {
                    answer = blankAnswer;
                }

                reviewString = reviewString + "<div class='row'>" +
                    "<div class='col-xs-3 text-left'>" +
                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
                    "</div>" +
                    "<div class='col-xs-9'>" +
                    "<div class='reviewSpan' >" + answer + "</div>" +
                    "</div>" +
                    "</div>";
                reviewString = reviewString + "<br>";

                //STORE IN UW QUESTIONS
                uwQuestionsMap[$(this).attr("data-reviewName")] = answer;
                uwQuestionsOrder.push($(this).attr("data-reviewName"));
            }

            //console.log($(this).attr("data-reviewName"));
        }


    });
    //alert("review String: " + reviewString);
    $("#otherReviewInsert").html(reviewString);

    //ATTACHED FILES
    var filesInsert = "";
    $(':file').each(function () {
        var file = this.files[0];
        if (file === undefined) {

        }
        else {
            var ext = $(this).val().split('.').pop().toLowerCase();

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

            //console.log("Change: " + file);

            var name = file.name;
            var size = file.size;
            var type = file.type;
            filesInsert = filesInsert +
                "<div class='row'>" +
                "<div class='col-xs-12 text-left'>" +
                "<div class='reviewSpan' id='review'><img src='/images/" + iconFilePath + "' height='16' width='16' style='margin-right:10px'/>" + name + "</div>" +
                "</div>" +
                "</div>";
        }

    });

    $('#reviewAttachedFilesInsert').html(filesInsert);
}

function Submission() {
    var submission = this;
    $(document).on('change', ":input[data-object='submission']", function () {
        submission[$(this).attr('data-key')] = $(this).val();
        // console.log(submission);
    });
    this.riskCategory = getRiskCategoryChosen(); //required
    this.riskType = getRiskTypeChosen(); //required
    this.brokerEmail = $('#userDetails-email').html().trim(); //required
    this.proposedEffectiveDate;
    this.proposedExpirationDate;
    this.proposedTermLength;
    this.totalBudget;
    this.expectedPremium;


    //INSURED INFO
    this.namedInsured;
    this.streetNameMailing;
    this.cityMailing;
    this.stateMailing;
    this.zipCodeMailing;
    this.producerID; //TVD
    this.namedInsuredPhone;
    this.namedInsuredEmail
    this.FEINSSN
    this.businessStructureID
    this.NAIC; //NCCI
    this.SIC;
    this.attention; //Broker First and Last Name
    this.contactID //user.aimContactID
    this.website;


    this.productsArray = [];
    $(document).on('change', ":input[data-object='product']", function () {
        submission.productsArray = []
        $(":input[data-object='product']").each(function () {
            if ($(this).is(":checked")) {
                var prod = new Product($(this).attr('data-value'));

                submission.productsArray.push(new Product($(this).attr('data-value')))
            }
        });
        // console.log(submission)
    });

    this.readyForAIMDB = function () {

    }
}

this.Product = function Product(productID) {
    this.productID = productID;
    this.productName;
    this.coverageID;
    this.Lob = function Lob() {
        this.parentProductID
        this.description;
        this.limit;
        this.deductible;
        this.premium;
    }
    this.terms;
    this.endorse;
    this.companyID; //marketcompany
    this.companyName;
    this.companyNAIC;
    this.grossCommission;
    this.agentCommission;
    this.totalProductPremium
    this.statusID;

    //Commercial General Liability	$450	15.0
    //NOA Liability	$450	15.0
    this.LobDistribSched;

    //CGL	450	28.0	15.0
    //NOAL	450	28.0	15.0
    this.lobDistrib;

    this.rateInfo;

    this.taxState;
    this.taxesPaidBy;
    this.taxesPaidByID;
    this.TaxLine = function TaxLine() {
        this.taxDescription;
        this.taxCode;
        this.taxCalculatedAmount;
        this.taxRate;
    }


    this.brokerFee;
    this.webQuoteFee;
    this.feeSchedule;
    this.versionPremDist
}

function specialEventsRateInfoCalculator() {
    var specialEventCGLRateInfo = ""

    if (riskChosen === "Exhibitor" ||
        riskChosen === "Concessionaires Non Food Sales" ||
        riskChosen === "Concessionaires Food Sales" ||
        riskChosen === "Attractions / Performers") {

        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rate" + "\t" + riskClass + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Attendance" + "\t" + $("#estimatedTotalAttendance").val() + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Event Days" + "\t" + $("#howManyDaysIsTheEvent").val() + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Number of Exhibitors" + "\t" + numberOfExhibitors + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rated Premium" + "\t" + totalPremium + "\n";

    }
    else if (getCGLBasePremium() != null){
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rate" + "\t" + rate + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Attendance" + "\t" + $("#estimatedTotalAttendance").val() + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Event Days" + "\t" + $("#howManyDaysIsTheEvent").val() + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Minimum Premium" + "\t" + getCGLMinimumPremium(minimumPremium) + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rated Premium" + "\t" + getCGLBasePremium(ratedPremium) + "\n";
    }
    // ALCOHOL
    if ($('input[name="willAlcoholBeServed"]:checked').val() == "Yes") {
        specialEventCGLRateInfo = specialEventCGLRateInfo + "Liquor" + "\t" + "" + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rate" + "\t" + liquorRate + " Rate per 1000" + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Minimum Premium" + "\t" + liquorMinimumPremium + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rated Premium" + "\t" + liquorRatePremium + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  State" + "\t" + $("#selectState :selected").text() + "\n";
    }
    // GENERAL AGGREGATE
    if ($('.limitGeneralAggregate').find('option:selected').val() == "additional") {
        specialEventCGLRateInfo = specialEventCGLRateInfo + "General Aggregate" + "\t" + "" + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Flat Rate" + "\t" + 250 + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + 2000000 + "\n";
    }
    // PRODUCT
    if ($('.limitProductAndCompletedOperations').find('option:selected').val() == "additional") {
        specialEventCGLRateInfo = specialEventCGLRateInfo + "Products and Completed Operations" + "\t" + "" + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Flat Rate" + "\t" + 250 + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + 2000000 + "\n";
    }
    // PREMISES DAMAGE
    if ($('.limitPremisesDamage').find('option:selected').val() == "additional") {
        if (termLenghtDays > 0 && termLenghtDays <= 90) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Damages to Premises Rented to you" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Flat Rate" + "\t" + 100 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + 1000000 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Term Length" + "\t" + temptermLenghtDays + "\n";
        }

        else if (termLenghtDays > 91 && termLenghtDays <= 180) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Damages to Premises Rented to you" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Flat Rate" + "\t" + 250 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + 1000000 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Term Lenght" + "\t" + temptermLenghtDays + "\n";
        }

        else if (termLenghtDays > 181) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Damages to Premises Rented to you" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Flat Rate" + "\t" + 450 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + 1000000 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Term Lenght" + "\t" + temptermLenghtDays + "\n";
        }
    }
    // MEDICAL
    if ($('.limitMedicalExpenses').find('option:selected').val() == "additional") {
        specialEventCGLRateInfo = specialEventCGLRateInfo + "Medical Expenses" + "\t" + "" + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Flat Rate" + "\t" + 250 + "\n";
        specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + 5000 + "\n";
    }
    // THIRD PARTY PROPERTY
    if ($("#thirdPartyCheckbox").is(':checked')) {
        if (eventDays > 0 && eventDays <= 30) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Third Party Property Damage" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Flat Rate" + "\t" + 420 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + 1000000 + "\n";
        }
        else if (eventDays > 30 && eventDays <= 60) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Third Party Property Damage" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Flat Rate" + "\t" + 820 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + 1000000 + "\n";
        }
        else if (eventDays > 60 && eventDays <= 90) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Third Party Property Damage" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Flat Rate" + "\t" + 1235 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + 1000000 + "\n";
        }
    }
    // MISCELLANEOUS EQUIPMENT
    if ($("#miscUsaCheckbox").is(':checked')) {
        if (eventDays > 0 && eventDays <= 30) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Miscellaneous Equipment" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rate" + "\t" + 0.50 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Minimum Premium" + "\t" + 100 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rated Premium" + "\t" + limit + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + $("#limitMiscellaneous").val() + "\n";
        }
        else if (eventDays > 30 && eventDays <= 90) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Miscellaneous Equipment" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rate" + "\t" + 0.75 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Minimum Premium" + "\t" + 250 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rated Premium" + "\t" + limit + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + $("#limitMiscellaneous").val() + "\n";
        }
    }
    if ($("#miscWorldCheckbox").is(':checked')) {
        if (eventDays > 0 && eventDays <= 30) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Miscellaneous Equipment" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rate" + "\t" + 0.63 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Minimum Premium" + "\t" + 125 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rated Premium" + "\t" + limit + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + $("#limitMiscellaneous").val() + "\n";
        }
        else if (eventDays > 30 && eventDays <= 90) {
            specialEventCGLRateInfo = specialEventCGLRateInfo + "Miscellaneous Equipment" + "\t" + "" + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rate" + "\t" + 0.94 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Minimum Premium" + "\t" + 313 + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Rated Premium" + "\t" + limit + "\n";
            specialEventCGLRateInfo = specialEventCGLRateInfo + "  Limit" + "\t" + $("#limitMiscellaneous").val() + "\n";
        }
    }
    
    return specialEventCGLRateInfo
}


