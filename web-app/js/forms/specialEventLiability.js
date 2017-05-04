var riskChosen;
var attendance
var rate
var eventDays
var minimumPremium
var liquorRate
var CGLPremium
var brokerPremium
var liquorPremium
var totalPremiumTotal
var riskRate
// RATES BASED OFF RISK TYPE
var classOne = 0.25
var classTwo = 0.35
var classThree = 0.50
// RATES BASED OFF RISK TYPE

$(document).ready(function () {
// RATE BASED OFF RISK TYPE
    if ($("li.active").length > 0) {
        riskChosen = getRiskTypeChosen();
    }
    else {
        alert("bananas")
    }
    console.log(riskChosen)
    console.log(riskChosen)
    // alert (riskChosen)
    rate = riskTypeRate(riskRate);
    // alert ("RATE" + rate)

// MONEY FORMAT
    inputMoneyFormat();
// PHONE NUMBER FORMAT
    $(document.body).on('focus', '.phoneNumberMask' ,function(){
        $(".phoneNumberMask").mask("(999) 999-9999");
    });
// PERCENTAGE FORMAT
    $(document.body).on('focus', '.whatKindOfLiquorIsServed' ,function(){
        $(".whatKindOfLiquorIsServed").mask("9?99%", {reverse: true});
        $(".whatKindOfLiquorIsServed").on("blur", function() {
            var value = $(this).val().length == 1 ? $(this).val() + '%' : $(this).val();
            $(this).val( value );
        })
    });
// SQUARE FEET FORMAT
    $(document.body).on('focus', '#parkingSquareFoot' ,function(){
        $('#parkingSquareFoot').mask("*?******* sqft");
        $("#parkingSquareFoot").on("blur", function() {
            var value = $(this).val().length == 1 ? $(this).val() + '' : $(this).val();
            $(this).val( value );
        })
    });

// MIN MAX LIMITS
    $(document.body).on('change', 'input[name="howManyDaysIsTheEvent"]', function () {
        //alert();
        var value, min, max
        validate(value, min, max)
    });

// TOTAL PREMIUM COST !@#

// STATE RATE SELECT
    $("#selectState").change(function () {
        var state = this.value;
        liquorRate = setStateRate(state);
        // alert ("LIQUOR RATE:" + liquorRate)
    });
// COMMERCIAL GENERAL LIABILITY PREMIUM
    $(document.body).on('change', ".effectsTotalCGL", function () {
        attendance = $("#estimatedTotalAttendance").val()
        eventDays = $("#howManyDaysIsTheEvent").val()
        var attendanceValue = parseFloat(attendance)
        var eventDaysValue = parseFloat(eventDays)
        // var rateValue = parseFloat(rate)
        if (attendance.length > 0 && eventDays.length > 0) {
            var totalPremiumCGL
            // alert ("step one" + attendance)
            // alert ("step two" + eventDays)
            CGLPremium = getCGLPremium(totalPremiumCGL)
            $("#commercialGeneralLiabilityPremiumCost").html("$" + CGLPremium);

            $("#termsInsert").css('display', "");
            $("#endorseInsert").css('display', "");
        }
    });
// ALCOHOL PREMIUM
    $(document.body).on('change', "#alcoholSales", function () {
        var totalPremiumLiquor
        liquorPremium = getLiquorPremium(totalPremiumLiquor)
        $("#alcoholSalePremiumCost").html("$" + liquorPremium);
    });
// POLICY PREMIUM
    $(document.body).on('change', ".effectsTotalCGL", function () {
        var policyFee = 25
        $("#policyFeePremiumCost").html("$" + policyFee);
    });
// TOTAL SALES
    $(document.body).on('change', ".effectsTotalPremium", function () {
        attendance = $("#estimatedTotalAttendance").val()
        eventDays = $("#howManyDaysIsTheEvent").val()
        var attendanceValue = parseFloat(attendance)
        var eventDaysValue = parseFloat(eventDays)
        // var rateValue = parseFloat(rate)
        if (attendance.length > 0 && eventDays.length > 0) {
            var premium
            totalPremiumTotal = getTotalPremium(premium)
            $("#totalSalePremiumCost").html("$" + totalPremiumTotal);
        }
    });
// BROKER PREMIUM
    $(document.body).on('change', "#brokerFeeInput", function () {
        var brokerFeeTotal
        brokerPremium = getBrokerPremium(brokerFeeTotal)
        $("#brokerFeePremiumCost").html("$" + brokerPremium);
    });

// TOTAL PREMIUM COST !@#



// YES NO CHECK BOX HIDDEN QUESTIONS / TABLES

// CGL TABLE
    $(document.body).on('change', 'input[name="commercialGeneralLiabilityRequested?"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#commercialGeneralLiabilityRequestedContainer").css('display', "");
            $("#commercialGeneralLiabilityRequestedExplain").css('display', "");
            $(".tableCGL").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $("#commercialGeneralLiabilityRequestedContainer").css('display', "none");
            $("#commercialGeneralLiabilityRequestedExplain").css('display', "none");
            $(".tableCGL").removeClass("showReviewTable");
        }
    });
