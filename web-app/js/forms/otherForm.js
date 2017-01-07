/**
 * Created by paikchris on 8/23/16.
 */
var date_input=$('input[name="date"]'); //our date input has the name "date"
var container=$('#page-content-wrapper');
var options={
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    orientation: "auto top",
    autoclose: true,
};
date_input.datepicker(options);

$(document).ready(function () {

    $("#questionsContainer").html("");
    var riskChosen = $("li.active").children("a.riskOptionLink").html().trim();
    var questionCategory = $("li.active").closest(".drawerContainer").find(".questionCategory").html().trim();

    getQuestions(riskChosen, questionCategory);




    // Cast Member Insurance
    $('#totalBudgetInput').maskMoney({prefix:'$', precision:"0"});
    $('#totalBudgetConfirm').maskMoney({prefix:'$', precision:"0"});
    $('#costOfHireInput').maskMoney({prefix:'$', precision:"0"});
    $('#brokerFeeInput').maskMoney({prefix:'$', precision:"0"});


    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('#page-content-wrapper');
    var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        orientation: "auto top",
        autoclose: true,
    };
    date_input.datepicker(options);


    $(':file').change(function(){
        var file = this.files[0];

        var name = file.name;
        var size = file.size;
        var type = file.type;
        var ext = $(this).val().split('.').pop().toLowerCase();
        if($.inArray(ext, ['zip', 'doc', 'docx', 'xlsx', 'xls', 'pdf', 'txt']) == -1) {
            alert('Only .zip, .doc, .docx, .xlsx, .xls, .pdf, .txt are permitted');
            $(this).val('');
        }
        else{
            //alert(name);

            //alert('Only .zip, .doc, .docx, .xlsx, .xls, .pdf are permitted');
            var iconFilePath = "";
            if(ext == "zip") {
                iconFilePath = "zipIcon.png"
            }
            else if(ext == "doc"){
                iconFilePath = "docIcon.png"
            }
            else if(ext == "docx"){
                iconFilePath = "docxIcon.png"
            }
            else if(ext == "xls"){
                iconFilePath = "xlsIcon.png"
            }
            else if(ext == "xlsx"){
                iconFilePath = "xlsxIcon.png"
            }
            else if(ext == "pdf"){
                iconFilePath = "pdfIcon.png"
            }
            else if(ext == "txt"){
                iconFilePath = "txtIcon.png"
            }
            else{
                iconFilePath = "fileIcon.png"
            }

            $("#" + $(this).attr('id') + 'Span').closest(".fileNameContainer").css("display","");
            $("#" + $(this).attr('id') + 'Span').html("<img src='/portal/images/" + iconFilePath + "' height='16' width='16' style='margin-right:5px'/>" + name);
        }
        //console.log(this.files[0]);
        //Your validation
    });

    $(document.body).on('click', '.attachClearButton' ,function(){
        $(this).closest('.fileNameContainer').find('.fileNameSpan').html("");
        var spanID = $(this).closest('.fileNameContainer').find('.fileNameSpan').attr('id');
        $( "#" + spanID.replace("Span","") ).val('');
        //alert("#" + spanID.replace("Span",""));

    });


    //Coverage Checkboxes
    $(document.body).on('keyup', '#totalBudgetConfirm' ,function(){
        console.log($(this).val());
        if($(this).val().trim().length > 0 && $(this).val() != "$0.00"){
            $('#coverageOptionsReview').addClass("panel-primary");
            $('#coverageOptionsReview').removeClass("panel-default");
            $('#coverageOptionsReview').parent().css("color", "#1f1f1f");
            $('#coverageOptionsTitle').css("color", "#fff");
            $('#loadingModal').show();
            //console.log($("li.active").html());
            //if ($("li.active").length > 0) {
            //    getProductsForRisk();
            //}

            console.log("budget confirm rating");
            var budget = $(this).val();
            $("#totalBudgetInput").val(budget);
            $("#totalBudgetConfirm").val(budget);

            console.log($("#totalBudgetConfirm").val().split(".")[0]);
            $('.PIPCHOILimitsInput').val($("#totalBudgetConfirm").val().split(".")[0]);
            $('.CPKNOHALimitsInput').val($("#totalBudgetConfirm").val().split(".")[0]);

            pipChoiceMisc = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceExtra = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceProps = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceThird = $("#totalBudgetConfirm").val().split(".")[0];
            pipChoiceNOHA = $("#totalBudgetConfirm").val().split(".")[0];
            getProductsForRisk();
        }
        else{
            $('#coverageOptionsReview').addClass("panel-default");
            $('#coverageOptionsReview').removeClass("panel-primary");
            $('#coverageOptionsReview').parent().css("color", "rgba(31, 31, 31, 0.35)");
            $('#coverageOptionsTitle').css("color", "rgba(31, 31, 31, 0.35)");
            $('#EPKGcoverage').prop("checked", false);
            $('#EPKGcoverage').trigger('change');
            $('#CPKCGLcoverage').prop("checked", false);
            $('#CPKCGLcoverage').trigger('change');

            clearProductChoices();
        }



        //ratePremiums(this);
    });


});




