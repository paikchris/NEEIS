<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: "newSubmission.css?ts=" + new Date().getTime())}" type="text/css">

    <script>
        var rC = ${raw(riskCategories)}
        var rT = ${raw(riskTypes)}
        var pr = ${raw(products)}
        var oT = ${raw(operations)}
        var cT = ${raw(coverages)}
        var qL = ${raw(questions)}
        var rB = ${raw(ratingBasis)}
        var rL = ${raw(rates)}

        //VERSION MODE SETUP
        var versionMode = false;
        <g:if test="${versionMode == true}">
        versionMode= true;
        var origVersionQuestionAnswerMap = ${raw(questionAnswerMapString)}
        </g:if>
    </script>

    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/progressSaveLoad.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/formValidation.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/dateHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/BORHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/googleAddressHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/AIMHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/questionHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/submissionObj.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/ratingHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/JSONHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/stringUtils.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/fileHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}" async></script>
    <script src="${resource(dir: 'js', file: "newSubmissionV2.js?ts=" + new Date().getTime())}" async></script>


    <g:if test="${user.admin == "true"}">
        <script src="${resource(dir: 'js/utils/', file: 'randomGenerator.js')}" ></script>
        <script src="${resource(dir: 'js', file: 'jquery.autotype.js')}" ></script>
    </g:if>

