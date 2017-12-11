/**
 * Created by paikchris on 8/23/16.
 */

var currentRiskTypeObject = {}
var currentProductSettingsObject = {}
var currentProductObject = {}
var currentProductDetailsObject = {}
var currentProductLOBDetailsObject = {}
var currentProductFormDetailsObject = []

var typeAheadFormNames = []
var typeAheadFormIDs = []


//DATA
var products, operations, coverages, operationCategories, conditionBasis, conditionOperators,
    questions, questionCategories, ratingBasisArray, rates, forms

//TYPEAHEAD VARIABLES
var typeahead_questions

//HTML TEMPLATES
var logicRowTemplate
var operationsDetailContainer
var operationsCoveragesAllowedContainer

var pageLoading = true;

$(document).ready(function () {
    dataInit()
    typeAheadDatasetsInit()
    typeAheadInit()

    //DONE LOADING SHOW PAGE
    doneLoadingShowPage()

    //CHECK FOR UPDATES

});





///////////////////INIT FUNCTIONS///////////////////
function dataInit(){
    products = pr
    operationCategories = oC
    operations = oT
    coverages = cT
    conditionBasis = cB
    conditionOperators = cO
    questions = qL
    questionCategories = qC
    ratingBasisArray = rB
    rates = rL
    forms = fL

    refreshAll()


    //GET HTML TEMPLATES
    getHTMLTemplates()


    initializeListeners()
}
function getHTMLTemplates(){
    logicRowTemplate = $('.logicConditionRow').eq(0).clone()
    operationsDetailContainer = $('#operationDetailsContainer').eq(0).clone()
    operationsCoveragesAllowedContainer = $('#coveragesAllowedContainer').eq(0).clone()

}
function initializeListeners(){
    $(document.body).on('change', '.noSpacesInput', function(e) {
        var originalString = $(this).val().trim()

        $(this).val(replaceAllSpacesWith(originalString, ""))
    });

    //NAVIGATION
    $(document.body).on('click', '#productsNavTab', function(e) {
        fillProductDetails($('#productsPage_productsDropdown'))
    });

    //SYNC BUTTONS
    $(document.body).on('click', '#checkSyncWithDMU', function(e) {
        checkSyncWithDMU(this)
    });
    $(document.body).on('click', '#syncAllWithDMU', function(e) {
        syncAllWithDMU(this)
    });

    //EDIT PAGE BUTTONS
    $(document.body).on('click', '.editProductsButton', function(e) {
        editProductsButtonAction(this)
    });
    $(document.body).on('click', '.editRatingBasisButton', function(e) {
        editRatingBasisButtonAction(this)
    });
    $(document.body).on('click', '.editRatesButton', function(e) {
        editRatesButtonAction(this)
    });

    /////////////////////OPERATIONS PAGE///////////////////
    $(document.body).on('change', '#operationCategoryDropdown', function(e) {
        operationCategorySelectAction(this)
    });
    $(document.body).on('change', '#operationsDropdown', function(e) {
        operationSelectAction(this)
    })
    $(document.body).on('change', '.coverageCheckbox', function(e) {
        coverageCheckboxChangeAction(this)
    });
    $(document.body).on('click', '.showCoverageQuestions', function(e) {
        showCoverageQuestionsButtonAction(this)
    });
    $(document.body).on('click', '.hideCoverageQuestions', function(e) {
        hideCoverageQuestionsButtonAction(this)
    });
    $(document.body).on('click', '.showQuestionCategory', function(e) {
        showQuestionCategoryButtonAction(this)
    })
    $(document.body).on('click', '.hideQuestionCategory', function(e) {
        hideQuestionCategoryButtonAction(this)
    })
    $(document.body).on('change', '.monolineCheckbox', function(e) {
        var covID = $(this).attr('data-covid')

        if($(this).is(':checked')){
            if (confirm('If this Coverage is monoline it will be removed from Packages, Continue?')) {
                //DESELECT COVERAGES FROM PACKAGES
                $('.' + covID + '_PackageProductCheckbox').prop('checked', false)
                //DISABLE PACKAGE OPTION
                $('.' + covID + '_PackageProductCheckbox').attr('disabled', 'disabled')
            } else {
                $(this).prop('checked', false)
            }

        }
        else{
            //ENABLE PACKAGE OPTION
            $('.' + covID + '_PackageProductCheckbox').removeAttr('disabled')
        }

    })

    //PACKAGE LOBS
    $(document.body).on('change', '.packageProductCheckbox', function(e) {
        var covID = $(this).closest('.coverageContainer').attr('data-covid')
        updateRatesInPackageContainer(covID)
    })
    $(document.body).on('click', '.packageDetails_addLimitRowButton', function(e) {
        packageDetails_addNewLimitRow(this)
    })
    $(document.body).on('click', '.packageDetails_removeLimitRowButton', function(e) {
        packageDetails_removeLimDedRow(this)
    })
    $(document.body).on('click', '.packageDetails_addDeductRowButton', function(e) {
        packageDetails_addNewDeductRow(this)
    })
    $(document.body).on('click', '.packageDetails_removeDeductRowButton', function(e) {
        packageDetails_removeLimDedRow(this)
    })
    $(document.body).on('click', 'button.packageDetails_hidePackageLOBDetailButton', function(e) {
        packageDetails_hidePackageLOBDetails(this)
    })
    $(document.body).on('click', 'button.packageDetails_showPackageLOBDetailButton', function(e) {
        packageDetails_showPackageLOBDetails(this)
    })



    //PRODUCT CONDITIONS V2
    $(document.body).on('change', '.rowConditionDropdown', function(e) {
        rowConditionDropdownChange(this)
    })
    $(document.body).on('change', '.conditionBasis', function(e) {
        logicConditionBasisDropdownChange(this)
    })
    $(document.body).on('click', '.addSubLogicConditionRow', function(e) {
        addSubLogicConditionRowClick(this)
    })
    $(document.body).on('click', '.addLogicConditionRow', function(e) {
        addLogicConditionRowClick(this)
    })
    $(document.body).on('click', '.removeLogicConditionRow', function(e) {
        if (confirm('Are you sure you want to delete this condition')) {
            removeLogicConditionRowClick(this)
        } else {
            // Do nothing!
        }

    })
    $(document.body).on('click', '.moveLogicRowUpButton', function(e) {
        moveLogicRowUp(this)
    })
    $(document.body).on('click', '.moveLogicRowDownButton', function(e) {
        moveLogicRowDown(this)
    })



    //QUESTIONS
    $(document.body).on('click', '.insertRequiredQuestionButton', function(e) {
        insertRequiredConditionQuestionButton(this)
    });


    //SAVE
    $(document.body).on('click', '#saveOperationButton', function(e) {
        saveOperation(this)
    });
    $(document.body).on('change click', '.onChangeSaveOperation', function(e) {
        if(pageLoading == false){
            if(e.type === 'change' && ( $(this).is('input:text') || $(this).is('select') )){
                saveOperation()
            }
            else if( e.type === 'click' && ( $(this).is('input:radio') || $(this).is('input:checkbox')) ){
                saveOperation()
            }
        }
    });





    /////////////////////COVERAGES PAGE///////////////////
    $(document.body).on('change', '#coveragesPage_coveragesDropdown', function(e) {
        fillCoverageDetails(this)
    })

    $(document.body).on('click', '.editCoverageButton', function(e) {
        var covIDToEdit = $(this).data('covid')
        $('#coveragesNavTab').click()
        $('#coveragesPage_coveragesDropdown').val(covIDToEdit)
        $('#coveragesPage_coveragesDropdown').trigger('change')
    })

    //SAVE
    $(document.body).on('change click', '.onChangeSaveCoverage', function(e) {

        if(pageLoading == false){
            if(e.type === 'change' && ( $(this).is('input:text') || $(this).is('select') )){
                saveCoverageChanges()
            }
            else if( e.type === 'click' && ( $(this).is('input:radio') || $(this).is('input:checkbox')) ){
                saveCoverageChanges()
            }

        }
    });






    /////////////////////PRODUCTS PAGE///////////////////
    $(document.body).on('change', '#productsPage_productsDropdown', function(e) {
        fillProductDetails(this)
    })
    $(document.body).on('change', '#productsPage_ProductRateDropdown', function(e) {
        updateRateValueDisplay()
    })
    $(document.body).on('click', '.addProductButton', function(e) {
        addProductButtonAction(this)
    })
    $(document.body).on('change', '.productPage_AddFormDropdown', function(e) {
        addFormDropdownAction(this)
    })
    $(document.body).on('click', '#saveProductButton', function(e) {
        saveProductChanges()
    })

    //REQUIRED QUESTIONS
    $(document.body).on('click', '#productPage_insertRequiredQuestion', function(e) {
        productPage_InsertRequiredQuestionButtonAction(this)
    })
    $(document.body).on('click', '#productPage_insertUWQuestion', function(e) {
        productPage_InsertUWQuestionButtonAction(this)
    })

    //LIMIT DEDUCTS
    $(document.body).on('click', '.productPage_addLimitRowButton', function(e) {
        addNewLimitRow(this)
    })
    $(document.body).on('click', '.productPage_removeLimitRowButton', function(e) {
        removeLimDedRow(this)
    })
    $(document.body).on('click', '.productPage_addDeductRowButton', function(e) {
        addNewDeductRow(this)
    })
    $(document.body).on('click', '.productPage_removeDeductRowButton', function(e) {
        removeLimDedRow(this)

    })

    //SAVE
    $(document.body).on('change click', '.onChangeSaveProduct', function(e) {
        if(pageLoading == false){
            if(e.type === 'change' && ( $(this).is('input:text') || $(this).is('select') )){
                saveProductChanges()
            }
            else if( e.type === 'click' && ( $(this).is('input:radio') || $(this).is('input:checkbox')) ){
                saveProductChanges()
            }

        }
    });






    /////////////////////RATE PAGE///////////////////
    $(document.body).on('change', '#ratePage_RatesDropdown', function(e) {
        ratesPage_RateDropdownAction(this)
    });
    $(document.body).on('change', '#ratePage_RatingBasisDropdown', function(e) {
        ratePage_RatingBasisDropdownAction(this)
    })
    $(document.body).on('change', '#ratesPage_RateValueInput', function(e) {
        ratePage_RateValueChangeAction(this)
    })

    //LIMIT RATING
    $(document.body).on('click', '.ratesPage_LimitRateAddButton', function(e) {
        limitRateAddButtonAction(this)
    })
    $(document.body).on('click', '.ratesPage_LimitRateRemoveButton', function(e) {
        limitRateRemoveButtonAction(this)
    })
    $(document.body).on('change', '.ratesPage_LimitDescriptionInput', function(e) {
        ratePageLimitDescriptionChangeAction(this)
    })


    //BRACKET RATING
    $(document.body).on('click', '.ratesPage_BracketRateAddButton', function(e) {
        bracketRateAddButtonAction(this)
    })
    $(document.body).on('click', '.ratesPage_BracketRateRemoveButton', function(e) {
        bracketRateRemoveButtonAction(this)
    })

    //SAVE
    $(document.body).on('click', '#saveRateButton', function(e) {
        saveRate(this)
    })
    $(document.body).on('change click', '.onChangeSaveRate', function(e) {
        if(pageLoading == false && validateRatePage() === true){
            if(e.type === 'change' && ( $(this).is('input:text') || $(this).is('select') )){
                saveRate()
            }
            else if( e.type === 'click' && ( $(this).is('input:radio') || $(this).is('input:checkbox')) ){
                saveRate()
            }
        }
    });





    /////////////////////RATING BASIS PAGE///////////////////
    $(document.body).on('change', '#ratingBasisPage_RatingBasisDropdown', function(e) {
        ratingBasisPage_RatingBasisDropdownAction(this)
    });
    $(document.body).on('click', '#ratingBasisPage_insertRatingBasisQuestionButton', function(e) {
        insertRatingBasisQuestionButtonAction(this)
    });
    $(document.body).on('click', '.requiredQuestion button.close', function(e) {
        // ratingBasisPage_RemoveDefaultRequiredQuestionButtonAction(this)
    });
    $(document.body).on('click', '#ratingBasisPage_DefaultRequiredQuestions .requiredQuestion', function(e) {
        $(this).toggleClass('basisActive')
    });

    //SAVE
    $(document.body).on('click', '#saveRatingBasisButton', function(e) {
        saveRatingBasis(this)
    })
    $(document.body).on('change click', '.onChangeSaveRatingBasis', function(e) {
        if(pageLoading == false){
            if(e.type === 'change' && ( $(this).is('input:text') || $(this).is('select') )){
                saveRatingBasis()
            }
            else if( e.type === 'click' && ( $(this).is('input:radio') || $(this).is('input:checkbox')) ){
                saveRatingBasis()
            }
        }
    });


    /////////////////////QUESTIONS PAGE///////////////////
    $(document.body).on('click', 'button.questionCategoryHideButton', function(e) {
        questionCategoryHideButtonAction(this)
    })
    $(document.body).on('click', 'button.questionCategoryShowButton', function(e) {
        questionCategoryShowButtonAction(this)
    })
    $(document.body).on('click', 'button.editQuestionCategoryButton', function(e) {
        editQuestionCategoryButtonAction(this)
    })
    $(document.body).on('click', 'button.doneQuestionCategoryButton', function(e) {
        doneQuestionCategoryButtonAction(this)
    })
    $(document.body).on('click', '.questionEditRow', function(e) {
        questionEditRowClickAction(this)
    })
    $(document.body).on('click', '.moveQuestionDownButton', function(e) {
        moveQuestionDown(this)
    })
    $(document.body).on('click', '.moveQuestionUpButton', function(e) {
        moveQuestionUp(this)
    })
    $(document.body).on('click', '.moveCategoryDownButton', function(e) {
        moveCategoryDown(this)
    })
    $(document.body).on('click', '.moveCategoryUpButton', function(e) {
        moveCategoryUp(this)
    })
    $(document.body).on('click', '.deleteCategoryButton', function(e) {
        deleteCategoryButtonAction(this)
    })
    $(document.body).on('change', '.moveQuestionToCategoryDropdown', function(e) {
        moveQuestionToCategoryDropdownAction(this)
    })
    $(document.body).on('change', '.multiColumn_NumberOfColumnsDropdown', function(e) {
        multiColumnNumberOfColumnsDropdownChange(this)
    })
    $(document.body).on('click', '.checkboxRadioAddRowButton', function(e) {
        addCheckboxOptionRow(this)
    })
    $(document.body).on('click', '.checkboxRadioRemoveRowButton', function(e) {
        removeCheckboxOptionRow(this)
    })
    $(document.body).on('click', '.dropdownOptionAddRowButton', function(e) {
        addDropdownOptionRow(this)
    })
    $(document.body).on('click', '.dropdownOptionRemoveRowButton', function(e) {
        removeDropdownOptionRow(this)
    })
    $(document.body).on('click', '#addQuestionCategory', function(e) {
    })
    $(document.body).on('click', '.editQuestionDetailsButton', function(e) {
        editQuestionDetailsButtonAction(this)
        e.stopPropagation()
    })
    $(document.body).on('change', '.questionTypeDropdown', function(e) {
        questionTypeDropdownChangeAction(this)
    })
    $(document.body).on('click', '.deleteQuestionButton', function(e) {
        deleteQuestionButtonAction(this)
    })

    //SAVE
    $(document.body).on('click', '#saveAllQuestionsButton', function(e) {
        saveQuestionOrganizationChanges(this)
    })
    $(document.body).on('click', '.saveQuestionDetailButton', function(e) {
        var questionID = $(this).closest('.questionEditRow').attr('data-questionid')
        saveQuestionChanges(questionID)
    })
    $(document.body).on('change click', '.onChangeSaveQuestionOrder', function(e) {
        if(pageLoading == false){
            if(e.type === 'change' && ( $(this).is('input:text') || $(this).is('select') )){
                saveQuestionOrganizationChanges()
            }
            else if( e.type === 'click' && ( $(this).is('input:radio') || $(this).is('input:checkbox')) ){
                saveQuestionOrganizationChanges()
            }

        }
    });
    $(document.body).on('change click', '.onChangeSaveQuestion', function(e) {
        if(pageLoading == false){
            var questionID = $(this).closest('.questionEditRow').attr('data-questionid')
            if(e.type === 'change' && ( $(this).is('input:text') || $(this).is('select') )){
                saveQuestionChanges(questionID)
            }
            else if( e.type === 'click' && ( $(this).is('input:radio') || $(this).is('input:checkbox')) ){
                saveQuestionChanges(questionID)
            }


        }
    });





    /////////////////////FORMS PAGE///////////////////
    $(document.body).on('click', '.formUploadButton', function(e) {
        var formid = $(this).closest('.formEditRow').attr('data-id')

        onFormUploadButtonClickAction(formid)
    })
    $(document.body).on('change click', '.onChangeSaveForm', function(e) {
        if(pageLoading == false){
            var formid = $(this).closest('.formEditRow').attr('data-id')
            if(e.type === 'change' && ( $(this).is('input:text') || $(this).is('select') )){
                saveFormChanges(formid)
            }
            else if( e.type === 'click' && ( $(this).is('input:radio') || $(this).is('input:checkbox')) ){
                saveFormChanges(formid)
            }


        }
    });



}
function typeAheadDatasetsInit(){
    //QUESTIONS
    typeahead_questions = []
    for(var i=0;i<questions.length;i++){
        typeahead_questions.push(questions[i].questionText)
    }
}
function doneLoadingShowPage(){
    $('#dataManagementLoadingDiv').css('display', 'none')
    $('.mainContentContainer').css('display', '')

    pageLoading = false
}

////////////////////SYNC FUNCTIONS///////////////////
function checkSyncWithDMU(button){
    addLoadingSpinnerToButton_left(button)
    showLoadingModal()
    setLoadingModalText('Checking for Updates')
    $.ajax({
        method: "POST",
        url: "/Admin/checkSyncWithDMU",
        data: {
        }
    })
        .done(function(msg) {
            hideLoadingModal()
            removeLoadingSpinnerFromButton(button)
            showAlert(msg)
        });
}
function syncAllWithDMU(button){
    addLoadingSpinnerToButton_left(button)
    setLoadingModalText('Importing From DMU')
    showLoadingModal()

    $.ajax({
        method: "POST",
        url: "/Admin/syncAllWithDMU",
        data: {
        }
    })
        .done(function(msg) {
            removeLoadingSpinnerFromButton(button)
            hideLoadingModal()

            showAlert(msg)
        });
}
function setFooterStatusUpToDate(){
    hideLoadingModal()
    $('#footerStatus').html('UP TO DATE')

}
function setFooterStatusSaving(){
    setLoadingModalText('Saving Changes')
    showLoadingModal()
    $('#footerStatus').html('SAVING CHANGES')
}
function setFooterStatusSaveError(){
    setLoadingModalText('Error Saving, Reload Page')
    showLoadingModal()
    $('#footerStatus').html('SAVE ERROR')
}

///////////////////NAVIGATION FUNCTIONS///////////////////
function editProductsButtonAction(button){
    $('#productsNavTab').click()
}
function editRatesButtonAction(button){
    $('#ratesNavTab').click()
}
function editRatingBasisButtonAction(button){
    $('#ratingBasisNavTab').click()

}



//////////////////////////////////////OPERATIONS PAGE FUNCTIONS//////////////////////////////////////