function ratePremiums(thisObj){
    console.log("rating");
    var val = $(thisObj).val();
    var riskChosen = $("li.active").children("a.riskOptionLink").html().trim();
    var prodString = $(".productsSelect option[value='" + val + "']").text();
    var productsSelected = "";
    var additionalProducts = "";
    var pipChoiOptions = "";

    $(".coverageRadioButton").each(function( index ) {
        if($(this).is(':checked')){
            productsSelected = productsSelected + $(this).attr('class').replace("coverageRadioButton ","") + ":" + $( this ).val() + ",";
            if($(this).hasClass("CPK")){
                productsSelected = productsSelected + "NOAL" + ":" + "NOAL01" + ",";
            }
        }
    });

    $("#EPKGNOHAAdditionalCoverage").each(function( index ) {
        if($(this).is(':checked')){
            productsSelected = productsSelected + "NOHA" + ":" + $( this ).val() + ",";
        }
    });

    $(".additionalCoverageCheckboxCPKCGL").each(function( index ) {
        if($(this).is(':checked')){
            additionalProducts = additionalProducts + $( this ).attr("id") + ":" + $( this ).attr("id") + ",";
        }
    });

    $('.PIPCHOIOption').each(function( index ) {
        if($(this).is(':checked')){
            pipChoiOptions = pipChoiOptions + $(this).attr('id') + "," ;
        }

    });
    $(".additionalCoverageCheckboxPIP5").each(function( index ) {
        if($(this).is(':checked')){
            additionalProducts = additionalProducts + $( this ).attr("id") + ":" + $( this ).attr("id") + ",";
        }
    });
    //alert(productsSelected);

    var CGLNOALLimit = "";
    var elem = document.createElement('textarea');

    $('.PIPCHOILimitsInput').each(function( index ) {
        elem.innerHTML = $(this).parent().siblings(".coverageColumn").children().first().html();
        var decoded = elem.value;
        if($(this).val().length == 0){
            pipchoiceLimits = pipchoiceLimits + decoded + "&;&" + 0 + "&;;&";
            $(this).val("0");
        }
        else{
            pipchoiceLimits = pipchoiceLimits + decoded + "&;&" + $(this).val() + "&;;&";
        }

        if(decoded === "Miscellaneous Rented Equipment"){
            pipChoiceMisc = $(this).val();
        }
        else if(decoded === "Extra Expense"){
            pipChoiceExtra = $(this).val();
        }
        else if(decoded === "Props, Sets & Wardrobe"){
            pipChoiceProps = $(this).val();
        }
        else if(decoded === "Third Party Prop Damage Liab"){
            pipChoiceThird = $(this).val();
        }
        else if(decoded === "Hired Auto Physical Damage"){
            pipChoiceNOHA = $(this).val();
        }
    });
    console.log(pipChoiceMisc);
    $('.CPKNOHALimitsInput').each(function( index ) {
        elem.innerHTML = $(this).parent().siblings(".coverageColumn").children().first().html();
        var decoded = elem.value;
        if (decoded === "Hired Auto Physical Damage") {
            CGLNOALLimit = $(this).val();
        }
    });
    //console.log(pipchoiceLimits);

    if(productsSelected.length > 0 && parseFloat($("#totalBudgetInput").val().replace(/\$|,/g, '')) > 0) {
        //console.log($('#costOfHireInput').val());
        $.ajax({
            method: "POST",
            url: "/portal/Async/ratePremiums",
            data: {
                riskType: riskChosen,
                productsSelected: productsSelected,
                pipChoiOptions: pipChoiOptions,
                pipChoiceLimits: pipchoiceLimits.replace(/\$|,/g, ''),
                additionalProducts: additionalProducts,
                totalBudget: $("#totalBudgetInput").val().replace(/\$|,/g, ''),
                proposedTermLength: $("#proposedTermLength").val(),
                costOfHire: $('#costOfHireInput').val().replace(/\$|,/g, '')

            }
        })
            .done(function (msg) {
                //alert(msg);
                //alert( "Data Saved: " + msg );
                responseJSON = JSON.parse(msg);
                //alert(responseJSON.coverages.length);
                var limitDeductibleString = "";
                var lobDistString = "";
                var CPKincluded = false;
                var EPKGincluded = false;
                var termsInsert = "";
                var beginTerms = "";
                var endorseInsert = "";
                for (var i = 0; i < responseJSON.coverages.length; i++) {
                    if(responseJSON.coverages[i].coverageCode === "CPK"){
                        CPKincluded = true;
                        beginTerms = responseJSON.coverages[i].beginTerms;
                    }
                    if(responseJSON.coverages[i].coverageCode === "EPKG"){
                        EPKGincluded = true;
                        beginTerms = responseJSON.coverages[i].beginTerms;
                    }
                }
                for (var i = 0; i < responseJSON.coverages.length; i++) {
                    //alert(Object.keys(responseJSON.coverages[i].limits));
                    if(responseJSON.coverages[i].coverageCode === "NOHA" ){
                        continue;
                    }

                    limitDeductibleString = limitDeductibleString + "<div class='row coverageCodeRow'>" +
                        "<div class='col-xs-6 ' >";
                    if(responseJSON.coverages[i].coverageCode === "NOAL" && CPKincluded){
                        limitDeductibleString = limitDeductibleString +    "<strong class='coverageCodeString' style='font-size:13px'>" + "NOAL" + "</strong>";
                        limitDeductibleString = limitDeductibleString +   "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span'>" + "-" + "</span>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<strong style='font-size:13px'>" + "</strong>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span'>" + "-" + "</span>" +
                            "</div>" +
                            "</div>";
                    }
                    else if(responseJSON.coverages[i].coverageCode === "EPKG" ){
                        if(responseJSON.coverages[i].productCode === "PIP CHOI"){
                            limitDeductibleString = limitDeductibleString +    "<strong class='coverageCodeString' style='font-size:13px'>" + "EPKG" + "</strong>";
                            limitDeductibleString = limitDeductibleString +   "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span style='font-size:9px;'>" + "*Max $1,000,000" + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<strong style='font-size:13px'>" + "</strong>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span>" + "-" + "</span>" +
                                "</div>" +
                                "</div>";
                        }
                        else if(responseJSON.coverages[i].productCode === "PIP 1"){
                            limitDeductibleString = limitDeductibleString +    "<strong class='coverageCodeString' style='font-size:13px'>" + "EPKG" + "</strong>";
                            limitDeductibleString = limitDeductibleString +   "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span style='font-size:9px;'>" + "" + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<strong style='font-size:13px'>" + "</strong>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span>" + "-" + "</span>" +
                                "</div>" +
                                "</div>";
                        }
                        else{
                            limitDeductibleString = limitDeductibleString +    "<strong class='coverageCodeString' style='font-size:13px'>" + responseJSON.coverages[i].coverageCode + "</strong>";
                            limitDeductibleString = limitDeductibleString +   "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span'>" + "-" + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<strong style='font-size:13px'>" + "</strong>" +
                                "</div>" +
                                "<div class='col-xs-2 ' >" +
                                "<span'>" + "-" + "</span>" +
                                "</div>" +
                                "</div>";
                        }

                    }
                    else if(responseJSON.coverages[i].coverageCode === "CPK"){
                        limitDeductibleString = limitDeductibleString +    "<strong class='coverageCodeString' style='font-size:13px'>" + "CGL" + "</strong>";
                        limitDeductibleString = limitDeductibleString +   "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span>" + "-" + "</span>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<strong style='font-size:13px'>" + "</strong>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span>" + "-" + "</span>" +
                            "</div>" +
                            "</div>";
                    }
                    else{
                        limitDeductibleString = limitDeductibleString +    "<strong class='coverageCodeString' style='font-size:13px'>" + responseJSON.coverages[i].coverageCode + "</strong>";
                        limitDeductibleString = limitDeductibleString +   "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span'>" + "-" + "</span>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<strong style='font-size:13px'>" + "</strong>" +
                            "</div>" +
                            "<div class='col-xs-2 ' >" +
                            "<span'>" + "-" + "</span>" +
                            "</div>" +
                            "</div>";
                    }


                    var limitLines = Object.keys(responseJSON.coverages[i].limits);
                    if(responseJSON.coverages[i].coverageCode === "EPKG"){
                        if(limitLines.indexOf("Negative Film & Videotape") > -1){
                            limitLines.splice(limitLines.indexOf("Negative Film & Videotape"), 1);
                            limitLines.push("Negative Film & Videotape");
                        }
                        if(limitLines.indexOf("Faulty Stock & Camera Processing") > -1){
                            limitLines.splice(limitLines.indexOf("Faulty Stock & Camera Processing"), 1);
                            limitLines.push("Faulty Stock & Camera Processing");
                        }
                        if(limitLines.indexOf("Miscellaneous Rented Equipment") > -1){
                            limitLines.splice(limitLines.indexOf("Miscellaneous Rented Equipment"), 1);
                            limitLines.push("Miscellaneous Rented Equipment");
                        }
                        if(limitLines.indexOf("Extra Expense") > -1){
                            limitLines.splice(limitLines.indexOf("Extra Expense"), 1);
                            limitLines.push("Extra Expense");
                        }
                        if(limitLines.indexOf("Props, Sets & Wardrobe") > -1){
                            limitLines.splice(limitLines.indexOf("Props, Sets & Wardrobe"), 1);
                            limitLines.push("Props, Sets & Wardrobe");
                        }
                        if(limitLines.indexOf("Third Party Prop Damage Liab") > -1){
                            limitLines.splice(limitLines.indexOf("Third Party Prop Damage Liab"), 1);
                            limitLines.push("Third Party Prop Damage Liab");
                        }
                        if(limitLines.indexOf("Office Contents") > -1){
                            limitLines.splice(limitLines.indexOf("Office Contents"), 1);
                            limitLines.push("Office Contents");
                        }

                        if(limitLines.indexOf("Civil Authority (US Only)") > -1){
                            limitLines.splice(limitLines.indexOf("Civil Authority (US Only)"), 1);
                            limitLines.push("Civil Authority (US Only)");
                        }

                        if(limitLines.indexOf("Animal Mortality Under Cast Insurance (Domestic Birds/Fish)") > -1){
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Domestic Birds/Fish)"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Domestic Birds/Fish)");
                        }
                        if(limitLines.indexOf("Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)") > -1){
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)");
                        }
                        if(limitLines.indexOf("Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))") > -1){
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))");
                        }
                        if(limitLines.indexOf("Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))") > -1){
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))");
                        }
                        if(limitLines.indexOf("Animal Mortality Under Cast Insurance (Farm Animals)") > -1){
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Farm Animals)"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Farm Animals)");
                        }
                        if(limitLines.indexOf("Animal Mortality Under Cast Insurance (Wild Cats (Caged))") > -1){
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (Wild Cats (Caged))"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (Wild Cats (Caged))");
                        }
                        if(limitLines.indexOf("Animal Mortality Under Cast Insurance (All Others - Refer Only)") > -1){
                            limitLines.splice(limitLines.indexOf("Animal Mortality Under Cast Insurance (All Others - Refer Only)"), 1);
                            limitLines.push("Animal Mortality Under Cast Insurance (All Others - Refer Only)");
                        }



                        if(limitLines.indexOf("Hired Auto Physical Damage") > -1){
                            limitLines.splice(limitLines.indexOf("Hired Auto Physical Damage"), 1);
                            limitLines.push("Hired Auto Physical Damage");
                        }
                    }
                    else if(responseJSON.coverages[i].coverageCode === "CPK" || responseJSON.coverages[i].coverageCode === "CGL" ){
                        if(limitLines.indexOf("Each Occurrence") > -1){
                            limitLines.splice(limitLines.indexOf("Each Occurrence"), 1);
                            limitLines.push("Each Occurrence");
                        }
                        if(limitLines.indexOf("General Aggregate Limit") > -1){
                            limitLines.splice(limitLines.indexOf("General Aggregate Limit"), 1);
                            limitLines.push("General Aggregate Limit");
                        }
                        if(limitLines.indexOf("Products & Completed Operations") > -1){
                            limitLines.splice(limitLines.indexOf("Products & Completed Operations"), 1);
                            limitLines.push("Products & Completed Operations");
                        }
                        if(limitLines.indexOf("Personal & Advertising Injury") > -1){
                            limitLines.splice(limitLines.indexOf("Personal & Advertising Injury"), 1);
                            limitLines.push("Personal & Advertising Injury");
                        }
                        if(limitLines.indexOf("Fire Damage (Any One Fire)") > -1){
                            limitLines.splice(limitLines.indexOf("Fire Damage (Any One Fire)"), 1);
                            limitLines.push("Fire Damage (Any One Fire)");
                        }

                        if(limitLines.indexOf("\$5,000 Medical Payments (Per Person)") > -1){
                            limitLines.splice(limitLines.indexOf("\$5,000 Medical Payments (Per Person)"), 1);
                            limitLines.push("\$5,000 Medical Payments (Per Person)");
                        }
                        if(limitLines.indexOf("Increased Agg Limit") > -1){
                            limitLines.splice(limitLines.indexOf("Increased Agg Limit"), 1);
                            limitLines.push("Increased Agg Limit");
                        }
                        if(limitLines.indexOf("Blanket Additional Insured Endorsement") > -1){
                            limitLines.splice(limitLines.indexOf("Blanket Additional Insured Endorsement"), 1);
                            limitLines.push("Blanket Additional Insured Endorsement");
                        }
                        if(limitLines.indexOf("Waiver of Subrogation") > -1){
                            limitLines.splice(limitLines.indexOf("Waiver of Subrogation"), 1);
                            limitLines.push("Waiver of Subrogation");
                        }
                        if(limitLines.indexOf("Additional Charge to Include $5,000 Medical Payments") > -1){
                            limitLines.splice(limitLines.indexOf("Additional Charge to Include $5,000 Medical Payments"), 1);
                            limitLines.push("Additional Charge to Include $5,000 Medical Payments");
                        }


                        if(limitLines.indexOf("Non-Owned & Hired Auto Liability") > -1){
                            limitLines.splice(limitLines.indexOf("Non-Owned & Hired Auto Liability"), 1);
                            limitLines.push("Non-Owned & Hired Auto Liability");
                        }

                        //PUSH IN FRONT

                    }


                    limitLines.forEach(function (key, index) {
                        //alert.log(e);
                        if(key === "Non-Owned Auto Physical Damage" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                            responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3" )){
                            return;
                        }
                        var premiumForCoverageLine = "";
                        if (responseJSON.coverages[i].premiums[key]) {
                            premiumForCoverageLine = responseJSON.coverages[i].premiums[key][1];
                            //console.log("Premium: " + premiumForCoverageLine);
                        }
                        else {
                            premiumForCoverageLine = "undefined";
                        }

                        limitDeductibleString = limitDeductibleString + "<div class='row " + responseJSON.coverages[i].coverageCode + "_LOBRow'";
                        if (index % 2 == 0) {
                            if(key === "Miscellaneous Rented Equipment" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                                responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3")){
                                limitDeductibleString = limitDeductibleString + " style= 'background-color: rgba(38, 80, 159, 0.13); height:44px'";
                            }
                            else{
                                limitDeductibleString = limitDeductibleString + " style= 'background-color: rgba(38, 80, 159, 0.13)'";
                            }

                        }
                        limitDeductibleString = limitDeductibleString + ">" +
                            "<div class='col-xs-6 coverageColumn' style='padding-left:20px'>";

                        if(key === "Miscellaneous Rented Equipment" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                            responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3")){
                            limitDeductibleString = limitDeductibleString + "<span>" + key + "</span>" + "<br><span>Non-Owned Auto Physical Damage</span>" +
                                "</div>" +
                                "<div class='col-xs-2 limitColumn'>";
                        }
                        else{
                            limitDeductibleString = limitDeductibleString + "<span>" + key + "</span>" +
                                "</div>" +
                                "<div class='col-xs-2 limitColumn'>";
                        }



                        if(responseJSON.coverages[i].productCode === "PIP CHOI") {
                            if(key === "Hired Auto Physical Damage"){
                                limitDeductibleString = limitDeductibleString + "<span>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span>";
                            }
                            else{
                                limitDeductibleString = limitDeductibleString + "<input class='form-control PIPCHOILimitsInput " + key.replace(/\s+/g, '').replace(/[^a-zA-Z-]/g, '') +"' type='text' placeholder = '$' name='numBuildings' " +
                                    "style='font-size: 12px;padding: 2px;margin-top: 3px; margin-bottom:3px; height: 20px;'/>";
                            }

                        }
                        else if(responseJSON.coverages[i].coverageCode === "NOAL" && CPKincluded){
                            limitDeductibleString = limitDeductibleString + "<span>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span>";
                        }
                        else{
                            limitDeductibleString = limitDeductibleString + "<span>" + formatMoney(responseJSON.coverages[i].limits[key]) + "</span>";
                        }




                        limitDeductibleString = limitDeductibleString + "</div>" +
                            "<div class='col-xs-2 premiumColumn'>" +
                            "<span class='" + responseJSON.coverages[i].productCode.replace(/ /g,'') + "PremiumLine' >" + formatMoney(premiumForCoverageLine) + "</span>" +
                            "</div>";
                        if(key === "Miscellaneous Rented Equipment" && (responseJSON.coverages[i].productCode === "PIP 5" ||
                            responseJSON.coverages[i].productCode === "PIP 4" || responseJSON.coverages[i].productCode === "PIP 3")){
                            limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 deductibleColumn'>" +
                                "<span class='" + responseJSON.coverages[i].productCode.replace(/ /g,'') + "DeductLine'>" + formatMoney(responseJSON.coverages[i].deductibles[key])  +
                                "</span><br>" +
                                "<span class='NOHADeductLine'>" + formatMoney(responseJSON.coverages[i].deductibles["Non-Owned Auto Physical Damage"])  +
                                "</span>";
                        }

                        else{
                            limitDeductibleString = limitDeductibleString + "<div class='col-xs-2 deductibleColumn'>" +
                                "<span class='" + responseJSON.coverages[i].productCode.replace(/ /g,'') + "DeductLine'>" + formatMoney(responseJSON.coverages[i].deductibles[key])  +

                                "</span>";
                        }
                        limitDeductibleString = limitDeductibleString + "</div>" +
                            "</div>";
                    });
                    limitDeductibleString = limitDeductibleString + "<div class='row' style='border-top: 1px solid rgba(0, 0, 0, 0.19);'>" +
                        "<div class='col-xs-6 ' >" +
                        "<strong style='font-size:13px'>"  + "</strong>" +
                        "</div>" +
                        "<div class='col-xs-2 ' >" +
                        "<span'>" + "-" + "</span>" +
                        "</div>" +
                        "<div class='col-xs-2 ' >" +
                        "<strong style='font-size:13px' id='" + responseJSON.coverages[i].productCode.replace(/ /g,'') +"PremiumTotal'>" + formatMoney(responseJSON.coverages[i].productTotalPremium) + "</strong>" +
                        "</div>" +
                        "<div class='col-xs-2 ' >" +
                        "<span'>" + "-" + "</span>" +
                        "</div>" +
                        "</div>";
                    limitDeductibleString = limitDeductibleString + "<br>";

                    var lobLines = Object.keys(responseJSON.coverages[i].lobDist);
                    lobLines.forEach(function (key, index) {
                        for (var k = 0; k < responseJSON.coverages[i].lobDist[key].split(";").length; k++) {
                            if (responseJSON.coverages[i].lobDist[key].split(";")[k].length > 0) {
                                lobDistString = lobDistString + "<div class='row'" ;
                                if (index % 2 == 0) {
                                    lobDistString = lobDistString + " style= 'background-color: rgba(38, 80, 159, 0.13)'";
                                }
                                lobDistString = lobDistString + ">" +
                                    "<div class='col-xs-4'>" +
                                    "<span class='lineOfBusinessSpan'>" + responseJSON.coverages[i].lobDist[key].split(";")[k].split(",")[0] + "</span>" +
                                    "</div>" +
                                    "<div class='col-xs-3'>" +
                                    "<span class='premiumSpan' id='" + responseJSON.coverages[i].coverageCode + "PremiumLOBTotal'>" + formatMoney(responseJSON.coverages[i].lobDist[key].split(";")[k].split(",")[1]) + "</span>" +
                                    "</div>" +
                                    "<div class='col-xs-3'>" +
                                    "<span class='agentPercentSpan'>"  + responseJSON.coverages[i].lobDist[key].split(";")[k].split(",")[3] + "</span>" +
                                    "</div>" +
                                    "</div>";
                            }
                        }


                    });

                    if(responseJSON.coverages[i].coverageCode != "NOAL"){
                        //termsInsert = termsInsert +
                        //    responseJSON.coverages[i].coverageCode + " - " + responseJSON.coverages[i].productCode + "\n"  +  responseJSON.coverages[i].terms + "\n\n\n";
                        endorseInsert = endorseInsert +
                            responseJSON.coverages[i].coverageCode + " - " + responseJSON.coverages[i].productCode + "\n" +
                            responseJSON.coverages[i].endorse + "\n\n\n";
                    }







                    if(responseJSON.coverages[i].productCode === "PIP CHOI" ){
                        $('#limitsHeader').html("Please Enter Desired Limits");
                    }
                }

                $("#limitsDeductPremiumInsert").html(limitDeductibleString);
                $("#premDistributionInsert").html(lobDistString);
                $("#termsInsert").html(beginTerms + termsInsert);
                $("#endorseInsert").html(endorseInsert);
                var disclaimerInsert = "*TRIA is rejected as per form LMA 5091 U.S. Terrorism Risk Insurance Act 2002.  " +
                    "TRIA can be afforded for an additional premium charge equal to 1% of the total premium indication.";
                $("#disclaimerInsert").html(disclaimerInsert);

                //$("#premDistributionInsert").html(lobDistString);

                //Add NOAL to CPK if valid
                console.log("lENGTH = " + $('.NOAL01PremiumTotal').length)
                if($('#NOAL01PremiumTotal').length > 0){
                    var noalPrem = $('#NOAL01PremiumTotal').html();
                    var cpkPrem = $('#BARCPKGCPremiumTotal').html();

                    var v1 = noalPrem;
                    v1= v1.replace("$","");
                    v1= v1.replace(/,/g , "");

                    var v2 = cpkPrem;
                    v2= v2.replace("$","");
                    v2= v2.replace(/,/g , "");

                    $("#CPKPremiumLOBTotal").html(formatMoney(parseFloat(v1) + parseFloat(v2)));




                }

                $('.PIPCHOILimitsInput').maskMoney({prefix:'$', precision:"0"});
                $('.PIPCHOILimitsInput').val($("#totalBudgetInput").val().split(".")[0]);
                if(pipChoiceMisc.length > 0){
                    $(".MiscellaneousRentedEquipment").val(pipChoiceMisc);
                }
                if(pipChoiceExtra.length > 0){
                    $(".ExtraExpense").val(pipChoiceExtra);
                }
                if(pipChoiceProps.length > 0){
                    $(".PropsSetsWardrobe").val(pipChoiceProps);
                }
                if(pipChoiceThird.length > 0){
                    $(".ThirdPartyPropDamageLiab").val(pipChoiceThird);
                }
                if(pipChoiceNOHA.length > 0){
                    $(".HiredAutoPhysicalDamage").val(pipChoiceNOHA);

                }

                $('.PIPCHOILimitsInput').trigger("keyup");
                $('.CPKNOHALimitsInput').maskMoney({prefix:'$', precision:"0"});
                $('.CPKNOHALimitsInput').val($("#totalBudgetInput").val().split(".")[0]);
                if(CGLNOALLimit.length > 0){
                    $(".HiredAutoPhysicalDamage").val(CGLNOALLimit);
                }
                $('.CPKNOHALimitsInput').trigger("keyup");
                getTaxInfo();
                totalUpPremiumAndTax();
                addOverflowTransitionClass();
                $('#castInsuranceRequiredCheckBox').trigger('change');
            });

    }
    else{
        //alert("clear all");
        $("#limitsDeductPremiumInsert").html("");
        $("#premDistributionInsert").html("");
        $("#termsInsert").html("");
        $("#endorseInsert").html("");
        $("#taxRows").html("");
        $("#premiumAllLOBTotal").html("");
        $("#disclaimerInsert").html("");
    }
    //alert("");

}
function addOverflowTransitionClass(){
    $('.NOHADeductLine').parent().addClass("deductibleColumnTwoLine")
    $(".deductibleColumn").each(function( index ) {
        var largestInnerHeight = 0;
        var combinedInnerHeight =0;
        $(this).find('span').each(function( index ) {
            combinedInnerHeight = combinedInnerHeight + $(this).innerHeight();
            if($(this).innerHeight() > largestInnerHeight){
                largestInnerHeight = $(this).innerHeight();
            }
        });
        //alert( $(this).innerHeight() + " - " + largestInnerHeight +" - " + $(this).html());

        //if (largestInnerHeight >  $(this).innerHeight() || combinedInnerHeight > $(this).innerHeight() ) {
        if($(this).innerHeight() > 24){

            $(this).addClass("deductibleColumnOverflow");
            //$(this).append("<span class='glyphicon glyphicon-arrow-down'> </span>")
        }
    });
}
function totalUpPremiumAndTax(){
    //alert();

    var totalPremium = 0.0;
    $('.premiumSpan, .taxSpan').each(function () {
        //console.log("TOTALING === " + $(this).html())
        if($.isNumeric($(this).html())){
            totalPremium = totalPremium + parseFloat($(this).html());
        }
        else if($(this).html().substring(0,1) ==="\$"){
            var v = $(this).html();
            v= v.replace("$","");
            v= v.replace(/,/g , "");
            //console.log("PREMIUM LINE ===== " + v);
            //v = ("$"+v+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            totalPremium = totalPremium + parseFloat(v);
        }
    });
    $("#premiumAllLOBTotal").html(formatTaxAndFee(totalPremium));
}

