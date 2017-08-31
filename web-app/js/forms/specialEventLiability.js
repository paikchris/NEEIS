var riskChosen,
    minimumPremium,
    ratedPremium,
    brokerPremium,
    riskRate,
// GLOBAL VARIABLE USED IN newSubmission
    attendance,
    rate,
    totalPremium,
    eventDays,
    liquorMinimumPremium, // Liquor Minimum Premium
    liquorTotalPremium, // Liquor Premium
    liquorRate, // Liquor Rate
    liquorRatePremium, //Liquor Rated Premium
    temptermLenghtDays,
    termLenghtDays,
    limit,
    miscMinimum,
// RATES BASED OFF RISK TYPE
    classOne = 0.25,
    classTwo = 0.35,
    classThree = 0.50;

$(document).ready(function () {
    if ($("li.active").length > 0) {
        riskChosen = getRiskTypeChosen();
    }
    else {
    }
    console.log(riskChosen)
    console.log(riskChosen)
    rate = riskTypeRate(riskRate);

// MONEY FORMAT
    inputMoneyFormat();
// PHONE NUMBER FORMAT
    $(document.body).on('focus', '.phoneNumberMask', function () {
        $(".phoneNumberMask").mask("(999) 999-9999");
    });
// PERCENTAGE FORMAT
    $(document.body).on('focus', '.whatKindOfLiquorIsServed', function () {
        $(".whatKindOfLiquorIsServed").mask("9?99%", {reverse: true});
        $(".whatKindOfLiquorIsServed").on("blur", function () {
            var value = $(this).val().length == 1 ? $(this).val() + '%' : $(this).val();
            $(this).val(value);
        })
    });
// SQUARE FEET FORMAT
    $(document.body).on('focus', '#parkingSquareFoot', function () {
        $('#parkingSquareFoot').mask("*?******* sqft");
        $("#parkingSquareFoot").on("blur", function () {
            var value = $(this).val().length == 1 ? $(this).val() + '' : $(this).val();
            $(this).val(value);
        })
    });
// MIN MAX LIMITS EVENT DAYS
    $(document.body).on('change', 'input[name="howManyDaysIsTheEvent"]', function () {
        //alert();
        var value, min, max
        validate(value, min, max)
    });

// TOTAL PREMIUM COST
// STATE RATE SELECT FOR LIQUOR RATE
    $("#selectState").change(function () {
        var state = this.value;
        liquorRate = getLiquorRate(state);
    });
// COMMERCIAL GENERAL LIABILITY PREMIUM
    $(document.body).on('change', ".effectsTotalCGL", function () {
        var attendance = $("#estimatedTotalAttendance").val(),
            eventDays = $("#howManyDaysIsTheEvent").val(),
            CGLPremium;
        if (attendance.length > 0 && eventDays.length > 0) {
            CGLPremium = checkCGLPremiumTermLength(CGLPremium)
            $(".commercialGeneralLiabilityPremiumCost").html("$" + CGLPremium);
            $("#policyFeePremiumCost").html("$" + 25);
            $("#termsInsert").css('display', "");
            $("#endorseInsert").css('display', "");
            getFinalTotalPremium()
        }
    });
// ALCOHOL PREMIUM
    $(document.body).on('change', "#alcoholSales", function () {
        var liquorTotalPremium
        liquorTotalPremium = getLiquorPremium(liquorTotalPremium)
        $("#alcoholSalePremiumCost").html("$" + liquorTotalPremium);
        $(".effectsTotalPremiumPlaceholder").addClass("effectsTotalPremium");
        $(".premDistributionInsertIfUsed").addClass("premDistributionInsert");
        getFinalTotalPremium()
    });
// ALCOHOL TYPE PERCENTAGE
    $(document.body).on('change', ".whatKindOfLiquorIsServed", function () {
        var beer = $("#whatKindOfLiquorIsServedBeer").val(),
            wine = $("#whatKindOfLiquorIsServedWine").val(),
            fullBar = $("#whatKindOfLiquorIsServedFullBar").val(),
            totalPercent,
            alcoholTotalPercent;

        if (beer.length > 0 && wine.length > 0 && fullBar.length > 0) {
            alcoholTotalPercent = 0;
            alcoholTotalPercent = alcoholPercentage(totalPercent)
            if (alcoholTotalPercent == 100) {
            }
            else if (alcoholTotalPercent != 100) {
                alert("please enter values that add up to 100%")
                $("#whatKindOfLiquorIsServedBeer").val("")
                $("#whatKindOfLiquorIsServedWine").val("")
                $("#whatKindOfLiquorIsServedFullBar").val("")
            }
        }
        else if ($(this).val().length > 0) {
            alcoholTotalPercent = alcoholPercentage(totalPercent)
            if (alcoholTotalPercent == 100) {
                if ($("#whatKindOfLiquorIsServedBeer").val().length == 0) {
                    $("#whatKindOfLiquorIsServedBeer").val('00%')
                }
                ;
                if ($("#whatKindOfLiquorIsServedWine").val().length == 0) {
                    $("#whatKindOfLiquorIsServedWine").val('00%')
                }
                ;
                if ($("#whatKindOfLiquorIsServedFullBar").val().length == 0) {
                    $("#whatKindOfLiquorIsServedFullBar").val('00%')
                }
                ;
            }
        }
    });
// BROKER PREMIUM
    $(document.body).on('change', "#brokerFeeInput", function () {
        var brokerFeeTotal
        brokerPremium = getBrokerPremium(brokerFeeTotal)
        $("#brokerFeePremiumCost").html("$" + brokerPremium);
    });
// TOTAL PREMIUM COST

// STEP 1
// CGL TABLE
    $(document.body).on('change', 'input[name="commercialGeneralLiabilityRequested"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#commercialGeneralLiabilityRequestedContainer").css('display', "");
            $(".additionalCoverageContainer").css('display', "");
            $("#commercialGeneralLiabilityRequestedExplain").css('display', "");
            $(".tableCGL").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $("#commercialGeneralLiabilityRequestedContainer").css('display', "none");
            $(".additionalCoverageContainer").css('display', "none");
            $("#commercialGeneralLiabilityRequestedExplain").css('display', "none");
            $(".tableCGL").removeClass("showReviewTable");
        }
    });
// ALCOHOL TABLE / ADDITIONAL HIDDEN QUESTION / PREMIUMS
    $(document.body).on('change', 'input[name="willAlcoholBeServed"]', function () {
        if ($(this).attr("value") == "Yes") {
            $(".alcoholSaleContainer").css('display', "");
            $(".alcoholSaleExplain").css('display', "");

            $(".alcoholSaleTableContainer").css('display', "");
            $(".alcoholSaleTableExplain").css('display', "")
            $(".tableAlcohol").addClass("showReviewTable");
            $(".alcoholSales").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $(".alcoholSaleContainer").css('display', "none");
            $(".alcoholSaleExplain").css('display', "none");

            $(".alcoholSaleTableContainer").css('display', "none");
            $(".alcoholSaleTableExplain").css('display', "none");
            $(".tableAlcohol").removeClass("showReviewTable");
            $(".alcoholSales").removeClass("showReview");
        }
    });
// BROKER FEE HIDDEN PREMIUM
    $(document.body).on('change', '.brokerFeeInput', function () {
        var brokerFeeCostTemp = $(".brokerFeeInput").val()
        var brokerFeeCost = brokerFeeCostTemp.replace('$', '').replace(',', '')
        var brokerFeeCostValue = parseFloat(brokerFeeCost)

        if (brokerFeeCostValue > 0) {
            $("#brokerFeePremiumContainer").css('display', "");
            $("#brokerFeePremiumExplain").css('display', "");
        }
        else if (brokerFeeCostValue <= 0) {
            $("#brokerFeePremiumContainer").css('display', "none");
            $("#brokerFeePremiumExplain").css('display', "none");
        }
    });

