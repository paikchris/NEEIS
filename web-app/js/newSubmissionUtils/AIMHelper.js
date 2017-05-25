function getProductsForRisk() {
    console.log("getting products")
    var riskChosen = getRiskTypeChosen();
    if (riskChosen.indexOf("Film Projects") > -1 && $("#proposedTermLength").val().length > 0) {
        $.ajax({
                method: "POST",
                url: "/Async/getProductsForCoverage",
                data: {
                    riskType: riskChosen,
                    totalGrossBudget: $("#totalBudgetConfirm").val().replace(/\$|,/g, ''),
                    proposedTermLength: $("#proposedTermLength").val()
                }
            })
            .done(function(msg) {
                //alert(msg);

                clearProductChoices();
                var coverageAndProductsArray = msg.split("&nextCoverage&");
                //alert(coverageAndProductsArray);
                var htmlString = "";
                for (var i = 0; i < coverageAndProductsArray.length; i++) {
                    //alert(coverageAndProductsArray[i]);
                    if (coverageAndProductsArray[i].length > 0) {
                        var coverageDetails = coverageAndProductsArray[i].split("&;&")[0];
                        var coverageID = coverageDetails.split("&,&")[0];
                        var coverageName = coverageDetails.split("&,&")[1];
                        //console.log(coverageID + "-" + coverageName + "-" + coverageDetails);

                        var productsArray = coverageAndProductsArray[i].split("&;&")[1];
                        //console.log("PROD ARRAY: " + productsArray);

                        if (coverageID === "EPKG" &&
                            (riskChosen === "Film Projects Without Cast (No Work Comp)" ||
                                riskChosen === "Film Projects With Cast (No Work Comp)" ||
                                riskChosen === "Specific Film Projects Test")) {

                            ///////////////////////////// Film Projects With Cast (No Work Comp)
                            if (riskChosen === "Film Projects With Cast (No Work Comp)") {
                                $('#EPKGProductsDiv').css("display", "none");
                                $('#EPKGoptions').css("margin-top", "-20px");
                            }
                            else {
                                $('#EPKGProductsDiv').css("display", "");
                                $('#EPKGoptions').css("margin-top", "0px");
                            }
                            /////////////////////////////

                            if (productsArray.indexOf("PIP CHOI") > -1) {
                                $('#PIPChoiceInput').css("display", "");

                                if ($('#EPKGcoverage').is(':checked')) {
                                    $('#PIPChoiceInputRadio').prop("checked", true);
                                    $('#pipChoiceSelections').css("display", "");
                                    $('.PIPCHOIOption').prop("checked", true);
                                }
                            }
                            else {
                                $('#PIPChoiceInputRadio').prop("checked", false);


                            }

                            if (productsArray.indexOf("PIP 1") > -1) {
                                $('#PIP1Input').css("display", "");
                            }
                            else {
                                $('#PIP1InputRadio').prop("checked", false);
                            }

                            if (productsArray.indexOf("PIP 2") > -1) {
                                $('#PIP2Input').css("display", "");
                            }
                            else {
                                $('#PIP2InputRadio').prop("checked", false);
                            }

                            if (productsArray.indexOf("PIP 3") > -1) {
                                $('#PIP3Input').css("display", "");
                            }
                            else {
                                $('#PIP3InputRadio').prop("checked", false);
                            }

                            if (productsArray.indexOf("PIP 4") > -1) {
                                $('#PIP4Input').css("display", "");
                            }
                            else {
                                $('#PIP4InputRadio').prop("checked", false);
                            }

                            if (productsArray.indexOf("PIP 5") > -1) {
                                //alert("PIP5 HERE")
                                $('#PIP5Input').css("display", "");


                                //TEMPORARILY DISABLING AUTOMATICALLY PICKING PIP 5
                                // if ($('#EPKGcoverage').is(':checked')) {
                                //     $('#PIP5InputRadio').prop("checked", true);
                                //     $('#PIP5InputRadio').trigger('change');
                                //     $(".PIP5Options").css('display', "");
                                //     $('.PIPCHOIOption').prop("checked", false);
                                // }
                            }
                            else {
                                $('#PIP5InputRadio').prop("checked", false);
                                $('#EPKGCIVIL100AdditionalCoverage').prop("checked", false);
                                $('#EPKGCIVIL500AdditionalCoverage').prop("checked", false);
                                $('.additionalCoverageCheckboxPIP5').prop("checked", false);
                            }

                            //SELECT AUTO EPKG
                            if ($('#EPKGcoverage').is(':checked')) {
                                $('.coverageRadioButton.EPKG:visible').first().prop("checked", true);

                            }

                            if ($("input[name='EPKGRadio']:checked").length > 0) {
                                if ($('#EPKGNOHAAdditionalCoverage').is(':checked')) {
                                    $('#EPKGNOHAAdditionalCoverage').prop("checked", true);
                                }
                            }
                            else {
                                $('#EPKGNOHAAdditionalCoverage').prop("checked", false);
                            }

                            if ($('#EPKGcoverage').is(':checked')) {
                                $('#EPKGoptions').css("display", "");

                                if (riskChosen === "Film Projects With Cast (No Work Comp)") {
                                    $("#EPKGNOHAOption").css("display", "none");
                                }
                                else {
                                    if($('#PIP3InputRadio').is(':checked') || $('#PIP4InputRadio').is(':checked') || $('#PIP5InputRadio').is(':checked')){
                                        // console.log("PIP 5 HIDE NOHA")
                                        // $("#EPKGoptions").css("display", "none");
                                        $("#EPKGNOHAOption").css("display", "none");
                                        if($('#PIP5InputRadio').is(':checked')){
                                            $("#EPKGoptions").css("display", "");
                                        }
                                        else{
                                            $("#EPKGoptions").css("display", "none");
                                        }
                                    }
                                    else{
                                        $("#EPKGoptions").css("display", "");
                                        $("#EPKGNOHAOption").css("display", "");
                                    }
                                }
                            }
                            //
                        }
                        else if (coverageID === "CPK" || coverageID === "CGL"){
                            if ( riskChosen === "Film Projects Without Cast (No Work Comp)" ){
                                $('#CPKCGLcoverage').trigger('change');
                            }
                        }
                        else if (coverageID === "DICE" &&
                            (riskChosen === "Film Projects Without Cast (No Work Comp)" ||
                                riskChosen === "Film Projects With Cast (No Work Comp)" ||
                                riskChosen === "Specific Film Projects Test")) {
                            $('.EPKGDiv').css("display", "none");
                            $('.CPKDiv').css("display", "none");
                            $('#DICEOptions').css("display", "");
                            $("#EPKGoptions").css("display", "none");
                        }
                        else if (coverageID === "SPECIFICFILMPROD" &&
                            (riskChosen === "Film Projects Without Cast (No Work Comp)" ||
                                riskChosen === "Film Projects With Cast (No Work Comp)" ||
                                riskChosen === "Specific Film Projects Test")) {
                            $('#SPECIFICOptions').css("display", "");
                        }

                    }
                }

                //console.log("CALL FROM GETPRODUCTS FOR RISK")
                ratePremiums($('#totalBudgetConfirm'));

            });
        $('#limitsDeductPremiumInsert').html("");
        $('#premDistributionInsert').html("");
        $("#termsInsert").html("");
        $("#endorseInsert").html("");
        $('#loadingModal').hide();
        $('#coverageOptionsReview').css("display", "");
    }
    else {
        $('#loadingModal').hide();
    }

}