function buildReview() {
    $("#reviewRiskType").html($("li.active").children("a.riskOptionLink").html().trim());
    //alert($("#namedInsured").html());
    $("#reviewNamedInsured").html($("#namedInsured").val());
    $("#reviewMailingAddress").html($("#googleAutoAddress").val());
    $("#reviewMailingCity").html($("#cityMailing").val());
    $("#reviewMailingZipcode").html($("#zipCodeMailing").val());
    $("#reviewMailingState").html($("#stateMailing").val());
    $("#reviewPhoneNumber").html($("#phoneNumber").val());
    $("#reviewEmail").html($("#namedInsuredEmail").val());
    $("#reviewWebsite").html($("#website").val());

    $("#reviewTotalBudget").html($("#totalBudgetConfirm").val());
    $("#reviewPrincipalPhotographyDates").html($("#principalPhotographyDateStart").val() + " to " + $("#principalPhotographyDateEnd").val());
    $("#reviewProposedEffective").html($("#proposedEffectiveDate").val());
    $("#reviewProposedExpiration").html($("#proposedExpirationDate").val());
    $("#reviewProposedTerm").html($("#proposedTermLength").val());
    $("#reviewSubject").html($("#endorseInsert").html());


    $("#reviewNameProduction").html($("#titleOfProduction").val());
    $("#reviewNameProductionCompany").html($("#nameOfProductionCompany").val());
    $("#reviewNamePrincipals").html($("#nameOfPrincipal").val());
    $("#reviewNumberYearsExperience").html($("#numberOfYearsOfExperience").val());
    $("#reviewPriorLosses").html($("#listOfPriorLosses").val());

    var limitValueArray = [];
    $("#limitsDeductPremiumInsert").find('.limitColumn').each(function () {
        if ($(this).find('input').length) {
            limitValueArray.push($(this).find('input').val());
        }
    });
    var htmlString = $("#limitsDeductPremiumInsert").html();
    var object = $('<div/>').html(htmlString).contents();
    object.find('.limitColumn').each(function (index) {
        if ($(this).find('input').length) {
            $(this).html("<span>" + limitValueArray[index] + "<span>");
        }
    });
    $("#reviewLimitsDeducts").html(object);

    var str = $("<div />").append($('#premDistributionInsert').clone()).html();
    str = str + $("<div />").append($('.TaxHeaderRow').clone()[0]).html();
    str = str + $("<div />").append($('#taxRows').clone()[0]).html();
    str = str + $("<div />").append($('.TotalPremiumRow').clone()[0]).html();
    $("#reviewPremDistribution").html( str);
    $("#reviewTerms").html($("#termsInsert").html());
    //$("#reviewSubject").html($("#subjectInsert").html());
    $("#reviewBrokerFee").html($("#brokerFeeInput").val());

    var reviewString = "";
    var checkboxesReviewed = "";
    var blankAnswer = "To Follow"
    $(".showReview").each(function () {
        if ($(this).css("display") != "none") {
            if ($(this).is("select")) {
                // the input field is not a select
                var answer = "";
                if ($(this).find(":selected").text().length > 0) {
                    answer = $(this).find(":selected").text()
                }
                else {
                    answer = blankAnswer;
                }
                reviewString = reviewString + "<div class='row'>" +
                    "<div class='col-xs-3 text-left'>" +
                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
                    "</div>" +
                    "<div class='col-xs-9'>" +
                    "<div class='reviewSpan' id='reviewBrokerFee'>" + answer + "</div>" +
                    "</div>" +
                    "</div>";
                reviewString = reviewString + "<br>";
            }
            else if ($(this).is(':checkbox') && $(this).attr("data-reviewName")) {
                // the input field is not a select
                //alert($(this).attr("data-reviewName") + " - " + checkboxesReviewed + " - " +  checkboxesReviewed.indexOf($(this).attr("data-reviewName")));
                if (checkboxesReviewed.indexOf($(this).attr("data-reviewName")) == -1) {
                    var checkboxesCheckedString = "";

                    var answer = "";


                    reviewString = reviewString + "<div class='row'>" +
                        "<div class='col-xs-3 text-left'>" +
                        "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
                        "</div>";

                    $('input[data-reviewName="' + $(this).attr("data-reviewName") + '"]').each(function () {
                        if ($(this).is(":checked")) {
                            //alert($(this).val());
                            checkboxesCheckedString = checkboxesCheckedString + $(this).val() + ", ";
                        }
                    });
                    checkboxesCheckedString = checkboxesCheckedString.replace(/,\s*$/, "");

                    if (checkboxesCheckedString.length > 0) {
                        answer = checkboxesCheckedString;
                    }
                    else {
                        answer = blankAnswer;
                    }

                    reviewString = reviewString + "<div class='col-xs-9'>" +
                        "<div class='reviewSpan' id='reviewBrokerFee'>" + answer + "</div>" +
                        "</div>";

                    reviewString = reviewString + "</div>";
                    reviewString = reviewString + "<br>";
                    checkboxesReviewed = checkboxesReviewed + $(this).attr("data-reviewName") + ";";
                }
                else {

                }
            }
            else if ($(this).is(':radio') && $(this).attr("data-reviewName")) {


                var answer = "";
                if ($("input:radio[name='" + $(this).attr('name') + "']:checked").val().length > 0) {
                    answer = $("input:radio[name='" + $(this).attr('name') + "']:checked").val();
                }
                else {
                    answer = blankAnswer;
                }

                reviewString = reviewString + "<div class='row'>" +
                    "<div class='col-xs-3 text-left'>" +
                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
                    "</div>" +
                    "<div class='col-xs-9'>" +
                    "<div class='reviewSpan' id='reviewBrokerFee'>" + answer + "</div>" +
                    "</div>" +
                    "</div>";
                reviewString = reviewString + "<br>";
            }
            else {
                var answer = "";
                if ($(this).val().length > 0) {
                    answer = $(this).val()
                }
                else {
                    answer = blankAnswer;
                }

                reviewString = reviewString + "<div class='row'>" +
                    "<div class='col-xs-3 text-left'>" +
                    "<label class='reviewLabel '>" + $(this).attr("data-reviewName") + "</label><br>" +
                    "</div>" +
                    "<div class='col-xs-9'>" +
                    "<div class='reviewSpan' id='reviewBrokerFee'>" + answer + "</div>" +
                    "</div>" +
                    "</div>";
                reviewString = reviewString + "<br>";
            }


        }


    });
    //alert("review String: " + reviewString);
    $("#otherReviewInsert").html(reviewString);

    //ATTACHED FILES
    var filesInsert = "";
    $(':file').each(function(){
        var file = this.files[0];
        if(file === undefined){

        }
        else{
            var ext = $(this).val().split('.').pop().toLowerCase();

            //alert('Only .zip, .doc, .docx, .xlsx, .xls, .pdf are permitted');
            var iconFilePath = "";
            if(ext == "zip") {
                iconFilePath = "zipIcon.png"
            }
            else if(ext == "doc"){
                iconFilePath = "docIcon.png"
            }
            else if(ext == "docx"){
                iconFilePath = "docxIcon.png"
            }
            else if(ext == "xls"){
                iconFilePath = "xlsIcon.png"
            }
            else if(ext == "xlsx"){
                iconFilePath = "xlsxIcon.png"
            }
            else if(ext == "pdf"){
                iconFilePath = "pdfIcon.png"
            }
            else if(ext == "txt"){
                iconFilePath = "txtIcon.png"
            }
            else{
                iconFilePath = "fileIcon.png"
            }

            console.log("Change: " + file);

            var name = file.name;
            var size = file.size;
            var type = file.type;
            filesInsert = filesInsert +
                "<div class='row'>" +
                "<div class='col-xs-12 text-left'>" +
                "<div class='reviewSpan' id='review'><img src='/portal/images/" + iconFilePath + "' height='16' width='16' style='margin-right:10px'/>" + name + "</div>" +
                "</div>" +
                "</div>";
        }

    });

    $('#reviewAttachedFilesInsert').html(filesInsert);

}


