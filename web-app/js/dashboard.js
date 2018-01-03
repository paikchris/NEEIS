var userRole = ""
var submissionArray
var submissionTableDataArray = []
var submissionTable
var monthlyPremium
var monthlyPremiumArray = []
$(document).ready(function () {
    // var thisUser
    // $.fn.dataTable.moment('L');

    init();
});


function init() {
    setUserRole()
    setNeeisUnderwriterList()
    getUnderwriterDashboardTableRowContent()
    initDashboardListeners()
    getTotalMonthlyPremiums()
}

function initDashboardListeners() {

    $(document.body).on('click', '.approval', function () {
        submissionTable
            .columns(2)
            .search("WRA")
            .draw();
    })
    $(document.body).on('click', '.binding', function () {
        submissionTable
            .columns(2)
            .search("BRQ")
            .draw();
    })
    $(document.body).on('click', '.all', function () {
        submissionTable
            .columns(2)
            .search("")
            .draw();
    })
}

function setUserRole() {
    try {
        userRole = $('#userRole').html().trim();
    }
    catch (e) {
        console.log("Could not verify user, continuing as a Broker")
        userRole = "Broker"
    }
}


function setNeeisUnderwriterList() {
    try {
        neeisUWList = $('#neeisUWListHidden').html().trim().slice(1, -1).split(",");
    }
    catch (e) {
        neeisUWList = []
    }
}

function getTotalMonthlyPremiums() {
    $.ajax({
        url: "/main/getTotalMonthlyPremium",
        data: {
            user: userRole
        }
    })

        .done(function (msg) {
            monthlyPremium = JSON.parse(msg)
            totalMonthlyPremiumFilter()
            totalMonthlyPremiumLoop()
            // console.log(monthlyPremium)
        })
}

function totalMonthlyPremiumFilter() {
    monthlyPremiumArray = []
    for (var i = 0; i < monthlyPremium.length; i++) {
        var premiumGraph = monthlyPremium[i]
        var monthlyPremiumRow = {}
        if (premiumGraph.StatusID == 'EXP'){
            monthlyPremiumArray.push(premiumGraph)
        }
    }
    console.log(monthlyPremiumArray)
    monthlyPremiumFilterDate()
    // $('.dashboardSubmissionTableRows').html(allTableRowsHTML)
}

function monthlyPremiumFilterDate(){
    for (var i = 0; i < monthlyPremiumArray.length; i++) {
        var premiumGraph = monthlyPremiumArray[i]
        var monthlyPremiumRow = []
        var momentsDate = premiumGraph.Received
        var date = moment(momentsDate).format("MM/YYYY")
        console.log(date)
        if (date == 'EXP'){
            monthlyPremiumRow.push(premiumGraph.BndPremium)
            monthlyPremiumRow.push(premiumGraph.Received)
            monthlyPremiumRow.push(premiumGraph.StatusID)
            monthlyPremiumArray.push(monthlyPremiumRow)
        }
    }
}

function totalMonthlyPremiumLoop() {
    monthlyPremiumArray = []
    for (var i = 0; i < monthlyPremium.length; i++) {
        var premiumGraph = monthlyPremium[i]
        var monthlyPremiumRom = []

        // monthlyPremiumRom.push(premiumGraph.aimQuoteID)
        // monthlyPremiumRom.push(premiumGraph.namedInsured)
        // monthlyPremiumRom.push(premiumGraph.statusCode)
        // monthlyPremiumRom.push(premiumGraph.submitDate)
        // monthlyPremiumRom.push(premiumGraph.submittedBy)
        //
        // monthlyPremiumArray.push(monthlyPremiumRom)

        // var submissionMap = submissionArray[i]
        // var submissionTableRow = getUnderwriterDashboardSubmissionRowHTML(submissionMap)
        // allTableRowsHTML = allTableRowsHTML + submissionTableRow
    }
    // $('.dashboardSubmissionTableRows').html(allTableRowsHTML)
}

