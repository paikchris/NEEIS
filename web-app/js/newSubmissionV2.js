/**
 * Created by paikchris on 8/23/16.
 */

var versionMode = false
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
var ratePremiumsLock = false;


//DATA OBJECTS
var riskTypeObject = {}
var riskTypes, riskCategories, products, productConditions, operations, coverages, questions, questionCategories,
    ratingBasisArray, rates, conditionBasisArray
var riskTypeString
var submission = new Submission()

//VERSION VARIABLES
var quoteRecord, versionRecords, dvVersionRecords, dvVersionView, submissionRecord
var versionQuestionAnswerMap, versionQuestionAnswerOrganizedMap
var versionLetter = 'A'
var originalVersion = 'A'
var originalQuoteID = ""

//TYPEAHEAD DATA
var typeahead_operations

//TESTING MODE V2
var testingMode = true;

//STEP WIZARD VARIABLES
var navListItems
var allWells
var allNextBtn
var allPrevBtn

var currentCivAuthChecked = ""

$(document).ready(function () {
    newSubmissionInit()

    //TYPEAHEAD INIT
    typeAheadDatasetsInit()
    typeAheadInit()

    if(versionMode==true){
        versionModeInit()
    }


});

//INIT FUNCTIONS
function newSubmissionInit() {
    riskTypes = rT
    riskCategories = rC
    products = pr
    productConditions = pC
    operations = oT
    coverages = cT
    questions = qL
    questionCategories = qC
    ratingBasisArray = rB
    rates = rL
    conditionBasisArray = cB

    versionMode = vM


    mandatoryQuestionsForProductInit()

    checkForSavedSubmissions();
    setSubmissionToAutoSaveOnQuit(true);
    initializeSubmissionSaveAndLoadButtons();

    //INPUT VALIDATION STUFF (utils/formValidation.js)
    initializeListenerForNoBlankRequiredFields();

    //DATE FUNCTIONS SETUP (newSubmissionUtils/dateHelper.js)
    initializeDateInputAndFunctions();
    initializeBORFunctions();
    intializeFileAttachButtons();

    clickChangeListenerInit()
    stepWizardInit()

}
function clickChangeListenerInit(){

    $(document.body).on('click', '#CIVAUTH100_addOptionCheckbox, #CIVAUTH500_addOptionCheckbox', function() {
        if($(this).attr('id') === 'CIVAUTH100_addOptionCheckbox'){
            if($(this).is(':checked')){
                if(currentCivAuthChecked === "CIV100"){
                    $(this).prop('checked', false)
                    currentCivAuthChecked = ""
                }
                else{
                    currentCivAuthChecked = "CIV100"
                }
            }
            else{
                currentCivAuthChecked = "CIV100"
            }
        }
        else if($(this).attr('id') === 'CIVAUTH500_addOptionCheckbox'){
            if($(this).is(':checked')){
                if(currentCivAuthChecked === "CIV500"){
                    $(this).prop('checked', false)
                    currentCivAuthChecked = ""
                }
                else{
                    currentCivAuthChecked = "CIV500"
                }
            }
            else{
                currentCivAuthChecked = "CIV500"
            }
        }

    });

    ///////////////////STEP 1 INSURED INFO///////////////////

    ///////////////////STEP 2 SELECT OPERATION AND COVERAGES///////////////////

    //WHEN OPERATION TYPE CHANGES, UPDATE COVERAGES AVAILABLE
    $(document).on('change', '#operationsDropdown', function () {
        operationDropdownChange(this);
    });

    //LISTEN TO COVERAGE CHECKBOXES CHANGING
    $(document).on('change', '.coverageCheckbox', function () {
        coverageCheckboxChangeAction(this);
    })

    $(document).on('change', '.packageCoverageCheckbox', function () {
        packageCoverageCheckboxChangeAction(this);
    })

    $(document).on('change', '.additionalOption', function () {
        if(isReadyToShowLimitAndDeducts()){
            fillLimitDeductContainer()
            showLimitDeductContainer()

            //PREMIUM ONLY DISPLAYS IF LIMITS AND DEDUCTS SHOW CORRECTLY
            if(isReadyToRatePremiums()){
                calculatePremiumsAndFillContainer()
                showPremiumRateContainer()
            }
            else{

            }
        }
    });


    //LISTEN TO REQUIRED QUESTIONS CHANGES
    $(document).on('change', 'div.requiredQuestion input', function () {
        //THIS CHANGED INPUT MAY HAVE CHANGED PRODUCTS, UPDATE AND RECHECK ALL QUESTIONS
        updateRequiredQuestions()
        updateAdditionalOptions()

        if(isReadyToShowLimitAndDeducts()){
            fillLimitDeductContainer()
            showLimitDeductContainer()

            //PREMIUM ONLY DISPLAYS IF LIMITS AND DEDUCTS SHOW CORRECTLY
            if(isReadyToRatePremiums()){
                calculatePremiumsAndFillContainer()
                showPremiumRateContainer()
            }
        }
    });

    //LIMIT RATING BASIS LIMIT INPUTS
    $(document).on('change', 'div#limitsDeductiblesContainer input.limitValue', function () {
        //IF LIMIT INPUT CHANGES, RERATE PRODUCTS
        if(isReadyToRatePremiums()){
            calculatePremiumsAndFillContainer()
            showPremiumRateContainer()
        }
    });




    //WHEN THE STATE CHANGES IN STEP 3, UPDATE PREMIUMS FOR TAX
    $(document).on('change', '#stateMailing', function () {
        stateChangeAction(this);
    });




    //GOTO STEP 2 AFTER CLICKING ON RISKTYPE
    $(document).on('change', '.riskTypeDropdown', function () {
        return riskTypeClickAction(this)
    });

    //SETUP ENTER KEY TO DISMISS ALERTMESSAGEMODAL
    $(document).keyup(function (e) {
        keyPressChecker(e)
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


    $(document.body).on('click', '#submitSubmissionButton', function () {
        submitSubmission()
    });

}
function mandatoryQuestionsForProductInit(){
    //LISTENER TO CHECK WHEN ALL MANDATORY QUESTIONS FOR PRODUCT DISPLAY ARE COMPLETE
    $(document).on('change', '.mandatoryForProduct', function () {
        if( isMandatoryQuestionsComplete_Product() ){
            //SHOW PRODUCT DISPLAYS
            buildProductDisplayForRiskID();
        }
        else{
            //DON'T SHOW PRODUCTS
        }
    });
}
function stepWizardInit(){
    navListItems = $('div.setup-panel div a')
    allWells = $('.setup-content')
    allNextBtn = $('.nextBtn')
    allPrevBtn = $('.prevBtn');

    allWells.hide();

    //CIRCLE WIZARD BUTTONS CLICK HANDLER
    navListItems.click(function (e) {
        e.preventDefault();
        circleNavButtonClickAction(this)
    });

    //NEXT BUTTONS CLICK HANDLER
    allNextBtn.click(function (e) {
        nextButtonClickAction(this)
    });

    //PREV BUTTONS CLICK HANDLER
    allPrevBtn.click(function () {
        prevButtonClickAction(this)
    });

    //NEEDED TO SET THE PAGE TO STEP 1 AFTER WIZARD SETUP FOR SOME REASON
    validateAndNavigateToStep(1)
}
function versionModeInit(){
    //VERSION MODE INIT STUFF
    if(versionMode === true){
        quoteRecord = qR
        versionRecords = vR
        dvVersionRecords = dVR
        dvVersionView = dVV
        submissionRecord = sR

        versionQuestionAnswerMap = vAM
        versionQuestionAnswerOrganizedMap = vAOM
        versionLetter = vL
        originalVersion = oV
        originalQuoteID = oQID

        versionModeUserInputMap = JSON.parse(submissionRecord.userInputMap)

        versionModeFillStep1()
    }

    // versionModeFillOutQuestions();
}
function typeAheadDatasetsInit(){
    //OPERATIONS
    typeahead_operations = []
    for(var i=0;i<operations.length;i++){
        typeahead_operations.push(operations[i].description)
    }
}

///////////////////VERSION MODE FUNCTIONS///////////////////
function versionModeFillStep1(){
    //STEP 1 ANSWERS
    $('#namedInsured').val(quoteRecord.NamedInsured)
    $('#streetAddressMailing').val(quoteRecord.Address1 + " " + quoteRecord.Address2)
    $('#cityMailing').val(quoteRecord.City)
    $('#zipCodeMailing').val(quoteRecord.Zip)
    $('#stateMailing').val(quoteRecord.State)

    $('#namedInsuredContact').val(versionModeUserInputMap.namedInsuredContact)
    $('#namedInsuredEmail').val(versionModeUserInputMap.namedInsuredEmail)
    $('#namedInsuredPhone').val(versionModeUserInputMap.namedInsuredPhone)



    $('#namedInsured').attr('placeholder', '')
    $('#streetAddressMailing').attr('placeholder', '')
    $('#cityMailing').attr('placeholder', '')
    $('#zipCodeMailing').attr('placeholder', '')
    $('#stateMailing').attr('placeholder', '')

    $('#namedInsuredContact').attr('placeholder', '')
    $('#namedInsuredEmail').attr('placeholder', '')
    $('#namedInsuredPhone').attr('placeholder', '')


    $('#namedInsured').attr('disabled', 'disabled')


}
function versionModeFillStep2(){

    //SELECT OPERATION
    $('#operationsDropdown').val(versionModeUserInputMap.operationsDropdown)
    $('#operationsDropdown').trigger('change')


    /*
    1. FILL QUESTIONS THAT ARE INITIALLY ON PAGE
    2. CHECK THE COVERAGES
    3. FILL NEW QUESTIONS FOR COVERAGES
    4. CHECK ADDITIONAL OPTION CHECKBOXES
     */

    //FILL REQUIRED QUESTIONS ON PAGE
    var alreadyFilledQuestionIDs = []
    $('#step-2 div.requiredQuestion').find('input,select').each(function(){

        var elementID = $(this).attr('id')
        var inputElement = $('#' + elementID)

        if(versionModeUserInputMap[elementID]){
            var inputValue = versionModeUserInputMap[elementID]

            if($(inputElement).is(':checkbox') || $(inputElement).is(':radio')){
                if(inputValue === true){
                    $(inputElement).trigger('click')
                }
                else if(inputValue === false){
                    $(inputElement).attr('checked', false)

                }
            }
            else{
                $(inputElement).val(inputValue)
                $(inputElement).attr('placeholder', '')
                $(inputElement).trigger('change')
            }

            alreadyFilledQuestionIDs.push(elementID)
        }
    })

    //CHECK COVERAGE CHECKBOXES
    var userInputMapKeys = Object.keys(versionModeUserInputMap)
    for(var i=0;i<userInputMapKeys.length;i++) {
        var inputID = userInputMapKeys[i]
        var inputElement = $('#' + inputID)
        var inputValue = versionModeUserInputMap[inputID]

        if(inputID.indexOf('_CoverageCheckbox')){
            if($(inputElement).is(':checkbox') || $(inputElement).is(':radio')){
                if(inputValue === true){
                    $(inputElement).trigger('click')
                }
                else if(inputValue === false){
                    $(inputElement).attr('checked', false)

                }
            }
            else{
                $(inputElement).val(inputValue)
                $(inputElement).attr('placeholder', '')
            }
        }
    }

    coverageCheckboxChangeAction()

    //FILL NEW QUESTIONS FOR COVERAGES
    $('#step-2 div.requiredQuestion').find('input,select').each(function(){
        var elementID = $(this).attr('id')
        var inputElement = $('#' + elementID)

        if(versionModeUserInputMap[elementID] && alreadyFilledQuestionIDs.indexOf(elementID) > -1 ){
            var inputValue = versionModeUserInputMap[elementID]

            if($(inputElement).is(':checkbox') || $(inputElement).is(':radio')){
                if(inputValue === true){
                    $(inputElement).trigger('click')
                }
                else if(inputValue === false){
                    $(inputElement).attr('checked', false)

                }
            }
            else{
                $(inputElement).val(inputValue)
                $(inputElement).attr('placeholder', '')
                $(inputElement).trigger('change')
            }

            alreadyFilledQuestionIDs.push(elementID)
        }
    })


    //CHECK ADDITIONAL OPTIONS
    $('#coveragesAvailableContainer input.additionalOption').each(function(){
        var elementID = $(this).attr('id')
        var inputElement = $('#' + elementID)

        if(versionModeUserInputMap[elementID]){
            var inputValue = versionModeUserInputMap[elementID]

            if($(inputElement).is(':checkbox') || $(inputElement).is(':radio')){
                if(inputValue === true){
                    $(inputElement).trigger('click')
                }
                else if(inputValue === false){
                    $(inputElement).attr('checked', false)

                }
            }
            else{
                $(inputElement).val(inputValue)
                $(inputElement).attr('placeholder', '')
                $(inputElement).trigger('change')
            }
        }
    })


}
function versionModeFillStep3(){

    //FILL REQUIRED QUESTIONS
    $('#step-3').find('input,select').each(function(){
        var elementID = $(this).attr('id')
        var inputElement = $('#' + elementID)

        if(versionModeUserInputMap[elementID]){
            var inputValue = versionModeUserInputMap[elementID]

            if($(inputElement).is(':checkbox') || $(inputElement).is(':radio')){
                if(inputValue === true){
                    $(inputElement).trigger('click')
                }
                else if(inputValue === false){
                    $(inputElement).attr('checked', false)

                }
            }
            else{
                $(inputElement).val(inputValue)
                $(inputElement).attr('placeholder', '')
                $(inputElement).trigger('change')
            }
        }
    })
}

function buildUserInputMap(){
    var userInputMap = {}

    $('input,select').each(function(){
        var inputID = $(this).attr('id')
        var inputValue = ""
        if($(this).is(':checkbox') || $(this).is(':radio') ){
            inputValue = $(this).is(":checked")
        }
        else{
            inputValue = $(this).val()
        }

        userInputMap[inputID] = inputValue
    })

    return userInputMap


}



///////////////////NAVIGATION FUNCTIONS -> ALL WILL POINT TO validateAndNavigateToStep METHOD///////////////////
function nextButtonClickAction(button){
    var gotoStepNum = parseInt( $(button).attr('data-step') ) + 1

    validateAndNavigateToStep(gotoStepNum)
}
function prevButtonClickAction(button){
    var curStep = $(button).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");


    $(".form-group").removeClass("has-error");
    prevStepWizard.removeAttr('disabled').trigger('click');
}
function circleNavButtonClickAction(button){
    var stepClicked = parseInt( $(button).html() )

    //IF CIRCLE BUTTON IS NOT DISABLED
    if (!$(button).hasClass('disabled') && !$($(button))[0].hasAttribute("disabled")) {
        validateAndNavigateToStep(stepClicked)
    }
}
function validateAndNavigateToStep(stepNum){

    //BASIC INPUT VALIDATION
    if(validate()){
        //FURTHER VALIDATION BASED ON STEP NUMBER
        if(stepNum === 1){
            showStep(stepNum)
        }
        else if(stepNum === 2){
            showStep(stepNum)
            if(versionMode === true){
                versionModeFillStep2()
            }
        }
        else if(stepNum === 3){
            if( isReadyToRatePremiums() ){
                buildUWQuestionSection()
                showStep(stepNum)
                if(versionMode === true){
                    versionModeFillStep3()
                }

            }
            else{
                $('#alertMessageContent').html("Please complete required fields.");
                $('#alertMessageModal').modal('show');
            }



        }
        else if(stepNum === 4){
            buildReview()
            showStep(stepNum)
        }
    }
    else{
        $('#alertMessageContent').html("Please complete required fields.");
        $('#alertMessageModal').modal('show');
        $('html, body').animate({
            scrollTop: ($(".has-error").first().offset().top) - 300
        }, "fast");
    }


}
function scrollToTopOfPage(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
function showStep(stepNumToShow){
    var $target = $('#step-' + stepNumToShow)
    var $item = $('#buttonCircleStep' + stepNumToShow);

    navListItems.removeClass('btn-primary').addClass('btn-default');
    $item.addClass('btn-primary');
    $item.removeAttr('disabled')
    allWells.hide();
    $target.show();
    $target.find('input:eq(0)').focus();
    scrollToTopOfPage
}
function furtherValidationStep3(){
    //1. OPERATION TYPE MUST BE CHOSEN
    //2. AT LEAST ONE COVERAGE MUST BE SELECTED
    //3. ALL PRODUCT CONDITION REQUIRED QUESTIONS MUST BE FILLED
    //4. ALL RATING BASIS REQUIRED QUESTIONS MUST BE FILLED
    //5. EACH COVERAGE MUST HAVE A PREMIUM

    // var valid = true
    //
    // if( getSelectedOperationID() === 'invalid'){
    //     valid = false
    //     markClosestFormGroup_Error($('#operationsDropdown'))
    // }

}
function isReadyToSubmit(){

}
function submitSubmission(){
    $('#progressBarHeader').html("Please wait, your submission is being processed.")
    $('.progress-bar').attr('aria-valuenow', "75").animate({
        width: "75%"
    }, 25000);

    $('#progressBarModal').modal('show')
    $.ajax({
        method: "POST",
        url: "/main/submitSubmission",
        data: {
            submissionMap: JSON.stringify(submission.getObject())
        }
    })
        .done(function (msg) {
            //alert(msg);
            //0620584,0620585
            var indicationPDFError = false;

            //IF RESPONSE HAS "INDICATION ERROR" THERE WAS AN ISSUE GENERATING THE INDICATION PDF
            if (msg.split("&;&")[1] === "Indication Error") {
                alert("Submission was successful however, the Indication PDF is currently not available. Please contact your underwriter for further details. ");
                // $('#alertMessageModal').modal('show');
                indicationPDFError = true;
            }

            //IF RESPONSE DOESN'T START WITH ERROR, IT WAS SUBMITTED SUCCESSFULLY TO AIM
            if (!msg.startsWith("Error")) {
                newSubmissionConfirmParam = msg;

                //ATTACH FILES
                var formData = new FormData();
                var formDataNew = getFormDataWithAllAttachedFilesNew();
                var quoteIDs = msg.split("&;&")[0];
                var submissionHasFile = false;

                //LOOP THROUGH ATTACH BUTTONS TO GATHER FILES IN FORM DATA
                if (Object.keys(attachedFileMap).length != 0) {
                    submissionHasFile = true;
                    formData.append("attachedFileMap", JSON.stringify(attachedFileMap))
                }

                //IF ATTACHED FILES EXIST, CALL ATTACH CONTROLLER
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

                    //ADD NOTIFICATION SUBMITTED FOR USER
                    // var notificationCode = "SUBMISSIONSUBMIT"
                    // addNewNotification(notificationCode)

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

///////////////////SUBMISSION OBJECT FUNCTIONS///////////////////
function getSubmissionObject(){
    return submission.getObject()
}

///////////////////DATA ACCESS FUNCTIONS///////////////////
function getRateObjectByID(rateID){
    for(var i=0; i<rates.length; i++){
        if(rates[i].rateID === rateID){
            return rates[i]
        }
    }
}
function getRatingBasisObjectByID(ratingBasisID){
    for(var i=0; i<ratingBasisArray.length; i++){
        if(ratingBasisID === ratingBasisArray[i].basisID){
            return ratingBasisArray[i]
        }
    }
}

///////////////////STEP 1 -INSURED INFO FUNCTIONS///////////////////


///////////////////STEP 2 -OPERATION, COVERAGE, PRODUCTS FUNCTIONS///////////////////

//OPERATION TYPE
function operationDropdownChange(input){
    var selectedOperation = getSelectedOperationID()

    if(selectedOperation === 'invalid'){
        clearCoveragesAvailableSection()
        hideCoveragesAvailableSection()
        clearRequiredQuestions()
    }
    else{
        buildCoveragesAvailableSection()
        showCoveragesAvailableSection()
        updateRequiredQuestions()
    }
}
function getCurrentOperationTypeObject(){
    for(var i=0; i < operations.length; i++ ){
        if(operations[i].operationID === submission.operationID()){
            return operations[i]
        }
    }
}
function getSelectedOperationID(){
    return $('#operationsDropdown').val()
}

//COVERAGE FUNCTIONS
function hideCoveragesAvailableSection(){
    $('#coveragesAvailableContainer').css('display', 'none')
}
function showCoveragesAvailableSection(){
    $('#coveragesAvailableContainer').css('display', '')
}
function clearCoveragesAvailableSection(){
    $('#coverageOptionsContainer').html('')
}
function buildCoveragesAvailableSection(){
    var operationsObject = getCurrentOperationTypeObject()

    if(operationsObject.coverageProductMap){
        var coverageProductMap = jsonStringToObject(operationsObject.coverageProductMap)
        var coveragePackageMap
        if(operationsObject.coveragePackageMap){
            coveragePackageMap = jsonStringToObject(operationsObject.coveragePackageMap)
        }
        else{
            coveragePackageMap = {}
        }

        var coverageProductMapKeys = Object.keys(coverageProductMap)
        var finalHTML = ""

        //BUILD PACKAGE CHECKBOXES FIRST
        finalHTML = finalHTML + getPackageCheckboxesForCoveragesSectionHTML()

        //BUILD OTHER COVERAGE CHECKBOXES
        if(coverageProductMapKeys.length > 0){
            var nonPackageCoverageCount = 0

            for(var i=0; i<coverageProductMapKeys.length; i++){
                var covID = coverageProductMapKeys[i]
                var coverageObject = getCoverageObject(covID)


                if(coverageObject.packageFlag === 'Y' && coveragePackageMap[covID]){

                    // var coveragesInPackageArray = jsonStringToObject(coveragePackageMap[covID])
                    //
                    // //ALLOW CHECKBOX FOR PACKAGE IF NO COVERAGES ARE IN THE PACKAGE
                    // if(coveragesInPackageArray.length === 0 ){
                    //     finalHTML = finalHTML + getCoverageOptionContainerRowHTML(covID)
                    // }
                }
                else{
                    nonPackageCoverageCount++
                    finalHTML = finalHTML + getCoverageOptionContainerRowHTML(covID)
                }

            }

            //GIVE COVERAGE SECTION HEADER IF THERE ARE COVERAGES
            if(nonPackageCoverageCount > 0){
                finalHTML = "<label>Coverages</label>" + finalHTML
            }

            $('#coverageOptionsContainer').html(finalHTML)
        }
        else{
            clearCoveragesAvailableSection()
            $('#coverageOptionsContainer').html("No Coverages Available")
        }

    }
    else{
        clearCoveragesAvailableSection()
        $('#coverageOptionsContainer').html("No Coverages Available")
    }
}
function getPackageCheckboxesForCoveragesSectionHTML(){
    var operationsObject = getCurrentOperationTypeObject()
    var htmlString = ""

    if(operationsObject.coveragePackageMap){
        var coveragePackageMap = JSON.parse(operationsObject.coveragePackageMap)

        var packageIDs = Object.keys(coveragePackageMap)

        htmlString = htmlString +
            "<label>Packages</label>"

        for(var i=0;i<packageIDs.length;i++){
            var covID = packageIDs[i]
            var packagesCoveragesArray = coveragePackageMap[covID]

            htmlString = htmlString + getPackageOptionContainerRowHTML(covID, packagesCoveragesArray)

        }
    }

    return htmlString

}
function getPackageOptionContainerRowHTML(covID, packageCoveragesArray){
    var covObj = getCoverageObject(covID)
    var operationObject = getCurrentOperationTypeObject()

    var checkboxLabelText = covObj.coverageName

    //CHECK IF OPTION IS MONOLINE
    if(operationObject.monolineCoverages !== null){
        var monolineCoverages = JSON.parse(operationObject.monolineCoverages)

        if(monolineCoverages.indexOf(covID) > -1){
            checkboxLabelText = checkboxLabelText + " (Mono Line)"
        }
    }

    var coverageRowHTML =
        "<div class='row coverageContainer packageContainer checkboxAndHiddenDivContainer' id='" + covID + "_CoverageOptionContainer' data-covid='" + covID + "'> " +
        "<div class='col-xs-12 form-group checkboxContainer'> " +
        "<label class='checkboxVerticalLayout'><input type='checkbox' class='coverageCheckbox packageCheckbox checkboxHiddenDiv' id='" + covID + "_CoverageCheckbox' data-covid='" + covID + "'/> " +
        checkboxLabelText + " " +
        "</label> " +
        "</div> " +
        "<div class='coverageQuestionsContainer hiddenContainer' style='display:none'> "

    coverageRowHTML = coverageRowHTML +
        "</div> " +
        "</div>"

    return coverageRowHTML
}
function getCoverageOptionContainerRowHTML(covID){
    var covObj = getCoverageObject(covID)
    var operationObject = getCurrentOperationTypeObject()

    var checkboxLabelText = covObj.coverageName

    //CHECK IF OPTION IS MONOLINE
    if(operationObject.monolineCoverages !== null){
        var monolineCoverages = JSON.parse(operationObject.monolineCoverages)

        if(monolineCoverages.indexOf(covID) > -1){
            checkboxLabelText = checkboxLabelText + " (Mono Line)"
        }
    }

    var coverageRowHTML =
        "<div class='row coverageContainer checkboxAndHiddenDivContainer' id='" + covID + "_CoverageOptionContainer' data-covid='" + covID + "'> " +
        "<div class='col-xs-12 form-group checkboxContainer'> " +
        "<label class='checkboxVerticalLayout'><input type='checkbox' class='coverageCheckbox checkboxHiddenDiv' id='" + covID + "_CoverageCheckbox' data-covid='" + covID + "'/> " +
        checkboxLabelText + " " +
        "</label> " +
        "</div> " +
        "<div class='coverageQuestionsContainer hiddenContainer' style='display:none'> " +
        "</div> " +
        "</div>"

    return coverageRowHTML
}
function coverageCheckboxChangeAction(checkbox){
    updateRequiredQuestions()

    updateAdditionalOptions()

    //IF THIS COVERAGE IS ALREADY CHECKED IN A PACKAGE OR ELSEWHERE, UNCHECK TO AVOID DUPLICATES
    removeDuplicateCoveragesAndPackageLOBS(checkbox)

    if(isReadyToShowLimitAndDeducts()){
        fillLimitDeductContainer()
        showLimitDeductContainer()

        //PREMIUM ONLY DISPLAYS IF LIMITS AND DEDUCTS SHOW CORRECTLY
        if(isReadyToRatePremiums()){
            calculatePremiumsAndFillContainer()
            showPremiumRateContainer()
        }
        else{

        }
    }
}
function packageCoverageCheckboxChangeAction(checkbox){
    //MUST REWRITE THIS FUNCTIONS LATER FOR PACKAGE LOBS SPECIFICALLY
    // // clearRequiredQuestions()
    // updateRequiredQuestions()
    //
    // updateAdditionalOptions()
    updateRequiredQuestions()
    //IF THIS COVERAGE IS ALREADY CHECKED IN A PACKAGE OR ELSEWHERE, UNCHECK TO AVOID DUPLICATES
    removeDuplicateCoveragesAndPackageLOBS(checkbox)

    // updateRequiredQuestions()

    if(isReadyToShowLimitAndDeducts()){
        fillLimitDeductContainer()
        showLimitDeductContainer()

        //PREMIUM ONLY DISPLAYS IF LIMITS AND DEDUCTS SHOW CORRECTLY
        if(isReadyToRatePremiums()){
            calculatePremiumsAndFillContainer()
            showPremiumRateContainer()
        }
        else{

        }
    }
}
function removeDuplicateCoveragesAndPackageLOBS(checkbox){
    var covID = $(checkbox).attr('data-covid')

    if($(checkbox).is(':checked') ){
        //IF THE CHECKBOX CHECKED WAS A PACKAGE CHECKBOX OR A COVERAGE CHECKBOX
        if($(checkbox).hasClass('packageCheckbox')){
            var packageContainer = $(checkbox).closest('.packageContainer')

            //LOOP THROUGH THE PACKAGE COVERAGE CHECKBOXES AND CHECK IF ANY CHECKED ARE THE SAME AS THE COVERAGE CHECKED
            $(packageContainer).find('.packageCoverageCheckbox:checked').each(function(){
                var thisPackageCoverageID = $(this).attr('data-covid')

                //FIND THE COVERAGE CHECKBOX AND SEE IF IT IS CHECKED
                $('#' + thisPackageCoverageID + '_CoverageCheckbox:checked').prop('checked', false)
            })

        }
        //IF THE CHECKBOX CHECKED IS A PACKAGE LOB CHECKBOX
        else if($(checkbox).hasClass('packageCoverageCheckbox')){
            var thisPackageCoverageID = $(checkbox).attr('data-covid')

            //FIND THE COVERAGE CHECKBOX AND SEE IF IT IS CHECKED
            $('#' + thisPackageCoverageID + '_CoverageCheckbox:checked').prop('checked', false)
        }
        else{
            if($('.' + covID + '_packageCoverageCheckbox').length > 0){
                //LOOP THROUGH PACKAGE OPTION CHECKBOXES WITH SAME COVERAGE
                $('.' + covID + '_packageCoverageCheckbox').each(function(){
                    var thisPackageCoverageCheckbox = $('.' + covID + '_packageCoverageCheckbox')
                    var thisPackageCheckbox = $(thisPackageCoverageCheckbox).closest('.coverageContainer').find('input.coverageCheckbox')


                    //IF PACKAGE LOB IS SELECTED, DESELECT :CANT HAVE MULTIPLE
                    if($(thisPackageCoverageCheckbox).is(':checked')){
                        var requiredFlag =  $(thisPackageCoverageCheckbox).attr('data-requiredflag')
                        if(requiredFlag === 'Y'){
                            //UNCHECK THE PACKAGE ENTIRELY
                            $(thisPackageCheckbox).prop('checked', false)
                            $(thisPackageCheckbox).trigger('change')
                        }
                        else{
                            $(thisPackageCoverageCheckbox).prop('checked', false)
                            $(thisPackageCoverageCheckbox).trigger('change')
                        }
                    }
                    else{

                    }

                })
            }
        }

    }
}
function getCoveragesSelectedArrayBACKUP(){
    //THIS IS THE ORIGINAL GET COVERAGES SELECTED FUNCTION, WHERE THERE WERE NO SEPERATE PACKAGE CHECKBOXES
    var covArray = []
    var operationObject = getCurrentOperationTypeObject()
    $('#coverageOptionsContainer .coverageCheckbox:checked').each(function () {
        covArray.push($(this).data('covid'))
    })

    //CHECK FOR PACKAGES, IF PACKAGE MAP IS NULL CREATE EMPTY ARRAY FOR NOW TO AVOID ERROR
    if(operationObject.coveragePackageMap === null){
        operationObject.coveragePackageMap = []
    }
    var coveragePackageMap = jsonStringToObject(operationObject.coveragePackageMap)
    var packagesArray = Object.keys(coveragePackageMap)

    //LOOP THROUGH AVAILABLE PACKAGES FOR OPERATION
    for(var i=0;i<packagesArray.length;i++){
        var packageID = packagesArray[i]
        var coveragesInPackageArray = jsonStringToObject(coveragePackageMap[packageID])

        //LOOP THROUGH COVERAGES IN THIS PACKAGE AND CHECK IF THEY WERE SELECTED
        var numCovSelectedInPackage = 0
        var coveragesToRemove = []
        for(var c=0;c<coveragesInPackageArray.length;c++){
            var covID = coveragesInPackageArray[c].covID

            if( covArray.indexOf(covID) > -1 ){
                numCovSelectedInPackage++
                coveragesToRemove.push(covID)
            }
        }

        //IF 2 OR MORE OF THE PACKAGE COVERAGES ARE SELECTED
        if(numCovSelectedInPackage >= 2){
            //REMOVE PACKAGE COVERAGES FROM ARRAY
            var adjustedCovArray = []
            var found
            for (var i = 0; i < covArray.length; i++) {
                found = false;
                // find covArray[i] in coveragesToRemove
                for (var j = 0; j < coveragesToRemove.length; j++) {
                    if (covArray[i] == coveragesToRemove[j]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    adjustedCovArray.push(covArray[i]);
                }
            }
            covArray = adjustedCovArray
            covArray.push(packageID)
        }
    }

    return covArray
}
function getCoveragesSelectedArray(){
    var covArray = []
    var operationObject = getCurrentOperationTypeObject()

    $('#coverageOptionsContainer .coverageCheckbox:checked').each(function () {
        covArray.push($(this).data('covid'))
    })

    return covArray
}
function getCoveragesAndPackagesSelectedArray(){
    //GET COVERAGES CHECKED
    var allCoveragesPackagesArray = []
    $('#coverageOptionsContainer .coverageCheckbox:checked').each(function(){
        allCoveragesPackagesArray.push($(this).data('covid'))
    })

    //GET PACKAGES SELECTED
    var coveragesAndPackagesArray = getCoveragesSelectedArray()
    for(var i=0;i<coveragesAndPackagesArray.length;i++){
        var covID = coveragesAndPackagesArray[i]
        if(allCoveragesPackagesArray.indexOf(covID) === -1){
            allCoveragesPackagesArray.push(covID)
        }
    }

    return allCoveragesPackagesArray
}
function getLOBSSelectedInPackageArray(packageID){
    var lobsSelectedInPackageArray = []
    var packageContainer = $('#' + packageID + '_CoverageOptionContainer')

    $(packageContainer).find('input.packageCoverageCheckbox:checked').each(function(){
        var thisPackageLOBID = $(this).attr('data-covid')
        lobsSelectedInPackageArray.push(thisPackageLOBID)

    })

    return lobsSelectedInPackageArray

}
function getCoverageObject(covID){
    for(var i=0; i < coverages.length; i++ ){
        if(coverages[i].coverageCode === covID){
            return coverages[i]
        }
    }
}

//ADDITIONAL OPTIONS
function updateAdditionalOptions(){
    var operationsObject = getCurrentOperationTypeObject()

    //REMEMBER ADDITIONAL OPTIONS CHECKED
    var selectedAdditionalOptionIDs = []
    $('#step-2 input.additionalOption:checked').each(function(){
        var elementID = $(this).attr('id')
        selectedAdditionalOptionIDs.push(elementID)
    })

    //REMEMBER PACKAGE OPTIONS CHECKED
    var selectedPackageLOBS = {}
    $('#step-2 input.packageCheckbox:checked').each(function(){
        var packageContainer = $(this).closest('.packageContainer')
        var packageID = $(this).attr('data-covid')

        //LOOP THROUGH THIS PACKAGES CHECKED LOBS
        var tempCheckedLOBArray = []
        $(packageContainer).find('input.packageCoverageCheckbox:checked').each(function(){
            var packageLOBID = $(this).attr('data-covid')

            tempCheckedLOBArray.push(packageLOBID)
        })

        selectedPackageLOBS[packageID] = tempCheckedLOBArray

    })


    clearAllAdditionalOptions()
    var coveragesSelected = getCoveragesAndPackagesSelectedArray()

    for(var i=0; i<coveragesSelected.length; i++){
        var covID = coveragesSelected[i]
        var coverageRowHTML = ""
        var addOnPackageHTML = ""
        var additionalOptionsHTML = ""

        //PACKAGE COVERAGES CHECKBOXES
        if(operationsObject.coveragePackageMap){

            var coveragePackageMap = JSON.parse(operationsObject.coveragePackageMap)
            if(coveragePackageMap[covID]){
                var packageCoveragesArray = coveragePackageMap[covID]

                for(var j=0;j<packageCoveragesArray.length;j++){
                    var packageCoverageMap = packageCoveragesArray[j]
                    var packageCoverageID = packageCoverageMap.covID
                    var packageCoverageObject = getCoverageObject(packageCoverageID)

                    if(packageCoverageMap !== null && packageCoverageMap !== undefined){
                        //IF THIS LOB IS A ADD ON
                        if(packageCoverageMap.addOnFlag === "Y"){
                            addOnPackageHTML = addOnPackageHTML + "" +
                                "<div class='row'>" +
                                "   <div class='col-xs-12'>" +
                                "       <label class='checkboxVerticalLayout' style='margin-left:36px; font-size:11px'>" +
                                "           <input type='checkbox' class='packageCoverageCheckbox packageAddOnCheckbox " + packageCoverageID + "_packageCoverageCheckbox' " +
                                "               data-covid='" + packageCoverageID + "' " +
                                "               data-requiredflag='" + packageCoverageMap.requiredFlag + "' "

                            if(packageCoverageMap.requiredFlag === 'Y'){
                                coverageRowHTML = coverageRowHTML + " checked='true' disabled='disabled'"
                            }
                            addOnPackageHTML = addOnPackageHTML +
                                "           > " + packageCoverageObject.coverageName +
                                "        </label>" +
                                "   </div>" +
                                "</div>"
                        }
                        //IF THIS LOB IS REGULAR
                        else{
                            coverageRowHTML = coverageRowHTML + "" +
                                "<div class='row'>" +
                                "   <div class='col-xs-12'>" +
                                "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
                                "           <input type='checkbox' class='packageCoverageCheckbox packageAddOnCheckbox " + packageCoverageID + "_packageCoverageCheckbox' " +
                                "               data-covid='" + packageCoverageID + "' " +
                                "               data-requiredflag='" + packageCoverageMap.requiredFlag + "' "

                            if(packageCoverageMap.requiredFlag === 'Y'){
                                coverageRowHTML = coverageRowHTML + " checked='true' disabled='disabled'"
                            }
                            coverageRowHTML = coverageRowHTML +
                                "           > " + packageCoverageObject.coverageName +
                                "        </label>" +
                                "   </div>" +
                                "</div>"
                        }
                    }
                }

                //FORMAT LOB ADD ON SECTION
                if(addOnPackageHTML.trim().length > 0){
                    addOnPackageHTML = "" +
                        "<div class='row' style='margin-top:10px;'>" +
                        "   <div class='col-xs-12'>" +
                        "       <span style='margin-left: 22px; font-size: 11px; font-weight: 500;'>Add On Coverages</span>" +
                        "   </div>" +
                        "</div>" +
                        addOnPackageHTML
                }



            }
        }

        //ADDITIONAL OPTION CHECKBOXES
        if(getProductIDForCoverage(covID) !== null && getProductIDForCoverage(covID) !== undefined){
            var productID = getProductIDForCoverage(covID)
            var productObject = getProductObjectFromProductID(productID)

            if(productObject){
                if(productObject.additionalOptionsArray !== null && productObject.additionalOptionsArray !== undefined  ){
                    var additionalOptionsArray = JSON.parse(productObject.additionalOptionsArray)

                    for(var j=0;j<additionalOptionsArray.length;j++){
                        var additionalOptionID = additionalOptionsArray[j]
                        $('#' + covID + '_CoverageOptionContainer').find('.hiddenContainer').html()
                        if(additionalOptionID === "BAI"){
                            additionalOptionsHTML = additionalOptionsHTML + BAIOptionHTML()
                        }
                        if(additionalOptionID === "WOS"){
                            additionalOptionsHTML = additionalOptionsHTML + WOSOptionHTML()
                        }
                        if(additionalOptionID === "EAI"){
                            additionalOptionsHTML = additionalOptionsHTML + EAIOptionHTML()
                        }
                        if(additionalOptionID === "MED"){
                            additionalOptionsHTML = additionalOptionsHTML + MEDOptionHTML()
                        }
                        if(additionalOptionID === "INCAGG"){
                            additionalOptionsHTML = additionalOptionsHTML + INCAGGOptionHTML()
                        }
                        if(additionalOptionID === "CIVAUTH"){
                            additionalOptionsHTML = additionalOptionsHTML + CIVAUTHOptionHTML()
                        }
                        if(additionalOptionID === "ANIMAL"){
                            additionalOptionsHTML = additionalOptionsHTML + ANIMALOptionHTML()
                        }
                    }
                }
            }
        }

        $('#' + covID + '_CoverageOptionContainer').find('.hiddenContainer').html(additionalOptionsHTML + coverageRowHTML + addOnPackageHTML)

    }


    //RESELECT PREVIOUS CHECKED ADDITIONAL OPTIONS
    for(var i=0; i<selectedAdditionalOptionIDs.length; i++){
        $('#' + selectedAdditionalOptionIDs[i]).prop('checked', true)
    }

    //RESELECT PREVIOUS CHECKED PACKAGE LOBS
    var selectedPackageIDs = Object.keys(selectedPackageLOBS)
    for(var i=0; i<selectedPackageIDs.length; i++){
        var packageID = selectedPackageIDs[i]
        var packageContainer = $('#' + packageID + '_CoverageOptionContainer')

        //MAKE SURE PACKAGE CHECKBOX IS CHECKED
        $('#' + packageID + '_CoverageCheckbox').prop('checked', true)

        //LOOP THROUGH SAVED LOB ARRAY AND CHECK THE LOBS IN THIS PACKAGE
        var tempLOBIDArray = jsonStringToObject(selectedPackageLOBS[packageID])
        for(var j=0;j<tempLOBIDArray.length;j++){
            var lobID = tempLOBIDArray[j]

            $(packageContainer).find('.' + lobID + '_packageCoverageCheckbox').prop('checked', true)
        }
    }
}
function clearAllAdditionalOptions(){
    $('.coverageContainer .hiddenContainer').html("")
}
function BAIOptionHTML(){
    var htmlString = "" +
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='BAI_addOptionCheckbox' data-addoptionid='BAI'> Blanket Additional Insured " +
        "       </label>" +
        "   </div>" +
        "</div>"


    return htmlString
}
function WOSOptionHTML(){
    var htmlString = "" +
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='WOS_addOptionCheckbox' data-addoptionid='WOS'> Waiver of Subrogation " +
        "       </label>" +
        "   </div>" +
        "</div>"

    return htmlString
}
function EAIOptionHTML(){
    var htmlString = "" +
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='EAI_addOptionCheckbox' data-addoptionid='EAI'> Each Additional Insured " +
        "       </label>" +
        "   </div>" +
        "</div>"
    return htmlString
}
function MEDOptionHTML(){
    var htmlString = "" +
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='MED_addOptionCheckbox' data-addoptionid='MED'> Medical Payments " +
        "       </label>" +
        "   </div>" +
        "</div>"

    return htmlString
}
function INCAGGOptionHTML(){
    var htmlString = "" +
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='INCAGG_addOptionCheckbox' data-addoptionid='INCAGG'> Increased Aggregate Limit to 2 Million " +
        "       </label>" +
        "   </div>" +
        "</div>"

    return htmlString
}
function CIVAUTHOptionHTML(){
    var htmlString = "" +
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='radio' class='additionalOption' id='CIVAUTH100_addOptionCheckbox' " +
        "               name='CIVAUTH_addOptionCheckbox' " +
        "               data-addoptionid='CIVAUTH100'" +
        "               previousvalue='false'> Civil Authority (US Only) - $100K Limit " +
        "       </label>" +
        "   </div>" +
        "</div>" +
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='radio' class='additionalOption' id='CIVAUTH500_addOptionCheckbox' " +
        "               name='CIVAUTH_addOptionCheckbox' " +
        "               data-addoptionid='CIVAUTH500'" +
        "               previousvalue='false'> Civil Authority (US Only) - $500K Limit " +
        "       </label>" +
        "   </div>" +
        "</div>"

    return htmlString
}
function ANIMALOptionHTML(){
    var htmlString = "" +
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px; margin-top:4px;'> Animal Mortality" +
        "       </label>" +
        "   </div>" +
        "</div>"+
        "<div class='row'>" +
        "   <div class='col-xs-12' style='margin-top:-6px'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='ANIMAL_BIRDFISH_addOptionCheckbox' data-addoptionid='ANIMAL'> Domestic Birds Or Fish " +
        "       </label>" +
        "   </div>" +
        "</div>"+
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='ANIMAL_DOGS_addOptionCheckbox' data-addoptionid='ANIMAL'> Dogs (with certain breed exceptions) " +
        "       </label>" +
        "   </div>" +
        "</div>"+
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='ANIMAL_REPTILE_addOptionCheckbox' data-addoptionid='ANIMAL'> Reptiles (Non-Venomous) " +
        "       </label>" +
        "   </div>" +
        "</div>"+
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='ANIMAL_SMALL_addOptionCheckbox' data-addoptionid='ANIMAL'> Small Domestic Animals (Other) " +
        "       </label>" +
        "   </div>" +
        "</div>"+
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='ANIMAL_FARM_addOptionCheckbox' data-addoptionid='ANIMAL'> Farm Animals " +
        "       </label>" +
        "   </div>" +
        "</div>"+
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='ANIMAL_CATS_addOptionCheckbox' data-addoptionid='ANIMAL'> Wild Cats (Caged) " +
        "       </label>" +
        "   </div>" +
        "</div>"+
        "<div class='row'>" +
        "   <div class='col-xs-12'>" +
        "       <label class='checkboxVerticalLayout' style='margin-left:20px; font-size:11px'>" +
        "           <input type='checkbox' class='additionalOption' id='ANIMAL_OTHER_addOptionCheckbox' data-addoptionid='ANIMAL'> Other - Refer Only " +
        "       </label>" +
        "   </div>" +
        "</div>"



    return htmlString
}
function getSelectedProductAdditionalOptionMap(){
    var selectedProductAdditionalOptionMap = {}
    var productsSelectedArray = getProductsSelectedArray()

    for(var i=0;i<productsSelectedArray.length; i++){
        var productID = productsSelectedArray[i]
        var productObject = getProductObjectFromProductID(productID)
        var covID = productObject.coverage

        var selectedOptionsForProduct = []

        $('#' + covID + '_CoverageOptionContainer').find('.additionalOption:checked').each(function(){
            var additionalOptionID = $(this).data('addoptionid')
            selectedOptionsForProduct.push(additionalOptionID)
        })

        selectedProductAdditionalOptionMap[productID] = selectedOptionsForProduct
    }

    return selectedProductAdditionalOptionMap
}
function additionalOptionChange(){
    if($('#BAI_addOptionCheckbox').is(':checked')){
    }
    else{
    }

    if($('#WOS_addOptionCheckbox').is(':checked')){

    }
    else{

    }

    if($('#EAI_addOptionCheckbox').is(':checked')){

    }
    else{

    }

    if($('#MED_addOptionCheckbox').is(':checked')){

    }
    else{

    }

    if($('#INCAGG_addOptionCheckbox').is(':checked')){

    }
    else{

    }

    if($('#CIVAUTH_addOptionCheckbox').is(':checked')){

    }
    else{

    }

}

//PRODUCT CONDITION AND RATING BASIS REQUIRED QUESTIONS SECTION
function clearRequiredQuestions(){
    $('#ratingBasisRequiredQuestionsContainer').empty()
}
function updateRatingRequiredQuestion(){
    var covSelectedArray = getCoveragesSelectedArray()
    for(var i=0;i<covSelectedArray.length; i++){
        var covID = covSelectedArray[i]
        var productID = getProductIDForCoverage(covID)

        if( getProductIDForCoverage(covID) ){

            //GET RATING BASIS REQUIRED QUESTIONS
            if(getProductObjectFromProductID(productID) !== undefined){
                var productObject = getProductObjectFromProductID(productID)

                if(productObject.rateCode !== undefined && productObject.rateCode !== null){
                    var rateID = productObject.rateCode
                    var rateObject = getRateObjectByID(rateID)
                    var ratingBasisID = rateObject.rateBasis
                    var ratingBasisObject = getRatingBasisObjectByID(ratingBasisID)
                    var ratingBasisQuestionID = ratingBasisObject.basisQuestionID

                    //IF RATING BASIS QUESTION ID EXISTS
                    if(ratingBasisQuestionID !== undefined && ratingBasisQuestionID !== null && ratingBasisQuestionID.trim().length !== 0){
                        //CHECK TO MAKE SURE NOT TO INSERT A DUPLICATE QUESTION
                        if($('#' + ratingBasisQuestionID).length === 0){
                            var questionHTML = ""
                            // questionHTML = "<div class='row'>"
                            questionHTML = questionHTML + getNewSubmissionRequiredQuestion(questionID)
                            // questionHTML = questionHTML + "</div>"
                            $('#ratingBasisRequiredQuestionsContainer').append(questionHTML)
                        }
                    }
                }

            }
        }
    }

}
function updateRequiredQuestions(){
    var operationsObject = getCurrentOperationTypeObject()

    //SAVE ANSWERS TO REFILL LATER FOR SAME QUESTIONS
    var questionAnswers = {}
    $('.requiredQuestion input').each(function(){
        var elementID = $(this).attr('id')
        var value = $(this).val()

        if($(this).attr('type') === 'radio' || $(this).attr('type') === 'checkbox' ){
            value = $(this).is(':checked')
            questionAnswers[elementID] = value
        }
        else{
            questionAnswers[elementID] = value
        }
    })

    //REMOVE ALL QUESTIONS
    clearRequiredQuestions()

    //GET COVERAGES CHECKED
    var allCoveragesPackagesArray = getCoveragesAndPackagesSelectedArray()

    //GET PRODUCT CONDITION QUESTIONS FOR COVERAGES CHECKED
    if(getCurrentOperationTypeObject().requiredQuestionsMap){
        var operationObject = getCurrentOperationTypeObject()
        var operationProductConditionRequirdQuestionsMap = jsonStringToObject(operationObject.requiredQuestionsMap)

        //CHECK FOR ANY MISSING QUESTIONS FOR PRODUCT CONDITION, PRODUCT REQUIRED QUESTIONS AND RATING REQUIRED QUESTIONS
        var coverageProductMap = jsonStringToObject(operationObject.coverageProductMap)
        var additionalRequiredQuestionsMap = jsonStringToObject(getRequiredQuestionsForProductLogicConditions(coverageProductMap))
        var productRequiredQuestionsArray = []


        //COMBINE ALL REQUIRED QUESTIONS
        var requiredQuestionsForCoveragesCheckedArray = []
        for(var i=0;i<allCoveragesPackagesArray.length; i++){
            var thisCovID = allCoveragesPackagesArray[i]
            var thisCovRequiredQuestionsArray = jsonStringToObject( operationProductConditionRequirdQuestionsMap[thisCovID].requiredQuestions )
            var additionalRequiredQuestionsArray = additionalRequiredQuestionsMap[thisCovID]

            thisCovRequiredQuestionsArray = thisCovRequiredQuestionsArray.concat(additionalRequiredQuestionsArray)

            //LOOP THROUGH THIS COVERAGES REQUIRED QUESTIONS
            for(var j=0; j<thisCovRequiredQuestionsArray.length; j++){
                //IF THIS QUESTION DOESN'T ALREADY EXIST, ADD IT
                if(requiredQuestionsForCoveragesCheckedArray.indexOf(thisCovRequiredQuestionsArray[j])){
                    requiredQuestionsForCoveragesCheckedArray.push(thisCovRequiredQuestionsArray[j])
                }
            }
        }




        //FILTER QUESTIONS FOR DUPLICATES
        var requiredQuestionsForCoveragesCheckedArray_Filtered = []

        for(var i=0; i<requiredQuestionsForCoveragesCheckedArray.length;i++){
            if(requiredQuestionsForCoveragesCheckedArray_Filtered.indexOf(requiredQuestionsForCoveragesCheckedArray[i]) === -1 ){
                if($('#' + requiredQuestionsForCoveragesCheckedArray[i]).length === 0){
                    requiredQuestionsForCoveragesCheckedArray_Filtered.push(requiredQuestionsForCoveragesCheckedArray[i])
                }

            }
        }

        //SORT QUESTIONS BY WEIGHT
        var requiredQuestionsForCoveragesCheckedArray_Sorted = []
        requiredQuestionsForCoveragesCheckedArray_Sorted = requiredQuestionsForCoveragesCheckedArray_Filtered.sort(sortByWeightAscending)


        //BUILD HTML FOR REQUIRED QUESTIONS
        var finalHTML = ""
        // finalHTML = finalHTML + "<div class='row'>"
        for(var i=0;i<requiredQuestionsForCoveragesCheckedArray_Sorted.length;i++){
            finalHTML = finalHTML + getNewSubmissionRequiredQuestion(requiredQuestionsForCoveragesCheckedArray_Sorted[i])
        }
        // finalHTML = finalHTML + "</div>"

        //INSERT INTO REQUIRED QUESTIONS CONTAINER
        $('#ratingBasisRequiredQuestionsContainer').html(finalHTML)

        //CHECK HEIGHTS OF QUESTION CONTAINERS, IF HEIGHT IS DIFFERENT WILL MESS UP ALIGNMENT. APPLY LARGEST DIV HEIGHT IN ROW TO ALL CONTAINERS
        var gridSizeCount = 0
        var rowHeight = 0
        var elementsInRow = []
        $('#ratingBasisRequiredQuestionsContainer div.requiredQuestion').each(function(){
            var thisGridSize = $(this).attr('data-gridsize')
            var thisHeight = $(this).height()


            // console.log(thisGridSize)
            console.log(parseInt(gridSizeCount) + parseInt(thisGridSize))

            if( (parseInt(gridSizeCount) + parseInt(thisGridSize) ) <= 12 ){
                if(thisHeight > rowHeight){
                    rowHeight = thisHeight
                }

                elementsInRow.push( $(this) )

                gridSizeCount = parseInt(gridSizeCount) + parseInt(thisGridSize)
            }
            else{
                console.log(elementsInRow)
                //LOOP THROUGH THE ROWS IN THE ROW
                for(var i=0;i<elementsInRow.length;i++){
                    var questionElement = elementsInRow[i]
                    console.log(rowHeight)
                    $(questionElement).height(rowHeight)
                }

                gridSizeCount = thisGridSize
                rowHeight = thisHeight
            }
        })

        //REINSERT PREVIOUSLY FILLED OUT
        var questionAnswersKeys = Object.keys(questionAnswers)
        for(var i=0;i<questionAnswersKeys.length; i++){
            var elementID = questionAnswersKeys[i]
            var inputElement = $('#' + elementID)

            if( $(inputElement).attr('type') === 'radio' || $(inputElement).attr('type') === 'checkbox'  ){
                if(questionAnswers[elementID]){
                    $(inputElement).prop('checked', true)
                }
                else{
                    $(inputElement).prop('checked', false)
                }
            }
            else{
                $(inputElement).val(questionAnswers[elementID])
            }

        }
        initializeGlobalListeners()

        //LOOP THROUGH COVERAGES CHOSEN, IF PRODUCT IS DETERMINED, ADD ANY PRODUCT SPECIFIC REQUIRED QUESTIONS
        updateWithProductRequiredQuestions()

        //REINSERT PREVIOUSLY FILLED OUT AGAIN FOR ADDITIONAL QUESTIONS ADDED
        var questionAnswersKeys = Object.keys(questionAnswers)
        for(var i=0;i<questionAnswersKeys.length; i++){
            var elementID = questionAnswersKeys[i]
            var element = $('#' + elementID)

            if( $(element).attr('type') === 'radio' || $(element).attr('type') === 'checkbox' ){
                $(element).prop('checked', questionAnswers[elementID])
            }
            else{
                $(element).val(questionAnswers[elementID])
            }
        }
        initializeGlobalListeners()

        //UPDATE RATING REQUIRED QUESTIONS
        updateRatingRequiredQuestion()
        updatePackageRequiredRatingQuestions()

        //REINSERT PREVIOUSLY FILLED OUT AGAIN FOR ADDITIONAL QUESTIONS ADDED
        var questionAnswersKeys = Object.keys(questionAnswers)
        for(var i=0;i<questionAnswersKeys.length; i++){
            var elementID = questionAnswersKeys[i]
            var element = $('#' + elementID)

            if( $(element).attr('type') === 'radio' || $(element).attr('type') === 'checkbox' ){
                $(element).prop('checked', questionAnswers[elementID])
            }
            else{
                $(element).val(questionAnswers[elementID])
            }
        }
        initializeGlobalListeners()
    }

}
function updatePackageRequiredRatingQuestions(){
    var covSelectedArray = getCoveragesSelectedArray()
    var coveragePackageMap = JSON.parse(getCurrentOperationTypeObject().coveragePackageMap)

    for(var i=0;i<covSelectedArray.length; i++){
        var covID = covSelectedArray[i]

        //IF COVERAGE IS A PACKAGE, GET CHECKED PACKAGE LOBS AND LOOP THROUGH
        if(coveragePackageMap[covID]){
            var packageMapForThisPackage = coveragePackageMap[covID]
            var selectedLOBArrayForPackage = getLOBSSelectedInPackageArray(covID)

            if(selectedLOBArrayForPackage.length > 0){
                for(var j=0;j<packageMapForThisPackage.length;j++){
                    if(selectedLOBArrayForPackage.indexOf(packageMapForThisPackage[j].covID) > -1 ){
                        var lobID = packageMapForThisPackage[j].covID
                        // var rateID = packageMapForThisPackage[j].rateID
                        var rateID = getRateIDForPackageLOB(covID, lobID)

                        if(rateID !== undefined && rateID !== null){
                            var rateObject = getRateObjectByID(rateID)
                            var rateBasisID = rateObject.rateBasis
                            var ratingBasisObject = getRatingBasisObjectByID(rateBasisID)

                            var ratingBasisQuestionID = ratingBasisObject.basisQuestionID

                            //IF RATING BASIS QUESTION ID EXISTS
                            if(ratingBasisQuestionID !== undefined && ratingBasisQuestionID !== null && ratingBasisQuestionID.trim().length !== 0){
                                //CHECK TO MAKE SURE NOT TO INSERT A DUPLICATE QUESTION
                                if($('#' + ratingBasisQuestionID).length === 0){
                                    var questionHTML = ""
                                    // questionHTML = "<div class='row'>"
                                    questionHTML = questionHTML + getNewSubmissionRequiredQuestion(ratingBasisQuestionID)
                                    // questionHTML = questionHTML + "</div>"
                                    $('#ratingBasisRequiredQuestionsContainer').append(questionHTML)
                                }
                            }
                        }
                    }
                }
            }


        }
    }
}
function updateWithProductRequiredQuestions(){
    var covSelectedArray = getCoveragesSelectedArray()
    for(var i=0;i<covSelectedArray.length; i++){
        var covID = covSelectedArray[i]
        var productID = getProductIDForCoverage(covID)

        if( getProductIDForCoverage(covID) ){

            //GET PRODUCT REQUIRED QUESTIONS AND RATING BASIS REQUIRED QUESTIONS
            if(getProductObjectFromProductID(productID).requiredQuestions){
                var productObject = getProductObjectFromProductID(productID)
                var productRequiredQuestionsArray = jsonStringToObject( productObject.requiredQuestions )
                // var rateID = productObject.rateCode
                // var rateObject = getRateObjectByID(rateID)
                // var ratingBasisID = rateObject.rateBasis
                // var ratingBasisObject = getRatingBasisObjectByID(ratingBasisID)
                // var ratingBasisQuestionID = ratingBasisObject.basisQuestionID
                //
                // //ADD RATING BASIS QUESTION ID TO REQUIRED QUESTIONS ARRAY
                // productRequiredQuestionsArray.push(ratingBasisQuestionID)

                //LOOP THROUGH PRODUCTS REQUIRED QUESTIONS ARRAY
                for(var j=0; j<productRequiredQuestionsArray.length; j++){
                    var questionID = productRequiredQuestionsArray[j]

                    //CHECK TO MAKE SURE NOT TO INSERT A DUPLICATE QUESTION
                    if($('#' + questionID).length === 0){
                        var questionHTML = ""
                        // questionHTML = "<div class='row'>"
                        questionHTML = questionHTML + getNewSubmissionRequiredQuestion(questionID)
                        // questionHTML = questionHTML + "</div>"
                        $('#ratingBasisRequiredQuestionsContainer').append(questionHTML)
                    }
                }
            }
        }
    }

}
function sortByWeightDescending(a, b){
    return (getQuestionObjectByID(b).weight) > (getQuestionObjectByID(a).weight) ? 1 : -1;
}
function sortByWeightAscending(a, b){
    if(getQuestionObjectByID(a) && getQuestionObjectByID(b)){
        return (getQuestionObjectByID(b).weight) < (getQuestionObjectByID(a).weight) ? 1 : -1;
    }
    else{
        return 1
    }

}
function isReadyToShowLimitAndDeducts(){
    //PAGE IS READY TO SHOW LIMITS AND DEDUCTS WHEN:
    //1. PRODUCT CONDITION QUESTIONS ARE FILLED
    //2. PRODUCT SPECIFIC REQUIRED QUESTIONS ARE FILLED
    //3. ALL CHECKED/SELECTED COVERAGES HAVE DETERMINED PRODUCTS
    //4. AT LEAST ONE COVERAGE HAS BEEN SELECTED
    //HIDES LIMIT AND PREMIUM CONTAINERS IF FALSE

    if( isAllProductsDeterminedForCoveragesChosen() && isAllRequiredQuestionsComplete()
        && $('.coverageCheckbox:checked').length > 0 ){
        return true
    }
    else{
        //HIDE LIMIT AND PREMIUM SECTION
        hideLimitDeductContainer()
        hidePremiumRateContainer()
        return false
    }
}
function isReadyToRatePremiums(){
    //PAGE IS READY TO RATE AND DISPLAY PREMIUMS WHEN:
    //1. LIMITS ARE DISPLAYED OR READY TO BE DISPLAYED
    //2. IF A RATING BASIS IS "LIMIT", ALL LIMIT INPUTS ARE FILLED
    //HIDE PREMIUM CONTAINER IF FALSE


    //CHECK IF PRODUCT REQUIRED QUESTIONS EXIST
    var productsSelectedArray = getProductsSelectedArray()
    for(var i=0; i<productsSelectedArray.length; i++){
        var productID = productsSelectedArray[i]
        var productObject = getProductObjectFromProductID(productID)

        if(productObject.requiredQuestions !== null && productObject.requiredQuestions !== undefined){
            var productRequiredQuestionsArray = jsonStringToObject(productObject.requiredQuestions)

            //LOOP THROUGH PRODUCT REQUIRED QUESTIONS
            for(var j=0; j<productRequiredQuestionsArray.length; j++){
                var questionID = productRequiredQuestionsArray[j]

                //CHECK IF QUESTIONS EXIST
                if( $('#step-2 #' + questionID).length === 0 ){
                    return false
                }

                //CHECK IF QUESTION IS FILLED ?
            }

            //CHECK IF ALL RATING REQUIRED QUESTIONS EXIST
            if(productObject.rateCode !== undefined && productObject.rateCode !== null){
                var rateID = productObject.rateCode
                var rateObject = getRateObjectByID(rateID)
                var ratingBasisID = rateObject.rateBasis
                var ratingBasisObject = getRatingBasisObjectByID(ratingBasisID)
                var ratingBasisQuestionID = ratingBasisObject.basisQuestionID

                //IF RATING BASIS QUESTION ID EXISTS
                if(ratingBasisQuestionID !== undefined && ratingBasisQuestionID !== null && ratingBasisQuestionID.trim().length !== 0){
                    if( $('#step-2 #' + ratingBasisQuestionID).length === 0 ){
                        return false
                    }
                }

            }
        }

    }

    //CHECK IF LIMITS AND DEDUCTIBLES ARE READY TO DISPLAY
    if( isReadyToShowLimitAndDeducts() ){

        //IF LIMITS AND DEDUCTIBLES ARE READY, CHECK IF ANY COVERAGE/PRODUCT HAS A LIMIT RATING BASIS
        if(isRatingBasisLimitForAnyCoverages()){

            //IF A COVERAGE/PRODUCT HAS A LIMIT RATING BASIS, CHECK IF ALL LIMIT INPUTS ARE FILLED
            if(isAllLimitInputFieldsFilled()){

                //THERE IS A LIMIT RATING BASIS, AND ALL LIMIT INPUTS ARE FILLED
                return true
            }
            else{

                //THERE IS A LIMIT RATING BASIS, BUT NOT ALL LIMIT INPUTS ARE FILLED
                return false
            }
        }
        else{

            //LIMITS AND DEDUCTIBLES ARE READY TO DISPLAY, AND NO COV/PRODUCT HAS A LIMIT RATING BASIS
            return true
        }
    }
    else{
        hidePremiumRateContainer()
        return false
    }
}
function isAllRequiredQuestionsComplete(){
    var isComplete = true
    $('div.requiredQuestion input').each(function(){
        if($(this).attr('type') === 'radio' || $(this).attr('type') === 'checkbox'){
            var groupName = $(this).attr('name')
            var value = $("div.requiredQuestion input[name='" + groupName + "']:checked").val()
            if(value === undefined || value === null || value.trim().length === 0){
                isComplete = false
            }
        }
        else{
            if( $(this).val().trim().length === 0 || $(this).val().trim() === 'invalid'){
                isComplete = false
            }
        }

    })

    return isComplete
}
function isAllProductConditionQuestionsComplete(){
    var isComplete = true

    //GET COVERAGES CHECKED
    var coveragesCheckedIdsArray = []
    $('.coverageCheckbox:checked').each(function(){
        coveragesCheckedIdsArray.push($(this).data('covid'))
    })

    //GET PRODUCT CONDITION QUESTIONS FOR COVERAGES CHECKED
    var operationProductConditionRequirdQuestionsMap = jsonStringToObject(getCurrentOperationTypeObject().requiredQuestionsMap)
    var requiredQuestionsForCoveragesCheckedArray = []
    for(var i=0;i<coveragesCheckedIdsArray.length; i++){
        var thisCovID = coveragesCheckedIdsArray[i]
        var thisCovRequiredQuestionsArray = jsonStringToObject( operationProductConditionRequirdQuestionsMap[thisCovID].requiredQuestions )

        console.log(thisCovRequiredQuestionsArray)
        //LOOP THROUGH THIS COVERAGES REQUIRED PRODUCT CONDITION QUESTIONS
        for(var j=0; j<thisCovRequiredQuestionsArray.length; j++){
            var questionID = thisCovRequiredQuestionsArray[i]
            var questionElement = $('#' + questionID)

            //IF A REQUIRED QUESTIONS IS NOT FILLED THEN RETURN FALSE
            if( $(questionElement).val().trim().length === 0 && $(questionElement).val().trim() !== 'invalid'){
                isComplete = false
            }
        }
    }

    console.log(isComplete)

    return isComplete
}
function isAllProductsDeterminedForCoveragesChosen(){
    var covSelectedArray = getCoveragesSelectedArray()

    for(var i=0;i<covSelectedArray.length; i++){
        var covID = covSelectedArray[i]
        if( getProductIDForCoverage(covID) === undefined || getProductIDForCoverage(covID) === null || getProductIDForCoverage(covID).trim().length === 0){
            return false
        }
    }

    return true;
}
function checkIfReadyToShowLimitsAndPremiumsAndShow(){
    if(isReadyToShowLimitAndDeducts()){
        fillLimitDeductContainer()
        showLimitDeductContainer()

        //PREMIUM ONLY DISPLAYS IF LIMITS AND DEDUCTS SHOW CORRECTLY
        if(isReadyToRatePremiums()){
            calculatePremiumsAndFillContainer()
            showPremiumRateContainer()
        }
        else{

        }
    }
}
function buildRequiredQuestionAndAnswerMap(){
    var requiredQuestionAnswerMap = {}

    $('div.requiredQuestion').each(function(){
        var questionType = $(this).attr('data-inputtype')
        var questionID = $(this).attr('data-questionid')

        if(questionType === 'text'){
            requiredQuestionAnswerMap[questionID] = $(this).find('input#' + questionID).val()
        }
        else if(questionType === 'radio'){
            var groupName = questionType + "_RadioGroup"
            requiredQuestionAnswerMap[questionID] = $(this).find("input[name='" + groupName + "']:checked").val()
        }
        else if(questionType === 'checkbox'){
            var groupName = questionType + "_CheckboxGroup"

            $("input[name='" + groupName + "']:checked").each(function(){
                requiredQuestionAnswerMap[questionID] = $(this).val()
            })
        }
        else if(questionType === 'dropdown'){
            requiredQuestionAnswerMap[questionID] = $(this).find('#' + questionID).val()
        }
    })

    return requiredQuestionAnswerMap
}
function isRatingRequiredQuestionsExist(){

}

//LIMITS DEDUCTIBLES FUNCTIONS
function showLimitDeductContainer(){
 $('#limitsDeductiblesContainer').css('display', '')
}
function hideLimitDeductContainer(){
    $('#limitsDeductiblesContainer').css('display', 'none')
}
function clearLimitDeductContainer(){
    $('#limitsDeductiblesContainer').empty()
}
function fillLimitDeductContainer(){
    buildLimitDeductibleContainersForEachCoverage()
}
function buildLimitDeductibleContainersForEachCoverage(){
    var temporaryContainer = $("<div></div>")
    var covArray = submission.coverages()

    //BUILD CONTAINERS
    for(var i=0;i<covArray.length; i++){
        $(temporaryContainer).append(getLimDeductCovContainerHTML(covArray[i]))
    }

    //BUILD COV HEADER LABEL ROWS
    for(var i=0;i<covArray.length; i++){
        var thisCovContainer = $(temporaryContainer).find('#' + covArray[i] + '_CoverageLimDeductContainer')
        $(thisCovContainer).append(getLimDeductCoverageLabelRow(covArray[i]))
    }

    //BUILD LIMIT DEDUCT ROWS
    for(var i=0;i<covArray.length; i++){
        var thisCovContainer = $(temporaryContainer).find('#' + covArray[i] + '_CoverageLimDeductContainer')
        var productID = getProductIDForCoverage(covArray[i])
        $(thisCovContainer).append(buildLimDedRows(productID))
    }


    $('#limitsDeductiblesContainer').html( $(temporaryContainer).html() )
    initializeGlobalListeners()
}
function getLimDeductCovContainerHTML(covID){
    var covContainer =
        "<div class='coverageLimDeductContainer' " +
        "   id='" + covID + "_CoverageLimDeductContainer' " +
        "   data-covid='" + covID + "' " +
        "   data-productid='" + getProductIDForCoverage(covID) + "' " +
        ">" +
        "</div>"

    return covContainer
}
function getLimDeductCoverageLabelRow(covID){
    var coverageMap = getCoverageObject(covID)
    var covLabelRowHTML =
        "<div class='row coverageLabelRow' " +
        "   id='" + covID + "_LimDeductLabelRow' " +
        "   data-covid='" + covID + "' " +
        "   data-productid='" + getProductIDForCoverage(covID) + "' " +
        ">" +
        "   <div class=col-xs-12>" +
        "       <label class='covNameLabel'>" +
        "           " + coverageMap.coverageName + "" +
        (testingMode ? (" - " + getProductIDForCoverage(covID) + "") : ("") ) +
        "       </label>" +
        "   </div>" +
        "   <div class=col-xs-6>" +
        "       <label class='limitsLabel'>" +
        "           Limits" +
        "       </label>" +
        "   </div>" +
        "   <div class=col-xs-6>" +
        "       <label class='deductsLabel'>" +
        "           Deductibles" +
        "       </label>" +
        "   </div>" +
        "</div>"

    return covLabelRowHTML
}
function buildLimDedRows(productID){
    var productMap = getProductObjectFromProductID(productID)
    var covID = productMap.coverage
    var limitArray = []
    var deductArray = []

    //LIMITS AND DEDUCTS CURRENTLY STORED IN TWO FORMATS, CHECK FOR FORMAT
    if(productMap.limitArray !== undefined && productMap.limitArray !== null && productMap.limitArray.trim().length > 2){
        limitArray = jsonStringToObject( productMap.limitArray )
    }
    else if(productMap.limits){
        limitArray = splitByLine(productMap.limits)
    }
    else{

    }
    if(productMap.deductArray !== undefined && productMap.deductArray !== null && productMap.deductArray.trim().length > 2){
        deductArray = jsonStringToObject( productMap.deductArray )
    }
    else if(productMap.deduct){
        deductArray = splitByLine(productMap.deduct)
    }
    else{

    }


    //CHECK IF THIS PRODUCT IS PACKAGE. IF PACKAGE CHECK FOR ADDITIONAL LIMITS FOR PACKAGE LOBS
    var selectedLOBSForCoverage = getLOBSSelectedInPackageArray(covID)
    if(selectedLOBSForCoverage.length > 0){
        var operationObject = getCurrentOperationTypeObject()
        var coveragePackageMap = jsonStringToObject(operationObject.coveragePackageMap)
        var lobMapArray = coveragePackageMap[covID]

        //LOOP THROUGH LOBS AND FIND THE SELECTED INFO MAPS
        for(var i=0;i<selectedLOBSForCoverage.length;i++){
            var lobID = selectedLOBSForCoverage[i]

            //GET THE LOB MAP
            var lobMap = {}
            for(var j=0;j<lobMapArray.length;j++){
                if(lobMapArray[j].covID === lobID){
                    lobMap = lobMapArray[j]
                    var thisLOBLimitArray = jsonStringToObject(lobMap.limitArray)
                    limitArray = limitArray.concat(thisLOBLimitArray)

                    var thisLOBDeductArray = jsonStringToObject(lobMap.deductArray)
                    deductArray = deductArray.concat(thisLOBDeductArray)
                }
            }
        }
    }



    checkAdditionalOptionsForLimitChanges(productID, limitArray)



    var limDeductColumns =
        "<div class='row limDeductColumnsContainer' " +
        "   id='" + productMap.coverage + "_LimDeductColumnsContainer' " +
        "   data-covid='" + productMap.coverage + "' " +
        "   data-productid='" + productID + "' " +
        ">" +
        "   <div class='col-xs-6 limitColumn'>" +
                getLimitRowsHTML(limitArray, productID, productMap.coverage) +
        "   </div>" +
        "   <div class='col-xs-6 deductColumn'>" +
                getDeductRowsHTML(deductArray, productID, productMap.coverage) +
        "   </div>" +
        "</div>"

    return limDeductColumns
}
function checkAdditionalOptionsForLimitChanges(productID, limitArray){
    var additionalOptionArray = getSelectedProductAdditionalOptionMap()[productID]


    for(var i=0; i<additionalOptionArray.length; i++){
        var additionalOptionID = additionalOptionArray[i]
        if(additionalOptionID === 'MED'){
            var MEDLimitMap = {}
            MEDLimitMap.limitAmount = "$5,000"
            MEDLimitMap.limitDescription = "Medical Payments (Per Person)"
            limitArray.push(MEDLimitMap)
        }
        if(additionalOptionID === 'BAI'){
            var BAILimitMap = {}
            BAILimitMap.limitAmount = "Incl"
            BAILimitMap.limitDescription = "Blanket Additional Insured"
            limitArray.push(BAILimitMap)
        }
        if(additionalOptionID === 'WOS'){
            var WOSLimitMap = {}
            WOSLimitMap.limitAmount = "Incl"
            WOSLimitMap.limitDescription = "Waiver of Subrogation"
            limitArray.push(WOSLimitMap)
        }
        if(additionalOptionID === 'EAI'){
            var EAILimitMap = {}
            EAILimitMap.limitAmount = "$5,000"
            EAILimitMap.limitDescription = "Additional Charge to Include Medical Payments"
            limitArray.push(EAILimitMap)
        }
        if(additionalOptionID === 'INCAGG'){
            for(var j=0;j<limitArray.length;j++){
                var thisLimitMap = limitArray[j]
                if(thisLimitMap.limitDescription === 'General Aggregate Limit'){
                    thisLimitMap.limitAmount = '$2,000,000'
                }
            }
        }
        if(additionalOptionID === 'CIVAUTH100'){

            var EAILimitMap = {}
            EAILimitMap.limitAmount = "$100,000"
            EAILimitMap.limitDescription = "Civil Authority (US Only)"
            limitArray.push(EAILimitMap)
        }
        if(additionalOptionID === 'CIVAUTH500'){
            var EAILimitMap = {}
            EAILimitMap.limitAmount = "$500,000"
            EAILimitMap.limitDescription = "Civil Authority (US Only)"
            limitArray.push(EAILimitMap)
        }


    }
}

function getLimitRowsHTML(limitArray, productID, covID){
    var limitRowsHTML = ""
    for(var i=0; i<limitArray.length; i++){
        var limitValue
        var limitDescription

        //LIMITS AND DEDUCTS CURRENTLY STORED IN TWO FORMATS, CHECK FOR FORMAT
        if(jsonStringToObject( limitArray[i] ).limitDescription !== null || jsonStringToObject( limitArray[i] ).limitDescription !== undefined){
            limitValue = jsonStringToObject( limitArray[i] ).limitAmount
            limitDescription = jsonStringToObject( limitArray[i] ).limitDescription
        }
        else{
            limitValue = limitArray[i].split('\t')[0]
            limitDescription = limitArray[i].split('\t')[1]
        }

        //REMOVE COV: STRING FROM LIMIT DESCRIPTION
        limitDescription = removeCoverageIdentifierFromLimDeduct(limitDescription, covID)

        //GET THE CLASS STRING USED IN HTML FOR PRODUCTID
        var productIDClassString = replaceEachSpaceWith(productID.trim(), "_")

        //IF THE RATE BASIS FOR THIS PRODUCT IS LIMIT RATING THEN HTML NEEDS INPUT FIELDS
        var rateCode_product = getProductObjectFromProductID(productID).rateCode
        var rateBasis_product = getRateObjectByID(rateCode_product).rateBasis

        //CHECK IF COVERAGE IS A PACKAGE, IF PACKAGE THEN NEED TO CHECK THE LOB RATES FOR A LIMIT RATING
        var coverageObject = getCoverageObject(covID)
        var rateBasis_LOBHasLimitRate = false
        if(coverageObject.packageFlag === 'Y'){
            var selectedLOBArray = getLOBSSelectedInPackageArray(covID)

            for(var j=0;j<selectedLOBArray.length;j++){
                var lobID = selectedLOBArray[j]
                var lobInfoMap = getLOBObjectFromPackageMap(covID, lobID)
                var rateID_LOB = getRateIDForPackageLOB(covID, lobID)
                var rateBasis_LOB = getRateObjectByID(rateID_LOB).rateBasis
                if(rateBasis_LOB === 'LIMIT'){
                    rateBasis_LOBHasLimitRate = true
                }
            }
        }


        //IF A LIMIT RATING BASIS EXISTS, GET LIST OF LIMITS THAT NEED TO BE INPUTS
        var limitDescriptionsThatNeedInputs = []
        if(rateBasis_product === 'LIMIT' || rateBasis_LOBHasLimitRate) {
            //GET A LIST OF LIMIT DESCRIPTIONS NEEDING TO BE INPUTS


            //FIRST CHECK THE PRODUCT RATE OBJECT FOR LIMITS THAT NEED TO BE INPUTS, ADD INPUT LIMITS TO ARRAY
            if (rateBasis_product === 'LIMIT') {
                var rateObject = getRateObjectByID(rateCode_product)
                var rate_limitArray = jsonStringToObject(rateObject.limitRateArray)
                for (var c = 0; c < rate_limitArray.length; c++) {
                    var thisLimMap = rate_limitArray[c]
                    var thisLimDesc = thisLimMap.limitDescription
                    limitDescriptionsThatNeedInputs.push(thisLimDesc.trim())
                }
            }

            //SECOND CHECK THE LOB RATE OBJECTS FOR LIMITS THAT NEED TO BE INPUTS, ADD INPUT LIMITS TO ARRAY
            if (rateBasis_LOBHasLimitRate) {
                var selectedLOBArray = getLOBSSelectedInPackageArray(covID)

                for (var j=0; j < selectedLOBArray.length; j++) {
                    var lobID = selectedLOBArray[j]
                    var lobInfoMap = getLOBObjectFromPackageMap(covID, lobID)
                    var rateID_LOB = getRateIDForPackageLOB(covID, lobID)
                    var rateBasis_LOB = getRateObjectByID(rateID_LOB).rateBasis
                    if (rateBasis_LOB === 'LIMIT') {
                        var rateObject = getRateObjectByID(rateID_LOB)
                        var rate_limitArray = jsonStringToObject(rateObject.limitRateArray)
                        for (var c=0; c < rate_limitArray.length; c++) {
                            var thisLimMap = rate_limitArray[c]
                            var thisLimDesc = thisLimMap.limitDescription
                            limitDescriptionsThatNeedInputs.push(thisLimDesc.trim())
                        }
                    }
                }
            }
        }


        limitRowsHTML = limitRowsHTML +
            "<div class='row limitRow " + productIDClassString + "_LimitRow' data-limitdescription='" + escapeDataAttributeValue(limitDescription) + "'>"

        if(limitDescriptionsThatNeedInputs.indexOf( limitDescription.trim() ) > -1 ){
            limitRowsHTML = limitRowsHTML +
                "   <div class='col-xs-4 form-group'>" +
                "       <input class='limitValue maskMoney input-xs form-control " + productIDClassString + "_LimitRow_LimitValue ' " +
                "           data-limitdescription='" + escapeDataAttributeValue(limitDescription) + "'" +
                "           data-prefix='$'" +
                "           data-precision='0'" +
                "           required='true' " +
                "           value='" + limitValue + "'>" +
                "   </div>"
        }
        else{
            limitRowsHTML = limitRowsHTML +
                "   <div class='col-xs-4'>" +
                "       <span class='limitValue " + productIDClassString + "_LimitRow_LimitValue' " +
                "           data-limitdescription='" + escapeDataAttributeValue(limitDescription) + "'>" + limitValue + "</span>" +
                "   </div>"
        }

        limitRowsHTML = limitRowsHTML +
            "   <div class='col-xs-8'>" +
            "       <span class='limitDescription " + productIDClassString + "_LimitRow_LimitDescription' " +
            "           data-limitdescription='" + escapeDataAttributeValue(limitDescription) + "'>" + limitDescription + "</span>" +
            "   </div>" +
            "</div>"

    }

    return limitRowsHTML
}
function getDeductRowsHTML(deductArray, productID, covID){
    var deductRowsHTML = ""
    for(var i=0; i<deductArray.length; i++){
        var deductValue
        var deductDescription
        if(jsonStringToObject( deductArray[i] ).deductDescription !== null || jsonStringToObject( deductArray[i] ).deductDescription !== undefined){
            deductValue = jsonStringToObject( deductArray[i] ).deductAmount
            deductDescription = jsonStringToObject( deductArray[i] ).deductDescription
        }
        else{
            deductValue = deductArray[i].split('\t')[0]
            deductDescription = deductArray[i].split('\t')[1]
        }

        deductDescription = removeCoverageIdentifierFromLimDeduct(deductDescription, covID)
        var productIDClassString = replaceEachSpaceWith(productID.trim(), "_")

        deductRowsHTML = deductRowsHTML +
            "<div class='row deductRow " + productIDClassString + "_DeductRow' data-deductdescription='" + escapeDataAttributeValue(deductDescription) + "'>" +
            "   <div class='col-xs-4'>" +
            "       <span class='deductValue " + productIDClassString + "_DeductRow_DeductValue' " +
            "           data-deductdescription='" + escapeDataAttributeValue(deductDescription) + "'>" + deductValue + "</span>" +
            "   </div>" +
            "   <div class='col-xs-8'>" +
            "       <span class='deductDescription " + productIDClassString + "_DeductRow_DeductDescription' " +
            "           data-deductdescription='" + escapeDataAttributeValue(deductDescription) + "'>" + deductDescription + "</span>" +
            "   </div>" +
            "</div>"
    }
    return deductRowsHTML
}
function removeCoverageIdentifierFromLimDeduct(string, covID){
    var covIdentifier = covID + ":"
    return string.replace(covIdentifier, '')
}
function buildCoverageAndProductSelectedMap(){
    var coveragesSelected = getCoveragesSelectedArray()
    var coveragesAndProductsSelectedMap = {}

    for(var i=0; i<coveragesSelected.length; i++){
        var covID = coveragesSelected[i]
        coveragesAndProductsSelectedMap[covID] = {}
        coveragesAndProductsSelectedMap[covID].productID = getProductIDForCoverage(covID)
    }

    return coveragesAndProductsSelectedMap
}
function getLimitValueFromLimitDescription(covID, limitDescription){
    var thisLimitValue = ""
    var limitContainer = $('#' + covID + '_LimDeductColumnsContainer .limitColumn')

    $(limitContainer).find('.limitRow').each(function(){
        var thisLimitDescription = $(this).data('limitdescription')
        if(thisLimitDescription === limitDescription){
            var thisInputLimit = $(this).find('.limitValue')
            thisLimitValue = $(thisInputLimit).val().trim()

            //IF THIS LIMIT INPUT VALUE IS STILL BLANK ("") THEN REPLACE WITH ZERO
            if(thisLimitValue === ""){
                thisLimitValue = "0"
            }
            return thisLimitValue
        }
    })

    if(thisLimitValue === ""){
        return undefined
    }
    else{
        return thisLimitValue
    }
}
function getDeductValueFromDeductDescription(productID, deductDescription){
    var thisDeductValue = ""
    $('.' + productID + "_DeductRow_DeductValue").each(function(){
        var thisDeductDescription = $(this).data('deductDescription').trim()

        if(thisDeductDescription === deductDescription){
            thisDeductValue = $(this).html().trim()
            return thisDeductValue
        }
    })

    if(thisDeductValue === ""){
        return undefined
    }
    else{
        return thisDeductValue
    }
}
function isAllLimitInputFieldsFilled(){
    var unfilledLimitInputCount = $('div#limitsDeductiblesContainer input.limitValue').filter(function() { return $(this).val().trim().length === 0; }).length
    if(unfilledLimitInputCount > 0){
        ratingBasisIsLimitAndAllLimitsAreFilled = false
    }
    else{
        ratingBasisIsLimitAndAllLimitsAreFilled = true
    }

    return ratingBasisIsLimitAndAllLimitsAreFilled
}
function isRatingBasisLimitForAnyCoverages(){
    var covSelectedArray = getCoveragesSelectedArray()
    var atLeastOneProductHasLimitRateBasis = false

    for(var i=0;i<covSelectedArray.length;i++){
        var thisProductID = getProductIDForCoverage(covSelectedArray[i])
        var rateCode = getProductObjectFromProductID(thisProductID).rateCode
        var rateObject = getRateObjectByID(rateCode)
        var rateBasis = rateObject.rateBasis

        if(rateBasis === 'LIMIT'){
            atLeastOneProductHasLimitRateBasis = true
        }
    }

    return atLeastOneProductHasLimitRateBasis
}
function buildLimitMapForSelectedProducts(){
    var productsSelected = getProductsSelectedArray()
    var limitMap = {}
    for(var i=0; i<productsSelected.length; i++){
        var productID = productsSelected[i]
        var productObject = getProductObjectFromProductID(productID)
        var tempLimitArray = productObject.limitArray
        limitMap[productID] = jsonStringToObject(tempLimitArray)
    }

    return limitMap
}
function buildDeductMapForSelectedProducts(){
    var productsSelected = getProductsSelectedArray()
    var deductMap = {}
    for(var i=0; i<productsSelected.length; i++){
        var productID = productsSelected[i]
        var productObject = getProductObjectFromProductID(productID)
        var tempDeductArray = productObject.deductArray
        deductMap[productID] = jsonStringToObject(tempDeductArray)
    }

    return deductMap
}
function buildLimitDeductMapForAllProducts(){
    var productsSelected = getProductsSelectedArray()
    var finalLimitDeductMap = {}
    for(var i=0; i<productsSelected.length; i++){
        var productID = productsSelected[i]
        var productObject = getProductObjectFromProductID(productID)
        var limitArray = jsonStringToObject(productObject.limitArray)
        var deductArray = jsonStringToObject(productObject.deductArray)
        var thisProductLimitDeductArray =[]


        //LOOP THROUGH LIMIT ARRAY FIRST
        for(var l=0;l<limitArray.length;l++){
            var limitDeductMap = {}
            var thisLimitMap = limitArray[l]
            var thisLimitName = thisLimitMap.limitDescription
            var thisLimitValue = thisLimitMap.limitAmount

            limitDeductMap.description = thisLimitName
            limitDeductMap.limitValue = thisLimitValue

            //CHECK FOR USER INPUTS FOR LIMIT
            $('.limDeductColumnsContainer').each(function(){
                var thisProductID = $(this).data('productid')

                if(productID === thisProductID){
                    if($(this).find(".limitValue.input-xs[data-limitdescription='" + thisLimitName + "']").length > 0){
                        var limitInput = $(this).find(".limitValue.input-xs[data-limitdescription='" + thisLimitName + "']")

                        limitDeductMap.limitValue = $(limitInput).val()
                    }

                }
            })


            thisProductLimitDeductArray.push(limitDeductMap)
        }

        //LOOP THROUGH DEDUCTS
        for(var d=0;d<deductArray.length;d++){
            var limitDeductMap = {}
            var thisDeductMap = deductArray[d]
            var thisDeductName = thisDeductMap.deductDescription
            var thisDeductValue = thisDeductMap.deductAmount

            //CHECK IF LIMIT WITH SAME DESCRIPTION EXISTS
            var descriptionExists = false
            for(var l=0;l<thisProductLimitDeductArray.length;l++){
                var tempMap = thisProductLimitDeductArray[l]
                if( tempMap.description === thisDeductName ){
                    descriptionExists = true
                    limitDeductMap = tempMap
                }
            }

            if(descriptionExists){
                limitDeductMap.deductValue = thisDeductValue
            }
            else{
                limitDeductMap.description = thisDeductName
                limitDeductMap.deductValue = thisDeductValue
                thisProductLimitDeductArray.push(limitDeductMap)
            }
        }
        finalLimitDeductMap[productID] = thisProductLimitDeductArray


        //IF LIMITS ARE INPUTS REPLACE IN FINAL MAP WITH USER INPUTS



    }

    return finalLimitDeductMap
}


//PREMIUM AND RATE INFO
function showPremiumRateContainer(){
    $('#premiumDetailContainer').css('display', '')
}
function hidePremiumRateContainer(){
    $('#premiumDetailContainer').css('display', 'none')
}
function clearPremiumRateContainer(){
    $('#premiumDetailContainer').empty()
}
function calculatePremiumsAndFillContainer(){
    buildPremiumLinesForEachCoverage()
}

function buildPremiumLinesForEachCoverage(){
    var premiumLinesContainer = $('#premiumLinesContainer')
    var premiumLinesHTML = ""

    var covArray = submission.coverages()


    for(var i=0;i<covArray.length; i++){
        var covID = covArray[i]
        var coverageObject = getCoverageObject(covID)
        var productObject = getProductObjectFromProductID(getProductIDForCoverage(covID))
        var operationMap = getCurrentOperationTypeObject()
        var coveragePackageLOBInfoArray = jsonStringToObject(operationMap.coveragePackageMap)[covID]

        //CREATE CONTAINER FOR THIS COVERAGE ID
        premiumLinesHTML = premiumLinesHTML + "<div class='" + covID + "_PremiumLinesContainer'>"

        //CHECK IF PACKAGE
        if(coverageObject.packageFlag === 'Y'){
            var lobSelectedArray = getLOBSSelectedInPackageArray(covID)

            premiumLinesHTML = premiumLinesHTML + buildPackagePremiumRows(covID)
        }
        else{
            var rateID = productObject.rateCode
            premiumLinesHTML = premiumLinesHTML + getPremiumLineHTML(rateID, covID, false)
        }

        premiumLinesHTML = premiumLinesHTML + "</div>"

    }


    $(premiumLinesContainer).html(premiumLinesHTML)


    buildPremiumTotalLines()
    buildTaxInfo()

}
function buildPremiumTotalLines(){
    var premiumLinesContainer = $('#premiumLinesContainer')
    var taxLinesContainer = $('#taxLinesContainer')
    var totalPremiumForAllCoverages = 0
    var totalPremiumAndTax = 0

    //CALCULATE TOTAL PREMIUM
    totalPremiumForAllCoverages = calculatePremiumSubTotal()

    //ADD TAX LINES TO TOTAL
    $(taxLinesContainer).find('.taxValue').each(function(){
        var thisTaxValue = getFloatValueOfMoney( $(this).html().trim() )
        totalPremiumForAllCoverages = totalPremiumForAllCoverages + thisTaxValue
    })


    var totalPremiumRowHTML = "<div class='row totalPremiumRow' style=''> " +
        "   <div class='col-xs-4'> " +
        "       <span class='premiumLine_description'>" + "Total:" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_premiumBasis'>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_basisValue'>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_rate'>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_premium totalPremium' style=''>" + formatMoney(totalPremiumForAllCoverages) + "</span> " +
        "   </div> " +
        "</div>"

    $('#premiumTotalContainer').html(totalPremiumRowHTML)
}
function calculatePremiumSubTotal(){
    var premiumLinesContainer = $('#premiumLinesContainer')
    var totalPremiumForAllCoverages = 0

    //CALCULATE TOTAL PREMIUM
    $(premiumLinesContainer).find('.coverageTotalPremium').each(function(){
        var thisPremium = getFloatValueOfMoney( $(this).html().trim() )
        totalPremiumForAllCoverages = totalPremiumForAllCoverages + thisPremium
    })

    return totalPremiumForAllCoverages
}
function buildPackagePremiumRows(packageID){
    var premiumLineHTML = ""

    var packageProductID = getProductIDForCoverage(packageID)
    var productObject = getProductObjectFromProductID(packageProductID)
    var rateID = productObject.rateCode


    //PACKAGE HEADER LINE
    premiumLineHTML = premiumLineHTML + getPremiumLineHTML(rateID, packageID, false)
    //PACKAGE LOB LINES
    var lobIDArray = getLOBSSelectedInPackageArray(packageID)
    for(var i=0;i<lobIDArray.length;i++){
        var lobID = lobIDArray[i]
        // var rateID = lobObject.rateID
        var rateID = getRateIDForPackageLOB(packageID, lobID)

        premiumLineHTML = premiumLineHTML + getPremiumLineHTML(rateID, lobID, packageID)

    }

    if(lobIDArray.length > 0){
        premiumLineHTML = premiumLineHTML + getPremiumLineHTML_PackageTotal(packageID)
    }

    return premiumLineHTML
}

function getPremiumLineHTML_CoverageHeader(covID){
    var coverageMap = getCoverageObject(covID)

    var premiumLineHTML = "<div class='row premiumHeaderRow premiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
        "   <div class='col-xs-4'> " +
        "       <span class='premiumLine_description'>" + coverageMap.coverageName + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_premiumBasis'>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_basisValue'>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_rate'>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_premium'>" + "" + "</span> " +
        "   </div> " +
        "</div>"

    return premiumLineHTML
}
function getPremiumLineHTML_PackageTotal(packageID){
    var premiumLineHTML = ""
    var premium = calculatePackageTotalPremium(packageID, getLOBSSelectedInPackageArray(packageID))
    var packageObject = getCoverageObject(packageID)

    premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow packageTotalLine " + packageObject.coverageCode + "_PremiumLineRow'> " +
        "   <div class='col-xs-4'> " +
        "       <span class='premiumLine_description' style=''>" + packageObject.coverageName + " Total </span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_premiumBasis'>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_basisValue'>" + "" + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_rate'></span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_premium coverageTotalPremium'>" + formatMoney(premium) + "</span> " +
        "   </div> " +
        "</div>"

    return premiumLineHTML

}
function getPremiumLineHTML(rateID, covID, ifLOB_PackageID){
    var coverageMap = getCoverageObject(covID)
    var productMap
    var premiumLineHTML = ""
    var limitHeaderStyleString = ""
    var limitHeaderRowClass = ""
    var lobLimitLineIndentClass = ""
    var totalPremiumClassString = ""

    if(ifLOB_PackageID){
        lobLimitLineIndentClass = "lobIndent"
        limitHeaderStyleString = ""
        limitHeaderRowClass = "premiumLOBHeaderRow"
        totalPremiumClassString = "lobTotalPremium"


    }
    else{
        productMap = getProductObjectFromProductID(getProductIDForCoverage(covID))
        limitHeaderRowClass = "premiumHeaderRow"
        totalPremiumClassString = "coverageTotalPremium"
    }
    //THIS FUNCTION WILL HANDLE BOTH MONOLINE COVIDS AND PACKAGE LOBS
    if(rateID !== null && rateID !== undefined
        && rateID !== 'invalid' && rateID !== 'NONE' ){
        var rateMap = getRateObjectByID(rateID)
        var ratingBasisMap = getRatingBasisObjectByID(rateMap.rateBasis)

        var totalCoveragePremium = 0

        if(rateMap.rateBasis === 'LIMIT'){
            var totalPremium = 0
            var limitRateArray = jsonStringToObject( rateMap.limitRateArray )

            premiumLineHTML = premiumLineHTML +
                "<div class='row premiumLineRow " + limitHeaderRowClass + " " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description'>" + coverageMap.coverageName + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premiumBasis'>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_basisValue'>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_rate'>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium'></span> " +
                "   </div> " +
                "</div>"

            for(var i=0; i<limitRateArray.length; i++){
                var thisLimitRateMap = limitRateArray[i]
                var limitDescription = thisLimitRateMap.limitDescription

                //GET USER INPUT FROM LIMIT INPUT
                var userInputLimitValue = ""
                var limitPremium = ""
                if(ifLOB_PackageID){
                    userInputLimitValue = getLimitValueFromLimitDescription(ifLOB_PackageID, thisLimitRateMap.limitDescription)
                }
                else{
                    userInputLimitValue = getLimitValueFromLimitDescription(covID, thisLimitRateMap.limitDescription)
                }

                if(userInputLimitValue === undefined){
                    userInputLimitValue = "NOT FOUND"
                    limitPremium = 0
                }
                else{
                    userInputLimitValue = formatMoney(removeAllNonNumbersFromString(userInputLimitValue))
                    limitPremium = calculateLimitPremium(rateMap, limitDescription, userInputLimitValue )
                }


                var limitLineStyleString = ""
                if(ifLOB_PackageID){
                    limitLineStyleString = ""
                }

                premiumLineHTML = premiumLineHTML +
                    "<div class='row premiumLineRow limitPremiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow'>" +
                    "   <div class='col-xs-4'> " +
                    "       <span class='premiumLine_description " + lobLimitLineIndentClass + "' " +
                    "           style='white-space: pre;" + limitLineStyleString + "'>" + limitDescription + "</span> " +
                    "   </div> " +
                    "   <div class='col-xs-2'> " +
                    "       <span class='premiumLine_premiumBasis'>" + rateMap.rateBasis + "</span> " +
                    "   </div> " +
                    "   <div class='col-xs-2'> " +
                    "       <span class='premiumLine_basisValue'>" + userInputLimitValue + "</span> " +
                    "   </div> " +
                    "   <div class='col-xs-2'> " +
                    "       <span class='premiumLine_rate'>" + thisLimitRateMap.rateValue + "</span> " +
                    "   </div> " +
                    "   <div class='col-xs-2'> " +
                    "       <span class='premiumLine_premium'>" + formatMoney(limitPremium) + "</span> " +
                    "   </div> " +
                    "</div>"

                totalPremium = totalPremium + limitPremium
            }

            premiumLineHTML = premiumLineHTML +
                "<div class='row premiumLineRow coveragePremiumRow limitTotalPremiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow' > " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description " +  lobLimitLineIndentClass  + "' " +
                "           style='white-space: pre;'>" + coverageMap.coverageCode + " Total" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premiumBasis'>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_basisValue'>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_rate'>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium " + totalPremiumClassString + "'>" + formatMoney(totalPremium) + "</span> " +
                "   </div> " +
                "</div>"

            totalCoveragePremium = totalPremium


        }
        else if (rateMap.rateBasis === 'BRACKET'){
            var ratingBasisQuestion = $('#' + ratingBasisMap.basisQuestionID)
            var premium = calculateTotalCoveragePremium(productMap, rateMap, ratingBasisMap, ifLOB_PackageID)

            premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow " + limitHeaderRowClass + " " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description' style='" + limitHeaderStyleString + "'>" + coverageMap.coverageName + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premiumBasis'>" + rateMap.rateBasis + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_basisValue'>" + formatMoney($(ratingBasisQuestion).val()) + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_rate'>" + jsonStringToObject(rateMap.bracketRateArray)[0].rateValue + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium " + totalPremiumClassString + "'>" + formatMoney(premium) + "</span> " +
                "   </div> " +
                "</div>"


            totalCoveragePremium = premium
        }
        else if (rateMap.rateBasis === 'FLAT'){
            var premium = calculateTotalCoveragePremium(productMap, rateMap, ratingBasisMap, ifLOB_PackageID)
            premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow " + limitHeaderRowClass + " " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description' style='" + limitHeaderStyleString + "'>" + coverageMap.coverageName + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premiumBasis'>" + rateMap.rateBasis + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_basisValue'>" + formatMoney(rateMap.flatAmount) + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_rate'> FLAT </span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium " + totalPremiumClassString + "'>" + formatMoney(premium) + "</span> " +
                "   </div> " +
                "</div>"

            totalCoveragePremium = premium
        }
        else{
            var ratingBasisQuestion = $('#' + ratingBasisMap.basisQuestionID)
            var premium = calculateTotalCoveragePremium(productMap, rateMap, ratingBasisMap, ifLOB_PackageID)

            premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow " + limitHeaderRowClass + " " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description' style='" + limitHeaderStyleString + "'>" + coverageMap.coverageName + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premiumBasis'>" + rateMap.rateBasis + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_basisValue'>" + formatMoney($(ratingBasisQuestion).val()) + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_rate'>" + rateMap.rateValue + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium " + totalPremiumClassString + "'>" + formatMoney(premium) + "</span> " +
                "   </div> " +
                "</div>"

            totalCoveragePremium = premium
        }

    }
    else{
        //IF PRODUCT DOES NOT HAVE A VALID RATE CODE
        premiumLineHTML = "<div class='row premiumLineRow " + limitHeaderRowClass + " " + coverageMap.coverageCode + "_PremiumLineRow'> " +
            "   <div class='col-xs-4'> " +
            "       <span class='premiumLine_description'>" + coverageMap.coverageName + "</span> " +
            "   </div> " +
            "   <div class='col-xs-2'> " +
            "       <span class='premiumLine_premiumBasis'> N/A </span> " +
            "   </div> " +
            "   <div class='col-xs-2'> " +
            "       <span class='premiumLine_basisValue'>N/A </span> " +
            "   </div> " +
            "   <div class='col-xs-2'> " +
            "       <span class='premiumLine_rate'>N/A </span> " +
            "   </div> " +
            "   <div class='col-xs-2'> " +
            "       <span class='premiumLine_premium'>N/A </span> " +
            "   </div> " +
            "</div>"
    }

    return premiumLineHTML
}

function buildPremiumMap(){
    var coveragesSelected = getCoveragesSelectedArray()
    var premiumMap = {}
    var totalPremium = 0
    var totalTax = 0
    var totalPremiumAndTax = 0

    for(var i=0;i<coveragesSelected.length;i++){
        var coverageCode = coveragesSelected[i]
        var productID = getProductIDForCoverage(coverageCode)
        var premiumLinesArrayForCoverage = []
        var premiumMapForCoverage = {}
        var totalPremiumForCoverage = 0

        premiumMapForCoverage.coverageName = getCoverageObject(coverageCode).coverageName

        //BUILD PREMIUM LINES ARRAY
        $('#step-2 .' + coverageCode + '_PremiumLineRow').each(function(){
            var premiumLineRow = $(this)
            var tempPremiumMapForCoverage = {}
            tempPremiumMapForCoverage.description = $(premiumLineRow).find('.premiumLine_description').html()
            tempPremiumMapForCoverage.productID = productID
            tempPremiumMapForCoverage.premiumBasis = $(premiumLineRow).find('.premiumLine_premiumBasis').html()
            tempPremiumMapForCoverage.basisValue = $(premiumLineRow).find('.premiumLine_basisValue').html()
            tempPremiumMapForCoverage.rate = $(premiumLineRow).find('.premiumLine_rate').html()
            tempPremiumMapForCoverage.premium = $(premiumLineRow).find('.premiumLine_premium').html()

            //COVERAGE TOTAL PREMIUM
            if( $(premiumLineRow).find('.coverageTotalPremium').length > 0 ){
                totalPremiumForCoverage = totalPremiumForCoverage + getFloatValueOfMoney( $(premiumLineRow).find('.coverageTotalPremium').html().trim() )
            }

            premiumLinesArrayForCoverage.push(tempPremiumMapForCoverage)
        })
        premiumMapForCoverage.premiumLinesArray = premiumLinesArrayForCoverage

        //BUILD TOTAL PREMIUM FOR COVERAGE
        premiumMapForCoverage.premium = totalPremiumForCoverage
        totalPremium = totalPremium + totalPremiumForCoverage


        premiumMap[coverageCode] = premiumMapForCoverage
    }
    premiumMap.totalPremium = totalPremium

    //TOTAL UP TAX
    var taxLines = []
    $('#taxLinesContainer .taxRow').each(function(){
        var tempTaxMap = {}
        var taxValue = getFloatValueOfMoney( $(this).find('.taxValue').html() )
        var taxName = $(this).find('.taxLine_description').html()
        var taxCode = $(this).attr('data-taxcode')

        tempTaxMap.taxCode = taxCode
        tempTaxMap.name = taxName
        tempTaxMap.value = taxValue
        taxLines.push(tempTaxMap)
        totalTax = totalTax + taxValue
    })

    totalPremiumAndTax = totalPremium + totalTax
    premiumMap.taxLines = taxLines
    premiumMap.totalTax = totalTax
    premiumMap.totalPremiumAndTax = totalPremiumAndTax



    return premiumMap
}
function buildTaxInfo(){
    var selectedState = $('#stateMailing').val().trim()
    var taxMap = {}

    if(selectedState !== 'invalid'){
        $.ajax({
            method: "POST",
            url: "/main/getTaxInfo",
            data: {
                state: selectedState
            }
        })
            .done(function(msg) {
                if(msg === "Error"){
                    console.log("Error")
                }
                else{
                    taxMap = jsonStringToObject(msg)
                    buildTaxRows(taxMap)
                    buildPremiumTotalLines()
                }
            });
    }
    else if(selectedState === 'invalid'){
        taxMap = {}
    }
}
function buildTaxRows(taxMap){
    var taxMapKeys = Object.keys(taxMap)
    var taxRowsHTML = ""
    var subTotalPremium = calculatePremiumSubTotal()

    for(var i=0;i<taxMapKeys.length;i++){
        var taxCode = taxMapKeys[i]
        var taxCodeMap = taxMap[taxCode]

        //CHECK IF THIS KEY IS A TAX CODE OR ADDITIONAL INFO
        if(taxCodeMap !== null && taxMap[taxCode].name !== undefined){
            var taxName = taxCodeMap.name
            var taxValue = taxCodeMap.taxValue


            if(taxValue !== undefined && taxName !== undefined){
                taxRowsHTML = taxRowsHTML +
                    "<div class='row taxRow' data-taxcode='" + taxCode + "' style=''> " +
                    "   <div class='col-xs-4'> " +
                    "       <span class='taxLine_description'>" + taxName + "</span> " +
                    "   </div> " +
                    "   <div class='col-xs-2'> " +
                    "       <span class='taxLine_premiumBasis'>" + "" + "</span> " +
                    "   </div> " +
                    "   <div class='col-xs-2'> " +
                    "       <span class='taxLine_basisValue'>" + "" + "</span> " +
                    "   </div> " +
                    "   <div class='col-xs-2'> " +
                    "       <span class='taxLine_rate'>" + taxValue + "</span> " +
                    "   </div> " +
                    "   <div class='col-xs-2'> " +
                    "       <span class='taxLine_total taxValue'>" + formatMoney(taxValue * subTotalPremium) + "</span> " +
                    "   </div> " +
                    "</div>"
            }
        }


    }

    $('#taxLinesContainer').html(taxRowsHTML)


}

//PRODUCT FUNCTIONS
function getConditionBasisInputFromConditionBasisID(productConditionBasisID){
    for(var i=0;i<productConditions.length;i++){
        if(productConditions[i].conditionID === productConditionBasisID){
            return productConditions[i].questionID
        }
    }
}
function getProductIDForCoverage(covID){
    var operationMap = getCurrentOperationTypeObject()
    var coverageProductMap = jsonStringToObject(operationMap.coverageProductMap)
    var thisCoverageConditionArray = jsonStringToObject(coverageProductMap[covID])

    if(thisCoverageConditionArray != null){

        //IF COVERAGE CONDITION IS 'ALWAYS'
        if(thisCoverageConditionArray[0].logicCondition === 'ALWAYS'){
            return thisCoverageConditionArray[0].productID
        }
        //IF COVERAGE CONDITION IS 'IF'
        else{
        // else if(thisCoverageConditionArray[0].logicCondition === 'IF'){
            //ITERATE THROUGH CONDITIONS, WILL ACCEPT FIRST CONDITION THAT'S VALID
            for(var i=0; i<thisCoverageConditionArray.length; i++){
                if( evaluateLogicConditionRow(thisCoverageConditionArray[i]) === false ){
                    continue
                }
                else{
                    return evaluateLogicConditionRow(thisCoverageConditionArray[i])

                }
            }
        }

    }
}

//PACKAGE LOB FUNCTIONS
function getLOBObjectFromPackageMap(packageID, lobID){
    var coveragePackageMap = jsonStringToObject(getCurrentOperationTypeObject().coveragePackageMap)
    var packageLOBInfoArray = coveragePackageMap[packageID]

    for(var i=0; i<packageLOBInfoArray.length;i++){
        if(packageLOBInfoArray[i].covID === lobID){
            return packageLOBInfoArray[i]
        }
    }
}

//LOGIC CONDITION FUNCTIONS
function getConditionBasisObject(conditionBasisID){
    for(var i=0; i < conditionBasisArray.length; i++ ){
        if(conditionBasisArray[i].conditionID === conditionBasisID){
            return conditionBasisArray[i]
        }
    }
}
function evaluateLogicConditionRow(logicConditionRowMap){
    var rowLogicCondition = logicConditionRowMap.logicCondition
    var productID = logicConditionRowMap.productID

    if(rowLogicCondition === "ALWAYS"){
        return productID
    }
    else{
        var conditionOperator = logicConditionRowMap.conditionOperator
        var conditionBasis = logicConditionRowMap.conditionBasis
        var conditionBasisValue = formatBasisValue(logicConditionRowMap.conditionBasisValue)

        //GET ACTUAL BASIS VALUE
        var actualBasisValue = getActualBasisValue(conditionBasis)

        if(actualBasisValue !== undefined && actualBasisValue !== null ){
            //IF THIS LOGIC CONDITION IS TRUE
            if( evaluateCondition(conditionOperator, conditionBasisValue, actualBasisValue) ){
                //CHECK FOR SUB LOGIC CONDITIONS

                var subLogicArray = jsonStringToObject(logicConditionRowMap.subLogic)

                if(subLogicArray){
                    for(var i=0;i<subLogicArray.length;i++){
                        var subLogicConditionRowMap = jsonStringToObject(subLogicArray[i])
                        var subLogicProductID = subLogicConditionRowMap.productID

                        if( evaluateLogicConditionRow(subLogicConditionRowMap) ){
                            return subLogicProductID
                        }
                        else{
                            continue
                        }
                    }
                }


                return productID
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }

    return false
}
function evaluateCondition(conditionOperator, conditionBasisValue, actualBasisValue){
    //WHAT IS THE OPERATOR (<,>,<=,>=, etc), AND IS CONDITION TRUE
    if(conditionOperator === 'LESSTHAN'){
        if(actualBasisValue < conditionBasisValue){
            return true
        }
    }
    else if(conditionOperator === 'LESSEQUAL'){
        if(actualBasisValue <= conditionBasisValue){
            return true
        }
    }
    else if(conditionOperator === 'GREATERTHAN'){
        if(actualBasisValue > conditionBasisValue){
            return true
        }
    }
    else if(conditionOperator === 'GREATEREQUAL'){
        if(actualBasisValue >= conditionBasisValue){
            return true
        }
    }
    else if(conditionOperator === 'EQUAL'){
        if(actualBasisValue === conditionBasisValue){
            return true
        }
    }

    return false
}
function getActualBasisValue(conditionBasis){
    var conditionBasisInputID = getConditionBasisInputFromConditionBasisID(conditionBasis)
    var questionObject = getQuestionObjectForID(conditionBasisInputID)

    //CHECK IF QUESTION EXISTS ON PAGE, IF NOT RETURN UNDEFINED
    if( $('#step-2 #' + conditionBasisInputID).length > 0){
        if( questionObject.inputType === 'radio' || questionObject.inputType === 'checkbox' ){
            var conditionBasisInput = $('div.requiredQuestion.' + conditionBasisInputID)
            var actualBasisValue = $(conditionBasisInput).find("input[type='" + questionObject.inputType + "']:checked").val()

            if(actualBasisValue){

            }
            else{
                actualBasisValue = ""
            }

            return formatBasisValue(actualBasisValue)
        }
        else{
            var conditionBasisInput = $('#' + conditionBasisInputID)
            var actualBasisValue = $(conditionBasisInput).val()

            if(conditionBasis === "POLICYLENGTH"){
                actualBasisValue = removeAllNonNumbersFromString(actualBasisValue)
            }

            return formatBasisValue(actualBasisValue)
        }
    }
    else if( questionObject.inputType === 'radio' ){
        var conditionBasisInput = $('div.requiredQuestion.' + conditionBasisInputID)
        var actualBasisValue = $(conditionBasisInput).find("input[type='" + questionObject.inputType + "']:checked").val()

        if(actualBasisValue){

        }
        else{
            actualBasisValue = ""
        }

        return formatBasisValue(actualBasisValue)
    }
    else if( questionObject.inputType === 'checkbox' ){
        var conditionBasisInput = $('div.requiredQuestion.' + conditionBasisInputID)
        var actualBasisValue = $(conditionBasisInput).find("input[type='" + questionObject.inputType + "']:checked").val()

        return formatBasisValue(actualBasisValue)
    }
    else{
        return undefined
    }

}
function formatBasisValue(conditionBasisValue){
    //IF CONDITION BASIS IS MONEY
    if( isStringMoney(conditionBasisValue)){
        return getFloatValueOfMoney(conditionBasisValue)
    }
    //IF CONDITION BASIS IS A NUMBER
    else if( isNaN(conditionBasisValue) === false ){
        return getFloatValueOfMoney(conditionBasisValue)
    }
    else{
        return conditionBasisValue
    }
}
function getRequiredQuestionsForProductLogicConditions(coverageProductMap){
    var coverageProductMapKeys = Object.keys(coverageProductMap)
    var requiredQuestionsMap = {}

    for(var i=0; i<coverageProductMapKeys.length; i++){
        var covID = coverageProductMapKeys[i]
        var logicConditionRows = coverageProductMap[covID]
        var requiredQuestionsArray = []

        for(var j=0; j<logicConditionRows.length; j++){
            var logicConditionRow = logicConditionRows[j]
            var logicCondition = logicConditionRow.logicCondition

            if(logicCondition !== 'ALWAYS'){
                var conditionBasisID = logicConditionRow.conditionBasis
                var requiredQuestion = getConditionBasisObject(conditionBasisID).questionID

                requiredQuestionsArray.push(requiredQuestion)

                //CHECK FOR SUBLOGIC REQUIRED QUESTIONS
                if(logicConditionRow.subLogic){
                    var subLogicArray = logicConditionRow.subLogic

                    for(var k=0;k<subLogicArray.length;k++){
                        var subLogicRow = subLogicArray[k]
                        var subLogicCondition = subLogicRow.logicCondition

                        if(subLogicCondition !== 'ALWAYS'){
                            var subLogicConditionBasisID = subLogicRow.conditionBasis
                            var subLogicRequiredQuestion = getConditionBasisObject(subLogicConditionBasisID).questionID

                            requiredQuestionsArray.push(subLogicRequiredQuestion)
                        }
                    }
                }

            }

        }

        requiredQuestionsMap[covID] = requiredQuestionsArray
    }

    return requiredQuestionsMap
}

//RATE LOGIC CONDITION FUNCTIONS
function getRateIDForPackageLOB(packageID, lobID){
    var lobObject = getLOBObjectFromPackageMap(packageID, lobID)
    var thisCoverageConditionArray = jsonStringToObject(lobObject.rateConditions)

    if(thisCoverageConditionArray != null){

        //IF COVERAGE CONDITION IS 'ALWAYS'
        if(thisCoverageConditionArray[0].logicCondition === 'ALWAYS'){
            return thisCoverageConditionArray[0].rateID
        }
        //IF COVERAGE CONDITION IS 'IF'
        // else if(thisCoverageConditionArray[0].logicCondition === 'IF'){
        else{
            //ITERATE THROUGH CONDITIONS, WILL ACCEPT FIRST CONDITION THAT'S VALID
            for(var i=0; i<thisCoverageConditionArray.length; i++){
                if( evaluateLogicConditionRow_Rate(thisCoverageConditionArray[i]) === false ){
                    continue
                }
                else{
                    return evaluateLogicConditionRow_Rate(thisCoverageConditionArray[i])

                }
            }
        }

    }
}
function evaluateLogicConditionRow_Rate(logicConditionRowMap){
    var rowLogicCondition = logicConditionRowMap.logicCondition
    var rateID = logicConditionRowMap.rateID

    if(rowLogicCondition === "ALWAYS"){
        return rateID
    }
    else if(rowLogicCondition === "ELSE"){
        return rateID
    }
    else{
        var conditionOperator = logicConditionRowMap.conditionOperator
        var conditionBasis = logicConditionRowMap.conditionBasis
        var conditionBasisValue = formatBasisValue(logicConditionRowMap.conditionBasisValue)

        //GET ACTUAL BASIS VALUE
        var actualBasisValue = getActualBasisValue(conditionBasis)

        if(actualBasisValue !== undefined && actualBasisValue !== null ){
            //IF THIS LOGIC CONDITION IS TRUE
            if( evaluateCondition(conditionOperator, conditionBasisValue, actualBasisValue) ){
                //CHECK FOR SUB LOGIC CONDITIONS
                var subLogicArray = jsonStringToObject(logicConditionRowMap.subLogic)

                for(var i=0;i<subLogicArray.length;i++){
                    var subLogicConditionRowMap = jsonStringToObject(subLogicArray[i])
                    var subLogicRateID = subLogicConditionRowMap.rateID

                    if( evaluateLogicConditionRow_Rate(subLogicConditionRowMap) ){
                        return subLogicRateID
                    }
                    else{
                        continue
                    }
                }

                return rateID
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }

    return false
}


function getProductsSelectedArray(){
    var tempMap = buildCoverageAndProductSelectedMap()
    var tempMapKeys = Object.keys(tempMap)
    var productsSelectedArray = []

    for(var i=0;i<tempMapKeys.length;i++){
        productsSelectedArray.push(tempMap[tempMapKeys[i]].productID)
    }

    return productsSelectedArray
}
function getProductObjectFromProductID(productID){
    for(var i=0; i < products.length; i++ ){
        if(products[i].productID === productID){
            return products[i]
        }
    }
}







///////////////////STEP 3 - UNDERWRITING QUESTIONS///////////////////
function getFilteredQuestionListForCoveragesSelected(){
    //COMBINES QUESTIONS FOR ALL COVERAGES SELECTED INTO ONE LIST, REMOVING DUPLICATES
    var selectedOperationMap = getCurrentOperationTypeObject()
    var selectedCoveragesArray = getCoveragesAndPackagesSelectedArray()

    var uwQuestionMap = JSON.parse(selectedOperationMap.underwriterQuestionsMap)

    //LOOP THROUGH COVERAGES SELECTED, COMBINE ALL QUESTIONS IN TO ONE CATEGORY-QUESTION MAP
    var combinedQuestionMap = {}
    for(var i=0;i<selectedCoveragesArray.length;i++){
        var covID = selectedCoveragesArray[i]
        var coverageCategoryMap = jsonStringToObject(uwQuestionMap[covID])
        var categoryCodesForCoverage = Object.keys(coverageCategoryMap)

        for(var k=0;k<categoryCodesForCoverage.length;k++){
            var categoryCode = categoryCodesForCoverage[k]
            var categoryQuestionsArray = coverageCategoryMap[categoryCode]

            if(categoryCode in combinedQuestionMap){
                combinedQuestionMap[categoryCode].concat(categoryQuestionsArray)

                //REMOVE DUPLICATES
                combinedQuestionMap[categoryCode] = combinedQuestionMap[categoryCode].filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
            }
            else{
                combinedQuestionMap[categoryCode] = categoryQuestionsArray
            }

        }
    }

    //LOOP THROUGH ONCE MORE TO REORDER QUESTIONS BASED ON WEIGHT IN EACH CATEGORY
    var allCategoryCodes = Object.keys(coverageCategoryMap)
    for(var i=0;i<allCategoryCodes.length;i++){
        var categoryCode = allCategoryCodes[i]

        if(combinedQuestionMap[categoryCode]){
            var tempArray = combinedQuestionMap[categoryCode]
            combinedQuestionMap[categoryCode] = tempArray.sort(sortByWeightAscending)
        }

    }



    return combinedQuestionMap
}
function buildUWQuestionSection(){
    var FORM_COL_SIZE = '12'
    var columns = 2

    //SAVE EXISTING ANSWERS
    var savedAnswers = buildUWQuestionAndAnswerMap()

    //CLEAR EXISTING UW QUESTIONS
    clearAllUWQuestions()

    var finalQuestionMap = getFilteredQuestionListForCoveragesSelected()
    var categories = Object.keys(finalQuestionMap)

    for(var i=0;i<categories.length;i++){
        var categoryCode = categories[i]
        var categoryQuestionArray = finalQuestionMap[categoryCode]

        for(var q=0;q<categoryQuestionArray.length;q++){
            var questionID = categoryQuestionArray[q]
            var questionObject = getQuestionObjectForID(questionID)
            var questionHTML

            questionHTML = getNewSubmissionUWQuestion(questionID, {gridColumns : '12'})
            $('#' + categoryCode + '_QuestionCategoryContainer').append(questionHTML)


        }
    }

    initializeGlobalListeners()
    showHideQuestionCategoryPanels()

    //FILL IN SAVED ANSWERS
    var savedQuestionsArray = Object.keys(savedAnswers)

    for(var i=0;i<savedQuestionsArray.length;i++){
        var questionElementID = savedQuestionsArray[i]
        var questionAnswer = savedAnswers[questionElementID]

        $('#' + questionElementID).val(questionAnswer)
    }
}
function showHideQuestionCategoryPanels(){
    $('.uwQuestionCategoryPanel').each(function(){
        if( $(this).find('.uwQuestion').length === 0 ){
            $(this).css('display', 'none')
        }
        else{
            $(this).css('display', '')
        }
    })
}
function getLeftOrRightColumnToInsert(categoryCode){
    //CALCULATES WHICH COLUMN HAS LESS QUESTIONS TO INSERT INTO, TO EVEN OUT THE COLUMNS
    var $el = $('#bottom');  //record the elem so you don't crawl the DOM everytime
    var bottom = $el.position().top + $el.outerHeight(true);

    var leftColumnElement = $('#' + categoryCode + '_QuestionCategoryContainer .questionLeftColumn')
    var rightColumnElement = $('#' + categoryCode + '_QuestionCategoryContainer .questionRightColumn')

    var leftBottom = $(leftColumnElement).position().top + $(leftColumnElement).outerHeight(true)
    var rightBottom = $(rightColumnElement).position().top + $(rightColumnElement).outerHeight(true)

    if(leftBottom > rightBottom){}




}
function clearAllUWQuestions(){
    $('#step-3 div.row.uwQuestionRow').remove()
}

//QUESTIONS
function getQuestionObjectForID(questionID){
    for(var i=0;i<questions.length;i++){
        if(questionID === questions[i].questionID){
            return questions[i]
        }
    }

}
function buildUWQuestionAndAnswerMap(){
    var questionAnswerMap = {}

    $('div.uwQuestion').each(function(){
        var questionType = $(this).attr('data-inputtype')
        var questionID = $(this).attr('data-questionid')

        if(questionType === 'text'){
            questionAnswerMap[questionID] = $(this).find('input#' + questionID).val()
        }
        else if(questionType === 'radio'){
            var groupName = questionType + "_RadioGroup"
            questionAnswerMap[questionID] = $(this).find("input[name='" + groupName + "']:checked").val()
        }
        else if(questionType === 'checkbox'){
            var groupName = questionType + "_CheckboxGroup"

            $("input[name='" + groupName + "']:checked").each(function(){
                questionAnswerMap[questionID] = $(this).val()
            })
        }
        else if(questionType === 'dropdown'){
            questionAnswerMap[questionID] = $(this).find('#' + questionID).val()
        }
        else if(questionType === 'custom_mailingAddress'){
            var addressContainer = $(this)
            $(addressContainer).find('input,select').each(function(){
                questionID = $(this).attr('id')
                questionAnswerMap[questionID] = $(this).val()
            })
        }
    })

    return questionAnswerMap
}
function buildAllQuestionAndAnswerMap(){
    var questionAnswerArray = []

    $('div.uwQuestion').each(function(){
        var questionAnswerMap = {}
        var questionType = $(this).attr('data-inputtype')
        var questionID = $(this).attr('data-questionid')

        if(questionType === 'text'){
            questionAnswerMap.questionID = questionID
            questionAnswerMap.questionText = getQuestionObjectForID(questionID).questionText
            questionAnswerMap.answer = $(this).find('input#' + questionID).val()
        }
        else if(questionType === 'radio'){
            var groupName = questionID + "_RadioGroup"
            questionAnswerMap.questionID = questionID
            questionAnswerMap.questionText = getQuestionObjectForID(questionID).questionText
            questionAnswerMap.answer = $(this).find("input[name='" + groupName + "']:checked").val()
        }
        else if(questionType === 'checkbox'){
            var groupName = questionType + "_CheckboxGroup"

            questionAnswerMap.questionID = questionID
            questionAnswerMap.questionText = getQuestionObjectForID(questionID).questionText

            var tempAnswer = []
            $("input[name='" + groupName + "']:checked").each(function(){
                tempAnswer.push( $(this).val() )
            })
            questionAnswerMap.answer = tempAnswer.join()
        }
        else if(questionType === 'dropdown'){
            questionAnswerMap.questionID = questionID
            questionAnswerMap.questionText = getQuestionObjectForID(questionID).questionText

            questionAnswerMap.answer = $(this).find('#' + questionID).val()
        }
        else if(questionType === 'custom_mailingAddress'){
            var addressContainer = $(this)

            $(addressContainer).find('input,select').each(function(){
                questionID = $(this).attr('id')
                questionAnswerMap[questionID] = $(this).val()
            })
        }

        questionAnswerArray.push(questionAnswerMap)
    })

    return questionAnswerArray
}
function buildAnswersToQuestionsMap(){
    var answersToQuestionMap = {}

    $('div.uwQuestion').each(function(){
        var questionID = $(this).attr('data-questionid')
        var questionType = $(this).attr('data-inputtype')

        if(questionType === 'text'){
            answersToQuestionMap[questionID] = $(this).find('input#' + questionID).val()
        }
        else if(questionType === 'radio'){
            var groupName = questionID + "_RadioGroup"
            answersToQuestionMap[questionID] = $(this).find("input[name='" + groupName + "']:checked").val()
        }
        else if(questionType === 'checkbox'){
            var groupName = questionType + "_CheckboxGroup"

            var tempAnswer = []
            $("input[name='" + groupName + "']:checked").each(function(){
                tempAnswer.push( $(this).val() )
            })
            answersToQuestionMap[questionID] = tempAnswer.join()
        }
        else if(questionType === 'dropdown'){
            answersToQuestionMap[questionID] = $(this).find('#' + questionID).val()
        }
        else if(questionType === 'custom_mailingAddress'){
            //TODO
        }

        //IF QUESTION ANSWER IS UNDEFINED
        if(answersToQuestionMap[questionID] === undefined){
            answersToQuestionMap[questionID] = "Not Answered"
        }
    })

    return answersToQuestionMap
}
function buildUWQuestionsForIndication(){
    var questionAnswerKeyMap = buildAnswersToQuestionsMap()
    var questionsCategoryAnswersArray = []

    $('.uwQuestionCategoryPanel').each(function(){
        var displayCSS = $(this).css('display')

        if( displayCSS.trim() !== "none" ){
            var categoryMap = {}
            var categoryID = $(this).attr('data-questioncategoryid')
            var categoryName = $(this).attr('data-questioncategoryname')

            var categoryQuestionsArray = []
            $(this).find('div.uwQuestion').each(function(){
                var questionAnswerMap = {}
                var questionID = $(this).attr('data-questionid')
                var questionText = getQuestionObjectForID(questionID).questionText
                var questionAnswer = questionAnswerKeyMap[questionID]

                questionAnswerMap.questionID = questionID
                questionAnswerMap.questionText = questionText
                questionAnswerMap.questionAnswer = questionAnswer

                categoryQuestionsArray.push(questionAnswerMap)
            })

            categoryMap.categoryID = categoryID
            categoryMap.categoryName = categoryName
            categoryMap.questionsArray = categoryQuestionsArray

            questionsCategoryAnswersArray.push(categoryMap)
        }
    })

    return questionsCategoryAnswersArray
}




///////////////////STEP 4 - REVIEW SECTION///////////////////
function buildReview(){
    //INSURED INFO
    $('#review_namedInsured').html( $('#namedInsured').val().trim() )
    $('#review_namedInsuredStreetAddress').html( $('#streetAddressMailing').val().trim() )
    $('#review_namedInsuredCity').html( $('#cityMailing').val().trim() )
    $('#review_namedInsuredZipcode').html( $('#zipCodeMailing').val().trim() )
    $('#review_namedInsuredState').html( $('#stateMailing').val().trim() )

    //BROKER INFO
    $('#review_brokerName').html( $('#brokerName').val().trim() )
    $('#review_brokerEmail').html( $('#brokerEmail').val().trim() )

    //OPERATIONS AND COVERAGES
    $('#review_operationTypeName').html( $('#operationsDropdown option:selected').text().trim() )

    //LIMITS AND DEDUCTBILES
    var limDedReviewHTML = $('#limitsDeductiblesContainer').parent().clone()
    $(limDedReviewHTML).find('*').removeAttr('id')
    $(limDedReviewHTML).find('input').each(function(){
        var inputValue = $(this).val()
        var spanHTML = "<div class='col-xs-4'><span>" + inputValue + "</span></div>"
        $(this).before(spanHTML)
        $(this).closest('.form-group').remove()
    })

    $('#review_coverageBreakdown').html( $(limDedReviewHTML) )

    //RATE BREAKDOWN
    var rateReviewHTML = $('#premiumDetailContainer').parent().clone()
    $(rateReviewHTML).find('*').removeAttr('id')

    $('#review_rateBreakdown').html( $(rateReviewHTML) )


    //TERMS
    $('#review_termsString').html(buildTermsStringForAllProducts())



    //UNDERWRITING QUESTIONS
    var reviewHTML = ""
    $('div#step-2 .requiredQuestion').each(function(){
        reviewHTML = reviewHTML + getReviewHTMLFromQuestionContainer(this)
    })
    $('div#step-3 div.uwQuestionCategoryPanel').each(function(){
        var questionCategoryName = $(this).data('questioncategoryname')

        if($(this).find('.uwQuestion').length > 0){
            reviewHTML = reviewHTML +
                "<div class='row'>" +
                "   <div class='col-xs-12'>" +
                "       <h4>" + questionCategoryName + "</h4>" +
                "   </div>" +
                "</div>"

            $(this).find('.uwQuestion').each(function(){
                reviewHTML = reviewHTML + getReviewHTMLFromQuestionContainer(this)
            })
        }




    })
    $('#review_UnderwritingQuestions').html(reviewHTML)
}
function getReviewHTMLFromQuestionContainer(questionContainer){
    var questionText = $(questionContainer).find('.questionText').html()
    var questionInputType = $(questionContainer).attr('data-inputtype')
    var questionAnswer = ""
    var questionReviewHTML = ""

    //FIND ANSWERS FOR THIS QUESTION
    if(questionInputType === "radio"){
        $(questionContainer).find('input').each(function(){
            if($(this).is(':checked')){
                var optionLabelElement = $(this).closest('label.questionOptionLabel')
                var optionText = $(optionLabelElement).clone()    //clone the element
                    .children() //select all the children
                    .remove()   //remove all the children
                    .end()  //again go back to selected element
                    .text()

                questionAnswer = questionAnswer +
                    optionText + ", "
            }
        })
    }
    else if(questionInputType === "checkbox"){
        $(questionContainer).find('input').each(function(){
            if($(this).is(':checked')){
                var optionLabelElement = $(this).closest('label.questionOptionLabel')
                var optionText = $(optionLabelElement).clone()    //clone the element
                    .children() //select all the children
                    .remove()   //remove all the children
                    .end()  //again go back to selected element
                    .text()

                questionAnswer = questionAnswer +
                    optionText + ", "
            }
        })
    }
    else if(questionInputType === "multiColumnInput") {
    }
    else{
        $(questionContainer).find('input').each(function(){
            //IF THE INPUTS VALUE IS NOT BLANK
            if($(this).val().trim().length !== 0){
                questionAnswer = questionAnswer + $(this).val() + ", "
            }
            else{
                //IF INPUT VALUE IS BLANK
                //SKIP
            }

        })
    }

    questionAnswer = removeTrailingComma(questionAnswer)

    if(questionAnswer.trim().length === 0){
        questionAnswer = "N/A"
    }

    questionReviewHTML = questionReviewHTML +
        "<div class='row reviewDataRow'>" +
        "   <div class='col-xs-4'>" +
        "       <span class='reviewData' style='font-weight:500'>" + questionText + "</span>" +
        "   </div>" +
        "   <div class='col-xs-8'>" +
        "       <span class='reviewDataAnswer'>" + questionAnswer + "</span>" +
        "   </div>" +
        "</div>"

    return questionReviewHTML
}
function buildTermsStringForAllProducts(){
    var productsArray = getProductsSelectedArray()
    var finalTermsString = ""

    for(var i=0;i<productsArray.length;i++){
        var productID = productsArray[i]
        var productObject = getProductObjectFromProductID(productID)

        var termsString = productObject.terms.trim()
        finalTermsString = finalTermsString + productObject.coverage + " - " + productID + "\n\n"
        finalTermsString = finalTermsString + termsString
        finalTermsString = finalTermsString + "\n\n\n\n"
    }

    return finalTermsString
}




//RISK TYPE AND CATEGORY HELPER FUNCTIONS
function getRiskTypeChosen() {
    var riskString = "";
    if (isRiskTypeSelected()) {
        if ($("li.active").children("a.riskOptionLink").hasClass('riskOptionDropdown')) {
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
    if (isRiskTypeSelected()) {
        category = $("li.active").closest('.drawerContainer').closest('.row').find('.media-heading').html().trim();
    }
    return category;
}
function getSelectedRiskTypeID(){
    var riskID
    if (isRiskTypeSelected()) {
        if ($("li.active").children("a.riskOptionLink").hasClass('riskOptionDropdown')) {
            riskID = $("li.active").children("a.riskOptionLink").find('.riskTypeDropdown').attr('data-riskTypeID')
        }
        else {
            riskID = $("li.active").children("a.riskOptionLink").attr('data-riskTypeID')
        }
    }
    return riskID
}
function getSelectedRiskCategoryID(){
    var categoryID = "";
    if (isRiskTypeSelected()) {
        categoryID = $("li.active").closest('.drawerContainer').closest('.row').find('.card.cardselected').attr('data-riskcategoryid').trim()
    }
    return categoryID;
}
function isRiskTypeSelected(){
    if( $('li.active').length > 0 ){
        if($('li.active').find('.riskOptionDropdown').length > 0 &&
            $('li.active').find('.riskTypeDropdown').val() === 'invalid'){
            return false
        }
        else{
            return true
        }

    }

    return ( $("li.active").length > 0 )
}
function setRiskTypeObject(rID){ //MIGHT BE POINTLESS
    //GET SELECTED RISK TYPE AND SET THE RISK TYPE OBJECT
    for(var i=0; i<riskTypes.length; i++){
        if(riskTypes[i].riskTypeCode === rID){
            riskTypeObject = riskTypes[i]
        }
    }
}
function getCurrentRiskTypeObject(){
    for(var i=0; i < riskTypes.length; i++ ){
        if(riskTypes[i].riskTypeCode === submission.riskTypeID()){
            return riskTypes[i]
        }
    }
}

//PRODUCT SELECTIONS

//IF A MANDATORY FIELD IS NOT VALID, RETURN FALSE
function isMandatoryQuestionsComplete_Product(){
    var isComplete = true
    $('.mandatoryForProduct').each(function(){
        if( validateThisInput(this) === "VALID" ){

        }
        else{
            isComplete = false
            return false
        }
    })

    return isComplete
}
function buildProductDisplayForRiskID(){
    var wrapperHTML = function(){
        var htmlString =
            "<div class='row'>" +
            "</div>"
        return htmlString
    }
    var leftContainerHTML = function(){
        var htmlString =
            "<div class='col-xs-4' id='productChoicesDiv' style='margin-top: 5px;'>" +
            "</div>"
        return htmlString
    }
    var coverageContainerHTML = function(){
        var htmlString =
            "<div class='form-group col-xs-12 EPKGDiv'>" +
            "</div>"
        return htmlString
    }
    var coverageCheckboxContainer = function(){
        var htmlString =
            "<div>" +
            "<p><input type='checkbox' class='coverageInput' name='coverage' id='EPKGcoverage'/> Entertainment Package" +
            "</p>" +
            "</div>"
        return htmlString
    }

    var coverageProductsContainer = function(){
        var htmlString =
            "<div class='form-group col-xs-12' style='padding-left: 40px; margin-top:-20px;' id='EPKGProductsDiv'>" +
            "</div>"
        return htmlString
    }

    var productsContainer = function(){
        var htmlString =
            "<div class='form-group col-xs-12' style='padding-left: 40px; margin-top:-20px;' id='EPKGProductsDiv'>" +
            "</div>"
        return htmlString
    }


    var coverageOptionsContainer = function(){
        var htmlString =
            "<div class='form-group col-xs-12' style='padding-left: 40px; margin-top:-20px;' id='EPKGProductsDiv'>" +
            "</div>"
        return htmlString
    }



    var rightContainerHTML = function(){
        var htmlString =
            "<div class='col-xs-8' id='coverageInfoDiv' style='margin-top: -33px;'>"
        return htmlString
    }


    //FIND RISK TYPE OBJECT
    // var productConditionsMap = jsonStringToObject( getCurrentRiskTypeObject().productConditions )
    var productConditionsMap = buildTestProductConditionsJSON()
    var productConditionsKeys = Object.keys(productConditionsMap)

    for(var i=0; i<productConditionsKeys.length; i++){
        var coverage = productConditionsKeys[i]
        var productsForCoverageMap = productConditionsMap[coverage]
        console.log(productsForCoverageMap)

    }
}




//RETURN INT OF CURRENT STEP
function getCurrentStep(){
    return parseInt( $('.btn-circle.btn-primary').html() )
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

    if(getCurrentOperationTypeObject()){
        buildPremiumLinesForEachCoverage()
    }

}
/*************************************************/





function nextButtonStep1ClickActionBACKUP(){
    //IF STARTING FORM OVER LOCK ALL THE OTHER STEPS
    $('#buttonCircleStep2').attr('disabled', 'disabled');
    $('#buttonCircleStep3').attr('disabled', 'disabled');
    $('#buttonCircleStep4').attr('disabled', 'disabled');

    //SHOW SAVE BUTTON
    $('#saveProgress').css('display', '');

    //RESET CURRENT STEP TO 1
    currentStep = 1;

    //RESET BOR
    BORrequested = false;
    $('#BORRequestNotification').css('display', "none");

    if (isRiskTypeSelected()) {
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
            //TEMPORARY REDIRECT TO LEGACY NEEIS
            if(true){
                window.location.href = "http://www.neeis.com/submissions/new"
            }
            else{
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

        }
        else if (riskChosen.indexOf("Film Projects") > -1) {
            $('#totalBudgetConfirmGroup').css('display', '');

            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
            head.appendChild(script);
            script.onload = function () {
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

function keyPressChecker(e){
    if (e.keyCode == 13) {
        if ($('#alertMessageModal').hasClass('in')) {
            $('#alertMessageModal').modal('hide');
        }
    }
}