// STEP 2
// ON CHANGE ADDITIONAL QUESTIONS SHOW REVIEW RADIO BUTTON (VALUE = YES)
    $(document.body).on('change', '.additionalQuestionOnChangeRadio', function () {
        var elem = $(this);
        onChangeRadio(elem)
    });
// ON CHANGE ADDITIONAL QUESTIONS SHOW REVIEW RADIO BUTTON REVERSED (VALUE = NO)
    $(document.body).on('change', '.additionalQuestionOnChangeRadioReverse', function () {
        var elem = $(this);
        onChangeRadioReverse(elem)
    });
// ON CHANGE ADDITIONAL QUESTIONS SHOW REVIEW INPUT FIELD
    $(document.body).on('change', '.additionalQuestionOnChangeInput', function () {
        var elem = $(this);
        onChangeInput(elem)
    });
// ON CHANGE ADDITIONAL QUESTIONS SHOW REVIEW CHECKBOX
    $(document.body).on('change', '.additionalQuestionOnChangeChecked', function () {
        var elem = $(this);
        onChangeChecked(elem)
    });
// ON CHANGE ADDITIONAL QUESTIONS SHOW REVIEW SELECT
    $(document.body).on('change', '.additionalQuestionOnChangeSelect', function () {
        var elem = $(this);
        onChangeSelect(elem)
    });
// Y/N RISK HAZARD QUESTION
    $(document.body).on('change', '.riskHazard', function () {
        if ($(".riskHazard").is(':checked')) {
            alert("Due to the risk hazards of this event, the indication provided in the previous page is no longer valid. Please proceed with entering all the information requested following this notification and an underwriter will be contacting you shortly. Please note, we may not be able to offer terms based on additional information received")
        }
    });

// ADDITIONAL COVERAGES
// SELECT MISC EQUIPMENT CONTAINER ADDITIONAL QUESTION
    $(document.body).on('change', '.miscCheckbox', function () {
        $('.miscCheckbox').not(this).prop('checked', false);
        if ($('.limitMiscellaneous').val().length > 0) {
            getMiscellaneousEquipmentDeductible()
            getMiscellaneousEquipmentRating();
        }

        if ($(".miscCheckbox").is(':checked')) {
            $('.inlandMarineContainer').css("display", "");
            $('.miscContainer').css("display", "");
        }
        else {
            $('.inlandMarineContainer').css("display", "none");
            $('.miscContainer').css("display", "none");
            $(".premiumMiscellaneous").removeClass("effectsTotal");
            additionalCLGPremiums()
        }
    });
    $(document.body).on('change', '.limitMiscellaneous', function () {
        getMiscellaneousEquipmentDeductible()
        getMiscellaneousEquipmentRating();
    });
// SELECT THIRD PARTY PROPERTY DAMAGE CONTAINER ADDITIONAL QUESTION
    $(document.body).on('change', '#thirdPartyCheckbox', function () {
        if ($("#thirdPartyCheckbox").is(':checked')) {
            $('.thirdPartyContainer').css("display", "");
            $('.inlandMarineContainer').css("display", "");
            getThirdPartyRating()
        }
        else {
            $('.thirdPartyContainer').css("display", "none");
            $('.inlandMarineContainer').css("display", "none");
            $(".premiumThirdParty").removeClass("effectsTotal");
            additionalCLGPremiums()
        }
    });
// GENERAL AGGREGATE LIMIT
    $('.limitGeneralAggregate').change(function () {
        var option = $(this).find('option:selected').val();
        // alert(option);
        if (option == "additional") {
            $(".premiumGeneralAggregate").addClass("effectsTotal");
            $(".premiumGeneralAggregate").html("$" + "250");
            additionalCLGPremiums()

        }
        if (option == "standard") {
            $(".premiumGeneralAggregate").removeClass("effectsTotal");
            $(".premiumGeneralAggregate").html("incl");
            additionalCLGPremiums()
        }
    });
// PRODUCT AND COMPLETED OPERATION LIMIT
    $('.limitProductAndCompletedOperations').change(function () {
        var option = $(this).find('option:selected').val();
        // alert(option);
        if (option == "additional") {
            $(".premiumProductAndCompletedOperations").html("$" + "250");
            $(".premiumProductAndCompletedOperations").addClass("effectsTotal");
            additionalCLGPremiums()
        }
        if (option == "standard") {
            $(".premiumProductAndCompletedOperations").html("incl");
            $(".premiumProductAndCompletedOperations").removeClass("effectsTotal");
            additionalCLGPremiums()
        }
    });
// PREMISES DAMAGE LIMIT
    $('.limitPremisesDamage').change(function () {
        var option = $(this).find('option:selected').val();
        // alert(option);
        if (option == "additional") {

            temptermLenghtDays = $("#proposedTermLength").val().split(" ")[0]
            termLenghtDays = parseInt(temptermLenghtDays)

            if (termLenghtDays > 0 && termLenghtDays <= 90) {
                $(".premiumPremisesDamage").html("$" + "100");
                $(".premiumPremisesDamage").addClass("effectsTotal");
                additionalCLGPremiums()
            }

            else if (termLenghtDays > 91 && termLenghtDays <= 180) {
                $(".premiumPremisesDamage").html("$" + "250");
                $(".premiumPremisesDamage").addClass("effectsTotal");
                additionalCLGPremiums()
            }

            else if (termLenghtDays > 181) {
                $(".premiumPremisesDamage").html("$" + "450");
                $(".premiumPremisesDamage").addClass("effectsTotal");
                additionalCLGPremiums()
            }
        }
        if (option == "standard") {
            $(".premiumPremisesDamage").removeClass("effectsTotal");
            $(".premiumPremisesDamage").html("incl");
            additionalCLGPremiums()
        }
    });
// MEDICAL LIMIT
    $('.limitMedicalExpenses').change(function () {
        var option = $(this).find('option:selected').val();
        // alert(option);
        if (option == "additional") {
            alert("MEDICAL EXPENSE COVERAGE MUST BE REQUIRED BY CONTRACT IF SELECTED")
            $(".premiumMedicalExpenses").html("$" + "250");
            $(".premiumMedicalExpenses").addClass("effectsTotal");
            additionalCLGPremiums()
        }
        if (option == "standard") {
            $(".premiumMedicalExpenses").html("");
            $(".premiumMedicalExpenses").removeClass("effectsTotal");
            additionalCLGPremiums()
        }
    });
// TERM LENGTH (ANNUAL CONTRACT)
    $(document.body).on('change', '#proposedTermLength', function () {
        var attendance = $("#estimatedTotalAttendance").val(),
            eventDays = $("#howManyDaysIsTheEvent").val(),
            CGLPremium;

        if (attendance.length > 0 && eventDays.length > 0) {
            CGLPremium = checkCGLPremiumTermLength(CGLPremium)

            $(".commercialGeneralLiabilityPremiumCost").html("$" + CGLPremium);
            $("#policyFeePremiumCost").html("$" + 25);
            $("#termsInsert").css('display', "");
            $("#endorseInsert").css('display', "");
            getFinalTotalPremium()
        }
    });
});