//REPLACE JANUARY WITH A VARIABLE THAT WILL BE USED FOR Y AXIS
// function createDashboardGraphBars() {
//     var htmlString = "" +
//         "<span class='chart__label'>" +
//         "January" +
//         "</span>" +
//         "</li>"
//     "<li class='chart__bar' style='width: 98%;'>" +
//     return htmlString//

// }




function getUnderwriterDashboardTableRowContent() {
    $.ajax({
        url: "/main/getUnderwriterDashboardTableData",
        data: {
            user: userRole
        }
    })

        .done(function (msg) {
            submissionArray = JSON.parse(msg)
            underWriterDashboardTableRowLoop()

            submissionTable = $('#table_id').DataTable({
                data: submissionTableDataArray,
                columns: [
                    {title: "Submission ID"},
                    {title: "Name Of Insured"},
                    {title: "Status"},
                    {title: "Submission Date"},
                    {title: "Agent"}
                ]
            });
            var l = $('th:contains("Submission Date")')
            for (var i = 0; i < 2; i++)
                l.click();
        })
}

function underWriterDashboardTableRowLoop() {
    submissionTableDataArray = []
    for (var i = 0; i < submissionArray.length; i++) {
        var submissionMap = submissionArray[i]
        var submissionRow = []

        submissionRow.push(submissionMap.aimQuoteID)
        submissionRow.push(submissionMap.namedInsured)
        submissionRow.push(submissionMap.statusCode)
        submissionRow.push(submissionMap.submitDate)
        submissionRow.push(submissionMap.submittedBy)

        submissionTableDataArray.push(submissionRow)

        // var submissionMap = submissionArray[i]
        // var submissionTableRow = getUnderwriterDashboardSubmissionRowHTML(submissionMap)
        // allTableRowsHTML = allTableRowsHTML + submissionTableRow
    }
    // $('.dashboardSubmissionTableRows').html(allTableRowsHTML)
}


// function createDashboardTableRows(dvVersionData, versionData, quoteDetails, submissionRowParent) {
//
//     var htmlString = "" +
//         "<tr class='versionRow' style='cursor:pointer'> " +
//         "<td><i class='fa fa-level-up fa-rotate-90' aria-hidden='true'></i>" +
//         "<span class='aimVersionTD' style='color: rgba(100, 152, 163, 1); font-weight: 700; font-size: 11px;'> " + trimQuoteMarks(versionData.Version) + "</span></td> " +
//         "<th scope='row'><a href='#' class='submissionID'>" + trimQuoteMarks(dvVersionData.QuoteID) + "</a></th> " +
//         "<td class='namedInsuredTD'>" + trimQuoteMarks(quoteDetails.namedInsured) + "</td> " +
//         "<td class='submittedByTD'>" + trimQuoteMarks(quoteDetails.broker) + "</td> " +
//         "<td class='brokerEmail' style='display:none'>" + trimQuoteMarks(quoteDetails.brokerEmail) + "</td> " +
//         "<td class='submitDateTD'>" + trimQuoteMarks(versionData.Quoted) + "</td> " +
//         "<td class='submissionStatusTD'>" + trimQuoteMarks(dvVersionData.StatusID) + "</td> " +
//         "<td class='underwriterTD'>" + trimQuoteMarks(quoteDetails.underwriter) + "</td> " +
//         "<td class=''> </td> " +
//         "<td class='statusCode' style='display:none'>" + trimQuoteMarks(dvVersionData.StatusID) + " </td> " +
//         "</tr>";
//
//     return htmlString
// }
//
// $(".messageDate").each(function () {
//     var dateFormattedString = convertUTCDateToLocalDate_messages($(this).html().trim().split(".")[0]);
//     //alert(dateFormattedString)
//     $(this).html(dateFormattedString)
// });
//
// //Mark Email chains with Unread Messages and correct Sender Span
// $(".messageChainContainer").each(function () {
//     $(this).find(".unreadDiv").each(function () {
//         var unreadStatus = $(this).html();
//         console.log(unreadStatus);
//         if (unreadStatus == "true") {
//             $(this).closest(".messageChainContainer").find(".dashboardMessageRow").first().addClass("unreadMessageChain");
//         }
//         //unreadStatus = "";
//     });
//
//     var messageWith = "";
//     $(this).find(".messageWith").each(function () {
//         var sender = $(this).html();
//         //console.log(unreadStatus);
//         if (sender === thisUser) {
//
//         }
//         else {
//             messageWith = $(this).html();
//             return false;
//         }
//     });
//
//     $(this).find(".dashboardMessageRow").first().find(".messageWith").html(messageWith);
//
// });
//
// $(document.body).on('click', '.dashboardMessageRow', function () {
//     var messageChainID = $(this).find(".messageChainID").html();
//     window.location.href = "./../main/messages.gsp?initial=" + messageChainID;
// });
//
// function changeSubmissionStatus(submissionID, statusCode) {
//     $.ajax({
//         method: "POST",
//         url: "/Async/changeSubmissionStatus",
//         data: {
//             submissionID: submissionID,
//             statusCode: statusCode
//         }
//     })
//         .done(function (msg) {
//             //alert(msg);
//         });
// }
//
// function initializeSubmissionRows() {
//     var submissionRowsContainer = $('#submissionRows')
//     var submissionRowsHTML = ""
//     for (var i = 0; i < submissions.length; i++) {
//         var submissionObject = submissions[i]
//         submissionRowsHTML = submissionRowsHTML + submissionRowContainerHTML(submissionObject)
//     }
//
//     $(submissionRowsContainer).html(submissionRowsHTML)
// }


