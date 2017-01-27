/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {
    var userRole = $('#userRole').html().trim();
    //alert(userRole);
    $("#submissionSearch").on('input', function() {
        $(this).val();

        $.ajax({
            method: "POST",
            url: "/portal/Async/searchSubmissions",
            data: {riskType:  "",
                searchString :  $(this).val()

            }
        })
            .done(function (msg) {
                //alert(msg);
                console.log(msg);

                var htmlString = "";
                var submissionsArray = msg.split("&;;&");
                var aimQuoteID = "";
                var namedInsured = "";
                var coverages = "";
                var submittedBy = "";
                var submitDate = "";
                var statusCode = "";
                var underwriter = "";


                submissionsArray.forEach(function(it) {
                    var aimQuoteID = it.split("&,&")[0];
                    var namedInsured = it.split("&,&")[1];
                    var coverages = it.split("&,&")[2];
                    var submittedBy = it.split("&,&")[3];
                    var submitDate = it.split("&,&")[4];
                    var statusCode = it.split("&,&")[5];
                    if(statusCode === "QO"){
                        statusCode = "Quoted";
                    }

                    var underwriter = it.split("&,&")[6];
                    if(underwriter == "null"){
                        underwriter = "";
                    }

                    htmlString = htmlString + "<tr>" +
                    "<th scope='row'><a href='./../main/submissionView?s=${s.aimQuoteID}'>" + aimQuoteID + "</a></th>" +
                    "<td>" + namedInsured + "</td>" +
                    "<td>" + coverages + "</td>" +
                    "<td>" + submittedBy + "</td>" +
                    "<td>" + submitDate + "</td>" +
                        "<td>" + statusCode + "</td>" +
                        "<td>" + underwriter + "</td>" +
                    "<td><a href='./../web-app/attachments/testpdf.pdf'>my link</a></td>" +
                    "</tr>";
                });

                $('#submissionRows').html(htmlString);
            });
    });

    ////////////////////////////////////////
    $(document).on('click', '.submissionRow', function () {

        if($(this).next().hasClass("submissionQuickOptions")){
            $(this).next().remove();
        }
        else{
            var htmlString ="";
            var statusCode = $(this).find('.statusCode').html().trim();
            var aimQuoteID = $(this).find('.aimQuoteIDTD').html().trim();
            var underwriter = $(this).find('.underwriterTD').html().trim();

            if(userRole === "Broker" ){
                //alert(statusCode);
                htmlString = htmlString + "<tr class='submissionQuickOptions' style='background: rgba(132, 204, 210, 0.21);'>" +
                        "<td class='QOaimQuoteID'>" + aimQuoteID +  "</td>" +
                        "<td class='QOstatusCode'>" + statusCode +  "</td>" +
                    "<td colspan='8'>" +
                    "<div class='col-xs-6'>" +

                    "</div>" +
                    "<div class='col-xs-6'>" +
                    "<button type='button' class='btn btn-sm btn-default submissionOptionButton messageButton'> Message Underwriter " +
                    "<span class='underWriterToMessage' style='display: none;'>" + underwriter
                    "</span>" +
                    "</button>";

                if(statusCode === "QO"){
                    htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton statusChangeButton' > Request Approval </button>";
                }
                else if(statusCode === "WRA"){
                    //htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton statusChangeButton' > Request Approval </button>";
                }
                else if(statusCode === "WB3"){
                    htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton statusChangeButton' > Request Bind </button>";
                }
                else if(statusCode === "BRQ"){
                    //htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton statusChangeButton' > Request Approval </button>";
                }
                else if(statusCode === "BIF"){

                }
                else if(statusCode === "NBR"){

                }
                htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton generateCert' > Certificates </button>";

                htmlString = htmlString + "</div>" +
                    "</td>" +
                    "</tr>";
            }
            else if(userRole ==="Underwriter"){
                htmlString = htmlString + "<tr class='submissionQuickOptions' style='background: rgba(132, 204, 210, 0.21);'>" +
                    "<td class='QOaimQuoteID'>" + aimQuoteID +  "</td>" +
                    "<td class='QOstatusCode'>" + statusCode +  "</td>" +
                    "<td colspan='8'>" +
                    "<div class='col-xs-6'>" +

                    "</div>" +
                    "<div class='col-xs-6'>" +
                    "<button type='button' class='btn btn-sm btn-default submissionOptionButton messageButton'> Message Broker " +
                    "<span class='underWriterToMessage' style='display: none;'>" + underwriter
                "</span>" +
                "</button>";

                if(statusCode === "QO"){
                    htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton statusChangeButton' > Request Approval </button>";
                }
                else if(statusCode === "WRA"){
                    htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton statusChangeButton' > Approve </button>";
                }
                else if(statusCode === "WB3"){
                    htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton statusChangeButton' > Request Bind </button>";
                }
                else if(statusCode === "BRQ"){
                    htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton statusChangeButton' > Bind</button>";
                }
                else if(statusCode === "BIF"){

                }
                else if(statusCode === "NBR"){

                }
                htmlString = htmlString + "<button type='button' class='btn btn-sm btn-default submissionOptionButton generateCert' > Certificates </button>";

                htmlString = htmlString + "</div>" +
                    "</td>" +
                    "</tr>";
            }
            else{
                htmlString = htmlString + "<tr class='submissionQuickOptions' style='background: rgba(132, 204, 210, 0.21);'>" +
                    "<td colspan='8'>" +
                    "<div class='col-xs-6'>" +

                    "</div>" +
                    "<div class='col-xs-6'>" +
                    "<button type='button' class='btn btn-sm btn-default'> Contact Insured </button>" +
                    "<button type='button' class='btn btn-sm btn-default'> Change Status To </button>" +
                    "<button type='button' class='btn btn-sm btn-default'>Bind</button>" +
                    "<button type='button' class='btn btn-sm btn-default'> Request More Info </button>" +
                    "<button type='button' class='btn btn-sm btn-default'> Approve </button>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";
            }

            $(this).after(htmlString);
        }


    });


    $(document).on('click', '.statusChangeButton', function () {
        var currentStatus = $(this).closest('.submissionQuickOptions').find('.QOstatusCode').html().trim();
        var changeStatusTo = "";
        var thisQuoteID = $(this).closest('.submissionQuickOptions').find('.QOaimQuoteID').html().trim();
        if(currentStatus === "QO"){
            changeStatusTo = "WRA"
            $(this).html("Awaiting Approval")
        }
        else if(currentStatus === "WRA"){
            changeStatusTo = "WB3"
            $(this).html("Approved")
        }
        else if(currentStatus === "WB3"){
            changeStatusTo = "BRQ"
            $(this).html("Awaiting Bind Approval")
        }
        else if(currentStatus === "BRQ"){
            changeStatusTo = "BIF"
            $(this).html("Bound")
        }
        else if(currentStatus === "BIF"){
            changeStatusTo = "WRA"
            $(this).html("Awaiting Approval")
        }

        $.ajax({
            method: "POST",
            url: "/portal/Async/changeSubmissionStatus",
            data: {statusCode: changeStatusTo,
                aimQuoteID: thisQuoteID
            }
        })
            .done(function (msg) {
                //alert(msg);
                //$('#some_id').click(function() {
                //
                //});
                window.location='/portal/main/submissions';
            });
    });

    $(document).on('click', '.messageButton', function () {
        $('#newMessageModal').modal('show');
        var recipientString = $(this).find('.underWriterToMessage').html().trim();

        var htmlString = "<option value='" + recipientString + "'>" + recipientString + "</option>" ;

        $('#recipientSelect').html(htmlString);
    });

    $(document).on('click', '#modalSendMessageButton', function () {
        var recipient = $('#recipientSelect').val();
        var messageBody = $('#messageTextArea').val();
        var subject = $('#messageSubject').val();
        //var messageChainID = $('#messageViewContainer').find('.messageViewBox').last().find('.messageChainID').html();
        $('#newMessageModal').modal('hide');
        //alert(subject);
        $('#progressBarHeader').html("Sending...");
        $('#progressBarModal').modal('show');
        $('.progress-bar').attr('aria-valuenow', "75").animate({
            width: "75%"
        }, 1000);
        $.ajax({
            method: "POST",
            url: "/portal/Async/sendMessage",
            data: {
                recipient: recipient,
                subject: subject,
                messageBody: messageBody,
                messageType: "message"
            }
        })
            .done(function (msg) {

                $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
                $('#progressBarModal').modal('hide');
                $('#alertMessageContent').html("Message has been sent");
                $('#alertMessageModal').modal('show');
                $(document.body).on('click', '#alertMessageModalButton' ,function(){
                    window.location.href = "./../main/submissions.gsp";
                });
                $(document).keypress(function(e) {
                    if(e.which == 13) {
                        $('#alertMessageModalButton').trigger("click");
                    }
                });

            });
    });

    $(document).on('click', '.generateCert', function () {
        window.location='/portal/main/certs';

        //$.ajax({
        //    method: "POST",
        //    url: "/portal/Async/getCert",
        //    data: {submissionID: "test"
        //    }
        //})
        //    .done(function (msg) {
        //        //alert(msg);
        //        //$('#some_id').click(function() {
        //        //
        //        //});
        //        window.location='/portal/main/downloadCert';
        //    });
    });



});


function changeSubmissionStatus(submissionID, statusCode){
    $.ajax({
        method: "POST",
        url: "/portal/Async/changeSubmissionStatus",
        data: {submissionID: submissionID,
            statusCode: statusCode
        }
    })
        .done(function (msg) {
            //alert(msg);
        });
}