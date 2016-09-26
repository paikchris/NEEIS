/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {
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

    //TERM LENGTH CALCULATION
    $('#proposedEffectiveDate, #proposedExpirationDate').change(function(){
            //alert($('#proposedEffectiveDate').val() + " " + $('#proposedExpirationDate').val());
        var termLength;
        if($('#proposedEffectiveDate').val().length > 0 && $('#proposedExpirationDate').val().length > 0){
            var mdyEffective = $('#proposedEffectiveDate').val().split('/');
            var mdyEffectiveDateObject = new Date(mdyEffective[2], mdyEffective[0]-1, mdyEffective[1]);
            var mdyExpiration = $('#proposedExpirationDate').val().split('/');
            var mdyExpirationDateObject = new Date(mdyExpiration[2], mdyExpiration[0]-1, mdyExpiration[1]);

            var days = Math.round((mdyExpirationDateObject-mdyEffectiveDateObject)/(1000*60*60*24));
            //alert(days);
            if(days == 1){
                $('#proposedTermLength').html(days + " Day")
            }
            else{
                $('#proposedTermLength').html(days + " Days")
            }

        }
    });


    $('#addressTheSame').change(function() {
        if($('#addressTheSame').is(':checked')) {
            var physicalAddressDiv = $("#locationDivContainer").children('.locationDiv').eq(0);
            //alert($("input[name='streetNameMailing']").val());
            //alert(physicalAddressDiv.html());
            physicalAddressDiv.find("input[name='streetName']").val( $("input[name='streetNameMailing']").val() );
            physicalAddressDiv.find("input[name='city']").val( $("input[name='cityMailing']").val() );
            physicalAddressDiv.find("input[name='state']").val( $("input[name='stateMailing']").val() );
            physicalAddressDiv.find("input[name='zipCode']").val( $("input[name='zipCodeMailing']").val() );
        }
        else {
        }
    });
    //////CHECKING NAME OF INSURED CALL BASED ON NAME AND ZIPCODE
    $("#namedInsured, #zipCodeMailing,  #zipCodePhysical").on('input', function() {
        var checkName = $("#namedInsured").val();
        var zipCodeMailing =$("#zipCodeMailing").val();
        var zipCodePhysical =$("#zipCodePhysical").val();


        if(checkName.length >2 && (zipCodeMailing.length ==5 || zipCodePhysical.length ==5)){
           //alert("slkdf");
            $.ajax({
                method: "POST",
                url: "/portal/main/checkNamedInsured",
                data: {checkName: checkName, zipCodeMailing: zipCodeMailing, zipCodePhysical:zipCodePhysical}
            })
                .done(function (msg) {
                   //alert( "Data Saved: " + msg );
                });
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




    //FILL PRODUCTS SELECT
    $("#productsSelect").change(function(){
        var val = $(this).val();
        var prodString = $("#productsSelect option[value='" + val + "']").text();
        var companyName = prodString.split(" - ")[2];
       //alert(companyName);
        $("#marketCompanyText").val(companyName);

        $.ajax({
            method: "POST",
            url: "/portal/Async/getLimitsDeductibles",
            data: {productID:prodString.split(" - ")[0]}
        })
            .done(function (msg) {
               //alert( "Data Saved: " + msg.split(/\r\n|\r|\n/g)[0] );
                var limitsString = msg.split(";####&&&&;")[0];
                var deductsString = msg.split(";####&&&&;")[1];
                var lobDistributionString = msg.split(";####&&&&;")[4];

                var limitsHtmlString = "";
                var deductsHtmlString = "";
                var lobDistributionHtmlString = "";
                for(var i=0; i<limitsString.split(/\r\n|\r|\n/g).length;i++){
                    if(limitsString.split(/\r\n|\r|\n/g)[i].length<2){

                    }
                    else{
                        limitsHtmlString = limitsHtmlString + "<div class='row'>" +
                            "<div class='col-xs-4'>" +
                            "<span>" + limitsString.split(/\r\n|\r|\n/g)[i].split("\t")[0] + "</span>" +
                            "</div>" +
                            "<div class='col-xs-8'>" +
                            "<span>"+ limitsString.split(/\r\n|\r|\n/g)[i].split("\t")[1] +"</span>" +
                            "</div>" +
                            "</div>" ;
                    }
                }

                for(var i=0; i<deductsString.split(/\r\n|\r|\n/g).length;i++){
                    if(deductsString.split(/\r\n|\r|\n/g)[i].length<2){

                    }
                    else{
                        deductsHtmlString = deductsHtmlString + "<div class='row'>" +
                            "<div class='col-xs-4'>" +
                            "<span>" + deductsString.split(/\r\n|\r|\n/g)[i].split("\t")[0] + "</span>" +
                            "</div>" +
                            "<div class='col-xs-8'>" +
                            "<span>"+ deductsString.split(/\r\n|\r|\n/g)[i].split("\t")[1] +"</span>" +
                            "</div>" +
                            "</div>" ;
                    }
                }

                for(var i=0; i<lobDistributionString.split(/\r\n|\r|\n/g).length;i++){
                    //alert(lobDistributionString.split(/\r\n|\r|\n/g)[i].split("\t")[0].length);
                    if(lobDistributionString.split(/\r\n|\r|\n/g)[i].split("\t")[0].length<2){

                    }
                    else{
                        lobDistributionHtmlString = lobDistributionHtmlString + "<div class='row'>" +
                        "<div class='col-xs-3'>" +
                            "<span class='lineOfBusinessSpan'>" + lobDistributionString.split(/\r\n|\r|\n/g)[i].split("\t")[0] + "</span>" +
                            "</div>" +
                            "<div class='col-xs-3'>" +
                            "<span class='premiumSpan'>" + lobDistributionString.split(/\r\n|\r|\n/g)[i].split("\t")[1] + "</span>" +
                            "</div>" +
                            "<div class='col-xs-3'>" +
                            "<span class='grossPercentSpan'>" + lobDistributionString.split(/\r\n|\r|\n/g)[i].split("\t")[2] + "</span>" +
                            "</div>" +
                            "<div class='col-xs-3'>" +
                            "<span class='agentPercentSpan'>" + lobDistributionString.split(/\r\n|\r|\n/g)[i].split("\t")[3] + "</span>" +
                            "</div>" +
                            "</div>" ;
                    }
                }

                $("#limitsInsert").html(limitsHtmlString);
                $("#deductsInsert").html(deductsHtmlString);
                $("#termsInsert").html(msg.split(";####&&&&;")[2]);
                $("#endorseInsert").html(msg.split(";####&&&&;")[3]);
                $("#premDistributionInsert").html(lobDistributionHtmlString);

            });
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
            alert(count);
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
                alert(locationHeader);
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
        $(".phoneNumberMask").mask("(999)999-9999");
    });



    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(e){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            //LOGIC FOR DISPLAYING WHICH COVERAGE FORM TO DISPLAY
            if(e.target.id == "nextButtonStep1"){
                if($("li.active").length > 0){
                    var riskChosen = $("li.active").children("a.riskOptionLink").html().trim();
                    if(riskChosen === "Specific Film Projects" || true){
                        //$("#step2test").load("./../forms/specFilm"); // test of loading forms
                        $("#insuredInfoInsert").load("./../forms/specFilm .insuredInfo");
                        $("#riskSpecificInsert").load("./../forms/specFilm #riskSpecificInfo", function() {
                            var head= document.getElementsByTagName('head')[0];
                            var script= document.createElement('script');
                            script.type= 'text/javascript';
                            script.src= '/portal/js/forms/specFilm.js';
                            head.appendChild(script);
                        });





                        //$.getScript( "/portal/js/forms/specFilm.js", function( data, textStatus, jqxhr ) {
                        //    console.log( data ); // Data returned
                        //    console.log( textStatus ); // Success
                        //    console.log( jqxhr.status ); // 200
                        //    console.log( "Load was performed." );
                        //    eval();
                        //});
                        //$.ajax({
                        //    url: "/portal/js/forms/specFilm.js",
                        //    dataType: 'script',
                        //    async: false
                        //});

                        //$.ajax({
                        //    method: "POST",
                        //    url: "/portal/Async/getAvailableCoveragesForRiskType",
                        //    data: {riskType: riskChosen}
                        //})
                        //    .done(function (msg) {
                        //        //alert(msg);
                        //        //FILL COVERAGE SELECT OPTIONS VERSION 2
                        //        var coverageNameArray = msg.split(";&&;")[1].split(",");
                        //        var coverageCodeArray = msg.split(";&&;")[0].split(",");
                        //        var coverageCheckboxesString = "";
                        //        for(var i =0; i<coverageCodeArray.length; i++){
                        //
                        //            if(coverageCodeArray[i].length > 0)
                        //                coverageCheckboxesString = coverageCheckboxesString + "<div class='row' >" +
                        //                    "<div class='form-group col-xs-4'>" +
                        //                    "<p><input type='checkbox' name='" + coverageCodeArray[i] + "coverage' id='" + coverageCodeArray[i] + "coverage' /> " + coverageNameArray[i] + "</p>" +
                        //                    "</div>" +
                        //                    "<div class='form-group col-xs-4'>" +
                        //                    "<select class='form-control' id='" + coverageCodeArray[i] + "productsSelect' name='" + coverageCodeArray[i] + "productsSelect'>" +
                        //                    "<option value='invalid' selected='selected'>Please Select A " + coverageCodeArray[i] + " Product</option>" +
                        //                    "</select>" +
                        //                    "</div>" +
                        //                    "</div>" ;
                        //        }
                        //
                        //        $("#coverageCheckboxesDiv").html(coverageCheckboxesString);
                        //
                        //    }
                        //);


                    }
                    else if(riskChosen  === "Promoter - Concerts"){
                        //$("#step2test").load("./../forms/specialEventLiability"); // test of loading forms


                    }
                }
                else{
                    alert("Please select a risk option");
                    return false;
                }

            }
            else if(e.target.id == "nextButtonStep2"){
                if($("li.active").length > 0){
                    var riskChosen = $("li.active").children("a.riskOptionLink").html().trim();
                    $.ajax({
                        method: "POST",
                        url: "/portal/fAsync/getProductsForCoverage",
                        data: {riskType: riskChosen}
                    })
                        .done(function (msg) {
                            alert(msg);
                            var coverageArray = msg.split("&nextCoverage&");

                            var coverageString ="";
                            for(var i = 0; i<coverageArray.length; i++){
                                if(coverageArray[i].length > 0){
                                    coverageString = coverageString +  "<div class='row' >" +
                                        "<div class='form-group col-xs-4'" +
                                        "<p><input type='checkbox' name='" + coverageArray[i].split("&;&")[0].split("&,&")[0]  + "coverage' id='" + coverageArray[i].split("&;&")[0].split("&,&")[0]  +
                                        "coverage' /> " + coverageArray[i].split("&;&")[0].split("&,&")[1] + "</p>" +
                                        "</div>" +
                                        "<div class='form-group col-xs-4'>" +
                                        "<select class='form-control' id='" + coverageArray[i].split("&;&")[0].split("&,&")[0] + "productsSelect' name='" + coverageArray[i].split("&;&")[0].split("&,&")[0] + "productsSelect1' style=''>" +
                                        "<option value='invalid' selected='selected'>Please Select A " + coverageArray[i].split("&;&")[0].split("&,&")[0] + " Product</option>";
                                        for(var j=0;j<coverageArray[i].split("&;&")[1].split("&;;&");j++){
                                            coverageString = coverageString + "<option value='" +
                                                coverageArray[i].split("&;&")[1].split("&;;&").split("&,&")[0] +
                                                "'>" + coverageArray[i].split("&;&")[1].split("&;;&").split("&,&")[0] + " - " + coverageArray[i].split("&;&")[1].split("&;;&").split("&,&")[1] +
                                                "</option>"
                                        }

                                        coverageString = coverageString +
                                        "</select>" +
                                        "</div>" +
                                        "</div>";
                                }

                            }
                            $("#coverageCheckboxesDiv").html(coverageString);

                            //$("#coverageSelect").change(function(){
                            //    //alert("sdlfsjldf");
                            //
                            //    $.ajax({
                            //        method: "POST",
                            //        url: "/portal/Async/getProductsForCoverage",
                            //        data: {coverage:$(this).val()}
                            //    })
                            //        .done(function (msg) {
                            //            //alert( "Data Saved: " + msg );
                            //            var productsString = "<option value='invalid' selected='selected'>Please Select A Product</option>";
                            //            for(var i=0;i<msg.split(";").length;i++){
                            //                productsString = productsString + "<option value='" +
                            //                    msg.split(";")[i].split(",")[0] +
                            //                    "'>" + msg.split(";")[i].split(",")[0] + " - " + msg.split(";")[i].split(",")[1] +
                            //                    "</option>"
                            //            }
                            //            $("#productsSelect").html(productsString);
                            //        });
                            //});

                        }
                    );
                }
                else{
                    alert("Please select a risk option");
                    return false;
                }


            }
            nextStepWizard.removeAttr('disabled').trigger('click');
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
        $('a.riskOptionLink').parent().removeClass("active");
        $('a.riskOptionLink').parent().addClass("inactive");
        $(this).parent().addClass("active");
        $(this).parent().removeClass("inactive");
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
        else if ($(this).val().trim() == "Specific Film Projects"){

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
        }
        else if(addressType === "administrative_area_level_1"){
            document.getElementById('stateMailing').value = place.address_components[i]['long_name'];
        }
        else if(addressType === "postal_code"){
            document.getElementById('zipCodeMailing').value = place.address_components[i]['long_name'];
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