function getProductsForRiskV2(){
    var dataMap = {};
    dataMap.duration = parseInt($("#proposedTermLength").val().split(" ")[0]);
    dataMap.risk = getRiskTypeChosen();
    dataMap.budget = parseInt($("#totalBudgetConfirm").val().replace(/\$|,/g, ''));


    $.ajax({
        method: "POST",
        url: "/Async/getProductsForCoverageV2",
        data: {
            riskType: getRiskTypeChosen(),
            totalGrossBudget: $("#totalBudgetConfirm").val().replace(/\$|,/g, ''),
            proposedTermLength: $("#proposedTermLength").val(),
            dataMap: JSON.stringify(dataMap)
        }
    })
    .done(function(msg) {
        // $('#productChoicesDiv').html("");
        $('#loadingModal').modal('hide');
        var coverageAndProductsJSON = JSON.parse(msg);
        var htmlString = "";


        for (var i = 0; i < coverageAndProductsJSON.length; i++) {
            var coverageID = coverageAndProductsJSON[i].id
            htmlString = htmlString +
            "<div class='form-group col-xs-12 " + coverageID + "Div'>" +
                "<p><input type='checkbox' class='coverageInput' name='coverage' id='" + coverageID + "coverage'> Entertainment Package</p>" +
            "</div>";
        }

    });
}

function getProductsForRiskV3(){
    var dataMap = {};
    dataMap.duration = parseInt($("#proposedTermLength").val().split(" ")[0]);
    dataMap.risk = getRiskTypeChosen();
    dataMap.budget = parseInt($("#totalBudgetConfirm").val().replace(/\$|,/g, ''));

    $.ajax({
        method: "POST",
        url: "/Async/getProductsForCoverage",
        data: {
            dataMap: JSON.stringify(dataMap)
        }
    })
        .done(function(msg) {
            // alert(msg);
        });
}

function getTaxInfo() {
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var taxState = "CA"
    if ($('#stateMailing').val() === "invalid") {
        taxState = "CA"
    }
    else {
        taxState = $('#stateMailing').val();
    }
    //console.log("TAX State = " + taxState)
    $.ajax({
            method: "POST",
            url: "/Async/getTaxInfo",
            data: {
                riskType: "",
                state: taxState,
                date: monthIndex + 1 + "/" + day + "/" + year
            }
        })
        .done(function(msg) {
            //alert(msg);

            // var totalPremium = 0.0;
            // $('.premiumSpan').each(function() {
            //
            //     if ($.isNumeric($(this).html())) {
            //         totalPremium = totalPremium + parseFloat($(this).html());
            //     }
            //     else if ($(this).html().substring(0, 1) === "\$") {
            //         var v = $(this).html();
            //         v = v.replace("$", "");
            //         v = v.replace(/,/g, "");
            //         //console.log("PREMIUM LINE ===== " + v);
            //         //v = ("$"+v+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //         totalPremium = totalPremium + parseFloat(v);
            //     }
            // });
            //
            // var taxResponseArray = msg.split("&;;&");
            // var htmlString = "<div id='taxRateInfoDiv' style='display:none'>" + taxResponseArray + "</div>" ;
            // taxResponseArray.forEach(function(item, index) {
            //     if (item.split("&,&").length > 1) {
            //         htmlString = htmlString + "<div class='row " + item.split("&,&")[0] + "TaxRow' style= ''" + ">" +
            //             "<div class='col-xs-4'>" +
            //             "<span class='taxDescriptionSpan'>" + item.split("&,&")[1] + "(" + item.split("&,&")[2] + ")</span>" +
            //             "</div>" +
            //             "<div class='col-xs-3'>" +
            //             "<span class='taxSpan'>" + formatTaxAndFee(totalPremium * parseFloat(item.split("&,&")[2])) + "</span>" +
            //             "</div>" +
            //             "<div class='col-xs-3'>" +
            //             "<span class=''>" + "" + "</span>" +
            //             "</div>" +
            //             "</div>";
            //     }
            //
            // });
            //
            // var policyFeeTotal = 0;
            // if ($('#EPKGcoverage').is(':checked')) {
            //     policyFeeTotal = policyFeeTotal + 15;
            // }
            // if ($('#CPKCGLcoverage').is(':checked')) {
            //     policyFeeTotal = policyFeeTotal + 15;
            // }
            //
            // htmlString = htmlString + "<div class='row " + "PolicyFee" + "TaxRow' style= ''" + ">" +
            //     "<div class='col-xs-4'>" +
            //     "<span class='taxDescriptionSpan'>Policy Fee</span>" +
            //     "</div>" +
            //     "<div class='col-xs-3'>" +
            //     "<span class='taxSpan'>$" + policyFeeTotal + ".00</span>" +
            //     "</div>" +
            //     "<div class='col-xs-3'>" +
            //     "<span class=''>" + "" + "</span>" +
            //     "</div>" +
            //     "</div>";
            // //
            // //alert(htmlString);
            // //console.log("TAXING === ")
            // $("#taxRows").html(htmlString);
            calculateTaxesFromTaxString(msg);
            totalUpPremiumAndTax();





        });
}

