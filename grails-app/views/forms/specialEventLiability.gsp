<div id="insuredInfo">
    <div class="col-xs-6">
        %{--VENUE HEADER--}%
        <div class="col-xs-12">
            <label for="venueHeader"><b>Venue:</b></label>
        </div>
        %{--WILL THE EVENT BE HELD OUTDOORS--}%
        <div class="col-xs-12">
            <div class="form-group">
                <label>Will the Event be held Outdoors?</label><br>
                <input type="radio" name="willEventBeHeldOutdoors"
                       class="showReview"
                       value="Yes"
                       data-reviewName="Will the Event be held Outdoors?"
                       id="willEventBeHeldOutdoorsYes_RadioButton"> Yes
                <input type="radio" name="willEventBeHeldOutdoors"
                       class=""
                       value="No"
                       data-reviewName="Will the Event be held Outdoors?"
                       id="willEventBeHeldOutdoorsNo_RadioButton"
                       checked="checked"> No
            </div>
        </div>
        %{--EVENT OUTDOORS CONTAINER--}%
        <div id="eventOutdoorContainer" style="display:none">

            %{--IS THE FACILITY FENCED?--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Is the facility fenced?</label><br>
                    <input type="radio" name="facilityFenced"
                           class="eventOutdoor"
                           value="Yes"
                           data-reviewName="Is the facility fenced?"
                           id="facilityFencedYes_RadioButton"> Yes
                    <input type="radio" name="facilityFenced"
                           class=""
                           value="No"
                           data-reviewName="Is the facility fenced?"
                           id="facilityFencedNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>

            %{--WHAT TYPE OF FENCE?--}%
            <div id="fenceTypeContainer" style="display:none">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="numberOfGuards">What is the type of Fence?</label>
                        <input type="text" class="form-control facilityFence" name="fenceType" placeholder=""
                               data-reviewname="What is the type of Fence?"
                               id="fenceType">
                    </div>
                </div>
            </div>

            %{--DOES THE EVENT END PRIOR TO SUNDOWN?--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Does the event end prior to sundown?</label><br>
                    <input type="radio" name="eventEndBeforeSundown"
                           class="eventOutdoor"
                           value="Yes"
                           data-reviewName="Does the event end prior to sundown?"
                           id="eventEndBeforeSundownYes_RadioButton"> Yes
                    <input type="radio" name="eventEndBeforeSundown"
                           class=""
                           value="No"
                           data-reviewName="Does the event end prior to sundown?"
                           id="eventEndBeforeSundownNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>

            %{--IS THERE ADEQUATE LIGHTING FOR A NIGHT TIME EVENT?--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Is there adequate lighting for a night time Event?</label><br>
                    <input type="radio" name="adequateLighting"
                           class="eventOutdoor"
                           value="Yes"
                           data-reviewName="Is there adequate lighting for a night time Event?"
                           id="adequateLightingYes_RadioButton"> Yes
                    <input type="radio" name="adequateLighting"
                           class=""
                           value="No"
                           data-reviewName="Is there adequate lighting for a night time Event?"
                           id="adequateLightingNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>
        </div>
        %{--WHAT IS NUMBER OF SEATS--}%
        <div class="col-xs-12">
            <div class="form-group">
                <label for="numberOfSeatsInTheater">What is the number of seats in the Theater/Venue?</label>
                <input type="number" id="numberSeats" class=" showReview form-control" name="numberSeats"
                       data-reviewname="What is the number of seats in the Theater/Venue"
                       placeholder="Number of Seats">
            </div>
        </div>
        %{--TYPE OF SEATING--}%
        <div class="form-group col-xs-12">
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
        %{--DOES APPLICANT HAVE A FORMAL EVACUATION PLAN PLEASE ATTACH--}%
        <div class="col-xs-12">
            <div class="form-group">
                <label>Does applicant have a formal evacuation plan?</label><br>
                <input type="radio" name="evacuationFormalPlan"
                       class="showReview"
                       value="Yes"
                       data-reviewName="Will the Event be held Outdoors?"
                       id="evacuationFormalPlanYes_RadioButton"> Yes
                <input type="radio" name="evacuationFormalPlan"
                       class=""
                       value="No"
                       data-reviewName="Will the Event be held Outdoors?"
                       id="evacuationFormalPlanNo_RadioButton"
                       checked="checked"> No
            </div>
        </div>
        %{--ATTACHMENT CONTAINER FORMAL EVACUATION PLAN--}%
        <div class="row" id="evacuationAttachContainer" style="margin-bottom: 20px; display:none">
            <div class="col-xs-3" style="margin-left:20px">
                <form enctype="multipart/form-data">
                    <div class="fileUpload btn btn-primary">
                        <span>Attach File</span>
                        <input name="evacuationFile" type="file" class="file" id="evacuationFile"
                               style="width:120px"/>
                    </div>
                </form>
            </div>

            <div class="col-xs-8">
                <small>Please attach evacuation plan</small>
            </div>

        </div>
        %{--ARE THERE ANY SWIMMING POOLS LAKES OR BODIES OF WATER?--}%
        <div class="col-xs-12">
            <div class="form-group">
                <label>Are there any swimming pools, lakes or bodies of water?</label><br>
                <input type="radio" name="bodiesOfWater" class="showReview" value="Yes"
                       data-reviewname="Are there any swimming pools, lakes or bodies of water?"
                       id="bodiesOfWaterYes_RadioButton"> Yes
                <input type="radio" name="bodiesOfWater" class="" value="No"
                       data-reviewname="Are there any swimming pools, lakes or bodies of water?"
                       id="bodiesOfWaterNo_RadioButton" checked="checked"> No
            </div>
        </div>
        %{--BODY OF WATER NEAR EVENT CONTAINER--}%
        <div id="waterContainer" style="display:none">
            %{--IS SWIMMING ALLOWED?--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Is swimming allowed?</label><br>
                    <input type="radio" name="swimmingAllowed" class="water" value="Yes"
                           data-reviewname="Is swimming allowed?"
                           id="swimmingAllowedYes_RadioButton"> Yes
                    <input type="radio" name="swimmingAllowed" class="" value="No"
                           data-reviewname="Is swimming allowed?"
                           id="swimmingAllowedNo_RadioButton" checked="checked"> No
                </div>
            </div>
            %{--LIFE GUARD ON DUTY?--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Life guard on duty?</label><br>
                    <input type="radio" name="lifeGuard" class="water" value="Yes"
                           data-reviewname="Life guard on duty?"
                           id="lifeGuardYes_RadioButton"> Yes
                    <input type="radio" name="lifeGuard" class="" value="No"
                           data-reviewname="Life guard on duty?"
                           id="lifeGuardNo_RadioButton" checked="checked"> No
                </div>
            </div>
            %{--IS WATER HAZARD FENCED?--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Is water hazard fenced?</label><br>
                    <input type="radio" name="waterHazardFenced" class="water" value="Yes"
                           data-reviewname="Is water hazard fenced?"
                           id="waterHazardFencedYes_RadioButton"> Yes
                    <input type="radio" name="waterHazardFenced" class="" value="No"
                           data-reviewname="Is water hazard fenced?"
                           id="waterHazardFencedNo_RadioButton" checked="checked"> No
                </div>
            </div>

            <div id="waterHazardNotFencedContainer" style="display:none">
                %{--EXPLAIN IF NO TO WATER HAZARD FENCED--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="parkingSquareFoot">If No, give details</label>
                        <input type="text" class="form-control waterHazardNotFenced" name="waterHazardNotFenced"
                               placeholder=""
                               data-reviewname="Is water hazard fenced? If No, give details"
                               id="waterHazardNotFenced">
                    </div>
                </div>

            </div>
        </div>
        %{--ATTACHMENT CONTAINER PRECAUTIONARY MEASURE IN THE EVENT OF STORM FLOOD HIGH WINDS--}%
        <div class="row" id="precautionaryMeasureAttachContainer" style="margin-bottom: 20px; display:none">
            <div class="col-xs-3" style="margin-left:20px">
                <form enctype="multipart/form-data">
                    <div class="fileUpload btn btn-primary">
                        <span>Attach File</span>
                        <input name="precautionaryMeasureFile" type="file" class="file" id="precautionaryMeasureFile"
                               style="width:120px"/>
                    </div>
                </form>
            </div>

            <div class="col-xs-8">
                <small>Please attach precautionary measures in the event of storm flood high winds</small>
            </div>

        </div>

        %{--STAGING HEADER--}%
        <div class="col-xs-12">
            <label for="stagingHeader"><b>Staging:</b></label>
        </div>
        %{--WHO IS RESPONSIBLE FOR SETTING UP THE STAGE AND SEATING--}%
        <div class="form-group col-xs-12">
            <label for="responsibleStageSeating">Who is responsible for setting up the stage and seating?</label>
            <input type="text" class="form-control showReview" name="responsibleStageSeating"
                   id="responsibleStageSeating"
                   data-reviewName="Who is responsible for setting up the stage and seating?"
                   placeholder=""/>
        </div>
        %{--STAGE AND SEATING QUESTION CONTAINER--}%
        <div id="seatingContainer" style="display:none">
            %{--SEATING STAGE INDEPENDENT FIRM Y/N--}%
            <div class="form-group col-xs-12">
                <div class="">
                    <label>Is above handled by an independent firm?</label><br>
                    <input type="radio" name="independentFirmStageSeating"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Is above handled by an independent firm?"
                           id="independentFirmStageSeatingYes_RadioButton"> Yes
                    <input type="radio" name="independentFirmStageSeating"
                           class=""
                           value="No"
                           data-reviewName="Is above handled by an independent firm?"
                           id="independentFirmStageSeatingNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>
            %{--ATTACHMENT CONTAINER SEATING STAGE INDEPENDENT FIRM--}%
            <div class="row" id="stageSeatingAttachContainer" style="margin-bottom: 20px; display:none">
                <div class="col-xs-3" style="margin-left:20px">
                    <form enctype="multipart/form-data">
                        <div class="fileUpload btn btn-primary">
                            <span>Attach File</span>
                            <input name="stageSeatingFile" type="file" class="file" id="stageSeatingFile"
                                   style="width:120px"/>
                        </div>
                    </form>
                </div>

                <div class="col-xs-8">
                    <small>Provide certificate adding applicant as additional Insured with Indemnities and Hold Harmless Agreement in favor of Applicant</small>
                </div>

            </div>
        </div>
    </div>

    <div class="col-xs-6">
        %{--ACTIVITES HEADER--}%
        <div class="col-xs-12">
            <label for="activitiesHeader"><b>Activities:</b></label>
        </div>
        %{--PROVIDE SAFTEY FEATURES USED TO PROTECT PERSONS AND PROPERTIES--}%
        <div class="form-group col-xs-12">
            <label for="safteyFeatures">Provide safety features used to protect persons and property</label>
            <input type="text" class="form-control showReview" name="safteyFeatures" id="safteyFeatures"
                   data-reviewName="Provide safety features used to protect persons and property"
                   placeholder=""/>
        </div>
        %{--IS PARTICIPANT ACCIDENT MEDICAL COVERAGE IN PLACE Y/N--}%
        <div class="form-group col-xs-12">
            <div class="">
                <label>Is Participant Accident Medical coverage in place?</label><br>
                <input type="radio" name="pamc"
                       class="showReview"
                       value="Yes"
                       data-reviewName="Is Participant Accident Medical coverage in place?"
                       id="pamcYes_RadioButton">Yes
                <input type="radio" name="pamc"
                       class=""
                       value="No"
                       data-reviewName="Is Participant Accident Medical coverage in place?"
                       id="pamcNo_RadioButton"
                       checked="checked"> No
            </div>
        </div>
        %{--ATTACHMENT CONTAINER PARTICIPANT ACCIDENT MEDICAL COVERAGE--}%
        <div class="row" id="pamcAttachContainer" style="margin-bottom: 20px; display:none">
            <div class="col-xs-3" style="margin-left:20px">
                <form enctype="multipart/form-data">
                    <div class="fileUpload btn btn-primary">
                        <span>Attach File</span>
                        <input name="pamcFile" type="file" class="file" id="pamcFile"
                               style="width:120px"/>
                    </div>
                </form>
            </div>

            <div class="col-xs-8">
                <small>Attach proof of coverage</small>
            </div>

        </div>
        %{--DESCRIBE PRODUCTS SOLD OTHER THAN CONCESSIONS FOOD AND BEVERAGES PRODUCTS--}%
        <div class="form-group col-xs-12">
            <label for="productsOther">Describe products sold other than concessions, food and beverage products</label>
            <input type="text" class="form-control showReview" name="productsOther" id="productsOther"
                   data-reviewName="Describe products sold other than concessions, food and beverage products"
                   placeholder=""/>
        </div>

        %{--PARTICIPANTS HEADER--}%
        <div class="col-xs-12">
            <label for="participantsHeader"><b>Participants:</b></label>
        </div>
        %{--LIMIT ACCIDENTAL DEATH AND DISMEMBERMENT--}%
        <div class="form-group col-xs-12">
            <label for="addCoverage">What Limit of Accidental Death & Dismemberment (AD&D) Medical Coverage is obtained for each participant?</label>
            <input type="text" class="form-control showReview" name="addCoverage" id="addCoverage"
                   data-reviewName="What Limit of Accidental Death & Dismemberment (AD&D) Medical Coverage is obtained for each participant?"
                   placeholder=""/>
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
        %{--VOLUNTEERS WAIVER SIGNING Y/N--}%
        <div class="col-xs-12">
            <div class="form-group">
                <label>Do volunteers sign waivers?</label><br>
                <input type="radio" name="signingVolunteersWaivers"
                       class="showReview"
                       value="Yes"
                       data-reviewName="Do volunteers sign waivers?"
                       id="signingVolunteersWaiversYes_RadioButton"> Yes
                <input type="radio" name="signingVolunteersWaivers"
                       class=""
                       value="No"
                       data-reviewName="Do volunteers sign waivers?"
                       id="signingVolunteersWaiversNo_RadioButton"
                       checked="checked"> No
            </div>
        </div>
        %{--ATTACHMENT CONTAINER VOLUNTEERS WAIVER SIGNING SAMPLE--}%
        <div class="row" id="volunteerAttachContainer" style="margin-bottom: 20px; display:none">
            <div class="col-xs-3" style="margin-left:20px">
                <form enctype="multipart/form-data">
                    <div class="fileUpload btn btn-primary">
                        <span>Attach File</span>
                        <input name="volunteerFile" type="file" class="file" id="volunteerFile"
                               style="width:120px"/>
                    </div>
                </form>
            </div>

            <div class="col-xs-8">
                <small>Provide sample Volunteer Waiver agreement</small>
            </div>

        </div>

    </div>
</div>

<div id="riskSpecificInfo">
    <div class="row">
        <div class="col-xs-6">
            %{--HAZARDS PYRO / STUNTS / CONTAINERS FILE ATTACHMENT--}%
            <div class="form-group col-xs-12">
                %{--HAZARDS--}%
                <label for="hazardsCheckBoxes"><b>Check additional Hazards if Applicable below:</b></label>
                %{--THESE RISK WILL DISABLE INDICATION--}%
                %{--DRONE CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="drone"
                                                id="droneCheckbox"
                                                value="Drone Operations"/> Drone Operations</p>
                %{--RAP MUSIC CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="rapMusicPerformance"
                                                id="rapMusicPerformanceCheckbox"
                                                value="Rap Music Performances"/> Rap Music Performances</p>
                %{--STAGE DIVING CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="stageDiving"
                                                id="stageDivingCheckbox"
                                                value="Performances with stage diving, reckless stage antics"/> Performances with stage diving, reckless stage antics
                </p>
                %{--OUTDOOR FARMLAND CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="outdoorFarmland"
                                                id="outdoorFarmlandCheckbox"
                                                value="Outdoor farmland"/> Outdoor farmland</p>
                %{--INDOOR VENUES NO SPRINKLER CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="indoorSprinklered"
                                                id="indoorSprinkleredCheckbox"
                                                value="Indoor venues that are not sprinklered"/> Indoor venues that are not sprinklered
                </p>
                %{--NO LIQUOR LICENSE SALES CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="liquorLicense"
                                                id="liquorLicenseCheckbox"
                                                value="Concessionaires selling liquor without a liquor license"/> Concessionaires selling liquor without a liquor license
                </p>
                %{--NO FORMAL EVAC PLAN CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="noEvacuationPlan"
                                                id="noEvacuationPlanCheckbox"
                                                value="Events with no formal written evacuation plan"/> Events with no formal written evacuation plan
                </p>
                %{--OVERNIGHT CAMPING CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="overnightCamping"
                                                id="overnightCampingCheckbox"
                                                value="Overnight Camping"/> Overnight Camping
                </p>
                %{--MECHANICAL RIDES CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="mechanicalRides"
                                                id="mechanicalRidesCheckbox"
                                                value="Mechanical rides or similar carnival rides and attractions"/> Mechanical rides or similar carnival rides and attractions
                </p>
                %{--THESE RISK WILL DISABLE INDICATION--}%
                %{--ANIMALS--}%
                <p class="control-label"><input type="checkbox"
                                                class="productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="animals"
                                                id="animalsCheckbox"
                                                value="animals"/> Animals</p>
                %{--AIRCRAFT--}%
                <p class="control-label"><input type="checkbox"
                                                class="productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="aircraft"
                                                id="aircraftCheckbox"
                                                value="aircraft"/> Aircraft</p>
                %{--WATERCRAFT--}%
                <p class="control-label"><input type="checkbox"
                                                class="productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="watercraft"
                                                id="watercraftCheckbox"
                                                value="watercraft"/> Watercraft</p>
                %{--SPORTING--}%
                <p class="control-label"><input type="checkbox"
                                                class="productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="sporting"
                                                id="sportingCheckbox"
                                                value="sporting"/> Sporting</p>
                %{--ATHLETIC EVENT--}%
                <p class="control-label"><input type="checkbox"
                                                class="productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="athleticEvent"
                                                id="athleticEventCheckbox"
                                                value="athleticEvent"/> Athletic Event</p>
                %{--HAZARDOUS ACTIVITIES OR OTHER AMUSEMENTS--}%
                <p class="control-label"><input type="checkbox"
                                                class="productionInvolvesCheckbox showReview"
                                                data-reviewName="Special Hazard Declared"
                                                name="amusement"
                                                id="amusementCheckbox"
                                                value="amusement"/> Hazardous activities or other amusements</p>
                %{--TYPE OF HAZARDOUS ACTIVITY--}%
                <div class="form-group col-xs-12">
                    <label for="typeAmusement">Type of hazardous activity or amusement</label>
                    <input type="text" class="form-control showReview" name="typeAmusement" id="typeAmusement"
                           data-reviewName="Type of hazardous activity or amusement"
                           placeholder=""/>
                </div>


                %{--PYROTECHNIC CHECKBOX--}%
                <p class="control-label"><input type="checkbox"
                                                class="riskHazard productionInvolvesCheckbox pyrotechnicsActivites showReview"
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

            %{--SECURITY HEADER--}%
            <div class="col-xs-12">
                <label for="securityHeader"><b>Security:</b></label>
            </div>
            %{--TYPE OF SECURITY AT EVENT--}%
            <div class="form-group col-xs-12">
                <label class="control-label">What Type of Security will be at the Event?</label>
                <select class="form-control securityTypeSelect showReview" name="securityType"
                        data-reviewName="What Type of Security will be at the Event?" id="securityType">
                    <option value="invalid">None</option>
                    <option value="Unarmed Security">Unarmed Crowd Control Security</option>
                    <option value="Armed Security">Armed Security</option>
                    <option value="Other Security">Other</option>
                </select>
            </div>
            %{--SECURITY GUARDS CONTAINER--}%
            <div id="securityContainer" style="display:none">
                %{--NAME OF SECURITY--}%
                <div class="form-group col-xs-12">
                    <label for="securityName">Name of security</label>
                    <input type="text" class="form-control showReview" name="securityName" id="securityName"
                           data-reviewName="Name of security"
                           placeholder=""/>
                </div>
                %{--SECURITY INDEPENDENT FIRM Y/N--}%
                <div class="form-group col-xs-12">
                    <div class="">
                        <label>Is above handled by an independent firm?</label><br>
                        <input type="radio" name="independentFirmSecurity"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Is above handled by an independent firm?"
                               id="independentFirmSecurityYes_RadioButton"> Yes
                        <input type="radio" name="independentFirmSecurity"
                               class=""
                               value="No"
                               data-reviewName="Is above handled by an independent firm?"
                               id="independentFirmSecurityNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>
                %{--NUMBER OF SECURITY GUARDS--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="numberOfGuards">Number of Guards:</label>
                        <input type="number" class="form-control securityGuards" name="numberOfGuards"
                               placeholder=""
                               data-reviewname="Number of Guards:"
                               id="numberOfGuards">
                    </div>
                </div>
                %{--DETAILS OF SECURITY OR FIRM--}%
                <div class="form-group col-xs-12">
                    <label for="securityDetails">Provide details of Security Firm or Individual(s) in charge of security for the event</label>
                    <input type="text" class="form-control showReview" name="securityDetails" id="securityDetails"
                           data-reviewName="Provide details of Security Firm or Individual(s) in charge of security for the event"
                           placeholder=""/>
                </div>
                %{--DETAILS OF SECURITY ANTI TERRORISM--}%
                <div class="form-group col-xs-12">
                    <label for="securityAntiTerrorism">Describe anti-terrorism precautions/measures/detection for weapons and explosives procedure</label>
                    <input type="text" class="form-control showReview" name="securityAntiTerrorism"
                           id="securityAntiTerrorism"
                           data-reviewName="Describe anti-terrorism precautions/measures/detection for weapons and explosives procedure"
                           placeholder=""/>
                </div>
            </div>

            %{--MEDICAL HEADER--}%
            <div class="col-xs-12">
                <label for="medicalHeader"><b>Medical:</b></label>
            </div>
            %{--TYPE OF FIRST AID AT EVENT--}%
            <div class="form-group col-xs-12">
                <label class="control-label">What Type of First Aid will be available the Event?</label>
                <select class="form-control firstAidTypeSelect showReview" name="firstAidType"
                        data-reviewName="What Type of First Aid will be available the Event?" id="firstAidType">
                    <option value="invalid">None</option>
                    <option value="City Paramedics">City Paramedics</option>
                    <option value="Venue Staff">Venue Staff</option>
                </select>
            </div>
            %{--MEDICAL QUESTION CONTAINER--}%
            <div id="medicalContainer" style="display:none">
                %{--NUMBER OF MEDICAL PERSONNEL--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="numberMedical">Number of medical personnel:</label>
                        <input type="number" class="form-control numberMedical" name="numberMedical"
                               placeholder=""
                               data-reviewname="Number of medical personnel:"
                               id="numberMedical">
                    </div>
                </div>
                %{--N IS APPLICANT INDEMNIFIED BY WRITTEN CONTRACT MEDICAL Y/N--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>Is applicant indemnified by written contract? (EMT)</label><br>
                        <input type="radio" name="medicalIndemnified"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Is applicant indemnified by written contract (EMT)?"
                               id="medicalIndemnifiedYes_RadioButton"> Yes
                        <input type="radio" name="medicalIndemnified"
                               class=""
                               value="No"
                               data-reviewName="Is applicant indemnified by written contract (EMT)?"
                               id="medicalIndemnifiedNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>
                %{--ATTACHMENT CONTAINER CONFIRM APPLICANT INDEMNIFIED AND HELD HARMLESS--}%
                <div class="row" id="medicalAttachContainer" style="margin-bottom: 20px; display:none">
                    <div class="col-xs-3" style="margin-left:20px">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Attach File</span>
                                <input name="medicalFile" type="file" class="file" id="medicalFile"
                                       style="width:120px"/>
                            </div>
                        </form>
                    </div>

                    <div class="col-xs-8">
                        <small>Confirm applicant is indemnified and held harmless by written contract</small>
                    </div>

                </div>
                %{--MEDICAL OUTSIDE OR ON SITE Y OUT /N ON--}%
                <div class="form-group col-xs-12">
                    <div class="">
                        <label>Will EMT's be Off-Site or On-Site?</label><br>
                        <input type="radio" name="emtOutsideOnsite"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Will EMT's be Outside or On-Site?"
                               id="emtOutsideOnsiteYes_RadioButton">Off Site
                        <input type="radio" name="emtOutsideOnsite"
                               class=""
                               value="No"
                               data-reviewName="Will EMT's be Outside or On-Site?"
                               id="emtOutsideOnsiteNo_RadioButton"
                               checked="checked"> On Site
                    </div>
                </div>
                %{--OFFSITE RESPONSE TIME--}%
                <div class="form-group col-xs-12">
                    <label for="responseTimeEMT">What is the Off Site response time?</label>
                    <input type="text" class="form-control showReview" name="responseTimeEMT" id="responseTimeEMT"
                           data-reviewName="What is the OffSite response time?"
                           placeholder=""/>
                </div>
                %{--MEDICAL EMPLOYEES Y/N--}%
                <div class="form-group col-xs-12">
                    <div class="">
                        <label>Are EMT's employees?</label><br>
                        <input type="radio" name="emtEmployees"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Are EMT's employees?"
                               id="emtEmployeesYes_RadioButton">Yes
                        <input type="radio" name="emtEmployees"
                               class=""
                               value="No"
                               data-reviewName="Are EMT's employees?"
                               id="emtEmployeesNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>
                %{--MEDICAL INSURED Y/N--}%
                <div class="form-group col-xs-12">
                    <div class="">
                        <label>If EMT's are not employees, are EMT's insured elsewhere?</label><br>
                        <input type="radio" name="emtInsured"
                               class="showReview"
                               value="Yes"
                               data-reviewName="If EMT's are not employees, are EMT's insured elsewhere?"
                               id="emtInsuredYes_RadioButton">Yes
                        <input type="radio" name="emtInsured"
                               class=""
                               value="No"
                               data-reviewName="If EMT's are not employees, are EMT's insured elsewhere?"
                               id="emtInsuredNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>
                %{--CARRIER NAME FOR MEDICAL INSURED--}%
                <div class="form-group col-xs-12">
                    <label for="carrierName">Carrier's Name</label>
                    <input type="text" class="form-control showReview" name="carrierName" id="carrierName"
                           data-reviewName="Carrier's Name"
                           placeholder=""/>
                </div>
                %{--TYPE OF FIRE PROTECTION AT EVENT--}%
                <div class="form-group col-xs-12">
                    <label class="control-label">What Type of Fire Protection will be available the Event?</label>
                    <select class="form-control fireProtectionTypeSelect showReview" name="fireProtectionType"
                            data-reviewName="What Type of Fire Protection will be available the Event?"
                            id="fireProtectionType">
                        <option value="invalid" selected="selected">None</option>
                        <option value="Extinguishers" selected="selected">Extinguishers</option>
                        <option value="Municipal" selected="selected">Municipal</option>
                        <option value="Volunteer" selected="selected">Volunteer</option>
                    </select>
                </div>
            </div>

        </div>

        <div class="col-xs-6">
            %{--CAMPING HEADER--}%
            <div class="col-xs-12">
                <label for="campingHeader"><b>Camping:</b></label>
            </div>
            %{--NUMBER OF CAMPERS--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="campers">Number of campers:</label>
                    <input type="number" class="form-control campers" name="campers"
                           placeholder=""
                           data-reviewname="Number of medical campers:"
                           id="campers">
                </div>
            </div>
            %{--NUMBER OF CAMP SITES--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="campSite">Number of camp sites:</label>
                    <input type="number" class="form-control campSite" name="campSite"
                           placeholder=""
                           data-reviewname="Number of camp sites:"
                           id="campSite">
                </div>
            </div>
            %{--NUMBER OF CAMPERS PER DAY--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="campersPerDay">Number of campers per day:</label>
                    <input type="number" class="form-control campersPerDay" name="campersPerDay"
                           placeholder=""
                           data-reviewname="Number of campers per day:"
                           id="campersPerDay">
                </div>
            </div>
            %{--NUMBER OF CAMPERS PER SITE--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="campersPerSite">Number of campers per site:</label>
                    <input type="number" class="form-control campersPerSite" name="campersPerSite"
                           placeholder=""
                           data-reviewname="Number of campers per site:"
                           id="campersPerSite">
                </div>
            </div>
            %{--OVERNIGHT EVENT Y/N--}%
            <div class="col-xs-12 form-group">
                <div class="">
                    <label>Will there be overnight camping?</label><br>
                    <input type="radio" name="overnight"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Will there be overnight camping?"
                           id="overnightYes_RadioButton"> Yes
                    <input type="radio" name="overnight"
                           class=""
                           value="No"
                           data-reviewName="Will there be overnight camping?"
                           id="overnightNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>
            %{--OVERNIGHT EVENT CONTAINER // DESCRIBE EVENT // WILL THERE BE CHILDREN--}%
            <div id="overnightContainer" style="display:none">
                %{--OVERNIGHT SECURITY Y/N--}%
                <div class="col-xs-12 form-group">
                    <div class="">
                        <label>Will there be overnight camping security and patrol?</label><br>
                        <input type="radio" name="overnightSecurity"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Will there be overnight camping security and patrol?"
                               id="overnightSecurityYes_RadioButton"> Yes
                        <input type="radio" name="overnightSecurity"
                               class=""
                               value="No"
                               data-reviewName="Will there be overnight camping security and patrol?"
                               id="overnightSecurityNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>
                %{--PROVIDE FULL DESCRIPTION OF OVERNIGHT SECURITY--}%
                <div class="form-group col-xs-12 ">
                    <label for="descriptionOfOvernightEvent">Provide full description of overnight security</label>
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
                %{--ARE EMTs PROVIDED ON CAMPGROUNDS Y/N--}%
                <div class="col-xs-12 form-group">
                    <div class="">
                        <label>Are EMT's provided on campgrounds?</label><br>
                        <input type="radio" name="emtCampgrounds"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Are EMT's provided on campgrounds?"
                               id="emtCampgroundsYes_RadioButton"> Yes
                        <input type="radio" name="emtCampgrounds"
                               class=""
                               value="No"
                               data-reviewName="Are EMT's provided on campgrounds?"
                               id="emtCampgroundsNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>
                %{--WHAT ARE THE CURFEW HOURS?--}%
                <div class="form-group col-xs-12 ">
                    <label for="curfewHours">What are the curfew hours?</label>
                    <input type="text" class="form-control showReview" name="curfewHours"
                           id="curfewHours"
                           data-reviewName="What are the curfew hours?"
                           placeholder=""/>
                </div>
                %{--ATTACHMENT CONTAINER PROVIDE CAMPING GROUND RULES--}%
                <div class="row" id="campRulesAttachContainer" style="margin-bottom: 20px; display:none">
                    <div class="col-xs-3" style="margin-left:20px">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Attach File</span>
                                <input name="campRulesFile" type="file" class="file" id="campRulesFile"
                                       style="width:120px"/>
                            </div>
                        </form>
                    </div>

                    <div class="col-xs-8">
                        <small>Provide camping rules</small>
                    </div>

                </div>
                %{--WILL THERE BE BONFIRES ON THE CAMP GROUNDS Y/N--}%
                <div class="col-xs-12 form-group">
                    <div class="">
                        <label>Will there be bonfires on the camp grounds?</label><br>
                        <input type="radio" name="bonfires"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Will there be bonfires on the camp grounds?"
                               id="bonfiresYes_RadioButton"> Yes
                        <input type="radio" name="bonfires"
                               class=""
                               value="No"
                               data-reviewName="Will there be bonfires on the camp grounds?"
                               id="bonfiresNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>
                %{--WHAT PRECAUTIONS ARE IN PLACE TO PREVENT OUTSIDE ALCOHOL?--}%
                <div class="form-group col-xs-12 ">
                    <label for="precautionsAlcohol">What precautions are in place to prevent outside alcohol?</label>
                    <input type="text" class="form-control showReview" name="precautionsAlcohol"
                           id="precautionsAlcohol"
                           data-reviewName="What precautions are in place to prevent outside alcohol?"
                           placeholder=""/>
                </div>
            </div>

            %{--PARKING HEADER--}%
            <div class="col-xs-12">
                <label for="parkingHeader"><b>Parking:</b></label>
            </div>
            %{--ARE YOU RESPONSIBLE FOR PARKING? Y/N --}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Are you responsible for Parking?</label><br>
                    <input type="radio" name="responsibleForParking" class="showReview" value="Yes"
                           data-reviewname="Are you responsible for Parking?"
                           id="responsibleForParkingYes_RadioButton"> Yes
                    <input type="radio" name="responsibleForParking" class="" value="No"
                           data-reviewname="Are you responsible for Parking?"
                           id="responsibleForParkingNo_RadioButton" checked="checked"> No
                </div>
            </div>
            %{--PARKING CONTAINER--}%
            <div id="parkingContainer" style="display:none">
                %{--N IS APPLICANT INDEMNIFIED BY WRITTEN CONTRACT PARKING Y/N--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>Is applicant indemnified by written contract? (parking)</label><br>
                        <input type="radio" name="parkingIndemnified"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Is applicant indemnified by written contract (parking)?"
                               id="parkingIndemnifiedYes_RadioButton"> Yes
                        <input type="radio" name="parkingIndemnified"
                               class=""
                               value="No"
                               data-reviewName="Is applicant indemnified by written contract (parking)?"
                               id="parkingIndemnifiedNo_RadioButton"
                               checked="checked"> No
                    </div>
                </div>
                %{--ATTACHMENT CONTAINER PARKING--}%
                <div class="row" id="parkingAttachContainer" style="margin-bottom: 20px; display:none">
                    <div class="col-xs-3" style="margin-left:20px">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Attach File</span>
                                <input name="parkingFile" type="file" class="file" id="parkingFile"
                                       style="width:120px"/>
                            </div>
                        </form>
                    </div>

                    <div class="col-xs-8">
                        <small>Provide Certificate adding Applicant as Additional Insured</small>
                    </div>

                </div>
                %{--PARKING CONTAINER--}%
                <div id="parkingContainer" style="display:none">
                    %{--IS THERE VALET PARKING?--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Is there valet parking?</label><br>
                            <input type="radio" name="valetParking" class="parking" value="Yes"
                                   data-reviewname="Is there valet parking?"
                                   id="valetParkingYes_RadioButton"> Yes
                            <input type="radio" name="valetParking" class="" value="No"
                                   data-reviewname="Is there valet parking?"
                                   id="valetParkingNo_RadioButton" checked="checked"> No
                        </div>
                    </div>
                    %{--PATROLLED BY SECURITY?--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Parking secured and well maintained with 24 hr security guards?</label><br>
                            <input type="radio" name="patrolledParking" class="parking" value="Yes"
                                   data-reviewname="Parking secured and well maintained with 24 hr security guards?"
                                   id="patrolledParkingYes_RadioButton"> Yes
                            <input type="radio" name="patrolledParking" class="" value="No"
                                   data-reviewname="Parking secured and well maintained with 24 hr security guards?"
                                   id="patrolledParkingNo_RadioButton" checked="checked"> No
                        </div>
                    </div>
                    %{--WHAT IS THE SQUARE FOOTAGE OF THE PARKING ARE--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="parkingSquareFoot">What is the square footage of the parking area?</label>
                            <input type="text" class="form-control parking" name="parkingSquareFoot" placeholder=""
                                   data-reviewname="What is the square footage of the parking area?"
                                   id="parkingSquareFoot">
                        </div>
                    </div>
                    %{--TYPE OF PATHWAY--}%
                    <div class="form-group col-xs-12">
                        <label class="control-label">Type of parking</label>
                        <select class="form-control parkingTypeSelect showReview" name="parkingType"
                                data-reviewName="What Type of Security will be at the Event?" id="parkingType">
                            <option value="invalid">None</option>
                            <option value="Dirt">Dirt</option>
                            <option value="Gravel">Gravel</option>
                            <option value="Pathway">Pathway</option>
                            <option value="Unpaved">Unpaved</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            %{--WEATHER HEADER--}%
            <div class="col-xs-12">
                <label for="weatherHeader"><b>Weather:</b></label>
            </div>
            %{--WEATHER MONITORING PLANNING FOR EVENT Y/N --}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>A weather monitoring service or meteorologist is employed in planning, forecasting, and consulting for the Event</label><br>
                    <input type="radio" name="weather" class="showReview" value="Yes"
                           data-reviewname="A weather monitoring service or meteorologist is employed in planning, forecasting, and consulting for the Event"
                           id="weatherYes_RadioButton"> Yes
                    <input type="radio" name="weather" class="" value="No"
                           data-reviewname="Are you responsible for Parking?"
                           id="weatherNo_RadioButton" checked="checked"> No
                </div>
            </div>
            %{--WEATHER QUESTION CONTAINER--}%
            <div id="weatherContainer" style="display:none">
                %{--A WRITTEN WEATHER CONTINGENCY PLAN IS IN PLACE Y/N --}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>A written weather contingency plan is in place</label><br>
                        <input type="radio" name="weatherPlan" class="showReview" value="Yes"
                               data-reviewname="A written weather contingency plan is in place"
                               id="weatherPlanYes_RadioButton"> Yes
                        <input type="radio" name="weatherPlan" class="" value="No"
                               data-reviewname="A written weather contingency plan is in place"
                               id="weatherPlanNo_RadioButton" checked="checked"> No
                    </div>
                </div>
                %{--PLANNING AND MONITORING INCLUDE--}%
                <div class="form-group col-xs-12">
                    %{--HAZARDS--}%
                    <label for="hazardsCheckBoxes">Planning and monitoring include</label>
                    %{--THESE RISK WILL DISABLE INDICATION--}%
                    %{--THUNDERSTORM ALERT CHECKBOX--}%
                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox showReview"
                                                    data-reviewName="Planning and monitoring include:"
                                                    name="thunderstorm"
                                                    id="thunderstormCheckbox"
                                                    value="thunderstorm"/> Thunderstorm Alert</p>
                    %{--HEAT ALERTS CHECKBOX--}%
                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox showReview"
                                                    data-reviewName="Planning and monitoring include:"
                                                    name="heat"
                                                    id="heatCheckbox"
                                                    value="heat"/> Heat Alert</p>
                    %{--SEVERE THUNDERSTORM ALERTS CHECKBOX--}%
                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox showReview"
                                                    data-reviewName="Planning and monitoring include:"
                                                    name="severeThunderstorm"
                                                    id="severeThunderstormCheckbox"
                                                    value="Severe Thunderstorm Alerts"/> Severe Thunderstorm Alerts</p>
                    %{--HEAVY PRECIPITATION CHECKBOX--}%
                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox showReview"
                                                    data-reviewName="Planning and monitoring include:"
                                                    name="heavyPrecipitation"
                                                    id="heavyPrecipitationCheckbox"
                                                    value="Heavy Precipitation Alerts"/> Heavy Precipitation Alerts</p>
                    %{--INDOOR VENUES NO SPRINKLER CHECKBOX--}%
                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox showReview"
                                                    data-reviewName="Planning and monitoring include:"
                                                    name="surfaceWind"
                                                    id="surfaceWindCheckbox"
                                                    value="Surface Wind Alerts"/> Surface Wind Alerts</p>
                    %{--NO LIQUOR LICENSE SALES CHECKBOX--}%
                    <p class="control-label"><input type="checkbox"
                                                    class="riskHazard productionInvolvesCheckbox showReview"
                                                    data-reviewName="Planning and monitoring include:"
                                                    name="nationalWeather"
                                                    id="nationalWeatherCheckbox"
                                                    value="National Weather Service"/> National Weather Service</p>

                </div>
            </div>

        </div>
    </div>
</div>

<div id="coverageCheckboxesDiv">
    <div class="panel-body row" id="undefined_panelBody">
        %{--COVERAGE OPTION TABLE HEADER--}%
        <div id="coverageTableContainer">
            <div class="col-xs-6">
                <label class="control-label">Please select the Coverages being requested:</label>
            </div>

            <div class="col-xs-6">
                <div class="col-xs-9">
                    <label class="control-label"><u>Coverages:</u></label>
                </div>

                <div class="col-xs-3">
                    <label class="control-label"><u>Limits:</u></label>
                </div>
            </div>
        </div>
        %{--COMMERCIAL GENERAL LIABILITY--}%
        <div class="row">
            <div class="col-xs-6">
                %{--COMMERCIAL GENERAL LIABILITY REQUESTED Y/N--}%
                <div class="form-group col-xs-12">
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
                %{--UMBRELLA REQUESTED Y/N--}%
                <div class="form-group col-xs-12">
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
                %{--BLANKET REQUESTED Y/N--}%
                <div class="form-group col-xs-12">
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
                %{--WAIVER OF SUBROGATION REQUESTED Y/N--}%
                <div class="form-group col-xs-12">
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
                %{--ALCOHOL REQUESTED Y/N--}%
                <div class="form-group col-xs-12">
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
                %{--ALCOHOL CONTAINER / ADDITION QUESTION--}%
                <div class="alcoholSaleContainer" style="display:none">
                    %{--WHAT IS THE ESTIMATED TOTAL SALES RECEIPTS--}%
                    <div class="form-group effectsTotalPremium col-xs-12">
                        <label for="estimatedTotalSalesReceipts">What is the Estimated Total Sales Receipts?</label>
                        <input type="text" id="alcoholSales" class="alcoholSales showReview form-control"
                               name="alcoholSales"
                               data-reviewName="What is the Estimated Total Sales Receipts?"
                               placeholder="$USD"/>
                    </div>
                    %{--WHAT KIND OF LIQUOR IS SERVED?--}%
                    <div class="col-xs-12">
                        <label for="whatKindOfLiquorIsServed">What kind of liquor is served? (please enter percentages)</label>

                        <div class="form-group row">
                            %{--<label for="whatKindOfLiquorIsServed">What kind of liquor is served? (please enter </label>--}%

                            <div class="col-xs-4">
                                <input type="text" id="whatKindOfLiquorIsServedBeer"
                                       class="whatKindOfLiquorIsServed showReview form-control"
                                       name="whatKindOfLiquorIsServed"
                                       data-reviewName="What kind of liquor is served? Beer:"
                                       placeholder="Beer %"/>
                            </div>

                            <div class="col-xs-4">
                                <input type="text" id="whatKindOfLiquorIsServedWine"
                                       class="whatKindOfLiquorIsServed showReview form-control"
                                       name="whatKindOfLiquorIsServed"
                                       data-reviewName="What kind of liquor is served? Wine:"
                                       placeholder="Wine %"/>
                            </div>

                            <div class="col-xs-4">
                                <input type="text" id="whatKindOfLiquorIsServedFullBar"
                                       class="whatKindOfLiquorIsServed showReview form-control"
                                       name="whatKindOfLiquorIsServed"
                                       data-reviewName="What kind of liquor is served? Full bar:"
                                       placeholder="Full Bar %"/>
                            </div>
                        </div>
                    </div>
                    <br>
                    %{--IF SUBCONTRACTED OUT, DO YOU RECEIVE A COMMISSION ON THE LIQUOR SALE?--}%
                    <div class="form-group col-xs-12">
                        <label>If subcontracted out, do you receive commission on the liquor sales?</label><br>
                        <input type="radio" name="subcontractedCommission"
                               class="showReview"
                               value="Yes"
                               data-reviewName="If Subcontracted out, do you receive commission on the liquor sales?"
                               id="subcontractedCommissionYes_RadioButton"> Yes
                        <input type="radio" name="subcontractedCommission"
                               class=""
                               value="No"
                               data-reviewName="If Subcontracted out, do you receive commission on the liquor sales?"
                               id="subcontractedCommissionNo_RadioButton"
                               checked="checked"> No
                    </div>
                    %{--ARE LOCAL LIQUOR LAWS GOVERNING SALES TO MINORS/INTOXICATED FOLLOWED?--}%
                    <div class="form-group col-xs-12">
                        <label>Are local liquor laws governing sales to minors/intoxicated followed?</label><br>
                        <input type="radio" name="localLiquorLawsMinors"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Are local liquor laws governing sales to minors/intoxicated followed?"
                               id="localLiquorLawsMinorsYes_RadioButton"> Yes
                        <input type="radio" name="localLiquorLawsMinors"
                               class=""
                               value="No"
                               data-reviewName="Are local liquor laws governing sales to minors/intoxicated followed?"
                               id="localLiquorLawsMinorsNo_RadioButton"
                               checked="checked"> No
                    </div>
                    %{--WHAT CONTROLS ARE USED?--}%
                    <div class="form-group col-xs-12">
                        <label for="whatControlsAreUsed">What controls are used?</label>
                        <input type="text" id="whatControlsAreUsed"
                               class="whatControlsAreUsed showReview form-control"
                               name="whatControlsAreUsed"
                               data-reviewName="What controls are used?"
                               placeholder="Ex: wristbands"/>
                    </div>
                </div>
                %{--EQUIPMENT COVERAGE REQUESTED Y/N--}%
                <div class="form-group col-xs-12">
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
                                   placeholder="Equipment inventory and procedures"/>
                        </div>
                    </div>
                </div>
                %{--RESPONSIBLE FOR PREMISES Y/N--}%
                <div class="form-group col-xs-12">
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
                %{--BROKER FEE--}%
                <div class="form-group col-xs-12">
                    <label class="control-label">Broker Fee</label>
                    <input class="form-control effectsTotalPremium brokerFeeInput" id="brokerFeeInput"
                           type="text"
                           placeholder="$USD"
                           name="brokerFee"/>
                </div>

            </div>

            <div class="col-xs-6">
                %{--TABLE CGL--}%
                <div id="commercialGeneralLiabilityRequestedContainer" style="display:none">
                    <div class="tableCGL" id="commercialGeneralLiabilityProduct">
                        <div class="row">
                            <div class="col-xs-9 ">
                                <strong class="coverageCodeString"
                                        style="font-size:13px">Commercial General Liability</strong>
                                <span class="productID_pull" data-cov="CGL" style="display:none">SPEVENTS</span>
                            </div>

                            <div class="col-xs-3">
                                <span>-</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CGL" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">General Aggregate Limit</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$2,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CGL">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Products & Completed Operations Agg Limit</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CGL"
                             style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Personal & Advertising Injury (Any one person or organization)</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>

                        </div>

                        <div class="row lobRow SPEVENTS CGL">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Each Occurrence Limit</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CGL"
                             style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Damage to Premises Rented to You Limit</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$100,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CGL">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Medical Payments</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">Excluded</span>
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
                            <div class="col-xs-9">
                                <strong class="coverageCodeString" style="font-size:13px">Umbrella</strong>
                                <span class="productID_pull" data-cov="CUMB" style="display:none">SPEVENTS</span>
                            </div>

                            <div class="col-xs-3 ">
                                <span>-</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CUMB" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Each Occurrence Limit (Liability Coverage)</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CUMB">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Personal & Advertising Injury Limit (Any one person or organization)</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CUMB" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Aggregate Limit (Liability Coverage) (except with respect to covered autos)</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CUMB">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Covered Auto Aggregate Limit</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS CUMB" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Self-Insured Retention</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">nil</span>
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
                %{--TABLE ALCOHOL--}%
                <div class="alcoholSaleTableContainer" style="display:none">
                    <div class="tableAlcohol" id="alcoholSaleProduct">
                        <div class="row">
                            <div class="col-xs-9 ">
                                <strong class="coverageCodeString"
                                        style="font-size:13px">Liquor Liability</strong>
                                <span class="productID_pull" data-cov="ALCOHOL" style="display:none">SPEVENTS</span>
                            </div>

                            <div class="col-xs-3">
                                <span>-</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS ALCOHOL" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Each common cause</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS ALCOHOL">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Aggregate limit</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row" style="border-top: 1px solid rgba(0, 0, 0, 0.19);">
                            <div class="col-xs-10 "><strong style="font-size:13px"></strong>
                            </div>
                        </div>
                    </div>
                </div>
                %{--TABLE ALCOHOL--}%
                <br>
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
                                        <span class="premiumSpan effectsTotal"
                                              id="commercialGeneralLiabilityPremiumCost"></span>
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
                                </div>
                            </div>
                        </div>

                        %{--TOTAL PREMIUM--}%
                        <div class="premDistributionInsert">
                            <div class="totalSaleContainer">
                                <div class="row TotalPremiumRow">
                                    <div class="col-xs-4">
                                        <strong>
                                            <span class="lineOfBusinessSpan" id="totalSalePremiumName">Total:</span>
                                        </strong>
                                    </div>

                                    <div class="col-xs-3">
                                        <span class="premiumSpan productTotalPremium SPEVENTS totalPremiumSpan"
                                              id="totalSalePremiumCost"></span>
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
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                %{--Premium--}%
            </div>
        </div>

        <div class="col-xs-12">
            <h5>Terms</h5>
            <span class="spTerms" id="termsInsert"
                  style="font-size: 12px; white-space: pre-line;display:none">Subject to:
            Audience capacity cannot exceed 5,000.


            EXCLUSIONS:
            - Drone operations
            - Rap music performances
            - Performances with stage diving, reckless stage antics
            - Outdoor farmland
            - Indoor venues that are not sprinklered
            - Concessionaires selling liquor without a liquor license
            - Events with no formal written evacuation plan
            - Overnight camping
            - Mechanical rides or similar carnival rides and attractions


            NOTE: Descriptions above are for summary purposes only. For a detailed description of the terms of the policy, please refer to the policy form and any endorsements indicated. Specimens of all of the below policy forms and endorsements are available upon request. Please note that this Quote contains only a general description of coverage provided.


            EXCLUSIONS (GL 0029)

            Must be Last!
            </span>
        </div>
        <br>

        <div class="col-xs-12">
            <h5>Endorse</h5>
            <span class="spEndorsements" id="endorseInsert"
                  style="font-size: 12px; white-space: pre-line; display:none">Commercial General Liability
            CP DS 00 (10 00) - PROP:Commercial Property Coverage Part Declarations
            CP 00 10 (06 07) - PROP:Building and Personal Property Coverage Form
            CP 10 30 (06 07) - PROP:Causes of Loss - Special Form
            CP 00 90 (07 88) - PROP:Commercial Property Conditions
            CP 01 40 (07 06) - PROP:Exclusion of Loss Due to Virus or Bacteria
            CP 02 99 (06 07) - PROP:Cancellation Changes
            CP 10 32 (08 08) - PROP:Water Exclusion Endorsement
            PR 00 01 (06 10) - PROP:Commercial Property Coverage Form Extension A
            IL 09 35 (07 02) - PROP:Exclusion of Certain Computer-Related Losses
            IM 01 24 (10 10) - CIM:Commercial Inland Marine Coverage Part Declarations
            IM 00 49 (06 10) - CIM:Electronic Data Processing
            IM 01 30 (10 10) - CIM:Personal Property Floater Policy Supplemental Declarations
            IM 00 85 (06 10) - CIM:Personal Property Floater Policy
            IM 01 10 (06 10) - CIM:Third Party Property Damage Coverage
            IL 09 35 (07 02) - CIM:Exclusion of Certain Computer-Related Losses
            IL 01 02 (05 05) - CIM:California Changes, Actual Cash Value
            IL 01 04 (09 07) - CIM:California Changes
            IM 01 24 (10 10) - EFLTR:Commercial Inland Marine Coverage Part Declarations
            IL 09 35 (07 02) - EFLTR:Exclusion of Certain Computer-Related Losses
            IL 01 04 (09 07) - EFLTR:California Changes
            IM 00 49 (06 10) - EDP:Electronic Data Processing
            IL 01 04 (09 07) - EDP:California Changes
            CR DS 01 (08 07) - CRIME:Crime and Fidelity Coverage Part Declarations (Commercial Entities)
            CR 00 21 (05 06) - CRIME:Commercial Crime Coverage Forms (Loss Sustained Form)
            CR 07 50 (08 08) - CRIME:Amendment-Delete Provisions Regarding Certain Acts of Terrorism (Applicable to Crime/Fidelity Only)
            CR 20 09 (10 10) - CRIME:Amend Territorial Limits-Anywhere in the World
            CG DS 01 (10 01) - CGL:Commercial General Liability Declarations
            CG 00 01 (12 07) - CGL:Commercial General Liability Coverage Form
            CG 00 68 (05 09) - CGL:Recording and Distribution of Material or Information in Violation of Law Exclusion
            CG 21 46 (07 98) - CGL:Abuse or Molestation Exclusion
            CG 21 47 (12 07) - CGL:Employment Related Practices Endorsement
            CG 21 67 (12 04) - CGL:Fungi or Bacteria Exclusion
            CG 21 96 (03 05) - CGL:Silica or Silica-Related Dust Exclusion
            CG 20 34 (07 04) - CGL:Additional Insured Lessor of Leased Equipment Automatic Status When Required in Lease Agreement With You
            CG 20 23 (10 93) - CGL:Additional Insured Executors, Administrators, Trustees or Beneficiaries.
            CG 20 26 (07 04) - CGL:Additional Insured Designated Person or Organization Any person or organization when you and such person or organization have agreed in writing in a contract or agreement that such person or organization be added as an additional insured on your policy prior to performance of the agreement.
            CG 21 44 (07 98) - CGL:Limitation of Coverage to Designated Premises or Project: DICE and Commercial Media
            CG 21 71 (06 08) - CGL:Exclusion Of Other Acts Of Terrorism Committed Outside The United States; Cap On Losses From Certified Acts Of Terrorism
            CG 21 84 (01 08) - CGL:Exclusion of Certified Acts of Nuclear, Biological, Chemical Acts.
            CG 21 76 (01 08) - CGL:Exclusion of Punitive Damages Related to a Certified Act of Terrorism
            CG 21 75 (06 08) - CGL:Exclusion Certified Acts of Terrorism and Exclusion of Other Acts of Terrorism Committed Outside the United States
            GL 00 01 (06 10) - CGL:Absolute Asbestos Exclusion
            GL 00 02 (06 10) - CGL:Absolute Lead Exclusion
            GL 00 08 (06 10) - CGL:Amendment of Employment Definition (Temporary Employee)
            GL 00 19 (06 10) - CGL:Cross Liability Exclusion
            GL 00 29 (06 10) - CGL:Exclusion Designated Activities - Excludes all Stunts & Pyrotechnics until declared and approved in writing prior to exposure commencement.
            GL 00 30 (06 10) - CGL:Exclusion Fireworks With Exception for Concussion Effects, Flashpots and Smokepots
            GL 00 35 (06 10) - CGL:Exclusion Personal and Advertising Injury Liability - Entertainment Industry
            GL 0038 (06 10) - CGL:Exclusion–Sport, Athletic, Event, Exhibition or Performance Participants
            GL 00 41 (06 10) - CGL:Knowledge of Occurrence
            GL 00 42 (06 10) - CGL:Limitation No Stacking of Occurrence Limits of Insurance
            IL DS 00 (09 08) - CGL:Common Policy Declarations
            IL 00 17 (11 98) - CGL:Common Policy Conditions
            IL 00 21 (09 08) - CGL:Nuclear Energy Liability Exclusion Endorsement
            IL 09 85 (01 08) - CGL:Disclosure Pursuant to Terrorism Risk Insurance Act
            IL 09 86 (03 08) - CGL:Exclusion Of Certified Acts Of Terrorism Involving Nuclear, Biological, Chemical Or Radiological Terrorism; Cap On Covered Certified Acts Losses (If Terrorism Accepted)
            IL 00 01 (10 10) - CGL:Signature Page
            CA DS 03 (03 10) - NOAL:Business Auto Declarations
            AU 00 11 (09 10) - NOAL:Explanation of Premium Basis
            AU 00 13 (09 10) - NOAL:Mexico Endorsement
            AU 00 17 (09 10) - NOAL:Who is an Insured</span>
        </div>
    </div>
</div>


<div class="back up">
    %{--<div id="insuredInfo">--}%
    %{--<div class="col-xs-6">--}%
    %{--NAME OF PRINCIPAL--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="nameOfContactPrincipal">Name Of Principal</label>--}%
    %{--<input type="text" class="form-control showReview" name="nameOfPrincipal"--}%
    %{--data-reviewName="Name Of Principal"--}%
    %{--id="nameOfPrincipal" placeholder="Name of Principal"/>--}%
    %{--</div>--}%
    %{--PRINCIPAL EMAIL--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="principalContactEmail">Principal Contact Email Address</label>--}%
    %{--<input type="text" class="form-control showReview" name="PrincipalEmail" id="principalEmail"--}%
    %{--data-reviewName="Principal Email"--}%
    %{--placeholder="Principal Email"/>--}%
    %{--</div>--}%
    %{--PRINCIPAL PHONE--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="principalContactPhone">Principal Contact Phone Number</label>--}%
    %{--<input type="text" class="form-control showReview phoneNumberMask" name="PrincipalPhone"--}%
    %{--id="principalPhone"--}%
    %{--data-reviewName="Principal Phone"--}%
    %{--placeholder="Principal Phone"/>--}%
    %{--</div>--}%
    %{--INSURED CONTACT REP Y/N--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Does the Principal have a contact representative?</label><br>--}%
    %{--<input type="radio" name="contactRep"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Does the Principal have a contact representative?"--}%
    %{--id="contactRepYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="contactRep"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Does the Principal have a contact representative?"--}%
    %{--id="contactRepNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--INSURED CONTACT INFORMATION CONTAINER--}%
    %{--<div id="insuredContactInformationContainer" style="display:none">--}%
    %{--INSURED CONTACT PERSON--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="insuredContactPerson">Insured Contact Person</label>--}%
    %{--<input type="text" class="form-control showReview" name="InsuredContact" id="insuredContact"--}%
    %{--data-reviewName="Insured Contact Person"--}%
    %{--placeholder="Name of Insured Contact"/>--}%
    %{--</div>--}%
    %{--INSURED CONTACT EMAIL--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="insuredContactEmailAddress">Insured Contact Person's Email</label>--}%
    %{--<input type="text" class="form-control showReview" name="insuredContactEmail"--}%
    %{--id="insuredContactEmail"--}%
    %{--data-reviewName="Insured Contact Email"--}%
    %{--placeholder="Email"/>--}%
    %{--</div>--}%
    %{--INSURED CONTACT PHONE--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="InsuredContactPhoneNumber">Insured Contact Person's Phone Number</label>--}%
    %{--<input type="text" class="form-control showReview phoneNumberMask" name="insuredContactPhone"--}%
    %{--id="insuredContactPhone"--}%
    %{--data-reviewName="Insured Contact Phone Number"--}%
    %{--placeholder="Phone Number"/>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--</div>--}%
    %{--<div class="col-xs-6">--}%
    %{--STATE WHERE ENTITY ESTABLISHED--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="stateWhereEntityEstablished">State Where Entity Established</label>--}%
    %{--<input type="text" class="form-control showReview" name="whereEstablished" id="whereEstablished"--}%
    %{--data-reviewName="State Where Entity Established"--}%
    %{--placeholder=""/>--}%
    %{--</div>--}%
    %{--DOING BUSINESS AS--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="dbaName">Doing Business as; Name</label>--}%
    %{--<input type="text" class="form-control showReview" name="dbaName" id="dbaName"--}%
    %{--data-reviewName="DBA name"--}%
    %{--placeholder="DBA Name"/>--}%
    %{--</div>--}%
    %{--NUMBER OF YEARS EXPERIENCE--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="numberOfYearsOfExperience">Number of Years of Experience (Attach Bio / Resume)</label>--}%

    %{--<div class="col-xs-10 row">--}%
    %{--<input type="number" class="form-control showReview" name="numberOfYearsOfExperience"--}%
    %{--data-reviewName="Years Experience"--}%
    %{--id="numberOfYearsOfExperience" placeholder="# Years of Experience"/>--}%
    %{--</div>--}%
    %{--<div class="col-xs-2">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="experienceFile" type="file" class="file" id="experienceFile"--}%
    %{--style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%

    %{--<div class="row fileNameContainer" style="padding-top:6px; display:none">--}%
    %{--<div class="col-xs-9" style="text-align:right; font-size:11px">--}%
    %{--<span class="fileNameSpan" id="bioFileSpan">File Name</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--</div>--}%
    %{--PROMOTER Y/N--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Are you the promoter of sponsor of the event?</label><br>--}%
    %{--<input type="radio" name="promoter"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Are you the promoter of sponsor of the event?"--}%
    %{--id="promoterYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="promoter"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Are you the promoter of sponsor of the event?"--}%
    %{--id="promoterNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div id="riskSpecificInfo">--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-6">--}%
    %{--DESCRIBE PRIMARY BUSINESS OPERATIONS--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="describeBusinessOperations">Describe Primary Business Operations</label>--}%
    %{--<input type="text" class="form-control showReview" name="businessOperations" id="businessOperations"--}%
    %{--data-reviewName="Describe Primary Business Operations"--}%
    %{--placeholder="Describe"/>--}%
    %{--</div>--}%
    %{--DESCRIBE OTHER BUSINESS OPERATIONS--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="describeOtherBusinessOperations">Describe Other Business Operations</label>--}%
    %{--<input type="text" class="form-control showReview" name="otherBusinessOperations"--}%
    %{--id="otherBusinessOperations"--}%
    %{--data-reviewName="Describe Other Business Operations"--}%
    %{--placeholder="Describe"/>--}%
    %{--</div>--}%









    %{--SUB CONTRACTORS--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="whatServiceDoYouHireSubContractorsFor">What services, if any, do you hire Sub-Contractors for? (Attach contract copy)</label>--}%

    %{--<div class="col-xs-9 row">--}%
    %{--<input type="text" class="form-control showReview" name="subContractorService"--}%
    %{--id="subContractorService"--}%
    %{--data-reviewName="What services, if any, do you hire Sub-Contractors for?"--}%
    %{--placeholder="Describe"/>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="subContractFile" type="file" class="file" id="subContractFile"--}%
    %{--style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--TYPE OF SECURITY AT EVENT--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label class="control-label">What Type of Security will be at the Event?</label>--}%
    %{--<select class="form-control securityTypeSelect showReview" name="securityType"--}%
    %{--data-reviewName="What Type of Security will be at the Event?" id="securityType">--}%
    %{--<option value="invalid">None</option>--}%
    %{--<option value="Unarmed Security">Unarmed Crowd Control Security</option>--}%
    %{--<option value="Armed Security">Armed Security</option>--}%
    %{--<option value="Other Security">Other</option>--}%
    %{--</select>--}%
    %{--</div>--}%
    %{--NUMBER OF SECURITY GUARDS TABLE--}%
    %{--<div id="securityContainer" style="display:none">--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="numberOfGuards">Number of Guards:</label>--}%
    %{--<input type="number" class="form-control securityGuards" name="numberOfGuards"--}%
    %{--placeholder=""--}%
    %{--data-reviewname="Number of Guards:"--}%
    %{--id="numberOfGuards">--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--TYPE OF FIRST AID AT EVENT--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label class="control-label">What Type of First Aid will be available the Event?</label>--}%
    %{--<select class="form-control firstAidTypeSelect showReview" name="firstAidType"--}%
    %{--data-reviewName="What Type of First Aid will be available the Event?" id="firstAidType">--}%
    %{--<option value="invalid" selected="selected">None</option>--}%
    %{--<option value="City Paramedics" selected="selected">City Paramedics</option>--}%
    %{--<option value="Venue Staff" selected="selected">Venue Staff</option>--}%
    %{--</select>--}%
    %{--</div>--}%
    %{--TYPE OF FIRE PROTECTION AT EVENT--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label class="control-label">What Type of Fire Protection will be available the Event?</label>--}%
    %{--<select class="form-control fireProtectionTypeSelect showReview" name="fireProtectionType"--}%
    %{--data-reviewName="What Type of Fire Protection will be available the Event?"--}%
    %{--id="fireProtectionType">--}%
    %{--<option value="invalid" selected="selected">None</option>--}%
    %{--<option value="Extinguishers" selected="selected">Extinguishers</option>--}%
    %{--<option value="Municipal" selected="selected">Municipal</option>--}%
    %{--<option value="Volunteer" selected="selected">Volunteer</option>--}%
    %{--</select>--}%
    %{--</div>--}%
    %{--NUMBER OF PERFORMANCES LAST 12 MONTHS--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="numberOfPerformancesEventInLastYear">Number of Performances / Events in the last 12 Months</label>--}%
    %{--<input type="number" class="form-control showReview" name="numberOfPerformanceLastYear"--}%
    %{--placeholder=""--}%
    %{--id="numberOfPerformancesLastYear"--}%
    %{--data-reviewname="Number of Performances Events in the last 12 Months">--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--NUMBER OF PERFORMANCES NEXT 12 MONTHS--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="numberOfPerformancesEventInNextYear">Number of Performances / Events in the Next 12 Months</label>--}%
    %{--<input type="number" class="form-control showReview" name="numberOfPerformanceNextYear"--}%
    %{--placeholder=""--}%
    %{--id="numberOfPerformancesNextYear"--}%
    %{--data-reviewname="Number of Performances Events in the Next 12 Months">--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--WHAT IS NUMBER OF SEATS--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="numberOfSeatsInTheater">What is the number of seats in the Theater/Venue?</label>--}%
    %{--<input type="number" id="numberSeats" class=" showReview form-control" name="numberSeats"--}%
    %{--data-reviewname="What is the number of seats in the Theater/Venue"--}%
    %{--placeholder="Number of Seats">--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--TYPE OF SEATING--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label class="control-label">Type of Seating</label>--}%
    %{--<select class="form-control seatingTypeSelect showReview" name="seatingType"--}%
    %{--data-reviewname="Seating Type" id="seatingType">--}%
    %{--<option value="invalid" selected="selected">Permanent</option>--}%
    %{--<option value="pullDownSeat" selected="selected">Pull Down</option>--}%
    %{--<option value="portableChairSeat" selected="selected">Portable Chairs</option>--}%
    %{--<option value="stadiumSeat" selected="selected">Stadium</option>--}%
    %{--<option value="openAreaSeat" selected="selected">Open Area Seating</option>--}%
    %{--</select>--}%
    %{--</div>--}%
    %{--WILL THE EVENT BE HELD OUTDOORS--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Will the Event be held Outdoors?</label><br>--}%
    %{--<input type="radio" name="willEventBeHeldOutdoors"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Will the Event be held Outdoors?"--}%
    %{--id="willEventBeHeldOutdoorsYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="willEventBeHeldOutdoors"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Will the Event be held Outdoors?"--}%
    %{--id="willEventBeHeldOutdoorsNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--EVENT OUTDOORS CONTAINER--}%
    %{--<div id="eventOutdoorContainer" style="display:none">--}%

    %{--IS THE FACILITY FENCED?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Is the facility fenced?</label><br>--}%
    %{--<input type="radio" name="facilityFenced"--}%
    %{--class="eventOutdoor"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Is the facility fenced?"--}%
    %{--id="facilityFencedYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="facilityFenced"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Is the facility fenced?"--}%
    %{--id="facilityFencedNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--WHAT TYPE OF FENCE?--}%
    %{--<div id="fenceTypeContainer" style="display:none">--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="numberOfGuards">What is the type of Fence?</label>--}%
    %{--<input type="text" class="form-control facilityFence" name="fenceType" placeholder=""--}%
    %{--data-reviewname="What is the type of Fence?"--}%
    %{--id="fenceType">--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--DOES THE EVENT END PRIOR TO SUNDOWN?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Does the event end prior to sundown?</label><br>--}%
    %{--<input type="radio" name="eventEndBeforeSundown"--}%
    %{--class="eventOutdoor"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Does the event end prior to sundown?"--}%
    %{--id="eventEndBeforeSundownYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="eventEndBeforeSundown"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Does the event end prior to sundown?"--}%
    %{--id="eventEndBeforeSundownNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--IS THERE ADEQUATE LIGHTING FOR A NIGHT TIME EVENT?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Is there adequate lighting for a night time Event?</label><br>--}%
    %{--<input type="radio" name="adequateLighting"--}%
    %{--class="eventOutdoor"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Is there adequate lighting for a night time Event?"--}%
    %{--id="adequateLightingYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="adequateLighting"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Is there adequate lighting for a night time Event?"--}%
    %{--id="adequateLightingNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--ARE YOU RESPONSIBLE FOR PARKING?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Are you responsible for Parking?</label><br>--}%
    %{--<input type="radio" name="responsibleForParking" class="showReview" value="Yes"--}%
    %{--data-reviewname="Are you responsible for Parking?"--}%
    %{--id="responsibleForParkingYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="responsibleForParking" class="" value="No"--}%
    %{--data-reviewname="Are you responsible for Parking?"--}%
    %{--id="responsibleForParkingNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--PARKING CONTAINER--}%
    %{--<div id="parkingContainer" style="display:none">--}%
    %{--IS THERE VALET PARKING?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Is there valet parking?</label><br>--}%
    %{--<input type="radio" name="valetParking" class="parking" value="Yes"--}%
    %{--data-reviewname="Is there valet parking?"--}%
    %{--id="valetParkingYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="valetParking" class="" value="No"--}%
    %{--data-reviewname="Is there valet parking?"--}%
    %{--id="valetParkingNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--PATROLLED BY SECURITY?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Will the parking are be patrolled by security?</label><br>--}%
    %{--<input type="radio" name="patrolledParking" class="parking" value="Yes"--}%
    %{--data-reviewname="Will the parking are be patrolled by security?"--}%
    %{--id="patrolledParkingYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="patrolledParking" class="" value="No"--}%
    %{--data-reviewname="Will the parking are be patrolled by security?"--}%
    %{--id="patrolledParkingNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--WHAT IS THE SQUARE FOOTAGE OF THE PARKING ARE--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="parkingSquareFoot">What is the square footage of the parking area?</label>--}%
    %{--<input type="text" class="form-control parking" name="parkingSquareFoot" placeholder=""--}%
    %{--data-reviewname="What is the square footage of the parking area?"--}%
    %{--id="parkingSquareFoot">--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--ARE THERE ANY SWIMMING POOLS LAKES OR BODIES OF WATER?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Are there any swimming pools, lakes or bodies of water?</label><br>--}%
    %{--<input type="radio" name="bodiesOfWater" class="showReview" value="Yes"--}%
    %{--data-reviewname="Are there any swimming pools, lakes or bodies of water?"--}%
    %{--id="bodiesOfWaterYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="bodiesOfWater" class="" value="No"--}%
    %{--data-reviewname="Are there any swimming pools, lakes or bodies of water?"--}%
    %{--id="bodiesOfWaterNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--BODY OF WATER NEAR EVENT CONTAINER--}%
    %{--<div id="waterContainer" style="display:none">--}%
    %{--IS SWIMMING ALLOWED?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Is swimming allowed?</label><br>--}%
    %{--<input type="radio" name="swimmingAllowed" class="water" value="Yes"--}%
    %{--data-reviewname="Is swimming allowed?"--}%
    %{--id="swimmingAllowedYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="swimmingAllowed" class="" value="No"--}%
    %{--data-reviewname="Is swimming allowed?"--}%
    %{--id="swimmingAllowedNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--LIFE GUARD ON DUTY?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Life guard on duty?</label><br>--}%
    %{--<input type="radio" name="lifeGuard" class="water" value="Yes"--}%
    %{--data-reviewname="Life guard on duty?"--}%
    %{--id="lifeGuardYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="lifeGuard" class="" value="No"--}%
    %{--data-reviewname="Life guard on duty?"--}%
    %{--id="lifeGuardNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--IS WATER HAZARD FENCED?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Is water hazard fenced?</label><br>--}%
    %{--<input type="radio" name="waterHazardFenced" class="water" value="Yes"--}%
    %{--data-reviewname="Is water hazard fenced?"--}%
    %{--id="waterHazardFencedYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="waterHazardFenced" class="" value="No"--}%
    %{--data-reviewname="Is water hazard fenced?"--}%
    %{--id="waterHazardFencedNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--<div id="waterHazardNotFencedContainer" style="display:none">--}%
    %{--EXPLAIN IF NO TO WATER HAZARD FENCED--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="parkingSquareFoot">If No, give details</label>--}%
    %{--<input type="text" class="form-control waterHazardNotFenced" name="waterHazardNotFenced"--}%
    %{--placeholder=""--}%
    %{--data-reviewname="Is water hazard fenced? If No, give details"--}%
    %{--id="waterHazardNotFenced">--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--<div class="col-xs-6">--}%
    %{--WORK COMP COVERAGE REQUESTED Y/N--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Work Comp Coverage Requested?</label><br>--}%
    %{--<input type="radio" name="workCompCoverageRequested" class="showReview" value="Yes"--}%
    %{--data-reviewname="Work Comp Coverage Requested?"--}%
    %{--id="workCompCoverageRequestedYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="workCompCoverageRequested" class="" value="No"--}%
    %{--data-reviewname="Work Comp Coverage Requested?"--}%
    %{--id="workCompCoverageRequestedNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--WORK COMP CONTAINER / TABLE / ADDITIONAL QUESTION--}%
    %{--<div id="workCompCoverageRequestedContainer" style="display:none">--}%

    %{--STATE OF HIRE / TOTAL PAYROLL EACH STATE--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="stateOfHire">States of Hire &amp; Total Payroll Each State</label>--}%
    %{--<input type="text" class="form-control showReview" name="name" placeholder=""--}%
    %{--data-reviewname="States of Hire &amp; Total Payroll Each State"--}%
    %{--id="stateOfHireAndPayroll">--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--NAMES OF OFFICERS, TITLE, % OF OWNERSHIP--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="namesOfOfficers">Names of Officers, Title, % of Ownership</label>--}%
    %{--<input type="text" class="form-control showReview" name="name" placeholder=""--}%
    %{--data-reviewname="Names of Officers, Title, % of Ownership"--}%
    %{--id="namesOfficerTitleOwnership">--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--NAME OF OFFICERS TO BE EXCLUDED UNDER WORK COMP--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="namesOfOfficersExcluded">Name of Officers to be Excluded under WC</label>--}%
    %{--<input type="text" class="form-control showReview" name="name" placeholder=""--}%
    %{--data-reviewname="Name of Officers to be Excluded under WC"--}%
    %{--id="officersExcludedUnderWC">--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--TOTAL NUMBER OF EMPLOYEES--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="totalEmployees">Total Number of Employees</label>--}%
    %{--<input type="number" class="form-control showReview" name="name" placeholder=""--}%
    %{--id="totalNumEmployees"--}%
    %{--data-reviewname="Total Number of Employees">--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--TOTAL GROSS RECEIPTS--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="annualGrossReceipts">Total Gross Receipts</label>--}%
    %{--<input type="text" class="form-control showReview totalReceipts" name="name"--}%
    %{--placeholder="$USD" id="annualReceipts"--}%
    %{--data-reviewname="Total Gross Receipts">--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--TOTAL PAYROLL--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="annualPayroll">Total Payroll</label>--}%
    %{--<input type="text" class="form-control showReview totalPayroll" name="name"--}%
    %{--placeholder="$USD" id="annualPayroll"--}%
    %{--data-reviewname="Total Payroll">--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--PRIOR LOSSES--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-12">--}%
    %{--<label for="listOfPriorLosses">List and Describe all Prior Losses (Or Enter "None")</label>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row">--}%
    %{--<!--attach bio/resume if available-->--}%
    %{--<div class="form-group">--}%
    %{--<div class="col-xs-9">--}%
    %{--<input type="text" class="form-control showReview" name="listOfPriorLosses"--}%
    %{--id="listOfPriorLosses" data-reviewName="Prior Losses"--}%
    %{--placeholder="List/Describe Prior Losses"/>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="lossesFile" type="file" class="file" id="lossesFile"--}%
    %{--style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row fileNameContainer" style="padding-top:6px; display:none">--}%
    %{--<div class="col-xs-9" style="text-align:right; font-size:11px">--}%
    %{--<span class="fileNameSpan" id="lossesFileSpan">File Name</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<button type="button"--}%
    %{--class="btn btn-default btn-xs attachClearButton">Clear</button>--}%
    %{--</div>--}%

    %{--</div>--}%

    %{--</div>--}%

    %{--<br>--}%

    %{--TABLE WORK COMP--}%
    %{--<div class="tableWC" id="workCompProduct">--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-9">--}%
    %{--<strong class="coverageCodeString" style="font-size:13px">Work Comp</strong>--}%
    %{--<span class="productID_pull" data-cov="WC" style="display:none">SPEVENTS</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<span>-</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS WC" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Bodily Injury by Accident (each)</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS WC">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Bodily Injury by Disease (policy limit)</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS WC" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Bodily Injury by Disease (each employee)</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row" style="border-top: 1px solid rgba(0, 0, 0, 0.19);">--}%
    %{--<div class="col-xs-10 "><strong style="font-size:13px"></strong>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--TABLE WORK COMP--}%

    %{--</div>--}%
    %{--HIRED AND NON-OWNED AUTO LIABILITY REQUESTED Y/N--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<br>--}%
    %{--<label>Hired and Non-Owned Auto Liability Limits Requested?</label><br>--}%
    %{--<input type="radio" name="autoLiability" class="showReview" value="Yes"--}%
    %{--data-reviewname="Hired and Non-Owned Auto Liability Limits Requested?"--}%
    %{--id="autoLiabilityYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="autoLiability" class="" value="No"--}%
    %{--data-reviewname="Hired and Non-Owned Auto Liability Limits Requested?"--}%
    %{--id="autoLiabilityNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--HIRED AND NON-OWNED AUTO LIABILITY CONTAINER / TABLE / ADDITIONAL QUESTIONS--}%
    %{--<div class="costRentedVehiclesContainer" style="display:none">--}%

    %{--WHAT IS COST OF HIRE OF RENTED VEHICLES--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="costOfRentedVehicles">What is Cost of Hire of Rented Vehicles?</label>--}%
    %{--<input type="text" id="costVehicles" class="costVehicles showReview form-control"--}%
    %{--name="costVehicles"--}%
    %{--data-reviewname="What is Cost of Hire of Rented Vehicles" placeholder="$USD">--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--DO YOU REQUIRE OWNED SCHEDULED AUTO COVERAGE Y/N--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Do you require Owned Scheduled Auto Coverage?</label><br>--}%
    %{--<input type="radio" name="requireOwnedAutoCoverage" class="showReview" value="Yes"--}%
    %{--data-reviewname="Do you require Owned Scheduled Auto Coverage??"--}%
    %{--id="requireOwnedAutoCoverageYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="requireOwnedAutoCoverage" class="" value="No"--}%
    %{--data-reviewname="Do you require Owned Scheduled Auto Coverage??"--}%
    %{--id="requireOwnedAutoCoverageNo_RadioButton" checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--TABLE HIRED AND NON-OWNED AUTO LIABILITY --}%
    %{--<div class="tableNOAL" id="hiredNonOwnedAutoProduct">--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-9 ">--}%
    %{--<strong class="coverageCodeString"--}%
    %{--style="font-size:13px">Hired / Non-Owned Auto</strong>--}%
    %{--<span class="productID_pull" data-cov="NOAL" style="display:none">SPEVENTS</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<span>-</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS NOAL" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Hired Auto Liability - CSL</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%


    %{--<div class="row lobRow SPEVENTS NOAL">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Hired Auto Physical Damage</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">ACV Unlimited</span>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--<br>--}%

    %{--<div class="col-xs-12"--}%
    %{--style="border-top: 1px solid rgba(0, 0, 0, 0.19); border-bottom: 1px solid rgba(0, 0, 0, 0.19)">--}%
    %{--<div class="col-xs-10 "><strong style="font-size:13px"></strong>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--TABLE HIRED AND NON-OWNED AUTO LIABILITY --}%
    %{--</div>--}%
    %{--<br>--}%
    %{--WAIVER SIGNING Y/N--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label>Are Participants Signing Waivers??</label><br>--}%
    %{--<input type="radio" name="signingWaivers"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Are Participants Signing Waivers?"--}%
    %{--id="signingWaiversYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="signingWaivers"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Are Participants Signing Waivers?"--}%
    %{--id="signingWaiversNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--INSURANCE CANCELLED OR DECLINED Y/N--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<div class="">--}%
    %{--<label>Has your insurance have ever been cancelled or declined?</label><br>--}%
    %{--<input type="radio" name="insuranceCancelled"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Has your insurance have ever been cancelled or declined?"--}%
    %{--id="insuranceCancelledYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="insuranceCancelled"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Has your insurance have ever been cancelled or declined?"--}%
    %{--id="insuranceCancelledNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--INSURANCE CANCELLED OR DECLINE CONTAINER / ADDITIONAL QUESTION--}%
    %{--<div id="insuranceCancelledContainer" style="display:none">--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<input type="text" class=" showReview form-control" name="name"--}%
    %{--data-reviewName="Explain why it was cancelled or declined"--}%
    %{--placeholder="Please explain why it was cancelled or declined"--}%
    %{--id="insuredCancelledExplain"/>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--OVERNIGHT EVENT Y/N--}%
    %{--<div class="col-xs-12 form-group">--}%
    %{--<div class="">--}%
    %{--<label>Are there any overnight events?</label><br>--}%
    %{--<input type="radio" name="overnight"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Are there any overnight events?"--}%
    %{--id="overnightYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="overnight"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Are there any overnight events?"--}%
    %{--id="overnightNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--OVERNIGHT EVENT CONTAINER // DESCRIBE EVENT // WILL THERE BE CHILDREN--}%
    %{--<div id="overnightContainer" style="display:none">--}%

    %{--PROVIDE FULL DESCRIPTION OF OVERNIGHT EVENTS--}%
    %{--<div class="form-group col-xs-12 ">--}%
    %{--<label for="descriptionOfOvernightEvent">Provide full description of overnight events</label>--}%
    %{--<input type="text" class="form-control showReview" name="descriptionOvernight"--}%
    %{--id="descriptionOvernight"--}%
    %{--data-reviewName="Provide full description of overnight events"--}%
    %{--placeholder="Describe"/>--}%
    %{--</div>--}%

    %{--WILL THERE BE CHILDREN IN THESE OVERNIGHT EVENTS Y/N--}%
    %{--<div class="col-xs-12 form-group">--}%
    %{--<div class="">--}%
    %{--<label>Will there be children in these overnight events?</label><br>--}%
    %{--<input type="radio" name="overnightChildren"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Will there be children in these overnight events?"--}%
    %{--id="overnightChildrenYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="overnightChildren"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Will there be children in these overnight events?"--}%
    %{--id="overnightChildrenNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--ATTACHMENTS CONTAINER--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="fileAttachments">Required Attachments:</label>--}%

    %{--RENTAL AGREEMENT CONTAINER--}%
    %{--<div class="row" id="rentalAgreementAttachContainer" style="margin-bottom: 20px">--}%
    %{--<div class="col-xs-3" style="margin-left:20px">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="rentalAgreementFile" type="file" class="file" id="rentalAgreementFile"--}%
    %{--style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%

    %{--<div class="col-xs-8">--}%
    %{--<small>Please attach copy of "rental agreement or venue contract"</small>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--ATTACHMENT FOR RENTAL AGREEMENT--}%
    %{--<div class=" fileNameContainer row" style="padding-top:6px; display:none">--}%
    %{--<div class="col-xs-9" style="text-align:right; font-size:11px">--}%
    %{--<span class="fileNameSpan" id="rentalAgreementFileSpan">File Name</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--FLYER PRESS RELEASE ADVERTISING CONTAINER--}%
    %{--<div class="row" id="advertisingAttachContainer" style="margin-bottom: 20px">--}%
    %{--<div class="col-xs-3" style="margin-left:20px">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="advertisingFile" type="file" class="file" id="advertisingFile"--}%
    %{--style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%

    %{--<div class="col-xs-8">--}%
    %{--<small>Please attach copy of flyer, press release, advertising</small>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--ATTACHMENT FOR FLYER PRESS RELEASE ADVERTISING--}%
    %{--<div class=" fileNameContainer row" style="padding-top:6px; display:none">--}%
    %{--<div class="col-xs-9" style="text-align:right; font-size:11px">--}%
    %{--<span class="fileNameSpan" id="advertisingFileSpan">File Name</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--COPIES OF CERTIFICATES IF APPLICANT IS RESPONSIBLE FOR SECURITY / RIDES / ANIMALS CONTAINER--}%
    %{--<div class="row" id="securityRidesAnimalsAttachContainer" style="margin-bottom: 20px">--}%
    %{--<div class="col-xs-3" style="margin-left:20px">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="securityRidesAnimalsFile" type="file" class="file"--}%
    %{--id="securityRidesAnimalsFile" style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%

    %{--<div class="col-xs-8">--}%
    %{--<small>Please attach copies of certificates if applicant is responsible for security / rides / animals</small>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--ATTACHMENT FOR COPIES OF CERTIFICATES IF APPLICANT IS RESPONSIBLE FOR SECURITY / RIDES / ANIMALS--}%
    %{--<div class=" fileNameContainer row" style="padding-top:6px; display:none">--}%
    %{--<div class="col-xs-9" style="text-align:right; font-size:11px">--}%
    %{--<span class="fileNameSpan" id="securityRidesAnimalsFileSpan">File Name</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--LIST OF REQUIRED ADDITIONAL INSURED CONTAINER--}%
    %{--<div class="row" id="requiredAdditionalInsuredAttachContainer" style="margin-bottom: 20px">--}%
    %{--<div class="col-xs-3" style="margin-left:20px">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="requiredAdditionalInsuredFile" type="file" class="file"--}%
    %{--id="requiredAdditionalInsuredFile" style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%

    %{--<div class="col-xs-8">--}%
    %{--<small>Please attach list of required additional insured(s)</small>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--ATTACHMENT FOR LIST OF REQUIRED ADDITIONAL INSURED--}%
    %{--<div class=" fileNameContainer row" style="padding-top:6px; display:none">--}%
    %{--<div class="col-xs-9" style="text-align:right; font-size:11px">--}%
    %{--<span class="fileNameSpan" id="requiredAdditionalInsuredFileSpan">File Name</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--FACILITY DIAGRAM OUTDOOR EVENTS CONTAINER ((OUTDOOR ONLY))--}%
    %{--<div id="eventOutdoorContainer" style="display:none">--}%
    %{--FACILITY DIAGRAM OUTDOOR EVENTS CONTAINER--}%
    %{--<div class="row" id="facilityDiagramAttachContainer" style="margin-bottom: 20px">--}%
    %{--<div class="col-xs-3" style="margin-left:20px">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="facilityDiagramFile" type="file" class="file"--}%
    %{--id="facilityDiagramFile" style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%

    %{--<div class="col-xs-8">--}%
    %{--<small>Please attach facility diagram (outdoor events)</small>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--ATTACHMENT FOR RENTAL AGREEMENT--}%
    %{--<div class=" fileNameContainer row" style="padding-top:6px; display:none">--}%
    %{--<div class="col-xs-9" style="text-align:right; font-size:11px">--}%
    %{--<span class="fileNameSpan" id="facilityDiagramFileSpan">File Name</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--ATTACHMENTS CONTAINER--}%
    %{--HAZARDS PYRO / STUNTS / CONTAINERS FILE ATTACHMENT--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--HAZARDS--}%
    %{--<label for="hazardsCheckBoxes">Check additional Hazards if Applicable below:</label>--}%

    %{--DRONE CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="riskHazard productionInvolvesCheckbox showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="drone"--}%
    %{--id="droneCheckbox"--}%
    %{--value="Drone Operations"/> Drone Operations--}%
    %{--</p>--}%
    %{--PYROTECHNIC CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="riskHazard productionInvolvesCheckbox showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="rapMusicPerformance"--}%
    %{--id="rapMusicPerformanceCheckbox"--}%
    %{--value="Rap Music Performances"/> Rap Music Performances--}%
    %{--</p>--}%
    %{--PYROTECHNIC CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="riskHazard productionInvolvesCheckbox showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="stageDiving"--}%
    %{--id="stageDivingCheckbox"--}%
    %{--value="Performances with stage diving, reckless stage antics"/> Performances with stage diving, reckless stage antics--}%
    %{--</p>--}%
    %{--PYROTECHNIC CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="riskHazard productionInvolvesCheckbox showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="outdoorFarmland"--}%
    %{--id="outdoorFarmlandCheckbox"--}%
    %{--value="Outdoor farmland"/> Outdoor farmland--}%
    %{--</p>--}%
    %{--PYROTECHNIC CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="riskHazard productionInvolvesCheckbox showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="indoorSprinklered"--}%
    %{--id="indoorSprinkleredCheckbox"--}%
    %{--value="Indoor venues that are not sprinklered"/> Indoor venues that are not sprinklered--}%
    %{--</p>--}%
    %{--PYROTECHNIC CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="riskHazard productionInvolvesCheckbox showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="liquorLicense"--}%
    %{--id="liquorLicenseCheckbox"--}%
    %{--value="Concessionaires selling liquor without a liquor license"/> Concessionaires selling liquor without a liquor license--}%
    %{--</p>--}%
    %{--PYROTECHNIC CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="riskHazard productionInvolvesCheckbox showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="noEvacuationPlan"--}%
    %{--id="noEvacuationPlanCheckbox"--}%
    %{--value="Events with no formal written evacuation plan"/> Events with no formal written evacuation plan--}%
    %{--</p>--}%
    %{--PYROTECHNIC CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="riskHazard productionInvolvesCheckbox showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="overnightCamping"--}%
    %{--id="overnightCampingCheckbox"--}%
    %{--value="Overnight Camping"/> Overnight Camping--}%
    %{--</p>--}%
    %{--PYROTECHNIC CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="riskHazard productionInvolvesCheckbox showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="mechanicalRides"--}%
    %{--id="mechanicalRidesCheckbox"--}%
    %{--value="Mechanical rides or similar carnival rides and attractions"/> Mechanical rides or similar carnival rides and attractions--}%
    %{--</p>--}%

    %{--PYROTECHNIC CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="productionInvolvesCheckbox pyrotechnicsActivites showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="pyrotechnicsActivities"--}%
    %{--id="pyrotechnicsCheckbox"--}%
    %{--value="Pyrotechnic Activities(Supplemental Application)"/> Pyrotechnic Activities(Supplemental Application)--}%
    %{--</p>--}%

    %{--PYROTECHNICS CONTAINER--}%
    %{--<div class="row" id="pyrotechnicsAttachContainer" style="margin-bottom: 20px; display:none">--}%
    %{--<div class="col-xs-3" style="margin-left:20px">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="pyroFile" type="file" class="file" id="pyroFile" style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%

    %{--<div class="col-xs-8">--}%
    %{--<small>Please attach details</small>--}%
    %{--</div>--}%

    %{--</div>--}%

    %{--ATTACHMENT FOR PYROTECH--}%
    %{--<div class=" fileNameContainer row" style="padding-top:6px; display:none">--}%
    %{--<div class="col-xs-9" style="text-align:right; font-size:11px">--}%
    %{--<span class="fileNameSpan" id="pyroFileSpan">File Name</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--STUNTS OR HAZARDS CHECKBOX--}%
    %{--<p class="control-label"><input type="checkbox"--}%
    %{--class="productionInvolvesCheckbox stuntsOrHazardousActivites showReview"--}%
    %{--data-reviewName="Special Hazard Declared"--}%
    %{--name="stuntsOrHazardousActivities"--}%
    %{--id="stuntsHazardousCheckbox"--}%
    %{--value="Stunts or Hazardous Activities(Supplemental Application)"/> Stunts or Hazardous Activities (Supplemental Application)--}%
    %{--</p>--}%

    %{--CONTAINER // ATTACHMENT FOR STUNTS OR HAZARDS--}%
    %{--<div class="row" id="stuntsHazardousActivitiesAttachContainer"--}%
    %{--style="margin-bottom: 20px; display:none">--}%
    %{--<div class="col-xs-3" style="margin-left:20px">--}%
    %{--<form enctype="multipart/form-data">--}%
    %{--<div class="fileUpload btn btn-primary">--}%
    %{--<span>Attach File</span>--}%
    %{--<input name="stuntsFile" type="file" class="file" id="stuntsFile"--}%
    %{--style="width:120px"/>--}%
    %{--</div>--}%
    %{--</form>--}%
    %{--</div>--}%

    %{--<div class="col-xs-8">--}%
    %{--<small>Please attach details</small>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div id="coverageCheckboxesDiv">--}%
    %{--<div class="panel-body row" id="undefined_panelBody">--}%
    %{--COVERAGE OPTION TABLE HEADER--}%
    %{--<div id="coverageTableContainer">--}%
    %{--<div class="col-xs-6">--}%
    %{--<label class="control-label">Please select the Coverages being requested:</label>--}%
    %{--</div>--}%
    %{--<div class="col-xs-6">--}%
    %{--<div class="col-xs-9">--}%
    %{--<label class="control-label"><u>Coverages:</u></label>--}%
    %{--</div>--}%
    %{--<div class="col-xs-3">--}%
    %{--<label class="control-label"><u>Limits:</u></label>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--COMMERCIAL GENERAL LIABILITY--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-6">--}%
    %{--COMMERCIAL GENERAL LIABILITY REQUESTED Y/N--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label>Commercial General Liability Limits Requested?</label><br>--}%
    %{--<input type="radio" name="commercialGeneralLiabilityRequested?"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Commercial General Liability Limits Requested?"--}%
    %{--id="commercialGeneralLiabilityRequestedYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="commercialGeneralLiabilityRequested?"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Commercial General Liability Limits Requested?"--}%
    %{--id="commercialGeneralLiabilityRequestedNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--UMBRELLA REQUESTED Y/N--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label>Umbrella Limit Requested?</label><br>--}%
    %{--<input type="radio" name="umbrellaLimitRequested"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Umbrella Limit Requested?"--}%
    %{--id="umbrellaLimitRequestedYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="umbrellaLimitRequested"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Umbrella Limit Requested?"--}%
    %{--id="umbrellaLimitRequestedNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--BLANKET REQUESTED Y/N--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label>Blanket Additional Insured Requested?</label><br>--}%
    %{--<input type="radio" name="blanketInsured"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Blanket Additional Insured Requested?"--}%
    %{--id="blanketInsuredYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="blanketInsured"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Blanket Additional Insured Requested?"--}%
    %{--id="blanketInsuredNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--WAIVER OF SUBROGATION REQUESTED Y/N--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label>Waiver of Subrogation Requested?</label><br>--}%
    %{--<input type="radio" name="waiverSubrogation"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Waiver of Subrogation Requested?"--}%
    %{--id="waiverSubrogationYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="waiverSubrogation"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Waiver of Subrogation Requested?"--}%
    %{--id="waiverSubrogationNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--ALCOHOL REQUESTED Y/N--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label>Will alcohol be served?</label><br>--}%
    %{--<input type="radio" name="willAlcoholBeServed"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Will alcohol be served?"--}%
    %{--id="alcoholYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="willAlcoholBeServed"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Will alcohol be served?"--}%
    %{--id="alcoholNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--ALCOHOL CONTAINER / ADDITION QUESTION--}%
    %{--<div class="alcoholSaleContainer" style="display:none">--}%
    %{--WHAT IS THE ESTIMATED TOTAL SALES RECEIPTS--}%
    %{--<div class="form-group effectsTotalPremium col-xs-12">--}%
    %{--<label for="estimatedTotalSalesReceipts">What is the Estimated Total Sales Receipts?</label>--}%
    %{--<input type="text" id="alcoholSales" class="alcoholSales showReview form-control"--}%
    %{--name="alcoholSales"--}%
    %{--data-reviewName="What is the Estimated Total Sales Receipts?"--}%
    %{--placeholder="$USD"/>--}%
    %{--</div>--}%
    %{--WHAT KIND OF LIQUOR IS SERVED?--}%
    %{--<div class="col-xs-12">--}%
    %{--<label for="whatKindOfLiquorIsServed">What kind of liquor is served? (please enter percentages)</label>--}%

    %{--<div class="form-group row">--}%
    %{--<label for="whatKindOfLiquorIsServed">What kind of liquor is served? (please enter </label>--}%

    %{--<div class="col-xs-4">--}%
    %{--<input type="text" id="whatKindOfLiquorIsServedBeer"--}%
    %{--class="whatKindOfLiquorIsServed showReview form-control"--}%
    %{--name="whatKindOfLiquorIsServed"--}%
    %{--data-reviewName="What kind of liquor is served? Beer:"--}%
    %{--placeholder="Beer %"/>--}%
    %{--</div>--}%

    %{--<div class="col-xs-4">--}%
    %{--<input type="text" id="whatKindOfLiquorIsServedWine"--}%
    %{--class="whatKindOfLiquorIsServed showReview form-control"--}%
    %{--name="whatKindOfLiquorIsServed"--}%
    %{--data-reviewName="What kind of liquor is served? Wine:"--}%
    %{--placeholder="Wine %"/>--}%
    %{--</div>--}%

    %{--<div class="col-xs-4">--}%
    %{--<input type="text" id="whatKindOfLiquorIsServedFullBar"--}%
    %{--class="whatKindOfLiquorIsServed showReview form-control"--}%
    %{--name="whatKindOfLiquorIsServed"--}%
    %{--data-reviewName="What kind of liquor is served? Full bar:"--}%
    %{--placeholder="Full Bar %"/>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--<br>--}%
    %{--IF SUBCONTRACTED OUT, DO YOU RECEIVE A COMMISSION ON THE LIQUOR SALE?--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label>If subcontracted out, do you receive commission on the liquor sales?</label><br>--}%
    %{--<input type="radio" name="subcontractedCommission"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="If Subcontracted out, do you receive commission on the liquor sales?"--}%
    %{--id="subcontractedCommissionYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="subcontractedCommission"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="If Subcontracted out, do you receive commission on the liquor sales?"--}%
    %{--id="subcontractedCommissionNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--ARE LOCAL LIQUOR LAWS GOVERNING SALES TO MINORS/INTOXICATED FOLLOWED?--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label>Are local liquor laws governing sales to minors/intoxicated followed?</label><br>--}%
    %{--<input type="radio" name="localLiquorLawsMinors"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Are local liquor laws governing sales to minors/intoxicated followed?"--}%
    %{--id="localLiquorLawsMinorsYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="localLiquorLawsMinors"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Are local liquor laws governing sales to minors/intoxicated followed?"--}%
    %{--id="localLiquorLawsMinorsNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--WHAT CONTROLS ARE USED?--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label for="whatControlsAreUsed">What controls are used?</label>--}%
    %{--<input type="text" id="whatControlsAreUsed"--}%
    %{--class="whatControlsAreUsed showReview form-control"--}%
    %{--name="whatControlsAreUsed"--}%
    %{--data-reviewName="What controls are used?"--}%
    %{--placeholder="Ex: wristbands"/>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--EQUIPMENT COVERAGE REQUESTED Y/N--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label>Misc Equipment Coverage Requested?</label><br>--}%
    %{--<input type="radio" name="equipmentOwnedRented"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Misc Equipment Coverage Requested?"--}%
    %{--id="equipmentOwnedRentedYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="equipmentOwnedRented"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Misc Equipment Coverage Requested?"--}%
    %{--id="equipmentOwnedRentedNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--EQUIPMENT CONTAINER / ADDITIONAL QUESTIONS--}%
    %{--<div id="equipmentOwnedRentedContainer" style="display:none">--}%
    %{--EQUIPMENT OWNED OR RENTED Y/N--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<input type="radio" name="equipmentOR"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Misc Equipment Owned or Rented?"--}%
    %{--id="equipmentOwnRentYes_RadioButton"> Owned--}%
    %{--<input type="radio" name="equipmentOR"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Misc Equipment Owned or Rented?"--}%
    %{--id="equipmentOwnRentNo_RadioButton"--}%
    %{--checked="checked"> Rented--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--WHAT EQUIPMENT LIMIT IS REQUESTED?--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="equipmentLimitRequested">What Equipment Limit is Requested?</label>--}%
    %{--<input type="text" id="equipmentLimit" class="equipmentLimit showReview form-control"--}%
    %{--name="name"--}%
    %{--data-reviewName="What Equipment Limit is Requested?"--}%
    %{--placeholder="$USD"/>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--PROVIDE EQUIPMENT SCHEDULE IF ANY ONE ITEM EXCEEDS 10,000 IN VALUE--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="equipmentSchedule">Provide Equipment Schedule if any one item exceeds $10,000 in value</label>--}%
    %{--<input type="text" id="equipmentSchedule" class="showReview form-control"--}%
    %{--name="name"--}%
    %{--data-reviewName="Provide Equipment Schedule if any one item exceeds $10,000 in value"--}%
    %{--placeholder="Equipment schedule"/>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--WHERE IS EQUIPMENT KEPT WHEN NOT IN USE--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="equipmentLocation">Where is equipment kept when not in use?</label>--}%
    %{--<input type="text" id="equipmentLocation" class="showReview form-control"--}%
    %{--name="name" data-reviewName="Where is equipment kept when not in use?"--}%
    %{--placeholder="Location of equipment"/>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--PROVIDE SECURITY MEASURES AGAINST THEFT, LOSS, AND DAMAGE TO EQUIPMENT--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="equipmentSecurityMeasures">Provide security measures against theft, loss, and damage to equipment</label>--}%
    %{--<input type="text" id="equipmentSecurity" class="showReview form-control"--}%
    %{--name="name"--}%
    %{--data-reviewName="Security Measures against theft, loss, and damage"--}%
    %{--placeholder="Equipment security measures"/>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--WHAT METHOD OF INVENTORY DO YOU USE? PLEASE DESCRIBE PROCEDURES AND HOW OFTEN--}%
    %{--<div class="col-xs-12">--}%
    %{--<div class="form-group">--}%
    %{--<label for="equipmentInventoryAndProcedures">What method of inventory do you use? Please describe procedures and how often</label>--}%
    %{--<input type="text" id="equipmentInventory" class="showReview form-control"--}%
    %{--name="name" data-reviewName="Method of Inventory"--}%
    %{--placeholder="Equipment inventory and procedures"/>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--RESPONSIBLE FOR PREMISES Y/N--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label>Are you contractually responsible for Premises?</label><br>--}%
    %{--<input type="radio" name="premisesResponsible"--}%
    %{--class="showReview"--}%
    %{--value="Yes"--}%
    %{--data-reviewName="Are you contractually responsible for Premises?"--}%
    %{--id="premisesYes_RadioButton"> Yes--}%
    %{--<input type="radio" name="premisesResponsible"--}%
    %{--class=""--}%
    %{--value="No"--}%
    %{--data-reviewName="Are you contractually responsible for Premises?"--}%
    %{--id="premisesNo_RadioButton"--}%
    %{--checked="checked"> No--}%
    %{--</div>--}%
    %{--BROKER FEE--}%
    %{--<div class="form-group col-xs-12">--}%
    %{--<label class="control-label">Broker Fee</label>--}%
    %{--<input class="form-control effectsTotalPremium brokerFeeInput" id="brokerFeeInput"--}%
    %{--type="text"--}%
    %{--placeholder="$USD"--}%
    %{--name="brokerFee"/>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--<div class="col-xs-6">--}%
    %{--TABLE CGL--}%
    %{--<div id="commercialGeneralLiabilityRequestedContainer" style="display:none">--}%
    %{--<div class="tableCGL" id="commercialGeneralLiabilityProduct">--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-9 ">--}%
    %{--<strong class="coverageCodeString"--}%
    %{--style="font-size:13px">Commercial General Liability</strong>--}%
    %{--<span class="productID_pull" data-cov="CGL" style="display:none">SPEVENTS</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<span>-</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CGL" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">General Aggregate Limit</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$2,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CGL">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Products & Completed Operations Agg Limit</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CGL"--}%
    %{--style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Personal & Advertising Injury (Any one person or organization)</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%

    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CGL">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Each Occurrence Limit</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CGL"--}%
    %{--style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Damage to Premises Rented to You Limit</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$100,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CGL">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Medical Payments</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">Excluded</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row" style="border-top: 1px solid rgba(0, 0, 0, 0.19);">--}%
    %{--<div class="col-xs-10 "><strong style="font-size:13px"></strong>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--TABLE CGL--}%
    %{--<br>--}%
    %{--TABLE UMBRELLA--}%
    %{--<div id="umbrellaLimitRequestedContainer" style="display:none">--}%
    %{--<div class="tableCUMB" id="umbrellaProduct">--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-9">--}%
    %{--<strong class="coverageCodeString" style="font-size:13px">Umbrella</strong>--}%
    %{--<span class="productID_pull" data-cov="CUMB" style="display:none">SPEVENTS</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 ">--}%
    %{--<span>-</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CUMB" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Each Occurrence Limit (Liability Coverage)</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CUMB">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Personal & Advertising Injury Limit (Any one person or organization)</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CUMB" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Aggregate Limit (Liability Coverage) (except with respect to covered autos)</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CUMB">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Covered Auto Aggregate Limit</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS CUMB" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Self-Insured Retention</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">nil</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row" style="border-top: 1px solid rgba(0, 0, 0, 0.19);">--}%
    %{--<div class="col-xs-10 "><strong style="font-size:13px"></strong>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--TABLE UMBRELLA--}%
    %{--<br>--}%
    %{--TABLE ALCOHOL--}%
    %{--<div class="alcoholSaleTableContainer" style="display:none">--}%
    %{--<div class="tableAlcohol" id="alcoholSaleProduct">--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-9 ">--}%
    %{--<strong class="coverageCodeString"--}%
    %{--style="font-size:13px">Liquor Liability</strong>--}%
    %{--<span class="productID_pull" data-cov="ALCOHOL" style="display:none">SPEVENTS</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<span>-</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS ALCOHOL" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Each common cause</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row lobRow SPEVENTS ALCOHOL">--}%
    %{--<div class="col-xs-9 coverageColumn" style="padding-left:20px">--}%
    %{--<span class="lob">Aggregate limit</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3 limitColumn">--}%
    %{--<span class="limit">$1,000,000</span>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="row" style="border-top: 1px solid rgba(0, 0, 0, 0.19);">--}%
    %{--<div class="col-xs-10 "><strong style="font-size:13px"></strong>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--TABLE ALCOHOL--}%
    %{--<br>--}%
    %{--<br>--}%
    %{--Premiums--}%
    %{--<div class="row" id="premiumDistDivContainer">--}%
    %{--<div class="col-xs-12">--}%
    %{--<h5>Premium Distribution</h5>--}%

    %{--HEADER--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-4">--}%
    %{--<u>Line Of Business</u>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<u>Premium</u>--}%
    %{--</div>--}%

    %{--</div>--}%

    %{--COMMERCIAL GENERAL LIMITS--}%
    %{--<div class="premDistributionInsert">--}%
    %{--<div id="commercialGeneralLiabilityPremiumContainer">--}%
    %{--<div class="row" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-4">--}%
    %{--<span class="lineOfBusinessSpan"--}%
    %{--id="commercialGeneralLiabilityPremiumName">Commercial General Liability</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<span class="premiumSpan effectsTotal"--}%
    %{--id="commercialGeneralLiabilityPremiumCost"></span>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--ALCOHOL LIMITS--}%
    %{--<div class="premDistributionInsert">--}%
    %{--<div class="alcoholSaleContainer" style="display:none">--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-4">--}%
    %{--<span class="lineOfBusinessSpan"--}%
    %{--id="alcoholSalePremiumName">Liquor Liability</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<span class="premiumSpan effectsTotal"--}%
    %{--id="alcoholSalePremiumCost"></span>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--POLICY FEE LIMITS--}%
    %{--<div class="premDistributionInsert">--}%
    %{--<div class="policyFeeContainer">--}%
    %{--<div class="row" style="background-color: rgba(38, 80, 159, 0.13)">--}%
    %{--<div class="col-xs-4">--}%
    %{--<span class="lineOfBusinessSpan" id="policyFeePremiumName">Policy Fee</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<span class="premiumSpan effectsTotal"--}%
    %{--id="policyFeePremiumCost"></span>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--TOTAL PREMIUM--}%
    %{--<div class="premDistributionInsert">--}%
    %{--<div class="totalSaleContainer">--}%
    %{--<div class="row TotalPremiumRow">--}%
    %{--<div class="col-xs-4">--}%
    %{--<strong>--}%
    %{--<span class="lineOfBusinessSpan" id="totalSalePremiumName">Total:</span>--}%
    %{--</strong>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<span class="premiumSpan productTotalPremium SPEVENTS totalPremiumSpan"--}%
    %{--id="totalSalePremiumCost"></span>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--BROKER FEE LIMITS--}%
    %{--<div class="premDistributionInsert">--}%
    %{--<div id="brokerFeePremiumContainer" style="display:none">--}%
    %{--<div class="row">--}%
    %{--<div class="col-xs-4">--}%
    %{--<span class="lineOfBusinessSpan" id="brokerFeePremiumName">Broker Fee</span>--}%
    %{--</div>--}%

    %{--<div class="col-xs-3">--}%
    %{--<span class="premiumSpan brokerFeePremiumCost"--}%
    %{--id="brokerFeePremiumCost"></span>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--</div>--}%
    %{--</div>--}%
    %{--Premium--}%
    %{--</div>--}%
    %{--</div>--}%

    %{--<div class="col-xs-12">--}%
    %{--<h5>Terms</h5>--}%
    %{--<span class="spTerms" id="termsInsert" style="font-size: 12px; white-space: pre-line;display:none">Subject to:--}%
    %{--Audience capacity cannot exceed 5,000.--}%


    %{--EXCLUSIONS:--}%
    %{--- Drone operations--}%
    %{--- Rap music performances--}%
    %{--- Performances with stage diving, reckless stage antics--}%
    %{--- Outdoor farmland--}%
    %{--- Indoor venues that are not sprinklered--}%
    %{--- Concessionaires selling liquor without a liquor license--}%
    %{--- Events with no formal written evacuation plan--}%
    %{--- Overnight camping--}%
    %{--- Mechanical rides or similar carnival rides and attractions--}%


    %{--NOTE: Descriptions above are for summary purposes only. For a detailed description of the terms of the policy, please refer to the policy form and any endorsements indicated. Specimens of all of the below policy forms and endorsements are available upon request. Please note that this Quote contains only a general description of coverage provided.--}%


    %{--EXCLUSIONS (GL 0029)--}%

    %{--Must be Last!--}%
    %{--</span>--}%
    %{--</div>--}%
    %{--<br>--}%

    %{--<div class="col-xs-12">--}%
    %{--<h5>Endorse</h5>--}%
    %{--<span class="spEndorsements" id="endorseInsert" style="font-size: 12px; white-space: pre-line; display:none">Commercial General Liability--}%
    %{--CP DS 00 (10 00) - PROP:Commercial Property Coverage Part Declarations--}%
    %{--CP 00 10 (06 07) - PROP:Building and Personal Property Coverage Form--}%
    %{--CP 10 30 (06 07) - PROP:Causes of Loss - Special Form--}%
    %{--CP 00 90 (07 88) - PROP:Commercial Property Conditions--}%
    %{--CP 01 40 (07 06) - PROP:Exclusion of Loss Due to Virus or Bacteria--}%
    %{--CP 02 99 (06 07) - PROP:Cancellation Changes--}%
    %{--CP 10 32 (08 08) - PROP:Water Exclusion Endorsement--}%
    %{--PR 00 01 (06 10) - PROP:Commercial Property Coverage Form Extension A--}%
    %{--IL 09 35 (07 02) - PROP:Exclusion of Certain Computer-Related Losses--}%
    %{--IM 01 24 (10 10) - CIM:Commercial Inland Marine Coverage Part Declarations--}%
    %{--IM 00 49 (06 10) - CIM:Electronic Data Processing--}%
    %{--IM 01 30 (10 10) - CIM:Personal Property Floater Policy Supplemental Declarations--}%
    %{--IM 00 85 (06 10) - CIM:Personal Property Floater Policy--}%
    %{--IM 01 10 (06 10) - CIM:Third Party Property Damage Coverage--}%
    %{--IL 09 35 (07 02) - CIM:Exclusion of Certain Computer-Related Losses--}%
    %{--IL 01 02 (05 05) - CIM:California Changes, Actual Cash Value--}%
    %{--IL 01 04 (09 07) - CIM:California Changes--}%
    %{--IM 01 24 (10 10) - EFLTR:Commercial Inland Marine Coverage Part Declarations--}%
    %{--IL 09 35 (07 02) - EFLTR:Exclusion of Certain Computer-Related Losses--}%
    %{--IL 01 04 (09 07) - EFLTR:California Changes--}%
    %{--IM 00 49 (06 10) - EDP:Electronic Data Processing--}%
    %{--IL 01 04 (09 07) - EDP:California Changes--}%
    %{--CR DS 01 (08 07) - CRIME:Crime and Fidelity Coverage Part Declarations (Commercial Entities)--}%
    %{--CR 00 21 (05 06) - CRIME:Commercial Crime Coverage Forms (Loss Sustained Form)--}%
    %{--CR 07 50 (08 08) - CRIME:Amendment-Delete Provisions Regarding Certain Acts of Terrorism (Applicable to Crime/Fidelity Only)--}%
    %{--CR 20 09 (10 10) - CRIME:Amend Territorial Limits-Anywhere in the World--}%
    %{--CG DS 01 (10 01) - CGL:Commercial General Liability Declarations--}%
    %{--CG 00 01 (12 07) - CGL:Commercial General Liability Coverage Form--}%
    %{--CG 00 68 (05 09) - CGL:Recording and Distribution of Material or Information in Violation of Law Exclusion--}%
    %{--CG 21 46 (07 98) - CGL:Abuse or Molestation Exclusion--}%
    %{--CG 21 47 (12 07) - CGL:Employment Related Practices Endorsement--}%
    %{--CG 21 67 (12 04) - CGL:Fungi or Bacteria Exclusion--}%
    %{--CG 21 96 (03 05) - CGL:Silica or Silica-Related Dust Exclusion--}%
    %{--CG 20 34 (07 04) - CGL:Additional Insured Lessor of Leased Equipment Automatic Status When Required in Lease Agreement With You--}%
    %{--CG 20 23 (10 93) - CGL:Additional Insured Executors, Administrators, Trustees or Beneficiaries.--}%
    %{--CG 20 26 (07 04) - CGL:Additional Insured Designated Person or Organization Any person or organization when you and such person or organization have agreed in writing in a contract or agreement that such person or organization be added as an additional insured on your policy prior to performance of the agreement.--}%
    %{--CG 21 44 (07 98) - CGL:Limitation of Coverage to Designated Premises or Project: DICE and Commercial Media--}%
    %{--CG 21 71 (06 08) - CGL:Exclusion Of Other Acts Of Terrorism Committed Outside The United States; Cap On Losses From Certified Acts Of Terrorism--}%
    %{--CG 21 84 (01 08) - CGL:Exclusion of Certified Acts of Nuclear, Biological, Chemical Acts.--}%
    %{--CG 21 76 (01 08) - CGL:Exclusion of Punitive Damages Related to a Certified Act of Terrorism--}%
    %{--CG 21 75 (06 08) - CGL:Exclusion Certified Acts of Terrorism and Exclusion of Other Acts of Terrorism Committed Outside the United States--}%
    %{--GL 00 01 (06 10) - CGL:Absolute Asbestos Exclusion--}%
    %{--GL 00 02 (06 10) - CGL:Absolute Lead Exclusion--}%
    %{--GL 00 08 (06 10) - CGL:Amendment of Employment Definition (Temporary Employee)--}%
    %{--GL 00 19 (06 10) - CGL:Cross Liability Exclusion--}%
    %{--GL 00 29 (06 10) - CGL:Exclusion Designated Activities - Excludes all Stunts & Pyrotechnics until declared and approved in writing prior to exposure commencement.--}%
    %{--GL 00 30 (06 10) - CGL:Exclusion Fireworks With Exception for Concussion Effects, Flashpots and Smokepots--}%
    %{--GL 00 35 (06 10) - CGL:Exclusion Personal and Advertising Injury Liability - Entertainment Industry--}%
    %{--GL 0038 (06 10) - CGL:Exclusion–Sport, Athletic, Event, Exhibition or Performance Participants--}%
    %{--GL 00 41 (06 10) - CGL:Knowledge of Occurrence--}%
    %{--GL 00 42 (06 10) - CGL:Limitation No Stacking of Occurrence Limits of Insurance--}%
    %{--IL DS 00 (09 08) - CGL:Common Policy Declarations--}%
    %{--IL 00 17 (11 98) - CGL:Common Policy Conditions--}%
    %{--IL 00 21 (09 08) - CGL:Nuclear Energy Liability Exclusion Endorsement--}%
    %{--IL 09 85 (01 08) - CGL:Disclosure Pursuant to Terrorism Risk Insurance Act--}%
    %{--IL 09 86 (03 08) - CGL:Exclusion Of Certified Acts Of Terrorism Involving Nuclear, Biological, Chemical Or Radiological Terrorism; Cap On Covered Certified Acts Losses (If Terrorism Accepted)--}%
    %{--IL 00 01 (10 10) - CGL:Signature Page--}%
    %{--CA DS 03 (03 10) - NOAL:Business Auto Declarations--}%
    %{--AU 00 11 (09 10) - NOAL:Explanation of Premium Basis--}%
    %{--AU 00 13 (09 10) - NOAL:Mexico Endorsement--}%
    %{--AU 00 17 (09 10) - NOAL:Who is an Insured</span>--}%
    %{--</div>--}%
    %{--</div>--}%
    %{--</div>--}%
</div>
