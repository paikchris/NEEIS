// VARIABLES FOR EXHIBITOR RATING
// VARIABLES FOR EXHIBITOR RATING
var exhibitorRate

var riskChosen;
var attendance
var totalPremium
var rate
var exhibitorRate = 55
var concessionairesNoFoodRate = 80
var concessionairesFoodRate = 90
var attractionRate = 185
var eventDays
var brokerFee
var ratePerDay

// TOTAL SALES
var totalSale
var commercialTotal

// ALCOHOL PREMIUMS
// $25,000 and below
var liquorMinimum100Below25000 = 100
var liquorMinimum500Below25000 = 225
var liquorMinimum1500Below25000 = 375
var liquorMinimum3000Below25000 = 550
var liquorMinimum5000Below25000 = 750
var liquorMinimum5001Below25000 = 1000

// 25,000 and above
var liquorMinimum10Above25000 = 100
var liquorMinimum20Above25000 = 250
var liquorMinimum31Above25000 = 750
var liquorMinimum45Above25000 = 800
var liquorMinimum60Above25000 = 900
var liquorMinimum75Above25000 = 2500

var liquorRate
var liquorRatePremium
var liquorSale
var liquorTotalPremium
var liquorMinimumPremium
var liquorTotalPremiumBelow25000
var liquorTotalPremiumAbove25000
var alcoholTotal

// SEPARATE POLICY
var additionalDays
var additionalDaysCost
// VARIABLES FOR EXHIBITOR RATING
// VARIABLES FOR EXHIBITOR RATING

