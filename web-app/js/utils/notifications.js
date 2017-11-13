var notificationCountContainer
var notificationListContainer
var notificationBadgeDefaultColor
var notificationBadgeNewColor

//START NOTIFICATIONS
function startNotificationService(uuid, fileName, fileSize, fileRowID){
    notificationCountContainer = $('#notificationCountSpan')
    notificationListContainer = $('#notificationListContainer')


    console.log("STARTING NOTIFICIATIONS")
    getNotificationMapFromDB()

    initNotificationListeners()
}

function initNotificationListeners(){
    //WHEN NOTIFICATIONS LIST IS CLICKED AND SHOWN MARK THE NOTFICIATIONS VIEWED
    $(document).on('click', '#notificationDropdownToggle', function (){
        var notificationDropdownLI = $(this).closest('li')

        if($(notificationDropdownLI).hasClass('open')){
            //WHEN NOTIFICATION LIST IS OPEN, LOOP THROUGH NOTIFICATIONS AND MARK ALL AS VIEWED

            $(notificationListContainer).find('.notificationLI').each(function(){
                var thisNotificationLI = $(this)

            })
        }
        else{
            console.log("Notification Closed")

        }

    });

}

///////////////////// WEB SERVICE COMMUNICATION FUNCTIONS/////////////////////
function getNotificationMapFromDB(){
    try{
        $.ajax({
            method: "POST",
            url: "/Notification/getNotificationMap",
            data: {
            }
        })
            .done(function(msg) {
                //CONVERT THE MSG (WHICH IS A JSON STRING) INTO A JAVASCRIPT ARRAY
                var notificationArray = convertNotficationJSONToArray(msg)

                console.log(notificationArray)
                var htmlStringForNotificationArray = getNotificationListHTML(notificationArray)
                console.log(htmlStringForNotificationArray)
                updateNotificationListUI(htmlStringForNotificationArray)
            });
    }
    catch(e){
        console.log("Error retrieving notifications")
        console.log(e)
    }
}
function addNewNotificationToDB(notificationCode){
    try{
        $.ajax({
            method: "POST",
            url: "/Notification/addNewNotification",
            data: {
                notificationCode: notificationCode
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    console.log("Notification Saved")
                }
                else{
                    console.log("Error Adding Notification")
                }
            });
    }
    catch(e){
        console.log("Error adding notification")
        console.log(e)
    }
}
function markNotificationsAsViewedInDB(notificationArray){
    //0. NOTIFICATION ARRAY PASSED TO THIS FUNCTION IN PARAMS SHOULD HAVE THE NOTIFICATION UNIQUE IDS ONLY EX.123123123
    //1. CONVERT THE ARRAY OF UNIQUE IDS TO A JSON ARRAY
    //2. SEND THE JSON STRING AS DATA TO NOTIFICATIONS/MARKNOTIFICATIONSVIEWED FUNCTION IN CONTROLLER

    try{
        $.ajax({
            method: "POST",
            url: "/Notification/markNotificationsAsViewed",
            data: {
                //JOHN SEND THE NOTIFICATION UNIQUE ID ARRAY
                notificationUniqueIDArray: notificationArray
            }
        })
            .done(function(msg) {
                if(msg === "Success"){
                    console.log("Marking notification as viewed")
                }
                else{
                    console.log("Error marking notification as viewed")
                }
            });
    }
    catch(e){
        console.log("Error marking notifications")
        console.log(e)
    }
}


///////////////////// HTML GETTER  FUNCTIONS /////////////////////
function getNotificationListHTML(notificationArray){
    var htmlString = ""
    for(var i=0;i<notificationArray.length; i++){
        var thisNotificationObject = notificationArray[i]
        var notificationUniqueID = thisNotificationObject.notificationUniqueID
        var notificationCode = thisNotificationObject.code
        var notificationText = thisNotificationObject.displayText
        var notificationViewed = thisNotificationObject.viewed

        var newNotificationLI = buildNotificationLIHTML(notificationCode, notificationText, notificationUniqueID, notificationViewed)

        htmlString = htmlString + newNotificationLI + buildNotificationSeparatorHTML()
    }

    return htmlString
}
function buildNotificationLIHTML(notificationCode, notificationText, notificationUniqueID, notificationViewed){
    var styleString = ""
    if(notificationViewed === "Y"){
        styleString = styleString + "font-weight: 400; "
    }
    else{
        styleString = styleString + "font-weight: 600; font-weight: 400; background: rgba(105, 231, 255, 0.22);"
    }

    var notificationListItemTemplateHTML =
        "<li class='notificationLI' data-notificationcode='" + notificationCode + "' " +
        "       data-notificationuniqueid='" + notificationUniqueID + "' data-notificationviewed='" + notificationViewed + "'" +
        "       style='" + styleString + "'" +
        ">" +
        "   <a href='#'>" +
        "       <span class='notificationTextSpan'>" + notificationText + "</span>" +
        "   </a>" +
        "</li>"

    return notificationListItemTemplateHTML
}
function buildNotificationSeparatorHTML(){
    var notificationSeparatorHTML = "<li role='separator' class='divider'></li>"

    return notificationSeparatorHTML
}



///////////////////// NOTFICIATIONS UTIL FUNCTIONS /////////////////////
function convertNotficationJSONToArray(rawNotficationJSONString){
    return JSON.parse(rawNotficationJSONString)
}
function buildCurrentNotificationsArray(){

}




///////////////////// NOTFICIATIONS UI FUNCTIONS /////////////////////
function markNotificationBadgeNew(){
    $('#notificationCountSpan').addClass('badge-notify-new')
}
function markNotificationBadgeDefault(){
    $('#notificationCountSpan').removeClass('badge-notify-new')
}
function updateNotificationCountUI(){
    //COUNT NOTIFICATIONS IN LIST
    var count = $('.notificationLI').length

    $('#notificationCountSpan').html(count)
}
function updateNotificationListUI(newHTMLString){
    //INSERT NEW NOTIFICATION ITEMS HTML
    $(notificationListContainer).html(newHTMLString)

    //UPDATE NOTIFICATION COUNT NUMBER
    updateNotificationCountUI()

}