// WORK COMP TABLE / ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="workCompCoverageRequested"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#workCompCoverageRequestedContainer").css('display', "");
            $("#workCompCoverageRequestedExplain").css('display', "");
            $(".tableWC").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $("#workCompCoverageRequestedContainer").css('display', "none");
            $("#workCompCoverageRequestedExplain").css('display', "none");
            $(".tableWC").removeClass("showReviewTable");
        }
    });
// AUTO LIABILITY TABLE / ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="autoLiability"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $(".costRentedVehiclesContainer").css('display', "");
            $(".costRentedVehiclesExplain").css('display', "");
            $(".tableNOAL").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $(".costRentedVehiclesContainer").css('display', "none");
            $(".costRentedVehiclesExplain").css('display', "none");
            $(".tableNOAL").removeClass("showReviewTable");
        }
    });
// UMBRELLA TABLE
    $(document.body).on('change', 'input[name="umbrellaLimitRequested"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#umbrellaLimitRequestedContainer").css('display', "");
            $("#umbrellaLimitRequestedExplain").css('display', "");
            $(".tableCUMB").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $("#umbrellaLimitRequestedContainer").css('display', "none");
            $("#umbrellaLimitRequestedExplain").css('display', "none");
            $(".tableCUMB").removeClass("showReviewTable");
        }
    });
// ALCOHOL TABLE / ADDITIONAL HIDDEN QUESTION / PREMIUMS
    $(document.body).on('change', 'input[name="willAlcoholBeServed"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $(".alcoholSaleContainer").css('display', "");
            $(".alcoholSaleExplain").css('display', "");

            $(".alcoholSaleTableContainer").css('display', "");
            $(".alcoholSaleTableExplain").css('display', "")
            $(".tableAlcohol").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $(".alcoholSaleContainer").css('display', "none");
            $(".alcoholSaleExplain").css('display', "none");

            $(".alcoholSaleTableContainer").css('display', "none");
            $(".alcoholSaleTableExplain").css('display', "none");
            $(".tableAlcohol").removeClass("showReviewTable");
        }
    });
// BROKER FEE HIDDEN PREMIUM
    $(document.body).on('change', '.brokerFeeInput', function () {
        //alert();
        var brokerFeeCostTemp = $(".brokerFeeInput").val()
        var brokerFeeCost = brokerFeeCostTemp.replace('$','').replace(',', '')
        var brokerFeeCostValue = parseFloat(brokerFeeCost)

        if (brokerFeeCostValue > 0){
            $("#brokerFeePremiumContainer").css('display', "");
            $("#brokerFeePremiumExplain").css('display', "");
        }
        else if (brokerFeeCostValue <= 0){
            $("#brokerFeePremiumContainer").css('display', "none");
            $("#brokerFeePremiumExplain").css('display', "none");
        }
    });


// INSURED CONTACT TABLE / CONTAINER
    $(document.body).on('change', 'input[name="contactRep"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#insuredContactInformationContainer").css('display', "");
            $("#insuredContactInformationExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#insuredContactInformationContainer").css('display', "none");
            $("#insuredContactInformationExplain").css('display', "none");
        }
    });
// EQUIPMENT TABLE / ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="equipmentOwnedRented"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#equipmentOwnedRentedContainer").css('display', "");
            $("#equipmentOwnedRentedExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#equipmentOwnedRentedContainer").css('display', "none");
            $("#equipmentOwnedRentedExplain").css('display', "none");
        }
    });
// OVERNIGHT EVENTS ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="overnight"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#overnightContainer").css('display', "");
            $("#overnightExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#overnightContainer").css('display', "none");
            $("#overnightExplain").css('display', "none");
        }
    });
// PYRO ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', '#pyrotechnicsCheckbox' ,function(){
        if($("#pyrotechnicsCheckbox").is(':checked')) {
            $('#pyrotechnicsAttachContainer').css("display", "");
        }
        else{
            $('#pyrotechnicsAttachContainer').css("display", "none");
        }
    });
// STUNTS HAZARDOUS EVENTS ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', '#stuntsHazardousCheckbox' ,function(){
        if($("#stuntsHazardousCheckbox").is(':checked')) {
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "");
            $('#stuntCoordinatorName').css("display", "");
            $('#participantsSigningWaivers').css("display", "");
        }
        else{
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "none");
            $('#stuntCoordinatorName').css("display", "none");
            $('#participantsSigningWaivers').css("display", "none");

        }
    });
// INSURANCE BEEN CANCELLED ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="insuranceCancelled"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#insuranceCancelledContainer").css('display', "");
            $("#insuranceCancelledExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#insuranceCancelledContainer").css('display', "none");
            $("#insuranceCancelledExplain").css('display', "none");
        }
    });
