/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {
    var thisUser = $('#thisUserIs').html().trim();
    //Mark Message Chain Container as Unread even if there is just ONE unread message in the chain

    $(".messageChainContainer").each(function(){
        var unread = false;
        $(this).find(".messageRow, .subMessageRow").each(function(){
            var unreadValue = $(this).find(".unreadTD").html();
            if(unreadValue == "true"){
                unread = true;
                return false;
            }
        });
        if(unread==true){
            $(this).children(".messageRow").first().addClass("unreadMessageChain");
        }

    });

    $('.lastMessageSentDateTimeTD').each(function(){
        var string = $(this).html().split(".")[0]
        $(this).html(convertUTCDateToLocalDate_OverviewFormat(string));

    });

    $(document).delegate('#replyTextArea', 'keydown', function(e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
            e.preventDefault();
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart =
                $(this).get(0).selectionEnd = start + 1;
        }
    });

    $(document.body).on('click', '#newMessageButton' ,function(){
        $('#newMessageModal').modal('show');
    });

    $(document.body).on('click', '.messageRow' ,function(){
        //change Selected Row
        $(".currentSelectedChain").removeClass("currentSelectedChain");
        $(this).addClass("currentSelectedChain");

        var numMessages = $(this).find('.messagesInChain').html();
        var htmlString = "";

        var sender = "";
        var recipient = "";
        var subject = "";
        var messageBody = "";
        var messageID = "";
        var messageChainID = "";
        var messageDateTime = "";
        var sentByMyself = false;

        //if Unread, mark as read
        if($(this).hasClass("unreadMessageChain")){
            var messageChainRead = $(this).find(".messageChainIDTD").html();
            //alert(messageChainRead)
            $.ajax({
                method: "POST",
                url: "/Async/markMessagesRead",
                data: {
                    messageChainRead: messageChainRead
                }
            })
                .done(function (msg) {
                    //alert($(this).parent().html())
                    if(msg.indexOf("good") > -1){
                        var messageChainReponseID = msg.split(";")[1];
                        $("#" + messageChainReponseID + "_Row").removeClass("unreadMessageChain");
                    }
                });
        }



        $($(this).parent().find('.subMessageRow').get().reverse()).each(function() {
            sender = $(this).find('.senderTD').html()
            recipient = $(this).find('.recipientTD').html()
            subject = $(this).find('.subjectTD').html()
            messageBody = $(this).find('.messageBodyTD').html()
            messageID = $(this).find('.messageIDTD').html()
            messageChainID = $(this).find('.messageChainIDTD').html()
            messageDateTime = $(this).find('.messageDateTimeTD').html()

            if(thisUser == sender){
                sentByMyself = true;
            }
            else{
                sentByMyself = false;
            }

            htmlString = htmlString + messageBoxHtmlString(sender, recipient, subject, messageBody, messageID, messageChainID, messageDateTime, sentByMyself);

        });

        sender = $(this).find('.senderTD').html();
        recipient = $(this).find('.recipientTD').html();
        subject = $(this).find('.subjectTD').html();
        messageBody = $(this).find('.messageBodyTD').html();
        messageID = $(this).find('.messageIDTD').html();
        messageChainID = $(this).find('.messageChainIDTD').html();
        messageDateTime = $(this).find('.messageDateTimeTD').html();

        if(thisUser == sender){
            sentByMyself = true;
        }
        else{
            sentByMyself = false;
        }

        htmlString = htmlString + messageBoxHtmlString(sender, recipient, subject, messageBody, messageID, messageChainID, messageDateTime, sentByMyself);

        $('#messageViewContainer').html(htmlString);

    });

    //set inital Chain View
    var initialChain = $('#initialMessageChainView').html();
    //alert(initialChain)
    $("#" + initialChain + "_Row").trigger("click");

    $(document.body).on('click', '#sendReplyButton' ,function(){


        var recipient = "";
        $('.messageViewSender, .messageViewRecipient').each(function(){
            if($(this).html().trim() === thisUser ){

            }
            else{
                recipient = $(this).html().trim();
                return false;
            }
        });

        var subject = "RE: " + $('#messageViewContainer').find('.messageViewBox').first().find('.messageViewSubject').html();

        var messageBody = $('#replyTextArea').val();
        var replyTo = $('#messageViewContainer').find('.messageViewBox').last().find('.messageID').html();
        var messageChainID = $('#messageViewContainer').find('.messageViewBox').last().find('.messageChainID').html();

        //alert(subject);
        $('#progressBarHeader').html("Sending...");
        $('#progressBarModal').modal('show');
        $('.progress-bar').attr('aria-valuenow', "75").animate({
            width: "75%"
        }, 1000);
        $.ajax({
            method: "POST",
            url: "/Async/sendMessage",
            data: {
                recipient: recipient,
                subject: subject,
                messageBody: messageBody,
                messageType: "replyMessage",
                replyTo: replyTo,
                messageChainID: messageChainID,
            }
        })
            .done(function (msg) {
                $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
                $('#progressBarModal').modal('hide');
                $('#alertMessageContent').html("Message has been sent");
                $('#alertMessageModal').modal('show');
                $(document.body).on('click', '#alertMessageModalButton' ,function(){
                    window.location.href = "./../main/messages.gsp";
                });
                $(document).keypress(function(e) {
                    if(e.which == 13) {
                        $('#alertMessageModalButton').trigger("click");
                    }
                });

            });

    });

});


