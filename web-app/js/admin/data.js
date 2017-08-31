/**
 * Created by paikchris on 8/23/16.
 */


var currentRiskTypeObject = {}
var currentProductSettingsObject = {}
var currentProductObject = {}
var currentProductDetailsObject = {}
var currentProductCovLimitDetailsObject = {}
var currentProductFormDetailsObject = []

var typeAheadFormNames = []
var typeAheadFormIDs = []
var typeAheadMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        var substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

var emptyRatingTabHTML = ""
var emptyCoverageLimitsTabHTML = ""

$(document).ready(function () {
    dataInit()
    var $ratingTab = $('#ratingTab')
    emptyRatingTabHTML = $ratingTab.html()
    emptyRatingTabHTML = $ratingTab.html()
});

//SYNC FUNCTIONS
function syncAllWithDMU(btnElement){
    addLoadingSpinnerToButton_left(btnElement)
    $.ajax({
        method: "POST",
        url: "/Admin/syncAllWithDMU",
        data: {
        }
    })
        .done(function(msg) {
            removeLoadingSpinnerFromButton(btnElement)
            showAlert(msg)

        });
}
function checkSyncWithDMU(btnElement){
    addLoadingSpinnerToButton_left(btnElement)
    $.ajax({
        method: "POST",
        url: "/Admin/checkSyncWithDMU",
        data: {
        }
    })
        .done(function(msg) {
            removeLoadingSpinnerFromButton(btnElement)
            showAlert(msg)


        });
}

//INIT FUNCTIONS
function dataInit(){

    intializeListeners()
    initMultiRange()
    maskMoneyInputs()
    initDatepickers()
    initializeUnsavedChangeListener()
    setFormTypeAheadFunctions()

    //Add Create New Buttons
    $('.productCategory_ListItem').each(function() {
        var covID = $(this).attr('data-coveragecode')
        // $(".product_ListItem[data-coverage='" + covID + "']").last().after(getAddProductButton())
    })
}
function intializeListeners(){

    //SYNC BUTTON LISTENERS
    $(document).on('click', '#syncAllWithDMU', function (e){
        syncAllWithDMU(this, e)
    });
    $(document).on('click', '#checkSyncWithDMU', function (e){
        syncAllWithDMU(this, e)
    });


    //RISK TYPE AND RISK CATEGORY LISTENERS
    $(document).on('click', '.riskCategory_ListItem', function (e){
        clickOnRiskCategoryAction(this, e)
    });
    $(document).on('click', '.subCategory_ListItem', function (e){
        clickOnRiskTypeAction(this,e)
    });
    $(document).on('click', '.riskType_ListItem', function (e){
        clickOnRiskTypeAction(this, e)
    });

    $(document).on('click', '.productCategory_ListItem', function (e){
        clickOnProductCategoryAction(this, e)
    });
    $(document).on('click', '.product_ListItem', function (e){
        clickOnProductAction(this, e)
        disableProductSaveButton()
    });

    $(document).on('click', '#updateProductSettingsButton', function (e){
        updateProductSettingsAction(this)
    });
    $(document).on('click', '#cancelProductSettingsButton', function (e){
        cancelProductSettingsAction(this)
    });

    $(document).on('click', '#saveRiskType', function (e){
        saveRiskTypeChanges(this)
    });

    $(document).on('click', '.saveProductButton', function (e){
        saveProductChanges(this)
    });

    $(document).on('change', '.productCheckbox', function (e){
        productCheckboxChangeAction(this);
    });

    $(document).on('click', '.productSettingsIcon', function (e){
        productSettingsClickAction(this)
    });

    //LISTENER ON PANEL LEFT AND PANEL MIDDLE, TO CLOSE EDIT SETTINGS PANEL
    $('.panel-left, .panel-center').on('click', '*', function() {
        clearProductSettingsFields()
        hideAllSettingsPanels()
        disableProductSettingsSaveButton()
    });


    $(document).on('change', '.productConditionRadio', function (e){
        productConditionRadioChangeAction(this)
    });

    $(document).on('change', '.basisOptionRadio', function (e){
        basisOptionRadioChangeAction(this)
    });


    //ADD COVERAGE TO RISK TYPE OPERATIONS
    $(document).on('click', '.addCoverageDropDownOption', function (e){
        //loop through existing coverages to not add duplicate
        var coverageNameChosen = $(this).text();
        var coverageAlreadyChosen = false;
        $('#productColumn1').find('.productsContainer').find('.coverageName').each(function(e){
            if(coverageNameChosen.trim() === $(this).text().trim()){
                coverageAlreadyChosen = true;
            }
        });

        if(coverageAlreadyChosen == false){
            addCoverageToColumn($(this).text(), $(this).attr('data-value'));
        }
    });

    //CLICKING ON A COVERAGE BUTTON TO MAKE IT ACTIVE AND SHOW OPTIONS
    $(document).on('click', '.coverageButton, .productButton', function (e){
        //deactivate all other buttons
        $('.coverageButton, .productButton').removeClass('active');
        $(this).toggleClass('active')
    });

    //AVAILABILITY CONDITION OPERATIONS
    $(document).on('change', '.productAvailabilityCheckboxModal', function (e){
        if($(this).attr('id') === "productAlwaysAvailableCheckBox_Modal"){
            if ($('#productAlwaysAvailableCheckBox_Modal').prop('checked')) {
                $('.productAvailabilityCheckboxModal').prop('checked', false)
                $(this).prop('checked', true)
            }
        }
        else{
            if ($('#productAlwaysAvailableCheckBox_Modal').prop('checked')) {
                $('#productAlwaysAvailableCheckBox_Modal').prop('checked', false)
            }
        }
    });


    //PRODUCT DETAIL LISTENERS

    //REMOVING Product and Coverages
    $(document).on('click', '.removeProductButton', function (e){
        $(this).closest('.productChip').remove();
    });
    $(document).on('click', '.removeCoverageButton', function (e){
        $(this).closest('.coverageContainer').remove();
    });


    $(document).on('change', '.productAvailabilityCheckbox', function (e){
        if($(this).attr('id') === "productAlwaysAvailableCheckBox"){
            if ($('#productAlwaysAvailableCheckBox').prop('checked')) {
                $('.productAvailabilityCheckbox').prop('checked', false)
                $(this).prop('checked', true)
            }
        }
        else{
            if ($('#productAlwaysAvailableCheckBox').prop('checked')) {
                $('#productAlwaysAvailableCheckBox').prop('checked', false)
            }
            if($(this).prop('checked')){
                $('#' + $(this).attr('id') + 'Container').css('display', '');
            }
            else{
                $('#' + $(this).attr('id') + 'Container').css('display', 'none');
            }
        }
    });

    $(document).on('change', '#productModalProductSelect', function (){
        if($(this).val()!=='invalid'){
            $('#productModalConditionContainer').css('display', '');
        }
        else{
            $('#productModalConditionContainer').css('display', 'none');
        }
    });

    $(document).on('click', '#addProductModalAddButton', function (e){
        //LOOP THROUGH EXISTING PRODUCT CHIPS TO SEE IF PRODUCT ALREADY IS INCLUDED
        // var productText =
        var productNameChosen = $("#productModalProductSelect option:selected").text();
        var productAlreadyChosen = false;
        $('#productColumn1').find('.productsContainer').find('.productName').each(function(e){
            if(productNameChosen.trim() === $(this).text().trim()){
                productAlreadyChosen = true;
            }
        });

        if(productAlreadyChosen == false){
            addProductUnderCoverage(productNameChosen);
        }

    });

    $(document).on('click', '.coverageAddProductButton', function (e){
        //LOOP THROUGH EXISTING PRODUCT CHIPS TO SEE IF PRODUCT ALREADY IS INCLUDED
        var coverageName = $(this).closest('.coverageChip').find('.coverageName').text().trim();
        addProductModalShow(coverageName);
    });

    $(document).on('click', '#addCoverageModalAddButton', function (e){
        //LOOP THROUGH EXISTING PRODUCT CHIPS TO SEE IF PRODUCT ALREADY IS INCLUDED
        addCoverageToColumn();
    });


    $(document).on('click', '.addCondition', function (e){
        var htmlString = "";
        var deleteButtonHTML = "<button class='btn btn-xs btn-danger deleteCondition' id='' type='button' style='margin-left:20px;'>" +
            "<i class='fa fa-minus' aria-hidden='true'></i>" +
            "<span class='' style='font-size: 14px; font-weight: 500' > </span>" +
            "</button>";

        // htmlString = $(this).closest('.conditionContainer').children().first().wrap('<p/>').parent().html();
        htmlString = $("<div />").append($(this).closest('.conditionContainer').children().first().clone()).html();

        $(this).closest('.conditionContainer').append(htmlString);

        $(this).closest('.conditionContainer').find('.deleteCondition').remove();
        $(this).closest('.conditionContainer').children().each(function(e){
            $(this).append(deleteButtonHTML);
        });
        $(this).closest('.conditionContainer').find('.deleteCondition').first().remove();
    });

    $(document).on('click', '.deleteCondition', function (e) {
        $(this).parent().remove();
    });

    $(document).on('change', '.GPCTermLengthRadio', function (e) {
        if($('#GPCTermLengthRadio_Yes').is(':checked')){
            $('#GPCTermLengthRangeContainer').css('display', '')
        }
        else if( $('#GPCTermLengthRadio_No').is(':checked') ){
            $('#GPCTermLengthRangeContainer').css('display', 'none')

        }
    });

    $(document).on('change', '.covLimitOtherOptionSelect', function (e) {
        covLimitOtherOptionSelectChangeAction(this);
        checkForProductChanges()
    });

    $(document).on('click', '.removeCovLimitRowButton', function (e) {
        removeCovLimitRow(this)
    });

    $(document).on('click', '.addCovLimitRowButton', function (e) {
        // alert()
        addCovLimitRow(this)
    });

    $(document).on('click', '.removeCovLimitOtherOptionRowButton', function (e) {
        removeCovLimitOtherOptionRow(this)
        checkForProductChanges()
    });

    $(document).on('click', '.addCovLimitOtherOptionRowButton', function (e) {
        // alert()
        addCovLimitOtherOptionRow(this)
    });
    $(document).on('click', '.removeCovLimitAdditionalOptionRowButton', function (e) {
        removeCovLimitAdditionalOptionRowButton(this)
    });

    $(document).on('click', '.addCovLimitAdditionalOptionRowButton', function (e) {
        // alert()
        addCovLimitAdditionalOptionRowButton(this)
    });


    $(document).on('click', '.addProductButton', function (e) {
        var cov = $(this).closest('.coverageClassContainer').find('.productCategory_ListItem').attr('data-coveragecode');
        clearProductInputFields()
        currentProductCovLimitDetailsObject = {}
        currentProductDetailsObject = {}
        currentProductObject = {}
        currentProductSettingsObject = {}
        $('.product_ListItem').removeClass('active')

        $('#productInput_coverage').val(cov)


        // saveNewProduct(this)
    });

}
function maskMoneyInputs(){
    $('.currency, .moneyInput').maskMoney({prefix:'$', precision:"0"});
}
function initDatepickers(){
//DATE PICKER SETUP
    var date_input = $('.datepicker'); //our date input has the name "date"
    var container =  $('#page-content-wrapper');
    var options = {
        assumeNearbyYear: true,
        autoclose: true,
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        orientation: "auto bottom",
        enableOnReadonly: false
    };
    // console.log(date_input)
    date_input.datepicker(options);
}
function initializeUnsavedChangeListener() {
    $(document).on('change', '.detectRiskTypeChanges', function (e) {
        if( checkForRiskTypeChanges() ){
            enableRiskTypeSaveButton()

        }
        else{
            disableRiskTypeSaveButton()

        }
    });

    $(document).on('change', '.detectProductSettingsChanges', function (e) {
        //PRODUCT SETTINGS WILL BE EMPTY WHEN OPENING NEW PRODUCT SETTINGS
        if( Object.keys(currentProductSettingsObject).length === 0 && currentProductSettingsObject.constructor === Object){
            //DISABLE AT FIRST
            disableProductSettingsSaveButton()
        }
        else if( checkForProductSettingsChanges() ){
            enableProductSettingsSaveButton()
        }
        else{
            disableProductSettingsSaveButton()
        }
    });

    $(document).on('change', '.detectProductChanges', function (e) {
        //console.log("detect change")
        // if( checkForProductChanges() ){
        //     enableProductSaveButton()
        //
        // }
        // else{
        //     disableProductSaveButton()
        // }

        checkForProductChanges()

        // runRatePreview()
    });

}
function setFormTypeAheadFunctions(){
    $('.formNameTypeAhead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'formNames',
            source: typeAheadMatcher(typeAheadFormNames)
        });

    $('.formIDTypeAhead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'formNames',
            source: typeAheadMatcher(typeAheadFormIDs)
        });
}

