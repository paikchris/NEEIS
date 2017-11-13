<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: "newSubmission.css?ts=" + new Date().getTime())}" type="text/css">

    <script>
        var rC = ${raw(riskCategories)}
        var rT = ${raw(riskTypes)}
        var pr = ${raw(products)}
        var pC = ${raw(productConditions)}
        var oT = ${raw(operations)}
        var cT = ${raw(coverages)}
        var qL = ${raw(questions)}
        var qC = ${raw(questionCategories)}
        var rB = ${raw(ratingBasis)}
        var rL = ${raw(rates)}
        var cB = ${raw(productConditions)}

        //VERSION MODE SETUP
        var vM= false
        <g:if test="${versionMode == true}">
            vM = true
            var origVersionQuestionAnswerMap = ${raw(questionAnswerMapJSON)}
            var qR = ${raw(quoteRecordJSON)}
            var vR = ${raw(versionRecordsJSON)}
            var dVR = ${raw(dvVersionRecordsJSON)}
            var dVV = ${raw(dvVersionViewJSON)}
            var sR = ${raw(submissionRecordJSON)}
            var vAM = ${raw(questionAnswerMapJSON)}
            var vAOM = ${raw(questionAnswerOrganizedMapJSON)}
            var vL = ${raw(versionLetter)}
            var oV = ${raw(originalVersion)}
            var oQID = ${raw(originalQuoteID)}

        </g:if>
    </script>

    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/progressSaveLoad.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/formValidation.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/dateHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/BORHelper.js?ts=" + new Date().getTime())}" async></script>
    %{--<script src="${resource(dir: 'js', file: "/newSubmissionUtils/googleAddressHelper.js?ts=" + new Date().getTime())}" async></script>--}%
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/AIMHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/questionHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/newSubmissionUtils/submissionObj.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/ratingHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/JSONHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/stringUtils.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/fileHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/typeAheadHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/vendor/numeral.min.js?ts=" + new Date().getTime())}" async></script>
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
                    <button class="btn btn-xs btn-success" id="pdfTest" type="button"
                            style="background-color: rgb(105, 210, 255); border-color: rgb(105, 210, 255); margin: 2px;"
                            onclick="pdfTest()">
                        %{--<i class= aria-hidden="true"></i>--}%
                        <span class="" style="font-size: 14px; font-weight: 500"> Test PDF</span>
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
                    <h1 style="margin-bottom:0px;">${quoteRecord.NamedInsured} </h1>
                    <h4 style="text-align:center; margin:0px; color: rgb(94, 94, 94);">${quoteRecord.CoverageID.replaceAll("\"", "").replace("'", "")}</h4>
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
                    <p>Underwriting Questions</p>
                </div>
                <div class="stepwizard-step">
                    <a href="#step-4" type="button" class="btn btn-default btn-circle" id="buttonCircleStep4" disabled="disabled">4</a>
                    <p>Review and Submit</p>
                </div>
            </div>
        </div>

        <div class="row setup-content" id="step-1">
            <div class="col-xs-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                            <h3 class="panel-title" style="font-size: 20px;">Insured Information</h3>
                        </div>
                    <div class="panel-body newSubmissionPanel" id="insuredInfoPanelBody">
                        <div class="row">
                            <div class="col-xs-6 ">
                                <div class="form-group">
                                    <label class="control-label">Name of Insured</label>
                                    <input class="form-control defaultQuestion" type="text" id="namedInsured" placeholder="Insured Name" required>
                                </div>
                                <div class="addressAutoCompleteContainer">
                                    <div class = "form-group">
                                        <label class="control-label">Mailing Address <span style="color:red;">*</span> </label>
                                        <input class="form-control defaultQuestion addressAutoCompleteInput streetAddressInput" type="text" placeholder="Street address" name="streetNameMailing" id="streetAddressMailing" onFocus="geolocate()" required="required" />
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control defaultQuestion autoCompleteCity cityInput" type="text" placeholder = "City" name="cityMailing" id="cityMailing" required="required" />
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-xs-6">
                                            <input class="form-control defaultQuestion autoCompleteZipcode zipcodeInput" type="text" placeholder = "Zip Code" name="zipCodeMailing" id="zipCodeMailing" required="required" data-lengthrequired="5" maxlength="6"/>
                                        </div>
                                        <div class="form-group col-xs-6">
                                            <select class="form-control defaultQuestion autoCompleteState stateAddressInput" name="stateMailing"  data-reviewName="State" id="stateMailing" required="required" >
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
                                <div class="form-group">
                                    <label class="control-label">Contact Person</label>
                                    <input class="form-control defaultQuestion" type="text" id="namedInsuredContact" placeholder="Contact Person" required>
                                </div>
                                <div class="form-group">
                                    <input class="form-control emailInput" id="namedInsuredEmail" type="email" placeholder="Contact Email" value="" required >
                                </div>
                                <div class="form-group">
                                    <input class="form-control" id="namedInsuredPhone" type="text" placeholder="Contact Phone" value="" required >
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
                                <div class="form-group">
                                    <input class="form-control" id="brokerCompany" type="text" placeholder="" value="${user.company}" required disabled>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" id="brokerPhone" type="text" placeholder="" value="${user.phoneNumber}" required disabled>
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
            <div class="col-xs-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title" style="font-size: 20px;">Coverages</h3>
                    </div>
                    <div class="panel-body newSubmissionPanel" id="operationsCoveragesPanelBody">
                        %{--OPERATIONS AND COVERAGES--}%
                        <div class="col-xs-4 leftColumn">
                            %{--OPERATIONS--}%
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label">Operation Type</label>
                                        <select class="form-control " data-reviewName="State" id="operationsDropdown" required="required" >
                                            <option value="invalid" selected="selected">Select One</option>
                                            <g:each var="operation" in="${operationResults.sort{it.description}}">
                                                <option value="${operation.operationID}">${operation.description}</option>
                                            </g:each>
                                        </select>
                                        <input class="typeahead form-control" id="typeaheadTest" type="text" data-typeahead_dataset="typeahead_operations" style="display:none">
                                    </div>
                                </div>
                            </div>
                            %{--COVERAGES--}%
                            <div id="coveragesAvailableContainer" style="margin-bottom: 26px; display:none">
                                <div class="row">
                                    <div class="col-xs-12">
                                        %{--<label>Select Coverages:</label>--}%
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
                        </div>
                        %{--ALL REQUIRED QUESTIONS SECTION--}%
                        <div class="col-xs-8 rightColumn">
                            <div class="row">
                                <div class="col-xs-4 proposedEffectiveDate" style="">
                                    <div class="form-group requiredQuestion " style="">
                                        <label class="questionText">Proposed Effective</label>
                                        <input class="form-control defaultQuestion questionAnswer datepicker" type="text" data-reviewname="Proposed Effective Date"
                                               style="" data-questionid="proposedEffectiveDate" id="proposedEffectiveDate" placeholder="MM/DD/YYYY" required>
                                    </div>
                                </div>
                                <div class="col-xs-4 proposedExpirationDate requiredQuestion" >
                                    <div class="form-group " style="">
                                        <label class="questionText">Proposed Expiration</label>
                                        <input class="form-control defaultQuestion questionAnswer datepicker" type="text" data-reviewname="Proposed Expiration Date"
                                               style="" data-questionid="proposedExpirationDate" id="proposedExpirationDate" placeholder="MM/DD/YYYY" required>
                                    </div>
                                </div>
                                <div class="col-xs-4 proposedTermLength requiredQuestion" >
                                    <div class="form-group " style="">
                                        <label class="questionText">Term Length</label>
                                        <input class="form-control questionAnswer showReview " type="text" data-reviewname="Proposed Term Length"
                                               data-questionid="proposedTermLength" id="proposedTermLength" placeholder="" required>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="productConditionBasisRequiredQuestionsContainer">

                            </div>
                            <div class="row" id="ratingBasisRequiredQuestionsContainer">

                            </div>

                        </div>
                        %{--LIMITS AND DEDUCTIBLES SECTION--}%
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
                        %{--RATING SECTION--}%
                        <div class="col-xs-12">
                            <div class="well" id="premiumDetailContainer" style="display:none">
                                <div class="row premiumDetailHeader">
                                    <div class="col-xs-4">
                                        <h4>Premium and Rate Info</h4>
                                    </div>
                                    <div class="col-xs-4">
                                    </div>
                                    <div class="col-xs-4">
                                    </div>
                                </div>
                                <div class="row premiumDetailLabels">
                                    <div class="col-xs-4">
                                        <h5>Coverage</h5>
                                    </div>
                                    <div class="col-xs-2">
                                        <h5>Premium Basis</h5>
                                    </div>
                                    <div class="col-xs-2">
                                        <h5>Basis Value</h5>
                                    </div>
                                    <div class="col-xs-2">
                                        <h5>Rate</h5>
                                    </div>
                                    <div class="col-xs-2">
                                        <h5>Premium</h5>
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
                                <div id="taxLinesContainer" style="margin-top:36px;">

                                </div>
                                <div id="premiumTotalContainer" style="border-top: 1px solid rgba(128, 128, 128, 0.39);">

                                </div>

                            </div>
                        </div>
                        %{--BROKER FEE--}%
                        <div class="col-xs-12" style="margin-top:20px">
                            <div class="row">
                                <div class="col-xs-4 proposedEffectiveDate" style="">
                                    <div class="form-group " style="">
                                        <label class="questionText">Broker Fee</label>
                                        <input class="form-control defaultQuestion questionAnswer maskMoney" type="text" data-reviewname="Broker Fee"
                                               style="" data-questionid="brokerFee" id="brokerFeeInput" placeholder="">
                                    </div>
                                </div>
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
        %{--UNDERWRITING QUESTIONS--}%
        <div class="row setup-content" id="step-3">
            <g:each var="questionCategory" in="${questionCategoryResults}">
                <div class="col-xs-12">
                    <div class="panel panel-primary uwQuestionCategoryPanel"
                         id="${questionCategory.categoryCode}_QuestionCategoryPanel"
                         data-questioncategoryid="${questionCategory.categoryCode}"
                         data-questioncategoryname="${questionCategory.categoryName}"
                         style="display:none">
                        <div class="panel-heading">
                            <h6 class="panel-title">${questionCategory.categoryName}</h6>
                        </div>
                        <div class="panel-body questionLeftColumn uwQuestionCategoryContainer"
                             id="${questionCategory.categoryCode}_QuestionCategoryContainer"
                             data-questioncategoryid="${questionCategory.categoryCode}">
                        </div>
                    </div>
                </div>
            </g:each>
            <div class="col-xs-12">
                <div class="col-xs-12">
                    <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                    <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" id="nextButtonStep3" data-step="3">Next</button>
                </div>
            </div>

        </div>
        <div class="row setup-content" id="step-4">
            <div class="col-xs-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h6 class="panel-title">Review and Submit</h6>
                    </div>
                    <div class="panel-body">
                        <div class="col-xs-12" id="review_InsuredInfo">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h5>Insured Info</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <span class="reviewData" id="review_namedInsured">Named Insured</span>
                                </div>
                                <div class="col-xs-12">
                                    <span class="reviewData" id="review_namedInsuredStreetAddress">Street Address</span>
                                </div>
                                <div class="col-xs-12">
                                    <span class="reviewData" id="review_namedInsuredCity">City</span>, <span class="reviewData" id="review_namedInsuredZipcode">Zipcode</span> <span class="reviewData" id="review_namedInsuredState">State</span>
                                </div>
                                <div class="col-xs-6">

                                </div>
                                <div class="col-xs-6">

                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12" id="review_BrokerInfo">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h5>Broker Info</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <span class="reviewData" id="review_brokerName">Broker Name</span>
                                </div>
                                <div class="col-xs-12">
                                    <span class="reviewData" id="review_brokerEmail">Broker Email</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12" id="review_OperationsAndCoveragesInfo">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h5>Operation and Coverages</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <span class="reviewData" id="review_operationTypeName">Operation Type</span>
                                </div>
                                <div class="col-xs-12">
                                    <div class="reviewData" id="review_coverageBreakdown">Coverage Breakdown</div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="reviewData" id="review_rateBreakdown">Rate Breakdown</div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="reviewData" id="review_terms">Terms</div>
                                    <div class="well" >
                                        <span id="review_termsString" style="white-space: pre-line;">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12" id="review_UnderwritingInfo">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h4>Underwriting Information</h4>
                                </div>
                            </div>
                            <div class="" id="review_UnderwritingQuestions">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="col-xs-12">
                    <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                    <button class="btn btn-success nextBtn btn-lg pull-right" type="button" id="submitSubmissionButton" data-step="4">Submit</button>
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