function calculateTaxesFromTaxString(msg){
    var totalPremium = 0.0;
    $('.premiumSpan').each(function() {

        if ($.isNumeric($(this).html())) {
            totalPremium = totalPremium + parseFloat($(this).html());
        }
        else if ($(this).html().substring(0, 1) === "\$") {
            var v = $(this).html();
            v = v.replace("$", "");
            v = v.replace(/,/g, "");
            //console.log("PREMIUM LINE ===== " + v);
            //v = ("$"+v+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            totalPremium = totalPremium + parseFloat(v);
        }
    });

    var taxResponseArray = msg.split("&;;&");
    var htmlString = "<div id='taxRateInfoDiv' style='display:none' data-taxstring='" + msg + "'>"  + "</div>" ;
    taxResponseArray.forEach(function(item, index) {
        if (item.split("&,&").length > 1) {
            // console.log(item)
            htmlString = htmlString + "<div class='row " + item.split("&,&")[0] + "TaxRow' style= 'padding-left:10px;'" + ">" +
                "<div class='col-xs-4'>" +
                "<span class='taxDescriptionSpan'>" + item.split("&,&")[1] + "(" + item.split("&,&")[2] + ")</span>" +
                "</div>" +
                "<div class='col-xs-3'>" +
                "<span class='taxSpan'>" + formatTaxAndFee(totalPremium * parseFloat(item.split("&,&")[2])) + "</span>" +
                "</div>" +
                "<div class='col-xs-3'>" +
                "<span class=''>" + "" + "</span>" +
                "</div>" +
                "</div>";
        }

    });

    var policyFeeTotal = 0;
    if ($('#EPKGcoverage').is(':checked')) {
        policyFeeTotal = policyFeeTotal + 15;
    }
    if ($('#CPKCGLcoverage').is(':checked')) {
        policyFeeTotal = policyFeeTotal + 15;
    }

    htmlString = htmlString + "<div class='row " + "PolicyFee" + "TaxRow' style= 'padding-left:10px;'" + ">" +
        "<div class='col-xs-4'>" +
        "<span class='taxDescriptionSpan'>Policy Fee</span>" +
        "</div>" +
        "<div class='col-xs-3'>" +
        "<span class='taxSpan'>$" + policyFeeTotal + ".00</span>" +
        "</div>" +
        "<div class='col-xs-3'>" +
        "<span class=''>" + "" + "</span>" +
        "</div>" +
        "</div>";

    $("#taxRows").html(htmlString);
}

function getPremiumInfoMapSGP() {
    var premiumInfoMap = {
        totalBudget: $("#totalBudgetConfirm").val(),
        proposedTermLength: $("#proposedTermLength").val(),
    };

    //SGP SPECIFIC
    //IF SILVER
    if($('#sgpSilverRadio').is(':checked')){
        premiumInfoMap.SGPProduct = "silver";
        premiumInfoMap.CGLSelected = $('#sgpSilver_CGL').is(':checked');
        premiumInfoMap.BAISelected = $('#sgpSilver_BAI').is(':checked');
        premiumInfoMap.WOSSelected = $('#sgpSilver_WOS').is(':checked');
        premiumInfoMap.MedSelected = $('#sgpSilver_5kMed').is(':checked');

        premiumInfoMap.MiscSelected = $('#sgpSilver_Misc').is(':checked');
        premiumInfoMap.MiscLimitSelected = $('#sgpSilver_MiscLimit').val();
        premiumInfoMap.TPPSelected = $('#sgpSilver_1MTPP').is(':checked');
        premiumInfoMap.NOHASelected = $('#sgpSilver_NOHA').is(':checked');
        premiumInfoMap.NOHACostSelected = $('#sgpSilver_NOHACost').is(':checked');
        premiumInfoMap.NOHAPDSelected = $('#sgpSilver_NOHAPD').is(':checked');

        premiumInfoMap.PrimaryWCSelected = $('#sgpSilver_PrimaryWC').is(':checked');
        premiumInfoMap.WCSalesSelected = $('#sgpSilver_PrimaryWC_Sales').is(':checked');
        premiumInfoMap.WCClericalSelected = $('#sgpSilver_PrimaryWC_Clerical').is(':checked');
        premiumInfoMap.WCMotionSelected = $('#sgpSilver_PrimaryWC_Motion').is(':checked');
        premiumInfoMap.WCExpModSelected = $('#sgpSilver_PrimaryWC_ExpMod').is(':checked');

        premiumInfoMap.ConWCSelected = $('#sgpSilver_ContingentWC').is(':checked');

        premiumInfoMap.UmbrellaSelected = $('#sgpSilver_Umbrella').is(':checked');
        premiumInfoMap.UmbrellaFullTermSelected = $('#sgpSilver_UmbrellaFullTerm').is(':checked');
        premiumInfoMap.UmbrellaCustomTermSelected = $('#sgpSilver_UmbrellaCustomTerm').is(':checked');
        premiumInfoMap.UmbrellaCustomTermValueSelected = $('#sgpSilver_UmbrellaCustomTermValue').is(':checked');
        premiumInfoMap.UmbrellaLimitSelected = $('#sgpSilver_UmbrellaLimitSelect').is(':checked');
        premiumInfoMap.WCExpModSelected = $('#sgpSilver_PrimaryWC_ExpMod').is(':checked');

    }
    else if($('#sgpGoldRadio').is(':checked')){

    }
    else if($('#sgpPlatinumRadio').is(':checked')){

    }

    return premiumInfoMap;
}