//OPERATION DROPDOWNS
function operationCategorySelectAction(input){
    if($(input).val() === "invalid"){
        hideOperationTypeDropdown()
        fillCoveragesAllowedContainer()
        fillOperationDetails()
        resetOperationTypeDropdown()
    }
    else{
        showOperationTypeDropdown()
        fillOperationTypeDropdown()
        resetOperationTypeDropdown()
    }
}
function operationSelectAction(input){
    pageLoading = true
    hideOperationDetails()
    hideCoveragesAllowedContainer()
    clearCoveragesAllowedContainer()
    if($(input).val() === "invalid"){

    }
    else{
        showOperationDetails()
        showCoveragesAllowedContainer()
        fillCoveragesAllowedContainer()
        fillOperationDetails()
    }

    pageLoading = false
}
function hideOperationTypeDropdown(){
    //HIDE
    $('#operationTypeDropdownContainer').css('display', 'none')
}
function showOperationTypeDropdown(){
    //HIDE
    $('#operationTypeDropdownContainer').css('display', '')
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
function resetOperationTypeDropdown(){
    //RESET OPTION
    $('#operationsDropdown').val('invalid')
    $('#operationsDropdown').trigger('change')
}

//OPERATION DETAILS
function showOperationDetails(){
    $('#operationDetailsContainer').css('display', '')
    $('#saveOperationButton').css('display', '')

}
function hideOperationDetails(){
    $('#operationDetailsContainer').css('display', 'none')
    $('#saveOperationButton').css('display', 'none')

}
function fillOperationDetails(){
    var operationObject = getCurrentOperationTypeObject()
    $('#operationPage_operationID').val( operationObject.operationID)
    $('#operationPage_operationDescription').val(operationObject.description)

    if(operationObject.activeFlag === 'Y'){
        $('#operationPage_activeFlagYes').prop('checked', true)
    }
    else{
        $('#operationPage_activeFlagNo').prop('checked', true)

    }

    if(operationObject.bindingAuthority === 'Y'){
        $('#operationPage_bindingAuthorityYes').prop('checked', true)
    }
    else{
        $('#operationPage_bindingAuthorityNo').prop('checked', true)
    }


}


//PACKAGES
function buildCoveragePackageMap(){
    var coveragePackageMap = {}

    $('.packageContainer').find(".coverageCheckbox:checked").each(function(){
        var packageContainer = $(this).closest('.packageContainer')
        var packageID = $(this).attr('data-covid')
        var coveragesInPackageArray = []

        $(packageContainer).find(".packageCoverageOptionsContainer input[type='checkbox']:checked").each(function(){
            var covID = $(this).attr('data-covid')

            var packageOptionMap = {}
            packageOptionMap.covID = covID
            packageOptionMap.rateConditions = buildPackageLOBRateConditionMapForLOB(packageID, covID)
            packageOptionMap.requiredFlag = getRequiredFlagForPackageCoverageOption(packageID, covID)
            packageOptionMap.addOnFlag = getAddOnFlagForPackageCoverageOption(packageID, covID)
            packageOptionMap.limitArray  = buildLimitArrayForPackageLOB(packageID, covID)
            packageOptionMap.deductArray = buildDeductArrayForPackageLOB(packageID, covID)
            packageOptionMap.formArray = buildFormArrayForPackageLOB(packageID, covID)


            coveragesInPackageArray.push(packageOptionMap)
        })

        coveragePackageMap[packageID] = coveragesInPackageArray
    })

    return coveragePackageMap

}
function buildPackageLOBRateConditionMapForLOB(packageID, lobID){
    var productConditionArray = []
    var logicConditionRowsContainer = $('#' + packageID + "_" + lobID + "_PackageLOBRate_LogicConditionRowsContainer")

    productConditionArray = buildLogicArrayForLogicContainer(logicConditionRowsContainer)
    return productConditionArray
}
function buildLimitArrayForPackageLOB(packageID, covID){
    var packageContainer = $('#' + packageID + '_checkbox').closest('.packageContainer')
    var packageLOBID = covID
    var packageLOBContainer = $(packageContainer).find('.' + packageLOBID + '_LOBDetailContainerRow')
    var container = $(packageLOBContainer).find('.packageDetails_limitsContainer')
    var limitArray = []


    $(container).find('.packageDetails_limitRow').each(function(){
        var limitAmount = $(this).find('.limitAmount').val()
        var limitDescription = $(this).find('.limitDescription').val()
        var tempLimitObject = {
            limitAmount: limitAmount,
            limitDescription: limitDescription
        }

        limitArray.push(tempLimitObject)
    })


    return limitArray
}
function buildDeductArrayForPackageLOB(packageID, covID){
    var packageContainer = $('#' + packageID + '_checkbox').closest('.packageContainer')
    var packageLOBID = covID
    var packageLOBContainer = $('.' + packageLOBID + '_LOBDetailContainerRow')
    var container = $(packageLOBContainer).find('.packageDetails_deductsContainer')
    var deductArray = []


    $(container).find('.packageDetails_deductRow').each(function(){
        var deductAmount = $(this).find('.deductAmount').val()
        var deductDescription = $(this).find('.deductDescription').val()
        var tempDeductObject = {
            deductAmount: deductAmount,
            deductDescription: deductDescription
        }

        deductArray.push(tempDeductObject)
    })

    return deductArray
}
function buildFormArrayForPackageLOB(packageID, covID){
    var packageContainer = $('#' + packageID + '_checkbox').closest('.packageContainer')
    var packageLOBID = covID
    var packageLOBContainer = $('.' + packageLOBID + '_LOBDetailContainerRow')
    var formsContainer = $(packageLOBContainer).find('.packageLOBFormsContainer')
    var formArray = []

    $(formsContainer).find('.formCheckboxOperationPage').each(function(){
        if($(this).is(":checked")){
            var formID = $(this).attr('data-formid')

            formArray.push(formID)
        }

    })


    return formArray
}

//COVERAGES ALLOWED CONTAINER
function showCoveragesAllowedContainer(){
    $('#coveragesAllowedContainer').css('display','')
}
function hideCoveragesAllowedContainer(){
    $('#coveragesAllowedContainer').css('display','none')
}
function fillCoveragesAllowedContainer(){
    var tempOperationsMap = getCurrentOperationTypeObject()

    //CLEAR ALL CHECKBOXES TO RESET
    $('#coveragesAllowedContainer .coverageCheckbox').prop('checked', false)
    $('input.packageProductCheckbox').prop('checked', false)

    //FILL COVERAGE DETAILS CONTAINER
    $('#coveragesAllowedContainer .coverageCheckbox').each(function(){
        if($(this).attr('disabled') === undefined){
            var thisCovID = $(this).attr('data-covid')
            var coverageObject = getCoverageObject(thisCovID)



            //FILL COVERAGE DETAILS
            if(tempOperationsMap.coverageProductMap != null) {
                var tempCoverageProductMap = jsonStringToObject(tempOperationsMap.coverageProductMap)
                var tempCoveragesAllowedArray = Object.keys(tempCoverageProductMap)



                //IF THIS CHECKBOX IS IN THE COVERAGES ALLOWED MAP CHECK IT, UNLESS COVERAGE IS INACTIVE
                if (tempCoveragesAllowedArray.indexOf(thisCovID) > -1) {
                    $(this).prop('checked', true)
                    $(this).trigger('change')
                    hideCoverageDetailContainer(thisCovID)

                    //FILL SHOW HIDE LOGIC
                    if(tempOperationsMap.coverageShowMap){
                        var tempCoverageShowMap = jsonStringToObject(tempOperationsMap.coverageShowMap)
                        if(tempCoverageShowMap[thisCovID]){
                            var tempArrayOfShowConditions = tempCoverageShowMap[thisCovID].showMap

                            var showHideLogicContainer = $('#' + thisCovID + '_ShowLogicConditionRowsContainer')
                            $(showHideLogicContainer).find('.logicConditionRow').remove()

                            //BUILD LOGIC CONDITION ROWS
                            fillLogicRowContainerWithLogicArray(tempArrayOfShowConditions, showHideLogicContainer,thisCovID, "SHOWHIDE", 'OPERATION')

                            checkFormatOfAllRows( $(showHideLogicContainer) )
                        }
                    }

                    //IF THIS COVERAGE IS A PACKAGE
                    if(coverageObject.packageFlag === 'Y'){
                        var tempCoveragePackageMap = jsonStringToObject(tempOperationsMap.coveragePackageMap)

                        if(tempCoveragePackageMap[thisCovID]){
                            var coveragesInPackageArray = jsonStringToObject(tempCoveragePackageMap[thisCovID])
                            var packageProductsContainer = $('#' + thisCovID + '_PackageCoverageOptionsContainer')

                            //CHECK THE CHECKBOXES OF THE COVERAGES IN THIS PACKAGE
                            for(var i=0;i<coveragesInPackageArray.length; i++){
                                $(packageProductsContainer).find('.' + coveragesInPackageArray[i].covID + '_PackageProductCheckbox').prop('checked', true)
                            }
                        }
                    }

                    //CHECK OR UNCHECK MONOLINE OPTIONS
                    if(tempOperationsMap.monolineCoverages !== null){
                        var monolineCoverageArray = JSON.parse(tempOperationsMap.monolineCoverages)

                        if(monolineCoverageArray.indexOf(thisCovID) > -1 ){
                            $('#' + thisCovID + '_monolineCheckbox').prop('checked', true)
                            //DESELECT COVERAGES FROM PACKAGES
                            $('.' + thisCovID + '_PackageProductCheckbox').prop('checked', false)
                            //DISABLE PACKAGE OPTION
                            $('.' + thisCovID + '_PackageProductCheckbox').attr('disabled', 'disabled')
                        }


                    }


                    var tempArrayOfProductConditions = tempCoverageProductMap[thisCovID]
                    //FILL PRODUCT CONDITIONS
                    if ( tempArrayOfProductConditions.length > 0 ) {

                        var productConditionContainer = $('#' + thisCovID + '_LogicConditionRowsContainer')
                        // logicRowTemplate = $(productConditionContainer).find('.logicConditionRow').eq(0).clone()
                        $(productConditionContainer).find('.logicConditionRow').remove()

                        //BUILD LOGIC CONDITION ROWS
                        fillLogicRowContainerWithLogicArray(tempArrayOfProductConditions, productConditionContainer,thisCovID, "PRODUCT", 'OPERATION')

                        checkFormatOfAllRows( $(productConditionContainer) )
                    }
                }
            }

            //FILL UNDERWRITER QUESTIONS
            if(tempOperationsMap.underwriterQuestionsMap != null && tempOperationsMap.underwriterQuestionsMap.trim().length > 0){
                var tempUWQuestionsMap = jsonStringToObject(tempOperationsMap.underwriterQuestionsMap)

                if(tempUWQuestionsMap[thisCovID] != null){
                    var coverageCategoryMap = jsonStringToObject(tempUWQuestionsMap[thisCovID])
                    var categoryKeys = Object.keys(coverageCategoryMap)

                    //LOOP THROUGH CATEGORIES
                    for(var i=0;i<categoryKeys.length; i++){
                        var categoryCode = categoryKeys[i]
                        var categoryPanel = $('#' + thisCovID + '_' + categoryCode + '_QuestionCategoryPanel')
                        var categoryContainer = $('#' + thisCovID + '_' + categoryCode + '_QuestionCategoryContainer')
                        var categoryQuestionsArray = jsonStringToObject(coverageCategoryMap[categoryCode])

                        //CLEAR CATEGORY CONTAINER
                        $(categoryContainer).find('input.uwQuestionCheckbox').prop('checked', false)

                        //LOOP THROUGH QUESTIONS IN CATEGORY
                        for(var j=0;j<categoryQuestionsArray.length;j++){
                            var questionID = categoryQuestionsArray[j]
                            $('#' + thisCovID + '_' + questionID + '_QuestionCheckbox').prop('checked', true)
                        }
                    }

                }
            }

        }
    })

    //FILL ALL REQUIRED QUESTIONS
    fillRequiredQuestionsAllContainerForOperation()

    fillAllPackageRates()


    initializeGlobalListeners()
}
function clearCoveragesAllowedContainer(){
    $('#operationDetailsContainer').html($(operationsDetailContainer).html())
    $('#coveragesAllowedContainer').html($(operationsCoveragesAllowedContainer).html())

}
function buildUWQuestionsMap(){
    var underwriterQuestionsMap = {}

    /*
    {CGL: {MISC: [totalBudget,qid, qid]}
          {PRODINFO: [
     */

    //LOOP THROUGH COVERAGES CHECKED
    $('#coveragesAllowedContainer').find('.coverageCheckbox:checked').each(function(){
        var covID = $(this).attr('data-covid')
        var categoryMap = {}

        //LOOP THROUGH CATEGORIES
        $('.' + covID + '_uwQuestionCategoryPanel').each(function(){
            var categoryID = $(this).data('questioncategorycode')
            var questionArrayForCategory = []

            //LOOP THROUGH QUESTIONS FOR CATEGORY
            $(this).find('input.uwQuestionCheckbox:checked').each(function(){
                questionArrayForCategory.push($(this).attr('data-questionid'))
            })

            categoryMap[categoryID] = questionArrayForCategory
        })

        underwriterQuestionsMap[covID] = categoryMap
    })


    return underwriterQuestionsMap
}

function showCoverageDetailContainer(covID){
    $('#' + covID + '_CoverageQuestionsContainer').css('display', '')

    showHideCoverageDetailButton(covID)
}
function hideCoverageDetailContainer(covID){
    $('#' + covID + '_CoverageQuestionsContainer').css('display', 'none')

    showShowCoverageDetailButton(covID)
}
function showShowCoverageDetailButton(covID){
    $('#' + covID + '_HideCoverageQuestionsButton').css('display', 'none')
    $('#' + covID + '_ShowCoverageQuestionsButton').css('display', '')

}
function showHideCoverageDetailButton(covID){
    $('#' + covID + '_HideCoverageQuestionsButton').css('display', '')
    $('#' + covID + '_ShowCoverageQuestionsButton').css('display', 'none')

}
function hideBothCoverageQuestionsButtons(covID){
    $('#' + covID + '_HideCoverageQuestionsButton').css('display', 'none')
    $('#' + covID + '_ShowCoverageQuestionsButton').css('display', 'none')
}
function showCoverageQuestionsButtonAction(button){
    var covID = $(button).data('covid')

    showCoverageDetailContainer(covID)

}
function hideCoverageQuestionsButtonAction(button){
    var covID = $(button).data('covid')

    hideCoverageDetailContainer(covID)

}
function coverageCheckboxChangeAction(checkbox){
    var covID = $(checkbox).data('covid')

    if($(checkbox).prop('checked') === true){
        showHideCoverageDetailButton(covID)
    }
    else{
        hideBothCoverageQuestionsButtons(covID)


    }
}
function buildMonolineCoveragesArray(){
    var monolineCoverageArray = []

    $('.coverageContainer').not('.packageContainer').find('.coverageCheckbox').each(function(){
        var covID = $(this).attr('data-covid')

        //FIND THE MONOLINE CHECKBOX
        if( $('#' + covID + '_monolineCheckbox').is(':checked') ){
            monolineCoverageArray.push(covID)
        }
    })

    return monolineCoverageArray
}

//PACKAGE LOB FUNCTIONS
function fillAllPackageRates(){
    $('.packageContainer').each(function(){
        var packageContainer = $(this)
        var packageID = $(this).attr('data-covid')
        var operationObject = getCurrentOperationTypeObject()
        var coveragePackageMap = JSON.parse(operationObject.coveragePackageMap)

        if(coveragePackageMap !== null && coveragePackageMap[packageID] !== undefined){
            var thisPackageLOBArray = coveragePackageMap[packageID]

            updateRatesInPackageContainer(packageID)


            for(var i=0;i<thisPackageLOBArray.length;i++){
                var thisLOBMap = thisPackageLOBArray[i]
                var thisLOBCovID = thisLOBMap.covID
                // var thisLOBRateID = thisLOBMap.rateID
                var thisLOBRequiredFlag = thisLOBMap.requiredFlag
                var thisLOBAddOnFlag = thisLOBMap.addOnFlag
                var thisLOBRateConditions = thisLOBMap.rateConditions
                var thisLOBFormArray = thisLOBMap.formArray

                var thisLOBPackageOptionRow = $('#' + packageID + '_CoverageQuestionsContainer ' + '.' + thisLOBCovID + '_LOBDetailContainerRow')

                if(thisLOBRequiredFlag === 'Y'){
                    $(thisLOBPackageOptionRow).find('.lobPackageRequiredCheckbox').prop('checked', true)
                }
                else{
                    $(thisLOBPackageOptionRow).find('.lobPackageRequiredCheckbox').prop('checked', false)
                }

                if(thisLOBAddOnFlag === 'Y'){
                    $(thisLOBPackageOptionRow).find('.lobPackageAddOnOnlyCheckbox').prop('checked', true)
                }
                else{
                    $(thisLOBPackageOptionRow).find('.lobPackageAddOnOnlyCheckbox').prop('checked', false)
                }

                //RATE CONDITIONS
                if(thisLOBRateConditions){
                    // fillPackageLOBRateConditions(thisLOBPackageOptionRow, thisLOBRateConditions)
                    fillPackageLOBRateConditionsVersion2(thisLOBPackageOptionRow, thisLOBRateConditions)
                }
                if(thisLOBFormArray){
                    fillFormsInPackageLOB(thisLOBPackageOptionRow, thisLOBFormArray)
                }

                //FILL SHOW HIDE LOGIC
                if(operationObject.coverageShowMap){
                    var tempCoverageShowMap = jsonStringToObject(operationObject.coverageShowMap)
                    var tempLOBCoverageShowMap = tempCoverageShowMap[packageID].lobShowMap
                    if(tempLOBCoverageShowMap[thisLOBCovID]){
                        var tempArrayOfShowConditions = tempLOBCoverageShowMap[thisLOBCovID]

                        var showHideLogicContainer = $('#' + packageID + "_" + thisLOBCovID + '_PackageLOBShowLogicConditionRowsContainer')
                        $(showHideLogicContainer).find('.logicConditionRow').remove()

                        //BUILD LOGIC CONDITION ROWS
                        fillLogicRowContainerWithLogicArray(tempArrayOfShowConditions, showHideLogicContainer,thisLOBCovID, "SHOWHIDE", 'OPERATION')

                        checkFormatOfAllRows( $(showHideLogicContainer) )
                    }
                }

            }



            fillLimitsAndDeductsInPackage(packageContainer)

        }

    })
}
function fillLimitsAndDeductsInPackage(packageContainer){
    $(packageContainer).find('.lobDetailContainerRow .packageDetails_limitsContainer').each(function(){
        var packageID = $(packageContainer).attr('data-covid')
        var packageLOBID = $(this).attr('data-covid')
        var coveragePackageMapForThisPackage = jsonStringToObject(getCurrentOperationTypeObject().coveragePackageMap)[packageID]

        //LOOP THROUGH COVERAGE PACKAGE MAP AND FIND THIS LOB
        var lobLimitArray
        for(var i=0;i<coveragePackageMapForThisPackage.length;i++){
            if(coveragePackageMapForThisPackage[i].covID === packageLOBID){
                lobLimitArray = coveragePackageMapForThisPackage[i].limitArray
            }
        }

        var limitHTML = ""
        var limitAmount, limitDescription
        if(lobLimitArray !== undefined && lobLimitArray!== null && lobLimitArray.length > 0){
            for(var i=0; i<lobLimitArray.length; i++){
                var thisLimitMap = jsonStringToObject( lobLimitArray[i] )
                limitAmount = thisLimitMap.limitAmount
                limitDescription = thisLimitMap.limitDescription

                limitHTML = limitHTML + package_getNewLimitRowHTML(limitAmount, limitDescription)
            }
        }
        else{
            limitHTML = package_getNewLimitRowHTML("", "")
        }

        //INSERT LIMIT HTML INTO LIMIT CONTAINER
        var limitContainer = $(this)
        $(limitContainer).html(limitHTML)
    })

    $(packageContainer).find('.lobDetailContainerRow .packageDetails_deductsContainer').each(function(){
        var packageID = $(packageContainer).attr('data-covid')
        var packageLOBID = $(this).attr('data-covid')
        var coveragePackageMapForThisPackage = jsonStringToObject(getCurrentOperationTypeObject().coveragePackageMap)[packageID]

        //LOOP THROUGH COVERAGE PACKAGE MAP AND FIND THIS LOB
        var lobDeductArray
        for(var i=0;i<coveragePackageMapForThisPackage.length;i++){
            if(coveragePackageMapForThisPackage[i].covID === packageLOBID){
                lobDeductArray = coveragePackageMapForThisPackage[i].deductArray
            }
        }

        var deductHTML = ""
        var deductAmount, deductDescription
        if(lobDeductArray !== undefined && lobDeductArray!== null && lobDeductArray.length > 0){
            for(var i=0; i<lobDeductArray.length; i++){
                var thisDeductMap = jsonStringToObject( lobDeductArray[i] )
                deductAmount = thisDeductMap.deductAmount
                deductDescription = thisDeductMap.deductDescription

                deductHTML = deductHTML + package_getNewDeductRowHTML(deductAmount, deductDescription)
            }
        }
        else{
            deductHTML = package_getNewDeductRowHTML("", "")
        }

        //INSERT LIMIT HTML INTO LIMIT CONTAINER
        var deductContainer = $(this)
        $(deductContainer).html(deductHTML)
    })
}
function fillFormsInPackageLOB(lobInfoContainer, formArray){
    var formsContainer = $(lobInfoContainer).find('.packageLOBFormsContainer')
    var lobID = $(lobInfoContainer).attr('data-covid')

    //CLEAR ALL FORM CHECKBOXES FIRST
    $(formsContainer).find('.formCheckboxOperationPage').prop('checked', false)

    for(var i=0; i<formArray.length; i++){
        var formID = formArray[i]

        $(formsContainer).find('.' + formID + '_OperationPageFormCheckbox').prop('checked', true)
    }

}
function packageDetails_hidePackageLOBDetails(hideButton){
    var lobContainer = $(hideButton).closest('.lobDetailContainerRow')

    //HIDE ROWS EXCEPT THE HEADER ROW
    $(lobContainer).children().not('.packageLOBDetailHeaderRow').css('display', 'none')

    //HIDE THE HIDE BUTTON
    $(hideButton).css('display', 'none')

    //SHOW THE SHOW BUTTON
    $(hideButton).siblings('.packageDetails_showPackageLOBDetailButton').css('display', '')
}
function packageDetails_showPackageLOBDetails(showButton){
    var lobContainer = $(showButton).closest('.lobDetailContainerRow')

    //SHOW ROWS
    $(lobContainer).children().not('.packageLOBDetailHeaderRow').css('display', '')

    //HIDE THE SHOW BUTTON
    $(showButton).css('display', 'none')

    //SHOW THE HIDE BUTTON
    $(showButton).siblings('.packageDetails_hidePackageLOBDetailButton').css('display', '')
}
function updateRatesInPackageContainer(covID){
    var allLOBDetailContainer = $('#' + covID +  '_AllLOBDetailContainer')
    var packageCoverageOptionsArray = getPackageCoverageOptions(covID)


    var allLOBDetailRowsHTML = ""
    for(var i=0;i<packageCoverageOptionsArray.length;i++){
        var packageOptionID = packageCoverageOptionsArray[i]

        allLOBDetailRowsHTML = allLOBDetailRowsHTML +
            lobDetailContainerRowHTML(covID, packageOptionID)
    }

    $(allLOBDetailContainer).html(allLOBDetailRowsHTML)

}
function getPackageCoverageOptions(packageID){
    var packageCoverageOptionsContainer = $('#' + packageID + '_PackageCoverageOptionsContainer')

    var packageCoverageOptionsArray = []
    $(packageCoverageOptionsContainer).find('.packageProductCheckbox:checked').each(function(){
        var thisCovOptionID = $(this).attr('data-covid')

        packageCoverageOptionsArray.push(thisCovOptionID)
    })

    return packageCoverageOptionsArray
}
function lobDetailContainerRowHTML(packageID, packageOptionID){
    var htmlString = "" +
        "<div class='col-xs-12 lobDetailContainerRow " + packageOptionID + "_LOBDetailContainerRow' " +
        "       style='background: rgba(123, 194, 255, 0.37); margin-bottom: 20px; padding: 20px; border-radius: 4px;' " +
        "       data-covid='" + packageOptionID + "'>" +
        "   <div class='row packageLOBDetailHeaderRow' style='margin-top: 0px; margin-bottom: 0px;'>" +
        "       <div class='col-xs-3'>" +
        "           <span style='font-size: 20px; font-weight: 500;'>" + packageOptionID + " <span style='font-size:12px'> LOB Detail</span></span>" +
        "           <button type='button' class='btn btn-xs btn-primary packageDetails_hidePackageLOBDetailButton' data-covid='" + packageOptionID + "' " +
        "               style='padding: 0px 4px; margin-left: 40px; margin-bottom: 4px; display:none'>" +
        "               <i class='fa fa-fw fa-eye-slash' aria-hidden='true'></i> Hide Details " +
        "           </button>" +
        "           <button type='button' class='btn btn-xs btn-primary packageDetails_showPackageLOBDetailButton' data-covid='" + packageOptionID + "' " +
        "               style='padding: 0px 4px; margin-left: 40px; margin-bottom: 4px; display:'>" +
        "               <i class='fa fa-fw fa-eye' aria-hidden='true'></i> Show Details " +
        "           </button>" +
        "       </div>" +
        "   </div>" +
        "   <div class='row' style='margin-top: 30px; display: none;'>" +
        "       <div class='col-xs-1'>" +
        "           <label>Required</label><br>" +
        "           <label class='checkBoxLabel'>" +
        "               <input type='checkbox' class='lobPackageRequiredCheckbox onChangeSaveOperation'>" +
        "           </label>" +
        "       </div>" +
        "       <div class='col-xs-1'>" +
        "           <label>Add On Only</label><br>" +
        "           <label class='checkBoxLabel'>" +
        "               <input type='checkbox' class='lobPackageAddOnOnlyCheckbox onChangeSaveOperation'>" +
        "           </label>" +
        "       </div>" +
        "   </div>" +
            packageLOBShowWhenLogicContainerHTML(packageID, packageOptionID) +
            packageLOBRateLogicContainerHTML(packageID, packageOptionID) +
            getLimitsAndDeductsForPackage(packageOptionID) +
            getFormsForPackageLOB(packageID, packageOptionID) +
        "</div>"



    return htmlString
}
function packageLOBShowWhenLogicContainerHTML(packageID, packageOptionID){
    var htmlString = "" +
        "<div class='row' style='display:none; margin-top:30px; margin-bottom: 30px; background-color: rgba(103, 108, 105, 0.278431); border-top-left-radius: 6px; border-top-right-radius: 6px;" +
        "   border-bottom-right-radius: 6px; border-bottom-left-radius: 6px; padding: 10px;'>" +
        "   <div class='col-xs-12'>" +
        "       <div class='row' style=''>" +
        "           <div class='col-xs-5'>" +
        "               <label>Show " + packageOptionID + " LOB When</label>" +
        "           </div>" +
        "       </div>" +
        "      <div class='row logicConditionRowsContainer rowContainer packageLOBShowLogicContainer' " +
        "          id='" + packageID + "_" + packageOptionID + "_PackageLOBShowLogicConditionRowsContainer'>" +
        blankLogicRowHTML(packageOptionID, 'SHOWHIDE', 'OPERATION') +
        "      </div>" +
        "   </div>" +
        "</div>"

    return htmlString
}
function packageLOBRateLogicContainerHTML(packageID, packageLOBID){
    var htmlString = "" +
        "<div class='row' style='display:none; margin-top:30px; margin-bottom: 30px; background-color: rgba(103, 108, 105, 0.278431); border-top-left-radius: 6px; border-top-right-radius: 6px;" +
        "   border-bottom-right-radius: 6px; border-bottom-left-radius: 6px; padding: 10px;'>" +
        "   <div class='col-xs-12'>" +
        "       <div class='row' style=''>" +
        "           <div class='col-xs-5'>" +
        "               <label>LOB Rate Conditions</label>" +
        "           </div>" +
        "           <div class='col-xs-5'>" +
        "               <label>RateID</label>" +
        "           </div>" +
        "       </div>" +
        "      <div class='row logicConditionRowsContainer rowContainer packageLOBRateLogicContainer' " +
        "          id='" + packageID + "_" + packageLOBID + "_PackageLOBRate_LogicConditionRowsContainer'>" +
            blankLogicRowHTML(packageLOBID, 'RATE', 'OPERATION') +
        "      </div>" +
        "   </div>" +
        "</div>"


    return htmlString
}
function package_getNewLimitRowHTML(limitAmount, limitDescription){
    var limitRowHTML = "" +
        "           <div class='row packageDetails_limitRow packageLimDeductRow'>" +
        "               <div class='col-xs-3'>" +
        "                   <div class='form-group'>" +
        "                       <input class='form-control input-xs limitAmount onChangeSaveOperation' type='text' value='" + limitAmount + "'>" +
        "                   </div>" +
        "               </div>" +
        "               <div class='col-xs-7'>" +
        "                   <input class='form-control input-xs limitDescription onChangeSaveOperation' type='text' value='" + limitDescription + "'>" +
        "               </div>" +
        "               <div class='col-xs-2'>" +
        "                   <button type='button' class='btn btn-xs btn-success packageDetails_addLimitRowButton' style='font-size:9px'>" +
        "                       <i class='fa fa-plus' aria-hidden='true'></i>" +
        "                   </button>" +
        "                   <button type='button' class='btn btn-xs btn-danger onChangeSaveOperation packageDetails_removeLimitRowButton' style='font-size:9px'>" +
        "                       <i class='fa fa-minus' aria-hidden='true'></i>" +
        "                   </button>" +
        "               </div>" +
        "           </div>"

    return limitRowHTML
}
function package_getNewDeductRowHTML(deductAmount, deductDescription){
    var deductRowHTML = "" +
        "           <div class='row packageDetails_deductRow packageLimDeductRow'>" +
        "               <div class='col-xs-3'>" +
        "                   <div class='form-group'>" +
        "                       <input class='form-control input-xs deductAmount onChangeSaveOperation' type='text' value='" + deductAmount + "'>" +
        "                   </div>" +
        "               </div>" +
        "               <div class='col-xs-7'>" +
        "                   <input class='form-control input-xs deductDescription onChangeSaveOperation' type='text' value='" + deductDescription + "'>" +
        "               </div>" +
        "               <div class='col-xs-2'>" +
        "                   <button type='button' class='btn btn-xs btn-success packageDetails_addDeductRowButton' style='font-size:9px'>" +
        "                        <i class='fa fa-plus' aria-hidden='true'></i> " +
        "                   </button>" +
        "                   <button type='button' class='btn btn-xs btn-danger onChangeSaveOperation packageDetails_removeDeductRowButton' style='font-size:9px'>" +
        "                       <i class='fa fa-minus' aria-hidden='true'></i>" +
        "                   </button>" +
        "               </div>" +
        "           </div>"

    return deductRowHTML
}
function getLimitsAndDeductsForPackage(packageOptionID){
    var htmlString = "" +
        "<div class='row' style='background: rgba(103, 108, 105, 0.28); border-radius:6px; margin-top:20px; padding:10px; display:none'> " +
        "   <div class='col-xs-6'> " +
        "       <div class='row' id='packageDetails_limitsHeaderRow' style='text-align:center' data-covid='" + packageOptionID + "'> " +
        "           <div class='col-xs-3'> " +
        "               <h6>Limit</h6> " +
        "           </div> " +
        "           <div class='col-xs-7'> " +
        "               <h6>Description</h6> " +
        "           </div> " +
        "       </div> " +
        "       <div class='packageDetails_limitsContainer' data-covid='" + packageOptionID + "'>" +
        "           <div class='row packageDetails_limitRow packageLimDeductRow'>" +
        "               <div class='col-xs-3'>" +
        "                   <div class='form-group'>" +
        "                       <input class='form-control input-xs limitAmount onChangeSaveOperation' type='text' value='$'>" +
        "                   </div>" +
        "               </div>" +
        "               <div class='col-xs-7'>" +
        "                   <input class='form-control input-xs limitDescription onChangeSaveOperation' type='text' value=''>" +
        "               </div>" +
        "               <div class='col-xs-2'>" +
        "                   <button type='button' class='btn btn-xs btn-success packageDetails_addLimitRowButton' style='font-size:9px'>" +
        "                       <i class='fa fa-plus' aria-hidden='true'></i>" +
        "                   </button>" +
        "                   <button type='button' class='btn btn-xs btn-danger onChangeSaveOperation packageDetails_removeLimitRowButton' style='font-size:9px'>" +
        "                       <i class='fa fa-minus' aria-hidden='true'></i>" +
        "                   </button>" +
        "               </div>" +
        "           </div>" +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-6'> " +
        "       <div class='row' id='packageDetails_deductsHeaderRow' style='text-align:center' > " +
        "           <div class='col-xs-3'> " +
        "               <h6>Deductible</h6> " +
        "           </div> " +
        "           <div class='col-xs-7'> " +
        "               <h6>Description</h6> " +
        "           </div> " +
        "       </div> " +
        "       <div class='packageDetails_deductsContainer' data-covid='" + packageOptionID + "'>" +
        "           <div class='row packageDetails_deductRow packageLimDeductRow'>" +
        "               <div class='col-xs-3'>" +
        "                   <div class='form-group'>" +
        "                       <input class='form-control input-xs deductAmount onChangeSaveOperation' type='text' value='$'>" +
        "                   </div>" +
        "               </div>" +
        "               <div class='col-xs-7'>" +
        "                   <input class='form-control input-xs deductDescription onChangeSaveOperation' type='text' value=''>" +
        "               </div>" +
        "               <div class='col-xs-2'>" +
        "                   <button type='button' class='btn btn-xs btn-success packageDetails_addDeductRowButton' style='font-size:9px'>" +
        "                        <i class='fa fa-plus' aria-hidden='true'></i> " +
        "                   </button>" +
        "                   <button type='button' class='btn btn-xs btn-danger onChangeSaveOperation packageDetails_removeDeductRowButton' style='font-size:9px'>" +
        "                       <i class='fa fa-minus' aria-hidden='true'></i>" +
        "                   </button>" +
        "               </div>" +
        "           </div>" +
        "       </div> " +
        "   </div> " +
        "</div>"

    return htmlString

}
function getFormsForPackageLOB(packageID, packageOptionID){
    var htmlString = "" +
        "<div class='row " + packageID + "_" + packageOptionID + "_PackageLOBFormsContainer packageLOBFormsContainer' " +
        "   style='background: rgba(103, 108, 105, 0.28); border-radius:6px; margin-top:20px; padding:10px; " +
        "   height: 200px; overflow-y: scroll; display:none'" +
        "   data-packageid='" + packageID + "'" +
        "   data-packagelobID='" + packageOptionID + "'> " +
        "   <h4>Forms</h4>"

    for(var i=0;i<forms.length;i++){
        var formObject = forms[i]
        htmlString = htmlString +
            "   <div class='col-xs-12'>" +
            "       <label class='checkBoxLabel' style='font-weight:400'>" +
            "           <input type='checkbox' class='formCheckboxOperationPage onChangeSaveOperation " +
                            formObject.formID + "_OperationPageFormCheckbox' " +
            "               data-formid='" + formObject.formID + "'" +
            "               data-formname='" + formObject.formName + "'> " + formObject.formID + " - " + formObject.formName + "" +
            "       </label>" +
            "   </div>"
    }

    htmlString = htmlString +
        "</div>"

    return htmlString
}
function getRequiredFlagForPackageCoverageOption(packageID, packageOptionID){
    var packageContainer = $('#' + packageID + '_PackageCoverageOptionsContainer').closest('.packageContainer')

    var requiredCheckboxElement = $(packageContainer).find('.' + packageOptionID + '_LOBDetailContainerRow').find('input.lobPackageRequiredCheckbox')

    var requiredFlag = "N"
    if( $(requiredCheckboxElement).is(':checked') ){
        requiredFlag = "Y"
    }
    else{
        requiredFlag = "N"
    }

    return requiredFlag
}
function getAddOnFlagForPackageCoverageOption(packageID, packageLOBID){
    var packageContainer = $('#' + packageID + '_PackageCoverageOptionsContainer').closest('.packageContainer')

    var addOnCheckboxElement = $(packageContainer).find('.' + packageLOBID + '_LOBDetailContainerRow').find('input.lobPackageAddOnOnlyCheckbox')

    var requiredFlag = "N"
    if( $(addOnCheckboxElement).is(':checked') ){
        requiredFlag = "Y"
    }
    else{
        requiredFlag = "N"
    }

    return requiredFlag
}
function packageDetails_addNewLimitRow(addButton){
    var rowToInsertAfter = $(addButton).closest('.packageLimDeductRow')

    $(rowToInsertAfter).after(package_getNewLimitRowHTML("",""))
}
function packageDetails_addNewDeductRow(addButton){
    var rowToInsertAfter = $(addButton).closest('.packageLimDeductRow')

    $(rowToInsertAfter).after(package_getNewDeductRowHTML("",""))
}
function packageDetails_removeLimDedRow(removeButton){
    $(removeButton).closest('.packageLimDeductRow').remove()
}

//PRODUCT CONDITIONS V2

function moneyInputHTML(){
    var htmlString =
        "<div class='form-group'> " +
        "   <input class='form-control conditionBasisValue maskMoney' type='text' data-precision='0' data-prefix='$'> " +
        "</div>"
    
    return htmlString
}
function textInputHTML(){
    var htmlString =
        "<div class='form-group'> " +
        "   <input class='form-control conditionBasisValue' type='text'> " +
        "</div>"

    return htmlString
}
function numberInputHTML(){
    var htmlString =
        "<div class='form-group'> " +
        "   <input class='form-control conditionBasisValue numericInputOnly' type='text'> " +
        "</div>"

    return htmlString
}
function stateDropdownHTML(){
    var htmlString =
        "<div class='form-group'> " +
        "   <select class='form-control conditionBasisValue'>" +
        "   <option value='invalid'>Select State</option>" +
        "   <option value='AL'>AL</option>" +
        "   <option value='AK'>AK</option>" +
        "   <option value='AZ'>AZ</option>" +
        "   <option value='AR'>AR</option>" +
        "   <option value='CA'>CA</option>" +
        "   <option value='CO'>CO</option>" +
        "   <option value='CT'>CT</option>" +
        "   <option value='DE'>DE</option>" +
        "   <option value='FL'>FL</option>" +
        "   <option value='GA'>GA</option>" +
        "   <option value='HI'>HI</option>" +
        "   <option value='ID'>ID</option>" +
        "   <option value='IL'>IL</option>" +
        "   <option value='IN'>IN</option>" +
        "   <option value='IA'>IA</option>" +
        "   <option value='KS'>KS</option>" +
        "   <option value='KY'>KY</option>" +
        "   <option value='LA'>LA</option>" +
        "   <option value='ME'>ME</option>" +
        "   <option value='MD'>MD</option>" +
        "   <option value='MA'>MA</option>" +
        "   <option value='MI'>MI</option>" +
        "   <option value='MN'>MN</option>" +
        "   <option value='MS'>MS</option>" +
        "   <option value='MO'>MO</option>" +
        "   <option value='MT'>MT</option>" +
        "   <option value='NE'>NE</option>" +
        "   <option value='NV'>NV</option>" +
        "   <option value='NH'>NH</option>" +
        "   <option value='NJ'>NJ</option>" +
        "   <option value='NM'>NM</option>" +
        "   <option value='NY'>NY</option>" +
        "   <option value='NC'>NC</option>" +
        "   <option value='ND'>ND</option>" +
        "   <option value='OH'>OH</option>" +
        "   <option value='OK'>OK</option>" +
        "   <option value='OR'>OR</option>" +
        "   <option value='PA'>PA</option>" +
        "   <option value='RI'>RI</option>" +
        "   <option value='SC'>SC</option>" +
        "   <option value='SD'>SD</option>" +
        "   <option value='TN'>TN</option>" +
        "   <option value='TX'>TX</option>" +
        "   <option value='UT'>UT</option>" +
        "   <option value='VT'>VT</option>" +
        "   <option value='VA'>VA</option>" +
        "   <option value='WA'>WA</option>" +
        "   <option value='WV'>WV</option>" +
        "   <option value='WI'>WI</option>" +
        "   <option value='WY'>WY</option>" +
        "   </select>" +
        "</div>"

    return htmlString
}
function coverageDropdownHTML(){
    var coverageArray = coverages
    var htmlString =
        "<div class='form-group'> " +
        "   <select class='form-control conditionBasisValue'>" +
        "   <option value='invalid'>Select Coverage ID</option>"

    for(var i=0;i<coverageArray.length;i++){
        if(coverageArray[i].activeFlag === 'Y'){
            htmlString = htmlString +
                "   <option value='" + coverageArray[i].coverageCode + "'>" + coverageArray[i].coverageCode + "</option>"
        }

    }


    htmlString = htmlString +
        "   </select>" +
        "</div>"

    return htmlString
}
function setConditionInputToMoney(thisRow){
    var conditionBasisValueInput = $(thisRow).find('.conditionBasisValue')
    var inputContainer = $(conditionBasisValueInput).closest("[class^='col-xs-']")

    var newInput = $(moneyInputHTML())
    $(inputContainer).html( $(newInput) )

    maskMoneyThisInput( $(newInput).find('.maskMoney') )
}
function setConditionInputToNumber(thisRow){
    var conditionBasisValueInput = $(thisRow).find('.conditionBasisValue')
    var inputContainer = $(conditionBasisValueInput).closest("[class^='col-xs-']")

    var newInput = $(numberInputHTML())
    $(inputContainer).html( $(newInput) )
}
function setConditionInputToText(thisRow){
    var conditionBasisValueInput = $(thisRow).find('.conditionBasisValue')
    var inputContainer = $(conditionBasisValueInput).closest("[class^='col-xs-']")

    var newInput = $(textInputHTML())
    $(inputContainer).html( $(newInput) )
}
function setConditionInputToStateDropdown(thisRow){
    var conditionBasisValueInput = $(thisRow).find('.conditionBasisValue')
    var inputContainer = $(conditionBasisValueInput).closest("[class^='col-xs-']")

    var newInput = $(stateDropdownHTML() )
    $(inputContainer).html( $(newInput) )

    //SET OPERATOR TO EQUAL
    $(thisRow).find('.conditionOperator').val("EQUAL")
}
function setConditionInputToCoverageDropdown(thisRow){
    var conditionBasisValueInput = $(thisRow).find('.conditionBasisValue')
    var inputContainer = $(conditionBasisValueInput).closest("[class^='col-xs-']")

    var newInput = $(coverageDropdownHTML() )
    $(inputContainer).html( $(newInput) )

    //SET OPERATOR TO EQUAL
    $(thisRow).find('.conditionOperator').val("CONTAINS")
}

function buildOperationCoverageProductMap(){
    //COVERAGE PRODUCTS
    var coverageProductMap = {}
    $('#coveragesAllowedContainer').find('.coverageCheckbox:checked').each(function(){
        var productConditionArray = []
        var covID = $(this).attr('data-covid')
        var productMap = {}
        var logicConditionRowsContainer = $('#' + covID + '_LogicConditionRowsContainer')

        coverageProductMap[covID] = buildLogicArrayForLogicContainer(logicConditionRowsContainer)
    })

    return coverageProductMap
}
function buildOperationCoverageShowMap(){
    var coverageShowMap = {}

    $('.coverageContainer').each(function(){
        var covID = $(this).attr('data-covid')

        if($('#' + covID + '_checkbox').is(':checked')){
            var thisCovShowMap = {}

            var covObject = getCoverageObject(covID)

            var covShowLogicContainer = $('#' + covID + '_ShowLogicConditionRowsContainer')
            thisCovShowMap.showMap = buildLogicArrayForLogicContainer(covShowLogicContainer)

            //IF THIS IS A PACKAGE, CHECK FOR LOB SHOW HIDE LOGIC
            if(covObject.packageFlag === 'Y'){
                var LOBShowMap = {}
                //LOOP THROUGH CHOSEN LOBS
                $(this).find('.lobDetailContainerRow').each(function(){
                    var lobID = $(this).attr('data-covid')
                    var lobShowHideLogicContainer = $(this).find('.packageLOBShowLogicContainer')
                    LOBShowMap[lobID] = buildLogicArrayForLogicContainer(lobShowHideLogicContainer)
                })

                thisCovShowMap.lobShowMap = LOBShowMap
            }

            coverageShowMap[covID] = thisCovShowMap
        }
    })

    return coverageShowMap
}


//CONDITION REQUIRED QUESTIONS
function insertRequiredConditionQuestionButton(button){
    var covID = $(button).data('covid')
    var questionDropDown = $('#' + covID + '_RequiredQuestionDropdown')
    var questionID = $(questionDropDown).val()
    var questionObject = getQuestionObjectFromQuestionID(questionID)
    var questionText = questionObject.questionText


    //INSERT QUESTION
    operationsPage_insertRequiredConditionQuestion(covID, questionID)

    //CLEAR QUESTION INPUT BOX
    $(questionDropDown).val('invalid')


}
function operationsPage_insertRequiredConditionQuestion(covID, questionID){
    var requiredQuestionsContainer = $('#' + covID + '_RequiredQuestions')
    var requiredConditionQuestion = getRequiredQuestionHTML(questionID)


    //MAKE SURE NOT TO INSERT THE SAME QUESTION TWICE
    if( $(requiredQuestionsContainer).find('input#' + questionID).length === 0 ){
        $(requiredQuestionsContainer).append(requiredConditionQuestion)
        //ADD SAVE LISTENER TO CLOSE BUTTON
        $(requiredQuestionsContainer).find('button.close').addClass('onChangeSaveOperation')
    }
    else{
        alert("Question is already included")
    }
}
function fillRequiredQuestionsAllContainerForOperation(){

    var requiredQuestionsMap = getAutoGeneratedRequiredQuestionsMap()

    //GET SELECTED COVERAGES
    $('#coveragesAllowedContainer').find('.coverageCheckbox:checked').each(function(){
        var covID = $(this).data('covid')
        var requiredQuestionsArray = (requiredQuestionsMap[covID].requiredQuestions)

        console.log(requiredQuestionsArray)
        var requiredQuestionsContainer = $('#' + covID + '_RequiredQuestionsAll')

        for(var i=0; i<requiredQuestionsArray.length; i++){
            var questionID = requiredQuestionsArray[i]
            var questionHTML = getRequiredQuestionHTML_noCloseButton(questionID)

            $(requiredQuestionsContainer).append(questionHTML)
        }



    })
}
function getAutoGeneratedRequiredQuestionsMap(){
    var requiredQuestionsMap = {}

    $('#coveragesAllowedContainer').find('.coverageCheckbox:checked').each(function(){
        var covID = $(this).attr('data-covid')
        var questionsMap = {}
        var requiredQuestionsArray = ["proposedEffectiveDate", "proposedExpirationDate", "proposedTermLength"]



        //LOOP THROUGH THE COVERAGE PRODUCT CONDITIONS
        $('#' + covID + "_LogicConditionRowsContainer .logicConditionRow select.conditionBasis").each(function(){
            var productConditionID = $(this).val()
            var conditionBasisObject = getConditionBasisObjectByID(productConditionID)

            if(conditionBasisObject.questionID !== null && conditionBasisObject.questionID !== undefined && conditionBasisObject.questionID.trim().length > 0){
                var productConditionQuestionID = conditionBasisObject.questionID
                requiredQuestionsArray.push(productConditionQuestionID)
            }
        })

        //LOOP THROUGH THE RATING CONDITIONS FOR EACH POSSIBLE PRODUCT
        $('#' + covID + "_LogicConditionRowsContainer .logicConditionRow .conditionOutput").each(function(){
            var productID = $(this).val()
            if(productID !== null && productID != undefined){
                var productObject = getProductObjectByID(productID)

                if(productObject.rateCode !== null && productObject.rateCode !== undefined && productObject.rateCode.trim().length > 0 && productObject.rateCode !== "NONE"){
                    var productRateCode = productObject.rateCode
                    var rateObject = getRateObjectByID(productRateCode)

                    if(rateObject.rateBasis !== null && rateObject.rateBasis !== undefined && rateObject.rateBasis.trim().length > 0 && rateObject.rateBasis !== "invalid"  ){
                        var rateBasisID = rateObject.rateBasis

                        var ratingBasisObject = getRatingBasisObjectByID(rateBasisID)

                        if(ratingBasisObject.basisQuestionID !== null && ratingBasisObject.basisQuestionID !== undefined && ratingBasisObject.basisQuestionID.trim().length > 0){
                            var ratingBasisQuestionID = ratingBasisObject.basisQuestionID
                            requiredQuestionsArray.push(ratingBasisQuestionID)
                        }

                    }
                }
            }

        })

        //FILTER FOR DUPLICATES
        requiredQuestionsArray = filterArrayForDuplicates(requiredQuestionsArray)

        questionsMap.requiredQuestions = requiredQuestionsArray
        requiredQuestionsMap[covID] = questionsMap
    })

    return requiredQuestionsMap

}
function buildRequiredQuestionsMap(){
    var requiredQuestionsMap = {}


    $('#coveragesAllowedContainer').find('.coverageCheckbox:checked').each(function(){
        var covID = $(this).attr('data-covid')
        var productMap = {}
        var requiredQuestionsArray = []

        //LOOP THROUGH QUESTIONS AND ADD THEM TO ARRAY
        console.log($('#' + covID + '_RequiredQuestions .requiredQuestion'))
        $('#' + covID + '_RequiredQuestions .requiredQuestion').each(function(){
            requiredQuestionsArray.push($(this).attr('data-questionid'))
        })
        productMap.requiredQuestions = requiredQuestionsArray
        requiredQuestionsMap[covID] = productMap
    })


    return requiredQuestionsMap
}

//UNDERWRITER QUESTION SECTION
function operationsPage_insertOperationUWQuestion(covID, questionID){
    //GET QUESTION CATEGORY
    var questionCategory = getQuestionCategoryFromID(questionID)
    var underwriterQuestionsContainer =  $('#' + covID + '_' + questionCategory + '_QuestionCategoryContainer')
    var underwriterQuestion = getUWQuestionHTML(questionID)


    //MAKE SURE NOT TO INSERT THE SAME QUESTION TWICE
    if( $(underwriterQuestionsContainer).find('input#' + questionID).length === 0 ){
        $(underwriterQuestionsContainer).append(underwriterQuestion)
    }
    else{
        alert("Question is already included")
    }
}
function showQuestionCategoryButtonAction(button){
    //SHOW PANEL BODY
    var panelBody = $(button).closest('div.uwQuestionCategoryPanel').find('.panel-body')
    $(panelBody).css('display', '')


    //SHOW HIDE CATEGORY BUTTON
    $(button).siblings('.hideQuestionCategory').css('display', '')
    $(button).css('display', 'none')
}
function hideQuestionCategoryButtonAction(button){
    //SHOW PANEL BODY
    var panelBody = $(button).closest('div.uwQuestionCategoryPanel').find('.panel-body')
    $(panelBody).css('display', 'none')


    //SHOW HIDE CATEGORY BUTTON
    $(button).siblings('.showQuestionCategory').css('display', '')
    $(button).css('display', 'none')
}







//////////////////////COVERAGE PAGE FUNCTIONS///////////////////
function fillCoverageDetails(dropdown){
    var coverageCode = $(dropdown).val()

    if(coverageCode === 'invalid'){
        clearCoverageDetails()
        hideCoverageSaveButton()
    }
    else{
        var coverageObject = getCoverageObject(coverageCode)

        var coverageCodeInput = $('#coverageCodeInput')
        var coverageNameInput = $('#coverageNameInput')

        $(coverageCodeInput).val(coverageObject.coverageCode)
        $(coverageNameInput).val(coverageObject.coverageName)


        //ACTIVE FLAG
        if(coverageObject.activeFlag === 'Y'){
            $('#coverageDetails_activeFlagYes').prop('checked', true)
        }
        else{
            $('#coverageDetails_activeFlagNo').prop('checked', true)
        }

        //PACKAGE RADIO BUTTONS
        if(coverageObject.packageFlag === 'Y'){
            $('#coverageDetails_packageFlagYes').prop('checked', true)
        }
        else{
            $('#coverageDetails_packageFlagNo').prop('checked', true)
        }

        //UPDATE USAGES
        updateCoverageUsagesSpan()

        //SHOW SAVE BUTTON
        showCoverageSaveButton()
    }
}
function clearCoverageDetails(){
    var coverageCodeInput = $('#coverageCodeInput')
    var coverageNameInput = $('#coverageNameInput')

    $(coverageCodeInput).val("")
    $(coverageNameInput).val("")


    //ACTIVE FLAG
    $('#coverageDetails_activeFlagYes').prop('checked', false)
    $('#coverageDetails_activeFlagNo').prop('checked', false)


    //PACKAGE RADIO BUTTONS
    $('#coverageDetails_packageFlagYes').prop('checked', false)
    $('#coverageDetails_packageFlagNo').prop('checked', false)


    //UPDATE USAGES
    $('#coverageUsagesSpan').html('')
}
function hideCoverageSaveButton(){
    $('#saveCoverageChangesButton').css('display', 'none')
}
function showCoverageSaveButton(){
    $('#saveCoverageButton').css('display', '')
}
function findCoverageUsages(coverageCode){
    var coverageObject = getCoverageObject(coverageCode)
    var usagesArray = []

    //CHECK IF ANY OPERATIONS ARE USING THIS COVERAGE
    for(var i=0;i<operations.length;i++){
        var used = false;

        //CHECK IF USED IN PACKAGES
        if(operations[i].coveragePackageMap){
            var covPackageMap = jsonStringToObject(operations[i].coveragePackageMap)
            var covPackageMapKeys = Object.keys(covPackageMap)

            for(var j=0;j<covPackageMapKeys.length;j++){
                var packageID = covPackageMapKeys[j]
                var packageCoveragesArray = jsonStringToObject(covPackageMap[packageID])

                if(packageID === coverageCode){
                    used = true
                }

                for(var c=0;c<packageCoveragesArray.length;c++){
                    var covID = packageCoveragesArray[c]

                    if(coverageCode === covID){
                        used = true
                    }
                }
            }
        }

        //CHECK OPERATION COVERAGES
        if(operations[i].coverageProductMap){
            var covProdMap = jsonStringToObject(operations[i].coverageProductMap)
            var covProdMapKeys = Object.keys(covProdMap)

            for(var j=0;j<covProdMapKeys.length;j++){
                var covID = covProdMapKeys[j]
                if(coverageCode === covID){
                    used = true
                }
            }
        }



        if(used){
            usagesArray.push(operations[i].description)
        }
    }


    return usagesArray
}
function updateCoverageUsagesSpan(){
    var coverageCode = getCurrentSelectedCoverageObject().coverageCode
    console.log(coverageCode)
    var usagesSpan = $('#coverageUsagesSpan')

    var usagesArray = findCoverageUsages(coverageCode)


    $(usagesSpan).html(usagesArray.join("\n"))
}

function buildCoverageObjectMap(){
    var coverageMap = {}

    coverageMap.coverageCode = $('#coveragesPage_coveragesDropdown').val()
    coverageMap.coverageName = $('#coverageNameInput').val()
    coverageMap.listTypeID = 'C'
    coverageMap.activeFlag = $("#coverageDetailsContainer input[name='coverageDetails_coverageActiveFlagRadioGroup']:checked").val()
    coverageMap.packageFlag = $("#coverageDetailsContainer input[name='coverageDetails_coveragePackageFlagRadioGroup']:checked").val()

    coverageMap.coverageOffered = 'Y'

    return coverageMap
}

//SAVE







//////////////////////PRODUCTS PAGE FUNCTIONS///////////////////
function fillProductDetails(dropdown){
    pageLoading = true;
    var productID = getCurrentSelectedProductID()

    if(productID ==='invalid'){
        clearProductDetails()
        hideProductSaveButton()
    }
    else{
        var productMap = getProductObjectByID(productID)
        var rateMap = getRateObjectByID(productMap.rateCode)

        showProductSaveButton()
        $('#productIDInput').val(productMap.productID)
        $('#productNameInput').val(productMap.productName)
        $('#productsPage_CoverageDropdown').val(productMap.coverage)
        $('#productsPage_MarketCompanyDropdown').val(productMap.marketCompanyID)
        $('#productsPage_RiskCompanyDropdown').val(productMap.riskCompanyID)
        $('#productsPage_ProductRateDropdown').val(productMap.rateCode)
        $('#productPage_RateValue').val(rateMap.rateValue)
        $('#productPage_RateBasisDisplay').val(rateMap.rateBasis)

        $('#productsPage_ProductTerms').val(productMap.terms)

        if(productMap.activeFlag === 'Y'){
            $('#productDetails_activeFlagYes').prop('checked', true)
        }
        else{
            $('#productDetails_activeFlagNo').prop('checked', true)

        }

        updateProductUsagesSpan()
        updateProductForms()
        updateRateValueDisplay()

        //CLEAR REQUIRED QUESTIONS
        clearRequiredQuestions()

        //UPDATE REQUIRED QUESTIONS
        if(productMap.requiredQuestions !== null && productMap.requiredQuestions !== undefined &&
            productMap.requiredQuestions.trim().length > 2){
            var productRequiredQuestionsArray = jsonStringToObject( productMap.requiredQuestions )

            console.log(productRequiredQuestionsArray)
            if(productRequiredQuestionsArray != null && productRequiredQuestionsArray.length > 0){
                for(var i=0;i<productRequiredQuestionsArray.length;i++){
                    productPage_addRequiredQuestion(productRequiredQuestionsArray[i])
                }
            }
        }



        //FILL LIMITS
        fillProductLimits(productID)
        fillProductDeduct(productID)

        fillAdditionalOptionsForProductID(productID)

    }
    pageLoading = false


}
function showProductSaveButton(){
    $('#saveProductButton').css('display','')
}
function hideProductSaveButton(){
    $('#saveProductButton').css('display','none')
}
function clearProductDetails(){
    $('#productIDInput').val("")
    $('#productNameInput').val("")
    $('#productsPage_CoverageDropdown').val("")
    $('#productsPage_MarketCompanyDropdown').val("")
    $('#productsPage_RiskCompanyDropdown').val("")
    $('#productsPage_ProductRateDropdown').val("")
    $('#productPage_RateValue').val("")
    $('#productPage_RateBasisDisplay').val("")

    $('#productsPage_ProductTerms').val("")
    clearRequiredQuestions()
    clearProductLimits()
    clearProductDeduct()
    clearProductForms()
}
function updateProductForms(){
    var productID = getCurrentSelectedProductID()
    var productMap = getProductObjectByID(productID)

    if(productMap.formIDS){
        var formIDArray = jsonStringToObject(productMap.formIDS)
        var formsContainer = $('#productPageFormsContainer')

        for(var i=0; i<formIDArray.length; i++){
            var formID = formIDArray[i]
            $('#' + formID + '_ProductPageFormCheckbox').prop('checked', true)
        }
    }
}
function clearProductForms(){
    $('.formCheckboxProductPage').each(function(){
        $(this).prop('checked', false)
    })
}
function getProductFormRowHTML(formID){
    var formRowTemplate = $('#productPageFormRowTemplate').children('.productPageFormRow').clone()
    var formObject = getFormsObjectByID(formID)

    $(formRowTemplate).find('.productPageFormID').html(formObject.formID)
    $(formRowTemplate).find('.productPageFormName').html(formObject.formName)
    $(formRowTemplate).attr('data-formid', formObject.formID)
    return formRowTemplate
}
function addProductButtonAction(button){
    //SHOW ADD FORM DROPDOWN
    $(button).closest('.productPageFormRow').find('.productPage_AddFormDropdownContainer').css('display','')
}
function addFormDropdownAction(dropdown){
    var formID = $(dropdown).val()
    var thisRow = $(dropdown).closest('.productPageFormRow')
    var newFormRow = getProductFormRowHTML(formID)


    //MAKE SURE DUPLICATE FORM IS NOT INSERTED
    if( $('.productPageFormRow[data-formid="' + formID + '"]').length === 0){
        //INSERT ROW
        $(thisRow).after(newFormRow)

        //HIDE FORMS DROPDOWN AGAIN
        $(dropdown).closest('.productPageFormRow').find('.productPage_AddFormDropdownContainer').css('display','none')
    }


}

function findProductUsages(productID){
    //CHECK IF ACTIVE FLAG IS CHANGING FOR A PRODUCT IN USE
    var productObjectMap = getProductObjectByID(productID)
    var usagesArray = []
    //CHECK IF ANY OPERATIONS ARE USING THIS PRODUCT
    for(var i=0;i<operations.length;i++){
        if(operations[i].coverageProductMap){
            var used = false;
            var covProdMap = jsonStringToObject(operations[i].coverageProductMap)
            if(covProdMap[productObjectMap.coverage] !== undefined && covProdMap[productObjectMap.coverage] !=null){
                var logicRows = covProdMap[productObjectMap.coverage]
                for(var j=0;j<logicRows.length; j++){
                    if( logicRows[j].productID === productObjectMap.productID ){
                        used = true

                    }
                }
            }

            if(used){
                usagesArray.push(operations[i].description)
            }
        }

    }


    return usagesArray
}
function updateProductUsagesSpan(){
    var productID = getCurrentSelectedProductID()
    var usagesSpan = $('#productUsagesSpan')

    var usagesArray = findProductUsages(productID)

    $(usagesSpan).html(usagesArray.join("\n"))
}
function buildProductObjectMap(){
    var productMap = {}


    productMap.productID = getCurrentSelectedProductID()
    productMap.productName = $('#productNameInput').val()
    productMap.marketCompanyID = $('#productsPage_MarketCompanyDropdown').val()
    productMap.riskCompanyID = $('#productsPage_RiskCompanyDropdown').val()
    productMap.coverage = $('#productsPage_CoverageDropdown').val()
    productMap.rateCode = $('#productsPage_ProductRateDropdown').val()
    productMap.terms = $('#productsPage_ProductTerms').val()
    productMap.formIDArray = buildFormIDArrayForProduct()
    productMap.activeFlag = $("#productDetailsContainer input[name='productDetails_productActiveFlagRadioGroup']:checked").val()

    return productMap
}

//PRODUCT RATE DETAILS
function updateRateValueDisplay(){
    var rateID = $('#productsPage_ProductRateDropdown').val()
    var rateMap = getRateObjectByID(rateID)

    //UPDATE BASIS
    $('#productPage_RateBasisDisplay').html(rateMap.rateBasis)

    if(rateMap.rateBasis === 'LIMIT'){
        showLimitRateContainer()
        var limitRatingRowsContainer = $('#productPage_LimitRateRowsContainer')
        var limitRateArray = jsonStringToObject( rateMap.limitRateArray )

        var limitRateRows = ""
        for(var i=0;i<limitRateArray.length;i++){
            var thisLimitRateMap = jsonStringToObject( limitRateArray[i] )
            var limitRateRowHTML =
                "<div class='row productlimitRateRow'> " +
                "   <div class='col-xs-4'> " +
                "       <span class='productPage_LimitDescription'>" + thisLimitRateMap.limitDescription + "</span> " +
                "   </div> " +
                "   <div class='col-xs-1'> " +
                "       <span class='productPage_LimitRateValue'>" + thisLimitRateMap.rateValue + "</span> " +
                "   </div> " +
                "   <div class='col-xs-1'> " +
                "       <span class='productPage_LimitMinPremium'>" + thisLimitRateMap.minPremium + "</span> " +
                "   </div> " +
                "</div>"

            limitRateRows = limitRateRows + limitRateRowHTML
        }

        $(limitRatingRowsContainer).html(limitRateRows)
    }
    if(rateMap.rateBasis === 'BRACKET'){
        showDefaultRateContainer()
        //UPDATE RATE VALUE, RATE BASIS, MIN PREMIUM
        $('#productPage_RateValue').html("BRACKET")
        $('#productPage_MinPremium').html(rateMap.minPremium)


        //UPDATE RATES REQUIRED QUESTIONS
        var rateBasisID = rateMap.rateBasis
        var ratingBasisObject = getRatingBasisObjectByID(rateBasisID)
        var questionID = ratingBasisObject.basisQuestionID

        $('#productPage_requiredQuestions .rateBasisQuestion').remove()
        addRequiredBasisQuestion(questionID)
    }
    else{
        showDefaultRateContainer()
        //UPDATE RATE VALUE, RATE BASIS, MIN PREMIUM
        $('#productPage_RateValue').html(rateMap.rateValue)
        $('#productPage_MinPremium').html(rateMap.minPremium)


        //UPDATE RATES REQUIRED QUESTIONS
        var rateBasisID = rateMap.rateBasis
        var ratingBasisObject = getRatingBasisObjectByID(rateBasisID)
        var questionID = ratingBasisObject.basisQuestionID

        $('#productPage_requiredQuestions .rateBasisQuestion').remove()
        addRequiredBasisQuestion(questionID)
    }


}
function showDefaultRateContainer(){
    $('#productPage_DefaultRatingContainer').css('display','')
    $('#productPage_LimitRatingContainer').css('display','none')
}
function showLimitRateContainer(){
    $('#productPage_DefaultRatingContainer').css('display','none')
    $('#productPage_LimitRatingContainer').css('display','')
}


//PRODUCT LIMITS AND DEDUCT
function fillProductLimits(productID){
    var productObject = getProductObjectByID(productID)
    var productLimitArray
    if(productObject.limitArray){
        productLimitArray = jsonStringToObject(productObject.limitArray)
    }
    else if(productObject.limits === null){
        return false;
    }
    else{
        productLimitArray = splitByLine(productObject.limits)
    }


    var limitHTML = ""
    var limitAmount, limitDescription
    if(productLimitArray !== undefined && productLimitArray!== null && productLimitArray.length > 0){
        for(var i=0; i<productLimitArray.length; i++){
            if(productObject.limitArray){
                var thisLimitMap = jsonStringToObject( productLimitArray[i] )
                limitAmount = thisLimitMap.limitAmount
                limitDescription = thisLimitMap.limitDescription
            }
            else{
                limitAmount = productLimitArray[i].split('\t')[0]
                limitDescription = removeCoverageStringFromLimDeduct(productLimitArray[i].split('\t')[1])
            }

            limitHTML = limitHTML + getNewLimitRowHTML(limitAmount, limitDescription)
        }
    }
    else{
        limitHTML = getNewLimitRowHTML("", "")
    }

    //INSERT LIMIT HTML INTO LIMIT CONTAINER
    var limitContainer = $('#productPage_limitsContainer')
    $(limitContainer).html(limitHTML)

}
function clearProductLimits(){
    $('#productPage_limitsContainer .limDeductRow:not(:first)').remove()
    $('#productPage_limitsContainer input').val("")
}
function fillProductDeduct(productID){
    var productObject = getProductObjectByID(productID)
    var productDeductArray
    if(productObject.deductArray){
        productDeductArray = jsonStringToObject(productObject.deductArray)
    }
    else if(productObject.deduct === null){
        return false
    }
    else{
        productDeductArray = splitByLine(productObject.deduct)
    }


    var deductHTML = ""
    var deductAmount, deductDescription
    if(productDeductArray !== undefined && productDeductArray!== null && productDeductArray.length > 0){
        for(var i=0; i<productDeductArray.length; i++){
            if(productObject.deductArray){
                var thisDeductMap = jsonStringToObject( productDeductArray[i] )
                deductAmount = thisDeductMap.deductAmount
                deductDescription = thisDeductMap.deductDescription
            }
            else{
                deductAmount = productDeductArray[i].split('\t')[0]
                deductDescription = removeCoverageStringFromLimDeduct(productDeductArray[i].split('\t')[1])
            }

            deductHTML = deductHTML + getNewDeductRowHTML(deductAmount, deductDescription)
        }
    }
    else{
        deductHTML = getNewDeductRowHTML("", "")
    }

    //INSERT LIMIT HTML INTO LIMIT CONTAINER
    var deductContainer = $('#productPage_deductsContainer')
    $(deductContainer).html(deductHTML)

}
function clearProductDeduct(){
    $('#productPage_deductsContainer .limDeductRow:not(:first)').remove()
    $('#productPage_deductsContainer input').val("")

}
function removeCoverageStringFromLimDeduct(limitDescription){
    var positionOfColon = limitDescription.indexOf(":")
    var s = limitDescription.substring(positionOfColon + 1)
    return s
}
function getNewLimitRowHTML(limitAmount, limitDescription){
    var limitRowHTML = "<div class='row productPage_limitRow limDeductRow'> " +
        "   <div class='col-xs-2'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control input-xs limitAmount onChangeSaveProduct' type='text' value='" + limitAmount + "' />" +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-5'>" +
        "       <input class='form-control input-xs limitDescription onChangeSaveProduct' type='text' value='" + limitDescription + "' />" +
        "   </div>" +
        "   <div class='col-xs-1'> " +
        "       <label class='checkBoxLabel'>" +
        "           <input type='checkbox' class='allowUserLimitChangeCheckbox onChangeSaveProduct' data-limitdescription='" + limitDescription + "'>" +
        "       </label>" +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control input-xs maxLimitAmount onChangeSaveProduct maskMoney' type='text' />" +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-2'>" +
        "       <button type='button' class='btn btn-xs btn-success productPage_addLimitRowButton' style='font-size:9px'> " +
        "           <i class='fa fa-plus' aria-hidden='true'></i>" +
        "       </button>" +
        "       <button type='button' class='btn btn-xs btn-danger onChangeSaveProduct productPage_removeLimitRowButton' style='font-size:9px'> " +
        "           <i class='fa fa-minus' aria-hidden='true'></i>" +
        "       </button>" +
        "   </div>" +
        "</div>"

    return limitRowHTML
}
function getNewDeductRowHTML(deductAmount, deductDescription){
    var deductRowHTML =
        "<div class='row productPage_deductRow limDeductRow'> " +
        "   <div class='col-xs-3'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control input-xs deductAmount' type='text' value='" + deductAmount + "' />" +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-7'>" +
        "       <input class='form-control input-xs deductDescription' type='text' value='" + deductDescription + "' />" +
        "   </div>" +
        "   <div class='col-xs-2'>" +
        "       <button type='button' class='btn btn-xs btn-success productPage_addDeductRowButton' style='font-size:9px'> " +
        "           <i class='fa fa-plus' aria-hidden='true'></i>" +
        "       </button>" +
        "       <button type='button' class='btn btn-xs btn-danger productPage_removeDeductRowButton' style='font-size:9px'> " +
        "           <i class='fa fa-minus' aria-hidden='true'></i>" +
        "       </button>" +
        "   </div>" +
        "</div>"

    return deductRowHTML
}
function addNewLimitRow(addButton){
    var rowToInsertAfter = $(addButton).closest('.limDeductRow')

    $(rowToInsertAfter).after(getNewLimitRowHTML("",""))
}
function addNewDeductRow(addButton){
    var rowToInsertAfter = $(addButton).closest('.limDeductRow')

    $(rowToInsertAfter).after(getNewDeductRowHTML("",""))
}
function removeLimDedRow(removeButton){
    $(removeButton).closest('.limDeductRow').remove()
}
function buildLimitArray(){
    var container = $('#productPage_limitsContainer')
    var limitArray = []


    $(container).find('.productPage_limitRow').each(function(){
        var limitAmount = $(this).find('.limitAmount').val()
        var limitDescription = $(this).find('.limitDescription').val()
        var limitFlexFlag = $(this).find('.limitFlexFlagCheckbox').is(':checked')
        var maxLimit
        if(limitFlexFlag){
            maxLimit = $(this).find('.maxLimitAmount')
        }

        var tempLimitObject = {
            limitAmount: limitAmount,
            limitDescription: limitDescription,
            limitFlexFlag: limitFlexFlag,
            maxLimit: maxLimit
        }

        limitArray.push(tempLimitObject)
    })


    return limitArray
}
function buildDeductArray(){
    var container = $('#productPage_deductsContainer')
    var deductArray = []


    $(container).find('.productPage_deductRow').each(function(){
        var deductAmount = $(this).find('.deductAmount').val()
        var deductDescription = $(this).find('.deductDescription').val()
        var tempDeductObject = {
            deductAmount: deductAmount,
            deductDescription: deductDescription
        }

        deductArray.push(tempDeductObject)
    })

    return deductArray
}


//PRODUCT QUESTIONS
function productPage_InsertRequiredQuestionButtonAction(button){
    var questionDropdown = $('#productPage_RequiredQuestionDropdown')
    var questionID = $(questionDropdown).val()
    var questionObject = getQuestionObjectFromQuestionID(questionID)
    var questionText = questionObject.questionText


    //INSERT QUESTION
    productPage_addRequiredQuestion(questionID)

    //CLEAR QUESTION INPUT BOX
    $(questionDropdown).val('invalid')

}
function productPage_addRequiredQuestion(questionID){
    var questionHTML = getRequiredQuestionHTML(questionID)

    //CHECK TO NOT INSERT SAME QUESTION TWICE
    if( $('#productPage_requiredQuestions .' + questionID ).length === 0 ){
        $('#productPage_requiredQuestions').append($(questionHTML))
        //ADD SAVE LISTENER TO CLOSE BUTTON
        $('#productPage_requiredQuestions').find('button.close').addClass('onChangeSaveProduct')
    }
}
function productPage_InsertUWQuestionButtonAction(button){
    var questionDropdown = $('#productPage_UWQuestionDropdown')
    var questionID = $(questionDropdown).val()


    //INSERT QUESTION
    productPage_addUWQuestion(questionID)

    //CLEAR QUESTION INPUT BOX
    $(questionDropdown).val('invalid')
}
function productPage_addUWQuestion(questionID){
    var questionHTML = getUWQuestionHTML(questionID)

    //CHECK TO NOT INSERT SAME QUESTION TWICE
    if( $('#productPage_uwQuestions .' + questionID ).length === 0 ){
        $('#productPage_uwQuestions').append($(questionHTML))
    }
}
function addRequiredBasisQuestion(questionID){
    var questionHTML = getRequiredQuestionHTML_noCloseButton(questionID)
    var rateID = $('#productsPage_ProductRateDropdown').val()
    var rateMap = getRateObjectByID(rateID)
    var ratingBasisMap = getRatingBasisObjectByID(rateMap.rateBasis)

    if(ratingBasisMap.basisQuestionID != null && ratingBasisMap.basisQuestionID.trim().length > 0){
        //CHECK TO NOT INSERT SAME QUESTION TWICE
        if( $('#productPage_requiredQuestions .' + questionID ).length === 0 ){
            $('#productPage_requiredQuestions').append($(questionHTML).addClass('rateBasisQuestion'))
        }
    }

}
function clearRequiredQuestions(){
    $('#productPage_requiredQuestions').html('')
}
function buildWeightOrderedRequiredQuestionsArray(){
    var weightOrderedArray = []

    //SORT BY WEIGHT
    var sortedQuestionElements = $('#productPage_requiredQuestionsSection .requiredQuestion').sort(sortByWeightDescending)

    //FILTER DUPLICATES
    $(sortedQuestionElements).each(function () {
        if(weightOrderedArray.indexOf($(this).data('questionid')) === -1){
            weightOrderedArray.push($(this).data('questionid'))
        }
    })
    return weightOrderedArray
}
function buildWeightOrderedUWQuestionsArray(){
    var weightOrderedArray = []

    //SORT BY WEIGHT
    var sortedQuestionElements = $('#productPage_uwQuestions .uwQuestion').sort(sortByWeightDescending)

    //FILTER DUPLICATES
    $(sortedQuestionElements).each(function () {
        if(weightOrderedArray.indexOf($(this).data('questionid')) === -1){
            weightOrderedArray.push($(this).data('questionid'))
        }
    })
    return weightOrderedArray
}
function sortByWeightDescending(a, b){
    return ( parseInt($(b).data('weight')) ) > ( parseInt($(a).data('weight')) ) ? 1 : -1;
}

function buildAdditionalOptionsArray(){
    var additionalOptionArray = []
    $('#productPage_ProductAdditionalOptionsContainer input.additionalProductOptionCheckbox:checked').each(function(){
        var additionalOptionID = $(this).data('addoptionid')

        additionalOptionArray.push(additionalOptionID)
    })

    return additionalOptionArray
}
function clearAdditionalOptions(){
    $('#productPage_ProductAdditionalOptionsContainer input.additionalProductOptionCheckbox').each(function(){
        $(this).prop('checked', false)
    })
}
function fillAdditionalOptionsForProductID(productID){
    var productObject = getProductObjectByID(productID)

    if(productObject.additionalOptionsArray !== null && productObject.additionalOptionsArray !== undefined ){
        var additionalOptionsArray = jsonStringToObject(productObject.additionalOptionsArray)

        for(var i=0; i<additionalOptionsArray.length; i++){
            var additionalOptionID = additionalOptionsArray[i]

            $('#productPage_ProductAdditionalOptionsContainer input#' + additionalOptionID + '_checkbox').prop('checked', true)
        }
    }
}


//PRODUCT FORMS
function refreshFormsCheckboxesProductPage(){
    var formsCheckboxContainer = $('#productPageFormsContainer')

    var checkboxesHTML = ""

    for(var i=0;i<forms.length;i++){
        var formObject = forms[i]

        checkboxesHTML = checkboxesHTML + productPageFormsCheckboxHTML(formObject)
    }

    $(formsCheckboxContainer).html(checkboxesHTML)
}
function productPageFormsCheckboxHTML(formObject){
    var htmlString = "" +
        "<div class='col-xs-12'>" +
        "   <label class='checkBoxLabel' style='font-weight:400'>" +
        "       <input type='checkbox' class='formCheckboxProductPage onChangeSaveProduct' " +
        "           id='" + formObject.formID + "_ProductPageFormCheckbox'" +
        "           data-formid='" + formObject.formID + "'" +
        "           data-formname='" + formObject.formName + "'> " + formObject.formID + " - " + formObject.formName + "" +
        "   </label>" +
        "</div>" +
        ""

    return htmlString
}
function buildFormIDArrayForProduct(){
    var formIDArray = []
    $('.formCheckboxProductPage').each(function(){
        if($(this).is(':checked')){
            var formID = $(this).attr('data-formid')

            formIDArray.push(formID)
        }
    })

    return formIDArray
}




//////////////////////RATES PAGE FUNCTIONS///////////////////
function ratesPage_RateDropdownAction(dropdown){
    var rateID = getCurrentSelectedRateID();

    if(rateID === 'invalid'){
        clearRateDetails()
        hideRateSaveButton()
    }
    else{
        clearRateDetails()
        fillRateDetails(rateID)
        showRateSaveButton()
    }

}
function clearRateDetails(){
    //CLEAR ALL INPUTS
    $('#ratesPageLeftColumn input:text').val('')

    //RESET ALL SELECTS
    $('.ratesPageLeftColumn select').each(function () {
        $(this).val( $(this).find('option:first').val() )
    })

    //RESET LIMIT RATE ROWS
    $('#ratesPage_limitRatingRowsContainer').html(getLimitRateRowHTML())

    //RESET LIMIT RATE LOGIC ROWS
    clearLimitLogicContainer()

    //RESET BRACKET RATE ROWS
    $('#ratesPage_bracketRatingRowsContainer').html(getBracketRateRowHTML())

    $('#ratePage_rateBasisRateValuePreview').html("")
    $('#ratePage_rateBasisQuestionPreview').html("")

    //CLEAR QUESTIONS
    $('#ratingBasisRequiredQuestionsContainer').empty()

}
function fillRateDetails(rateID){
    var rateObject = getRateObjectByID(rateID)

    //FILL INPUT FIELDS
    $('#rateIDInput').val(rateObject.rateID)
    $('#rateDescriptionInput').val(rateObject.description)
    $('#ratePage_RatingBasisDropdown').val(rateObject.rateBasis)

    if(rateObject.rateBasis === 'LIMIT'){
        var limitLogicContainer = $('#limitLogicInitContainer')
        var limitRateArray = jsonStringToObject(rateObject.limitRateArray)

        var allLimitRateRowsHTML = ""
        var allLimitLogicRowsHTML = ""

        for(var i=0;i<limitRateArray.length; i++){
            var thisLimitRateRowMap = jsonStringToObject( limitRateArray[i] )
            allLimitRateRowsHTML = allLimitRateRowsHTML + getLimitRateRowHTML(thisLimitRateRowMap)

            var limitDescription = thisLimitRateRowMap.limitDescription

            //CHECK IF LIMIT LOGIC EXISTS
            if(thisLimitRateRowMap.limitLogic){
                //GET LIMIT LOGIC CONDITION ROW HTML FOR THIS LIMIT
                var thisLimitLogicArray = jsonStringToObject(thisLimitRateRowMap.limitLogic)

                //INSERT FRESH LOGIC CONDITION CONTAI
                updateOrAddLimitLogicRowsContainerForLimit(limitDescription, i)

                //UPDATE INSERTED LOGIC ROW TO CORRECT LOGIC
                var thisLogicRowsContainer = $(limitLogicContainer).find('.logicConditionRowsContainer').eq(i)
                $(thisLogicRowsContainer).find('.logicConditionRow').remove()
                fillLogicRowContainerWithLogicArray(thisLimitLogicArray, thisLogicRowsContainer, false, 'LIMIT', 'RATE')
            }


        }

        $('#ratesPage_limitRatingRowsContainer').html(allLimitRateRowsHTML)

        showLimitRateValueContainer()
    }
    else if(rateObject.rateBasis === 'BRACKET'){
        var bracketRateArray = jsonStringToObject(rateObject.bracketRateArray)

        var allBracketRateRowsHTML = ""

        for(var i=0;i<bracketRateArray.length; i++){
            var thisBracketRateRowMap = jsonStringToObject( bracketRateArray[i] )
            allBracketRateRowsHTML = allBracketRateRowsHTML + getBracketRateRowHTML(thisBracketRateRowMap)
        }

        $('#ratesPage_bracketRatingRowsContainer').html(allBracketRateRowsHTML)


        showBracketRatingContainer()
        $('#ratesPage_BracketRateMinPremium').val(rateObject.minPremium)

    }
    else if(rateObject.rateBasis === 'FLAT'){
        $('#ratesPage_FlatRateValueInput').val(rateObject.flatAmount)
        showFlatRatingContainer()
    }
    else{
        $('#ratesPage_RateValueInput').val(rateObject.rateValue)
        $('#ratesPage_MinPremiumInput').val(rateObject.minPremium)

        showDefaultRateValueContainer()
    }


    ratePage_UpdateRateBasisPreview()
    //FILL RATING BASIS DEFAULT QUESTIONS
    if(rateObject.rateBasis){
        var ratingBasisMap = getRatingBasisObjectByID(rateObject.rateBasis)
        if(ratingBasisMap.requiredQuestions){
            var ratingBasisDefaultRequiredQuestionsArray = jsonStringToObject(ratingBasisMap.requiredQuestions)
            var defaultRequiredQuestionsContainer = $('#ratingBasisRequiredQuestionsContainer')

            for(var i=0;i<ratingBasisDefaultRequiredQuestionsArray.length; i++){
                var questionHTML = getRequiredQuestionHTML(ratingBasisDefaultRequiredQuestionsArray[i])
                $(defaultRequiredQuestionsContainer).append($(questionHTML))
                //ADD SAVE LISTENER TO CLOSE BUTTON
                $(requiredQuestionsContainer).find('button.close').addClass('onChangeSaveRate')
            }
        }
    }

    maskMoneyInit()

}
function showRateSaveButton(){
    $('#saveRateButton').css('display','')
}
function hideRateSaveButton(){
    $('#saveRateButton').css('display','none')

}

//RATING BASIS SECTION
function ratePage_RatingBasisDropdownAction(dropdown){
    var ratingBasisID = $(dropdown).val()
    var rateBasisObject = getRatingBasisObjectByID(ratingBasisID)

    ratePage_UpdateRateBasisPreview(rateBasisObject)
}
function ratePage_RateValueChangeAction(input){
    ratePage_UpdateRateBasisPreview()
}
function ratePage_UpdateRateBasisPreview(){
    var basisID = $('#ratePage_RatingBasisDropdown').val()
    if(basisID){
        var questionID = getRatingBasisObjectByID(basisID).basisQuestionID
        var rateValue = $('#ratesPage_RateValueInput').val()


        //IF LIMIT RATING, SHOW LIMIT RATE CONTAINER AND HIDE DEFAULT RATE VALUE INPUT CONTAINER
        if(basisID === 'LIMIT'){
            showLimitRateValueContainer()

        }
        else if(basisID === 'BRACKET'){
            showBracketRatingContainer()
        }
        else if(basisID === 'FLAT'){
            showFlatRatingContainer()
        }
        else{
            showDefaultRateValueContainer()

            //FILL QUESTION PREVIEW
            var questionObject = getQuestionObjectByID(questionID)
            $('#ratePage_rateBasisQuestionPreview').html(questionObject.questionText)
        }


        //FILL RATE VALUE PREVIEW
        $('#ratePage_rateBasisRateValuePreview').html(rateValue)
    }

}

function showLimitRateValueContainer(){
    //HIDE DEFAULT RATE VALUE CONTAINER
    $('#ratePage_RateValueContainer').css('display', 'none')
    $('#ratePage_BracketRateValuesContainer').css('display', 'none')
    $('#ratePage_FlatRateValueContainer').css('display', 'none')


    //SHOW LIMIT RATE VALUE CONTAINER
    $('#ratePage_LimitRateValuesContainer').css('display', '')

    //INITIALIZE LIMIT LOGIC CONTAINER
    // $('#limitLogicEffectHeaderRow').html(limitLogicHeaderHTML())

    // initLimitLogicContainer($('#limitLogicInitContainer'))
}
function showDefaultRateValueContainer(){
    //HIDE LIMIT RATE VALUE CONTAINER
    $('#ratePage_LimitRateValuesContainer').css('display', 'none')
    $('#ratePage_BracketRateValuesContainer').css('display', 'none')
    $('#ratePage_FlatRateValueContainer').css('display', 'none')


    //SHOW DEFAULT RATE VALUE CONTAINER
    $('#ratePage_RateValueContainer').css('display', '')
}
function showBracketRatingContainer(){
    //HIDE LIMIT RATE VALUE CONTAINER
    $('#ratePage_LimitRateValuesContainer').css('display', 'none')
    $('#ratePage_RateValueContainer').css('display', 'none')
    $('#ratePage_FlatRateValueContainer').css('display', 'none')


    //SHOW DEFAULT RATE VALUE CONTAINER
    $('#ratePage_BracketRateValuesContainer').css('display', '')
}
function showFlatRatingContainer(){
    //HIDE DEFAULT RATE VALUE CONTAINER
    $('#ratePage_RateValueContainer').css('display', 'none')
    $('#ratePage_BracketRateValuesContainer').css('display', 'none')
    $('#ratePage_LimitRateValuesContainer').css('display', 'none')

    //SHOW LIMIT RATE VALUE CONTAINER
    $('#ratePage_FlatRateValueContainer').css('display', '')
}

//LIMIT RATING SECTION
function getLimitRateRowHTML(limitRateRowMap){
    var limitRateRowHTML =
        "<div class='col-xs-12 limitRatingRow' > " +
        "   <div class='col-xs-1'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_LimitRateValueInput onChangeSaveRate' " +
        "               value='" + (limitRateRowMap && limitRateRowMap.rateValue ? limitRateRowMap.rateValue : "") + "'  type='text'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_LimitMaxValueInput onChangeSaveRate maskMoney' data-precision='0' data-prefix='$' " +
        "               value='" + (limitRateRowMap && limitRateRowMap.maxLimit ? limitRateRowMap.maxLimit : "") + "'  type='text'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-4'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_LimitDescriptionInput onChangeSaveRate' " +
        "               value='" + (limitRateRowMap && limitRateRowMap.limitDescription ? limitRateRowMap.limitDescription : "") + "' type='text'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-1'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_LimitMinPremiumInput onChangeSaveRate maskMoney' data-precision='0' data-prefix='$'" +
        "               value='" + (limitRateRowMap && limitRateRowMap.minPremium ? limitRateRowMap.minPremium : "") + "' type='text'> " +
        "       </div> " +
        "   </div>" +
        "   <div class='col-xs-2'> " +
        "       <button type='button' class='btn btn-xs btn-success ratesPage_LimitRateAddButton' style='font-size:9px; margin-top: 6px;'> " +
        "           <i class='fa fa-plus' aria-hidden='true'></i> " +
        "       </button> " +
        "       <button type='button' class='btn btn-xs btn-danger ratesPage_LimitRateRemoveButton' style='font-size:9px; margin-top: 6px;'> " +
        "           <i class='fa fa-minus' aria-hidden='true'></i> " +
        "       </button> " +
        "   </div> " +
        "</div>"

    return limitRateRowHTML
}
function limitRateAddButtonAction(addButton){
    var limitRateRowButtonClicked= $(addButton).closest('.limitRatingRow')

    var limitRateRowHTML =
        "<div class='col-xs-12 limitRatingRow' > " +
        "   <div class='col-xs-1'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_LimitRateValueInput onChangeSaveRate'  type='text'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_LimitMaxValueInput onChangeSaveRate maskMoney' type='text' data-precision='0' data-prefix='$'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-4'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_LimitDescriptionInput onChangeSaveRate' type='text'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-1'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_LimitMinPremiumInput onChangeSaveRate maskMoney'  type='text' data-precision='0' data-prefix='$'> " +
        "       </div> " +
        "   </div>" +
        "   <div class='col-xs-2'> " +
        "       <button type='button' class='btn btn-xs btn-success ratesPage_LimitRateAddButton' style='font-size:9px; margin-top: 6px;'> " +
        "           <i class='fa fa-plus' aria-hidden='true'></i> " +
        "       </button> " +
        "       <button type='button' class='btn btn-xs btn-danger ratesPage_LimitRateRemoveButton' style='font-size:9px; margin-top: 6px;'> " +
        "           <i class='fa fa-minus' aria-hidden='true'></i> " +
        "       </button> " +
        "   </div> " +
        "</div>"

    $(limitRateRowButtonClicked).after(limitRateRowHTML)

}
function limitRateRemoveButtonAction(removeButton){
    var limitRateRowButtonClicked= $(removeButton).closest('.limitRatingRow')

    //MAKE SURE AT LEAST ONE ROW WILL REMAIN
    if( $('#ratesPage_limitRatingRowsContainer .limitRatingRow').length > 1){
        $(limitRateRowButtonClicked).remove()

        //REMOVE LIMIT LOGIC ROWS FOR THIS LIMIT
        var limitIndexPosition = $(removeButton).closest('.limitRatingRow').index()
        removeLimitLogicRowByIndex(limitIndexPosition)
    }

}
function ratesPage_buildLimitRateArray(){
    var limitRatingRowsContainer = $('#ratesPage_limitRatingRowsContainer')

    var limitRateArray = []

    $(limitRatingRowsContainer).find('.limitRatingRow').each(function(){
        var thisLimitRowMap = {}
        thisLimitRowMap.limitDescription = $(this).find('.ratesPage_LimitDescriptionInput').val()
        thisLimitRowMap.rateValue = $(this).find('.ratesPage_LimitRateValueInput').val()
        thisLimitRowMap.maxLimit = $(this).find('.ratesPage_LimitMaxValueInput').val()
        thisLimitRowMap.minPremium = $(this).find('.ratesPage_LimitMinPremiumInput').val()

        //FIND CORRESPONDING LOGIC CONTAINER FOR THIS LIMIT IF IT EXISTS
        var limitIndexPosition = $(this).closest('.limitRatingRow').index()
        var logicConditionContainer = $('#limitLogicInitContainer').find('.logicConditionRowsContainer').eq(limitIndexPosition)
        thisLimitRowMap.limitLogic = buildLogicArrayForLogicContainer(logicConditionContainer)
        thisLimitRowMap.limitRateID = $('#ratePage_RatesDropdown').val()
        limitRateArray.push(thisLimitRowMap)
    })
    return limitRateArray
}
function ratePageLimitDescriptionChangeAction(element){
    if($(element).val().trim().length > 0 ){
        var limitDescription = $(element).val().trim()
        var limitIndexPosition = $(element).closest('.limitRatingRow').index()
        updateOrAddLimitLogicRowsContainerForLimit(limitDescription, limitIndexPosition)
    }
}
function clearLimitLogicContainer(){
    $('#limitLogicInitContainer').html('')
}


//BRACKET RATING SECTION
function getBracketRateRowHTML(bracketRateRowMap){
    var bracketRateRowHTML =
        "<div class='col-xs-12 bracketRatingRow' > " +
        "   <div class='col-xs-2'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_BracketRateValueInput onChangeSaveRate' " +
        "               value='" + (bracketRateRowMap && bracketRateRowMap.rateValue ? bracketRateRowMap.rateValue : "") + "'  type='text'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-6'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_BracketUpToInput maskMoney onChangeSaveRate' " +
        "               value='" + (bracketRateRowMap && bracketRateRowMap.upto ? bracketRateRowMap.upto : "") + "' type='text' data-precision='0' data-prefix='$'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <button type='button' class='btn btn-xs btn-success ratesPage_BracketRateAddButton' style='font-size:9px; margin-top: 6px;'> " +
        "           <i class='fa fa-plus' aria-hidden='true'></i> " +
        "       </button> " +
        "       <button type='button' class='btn btn-xs btn-danger ratesPage_BracketRateRemoveButton' style='font-size:9px; margin-top: 6px;'> " +
        "           <i class='fa fa-minus' aria-hidden='true'></i> " +
        "       </button> " +
        "   </div> " +
        "</div>"

    return bracketRateRowHTML
}
function bracketRateAddButtonAction(addButton){
    var bracketRateRowButtonClicked= $(addButton).closest('.bracketRatingRow')

    var bracketRateRowHTML =
        "<div class='col-xs-12 bracketRatingRow' > " +
        "   <div class='col-xs-2'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_BracketRateValueInput onChangeSaveRate'  type='text'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-6'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control ratesPage_BracketUpToInput maskMoney onChangeSaveRate' type='text' data-precision='0' data-prefix='$'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-2'> " +
        "       <button type='button' class='btn btn-xs btn-success ratesPage_BracketRateAddButton' style='font-size:9px; margin-top: 6px;'> " +
        "           <i class='fa fa-plus' aria-hidden='true'></i> " +
        "       </button> " +
        "       <button type='button' class='btn btn-xs btn-danger ratesPage_BracketRateRemoveButton' style='font-size:9px; margin-top: 6px;'> " +
        "           <i class='fa fa-minus' aria-hidden='true'></i> " +
        "       </button> " +
        "   </div> " +
        "</div>"

    $(bracketRateRowButtonClicked).after(bracketRateRowHTML)

    maskMoneyInit()
}
function bracketRateRemoveButtonAction(removeButton){
    var bracketRateRowButtonClicked= $(removeButton).closest('.bracketRatingRow')

    //MAKE SURE AT LEAST ONE ROW WILL REMAIN
    if( $('#ratesPage_bracketRatingRowsContainer .bracketRatingRow').length > 1){
        $(bracketRateRowButtonClicked).remove()
    }
}
function ratesPage_buildBracketRateArray(){
    var bracketRatingRowsContainer = $('#ratesPage_bracketRatingRowsContainer')

    var bracketRateArray = []

    $(bracketRatingRowsContainer).find('.bracketRatingRow').each(function(){
        var thisBracketRowMap = {}
        thisBracketRowMap.upto = getIntValueOfMoney($(this).find('.ratesPage_BracketUpToInput').val())
        thisBracketRowMap.rateValue = $(this).find('.ratesPage_BracketRateValueInput').val()
        bracketRateArray.push(thisBracketRowMap)
    })
    return bracketRateArray
}






//////////////////////RATING BASIS PAGE FUNCTIONS///////////////////
function ratingBasisPage_RatingBasisDropdownAction(dropdown){
    var ratingBasisID = $(dropdown).val()

    if(ratingBasisID === 'invalid'){
        clearRatingBasisDetails()
        hideRatingBasisSaveButton()

    }
    else{
        clearRatingBasisDetails()
        fillRatingBasisDetails(ratingBasisID)
        showRatingBasisSaveButton()
    }

}
function showRatingBasisSaveButton(){
    $('#saveRatingBasisButton').css('display', '')
}
function hideRatingBasisSaveButton(){
    $('#saveRatingBasisButton').css('display', 'none')

}
function clearRatingBasisDetails(){
    //CLEAR ALL INPUTS
    $('#ratingBasisPageLeftColumn input:text').val('')

    //RESET ALL SELECTS
    $('#ratingBasisPageLeftColumn select').each(function () {
        $(this).val( $(this).find('option:first').val() )
    })

    //CLEAR QUESTIONS
    clearQuestionToRateAgainst()
}
function fillRatingBasisDetails(ratingBasisID){
    var ratingBasisObject = getRatingBasisObjectByID(ratingBasisID)

    //FILL INPUT FIELDS
    $('#ratingBasisCodeInput').val(ratingBasisObject.basisID)
    $('#ratingBasisDescriptionInput').val(ratingBasisObject.description)

    setQuestionToRateAgainst(ratingBasisObject.basisQuestionID)

    //IF LIMIT RATING BASIS HIDE QUESTION CONTAINER
    if(ratingBasisObject.basisID === 'LIMIT'){
        $('#ratingBasisPage_RatingBasisQuestionContainer').css('display', 'none')
    }

}


//RATE BASIS QUESTION
function insertRatingBasisQuestionButtonAction(button){
    var questionDropdown = $('#ratingBasisPage_ratingBasisQuestionDropdown')
    var questionID = $(questionDropdown).val()

    setQuestionToRateAgainst(questionID)
}
function setQuestionToRateAgainst(questionID){
    var defaultRequiredQuestionsContainer = $('#questionPreviewContainer')

    //CLEAR EXISTING QUESTION
    clearQuestionToRateAgainst()

    //GET QUESTION HTML
    var questionHTML = getRequiredQuestionHTML_noCloseButton_RatingBasisDataPage(questionID)

    //CHECK TO NOT INSERT SAME QUESTION TWICE
    if( $('#questionPreviewContainer .' + questionID ).length === 0 ){
        var questionElement = $(questionHTML)
        $(defaultRequiredQuestionsContainer).append(questionElement)
    }

    //CLEAR QUESTION INPUT BOX
    $('#ratingBasisPage_ratingBasisQuestionDropdown').val('invalid')
}
function clearQuestionToRateAgainst(){
    $('#questionPreviewContainer .requiredQuestion').remove()
}
function buildDefaultRequiredQuestionsArray(){
    var defaultRequiredQuestionsArray = []

    $('#ratingBasisPage_DefaultRequiredQuestionsContainer .requiredQuestion').each(function () {
        var thisQuestionID = $(this).attr('data-questionid')

        defaultRequiredQuestionsArray.push(thisQuestionID)
    })

    return defaultRequiredQuestionsArray
}







//////////////////////QUESTIONS PAGE FUNCTIONS///////////////////
function questionCategoryHideButtonAction(hideButton){
    //HIDE QUESTIONS
    $(hideButton).closest('.panel').find('.panel-body').css('display','none')

    //SHOW THE SHOW BUTTON
    $(hideButton).siblings('.questionCategoryShowButton').css('display', '')

    //HIDE THE HIDE BUTTON
    $(hideButton).css('display', 'none')
}
function questionCategoryShowButtonAction(showButton){
    //SHOW QUESTIONS
    $(showButton).closest('.panel').find('.panel-body').css('display','')

    //SHOW THE HIDE BUTTON
    $(showButton).siblings('.questionCategoryHideButton').css('display', '')

    //HIDE THE SHOW BUTTON
    $(showButton).css('display', 'none')
}
function editQuestionCategoryButtonActionBACKUP(editCategoryButton){
    var headerElement = $(editCategoryButton).closest('.panel-heading').find('h6.questionCategoryHeader')
    var questionCategoryName = $(headerElement).attr('data-questioncategoryname')
    var questionCategoryID = $(headerElement).attr('data-questioncategorycode')

    //HIDE HEADER
    $(headerElement).css('display', 'none')

    //SHOW EDITABLE INPUT
    var categoryNameElement = $("<input class='form-control editQuestionCategoryNameInput' value='" + questionCategoryName + "' placeholder='Category Name'>")
    var categoryIDElement = $("<input class='form-control editQuestionCategoryIDInput' value='" + questionCategoryID +"' placeholder='Category Code'>")

    $(headerElement).after($(categoryNameElement))
    $(headerElement).after($(categoryIDElement))

    //HIDE EDIT BUTTON AND SHOW SAVE BUTTON
    $(editCategoryButton).css('display', 'none')
    $(editCategoryButton).siblings('button.doneQuestionCategoryButton').css('display', '')
    $(editCategoryButton).siblings('button.deleteCategoryButton').css('display', '')

    $(editCategoryButton).siblings('button.questionCategoryHideButton').css('display', 'none')
    $(editCategoryButton).siblings('button.questionCategoryShowButton').css('display', 'none')
    $(editCategoryButton).siblings('button.moveCategoryDownButton').css('display', 'none')
    $(editCategoryButton).siblings('button.moveCategoryUpButton').css('display', 'none')

    //HIDE QUESTIONS PANEL BODY
    $(editCategoryButton).closest('.panel').find('.panel-body').css('display','none')



}
function editQuestionCategoryButtonAction(editCategoryButton){
    var headerElement = $(editCategoryButton).closest('.panel-heading').find('h6.questionCategoryHeader')
    var questionCategoryName = $(headerElement).attr('data-questioncategoryname')
    var questionCategoryID = $(headerElement).attr('data-questioncategorycode')
    var dbID = $(headerElement).attr('data-id')

    $('#editQuestionCategory_categoryID').val(questionCategoryID)
    $('#editQuestionCategory_categoryName').val(questionCategoryName)
    $('#editQuestionCategory_id').val(dbID)

    $('#editQuestionCategoryModal').modal('show')


}
function doneQuestionCategoryButtonAction(doneButton){
    var headerElement = $(doneButton).closest('.panel-heading').find('h6.questionCategoryHeader')
    var panelBodyElement = $(doneButton).closest('.panel').find('.questionCategoryPanelBody')

    var nameInput = $('.editQuestionCategoryNameInput')
    var idInput = $('.editQuestionCategoryIDInput')
    var questionCategoryName = $(nameInput).val().trim()
    var questionCategoryID = $(idInput).val().trim()

    if(questionCategoryName.trim().length === 0 || questionCategoryID.trim().length === 0){
        alert("Category or Name cannot be Blank")
    }
    else{
        //CHANGE HEADER VALUES
        $(headerElement).attr('data-questioncategoryname', questionCategoryName)
        $(headerElement).attr('data-questioncategorycode', questionCategoryID)
        $(headerElement).html(questionCategoryName)
        $(panelBodyElement).attr('id', questionCategoryID + "_QuestionCategoryContainer")


        //SHOW HEADER
        $(headerElement).css('display', '')

        //HIDE DONE BUTTON AND SHOW EDIT BUTTON
        $(doneButton).css('display','none')
        $(doneButton).siblings('button.editQuestionCategoryButton').css('display', '')
        $(doneButton).siblings('button.deleteCategoryButton').css('display', 'none')

        $(doneButton).siblings('button.questionCategoryShowButton').css('display', '')
        $(doneButton).siblings('button.moveCategoryDownButton').css('display', '')
        $(doneButton).siblings('button.moveCategoryUpButton').css('display', '')



        //REMOVE INPUTS
        $(nameInput).remove()
        $(idInput).remove()
    }


}
function questionEditRowClickAction(thisRow){

    //CLICK ON ALREADY ACTIVE ROW
    if($(thisRow).hasClass('active')){
    }
    else{
        $('.questionEditRow').removeClass('active')
        $('.questionEditRow').find('select,button').css('display', 'none')
        $(thisRow).toggleClass('active')
        $(thisRow).find('select,button').css('display', '')
        closeQuestionDetails()
    }









}
function moveQuestionDown(downButton){
    var thisCategoryContainer = $(downButton).closest('.questionEditRow').parent()
    var thisRow = $(downButton).closest('.questionEditRow')
    var thisRowIndex = $(thisRow).index()
    var lastIndex = $(thisCategoryContainer).find('.questionEditRow').length

    if(thisRowIndex === lastIndex){

    }
    else{
        $(thisCategoryContainer).find('.questionEditRow').eq(thisRowIndex+1).after($(thisRow))

    }
}
function moveQuestionUp(upButton){
    var thisCategoryContainer = $(upButton).closest('.questionEditRow').parent()
    var thisRow = $(upButton).closest('.questionEditRow')
    var thisRowIndex = $(thisRow).index()

    if(thisRowIndex === 0){

    }
    else{
        $(thisCategoryContainer).find('.questionEditRow').eq(thisRowIndex-1).before($(thisRow))
    }
}
function moveCategoryDown(downButton){
    var thisCategoryContainer = $(downButton).closest('.questionCategoryRow').parent()
    var thisRow = $(downButton).closest('.questionCategoryRow')
    var thisRowIndex = $(thisRow).index()
    var lastIndex = $(thisCategoryContainer).find('.questionCategoryRow').length

    if(thisRowIndex === lastIndex){

    }
    else{
        $(thisCategoryContainer).find('.questionCategoryRow').eq(thisRowIndex+1).after($(thisRow))

    }
}
function moveCategoryUp(upButton){
    var thisCategoryContainer = $(upButton).closest('.questionCategoryRow').parent()
    var thisRow = $(upButton).closest('.questionCategoryRow')
    var thisRowIndex = $(thisRow).index()

    if(thisRowIndex === 0){

    }
    else{
        $(thisCategoryContainer).find('.questionCategoryRow').eq(thisRowIndex-1).before($(thisRow))
    }
}
function deleteCategoryButtonAction(deleteButton){
    var categoryContainer = $(deleteButton).closest('.questionCategoryRow')
    var categoryID = $(categoryContainer).attr('data-id')

    if( confirm("This will PERMANANTLY DELETE this Category") ){

        $.ajax({
            method: "POST",
            url: "/Admin/deleteQuestionCategory",
            data: {
                categoryID: categoryID,
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    //MOVE QUESTIONS FROM DELETED CATEGORY TO UNCATEGORIZED
                    var uncategorizedContainer = $('#NOCATEG_QuestionCategoryContainer .row')
                    $(categoryContainer).find('.questionEditRow').each(function(){
                        var questionEditRow = $(this).detach().appendTo($(uncategorizedContainer))
                    })

                    //REMOVE CATEGORY CONTAINER
                    $(categoryContainer).remove()

                    //SAVE NEW CATEGORY AND QUESTION ORDER
                    saveQuestionOrganizationChanges()

                    alert("Deleted")
                    $('.modal').modal('hide')

                }
                else if(msg === "Error"){
                    alert("Error Saving")
                }
                else{
                    alert(msg)
                }
            })
    }
    else{

    }

}
function deleteQuestionButtonAction(deleteButton){
    var questionEditRow = $(deleteButton).closest('.questionEditRow')
    var questionID = $(questionEditRow).attr('data-questionid')

    if (confirm('Are you sure you want to delete the question ' + questionID)) {
        $.ajax({
            method: "POST",
            url: "/Admin/deleteQuestion",
            data: {
                questionID: questionID,
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    $(questionEditRow).remove()
                    alert("Deleted")
                    $('.modal').modal('hide')
                }
                else if(msg === "Error"){
                    alert("Error Saving")
                }
                else{
                    alert(msg)
                }
            })
    } else {
        // Do nothing!
    }

}
function moveQuestionToCategoryDropdownAction(dropdown){
    var thisRow = $(dropdown).closest('.questionEditRow')
    var newCategoryID = $(dropdown).val()
    var newCategoryContainer = $("#" + newCategoryID + "_QuestionCategoryContainer")
    $(thisRow).remove()
    $(newCategoryContainer).append($(thisRow))

}
function addQuestionToCategory(questionID){
    //FIND NEWLY CREATED QUESTION BY ID
    var questionObject = getQuestionObjectFromQuestionID(questionID)
    var category = questionObject.category
    var questionCategoryRowElement = $('#' + category + '_QuestionCategoryRow')
    var questionCategoryContainer = $('#' + category + '_QuestionCategoryContainer')

    var newRow = $(questionCategoryRowElement).find('.questionEditRow').eq(0).clone()

    //REPLACE NECESSARY DATA IN NEW ROW
    $(newRow).attr('data-questionid', questionObject.questionID)
    $(newRow).attr('data-id', questionObject.id)

    $(newRow).find('.questionDetailContainer').attr('id', questionObject.questionID + '_QuestionDetailContainer')
    $(newRow).find('.questionDetailContainer').attr('data-questionid', questionObject.questionID)
    $(newRow).find('.questionDetailContainer').attr('data-id', questionObject.id)

    $(newRow).find('select.questionTypeDropdown').val(questionObject.questionType)
    $(newRow).find('select.questionTypeDropdown').trigger('change')

    $(newRow).find('input.questionIDInput').attr('value', questionObject.questionID)
    $(newRow).find('input.questionTextInput').attr('value', questionObject.questionText)

    $(newRow).find('input.questionAttachmentsCheckbox').prop('checked', false)


    $(newRow).find('.multiColumnDetailsContainer').css('display', 'none')
    $(newRow).find('.checkboxRadioOptionsContainer').closest('.checkbox_QuestionType').css('display', 'none')
    $(newRow).find('.dropdownOptionsContainer').closest('.dropdown_QuestionType').css('display', 'none')
    $(newRow).find('input.questionAttachmentsCheckbox').closest('.form-group').css('display', '')


    $(newRow).find('input.questionEditCheckbox').attr('data-questionid', questionObject.questionID)
    $(newRow).find('input.questionEditCheckbox').attr('data-id', questionObject.id)
    $(newRow).find('.questionTextSpan').html(questionObject.questionText)


    $(newRow).find('input.checkboxOptionInput').prop('checked', false)
    $(newRow).find('input.checkboxOptionInput').closest('.checkbox_QuestionType ').css('display', 'none')
    $(newRow).find('input.dropdownOptionsContainer').closest('.dropdown_QuestionType ').css('display', 'none')



    //ADD NEW ROW TO QUESTION CATEGORY CONTAINER
    $(questionCategoryContainer).children('.row').append($(newRow))


    //SHOW CATEGORY QUESTIONS
    $(questionCategoryRowElement).find('button.questionCategoryShowButton').click()
    $(newRow).click()

}

//CATEGORY EDITING
function addCategoryPanel(categoryName, categoryCode, id){
    var newCategoryRow = $('.questionCategoryRow').eq(0).clone()
    var headerElement = $(newCategoryRow).find('h6.questionCategoryHeader')
    var panelBodyElement = $(newCategoryRow).find('.questionCategoryPanelBody')

    //CLEAR DATA
    $(newCategoryRow).attr('id', categoryCode + '_QuestionCategoryRow')
    $(newCategoryRow).attr('categorycode', categoryCode)
    $(newCategoryRow).attr('data-id', id)

    $(headerElement).attr('data-id', id)
    $(headerElement).attr('data-questioncategorycode', categoryCode)
    $(headerElement).attr('data-questioncategoryname', categoryName)
    $(headerElement).html(categoryName + " - " + categoryCode)


    $(panelBodyElement).attr('id', categoryCode + "_QuestionCategoryContainer")
    $(panelBodyElement).attr('data-categorycode', categoryCode)

    //CLEAR QUESTIONS
    $(panelBodyElement).find('.questionEditRow').remove()

    $('#questionCategoryRowsContainer').append($(newCategoryRow))


}
function editCategoryPanel(oldCategoryCode, categoryName, categoryCode){
    var categoryRow = $('#' + oldCategoryCode + '_QuestionCategoryRow')
    var headerElement = $(categoryRow).find('h6.questionCategoryHeader')
    var panelBodyElement = $(categoryRow).find('.questionCategoryPanelBody')

    //UPDATE DATA
    $(categoryRow).attr('id', categoryCode + '_QuestionCategoryRow')
    $(categoryRow).attr('categorycode', categoryCode)

    $(headerElement).attr('data-questioncategorycode', categoryCode)
    $(headerElement).attr('data-questioncategoryname', categoryName)
    $(headerElement).html(categoryName + " - " + categoryCode)


    $(panelBodyElement).attr('id', categoryCode + "_QuestionCategoryContainer")
    $(panelBodyElement).attr('data-categorycode', categoryCode)


}
function buildQuestionCategoryMap(){
    var questionCategoryArray =[]

    $('#questionsPage .questionCategoryRow h6.questionCategoryHeader').each(function(index){
        var thisCategoryMap = {}
        var categoryID = $(this).attr('data-id')
        var categoryCode = $(this).attr('data-questioncategorycode')
        var categoryName = $(this).attr('data-questioncategoryname')

        thisCategoryMap.id = categoryID
        thisCategoryMap.code = categoryCode
        thisCategoryMap.name = categoryName
        thisCategoryMap.weight = index

        questionCategoryArray.push(thisCategoryMap)
    })

    return questionCategoryArray
}
function buildQuestionOrderMap(){
    var questionOrderMapForCategories = []

    $('#questionsPage .questionEditRow').each(function(index){
        var questionCategoryHeader = $(this).closest('.questionCategoryPanel').find('.questionCategoryHeader')
        var categoryID = $(questionCategoryHeader).attr('data-questioncategorycode')
        var questionEditCheckbox = $(this).find('.questionEditCheckbox')
        var questionID = $(questionEditCheckbox).attr('data-questionid')
        var id = $(questionEditCheckbox).attr('data-id')
        var weight = index

        var questionMap = {
            id: id,
            questionID : questionID,
            categoryID: categoryID,
            weight: weight
        }

        questionOrderMapForCategories.push(questionMap)

    })

    return questionOrderMapForCategories
}


//QUESTION DETAIL STUFF
function editQuestionDetailsButtonAction(editQuestionButton){
    var thisQuestionRow = $(editQuestionButton).closest('.questionEditRow')
    var thisQuestionDetailContainer = $(thisQuestionRow).find('.questionDetailContainer')


    if( $(thisQuestionDetailContainer).css('display') === 'none'){
        fillQuestionDetail(thisQuestionRow)

        //BUILD QUESTION PREVIEW
        var previewContainer = $(editQuestionButton).closest('.questionEditRow').find('.previewContainer')
        var questionID = $(thisQuestionRow).find('.questionEditCheckbox').attr('data-questionid')
        var questionHTML = getNewSubmissionUWPreviewQuestion(questionID, {gridColumns : '12'})
        $(previewContainer).html($(questionHTML))

        $(thisQuestionDetailContainer).css('display','')

        //CHANGE EDIT BUTTON TO DONE EDITING BUTTON
        $(editQuestionButton).find('span').html("Done Editing")
    }
    else{
        $(thisQuestionDetailContainer).css('display','none')
        $(editQuestionButton).find('span').html("Edit Question")

    }

}
function closeQuestionDetails(){
    $('.questionDetailContainer').css('display','none')
    $('.editQuestionDetailsButton').find('span').html("Edit Question")
}
function fillQuestionDetail(questionEditRow){
    var questionID = $(questionEditRow).attr('data-questionid')
    var questionObject = getQuestionObjectFromQuestionID(questionID)

    //SET QUESTION TYPE
    var questionTypeDropdown = $(questionEditRow).find('.questionTypeDropdown')
    var inputType = questionObject.inputType

    if(inputType === 'text' || inputType === 'number'){
        if(questionObject.inputClass.indexOf('datepicker') > -1){
            $(questionTypeDropdown).val('datepicker')
        }
        else{
            $(questionTypeDropdown).val('basicText')
        }

    }
    else if(inputType === 'multiColumnInput'){
        $(questionTypeDropdown).val('multiColumn')

    }
    else if(inputType === 'textarea'){
        $(questionTypeDropdown).val('textarea')

    }
    else if(inputType === 'checkbox'){
        $(questionTypeDropdown).val('checkbox')

    }
    else if(inputType === 'radio'){
        $(questionTypeDropdown).val('radio')
    }
    else if(inputType === 'dropdown'){
        $(questionTypeDropdown).val('dropdown')

        var questionDetailContainer = $(questionTypeDropdown).closest('.questionDetailContainer')
        var dropdownOptionsContainer = $(questionDetailContainer).find('.inputTypeDetailSection .dropdownOptionsContainer')
        var optionsMap = jsonStringToObject(questionObject.dropdownOptionsValText)
        var optionsArrayKey = Object.keys(optionsMap)

        var htmlString = ""
        for(var i=0;i<optionsArrayKey.length;i++){
            var optionValue = optionsArrayKey[i]
            var optionText = optionsMap[optionValue]

            htmlString = htmlString + getDropdownOptionRowHTML(optionValue, optionText)
        }

        $(dropdownOptionsContainer).html(htmlString)

    }
    else if(inputType === 'custom_mailingAddress'){
        $(questionTypeDropdown).val('custom_mailingAddress')
    }
    else{
        $(questionTypeDropdown).val('invalid')

    }

    $(questionTypeDropdown).trigger('change')

}
function getQuestionPreviewHTML(questionObject){
    return getQuestionHTML(questionObject.questionID, questionObject)
}
function multiColumnNumberOfColumnsDropdownChange(dropdown){
    var multiColumnContainer = $(dropdown).closest('.multiColumnDetailsContainer')
    var multiColumnInputsContainer = $(multiColumnContainer).find('.multiColumn_ColumnInputsContainer')
    var numberOfColumns = $(dropdown).val()
    var columnWidth = 12/numberOfColumns

    console.log(numberOfColumns)
    var htmlString =
        "<div class='col-xs-" + columnWidth + " multiColumnDiv'>" +
        "   <div class='form-group'> " +
        "       <input class='form-control multiColumnInput' type='text' placeholder='Column Name' data-columnwidth='" + columnWidth + "'> " +
        "   </div>" +
        "</div>"
    var finalHTML = ""
    for(var i=0;i<numberOfColumns;i++){
        finalHTML = finalHTML + htmlString
    }

    $(multiColumnInputsContainer).html(finalHTML)
}
function buildMultiColumnMap(qID){
    var container = $('#' + qID + '_QuestionDetailContainer')
    var multiColumnMap = {}

    $(container).find('.multiColumnInput').each(function(){
        var columnInfoMap = {}
        columnInfoMap.columnPlaceholder = $(this).val()
        columnInfoMap.className = replaceAllSpacesWith(columnInfoMap.columnPlaceholder, '')
        columnInfoMap.width = "col-xs-" + $(this).attr('data-columnwidth')
        columnInfoMap.inputType = 'text'
        columnInfoMap.inputClass = 'form-control'
        columnInfoMap.attributes = ''



        multiColumnMap[columnInfoMap.className] = columnInfoMap
    })

    return multiColumnMap
}
function questionTypeDropdownChangeAction(dropdown){

    var questionType = $(dropdown).val()
    var questionDetailContainer = $(dropdown).closest('.questionDetailContainer')
    var questionPreviewContainer = $(questionDetailContainer).find('.previewContainer')
    var questionInputTypeDetailContainer = $(questionDetailContainer).find('.inputTypeDetailSection')
    var questionID = $(questionDetailContainer).attr('data-questionid')



    $(questionInputTypeDetailContainer).children().each(function(){
        if( $(this).hasClass('allQuestionTypes') || $(this).hasClass(questionType + '_QuestionType') ){
            $(this).css('display', '')
        }
        else{
            $(this).css('display', 'none')
        }
    })

    updateQuestionPreview(questionID)
    // var questionObject = buildQuestionObject(questionID)
    // questionObject.questionType = questionType
    // questionObject.gridColumns = "12"
    //
    // if(questionType === 'invalid'){
    //
    // }
    // else if(questionType === 'basicText'){
    //
    // }
    // else if(questionType === 'textarea'){
    //
    // }
    // else if(questionType === 'custom_mailingAddress'){
    //
    // }
    // else if(questionType === 'datepicker'){
    //
    // }
    // else if(questionType === 'checkbox'){
    //     questionObject.inputType = 'checkbox'
    //     questionObject.htmlCheckboxRadioValText = buildCheckboxRadioValTextMap(questionID)
    // }
    // else if(questionType === 'radio'){
    //     questionObject.inputType = 'radio'
    //     questionObject.htmlCheckboxRadioValText = buildCheckboxRadioValTextMap(questionID)
    // }
    // else if(questionType === 'dropdown'){
    //     questionObject.inputType = 'dropdown'
    //     questionObject.dropdownOptionsValText = buildDropdownOptionsValTextMap(questionID)
    // }
    // else if(questionType === 'multiColumn'){
    //     questionObject.inputType = 'multiColumnInput'
    //     questionObject.multiColumnMap = buildMultiColumnMap(questionID)
    // }
    //
    // //UPDATE PREVIEW
    // $(questionPreviewContainer).html(getQuestionPreviewHTML(questionObject))

    initializeGlobalListeners()
}
function addCheckboxOptionRow(button){
    var optionsContainer = $(button).closest('.checkboxRadioOptionsContainer')
    var thisRow = $(button).closest('.checkboxRadioOptionRow')

    var htmlString =
        "<div class='row checkboxRadioOptionRow'> " +
        "   <div class='col-xs-8'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control input-xs checkboxOptionInput onChangeSaveQuestion' type='text'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-4'> " +
        "       <div class='form-group'> " +
        "           <button class='btn btn-xs btn-success checkboxRadioAddRowButton' style=''> " +
        "               <i class='fa fa-plus' aria-hidden='true'></i> " +
        "           </button> " +
        "           <button class='btn btn-xs btn-danger checkboxRadioRemoveRowButton onChangeSaveQuestion' style=''> " +
        "               <i class='fa fa-minus' aria-hidden='true'></i> " +
        "           </button> " +
        "       </div> " +
        "   </div> " +
        "</div>"

    $(thisRow).after(htmlString)
}
function removeCheckboxOptionRow(button){
    var optionsContainer = $(button).closest('.checkboxRadioOptionsContainer')
    var thisRow = $(button).closest('.checkboxRadioOptionRow')

    if( $(optionsContainer).find('.checkboxRadioOptionRow').length > 1 ){
        $(thisRow).remove()
    }
}
function buildCheckboxRadioValTextMap(qID){
    var container = $('#' + qID + '_QuestionDetailContainer')
    var checkboxRadioValTextMap = {}

    $(container).find('.checkboxRadioOptionsContainer .checkboxOptionInput').each(function(){
        var optionText = $(this).val()
        var optionValue = replaceAllSpacesWith(optionText, '')
        checkboxRadioValTextMap[optionValue] = optionText
    })

    return checkboxRadioValTextMap
}
function addDropdownOptionRow(button){
    var optionsContainer = $(button).closest('.dropdownOptionsContainer')
    var thisRow = $(button).closest('.dropdownOptionRow')

    var htmlString =
        "<div class='row dropdownOptionRow'> " +
        "   <div class='col-xs-4'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control input-xs dropdownOptionInput_Value' type='text' > " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-4'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control input-xs dropdownOptionInput_Text' type='text' > " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-4'> " +
        "       <div class='form-group'> " +
        "           <button class='btn btn-xs btn-success dropdownOptionAddRowButton' style=''> " +
        "               <i class='fa fa-plus' aria-hidden='true'></i> " +
        "           </button> " +
        "           <button class='btn btn-xs btn-danger dropdownOptionRemoveRowButton' style=''> " +
        "               <i class='fa fa-minus' aria-hidden='true'></i> " +
        "           </button> " +
        "       </div> " +
        "   </div> " +
        "</div>"

    $(thisRow).after(htmlString)
}
function getDropdownOptionRowHTML(value, text){
    var htmlString =
        "<div class='row dropdownOptionRow'> " +
        "   <div class='col-xs-4'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control input-xs dropdownOptionInput_Value' type='text' value='" + value + "'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-4'> " +
        "       <div class='form-group'> " +
        "           <input class='form-control input-xs dropdownOptionInput_Text' type='text' value='" + text + "'> " +
        "       </div> " +
        "   </div> " +
        "   <div class='col-xs-4'> " +
        "       <div class='form-group'> " +
        "           <button class='btn btn-xs btn-success dropdownOptionAddRowButton' style=''> " +
        "               <i class='fa fa-plus' aria-hidden='true'></i> " +
        "           </button> " +
        "           <button class='btn btn-xs btn-danger dropdownOptionRemoveRowButton' style=''> " +
        "               <i class='fa fa-minus' aria-hidden='true'></i> " +
        "           </button> " +
        "       </div> " +
        "   </div> " +
        "</div>"

    return htmlString
}
function removeDropdownOptionRow(button){
    var optionsContainer = $(button).closest('.dropdownOptionsContainer')
    var thisRow = $(button).closest('.dropdownOptionRow')

    if( $(optionsContainer).find('.dropdownOptionRow').length > 1 ){
        $(thisRow).remove()
    }
}
function buildDropdownOptionsValTextMap(qID){
    var container = $('#' + qID + '_QuestionDetailContainer')
    var dropdownOptionsValText = {}

    $(container).find('.dropdownOptionsContainer .dropdownOptionRow').each(function(){
        var optionText = $(this).find('.dropdownOptionInput_Text').val()
        var optionValue = $(this).find('.dropdownOptionInput_Value').val()
        dropdownOptionsValText[optionValue] = optionText
    })

    return dropdownOptionsValText
}
function updateQuestionPreview(questionID){
    var questionRow = $(".questionEditRow[data-questionid='" + questionID + "']")
    var questionPreviewContainer = $(questionRow).find('.previewContainer')
    var questionObject = buildQuestionObject(questionID)

    var questionType = $(questionRow).find('.questionTypeDropdown').val()
    questionObject.questionType = questionType
    questionObject.gridColumns = "12"

    if(questionType === 'invalid'){

    }
    else if(questionType === 'basicText'){

    }
    else if(questionType === 'textarea'){

    }
    else if(questionType === 'custom_mailingAddress'){

    }
    else if(questionType === 'datepicker'){

    }
    else if(questionType === 'checkbox'){
        questionObject.inputType = 'checkbox'
        questionObject.htmlCheckboxRadioValText = buildCheckboxRadioValTextMap(questionID)
    }
    else if(questionType === 'radio'){
        questionObject.inputType = 'radio'
        questionObject.htmlCheckboxRadioValText = buildCheckboxRadioValTextMap(questionID)
    }
    else if(questionType === 'dropdown'){
        questionObject.inputType = 'dropdown'
        questionObject.dropdownOptionsValText = buildDropdownOptionsValTextMap(questionID)
    }
    else if(questionType === 'multiColumn'){
        questionObject.inputType = 'multiColumnInput'
        questionObject.multiColumnMap = buildMultiColumnMap(questionID)
    }

    //UPDATE PREVIEW
    $(questionPreviewContainer).html(getQuestionPreviewHTML(questionObject))
}

//QUESTION SAVE
function buildQuestionObject(qID){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var questionDetailContainer = $("#" + qID + "_QuestionDetailContainer")
    var questionEditRow = $(questionDetailContainer).closest('.questionEditRow')
    var questionAttachmentsInput = $(questionEditRow).find('.questionAttachmentsCheckbox')
    var questionMap = {}

    if($(questionDetailContainer).find('.questionIDInput').val() === 0||
        $(questionDetailContainer).find('.questionTextInput').val() === 0 ||
        $(questionDetailContainer).find('.questionTypeDropdown').val() === 'invalid'){

        console.log("Error building Question Object")
        return undefined
    }
    else{

        questionMap.id = $(questionEditRow).attr('data-id')
        questionMap.questionID = $(questionDetailContainer).find('.questionIDInput').val()
        questionMap.questionType = $(questionDetailContainer).find('.questionTypeDropdown').val()
        questionMap.questionText = $(questionDetailContainer).find('.questionTextInput').val()
        questionMap.category = $(questionDetailContainer).closest('.questionCategoryPanelBody').attr('data-categorycode')

        questionMap.weight = $(questionEditRow).index()
        questionMap.hiddenFlag = "N"
        questionMap.gridSize = "xs"
        questionMap.gridColumns = "3"
        questionMap.containerClass = ""
        questionMap.containerDataAttr = ""
        questionMap.containerStyle = "''"
        questionMap.inputClass = "form-control questionAnswer showReview"
        questionMap.inputType = "text"
        questionMap.inputStyle = ""
        questionMap.inputDataAttr = ""
        questionMap.required = "N"
        questionMap.disabled = "N"
        questionMap.inputAddOnLeft = "N"
        questionMap.inputAddOnRight = "N"
        questionMap.inputButtonText = ""
        questionMap.inputAddOnText = ""
        questionMap.faIconLeft = "N"
        questionMap.faIconRight = "N"
        questionMap.faIconClass = ""
        questionMap.faIconStyle = ""
        questionMap.formGroupClass = ""
        questionMap.formGroupStyle = ""
        questionMap.formGroupDataAttr = ""
        questionMap.htmlCheckboxRadioValText = ""
        questionMap.htmlDataReviewName = questionMap.questionText
        questionMap.htmlPlaceholder = ""
        questionMap.attachments = "N"

        if(questionMap.questionType === 'basicText'){

        }
        else if(questionMap.questionType === 'textarea'){
            questionMap.inputType = "textarea"
        }
        else if(questionMap.questionType === 'custom_mailingAddress'){
            questionMap.inputType = "custom_mailingAddress"
        }
        else if(questionMap.questionType === 'datepicker'){
            questionMap.inputClass = questionMap.inputClass + " datepicker"
        }
        else if(questionMap.questionType === 'checkboxes'){
        }


        //ATTACHMENTS
        if( questionAttachmentsInput.is(':visible') && questionAttachmentsInput.prop('checked') === true ){
            questionMap.attachments = "Y"
        }

        return questionMap
    }

}


//////////////////////FORMS PAGE FUNCTIONS///////////////////
function onFormUploadButtonClickAction(formid){
    //CLICK HIDDEN FILE BUTTON
    // $('#' + formid + '_FormUploadButton').click()

    var htmlElem =  document.getElementById(formid + '_FormUploadFileInput')
    var file = htmlElem.files[0];

    var name = file.name;
    var size = file.size;
    var type = file.type;
    var ext = $(htmlElem).val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['pdf']) == -1) {
        alert('Only .pdf are permitted');
        $(htmlElem).val('');
    }
    else{
        $('#' + formid + '_FormUploadSubmitButton').click()
    }




}







