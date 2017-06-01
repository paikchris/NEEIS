// VARIABLES FOR EXHIBITOR RATING
// VARIABLES FOR EXHIBITOR RATING
var numberOfExhibitors

var riskChosen;
var totalPremium
var brokerFee
var ratePerDay
var NumberOfExhibitor
var liquorRate
var CGLPremium
var brokerPremium
var liquorPremium
var totalPremiumTotal
var riskRate

// GLOBAL VARIABLE USED IN newSubmission
var minimumPremium
var attendance
var rate
var eventDays
var liquorMinimumPremium
var liquorTotalPremium
var liquorRatePremium
var lrate
var temptermLenghtDays
var termLenghtDays
var limit
var miscMinimum
var riskClass




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
        // alert("bananas")
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
            $(".commercialGeneralLiabilityPremiumCost").html("$" + CGLPremium);
            $("#termsInsert").css('display', "");
            $("#endorseInsert").css('display', "");
            getFinalTotalPremium()
        }
    });


// ALCOHOL PREMIUM
    $(document.body).on('change', "#alcoholSales", function () {
        var totalPremiumLiquor
        liquorPremium = getLiquorPremium(totalPremiumLiquor)
        $("#alcoholSalePremiumCost").html("$" + liquorPremium);
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
            var alcoholTotalPercent = alcoholPercentage(totalPercent)
            if (alcoholTotalPercent == 100) {
                // alert("good")
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
                    // $("#whatKindOfLiquorIsServedFullBar").html().replace('','0')
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
// INSURED INFO CONTAINERS
// Y/N EVENT OUTDOORS CONTAINER ADDITIONAL QUESTION
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
// Y/N EVACUATION PLAN CONTAINER ATTACHMENT
    $(document.body).on('change', 'input[name="evacuationFormalPlan"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#evacuationAttachContainer").css('display', "");
            $("#evacuationAttachExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#evacuationAttachContainer").css('display', "none");
            $("#evacuationAttachExplain").css('display', "none");
        }
    });
// Y/N BODIES OF WATER CONTAINER ADDITIONAL QUESTION
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
// Y/N WATER HAZARD FENCED CONTAINER ADDITIONAL QUESTION
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
// Y/N FENCED CONTAINER ADDTIONAL QUESTION
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
// Y/N SEATING AND STAGE CONTAINER ATTACHMENT
    $(document.body).on('change', 'input[name="independentFirmStageSeating"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#stageSeatingAttachContainer").css('display', "");
            $("#waterHazardNotFencedExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#stageSeatingAttachContainer").css('display', "none");
            $("#waterHazardNotFencedExplain").css('display', "none");
        }
    });
// Y/N PARTICIPANT ACCIDENT MEDICAL COVERAGE IN PLACE CONTAINER ATTACHMENT
    $(document.body).on('change', 'input[name="pamc"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#pamcAttachContainer").css('display', "");
            $("#pamcAttachExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#pamcAttachContainer").css('display', "none");
            $("#pamcAttachExplain").css('display', "none");
        }
    });
// Y/N VOLUNTEER SIGN WAIVER CONTAINER ATTACHMENT
    $(document.body).on('change', 'input[name="signingVolunteersWaivers"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#volunteerAttachContainer").css('display', "");
            $("#volunteerAttachExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#volunteerAttachContainer").css('display', "none");
            $("#volunteerAttachExplain").css('display', "none");
        }
    });

// RISK SPECIFIC INFO CONTAINERS
// Y/N RISK HAZARD QUESTION
    $(document.body).on('change', '.riskHazard', function () {
        if ($(".riskHazard").is(':checked')) {
            alert("Due to the risk hazards of this event, the indication provided in the previous page is no longer valid. Please proceed with entering all the information requested following this notification and an underwriter will be contacting you shortly. Please note, we may not be able to offer terms based on additional information received")
        }
    });
// CHECKBOX HAZARDOUS CONTAINER ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', '#amusementCheckbox', function () {
        if ($("#amusementCheckbox").is(':checked')) {
            $('.hazardousContainer').css("display", "");
            $(".typeAmusement").addClass("showReview");
        }
        else {
            $('.hazardousContainer').css("display", "none");
            $(".typeAmusement").removeClass("showReview");
        }
    });
// CHECKBOX PYROTECH CONTAINER ATTACHMENT
    $(document.body).on('change', '#pyrotechnicsCheckbox', function () {
        if ($("#pyrotechnicsCheckbox").is(':checked')) {
            $('#pyrotechnicsAttachContainer').css("display", "");
        }
        else {
            $('#pyrotechnicsAttachContainer').css("display", "none");

        }
    });
