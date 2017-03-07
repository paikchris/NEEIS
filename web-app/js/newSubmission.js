/**
 * Created by paikchris on 8/23/16.
 */

var stateNameToAbbrevMAP = {
    "": "",
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "District of Columbia": "DC",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "Guam": "GU",
    "Puerto Rico'": "PR",
    "Virgin Islands": "VI"
}
var autoSaveMap = {};
var loadedAutoSaveMap;
var currentStep;
var namedInsuredConflict = false;
var BORrequested = false;

$(document).ready(function () {
   console.log("NEWSUBMISSION.JS LOADED");

    setInterval(function() {
        // method to be executed;
        if($("li.active").length > 0 &&
            ($('#proposedEffectiveDate').val().length > 0 || $('#proposedExpirationDate').val().length > 0 || $('#totalBudgetConfirm').val().length > 1)){
            autoSaveFunction();
        }
    }, 10000);
    $(window).on('beforeunload', function ()
    {
        if($("li.active").children("a.riskOptionLink").html().trim().length > 0 &&
            ($('#proposedEffectiveDate').val().length > 0 || $('#proposedExpirationDate').val().length > 0 || $('#totalBudgetConfirm').val().length > 1)){
            autoSaveFunction();
        }
    });
    if(Cookies.getJSON("autosaveData") == undefined){
        //alert("undefined!")
    }
    else{
        //alert("load!")
        $('#loadSaveModal').modal('show');
    }

    $(document).on('click', '#loadSaveOKButton', function (){
        loadedAutoSaveMap  = Cookies.getJSON("autosaveData");
        loadSaveFunction(loadedAutoSaveMap);
    });
    $(document).on('click', '#loadSaveNOButton', function (){
        autoSaveMap = {};
        Cookies.remove('autosaveData');
    });

    //alert(loadedAutoSaveMap);

    $('html,body').scrollTop(0);
    var testingMode = false; //SET TO TRUE IF TESTING
    //$(document).on('mouseenter', '.deductibleColumn', function (){
    //
    //    //console.log("Text has over-flowed");
    //    var largestInnerWidth = 0;
    //    $(this).find('span').each(function( index ) {
    //        if($(this).innerWidth() > largestInnerWidth){
    //            largestInnerWidth = $(this).innerWidth();
    //        }
    //    });
    //    if (largestInnerWidth >  $(this).innerWidth()) {
    //        //Text has over-flowed
    //        //console.log("Text has over-flowed");
    //        //$(this).css("height", "22px");
    //        //$(this).css("height", "72px");
    //        $(this).animate({
    //            height:"72px"
    //
    //        }, 50, function() {
    //            $(this).css("white-space", "normal");
    //            $(this).css("height", "92px");
    //
    //        });
    //
    //    }
    //});
    //$(document).on('mouseleave', '.deductibleColumn', function (){
    //
    //    //console.log("Text has over-flowed");
    //    if ($(this).find('span').innerWidth() <=  $(this).innerWidth()) {
    //        $(this).animate({
    //            height:"22px"
    //
    //        }, 300, function() {
    //            $(this).css("height", "");
    //            $(this).css("white-space", "nowrap");
    //        });
    //
    //    }
    //});

    //$(".deductibleColumn").on({
    //    mouseenter: function () {
    //        //stuff to do on mouse enter
    //       //console.log("Text has over-flowed");
    //    },
    //    mouseleave: function () {
    //        //stuff to do on mouse leave
    //    }
    //});
    $(document).on('change', ':input[required]:visible', function (){
       //console.log($(this).val());
        if($(this).val().length > 0){
            $(this).closest(".form-group").removeClass("has-error");

        }
        else{
           //console.log("has error");
            $(this).closest(".form-group").addClass("has-error");
        }
    });

    $(document).on('change', '.riskTypeDropdown', function (){
        $('#nextButtonStep1').trigger('click');
    });
    $(document).on('focusout', ':input[required]:visible', function (){
       //console.log($(this).val());
        if($(this).val().length > 0){
            if($(this).attr("id") === "phoneNumber" && ($(this).val().trim() === "(___) ___-____")){
                $(this).closest(".form-group").addClass("has-error");
            }
            else if($(this).attr("id") === "stateMailing" && ($(this).val() === "invalid")){
                $(this).closest(".form-group").addClass("has-error");
            }
            else{
                //NO ERROR
                $(this).closest(".form-group").removeClass("has-error");
            }

        }
        else{
            $(this).closest(".form-group").addClass("has-error");
        }
    });

    var riskMapString = $("#riskMap").text();
    var coverageMapString = $("#coverageMap").text();
    var marketCompanyMapString = $("#marketCompanyMap").text();
    var riskCompanyMapString = $("#riskCompanyMap").text();
    var riskMap ={}; //riskType : Category
    var coverageMap = {}; //code:Description
    var marketCompanyMap = {};
    for(var i=0;i<riskMapString.split(";&;").length;i++){
        riskMap[riskMapString.split(";&;")[i].split(":")[0]] = riskMapString.split(";&;")[i].split(":")[1]
    }
    for(var i=0;i<coverageMapString.split(";").length;i++){
        coverageMap[coverageMapString.split(";")[i].split(":")[0]] = riskMapString.split(";")[i].split(":")[1]
    }
    for(var i=0;i<marketCompanyMapString.split(";&;").length;i++){
        marketCompanyMap[marketCompanyMapString.split(";&;")[i].split(";&#;")[0]] = marketCompanyMapString.split(";&;")[i].split(";&#;")[1]
    }


    //DATE PICKER SETUP
    var date_input=$('.datepicker'); //our date input has the name "date"
    var container=$('#page-content-wrapper');
    var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        orientation: "auto top",
        autoclose: true,
    };
    date_input.datepicker(options);

    //TERM LENGTH CALCULATION
    $(document).keyup(function(e) {
        if(e.keyCode==13){
            if($('#alertMessageModal').hasClass('in')) {
                $('#alertMessageModal').modal('hide');
            }
        }
    });
    $('#proposedEffectiveDate, #proposedExpirationDate').change(function(e){
            //alert($('#proposedEffectiveDate').val() + " " + $('#proposedExpirationDate').val());
        var riskChosen= getRiskTypeChosen();
        var riskCategory = getRiskCategoryChosen();
        var termLength;
        var datesAreValid = false;

        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var mdyEffective = $('#proposedEffectiveDate').val().split('/');
        var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0]-1, mdyEffective[1]);


        if($(this).attr('id') === "proposedEffectiveDate"){

            if (mdyEffectiveDateObject.getTime() < today.getTime()) {
               //console.log(e);
                //alert("]Effective Date must be a present or future date");
                $('#alertMessageContent').html("Effective Date must be a present or future date");
                $('#alertMessageModal').modal('show');
                $(this).val(today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear());
                datesAreValid = false;
            }
            else if(riskChosen === "Film Projects With Cast (No Work Comp)"){
                var termLengthTemp;
                var datesAreValidTemp = true;
                var todayTemp = new Date();
                todayTemp.setHours(0, 0, 0, 0);
                var mdyEffectiveTemp = $('#proposedEffectiveDate').val().split('/');
                var mdyEffectiveDateObjectTemp = new Date(mdyEffectiveTemp[2], mdyEffectiveTemp[0]-1, mdyEffectiveTemp[1]);
                var dayTemp = mdyEffectiveDateObjectTemp.getDate();
                if (dayTemp < 10) { dayTemp = '0' + dayTemp; }
                var monthIndexTemp = mdyEffectiveDateObjectTemp.getMonth() + 1;
                if (monthIndexTemp < 10) { monthIndexTemp = '0' + monthIndexTemp; }
                var yearTemp = mdyEffectiveDateObject.getFullYear();
                yearTemp = mdyEffectiveDateObjectTemp.getFullYear() + 1;
                $("#proposedExpirationDate").val( (monthIndexTemp) + "/" + dayTemp + "/" + yearTemp);
                $('#proposedTermLength').val(365 + " Days");
            }
            else if(riskChosen.indexOf("Film Projects") > -1) {
                //console.log("DO NOTHING")
            }
            else if(riskCategory === "Special Events"){
                var termLengthTemp;
                var datesAreValidTemp = true;
                var todayTemp = new Date();
                todayTemp.setHours(0, 0, 0, 0);
                var mdyEffectiveTemp = $('#proposedEffectiveDate').val().split('/');
                var mdyEffectiveDateObjectTemp = new Date(mdyEffectiveTemp[2], mdyEffectiveTemp[0]-1, mdyEffectiveTemp[1]);
                mdyEffectiveDateObjectTemp.setDate(mdyEffectiveDateObjectTemp.getDate()+5);
                var dayTemp = mdyEffectiveDateObjectTemp.getDate();
                if (dayTemp < 10) { dayTemp = '0' + dayTemp; }
                var monthIndexTemp = mdyEffectiveDateObjectTemp.getMonth() + 1;
                if (monthIndexTemp < 10) { monthIndexTemp = '0' + monthIndexTemp; }
                var yearTemp = mdyEffectiveDateObject.getFullYear();
                //yearTemp = mdyEffectiveDateObjectTemp.getFullYear() + 1;
                $("#proposedExpirationDate").val( (monthIndexTemp) + "/" + dayTemp + "/" + yearTemp);
                $('#proposedTermLength').val(5 + " Days");
            }
            else{
                var termLengthTemp;
                var datesAreValidTemp = true;
                var todayTemp = new Date();
                todayTemp.setHours(0, 0, 0, 0);
                var mdyEffectiveTemp = $('#proposedEffectiveDate').val().split('/');
                var mdyEffectiveDateObjectTemp = new Date(mdyEffectiveTemp[2], mdyEffectiveTemp[0]-1, mdyEffectiveTemp[1]);
                var dayTemp = mdyEffectiveDateObjectTemp.getDate();
                if (dayTemp < 10) { dayTemp = '0' + dayTemp; }
                var monthIndexTemp = mdyEffectiveDateObjectTemp.getMonth() + 1;
                if (monthIndexTemp < 10) { monthIndexTemp = '0' + monthIndexTemp; }
                var yearTemp = mdyEffectiveDateObject.getFullYear();
                yearTemp = mdyEffectiveDateObjectTemp.getFullYear() + 1;
                $("#proposedExpirationDate").val( (monthIndexTemp) + "/" + dayTemp + "/" + yearTemp);
                $('#proposedTermLength').val(365 + " Days");
            }

        }


        if($('#proposedEffectiveDate').val().length > 0 && $('#proposedExpirationDate').val().length > 0){
            var mdyEffective = $('#proposedEffectiveDate').val().split('/');var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0]-1, mdyEffective[1]);
            var mdyExpiration = $('#proposedExpirationDate').val().split('/');
            var mdyExpirationDateObject = new Date(mdyExpiration[2], mdyExpiration[0]-1, mdyExpiration[1]);
            if((mdyEffective[2].length == 4 && mdyExpiration[2].length == 4)){//ENSURE THE YEAR IS 4 DIGITS LONG



                var days = Math.round((mdyExpirationDateObject-mdyEffectiveDateObject)/(1000*60*60*24));
                //alert(days);
                if(days == 1){
                    $('#proposedTermLength').val(days + " Day")
                    datesAreValid = true;
                }
                else if (days >1){
                    $('#proposedTermLength').val(days + " Days")
                    datesAreValid = true;
                }
                else if(days <1){
                    $('#alertMessageContent').html("Expiration Date must be after the Effective Date");
                    $('#alertMessageModal').modal('show');
                    $(this).val("");
                    $('#proposedTermLength').val("");
                    datesAreValid = false;
                }
                if(days > 365){
                    $('#alertMessageContent').html("Policy Term cannot exceed 1 year");
                    $('#alertMessageModal').modal('show');
                    $('#proposedExpirationDate').val("");
                    $('#proposedTermLength').val("");
                    datesAreValid = false;
                }

            }
            else{
                $(this).val("");
                $('#proposedTermLength').val("");
                datesAreValid = false;
            }

        }
        else{
            $('#proposedTermLength').val("");
            datesAreValid = false;
        }


        if (riskChosen.indexOf("Film Projects") > -1) {
            if(datesAreValid && $('#totalBudgetConfirm').val().trim().length > 0){
                //alert($('#totalBudgetConfirm').val());
                $('#coverageOptionsReview').addClass("panel-primary");
                $('#coverageOptionsReview').removeClass("panel-default");
                $('#coverageOptionsReview').parent().css("color", "#1f1f1f");
                $('#coverageOptionsTitle').css("color", "#fff");
                $('#loadingModal').show();
                if ($("li.active").length > 0) {
                    getProductsForRisk();
                }

                $('#principalPhotographyDateStart').val($('#proposedEffectiveDate').val());
                $('#principalPhotographyDateEnd').val($('#proposedExpirationDate').val());
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
        }
        else{
            if(datesAreValid){
                //alert($('#totalBudgetConfirm').val());
                $('#coverageOptionsReview').addClass("panel-primary");
                $('#coverageOptionsReview').removeClass("panel-default");
                $('#coverageOptionsReview').parent().css("color", "#1f1f1f");
                $('#coverageOptionsTitle').css("color", "#fff");
                $('#loadingModal').show();
                if ($("li.active").length > 0) {
                    getProductsForRisk();
                }

                $('#principalPhotographyDateStart').val($('#proposedEffectiveDate').val());
                $('#principalPhotographyDateEnd').val($('#proposedExpirationDate').val());
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

        }

        $('#CPKInputRadio').trigger("change");
    });

    $("#proposedTermLength").click(function(){
        //var input = document.getElementById("test");
        var string = $(this).val()
        var count = 0;
        for(var i=0; i< $(this).val().length ;i++){
            if(isNaN(string.charAt(i))){
               //console.log(string.charAt(i));
                count =i;
                break;
            }
        }
        this.setSelectionRange(0, count-1); // Highlights "Cup"
        this.focus();
    });

    $("#proposedTermLength").change(function(){
        var length = $(this).val().split(" ")[0];
        if(isNaN(length)){
            $(this).val($(this).val().replace(/\D/g,'') + " Days");
            if($(this).val().split(" ")[0].length ==0){
                var mdyEffective = $('#proposedEffectiveDate').val().split('/');
                var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0]-1, mdyEffective[1]);
                var newDate = new Date(mdyEffectiveDateObject.setTime( mdyEffectiveDateObject.getTime() + 1 * 86400000 ));


                var day = newDate.getDate();

                var monthIndex = newDate.getMonth() + 1;

                if (day < 10) { day = '0' + day; }
                if (monthIndex < 10) { monthIndex = '0' + monthIndex; }
                var year = newDate.getFullYear();


                $(this).val("1 Days");
            }
            $("#proposedExpirationDate").val( (monthIndex) + "/" + day + "/" + year);
            $("#proposedExpirationDate").trigger('change');
        }
        else{
           //console.log(length);
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            var mdyEffective = $('#proposedEffectiveDate').val().split('/');
            var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0]-1, mdyEffective[1]);
            var newDate = new Date(mdyEffectiveDateObject.setTime( mdyEffectiveDateObject.getTime() + length * 86400000 ));


            var day = newDate.getDate();

            var monthIndex = newDate.getMonth() + 1;

            if (day < 10) { day = '0' + day; }
            if (monthIndex < 10) { monthIndex = '0' + monthIndex; }
            var year = newDate.getFullYear();

            $("#proposedExpirationDate").val( (monthIndex) + "/" + day + "/" + year);
            $(this).val(length + " Days");

            if($(this).val().split(" ")[0].length ==0){
                $(this).val("1 Days");

                newDate = new Date(mdyEffectiveDateObject.setTime( mdyEffectiveDateObject.getTime() + 1 * 86400000 ));
                $("#proposedExpirationDate").val( (monthIndex) + "/" + day + "/" + year);

            }
            $("#proposedExpirationDate").trigger('change');
        }
    });


    $('#addressTheSame').change(function() {
        if($('#addressTheSame').is(':checked')) {
            var physicalAddressDiv = $("#locationDivContainer").children('.locationDiv').eq(0);
            //alert($("input[name='streetNameMailing']").val());
            //alert(physicalAddressDiv.html());
            //alert($("#stateMailing").val());
            physicalAddressDiv.find("input[name='streetName']").val( $("input[name='streetNameMailing']").val() );
            physicalAddressDiv.find("input[name='city']").val( $("input[name='cityMailing']").val() );
            physicalAddressDiv.find("select[name='state']").val( $("#stateMailing").val() );
            physicalAddressDiv.find("input[name='zipCode']").val( $("input[name='zipCodeMailing']").val() );
        }
        else {
        }
    });
    //////CHECKING NAME OF INSURED CALL BASED ON NAME AND ZIPCODE
    //$("#namedInsured, #zipCodeMailing,  #zipCodePhysical").on('input', function() {
    //    var checkName = $("#namedInsured").val();
    //    var zipCodeMailing =$("#zipCodeMailing").val();
    //    var zipCodePhysical = $("#zipCodePhysical").val();


        //if(checkName.length >1 && (zipCodeMailing.length ==5)){
        //   //alert("slkdf");
        //    $.ajax({
        //        method: "POST",
        //        url: "/portal/main/checkNamedInsured",
        //        data: {checkName: checkName, zipCodeMailing: zipCodeMailing, zipCodePhysical:zipCodePhysical}
        //    })
        //        .done(function (msg) {
        //           //alert( "Data Saved: " + msg );
        //
        //            //MSG RETURNS THE NUMBER OF MATCHES IN NAMEDINSURED AND ZIPCODE
        //           //console.log(msg);
        //            if(parseInt(msg) > 0){ //if THERE IS AT LEAST ONE MATCH
        //                $("#namedInsured").closest(".form-group").addClass("has-error");
        //                $("#namedInsured").siblings(".glyphicon-remove").css("display","");
        //
        //                $("#namedInsured").closest(".form-group").removeClass("has-success");
        //                $("#namedInsured").siblings(".glyphicon-ok").css("display","none");
        //                $('#namedInsured').attr("data-original-title","Named Insured already exists");
        //            }
        //            else if(parseInt(msg) == 0){ //IF NAME IS GOOD AND UNIQUE
        //
        //                $("#namedInsured").closest(".form-group").removeClass("has-error");
        //                $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
        //
        //                $("#namedInsured").closest(".form-group").addClass("has-success");
        //                $("#namedInsured").siblings(".glyphicon-ok").css("display","");
        //                $('#namedInsured').attr("data-original-title","Name is unique");
        //            }
        //        });
        //}
        //else{
        //    $("#namedInsured").closest(".form-group").removeClass("has-success");
        //    $("#namedInsured").siblings(".glyphicon-ok").css("display","none");
        //
        //    $("#namedInsured").closest(".form-group").removeClass("has-error");
        //    $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
        //    $('#namedInsured').attr("data-original-title","");
        //}
    //});
    //
    //$("#namedInsured").on('change', function() {
    //   //console.log("UPPERCASING");
    //   //console.log($(this).val());
    //    var nameString = $(this).val();
    //    //nameString = $(this).val().charAt(0).toUpperCase() + nameString.slice(1);
    //
    //    var words = nameString.split(" ");
    //    var output = "";
    //    var originalWord = "";
    //    for (i = 0 ; i < words.length; i ++){
    //        originalWord = words[i];
    //        lowerWord = words[i].toLowerCase();
    //        lowerWord = lowerWord.trim();
    //        //console.log(lowerWord)
    //        if(originalWord.slice(1,2) == originalWord.slice(1,2).toUpperCase() || originalWord.slice(2,3) == originalWord.slice(2,3).toUpperCase()){
    //            //console.log(lowerWord.slice(1,2) + "-" + lowerWord)
    //            capitalizedWord = originalWord.trim();
    //        }
    //        else{
    //            capitalizedWord = lowerWord.slice(0,1).toUpperCase() + lowerWord.slice(1);
    //        }
    //
    //        output += capitalizedWord;
    //        if (i != words.length-1){
    //            output+=" ";
    //        }
    //    }//for
    //    output[output.length-1] = '';
    //
    //    $(this).val(output);
    //   //console.log($(this).val());
    //    $("#nameOfProductionCompany").val(output);
    //    $("#nameOfProductionCompany").attr('placeholder', '');
    //});

    var matchNum =0;
    var matchingnamesArray ="";
    $("#namedInsured, #zipCodeMailing, #googleAutoAddress").bind("change focusout", function() {
        console.log($(this).attr('id'))
        if($(this).attr('id') === "namedInsured"){
            capitalizeFirstLetters($(this));
        }
        var checkName = $("#namedInsured").val();
        var zipCodeMailing =$("#zipCodeMailing").val();
        var zipCodePhysical = $("#zipCodePhysical").val();
        //alert(currentStep);
        console.log(checkName.length + "," + zipCodeMailing.length + "," + currentStep)
        if(currentStep===3){
            if(checkName.length >1 && (zipCodeMailing.length ==5) ){
                $.ajax({
                    method: "POST",
                    url: "/portal/main/checkNamedInsured",
                    data: {checkName: checkName, zipCodeMailing: zipCodeMailing, zipCodePhysical:zipCodePhysical}
                })
                    .done(function (msg) {
                        matchNum =0;
                        matchingnamesArray ="";
                        //MSG RETURNS THE NUMBER OF MATCHES IN NAMEDINSURED AND ZIPCODE
                        matchNum = msg.split("&;&")[0];
                        matchingnamesArray = msg.split("&;&")[1].split("&,&");
                        if(parseInt(matchNum) > 0){ //if THERE IS AT LEAST ONE MATCH
                            namedInsuredConflict=true;
                            //console.log("check show error")

                            $("#namedInsured").closest(".form-group").addClass("has-error");
                            $("#namedInsured").siblings(".glyphicon-remove").css("display","");

                            $("#namedInsured").closest(".form-group").removeClass("has-success");
                            $("#namedInsured").siblings(".glyphicon-ok").css("display","none");
                            $("#namedInsured").siblings(".glyphicon-list-alt").css("display","none");

                            $('#namedInsured').attr("data-original-title","Named Insured already exists");


                            //fill resolve Named Insured Modal
                            //alert($('#googleAutoAddress').val())
                            $('#resolveNamedInsured').val($('#namedInsured').val())
                            $('#resolveStreet').val($('#googleAutoAddress').val());
                            $('#resolveCity').val($('#cityMailing').val());
                            $('#resolveState').val($('#stateMailing').val());
                            $('#resolveZip').val($('#zipCodeMailing').val());

                            var htmlString ="";
                            for(var i=0; i<matchingnamesArray.length; i++){
                                if(matchingnamesArray[i].trim().length > 0){
                                    htmlString = htmlString + "<div class='row col-xs-12'><span class='col-xs-8' style='color:red'>" + matchingnamesArray[i] + "</span>" +
                                        "<span class='col-xs-4' style='color:red'>Broker of Record Needed</span></div>";
                                }

                            }
                            $('#matchingSubmissionsContainer').html(htmlString);

                            if(currentStep==3){
                                $('#checkNamedInsuredModal').modal({
                                    backdrop: 'static',
                                    keyboard: false
                                });
                                $("#resolveNamedInsured").trigger('change');
                            }

                        }
                        else if(parseInt(matchNum) == 0){ //IF NAME IS GOOD AND UNIQUE
                            //console.log("check no error")

                            $("#namedInsured").closest(".form-group").removeClass("has-error");
                            $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
                            $("#namedInsured").siblings(".glyphicon-list-alt").css("display","none");


                            $("#namedInsured").closest(".form-group").addClass("has-success");
                            $("#namedInsured").siblings(".glyphicon-ok").css("display","");
                            $('#namedInsured').attr("data-original-title","Name is unique");
                            BORrequested=false;
                            $('#BORRequestNotification').css('display', "none");
                            namedInsuredConflict=false;
                        }
                    });
            }
            else{
                console.log("check remove all")

                $("#namedInsured").closest(".form-group").removeClass("has-success");
                $("#namedInsured").siblings(".glyphicon-ok").css("display","none");

                $("#namedInsured").closest(".form-group").removeClass("has-error");
                $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
                $("#namedInsured").siblings(".glyphicon-list-alt").css("display","none");

                $('#namedInsured').attr("data-original-title","");
                BORrequested=false;
                $('#BORRequestNotification').css('display', "none");
                namedInsuredConflict=false;

            }
        }

    });

    $("#resolveNamedInsured, #resolveZip").bind("change focusout", function() {
        var checkName = $("#resolveNamedInsured").val();
        var resolveZip =$("#resolveZip").val();
        //console.log(checkName.length + "," + resolveZip.length + "," + currentStep)

        if(currentStep===3){
            if(checkName.length >1 && (resolveZip.length ==5)){
                $.ajax({
                    method: "POST",
                    url: "/portal/main/checkNamedInsured",
                    data: {checkName: checkName, zipCodeMailing: resolveZip, zipCodePhysical:""}
                })
                    .done(function (msg) {
                        namedInsuredConflict=true;
                        matchNum =0;
                        matchingnamesArray ="";
                        //MSG RETURNS THE NUMBER OF MATCHES IN NAMEDINSURED AND ZIPCODE
                        matchNum = msg.split("&;&")[0];
                        matchingnamesArray = msg.split("&;&")[1].split("&,&");
                        if(parseInt(matchNum) > 0){ //if THERE IS AT LEAST ONE MATCH
                            //console.log("resolve show error")
                            $("#resolveNamedInsured").closest(".form-group").addClass("has-error");
                            $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display","");

                            $("#resolveNamedInsured").closest(".form-group").removeClass("has-success");
                            $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display","none");
                            $('#resolveNamedInsured').attr("data-original-title","Named Insured already exists");

                            var htmlString ="";
                            for(var i=0; i<matchingnamesArray.length; i++){
                                if(matchingnamesArray[i].trim().length > 0){
                                    htmlString = htmlString + "<div class='row col-xs-12'><span class='col-xs-8' style='color:red'>" + matchingnamesArray[i] + "</span>" +
                                        "<span class='col-xs-4' style='color:red'>Broker of Record Needed</span></div>";
                                }

                            }
                            $('#matchingSubmissionsContainer').html(htmlString);
                            $('#conflictExistsDiv').css('display','');
                            document.getElementById("resolveConflictBOR").disabled = false;


                        }
                        else if(parseInt(matchNum) == 0){ //IF NAME IS GOOD AND UNIQUE
                            //console.log("resolve no error")
                            $("#resolveNamedInsured").closest(".form-group").removeClass("has-error");
                            $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display", "none");

                            $("#resolveNamedInsured").closest(".form-group").addClass("has-success");
                            $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display","");
                            $('#resolveNamedInsured').attr("data-original-title","Name is unique");

                            $('#matchingSubmissionsContainer').html("");
                            $('#conflictExistsDiv').css('display','none');
                            BORrequested=false;
                            $('#BORRequestNotification').css('display', "none");
                            namedInsuredConflict=false;
                            document.getElementById("resolveConflictBOR").disabled = true;

                        }
                    });
            }
            else{
                console.log("resolve remove all")
                $("#resolveNamedInsured").closest(".form-group").removeClass("has-success");
                $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display","none");

                $("#resolveNamedInsured").closest(".form-group").removeClass("has-error");
                $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display", "none");
                $('#resolveNamedInsured').attr("data-original-title","");
                BORrequested=false;
                $('#BORRequestNotification').css('display', "none");
                namedInsuredConflict=false;

            }

        }

    });

    $("#resolveConflictContinue").on("click", function() {
        document.getElementById("resolveConflictBOR").disabled = true;
        var checkName = $("#resolveNamedInsured").val();
        var resolveZip =$("#resolveZip").val();
        //console.log(checkName.length + "," + resolveZip.length + "," + currentStep)

            if(checkName.length >1 && (resolveZip.length ==5)) {
                $.ajax({
                    method: "POST",
                    url: "/portal/main/checkNamedInsured",
                    data: {checkName: checkName, zipCodeMailing: resolveZip, zipCodePhysical: ""}
                })
                    .done(function (msg) {
                        matchNum =0;
                        matchingnamesArray ="";
                        //MSG RETURNS THE NUMBER OF MATCHES IN NAMEDINSURED AND ZIPCODE
                        matchNum = msg.split("&;&")[0];
                        matchingnamesArray = msg.split("&;&")[1].split("&,&");
                        if(parseInt(msg) > 0){ //if THERE IS AT LEAST ONE MATCH
                            //console.log("resolve show error")
                            namedInsuredConflict=true;
                            $("#resolveNamedInsured").closest(".form-group").addClass("has-error");
                            $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display","");

                            $("#resolveNamedInsured").closest(".form-group").removeClass("has-success");
                            $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display","none");
                            $('#resolveNamedInsured').attr("data-original-title","Named Insured already exists");

                            var htmlString ="";
                            for(var i=0; i<matchingnamesArray.length; i++){
                                if(matchingnamesArray[i].trim().length > 0){
                                    htmlString = htmlString + "<div class='row col-xs-12'><span class='col-xs-8' style='color:red'>" + matchingnamesArray[i] + "</span>" +
                                        "<span class='col-xs-4' style='color:red'>Broker of Record Needed</span></div>";
                                }

                            }
                            $('#matchingSubmissionsContainer').html(htmlString);
                            $('#conflictExistsDiv').css('display','');


                            $('#resolveNamedInsured').focus();

                        }
                        else if(parseInt(msg) == 0) { //IF NAME IS GOOD AND UNIQUE
                            $("#resolveNamedInsured").closest(".form-group").removeClass("has-success");
                            $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display", "none");

                            $("#resolveNamedInsured").closest(".form-group").removeClass("has-error");
                            $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display", "none");
                            $('#resolveNamedInsured').attr("data-original-title", "");
                            $('#namedInsured').val($("#resolveNamedInsured").val());
                            $('#googleAutoAddress').val($("#resolveStreet").val());
                            $('#cityMailing').val($("#resolveCity").val());
                            $('#stateMailing').val($("#resolveState").val());
                            $('#zipCodeMailing').val($("#resolveZip").val());
                            $('#namedInsured').trigger('change');
                            $('#checkNamedInsuredModal').modal('hide');
                            BORrequested=false;
                            $('#BORRequestNotification').css('display', "none");
                            namedInsuredConflict=false;

                        }
                        document.getElementById("resolveConflictBOR").disabled = false;
                    });
            }

    });


    $("#resolveConflictBOR").on("click", function() {
        $("#namedInsured").closest(".form-group").removeClass("has-success");
        $("#namedInsured").siblings(".glyphicon-ok").css("display", "none");

        $("#namedInsured").closest(".form-group").removeClass("has-error");
        $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
        $('#namedInsured').attr("data-original-title", "");


        $("#namedInsured").siblings(".glyphicon-list-alt").css("display","");

        $('#checkNamedInsuredModal').modal('hide');
        $('#BORRequestNotification').css('display', "");
        BORrequested=true;
        namedInsuredConflict=false;
    });

    $("#ignoreConflictBOR").on("click", function() {
        var result = prompt("Renewal BOR Bypass");
        if(result === "password"){
            $("#namedInsured").closest(".form-group").removeClass("has-success");
            $("#namedInsured").siblings(".glyphicon-ok").css("display", "none");

            $("#namedInsured").closest(".form-group").removeClass("has-error");
            $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
            $('#namedInsured').attr("data-original-title", "");


            $("#namedInsured").siblings(".glyphicon-list-alt").css("display","none");

            $('#checkNamedInsuredModal').modal('hide');
            BORrequested=false;
            $('#BORRequestNotification').css('display', "none");
            namedInsuredConflict=false;
        }

    });

    //FILL COVERAGE SELECT OPTIONS
    var coverageString = "<option value='invalid' selected='selected'>Please Select Coverage</option>";
    for(var i=0;i<coverageMapString.split(";").length;i++){
        coverageString = coverageString + "<option value='" +
            coverageMapString.split(";")[i].split(":")[0] +
            "'>" + coverageMapString.split(";")[i].split(":")[1] +
            "</option>"
    }
    //alert(coverageString);
    $("#coverageSelect").html(coverageString);

    $(document.body).on('change', '.coverageCheckbox' ,function(){
        if($("#proposedTermLength").val().trim().length < 1){
            alert("Please enter coverage dates.")
            if($(this).is(':checked')) {
                this.checked = false
            }
            else{
                this.checked = false;
            }
        }
        else{
            //alert();
            if($(this).is(':checked')) {
                $(this).parent().parent().next().find('.productsSelect').css("display","");
            }
            else{
                $(this).parent().parent().next().find('.productsSelect').css("display","none");
            }

        }
    });

    //FILL COMPANY SELECT
    var marketCompanyString = "<option value='invalid' selected='selected'>Please Select Market Company</option>";
    for(var i=0;i<marketCompanyMapString.split(";&;").length;i++){
        marketCompanyString = marketCompanyString + "<option value='" +
            marketCompanyMapString.split(";&;")[i].split(";&#;")[0] +
            "'>" + marketCompanyMapString.split(";&;")[i].split(";&#;")[1] +
            "</option>"
    }
    $("#marketCompanySelect").html(marketCompanyString);

    var riskCompanyString = "<option value='invalid' selected='selected'>Please Select Risk Company</option>";
    for(var i=0;i<riskCompanyMapString.split(";").length;i++){
        riskCompanyString = riskCompanyString + "<option value='" +
            riskCompanyMapString.split(";")[i].split(",")[0] +
            "'>" + riskCompanyMapString.split(";")[i].split(",")[1] +
            "</option>"
    }
    $("#riskCompanySelect").html(riskCompanyString);

    ///LOCATION ADD REMOVE BUTTONS
    $(document.body).on('click', '.addLocation' ,function(){
        var htmlString = "";
        var count = 0;
        $('#locationDivContainer').children('.locationDiv').each(function () {
           //alert($(this).html());
            count++
            //alert(count);
            htmlString = $(this).html();
            htmlString = htmlString.replace("Physical Address" , "Location " + (count+1));
            htmlString = htmlString.replace("Location " + count , "Location " + (count+1));

        });

        $("#locationDivContainer").append("<div class='locationDiv'>" + htmlString + "</div>");

    });

    $(document.body).on('click', '.removeLocation' ,function(){
        var htmlString = "";
        var count = 0;
        //alert($(this).closest('.locationDiv').find('h5').html())
        if($(this).closest('.locationDiv').find('h5').html() === "Physical Address"){

        }
        else{
            $(this).closest('.locationDiv').remove();
            $('#locationDivContainer').children('.locationDiv').each(function () {
                //alert($(this).html());
                count++
                var locationHeader = $(this).find('h5').html();
                //alert(locationHeader);
                if(locationHeader == "Physical Address"){

                }
                else{
                    $(this).find('h5').html("Location " + count);
                }

                //htmlString = $(this).html();
                //htmlString = htmlString.replace("Location " + count , "Location " + (count+1));
            });
        }


        //$("#locationDivContainer").append("<br><br><div class='locationDiv'>" + htmlString + "</div>");

    });


    //MASK PHONE NUMBER FORMAT
    //
    $(document.body).on('focus', '.phoneNumberMask' ,function(){
        //this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3');
        //alert ("OK");
        $(".phoneNumberMask").mask("(999) 999-9999");
    });



    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        console.log(currentStep)
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);
       //console.log($('.btn-primary').html());


        if (!$item.hasClass('disabled') && !$($item)[0].hasAttribute("disabled")) {
            if(parseInt($('.btn-primary').html()) > parseInt($(this).html())){
                navListItems.removeClass('btn-primary').addClass('btn-default');
                $item.addClass('btn-primary');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
            else{
                var valid = validateFields();
                if(valid){
                    navListItems.removeClass('btn-primary').addClass('btn-default');
                    $item.addClass('btn-primary');
                    allWells.hide();
                    $target.show();
                    $target.find('input:eq(0)').focus();
                }
            }


        }
        currentStep = parseInt($('.btn-primary').html());
        console.log(currentStep)
    });

    $('#reviewSubmitButton').click(function(e){
        buildReview();
    });

    allNextBtn.click(function(e) {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;


        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");

            }
        }
        isValid = validateFields();

        if (isValid && $("li.active").length > 0) {
            $('#loadingModal').show();

            var riskChosen= getRiskTypeChosen();

            var riskCategory = getRiskCategoryChosen();
            $('#riskCategoryHeader').html(riskCategory);
            $('#riskTypeHeader').html(riskChosen);
            //alert(riskCategory);
            //LOGIC FOR DISPLAYING WHICH COVERAGE FORM TO DISPLAY
            $('#totalBudgetConfirmGroup').css('display', 'none');
            $('#premiumExpectedInputGroup').css('display', 'none');
            $('#howManyDaysIsTheEventGroup').css('display', 'none');
            $('#estimatedTotalAttendanceGroup').css('display', 'none');
            $('#largestNumberAttendeesGroup').css('display', 'none');
            $('#premiumExpectedInput').maskMoney({prefix:'$', precision:"0"});

            if (e.target.id == "nextButtonStep1" ) {
                currentStep = 1;
                BORrequested= false;
                $('#BORRequestNotification').css('display', "none");
                if ($("li.active").length > 0) {
                    //alert(riskCategory)
                    if(riskChosen === "Specific Film Projects Test"){
                        testingMode = true;
                    }
                    else if (riskChosen === "Film Projects Without Cast (With Work Comp)" || riskChosen === "Film Projects With Cast (With Work Comp)") {
                        //window.location.href = "http://www.neeis.com/d/users/sign_in";
                        logIntoLegacyNeeis();
                        $('#loadingModal').hide();;
                        return false;
                    }
                    else if (riskChosen.indexOf("Film Projects") > -1) {
                        $('#totalBudgetConfirmGroup').css('display', '');
                        var finishedLoading1 = false;
                        var finishedLoading2 = false;
                        var finishedLoading3 = false;
                        $("#insuredInfoInsert").load("./../forms/specFilm #insuredInfo", function () {
                            finishedLoading1 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                            }
                        });
                        $("#coverageCheckboxesDiv").load("./../forms/specFilm #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/specFilm #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/portal/js/forms/specFilm.js'+"?ts=" + new Date().getTime();
                            head.appendChild(script);
                            finishedLoading2 = true;

                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                            }

                        });
                    }
                    else if(riskCategory === "Entertainer"){
                        $('#premiumExpectedInputGroup').css('display', '');
                        $('#howManyDaysIsTheEventGroup').css('display', '');
                        $('#estimatedTotalAttendanceGroup').css('display', '');
                        $('#largestNumberAttendeesGroup').css('display', '');

                        $("#insuredInfoInsert").load("./../forms/entertainerForm #insuredInfo", function () {
                            finishedLoading1 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/entertainerForm #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/entertainerForm #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/portal/js/forms/specFilm.js'+"?ts=" + new Date().getTime();
                            head.appendChild(script);
                            finishedLoading2 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                            }
                        });
                        //$('#totalBudgetConfirmGroup').css('display', 'none');
                    }
                    else if(riskCategory === "Special Events"){
                        //alert(riskCategory)
                        $('#premiumExpectedInputGroup').css('display', '');
                        $('#howManyDaysIsTheEventGroup').css('display', '');
                        $('#estimatedTotalAttendanceGroup').css('display', '');
                        $('#largestNumberAttendeesGroup').css('display', '');

                        if (riskChosen === "Exhibitor" ||
                            riskChosen === "Concessionaires Non Food Sales" ||
                            riskChosen === "Concessionaires Food Sales" ||
                            riskChosen === "Attractions / Performers"){
                            $('.separatePolicy').css('display', '');

                            $("#insuredInfoInsert").load("./../forms/specialEventVendor #insuredInfo", function () {
                                finishedLoading1 = true;
                                if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                    $('#loadingModal').hide();
                                }
                            });
                            $("#coverageInfoPanel").load("./../forms/specialEventVendor #coverageCheckboxesDiv", function () {
                                finishedLoading3 = true;
                                if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                    $('#loadingModal').hide();
                                }
                            });
                            $("#riskSpecificInsert").load("./../forms/specialEventVendor #riskSpecificInfo", function () {
                                var head = document.getElementsByTagName('head')[0];
                                var script = document.createElement('script');
                                script.type = 'text/javascript';
                                script.src = '/portal/js/forms/specFilm.js'+"?ts=" + new Date().getTime();
                                var script1 = document.createElement('script');
                                script1.type = 'text/javascript';
                                script1.src = '/portal/js/forms/specialEventVendor.js'+"?ts=" + new Date().getTime();
                                head.appendChild(script1);
                                finishedLoading2 = true;
                                if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                    $('#loadingModal').hide();
                                }
                            });


                        }
                        else {
                            $("#insuredInfoInsert").load("./../forms/specialEventLiability #insuredInfo", function () {
                                finishedLoading1 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').hide();
                                }
                            });
                            $("#coverageInfoPanel").load("./../forms/specialEventLiability #coverageCheckboxesDiv", function () {
                                finishedLoading3 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').hide();
                                }
                            });
                            $("#riskSpecificInsert").load("./../forms/specialEventLiability #riskSpecificInfo", function () {
                                var head = document.getElementsByTagName('head')[0];
                                var script = document.createElement('script');
                                script.type = 'text/javascript';
                                script.src = '/portal/js/forms/specFilm.js' + "?ts=" + new Date().getTime();
                                var script1 = document.createElement('script');
                                script1.type = 'text/javascript';
                                script1.src = '/portal/js/forms/specialEventLiability.js' + "?ts=" + new Date().getTime();
                                head.appendChild(script1);
                                finishedLoading2 = true;
                                if (finishedLoading1 && finishedLoading2 && finishedLoading3) {
                                    $('#loadingModal').hide();
                                }
                            });
                        }
                        //$('#totalBudgetConfirmGroup').css('display', 'none');
                    }
                    else if(riskCategory === "Shell Corporation"){
                        //alert(riskCategory)
                        $('#premiumExpectedInputGroup').css('display', '');
                        $('#howManyDaysIsTheEventGroup').css('display', '');
                        $('#estimatedTotalAttendanceGroup').css('display', '');
                        $('#largestNumberAttendeesGroup').css('display', '');

                        $("#insuredInfoInsert").load("./../forms/shellCorp #insuredInfo", function () {
                            finishedLoading1 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                            }
                        });
                        $("#coverageInfoPanel").load("./../forms/shellCorp #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/shellCorp #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/portal/js/forms/specFilm.js'+"?ts=" + new Date().getTime();;
                            head.appendChild(script);
                            finishedLoading2 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                            }
                        });
                        //$('#totalBudgetConfirmGroup').css('display', 'none');
                    }
                    else if (riskChosen.indexOf("Comedian") > -1 ){
                        $('#premiumExpectedInputGroup').css('display', '');
                        $('#howManyDaysIsTheEventGroup').css('display', '');
                        $('#estimatedTotalAttendanceGroup').css('display', '');
                        $('#largestNumberAttendeesGroup').css('display', '');

                        $("#riskSpecificInsert").load("./../forms/otherForm.gsp #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/portal/js/forms/otherForm.js'+"?ts=" + new Date().getTime();
                            head.appendChild(script);
                            $('#loadingModal').hide();
                        });
                    }
                    else{
                        $('#premiumExpectedInputGroup').css('display', '');
                        $('#howManyDaysIsTheEventGroup').css('display', '');
                        $('#estimatedTotalAttendanceGroup').css('display', '');
                        $('#largestNumberAttendeesGroup').css('display', '');
                        var finishedLoading1 = false;
                        var finishedLoading2 = false;
                        var finishedLoading3 = false;
                        $("#insuredInfoInsert").load("./../forms/otherForm #insuredInfo", function () {
                            finishedLoading1 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                                if(testingMode){
                                    testingModeFill();
                                }
                            }
                        });
                        $("#coverageCheckboxesDiv").load("./../forms/otherForm #coverageCheckboxesDiv", function () {
                            finishedLoading3 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                                if(testingMode){
                                    testingModeFill();
                                }
                            }
                        });
                        $("#riskSpecificInsert").load("./../forms/otherForm #riskSpecificInfo", function () {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = '/portal/js/forms/otherForm.js'+"?ts=" + new Date().getTime();
                            head.appendChild(script);
                            finishedLoading2 = true;
                            if(finishedLoading1 && finishedLoading2 && finishedLoading3){
                                $('#loadingModal').hide();
                                if(testingMode){
                                    testingModeFill();
                                }
                            }
                        });
                    }
                    getProductsForRisk()
                }
                else {
                    alert("Please select a risk option");
                    $('#loadingModal').hide();
                    return false;
                }

            }
            else if (e.target.id == "nextButtonStep2") {
                currentStep = 2;
                if(riskChosen.indexOf("Film Projects") > -1){
                    if(!($('#EPKGcoverage').is(':checked') || $('#CPKCGLcoverage').is(':checked'))){

                        $('#loadingModal').hide();
                        $('#alertMessageContent').html("Please Select a Product");
                        $('#alertMessageModal').modal('show');
                        return;
                    }

                    $('#principalPhotographyDateStart').val($('#proposedEffectiveDate').val());
                    $('#principalPhotographyDateEnd').val($('#proposedExpirationDate').val());
                    $('#totalBudgetInput').val($('#totalBudgetConfirm').val());
                    $('#loadingModal').hide();
                }
                else{
                    $('#loadingModal').hide();
                }



            }
            else if (e.target.id == "nextButtonStep3") {
                if(namedInsuredConflict == true){
                    $('#loadingModal').hide();
                    $('#alertMessageContent').html("Please resolve conflict.");
                    $('#alertMessageModal').modal('show');
                    return;
                }
                else{
                    currentStep = 3;
                    buildReview();
                    $('#loadingModal').hide();
                }

                $('#loadingModal').hide();
            }
            else if (e.target.id == "nextButtonStep4") {
                currentStep = 4;
                var validSubmission = true;
                $('#progressBarModal').modal('show');
                var termLength = parseInt($("#proposedTermLength").val().split(" "));
                var coverageCodes = "";
                $('#limitsDeductPremiumInsert .coverageCodeString').each(function(){
                    coverageCodes = coverageCodes + $(this).html() + ",";
                });
                coverageCodes = coverageCodes.replace(/,\s*$/, "");

                var riskChosen= getRiskTypeChosen();
                var riskCategory = getRiskCategoryChosen();
                var $form = $('.form-control');
                var data = getFormData($form);
                //data.append("premiumAllLOBTotal", $('#premiumAllLOBTotal').html());
                data["premiumAllLOBTotal"] = $('#premiumAllLOBTotal').html();
                data["riskTypeChosen"] = riskChosen;
                data["riskCategoryChosen"] = riskCategory;
                data['filmingLocation'] =  $('#filmingLocation').html(); 
                var productID = "";
                var epkgLOB = "";
                var cpkLOB = "";
                var cglLOB = "";
                var pipChoiRateInfo = "";
                var pip1RateInfo = "";
                var pip2RateInfo = "";
                var pip3RateInfo = "";
                var pip4RateInfo = "";
                var pip5RateInfo = "";
                var EPKG37RateInfo = "";
                var CPKRateInfo = "";
                var CGLRateInfo = "";
                var EPKGRateInfo = "";
                var NOALRateInfo = "";

                if(riskChosen === "Film Projects With Cast (No Work Comp)"){
                    if($('#EPKGcoverage').is(':checked')){
                        productID = productID + "EPKG37" + ";";
                        //EPKG37RateInfo = $('#EPKG37_RateInfo').html();
                        //data["EPKG37RateInfo"] = EPKG37RateInfo;
                    }
                    EPKGRateInfo = $('#EPKG_RateInfo').html();
                    data["EPKGRateInfo"] = EPKGRateInfo;
                }
                else{
                    if($('#PIPChoiceInputRadio').is(':checked')){
                        productID = productID + "PIP CHOI" + ";";
                        //pipChoiRateInfo = $('#PIPCHOI_RateInfo').html();
                        //data["pipChoiRateInfo"] = pipChoiRateInfo;

                    }
                    if($('#PIP1InputRadio').is(':checked')){
                        productID = productID + "PIP 1" + ";";
                        //pip1RateInfo = $('#PIP1_RateInfo').html();
                        //data["pip1RateInfo"] = pip1RateInfo;
                    }
                    if($('#PIP2InputRadio').is(':checked')){
                        productID = productID + "PIP 2" + ";";
                        //pip2RateInfo = $('#PIP2_RateInfo').html();
                        //data["pip2RateInfo"] = pip2RateInfo;
                    }
                    if($('#PIP3InputRadio').is(':checked')){
                        productID = productID + "PIP 3" + ";";
                        //pip3RateInfo = $('#PIP3_RateInfo').html();
                        //data["pip3RateInfo"] = pip3RateInfo;
                    }
                    if($('#PIP4InputRadio').is(':checked')){
                        productID = productID + "PIP 4" + ";";
                        //pip4RateInfo = $('#PIP4_RateInfo').html();
                        //data["pip4RateInfo"] = pip4RateInfo;
                    }
                    if($('#PIP5InputRadio').is(':checked')){
                        productID = productID + "PIP 5" + ";";
                        //pip5RateInfo = $('#PIP5_RateInfo').html();
                        //data["pip5RateInfo"] = pip5RateInfo;
                    }
                    EPKGRateInfo = $('#EPKG_RateInfo').html();
                    data["EPKGRateInfo"] = EPKGRateInfo;
                }

                if($('#CPKInputRadio').is(':checked')){
                    if(termLength >30){
                        if(riskChosen === "Film Projects Without Cast (No Work Comp)" || riskChosen === "Film Projects With Cast (No Work Comp)"){
                            productID = productID + "BARCPKSF" + ";";
                        }
                        else if(riskChosen === "Annual Blanket Film Projects (DICE)"){
                            productID = productID + "BARCPKGP" + ";";
                        }


                    }
                    else if(termLength<=30){
                        productID = productID + "BARCPKGC" + ";";
                    }
                    CPKRateInfo = $('#CPK_RateInfo').html();
                    NOALRateInfo = $('#NOAL_RateInfo').html();
                    data["CPKRateInfo"] = CPKRateInfo + NOALRateInfo;

                }
                if($('#CGLInputRadio').is(':checked')){
                    if(termLength >30){
                        if(riskChosen === "Film Projects Without Cast (No Work Comp)" || riskChosen === "Film Projects With Cast (No Work Comp)"){
                            productID = productID + "BARCPKSF" + ";";
                        }
                        else if(riskChosen === "Annual Blanket Film Projects (DICE)"){
                            productID = productID + "BARCPKGP" + ";";
                        }

                    }
                    else if(termLength<=30){
                        productID = productID + "BARCPKGC" + ";";
                    }
                    CGLRateInfo = $('#CGL_RateInfo').html();
                    data["CGLRateInfo"] = CGLRateInfo;
                }
                if(productID.length == 0){
                    validSubmission = false;
                }

                //Get LOB Limits Deductibles Premiums
                var EPKGlimitsString = ""
                var EPKGdeductsString = "";

                if($('#EPKGcoverage').is(':checked')){
                    $('div#limitsDeductPremiumInsert div.EPKG_LOBRow').each(function(){
                        if($('#PIPChoiceInputRadio').is(':checked')){

                            epkgLOB = epkgLOB + $(this).find('.coverageColumn').children().first().html() + " ;&;" + $(this).find('.limitColumn').children().first().val() + " ;&;" +
                                $(this).find('.deductibleColumn').children().first().html() + ";&&;";
                            EPKGlimitsString = EPKGlimitsString + $(this).find('.limitColumn').children().first().val() + "\tEPKG:" +$(this).find('.coverageColumn').children().first().html() + "\n";
                            EPKGdeductsString = EPKGdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tEPKG:" +$(this).find('.coverageColumn').children().first().html() + "\n";
                           //console.log(EPKGlimitsString)
                        }
                        else{
                            if($(this).find('.coverageColumn').children('span').length > 1){
                                var epkgLOBRowObject = $(this);
                                var childCount = 0;
                                $(this).find('.coverageColumn').children('span').each(function(){
                                    epkgLOB = epkgLOB + $(this).html() + " ;&;" + $(epkgLOBRowObject).find('.limitColumn').children('span').eq(childCount).html() + " ;&;" +
                                    $(epkgLOBRowObject).find('.deductibleColumn').children('span').eq(childCount).html() + ";&&;";

                                    EPKGlimitsString = EPKGlimitsString + $(epkgLOBRowObject).find('.limitColumn').children('span').eq(childCount).html() + "\tEPKG:" +
                                        $(epkgLOBRowObject).find('.coverageColumn').children('span').eq(childCount).html() + "\n";
                                    EPKGdeductsString = EPKGdeductsString + $(epkgLOBRowObject).find('.deductibleColumn').children('span').eq(childCount).html() + "\tEPKG:" +
                                        $(epkgLOBRowObject).find('.coverageColumn').children('span').eq(childCount).html() + "\n";
                                    childCount++;

                                });
                            }
                            else{
                                epkgLOB = epkgLOB + $(this).find('.coverageColumn').children().first().html() + " ;&;" + $(this).find('.limitColumn').children().first().html() + " ;&;" +
                                    $(this).find('.deductibleColumn').children().first().html() + ";&&;";
                                EPKGlimitsString = EPKGlimitsString + $(this).find('.limitColumn').children().first().html() + "\tEPKG:" +$(this).find('.coverageColumn').children().first().html() + "\n";
                                EPKGdeductsString = EPKGdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tEPKG:" +$(this).find('.coverageColumn').children().first().html() + "\n";

                            }

                        }
                    });
                }

                var CPKlimitsString = ""
                var CPKdeductsString = "";
                var CGLlimitsString = ""
                var CGLdeductsString = "";
                if($('#CPKCGLcoverage').is(':checked')) {
                    if($('#CPKInputRadio').is(':checked')){
                        $('div#limitsDeductPremiumInsert div.CPK_LOBRow').each(function () {
                            cpkLOB = cpkLOB + $(this).find('.coverageColumn').children().first().html() + " ;&;" + $(this).find('.limitColumn').children().first().html() + " ;&;" +
                                $(this).find('.deductibleColumn').children().first().html() + ";&&;";
                            CPKlimitsString = CPKlimitsString + $(this).find('.limitColumn').children().first().html() + "\tCPK:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                            CPKdeductsString = CPKdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tCPK:" + $(this).find('.coverageColumn').children().first().html() + "\n";

                        });

                        //ADD NOAL
                        $('div#limitsDeductPremiumInsert div.NOAL_LOBRow').each(function () {
                            cpkLOB = cpkLOB + $(this).find('.coverageColumn').children().first().html() + " ;&;" + $(this).find('.limitColumn').children().first().html() + " ;&;" +
                                $(this).find('.deductibleColumn').children().first().html() + ";&&;";
                            CPKlimitsString = CPKlimitsString + $(this).find('.limitColumn').children().first().html() + "\tNOAL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                            CPKdeductsString = CPKdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tNOAL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                        });

                    }
                    else if($('#CGLInputRadio').is(':checked')){
                        $('div#limitsDeductPremiumInsert div.CGL_LOBRow').each(function () {
                            cglLOB = cglLOB + $(this).find('.coverageColumn').children().first().html() + " ;&;" + $(this).find('.limitColumn').children().first().html() + " ;&;" +
                                $(this).find('.deductibleColumn').children().first().html() + ";&&;";
                            CPKlimitsString = CPKlimitsString + $(this).find('.limitColumn').children().first().html() + "\tCGL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
                            CPKdeductsString = CPKdeductsString + $(this).find('.deductibleColumn').children().first().html() + "\tCGL:" + $(this).find('.coverageColumn').children().first().html() + "\n";

                        });
                    }




                }

                var premSummary = "";
                premSummary = premSummary + "Premium Distribution" + ";&;" + "" + ";&&;";
                $('#coverageOptionsReview div#premDistributionInsert div.row').each(function(){
                    if($(this).hasClass("TotalPremiumRow")){
                        premSummary = premSummary + $(this).find('.lineOfBusinessSpan').html() + ";&;" + $(this).find('.totalPremiumSpan').html() + ";&&;";

                    }
                    else{
                        premSummary = premSummary + $(this).find('.lineOfBusinessSpan').html() + ";&;" + $(this).find('.premiumSpan').html() + ";&&;";
                    }
                });
                if($('.taxDescriptionSpan').length){
                    premSummary = premSummary + "Taxes and Fees" + ";&;" + "" + ";&&;";
                    $('#coverageOptionsReview div#taxRows div.row').each(function(){
                        premSummary = premSummary + $(this).find('.taxDescriptionSpan').html() + ";&;" + $(this).find('.taxSpan').html() + ";&&;";
                    });
                }
                if($('#brokerFeeInput').length && $('#brokerFeeInput').val().length > 0){
                    premSummary = premSummary + "Broker Fee" + ";&;" + $('#brokerFeeInput').val() + ".00;&&;";
                }
                premSummary = premSummary + "Policy Fee" + ";&;" + "\$20.00" + ";&&;";




                data["epkgLOB"] = epkgLOB;
                data["cpkLOB"] = cpkLOB;
                data["cglLOB"] = cglLOB;
                data["productID"] = productID;
                data["premSummary"] = premSummary;
                data["termsInsert"] = $('#termsInsert').html();
                data["endorseInsert"] = $('#endorseInsert').html();
                data["maxCostOneProduction"] = $('#maxCostOneProduction').val();

                data["EPKGlimitsString"] = EPKGlimitsString;
                data["EPKGdeductsString"] = EPKGdeductsString;
                data["CPKlimitsString"] = CPKlimitsString;
                data["CPKdeductsString"] = CPKdeductsString;

                var productionType = "";
                //console.log("STEP 1 ============")
                $('input[data-reviewName="Type of Production"]').each(function () {
                    //console.log("STEP 2 =========" + $(this).val());
                    if ($(this).is(":checked")) {
                        //alert($(this).val());
                        productionType = productionType + $(this).val() + ", ";
                    }
                });
                productionType = productionType.replace(/,\s*$/, "");

                data["productionType"] = productionType;

                var productionInvolves = "";
                $('input[data-reviewName="Special Hazards Declared"]').each(function () {
                    if ($(this).is(":checked")) {
                        //alert($(this).val());
                        productionInvolves = productionInvolves + $(this).val() + ", ";
                    }
                });
                productionInvolves = productionInvolves.replace(/,\s*$/, "");

                data["productionInvolves"] = productionInvolves;

                if($('#EPKGPremiumLOBTotal').length){
                    data["EPKGPremium"] = $('#EPKGPremiumLOBTotal').html();
                }
                 if($('#CGLPremiumLOBTotal').length){
                    data["CGLPremium"] = $('#CGLPremiumLOBTotal').html();
                }
                 if($('#CPKPremiumLOBTotal').length){
                     data["CPKPremium"] = $('#CPKPremiumLOBTotal').html();
                     data["CPKPremiumOnly"] = $('#BARCPKGCPremiumTotal').html();
                     data["NOALPremiumOnly"] = $('#NOAL01PremiumTotal').html();
                     data["NOALcostOfHire"] = $('#costOfHireInput').val();
                }
                data["brokerFee"] = $('#brokerFeeInput').val();

                if(BORrequested){
                    data["statusID"] = "BOR";
                }
                data["statusID"] = "QO";
               //console.log("Broker Fee = " + data["CPKPremium"])
                //var taxDetails ="";
                //$('.taxSpan').each(function(){
                //    taxDetails = taxDetails + $(this).closeshtml() + "&;&" +
                //});


                /////////////////////////////////john edit



                ///////////////////////////////


                if(validSubmission){
                    $('#progressBarHeader').html("Please wait, your submission is being processed.")
                    $('.progress-bar').attr('aria-valuenow', "75").animate({
                        width: "75%"
                    }, 10000);

                    var newSubmissionConfirmParam = "";
                    autoSaveFunction();
                    console.log("UNDERWRITER QUESTIONS: " + uwQuestionsOrder);

                    /////TEST FOR BROKER OF RECORD STATUS
                    $.ajax({
                        method: "POST",
                        url: "/portal/Async/saveSubmissionToAIM",
                        data: {riskType: riskChosen,
                            totalGrossBudget: $("#totalBudgetInput").val().replace(/\$|,/g, ''),
                            proposedTermLength: $("#proposedTermLength").val(),
                            namedInsured: $('#namedInsured').val(),
                            coverageCodes: coverageCodes,
                            questionAnswerMap: JSON.stringify(autoSaveMap),
                            uwQuestionsMap: JSON.stringify(uwQuestionsMap),
                            uwQuestionsOrder: uwQuestionsOrder.join("&;&"),
                            jsonSerial: JSON.stringify(data),
                            BORrequested: BORrequested
                        }
                    })
                        .done(function (msg) {
                            //alert(msg);
                            //0620584,0620585
                            if(!msg.startsWith("Error")){
                                newSubmissionConfirmParam = msg;
                               //console.log("UPLOADING FILES");
                                //ATTACH FILES
                                var bioFile = $('#bioFile').get(0).files[0];
                                var lossesFile = $('#lossesFile').get(0).files[0]
                                var pyroFile = $('#pyroFile').get(0).files[0];
                                var stuntsFile = $('#stuntsFile').get(0).files[0];
                                //var animalPDF = $('#animalPDF').get(0).files[0];
                                //var dronePDF = $('#dronePDF').get(0).files[0];
                                var doodFile = $('#doodFile').get(0).files[0];
                                var treatmentFile = $('#treatmentFile').get(0).files[0];
                                var budgetFile = $('#budgetFile').get(0).files[0];
                                var quoteIDs = msg;

                                if(bioFile || lossesFile || pyroFile || stuntsFile || doodFile || treatmentFile || budgetFile){
                                    $('.progress-bar').attr('aria-valuenow', "75").animate({
                                        width: "75%"
                                    }, 2000);
                                    var formData = new FormData();
                                    formData.append('bioFile', bioFile);
                                    formData.append('lossesFile', lossesFile);
                                    formData.append('pyroFile', pyroFile);
                                    formData.append('stuntsFile', stuntsFile);
                                    //formData.append('animalPDF', stuntsFile);
                                    //formData.append('dronePDF', stuntsFile);
                                    formData.append('doodFile', doodFile);
                                    formData.append('treatmentFile', treatmentFile);
                                    formData.append('budgetFile', budgetFile);
                                    formData.append('quoteIDs', quoteIDs);

                                    $.ajax({
                                        method: "POST",
                                        url: "/portal/async/ajaxAttach",
                                        data: formData,
                                        cache: false,
                                        contentType: false,
                                        processData: false
                                    })
                                        .done(function (msg) {
                                           //console.log("Finished Uploading");
                                            $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
                                            $('#progressBarModal').modal('hide');

                                            //CLEAR AUTOSAVE INFO
                                            autoSaveMap = {};
                                            Cookies.remove('autosaveData');

                                            //REDIRECT TO SAVE SUCCESSFUL PAGE
                                            window.location.href = "./../main/newSubmissionConfirm.gsp?submissionID=" + newSubmissionConfirmParam;

                                        });
                                }
                                else{
                                   //console.log ("REDIRECTING");
                                    $('.progress-bar').attr('aria-valuenow', "100").animate({
                                        width: "100%"
                                    }, 2000);
                                    $('#progressBarModal').modal('hide');

                                    //CLEAR AUTOSAVE INFO
                                    autoSaveMap = {};
                                    Cookies.remove('autosaveData');

                                    //REDIRECT TO SAVE SUCCESSFUL PAGE
                                    window.location.href = "./../main/newSubmissionConfirm.gsp?submissionID=" + newSubmissionConfirmParam;
                                }
                            }
                            else{
                                $('#progressBarModal').modal('hide');
                                alert(msg)
                            }


                        }
                    );
                }
                else{
                    $('#progressBarModal').modal('hide');
                    alert("Error: Submission has errors");

                }


                $('#loadingModal').hide();

            }
            else if (e.target.id == "testPDF") {
                $('#loadingModal').hide();

                var $form = $('.form-control');
                var data = getFormData($form);

                $.ajax({
                    method: "POST",
                    url: "/portal/Async/intelledoxGenerate",
                    data: {
                        formData: JSON.stringify(data)

                    }
                })
                    .done(function (msg) {
                        alert(msg);
                    }
                );
                //var url = "http://138.91.159.55/Produce/wizard/nextPage?_=1477988403929"
                //var form = document.getElementById('intelledox');
                //var formData = new FormData(form);
                //
                ////var w2 = window.open(url);
                //formData.append("txtUsername", "admin");
                //formData.append("txtPassword", "admin");
                //$.ajax({
                //    type: "POST",
                //    url: "http://138.91.159.55/Produce/WebLogin.aspx",
                //    data: formData,
                //    contentType: false,
                //    processData: false,
                //    crossDomain: true,
                //    error: function (xhr, status, error) {
                //        alert(xhr);
                //    },
                //    success: function (response, status, xhr) {
                //       //console.log(xhr);
                //    }
                //});
                //
                //formData.append("Q1", "Groucho");
                //$.ajax({
                //    type: 'POST',
                //    url: url,
                //    contentType: false,
                //    processData: false,
                //    data: formData,
                //    error: function (xhr, status, error) {
                //        alert(xhr);
                //    },
                //    success: function (response, status, xhr) {
                //       //console.log(response);
                //    }
                //});
                return false;
            }
            $('#loadingModal').hide();
            nextStepWizard.removeAttr('disabled').trigger('click');
            $('html, body').animate({ scrollTop: 0 }, 'fast');

        }
        else{
            if($('#step-1').is(":visible") ){
                $('#alertMessageContent').html("Please Select Risk Type");
                $('#alertMessageModal').modal('show');
                if($('.drawer.open').length > 0){
                    $('html, body').animate({
                        scrollTop: ($('.drawer.open').first().offset().top) - 300
                    }, "fast");
                }
                else{
                    $('html, body').animate({
                        scrollTop: 0
                    }, "fast");
                }

            }
            else if($('#step-2').is(":visible") ){
                $('#alertMessageContent').html("Please complete required fields.");
                $('#alertMessageModal').modal('show');
                $('html, body').animate({
                    scrollTop: ($(".has-error").first().offset().top) - 300
                }, "fast");
            }
            else if($('#step-3').is(":visible") ){
                $('#alertMessageContent').html("Please complete required fields.");
                $('#alertMessageModal').modal('show');
                $('html, body').animate({
                    scrollTop: ($(".has-error").first().offset().top) - 300
                }, "fast");
            }
            else if($('#step-4').is(":visible") ){
                $('#alertMessageContent').html("Please complete required fields.");
                $('#alertMessageModal').modal('show');
                $('html, body').animate({
                    scrollTop: ($(".has-error").first().offset().top) - 300
                }, "fast");
            }



        }
    });

    allPrevBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");



        $(".form-group").removeClass("has-error");
        prevStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');



    $('.card').click(function(){
        if($(this).hasClass("cardselected")){
            $(this).removeClass("cardselected");
            $(this).addClass("card-unselected");
            $(".drawer").removeClass("open");
        }
        else{
            $('.cardselected').each(function(){
                $(this).removeClass("cardselected");
                $(this).addClass("card-unselected");

            });
            $(".drawer").removeClass("open");


            $(this).addClass("cardselected");
            $(this).removeClass("card-unselected");

            $(this).parent().siblings(".drawerContainer").children(".drawer").addClass("open");
        }

    });
    $('a.riskOptionLink').click(function() {
        $('.riskTypeDropdown').css('display', "none");
        $('a.riskOptionLink').parent().removeClass("active");
        $('a.riskOptionLink').parent().addClass("inactive");
        $(this).parent().addClass("active");
        $(this).parent().removeClass("inactive");

        if($(this).hasClass("riskOptionDropDown")){
            $(this).find('select').css('display',"");
        }
        else{
            setTimeout(
                function()
                {
                    $('#nextButtonStep1').trigger('click');
                }, 200)

        }
        return false;

    });

    $("#riskCategorySelect" ).change(function() {
        if( $(this).val() == "invalid"){
            $("#riskTypeSelect").css("display", "none");
            $("#riskTypeGroup").css("display", "none");
        }
        else{
            $("#riskTypeSelect").css("display", "");
            $("#riskTypeGroup").css("display", "");
            var category = $(this).val();
            var htmlString ="";
            for(var i=0;i<riskMapString.split(";&;").length;i++){
                if(riskMapString.split(";&;")[i].split(":")[1] === category){
                    htmlString = htmlString + "<option class='riskTypeSelectOption' value='" +
                        riskMapString.split(";&;")[i].split(":")[0] +
                        "'>" + riskMapString.split(";&;")[i].split(":")[0] +
                        "</option>"

                }
            }
            $("#riskTypeSelect").html(htmlString);
        }
    });

    $("#riskTypeSelect").change(function(){
        if($(this).val() == "invalid"){

        }
        else if ($(this).val().trim() == "Film Projects Without Cast (No Work Comp)"){

       }
    });



    //FINISH BUTTON CLICK
    $("#submitSubmissionButton").click(function(e){

    });
    //SUBMITTING FORM AND INFORMATION TO SERVER
    $(".newEmpireFormInput").each(function(index){
        if($(this).is(':checkbox')){

        }
        else if($(this).is('input:text') ){

        }
        else if($(this).is(':radio')){

        }
        else if($(this).is('select') ){
        }
        else if($(this.is('textarea'))){

        }

    });




});

