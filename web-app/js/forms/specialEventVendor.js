// VARIABLES FOR EXHIBITOR RATING
// VARIABLES FOR EXHIBITOR RATING
var exhibitorRate
var numberOfExhibitors

var riskChosen;
var attendance
var totalPremium
var rate
var eventDays
var brokerFee
var ratePerDay
var NumberOfExhibitor
var liquorRate
var CGLPremium
var brokerPremium
var liquorPremium
var totalPremiumTotal
var riskRate

// RATES BASED OFF RISK
var exhibitorRate = 55
var concessionairesNoFoodRate = 80
var concessionairesFoodRate = 90
var attractionRate = 185
// RATES BASED OFF RISK

// TOTAL SALES
var totalSale
var commercialTotal

// SEPARATE POLICY
var additionalDays
var additionalDaysCost
// VARIABLES FOR EXHIBITOR RATING
// VARIABLES FOR EXHIBITOR RATING

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
    rate = riskTypeRate(riskRate);
    // alert ("RATE" + rate)

// MONEY FORMAT
    inputMoneyFormat();
// PHONE NUMBER FORMAT
    $(document.body).on('focus', '.phoneNumberMask', function () {
        $(".phoneNumberMask").mask("(999) 999-9999");
    });


// TOTAL PREMIUM COST !@#

// STATE RATE SELECT
    $("#selectState").change(function () {
        var state = this.value;
        liquorRate = setStateRate(state);
        // alert ("LIQUOR RATE:" + liquorRate)
    });
