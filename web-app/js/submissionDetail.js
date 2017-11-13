/**
 * Created by paikchris on 8/23/16.
 */

var quoteRecord, versionRecords, dvVersionRecords, dvVersionView, submissionRecord
var questionAnswerMap, questionAnswerOrganizedMap

$(document).ready(function () {
    quoteRecord = qR
    versionRecords = vR
    dvVersionRecords = dVR
    dvVersionView = dVV
    submissionRecord = sR

    questionAnswerMap = vAM
    questionAnswerOrganizedMap = vAOM

    init();
});

function init(){
    initializeListeners()
}




//////////////////////INIT FUNCTIONS////////////////////////////
function initializeListeners(){
    $(document.body).on('click', '.createNewVersionButton', function(e) {
        var versionID = $(this).data('versionid')

        createNewVersion(versionID)
    });

}

//////////////////////HTML FUNCTIONS////////////////////////////



///////////////////////LISTENER ACTION FUNCTIONS////////////////////////////
function createNewVersion(versionID){
    var quoteID = getThisSubmissionQuoteID()
    window.location.href = "./../main/newSubmissionV2.gsp?newVersion=true&q=" + quoteID + "&vfrom=" + versionID + "";
}
function getThisSubmissionQuoteID(){
    return quoteRecord.QuoteID
}

