//////////////////////DATA OBJECT METHODS///////////////////
function getSelectedOperationCategory(){
    return $('#operationCategoryDropdown').val()
}
function getSelectedOperationID(){
    return $('#operationsDropdown').val()
}
function getCurrentOperationTypeObject(){
    for(var i=0; i < operations.length; i++ ){
        if(operations[i].operationID === getSelectedOperationID()){
            return operations[i]
        }
    }
}
function getOperationObjectByOperationID(operationID){
    for(var i=0; i < operations.length; i++ ){
        if(operations[i].operationID === operationID){
            return operations[i]
        }
    }
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

function getCoverageObject(covID){
    for(var i=0; i<coverages.length; i++){
        if(coverages[i].coverageCode === covID){
            return coverages[i]
        }
    }
}
function getCurrentSelectedCoverageObject(){
    var coverageDropdown = $('#coveragesPage_coveragesDropdown')

    var covID = $(coverageDropdown).val()

    return getCoverageObject(covID)

}

function getCurrentSelectedProductID(){
    return $('#productsPage_productsDropdown').val()
}
function getProductObjectByID(productID){
    for(var i=0; i<products.length; i++){
        if(products[i].productID === productID){
            return products[i]
        }
    }
}

function getCurrentSelectedRateID(){
    return $('#ratePage_RatesDropdown').val()
}
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
function getCurrentSelectedRatingBasisID(){
    return $('#ratingBasisPage_RatingBasisDropdown').val()
}
function getSelectedRatingBasisQuestionID(){
    return $('#questionPreviewContainer .requiredQuestion').data('questionid')
}

function getConditionBasisObjectByID(conditionID){
    for(var i=0; i<conditionBasis.length; i++){
        if(conditionID === conditionBasis[i].conditionID){
            return conditionBasis[i]
        }
    }
}


function getQuestionIDFromText(questionText){
    for(var i=0;i<questions.length;i++){
        if(questionText.trim() === questions[i].questionText){
            return questions[i].questionID
        }
    }
}
function getQuestionCategoryFromID(questionID){
    for(var i=0;i<questions.length;i++){
        if(questionID === questions[i].questionID){
            return questions[i].category
        }
    }
}
function getQuestionObjectFromQuestionID(questionID){
    for(var i=0;i<questions.length;i++){
        if(questionID === questions[i].questionID){
            return questions[i]
        }
    }
}
function getQuestionCategoryObjectFromCode(categoryCode){
    for(var i=0; i<questionCategories.length; i++){
        if(questionCategories[i].categoryCode === categoryCode){
            return questionCategories[i]
        }
    }
}

function getFormsObjectByID(formID){
    for(var i=0; i<forms.length; i++){
        if(forms[i].formID === formID){
            return forms[i]
        }
    }
}



//////////////////////CRUD METHODS///////////////////
function saveOperation(){
    //SAVE OPERATIONS COVERAGE PRODUCT MAP
    setFooterStatusSaving()
    $.ajax({
        method: "POST",
        url: "/Admin/saveOperationsChanges",
        data: {
            operationID: getSelectedOperationID(),
            coveragePackageMap: JSON.stringify(buildCoveragePackageMap()),
            operationDescription: $('#operationPage_operationDescription').val(),
            activeFlag: $("input[name='operationActiveFlagRadioGroup']:checked").val(),
            bindingAuthority: $("input[name='operationBindingAuthorityRadioGroup']:checked").val(),
            coverageShowMap: JSON.stringify(buildOperationCoverageShowMap()),
            coverageProductMap: JSON.stringify(buildOperationCoverageProductMap()),
            uwQuestionsMap: JSON.stringify(buildUWQuestionsMap()),
            requiredQuestionsMap: JSON.stringify(buildRequiredQuestionsMap()),
            weightOrderedRequiredQuestions: "[]",
            monolineArray: JSON.stringify(buildMonolineCoveragesArray())
        }
    })
        .done(function(msg) {
            if(msg === "Success"){
                refreshOperations()
                refreshOperationCategories()
                setFooterStatusUpToDate()
            }
            else if(msg === "Error"){
                alert("Error Saving")
                setFooterStatusSaveError()
            }
        });
}
function createNewOperation(){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var operationID = $('#newOperation_operationID').val().trim()
    var operationDescription = $('#newOperation_operationDescription').val().trim()
    var activeFlag = $("#createOperationModal input[name='newOperation_operationActiveFlagRadioGroup']:checked").val()

    if(operationID.length === 0 || operationDescription.length === 0 || activeFlag === undefined){
        alert("Complete All Fields")
    }
    else{
        $.ajax({
            method: "POST",
            url: "/Admin/createOperationRecord",
            data: {
                operationID: operationID,
                operationDescription: operationDescription,
                activeFlag: activeFlag
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    refreshOperationCategories()
                    refreshOperations()
                    alert("Saved")
                    $('.modal').modal('hide')
                }
                else if(msg === "Error"){
                    alert("Error Saving")
                }
                else{
                    alert(msg)
                }
            });
    }
}
function refreshOperations(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshOperations",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshOperations")
            }
            else{
                operations = jsonStringToObject(msg)

                //NO NEED TO UPDATE, RESET OPERATION CATEGORY DROPDOWN
                $(operationCategoryDropdown).val('invalid')
            }
        });
}
function refreshOperationCategories(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshOperationCategories",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshOperationCategories")
            }
            else{
                operationCategories = jsonStringToObject(msg)

                //UPDATE DROPDOWNS
                for(var i=0;i<operationCategories.length;i++){
                    var operationCategoryDropdown = $('#operationCategoryDropdown')

                    if( $(operationCategoryDropdown).find("option[value='" + operationCategories[i].description + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + products[i].productID + "'>" +
                            "(" + products[i].productID + ") " + products[i].productName +
                            "</option>"
                        )

                        $(operationCategoryDropdown).append( $(htmlElement) )
                    }
                }
            }
        });
}
function deleteOperation(operationID){
    if ( confirm('This will DELETE from AIM/DMU and the Website. Are you sure you want to delete Operation Type,' + operationID + ' - ' + getOperationObjectByOperationID(operationID).description + '') ) {
        setFooterStatusSaving()
        $.ajax({
            method: "POST",
            url: "/Admin/deleteOperation",
            data: {
                operationID: operationID
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    refreshOperations()
                    refreshOperationCategories()
                    setFooterStatusUpToDate()
                }
                else if(msg === "Error"){
                    alert("Error Saving")
                    setFooterStatusSaveError()
                }
            });
    } else {
        // Do nothing!
    }
}