function getQuestions(riskChosen, questionCategory){
    $.ajax({
        method: "POST",
        url: "/portal/Async/getQuestionsForRiskType",
        data: {
            riskType: riskChosen,
            questionCategory: questionCategory

        }
    })
        .done(function (msg) {
            //alert(msg)
            var questionArray = msg.split("&;;&")[0].split("&;&");
            var questionCategories = msg.split("&;;&")[1].slice(1, -1).split(",");
            buildQuestionForm(questionArray, questionCategories)
        });
}

function buildQuestionForm(questionArray, questionCategories){
    //alert(questionArray);
    //alert(questionCategories);
    var htmlString = "";

    //Build Panels and Questions
    for(var i=0;i<questionCategories.length;i++){
        //alert(questionArray[i]);
        //alert(questionCategories[i]);
        var columns = 2;

        //GET ALL QUESTIONS FOR THIS CATEGORY
        var questionsForThisCategory = "";
        for(var j=0; j<questionArray.length;j++){
            if(questionArray[j].split("&,&")[0].trim() === questionCategories[i].trim()){
                questionsForThisCategory = questionsForThisCategory + questionArray[j] + "&;&";
            }

        }
        if(questionCategories[i].trim() === "Physical Locations"){
            columns = 1;
        }
        else{
            columns = 2;
        }
        htmlString = htmlString +
            "<div class='panel panel-primary'>" +
                "<div class='panel-heading'>" +
                    "<h3 class='panel-title' style='font-size: 20px;'>" + questionCategories[i] +"</h3>" +
                "</div>" +
                "<div class='panel-body' id='" + questionCategories[i] + "_panelBody'>" +
                    buildQuestionPanelBody(questionsForThisCategory, columns) +
                "</div>" +
            "</div>"
        ;
    }

    $("#questionsContainer").html(htmlString);

    var date_input=$('.datepicker');
    date_input.datepicker(options);

}