function getSubmissionMapSGP() {
    var riskChosen = "";
    if ($("li.active").length > 0) {
        riskChosen = getRiskTypeChosen();
    }

    var submissionMap = {
        riskType: riskChosen,
        totalBudgetConfirm: $("#totalBudgetConfirm").val(),
        titleOfProduction: $("#titleOfProduction").val(),
        nameOfProductionCompany: $('#nameOfProductionCompany').val(),
        namedInsured: $('#namedInsured').val(),
        streetNameMailing: $('#googleAutoAddress').val(),
        cityMailing: $('#cityMailing').val(),
        stateMailing: $('#stateMailing').val(),
        zipCodeMailing: $('#zipCodeMailing').val(),
        userCompany: $('#userDetails-company').html(),
        accountExec: "jason",
        accountExecName: "Jason DeBolt",
        accountExecEmail: "jason@neeis.com",
        phoneNumber: $('#phoneNumber').val(),
        namedInsuredEmail: $('#namedInsuredEmail').val(),
        FEINSSN: $('#FEINSSN').val(),
        businessStructure: $('#businessStructureSelect').val(),
        NCCI: $('#NCCI').val(),
        SIC: $('#SIC').val(),
        attention: $('#userDetails-firstName').html() + " " + $('#userDetails-lastName').html(),
        aimContactID: $('#userDetails-aimContactID').html(),
        website: $('#website').val(),
        proposedTermLength: parseInt($("#proposedTermLength").val().split(" ")[0]),
        proposedTermLengthString: $("#proposedTermLength").val(),
        proposedEffectiveDate: $("#proposedEffectiveDate").val(),
        proposedExpirationDate: $("#proposedExpirationDate").val(),
        principalPhotographyDateStart: $("#principalPhotographyDateStart").val(),
        principalPhotographyDateEnd: $("#principalPhotographyDateEnd").val(),
        coverageCodes: "",
        numberProductions: $("#numberProductions").val(),
        director: $("#director").val(),
        producer: $("#producer").val(),
        riskChosen: getRiskTypeChosen(),
        riskCategory: getRiskCategoryChosen(),
        premiumAllLOBTotal: $('#premiumAllLOBTotal').html(),
        filmingLocation: $('#filmingLocation').html(),
        productID: [],
        brokerCompany: $('#userDetails-company').html(),
        brokerEmail: $('#userDetails-email').html(),
        brokerPhone: $('#userDetails-phoneNumber').html(),
        insuredContactName: $('#nameOfPrincipal').val(),
    };





    return submissionMap;
}

