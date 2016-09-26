/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {


    //CHECKBOXES THAT HIDE AND SHOW FIELDS
    $(document.body).on('change', '#tvSeriesCheckBox' ,function(){
        if($("#tvSeriesCheckBox").is(':checked')) {
            $('#specFilmNumEpisodesText').css("display", "");
        }
        else{
            $('#specFilmNumEpisodesText').css("display", "none");
        }
    });

    $(document.body).on('change', '#otherProductionType' ,function(){
        if($("#otherProductionType").is(':checked')) {
            $('#specFilmOtherDescribe').css("display", "");
        }
        else{
            $('#specFilmOtherDescribe').css("display", "none");
        }
    });

    $(document.body).on('change', '#pyrotechnicsCheckbox' ,function(){
        if($("#pyrotechnicsCheckbox").is(':checked')) {
            $('#pyrotechnicsAttachContainer').css("display", "");
        }
        else{
            $('#pyrotechnicsAttachContainer').css("display", "none");
        }
    });
    $(document.body).on('change', '#stuntsHazardousCheckbox' ,function(){
        if($("#stuntsHazardousCheckbox").is(':checked')) {
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "");
        }
        else{
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "none");
        }
    });

    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('#page-content-wrapper');
    var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        orientation: "auto top",
        autoclose: true,
    };
    date_input.datepicker(options);






    $('#attachButton').click(function(){
        // var formData = new FormData($('form')[0]);

        var file = $('#file').get(0).files[0];
        var formData = new FormData();
        formData.append('file', file);

        $.ajax({
            url: '/portal/async/ajaxAttach',
            //Ajax events
            beforeSend: function (e) {
                alert('Are you sure you want to upload document.');
            },
            success: function (e) {
                alert('Upload completed');
            },
            error: function (e) {
                alert('error ' + e.message);
            },
            // Form data
            data: formData,
            type: 'POST',
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
            





        // $.ajax({
        //     url: '/portal/async/ajaxAttach',  //Server script to process data
        //     type: 'POST',
        //     // xhr: function() {  // Custom XMLHttpRequest
        //     //     var myXhr = $.ajaxSettings.xhr();
        //     //     if(myXhr.upload){ // Check if upload property exists
        //     //         myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
        //     //     }
        //     //     return myXhr;
        //     // },
        //     //Ajax events
        //     // beforeSend: beforeSendHandler,
        //     // success: completeHandler,
        //     // error: errorHandler,
        //     // Form data
        //     data: formData,
        //     //Options to tell jQuery not to process data or worry about content-type.
        //     cache: false,

        // });
    });

    $(':file').change(function(){
        var file = this.files[0];
        var name = file.name;
        var size = file.size;
        var type = file.type;
        //Your validation
    });



    ///////////////////////////



});



