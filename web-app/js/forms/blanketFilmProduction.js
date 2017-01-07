


$(document).ready(function () {
    //CHECKBOXES THAT HIDE AND SHOW FIELDS


    // Production type start
    $(document.body).on('change', '#commercialsCheckBox' ,function(){
        if($("#commercialsCheckBox").is(':checked')) {
            $('#blanketFilmCommercial').css("display", "");
        }
        else{
            $('#blanketFilmCommercial').css("display", "none");
        }
    });
    $(document.body).on('change', '#webSeriesCheckBox' ,function(){
        if($("#webSeriesCheckBox").is(':checked')) {
            $('#blanketFilmWebSeries').css("display", "");
        }
        else{
            $('#blanketFilmWebSeries').css("display", "none");
        }
    });
    $(document.body).on('change', '#musicVidoesCheckBox' ,function(){
        if($("#musicVidoesCheckBox").is(':checked')) {
            $('#blanketFilmMusicVideos').css("display", "");
        }
        else{
            $('#blanketFilmMusicVideos').css("display", "none");
        }
    });
    $(document.body).on('change', '#documentariesCheckBox' ,function(){
        if($("#documentariesCheckBox").is(':checked')) {
            $('#blanketFilmDocumentaries').css("display", "");
        }
        else{
            $('#blanketFilmDocumentaries').css("display", "none");
        }
    });
    $(document.body).on('change', '#animatedProjectsCheckBox' ,function(){
        if($("#animatedProjectsCheckBox").is(':checked')) {
            $('#blanketFilmAnimatedProjects').css("display", "");
        }
        else{
            $('#blanketFilmAnimatedProjects').css("display", "none");
        }
    });
    $(document.body).on('change', '#othersCheckBox' ,function(){
        if($("#othersCheckBox").is(':checked')) {
            $('#blanketFilmOthers').css("display", "");
        }
        else{
            $('#blanketFilmOthers').css("display", "none");
        }
    });
    // Production type end



    // Any Post Production Work done for Others start
    $(document.body).on('change', '#anyPostProductionWorkDoneForOthersYesCheckBox' ,function(){
        if($("#anyPostProductionWorkDoneForOthersYesCheckBox").is(':checked')) {
            $('#blanketFilmWorkOthersText').css("display", "");
        }
        else{
            $('#blanketFilmWorkOthersText').css("display", "none");
        }
    });
    // Any Post Production Work done for Others end



    // Do you distribute any products start
    $(document.body).on('change', '#doYouDistributeAnyProductsYesCheckBox' ,function(){
        if($("#doYouDistributeAnyProductsYesCheckBox").is(':checked')) {
            $('#blanketFilmDistributeAnyProductText').css("display", "");
        }
        else{
            $('#blanketFilmDistributeAnyProductText').css("display", "none");
        }
    });
    // Do you distribute any products end



    // Do you rent property to others? If Yes, please provide a copy of your rental contract and provide anmnual receipts: start
    $(document.body).on('change', '#doYouRentPropertyToOthersCheckBox' ,function(){
        if($("#doYouRentPropertyToOthersCheckBox").is(':checked')) {
            $('#blanketFilmRentPropertyText').css("display", "");
        }
        else{
            $('#blanketFilmRentPropertyText').css("display", "none");
        }
    });
    // Do you rent property to others? If Yes, please provide a copy of your rental contract and provide anmnual receipts: end

    // Do you do any editing or special effects for others? If Yes, describe and provide receipts: start
    $(document.body).on('change', '#doYouDoAnyEditingOrSpecialEffectsForOthersCheckBox' ,function(){
        if($("#doYouDoAnyEditingOrSpecialEffectsForOthersCheckBox").is(':checked')) {
            $('#blanketFilmEditingOthersText').css("display", "");
        }
        else{
            $('#blanketFilmEditingOthersText').css("display", "none");
        }
    });
    // Do you do any editing or special effects for others? If Yes, describe and provide receipts: end

    // Has any form of insurance ever been cancelled or declined? If Yes, Please expain: start
    $(document.body).on('change', '#hasAnyFormOfInsuranceEverBeenCancelledOrDeclinedCheckBox' ,function(){
        if($("#hasAnyFormOfInsuranceEverBeenCancelledOrDeclinedCheckBox").is(':checked')) {
            $('#blanketFilmInsuranceCancelledText').css("display", "");
        }
        else{
            $('#blanketFilmInsuranceCancelledText').css("display", "none");
        }
    });
    // Has any form of insurance ever been cancelled or declined? If Yes, Please expain: end

        });