// CHECKBOX STUNTS HAZARDOUS CONTAINER EVENTS ATTACHMENT
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
// SELECT SECURITY CONTAINER ADDITIONAL QUESTION
    $('#securityType').change(function () {
        // $(document.body).on('change', '#securityType' ,function () {
        var option = $(this).find('option:selected').val();
        // alert(option);
        if (option == "Unarmed Security" ||
            option == "Armed Security" ||
            option == "Other Security") {
            $("#securityContainer").css('display', "");
            $("#securityExplain").css('display', "");
            $(".securityGuards").addClass("showReview");
        }
        if (option == "invalid") {
            $("#securityContainer").css('display', "none");
            $("#securityExplain").css('display', "none");
            $(".securityGuards").removeClass("showReview");
        }
    });
// Y/N SECURITY INDEPENDENT CONTAINER ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="independentFirmSecurity"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#securityIndependentContainer").css('display', "");
            $("#securityIndependentExplain").css('display', "");
            $(".securityDetails").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#securityIndependentContainer").css('display', "none");
            $("#securityIndependentExplain").css('display', "none");
            $(".securityDetails").removeClass("showReview");
        }
    });
// SELECT MEDICAL CONTAINER ADDITIONAL QUESTION
    $('#firstAidType').change(function () {
        // $(document.body).on('change', '#securityType' ,function () {
        var option = $(this).find('option:selected').val();
        // alert(option);
        if (option == "City Paramedics" ||
            option == "Venue Staff" ||
            option == "Other First Aid") {
            $("#medicalContainer").css('display', "");
            $("#medicalExplain").css('display', "");
            $(".medicalselected").addClass("showReview");
        }
        if (option == "invalid") {
            $("#medicalContainer").css('display', "none");
            $("#medicalExplain").css('display', "none");
            $(".medicalselected").removeClass("showReview");
        }
    });
// Y/N MEDICAL INDEMNIFIED CONTAINER ATTACHMENT
    $(document.body).on('change', 'input[name="medicalIndemnified"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#medicalAttachContainer").css('display', "");
            $("#medicalAttachExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#medicalAttachContainer").css('display', "none");
            $("#medicalAttachExplain").css('display', "none");
        }
    });
// Y/N MEDICAL OFF SITE CONTAINER ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="emtOutsideOnsite"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#medicalOffSiteContainer").css('display', "");
            $("#medicalOffSiteExplain").css('display', "");
            $(".responseTimeEMT").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#medicalOffSiteContainer").css('display', "none");
            $("#medicalOffSiteExplain").css('display', "none");
            $(".responseTimeEMT").removeClass("showReview");
        }
    });
// Y/N MEDICAL EMPLOYEES CONTAINER ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="emtEmployees"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#medicalNotEmployeesContainer").css('display', "none");
            $("#medicalNotEmployeesExplain").css('display', "none");
            $(".medicalEmployeeNo").removeClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#medicalNotEmployeesContainer").css('display', "");
            $("#medicalNotEmployeesExplain").css('display', "");
            $(".medicalEmployeeNo").addClass("showReview");
        }
    });
// Y/N OVERNIGHT EVENTS CONTAINER ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="overnight"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#overnightContainer").css('display', "");
            $("#overnightExplain").css('display', "");
            $(".camperReview").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#overnightContainer").css('display', "none");
            $("#overnightExplain").css('display', "none");
            $(".camperReview").removeClass("showReview");
        }
    });
// Y/N OVERNIGHT SECURITY CAMPER CONTAINER ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="overnightSecurity"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#overnightSecurityContainer").css('display', "");
            $("#overnightSecurityExplain").css('display', "");
            $(".overnightSecurityReview").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#overnightSecurityContainer").css('display', "none");
            $("#overnightSecurityExplain").css('display', "none");
            $(".overnightSecurityReview").removeClass("showReview");
        }
    });
// SELECT PARKING CONTAINER ADDITIONAL QUESTION
    $('#parkingType').change(function () {
        // $(document.body).on('change', '#securityType' ,function () {
        var option = $(this).find('option:selected').val();
        // alert(option);
        if (option == "Dirt" ||
            option == "Gravel" ||
            option == "Pathway" ||
            option == "Unpaved" ||
            option == "Other") {
            $("#parkingMainContainer").css('display', "");
            $("#parkingMainExplain").css('display', "");
            $(".parkingReview").addClass("showReview");
        }
        if (option == "invalid") {
            $("#parkingMainContainer").css('display', "none");
            $("#parkingMainExplain").css('display', "none");
            $(".parkingReview").removeClass("showReview");
        }
    });
// Y/N PARKING CONTAINER ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="responsibleForParking"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#parkingContainer").css('display', "none");
            $("#parkingExplain").css('display', "none");
            $(".parkingIndemnifiedReview").removeClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#parkingContainer").css('display', "");
            $("#parkingExplain").css('display', "");
            $(".parkingIndemnifiedReview").addClass("showReview");
        }
    });
