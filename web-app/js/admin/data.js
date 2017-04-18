/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {

    $('a.someclass').click(function(e)
    {
        // Special stuff to do when this link is clicked...

        // Cancel the default action
        e.preventDefault();
    });
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

    $(document).on('click', '.closebtn', function (e){
        // this.parentElement.style.display='none';
        clearProductFields();
        $(this).parent().remove();
    });

    $(document).on('click', '.chip', function (e){
        if(!$(this).hasClass('active')){
            $('.chip').removeClass('active');
            $(this).addClass('active');
            fillProductFields(this);
        }

    });

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
        }
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

    $(document).on('click', '#saveProductDetailModalButton', function (e){
        //LOOP THROUGH EXISTING PRODUCT CHIPS TO SEE IF PRODUCT ALREADY IS INCLUDED
        $()

        if($('#productModalProductSelect').val()!= "invalid"){
            var productText = $("#productModalProductSelect option:selected").text();

            var availableConditions = "";
            if($('#productAlwaysAvailableCheckBox_Modal').prop('checked')){
                availableConditions = availableConditions + "productAlwaysAvailableCheckBox,"
            }
            if($('#productDependsOnBudget_Modal').prop('checked')){
                availableConditions = availableConditions + "productDependsOnBudget,"
            }
            if($('#productDependsOnTermLength_Modal').prop('checked')){
                availableConditions = availableConditions + "productDependsOnTermLength,"
            }

            var productHtmlString =  "<div class='chip' " +
                "data-id='" + $('#productModalProductSelect').val() + "' " +
                "data-availablecondition='" + availableConditions + "' " +
                ">" +
                productText +
            "<span class='closebtn'>&times;</span>" +
            "</div>";

            $('#riskProductsDiv').append(productHtmlString);
            $('#addProductModal').modal('hide');
        }

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