// PARKING ADDITIONAL QUESTION
    $(document.body).on('change', 'input[name="responsibleForParking"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#parkingContainer").css('display', "");
            $("#parkingExplain").css('display', "");
            $(".parking").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#parkingContainer").css('display', "none");
            $("#parkingExplain").css('display', "none");
            $(".parking").removeClass("showReview");
        }
    });
// SECURITY ADDITIONAL QUESTION
    $('#securityType').change(function() {
    // $(document.body).on('change', '#securityType' ,function () {
    var option = $(this).find('option:selected').val();
    // alert(option);
        if  (option == "Unarmed Security" ||
            option == "Armed Security" ||
            option == "Other Security") {
            $("#securityContainer").css('display', "");
            $("#securityExplain").css('display', "");
            $(".securityGuards").addClass("showReview");
        }
        if  (option == "invalid") {
            $("#securityContainer").css('display', "none");
            $("#securityExplain").css('display', "none");
            $(".securityGuards").removeClass("showReview");
        }
    });
// EVENT OUTDOORS ADDITIONAL QUESTION
    $(document.body).on('change', 'input[name="willEventBeHeldOutdoors"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#eventOutdoorContainer").css('display', "");
            $("#eventOutdoorExplain").css('display', "");
            $(".eventOutdoor").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#eventOutdoorContainer").css('display', "none");
            $("#eventOutdoorExplain").css('display', "none");
            $(".eventOutdoor").removeClass("showReview");
        }
    });
// FENCED ADDTIONAL QUESTION
    $(document.body).on('change', 'input[name="facilityFenced"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#fenceTypeContainer").css('display', "");
            $("#fenceTypeExplain").css('display', "");
            $(".facilityFence").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#fenceTypeContainer").css('display', "none");
            $("#fenceTypeExplain").css('display', "none");
            $(".facilityFence").removeClass("showReview");
        }
    });
// BODIES OF WATER ADDITIONAL QUESTION
    $(document.body).on('change', 'input[name="bodiesOfWater"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#waterContainer").css('display', "");
            $("#waterExplain").css('display', "");
            $(".water").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#waterContainer").css('display', "none");
            $("#waterExplain").css('display', "none");
            $(".water").removeClass("showReview");
        }
    });
// WATER HAZARD ADDITIONAL QUESTION
    $(document.body).on('change', 'input[name="waterHazardFenced"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#waterHazardNotFencedContainer").css('display', "none");
            $("#waterHazardNotFencedExplain").css('display', "none");
            $(".waterHazardNotFenced").removeClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#waterHazardNotFencedContainer").css('display', "");
            $("#waterHazardNotFencedExplain").css('display', "");
            $(".waterHazardNotFenced").addClass("showReview");
        }
    });
// RISK HAZARD QUESTION
    $(document.body).on('change', '.riskHazard' ,function(){
        if($(".riskHazard").is(':checked')) {
            alert("Due to the risk hazards of this event, the indication provided in the previous page is no longer valid. Please proceed with entering all the information requested following this notification and an underwriter will be contacting you shortly. Please note, we may not be able to offer terms based on additional information received")
        }
    });






// ALCOHOL TYPE PERCENTAGE
    $(document.body).on('change', ".whatKindOfLiquorIsServed", function () {
        beer = $("#whatKindOfLiquorIsServedBeer").val()
            wine = $("#whatKindOfLiquorIsServedWine").val()
            fullBar = $("#whatKindOfLiquorIsServedFullBar").val()
            var totalPercent
        if (beer.length > 0 && wine.length > 0 && fullBar.length > 0) {
            var alcoholTotalPercent = 0;

            alcoholTotalPercent = alcoholPercentage(totalPercent)
            if (alcoholTotalPercent == 100){
            }
            else if (alcoholTotalPercent != 100 ) {
                alert("please enter values that add up to 100%")
                $("#whatKindOfLiquorIsServedBeer").val("")
                $("#whatKindOfLiquorIsServedWine").val("")
                $("#whatKindOfLiquorIsServedFullBar").val("")
            }
        }
        else if($(this).val().length > 0 ){
            var alcoholTotalPercent = alcoholPercentage(totalPercent)
            if (alcoholTotalPercent == 100) {
                // alert("good")
                if ($("#whatKindOfLiquorIsServedBeer").val().length == 0 ){
                    $("#whatKindOfLiquorIsServedBeer").val('00%')
                };
                if ($("#whatKindOfLiquorIsServedWine").val().length == 0 ){
                    $("#whatKindOfLiquorIsServedWine").val('00%')
                };
                if ($("#whatKindOfLiquorIsServedFullBar").val().length == 0 ){
                    $("#whatKindOfLiquorIsServedFullBar").val('00%')
                    // $("#whatKindOfLiquorIsServedFullBar").html().replace('','0')
                };
            }
        }
    });