// Y/N PARKING CONTAINER ATTACHMENT
    $(document.body).on('change', 'input[name="parkingIndemnified"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#parkingAttachContainer").css('display', "");
            $("#parkingAttachExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#parkingAttachContainer").css('display', "none");
            $("#parkingAttachExplain").css('display', "none");
        }
    });
// Y/N WEATHER CONTAINER ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="weather"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#weatherContainer").css('display', "");
            $("#weatherExplain").css('display', "");
            $(".weatherReview").addClass("showReview");
        }
        if ($(this).attr("value") == "No") {
            $("#weatherContainer").css('display', "none");
            $("#weatherExplain").css('display', "none");
            $(".weatherReview").removeClass("showReview");
        }
    });
// YES NO CHECK BOX HIDDEN QUESTIONS / TABLES

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
        // $(document.body).on('change', '#securityType' ,function () {
        var option = $(this).find('option:selected').val();
        // alert(option);
        if (option == "additional") {
            $(".premiumGeneralAggregate").addClass("effectsTotal");
            $(".premiumGeneralAggregate").html("$" + "250");
            additionalCLGPremiums()

        }
        if (option == "standard") {
            $(".premiumGeneralAggregate").removeClass("effectsTotal");
            $(".premiumGeneralAggregate").html("");
            additionalCLGPremiums()
        }
    });
// PRODUCT AND COMPLETED OPERATION LIMIT
    $('.limitProductAndCompletedOperations').change(function () {
        // $(document.body).on('change', '#securityType' ,function () {
        var option = $(this).find('option:selected').val();
        // alert(option);
        if (option == "additional") {
            $(".premiumProductAndCompletedOperations").html("$" + "250");
            $(".premiumProductAndCompletedOperations").addClass("effectsTotal");
            additionalCLGPremiums()
        }
        if (option == "standard") {
            $(".premiumProductAndCompletedOperations").html("");
            $(".premiumProductAndCompletedOperations").removeClass("effectsTotal");
            additionalCLGPremiums()
        }
    });
// PREMISES DAMAGE LIMIT
    $('.limitPremisesDamage').change(function () {
        // $(document.body).on('change', '#securityType' ,function () {
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
            $(".premiumPremisesDamage").html("");
            additionalCLGPremiums()
        }
    });
// MEDICAL LIMIT
    $('.limitMedicalExpenses').change(function () {
        // $(document.body).on('change', '#securityType' ,function () {
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

})
;


