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
        $('.riskCategory_ListItem').removeClass('active');
        $('.subCategory_ListItem').removeClass('active');
        $('.riskType_ListItem').removeClass('active');

        if($(this).hasClass('active')){
            $('.subCategory_ListItem').css('display','none');
            $('.riskType_ListItem').css('display','none');

        }
        else{
            $('.riskCategory_ListItem').removeClass('active');
            $(this).addClass('active');
            var categoryCode = $(this).attr('data-riskcategorycode').trim();
            $('.subCategory_ListItem').css('display','none');
            $(this).siblings('.subCategory_ListItem').each(function() {
                if(categoryCode == $(this).attr('data-risktypecategory').trim()){
                    $(this).css('display','')
                }
            });
        }
        e.preventDefault();

    });
    $(document).on('click', '.subCategory_ListItem', function (e){
        $('.subCategory_ListItem').removeClass('active');
        $('.riskType_ListItem').removeClass('active');
        if($(this).hasClass('active')){
            $('.riskType_ListItem').css('display','none');


        }
        else{
            $(this).addClass('active');
            var subCategoryName = $(this).attr('data-risktypename').trim();
            $('.riskType_ListItem').css('display','none');
            $(this).siblings('.riskType_ListItem').each(function() {
                if(subCategoryName == $(this).attr('data-parentsubcategory').trim()){
                    $(this).css('display','')
                }
            });
        }
        e.preventDefault();
    });
    $(document).on('click', '.riskType_ListItem', function (e){
        if($(this).hasClass('active')){
            //$('.subCategory_ListItem').css('display','none');
            //$('.riskType_ListItem').css('display','none');
            $(this).removeClass('active');
        }
        else{
            $('.riskType_ListItem').removeClass('active');
            $(this).addClass('active');

        }
        e.preventDefault();
    });



});