function createNewCoverage(){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var coverageCode = $('#newCoverage_CoverageCode').val().trim()
    var coverageName = $('#newCoverage_CoverageName').val().trim()
    var activeFlag = $("#createCoverageModal input[name='newCoverage_coverageActiveFlagRadioGroup']:checked").val()

    if(coverageCode.length === 0 || coverageName.length === 0 || activeFlag === undefined){
        alert("Complete All Fields")
    }
    else{
        setFooterStatusSaving()
        $.ajax({
            method: "POST",
            url: "/Admin/createCoverage",
            data: {
                coverageCode: coverageCode,
                coverageName: coverageName,
                activeFlag: activeFlag
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    refreshCoverages()
                    setFooterStatusUpToDate()
                    $('.modal').modal('hide')

                }
                else if(msg === "Error"){
                    setFooterStatusSaveError()
                }
                else{
                    alert(msg)
                }
            });
    }
}
function saveCoverageChanges(){
    //SAVE COVERAGE
    setFooterStatusSaving()
    $.ajax({
        method: "POST",
        url: "/Admin/saveCoverageChanges",
        data: {
            coverageMap: JSON.stringify(buildCoverageObjectMap())
        }
    })
        .done(function(msg) {
            if(msg === "Success"){
                refreshCoverages()
                setFooterStatusUpToDate()
            }
            else if(msg === "Error"){
                alert("Error Saving")
                setFooterStatusSaveError()
            }
        });
}
function refreshCoverages(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshCoverages",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshCoverages")
            }
            else{
                coverages = jsonStringToObject(msg)

                //UPDATE DROPDOWNS
                for(var i=0;i<coverages.length;i++){
                    if( $('#coveragesPage_coveragesDropdown').find("option[value='" + coverages[i].coverageCode + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + coverages[i].coverageCode + "'>" +
                            "" + coverages[i].coverageCode + " - " + coverages[i].coverageName +
                            "</option>"
                        )

                        $('#newProduct_coverageCode').append( $(htmlElement) )
                    }
                    if( $('#newProduct_coverageCode').find("option[value='" + coverages[i].coverageCode + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + coverages[i].coverageCode + "'>" +
                            "" + coverages[i].coverageName +
                            "</option>"
                        )

                        $('#newProduct_coverageCode').append( $(htmlElement) )
                    }
                    if( $('#productsPage_CoverageDropdown').find("option[value='" + coverages[i].coverageCode + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + coverages[i].coverageCode + "'>" +
                            "" + coverages[i].coverageCode + " - " + coverages[i].coverageName +
                            "</option>"
                        )

                        $('#productsPage_CoverageDropdown').append( $(htmlElement) )
                    }


                }
            }
        });
}


