<div id="insuredInfo">
    <div class="col-xs-12">
        <div class="col-xs-6">
            <div class="form-group">
                <label for="nameOfProduction">Name Of Production Company</label>
                <g:textField type="text" class="form-control showReview" name="nameOfProductionCompany"
                             data-reviewName="Name Of Production Company"
                             id="nameOfProductionCompany" placeholder="Company Name"/>
            </div>

            <div class="form-group">
                <label for="titleOfProduction">Title of Production</label>
                <g:textField type="text" class="form-control showReview" name="titleOfProduction" id="titleOfProduction"
                             data-reviewName="Title of Production"
                             placeholder="Title of Production"/>
            </div>

            <div class="form-group">
                <span>Is This a Reshoot?</span><br>
                <input type="radio" name="isReshootRadio"
                       class=""
                       value="Yes"
                       id=""> Yes
                <input type="radio" name="isReshootRadio"
                       class=""
                       value="No"
                       id=""
                        checked="checked"> No

            </div>

            <div class="form-group">
                <label for="nameOfPrincipal">Name(s) of Principal(s)</label>
                <g:textField type="text" class="form-control showReview" name="nameOfPrincipal" id="nameOfPrincipal"
                             data-reviewName="Name of Principals"
                             placeholder="Name(s) of Principal(s)"/>
            </div>
        </div>

        <div class="col-xs-6">
            <div class="form-group col-xs-12">
                <div class="row">
                    <div class="col-xs-12">
                        <label for="numberOfYearsOfExperience">Number of Years of Experience (Attach Bio / Resume if available)</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-9">
                        <g:textField type="text" class="form-control showReview" name="numberOfYearsOfExperience"
                                     data-reviewName="Years Experience"
                                     id="numberOfYearsOfExperience" placeholder="# Years of Experience"/>
                    </div>
                    <div class="col-xs-3">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Attach File</span>
                                <input name="bioFile" type="file" class="file" id="bioFile"/>
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
                            <g:textField type="text" class="form-control showReview" name="listOfPriorLosses"
                                         id="listOfPriorLosses" data-reviewName="Prior Losses"
                                         placeholder="List/Describe Prior Losses"/>
                        </div>

                        <div class="col-xs-3">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="lossesFile" type="file" class="file" id="lossesFile"/>
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
                        <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                    </div>

                </div>
            </div>
            <div class="form-group col-xs-12" style ="display:none" id="questionListPriorFilmProjects">
                <div class="row">
                    <div class="col-xs-12">
                        <label for="listOfPriorLosses">List of Prior Film Projects</label>
                    </div>
                </div>
                <div class="row">
                    <!--attach bio/resume if available-->
                    <div class="form-group">
                        <div class="col-xs-9">
                            <g:textField type="text" class="form-control showReview" name="listOfPriorFilms"
                                         id="listOfPriorFilms" data-reviewName="Prior Films"
                                         placeholder="Prior Films"/>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<div id="riskSpecificInfo">
    <div class="row">
        <div class="col-xs-6">
            <div class="form-group col-xs-12 checkboxGroupRequired ">
                <label class="title control-label" style="margin-top:0px"><span
                        style="color:red;">*</span> Type of Production</label>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox documentary showReview"
                                                data-reviewName="Type of Production" name="documentary"
                                                value="Documentary"/> Documentary</p>

                <p class="control-label"><input type="checkbox"
                                                class="productionTypeCheckbox motionPictureFeatureFilms showReview"
                                                data-reviewName="Type of Production"
                                                name="motionPictureFeatureFilms"
                                                value="Motion Picture Feature Films"/> Motion Picture Feature Films</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox shortFilm showReview"
                                                data-reviewName="Type of Production" name="shortFilm"
                                                value="Short Film"/> Short Film</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox tvMovie showReview"
                                                data-reviewName="Type of Production" name="tvMovie"
                                                value="TV Movie"/> TV Movie</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox tvPilotSpecial showReview"
                                                data-reviewName="Type of Production" name="tvPilotSpecial"
                                                value="TV Pilot"/> TV Pilot / Special</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox tvSeries showReview"
                                                data-reviewName="Type of Production" name="tvSeries"
                                                id="tvSeriesCheckBox" value="TV Series"/> TV Series</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox commercial showReview"
                                                data-reviewName="Type of Production" name="commercial"
                                                value="Commercial"/> Commerical</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox infomercial showReview"
                                                data-reviewName="Type of Production" name="infomercial"
                                                value="Infomercial"/> Infomercial</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox educational showReview"
                                                data-reviewName="Type of Production" name="educational"
                                                value="Educational"/> Educational</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox trainingVideo showReview"
                                                data-reviewName="Type of Production" name="trainingVideo"
                                                value="Training Video"/> Training Video</p>



                <div class="form-group control-label">
                    <g:textField type="text" class="form-control " name="numberOfEpisodes" id="specFilmNumEpisodesText"
                                 placeholder="Number Of Episodes" style="display:none"/>
                </div>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox animationCGI showReview"
                                                data-reviewName="Type of Production" name="animationCGI"
                                                value="Animation CGI"/> Animation CGI</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox other showReview"
                                                data-reviewName="Type of Production" name="other"
                                                id="otherProductionType" value="Other"/> Other</p>

                <div class="form-group control-label">
                    <g:textField type="text" class="form-control" name="specFilmOtherDescribe"
                                 id="specFilmOtherDescribe" placeholder="Please describe Other" style="display: none"/>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group checkboxGroupRequired">
                    <label class="control-label" for="productionInvolves"><span
                            style="color:red;">*</span> The Production involves (check all that apply):</label>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox useOfAnimals showReview"
                                                    data-reviewName="Special Hazards Declared" name="useOfAnimals"
                                                    value="Use of Animals"/> Use of Animals</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox motorcycles showReview"
                                                    data-reviewName="Special Hazards Declared" name="motorcycles"
                                                    value="Motorcycles"/> Motorcycles</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox airborneCrafts showReview"
                                                    data-reviewName="Special Hazards Declared" name="airborneCrafts"
                                                    value="Airborne Crafts"/> Airborne Crafts</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox railroadCarsOrEquipment showReview"
                                                    data-reviewName="Special Hazards Declared" name="railroadCarsOrEquipment"
                                                    value="Railroad Cars or Equipment"/> Railroad Cars or Equipment</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox underwaterFilming showReview"
                                                    data-reviewName="Special Hazards Declared" name="underwaterFilming"
                                                    value="Underwater Filming"/> Underwater Filming
                    </p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox specialVehicles showReview"
                                                    data-reviewName="Special Hazards Declared" name="specialVehicles"
                                                    value="Special Vehicles"/> Special Vehicles</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox waterborneCrafts showReview"
                                                    data-reviewName="Special Hazards Declared" name="waterborneCrafts"
                                                    value="Waterborne Crafts"/> Waterborne Crafts</p>

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
                                    <input name="pyroFile" type="file" class="file" id="pyroFile"/>
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
                         style="margin-bottom: 20px; display:none">
                        <div class="col-xs-3" style="margin-left:20px">
                            <form enctype="multipart/form-data">
                                <div class="fileUpload btn btn-primary">
                                    <span>Attach File</span>
                                    <input name="stuntsFile" type="file" class="file" id="stuntsFile"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-8">
                            <small>Please attach details of involvement of any Cast Member</small>
                        </div>
                    </div>
                    <div class="row" style="padding-top:6px; display:none">
                        <div class="col-xs-9" style="text-align:right; font-size:11px">
                            <span class="fileNameSpan" id="stuntsFileSpan">File Name</span>
                        </div>
                        <div class="col-xs-3">
                            <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                        </div>

                    </div>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox noneOfTheAbove showReview"
                                                    name="noneOfTheAbove showReview"
                                                    data-reviewName="Special Hazards Declared" value="None of the Above"
                                                    id="productionInvolvesNoneAbove" checked="checked"/> None of the Above</p>
                </div>

                <div id="noneOfAboveWords" style="color: red; font-size: 10px; margin-bottom: 50px; ">
                    STUNTS, PYROTECHNICS, USE OF AIRCRAFTS, DRONES, RAILROADS AND OTHER HAZARDOUS ACTIVITIES ARE EXCLUDED UNLESS DECLARED AND APPROVED BY UNDERWRITER
                    PRIOR TO COMMENCEMENT OF FILMING.  THE INDICATION THAT YOU RECEIVE AT THE END OF THIS ONLINE SUBMISSION MAY BE SUBJECT TO ADDITIONAL UNDERWRITING
                    REQUIREMENTS, ADDITIONAL SUPPLEMENTAL APPLICATION REQUIREMENTS, AND/OR ADDITIONAL PREMIUMS BASED ON EXPOSURES DECLARED AS DETERMINED BY THE
                    UNDERWRITER.
                </div>

            </div>
            <br>
        </div>
        %{--</div>--}%

        <div class="col-xs-6">
            <div class="col-xs-12">
                <label for="totalBudget">Total Budget (Attach at least top sheet of budget)</label>
            </div>

            <div class="col-xs-9">
                <div class="form-group">
                    <g:textField type="text" class="totalBudget" class="form-control" name="totalBudget"
                                 id="totalBudgetInput" placeholder="\$USD" required="required" readonly="readonly"/>
                </div>
            </div>

            <div class="col-xs-3">
                <form enctype="multipart/form-data">
                    <div class="fileUpload btn btn-primary">
                        <span>Attach File</span>
                        <input name="budgetFile" type="file" class="file" id="budgetFile"/>
                    </div>
                </form>
            </div>
            <div class="col-xs-12 fileNameContainer" style="margin-top:-10px; display: none">
                <div class="col-xs-9" style="text-align:right; font-size:11px">
                    <span class="fileNameSpan" id="budgetFileSpan">File Name</span>
                </div>
                <div class="col-xs-3" style="padding-left:22px">
                    <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                </div>

            </div>


            <div class="col-xs-12">
                <label for="principalPhotographyDates">Principal Photography Dates</label>
            </div>


            <div class="col-xs-6">
                <div class="form-group"><!-- Date input -->
                    <input class="form-control datepicker" class="principalPhotographyDateStart"
                           id="principalPhotographyDateStart" name="date" placeholder="Start" type="text"
                           required="required"/>
                </div>
            </div>

            <div class="col-xs-6">
                <div class="form-group"><!-- Date input -->
                    <input class="form-control datepicker" class="principalPhotographyDateEnd"
                           id="principalPhotographyDateEnd" name="date" placeholder="End" type="text"
                           required="required"/>
                </div>
            </div>


            <div class="col-xs-12">
                <div class="form-group">
                    <label for="producer">Producer</label>
                    <g:textField type="text" class="form-control showReview" data-reviewName="Producer" id="producer"
                                 name="producer" placeholder="Producer"/>
                </div>
            </div>


            <div class="col-xs-12">
                <div class="form-group">
                    <label for="director">Director</label>
                    <g:textField type="text" class="form-control showReview" data-reviewName="Director" id="director"
                                 name="director" placeholder="Director"/>
                </div>
            </div>

            <div class="col-xs-12" id="questionSourceFinancing" style="display: none;">
                <div class="form-group">
                    <label for="sourceOfFinancing">Source of Financing</label>
                    <g:textField type="text" class="form-control showReview" data-reviewName="Source of Financing"
                                 id="sourceOfFinancing" name="sourceOfFinancing"
                                 placeholder="Source"/>

                </div>
            </div>
        <div class="col-xs-12" id="questionCompletionBondRequired" style="display: none;">
            <div class="form-group">
                <p class="control-label"><input type="checkbox"
                                                class="showReview"
                                                data-reviewName="Completion Bond Required" name="completionBondRequired"
                                                value="Yes"/> Completion Bond Required?</p>
            </div>
        </div>

        <div id="questionFilmingLocations" style = 'display: none;'>
            <div class="row col-xs-12">
                <br>
                <div class="col-xs-9">
                    <label for="totalBudget">Filming Location(s) and Filming date(s)</label>
                    <p class="control-label"><input type="checkbox"
                                                    class=""
                                                    data-reviewName="" name=""
                                                    id="showFilmLocationsCheckbox"
                                                    value=""/> Enter Film Locations
                    </p>
                </div>
                <div class="col-xs-3">
                    <br>
                    <form enctype="multipart/form-data">
                        <div class="fileUpload btn btn-primary">
                            <span>Attach File</span>
                            <input name="doodFile" type="file" class="file" id="doodFile"/>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-xs-12 fileNameContainer" style="padding-top:6px; display: none">
                <div class="col-xs-9" style="text-align:right; font-size:11px; padding-right:29px;">
                    <span class="fileNameSpan" id="doodFileSpan">File Name</span>
                </div>
                <div class="col-xs-3" style="padding-left:0px">
                    <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                </div>

            </div>

            <div id="filmingLocationInfo" style="display:none">
                <div class="locationFilm">
                    <div class="form-group col-xs-6">
                        <h5 class="filmingLocationHeader" style="font-size: 16px;">Filming Location #1</h5>
                        <g:textField type="text" class="form-control" id="filmingLocation"
                                     name="filmLocation" placeholder="Location"/>
                    </div>

                    <div class="col-xs-3">
                        %{--<div class="form-group"> <!-- Date input -->--}%
                        <h5 class="startDateHeader" style="font-size: 16px;">Start Date</h5>
                        <input class="form-control " type="text"
                               placeholder="Hidden Text Field To Adjust Focus off Date" name="hiddenField"
                               style="display: none;"/>
                        <input class="form-control datepicker filmLocationStart" name="date" placeholder="MM/DD/YYY"
                               type="text"/>
                        %{--</div>--}%
                    </div>

                    <div class="col-xs-3">
                        %{--<div class="form-group"> <!-- Date input -->--}%
                        <h5 class="endDateHeader" style="font-size: 16px;">End Date</h5>
                        <input class="form-control datepicker filmLocationEnd" name="date" placeholder="MM/DD/YYY"
                               type="text"/>
                        %{--</div>--}%
                    </div>

                    <div class="col-xs-12">
                        <div class="row">
                            <div class="form-group" style="margin-left:20px">
                                <button class="btn btn-primary btn-sm addFilmLocation"
                                        type="button">Add Location</button>
                                <button class="btn btn-danger btn-sm removeFilmLocation"
                                        type="button">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        


        <div class="row col-xs-12">
            <br>
            <div class="col-xs-9">
                <label for="storySynopsis">Story / Synopsis (Attach Treatment)</label>
            </div>
        </div>
        <div class="row col-xs-12">
            <div class="col-xs-9">
                <g:textField type="text" class="form-control showReview" data-reviewName="Story / Synopsis" id="story"
                             name="story" placeholder="Story"/>
            </div>
            <div class="col-xs-3">
                <div class="form-group">
                    <form enctype="multipart/form-data">
                        <div class="fileUpload btn btn-primary">
                            <span>Attach File</span>
                            <input name="treatmentFile" type="file" class="file" id="treatmentFile"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-xs-12 fileNameContainer" style="margin-top:-6px; display: none">
            <div class="col-xs-9" style="text-align:right; font-size:11px; padding-right: 30px;">
                <span class="fileNameSpan" id="treatmentFileSpan">File Name</span>
            </div>
            <div class="col-xs-3" style="margin-left:-15px;">
                <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
            </div>

        </div>

        <div id="questionsCast">
            <div class="col-xs-12">
                <br>
                <div class="form-group">
                    <label for="storySynopsis">Number of Cast Members</label>
                <g:textField type="text" class="form-control showReview" data-reviewName="Number of Cast Members" id="numberOfCastMembers"
                             name="numberOfCastMembers" placeholder="#"/>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="storySynopsis">Cast Member Name, Age, Role</label>
                    <g:textField type="text" class="form-control showReview" data-reviewName="Cast Member Name, Age, Role" id="castMemberInfo"
                                 name="castMemberInfo" placeholder=""/>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="storySynopsis">Any Cast Member with a film project immediately following this film project?</label>
                    <input type="radio" name="castMembersFilmAfterThis"
                           class=""
                           value="Yes"
                           id=""> Yes
                    <input type="radio" name="castMembersFilmAfterThis"
                           class=""
                           value="No"
                           id=""
                           checked="checked"> No
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="storySynopsis">Complete Cast Medical exam</label>
                    <g:textField type="text" class="form-control showReview" data-reviewName="Complete Cast Medical Exam" id="completeMedical"
                                 name="completeMedical" placeholder=""/>
                </div>
            </div>

        </div>

        <div id="questionTotalAbove" style="display: none">
            <div class="col-xs-12" >
                <div class="form-group">
                    <label for="storySynopsis">Total Above-The-Line</label>
                    <g:textField type="text" class="form-control showReview" data-reviewName="Total Above-The-Line" id="totalAboveLine"
                                 name="totalAboveLine" placeholder="total"/>
                </div>
            </div>
        </div>

        <div id="questionTotalBelow" style="display: none">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="storySynopsis">Total Below-The-Line</label>
                    <g:textField type="text" class="form-control showReview" data-reviewName="Total Below-The-Line" id="totalBelowLine"
                                 name="totalBelowLine" placeholder="total"/>
                </div>
            </div>
        </div>


        <div id="questionTotalPost" style="display: none">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="storySynopsis">Total Post Production Cost</label>
                    <g:textField type="text" class="form-control showReview" data-reviewName="Total Post Production Cost" id="totalPostProductionCost"
                                 name="totalPostProductionCost" placeholder="totalPost"/>
                </div>
            </div>
        </div>

        <div id="">
            <div class="col-xs-12" id="workCompCoverageRequested">
                <p class="control-label"><input type="checkbox"
                                                class=""
                                                data-reviewName="" name=""

                                                value=""/> Work Comp Coverage Requested
                </p>
            </div>
            <div class="row col-xs-12" id="questionWillPayrollServiceProvideWC">
                <p class="control-label"><input type="checkbox"
                                                class=""
                                                data-reviewName="" name=""

                                                value=""/> Will Payroll Service Co provide primary Work Comp Coverage?
                </p>
            </div>

            <div id="statesOfHire">
                <div class="row col-xs-12">
                    <div class="col-xs-9">
                        <label for="storySynopsis">States of Hire & Total Payroll Each State</label>
                    </div>
                </div>
                <div class="row col-xs-12">
                    <div class="col-xs-9">
                        <g:textField type="text" class="form-control showReview" data-reviewName="States of Hire & Total Payroll Each State"
                                     name="statesOfHire" placeholder=""/>
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
                        <g:textField type="text" class="form-control showReview" data-reviewName="Names of Officers, Title, % of Ownership"
                                     name="namesOfOfficers" placeholder=""/>
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
                        <g:textField type="text" class="form-control showReview" data-reviewName="Name of Officers to be Excluded under WC"
                                     name="namesOfOfficersExcluded" placeholder=""/>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
