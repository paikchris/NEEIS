//*****************NON SPEC RUNNER HELPERS******************************************
var skipListClass = {

}

var skipListID = {
    proposedTermLength:""
}

var notString = "#proposedTermLength, .TestHelperTestFilled, :disabled"

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

function autoFillAllElse(){
        //NEW SUBMISSION PAGE TESTING
        if($('#operationsDropdown').is(":visible")){
            $('#operationsDropdown').prop('disabled', false)
        }


        var htmlElementArray = $("input:visible, select:visible").not(notString).toArray()
        var count = 0;


        autoFillInputCallback(htmlElementArray)


}

function autoFillInputCallback(htmlElementArray){

    if(htmlElementArray.length > 0){
        var htmlElement = htmlElementArray[0];
        var okToType = false;
        var string = chance.string({length: 10});

        //Mark Filled
        $(htmlElement).addClass('TestHelperTestFilled')

        if($(htmlElement).hasClass('maskMoney')){
            var money = chance.integer({min: 0, max: 200000});
            $(htmlElement).maskMoney('mask', money);
            $(htmlElement).trigger('change')

            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }
        //TESTING ONLY
        else if($(htmlElement).attr('id') == 'stateMailing'){
            $(htmlElement).val('CA')
            $(htmlElement).trigger('change')

            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }
        else if($(htmlElement).attr('id') == 'operationCategoryDropdown'){
            var numOptions = $(htmlElement).find('option').length - 1;
            var randomSelected = chance.integer({min: 0, max: numOptions});

            var valueOfOption = $(htmlElement).find('option').eq(randomSelected).val()
            // $(htmlElement).val(valueOfOption)
            $(htmlElement).val('Entertainer')
            $(htmlElement).trigger('change')

            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }
        else if($(htmlElement).attr('id') == 'operationsDropdown'){
            var numOptions = $(htmlElement).find('option').length - 1;
            var randomSelected = chance.integer({min: 0, max: numOptions});

            var valueOfOption = $(htmlElement).find('option').eq(randomSelected).val()
            // $(htmlElement).val(valueOfOption)
            $(htmlElement).val('EN1')
            $(htmlElement).trigger('change')

            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }
        else if($(htmlElement).attr('id') == 'CGL_CoverageCheckbox'){
            $(htmlElement).prop('checked', true)
            $(htmlElement).trigger('change')

            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }
        else if($(htmlElement).attr('id') == 'EPKG_CoverageCheckbox'){
            $(htmlElement).prop('checked', false)
            $(htmlElement).trigger('change')

            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)

        }
        else if ($(htmlElement).is('input:text') && $(htmlElement).val().trim().length === 0) {
            if ($(htmlElement).hasClass('datepicker')) {
                if ($(htmlElement).attr('id') === "proposedEffectiveDate") {
                    var dateString = autoGetTodaysDate();
                    $(htmlElement).val(dateString)
                    $(htmlElement).attr('placeholder', '')
                    $(htmlElement).trigger('change')


                    htmlElementArray.shift()
                    autoFillInputCallback(htmlElementArray)
                }
                else if ($(htmlElement).attr('id') === "proposedExpirationDate") {
                    var dateString = autoGetMonthFutureDate();
                    console.log(dateString)
                    $(htmlElement).val(dateString)
                    $(htmlElement).attr('placeholder', '')
                    $(htmlElement).trigger('change')

                    htmlElementArray.shift()
                    autoFillInputCallback(htmlElementArray)

                }
                else {
                    var dateString = autoGetTodaysDate();
                    $(htmlElement).val(dateString)

                    htmlElementArray.shift()
                    autoFillInputCallback(htmlElementArray)

                }
            }
            else if ($(htmlElement).hasClass('currencyInput')) {
                var money = chance.integer({min: 0, max: 200000});
                autoFillType(money + "", htmlElement, htmlElementArray)
            }
            else if ($(htmlElement).hasClass('phoneNumberMask')) {
                autoFillType(chance.phone({formatted: false}), htmlElement, htmlElementArray)
            }
            else if ($(htmlElement).attr('id') == "zipCodeMailing") {
                autoFillType(chance.zip(), htmlElement, htmlElementArray)
            }
            else if ($(htmlElement).attr('id') == "numericInputOnly") {
                autoFillType(chance.zip(), htmlElement, htmlElementArray)
            }
            else {
                autoFillType(chance.word(), htmlElement, htmlElementArray)
            }
        }
        else if ($(htmlElement).is('select') && $(htmlElement).val() === 'invalid') {
            var numOptions = $(htmlElement).find('option').length - 1;
            var randomSelected = chance.integer({min: 0, max: numOptions});

            $(htmlElement).find('option:selected').removeAttr('selected');
            $(htmlElement).find('option').eq(randomSelected).attr('selected', 'selected');
            $("input:radio[name='" + groupName + "']").val(randomSelected);

            $(htmlElement).trigger('change');
            $(htmlElement).focus();

            //Pop this element from the array, shift pops first element from array
            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }
        else if ($(htmlElement).is('input:radio')) {
            var groupName = $(htmlElement).attr('name');
            var numRadioButtons = $("input:radio[name='" + groupName + "']").length - 1
            var randomSelected = chance.integer({min: 0, max: numRadioButtons});

            $("input:radio[name='" + groupName + "']").eq(randomSelected).prop("checked", true);
            // $("input:radio[name='" + groupName + "']").val(randomSelected);

            $(htmlElement).trigger('change');

            //Pop this element from the array, shift pops first element from array
            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }
        else if ($(htmlElement).is('input:checkbox')) {
            $(htmlElement).prop("checked", chance.bool());

            $(htmlElement).trigger('change');

            //Pop this element from the array, shift pops first element from array
            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }
        else if ($(htmlElement).attr('type') == "number") {
            var integerString = chance.integer({min: 0, max: 100}) + "";
            autoFillType(integerString, htmlElement, htmlElementArray)
        }
        else if ($(htmlElement).attr('type') == "email") {
            autoFillType(chance.email(), htmlElement, htmlElementArray)
        }
        else {
            //Pop this element from the array, shift pops first element from array
            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }


    }
    else{
    }
}

