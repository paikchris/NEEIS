var skipListClass = {

}

var skipListID = {
    proposedTermLength:""
}

var notString = "#proposedTermLength"

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];



function autoFillAll(){
    try {
        var htmlElementArray = $("input:visible:not('" + notString + "'), select:visible ").toArray()
        var count = 0;
        autoFillInputCallback(htmlElementArray, count)


    }
    catch(e){
        console.log ("Error: " + e)
    }
    // $('input:visible').each(function(){
    //
    // });

}

function autoFillInputCallback(htmlElementArray, count){
    if(count < htmlElementArray.length){
        var htmlElement = htmlElementArray[count];
        var okToType = false;
        console.log(htmlElement)
        console.log($(htmlElement))


        var string = chance.string({length: 10});
        if($(htmlElement).is('input:text') ) {
            if($(htmlElement).hasClass('datepicker')){
                if($(htmlElement).attr('id') === "proposedEffectiveDate"){
                    var dateString = autoGetTodaysDate();
                    autoFillType(dateString, htmlElement, htmlElementArray, count)
                }
                else if($(htmlElement).attr('id') === "proposedExpirationDate"){
                    var dateString = autoGetMonthFutureDate();
                    autoFillType(dateString, htmlElement, htmlElementArray, count)
                }
                else{
                    var dateString = autoGetTodaysDate();
                    autoFillType(dateString, htmlElement, htmlElementArray, count)
                }
            }
            else if($(htmlElement).hasClass('currencyInput')){
                var money = chance.integer({min: 0, max: 200000});
                autoFillType(money+"", htmlElement, htmlElementArray, count)
            }
            else if($(htmlElement).hasClass('phoneNumberMask')){
                autoFillType(chance.phone({ formatted: false }), htmlElement, htmlElementArray, count)
            }
            else if($(htmlElement).attr('id') == "zipCodeMailing"){
                autoFillType(chance.zip(), htmlElement, htmlElementArray, count)
            }
            else{
                autoFillType(chance.word(), htmlElement, htmlElementArray, count)
            }
        }
        else if($(htmlElement).is('select') ){
            var numOptions = $(htmlElement).find('option').length -1;
            var randomSelected = chance.integer({min: 0, max: numOptions});

            $(htmlElement).find('option:selected').removeAttr('selected');
            $(htmlElement).find('option').eq(randomSelected).attr('selected', 'selected');
            $("input:radio[name='" + groupName + "']").val(randomSelected);

            $(htmlElement).trigger('change');
            $(htmlElement).focus();
            count++;
            autoFillInputCallback(htmlElementArray, count);
        }
        else if($(htmlElement).is('input:radio') ){
            var groupName = $(htmlElement).attr('name');
            var numRadioButtons = $("input:radio[name='" + groupName + "']").length -1
            var randomSelected = chance.integer({min: 0, max: numRadioButtons});

            $("input:radio[name='" + groupName + "']").eq(randomSelected).prop("checked", true);
            // $("input:radio[name='" + groupName + "']").val(randomSelected);

            $(htmlElement).trigger('change');
            count++;
            autoFillInputCallback(htmlElementArray, count);
        }
        else if($(htmlElement).is('input:checkbox') ){
            $(htmlElement).prop("checked", chance.bool());

            $(htmlElement).trigger('change');
            count++;
            autoFillInputCallback(htmlElementArray, count);
        }
        else if($(htmlElement).attr('type') == "number" ){
            var integerString = chance.integer({min: 0, max: 100}) + "";
            autoFillType(integerString, htmlElement, htmlElementArray, count)
        }
        else if($(htmlElement).attr('type') == "email" ){
            autoFillType(chance.email(), htmlElement, htmlElementArray, count)
        }
        else {

            count++
            autoFillInputCallback(htmlElementArray, count)
        }
    }
    else{
        //check for new visible inputs
        var newArray = $("input:visible:not('" + notString + "'), select:visible ").toArray();
        var diff = $(htmlElementArray).not(newArray).get();

        console.log("NEW VISIBLES: " + diff);


    }
}