// CGL PREMIUMS
// CGL BASE RATE CLASS FROM RISK TYPE
function riskTypeRate(riskRate) {
    var riskRate;

    if (riskChosen === "Anniversary Parties" ||
        riskChosen === "Antique Shows" ||
        riskChosen === "Art Festivals and Shows" ||
        riskChosen === "Auctions" ||
        riskChosen === "Auto Shows-Auto Static Only" ||
        riskChosen === "Award Presentations" ||
        riskChosen === "Baby Shower" ||
        riskChosen === "Ballet or Other Classical Dance Shows" ||
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
    ) {
        riskRate = classOne;
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
        riskRate = classTwo;
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
        riskRate = classThree;
        // alert(riskClass)
    }
    return riskRate;
}
// CGL BASE PREMIUM CALCULATION
function getCGLBasePremium(ratedPremium) {
    var attendance = parseFloat($("#estimatedTotalAttendance").val()),
        rateValue = parseFloat(rate),
        ratedPremium = attendance * rateValue;

    return ratedPremium
}
// GET CGL MINIMUM PREMIUM BASED OFF EVENT DAYS AND ATTENDANCE
function getCGLMinimumPremium(minimumPremium) {
// MINIMUM PREMIUMS UP TO 5 DAYS
    var minimum5Premium100Class1 = 175,
        minimum5Premium100Class2 = 250,
        minimum5Premium100Class3 = 325,
        minimum5Premium500Class1 = 225,
        minimum5Premium500Class2 = 325,
        minimum5Premium500Class3 = 400,
        minimum5Premium1500Class1 = 325,
        minimum5Premium1500Class2 = 425,
        minimum5Premium1500Class3 = 525,
        minimum5Premium3000Class1 = 450,
        minimum5Premium3000Class2 = 550,
        minimum5Premium3000Class3 = 650,
        minimum5Premium5000Class1 = 575,
        minimum5Premium5000Class2 = 675,
        minimum5Premium5000Class3 = 775,
        minimum5Premium5001Class1 = 700,
        minimum5Premium5001Class2 = 800,
        minimum5Premium5001Class3 = 900,
// MINIMUM PREMIUMS UP TO 5 DAYS
// MINIMUM PREMIUMS 6 DAYS AND MORE
        minimum6Premium10Class1 = 250,
        minimum6Premium10Class2 = 250,
        minimum6Premium10Class3 = 325,
        minimum6Premium20Class123 = 500,
        minimum6Premium31Class123 = 750,
        minimum6Premium45Class123 = 800,
        minimum6Premium60Class123 = 850,
        minimum6Premium75Class123 = 900,
        minimum6Premium90Class123 = 950,
// MINIMUM PREMIUM 6 DAYS AND MORE
        attendance = parseFloat($("#estimatedTotalAttendance").val()),
        eventDays = parseFloat($("#howManyDaysIsTheEvent").val());

    if (eventDays <= 5 && attendance > 0) {
        if (attendance >= 1 && attendance <= 100) {
            if (rate = classOne) {
                minimumPremium = minimum5Premium100Class1
            }
            else if (rate = classTwo) {
                minimumPremium = minimum5Premium100Class2
            }
            else if (rate = classThree) {
                minimumPremium = minimum5Premium100Class3
            }
        }
        else if (attendance >= 101 && attendance <= 500) {
            if (rate = classOne) {
                minimumPremium = minimum5Premium500Class1
            }
            else if (rate = classTwo) {
                minimumPremium = minimum5Premium500Class2
            }
            else if (rate = classThree) {
                minimumPremium = minimum5Premium500Class3
            }
        }
        else if (attendance >= 501 && attendance <= 1500) {
            if (rate = classOne) {
                minimumPremium = minimum5Premium1500Class1
            }
            else if (rate = classTwo) {
                minimumPremium = minimum5Premium1500Class2
            }
            else if (rate = classThree) {
                minimumPremium = minimum5Premium1500Class3
            }
        }
        else if (attendance >= 1501 && attendance <= 3000) {
            if (rate = classOne) {
                minimumPremium = minimum5Premium3000Class1
            }
            else if (rate = classTwo) {
                minimumPremium = minimum5Premium3000Class2
            }
            else if (rate = classThree) {
                minimumPremium = minimum5Premium3000Class3
            }
        }
        else if (attendance >= 3001 && attendance <= 5000) {
            if (rate = classOne) {
                minimumPremium = minimum5Premium5000Class1
            }
            else if (rate = classTwo) {
                minimumPremium = minimum5Premium5000Class2
            }
            else if (rate = classThree) {
                minimumPremium = minimum5Premium5000Class3
            }
        }
        else if (attendance >= 5001) {
            if (rate = classOne) {
                minimumPremium = minimum5Premium5001Class1
            }
            else if (rate = classTwo) {
                minimumPremium = minimum5Premium5001Class2
            }
            else if (rate = classThree) {
                minimumPremium = minimum5Premium5001Class3
            }
        }
    }
    else if (eventDays > 5 && attendance > 0) {
        if (eventDays >= 6 && eventDays <= 10) {
            if (rate = classOne) {
                minimumPremium = minimum6Premium10Class1
            }
            else if (rate = classTwo) {
                minimumPremium = minimum6Premium10Class2
            }
            else if (rate = classThree) {
                minimumPremium = minimum6Premium10Class3
            }
        }
        else if (eventDays >= 11 && eventDays <= 20) {
            minimumPremium = minimum6Premium20Class123
        }
        else if (eventDays >= 21 && eventDays <= 31) {
            minimumPremium = minimum6Premium31Class123
        }
        else if (eventDays >= 32 && eventDays <= 45) {
            minimumPremium = minimum6Premium45Class123
        }
        else if (eventDays >= 46 && eventDays <= 60) {
            minimumPremium = minimum6Premium60Class123
        }
        else if (eventDays >= 61 && eventDays <= 75) {
            minimumPremium = minimum6Premium75Class123
        }
        else if (eventDays >= 76 && eventDays <= 90) {
            minimumPremium = minimum6Premium90Class123
        }
    }
    return minimumPremium;
}
// GET CGL PREMIUM AFTER CALCULATING BASE AND MINIMUM PREMIUMS
function getCGLPremium() {
    var attendanceValue = $("#estimatedTotalAttendance").val(),
        eventDaysValue = $("#howManyDaysIsTheEvent").val(),
        ratedPremium = getCGLBasePremium(ratedPremium),
        minimumPremium = getCGLMinimumPremium(minimumPremium),
        totalPremium = 0;

    if (attendanceValue.length > 0 && eventDaysValue.length > 0) {
        if (minimumPremium < ratedPremium) {
            totalPremium = ratedPremium
        }
        else if (minimumPremium > ratedPremium) {
            totalPremium = minimumPremium
        }
    }
    return totalPremium;
}
// CHECK FOR ANNUAL CGL POLICY
function checkCGLPremiumTermLength() {
    var attendance = $("#estimatedTotalAttendance").val(),
        eventDays = $("#howManyDaysIsTheEvent").val(),
        CGLPremium,
        temptermLengthDays = $("#proposedTermLength").val().split(" ")[0],
        termLengthDays = parseInt(temptermLengthDays),
        CGLPremiumInt;

    if (attendance.length > 0 && eventDays.length > 0) {
        CGLPremium = getCGLPremium();

        if (termLengthDays == 365) {
            CGLPremiumInt = parseInt(CGLPremium)
            if (CGLPremiumInt < 1000) {
                CGLPremium = 1000
            }
            else if (CGLPremiumInt >= 1000) {
                CGLPremium = getCGLPremium()
            }
        }
        return CGLPremium
    }
}
// TRIGGERS ADDITIONAL CGL PREMIUM INCREASE FOR ADDITIONAL LIMIT
function additionalCLGPremiums() {
    var PremiumCGL = getCGLTotalPremium();

    $("#commercialGeneralLiabilityPremiumCost").html("$" + PremiumCGL)
    getFinalTotalPremium()
}
// CALCULATES CGL + ADDITIONAL CGL PREMIUMS
function getCGLTotalPremium() {
    var checkCGLPremium = 0,
        tempCoverage;

    checkCGLPremium = getCGLPremium(totalPremium)
    $('div#commercialGeneralLiabilityRequestedContainer div.premiumColumn span.effectsTotal').each(function () {
        if ($(this).html().length > 0) {
            tempCoverage = parseFloat($(this).html().replace('$', '').replace(/,/g, ''));
            checkCGLPremium = checkCGLPremium + tempCoverage
        }
    });
    return checkCGLPremium
}

