/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {
    $(document.body).on('click', '.submissionViewButton' ,function(){
        var panelString = $(this).attr('id').split("_")[0];
        $('.submissionViewPanel').css("display", "none");
        $("#" + panelString + "_Panel").css("display", "");
    });




    ///////////////////TABLE FUNCTIONS
    $('.star').on('click', function () {
        $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function () {
        $(this).parents('tr').toggleClass('selected');
    });

    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.tableBody tr').css('display', 'none');
            $('.tableBody tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.tableBody tr').css('display', 'none').fadeIn('slow');
        }
    });
    ////////////////////////////////////////

});