//HTML BUTTONS
function getAddProductButton(){
    var htmlString = "<button type='button' class='btn btn-success'>Add</button>"
    return htmlString
}
function saveNewProduct(element){
    if(validateProduct()){
        //CENTER PANEL FIELDS LOOKG FOR CLASS riskTypeField
        $('#productInputFields input:text').each(function(){
            var columnName = $(this).attr('data-column')
            currentProductObject[columnName] = $(this).val()
        })

        //GET RATE INFO MAP
        var rateBasis = $('#primaryRateBasisSelect').val()
        var rateContainer = $('#' + rateBasis + "_RatingOptionsContainer")
        currentProductObject.rateInfo = buildRateInfoMap(rateContainer, rateBasis)
        currentProductObject.rateBasis = rateBasis
        //console.log(currentProductObject.rateInfo)
        //console.log( buildRateInfoMap(rateContainer, rateBasis) )


        //BUILD COVERAGE LIMIT MAP
        currentProductCovLimitDetailsObject = buildCovLimitMap()


        $.ajax({
            method: "POST",
            url: "/Admin/addNewProductToAIM",
            data: {
                productObject: JSON.stringify(currentProductObject),
                covLimitObject: JSON.stringify(currentProductCovLimitDetailsObject)
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    showProductSaveSuccess()
                }
                else if(msg === "Error"){
                    showProductSaveError()
                }
            });
    }

}
//CLICK/CHANGE ACTIONS
function clickOnRiskTypeAction(element, e){
    //RESET PRODUCT SETTING PANEL
    clearProductSettingsFields()
    hideAllSettingsPanels()
    disableProductSettingsSaveButton()

    disableRiskTypeSaveButton()

    if($(element).hasClass('active')){
        $(element).removeClass('active')
        $('.subCategory_ListItem').removeClass('active')
        $('.riskType_ListItem').css('display','none');
        $('.riskType_ListItem').removeClass('active')
        hideRiskTypePanel()
    }
    else{
        $('.subCategory_ListItem').removeClass('active');
        $(element).addClass('active');
        var subCategoryName = $(element).attr('data-risktypename').trim();
        $('.riskType_ListItem').css('display','none');
        $(element).siblings('.riskType_ListItem').each(function() {
            if(subCategoryName == $(element).attr('data-parentsubcategory').trim()){
                $(element).css('display','');
            }
        });

        var riskTypeID = $(element).attr('data-id')

        showRiskTypePanel(element)
        getRiskTypeDetails(riskTypeID, function(){
            fillRiskTypeFields(element)
        })
    }
    e.preventDefault();
}
function clickOnRiskCategoryAction(element, e){
//RESET PRODUCT SETTING PANEL
    clearProductSettingsFields()
    hideAllSettingsPanels()
    disableProductSettingsSaveButton()

    //RESET RISKTYPE INPUT FIELDS PANEL
    disableRiskTypeSaveButton()

    if($(element).hasClass('active')){
        $(element).removeClass('active')
        $('.subCategory_ListItem').css('display','none');
        $('.subCategory_ListItem').removeClass('active')
        $('.riskType_ListItem').css('display','none');
        // language=JQuery-CSS
        $('.riskType_ListItem').removeClass('active')

    }
    else{
        $('.riskCategory_ListItem').removeClass('active');
        $(element).addClass('active');
        $('.subCategory_ListItem').css('display','none');
        $('.subCategory_ListItem').removeClass('active')
        $('.riskType_ListItem').css('display','none');
        $('.riskType_ListItem').removeClass('active')

        var categoryCode = $(element).attr('data-riskcategorycode').trim();
        $(element).siblings('.subCategory_ListItem').each(function() {
            if(categoryCode == $(this).attr('data-risktypecategory').trim()){
                $(this).css('display','')
            }
        });

        $('#riskTypeFields').css('display', 'none')
        $('#riskCategoryFields').css('display', '')
        fillRiskCategoryFields(element)
    }
    e.preventDefault();
}