function saveProductChanges(){
    //SAVE PRODUCT CHANGES
    setFooterStatusSaving()

    $.ajax({
        method: "POST",
        url: "/Admin/saveProductChanges",
        data: {
            productID: getCurrentSelectedProductID(),
            productMap: JSON.stringify(buildProductObjectMap()),
            formIDArray: JSON.stringify(buildFormIDArrayForProduct()),
            requiredQuestions: JSON.stringify(buildWeightOrderedRequiredQuestionsArray()),
            uwQuestions: JSON.stringify(buildWeightOrderedUWQuestionsArray()),
            limitArray: JSON.stringify(buildLimitArray()),
            deductArray: JSON.stringify(buildDeductArray()),
            additionalOptionsArray: JSON.stringify(buildAdditionalOptionsArray())


        }
    })
        .done(function(msg) {
            if(msg === "Success"){
                refreshProducts()
                setFooterStatusUpToDate()
            }
            else if(msg === "Error"){
                alert("Error Saving")
                setFooterStatusSaveError()
            }
        });
}
function createNewProduct(){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var productID = $('#newProduct_productID').val().trim()
    var productName = $('#newProduct_productName').val().trim()
    var coverageCode = $('#newProduct_coverageCode').val().trim()
    var companyID =  $('#newProduct_companyID').val().trim()
    var activeFlag = $("#createProductModal input[name='newProduct_productActiveFlagRadioGroup']:checked").val()

    if(productID.length === 0 || productName.length === 0 ||
        companyID === 'invalid' || coverageCode === 'invalid' || activeFlag === undefined){
        alert("Complete All Fields")
    }
    else{
        $.ajax({
            method: "POST",
            url: "/Admin/createProductRecord",
            data: {
                productID: productID,
                productName: productName,
                coverageCode: coverageCode,
                companyID: companyID,
                activeFlag: activeFlag
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    refreshProducts()
                    alert("Saved")
                    $('.modal').modal('hide')

                }
                else if(msg === "Error"){
                    alert("Error Saving")
                }
                else{
                    alert(msg)
                }
            });
    }
}
function refreshProducts(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshProducts",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshProducts")
            }
            else{
                products = jsonStringToObject(msg)

                //UPDATE DROPDOWNS
                for(var i=0;i<products.length;i++){
                    var covID = products[i].coverage

                    //FIND DROPDOWNS FOR COVERAGE AND CHECK IF PRODUCT NEEDS TO BE ADDED
                    $("." + covID + "_ProductsForCoverageSelect").each(function(){
                        if( $(this).find("option[value='" + products[i].productID + "']").length === 0 ){
                            var htmlElement = $(
                                "<option value='" + products[i].productID + "'>" +
                                "(" + products[i].productID + ") " + products[i].productName +
                                "</option>"
                            )

                            $(this).append( $(htmlElement) )
                        }
                    })

                    if( $('#productsPage_productsDropdown').find("option[value='" + products[i].productID + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + products[i].productID + "'>" +
                            "" + products[i].productID + " - " + products[i].productName +
                            "</option>"
                        )

                        $('#productsPage_productsDropdown').append( $(htmlElement) )
                    }
                }
            }
        });
}

