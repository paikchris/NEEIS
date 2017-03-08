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

                %{--RENT PROPERTY TO OTHER--}%
                <div class=" form-group col-xs-12">
                    <div class="row">
                        <label>Do you rent real property to others?</label><br>
                        <input type="radio" name="signingWaivers"
                               class="showReview"
                               value="Yes"
                               data-reviewName="Do you rent real property to others?"
                               id="rentPropertyYes_RadioButton"> Yes
                        <input type="radio" name="signingWaivers"
                               class=""
                               value="No"
                               data-reviewName="Do you rent real property to others?"
                               id="rentPropertyNo_RadioButton"
                               checked="checked"> No
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

                %{--PRIOR LOSSES--}%
                <div class="form-group col-xs-12 row">
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

        </div>

        <div class="col-xs-6">

            %{--TOTAL NUMBER OF EMPLOYESS--}%
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

            %{--COVERAGE FOR IN SERVANT REQUIRE Y/N--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Coverage for In-servants Required?</label><br>
                    <input type="radio" name="inServantCoverageRequested?"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Coverage for In-servants Required?"
                           id="inServantCoverageRequestedYes_RadioButton"> Yes
                    <input type="radio" name="inServantCoverageRequested?"
                           class=""
                           value="No"
                           data-reviewName="Coverage for In-servants Required?"
                           id="inServantCoverageRequestedNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>

            %{--DOES APPLICANT HAVE BODY GUARDS Y/N--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Does Applicant have body guards?</label><br>
                    <input type="radio" name="bodyGuard?"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Does Applicant have body guards?"
                           id="bodyGuardYes_RadioButton"> Yes
                    <input type="radio" name="bodyGuard?"
                           class=""
                           value="No"
                           data-reviewName="Does Applicant have body guards?"
                           id="bodyGuardNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>

            %{--DOES APPLICANT HAVE DOGS Y/N--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Does Applicant have dogs?</label><br>
                    <input type="radio" name="doesApplicantHaveDogs"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Does Applicant have dogs?"
                           id="dogsYes_RadioButton"> Yes
                    <input type="radio" name="doesApplicantHaveDogs"
                           class=""
                           value="No"
                           data-reviewName="Does Applicant have dogs?"
                           id="dogsNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>

            <div id="dogsContainer" style="display:none">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="whatDogsBreed">What breed?</label>
                        <input type="text" class="form-control" name="dogsBreed" placeholder="dogsBreed"
                               id="dogsBreed"/>
                    </div>
                </div>
            </div>

            %{--DOES APPLICANT HAVE RENTAL PROPERTIES OR FARMS Y/N--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Does Applicant have rental properties or farms?</label><br>
                    <input type="radio" name="doesApplicantHaveRentalPropertiesOrFarms"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Does Applicant have rental properties or farms?"
                           id="farmsYes_RadioButton"> Yes
                    <input type="radio" name="doesApplicantHaveRentalPropertiesOrFarms"
                           class=""
                           value="No"
                           data-reviewName="Does Applicant have rental properties or farms?"
                           id="farmsNo_RadioButton"
                           checked="checked"> No
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

                    %{--COMPREHENSIVE PERSONAL LIABILITY (CPL) REQUIRED--}%
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Comprehensive Personal Liability (CPL) Coverage Required?</label><br>
                            <input type="radio" name="comprehensivePersonalLiabilityRequested"
                                   class="showReview"
                                   value="Yes"
                                   data-reviewName="Comprehensive Personal Liability (CPL) Coverage Required?"
                                   id="comprehensivePersonalLiabilityRequestedYes_RadioButton"> Yes
                            <input type="radio" name="comprehensivePersonalLiabilityRequested"
                                   class=""
                                   value="No"
                                   data-reviewName="Comprehensive Personal Liability (CPL) Coverage Required?"
                                   id="comprehensivePersonalLiabilityRequestedNo_RadioButton"
                                   checked="checked"> No
                        </div>
                    </div>

                    %{--CPL CONTAINER / ADDITIONAL QUESTION--}%
                    <div id="cplAddressContainer" style="display:none">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="CPLaddress">If CPL required, what is/are home address(es)</label>
                                <input type="text" class="form-control" name="cplAddress" placeholder="address"
                                       id="cplAddress"/>
                            </div>
                        </div>
                    </div>

                    %{--COMMERCIAL GENERAL LIABILITY LIMITS REQUESTED--}%
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

                    %{--BLANKET ADDITIONAL INSURED REQUESTED--}%
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

                    %{--WAIVER OF SUBROGATION REQUESTED--}%
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

                    %{--MISC EQUIPMENT COVERAGE REQUESTED--}%
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

                        <div class="col-xs-12"

                        <div class="form-group">
                            <label for="equipmentLocation">Where is equipment kept when not in use?</label>
                            <input type="text" id="equipmentLocation" class="showReview form-control"
                                   name="name" data-reviewName="Where is equipment kept when not in use?"
                                   style="display: none;" placeholder="Location of equipment"/>
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

                    %{--HIRED AND NON-OWNED AUTO LIABILITY REQUESTED--}%
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

                    %{--HIRED AND NON-OWNED AUTO LIABILITY CONTAINER / ADDITIONAL QUESTIONS--}%
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

                    %{--WORK COMP COVERAGE REQUESTED--}%
                    <div class="col-xs-12" id="workCompCoverageRequested">
                        <p class="control-label"><input type="checkbox"
                                                        class=""
                                                        data-reviewName="" name=""
                                                        id="workCompCoverageRequestedCheckbox"
                                                        value=""/> Work Comp Coverage Requested
                        </p>
                    </div>

                    %{--WILL PAYROLL SERVICE PROVIDE PRIMARY WORK COMP--}%
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

                    %{--STATE OF HIRE--}%
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

                    %{--NAMES OF OFFICER--}%
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

                    %{--NAMES OF OFFICER EXCLUDED--}%
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

                    %{--UMBRELLA COVERAGE REQUESTED--}%
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