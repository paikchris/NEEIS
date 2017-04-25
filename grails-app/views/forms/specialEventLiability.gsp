<div id="insuredInfo">
        <div class="col-xs-6">
            %{--NAME OF PRINCIPAL--}%
            <div class="form-group col-xs-12">
                <label for="nameOfContactPrincipal">Name Of Principal</label>
                <input type="text" class="form-control showReview" name="nameOfPrincipal"
                       data-reviewName="Name Of Principal"
                       id="nameOfPrincipal" placeholder="Name of Principal"/>
            </div>
            %{--PRINCIPAL EMAIL--}%
            <div class="form-group col-xs-12">
                <label for="principalContactEmail">Principal Contact Email Address</label>
                <input type="text" class="form-control showReview" name="PrincipalEmail" id="principalEmail"
                       data-reviewName="Principal Email"
                       placeholder="Principal Email"/>
            </div>
            %{--PRINCIPAL PHONE--}%
            <div class="form-group col-xs-12">
                <label for="principalContactPhone">Principal Contact Phone Number</label>
                <input type="text" class="form-control showReview phoneNumberMask" name="PrincipalPhone"
                       id="principalPhone"
                       data-reviewName="Principal Phone"
                       placeholder="Principal Phone"/>
            </div>
            %{--INSURED CONTACT REP Y/N--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Does the Principal have a contact representative?</label><br>
                    <input type="radio" name="contactRep"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Does the Principal have a contact representative?"
                           id="contactRepYes_RadioButton"> Yes
                    <input type="radio" name="contactRep"
                           class=""
                           value="No"
                           data-reviewName="Does the Principal have a contact representative?"
                           id="contactRepNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>
            %{--INSURED CONTACT INFORMATION CONTAINER--}%
            <div id="insuredContactInformationContainer" style="display:none">
                %{--INSURED CONTACT PERSON--}%
                <div class="form-group col-xs-12">
                    <label for="insuredContactPerson">Insured Contact Person</label>
                    <input type="text" class="form-control showReview" name="InsuredContact" id="insuredContact"
                           data-reviewName="Insured Contact Person"
                           placeholder="Name of Insured Contact"/>
                </div>
                %{--INSURED CONTACT EMAIL--}%
                <div class="form-group col-xs-12">
                    <label for="insuredContactEmailAddress">Insured Contact Person's Email</label>
                    <input type="text" class="form-control showReview" name="insuredContactEmail"
                           id="insuredContactEmail"
                           data-reviewName="Insured Contact Email"
                           placeholder="Email"/>
                </div>
                %{--INSURED CONTACT PHONE--}%
                <div class="form-group col-xs-12">
                    <label for="InsuredContactPhoneNumber">Insured Contact Person's Phone Number</label>
                    <input type="text" class="form-control showReview phoneNumberMask" name="insuredContactPhone"
                           id="insuredContactPhone"
                           data-reviewName="Insured Contact Phone Number"
                           placeholder="Phone Number"/>
                </div>

            </div>
        </div>
        <div class="col-xs-6">
            %{--STATE WHERE ENTITY ESTABLISHED--}%
            <div class="form-group col-xs-12">
                <label for="stateWhereEntityEstablished">State Where Entity Established</label>
                <input type="text" class="form-control showReview" name="whereEstablished" id="whereEstablished"
                       data-reviewName="State Where Entity Established"
                       placeholder=""/>
            </div>
            %{--DOING BUSINESS AS--}%
            <div class="form-group col-xs-12">
                <label for="dbaName">Doing Business as; Name</label>
                <input type="text" class="form-control showReview" name="dbaName" id="dbaName"
                       data-reviewName="DBA name"
                       placeholder="DBA Name"/>
            </div>
            %{--NUMBER OF YEARS EXPERIENCE--}%
            <div class="form-group col-xs-12">
                    <label for="numberOfYearsOfExperience">Number of Years of Experience (Attach Bio / Resume)</label>

                    <div class="col-xs-10 row">
                        <input type="number" class="form-control showReview" name="numberOfYearsOfExperience"
                               data-reviewName="Years Experience"
                               id="numberOfYearsOfExperience" placeholder="# Years of Experience"/>
                    </div>
                    <div class="col-xs-2">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Attach File</span>
                                <input name="experienceFile" type="file" class="file" id="experienceFile"
                                       style="width:120px"/>
                            </div>
                        </form>
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
            <div class="form-group col-xs-12">
                <div class="form-group">
                    <label>Are you the promoter of sponsor of the event?</label><br>
                    <input type="radio" name="promoter"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Are you the promoter of sponsor of the event?"
                           id="promoterYes_RadioButton"> Yes
                    <input type="radio" name="promoter"
                           class=""
                           value="No"
                           data-reviewName="Are you the promoter of sponsor of the event?"
                           id="promoterNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>
        </div>
    </div>

<div id="riskSpecificInfo">
    <div class="row">
        <div class="col-xs-6">
                %{--DESCRIBE PRIMARY BUSINESS OPERATIONS--}%
                <div class="form-group col-xs-12">
                    <label for="describeBusinessOperations">Describe Primary Business Operations</label>
                    <input type="text" class="form-control showReview" name="businessOperations" id="businessOperations"
                           data-reviewName="Describe Primary Business Operations"
                           placeholder="Describe"/>
                </div>
                %{--DESCRIBE OTHER BUSINESS OPERATIONS--}%
                <div class="form-group col-xs-12">
                    <label for="describeOtherBusinessOperations">Describe Other Business Operations</label>
                    <input type="text" class="form-control showReview" name="otherBusinessOperations"
                           id="otherBusinessOperations"
                           data-reviewName="Describe Other Business Operations"
                           placeholder="Describe"/>
                </div>
                %{--SUB CONTRACTORS--}%
                <div class="form-group col-xs-12">
                        <label for="whatServiceDoYouHireSubContractorsFor">What services, if any, do you hire Sub-Contractors for? (Attach contract copy)</label>

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
                                    <input name="subContractFile" type="file" class="file" id="subContractFile"
                                           style="width:120px"/>
                                </div>
                            </form>
                        </div>
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
                %{--NUMBER OF SECURITY GUARDS TABLE--}%
                <div id="securityContainer" style="display:none">
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="numberOfGuards">Number of Guards:</label>
                            <input type="number" class="form-control securityGuards" name="numberOfGuards"
                                   placeholder=""
                                   data-reviewname="Number of Guards:"
                                   id="numberOfGuards">
                        </div>
                    </div>
                </div>
                %{--TYPE OF FIRST AID AT EVENT--}%
                <div class="form-group col-xs-12">
                    <label class="control-label">What Type of First Aid will be available the Event?</label>
                    <select class="form-control firstAidTypeSelect showReview" name="firstAidType"
                            data-reviewName="What Type of First Aid will be available the Event?" id="firstAidType">
                        <option value="invalid" selected="selected">None</option>
                        <option value="City Paramedics" selected="selected">City Paramedics</option>
                        <option value="Venue Staff" selected="selected">Venue Staff</option>
                    </select>
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
                %{--NUMBER OF PERFORMANCES LAST 12 MONTHS--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="numberOfPerformancesEventInLastYear">Number of Performances / Events in the last 12 Months</label>
                        <input type="number" class="form-control showReview" name="numberOfPerformanceLastYear"
                               placeholder=""
                               id="numberOfPerformancesLastYear"
                               data-reviewname="Number of Performances Events in the last 12 Months">
                    </div>
                </div>
                %{--NUMBER OF PERFORMANCES NEXT 12 MONTHS--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="numberOfPerformancesEventInNextYear">Number of Performances / Events in the Next 12 Months</label>
                        <input type="number" class="form-control showReview" name="numberOfPerformanceNextYear"
                               placeholder=""
                               id="numberOfPerformancesNextYear"
                               data-reviewname="Number of Performances Events in the Next 12 Months">
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
                %{--ARE YOU RESPONSIBLE FOR PARKING?--}%
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
                            <label>Will the parking are be patrolled by security?</label><br>
                            <input type="radio" name="patrolledParking" class="parking" value="Yes"
                                   data-reviewname="Will the parking are be patrolled by security?"
                                   id="patrolledParkingYes_RadioButton"> Yes
                            <input type="radio" name="patrolledParking" class="" value="No"
                                   data-reviewname="Will the parking are be patrolled by security?"
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
        </div>
        <div class="col-xs-6">
                %{--WORK COMP COVERAGE REQUESTED Y/N--}%
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>Work Comp Coverage Requested?</label><br>
                        <input type="radio" name="workCompCoverageRequested" class="showReview" value="Yes"
                               data-reviewname="Work Comp Coverage Requested?"
                               id="workCompCoverageRequestedYes_RadioButton"> Yes
                        <input type="radio" name="workCompCoverageRequested" class="" value="No"
                               data-reviewname="Work Comp Coverage Requested?"
                               id="workCompCoverageRequestedNo_RadioButton" checked="checked"> No
                    </div>
                </div>
                %{--WORK COMP CONTAINER / TABLE / ADDITIONAL QUESTION--}%
                <div id="workCompCoverageRequestedContainer" style="display:none">

                    %{--STATE OF HIRE / TOTAL PAYROLL EACH STATE--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="stateOfHire">States of Hire &amp; Total Payroll Each State</label>
                            <input type="text" class="form-control showReview" name="name" placeholder=""
                                   data-reviewname="States of Hire &amp; Total Payroll Each State"
                                   id="stateOfHireAndPayroll">
                        </div>
                    </div>

                    %{--NAMES OF OFFICERS, TITLE, % OF OWNERSHIP--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="namesOfOfficers">Names of Officers, Title, % of Ownership</label>
                            <input type="text" class="form-control showReview" name="name" placeholder=""
                                   data-reviewname="Names of Officers, Title, % of Ownership"
                                   id="namesOfficerTitleOwnership">
                        </div>
                    </div>

                    %{--NAME OF OFFICERS TO BE EXCLUDED UNDER WORK COMP--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="namesOfOfficersExcluded">Name of Officers to be Excluded under WC</label>
                            <input type="text" class="form-control showReview" name="name" placeholder=""
                                   data-reviewname="Name of Officers to be Excluded under WC"
                                   id="officersExcludedUnderWC">
                        </div>
                    </div>

                    %{--TOTAL NUMBER OF EMPLOYEES--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="totalEmployees">Total Number of Employees</label>
                            <input type="number" class="form-control showReview" name="name" placeholder=""
                                   id="totalNumEmployees"
                                   data-reviewname="Total Number of Employees">
                        </div>
                    </div>

                    %{--TOTAL GROSS RECEIPTS--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="annualGrossReceipts">Total Gross Receipts</label>
                            <input type="text" class="form-control showReview totalReceipts" name="name"
                                   placeholder="$USD" id="annualReceipts"
                                   data-reviewname="Total Gross Receipts">
                        </div>
                    </div>

                    %{--TOTAL PAYROLL--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label for="annualPayroll">Total Payroll</label>
                            <input type="text" class="form-control showReview totalPayroll" name="name"
                                   placeholder="$USD" id="annualPayroll"
                                   data-reviewname="Total Payroll">
                        </div>
                    </div>

                    %{--PRIOR LOSSES--}%
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

                    <br>

                    %{--TABLE WORK COMP--}%
                    <div class="tableWC" id="workCompProduct">
                        <div class="row">
                            <div class="col-xs-9">
                                <strong class="coverageCodeString" style="font-size:13px">Work Comp</strong>
                                <span class="productID_pull" data-cov="WC" style="display:none">SPEVENTS</span>
                            </div>

                            <div class="col-xs-3">
                                <span>-</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS WC" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Bodily Injury by Accident (each)</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS WC">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Bodily Injury by Disease (policy limit)</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS WC" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Bodily Injury by Disease (each employee)</span>
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
                    %{--TABLE WORK COMP--}%

                </div>
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
                            <div class="col-xs-9 ">
                                <strong class="coverageCodeString"
                                        style="font-size:13px">Hired / Non-Owned Auto</strong>
                                <span class="productID_pull" data-cov="NOAL" style="display:none">SPEVENTS</span>
                            </div>

                            <div class="col-xs-3">
                                <span>-</span>
                            </div>
                        </div>

                        <div class="row lobRow SPEVENTS NOAL" style="background-color: rgba(38, 80, 159, 0.13)">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Hired Auto Liability - CSL</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">$1,000,000</span>
                            </div>
                        </div>


                        <div class="row lobRow SPEVENTS NOAL">
                            <div class="col-xs-9 coverageColumn" style="padding-left:20px">
                                <span class="lob">Hired Auto Physical Damage</span>
                            </div>

                            <div class="col-xs-3 limitColumn">
                                <span class="limit">ACV Unlimited</span>
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
                %{--ATTACHMENTS CONTAINER--}%
                <div class="form-group col-xs-12">
                    <label for="fileAttachments">Required Attachments:</label>

                    %{--RENTAL AGREEMENT CONTAINER--}%
                    <div class="row" id="rentalAgreementAttachContainer" style="margin-bottom: 20px">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="rentalAgreementFile" type="file" class="file" id="rentalAgreementFile"
                                           style="width:120px"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8">
                            <small>Please attach copy of "rental agreement or venue contract"</small>
                        </div>

                    </div>
                    %{--ATTACHMENT FOR RENTAL AGREEMENT--}%
                    <div class=" fileNameContainer row" style="padding-top:6px; display:none">
                        <div class="col-xs-9" style="text-align:right; font-size:11px">
                            <span class="fileNameSpan" id="rentalAgreementFileSpan">File Name</span>
                        </div>

                        <div class="col-xs-3">
                            <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                        </div>
                    </div>

                    %{--FLYER PRESS RELEASE ADVERTISING CONTAINER--}%
                    <div class="row" id="advertisingAttachContainer" style="margin-bottom: 20px">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="advertisingFile" type="file" class="file" id="advertisingFile"
                                           style="width:120px"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8">
                            <small>Please attach copy of flyer, press release, advertising</small>
                        </div>

                    </div>
                    %{--ATTACHMENT FOR FLYER PRESS RELEASE ADVERTISING--}%
                    <div class=" fileNameContainer row" style="padding-top:6px; display:none">
                        <div class="col-xs-9" style="text-align:right; font-size:11px">
                            <span class="fileNameSpan" id="advertisingFileSpan">File Name</span>
                        </div>

                        <div class="col-xs-3">
                            <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                        </div>
                    </div>

                    %{--COPIES OF CERTIFICATES IF APPLICANT IS RESPONSIBLE FOR SECURITY / RIDES / ANIMALS CONTAINER--}%
                    <div class="row" id="securityRidesAnimalsAttachContainer" style="margin-bottom: 20px">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="securityRidesAnimalsFile" type="file" class="file"
                                           id="securityRidesAnimalsFile" style="width:120px"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8">
                            <small>Please attach copies of certificates if applicant is responsible for security / rides / animals</small>
                        </div>

                    </div>
                    %{--ATTACHMENT FOR COPIES OF CERTIFICATES IF APPLICANT IS RESPONSIBLE FOR SECURITY / RIDES / ANIMALS--}%
                    <div class=" fileNameContainer row" style="padding-top:6px; display:none">
                        <div class="col-xs-9" style="text-align:right; font-size:11px">
                            <span class="fileNameSpan" id="securityRidesAnimalsFileSpan">File Name</span>
                        </div>

                        <div class="col-xs-3">
                            <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                        </div>
                    </div>

                    %{--LIST OF REQUIRED ADDITIONAL INSURED CONTAINER--}%
                    <div class="row" id="requiredAdditionalInsuredAttachContainer" style="margin-bottom: 20px">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="requiredAdditionalInsuredFile" type="file" class="file"
                                           id="requiredAdditionalInsuredFile" style="width:120px"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8">
                            <small>Please attach list of required additional insured(s)</small>
                        </div>

                    </div>
                    %{--ATTACHMENT FOR LIST OF REQUIRED ADDITIONAL INSURED--}%
                    <div class=" fileNameContainer row" style="padding-top:6px; display:none">
                        <div class="col-xs-9" style="text-align:right; font-size:11px">
                            <span class="fileNameSpan" id="requiredAdditionalInsuredFileSpan">File Name</span>
                        </div>

                        <div class="col-xs-3">
                            <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                        </div>
                    </div>

                    %{--FACILITY DIAGRAM OUTDOOR EVENTS CONTAINER ((OUTDOOR ONLY))--}%
                    <div id="eventOutdoorContainer" style="display:none">
                        %{--FACILITY DIAGRAM OUTDOOR EVENTS CONTAINER--}%
                        <div class="row" id="facilityDiagramAttachContainer" style="margin-bottom: 20px">
                            <div class="col-xs-3" style="margin-left:20px">
                                <form enctype="multipart/form-data">
                                    <div class="fileUpload btn btn-primary">
                                        <span>Attach File</span>
                                        <input name="facilityDiagramFile" type="file" class="file"
                                               id="facilityDiagramFile" style="width:120px"/>
                                    </div>
                                </form>
                            </div>

                            <div class="col-xs-8">
                                <small>Please attach facility diagram (outdoor events)</small>
                            </div>

                        </div>
                        %{--ATTACHMENT FOR RENTAL AGREEMENT--}%
                        <div class=" fileNameContainer row" style="padding-top:6px; display:none">
                            <div class="col-xs-9" style="text-align:right; font-size:11px">
                                <span class="fileNameSpan" id="facilityDiagramFileSpan">File Name</span>
                            </div>

                            <div class="col-xs-3">
                                <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
                %{--ATTACHMENTS CONTAINER--}%
                %{--HAZARDS PYRO / STUNTS / CONTAINERS FILE ATTACHMENT--}%
                <div class="form-group col-xs-12">
                    %{--HAZARDS--}%
                    <label for="hazardsCheckBoxes">Check additional Hazards if Applicable below:</label>

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
        </div>
    </div>
