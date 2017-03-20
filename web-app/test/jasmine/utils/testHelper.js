function loadURLForTest(urlString, divElementToLoad, jsFiles, done){
    $("#fixtureToBeTested").load(urlString + " " + divElementToLoad, function () {
        //TURN OFF JQUERY ANIMATIONS
        $.fx.off = true;

        //Turn off Autosave Loading
        Cookies.remove('autosaveData');

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

function clickThis(elementClick){
    spyOnEvent(elementClick, 'click');
    $(elementClick).click();
    $(elementClick).focus();
    expect('click').toHaveBeenTriggeredOn(elementClick);
}

function waitUntilThis(watUntil){
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
            if ( $(elementExist).length === 0) {
                setTimeout(checkCondition, POLL_TIME);
            } else {
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