function saveQuestionChanges(questionID){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var questionEditRow = $(".questionEditRow[data-questionid='" + questionID + "']")
    var questionDetailContainer = $(questionEditRow).find('.questionDetailContainer')
    var questionAttachmentsInput = $(questionEditRow).find('.questionAttachmentsCheckbox')
    var questionID = $(questionDetailContainer).find('.questionIDInput').val()
    var questionMap = getQuestionObjectFromQuestionID(questionID)

    questionMap.id = $(questionEditRow).attr('data-id')
    questionMap.questionID = $(questionDetailContainer).find('.questionIDInput').val()
    questionMap.questionType = $(questionDetailContainer).find('.questionTypeDropdown').val()
    questionMap.questionText = $(questionDetailContainer).find('.questionTextInput').val()
    questionMap.category = $(questionDetailContainer).closest('.questionCategoryPanelBody').attr('data-categorycode')

    // questionMap.weight = $(questionEditRow).index()
    // questionMap.hiddenFlag = "N"
    // questionMap.gridSize = "xs"
    // questionMap.gridColumns = "3"
    // questionMap.containerClass = ""
    // questionMap.containerDataAttr = ""
    // questionMap.containerStyle = ""
    // questionMap.inputClass = "form-control questionAnswer showReview"
    // questionMap.inputType = "text"
    // questionMap.inputStyle = ""
    // questionMap.inputDataAttr = ""
    // questionMap.required = "N"
    // questionMap.disabled = "N"
    // questionMap.inputAddOnLeft = "N"
    // questionMap.inputAddOnRight = "N"
    // questionMap.inputButtonText = ""
    // questionMap.inputAddOnText = ""
    // questionMap.faIconLeft = "N"
    // questionMap.faIconRight = "N"
    // questionMap.faIconClass = ""
    // questionMap.faIconStyle = ""
    // questionMap.formGroupClass = ""
    // questionMap.formGroupStyle = ""
    // questionMap.formGroupDataAttr = ""
    // questionMap.htmlCheckboxRadioValText = ""
    questionMap.htmlDataReviewName = questionMap.questionText
    // questionMap.htmlPlaceholder = ""
    // questionMap.attachments = "N"


    if(questionMap.questionID.length === 0 || questionMap.questionText.length === 0 || questionMap.questionCategory === 'invalid'){
        alert("Complete All Fields")
    }
    else{
        if(questionMap.questionType === 'invalid'){

        }
        else if(questionMap.questionType === 'basicText'){
            questionMap.inputType = 'text'
        }
        else if(questionMap.questionType === 'textarea'){
            questionMap.inputType = 'textarea'
        }
        else if(questionMap.questionType === 'custom_mailingAddress'){
            questionMap.inputType = 'custom_mailingAddress'
        }
        else if(questionMap.questionType === 'datepicker'){
            questionMap.inputType = 'text'
        }
        else if(questionMap.questionType === 'checkbox'){
            questionMap.inputType = 'checkbox'
            questionMap.htmlCheckboxRadioValText = buildCheckboxRadioValTextMap(questionID)
        }
        else if(questionMap.questionType === 'radio'){
            questionMap.inputType = 'radio'
            questionMap.htmlCheckboxRadioValText = buildCheckboxRadioValTextMap(questionID)
        }
        else if(questionMap.questionType === 'dropdown'){
            questionMap.inputType = 'dropdown'
            questionMap.dropdownOptionsValText = buildDropdownOptionsValTextMap(questionID)
        }
        else if(questionMap.questionType === 'multiColumn'){
            questionMap.inputType = 'multiColumnInput'
            questionMap.multiColumnMap = buildMultiColumnMap(questionID)
        }

        //ATTACHMENTS
        if( questionAttachmentsInput.is(':visible') && questionAttachmentsInput.prop('checked') === true ){
            questionMap.attachments = "Y"
        }

        setFooterStatusSaving()
        $.ajax({
            method: "POST",
            url: "/Admin/saveQuestionChanges",
            data: {
                questionMap: JSON.stringify( questionMap )
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    refreshQuestionCategories()
                    refreshQuestions()
                    // alert("Saved")
                    setFooterStatusUpToDate()
                    updateQuestionPreview(questionID)
                }
                else if(msg === "Error"){
                    // alert("Error Saving")
                    setFooterStatusSaveError()
                }
                else{
                    alert(msg)
                }
            });
    }
}
function saveQuestionOrganizationChanges(){
    //SAVE OPERATIONS COVERAGE PRODUCT MAP
    setFooterStatusSaving()
    $.ajax({
        method: "POST",
        url: "/Admin/saveQuestionOrganizationChanges",
        data: {
            questionCategoryMap: JSON.stringify(buildQuestionCategoryMap()),
            questionOrderMap: JSON.stringify(buildQuestionOrderMap())
        }
    })
        .done(function(msg) {
            if(msg === "Success"){
                refreshQuestions()
                refreshQuestionCategories()
                setFooterStatusUpToDate()
            }
            else if(msg === "Error"){
                alert("Error Saving")
                setFooterStatusSaveError()
            }
        });
}
function refreshQuestions(questionID){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshQuestions",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshQuestions")
            }
            else{
                questions = jsonStringToObject(msg)

                //IF QUESTION ID WAS PASSED IN
                if(questionID){
                    addQuestionToCategory(questionID)
                }


            }
        });
}

