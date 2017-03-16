// VARIABLES FOR SPECIAL EVENTS RATING
// VARIABLES FOR SPECIAL EVENTS RATING
var riskChosen;

var attendance
var totalPremium
var rate
var eventDays
var minimumPremium
var brokerFee

// TOTAL SALES
var totalSale
var commercialTotal
var alcoholTotal


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


var liquorRate
var liquorRatePremium
var liquorSale
var liquorTotalPremium
var liquorMinimumPremium
var liquorTotalPremiumBelow25000
var liquorTotalPremiumAbove25000
// VARIABLES FOR SPECIAL EVENTS RATING
// VARIABLES FOR SPECIAL EVENTS RATING


// ALCOHOL PREMIUMS

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

// STATE SELECT
    $("#selectState").change(function () {
        var state = this.value;
        // });
        // $(document.body).on('change', 'input[name="selectState"]', function () {
        //     alert(state)
        if (state ==  "DE" ||
            state ==   "KS" ||
            state ==   "MD" ||
            state ==   "NV" ||
            state ==   "SD" ||
            state ==   "VA") {
            liquorRate = 8
        }
        else if (state == "AR" ||
            state ==   "CA" ||
            state ==   "CO" ||
            state ==   "FL" ||
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
            liquorRate = 12
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
            state ==   "UT" ||
            state ==   "WA") {
            liquorRate = 14
        }
        else if (state ==  "DC" ||
            state ==   "IA" ||
            state ==   "PA" ||
            state ==   "WV") {
            liquorRate = 15
        }
        else if (state ==  "AL" ||
            state ==   "VT") {
            liquorRate = 50
        }
        else if (state ==  "AK" ||
            state ==   "CT" ||
            state ==   "NH" ||
            state ==   "HI") {
            alert ("NOT ELIGIBLE STATE")
        }
        // alert ("LIQUOR RATE:" + liquorRate)
    });

// BROKER FEE
    $(document.body).on('change', "#brokerFeeInput", function () {
        brokerFee = $("#brokerFeeInput").val()
        // alert(attendance)

        brokerFee = brokerFee.replace('$','')

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

// ALCOHOL FEE
    $(document.body).on('change', "#alcoholSales", function () {

        var tempLiquorSale = $("#alcoholSales").val()
        eventDays = $("#howManyDaysIsTheEvent").val()
        attendance = $("#estimatedTotalAttendance").val()

        // alert("Step2" + liquorSale) removes $ from val
        liquorSale = tempLiquorSale.replace('$','').replace(',', '')
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
            // $("#alcoholSalePremiumCost").html("$" + liquorTotalPremium);
        }
        $("#alcoholSalePremiumCost").html("$" + liquorTotalPremium);
    });

// TOTAL SALES
    $(document.body).on('change', ".effectsTotalPremium", function () {
        totalPremium = 0;

        $(".eventPremiumSpan").each(function() {
            if($(this).html().length > 0 ){
                var tempVal = parseFloat($(this).html().replace('$',''));
                // var totalPremiumValue = parseFloat $(this)
                totalPremium = totalPremium + tempVal
                // alert (totalPremium)
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
    
// ALCOHOL TABLE / ADDITIONAL HIDDEN QUESTION / PREMIUMS
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


})
