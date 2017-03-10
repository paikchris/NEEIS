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
            //console.log("Loaded");
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

    it('All Risk Types Loading from database', function(done) {
        $.ajax({
            method: "POST",
            url: "/portal/Async/getAllRiskTypesForCategory",
            data: {
                category: "FP"
            }
        })
            .done(function (msg) {
                //console.log(msg.riskTypes);
                //var riskTypeArray = JSON.parse(msg);
                var passed = true;
                for(var i=0; i< msg.riskTypes.length; i++){
                    //fail(msg.riskTypes[i].riskTypeName.trim() + " does not exist");
                    //expect($( "a:contains('" + msg.riskTypes[i].riskTypeName.trim() + "')").length).not.toEqual(0);
                    if($( "a:contains('" + msg.riskTypes[i].riskTypeName.trim() + "')").length == 0){
                        fail(msg.riskTypes[i].riskTypeName.trim() + " does not exist");
                        passed = false;
                    }
                }
                expect(passed).toBe(true)
                done();
            });
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
    it('Total Budget Input is Visible', function() {
        // CLICK ON RISK TYPE NEEDED FOR THIS TEST
        expect('#totalBudgetConfirm').toBeVisible();

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
                //console.log($('#proposedEffectiveDate').val());
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



    it('Proposed Expiration, clicking next months date prints next months date', function(done) {
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

    it('type 30 into proposed term length', function(done) {
        $('#proposedTermLength').click();
        $('#proposedTermLength').focus();
        $('#proposedTermLength').val("");

        $('#proposedTermLength').bind('autotyped', function(){
            expect($('#proposedTermLength').val()).toEqual('30');
            $('#proposedTermLength').trigger('change');
            done();
        }).autotype("30", {delay: 90});

    });

    it('type 100000 into Total Budget and is formatted as $100,000', function() {
        spyOnEvent('#totalBudgetConfirm', 'click');
        $('#totalBudgetConfirm').click();
        $('#totalBudgetConfirm').focus();

        expect('click').toHaveBeenTriggeredOn('#totalBudgetConfirm');
        //$('#totalBudgetConfirm').val("100000");
        //console.log('autotyping');
        //$('#totalBudgetConfirm').autotype("100000", {delay: 30});
        $('#totalBudgetConfirm').bind('autotyped', function(){
            expect($('#totalBudgetConfirm').val()).toEqual('$100,000');

        }).autotype("100000", {delay: 30});
        //$('#totalBudgetConfirm').trigger('focusout');
        //$('#coverageOptionsTitle').click();
        //$('#totalBudgetConfirm').trigger('change');
    });

    describe('Testing Products load properly for $100,000 Budget', function() {
        it('PIPChoice, 1,2,3 only are loaded as a product choices', function(done) {
            //Wait till animation Finishes
            var POLL_TIME = 10;
            var endTime = new Date().getTime() + 5000;
            var checkCondition = function() {
                if (new Date().getTime() <= endTime &&
                    ($('#PIPChoiceInputRadio').is(':visible') == false &&
                    $('#PIP1InputRadio').is(':visible') == false) &&
                    $('#PIP2InputRadio').is(':visible') == false &&
                    $('#PIP3InputRadio').is(':visible') == false){
                    //console.log("not shown");
                    setTimeout(checkCondition, POLL_TIME);
                } else {
                    expect('#PIPChoiceInputRadio').not.toBeHidden();
                    expect('#PIP1InputRadio').not.toBeHidden();
                    expect('#PIP2InputRadio').not.toBeHidden();
                    expect('#PIP3InputRadio').not.toBeHidden();
                    expect('#PIP4InputRadio').toBeHidden();
                    expect('#PIP5InputRadio').toBeHidden();

                    done();
                }
            };
            checkCondition();
        });
    });

    describe('Premiums load and rate properly for $100,000 Budget', function() {
        describe('PIPCHOICE Testing', function() {
            it('Premiums = 411, 100, 411, 100, 1022', function(done) {
                spyOnEvent('#PIPChoiceInputRadio', 'click');
                $('#PIPChoiceInputRadio').trigger('click');
                expect('click').toHaveBeenTriggeredOn('#PIPChoiceInputRadio');

                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').length == 0) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                        expect($( ".PIPCHOILimitsInput.MiscellaneousRentedEquipment").val()).toEqual("$100,000")
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$411');
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                        expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                        expect($( ".PIPCHOILimitsInput.ExtraExpense").val()).toEqual("$100,000")
                        expect($( ".coverageColumn:contains('Extra Expense')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$100');
                        expect($( ".coverageColumn:contains('Extra Expense')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                        expect($( ".PIPCHOILimitsInput.PropsSetsWardrobe").val()).toEqual("$100,000")
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$411');
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                        expect($( ".PIPCHOILimitsInput.ThirdPartyPropDamageLiab").val()).toEqual("$100,000")
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$100');
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                        expect('#PIPCHOIPremiumTotal').toHaveHtml("$1,022");




                        //$('.EPKG_LOBRow').each(function(){
                        //    $(this).find('.coverageColumn').html()
                        //});
                        //expect('click').toHaveBeenTriggeredOn('#proposedEffectiveDate');
                        done();
                    }
                };
                checkCondition();
            });
            it('Wait for ratePremiums to finish', function(done) {
                //Wait till animation Finishes
                $('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').focus();
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 500;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect(1).toEqual(1);
                        done();
                    }
                };
                checkCondition();

            });
            it('Change PIPChoice Limits and check premiums', function(done) {
                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 1000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        $('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').val('')
                        $('.MiscellaneousRentedEquipment').bind('autotyped', function(){
                            expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').val()).toEqual('$50,000');
                            expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$206');

                            $('.PIPCHOILimitsInput.ExtraExpense').val('')
                            $('.ExtraExpense').bind('autotyped', function(){
                                expect($('.PIPCHOILimitsInput.ExtraExpense').val()).toEqual('$500,000');
                                expect($('.PIPCHOILimitsInput.ExtraExpense').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$411');

                                $('.PIPCHOILimitsInput.PropsSetsWardrobe').val('')
                                $('.PropsSetsWardrobe').bind('autotyped', function(){
                                    expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').val()).toEqual('$200,000');
                                    expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$822');

                                    $('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').val('')
                                    $('.ThirdPartyPropDamageLiab').bind('autotyped', function(){
                                        expect($('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').val()).toEqual('$300,000');
                                        expect($('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$100');
                                        expect('#PIPCHOIPremiumTotal').toHaveHtml("$1,539");

                                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").length).toEqual(0)
                                        done();
                                    }).autotype("300000", {delay: 10});
                                }).autotype("200000", {delay: 10});
                            }).autotype("500000", {delay: 10});
                        }).autotype("50000", {delay: 10});

                    }
                };
                checkCondition();
            });
            it('Select NOHA, Recheck all data', function(done) {
                spyOnEvent('#EPKGNOHAAdditionalCoverage', 'click');
                $('#EPKGNOHAAdditionalCoverage').trigger('click');
                expect('click').toHaveBeenTriggeredOn('#EPKGNOHAAdditionalCoverage');

                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $( ".coverageColumn:contains('Hired Auto Physical Damage')").length == 0) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {

                        expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').val()).toEqual('$50,000');
                        expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$192');


                        expect($('.PIPCHOILimitsInput.ExtraExpense').val()).toEqual('$500,000');
                        expect($('.PIPCHOILimitsInput.ExtraExpense').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$384');


                        expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').val()).toEqual('$200,000');
                        expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$768');


                        expect($('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').val()).toEqual('$300,000');
                        expect($('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$116');

                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$1,000,000");
                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html()).toEqual("$750");
                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").closest('.EPKG_LOBRow').find('.PIPCHOIDeductLine').html()).toEqual("10% of Loss ($1,500 Min / $10,000)");

                        expect('#PIPCHOIPremiumTotal').toHaveHtml("$1,950");
                        done();
                    }
                };
                checkCondition();
            });
        });
        describe('PIP1 Testing', function() {
            it('Check PIP 1 limits, Premiums, and deductibles (No Options/No Auto)', function(done) {
                spyOnEvent('#PIP1InputRadio', 'click');
                $('#PIP1InputRadio').trigger('click');
                expect('click').toHaveBeenTriggeredOn('#PIP1InputRadio');

                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $('#PIP1PremiumTotal').length == 0) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect($('#proposedTermLength').val().trim()).toEqual("60 Days");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$100,000");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("Nil");

                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$100,000");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$3,500");

                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$100,000");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$25,000");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$50,000");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$1,500");

                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$250,000");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").length).toEqual(0)

                        expect('#PIP1PremiumTotal').toHaveHtml("$500");
                        done();
                    }
                };
                checkCondition();
            });

            it('Select NOHA, Recheck all data', function(done) {
                spyOnEvent('#EPKGNOHAAdditionalCoverage', 'click');
                $('#EPKGNOHAAdditionalCoverage').trigger('click');
                expect('click').toHaveBeenTriggeredOn('#EPKGNOHAAdditionalCoverage');

                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $( ".coverageColumn:contains('Hired Auto Physical Damage')").length == 0) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect($('#proposedTermLength').val().trim()).toEqual("60 Days");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$100,000");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("Nil");

                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$100,000");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$3,500");

                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$100,000");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$25,000");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$50,000");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$1,500");

                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$250,000");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$1,000,000");
                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").closest('.EPKG_LOBRow').find('.PIP1PremiumLine').html()).toEqual("$500");
                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").closest('.EPKG_LOBRow').find('.PIP1DeductLine').html()).toEqual("10% of Loss ($1,500 Min / $10,000)");

                        expect('#PIP1PremiumTotal').toHaveHtml("$1,000");

                        //CLEAR NOHA
                        $('#EPKGNOHAAdditionalCoverage').trigger('click');
                        expect('click').toHaveBeenTriggeredOn('#EPKGNOHAAdditionalCoverage');
                        done();
                    }
                };
                checkCondition();
            });
        });

        describe('PIP2 Testing', function() {
            it('Check PIP 2 limits, Premiums, and deductibles', function(done) {
                spyOnEvent('#PIP2InputRadio', 'click');
                $('#PIP2InputRadio').trigger('click');
                expect('click').toHaveBeenTriggeredOn('#PIP2InputRadio');

                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $('#PIP2PremiumTotal').length == 0) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect($('#proposedTermLength').val().trim()).toEqual("60 Days");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$200,000");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("Nil");

                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$200,000");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("15% of loss, $5,000 Min, $12,500 Max");

                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$200,000");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$100,000");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$200,000");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$1,500");

                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$500,000");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Office Contents')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$30,000");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$1,000");
                        expect('#PIP2PremiumTotal').toHaveHtml("$1,000");

                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").length).toEqual(0)

                        done();
                    }
                };
                checkCondition();
            });

            it('Select NOHA, Recheck all data', function(done) {
                spyOnEvent('#EPKGNOHAAdditionalCoverage', 'click');
                $('#EPKGNOHAAdditionalCoverage').trigger('click');
                expect('click').toHaveBeenTriggeredOn('#EPKGNOHAAdditionalCoverage');

                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $( ".coverageColumn:contains('Hired Auto Physical Damage')").length == 0) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect($('#proposedTermLength').val().trim()).toEqual("60 Days");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$200,000");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("Nil");

                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$200,000");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("15% of loss, $5,000 Min, $12,500 Max");

                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$200,000");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$100,000");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$200,000");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$1,500");

                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$500,000");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Office Contents')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$30,000");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("$1,000");

                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$1,000,000");
                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").closest('.EPKG_LOBRow').find('.PIP2PremiumLine').html()).toEqual("$500");
                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").closest('.EPKG_LOBRow').find('.PIP2DeductLine').html()).toEqual("10% of Loss ($1,500 Min / $10,000)");

                        expect('#PIP2PremiumTotal').toHaveHtml("$1,500");
                        //CLEAR NOHA
                        $('#EPKGNOHAAdditionalCoverage').trigger('click');
                        expect('click').toHaveBeenTriggeredOn('#EPKGNOHAAdditionalCoverage');
                        done();
                    }
                };
                checkCondition();
            });
        });

        describe('PIP3 Testing', function() {
            it('Check PIP 3 limits, Premiums, and deductibles', function(done) {
                //console.log('PIP3 TESTING')
                spyOnEvent('#PIP3InputRadio', 'click');
                $('#PIP3InputRadio').trigger('click');
                expect('click').toHaveBeenTriggeredOn('#PIP3InputRadio');

                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $('#PIP3PremiumTotal').length == 0) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect($('#proposedTermLength').val().trim()).toEqual("365 Days");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$300,000");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP3PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP3DeductLine').html()).toEqual("Nil");

                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$300,000");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP3PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP3DeductLine').html()).toEqual("15% of loss, $5,000 Min, $12,500 Max");

                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').first().html()).toEqual("$300,000");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP3PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP3DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Non-Owned Auto Physical Damage')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Non-Owned Auto Physical Damage')").closest('.EPKG_LOBRow').find('.NOHADeductLine').html()).toEqual("10% of Loss ($1,500 Min / $10,000)");

                        expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$150,000");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP3PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP3DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$250,000");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP3PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP3DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$500,000");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP3PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP3DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Office Contents')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$30,000");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP3PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP3DeductLine').html()).toEqual("$1,000");
                        expect('#PIP3PremiumTotal').toHaveHtml("$1,500");

                        expect($( ".coverageColumn:contains('Hired Auto Physical Damage')").length).toEqual(0)

                        done();
                    }
                };
                checkCondition();
            });
        });

        describe('PIP4 Testing', function() {
            it('Change Total Budget to $400,000, type 400000 into Total Budget and is formatted as $400,000', function(done) {
                $('#totalBudgetConfirm').val('');
                spyOnEvent('#totalBudgetConfirm', 'click');
                $('#totalBudgetConfirm').click();
                $('#totalBudgetConfirm').focus();

                expect('click').toHaveBeenTriggeredOn('#totalBudgetConfirm');
                //$('#totalBudgetConfirm').val("100000");

                //$('#totalBudgetConfirm').autotype("100000", {delay: 30});
                $('#totalBudgetConfirm').unbind( "autotyped" );
                $('#totalBudgetConfirm').bind('autotyped', function(){
                    console.log($('#totalBudgetConfirm').val());
                    expect($('#totalBudgetConfirm').val()).toEqual("$400,000");
                    done();
                }).autotype("400000", {delay: 90});
                //$('#totalBudgetConfirm').trigger('focusout');
                //$('#coverageOptionsTitle').click();
                //$('#totalBudgetConfirm').trigger('change');
            });

            it('PIPChoice, 2, and 4 only are loaded as a product choices', function(done) {
                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $('#PIP1InputRadio').is(':hidden') == false){
                        //console.log("not shown");
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect('#PIPChoiceInputRadio').not.toBeHidden();
                        expect('#PIP1InputRadio').toBeHidden();
                        expect('#PIP2InputRadio').not.toBeHidden();
                        expect('#PIP3InputRadio').toBeHidden();
                        expect('#PIP4InputRadio').not.toBeHidden();
                        expect('#PIP5InputRadio').toBeHidden();
                        done();
                    }
                };
                checkCondition();
            });

            it('Check PIP4 limits, Premiums, and deductibles', function(done) {
                //console.log('PIP4 TESTING')
                spyOnEvent('#PIP4InputRadio', 'click');
                $('#PIP4InputRadio').trigger('click');
                expect('click').toHaveBeenTriggeredOn('#PIP4InputRadio');

                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $('#PIP4PremiumTotal').length == 0) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect($('#proposedTermLength').val().trim()).toEqual("365 Days");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$400,000");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP4PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP4DeductLine').html()).toEqual("Nil");

                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$400,000");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP4PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP4DeductLine').html()).toEqual("15% of loss, $5,000 Min, $12,500 Max");

                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').first().html()).toEqual("$500,000");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP4PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP4DeductLine').html()).toEqual("$3,500");

                        expect($( ".coverageColumn:contains('Non-Owned Auto Physical Damage')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Non-Owned Auto Physical Damage')").closest('.EPKG_LOBRow').find('.NOHADeductLine').html()).toEqual("10% of Loss ($1,500 Min / $10,000)");

                        expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$500,000");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP4PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP4DeductLine').html()).toEqual("$3,000");

                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$500,000");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP4PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP4DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$1,000,000");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP4PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP4DeductLine').html()).toEqual("$3,500");

                        expect($( ".coverageColumn:contains('Office Contents')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$50,000");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP4PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP4DeductLine').html()).toEqual("$1,000");
                        expect('#PIP4PremiumTotal').toHaveHtml("$2,400");
                        done();
                    }
                };
                checkCondition();
            });
        });

        describe('PIP5 Testing', function() {
            it('Change Total Budget to $700,000, type 700000 into Total Budget and is formatted as $700,000', function(done) {
                $('#totalBudgetConfirm').val('');
                spyOnEvent('#totalBudgetConfirm', 'click');
                $('#totalBudgetConfirm').click();
                $('#totalBudgetConfirm').focus();

                expect('click').toHaveBeenTriggeredOn('#totalBudgetConfirm');
                //$('#totalBudgetConfirm').val("100000");

                //$('#totalBudgetConfirm').autotype("100000", {delay: 30});
                $('#totalBudgetConfirm').unbind( "autotyped" );
                $('#totalBudgetConfirm').bind('autotyped', function(){
                    console.log($('#totalBudgetConfirm').val());
                    expect($('#totalBudgetConfirm').val()).toEqual("$700,000");
                    done();
                }).autotype("700000", {delay: 90});
                //$('#totalBudgetConfirm').trigger('focusout');
                //$('#coverageOptionsTitle').click();
                //$('#totalBudgetConfirm').trigger('change');
            });

            it('PIPChoice, 2, and 5 only are loaded as a product choices', function(done) {
                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $('#PIP5InputRadio').is(':visible') == false){
                        //console.log("not shown");
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect('#PIPChoiceInputRadio').not.toBeHidden();
                        expect('#PIP1InputRadio').toBeHidden();
                        expect('#PIP2InputRadio').not.toBeHidden();
                        expect('#PIP3InputRadio').toBeHidden();
                        expect('#PIP4InputRadio').toBeHidden();
                        expect('#PIP5InputRadio').not.toBeHidden();
                        done();
                    }
                };
                checkCondition();
            });

            it('Check PIP5 limits, Premiums, and deductibles', function(done) {
                //console.log('PIP5 TESTING')
                spyOnEvent('#PIP5InputRadio', 'click');
                $('#PIP5InputRadio').trigger('click');
                expect('click').toHaveBeenTriggeredOn('#PIP5InputRadio');

                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 5000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime && $('#PIP5PremiumTotal').length == 0) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        expect($('#proposedTermLength').val().trim()).toEqual("365 Days");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$500,000");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP5PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Negative Film & Videotape')").closest('.EPKG_LOBRow').find('.PIP5DeductLine').html()).toEqual("Nil");

                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$500,000");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP5PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Faulty Stock & Camera Processing')").closest('.EPKG_LOBRow').find('.PIP5DeductLine').html()).toEqual("15% of loss, $5,000 Min, $12,500 Max");

                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').first().html()).toEqual("$1,000,000");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP5PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest('.EPKG_LOBRow').find('.PIP5DeductLine').html()).toEqual("$3,500");

                        expect($( ".coverageColumn:contains('Non-Owned Auto Physical Damage')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Non-Owned Auto Physical Damage')").closest('.EPKG_LOBRow').find('.NOHADeductLine').html()).toEqual("10% of Loss ($1,500 Min / $10,000)");

                        expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$500,000");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP5PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Extra Expense')").closest('.EPKG_LOBRow').find('.PIP5DeductLine').html()).toEqual("$3,000");

                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$1,000,000");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP5PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest('.EPKG_LOBRow').find('.PIP5DeductLine').html()).toEqual("$2,500");

                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$1,000,000");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP5PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest('.EPKG_LOBRow').find('.PIP5DeductLine').html()).toEqual("$3,500");

                        expect($( ".coverageColumn:contains('Office Contents')").length).toEqual(1)
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.limitColumn').find('span').html()).toEqual("$50,000");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP5PremiumLine').html()).toEqual("incl");
                        expect($( ".coverageColumn:contains('Office Contents')").closest('.EPKG_LOBRow').find('.PIP5DeductLine').html()).toEqual("$1,000");
                        expect('#PIP5PremiumTotal').toHaveHtml("$4,200");
                        done();
                    }
                };
                checkCondition();
            });
        });

    });


    //it('Click next to Step 3', function() {
    //
    //    expect($('#EPKGcoverage')).toBeChecked();
    //    spyOnEvent('#nextButtonStep2', 'click');
    //    $('#nextButtonStep2').trigger('click');
    //    expect('click').toHaveBeenTriggeredOn('#nextButtonStep2');
    //});




    afterAll(function () {
        //$('#fixtureToBeTested').remove();
    });


});