function saveQuestionCategoryChanges(saveButton){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var questionCategoryCode = $('#editQuestionCategory_categoryID').val()
    var questionCategoryName = $('#editQuestionCategory_categoryName').val()
    var questionCategoryID = $('#editQuestionCategory_id').val()

    if(questionCategoryCode.length === 0 || questionCategoryName.length === 0 || questionCategoryID.length === 0){
        alert("Complete All Fields")
    }
    else{
        setFooterStatusSaving()
        $.ajax({
            method: "POST",
            url: "/Admin/saveQuestionCategoryChanges",
            data: {
                questionCategoryCode: questionCategoryCode,
                questionCategoryName: questionCategoryName,
                questionCategoryID: questionCategoryID
            }
        })
            .done(function(msg) {
                if(msg.indexOf("Success") > -1 ){
                    refreshQuestionCategories()
                    refreshQuestions()
                    setFooterStatusUpToDate()
                    $('#editQuestionCategoryModal').modal('hide')
                    // alert("Saved")
                    // window.location.reload(true)
                    var oldCategoryCode = msg.split(":")[1]
                    editCategoryPanel(oldCategoryCode, questionCategoryName, questionCategoryCode)
                }
                else if(msg === "Error"){
                    alert("Error Saving")
                    setFooterStatusSaveError()
                }
                else{
                    alert(msg)
                }
            });
    }
}
function createNewQuestionCategory(){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var categoryCode = $('#newQuestionCategory_categoryID').val().trim()
    var categoryName = $('#newQuestionCategory_categoryName').val().trim()

    if(categoryCode.length === 0 || categoryName.length === 0 ){
        alert("Complete All Fields")
    }
    else{
        setFooterStatusSaving()
        $.ajax({
            method: "POST",
            url: "/Admin/createNewQuestionCategory",
            data: {
                categoryCode: categoryCode,
                categoryName: categoryName,
                weight: $('.questionCategoryRow').length
            }
        })
            .done(function(msg) {
                if(msg === "Error"){
                    setFooterStatusSaveError()
                }
                else if(msg.indexOf("Success") > -1 ){
                    var dataid = msg.split(":")[1]
                    refreshQuestionCategories()
                    // alert("Saved")
                    $('.modal').modal('hide')
                    setFooterStatusUpToDate()
                    // window.location.reload(true);
                    addCategoryPanel(categoryName, categoryCode, dataid)

                }
            });
    }
}
function refreshQuestionCategories(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshQuestionCategories",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshQuestionCategories")
            }
            else{
                questionCategories = jsonStringToObject(msg)

                //UPDATE DROPDOWNS
                for(var i=0;i<questionCategories.length;i++){

                    //FIND DROPDOWNS FOR COVERAGE AND CHECK IF PRODUCT NEEDS TO BE ADDED
                    $(".moveQuestionToCategoryDropdown").each(function(){
                        if( $(this).find("option[value='" + questionCategories[i].categoryCode + "']").length === 0 ){
                            var htmlElement = $(
                                "<option value='" + questionCategories[i].categoryCode + "'>" +
                                "" + questionCategories[i].categoryName +
                                "</option>"
                            )

                            $(this).append( $(htmlElement) )
                        }
                    })

                    if( $('#newQuestion_questionCategory').find("option[value='" + questionCategories[i].categoryCode + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + questionCategories[i].categoryCode + "'>" +
                            "" + questionCategories[i].categoryName +
                            "</option>"
                        )

                        $('#newQuestion_questionCategory').append( $(htmlElement) )
                    }
                }

                //CHANGE DATA ATTRIBUTES

            }
        });
}

