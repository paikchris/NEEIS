
%{--John I removed the body tag--}%
    <div class="col-xs-12">
        <div class="insuredInfo">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="nameOfProduction">Name Of Production Company</label>
                    <g:textField type="text" class="form-control" name="nameOfProductionCompany" placeholder="Company Name"/>
                </div>
                <div class="form-group">
                    <label for="titleOfProduction">Title of Production</label>
                    <g:textField type="text" class="form-control" name="titleOfProduction" placeholder="Title of Production"/>
                </div>
                <div class="form-group">
                    <label for="nameOfPrincipal">Name(s) of Principal(s)</label>
                    <g:textField type="text" class="form-control" name="nameOfPrincipal" placeholder="Name(s) of Principal(s)"/>
                </div>
            </div>
            <div class="col-xs-6">

                <cla class="form-group">
                    <label for="numberOfYearsOfExperience">Number of Years of Experience (Attach Bio / Resume if available)</label>
                    <form enctype="multipart/form-data">
                    <input name="file" type="file" id="file" />
                    <input type="button" value="Upload" id="attachButton"/>
                        </form>
                    <button class="btn-default " type="button" >Attach</button>
                    <g:textField type="text" class="form-control" name="numberOfYearsOfExperience" placeholder=""/>
                </div>
                <!--attach bio/resume if available-->
                <div class="form-group">
                    <label for="listOfPriorLosses">List of Prior Losses (Or Enter "None")</label>
                    <button class="btn-default " type="button" >Attach</button>
                    <g:textField type="text" class="form-control" name="listOfPriorLosses" placeholder="List of Prior Losses"/>
                </div>
                <div class="form-group">
                    <label for="describePriorLosses">Describe Prior Losses (Or Enter "None")</label>
                    <button class="btn-default " type="button" >Attach</button>
                    <g:textField type="text" class="form-control" name="describePriorLosses" placeholder="Describe Prior Losses"/>
                </div>

            </div>
        </div>

    </div>

    <div id="riskSpecificInfo">
        <div class="row">
            <div class="col-xs-6">
                <div class="col-xs-12">
                    <h4 class="title" style="margin-top:0px"> Type of Production </h4>
                </div>
                <div class="col-xs-12">
                    <p><input type="checkbox" name="documentary" /> Documentary </p>
                    <p><input type="checkbox" name="motionPictureFeatureFilms" /> Motion Picture Feature Films </p>
                    <p><input type="checkbox" name="tvMovie" /> TV Movie </p>
                    <p><input type="checkbox" name="tvPilotSpecial" /> TV Pilot / Special </p>
                    <p><input type="checkbox" name="tvSeries" id="tvSeriesCheckBox"/> TV Series </p>
                    <div class="form-group">
                        <g:textField type="text" class="form-control" name="numberOfEpisodes" id="specFilmNumEpisodesText" placeholder="Number Of Episodes" style="display:none"/>
                    </div>
                    <p><input type="checkbox" name="animationCGI" /> Animation CGI </p>
                    <p><input type="checkbox" name="other" id="otherProductionType"/> Other </p>
                    <div class="form-group">
                        <g:textField type="text" class="form-control" name="specFilmOtherDescribe" id="specFilmOtherDescribe" placeholder="Please describe Other" style="display: none"/>
                    </div>
                </div>

                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="productionInvolves">The Production involves (check all that apply):</label>
                        <p><input type="checkbox" name="useOfAnimals" /> Use of Animals </p>
                        <p><input type="checkbox" name="motorcycles" /> Motorcycles </p>
                        <p><input type="checkbox" name="airborneCrafts" /> Airborne Crafts </p>
                        <p><input type="checkbox" name="railroadCarsOrEquipment" /> Railroad Cars or Equipment </p>
                        <p><input type="checkbox" name="underwaterFilming" /> Underwater Filming </p>
                        <p><input type="checkbox" name="specialVehicles" /> Special Vehicles </p>
                        <p><input type="checkbox" name="waterborneCrafts" /> Waterborne Crafts </p>
                        <p><input type="checkbox" name="pyrotechnics" id="pyrotechnicsCheckbox"/> Pyrotechnics (Explosions, fire) (Supplemental Application) </p>

                        <div class="row" id="pyrotechnicsAttachContainer" style="margin-bottom: 20px; display:none">
                            <div class="col-xs-2" style="margin-left:20px">
                                <button class=" btn btn-default " type="button" >Attach</button>
                            </div>
                            <div class="col-xs-9">
                                <small>Please attach details of involvement of any Cast Member</small>
                            </div>
                        </div>

                        <p><input type="checkbox" name="stuntsOrHazardousActivities" id="stuntsHazardousCheckbox"/> Stunts or Hazardous Activities (Supplemental Application) </p>

                        <div class="row" id="stuntsHazardousActivitiesAttachContainer" style="margin-bottom: 20px; display:none">
                            <div class="col-xs-2" style="margin-left:20px">
                                <button class=" btn btn-default " type="button" >Attach</button>
                            </div>
                            <div class="col-xs-9">
                                <small>Please attach details of involvement of any Cast Member</small>
                            </div>
                        </div>

                        <p><input type="checkbox" name="noneOfTheAbove" /> None of the Above </p>
                    </div>

                </div>

                <div class="col-xs-12">
                    <label for="totalBudget">Filming Location(s) and Filming date(s)(Attach DOOD)</label>
                </div>
                <div class="col-xs-9">
                    <div class="form-group">
                        <g:textField type="text" class="form-control" name="filmingLocation(s)FilmingDates" placeholder="Filming Location(s)and Filming Date(s)"/>
                    </div>
                </div>
                <div class="col-xs-3">
                    <button class="btn btn-default " type="button" >Attach</button>
                </div>


                <div class="col-xs-12">
                    <label for="storySynopsis">Story / Synopsis (Attach Treatment)</label>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <button class="btn btn-default " type="button" >Attach</button>
                    </div>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="col-xs-12">
                    <label for="totalBudget">Total Budget (MUST Attach at least top sheet of budget)</label>
                </div>
                <div class="col-xs-9">
                    <div class="form-group">
                        <g:textField type="text" class="form-control" name="totalBudget" placeholder=""/>
                    </div>
                </div>

                <div class="col-xs-3">
                    <button class="btn btn-default " type="button" >Attach</button>
                </div>


                <div class="col-xs-12" >
                    <label for="principalPhotographyDates">Principal Photography Dates</label>
                </div>


                <div class="col-xs-6">
                    <div class="form-group"> <!-- Date input -->
                    <g:textField class="form-control datepicker" id="principalPhotographyDateStart" name="date" placeholder="Start" type="text"/>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="form-group"> <!-- Date input -->
                    <g:textField class="form-control datepicker" id="principalPhotographyDateEnd" name="date" placeholder="End" type="text"/>
                    </div>
                </div>



                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="producer">Producer</label>
                        <g:textField type="text" class="form-control" name="producer" placeholder="Producer"/>
                    </div>
                </div>



                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="director">Director</label>
                        <g:textField type="text" class="form-control" name="director" placeholder="Director"/>
                    </div>
                </div>

                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="sourceOfFinancing">Source of Financing</label>
                        <g:textField type="text" class="form-control" name="sourceOfFinancing" placeholder="Source"/>
                    </div>
                </div>

                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="completionBondRequired">Completion Bond Required?</label>
                        <p><input type="checkbox" name="completionBondRequiredYes" /> Yes </p>
                        <p><input type="checkbox" name="completionBondRequiredNo" /> No </p>
                    </div>
                </div>


                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="completionBondCompany">Completion Bond Company:</label>
                        <g:textField type="text" class="form-control" name="completionBondCompany" placeholder="Name Of Completion Bond Company"/>
                    </div>
                </div>

                <div class="col-xs-12">
                    <label for="castInsuranceRequired">Cast Insurance Required?</label>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <p><input type="checkbox" name="castInsuranceRequiredYes" /> Yes </p>
                        <p><input type="checkbox" name="castInsuranceRequiredNo" /> No </p>
                    </div>
                </div>
                <div class="col-xs-12" id="castInsuranceRequiredContainer">
                    <div class="form-group">
                        <g:textField type="text" class="form-control" name="numberOfCastMembers" placeholder="Number of Cast Members:"/>
                    </div>

                    <div class="form-group">
                        <g:textField type="text" class="form-control" name="namesAndRolesOfCastMembers" placeholder="Names and Roles of Cast Members:"/>
                    </div>
                </div>

                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="castOtherFilms">Does any Cast Member have any film projects immediately following this project?</label>
                        <p><input type="checkbox" name="castOtherFilmYes" /> Yes </p>
                        <p><input type="checkbox" name="castOtherFilmNo" /> No </p>
                    </div>
                </div>

            </div>



        </div>










            %{--<div class="form-group">--}%
                %{--<label for="checkCoveragesRequestedNeeded">Check Coverages Requested / Needed</label>--}%
                %{--<p><input type="checkbox" name="commercialGeneralLiability" /> Commercial General Liability </p>--}%
                %{--<p><input type="checkbox" name="blanketAdditionalInsuredEndorsement" /> Blanket Additional Insured Endorsement </p>--}%
                %{--<p><input type="checkbox" name="waiverOfSubrogation" /> Wavier Of Subrogation </p>--}%
                %{--<p><input type="checkbox" name="hiredAndNonOwnedAutoLiability" /> Hired and Non-Owned Auto Liability </p>--}%
                %{--<g:textField type="text" class="form-control" name="costOfHire" placeholder="Enter Cost of Hire:"/>--}%
                %{--<p><input type="checkbox" name="productionPortfolio" /> Production Portfolio </p>--}%
                %{--<!-- input table for production portfolio -->--}%
                %{--<p><input type="checkbox" name="workersCompensation" /> Workers Compensation </p>--}%
                %{--<g:textField type="text" class="form-control" name="fein" placeholder="FEIN"/>--}%
                %{--<!--MUST BE SECURED-->--}%
                %{--<g:textField type="text" class="form-control" name="stateOfHire" placeholder="State of Hire:"/>--}%
                %{--<p><input type="checkbox" name="primary" /> Primary </p>--}%
                %{--<p><input type="checkbox" name="contingent" /> Contingent, if contingent please provide name of Payroll Co. If Primary Workers Compensation desired, please complete supplemental application. </p>--}%
                %{--<!-- ONLY if contingent is selected add in drop text field to enter Payroll Co. -->--}%
                %{--<g:textField type="text" class="form-control" name="payrollCo" placeholder="Enter name of Payroll Co:"/>--}%
                %{--<p><input type="checkbox" name="umbrellaExcessLiability" /> Umbrella Excess Liability </p>--}%
                %{--<!-- if Umbrella Excess Liability is selected add in drop text field to enter limits-->--}%
                %{--<g:textField type="text" class="form-control" name="enterLimitsUmbrella" placeholder="Enter Limits:"/>--}%
                %{--<p><input type="checkbox" name="generalLiability" /> General Liability </p>--}%
                %{--<p><input type="checkbox" name="hiredAndNonOwnedAuto" /> Hired & Non-Owned Auto </p>--}%
                %{--<p><input type="checkbox" name="workersCompensationUmbrella" /> Workers Compensation </p>--}%
                %{--<p><input type="checkbox" name="foreignExposures" /> Foreign Exposures </p>--}%
            %{--</div>--}%


            %{--<div class="form-group">--}%
                %{--<label for="completedBy">Completed by:</label>--}%
                %{--<g:textField type="text" class="form-control" name="completedBy" placeholder="Enter Your Name"/>--}%
            %{--</div>--}%
            %{--<div class="form-group">--}%
                %{--<label for="completedDate">Date of Completion</label>--}%
                %{--<g:textField type="text" class="form-control" name="completedDate" placeholder="MM/DD/YYYY"/>--}%
            %{--</div>--}%

            %{--<div class="form-group">--}%
                %{--<label for="attachments">Select Attachments Provided:</label>--}%
                %{--<p><input type="checkbox" name="resumeOfKeyPersonnel" /> Resume of Key Personnel </p>--}%
                %{--<p><input type="checkbox" name="treatmentAndFilmingSchedule" /> Treatment and Filming Schedule </p>--}%
                %{--<p><input type="checkbox" name="topSheetOfBudget" /> Top Sheet of Budget </p>--}%
                %{--<p><input type="checkbox" name="supplementalApplication" /> Supplemental Application </p>--}%

            %{--</div>--}%



        </div>

    </div>

             