//Build underwriter dashboard rows HTML
// function getUnderwriterDashboardSubmissionRowHTML(submissionMap) {
//     var uwDashboardTableRows =
//     "<tr>" +
//     "<td>" + submissionMap.aimQuoteID + "</td>" +
//     "<td>" + submissionMap.namedInsured + "</td>" +
//     "<td>" + submissionMap.statusCode + "</td>" +
//     "<td>" + submissionMap.submitDate + "</td>" +
//     "<td>" + submissionMap.submittedBy + "</td>" +
//     "</tr>"
//
//     return uwDashboardTableRows
// }

// function getDashboardSubmission(){
//     try{
//         $.ajax({
//             method: "POST",
//             url: "/main/getDashboardSubmissionMap",
//             data: { submissionID:
//                     nameOfInsured:
//                     status:
//                     date:
//                     agent:
//             }
//         })
//             .done(function(msg) {
//                 //CONVERT THE MSG (WHICH IS A JSON STRING) INTO A JAVASCRIPT ARRAY
//                 var notificationArray = convertNotficationJSONToArray(msg)
//
//                 console.log(notificationArray)
//                 var htmlStringForNotificationArray = getNotificationListHTML(notificationArray)
//                 console.log(htmlStringForNotificationArray)
//                 updateNotificationListUI(htmlStringForNotificationArray)
//             });
//     }
//     catch(e){
//         console.log("Error retrieving Dashboard Submission Map")
//         console.log(e)
//     }
// }

// function convertUTCDateToLocalDate_messages(dateTimeString) {
//     var localTime = moment.utc(dateTimeString).toDate();
//     var momentObject = moment(localTime);
//     //var localTimeDateObject  = moment.utc(string).toDate();
//
//
//     var REFERENCE = moment(); // fixed just for testing, use moment();
//     var TODAY = REFERENCE.clone().startOf('day');
//     var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');
//
//     //if(momentObject.isSameOrAfter(TODAY, 'd')){
//     //    momentObject = moment(momentObject).format('h:mm A');
//     //    //$(this).html(momentObject);
//     //}
//     //else if(momentObject.isSame(TODAY, 'month')){
//     //    momentObject = moment(momentObject).format('MMM D');
//     //    //$(this).html(momentObject);
//     //}
//     //else{
//     //    momentObject = moment(momentObject).format('M/DD/YY');
//     //    //$(this).html(momentObject);
//     //}
//
//     momentObject = moment(momentObject).format('M/DD/YY');
//     return momentObject;
// }