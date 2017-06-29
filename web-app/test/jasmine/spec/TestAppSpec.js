var fixture;
var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];
jasmine.DEFAULT_TIMEOUT_INTERVAL= 30000;

describe('Starting Test', function() {
    beforeAll(function (done) {
        // alert("TESTING MODE: Pressing any keys, clicking the mouse, minimizing, or hiding this window will interfere with the test")
        $('body').prepend("<div style='width: 100%; position: absolute; top: 80px; z-index: 9999; padding-left:50px; color: red;'>" +
            "TESTING MODE: Pressing any keys, clicking the mouse, minimizing, or hiding this window will interfere with the test" +
            "</div>")

        //JS FILES TO LOAD FOR TEST
        var jsFiles = [
            '/js/newSubmission.js'
        ];
        $("body").css("pointer-events", "none");
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

        describe('Test Spec Film', function() {
            describe('Test Film Projects W/O Cast NO Work Comp', function() {
                beforeAll(function () {
                    //OPEN FIRST CARD TO SET UP NEXT TEST
                    goBackToNewSubmissionStep1()
                    openRiskCategoryCardDrawer()
                }, 20000);

                describe('Click Film Projects W/O Cast NO Work Comp and Goto Step 2', function() {
                    it('Click Film Projects and goto Step 2', function() {
                        selectRiskTypeAndGotoStep2("Film Projects Without Cast (No Work Comp)")
                    });

                    it('Make sure JS and GSP files have loaded', function(done) {
                        var waitUntilThisIsTrue = function(){
                            return (Object.keys(outstandingCalls).length == 0 &&
                            $('script[src^="/js/forms/specFilm.js"]').length >= 1 && $('#coverageCheckboxesDiv').html().trim().length > 0)
                        }
                        var thenDoThis = function(){
                            expect($('script[src^="/js/forms/specFilm.js"]').length).toBeGreaterThanOrEqual(1);
                            expect($('#coverageCheckboxesDiv').html().trim().length).toBeGreaterThan(0);
                            done();
                        }
                        waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                    }, 30000);
                });

                describe('Check Date Inputs', function() {
                    it('Check datepicker opens', function() {
                        $('#proposedEffectiveDate').datepicker('show');
                        expect($('td.day').first()).not.toBeHidden();
                    });
                    it('Check proposed date is clickable', function() {
                        openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                    });

                    it('Check proposed expiration is clickable', function() {
                        var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 40)
                        openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                    });
                });

                describe('Check Budget Input', function() {
                    it('Check Formatting of Budget', function(done) {
                        typeThisMaskMoney('50000' , $('#totalBudgetConfirm'), done)
                        expect(true).toBeTruthy()
                    });
                });

                describe('Test Products Show Up Correctly for given Budgets', function() {
                    describe('Check Products for $50,000', function() {
                        beforeAll(function(done) {
                            typeThisMaskMoney('50000' , $('#totalBudgetConfirm'), done)
                        });
                        it('Check Products, PIP Choice, 1, 5', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $('#PIPChoiceInputRadio').is(':visible') && $('#PIP1InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                        }, 30000);
                    });

                    describe('Check Products for $150,000', function() {
                        beforeAll(function(done) {
                            typeThisMaskMoney('150000' , $('#totalBudgetConfirm'), done)
                        });
                        it('Check Products, PIP Choice, 2, 5', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 && $('#PIPChoiceInputRadio').is(':visible') &&
                                $('#PIP2InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                        }, 30000);
                    });

                    describe('Check Products for $250,000', function() {
                        beforeAll(function(done) {
                            typeThisMaskMoney('250000' , $('#totalBudgetConfirm'), done)
                        });
                        it('Check Products, PIP Choice, 3, 5', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $('#PIPChoiceInputRadio').is(':visible') && $('#PIP3InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);
                    });

                    describe('Check Products for $350,000', function() {
                        beforeAll(function(done) {
                            typeThis('350000' , $('#totalBudgetConfirm'), done)
                        });
                        it('Check Products, PIP Choice, 4, 5', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);
                    });

                    describe('Check Products for $450,000', function() {
                        beforeAll(function(done) {
                            typeThis('450000' , $('#totalBudgetConfirm'), done)
                        });
                        it('Check Products', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);
                    });
                });

                describe('Test EPKG Products', function() {
                    describe('Test PIP CHOICE', function() {
                        describe('Test PIP CHOICE at $50,000', function() {
                            beforeAll(function(done) {
                                typeThis('50000' , $('#totalBudgetConfirm'), done)

                            });
                            it('Check Products, PIP Choice, 1, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP1InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP CHOICE is selected', function(done) {
                                if($('#PIPChoiceInputRadio').is(':checked')){
                                    expect(true).toBeTruthy()
                                    done();
                                }
                                else{
                                    spyOnEvent('#PIPChoiceInputRadio', 'click');
                                    $('#PIPChoiceInputRadio').trigger('click');
                                    expect('click').toHaveBeenTriggeredOn('#PIPChoiceInputRadio');

                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#PIPChoiceInputRadio').is(':visible') && $('#PIP1InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                    }
                                    var thenDoThis = function(){
                                        expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                        expect($('#PIP1InputRadio').is(':visible')).toBeTruthy();
                                        expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                        expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                        expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                        expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                }

                            }, 30000);

                            it('Check Extra Expense, Misc Rented Equip, Props, And Third Party options show', function() {
                                expect($('#PIPChoice_ExtraExpense').is(':visible')).toBeTruthy();
                                expect($('#PIPChoice_MiscRented').is(':visible')).toBeTruthy();
                                expect($('#PIPChoice_Props').is(':visible')).toBeTruthy();
                                expect($('#PIPChoice_ThirdParty').is(':visible')).toBeTruthy();
                            });

                            it('Unchecking Extra Expense hides limit', function(done) {
                                // spyOnEvent('#PIPChoice_ExtraExpense', 'change');
                                $('#PIPChoice_ExtraExpense').prop('checked', false);
                                $('#PIPChoice_ExtraExpense').trigger('change');
                                // expect('change').toHaveBeenTriggeredOn('#PIPChoice_ExtraExpense');
                                expect($('#PIPChoice_ExtraExpense')).not.toBeChecked()

                                var waitUntilThisIsTrue = function(){
                                    return ($('.PIPCHOILimitsInput.ExtraExpense').length ==0)
                                }
                                var thenDoThis = function(){
                                    expect($('.PIPCHOILimitsInput.ExtraExpense').length).toEqual(0);
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Unchecking Misc Equip hides limit', function(done) {
                                // spyOnEvent('#PIPChoice_ExtraExpense', 'change');
                                $('#PIPChoice_MiscRented').prop('checked', false);
                                $('#PIPChoice_MiscRented').trigger('change');
                                // expect('change').toHaveBeenTriggeredOn('#PIPChoice_ExtraExpense');
                                expect($('#PIPChoice_MiscRented')).not.toBeChecked()

                                var waitUntilThisIsTrue = function(){
                                    return ($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').length ==0)
                                }
                                var thenDoThis = function(){
                                    expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').length).toEqual(0);
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Unchecking Props hides limit', function(done) {
                                // spyOnEvent('#PIPChoice_ExtraExpense', 'change');
                                $('#PIPChoice_Props').prop('checked', false);
                                $('#PIPChoice_Props').trigger('change');
                                // expect('change').toHaveBeenTriggeredOn('#PIPChoice_ExtraExpense');
                                expect($('#PIPChoice_Props')).not.toBeChecked()

                                var waitUntilThisIsTrue = function(){
                                    return ($('.PIPCHOILimitsInput.PropsSetsWardrobe').length ==0)
                                }
                                var thenDoThis = function(){
                                    expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').length).toEqual(0);
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Unchecking Third Party hides limit', function(done) {
                                // spyOnEvent('#PIPChoice_ExtraExpense', 'change');
                                $('#PIPChoice_ThirdParty').prop('checked', false);
                                $('#PIPChoice_ThirdParty').trigger('change');
                                // expect('change').toHaveBeenTriggeredOn('#PIPChoice_ExtraExpense');
                                expect($('#PIPChoice_ThirdParty')).not.toBeChecked()

                                var waitUntilThisIsTrue = function(){
                                    return ($('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').length ==0)
                                }
                                var thenDoThis = function(){
                                    expect($('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').length).toEqual(0);
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Recheck all limit options', function(done) {
                                $('#PIPChoice_ExtraExpense').prop('checked', true);
                                $('#PIPChoice_ExtraExpense').trigger('change');
                                expect($('#PIPChoice_ExtraExpense').is(':checked')).toBeTruthy()

                                $('#PIPChoice_MiscRented').prop('checked', true);
                                $('#PIPChoice_MiscRented').trigger('change');
                                expect($('#PIPChoice_MiscRented').is(':checked')).toBeTruthy()

                                $('#PIPChoice_Props').prop('checked', true);
                                $('#PIPChoice_Props').trigger('change');
                                expect($('#PIPChoice_Props').is(':checked')).toBeTruthy()

                                $('#PIPChoice_ThirdParty').prop('checked', true);
                                $('#PIPChoice_ThirdParty').trigger('change');
                                expect($('#PIPChoice_ThirdParty').is(':checked')).toBeTruthy()

                                var waitUntilThisIsTrue = function(){
                                    return ($('.PIPCHOILimitsInput.ExtraExpense').length == 1 &&
                                    $('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').length == 1 &&
                                    $('.PIPCHOILimitsInput.PropsSetsWardrobe').length == 1 &&
                                    $('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').length == 1)
                                }
                                var thenDoThis = function(){
                                    expect($('.PIPCHOILimitsInput.ExtraExpense').length).toEqual(1);
                                    expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').length).toEqual(1);
                                    expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').length).toEqual(1);
                                    expect($('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').length).toEqual(1);
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                        });
                        describe('Test PIP CHOICE at $300,000 30 days or LESS', function() {
                            beforeAll(function(done) {
                                typeThis('300000' , $('#totalBudgetConfirm'), done)
                            });

                            it('Set length of policy to 25 days', function(done) {
                                typeThis('25' , $('#proposedTermLength'), done)
                                expect(true).toBeTruthy()
                            });

                            it('Check Budget is $300,000 and Length is 25 days', function() {
                                expect($('#proposedTermLength').val()).toEqual("25 Days");
                                expect($('#totalBudgetConfirm').val()).toEqual("$300,000");
                            });

                            it('Wait for Rate Premiums to complete', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP3InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Check Premiums for $300,000 and 25 days', function() {
                                expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                                expect($( ".PIPCHOILimitsInput.MiscellaneousRentedEquipment").val()).toEqual("$300,000")
                                expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$1,028');
                                expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                                expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                                expect($( ".PIPCHOILimitsInput.ExtraExpense").val()).toEqual("$300,000")
                                expect($( ".coverageColumn:contains('Extra Expense')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$206');
                                expect($( ".coverageColumn:contains('Extra Expense')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                                expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                                expect($( ".PIPCHOILimitsInput.PropsSetsWardrobe").val()).toEqual("$300,000")
                                expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$1,028');
                                expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                                expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                                expect($( ".PIPCHOILimitsInput.ThirdPartyPropDamageLiab").val()).toEqual("$300,000")
                                expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$103');
                                expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                                expect('#PIPCHOIPremiumTotal').toHaveHtml("$2,365");
                            });

                            it('Enter $500,000 for Miscellaneous Rented Equipment', function(done) {
                                typeThisMaskMoney('500000' , $('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').eq(0), done)
                                expect(true).toBeTruthy()

                            }, 30000);

                            it('Check Premium for Miscellaneous Rented Equipment', function() {
                                expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').val()).toEqual('$500,000');
                                expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$1,713');
                            });

                            it('Enter $500,000 for Extra Expense', function(done) {
                                typeThisMaskMoney('500000' , $('.PIPCHOILimitsInput.ExtraExpense').eq(0), done)
                                expect(true).toBeTruthy()
                            }, 30000);

                            it('Check Premium for Extra Expense', function() {
                                expect($('.PIPCHOILimitsInput.ExtraExpense').val()).toEqual('$500,000');
                                expect($('.PIPCHOILimitsInput.ExtraExpense').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$343');
                            });

                            it('Enter $500,000 for Props, Sets & Wardrobe', function(done) {
                                typeThisMaskMoney('500000' , $('.PIPCHOILimitsInput.PropsSetsWardrobe').eq(0), done)
                                expect(true).toBeTruthy()
                            }, 30000);

                            it('Check Premium for Props, Sets & Wardrobe', function() {
                                expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').val()).toEqual('$500,000');
                                expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$1,713');
                            });

                            it('Enter $500,000 for Third Party Prop Damage Liab', function(done) {
                                typeThisMaskMoney('500000' , $('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').eq(0), done)
                                expect(true).toBeTruthy()

                            }, 30000);

                            it('Check Premium for Third Party Prop Damage Liab', function() {
                                expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').val()).toEqual('$500,000');
                                expect($('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$172');
                            });

                            it('Check Premium for Third Party Prop Damage Liab', function() {
                                expect('#PIPCHOIPremiumTotal').toHaveHtml("$3,941");
                            });
                        });

                        describe('Test PIP CHOICE at $300,000 over 30 days', function() {
                            beforeAll(function(done) {
                                typeThis('300000' , $('#totalBudgetConfirm'), done)
                            });

                            it('Set length of policy to 40 days', function(done) {
                                typeThis('40' , $('#proposedTermLength'), done)
                                expect(true).toBeTruthy()
                            });

                            it('Check Budget is $300,000 and Length is 40 days', function() {
                                expect($('#proposedTermLength').val()).toEqual("40 Days");
                                expect($('#totalBudgetConfirm').val()).toEqual("$300,000");
                            });

                            it('Wait for Rate Premiums to complete', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP3InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Check Premiums for $300,000 and 40 days', function() {
                                expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").length).toEqual(1)
                                expect($( ".PIPCHOILimitsInput.MiscellaneousRentedEquipment").val()).toEqual("$300,000")
                                expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$1,500');
                                expect($( ".coverageColumn:contains('Miscellaneous Rented Equipment')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                                expect($( ".coverageColumn:contains('Extra Expense')").length).toEqual(1)
                                expect($( ".PIPCHOILimitsInput.ExtraExpense").val()).toEqual("$300,000")
                                expect($( ".coverageColumn:contains('Extra Expense')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$300');
                                expect($( ".coverageColumn:contains('Extra Expense')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                                expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").length).toEqual(1)
                                expect($( ".PIPCHOILimitsInput.PropsSetsWardrobe").val()).toEqual("$300,000")
                                expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$1,500');
                                expect($( ".coverageColumn:contains('Props, Sets & Wardrobe')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                                expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").length).toEqual(1)
                                expect($( ".PIPCHOILimitsInput.ThirdPartyPropDamageLiab").val()).toEqual("$300,000")
                                expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest(".EPKG_LOBRow").find('.PIPCHOIPremiumLine').html()).toEqual('$150');
                                expect($( ".coverageColumn:contains('Third Party Prop Damage Liab')").closest(".EPKG_LOBRow").find('.PIPCHOIDeductLine').html()).toEqual('$2,500');

                                expect('#PIPCHOIPremiumTotal').toHaveHtml("$3,450");
                            });

                            it('Enter $500,000 for Miscellaneous Rented Equipment', function(done) {
                                typeThisMaskMoney('500000' , $('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').eq(0), done)
                                expect(true).toBeTruthy()
                            }, 30000);

                            it('Check Premium for Miscellaneous Rented Equipment', function() {
                                expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').val()).toEqual('$500,000');
                                expect($('.PIPCHOILimitsInput.MiscellaneousRentedEquipment').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$2,500');
                            });

                            it('Enter $500,000 for Extra Expense', function(done) {
                                typeThisMaskMoney('500000' , $('.PIPCHOILimitsInput.ExtraExpense').eq(0), done)
                                expect(true).toBeTruthy()
                            }, 30000);

                            it('Check Premium for Extra Expense', function() {
                                expect($('.PIPCHOILimitsInput.ExtraExpense').val()).toEqual('$500,000');
                                expect($('.PIPCHOILimitsInput.ExtraExpense').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$500');
                            });

                            it('Enter $500,000 for Props, Sets & Wardrobe', function(done) {
                                typeThisMaskMoney('500000' , $('.PIPCHOILimitsInput.PropsSetsWardrobe').eq(0), done)
                                expect(true).toBeTruthy()
                            }, 30000);

                            it('Check Premium for Props, Sets & Wardrobe', function() {
                                expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').val()).toEqual('$500,000');
                                expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$2,500');
                            });

                            it('Enter $500,000 for Third Party Prop Damage Liab', function(done) {
                                typeThisMaskMoney('500000' , $('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').eq(0), done)
                                expect(true).toBeTruthy()
                            }, 30000);

                            it('Check Premium for Third Party Prop Damage Liab', function() {
                                expect($('.PIPCHOILimitsInput.PropsSetsWardrobe').val()).toEqual('$500,000');
                                expect($('.PIPCHOILimitsInput.ThirdPartyPropDamageLiab').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$250');
                            });

                            it('Check Premium for Third Party Prop Damage Liab', function() {
                                expect('#PIPCHOIPremiumTotal').toHaveHtml("$5,750");
                            });
                        });

                        xdescribe('Check Inputs and Questions on Step 3', function(){

                            it('Goto Step 3', function() {
                                gotoStep3()
                            });

                            //INSURED INFO SECTION
                            describe('Check Step 3 is Visible', function() {
                                it('Check if visible', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $('#namedInsured').is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($('#namedInsured').is(':visible')).toBeTruthy();
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });
                            });
                            describe('Check Named Insured input capitalizes letters', function() {
                                it('Check if visible', function() {
                                    expect( $('#namedInsured').is(":visible") ).toBeTruthy()
                                });
                                it('Try Blank Input', function(done) {
                                    typeThis('{{tab}}' , $('#namedInsured'), done)
                                });
                                it('Check Blank Input is Marked as Error', function() {
                                    expect( $('#namedInsured').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Type Name Lowercase', function(done) {
                                    typeThis('test name' , $('#namedInsured'), done)
                                });
                                it('Check First Letters are Capitalized', function() {
                                    expect( $('#namedInsured').val() ).toEqual("Test Name")
                                });
                            });
                            describe('Check Phone Number is formatted correctly', function() {
                                it('Check if visible', function() {
                                    expect( $('#phoneNumber').is(":visible") ).toBeTruthy()
                                });
                                it('Try Blank Input', function(done) {
                                    typeThis('{{tab}}' , $('#phoneNumber'), done)
                                });
                                it('Check Blank Input is Marked as Error', function() {
                                    expect( $('#phoneNumber').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Type phone number', function(done) {
                                    typeThis('1234567890{{tab}}' , $('#phoneNumber'), done)
                                });
                                xit('Make sure phone number was typed correctly (problem with test plugin, not our code)', function(done) {
                                    typeThis('1234567890{{tab}}' , $('#phoneNumber'), done)
                                });
                                it('Check Phone number formatting', function() {
                                    expect( $('#phoneNumber').val() === "(123) 456-7890" ||
                                        $('#phoneNumber').val() === "(112) 345-6789" //BUG WITH TEST PLUGIN
                                    ).toBeTruthy()
                                });
                            });
                            describe('Check Email is formatted correctly', function() {
                                it('Check if visible', function() {
                                    expect( $('#namedInsuredEmail').is(":visible") ).toBeTruthy()
                                });
                                it('Try Blank Input', function(done) {
                                    typeThis('{{tab}}' , $('#namedInsuredEmail'), done)
                                });
                                it('Check Blank Input is Marked as Error', function() {
                                    expect( $('#namedInsuredEmail').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Type email', function(done) {
                                    typeThis('test{{tab}}' , $('#namedInsuredEmail'), done)
                                });
                                it('Check bad format is marked error', function() {
                                    expect( $('#namedInsuredEmail').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Type email', function(done) {
                                    typeThis('test@{{tab}}' , $('#namedInsuredEmail'), done)
                                });
                                it('Check bad format is marked error', function() {
                                    expect( $('#namedInsuredEmail').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Type email', function(done) {
                                    typeThis('test@gmail{{tab}}' , $('#namedInsuredEmail'), done)
                                });
                                it('Check bad format is marked error', function() {
                                    expect( $('#namedInsuredEmail').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Type email', function(done) {
                                    typeThis('test@gmail.com{{tab}}' , $('#namedInsuredEmail'), done)
                                });
                                it('Check GOOD format is NOT marked Error', function() {
                                    expect( $('#namedInsuredEmail').closest(".form-group").hasClass('has-error') ).toBeFalsy()
                                });
                            });
                            describe('Check Website input exists', function() {
                                it('Is Visible ', function() {
                                    expect( $('#website').is(":visible") ).toBeTruthy()
                                });
                            });
                            describe('Check Address 1 Input ', function() {
                                it('Check if visible', function() {
                                    expect( $('#googleAutoAddress').is(":visible") ).toBeTruthy()
                                });
                                it('Try Blank Input', function(done) {
                                    typeThis('{{tab}}' , $('#googleAutoAddress'), done)
                                });
                                it('Check Blank Input is Marked as Error', function() {
                                    expect( $('#googleAutoAddress').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Type Test Address', function(done) {
                                    typeThis('123 Test Street{{tab}}' , $('#googleAutoAddress'), done)
                                });
                                it('Check Address ', function() {
                                    expect( $('#googleAutoAddress').val() ).toEqual("123 Test Street")
                                });
                            });
                            describe('Check City Input ', function() {
                                it('Check if visible', function() {
                                    expect( $('#cityMailing').is(":visible") ).toBeTruthy()
                                });
                                it('Try Blank Input', function(done) {
                                    typeThis('{{tab}}' , $('#cityMailing'), done)
                                });
                                it('Check Blank Input is Marked as Error', function() {
                                    expect( $('#cityMailing').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Type Test Address', function(done) {
                                    typeThis('Test City{{tab}}' , $('#cityMailing'), done)
                                });
                                it('Check Address ', function() {
                                    expect( $('#cityMailing').val() ).toEqual("Test City")
                                });
                            });
                            describe('Check Zip Code Input ', function() {
                                it('Check if visible', function() {
                                    expect( $('#zipCodeMailing').is(":visible") ).toBeTruthy()
                                });
                                it('Try Blank Input', function(done) {
                                    typeThis('{{tab}}' , $('#zipCodeMailing'), done)
                                });
                                it('Check Blank Input is Marked as Error', function() {
                                    expect( $('#zipCodeMailing').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Type Test Address', function(done) {
                                    typeThis('90254{{tab}}' , $('#zipCodeMailing'), done)
                                });
                                it('Check Address ', function() {
                                    expect( $('#zipCodeMailing').val() ).toEqual("90254")
                                });
                            });
                            describe('Check BOR functionality', function() {
                                beforeAll(function () {
                                    //Set Spy on the checkNamedInsured Function
                                    spyOn(window, 'checkNamedInsured').and.callThrough();
                                });
                                it('Get a Unique Name and Zipcode from database', function(done) {
                                    getUniqueNameAndZipForBOR(done);
                                });
                                it('Type name into Named Insured and check if loading spinner appears', function(done) {
                                    resetNamedInsuredBORToTestAgain();

                                    typeThis( uniqueName + '{{tab}}' , $('#namedInsured'), function(){return true})
                                    //WAIT UNTIL WE SEE THE CHECK NAME SPINNER
                                    var waitUntilThisIsTrue = function(){
                                        return ($('#checkNameSpinner').is(':visible') ||
                                            $('#namedInsured').siblings('.glyphicon.glyphicon-ok').is(':visible') //SOMETIMES THE WEB CALL RESPONDS TO FAST AND CHECK MARK IS VISIBLE
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($('#checkNameSpinner').is(':visible') ||
                                            $('#namedInsured').siblings('.glyphicon.glyphicon-ok').is(':visible') //SOMETIMES THE WEB CALL RESPONDS TO FAST AND CHECK MARK IS VISIBLE
                                        ).toBeTruthy();
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });
                                it('Check if checkName Function was called and Green Check Mark is Visible (Named Insured)', function(done) {
                                    //WAIT UNTIL CHECK NAME SPINNER FINISHED AND GREEN CHECK MARK IS VISIBLE
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#namedInsured').siblings('.glyphicon.glyphicon-ok').is(':visible') &&
                                        $('#namedInsured').val() === uniqueName
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect( $('#checkNameSpinner').is(':visible') ).toBeFalsy()
                                        expect( $('#namedInsured').siblings('.glyphicon.glyphicon-ok').is(':visible') ).toBeTruthy();
                                        expect( $('#namedInsured').val() === uniqueName ).toBeTruthy()

                                        expect( $("#namedInsured").closest(".form-group").hasClass("has-success") ).toBeTruthy();
                                        expect( $("#namedInsured").closest(".form-group").hasClass("has-error") ).toBeFalsy();
                                        expect( $("#namedInsured").closest(".form-group").hasClass("has-warning") ).toBeFalsy();
                                        expect( $("#namedInsured").closest(".form-group").hasClass("has-bor") ).toBeFalsy();

                                        expect(window.checkNamedInsured).toHaveBeenCalled();
                                        window.checkNamedInsured.calls.reset();

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });
                                it('Type name into Zip Code and check if loading spinner appears', function(done) {
                                    resetNamedInsuredBORToTestAgain();

                                    typeThis( uniqueZipCode + '{{tab}}' , $('#zipCodeMailing'), function(){return true})

                                    //WAIT UNTIL WE SEE THE CHECK NAME SPINNER
                                    var waitUntilThisIsTrue = function(){
                                        return ($('#checkNameSpinner').is(':visible') ||
                                            $('#namedInsured').siblings('.glyphicon.glyphicon-ok').is(':visible') //SOMETIMES THE WEB CALL RESPONDS TO FAST AND CHECK MARK IS VISIBLE
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($('#checkNameSpinner').is(':visible') ||
                                            $('#namedInsured').siblings('.glyphicon.glyphicon-ok').is(':visible') //SOMETIMES THE WEB CALL RESPONDS TO FAST AND CHECK MARK IS VISIBLE
                                        ).toBeTruthy();
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });
                                it('Check if checkName Function was called and Green Check Mark is Visible (ZipCode)', function(done) {
                                    //WAIT UNTIL CHECK NAME SPINNER FINISHED AND GREEN CHECK MARK IS VISIBLE
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#namedInsured').siblings('.glyphicon.glyphicon-ok').is(':visible') &&
                                            $('#zipCodeMailing').val() === uniqueZipCode
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect( $('#checkNameSpinner').is(':visible') ).toBeFalsy()
                                        expect( $('#namedInsured').siblings('.glyphicon.glyphicon-ok').is(':visible') ).toBeTruthy();
                                        expect( $('#zipCodeMailing').val() === uniqueZipCode ).toBeTruthy()

                                        expect( $("#namedInsured").closest(".form-group").hasClass("has-success") ).toBeTruthy();
                                        expect( $("#namedInsured").closest(".form-group").hasClass("has-error") ).toBeFalsy();
                                        expect( $("#namedInsured").closest(".form-group").hasClass("has-warning") ).toBeFalsy();
                                        expect( $("#namedInsured").closest(".form-group").hasClass("has-bor") ).toBeFalsy();

                                        expect(window.checkNamedInsured).toHaveBeenCalled();
                                        window.checkNamedInsured.calls.reset();

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });
                            });
                            describe('Check State DropDown ', function() {
                                it('Try Invalid Input', function() {
                                    $('#stateMailing').val("invalid")
                                    $('#zipCodeMailing').click()
                                });
                                it('Check Blank Input is Marked as Error', function() {
                                    expect( $('#stateMailing').closest(".form-group").hasClass('has-error') ).toBeTruthy()
                                });
                                it('Select California', function() {
                                    $('#stateMailing').val("CA")
                                    $('#zipCodeMailing').focus()
                                });
                                it('Check California', function() {
                                    expect( $('#stateMailing').val() ).toEqual("CA")
                                });
                                it('Select Alabama', function() {
                                    $('#stateMailing').val("AL")
                                    $('#zipCodeMailing').focus()
                                });
                                it('Check Address ', function() {
                                    expect( $('#stateMailing').val() ).toEqual("AL")
                                });
                            });
                            describe('Check Name of Production Company matches Named Insured', function() {
                                it('Check if visible', function() {
                                    expect( $('#nameOfProductionCompany').is(":visible") ).toBeTruthy()
                                });
                                it('Check if matches Named Insured', function() {
                                    expect( $('#nameOfProductionCompany').val().trim() === $('#namedInsured').val().trim() ).toBeTruthy()
                                });
                            });
                            describe('Check Title of Production Input', function() {
                                it('Check if visible', function() {
                                    expect( $('#titleOfProduction').is(":visible") ).toBeTruthy()
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis('Test Title{{tab}}' , $('#titleOfProduction'), done)
                                });
                                it('Check Input', function() {
                                    expect( $('#titleOfProduction').val().trim() === "Test Title" ).toBeTruthy()
                                });
                            });
                            describe('Check Name of Principals Input', function() {
                                it('Check if visible', function() {
                                    expect( $('#nameOfPrincipal').is(":visible") ).toBeTruthy()
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis('Jim Johnson, Test Name{{tab}}' , $('#nameOfPrincipal'), done)
                                });
                                it('Check Input', function() {
                                    expect( $('#nameOfPrincipal').val().trim() === "Jim Johnson, Test Name" ).toBeTruthy()
                                });
                            });
                            describe('Check Number of Years Experience Input', function() {
                                it('Check if visible', function() {
                                    expect( $('#numberOfYearsOfExperience').is(":visible") ).toBeTruthy()
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis('30 years {{tab}}' , $('#numberOfYearsOfExperience'), done)
                                });
                                it('Check Input', function() {
                                    expect( $('#numberOfYearsOfExperience').val().trim() === "30 years" ).toBeTruthy()
                                });
                            });
                            describe('Check Prior Losses Input', function() {
                                it('Check if visible', function() {
                                    expect( $('#listOfPriorLosses').is(":visible") ).toBeTruthy()
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis('$2500{{tab}}' , $('#listOfPriorLosses'), done)
                                });
                                it('Check Input', function() {
                                    expect( $('#listOfPriorLosses').val().trim() === "$2500" ).toBeTruthy()
                                });
                            });
                            describe('Check Max Cost of One Production Input', function() {
                                it('Check if visible', function() {
                                    expect( $('#maxCostOneProduction').is(":visible") ).toBeTruthy()
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis('$650,000{{tab}}' , $('#maxCostOneProduction'), done)
                                });
                                it('Check Input', function() {
                                    expect( $('#maxCostOneProduction').val().trim() === "$650,000" ).toBeTruthy()
                                });
                            });
                            describe('Check Is Reshoot Radio Input', function() {
                                it('Check if visible', function() {
                                    expect( $('#isReshootNo').is(":visible") ).toBeTruthy()
                                    expect( $('#isReshootYes').is(":visible") ).toBeTruthy()
                                });
                                it('Check No is initially Checked', function() {
                                    expect( $('#isReshootNo').is(":checked") ).toBeTruthy()
                                });
                                it('Select Yes', function() {
                                    $('#isReshootYes').click();
                                    expect( $('#isReshootNo').is(":checked") ).toBeFalsy()
                                    expect( $('#isReshootYes').is(":checked") ).toBeTruthy()

                                });
                            });

                            //RISK SPECIFIC INFO SECTION
                            describe('Check Type of Production Checkboxes', function() {
                                it('Check each is visible', function() {
                                    expect( $('#productionType_Documentary').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_MotionPicture').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_ShortFilm').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_TVMovie').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_TVPilot').is(":visible") ).toBeTruthy()
                                    expect( $('#tvSeriesCheckBox').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_Commercial').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_Infomercial').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_Educational').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_TrainingVideo').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_AnimationCGI').is(":visible") ).toBeTruthy()
                                    expect( $('#otherProductionType').is(":visible") ).toBeTruthy()
                                });
                                it('Check each is checkable', function() {
                                    $('.productionTypeCheckbox').each(function(){
                                        expect( $(this).is(':checked') ).toBeFalsy()
                                        $(this).click();
                                        expect( $(this).is(':checked') ).toBeTruthy()
                                        $(this).click();
                                        expect( $(this).is(':checked') ).toBeFalsy()
                                    });
                                });
                                it('Checking TV Series shows Number of Episodes input ', function() {
                                    expect( $('specFilmNumEpisodesText').is(':visible') ).toBeFalsy();
                                    $('#tvSeriesCheckBox').click()
                                    expect( $('#tvSeriesCheckBox').is(':checked') ).toBeTruthy("1");
                                    expect( $('#specFilmNumEpisodesText').is(':visible') ).toBeTruthy("2");

                                    //CYCLE THROUGH AND CHECK OTHER CHECKBOXES TO SEE IF EPISODES STAYS VISIBLE
                                    $('.productionTypeCheckbox').each(function(){
                                        if( $(this).attr('id')==="tvSeriesCheckBox" ){

                                        }
                                        else{
                                            expect( $(this).is(':checked') ).toBeFalsy()
                                            $(this).click();
                                            expect( $(this).is(':checked') ).toBeTruthy("3")

                                            //CHECK TV SERIES CHECKBOX IS STILL CHECKED, AND EPISODES INPUT IS STILL VISIBLE
                                            expect( $('#tvSeriesCheckBox').is(':checked') ).toBeTruthy("4");
                                            expect( $('#specFilmNumEpisodesText').is(':visible') ).toBeTruthy("5");

                                            //UNCHECK OTHER CHECKBOX
                                            $(this).click();
                                            expect( $(this).is(':checked') ).toBeFalsy()
                                        }
                                    });

                                    //UNCHECKING TV SERIES CHECK BOX AGAIN HIDES EPISODES INPUT
                                    $('#tvSeriesCheckBox').click()
                                    expect( $('#tvSeriesCheckBox').is(':checked') ).toBeFalsy();
                                    expect( $('specFilmNumEpisodesText').is(':visible') ).toBeFalsy();

                                });
                                it('Checking Other shows Other Input', function() {
                                    expect( $('specFilmOtherDescribe').is(':visible') ).toBeFalsy();
                                    $('#otherProductionType').click()
                                    expect( $('#otherProductionType').is(':checked') ).toBeTruthy("1");
                                    expect( $('#specFilmOtherDescribe').is(':visible') ).toBeTruthy("2");

                                    //CYCLE THROUGH AND CHECK OTHER CHECKBOXES TO SEE IF EPISODES STAYS VISIBLE
                                    $('.productionTypeCheckbox').each(function(){
                                        if( $(this).attr('id')==="otherProductionType" ){

                                        }
                                        else{
                                            expect( $(this).is(':checked') ).toBeFalsy()
                                            $(this).click();
                                            expect( $(this).is(':checked') ).toBeTruthy("3")

                                            //CHECK TV SERIES CHECKBOX IS STILL CHECKED, AND EPISODES INPUT IS STILL VISIBLE
                                            expect( $('#otherProductionType').is(':checked') ).toBeTruthy("4");
                                            expect( $('#specFilmOtherDescribe').is(':visible') ).toBeTruthy("5");

                                            //UNCHECK OTHER CHECKBOX
                                            $(this).click();
                                            expect( $(this).is(':checked') ).toBeFalsy()
                                        }
                                    });

                                    //UNCHECKING TV SERIES CHECK BOX AGAIN HIDES EPISODES INPUT
                                    $('#otherProductionType').click()
                                    expect( $('#otherProductionType').is(':checked') ).toBeFalsy();
                                    expect( $('specFilmOtherDescribe').is(':visible') ).toBeFalsy();

                                });

                                it('Click random checkboxes', function() {
                                    $('.productionTypeCheckbox').each(function(){
                                        if( chance.bool() ){
                                            $(this).click();
                                            expect( $(this).is(':checked') ).toBeTruthy()
                                        }
                                    });
                                });
                            });
                            describe('Check Production Involves Checkboxes', function() {
                                it('Check each is visible', function() {
                                    expect( $('#productionInvolves_Animals').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_Motorcycles').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_AirborneCrafts').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_Railroad').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_UnderwaterFilming').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_SpecialVehicles').is(":visible") ).toBeTruthy()
                                    expect( $('#productionType_WaterBorneCrafts').is(":visible") ).toBeTruthy()
                                    expect( $('#pyrotechnicsCheckbox').is(":visible") ).toBeTruthy()
                                    expect( $('#stuntsHazardousCheckbox').is(":visible") ).toBeTruthy()
                                    expect( $('#productionInvolvesNoneAbove').is(":visible") ).toBeTruthy()
                                });
                                it('Check Only None Of The Above is checked by default', function() {
                                    expect( $('#productionInvolves_Animals').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_Motorcycles').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_AirborneCrafts').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_Railroad').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_UnderwaterFilming').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_SpecialVehicles').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_WaterBorneCrafts').is(":checked") ).toBeFalsy()
                                    expect( $('#pyrotechnicsCheckbox').is(":checked") ).toBeFalsy()
                                    expect( $('#stuntsHazardousCheckbox').is(":checked") ).toBeFalsy()
                                    expect( $('#productionInvolvesNoneAbove').is(":checked") ).toBeTruthy()
                                });
                                it('Check each is checkable and None of Above becomes deselected', function() {
                                    //CYCLE THROUGH AND CHECK OTHER CHECKBOXES TO SEE IF EPISODES STAYS VISIBLE
                                    $('.productionInvolvesCheckbox').each(function(){
                                        if( $(this).attr('id')==="productionInvolvesNoneAbove" ){

                                        }
                                        else{
                                            expect( $(this).is(':checked') ).toBeFalsy()
                                            $(this).click();
                                            expect( $(this).is(':checked') ).toBeTruthy()

                                            //CHECKING OTHER CHECKBOXES SHOULD DESELECT
                                            expect( $('#productionInvolvesNoneAbove').is(":checked") ).toBeFalsy()

                                            //UNCHECK CHECKBOX
                                            $(this).click();
                                            expect( $(this).is(':checked') ).toBeFalsy()
                                        }
                                    });
                                });
                                it('Checking Pyrotechnics shows Attach Files', function() {
                                    expect( $('#pyrotechnicsAttachContainer').is(":visible") ).toBeFalsy("1")
                                    $('#pyrotechnicsCheckbox').click()
                                    expect( $('#pyrotechnicsCheckbox').is(":visible") ).toBeTruthy()
                                    expect( $('#pyrotechnicsAttachContainer').is(":visible") ).toBeTruthy()

                                    //UNCHECK PYRO HIDES CONTAINER
                                    $('#pyrotechnicsCheckbox').click()
                                    expect( $('#pyrotechnicsCheckbox').is(":checked") ).toBeFalsy("2")
                                    expect( $('#pyrotechnicsAttachContainer').is(":visible") ).toBeFalsy("#")
                                });
                                it('Checking Stunts/Hazardous shows Stunts Questions', function() {
                                    expect( $('#stuntsHazardousActivitiesAttachContainer').is(":visible") ).toBeFalsy()
                                    $('#stuntsHazardousCheckbox').click()
                                    expect( $('#stuntsHazardousCheckbox').is(":visible") ).toBeTruthy()
                                    expect( $('#stuntsHazardousActivitiesAttachContainer').is(":visible") ).toBeTruthy()

                                    //UNCHECK PYRO HIDES CONTAINER
                                    $('#stuntsHazardousCheckbox').click()
                                    expect( $('#stuntsHazardousCheckbox').is(":checked") ).toBeFalsy()
                                    expect( $('#stuntsHazardousActivitiesAttachContainer').is(":visible") ).toBeFalsy()
                                });
                                it('Checking each checkbox keeps previous checked', function() {
                                    var alreadyChecked = []
                                    //CYCLE THROUGH AND CHECK OTHER CHECKBOXES TO SEE IF EPISODES STAYS VISIBLE
                                    $('.productionInvolvesCheckbox').each(function(){
                                        if( $(this).attr('id')==="productionInvolvesNoneAbove" ){

                                        }
                                        else{
                                            expect( $(this).is(':checked') ).toBeFalsy()
                                            $(this).click();
                                            expect( $(this).is(':checked') ).toBeTruthy()
                                            alreadyChecked.push($(this).attr('id'))

                                            if(alreadyChecked.length > 0){
                                                alreadyChecked.forEach(function(element) {
                                                    expect( $("#" + element).is(':checked') ).toBeTruthy()
                                                });
                                            }

                                            //CHECKING OTHER CHECKBOXES SHOULD DESELECT
                                            expect( $('#productionInvolvesNoneAbove').is(":checked") ).toBeFalsy()
                                        }
                                    });
                                });
                                it('Checking None of Above clears checkboxes', function() {
                                    $('#productionInvolvesNoneAbove').click()

                                    expect( $('#productionInvolves_Animals').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_Motorcycles').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_AirborneCrafts').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_Railroad').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_UnderwaterFilming').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_SpecialVehicles').is(":checked") ).toBeFalsy()
                                    expect( $('#productionType_WaterBorneCrafts').is(":checked") ).toBeFalsy()
                                    expect( $('#pyrotechnicsCheckbox').is(":checked") ).toBeFalsy()
                                    expect( $('#stuntsHazardousCheckbox').is(":checked") ).toBeFalsy()
                                    expect( $('#productionInvolvesNoneAbove').is(":checked") ).toBeTruthy()

                                    //CHECK ALL CONTAINERS ARE HIDDEN
                                    expect( $('#stuntsHazardousActivitiesAttachContainer').is(":visible") ).toBeFalsy()
                                    expect( $('#pyrotechnicsAttachContainer').is(":visible") ).toBeFalsy()
                                });
                                it('Click random checkboxes', function() {
                                    $('.productionInvolvesCheckbox').each(function(){
                                        if( chance.bool() ){
                                            $(this).click();
                                            expect( $(this).is(':checked') ).toBeTruthy()
                                        }
                                    });
                                });
                            });
                            describe('Check Total Budget Confirmation Input', function() {
                                it('Check Visible', function() {
                                    expect( $('#totalBudgetInput').is(":visible") ).toBeTruthy()
                                });
                                it('Check Value is the same as Total Budget on Step 2', function() {
                                    expect( $('#totalBudgetInput').val() === $('#totalBudgetConfirm').val() ).toBeTruthy()
                                });
                                it('Check input is disabled', function() {
                                    expect( $('#totalBudgetInput').is(":disabled") ).toBeTruthy()
                                });
                            });
                            describe('Check Principal Photography Date Inputs', function() {
                                it('Check Start and End Dates are same as Effective dates', function() {
                                    expect( $('#principalPhotographyDateStart').val() === $('#proposedEffectiveDate').val() ).toBeTruthy();
                                    expect( $('#principalPhotographyDateEnd').val() === $('#proposedExpirationDate').val() ).toBeTruthy();
                                });
                                it('Check Start datepicker opens', function() {
                                    $('#principalPhotographyDateStart').datepicker('show');
                                    expect($('td.day').first()).not.toBeHidden();
                                    $('#principalPhotographyDateStart').datepicker('hide');
                                    $('#principalPhotographyDateStart').val( $('#proposedEffectiveDate').val() )
                                });
                                it('Check End datepicker opens', function() {
                                    $('#principalPhotographyDateEnd').datepicker('show');
                                    expect($('td.day').first()).not.toBeHidden();
                                    $('#principalPhotographyDateEnd').datepicker('hide');
                                    $('#principalPhotographyDateEnd').val( $('#proposedExpirationDate').val() )
                                });


                            });
                            describe('Check Producer Input', function() {
                                var producerName = chance.name();
                                it('Check is Visible', function() {
                                    expect( $('#producer').is(':visible') ).toBeTruthy();
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis(producerName + '{{tab}}' , $('#producer'), done)
                                });
                                it('Check Test Input', function() {
                                    expect( $('#producer').val() === producerName ).toBeTruthy();
                                });
                            });
                            describe('Check Director Input', function() {
                                var directorName = chance.name();
                                it('Check is Visible', function() {
                                    expect( $('#director').is(':visible') ).toBeTruthy();
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis(directorName + '{{tab}}' , $('#director'), done)
                                });
                                it('Check Test Input', function() {
                                    expect( $('#director').val() === directorName ).toBeTruthy();
                                });
                            });
                            describe('Check Completion Bond Inputs', function() {
                                var directorName = chance.name();
                                it('Check is Visible', function() {
                                    expect( $('#completionBondRequiredYes_RadioButton').is(':visible') ).toBeTruthy();
                                    expect( $('#completionBondRequiredNo_RadioButton').is(':visible') ).toBeTruthy();
                                });
                                it('Check that default is No', function() {
                                    expect( $('#completionBondRequiredYes_RadioButton').is(':checked') ).toBeFalsy();
                                    expect( $('#completionBondRequiredNo_RadioButton').is(':checked') ).toBeTruthy();
                                });
                                it('Select Yes, Check No is deselected', function() {
                                    $('#completionBondRequiredYes_RadioButton').click()

                                    expect( $('#completionBondRequiredYes_RadioButton').is(':checked') ).toBeTruthy();
                                    expect( $('#completionBondRequiredNo_RadioButton').is(':checked') ).toBeFalsy();
                                });
                                it('Select No, Check Yes is deselected', function() {
                                    $('#completionBondRequiredNo_RadioButton').click()

                                    expect( $('#completionBondRequiredYes_RadioButton').is(':checked') ).toBeFalsy();
                                    expect( $('#completionBondRequiredNo_RadioButton').is(':checked') ).toBeTruthy();
                                });
                            });
                            describe('Check Story Input', function() {
                                var storyInputString = chance.paragraph();
                                it('Check is Visible', function() {
                                    expect( $('#story').is(':visible') ).toBeTruthy();
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis(storyInputString + '{{tab}}' , $('#story'), done)
                                });
                                it('Check Test Input', function() {
                                    expect( $('#story').val() === storyInputString ).toBeTruthy();
                                });
                            });
                            describe('Check Number Productions Input', function() {
                                var numProductions = chance.integer({min: 0, max: 20});
                                it('Check is Visible', function() {
                                    expect( $('#numberProductions').is(':visible') ).toBeTruthy();
                                });
                                xit('Check only numbers able to be entered', function(done) {
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis(numProductions + '{{tab}}' , $('#numberProductions'), done)
                                });
                                it('Check Test Input', function() {
                                    expect( $('#numberProductions').val() === numProductions +"" ).toBeTruthy();
                                });
                            });
                            describe('Check Projects Outside US Input', function() {
                                var percent = chance.integer({min: 0, max: 9});
                                it('Check is Visible', function() {
                                    expect( $('#projectsOutsideUS').is(':visible') ).toBeTruthy();
                                });
                                it('Check only Percents able to be entered', function(done) {
                                    typeThis('test{{tab}}' , $('#projectsOutsideUS'), done)
                                });
                                it('Check Percent Only Input', function() {
                                    expect( $('#projectsOutsideUS').val().trim() === "" ).toBeTruthy();
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis(percent + '{{tab}}' , $('#projectsOutsideUS'), done)
                                });
                                it('Check Test Input', function(done) {
                                    $('#projectsOutsideUS').focus();
                                    $('#numberProductions').focus();
                                    console.log("PERCENT: " + percent)
                                    console.log("Input Val: " + $('#projectsOutsideUS').val().trim())
                                    var waitUntilThisIsTrue = function(){
                                        return ($('#projectsOutsideUS').val().trim() === percent + "%" ||
                                            $('#projectsOutsideUS').val().trim() === percent + "" + percent + "%"

                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect( $('#projectsOutsideUS').val().trim() === percent + "%" ||
                                            $('#projectsOutsideUS').val().trim() === percent + "" + percent + "%").toBeTruthy();
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                                });
                            });
                            describe('Check Number of Employees Input', function() {
                                var numEmployees = chance.integer({min: 0, max: 20});
                                it('Check is Visible', function() {
                                    expect( $('#totalNumEmployees').is(':visible') ).toBeTruthy();
                                });
                                xit('Check only numbers able to be entered', function(done) {
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis(numEmployees + '{{tab}}' , $('#totalNumEmployees'), done)
                                });
                                it('Check Test Input', function() {
                                    expect( $('#totalNumEmployees').val() === numEmployees +"" ).toBeTruthy();
                                });
                            });
                            describe('Check Annual Payroll Input', function() {
                                var payrollInput = "1000"
                                it('Check is Visible', function() {
                                    expect( $('#annualPayroll').is(':visible') ).toBeTruthy();
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis(payrollInput + '{{tab}}' , $('#annualPayroll'), done)
                                });
                                it('Check Test Input', function() {
                                    expect( $('#annualPayroll').val() === "$1,000" ).toBeTruthy();
                                });
                            });
                            describe('Check Umbrella Limit Requested Input', function() {
                                var umbrellaLimit = "2000"
                                it('Check is Visible', function() {
                                    expect( $('#umbrellaLimitRequested').is(':visible') ).toBeTruthy();
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis(umbrellaLimit + '{{tab}}' , $('#umbrellaLimitRequested'), done)
                                });
                                it('Check Test Input', function() {
                                    expect( $('#umbrellaLimitRequested').val() === "$2,000" ).toBeTruthy();
                                });
                            });

                            xit('Skipping Remaining Inputs, write tests needed', function() {
                            });
                            describe('Half Test for FEIN/SSN', function() {
                                var feinInput = "123456789"
                                it('Check is Visible', function() {
                                    expect( $('#FEINSSN').is(':visible') ).toBeTruthy();
                                });
                                it('Enter Test Input', function(done) {
                                    typeThis(feinInput + '{{tab}}' , $('#FEINSSN'), done)
                                });
                                it('Check Test Input', function() {
                                    expect( $('#FEINSSN').val() === feinInput ).toBeTruthy();
                                });
                            });
                            it('Goto Step 4', function() {
                                gotoStep4()
                            });

                            xit('Skipping Check Build Review, write tests needed', function() {
                            });

                            it('Check data being sent with Submit', function() {
                                var dataMap = getSubmissionMap();
                                var validSubmissionMessage = validateSubmission(dataMap);
                                expect(validSubmissionMessage).toBeTruthy()
                            });

                            it('Check response after Submit', function(done) {
                                var dataMap = getSubmissionMap();
                                var validSubmissionMessage = validateSubmission(dataMap);
                                var totalBudget = $("#totalBudgetInput").val().replace(/\$|,/g, '')
                                var proposedTermLength = $("#proposedTermLength").val()
                                var namedInsured = $('#namedInsured').val()
                                console.log("SUBMITTING: " + uwQuestionsMap)
                                console.log( uwQuestionsMap)

                                autoSaveFunction();

                                $.ajax({
                                    method: "POST",
                                    url: "/Async/saveSubmissionToAIM",
                                    data: {
                                        riskType: riskChosen,
                                        totalGrossBudget: totalBudget,
                                        proposedTermLength: proposedTermLength,
                                        namedInsured: namedInsured,
                                        questionAnswerMap: JSON.stringify(autoSaveMap),
                                        uwQuestionsMap: JSON.stringify(uwQuestionsMap),
                                        uwQuestionsOrder: uwQuestionsOrder.join("&;&"),
                                        dataMap: JSON.stringify(dataMap),
                                        BORrequested: BORrequested
                                    }
                                })
                                    .done(function (msg) {
                                        console.log("SUBMISSION RESPONSE: " + msg)

                                        if (msg.split("&;&")[1] === "Indication Error") {
                                            expect(false).toBeTruthy("Indication Error")
                                        }

                                        //IF RESPONSE DOESN'T START WITH ERROR, IT WAS SUBMITTED SUCCESSFULLY TO AIM
                                        if (!msg.startsWith("Error")) {
                                            expect(true).toBeTruthy()

                                        }
                                        else{
                                            expect(false).toBeTruthy("SubmissionError")
                                        }
                                        done();
                                    });
                            });

                            it('Go back to Step 1',function () {
                                //OPEN FIRST CARD TO SET UP NEXT TEST
                                goBackToNewSubmissionStep1()
                                openRiskCategoryCardDrawer()
                            }, 20000);

                            describe('Click Film Projects W/O Cast NO Work Comp and Goto Step 2', function() {
                                it('Click Film Projects and goto Step 2', function() {
                                    selectRiskTypeAndGotoStep2("Film Projects Without Cast (No Work Comp)")
                                });

                                it('Make sure JS and GSP files have loaded', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                        $('script[src^="/js/forms/specFilm.js"]').length >= 1 && $('#coverageCheckboxesDiv').html().trim().length > 0)
                                    }
                                    var thenDoThis = function(){
                                        expect($('script[src^="/js/forms/specFilm.js"]').length).toBeGreaterThanOrEqual(1);
                                        expect($('#coverageCheckboxesDiv').html().trim().length).toBeGreaterThan(0);
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                                }, 30000);
                            });

                        });


                    });

                    describe('Test PIP 1', function() {
                        describe('Test PIP 1 at $50,000', function() {
                            beforeAll(function(done) {
                                typeThis('50000{{tab}}' , $('#totalBudgetConfirm'), done)


                            });
                            it('Check Products, PIP Choice, 1, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP1InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP 1 is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP1InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#PIP1InputRadio', 'click');
                                    $('#PIP1InputRadio').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#PIP1InputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check NOHA check box shows', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible') == 1)
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGNOHAAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check All Limits are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$50,000");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$250,000");

                            });

                            it('Check All LOB Premiums are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            });

                            it('Check All Deductibles are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");

                            });
                            it('Check coverage Premium is Correct', function() {
                                expect( $("#PIP1PremiumTotal").html().trim() ).toEqual("$500");
                            });

                            it('Check Premium Distribution is Correct', function() {
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$500");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                            });

                            it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$1.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                            });

                            it('Check Total Premium is Correct', function() {
                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$531.00");
                            });

                            it('Check Terms are filled', function() {
                                expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Forms are filled', function() {
                                expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Broker Fee Input is fillable', function(done) {
                                typeThis('100' , $('#brokerFeeInput'), done)
                            });
                        });

                        describe('Test PIP 1 w/ Options (NOHA Only)', function() {
                            beforeAll(function(done) {
                                typeThis('50000{{tab}}' , $('#totalBudgetConfirm'), done)
                            });
                            it('Check Products, PIP Choice, 1, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP1InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP 1 is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP1InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#PIP1InputRadio', 'click');
                                    $('#PIP1InputRadio').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#PIP1InputRadio');
                                    expect($('#PIP1InputRadio').is(':checked')).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check NOHA check box shows', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGNOHAAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Make sure NOHA is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP1InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($("#EPKGNOHAAdditionalCoverage").is(':visible')).toBeTruthy();
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#EPKGNOHAAdditionalCoverage', 'click');
                                    $('#EPKGNOHAAdditionalCoverage').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#EPKGNOHAAdditionalCoverage');
                                    expect($('#EPKGNOHAAdditionalCoverage').is(':checked')).toBeTruthy()

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Hired Auto Physical Damage') }).length ).toEqual(1);
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check All Limits are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$50,000");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$250,000");
                                expect( $("#step-2 span:contains('Hired Auto Physical Damage')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");

                            });

                            it('Check All LOB Premiums are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Hired Auto Physical Damage')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$500");

                            });

                            it('Check All Deductibles are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                expect( $("#step-2 span:contains('Hired Auto Physical Damage')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("10% of Loss ($1,500 Min / $10,000)");

                            });

                            it('Check coverage Premium is Correct', function() {
                                expect( $("#PIP1PremiumTotal").html().trim() ).toEqual("$1,000");
                            });

                            it('Check Premium Distribution is Correct', function() {
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,000");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                            });

                            it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$30.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                            });

                            it('Check Total Premium is Correct', function() {
                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,047.00");
                            });

                            it('Check Terms are filled', function() {
                                expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Forms are filled', function() {
                                expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Broker Fee Input is fillable', function(done) {
                                typeThis('100' , $('#brokerFeeInput'), done)
                            });

                            it('Uncheck NOHA option for next test', function(done) {
                                $('#EPKGNOHAAdditionalCoverage').prop("checked", false);

                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#EPKGNOHAAdditionalCoverage').is(':not(:checked)') )
                                }

                                var thenDoThis = function(){
                                    $('#EPKGNOHAAdditionalCoverage').is(':not(:checked)');
                                    done()
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                            });
                        });
                    });

                    describe('Test PIP 2', function() {
                        describe('Test PIP 2 at $150,000', function() {
                            beforeAll(function(done) {
                                typeThis('150000{{tab}}' , $('#totalBudgetConfirm'), done)


                            });
                            it('Check Products, PIP Choice, 2, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP2InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP 2 is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP2InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#PIP2InputRadio', 'click');
                                    $('#PIP2InputRadio').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#PIP2InputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check NOHA check box shows', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible') == 1)
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGNOHAAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Office Contents') }).length ).toEqual(1);

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check All Limits are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$200,000");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$200,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$200,000");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$200,000");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$30,000");
                            });

                            it('Check All LOB Premiums are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            });

                            it('Check All Deductibles are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("15% of loss, $5,000 Min, $12,500 Max");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,000");

                            });

                            it('Check coverage Premium is Correct', function() {
                                expect( $("#PIP2PremiumTotal").html().trim() ).toEqual("$1,000");
                            });

                            it('Check Premium Distribution is Correct', function() {
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,000");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                            });

                            it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$30.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                            });

                            it('Check Total Premium is Correct', function() {
                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,047.00");
                            });

                            it('Check Terms are filled', function() {
                                expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Forms are filled', function() {
                                expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Broker Fee Input is fillable', function(done) {
                                typeThis('100' , $('#brokerFeeInput'), done)
                            });
                        });

                        describe('Test PIP 2 w/ Options (NOHA Only)', function() {
                            beforeAll(function(done) {
                                typeThis('150000{{tab}}' , $('#totalBudgetConfirm'), done)
                            });
                            it('Check Products, PIP Choice, 2, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP2InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP 2 is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP2InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#PIP2InputRadio', 'click');
                                    $('#PIP2InputRadio').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#PIP2InputRadio');
                                    expect($('#PIP2InputRadio').is(':checked')).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check NOHA check box shows', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGNOHAAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Make sure NOHA is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP2InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($("#EPKGNOHAAdditionalCoverage").is(':visible')).toBeTruthy();
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#EPKGNOHAAdditionalCoverage', 'click');
                                    $('#EPKGNOHAAdditionalCoverage').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#EPKGNOHAAdditionalCoverage');
                                    expect($('#EPKGNOHAAdditionalCoverage').is(':checked')).toBeTruthy()

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Office Contents') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Hired Auto Physical Damage') }).length ).toEqual(1);
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check All Limits are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$200,000");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$200,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$200,000");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$200,000");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$30,000");
                                expect( $("#step-2 span:contains('Hired Auto Physical Damage')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            });

                            it('Check All LOB Premiums are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Hired Auto Physical Damage')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$500");

                            });

                            it('Check All Deductibles are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("15% of loss, $5,000 Min, $12,500 Max");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,000");
                                expect( $("#step-2 span:contains('Hired Auto Physical Damage')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("10% of Loss ($1,500 Min / $10,000)");


                            });

                            it('Check coverage Premium is Correct', function() {
                                expect( $("#PIP2PremiumTotal").html().trim() ).toEqual("$1,500");
                            });

                            it('Check Premium Distribution is Correct', function() {
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,500");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                            });

                            it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$45.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$3.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                            });

                            it('Check Total Premium is Correct', function() {
                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,563.00");
                            });

                            it('Check Terms are filled', function() {
                                expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Forms are filled', function() {
                                expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Broker Fee Input is fillable', function(done) {
                                typeThis('100' , $('#brokerFeeInput'), done)
                            });

                            it('Uncheck NOHA option for next test', function(done) {
                                $('#EPKGNOHAAdditionalCoverage').prop("checked", false);

                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#EPKGNOHAAdditionalCoverage').is(':not(:checked)') )
                                }

                                var thenDoThis = function(){
                                    $('#EPKGNOHAAdditionalCoverage').is(':not(:checked)');
                                    done()
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                            });
                        });
                    });

                    describe('Test PIP 3', function() {
                        describe('Test PIP 3 at $250,000', function() {
                            beforeAll(function(done) {
                                typeThis('250000{{tab}}' , $('#totalBudgetConfirm'), done)
                            });
                            it('Check Products, PIP Choice, 3, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP3InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP 3 is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP3InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#PIP3InputRadio', 'click');
                                    $('#PIP3InputRadio').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#PIP3InputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check NOHA check box does not show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible') == false)
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGNOHAAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned Auto Physical Damage') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Office Contents') }).length ).toEqual(1);

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check All Limits are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$300,000");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$300,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$350,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(1).html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$150,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$250,000");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$30,000");
                            });

                            it('Check All LOB Premiums are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(1).html().trim() ).toEqual("");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            });

                            it('Check All Deductibles are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500 Min / 10% of Loss");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500 Min / 10% of Loss");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(1).html().trim() ).toEqual("10% of Loss ($1,500 Min / $10,000)");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,000");

                            });

                            it('Check coverage Premium is Correct', function() {
                                expect( $("#PIP3PremiumTotal").html().trim() ).toEqual("$1,500");
                            });

                            it('Check Premium Distribution is Correct', function() {
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,500");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                            });

                            it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$45.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$3.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                            });

                            it('Check Total Premium is Correct', function() {
                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,563.00");
                            });

                            it('Check Terms are filled', function() {
                                expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Forms are filled', function() {
                                expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Broker Fee Input is fillable', function(done) {
                                typeThis('100' , $('#brokerFeeInput'), done)
                            });
                        });
                    });

                    describe('Test PIP 4', function() {
                        describe('Test PIP 4 at $350,000', function() {
                            beforeAll(function(done) {
                                typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                            });
                            it('Check Products, PIP Choice, 4, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP 4 is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#PIP4InputRadio', 'click');
                                    $('#PIP4InputRadio').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#PIP4InputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check NOHA check box does not show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible') == false)
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGNOHAAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned Auto Physical Damage') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Office Contents') }).length ).toEqual(1);

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check All Limits are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$400,000");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$400,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(1).html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$50,000");
                            });

                            it('Check All LOB Premiums are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(1).html().trim() ).toEqual("");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            });

                            it('Check All Deductibles are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("15% of loss, $5,000 Min, $12,500 Max");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(1).html().trim() ).toEqual("10% of Loss ($1,500 Min / $10,000)");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,000");

                            });

                            it('Check coverage Premium is Correct', function() {
                                expect( $("#PIP4PremiumTotal").html().trim() ).toEqual("$2,100");
                            });

                            it('Check Premium Distribution is Correct', function() {
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$2,100");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                            });

                            it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$63.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$4.20");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                            });

                            it('Check Total Premium is Correct', function() {
                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$2,182.20");
                            });

                            it('Check Terms are filled', function() {
                                expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Forms are filled', function() {
                                expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Broker Fee Input is fillable', function(done) {
                                typeThis('100' , $('#brokerFeeInput'), done)
                            });
                        });
                    });

                    describe('Test PIP 5', function() {
                        describe('Test PIP 5 at $350,000', function() {
                            beforeAll(function(done) {
                                typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                            });
                            it('Check Products, PIP Choice, 4, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP 5 is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#PIP5InputRadio', 'click');
                                    $('#PIP5InputRadio').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#PIP5InputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check NOHA check box does not show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible') == false)
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGNOHAAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check PIP 5 Options are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGCIVIL100AdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGCIVIL500AdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGBirdsFishAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGDogsAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGReptilesAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGSmallOtherAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGFarmAnimalsAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGWildCatsAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGOtherReferAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGCIVIL100AdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGCIVIL500AdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGBirdsFishAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGDogsAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGReptilesAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGSmallOtherAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGFarmAnimalsAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGWildCatsAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGOtherReferAdditionalCoverage").is(':visible') ).toBeTruthy()

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned Auto Physical Damage') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Office Contents') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Money and Currency') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Furs, Jewelry, Art & Antiques') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Talent and Non Budgeted Costs') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Administrative Costs') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Hardware') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Data and Media') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Electronic Data Extra Expense') }).length ).toEqual(1);

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check All Limits are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(1).html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$50,000");
                                expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");


                            });

                            it('Check All LOB Premiums are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(1).html().trim() ).toEqual("");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            });

                            it('Check All Deductibles are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("15% of loss, $5,000 Min, $12,500 Max");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(1).html().trim() ).toEqual("10% of Loss ($1,500 Min / $10,000)");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,000");
                                expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");

                            });

                            it('Check coverage Premium is Correct', function() {
                                expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$2,500");
                            });

                            it('Check Premium Distribution is Correct', function() {
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                            });

                            it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$75.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$5.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                            });

                            it('Check Total Premium is Correct', function() {
                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$2,595.00");
                            });

                            it('Check Terms are filled', function() {
                                expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Forms are filled', function() {
                                expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Broker Fee Input is fillable', function(done) {
                                typeThis('100' , $('#brokerFeeInput'), done)
                            });
                        });

                        describe('Test PIP 5 at $750,000', function() {
                            beforeAll(function(done) {
                                typeThis('750000{{tab}}' , $('#totalBudgetConfirm'), done)
                            });
                            it('Check Products, PIP Choice, 4, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP 5 is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#PIP5InputRadio', 'click');
                                    $('#PIP5InputRadio').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#PIP5InputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check NOHA check box does not show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible') == false)
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGNOHAAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check PIP 5 Options are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGCIVIL100AdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGCIVIL500AdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGBirdsFishAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGDogsAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGReptilesAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGSmallOtherAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGFarmAnimalsAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGWildCatsAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGOtherReferAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGCIVIL100AdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGCIVIL500AdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGBirdsFishAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGDogsAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGReptilesAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGSmallOtherAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGFarmAnimalsAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGWildCatsAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGOtherReferAdditionalCoverage").is(':visible') ).toBeTruthy()

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned Auto Physical Damage') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Office Contents') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Money and Currency') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Furs, Jewelry, Art & Antiques') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Talent and Non Budgeted Costs') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Administrative Costs') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Hardware') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Data and Media') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Electronic Data Extra Expense') }).length ).toEqual(1);

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check All Limits are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(1).html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$50,000");
                                expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");


                            });

                            it('Check All LOB Premiums are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(1).html().trim() ).toEqual("");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            });

                            it('Check All Deductibles are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("15% of loss, $5,000 Min, $12,500 Max");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(1).html().trim() ).toEqual("10% of Loss ($1,500 Min / $10,000)");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,000");
                                expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");

                            });

                            it('Check coverage Premium is Correct', function() {
                                expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$4,500");
                            });

                            it('Check Premium Distribution is Correct', function() {
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$4,500");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                            });

                            it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$135.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$9.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                            });

                            it('Check Total Premium is Correct', function() {
                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$4,659.00");
                            });

                            it('Check Terms are filled', function() {
                                expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Forms are filled', function() {
                                expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Broker Fee Input is fillable', function(done) {
                                typeThis('100' , $('#brokerFeeInput'), done)
                            });
                        });

                        describe('Test PIP 5 at $750,000 w/ Options', function() {
                            beforeAll(function(done) {
                                typeThis('750000{{tab}}' , $('#totalBudgetConfirm'), done)
                            });
                            it('Check Products, PIP Choice, 4, 5 are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure PIP 5 is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible'))
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#PIP5InputRadio', 'click');
                                    $('#PIP5InputRadio').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#PIP5InputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check NOHA check box does not show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EPKGNOHAAdditionalCoverage").is(':visible') == false)
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGNOHAAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check PIP 5 Options are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGCIVIL100AdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGCIVIL500AdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGBirdsFishAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGDogsAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGReptilesAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGSmallOtherAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGFarmAnimalsAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGWildCatsAdditionalCoverage").is(':visible') == true &&
                                        $("#EPKGOtherReferAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#EPKGCIVIL100AdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGCIVIL500AdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGBirdsFishAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGDogsAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGReptilesAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGSmallOtherAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGFarmAnimalsAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGWildCatsAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EPKGOtherReferAdditionalCoverage").is(':visible') ).toBeTruthy()

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned Auto Physical Damage') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Office Contents') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Money and Currency') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Furs, Jewelry, Art & Antiques') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Talent and Non Budgeted Costs') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Administrative Costs') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Hardware') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Data and Media') }).length ).toEqual(1);
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Electronic Data Extra Expense') }).length ).toEqual(1);

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check All Limits are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(1).html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$50,000");
                                expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");


                            });

                            it('Check All LOB Premiums are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(1).html().trim() ).toEqual("");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                                expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            });

                            it('Check All Deductibles are Correct', function() {
                                expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("15% of loss, $5,000 Min, $12,500 Max");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(1).html().trim() ).toEqual("10% of Loss ($1,500 Min / $10,000)");
                                expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,000");
                                expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,500");
                                expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,000");
                                expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                                expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");

                            });

                            it('Check coverage Premium is Correct', function() {
                                expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$4,500");
                            });

                            it('Check Premium Distribution is Correct', function() {
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$4,500");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                            });

                            it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$135.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$9.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                            });

                            it('Check Total Premium is Correct', function() {
                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$4,659.00");
                            });

                            describe('Testing PIP 5 Options ', function() {
                                it('Select Civil Auth 100K Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGCIVIL100AdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGCIVIL100AdditionalCoverage").is(':visible')).toBeTruthy();

                                        spyOnEvent('#EPKGCIVIL100AdditionalCoverage', 'click');
                                        $('#EPKGCIVIL100AdditionalCoverage').click();
                                        // $('#PIP1InputRadio').focus();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGCIVIL100AdditionalCoverage');
                                        expect($('#EPKGCIVIL100AdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Check Civil Auth 100K Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGCIVIL100AdditionalCoverage").is(':checked') == true &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length == 1 &&
                                            $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.limitColumn span').html().trim() == "$100,000"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        //CHECK OPTION CHANGES
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length ).toEqual(1);
                                        expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                        expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$250");
                                        expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,500");
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$4,750");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$4,750");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                        expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                        expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$142.50");
                                        expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                        expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$9.50");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$4,917.00");


                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Select Civil Auth 500K Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGCIVIL500AdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGCIVIL500AdditionalCoverage").is(':visible')).toBeTruthy();

                                        spyOnEvent('#EPKGCIVIL500AdditionalCoverage', 'click');
                                        $('#EPKGCIVIL500AdditionalCoverage').click();
                                        // $('#PIP1InputRadio').focus();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGCIVIL500AdditionalCoverage');
                                        expect($('#EPKGCIVIL500AdditionalCoverage').is(':checked')).toBeTruthy()
                                        expect($('#EPKGCIVIL100AdditionalCoverage').is(':checked')).toBeFalsy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Check Civil Auth 500K Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGCIVIL500AdditionalCoverage").is(':checked') == true &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length == 1 &&
                                            $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.limitColumn span').html().trim() == "$500,000"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        //CHECK OPTION CHANGES
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length ).toEqual(1);
                                        expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                                        expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$500");
                                        expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$5,000");
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$5,000");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$5,000");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                        expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                        expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$150.00");
                                        expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                        expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$10.00");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$5,175.00");

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Clicking Civil Auth 500K twice unchecks option', function(done) {
                                    //HACK
                                    $('#EPKGCIVIL500AdditionalCoverage').prop('checked', false)
                                    $('#EPKGCIVIL500AdditionalCoverage').trigger('change')

                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGCIVIL500AdditionalCoverage").is(':checked') == false &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length == 0 &&
                                            $("#PIP5PremiumTotal").html().trim() === "$4,500"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length ).toEqual(0);
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$4,500");
                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$4,659.00");

                                        expect($('#EPKGCIVIL500AdditionalCoverage').is(':checked')).toBeFalsy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Reselect Civil Auth 100K Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGCIVIL100AdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGCIVIL100AdditionalCoverage").is(':visible')).toBeTruthy();

                                        spyOnEvent('#EPKGCIVIL100AdditionalCoverage', 'click');
                                        $('#EPKGCIVIL100AdditionalCoverage').click();
                                        // $('#PIP1InputRadio').focus();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGCIVIL100AdditionalCoverage');
                                        expect($('#EPKGCIVIL100AdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Clicking Civil Auth 100K twice unchecks option', function(done) {
                                    //HACK
                                    $('#EPKGCIVIL100AdditionalCoverage').prop('checked', false)
                                    $('#EPKGCIVIL100AdditionalCoverage').trigger('change')

                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGCIVIL100AdditionalCoverage").is(':checked') == false &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length == 0 &&
                                            $("#PIP5PremiumTotal").html().trim() === "$4,500"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length ).toEqual(0);
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$4,500");
                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$4,659.00");

                                        expect($('#EPKGCIVIL100AdditionalCoverage').is(':checked')).toBeFalsy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Reselect Civil Auth 500K Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGCIVIL500AdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGCIVIL500AdditionalCoverage").is(':visible')).toBeTruthy();

                                        spyOnEvent('#EPKGCIVIL500AdditionalCoverage', 'click');
                                        $('#EPKGCIVIL500AdditionalCoverage').click();
                                        // $('#PIP1InputRadio').focus();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGCIVIL500AdditionalCoverage');
                                        expect($('#EPKGCIVIL500AdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Select Domestic Birds/Fish Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGBirdsFishAdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGBirdsFishAdditionalCoverage").is(':visible')).toBeTruthy();
                                        spyOnEvent('#EPKGBirdsFishAdditionalCoverage', 'click');
                                        $('#EPKGBirdsFishAdditionalCoverage').click();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGBirdsFishAdditionalCoverage');
                                        expect($('#EPKGBirdsFishAdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Check Domestic Birds/Fish Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGBirdsFishAdditionalCoverage").is(':checked') == true &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Domestic Birds/Fish)') }).length == 1 &&
                                            $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Domestic Birds/Fish)')").closest('.lobRow').find('.limitColumn span').html().trim() == "$25,000"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        //CHECK OPTION CHANGES
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Domestic Birds/Fish)') }).length ).toEqual(1);
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Domestic Birds/Fish)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Domestic Birds/Fish)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Domestic Birds/Fish)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$5,100");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$5,100");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                        expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                        expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$153.00");
                                        expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                        expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$10.20");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$5,278.20");

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Select Dogs Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGDogsAdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGDogsAdditionalCoverage").is(':visible')).toBeTruthy();
                                        spyOnEvent('#EPKGDogsAdditionalCoverage', 'click');
                                        $('#EPKGDogsAdditionalCoverage').click();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGDogsAdditionalCoverage');
                                        expect($('#EPKGDogsAdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Check Dogs Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGBirdsFishAdditionalCoverage").is(':checked') == true &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)') }).length == 1 &&
                                            $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)')").closest('.lobRow').find('.limitColumn span').html().trim() == "$25,000"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        //CHECK OPTION CHANGES
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Domestic Birds/Fish)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)') }).length ).toEqual(1);
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$150");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$5,250");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$5,250");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                        expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                        expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$157.50");
                                        expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                        expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$10.50");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$5,433.00");

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Select Reptiles Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGReptilesAdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGReptilesAdditionalCoverage").is(':visible')).toBeTruthy();
                                        spyOnEvent('#EPKGReptilesAdditionalCoverage', 'click');
                                        $('#EPKGReptilesAdditionalCoverage').click();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGReptilesAdditionalCoverage');
                                        expect($('#EPKGReptilesAdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Check Reptiles Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGBirdsFishAdditionalCoverage").is(':checked') == true &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))') }).length == 1 &&
                                            $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))')").closest('.lobRow').find('.limitColumn span').html().trim() == "$25,000"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        //CHECK OPTION CHANGES
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Domestic Birds/Fish)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))') }).length ).toEqual(1);
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$150");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$5,400");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$5,400");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                        expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                        expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$162.00");
                                        expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                        expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$10.80");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$5,587.80");

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Select Small Animals Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGSmallOtherAdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGSmallOtherAdditionalCoverage").is(':visible')).toBeTruthy();
                                        spyOnEvent('#EPKGSmallOtherAdditionalCoverage', 'click');
                                        $('#EPKGSmallOtherAdditionalCoverage').click();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGSmallOtherAdditionalCoverage');
                                        expect($('#EPKGSmallOtherAdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Check Small Animals Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGBirdsFishAdditionalCoverage").is(':checked') == true &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))') }).length == 1 &&
                                            $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))')").closest('.lobRow').find('.limitColumn span').html().trim() == "$25,000"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        //CHECK OPTION CHANGES
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Domestic Birds/Fish)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))') }).length ).toEqual(1);
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$200");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$5,600");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$5,600");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                        expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                        expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$168.00");
                                        expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                        expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$11.20");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$5,794.20");

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Select Farm Animals Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGFarmAnimalsAdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGFarmAnimalsAdditionalCoverage").is(':visible')).toBeTruthy();
                                        spyOnEvent('#EPKGFarmAnimalsAdditionalCoverage', 'click');
                                        $('#EPKGFarmAnimalsAdditionalCoverage').click();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGFarmAnimalsAdditionalCoverage');
                                        expect($('#EPKGFarmAnimalsAdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Check Farm Animals Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGBirdsFishAdditionalCoverage").is(':checked') == true &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Farm Animals)') }).length == 1 &&
                                            $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Farm Animals)')").closest('.lobRow').find('.limitColumn span').html().trim() == "$25,000"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        //CHECK OPTION CHANGES
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Domestic Birds/Fish)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Farm Animals)') }).length ).toEqual(1);
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Farm Animals)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Farm Animals)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$250");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Farm Animals)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$5,850");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$5,850");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                        expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                        expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$175.50");
                                        expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                        expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$11.70");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$6,052.20");

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Select Wild Cats Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGWildCatsAdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGWildCatsAdditionalCoverage").is(':visible')).toBeTruthy();
                                        spyOnEvent('#EPKGWildCatsAdditionalCoverage', 'click');
                                        $('#EPKGWildCatsAdditionalCoverage').click();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGWildCatsAdditionalCoverage');
                                        expect($('#EPKGWildCatsAdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Check Wild Cats Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGBirdsFishAdditionalCoverage").is(':checked') == true &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Wild Cats (Caged))') }).length == 1 &&
                                            $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Wild Cats (Caged))')").closest('.lobRow').find('.limitColumn span').html().trim() == "$25,000"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        //CHECK OPTION CHANGES
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Domestic Birds/Fish)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Farm Animals)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Wild Cats (Caged))') }).length ).toEqual(1);
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Wild Cats (Caged))')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Wild Cats (Caged))')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$500");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (Wild Cats (Caged))')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$6,350");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$6,350");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                        expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                        expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$190.50");
                                        expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                        expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$12.70");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$6,568.20");

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Select Wild Cats Option', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGOtherReferAdditionalCoverage").is(':visible') == true
                                        )
                                    }
                                    var thenDoThis = function(){
                                        expect($("#EPKGOtherReferAdditionalCoverage").is(':visible')).toBeTruthy();
                                        spyOnEvent('#EPKGOtherReferAdditionalCoverage', 'click');
                                        $('#EPKGOtherReferAdditionalCoverage').click();

                                        expect('click').toHaveBeenTriggeredOn('#EPKGOtherReferAdditionalCoverage');
                                        expect($('#EPKGOtherReferAdditionalCoverage').is(':checked')).toBeTruthy()
                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });

                                it('Check All Other Animals Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                    var waitUntilThisIsTrue = function(){
                                        return (Object.keys(outstandingCalls).length == 0 &&
                                            $("#EPKGBirdsFishAdditionalCoverage").is(':checked') == true &&
                                            $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (All Others - Refer Only)') }).length == 1 &&
                                            $("#step-2 span:contains('Animal Mortality Under Cast Insurance (All Others - Refer Only)')").closest('.lobRow').find('.limitColumn span').html().trim() == "$25,000"
                                        )
                                    }
                                    var thenDoThis = function(){
                                        //CHECK OPTION CHANGES
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Domestic Birds/Fish)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Farm Animals)') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (Wild Cats (Caged))') }).length ).toEqual(1);
                                        expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Animal Mortality Under Cast Insurance (All Others - Refer Only)') }).length ).toEqual(1);

                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (All Others - Refer Only)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (All Others - Refer Only)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("Refer");
                                        expect( $("#step-2 span:contains('Animal Mortality Under Cast Insurance (All Others - Refer Only)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,500");
                                        expect( $("#PIP5PremiumTotal").html().trim() ).toEqual("$6,350");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$6,350");
                                        expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                        expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                        expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$190.50");
                                        expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                        expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$12.70");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                        expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                        expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$6,568.20");

                                        done();
                                    }
                                    waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                                });
                            });

                            it('Check Terms are filled', function() {
                                expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Forms are filled', function() {
                                expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                            });

                            it('Check Broker Fee Input is fillable', function(done) {
                                typeThis('100' , $('#brokerFeeInput'), done)
                            });
                        });
                    });
                });

                describe('Clear Products', function() {
                    it('No Products are selected', function() {
                        $('#coverageCheckboxesDiv input[type=checkbox]').prop('checked', false)
                        $('#coverageCheckboxesDiv input[type=radio]').prop('checked', false)
                        expect( $('#coverageCheckboxesDiv input[type=checkbox]:checked').length ).toEqual(0)
                        expect( $('#coverageCheckboxesDiv input[type=radio]:checked').length ).toEqual(0)
                    });
                });

                describe('Test CPK', function() {
                    describe('Test CPK Options show Correctly', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        describe('Test CPK Options for Under 30 days', function() {
                            it('Set Proposed Effective Date to Today', function() {
                                openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                            });

                            it('Set Proposed Expiration Date to 28 days from today', function() {
                                var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 28)
                                openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                            });

                            it('Check Products, PIP Choice, 4, 5, and CPK, CGL are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                        $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                    )
                                }

                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure CPK is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                        $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                    )
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#CPKInputRadio', 'click');
                                    $('#CPKInputRadio').click();
                                    expect('click').toHaveBeenTriggeredOn('#CPKInputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check Medical and Inc Agg options show for Under 30 days', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#BAIAdditionalCoverage").is(':visible') == false &&
                                        $("#EAIAdditionalCoverage").is(':visible') == false &&
                                        $("#WOSAdditionalCoverage").is(':visible') == false &&
                                        $("#MEDAdditionalCoverage").is(':visible') == true &&
                                        $("#AGGAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);
                        });

                        describe('Test CPK Options for Over 30 days', function() {
                            it('Set Proposed Effective Date to Today', function() {
                                openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                            });

                            it('Set Proposed Expiration Date to 40 days from today', function() {
                                var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 40)
                                openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                            });

                            it('Check WOS, EAI, Medical, Inc Agg options show for Over 30 days', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#BAIAdditionalCoverage").is(':visible') == false &&
                                        $("#EAIAdditionalCoverage").is(':visible') == true &&
                                        $("#WOSAdditionalCoverage").is(':visible') == true &&
                                        $("#MEDAdditionalCoverage").is(':visible') == true &&
                                        $("#AGGAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);
                        });

                        describe('Test CPK Options for Over 60 days', function() {
                            it('Set Proposed Effective Date to Today', function() {
                                openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                            });

                            it('Set Proposed Expiration Date to 90 days from today', function() {
                                var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 90)
                                openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                            });

                            it('Check WOS, EAI, Medical, Inc Agg options show for over 60 days', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#BAIAdditionalCoverage").is(':visible') == true &&
                                        $("#EAIAdditionalCoverage").is(':visible') == true &&
                                        $("#WOSAdditionalCoverage").is(':visible') == true &&
                                        $("#MEDAdditionalCoverage").is(':visible') == true &&
                                        $("#AGGAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);
                        });
                    });

                    describe('Test CPK Rating for $350,000 Under 30 days', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        it('Set Proposed Effective Date to Today', function() {
                            openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                        });

                        it('Set Proposed Expiration Date to 28 days from today', function() {
                            var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 28)
                            openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                        });

                        it('Check Products, PIP Choice, 4, 5, and CPK, CGL are showing', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }

                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Make sure CPK is selected', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                spyOnEvent('#CPKInputRadio', 'click');
                                $('#CPKInputRadio').click();
                                expect('click').toHaveBeenTriggeredOn('#CPKInputRadio');
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                        }, 30000);

                        it('Check Medical and Inc Agg options show for Under 30 days', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == false &&
                                    $("#EAIAdditionalCoverage").is(':visible') == false &&
                                    $("#WOSAdditionalCoverage").is(':visible') == false &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Each Occ, Gen Agg, Products Ops, Personal Adv, Fire Damage, BAI, NOAL LOBs show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length == 1 )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Personal & Advertising Injury') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Fire Damage (Any One Fire)') }).length ).toEqual(1);

                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned & Hired Auto Liability') }).length ).toEqual(1);

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check All Limits are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                        });

                        it('Check All LOB Premiums are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$1,117");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$450");

                        });

                        it('Check All Deductibles are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                        });

                        it('Check coverage Premium is Correct', function() {
                            expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,117");
                            expect( $("#NOAL01PremiumTotal").html().trim() ).toEqual("$450");

                        });

                        it('Check Premium Distribution is Correct', function() {
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,567");
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                        });

                        it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                            expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                            expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$47.01");

                            expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                            expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$3.13");

                            expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                            expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                        });

                        it('Check Total Premium is Correct', function() {
                            expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,632.14");
                        });

                        it('Check Terms are filled', function() {
                            expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Forms are filled', function() {
                            expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Broker Fee Input is fillable', function(done) {
                            typeThis('100' , $('#brokerFeeInput'), done)
                        });

                        it('Check Cost Of Hire input box', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0
                                )
                            }
                            var thenDoThis = function(){
                                typeThis('100000' , $('#costOfHireInput'), done)
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                        });

                        it('Check NOAL Premium updates for Cost Of Hire', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() == "$6,000"

                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$6,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,117");


                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,117");
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$213.51");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.23");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,359.74");
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Med Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#MEDAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#MEDAdditionalCoverage', 'click');
                                $('#MEDAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#MEDAdditionalCoverage');
                                expect($('#MEDAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Med Payments Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length == 1 &&
                                    $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$25");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,142");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,142");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$214.26");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.28");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,385.54");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Inc Agg Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#AGGAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#AGGAdditionalCoverage', 'click');
                                $('#AGGAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#AGGAdditionalCoverage');
                                expect($('#AGGAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Inc Agg Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length == 1 &&
                                    $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$0");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,142");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,142");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$214.26");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.28");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,385.54");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                    });

                    describe('Test CPK Rating for $350,000 Over 30 days', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        it('Set Proposed Effective Date to Today', function() {
                            openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                        });

                        it('Set Proposed Expiration Date to 40 days from today', function() {
                            var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 40)
                            openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                        });

                        it('Check Products, PIP Choice, 4, 5, and CPK, CGL are showing', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }

                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Make sure CPK is selected', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                spyOnEvent('#CPKInputRadio', 'click');
                                $('#CPKInputRadio').click();
                                expect('click').toHaveBeenTriggeredOn('#CPKInputRadio');
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                        }, 30000);

                        it('Check WOS, EAI, Medical, Inc Agg options show for Over 30 days', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == false &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Each Occ, Gen Agg, Products Ops, Personal Adv, Fire Damage, BAI, NOAL LOBs show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length == 1 )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Personal & Advertising Injury') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Fire Damage (Any One Fire)') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Blanket Additional Insured Endorsement') }).length ).toEqual(1);

                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned & Hired Auto Liability') }).length ).toEqual(1);

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check All Limits are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                            expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("");

                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                        });

                        it('Check All LOB Premiums are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$1,134");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$500");

                        });

                        it('Check All Deductibles are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");

                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                        });

                        it('Check coverage Premium is Correct', function() {
                            expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,134");
                            expect( $("#NOAL01PremiumTotal").html().trim() ).toEqual("$500");

                        });

                        it('Check Premium Distribution is Correct', function() {
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,634");
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                        });

                        it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                            expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                            expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$49.02");

                            expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                            expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$3.27");

                            expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                            expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                        });

                        it('Check Total Premium is Correct', function() {
                            expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,701.29");
                        });

                        it('Check Terms are filled', function() {
                            expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Forms are filled', function() {
                            expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Broker Fee Input is fillable', function(done) {
                            typeThis('100' , $('#brokerFeeInput'), done)
                        });

                        it('Check Cost Of Hire input box', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0
                                )
                            }
                            var thenDoThis = function(){
                                typeThis('100000' , $('#costOfHireInput'), done)
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check NOAL Premium updates for Cost Of Hire', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() === "$6,000"

                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$6,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,134");


                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,134");
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$214.02");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.27");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,377.29");
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Med Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#MEDAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#MEDAdditionalCoverage', 'click');
                                $('#MEDAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#MEDAdditionalCoverage');
                                expect($('#MEDAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Med Payments Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length == 1 &&
                                    $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$25");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$214.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.32");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,403.09");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Inc Agg Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#AGGAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#AGGAdditionalCoverage', 'click');
                                $('#AGGAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#AGGAdditionalCoverage');
                                expect($('#AGGAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Inc Agg Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length == 1 &&
                                    $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$0");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$214.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.32");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,403.09");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select WOS Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#WOSAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#WOSAdditionalCoverage', 'click');
                                $('#WOSAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#WOSAdditionalCoverage');
                                expect($('#WOSAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check WOS Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length == 1 &&
                                    $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,259");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,259");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$217.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.52");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,506.29");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select EAI Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#EAIAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#EAIAdditionalCoverage', 'click');
                                $('#EAIAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#EAIAdditionalCoverage');
                                expect($('#EAIAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check EAI Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length == 1 &&
                                    $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,359");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,359");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$220.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.72");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,609.49");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                    });

                    describe('Test CPK Rating for $350,000 Over 60 days', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        it('Set Proposed Effective Date to Today', function() {
                            openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                        });

                        it('Set Proposed Expiration Date to 90 days from today', function() {
                            var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 90)
                            openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                        });

                        it('Check Products, PIP Choice, 4, 5, and CPK, CGL are showing', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }

                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Make sure CPK is selected', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                spyOnEvent('#CPKInputRadio', 'click');
                                $('#CPKInputRadio').click();
                                expect('click').toHaveBeenTriggeredOn('#CPKInputRadio');
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                        }, 30000);

                        it('Check WOS, EAI, Medical, Inc Agg options show for over 60 days', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == true &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Check Each Occ, Gen Agg, Products Ops, Personal Adv, Fire Damage, NOAL LOBs show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length == 1 )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Personal & Advertising Injury') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Fire Damage (Any One Fire)') }).length ).toEqual(1);

                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned & Hired Auto Liability') }).length ).toEqual(1);

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check All Limits are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");

                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                        });

                        it('Check All LOB Premiums are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$1,134");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$500");

                        });

                        it('Check All Deductibles are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                        });

                        it('Check coverage Premium is Correct', function() {
                            expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,134");
                            expect( $("#NOAL01PremiumTotal").html().trim() ).toEqual("$500");

                        });

                        it('Check Premium Distribution is Correct', function() {
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,634");
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                        });

                        it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                            expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                            expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$49.02");

                            expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                            expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$3.27");

                            expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                            expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                        });

                        it('Check Total Premium is Correct', function() {
                            expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,701.29");
                        });

                        it('Check Terms are filled', function() {
                            expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Forms are filled', function() {
                            expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Broker Fee Input is fillable', function(done) {
                            typeThis('100' , $('#brokerFeeInput'), done)
                        });

                        it('Check Cost Of Hire input box', function(done) {
                            //RES
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0
                                )
                            }
                            var thenDoThis = function(){
                                typeThis('100000' , $('#costOfHireInput'), done)
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check NOAL Premium updates for Cost Of Hire', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() == "$6,000"

                                )
                            }

                            var thenDoThis = function(){
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$6,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,134");


                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,134");
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$214.02");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.27");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,377.29");
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Med Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#MEDAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#MEDAdditionalCoverage', 'click');
                                $('#MEDAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#MEDAdditionalCoverage');
                                expect($('#MEDAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Med Payments Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length == 1 &&
                                    $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$25");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$214.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.32");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,403.09");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Inc Agg Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#AGGAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#AGGAdditionalCoverage', 'click');
                                $('#AGGAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#AGGAdditionalCoverage');
                                expect($('#AGGAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Inc Agg Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length == 1 &&
                                    $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$0");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$214.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.32");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,403.09");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select WOS Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#WOSAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#WOSAdditionalCoverage', 'click');
                                $('#WOSAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#WOSAdditionalCoverage');
                                expect($('#WOSAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check WOS Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length == 1 &&
                                    $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,259");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,259");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$217.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.52");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,506.29");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select EAI Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#EAIAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#EAIAdditionalCoverage', 'click');
                                $('#EAIAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#EAIAdditionalCoverage');
                                expect($('#EAIAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check EAI Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length == 1 &&
                                    $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,359");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,359");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$220.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.72");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,609.49");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select BAI Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#BAIAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#BAIAdditionalCoverage', 'click');
                                $('#BAIAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#BAIAdditionalCoverage');
                                expect($('#BAIAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check BAI Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Blanket Additional Insured Endorsement') }).length == 1 &&
                                    $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Blanket Additional Insured Endorsement') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,459");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,459");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$223.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$14.92");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,712.69");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                    });
                });

                describe('Test CGL', function() {
                    describe('Test CGL Options show Correctly', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        describe('Test CGL Options for Under 30 days', function() {
                            it('Set Proposed Effective Date to Today', function() {
                                openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                            });

                            it('Set Proposed Expiration Date to 28 days from today', function() {
                                var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 28)
                                openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                            });

                            it('Check Products, PIP Choice, 4, 5, and CPK, CGL are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                        $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                    )
                                }

                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure CGL is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                        $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                    )
                                }
                                var thenDoThis = function(){
                                    expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                    expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#CGLInputRadio', 'click');
                                    $('#CGLInputRadio').click();
                                    expect('click').toHaveBeenTriggeredOn('#CGLInputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check Medical and Inc Agg options show for Under 30 days', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#BAIAdditionalCoverage").is(':visible') == false &&
                                        $("#EAIAdditionalCoverage").is(':visible') == false &&
                                        $("#WOSAdditionalCoverage").is(':visible') == false &&
                                        $("#MEDAdditionalCoverage").is(':visible') == true &&
                                        $("#AGGAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);
                        });

                        describe('Test CGL Options for Over 30 days', function() {
                            it('Set Proposed Effective Date to Today', function() {
                                openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                            });

                            it('Set Proposed Expiration Date to 40 days from today', function() {
                                var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 40)
                                openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                            });

                            it('Check WOS, EAI, Medical, Inc Agg options show for Over 30 days', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#BAIAdditionalCoverage").is(':visible') == false &&
                                        $("#EAIAdditionalCoverage").is(':visible') == true &&
                                        $("#WOSAdditionalCoverage").is(':visible') == true &&
                                        $("#MEDAdditionalCoverage").is(':visible') == true &&
                                        $("#AGGAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);
                        });

                        describe('Test CGL Options for Over 60 days', function() {
                            it('Set Proposed Effective Date to Today', function() {
                                openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                            });

                            it('Set Proposed Expiration Date to 90 days from today', function() {
                                var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 90)
                                openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                            });

                            it('Check WOS, EAI, Medical, Inc Agg options show for over 60 days', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#BAIAdditionalCoverage").is(':visible') == true &&
                                        $("#EAIAdditionalCoverage").is(':visible') == true &&
                                        $("#WOSAdditionalCoverage").is(':visible') == true &&
                                        $("#MEDAdditionalCoverage").is(':visible') == true &&
                                        $("#AGGAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);
                        });
                    });

                    describe('Test CGL Rating for $350,000 Under 30 days', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        it('Set Proposed Effective Date to Today', function() {
                            openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                        });

                        it('Set Proposed Expiration Date to 28 days from today', function() {
                            var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 28)
                            openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                        });

                        it('Check Products, PIP Choice, 4, 5, and CPK, CGL are showing', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }

                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Make sure CGL is selected', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                spyOnEvent('#CGLInputRadio', 'click');
                                $('#CGLInputRadio').click();
                                expect('click').toHaveBeenTriggeredOn('#CGLInputRadio');
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                        }, 30000);

                        it('Check Medical and Inc Agg options show for Under 30 days', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == false &&
                                    $("#EAIAdditionalCoverage").is(':visible') == false &&
                                    $("#WOSAdditionalCoverage").is(':visible') == false &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Each Occ, Gen Agg, Products Ops, Personal Adv, Fire Damage, BAI, NOAL LOBs show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length == 1 )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Personal & Advertising Injury') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Fire Damage (Any One Fire)') }).length ).toEqual(1);

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check All Limits are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                        });

                        it('Check All LOB Premiums are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$1,117");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                        });

                        it('Check All Deductibles are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                        });

                        it('Check coverage Premium is Correct', function() {
                            expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,117");

                        });

                        it('Check Premium Distribution is Correct', function() {
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,117");
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                        });

                        it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                            expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                            expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$33.51");

                            expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                            expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.23");

                            expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                            expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                        });

                        it('Check Total Premium is Correct', function() {
                            expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,167.74");
                        });

                        xit('Check Terms are filled', function() {
                            expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Forms are filled', function() {
                            expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Broker Fee Input is fillable', function(done) {
                            typeThis('100' , $('#brokerFeeInput'), done)
                        }, 30000);

                        it('Select Med Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#MEDAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#MEDAdditionalCoverage', 'click');
                                $('#MEDAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#MEDAdditionalCoverage');
                                expect($('#MEDAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Med Payments Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length == 1 &&
                                    $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$25");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,142");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,142");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$34.26");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.28");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,193.54");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Inc Agg Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#AGGAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#AGGAdditionalCoverage', 'click');
                                $('#AGGAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#AGGAdditionalCoverage');
                                expect($('#AGGAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Check Inc Agg Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length == 1 &&
                                    $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$0");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,142");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,142");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$34.26");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.28");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,193.54");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                    });

                    describe('Test CGL Rating for $350,000 Over 30 days', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        it('Set Proposed Effective Date to Today', function() {
                            openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                        });

                        it('Set Proposed Expiration Date to 40 days from today', function() {
                            var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 40)
                            openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                        });

                        it('Check WOS, EAI, Medical, Inc Agg options show for Over 30 days', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == false &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Products, PIP Choice, 4, 5, and CPK, CGL are showing', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }

                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Make sure CGL is selected', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                spyOnEvent('#CGLInputRadio', 'click');
                                $('#CGLInputRadio').click();
                                expect('click').toHaveBeenTriggeredOn('#CGLInputRadio');
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                        }, 30000);

                        it('Check Each Occ, Gen Agg, Products Ops, Personal Adv, Fire Damage, BAI, NOAL LOBs show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length == 1 )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Personal & Advertising Injury') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Fire Damage (Any One Fire)') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Blanket Additional Insured Endorsement') }).length ).toEqual(1);

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check All Limits are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                            expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("");
                        });

                        it('Check All LOB Premiums are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$1,134");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                        });

                        it('Check All Deductibles are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");

                        });

                        it('Check coverage Premium is Correct', function() {
                            expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,134");

                        });

                        it('Check Premium Distribution is Correct', function() {
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,134");
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                        });

                        it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                            expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                            expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$34.02");

                            expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                            expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.27");

                            expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                            expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                        });

                        it('Check Total Premium is Correct', function() {
                            expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,185.29");
                        });

                        xit('Check Terms are filled', function() {
                            expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Forms are filled', function() {
                            expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Broker Fee Input is fillable', function(done) {
                            typeThis('100' , $('#brokerFeeInput'), done)
                        });

                        it('Select Med Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#MEDAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#MEDAdditionalCoverage', 'click');
                                $('#MEDAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#MEDAdditionalCoverage');
                                expect($('#MEDAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Med Payments Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length == 1 &&
                                    $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$25");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$34.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.32");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,211.09");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Inc Agg Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#AGGAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#AGGAdditionalCoverage', 'click');
                                $('#AGGAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#AGGAdditionalCoverage');
                                expect($('#AGGAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Inc Agg Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length == 1 &&
                                    $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$0");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$34.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.32");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,211.09");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select WOS Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#WOSAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#WOSAdditionalCoverage', 'click');
                                $('#WOSAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#WOSAdditionalCoverage');
                                expect($('#WOSAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check WOS Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length == 1 &&
                                    $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,259");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,259");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$37.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.52");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,314.29");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select EAI Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#EAIAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#EAIAdditionalCoverage', 'click');
                                $('#EAIAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#EAIAdditionalCoverage');
                                expect($('#EAIAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check EAI Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length == 1 &&
                                    $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,359");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,359");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$40.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.72");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,417.49");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                    });

                    describe('Test CGL Rating for $350,000 Over 60 days', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        it('Set Proposed Effective Date to Today', function() {
                            openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                        });

                        it('Set Proposed Expiration Date to 90 days from today', function() {
                            var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 90)
                            openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                        });

                        it('Check Products, PIP Choice, 4, 5, and CPK, CGL are showing', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }

                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Check WOS, EAI, Medical, Inc Agg options show for over 60 days', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == true &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Make sure CGL is selected', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#PIPChoiceInputRadio').is(':visible') && $('#PIP4InputRadio').is(':visible') && $('#PIP5InputRadio').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }
                            var thenDoThis = function(){
                                expect($('#PIPChoiceInputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP1InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP2InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP3InputRadio').is(':visible')).toBeFalsy();
                                expect($('#PIP4InputRadio').is(':visible')).toBeTruthy();
                                expect($('#PIP5InputRadio').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                spyOnEvent('#CGLInputRadio', 'click');
                                $('#CGLInputRadio').click();
                                expect('click').toHaveBeenTriggeredOn('#CGLInputRadio');
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                        }, 30000);

                        it('Check Each Occ, Gen Agg, Products Ops, Personal Adv, Fire Damage, NOAL LOBs show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length == 1 )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Personal & Advertising Injury') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Fire Damage (Any One Fire)') }).length ).toEqual(1);

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check All Limits are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                        });

                        it('Check All LOB Premiums are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$1,134");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                        });

                        it('Check All Deductibles are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                        });

                        it('Check coverage Premium is Correct', function() {
                            expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,134");

                        });

                        it('Check Premium Distribution is Correct', function() {
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,134");
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                        });

                        it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                            expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                            expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$34.02");

                            expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                            expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.27");

                            expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                            expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                        });

                        it('Check Total Premium is Correct', function() {
                            expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,185.29");
                        });

                        xit('Check Terms are filled', function() {
                            expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Forms are filled', function() {
                            expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Broker Fee Input is fillable', function(done) {
                            typeThis('100' , $('#brokerFeeInput'), done)
                        });

                        it('Select Med Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#MEDAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#MEDAdditionalCoverage', 'click');
                                $('#MEDAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#MEDAdditionalCoverage');
                                expect($('#MEDAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Med Payments Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length == 1 &&
                                    $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$25");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$34.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.32");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,211.09");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Inc Agg Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#AGGAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#AGGAdditionalCoverage', 'click');
                                $('#AGGAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#AGGAdditionalCoverage');
                                expect($('#AGGAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Inc Agg Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length == 1 &&
                                    $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$0");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,159");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$34.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.32");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,211.09");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select WOS Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#WOSAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#WOSAdditionalCoverage', 'click');
                                $('#WOSAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#WOSAdditionalCoverage');
                                expect($('#WOSAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check WOS Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length == 1 &&
                                    $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,259");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,259");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$37.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.52");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,314.29");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select EAI Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#EAIAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#EAIAdditionalCoverage', 'click');
                                $('#EAIAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#EAIAdditionalCoverage');
                                expect($('#EAIAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check EAI Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length == 1 &&
                                    $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,359");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,359");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$40.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.72");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,417.49");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select BAI Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#BAIAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#BAIAdditionalCoverage', 'click');
                                $('#BAIAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#BAIAdditionalCoverage');
                                expect($('#BAIAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check BAI Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Blanket Additional Insured Endorsement') }).length == 1 &&
                                    $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Blanket Additional Insured Endorsement') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,459");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial General Liability') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,459");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial General Liability')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$43.77");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$2.92");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$1,520.69");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                    });
                });
            });

            describe('Test Film Projects With Cast NO Work Comp', function() {
                beforeAll(function (){
                    //OPEN FIRST CARD TO SET UP NEXT TEST
                    goBackToNewSubmissionStep1();
                    openRiskCategoryCardDrawer("Film Producer")
                });

                describe('Click Film Projects w/ Cast NO Work Comp', function() {
                    it('Click Film Projects w/ Cast NO Work Comp and goto Step 2', function() {
                        $('.riskOptionLink').each(function() {
                            if($(this).html() == "Film Projects With Cast (No Work Comp)"){
                                $(this).click();
                                expect($('#proposedEffectiveDate').is(':visible')).toBeTruthy();
                            }
                        });
                    });

                    it('Make sure JS and GSP files have loaded', function(done) {
                        var waitUntilThisIsTrue = function(){
                            return (Object.keys(outstandingCalls).length == 0 &&
                            $('script[src^="/js/forms/specFilm.js"]').length >= 1 && $('#coverageCheckboxesDiv').html().trim().length > 0)
                        }
                        var thenDoThis = function(){
                            expect($('script[src^="/js/forms/specFilm.js"]').length).toBeGreaterThanOrEqual(1);
                            expect($('#coverageCheckboxesDiv').html().trim().length).toBeGreaterThan(0, 'Boo');
                            done();
                        }
                        waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                    }, 30000);

                });

                describe('Check Date Inputs', function() {
                    it('Check datepicker opens', function() {
                        $('#proposedEffectiveDate').datepicker('show');
                        expect($('td.day').first()).not.toBeHidden();
                    });
                    it('Check proposed date is clickable', function() {
                        openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                    });

                    it('Check proposed expiration is clickable', function() {
                        var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 40)
                        openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                    });
                });

                describe('Check Budget Input', function() {
                    it('Check Formatting of Budget', function(done) {
                        typeThisMaskMoney('50000' , $('#totalBudgetConfirm'), done)
                        expect(true).toBeTruthy()
                    });
                });

                describe('Test EPKG37', function() {
                    describe('Test EPKG37 at $500,000', function() {
                        beforeAll(function(done) {
                            typeThis('500000' , $('#totalBudgetConfirm'), done)

                        });
                        it('Make sure EPKG37 is selected ', function(done) {
                            if($('#EPKGcoverage').is(':checked')){
                                expect(true).toBeTruthy()
                                done();
                            }
                            else{
                                spyOnEvent('#EPKGcoverage', 'click');
                                $('#EPKGcoverage').trigger('click');
                                expect('click').toHaveBeenTriggeredOn('#EPKGcoverage');

                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#EPKGcoverage').is(':checked')
                                    )
                                }
                                var thenDoThis = function(){
                                    expect($('#EPKGcoverage').is(':checked')).toBeTruthy();
                                    expect($('#EPKGCASTEssentialAdditionalCoverage').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }

                        }, 30000);
                        it('Check Cast Essential, Civil Auth 100 and Civil Auth over 100 Show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $('#EPKGCASTEssentialAdditionalCoverage').is(':visible') &&
                                $('#EPKGFWCNWCCIVIL100AdditionalCoverage').is(':visible') &&
                                $('#EPKGFWCNWCCIVIL500AdditionalCoverage').is(':visible'))
                            }
                            var thenDoThis = function(){
                                expect($('#EPKGCASTEssentialAdditionalCoverage').is(':visible')).toBeTruthy();
                                expect($('#EPKGFWCNWCCIVIL100AdditionalCoverage').is(':visible')).toBeTruthy();
                                expect($('#EPKGFWCNWCCIVIL500AdditionalCoverage').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                        }, 30000);
                        it('Check Negative Film, Faulty Stock, Misc Rented Equip, Extra Expense, Props, And Third Party LOBs show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length == 1 )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Negative Film & Videotape') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Faulty Stock & Camera Processing') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Miscellaneous Rented Equipment') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned Auto Physical Damage') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Extra Expense') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Props, Sets & Wardrobe') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Third Party Prop Damage Liab') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Office Contents') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Money and Currency') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Furs, Jewelry, Art & Antiques') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Talent and Non Budgeted Costs') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Administrative Costs') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Hardware') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Data and Media') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Electronic Data Extra Expense') }).length ).toEqual(1);

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check All Limits are Correct', function() {
                            expect( $("#step-2 span:contains('Cast Insurance (Up to 10)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                            expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                            expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$500,000");
                            expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$50,000");
                            expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                            expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                            expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                            expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                            expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                            expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");
                            expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$25,000");


                        });

                        it('Check All LOB Premiums are Correct', function() {
                            expect( $("#step-2 span:contains('Cast Insurance (Up to 10)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$5,750");
                            expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                        });

                        it('Check All Deductibles are Correct', function() {
                            expect( $("#step-2 span:contains('Cast Insurance (Up to 10)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$25,000");
                            expect( $("#step-2 span:contains('Negative Film & Videotape')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$5,000");
                            expect( $("#step-2 span:contains('Faulty Stock & Camera Processing')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$5,000");
                            expect( $("#step-2 span:contains('Miscellaneous Rented Equipment')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("$3,500");
                            expect( $("#step-2 span:contains('Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$3,500");
                            expect( $("#step-2 span:contains('Props, Sets & Wardrobe')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                            expect( $("#step-2 span:contains('Third Party Prop Damage Liab')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                            expect( $("#step-2 span:contains('Office Contents')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$1,000");
                            expect( $("#step-2 span:contains('Money and Currency')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                            expect( $("#step-2 span:contains('Furs, Jewelry, Art & Antiques')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                            expect( $("#step-2 span:contains('Talent and Non Budgeted Costs')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                            expect( $("#step-2 span:contains('Administrative Costs')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                            expect( $("#step-2 span:contains('Hardware')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                            expect( $("#step-2 span:contains('Data and Media')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");
                            expect( $("#step-2 span:contains('Electronic Data Extra Expense')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$2,500");

                        });

                        it('Check coverage Premium is Correct', function() {
                            expect( $("#EPKG37PremiumTotal").html().trim() ).toEqual("$5,750");
                        });

                        it('Check Premium Distribution is Correct', function() {
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$5,750");
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("12.5");
                        });

                        it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                            expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                            expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$172.50");

                            expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                            expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$11.50");

                            expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                            expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                        });

                        it('Check Total Premium is Correct', function() {
                            expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$5,949.00");
                        });

                        describe('Testing EPKG37 Options ', function() {
                            it('Select Cast Essential Elements Option', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGCASTEssentialAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect($("#EPKGCASTEssentialAdditionalCoverage").is(':visible')).toBeTruthy();

                                    spyOnEvent('#EPKGCASTEssentialAdditionalCoverage', 'click');
                                    $('#EPKGCASTEssentialAdditionalCoverage').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#EPKGCASTEssentialAdditionalCoverage');
                                    expect($('#EPKGCASTEssentialAdditionalCoverage').is(':checked')).toBeTruthy()
                                    expect($('#castEssentialInput').is(':visible')).toBeTruthy()


                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Input Number of Cast Elements', function(done) {
                                typeThis('5' , $('#castEssentialInput'), done)
                            });

                            it('Check Cast Essential Elements Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGCASTEssentialAdditionalCoverage").is(':checked') == true &&
                                        $("#step-2 span").filter(function() { return ($(this).text() === 'Cast Essential') }).length == 1 &&
                                        $("#step-2 span:contains('Cast Essential')").closest('.lobRow').find('.limitColumn span').html().trim() == "Included Under Cast" &&
                                        $("#step-2 span:contains('Cast Essential')").closest('.lobRow').find('.premiumColumn span').html().trim() == "$17,500"
                                    )
                                }
                                var thenDoThis = function(){
                                    //CHECK OPTION CHANGES
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Cast Essential') }).length ).toEqual(1);
                                    expect( $("#step-2 span:contains('Cast Essential')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included Under Cast");
                                    expect( $("#step-2 span:contains('Cast Essential')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$17,500");
                                    expect( $("#step-2 span:contains('Cast Essential')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                    expect( $("#EPKG37PremiumTotal").html().trim() ).toEqual("$23,250");
                                    expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                    expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$23,250");
                                    expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("12.5");

                                    expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                    expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$697.50");
                                    expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                    expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$46.50");
                                    expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                    expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                    expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$24,009.00");


                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Select Civil Auth 100K Option', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGFWCNWCCIVIL100AdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect($("#EPKGFWCNWCCIVIL100AdditionalCoverage").is(':visible')).toBeTruthy();

                                    spyOnEvent('#EPKGFWCNWCCIVIL100AdditionalCoverage', 'click');
                                    $('#EPKGFWCNWCCIVIL100AdditionalCoverage').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#EPKGFWCNWCCIVIL100AdditionalCoverage');
                                    expect($('#EPKGFWCNWCCIVIL100AdditionalCoverage').is(':checked')).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check Civil Auth 100K Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGFWCNWCCIVIL100AdditionalCoverage").is(':checked') == true &&
                                        $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length == 1 &&
                                        $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.limitColumn span').html().trim() == "$100,000"
                                    )
                                }
                                var thenDoThis = function(){
                                    //CHECK OPTION CHANGES
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length ).toEqual(1);
                                    expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                                    expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$250");
                                    expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$7,000");
                                    expect( $("#EPKG37PremiumTotal").html().trim() ).toEqual("$23,500");
                                    expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                    expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$23,500");
                                    expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("12.5");

                                    expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                    expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$705.00");
                                    expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                    expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$47.00");
                                    expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                    expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                    expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$24,267.00");


                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Select Civil Auth 500K Option', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGFWCNWCCIVIL500AdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect($("#EPKGFWCNWCCIVIL500AdditionalCoverage").is(':visible')).toBeTruthy();

                                    spyOnEvent('#EPKGFWCNWCCIVIL500AdditionalCoverage', 'click');
                                    $('#EPKGFWCNWCCIVIL500AdditionalCoverage').click();
                                    // $('#PIP1InputRadio').focus();

                                    expect('click').toHaveBeenTriggeredOn('#EPKGFWCNWCCIVIL500AdditionalCoverage');
                                    expect($('#EPKGFWCNWCCIVIL500AdditionalCoverage').is(':checked')).toBeTruthy()
                                    expect($('#EPKGFWCNWCCIVIL100AdditionalCoverage').is(':checked')).toBeFalsy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Check Civil Auth 500K Limits, Premium, Deductibles, Totals, Etc', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGFWCNWCCIVIL500AdditionalCoverage").is(':checked') == true &&
                                        $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length == 1 &&
                                        $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.limitColumn span').html().trim() == "$100,000+"
                                    )
                                }
                                var thenDoThis = function(){
                                    //CHECK OPTION CHANGES
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length ).toEqual(1);
                                    expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000+");
                                    expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$550");
                                    expect( $("#step-2 span:contains('Civil Authority (US Only)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("$10,000");
                                    expect( $("#EPKG37PremiumTotal").html().trim() ).toEqual("$23,800");
                                    expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Entertainment Package') }).length ).toEqual(1);
                                    expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$23,800");
                                    expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Entertainment Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("12.5");

                                    expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                    expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$714.00");
                                    expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                    expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$47.60");
                                    expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                    expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                    expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$24,576.60");

                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });

                            it('Clicking Civil Auth 500K twice unchecks option', function(done) {
                                //HACK
                                $('#EPKGFWCNWCCIVIL500AdditionalCoverage').prop('checked', false)
                                $('#EPKGFWCNWCCIVIL500AdditionalCoverage').trigger('change')

                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#EPKGFWCNWCCIVIL500AdditionalCoverage").is(':checked') == false &&
                                        $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length == 0 &&
                                        $("#EPKG37PremiumTotal").html().trim() === "$23,250"
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Civil Authority (US Only)') }).length ).toEqual(0);
                                    expect( $("#EPKG37PremiumTotal").html().trim() ).toEqual("$23,250");
                                    expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$24,009.00");

                                    expect($('#EPKGFWCNWCCIVIL500AdditionalCoverage').is(':checked')).toBeFalsy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            });
                        });


                        afterAll(function(done) {
                            $('#EPKGcoverage').trigger('click');

                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#EPKGcoverage').is(':checked') == false
                                )
                            }
                            var thenDoThis = function(){
                                expect($('#EPKGcoverage').is(':checked')).toBeFalsy();
                                expect($('#EPKGCASTEssentialAdditionalCoverage').is(':visible')).toBeFalsy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });
                    });
                });

                describe('Test CPK', function() {
                    describe('Test CPK Options show Correctly', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        describe('Test CPK Options for Under 30 days', function() {
                            it('Set Proposed Effective Date to Today', function() {
                                openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                            });

                            it('Set Proposed Expiration Date to 28 days from today', function() {
                                var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 28)
                                openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                            });

                            it('Check Products EPKGcoverage and CPK, CGL are showing', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#EPKGcoverage').is(':visible') &&
                                        $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                    )
                                }

                                var thenDoThis = function(){
                                    expect($('#EPKGcoverage').is(':visible')).toBeTruthy();
                                    expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);

                            it('Make sure CPK is selected', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $('#EPKGcoverage').is(':visible') &&
                                        $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                    )
                                }
                                var thenDoThis = function(){
                                    expect($('#EPKGcoverage').is(':visible')).toBeTruthy();
                                    expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                    expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                    spyOnEvent('#CPKInputRadio', 'click');
                                    $('#CPKInputRadio').click();
                                    expect('click').toHaveBeenTriggeredOn('#CPKInputRadio');
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                            }, 30000);

                            it('Check Medical and Inc Agg options show for Under 30 days', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#BAIAdditionalCoverage").is(':visible') == false &&
                                        $("#EAIAdditionalCoverage").is(':visible') == false &&
                                        $("#WOSAdditionalCoverage").is(':visible') == false &&
                                        $("#MEDAdditionalCoverage").is(':visible') == true &&
                                        $("#AGGAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);
                        });

                        describe('Test CPK Options for Over 30 days', function() {
                            it('Set Proposed Effective Date to Today', function() {
                                openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                            });

                            it('Set Proposed Expiration Date to 40 days from today', function() {
                                var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 40)
                                openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                            });

                            it('Check WOS, EAI, Medical, Inc Agg options show for Over 30 days', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#BAIAdditionalCoverage").is(':visible') == false &&
                                        $("#EAIAdditionalCoverage").is(':visible') == true &&
                                        $("#WOSAdditionalCoverage").is(':visible') == true &&
                                        $("#MEDAdditionalCoverage").is(':visible') == true &&
                                        $("#AGGAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                    expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);
                        });

                        describe('Test CPK Options for Over 60 days', function() {
                            it('Set Proposed Effective Date to Today', function() {
                                openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                            });

                            it('Set Proposed Expiration Date to 90 days from today', function() {
                                var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 90)
                                openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                            });

                            it('Check WOS, EAI, Medical, Inc Agg options show for over 60 days', function(done) {
                                var waitUntilThisIsTrue = function(){
                                    return (Object.keys(outstandingCalls).length == 0 &&
                                        $("#BAIAdditionalCoverage").is(':visible') == true &&
                                        $("#EAIAdditionalCoverage").is(':visible') == true &&
                                        $("#WOSAdditionalCoverage").is(':visible') == true &&
                                        $("#MEDAdditionalCoverage").is(':visible') == true &&
                                        $("#AGGAdditionalCoverage").is(':visible') == true
                                    )
                                }
                                var thenDoThis = function(){
                                    expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                    done();
                                }
                                waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                            }, 30000);
                        });
                    });

                    describe('Test CPK Rating for $350,000 Under 30 days', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        it('Set Proposed Effective Date to Today', function() {
                            openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                        });

                        it('Set Proposed Expiration Date to 28 days from today', function() {
                            var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 28)
                            openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                        });

                        it('Check Products EPKG37 and CPK, CGL are showing', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#EPKGcoverage').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }

                            var thenDoThis = function(){
                                expect($('#EPKGcoverage').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Make sure CPK is selected', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#EPKGcoverage').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }
                            var thenDoThis = function(){
                                expect($('#EPKGcoverage').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                spyOnEvent('#CPKInputRadio', 'click');
                                $('#CPKInputRadio').click();
                                expect('click').toHaveBeenTriggeredOn('#CPKInputRadio');
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                        }, 30000);

                        it('Check Medical and Inc Agg options show for Under 30 days', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == false &&
                                    $("#EAIAdditionalCoverage").is(':visible') == false &&
                                    $("#WOSAdditionalCoverage").is(':visible') == false &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Each Occ, Gen Agg, Products Ops, Personal Adv, Fire Damage, BAI, NOAL LOBs show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length == 1 )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Personal & Advertising Injury') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Fire Damage (Any One Fire)') }).length ).toEqual(1);

                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned & Hired Auto Liability') }).length ).toEqual(1);

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check All Limits are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                        });

                        it('Check All LOB Premiums are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$1,500");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$450");

                        });

                        it('Check All Deductibles are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                        });

                        it('Check coverage Premium is Correct', function() {
                            expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,500");
                            expect( $("#NOAL01PremiumTotal").html().trim() ).toEqual("$450");

                        });

                        it('Check Premium Distribution is Correct', function() {
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$1,950");
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                        });

                        it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                            expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                            expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$58.50");

                            expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                            expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$3.90");

                            expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                            expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                        });

                        it('Check Total Premium is Correct', function() {
                            expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$2,027.40");
                        });

                        it('Check Terms are filled', function() {
                            expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Forms are filled', function() {
                            expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Broker Fee Input is fillable', function(done) {
                            typeThis('100' , $('#brokerFeeInput'), done)
                        });

                        it('Check Cost Of Hire input box', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0
                                )
                            }
                            var thenDoThis = function(){
                                typeThis('100000' , $('#costOfHireInput'), done)
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);

                        });

                        it('Check NOAL Premium updates for Cost Of Hire', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() == "$6,000"

                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$6,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,500");


                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,500");
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$225.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,755.00");
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Med Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#MEDAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#MEDAdditionalCoverage', 'click');
                                $('#MEDAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#MEDAdditionalCoverage');
                                expect($('#MEDAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Med Payments Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length == 1 &&
                                    $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$25");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,525");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,525");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$225.75");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$15.05");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,780.80");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Inc Agg Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#AGGAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#AGGAdditionalCoverage', 'click');
                                $('#AGGAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#AGGAdditionalCoverage');
                                expect($('#AGGAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Inc Agg Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length == 1 &&
                                    $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$0");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,525");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,525");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$225.75");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$15.05");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,780.80");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                    });

                    describe('Test CPK Rating for $350,000 Over 30 days', function() {
                        beforeAll(function(done) {
                            typeThis('350000{{tab}}' , $('#totalBudgetConfirm'), done)
                        });

                        it('Set Proposed Effective Date to Today', function() {
                            openDatePickerAndClickDate($('#proposedEffectiveDate'), getTodaysDateFormatted())
                        });

                        it('Set Proposed Expiration Date to 40 days from today', function() {
                            var date = getFormattedDateXDaysAfterDate(getTodaysDateFormatted(), 40)
                            openDatePickerAndClickDate($('#proposedExpirationDate'), date)
                        });

                        it('Check Products EPKG37 and CPK, CGL are showing', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#EPKGcoverage').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }

                            var thenDoThis = function(){
                                expect($('#EPKGcoverage').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Make sure CPK is selected', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $('#EPKGcoverage').is(':visible') &&
                                    $('#CPKInputRadio').is(':visible') && $('#CGLInputRadio').is(':visible')
                                )
                            }
                            var thenDoThis = function(){
                                expect($('#EPKGcoverage').is(':visible')).toBeTruthy();
                                expect($('#CPKInputRadio').is(':visible')).toBeTruthy();
                                expect($('#CGLInputRadio').is(':visible')).toBeTruthy();

                                spyOnEvent('#CPKInputRadio', 'click');
                                $('#CPKInputRadio').click();
                                expect('click').toHaveBeenTriggeredOn('#CPKInputRadio');
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);


                        }, 30000);

                        it('Check WOS, EAI, Medical, Inc Agg options show for Over 30 days', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#BAIAdditionalCoverage").is(':visible') == false &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#BAIAdditionalCoverage").is(':visible') ).toBeFalsy()
                                expect( $("#EAIAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#WOSAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#MEDAdditionalCoverage").is(':visible') ).toBeTruthy()
                                expect( $("#AGGAdditionalCoverage").is(':visible') ).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Each Occ, Gen Agg, Products Ops, Personal Adv, Fire Damage, BAI, NOAL LOBs show', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length == 1 &&
                                $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length == 1 )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Each Occurrence') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'General Aggregate Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Products & Completed Operations') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Personal & Advertising Injury') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Fire Damage (Any One Fire)') }).length ).toEqual(1);
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Blanket Additional Insured Endorsement') }).length ).toEqual(1);

                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Non-Owned & Hired Auto Liability') }).length ).toEqual(1);

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check All Limits are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.limitColumn span').eq(0).html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$100,000");
                            expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("");

                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                        });

                        it('Check All LOB Premiums are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$1,500");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.premiumColumn span').eq(0).html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");
                            expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("incl");

                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$500");

                        });

                        it('Check All Deductibles are Correct', function() {
                            expect( $("#step-2 span:contains('Each Occurrence')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('General Aggregate Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Products & Completed Operations')").closest('.lobRow').find('.deductibleColumn span').eq(0).html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Personal & Advertising Injury')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Fire Damage (Any One Fire)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                            expect( $("#step-2 span:contains('Blanket Additional Insured Endorsement')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");

                            expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                        });

                        it('Check coverage Premium is Correct', function() {
                            expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,500");
                            expect( $("#NOAL01PremiumTotal").html().trim() ).toEqual("$500");

                        });

                        it('Check Premium Distribution is Correct', function() {
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$2,000");
                            expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");
                        });

                        it('Check Taxes and Fees is Correct (Default CA, have not selected state yet)', function() {
                            expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                            expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$60.00");

                            expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                            expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$4.00");

                            expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                            expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                        });

                        it('Check Total Premium is Correct', function() {
                            expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$2,079.00");
                        });

                        it('Check Terms are filled', function() {
                            expect( $("#termsInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Forms are filled', function() {
                            expect( $("#endorseInsert").html().trim().length ).toBeGreaterThan(10);
                        });

                        it('Check Broker Fee Input is fillable', function(done) {
                            typeThis('100' , $('#brokerFeeInput'), done)
                        });

                        it('Check Cost Of Hire input box', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0
                                )
                            }
                            var thenDoThis = function(){
                                typeThis('100000' , $('#costOfHireInput'), done)
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check NOAL Premium updates for Cost Of Hire', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() === "$6,000"

                                )
                            }
                            var thenDoThis = function(){
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$1,000,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$6,000");
                                expect( $("#step-2 span:contains('Non-Owned & Hired Auto Liability')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");

                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,500");


                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,500");
                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$225.00");

                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,755.00");
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Med Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#MEDAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#MEDAdditionalCoverage', 'click');
                                $('#MEDAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#MEDAdditionalCoverage');
                                expect($('#MEDAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Med Payments Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#MEDAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length == 1 &&
                                    $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Medical Payments (Per Person)') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$25");
                                expect( $("#step-2 span:contains('Medical Payments (Per Person)')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("Nil");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,525");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,525");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$225.75");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$15.05");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,780.80");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select Inc Agg Payments Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#AGGAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#AGGAdditionalCoverage', 'click');
                                $('#AGGAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#AGGAdditionalCoverage');
                                expect($('#AGGAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check Inc Agg Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#AGGAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length == 1 &&
                                    $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Increased Agg Limit') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$0");
                                expect( $("#step-2 span:contains('Increased Agg Limit')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,525");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,525");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$225.75");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$15.05");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,780.80");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select WOS Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#WOSAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#WOSAdditionalCoverage', 'click');
                                $('#WOSAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#WOSAdditionalCoverage');
                                expect($('#WOSAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check WOS Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#WOSAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length == 1 &&
                                    $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() === "Included"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Waiver of Subrogation') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("Included");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Waiver of Subrogation')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,625");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,625");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$228.75");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$15.25");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,884.00");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                        it('Select EAI Option', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':visible') == true
                                )
                            }
                            var thenDoThis = function(){
                                expect($("#EAIAdditionalCoverage").is(':visible')).toBeTruthy();

                                spyOnEvent('#EAIAdditionalCoverage', 'click');
                                $('#EAIAdditionalCoverage').click();
                                // $('#PIP1InputRadio').focus();

                                expect('click').toHaveBeenTriggeredOn('#EAIAdditionalCoverage');
                                expect($('#EAIAdditionalCoverage').is(':checked')).toBeTruthy()
                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        });

                        it('Check EAI Limits, Premium, Deductibles, Totals, Etc', function(done) {
                            var waitUntilThisIsTrue = function(){
                                return (Object.keys(outstandingCalls).length == 0 &&
                                    $("#EAIAdditionalCoverage").is(':checked') == true &&
                                    $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length == 1 &&
                                    $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() === "$5,000"
                                )
                            }
                            var thenDoThis = function(){
                                //CHECK OPTION CHANGES
                                expect( $("#step-2 span").filter(function() { return ($(this).text() === 'Additional Charge to Include Medical Payments') }).length ).toEqual(1);
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.limitColumn span').html().trim() ).toEqual("$5,000");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.premiumColumn span').html().trim() ).toEqual("$100");
                                expect( $("#step-2 span:contains('Additional Charge to Include Medical Payments')").closest('.lobRow').find('.deductibleColumn span').html().trim() ).toEqual("");
                                expect( $("#BARCPKGCPremiumTotal").html().trim() ).toEqual("$1,725");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan").filter(function() { return ($(this).text() === 'Commercial Package') }).length ).toEqual(1);
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.premiumSpan').html().trim() ).toEqual("$7,725");
                                expect( $("#step-2 #premDistributionInsert .lineOfBusinessSpan:contains('Commercial Package')").closest('.row').find('.agentPercentSpan').html().trim() ).toEqual("15");

                                expect( $("#step-2 .SLTTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Surplus Lines Tax(0.03)");
                                expect( $("#step-2 .SLTTaxRow .taxSpan").html().trim() ).toEqual("$231.75");
                                expect( $("#step-2 .SOFTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Stamping Office Fee(0.002)");
                                expect( $("#step-2 .SOFTaxRow .taxSpan").html().trim() ).toEqual("$15.45");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxDescriptionSpan").html().trim() ).toEqual("Policy Fee");
                                expect( $("#step-2 .PolicyFeeTaxRow .taxSpan").html().trim() ).toEqual("$15.00");

                                expect( $("#step-2 #premiumAllLOBTotal").html().trim() ).toEqual("$7,987.20");

                                done();
                            }
                            waitUntilThisThenDoThis(waitUntilThisIsTrue, thenDoThis);
                        }, 30000);

                    });

                });
            });




        });



    });






    afterAll(function(){
        $("body").css("pointer-events", "auto");
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
function loadSpecFilm(done){

}
function loadSGPFilm(done){

}


