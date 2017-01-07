<div id="insuredInfo">
    <div class="col-xs-12">
        <div class="col-xs-6">
            <div class="form-group">
                <label for="nameOfProduction">Name Of Production Company</label>
                <g:textField type="text" class="form-control" name="nameOfProductionCompany"
                             id="nameOfProductionCompany" placeholder="Company Name"/>
            </div>

            <div class="form-group">
                <label for="titleOfProduction">Title of Production</label>
                <g:textField type="text" class="form-control" name="titleOfProduction" id="titleOfProduction"
                             placeholder="Title of Production"/>
            </div>

            <div class="form-group">
                <label for="nameOfPrincipal">Name(s) of Principal(s)</label>
                <g:textField type="text" class="form-control" name="nameOfPrincipal" id="nameOfPrincipal"
                             placeholder="Name(s) of Principal(s)"/>
            </div>
        </div>

        <div class="col-xs-6">

            <div class="form-group">
                <label for="numberOfYearsOfExperience">Number of Years of Experience (Attach Bio / Resume if available)</label>

                <div class="col-xs-9">
                    <g:textField type="text" class="form-control" name="numberOfYearsOfExperience"
                                 id="numberOfYearsOfExperience" placeholder="# Years of Experience"/>
                </div>

                <div class="col-xs-3">
                    <form enctype="multipart/form-data">
                        <div class="fileUpload btn btn-primary">
                            <span>Attach File</span>
                            <input name="file" type="file" class="file"/>
                        </div>
                    </form>
                </div>
            </div>


            <!--attach bio/resume if available-->
            <div class="form-group">
                <label for="listOfPriorLosses">List and Describe all Prior Losses (Or Enter "None")</label>

                <div class="col-xs-9">
                    <g:textField type="text" class="form-control" name="listOfPriorLosses" id="listOfPriorLosses"
                                 placeholder="List/Describe Prior Losses"/>
                </div>

                <div class="col-xs-3">
                    <form enctype="multipart/form-data">
                        <div class="fileUpload btn btn-primary">
                            <span>Attach File</span>
                            <input name="file" type="file" class="file"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="riskSpecificInfo">
    <div class="row">
        <div class="col-xs-6">
            <div class="col-xs-12">
                <h4 class="title" style="margin-top:0px">Type of Production</h4>
            </div>

            <div class="col-xs-12">
                <p><input type="checkbox" class="documentary" name="documentary"/> Documentary</p>

                <p><input type="checkbox" class="motionPictureFeatureFilms"
                          name="motionPictureFeatureFilms"/> Motion Picture Feature Films</p>

                <p><input type="checkbox" class="tvMovie" name="tvMovie"/> TV Movie</p>

                <p><input type="checkbox" class="tvPilotSpecial" name="tvPilotSpecial"/> TV Pilot / Special</p>

                <p><input type="checkbox" class="tvSeries" name="tvSeries" id="tvSeriesCheckBox"/> TV Series</p>

                <div class="form-group">
                    <g:textField type="text" class="form-control" name="numberOfEpisodes" id="specFilmNumEpisodesText"
                                 placeholder="Number Of Episodes" style="display:none"/>
                </div>

                <p><input type="checkbox" class="shortFilm" name="shortFilm"/> Short Film</p>

                <p><input type="checkbox" class="animationCGI" name="animationCGI"/> Animation CGI</p>

                <p><input type="checkbox" class="other" name="other" id="otherProductionType"/> Other</p>

                <div class="form-group">
                    <g:textField type="text" class="form-control" name="specFilmOtherDescribe"
                                 id="specFilmOtherDescribe" placeholder="Please describe Other" style="display: none"/>
                </div>
            </div>

            <div class="col-xs-12">
                <div class="form-group">
                    <label for="productionInvolves">The Production involves (check all that apply):</label>

                    <p><input type="checkbox" class="useOfAnimals" name="useOfAnimals"/> Use of Animals</p>

                    <p><input type="checkbox" class="motorcycles" name="motorcycles"/> Motorcycles</p>

                    <p><input type="checkbox" class="airborneCrafts" name="airborneCrafts"/> Airborne Crafts</p>

                    <p><input type="checkbox" class="railroadCarsOrEquipment"
                              name="railroadCarsOrEquipment"/> Railroad Cars or Equipment</p>

                    <p><input type="checkbox" class="underwaterFilming" name="underwaterFilming"/> Underwater Filming
                    </p>

                    <p><input type="checkbox" class="specialVehicles" name="specialVehicles"/> Special Vehicles</p>

                    <p><input type="checkbox" class="waterborneCrafts" name="waterborneCrafts"/> Waterborne Crafts</p>

                    <p><input type="checkbox" class="pyrotechnics" name="pyrotechnics"
                              id="pyrotechnicsCheckbox"/> Pyrotechnics (Explosions, fire) (Supplemental Application)</p>

                    <div class="row" id="pyrotechnicsAttachContainer" style="margin-bottom: 20px; display:none">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="file" type="file" class="file"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8">
                            <small>Please attach details of involvement of any Cast Member</small>
                        </div>
                    </div>

                    <p><input type="checkbox" class="stuntsOrHazardousActivites" name="stuntsOrHazardousActivities"
                              id="stuntsHazardousCheckbox"/> Stunts or Hazardous Activities (Supplemental Application)
                    </p>

                    <div class="row" id="stuntsHazardousActivitiesAttachContainer"
                         style="margin-bottom: 20px; display:none">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="file" type="file" class="file"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8">
                            <small>Please attach details of involvement of any Cast Member</small>
                        </div>
                    </div>

                    <p><input type="checkbox" name="noneOfTheAbove"/> None of the Above</p>
                </div>

                <div class="form-group">
                    <label for="castOtherFilms">Does any Cast Member have any film projects immediately following this project?</label>

                    <p><input type="checkbox" class="" name="castOtherFilmYes"/> Yes</p>

                    <p><input type="checkbox" class="" name="castOtherFilmNo"/> No</p>
                </div>

                <div class="col-xs-9">
                    <label for="totalBudget">Filming Location(s) and Filming date(s)(Attach DOOD)</label>
                </div>

                <div class="col-xs-3">
                    <form enctype="multipart/form-data">
                        <div class="fileUpload btn btn-primary">
                            <span>Attach File</span>
                            <input name="file" type="file" class="file"/>
                        </div>
                    </form>
                </div>


                <div class="col-xs-9">
                    <label for="storySynopsis">Story / Synopsis (Attach Treatment)</label>
                </div>

                <div class="col-xs-3">
                    <div class="form-group">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Attach File</span>
                                <input name="file" type="file" class="file"/>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>

        <div class="col-xs-6">
            <div class="col-xs-12">
                <label for="totalBudget">Total Budget (Attach at least top sheet of budget)</label>
            </div>

            <div class="col-xs-9">
                <div class="form-group">
                    <g:textField type="text" class="totalBudget" class="form-control" name="totalBudget"
                                 id="totalBudgetInput" placeholder="\$USD" required="required"/>
                </div>
            </div>

            <div class="col-xs-3">
                <form enctype="multipart/form-data">
                    <div class="fileUpload btn btn-primary">
                        <span>Attach File</span>
                        <input name="file" type="file" class="file"/>
                    </div>
                </form>
            </div>


            <div class="col-xs-12">
                <label for="principalPhotographyDates">Principal Photography Dates</label>
            </div>


            <div class="col-xs-6">
                <div class="form-group"><!-- Date input -->
                <g:textField class="form-control datepicker" class="principalPhotographyDateStart"
                             id="principalPhotographyDateStart" name="date" placeholder="Start" type="text"/>
                </div>
            </div>

            <div class="col-xs-6">
                <div class="form-group"><!-- Date input -->
                <g:textField class="form-control datepicker" class="principalPhotographyDateEnd"
                             id="principalPhotographyDateEnd" name="date" placeholder="End" type="text"/>
                </div>
            </div>


            <div class="col-xs-12">
                <div class="form-group">
                    <label for="producer">Producer</label>
                    <g:textField type="text" class="form-control" id="producer" name="producer" placeholder="Producer"/>
                </div>
            </div>


            <div class="col-xs-12">
                <div class="form-group">
                    <label for="director">Director</label>
                    <g:textField type="text" class="form-control" id="director" name="director" placeholder="Director"/>
                </div>
            </div>

            <div class="col-xs-12">
                <div class="form-group">
                    <label for="sourceOfFinancing">Source of Financing</label>
                    <g:textField type="text" class="form-control" id="sourceOfFinancing" name="sourceOfFinancing"
                                 placeholder="Source"/>
                </div>
            </div>

            <div class="col-xs-12">
                <div class="form-group">
                    <label for="completionBondRequired">Completion Bond Required?</label>

                    <p><input type="checkbox" class="completionBondRequiredYes" name="completionBondRequiredYes"/> Yes
                    </p>

                    <p><input type="checkbox" class="completionBondRequiredNo" name="completionBondRequiredNo"/> No</p>
                </div>
            </div>


            <div class="col-xs-12">
                <div class="form-group">
                    <label for="completionBondCompany">Completion Bond Company:</label>
                    <g:textField type="text" class="form-control" id="completionBondCompany"
                                 name="completionBondCompany" placeholder="Name Of Completion Bond Company"/>
                </div>
            </div>


            <div class="col-xs-12">
                <label for="castInsuranceRequired">Cast Insurance Required?</label>
            </div>

            <div class="col-xs-12">
                <div class="form-group">
                    <p><input type="checkbox" name="castInsuranceRequiredYes" class="castInsuranceRequiredYes"
                              id="castInsuranceRequiredCheckBox"/> Yes</p>

                    <p><input type="checkbox" name="castInsuranceRequiredNo" class="castInsuranceRequiredNo"/> No</p>

                    <div id="castInsuranceRequiredContainer" style="display:none">
                        <div id="castMemberInfo">
                            <div class="form-group col-xs-12">
                                <label class="control-label">Number of Cast Members</label>
                                <input class="form-control" type="text" placeholder="Enter Number of Cast Members"
                                       name="numberOfCastMembers" id="castNumber"/>
                            </div>

                            <div class="castMember">
                                <h5 class="castMemberHeader" style="font-size: 16px;">Cast Member #1</h5>

                                <div class="form-group col-xs-6">
                                    <g:textField type="text" class="form-control" id="castName"
                                                 name="namesOfCastMembers" placeholder="Name"/>
                                </div>

                                <div class="form-group col-xs-4">
                                    <g:textField type="text" class="form-control" id="castRole"
                                                 name="rolesOfCastMembers" placeholder="Role"/>
                                </div>

                                <div class="form-group col-xs-2">
                                    <g:textField type="text" class="form-control" id="castAge" name="ageOfCastMembers"
                                                 placeholder="Age"/>
                                </div>

                                <div class="row">
                                    <div class="form-group col-xs-12" style="margin-left:20px">
                                        <button class="btn btn-primary btn-sm addCastMember"
                                                type="button">Add Member</button>
                                        <button class="btn btn-danger btn-sm removeCastMember"
                                                type="button">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="coverageCheckboxesDiv">
    <div class='col-xs-4' style="margin-top: 5px;">
        <div class='form-group col-xs-12 EPKGDiv'  >
            <p><input type='checkbox' class='coverageInput' name='coverage' id='EPKGcoverage' /> Entertainment Package</p>
        </div>
        <div class='form-group col-xs-12'  style="padding-left: 40px; margin-top:-20px;">
            <span class='coverageInput' style="display:none" id="PIPChoiceInput"><input type="radio" name="EPKGRadio" class="coverageRadioButton EPKG" value="PIP CHOI"  id="PIPChoiceInputRadio"> PIP Choice<br></span>
            <span class='coverageInput' style="display:none" id="PIP1Input"><input type="radio" name="EPKGRadio" class="coverageRadioButton EPKG" value="PIP 1" id="PIP1InputRadio"> PIP 1 (60 Days or less)<br></span>
            <span class='coverageInput' style="display:none" id="PIP2Input"><input type="radio" name="EPKGRadio" class="coverageRadioButton EPKG" value="PIP 2" id="PIP2InputRadio"> PIP 2 (60 Days or less)<br></span>
            <span class='coverageInput' style="display:none" id="PIP3Input"><input type="radio" name="EPKGRadio" class="coverageRadioButton EPKG" value="PIP 3" id="PIP3InputRadio"> PIP 3 (365 Days Policy)<br></span>
            <span class='coverageInput' style="display:none" id="PIP4Input"><input type="radio" name="EPKGRadio" class="coverageRadioButton EPKG" value="PIP 4" id="PIP4InputRadio"> PIP 4 (365 Days Policy)<br></span>
            <span class='coverageInput' style="display:none" id="PIP5Input"><input type="radio" name="EPKGRadio" class="coverageRadioButton EPKG" value="PIP 5" id="PIP5InputRadio"> PIP 5 (365 Days Policy)</span>
        </div>
        <div class='form-group col-xs-12 ' id="EPKGoptions" style="padding-left: 40px; display:none; " >
            <span style="font-weight: 400px; font-size:12px;">Optional Coverages</span>
            <br>
            <p id="EPKGNOHAOption"style=" font-size:12px; margin:0px"><input type='checkbox' class='additionalCoverageCheckboxEPKG' name='coverage' value="NOHA01" id='EPKGNOHAAdditionalCoverage' /> Non Owned Hired Auto Physical Damage
                <br></p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; display:none"><input type='radio' name="PIP5RadioOptionCoverage" class='additionalCoverageCheckboxPIP5' name='coverage' value="CIVIL100" id='EPKGCIVIL100AdditionalCoverage' /> Civil Authority (US Only) - $100K Limit</p>
            <p class="PIP5Options" style=" font-size:12px; margin:0px; display:none"><input type='radio' name="PIP5RadioOptionCoverage" class='additionalCoverageCheckboxPIP5' name='coverage' value="CIVIL500" id='EPKGCIVIL500AdditionalCoverage' /> Civil Authority (US Only) - $500K Limit</p>
            <br>
            <p class="PIP5Options" style=" font-size:12px; margin:0px; display:none"> Animal Mortality Under Cast Insurance</p>
            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="BirdsFish" id='EPKGBirdsFishAdditionalCoverage' /> Domestic Birds Or Fish</p>
            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="Dogs" id='EPKGDogsAdditionalCoverage' /> Dogs (with certain breed exceptions)</p>
            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="Reptiles" id='EPKGReptilesAdditionalCoverage' /> Reptiles (non-venomous)</p>
            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="SmallOther" id='EPKGSmallOtherAdditionalCoverage' /> Small Domestic Animals (Other)</p>
            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="FarmAnimals" id='EPKGFarmAnimalsAdditionalCoverage' /> Farm Animals</p>
            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="WildCats" id='EPKGWildCatsAdditionalCoverage' /> Wild Cats (Caged)</p>
            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="OtherRefer" id='EPKGOtherReferAdditionalCoverage' /> All Others - Refer Only</p>
        </div>
        <div class='form-group col-xs-12 CPKDiv' >
            <p><input type='checkbox' class='coverageInput' name='coverage' id='CPKCGLcoverage' /> Commercial Package </p>
        </div>
        <div class='form-group col-xs-12 CPKDiv' style="padding-left: 40px; margin-top:-20px;" >
            <span class='coverageInput'  id="CPKInput"><input type="radio" name="commercial" class="coverageRadioButton CPK" value="BARCPKGC" id="BARCPKGCInputRadio"> Commercial Package  (CGL & NOAL)<br></span>
            <span class='coverageInput'  id="CGLInput"><input type="radio" name="commercial" class="coverageRadioButton CGL" value="CGL13" id="CGL13InputRadio"> Commercial General Liability</span>
        </div>
        <div class='form-group col-xs-12 ' id="CPKCGLoptions" style="padding-left: 40px; display:none; " >
            <span style="font-weight: 400px; font-size:12px;">Additional Coverage</span>
            <br>
            <p style=" font-size:12px; margin:0px"><input type='checkbox' class='additionalCoverageCheckboxCPKCGL' name='coverage' id='BAIAdditionalCoverage' /> Blanket Additional Insured</p>
            <p style=" font-size:12px;  margin:0px"><input type='checkbox' class='additionalCoverageCheckboxCPKCGL' name='coverage' id='WOSAdditionalCoverage' /> Waiver Of Subrogation</p>
            <p style=" font-size:12px;  margin:0px"><input type='checkbox' class='additionalCoverageCheckboxCPKCGL' name='coverage' id='EAIAdditionalCoverage' /> Each Additional Insured</p>

        </div>
        <div class='form-group col-xs-12 ' id="DICEOptions" style="display:none" >
            <p><input type='checkbox' class='coverageInput' name='coverage' id='DICEcoverage' /> Blanket Dice Producers</p>
        </div>
        <div class='form-group col-xs-12' id="SPECIFICOptions" style="display:none" >
            <p><input type='checkbox' class='coverageInput' name='coverage' id='SPECFILMcoverage' /> Specific Film Producers</p>
        </div>
    </div>
    <div class="col-xs-8" style="margin-top: -33px;">
        <div class = "form-group col-xs-12">
            <h5 id="limitsHeader">Limits/Deductions</h5>
            <div class="row">
                <div class="col-xs-6">
                    <u>Coverage</u>
                </div>
                <div class="col-xs-2">
                    <u>Limits</u>
                </div>
                <div class="col-xs-2">
                    <u>Premium</u>
                </div>
                <div class="col-xs-2">
                    <u>Deductibles</u>
                </div>
            </div>
            <div id="limitsDeductPremiumInsert">
                <div class="row">
                    <div class="col-xs-6 coverageColumn" >
                        <span>-</span>
                    </div>
                    <div class="col-xs-2 limitColumn">
                        <span>-</span>
                    </div>
                    <div class="col-xs-2 premiumColumn">
                        <span>-</span>
                    </div>
                    <div class="col-xs-2 deductibleColumn">
                        <span>-</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    %{--<div class='col-xs-4'>--}%

    %{--</div>--}%
    %{--<div class='row'>--}%

    %{--</div>--}%
    %{--<div class='row'>--}%

    %{--</div>--}%
</div>