</head>
<body>
    <div class="container">
        %{--SAVE/LOAD ALERT HEADER--}%
        <g:if test="${versionMode == false}">
            <div class="row">
                <div class="alert alert-success alert-dismissible" id="previousSubmissionExistsAlert" role="alert" style="display:none;">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <span>Looks like you were working on a submission previously. Would you like to continue your previous submission?</span>
                    <button class="btn btn-xs btn-danger pull-right" id="continuePreviousSubmissionNo" data-dismiss="alert"
                            type="button" style="margin-left: 10px; margin-right: 10px; width:70px;">
                        <span class="" style="">No</span>
                    </button>
                    <button class="btn btn-xs btn-success pull-right loadProgress" id="continuePreviousSubmissionYes" type="button" style="margin-left: 10px; margin-right: 10px; width:70px;">
                        <span class="" style="">Yes</span>
                    </button>
                </div>
            </div>
        </g:if>

        %{--HEADER--}%
        <div class="row newSubmissionHeader">
            <div class="col-xs-1" style="margin-top:80px">
                <g:if test="${user.admin == "true"}">
                    <button class="btn btn-xs btn-success" id="testHelper" type="button"
                            style="background-color: rgb(105, 210, 255); border-color: rgb(105, 210, 255); margin: 2px;"
                            onclick="autoFillAllElse()">
                        <i class="fa fa-cogs" aria-hidden="true"></i>
                        <span class="" style="font-size: 14px; font-weight: 500"> Test Helper</span>
                    </button>
                    <button class="btn btn-xs btn-success" id="emailTest" type="button"
                            style="background-color: rgb(105, 210, 255); border-color: rgb(105, 210, 255); margin: 2px;"
                            onclick="testEmail()">
                        %{--<i class= aria-hidden="true"></i>--}%
                        <span class="" style="font-size: 14px; font-weight: 500"> Test Email</span>
                    </button>
                </g:if>
            </div>
            <div class="col-xs-10">
                <g:if test="${versionMode == false}">
                    <h1>New Policy</h1>
                    <h4 style="text-align: center; margin-bottom:4px;" id="riskCategoryHeader"></h4>
                    <h5 style="text-align: center; margin-top: 0px; margin-bottom:0px;" id="riskTypeHeader"></h5>

                </g:if>
                <g:elseif test="${versionMode == true}">
                    <h1 style="margin-bottom:0px;">${questionAnswerMap.namedInsured} </h1>
                    <h4 style="text-align:center; margin:0px; color: rgb(94, 94, 94);">${quoteResults.CoverageID.replaceAll("\"", "").replace("'", "")}</h4>
                    <h5 style="text-align: center; margin:0px; color: rgba(70, 147, 194, 0.95);" id="riskCategoryHeader"></h5>
                    <h6 style="text-align: center; margin:0px; color: rgba(70, 147, 194, 0.95);" id="riskTypeHeader"></h6>
                    <h6 style="text-align:center; color: rgb(94, 94, 94);">Creating <u>Version ${versionLetter}</u> based on Version ${originalVersion}</h6>
                </g:elseif>

            </div>
            <div class="col-xs-1" id="saveLoadButtonContainer" style="margin-top:80px">
            %{--IF VERSION MODE HIDE SAVE LOAD BUTTONS FOR NOW, UNTIL SAVING VERSION PROGRESS IS SET UP--}%
                <g:if test="${versionMode == false}">
                    <button class="btn btn-xs btn-success pull-right" id="saveProgress" type="button"
                            style="display:none;background-color: #194b8a;border-color: #194b8a;margin: 2px;">
                        <i class="fa fa-floppy-o" aria-hidden="true"></i>
                        <span class="" style="font-size: 14px; font-weight: 500" > Save Progress</span>
                    </button>
                    <button class="btn btn-xs btn-success pull-right loadProgress" id="loadProgress" type="button" style="display:none ;background-color: #15a175;border-color: #15a175;margin: 2px; ">
                        <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                        <span class="" style="font-size: 14px; font-weight: 500" > Load Previous</span>
                    </button>
                </g:if>
                <g:elseif test="${versionMode == true}">
                </g:elseif>

            </div>
        </div>

        %{--BOR HEADER--}%
        <div class="row BORHeader" style="text-align: center;">
            <span class="label label-bor" id="BORRequestNotification" style="display:none; ">BOR Requested</span>
            <span class="label label-success" id="renewalNotification" style="display:none; ">Renewal</span>
        </div>
        <br>

        %{--STEPWIZARD CIRCLE BUTTONS--}%
        <div class="stepwizard circleStepButtonContainer">
            <div class="stepwizard-row setup-panel">
                <div class="stepwizard-step">
                    <a href="#step-1" type="button" class="btn btn-primary btn-circle" id="buttonCircleStep1">1</a>
                    <p>Insured Information</p>
                </div>
                <div class="stepwizard-step">
                    <a href="#step-2" type="button" class="btn btn-default btn-circle" id="buttonCircleStep2" disabled="disabled">2</a>
                    <p>Select Operation and Coverages</p>
                </div>
                <div class="stepwizard-step">
                    <a href="#step-3" type="button" class="btn btn-default btn-circle" id="buttonCircleStep3" disabled="disabled">3</a>
                    <p>Select Operation and Coverages</p>
                </div>
                <div class="stepwizard-step">
                    <a href="#step-4" type="button" class="btn btn-default btn-circle" id="buttonCircleStep4" disabled="disabled">4</a>
                    <p>Insured Info</p>
                </div>
                <div class="stepwizard-step">
                    <a href="#step-5" type="button" class="btn btn-default btn-circle" id="buttonCircleStep5" disabled="disabled">5</a>
                    <p>Submit</p>
                </div>
            </div>
        </div>

        <div class="row setup-content" id="step-1">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                            <h3 class="panel-title" style="font-size: 20px;">Insured Information</h3>
                        </div>
                    <div class="panel-body newSubmissionPanel" id="insuredInfoPanelBody">
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label class="control-label">Name of Insured</label>
                                        <input class="form-control" type="text" id="namedInsured" placeholder="Insured Name" required>
                                    </div>
                                    <div class = "form-group">
                                        <label class="control-label">Mailing Address <span style="color:red;">*</span> </label>
                                        <input class="form-control " type="text" placeholder="Street address" name="streetNameMailing" id="googleAutoAddress" onFocus="geolocate()" required="required" />
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" placeholder = "City" name="cityMailing" id="cityMailing" required="required" />
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-xs-6">
                                            <input class="form-control" type="text" placeholder = "Zip Code" name="zipCodeMailing" id="zipCodeMailing" required="required" data-lengthrequired="5" maxlength="6"/>
                                        </div>
                                        <div class="form-group col-xs-6">
                                            <select class="form-control " name="stateMailing"  data-reviewName="State" id="stateMailing" required="required" >
                                                <option value="invalid" selected="selected">State</option>
                                                <option value="AL">Alabama</option>
                                                <option value="AK">Alaska</option>
                                                <option value="AZ">Arizona</option>
                                                <option value="AR">Arkansas</option>
                                                <option value="CA">California</option>
                                                <option value="CO">Colorado</option>
                                                <option value="CT">Connecticut</option>
                                                <option value="DE">Delaware</option>
                                                <option value="DC">District Of Columbia</option>
                                                <option value="FL">Florida</option>
                                                <option value="GA">Georgia</option>
                                                <option value="GU">Guam</option>
                                                <option value="HI">Hawaii</option>
                                                <option value="ID">Idaho</option>
                                                <option value="IL">Illinois</option>
                                                <option value="IN">Indiana</option>
                                                <option value="IA">Iowa</option>
                                                <option value="KS">Kansas</option>
                                                <option value="KY">Kentucky</option>
                                                <option value="LA">Louisiana</option>
                                                <option value="ME">Maine</option>
                                                <option value="MD">Maryland</option>
                                                <option value="MA">Massachusetts</option>
                                                <option value="MI">Michigan</option>
                                                <option value="MN">Minnesota</option>
                                                <option value="MS">Mississippi</option>
                                                <option value="MO">Missouri</option>
                                                <option value="MT">Montana</option>
                                                <option value="NE">Nebraska</option>
                                                <option value="NV">Nevada</option>
                                                <option value="NH">New Hampshire</option>
                                                <option value="NJ">New Jersey</option>
                                                <option value="NM">New Mexico</option>
                                                <option value="NY">New York</option>
                                                <option value="NC">North Carolina</option>
                                                <option value="ND">North Dakota</option>
                                                <option value="OH">Ohio</option>
                                                <option value="OK">Oklahoma</option>
                                                <option value="OR">Oregon</option>
                                                <option value="PA">Pennsylvania</option>
                                                <option value="PR">Puerto Rico</option>
                                                <option value="RI">Rhode Island</option>
                                                <option value="SC">South Carolina</option>
                                                <option value="SD">South Dakota</option>
                                                <option value="TN">Tennessee</option>
                                                <option value="TX">Texas</option>
                                                <option value="UT">Utah</option>
                                                <option value="VT">Vermont</option>
                                                <option value="VI">Virgin Islands</option>
                                                <option value="VA">Virginia</option>
                                                <option value="WA">Washington</option>
                                                <option value="WV">West Virginia</option>
                                                <option value="WI">Wisconsin</option>
                                                <option value="WY">Wyoming</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label class="control-label">Broker Info</label>
                                        <input class="form-control" type="text" id="brokerName" placeholder="Full Name" value="${user.firstName} ${user.lastName}" required disabled>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control emailInput" id="brokerEmail" type="email" placeholder="Broker@email.com" value="${user.email}" required disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            <div class="col-xs-12">
                <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" id="nextButtonStep1" data-step="1">Next</button>
            </div>
        </div>
        %{--SELECTING RISK--}%
        <div class="row setup-content" id="step-2">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title" style="font-size: 20px;">Coverages</h3>
                    </div>
                    <div class="panel-body newSubmissionPanel" id="operationsCoveragesPanelBody">
                        <div class="col-xs-4 leftColumn">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label">Operation Type</label>
                                        <select class="form-control " data-reviewName="State" id="operationsDropdown" required="required" >
                                            <option value="invalid" selected="selected">Select One</option>
                                            <g:each var="operation" in="${operationResults}">
                                                <option value="${operation.operationID}">${operation.description}</option>
                                            </g:each>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xs-12">
                                    <label>Select Coverages:</label>
                                </div>
                            </div>
                            <div id="coverageOptionsContainer">
                                %{--<g:each var="coverage" in="${coverageResults.findAll{ it.coverageOffered == "Y"}.sort{it.coverageOfferedDisplayOrder} }">--}%
                                %{--<div class="row coverageContainer checkboxAndHiddenDivContainer" id="${coverage.coverageCode}_CoverageOptionContainer">--}%
                                    %{--<div class='col-xs-12 form-group checkboxContainer'>--}%
                                %{--<p><input type='checkbox' class='coverageCheckbox checkboxHiddenDiv' id='${coverage.coverageCode}_CoverageCheckbox'/> ${coverage.coverageName}--}%
                                %{--</p>--}%
                                %{--</div>--}%
                                %{--<div class="coverageQuestionsContainer hiddenContainer" style="display:none">--}%

                                %{--</div>--}%
                                %{--</div>--}%
                                %{--</g:each>--}%

                            </div>
                        </div>
                        <div class="col-xs-8 rightColumn">
                            <div class="row" id="productConditionBasisRequiredQuestionsContainer">

                            </div>
                            <div class="row" id="ratingBasisRequiredQuestionsContainer">

                            </div>

                        </div>
                        <div class="col-xs-12">
                            <div class="well" id="limitsDeductiblesContainer" style="display:none">
                                <div class="row limDeductColumnLabels">
                                    <div class="col-xs-4">
                                    </div>
                                    <div class="col-xs-4">
                                        <label>Limits</label>
                                    </div>
                                    <div class="col-xs-4">
                                        <label>Deductibles</label>
                                    </div>
                                </div>
                                <div id="coverageLimitDeducts">

                                </div>

                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="well" id="premiumDetailContainer" style="display:none">
                                <div class="row premiumDetailHeader">
                                    <div class="col-xs-4">
                                        <label>Premium and Rate Info</label>
                                    </div>
                                    <div class="col-xs-4">
                                    </div>
                                    <div class="col-xs-4">
                                    </div>
                                </div>
                                <div class="row premiumDetailLabels">
                                    <div class="col-xs-3">
                                        <h6>Coverage</h6>
                                    </div>
                                    <div class="col-xs-1">
                                        <h6>Premium Basis</h6>
                                    </div>
                                    <div class="col-xs-1">
                                        <h6>Basis Value</h6>
                                    </div>
                                    <div class="col-xs-1">
                                        <h6>Rate</h6>
                                    </div>
                                    <div class="col-xs-1">
                                        <h6>Premium</h6>
                                    </div>
                                </div>
                                <div id="premiumLinesContainer">
                                    <div class='row premiumLineRow'>
                                        <div class='col-xs-3'>
                                            <span>Entertainment Package</span>
                                        </div>
                                        <div class='col-xs-1'>
                                            <span>GPC</span>
                                        </div>
                                        <div class='col-xs-1'>
                                            <span>$232,234</span>
                                        </div>
                                        <div class='col-xs-1'>
                                            <span>.12</span>
                                        </div>
                                        <div class='col-xs-1'>
                                            <span>$400</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div class="col-xs-12">
                <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" id="nextButtonStep2" data-step="2">Next</button>
            </div>
        </div>
        %{--SELECT PRODUCTS AND COVERAGES--}%
        <div class="row setup-content" id="step-3">
            <div class="col-xs-12">
                <div class="col-md-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title" style="font-size: 20px;">Coverage Dates</h3>
                        </div>
                        <div class="panel-body" id="coverageDatesPanelBody">
                            <div class="row">
                                <div class="col-xs-3">
                                    <div class="form-group" id="premiumExpectedInputGroup" style="display:none">
                                        <label class="control-label">Target Premium</label>
                                        <input class="form-control currencyInput" id="premiumExpectedInput" name="premiumExpectedInput" type="text"  required>
                                    </div>
                                </div>
                                <div class="col-xs-2">
                                    <div class="form-group" id="howManyDaysIsTheEventGroup" style="display:none">
                                        <label class="control-label">Number of Event days</label>
                                        <input class="form-control effectsTotalCGL" id="howManyDaysIsTheEvent" name="howManyDaysIsTheEvent" type="number"
                                               onkeyup="this.value = validate(this.value, 0, 90)" style="color: black; background: white;"/>
                                    </div>
                                </div>
                                <div class="col-xs-2">
                                    <div class="form-group"id="estimatedTotalAttendanceGroup" style="display:none">
                                        <label class="control-label">Total Attendance</label>
                                        <input class="form-control effectsTotalCGL" id="estimatedTotalAttendance" name="estimatedTotalAttendance" type="number"
                                               style="color: black; background: white;"/>
                                    </div>
                                </div>
                                <div class="col-xs-5">
                                    <div class="form-group" id="largestNumberAttendeesGroup" style="display:none">
                                        <label class="control-label">Largest Number of Attendees Any One Event Per Day</label>
                                        <input class="form-control" id="largestNumberAttendees" name="largestNumberAttendees" type="number"
                                               style="color: black; background: white;"/>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="form-group" id="selectStateGroup" style="display:none">
                                        <label class="control-label">Select Location of Event</label>
                                        %{--<input class="form-control" type="text" placeholder = "State" name="stateMailing" id="stateMailing"/>--}%
                                        <select class="form-control" required="required"
                                                id="selectState" name="selectState" type="text" style="color: black; background: white;">
                                            <option value="invalid" selected="selected">State</option>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="DC">District Of Columbia</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="GU">Guam</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="PR">Puerto Rico</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VI">Virgin Islands</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-9">
                                    <div class="form-group separatePolicyGroup" style="display:none">
                                        <label>Is this policy for a specific vendor / concessionaire / exhibitor? - Separate Policy</label><br>
                                        <input type="radio" name="separatePolicy"
                                               class="showReview effectsTotalCGL effectsTotalPremium"
                                               value="Yes"
                                               data-reviewName="Is this policy for a specific vendor, concessionaire or exhibitor? - Separate Policy"
                                               id="separatePolicyYes_RadioButton"> Yes
                                        <input type="radio" name="separatePolicy"
                                               class=""
                                               value="No"
                                               data-reviewName="Is this policy for a specific vendor, concessionaire or exhibitor? - Separate Policy"
                                               id="separatePolicyNo_RadioButton"
                                               checked="checked"> No
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="form-group" id="numberOfExhibitorsGroup" style="display:none">
                                        <label class="control-label">Enter number of Exhibitors</label>
                                        <input class="form-control effectsTotalCGL effectsTotalPremium" id="numberOfExhibitors" name="numberOfExhibitors" type="text" style="color: black; background: white;"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" style="color:rgba(31, 31, 31, 0.35)">
                    <div class="panel panel-default" id="coverageOptionsReview" style="">
                        <div class="panel-heading">
                            <h3 class="panel-title" style="font-size: 20px; color:rgba(31, 31, 31, 0.35)" id="coverageOptionsTitle">Coverage Options</h3>
                        </div>
                        <div class="panel-body" id="coverageInfoPanel">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label class="control-label"style="font-size:10px">Please select the Coverages being requested:</label>
                                </div>
                            </div>
                            <div id="coverageCheckboxesDiv">
                            </div>
                            <br><br>
                            <div class="row" id="premiumDistDivContainer">
                                <div class="col-xs-12">
                                    <h5 style="margin-bottom:4px;">Premium Distribution</h5>
                                    <div class="row" style="padding-left:10px">
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
                                    <div id="premDistributionInsert">
                                        <div class="row">
                                            <div class="col-xs-4">
                                                <span class="lineOfBusinessSpan">-</span>
                                            </div>
                                            <div class="col-xs-3">
                                                <span class="premiumSpan">-</span>
                                            </div>
                                            <div class="col-xs-3">
                                                <span class="agentPercentSpan">-</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="premTotalInsert">

                                    </div>
                                    <span id="premiumInsert"></span>
                                </div>
                            </div>
                            <div class='row TaxHeaderRow' style= 'font-weight: 500; margin-top:10px;'>
                                <div class='col-xs-4'>
                                    <span class='lineOfBusinessSpan'> Taxes & Fees </span>
                                </div>
                                <div class='col-xs-3'>
                                    <span class='totalPremiumSpan' ></span>
                                </div>
                                <div class='col-xs-3'>
                                    <span class='agentPercentSpan'></span>
                                </div>
                            </div>
                            <div id="taxRows" style="">

                            </div>
                            <div class='row TotalPremiumRow' style= 'font-weight: 500'>
                                <div class='col-xs-4'>
                                    <span class='lineOfBusinessSpan'> Total </span>
                                </div>
                                <div class='col-xs-3'>
                                    <span class='totalPremiumSpan' id='premiumAllLOBTotal'></span>
                                </div>
                                <div class='col-xs-3'>
                                    <span class='agentPercentSpan'></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-9" id="disclaimerInsert" style="padding-top: 10px;padding-bottom:40px;font-size: 13px;color: red;">

                                </div>

                            </div>
                            <div class="row">

                                <div class="col-xs-12">
                                    <h5>Terms</h5>
                                    <span id="termsInsert" style="font-size: 12px; white-space: pre-line"></span>
                                </div>

                            </div>
                            <br>
                            <div class="row">

                                <div class="col-xs-12">
                                    <h5>Endorse</h5>
                                    <span id="endorseInsert" style="font-size: 12px; white-space: pre-line"></span>
                                </div>

                            </div>
                            <br>
                            <div class="row">
                                <div class="form-group col-xs-2">
                                    <label class="control-label ">Broker Fee</label>
                                    <input class="form-control currencyInput" id="brokerFeeInput"type="text" placeholder = "$" name="brokerFee" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-xs-12">
                    <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                    <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" id="nextButtonStep2" data-step="2">Next</button>
                </div>
            </div>

        </div>
        <div class="row setup-content" id="step-4">
            <div class="row">
                <div class="col-xs-12">
                    %{--<h3>Insured Information</h3>--}%
                </div>

            </div>
            <br>
            <span><span style="color:red; font-size:12px;">*</span> Required Field</span>
            <div id="questionsContainer">

                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title" style="font-size: 20px;">Risk Specific Information</h3>
                    </div>
                    <div class="panel-body" id="riskSpecificInsert">
                        <div class="row">
                        </div>
                    </div>
                </div>
                <br>
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title" style="font-size: 20px;">Locations</h3>
                    </div>
                    <div class="panel-body" id="locationDivContainer">
                        <div class="row">
                            <div class="form-group col-xs-12" style="margin-bottom: 0px;">
                                <p><input type="checkbox" name="addressTheSame" id="addressTheSame" /> Physical Address is the same as Mailing Address </p>
                            </div>
                        </div>

                        <div class="locationDiv">
                            <h5 class="locationHeader" style="font-size: 16px;">Physical Address</h5>
                            <div class="row">
                                <div class = "form-group col-xs-4">
                                    <label class="control-label">Street Address</label>
                                    <input class="form-control showReview" type="text" data-reviewName="Physical Street Address" placeholder = "Street address" name="streetName" />
                                </div>
                                <div class="form-group col-xs-4">
                                    <label class="control-label">City</label>
                                    <input class="form-control showReview" type="text" data-reviewName="Physical City" placeholder = "City" name="city" />
                                </div>
                                <div class="form-group col-xs-2">
                                    <label class="control-label">State</label>
                                    %{--<input class="form-control showReview" type="text" data-reviewName="Physical State" placeholder = "State" name="state" />--}%
                                    <select class="form-control " name="state"  data-reviewName="State" id="state"  >
                                        <option value="invalid" selected="selected">State</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="GU">Guam</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VI">Virgin Islands</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                </div>
                                <div class="form-group col-xs-2">
                                    <label class="control-label">Zipcode</label>
                                    <input class="form-control showReview" type="text" data-reviewName="Physical Zipcode" placeholder = "Zip Code" name="zipCode" maxlength="12"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class = "form-group col-xs-2">
                                    <label class="control-label"># of Buildings</label>
                                    <input class="form-control physicalAddressNumBuildings showReview" type="text" data-reviewName="# of Buildings" placeholder = "# of Buildings" name="numBuildings" />
                                </div>
                                <div class="form-group col-xs-2">
                                    <label class="control-label">Habitational Units</label>
                                    <input class="form-control physicalAddressHabUnits showReview" type="text" data-reviewName="Habitational Units" placeholder = "Habitational units" name="habitationalUnits" />
                                </div>
                                <div class="form-group col-xs-2">
                                    <label class="control-label">Comm Sq Ft</label>
                                    <input class="form-control physicalAddressCommSqFt  showReview" type="text" data-reviewName="Comm Sq Ft" placeholder = "Comm Sq Ft" name="commSqFt" />
                                </div>
                                <div class="form-group col-xs-2">
                                    <label class="control-label">Interest</label>
                                    <select class="form-control interestSelect showReview" name="interest"  data-reviewName="Interest" id="interestSelect">
                                        <option value="invalid" selected="selected">Owner</option>
                                        <option value="corporation" selected="selected">Lessee</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-4">
                                    <button class="btn btn-primary btn-sm addLocation" type="button" >Add Another</button>
                                    <button class="btn btn-danger btn-sm removeLocation"  type="button" >Remove</button>
                                </div>
                            </div>
                            <br>
                            <br>
                        </div>

                    </div>
                </div>

                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title" style="font-size: 20px;">Business Information</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="form-group col-xs-3">
                                <label class="control-label">Business Structure</label>
                                <select class="form-control showReview" data-reviewName="Business Structure" name="businessStructure" id="businessStructureSelect" required="required">
                                    <option value="invalid" selected="selected">Please Select Business Structure</option>
                                    <option value="corporation" selected="selected">Corporation</option>
                                    <option value="individual" selected="selected">Individual</option>
                                    <option value="LLC" selected="selected">Limited Liability Corporation</option>
                                    <option value="LLP" selected="selected">Limited Liability Partnership</option>
                                    <option value="partnership" selected="selected">Partnership</option>
                                    <option value="soleProprietorship" selected="selected">Sole Proprietorship</option>
                                </select>
                            </div>
                            <div class="form-group col-xs-3">
                                <label class="control-label">FEIN/SSN</label>
                                <input class="form-control showReview" type="text" data-reviewName="FEIN/SSN" placeholder = "FEIN/SSN" name="FEINSSN" id="FEINSSN" maxlength="12"/>
                            </div>
                            <div class="form-group col-xs-3">
                                <label class="control-label">SIC</label>
                                <input class="form-control showReview" type="text" data-reviewName="SIC" placeholder = "SIC" name="SIC" id="SIC" value="7812" maxlength="6"/>
                            </div>
                            <div class="form-group col-xs-3">
                                <label class="control-label">NAIC</label>
                                <input class="form-control showReview" type="text" data-reviewName="NAIC" placeholder = "NAIC" name="NCCI" id="NCCI" value="512110" maxlength="15"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-md-12" id="step2test">

            </div>

            <div class="row">
                <div class="col-xs-12">
                    <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" id="nextButtonStep3" data-step="3" >Next</button>

                </div>
            </div>
        </div>
        <div class="row setup-content" id="step-5">
            <div class="col-xs-10 col-xs-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Review and Submit
                    </div>
                    <div class="panel-body">

                        <div class="col-xs-12" id="reviewPanelContainer">
                            <div class="row">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Insured</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewNamedInsured">Blank</span><br>
                                    <span class="reviewSpan" id="reviewMailingAddress">Blank</span><br>
                                    <span class="reviewSpan" id="reviewMailingCity">Blank</span><span class="reviewSpan" id="reviewMailingState">Blank</span>,
                                    <span class="reviewSpan" id="reviewMailingZipcode">Blank</span><br>
                                    <span class="reviewSpan" id="reviewPhoneNumber">Blank</span><br>
                                    <span class="reviewSpan" id="reviewEmail">Blank</span><br>
                                    <span class="reviewSpan" id="reviewWebsite">Blank</span>

                                </div>
                            </div>
                            <br>
                            <div class="row totalBudgetReview" style="">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel">Total Budget</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewTotalBudget">Blank</span>

                                </div>
                            </div>
                            <div class="row eventDaysReview" style="display:none">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel">Event Days</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewEventDays">Blank</span>

                                </div>
                            </div>
                            <br>
                            <div class="row photographyDatesReviewTable" style="">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Photography Dates</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewPrincipalPhotographyDates">Blank</span>

                                </div>
                            </div>
                            <div class="row totalAttendanceReview" style="display:none">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel">Total Attendance</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewTotalAttendance">Blank</span>

                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Effective Dates</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewProposedEffective">Blank</span> to <span class="reviewSpan" id="reviewProposedExpiration">Blank</span>

                                </div>
                            </div>
                            <br>

                            <div class="row">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Term Length</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewProposedTerm">Blank</span>
                                </div>
                            </div>
                            <br>
                            <div class="row largestAttendeesReview" style="display:none">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel">Largest Number of Attendees</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewLargestAttendees">Blank</span>

                                </div>
                            </div>
                            <br>
                            %{--FILM PRODUCTION TABLE--}%
                            <div class="row filmProductionTableReview" style="">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Limits/Deductibles</label><br>
                                </div>
                                <div class="col-xs-9">
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
                                    <div class="reviewSpan" id="reviewLimitsDeducts">Blank</div>
                                </div>
                            </div>
                            %{--FILM PRODUCTION TABLE--}%
                            %{--SPECIAL EVENTS TABLE--}%
                            <div class="row specialEventsTableReview" style="display:none">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Limits/Deductibles</label><br>
                                </div>
                                <div class="col-xs-9">
                                    <div class="row">
                                        <div class="col-xs-9">
                                            <u>Coverage</u>
                                        </div>
                                        <div class="col-xs-3">
                                            <u>Limits</u>
                                        </div>
                                    </div>
                                    <div class="reviewSpan" id="reviewLimitsDeductsSP">Blank</div>
                                </div>
                            </div>
                            %{--SPECIAL EVENT TABLE--}%
                            <br>
                            %{--FILM PRODUCTION PREMIUM TABLE--}%
                            <div class="row premiumReviewFilm" style="">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Premium Distribution</label><br>
                                </div>
                                <div class="col-xs-9">
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
                                    <div class="reviewSpan" id="reviewPremDistribution">Blank</div>
                                </div>
                            </div>
                            %{--FILM PRODUCTION PREMIUM TABLE--}%
                            %{--SPECIAL EVENTS PREMIUM TABLE--}%
                            <div class="row premiumReviewEvents" style="display:none">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Premium Distribution</label><br>
                                </div>
                                <div class="col-xs-9">
                                    <div class="row">
                                        <div class="col-xs-4">
                                            <u>Line Of Business</u>
                                        </div>
                                        <div class="col-xs-3">
                                            <u>Premium</u>
                                        </div>
                                    </div>
                                    <div class="reviewSpan" id="reviewPremDistributionSP">Blank</div>
                                </div>
                            </div>
                            %{--SPECIAL EVENTS PREMIUM TABLE--}%

                            <br>
                            <div class="row">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Terms</label><br>
                                </div>
                                <div class="col-xs-9">
                                    <div class="reviewSpan" id="reviewTerms" style="font-size: 12px; white-space: pre-line">Blank</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Broker Fee</label><br>
                                </div>
                                <div class="col-xs-9">
                                    <div class="reviewSpan" id="reviewBrokerFee" style=""></div>
                                </div>
                            </div>
                            %{--<br>--}%
                            %{--<div class="row">--}%
                            %{--<div class="col-xs-3 text-left">--}%
                            %{--<label class="reviewLabel ">Endorse</label><br>--}%
                            %{--</div>--}%
                            %{--<div class="col-xs-9">--}%
                            %{--<span class="reviewSpan" id="reviewSubject" style="font-size: 12px; white-space: pre-line">Blank</span>--}%
                            %{--</div>--}%
                            %{--</div>--}%
                            %{--<br>--}%
                            %{--<div class="row">--}%
                            %{--<div class="col-xs-3 text-left">--}%
                            %{--<label class="reviewLabel ">Broker Fee</label><br>--}%
                            %{--</div>--}%
                            %{--<div class="col-xs-9">--}%
                            %{--<div class="reviewSpan" id="reviewBrokerFee">Blank</div>--}%
                            %{--</div>--}%
                            %{--</div>--}%
                            <br>
                            <br>
                            <br>
                            <div class="row">
                                <div class="col-xs-12 text-left">
                                    <label class="reviewLabel ">ATTACHED FILES</label><br>
                                </div>
                            </div>
                            <div id="reviewAttachedFilesInsert">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="reviewSpan" id="review">name</div>
                                    </div>
                                </div>
                            </div>

                            <br>
                            <br>
                            <br>
                            <div class="row">
                                <div class="col-xs-12 text-left">
                                    <label class="reviewLabel ">UNDERWRITING INFORMATION</label><br>
                                </div>
                            </div>

                            <br>
                            <div id="otherReviewInsert">

                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-xs-12">
                    <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                    <button class="btn btn-success nextBtn btn-lg pull-right" type="button" id="nextButtonStep4" data-step="4">Submit</button>
                </div>
            </div>

        </div>
    </div>

    <g:render template="/shared/modals/attachmentsModal" model=""/>
    <g:render template="/shared/modals/loadSaveModal" model=""/>
    <g:render template="/shared/modals/saveAsModal" model=""/>
    <g:render template="/shared/modals/renewalModal" model=""/>
    <g:render template="/shared/modals/checkNamedInsuredModal" model=""/>

</body>
</html>
