function getProductsForRisk() {

    var riskChosen = getRiskTypeChosen();

    if (riskChosen.indexOf("Film Projects") > -1 && $("#proposedTermLength").val().length > 0) {
        $.ajax({
                method: "POST",
                url: "/portal/Async/getProductsForCoverage",
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
                                //$('.PIP5Options').css("display", "");
                                if ($('#EPKGcoverage').is(':checked')) {
                                    $('#PIP5InputRadio').prop("checked", true);
                                    $(".PIP5Options").css('display', "");
                                    $('.PIPCHOIOption').prop("checked", false);
                                }
                            }
                            else {
                                $('#PIP5InputRadio').prop("checked", false);
                                $('#EPKGCIVIL100AdditionalCoverage').prop("checked", false);
                                $('#EPKGCIVIL500AdditionalCoverage').prop("checked", false);
                                $('.additionalCoverageCheckboxPIP5').prop("checked", false);
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
                                    $("#EPKGNOHAOption").css("display", "");
                                }
                            }
                            //
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
            url: "/portal/Async/getTaxInfo",
            data: {
                riskType: "",
                state: taxState,
                date: monthIndex + 1 + "/" + day + "/" + year
            }
        })
        .done(function(msg) {
            //alert(msg);

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
            var htmlString = "";
            taxResponseArray.forEach(function(item, index) {
                if (item.split("&,&").length > 1) {
                    htmlString = htmlString + "<div class='row " + item.split("&,&")[0] + "TaxRow' style= ''" + ">" +
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

            htmlString = htmlString + "<div class='row " + "PolicyFee" + "TaxRow' style= ''" + ">" +
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
            //
            //alert(htmlString);
            //console.log("TAXING === ")
            $("#taxRows").html(htmlString);
            totalUpPremiumAndTax();





        });
}