function buildQuestionPanelBody(questionsForThisCategory, columns){
    var leftColumnHtml ="";
    var rightColumnHtml = "";
    var htmlString = "";
    var completedQuestionGroups = "";
    alert(questionsForThisCategory);

    if(columns==1){
        for(var r=0; r<questionsForThisCategory.split("&;&").length; r++){
            //console.log(questionsForThisCategory.split("&;&")[r+1])
            htmlString = htmlString +
                "<div class='row'>" +
                "<div class='col-xs-12'>" +
                buildQuestion(questionsForThisCategory.split("&;&")[r].split("&,&")) +
                "</div>" +
                "</div>";
        }
    }
    else if(columns==2){
        for(var r=0; r<questionsForThisCategory.split("&;&").length; r++){

            //console.log(questionsForThisCategory.split("&;&")[r+1])

            if(questionsForThisCategory.split("&;&")[r].split("&,&")[15] != "null"){
                htmlString = htmlString +
                    "<div class='row' style='margin-top:20px; margin-bottom:20px'>" +
                    "<div class='col-xs-6'>";
                console.log("QUESTION Not Printed: " + questionsForThisCategory.split("&;&")[r].split("&,&")[15])
                var groupName = questionsForThisCategory.split("&;&")[r].split("&,&")[15];
                var questionIndexes = "";
                if($.inArray(groupName, completedQuestionGroups.split("&;&")) == -1){
                    for(var q=r; q<questionsForThisCategory.split("&;&").length; q++){
                        if(questionsForThisCategory.split("&;&")[q].split("&,&")[15] == groupName){
                            questionIndexes = questionIndexes + q + ",";
                        }
                    }
                    questionIndexes = questionIndexes.replace(/,\s*$/, "");
                    console.log("QUESTION Indexes: " + questionIndexes);

                    for(var i = 0; i<questionIndexes.split(",").length;i++){
                        console.log("QUESTION I: " + i);
                        console.log("QUESTION I: " + questionsForThisCategory.split("&;&")[questionIndexes.split(",")[i]].split("&,&"));

                        htmlString = htmlString + buildQuestion(questionsForThisCategory.split("&;&")[questionIndexes.split(",")[i]].split("&,&"));
                        htmlString = htmlString +
                            "</div>" +"<div class='col-xs-6'>";
                    }

                    completedQuestionGroups = completedQuestionGroups + groupName + "&;&";
                }

            }
            else{
                htmlString = htmlString +
                    "<div class='row' >" +
                    "<div class='col-xs-6'>";
                console.log("QUESTION: " + questionsForThisCategory.split("&;&")[r].split("&,&"))
                htmlString = htmlString + buildQuestion(questionsForThisCategory.split("&;&")[r].split("&,&"));
                //questionsForThisCategory = questionsForThisCategory.splice(index, 1);

            }

            htmlString = htmlString +
                "</div>" +
                "<div class='col-xs-6'>";
            var groupName = questionsForThisCategory.split("&;&")[r+1].split("&,&")[15];
            console.log("GROUP NAME : " + groupName);
            if(r+1<questionsForThisCategory.split("&;&").length && $.inArray(groupName, completedQuestionGroups.split("&;&")) == -1){
                console.log("QUESTION r1: " + questionsForThisCategory.split("&;&")[r+1].split("&,&"))
                htmlString = htmlString + buildQuestion(questionsForThisCategory.split("&;&")[r+1].split("&,&"));
            }

            htmlString = htmlString +
                "</div>" +
                "</div>";
            r = r+1;
        }
    }
    else if(columns==3){
        for(var r=0; r<questionsForThisCategory.split("&;&").length; r++){
            //console.log(questionsForThisCategory.split("&;&")[r+1])
            htmlString = htmlString +
                "<div class='row'>" +
                "<div class='col-xs-4'>" +
                buildQuestion(questionsForThisCategory.split("&;&")[r].split("&,&")) +
                "</div>" +
                "<div class='col-xs-4'>";
            if(r+1<questionsForThisCategory.split("&;&").length){
                htmlString = htmlString + buildQuestion(questionsForThisCategory.split("&;&")[r+1].split("&,&"));
            }
            htmlString = htmlString +
                "</div>" +
                "<div class='col-xs-4'>";
            if(r+1<questionsForThisCategory.split("&;&").length){
                htmlString = htmlString + buildQuestion(questionsForThisCategory.split("&;&")[r+1].split("&,&"));
            }
            htmlString = htmlString +
                "</div>" +
                "</div>";
            r = r+2;
        }
    }
    return htmlString;
}

