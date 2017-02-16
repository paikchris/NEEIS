var fixture;
var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];



function resetNewSubmission(done){
    $("#fixtureToBeTested").load("./../main/newSubmission #page-content-wrapper", function () {

        //TURN OFF JQUERY ANIMATIONS
        $.fx.off = true;

        //Turn off Autosave Loading
        Cookies.remove('autosaveData');

        //APPEND THE HTML TO THE APPROPRIATE FIXTURE DIV
        $("#fixtureToBeTested").html($(this).find('#page-content-wrapper').html());


        //LOAD NECESSARY JS FILES FOR TEST PAGE
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.onload = function(){
            //ALL TESTING RESOURCES LOADED
            console.log("Loaded");
            done();
        };
        script.src = '/portal/js/newSubmission.js'+"?ts=" + new Date().getTime();
        head.appendChild(script);


    });

    fixture = $('#fixtureToBeTested');
}

xdescribe('Testing /main/NewSubmission.gsp Step 1 basic functions', function() {
    jasmine.getFixtures().fixturesPath = 'http://104.236.23.128:8080/portal/test/jasmine/spec/fixtures/javascripts';


    beforeAll(function (done) {
        resetNewSubmission(done);
    });

    it('is ready to be tested', function() {
        expect('#step-1').toBeInDOM();
    });

    it('Risk Category Cards are clickable and becomes visible after click', function() {
        var filmRiskContainer = $('.card')[0];
        var filmRiskDrawer = $(filmRiskContainer).closest('.row').find('.drawer');

        //Check Drawer is closed and not visible
        expect($(filmRiskDrawer)).not.toHaveClass("open");
        expect($(filmRiskDrawer).height()).toEqual(0);

        //Check Drawer can be clicked
        spyOnEvent('.card', 'click');
        $(filmRiskContainer).click();
        expect('click').toHaveBeenTriggeredOn('.card')

        //Check drawer is open and visible after click
        expect($(filmRiskDrawer)).toHaveClass("drawer open");
        expect($(filmRiskDrawer)).toBeVisible();
    });

    it('Clicking next button do not do anything unless Risk Type is selected', function(done) {
        //Check Next Button Step 1 click
        $('#nextButtonStep1').click();

        //Wait till Alert Modal Animation Finishes
        var POLL_TIME = 10;
        var endTime = new Date().getTime() + 5000;
        var checkCondition = function() {
            if (new Date().getTime() <= endTime && $('#alertMessageModal').hasClass("fade in") == false) {
                setTimeout(checkCondition, POLL_TIME);
            } else {
                expect($('#alertMessageModal')).toHaveClass('fade in');
                expect($('#alertMessageContent').html()).toContain('Please Select Risk Type');

                $('#alertMessageModalButton').click();

                expect($('#step-1')).not.toBeHidden();
                expect($('#step-2')).toBeHidden();
                expect($('#step-3')).toBeHidden();
                expect($('#step-4')).toBeHidden();

                done();
            }
        };
        checkCondition();
    });

    it('Clicking circle buttons do not do anything if no Risk Type is selected', function() {
        //Check Next Button Step 1 click
        $('#buttonCircleStep1').click();
        expect($('#step-1')).not.toBeHidden();
        expect($('#step-2')).toBeHidden();
        expect($('#step-3')).toBeHidden();
        expect($('#step-4')).toBeHidden();


        //Check Next Button Step 2 click
        $('#buttonCircleStep2').click();
        expect($('#step-1')).not.toBeHidden();
        expect($('#step-2')).toBeHidden();
        expect($('#step-3')).toBeHidden();
        expect($('#step-4')).toBeHidden();

        //Check Next Button Step 3 click
        $('#buttonCircleStep3').click();
        expect($('#step-1')).not.toBeHidden();
        expect($('#step-2')).toBeHidden();
        expect($('#step-3')).toBeHidden();
        expect($('#step-4')).toBeHidden();

        //Check Next Button Step 4 click
        $('#buttonCircleStep4').click();
        expect($('#step-1')).not.toBeHidden();
        expect($('#step-2')).toBeHidden();
        expect($('#step-3')).toBeHidden();
        expect($('#step-4')).toBeHidden();
    });

        afterAll(function () {
        $('#fixtureToBeTested').empty();
    });
});



