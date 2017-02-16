<div id="insuredInfo">
    <div class="col-xs-12">
        <div class="col-xs-6">
            <div class="form-group">
                <label for="nameOfContactProducer">Name Of Producer</label>
                <input type="text" class="form-control showReview" name="nameOfProducer"
                       data-reviewName="Name Of Producer"
                       id="nameOfProducer" placeholder="Name of Producer"/>
            </div>

            <div class="form-group">
                <label for="producerContactEmail">Producer Contact Email Address</label>
                <input type="text" class="form-control showReview" name="producerEmail" id="producerEmail"
                       data-reviewName="Producer Email"
                       placeholder="Producer Email"/>
            </div>

            <div class="form-group">
                <label for="producerContactPhone">Producer Contact Phone Number</label>
                <input type="text" class="form-control showReview" name="producerPhone" id="producerPhone"
                       data-reviewName="Producer Phone"
                       placeholder="Producer Email"/>
            </div>

            %{--<div class="form-group">--}%
            %{--<label for="nameOfInsured">Name of Insured</label>--}%
            %{--<input type="text" class="form-control showReview" name="nameInsured" id="nameInsured"--}%
            %{--data-reviewName="Name Insured"--}%
            %{--placeholder="Insured"/>--}%
            %{--</div>--}%

            %{--<div class="form-group">--}%
            %{--<label for="insuredPhysicalLocation">Insured Physical Location</label>--}%
            %{--<input type="text" class="form-control showReview" name="insuredPhyLocation" id="insuredPhyLocation"--}%
            %{--data-reviewName="Insured Physical Location"--}%
            %{--placeholder="Location"/>--}%
            %{--</div>--}%

            %{--<div class="form-group">--}%
            %{--<label for="insuredMailingLocation">Insured Mailing Location</label>--}%
            %{--<input type="text" class="form-control showReview" name="insuredMailLocation" id="insuredMailLocation"--}%
            %{--data-reviewName="Insured Mailing Location"--}%
            %{--placeholder="Location"/>--}%
            %{--</div>--}%

            <div class="form-group">
                <label for="insuredContactPerson">Insured Contact Person</label>
                <input type="text" class="form-control showReview" name="InsuredContact" id="insuredContact"
                       data-reviewName="Insured Contact Person"
                       placeholder="Name of Insured Contact"/>
            </div>

            <div class="form-group">
                <label for="InsuredContactPhoneNumber">Insured Contact Person's Phone Number</label>
                <input type="text" class="form-control showReview" name="insuredContactPhone" id="insuredContactPhone"
                       data-reviewName="Insured Contact Phone Number"
                       placeholder="Phone Number"/>
            </div>

            <div class="form-group">
                <label for="insuredContactEmailAddress">Insured Contact Person's Email</label>
                <input type="text" class="form-control showReview" name="insuredContactEmail" id="insuredContactEmail"
                       data-reviewName="Insured Contact Email"
                       placeholder="Email"/>
            </div>
        </div>
        <div class="form-group">
            <label for="stateWhereEntityEstablished">State Where Entity Established</label>
            <input type="text" class="form-control showReview" name="whereEstablished" id="whereEstablished"
                   data-reviewName="whereEstablished"
                   placeholder=""/>
        </div>

        <div class="col-xs-6">

            <div class="form-group">
                <label for="dbaName">Doing Business as; Name</label>
                <input type="text" class="form-control showReview" name="dbaName" id="dbaName"
                       data-reviewName="DBA name"
                       placeholder="DBA Name"/>
            </div>

            %{--<div class="form-group">--}%
            %{--<label for="website">Website</label>--}%
            %{--<input type="text" class="form-control showReview" name="website" id="website"--}%
            %{--data-reviewName="website"--}%
            %{--placeholder="website"/>--}%
            %{--</div>--}%

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

            <p class="control-label"><input type="checkbox"
                                            class="productionInvolvesCheckbox pyrotechnics showReview"
                                            data-reviewName="Special Hazards Declared" name="pyrotechnics"
                                            id="pyrotechnicsCheckbox"
                                            value="Pyrotechnics (Explosions, fire) (Supplemental Application)"/> Pyrotechnics (Explosions, fire) (Supplemental Application)
            </p>

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
            <div class="row fileNameContainer" style="padding-top:6px; display:none">
                <div class="col-xs-9" style="text-align:right; font-size:11px">
                    <span class="fileNameSpan" id="pyroFileSpan">File Name</span>
                </div>
                <div class="col-xs-3">
                    <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                </div>
            </div>

            <p class="control-label"><input type="checkbox"
                                            class="productionInvolvesCheckbox stuntsOrHazardousActivites showReview"
                                            data-reviewName="Special Hazards Declared"
                                            name="stuntsOrHazardousActivities"
                                            id="stuntsHazardousCheckbox"
                                            value="Stunts or Hazardous Activities(Supplemental Application)"/> Stunts or Hazardous Activities (Supplemental Application)
            </p>

            <div class="row attachFileContainer" id="stuntsHazardousActivitiesAttachContainer"
                 style="margin-bottom: 20px; display:none; margin-left:0px;">
                <div class="row">
                    <div class="col-xs-3" style="margin-left:20px">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Attach File</span>
                                <input name="stuntsFile" type="file" class="file" id="stuntsFile" style="width:120px"/>
                            </div>
                        </form>
                    </div>

                    <div class="col-xs-8" style="padding-left:0px; line-height: 30px;">
                        <small>Please attach details of involvement of any Cast Member</small>
                    </div>
                </div>
                </div>

            <div class="form-group">
                <label for="describeBusinessOperations">Describe Primary Business Operations</label>
                <input type="text" class="form-control showReview" name="businessOperations" id="businessOperations"
                       data-reviewName="businessOperations"
                       placeholder="Describe"/>
            </div>

            <div class="form-group">
                <label for="describeOtherBusinessOperations">Describe Other Business Operations</label>
                <input type="text" class="form-control showReview" name="otherBusinessOperations"
                       id="otherBusinessOperations"
                       data-reviewName="otherBusinessOperations"
                       placeholder="Describe"/>
            </div>

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
                                <input name="budgetFile" type="file" class="file" id="budgetFile" style="width:120px"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
    </div>