function messageBoxHtmlString(sender, recipient, subject, messageBody, messageID, messageChainID, messageDateTime, sentByMyself){
    //var month = messageDateTime.split(" ")[0].split("-")[1];
    //var date = messageDateTime.split(" ")[0].split("-")[2];
    //var year = messageDateTime.split(" ")[0].split("-")[0];
    //
    //var hour = messageDateTime.split(" ")[1].split("-")[0];

    //var date = convertUTCDateToLocalDate(new Date(messageDateTime));
    console.log(messageDateTime)
    var string = messageDateTime.split(".")[0]
    //
    //var localTime  = moment.utc(string).toDate();
    //localTime = moment(localTime).format('MM-DD-YYYY HH:mm');

    var classString = ""
    if(sentByMyself){
        classString = "messagePanelMe"
    }
    else{
        classString = "messagePanelOther"
    }


    htmlString =
        "<div class='panel panel-default messageViewBox " + classString + "' >" +
            "<div class='panel-body' style='position: relative;'>" +
                "<div class='row' style='padding:0px;'>" +
                    "<div class='col-xs-12'>" +
                        "<span >From: </span>" +
                        "<span class='messageViewSender'>"+ sender +"</span>" +
                    "</div>" +
                    "<div class='col-xs-12'>" +
                        "<span >To: </span>" +
                        "<span class='messageViewRecipient'>"+ recipient +"</span>" +

                    "</div>" +
                    "<div class='col-xs-12'>" +
                        "<span class='messageViewDate'>"+ convertUTCDateToLocalDate_DetailViewFormat(string) +"</span>" +
                    "</div>" +
                    "<div class='col-xs-12'>" +
                        "<span class='messageViewSubject'>"+ subject +"</span>" +
                    "</div>" +
                    "<div class='col-xs-12' style='margin-top:40px;'>" +
                        "<span class='messageViewMessageBody' style='white-space: pre-wrap; font-family: Courier New, Courier, monospace'>"+ messageBody +"</span>" +
                        "<span class='messageID' style='display:none'>"+ messageID +"</span>" +
                        "<span class='messageChainID' style='display:none'>"+ messageChainID +"</span>" +
                    "</div>" +
                "</div>" +
                "<div style='position: absolute; top: 5px; right: 7px; left: auto; z-index: 100; color: rgb(165, 165, 165); font-size: 9px;'>" +
                    "<span>AKMGS"+ messageID +"</span>" +
                    //"<span>"+ date.toLocaleString() +"</span>" +
                "</div>" +
            "</div>" +
        "</div>";




    return htmlString;
}

function convertUTCDateToLocalDate_OverviewFormat(dateTimeString) {
    var localTime = moment.utc(dateTimeString).toDate();
    var momentObject = moment(localTime);
    //var localTimeDateObject  = moment.utc(string).toDate();


    var REFERENCE = moment(); // fixed just for testing, use moment();
    var TODAY = REFERENCE.clone().startOf('day');
    var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

    if(momentObject.isSameOrAfter(TODAY, 'd')){
        momentObject = moment(momentObject).format('h:mm A');
        //$(this).html(momentObject);
    }
    else if(momentObject.isSame(TODAY, 'month')){
        momentObject = moment(momentObject).format('MMM D');
        //$(this).html(momentObject);
    }
    else{
        momentObject = moment(momentObject).format('M/DD/YY');
        //$(this).html(momentObject);
    }

    return momentObject;
}

function convertUTCDateToLocalDate_DetailViewFormat(dateTimeString) {
    var localTime = moment.utc(dateTimeString).toDate();
    var momentObject = moment(localTime);
    //var localTimeDateObject  = moment.utc(string).toDate();


    var REFERENCE = moment(); // fixed just for testing, use moment();
    var TODAY = REFERENCE.clone().startOf('day');
    var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

    momentObject = moment(momentObject).format('MM-DD-YY h:mm A');

    return momentObject;
}