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

$(document).ready(function () {

    dataInit()
    initDatepickers()
    maskMoneyInputs()
    initializeUnsavedChangeListener()
    initializeTypeAheadFunctions()
});

//INIT FUNCTIONS
function dataInit(){
    intializeListeners()
    initMultiRange()

    maskMoneyInputs()


}
function intializeListeners(){

    $('a.someclass').click(function(e)
    {
        // Special stuff to do when this link is clicked...

        // Cancel the default action
        e.preventDefault();
    });

    /////////////////////////////////////////////////////////////////
    //RISK TYPE AND RISK CATEGORY LISTENERS
    /////////////////////////////////////////////////////////////////
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


    /////////////////////////////////////////////////////////////////
    //ADD COVERAGE TO RISK TYPE OPERATIONS
    /////////////////////////////////////////////////////////////////
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

    /////////////////////////////////////////////////////////////////
    //CLICKING ON A COVERAGE BUTTON TO MAKE IT ACTIVE AND SHOW OPTIONS
    /////////////////////////////////////////////////////////////////
    $(document).on('click', '.coverageButton, .productButton', function (e){
        //deactivate all other buttons
        $('.coverageButton, .productButton').removeClass('active');
        $(this).toggleClass('active')
    });

    /////////////////////////////////////////////////////////////////
    //AVAILABILITY CONDITION OPERATIONS
    /////////////////////////////////////////////////////////////////
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

    /////////////////////////////////////////////////////////////////
    //PRODUCT DETAIL LISTENERS
    /////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////
    //REMOVING Product and Coverages
    /////////////////////////////////////////////////////////////////
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

    $(document).on('change', '.lobOtherOptionSelect', function (e) {
        lobOtherOptionSelectChangeAction(this);
        checkForProductChanges()
    });

    $(document).on('click', '.removeLobRowButton', function (e) {
        removeLobRow(this)
    });

    $(document).on('click', '.addLobRowButton', function (e) {
        // alert()
        addLobRow(this)
    });

    $(document).on('click', '.removeLobOtherOptionRowButton', function (e) {
        removeLobOtherOptionRow(this)
        checkForProductChanges()
    });

    $(document).on('click', '.addLobOtherOptionRowButton', function (e) {
        // alert()
        addLobOtherOptionRow(this)
    });
    $(document).on('click', '.removeLobAdditionalOptionRowButton', function (e) {
        removeLobAdditionalOptionRowButton(this)
    });

    $(document).on('click', '.addLobAdditionalOptionRowButton', function (e) {
        // alert()
        addLobAdditionalOptionRowButton(this)
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
function initializeTypeAheadFunctions(){
    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

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

    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    $('.formNameTypeAhead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'formNames',
            source: substringMatcher(typeAheadFormNames)
        });

    $('.formIDTypeAhead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'formNames',
            source: substringMatcher(typeAheadFormIDs)
        });


}

//SAVE AND CHECK FOR UNSAVED CHANGES FUNCTIONS


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
        $('.product_ListItem').css('display','none');
        $('.product_ListItem').removeClass('active')

        var coverageID = $(element).attr('data-coverage')
        $(".product_ListItem[data-coverage='" + coverageID + "']").css('display', 'none')
    }
    else{
        $('.productCategory_ListItem').removeClass('active');
        $(element).addClass('active');
        $('.product_ListItem').css('display','none');
        $('.product_ListItem').removeClass('active')

        var coverageID = $(element).attr('data-coverage')
        $(".product_ListItem[data-coverage='" + coverageID + "']").css('display', '')
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


//PRODUCT LOB FUNCTIONS
function getProductLobHeaderRow(){
    var lobHeaderRow =
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

    return lobHeaderRow
}
function getProductLobRow(lobMap){
    var htmlString =
        "<div class='rowContainer productLobContainer'"
    if(lobMap){
        htmlString = htmlString +
            "       data-lobid='" + lobMap.id + "'"
    }
    htmlString = htmlString +
        "> " +
        "   <div class='row productLobRow'> " +
        "      <div class='col-xs-3 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-font'></i></span>" +
        "           <input class='form-control lobDescriptionInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.lobName  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control lobLimitInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;' "
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.lobLimit  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control lobDeductibleInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.lobDeductible  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control lobPremiumInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.lobPremium  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "       <div class='col-xs-2 column' >" +
        "           <div class='col-xs-3' style='padding-right:0px;padding-left:0px; text-align:center'>" +
        "               <span><input class='lobIsOptionalCheckbox detectProductChanges' type='checkbox'></span>" +
        "           </div>" +
        "           <div class='col-xs-9' style='padding-right:0px;padding-left:0px;'>" +
        "           <select class='form-control lobOtherOptionSelect'>" +
        "               <option value='none'>None</option>" +
        "               <option value='alternativeCoverages'>Alternative Coverages</option>" +
        "           </select>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-1 column' >" +
        "           <button class='btn btn-xs btn-danger removeLobRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-times' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "           <button class='btn btn-xs btn-success addLobRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-plus' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "       </div>" +
        "   </div>" +
        "</div>"

    return htmlString

}
function getProductLobButtonRow(){
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
function getLobOtherOptionsContainer(){
    var htmlString =
        "   <div class='lobOtherOptionsContainer'> " +
        "   </div>"

    return htmlString
}
function getProductOtherOptionsRow(lobMap){
    var htmlString =
        "   <div class='row lobOtherOptionRow' style='padding-bottom:2px;'> " +
        "      <div class='col-xs-3 column' style='padding-left:12px'> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-font'></i></span>" +
        "           <input class='form-control lobDescriptionInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.description  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control lobLimitInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;' "
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.limit  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control lobDeductibleInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.deductible  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control lobPremiumInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.premium  + "'"
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
        "           <button class='btn btn-xs btn-danger removeLobOtherOptionRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-times' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "           <button class='btn btn-xs btn-success addLobOtherOptionRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-plus' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "       </div>" +
        "   </div>"

    return htmlString
}

function getLobAdditionalHeaderRow(){
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
function getLobAdditionalOptionsRow(lobMap){
    var htmlString =
        "<div class='rowContainer lobAdditionalOptionContainer'"
    if(lobMap){
        htmlString = htmlString +
            "       data-lobid='" + lobMap.id + "'"
    }
    htmlString = htmlString +
        "> " +
        "   <div class='row lobAdditionalOptionRow' style='padding-bottom:2px;'> " +
        "      <div class='col-xs-3 column' style=''> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-font'></i></span>" +
        "           <input class='form-control lobDescriptionInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.lobName  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column'> " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control lobLimitInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;' "
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.lobLimit  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control lobDeductibleInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.lobDeductible  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "      <div class='col-xs-2 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-usd'></i></span>" +
        "           <input class='form-control lobDeductibleInput detectProductChanges' type='text' style='font-size: 11px; padding: 4px; height: 26px;'"
    if(lobMap){
        htmlString = htmlString +
            "        value='" + lobMap.lobDeductible  + "'"
    }
    htmlString = htmlString +
        "           >" +
        "         </div>" +
        "      </div>" +
        "       <div class='col-xs-2 column' >" +
        "           <div class='col-xs-3' style='padding-right:0px;padding-left:0px; text-align:center'>" +
        "               <span><input class='lobIsOptionalCheckbox detectProductChanges' type='checkbox'></span>" +
        "           </div>" +
        "           <div class='col-xs-9' style='padding-right:0px;padding-left:0px;'>" +
        "           <select class='form-control lobOtherOptionSelect'>" +
        "               <option value='none'>None</option>" +
        "               <option value='alternativeCoverages'>Alternative Coverages</option>" +
        "           </select>" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-xs-1 column' >" +
        "           <button class='btn btn-xs btn-danger removeLobAdditionalOptionRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-times' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "           <button class='btn btn-xs btn-success addLobAdditionalOptionRowButton' type='button' style='padding: 0px 5px;'> " +
        "                   <i class='fa fa-plus' aria-hidden='true' style='font-size: 10px;'></i>" +
        "           </button>" +
        "       </div>" +
        "   </div>" +
        "</div>"

    return htmlString
}

function removeLobRow(buttonClicked){
    $(buttonClicked).closest('.productLobRow').remove()
}
function addLobRow(buttonClicked){
    $(buttonClicked).closest('.productLobContainer').after(getProductLobRow())
}
function addSubOtherOptionsRow(selectElement){
    var lobContainer = $(selectElement).closest('.rowContainer')
    var otherOptionsContainer = $(getLobOtherOptionsContainer())
    otherOptionsContainer.html(getProductOtherOptionsRow())
    $(lobContainer).append(otherOptionsContainer)
}
function addLobOtherOptionRow(buttonClicked){
    $(buttonClicked).closest('.lobOtherOptionRow').after(getProductOtherOptionsRow())
}
function removeLobOtherOptionRow(buttonClicked){
    $(buttonClicked).closest('.lobOtherOptionRow').remove()
}
function removeAllSubOtherOptions(lobRow){
    var productLobContainer = $(lobRow).closest('.productLobContainer')
    //console.log($(productLobContainer))
    $(productLobContainer).children('.lobOtherOptionsContainer').remove()
}
function removeLobAdditionalOptionRowButton(buttonClicked){
    var additionalOptionRow = $(buttonClicked).closest('.lobAdditionalOptionRow')

    additionalOptionRow.remove();
}
function addLobAdditionalOptionRowButton(buttonClicked){
    var additionalOptionRow = $(buttonClicked).closest('.lobAdditionalOptionRow')

    additionalOptionRow.after(getLobAdditionalOptionsRow())

}

//PRODUCT FORM FUNCTIONS
function getProductFormHeaderRow(){
    var formHeaderRow =
        "   <div class='row' style='font-size:11px; font-weight:300;'> " +
        "      <div class='col-xs-5'> " +
        "           <span>Form Name</span>" +
        "      </div>" +
        "      <div class='col-xs-3'> " +
        "           <span>Form ID</span>" +
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
        "      <div class='col-xs-5' style='padding-right:4px;'> " +
        // "         <div class='input-group'>" +
        // "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'><i class='fa fa-file-text-o'></i></span>" +
        "           <i class='fa fa-file-text-o'></i>" +
        "           <input class='form-control formNameTypeAhead' type='text' style='font-size: 11px; padding: 4px; height: 26px;'" +
        "               value='" + formsMap.formName  + "'>" +
        // "         </div>" +
        "      </div>" +
        "      <div class='col-xs-3' style='padding-left:4px; padding-right:4px;'> " +
        // "         <div class='input-group'>" +
        // "           <span class='input-group-addon' style='font-size: 11px; height: 26px;padding: 6px 8px;'>ID</span></span>" +
        "           <span>ID</span>" +
        "           <input class='form-control formIDTypeAhead' type='text' style='font-size: 11px; padding: 4px; height: 26px;' " +
        "               value='" + formsMap.formID  + "'>" +
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
    $('#productNameHeader').html(currentProductObject.aimProductID)
    $('#productInputFields input:text').each(function(){
        var columnName = $(this).attr('data-column')
        $(this).val(currentProductObject[columnName])
    })


    //SET PRIMARY RATING BASIS
    if(currentProductObject.rateBasis != null){
        $('#primaryRateBasisSelect').val(currentProductObject.rateBasis)
        $('#primaryRateBasisSelect').trigger('change')
    }




    //FILL PRODUCT LOB FIELDS FOR LIMIT RATING
    var htmlString = ""
    for(var i=0; i<currentProductLOBDetailsObject.length; i++){
        var lobMap = currentProductLOBDetailsObject[i]

        htmlString = htmlString +
            "   <div class='lobRateInfoContainer'> " +
            "      <div class='col-xs-12'> " +
            "           <h6 class='lobStringDisplay' style='margin-top:12px; margin-bottom:0px; font-weight:400'>" + lobMap.lobName  + "</h6> " +
            "       </div> " +
            "       <div class='col-xs-12'> " +
            "           <div class=' row multiRangeContainer limits' id='rangeContainerLOB_" + lobMap.id + "' " +
            "               data-lobID='" + lobMap.id + "' " +
            "               data-lobname='" + lobMap.lobName + "' " +
            "               style='margin-top:-4px; margin-bottom:12px;'>" +
            "           </div>" +
            "       </div>" +
            "   </div>"
    }
    $('#limitRatingLOBRangeContainer').html(htmlString)
    initMultiRange()

    //FILL PREVIEW LOB FIELDS FOR LIMIT RATING
    var previewLOBLimitInputsString = ""
    for(var i=0; i<currentProductLOBDetailsObject.length; i++){
        var lobMap = currentProductLOBDetailsObject[i]

        previewLOBLimitInputsString = previewLOBLimitInputsString +
            "       <div class='input-group'> " +
            "           <span class='input-group-addon'> " +
            "               <span style='font-size:10px;'>" + lobMap.lobName + "</span> " +
            "           </span> " +
            "           <input class='form-control moneyInput rateTestRun lobLimitInput' id='lobLimitInput_" + lobMap.id + "' " +
            "               data-lobName='" + lobMap.lobName + "' data-lobID='" + lobMap.id + "' type='text' value='0'> " +
            "       </div> "
    }
    $('#previewInputsDiv').html(previewLOBLimitInputsString)



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




    //FILL LOB DETAIL TAB
    var lobHTMLString = ""
    var lobRows = ""
    var lobHeaderRow = getProductLobHeaderRow()
    $('#lobDetailContainer').html(getProductLobHeaderRow())
    $('#lobAdditionalCoveragesContainer').html(getLobAdditionalHeaderRow());

    //LOOP THROUGH LOBS
    for(var i=0; i<currentProductLOBDetailsObject.length; i++){
        var lobMap = currentProductLOBDetailsObject[i]
        if(lobMap.type === 'lob'){
            var newLobContainerRow = $(getProductLobRow(lobMap))
            var otherOptionsMap = JSON.parse(lobMap.otherOptionsMap)

            $('#lobDetailContainer').append(newLobContainerRow)

            var otherOptionsSelected = otherOptionsMap.optionType

            //IF LOB OTHER OPTIONS IS NOT UNDEFINED
            if(otherOptionsSelected){
                var otherOptionsDropdown = newLobContainerRow.children('.productLobRow').find('.lobOtherOptionSelect')
                otherOptionsDropdown.val(otherOptionsSelected)
                lobOtherOptionSelectChangeAction(otherOptionsDropdown)

                //FILL OTHER OPTION ROWS
                var otherOptionsArray = otherOptionsMap.optionsArray
                if(otherOptionsArray){
                    if(otherOptionsSelected === 'alternativeCoverages'){
                        var subOtherOptionsContainer = newLobContainerRow.children('.lobOtherOptionsContainer')
                        subOtherOptionsContainer.empty()


                        //LOOP THROUGH OTHER OPTIONS ROWS
                        for(var k =0; k<otherOptionsArray.length; k++){

                            var tempLobMap = otherOptionsArray[k]
                            subOtherOptionsContainer.append( getProductOtherOptionsRow(tempLobMap) )

                        }
                    }
                }
            }
        }
        else if(lobMap.type === 'additionalOption'){
            var newLobAdditionalOptionsRow = $(getLobAdditionalOptionsRow(lobMap))
            var otherOptionsMap = JSON.parse(lobMap.otherOptionsMap)

            $('#lobAdditionalCoveragesContainer').append(newLobAdditionalOptionsRow)

            var otherOptionsSelected = otherOptionsMap.optionType

            //IF LOB OTHER OPTIONS IS NOT UNDEFINED
            if(otherOptionsSelected){
                var otherOptionsDropdown = newLobAdditionalOptionsRow.children('.productLobRow').find('.lobOtherOptionSelect')
                otherOptionsDropdown.val(otherOptionsSelected)
                lobOtherOptionSelectChangeAction(otherOptionsDropdown)

                //FILL OTHER OPTION ROWS
                var otherOptionsArray = otherOptionsMap.optionsArray
                if(otherOptionsArray){
                    if(otherOptionsSelected === 'alternativeCoverages'){
                        var subOtherOptionsContainer = newLobAdditionalOptionsRow.children('.lobOtherOptionsContainer')
                        subOtherOptionsContainer.empty()


                        //LOOP THROUGH OTHER OPTIONS ROWS
                        for(var k =0; k<otherOptionsArray.length; k++){

                            var tempLobMap = otherOptionsArray[k]
                            subOtherOptionsContainer.append( getProductOtherOptionsRow(tempLobMap) )

                        }
                    }
                }
            }
        }
    }

    if($('#lobDetailContainer .productLobContainer').length === 0){
        $('#lobDetailContainer').append(getProductLobRow())
    }
    if($('#lobAdditionalCoveragesContainer .lobAdditionalOptionRow').length === 0){
        $('#lobAdditionalCoveragesContainer').append(getLobAdditionalOptionsRow())
    }


    // $('#lobAdditionalCoveragesContainer').html(getLobAdditionalHeaderRow() + getLobAdditionalOptionsRow())

    //FILL FORMS DETAIL TAB
    var formsHTMLString = ""
    var formRows = ""
    var formHeaderRow = getProductFormHeaderRow()

    for(var i=0; i<currentProductFormDetailsObject.length; i++){
        var formMap = currentProductFormDetailsObject[i]
        formRows = formRows + getProductFormRow(formMap)

        typeAheadFormNames.push(formMap.formName)
        typeAheadFormIDs.push(formMap.formID)
    }

    var formButtonFooterRow = getProductFormButtonRow()

    formsHTMLString = formHeaderRow + formRows
    $('#formsDetailContainer').html(formsHTMLString)


    //FILL TERMS DETAIL TAB
    $('#termsTextArea').val(currentProductObject.terms)



    maskMoneyInputs()
    initializeTypeAheadFunctions()

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
function setProductLOBObjectVariable(lobMapArray){
    currentProductLOBDetailsObject = lobMapArray
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
        //console.log(JSON.parse(msg))
        setProductObjectVariable(JSON.parse(msg).product)

        setProductLOBObjectVariable(JSON.parse(msg).lobs)
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


        //BUILD LOB MAP
        currentProductLOBDetailsObject = buildLOBMap()


        $.ajax({
            method: "POST",
            url: "/Admin/saveProductChanges",
            data: {
                productObject: JSON.stringify(currentProductObject),
                lobObject: JSON.stringify(currentProductLOBDetailsObject)
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


    //CHECK IF LOB HAS CHANGED
    var newLOBMap = buildLOBMap()
    if(currentProductLOBDetailsObject != newLOBMap){
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



//LOB FUNCTIONS
function lobOtherOptionSelectChangeAction(element){

    var selectedOptionVal = $(element).val()

    if( selectedOptionVal === 'None' || selectedOptionVal === 'none'){
        removeAllSubOtherOptions(element)
    }
    else if( selectedOptionVal === 'Alternative Coverages' || selectedOptionVal === 'alternativeCoverages'){
        addSubOtherOptionsRow(element)
    }
}
function buildLOBMap(){
    var lobTabElement = $('#lobTab')
    var lobMainRowsContainer = $('#lobDetailContainer')
    var lobMainRowsArray = $(lobMainRowsContainer).children('.productLobContainer')

    var lobAdditionalContainer = $('#lobAdditionalCoveragesContainer')
    var lobAdditionalRowsArray = $(lobAdditionalContainer).children('.lobAdditionalOptionContainer')


    var lobRowsArray = $.merge(lobMainRowsArray, lobAdditionalRowsArray)

    var newproductLOBDetailsObject = []
    //LOOP OVER MAIN LOB ROWS
    for(var i = 0; i<lobRowsArray.length; i++){
        var thisClassName;
        if(lobRowsArray.eq(i).hasClass('productLobContainer')){
            thisClassName = '.productLobRow'
        }
        else if(lobRowsArray.eq(i).hasClass('lobAdditionalOptionContainer')){
            thisClassName = '.lobAdditionalOptionRow'
        }

        var thisLOBRow = lobRowsArray.eq(i).children(thisClassName)

        var tempLOBMap;
        var lobID = parseInt(lobRowsArray.eq(i).attr('data-lobid'))
        // alert(lobID)
        //find existing map
        for(var k=0; k<currentProductLOBDetailsObject.length; k++){
            if(lobID === currentProductLOBDetailsObject[k].id ){
                tempLOBMap = currentProductLOBDetailsObject[k]
                // alert()
            }
        }

        tempLOBMap.lobName = thisLOBRow.find('.lobDescriptionInput').val()
        tempLOBMap.lobLimit = thisLOBRow.find('.lobLimitInput').val()
        tempLOBMap.lobDeductible = thisLOBRow.find('.lobDeductibleInput').val()
        tempLOBMap.lobPremium = thisLOBRow.find('.lobPremiumInput').val()
        tempLOBMap.optionalFlag = thisLOBRow.find('.lobIsOptionalCheckbox').prop('checked') ? 'Y' : 'N'

        var otherOptionsMap = {
            optionType:''
        }
        if( thisLOBRow.find('.lobOtherOptionSelect').val() === 'None' || thisLOBRow.find('.lobOtherOptionSelect').val() === 'none' ){
            otherOptionsMap.optionType = thisLOBRow.find('.lobOtherOptionSelect').val()
        }
        else if( thisLOBRow.find('.lobOtherOptionSelect').val() === 'Alternative Coverages' || thisLOBRow.find('.lobOtherOptionSelect').val() === 'alternativeCoverages' ){
            otherOptionsMap.optionType = thisLOBRow.find('.lobOtherOptionSelect').val()
        }
        var otherOptionArray = []
        var otherOptionRowsArray = thisLOBRow.siblings('.lobOtherOptionsContainer').find('.lobOtherOptionRow')
        for(var j=0; j<otherOptionRowsArray.length; j++){
            var tempOptionMap = {}
            var thisOtherOptionRow = otherOptionRowsArray.eq(j)
            tempOptionMap.description = thisOtherOptionRow.find('.lobDescriptionInput').val()
            tempOptionMap.limit = thisOtherOptionRow.find('.lobLimitInput').val()
            tempOptionMap.deductible = thisOtherOptionRow.find('.lobDeductibleInput').val()
            tempOptionMap.premium = thisOtherOptionRow.find('.lobPremiumInput').val()

            otherOptionArray.push(tempOptionMap)
        }

        //IF ALL OTHER OPTIONS ROWS WERE DELETED, SET TYPE TO 'NONE'
        if(otherOptionArray.length === 0){
            otherOptionsMap.optionType = 'none'
        }
        otherOptionsMap.optionsArray = otherOptionArray
        tempLOBMap.otherOptionsMap = otherOptionsMap

        newproductLOBDetailsObject.push(tempLOBMap)
    }

    return newproductLOBDetailsObject
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




