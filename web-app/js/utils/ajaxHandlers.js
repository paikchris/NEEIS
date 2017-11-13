var outstandingCalls = {}

$(document).ready(function () {
    $.ajaxSetup({
        tryCount : 0,
        retryLimit : 0,
        beforeSend: function(xhr, settings){
            settings.callID = generateAjaxID();
        },
        callID: 0,
        error : function(xhr, textStatus, errorThrown ) {
            if (this.tryCount <= this.retryLimit) {
                //try again
                this.tryCount++;
                console.log("Retrying")
                $.ajax(this);
                return;
            }
            return;
        }
    });

    $( document ).ajaxSend(function( event, xhr, settings ) {
        outstandingCalls[settings.callID] = settings.url;

        // console.log(Object.keys(outstandingCalls).length)
    });

    $( document ).ajaxComplete(function( event, xhr, settings ) {
        // console.log(settings.callID)
        console.log(outstandingCalls)
        console.log(Object.keys(outstandingCalls).length)
        delete outstandingCalls[settings.callID]


        if(xhr.hasOwnProperty('responseText')){
            if(xhr.responseText.indexOf("Session Expired") > -1){
                console.log( "Triggered ajaxComplete handler. The result is " + xhr.responseText );
                // window.location.href = "" + xhr.responseText.split(',')[1]
                alert("Your session has expired. Please log back in")
            }
        }

    });


});

function generateAjaxID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};