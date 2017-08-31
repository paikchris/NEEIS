<div id="insuredInfo">
    <div class="col-xs-6">
        %{--NAME OF PRODUCTION COMPANY--}%
        <div class="form-group col-xs-12">
            <label for="nameOfProduction">Name Of Production Company</label>
            <input type="text" class="form-control showReview" name="nameOfProductionCompany"
                   data-reviewName="Name Of Production Company"
                   id="nameOfProductionCompany" placeholder="Company Name"/>
        </div>
        %{--TITLE OF PRODUCTION--}%
        <div class="form-group col-xs-12">
            <label for="titleOfProduction">Title of Production</label>
            <input type="text" class="form-control showReview" name="titleOfProduction" id="titleOfProduction"
                   data-reviewName="Title of Production"
                   placeholder="Title of Production"/>
        </div>
        %{--NAME OF PRINCIPALS--}%
        <div class="form-group col-xs-12">
            <label for="nameOfPrincipal">Name(s) of Principal(s)</label>
            <input type="text" class="form-control showReview" name="nameOfPrincipal" id="nameOfPrincipal"
                   data-reviewName="Name of Principals"
                   placeholder="Name(s) of Principal(s)"/>
        </div>
        %{--IS THIS A RESHOOT--}%
        <div class="form-group col-xs-12">
            <span>Is This a Reshoot?</span><br>
            <input type="radio" name="isReshootRadio"
                   class=""
                   value="Yes"
                   id="isReshootYes"> Yes
            <input type="radio" name="isReshootRadio"
                   class=""
                   value="No"
                   id="isReshootNo"
                   checked="checked"> No

        </div>
    </div>

    <div class="col-xs-6">
        %{--NUMBER OF YEARS OF EXPERIENCE--}%
        <div class="form-group col-xs-12">
            <label for="numberOfYearsOfExperience">Number of Years of Experience (Attach Bio / Resume if available)</label>

            <div class="row">
                <div class="col-xs-9">
                    <input type="text" class="form-control showReview" name="numberOfYearsOfExperience"
                           data-reviewName="Years Experience"
                           id="numberOfYearsOfExperience" placeholder="# Years of Experience"/>
                </div>

                <div class="col-xs-3">
                    %{--<form enctype="multipart/form-data">--}%
                        %{--<div class="fileUpload btn btn-primary">--}%
                            %{--<span>Attach File</span>--}%
                            %{--<input name="bioFile" type="file" class="file" id="bioFile" style="width:120px"/>--}%
                        %{--</div>--}%
                    %{--</form>--}%
                    <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
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
        %{--LIST AND DESCRIBE ALL PRIOR LOSSES--}%
        <div class="form-group col-xs-12">
            <label for="listOfPriorLosses">List and Describe all Prior Losses (Or Enter "None")</label>

            <div class="row">
                <div class="col-xs-9">
                    <input type="text" class="form-control showReview" name="listOfPriorLosses"
                           id="listOfPriorLosses" data-reviewName="Prior Losses"
                           placeholder="List/Describe Prior Losses"/>
                </div>

                <div class="col-xs-3">
                    %{--<form enctype="multipart/form-data">--}%
                        %{--<div class="fileUpload btn btn-primary">--}%
                            %{--<span>Attach File</span>--}%
                            %{--<input name="lossesFile" type="file" class="file" id="lossesFile"--}%
                                   %{--style="width:120px"/>--}%
                        %{--</div>--}%
                    %{--</form>--}%
                    <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
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
        %{--LIST OF PRIOR FILM PROJECTS--}%
        %{--<div class="form-group col-xs-12">--}%
            %{--<label for="listOfPriorLosses">List of Prior Film Projects</label>--}%
            %{--<input type="text" class="form-control showReview" name="listOfPriorFilms"--}%
                   %{--id="listOfPriorFilms questionListPriorFilmProjects"--}%
                   %{--data-reviewName="Prior Films"--}%
                   %{--placeholder="Prior Films"/>--}%
        %{--</div>--}%
        %{--MAXIMUM COST OF ANY ONE PRODUCTION--}%
        <div class="form-group col-xs-12">
            <label>Maximum Cost of Any One Production</label>
            <input type="text" class="form-control showReview" name="maxCostOneProduction" id="maxCostOneProduction"
                   data-reviewName="Maximum Cost of Any One Production"
                   placeholder="$USD"/>
        </div>
    </div>
</div>