function dataManagementTestHelper(){
    //CURRENT TEST HELPER FOR DATA MANAGEMENT
    $('#ratingSheetNavTab').click()
    if($('#rateSheetPage_RateSheetsDropdown').val() !== 'TEST2'){
        $('#rateSheetPage_RateSheetsDropdown').val('TEST2')
        $('#rateSheetPage_RateSheetsDropdown').trigger('change')
    }
    $('#rateSheetStateDropdown').val('CA')
    $('#rateSheetStateDropdown').trigger('change')

    $('.addRuleButton').eq(0).click()


    //TYPEAHEAD TESTING
    // var temp = {element: $('#testtypeahead'), url: '/Data/getRateCodesTypeahead', dataSearchKey:'description' }
    // var typea = new Typeahead(temp)

    //RULES BUILDER TESTING
    // $('.editPremiumLogicButton').eq(0).click()
    // $('.addRatedPremiumButton').eq(1).click()


    //QUESTION BUILDER TESTING
    // var temp = new QuestionBuilder();
    // temp.openQuestionBuilderModal()
    // $('#questionBuilder_QuestionTypeDropdown').val('checkbox')
    // $('#questionBuilder_QuestionTypeDropdown').trigger('change')


}

function autoGetTodaysDate(){
    //Check Drawer can be clicked
    var d = new Date();
    d.setMonth(d.getMonth()+1);
    var month = d.getMonth()+1;
    var day = d.getDate();
    var year = d.getFullYear();

    if (day < 10) { day = '0' + day; }
    if (month < 10) { month = '0' + month; }

    return datePlusMonthFormatted =  month + '/' + day + '/' + year;

}

function autoGetMonthFutureDate(){
    //Check Drawer can be clicked
    var d = new Date();
    d.setMonth(d.getMonth()+1);
    var month = d.getMonth()+2;
    var day = d.getDate();
    var year = d.getFullYear();

    if(month > 12){
        month = 1
        year = year + 1
    }
    if (day < 10) { day = '0' + day; }
    if (month < 10) { month = '0' + month; }

    return datePlusMonthFormatted =  month + '/' + day + '/' + year;

}

