<div id="insuredInfo">
    <div class="col-xs-12">
        <div class="col-xs-6">

            %{--NAME OF PRINCIPAL--}%
            <div class="form-group">
                <label for="nameOfContactPrincipal">Name Of Principal</label>
                <input type="text" class="form-control showReview" name="nameOfPrincipal"
                       data-reviewName="Name Of Principal"
                       id="nameOfPrincipal" placeholder="Name of Principal"/>
            </div>

            %{--PRINCIPAL EMAIL--}%
            <div class="form-group">
                <label for="principalContactEmail">Principal Contact Email Address</label>
                <input type="text" class="form-control showReview" name="PrincipalEmail" id="principalEmail"
                       data-reviewName="Principal Email"
                       placeholder="Principal Email"/>
            </div>

            %{--PRINCIPAL PHONE--}%
            <div class="form-group">
                <label for="principalContactPhone">Principal Contact Phone Number</label>
                <input type="text" class="form-control showReview" name="PrincipalPhone" id="principalPhone"
                       data-reviewName="Principal Phone"
                       placeholder="Principal Phone"/>
            </div>

            %{--INSURED CONTACT PERSON--}%
            <div class="form-group">
                <label for="insuredContactPerson">Insured Contact Person</label>
                <input type="text" class="form-control showReview" name="InsuredContact" id="insuredContact"
                       data-reviewName="Insured Contact Person"
                       placeholder="Name of Insured Contact"/>
            </div>

            %{--INSURED CONTACT PHONE--}%
            <div class="form-group">
                <label for="InsuredContactPhoneNumber">Insured Contact Person's Phone Number</label>
                <input type="text" class="form-control showReview" name="insuredContactPhone" id="insuredContactPhone"
                       data-reviewName="Insured Contact Phone Number"
                       placeholder="Phone Number"/>
            </div>

            %{--INSURED CONTACT EMAIL--}%
            <div class="form-group">
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
                       data-reviewName="whereEstablished"
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
                    %{--<div class="col-xs-12">--}%
                    <label for="numberOfYearsOfExperience">Number of Years of Experience (Attach Bio / Resume)</label>
                    %{--</div>--}%
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
                                <input name="bioFile" type="file" class="file" id="bioFile" style="width:120px"/>
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

            %{--PROMOTER--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Are you the promoter of sponsor of the event?</label><br>
                    <input type="radio" name="signingWaivers"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Are Participants Signing Waivers?"
                           id="promoterYes_RadioButton"> Yes
                    <input type="radio" name="signingWaivers"
                           class=""
                           value="No"
                           data-reviewName="Are Participants Signing Waivers?"
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
                <div class="form-group">
                    <label for="describeBusinessOperations">Describe Primary Business Operations</label>
                    <input type="text" class="form-control showReview" name="businessOperations" id="businessOperations"
                           data-reviewName="businessOperations"
                           placeholder="Describe"/>
                </div>

                %{--DESCRIBE OTHER BUSINESS OPERATIONS--}%
                <div class="form-group">
                    <label for="describeOtherBusinessOperations">Describe Other Business Operations</label>
                    <input type="text" class="form-control showReview" name="otherBusinessOperations"
                           id="otherBusinessOperations"
                           data-reviewName="otherBusinessOperations"
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
                                   data-reviewName="subContractorService"
                                   placeholder="Describe"/>
                        </div>

                        <div class="col-xs-3">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="budgetFile" type="file" class="file" id="budgetFile"
                                           style="width:120px"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                %{--TYPE OF SECURITY AT EVENT--}%
                <div class="row">
                    <div class="form-group col-xs-12">
                        <label class="control-label">What Type of Security will be at the Event</label>
                        <select class="form-control securityTypeSelect showReview" name="securityType"
                                data-reviewName="securityType" id="securityType">
                            <option value="invalid" selected="selected">Unarmed Crowd Control Security</option>
                            <option value="armedSecurity" selected="selected">Armed Security</option>
                            <option value="otherSecurity" selected="selected">Other</option>
                        </select>
                    </div>

                </div>

                %{--HAZARDS--}%
                <label for="describeBusinessOperations">Check additional Hazards if Applicable below:</label>

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
                        <small>Please attach details of involvement of any Cast Member</small>
                    </div>

                </div>

                %{--ATTACHMENT FOR PYROTECH--}%
                <div class="row fileNameContainer" style="padding-top:6px; display:none">
                    <div class="col-xs-9" style="text-align:right; font-size:11px">
                        <span class="fileNameSpan" id="pyroFileSpan">File Name</span>
                    </div>

                    <div class="col-xs-3">
                        <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                    </div>
                </div>

                %{--STUNTS OR HAZARDS--}%
                <p class="control-label"><input type="checkbox"
                                                class="productionInvolvesCheckbox stuntsOrHazardousActivites showReview"
                                                data-reviewName="Special Hazards Declared"
                                                name="stuntsOrHazardousActivities"
                                                id="stuntsHazardousCheckbox"
                                                value="Stunts or Hazardous Activities(Supplemental Application)"/> Stunts or Hazardous Activities (Supplemental Application)
                </p>

                %{--CONTAINER // ATTACHMENT FOR STUNTS OR HAZARDS--}%
                <div class="row attachFileContainer" id="stuntsHazardousActivitiesAttachContainer"
                     style="margin-bottom: 20px; display:none; margin-left:0px;">
                    <div class="row">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="stuntsFile" type="file" class="file" id="stuntsFile"
                                           style="width:120px"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8" style="padding-left:0px; line-height: 30px;">
                            <small>Please attach details of involvement of any Cast Member</small>
                        </div>
                    </div>
                </div>

                %{--WAIVER SIGNING--}%
                <div class="row">
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


                    <div class="col-xs-12">
                        <div class="form-group">
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
                </div>

                %{--INSURANCE CANCELLED OR DECLINED--}%
                <div class="form-group col-xs-12">
                    <div class="row">
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
                <div id="insuranceCancelledContainer" style="display:none">
                    <div class="col-xs-12 row">
                        <div class="form-group">
                            %{--<label for="cancelledDeclinedExplain"></label>--}%
                            <input type="text" class=" showReview form-control" name="name"
                                   data-reviewName="Explain why it was cancelled or declined"
                                   placeholder="Please explain why it was cancelled or declined"
                                   id="insuredCancelledExplain"/>
                        </div>
                    </div>
                </div>

                %{--PRIOR LOSSE--}%
                <div class="form-group col-xs-12">
                    <div class="row">
                        <div class="col-xs-12">
                            <label for="listOfPriorLosses">List and Describe all Prior Losses (Or Enter "None")</label>
                        </div>
                    </div>

                    <div class="row">
                        <!--attach bio/resume if available-->
                        <div class="form-group">
                            <div class="col-xs-9">
                                <input type="text" class="form-control showReview" name="listOfPriorLosses"
                                       id="listOfPriorLosses" data-reviewName="Prior Losses"
                                       placeholder="List/Describe Prior Losses"/>
                            </div>

                            <div class="col-xs-3">
                                <form enctype="multipart/form-data">
                                    <div class="fileUpload btn btn-primary">
                                        <span>Attach File</span>
                                        <input name="lossesFile" type="file" class="file" id="lossesFile"
                                               style="width:120px"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="row fileNameContainer" style="padding-top:6px; display:none">
                        <div class="col-xs-9" style="text-align:right; font-size:11px">
                            <span class="fileNameSpan" id="lossesFileSpan">File Name</span>
                        </div>

                        <div class="col-xs-3">
                            <button type="button"
                                    class="btn btn-default btn-xs attachClearButton">Clear</button>
                        </div>

                    </div>

                </div>

                %{--OVERNIGHT EVENT--}%
                <div class="col-xs-12 form-group">
                    <div class="row">
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
                    <div class="form-group col-xs-12 row">
                        <label for="descriptionOfOvernightEvent">Provide full description of overnight events</label>
                        <input type="text" class="form-control showReview" name="descriptionOvernight"
                               id="descriptionOvernight"
                               data-reviewName="Provide full description of overnight events"
                               placeholder="Describe"/>
                    </div>


                    <div class="col-xs-12 form-group">
                        <div class="row">
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

        <div class="col-xs-6">
            <div class="row">

                %{--HIRED AND NON-OWNED AUTO LIABILITY REQUESTED--}%
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

                %{--HIRED AND NON-OWNED AUTO LIABILITY CONTAINER--}%
                <div class="costRentedVehiclesContainer" style="display:none">
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="costOfRentedVehicles">What is Cost of Hire of Rented Vehicles?</label>
                            <input type="text" id="costVehicles" class=" showReview form-control" name="costVehicles"
                                   data-reviewname="What is Cost of Hire of Rented Vehicles" placeholder="\$USD">
                        </div>
                    </div>

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


                    <div class="col-xs-12 coverageCodeRow">
                        <div class="col-xs-9 "><strong class="coverageCodeString"
                                                       style="font-size:13px">Hired / Non-Owned Auto</strong>
                        </div>

                        <div class="col-xs-3 "><strong>Limits</strong>
                        </div>

                        <div class="col-xs-12 Auto_LOBRow" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn">
                                <span>NOAL: Hired Auto Liability - CSL</span>
                            </div>

                            <div class="col-xs-3 limitColumn"><span>$1,000,000</span>
                            </div>
                        </div>

                        <div class="col-xs-12 WC_LOBRow">
                            <div class="col-xs-9 coverageColumn">
                                <span>NOAPD: Hired Auto Physical Damage</span>
                            </div>

                            <div class="col-xs-3 limitColumn"><span>ACV Unlimited</span>
                            </div>
                        </div>
                        <br>

                        <div class="col-xs-12"
                             style="border-top: 1px solid rgba(0, 0, 0, 0.19); border-bottom: 1px solid rgba(0, 0, 0, 0.19)">
                            <div class="col-xs-10 "><strong style="font-size:13px"></strong>
                            </div>
                        </div>

                    </div>
                </div>
                <br>

                %{--TOTAL NUMBER OF EMPLOYEES--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="totalEmployees">Total Number of Employees</label>
                        <input type="text" class="form-control" name="name" placeholder="Total" id="totalNumEmployees"
                               data-reviewname="Total Number of Employees">
                    </div>
                </div>

                %{--TOTAL GROSS RECEIPTS--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="annualGrossReceipts">Total Gross Receipts</label>
                        <input type="text" class="form-control" name="name" placeholder="\$USD" id="annualReceipts"
                               data-reviewname="Annual Gross Receipts">
                    </div>
                </div>

                %{--TOTAL PAYROLL--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="annualPayroll">Total Payroll</label>
                        <input type="text" class="form-control" name="name" placeholder="\$USD" id="annualPayroll"
                               data-reviewname="Annual Payroll">
                    </div>
                </div>

                %{--NUMBER OF PERFORMANCES LAST 12 MONTHS--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="numberOfPerformancesEventInLastYear">Number of Performances / Events in the last 12 Months</label>
                        <input type="text" class="form-control" name="numberOfPerformanceLastYear" placeholder=""
                               id="numberOfPerformancesLastYear"
                               data-reviewname="Number of Performances Events in the last 12 Months">
                    </div>
                </div>

                %{--NUMBER OF PERFORMANCES NEXT 12 MONTHS--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="numberOfPerformancesEventInNextYear">Number of Performances / Events in the Next 12 Months</label>
                        <input type="text" class="form-control" name="numberOfPerformanceNextYear" placeholder=""
                               id="numberOfPerformancesNextYear"
                               data-reviewname="Number of Performances Events in the Next 12 Months">
                    </div>
                </div>

                %{--WHAT IS NUMBER OF SEATS--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="numberOfSeatsInTheater">What is the number of seats in the Theater/Venue?</label>
                        <input type="text" id="numberSeats" class=" showReview form-control" name="numberSeats"
                               data-reviewname="What is the number of seats in the Theater/Venue"
                               placeholder="Number of Seats">
                    </div>
                </div>

                %{--TYPE OF SEATING--}%
                <div class="form-group col-xs-12">
                    <label class="control-label">Type of Seating</label>
                    <select class="form-control seatingTypeSelect showReview" name="seatingType"
                            data-reviewname="seatingType" id="seatingType">
                        <option value="invalid" selected="selected">Permanent</option>
                        <option value="pullDownSeat" selected="selected">Pull Down</option>
                        <option value="portableChairSeat" selected="selected">Portable Chairs</option>
                        <option value="stadiumSeat" selected="selected">Stadium</option>
                        <option value="openAreaSeat" selected="selected">Open Area Seating</option>
                    </select>
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
                    <div class="col-xs-10">
                        <label class="control-label"><u>Coverage:</u></label>
                    </div>

                    <div class="col-xs-2">
                        <label class="control-label"><u>Limits:</u></label>
                    </div>
                </div>
            </div>

            %{--COMMERCIAL GENERAL LIABILITY--}%
            <div class="row">
                <div class="col-xs-6">

                    %{--CGL--}%
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

                    %{--Umbrella--}%
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

                    %{--Blanket--}%
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

                    %{--Subrogation--}%
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

                    %{--Alcohol--}%
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
                    <div class="alcoholSaleContainer" style="display:none">
                        <div class="col-xs-12">
                            <div class="form-group effectsTotalPremium">
                                <label for="estimatedTotalSalesReceipts">What is the Estimated Total Sales Receipts?</label>
                                <input type="text" id="alcoholSales" class=" showReview form-control"
                                       name="alcoholSales"
                                       data-reviewName="What is the Estimated Total Sales Receipts?"
                                       placeholder="\$USD"/>
                            </div>
                        </div>
                    </div>

                    %{--Equipment Coverage--}%
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

                    %{--EQUIPMENT CONTAINER--}%
                    <div id="equipmentOwnedRentedContainer" style="display:none">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <input type="radio" name="equipmentOR"
                                       class=""
                                       value="Yes"
                                       id="equipmentOwnedRented"> Owned
                                <input type="radio" name="equipmentOR"
                                       class=""
                                       value="No"
                                       id="equipmentOwnedRented"
                                       checked="checked"> Rented
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentLimitRequested">What Equipment Limit is Requested?</label>
                                <input type="text" id="equipmentLimit" class=" showReview form-control" name="name"
                                       data-reviewName="Requested Equipment Limit"
                                       placeholder="\$USD"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentSchedule">Provide Equipment Schedule if any one item exceeds $10,000 in value</label>
                                <input type="text" id="equipmentSchedule" class="showReview form-control"
                                       name="name" data-reviewName="Equipment Schedule"
                                       placeholder="Equipment schedule"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentLocation">Where is equipment kept when not in use?</label>
                                <input type="text" id="equipmentLocation" class="showReview form-control"
                                       name="name" data-reviewName="Where is equipment kept when not in use?"
                                       placeholder="Location of equipment"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentSecurityMeasures">Provide security measures against theft, loss, and damage to equipment</label>
                                <input type="text" id="equipmentSecurity" class="showReview form-control"
                                       name="name"
                                       data-reviewName="Security Measures against theft, loss, and damage"
                                       placeholder="Equipment security measures"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentInventoryAndProcedures">What method of inventory do you use? Please describe procedures and how often</label>
                                <input type="text" id="equipmentInventory" class="showReview form-control"
                                       name="name" data-reviewName="Method of Inventory"
                                       placeholder="equipment inventory and procedures"/>
                            </div>
                        </div>
                    </div>

                    %{--Premises--}%
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
                            <input class="form-control effectsTotalPremium" id="brokerFeeInput" type="text"
                                   placeholder="$"
                                   name="brokerFee"/>
                        </div>
                    </div>

                </div>

                <div class="col-xs-6">

                    %{--TABLE CGL--}%
                    <div id="commercialGeneralLiabilityRequestedContainer" style="display:none">
                        <div id="limitsDeductPremiumInsert"><div class="row coverageCodeRow"><div
                                class="col-xs-10 "><strong
                                    class="coverageCodeString"
                                    style="font-size:13px">Commercial General Liability</strong></div>

                            <div class="col-xs-2 "><span'>-</span'></div>

                            <div class="row CGL_LOBRow" style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-10 coverageColumn"
                                     style="padding-left:20px"><span>CGL: General Aggregate Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>$2,000,000</span>
                                </div>
                            </div>

                            <div class="row CGL_LOBRow">
                                <div class="col-xs-10 coverageColumn"
                                     style="padding-left:20px"><span>CGL: Products & Completed Operations Agg Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>$1,000,000</span>
                                </div>
                            </div>

                            <div class="row CGL_LOBRow" style="background-color: rgba(38, 80, 159, 0.13)">
                                <div
                                        class="col-xs-10 coverageColumn"
                                        style="padding-left:20px"><span>CGL: Personal & Advertising Injury (Any One Person or Organization)</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>$1,000,000</span></div>
                            </div>

                            <div class="row CGL_LOBRow">
                                <div class="col-xs-10 coverageColumn"
                                     style="padding-left:20px"><span>CGL: Each Occurrence Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>$1,000,000</span>
                                </div>
                            </div>

                            <div class="row CGL_LOBRow" style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-10 coverageColumn"
                                     style="padding-left:20px"><span>CGL: Damage to Premises Rented to You Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>$100,000</span>
                                </div>
                            </div>

                            <div class="row CGL_LOBRow">
                                <div class="col-xs-10 coverageColumn"
                                     style="padding-left:20px"><span>CGL: Medical Payments</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>Excluded</span>
                                </div>
                            </div>

                            <div class="row" style="border-top: 1px solid rgba(0, 0, 0, 0.19);">
                                <div class="col-xs-10 "><strong style="font-size:13px"></strong>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    %{--TABLE CGL--}%
                    <br>

                    %{--TABLE UMBRELLA--}%
                    <div id="umbrellaLimitRequestedContainer" style="display:none">
                        <div id="limitsDeductPremiumInsert"><div class="row coverageCodeRow"><div
                                class="col-xs-10 "><strong
                                    class="coverageCodeString" style="font-size:13px">Umbrella</strong></div>

                            <div class="col-xs-2 "><span'>-</span'></div>

                            <div class="row Umbrella_LOBRow" style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-10 coverageColumn"
                                     style="padding-left:20px"><span>CUMB: Each Occurrence Limit (Liability Coverage)</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>$1,000,000</span>
                                </div>
                            </div>

                            <div class="row Umbrella_LOBRow">
                                <div class="col-xs-10 coverageColumn"
                                     style="padding-left:20px"><span>CUMB: Personal & Advertising Injury Limit (Any one person or organization)</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>$1,000,000</span>
                                </div>
                            </div>

                            <div class="row Umbrella_LOBRow" style="background-color: rgba(38, 80, 159, 0.13)">
                                <div
                                        class="col-xs-10 coverageColumn"
                                        style="padding-left:20px"><span>CUMB: Aggregate Limit (Liability Coverage) (except with respect to covered autos)</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>$1,000,000</span></div>
                            </div>

                            <div class="row Umbrella_LOBRow">
                                <div class="col-xs-10 coverageColumn"
                                     style="padding-left:20px"><span>CUMB: Covered Auto Aggregate Limit</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>$1,000,000</span>
                                </div>
                            </div>

                            <div class="row Umbrella_LOBRow" style="background-color: rgba(38, 80, 159, 0.13)">
                                <div class="col-xs-10 coverageColumn"
                                     style="padding-left:20px"><span>CUMB: Self-Insured Retention</span>
                                </div>

                                <div class="col-xs-2 limitColumn"><span>nil</span>
                                </div>
                            </div>

                            <div class="row" style="border-top: 1px solid rgba(0, 0, 0, 0.19);">
                                <div class="col-xs-10 "><strong style="font-size:13px"></strong>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    %{--TABLE UMBRELLA--}%

                    %{--Premiums--}%
                    <div class="row" id="premiumDistDivContainer">
                        <div class="col-xs-12">
                            <h5>Premium Distribution</h5>

                            <div class="row">
                                <div class="col-xs-8">
                                    <u>Line Of Business</u>
                                </div>

                                <div class="col-xs-2">
                                    <u>Premium</u>
                                </div>

                                <div class="col-xs-2">
                                    <u>Agent %</u>
                                </div>
                            </div>

                            <div class="premDistributionInsert">
                                <div id="commercialGeneralLiabilityPremiumContainer">
                                    <div class="row" style="background-color: rgba(38, 80, 159, 0.13)">
                                        <div class="col-xs-8"><span class="eventLineOfBusinessSpan"
                                                                    id="commercialGeneralLiabilityPremiumName">Commercial General Liability</span>
                                        </div>

                                        <div class="col-xs-2"><span class="eventPremiumSpan"
                                                                    id="commercialGeneralLiabilityPremiumCost"></span>
                                        </div>

                                        <div class="col-xs-2"><span class="eventAgentPercentSpan">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="premDistributionInsert">
                                <div class="alcoholSaleContainer" style="display:none">
                                    <div class="row">
                                        <div class="col-xs-8"><span class="eventLineOfBusinessSpan"
                                                                    id="alcoholSalePremiumName">Liquor Liability</span>
                                        </div>

                                        <div class="col-xs-2"><span class="eventPremiumSpan"
                                                                    id="alcoholSalePremiumCost"></span>
                                        </div>

                                        <div class="col-xs-2"><span class="alcoholSalePercentSpan">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="premDistributionInsert">
                                <div id="brokerFeePremiumContainer">
                                    <div class="row" style="background-color: rgba(38, 80, 159, 0.13)">
                                        <div class="col-xs-8"><span class="eventLineOfBusinessSpan"
                                                                    id="brokerFeePremiumName">Broker Fee</span>
                                        </div>

                                        <div class="col-xs-2"><span class="eventPremiumSpan"
                                                                    id="brokerFeePremiumCost"></span>
                                        </div>

                                        <div class="col-xs-2"><span class="eventAgentPercentSpan">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="premDistributionInsert">
                                <div class="policyFeeContainer">
                                    <div class="row">
                                        <div class="col-xs-8">
                                            <span class="eventLineOfBusinessSpan"
                                                  id="policyFeePremiumName">Policy Fee</span>
                                        </div>

                                        <div class="col-xs-2">
                                            <span class="eventPremiumSpan effectsTotalPremium"
                                                  id="policyFeePremiumCost"></span>
                                        </div>

                                        <div class="col-xs-2"><span class="policyFeePercentSpan">-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="premDistributionInsert">
                                <div class="totalSaleContainer">
                                    <div class="row">
                                        <div class="col-xs-8">
                                            <strong>
                                                <span class="eventLineOfBusinessSpan"
                                                      id="totalSalePremiumName">Total:</span>
                                            </strong>
                                        </div>

                                        <div class="col-xs-2"><span class=""
                                                                    id="totalSalePremiumCost"></span>
                                        </div>

                                        <div class="col-xs-2"><span class="totalSalePercentSpan"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div id="premTotalInsert">

                            </div>
                            <span id="premiumInsert"></span>
                        </div>
                    </div>
                    %{--Premium--}%

                </div>
            </div>
        </div>
    </div>
</div>