<div id="riskSpecificInfo">

    <div class="col-xs-12">
        <div class="col-xs-6">
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

                <div id="insuranceCancelledContainer" style="display:none">
                    <div class="col-xs-12">
                        %{--<div class="form-group">--}%
                        %{--<label for="cancelledDeclinedExplain"></label>--}%
                        <input type="text" class=" showReview form-control" name="name"
                               data-reviewName="Explain why it was cancelled or declined"
                               placeholder="Please explain why it was cancelled or declined"
                               id="insuredCancelledExplain"/>
                        %{--</div>--}%
                    </div>
                </div>

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


            </div>
        %{--</div>--}%

        <div class="col-xs-12">
            <div class="form-group">
                <label for="totalEmployees">Estimated Total Attendance</label>
                <input type="text" class="form-control" name="name" placeholder="Total" id="totalAttendance"/>
            </div>
        </div>

        <div class="col-xs-12">
            <div class="form-group">
                <label for="totalEmployees">Largest Number of Attendees Any One Event Per Day</label>
                <input type="text" class="form-control" name="name" placeholder="" id="largestAttendees"/>
            </div>
        </div>

        <div class="col-xs-12">
            <div class="form-group">
                <label>Are there any overnight events?</label><br>
                <input type="radio" name="insuranceCancelled"
                       class="showReview"
                       value="Yes"
                       data-reviewName="Are there any overnight events?"
                       id="overnightYes_RadioButton"> Yes
                <input type="radio" name="insuranceCancelled"
                       class=""
                       value="No"
                       data-reviewName="Are there any overnight events?"
                       id="overnightNo_RadioButton"
                       checked="checked"> No
            </div>
        </div>