// LIQUOR PREMIUMS
// LIQUOR RATE PER STATE
function getLiquorRate(state) {
    liquorRate = 0;
    if (state == "DE" ||
        state == "KS" ||
        state == "MD" ||
        state == "NV" ||
        state == "SD" ||
        state == "VA") {
        liquorRate = 8
    }
    else if (state == "AR" ||
        state == "CA" ||
        state == "CO" ||
        state == "GA" ||
        state == "ID" ||
        state == "IL" ||
        state == "KY" ||
        state == "LA" ||
        state == "ME" ||
        state == "MN" ||
        state == "MS" ||
        state == "MO" ||
        state == "NE" ||
        state == "NJ" ||
        state == "OH" ||
        state == "OR" ||
        state == "TN") {
        liquorRate = 12
    }
    else if (state == "AZ" ||
        state == "IN" ||
        state == "MA" ||
        state == "MI" ||
        state == "MT" ||
        state == "NM" ||
        state == "NY" ||
        state == "NC" ||
        state == "ND" ||
        state == "OK" ||
        state == "RI" ||
        state == "SC" ||
        state == "TX" ||
        state == "UT") {
        liquorRate = 14
    }
    else if (state == "DC" ||
        state == "IA" ||
        state == "PA" ||
        state == "WV") {
        liquorRate = 15
    }
    else if (state == "AL" ||
        state == "VT") {
        liquorRate = 50
    }
    else if (state == "AK" ||
        state == "CT" ||
        state == "DC" ||
        state == "FL" ||
        state == "NH" ||
        state == "WA" ||
        state == "HI") {
        alert("STATE NOT ELIGIBLE FOR LIQUOR COVERAGE")
    }
    return liquorRate;
}
// CALCULATES LIQUOR MINIMUM PREMIUM COST
function getLiquorMinimumPremium(liquorMinimumPremium) {
// $25,000 LIQUOR SALES AND BELOW
    var liquorMinimum8Below25000 = 100,
        liquorMinimum12Below25000 = 375,
        liquorMinimum14Below25000 = 550,
        liquorMinimum15Below25000 = 750,
        liquorMinimum50Below25000 = 1000,
// $25,000 LIQUOR SALES AND ABOVE
        liquorMinimum8Above25000 = 100,
        liquorMinimum12Above25000 = 750,
        liquorMinimum14Above25000 = 800,
        liquorMinimum15Above25000 = 900,
        liquorMinimum50Above25000 = 2500,
        liquorMinimumPremium = 0,
// ALCOHOL PREMIUMS
        alcoholInputVal = $("#alcoholSales").val(),
        liquorSale = alcoholInputVal.replace('$', '').replace(/,/g, ''),
        liquorSaleValue = parseFloat(liquorSale),
        eventDaysValue = parseFloat($("#howManyDaysIsTheEvent").val()),
        attendanceValue = parseFloat($("#estimatedTotalAttendance").val());

    if (liquorSaleValue > 0 && eventDaysValue > 0 && eventDaysValue <= 5) {
        if (liquorRate == 8) {
            liquorMinimumPremium = liquorMinimum8Below25000
        }
        else if (liquorRate == 12) {
            liquorMinimumPremium = liquorMinimum12Below25000
        }
        else if (liquorRate == 14) {
            liquorMinimumPremium = liquorMinimum14Below25000
        }
        else if (liquorRate == 15) {
            liquorMinimumPremium = liquorMinimum15Below25000
        }
        else if (liquorRate == 50) {
            liquorMinimumPremium = liquorMinimum50Below25000
        }
    }
    else if (liquorSaleValue > 0 && eventDaysValue > 5) {
        if (liquorRate == 8) {
            liquorMinimumPremium = liquorMinimum8Above25000
        }
        else if (liquorRate == 12) {
            liquorMinimumPremium = liquorMinimum12Above25000
        }
        else if (liquorRate == 14) {
            liquorMinimumPremium = liquorMinimum14Above25000
        }
        else if (liquorRate == 15) {
            liquorMinimumPremium = liquorMinimum15Above25000
        }
        else if (liquorRate == 50) {
            liquorMinimumPremium = liquorMinimum50Above25000
        }
    }
    return liquorMinimumPremium
}
// CALCULATES LIQUOR PREMIUM TOTAL
function getLiquorPremium(liquorTotalPremium){
    var liquorMinimumPremium = getLiquorMinimumPremium(liquorMinimumPremium),
        alcoholInputVal = $("#alcoholSales").val(),
        liquorSale = alcoholInputVal.replace('$', '').replace(/,/g, ''),
        liquorSaleValue = parseFloat(liquorSale),
        liquorRatePremium = liquorRate * liquorSaleValue / 1000;
    if (liquorMinimumPremium < liquorRatePremium) {
        liquorTotalPremium = liquorRatePremium
    }
    else if (liquorMinimumPremium > liquorRatePremium) {
        liquorTotalPremium = liquorMinimumPremium
    }
    return liquorTotalPremium
}

// CALCULATES MISCELLANEOUS EQUIPMENT DEDUCTIBLE
function getMiscellaneousEquipmentDeductible() {
    var miscellaneousDeductibleValue = $("#limitMiscellaneous").val(),
        tempMiscellaneousDeductible = miscellaneousDeductibleValue.replace('$', '').replace(/,/g, ''),
        miscellaneousDeductible = parseInt(tempMiscellaneousDeductible);

    if (miscellaneousDeductible > 0 && miscellaneousDeductible <= 50000) {
        $(".deductibleMiscellaneous").html("$" + "1000");
    }
    else if (miscellaneousDeductible > 50000 && miscellaneousDeductible <= 150000) {
        $(".deductibleMiscellaneous").html("$" + "1500");
    }
    else if (miscellaneousDeductible > 150000 && miscellaneousDeductible <= 350000) {
        $(".deductibleMiscellaneous").html("$" + "2000");
    }
    else if (miscellaneousDeductible > 350000 && miscellaneousDeductible <= 1000000) {
        $(".deductibleMiscellaneous").html("$" + "2500");
    }
    else if (miscellaneousDeductible > 1000001) {
        alert("refer to company")
    }
}
// CALCULATES MISCELLANEOUS EQUIPMENT RATING / PREMIUM
function getMiscellaneousEquipmentRating() {
    var eventDay = parseFloat($("#howManyDaysIsTheEvent").val()),
        miscellaneousLimitValue = $("#limitMiscellaneous").val(),
        tempMiscellaneousLimit = miscellaneousLimitValue.replace('$', '').replace(/,/g, ''),
        tempLimit = parseFloat(tempMiscellaneousLimit),
        tempDividedLimit = 0,
        limit = 0,
    micsMinimum = 0;

    if ($("#miscUsaCheckbox").is(':checked')) {
        if (eventDay > 0 && eventDay <= 30) {
            miscMinimum = 100
            tempDividedLimit = tempLimit / 100
            limit = tempDividedLimit * 0.50
            if (limit > miscMinimum) {
                $(".premiumMiscellaneous").html("$" + limit);
                $(".premiumMiscellaneous").addClass("effectsTotal");
                additionalCLGPremiums()
            }
            else if (limit < miscMinimum) {
                $(".premiumMiscellaneous").html("$" + miscMinimum);
                $(".premiumMiscellaneous").addClass("effectsTotal");
                additionalCLGPremiums()
            }
        }
        else if (eventDay > 31 && eventDay <= 90) {
            miscMinimum = 250
            tempDividedLimit = tempLimit / 100
            limit = tempDividedLimit * 0.75
            if (limit > miscMinimum) {
                $(".premiumMiscellaneous").html("$" + limit);
                $(".premiumMiscellaneous").addClass("effectsTotal");
                additionalCLGPremiums()
            }
            else if (limit < miscMinimum) {
                $(".premiumMiscellaneous").html("$" + miscMinimum);
                $(".premiumMiscellaneous").addClass("effectsTotal");
                additionalCLGPremiums()
            }
        }
    }
    else if ($("#miscWorldCheckbox").is(':checked')) {
        if (eventDay > 0 && eventDay <= 30) {
            miscMinimum = 125
            tempDividedLimit = tempLimit / 100
            limit = tempDividedLimit * 0.63
            if (limit > miscMinimum) {
                $(".premiumMiscellaneous").html("$" + limit);
                $(".premiumMiscellaneous").addClass("effectsTotal");
                additionalCLGPremiums()
            }
            else if (limit < miscMinimum) {
                $(".premiumMiscellaneous").html("$" + miscMinimum);
                $(".premiumMiscellaneous").addClass("effectsTotal");
                additionalCLGPremiums()
            }
        }
        else if (eventDay > 31 && eventDay <= 90) {
            miscMinimum = 313
            tempDividedLimit = tempLimit / 100
            limit = tempDividedLimit * 0.94
            if (limit > miscMinimum) {
                $(".premiumMiscellaneous").html("$" + limit);
                $(".premiumMiscellaneous").addClass("effectsTotal");
                additionalCLGPremiums()
            }
            else if (limit < miscMinimum) {
                $(".premiumMiscellaneous").html("$" + miscMinimum);
                $(".premiumMiscellaneous").addClass("effectsTotal");
                additionalCLGPremiums()
            }
        }
    }
}
// CALCULATES THIRD PARTY PROPERTY DAMAGE RATING / PREMIUM / DEDUCTIBLE
function getThirdPartyRating() {
    var eventDays = parseFloat($("#howManyDaysIsTheEvent").val()),
        premiumThirdParty,
        deductibleThirdParty;

    if (eventDays > 0 && eventDay <= 30) {
        premiumThirdParty = 420
        deductibleThirdParty = 2500
        $(".premiumThirdParty").html("$" + premiumThirdParty);
        $(".deductibleThirdParty").html("$" + deductibleThirdParty);
        $(".premiumThirdParty").addClass("effectsTotal");
        additionalCLGPremiums()
    }
    else if (eventDays > 31 && eventDay <= 60) {
        premiumThirdParty = 820
        $(".premiumThirdParty").html("$" + premiumThirdParty);
        $(".deductibleThirdParty").html("$" + deductibleThirdParty);
        $(".premiumThirdParty").addClass("effectsTotal");
        additionalCLGPremiums()
    }
    else if (eventDays > 61 && eventDay <= 90) {
        premiumThirdParty = 1235
        $(".premiumThirdParty").html("$" + premiumThirdParty);
        $(".deductibleThirdParty").html("$" + deductibleThirdParty);
        $(".premiumThirdParty").addClass("effectsTotal");
        additionalCLGPremiums()
    }
}

