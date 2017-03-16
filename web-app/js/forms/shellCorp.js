// VARIABLES FOR SHELL CORP
// VARIABLES FOR SHELL CORP
var riskChosen;

var attendance
var totalPremium
var totalPremium5Below
var totalPremium6Above
var rate
var eventDays
var minimumPremium
var brokerFee

// TOTAL SALES
var totalSale
var commercialTotal
var alcoholTotal


$(document).ready(function () {
// alert("more bananananas")
    if ($("li.active").length > 0) {
        riskChosen = getRiskTypeChosen();
    }
    else {
        alert("bananas")
    }
    console.log(riskChosen)

    // MONEY FORMAT
    $('.alcoholSales').maskMoney({prefix:'$', precision:"0"});
    $('.equipmentLimit').maskMoney({prefix:'$', precision:"0"});
    $('.brokerFeeInput').maskMoney({prefix:'$', precision:"0"});
    $('.costVehicles').maskMoney({prefix:'$', precision:"0"});
    $('.totalReceipts').maskMoney({prefix:'$', precision:"0"});
    $('.totalPayroll').maskMoney({prefix:'$', precision:"0"});

// TOTAL PREMIUM COST !@#

// COMMERCIAL GENERAL LIABILITY FEE
    $(document.body).on('change', "#estimatedTotalAttendance,#howManyDaysIsTheEvent", function () {
        attendance = $("#estimatedTotalAttendance").val()
        // alert(attendance)
        eventDays = $("#howManyDaysIsTheEvent").val()
        // alert (eventDays)
        if (attendance.length > 0 && eventDays.length > 0) {
            var attendanceValue = parseFloat(attendance)
            var eventDaysValue = parseFloat(eventDays)
            var rateValue = parseFloat(rate)
            // alert (attendanceValue)
            // alert (eventDaysValue)
            // alert (rateValue)
            if (eventDaysValue < 6) {

                totalPremium5Below = attendanceValue * rateValue
                // alert("First: " + totalPremium5Below)
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

            else if (eventDaysValue > 5) {
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
            $("#commercialGeneralLiabilityPremiumCost").html("$" + totalPremium);
        }
        // alert("LAST: " + totalPremium)




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

// POLICY FEE
    $(document.body).on('change', "#estimatedTotalAttendance,#howManyDaysIsTheEvent", function () {
        var policyFee = 25
        $("#policyFeePremiumCost").html("$" + policyFee);
    });

// TOTAL SALES
    $(document.body).on('change', ".effectsTotalPremium", function () {
        totalPremium = 0;

        $(".eventPremiumSpan").each(function() {
            if($(this).html().length > 0 ){
                var tempVal = parseFloat($(this).html().replace('$',''));
                // var totalPremiumValue = parseFloat $(this)
                totalPremium = totalPremium + tempVal
                alert (totalPremium)
            }

        });
        $("#totalSalePremiumCost").html("$" + totalPremium);
        // alert (totalPremium)

    });

// TOTAL PREMIUM COST !@#






// COMPREHENSIVE PERSONAL LIABILITY (CPL) / ADDITIONAL
    $(document.body).on('change', 'input[name="comprehensivePersonalLiabilityRequested"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#cplAddressContainer").css('display', "");
            $("#cplAddressExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#cplAddressContainer").css('display', "none");
            $("#cplAddressExplain").css('display', "none");
        }
    });

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

// PHONE NUMBER FORMAT
    $(document.body).on('focus', '.phoneNumberMask' ,function(){
        //this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3');
        //alert ("OK");
        $(".phoneNumberMask").mask("(999) 999-9999");
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

// DOGS BREED ADDITIONAL QUESTION
    $(document.body).on('change', 'input[name="doesApplicantHaveDogs"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#dogsContainer").css('display', "");
            $("#dogsExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#dogsContainer").css('display', "none");
            $("#dogsExplain").css('display', "none");
        }
    });



})
;