function buildQuestion(questionParameters){
    //alert(questionParameters[0]);
    var htmlString = "";
    var category = questionParameters[0];
    var htmlID = questionParameters[1];
    var htmlClass = questionParameters[2];
    var htmlInputType = questionParameters[3]
    var htmlInputName = questionParameters[4]
    var htmlInputValue = questionParameters[5]
    var htmlCheckboxRadioText = questionParameters[6]
    var defaultChecked = questionParameters[7]
    var dropdownOptionsValText = questionParameters[8]
    var htmlDataReviewName = questionParameters[9]
    var htmlPlaceholder = questionParameters[10]
    var questionText = questionParameters[11]
    var htmlStyle = questionParameters[12]
    var required = questionParameters[13]
    var attachments = questionParameters[14]
    var questionGroup = questionParameters[15]

    if(htmlInputType === "text"){
        htmlString = htmlString +
            "<div class='form-group col-xs-12'>" +
            "<label class='control-label'>" + questionText + "</label>" +
            "<input " +
            "class='" + htmlClass + "' " +
            "type='" + htmlInputType + "' " +
            "data-reviewName='" + htmlDataReviewName + "' " +
            "placeholder = '" + htmlPlaceholder + "' " +
            "name='" + htmlInputName + "' />" +
            "</div>";
    }
    else if(htmlInputType === "email"){
        htmlString = htmlString +
            "<div class='form-group col-xs-12'>" +
            "<label class='control-label'>" + questionText + "</label>" +
            "<input " +
            "class='" + htmlClass + "' " +
            "type='" + htmlInputType + "' " +
            "data-reviewName='" + htmlDataReviewName + "' " +
            "placeholder = '" + htmlPlaceholder + "' " +
            "name='" + htmlInputName + "' />" +
            "</div>";
    }
    else if(htmlInputType === "checkbox"){
        htmlString = htmlString +
            "<div class='form-group col-xs-12" + (required=="Y" ? "checkboxGroupRequired" : "") +  "'>" +
            "<label class='title control-label' style='margin-top:0px'>" +
            (required=="Y" ? "<span style='color:red;'>*</span> " : "") + questionText + "</label>";

        for(var i=0;i<htmlInputValue.split(";").length; i++){
            htmlString = htmlString +
                "<p class='control-label'><input type='" + htmlInputType + "' class='" + htmlClass + "'" +
                "data-reviewName='" + htmlDataReviewName + "' name='" + htmlInputName + "'" +
                "value='" + htmlInputValue.split(";")[i] + "'/> " + htmlCheckboxRadioText.split(";")[i] + "</p>" ;
        }
        htmlString = htmlString +
            "</div>";
    }
    else if(htmlInputType === "radio"){
        htmlString = htmlString +
            "<div class='form-group col-xs-12'>" +
            "<label class='title control-label' style='margin-top:0px'>" +
            (required=="Y" ? "<span style='color:red;'>*</span> " : "") + questionText + "</label>";

        for(var i=0;i<htmlInputValue.split(";").length; i++){
            htmlString = htmlString +
                "<p class='control-label'><input type='" + htmlInputType + "' class='" + htmlClass + "'" +
                "data-reviewName='" + htmlDataReviewName + "' name='" + htmlInputName + "'" +
                "value='" + htmlInputValue.split(";")[i] + "'/> " + htmlCheckboxRadioText.split(";")[i] + "</p>" ;
        }
        htmlString = htmlString +
            "</div>";
    }
    else if(htmlInputType === "stateDropdown"){
        htmlString = htmlString +
            "<div class='form-group col-xs-12" + (required=="Y" ? "checkboxGroupRequired" : "") +  "'>" +
            "<label class='title control-label' style='margin-top:0px'>" +
            (required=="Y" ? "<span style='color:red;'>*</span> " : "") + questionText + "</label>" +
                "<select class='form-control ' name='" + htmlInputName + "'  data-reviewName='" + htmlDataReviewName + "' id='" + htmlID + "'" +
                (required=="Y" ? "required='required' >" : "") +
                "<option value='invalid' selected='selected'>State</option>" +
                "<option value='AL'>Alabama</option>" +
                "<option value='AK'>Alaska</option>" +
                "<option value='AZ'>Arizona</option>" +
                "<option value='AR'>Arkansas</option>" +
                "<option value='CA'>California</option>" +
                "<option value='CO'>Colorado</option>" +
                "<option value='CT'>Connecticut</option>" +
                "<option value='DE'>Delaware</option>" +
                "<option value='DC'>District Of Columbia</option>" +
                "<option value='FL'>Florida</option>" +
                "<option value='GA'>Georgia</option>" +
                "<option value='GU'>Guam</option>" +
                "<option value='HI'>Hawaii</option>" +
                "<option value='ID'>Idaho</option>" +
                "<option value='IL'>Illinois</option>" +
                "<option value='IN'>Indiana</option>" +
                "<option value='IA'>Iowa</option>" +
                "<option value='KS'>Kansas</option>" +
                "<option value='KY'>Kentucky</option>" +
                "<option value='LA'>Louisiana</option>" +
                "<option value='ME'>Maine</option>" +
                "<option value='MD'>Maryland</option>" +
                "<option value='MA'>Massachusetts</option>" +
                "<option value='MI'>Michigan</option>" +
                "<option value='MN'>Minnesota</option>" +
                "<option value='MS'>Mississippi</option>" +
                "<option value='MO'>Missouri</option>" +
                "<option value='MT'>Montana</option>" +
                "<option value='NE'>Nebraska</option>" +
                "<option value='NV'>Nevada</option>" +
                "<option value='NH'>New Hampshire</option>" +
                "<option value='NJ'>New Jersey</option>" +
                "<option value='NM'>New Mexico</option>" +
                "<option value='NY'>New York</option>" +
                "<option value='NC'>North Carolina</option>" +
                "<option value='ND'>North Dakota</option>" +
                "<option value='OH'>Ohio</option>" +
                "<option value='OK'>Oklahoma</option>" +
                "<option value='OR'>Oregon</option>" +
                "<option value='PA'>Pennsylvania</option>" +
                "<option value='PR'>Puerto Rico</option>" +
                "<option value='RI'>Rhode Island</option>" +
                "<option value='SC'>South Carolina</option>" +
                "<option value='SD'>South Dakota</option>" +
                "<option value='TN'>Tennessee</option>" +
                "<option value='TX'>Texas</option>" +
                "<option value='UT'>Utah</option>" +
                "<option value='VT'>Vermont</option>" +
                "<option value='VI'>Virgin Islands</option>" +
                "<option value='VA'>Virginia</option>" +
                "<option value='WA'>Washington</option>" +
                "<option value='WV'>West Virginia</option>" +
                "<option value='WI'>Wisconsin</option>" +
                "<option value='WY'>Wyoming</option>" +
                "</select>" +
            "</div>";
    }
    else if(htmlInputType === "basicInsuredInfo"){
        htmlString = htmlString +
            "<div class='form-group has-feedback col-xs-12'>" +
            "<label for='namedInsured'>Name of Insured <span style='color:red;'>*</span></label>" +
            "<input type='text' style='text-transform: capitalize;' class='form-control' id='namedInsured' name='namedInsured'" +
            "placeholder='Name' data-toggle='tooltip' title='' required='required' />" +
            "<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true' style='top: 29px; display: none' ></span>" +
            "<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true' style='top: 29px; display: none' ></span>" +

            "</div>" +
            "<div class='form-group col-xs-12'>" +
            "<label for='phoneNumber'>Phone Number <span style='color:red;'>*</span></label>" +
        "<input type='text' class='form-control phoneNumberMask' name='phoneNumber' placeholder='(123) 456-7890' required='required' />" +
            "</div>" +
            "<div class='form-group col-xs-12'>" +
            "<label for='email'>Email address <span style='color:red;'>*</span></label>" +
        "<input type='email' class='form-control' name='namedInsuredEmail' placeholder='user@company.com' required='required' />" +
            "</div>" +
            "<div class='form-group col-xs-12'>" +
            "<label for='company'>Website</label>" +
            "<g:textField type='text' class='form-control' name='website' placeholder='www.xyz.com' />" +
            "</div>";
    }
    else if(htmlInputType === "address"){
        htmlString = htmlString +
            "<div class = 'form-group col-xs-12'>" +
            "<label class='control-label'>" + questionText + (required=="Y" ? "<span style='color:red;'>*</span> " : "") + "</label>" +
            "<input class='form-control' type='text' placeholder='Street address' name='" + htmlID + "_streetName' id='" + htmlInputName + "_streetName' onFocus='geolocateOtherForm()' " +
            (required=="Y" ? "required='required' " : "") + " />" +
            "</div>" +
            "<div class='form-group col-xs-12'>" +
            "<input class='form-control' type='text' placeholder = 'City' name='" + htmlID + "_city' id='" + htmlID + "_city' " +
            (required=="Y" ? "required='required' " : "") + " />" +
            "</div>" +
            "<div class='form-group col-xs-6'>" +
            "<input class='form-control' type='text' placeholder = 'Zip Code' name='" + htmlID + "_zipCode' id='" + htmlID + "_zipCode' " +
            (required=="Y" ? "required='required' " : "") + " />" +
            "</div>" +
            "<div class='form-group col-xs-6'>" +
            "<select class='form-control ' name='" + htmlID + "_state'  id='" + htmlID + "_state' " +
            (required=="Y" ? "required='required' " : "") + " >" +
            "<option value='invalid' selected='selected'>State</option>" +
            "<option value='AL'>Alabama</option>" +
            "<option value='AK'>Alaska</option>" +
            "<option value='AZ'>Arizona</option>" +
            "<option value='AR'>Arkansas</option>" +
            "<option value='CA'>California</option>" +
            "<option value='CO'>Colorado</option>" +
            "<option value='CT'>Connecticut</option>" +
            "<option value='DE'>Delaware</option>" +
            "<option value='DC'>District Of Columbia</option>" +
            "<option value='FL'>Florida</option>" +
            "<option value='GA'>Georgia</option>" +
            "<option value='GU'>Guam</option>" +
            "<option value='HI'>Hawaii</option>" +
            "<option value='ID'>Idaho</option>" +
            "<option value='IL'>Illinois</option>" +
            "<option value='IN'>Indiana</option>" +
            "<option value='IA'>Iowa</option>" +
            "<option value='KS'>Kansas</option>" +
            "<option value='KY'>Kentucky</option>" +
            "<option value='LA'>Louisiana</option>" +
            "<option value='ME'>Maine</option>" +
            "<option value='MD'>Maryland</option>" +
            "<option value='MA'>Massachusetts</option>" +
            "<option value='MI'>Michigan</option>" +
            "<option value='MN'>Minnesota</option>" +
            "<option value='MS'>Mississippi</option>" +
            "<option value='MO'>Missouri</option>" +
            "<option value='MT'>Montana</option>" +
            "<option value='NE'>Nebraska</option>" +
            "<option value='NV'>Nevada</option>" +
            "<option value='NH'>New Hampshire</option>" +
            "<option value='NJ'>New Jersey</option>" +
            "<option value='NM'>New Mexico</option>" +
            "<option value='NY'>New York</option>" +
            "<option value='NC'>North Carolina</option>" +
            "<option value='ND'>North Dakota</option>" +
            "<option value='OH'>Ohio</option>" +
            "<option value='OK'>Oklahoma</option>" +
            "<option value='OR'>Oregon</option>" +
            "<option value='PA'>Pennsylvania</option>" +
            "<option value='PR'>Puerto Rico</option>" +
            "<option value='RI'>Rhode Island</option>" +
            "<option value='SC'>South Carolina</option>" +
            "<option value='SD'>South Dakota</option>" +
            "<option value='TN'>Tennessee</option>" +
            "<option value='TX'>Texas</option>" +
            "<option value='UT'>Utah</option>" +
            "<option value='VT'>Vermont</option>" +
            "<option value='VI'>Virgin Islands</option>" +
            "<option value='VA'>Virginia</option>" +
            "<option value='WA'>Washington</option>" +
            "<option value='WV'>West Virginia</option>" +
            "<option value='WI'>Wisconsin</option>" +
            "<option value='WY'>Wyoming</option>" +
            "</select>" +
            "</div>";
    }
    else if(htmlInputType === "insuredMailingAddress"){
        htmlString = htmlString +
            "<div class = 'form-group col-xs-12'>" +
            "<label class='control-label'>Mailing Address <span style='color:red;'>*</span></label>" +
        "<input class='form-control' type='text' placeholder='Street address' name='streetNameMailing' id='googleAutoAddress' onFocus='geolocateOtherForm()' required='required' />" +
            "</div>" +
            "<div class='form-group col-xs-12'>" +
            "<input class='form-control' type='text' placeholder = 'City' name='cityMailing' id='cityMailing' required='required' />" +
            "</div>" +
            "<div class='form-group col-xs-6'>" +
            "<input class='form-control' type='text' placeholder = 'Zip Code' name='zipCodeMailing' id='zipCodeMailing' required='required' />" +
            "</div>" +
            "<div class='form-group col-xs-6'>" +
            "<select class='form-control ' name='stateMailing'  data-reviewName='State' id='stateMailing' required='required' >" +
        "<option value='invalid' selected='selected'>State</option>" +
        "<option value='AL'>Alabama</option>" +
        "<option value='AK'>Alaska</option>" +
        "<option value='AZ'>Arizona</option>" +
        "<option value='AR'>Arkansas</option>" +
        "<option value='CA'>California</option>" +
        "<option value='CO'>Colorado</option>" +
        "<option value='CT'>Connecticut</option>" +
        "<option value='DE'>Delaware</option>" +
        "<option value='DC'>District Of Columbia</option>" +
    "<option value='FL'>Florida</option>" +
        "<option value='GA'>Georgia</option>" +
        "<option value='GU'>Guam</option>" +
        "<option value='HI'>Hawaii</option>" +
        "<option value='ID'>Idaho</option>" +
        "<option value='IL'>Illinois</option>" +
        "<option value='IN'>Indiana</option>" +
        "<option value='IA'>Iowa</option>" +
        "<option value='KS'>Kansas</option>" +
        "<option value='KY'>Kentucky</option>" +
        "<option value='LA'>Louisiana</option>" +
        "<option value='ME'>Maine</option>" +
        "<option value='MD'>Maryland</option>" +
        "<option value='MA'>Massachusetts</option>" +
        "<option value='MI'>Michigan</option>" +
        "<option value='MN'>Minnesota</option>" +
        "<option value='MS'>Mississippi</option>" +
        "<option value='MO'>Missouri</option>" +
        "<option value='MT'>Montana</option>" +
        "<option value='NE'>Nebraska</option>" +
        "<option value='NV'>Nevada</option>" +
        "<option value='NH'>New Hampshire</option>" +
    "<option value='NJ'>New Jersey</option>" +
    "<option value='NM'>New Mexico</option>" +
    "<option value='NY'>New York</option>" +
    "<option value='NC'>North Carolina</option>" +
    "<option value='ND'>North Dakota</option>" +
    "<option value='OH'>Ohio</option>" +
        "<option value='OK'>Oklahoma</option>" +
        "<option value='OR'>Oregon</option>" +
        "<option value='PA'>Pennsylvania</option>" +
        "<option value='PR'>Puerto Rico</option>" +
    "<option value='RI'>Rhode Island</option>" +
    "<option value='SC'>South Carolina</option>" +
    "<option value='SD'>South Dakota</option>" +
    "<option value='TN'>Tennessee</option>" +
        "<option value='TX'>Texas</option>" +
        "<option value='UT'>Utah</option>" +
        "<option value='VT'>Vermont</option>" +
        "<option value='VI'>Virgin Islands</option>" +
    "<option value='VA'>Virginia</option>" +
        "<option value='WA'>Washington</option>" +
        "<option value='WV'>West Virginia</option>" +
    "<option value='WI'>Wisconsin</option>" +
        "<option value='WY'>Wyoming</option>" +
        "</select>" +
        "</div>";
    }
    else if(htmlInputType === "insuredPhysicalAddress"){
        htmlString = htmlString +
            "<div class='row'>" +
            "<div class='form-group col-xs-12' style='margin-bottom: 0px;'>" +
            "<p><input type='checkbox' name='addressTheSame' id='addressTheSame' /> Physical Address is the same as Mailing Address </p>" +
        "</div>" +
        "</div>" +

        "<div class='locationDiv'>" +
            "<h5 class='locationHeader' style='font-size: 16px;'>Physical Address</h5>" +
        "<div class='row'>" +
            "<div class = 'form-group col-xs-4'>" +
            "<label class='control-label'>Street Address</label>" +
        "<input class='form-control showReview' type='text' data-reviewName='Physical Street Address' placeholder = 'Street address' name='streetName' />" +
            "</div>" +
            "<div class='form-group col-xs-4'>" +
            "<label class='control-label'>City</label>" +
            "<input class='form-control showReview' type='text' data-reviewName='Physical City' placeholder = 'City' name='city' />" +
            "</div>" +
            "<div class='form-group col-xs-2'>" +
            "<label class='control-label'>State</label>" +
"<select class='form-control ' name='state'  data-reviewName='State' id='state'  >" +
        "<option value='invalid' selected='selected'>State</option>" +
        "<option value='AL'>Alabama</option>" +
        "<option value='AK'>Alaska</option>" +
        "<option value='AZ'>Arizona</option>" +
        "<option value='AR'>Arkansas</option>" +
        "<option value='CA'>California</option>" +
        "<option value='CO'>Colorado</option>" +
        "<option value='CT'>Connecticut</option>" +
        "<option value='DE'>Delaware</option>" +
        "<option value='DC'>District Of Columbia</option>" +
    "<option value='FL'>Florida</option>" +
        "<option value='GA'>Georgia</option>" +
        "<option value='GU'>Guam</option>" +
        "<option value='HI'>Hawaii</option>" +
        "<option value='ID'>Idaho</option>" +
        "<option value='IL'>Illinois</option>" +
        "<option value='IN'>Indiana</option>" +
        "<option value='IA'>Iowa</option>" +
        "<option value='KS'>Kansas</option>" +
        "<option value='KY'>Kentucky</option>" +
        "<option value='LA'>Louisiana</option>" +
        "<option value='ME'>Maine</option>" +
        "<option value='MD'>Maryland</option>" +
        "<option value='MA'>Massachusetts</option>" +
        "<option value='MI'>Michigan</option>" +
        "<option value='MN'>Minnesota</option>" +
        "<option value='MS'>Mississippi</option>" +
        "<option value='MO'>Missouri</option>" +
        "<option value='MT'>Montana</option>" +
        "<option value='NE'>Nebraska</option>" +
        "<option value='NV'>Nevada</option>" +
        "<option value='NH'>New Hampshire</option>" +
    "<option value='NJ'>New Jersey</option>" +
    "<option value='NM'>New Mexico</option>" +
    "<option value='NY'>New York</option>" +
    "<option value='NC'>North Carolina</option>" +
    "<option value='ND'>North Dakota</option>" +
    "<option value='OH'>Ohio</option>" +
        "<option value='OK'>Oklahoma</option>" +
        "<option value='OR'>Oregon</option>" +
        "<option value='PA'>Pennsylvania</option>" +
        "<option value='PR'>Puerto Rico</option>" +
    "<option value='RI'>Rhode Island</option>" +
    "<option value='SC'>South Carolina</option>" +
    "<option value='SD'>South Dakota</option>" +
    "<option value='TN'>Tennessee</option>" +
        "<option value='TX'>Texas</option>" +
        "<option value='UT'>Utah</option>" +
        "<option value='VT'>Vermont</option>" +
        "<option value='VI'>Virgin Islands</option>" +
    "<option value='VA'>Virginia</option>" +
        "<option value='WA'>Washington</option>" +
        "<option value='WV'>West Virginia</option>" +
    "<option value='WI'>Wisconsin</option>" +
        "<option value='WY'>Wyoming</option>" +
        "</select>" +
        "</div>" +
        "<div class='form-group col-xs-2'>" +
        "<label class='control-label'>Zipcode</label>" +
        "<input class='form-control showReview' type='text' data-reviewName='Physical Zipcode' placeholder = 'Zip Code' name='zipCode' />" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class = 'form-group col-xs-2'>" +
        "<label class='control-label'># of Buildings</label>" +
    "<input class='form-control physicalAddressNumBuildings showReview' type='text' data-reviewName='# of Buildings' placeholder = '# of Buildings' name='numBuildings' />" +
        "</div>" +
        "<div class='form-group col-xs-2'>" +
        "<label class='control-label'>Habitational Units</label>" +
    "<input class='form-control physicalAddressHabUnits showReview' type='text' data-reviewName='Habitational Units' placeholder = 'Habitational units' name='habitationalUnits' />" +
        "</div>" +
        "<div class='form-group col-xs-2'>" +
        "<label class='control-label'>Comm Sq Ft</label>" +
    "<input class='form-control physicalAddressCommSqFt  showReview' type='text' data-reviewName='Comm Sq Ft' placeholder = 'Comm Sq Ft' name='commSqFt' />" +
        "</div>" +
        "<div class='form-group col-xs-2'>" +
        "<label class='control-label'>Interest</label>" +
        "<select class='form-control showReview' name='interest'  data-reviewName='Interest' id='interestSelect'>" +
        "<option value='invalid' selected='selected'>Owner</option>" +
        "<option value='corporation' selected='selected'>Leasee</option>" +
        "</select>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-xs-4'>" +
        "<button class='btn btn-primary btn-sm addLocation' type='button' >Add Another</button>" +
    "<button class='btn btn-danger btn-sm removeLocation'  type='button' >Remove</button>" +
        "</div>" +
        "</div>" +
        "<br>" +
        "<br>" +
        "</div>";
    }
    return htmlString
}