function clickOnProductCategoryAction(element, e){
    //RESET PRODUCT SETTING PANEL
    // clearProductSettingsFields()
    // hideAllSettingsPanels()
    // disableProductSettingsSaveButton()

    //RESET RISKTYPE INPUT FIELDS PANEL
    // disableRiskTypeSaveButton()

    if($(element).hasClass('active')){
        $(element).removeClass('active')
        $('.productsInCoverageClassContainer').css('display','none');
        $('.productsInCoverageClassContainer').removeClass('active')

        var coverageID = $(element).attr('data-coverageCode')
        $(element).closest('.coverageClassContainer').children('.productsInCoverageClassContainer').css('display', 'none')
        // $(".product_ListItem[data-coverage='" + coverageID + "']").css('display', 'none')
    }
    else{
        $('.productCategory_ListItem').removeClass('active');
        $(element).addClass('active');
        $('.productsInCoverageClassContainer').css('display','none');
        $('.productsInCoverageClassContainer').removeClass('active')

        var coverageID = $(element).attr('data-coverageCode')
        $(element).closest('.coverageClassContainer').children('.productsInCoverageClassContainer').css('display', '')
        // $(".product_ListItem[data-coverage='" + coverageID + "']").css('display', '')
        //
        // $('#riskTypeFields').css('display', 'none')
        // $('#riskCategoryFields').css('display', '')
        // fillRiskCategoryFields(element)
    }
    e.preventDefault();

}
function clickOnProductAction(element, e){
    //RESET PRODUCT DETAIL PANEL
    // clearProductSettingsFields()
    // hideAllSettingsPanels()
    // disableProductSettingsSaveButton()

    // disableRiskTypeSaveButton()

    if($(element).hasClass('active')){
        $(element).removeClass('active')
        $('.product_ListItem').removeClass('active')
        // hideRiskTypePanel()
    }
    else{
        $('.product_ListItem').removeClass('active')
        $(element).addClass('active');

        var productID = $(element).attr('data-id')

        // showRiskTypePanel(element)
        getProductDetails(productID, function(){
            fillProductFields(element)
        })
    }
    e.preventDefault();
}
function productSettingsClickAction(element){
    hideAllSettingsPanels()

    var prodCode = $(element).siblings('.productCheckbox').val()
    fillProductSettingsFields(prodCode)

    showProductSettingsContainer()

    setProductSettingsVariable()
}
function productCheckboxChangeAction(element){
    if($(element).is(":checked")){
        //CHECK IF PRODUCT IS NEWLY SELECTED, MEANING NO PRODUCT CONDITIONS IN DATA ATTR
        //DEFAULT IT TO ALWAYS AVAILABLE
        if($(element).attr('data-productconditions').trim().length == 0){
            $(element).attr('data-productconditions', '{"always":{}}' )

            $(element).closest('.productRow').find('.prodConditionDescription').html("Available Always.")
        }
        else{
            //IF RECHECKING RESHOW CONDITION
            var conditionJSON = JSON.parse($(element).attr('data-productconditions'))
            var NLDescription = buildNLDescriptionOfProductConditions(conditionJSON)

            $(element).closest('.productRow').find('.prodConditionDescription').html(NLDescription)
        }

        $(element).siblings('.productSettingsIcon').css('display', '')
    }
    else{
        //IF UNCHECKING HIDE CONDITIONS
        $(element).siblings('.productSettingsIcon').css('display', 'none')

        $(element).closest('.productRow').find('.prodConditionDescription').html("")


    }
}
function productConditionRadioChangeAction(element) {
    $('.productConditionRadio').each(function () {
        if ($(this).is(":checked")) {
            $(this).closest('.conditionContainer').find('.conditionOptionsContainer').css('display', '')

        }
        else {
            $(this).closest('.conditionContainer').find('.conditionOptionsContainer').css('display', 'none')


        }
    })

}
function basisOptionRadioChangeAction(element){
    // CLEAR VALUES NEXT TO UNCHECKED RADIOS AND CHECKBOXES
    $(element).closest('.conditionOptionsContainer').find('input:radio').each(function(){
        if ($(this).is(":checked")) {

        }
        else{
            $(this).siblings('.conditionValue').val("")
        }
    })
}

//SHOW HIDE FUNCTIONS
function showRiskTypePanel(element){
    $('.riskType_ListItem').removeClass('active');
    $(element).addClass('active');

    $('#riskTypeFields').css('display', '')
    $('#riskCategoryFields').css('display', 'none')
}
function showProductSettingsContainer(){
    $('#productSettingsContainer').css('display', '')

}
function hideRiskTypePanel(element){
    $(element).removeClass('active');

}
function hideAllSettingsPanels(){
    $('.settingsContainer').css('display', 'none')
}

//PRODUCT RATINGS FUNCTIONS
function hideAllRatingContainers(){
    $('.basisOptionContainer').css('display','none')
}
function showRatingContainerForValue(selectVal){
    $('.basisOptionContainer').css('display','none')
    $('#' + selectVal + "_RatingOptionsContainer").css('display', '')
}


//PRODUCT COVERAGE LIMIT FUNCTIONS
function getProductCovLimitHeaderRow(){
    var covLimitHeaderRow =
        "   <div class='row' style='font-size:11px; font-weight:300;'> " +
        "      <div class='col-xs-3 column'> " +
        "           <span>Description</span>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "           <span>Limit</span>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "           <span>Deductible</span>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "           <span>Premium</span>" +
        "      </div>" +
        "      <div class='col-xs-2 column' style='font-size:10px;'> " +
        "           <div class='col-xs-3' style='padding:0px'> " +
        "               <span>Optional</span>" +
        "           </div>" +
        "           <div class='col-xs-9' style='padding:0px'> " +
        "               <span>Other Options</span>" +
        "           </div>" +
        "      </div>" +
        "      <div class='col-xs-1 column' style='font-size:10px;'> " +
        "           <span></span>" +
        "      </div>" +
        "   </div>"

    return covLimitHeaderRow
}
function getProductCovLimitRow(covLimitMap){
    var htmlString =
        "<div class='rowContainer productCovLimitContainer'"
    if(covLimitMap){
        htmlString = htmlString +
            "       data-covLimitid='" + covLimitMap.id + "'"
    }
    htmlString = htmlString +
        "> " +
        "   <div class='row productCovLimitRow'> " +
        "      <div class='col-xs-3 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-font'></i></span>" +
        "           <input class='form-control covLimNameInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.covLimName  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control covLimitInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;' "
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.covLimit  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control covDeductibleInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.covDeductible  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control covPremiumInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.covPremium  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "       <div class='col-xs-2 column' >" +
        "           <div class='col-xs-3' style='padding-right:0px;padding-left:0px; text-align:center'>" +
        "               <span><input class='covLimitIsOptionalCheckbox detectProductChanges' type='checkbox'></span>" +
        "           </div>" +
        "           <div class='col-xs-9' style='padding-right:0px;padding-left:0px;'>" +
        "           <select class='form-control covLimitOtherOptionSelect'>" +
        "               <option value='none'>None</option>" +
        "               <option value='alternativeCoverages'>Alternative Coverages</option>" +
        "           </select>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-1 column' >" +
        "           <button class='btn btn-xs btn-danger removeCovLimitRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-times' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "           <button class='btn btn-xs btn-success addCovLimitRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-plus' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "       </div>" +
        "   </div>" +
        "</div>"

    return htmlString

}
function getProductCovLimitButtonRow(){
    var buttonFooterRow =
        "   <div class='row' style=''> " +
        "      <div class='col-xs-12'> " +
        "           <button class='btn  btn-primary' type='button' style=''> " +
        "               <span>Save</span>" +
        "           </button>" +
        "           <button class='btn  btn-default' type='button' style=''> " +
        "               <span>Cancel</span>" +
        "           </button>" +
        "      </div>" +
        "   </div>"

    return buttonFooterRow
}
function getCovLimitOtherOptionsContainer(){
    var htmlString =
        "   <div class='covLimitOtherOptionsContainer'> " +
        "   </div>"

    return htmlString
}
function getProductOtherOptionsRow(covLimitMap){
    var htmlString =
        "   <div class='row covLimitOtherOptionRow' style='padding-bottom:2px;'> " +
        "      <div class='col-xs-3 column' style='padding-left:12px'> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-font'></i></span>" +
        "           <input class='form-control covLimNameInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.description  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control covLimitInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;' "
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.limit  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control covDeductibleInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.deductible  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control covPremiumInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.premium  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "       <div class='col-xs-2 column' >" +
        "           <div class='col-xs-3' style='padding-right:0px;padding-left:0px; text-align:center'>" +
        "           </div>" +
        "           <div class='col-xs-9' style='padding-right:0px;padding-left:0px;'>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-1 column' >" +
        "           <button class='btn btn-xs btn-danger removeCovLimitOtherOptionRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-times' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "           <button class='btn btn-xs btn-success addCovLimitOtherOptionRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-plus' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "       </div>" +
        "   </div>"

    return htmlString
}

