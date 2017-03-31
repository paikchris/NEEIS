<div id="insuredInfo">
    <div class="col-xs-12">
        <div class="col-xs-6">

            %{--NAME OF PRINCIPAL--}%
            <div class="form-group col-xs-12 row">
                <label for="nameOfContactPrincipal">Name Of Principal</label>
                <input type="text" class="form-control showReview" name="nameOfPrincipal"
                       data-reviewName="Name Of Principal"
                       id="nameOfPrincipal" placeholder="Name of Principal"/>
            </div>

            %{--PRINCIPAL EMAIL--}%
            <div class="form-group col-xs-12 row">
                <label for="principalContactEmail">Principal Contact Email Address</label>
                <input type="text" class="form-control showReview" name="PrincipalEmail" id="principalEmail"
                       data-reviewName="Principal Email"
                       placeholder="Principal Email"/>
            </div>

            %{--PRINCIPAL PHONE--}%
            <div class="form-group col-xs-12 row">
                <label for="principalContactPhone">Principal Contact Phone Number</label>
                <input type="text" class="form-control showReview phoneNumberMask" name="PrincipalPhone"
                       id="principalPhone"
                       data-reviewName="Principal Phone"
                       placeholder="Principal Phone"/>
            </div>

            %{--INSURED CONTACT PERSON--}%
            <div class="form-group col-xs-12 row">
                <label for="insuredContactPerson">Insured Contact Person</label>
                <input type="text" class="form-control showReview" name="InsuredContact" id="insuredContact"
                       data-reviewName="Insured Contact Person"
                       placeholder="Name of Insured Contact"/>
            </div>

            %{--INSURED CONTACT PHONE--}%
            <div class="form-group col-xs-12 row">
                <label for="InsuredContactPhoneNumber">Insured Contact Person's Phone Number</label>
                <input type="text" class="form-control showReview phoneNumberMask" name="insuredContactPhone"
                       id="insuredContactPhone"
                       data-reviewName="Insured Contact Phone Number"
                       placeholder="Phone Number"/>
            </div>

            %{--INSURED CONTACT EMAIL--}%
            <div class="form-group col-xs-12 row">
                <label for="insuredContactEmailAddress">Insured Contact Person's Email</label>
                <input type="text" class="form-control showReview" name="insuredContactEmail" id="insuredContactEmail"
                       data-reviewName="Insured Contact Email"
                       placeholder="Email"/>
            </div>

        </div>

        <div class="col-xs-6">

            %{--STATE WHERE ENTITY ESTABLISHED--}%
            <div class="form-group">
                <label for="stateWhereEntityEstablished">State Where Entity Established</label>
                <input type="text" class="form-control showReview" name="whereEstablished" id="whereEstablished"
                       data-reviewName="State Where Entity Established"
                       placeholder=""/>
            </div>

            %{--DOING BUSINESS AS--}%
            <div class="form-group">
                <label for="dbaName">Doing Business as; Name</label>
                <input type="text" class="form-control showReview" name="dbaName" id="dbaName"
                       data-reviewName="DBA name"
                       placeholder="DBA Name"/>
            </div>

            %{--NUMBER OF YEARS EXPERIENCE--}%
            <div class="form-group col-xs-12">
                <div class="row">
                    <label for="numberOfYearsOfExperience">Number of Years of Experience (Attach Bio / Resume)</label>
                </div>

                <div class="row">
                    <div class="col-xs-9 row">
                        <input type="text" class="form-control showReview" name="numberOfYearsOfExperience"
                               data-reviewName="Years Experience"
                               id="numberOfYearsOfExperience" placeholder="# Years of Experience"/>
                    </div>

                    <div class="col-xs-3">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Attach File</span>
                                <input name="experienceFile" type="file" class="file" id="experienceFile"
                                       style="width:120px"/>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="row fileNameContainer" style="padding-top:6px; display:none">
                    <div class="col-xs-9" style="text-align:right; font-size:11px">
                        <span class="fileNameSpan" id="bioFileSpan">File Name</span>
                    </div>

                    <div class="col-xs-3">
                        <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                    </div>

                </div>
            </div>

            %{--PROMOTER Y/N--}%
            <div class="col-xs-12 row">
                <div class="form-group">
                    <label>Are you the promoter of sponsor of the event?</label><br>
                    <input type="radio" name="signingWaivers"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Are you the promoter of sponsor of the event?"
                           id="promoterYes_RadioButton"> Yes
                    <input type="radio" name="signingWaivers"
                           class=""
                           value="No"
                           data-reviewName="Are you the promoter of sponsor of the event?"
                           id="promoterNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>

        </div>
    </div>
