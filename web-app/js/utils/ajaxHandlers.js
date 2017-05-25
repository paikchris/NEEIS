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
            if(xhr.responseText.split(',')[0] === "Session Expired"){
                console.log( "Triggered ajaxComplete handler. The result is " + xhr.responseText );

                // window.location.href = "" + xhr.responseText.split(',')[1]
                alert("Your session has expired. Please log in")
            }
    });
});