function getSubmissionMap() {
    var submissionMap = {
        totalBudgetConfirm: $("#totalBudgetConfirm").val(),
        titleOfProduction: $("#titleOfProduction").val(),
        nameOfProductionCompany: $('#nameOfProductionCompany').val(),
        namedInsured: $('#namedInsured').val(),
        streetNameMailing: $('#googleAutoAddress').val(),
        cityMailing: $('#cityMailing').val(),
        stateMailing: $('#stateMailing').val(),
        zipCodeMailing: $('#zipCodeMailing').val(),
        userCompany: $('#userDetails-company').html(),
        accountExec: "jason",
        story: $('#story').val(),
        accountExecName: "Jason DeBolt",
        accountExecEmail: "jason@neeis.com",
        phoneNumber: $('#phoneNumber').val(),
        namedInsuredEmail: $('#namedInsuredEmail').val(),
        FEINSSN: $('#FEINSSN').val(),
        businessStructure: $('#businessStructureSelect').val(),
        NCCI: $('#NCCI').val(),
        SIC: $('#SIC').val(),
        attention: $('#userDetails-firstName').html() + " " + $('#userDetails-lastName').html(),
        aimContactID: $('#userDetails-aimContactID').html(),
        website: $('#website').val(),
        proposedTermLength: parseInt($("#proposedTermLength").val().split(" ")[0]),
        proposedTermLengthString: $("#proposedTermLength").val(),
        proposedEffectiveDate: $("#proposedEffectiveDate").val(),
        proposedExpirationDate: $("#proposedExpirationDate").val(),
        principalPhotographyDateStart: $("#principalPhotographyDateStart").val(),
        principalPhotographyDateEnd: $("#principalPhotographyDateEnd").val(),
        coverageCodes: "",
        numberProductions: $("#numberProductions").val(),
        director: $("#director").val(),
        producer: $("#producer").val(),
        riskChosen: getRiskTypeChosen(),
        riskCategory: getRiskCategoryChosen(),
        premiumAllLOBTotal: $('#premiumAllLOBTotal').html(),
        filmingLocation: "Blank",
        productID: [],
        brokerCompany: $('#userDetails-company').html(),
        brokerEmail: $('#userDetails-email').html(),
        brokerPhone: $('#userDetails-phoneNumber').html(),
        insuredContactName: $('#nameOfPrincipal').val()
    };

    //FILMING LOCATIONS
    var htmlString = "";
    var countFilmLocations = 0;

    if($('#showFilmLocationsCheckbox').is(':checked')){
        $('#filmingLocationInfo').find('.locationFilm').each(function() {
            countFilmLocations++;
            submissionMap[$(this).find('.filmLocationLocation').attr('id')] = $(this).find('.filmLocationLocation').val();
            submissionMap[$(this).find('.filmLocationStart').attr('id')] = $(this).find('.filmLocationStart').val();
            submissionMap[$(this).find('.filmLocationEnd').attr('id')] = $(this).find('.filmLocationEnd').val();
        });
        submissionMap["numberOfFilmLocations"] = countFilmLocations;
    }


    if($('#sourceOfFinancing').is(":visible")){
        submissionMap.sourceOfFinancing = $('#sourceOfFinancing').val();
    }

    submissionMap.coverageCodes = "";
    $('#reviewLimitsDeducts .coverageCodeString').each(function() {
        submissionMap.coverageCodes = submissionMap.coverageCodes + $(this).html() + ",";
    });
    submissionMap.coverageCodes = submissionMap.coverageCodes.replace(/,\s*$/, "");


    var productArray = [];

    //EPKG PRODUCT
    if (submissionMap.riskChosen === "Film Projects With Cast (No Work Comp)") {
        if ($('#EPKGcoverage').is(':checked')) {
            productArray.push("EPKG37");
        }
        submissionMap.EPKGRateInfo = $('#EPKG_RateInfo').html();
        submissionMap.EPKGIndicationRateInfo = $('#EPKG_IndicationRateInfo').html();

    }
    else {
        if ($('#PIPChoiceInputRadio').is(':checked')) {
            productArray.push("PIP CHOI");

            var indicationRateInfo = "";
            $('div#reviewLimitsDeducts div.EPKG_LOBRow').each(function() {
                var cov = $(this).find('.coverageColumn').children().first().html();
                var lim = $(this).find('.limitColumn').children().first().html();
                var ded = $(this).find('.deductibleColumn').children().first().html();
                var prem = $(this).find('.premiumColumn').children().first().html();
                var twoSpaces = "  ";

                if(cov.trim() === "Miscellaneous Rented Equipment"){
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + "Miscellaneous Rented Equipment\t\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Rate\t0.5\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Limit\t" + lim + "\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Min Premium\t\$100\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Rated Premium\t" + prem + "\n";
                }
                if(cov.trim() === "Extra Expense"){
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + "Extra Expense\t\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Rate\t0.1\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Limit\t" + lim + "\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Min Premium\t\$100\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Rated Premium\t" + prem + "\n";
                }
                if(cov.trim() === "Props, Sets &amp; Wardrobe"){
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + "Props, Sets & Wardrobe\t\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Rate\t0.5\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Limit\t" + lim + "\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Min Premium\t\$100\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Rated Premium\t" + prem + "\n";
                }
                if(cov.trim() === "Third Party Prop Damage Liab"){
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + "Third Party Prop Damage Liab\t\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Rate\t0.5\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Limit\t" + lim + "\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Min Premium\t\$100\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Rated Premium\t" + prem + "\n";
                }
                if(cov.trim() === "Hired Auto Physical Damage"){
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + "Hired Auto Physical Damage\t\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Rate\tflat\n";
                    indicationRateInfo = indicationRateInfo + twoSpaces + twoSpaces + twoSpaces + "Premium\t" + prem + "\n";
                }

            });

            indicationRateInfo = indicationRateInfo + "Entertainment Package Premium\t" + $('#PIPCHOIPremiumTotal').html().trim() + "\n";

            $('#EPKG_IndicationRateInfo').html(indicationRateInfo);
        }
        if ($('#PIP1InputRadio').is(':checked')) {
            productArray.push("PIP 1");
        }
        if ($('#PIP2InputRadio').is(':checked')) {
            productArray.push("PIP 2");
        }
        if ($('#PIP3InputRadio').is(':checked')) {
            productArray.push("PIP 3");
        }
        if ($('#PIP4InputRadio').is(':checked')) {
            productArray.push("PIP 4");
        }
        if ($('#PIP5InputRadio').is(':checked')) {
            productArray.push("PIP 5");
        }
        if ($('#EPKGcoverage').is(':checked')) {
            submissionMap.EPKGRateInfo = $('#EPKG_RateInfo').html();
            submissionMap.EPKGIndicationRateInfo = $('#EPKG_IndicationRateInfo').html();
        }

    }

    if ($('#CPKInputRadio').is(':checked')) {
        if (submissionMap.proposedTermLength > 30) {
            productArray.push("BARCPKSF");
        }
        else if (submissionMap.proposedTermLength <= 30) {
            productArray.push("BARCPKGC");
        }
        submissionMap.CPKRateInfo = $('#CPK_RateInfo').html() + $('#NOAL_RateInfo').html();
        submissionMap.CPKIndicationRateInfo = $('#CPK_IndicationRateInfo').html() + $('#NOAL_IndicationRateInfo').html();


    }
    if ($('#CGLInputRadio').is(':checked')) {
        if (submissionMap.proposedTermLength > 30) {
            if (submissionMap.riskChosen === "Film Projects Without Cast (No Work Comp)" || submissionMap.riskChosen === "Film Projects With Cast (No Work Comp)") {
                productArray.push("BARCPKSF");
            }
        }
        else if (submissionMap.proposedTermLength <= 30) {
            productArray.push("BARCPKGC");
        }
        submissionMap.CGLRateInfo = $('#CGL_RateInfo').html();
        submissionMap.CGLIndicationRateInfo = $('#CGL_IndicationRateInfo').html();

    }
    if (productArray.length === 0) {
        validSubmission = false;
    }
    submissionMap.productID = productArray;

    //Get LOB Limits Deductibles Premiums
    submissionMap.EPKGlimitsString = "";
    submissionMap.EPKGdeductsString = "";
    submissionMap.epkgLOB = "";
    submissionMap.cpkLOB = "";
    submissionMap.cglLOB = "";
    if ($('#EPKGcoverage').is(':checked')) {
        $('div#reviewLimitsDeducts div.EPKG_LOBRow').each(function() {
            if ($('#PIPChoiceInputRadio').is(':checked')) {
                if ($(this).find('.limitColumn').children().first().is('input')) {
                    submissionMap.epkgLOB = submissionMap.epkgLOB + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().val() + " \t" +
                        $(this).find('.deductibleColumn').children().first().html() + "\n";
                    submissionMap.EPKGlimitsString = submissionMap.EPKGlimitsString + $(this).find('.limitColumn').children().first().val() + "\tEPKG:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                    submissionMap.EPKGdeductsString = submissionMap.EPKGdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tEPKG:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                    //console.log(EPKGlimitsString)
                }
                else {
                    submissionMap.epkgLOB = submissionMap.epkgLOB + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
                        $(this).find('.deductibleColumn').children().first().html() + "\n";
                    submissionMap.EPKGlimitsString = submissionMap.EPKGlimitsString + $(this).find('.limitColumn').children().first().html() + "\tEPKG:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                    submissionMap.EPKGdeductsString = submissionMap.EPKGdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tEPKG:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                    //console.log(EPKGlimitsString)
                }

            }
            else {
                if ($(this).find('.coverageColumn').children('span').length > 1) {
                    var epkgLOBRowObject = $(this);
                    var childCount = 0;
                    $(this).find('.coverageColumn').children('span').each(function() {
                        submissionMap.epkgLOB = submissionMap.epkgLOB + $(this).html() + " \t" + $(epkgLOBRowObject).find('.limitColumn').children('span').eq(childCount).html() + " \t" +
                            $(epkgLOBRowObject).find('.deductibleColumn').children('span').eq(childCount).html() + "\n";

                        submissionMap.EPKGlimitsString = submissionMap.EPKGlimitsString + $(epkgLOBRowObject).find('.limitColumn').children('span').eq(childCount).html() + "\tEPKG:" +
                            $(epkgLOBRowObject).find('.coverageColumn').children('span').eq(childCount).html() + "\n";
                        submissionMap.EPKGdeductsString = submissionMap.EPKGdeductsString + $(epkgLOBRowObject).find('.deductibleColumn').children('span').eq(childCount).html() + "\tEPKG:" +
                            $(epkgLOBRowObject).find('.coverageColumn').children('span').eq(childCount).html() + "\n";
                        childCount++;
                    });
                }
                else {
                    submissionMap.epkgLOB = submissionMap.epkgLOB + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
                        $(this).find('.deductibleColumn').children().first().html() + "\n";
                    submissionMap.EPKGlimitsString = submissionMap.EPKGlimitsString + $(this).find('.limitColumn').children().first().html() + "\tEPKG:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                    submissionMap.EPKGdeductsString = submissionMap.EPKGdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tEPKG:" + $(this).find('.coverageColumn').children().first().html() + "\n";

                }

            }
        });
    }

    submissionMap.CPKlimitsString = "";
    submissionMap.CPKdeductsString = "";
    if ($('#CPKCGLcoverage').is(':checked')) {
        if ($('#CPKInputRadio').is(':checked')) {
            $('div#reviewLimitsDeducts div.CPK_LOBRow').each(function() {
                submissionMap.cpkLOB = submissionMap.cpkLOB + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
                    $(this).find('.deductibleColumn').children().first().html() + "\n";
                submissionMap.CPKlimitsString = submissionMap.CPKlimitsString + $(this).find('.limitColumn').children().first().html() + "\tCPK:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                submissionMap.CPKdeductsString = submissionMap.CPKdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tCPK:" + $(this).find('.coverageColumn').children().first().html() + "\n";

            });

            //ADD NOAL
            $('div#reviewLimitsDeducts div.NOAL_LOBRow').each(function() {
                submissionMap.cpkLOB = submissionMap.cpkLOB + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
                    $(this).find('.deductibleColumn').children().first().html() + "\n";
                submissionMap.CPKlimitsString = submissionMap.CPKlimitsString + $(this).find('.limitColumn').children().first().html() + "\tNOAL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                submissionMap.CPKdeductsString = submissionMap.CPKdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tNOAL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
            });

        }
        else if ($('#CGLInputRadio').is(':checked')) {
            $('div#reviewLimitsDeducts div.CGL_LOBRow').each(function() {
                submissionMap.cglLOB = submissionMap.cglLOB + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
                    $(this).find('.deductibleColumn').children().first().html() + "\n";
                submissionMap.CPKlimitsString = submissionMap.CPKlimitsString + $(this).find('.limitColumn').children().first().html() + "\tCGL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                submissionMap.CPKdeductsString = submissionMap.CPKdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tCGL:" + $(this).find('.coverageColumn').children().first().html() + "\n";

            });
        }




    }

    submissionMap.premSummary = "";
    submissionMap.premSummary = submissionMap.premSummary + "Premium Distribution" + "\t" + "" + "\n";
    $('#coverageOptionsReview div#premDistributionInsert div.row').each(function() {
        if ($(this).hasClass("TotalPremiumRow")) {
            submissionMap.premSummary = submissionMap.premSummary + $(this).find('.lineOfBusinessSpan').html() + "\t" + $(this).find('.totalPremiumSpan').html() + "\n";

        }
        else {
            submissionMap.premSummary = submissionMap.premSummary + $(this).find('.lineOfBusinessSpan').html() + "\t" + $(this).find('.premiumSpan').html() + "\n";
        }
    });
    if ($('.taxDescriptionSpan').length) {
        submissionMap.premSummary = submissionMap.premSummary + "Taxes and Fees" + "\t" + "" + "\n";
        $('#coverageOptionsReview div#taxRows div.row').each(function() {
            submissionMap.premSummary = submissionMap.premSummary + $(this).find('.taxDescriptionSpan').html() + "\t" + $(this).find('.taxSpan').html() + "\n";
        });
    }
    if ($('#brokerFeeInput').length && $('#brokerFeeInput').val().length > 0) {
        submissionMap.premSummary = submissionMap.premSummary + "Broker Fee" + "\t" + $('#brokerFeeInput').val() + ".00\n";
    }




    submissionMap.termsInsert = $('#termsInsert').html();
    submissionMap.endorseInsert = $('#endorseInsert').html();
    if ($('#EPKGcoverage').is(':checked')) {
        submissionMap.endorseInsertEPKG = $('#EPKG_EndorsementForms').html();
    }
    if ($('#CPKCGLcoverage').is(':checked')) {
        if ($('#CPKInputRadio').is(':checked')) {
            submissionMap.endorseInsertCPK = $('#CPK_EndorsementForms').html();
        }
        else if ($('#CGLInputRadio').is(':checked')) {
            submissionMap.endorseInsertCGL = $('#CGL_EndorsementForms').html();
        }
    }


    submissionMap.maxCostOneProduction = $('#maxCostOneProduction').val();

    submissionMap.productionType = "";
    //console.log("STEP 1 ============")
    $('input[data-reviewName="Type of Production"]').each(function() {
        //console.log("STEP 2 =========" + $(this).val());
        if ($(this).is(":checked")) {
            //alert($(this).val());
            submissionMap.productionType = submissionMap.productionType + $(this).val() + ", ";
        }
    });
    submissionMap.productionType = submissionMap.productionType.replace(/,\s*$/, "");

    submissionMap.productionInvolves = "";
    $('input[data-reviewName="Special Hazards Declared"]').each(function() {
        if ($(this).is(":checked")) {
            //alert($(this).val());
            submissionMap.productionInvolves = submissionMap.productionInvolves + $(this).val() + ", ";
        }
    });
    submissionMap.productionInvolves = submissionMap.productionInvolves.replace(/,\s*$/, "");

    if ($('#EPKGPremiumLOBTotal').length) {
        submissionMap.EPKGPremium = $('#EPKGPremiumLOBTotal').html();
    }
    if ($('#CGLPremiumLOBTotal').length) {
        submissionMap.CGLPremium = $('#CGLPremiumLOBTotal').html();
    }
    if ($('#CPKPremiumLOBTotal').length) {
        submissionMap.CPKPremium = $('#CPKPremiumLOBTotal').html();
        submissionMap.CPKPremiumOnly = $('#BARCPKGCPremiumTotal').html();
        submissionMap.NOALPremiumOnly = $('#NOAL01PremiumTotal').html();
        submissionMap.NOALcostOfHire = $('#costOfHireInput').val();
    }
    submissionMap.brokerFee = $('#brokerFeeInput').val();

    if (BORrequested) {
        submissionMap.statusID = "BOR";
    }
    submissionMap.statusID = "QO";

    return submissionMap;
}

