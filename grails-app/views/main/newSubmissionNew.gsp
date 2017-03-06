%{--<%@ page import="portal.Coverage" %>--}%
<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="layout" content="main">
        <link rel="stylesheet" href="${resource(dir: 'css', file: 'newSubmission.css')}" type="text/css">
<script src="${resource(dir: 'js', file: "newSubmission1.js?ts=" + new Date().getTime())}" async></script>
%{--<script src="${resource(dir: 'js', file: "newSubmission.js?ts=" + new Date().getTime())}" async></script>--}%
<script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}" async></script>
</head>
<body>
    <div id="riskMap" style="display: none;">
<g:each status="i" var="r" in="${riskTypes}">
    ${r.riskTypeName}:${r.riskTypeCategory};&;
</g:each>

</div>
<div id="coverageMap" style="display: none;">
    ${coverages}
</div>
<div id="marketCompanyMap" style="display: none;">
    ${marketCompanyList}
</div>
<div id="riskCompanyMap" style="display: none;">
    ${riskCompanyList}
</div>
<div id="producerIDhidden" style="display: none;">
    ${session.user.company}
</div>
<form id="intelledox" role="form">
</form>
<div class="container">
    <h1>New Policy</h1>
    <h4 style="text-align: center; margin-bottom:4px;" id="riskCategoryHeader"></h4>
    <h5 style="text-align: center; margin-top: 0px; margin-bottom:0px;" id="riskTypeHeader"></h5>
    <div class="row" style="text-align: center;">
        <span class="label label-info" id="BORRequestNotification" style="display:none; ">BOR Requested</span>
    </div>
    <br>
    <div class="stepwizard">
        <div class="stepwizard-row setup-panel">
            <div class="stepwizard-step">
                <a href="#step-1" type="button" class="btn btn-primary btn-circle" id="buttonCircleStep1">1</a>
                <p>Select Risk</p>
            </div>
            <div class="stepwizard-step">
                <a href="#step-2" type="button" class="btn btn-default btn-circle" id="buttonCircleStep2" disabled="disabled">2</a>
                <p>Select Coverages</p>
            </div>
            <div class="stepwizard-step">
                <a href="#step-3" type="button" class="btn btn-default btn-circle" id="buttonCircleStep3" disabled="disabled">3</a>
                <p>Insured Info</p>
            </div>
            <div class="stepwizard-step">
                <a href="#step-4" type="button" class="btn btn-default btn-circle" id="buttonCircleStep4" disabled="disabled">4</a>
                <p>Submit</p>
            </div>
        </div>
    </div>