describe('Testing Film Projects Without Cast (No Work Comp)', function() {
    jasmine.getFixtures().fixturesPath = 'http://104.236.23.128:8080/portal/test/jasmine/spec/fixtures/javascripts';

    var fixture;
    beforeAll(function (done) {
        resetNewSubmission(done);
    });

    it('is ready to be tested (products load for risk type)', function(done) {
        // CLICK ON RISK TYPE NEEDED FOR THIS TEST
        spyOnEvent('.riskOptionLink', 'click');

        var filmRiskContainer = $('.card')[0];
        $(filmRiskContainer).click();
        $('.riskOptionLink').each(function() {
            if($(this).html() == "Film Projects Without Cast (No Work Comp)"){
                $(this).click();
            }
        });
        expect('click').toHaveBeenTriggeredOn('.riskOptionLink');

        //Wait till animation Finishes
        var POLL_TIME = 10;
        var endTime = new Date().getTime() + 5000;
        var checkCondition = function() {
            if (new Date().getTime() <= endTime && $('#PIPChoiceInputRadio').length == 0) {
                //console.log("waiting to load products");
                setTimeout(checkCondition, POLL_TIME);
            } else {
                //console.log("EPKG: " + $('#PIPChoiceInputRadio').html());
                expect('#PIPChoiceInputRadio').toBeInDOM();

                //expect('click').toHaveBeenTriggeredOn('#proposedEffectiveDate');
                done();
            }
        };
        checkCondition();

    });

    it('Proposed Effective Date is clickable and datepicker shows when clicked', function(done) {
        //Check Drawer can be clicked
        spyOnEvent('#proposedEffectiveDate', 'click');

        //Wait till animation Finishes
        var POLL_TIME = 10;
        var endTime = new Date().getTime() + 5000;
        var checkCondition = function() {
            if (new Date().getTime() <= endTime && $('#proposedEffectiveDate').is(':visible') == false) {
                setTimeout(checkCondition, POLL_TIME);
            } else {
                expect($('#proposedEffectiveDate')).not.toBeHidden();

                $('#proposedEffectiveDate').click();
                $('#proposedEffectiveDate').focus();
                expect('click').toHaveBeenTriggeredOn('#proposedEffectiveDate');

                var checkCondition1 = function() {
                    if (new Date().getTime() <= endTime && $('td.day').length == 0) {
                        //console.log($('td.day'));
                        setTimeout(checkCondition1, POLL_TIME);
                    } else {
                        //CHECK DATEPICKER IS VISIBLE
                        expect($('td.day').first()).not.toBeHidden();

                        done();
                    }
                };
                checkCondition1();
            }
        };
        checkCondition();
    });



    it('Datepicker appears and is clickable, clicking todays date prints todays date', function(done) {
        //Check Drawer can be clicked
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var year = d.getFullYear();

        if (day < 10) { day = '0' + day; }
        if (month < 10) { month = '0' + month; }
        var dateTodayFormatted =  month + '/' + day + '/' + year;


        //Wait till animation Finishes
        var POLL_TIME = 10;
        var endTime = new Date().getTime() + 5000;
        var checkCondition = function() {
            if (new Date().getTime() <= endTime && $('td.day').length == 0) {
                //console.log($('td.day'));
                setTimeout(checkCondition, POLL_TIME);
            } else {
                //CHECK DATEPICKER IS VISIBLE
                expect($('td.day').first()).not.toBeHidden();
                spyOnEvent('td.day', 'click');
                $('td.day').not(".old").each(function (){
                    if(parseInt($(this).html()) >= day){
                        //CLICK TODAYS DATE
                        $(this).click();
                        return false;
                    }
                });

                //CHECK TODAYS DATE IS SHOWING IN EFFECTIVE FIELD
                expect('click').toHaveBeenTriggeredOn('td.day');
                console.log($('#proposedEffectiveDate').val());
                expect($('#proposedEffectiveDate').val()).toContain(dateTodayFormatted);

                done();
            }
        };
        checkCondition();
    });

    it('Proposed Expiration Date is clickable and datepicker shows when clicked', function(done) {
        //Check Drawer can be clicked
        spyOnEvent('#proposedExpirationDate', 'click');

        //Wait till animation Finishes
        var POLL_TIME = 10;
        var endTime = new Date().getTime() + 5000;
        var checkCondition = function() {
            if (new Date().getTime() <= endTime && $('#proposedExpirationDate').is(':visible') == false) {
                setTimeout(checkCondition, POLL_TIME);
            } else {
                expect($('#proposedExpirationDate')).not.toBeHidden();

                $('#proposedExpirationDate').click();
                $('#proposedExpirationDate').focus();
                expect('click').toHaveBeenTriggeredOn('#proposedExpirationDate');

                var checkCondition1 = function() {
                    if (new Date().getTime() <= endTime && $('td.day').length == 0) {
                        //console.log($('td.day'));
                        setTimeout(checkCondition1, POLL_TIME);
                    } else {
                        //CHECK DATEPICKER IS VISIBLE
                        expect($('td.day').first()).not.toBeHidden();

                        done();
                    }
                };
                checkCondition1();
            }
        };
        checkCondition();
    });



    it('Datepicker appears and is clickable, clicking todays date prints next months date', function(done) {
        //Check Drawer can be clicked
        var d = new Date();
        d.setMonth(d.getMonth()+1);
        var month = d.getMonth()+1;
        var day = d.getDate();
        var year = d.getFullYear();

        if (day < 10) { day = '0' + day; }
        if (month < 10) { month = '0' + month; }

        var datePlusMonthFormatted =  month + '/' + day + '/' + year;


        //Wait till animation Finishes
        var POLL_TIME = 10;
        var endTime = new Date().getTime() + 5000;
        var checkCondition = function() {
            if (new Date().getTime() <= endTime && $('td.day').length == 0) {
                //console.log($('td.day'));
                setTimeout(checkCondition, POLL_TIME);
            } else {
                //CHECK DATEPICKER IS VISIBLE
                expect($('td.day').first()).not.toBeHidden();

                //CLICK FOR NEXT MONTH
                $('th.next').first().click();

                //CLICK ON DATE
                spyOnEvent('td.day', 'click');
                $('td.day').not(".old").each(function (){
                    if(parseInt($(this).html()) >= day){
                        //CLICK TODAYS DATE
                        $(this).click();
                        return false;
                    }
                });

                //CHECK TODAYS DATE IS SHOWING IN EFFECTIVE FIELD
                expect('click').toHaveBeenTriggeredOn('td.day');
                expect($('#proposedExpirationDate').val()).toContain(datePlusMonthFormatted);

                done();
            }
        };
        checkCondition();
    });

    it('type 100000 into Total Budget and is formatted as $100,000', function() {
        spyOnEvent('#totalBudgetConfirm', 'click');
        $('#totalBudgetConfirm').click();
        $('#totalBudgetConfirm').focus();

        expect('click').toHaveBeenTriggeredOn('#totalBudgetConfirm');
        //$('#totalBudgetConfirm').val("100000");
        console.log('autotyping');
        //$('#totalBudgetConfirm').autotype("100000", {delay: 30});
        $('#totalBudgetConfirm').bind('autotyped', function(){
            expect($('#totalBudgetConfirm').val()).toEqual('$100,000');

        }).autotype("100000", {delay: 30});
        //$('#totalBudgetConfirm').trigger('focusout');
        //$('#coverageOptionsTitle').click();
        //$('#totalBudgetConfirm').trigger('change');
    });

    it('PIPChoice is loaded as a product choice', function(done) {

        //Wait till animation Finishes
        var POLL_TIME = 10;
        var endTime = new Date().getTime() + 5000;
        var checkCondition = function() {
            if (new Date().getTime() <= endTime && $('#PIPChoiceInputRadio').is(':visible') == false) {
                console.log("not shown");
                setTimeout(checkCondition, POLL_TIME);
            } else {
                expect('#PIPChoiceInputRadio').not.toBeHidden();
                done();
            }
        };
        checkCondition();
    });

    it('Premiums are shown when clicking on PIPChoice', function(done) {
        spyOnEvent('#PIPChoiceInputRadio', 'click');
        $('#PIPChoiceInputRadio').trigger('click');
        expect('click').toHaveBeenTriggeredOn('#PIPChoiceInputRadio');


        //Wait till animation Finishes
        var POLL_TIME = 10;
        var endTime = new Date().getTime() + 5000;
        var checkCondition = function() {
            if (new Date().getTime() <= endTime && $('.EPKG_LOBRow').length == 0) {
                setTimeout(checkCondition, POLL_TIME);
            } else {
                expect('.EPKG_LOBRow').toBeInDOM();

                //expect('click').toHaveBeenTriggeredOn('#proposedEffectiveDate');
                done();
            }
        };
        checkCondition();
    });

    it('Click next to Step 3', function() {

        expect($('#EPKGcoverage')).toBeChecked();
        spyOnEvent('#nextButtonStep2', 'click');
        $('#nextButtonStep2').trigger('click');
        expect('click').toHaveBeenTriggeredOn('#nextButtonStep2');
    });




    afterAll(function () {
        //$('#fixtureToBeTested').remove();
    });


});