function getSubmissionMapSP(){
    var submissionMap = {
        namedInsured: $('#namedInsured').val(),
        streetNameMailing: $('#googleAutoAddress').val(),
        cityMailing: $('#cityMailing').val(),
        stateMailing: $('#stateMailing').val(),
        zipCodeMailing: $('#zipCodeMailing').val(),
        userCompany: $('#userDetails-company').html(), //DONT' CHANGE
        accountExec: "jason", //DON'T CHANGE
        accountExecName: "Jason DeBolt", //DON'T CHANGE
        accountExecEmail: "jason@neeis.com",
        phoneNumber: $('#phoneNumber').val(),
        namedInsuredEmail: $('#namedInsuredEmail').val(),
        FEINSSN: $('#FEINSSN').val(),
        businessStructure: $('#businessStructureSelect').val(),
        NCCI: $('#NCCI').val(),
        SIC: $('#SIC').val(),
        attention: $('#userDetails-firstName').html() + " " + $('#userDetails-lastName').html(), //DONT' CHANGE
        aimContactID: $('#userDetails-aimContactID').html(), //DON'T CHANGE
        website: $('#website').val(),
        proposedTermLength: parseInt($("#proposedTermLength").val().split(" ")[0]),
        proposedEffectiveDate: $("#proposedEffectiveDate").val(),
        proposedExpirationDate: $("#proposedExpirationDate").val(),
        coverageCodes: "",
        riskChosen: getRiskTypeChosen(),
        riskCategory: getRiskCategoryChosen(),
        premiumAllLOBTotal: $('#totalSalePremiumCost').html(),
        productID: "CPK63",
        eventType: $('#namedInsured').val(),
        totalAttendance: $('#estimatedTotalAttendance').val(),
        attendeePerDay: $('#largestNumberAttendees').val(),
        eventState: $('#selectState').val(),
        primaryBusinessOperation: $('#businessOperations').val(),
        principalName: $('#nameOfPrincipal').val(),
        principalEmail: $('#principalEmail').val(),
        principalPhone: $('#principalPhone').val(),
        contactRepName: $('#insuredContact').val(),
        contactRepEmail: $('#insuredContactEmail').val(),
        contactRepPhone: $('#insuredContactPhone').val()

    };


    submissionMap.premSummary = "";
    submissionMap.premSummary = submissionMap.premSummary + "Premium Distribution" + "\t" + "" + "\n";
    $('#coverageOptionsReview div.premDistributionInsert div.row').each(function() {
        // if ($(this).hasClass("TotalPremiumRow")) {
        //     submissionMap.premSummary = submissionMap.premSummary + $(this).find('.lineOfBusinessSpan').html() + "\t" + $(this).find('.totalPremiumSpan').html() + "\n";
        //
        // }
        // else {
            submissionMap.premSummary = submissionMap.premSummary + $(this).find('.lineOfBusinessSpan').html() + "\t" + $(this).find('.premiumSpan').html() + "\n";
        // }
    });

    submissionMap.termsInsert = $('#termsInsert').html();
    submissionMap.endorseInsert = $('#endorseInsert').html();
    submissionMap.lobString = ""
    submissionMap.limitsString = ""
    submissionMap.deductsString = ""
    submissionMap.cglLOB = "";
    submissionMap.alcoholLOB = "";


// TABLE COMMERCIAL GENERAL LIABILITY (CGL)
    $('div#reviewLimitsDeductsSP div.tableCGL div.lobRow').each(function() {
        submissionMap.lobString = submissionMap.lobString + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
            "" + "\n";
        submissionMap.cglLOB = submissionMap.cglLOB + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
            "" + "\n";
        submissionMap.limitsString = submissionMap.limitsString + $(this).find('.limitColumn').children().first().html() + "\tCGL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
        submissionMap.deductsString = submissionMap.deductsString + $(this).find('.deductibleColumn').children().first().html() + "\tCGL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
    });

// TABLE ALCOHOL LIABILITY
    $('div#reviewLimitsDeductsSP div.tableALCOHOL div.lobRow').each(function() {
        submissionMap.lobString = submissionMap.lobString + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
            "" + "\n";
        submissionMap.alcoholLOB = submissionMap.alcoholLOB + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
            "" + "\n";
        submissionMap.limitsString = submissionMap.limitsString + $(this).find('.limitColumn').children().first().html() + "\tALCOHOL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
        submissionMap.deductsString = submissionMap.deductsString + $(this).find('.deductibleColumn').children().first().html() + "\tALCOHOL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
    });

    //BUILD LOB, LIMITS, DEDUCTS STRING
    //lobString = "Miscellaneous Rented Equipment ;&;$234,234 ;&;$2,500;&&;Extra Expense ;&;$234,234 ;&;$2,500;&&;Props, Sets & Wardrobe ;&;$234,234 ;&;$2,500;&&;Third Party Prop Damage Liab ;&;$234,234 ;&;$2,500;&&;"
    //limitsString = "$234,234\tEPKG:Miscellaneous Rented Equipment\n$234,234\tEPKG:Extra Expense\n$234,234\tEPKG:Props, Sets &amp; Wardrobe\n$234,234\tEPKG:Third Party Prop Damage Liab\n",
    //deductsString = "$2,500\tEPKG:Miscellaneous Rented Equipment\n$2,500\tEPKG:Extra Expense\n$2,500\tEPKG:Props, Sets &amp; Wardrobe\n$2,500\tEPKG:Third Party Prop Damage Liab\n",

    //EXAMPLE
    // $('div#reviewLimitsDeducts div.EPKG_LOBRow').each(function() {
    //     submissionMap.epkgLOB = submissionMap.epkgLOB + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
    //         $(this).find('.deductibleColumn').children().first().html() + "\n";
    //     submissionMap.EPKGlimitsString = submissionMap.EPKGlimitsString + $(this).find('.limitColumn').children().first().html() + "\tEPKG:" + $(this).find('.coverageColumn').children().first().html() + "\n";
    //     submissionMap.EPKGdeductsString = submissionMap.EPKGdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tEPKG:" + $(this).find('.coverageColumn').children().first().html() + "\n";
    //     //console.log(EPKGlimitsString)
    // });

    if (BORrequested) {
        submissionMap.statusID = "BOR";
    }
    submissionMap.statusID = "QO";

    return submissionMap;
}

function validateSubmission(dataMap){
    var valid = true;

    //BASIC VALIDATION, NOT EMPTY VALUES
    for (var key in dataMap) {
        if (typeof dataMap[key] === 'string' || dataMap[key] instanceof String){ //if it's a string
            if(dataMap[key] === undefined || dataMap[key] === null){
                valid = key + " is missing";
            }
        }
        else{
            if(dataMap[key]){ // exists

            }
            else{ //does not exist
                valid = key + " is missing";
            }
        }
    }

    //NECESSARY FIELDS
    if(dataMap.coverageCodes.length === 0){
        valid = "coverage code is " + dataMap.coverageCodes;
    }



    if(dataMap.productID === undefined || dataMap.productID === null){
        valid = "productID is " + dataMap.productID;
    }


    if(dataMap.premSummary.length === 0){
        valid = "productID is " + dataMap.premSummary;
    }





    return valid;
}
