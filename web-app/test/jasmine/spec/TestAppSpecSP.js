var fixture;
var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

describe('Starting Test', function() {
    beforeAll(function (done) {
        //JS FILES TO LOAD FOR TEST
        var jsFiles = [
            '/js/newSubmission.js'
        ];
        loadURLForTest('./../main/newSubmission', '#page-content-wrapper', jsFiles, done);
    }, 20000);
    describe('New Submissions', function() {
        describe('Testing Step 1', function() {

            describe('Check New Submission Page Loaded', function() {
                it('Loaded correctly', function(done) {
                    setTimeout(function() {
                        expect($('.card')[0]).toBeInDOM()
                        done()
                    }, 2000);

                });
            });
            describe('Check Load Button Appears When Saved Submissions exist', function() {

                it('Appears when there are submissions saved', function() {
                    //JSON Response when there are Saved Submissions
                    var jsonResponse = '[{"saveName":"saveData_Film Projects With Cast (No Work Comp)saveData_saveData_06/02/17 12:47",' +
                        '"user":8,"saveDateTime":"Jun 2, 2017 12:47:54 PM",' +
                        '"autosaveFlag":"Y",' +
                        '"saveData":"{\'riskChosen\':\'Film Projects With Cast (No Work Comp)\',' +
                        '\'isAutoSave\':true}",' +
                        '"id":269,' +
                        '"version":0}]'

                    checkForSavedSubmissions(jsonResponse);
                    expect($('#loadProgress')[0]).not.toBeHidden()
                });

                it('Does not appear when no saved submissions in DB', function() {
                    //JSON RESPONSE WHEN THERE ARE NO SAVED SUBMISSIONS
                    var jsonResponse = '[]'

                    checkForSavedSubmissions(jsonResponse);
                    expect($('#loadProgress')[0]).toBeHidden()
                });

                it('Auto Saves on leaving page', function() {
                    spyOn(window, 'saveProgress');
                    saveOnQuit()
                    expect(window.saveProgress).not.toHaveBeenCalled();
                });
            });

            describe('Check Next Buttons dont work unless Risk is chosen', function() {
                it('Check no risk is chosen', function() {
                    expect($('li.active').length).toEqual(0)
                });

                it('Clicking Next Button w/o risk displays warning', function() {
                    expect($('#alertMessageModal')[0]).toBeHidden()
                    $('#nextButtonStep1').trigger('click')
                    expect($('#alertMessageModal')[0]).not.toBeHidden()

                    //dismiss modal
                    $('#alertMessageModalButton').trigger('click')
                });

                it('Top Circle Buttons should be disabled', function() {
                    $('#buttonCircleStep2').trigger('click')
                    expect($('#step-1')).not.toBeHidden()
                    $('#buttonCircleStep3').trigger('click')
                    expect($('#step-1')).not.toBeHidden()
                    $('#buttonCircleStep4').trigger('click')
                    expect($('#step-1')).not.toBeHidden()
                });

            });

            describe('Check Risk Card Functionality', function() {
                it('Check All Cards open on click', function() {
                    spyOn(window, 'riskCategoryCardClickAction').and.callThrough();

                    //CYCLE THROUGH ALL CATEGORY CARDS AND OPEN EACH ONE
                    var count = 0;
                    $('.card').each(function(){
                        expect($(this).closest('.row').find('.drawer').height()).toBe(0)
                        clickThis(this)
                        expect($(this).closest('.row').find('.drawer').height()).toBeGreaterThan(1)

                        count = count +1;
                    });
                    expect(window.riskCategoryCardClickAction).toHaveBeenCalled();
                    expect(window.riskCategoryCardClickAction.calls.count()).toEqual(count);
                });
            });
        });

        describe('Test Special Event', function() {
            beforeAll(function () {
                //OPEN FIRST CARD TO SET UP NEXT TEST
                $('.card').eq(1).click()
                $('.card').eq(1).click()

            }, 20000);
            describe('Click Special Events Risk Type', function() {
                it('Expect Special Events Category Card to be open', function() {
                    expect( $('.drawer').eq(1).height() ).toBeGreaterThan(0)
                });
                it('Click Special Events and goto Step 2', function() {
                        $('#specialEventSpecialEvent').click();
                        $('#specialEventDropdown').prop('value', 'Auctions').click().trigger('change');
                });

                it('Make sure JS and GSP files have loaded', function(done) {
                    var POLL_TIME = 500;
                    var endTime = new Date().getTime() + 20000;
                    var checkCondition = function() {
                        if( (new Date().getTime() > endTime && Object.keys(outstandingCalls).length == 0) ||
                            (Object.keys(outstandingCalls).length == 0 &&
                            $('script[src^="/js/forms/specialEventLiability.js"]').length == 1 && $('#coverageCheckboxesDiv').html().trim().length > 0)
                        ){
                            expect($('script[src^="/js/forms/specialEventLiability.js"]').length).toEqual(1);
                            expect($('#coverageCheckboxesDiv').html().trim().length).toBeGreaterThan(0);
                            done();
                        }
                        else{
                            setTimeout(checkCondition, POLL_TIME);
                        }
                    };
                    checkCondition();
                }, 30000);


            });

            describe('Check Date Inputs', function() {
                it('Check datepicker opens', function() {
                    $('#proposedEffectiveDate').datepicker('show');
                    expect($('td.day').first()).not.toBeHidden();
                });
                it('Check proposed date is clickable', function() {
                    var spyEvent = spyOnEvent('#proposedEffectiveDate', 'changeDate')
                    expect(spyEvent).not.toHaveBeenTriggered()

                    openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())

                    expect(spyEvent).toHaveBeenTriggered()
                });

                it('Check proposed expiration is clickable', function() {
                    var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 40)
                    openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                });

            });

            xdescribe('Check Budget Input', function() {
                it('Check Formatting of Budget', function(done) {
                    typeThisMaskMoney('50000' , $('#totalBudgetConfirm'), done)
                    expect(true).toBeTruthy()
                });
            });


        });
    });







});

function loadRisk(done){
    $.fx.off = true;
    $("#fixtureDiv").append($("<div>")).load("/main/newSubmission #page-content-wrapper", function () {
    });
    reloadJSInHead("/main/newSubmission", done)
}
function cleanUpGoogleMaps(){
    $('#page-content-wrapper script').remove();
}
function reloadJSInHead(src, done) {
    $("#scriptDiv").append($("<div>")).load("/main/newSubmission ", function () {
        $('#scriptDiv #wrapper').remove();
        $('#scriptDiv > script').each(function(){
            var scriptSrc = $(this).attr('src')
            $('script[src="' + scriptSrc + '"]').remove();
            $('<script>').attr('src', scriptSrc).appendTo('head');
        });
        $('#scriptDiv').remove();
        done();
    });
}
function reloadJS(src) {
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}
// reload_js('source_file.js');
function loadSpecFilm(done){

}
function loadSGPFilm(done){

}


