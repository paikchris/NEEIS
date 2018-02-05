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
var step2LogicIsRunning = false;



//DATA OBJECTS
var riskTypeObject = {}
var riskTypes, riskCategories, products, productConditions, operations, coverages, questions, questionCategories,
    ratingBasisArray, rates, conditionBasisArray
var riskTypeString
var submission = new Submission()
var productOptions = {}
var savedProductOptionCheckboxes =[]
var savedProductsSelected = []


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
    rateSheets = rS
    conditionBasisArray = cB
    ruleEngineObjects = rO
    versionMode = vM
    wcRates = wC


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
    $(document.body).on('change', '#operationCategoryDropdown', function(e) {
        operationCategorySelectAction(this)
    });
    $(document).on('change', '#operationsDropdown', function () {
        // operationDropdownChange(this);
        step2Logic()
    });


    //LISTEN TO COVERAGE CHECKBOXES CHANGING
    $(document).on('change', '.coverageCheckbox', function () {
        // coverageCheckboxChangeAction(this);
        step2Logic()
    })

    $(document).on('change', '.packageCoverageCheckbox', function () {
        // packageCoverageCheckboxChangeAction(this);
        step2Logic()
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
    $(document).on('change', 'div.requiredQuestion input, div.requiredQuestion select', function () {
        //THIS CHANGED INPUT MAY HAVE CHANGED PRODUCTS, UPDATE AND RECHECK ALL QUESTIONS

        step2Logic()
    });

    //LIMIT RATING BASIS LIMIT INPUTS
    $(document).on('change', 'div#limitsDeductiblesContainer input.limitValue', function () {
        //IF LIMIT INPUT CHANGES, RERATE PRODUCTS
        if(isReadyToRatePremiums()){
            updateDeductiblesBasedOnLimitInputs()
            calculatePremiumsAndFillContainer()
            showPremiumRateContainer()
        }
    });

    $(document).on('change', '.productOptionCheckbox', function () {
        productOptionCheckboxChangeAction(this)
    });

    //PRODUCT CARD CAROUSEL LISTENERS
    $(document).on('click', '.productCard', function () {
        productCardClickAction(this)
    });


    //WHEN THE STATE CHANGES IN STEP 3, UPDATE PREMIUMS FOR TAX
    $(document).on('focusout', '#stateMailing', function () {
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
    scrollToTopOfPage()
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
function getInsuredMailingState(){
    return $('#stateMailing').val()
}

///////////////////STEP 2 -OPERATION, COVERAGE FUNCTIONS///////////////////
function step2Logic(){
    if(step2LogicIsRunning === false){
        try{
            step2LogicIsRunning = true

            //IS OPERATION CHOSEN
            if(isOperationTypeChosen()){
                showOperationDescription()
                showCovAndQuestionsContainer()
                runRulesForOperation()
            }
            else{
                hideOperationDescription()
                hideCovAndQuestionsContainer()
                clearCoveragesAvailableSection()
                hideCoveragesAvailableSection()
                clearRequiredQuestions()
                return false
            }

            if(isPolicyTermQuestionsComplete()){
                runRulesForOperation()
            }
            else{
                clearRequiredQuestions()
                return false
            }


            //IS COVERAGE CHECKBOXES READY TO BE SHOWN
            if(isCoveragesSectionReadyToBeShown()){
                var checkboxCheckedMap = saveCoverageCheckboxesChecked()
                buildCoveragesAvailableSection()
                recheckCoverageCheckboxes(checkboxCheckedMap)
                showCoveragesAvailableSection()
                runRulesForOperation()
                // updateRequiredQuestions()
            }
            else{
                clearCoveragesAvailableSection()
                hideCoveragesAvailableSection()

                clearProductCardContainers()
                hideProductCardContainers()

                clearLimitDeductContainer()
                hideLimitDeductContainer()

                hidePremiumRateContainer()
                return false
            }



            //CHECK IF READY TO SHOW PRODUCTS CAROUSEL
            if(isReadyToShowAvailableProducts()){
                savedProductsSelected = saveProductCardSelections()
                clearProductCardContainers()
                buildProductCardContainers()
                resetProdOptionsArray()
                runRulesForOperation()
                buildAndInsertProductCards()
                refillSelectedProductCards(savedProductsSelected)
                showProductCardContainers()
                $('.productCarousel').carousel({
                    interval: false
                })
            }
            else{
                clearProductCardContainers()
                hideProductCardContainers()

                clearLimitDeductContainer()
                hideLimitDeductContainer()

                hidePremiumRateContainer()
                return false
            }

            //CHECK IF LIMITS AND DEDUCTS IS READY
            if(isReadyToShowLimitAndDeducts()){
                fillLimitDeductContainer()

                showLimitDeductContainer()
            }
            else{
                clearLimitDeductContainer()
                hideLimitDeductContainer()
                return false
            }


            //CHECK IF READY TO RATE PREMIUMS AND SHOW PREMIUMS
            if(isReadyToRatePremiums()){
                calculatePremiumsAndFillContainer()
                showPremiumRateContainer()
            }
            else{
                hidePremiumRateContainer()
                return false
            }


        }
        finally{
            step2LogicIsRunning = false
        }
    }

}

///////////////////STEP 2 -PRODUCT FUNCTIONS///////////////////
function isReadyToShowAvailableProducts(){
    if(isAllRequiredQuestionsComplete() && getCoveragesSelectedArray().length > 0){
        return true
    }
    else{
        return false
    }
}
function isAllRatingQuestionsOnPage(){
    var coveragesSelected = getCoveragesSelectedArray()

    for(var i=0;i<coveragesSelected.length;i++){
        var covID = coveragesSelected[i]

        var productOptionsForCov = productOptions[covID]

        for(var j=0;j<productOptionsForCov.length;j++){
            var productObject = productOptionsForCov[j]
            var rateID = productObject.rateCode
            var rateObject = getRateObjectByID(rateID)
            var ratingBasisID = rateObject.rateBasis
            var ratingBasisObject = getRatingBasisObjectByID(ratingBasisID)

            if( doesQuestionExistOnPage(ratingBasisObject.questionID) === false ){
                return false
            }
        }
    }

    return true
}
function getProductPremiumMoreInfoHTML(){
    var htmlString = "" +
        "       <div class='col-xs-12 productPremiumFooter' data-premiumvalue='INFO'>" +
        "           <span class='productCardPremiumSpan'> More Info Needed </span>" +
        "       </div>"

    return htmlString
}
function getPremiumPreviewHTML(productObject){
    var premiumPreviewHTML

    var premiumVal = calculateProductOptionPremium(productObject)

    premiumPreviewHTML = "" +
        "       <div class='col-xs-12 productPremiumFooter' data-premiumvalue='" + premiumVal + "'>" +
        "           <span class='productCardPremiumSpan'>" + formatMoney(premiumVal) + "</span>" +
        "       </div>"

    return premiumPreviewHTML
}
function updateProductCardPremium(covID, productID){
    //RECALCULATE A PRODUCT CARDS PREMIUM BASED ON OPTIONS SELECTED ON PAGE

    var productCardElement = $('#productCarousel_' + covID).find('.productCard[data-productid="' + productID + '"]')
    var productOptionObject = getProductOptionObject(covID, productID)

    $(productCardElement).find('.productPremiumFooter').replaceWith( $(getPremiumPreviewHTML(productOptionObject)) )


}
function getProductCardHTML(productObject, index){
    var premiumPreviewHTML

    if( canProductPremiumCalculate(productObject) ){
        premiumPreviewHTML = getPremiumPreviewHTML(productObject)

    }
    else{
        premiumPreviewHTML = getProductPremiumMoreInfoHTML()
    }

    var htmlString = "" +
        "<div class='col-md-4'>" +
        "   <div class='productCard' data-productid='" + productObject.productID + "'>" +
        "       <div class='col-xs-12 productIDHeader'>" +
        "           <span class='productIDSpan'>Option " + index + "</span>" +
        "       </div>" +
        "       <div class='col-xs-12 productShortDescriptionDiv'>" +
        "           <span class='productShortDescription'>" + (productObject.shortDescription ? productObject.shortDescription : "") + "</span>" +
        "       </div>" +
        "       <div class='col-xs-12 productTermLengthContainer'>" +
        "           <span>Term Length</span>" +
        "       </div>" +
        "       <div class='col-xs-12 hiddenCardInfo'>" +
        "           <span class=''>" + productObject.productID + ", " + productObject.riskCompanyID + "</span>" +
        "       </div>" +
                    premiumPreviewHTML +
        "   </div>" +
        "</div>"

    return htmlString
}
function getNewCarouselItemRow(){
    var htmlString = "" +
        "<div class='item'>" +
        "   <div class='productGroup'>" +
        "   </div>" +
        "</div>"

    return htmlString
}
function getNewCarouselIndicatorHTML(carouselID, index){
    var htmlString = "" +
        "<li data-target='#" + carouselID + "' data-slide-to='" + index + "'></li>"

    return htmlString
}
function addProductCardToDisplay(prodOptionObject){
    var productCardContainerCovID

    if(prodOptionObject){
        if(prodOptionObject.coverage){
            productCardContainerCovID = prodOptionObject.coverage
        }
        else{
            productCardContainerCovID = prodOptionObject.coverage
        }

        var productCardContainer = $('#productCardContainer_' + productCardContainerCovID)
        var carouselID = $(productCardContainer).find('.carousel').attr('id')
        var productCarouselInner = $(productCardContainer).find('.carousel-inner')
        var cardCount = $(productCardContainer).find('.productCard').length


        if(cardCount%3 === 0){
            $(productCarouselInner).append( $(getNewCarouselItemRow()) )
        }

        var productCard = $(getProductCardHTML(prodOptionObject, cardCount + 1 ))
        var carouselItemRow = $(productCarouselInner).find('.item').children('.productGroup').last()
        $(carouselItemRow).append( $(productCard) )

        //UPDATE INDICATORS
        var carouselIndicatorContainer = $(productCardContainer).find('.carousel-indicators')
        var indicatorsCount = $(carouselIndicatorContainer).find('li').length
        var itemRowCount = $(productCarouselInner).find('.item').length

        if(itemRowCount > indicatorsCount){
            $(carouselIndicatorContainer).append( $(getNewCarouselIndicatorHTML(carouselID, itemRowCount-1)))
        }
    }
    else{
        //PRODUCT OBJECT DOESN'T EXIST, MAY BE INACTIVE
    }

}
function saveProductCardSelections(){
    return getSelectedProductsAndCoveragesMap()

}
function refillSelectedProductCards(savedProductsSelected){
    var coveragesSelected = getCoveragesSelectedArray()

    for(var i=0;i<coveragesSelected.length;i++){
        var covID = coveragesSelected[i]

        //CHECK IF THERE WAS A PREVIOUSLY SELECTED PRODUCT.
        if(savedProductsSelected[covID]){
            var productID = savedProductsSelected[covID]
            //FIND THE CAROUSEL FOR COVERAGE ID,
            var productCarouselElement = $('#productCarousel_' + covID)


            //MARK PRODUCT CARD ACTIVE IF PRODUCT IS STILL AN OPTION
            var productCardElement = $(productCarouselElement).find(".productCard[data-productid='" + productID + "']")
            if( $(productCardElement).length > 0){
                $(productCardElement).addClass('active')

                //MARK THE ITEM ROW ACTIVE
                $(productCarouselElement).find('.item.active').removeClass('active')
                $(productCardElement).closest('.item').addClass('active')
            }


        }
    }
}
function buildProductCardContainers(){
    var coverages = getCoveragesSelectedArray()
    var allProductCardsContainer = $('#productCardsContainer')
    $(allProductCardsContainer).empty()

    for(var i=0;i<coverages.length;i++){
        var covID = coverages[i]
        var carouselID = "productCarousel_" + covID

        var htmlString = "" +
            // "<div class='row' id='productCardContainer_" + covID + "'>" +
            // "</div>"
            "<div class='row productCardContainer' id='productCardContainer_" + covID + "' data-covid='" + covID + "'>" +
            "   <div class='col-xs-12 carousel-header'>" +
            "       <label>" + covID + "</label>" +
            "   </div>" +
            "   <div class='col-md-12'>" +
            "       <div id='" + carouselID + "' class='productCarousel carousel slide'>" +
            "           <ol class='carousel-indicators'>" +
            "               <li data-target='#" + carouselID + "' data-slide-to='0' class='active'></li>" +
            "           </ol>" +

            "           <div class='carousel-inner'>" +
            "           </div><!--.carousel-inner-->" +

            "           <a data-slide='prev' href='#" + carouselID + "' class='left productCarousel carousel-control'>‹</a>" +
            "           <a data-slide='next' href='#" + carouselID + "' class='right productCarousel carousel-control'>›</a>" +
            "       </div><!--.Carousel-->" +

            "   </div>" +
            "</div>"

        var productCardContainer_Coverage = $(htmlString)

        $(allProductCardsContainer).append( $(productCardContainer_Coverage) )
    }
}
function buildAndInsertProductCards(){
    var covArray = getCoveragesSelectedArray()

    for(var i=0;i<covArray.length;i++){
        var covID = covArray[i]
        var prodOptionsForCoverage = Object.keys(productOptions[covID])

        for(var p=0;p<prodOptionsForCoverage.length;p++){
            var productID = prodOptionsForCoverage[p]
            var prodOptionObject = productOptions[covID][productID]
            addProductCardToDisplay(prodOptionObject)
        }

        //SET FIRST IN CAROUSEL TO ACTIVE
        var productCarouselContainer = $('#productCarousel_' + covID)
        var firstCarouselItem = $(productCarouselContainer).find('.item').first()
        $(productCarouselContainer).find('.item').removeClass('active')
        $(firstCarouselItem).addClass('active')
    }
}
function clearProductOptionsMap(){
    productOptions = {}
}
function resetProdOptionsArray(){
    clearProductOptionsMap()

    var covArray = getCoveragesSelectedArray()

    for(var i=0;i<covArray.length;i++){
        var covID = covArray[i]
        productOptions[covID] = {}
    }
}
function addProductOption(productObject){
    var prodObjectClone = JSON.parse(JSON.stringify(productObject))

    if(productOptions[prodObjectClone.coverage]){
        productOptions[prodObjectClone.coverage][prodObjectClone.productID] = prodObjectClone

    }
}
function addProductOption_SpecificCovID(productObject, covID){
    var prodObjectClone = JSON.parse(JSON.stringify(productObject))
    prodObjectClone.coverage = covID

    if(productOptions[covID]){
        productOptions[covID][prodObjectClone.productID] = prodObjectClone
    }

}
function showProductCardContainers(){
    $('#productCardsContainer').css('display','')
}
function hideProductCardContainers(){
    $('#productCardsContainer').css('display','none')
}
function clearProductCardContainers(){
    $('#productCardsContainer').empty()
}
function updateRateForProductOption(coverageID, productObject, rateID){
    // var prodOptionsForCoverageArray = productOptions[coverageID]
    //
    // if(prodOptionsForCoverageArray){
    //     for(var i=0;i<prodOptionsForCoverageArray.length;i++){
    //         if(prodOptionsForCoverageArray[i].productID === productObject.productID){
    //             prodOptionsForCoverageArray[i].rateCode = rateID
    //         }
    //     }
    // }
    if(productOptions[coverageID]){
        productOptions[coverageID][productObject.productID].rateCode = rateID
    }


}
function productCardClickAction(productCardElement){

    //IF THE CARD CLICK IS ALREADY ACTIVE MAKE IT INACTIVE.
    if($(productCardElement).hasClass('active')){
        $(productCardElement).removeClass('active')

    }
    else{
        $(productCardElement).closest('.carousel-inner').find('.productCard.active').removeClass('active')
        $(productCardElement).addClass('active')
    }

    step2Logic()

}
function getProductOptionObject(covID, productID){
    var prodOptionObject = productOptions[covID][productID]

    return prodOptionObject
}

//OPERATION CATEGORY
function isOperationTypeChosen(){
    var selectedOperation = getSelectedOperationID()

    if(selectedOperation === 'invalid' || selectedOperation.trim().length === 0){
        return false
    }
    else{
        return true
    }
}
function operationCategorySelectAction(input){
    if($(input).val() === "invalid"){
        disableOperationTypeDropdown()
        resetOperationTypeDropdown()

    }
    else{
        enableOperationTypeDropdown()
        fillOperationTypeDropdown()
        resetOperationTypeDropdown()
    }
}
function disableOperationTypeDropdown(){
    //DISABLE
    $( "#operationsDropdown" ).prop( "disabled", true )
    $( "#operationsDropdown" ).closest('div.form-group').find('label').css( "color", '#808080c9')

}
function enableOperationTypeDropdown(){
    //HIDE
    $( "#operationsDropdown" ).prop( "disabled", false );
    $( "#operationsDropdown" ).closest('div.form-group').find('label').css( "color", '#333')


}
function resetOperationTypeDropdown(){
    //RESET OPTION
    $('#operationsDropdown').val('invalid')
    $('#operationsDropdown').trigger('change')
}
function fillOperationTypeDropdown(){
    var selectedCategory = getSelectedOperationCategory()
    if(selectedCategory !== 'invalid'){
        var categoryOperationArray
        if(selectedCategory === 'ALL'){
            categoryOperationArray = operations
        }
        else{
            categoryOperationArray = getArrayOfOperationsForCategory(selectedCategory)
        }


        var optionHTML = "<option value='invalid'>Select One</option>"
        for(var i=0;i<categoryOperationArray.length;i++){
            var thisOperation = categoryOperationArray[i]
            optionHTML = optionHTML + "<option value='" + thisOperation.operationID + "'>" + thisOperation.description + "</option>"
        }

        $('#operationsDropdown').html(optionHTML)
    }
    else{
        var optionHTML = "<option value='invalid'>Select One</option>"

        $('#operationsDropdown').html(optionHTML)
    }
}
function hideOperationDescription(){
    $('#operationDescriptionContainer').css('display', 'none')
}
function showOperationDescription(){
    $('#operationDescriptionContainer').css('display', '')
}
function getSelectedOperationCategory(){
    return $('#operationCategoryDropdown').val()
}
function getArrayOfOperationsForCategory(categoryString){
    var operationArrayForCategory = []
    for(var i=0; i<operations.length; i++){
        var thisOperationMap = operations[i]
        var thisDescription = thisOperationMap.description

        //IF OPERATION HAS A CATEGORY
        if(thisDescription.indexOf(' - ') > -1){
            var thisCategory = thisDescription.split(' - ')[0]

            if(thisCategory === categoryString){
                operationArrayForCategory.push(thisOperationMap)
            }
        }
    }

    return operationArrayForCategory
}
//OPERATION TYPE
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

//POLCY TERM
function showCovAndQuestionsContainer(){
    $('#coveragesAndQuestionsContainer').css('display', '')
}
function hideCovAndQuestionsContainer(){
    $('#coveragesAndQuestionsContainer').css('display', 'none')
}


//COVERAGE FUNCTIONS
function isCoveragesSectionReadyToBeShown(){
    if(isAllRequiredQuestionsComplete_Global()){
        return true
    }
    else{
        return false
    }
}
function hideCoveragesAvailableSection(){
    showCoveragesAvailableNotReady()
    $('#coveragesAvailableContainer').css('display', 'none')
}
function showCoveragesAvailableSection(){
    $('#coveragesAvailableContainer').css('display', '')
    hideCoveragesAvailableNotReady()
}
function showCoveragesAvailableNotReady(){
    $('#coveragesAvailableContainer_NotReady').css('display', '')

}
function hideCoveragesAvailableNotReady(){
    $('#coveragesAvailableContainer_NotReady').css('display', 'none')

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
        var packageHTML = ""
        var coverageHeaderHTML = "<h4 style='font-size:20px'>Coverages</h4>"

        //BUILD PACKAGE CHECKBOXES FIRST
        packageHTML = packageHTML + getPackageCheckboxesForCoveragesSectionHTML()

        var coverageHTML = ""
        //BUILD OTHER COVERAGE CHECKBOXES
        if(coverageProductMapKeys.length > 0){
            var nonPackageCoverageCount = 0

            for(var i=0; i<coverageProductMapKeys.length; i++){
                var covID = coverageProductMapKeys[i]
                var coverageObject = getCoverageObject(covID)


                if(coverageObject.packageFlag === 'Y' && coveragePackageMap[covID]){
                }
                else{
                    nonPackageCoverageCount++
                    coverageHTML = coverageHTML + getCoverageOptionContainerRowHTML(covID)
                }

            }

            //GIVE COVERAGE SECTION HEADER IF THERE ARE COVERAGES
            if(nonPackageCoverageCount > 0){
                // coverageHTML = "<label>Coverages</label>" + coverageHTML
            }

            $('#coverageOptionsContainer').html( coverageHeaderHTML + packageHTML + coverageHTML)
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
function saveCoverageCheckboxesChecked(){
    var checkboxIDCheckedMap = {}
    $('#coveragesAvailableContainer').find('input:checkbox').each(function(){
        var checkboxID = $(this).attr('id')
        checkboxIDCheckedMap[checkboxID] = $(this).is(':checked')
    })

    return checkboxIDCheckedMap
}
function recheckCoverageCheckboxes(checkboxIDCheckedMap){
    var checkboxIDArray = Object.keys(checkboxIDCheckedMap)
    for(var i=0;i<checkboxIDArray.length;i++){
        var checkboxID = checkboxIDArray[i]
        var isChecked = checkboxIDCheckedMap[checkboxID]

        $('#' + checkboxID).prop('checked', isChecked)
    }
}
function moveCheckboxUnderCovID(covIDToMove, covID){
    var checkboxToMove = $('#' + covIDToMove + '_CoverageOptionContainer')

    //MOVE CHECKBOX TO UNDER TRIGGERING CHECKBOX
    $('#' + covID + '_CoverageOptionContainer').after($(checkboxToMove))

    //INDENT TARGET CHECKBOX
    $(checkboxToMove).css('margin-left', '10px')
}
function hideCoverageCheckboxByCovID(covID){
    $('#' + covID + '_CoverageOptionContainer').css('display', 'none')
    $('#' + covID + '_CoverageOptionContainer').find('input').prop('checked', false)
}
function showCoverageCheckboxByCovID(covID){
    $('#' + covID + '_CoverageOptionContainer').css('display', '')
}
function checkCoverageShowHideLogicAndShowHideCovCheckboxes(){
    var operationsObject = getCurrentOperationTypeObject()

    try{
        if(operationsObject.coverageShowMap){
            var operationShowHideMap = jsonStringToObject(operationsObject.coverageShowMap)
            var operationShowHideMapKeys = Object.keys(operationShowHideMap)

            //LOOP THROUGH OPERATION SHOW HIDE MAP
            for(var i=0;i<operationShowHideMapKeys.length;i++){
                var covID = operationShowHideMapKeys[i]
                var thisCovShowHideArray = operationShowHideMap[covID].showMap

                //EVALUATE SHOW HIDE ARRAY TO SEE IF SHOWN OR HIDDEN
                var showHideValue = evaluateLogicConditionArray(thisCovShowHideArray)
                if(showHideValue){
                }
                else{
                    showHideValue = "SHOW"
                }

                //SHOW OR HIDE THE CHECKBOX
                var coverageCheckboxElement = $('#' + covID + '_CoverageCheckbox')
                var coverageCheckboxContainer = $('#' + covID + '_CoverageOptionContainer')
                if(showHideValue === "SHOW"){
                    $(coverageCheckboxContainer).css('display', '')

                }
                else{
                    $(coverageCheckboxContainer).css('display', 'none')
                    $(coverageCheckboxElement).prop('checked', false)
                }



                //CHECK IF LOBSHOWMAP EXISTS
                if(operationShowHideMap[covID].lobShowMap){
                    var thisLOBShowHideMap = operationShowHideMap[covID].lobShowMap
                    var thisLOBShowHideMapKeys = Object.keys(thisLOBShowHideMap)

                    //LOOP THROUGH THE LOBS IN THE MAP
                    for(var j=0;j<thisLOBShowHideMapKeys.length;j++){
                        var lobID = thisLOBShowHideMapKeys[j]
                        var thisLOBShowHideArray = thisLOBShowHideMap[lobID]


                        //EVALUATE SHOW HIDE ARRAY TO SEE IF LOB IS SHOWN OR HIDDEN
                        var lobShowHideValue = evaluateLogicConditionArray(thisLOBShowHideArray)
                        if(lobShowHideValue){
                        }
                        else{
                            lobShowHideValue = "SHOW"
                        }

                        //SHOW OR HDE THE LOB CHECKBOX
                        var lobCheckboxElement = $('#' + covID + '_CoverageOptionContainer').find('.' + lobID + '_packageCoverageCheckbox')
                        var lobCheckboxContainer = $(lobCheckboxElement).parent('label')
                        if(lobShowHideValue === "SHOW"){
                            $(lobCheckboxContainer).css('display', '')

                        }
                        else{
                            $(lobCheckboxContainer).css('display', 'none')
                            $(lobCheckboxElement).prop('checked', false)
                        }
                    }
                }


            }
        }
    }
    catch(e){
        alert("error")
    }
}
function getPackageCheckboxesForCoveragesSectionHTML(){
    var operationsObject = getCurrentOperationTypeObject()
    var htmlString = ""

    if(operationsObject.coveragePackageMap){
        var coveragePackageMap = JSON.parse(operationsObject.coveragePackageMap)

        var packageIDs = Object.keys(coveragePackageMap)

        // htmlString = htmlString +
            // "<label>Packages</label>"

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
        "<div class='coverageQuestionsContainer hiddenContainer' style='display:none;margin-bottom:10px'> "

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
    // updateRequiredQuestions()
    //
    // // updateAdditionalOptions()
    //
    // //IF THIS COVERAGE IS ALREADY CHECKED IN A PACKAGE OR ELSEWHERE, UNCHECK TO AVOID DUPLICATES
    // removeDuplicateCoveragesAndPackageLOBS(checkbox)
    //
    // //IF AT LEAST TWO COVERAGES ARE CHECKED THAT ARE IN A PACKAGE, ASK IF THEY WANT TO PACKAGE
    //
    //
    // if(isReadyToShowLimitAndDeducts()){
    //     fillLimitDeductContainer()
    //     showLimitDeductContainer()
    //
    //     //PREMIUM ONLY DISPLAYS IF LIMITS AND DEDUCTS SHOW CORRECTLY
    //     if(isReadyToRatePremiums()){
    //         calculatePremiumsAndFillContainer()
    //         showPremiumRateContainer()
    //     }
    //     else{
    //
    //     }
    // }
}
function packageCoverageCheckboxChangeAction(checkbox){
    var isValid = true

    //FIRST CHECK IF THIS IS A PACKAGE ADD ON COVERAGE, ADD ON COVERAGES MUST HAVE A PRIMARY LOB SELECTED FIRST
    var packageContainerForCheckboxes = $(checkbox).closest('.coverageQuestionsContainer')
    var packagePrimaryLOBCheckboxes = $(packageContainerForCheckboxes).find('.packageCoverageCheckbox:not(.packageAddOnCheckbox):checked')
    var packageAddOnLOBCheckboxes = $(packageContainerForCheckboxes).find('.packageAddOnCheckbox:checked')

    if( $(packageAddOnLOBCheckboxes).length > 0 ){
        if( $(packagePrimaryLOBCheckboxes).length === 0 ){
            alert("Please select a primary coverage first")
            isValid = false;
            $(packageAddOnLOBCheckboxes).prop('checked', false)
            $(packageAddOnLOBCheckboxes).trigger('change')
        }
    }

    if(isValid){
        //IF THERE ARE LIMIT INPUT VALUES, REMEMBER THE VALUES AND REFILL
        var limitInputValues = {}
        $('div.limitColumn input.limitValue').each(function(){
            var thisLimitInputValue = $(this).val()
            var thisLimitInputDescription = $(this).attr('data-limitdescription')
            limitInputValues[thisLimitInputDescription] = thisLimitInputValue
        })

        // updateRequiredQuestions()
        //IF THIS COVERAGE IS ALREADY CHECKED IN A PACKAGE OR ELSEWHERE, UNCHECK TO AVOID DUPLICATES
        removeDuplicateCoveragesAndPackageLOBS(checkbox)



        if(isReadyToShowLimitAndDeducts()){
            fillLimitDeductContainer()
            showLimitDeductContainer()

            // REFILL LIMIT INPUT VALUES
            $('div.limitColumn input.limitValue').each(function(){
                var thisLimitInputDescription = $(this).attr('data-limitdescription')
                var thisLimitInputValue = limitInputValues[thisLimitInputDescription]

                $(this).val(thisLimitInputValue)
            })
            updateDeductiblesBasedOnLimitInputs()


            //PREMIUM ONLY DISPLAYS IF LIMITS AND DEDUCTS SHOW CORRECTLY
            if(isReadyToRatePremiums()){
                calculatePremiumsAndFillContainer()
                showPremiumRateContainer()
            }
            else{

            }
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
function productOptionCheckboxChangeAction(checkboxElement){
    var limitDescription = $(checkboxElement).attr('data-limitdescription').trim()
    var productID = $(checkboxElement).attr('data-productid')
    var covID = $(checkboxElement).attr('data-covid')

    if( $(checkboxElement).is(':checked') ){
        //1. CHECK IF LIMIT NEEDS TO BE ADDED
        var newLimitValue = $(checkboxElement).attr('data-limitvalue')
        if(limitDescription.length > 0){
            //IF THERE IS A LIMIT DESCRIPTION, CHECK TO SEE IF IT ALREADY EXISTS, IF IT EXISTS EDIT IT. IF IT DOESN'T, CREATE A NEW LINE
            if(   $('.' + productID + '_LimitRow_LimitDescription[data-limitdescription="' + limitDescription + '"').length  > 0   ){
                var limitValueElement = $('.' + productID + '_LimitRow_LimitValue[data-limitdescription="' + limitDescription + '"')

                $(limitValueElement).val(newLimitValue)
            }
            else{
                var newLimitLineHTML = "" +
                    "<div class='row limitRow " + productID + "_LimitRow' data-limitdescription='" + limitDescription + "'>" +
                    "   <div class='col-xs-4'>" +
                    "       <span class='limitValue " + productID + "_LimitRow_LimitValue' " +
                    "           data-limitdescription='" + limitDescription + "'>" + newLimitValue + "</span>" +
                    "   </div>" +
                    "   <div class='col-xs-8'>" +
                    "       <span class='limitDescription " + productID + "_LimitRow_LimitDescription' " +
                    "           data-limitdescription='" + limitDescription + "'>" + limitDescription + "</span>" +
                    "   </div>" +
                    "</div>"

                $('#' + covID + '_LimDeductColumnsContainer .limitColumn').append( $(newLimitLineHTML) )

            }
        }

        //CHECK IF EXISTING LIMIT VALUE NEEDS TO CHANGE
        if( $(checkboxElement).attr('data-limitdescriptionchange').trim().length > 0 ){
            var limitDescChange = $(checkboxElement).attr('data-limitdescriptionchange').trim()
            var limitValueChange = $(checkboxElement).attr('data-limitvaluechange').trim()

            $('.' + productID + '_LimitRow_LimitValue[data-limitdescription="' + limitDescChange + '"').html(limitValueChange)
        }




        //UPDATE PREMIUMS
        var productObject = getProductOptionObject(covID, productID)
        var limitArray = jsonStringToObject( productObject.limitArray )
        var testPremium = calculateProductOptionPremium(productObject)
        calculatePremiumsAndFillContainer()
        updateProductCardPremium(covID,productID)
    }
    else{
        //FIND THE LIMIT LINE IF IT EXISTS
        if( $('.' + productID + '_LimitRow[data-limitdescription="' + limitDescription + '"').length > 0 ){
            $('.' + productID + '_LimitRow[data-limitdescription="' + limitDescription + '"').remove()
        }

        //RECALCULATE PREMIUMS
        calculatePremiumsAndFillContainer()
        updateProductCardPremium(covID,productID)


    }
}
function saveProductOptionCheckboxes(){
    savedProductOptionCheckboxes = []

    $('.productOptionCheckbox').each(function(){
        if( $(this).is(':checked') ){
            savedProductOptionCheckboxes.push( $(this).attr('id') )
        }
    })

    return savedProductOptionCheckboxes
}
function reCheckProductOptionCheckboxes(savedCheckboxIDArray){
    for(var i=0;i<savedCheckboxIDArray.length;i++){
        var elementID = savedCheckboxIDArray[i]

        $('#'+elementID).prop('checked')
    }
}
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
        var availableProducts = ""

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
                        //IF THIS LOB IS A ADD ON, (MUST HAVE A LOB CHOSEN ALREADY)
                        if(packageCoverageMap.addOnFlag === "Y"){
                            addOnPackageHTML = addOnPackageHTML + "" +
                                "<div class='row'>" +
                                "   <div class='col-xs-12'>" +
                                "       <label class='checkboxVerticalLayout' style='margin-left:36px; font-size:11px'>" +
                                "           <input type='checkbox' class='packageCoverageCheckbox packageAddOnCheckbox " + packageCoverageID + "_packageCoverageCheckbox' " +
                                "               data-covid='" + packageCoverageID + "' " +
                                "               data-requiredflag='" + packageCoverageMap.requiredFlag + "' "

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
                                "           <input type='checkbox' class='packageCoverageCheckbox " + packageCoverageID + "_packageCoverageCheckbox' " +
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

                //ADD COVERAGE SECTION HEADER
                if(coverageRowHTML.trim().length > 0){
                    coverageRowHTML = "" +
                        "<div class='row' style=' margin-top: 0px; margin-bottom: 3px;'>" +
                        "   <div class='col-xs-12'>" +
                        "       <span style='margin-left: 22px; font-size: 11px; font-weight: 500;'>Coverages</span>" +
                        "   </div>" +
                        "</div>" +
                        coverageRowHTML
                }

                //FORMAT LOB ADD ON SECTION
                if(addOnPackageHTML.trim().length > 0){
                    addOnPackageHTML = "" +
                        "<div class='row' style=' margin-top: 0px; margin-bottom: 3px;'>" +
                        "   <div class='col-xs-12'>" +
                        "       <span style='margin-left: 22px; font-size: 11px; font-weight: 500;'>Add On Coverages</span>" +
                        "   </div>" +
                        "</div>" +
                        addOnPackageHTML
                }

            }
        }

        //ADDITIONAL PRODUCT OPTION CHECKBOXES
        if(getProductIDForCoverage(covID) !== null && getProductIDForCoverage(covID) !== undefined){
            var productID = getProductIDForCoverage(covID)
            var productObject = getProductOptionObject(covID, productID)

            if(productObject){
                if(productObject.additionalOptionsArray !== null && productObject.additionalOptionsArray !== undefined  ){
                    var additionalOptionsArray = JSON.parse(productObject.additionalOptionsArray)

                    //ADD PRODUCT OPTIONS HEADER
                    if(additionalOptionsArray.length > 0){
                        additionalOptionsHTML = "" +
                            "<div class='row' style=' margin-top: 0px; margin-bottom: 3px;'>" +
                            "   <div class='col-xs-12'>" +
                            "       <span style='margin-left: 22px; font-size: 11px; font-weight: 500;'>Additional Options</span>" +
                            "   </div>" +
                            "</div>" +
                            additionalOptionsHTML
                    }


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


        $('#' + covID + '_CoverageOptionContainer').find('.hiddenContainer').html(coverageRowHTML + addOnPackageHTML + additionalOptionsHTML  )

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
    var coveragesSelected = getCoveragesSelectedArray()

    for(var i=0;i<coveragesSelected.length; i++){
        var covID = coveragesSelected[i]
        var productID = getProductIDForCoverage(covID)
        var productObject = getProductOptionObject(covID, productID)


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
function getAllProductsFromLogicArray(logicArray){
    var outputIDArray = []
    for(var i=0;i<logicArray.length;i++){
        var thisLogicRow = logicArray[i]
        if(thisLogicRow.subLogic.length === 0){
            outputIDArray.push(thisLogicRow.outputID)
        }
        else{
            var subLogicOutputIDArray = getAllProductsFromLogicArray(thisLogicRow.subLogic)
            outputIDArray = outputIDArray.concat(subLogicOutputIDArray)
        }
    }

    return outputIDArray
}


//STEP 2 QUESTION FUNCTIONS
function getCoverageQuestionSectionHTML(covID){
    var htmlString = "" +
        "<div class='row col-xs-12 questionsForCoverageSection " + covID + "_questionsForCoverageSection' " +
        "   data-covid='" + covID + "'" +
        "   style='display:none'" +
        "   >" +
        "   <div class='row col-xs-12 " + covID + "_productLogicQuestions' " +
        "       data-covid='" + covID + "'" +
        "   >" +
        "   <div class='col-xs-12 header'>" +
        "       <span>" + covID + "</span>" +
        "   </div>" +
        "   </div>" +
        "   <div class='row col-xs-12 " + covID + "_ratingLogicQuestions' " +
        "       data-covid='" + covID + "'" +
        "       style='display:none'" +
        "   >" +
        "   <div class='col-xs-12 header'>" +
        "       <span>" + covID + " Rating </span>" +
        "   </div>" +
        "   </div>" +
        "</div>"

    return htmlString
}

//PRODUCT CONDITION AND RATING BASIS REQUIRED QUESTIONS SECTION
function clearRequiredQuestions(){
    $('#ratingBasisRequiredQuestionsContainer').empty()
    $('.questionsContainer').empty()
}
function updateRequiredQuestionsBACKUP(){
    var operationsObject = getCurrentOperationTypeObject()

    //SAVE ANSWERS TO REFILL LATER FOR SAME QUESTIONS
    var questionAnswers = {}
    $('div.requiredQuestion input, div.requiredQuestion select').each(function(){
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

    //REMEMBER QUESTION ORDER
    var questionOrder = []
    $('div.requiredQuestion').each(function(){
        var qID = $(this).attr('data-questionid')
        if(qID && qID.trim().length > 0){
            questionOrder.push(qID)
        }
    })


    //GET COVERAGES CHECKED
    var allCoveragesPackagesArray = getCoveragesAndPackagesSelectedArray()

    //GET PRODUCT CONDITION QUESTIONS FOR COVERAGES CHECKED
    if(getCurrentOperationTypeObject().requiredQuestionsMap){
        var operationObject = getCurrentOperationTypeObject()
        var operationProductConditionRequirdQuestionsMap = jsonStringToObject(operationObject.requiredQuestionsMap)

        //CHECK FOR ANY MISSING QUESTIONS FOR PRODUCT CONDITION, PRODUCT REQUIRED QUESTIONS AND RATING REQUIRED QUESTIONS
        var coverageProductMap = jsonStringToObject(operationObject.coverageProductMap)

        // var additionalRequiredQuestionsMap = jsonStringToObject(getRequiredQuestionsForProductLogicConditions(coverageProductMap))
        var additionalRequiredQuestionsMap = jsonStringToObject(getRequiredQuestionsForCoveragesSelected(coverageProductMap))
        var showHideQu
        var productRequiredQuestionsArray = []

        //REMOVE ALL QUESTIONS
        clearRequiredQuestions()

        //COMBINE ALL REQUIRED QUESTIONS
        var requiredQuestionsForCoveragesCheckedArray = []
        var questionToCovIDMap = {}

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
                    questionToCovIDMap[thisCovRequiredQuestionsArray[j]] = thisCovID
                }
            }
        }

        //ADD SHOW HIDE LOGIC QUESTIONS
        if(getCurrentOperationTypeObject().coverageShowMap){
            var showHideMap = jsonStringToObject( getCurrentOperationTypeObject().coverageShowMap )
            var showHideMapKeys = Object.keys(showHideMap)

            for(var i=0;i<showHideMapKeys.length;i++){
                var thisCovID = showHideMapKeys[i]
                var thisCovShowHideArray = showHideMap[thisCovID].showMap
                var coverageShowHideQuestions = getRequiredQuestionsForLogicConditionArray(thisCovShowHideArray)

                requiredQuestionsForCoveragesCheckedArray = requiredQuestionsForCoveragesCheckedArray.concat(coverageShowHideQuestions)
                //CHECK IF LOB SHOW MAP EXISTS, IF IT DOES LOOP THROUGH AND GET QUESTIONS FOR IT
                if(showHideMap[thisCovID].lobShowMap){
                    var lobShowHideMap = showHideMap[thisCovID].lobShowMap
                    var lobShowHideMapKeys = Object.keys(lobShowHideMap)

                    for(var j=0;j<lobShowHideMapKeys.length;j++){
                        var thisLobID = lobShowHideMapKeys[j]
                        var thisLOBShowHideLogicArray = lobShowHideMap[thisLobID]

                        var lobShowHideQuestions = getRequiredQuestionsForLogicConditionArray(thisLOBShowHideLogicArray)
                        requiredQuestionsForCoveragesCheckedArray = requiredQuestionsForCoveragesCheckedArray.concat(lobShowHideQuestions)
                    }
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

        var requiredQuestionsForCoveragesCheckedArray_Sorted = []

        //SORT QUESTIONS BY WEIGHT
        // requiredQuestionsForCoveragesCheckedArray_Sorted = requiredQuestionsForCoveragesCheckedArray_Filtered.sort(sortByWeightAscending)

        //SORT QUESTIONS BY ORDER ADDED
        for(var i=0;i<questionOrder.length;i++){
            var qID = questionOrder[i]

            //IF QUESTION ID EXISTED BEFORE
            if(requiredQuestionsForCoveragesCheckedArray_Filtered.indexOf(qID) > -1){
                requiredQuestionsForCoveragesCheckedArray_Sorted.push(qID)

                var index = requiredQuestionsForCoveragesCheckedArray_Filtered.indexOf(qID)
                requiredQuestionsForCoveragesCheckedArray_Filtered.splice(index,1)
            }
        }
        requiredQuestionsForCoveragesCheckedArray_Sorted = requiredQuestionsForCoveragesCheckedArray_Sorted.concat(requiredQuestionsForCoveragesCheckedArray_Filtered)

        //BUILD CONTAINERS FOR COVERAGES AND QUESTIONS (PRODUCT CONDITION CONTAINER)
        $('#questionsContainer_global').append(getCoverageQuestionSectionHTML("DEFAULT"))
        for(var i=0;i<allCoveragesPackagesArray.length;i++){
            var cID = allCoveragesPackagesArray[i]
            $('#questionsContainer_global').append(getCoverageQuestionSectionHTML(cID))
        }

        //BUILD HTML FOR REQUIRED QUESTIONS
        var finalHTML = ""
        // finalHTML = finalHTML + "<div class='row'>"
        for(var i=0;i<requiredQuestionsForCoveragesCheckedArray_Sorted.length;i++){
            var qID = requiredQuestionsForCoveragesCheckedArray_Sorted[i]
            var covID = questionToCovIDMap[qID]
            // finalHTML = finalHTML + getNewSubmissionRequiredQuestion(qID)

            //IF THIS QUESTION HAS COVERAGE QUESTION CONTAINER
            if(covID){
                $('#questionsContainer_global .' + covID + '_productLogicQuestions').append(getNewSubmissionRequiredQuestion(qID))
                $('#questionsContainer_global .' + covID + '_questionsForCoverageSection').css('display', '')
            }
            else{
                covID = "DEFAULT"
                $('#questionsContainer_global .' + covID + '_productLogicQuestions').append(getNewSubmissionRequiredQuestion(qID))
                $('#questionsContainer_global .' + covID + '_questionsForCoverageSection').css('display', '')
            }

        }
        // finalHTML = finalHTML + "</div>"

        //INSERT INTO REQUIRED QUESTIONS CONTAINER
        // $('#questionsContainer_global').html(finalHTML)

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

        //CHECK HEIGHTS OF QUESTION CONTAINERS, IF HEIGHT IS DIFFERENT WILL MESS UP ALIGNMENT. APPLY LARGEST DIV HEIGHT IN ROW TO ALL CONTAINERS
        var gridSizeCount = 0
        var rowHeight = 0
        var elementsInRow = []
        $('#questionsContainer_global div.requiredQuestion').each(function(){
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

    validate()
}

function updateQuestions(missingQuestions){


    //SAVE QUESTION ANSWERS
    var questionAnswersMap = saveRequiredQuestionAnswers()

    //SAVE CURRENT QUESTION ORDER
    var questionOrderArray = saveRequiredQuestionOrder()

    //REMOVE ALL QUESTIONS
    clearRequiredQuestions()

    //GET CURRENTLY CHOSEN COVERAGE CHECKBOXES
    var allCoveragesPackagesArray = getCoveragesAndPackagesSelectedArray()

    // insertQuestionsNoContainers(missingQuestions)
    insertQuestionsWithContainers(missingQuestions)

    refillSavedAnswers(questionAnswersMap)

    fixRequiredQuestionHeights()

    validate()
}
function fixRequiredQuestionHeights(){
    //CHECK HEIGHTS OF QUESTION CONTAINERS, IF HEIGHT IS DIFFERENT WILL MESS UP ALIGNMENT. APPLY LARGEST DIV HEIGHT IN ROW TO ALL CONTAINERS
    var gridSizeCount = 0
    var rowHeight = 0
    var elementsInRow = []
    $('#step-2 div.requiredQuestion').each(function(){
        var thisGridSize = $(this).attr('data-gridsize')
        var thisHeight = $(this).height()


        // console.log(thisGridSize)
        // console.log(parseInt(gridSizeCount) + parseInt(thisGridSize))

        if( (parseInt(gridSizeCount) + parseInt(thisGridSize) ) <= 12 ){
            if(thisHeight > rowHeight){
                rowHeight = thisHeight
            }

            elementsInRow.push( $(this) )

            gridSizeCount = parseInt(gridSizeCount) + parseInt(thisGridSize)
        }
        else{
            // console.log(elementsInRow)
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
}
function fixRequiredQuestionValidationColors(){
    $('#step-2 div.requiredQuestion').each(function(){

    })
}
function sortQuestionsByOrderAdded(questionOrder, questionIDArray){
    var sortedQuestionsArray = []
    //SORT QUESTIONS BY ORDER ADDED
    for(var i=0;i<questionOrder.length;i++){
        var qID = questionOrder[i]

        //IF QUESTION ID EXISTED BEFORE
        if(questionIDArray.indexOf(qID) > -1){
            sortedQuestionsArray.push(qID)

            var index = questionIDArray.indexOf(qID)
            questionIDArray.splice(index,1)
        }
    }
    sortedQuestionsArray = sortedQuestionsArray.concat(questionIDArray)

    return sortedQuestionsArray

}
function removeDuplicateQuestions(questionIDArray){
    var newQuestionIDArray = []

    for(var i=0; i<questionIDArray.length;i++){
        if(newQuestionIDArray.indexOf(questionIDArray[i]) === -1 ){
            if($('#' + questionIDArray[i]).length === 0){
                newQuestionIDArray.push(questionIDArray[i])
            }
        }
    }

    return newQuestionIDArray
}
function buildQuestionCategoryContainers(){
    var allCoveragesPackagesArray = getCoveragesAndPackagesSelectedArray()
    //BUILD CONTAINERS FOR COVERAGES AND QUESTIONS (PRODUCT CONDITION CONTAINER)
    $('#questionsContainer_global').append(getCoverageQuestionSectionHTML("DEFAULT"))
    for(var i=0;i<allCoveragesPackagesArray.length;i++){
        var cID = allCoveragesPackagesArray[i]
        $('#questionsContainer_global').append(getCoverageQuestionSectionHTML(cID))
    }
}
function insertQuestionsWithContainers(questionIDArray){
    for(var i=0;i<questionIDArray.length;i++){
        var qID = questionIDArray[i].questionID
        var type = questionIDArray[i].type

        var questionContainer = $('#questionsContainer_' + type)


        //CHECK IF QUESTION ALREADY EXISTS
        if( doesQuestionExistOnPage(qID) ){
            //SKIP
        }
        else{
            $('#questionsContainer_' + type).append(getNewSubmissionRequiredQuestion(qID))
        }

    }
}
function insertQuestionsNoContainers(questionIDArray){
    for(var i=0;i<questionIDArray.length;i++){
        var qID = questionIDArray[i].questionID
        var type = questionIDArray[i].type

        $('#questionsContainer_global').append(getNewSubmissionRequiredQuestion(qID))
    }
}
function refillSavedAnswers(questionAnswers){
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

function saveRequiredQuestionAnswers(){
    var questionAnswers = {}
    $('div.requiredQuestion input, div.requiredQuestion select').each(function(){
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

    return questionAnswers
}
function saveRequiredQuestionOrder(){
    var questionOrder = []
    $('div.requiredQuestion').each(function(){
        var qID = $(this).attr('data-questionid')
        if(qID && qID.trim().length > 0){
            questionOrder.push(qID)
        }
    })

    return questionOrder
}
function updateShowHideLogicRequiredQuestions(){
    var showHideMap = jsonStringToObject( getCurrentOperationTypeObject().coverageShowMap )
    var showHideMapKeys = Object.keys(showHideMap)

    for(var i=0;i<showHideMapKeys.length;i++){

    }

    var covSelectedArray = getCoveragesSelectedArray()
    for(var i=0;i<covSelectedArray.length; i++){
        var covID = covSelectedArray[i]
        var productID = getProductIDForCoverage(covID)

        if( getProductIDForCoverage(covID) ){

            //GET RATING BASIS REQUIRED QUESTIONS
            if(getProductOptionObject(covID, productID) !== undefined){
                var productObject = getProductOptionObject(covID, productID)

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
                            questionHTML = questionHTML + getNewSubmissionRequiredRateQuestion(ratingBasisQuestionID)
                            // questionHTML = questionHTML + "</div>"

                            $('#questionsContainer_global .' + covID + '_ratingLogicQuestions').append(getNewSubmissionRequiredRateQuestion(ratingBasisQuestionID))
                            $('#questionsContainer_global .' + covID + '_ratingLogicQuestions').css('display', '')
                        }
                    }
                }

            }
        }
    }

}
function updateRatingRequiredQuestion(){
    var covSelectedArray = getCoveragesSelectedArray()
    for(var i=0;i<covSelectedArray.length; i++){
        var covID = covSelectedArray[i]
        var productID = getProductIDForCoverage(covID)

        if( getProductIDForCoverage(covID) ){

            //GET RATING BASIS REQUIRED QUESTIONS
            if(getProductOptionObject(covID, productID) !== undefined){
                var productObject = getProductOptionObject(covID, productID)

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
                            questionHTML = questionHTML + getNewSubmissionRequiredRateQuestion(ratingBasisQuestionID)
                            // questionHTML = questionHTML + "</div>"

                            $('#questionsContainer_global .' + covID + '_ratingLogicQuestions').append(getNewSubmissionRequiredRateQuestion(ratingBasisQuestionID))
                            $('#questionsContainer_global .' + covID + '_ratingLogicQuestions').css('display', '')
                        }
                    }
                }

            }
        }
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
                                    questionHTML = questionHTML + getNewSubmissionRequiredPackageRateQuestion(ratingBasisQuestionID)
                                    // questionHTML = questionHTML + "</div>"
                                    // $('#ratingBasisRequiredQuestionsContainer').append(questionHTML)
                                    $('#questionsContainer_global .' + covID + '_ratingLogicQuestions').append(getNewSubmissionRequiredPackageRateQuestion(ratingBasisQuestionID))
                                    $('#questionsContainer_global .' + covID + '_ratingLogicQuestions').css('display', '')

                                }
                            }
                        }
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

    if( isThereAtLeastOneProductChosen() && isAllRequiredQuestionsComplete()
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
    var coveragesSelected = getCoveragesSelectedArray()
    for(var i=0;i<coveragesSelected.length; i++){
        var covID = coveragesSelected[i]
        var productID = getProductIDForCoverage(covID)
        var productObject = getProductOptionObject(covID, productID)

        if(productObject && productObject.requiredQuestions !== null && productObject.requiredQuestions !== undefined){
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
    $('div.requiredQuestion input, div.requiredQuestion select').each(function(){
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
function isAllRequiredQuestionsComplete_Global(){
    var isComplete = true
    $('#questionsContainer_global').find('div.requiredQuestion input, div.requiredQuestion select').each(function(){
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
function isPolicyTermQuestionsComplete(){
    if( $('#proposedEffectiveDate').val().trim().length === 0 ){
        return false
    }

    if( $('#proposedExpirationDate').val().trim().length === 0 ){
        return false
    }

    if( $('#proposedTermLength').val().trim().length === 0 ){
        return false
    }

    return true
}
function isDefaultQuestionsComplete(){
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
function isThereAtLeastOneProductChosen(){
    if( getProductsSelectedArray().length > 0){
        return true
    }
    else{
        return false
    }
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
    // hideLimitDeductQuestionsNotAnsweredContainer()
}
function hideLimitDeductContainer(){
    $('#limitsDeductiblesContainer').css('display', 'none')
    // showLimitDeductQuestionsNotAnsweredContainer()
}
function clearLimitDeductContainer(){
    $('#limitsDeductiblesContainer').empty()
}
function showLimitDeductQuestionsNotAnsweredContainer(){
    $('#limitsDeductNotAnsweredContainer').css('display', '')
}
function hideLimitDeductQuestionsNotAnsweredContainer(){
    $('#limitsDeductNotAnsweredContainer').css('display', 'none')

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
        var covID = covArray[i]
        var thisCovContainer = $(temporaryContainer).find('#' + covArray[i] + '_CoverageLimDeductContainer')
        var productID = getProductIDForCoverage(covArray[i])

        if(productID){
            $(thisCovContainer).append(buildLimDedRows(covID, productID))
        }

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
        "   style='margin-bottom: 20px; margin-top: 20px;'" +
        ">" +
        "</div>"

    return covContainer
}
function getLimDeductCoverageLabelRow(covID){
    var coverageMap = getCoverageObject(covID)
    var productID = getProductIDForCoverage(covID)

    var covLabelRowHTML =
        "<div class='row coverageLabelRow' " +
        "   id='" + covID + "_LimDeductLabelRow' " +
        "   data-covid='" + covID + "' " +
        "   data-productid='" + productID + "' " +
        ">"


    if(productID){
        covLabelRowHTML = covLabelRowHTML +
            "   <div class=col-xs-12>" +
            "       <label class='covNameLabel'>" +
            coverageMap.coverageName + " - " + productID +
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
    }
    else{
        covLabelRowHTML = covLabelRowHTML +
            "   <div class=col-xs-12>" +
            "       <label class='covNameLabel'>" +
            coverageMap.coverageName + " - " + "<label style='color: #ca0101;'>Please Select a Product</label>" +
            "       </label>" +
            "   </div>" +
            "</div>"
    }

    return covLabelRowHTML
}
function buildLimDedRows(covID, productID){
    var productMap = getProductOptionObject(covID, productID)
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
        "</div>" +
        "<div class='row'>" +
        "   <div class='col-xs-6 limitProductOptionsContainer'>" +
                getLimitProductOptionsHTML(limitArray, productID, productMap.coverage) +
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

function limitRowHTML(){
    var htmlString = ""
}
function getLimitRowsHTML(limitArray, productID, covID){
    var limitRowsHTML = ""
    for(var i=0; i<limitArray.length; i++){
        var limitValue
        var limitDescription

        //LIMITS AND DEDUCTS CURRENTLY STORED IN TWO FORMATS, CHECK FOR FORMAT
        if(jsonStringToObject( limitArray[i] ).limitDescription !== null && jsonStringToObject( limitArray[i] ).limitDescription !== undefined){
            var limitMap = jsonStringToObject( limitArray[i] )
            limitValue = limitMap.limitAmount
            limitDescription = limitMap.limitDescription

            if(limitMap.limitProductOption){
                //IF OPTION FLAG IS TRUE, SKIP
                continue
            }

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
        var rateCode_product = getProductOptionObject(covID, productID).rateCode
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
        var limitDescriptionAndRateID = {}
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
                    limitDescriptionAndRateID[thisLimDesc.trim()] = rateCode_product
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
                            limitDescriptionAndRateID[thisLimDesc.trim()] = rateID_LOB

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
                "           data-rateid='" + limitDescriptionAndRateID[limitDescription.trim()]  + "' " +
                "           data-prefix='$'" +
                "           data-precision='0'" +
                "           required='true' " +
                "           value='" + limitValue + "'>" +
                "   </div>"
        }
        else if(limitValue.substring(0,2) === "{="){
            //GET VALUE FROM QUESTION ID
            var qID = limitValue.slice(2)
            qID = qID.slice(0, -1)

            var qAnswer = getAnswerForQuestionID(qID)

            limitRowsHTML = limitRowsHTML +
                "   <div class='col-xs-4'>" +
                "       <span class='limitValue " + productIDClassString + "_LimitRow_LimitValue' " +
                "           data-limitdescription='" + escapeDataAttributeValue(limitDescription) + "'>" + qAnswer + "</span>" +
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
        if(jsonStringToObject( deductArray[i] ).deductDescription !== null && jsonStringToObject( deductArray[i] ).deductDescription !== undefined){
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
function getLimitProductOptionsHTML(limitArray, productID, covID){
    var htmlString = ""

    for(var i=0; i<limitArray.length; i++){
        var limitMap = jsonStringToObject( limitArray[i] )

        if(limitMap.limitProductOption){
            var limitDescription = limitMap.limitDescription
            var limitValue = limitMap.limitAmount
            var productOptionAdditionalPremium = limitMap.productOptionAdditionalPremium
            var limitDescriptionChange = ""
            var limitValueChange = ""

            if(limitMap.limitDescriptionChange){
                limitDescriptionChange = limitMap.limitDescriptionChange
                limitValueChange = limitMap.limitValueChange
            }


            htmlString = htmlString +
                "<div class='row productOptionRow'>" +
                "   <div class='col-xs-6'>" +
                "       <label class='checkboxVerticalLayout'>" +
                "           <input type='checkbox' class='productOptionCheckbox' id='" + productID + "_" + i + "_ProductOptionCheckbox' " +
                "               data-productid='" + productID + "' " +
                "               data-covid='" + covID + "'" +
                "               data-limitdescription='" + limitDescription + "'" +
                "               data-limitvalue='" + limitValue + "'" +
                "               data-limitdescriptionchange='" + limitDescriptionChange + "'" +
                "               data-limitvaluechange='" + limitValueChange + "'" +
                "           > " +
                limitDescription +
                "       </label>" +
                "   </div>" +
                "   <div class='col-xs-6'>" +
                "       <span class=''>" +
                productOptionAdditionalPremium +
                "       </span>" +
                "   </div>" +
                "</div>"
        }
    }

    if(htmlString.trim().length > 0){
        var headerString = "" +
            "<div class='row' style='margin-top:20px'>" +
            "   <div class='col-xs-6' >" +
            "       <label class='productOptionHeader'>" + productID + " Product Options</label>" +
            "   </div>" +
            "   <div class='col-xs-6'>" +
            "       <label class='productOptionHeader'>Additional Premium</label>" +
            "   </div>" +
            "</div>"

        htmlString = headerString + htmlString

    }

    return htmlString
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
function getLimitValueFromLimitDescription(covID, limitRateMap){
    var limitDescription = limitRateMap.limitDescription
    var thisLimitValue = ""
    var limitContainer = $('#' + covID + '_LimDeductColumnsContainer .limitColumn')
    var limitInputElement

    $(limitContainer).find('.limitRow').each(function(){
        var thisLimitDescription = $(this).data('limitdescription')
        if(thisLimitDescription === limitDescription){
            limitInputElement = $(this).find('.limitValue')
            thisLimitValue = $(limitInputElement).val().trim()

            //IF THIS LIMIT INPUT VALUE IS STILL BLANK ("") THEN REPLACE WITH ZERO
            if(thisLimitValue === ""){
                thisLimitValue = "0"
            }
            return thisLimitValue
        }
    })

    //

    //CHECK AGAINTS MAX LIMIT
    if(getFloatValueOfMoney(thisLimitValue) > getFloatValueOfMoney(limitRateMap.maxLimit) ){
        //CHANGE INPUT TO MAX VALUE
        $(limitInputElement).val(limitRateMap.maxLimit)
        thisLimitValue = limitRateMap.maxLimit
        alert("Max Limit Allowed for " + limitDescription + "is "  + limitRateMap.maxLimit)
    }

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
        var covID = covSelectedArray[i]
        var thisProductID = getProductIDForCoverage(covID)
        var productObject = getProductOptionObject(covID, thisProductID)
        if(productObject){
            var rateID = productObject.rateCode
            var rateObject = getRateObjectByID(rateID)
            var rateBasis = rateObject.rateBasis

            if(rateBasis === 'LIMIT'){
                atLeastOneProductHasLimitRateBasis = true
            }
        }

    }

    return atLeastOneProductHasLimitRateBasis
}
function buildLimitMapForSelectedProducts(){
    var coveragesSelected = getCoveragesSelectedArray()
    var limitMap = {}

    for(var i=0;i<coveragesSelected.length;i++){
        var covID = coveragesSelected[i]
        var productID = getProductIDForCoverage(covID)
        var productObject = getProductOptionObject(covID, productID)
        var tempLimitArray = productObject.limitArray
        limitMap[productID] = jsonStringToObject(tempLimitArray)
    }

    return limitMap
}
function buildDeductMapForSelectedProducts(){
    var coveragesSelected = getCoveragesSelectedArray()
    var deductMap = {}

    for(var i=0; i<coveragesSelected.length; i++){
        var covID = coveragesSelected[i]
        var productID = getProductIDForCoverage(covID)
        var productObject = getProductOptionObject(covID, productID)
        var tempDeductArray = productObject.deductArray
        deductMap[productID] = jsonStringToObject(tempDeductArray)
    }

    return deductMap
}
function buildLimitDeductMapForAllProducts(){
    var coveragesSelected = getCoveragesSelectedArray()
    var finalLimitDeductMap = {}
    for(var i=0; i<coveragesSelected.length; i++){
        var covID = coveragesSelected[i]
        var productID = getProductIDForCoverage(covID)
        var productObject = getProductOptionObject(covID, productID)
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
        var productID = getProductIDForCoverage(covID)
        var productObject = getProductOptionObject(covID, productID)
        var operationMap = getCurrentOperationTypeObject()
        var coveragePackageLOBInfoArray = jsonStringToObject(operationMap.coveragePackageMap)[covID]

        if(productObject){
            //CREATE CONTAINER FOR THIS COVERAGE ID
            premiumLinesHTML = premiumLinesHTML + "<div class='" + covID + "_PremiumLinesContainer premiumLinesContainer'>"

            premiumLinesHTML = premiumLinesHTML + getPremiumLineHTML(productObject)

            premiumLinesHTML = premiumLinesHTML + "</div>"
        }
        else{

        }


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


function getPremiumLineHTML_WCRateSheet(wcRateObject, coverageObject){
    var htmlString =  "" +
        "<div class='row premiumLineRow " + coverageObject.coverageCode + "_PremiumLineRow'> " +
        "   <div class='col-xs-4'> " +
        "       <span class='premiumLine_description' style=''>" + (wcRateObject.description !== undefined ? wcRateObject.description : '' ) + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_premiumBasis'>" + (wcRateObject.basisValue !== undefined ? formatMoney(wcRateObject.basisValue) : '' ) + "</span> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <span class='premiumLine_basisValue'>" + (wcRateObject.rate !== undefined ? wcRateObject.rate : '' ) + "</span> " +
        "   </div> " +
        "   <div class='col-xs-1' style='background: #add8e63b;'> " +
        "       <span class='premiumLine_rate'>" + (wcRateObject.modPrem !== undefined ? formatMoney(wcRateObject.modPrem) : '-' ) + "</span> " +
        "   </div> " +
        "   <div class='col-xs-1' style='background: #add8e63b;'> " +
        "       <span class='premiumLine_premium'>" + (wcRateObject.otherPrem !== undefined ? formatMoney(wcRateObject.otherPrem) : '-' ) + "</span> " +
        "   </div> " +
        "</div>"

    return htmlString
}
function getPremiumLineHTML(productObject){
    var covID = productObject.coverage
    var productID = productObject.productID
    var coverageMap = getCoverageObject(covID)
    var productMap
    var premiumLineHTML = ""


    //THIS FUNCTION WILL HANDLE BOTH MONOLINE COVIDS AND PACKAGE LOBS
    if(productObject !== undefined && productObject !== null &&
        productObject.rateCode !== undefined && productObject.rateCode !== null &&
        productObject.rateCode.trim().length > 0){
        var rateID = productObject.rateCode
        var rateMap = getRateObjectByID(rateID)
        var ratingBasisID = rateMap.rateBasis
        var ratingBasisMap = getRatingBasisObjectByID(rateMap.rateBasis)

        var totalCoveragePremium = 0

        if(rateMap.rateBasis === 'LIMIT'){
            var totalPremium = 0
            var limitRateArray = jsonStringToObject( rateMap.limitRateArray )

            premiumLineHTML = premiumLineHTML +
                "<div class='row premiumLineRow premiumHeaderRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
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

                userInputLimitValue = getLimitValueFromLimitDescription(covID, thisLimitRateMap)




                if(userInputLimitValue === undefined){
                    userInputLimitValue = "NOT FOUND"
                    limitPremium = 0
                }
                else{
                    userInputLimitValue = formatMoney(removeAllNonNumbersFromString(userInputLimitValue))
                    limitPremium = calculateLimitPremium(rateMap, limitDescription, userInputLimitValue )
                }


                var limitLineStyleString = ""

                premiumLineHTML = premiumLineHTML +
                    "<div class='row premiumLineRow limitPremiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow'>" +
                    "   <div class='col-xs-4'> " +
                    "       <span class='premiumLine_description ' " +
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
                "       <span class='premiumLine_description' " +
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
                "       <span class='premiumLine_premium coverageTotalPremium'>" + formatMoney(totalPremium) + "</span> " +
                "   </div> " +
                "</div>"

            totalCoveragePremium = totalPremium


        }
        else if (rateMap.rateBasis === 'BRACKET'){
            var ratingBasisQuestion = $('#' + rateMap.tieredQuestionID)

            var basisAbbrev = getRatingBasisQuestionAbbrev(rateMap.tieredQuestionID)

            var premium = calculateProductOptionPremium(productObject)

            //PREMIUM LINES HEADER ROW
            premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow premiumHeaderRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description' style=''>" + coverageMap.coverageName + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class=''>" + basisAbbrev + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class=''>" + "Rate" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class=''>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium " + "'>" + "" + "</span> " +
                "   </div> " +
                "</div>"


            //BUILD LINES FOR TIERED/BRACKET RATES
            var actualBasisValue = getFloatValueOfMoney( $(ratingBasisQuestion).val() )
            var leftoverValue = actualBasisValue
            var bracketRateArray = jsonStringToObject(rateMap.bracketRateArray)

            for(var i=0;i<bracketRateArray.length; i++){
                var bracketRateMap = bracketRateArray[i]
                var bracketRate = bracketRateMap.rateValue
                var bracketUpTo = bracketRateMap.upto

                if( parseFloat(leftoverValue) > parseFloat(bracketUpTo) ){
                    leftoverValue = parseFloat(leftoverValue) - parseFloat(bracketUpTo)

                    var bracketPremium = parseFloat(bracketUpTo) * parseFloat(bracketRate)

                    premiumLineHTML = premiumLineHTML +
                        "<div class='row premiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                        "   <div class='col-xs-4'> " +
                        "       <span class='premiumLine_description' style=''>" + "" + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_premiumBasis'>" + formatMoney(bracketUpTo) + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_basisValue'>" + bracketRate + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_rate'>" + formatMoney(bracketPremium) + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_premium'>" + "" + "</span> " +
                        "   </div> " +
                        "</div>"
                }
                else{
                    // premium = premium + (remainingAmountOfQuestionValue * rateValue)
                    var bracketPremium = parseFloat(leftoverValue) * parseFloat(bracketRate)

                    premiumLineHTML = premiumLineHTML +
                        "<div class='row premiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                        "   <div class='col-xs-4'> " +
                        "       <span class='premiumLine_description' style=''>" + "" + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_premiumBasis'>" + formatMoney(leftoverValue) + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_basisValue'>" + bracketRate + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_rate'>" + formatMoney(bracketPremium) + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_premium'>" + "" + "</span> " +
                        "   </div> " +
                        "</div>"

                    break;
                }


            }




            totalCoveragePremium = premium
        }
        else if (rateMap.rateBasis === 'FLAT'){
            var premium = calculateProductOptionPremium(productObject)
            // var premium = calculateTotalCoveragePremium(productMap, rateMap, ratingBasisMap)
            // premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow premiumHeaderRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
            //     "   <div class='col-xs-4'> " +
            //     "       <span class='premiumLine_description' style=''>" + coverageMap.coverageName + "</span> " +
            //     "   </div> " +
            //     "   <div class='col-xs-2'> " +
            //     "       <span class='premiumLine_premiumBasis'>" + rateMap.rateBasis + "</span> " +
            //     "   </div> " +
            //     "   <div class='col-xs-2'> " +
            //     "       <span class='premiumLine_basisValue'>" + formatMoney(rateMap.flatAmount) + "</span> " +
            //     "   </div> " +
            //     "   <div class='col-xs-2'> " +
            //     "       <span class='premiumLine_rate'> FLAT </span> " +
            //     "   </div> " +
            //     "   <div class='col-xs-2'> " +
            //     "       <span class='premiumLine_premium coverageTotalPremium'>" + formatMoney(premium) + "</span> " +
            //     "   </div> " +
            //     "</div>"

            // totalCoveragePremium = premium
        }
        else if (rateMap.rateBasis === 'RATESHEET'){
            premiumLineHTML = premiumLineHTML + runWCRateSheet('PREMIUMDISPLAY', productObject)
        }
        else{
            var ratingBasisQuestion = $('#' + ratingBasisMap.basisQuestionID)
            var basisAbbrev = getRatingBasisQuestionAbbrev(ratingBasisMap.basisQuestionID)
            var premium = calculateProductOptionPremium(productObject)
            var premiumRatedBeforeOptions = calculateProductOptionPremium_RatedPremium(productObject)
            var actualBasisValue = getFloatValueOfMoney( $(ratingBasisQuestion).val() )
            var rateValue = rateMap.rateValue

            //PREMIUM LINES HEADER ROW
            premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow premiumHeaderRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description' style=''>" + coverageMap.coverageName + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class=''>" + basisAbbrev + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class=''>" + "Rate" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class=''>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium " + "'>" + "" + "</span> " +
                "   </div> " +
                "</div>"


            premiumLineHTML = premiumLineHTML +
                "<div class='row premiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description' style=''>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premiumBasis'>" + formatMoney(actualBasisValue) + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_basisValue'>" + rateValue + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_rate'>" + formatMoney(premiumRatedBeforeOptions) + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium'>" + "" + "</span> " +
                "   </div> " +
                "</div>"

            // premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow premiumHeaderRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
            //     "   <div class='col-xs-4'> " +
            //     "       <span class='premiumLine_description' style=''>" + coverageMap.coverageName + "</span> " +
            //     "   </div> " +
            //     "   <div class='col-xs-2'> " +
            //     "       <span class='premiumLine_premiumBasis'>" + rateMap.rateBasis + "</span> " +
            //     "   </div> " +
            //     "   <div class='col-xs-2'> " +
            //     "       <span class='premiumLine_basisValue'>" + formatMoney($(ratingBasisQuestion).val()) + "</span> " +
            //     "   </div> " +
            //     "   <div class='col-xs-2'> " +
            //     "       <span class='premiumLine_rate'>" + rateMap.rateValue + "</span> " +
            //     "   </div> " +
            //     "   <div class='col-xs-2'> " +
            //     "       <span class='premiumLine_premium coverageTotalPremium'>" + formatMoney(premium) + "</span> " +
            //     "   </div> " +
            //     "</div>"

            totalCoveragePremium = premium
        }


        //STANDARD PREMIUM DISPLAY LINES (DOES NOT APPLY TO RATESHEETS)
        if(rateMap.rateBasis !== 'RATESHEET'){
            //ADDITIONAL OPTIONS THAT APPLY TO MIN PREMIUM
            var selectedAdditionalOptions = getSelectedProductAdditionalOptions(covID, productID)
            for(var j=0;j<selectedAdditionalOptions.length;j++){
                var optionMap = selectedAdditionalOptions[j]
                var applyMinPremium = optionMap.applyMinPremium

                if(applyMinPremium === true){
                    var productDescription = optionMap.limitDescription
                    var additionalPremium = optionMap.productOptionAdditionalPremium

                    premiumLineHTML = premiumLineHTML +
                        "<div class='row premiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                        "   <div class='col-xs-4'> " +
                        "       <span class='premiumLine_description' style=''>" + productDescription + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_premiumBasis'>" + "" + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_basisValue'>" + "Premium" + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_rate'>" + formatMoney(additionalPremium) + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_premium'>" + "" + "</span> " +
                        "   </div> " +
                        "</div>"
                }
            }


            //INSERT RATED PREMIUM LINE
            var ratedPremium = calculateProductOptionPremium_RatedPremium(productObject)
            premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow premiumLine_ratedPremiumRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description' style=''>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premiumBasis'>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_basisValue'>" + "Rated Premium" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_rate'>" + formatMoney(ratedPremium) + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium " + "'>" + "" + "</span> " +
                "   </div> " +
                "</div>"



            //INSERT MIN PREMIUM LINE IF RATED PREMIUM DOES NOT MEAN MIN PREMIUM
            var minPremium = rateMap.minPremium
            if(ratedPremium < minPremium){
                premiumLineHTML = premiumLineHTML +
                    "<div class='row premiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                    "   <div class='col-xs-12 premiumLine_minPremiumDescription'> " +
                    "       <span class='' style=''>" + "Minimum Premium: " + formatMoney(minPremium) + "</span> " +
                    "   </div> " +
                    "</div>"
            }



            //ADDITIONAL OPTIONS NOT APPLIED TO MIN PREMIUM
            var selectedAdditionalOptions = getSelectedProductAdditionalOptions(covID, productID)
            for(var j=0;j<selectedAdditionalOptions.length;j++){
                var optionMap = selectedAdditionalOptions[j]
                var applyMinPremium = optionMap.applyMinPremium

                if(applyMinPremium === false){
                    var productDescription = optionMap.limitDescription
                    var additionalPremium = optionMap.productOptionAdditionalPremium

                    premiumLineHTML = premiumLineHTML +
                        "<div class='row premiumLineRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                        "   <div class='col-xs-4'> " +
                        "       <span class='premiumLine_description' style=''>" + productDescription + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_premiumBasis'>" + "" + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_basisValue'>" + "Flat Charge" + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_rate'>" + formatMoney(additionalPremium) + "</span> " +
                        "   </div> " +
                        "   <div class='col-xs-2'> " +
                        "       <span class='premiumLine_premium'>" + "" + "</span> " +
                        "   </div> " +
                        "</div>"
                }
            }

            //COVERAGE TOTAL LINE
            premiumLineHTML = premiumLineHTML + "<div class='row premiumLineRow premiumCoverageTotalRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='premiumLine_description' style=''>" + covID + " Total" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class=''>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class=''>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class=''>" + "" + "</span> " +
                "   </div> " +
                "   <div class='col-xs-2'> " +
                "       <span class='premiumLine_premium coverageTotalPremium'>" + formatMoney(premium) + "</span> " +
                "   </div> " +
                "</div>"
        }
    }
    else{
        //IF PRODUCT DOES NOT HAVE A VALID RATE CODE
        premiumLineHTML = "<div class='row premiumLineRow premiumHeaderRow " + coverageMap.coverageCode + "_PremiumLineRow'> " +
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
function getProductIDForCoverage(covID){
    var operationMap = getCurrentOperationTypeObject()
    // var coverageProductMap = jsonStringToObject(operationMap.coverageProductMap)
    // var thisCoverageConditionArray = jsonStringToObject(coverageProductMap[covID])

    var activeProductCard = $('#productCarousel_' + covID).find('.productCard.active')
    var productID = $(activeProductCard).attr('data-productid')

    return productID
}
function getSelectedProductAdditionalOptions(covID, productID){
    var productObject = getProductOptionObject(covID, productID)
    var selectedAdditionalOptionsArray = []
    //CHECK LIMIT ARRAY FOR PRODUCT LIMIT OPTIONS
    if(productObject.limitArray){
        var limitArray = jsonStringToObject(productObject.limitArray)
        for(var i=0; i<limitArray.length; i++) {
            var limitMap = jsonStringToObject(limitArray[i])

            if (limitMap.limitProductOption) {
                var optionCheckboxElement = $("#" + productObject.productID + "_" + i + "_ProductOptionCheckbox")

                //CHECK IF PRODUCT OPTION CHECKBOX EXISTS, AND IS CHECKED
                if( $(optionCheckboxElement).length > 0 && $(optionCheckboxElement).is(':checked') ){
                    //PRODUCT OPTION ACTIONS

                    selectedAdditionalOptionsArray.push(limitMap)
                }
            }
        }
    }

    return selectedAdditionalOptionsArray
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

//RATE LOGIC CONDITION FUNCTIONS
function getRateIDForPackageLOB(packageID, lobID){
    var lobObject = getLOBObjectFromPackageMap(packageID, lobID)
    var thisCoverageConditionArray = jsonStringToObject(lobObject.rateConditions)

    return evaluateLogicConditionArray(thisCoverageConditionArray)
}

//RATE SHEET FUNCTIONS
function getRateSheetObjectByID(rateSheetID){
    for(var i=0; i<rateSheets.length; i++){
        if(rateSheets[i].rateSheetID === rateSheetID){
            return rateSheets[i]
        }
    }
}
function getWCRateObjectByIDAndState(rateCode, state, prodID){
    for(var i=0;i<wcRates.length;i++){
        if(rateCode === wcRates[i].code &&
            state === wcRates[i].state &&
            prodID === wcRates[i].product){
            return wcRates[i]
        }
    }
}

function getProductsSelectedArray(){
    var tempMap = buildCoverageAndProductSelectedMap()
    var tempMapKeys = Object.keys(tempMap)
    var productsSelectedArray = []

    for(var i=0;i<tempMapKeys.length;i++){
        if( tempMap[tempMapKeys[i]].productID ){
            productsSelectedArray.push(tempMap[tempMapKeys[i]].productID)
        }

    }

    return productsSelectedArray
}
function getSelectedProductsAndCoveragesMap(){
    var coveragesSelected = getCoveragesSelectedArray()
    var productsAndCoveragesMap = {}

    for(var i=0;i<coveragesSelected.length;i++){
        var covID = coveragesSelected[i]
        var productID = getProductIDForCoverage(covID)

        if(productID){
            productsAndCoveragesMap[covID] = productID
        }

    }

    return productsAndCoveragesMap
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
            //WHAT TYPE OF OPERATION IS IN PLAY
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
    var coveragesSelected = getCoveragesSelectedArray()
    var finalTermsString = ""

    for(var i=0;i<coveragesSelected.length;i++){
        var covID = coveragesSelected[i]
        var productID = getProductIDForCoverage(covID)
        var productObject = getProductOptionObject(covID, productID)

        if(productObject.terms){
            var termsString = productObject.terms.trim()
            finalTermsString = finalTermsString + productObject.coverage + " - " + productID + "\n\n"
            finalTermsString = finalTermsString + termsString
            finalTermsString = finalTermsString + "\n\n\n\n"
        }

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