function loadSaveFunction(loadMap){
    $('#progressBarHeader').html("Loading saved submission")
    $('.progress-bar').attr('aria-valuenow', "0").css("width", "0%");
    $('#progressBarModal').modal('show');
    $('.progress-bar').attr('aria-valuenow', "75").animate({
        width: "75%"
    }, 3000);
    var value;

    $('a').each(function (){
        if( $(this).html() ===  loadMap['riskChosen']){

            //alert("click " + $(this).html())
            var domObject = $(this);
            //console.log($(domObject).html())
            $(domObject).trigger('click');
        }
    });

    if(loadMap['proposedEffectiveDate'].length > 0){
        $('#proposedEffectiveDate').val(loadMap['proposedEffectiveDate']);
        $("#proposedEffectiveDate").trigger("change");
    }
    if(loadMap['proposedExpirationDate'].length > 0){
        $('#proposedExpirationDate').val(loadMap['proposedExpirationDate']);
        $("#proposedExpirationDate").trigger("change");
    }
    if(loadMap['proposedTermLength'].length > 0){
        $('#proposedTermLength').val(loadMap['proposedTermLength']);
        //$("#proposedTermLength").trigger("change");
    }
    if(loadMap['totalBudgetConfirm'].length > 0){

        $('#totalBudgetConfirm').val(loadMap['totalBudgetConfirm']);
        $("#totalBudgetConfirm").trigger("change");

    }
    setTimeout(function() {

        //console.log("wait")
        Object.keys(loadMap).forEach(function(key) {

            value = loadMap[key];
            //console.log("COOKIE VALUE = " + key + "-" + value);
            var domObject = $('#' + key);
            if ($(domObject).css("display") != "none") {
                $(domObject).css('display', '');
            }

            if ($(domObject).is("select")) {
                $(domObject).val(value);
                //console.log("SELECT TYPE = " + domObject);
                $(domObject).trigger("change");
            }
            else if ($(domObject).is(':checkbox')) {
                //console.log("CHECKBOX TYPE = " + domObject);
                if(value === true) {
                    $(domObject).prop("checked", true);

                }
                else {
                    $(domObject).prop("checked", false);
                }
                $(domObject).trigger("change");

            }
            else if ($(domObject).is(':radio')) {
                //console.log("RADIO TYPE = " + domObject);
                if(value === true) {
                    $(domObject).prop("checked", true);
                }
                else {
                    //$(domObject).prop("checked", false);
                }
                $(domObject).trigger("change");

            }
            else{
                //console.log("ELSE TYPE = " + domObject);
                $(domObject).val(value);
                $(domObject).trigger("change");

            }

        });

        if(loadMap['proposedEffectiveDate'].length == 0){
            $('#proposedEffectiveDate').val("");
            //$("#proposedEffectiveDate").trigger("change");
        }
        if(loadMap['proposedExpirationDate'].length == 0){
            $('#proposedExpirationDate').val("");
            //$("#proposedExpirationDate").trigger("change");
        }

        $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
        $('#progressBarModal').modal('hide');
    },2000);






        //

}

