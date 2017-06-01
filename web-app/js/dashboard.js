$(document).ready(function () {
    var thisUser

    try{
        thisUser = $('#thisUserIs').html().trim();
    }
    catch(e){
        console.log("Could not verify user")
        thisUser = "";
    }

    $(".messageDate").each(function(){
        var dateFormattedString = convertUTCDateToLocalDate_messages($(this).html().trim().split(".")[0]);
        //alert(dateFormattedString)
        $(this).html(dateFormattedString)
    });

    //Mark Email chains with Unread Messages and correct Sender Span
    $(".messageChainContainer").each(function(){
        $(this).find(".unreadDiv").each(function(){
            var unreadStatus = $(this).html();
            console.log(unreadStatus);
            if(unreadStatus == "true"){
                $(this).closest(".messageChainContainer").find(".dashboardMessageRow").first().addClass("unreadMessageChain");
            }
            //unreadStatus = "";
        });

        var messageWith = "";
        $(this).find(".messageWith").each(function(){
            var sender = $(this).html();
            //console.log(unreadStatus);
            if(sender === thisUser){

            }
            else{
                messageWith = $(this).html();
                return false;
            }
        });

        $(this).find(".dashboardMessageRow").first().find(".messageWith").html(messageWith);

    });

    $(document.body).on('click', '.dashboardMessageRow' ,function(){
        var messageChainID = $(this).find(".messageChainID").html();
        window.location.href = "./../main/messages.gsp?initial=" + messageChainID;
    });

});

function convertUTCDateToLocalDate_messages(dateTimeString) {
    var localTime = moment.utc(dateTimeString).toDate();
    var momentObject = moment(localTime);
    //var localTimeDateObject  = moment.utc(string).toDate();


    var REFERENCE = moment(); // fixed just for testing, use moment();
    var TODAY = REFERENCE.clone().startOf('day');
    var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

    //if(momentObject.isSameOrAfter(TODAY, 'd')){
    //    momentObject = moment(momentObject).format('h:mm A');
    //    //$(this).html(momentObject);
    //}
    //else if(momentObject.isSame(TODAY, 'month')){
    //    momentObject = moment(momentObject).format('MMM D');
    //    //$(this).html(momentObject);
    //}
    //else{
    //    momentObject = moment(momentObject).format('M/DD/YY');
    //    //$(this).html(momentObject);
    //}

    momentObject = moment(momentObject).format('M/DD/YY');
    return momentObject;
}