

$(document).ready(function () {
    var quoteID = $('.quoteIDLink').first().text().trim();
    // alert(quoteID)
    $.ajax({
        method: "POST",
        url: "/Async/getAttachmentsList",
        data: {
            quoteID: quoteID
        }
    })
        .done(function (msg) {
            // alert(msg);
            var countFiles = 0 ;
            var htmlString = "<strong class='col-xs-3'>Attachments </strong> <div class='col-xs-9'> <div>";

            var attachmentArray = msg.split("&;&");
            attachmentArray.forEach(function(it) {

                var fileName = it.split("&,&")[0];
                if(fileName === "Indication A.pdf"){

                }
                else{
                    count++;
                    var fileSize = it.split("&,&")[1];
                    if(fileName.trim().length > 0){
                        var ext = fileName.split('.').pop().toLowerCase();

                        var iconFilePath ="";

                        //alert('Only .zip, .doc, .docx, .xlsx, .xls, .pdf are permitted');
                        var iconFilePath = "";
                        if (ext == "zip") {
                            iconFilePath = "zipIcon.png"
                        }
                        else if (ext == "doc") {
                            iconFilePath = "docIcon.png"
                        }
                        else if (ext == "docx") {
                            iconFilePath = "docxIcon.png"
                        }
                        else if (ext == "xls") {
                            iconFilePath = "xlsIcon.png"
                        }
                        else if (ext == "xlsx") {
                            iconFilePath = "xlsxIcon.png"
                        }
                        else if (ext == "pdf") {
                            iconFilePath = "pdfIcon.png"
                        }
                        else if (ext == "txt") {
                            iconFilePath = "txtIcon.png"
                        }
                        else {
                            iconFilePath = "fileIcon.png"
                        }

                        //$("#" + $(this).attr('id') + 'Span').closest(".fileNameContainer").css("display", "");
                        //$("#" + $(this).attr('id') + 'Span').html("<img src='/images/" + iconFilePath + "' height='16' width='16' style='margin-right:5px'/>" + name);



                        htmlString = htmlString +
                            "<div class='row fileRow' style='margin-bottom: 10px;'>" +
                            "<div class='row col-xs-12'>" +
                            "<div class='col-xs-10'>" +
                            "<img src='/images/" + iconFilePath + "' height='24' width='24' style='margin-right:9px'/>" +
                            "<span class='fileDescriptionSpan ' style='line-height: 30px;'>" + fileName +"</span>" +
                            "</div>" +
                            "<div class='col-xs-2'>" +
                            "<a href='/async/ajaxDownloadAttachment?q=" + quoteID + "&f=" + fileName+ "'>" +
                            "<button class='btn btn-primary' style='margin-right:20px;margin-top: 2px;width:50px; padding:2px;'><i class='fa fa-download' aria-hidden='true'></i></button>" +
                            "</a>" +
                            "</div>" +
                            "</div>" +
                            "</div>";
                    }

                }
            });

            htmlString = htmlString + "</div>" +
                "</div>";
            if(count > 0){
                $("#attachmentRowsContainer").html(htmlString);

            }

        });
});