// TOTAL PREMIUM
// TRIGGERS CHANGE IN TOTAL PREMIUM
function getFinalTotalPremium() {
    var attendance = $("#estimatedTotalAttendance").val(),
        eventDays = $("#howManyDaysIsTheEvent").val(),
        totalPremiumTotal = 0;

    if (attendance.length > 0 && eventDays.length > 0) {
        totalPremiumTotal = getTotalPremium()
        $("#totalSalePremiumCost").html("$" + totalPremiumTotal);
    }
}
// CALCULATES TOTAL PREMIUM TOTAL
function getTotalPremium() {
    var totalCoveragePremium = 0,
        tempVal;

    $('div#premiumDistDivContainer div.premDistributionInsert span.effectsTotalPremium').each(function () {
        if ($(this).html().length > 0) {
            tempVal = parseFloat($(this).html().replace('$', '').replace(/,/g, ''));
            totalCoveragePremium = totalCoveragePremium + tempVal
        }
    });
    return totalCoveragePremium
}

// BROKER FEE
function getBrokerPremium(brokerFeeTotal) {
    var tempBrokerFee,
        brokerFee,
        brokerFeeValue;

    tempBrokerFee = $("#brokerFeeInput").val()
    brokerFee = tempBrokerFee.replace('$', '').replace(/,/g, '');
    if (brokerFee.length > 0) {
        brokerFeeValue = parseFloat(brokerFee)
    }
    return brokerFeeValue
}
// MASKS INPUT INTO MONEY FORMAT
function inputMoneyFormat() {
    $('.moneyFormat').maskMoney({prefix: '$', precision: "0"});
}
// MIN MAX VALUES FOR EVENT DAYS
function validate(value, min, max) {
    if (parseInt(value) < min || isNaN(parseInt(value))) {
        return "";
    }
    else if (parseInt(value) > max) {
        alert("Please contact your underwriter if your event exceeds 90 days");
        return 90;
    }
    else return value;
}
// ALCOHOL PERCENT CALCULATOR
function alcoholPercentage(totalPercent) {
    var total = 0,
        temp;

    $(".whatKindOfLiquorIsServed").each(function () {
        if ($(this).val().length > 0) {
            tempVal = ($(this).val())
            tempVal = parseFloat(tempVal);
            total = total + tempVal
        }
    });
    return total
}
// ONCHANGE ADDITIONAL QUESTIONS AND SHOWREVIEW RADIO BUTTON Y/N
function onChangeRadio(elem) {
    if (elem.prop("value") == "Yes") {
        $("#" + elem.prop('name') + "Container").css('display', "");
        $("." + elem.prop('name') + "ShowReview").addClass("showReview");
    }
    else if (elem.prop("value") == "No") {
        $("#" + elem.prop('name') + "Container").css('display', "none");
        $("." + elem.prop('name') + "ShowReview").removeClass("showReview");
    }
}
// ONCHANGE ADDITIONAL QUESTIONS AND SHOWREVIEW RADIO BUTTON REVERSE Y/N
function onChangeRadioReverse(elem) {
    if (elem.prop("value") == "Yes") {
        $("#" + elem.prop('name') + "Container").css('display', "none");
        $("." + elem.prop('name') + "ShowReview").removeClass("showReview");
    }
    else if (elem.prop("value") == "No") {
        $("#" + elem.prop('name') + "Container").css('display', "");
        $("." + elem.prop('name') + "ShowReview").addClass("showReview");
    }
}
// ONCHANGE ADDITIONAL QUESTION AND SHOWREVIEW INPUT VALUE
function onChangeInput(elem) {
    var inputVal = elem.prop('value');

    if (inputVal.length > 1) {
        $("." + elem.prop('name') + "Container").css('display', "");
        $("." + elem.prop('name') + "ShowReview").addClass("showReview");
    }
    else if (inputVal.length < 1) {
        $("." + elem.prop('name') + "Container").css('display', "none");
        $("." + elem.prop('name') + "ShowReview").removeClass("showReview");
    }
}
// ONCHANGE ADDITIONAL QUESTION AND SHOWREVIEW CHECKED
function onChangeChecked(elem) {
    var checked = elem.prop('id')

    if(document.getElementById(checked).checked) {
        $("." + elem.prop('name') + "Container").css('display', "");
        $("." + elem.prop('name') + "ShowReview").addClass("showReview");
    }
    else {
        $("." + elem.prop('name') + "Container").css('display', "none");
        $("." + elem.prop('name') + "ShowReview").removeClass("showReview");
    }
}
// ONCHANGE ADDITIONAL QUESTION AND SHOWREVIEW SELECT
function onChangeSelect(elem) {
    var option = elem.find('option:selected').val();

    if (option == "invalid") {
        $("." + elem.prop('name') + "Container").css('display', "none");
        $("." + elem.prop('name') + "ShowReview").removeClass("showReview");
    }
    else {
        $("." + elem.prop('name') + "Container").css('display', "");
        $("." + elem.prop('name') + "ShowReview").addClass("showReview");
    }
}




