/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {
    $('.currency').maskMoney({prefix:'$', precision:"0"});

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
        if($(this).hasClass('active')){
            $(this).removeClass('active')
            $('.subCategory_ListItem').css('display','none');
            $('.subCategory_ListItem').removeClass('active')
            $('.riskType_ListItem').css('display','none');
            $('.riskType_ListItem').removeClass('active')

        }
        else{
            $('.riskCategory_ListItem').removeClass('active');
            $(this).addClass('active');
            $('.subCategory_ListItem').css('display','none');
            $('.subCategory_ListItem').removeClass('active')
            $('.riskType_ListItem').css('display','none');
            $('.riskType_ListItem').removeClass('active')

            var categoryCode = $(this).attr('data-riskcategorycode').trim();
            $(this).siblings('.subCategory_ListItem').each(function() {
                if(categoryCode == $(this).attr('data-risktypecategory').trim()){
                    $(this).css('display','')
                }
            });

            $('#riskTypeFields').css('display', 'none')
            $('#riskCategoryFields').css('display', '')
            fillRiskCategoryFields(this)
        }
        e.preventDefault();

    });

    $(document).on('click', '.subCategory_ListItem', function (e){
        if($(this).hasClass('active')){
            $(this).removeClass('active')
            $('.subCategory_ListItem').removeClass('active')
            $('.riskType_ListItem').css('display','none');
            $('.riskType_ListItem').removeClass('active')
        }
        else{
            $('.subCategory_ListItem').removeClass('active');
            $(this).addClass('active');
            var subCategoryName = $(this).attr('data-risktypename').trim();
            $('.riskType_ListItem').css('display','none');
            $(this).siblings('.riskType_ListItem').each(function() {
                if(subCategoryName == $(this).attr('data-parentsubcategory').trim()){
                    $(this).css('display','');
                }
            });

            $('#riskTypeFields').css('display', '')
            $('#riskCategoryFields').css('display', 'none')
            fillRiskTypeFields(this)
        }
        e.preventDefault();
    });
    $(document).on('click', '.riskType_ListItem', function (e){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }
        else{
            $('.riskType_ListItem').removeClass('active');
            $(this).addClass('active');

            $('#riskTypeFields').css('display', '')
            $('#riskCategoryFields').css('display', 'none')
            fillRiskTypeFields(this)
        }
        e.preventDefault();
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



});

function fillRiskTypeFields(clickedRisk){
    $('#riskTypeName_Input').val($(clickedRisk).attr('data-risktypename'));

    var productsJSON = JSON.parse($(clickedRisk).attr('data-products'))

}
function saveRiskTypeChanges(){

    $.ajax({
        method: "POST",
        url: "/Admin/saveRiskTypeChanges",
        data: {
            riskTypeName: $('#riskTypeName_Input').val()
        }
    })
        .done(function(msg) {
            // alert(msg);
        });
}




//FUNCTIONS FOR ADDING PRODUCTS AND COVERAGES
var addingIntoColumn =1;
var coverageNameToAddProduct ="";
function addProductModalShow(coverageName){
    coverageNameToAddProduct = coverageName;
    $('#addProductModal').modal('show');
}

function addProductUnderCoverage(productText){
    if($('#productModalProductSelect').val()!= "invalid") {

        var productHtmlString = "<div class='btn-group productChip' style='margin-bottom:10px; width:100%;'>" +
            "<button type='button' class='btn btn-sm btn-default productButton'" +
            "data-productcode='" + $('#productModalProductSelect').val() + "' " +
            "style='max-width: 80%; min-width:40%; border-radius: 25px; border-top-right-radius: 0; border-bottom-right-radius: 0;'>" +
            "<span class='buttontext productName'>" + productText + "</span>" +
            "</button>" +
            "<button type='button' class='btn btn-sm btn-default dropdown-toggle' data-toggle='dropdown' " +
            "aria-haspopup='true' aria-expanded='false' " +
            "style='border-radius: 25px; border-top-left-radius: 0; border-bottom-left-radius: 0;'>" +
            " <span class='caret'></span>" +
            "<span class='sr-only'>Toggle Dropdown</span>" +
            "</button>" +
            "<ul class='dropdown-menu'>" +
            "   <li><a href='#'>Change</a></li>" +
            "   <li><a href='#'>Edit</a></li>" +
            "  <li role='separator' class='divider'></li>" +
            "   <li><a href='#' class='removeProductButton'>Remove</a></li>" +
            "   </ul>" +
            "   </div>"

        // $('.productColumn[data-containernumber="' + addingIntoColumn + '"]').find('.productsContainer').css('display', '')
        $('.coverageContainer[data-coverageName="' + coverageNameToAddProduct + '"]').find('.coverageProductsContainer').append(productHtmlString);
        $('#addProductModal').modal('hide');
    }
}



function addCoverageModalShow(column){
    addingIntoColumn = column;
    $('#addCoverageModal').modal('show');
}
function addCoverageToColumn(coverageName, coverageCode){
    if(coverageName && coverageCode) {
        var productHtmlString = "<div class='coverageContainer' data-coverageName='" + coverageName + "'>" +
            "<div class='btn-group coverageChip' style='margin-bottom:10px; width:100%;'>" +
            "<button type='button' class='btn btn-primary coverageButton' " +
            "data-productcode='" + coverageCode + "' style='max-width: 80%; '>" +
            "<span class='buttontext coverageName'>" + coverageName + "</span></button>" +
            "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' " +
            "aria-haspopup='true' aria-expanded='false' >" +
            "<span class='caret'></span>" +
            "<span class='sr-only'>Toggle Dropdown</span>" +
            "</button>" +
            "<ul class='dropdown-menu'>" +
            "   <li><a href='#'>Change</a></li>" +
            "   <li><a href='#'>Edit</a></li>" +
            "   <li><a href='#' class='coverageAddProductButton'>Add Product</a></li>" +
            "  <li role='separator' class='divider'></li>" +
            "   <li><a href='#' class='removeCoverageButton'>Remove</a></li>" +
            "   </ul>" +
            "   </div>" +
            "<br>" +
            "<div class='coverageProductsContainer' style='padding-left:30px'>" +
            "</div>" +
            "</div>"
        // alert(productHtmlString)

        $('.productColumn[data-containernumber="' + addingIntoColumn + '"]').find('.productsContainer').css('display', '')
        $('.productColumn[data-containernumber="' + addingIntoColumn + '"]').find('.productsContainer').append(productHtmlString);
        // $('#addCoverageModal').modal('hide');
    }
}





function fillRiskCategoryFields(clickedRisk){
    $('#riskCategoryName_Input').val($(clickedRisk).attr('data-riskcategoryname'));
    $('#riskTypeCategoryDescription_Input').val($(clickedRisk).attr('data-description'));
}

function updateRiskProductDetails(clickedProduct){

}

function fillProductFields(clickedProduct){
    clearProductFields();
    var availableConditionArray = $(clickedProduct).attr('data-availablecondition').split(',');

    for (i = 0; i < availableConditionArray.length; i++) {
        if(availableConditionArray[i].length > 0){
            $('#' + availableConditionArray[i]).prop('checked', true);
        }

    }
}

function clearProductFields(){
    $('.productField:text').val('');
    $('.productField:checkbox').prop('checked', false);
}

function clearModalProductFields(){
    $('.productFieldModal:text').val('');
    $('.productFieldModal:checkbox').prop('checked', false);
    $('#productModalProductSelect option:eq(0)').prop('selected', true)
}