function autoSaveFunction(){
    //$( "*").each(function () {
    //    autoSaveMap[$(this).attr('id')] = $(this).val();
    //    //alert(autoSaveMap);
    //
    //});
    console.log("AUTOSAVING")
    autoSaveMap['riskChosen'] = getRiskTypeChosen();

    //ALL VISIBLE INPUTS
    $("input, select").each(function () {
        if ($(this).css("display") != "none") {
            if ($(this).is("select")) {
                autoSaveMap[$(this).attr('id')] = $(this).val();
            }
            else if ($(this).is(':checkbox')) {
                if ($(this).is(":checked")) {
                    //alert($(this).val());
                    autoSaveMap[$(this).attr('id')] = true;
                }
            }
            else if ($(this).is(':radio')) {
                if ($(this).is(":checked")) {
                    //alert($(this).val());
                    autoSaveMap[$(this).attr('id')] = true;
                }
            }
            else if ($(this).is(':file')) {

            }
            else{
                autoSaveMap[$(this).attr('id')] = $(this).val();
            }

        }
    });
   //console.log(JSON.stringify(autoSaveMap))
    Cookies.set("autosaveData", JSON.stringify(autoSaveMap), { expires: 7 });


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
    //console.log("FILLING IN ADDRESS");
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
            $("#namedInsured").trigger('change');

        }
        //if (componentForm[addressType]) {
        //    var val = place.address_components[i][componentForm[addressType]];
        //    document.getElementById(addressType).value = val;
        //}
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
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

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function testingModeFill(){
    $('#namedInsured').val("Testing Mode Insured");
    $('#phoneNumber').val("(703)123-4567");
    $('#namedInsuredEmail').val("testing@test.com");
    $('#website').val("www.testingMode.com");
    $('#googleAutoAddress').val("144 Test St");
    $('#cityMailing').val("TestCity");
    $('#zipCodeMailing').val("90120");
    $('#stateMailing').val("CA");
    $('#nameOfProductionCompany').val("Test Production Company");
    $('#titleOfProduction').val("Test Title Of Production");
    $('#nameOfPrincipal').val("Test Principal Name");
    $('#numberOfYearsOfExperience').val("23 Years");
    $('#listOfPriorLosses').val("Test Prior Losses");

    $('input:checkbox[name=documentary]').prop("checked", true);
    $('input:checkbox[name=documentary]').trigger("change");
    $('input:checkbox[name=useOfAnimals]').prop("checked", true);
    $('input:checkbox[name=useOfAnimals]').trigger("change");
    $('input:checkbox[name=underwaterFilming]').prop("checked", true);

    $('#filmingLocation').attr('disabled','disabled');
    $('.filmLocationStart').attr('disabled','disabled');
    $('.filmLocationEnd').attr('disabled','disabled');

    $('#story').val("This is a Test Story - The End");
    $('#producer').val("Test Producer");
    $('#director').val("Test Director");
    $('#sourceOfFinancing').val("Test Source of Financing");
    $('#completionBondCompany').val("Test Completion Bond Company");
    $('.physicalAddressNumBuildings').val("4");
    $('.physicalAddressHabUnits').val("100");
    $('#physicalAddressCommSqFt').val("1500");
    $('#FEINSSN').val("123456789");
    $('#SIC').val("1234");
    $('#NCCI').val("TESTNCCI");

    $('#addressTheSame').prop("checked", true);
    $('#addressTheSame').trigger("change");


    $('#totalBudgetInput').val("$400000.00");
    $('#totalBudgetConfirm').val("$400000.00");
    $('#totalBudgetInput').attr("placeholder", "");
    $("#totalBudgetInput").trigger("change");

    $('#brokerFeeInput').val("$100.00");
    $('#brokerFeeInput').attr("placeholder", "");
    $("#brokerFeeInput").trigger("change");

    $('#proposedEffectiveDate').val("12/05/2016");
    $('#proposedEffectiveDate').attr("placeholder", "");
    $('#proposedExpirationDate').val("12/05/2017");
    $('#proposedExpirationDate').attr("placeholder", "");
    $("#proposedExpirationDate").trigger("change");
    $('#principalPhotographyDateStart').val("12/05/2016");
    $('#principalPhotographyDateEnd').val("12/05/2017");


}