// COMMERCIAL GENERAL LIABILITY FEE + POLICY FEE
    $(document.body).on('change', "input[name='separatePolicy'],#numberOfExhibitors,#howManyDaysIsTheEvent", function () {
        numberOfExhibitors = $("#numberOfExhibitors").val()
        eventDays = $("#howManyDaysIsTheEvent").val()
        var eventDaysValue = parseFloat(eventDays)
        // var rateValue = parseFloat(rate)
        if (eventDays.length > 0) {
            var totalPremiumCGL
            // alert ("step one" + attendance)
            // alert ("step two" + eventDays)
            CGLPremium = getCGLPremium(totalPremiumCGL)
            $("#commercialGeneralLiabilityPremiumCost").html("$" + CGLPremium);
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
        var eventDaysValue = parseFloat(eventDays)
        // var rateValue = parseFloat(rate)
        if ( eventDays.length > 0) {
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
    $(document.body).on('change', 'input[name="workCompCoverageRequested?"]', function () {
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
// ALCOHOL TABLE / ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="willAlcoholBeServed"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $(".alcoholSaleContainer").css('display', "");
            $(".alcoholSaleExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $(".alcoholSaleContainer").css('display', "none");
            $(".alcoholSaleExplain").css('display', "none");
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
// OVERNIGHT EVENTS CONTAINER
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
    $(document.body).on('change', '#pyrotechnicsCheckbox', function () {
        if ($("#pyrotechnicsCheckbox").is(':checked')) {
            $('#pyrotechnicsAttachContainer').css("display", "");
        }
        else {
            $('#pyrotechnicsAttachContainer').css("display", "none");
        }
    });
// STUNTS HAZARDOUS EVENTS ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', '#stuntsHazardousCheckbox', function () {
        if ($("#stuntsHazardousCheckbox").is(':checked')) {
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "");
            $('#stuntCoordinatorName').css("display", "");
            $('#participantsSigningWaivers').css("display", "");
        }
        else {
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "none");
            $('#stuntCoordinatorName').css("display", "none");
            $('#participantsSigningWaivers').css("display", "none");

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
// SEPARATE POLICY
    $(document.body).on('change', 'input[name="separatePolicy"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#numberOfExhibitorsGroup").css('display', "none");
            $("#numberOfExhibitorsGroup").css('display', "none");
        }
        if ($(this).attr("value") == "No") {
            $("#numberOfExhibitorsGroup").css('display', "");
            $("#numberOfExhibitorsGroup").css('display', "");
        }
    });
// BROKER FEE HIDDEN PREMIUM
    $(document.body).on('change', '.brokerFeeInput', function () {
        //alert();
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

});

function setStateRate(state) {
    var lrate = 0;
    if (state == "DE" ||
        state == "KS" ||
        state == "MD" ||
        state == "NV" ||
        state == "SD" ||
        state == "VA") {
        lrate = 8
    }
    else if (state == "AR" ||
        state == "CA" ||
        state == "CO" ||
        state == "FL" ||
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
        lrate = 12
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
        state == "UT" ||
        state == "WA") {
        lrate = 14
    }
    else if (state == "DC" ||
        state == "IA" ||
        state == "PA" ||
        state == "WV") {
        lrate = 15
    }
    else if (state == "AL" ||
        state == "VT") {
        lrate = 50
    }
    else if (state == "AK" ||
        state == "CT" ||
        state == "NH" ||
        state == "HI") {
        alert("STATE NOT ELIGIBLE FOR LIQUOR COVERAGE")
    }

    return lrate;


}
function riskTypeRate(riskRate) {
    var riskClass

    if (riskChosen === "Exhibitor") {
        riskClass = exhibitorRate;
        // alert(rate)
    }
    else if (riskChosen === "Concessionaires Non Food Sales") {
        riskClass = concessionairesNoFoodRate;
        // alert(rate)
    }
    else if (riskChosen === "Concessionaires Food Sales") {
        riskClass = concessionairesFoodRate;
        // alert(rate)
    }
    else if (riskChosen === "Attractions / Performers") {
        riskClass = attractionRate;
        // alert(rate)
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
    numberOfExhibitors = $("#numberOfExhibitors").val()
    eventDays = $("#howManyDaysIsTheEvent").val()

    var separatePolicy = $("input[name='separatePolicy']:checked").val();

    // alert("stepone:" + separatePolicy)
    if (separatePolicy == "Yes") {
        if (eventDays.length > 0) {
            var eventDaysValue = parseFloat(eventDays)
            var rateValue = parseFloat(rate)

            // alert("steptwo:" + rateValue)
            // alert("stepthree:" + eventDaysValue)
            if (riskChosen === "Exhibitor") {
                if (eventDaysValue <= 3) {
                    totalPremium = 150
                    var policyFee = 100
                    $("#policyFeePremiumCost").html("$" + policyFee);
                }
                else if (eventDaysValue > 3) {
                    additionalDaysCost = 50
                    additionalDays = eventDaysValue - 3
                    totalPremium = additionalDaysCost * additionalDays + 150
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
            }
            else if (riskChosen === "Concessionaires Non Food Sales") {
                if (eventDaysValue <= 3) {
                    totalPremium = 175
                    var policyFee = 100
                    $("#policyFeePremiumCost").html("$" + policyFee);
                }

                else if (eventDaysValue > 3) {
                    additionalDaysCost = 50
                    additionalDays = eventDaysValue - 3
                    totalPremium = additionalDaysCost * additionalDays + 150
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
            }
            else if (riskChosen === "Concessionaires Food Sales") {
                if (eventDaysValue <= 3) {
                    totalPremium = 200
                    var policyFee = 100
                    $("#policyFeePremiumCost").html("$" + policyFee);
                }
                else if (eventDaysValue > 3) {
                    additionalDaysCost = 50
                    additionalDays = eventDaysValue - 3
                    totalPremium = additionalDaysCost * additionalDays + 150
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
            }
            else if (riskChosen === "Attractions / Performers") {
                if (eventDaysValue <= 3) {
                    totalPremium = 150
                    var policyFee = 100
                    $("#policyFeePremiumCost").html("$" + policyFee);
                }
                else if (eventDaysValue > 3) {
                    additionalDaysCost = 50
                    additionalDays = eventDaysValue - 3
                    totalPremium = additionalDaysCost * additionalDays + 150
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
            }
            $("#commercialGeneralLiabilityPremiumCost").html("$" + totalPremium);
        }
    }
    else if (separatePolicy == "No") {
        if (numberOfExhibitors.length > 0 && eventDays.length > 0) {
            var numberOfExhibitorsValue = parseFloat(numberOfExhibitors)
            var eventDaysValue = parseFloat(eventDays)
            var rateValue = parseFloat(rate)

            if (riskChosen === "Exhibitor") {

                ratePerDay = rateValue * numberOfExhibitorsValue
                alert("stepONE" + rateValue)
                alert("stepTWO" + eventDaysValue)
                alert("stepTHREE" + numberOfExhibitorsValue)

                alert("stepFOUR" + ratePerDay)
                if (ratePerDay > 300) {
                    ratePerDay = 300
                    totalPremium = ratePerDay * eventDaysValue
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }

                }
                else if (ratePerDay < 300) {
                    totalPremium = ratePerDay * eventDaysValue
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
            }
            else if (riskChosen === "Concessionaires Non Food Sales") {

                ratePerDay = rateValue * numberOfExhibitorsValue

                if (ratePerDay > 425) {
                    ratePerDay = 425
                    totalPremium = ratePerDay * eventDaysValue
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
                else if (ratePerDay < 425) {
                    totalPremium = ratePerDay * eventDaysValue
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
            }
            else if (riskChosen === "Concessionaires Food Sales") {

                ratePerDay = rateValue * numberOfExhibitorsValue

                if (ratePerDay > 475) {
                    ratePerDay = 475
                    totalPremium = ratePerDay * eventDaysValue
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
                else if (ratePerDay < 475) {
                    totalPremium = ratePerDay * eventDaysValue
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
            }
            else if (riskChosen === "Attractions / Performers") {

                ratePerDay = rateValue * numberOfExhibitorsValue

                if (ratePerDay > 950) {
                    ratePerDay = 950
                    totalPremium = ratePerDay * eventDaysValue
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
                else if (ratePerDay < 950) {
                    totalPremium = ratePerDay * eventDaysValue
                    if (totalPremium < 250) {
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                    else if (totalPremium >= 250) {
                        var policyFee = 50
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                }
            }
        }
    }
    return totalPremium;
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
function getLiquorPremium(totalPremiumLiquor) {

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
    liquorSale = tempLiquorSale.replace('$', '').replace(',', '')
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
function getTotalPremium(premium) {

    totalPremium = 0;

    $(".effectsTotal").each(function () {
        if ($(this).html().length > 0) {
            var tempVal = parseFloat($(this).html().replace('$', ''));
            // var totalPremiumValue = parseFloat $(this)
            totalPremium = totalPremium + tempVal
            // alert (totalPremium)
        }

    });
    return totalPremium
}

function sendSubmissiontoAIM() {
    // //IN GSP file
    // //<input class="form-control" type="text" placeholder = "Zip Code" name="zipCodeMailing" id="zipCodeMailing" required="required" />
    //
    // //GET value
    // //$('#zipCodeMailing').value();
    //
    // //Put it in a data map
    // //data["zipCode"] = $('#zipCodeMailing').value();
    //
    // //CALL ASYNC saveSubmissionToAIM method
    // $.ajax({
    //     method: "POST",
    //     url: "/Async/saveSubmissionToAIM",
    //     data: {
    //         riskType: !!!!!!!!!,
    //         totalGrossBudget: !!!!!!!!!!,
    //         proposedTermLength: $("#proposedTermLength").val(),
    //         namedInsured: $('#namedInsured').val(),
    //         coverageCodes: coverageCodes,
    //         questionAnswerMap: JSON.stringify(autoSaveMap),
    //         uwQuestionsMap: JSON.stringify(uwQuestionsMap),
    //         uwQuestionsOrder: uwQuestionsOrder.join("&;&"),
    //         jsonSerial: JSON.stringify(data),
    //         BORrequested: BORrequested
    //     }
    // })
    // .done(function(msg) {
    //     //alert(msg);
    //     //0620584,0620585
    //     if (!msg.startsWith("Error")) {
    //         newSubmissionConfirmParam = msg;
    //         //console.log("UPLOADING FILES");
    //         //ATTACH FILES
    //         var bioFile = $('#bioFile').get(0).files[0];
    //         var lossesFile = $('#lossesFile').get(0).files[0]
    //         var pyroFile = $('#pyroFile').get(0).files[0];
    //         var stuntsFile = $('#stuntsFile').get(0).files[0];
    //         //var animalPDF = $('#animalPDF').get(0).files[0];
    //         //var dronePDF = $('#dronePDF').get(0).files[0];
    //         var doodFile = $('#doodFile').get(0).files[0];
    //         var treatmentFile = $('#treatmentFile').get(0).files[0];
    //         var budgetFile = $('#budgetFile').get(0).files[0];
    //         var quoteIDs = msg;
    //
    //         if (bioFile || lossesFile || pyroFile || stuntsFile || doodFile || treatmentFile || budgetFile) {
    //             $('.progress-bar').attr('aria-valuenow', "75").animate({
    //                 width: "75%"
    //             }, 2000);
    //             var formData = new FormData();
    //             formData.append('bioFile', bioFile);
    //             formData.append('lossesFile', lossesFile);
    //             formData.append('pyroFile', pyroFile);
    //             formData.append('stuntsFile', stuntsFile);
    //             //formData.append('animalPDF', stuntsFile);
    //             //formData.append('dronePDF', stuntsFile);
    //             formData.append('doodFile', doodFile);
    //             formData.append('treatmentFile', treatmentFile);
    //             formData.append('budgetFile', budgetFile);
    //             formData.append('quoteIDs', quoteIDs);
    //
    //             $.ajax({
    //                     method: "POST",
    //                     url: "/async/ajaxAttach",
    //                     data: formData,
    //                     cache: false,
    //                     contentType: false,
    //                     processData: false
    //                 })
    //                 .done(function(msg) {
    //                     //console.log("Finished Uploading");
    //                     $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
    //                     $('#progressBarModal').modal('hide');
    //
    //                     //CLEAR AUTOSAVE INFO
    //                     autoSaveMap = {};
    //                     Cookies.remove('autosaveData');
    //
    //                     //REDIRECT TO SAVE SUCCESSFUL PAGE
    //                     window.location.href = "./../main/newSubmissionConfirm.gsp?submissionID=" + newSubmissionConfirmParam;
    //
    //                 });
    //         } else {
    //             //console.log ("REDIRECTING");
    //             $('.progress-bar').attr('aria-valuenow', "100").animate({
    //                 width: "100%"
    //             }, 2000);
    //             $('#progressBarModal').modal('hide');
    //
    //             //CLEAR AUTOSAVE INFO
    //             autoSaveMap = {};
    //             Cookies.remove('autosaveData');
    //
    //             //REDIRECT TO SAVE SUCCESSFUL PAGE
    //             window.location.href = "./../main/newSubmissionConfirm.gsp?submissionID=" + newSubmissionConfirmParam;
    //         }
    //     } else {
    //         $('#progressBarModal').modal('hide');
    //         alert(msg)
    //     }
    //
    //
    // });
}