$(document).ready(function () {
// alert("more bananananas")
    if ($("li.active").length > 0) {
        riskChosen = getRiskTypeChosen();
    }
    else {
        alert("bananas")
    }
    console.log(riskChosen)


    if (riskChosen === "Exhibitor") {
        rate = exhibitorRate;
        alert(rate)
    }
    else if (riskChosen === "Concessionaires Non Food Sales") {
        rate = concessionairesNoFoodRate;
        alert(rate)
    }
    else if (riskChosen === "Concessionaires Food Sales") {
        rate = concessionairesFoodRate;
        alert(rate)
    }
    else if (riskChosen === "Attractions / Performers") {
        rate = attractionRate;
        alert(rate)
    }


// TOTAL PREMIUM COST !@#

// COMMERCIAL GENERAL LIABILITY FEE + POLICY FEE
    $(document.body).on('change',  "input[name='separatePolicy'],#estimatedTotalAttendance,#howManyDaysIsTheEvent", function () {
        attendance = $("#estimatedTotalAttendance").val()
        eventDays = $("#howManyDaysIsTheEvent").val()
        if ($("input[name='separatePolicy']").attr("value") == "Yes") {
            if (attendance.length > 0 && eventDays.length > 0) {
                var attendanceValue = parseFloat(attendance)
                var eventDaysValue = parseFloat(eventDays)
                var rateValue = parseFloat(rate)

                alert ("stepone" + rateValue)
                alert ("steptwo" + attendanceValue)
                alert ("stepthree" + eventDaysValue)
                if (riskChosen === "Exhibitor") {
                    if (eventDaysValue <= 3){
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
                        else if (totalPremium >= 250){
                            var policyFee = 50
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                    }
                }
                else if (riskChosen === "Concessionaires Non Food Sales") {
                    if (eventDaysValue >= 3) {
                        totalPremium = 175
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                else
                    if (eventDaysValue < 3) {
                        additionalDaysCost = 50
                        additionalDays = eventDaysValue - 3
                        totalPremium = additionalDaysCost * additionalDays + 150
                        if (totalPremium < 250) {
                            var policyFee = 100
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                        else if (totalPremium >= 250){
                            var policyFee = 50
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                    }
                }
                else if (riskChosen === "Concessionaires Food Sales") {
                    if (eventDaysValue >= 3) {
                        totalPremium = 200
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                else
                    if (eventDaysValue < 3) {
                        additionalDaysCost = 50
                        additionalDays = eventDaysValue - 3
                        totalPremium = additionalDaysCost * additionalDays + 150
                        if (totalPremium < 250) {
                            var policyFee = 100
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                        else if (totalPremium >= 250){
                            var policyFee = 50
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                    }
                }
                else if (riskChosen === "Attractions / Performers") {
                    if (eventDaysValue >= 3) {
                        totalPremium = 150
                        var policyFee = 100
                        $("#policyFeePremiumCost").html("$" + policyFee);
                    }
                else
                    if (eventDaysValue < 3) {
                        additionalDaysCost = 50
                        additionalDays = eventDaysValue - 3
                        totalPremium = additionalDaysCost * additionalDays + 150
                        if (totalPremium < 250) {
                            var policyFee = 100
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                        else if (totalPremium >= 250){
                            var policyFee = 50
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                    }
                }

                $("#commercialGeneralLiabilityPremiumCost").html("$" + totalPremium);
            }
        }
        else if ($("input[name='separatePolicy']").attr("value") == "No") {
            if (attendance.length > 0 && eventDays.length > 0) {
                var attendanceValue = parseFloat(attendance)
                var eventDaysValue = parseFloat(eventDays)
                var rateValue = parseFloat(rate)

                if (riskChosen === "Exhibitor") {

                    ratePerDay = rateValue * attendanceValue

                    if (ratePerDay > 300) {
                        ratePerDay = 300
                        totalPremium = ratePerDay * eventDaysValue
                        if (totalPremium < 250) {
                            var policyFee = 100
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                        else if (totalPremium >= 250){
                            var policyFee = 50
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }

                    }
                }
                else if (riskChosen === "Concessionaires Non Food Sales") {

                    ratePerDay = rateValue * attendanceValue

                    if (ratePerDay > 425) {
                        ratePerDay = 425
                        totalPremium = ratePerDay * eventDaysValue
                        if (totalPremium < 250) {
                            var policyFee = 100
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                        else if (totalPremium >= 250){
                            var policyFee = 50
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                    }
                }
                else if (riskChosen === "Concessionaires Food Sales") {

                    ratePerDay = rateValue * attendanceValue

                    if (ratePerDay > 475) {
                        ratePerDay = 475
                        totalPremium = ratePerDay * eventDaysValue
                        if (totalPremium < 250) {
                            var policyFee = 100
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                        else if (totalPremium >= 250){
                            var policyFee = 50
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                    }
                }
                else if (riskChosen === "Attractions / Performers") {

                    ratePerDay = rateValue * attendanceValue

                    if (ratePerDay > 950) {
                        ratePerDay = 950
                        totalPremium = ratePerDay * eventDaysValue
                        if (totalPremium < 250) {
                            var policyFee = 100
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                        else if (totalPremium >= 250){
                            var policyFee = 50
                            $("#policyFeePremiumCost").html("$" + policyFee);
                        }
                    }
                }

                $("#commercialGeneralLiabilityPremiumCost").html("$" + totalPremium);
            }


        }


    });

// BROKER FEE
    $(document.body).on('change', "#brokerFeeInput", function () {
        brokerFee = $("#brokerFeeInput").val()
        // alert(attendance)
        if (brokerFee.length > 0) {
            var brokerFeeValue = parseFloat(brokerFee)
        }
        $("#brokerFeePremiumCost").html("$" + brokerFee);

    });


// ALCOHOL FEE
    $(document.body).on('change', "#alcoholSales", function () {
        liquorSale = $("#alcoholSales").val()
        eventDays = $("#howManyDaysIsTheEvent").val()
        attendance = $("#estimatedTotalAttendance").val()
        // alert ("STEP 1 ALCOHOL PREMIUM")

        if (liquorSale.length > 0) {
            var liquorSaleValue = parseFloat(liquorSale)
            var eventDaysValue = parseFloat(eventDays)
            var attendanceValue = parseFloat(attendance)

            // alert("Step2" + liquorSaleValue)
            // alert("Step2" + eventDaysValue)
            // alert("Step2" + attendanceValue)

            if (eventDaysValue >= 1 && eventDaysValue <= 10) {
                liquorRate = 8
            }
            else if (eventDaysValue >= 11 && eventDaysValue <= 20) {
                liquorRate = 10
            }
            else if (eventDaysValue >= 21 && eventDaysValue <= 31) {
                liquorRate = 12
            }
            else if (eventDaysValue >= 32 && eventDaysValue <= 45) {
                liquorRate = 14
            }
            else if (eventDaysValue >= 46 && eventDaysValue <= 60) {
                liquorRate = 15
            }
            else if (eventDaysValue >= 61 && eventDaysValue <= 75) {
                liquorRate = 50
            }
            else if (eventDaysValue >= 76 && eventDaysValue <= 90) {
                liquorRate = 1
            }

            liquorRatePremium = liquorRate * eventDaysValue

            // alert("Step3a" + liquorRatePremium)
            // alert("Step3b" + eventDaysValue)
            // alert("Step3c" + liquorRate)

            // var liquorRateValue = parseFloat(liquorRate)
            if (liquorSaleValue < 25000) {
                // alert("1Step" + liquorSaleValue)

                if (attendanceValue >= 1 && attendanceValue <= 100) {

                    liquorMinimumPremium = liquorMinimum100Below25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                    // alert("2Step" + liquorRatePremium)
                    // alert("3Step" + liquorMinimumPremium)
                    // alert("4Step" + attendanceValue)
                }
                else if (attendanceValue >= 101 && attendanceValue <= 500) {

                    liquorMinimumPremium = liquorMinimum500Below25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (attendanceValue >= 501 && attendanceValue <= 1500) {

                    liquorMinimumPremium = liquorMinimum1500Below25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (attendanceValue >= 1501 && attendanceValue <= 3000) {

                    liquorMinimumPremium = liquorMinimum3000Below25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (attendanceValue >= 3001 && attendanceValue <= 5000) {

                    liquorMinimumPremium = liquorMinimum5000Below25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (attendanceValue >= 5001) {

                    liquorMinimumPremium = liquorMinimum5001Below25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
            }
            else if (liquorSaleValue > 25000) {
                if (eventDaysValue >= 6 && eventDaysValue <= 10) {
                    liquorMinimumPremium = liquorMinimum10Above25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (eventDaysValue >= 11 && eventDaysValue <= 20) {
                    liquorMinimumPremium = liquorMinimum20Above25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (eventDaysValue >= 21 && eventDaysValue <= 31) {
                    liquorMinimumPremium = liquorMinimum31Above25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (eventDaysValue >= 32 && eventDaysValue <= 45) {
                    liquorMinimumPremium = liquorMinimum45Above25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (eventDaysValue >= 46 && eventDaysValue <= 60) {
                    liquorMinimumPremium = liquorMinimum60Above25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (eventDaysValue >= 61 && eventDaysValue <= 75) {
                    liquorMinimumPremium = liquorMinimum75Above25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }
                else if (eventDaysValue >= 76 && eventDaysValue <= 90) {
                    liquorMinimumPremium = liquorMinimum90Above25000
                    if (liquorMinimumPremium < liquorRatePremium) {
                        liquorTotalPremium = liquorRatePremium
                    }
                    else if (liquorMinimumPremium > liquorRatePremium) {
                        liquorTotalPremium = liquorMinimumPremium
                    }

                }

            }
            // alert("5Step" + liquorMinimumPremium)
            // alert("6Step" + liquorRatePremium)
            // alert("7Step" + liquorTotalPremium)
            $("#alcoholSalePremiumCost").html("$" + liquorTotalPremium);
        }

    });

// TOTAL SALES
    $(document.body).on('change', ".effectsTotalPremium", function () {
        totalPremium = 0;

        $(".eventPremiumSpan").each(function () {
            if ($(this).html().length > 0) {
                var tempVal = parseFloat($(this).html().replace('$', ''));
                // var totalPremiumValue = parseFloat $(this)
                totalPremium = totalPremium + tempVal
                alert(totalPremium)
            }

        });
        $("#totalSalePremiumCost").html("$" + totalPremium);
        // alert (totalPremium)

    });

// TOTAL PREMIUM COST !@#






// CGL TABLE
    $(document.body).on('change', 'input[name="commercialGeneralLiabilityRequested?"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#commercialGeneralLiabilityRequestedContainer").css('display', "");
            $("#commercialGeneralLiabilityRequestedExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#commercialGeneralLiabilityRequestedContainer").css('display', "none");
            $("#commercialGeneralLiabilityRequestedExplain").css('display', "none");
        }
    });

//WORK COMP TABLE / ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="workCompCoverageRequested?"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#workCompCoverageRequestedContainer").css('display', "");
            $("#workCompCoverageRequestedExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#workCompCoverageRequestedContainer").css('display', "none");
            $("#workCompCoverageRequestedExplain").css('display', "none");
        }
    });

// AUTO LIABILITY TABLE / ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="autoLiability"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $(".costRentedVehiclesContainer").css('display', "");
            $(".costRentedVehiclesExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $(".costRentedVehiclesContainer").css('display', "none");
            $(".costRentedVehiclesExplain").css('display', "none");
        }
    });

// UMBRELLA TABLE
    $(document.body).on('change', 'input[name="umbrellaLimitRequested"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#umbrellaLimitRequestedContainer").css('display', "");
            $("#umbrellaLimitRequestedExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#umbrellaLimitRequestedContainer").css('display', "none");
            $("#umbrellaLimitRequestedExplain").css('display', "none");
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



});