function riskTypeRate(riskRate) {

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
// TRIGGERS ADDITIONAL CGL PREMIUM INCREASE FOR ADDITIONAL LIMIT
function additionalCLGPremiums() {
    var PremiumCGL = getCGLTotalPremium()
    $("#commercialGeneralLiabilityPremiumCost").html("$" + PremiumCGL);
    getFinalTotalPremium()
    console.log(PremiumCGL + "ADDING ADDITIONAL CGL PREMIUM")
}
// CALCULATES CGL + ADDITIONAL CGL PREMIUMS
function getCGLTotalPremium() {

    var checkCGLPremium = 0
    checkCGLPremium = getCGLPremium()
    // alert(checkCGLPremium + "TWO")

    $('div#commercialGeneralLiabilityRequestedContainer div.premiumColumn span.effectsTotal').each(function() {
        if ($(this).html().length > 0) {
            var tempCoverage = parseFloat($(this).html().replace('$', '').replace(/,/g, ''));
            checkCGLPremium = checkCGLPremium + tempCoverage
        }
    });
    return checkCGLPremium
}




// TOTAL PREMIUM
// TRIGGERS CHANGE IN TOTAL PREMIUM
function getFinalTotalPremium() {

    attendance = $("#estimatedTotalAttendance").val()
    eventDays = $("#howManyDaysIsTheEvent").val()
    var attendanceValue = parseFloat(attendance)
    var eventDaysValue = parseFloat(eventDays)
    // var rateValue = parseFloat(rate)
    if (attendance.length > 0 && eventDays.length > 0) {
        var totalPremiumTotal = 0
        totalPremiumTotal = getTotalPremium()
        $("#totalSalePremiumCost").html("$" + totalPremiumTotal);
    }
}
// CALCULATES TOTAL PREMIUM TOTAL
function getTotalPremium() {

    var totalCoveragePremium = 0
    console.log("prior to total cycle" + totalCoveragePremium)

    $('div#premiumDistDivContainer div.premDistributionInsert span.effectsTotalPremium').each(function() {
        if ($(this).html().length > 0) {
            var tempVal = parseFloat($(this).html().replace('$', '').replace(/,/g, ''));
            // var totalPremiumValue = parseFloat $(this)
            console.log("cycle" + $(this))
            console.log("cycle" + tempVal)
            console.log("cycle" + totalCoveragePremium)
            totalCoveragePremium = totalCoveragePremium + tempVal
            // alert (totalPremium)
        }
    });
    // alert("TOTALCOVERAGE" + totalCoveragePremium)
    return totalCoveragePremium
}



// ADDITIONAL COVERAGES OPTIONAL ADD ONS TO CGL PREMIUM
// CALCULATES LIQUOR PREMIUM TOTAL
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

    var liquorSale
    var liquorTotalPremiumBelow25000
    var liquorTotalPremiumAbove25000
// ALCOHOL PREMIUMS


    var tempLiquorSale = $("#alcoholSales").val()
    eventDays = $("#howManyDaysIsTheEvent").val()
    attendance = $("#estimatedTotalAttendance").val()

    // alert("Step2" + liquorSale) removes $ from val
    liquorSale = tempLiquorSale.replace('$', '').replace(/,/g, '')

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
// LIQUOR RATE PER STATE
function setStateRate(state) {
    lrate = 0;
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
        state == "UT") {
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
        state == "DC" ||
        state == "FL" ||
        state == "NH" ||
        state == "WA" ||
        state == "HI") {
        alert("STATE NOT ELIGIBLE FOR LIQUOR COVERAGE")
    }

    return lrate;


}
// CALCULATES MISCELLANEOUS EQUIPMENT DEDUCTIBLE
function getMiscellaneousEquipmentDeductible() {
    var tempMiscellaneousDeductible = $("#limitMiscellaneous").val()
    tempMiscellaneousDeductible = tempMiscellaneousDeductible.replace('$', '').replace(/,/g, '')
    var miscellaneousDeductible = parseInt(tempMiscellaneousDeductible)

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
    var inlandRate = 0
    var eventDay = parseFloat($("#howManyDaysIsTheEvent").val());
    var tempMiscellaneousLimit = $("#limitMiscellaneous").val()
    tempMiscellaneousLimit = tempMiscellaneousLimit.replace('$', '').replace(/,/g, '')
    var tempLimit = parseFloat(tempMiscellaneousLimit)
    micsMinimum = 0

    if ($("#miscUsaCheckbox").is(':checked')) {
        if (eventDay > 0 && eventDay <= 30) {
            miscMinimum = 100
            var tempDividedLimit = tempLimit / 100
            limit = 0
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
            var tempDividedLimit = tempLimit / 100
            limit = 0
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
            var tempDividedLimit = tempLimit / 100
            limit = 0
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
            var tempDividedLimit = tempLimit / 100
            limit = 0
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
    var eventDay = parseFloat($("#howManyDaysIsTheEvent").val());
    if (eventDay > 0 && eventDay <= 30) {
        var premiumThirdParty = 420
        var deductibleThirdParty = 2500
        $(".premiumThirdParty").html("$" + premiumThirdParty);
        $(".deductibleThirdParty").html("$" + deductibleThirdParty);
        $(".premiumThirdParty").addClass("effectsTotal");
        additionalCLGPremiums()
    }
    else if (eventDay > 31 && eventDay <= 60) {
        var premiumThirdParty = 820
        $(".premiumThirdParty").html("$" + premiumThirdParty);
        $(".deductibleThirdParty").html("$" + deductibleThirdParty);
        $(".premiumThirdParty").addClass("effectsTotal");
        additionalCLGPremiums()
    }
    else if (eventDay > 61 && eventDay <= 90) {
        var premiumThirdParty = 1235
        $(".premiumThirdParty").html("$" + premiumThirdParty);
        $(".deductibleThirdParty").html("$" + deductibleThirdParty);
        $(".premiumThirdParty").addClass("effectsTotal");
        additionalCLGPremiums()
    }
}


// BROKER FEE
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
// MASKS INPUT INTO MONEY FORMAT
function inputMoneyFormat() {
// MONEY FORMAT
    $('.alcoholSales').maskMoney({prefix: '$', precision: "0"});
    $('.equipmentLimit').maskMoney({prefix: '$', precision: "0"});
    $('.brokerFeeInput').maskMoney({prefix: '$', precision: "0"});
    $('.costVehicles').maskMoney({prefix: '$', precision: "0"});
    $('.totalReceipts').maskMoney({prefix: '$', precision: "0"});
    $('.totalPayroll').maskMoney({prefix: '$', precision: "0"});
    $('.limitMiscellaneous').maskMoney({prefix: '$', precision: "0"});
};
// MIN MAX VALUES FOR EVENT DAYS
function validate(value, min, max) {
    // MIN MAX LIMIT FOR EVENT DAYS
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

    var total = 0;

    $(".whatKindOfLiquorIsServed").each(function () {
        if ($(this).val().length > 0) {
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