<g:form controller="main" action="submitSubmission">
    <form role="form">
        <div class="row setup-content" id="step-1">
            <div class="col-xs-12">
                <br>
                <h3>Select Your Risk</h3>
                <br>
            </div>
            <g:each status="i" var="c" in="${riskCategory}">
                <div class="row" id="${c.riskCategoryCode}">
                    <div class="col-xs-12">
                        <div class="card card-unselected media">
                            <div class="media-left">
                                <a href="#">
                                    <img class="media-object media-img" src="${c.imgFilePath}" alt="..." width="250px" height="150px">
                                </a>
                            </div>
                            <div class="media-body card-content2">
                                <h4 class="media-heading">${c.riskCategoryName}</h4>
                                ${c.description}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 drawerContainer" style="">

                        <div class="drawer" style="">
                            <div class="col-xs-12">
                                <h4>Please select one:</h4>
                            </div>

                            <g:each status="j" var="r" in="${riskTypes}">%{--Loop through all risktype--}%
                                <g:if test="${r.riskTypeCategory == c.riskCategoryCode}">
                                    <g:if test="${r.subCategoryFlag == "Y"}">%{--Dropdown for risk--}%
                                        <div class="col-xs-4">
                                            <ul class="nav nav-pills nav-stacked">
                                                <li role="presentation" class="inactive">
                                                    <a href="" class="riskOptionLink riskOptionDropDown">
                                                        <div class="row" style="margin:0px">${r.riskTypeName}</div>
                                                        <div class="row" style="margin:0px">
                                                            <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                            margin-bottom: 10px;font-size: 25px;">
                                                                <option value="invalid" selected>Select One</option>
                                                                <g:each status="k" var="rs" in="${riskTypes.findAll{it.parentSubCategory == r.riskTypeName}}"> %{--Find all risks in subCategory--}%
                                                                    <option value="Concerts">${rs.riskTypeName}</option>
                                                                </g:each>
                                                            </select>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </g:if>
                                    <g:elseif test="${r.subCategoryFlag == "N" && r.parentSubCategory.trim() == "" }">
                                        <div class="col-xs-4">
                                            <ul class="nav nav-pills nav-stacked">
                                                <li role="presentation" class="inactive">
                                                    <a href="" class="riskOptionLink">${r.riskTypeName}
                                                    </a>

                                                </li>
                                            </ul>
                                        </div>
                                    </g:elseif>
                                </g:if>
                            </g:each>
                        </div>

                    </div>
                </div>
            </g:each>




            <div class="col-xs-12">

                <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" id="nextButtonStep1">Next</button>
            </div>
        </div>
        <div class="row setup-content" id="step-2">
            <div class="col-xs-12">
                <div class="col-md-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title" style="font-size: 20px;">Coverage Dates</h3>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-3">
                                    <div class="form-group"> <!-- Date input -->
                                        <label class="control-label">Proposed Effective Date</label>
                                        <input class="form-control" type="text" placeholder = "Hidden Text Field To Adjust Focus off Date" name="hiddenField" style="display: none;"/>
                                        <input class="form-control datepicker" id="proposedEffectiveDate" name="proposedEffectiveDate" placeholder="MM/DD/YYY" type="text" required/>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="form-group"> <!-- Date input -->
                                        <label class="control-label">Proposed Expiration Date</label>
                                        <input class="form-control datepicker" id="proposedExpirationDate" name="proposedExpirationDate" placeholder="MM/DD/YYY" type="text" required/>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="form-group"> <!-- Date input -->
                                        <label class="control-label">Proposed Term Length</label>
                                        <input class="form-control" id="proposedTermLength" name="proposedTermLength" type="text" style="color: black; background: white;"/>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="form-group" id="totalBudgetConfirmGroup"> <!-- Date input -->
                                        <label class="control-label">Total Budget</label>
                                        <input class="form-control" id="totalBudgetConfirm" name="totalBudgetConfirm" type="text" required="required">
                                    </div>
                                    <div class="form-group" id="premiumExpectedInputGroup" style="display:none">
                                        <label class="control-label">Target Premium</label>
                                        <input class="form-control" id="premiumExpectedInput" name="premiumExpectedInput" type="text" required="" >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" style="color:rgba(31, 31, 31, 0.35)">
                    <div class="panel panel-default" id="coverageOptionsReview" style="">
                        <div class="panel-heading">
                            <h3 class="panel-title" style="font-size: 20px; color:rgba(31, 31, 31, 0.35)" id="coverageOptionsTitle">Commercial General Liability</h3>
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
                                    <h5>Premium Distribution</h5>
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
                                    <label class="control-label">Broker Fee</label>
                                    <input class="form-control" id="brokerFeeInput"type="text" placeholder = "$" name="brokerFee" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-xs-12">
                    <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                    <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" id="nextButtonStep2">Next</button>
                </div>
            </div>

        </div>
        <div class="row setup-content" id="step-3">
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
                        <h3 class="panel-title" style="font-size: 20px;">Insured Information</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-6">

                                <div class="form-group has-feedback col-xs-12">
                                    <label for="namedInsured">Name of Insured <span style="color:red;">*</span></label>
                                    %{--<g:textField type="text" style="text-transform: capitalize;" class="form-control" id="namedInsured" name="namedInsured" placeholder="Name" required="required"/>--}%
                                    <g:textField type="text" style="text-transform: capitalize;" class="form-control" id="namedInsured" name="namedInsured"
                                                 placeholder="Name" title="" required="required" />
                                    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" style="top: 29px; right: 15px; display: none" ></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" style="top: 29px; right: 15px; display: none" ></span>
                                    <span class="glyphicon glyphicon-list-alt form-control-feedback" aria-hidden="true" style="top: 29px; right: 15px; color: #5bc0de; display: none" ></span>
                                </div>
                                <div class="form-group col-xs-12">
                                    <label for="phoneNumber">Phone Number <span style="color:red;">*</span></label>
                                    <g:textField type="text" class="form-control phoneNumberMask" name="phoneNumber" placeholder="(123) 456-7890" required="required" />
                                </div>
                                <div class="form-group col-xs-12">
                                    <label for="email">Email address <span style="color:red;">*</span></label>
                                    <g:textField type="email" class="form-control" name="namedInsuredEmail" placeholder="user@company.com" required="required" />
                                </div>
                                <div class="form-group col-xs-12">
                                    <label for="company">Website</label>
                                    <g:textField type="text" class="form-control" name="website" placeholder="www.xyz.com" />
                                </div>

                                <br><br>

                            </div>
                            <div class="col-xs-6">

                                <div class = "form-group col-xs-12">
                                    <label class="control-label">Mailing Address <span style="color:red;">*</span> </label>
                                    <input class="form-control " type="text" placeholder="Street address" name="streetNameMailing" id="googleAutoAddress" onFocus="geolocate()" required="required" />
                                </div>
                                <div class="form-group col-xs-12">
                                    <input class="form-control" type="text" placeholder = "City" name="cityMailing" id="cityMailing" required="required" />
                                </div>
                                <div class="form-group col-xs-6">
                                    <input class="form-control" type="text" placeholder = "Zip Code" name="zipCodeMailing" id="zipCodeMailing" required="required" />
                                </div>
                                <div class="form-group col-xs-6">
                                    %{--<input class="form-control" type="text" placeholder = "State" name="stateMailing" id="stateMailing"/>--}%
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
                            <div class="col-xs-1"></div>
                        </div>
                        <div class="row" id="insuredInfoInsert" style="margin-top:40px;">
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label for="nameOfProduction">Name Of Production Company</label>
                                    <g:textField type="text" style="text-transform: capitalize;" class="form-control showReview" data-reviewName="Name Of Production Company" name="nameOfProductionCompany" placeholder="Company Name"/>
                                </div>
                                <div class="form-group">
                                    <label for="titleOfProduction">Title of Production</label>
                                    <g:textField type="text" class="form-control showReview" name="titleOfProduction" data-reviewName="Title of Production" placeholder="Title of Production"/>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>

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
                                    <input class="form-control showReview" type="text" data-reviewName="Physical Zipcode" placeholder = "Zip Code" name="zipCode" />
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
                                <select class="form-control showReview" data-reviewName="Business Structure" name="businessStructure" id="businessStructureSelect">
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
                                <input class="form-control showReview" type="text" data-reviewName="FEIN/SSN" placeholder = "FEIN/SSN" name="FEINSSN" id="FEINSSN"/>
                            </div>
                            <div class="form-group col-xs-3">
                                <label class="control-label">SIC</label>
                                <input class="form-control showReview" type="text" data-reviewName="SIC" placeholder = "SIC" name="SIC" id="SIC"/>
                            </div>
                            <div class="form-group col-xs-3">
                                <label class="control-label">NCCI</label>
                                <input class="form-control showReview" type="text" data-reviewName="NCCI" placeholder = "NCCI" name="NCCI" id="NCCI"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-md-12" id="step2test">

            </div>

            <div class="row">
                <div class="col-xs-12">
                    <button class="btn btn-primary nextBtn btn-lg pull-right" id="nextButtonStep3" type="button" value="Upload" >Next</button>

                </div>
            </div>
        </div>


        <div class="row setup-content" id="step-4">
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
                            <div class="row">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel">Total Budget</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewTotalBudget">Blank</span>

                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Photography Dates</label><br>
                                </div>
                                <div class="col-xs-8">
                                    <span class="reviewSpan" id="reviewPrincipalPhotographyDates">Blank</span>

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
                            <div class="row">
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
                            <br>
                            <div class="row">
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

                            <br>
                            <div class="row">
                                <div class="col-xs-3 text-left">
                                    <label class="reviewLabel ">Terms</label><br>
                                </div>
                                <div class="col-xs-9">
                                    <div class="reviewSpan" id="reviewTerms" style="font-size: 12px; white-space: pre-line">Blank</div>
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
                    <button class="btn btn-success nextBtn btn-lg pull-right" type="button" id="nextButtonStep4"  >Submit</button>
                </div>
            </div>

        </div>
        </form>
    </g:form>
    </div>





    <div class="modal fade" tabindex="-1" role="dialog" id="checkNamedInsuredModal">
        <div class="modal-dialog" role="document" style="width: 820px;">
            <div class="modal-content">
                <div class="modal-header">
                    %{--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}%
                    <h4 class="modal-title">Resolve Named Insured Conflict</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <form class="form-horizontal col-xs-12">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Named Insured</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="resolveNamedInsured" placeholder="" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Mailing Address
                                %{--<span style="color:red;">*</span> --}%
                                </label>
                                <div class="col-sm-10">
                                    <input class="form-control col-xs-12" type="text" placeholder="Street address" name="" id="resolveStreet" onFocus="geolocate()"
                                           style="margin-bottom: 6px;margin-top: 10px;" readonly/>
                                    <input class="form-control col-xs-12" type="text" placeholder = "City" name="" id="resolveCity" style="margin-bottom: 6px;" required="required" readonly/>
                                    <div class="col-xs-6" style="padding-left:0px;">
                                        <input class="form-control" type="text" placeholder = "Zip Code" name="" id="resolveZip" style="margin-bottom: 6px;" required="required" readonly/>
                                    </div>
                                    <div class="col-xs-6" style="padding-left:0px; padding-right:0px;">
                                        <select class="form-control" name=""   id="resolveState" style="margin-bottom: 6px;" required="required" readonly>
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
                        </form>
                        <div id="conflictExistsDiv" >
                            <div class="col-xs-2">

                            </div>
                            <div class="col-xs-10">
                                <mark class="control-label">Your submission seems to match another recently submitted.</mark>
                            </div>
                            <div class="col-xs-2">

                            </div>
                            <div class="col-xs-10" style=" margin-top: 16px;">
                                <label class="col-xs-8 control-label" style="margin-bottom: 0px;">Named Insured</label>
                                <label class="col-xs-4 control-label" style="margin-bottom: 0px;">Status</label>
                            </div>
                            <div class="col-xs-2">

                            </div>
                            <div class="col-xs-10" id="matchingSubmissionsContainer" style="margin-bottom:32px;">
                                <span class="col-xs-8" style="color:red">Sample Named Insured LLC</span>
                                <span class="col-xs-4" style="color:red">Broker of Record Needed</span>
                            </div>
                            <div class="col-xs-2">

                            </div>
                            <div class="col-xs-10">
                                %{--<small class="control-label">This conflict will have to be investigated and cleared. If you select to continue, your submission will be created but placed on hold until the conflict is resolved.</small>--}%
                                <small class="control-label">To continue please resolve conflict. If conflict cannot be resolved, you may choose to request a Broker of Record document confirming representation</small>

                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-info" id="resolveConflictBOR" type="button"  >Request BOR</button>
                    <button class="btn btn-primary" id="resolveConflictContinue" type="button" style="display:none" >Continue</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
            </body>
        </html>