function saveRate(saveRatebutton){

    //DETERMINE RATE TYPE
    setFooterStatusSaving()
    var dataMap ={}
    dataMap.rateID = getCurrentSelectedRateID()
    dataMap.description = $('#rateDescriptionInput').val()
    dataMap.rateBasis = $('#ratePage_RatingBasisDropdown').val()
    if(dataMap.rateBasis === "LIMIT"){
        dataMap.limitRateArray = JSON.stringify( ratesPage_buildLimitRateArray() )
    }
    else if(dataMap.rateBasis === "BRACKET"){
        dataMap.bracketRateArray = JSON.stringify( ratesPage_buildBracketRateArray() )
        dataMap.minPremium = $('#ratesPage_BracketRateMinPremium').val()
    }
    else if(dataMap.rateBasis === "FLAT"){
        dataMap.flatAmount = $('#ratesPage_FlatRateValueInput').val()
    }
    else{
        dataMap.rateValue = $('#ratesPage_RateValueInput').val()
        dataMap.minPremium = $('#ratesPage_MinPremiumInput').val()
    }

    $.ajax({
        method: "POST",
        url: "/Admin/saveRateChanges",
        data: dataMap
    })
        .done(function(msg) {
            if(msg === "Success"){
                refreshRates()
                setFooterStatusUpToDate()
            }
            else if(msg === "Error"){
                alert("Error Saving")
                setFooterStatusSaveError()
            }
        });
}
function createNewRate(){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var rateID = $('#newRate_rateID').val().trim()
    var rateName = $('#newRate_rateName').val().trim()
    var ratingBasis = $('#newRate_ratingBasis').val().trim()

    if(rateID.length === 0 || rateName.length === 0 || ratingBasis === 'invalid' ){
        alert("Complete All Fields")
    }
    else{
        $.ajax({
            method: "POST",
            url: "/Admin/createRateRecord",
            data: {
                rateID: rateID,
                rateName: rateName,
                ratingBasis: ratingBasis
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    refreshRates()
                    alert("Saved")
                    $('.modal').modal('hide')
                }
                else if(msg === "Error"){
                    alert("Error Saving")
                }
                else{
                    alert(msg)
                }
            });
    }
}
function refreshRates(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshRates",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshRates")
            }
            else{
                rates = jsonStringToObject(msg)

                //UPDATE DROPDOWNS
                for(var i=0;i<rates.length;i++){
                    if( $('#ratePage_RatesDropdown').find("option[value='" + rates[i].rateID + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + rates[i].rateID + "'>" +
                            "" + rates[i].rateID + " - " + rates[i].description +
                            "</option>"
                        )

                        $('#ratePage_RatesDropdown').append( $(htmlElement) )
                    }

                    if( $('#productsPage_ProductRateDropdown').find("option[value='" + rates[i].rateID + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + rates[i].rateID + "'>" +
                            "" + rates[i].rateID + " - " + rates[i].description +
                            "</option>"
                        )

                        $('#productsPage_ProductRateDropdown').append( $(htmlElement) )
                    }
                }


            }
        });
}
function validateRatePage(){
    var valid = true
    var ratingBasisID = $('#ratePage_RatingBasisDropdown').val()

    if($('#rateIDInput').val().trim().length === 0){
        valid = false
    }

    if($('#rateDescriptionInput').val().trim().length === 0){
        valid = false
    }

    if($('#ratePage_RatingBasisDropdown').val() === null || $('#ratePage_RatingBasisDropdown').val().trim().length === 'invalid'){
        valid = false
    }

    if(ratingBasisID){
        if(ratingBasisID === 'LIMIT'){
            $('.limitRatingRow .ratesPage_LimitRateValueInput').each(function() {
                if($(this).val().trim().length === 0){
                    valid = false
                }
            })
            $('.limitRatingRow .ratesPage_LimitDescriptionInput').each(function() {
                if($(this).val().trim().length === 0){
                    valid = false
                }
            })
            $('.limitRatingRow .ratesPage_LimitMinPremiumInput').each(function() {
                if($(this).val().trim().length === 0){
                    valid = false
                }
            })
        }
        else if(ratingBasisID === 'BRACKET'){
            $('.bracketRatingRow .ratesPage_BracketRateValueInput').each(function() {
                if($(this).val().trim().length === 0){
                    valid = false
                }
            })
            $('.bracketRatingRow .ratesPage_BracketUpToInput').each(function() {
                if($(this).val().trim().length === 0){
                    valid = false
                }
            })

            if($('#ratesPage_BracketRateMinPremium').val().trim().length === 0){
                valid = false
            }
        }
        else if(ratingBasisID === 'FLAT'){
            if($('#ratesPage_FlatRateValueInput').val().trim().length === 0){
                valid = false
            }
        }
        else{
            if($('#ratesPage_RateValueInput').val().trim().length === 0){
                valid = false
            }

            if($('#ratesPage_MinPremiumInput').val().trim().length === 0){
                valid = false
            }
        }
    }
    else{
        valid = false
    }

    console.log(valid)




    return valid


}

function saveRatingBasis(){
    //SAVE OPERATIONS COVERAGE PRODUCT MAP
    setFooterStatusSaving()
    $.ajax({
        method: "POST",
        url: "/Admin/saveRatingBasisChanges",
        data: {
            basisID: getCurrentSelectedRatingBasisID(),
            description: $('#ratingBasisDescriptionInput').val(),
            requiredQuestions: JSON.stringify(buildDefaultRequiredQuestionsArray()),
            basisQuestionID: getSelectedRatingBasisQuestionID()
        }
    })
        .done(function(msg) {
            if(msg === "Success"){
                refreshRatingBasis()
                setFooterStatusUpToDate()
            }
            else if(msg === "Error"){
                alert("Error Saving")
                setFooterStatusSaveError()
            }
        });
}
function createNewRatingBasis(){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var ratingBasisID = $('#newRatingBasis_ratingBasisID').val().trim()
    var ratingBasisDescription = $('#newRatingBasis_ratingBasisName').val().trim()

    if(ratingBasisID.length === 0 || ratingBasisDescription.length === 0 ){
        alert("Complete All Fields")
    }
    else{
        $.ajax({
            method: "POST",
            url: "/Admin/createRatingBasisRecord",
            data: {
                ratingBasisID: ratingBasisID,
                ratingBasisDescription: ratingBasisDescription
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    refreshRatingBasis()
                    alert("Saved")
                    $('.modal').modal('hide')
                }
                else if(msg === "Error"){
                    alert("Error Saving")
                }
                else{
                    alert(msg)
                }
            });
    }
}
function refreshRatingBasis(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshRatingBasis",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshRatingBasis")
            }
            else{
                ratingBasis = jsonStringToObject(msg)

                //UPDATE DROPDOWNS
                for(var i=0;i<ratingBasis.length;i++){
                    if( $('#ratingBasisPage_RatingBasisDropdown').find("option[value='" + ratingBasis[i].basisID + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + ratingBasis[i].basisID + "'>" +
                            "" + rates[i].description +
                            "</option>"
                        )

                        $('#ratingBasisPage_RatingBasisDropdown').append( $(htmlElement) )
                    }

                    if( $('#ratePage_RatingBasisDropdown').find("option[value='" + ratingBasis[i].basisID + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + ratingBasis[i].basisID + "'>" +
                            "" + ratingBasis[i].description +
                            "</option>"
                        )

                        $('#ratePage_RatingBasisDropdown').append( $(htmlElement) )
                    }

                    if( $('#newRate_ratingBasis').find("option[value='" + ratingBasis[i].basisID + "']").length === 0 ){
                        var htmlElement = $(
                            "<option value='" + ratingBasis[i].basisID + "'>" +
                            "" + ratingBasis[i].description +
                            "</option>"
                        )

                        $('#newRate_ratingBasis').append( $(htmlElement) )
                    }

                }


            }
        });
}

function createNewQuestion(){
    //CHECK IF ALL REQUIRED FIELDS ARE FILLED
    var questionID = $('#newQuestion_questionID').val().trim()
    var questionText = $('#newQuestion_questionText').val().trim()
    var questionCategory = $('#newQuestion_questionCategory').val()

    if(questionID.length === 0 || questionText.length === 0 || questionCategory === 'invalid'){
        alert("Complete All Fields")
    }
    else{
        setFooterStatusSaving()
        $.ajax({
            method: "POST",
            url: "/Admin/createNewQuestion",
            data: {
                questionID: questionID,
                questionText: questionText,
                questionCategory: questionCategory
            }
        })
            .done(function(msg) {
                if(msg === "Error"){
                    setFooterStatusSaveError()
                }
                else if(msg === "Success"){
                    refreshQuestions(questionID)
                    $('.modal').modal('hide')
                    setFooterStatusUpToDate()
                    // window.location.reload(true);
                }
                else{
                    alert(msg)
                }
            });
    }
}


function saveFormChanges(formid){
    var formEditRow = $('#' + formid + '_FormRow')
    var formID = $(formEditRow).find('.formIDInput').val()
    var formName = $(formEditRow).find('.formNameInput').val()


    setFooterStatusSaving()
    $.ajax({
        method: "POST",
        url: "/Admin/saveFormChanges",
        data: {
            id: formid,
            formID: formID,
            formName: formName
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                setFooterStatusSaveError()
                console.log("Error: refreshProducts")
            }
            else{
                refreshForms()
                setFooterStatusUpToDate()
                //UPDATE DROPDOWNS
            }
        });
}
function refreshForms(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshForms",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshForms")
            }
            else{
                forms = jsonStringToObject(msg)

                refreshFormsCheckboxesProductPage()
            }
        });
}
function isFormIDUnique(formID){
    var formObject = getFormsObjectByID(formID)
    if(formObject === null || formObject === undefined){
        return true
    }
    else{
        return false
    }
}




function refreshConditionBasis(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshConditionBasis",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshConditionBasis")
            }
            else{
                conditionBasis = jsonStringToObject(msg)
            }
        });
}
function refreshConditionOperators(){
    $.ajax({
        method: "POST",
        url: "/Admin/refreshConditionOperators",
        data: {
        }
    })
        .done(function(msg) {
            if(msg === "Error"){
                console.log("Error: refreshConditionOperators")
            }
            else{
                conditionOperators = jsonStringToObject(msg)
            }
        });
}



function refreshAll(){
    refreshProducts()
    refreshProducts()
    refreshOperations()
    refreshCoverages()
    refreshConditionBasis()
    refreshConditionOperators()
    refreshQuestions()
    refreshQuestionCategories()
    refreshRatingBasis()
    refreshRates()
    refreshForms()
}