</div>

        <div class="col-xs-6">

            <div class="col-xs-12">
                <div class="form-group">
                    <label for="totalEmployees">Total number of employees</label>
                    <input type="text" class="form-control" name="name" placeholder="Total" id="totalNumEmployees"/>
                </div>
            </div>

            <div class="col-xs-12">
                <div class="form-group">
                    <label for="annualGrossReceipts">Annual Gross Receipts</label>
                    <input type="text" class="form-control" name="name" placeholder="\$USD" id="annualReceipts"/>
                </div>
            </div>

            <div class="col-xs-12">
                <div class="form-group">
                    <label for="annualPayroll">Annual Payroll</label>
                    <input type="text" class="form-control" name="name" placeholder="\$USD" id="annualPayroll"/>
                </div>
            </div>


            <div id="numberOfPerformancesEventsInYear">
                <div class="row col-xs-12">
                    <div class="col-xs-9">
                        <label for="numberOfPerformancesEventInLastYear">Number of Performances / Events in the last 12 Months</label>
                    </div>
                </div>

                <div class="row col-xs-12">
                    <div class="col-xs-9">
                        <input type="text" class="form-control showReview"
                               data-reviewName="Number of Performances Events in the last 12 Months"
                               name="numberOfPerformanceLastYear" placeholder="" id="numberOfPerformancesLastYear"/>
                    </div>
                </div>
            </div>

            <div id="numberOfPerformancesEventsInNextYear">
                <div class="row col-xs-12">
                    <div class="col-xs-9">
                        <label for="numberOfPerformancesEventInNextYear">Number of Performances / Events in the Next 12 Months</label>
                    </div>
                </div>

                <div class="row col-xs-12">
                    <div class="col-xs-9">
                        <input type="text" class="form-control showReview"
                               data-reviewName="Number of Performances Events in the Next 12 Months"
                               name="numberOfPerformanceNextYear" placeholder="" id="numberOfPerformancesNextYear"/>
                    </div>
                </div>
            </div>


            <div class="col-xs-12">
                <div class="form-group">
                    <label for="numberOfSeatsInTheater">What is the number of seats in the Theater/Venue?</label>
                    <input type="text" id="numberSeats" class=" showReview form-control" name="numberSeats"
                           data-reviewName="What is the number of seats in the Theater/Venue"
                           placeholder="Number of Seats"/>
                </div>
            </div>

        </div>
    </div>
</div>