function autoGetRandomFutureDate(){
    var d = new Date();

    // var dateString = chance.date({string: true, year: d.getFullYear()});

    var month = chance.integer({min: d.getMonth()+1, max: 12});
    var day = chance.integer({min: d.getDate(), max: 28});
    var year = chance.integer({min: d.getFullYear(), max: d.getFullYear() + 1});

    if (day < 10) { day = '0' + day; }
    if (month < 10) { month = '0' + month; }

    return datePlusMonthFormatted =  month + '/' + day + '/' + year;


}

function autoClickThis(elementClick){
    $(elementClick).click();
    $(elementClick).focus();
}

function autoWaitUntilThisIsVisible(elementVisible, done){
    //Wait till animation Finishes
    var POLL_TIME = 10;
    var endTime = new Date().getTime() + 5000;
    var checkCondition = function() {
        if(new Date().getTime() <= endTime){
            if ( $(elementVisible).is(':visible') === false) {
                setTimeout(checkCondition, POLL_TIME);
            } else {
                done();
            }
        }
    };
    checkCondition();
}
//^^^^^^^^^^^^^^^^^^^^^^^^^NON SPEC RUNNER HELPERS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

var uniqueName = "";
var uniqueZipCode = "";

function loadURLForTest(urlString, divElementToLoad, jsFiles, done){
    $("#fixtureDiv").load(urlString + " " + divElementToLoad, function () {
        //TURN OFF JQUERY ANIMATIONS
        $.fx.off = true;
        $('.modal').removeClass('fade')
        //Turn off Autosave Loading
        // Cookies.remove('autosaveData');

        //APPEND THE HTML TO THE APPROPRIATE FIXTURE DIV
        $("#fixtureDiv").html($(this).find(divElementToLoad).html());




        //LOAD NECESSARY JS FILES FOR TEST PAGE
        var allDone = new Array(jsFiles.length);


        if(jsFiles.length > 0){
            for (var i = 0; i < jsFiles.length; i++) {
                var jsFilePath = jsFiles[i]
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                script.async = false;
                script.type = 'text/javascript';
                script.onload = function(){
                    allDone[i] = true;
                    if(checkIfAllJSLoaded(allDone)){
                        done();
                    }
                };
                script.src = jsFilePath +"?ts=" + new Date().getTime();
                head.appendChild(script);
            }
        }
        else{
            done();
        }

    });
}

function checkIfAllJSLoaded(doneArray){
    for (var i = 0; i < doneArray.length; i++) {
        if(doneArray[i] === false){
            return false;
        }
    }
    return true;
}

function autoClickDatePicker(dateString){
    var month = dateString.split("/")[0];
    var intMonth = parseInt(dateString.split("/")[0]) -1
    var day = dateString.split("/")[1];
    var year = dateString.split("/")[2];

    $('.datepicker-months .month')[intMonth].click();

    //CLICK ON DATE
    $('td.day').not(".old").each(function (){
        if(parseInt($(this).html()) >= day){
            //CLICK TODAYS DATE
            $(this).click();
            return false;
        }
    });
}

function goBackToNewSubmissionStep1(){
    $('#buttonCircleStep1').click();
    expect($('#step-1').is(':visible')).toBeTruthy()
    expect($('#step-2').is(':visible')).toBeFalsy()
    expect($('#step-3').is(':visible')).toBeFalsy()
    expect($('#step-4').is(':visible')).toBeFalsy()
}

function selectRiskTypeAndGotoStep2(riskType){
    $('.riskOptionLink').each(function() {
        if($(this).html() == riskType){
            $(this).click();
            expect($('#step-1').is(':visible')).toBeFalsy()
            expect($('#step-2').is(':visible')).toBeTruthy()
            expect($('#step-3').is(':visible')).toBeFalsy()
            expect($('#step-4').is(':visible')).toBeFalsy()
        }
    });
}

function gotoStep3(){

    $('#nextButtonStep2').click();
    expect($('#step-1').is(':visible')).toBeFalsy()
    expect($('#step-2').is(':visible')).toBeFalsy()
    expect($('#step-3').is(':visible')).toBeTruthy()
    expect($('#step-4').is(':visible')).toBeFalsy()

}

