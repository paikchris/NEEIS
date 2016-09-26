%{--<%@ page import="portal.Coverage" %>--}%
<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="layout" content="main">
        <link rel="stylesheet" href="${resource(dir: 'css', file: 'newSubmission.css')}" type="text/css">
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
            <div class="container">
                <h1>New Policy</h1>
                <br>
                <br>
                <div class="stepwizard">
                    <div class="stepwizard-row setup-panel">
                        <div class="stepwizard-step">
                            <a href="#step-1" type="button" class="btn btn-primary btn-circle">1</a>
                            <p>Step 1</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-2" type="button" class="btn btn-default btn-circle" disabled="disabled">2</a>
                            <p>Step 2</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-3" type="button" class="btn btn-default btn-circle" disabled="disabled">3</a>
                            <p>Step 3</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-4" type="button" class="btn btn-default btn-circle" disabled="disabled">4</a>
                            <p>Step 4</p>
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

                        <div class="row">
                            <div class="col-xs-12">
                                <div class="card card-unselected media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img class="media-object media-object media-img" src="http://naabb.biz/ownerheaders/brokersites/broker2.jpg" alt="..." width="250px" height="150px">
                                        </a>
                                    </div>
                                    <div class="media-body card-content2">
                                        <h4 class="media-heading">Ancillary Entertainment Risk</h4>
                                        Ancillary rights are supplementary or subordinate rights arising from a primary right.
                                        This right exists depending upon or reasonably linked to a main right or claim.

                                        Ancillary rights, in relation to entertainment law are contractual agreements in
                                        which a percentage of the profits are received and derived from the sale of action figures, posters, books, etc. relating to a film or motion picture.
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 drawerContainer" style="">
                                <div class="drawer" style="">
                                    <div class="col-xs-12">
                                        <h4>Please select one:</h4>
                                    </div>

                                <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <g:each status="i" var="r" in="${ancillaryRiskTypes}">
                                        <g:if test="${i%(Math.round(ancillaryRiskTypes.size()/3)) ==0 && i > 0}">
                                            </ul>
                                        </div>
                                            <div class="col-xs-4">
                                        <ul class="nav nav-pills nav-stacked">
                                        </g:if>
                                        <li role="presentation" class="inactive"><a href="" class="riskOptionLink">${r.riskTypeName}</a></li>
                                    </g:each>
                                </ul>
                                </div>

                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="card card-unselected media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img class="media-object media-object media-img" src="https://www.caesars.com/content/cet-global/caesars-com/horseshoe-hammond/_jcr_content/root_content/cetcarousel/cet-slide-3/image.stdimg.uwide.xl.cover.jpg/1378929859901.jpg" alt="..." width="250px" height="150px">
                                        </a>
                                    </div>
                                    <div class="media-body card-content2">
                                        <h4 class="media-heading">Venue</h4>
                                        The following is placeholder text known as “lorem ipsum,” which is scrambled Latin used by designers to mimic real copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aliquam bibendum, turpis eu mattis iaculis, ex lorem mollis sem, ut sollicitudin risus orci quis tellus. Integer tempus, elit in laoreet posuere,
                                        lectus neque blandit dui, et placerat urna diam mattis orci.
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 drawerContainer" style="">
                                <div class="drawer" style="">
                                    <div class="col-xs-12">
                                        <h4>Please select one:</h4>
                                    </div>

                                <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <g:each status="i" var="r" in="${venueRiskTypes}">
                                        <g:if test="${i%(Math.round(venueRiskTypes.size()/3)) ==0 && i > 0}">
                                            </ul>
                                        </div>
                                            <div class="col-xs-4">
                                        <ul class="nav nav-pills nav-stacked">
                                        </g:if>
                                        <li role="presentation" class="inactive"><a href="" class="riskOptionLink">${r.riskTypeName}</a></li>
                                    </g:each>
                                </ul>
                                </div>

                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="card card-unselected media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img class="media-object media-img" src="https://www.editingcorp.com/wp-content/uploads/commercial-set.jpg" alt="..." width="250px" height="150px">
                                        </a>
                                    </div>
                                    <div class="media-body card-content2">
                                        <h4 class="media-heading">Film Producer</h4>
                                        At NEEIS, film and video production underwriting is a core competency. Over the years our staff has insured thousands of
                                        feature films, television productions, commercial shoots, documentaries, corporate videos and numerous other forms of video and
                                        film productions. We have the capacity to insure major feature Films with gross production costs of up $25,000,000.
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 drawerContainer" style="">
                                <div class="drawer" style="">
                                    <div class="col-xs-12">
                                        <h4>Please select one:</h4>
                                    </div>

                                <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <g:each status="i" var="r" in="${filmRiskTypes}">
                                        <g:if test="${i%(Math.round(filmRiskTypes.size()/3)) ==0 && i > 0}">
                                            </ul>
                                        </div>
                                            <div class="col-xs-4">
                                        <ul class="nav nav-pills nav-stacked">
                                        </g:if>
                                        <li role="presentation" class="inactive"><a href="" class="riskOptionLink">${r.riskTypeName}</a></li>
                                    </g:each>
                                </ul>
                                </div>

                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="card card-unselected media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img class="media-object media-object media-img" src="https://static1.squarespace.com/static/57b0d9b7ff7c50648d9e242f/t/57b19796f7e0ab6f35b421fe/1471256486892/?format=750w" alt="..." width="250px" height="150px">
                                        </a>
                                    </div>
                                    <div class="media-body card-content2">
                                        <h4 class="media-heading">Entertainer</h4>
                                        The entertainer who performs or is otherwise in the public limelight often presents unique coverage challenges.
                                        NEEIS can find you the exact right coverage if you need to cover individuals who form corporations to conduct their
                                        business as actors and actresses, artists, producers, directors, musicians, authors, athletes or any other person who
                                        is in the public limelight or is prominent and visible in the public eye
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 drawerContainer" style="">
                                <div class="drawer" style="">
                                    <div class="col-xs-12">
                                        <h4>Please select one:</h4>
                                    </div>

                                <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <g:each status="i" var="r" in="${entertainerRiskTypes}">
                                        <g:if test="${i%(Math.round(entertainerRiskTypes.size()/3)) ==0 && i > 0}">
                                            </ul>
                                        </div>
                                            <div class="col-xs-4">
                                        <ul class="nav nav-pills nav-stacked">
                                        </g:if>
                                        <li role="presentation" class="inactive"><a href="" class="riskOptionLink">${r.riskTypeName}</a></li>
                                    </g:each>
                                </ul>
                                </div>

                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="card card-unselected media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img class="media-object media-object media-img" src="http://included.co/wp-content/uploads/formidable/Business_people_in_office-1.jpg" alt="..." width="250px" height="150px">
                                        </a>
                                    </div>
                                    <div class="media-body card-content2">
                                        <h4 class="media-heading">Office</h4>
                                        The following is placeholder text known as “lorem ipsum,” which is scrambled Latin used by designers to mimic real copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aliquam bibendum, turpis eu mattis iaculis, ex lorem mollis sem, ut sollicitudin risus orci quis tellus. Integer tempus, elit in laoreet posuere,
                                        lectus neque blandit dui, et placerat urna diam mattis orci.
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 drawerContainer" style="">
                                <div class="drawer" style="">
                                    <div class="col-xs-12">
                                        <h4>Please select one:</h4>
                                    </div>

                                <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <g:each status="i" var="r" in="${officeRiskTypes}">
                                        <g:if test="${i%(Math.round(officeRiskTypes.size()/3)) ==0 && i > 0}">
                                            </ul>
                                        </div>
                                            <div class="col-xs-4">
                                        <ul class="nav nav-pills nav-stacked">
                                        </g:if>
                                        <li role="presentation" class="inactive"><a href="" class="riskOptionLink">${r.riskTypeName}</a></li>
                                    </g:each>
                                </ul>
                                </div>

                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="card card-unselected media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img class="media-object media-object media-img" src="https://static1.squarespace.com/static/57b0d9b7ff7c50648d9e242f/t/57b193bef5e231afcea04da0/1471255493109/?format=750w" alt="..." width="250px" height="150px">
                                        </a>
                                    </div>
                                    <div class="media-body card-content2">
                                        <h4 class="media-heading">Special Event</h4>
                                        New Empire offers a broad expertise in special event and venue coverages. Contact us if you need to obtain insurance for a special event, (awards presentations, charity benefits, festivals, job fairs, corporate events, live entertainment, rallies, sporting events, weddings, movie screenings, etc.)
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 drawerContainer" style="">
                                <div class="drawer" style="">
                                    <div class="col-xs-12">
                                        <h4>Please select one:</h4>
                                    </div>

                                <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <g:each status="i" var="r" in="${specialeventRiskTypes}">
                                        <g:if test="${i%(Math.round(specialeventRiskTypes.size()/3)) ==0 && i > 0}">
                                            </ul>
                                        </div>
                                            <div class="col-xs-4">
                                        <ul class="nav nav-pills nav-stacked">
                                        </g:if>
                                        <li role="presentation" class="inactive"><a href="" class="riskOptionLink">${r.riskTypeName}</a></li>
                                    </g:each>
                                </ul>
                                </div>

                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="card card-unselected media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img class="media-object media-object media-img" src="http://go2balkans.com/web2/wp-content/uploads/o-BUSINESS-MEETING-facebook1.jpg" alt="..." width="250px" height="150px">
                                        </a>
                                    </div>
                                    <div class="media-body card-content2">
                                        <h4 class="media-heading">Shell Corporation</h4>
                                        The following is placeholder text known as “lorem ipsum,” which is scrambled Latin used by designers to mimic real copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aliquam bibendum, turpis eu mattis iaculis, ex lorem mollis sem, ut sollicitudin risus orci quis tellus. Integer tempus, elit in laoreet posuere,
                                        lectus neque blandit dui, et placerat urna diam mattis orci.
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 drawerContainer" style="">
                                <div class="drawer" style="">
                                    <div class="col-xs-12">
                                        <h4>Please select one:</h4>
                                    </div>

                                <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <g:each status="i" var="r" in="${shellcorpRiskTypes}">
                                        <g:if test="${i%(Math.round(shellcorpRiskTypes.size()/3)) ==0 && i > 0}">
                                            </ul>
                                        </div>
                                            <div class="col-xs-4">
                                        <ul class="nav nav-pills nav-stacked">
                                        </g:if>
                                        <li role="presentation" class="inactive"><a href="" class="riskOptionLink">${r.riskTypeName}</a></li>
                                    </g:each>
                                </ul>
                                </div>

                                </div>

                            </div>
                        </div>



                        %{--<div class="row">--}%

                            %{--<div class="col-xs-4"></div>--}%
                            %{--<div class="col-xs-4">--}%
                                %{--<br><br>--}%
                                %{--<div class="form-group ">--}%
                                    %{--<label class="control-label" style="text-align: center">Risk Type Category</label>--}%
                                    %{--<h4 style="text-align: center;">Risk Type Category</h4>--}%
                                    %{--<p>--}%
                                        %{--<select class="form-control newEmpireFormInput" name="riskCategory" id="riskCategorySelect">--}%
                                            %{--<option value="invalid" selected="selected">Please Select Risk Category</option>--}%
                                            %{--<g:each status="i" var="r" in="${riskCategories}">--}%

                                                %{--<option value="${r}">${r}</option>--}%


                                            %{--</g:each>--}%
                                        %{--</select>--}%
                                    %{--</p>--}%
                                %{--</div>--}%

                                %{--<div class="form-group" id="riskTypeGroup" style="display: none;">--}%
                                    %{--<label class="control-label">Risk Type</label>--}%
                                    %{--<h4 style="text-align: center;">Sub Risk Type</h4>--}%
                                    %{--<p>--}%
                                        %{--<select class="form-control" id="riskTypeSelect" name="subRiskType" style="display: none;">--}%
                                            %{--<option value="invalid" selected="selected">Please Select Risk Type</option>--}%
                                        %{--</select>--}%
                                    %{--</p>--}%
                                %{--</div>--}%
                                %{--<br>--}%
                            %{--</div>--}%
                            %{--<div class="col-xs-4"></div>--}%
                        %{--</div>--}%







                        <div class="col-xs-12">
                            <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                            <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" id="nextButtonStep1">Next</button>
                        </div>
                    </div>
                    <div class="row setup-content" id="step-2">
                        <div class="row">
                            <div class="col-xs-12">
                                %{--<h3>Insured Information</h3>--}%
                            </div>

                        </div>
                        <br>
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title" style="font-size: 20px;">Insured Information</h3>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-xs-6">

                                        <div class="form-group">
                                            <label for="namedInsured">Name of Insured <span style="color:red;">*</span></label>
                                            <g:textField type="text" style="text-transform: capitalize;" class="form-control" id="namedInsured" name="namedInsured" placeholder="Name"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="phoneNumber">Phone Number <span style="color:red;">*</span></label>
                                            <g:textField type="text" class="form-control" name="phoneNumber" placeholder="(123) 456-7890"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Email address <span style="color:red;">*</span></label>
                                            <g:textField type="email" class="form-control" name="email" placeholder="user@company.com"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="company">Website</label>
                                            <g:textField type="text" class="form-control" name="website" placeholder="www.xyz.com"/>
                                        </div>

                                        <br><br>

                                    </div>
                                    <div class="col-xs-6">

                                        <div class = "form-group col-xs-12">
                                            <label class="control-label">Mailing Address <span style="color:red;">*</span> </label>
                                            <input class="form-control " type="text" placeholder="Street address" name="streetNameMailing" id="googleAutoAddress" onFocus="geolocate()"/>
                                        </div>
                                        <div class="form-group col-xs-12">
                                            <input class="form-control" type="text" placeholder = "City" name="cityMailing" id="cityMailing"/>
                                        </div>
                                        <div class="form-group col-xs-6">
                                            <input class="form-control" type="text" placeholder = "Zip Code" name="zipCodeMailing" id="zipCodeMailing"/>
                                        </div>
                                        <div class="form-group col-xs-6">
                                            <input class="form-control" type="text" placeholder = "State" name="stateMailing" id="stateMailing"/>
                                        </div>


                                    </div>
                                    <div class="col-xs-1"></div>
                                </div>
                                <div class="row" id="insuredInfoInsert">
                                    <div class="col-xs-6">
                                        <div class="form-group">
                                            <label for="nameOfProduction">Name Of Production Company</label>
                                            <g:textField type="text" class="form-control" name="nameOfProductionCompany" placeholder="Company Name"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="titleOfProduction">Title of Production</label>
                                            <g:textField type="text" class="form-control" name="titleOfProduction" placeholder="Title of Production"/>
                                        </div>
                                    </div>


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
                                            <input class="form-control" type="text" placeholder = "Street address" name="streetName" />
                                        </div>
                                        <div class="form-group col-xs-4">
                                            <label class="control-label">City</label>
                                            <input class="form-control" type="text" placeholder = "City" name="city" />
                                        </div>
                                        <div class="form-group col-xs-2">
                                            <label class="control-label">State</label>
                                            <input class="form-control" type="text" placeholder = "State" name="state" />
                                        </div>
                                        <div class="form-group col-xs-2">
                                            <label class="control-label">Zipcode</label>
                                            <input class="form-control" type="text" placeholder = "Zip Code" name="zipCode" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class = "form-group col-xs-2">
                                            <label class="control-label"># of Buildings</label>
                                            <input class="form-control" type="text" placeholder = "# of Buildings" name="numBuildings" />
                                        </div>
                                        <div class="form-group col-xs-2">
                                            <label class="control-label">Habitational Units</label>
                                            <input class="form-control" type="text" placeholder = "Habitational units" name="habitationalUnits" />
                                        </div>
                                        <div class="form-group col-xs-2">
                                            <label class="control-label">Comm Sq Ft</label>
                                            <input class="form-control" type="text" placeholder = "Comm Sq Ft" name="commSqFt" />
                                        </div>
                                        <div class="form-group col-xs-2">
                                            <label class="control-label">Interest</label>
                                            <input class="form-control" type="text" placeholder = "Interest" name="Interest" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4">
                                            <button class="btn btn-primary btn-sm addLocation"  type="button" >Add Another</button>
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
                                <h3 class="panel-title" style="font-size: 20px;">Risk Specific Information</h3>
                            </div>
                            <div class="panel-body" id="riskSpecificInsert">
                                <div class="row">
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
                                        <select class="form-control" name="businessStructure" id="businessStructureSelect">
                                            <option value="invalid" selected="selected">Please Select Business Structure</option>
                                            <option value="corporation" selected="selected">Corporation</option>
                                            <option value="individual" selected="selected">Individual</option>
                                            <option value="LLC" selected="selected">Limited Liability Corporation</option>
                                            <option value="LLP" selected="selected">Limited Liability Partnership</option>
                                            <option value="partnership" selected="selected">Partnership</option>
                                            <option value="soleProprietership" selected="selected">Sole Proprietership</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-xs-3">
                                        <label class="control-label">FEIN/SSN</label>
                                        <input class="form-control" type="text" placeholder = "FEIN/SSN" name="FEINSSN" />
                                    </div>
                                    <div class="form-group col-xs-3">
                                        <label class="control-label">SIC</label>
                                        <input class="form-control" type="text" placeholder = "SIC" name="SIC" />
                                    </div>
                                    <div class="form-group col-xs-3">
                                        <label class="control-label">NCCI</label>
                                        <input class="form-control" type="text" placeholder = "NCCI" name="NCCI" />
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="col-md-12" id="step2test">

                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <button class="btn btn-primary nextBtn btn-lg pull-right" id="nextButtonStep2" type="button" >Next</button>

                            </div>
                        </div>
                    </div>

                    <div class="row setup-content" id="step-3">
                        <div class="col-xs-12">
                            <div class="col-md-12">
                                <div class="panel panel-primary">
                                    <div class="panel-heading">
                                        <h3 class="panel-title" style="font-size: 20px;">Coverage Options</h3>
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <label class="control-label">Please select the Coverages being requested:</label>
                                            </div>
                                        </div>
                                        <br>
                                        <div id="coverageCheckboxesDiv">
                                        <div class="row" >
                                            <div class="form-group col-xs-4">
                                                <p><input type="checkbox" name="EPKGcoverage" id="EPKGcoverage" /> Entertainment Package</p>
                                            </div>
                                            <div class="form-group col-xs-4">
                                                <select class="form-control" id="EPKGproductsSelect" name="EPKGproductsSelect1" style="">
                                                    <option value="invalid" selected="selected">Please Select A EPKG Product</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="form-group col-xs-4">
                                                <p><input type="checkbox" name="CGLcoverage" id="CGLcoverage" /> Commercial General Liability</p>
                                            </div>
                                            <div class="form-group col-xs-4">
                                                <select class="form-control" id="CGLproductsSelect1" name="CGLproductsSelect1" style="">
                                                    <option value="invalid" selected="selected">Please Select A CGL Product</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="form-group col-xs-4">
                                                <p><input type="checkbox" name="NOHAcoverage" id="NOHAcoverage" /> Non Owned Hired Auto Liability</p>
                                            </div>
                                            <div class="form-group col-xs-4">
                                                <select class="form-control" id="NOHAproductsSelect" name="NOHAproductsSelect1" style="">
                                                    <option value="invalid" selected="selected">Please Select A NOHA Product</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-xs-4">
                                                <p><input type="checkbox" name="EOcoverage" id="EOcoverage" /> Errors and Omissions - Film Producer</p>
                                            </div>
                                            <div class="form-group col-xs-4">
                                                <select class="form-control" id="EOproductsSelect" name="EOproductsSelect1" style="">
                                                    <option value="invalid" selected="selected">Please Select A EO Product</option>
                                                </select>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-xs-4">
                                                <label class="control-label">Coverage</label>
                                                <select class="form-control" id="coverageSelect" name="coverageSelect" style="">
                                                    <option value="invalid" selected="selected">Please Select Coverage</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-xs-4" style="display: ;">
                                                <label class="control-label" >Available Products</label>
                                                <select class="form-control" id="productsSelect" name="productsSelect" style="">
                                                    <option value="invalid" selected="selected">Please Select A Product</option>
                                                </select>
                                            </div>

                                            %{--<div class="form-group col-xs-4" style="display: none;">--}%
                                                %{--<label class="control-label">Market Company</label>--}%
                                                %{--<select class="form-control" id="marketCompanySelect" name="marketCompanySelect" style="">--}%
                                                    %{--<option value="invalid" selected="selected">Please Select Market Company</option>--}%
                                                %{--</select>--}%
                                            %{--</div>--}%
                                            %{--<div class="form-group col-xs-4" style="display: none;">--}%
                                                %{--<label class="control-label" >Risk Company</label>--}%
                                                %{--<select class="form-control" id="riskCompanySelect" name="riskCompanySelect" style="">--}%
                                                    %{--<option value="invalid" selected="selected">Please Select Risk Company</option>--}%
                                                %{--</select>--}%
                                            %{--</div>--}%

                                        </div>
                                        <div class="row" style="display: ;">
                                            <div class = "form-group col-xs-6">
                                                    <h5>Limits</h5>
                                                <div class="row">
                                                    <div class="col-xs-4">
                                                        <u>Amount</u>
                                                    </div>
                                                    <div class="col-xs-8">
                                                        <u>Coverage</u>
                                                    </div>
                                                </div>
                                                <div id="limitsInsert">
                                                    <div class="row">
                                                        <div class="col-xs-4">
                                                            <span>-</span>
                                                        </div>
                                                        <div class="col-xs-8">
                                                            <span>-</span>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                            <div class = "form-group col-xs-6">
                                                <h5>Deductibles</h5>
                                                <div class="row">
                                                    <div class="col-xs-4">
                                                        <u>Deductible</u>
                                                    </div>
                                                    <div class="col-xs-8">
                                                        <u>Applies to/Limit</u>
                                                    </div>
                                                </div>
                                                <div id="deductsInsert">
                                                    <div class="row">
                                                        <div class="col-xs-4">
                                                            <span>-</span>
                                                        </div>
                                                        <div class="col-xs-8">
                                                            <span>-</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <h5>Premium Distribution</h5>
                                                    <div class="row">
                                                        <div class="col-xs-3">
                                                            <u>Line Of Business</u>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <u>Premium</u>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <u>Gross %</u>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <u>Agent %</u>
                                                        </div>
                                                    </div>
                                                <div id="premDistributionInsert">
                                                    <div class="row">
                                                        <div class="col-xs-3">
                                                            <span class="lineOfBusinessSpan">-</span>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <span class="premiumSpan">-</span>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <span class="grossPercentSpan">-</span>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <span class="agentPercentSpan">-</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <span id="premiumInsert"></span>
                                            </div>
                                        </div>
                                        <div class="row">

                                            <div class="col-xs-12">
                                                <h5>Terms</h5>
                                                <span id="termsInsert" style="font-size: 10px;"></span>
                                            </div>

                                        </div>
                                        <div class="row">

                                            <div class="col-xs-12">
                                                <h5>Endorse</h5>
                                                <span id="endorseInsert" style="font-size: 10px;"></span>
                                            </div>

                                        </div>

                                        </div>
                                    </div>
                                </div>
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
                                                    <input class="form-control datepicker" id="proposedEffectiveDate" name="date" placeholder="MM/DD/YYY" type="text"/>
                                                </div>
                                            </div>
                                            <div class="col-xs-3">
                                                <div class="form-group"> <!-- Date input -->
                                                    <label class="control-label">Proposed Expiration Date</label>
                                                    <input class="form-control datepicker" id="proposedExpirationDate" name="date" placeholder="MM/DD/YYY" type="text"/>
                                                </div>
                                            </div>
                                            <div class="col-xs-3">
                                                <div class="form-group"> <!-- Date input -->
                                                    <label class="control-label">Proposed Term Length</label>
                                                    <div id="proposedTermLength"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row setup-content" id="step-4">
                        <div class="col-xs-12">
                            <div class="col-md-12">
                                <h3> Step 4</h3>
                                <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                                <button class="btn btn-success btn-lg pull-right" type="submit">Finish!</button>
                            </div>
                        </div>
                    </div>
                </form>
                </g:form>
                    </div>




    <script src="${resource(dir: 'js', file: 'newSubmission.js')}"></script>
            </body>
        </html>