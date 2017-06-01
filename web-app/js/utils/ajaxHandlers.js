$(document).ready(function () {

    $.ajaxSetup({
        tryCount : 0,
        retryLimit : 3,
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

    $( document ).ajaxComplete(function( event, xhr, settings ) {
            // console.log(JSON.stringify(xhr, null, 4) )
            if(xhr.hasOwnProperty('responseText')){
                if(xhr.responseText.indexOf("Session Expired") > -1){
                    console.log( "Triggered ajaxComplete handler. The result is " + xhr.responseText );

                    // window.location.href = "" + xhr.responseText.split(',')[1]
                    alert("Your session has expired. Please log back in")
                }
            }

    });
});