function gotoStep4(){

    $('#nextButtonStep3').click();
    expect($('#step-1').is(':visible')).toBeFalsy()
    expect($('#step-2').is(':visible')).toBeFalsy()
    expect($('#step-3').is(':visible')).toBeFalsy()
    expect($('#step-4').is(':visible')).toBeTruthy()

}

function openRiskCategoryCardDrawer(riskCategory){
    //MAKE SURE ALL ARE CLOSED FIRST'
    $('.drawer').each(function(){
        while($(this).height() > 0){
            $(this).closest('.row').find('.card').click()
        }
    });
    $('.media-heading').each(function(){
        if($(this).html().trim() === riskCategory){
            while($(this).closest('.row').find('.drawer').height() === 0){
                $(this).closest('.card').click()
            }
            expect($(this).closest('.row').find('.drawer').height()).toBeGreaterThan(1);
        }
    });
}

function getUniqueNameAndZipForBOR(done){
    //GET A UNIQUE NAME AND ZIPCODE TO PASS BOR
    uniqueName = chance.name();
    uniqueZipCode = chance.zip();
    $.ajax({
        method: "POST",
        url: "/main/checkNamedInsured",
        data: {
            checkName: uniqueName,
            zipCodeMailing: uniqueZipCode
        },
        tryCount : 0,
        retryLimit : 3,
        error : function(xhr, textStatus, errorThrown ) {
            if (this.tryCount <= this.retryLimit) {
                //try again
                this.tryCount++;
                console.log("Retrying")

                $.ajax(this);
                return;
            }
            return;
        }
    })
        .done(function(msg) {
            if(msg.startsWith("OK")){
                done();
            }
            else{
                getUniqueNameAndZipForBOR(done);
            }
        });
}

function resetNamedInsuredBORToTestAgain(){
    markNamedInsuredInputReset();
    expect( $("#namedInsured").closest(".form-group").hasClass("has-success") ).toBeFalsy();
    expect( $("#namedInsured").closest(".form-group").hasClass("has-error") ).toBeFalsy();
    expect( $("#namedInsured").closest(".form-group").hasClass("has-warning") ).toBeFalsy();
    expect( $("#namedInsured").closest(".form-group").hasClass("has-bor") ).toBeFalsy();

    expect( $("#namedInsured").siblings(".glyphicon.glyphicon-ok").is(':visible') ).toBeFalsy()
    expect( $('#checkNameSpinner').is(':visible') ).toBeFalsy()
    expect( $("#namedInsured").siblings(".namedInsuredIcon").is(':visible') ).toBeFalsy()
}

function getTodaysDateFormatted(){
    //Check Drawer can be clicked
    var d = new Date();
    var month = d.getMonth();
    var day = d.getDate();
    var year = d.getFullYear();

    month = month + 1
    if (day < 10) { day = '0' + day; }
    if (month < 10) { month = '0' + month; }


    return month + '/' + day + '/' + year;
}

function getFormattedDateXDaysAfterDate(date, xDays){
    var d = new Date(date);
    d.setDate(d.getDate() + xDays);
    var month = d.getMonth();
    var day = d.getDate();
    var year = d.getFullYear();

    month = month + 1
    if (day < 10) { day = '0' + day; }
    if (month < 10) { month = '0' + month; }

    return datePlusMonthFormatted =  month + '/' + day + '/' + year;
}