function loadURLForTest(urlString, divElementToLoad, jsFiles, done){
    $("#fixtureToBeTested").load(urlString + " " + divElementToLoad, function () {
        //TURN OFF JQUERY ANIMATIONS
        $.fx.off = true;

        //Turn off Autosave Loading
        // Cookies.remove('autosaveData');

        //APPEND THE HTML TO THE APPROPRIATE FIXTURE DIV
        $("#fixtureToBeTested").html($(this).find(divElementToLoad).html());


        //LOAD NECESSARY JS FILES FOR TEST PAGE
        var allDone = new Array(jsFiles.length);

        for (var i = 0; i < jsFiles.length; i++) {
            var jsFilePath = jsFiles[i]
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.async = true;
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

function clickThis(elementClick){
    spyOnEvent(elementClick, 'click');
    $(elementClick).click();
    $(elementClick).focus();
    expect('click').toHaveBeenTriggeredOn(elementClick);
}

function waitUntilThis(waitUntil){
    //Wait till animation Finishes
    var POLL_TIME = 10;
    var endTime = new Date().getTime() + 5000;
    var checkCondition = function() {
        if(new Date().getTime() <= endTime){
            if (waitUntil()) {
                setTimeout(checkCondition, POLL_TIME);
            } else {
                done();
            }
        }

    };
    checkCondition();
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

function waitUntilThisIsVisible(elementVisible, done){
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

function waitUntilThisIsVisibleAndExpectThis(elementVisible, check, done){
    //Wait till animation Finishes
    var POLL_TIME = 10;
    var endTime = new Date().getTime() + 5000;
    var checkCondition = function() {
        if(new Date().getTime() <= endTime){
            if ( $(elementVisible).is(':visible') === false) {
                setTimeout(checkCondition, POLL_TIME);
            } else {
                check();
                done();
            }
        }
    };
    checkCondition();
}

function waitUntilThisExistsThenExpectThis(elementExist, check, done){
    //Wait till animation Finishes
    var POLL_TIME = 10;
    var endTime = new Date().getTime() + 5000;
    var checkCondition = function() {
        if(new Date().getTime() <= endTime){
            console.log("CHECKING")
            if ( $(elementExist).length === 0) {
                console.log("WAITING")
                setTimeout(checkCondition, POLL_TIME);
            } else {
                console.log("INSIDE")
                check();
                done();
            }
        }
    };
    checkCondition();
}

function waitUntilThisThenExpectThis(waitUntil, check, done){
    //Wait till animation Finishes
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
function waitUntilThisIsVisibleThenExpectThis(elementVisible, check, done){
    //Wait till animation Finishes
    var POLL_TIME = 10;
    var endTime = new Date().getTime() + 5000;
    var checkCondition = function() {
        if(new Date().getTime() <= endTime){
            if ($(elementVisible).is(':visible') === false) {
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
    $(typeElement).click();
    $(typeElement).focus();
    $(typeElement).val("");

    try{
        $(typeElement).bind('autotyped', function(){
            $(typeElement).trigger('change');
            expect($(typeElement).val().toLowerCase()).toEqual(typeThis.toLowerCase());


            done();
        }).autotype(typeThis, {delay: 10});
    }
    catch(e){

    }

}

function typeThisThenExpectThat(typeThis, typeElement, check, done){
    $(typeElement).click();
    $(typeElement).focus();
    $(typeElement).val("");

    $(typeElement).bind('autotyped', function(){
        $(typeElement).trigger('change');
        check();
        done();
    }).autotype(typeThis, {delay: 10});
}

function autoFillType(typeThis, typeElement, htmlElementArray, count){
    $(typeElement).click();
    $(typeElement).focus();
    $(typeElement).val("");

    try{
        $(typeElement).bind('autotyped', function(){
            $(typeElement).trigger('change');
            count++;
            autoFillInputCallback(htmlElementArray, count);
        }).autotype(typeThis, {delay: 1});
    }
    catch(e){
        console.log ("Error: " + e)
    }
}