function getCovLimitAdditionalHeaderRow(){
    var htmlString =
        "   <div class='row' style='font-size:11px; font-weight:300;'> " +
        "      <div class='col-xs-3 column'> " +
        "           <span>Description</span>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "           <span>Limit</span>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "           <span>Deductible</span>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "           <span>Premium</span>" +
        "      </div>" +
        "      <div class='col-xs-2 column' style='font-size:10px;'> " +
        "           <div class='col-xs-3' style='padding:0px'> " +
        "               <span>Optional</span>" +
        "           </div>" +
        "           <div class='col-xs-9' style='padding:0px'> " +
        "               <span>Other Options</span>" +
        "           </div>" +
        "      </div>" +
        "      <div class='col-xs-1 column' style='font-size:10px;'> " +
        "           <span></span>" +
        "      </div>" +
        "   </div>"

    return htmlString
}
function getCovLimitAdditionalOptionsRow(covLimitMap){
    var htmlString =
        "<div class='rowContainer covLimitAdditionalOptionContainer'"
    if(covLimitMap){
        htmlString = htmlString +
            "       data-covLimitid='" + covLimitMap.id + "'"
    }
    htmlString = htmlString +
        "> " +
        "   <div class='row covLimitAdditionalOptionRow' style='padding-bottom:2px;'> " +
        "      <div class='col-xs-3 column' style=''> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-font'></i></span>" +
        "           <input class='form-control covLimNameInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.covLimName  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control covLimitInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;' "
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.covLimit  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control covDeductibleInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.covDeductible  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control covDeductibleInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(covLimitMap){
        htmlString = htmlString +
            "        value='" + covLimitMap.covDeductible  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "       <div class='col-xs-2 column' >" +
        "           <div class='col-xs-3' style='padding-right:0px;padding-left:0px; text-align:center'>" +
        "               <span><input class='covLimitIsOptionalCheckbox detectProductChanges' type='checkbox'></span>" +
        "           </div>" +
        "           <div class='col-xs-9' style='padding-right:0px;padding-left:0px;'>" +
        "           <select class='form-control covLimitOtherOptionSelect'>" +
        "               <option value='none'>None</option>" +
        "               <option value='alternativeCoverages'>Alternative Coverages</option>" +
        "           </select>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-1 column' >" +
        "           <button class='btn btn-xs btn-danger removeCovLimitAdditionalOptionRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-times' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "           <button class='btn btn-xs btn-success addCovLimitAdditionalOptionRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-plus' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "       </div>" +
        "   </div>" +
        "</div>"

    return htmlString
}

function removeCovLimitRow(buttonClicked){
    $(buttonClicked).closest('.productCovLimitRow').remove()
}
function addCovLimitRow(buttonClicked){
    $(buttonClicked).closest('.productCovLimitContainer').after(getProductCovLimitRow())
}
function addSubOtherOptionsRow(selectElement){
    var covLimitContainer = $(selectElement).closest('.rowContainer')
    var otherOptionsContainer = $(getCovLimitOtherOptionsContainer())
    otherOptionsContainer.html(getProductOtherOptionsRow())
    $(covLimitContainer).append(otherOptionsContainer)
}
function addCovLimitOtherOptionRow(buttonClicked){
    $(buttonClicked).closest('.covLimitOtherOptionRow').after(getProductOtherOptionsRow())
}
function removeCovLimitOtherOptionRow(buttonClicked){
    $(buttonClicked).closest('.covLimitOtherOptionRow').remove()
}
function removeAllSubOtherOptions(covLimitRow){
    var productCovLimitContainer = $(covLimitRow).closest('.productCovLimitContainer')
    //console.log($(productCovLimitContainer))
    $(productCovLimitContainer).children('.covLimitOtherOptionsContainer').remove()
}
function removeCovLimitAdditionalOptionRowButton(buttonClicked){
    var additionalOptionRow = $(buttonClicked).closest('.covLimitAdditionalOptionRow')

    additionalOptionRow.remove();
}
function addCovLimitAdditionalOptionRowButton(buttonClicked){
    var additionalOptionRow = $(buttonClicked).closest('.covLimitAdditionalOptionRow')

    additionalOptionRow.after(getCovLimitAdditionalOptionsRow())

}

//PRODUCT FORM FUNCTIONS
function getProductFormHeaderRow(){
    var formHeaderRow =
        "   <div class='row' style='font-size:11px; font-weight:300;'> " +
        "      <div class='col-xs-3'> " +
        "           <span>Form ID</span>" +
        "      </div>" +
        "      <div class='col-xs-5'> " +
        "           <span>Form Name</span>" +
        "      </div>" +
        "   </div>"

    return formHeaderRow
}
function getEmptyProductFormRow(){
    var htmlString =
        "   <div class='row formRow'> " +
        "      <div class='col-xs-5' style='padding-right:4px;'> " +
        "         <div class='input-group'>" +
        // "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-font'></i></span>" +
        "           <input class='form-control' type='text' style='font-size: 11px; padding: 4px; height: 26px;'" +
        "               value=''>" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-3' style='padding-left:4px; padding-right:4px;'> " +
        "         <div class='input-group'>" +
        // "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control' type='text' style='font-size: 11px; padding: 4px; height: 26px;' " +
        "               value=''>" +
        "         </div>" +
        "      </div>" +
        "       <div class='col-xs-2' style='padding-left:4px;'>" +
        "           <button class='btn btn-xs btn-danger removeFormRow' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-times' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "           <button class='btn btn-xs btn-success addFormRow' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-plus' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "       </div>" +
        "   </div>"

    return htmlString

}
function getProductFormRow(formsMap){
    var htmlString =
        "   <div class='row formRow'> " +
        "      <div class='col-xs-3' style='padding-left:4px; padding-right:4px;'> " +
        // "         <div class='input-group'>" +
        // "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'>ID</span></span>" +
        "           <span>ID</span>" +
        "           <input class='form-control formIDTypeAhead' type='text' style='font-size: 11px; padding: 4px; height: 26px;' " +
        "               value='" + formsMap.formID  + "'>" +
        // "         </div>" +
        "      </div>" +
        "      <div class='col-xs-5' style='padding-right:4px;'> " +
        // "         <div class='input-group'>" +
        // "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-file-text-o'></i></span>" +
        "           <i class='fa fa-file-text-o'></i>" +
        "           <input class='form-control formNameTypeAhead' type='text' style='font-size: 11px; padding: 4px; height: 26px;'" +
        "               value='" + formsMap.formName  + "'>" +
        // "         </div>" +
        "      </div>" +
        "       <div class='col-xs-2' style='padding-left:4px;'>" +
        "           <button class='btn btn-xs btn-danger removeFormRow' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-times' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "           <button class='btn btn-xs btn-success addFormRow' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-plus' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "           <button class='btn btn-xs btn-primary previewFormButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-file-pdf-o' aria-hidden='true' style='font-size: 10px;'></i>" +
        "                   <span> Preview</span>" +
        "           </button>" +
        "       </div>" +
        "   </div>"

    return htmlString

}
function getProductFormButtonRow(){
    var buttonFooterRow =
        "   <div class='row' style=''> " +
        "      <div class='col-xs-12'> " +
        "           <button class='btn  btn-primary' type='button' style=''> " +
        "               <span>Save</span>" +
        "           </button>" +
        "           <button class='btn  btn-default' type='button' style=''> " +
        "               <span>Cancel</span>" +
        "           </button>" +
        "      </div>" +
        "   </div>"

    return buttonFooterRow
}

//PRODUCT PREVIEW FUNCTIONS
function runRatePreview1(){
    //GET PRIMARY RATING BASIS
    var primaryRatingBasis = $('#primaryRateBasisSelect').val()

    //GET RATE INFO AND FORMAT IT
    var rateContainer = $('#' + primaryRatingBasis + "_RatingOptionsContainer")
    var rateInfoMap = buildRateInfoMap(rateContainer, primaryRatingBasis)

    //PREVIEW OF GPC RATES
    if(primaryRatingBasis === "gpc"){
        var gpcAmount = getIntValueOfMoney($('#gpc_TestInput').val())

        //LOOP OVER ALL RANGES AND RATES
        var tempArray = rateInfoMap.rateInfo
        for(var i = 0; i<tempArray.length; i++){
            var tempFrom = getIntValueOfMoney(tempArray[i].from)
            var tempTo
            if(tempArray[i].to.toLowerCase() === "any"){
                tempTo = gpcAmount + 1
            }
            else{
                tempTo = getIntValueOfMoney(tempArray[i].to)
            }

            var rateType = tempArray[i].rateType

            var tempRateValue
            if( rateType === "premium"){
                tempRateValue = getIntValueOfMoney( tempArray[i].rateValue )
            }
            else if(rateType === "percent"){
                tempRateValue = getDoubleValueOfPercent( tempArray[i].rateValue )
            }

            //IF THE GPC VALUE FALLS INTO THIS RANGE, IF NOT SKIP
            if( gpcAmount >= tempFrom && gpcAmount <= tempTo){
                //IF THIS RANGE HAS A TERM LENGTH CONDITION
                if(tempRateValue === "-" || tempArray[i].hasOwnProperty('additionalRate')){
                    var additionalConditionArray = tempArray[i].additionalRate
                    for(var c=0; c<additionalConditionArray.length; c++){
                        var additionalRateInfoArray = additionalConditionArray[c].rateInfo
                        var additionalBasisName = additionalConditionArray[c].basisName
                        var termLength = parseInt( $('#gpc_TermLengthInput').val() )

                        for(var j=0; j<additionalRateInfoArray.length; j++){
                            var additionalFrom = getIntValueOfMoney(additionalRateInfoArray[j].from)
                            var additionalTo
                            if(additionalRateInfoArray[j].to.toLowerCase() === "any"){
                                additionalTo = termLength + 1
                            }
                            else{
                                additionalTo = parseInt(additionalRateInfoArray[j].to)
                            }
                            var additionalRate = getDoubleValueOfPercent( additionalRateInfoArray[j].rateValue )


                            if(termLength >= additionalFrom && termLength <= additionalTo){
                                var premiumDisplay = gpcAmount * (additionalRate/100)
                                $('#gpc_rateActualDisplay').html(additionalRate/100)
                                $('#gpc_TestedPremiumDisplay').html(formatMoney(premiumDisplay))
                            }
                        }
                    }
                }
                else{
                    if( rateType === "premium"){
                        var premiumDisplay = tempRateValue
                        $('#gpc_rateActualDisplay').html("")
                        $('#gpc_TestedPremiumDisplay').html(formatMoney(premiumDisplay))
                    }
                    else if(rateType === "percent"){
                        var premiumDisplay = gpcAmount * (tempRateValue/100)
                        $('#gpc_rateActualDisplay').html(tempRateValue/100)
                        $('#gpc_TestedPremiumDisplay').html(formatMoney(premiumDisplay))
                    }

                }

            }
        }
    }
    else if(primaryRatingBasis === "flatRate"){
        var gpcAmount = getIntValueOfMoney($('#flatRate_TestInput').val())
        var minPremium = getIntValueOfMoney($('#flatRate_MinPremium').val())
        var flatRateFlatValue = getIntValueOfMoney($('#flatRate_FlatValue').val())
        var premiumOrRate = $('#flatRate_RatingOptionsContainer').find('.dropDownButtonText').html().trim()

        if(premiumOrRate === "Flat Premium"){
            var calcPremium = flatRateFlatValue
            $('#flatRate_rateActualDisplay').html("Flat Premium")
            $('#flatRate_TestedPremiumDisplay').html(formatMoney(calcPremium))
        }
        else{
            var calcPremium = gpcAmount * (flatRateFlatValue/100)
            if(calcPremium < minPremium){
                calcPremium = minPremium
            }
            $('#flatRate_rateActualDisplay').html((flatRateFlatValue/100))
            $('#flatRate_TestedPremiumDisplay').html(formatMoney(calcPremium))

        }


    }
    else if(primaryRatingBasis === "termLength"){
        var termLength = getIntValueOfMoney($('#termLength_TermLengthInput').val())

        //LOOP OVER ALL RANGES AND RATES
        var tempArray = rateInfoMap.rateInfo
        for(var i = 0; i<tempArray.length; i++){
            var tempFrom = getIntValueOfMoney(tempArray[i].from)
            var tempTo
            if(tempArray[i].to.toLowerCase() === "any"){
                tempTo = termLength + 1
            }
            else{
                tempTo = getIntValueOfMoney(tempArray[i].to)
            }
            var tempRateValue = getDoubleValueOfPercent( tempArray[i].rateValue )

            //IF THE GPC VALUE FALLS INTO THIS RANGE, IF NOT SKIP
            if( termLength >= tempFrom && termLength <= tempTo){
                var premiumDisplay = termLength * (tempRateValue/100)
                $('#termLength_rateActualDisplay').html(tempRateValue/100)
                $('#termLength_TestedPremiumDisplay').html(formatMoney(premiumDisplay))


            }
        }
    }
}



//FILL INPUT FIELDS FUNCTIONS
function fillRiskTypeFields(clickedRisk){
    $('#loadingModal').modal('show')

    //CLEAR RISK TYPE INPUT FIELDS
    clearRiskTypeInputFields()

    //FILL RISK TYPE INPUT FIELDS
    $('#riskTypeID').html(""+currentRiskTypeObject.id);
    $('#riskTypeName_Input').val(currentRiskTypeObject.riskTypeName);
    $('#riskTypeCode_Input').val(currentRiskTypeObject.riskTypeCode);

    //READ THE PRODUCT CONDITIONS
    var productConditionsMap
    if(currentRiskTypeObject.productConditions){
        productConditionsMap = JSON.parse(currentRiskTypeObject.productConditions)
        //console.log(productConditionsMap)
    }

    //FILL PRODUCT DATA-ATTRIBUTES AND CHECK ACTIVE PRODUCTS
    if(currentRiskTypeObject.products){
        var productArray = currentRiskTypeObject.products.split(",")
        for(var i=0; i<productArray.length; i++){
            var productCode = productArray[i]
            $('#' + productCode + '_Checkbox').prop('checked', true)
            $('#' + productCode + '_Settings').css('display','')

            if(productConditionsMap[productCode]){
                $('#' + productCode + '_Checkbox').attr('data-productconditions', productConditionsMap[productCode])


                var conditionsJSON = JSON.parse(productConditionsMap[productCode])
                var NLDescription = buildNLDescriptionOfProductConditions(conditionsJSON)
                $('#' + productCode + '_Checkbox').closest('.productRow').find('.prodConditionDescription').html(NLDescription)
            }

        }
    }

    $('#loadingModal').modal('hide')
}
function fillRiskCategoryFields(clickedRisk){
    $('#riskCategoryName_Input').val($(clickedRisk).attr('data-riskcategoryname'));
    $('#riskTypeCategoryDescription_Input').val($(clickedRisk).attr('data-description'));
}
function fillProductSettingsFields(prodCode){
    clearProductSettingsFields();
    disableProductSettingsSaveButton();


    $('#productSettings_RiskTypeName').html($('#riskTypeName_Input').val())
    $('#productSettings_ProductName').html(prodCode)
    $('#hiddenProductCode').html(prodCode)

    //GET EXISTING PRODUCT CONDITIONS
    var prodConditions;
    if( $('#' + prodCode + '_Checkbox').attr('data-productconditions').trim().length == 0 ){
        //no existing product conditions
        //DEFAULT TO ALWAYS
        $('#' + prodCode + '_Checkbox').attr('data-productconditions', '{"always":{}}' )
    }
    else{
        prodConditions = JSON.parse( $('#' + prodCode + '_Checkbox').attr('data-productconditions') )

        //FILL OUT CONDITIONS
        $("input.productConditionRadio").each(function(){
            var basis = $(this).val()
            // console.log(basis)
            if( prodConditions[basis] ){
                if(basis === "always"){
                    $(this).prop('checked', true)
                    $(this).trigger('change')
                }
                else{
                    $(this).prop('checked', true)
                    $(this).trigger('change')


                    var options = JSON.parse(prodConditions[basis])

                    $(this).closest('.conditionContainer').find("input:radio").each(function(){
                        if( options[$(this).val()] ){
                            $(this).prop('checked', true)
                            $(this).trigger('change')


                            //FILL OUT CONDITION OPTION VALUE
                            $(this).closest('p').find('.conditionValue').val(options[$(this).val()])
                        }
                    })
                }

            }
        })
    }
    //
    // console.log(prodConditions)



}
function fillProductFields(clickedProduct){
    $('#loadingModal').modal('show')

    //CLEAR RISK TYPE INPUT FIELDS
    clearProductInputFields()



    //FILL PRODUCT INPUT FIELDS
    $('#productNameHeader').html(currentProductObject.productID)
    $('#productInputFields input:text').each(function(){
        var columnName = $(this).attr('data-column')
        $(this).val(currentProductObject[columnName])
    })


    //SET PRIMARY RATING BASIS
    if(currentProductObject.rateBasis != null){
        $('#primaryRateBasisSelect').val(currentProductObject.rateBasis)
        $('#primaryRateBasisSelect').trigger('change')
    }




    //FILL PRODUCT COVERAGE LIMIT FIELDS FOR LIMIT RATING
    var htmlString = ""
    for(var i=0; i<currentProductCovLimitDetailsObject.length; i++){
        var covLimitMap = currentProductCovLimitDetailsObject[i]

        htmlString = htmlString +
            "   <div class='covLimitRateInfoContainer'> " +
            "      <div class='col-xs-12'> " +
            "           <h6 class='covLimitStringDisplay' style='margin-top:12px; margin-bottom:0px; font-weight:400'>" + covLimitMap.covLimName  + "</h6> " +
            "       </div> " +
            "       <div class='col-xs-12'> " +
            "           <div class=' row multiRangeContainer limits' id='rangeContainerCovLimit_" + covLimitMap.id + "' " +
            "               data-covLimitID='" + covLimitMap.id + "' " +
            "               data-covLimName='" + covLimitMap.covLimName + "' " +
            "               style='margin-top:-4px; margin-bottom:12px;'>" +
            "           </div>" +
            "       </div>" +
            "   </div>"
    }
    $('#limitRatingCovLimitRangeContainer').html(htmlString)
    initMultiRange()

    //FILL PREVIEW COVERAGE LIMIT FIELDS FOR LIMIT RATING
    var previewcovLimitInputsString = ""
    for(var i=0; i<currentProductCovLimitDetailsObject.length; i++){
        var covLimitMap = currentProductCovLimitDetailsObject[i]

        previewcovLimitInputsString = previewcovLimitInputsString +
            "       <div class='input-group'> " +
            "           <span class='input-group-addon'> " +
            "               <span style='font-size:10px;'>" + covLimitMap.covLimName + "</span> " +
            "           </span> " +
            "           <input class='form-control moneyInput rateTestRun covLimitInput' id='covLimitInput_" + covLimitMap.id + "' " +
            "               data-covLimName='" + covLimitMap.covLimName + "' data-covLimitID='" + covLimitMap.id + "' type='text' value='0'> " +
            "       </div> "
    }
    $('#previewInputsDiv').html(previewcovLimitInputsString)



    //RECREATE RATE INFORMATION AND RANGES FROM MAP
    var rateInfoExists = false;
    try{
        JSON.parse(currentProductObject.rateInfo)
        rateInfoExists = true;
    }
    catch(e){ console.log("No Rate Info") }

    if(rateInfoExists){
        var rateInfoMap = JSON.parse(currentProductObject.rateInfo)
        if(rateInfoMap !== null){
            //console.log(rateInfoMap)
            recreateRateRangesFromMap(rateInfoMap)
        }
    }




    //FILL COVERAGE LIMIT DETAIL TAB
    var covLimitHTMLString = ""
    var covLimitRows = ""
    var covLimitHeaderRow = getProductCovLimitHeaderRow()
    $('#covLimitDetailContainer').html(getProductCovLimitHeaderRow())
    $('#covLimitAdditionalCoveragesContainer').html(getCovLimitAdditionalHeaderRow());

    //LOOP THROUGH COVERAGE LIMITS
    for(var i=0; i<currentProductCovLimitDetailsObject.length; i++){
        var covLimitMap = currentProductCovLimitDetailsObject[i]
        if(covLimitMap.type === 'covLimit'){
            var newCovLimitContainerRow = $(getProductCovLimitRow(covLimitMap))
            var otherOptionsMap = JSON.parse(covLimitMap.otherOptionsMap)

            $('#covLimitDetailContainer').append(newCovLimitContainerRow)

            var otherOptionsSelected = otherOptionsMap.optionType

            //IF COVERAGE LIMIT OTHER OPTIONS IS NOT UNDEFINED
            if(otherOptionsSelected){
                var otherOptionsDropdown = newCovLimitContainerRow.children('.productCovLimitRow').find('.covLimitOtherOptionSelect')
                otherOptionsDropdown.val(otherOptionsSelected)
                covLimitOtherOptionSelectChangeAction(otherOptionsDropdown)

                //FILL OTHER OPTION ROWS
                var otherOptionsArray = otherOptionsMap.optionsArray
                if(otherOptionsArray){
                    if(otherOptionsSelected === 'alternativeCoverages'){
                        var subOtherOptionsContainer = newCovLimitContainerRow.children('.covLimitOtherOptionsContainer')
                        subOtherOptionsContainer.empty()


                        //LOOP THROUGH OTHER OPTIONS ROWS
                        for(var k =0; k<otherOptionsArray.length; k++){

                            var tempCovLimitMap = otherOptionsArray[k]
                            subOtherOptionsContainer.append( getProductOtherOptionsRow(tempCovLimitMap) )

                        }
                    }
                }
            }
        }
        else if(covLimitMap.type === 'additionalOption'){
            var newCovLimitAdditionalOptionsRow = $(getCovLimitAdditionalOptionsRow(covLimitMap))
            var otherOptionsMap = JSON.parse(covLimitMap.otherOptionsMap)

            $('#covLimitAdditionalCoveragesContainer').append(newCovLimitAdditionalOptionsRow)

            var otherOptionsSelected = otherOptionsMap.optionType

            //IF COVERAGE LIMIT OTHER OPTIONS IS NOT UNDEFINED
            if(otherOptionsSelected){
                var otherOptionsDropdown = newCovLimitAdditionalOptionsRow.children('.productCovLimitRow').find('.covLimitOtherOptionSelect')
                otherOptionsDropdown.val(otherOptionsSelected)
                covLimitOtherOptionSelectChangeAction(otherOptionsDropdown)

                //FILL OTHER OPTION ROWS
                var otherOptionsArray = otherOptionsMap.optionsArray
                if(otherOptionsArray){
                    if(otherOptionsSelected === 'alternativeCoverages'){
                        var subOtherOptionsContainer = newCovLimitAdditionalOptionsRow.children('.covLimitOtherOptionsContainer')
                        subOtherOptionsContainer.empty()


                        //LOOP THROUGH OTHER OPTIONS ROWS
                        for(var k =0; k<otherOptionsArray.length; k++){

                            var tempCovLimitMap = otherOptionsArray[k]
                            subOtherOptionsContainer.append( getProductOtherOptionsRow(tempCovLimitMap) )

                        }
                    }
                }
            }
        }
    }

    if($('#covLimitDetailContainer .productCovLimitContainer').length === 0){
        $('#covLimitDetailContainer').append(getProductCovLimitRow())
    }
    if($('#covLimitAdditionalCoveragesContainer .covLimitAdditionalOptionRow').length === 0){
        $('#covLimitAdditionalCoveragesContainer').append(getCovLimitAdditionalOptionsRow())
    }


    // $('#covLimitAdditionalCoveragesContainer').html(getCovLimitAdditionalHeaderRow() + getCovLimitAdditionalOptionsRow())

    //FILL FORMS DETAIL TAB
    var formsHTMLString = ""
    var formRows = ""
    var formHeaderRow = getProductFormHeaderRow()
    var productFormArray = JSON.parse(currentProductObject.formIDS)
    var formMap = {}

    for(var i=0; i<productFormArray.length; i++){
        console.log(productFormArray[i])
        formMap[productFormArray[i]] =
        formRows = formRows + getProductFormRow(formMap)
    }

    //CREATE TYPE AHEAD FORM VARIABLES
    for(var i=0; i<currentProductFormDetailsObject.length; i++){
        // var formMap = currentProductFormDetailsObject[i]
        // formRows = formRows + getProductFormRow(formMap)

        typeAheadFormNames.push(formMap.formName)
        typeAheadFormIDs.push(formMap.formID)
    }

    var formButtonFooterRow = getProductFormButtonRow()

    formsHTMLString = formHeaderRow + formRows
    $('#formsDetailContainer').html(formsHTMLString)


    //FILL TERMS DETAIL TAB
    $('#termsTextArea').val(currentProductObject.terms)


    console.log("START ")
    maskMoneyInputs()
    console.log("FINISH ")
    setFormTypeAheadFunctions()

    runRatePreview()


    $('#loadingModal').modal('hide')
}

//JS OBJECT METHODS
function setProductSettingsVariable(){
    //PURPOSE OF METHOD IS ONLY TO GET WHICH RADIO AND CHECKBOXES ARE CHECKED.

    //GET WHICH BASIS IS CHECKED
    $('.productConditionRadio:visible').each(function(){
        var basisID = $(this).attr('id')
        var isChecked = $('#' + basisID).is(':checked')
        currentProductSettingsObject[basisID] = isChecked
    })

    $('.basisOptionRadio').each(function(){
        var optionID = $(this).attr('id')
        var isChecked = $('#' + optionID).is(':checked')
        currentProductSettingsObject[optionID] = isChecked
    })

    $('.conditionValue').each(function(){
        var optionValueID = $(this).attr('id')
        var value = $('#' + optionValueID).val()
        currentProductSettingsObject[optionValueID] = value
    })


}
function setRiskTypeObjectVariable(msg){
    currentRiskTypeObject = JSON.parse(msg)
}
function setProductObjectVariable(productMap){
    currentProductObject = productMap
}
function setProductCovLimitObjectVariable(covLimitMapArray){
    currentProductCovLimitDetailsObject = covLimitMapArray
}
function setProductFormsObjectVariable(formsArray){
    currentProductFormDetailsObject = formsArray
}

//CLEAR INPUT FIELDS
function clearProductSettingsFields(){
    $('#productSettings_RiskTypeName').html("")
    $('#productSettings_ProductName').html("")
    $('#hiddenProductCode').html("")

    $('#productSettingsContainer input:text').val("")
    $('#productSettingsContainer input:radio').prop('checked', false)
    $('#productSettingsContainer input:checkbox').prop('checked', false)

    currentProductSettingsObject = {}
}
function clearRiskTypeInputFields(){
    $('#riskTypeFields input:text').val("")
    $('#riskTypeFields input:checkbox').prop("checked", false)
    $('#riskTypeFields input:radio').prop("checked", false)
    $('.productSettingsIcon').css('display','none')
    $('.prodConditionDescription').html("")
}
function clearProductInputFields(){
    $('#productInputFields input:text').val("")
    $('#productInputFields input:checkbox').prop("checked", false)
    $('#productInputFields input:radio').prop("checked", false)

    //RATING TABS
    $('#ratingTab').html(emptyRatingTabHTML)
}

//GET DETAILS FROM DATABASE FUNCTIONS
function getRiskTypeDetails(riskTypeID, callback){
    $.ajax({
        method: "POST",
        url: "/Admin/getRiskTypeDetails",
        data: {
            riskTypeID: riskTypeID
        }
    }).done(function (msg) {
        // console.log(JSON.parse(msg))
        setRiskTypeObjectVariable(msg)
        callback()
    });
}
function getProductDetails(productID, callback){
    $.ajax({
        method: "POST",
        url: "/Admin/getProductDetails",
        data: {
            productID: productID
        }
    }).done(function (msg) {
        // alert(msg)
        setProductObjectVariable(JSON.parse(msg).product)
        setProductCovLimitObjectVariable(JSON.parse(msg).covLimits)
        setProductFormsObjectVariable(JSON.parse(msg).forms)

        callback()
    });
}


//SAVE CHANGE FUNCTIONS
function saveRiskTypeChanges(){
    if(validateRiskType()){
        //CENTER PANEL FIELDS LOOKG FOR CLASS riskTypeField
        $('.riskTypeField').each(function(){
            currentRiskTypeObject[$(this).attr('data-column')] = $(this).val().trim()
        })

        //GET PRODUCTS
        var productArray = []
        var productConditionsMap = {}
        $('.productCheckbox').each(function(){
            if( $(this).is(':checked') ){
                var productCode = $(this).val()
                productArray.push(productCode)
                productConditionsMap[productCode] = $(this).attr('data-productconditions')
            }
        })

        currentRiskTypeObject.productConditions = productConditionsMap
        currentRiskTypeObject.products = productArray.toString()


        //console.log(JSON.stringify(currentRiskTypeObject))
        $.ajax({
            method: "POST",
            url: "/Admin/saveRiskTypeChanges",
            data: {
                riskTypeName: $('#riskTypeName_Input').val(),
                riskTypeObject: JSON.stringify(currentRiskTypeObject)
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    showRiskTypeSaveSuccess()
                }
                else if(msg === "Error"){
                    showRiskTypeSaveError()
                }
            });
    }
}
function saveProductChanges(){
    if(validateProduct()){
        //CENTER PANEL FIELDS LOOKG FOR CLASS riskTypeField
        $('#productInputFields input:text').each(function(){
            var columnName = $(this).attr('data-column')
            currentProductObject[columnName] = $(this).val()
        })

        //GET RATE INFO MAP
        var rateBasis = $('#primaryRateBasisSelect').val()
        var rateContainer = $('#' + rateBasis + "_RatingOptionsContainer")
        currentProductObject.rateInfo = buildRateInfoMap(rateContainer, rateBasis)
        currentProductObject.rateBasis = rateBasis
        //console.log(currentProductObject.rateInfo)
        //console.log( buildRateInfoMap(rateContainer, rateBasis) )


        //BUILD COVERAGE LIMIT MAP
        currentProductCovLimitDetailsObject = buildCovLimitMap()


        $.ajax({
            method: "POST",
            url: "/Admin/saveProductChanges",
            data: {
                productObject: JSON.stringify(currentProductObject),
                covLimitObject: JSON.stringify(currentProductCovLimitDetailsObject)
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    showProductSaveSuccess()
                }
                else if(msg === "Error"){
                    showProductSaveError()
                }
            });
    }
}
function updateProductSettingsAction(){
    if(validateProductSettings()){
        var prodCode = $('#hiddenProductCode').html().trim()
        buildProductConditionMap(prodCode)

        //TRIGGER CHANGE ON PRODUCT CHECKBOX TO DETECT CHANGES
        $('#' + prodCode + '_Checkbox').trigger('change')

        //DISABLE UPDATE PRODUCT SETTINGS BUTTON
        disableProductSettingsSaveButton()

        //PERFORM SAVE ACTION
        saveRiskTypeChanges()

        //DISABLE SAVE BUTTON
        disableRiskTypeSaveButton()
    }
}
function cancelProductSettingsAction(){
    clearProductSettingsFields()
    hideAllSettingsPanels()
}
function checkForRiskTypeChanges(){
    // console.log("checking")
    var changed = false;
    if( $('#riskTypeName_Input').val() != currentRiskTypeObject.riskTypeName){
        changed = true;
    }
    if( $('#riskTypeCode_Input').val() != currentRiskTypeObject.riskTypeCode){
        changed = true;
    }

    //CHECK PRODUCT CHANGES
    var savedCheckboxArray
    if(currentRiskTypeObject.products != null){
        savedCheckboxArray = currentRiskTypeObject.products.split(",");
    }
    else{
        savedCheckboxArray = "";
    }

    //console.log(currentRiskTypeObject.productConditions)

    var tempConditionMap;

    //prod conditions is a string when it comes from the database, and a json object when changes are made to it
    if( typeof(currentRiskTypeObject.productConditions) === "string" ){
        tempConditionMap = JSON.parse(currentRiskTypeObject.productConditions)
    }
    else{
        tempConditionMap = currentRiskTypeObject.productConditions
    }
    // console.log(savedCheckboxArray)
    $('.productCheckbox').each(function(){
        // console.log($(this))
        if($(this).is(':checked')){
            if( savedCheckboxArray.indexOf( $(this).val() ) === -1){
                changed = true
            }

            //CHECK PRODUCT CONDITION CHANGES
            if(tempConditionMap != null){
                if(tempConditionMap[$(this).val()]){
                    var savedCondition = JSON.parse( tempConditionMap[$(this).val()] )
                    var currentCondition = JSON.parse($('#' + $(this).val() + '_Checkbox').attr('data-productconditions'))
                    // console.log(savedCondition)
                    // console.log(currentCondition)
                    // console.log(JSON.stringify(savedCondition) != JSON.stringify(currentCondition))
                    if(JSON.stringify(savedCondition) != JSON.stringify(currentCondition)){
                        changed = true
                    }
                }
            }



        }
        else{
            // console.log("ELSE")

            if( savedCheckboxArray.indexOf( $(this).val() ) > -1){

                changed = true
            }
        }
    })


    // console.log(changed)

    return changed;
}
function checkForProductSettingsChanges(){
    //console.log("checking Product Settings")
    //console.log(currentProductSettingsObject)
    var changed = false;

    //CHECK BASIS CHANGES
    $('.productConditionRadio:visible').each(function(){
        var basisID = $(this).attr('id')
        //console.log(basisID)
        var checkedStatus = $('#' + basisID).is(':checked')

        if(currentProductSettingsObject[basisID] != undefined){
            if(currentProductSettingsObject[basisID] != checkedStatus){
                changed = true
            }
        }
        else{
            //console.log("ELSE")
            changed = true
        }
    })

    //CHECK BASIS OPTION RADIO CHANGES
    $('.basisOptionRadio').each(function(){
        var optionID = $(this).attr('id')
        var checkedStatus = $('#' + optionID).is(':checked')

        if(currentProductSettingsObject[optionID] != undefined){
            if(currentProductSettingsObject[optionID] != checkedStatus){
                changed = true;
            }
        }
        else{
            changed = true
        }
    })

    $('.conditionValue').each(function(){
        var optionValueID = $(this).attr('id')
        var value = $('#' + optionValueID).val()

        if(currentProductSettingsObject[optionValueID] != undefined){
            if(currentProductSettingsObject[optionValueID] != value){
                changed = true;
            }
        }
        else{
            changed = true;
        }
    })




    //console.log("return: " + changed)
    return changed;
}
function checkForProductChanges(){

    var changed = false;
    //console.log("CHECKING")

    //CHECK IF TEXT FIELDS HAVE CHANGED
    $('#productInputFields input:text').each(function(){
        var columnName = $(this).attr('data-column')
        if( $(this).val() != currentProductObject[columnName] ){
            changed = true;
        }
    })

    //CHECK IF PRIMARY RATING BASIS CHANGED
    if( $('#primaryRateBasisSelect').val() != currentProductObject.rateBasis ){
        changed = true;
    }

    //CHECK IF RATE INFO HAS CHANGED
    var rateBasis = $('#primaryRateBasisSelect').val()
    var rateContainer = $('#' + rateBasis + "_RatingOptionsContainer")
    var newRateInfoMap = buildRateInfoMap(rateContainer, rateBasis)
    if( currentProductObject.rateInfo != newRateInfoMap ){
        changed = true
    }


    //CHECK IF COVERAGE LIMIT HAS CHANGED
    var newCovLimitMap = buildCovLimitMap()
    if(currentProductCovLimitDetailsObject != newCovLimitMap){
        changed = true;
    }

    if( changed ){
        enableProductSaveButton()
    }
    else{
        disableProductSaveButton()
    }

    return changed;
}

function disableRiskTypeSaveButton(){
    $('#saveRiskType').prop('disabled', true)
}
function enableRiskTypeSaveButton(){
    $('#saveRiskType').prop('disabled', false)
}
function disableProductSettingsSaveButton(){
    $('#updateProductSettingsButton').prop('disabled', true)
}
function enableProductSettingsSaveButton(){
    $('#updateProductSettingsButton').prop('disabled', false)
}
function disableProductSaveButton(){
    $('.saveProductButton').prop('disabled', true)
}
function enableProductSaveButton(){
    $('.saveProductButton').prop('disabled', false)
}

//RISK TYPE EDIT DETAILS FUNCTIONS

//INPUT FIELD VALIDATION FUNCTIONS
function validateProductSettings(){
    var valid = true;

    clearStatusMessages()
    //CHECK AT LEAST ONE BASIS IS CHECKED, AT LEAST 'ALWAYS'
    if( $('.productConditionRadio:checked:visible').length === 0 ){
        valid = false
        showProductSettingsSaveError()
        return false;
    }

    //CHECK IF BASIS IS CHECKED, ONE BASIS OPTION IS CHECKED
    if( $('.productConditionRadio:checked:visible').val() === "always"){

    }
    else{
        if( $('.productConditionRadio:checked:visible').closest('.conditionContainer').find('.basisOptionRadio:checked:visible').length === 0 ){
            valid = false
            showProductSettingsSaveError()
            return false;
        }
        //IF BASIS OPTION IS SELECTED, CHECK VALUE IS NOT NULL
        if( $('.basisOptionRadio:checked:visible').siblings('.conditionValue').val().trim() === "" ){
            valid = false
            showProductSettingsSaveError()
            return false;
        }

    }



    showProductSettingsSaveSuccess()
    return valid;
}
function validateRiskType(){
    var valid = true;

    //CHECK NAME IS NOT BLANK
    if( $('#riskTypeName_Input').val().trim().length == 0  ){
        valid = false;
        showRiskTypeSaveError()
        //console.log("NAME ERROR")
        return false
    }

    if( $('#riskTypeCode_Input').val().trim().length == 0  ){
        valid = false;
        showRiskTypeSaveError()
        //console.log("CODE ERROR")

        return false
    }



    return valid
}
function validateProduct(){
    var valid = true;


    //CHECK IF TEXT FIELDS ARE BLANK
    $('#productInputFields input:text').each(function(){
        var columnName = $(this).attr('data-column')
        if( $(this).val().trim().length == 0 ){
            valid = false;
            showProductSaveError()
            return false
        }
    })



    return valid
}
function showRiskTypeSaveSuccess(){
    $('#riskTypeSaveMessage').show().delay(5000).fadeOut();
    $('#riskTypeErrorMessage').css('display', 'none')
}
function showRiskTypeSaveError(){
    $('#riskTypeSaveMessage').css('display', 'none')
    $('#riskTypeErrorMessage').show().delay(5000).fadeOut();
}
function showProductSaveSuccess(){
    $('.productSaveMessage').show().delay(5000).fadeOut();
    $('.productErrorMessage').css('display', 'none')
    disableProductSaveButton()
}
function showProductSaveError(){
    $('.productSaveMessage').css('display', 'none')
    $('.productErrorMessage').show().delay(5000).fadeOut();
    enableProductSaveButton()
}
function showProductSettingsSaveSuccess(){
    $('#productSettingSaveMessage').show().delay(5000).fadeOut();
    $('#productSettingErrorMessage').css('display', 'none')
}
function showProductSettingsSaveError(){
    $('#productSettingSaveMessage').css('display', 'none')
    $('#productSettingErrorMessage').show().delay(5000).fadeOut();
}
function clearStatusMessages(){
    $('.statusMessage').css('display', 'none')

}


//COVERAGE LIMIT FUNCTIONS
function covLimitOtherOptionSelectChangeAction(element){

    var selectedOptionVal = $(element).val()

    if( selectedOptionVal === 'None' || selectedOptionVal === 'none'){
        removeAllSubOtherOptions(element)
    }
    else if( selectedOptionVal === 'Alternative Coverages' || selectedOptionVal === 'alternativeCoverages'){
        addSubOtherOptionsRow(element)
    }
}
function buildCovLimitMap(){
    var covLimitTabElement = $('#covLimitTab')
    var covLimitMainRowsContainer = $('#covLimitDetailContainer')
    var covLimitMainRowsArray = $(covLimitMainRowsContainer).children('.productCovLimitContainer')

    var covLimitAdditionalContainer = $('#covLimitAdditionalCoveragesContainer')
    var covLimitAdditionalRowsArray = $(covLimitAdditionalContainer).children('.covLimitAdditionalOptionContainer')


    var covLimitRowsArray = $.merge(covLimitMainRowsArray, covLimitAdditionalRowsArray)

    var newproductCovLimitDetailsObject = []
    //LOOP OVER MAIN COVERAGE LIMIT ROWS
    for(var i = 0; i<covLimitRowsArray.length; i++){
        var thisClassName;
        if(covLimitRowsArray.eq(i).hasClass('productCovLimitContainer')){
            thisClassName = '.productCovLimitRow'
        }
        else if(covLimitRowsArray.eq(i).hasClass('covLimitAdditionalOptionContainer')){
            thisClassName = '.covLimitAdditionalOptionRow'
        }

        var thisCovLimitRow = covLimitRowsArray.eq(i).children(thisClassName)

        var tempCovLimitMap;
        var covLimitID = parseInt(covLimitRowsArray.eq(i).attr('data-covLimitid'))
        // alert(covLimitID)
        //find existing map
        for(var k=0; k<currentProductCovLimitDetailsObject.length; k++){
            if(covLimitID === currentProductCovLimitDetailsObject[k].id ){
                tempCovLimitMap = currentProductCovLimitDetailsObject[k]
                // alert()
            }
        }

        tempCovLimitMap.covLimName = thisCovLimitRow.find('.covLimNameInput').val()
        tempCovLimitMap.covLimit = thisCovLimitRow.find('.covLimitInput').val()
        tempCovLimitMap.covDeductible = thisCovLimitRow.find('.covDeductibleInput').val()
        tempCovLimitMap.covPremium = thisCovLimitRow.find('.covPremiumInput').val()
        tempCovLimitMap.optionalFlag = thisCovLimitRow.find('.covLimitIsOptionalCheckbox').prop('checked') ? 'Y' : 'N'

        var otherOptionsMap = {
            optionType:''
        }
        if( thisCovLimitRow.find('.covLimitOtherOptionSelect').val() === 'None' || thisCovLimitRow.find('.covLimitOtherOptionSelect').val() === 'none' ){
            otherOptionsMap.optionType = thisCovLimitRow.find('.covLimitOtherOptionSelect').val()
        }
        else if( thisCovLimitRow.find('.covLimitOtherOptionSelect').val() === 'Alternative Coverages' || thisCovLimitRow.find('.covLimitOtherOptionSelect').val() === 'alternativeCoverages' ){
            otherOptionsMap.optionType = thisCovLimitRow.find('.covLimitOtherOptionSelect').val()
        }
        var otherOptionArray = []
        var otherOptionRowsArray = thisCovLimitRow.siblings('.covLimitOtherOptionsContainer').find('.covLimitOtherOptionRow')
        for(var j=0; j<otherOptionRowsArray.length; j++){
            var tempOptionMap = {}
            var thisOtherOptionRow = otherOptionRowsArray.eq(j)
            tempOptionMap.description = thisOtherOptionRow.find('.covLimNameInput').val()
            tempOptionMap.limit = thisOtherOptionRow.find('.covLimitInput').val()
            tempOptionMap.deductible = thisOtherOptionRow.find('.covDeductibleInput').val()
            tempOptionMap.premium = thisOtherOptionRow.find('.covPremiumInput').val()

            otherOptionArray.push(tempOptionMap)
        }

        //IF ALL OTHER OPTIONS ROWS WERE DELETED, SET TYPE TO 'NONE'
        if(otherOptionArray.length === 0){
            otherOptionsMap.optionType = 'none'
        }
        otherOptionsMap.optionsArray = otherOptionArray
        tempCovLimitMap.otherOptionsMap = otherOptionsMap

        newproductCovLimitDetailsObject.push(tempCovLimitMap)
    }

    return newproductCovLimitDetailsObject
}


function buildNLDescriptionOfProductConditions(conditionJSON){
    //INPUT: JSON OF CONDITIONS (1 PRODUCT)

    var description = "Available "
    for (var key in conditionJSON) {
        if (conditionJSON.hasOwnProperty(key)) {

            if(key === "budget"){
                description = description + "when Budget is "
            }
            else if (key === "policyTerm"){
                description = description + " when Policy Term is "
            }
            else if( key === "always"){
                description = description + "Always. "
            }
            else{
                description = description + "N/A. "
            }

            var val = conditionJSON[key];
            //console.log(val);

            if(key === "budget"){
                var options = JSON.parse(val)
                for (var k in options) {
                    var v = options[k];

                    if(k === "lessThan"){
                        description = description + "Less Than " + v
                    }
                    else if(k === "greaterThan"){
                        description = description + "Greater Than " + v
                    }
                    else if(k === "inbetween"){
                        description = description + "Inbetween " + v
                    }
                    else if(k === "lessOrGreaterThan"){
                        description = description + "Less Than or Greater Than " + v
                    }
                    else if(k === "equals"){
                        description = description + "Equals " + v
                    }
                    else{
                        description = description + "N/A"
                    }
                }
            }
            else if(key === "policyTerm"){
                var options = JSON.parse(val)
                for (var k in options) {
                    var v = options[k];

                    if(k === "lessThan"){
                        description = description + "Less Than " + v + " Days"
                    }
                    else if(k === "greaterThan"){
                        description = description + "Greater Than " + v + " Days"
                    }
                    else if(k === "inbetween"){
                        description = description + "Inbetween " + v + " Days"
                    }
                    else if(k === "lessOrGreaterThan"){
                        description = description + "Less Than or Greater Than " + v + " Days"
                    }
                    else if(k === "equals"){
                        description = description + "Equals " + v + " Days"
                    }
                    else{
                        description = description + "N/A"
                    }
                }
            }
            else if( key === "always"){
            }
            else{
                description = description + "N/A. "

            }


        }
    }

    return description

}

function buildProductConditionMap(productCode){

    var conditionMap = {}
    var basisNaturalLanguageDescription

    //CYCLE THROUGH CONDITION BASES
    $('.productConditionRadio').each(function(){

        //IF A BASIS IS SELECTED LOOK AT OPTIONS
        if($(this).is(":checked")){
            var conditionBasis = $(this).val()
            conditionMap[conditionBasis] = {}

            //CYCLE THROUGH OPTIONS
            $(this).closest('.conditionContainer').find('.conditionOptionsContainer input:radio').each(function(){
                if($(this).is(":checked")){
                    var conditionOption = $(this).val();
                    var value = $(this).siblings('.conditionValue').val()
                    var tempMap = {}
                    tempMap[conditionOption] = value;
                    conditionMap[conditionBasis] = JSON.stringify(tempMap)
                }
            })

        }
    })
    //console.log(conditionMap)
    var NLDescription = buildNLDescriptionOfProductConditions(conditionMap)

    $('#' + productCode + '_Checkbox').closest('.productRow').find('.prodConditionDescription').html(NLDescription)
    $('#' + productCode + '_Checkbox').attr('data-productconditions', JSON.stringify(conditionMap))
}

function buildProductConditionMapForRiskType(){

}

function emergencyIndication(){
    $.ajax({
        method: "POST",
        url: "/Admin/emergencyIndication",
        data: {
        }
    })
        .done(function(msg) {
            alert(msg);
        });
}




