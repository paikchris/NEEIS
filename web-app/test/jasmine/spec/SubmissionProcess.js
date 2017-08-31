var fixture;
var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

describe('Testing Film Projects Without Cast (No Work Comp)', function() {
    // jasmine.getFixtures().fixturesPath = 'http://104.236.23.128:8080/test/jasmine/spec/fixtures/javascripts';

    beforeAll(function (done) {
        //JS FILES TO LOAD FOR TEST
        var jsFiles = [
            '/js/newSubmission.js'
        ];
        loadURLForTest('./../main/newSubmission', '#page-content-wrapper', jsFiles, done);
    });

    it('is ready to be tested (products load for risk type)', function(done) {
        clickThis($('.card')[0]);

        $('.riskOptionLink').each(function() {
            if($(this).html() == "Film Projects Without Cast (No Work Comp)"){
                clickThis(this);
                waitUntilThisExistsThenExpectThis('#PIPChoiceInputRadio', function() {
                    expect('#PIPChoiceInputRadio').toBeInDOM();
                }, done);
            }
        });
    });

    it('Proposed Effective Click, wait for datepicker to show', function(done) {
        //Check Drawer can be clicked

        waitUntilThisIsVisible('#proposedEffectiveDate', done);

        clickThis('#proposedEffectiveDate');

        waitUntilThisIsVisible('td.day', done);

    });

    it('Datepicker,click todays date, prints todays date', function(done) {
        //Get and format today's date
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var year = d.getFullYear();

        //Format date
        if (day < 10) { day = '0' + day; }
        if (month < 10) { month = '0' + month; }
        var dateTodayFormatted =  month + '/' + day + '/' + year;

        waitUntilThisExistsThenExpectThis('td.day', function(){
            $('td.day').not(".old").each(function (){
                if(parseInt($(this).html()) >= day){
                    //CLICK TODAYS DATE
                    // $(this).click();
                    clickThis(this);
                    return false;
                }
            });
        },done);
    });

    it('Proposed Expiration Click, wait for datepicker to show', function(done) {
        //Check Drawer can be clicked
        // spyOnEvent('#proposedExpirationDate', 'click');

        waitUntilThisIsVisibleThenExpectThis('#proposedExpirationDate', function(){
            clickThis('#proposedExpirationDate');
        },done);

        waitUntilThisExistsThenExpectThis('td.day', function(){
            //CHECK DATEPICKER IS VISIBLE
            expect($('td.day').first()).not.toBeHidden();
        }, done);
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

        waitUntilThisExistsThenExpectThis('td.day', function(){
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
      }, done);
    });

    it('type 30 into proposed term length', function(done) {

        typeThisThenExpectThat('30', '#proposedTermLength', function(){
            expect($('#proposedTermLength').val()).toEqual('30 Days');
        }, done);

    });

    it('type 100000 into Total Budget and is formatted as $100,000', function(done) {

        typeThisThenExpectThat("100000", '#totalBudgetConfirm', function(){
            expect($('#totalBudgetConfirm').val()).toEqual('$100,000');
        }, done);

    });

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

    describe('PIPCHOICE Premiums are correct', function() {
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
        it('Change Misc Equip Limits and check premiums', function(done) {
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
                            done();
                        }).autotype("50000", {delay: 10});

                    }
                };
                checkCondition();
            });
        it('Change Extra Expense Limits and check premiums', function(done) {
                //Wait till animation Finishes
                var POLL_TIME = 10;
                var endTime = new Date().getTime() + 1000;
                var checkCondition = function() {
                    if (new Date().getTime() <= endTime) {
                        setTimeout(checkCondition, POLL_TIME);
                    } else {
                        $('.PIPCHOILimitsInput.ExtraExpense').val('')
                        $('.ExtraExpense').bind('autotyped', function(){
                            expect($('.PIPCHOILimitsInput.ExtraExpense').val()).toEqual('$500,000');
                            expect($('.PIPCHOILimitsInput.ExtraExpense').closest('.EPKG_LOBRow').find('.PIPCHOIPremiumLine').html().trim()).toEqual('$411');

                            done();
                        }).autotype("500000", {delay: 10});

                    }
                };
                checkCondition();
            });
    });


    it('Click Next, to enter Insured Info', function() {
        clickThis('#nextButtonStep2');
    });

    it('Enter name of Insured', function(done) {
        var name = chance.string({length: 5});

        typeThisThenExpectThat(name, '#namedInsured', function(){
            $('#phoneNumber').focus();
            expect($('#namedInsured').val()).toEqual( capitalizeFirstLetters(name) );
        },done);
    });

    it('Enter phonenumber', function(done) {

        typeThisThenExpectThat('7038555432', '#phoneNumber', function(){
            $('#namedInsuredEmail').focus();
            expect($('#phoneNumber').val()).toEqual('(703) 855-5432');
        },done);
    });

    it('Enter email', function(done) {
        var email = chance.email();
        typeThisThenExpectThat(email, '#namedInsuredEmail', function(){
            $('#website').focus();
            expect($('#namedInsuredEmail').val()).toEqual(email);
        },done);
    });

    it('Enter website', function(done) {
        var website = chance.url();
        typeThisThenExpectThat(website, '#website', function(){
            $('#namedInsured').focus();
            expect($('#website').val()).toEqual(website);
        },done);
    });

    it('Enter street address', function(done) {
        var address = chance.address();
        typeThisThenExpectThat(address, '#googleAutoAddress', function(){
            expect($('#googleAutoAddress').val()).toEqual(address);
        },done);
    });

    it('Enter city', function(done) {
        var city = chance.city();
        typeThisThenExpectThat(city, '#cityMailing', function(){
            expect($('#cityMailing').val()).toEqual(city);
        },done);
    });

    it('Enter zipcode', function(done) {
        var zip = chance.zip();
        typeThisThenExpectThat(zip, '#zipCodeMailing', function(){
            $('#namedInsured').focus();
            expect($('#zipCodeMailing').val()).toEqual(zip);
        },done);
    });

    it('Enter State', function() {
        var state = chance.state();
        $('#stateMailing').val(state);
        $('#stateMailing').trigger('change');
        expect($('#stateMailing').val()).toEqual(state);
    });

    it('TODO: CHECK BOR', function() {
        var namedInsured = $('#namedInsured').val();
        expect($('#nameOfProductionCompany').val()).toEqual(namedInsured);
    });

    it('Check Production Company by default is the same as namedInsured', function() {
        var namedInsured = $('#namedInsured').val();
        expect($('#nameOfProductionCompany').val()).toEqual(namedInsured);
    });

    it('Enter titleOfProduction', function(done) {
        var string = chance.string({length: 10});
        typeThis(string, '#titleOfProduction',done);
        expect(true).toBe(true);
    });

    it('Enter is this a reshoot', function() {
        var reshoot = chance.bool();
        var yesOrNo ="";
        if(reshoot){
            yesOrNo = "Yes";
        }
        else{
            yesOrNo = "No";
        }
        $("input[name=isReshootRadio][value=" + yesOrNo + "]").attr('checked', 'checked');
        $("input[name=isReshootRadio][value=" + yesOrNo + "]").trigger('change');

        expect(true).toBe(true);
    });

    it('Enter name of principal', function(done) {
        var string = chance.name();
        typeThis(string, '#nameOfPrincipal',done);
        expect(true).toBe(true);
    });

    it('Enter name of numberOfYearsOfExperience', function(done) {
        var string = chance.string();
        typeThis(string, '#numberOfYearsOfExperience',done);
        expect(true).toBe(true);
    });

    it('Enter name of listOfPriorLosses', function(done) {
        var string = chance.string();
        typeThis(string, '#listOfPriorLosses',done);
        expect(true).toBe(true);
    });

    it('Enter name of maxCostOneProduction', function(done) {
        var string = chance.string();
        typeThis(string, '#maxCostOneProduction',done);
        expect(true).toBe(true);
    });

    it('Check production type ', function() {
        var string = chance.string();

        for(var i = 0; i < $("input.productionTypeCheckbox").length; i++){
            var check = chance.bool();
            $("input.productionTypeCheckbox").eq(i).prop('checked', check);

        }
        expect(true).toBe(true);
    });

    it('Verify budgets match', function() {
        expect($('#totalBudgetConfirm').val()).toEqual($('#totalBudgetInput').val());
    });

    it('Verify dates match', function() {
        expect($('#principalPhotographyDateStart').val()).toEqual($('#proposedEffectiveDate').val());
        expect($('#principalPhotographyDateEnd').val()).toEqual($('#proposedExpirationDate').val());

    });

    it('Enter name of producer', function(done) {
        var string = chance.string();
        typeThis(string, '#producer',done);
        expect(true).toBe(true);
    });

    it('Enter name of director', function(done) {
        var string = chance.string();
        typeThis(string, '#director',done);
        expect(true).toBe(true);
    });

    it('Enter completionBondRequired', function() {
        var completionBondRequired = chance.bool();
        var yesOrNo ="";
        if(completionBondRequired){
            yesOrNo = "Yes";
        }
        else{
            yesOrNo = "No";
        }
        $("input[name=completionBondRequired][value=" + yesOrNo + "]").attr('checked', 'checked');
        $("input[name=completionBondRequired][value=" + yesOrNo + "]").trigger('change');

        expect(true).toBe(true);
    });

    it('Enter story', function(done) {
        var string = chance.sentence();
        typeThis(string, '#story',done);
        expect(true).toBe(true);
    });

    it('Enter numberProductions', function() {
        var string = chance.integer({min: 0, max: 5});
        $('#numberProductions').val(string);
        expect(true).toBe(true);
    });

    it('Enter projectsOutsideUS', function(done) {
        var string = chance.string();
        typeThis(string, '#projectsOutsideUS',done);
        expect(true).toBe(true);
    });

    it('Enter totalNumEmployees', function(done) {
        var string = chance.string();
        typeThis(string, '#totalNumEmployees',done);
        expect(true).toBe(true);
    });

    it('Enter annualPayroll', function(done) {
        var string = chance.sentence();
        typeThis(string, '#annualPayroll',done);
        expect(true).toBe(true);
    });

    it('Enter umbrellaLimitRequested', function(done) {
        var string = chance.string();
        typeThis(string, '#umbrellaLimitRequested',done);
        expect(true).toBe(true);
    });

    it('Check primaryWorkCompCoverage', function() {
        var primaryWorkCompCoverage = chance.bool();
        var yesOrNo ="";
        if(primaryWorkCompCoverage){
            yesOrNo = "Yes";
        }
        else{
            yesOrNo = "No";
        }
        $("input[name=primaryWorkCompCoverage][value=" + yesOrNo + "]").attr('checked', 'checked');
        $("input[name=primaryWorkCompCoverage][value=" + yesOrNo + "]").trigger('change');
        expect(true).toBe(true);
    });

    it('Check productionInvolvesCheckbox ', function() {
        var string = chance.string();

        for(var i = 0; i < $("input.productionInvolvesCheckbox").length; i++){
            var check = chance.bool();
            $("input.productionInvolvesCheckbox").eq(i).prop('checked', check);
        }
        expect(true).toBe(true);
    });

    it('Check postProductionForOthers', function() {
        var postProductionForOthers = chance.bool();
        var yesOrNo ="";
        if(postProductionForOthers){
            yesOrNo = "Yes";
        }
        else{
            yesOrNo = "No";
        }
        $("input[name=postProductionForOthers][value=" + yesOrNo + "]").attr('checked', 'checked');
        $("input[name=postProductionForOthers][value=" + yesOrNo + "]").trigger('change');







    });

    it('Check insuranceCancelled', function() {
        var insuranceCancelled = chance.bool();
        var yesOrNo ="";
        if(insuranceCancelled){
            yesOrNo = "Yes";
        }
        else{
            yesOrNo = "No";
        }
        $("input[name=insuranceCancelled][value=" + yesOrNo + "]").attr('checked', 'checked');
        $("input[name=insuranceCancelled][value=" + yesOrNo + "]").trigger('change');
        if(yesOrNo === "Yes"){
            expect($('#insuredCancelledExplain')).toBeVisible();
            var string = chance.sentence();
            $('#insuredCancelledExplain').val(string);
        }



        expect(true).toBe(true);
    });

    it('Check equipmentOwnedRented', function() {
        var equipmentOwnedRented = chance.bool();
        var yesOrNo ="";
        if(equipmentOwnedRented){
            yesOrNo = "Yes";
        }
        else{
            yesOrNo = "No";
        }
        $("input[name=equipmentOwnedRented][value=" + yesOrNo + "]").attr('checked', 'checked');
        $("input[name=equipmentOwnedRented][value=" + yesOrNo + "]").trigger('change');

        if(yesOrNo === "Yes"){
            expect($('#equipmentOwned')).toBeVisible();
            expect($('#equipmentRented')).toBeVisible();

            var equipmentOwnedRentedRadio = chance.bool();
            var nextyesOrNo ="";
            if(equipmentOwnedRentedRadio){
                nextyesOrNo = "Owned";
            }
            else{
                nextyesOrNo = "Rented";
            }
            $("input[name=equipmentOwnedRadio][value=" + nextyesOrNo + "]").attr('checked', 'checked');
            $("input[name=equipmentOwnedRadio][value=" + nextyesOrNo + "]").trigger('change');


            expect($('#equipmentLimit')).toBeVisible();
            var integer = chance.integer();
            $('#equipmentLimit').val(integer);

            expect($('#equipmentSchedule')).toBeVisible();
            var string = chance.string();
            $('#equipmentSchedule').val(string);

            expect($('#equipmentLocation')).toBeVisible();
            string = chance.string();
            $('#equipmentLocation').val(string);

            expect($('#equipmentSecurity')).toBeVisible();
            string = chance.string();
            $('#equipmentSecurity').val(string);

            expect($('#equipmentInventory')).toBeVisible();
            string = chance.string();
            $('#equipmentInventory').val(string);


        }
        expect(true).toBe(true);
    });

    it('Check foreignGL', function() {
        var foreignGL = chance.bool();
        var yesOrNo ="";
        if(foreignGL){
            yesOrNo = "Yes";
        }
        else{
            yesOrNo = "No";
        }
        $("input[name=foreignGL][value=" + yesOrNo + "]").attr('checked', 'checked');
        $("input[name=foreignGL][value=" + yesOrNo + "]").trigger('change');

        expect(true).toBe(true);

    });

    it('Check errorOmissionsLiability', function() {
        var errorOmissionsLiability = chance.bool();
        var yesOrNo ="";
        if(errorOmissionsLiability){
            yesOrNo = "Yes";
        }
        else{
            yesOrNo = "No";
        }
        $("input[name=errorOmissionsLiability][value=" + yesOrNo + "]").attr('checked', 'checked');
        $("input[name=errorOmissionsLiability][value=" + yesOrNo + "]").trigger('change');

        expect(true).toBe(true);


        if(yesOrNo === "Yes"){
            expect($('#errorOmissionsLiability')).toBeVisible();
            var string = chance.string();
            $('#errorOmissionsLiability').val(string);
        }
    });

    it('Select Business Structure', function() {
        var choice = chance.integer({min: 0, max: 5});
        if(choice == 1){
            $('#businessStructureSelect').val('corporation');
            expect($('#businessStructureSelect').val()).toEqual('corporation');
        }
        else if(choice == 2){
            $('#businessStructureSelect').val('individual');
            expect($('#businessStructureSelect').val()).toEqual('individual');
        }
        else if(choice == 3){
            $('#businessStructureSelect').val('LLC');
            expect($('#businessStructureSelect').val()).toEqual('LLC');
        }
        else if(choice == 4){
            $('#businessStructureSelect').val('LLP');
            expect($('#businessStructureSelect').val()).toEqual('LLP');
        }
        else if(choice == 5){
            $('#businessStructureSelect').val('partnership');
            expect($('#businessStructureSelect').val()).toEqual('partnership');
        }
        else if(choice == 6){
            $('#businessStructureSelect').val('soleProprietorship');
            expect($('#businessStructureSelect').val()).toEqual('soleProprietorship');
        }

    });

    it('Click Next, to see Review', function() {
        clickThis('#nextButtonStep3');
    });

    it('Check Review', function() {
        expect($('#namedInsured').val()).toBe($('#reviewNamedInsured').text());
        expect($('#googleAutoAddress').val()).toBe($('#reviewMailingAddress').text());
        expect($('#cityMailing').val()).toBe($('#reviewMailingCity').text());
        expect($('#stateMailing').val()).toBe($('#reviewMailingState').text());
        expect($('#zipCodeMailing').val()).toBe($('#reviewMailingZipcode').text());
        expect($('#phoneNumber').val()).toBe($('#reviewPhoneNumber').text());
        expect($('#namedInsuredEmail').val()).toBe($('#reviewEmail').text());
        expect($('#totalBudgetInput').val()).toBe($('#reviewTotalBudget').text());
        expect($('#totalBudgetConfirm').val()).toBe($('#reviewTotalBudget').text());
        expect($('#namedInsured').val()).toBe($('#reviewNamedInsured').text());
        expect($('#principalPhotographyDateStart').val() + " to " + $('#principalPhotographyDateEnd').val()).toBe($('#reviewPrincipalPhotographyDates').text());
        expect($('#proposedEffectiveDate').val()).toBe($('#reviewProposedEffective').text());
        expect($('#proposedExpirationDate').val()).toBe($('#reviewProposedExpiration').text());
        expect($('#proposedTermLength').val()).toBe($('#reviewProposedTerm').text());


        //TODO ADD LIMITS, DEDUCTS, PREMIUMS IN TEST
        var originalID = "";
        var reviewField = "";
        var originalField = "";
        var passTest = true;

        $('.uwReviewQuestion').each(function(){
            originalID = $(this).attr('data-originalID');
            reviewField = $(this).html().trim();
            if($('#' + originalID).is('input:text')){
                originalField = $('#' + originalID).val();
            }
            else if($('#' + originalID).is('select')){
                originalField = $('#' + originalID).find(":selected").text();
            }
            else{
                originalField = $('#' + originalID).val();
            }

            if(reviewField === originalField){

            }
            else{
                console.log($(this).attr('data-originalID'));
                console.log(reviewField + "!=" + originalField);
                passTest = false;
            }
        });

        expect(passTest).toBe(true);
    });

    it('Check Review', function() {
        var passTest = true;
        $('input:visible').each(function(){
            if($(this).hasAttribute("data-reviewName")){
                var htmlString = $('#reviewPanelContainer').html();
                if(htmlString.indexOf($(this).attr('data-reviewName')) == -1){
                    console.log($(this).attr('data-reviewName') + " NOT IN REVIEW");
                    passTest = false;
                }
            }
        });

        expect(passTest).toBe(true);
    });

    it('Check Submission', function() {
        var dataMap = getSubmissionMap();
        var validate = validateSubmission(dataMap);

        expect(validate).toBe(true);
    });

    it('Check Submission Process', function(done){
        var passTest = true;
        var dataMap = getSubmissionMap();

        $.ajax({
                method: "POST",
                url: "/Async/saveSubmissionToAIM",
                data: {
                    riskType: riskChosen,
                    totalGrossBudget: $("#totalBudgetInput").val().replace(/\$|,/g, ''),
                    proposedTermLength: $("#proposedTermLength").val(),
                    namedInsured: $('#namedInsured').val(),
                    questionAnswerMap: JSON.stringify(autoSaveMap),
                    uwQuestionsMap: JSON.stringify(uwQuestionsMap),
                    uwQuestionsOrder: uwQuestionsOrder.join("&;&"),
                    dataMap: JSON.stringify(dataMap),
                    BORrequested: BORrequested
                }
            })
            .done(function(msg) {
                //alert(msg);
                //0620584,0620585
                if (!msg.startsWith("Error")) {

                }
                else {
                    $('#progressBarModal').modal('hide');
                    alert(msg);
                    passTest = false;

                }

                expect(passTest).toBe(true);
                done();
            });

    }, 30000);

    // it('Check errorOmissionsLiability', function() {
    //     var errorOmissionsLiability = chance.bool();
    //     var yesOrNo ="";
    //     if(errorOmissionsLiability){
    //         yesOrNo = "Yes";
    //     }
    //     else{
    //         yesOrNo = "No";
    //     }
    //     $("input[name=errorOmissionsLiability][value=" + yesOrNo + "]").attr('checked', 'checked');
    //     $("input[name=errorOmissionsLiability][value=" + yesOrNo + "]").trigger('change');
    //
    //     expect(true).toBe(true);
    // });
    //





    afterAll(function () {
        // $('#fixtureToBeTested').remove();
    });


});