<div id="riskSpecificInfo">
    <div class="row">
        <div class="col-xs-6">

            %{--TYPE OF PRODUCTION--}%
            <div class="form-group col-xs-12 checkboxGroupRequired ">
                <label class="title control-label" style="margin-top:0px"><span
                        style="color:red;">*</span> Type of Production</label>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox documentary showReview"
                                                data-reviewName="Type of Production" name="documentary"
                                                value="Documentary"
                                                id="productionType_Documentary"/> Documentary</p>

                <p class="control-label"><input type="checkbox"
                                                class="productionTypeCheckbox motionPictureFeatureFilms showReview"
                                                data-reviewName="Type of Production"
                                                name="motionPictureFeatureFilms"
                                                value="Motion Picture Feature Films"
                                                id="productionType_MotionPicture"/> Motion Picture Feature Films</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox shortFilm showReview"
                                                data-reviewName="Type of Production" name="shortFilm"
                                                value="Short Film"
                                                id="productionType_ShortFilm"/> Short Film</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox tvMovie showReview"
                                                data-reviewName="Type of Production" name="tvMovie"
                                                value="TV Movie"
                                                id="productionType_TVMovie"/> TV Movie</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox tvPilotSpecial showReview"
                                                data-reviewName="Type of Production" name="tvPilotSpecial"
                                                value="TV Pilot"
                                                id="productionType_TVPilot"/> TV Pilot / Special</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox tvSeries showReview"
                                                data-reviewName="Type of Production" name="tvSeries"
                                                id="tvSeriesCheckBox" value="TV Series"/> TV Series</p>

                <div class="form-group control-label">
                    <input type="text" class="form-control numberEpisodesInput showReview" name="numberOfEpisodes" data-reviewName="Number of Episodes" id="specFilmNumEpisodesText"
                           placeholder="Number Of Episodes" style="display:none"/>
                </div>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox commercial showReview"
                                                data-reviewName="Type of Production" name="commercial"
                                                value="Commercial"
                                                id="productionType_Commercial"/> Commerical</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox infomercial showReview"
                                                data-reviewName="Type of Production" name="infomercial"
                                                value="Infomercial"
                                                id="productionType_Infomercial"/> Infomercial</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox educational showReview"
                                                data-reviewName="Type of Production" name="educational"
                                                value="Educational"
                                                id="productionType_Educational"/> Educational</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox trainingVideo showReview"
                                                data-reviewName="Type of Production" name="trainingVideo"
                                                value="Training Video"
                                                id="productionType_TrainingVideo"/> Training Video</p>


                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox animationCGI showReview"
                                                data-reviewName="Type of Production" name="animationCGI"
                                                value="Animation CGI"
                                                id="productionType_AnimationCGI"/> Animation CGI</p>

                <p class="control-label"><input type="checkbox" class="productionTypeCheckbox other showReview"
                                                data-reviewName="Type of Production" name="other"
                                                id="otherProductionType" value="Other"/> Other</p>

                <div class="form-group control-label">
                    <input type="text" class="form-control" name="specFilmOtherDescribe"
                           id="specFilmOtherDescribe" placeholder="Please describe Other" style="display: none"/>
                </div>
            </div>
            %{--THE PRODUCTION INVOLVES: CHECKBOXES!!!!--}%
            <div class="col-xs-12">
                <div class="form-group checkboxGroupRequired">
                    <label class="control-label" for="productionInvolves"><span
                            style="color:red;">*</span> The Production involves (check all that apply):</label>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox useOfAnimals showReview"
                                                    data-reviewName="Special Hazards Declared" name="useOfAnimals"
                                                    value="Use of Animals"
                                                    id="productionInvolves_Animals"/> Use of Animals</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox motorcycles showReview"
                                                    data-reviewName="Special Hazards Declared" name="motorcycles"
                                                    value="Motorcycles"
                                                    id="productionType_Motorcycles"/> Motorcycles</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox airborneCrafts showReview"
                                                    data-reviewName="Special Hazards Declared" name="airborneCrafts"
                                                    value="Airborne Crafts"
                                                    id="productionType_AirborneCrafts"/> Airborne Crafts</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox railroadCarsOrEquipment showReview"
                                                    data-reviewName="Special Hazards Declared"
                                                    name="railroadCarsOrEquipment"
                                                    value="Railroad Cars or Equipment"
                                                    id="productionType_Railroad"/> Railroad Cars or Equipment</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox underwaterFilming showReview"
                                                    data-reviewName="Special Hazards Declared" name="underwaterFilming"
                                                    value="Underwater Filming"
                                                    id="productionType_UnderwaterFilming"/> Underwater Filming
                    </p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox specialVehicles showReview"
                                                    data-reviewName="Special Hazards Declared" name="specialVehicles"
                                                    value="Special Vehicles"
                                                    id="productionType_SpecialVehicles"/> Special Vehicles</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox waterborneCrafts showReview"
                                                    data-reviewName="Special Hazards Declared" name="waterborneCrafts"
                                                    value="Waterborne Crafts"
                                                    id="productionType_WaterBorneCrafts"/> Waterborne Crafts</p>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox pyrotechnics showReview"
                                                    data-reviewName="Special Hazards Declared" name="pyrotechnics"
                                                    id="pyrotechnicsCheckbox"
                                                    value="Pyrotechnics (Explosions, fire) (Supplemental Application)"/> Pyrotechnics (Explosions, fire) (Supplemental Application)
                    </p>

                    <div class="row" id="pyrotechnicsAttachContainer" style="margin-bottom: 20px; display:none">
                        <div class="col-xs-3" style="margin-left:20px">
                            %{--<form enctype="multipart/form-data">--}%
                                %{--<div class="fileUpload btn btn-primary">--}%
                                    %{--<span>Attach File</span>--}%
                                    %{--<input name="pyroFile" type="file" class="file" id="pyroFile" style="width:120px"/>--}%
                                %{--</div>--}%
                            %{--</form>--}%
                            <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
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
                                %{--<form enctype="multipart/form-data">--}%
                                    %{--<div class="fileUpload btn btn-primary">--}%
                                        %{--<span>Attach File</span>--}%
                                        %{--<input name="stuntsFile" type="file" class="file" id="stuntsFile"--}%
                                               %{--style="width:120px"/>--}%
                                    %{--</div>--}%
                                %{--</form>--}%
                                <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
                            </div>

                            <div class="col-xs-8" style="padding-left:0px; line-height: 30px;">
                                <small>Please attach details of involvement of any Cast Member</small>
                            </div>
                        </div>

                        <div class="row fileNameContainer" style="padding-top:6px; display:none">
                            <div class="col-xs-3">
                                <button type="button"
                                        class="btn btn-default btn-xs attachClearButton pull-right">Clear</button>
                            </div>

                            <div class="col-xs-9" style="font-size: 11px;padding-left: 20px;">
                                <span class="fileNameSpan" id="stuntsFileSpan">File Name</span>
                            </div>

                        </div>


                        <div class="row"></div>
                        <br>

                        <div class="row">
                            <div class="col-xs-3" style="margin-left:20px">
                                %{--<form enctype="multipart/form-data">--}%
                                    %{--<div class="fileUpload btn btn-primary">--}%
                                        %{--<span>Attach File</span>--}%
                                        %{--<input name="animalPDF" type="file" class="file" id="animalPDF"--}%
                                               %{--style="width:120px"/>--}%
                                    %{--</div>--}%
                                %{--</form>--}%
                                <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
                            </div>

                            <div class="col-xs-8" style="padding-left:0px; line-height: 30px;">
                                <small>Please complete Animal Questionnaire</small>
                            </div>
                        </div>

                        <div class="row fileNameContainer" style="padding-top:6px; display:none">
                            <div class="col-xs-3">
                                <button type="button"
                                        class="btn btn-default btn-xs attachClearButton pull-right">Clear</button>
                            </div>

                            <div class="col-xs-9" style="font-size: 11px;padding-left: 20px;">
                                <span class="fileNameSpan" id="animalPDFSpan">File Name</span>
                            </div>

                        </div>

                        <div class="row"></div>
                        <br>

                        <div class="row">
                            <div class="col-xs-3" style="margin-left:20px">
                                %{--<form enctype="multipart/form-data">--}%
                                    %{--<div class="fileUpload btn btn-primary">--}%
                                        %{--<span>Attach File</span>--}%
                                        %{--<input name="dronePDF" type="file" class="file" id="dronePDF"--}%
                                               %{--style="width:120px"/>--}%
                                    %{--</div>--}%
                                %{--</form>--}%
                                <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
                            </div>

                            <div class="col-xs-8" style="padding-left:0px; line-height: 30px;">
                                <small>Please complete Drone Questionnaire</small>
                            </div>
                        </div>

                        <div class="row fileNameContainer" style="padding-top:6px; display:none">
                            <div class="col-xs-3">
                                <button type="button"
                                        class="btn btn-default btn-xs attachClearButton pull-right">Clear</button>
                            </div>

                            <div class="col-xs-9" style="font-size: 11px;padding-left: 20px;">
                                <span class="fileNameSpan" id="dronePDFSpan">File Name</span>
                            </div>

                        </div>

                        <br>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="stuntCoordinator">Name of Stunt Coordinator</label>
                                <input type="text" name="name" class=" showReview form-control stuntHidden"
                                       data-reviewName="Name of Stunt Coordinator"
                                       placeholder="Stunt Coordinator" id="stuntCoordinatorName" style="display:none"/>
                            </div>
                        </div>

                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="signing">Are Participants Signing Waivers?</label>
                                <input type="text" name="name" class="showReview form-control stuntHidden"
                                       data-reviewName="Are Participants Signing Waivers?"
                                       placeholder="Y/N" id="participantsSigningWaivers" style="display:none"/>
                            </div>
                        </div>
                    </div>

                    <p class="control-label"><input type="checkbox"
                                                    class="productionInvolvesCheckbox noneOfTheAbove showReview"
                                                    name="noneOfTheAbove showReview"
                                                    data-reviewName="Special Hazards Declared" value="None"
                                                    id="productionInvolvesNoneAbove"
                                                    checked="checked"/> None of the Above</p>
                </div>

                <div id="noneOfAboveWords" style="color: red; font-size: 10px; margin-bottom: 50px; ">
                    STUNTS, PYROTECHNICS, USE OF AIRCRAFTS, DRONES, RAILROADS AND OTHER HAZARDOUS ACTIVITIES ARE EXCLUDED UNLESS DECLARED AND APPROVED BY UNDERWRITER
                    PRIOR TO COMMENCEMENT OF FILMING.  THE INDICATION THAT YOU RECEIVE AT THE END OF THIS ONLINE SUBMISSION MAY BE SUBJECT TO ADDITIONAL UNDERWRITING
                    REQUIREMENTS, ADDITIONAL SUPPLEMENTAL APPLICATION REQUIREMENTS, AND/OR ADDITIONAL PREMIUMS BASED ON EXPOSURES DECLARED AS DETERMINED BY THE
                    UNDERWRITER.
                </div>

            </div>
            <br>

            %{--DO YOU DO POST PRODUCTION OR SPECIAL EFFECTS FOR OTHERS? Y/N--}%
            <div class="form-group col-xs-12">
                <label>Do you do post production or special effects for others?</label><br>
                <input type="radio" name="postProductionForOthers"
                       class="showReview"
                       value="Yes"
                       data-reviewName="Do you do post production or special effects for others?"
                       id="postProductionForOthersYes_RadioButton"> Yes
                <input type="radio" name="postProductionForOthers"
                       class=""
                       value="No"
                       data-reviewName="Do you do post production or special effects for others?"
                       id="postProductionForOthersNo_RadioButton"
                       checked="checked"> No
            </div>
            %{--ARE YOU INVOLVED IN FILM DISTRIBUTION?--}%
            <div class="form-group col-xs-12">
                <label>Are you involved in film distribution?</label><br>
                <input type="radio" name="filmDistribution"
                       class="showReview"
                       value="Yes"
                       data-reviewName="Are you involved in film distribution?"
                       id="filmDistributionYes_RadioButton"> Yes
                <input type="radio" name="filmDistribution"
                       class=""
                       value="No"
                       data-reviewName="Are you involved in film distribution?"
                       id="filmDistributionNo_RadioButton"
                       checked="checked"> No
            </div>
            %{--INSURANCE CANCELLED OR DECLINED Y/N--}%
            <div class="form-group col-xs-12">
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
            %{--INSURANCE CANCELLED OR DECLINE CONTAINER / ADDITIONAL QUESTION--}%
            <div id="insuranceCancelledContainer" style="display:none">
                <div class="form-group col-xs-12">
                    <input type="text" class=" showReview form-control" name="name"
                           data-reviewName="Explain why it was cancelled or declined"
                           placeholder="Please explain why it was cancelled or declined"
                           id="insuredCancelledExplain"/>
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
                               value="Owned"
                               data-reviewName="Misc Equipment Owned or Rented?"
                               id="equipmentOwnRentYes_RadioButton"> Owned
                        <input type="radio" name="equipmentOR"
                               class=""
                               value="Rented"
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
                <div class="form-group">
                    <div class="col-xs-12">
                        <label for="equipmentSchedule">Provide Equipment Schedule if any one item exceeds $10,000 in value</label>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-9">
                            <input type="text" id="equipmentSchedule" class="showReview form-control"
                                   name="name"
                                   data-reviewName="Provide Equipment Schedule if any one item exceeds $10,000 in value"
                                   placeholder="Equipment schedule"/>
                        </div>

                        <div class="col-xs-3">
                            %{--<form enctype="multipart/form-data">--}%
                                %{--<div class="fileUpload btn btn-primary">--}%
                                    %{--<span>Attach File</span>--}%
                                    %{--<input name="equipScheduleFile" type="file" class="file" id="equipScheduleFile"--}%
                                           %{--style="width:120px"/>--}%
                                %{--</div>--}%
                            %{--</form>--}%
                            <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
                        </div>
                    </div>

                    <div class="col-xs-9 fileNameContainer" style="margin-top:2px; display: none">
                        <div class="col-xs-9" style="text-align:right; font-size:11px">
                            <span class="equipScheduleFileSpan" id="equipScheduleFileSpan">File Name</span>
                        </div>

                        <div class="col-xs-3" style="padding-left:22px">
                            <button type="button"
                                    class="btn btn-default btn-xs attachClearButton">Clear</button>
                        </div>
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
            %{--FOREIGN GL HIRED AUTO AND WORKERS COMP REQUIRED?--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Is Foreign GL, Hired Auto and Workers Comp Required?</label><br>
                    <input type="radio" name="foreignGL"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Is Foreign GL, Hired Auto and Workers Comp Required?"
                           id="foreignGLYes_RadioButton"> Yes
                    <input type="radio" name="foreignGL"
                           class=""
                           value="No"
                           data-reviewName="Is Foreign GL, Hired Auto and Workers Comp Required?"
                           id="foreignGLNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>
            %{--DO YOU REQUIRE FILM PRODUCERS ERROR AND OMISSION LIABILITY? IF YES WHAT LIMITS?--}%
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Do you require Film Producers Error and Omissions Liability? If yes, what limits? Please complete online application and submit for quoting</label><br>
                    <input type="radio" name="errorOmissionsLiability"
                           class="showReview"
                           value="Yes"
                           data-reviewName="Do you require Film Producer Error and Omissions Liability? If yes, what limits? Please complete online application and submit for quoting"
                           id="errorOmissionsLiabilityYes_RadioButton"> Yes
                    <input type="radio" name="errorOmissionsLiability"
                           class=""
                           value="No"
                           data-reviewName="Do you require Film Producers Error and Omissions Liability? If yes, what limits? Please complete online application and submit for quoting"
                           id="errorOmissionsLiabilityNo_RadioButton"
                           checked="checked"> No
                </div>
            </div>
            %{--ERROR OMISSION LIABILITY TABLE--}%
            <div id="errorOmissionsLiabilityContainer" style="display:none">
                <div class="form-group col-xs-12">
                    <input type="text" id="errorOmissionsLiability" class="showReview form-control" name="name"
                           data-reviewName="Error and Omission Limit"
                           id="errorOmissionsLimit" style="display:none" placeholder="$USD"/>
                </div>
            </div>
        </div>

        <div class="col-xs-6">

            %{--TOTAL BUDGET CONTAINER--}%
            <div id="totalBudgetContainer">
                <div class="col-xs-12">
                    <label for="totalBudget">Total Budget (Attach at least top sheet of budget)</label>
                </div>

                <div class="form-group col-xs-9">
                    <input type="text" class="form-control totalBudget" class="form-control" name="totalBudget"
                           id="totalBudgetInput" placeholder="$USD" required="required" disabled="disabled"/>
                </div>

                <div class="col-xs-3">
                    %{--<form enctype="multipart/form-data">--}%
                        %{--<div class="fileUpload btn btn-primary">--}%
                            %{--<span>Attach File</span>--}%
                            %{--<input name="budgetFile" type="file" class="file" id="budgetFile" style="width:120px"/>--}%
                        %{--</div>--}%
                    %{--</form>--}%
                    <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
                </div>

                <div class="col-xs-12 fileNameContainer" style="margin-top:-10px; display: none">
                    <div class="col-xs-9" style="text-align:right; font-size:11px">
                        <span class="fileNameSpan" id="budgetFileSpan">File Name</span>
                    </div>

                    <div class="col-xs-3" style="padding-left:22px">
                        <button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>
                    </div>

                </div>
            </div>
            %{--PRINCIPAL PHOTOGRAPHY DATES--}%
            <div id="principalPhotographyContainer">
                <div class="col-xs-12">
                    <label for="principalPhotographyDates">Principal Photography Dates</label>
                </div>

                <div class="form-group col-xs-6"><!-- Date input -->
                    <input class="form-control datepicker" class="principalPhotographyDateStart"
                           id="principalPhotographyDateStart" name="date" placeholder="Start" type="text"
                           required="required"/>
                </div>

                <div class="col-xs-6">
                    <div class="form-group"><!-- Date input -->
                        <input class="form-control datepicker" class="principalPhotographyDateEnd"
                               id="principalPhotographyDateEnd" name="date" placeholder="End" type="text"
                               required="required"/>
                    </div>
                </div>
            </div>
            %{--PRODUCER--}%
            <div class="form-group col-xs-12">
                <label for="producer">Producer</label>
                <input type="text" class="form-control showReview" data-reviewName="Producer" id="producer"
                       name="producer" placeholder="Producer"/>
            </div>
            %{--DIRECTOR--}%
            <div class="form-group col-xs-12">
                <label for="director">Director</label>
                <input type="text" class="form-control showReview" data-reviewName="Director" id="director"
                       name="director" placeholder="Director"/>
            </div>
            %{--SOURCE OF FINANCING--}%
            <div class="form-group col-xs-12" id="questionSourceFinancing" style="display: none;">
                <label for="sourceOfFinancing">Source of Financing</label>
                <input type="text" class="form-control showReview" data-reviewName="Source of Financing"
                       id="sourceOfFinancing" name="sourceOfFinancing"
                       placeholder="Source"/>
            </div>
            %{--COMPLETION BOND REQUIRED? Y/N--}%
            <div class="form-group col-xs-12">
                <label>Completion Bond Required</label><br>
                <input type="radio" name="completionBondRequired"
                       class="showReview"
                       value="Yes"
                       data-reviewName="Completion Bond Required?"
                       id="completionBondRequiredYes_RadioButton"> Yes
                <input type="radio" name="completionBondRequired"
                       class=""
                       value="No"
                       data-reviewName="Completion Bond Required?"
                       id="completionBondRequiredNo_RadioButton"
                       checked="checked"> No
            </div>

            %{--FILMING LOCATION AND FILMING DATE CONTAINER--}%
            <div id="questionFilmingLocations" style='display: none;'>
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

                        %{--<form enctype="multipart/form-data">--}%
                            %{--<div class="fileUpload btn btn-primary">--}%
                                %{--<span>Attach File</span>--}%
                                %{--<input name="doodFile" type="file" class="file" id="doodFile" style="width:120px"/>--}%
                            %{--</div>--}%
                        %{--</form>--}%
                        <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
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
                            <input type="text" class="form-control filmLocationLocation" id="filmingLocation1" data-reviewName="Filming Location (1)"
                                   name="filmLocation" placeholder="Location"/>
                        </div>

                        <div class="col-xs-3">
                            %{--<div class="form-group"> <!-- Date input -->--}%
                            <h5 class="startDateHeader" style="font-size: 16px;">Start Date</h5>
                            <input class="form-control " type="text"
                                   placeholder="Hidden Text Field To Adjust Focus off Date" name="hiddenField"
                                   style="display: none;"/>
                            <input class="form-control datepicker filmLocationStart" name="date" id="filmingStart1" placeholder="MM/DD/YYY" data-reviewName="Start Date (1)"
                                   type="text" id="filmLocationStartDate " data-provide="datepicker" />
                            %{--</div>--}%
                        </div>

                        <div class="col-xs-3">
                            %{--<div class="form-group"> <!-- Date input -->--}%
                            <h5 class="endDateHeader" style="font-size: 16px;">End Date</h5>
                            <input class="form-control datepicker filmLocationEnd" name="date" id="filmingEnd1" placeholder="MM/DD/YYY" data-reviewName="End Date (1)"
                                   type="text" id="filmLocationEndDate" data-provide="datepicker" />

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

            %{--STORY SYNOPSIS (ATTACH TREATMENT)--}%
            <div id="storySynopsisContainer">
                <div class="row col-xs-12">
                    <br>

                    <div class="col-xs-9">
                        <label for="storySynopsis">Story / Synopsis (Attach Treatment)</label>
                    </div>
                </div>

                <div class="row col-xs-12">
                    <div class="col-xs-9">
                        <input type="text" class="form-control showReview" data-reviewName="Story / Synopsis" id="story"
                               name="story" placeholder="Story"/>
                    </div>

                    <div class="col-xs-3">
                        <div class="form-group">
                            %{--<form enctype="multipart/form-data">--}%
                                %{--<div class="fileUpload btn btn-primary">--}%
                                    %{--<span>Attach File</span>--}%
                                    %{--<input name="treatmentFile" type="file" class="file" id="treatmentFile"--}%
                                           %{--style="width:120px"/>--}%
                                %{--</div>--}%
                            %{--</form>--}%
                            <button class="btn btn-primary attachButton " id="" type="button" value="">Attach Files</button>
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
            </div>

            %{--CAST QUESTIONS--}%
            <div class="row col-xs-12" id="questionsCast" style="display:none">
                <br>

                <div class="col-xs-12">
                    <h3>Cast Detail</h3>
                </div>

                <div class="col-xs-12">
                    <label for="storySynopsis">Number of Cast Members</label>
                </div>

                <div class="col-xs-2">
                    <div class="form-group">
                        <input type="text" class="form-control showReview" data-reviewName="Number of Cast Members"
                               id="numberOfCastMembers"
                               name="numberOfCastMembers" placeholder="1" style="display:none" disabled/>
                    </div>
                </div>

                <div class="col-xs-10">
                </div>

                <div class="col-xs-12">
                    <div class="row">
                        <div class="col-xs-6">
                            <label>Cast Member Name</label>
                        </div>

                        <div class="col-xs-2">
                            <label>Age</label>
                        </div>

                        <div class="col-xs-4">
                            <label>Role</label>
                        </div>
                    </div>
                </div>

                <div id="castMemberDetailContainer" class="col-xs-12">
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <input type="text" class="form-control  castMemberName" id="castMember0NameInput"
                                       data-reviewname="Cast Member Name, Age, Role" name="castMemberName" placeholder="Name">
                            </div>
                        </div>

                        <div class="col-xs-2">
                            <div class="form-group">
                                <input type="text" class="form-control  castMemberAge" id="castMember0AgeInput" data-reviewname="Cast Member Name, Age, Role"
                                       name="castMemberAge" placeholder="Age">
                            </div>
                        </div>

                        <div class="col-xs-4" style="">
                            <div class="col-xs-10" style="padding:0px;">
                                <input type="text" class="form-control  castMemberRole" id="castMember0RoleInput" data-reviewname="Cast Member Name, Age, Role"
                                       name="castMemberRole" placeholder="Role" style="">
                            </div>
                            <div class="col-xs-2" style="padding:0px;">
                                <i class="fa fa-times-circle castRowDeleteIcon" aria-hidden="true" style=""></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row col-xs-12">
                    <div class="col-xs-12" style="padding: 8px;">
                        <button class="btn btn-sm btn-success  pull-right" id="addCastMemberButton" type="button" value="">Add Cast Member</button>
                    </div>
                </div>


                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="storySynopsis">Any Cast Member with a film project immediately following this film project?</label>
                        <input type="radio" name="castMembersFilmAfterThis"
                               class=""
                               value="Yes"
                               id="castMembersFilmAfterThisYes"> Yes
                        <input type="radio" name="castMembersFilmAfterThis"
                               class=""
                               value="No"
                               id="castMembersFilmAfterThisNo"
                               checked="checked"> No
                    </div>
                </div>
            </div>




            %{--<div class="col-xs-12">--}%
            %{--<div class="form-group">--}%
            %{--<label for="storySynopsis">Complete Cast Medical exam</label>--}%
            %{--<input type="text" class="form-control showReview" data-reviewName="Complete Cast Medical Exam" id="completeMedical"--}%
            %{--name="completeMedical" placeholder=""/>--}%
            %{--</div>--}%
            %{--</div>--}%
            %{--<div class="row col-xs-12">--}%
            %{--<div class="col-xs-9">--}%
            %{--<label for="castMedical">Attach Cast Medical</label>--}%
            %{--</div>--}%
            %{--</div>--}%
            %{--<div class="row col-xs-12">--}%
            %{--<div class="col-xs-9">--}%
            %{--<input type="text" class="form-control showReview" data-reviewName="Cast Medical" id="story"--}%
            %{--name="castMedical" placeholder=""/>--}%
            %{--</div>--}%
            %{--<div class="col-xs-3">--}%
            %{--<div class="form-group">--}%
            %{--<form enctype="multipart/form-data">--}%
            %{--<div class="fileUpload btn btn-primary">--}%
            %{--<span>Attach File</span>--}%
            %{--<input name="castMedicalFile" type="file" class="file" id="castMedicalFile" style="width:120px"/>--}%
            %{--</div>--}%
            %{--</form>--}%
            %{--</div>--}%
            %{--</div>--}%
            %{--</div>--}%
            %{--<div class="col-xs-12 fileNameContainer" style="margin-top:-6px; display: none">--}%
            %{--<div class="col-xs-9" style="text-align:right; font-size:11px; padding-right: 30px;">--}%
            %{--<span class="fileNameSpan" id="castMedicalFileSpan">File Name</span>--}%
            %{--</div>--}%
            %{--<div class="col-xs-3" style="margin-left:-15px;">--}%
            %{--<button type="button" class="btn btn-default btn-xs attachClearButton">Clear</button>--}%
            %{--</div>--}%


            %{--TOTAL ABOVE THE LINE--}%
            <div id="questionTotalAbove" style="display: none">
                <div class="form-group col-xs-12">
                    <br>

                    <label for="storySynopsis">Total Above-The-Line</label>
                    <input type="text" class="form-control showReview" data-reviewName="Total Above-The-Line"
                           id="totalAboveLine"
                           name="totalAboveLine" placeholder="$USD"/>
                </div>
            </div>
            %{--TOTAL BELOW THE LINE--}%
            <div id="questionTotalBelow" style="display: none">
                <div class="form-group col-xs-12">
                    <label for="storySynopsis">Total Below-The-Line</label>
                    <input type="text" class="form-control showReview" data-reviewName="Total Below-The-Line"
                           id="totalBelowLine"
                           name="totalBelowLine" placeholder="$USD"/>
                </div>
            </div>
            %{--TOTAL POST PRODUCTION--}%
            <div id="questionTotalPost" style="display: none">
                <div class="form-group col-xs-12">
                    <label for="storySynopsis">Total Post Production Cost</label>
                    <input type="text" class="form-control showReview" data-reviewName="Total Post Production Cost"
                           id="totalPostProductionCost"
                           name="totalPostProductionCost" placeholder="$USD"/>
                </div>
            </div>
            %{--NUMBER OF PRODUCTIONS PER YEAR--}%
            <div class="form-group col-xs-12">
                <label for="numberOfFilms">Number of Productions Per Year</label>
                <input type="number" min="0" class="form-control" name="numberProductions" placeholder="0"
                       id="numberProductions"/>
            </div>
            %{--PROJECTS OUTSIDE THE US--}%
            <div class="form-group col-xs-12">
                <label for="projectsOutsideUS">Projects Outside the US (%)</label>
                <input type="text" class="form-control percent" name="name" placeholder="%" id="projectsOutsideUS"/>
            </div>
            %{--TOTAL NUMBER OF EMPLOYEES--}%
            <div class="form-group col-xs-12">
                <label for="totalEmployees">Total number of employees</label>
                <input type="number" class="form-control" name="name" placeholder="# of Employees"
                       id="totalNumEmployees"/>
            </div>
            %{--ANNUAL PAYROLL--}%
            <div class="form-group col-xs-12">
                <label for="annualPayroll">Annual Payroll</label>
                <input type="text" class="form-control" name="name" placeholder="$USD" id="annualPayroll"/>
            </div>
            %{--UMBRELLA LIMIT REQUESTED--}%
            <div class="form-group col-xs-12">
                <label for="umbrellaRequested">Umbrella Limit Requested</label>
                <input type="text" class="form-control" name="name" placeholder="$USD"
                       id="umbrellaLimitRequested"/>
            </div>
            %{--WORK COMP COVERAGE REQUESTED?--}%
            <div id="workCompCoverageRequested">
                <div class="col-xs-12" id="">
                    <p class="control-label"><input type="checkbox"
                                                    class=""
                                                    data-reviewName="" name=""
                                                    id="workCompCoverageRequestedCheckbox"
                                                    value=""/> Work Comp Coverage Requested
                    </p>
                </div>
                %{--WILL PAYROLL SERVICE CO PROVIDE PRIMARY WORK COMP--}%
                <div class="form-group col-xs-12">
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
                %{--NAME OF OFFICERS--}%
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
                %{--NAME OFFICERS EXCLUDED--}%
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
                                   name="namesOfOfficersExcluded" placeholder="" id="officersExcludedUnderWC"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>


<div id="coverageCheckboxesDiv">
    <div class='col-xs-4' id="productChoicesDiv" style="margin-top: 5px;">
        <div class='form-group col-xs-12 EPKGDiv'>
            <p><input type='checkbox' class='coverageInput' name='coverage' id='EPKGcoverage'/> Entertainment Package
            </p>
        </div>

        <div class='form-group col-xs-12' style="padding-left: 40px; margin-top:-20px;" id="EPKGProductsDiv">
            <span class='coverageInput' style="display:none" id="PIPChoiceInput"><input type="radio" name="EPKGRadio"
                                                                                        class="coverageRadioButton EPKG"
                                                                                        value="PIP CHOI"
                                                                                        data-object="product"
                                                                                        data-key="productID"
                                                                                        data-value="PIP CHOI"
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
                                                                                   data-object="product"
                                                                                   data-key="productID"
                                                                                   data-value="PIP 1"
                                                                                   id="PIP1InputRadio"> PIP 1 (60 Days or less)<br>
            </span>
            <span class='coverageInput' style="display:none" id="PIP2Input"><input type="radio" name="EPKGRadio"
                                                                                   class="coverageRadioButton EPKG"
                                                                                   value="PIP 2"
                                                                                   data-object="product"
                                                                                   data-key="productID"
                                                                                   data-value="PIP 2"
                                                                                   id="PIP2InputRadio"> PIP 2 (60 Days or less)<br>
            </span>
            <span class='coverageInput' style="display:none" id="PIP3Input"><input type="radio" name="EPKGRadio"
                                                                                   class="coverageRadioButton EPKG"
                                                                                   value="PIP 3"
                                                                                   data-object="product"
                                                                                   data-key="productID"
                                                                                   data-value="PIP 3"
                                                                                   id="PIP3InputRadio"> PIP 3 (365 Days Policy)<br>
            </span>
            <span class='coverageInput' style="display:none" id="PIP4Input"><input type="radio" name="EPKGRadio"
                                                                                   class="coverageRadioButton EPKG"
                                                                                   value="PIP 4"
                                                                                   data-object="product"
                                                                                   data-key="productID"
                                                                                   data-value="PIP 4"
                                                                                   id="PIP4InputRadio"> PIP 4 (365 Days Policy)<br>
            </span>
            <span class='coverageInput' style="display:none" id="PIP5Input"><input type="radio" name="EPKGRadio"
                                                                                   class="coverageRadioButton EPKG"
                                                                                   value="PIP 5"
                                                                                   data-object="product"
                                                                                   data-key="productID"
                                                                                   data-value="PIP 5"
                                                                                   id="PIP5InputRadio"> PIP 5 (365 Days Policy)
            </span>
        </div>

        <div class='form-group col-xs-12 ' id="EPKGoptions" style="padding-left: 40px; display:none; ">
            %{--<p id="EPKGCASTOption" style=" font-size:12px; margin:0px; display:none"><input type='checkbox'--}%
            %{--class='additionalCoverageCheckboxEPKG FWCNWCCheckbox'--}%
            %{--name='coverage' value="CAST"--}%
            %{--id='EPKGCASTAdditionalCoverage'/> Cast Insurance (Up to 10 Artists)--}%
            %{--<br></p>--}%

            <span style="font-weight: 400px; font-size:12px;">Optional Coverages</span>
            <br>

            <p id="EPKGNOHAOption" style=" font-size:12px; margin:0px"><input type='checkbox'
                                                                              class='additionalCoverageCheckboxEPKG'
                                                                              name='coverage' value="NOHA01"
                                                                              id='EPKGNOHAAdditionalCoverage'/> Non Owned Hired Auto Physical Damage
            </p>

            <p id="EPKGCASTEssentialOption" style=" font-size:12px; margin:0px;"><input type='checkbox'
                                                                                        class='additionalCoverageCheckboxEPKG '
                                                                                        name='coverage' value="CAST"
                                                                                        id='EPKGCASTEssentialAdditionalCoverage'/> Cast Essential Elements
                <br></p>

            <div class="col-xs-12" style="padding-top: 5px;padding-left: 20px; display: none;" id="castEssentialDiv">
                <input type="text"
                       style='font-size: 12px;margin-top: 0px; margin-bottom:10px; width: 35px; margin-right:2px;'
                       name="commercial"
                       class="CPK" value="" id="castEssentialInput">
                <span style="margin-bottom: 0px; font-size: 11px;"># of Elements</span>

            </div>
            %{--<p class="FILMWITHCASTNOWCOptions" style=" font-size:12px; margin:0px; display:none;"><input type='checkbox'--}%
            %{--class='additionalCoverageCheckboxEPKG FWCNWCCheckbox'--}%
            %{--name='coverage' value="Money"--}%
            %{--id='EPKGMoneySecurityAdditionalCoverage'/> Money & Securities--}%
            %{--<br></p>--}%
            <p class="FILMWITHCASTNOWCOptions" style=" font-size:12px; margin:0px; display:none"><input type='radio'
                                                                                                        name="FILMWITHCASTNOWCOptions"
                                                                                                        class='additionalCoverageCheckboxEPKG FWCNWCCheckbox'
                                                                                                        name='coverage'
                                                                                                        value="CIVIL100"
                                                                                                        id='EPKGFWCNWCCIVIL100AdditionalCoverage'/> Civil Authority (US Only) - $100K Limit
            </p>

            <p class="FILMWITHCASTNOWCOptions" style=" font-size:12px; margin:0px; display:none"><input type='radio'
                                                                                                        name="FILMWITHCASTNOWCOptions"
                                                                                                        class='additionalCoverageCheckboxEPKG FWCNWCCheckbox'
                                                                                                        name='coverage'
                                                                                                        value="CIVIL500"
                                                                                                        id='EPKGFWCNWCCIVIL500AdditionalCoverage'/> Civil Authority (US Only) - Over $100K, Refer Only Subj to MP
            </p>

            <p class="AnnualOptions" style=" font-size:12px; margin:0px; display:none"><input type='checkbox'
                                                                                              class='additionalCoverageCheckboxEPKG'
                                                                                              name='coverage'
                                                                                              value="MoneyCurrency"
                                                                                              id='moneyCurrencyCheckbox'/> Money and Currency
            </p>

            <p class="AnnualOptions" style=" font-size:12px; margin:0px; display:none"><input type='checkbox'
                                                                                              class='additionalCoverageCheckboxEPKG'
                                                                                              name='coverage'
                                                                                              value="FursJewelry"
                                                                                              id='fursJewelryCheckbox'/> Furs, Jewelry, Art & Antiques
            </p>

            <p class="AnnualOptions" style=" font-size:12px; margin:0px; display:none"><input type='checkbox'
                                                                                              class='additionalCoverageCheckboxEPKG'
                                                                                              name='coverage'
                                                                                              value="TalentNonBudgetCosts"
                                                                                              id='talentNonBudgetCheckbox'/> Talent and Non Budgeted Costs
            </p>

            <p class="AnnualOptions" style=" font-size:12px; margin:0px; display:none"><input type='checkbox'
                                                                                              class='additionalCoverageCheckboxEPKG'
                                                                                              name='coverage'
                                                                                              value="AdmnistrativeCosts"
                                                                                              id='adminCostCheckbox'/> Administrative Costs
            </p>

            <p class="AnnualOptions ElectronicData"
               style=" font-size:12px; margin:0px; display:none">Electronic Data Processing</p>

            <p class="AnnualOptions ElectronicData"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none">
                <input type='checkbox' class='additionalCoverageCheckboxEPKG' name='coverage' value="Hardware"
                       id='hardwareElectronicDataCheckbox'/> Hardware</p>

            <p class="AnnualOptions ElectronicData"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none">
                <input type='checkbox' class='additionalCoverageCheckboxEPKG' name='coverage' value="DataMedia"
                       id='dataMediaElectronicDataCheckbox'/> Data and Media</p>

            <p class="AnnualOptions ElectronicData"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none">
                <input type='checkbox' class='additionalCoverageCheckboxEPKG' name='coverage' value="ExtraExpense"
                       id='extraExpenseElectronicDataCheckbox'/> Extra Expense</p>

            <p class="PIP5Options PIP5Only" style=" font-size:12px; margin:0px; display:none"><input type='radio'
                                                                                                     name="PIP5RadioOptionCoverage"
                                                                                                     class='additionalCoverageCheckboxPIP5'
                                                                                                     name='coverage'
                                                                                                     value="CIVIL100"
                                                                                                     id='EPKGCIVIL100AdditionalCoverage'/> Civil Authority (US Only) - $100K Limit
            </p>

            <p class="PIP5Options PIP5Only" style=" font-size:12px; margin:0px; display:none"><input type='radio'
                                                                                                     name="PIP5RadioOptionCoverage"
                                                                                                     class='additionalCoverageCheckboxPIP5'
                                                                                                     name='coverage'
                                                                                                     value="CIVIL500"
                                                                                                     id='EPKGCIVIL500AdditionalCoverage'/> Civil Authority (US Only) - $500K Limit
            </p>
            <br>

            <p class="PIP5Options FILMWITHCASTNOWCOptions   "
               style=" font-size:12px; margin:0px; display:none">Animal Mortality</p>

            <p class="PIP5Options FILMWITHCASTNOWCOptions"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5 additionalCoverageCheckboxEPKG FWCNWCCheckbox'
                    name='coverage' value="BirdsFish"
                    id='EPKGBirdsFishAdditionalCoverage'/> Domestic Birds Or Fish</p>

            <p class="PIP5Options FILMWITHCASTNOWCOptions"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5 additionalCoverageCheckboxEPKG FWCNWCCheckbox'
                    name='coverage' value="Dogs"
                    id='EPKGDogsAdditionalCoverage'/> Dogs (with certain breed exceptions)</p>

            <p class="PIP5Options FILMWITHCASTNOWCOptions"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5 additionalCoverageCheckboxEPKG FWCNWCCheckbox'
                    name='coverage' value="Reptiles"
                    id='EPKGReptilesAdditionalCoverage'/> Reptiles (Non-Venomous)</p>

            <p class="PIP5Options FILMWITHCASTNOWCOptions"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5 additionalCoverageCheckboxEPKG FWCNWCCheckbox'
                    name='coverage' value="SmallOther"
                    id='EPKGSmallOtherAdditionalCoverage'/> Small Domestic Animals (Other)</p>

            <p class="PIP5Options FILMWITHCASTNOWCOptions"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5 additionalCoverageCheckboxEPKG FWCNWCCheckbox'
                    name='coverage' value="FarmAnimals"
                    id='EPKGFarmAnimalsAdditionalCoverage'/> Farm Animals</p>

            <p class="PIP5Options FILMWITHCASTNOWCOptions"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5 additionalCoverageCheckboxEPKG FWCNWCCheckbox'
                    name='coverage' value="WildCats"
                    id='EPKGWildCatsAdditionalCoverage'/> Wild Cats (Caged)</p>

            <p class="PIP5Options FILMWITHCASTNOWCOptions"
               style=" font-size:12px; margin:0px; padding-left: 20px;display:none"><input
                    type='checkbox' class='additionalCoverageCheckboxPIP5 additionalCoverageCheckboxEPKG FWCNWCCheckbox'
                    name='coverage' value="OtherRefer"
                    id='EPKGOtherReferAdditionalCoverage'/> All Others - Refer Only</p>
        </div>

        <div class='form-group col-xs-12 CPKDiv'>
            <p><input type='checkbox' class='coverageInput' name='coverage' id='CPKCGLcoverage'/> Commercial Liability
            </p>
        </div>

        <div class='form-group col-xs-12 CPKDiv' style="padding-left: 40px; margin-top:-20px;">
            <span class='coverageInput' id="CPKInput"><input type="radio" name="commercial"
                                                             class="coverageRadioButton CPK" value="BARCPKGC"
                                                             data-object="product" data-key="productID"
                                                             data-value="BARCPKGC-CPK"
                                                             id="CPKInputRadio"> Commercial Package  (CGL & NOAL)<br>
            </span>

            <div class="col-xs-12" style="padding-top: 5px;padding-left: 20px; display:none" id="costOfHireDiv">
                <label style="margin-bottom: 0px;">Cost Of Hire</label><br>
                <input type="text" style='font-size: 12px;margin-top: 0px; margin-bottom:30px;' name="commercial"
                       class="CPK rateAdjust" value="$" id="costOfHireInput"><br>
            </div>
            <span class='coverageInput' id="CGLInput"><input type="radio" name="commercial"
                                                             class="coverageRadioButton CGL" value="BARCPKGC"
                                                             data-object="product" data-key="productID"
                                                             data-value="BARCPKGC-CGL"
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

            <div class="showReviewTable" id="limitsDeductPremiumInsert">
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

</div>


<div id="coverageSGPCheckboxesDiv">
    <div class='col-xs-4' id="productChoicesDiv" style="margin-top: 5px;">
        <div class="selectionContainer" id="sgpSilverSelectionContainer">
            <span class='coverageInput' style="" id="sgpSilverRadioContainer"><input type="radio" name="productOptionRadio"
                                                                                     class="productOptionRadio"
                                                                                     value="Silver"
                                                                                     id="sgpSilverRadio"
                                                                                     style="margin-bottom:10px;"> Silver (Up to 30 Days)<br>
            </span>
            <div id="sgpSilverOptionsContainer" style="margin-left:30px; margin-bottom: 20px; display:none" >
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpSilverCoverageCheckbox" value="" id="sgpSilver_CGL" disabled="true" checked="true"> General Liability<br>
                    </span>
                    <div class="selectionContainer" style="margin-left:20px; " >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpSilver_CGLOption" value="" id="sgpSilver_BAI" disabled="true" checked="true">
                            Blanket Additional Insured <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="margin-left:20px; " >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpSilver_CGLOption" value="" id="sgpSilver_WOS">
                            Waiver of Subrogation <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="margin-left:20px; " >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpSilver_CGLOption" value="" id="sgpSilver_5kMed">
                            $5,000 Medical Expense <br>
                        </span>
                    </div>
                </div>

                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpSilver_CoverageCheckbox" value="" id="sgpSilver_Misc">
                        Miscellaneous Equipment <br>
                        <small style="margin-left:20px; ">(Incl. Props, Sets & Wardrobe)</small> <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Desired Limit</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value="$1,000"  id="sgpSilver_MiscLimit">
                    </div>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpSilver_CoverageCheckbox" value="" id="sgpSilver_1MTPP">
                        1 Million Third Party Property Damage <br>
                    </span>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpSilver_CoverageCheckbox" value="" id="sgpSilver_NOHA">
                        Non Owned & Hired Auto Liability <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Cost of Hire</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id="sgpSilver_NOHACost">
                    </div>
                    <div class="selectionContainer" style="display:none; margin-left:30px; padding-top:10px;">
                        <span class='' style="" >
                            <input type="checkbox" class="sgpSilver_CoverageCheckbox" value="" id="sgpSilver_NOHAPD">
                            Non Owned & Hired Auto Physical Damage <br>
                        </span>
                    </div>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpSilver_CoverageCheckbox sgpSilver_WCOption" value="" id="sgpSilver_PrimaryWC">
                        Primary Workers Compensation <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Salespersons - Outside - (8742)</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id="sgpSilver_PrimaryWC_Sales"><br>

                        <small style="font-weight: 500">Clerical Employees - NOC - (8810)</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id="sgpSilver_PrimaryWC_Clerical"><br>

                        <small style="font-weight: 500">Motion Picture - In Studios - (9610)</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id="sgpSilver_PrimaryWC_Motion"><br>
                        <small class="text-danger">
                            Primary Worker's compensation requires that you declare payroll
                        </small>
                    </div>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Experience Mod</small><br>
                        <input type="number"
                               step=".1" min="0"
                               style=''
                               name=""
                               class="" value="1.0"  id="sgpSilver_PrimaryWC_ExpMod"><br>
                        <small class="text-danger">
                            *Rates are subject to change at any time prior to binding due to Workers Compensation being a state regulate line.
                        </small>
                    </div>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpSilver_CoverageCheckbox sgpSilver_WCOption" value="" id="sgpSilver_ContingentWC">
                        Contingent Workers Compensation <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small class="text-danger">
                            This Workers' Comp coverage will be contingent only. Applicant must go through a payroll service company for Primary Workers' Comp coverage. You must provide the name of the payroll service company before you can bind coverage.
                            *Rates are subject to change at any time prior to binding due to Workers Compensation being a state regulate line.
                        </small>
                    </div>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpSilver_CoverageCheckbox" value="" id="sgpSilver_Umbrella">
                        Umbrella/Excess Liability <br>
                    </span>
                    <div class="selectionContainer" style="display:none; margin-left:30px; padding-top:10px;">
                        <span class='' style="" >
                            <input type="radio" name="umbrellaTermRadio" class="sgpSilver_CoverageCheckbox" value="" id="sgpSilver_UmbrellaFullTerm">
                            Full Policy Duration  <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="display:none; margin-left:30px; padding-top:10px;">
                        <span class='' style="" >
                            <input type="radio" name="umbrellaTermRadio" class="sgpSilver_CoverageCheckbox" value="" id="sgpSilver_UmbrellaCustomTerm">
                            <input type="text"
                                   style='width:40px;'
                                   name=""
                                   class="" value=""  id="sgpSilver_UmbrellaCustomTermValue"> Days<br>
                        </span>
                    </div>
                    <div class="" style="display:none; margin-left:30px; padding-top:10px;">
                        <select id="sgpSilver_UmbrellaLimitSelect">
                            <option value="invalid">Select Umbrella Limit</option>
                            <option value="1">$1,000,000</option>
                            <option value="2">$2,000,000</option>
                            <option value="3">$3,000,000</option>
                            <option value="4">$4,000,000</option>
                            <option value="5">$5,000,000</option>
                        </select>
                    </div>

                </div>


            </div>

        </div>
        <div class="selectionContainer" id="sgpGoldSelectionContainer">
            <span class='coverageInput' style="" id="sgpGoldRadioContainer"><input type="radio" name="productOptionRadio"
                                                                                   class="productOptionRadio"
                                                                                   value="Gold"
                                                                                   id="sgpGoldRadio"
                                                                                   style="margin-bottom:10px;"> Gold (Up to 60 Days or Annual)<br>
            </span>
            <div id="sgpGoldOptionsContainer" style="margin-left:30px; margin-bottom: 20px; display:none" >
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpGoldCoverageCheckbox" value="" id="sgpGold_CGL" disabled="true" checked="true"> General Liability<br>
                    </span>
                    <div class="selectionContainer" style="margin-left:20px; " >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpGold_CGLOption" value="" id="sgpGold_BAI" disabled="true" checked="true">
                            Blanket Additional Insured <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="margin-left:20px; " >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpGold_CGLOption" value="" id="sgpGold_WOS">
                            Waiver of Subrogation <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="margin-left:20px; " >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpGold_CGLOption" value="" id="sgpGold_5kMed">
                            $5,000 Medical Expense <br>
                        </span>
                    </div>
                </div>

                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpGold_CoverageCheckbox" value="" id="sgpGold_EPKG">
                        Entertainment Package <br>
                    </span>
                    <div class="selectionContainer" style="display:none; margin-left:20px;">
                        <span class='' style="" >
                            <input type="radio" name="GoldEPKGLimits" class="sgpGold_CoverageCheckbox" value="" id="sgpGold_EPKGLowLimits">
                            Low Limits  <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="display:none; margin-left:20px;">
                        <span class='' style="" >
                            <input type="radio" name="GoldEPKGLimits" class="sgpGold_CoverageCheckbox" value="" id="sgpGold_EPKGMedLimits">
                            Med Limits  <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="display:none; margin-left:20px;">
                        <span class='' style="" >
                            <input type="radio" name="GoldEPKGLimits" class="sgpGold_CoverageCheckbox" value="" id="sgpGold_EPKGHighLimits">
                            High Limits  <br>
                        </span>
                    </div>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpGold_CoverageCheckbox" value="" id="sgpGold_NOHA">
                        Non Owned & Hired Auto Liability <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Cost of Hire</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id="">
                    </div>
                    <div class="selectionContainer" style="display:none; margin-left:30px; padding-top:10px;">
                        <span class='' style="" >
                            <input type="checkbox" class="sgpGold_CoverageCheckbox" value="" id="sgpGold_NOHAPD">
                            <small>Non Owned & Hired Auto Physical Damage</small> <br>
                            <div style="margin-left:20px;">
                                <small class="text-danger" >
                                    NOAPD coverage is Included on the Entertainment Package under Miscellaneous Equipment
                                </small>
                            </div>
                        </span>
                    </div>

                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpGold_CoverageCheckbox sgpGold_WCOption" value="" id="sgpGold_PrimaryWC">
                        Primary Workers Compensation <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Salespersons - Outside - (8742)</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id=""><br>

                        <small style="font-weight: 500">Clerical Employees - NOC - (8810)</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id=""><br>

                        <small style="font-weight: 500">Motion Picture - In Studios - (9610)</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id=""><br>
                        <small class="text-danger">
                            Primary Worker's compensation requires that you declare payroll
                        </small>
                    </div>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Experience Mod</small><br>
                        <input type="number"
                               step=".1" min="0"
                               style=''
                               name=""
                               class="" value="1.0"  id=""><br>
                        <small class="text-danger">
                            *Rates are subject to change at any time prior to binding due to Workers Compensation being a state regulate line.
                        </small>
                    </div>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpGold_CoverageCheckbox sgpGold_WCOption" value="" id="sgpGold_ContingentWC">
                        Contingent Workers Compensation <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small class="text-danger">
                            This Workers' Comp coverage will be contingent only. Applicant must go through a payroll service company for Primary Workers' Comp coverage. You must provide the name of the payroll service company before you can bind coverage.
                            *Rates are subject to change at any time prior to binding due to Workers Compensation being a state regulate line.
                        </small>
                    </div>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpGold_CoverageCheckbox" value="" id="sgpGold_Umbrella">
                        Umbrella/Excess Liability <br>
                    </span>
                    <div class="selectionContainer" style="display:none; margin-left:30px; padding-top:10px;">
                        <span class='' style="" >
                            <input type="radio" name="umbrellaTermRadio" class="sgpGold_CoverageCheckbox" value="" id="sgpGold_UmbrellaFullTerm">
                            Full Policy Duration  <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="display:none; margin-left:30px; padding-top:10px;">
                        <span class='' style="" >
                            <input type="radio" name="umbrellaTermRadio" class="sgpGold_CoverageCheckbox" value="" id="sgpGold_UmbrellaCustomTerm">
                            <input type="text"
                                   style='width:40px;'
                                   name=""
                                   class="" value=""  id=""> Days<br>
                        </span>
                    </div>
                    <div class="" style="display:none; margin-left:30px; padding-top:10px;">
                        <select id="sgpGold_UmbrellaLimitSelect">
                            <option value="invalid">Select Umbrella Limit</option>
                            <option value="1">$1,000,000</option>
                            <option value="2">$2,000,000</option>
                            <option value="3">$3,000,000</option>
                            <option value="4">$4,000,000</option>
                            <option value="5">$5,000,000</option>
                        </select>
                    </div>

                </div>


            </div>
        </div>
        <div class="selectionContainer" id="sgpPlatinumSelectionContainer">
            <span class='coverageInput' style="" id="sgpPlatinumRadioContainer"><input type="radio" name="productOptionRadio"
                                                                                       class="productOptionRadio"
                                                                                       value="Platinum"
                                                                                       id="sgpPlatinumRadio"
                                                                                       style="margin-bottom:10px;"> Platinum (Annual)<br>
            </span>
            <div id="sgpPlatinumOptionsContainer" style="margin-left:30px; margin-bottom: 20px; display:none" >
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpPlatinumCoverageCheckbox" value="" id="sgpPlatinum_CGL" disabled="true" checked="true"> General Liability<br>
                    </span>
                    <div class="selectionContainer" style="margin-left:20px;" >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpPlatinum_CGLOption" value="" id="sgpPlatinum_IncAgg2M">
                            Increase Aggregate Limit to $2,000,000 <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="margin-left:20px;" >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpPlatinum_CGLOption" value="" id="sgpPlatinum_IncMed5K">
                            Increase Medical Expense Limit to $5,000 <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="margin-left:20px;" >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpPlatinum_CGLOption" value="" id="sgpPlatinum_BAI">
                            Blanket Additional Insured <br>
                        </span>
                    </div>
                    <div class="selectionContainer" style="margin-left:20px; " >
                        <span class='' style="" >
                            <input type="checkbox" class="sgpPlatinum_CGLOption" value="" id="sgpPlatinum_WOS">
                            Waiver of Subrogation <br>
                        </span>
                    </div>
                </div>

                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpPlatinum_CoverageCheckbox" value="" id="sgpPlatinum_EPKG">
                        Entertainment Package <br>
                    </span>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpPlatinum_CoverageCheckbox" value="" id="sgpPlatinum_NOHA">
                        Non Owned & Hired Auto Liability <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Cost of Hire</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id="">
                    </div>
                    <div class="selectionContainer" style="display:none; margin-left:30px; padding-top:10px;">
                        <span class='' style="" >
                            <input type="checkbox" class="sgpPlatinum_CoverageCheckbox" value="" id="sgpPlatinum_NOHAPD">
                            <small>Non Owned & Hired Auto Physical Damage</small> <br>
                            <div style="margin-left:20px;">
                                <small class="text-danger" >
                                    NOAPD coverage is Included on the Entertainment Package under Miscellaneous Equipment
                                </small>
                            </div>
                        </span>
                    </div>

                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpPlatinum_CoverageCheckbox sgpPlatinum_WCOption" value="" id="sgpPlatinum_PrimaryWC">
                        Primary Workers Compensation <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Salespersons - Outside - (8742)</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id=""><br>

                        <small style="font-weight: 500">Clerical Employees - NOC - (8810)</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id=""><br>

                        <small style="font-weight: 500">Motion Picture - In Studios - (9610)</small><br>
                        <input type="text"
                               style=''
                               name=""
                               placeholder="$"
                               class="currency" value=""  id=""><br>
                        <small class="text-danger">
                            Primary Worker's compensation requires that you declare payroll
                        </small>
                    </div>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small style="font-weight: 500">Experience Mod</small><br>
                        <input type="number"
                               step=".1" min="0"
                               style=''
                               name=""
                               class="" value="1.0"  id=""><br>
                        <small class="text-danger">
                            *Rates are subject to change at any time prior to binding due to Workers Compensation being a state regulate line.
                        </small>
                    </div>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpPlatinum_CoverageCheckbox sgpPlatinum_WCOption" value="" id="sgpPlatinum_ContingentWC">
                        Contingent Workers Compensation <br>
                    </span>
                    <div style="margin-left:30px; padding-top:4px; display:none">
                        <small class="text-danger">
                            This Workers' Comp coverage will be contingent only. Applicant must go through a payroll service company for Primary Workers' Comp coverage. You must provide the name of the payroll service company before you can bind coverage.
                            *Rates are subject to change at any time prior to binding due to Workers Compensation being a state regulate line.
                        </small>
                    </div>
                </div>
                <div class="selectionContainer" style="padding-bottom:10px;">
                    <span class='' style="" >
                        <input type="checkbox" class="sgpPlatinum_CoverageCheckbox" value="" id="sgpPlatinum_Umbrella">
                        Terrorism Coverage <br>
                    </span>
                    <div style="margin-left:20px; padding-top:4px; display:none">
                        <small class="text-danger">
                            Terrorism Coverage ratings vary by county and state and are subject to change prior to binding. Please confirm premium with your underwriter should your insured accept coverage.
                        </small>
                    </div>
                </div>


            </div>
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

            <div class="showReviewTable" id="limitsDeductPremiumInsert">
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