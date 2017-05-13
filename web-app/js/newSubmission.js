/**
 * Created by paikchris on 8/23/16.
 */


var autoSaveMap = {};
var loadedAutoSaveMap;
var currentStep;
var namedInsuredConflict = false;
var BORrequested = false;
var renewalRequested = false;
var uwQuestionsMap = {};
var uwQuestionsOrder = [];

function init(){
    // $('html,body').scrollTop(0);
    $(window).on('unload', function() {
        $(window).scrollTop(0);
    });
    var testingMode = false; //SET TO TRUE IF TESTING


    //SAVE AND LOAD STUFF (newSubmissionUtils/progressSaveLoad.js)
    showLoadButtonIfSavedSubmissionsExist();
    setIntervalToAutoSave(10000);
    setSubmissionToAutoSaveOnQuit(false);
    initializeSubmissionSaveAndLoadButtons();
    initializeAutoSaveLoadProgressButtons();

    //INPUT VALIDATION STUFF (utils/formValidation.js)
    initializeListnerForNoBlankRequiredFields();

    //DATE FUNCTIONS SETUP (newSubmissionUtils/dateHelper.js)
    initializeDateInputAndFunctions();
    initializeBORFunctions();
}


$(document).ready(function() {
    init();
    console.log("NEWSUBMISSION.JS LOADED");


    //WHEN THE STATE CHANGES IN STEP 3, UPDATE PREMIUMS FOR TAX
    $(document).on('change', '#stateMailing', function() {
        var chosenState = $(this).val();

        if(chosenState === "AK" ||
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
            chosenState === "NY"  ){
            //LICENSED STATE
        }
        else if(chosenState =="invalid"){

        }
        else{
            //UNLICENSED STATE
            alert($(this).val() + " requires further review before providing a quote. Feel free to continue with your submission and a NEEIS Underwriter will contact you.");
        }

        if (riskChosen.indexOf("Film Projects") > -1) {
            ratePremiums();
        }
    });

    //GOTO STEP 2 AFTER CLICKING ON RISKTYPE
    $(document).on('change', '.riskTypeDropdown', function() {
        $('#nextButtonStep1').trigger('click');
    });

    //SETUP ENTER KEY TO DISMISS ALERTMESSAGEMODAL
    $(document).keyup(function(e) {
        if (e.keyCode == 13) {
            if ($('#alertMessageModal').hasClass('in')) {
                $('#alertMessageModal').modal('hide');
            }
        }
    });




    //RATE PREMIUMS WHEN COVERAGE CHECKBOX IS CLICKED
    $(document.body).on('change', '.coverageCheckbox', function() {
        if ($("#proposedTermLength").val().trim().length < 1) {
            alert("Please enter coverage dates.")
            if ($(this).is(':checked')) {
                this.checked = false
            }
            else {
                this.checked = false;
            }
        }
        else {
            //alert();
            if ($(this).is(':checked')) {
                $(this).parent().parent().next().find('.productsSelect').css("display", "");
            }
            else {
                $(this).parent().parent().next().find('.productsSelect').css("display", "none");
            }

        }
    });

    ///FILMING LOCATION ADD REMOVE BUTTONS
    $(document.body).on('click', '.addLocation', function() {
        var htmlString = "";
        var count = 0;
        $('#locationDivContainer').children('.locationDiv').each(function() {
            //alert($(this).html());
            count++
            //alert(count);
            htmlString = $(this).html();
            htmlString = htmlString.replace("Physical Address", "Location " + (count + 1));
            htmlString = htmlString.replace("Location " + count, "Location " + (count + 1));

        });

        $("#locationDivContainer").append("<div class='locationDiv'>" + htmlString + "</div>");

    });

    //FILMING LOCATION ADD REMOVE BUTTONS
    $(document.body).on('click', '.removeLocation', function() {
        var htmlString = "";
        var count = 0;
        //alert($(this).closest('.locationDiv').find('h5').html())
        if ($(this).closest('.locationDiv').find('h5').html() === "Physical Address") {

        }
        else {
            $(this).closest('.locationDiv').remove();
            $('#locationDivContainer').children('.locationDiv').each(function() {
                //alert($(this).html());
                count++
                var locationHeader = $(this).find('h5').html();
                //alert(locationHeader);
                if (locationHeader == "Physical Address") {

                }
                else {
                    $(this).find('h5').html("Location " + count);
                }

                //htmlString = $(this).html();
                //htmlString = htmlString.replace("Location " + count , "Location " + (count+1));
            });
        }


        //$("#locationDivContainer").append("<br><br><div class='locationDiv'>" + htmlString + "</div>");

    });

    //MASK PHONE NUMBER FORMAT
    $(document.body).on('focus', '.phoneNumberMask', function() {
        $(".phoneNumberMask").mask("(999) 999-9999");
    });

    //CLICK HANDLER FOR RISK CATEGORY CARDS
    $('.card').click(function() {
        if ($(this).hasClass("cardselected")) {
            $(this).removeClass("cardselected");
            $(this).addClass("card-unselected");
            $(".drawer").removeClass("open");
        }
        else {
            $('.cardselected').each(function() {
                $(this).removeClass("cardselected");
                $(this).addClass("card-unselected");

            });
            $(".drawer").removeClass("open");


            $(this).addClass("cardselected");
            $(this).removeClass("card-unselected");

            $(this).parent().siblings(".drawerContainer").children(".drawer").addClass("open");
        }

    });

    //CLICK HANDLER FOR SELECTING RISKTYPE
    $('a.riskOptionLink').click(function() {
        $('.riskTypeDropdown').css('display', "none");
        $('a.riskOptionLink').parent().removeClass("active");
        $('a.riskOptionLink').parent().addClass("inactive");
        $(this).parent().addClass("active");
        $(this).parent().removeClass("inactive");

        if ($(this).hasClass("riskOptionDropDown")) {
            $(this).find('select').css('display', "");
        }
        else {
            setTimeout(
                function() {
                    $('#nextButtonStep1').trigger('click');
                }, 200)

        }
        return false;

    });

    /////////////////////////////////////////////////////////
    //FORM WIZARD CODE
    /////////////////////////////////////////////////////////
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function(e) {
        //console.log(currentStep)
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);
        //console.log($('.btn-primary').html());


        if($item.attr('id') == "buttonCircleStep4"){ 
            buildReview();
         }

        if (!$item.hasClass('disabled') && !$($item)[0].hasAttribute("disabled")) {
            if (parseInt($('.btn-primary').html()) > parseInt($(this).html())) {
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

    allNextBtn.click(function(e) {
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
                    if (riskChosen === "Specific Film Projects Test") {
                        testingMode = true;
                    }
                    else if (riskChosen === "Film Projects Without Cast (With Work Comp)" || riskChosen === "Film Projects With Cast (With Work Comp)") {
                        $('#totalBudgetConfirmGroup').css('display', '');
                        var finishedLoading1 = false;
                        var finishedLoading2 = false;
                        var finishedLoading3 = false;
                        $("#insuredInfoInsert").load("./../forms/specFilm #insuredInfo", function() {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageCheckboxesDiv").load("./../forms/specFilm #coverageSGPCheckboxesDiv", function() {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/specFilm #riskSpecificInfo", function() {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            var scriptPath = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                            script.src = scriptPath;
                            head.appendChild(script);

                            //WAIT TO ENSURE SPECFILMS HAS LOADED
                            while($("script[src*='"  + scriptPath + "']").length === 0){
                                // console.log("still Loading");
                            }
                            //LOAD SGP JS FILE
                            var sgpScript = document.createElement("script");
                            // set the type attribute
                            sgpScript.type = "application/javascript";
                            // make the script element load file

                            sgpScript.src = '/js/forms/sgpFilm.js' + "?ts=" + new Date().getTime();;
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
                        var finishedLoading1 = false;
                        var finishedLoading2 = false;
                        var finishedLoading3 = false;
                        $("#insuredInfoInsert").load("./../forms/specFilm #insuredInfo", function() {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageCheckboxesDiv").load("./../forms/specFilm #coverageCheckboxesDiv", function() {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/specFilm #riskSpecificInfo", function() {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                            head.appendChild(script);
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

                        $("#insuredInfoInsert").load("./../forms/entertainerForm #insuredInfo", function() {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/entertainerForm #coverageCheckboxesDiv", function() {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/entertainerForm #riskSpecificInfo", function() {
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

                            $("#insuredInfoInsert").load("./../forms/specialEventVendor #insuredInfo", function() {
                                finishedLoading1 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });
                            $("#coverageInfoPanel").load("./../forms/specialEventVendor #coverageCheckboxesDiv", function() {
                                finishedLoading3 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });
                            $("#riskSpecificInsert").load("./../forms/specialEventVendor #riskSpecificInfo", function() {
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
                            $("#insuredInfoInsert").load("./../forms/specialEventLiability #insuredInfo", function() {
                                finishedLoading1 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });
                            $("#coverageInfoPanel").load("./../forms/specialEventLiability #coverageCheckboxesDiv", function() {
                                finishedLoading3 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').modal('hide');
                                }
                            });
                            $("#riskSpecificInsert").load("./../forms/specialEventLiability #riskSpecificInfo", function() {
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

                        $("#insuredInfoInsert").load("./../forms/office #insuredInfo", function() {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/office #coverageCheckboxesDiv", function() {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/office #riskSpecificInfo", function() {
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

                        $("#insuredInfoInsert").load("./../forms/shellCorp #insuredInfo", function() {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/shellCorp #coverageCheckboxesDiv", function() {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/shellCorp #riskSpecificInfo", function() {
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

                        $("#insuredInfoInsert").load("./../forms/venueTenantUser #insuredInfo", function() {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/venueTenantUser #coverageCheckboxesDiv", function() {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/venueTenantUser #riskSpecificInfo", function() {
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

                        $("#insuredInfoInsert").load("./../forms/ancillaryEntertainmentRisk #insuredInfo", function() {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/ancillaryEntertainmentRisk #coverageCheckboxesDiv", function() {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/ancillaryEntertainmentRisk #riskSpecificInfo", function() {
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

                        $("#riskSpecificInsert").load("./../forms/otherForm.gsp #riskSpecificInfo", function() {
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
                        $("#insuredInfoInsert").load("./../forms/otherForm #insuredInfo", function() {
                            finishedLoading1 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                                if (testingMode) {
                                    testingModeFill();
                                }
                            }
                        });
                        $("#coverageCheckboxesDiv").load("./../forms/otherForm #coverageCheckboxesDiv", function() {
                            finishedLoading3 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                                if (testingMode) {
                                    testingModeFill();
                                }
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/otherForm #riskSpecificInfo", function() {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/js/forms/otherForm.js' + "?ts=" + new Date().getTime();
                            head.appendChild(script);
                            finishedLoading2 = true;
                            if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                $('#loadingModal').modal('hide');
                                if (testingMode) {
                                    testingModeFill();
                                }
                            }
                        });
                    }
                    if (riskChosen === "Film Projects Without Cast (With Work Comp)" || riskChosen === "Film Projects With Cast (With Work Comp)") {
                        clearProductChoices();
                    }
                    else{
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
                    if ( validSubmissionMessage === true) {
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
                            .done(function(msg) {
                                //alert(msg);
                                //0620584,0620585
                                var indicationPDFError = false;
                                if(msg.split("&;&")[1] === "Indication Error"){
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
                                    $('input:file').each(function(){
                                        var file = $(this).get(0).files[0];
                                        if(file){
                                            submissionHasFile = true;
                                            formData.append($(this).attr('id'), file);
                                        }
                                    });

                                    if (submissionHasFile) {
                                        $('.progress-bar').attr('aria-valuenow', "75").animate({
                                            width: "75%"
                                        }, 2000);
                                        //formData.append('bioFile', bioFile);
                                        //formData.append('lossesFile', lossesFile);
                                        //formData.append('pyroFile', pyroFile);
                                        //formData.append('stuntsFile', stuntsFile);
                                        //formData.append('animalPDF', animalPDF);
                                        //formData.append('dronePDF', dronePDF);
                                        //formData.append('equipScheduleFile', equipScheduleFile);
                                        //formData.append('doodFile', doodFile);
                                        //formData.append('treatmentFile', treatmentFile);
                                        //formData.append('budgetFile', budgetFile);
                                        formData.append('quoteIDs', quoteIDs);

                                        $.ajax({
                                            method: "POST",
                                            url: "/async/ajaxAttachNew",
                                            data: formData,
                                            cache: false,
                                            contentType: false,
                                            processData: false
                                        })
                                            .done(function(msg) {
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
                        $('#progressBarModal').modal('hide');
                        alert("Error: Submission has errors " + validSubmissionMessage );

                    }


                    $('#loadingModal').modal('hide');
                }
                else if (riskCategory == "Special Events"){
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
                        .done(function(msg) {

                            var indicationPDFError = false;

                            if (!msg.startsWith("Error")) {
                                newSubmissionConfirmParam = msg;
                                //console.log("UPLOADING FILES");
                                //ATTACH FILES

                                var formData = new FormData();
                                var formDataNew = getFormDataWithAllAttachedFilesNew();

                                var quoteIDs = msg.split("&;&")[0];

                                //NEW STUFF
                                var submissionHasFile = false;
                                $('input:file').each(function(){
                                    var file = $(this).get(0).files[0];
                                    if(file){
                                        submissionHasFile = true;
                                        formData.append($(this).attr('id'), file);
                                    }
                                });

                                if (submissionHasFile) {
                                    $('.progress-bar').attr('aria-valuenow', "75").animate({
                                        width: "75%"
                                    }, 2000);
                                    //formData.append('bioFile', bioFile);
                                    //formData.append('lossesFile', lossesFile);
                                    //formData.append('pyroFile', pyroFile);
                                    //formData.append('stuntsFile', stuntsFile);
                                    //formData.append('animalPDF', animalPDF);
                                    //formData.append('dronePDF', dronePDF);
                                    //formData.append('equipScheduleFile', equipScheduleFile);
                                    //formData.append('doodFile', doodFile);
                                    //formData.append('treatmentFile', treatmentFile);
                                    //formData.append('budgetFile', budgetFile);
                                    formData.append('quoteIDs', quoteIDs);

                                    $.ajax({
                                        method: "POST",
                                        url: "/async/ajaxAttachNew",
                                        data: formData,
                                        cache: false,
                                        contentType: false,
                                        processData: false
                                    })
                                        .done(function(msg) {
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
                    $('#reviewPanelContainer .productID_pull').each(function() {
                        var productObj = {}
                        productObj["productID"] = $(this).html().trim();
                        productObj["coveragedID"] = $(this).attr('data-cov');

                        productObj["premium"] = $('.productTotalPremium.SPEVENTS').first().html().trim();

                        productObj["limitsString"] = "";
                        productObj["deductsString"] = "";
                        productObj["stringLOB"] = "";

                        $(".lobRow." + productObj["productID"] + "." + productObj["coveragedID"]).each(function() {
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
                    console.log(dataString);


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
                        .done(function(msg) {
                            alert(msg);
                        });


                    //sendSubmissiontoAIM();
                }
            }
            else if (e.target.id == "testPDF") {
                $('#loadingModal').modal('hide');

                var $form = $('.form-control');
                var data = getFormData($form);

                $.ajax({
                    method: "POST",
                    url: "/Async/intelledoxGenerate",
                    data: {
                        formData: JSON.stringify(data)

                    }
                })
                    .done(function(msg) {
                        alert(msg);
                    });
                //var url = "http://138.91.159.55/Produce/wizard/nextPage?_=1477988403929"
                //var form = document.getElementById('intelledox');
                //var formData = new FormData(form);
                //
                ////var w2 = window.open(url);
                //formData.append("txtUsername", "admin");
                //formData.append("txtPassword", "admin");
                //$.ajax({
                //    type: "POST",
                //    url: "http://138.91.159.55/Produce/WebLogin.aspx",
                //    data: formData,
                //    contentType: false,
                //    processData: false,
                //    crossDomain: true,
                //    error: function (xhr, status, error) {
                //        alert(xhr);
                //    },
                //    success: function (response, status, xhr) {
                //       //console.log(xhr);
                //    }
                //});
                //
                //formData.append("Q1", "Groucho");
                //$.ajax({
                //    type: 'POST',
                //    url: url,
                //    contentType: false,
                //    processData: false,
                //    data: formData,
                //    error: function (xhr, status, error) {
                //        alert(xhr);
                //    },
                //    success: function (response, status, xhr) {
                //       //console.log(response);
                //    }
                //});
                return false;
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

    allPrevBtn.click(function() {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");



        $(".form-group").removeClass("has-error");
        prevStepWizard.removeAttr('disabled').trigger('click');
    });

    //NEEDED TO SET THE PAGE TO STEP 1 AFTER WIZARD SETUP FOR SOME REASON
    $('div.setup-panel div a.btn-primary').trigger('click');
});

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i) {
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
}

function testingModeFill() {
    $('#namedInsured').val("Testing Mode Insured");
    $('#phoneNumber').val("(703)123-4567");
    $('#namedInsuredEmail').val("testing@test.com");
    $('#website').val("www.testingMode.com");
    $('#googleAutoAddress').val("144 Test St");
    $('#cityMailing').val("TestCity");
    $('#zipCodeMailing').val("90120");
    $('#stateMailing').val("CA");
    $('#nameOfProductionCompany').val("Test Production Company");
    $('#titleOfProduction').val("Test Title Of Production");
    $('#nameOfPrincipal').val("Test Principal Name");
    $('#numberOfYearsOfExperience').val("23 Years");
    $('#listOfPriorLosses').val("Test Prior Losses");

    $('input:checkbox[name=documentary]').prop("checked", true);
    $('input:checkbox[name=documentary]').trigger("change");
    $('input:checkbox[name=useOfAnimals]').prop("checked", true);
    $('input:checkbox[name=useOfAnimals]').trigger("change");
    $('input:checkbox[name=underwaterFilming]').prop("checked", true);

    $('#filmingLocation').attr('disabled', 'disabled');
    $('.filmLocationStart').attr('disabled', 'disabled');
    $('.filmLocationEnd').attr('disabled', 'disabled');

    $('#story').val("This is a Test Story - The End");
    $('#producer').val("Test Producer");
    $('#director').val("Test Director");
    $('#sourceOfFinancing').val("Test Source of Financing");
    $('#completionBondCompany').val("Test Completion Bond Company");
    $('.physicalAddressNumBuildings').val("4");
    $('.physicalAddressHabUnits').val("100");
    $('#physicalAddressCommSqFt').val("1500");
    $('#FEINSSN').val("123456789");
    $('#SIC').val("1234");
    $('#NCCI').val("TESTNCCI");

    $('#addressTheSame').prop("checked", true);
    $('#addressTheSame').trigger("change");


    $('#totalBudgetInput').val("$400000.00");
    $('#totalBudgetConfirm').val("$400000.00");
    $('#totalBudgetInput').attr("placeholder", "");
    $("#totalBudgetInput").trigger("change");

    $('#brokerFeeInput').val("$100.00");
    $('#brokerFeeInput').attr("placeholder", "");
    $("#brokerFeeInput").trigger("change");

    $('#proposedEffectiveDate').val("12/05/2016");
    $('#proposedEffectiveDate').attr("placeholder", "");
    $('#proposedExpirationDate').val("12/05/2017");
    $('#proposedExpirationDate').attr("placeholder", "");
    $("#proposedExpirationDate").trigger("change");
    $('#principalPhotographyDateStart').val("12/05/2016");
    $('#principalPhotographyDateEnd').val("12/05/2017");


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

function buildReview() {
    $("#reviewRiskType").html($("li.active").children("a.riskOptionLink").html().trim());
    //alert($("#namedInsured").html());
    $("#reviewNamedInsured").html($("#namedInsured").val());
    $("#reviewMailingAddress").html($("#googleAutoAddress").val());
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
    if (riskCategory == "Special Events"){
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


        var newHtmlString = "";
        $("div#step-2 .showReviewTable").each(function() {
            newHtmlString = newHtmlString + $(this).wrap('<p/>').parent().html();
        });
        $("div#step-3 .showReviewTable").each(function() {
            newHtmlString = newHtmlString + $(this).wrap('<p/>').parent().html();
        });
        var newObject = $('<div/>').html(newHtmlString).contents();


        $(newObject).find('.limitSelect').each(function(){
            var text = $(this).children(':selected').text()
            var htmlString = "<span class='limit'>" + text + "</span>"

            $(this).replaceWith(htmlString);
        });

        console.log ($(newObject))
        console.log ($(newObject).find('.limitInput'))


        $(newObject).find('.limitInput').each(function(){
            // console.log ($(this))
            // console.log ($(this).val())
            var elemID = $(this).attr('id');
            var text = $('#'+elemID).val()
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
        $("#limitsDeductPremiumInsert").find('.limitColumn').each(function() {
            if ($(this).find('input').length) {
                limitValueArray.push($(this).find('input').val());
            }
        });

        var newHtmlString = "";
        $(".showReviewTable").each(function() {
            newHtmlString = newHtmlString + $(this).wrap('<p/>').parent().html();


        });
        var newObject = $('<div/>').html(newHtmlString).contents();
        newObject.find('.limitColumn').each(function(index) {
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
    $(".showReview").each(function() {
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

                    $('input[data-reviewName="' + $(this).attr("data-reviewName") + '"]').each(function() {
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
                $("#castMemberDetailContainer").find('.row').each(function() {
                    if ($(this).css("display") != "none") {
                        if ($(this).find(".castMemberName").val().trim().length > 0) {
                            answer = answer + $(this).find(".castMemberName").val() + "," + $(this).find(".castMemberAge").val() + "," + $(this).find(".castMemberRole").val() + "\n"

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
                    "<div class='reviewSpan' >" + answer + "</div>" +
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
    $(':file').each(function() {
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
    $(document).on('change', ":input[data-object='submission']", function() {
        submission[$(this).attr('data-key')] = $(this).val();
        console.log(submission);
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
    $(document).on('change', ":input[data-object='product']", function() {
        submission.productsArray = []
        $(":input[data-object='product']").each(function() {
            if ($(this).is(":checked")) {
                var prod = new Product($(this).attr('data-value'));

                submission.productsArray.push(new Product($(this).attr('data-value')))
            }
        });
        console.log(submission)
    });

    this.readyForAIMDB = function() {

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