</div>

<div id="riskSpecificInfo">

    <div class="col-xs-12">
        <div class="col-xs-6">
            <div class="row">

                %{--DESCRIBE PRIMARY BUSINESS OPERATIONS--}%
                <div class="form-group col-xs-12 row">
                    <label for="describeBusinessOperations">Describe Primary Business Operations</label>
                    <input type="text" class="form-control showReview" name="businessOperations" id="businessOperations"
                           data-reviewName="Describe Primary Business Operations"
                           placeholder="Describe"/>
                </div>

                %{--DESCRIBE OTHER BUSINESS OPERATIONS--}%
                <div class="form-group col-xs-12 row">
                    <label for="describeOtherBusinessOperations">Describe Other Business Operations</label>
                    <input type="text" class="form-control showReview" name="otherBusinessOperations"
                           id="otherBusinessOperations"
                           data-reviewName="Describe Other Business Operations"
                           placeholder="Describe"/>
                </div>

                %{--SUB CONTRACTORS--}%
                <div class="form-group col-xs-12">
                    <div class="row">
                        <label for="whatServiceDoYouHireSubContractorsFor">What services, if any, do you hire Sub-Contractors for? (Attach contract copy)</label>
                    </div>

                    <div class="row">
                        <div class="col-xs-9 row">
                            <input type="text" class="form-control showReview" name="subContractorService"
                                   id="subContractorService"
                                   data-reviewName="What services, if any, do you hire Sub-Contractors for?"
                                   placeholder="Describe"/>
                        </div>

                        <div class="col-xs-3">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="subContractFile" type="file" class="file" id="subContractFilee"
                                           style="width:120px"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                %{--TYPE OF SECURITY AT EVENT--}%
                <div class="form-group col-xs-12 row">
                    <label class="control-label">What Type of Security will be at the Event</label>
                    <select class="form-control securityTypeSelect showReview" name="securityType"
                            data-reviewName="What Type of Security will be at the Event" id="securityType">
                        <option value="invalid" selected="selected">Unarmed Crowd Control Security</option>
                        <option value="Armed Security" selected="selected">Armed Security</option>
                        <option value="Other Security" selected="selected">Other</option>
                    </select>
                </div>


                %{--NUMBER OF PERFORMANCES LAST 12 MONTHS--}%
                <div class="col-xs-12 row">
                    <div class="form-group">
                        <label for="numberOfPerformancesEventInLastYear">Number of Performances / Events in the last 12 Months</label>
                        <input type="text" class="form-control showReview" name="numberOfPerformanceLastYear"
                               placeholder=""
                               id="numberOfPerformancesLastYear"
                               data-reviewname="Number of Performances Events in the last 12 Months">
                    </div>
                </div>

                %{--NUMBER OF PERFORMANCES NEXT 12 MONTHS--}%
                <div class="col-xs-12 row">
                    <div class="form-group">
                        <label for="numberOfPerformancesEventInNextYear">Number of Performances / Events in the Next 12 Months</label>
                        <input type="text" class="form-control showReview" name="numberOfPerformanceNextYear"
                               placeholder=""
                               id="numberOfPerformancesNextYear"
                               data-reviewname="Number of Performances Events in the Next 12 Months">
                    </div>
                </div>

                %{--WHAT IS NUMBER OF SEATS--}%
                <div class="col-xs-12 row">
                    <div class="form-group">
                        <label for="numberOfSeatsInTheater">What is the number of seats in the Theater/Venue?</label>
                        <input type="text" id="numberSeats" class=" showReview form-control" name="numberSeats"
                               data-reviewname="What is the number of seats in the Theater/Venue"
                               placeholder="Number of Seats">
                    </div>
                </div>

                %{--TYPE OF SEATING--}%
                <div class="form-group col-xs-12 row">
                    <label class="control-label">Type of Seating</label>
                    <select class="form-control seatingTypeSelect showReview" name="seatingType"
                            data-reviewname="Seating Type" id="seatingType">
                        <option value="invalid" selected="selected">Permanent</option>
                        <option value="pullDownSeat" selected="selected">Pull Down</option>
                        <option value="portableChairSeat" selected="selected">Portable Chairs</option>
                        <option value="stadiumSeat" selected="selected">Stadium</option>
                        <option value="openAreaSeat" selected="selected">Open Area Seating</option>
                    </select>
                </div>

            </div>
        </div>

        <div class="col-xs-6">
            <div class="row">

                %{--HIRED AND NON-OWNED AUTO LIABILITY REQUESTED Y/N--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <br>
                        <label>Hired and Non-Owned Auto Liability Limits Requested?</label><br>
                        <input type="radio" name="autoLiability" class="showReview" value="Yes"
                               data-reviewname="Hired and Non-Owned Auto Liability Limits Requested?"
                               id="autoLiabilityYes_RadioButton"> Yes
                        <input type="radio" name="autoLiability" class="" value="No"
                               data-reviewname="Hired and Non-Owned Auto Liability Limits Requested?"
                               id="autoLiabilityNo_RadioButton" checked="checked"> No
                    </div>
                </div>

                %{--HIRED AND NON-OWNED AUTO LIABILITY CONTAINER / TABLE / ADDITIONAL QUESTIONS--}%
                <div class="costRentedVehiclesContainer" style="display:none">

                    %{--WHAT IS COST OF HIRE OF RENTED VEHICLES--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="costOfRentedVehicles">What is Cost of Hire of Rented Vehicles?</label>
                            <input type="text" id="costVehicles" class="costVehicles showReview form-control"
                                   name="costVehicles"
                                   data-reviewname="What is Cost of Hire of Rented Vehicles" placeholder="$USD">
                        </div>
                    </div>

                    %{--DO YOU REQUIRE OWNED SCHEDULED AUTO COVERAGE Y/N--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Do you require Owned Scheduled Auto Coverage?</label><br>
                            <input type="radio" name="requireOwnedAutoCoverage" class="showReview" value="Yes"
                                   data-reviewname="Do you require Owned Scheduled Auto Coverage??"
                                   id="requireOwnedAutoCoverageYes_RadioButton"> Yes
                            <input type="radio" name="requireOwnedAutoCoverage" class="" value="No"
                                   data-reviewname="Do you require Owned Scheduled Auto Coverage??"
                                   id="requireOwnedAutoCoverageNo_RadioButton" checked="checked"> No
                        </div>
                    </div>

                    %{--TABLE HIRED AND NON-OWNED AUTO LIABILITY --}%
                    <div class="tableNOAL" id="hiredNonOwnedAutoProduct">
                        <div class="row">
                            <div class="col-xs-6 ">
                                <strong class="coverageCodeString" style="font-size:13px">Hired / Non-Owned Auto</strong>
                                <span class="productID_pull" data-cov="NOAL" style="display:none">SPEVENTS</span>
                            </div>

                            <div class="col-xs-2">
                                <span>-</span>
                            </div>

                            <div class="col-xs-2">
                                <span>-</span>
                            </div>

                            <div class="col-xs-2">
                                <span>-</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS NOAL" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                <span class="lob">Hired Auto Liability - CSL</span>
                            </div>

                            <div class="col-xs-2 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>

                            <div class="col-xs-2 premiumColumn">
                                <span class="premium"></span>
                            </div>

                            <div class="col-xs-2 deductibleColumn">
                                <span class="deductible"></span>
                            </div>
                        </div>


                        <div class="row lobRow SPEVENTS NOAL">
                            <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                <span class="lob">Hired Auto Physical Damage</span>
                            </div>

                            <div class="col-xs-2 limitColumn">
                                <span class="limit">ACV Unlimited</span>
                            </div>

                            <div class="col-xs-2 premiumColumn">
                                <span class="premium"></span>
                            </div>

                            <div class="col-xs-2 deductibleColumn">
                                <span class="deductible"></span>
                            </div>
                        </div>
                        <br>

                        <div class="col-xs-12"
                             style="border-top: 1px solid rgba(0, 0, 0, 0.19); border-bottom: 1px solid rgba(0, 0, 0, 0.19)">
                            <div class="col-xs-10 "><strong style="font-size:13px"></strong>
                            </div>
                        </div>

                    </div>
                    %{--TABLE HIRED AND NON-OWNED AUTO LIABILITY --}%
                </div>
                <br>

                %{--HAZARDS PYRO / STUNTS / CONTAINERS FILE ATTACHMENT--}%
                <div class="form-group col-xs-12">
                    %{--HAZARDS--}%
                    <label for="describeBusinessOperations">Check additional Hazards if Applicable below:</label>

                    %{--PYROTECHNIC CHECKBOX--}%
                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox pyrotechnicsActivites showReview"
                                                    data-reviewName="Special Hazard Declared"
                                                    name="pyrotechnicsActivities"
                                                    id="pyrotechnicsCheckbox"
                                                    value="Pyrotechnic Activities(Supplemental Application)"/> Pyrotechnic Activities(Supplemental Application)
                    </p>

                    %{--PYROTECHNICS CONTAINER--}%
                    <div class="row" id="pyrotechnicsAttachContainer" style="margin-bottom: 20px; display:none">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="pyroFile" type="file" class="file" id="pyroFile" style="width:120px"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8">
                            <small>Please attach details</small>
                        </div>

                    </div>

                    %{--ATTACHMENT FOR PYROTECH--}%
                    <div class=" fileNameContainer row" style="padding-top:6px; display:none">
                        <div class="col-xs-9" style="text-align:right; font-size:11px">
                            <span class="fileNameSpan" id="pyroFileSpan">File Name</span>
                        </div>

                        <div class="col-xs-3">
                            <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                        </div>
                    </div>

                    %{--STUNTS OR HAZARDS CHECKBOX--}%
                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox stuntsOrHazardousActivites showReview"
                                                    data-reviewName="Special Hazard Declared"
                                                    name="stuntsOrHazardousActivities"
                                                    id="stuntsHazardousCheckbox"
                                                    value="Stunts or Hazardous Activities(Supplemental Application)"/> Stunts or Hazardous Activities (Supplemental Application)
                    </p>

                    %{--CONTAINER // ATTACHMENT FOR STUNTS OR HAZARDS--}%
                    <div class="row" id="stuntsHazardousActivitiesAttachContainer"
                         style="margin-bottom: 20px; display:none">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="stuntsFile" type="file" class="file" id="stuntsFile"
                                           style="width:120px"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8">
                            <small>Please attach details</small>
                        </div>

                    </div>

                </div>

                %{--WAIVER SIGNING Y/N--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>Are Participants Signing Waivers??</label><br>
                        <input type="radio" name="signingWaivers"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Are Participants Signing Waivers?"
                               id="signingWaiversYes_RadioButton"> Yes
                        <input type="radio" name="signingWaivers"
                               class=""
                               value="No"
                               data-reviewName="Are Participants Signing Waivers?"
                               id="signingWaiversNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>

                %{--INSURANCE CANCELLED OR DECLINED Y/N--}%
                <div class="form-group col-xs-12">
                    <div class="">
                        <label>Has your insurance have ever been cancelled or declined?</label><br>
                        <input type="radio" name="insuranceCancelled"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Has your insurance have ever been cancelled or declined?"
                               id="insuranceCancelledYes_RadioButton"> Yes
                        <input type="radio" name="insuranceCancelled"
                               class=""
                               value="No"
                               data-reviewName="Has your insurance have ever been cancelled or declined?"
                               id="insuranceCancelledNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>

                %{--INSURANCE CANCELLED OR DECLINE CONTAINER / ADDITIONAL QUESTION--}%
                <div id="insuranceCancelledContainer" style="display:none">
                    <div class="col-xs-12">
                        <div class="form-group">
                            %{--<label for="cancelledDeclinedExplain"></label>--}%
                            <input type="text" class=" showReview form-control" name="name"
                                   data-reviewName="Explain why it was cancelled or declined"
                                   placeholder="Please explain why it was cancelled or declined"
                                   id="insuredCancelledExplain"/>
                        </div>
                    </div>
                </div>

                %{--OVERNIGHT EVENT Y/N--}%
                <div class="col-xs-12 form-group">
                    <div class="">
                        <label>Are there any overnight events?</label><br>
                        <input type="radio" name="overnight"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Are there any overnight events?"
                               id="overnightYes_RadioButton"> Yes
                        <input type="radio" name="overnight"
                               class=""
                               value="No"
                               data-reviewName="Are there any overnight events?"
                               id="overnightNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>

                %{--OVERNIGHT EVENT CONTAINER // DESCRIBE EVENT // WILL THERE BE CHILDREN--}%
                <div id="overnightContainer" style="display:none">

                    %{--PROVIDE FULL DESCRIPTION OF OVERNIGHT EVENTS--}%
                    <div class="form-group col-xs-12 ">
                        <label for="descriptionOfOvernightEvent">Provide full description of overnight events</label>
                        <input type="text" class="form-control showReview" name="descriptionOvernight"
                               id="descriptionOvernight"
                               data-reviewName="Provide full description of overnight events"
                               placeholder="Describe"/>
                    </div>

                    %{--WILL THERE BE CHILDREN IN THESE OVERNIGHT EVENTS Y/N--}%
                    <div class="col-xs-12 form-group">
                        <div class="">
                            <label>Will there be children in these overnight events?</label><br>
                            <input type="radio" name="overnightChildren"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Will there be children in these overnight events?"
                                   id="overnightChildrenYes_RadioButton"> Yes
                            <input type="radio" name="overnightChildren"
                                   class=""
                                   value="No"
                                   data-reviewName="Will there be children in these overnight events?"
                                   id="overnightChildrenNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<div id="coverageCheckboxesDiv">
    <div class="panel-body" id="undefined_panelBody">
        <div class="col-xs-12">

            %{--COVERAGE OPTION TABLE HEADER--}%
            <div class="row">
                <div class="col-xs-6">
                    <div class="col-xs-12">
                        <label class="control-label">Please select the Coverages being requested:</label>
                    </div>
                </div>

                <div class="col-xs-6">
                    <div class="col-xs-6">
                        <label class="control-label"><u>Coverages:</u></label>
                    </div>

                    <div class="col-xs-2">
                        <label class="control-label"><u>Limits:</u></label>
                    </div>

                    <div class="col-xs-2">
                        <label class="control-label"><u>Premiums:</u></label>
                    </div>

                    <div class="col-xs-2">
                        <label class="control-label"><u>Deductibles:</u></label>
                    </div>
                </div>
            </div>

            %{--COMMERCIAL GENERAL LIABILITY--}%
            <div class="row">
                <div class="col-xs-6">

                    %{--COMMERCIAL GENERAL LIABILITY REQUESTED Y/N--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Commercial General Liability Limits Requested?</label><br>
                            <input type="radio" name="commercialGeneralLiabilityRequested?"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Commercial General Liability Limits Requested?"
                                   id="commercialGeneralLiabilityRequestedYes_RadioButton"> Yes
                            <input type="radio" name="commercialGeneralLiabilityRequested?"
                                   class=""
                                   value="No"
                                   data-reviewName="Commercial General Liability Limits Requested?"
                                   id="commercialGeneralLiabilityRequestedNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>

                    %{--UMBRELLA REQUESTED Y/N--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Umbrella Limit Requested?</label><br>
                            <input type="radio" name="umbrellaLimitRequested"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Umbrella Limit Requested?"
                                   id="umbrellaLimitRequestedYes_RadioButton"> Yes
                            <input type="radio" name="umbrellaLimitRequested"
                                   class=""
                                   value="No"
                                   data-reviewName="Umbrella Limit Requested?"
                                   id="umbrellaLimitRequestedNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>

                    %{--BLANKET REQUESTED Y/N--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Blanket Additional Insured Requested?</label><br>
                            <input type="radio" name="blanketInsured"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Blanket Additional Insured Requested?"
                                   id="blanketInsuredYes_RadioButton"> Yes
                            <input type="radio" name="blanketInsured"
                                   class=""
                                   value="No"
                                   data-reviewName="Blanket Additional Insured Requested?"
                                   id="blanketInsuredNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>

                    %{--WAIVER OF SUBROGATION REQUESTED Y/N--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Waiver of Subrogation Requested?</label><br>
                            <input type="radio" name="waiverSubrogation"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Waiver of Subrogation Requested?"
                                   id="waiverSubrogationYes_RadioButton"> Yes
                            <input type="radio" name="waiverSubrogation"
                                   class=""
                                   value="No"
                                   data-reviewName="Waiver of Subrogation Requested?"
                                   id="waiverSubrogationNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>

                    %{--ALCOHOL REQUESTED Y/N--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Will alcohol be served?</label><br>
                            <input type="radio" name="willAlcoholBeServed"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Will alcohol be served?"
                                   id="alcoholYes_RadioButton"> Yes
                            <input type="radio" name="willAlcoholBeServed"
                                   class=""
                                   value="No"
                                   data-reviewName="Will alcohol be served?"
                                   id="alcoholNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>

                    %{--ALCOHOL CONTAINER / ADDITION QUESTION--}%
                    <div class="alcoholSaleContainer" style="display:none">

                        %{--WHAT IS THE ESTIMATED TOTAL SALES RECEIPTS--}%
                        <div class="col-xs-12">
                            <div class="form-group effectsTotalPremium">
                                <label for="estimatedTotalSalesReceipts">What is the Estimated Total Sales Receipts?</label>
                                <input type="text" id="alcoholSales" class="alcoholSales showReview form-control"
                                       name="alcoholSales"
                                       data-reviewName="What is the Estimated Total Sales Receipts?"
                                       placeholder="$USD"/>
                            </div>
                        </div>
                    </div>

                    %{--EQUIPMENT COVERAGE REQUESTED Y/N--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Misc Equipment Coverage Requested?</label><br>
                            <input type="radio" name="equipmentOwnedRented"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Misc Equipment Coverage Requested?"
                                   id="equipmentOwnedRentedYes_RadioButton"> Yes
                            <input type="radio" name="equipmentOwnedRented"
                                   class=""
                                   value="No"
                                   data-reviewName="Misc Equipment Coverage Requested?"
                                   id="equipmentOwnedRentedNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>

                    %{--EQUIPMENT CONTAINER / ADDITIONAL QUESTIONS--}%
                    <div id="equipmentOwnedRentedContainer" style="display:none">

                        %{--EQUIPMENT OWNED OR RENTED Y/N--}%
                        <div class="col-xs-12">
                            <div class="form-group">
                                <input type="radio" name="equipmentOR"
                                       class="showReview"
                                       value="Yes"
                                       data-reviewName="Misc Equipment Owned or Rented?"
                                       id="equipmentOwnRentYes_RadioButton"> Owned
                                <input type="radio" name="equipmentOR"
                                       class=""
                                       value="No"
                                       data-reviewName="Misc Equipment Owned or Rented?"
                                       id="equipmentOwnRentNo_RadioButton"
                                       checked="checked"> Rented
                            </div>
                        </div>

                        %{--WHAT EQUIPMENT LIMIT IS REQUESTED?--}%
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentLimitRequested">What Equipment Limit is Requested?</label>
                                <input type="text" id="equipmentLimit" class="equipmentLimit showReview form-control"
                                       name="name"
                                       data-reviewName="What Equipment Limit is Requested?"
                                       placeholder="$USD"/>
                            </div>
                        </div>

                        %{--PROVIDE EQUIPMENT SCHEDULE IF ANY ONE ITEM EXCEEDS 10,000 IN VALUE--}%
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentSchedule">Provide Equipment Schedule if any one item exceeds $10,000 in value</label>
                                <input type="text" id="equipmentSchedule" class="showReview form-control"
                                       name="name"
                                       data-reviewName="Provide Equipment Schedule if any one item exceeds $10,000 in value"
                                       placeholder="Equipment schedule"/>
                            </div>
                        </div>

                        %{--WHERE IS EQUIPMENT KEPT WHEN NOT IN USE--}%
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentLocation">Where is equipment kept when not in use?</label>
                                <input type="text" id="equipmentLocation" class="showReview form-control"
                                       name="name" data-reviewName="Where is equipment kept when not in use?"
                                       placeholder="Location of equipment"/>
                            </div>
                        </div>

                        %{--PROVIDE SECURITY MEASURES AGAINST THEFT, LOSS, AND DAMAGE TO EQUIPMENT--}%
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentSecurityMeasures">Provide security measures against theft, loss, and damage to equipment</label>
                                <input type="text" id="equipmentSecurity" class="showReview form-control"
                                       name="name"
                                       data-reviewName="Security Measures against theft, loss, and damage"
                                       placeholder="Equipment security measures"/>
                            </div>
                        </div>

                        %{--WHAT METHOD OF INVENTORY DO YOU USE? PLEASE DESCRIBE PROCEDURES AND HOW OFTEN--}%
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentInventoryAndProcedures">What method of inventory do you use? Please describe procedures and how often</label>
                                <input type="text" id="equipmentInventory" class="showReview form-control"
                                       name="name" data-reviewName="Method of Inventory"
                                       placeholder="equipment inventory and procedures"/>
                            </div>
                        </div>
                    </div>

                    %{--RESPONSIBLE FOR PREMISES Y/N--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Are you contractually responsible for Premises?</label><br>
                            <input type="radio" name="premisesResponsible"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Are you contractually responsible for Premises?"
                                   id="premisesYes_RadioButton"> Yes
                            <input type="radio" name="premisesResponsible"
                                   class=""
                                   value="No"
                                   data-reviewName="Are you contractually responsible for Premises?"
                                   id="premisesNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>

                    %{--BROKER FEE--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label class="control-label">Broker Fee</label>
                            <input class="form-control effectsTotalPremium brokerFeeInput" id="brokerFeeInput"
                                   type="text"
                                   placeholder="$USD"
                                   name="brokerFee"/>
                        </div>
                    </div>

                </div>

                <div class="col-xs-6">

                    %{--TABLE CGL--}%
                    <div id="commercialGeneralLiabilityRequestedContainer" style="display:none">
                        <div class="tableCGL" id="commercialGeneralLiabilityProduct">
                            <div class="row">
                                <div class="col-xs-6 ">
                                    <strong class="coverageCodeString"
                                            style="font-size:13px">Commercial General Liability</strong>
                                    <span class="productID_pull" data-cov="CGL" style="display:none">SPEVENTS</span>
                                </div>

                                <div class="col-xs-2">
                                    <span>-</span>
                                </div>

                                <div class="col-xs-2">
                                    <span>-</span>
                                </div>

                                <div class="col-xs-2">
                                    <span>-</span>
                                </div>
                            </div>
                            <div class="row lobRow SPEVENTS CGL"style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">General Aggregate Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">$1,000,000</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CGL">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Products & Completed Operations Agg Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">$1,000,000</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CGL"
                                 style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Personal & Advertising Injury (Any one person or organization)</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">$1,000,000</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CGL">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Each Occurrence Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">$1,000,000</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CGL"
                                 style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Damage to Premises Rented to You Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">$100,000</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CGL">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Medical Payments</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">Excluded</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row" style="border-top: 1px solid rgba(0, 0, 0, 0.19);">
                                <div class="col-xs-10 "><strong style="font-size:13px"></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    %{--TABLE CGL--}%
                    <br>

                    %{--TABLE UMBRELLA--}%
                    <div id="umbrellaLimitRequestedContainer" style="display:none">
                        <div class="tableCUMB" id="umbrellaProduct">
                            <div class="row">
                                <div class="col-xs-6">
                                    <strong class="coverageCodeString" style="font-size:13px">Umbrella</strong>
                                    <span class="productID_pull" data-cov="CUMB" style="display:none">SPEVENTS</span>
                                </div>

                                <div class="col-xs-2 ">
                                    <span>-</span>
                                </div>

                                <div class="col-xs-2 ">
                                    <span>-</span>
                                </div>

                                <div class="col-xs-2 ">
                                    <span>-</span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CUMB" style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Each Occurrence Limit (Liability Coverage)</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">$1,000,000</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CUMB">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Personal & Advertising Injury Limit (Any one person or organization)</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">$1,000,000</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CUMB" style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Aggregate Limit (Liability Coverage) (except with respect to covered autos)</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">$1,000,000</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CUMB">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Covered Auto Aggregate Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">$1,000,000</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row lobRow SPEVENTS CUMB" style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-6 coverageColumn" style="padding-left:20px">
                                    <span class="lob">Self-Insured Retention</span>
                                </div>

                                <div class="col-xs-2 limitColumn">
                                    <span class="limit">nil</span>
                                </div>

                                <div class="col-xs-2 premiumColumn">
                                    <span class="premium"></span>
                                </div>

                                <div class="col-xs-2 deductibleColumn">
                                    <span class="deductible"></span>
                                </div>
                            </div>

                            <div class="row" style="border-top: 1px solid rgba(0, 0, 0, 0.19);">
                                <div class="col-xs-10 "><strong style="font-size:13px"></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    %{--TABLE UMBRELLA--}%
                    <br>

                    %{--Premiums--}%
                    <div class="row" id="premiumDistDivContainer">
                        <div class="col-xs-12">
                            <h5>Premium Distribution</h5>

                            %{--HEADER--}%
                            <div class="row">
                                <div class="col-xs-4">
                                    <u>Line Of Business</u>
                                </div>

                                <div class="col-xs-3">
                                    <u>Premium</u>
                                </div>

                                <div class="col-xs-3">
                                    <u>Agent %</u>
                                </div>
                            </div>

                            %{--COMMERCIAL GENERAL LIMITS--}%
                            <div class="premDistributionInsert">
                                <div id="commercialGeneralLiabilityPremiumContainer">
                                    <div class="row" style="background-color: rgba(38, 80, 159, 0.13)">
                                        <div class="col-xs-4">
                                            <span class="lineOfBusinessSpan"
                                                  id="commercialGeneralLiabilityPremiumName">Commercial General Liability</span>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class="premiumSpan effectsTotal" id="commercialGeneralLiabilityPremiumCost"></span>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class="agentPercentSpan">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            %{--ALCOHOL LIMITS--}%
                            <div class="premDistributionInsert">
                                <div class="alcoholSaleContainer" style="display:none">
                                    <div class="row">
                                        <div class="col-xs-4">
                                            <span class="lineOfBusinessSpan"
                                                  id="alcoholSalePremiumName">Liquor Liability</span>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class="premiumSpan effectsTotal"
                                                  id="alcoholSalePremiumCost"></span>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class="agentPercentSpan">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            %{--POLICY FEE LIMITS--}%
                            <div class="premDistributionInsert">
                                <div class="policyFeeContainer">
                                    <div class="row" style="background-color: rgba(38, 80, 159, 0.13)">
                                        <div class="col-xs-4">
                                            <span class="lineOfBusinessSpan" id="policyFeePremiumName">Policy Fee</span>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class="premiumSpan effectsTotal"
                                                  id="policyFeePremiumCost"></span>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class="agentPercentSpan">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            %{--TOTAL PREMIUM--}%
                            <div class="premDistributionInsert">
                                <div class="totalSaleContainer">
                                    <div class="row">
                                        <div class="col-xs-4">
                                            <strong>
                                                <span class="lineOfBusinessSpan" id="totalSalePremiumName">Total:</span>
                                            </strong>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class="premiumSpan productTotalPremium SPEVENTS"
                                                  id="totalSalePremiumCost"></span>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class=" agentPercentSpan totalSalePercentSpan"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            %{--BROKER FEE LIMITS--}%
                            <div class="premDistributionInsert">
                                <div id="brokerFeePremiumContainer" style="display:none">
                                    <div class="row">
                                        <div class="col-xs-4">
                                            <span class="lineOfBusinessSpan" id="brokerFeePremiumName">Broker Fee</span>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class="premiumSpan brokerFeePremiumCost"
                                                  id="brokerFeePremiumCost"></span>
                                        </div>

                                        <div class="col-xs-3">
                                            <span class="agentPercentSpan">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    %{--Premium--}%
                    
                </div>
            </div>
        </div>
    </div>
</div>