// OLD FUNCTIONS THAT ARE NOT BEING USED
function oldFunctions() {

//
// // CGL PREMIUMS
// // CGL BASE RATE CLASS FROM RISK TYPE
//     function riskTypeRate(riskRate) {
//         var riskRate
//
//         if (riskChosen === "Anniversary Parties" ||
//             riskChosen === "Antique Shows" ||
//             riskChosen === "Art Festivals and Shows" ||
//             riskChosen === "Auctions" ||
//             riskChosen === "Auto Shows-Auto Static Only" ||
//             riskChosen === "Award Presentations" ||
//             riskChosen === "Baby Shower" ||
//             riskChosen === "Ballet or Other Classical Dance Shows" ||
//             riskChosen === "Balloon Artist" ||
//             riskChosen === "Banquets" ||
//             riskChosen === "Baptism" ||
//             riskChosen === "Bar Mitzvahs / Bat Mitzvahs" ||
//             riskChosen === "Bazaars" ||
//             riskChosen === "Beauty Pageants" ||
//             riskChosen === "Belly Dancer" ||
//             riskChosen === "Birthday Parties" ||
//             riskChosen === "Boat Shows (Dry Dock only)" ||
//             riskChosen === "Body Building Contests" ||
//             riskChosen === "Book Signing" ||
//             riskChosen === "Bridal Showers" ||
//             riskChosen === "Business Meetings and Shows" ||
//             riskChosen === "Business Parties" ||
//             riskChosen === "Camera Shows" ||
//             riskChosen === "Card Shows" ||
//             riskChosen === "Caricature Sketching" ||
//             riskChosen === "Carolers" ||
//             riskChosen === "Cartoonist" ||
//             riskChosen === "Casino Nights" ||
//             riskChosen === "Chamber of Commerce Events" ||
//             riskChosen === "Charity Benefits, Dances, Auctions, or Sales" ||
//             riskChosen === "Choirs - indoor" ||
//             riskChosen === "Church Services or Meetings" ||
//             riskChosen === "Civic Club Meetings" ||
//             riskChosen === "Classic Dance Shows" ||
//             riskChosen === "Computer Shows" ||
//             riskChosen === "Concerts - Celtic Music" ||
//             riskChosen === "Concerts - Chamber Music" ||
//             riskChosen === "Concerts - Classical Music - Indoors" ||
//             riskChosen === "Concerts - Holiday Music" ||
//             riskChosen === "Concerts - Instrumental" ||
//             riskChosen === "Consumer Shows" ||
//             riskChosen === "Conventions - Indoors" ||
//             riskChosen === "Craft Shows" ||
//             riskChosen === "Dance Competitions" ||
//             riskChosen === "Dance Recital" ||
//             riskChosen === "Debutant Balls" ||
//             riskChosen === "Debuts" ||
//             riskChosen === "Drill Team Exhibitions" ||
//             riskChosen === "Educational Exhibitions" ||
//             riskChosen === "Electronics Conventions" ||
//             riskChosen === "Face Painters" ||
//             riskChosen === "Fashion Shows" ||
//             riskChosen === "Flower and Garden Shows" ||
//             riskChosen === "Fund Raising Dinner" ||
//             riskChosen === "Funeral Service" ||
//             riskChosen === "Graduations" ||
//             riskChosen === "Harvest Festivals - No Farm Implements or Equipment" ||
//             riskChosen === "Holiday Events & Parties / Gift Exchanges" ||
//             riskChosen === "Home Shows" ||
//             riskChosen === "Jazz and Jam Concerts - Indoors" ||
//             riskChosen === "Jewelry Maker" ||
//             riskChosen === "Job Fairs Indoor" ||
//             riskChosen === "Ladies Club Events" ||
//             riskChosen === "Lectures" ||
//             riskChosen === "Luncheons" ||
//             riskChosen === "Meetings - Indoors" ||
//             riskChosen === "Mime" ||
//             riskChosen === "Mobile Home Shows" ||
//             riskChosen === "Pageants" ||
//             riskChosen === "Poetry Reading" ||
//             riskChosen === "Professional and Amateur Association Meetings" ||
//             riskChosen === "Puppeteer" ||
//             riskChosen === "Quinceanera" ||
//             riskChosen === "Recitals" ||
//             riskChosen === "Reunions Indoors" ||
//             riskChosen === "RV Shows" ||
//             riskChosen === "Scouting Jamborees - No Overnight Camping" ||
//             riskChosen === "Seances" ||
//             riskChosen === "Seminars" ||
//             riskChosen === "Social Receptions - Indoors" ||
//             riskChosen === "Speaking Engagements" ||
//             riskChosen === "Store Openings" ||
//             riskChosen === "Story Teller" ||
//             riskChosen === "Symphony Concerts" ||
//             riskChosen === "Teleconferences" ||
//             riskChosen === "Telethons" ||
//             riskChosen === "Trade Shows - Indoors" ||
//             riskChosen === "Vacation Shows" ||
//             riskChosen === "Ventriloquist" ||
//             riskChosen === "Voter Registration" ||
//             riskChosen === "Weddings and Wedding Receptions"
//         ) {
//             riskRate = classOne;
//             // alert(riskClass)
//         }
//         else if (riskChosen === "Bingo Games" ||
//             riskChosen === "Card Games - Blackjack" ||
//             riskChosen === "Card Games - Poker" ||
//             riskChosen === "Carnivals - School Events with No Mechanical Rides" ||
//             riskChosen === "Chess Tournament" ||
//             riskChosen === "Choirs - Outdoor" ||
//             riskChosen === "Christmas Tree Lighting" ||
//             riskChosen === "Clowns - No Motorized Vehicles" ||
//             riskChosen === "Comedians" ||
//             riskChosen === "Concerts - 50's, 60's, 70's or 80's Music" ||
//             riskChosen === "Concerts - Blues Music" ||
//             riskChosen === "Concerts - Classical Music - Outdoors" ||
//             riskChosen === "Concerts - Country Music" ||
//             riskChosen === "Concerts - Folk Music" ||
//             riskChosen === "Concerts - Funk Music" ||
//             riskChosen === "Concerts - Motown" ||
//             riskChosen === "Concerts Soul Music" ||
//             riskChosen === "Dog, Cat, Bird & Other Domestic Animal Show / Event" ||
//             riskChosen === "Easter Egg Hunt" ||
//             riskChosen === "Festival and Cultural Events - Indoors" ||
//             riskChosen === "Fishing Events" ||
//             riskChosen === "Impersonator - Celebrity or Holiday Character" ||
//             riskChosen === "Impressionist" ||
//             riskChosen === "Jazz and Jam Concerts - Outdoors" ||
//             riskChosen === "Job Fairs Outdoors" ||
//             riskChosen === "Jugglers (No Pyro)" ||
//             riskChosen === "Magician" ||
//             riskChosen === "Mariachi Band" ||
//             riskChosen === "Math Tournament" ||
//             riskChosen === "Meetings - Outdoors" ||
//             riskChosen === "Menorah Lightning" ||
//             riskChosen === "Picnics - No Pools or Lakes" ||
//             riskChosen === "Reunions Outdoors" ||
//             riskChosen === "School Band Competitions or Events" ||
//             riskChosen === "Soap Box Derbies" ||
//             riskChosen === "Social Receptions - Outdoors" ||
//             riskChosen === "Trade Shows - Outdoors" ||
//             riskChosen === "Union Meetings" ||
//             riskChosen === "Video Game Contests"
//         ) {
//             riskRate = classTwo;
//             // alert(riskClass)
//         }
//         else if (riskChosen === "Amateur Rodeo and Roping Events" ||
//             riskChosen === "Baseball - Amateur" ||
//             riskChosen === "Basketball - Amateur" ||
//             riskChosen === "Bicycling - No Racing / Off-road" ||
//             riskChosen === "Block Parties / Street Closures / Street Fairs - Under 5000 Spectators" ||
//             riskChosen === "Bowling Tournaments" ||
//             riskChosen === "Boxing, Wrestling, Hockey and Football Games - Amateur" ||
//             riskChosen === "Casino and Lounge Shows" ||
//             riskChosen === "Cheerleading Events / Competitions (no Pyramids)" ||
//             riskChosen === "Comedy Shows" ||
//             riskChosen === "Company or Corporate Retreats" ||
//             riskChosen === "Concerts - Pop Cover Bands" ||
//             riskChosen === "Cornfield Mazes" ||
//             riskChosen === "Country & Western Events - No Rodeos or Rides" ||
//             riskChosen === "Country Festivals and Fairs - No Rides" ||
//             riskChosen === "Festival and Cultural Events - Outdoors" ||
//             riskChosen === "Film Screenings" ||
//             riskChosen === "Film Showings" ||
//             riskChosen === "Golf Tournament - Daytime" ||
//             riskChosen === "Grad Night" ||
//             riskChosen === "Gymnastic Competitions - Spectators Only" ||
//             riskChosen === "Halloween - Costume Contests" ||
//             riskChosen === "Ice Skating Shows" ||
//             riskChosen === "Junior Athletic Games" ||
//             riskChosen === "Karate Meets" ||
//             riskChosen === "Lacrosse" ||
//             riskChosen === "Laser Tag (Indoors)" ||
//             riskChosen === "Livestock Shows" ||
//             riskChosen === "Magic Shows" ||
//             riskChosen === "Marathons (Walking & Running)" ||
//             riskChosen === "Marathons / Walkathons" ||
//             riskChosen === "Mobile Homes / RV Shows - Professionally Managed" ||
//             riskChosen === "Movie Release Party" ||
//             riskChosen === "New Years Party (Private / by invite only)" ||
//             riskChosen === "Old Timer Events" ||
//             riskChosen === "Parades - Under 5000 Spectators" ||
//             riskChosen === "Play Readings" ||
//             riskChosen === "Plays" ||
//             riskChosen === "Pool and / or Billiards Tournaments" ||
//             riskChosen === "Proms" ||
//             riskChosen === "Rugby" ||
//             riskChosen === "Soccer" ||
//             riskChosen === "Softball - Amateur" ||
//             riskChosen === "Sporting Events - Indoors - Non-Professional" ||
//             riskChosen === "Talent Show (no rap, hip hop, heavy metal shows)" ||
//             riskChosen === "Tap Dancing" ||
//             riskChosen === "Tennis Tournament" ||
//             riskChosen === "Theatrical Stage Performances" ||
//             riskChosen === "Volleyball - Amateur" ||
//             riskChosen === "Wagon / Hayrides" ||
//             riskChosen === "Walking / Hiking Tour" ||
//             riskChosen === "Wine Tasting"
//         ) {
//             riskRate = classThree;
//             // alert(riskClass)
//         }
//         return riskRate;
//     }
//
// // CGL BASE PREMIUM CALCULATION
//     function getCGLBasePremium() {
//         var attendance = parseFloat($("#estimatedTotalAttendance").val()),
//             eventDays = parseFloat($("#howManyDaysIsTheEvent").val()),
//             rateValue = parseFloat(rate),
//             CGLBasePremium = attendanceValue * rateValue;
//
//         return CGLBasePremium
//     }
//
// // GET CGL PREMIUM BASED OFF EVENT DAYS AND ATTENDANCE
//     function getCGLPremium() {
//         var totalPremium,
//             totalPremium5Below,
//             totalPremium6Above,
// // MINIMUM PREMIUMS UP TO 5 DAYS
//             minimum5Premium100Class1 = 175,
//             minimum5Premium100Class2 = 250,
//             minimum5Premium100Class3 = 325,
//             minimum5Premium500Class1 = 225,
//             minimum5Premium500Class2 = 325,
//             minimum5Premium500Class3 = 400,
//             minimum5Premium1500Class1 = 325,
//             minimum5Premium1500Class2 = 425,
//             minimum5Premium1500Class3 = 525,
//             minimum5Premium3000Class1 = 450,
//             minimum5Premium3000Class2 = 550,
//             minimum5Premium3000Class3 = 650,
//             minimum5Premium5000Class1 = 575,
//             minimum5Premium5000Class2 = 675,
//             minimum5Premium5000Class3 = 775,
//             minimum5Premium5001Class1 = 700,
//             minimum5Premium5001Class2 = 800,
//             minimum5Premium5001Class3 = 900,
// // MINIMUM PREMIUMS UP TO 5 DAYS
// // MINIMUM PREMIUMS 6 DAYS AND MORE
//             minimum6Premium10Class1 = 250,
//             minimum6Premium10Class2 = 250,
//             minimum6Premium10Class3 = 325,
//             minimum6Premium20Class123 = 500,
//             minimum6Premium31Class123 = 750,
//             minimum6Premium45Class123 = 800,
//             minimum6Premium60Class123 = 850,
//             minimum6Premium75Class123 = 900,
//             minimum6Premium90Class123 = 950,
// // MINIMUM PREMIUM 6 DAYS AND MORE
//             attendanceValue = $("#estimatedTotalAttendance").val()
//         eventDaysValue = $("#howManyDaysIsTheEvent").val()
//         attendance = parseFloat(attendanceValue),
//             eventDays = parseFloat(eventDaysValue),
//             rateValue = parseFloat(rate);
//
//         if (attendanceValue.length > 0 && eventDaysValue.length > 0) {
//             if (eventDays <= 5 && attendance > 0) {
//                 totalPremium5Below = attendance * rateValue
//                 if (attendance >= 1 && attendance <= 100) {
//                     if (rate = classOne) {
//                         minimumPremium = minimum5Premium100Class1
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classTwo) {
//                         minimumPremium = minimum5Premium100Class2
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classThree) {
//                         minimumPremium = minimum5Premium100Class3
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                 }
//                 else if (attendance >= 101 && attendance <= 500) {
//                     if (rate = classOne) {
//                         minimumPremium = minimum5Premium500Class1
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classTwo) {
//                         minimumPremium = minimum5Premium500Class2
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classThree) {
//                         minimumPremium = minimum5Premium500Class3
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                 }
//                 else if (attendance >= 501 && attendance <= 1500) {
//                     if (rate = classOne) {
//                         minimumPremium = minimum5Premium1500Class1
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classTwo) {
//                         minimumPremium = minimum5Premium1500Class2
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classThree) {
//                         minimumPremium = minimum5Premium1500Class3
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                 }
//                 else if (attendance >= 1501 && attendance <= 3000) {
//                     if (rate = classOne) {
//                         minimumPremium = minimum5Premium3000Class1
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classTwo) {
//                         minimumPremium = minimum5Premium3000Class2
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classThree) {
//                         minimumPremium = minimum5Premium3000Class3
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                 }
//                 else if (attendance >= 3001 && attendance <= 5000) {
//                     if (rate = classOne) {
//                         minimumPremium = minimum5Premium5000Class1
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classTwo) {
//                         minimumPremium = minimum5Premium5000Class2
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classThree) {
//                         minimumPremium = minimum5Premium5000Class3
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                 }
//                 else if (attendance >= 5001) {
//                     if (rate = classOne) {
//                         minimumPremium = minimum5Premium5001Class1
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classTwo) {
//                         minimumPremium = minimum5Premium5001Class2
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classThree) {
//                         minimumPremium = minimum5Premium5001Class3
//                         if (minimumPremium < totalPremium5Below) {
//                             totalPremium = totalPremium5Below
//                         }
//                         else if (minimumPremium > totalPremium5Below) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                 }
//             }
//             else if (eventDays > 5 && attendance > 0) {
//                 totalPremium6Above = attendance * rateValue
//                 if (eventDays >= 6 && eventDays <= 10) {
//                     if (rate = classOne) {
//                         minimumPremium = minimum6Premium10Class1
//                         if (minimumPremium < totalPremium6Above) {
//                             totalPremium = totalPremium6Above
//                         }
//                         else if (minimumPremium > totalPremium6Above) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classTwo) {
//                         minimumPremium = minimum6Premium10Class2
//                         if (minimumPremium < totalPremium6Above) {
//                             totalPremium = totalPremium6Above
//                         }
//                         else if (minimumPremium > totalPremium6Above) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                     else if (rate = classThree) {
//                         minimumPremium = minimum6Premium10Class3
//                         if (minimumPremium < totalPremium6Above) {
//                             totalPremium = totalPremium6Above
//                         }
//                         else if (minimumPremium > totalPremium6Above) {
//                             totalPremium = minimumPremium
//                         }
//                     }
//                 }
//                 else if (eventDays >= 11 && eventDays <= 20) {
//                     minimumPremium = minimum6Premium20Class123
//                     if (minimumPremium < totalPremium6Above) {
//                         totalPremium = totalPremium6Above
//                     }
//                     else if (minimumPremium > totalPremium6Above) {
//                         totalPremium = minimumPremium
//                     }
//                 }
//                 else if (eventDays >= 21 && eventDays <= 31) {
//                     minimumPremium = minimum6Premium31Class123
//                     if (minimumPremium < totalPremium6Above) {
//                         totalPremium = totalPremium6Above
//                     }
//                     else if (minimumPremium > totalPremium6Above) {
//                         totalPremium = minimumPremium
//                     }
//                 }
//                 else if (eventDays >= 32 && eventDays <= 45) {
//                     minimumPremium = minimum6Premium45Class123
//                     if (minimumPremium < totalPremium6Above) {
//                         totalPremium = totalPremium6Above
//                     }
//                     else if (minimumPremium > totalPremium6Above) {
//                         totalPremium = minimumPremium
//                     }
//                 }
//                 else if (eventDays >= 46 && eventDays <= 60) {
//                     minimumPremium = minimum6Premium60Class123
//                     if (minimumPremium < totalPremium6Above) {
//                         totalPremium = totalPremium6Above
//                     }
//                     else if (minimumPremium > totalPremium6Above) {
//                         totalPremium = minimumPremium
//                     }
//                 }
//                 else if (eventDays >= 61 && eventDays <= 75) {
//                     minimumPremium = minimum6Premium75Class123
//                     if (minimumPremium < totalPremium6Above) {
//                         totalPremium = totalPremium6Above
//                     }
//                     else if (minimumPremium > totalPremium6Above) {
//                         totalPremium = minimumPremium
//                     }
//                 }
//                 else if (eventDays >= 76 && eventDays <= 90) {
//                     minimumPremium = minimum6Premium90Class123
//                     if (minimumPremium < totalPremium6Above) {
//                         totalPremium = totalPremium6Above
//                     }
//                     else if (minimumPremium > totalPremium6Above) {
//                         totalPremium = minimumPremium
//                     }
//                 }
//             }
//         }
//         return totalPremium;
//     }
//
// // TRIGGERS ADDITIONAL CGL PREMIUM INCREASE FOR ADDITIONAL LIMIT
//     function additionalCLGPremiums() {
//         var PremiumCGL = getCGLTotalPremium()
//         $("#commercialGeneralLiabilityPremiumCost").html("$" + PremiumCGL);
//         getFinalTotalPremium()
//         console.log(PremiumCGL + "ADDING ADDITIONAL CGL PREMIUM")
//     }
//
// // CALCULATES CGL + ADDITIONAL CGL PREMIUMS
//     function getCGLTotalPremium() {
//         var checkCGLPremium = 0,
//             tempCoverage;
//
//         checkCGLPremium = getCGLPremium(totalPremium)
//         $('div#commercialGeneralLiabilityRequestedContainer div.premiumColumn span.effectsTotal').each(function () {
//             if ($(this).html().length > 0) {
//                 tempCoverage = parseFloat($(this).html().replace('$', '').replace(/,/g, ''));
//                 checkCGLPremium = checkCGLPremium + tempCoverage
//             }
//         });
//         return checkCGLPremium
//     }
//
//
//     // WORK COMP TABLE / ADDITIONAL HIDDEN QUESTIONS
//     $(document.body).on('change', 'input[name="workCompCoverageRequested"]', function () {
//         //alert();
//         if ($(this).attr("value") == "Yes") {
//             $("#workCompCoverageRequestedContainer").css('display', "");
//             $("#workCompCoverageRequestedExplain").css('display', "");
//             $(".tableWC").addClass("showReviewTable");
//         }
//         if ($(this).attr("value") == "No") {
//             $("#workCompCoverageRequestedContainer").css('display', "none");
//             $("#workCompCoverageRequestedExplain").css('display', "none");
//             $(".tableWC").removeClass("showReviewTable");
//         }
//     });
//     // AUTO LIABILITY TABLE / ADDITIONAL HIDDEN QUESTIONS
//     $(document.body).on('change', 'input[name="autoLiability"]', function () {
//         //alert();
//         if ($(this).attr("value") == "Yes") {
//             $(".costRentedVehiclesContainer").css('display', "");
//             $(".costRentedVehiclesExplain").css('display', "");
//             $(".tableNOAL").addClass("showReviewTable");
//         }
//         if ($(this).attr("value") == "No") {
//             $(".costRentedVehiclesContainer").css('display', "none");
//             $(".costRentedVehiclesExplain").css('display', "none");
//             $(".tableNOAL").removeClass("showReviewTable");
//         }
//     });
//     // UMBRELLA TABLE
//     $(document.body).on('change', 'input[name="umbrellaLimitRequested"]', function () {
//         //alert();
//         if ($(this).attr("value") == "Yes") {
//             $("#umbrellaLimitRequestedContainer").css('display', "");
//             $("#umbrellaLimitRequestedExplain").css('display', "");
//             $(".tableCUMB").addClass("showReviewTable");
//         }
//         if ($(this).attr("value") == "No") {
//             $("#umbrellaLimitRequestedContainer").css('display', "none");
//             $("#umbrellaLimitRequestedExplain").css('display', "none");
//             $(".tableCUMB").removeClass("showReviewTable");
//         }
//     });
//     // INSURED CONTACT TABLE / CONTAINER
//     $(document.body).on('change', 'input[name="contactRep"]', function () {
//         //alert();
//         if ($(this).attr("value") == "Yes") {
//             $("#insuredContactInformationContainer").css('display', "");
//             $("#insuredContactInformationExplain").css('display', "");
//         }
//         if ($(this).attr("value") == "No") {
//             $("#insuredContactInformationContainer").css('display', "none");
//             $("#insuredContactInformationExplain").css('display', "none");
//         }
//     });
//     // EQUIPMENT TABLE / ADDITIONAL HIDDEN QUESTIONS
//     $(document.body).on('change', 'input[name="equipmentOwnedRented"]', function () {
//         //alert();
//         if ($(this).attr("value") == "Yes") {
//             $("#equipmentOwnedRentedContainer").css('display', "");
//             $("#equipmentOwnedRentedExplain").css('display', "");
//         }
//         if ($(this).attr("value") == "No") {
//             $("#equipmentOwnedRentedContainer").css('display', "none");
//             $("#equipmentOwnedRentedExplain").css('display', "none");
//         }
//     });
//     // INSURANCE BEEN CANCELLED ADDITIONAL HIDDEN QUESTIONS
//     $(document.body).on('change', 'input[name="insuranceCancelled"]', function () {
//         //alert();
//         if ($(this).attr("value") == "Yes") {
//             $("#insuranceCancelledContainer").css('display', "");
//             $("#insuranceCancelledExplain").css('display', "");
//         }
//         if ($(this).attr("value") == "No") {
//             $("#insuranceCancelledContainer").css('display', "none");
//             $("#insuranceCancelledExplain").css('display', "none");
//         }
//     });
};