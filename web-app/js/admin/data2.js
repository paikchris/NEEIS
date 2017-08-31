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

var riskTypes, riskCategories, products, operations, coverages, conditionBasis, conditionOperators, questions,
    ratingBasisArray, rates
var riskTypeString

$(document).ready(function () {

    dataInit()
});





///////////////////INIT FUNCTIONS///////////////////
function dataInit(){
    riskTypes = rT
    riskCategories = rC
    products = pr
    operations = oT
    coverages = cT
    conditionBasis = cB
    conditionOperators = cO
    questions = qL
    ratingBasisArray = rB
    rates = rL
    forms = fL


    initializeListeners()
}
function initializeListeners(){
    /////////////////////OPERATIONS PAGE///////////////////
    $(document.body).on('change', '#operationsDropdown', function(e) {
        operationSelectAction(this)
    });

    //PRODUCT CONDITIONS
    $(document.body).on('click', '.editProductsButton', function(e) {
        editProductsButtonAction(this)
    });
    $(document.body).on('click', '.editRatingBasisButton', function(e) {
        editRatingBasisButtonAction(this)
    });
    $(document.body).on('change', '.productConditionRadio', function(e) {
        var covID = $(this).data('covid')
        var uwQuestionsContainerID = $("#" + covID + "_UWQuestionsSection")

        if( $("input[name='" + $(this).attr('name') + "']:checked").length > 0 ){
            $(uwQuestionsContainerID).css('display', '')
        }
        else{
            $(uwQuestionsContainerID).css('display', 'none')
        }
    });
    $(document.body).on('click', '.addProductConditionRow', function(e) {
        addProductConditionsRow(this)
    });
    $(document.body).on('click', '.removeProductConditionRow', function(e) {
        removeProductConditionRow(this)
    });
    $(document.body).on('change', '.conditionBasisValue:not(.maskMoney)', function(e) {
        //HAS TO BE A NUMBER
        if( isNaN( $(this).val() ) ){
            var newVal = $(this).val().replace(/[^0-9.]/g, "")
            console.log(newVal)
            $(this).val(newVal)
        }
        else{

        }

    });

    //SAVE
    $(document.body).on('click', '#saveOperationButton', function(e) {
        saveOperation(this)
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
        var questionID = $('#productPage_requiredQuestionsDropdown').val()
        addRequiredQuestion(questionID)
    })
    $(document.body).on('click', '#productPage_insertUWQuestion', function(e) {
        var questionID = $('#productPage_uwQuestionsDropdown').val()
        addUWQuestion(questionID)
    })





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





    /////////////////////RATING BASIS PAGE///////////////////
    $(document.body).on('change', '#ratingBasisPage_RatingBasisDropdown', function(e) {
        ratingBasisPage_RatingBasisDropdownAction(this)
    });
    $(document.body).on('change', '#questionToRateDropdown', function(e) {
        selectQuestionToRateAgainst(this)
    });
    $(document.body).on('click', '.requiredQuestion button.close', function(e) {
        ratingBasisPage_RemoveDefaultRequiredQuestionButtonAction(this)
    });
    $(document.body).on('click', '#ratingBasisPage_DefaultRequiredQuestions .requiredQuestion', function(e) {
        $(this).toggleClass('basisActive')
    });




    //SAVE
    $(document.body).on('click', '#saveRatingBasisButton', function(e) {
        saveRatingBasis(this)
    });

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





///////////////////OPERATIONS PAGE FUNCTIONS///////////////////
function operationSelectAction(input){
    hideCoveragesAllowedContainer()
    clearCoveragesAllowedContainer()
    if($(input).val() === "invalid"){

    }
    else{
        showCoveragesAllowedContainer()
        fillCoveragesAllowedContainer()
    }
}
function getCurrentOperationTypeObject(){
    for(var i=0; i < operations.length; i++ ){
        if(operations[i].operationID === getSelectedOperationID()){
            return operations[i]
        }
    }
}
function getSelectedOperationID(){
    return $('#operationsDropdown').val()
}
function saveOperation(){
    //SAVE OPERATIONS COVERAGE PRODUCT MAP

    $.ajax({
        method: "POST",
        url: "/Admin/saveOperationsChanges",
        data: {
            operationID: getSelectedOperationID(),
            coverageProductMap: JSON.stringify(buildOperationCoverageProductMap()),
            uwQuestionsMap: JSON.stringify(buildUWQuestionsMap())
        }
    })
        .done(function(msg) {
            if(msg === "Success"){
                alert("Saved")
            }
            else if(msg === "Error"){
                alert("Error Saving")
            }
        });
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

    //FILL COVERAGE DETAILS CONTAINER
    $('#coveragesAllowedContainer .coverageCheckbox').each(function(){
        var thisCovID = $(this).attr('data-covid')

        //FILL PRODUCT CONDITIONS
        if(tempOperationsMap.coverageProductMap != null) {

            var tempCoverageProductMap = jsonStringToObject(tempOperationsMap.coverageProductMap)
            var tempCoveragesAllowedArray = Object.keys(tempCoverageProductMap)
            // console.log(tempCoverageProductMap)


            //IF THIS CHECKBOX IS IN THE COVERAGES ALLOWED MAP CHECK IT
            if (tempCoveragesAllowedArray.indexOf(thisCovID) > -1) {
                $(this).prop('checked', true)
                $(this).trigger('change')


                var tempArrayOfProductConditions = tempCoverageProductMap[thisCovID]

                //FILL PRODUCT CONDITIONS
                if (tempArrayOfProductConditions.length > 0) {
                    if (tempArrayOfProductConditions[0].condition === 'Always') {
                        //SELECT ALWAYS RADIO BUTTON
                        $('#' + thisCovID + 'radio_Always').prop('checked', true)
                        $('#' + thisCovID + 'radio_Always').trigger('change')

                        $('#' + thisCovID + '_productsForCoverageSelect').val(tempArrayOfProductConditions[0].productID)

                    }
                    else if (tempArrayOfProductConditions[0].condition === 'When') {
                        //SELECT WHEN RADIO BUTTON
                        $('#' + thisCovID + 'radio_When').prop('checked', true)
                        $('#' + thisCovID + 'radio_When').trigger('change')


                        var rowHTML = $('#' + thisCovID + '_radioGroupContainer_When').find('.productConditionsRow').clone()
                        var productConditionsContainer = $('#' + thisCovID + '_radioGroupContainer_When').find('.productConditionsContainer')
                        $(productConditionsContainer).html('')
                        for (var i = 0; i < tempArrayOfProductConditions.length; i++) {
                            var mapOfCondition = tempArrayOfProductConditions[i]

                            var rowTemplate = $(rowHTML).clone()
                            //FILL IN CLONED ROW
                            $(rowTemplate).find('.conditionBasisValue').val(mapOfCondition.basisValue)
                            $(rowTemplate).find('.productsForCoverageSelect').val(mapOfCondition.productID)
                            $(rowTemplate).find('.productConditionBasis').val(mapOfCondition.conditionBasis)
                            $(rowTemplate).find('.productConditionOperator').val(mapOfCondition.conditionOperator)

                            if(i>0){
                                $(rowTemplate).find('.removeProductConditionRow').css('display', '')
                            }


                            $(productConditionsContainer).append($(rowTemplate))

                        }
                    }
                }
            }
        }

        //FILL UNDERWRITER QUESTIONS
        if(tempOperationsMap.underwriterQuestionsMap != null && tempOperationsMap.underwriterQuestionsMap.trim().length > 0){
            var tempUWQuestionsMap = jsonStringToObject(tempOperationsMap.underwriterQuestionsMap)
            console.log(tempUWQuestionsMap)
            if(tempUWQuestionsMap[thisCovID] != null){
                if(tempUWQuestionsMap[thisCovID].underwriterQuestions != null){
                    var underwriterQuestionsContainer = $('#' + thisCovID + '_UnderwriterQuestions')

                    //RESET AND CLEAR QUESTION CONTAINER
                    $(underwriterQuestionsContainer).html('')
                    var tempUWQuestionsArray = jsonStringToObject(tempUWQuestionsMap[thisCovID].underwriterQuestions)
                    // console.log(tempRatingRequiredQuestionsArray)
                    for(var i=0;i<tempUWQuestionsArray.length; i++){
                        // console.log(tempRatingRequiredQuestionsArray[i])
                        var questionHTML = getUWQuestionHTML(tempUWQuestionsArray[i])
                        $(underwriterQuestionsContainer).append($(questionHTML))
                    }

                }
            }
        }

    })

    initializeGlobalListeners()
}
function clearCoveragesAllowedContainer(){

    //RESET CONDITION TO ALWAYS
    $(".radioWithHiddenDiv_RadioContainer input[value='Always']").each(function () {
        $(this).prop('checked', true)
        $(this).trigger('change')
    })

    //REMOVE ALL BUT ONE PRODUCT CONDITION ROW
    var newRow = $('.productConditionsContainer .productConditionsRow').first().clone()
    $('.productConditionsContainer').each(function(){
        if($(this).find('.productConditionsRow').length > 1){
            $(this).find('.productConditionsRow').not(':first').remove()
        }
        resetThisProductConditionRow($(this).find('.productConditionsRow').first())

    })


    //RESET ALL SELECTS
    $('.coverageQuestionsContainer select').each(function () {
        $(this).val( $(this).find('option:first').val() )
    })

    //RESET RATING QUESTIONS
    $('.ratingBasisRequiredQuestions').empty()

    //RESET UNDERWRITER QUESTIONS
    $('.underwriterQuestions').empty()

    //HIDE COVERAGE CONTAINERS
    $('.coverageQuestionsContainer').css('display', 'none')


}
function buildOperationCoverageProductMap(){
    //COVERAGE PRODUCTS
    var coverageProductMap = {}
    $('#coveragesAllowedContainer').find('.coverageCheckbox:checked').each(function(){
        var productConditionArray = []
        var covID = $(this).attr('data-covid')
        var productMap = {}

        if($('#' + covID + 'radio_Always').is(':checked')){

            productMap.condition = 'Always'
            productMap.productID = $('#' + covID + '_radioGroupContainer_Always').find('.productsForCoverageSelect').val()

            productConditionArray.push(productMap)
        }
        else if($('#' + covID + 'radio_When').is(':checked')){
            $('#' + covID + '_radioGroupContainer_When').find('.productConditionsRow').each(function(){
                var productMap = {}
                productMap.condition = 'When'
                productMap.productID = $(this).find('.productsForCoverageSelect').val()
                productMap.conditionBasis = $(this).find('.productConditionBasis').val()
                productMap.conditionOperator = $(this).find('.productConditionOperator').val()

                //HAS TO BE A NUMBER
                productMap.basisValue = $(this).find('.conditionBasisValue').val().replace(/[^0-9.]/g, "");

                productConditionArray.push(productMap)
            })
        }
        coverageProductMap[covID] = productConditionArray

    })

    //RATING BASIS
    return coverageProductMap
}
function buildRatingBasisMap(){
    var ratingBasisMap = {}


    $('#coveragesAllowedContainer').find('.coverageCheckbox:checked').each(function(){
        var covID = $(this).attr('data-covid')
        var productMap = {}
        var requiredQuestionsArray = []
        productMap.ratingBasis = $('#' + covID + '_RatingBasis').val()

        //LOOP THROUGH QUESTIONS AND ADD THEM TO ARRAY
        $('#' + covID + '_RatingBasis_RequiredQuestionsContainer .requiredQuestion').each(function(){

            requiredQuestionsArray.push($(this).attr('data-questionid'))
        })
        productMap.requiredQuestions = requiredQuestionsArray
        ratingBasisMap[covID] = productMap
    })


    return ratingBasisMap
}
function buildUWQuestionsMap(){
    var underwriterQuestionsMap = {}


    $('#coveragesAllowedContainer').find('.coverageCheckbox:checked').each(function(){
        var covID = $(this).attr('data-covid')
        var productMap = {}
        var uwQuestionsArray = []

        //LOOP THROUGH QUESTIONS AND ADD THEM TO ARRAY
        $('#' + covID + '_UnderwritingQuestionsContainer .uwQuestion').each(function(){
            uwQuestionsArray.push($(this).attr('data-questionid'))
        })
        productMap.underwriterQuestions = uwQuestionsArray
        underwriterQuestionsMap[covID] = productMap
    })


    return underwriterQuestionsMap
}

//RATING BASIS
function getRatingBasisObjectByID(ratingBasisID){
    for(var i=0; i<ratingBasisArray.length; i++){
        if(ratingBasisID === ratingBasisArray[i].basisID){
            return ratingBasisArray[i]
        }
    }
}
function ratingBasisDropdownChangeAction(dropdown){
    var selectedRatingBasis = $(dropdown).val()
    var thisCovID = $(dropdown).attr('data-covid')

}

//OPERATIONS PAGE, PRODUCT CONDITIONS
function addProductConditionsRow(btnClicked){
    //SET THE PRODUCT CONDITIONS ROW HTML
    var insertElement = $(btnClicked).closest('.productConditionsRow').clone()

    //CLEAR THE CLONED ROW
    $(insertElement).find('.conditionBasisValue').val('')

    $(insertElement).find('.removeProductConditionRow').css('display', '')

    $(btnClicked).closest('.productConditionsContainer').append($(insertElement))

    initializeGlobalListeners()
}
function removeProductConditionRow(btnClicked){
    $(btnClicked).closest('.productConditionsRow').remove();
}
function resetThisProductConditionRow(productConditionRow){
    // var row = $(productConditionRow)
    var prodSelect = $(productConditionRow).find('.productsForCoverageSelect')
    $(prodSelect).val($(prodSelect).first().val())

    var condBasis = $(productConditionRow).find('.productConditionBasis')
    $(condBasis).val($(condBasis).first().val())

    var condOperator = $(productConditionRow).find('.productConditionOperator')
    $(condOperator).val($(condOperator).first().val())

    var basisValue = $(productConditionRow).find('.conditionBasisValue')
    $(basisValue).val('')

    $('.removeProductConditionRow').css('display', 'none')


}





//////////////////////PRODUCTS PAGE FUNCTIONS///////////////////
function fillProductDetails(dropdown){
    var productID = getCurrentSelectedProductID()
    var productMap = getProductObjectByID(productID)
    var rateMap = getRateObjectByID(productMap.rateCode)

    $('#productIDInput').val(productMap.productID)
    $('#productNameInput').val(productMap.productName)
    $('#productsPage_CoverageDropdown').val(productMap.coverage)
    $('#productsPage_MarketCompanyDropdown').val(productMap.marketCompanyID)
    $('#productsPage_RiskCompanyDropdown').val(productMap.riskCompanyID)
    $('#productsPage_ProductRateDropdown').val(productMap.rateCode)
    $('#productPage_RateValue').val(rateMap.rateValue)
    $('#productPage_RateBasisDisplay').val(rateMap.rateBasis)

    $('#productsPage_ProductTerms').val(productMap.terms)
    $('#productsPage_ProductTerms').val(productMap.terms)


    updateProductForms()
    updateRateValueDisplay()

    //UPDATE REQUIRED QUESTIONS
    var ratingBasisObject = getRatingBasisObjectByID(rateMap.rateBasis)
    clearRequiredQuestions()
    addRequiredBasisQuestion(ratingBasisObject.basisQuestionID)

    //FILL LIMITS
    fillProductLimits(productID)
    fillProductDeduct(productID)


}
function updateRateValueDisplay(){
    var rateID = $('#productsPage_ProductRateDropdown').val()
    var rateMap = getRateObjectByID(rateID)

    //UPDATE RATE VALUE and RATE BASIS
    $('#productPage_RateValue').html(rateMap.rateValue)
    $('#productPage_RateBasisDisplay').html(rateMap.rateBasis)

    //UPDATE RATES REQUIRED QUESTIONS
    var rateBasisID = rateMap.rateBasis
    var ratingBasisObject = getRatingBasisObjectByID(rateBasisID)
    var questionID = ratingBasisObject.basisQuestionID

    $('#productPage_requiredQuestions .rateBasisQuestion').remove()
    addRequiredBasisQuestion(questionID)
}
function updateProductForms(){
    var productID = getCurrentSelectedProductID()
    var productMap = getProductObjectByID(productID)
    var formsArray = jsonStringToObject(productMap.formIDS)
    var formsContainer = $('#productPageFormsContainer')


    //CLEAR FORMS
    $(formsContainer).empty()

    for(var i=0; i<formsArray.length; i++){
        $(formsContainer).append( $( getProductFormRowHTML(formsArray[i]) ) )
    }
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
function saveProductChanges(){
    //SAVE PRODUCT CHANGES
    $.ajax({
        method: "POST",
        url: "/Admin/saveProductChanges",
        data: {
            productID: getCurrentSelectedProductID(),
            productMap: JSON.stringify(buildProductObjectMap()),
            formIDArray: JSON.stringify(buildProductFormIDArray()),
            requiredQuestions: JSON.stringify(buildWeightOrderedRequiredQuestionsArray())

        }
    })
        .done(function(msg) {
            if(msg === "Success"){
                alert("Saved")
            }
            else if(msg === "Error"){
                alert("Error Saving")
            }
        });
}
function buildProductFormIDArray(){
    var productFormsContainer = $('#productPageFormsContainer')
    var formRowsElementArray = $(productFormsContainer).find('.productPageFormRow')
    var formIDArray = []

    $(formRowsElementArray).each(function(){
        formIDArray.push( $(this).data('formid') )
    })

    return formIDArray
}
function buildProductObjectMap(){
    var productMap = {}

    productMap.productID = getCurrentSelectedProductID()
    productMap.productName = $('#productNameInput').val()
    productMap.marketCompanyID = $('#productsPage_MarketCompanyDropdown').val()
    productMap.coverage = $('#productsPage_CoverageDropdown').val()
    productMap.rateCode = $('#productsPage_ProductRateDropdown').val()
    productMap.terms = $('#productsPage_ProductTerms').val()
    productMap.formIDArray = buildProductFormIDArray()

    return productMap
}

//PRODUCT LIMITS AND DEDUCT
function fillProductLimits(productID){
    var productObject = getProductObjectByID(productID)
    var productLimitArray
    if(productObject.limitArray){
        productLimitArray = jsonStringToObject(productObject.limitArray)
    }
    else{
        productLimitArray = splitByLine(productObject.limits)
    }


    var limitHTML = ""
    var limitAmount, limitDescription
    for(var i=0; i<productLimitArray.length; i++){
        limitAmount = productLimitArray[i].split('\t')[0]
        limitDescription = removeCoverageStringFromLimDeduct(productLimitArray[i].split('\t')[1])

        limitHTML = limitHTML +
            "<div class='row productPage_limitRow'> " +
            "   <div class='col-xs-3'> " +
            "       <div class='form-group'> " +
            "           <input class='form-control input-xs limitAmount' type='text' value='" + limitAmount + "' />" +
            "       </div> " +
            "   </div> " +
            "   <div class='col-xs-7'>" +
            "       <input class='form-control input-xs limitDescription' type='text' value='" + limitDescription + "' />" +
            "   </div>" +
            "   <div class='col-xs-2'>" +
            "       <button type='button' class='btn btn-xs btn-success productPage_removeLimitRowButton' style='font-size:9px'> " +
            "           <i class='fa fa-plus' aria-hidden='true'></i>" +
            "       </button>" +
            "       <button type='button' class='btn btn-xs btn-danger productPage_removeLimitRowButton' style='font-size:9px'> " +
            "           <i class='fa fa-minus' aria-hidden='true'></i>" +
            "       </button>" +
            "   </div>" +
            "</div>"
    }

    //INSERT LIMIT HTML INTO LIMIT CONTAINER
    var limitContainer = $('#productPage_limitsContainer')
    $(limitContainer).html(limitHTML)

}
function fillProductDeduct(productID){
    var productObject = getProductObjectByID(productID)
    var productDeductArray
    if(productObject.deductArray){
        productDeductArray = jsonStringToObject(productObject.deductArray)
    }
    else{
        productDeductArray = splitByLine(productObject.deduct)
    }


    var deductHTML = ""
    var deductAmount, deductDescription
    for(var i=0; i<productDeductArray.length; i++){
        deductAmount = productDeductArray[i].split('\t')[0]
        deductDescription = removeCoverageStringFromLimDeduct(productDeductArray[i].split('\t')[1])

        deductHTML = deductHTML +
            "<div class='row productPage_deductRow'> " +
            "   <div class='col-xs-3'> " +
            "       <div class='form-group'> " +
            "           <input class='form-control input-xs deductAmount' type='text' value='" + deductAmount + "' />" +
            "       </div> " +
            "   </div> " +
            "   <div class='col-xs-7'>" +
            "       <input class='form-control input-xs deductDescription' type='text' value='" + deductDescription + "' />" +
            "   </div>" +
            "   <div class='col-xs-2'>" +
            "       <button type='button' class='btn btn-xs btn-success productPage_removeDeductRowButton' style='font-size:9px'> " +
            "           <i class='fa fa-plus' aria-hidden='true'></i>" +
            "       </button>" +
            "       <button type='button' class='btn btn-xs btn-danger productPage_removeDeductRowButton' style='font-size:9px'> " +
            "           <i class='fa fa-minus' aria-hidden='true'></i>" +
            "       </button>" +
            "   </div>" +
            "</div>"
    }

    //INSERT LIMIT HTML INTO LIMIT CONTAINER
    var deductContainer = $('#productPage_deductsContainer')
    $(deductContainer).html(deductHTML)

}
function removeCoverageStringFromLimDeduct(limitDescription){
    var positionOfColon = limitDescription.indexOf(":")
    var s = limitDescription.substring(positionOfColon + 1)
    return s
}

//PRODUCT QUESTIONS
function insertRequiredQuestionButtonAction(button){
    var selectedQuestionID = $('#productPage_requiredQuestionsDropdown').val()
    addRequiredQuestion(selectedQuestionID)
}
function addRequiredQuestion(questionID){
    var questionHTML = getRequiredQuestionHTML(questionID)

    //CHECK TO NOT INSERT SAME QUESTION TWICE
    if( $('#productPage_requiredQuestions .' + questionID ).length === 0 ){
        $('#productPage_requiredQuestions').append($(questionHTML))
    }
}
function addUWQuestion(questionID){
    var questionHTML = getUWQuestionHTML(questionID)

    //CHECK TO NOT INSERT SAME QUESTION TWICE
    if( $('#productPage_uwQuestions .' + questionID ).length === 0 ){
        $('#productPage_uwQuestions').append($(questionHTML))
    }
}
function addRequiredBasisQuestion(questionID){
    var questionHTML = getRequiredQuestionHTML_noCloseButton(questionID)

    //CHECK TO NOT INSERT SAME QUESTION TWICE
    if( $('#productPage_requiredQuestions .' + questionID ).length === 0 ){
        $('#productPage_requiredQuestions').append($(questionHTML).addClass('rateBasisQuestion'))
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
function sortByWeightDescending(a, b){
    return ( parseInt($(b).data('weight')) ) > ( parseInt($(a).data('weight')) ) ? 1 : -1;
}





//////////////////////RATES PAGE FUNCTIONS///////////////////
function ratesPage_RateDropdownAction(dropdown){
    var rateID = getCurrentSelectedRateID();

    clearRateDetails()
    fillRateDetails(rateID)
}
function clearRateDetails(){
    //CLEAR ALL INPUTS
    $('#ratesPageLeftColumn input:text').val('')

    //RESET ALL SELECTS
    $('.ratesPageLeftColumn select').each(function () {
        $(this).val( $(this).find('option:first').val() )
    })

    //CLEAR QUESTIONS
    $('#ratingBasisRequiredQuestionsContainer').empty()

}
function fillRateDetails(rateID){
    var rateObject = getRateObjectByID(rateID)

    //FILL INPUT FIELDS
    $('#rateIDInput').val(rateObject.rateID)
    $('#rateDescriptionInput').val(rateObject.description)
    $('#ratesPage_RateValueInput').val(rateObject.rateValue)
    $('#ratePage_RatingBasisDropdown').val(rateObject.rateBasis)


    ratePage_UpdateRateBasisPreview()
    //FILL RATING BASIS DEFAULT QUESTIONS
    var ratingBasisMap = getRatingBasisObjectByID(rateObject.rateBasis)
    var ratingBasisDefaultRequiredQuestionsArray = jsonStringToObject(ratingBasisMap.requiredQuestions)
    var defaultRequiredQuestionsContainer = $('#ratingBasisRequiredQuestionsContainer')

    for(var i=0;i<ratingBasisDefaultRequiredQuestionsArray.length; i++){
        var questionHTML = getRequiredQuestionHTML(ratingBasisDefaultRequiredQuestionsArray[i])
        $(defaultRequiredQuestionsContainer).append($(questionHTML))
    }
}

//RATING BASIS SECTION
function ratePage_RatingBasisDropdownAction(dropdown){
    var ratingBasisID = $(dropdown).val()
    var rateBasisObject = getRatingBasisObjectByID(ratingBasisID)

    ratePage_UpdateRateBasisPreview(rateBasisObject)
}
function productPage_RateValueChangeAction(input){
    ratePage_UpdateRateBasisPreview()
}
function ratePage_UpdateRateBasisPreview(){
    var basisID = $('#ratePage_RatingBasisDropdown').val()
    var questionID = getRatingBasisObjectByID(basisID).basisQuestionID
    var rateValue = $('#ratesPage_RateValueInput').val()

    //FILL QUESTION PREVIEW
    var questionObject = getQuestionObjectByID(questionID)
    $('#ratePage_rateBasisQuestionPreview').html(questionObject.questionText)

    //FILL RATE VALUE PREVIEW
    $('#ratePage_rateBasisRateValuePreview').html(rateValue)
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





//////////////////////RATING BASIS PAGE FUNCTIONS///////////////////
function ratingBasisPage_RatingBasisDropdownAction(dropdown){
    var ratingBasisID = $(dropdown).val()

    clearRatingBasisDetails()
    fillRatingBasisDetails(ratingBasisID)
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
    $('#questionToRateDropdown').val(ratingBasisObject.basisQuestionID)
    $('#questionToRateDropdown').trigger('change')

}
function getCurrentSelectedRatingBasisID(){
    return $('#ratingBasisPage_RatingBasisDropdown').val()
}

//RATE BASIS QUESTION
function selectQuestionToRateAgainst(button){
    var questionID = $('#questionToRateDropdown').val()
    var defaultRequiredQuestionsContainer = $('#questionPreviewContainer')

    clearQuestionToRateAgainst()

    var questionHTML = getRequiredQuestionHTML_noCloseButton(questionID)
    //CHECK TO NOT INSERT SAME QUESTION TWICE
    if( $('#questionPreviewContainer .' + questionID ).length === 0 ){
        var questionElement = $(questionHTML)
        $(defaultRequiredQuestionsContainer).append(questionElement)
    }
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

//SAVE RATING BASIS
function saveRatingBasis(){
    //SAVE OPERATIONS COVERAGE PRODUCT MAP

    $.ajax({
        method: "POST",
        url: "/Admin/saveRatingBasisChanges",
        data: {
            basisID: getCurrentSelectedRatingBasisID(),
            description: $('#ratingBasisDescriptionInput').val(),
            requiredQuestions: JSON.stringify(buildDefaultRequiredQuestionsArray()),
            basisQuestionID: $('#questionToRateDropdown').val()
        }
    })
        .done(function(msg) {
            if(msg === "Success"){
                alert("Saved")
            }
            else if(msg === "Error"){
                alert("Error Saving")
            }
        });
}





//////////////////////QUESTIONS PAGE FUNCTIONS///////////////////





//////////////////////FORMS PAGE FUNCTIONS///////////////////
function getFormsObjectByID(formID){
    for(var i=0; i<forms.length; i++){
        if(forms[i].formID === formID){
            return forms[i]
        }
    }
}