<div id="coverageCheckboxesDiv">
    <div class="panel-body" id="undefined_panelBody">
        <div class="col-xs-12">
            <div class="row">
                <div class="col-xs-12">
                    <label class="control-label">Please select the Coverages being requested:</label>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-6">

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

                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Will alcohol be served?</label><br>
                            <input type="radio" name="waiverSubrogation"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Will alcohol be served?"
                                   id="alcoholYes_RadioButton"> Yes
                            <input type="radio" name="waiverSubrogation"
                                   class=""
                                   value="No"
                                   data-reviewName="Will alcohol be served?"
                                   id="alcoholNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>



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

                    <div id="equipmentOwnedRentedContainer" style="display:none">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <input type="radio" name="equipmentOwned"
                                       class=""
                                       value="owned"
                                       id="equipmentOwned"
                                       style="display: none;"> Owned
                                <input type="radio" name="equipmentRented"
                                       class=""
                                       value="rented"
                                       id="equipmentRented"
                                       checked="checked"
                                       style="display: none;"> Rented
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentLimitRequested">What Equipment Limit is Requested?</label>
                                <input type="text" id="equipmentLimit" class=" showReview form-control" name="name"
                                       data-reviewName="Requested Equipment Limit" style="display: none;"
                                       placeholder="\$USD"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentSchedule">Provide Equipment Schedule if any one item exceeds $10,000 in value</label>
                                <input type="text" id="equipmentSchedule" class="showReview form-control"
                                       name="name" data-reviewName="Equipment Schedule" style="display: none;"
                                       placeholder="Equipment schedule"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentLocation">Where is equipment kept when not in use?</label>
                                <input type="text" id="equipmentLocation" class="showReview form-control"
                                       name="name" data-reviewName="Where is equipment kept when not in use?"
                                       style="display: none;" placeholder="Location of equipment"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentSecurityMeasures">Provide security measures against theft, loss, and damage to equipment</label>
                                <input type="text" id="equipmentSecurity" class="showReview form-control"
                                       name="name"
                                       data-reviewName="Security Measures against theft, loss, and damage"
                                       style="display: none;" placeholder="Equipment security measures"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="equipmentInventoryAndProcedures">What method of inventory do you use? Please describe procedures and how often</label>
                                <input type="text" id="equipmentInventory" class="showReview form-control"
                                       name="name" data-reviewName="Method of Inventory" style="display: none;"
                                       placeholder="equipment inventory and procedures"/>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-xs-6">

                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Hired and Non-Owned Auto Liability Limits Requested?</label><br>
                            <input type="radio" name="autoLiability"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Hired and Non-Owned Auto Liability Limits Requested?"
                                   id="autoLiabilityYes_RadioButton"> Yes
                            <input type="radio" name="autoLiability"
                                   class=""
                                   value="No"
                                   data-reviewName="Hired and Non-Owned Auto Liability Limits Requested?"
                                   id="autoLiabilityNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>

                    <div id="costRentedVehiclesContainer" style="display:none">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="costOfRentedVehicles">What is Cost of Hire of Rented Vehicles?</label>
                                <input type="text" id="costVehicles" class=" showReview form-control"
                                       name="costVehicles" data-reviewName="What is Cost of Hire of Rented Vehicles"
                                       style="display: none;" placeholder="\$USD"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label>Do you require Owned Scheduled Auto Coverage?</label><br>
                                <input type="radio" name="requireOwnedAutoCoverage"
                                       class="showReview"
                                       value="Yes"
                                       data-reviewName="Do you require Owned Scheduled Auto Coverage??"
                                       id="requireOwnedAutoCoverageYes_RadioButton"> Yes
                                <input type="radio" name="requireOwnedAutoCoverage"
                                       class=""
                                       value="No"
                                       data-reviewName="Do you require Owned Scheduled Auto Coverage??"
                                       id="requireOwnedAutoCoverageNo_RadioButton"
                                       checked="checked"> No
                            </div>
                        </div>
                    </div>

                    <div id="">
                        <div class="col-xs-12" id="workCompCoverageRequested">
                            <p class="control-label"><input type="checkbox"
                                                            class=""
                                                            data-reviewName="" name=""
                                                            id="workCompCoverageRequestedCheckbox"
                                                            value=""/> Work Comp Coverage Requested
                            </p>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label>Will Payroll Service Co provide primary Work Comp Coverage?</label><br>
                                <input type="radio" name="primaryWorkCompCoverage"
                                       class="showReview"
                                       value="Yes"
                                       data-reviewName="Will Payroll Service Co provide primary Work Comp Coverage?"
                                       id="primaryWorkCompCoverageYes_RadioButton"> Yes
                                <input type="radio" name="primaryWorkCompCoverage"
                                       class=""
                                       value="No"
                                       data-reviewName="Will Payroll Service Co provide primary Work Comp Coverage?"
                                       id="primaryWorkCompCoverageNo_RadioButton"
                                       checked="checked"> No
                            </div>
                        </div>

                        <div id="statesOfHire">
                            <div class="row col-xs-12">
                                <div class="col-xs-9">
                                    <label for="storySynopsis">States of Hire & Total Payroll Each State</label>
                                </div>
                            </div>

                            <div class="row col-xs-12">
                                <div class="col-xs-9">
                                    <input type="text" class="form-control showReview"
                                           data-reviewName="States of Hire & Total Payroll Each State"
                                           name="statesOfHire" placeholder="" id="statesOfHireAndPayroll"/>
                                </div>
                            </div>
                        </div>

                        <div id="namesOfOfficers">
                            <div class="row col-xs-12">
                                <div class="col-xs-9">
                                    <label for="storySynopsis">Names of Officers, Title, % of Ownership</label>
                                </div>
                            </div>

                            <div class="row col-xs-12">
                                <div class="col-xs-9">
                                    <input type="text" class="form-control showReview"
                                           data-reviewName="Names of Officers, Title, % of Ownership"
                                           name="namesOfOfficers" placeholder="" id="namesOfficerTitleOwnership"/>
                                </div>
                            </div>
                        </div>


                        <div id="namesOfOfficersExcluded">
                            <div class="row col-xs-12">
                                <div class="col-xs-9">
                                    <label for="storySynopsis">Name of Officers to be Excluded under WC</label>
                                </div>
                            </div>

                            <div class="row col-xs-12">
                                <div class="col-xs-9">
                                    <input type="text" class="form-control showReview"
                                           data-reviewName="Name of Officers to be Excluded under WC"
                                           name="namesOfOfficersExcluded" placeholder=""
                                           id="officersExcludedUnderWC"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="umbrellaRequested">Umbrella Limit Requested</label>
                                <input type="text" class="form-control" name="name" placeholder="\$USD"
                                       id="umbrellaLimitRequested"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label>Are you contractually responsible for Premises?</label><br>
                                <input type="radio" name="equipmentOwnedRented"
                                       class="showReview"
                                       value="Yes"
                                       data-reviewName="Are you contractually responsible for Premises?"
                                       id="premisesYes_RadioButton"> Yes
                                <input type="radio" name="equipmentOwnedRented"
                                       class=""
                                       value="No"
                                       data-reviewName="Are you contractually responsible for Premises?"
                                       id="premisesNo_RadioButton"
                                       checked="checked"> No
                            </div>
                        </div>

                        %{--<div class="col-xs-12">--}%
                            %{--<div class="form-group">--}%
                                %{--<label>Is Foreign GL, Hired Auto and Workers Comp Required?</label><br>--}%
                                %{--<input type="radio" name="foreignGL"--}%
                                       %{--class="showReview"--}%
                                       %{--value="Yes"--}%
                                       %{--data-reviewName="Is Foreign GL, Hired Auto and Workers Comp Required?"--}%
                                       %{--id="foreignGLYes_RadioButton"> Yes--}%
                                %{--<input type="radio" name="foreignGL"--}%
                                       %{--class=""--}%
                                       %{--value="No"--}%
                                       %{--data-reviewName="Is Foreign GL, Hired Auto and Workers Comp Required?"--}%
                                       %{--id="foreignGLNo_RadioButton"--}%
                                       %{--checked="checked"> No--}%
                            %{--</div>--}%
                        %{--</div>--}%


                        %{--<div class="col-xs-12">--}%
                            %{--<div class="form-group">--}%
                                %{--<label>Do you require Film Producers Error and Omissions Liability? If yes, what limits? Please complete online application and submit for quoting</label><br>--}%
                                %{--<input type="radio" name="errorOmissionsLiability"--}%
                                       %{--class="showReview"--}%
                                       %{--value="Yes"--}%
                                       %{--data-reviewName="Do you require Film Producer Error and Omissions Liability? If yes, what limits? Please complete online application and submit for quoting"--}%
                                       %{--id="errorOmissionsLiabilityYes_RadioButton"> Yes--}%
                                %{--<input type="radio" name="errorOmissionsLiability"--}%
                                       %{--class=""--}%
                                       %{--value="No"--}%
                                       %{--data-reviewName="Do you require Film Producers Error and Omissions Liability? If yes, what limits? Please complete online application and submit for quoting"--}%
                                       %{--id="errorOmissionsLiabilityNo_RadioButton"--}%
                                       %{--checked="checked"> No--}%
                            %{--</div>--}%
                        %{--</div>--}%

                        %{--<div id="errorOmissionsLiabilityContainer" style="display:none">--}%
                            %{--<input type="text" id="errorOmissionsLiability" class="showReview form-control col-xs-12"--}%
                                   %{--name="name" data-reviewName="Error and Omission Limit"--}%
                                   %{--id="errorOmissionsLimit" style="display:none" placeholder="\$USD"/>--}%
                        %{--</div>--}%

                        %{--<div class="col-xs-12">--}%
                            %{--<div class="form-group">--}%
                                %{--<label>Do you require Miscellaneous Professional Liability? If yes, what limits? Please complete online application and submit for quoting</label><br>--}%
                                %{--<input type="radio" name="miscellaneousLiability"--}%
                                       %{--class="showReview"--}%
                                       %{--value="Yes"--}%
                                       %{--data-reviewName="Do you require Miscellaneous Professional Liability? If yes, what limits? Please complete online application and submit for quoting"--}%
                                       %{--id="miscellaneousLiabilityYes_RadioButton"> Yes--}%
                                %{--<input type="radio" name="miscellaneousLiability"--}%
                                       %{--class=""--}%
                                       %{--value="No"--}%
                                       %{--data-reviewName="Do you require Miscellaneous Professional Liability? If yes, what limits? Please complete online application and submit for quoting"--}%
                                       %{--id="miscellaneousLiabilityNo_RadioButton"--}%
                                       %{--checked="checked"> No--}%
                            %{--</div>--}%
                        %{--</div>--}%

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>