function openDatePickerAndClickDate(dateInputElem, mmddYYYY){
    //OPEN DATE PICKER
    spyOnEvent(dateInputElem, 'click');
    $(dateInputElem).click();
    $(dateInputElem).focus();
    expect('click').toHaveBeenTriggeredOn(dateInputElem);
    $(dateInputElem).datepicker('show');
    expect($('.datepicker-dropdown').length).toBeGreaterThan(0)
    $(dateInputElem).datepicker('hide');
    expect($('.datepicker-dropdown').length).toEqual(0)

    //CLICK ON DATE
    var d = new Date();
    var month = mmddYYYY.split('/')[0];
    var day = mmddYYYY.split('/')[1];
    var year = mmddYYYY.split('/')[2];
    d.setMonth(parseInt(month-1))
    d.setDate(parseInt(day))
    d.setYear(parseInt(year))

    $(dateInputElem).datepicker('setDate', d);

    //Format date
    // if (day < 10) { day = '0' + day; }
    // if (month < 10) { month = '0' + month; }
    // var dateTodayFormatted =  month + '/' + day + '/' + year;
    //
    // $('td.day').not(".old").each(function (){
    //     if(parseInt($(this).html()) >= day){
    //         clickThis(this);
    //         return false;
    //     }
    // });


    expect( $(dateInputElem).val().length ).toBeGreaterThan(0)
}

function clickThis(elementClick){
    spyOnEvent(elementClick, 'click');
    $(elementClick).click();
    $(elementClick).focus();
    expect('click').toHaveBeenTriggeredOn(elementClick);
}

function waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis){
    // console.log("IN WAIT FUNCTION")
    var POLL_TIME = 500;
    var endTime = new Date().getTime() + 20000;
    var checkCondition = function() {
        if( (new Date().getTime() > endTime && Object.keys(outstandingCalls).length == 0) || (waitUntilThisIsTrue()) ){
            if(new Date().getTime() > endTime){
                // console.log("TIMED OUT")
                throw "TIMED OUT WAITING FOR: " + waitUntilThisIsTrue
            }
            else{
                thenDoThis();
            }

        }
        else{
            setTimeout(checkCondition, POLL_TIME);
        }
    };
    checkCondition();
}

function clickThisThenWaitUntilThisAndExpectThat(clickElement, waitUntil, check, done){
    spyOnEvent(clickElement, 'click');
    $(clickElement).click();
    $(clickElement).focus();
    expect('click').toHaveBeenTriggeredOn(clickElement);

    var POLL_TIME = 10;
    var endTime = new Date().getTime() + 5000;
    var checkCondition = function() {
        if(new Date().getTime() <= endTime){
            if (waitUntil()) {
                //console.log("waiting to load products");
                setTimeout(checkCondition, POLL_TIME);
            } else {
                //console.log("EPKG: " + $('#PIPChoiceInputRadio').html());
                check();

                //expect('click').toHaveBeenTriggeredOn('#proposedEffectiveDate');
                done();
            }
        }

    };
    checkCondition();
}

function typeThis(typeThis, typeElement, done){
    typeElement.unbind('autotyped')
    typeElement.click();
    typeElement.focus();
    typeElement.val("");
    try{
        typeElement.bind('autotyped', function(){
            typeElement.trigger('change');
            expect(true).toBeTruthy()
            done();
        }).autotype(typeThis, {delay: 1});
    }
    catch(e){
        console.log(e)
    }
}

function typeThisMaskMoney(typeThis, typeElement, done){
    typeElement.unbind('autotyped')
    typeElement.click();
    typeElement.focus();
    typeElement.val("");
    try{
        typeElement.bind('autotyped', function(){
            typeElement.trigger("mask.maskMoney");
            typeElement.trigger('change');
            typeElement.trigger('keypress');
            typeElement.trigger('keyup');
            typeElement.blur();
            done();
        }).autotype(typeThis, {delay: 1});
    }
    catch(e){
        console.log(e)
    }
}

function typeThisThenExpectThat(typeThis, typeElement, check, done){
    typeElement.click();
    typeElement.focus();
    typeElement.val("");

    typeElement.bind('autotyped', function(){
        typeElement.trigger('change');
        check()
        // done();
    }).autotype(typeThis, {delay: 1});
}

function autoFillType(typeThis, typeElement, htmlElementArray){
    $(typeElement).click();
    $(typeElement).focus();
    $(typeElement).val("");

    try{
        $(typeElement).bind('autotyped', function(){
            $(typeElement).trigger('change');

            //Pop this element from the array, shift pops first element from array
            htmlElementArray.shift()
            autoFillInputCallback(htmlElementArray)
        }).autotype(typeThis, {delay: 1});
    }
    catch(e){
        console.log ("Error: " + e)
    }
}