function getProductsForRisk(){

    var riskChosen = getRiskTypeChosen();

    if(riskChosen.indexOf("Film Projects") > -1){
        $.ajax({
            method: "POST",
            url: "/portal/Async/getProductsForCoverage",
            data: {riskType: riskChosen,
                totalGrossBudget: $("#totalBudgetConfirm").val().replace(/\$|,/g, ''),
                proposedTermLength: $("#proposedTermLength").val()
            }
        })
            .done(function (msg) {
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

                        if(coverageID === "EPKG" &&
                            (riskChosen === "Film Projects Without Cast (No Work Comp)" ||
                            riskChosen === "Film Projects With Cast (No Work Comp)" ||
                            riskChosen === "Specific Film Projects Test")){

                            ///////////////////////////// Film Projects With Cast (No Work Comp)
                            if(riskChosen === "Film Projects With Cast (No Work Comp)"){
                                $('#EPKGProductsDiv').css("display", "none");
                                $('#EPKGoptions').css("margin-top", "-20px");
                            }
                            else{
                                $('#EPKGProductsDiv').css("display", "");
                                $('#EPKGoptions').css("margin-top", "0px");
                            }
                            /////////////////////////////

                            if(productsArray.indexOf("PIP CHOI") > -1){
                                $('#PIPChoiceInput').css("display", "");

                                if($('#EPKGcoverage').is(':checked')){
                                    $('#PIPChoiceInputRadio').prop("checked", true);
                                    $('#pipChoiceSelections').css("display", "");
                                    $('.PIPCHOIOption').prop("checked", true);
                                }
                            }
                            else{
                                $('#PIPChoiceInputRadio').prop("checked", false);


                            }

                            if(productsArray.indexOf("PIP 1") > -1){
                                $('#PIP1Input').css("display", "");
                            }
                            else{
                                $('#PIP1InputRadio').prop("checked", false);
                            }

                            if(productsArray.indexOf("PIP 2") > -1){
                                $('#PIP2Input').css("display", "");
                            }
                            else{
                                $('#PIP2InputRadio').prop("checked", false);
                            }

                            if(productsArray.indexOf("PIP 3") > -1){
                                $('#PIP3Input').css("display", "");
                            }
                            else{
                                $('#PIP3InputRadio').prop("checked", false);
                            }

                            if(productsArray.indexOf("PIP 4") > -1){
                                $('#PIP4Input').css("display", "");
                            }
                            else{
                                $('#PIP4InputRadio').prop("checked", false);
                            }

                            if(productsArray.indexOf("PIP 5") > -1){
                                //alert("PIP5 HERE")
                                $('#PIP5Input').css("display", "");
                                //$('.PIP5Options').css("display", "");
                                if($('#EPKGcoverage').is(':checked')){
                                    $('#PIP5InputRadio').prop("checked", true);
                                    $(".PIP5Options").css('display', "");
                                    $('.PIPCHOIOption').prop("checked", false);
                                }
                            }
                            else{
                                $('#PIP5InputRadio').prop("checked", false);
                                $('#EPKGCIVIL100AdditionalCoverage').prop("checked", false);
                                $('#EPKGCIVIL500AdditionalCoverage').prop("checked", false);
                                $('.additionalCoverageCheckboxPIP5').prop("checked", false);
                            }

                            if ($("input[name='EPKGRadio']:checked").length >0){
                                if($('#EPKGNOHAAdditionalCoverage').is(':checked')){
                                    $('#EPKGNOHAAdditionalCoverage').prop("checked", true);
                                }
                            }
                            else{
                                $('#EPKGNOHAAdditionalCoverage').prop("checked", false);
                            }

                            if($('#EPKGcoverage').is(':checked')){
                                $('#EPKGoptions').css("display", "");

                                if(riskChosen === "Film Projects With Cast (No Work Comp)"){
                                    $("#EPKGNOHAOption").css("display","none");
                                }
                                else{
                                    $("#EPKGNOHAOption").css("display","");
                                }
                            }
                            //
                        }
                        else if(coverageID === "DICE" &&
                            (riskChosen === "Film Projects Without Cast (No Work Comp)" ||
                            riskChosen === "Film Projects With Cast (No Work Comp)" ||
                            riskChosen === "Specific Film Projects Test")){
                            $('.EPKGDiv').css("display", "none");
                            $('.CPKDiv').css("display", "none");
                            $('#DICEOptions').css("display", "");
                            $("#EPKGoptions").css("display","none");
                        }
                        else if(coverageID === "SPECIFICFILMPROD" &&
                            (riskChosen === "Film Projects Without Cast (No Work Comp)" ||
                            riskChosen === "Film Projects With Cast (No Work Comp)" ||
                            riskChosen === "Specific Film Projects Test")){
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
    else{
        $('#loadingModal').hide();
    }

}


function clearProductChoices(){

    $('.EPKGDiv').css("display", "");
    $('.CPKDiv').css("display", "");
    $("#EPKGNOHAOption").css("display","");
    $('#PIPChoiceInput').css("display", "none");
    $('#pipChoiceSelections').css("display", "none");
    $('#PIP1Input').css("display", "none");
    $('#PIP2Input').css("display", "none");
    $('#PIP3Input').css("display", "none");
    $('#PIP4Input').css("display", "none");
    $('#PIP5Input').css("display", "none");
    $('.PIP5Options').css("display", "none");
    $('#DICEOptions').css("display", "none");
    $('#SPECIFICOptions').css("display", "none");
}

function capitalizeFirstLetters(thisInput){
    var nameString = $(thisInput).val();
    //nameString = $(this).val().charAt(0).toUpperCase() + nameString.slice(1);

    var words = nameString.split(" ");
    var output = "";
    var originalWord = "";
    for (i = 0 ; i < words.length; i ++){
        originalWord = words[i];
        lowerWord = words[i].toLowerCase();
        lowerWord = lowerWord.trim();
        //console.log(lowerWord)
        if(originalWord.slice(1,2) == originalWord.slice(1,2).toUpperCase() || originalWord.slice(2,3) == originalWord.slice(2,3).toUpperCase()){
            //console.log(lowerWord.slice(1,2) + "-" + lowerWord)
            capitalizedWord = originalWord.trim();
        }
        else{
            capitalizedWord = lowerWord.slice(0,1).toUpperCase() + lowerWord.slice(1);
        }

        output += capitalizedWord;
        if (i != words.length-1){
            output+=" ";
        }
    }//for
    output[output.length-1] = '';

    $(thisInput).val(output);
    //console.log($(this).val());
    $("#nameOfProductionCompany").val(output);
    $("#nameOfProductionCompany").attr('placeholder', '');
}

function formatMoney(value){
    //console.log("value=" + value);
    if(isNaN(parseFloat(value))){
        if(value.substring(0,1) ==="\$"){
            value = value.replace("$","");
            value = ("$"+value+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            return value +"";
        }
        else{
            return value +"";
        }
    }
    else{
        if((""+value).indexOf("%") > -1){
            return value +"";
        }
        else{
            var floatValue = parseFloat(value);
            floatValue = Math.ceil(floatValue)
            return ("$"+floatValue+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}

function formatTaxAndFee(value){
    if(isNaN(parseFloat(value))){
        if(value.substring(0,1) ==="\$"){
            value = value.replace("$","");
            value = ("$"+value+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            return value +"";
        }
        else{
            return value +"";
        }
    }
    else{
        if((""+value).indexOf("%") > -1){
            return value +"";
        }
        else{
            var floatValue = parseFloat(value);
            floatValue = floatValue.toFixed(2);
            return ("$"+floatValue+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}

function getTaxInfo(){
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var taxState = "CA"
    if ($('#stateMailing').val() === "invalid"){
        taxState = "CA"
    }
    else{
        taxState = $('#stateMailing').val();
    }
   //console.log("TAX State = " + taxState)
    $.ajax({
        method: "POST",
        url: "/portal/Async/getTaxInfo",
        data: {riskType: "",
            state: taxState,
            date: monthIndex+1 + "/" + day + "/" + year
        }
    })
        .done(function (msg) {
            //alert(msg);

            var totalPremium = 0.0;
            $('.premiumSpan').each(function () {

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

            var taxResponseArray = msg.split("&;;&");
            var htmlString = "";
            taxResponseArray.forEach(function (item, index) {
                if(item.split("&,&").length > 1){
                    htmlString = htmlString + "<div class='row " + item.split("&,&")[0] +  "TaxRow' style= ''" + ">" +
                        "<div class='col-xs-4'>" +
                        "<span class='taxDescriptionSpan'>" + item.split("&,&")[1] + "(" + item.split("&,&")[2] + ")</span>" +
                        "</div>" +
                        "<div class='col-xs-3'>" +
                        "<span class='taxSpan'>" + formatTaxAndFee(totalPremium * parseFloat(item.split("&,&")[2])) + "</span>" +
                        "</div>" +
                        "<div class='col-xs-3'>" +
                        "<span class=''>"  + "" + "</span>" +
                        "</div>" +
                        "</div>";
                }

            });

            var policyFeeTotal = 0;
            if($('#EPKGcoverage').is(':checked')){
                policyFeeTotal = policyFeeTotal + 15;
            }
            if($('#CPKCGLcoverage').is(':checked')){
                policyFeeTotal = policyFeeTotal + 15;
            }

            htmlString = htmlString + "<div class='row " + "PolicyFee" +  "TaxRow' style= ''" + ">" +
                "<div class='col-xs-4'>" +
                "<span class='taxDescriptionSpan'>Policy Fee</span>" +
                "</div>" +
                "<div class='col-xs-3'>" +
                "<span class='taxSpan'>$" + policyFeeTotal + ".00</span>" +
                "</div>" +
                "<div class='col-xs-3'>" +
                "<span class=''>"  + "" + "</span>" +
                "</div>" +
                "</div>";
            //
            //alert(htmlString);
            //console.log("TAXING === ")
            $("#taxRows").html(htmlString);
            totalUpPremiumAndTax();





        });
}

function validateFields(){
    var valid = true;
    $(':input[required]:visible').each(function (index){
        if($(this).val().length == 0 ){
            valid = false;
        }
    });

    $('.checkboxGroupRequired:visible').each(function (index){
        if($(this).find('input:checked').length == 0){
            valid == false
            $(this).closest(".form-group").addClass("has-error");
        }
        else{
            $(this).closest(".form-group").removeClass("has-error");
        }
    });



    return valid;
}

function saveProgress(){

}

function getRiskTypeChosen(){
    var riskString ="";
    if ($("li.active").children("a.riskOptionLink").hasClass('riskOptionDropDown')){
        //console.log($("li.active").children("a.riskOptionLink").find('.riskTypeDropdown').val());
        riskString = $("li.active").children("a.riskOptionLink").find('.riskTypeDropdown').val()
    }
    else{
        riskString = $("li.active").children("a.riskOptionLink").html().trim();
    }

    return riskString
}

function getRiskCategoryChosen(){

    var category = $("li.active").closest('.drawerContainer').closest('.row').find('.media-heading').html();
    return category;
}

function logIntoLegacyNeeis(){
    $('#producerIDhidden').html().trim();
    window.location.href = "http://104.131.41.129:3000/redirect?email=test15@test.com&password=newpassword&producerID=TVD";

}