// YES NO CHECK BOX HIDDEN QUESTIONS / TABLES
});



// FUNCTIONS
function setStateRate(state){
    var lrate = 0;
    if (state ==  "DE" ||
        state ==   "KS" ||
        state ==   "MD" ||
        state ==   "NV" ||
        state ==   "SD" ||
        state ==   "VA") {
        lrate = 8
    }
    else if (state == "AR" ||
        state ==   "CA" ||
        state ==   "CO" ||
        state ==   "GA" ||
        state ==   "ID" ||
        state ==   "IL" ||
        state ==   "KY" ||
        state ==   "LA" ||
        state ==   "ME" ||
        state ==   "MN" ||
        state ==   "MS" ||
        state ==   "MO" ||
        state ==   "NE" ||
        state ==   "NJ" ||
        state ==   "OH" ||
        state ==   "OR" ||
        state ==   "TN") {
        lrate = 12
    }
    else if (state ==  "AZ" ||
        state ==   "IN" ||
        state ==   "MA" ||
        state ==   "MI" ||
        state ==   "MT" ||
        state ==   "NM" ||
        state ==   "NY" ||
        state ==   "NC" ||
        state ==   "ND" ||
        state ==   "OK" ||
        state ==   "RI" ||
        state ==   "SC" ||
        state ==   "TX" ||
        state ==   "UT") {
        lrate = 14
    }
    else if (state ==  "DC" ||
        state ==   "IA" ||
        state ==   "PA" ||
        state ==   "WV") {
        lrate = 15
    }
    else if (state ==  "AL" ||
        state ==   "VT") {
        lrate = 50
    }
    else if (state ==  "AK" ||
        state ==   "CT" ||
        state ==   "DC" ||
        state ==   "FL" ||
        state ==   "NH" ||
        state ==   "WA" ||
        state ==   "HI") {
        alert ("STATE NOT ELIGIBLE FOR LIQUOR COVERAGE")
    }

    return lrate;


}
function riskTypeRate(riskRate) {
    var riskClass

    if (riskChosen === "Anniversary Parties" ||
        riskChosen === "Antique Shows" ||
        riskChosen === "Art Festivals and Shows" ||
        riskChosen === "Auctions" ||
        riskChosen === "Auto Shows-Auto Static Only" ||
        riskChosen === "Award Presentations" ||
        riskChosen === "Baby Shower" ||
        riskChosen === "Ballet or Other Classical Dance Shows Balloon Artist" ||
        riskChosen === "Balloon Artist" ||
        riskChosen === "Banquets" ||
        riskChosen === "Baptism" ||
        riskChosen === "Bar Mitzvahs / Bat Mitzvahs" ||
        riskChosen === "Bazaars" ||
        riskChosen === "Beauty Pageants" ||
        riskChosen === "Belly Dancer" ||
        riskChosen === "Birthday Parties" ||
        riskChosen === "Boat Shows (Dry Dock only)" ||
        riskChosen === "Body Building Contests" ||
        riskChosen === "Book Signing" ||
        riskChosen === "Bridal Showers" ||
        riskChosen === "Business Meetings and Shows" ||
        riskChosen === "Business Parties" ||
        riskChosen === "Camera Shows" ||
        riskChosen === "Card Shows" ||
        riskChosen === "Caricature Sketching" ||
        riskChosen === "Carolers" ||
        riskChosen === "Cartoonist" ||
        riskChosen === "Casino Nights" ||
        riskChosen === "Chamber of Commerce Events" ||
        riskChosen === "Charity Benefits, Dances, Auctions, or Sales" ||
        riskChosen === "Choirs - indoor" ||
        riskChosen === "Church Services or Meetings" ||
        riskChosen === "Civic Club Meetings" ||
        riskChosen === "Classic Dance Shows" ||
        riskChosen === "Computer Shows" ||
        riskChosen === "Concerts - Celtic Music" ||
        riskChosen === "Concerts - Chamber Music" ||
        riskChosen === "Concerts - Classical Music - Indoors" ||
        riskChosen === "Concerts - Holiday Music" ||
        riskChosen === "Concerts - Instrumental" ||
        riskChosen === "Consumer Shows" ||
        riskChosen === "Conventions - Indoors" ||
        riskChosen === "Craft Shows" ||
        riskChosen === "Dance Competitions" ||
        riskChosen === "Dance Recital" ||
        riskChosen === "Debutant Balls" ||
        riskChosen === "Debuts" ||
        riskChosen === "Drill Team Exhibitions" ||
        riskChosen === "Educational Exhibitions" ||
        riskChosen === "Electronics Conventions" ||
        riskChosen === "Face Painters" ||
        riskChosen === "Fashion Shows" ||
        riskChosen === "Flower and Garden Shows" ||
        riskChosen === "Fund Raising Dinner" ||
        riskChosen === "Funeral Service" ||
        riskChosen === "Graduations" ||
        riskChosen === "Harvest Festivals - No Farm Implements or Equipment" ||
        riskChosen === "Holiday Events & Parties / Gift Exchanges" ||
        riskChosen === "Home Shows" ||
        riskChosen === "Jazz and Jam Concerts - Indoors" ||
        riskChosen === "Jewelry Maker" ||
        riskChosen === "Job Fairs Indoor" ||
        riskChosen === "Ladies Club Events" ||
        riskChosen === "Lectures" ||
        riskChosen === "Luncheons" ||
        riskChosen === "Meetings - Indoors" ||
        riskChosen === "Mime" ||
        riskChosen === "Mobile Home Shows" ||
        riskChosen === "Pageants" ||
        riskChosen === "Poetry Reading" ||
        riskChosen === "Professional and Amateur Association Meetings" ||
        riskChosen === "Puppeteer" ||
        riskChosen === "Quinceanera" ||
        riskChosen === "Recitals" ||
        riskChosen === "Reunions Indoors" ||
        riskChosen === "RV Shows" ||
        riskChosen === "Scouting Jamborees - No Overnight Camping" ||
        riskChosen === "Seances" ||
        riskChosen === "Seminars" ||
        riskChosen === "Social Receptions - Indoors" ||
        riskChosen === "Speaking Engagements" ||
        riskChosen === "Store Openings" ||
        riskChosen === "Story Teller" ||
        riskChosen === "Symphony Concerts" ||
        riskChosen === "Teleconferences" ||
        riskChosen === "Telethons" ||
        riskChosen === "Trade Shows - Indoors" ||
        riskChosen === "Vacation Shows" ||
        riskChosen === "Ventriloquist" ||
        riskChosen === "Voter Registration" ||
        riskChosen === "Weddings and Wedding Receptions"
    ){
        riskClass = classOne;
        // alert(riskClass)
    }
    else if (riskChosen === "Bingo Games" ||
        riskChosen === "Card Games - Blackjack" ||
        riskChosen === "Card Games - Poker" ||
        riskChosen === "Carnivals - School Events with No Mechanical Rides" ||
        riskChosen === "Chess Tournament" ||
        riskChosen === "Choirs - Outdoor" ||
        riskChosen === "Christmas Tree Lighting" ||
        riskChosen === "Clowns - No Motorized Vehicles" ||
        riskChosen === "Comedians" ||
        riskChosen === "Concerts - 50's, 60's, 70's or 80's Music" ||
        riskChosen === "Concerts - Blues Music" ||
        riskChosen === "Concerts - Classical Music - Outdoors" ||
        riskChosen === "Concerts - Country Music" ||
        riskChosen === "Concerts - Folk Music" ||
        riskChosen === "Concerts - Funk Music" ||
        riskChosen === "Concerts - Motown" ||
        riskChosen === "Concerts Soul Music" ||
        riskChosen === "Dog, Cat, Bird & Other Domestic Animal Show / Event" ||
        riskChosen === "Easter Egg Hunt" ||
        riskChosen === "Festival and Cultural Events - Indoors" ||
        riskChosen === "Fishing Events" ||
        riskChosen === "Impersonator - Celebrity or Holiday Character" ||
        riskChosen === "Impressionist" ||
        riskChosen === "Jazz and Jam Concerts - Outdoors" ||
        riskChosen === "Job Fairs Outdoors" ||
        riskChosen === "Jugglers (No Pyro)" ||
        riskChosen === "Magician" ||
        riskChosen === "Mariachi Band" ||
        riskChosen === "Math Tournament" ||
        riskChosen === "Meetings - Outdoors" ||
        riskChosen === "Menorah Lightning" ||
        riskChosen === "Picnics - No Pools or Lakes" ||
        riskChosen === "Reunions Outdoors" ||
        riskChosen === "School Band Competitions or Events" ||
        riskChosen === "Soap Box Derbies" ||
        riskChosen === "Social Receptions - Outdoors" ||
        riskChosen === "Trade Shows - Outdoors" ||
        riskChosen === "Union Meetings" ||
        riskChosen === "Video Game Contests"
    ) {
        riskClass = classTwo;
        // alert(riskClass)
    }
    else if (riskChosen === "Amateur Rodeo and Roping Events" ||
        riskChosen === "Baseball - Amateur" ||
        riskChosen === "Basketball - Amateur" ||
        riskChosen === "Bicycling - No Racing / Off-road" ||
        riskChosen === "Block Parties / Street Closures / Street Fairs - Under 5000 Spectators" ||
        riskChosen === "Bowling Tournaments" ||
        riskChosen === "Boxing, Wrestling, Hockey and Football Games - Amateur" ||
        riskChosen === "Casino and Lounge Shows" ||
        riskChosen === "Cheerleading Events / Competitions (no Pyramids)" ||
        riskChosen === "Comedy Shows" ||
        riskChosen === "Company or Corporate Retreats" ||
        riskChosen === "Concerts - Pop Cover Bands" ||
        riskChosen === "Cornfield Mazes" ||
        riskChosen === "Country & Western Events - No Rodeos or Rides" ||
        riskChosen === "Country Festivals and Fairs - No Rides" ||
        riskChosen === "Festival and Cultural Events - Outdoors" ||
        riskChosen === "Film Screenings" ||
        riskChosen === "Film Showings" ||
        riskChosen === "Golf Tournament - Daytime" ||
        riskChosen === "Grad Night" ||
        riskChosen === "Gymnastic Competitions - Spectators Only" ||
        riskChosen === "Halloween - Costume Contests" ||
        riskChosen === "Ice Skating Shows" ||
        riskChosen === "Junior Athletic Games" ||
        riskChosen === "Karate Meets" ||
        riskChosen === "Lacrosse" ||
        riskChosen === "Laser Tag (Indoors)" ||
        riskChosen === "Livestock Shows" ||
        riskChosen === "Magic Shows" ||
        riskChosen === "Marathons (Walking & Running)" ||
        riskChosen === "Marathons / Walkathons" ||
        riskChosen === "Mobile Homes / RV Shows - Professionally Managed" ||
        riskChosen === "Movie Release Party" ||
        riskChosen === "New Years Party (Private / by invite only)" ||
        riskChosen === "Old Timer Events" ||
        riskChosen === "Parades - Under 5000 Spectators" ||
        riskChosen === "Play Readings" ||
        riskChosen === "Plays" ||
        riskChosen === "Pool and / or Billiards Tournaments" ||
        riskChosen === "Proms" ||
        riskChosen === "Rugby" ||
        riskChosen === "Soccer" ||
        riskChosen === "Softball - Amateur" ||
        riskChosen === "Sporting Events - Indoors - Non-Professional" ||
        riskChosen === "Talent Show (no rap, hip hop, heavy metal shows)" ||
        riskChosen === "Tap Dancing" ||
        riskChosen === "Tennis Tournament" ||
        riskChosen === "Theatrical Stage Performances" ||
        riskChosen === "Volleyball - Amateur" ||
        riskChosen === "Wagon / Hayrides" ||
        riskChosen === "Walking / Hiking Tour" ||
        riskChosen === "Wine Tasting"
    ) {
        riskClass = classThree;
        // alert(riskClass)
    }
    return riskClass;
}
function inputMoneyFormat() {
// MONEY FORMAT
    $('.alcoholSales').maskMoney({prefix: '$', precision: "0"});
    $('.equipmentLimit').maskMoney({prefix: '$', precision: "0"});
    $('.brokerFeeInput').maskMoney({prefix: '$', precision: "0"});
    $('.costVehicles').maskMoney({prefix: '$', precision: "0"});
    $('.totalReceipts').maskMoney({prefix: '$', precision: "0"});
    $('.totalPayroll').maskMoney({prefix: '$', precision: "0"});
};
function getCGLPremium(totalPremiumCGL) {
    var totalPremium
    var totalPremium5Below
    var totalPremium6Above

// MINIMUM PREMIUMS UP TO 5 DAYS
    var minimum5Premium100Class1 = 175
    var minimum5Premium100Class2 = 250
    var minimum5Premium100Class3 = 325

    var minimum5Premium500Class1 = 225
    var minimum5Premium500Class2 = 325
    var minimum5Premium500Class3 = 400

    var minimum5Premium1500Class1 = 325
    var minimum5Premium1500Class2 = 425
    var minimum5Premium1500Class3 = 525

    var minimum5Premium3000Class1 = 450
    var minimum5Premium3000Class2 = 550
    var minimum5Premium3000Class3 = 650

    var minimum5Premium5000Class1 = 575
    var minimum5Premium5000Class2 = 675
    var minimum5Premium5000Class3 = 775

    var minimum5Premium5001Class1 = 700
    var minimum5Premium5001Class2 = 800
    var minimum5Premium5001Class3 = 900
// MINIMUM PREMIUMS UP TO 5 DAYS

// MINIMUM PREMIUMS 6 DAYS AND MORE
    var minimum6Premium10Class1 = 250
    var minimum6Premium10Class2 = 250
    var minimum6Premium10Class3 = 325

    var minimum6Premium20Class1 = 500
    var minimum6Premium20Class2 = 500
    var minimum6Premium20Class3 = 500

    var minimum6Premium31Class1 = 750
    var minimum6Premium31Class2 = 750
    var minimum6Premium31Class3 = 750

    var minimum6Premium45Class1 = 800
    var minimum6Premium45Class2 = 800
    var minimum6Premium45Class3 = 800

    var minimum6Premium60Class1 = 850
    var minimum6Premium60Class2 = 850
    var minimum6Premium60Class3 = 850

    var minimum6Premium75Class1 = 900
    var minimum6Premium75Class2 = 900
    var minimum6Premium75Class3 = 900

    var minimum6Premium90Class1 = 950
    var minimum6Premium90Class2 = 950
    var minimum6Premium90Class3 = 950
// MINIMUM PREMIUM 6 DAYS AND MORE



    attendance = $("#estimatedTotalAttendance").val()
    eventDays = $("#howManyDaysIsTheEvent").val()

    var attendanceValue = parseFloat(attendance)
    var eventDaysValue = parseFloat(eventDays)
    var rateValue = parseFloat(rate)

    if (attendance.length > 0 && eventDays.length > 0) {

        if (eventDaysValue <= 5 && attendanceValue > 0) {

            totalPremium5Below = attendanceValue * rateValue
            // alert("First: " + totalPremium5Below)
            // alert("Second: " + attendanceValue)
            // alert("Third: " + rateValue)
            if (attendanceValue >= 1 && attendanceValue <= 100) {
                if (rate = classOne) {
                    minimumPremium = minimum5Premium100Class1
                    // alert("SECOND minimum5Prem" + minimum5Premium100Class1)
                    // alert("second: " + totalPremium5Below)
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                        // alert("THIRD totalPrem" + totalPremium)
                        // alert ("FORTH minimumPre"+ minimumPremium)
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum5Premium100Class2
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum5Premium100Class3
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
            }
            else if (attendanceValue >= 101 && attendanceValue <= 500) {
                if (rate = classOne) {
                    minimumPremium = minimum5Premium500Class1
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum5Premium500Class2
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum5Premium500Class3
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
            }
            else if (attendanceValue >= 501 && attendanceValue <= 1500) {
                if (rate = classOne) {
                    minimumPremium = minimum5Premium1500Class1
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum5Premium1500Class2
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum5Premium1500Class3
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
            }
            else if (attendanceValue >= 1501 && attendanceValue <= 3000) {
                if (rate = classOne) {
                    minimumPremium = minimum5Premium3000Class1
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum5Premium3000Class2
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum5Premium3000Class3
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
            }
            else if (attendanceValue >= 3001 && attendanceValue <= 5000) {
                if (rate = classOne) {
                    minimumPremium = minimum5Premium5000Class1
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum5Premium5000Class2
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum5Premium5000Class3
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
            }
            else if (attendanceValue >= 5001) {
                if (rate = classOne) {
                    minimumPremium = minimum5Premium5001Class1
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum5Premium5001Class2
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum5Premium5001Class3
                    if (minimumPremium < totalPremium5Below) {
                        totalPremium = totalPremium5Below
                    }
                    else if (minimumPremium > totalPremium5Below) {
                        totalPremium = minimumPremium
                    }
                }
            }

        }
        else if (eventDaysValue > 5 && attendanceValue > 0) {
            totalPremium6Above = eventDaysValue * rateValue

            if (eventDaysValue >= 6 && eventDaysValue <= 10) {
                if (rate = classOne) {
                    minimumPremium = minimum6Premium10Class1
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum6Premium10Class2
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum6Premium10Class3
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
            }
            else if (eventDaysValue >= 11 && eventDaysValue <= 20) {
                if (rate = classOne) {
                    minimumPremium = minimum6Premium20Class1
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum6Premium20Class2
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum6Premium20Class3
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
            }
            else if (eventDaysValue >= 21 && eventDaysValue <= 31) {
                if (rate = classOne) {
                    minimumPremium = minimum6Premium31Class1
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum6Premium31Class2
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum6Premium31Class3
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
            }
            else if (eventDaysValue >= 32 && eventDaysValue <= 45) {
                if (rate = classOne) {
                    minimumPremium = minimum6Premium45Class1
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum6Premium45Class2
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum6Premium45Class3
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
            }

            else if (eventDaysValue >= 46 && eventDaysValue <= 60) {
                if (rate = classOne) {
                    minimumPremium = minimum6Premium60Class1
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum6Premium60Class2
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum6Premium60Class3
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
            }

            else if (eventDaysValue >= 61 && eventDaysValue <= 75) {
                if (rate = classOne) {
                    minimumPremium = minimum6Premium75Class1
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum6Premium75Class2
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum6Premium75Class3
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
            }

            else if (eventDaysValue >= 76 && eventDaysValue <= 90) {
                if (rate = classOne) {
                    minimumPremium = minimum6Premium90Class1
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classTwo) {
                    minimumPremium = minimum6Premium90Class2
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
                else if (rate = classThree) {
                    minimumPremium = minimum6Premium90Class3
                    if (minimumPremium < totalPremium6Above) {
                        totalPremium = totalPremium6Above
                    }
                    else if (minimumPremium > totalPremium6Above) {
                        totalPremium = minimumPremium
                    }
                }
            }
        }
        return totalPremium;
    }
}
function getBrokerPremium(brokerFeeTotal) {
    var brokerFee
    var tempBrokerFee
    tempBrokerFee = $("#brokerFeeInput").val()
    brokerFee = tempBrokerFee.replace('$', '').replace(',', '')
    if (brokerFee.length > 0) {
        var brokerFeeValue = parseFloat(brokerFee)
    }
    return brokerFeeValue
}
function getLiquorPremium(totalPremiumLiquor){

// ALCOHOL PREMIUMS
// $25,000 and below
    var liquorMinimum8Below25000 = 100
    var liquorMinimum12Below25000 = 375
    var liquorMinimum14Below25000 = 550
    var liquorMinimum15Below25000 = 750
    var liquorMinimum50Below25000 = 1000

// 25,000 and above
    var liquorMinimum8Above25000 = 100
    var liquorMinimum12Above25000 = 750
    var liquorMinimum14Above25000 = 800
    var liquorMinimum15Above25000 = 900
    var liquorMinimum50Above25000 = 2500

    var liquorRatePremium
    var liquorSale
    var liquorTotalPremium
    var liquorMinimumPremium
    var liquorTotalPremiumBelow25000
    var liquorTotalPremiumAbove25000
// ALCOHOL PREMIUMS


    var tempLiquorSale = $("#alcoholSales").val()
    eventDays = $("#howManyDaysIsTheEvent").val()
    attendance = $("#estimatedTotalAttendance").val()

    // alert("Step2" + liquorSale) removes $ from val
    liquorSale = tempLiquorSale.replace('$','').replace(/,/g , '')

    //this removes the first comma, but does not remove more than one
    // liquorSale = tempLiquorSale.replace('$','').replace(',', '')
    
    // alert (liquorSale)

    var liquorSaleValue = parseFloat(liquorSale)
    var eventDaysValue = parseFloat(eventDays)
    var attendanceValue = parseFloat(attendance)

    // alert("liquorSaleValue" + liquorSaleValue)
    // alert("eventDatsValue" + eventDaysValue)
    // alert ("LiqourRate" + liquorRate)

    if (liquorSaleValue > 0 && liquorSaleValue < 25000 && eventDaysValue > 0 && eventDaysValue <= 5) {

        if (liquorRate == 8) {
            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum8Below25000
            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }

        else if (liquorRate == 12) {

            // alert ("LIQUORRATE" + liquorRate)
            // alert ("LIQUORSALEVALUE" + liquorSaleValue)

            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum12Below25000

            // alert ("LIQUORPREMIUM" + liquorRatePremium)

            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }
        else if (liquorRate == 14) {
            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum14Below25000
            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }
        else if (liquorRate == 15) {
            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum15Below25000
            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }
        else if (liquorRate == 50) {
            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum50Below25000
            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }
    }
    else if (liquorSaleValue > 0 && eventDaysValue > 0) {

        if (liquorRate == 8) {
            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum8Above25000
            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }

        else if (liquorRate == 12) {
            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum12Above25000
            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }
        else if (liquorRate == 14) {
            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum14Above25000
            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }
        else if (liquorRate == 15) {
            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum15Above25000
            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }
        else if (liquorRate == 50) {
            liquorRatePremium = liquorRate * liquorSaleValue / 1000
            liquorMinimumPremium = liquorMinimum50Above25000
            if (liquorMinimumPremium < liquorRatePremium) {
                liquorTotalPremium = liquorRatePremium
            }
            else if (liquorMinimumPremium > liquorRatePremium) {
                liquorTotalPremium = liquorMinimumPremium
            }
        }
        // alert("5Step" + liquorMinimumPremium)
        // alert("6Step" + liquorRatePremium)
        // alert("7Step" + liquorTotalPremium)
        $("#alcoholSalePremiumCost").html("$" + liquorTotalPremium);
    }
    return liquorTotalPremium
}
function getTotalPremium(premium){

    totalPremium = 0;

    $(".effectsTotal").each(function() {
        if($(this).html().length > 0 ){
            var tempVal = parseFloat($(this).html().replace('$',''));
            // var totalPremiumValue = parseFloat $(this)
            totalPremium = totalPremium + tempVal
            // alert (totalPremium)
        }

    });
    return totalPremium
}
function validate(value, min, max){
    // MIN MAX LIMIT FOR EVENT DAYS
    if(parseInt(value) < min || isNaN(parseInt(value))) {
        return "";
    }
    else if(parseInt(value) > max) {
        alert("Please contact your underwriter if your event exceeds 90 days");
        return 90;
    }
    else return value;
}
function alcoholPercentage(totalPercent){

    var total = 0;

    $(".whatKindOfLiquorIsServed").each(function() {
        if($(this).val().length > 0 ){
            var tempVal = ($(this).val())
            var tempVal = parseFloat(tempVal);
            // alert(tempVal)
            // var totalPremiumValue = parseFloat $(this)
            total = total + tempVal
            // alert (total)
        }
    });
    return total
    // alert(total)
}