//////////////////////////
// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
    googleAutoAddress: 'short_name',
    googleAutoAddress: 'long_name',
    cityMailing: 'long_name',
    stateMailing: 'short_name',
    zipCodeMailing: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('googleAutoAddress')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {

        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        //alert(addressType);
        if(addressType === "street_number"){
            document.getElementById('googleAutoAddress').value = place.address_components[i]['short_name'];
        }
        else if(addressType === "route"){
            var temp = document.getElementById('googleAutoAddress').value
            document.getElementById('googleAutoAddress').value =  temp + " " + place.address_components[i]['long_name'];
        }
        else if(addressType === "locality"){
            document.getElementById('cityMailing').value = place.address_components[i]['long_name'];

            $("#cityMailing").attr('placeholder',"");
        }
        else if(addressType === "administrative_area_level_1"){
            //document.getElementById('stateMailing').value = place.address_components[i]['long_name'];
            var val = stateNameToAbbrevMAP[place.address_components[i]['long_name']];
            var sel = document.getElementById('stateMailing');
            var opts = sel.options;
            for(var opt, j = 0; opt = opts[j]; j++) {
                if(opt.value == val) {
                    sel.selectedIndex = j;
                    break;
                }
            }
        }
        else if(addressType === "postal_code"){
            document.getElementById('zipCodeMailing').value = place.address_components[i]['long_name'];
            $("#zipCodeMailing").attr('placeholder',"");
        }
        //if (componentForm[addressType]) {
        //    var val = place.address_components[i][componentForm[addressType]];
        //    document.getElementById(addressType).value = val;
        //}
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocateOtherForm() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}