</div>


<div id="coverageCheckboxesDiv">
    <div class='col-xs-4' style="margin-top: 5px;">
        <div class='form-group col-xs-12 EPKGDiv'>
            <p><input type='checkbox' class='coverageInput' name='coverage' id='EPKGcoverage'/> Entertainment Package
            </p>
        </div>

        <div class='form-group col-xs-12' style="padding-left: 40px; margin-top:-20px;">
            <span class='coverageInput' style="display:none" id="PIPChoiceInput"><input type="radio" name="EPKGRadio"
                                                                                        class="coverageRadioButton EPKG"
                                                                                        value="PIP CHOI"
                                                                                        id="PIPChoiceInputRadio"> PIP Choice (A la Carte)<br>
            </span>

            <div id="pipChoiceSelections" style="display:none">
                <span class='' style="font-weight: 400px; font-size:12px; padding-left:20px;" id=""><input
                        type="checkbox" name="PIPCHOIRadio" class="PIPCHOIOption" value=""
                        id="PIPChoice_ExtraExpense"> Extra Expense<br></span>
                <span class='' style="font-weight: 400px; font-size:12px; padding-left:20px;" id=""><input
                        type="checkbox" name="PIPCHOIRadio" class="PIPCHOIOption" value=""
                        id="PIPChoice_MiscRented"> Miscellaneous Rented Equipment<br></span>
                <span class='' style="font-weight: 400px; font-size:12px; padding-left:20px;" id=""><input
                        type="checkbox" name="PIPCHOIRadio" class="PIPCHOIOption" value=""
                        id="PIPChoice_Props"> Props, Sets & Wardrobe<br></span>
                <span class='' style="font-weight: 400px; font-size:12px; padding-left:20px;" id=""><input
                        type="checkbox" name="PIPCHOIRadio" class="PIPCHOIOption" value=""
                        id="PIPChoice_ThirdParty"> Third Party Prop Damage Liab<br></span>

            </div>
            <span class='coverageInput' style="display:none" id="PIP1Input"><input type="radio" name="EPKGRadio"
                                                                                   class="coverageRadioButton EPKG"
                                                                                   value="PIP 1"
                                                                                   id="PIP1InputRadio"> PIP 1 (60 Days or less)<br>
            </span>
            <span class='coverageInput' style="display:none" id="PIP2Input"><input type="radio" name="EPKGRadio"
                                                                                   class="coverageRadioButton EPKG"
                                                                                   value="PIP 2"
                                                                                   id="PIP2InputRadio"> PIP 2 (60 Days or less)<br>
            </span>
            <span class='coverageInput' style="display:none" id="PIP3Input"><input type="radio" name="EPKGRadio"
                                                                                   class="coverageRadioButton EPKG"
                                                                                   value="PIP 3"
                                                                                   id="PIP3InputRadio"> PIP 3 (365 Days Policy)<br>
            </span>
            <span class='coverageInput' style="display:none" id="PIP4Input"><input type="radio" name="EPKGRadio"
                                                                                   class="coverageRadioButton EPKG"
                                                                                   value="PIP 4"
                                                                                   id="PIP4InputRadio"> PIP 4 (365 Days Policy)<br>
            </span>
            <span class='coverageInput' style="display:none" id="PIP5Input"><input type="radio" name="EPKGRadio"
                                                                                   class="coverageRadioButton EPKG"
                                                                                   value="PIP 5"
                                                                                   id="PIP5InputRadio"> PIP 5 (365 Days Policy)
            </span>
        </div>

        <div class='form-group col-xs-12 ' id="EPKGoptions" style="padding-left: 40px; display:none; ">
            <span style="font-weight: 400px; font-size:12px;">Optional Coverages</span>
            <br>

            <p id="EPKGNOHAOption" style=" font-size:12px; margin:0px"><input type='checkbox'
                                                                              class='additionalCoverageCheckboxEPKG'
                                                                              name='coverage' value="NOHA01"
                                                                              id='EPKGNOHAAdditionalCoverage'/> Non Owned Hired Auto Physical Damage
                <br></p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; display:none"><input type='radio'
                                                                                            name="PIP5RadioOptionCoverage"
                                                                                            class='additionalCoverageCheckboxPIP5'
                                                                                            name='coverage'
                                                                                            value="CIVIL100"
                                                                                            id='EPKGCIVIL100AdditionalCoverage'/> Civil Authority (US Only) - $100K Limit
            </p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; display:none"><input type='radio'
                                                                                            name="PIP5RadioOptionCoverage"
                                                                                            class='additionalCoverageCheckboxPIP5'
                                                                                            name='coverage'
                                                                                            value="CIVIL500"
                                                                                            id='EPKGCIVIL500AdditionalCoverage'/> Civil Authority (US Only) - $500K Limit
            </p>
            <br>

            <p class="PIP5Options"
               style=" font-size:12px; margin:0px; display:none">Animal Mortality</p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="BirdsFish"
                    id='EPKGBirdsFishAdditionalCoverage'/> Domestic Birds Or Fish</p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="Dogs"
                    id='EPKGDogsAdditionalCoverage'/> Dogs (with certain breed exceptions)</p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="Reptiles"
                    id='EPKGReptilesAdditionalCoverage'/> Reptiles (non-venomous)</p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="SmallOther"
                    id='EPKGSmallOtherAdditionalCoverage'/> Small Domestic Animals (Other)</p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="FarmAnimals"
                    id='EPKGFarmAnimalsAdditionalCoverage'/> Farm Animals</p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="WildCats"
                    id='EPKGWildCatsAdditionalCoverage'/> Wild Cats (Caged)</p>

            <p class="PIP5Options" style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5' name='coverage' value="OtherRefer"
                    id='EPKGOtherReferAdditionalCoverage'/> All Others - Refer Only</p>
        </div>

        <div class='form-group col-xs-12 CPKDiv'>
            <p><input type='checkbox' class='coverageInput' name='coverage' id='CPKCGLcoverage'/> Commercial Liability
            </p>
        </div>

        <div class='form-group col-xs-12 CPKDiv' style="padding-left: 40px; margin-top:-20px;">
            <span class='coverageInput' id="CPKInput"><input type="radio" name="commercial"
                                                             class="coverageRadioButton CPK" value="BARCPKGC"
                                                             id="CPKInputRadio"> Commercial Package  (CGL & NOAL)<br>
            </span>

            <div class="col-xs-12" style="padding-top: 5px;padding-left: 20px; display:none" id="costOfHireDiv">
                <label style="margin-bottom: 0px;">Cost Of Hire</label><br>
                <input type="text" style='font-size: 12px;margin-top: 0px; margin-bottom:30px;' name="commercial"
                       class="CPK" value="$" id="costOfHireInput"><br>
            </div>
            <span class='coverageInput' id="CGLInput"><input type="radio" name="commercial"
                                                             class="coverageRadioButton CGL" value="BARCPKGC"
                                                             id="CGLInputRadio"> Commercial General Liability</span>
        </div>

        <div class='form-group col-xs-12 ' id="CPKCGLoptions" style="padding-left: 40px; display:none; ">
            <span style="font-weight: 400px; font-size:12px;">Additional Coverage</span>
            <br>

            <p style=" font-size:12px; margin:0px; display:none"><input type='checkbox'
                                                                        class='additionalCoverageCheckboxCPKCGL'
                                                                        name='coverage'
                                                                        id='BAIAdditionalCoverage'/> Blanket Additional Insured
            </p>

            <p style=" font-size:12px;  margin:0px; display:none"><input type='checkbox'
                                                                         class='additionalCoverageCheckboxCPKCGL'
                                                                         name='coverage'
                                                                         id='WOSAdditionalCoverage'/> Waiver Of Subrogation
            </p>

            <p style=" font-size:12px;  margin:0px; display:none"><input type='checkbox'
                                                                         class='additionalCoverageCheckboxCPKCGL'
                                                                         name='coverage'
                                                                         id='EAIAdditionalCoverage'/> Each Additional Insured
            </p>

            <p style=" font-size:12px;  margin:0px; display:none"><input type='checkbox'
                                                                         class='additionalCoverageCheckboxCPKCGL'
                                                                         name='coverage'
                                                                         id='MEDAdditionalCoverage'/> Medical Payments
            </p>

            <p style=" font-size:12px;  margin:0px; display:none"><input type='checkbox'
                                                                         class='additionalCoverageCheckboxCPKCGL'
                                                                         name='coverage'
                                                                         id='AGGAdditionalCoverage'/> Increase Aggregate Limit to $2,000,000
            </p>
        </div>

        <div class='form-group col-xs-12 ' id="DICEOptions" style="display:none">
            <p><input type='checkbox' class='coverageInput' name='coverage' id='DICEcoverage'/> Blanket Dice Producers
            </p>
        </div>

        <div class='form-group col-xs-12' id="SPECIFICOptions" style="display:none">
            <p><input type='checkbox' class='coverageInput' name='coverage'
                      id='SPECFILMcoverage'/> Specific Film Producers</p>
        </div>
    </div>

    <div class="col-xs-8" style="margin-top: -33px;">
        <div class="form-group col-xs-12">
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

            <div class="row" id="castInsuranceInfo">

            </div>

            <div id="limitsDeductPremiumInsert">
                <div class="row">
                    <div class="col-xs-6 coverageColumn">
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

             