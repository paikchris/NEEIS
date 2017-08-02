<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'newSubmission.css')}" type="text/css">

    <script>
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
    <script src="${resource(dir: 'js', file: "/utils/stringUtils.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: "/utils/fileHelper.js?ts=" + new Date().getTime())}" async></script>
    <script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}" async></script>
    <script src="${resource(dir: 'js', file: "newSubmission.js?ts=" + new Date().getTime())}" async></script>



    <g:if test="${user.admin == "true"}">
        <script src="${resource(dir: 'js/utils/', file: 'randomGenerator.js')}" ></script>
        <script src="${resource(dir: 'js', file: 'jquery.autotype.js')}" ></script>
    %{--<script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/jasmine.js')}"></script>--}%
    %{--<script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/jasmine-html.js')}"></script>--}%
    %{--<script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/boot.js')}"></script>--}%
    %{--<script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/jasmine-jquery.js')}"></script>--}%
    </g:if>






</head>
<body onLoad="loadJS()">
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
<form id="intelledox" role="form">
</form>
<div class="container">
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

    <div class="row">
        <div class="col-xs-1" style="margin-top:80px">
            <g:if test="${user.admin == "true"}">
                <button class="btn btn-xs btn-success" id="testHelper" type="button"
                        style="background-color: rgb(105, 210, 255); border-color: rgb(105, 210, 255); margin: 2px;"
                        onclick="autoFillAll()">
                    <i class="fa fa-cogs" aria-hidden="true"></i>
                    <span class="" style="font-size: 14px; font-weight: 500"> Test Helper</span>
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

    <div class="row" style="text-align: center;">
        <span class="label label-bor" id="BORRequestNotification" style="display:none; ">BOR Requested</span>
        <span class="label label-success" id="renewalNotification" style="display:none; ">Renewal</span>
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
                <div class="row">
                    <div class="col-xs-12">
                        <div class="card card-unselected media">
                            <div class="media-left">
                                <a href="#">
                                    <img class="media-object media-img" src="${resource(dir: 'images', file: 'film.jpg')}" alt="..." width="250px" height="150px">
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

                        <div class="col-xs-6">
                        <ul class="nav nav-pills nav-stacked">
                            <g:each status="i" var="r" in="${filmRiskTypes}">
                                <g:if test="${i%(Math.round(filmRiskTypes.size()/3)) ==0 && i > 0}">
                                    </ul>
                                </div>
                                    <div class="col-xs-6">
                                <ul class="nav nav-pills nav-stacked">
                                </g:if>
                                <li role="presentation" class="inactive">
                                    <a href="" class="riskOptionLink" data-riskTypeID="${r.id}" data-riskTypeCode="${r.riskTypeCode}"
                                       style="font-weight: 400; padding-bottom:0px;">${r.riskTypeName}</a>
                                </li>
                                <g:if test="${r.riskTypeName == "Film Projects Without Cast (No Work Comp)"}">
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px; color:red; font-weight:400">* Work Comp Not Available Online</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px; ">- Blanket DICE Producer</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Commercial Shoots</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Corporate or Training Videos</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Documentaries</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Short / Low Budget Film Projects</div>

                                </g:if>
                                <g:elseif test="${r.riskTypeName == "Film Projects Without Cast (With Work Comp)"}">
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px; color:red; font-weight:400">* You will be redirected to the original www.neeis.com</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px; ">- Blanket DICE Producer</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Commercial Shoots</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Corporate or Training Videos</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Documentaries</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Short / Low Budget Film Projects</div>

                                </g:elseif>
                                <g:elseif test="${r.riskTypeName == "Film Projects With Cast (No Work Comp)"}">
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px; color:red; font-weight:400">* Work Comp Not Available Online</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px; ">- Feature Films</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- TV Pilots</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- TV Series</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Specific Film Projects</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- One Shot DICE</div>
                                </g:elseif>

                                <g:elseif test="${r.riskTypeName == "Film Projects With Cast (With Work Comp)"}">
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px; color:red; font-weight:400">* You will be redirected to the original www.neeis.com</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px; ">- Feature Films</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- TV Pilots</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- TV Series</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- Specific Film Projects</div>
                                    <div style="padding-left: 34px; font-size:10px; margin-top:-4px;">- One Shot DICE</div>
                                </g:elseif>
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
                                    <img class="media-object media-object media-img" src="${resource(dir: 'images', file: 'specialEvents.jpg')}" alt="..." width="250px" height="150px">
                                </a>
                            </div>
                            <div class="media-body card-content2">
                                <h4 class="media-heading">Special Events</h4>
                                Special Event Liability insurance is required on any event taking place at a venue where the general public will be in attendance
                                The venue will contractually require the tenant user to provide general liability insurance at limits no less than $1,000,000.
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 drawerContainer" style="">
                        <div class="questionCategory"style="display: none">specialEvents</div>
                        <div class="drawer" style="">
                            <div class="col-xs-12">
                                <h4>Please select one:</h4>
                            </div>


                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown" id="specialEventSpecialEvent">
                                            <div class="row" style="margin:0px">Special Event</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown' id="specialEventDropdown" style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Amateur Rodeo and Roping Events">Amateur Rodeo and Roping Events</option>
                                                    <option value="Anniversary Parties">Anniversary Parties</option>
                                                    <option value="Antique Shows">Antique Shows</option>
                                                    <option value="Art Festivals and Shows">Art Festivals and Shows</option>
                                                    <option value="Auctions">Auctions</option>
                                                    <option value="Auto Shows-Auto Static Only">Auto Shows-Auto Static Only</option>
                                                    <option value="Award Presentations">Award Presentations</option>
                                                    <option value="Baby Shower">Baby Shower</option>
                                                    <option value="Ballet or Other Classical Dance Shows">Ballet or Other Classical Dance Shows</option>
                                                    <option value="Balloon Artist">Balloon Artist</option>
                                                    <option value="Banquets">Banquets</option>
                                                    <option value="Baptism">Baptism</option>
                                                    <option value="Bar Mitzvahs / Bat Mitzvahs">Bar Mitzvahs / Bat Mitzvahs</option>
                                                    <option value="Bazaars">Bazaars</option>
                                                    <option value="Baseball - Amateur">Baseball - Amateur</option>
                                                    <option value="Basketball - Amateur">Basketball - Amateur</option>
                                                    <option value="Beauty Pageants">Beauty Pageants</option>
                                                    <option value="Belly Dancer">Belly Dancer</option>
                                                    <option value="Birthday Parties">Birthday Parties</option>
                                                    <option value="Bicycling - No Racing / Off-road">Bicycling - No Racing / Off-road</option>
                                                    <option value="Bingo Games">Bingo Games</option>
                                                    <option value="Block Parties / Street Closures / Street Fairs - Under 5000 Spectators">Block Parties / Street Closures / Street Fairs - Under 5,000 Spectators</option>
                                                    <option value="Boat Shows (Dry Dock only)">Boat Shows (Dry Dock only)</option>
                                                    <option value="Body Building Contests">Body Building Contests</option>
                                                    <option value="Book Signing">Book Signing</option>
                                                    <option value="Bowling Tournaments">Bowling Tournaments</option>
                                                    <option value="Boxing, Wrestling, Hockey and Football Games - Amateur">Boxing, Wrestling, Hockey and Football Games - Amateur</option>
                                                    <option value="Bridal Showers">Bridal Showers</option>
                                                    <option value="Business Meetings and Shows">Business Meetings and Shows</option>
                                                    <option value="Business Parties">Business Parties</option>
                                                    <option value="Camera Shows">Camera Shows</option>
                                                    <option value="Card Shows">Card Shows</option>
                                                    <option value="Card Games - Blackjack">Card Games - Blackjack</option>
                                                    <option value="Card Games - Poker">Card Games - Poker</option>
                                                    <option value="Caricature Sketching">Caricature Sketching</option>
                                                    <option value="Carnivals - School Events with No Mechanical Rides">Carnivals - School Events with No Mechanical Rides</option>
                                                    <option value="Carolers">Carolers</option>
                                                    <option value="Cartoonist">Cartoonist</option>
                                                    <option value="Casino and Lounge Shows">Casino and Lounge Shows</option>
                                                    <option value="Casino Nights">Casino Nights</option>
                                                    <option value="Chamber of Commerce Events">Chamber of Commerce Events</option>
                                                    <option value="Charity Benefits, Dances, Auctions, or Sales">Charity Benefits, Dances, Auctions, or Sales</option>
                                                    <option value="Choirs - indoor">Choirs - indoor</option>
                                                    <option value="Cheerleading Events / Competitions (no Pyramids)">Cheerleading Events / Competitions (no Pyramids)</option>
                                                    <option value="Chess Tournament">Chess Tournament</option>
                                                    <option value="Choirs - Outdoor">Choirs - Outdoor</option>
                                                    <option value="Christmas Tree Lighting">Christmas Tree Lighting</option>
                                                    <option value="Church Services or Meetings">Church Services or Meetings</option>
                                                    <option value="Civic Club Meetings">Civic Club Meetings</option>
                                                    <option value="Classic Dance Shows">Classic Dance Shows</option>
                                                    <option value="Computer Shows">Computer Shows</option>
                                                    <option value="Concerts - Celtic Music">Concerts - Celtic Music</option>
                                                    <option value="Concerts - Chamber Music">Concerts - Chamber Music</option>
                                                    <option value="Clowns - No Motorized Vehicles">Clowns - No Motorized Vehicles</option>
                                                    <option value="Concerts - 50's, 60's, 70's or 80's Music">Concerts - 50's, 60's, 70's or 80's Music</option>
                                                    <option value="Concerts - Blues Music">Concerts - Blues Music</option>
                                                    <option value="Concerts - Classical Music - Indoors">Concerts - Classical Music - Indoors</option>
                                                    <option value="Concerts - Holiday Music">Concerts - Holiday Music</option>
                                                    <option value="Concerts - Classical Music - Outdoors">Concerts - Classical Music - Outdoors</option>
                                                    <option value="Concerts - Country Music">Concerts - Country Music</option>
                                                    <option value="Concerts - Folk Music">Concerts - Folk Music</option>
                                                    <option value="Concerts - Funk Music">Concerts - Funk Music</option>
                                                    <option value="Concerts - Motown">Concerts - Motown</option>
                                                    <option value="Concerts Soul Music">Concerts Soul Music</option>
                                                    <option value="Concerts - Instrumental">Concerts - Instrumental</option>
                                                    <option value="Consumer Shows">Consumer Shows</option>
                                                    <option value="Conventions - Indoors">Conventions - Indoors</option>
                                                    <option value="Craft Shows">Craft Shows</option>
                                                    <option value="Comedians">Comedians</option>
                                                    <option value="Comedy Shows">Comedy Shows</option>
                                                    <option value="Company or Corporate Retreats">Company or Corporate Retreats</option>
                                                    <option value="Concerts - Pop Cover Bands">Concerts - Pop Cover Bands</option>
                                                    <option value="Cornfield Mazes">Cornfield Mazes</option>
                                                    <option value="Country & Western Events - No Rodeos or Rides">Country & Western Events - No Rodeos or Rides</option>
                                                    <option value="Country Festivals and Fairs - No Rides">Country Festivals and Fairs - No Rides</option>
                                                    <option value="Dance Competitions">Dance Competitions</option>
                                                    <option value="Dance Recital">Dance Recital</option>
                                                    <option value="Debutant Balls">Debutant Balls</option>
                                                    <option value="Debuts">Debuts</option>
                                                    <option value="Dog, Cat, Bird & Other Domestic Animal Show / Event">Dog, Cat, Bird & Other Domestic Animal Show / Event</option>
                                                    <option value="Drill Team Exhibitions">Drill Team Exhibitions</option>
                                                    <option value="Educational Exhibitions">Educational Exhibitions</option>
                                                    <option value="Electronics Conventions">Electronics Conventions</option>
                                                    <option value="Face Painters">Face Painters</option>
                                                    <option value="Easter Egg Hunt">Easter Egg Hunt</option>
                                                    <option value="Fashion Shows">Fashion Shows</option>
                                                    <option value="Festival and Cultural Events - Indoors">Festival and Cultural Events - Indoors</option>
                                                    <option value="Festival and Cultural Events - Outdoors">Festival and Cultural Events - Outdoors</option>
                                                    <option value="Film Screenings">Film Screenings</option>
                                                    <option value="Film Showings">Film Showings</option>
                                                    <option value="Fishing Events">Fishing Events</option>
                                                    <option value="Flower and Garden Shows">Flower and Garden Shows</option>
                                                    <option value="Fund Raising Dinner">Fund Raising Dinner</option>
                                                    <option value="Funeral Service">Funeral Service</option>
                                                    <option value="Graduations">Graduations</option>
                                                    <option value="Golf Tournament - Daytime">Golf Tournament - Daytime</option>
                                                    <option value="Grad Night">Grad Night</option>
                                                    <option value="Gymnastic Competitions - Spectators Only">Gymnastic Competitions - Spectators Only</option>
                                                    <option value="Halloween - Costume Contests">Halloween - Costume Contests</option>
                                                    <option value="Harvest Festivals - No Farm Implements or Equipment">Harvest Festivals - No Farm Implements or Equipment</option>
                                                    <option value="Holiday Events & Parties / Gift Exchanges">Holiday Events & Parties / Gift Exchanges</option>
                                                    <option value="Home Shows">Home Shows</option>
                                                    <option value="Ice Skating Shows">Ice Skating Shows</option>
                                                    <option value="Junior Athletic Games">Junior Athletic Games</option>
                                                    <option value="Karate Meets">Karate Meets</option>
                                                    <option value="Lacrosse">Lacrosse</option>
                                                    <option value="Impersonator - Celebrity or Holiday Character">Impersonator - Celebrity or Holiday Character</option>
                                                    <option value="Impressionist">Impressionist</option>
                                                    <option value="Jazz and Jam Concerts - Indoors">Jazz and Jam Concerts - Indoors</option>
                                                    <option value="Jazz and Jam Concerts - Outdoors">Jazz and Jam Concerts - Outdoors</option>
                                                    <option value="Job Fairs Outdoors">Job Fairs Outdoors</option>
                                                    <option value="Jewelry Maker">Jewelry Maker</option>
                                                    <option value="Job Fairs Indoor">Job Fairs Indoor</option>
                                                    <option value="Ladies Club Events">Ladies Club Events</option>
                                                    <option value="Lectures">Lectures</option>
                                                    <option value="Luncheons">Luncheons</option>
                                                    <option value="Meetings - Indoors">Meetings - Indoors</option>
                                                    <option value="Mime">Mime</option>
                                                    <option value="Jugglers (No Pyro)">Jugglers (No Pyro)</option>
                                                    <option value="Magician">Magician</option>
                                                    <option value="Mariachi Band">Mariachi Band</option>
                                                    <option value="Laser Tag (Indoors)">Laser Tag (Indoors)</option>
                                                    <option value="Livestock Shows">Livestock Shows</option>
                                                    <option value="Magic Shows">Magic Shows</option>
                                                    <option value="Marathons (Walking & Running)">Marathons (Walking & Running)</option>
                                                    <option value="Marathons / Walkathons">Marathons / Walkathons</option>
                                                    <option value="Math Tournament">Math Tournament</option>
                                                    <option value="Meetings - Outdoors">Meetings - Outdoors</option>
                                                    <option value="Menorah Lightning">Menorah Lightning</option>
                                                    <option value="Picnics - No Pools or Lakes">Picnics - No Pools or Lakes</option>
                                                    <option value="Reunions Outdoors">Reunions Outdoors</option>
                                                    <option value="Mobile Home Shows">Mobile Home Shows</option>
                                                    <option value="Pageants">Pageants</option>
                                                    <option value="Mobile Homes / RV Shows - Professionally Managed">Mobile Homes / RV Shows - Professionally Managed</option>
                                                    <option value="Movie Release Party">Movie Release Party</option>
                                                    <option value="New Years Party (Private / by invite only)">New Years Party (Private / by invite only)</option>
                                                    <option value="Old Timer Events">Old Timer Events</option>
                                                    <option value="Parades - Under 5000 Spectators">Parades - Under 5,000 Spectators</option>
                                                    <option value="Play Readings">Play Readings</option>
                                                    <option value="Plays">Plays</option>
                                                    <option value="Poetry Reading">Poetry Reading</option>
                                                    <option value="Pool and / or Billiards Tournaments">Pool and / or Billiards Tournaments</option>
                                                    <option value="Proms">Proms</option>
                                                    <option value="Professional and Amateur Association Meetings">Professional and Amateur Association Meetings</option>
                                                    <option value="Puppeteer">Puppeteer</option>
                                                    <option value="Quinceanera">Quinceanera</option>
                                                    <option value="Recitals">Recitals</option>
                                                    <option value="Reunions Indoors">Reunions Indoors</option>
                                                    <option value="Rugby">Rugby</option>
                                                    <option value="Soccer">Soccer</option>
                                                    <option value="RV Shows">RV Shows</option>
                                                    <option value="School Band Competitions or Events">School Band Competitions or Events</option>
                                                    <option value="Soap Box Derbies">Soap Box Derbies</option>
                                                    <option value="Scouting Jamborees - No Overnight Camping">Scouting Jamborees - No Overnight Camping</option>
                                                    <option value="Seances">Seances</option>
                                                    <option value="Seminars">Seminars</option>
                                                    <option value="Social Receptions - Indoors">Social Receptions - Indoors</option>
                                                    <option value="Speaking Engagements">Speaking Engagements</option>
                                                    <option value="Store Openings">Store Openings</option>
                                                    <option value="Social Receptions - Outdoors">Social Receptions - Outdoors</option>
                                                    <option value="Softball - Amateur">Softball - Amateur</option>
                                                    <option value="Sporting Events - Indoors - Non-Professional">Sporting Events - Indoors - Non-Professional</option>
                                                    <option value="Story Teller">Story Teller</option>
                                                    <option value="Symphony Concerts">Symphony Concerts</option>
                                                    <option value="Teleconferences">Teleconferences</option>
                                                    <option value="Telethons">Telethons</option>
                                                    <option value="Talent Show (no rap, hip hop, heavy metal shows)">Talent Show (no rap, hip hop, heavy metal shows)</option>
                                                    <option value="Tap Dancing">Tap Dancing</option>
                                                    <option value="Tennis Tournament">Tennis Tournament</option>
                                                    <option value="Theatrical Stage Performances">Theatrical Stage Performances</option>
                                                    <option value="Trade Shows - Indoors">Trade Shows - Indoors</option>
                                                    <option value="Trade Shows - Outdoors">Trade Shows - Outdoors</option>
                                                    <option value="Vacation Shows">Vacation Shows</option>
                                                    <option value="Ventriloquist">Ventriloquist</option>
                                                    <option value="Video Game Contests">Video Game Contests</option>
                                                    <option value="Volleyball - Amateur">Volleyball - Amateur</option>
                                                    <option value="Voter Registration">Voter Registration</option>
                                                    <option value="Wagon / Hayrides Walking / Hiking Tour">Wagon / Hayrides</option>
                                                    <option value="Walking / Hiking Tour">Walking / Hiking Tour</option>
                                                    <option value="Weddings and Wedding Receptions">Weddings and Wedding Receptions</option>
                                                    <option value="Union Meetings">Union Meetings</option>
                                                    <option value="Yodeler">Yodeler</option>
                                                    <option value="Wine Tasting">Wine Tasting</option>

                                                </select>
                                            </div>

                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Vendor Concessionaire or Exhibitor</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Exhibitor">Exhibitor</option>
                                                    <option value="Concessionaires Non Food Sales">Concessionaires (Non-Food Sales)</option>
                                                    <option value="Concessionaires Food Sales">Concessionaires (Food Sales)</option>
                                                    <option value="Attractions / Performers">Attractions / Performers</option>
                                                </select>
                                            </div>

                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">TULIP - Tenant User
                                        </a>

                                    </li>
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
                                    <img class="media-object media-object media-img" src="${resource(dir: 'images', file: 'entertainer.jpg')}" alt="..." width="250px" height="150px">
                                </a>
                            </div>
                            <div class="media-body card-content2">
                                <h4 class="media-heading">Entertainer</h4>
                                Many entertainers travel nationally as well as internationally as a standard in their operations.
                                Providing domestic as well as foreign coverage to these entertainers requires a specialist to understand, market and place the necessary coverage to these entertainers.
                                This is another specialty of the New Empire team.
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 drawerContainer" style="">
                        <div class="questionCategory"style="display: none">entertainer</div>
                        <div class="drawer" style="">
                            <div class="col-xs-12">
                                <h4>Please select one:</h4>
                            </div>


                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Comedian
                                        </a>

                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Musician or Musical Group</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Alternative Rock">Alternative Rock</option>
                                                    <option value="Baby Band">Baby Band</option>
                                                    <option value="Blues">Blues</option>
                                                    <option value="Christian Music">Christian Music</option>
                                                    <option value="Classical">Classical</option>
                                                    <option value="Country">Country</option>
                                                    <option value="DJ/Techno">DJ/Techno</option>
                                                    <option value="Folk">Folk</option>
                                                    <option value="Hip-Hop">Hip-Hop</option>
                                                    <option value="Jazz">Jazz</option>
                                                    <option value="Metal/Hard Rock">Metal/Hard Rock</option>
                                                    <option value="Pop">Pop</option>
                                                    <option value="Rhythm & Blues">Rhythm & Blues</option>
                                                    <option value="Rock">Rock</option>
                                                </select>
                                            </div>

                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Theatrical</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Broadway">Broadway</option>
                                                    <option value="Dance Company">Dance Company</option>
                                                    <option value="Opera">Opera</option>
                                                    <option value="Orchestra">Orchestra</option>
                                                    <option value="Play">Play</option>
                                                </select>
                                            </div>
                                        </a>
                                    </li>
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
                                    <img class="media-object media-object media-img" src="${resource(dir: 'images', file: 'office.jpg')}" alt="..." width="250px" height="150px">
                                </a>
                            </div>
                            <div class="media-body card-content2">
                                <h4 class="media-heading">Office</h4>
                                Unlike typical office exposures, businesses that are involved in the entertainment industry are exposed to hazards unique to this industry.
                                As an example, film distributors or offices involved in the acquisition and development of media would require a special error & omissions liability.
                                New Empire is expert in delivering these special insurance policies to entertainment industry-related risks.
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 drawerContainer" style="">
                        <div class="questionCategory"style="display: none">office</div>
                        <div class="drawer" style="">
                            <div class="col-xs-12">
                                <h4>Please select one:</h4>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Office</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Accounting/Bookkeeping">Accounting/Bookkeeping</option>
                                                    <option value="Advertising Agency">Advertising Agency</option>
                                                    <option value="Animation Company">Animation Company</option>
                                                    <option value="Association">Association</option>
                                                    <option value="Attorney">Attorney</option>
                                                    <option value="Business Manager">Business Manager</option>
                                                    <option value="Consultants">Consultants</option>
                                                    <option value="Film Devt Distributor">Film Devt Distributor</option>
                                                    <option value="Location Finders">Location Finders</option>
                                                    <option value="Merchandising/Product Placement">Merchandising/Product Placement</option>
                                                    <option value="Music Publisher/Record Label Co.">Music Publisher/Record Label Co.</option>
                                                    <option value="Non Profit Organization">Non Profit Organization</option>
                                                    <option value="Payroll Service Co.">Payroll Service Co.</option>
                                                    <option value="Premises Only">Premises Only</option>
                                                    <option value="Production Office">Production Office</option>
                                                    <option value="Radio/TV Broadcasting">Radio/TV Broadcasting</option>
                                                    <option value="Sales Service & Consulting">Sales Service & Consulting</option>
                                                    <option value="Security & Crowd Mgt">Security & Crowd Mgt</option>
                                                    <option value="Talent Agency">Talent Agency</option>
                                                    <option value="Web Design & Devt">Web Design & Devt</option>
                                                </select>
                                            </div>
                                        </a>
                                    </li>
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
                                    <img class="media-object media-object media-img" src="${resource(dir: 'images', file: 'shellCorp.jpg')}" alt="..." width="250px" height="150px">
                                </a>
                            </div>
                            <div class="media-body card-content2">
                                <h4 class="media-heading">Shell Corporation</h4>
                                Actors, musicians, celebrities, high profile individuals require a unique insurance policy to protect their assets from lawsuits whether negligence can be proven or not.
                                Especially in high litigious states, these individuals are known to the public and are susceptible to lawsuits.
                                Defense costs alone is more than enough reason why these high profile individuals need this unique type of insurance.
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 drawerContainer" style="">
                        <div class="questionCategory"style="display: none">shellCorp</div>
                        <div class="drawer" style="">
                            <div class="col-xs-12">
                                <h4>Please select one:</h4>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Shell Corp</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Actor">Actor</option>
                                                    <option value="Band Manager">Band Manager</option>
                                                    <option value="Business/Tour Manager">Business/Tour Manager</option>
                                                    <option value="Cameraman">Cameraman</option>
                                                    <option value="Choreographer">Choreographer</option>
                                                    <option value="Cinematographer">Cinematographer</option>
                                                    <option value="Comedian">Comedian</option>
                                                    <option value="Creative Consultant">Creative Consultant</option>
                                                    <option value="Voice Over Artist">Voice Over Artist</option>
                                                    <option value="Director">Director</option>
                                                    <option value="Magician">Magician</option>
                                                    <option value="Dance">Dance</option>
                                                    <option value="Make-up Artist">Make-up Artist</option>
                                                    <option value="Music Composer">Music Composer</option>
                                                    <option value="Music Entertainer">Music Entertainer</option>
                                                    <option value="Music Producer">Music Producer</option>
                                                    <option value="News Correspondent">News Correspondent</option>
                                                    <option value="Office">Office</option>
                                                    <option value="Personal Manager">Personal Manager</option>
                                                    <option value="Photographer">Photographer</option>
                                                    <option value="Producer">Producer</option>
                                                    <option value="Record Label/Producer">Record Label/Producer</option>
                                                    <option value="Screen Writer">Screen Writer</option>
                                                    <option value="Song Writer">Song Writer</option>
                                                    <option value="Stage & Lighting Designer">Stage & Lighting Designer</option>
                                                    <option value="Talk Show Personality">Talk Show Personality</option>
                                                </select>
                                            </div>
                                        </a>
                                    </li>
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
                                    <img class="media-object media-object media-img" src="${resource(dir: 'images', file: 'venue.jpg')}" alt="..." width="250px" height="150px">
                                </a>
                            </div>
                            <div class="media-body card-content2">
                                <h4 class="media-heading">Venue / Tenant User</h4>
                                Operating a venue involves many risks to the venue owner, as well as the tenant who is renting the venue.
                                Whether the venue is a small city hall, a broadway theater, an amphitheater or a large convention center. the venue and the tenant user of the venue need insurance.
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 drawerContainer" style="">
                        <div class="questionCategory"style="display: none">venueTenantUser</div>
                        <div class="drawer" style="">
                            <div class="col-xs-12">
                                <h4>Please select one:</h4>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Auditorium
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Convention Center
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Movie Theater
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Sports Arena
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Tenant User Liability
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Theater (Live)</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Theater (99 Seats or Less)">Theater (99 Seats or Less)</option>
                                                    <option value="Theater (100-500 Seats)">Theater (100-500 Seats)</option>
                                                    <option value="Theater (501-1,500 Seats)">Theater (501-1,500 Seats)</option>
                                                    <option value="Theater (1,501-5,000 Seats)">Theater (1,501-5,000 Seats)</option>
                                                    <option value="Theater (Over 5,000 Seats)">Theater (Over 5,000 Seats)</option>

                                                </select>
                                            </div>

                                        </a>
                                    </li>
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
                                    <img class="media-object media-object media-img" src="${resource(dir: 'images', file: 'ancilliary.jpg')}" alt="..." width="250px" height="150px">
                                </a>
                            </div>
                            <div class="media-body card-content2">
                                <h4 class="media-heading">Ancillary Entertainment Risk</h4>
                                The entertainment industry is a 2 trillion dollar industry comprised of individuals and businesses that support this global industry.
                                Coverage may be required for their property, business liability, automobile, employees, and even their profession.
                                New Empire is in a unique position to customize an insurance policy for these individuals and businesses.
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 drawerContainer" style="">
                        <div class="questionCategory"style="display: none">ancillaryEntertainmentRisk</div>
                        <div class="drawer" style="">
                            <div class="col-xs-12">
                                <h4>Please select one:</h4>
                            </div>


                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Concessionaires</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Concessionaires, Food Only">Concessionaires, Food Only</option>
                                                    <option value="Concessionaires, Food And Merchandise">Concessionaires, Food And Merchandise</option>
                                                    <option value="Concessionaires with Liquor">Concessionaires with Liquor</option>


                                                </select>
                                            </div>

                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Design & Manufacturing</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Audio-Visual">Audio-Visual</option>
                                                    <option value="Costumes & Props">Costumes & Props</option>
                                                    <option value="Staging">Staging</option>
                                                </select>
                                            </div>

                                        </a>
                                    </li>
                                </ul>
                            </div>


                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Gaming and Software Development
                                        </a>
                                    </li>
                                </ul>
                            </div>


                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Lessor's Risk Only
                                        </a>
                                    </li>
                                </ul>
                            </div>


                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Museum
                                        </a>
                                    </li>
                                </ul>
                            </div>


                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Post Production Facility
                                        </a>
                                    </li>
                                </ul>
                            </div>


                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Publisher</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Books or Magazines">Books or Magazines</option>
                                                    <option value="Music">Music</option>
                                                    <option value="News">News</option>
                                                </select>
                                            </div>

                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Radio/TV/Broadcasting Station
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Recording Studio
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink riskOptionDropDown">
                                            <div class="row" style="margin:0px">Rental House</div>
                                            <div class="row" style="margin:0px">
                                                <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                margin-bottom: 10px;font-size: 25px;">
                                                    <option value="invalid" selected>Select One</option>
                                                    <option value="Equipment Rental Only, No Installation">Equipment Rental Only, No Installation</option>
                                                    <option value="Equipment Rental, With Installation">Equipment Rental, With Installation</option>
                                                    <option value="Automobile Rental, No Operators">Automobile Rental, No Operators</option>
                                                    <option value="Automobile Rental, With Operators">Automobile Rental, With Operators</option>
                                                </select>
                                            </div>

                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Restaurant with Entertainment
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">School (Entertainment Related)
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Sports Team or League
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Talent Agent
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xs-4">
                                <ul class="nav nav-pills nav-stacked">
                                    <li role="presentation" class="inactive">
                                        <a href="" class="riskOptionLink">Warehouse & Storage
                                        </a>
                                    </li>
                                </ul>
                            </div>


                        </div>

                    </div>
                </div>


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
                                            <input class="form-control datepicker" id="proposedEffectiveDate" name="proposedEffectiveDate" placeholder="MM/DD/YYY" type="text"
                                                   data-object="submission" data-key="proposedEffectiveDate"  required/>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group"> <!-- Date input -->
                                            <label class="control-label">Proposed Expiration Date</label>
                                            <input class="form-control datepicker" id="proposedExpirationDate" name="proposedExpirationDate" placeholder="MM/DD/YYY" type="text"
                                                   data-object="submission" data-key="proposedExpirationDate"  required/>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group"> <!-- Date input -->
                                            <label class="control-label">Proposed Term Length</label>
                                            <input class="form-control" id="proposedTermLength" name="proposedTermLength" type="text" style="color: black; background: white;"
                                                   data-object="submission" data-key="proposedTermLength" />
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group" id="totalBudgetConfirmGroup"> <!-- Date input -->
                                            <label class="control-label">Total Budget</label>
                                            <input class="form-control currencyInput" id="totalBudgetConfirm" name="totalBudgetConfirm" type="text"
                                                   data-object="submission" data-key="totalBudget" required="required">
                                        </div>
                                        <div class="form-group" id="premiumExpectedInputGroup" style="display:none">
                                            <label class="control-label">Target Premium</label>
                                            <input class="form-control currencyInput" id="premiumExpectedInput" name="premiumExpectedInput" type="text" required="" >
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
                                        <span class="form-control-feedback" id="checkNameSpinner" style="right: 16px;top: 27px;font-size: 16px;width: 140px; display:none; color: rgba(44, 156, 255, 1)">
                                            <span style="font-size: 12px; font-weight: 400;">Verifying Insured...</span>
                                            <i class="fa fa-spinner fa-spin "></i>
                                        </span>
                                        <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" style="top: 29px; right: 15px; display: none" ></span>
                                        <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" style="top: 29px; right: 15px; display: none" ></span>
                                        <span class="namedInsuredIcon renewIcon form-control-feedback" aria-hidden="true" style="right: 16px; top: 27px; font-size: 16px; display:none;">
                                            <i class="fa fa-retweet" aria-hidden="true"></i>
                                        </span>
                                        <span class="glyphicon glyphicon-list-alt form-control-feedback" aria-hidden="true" style="top: 29px; right: 15px; display: none; color: rgba(66, 161, 255, 0.76)" ></span>
                                    </div>
                                    <div class="form-group col-xs-12">
                                        <label for="phoneNumber">Phone Number <span style="color:red;">*</span></label>
                                        <g:textField type="text" class="form-control phoneNumberMask" name="phoneNumber" placeholder="(123) 456-7890" required="required" maxlength="20"/>
                                    </div>
                                    <div class="form-group col-xs-12">
                                        <label for="email">Email address <span style="color:red;">*</span></label>
                                        <g:field type="email" class="form-control" name="namedInsuredEmail" placeholder="user@company.com" required="required" />
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
                                        <input class="form-control" type="text" placeholder = "Zip Code" name="zipCodeMailing" id="zipCodeMailing" required="required" data-lengthrequired="5" maxlength="6"/>
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
                        <button class="btn btn-success nextBtn btn-lg pull-right" type="button" id="nextButtonStep4"  >Submit</button>
                    </div>
                </div>

            </div>
        </form>
    </g:form>
</div>


<div class="modal fade" tabindex="-1" role="dialog" id="attachmentsModal">
    <div class="modal-dialog" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Files To Be Uploaded</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1" >
                        <small>File types are limited to only .zip, .doc, .docx, .xlsx, .xls, .pdf, .txt</small>
                        <br>
                        <small>Total upload size limit is limited to 20MB</small>
                    </div>
                </div>
                <div id="attachmentModalFileRowsContainer" style="padding-top:10px;">
                </div>
                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1" >
                        <div class="pull-right" style="margin-right: 30px;">
                            <strong>Total: </strong><strong id="totalUploadSizeSpan"></strong>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <div id="uploadButtonsContainer">
                    <div class="uploadButtonForm" id="uploadFormFile_1">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Add File</span>
                                <input class="file modalFile" name="file" type="file" class="file"
                                       style="width:120px"/>
                            </div>
                            <button class="btn btn-primary doneButtonAttachmentsModal" type="button">Done</button>
                        </form>
                    </div>
                </div>


            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="loadSaveModal">
    <div class="modal-dialog" role="document" style="width:800px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Load Previous Submission</h4>
            </div>
            <div class="modal-body">
                <div class="row savedSubmissionDataHeaderRow">
                    <div class="col-xs-10 col-xs-offset-1">
                        <div class="row">
                            <div class="col-xs-5">
                                <label> Risk</label>
                            </div>
                            <div class="col-xs-4">
                                <label> Name</label>
                            </div>
                            <div class="col-xs-3">
                                <label> Time</label>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1" >
                        <div class="list-group" id="savedSubmissionsContainer" style="font-size: 12px;">
                            <a href="#" class="list-group-item">
                                Cras justo odio
                            </a>
                            <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
                            <a href="#" class="list-group-item">Morbi leo risus</a>
                            <a href="#" class="list-group-item">Porta ac consectetur ac</a>
                            <a href="#" class="list-group-item">Vestibulum at eros</a>
                        </div>
                    </div>
                </div>
            </div>
            %{--<div class="modal-footer">--}%
            %{--<button class="btn btn-primary" id="loadSubmissionButton" type="button"  >Load</button>--}%
            %{--</div>--}%
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="saveAsModal">
    <div class="modal-dialog" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Save Progress</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group">
                        <label class="col-xs-2 control-label">Save As:</label>
                        <div class="col-xs-10">
                            <input type="text" class="form-control" id="saveName" placeholder="" >
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="saveAsButton" type="button"  >Save</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="renewalModal">
    <div class="modal-dialog" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Name Conflict</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12">
                        <span>"<strong id="namedInsuredRenewalSpan"></strong>" matches existing Policies in our system.
                        Submitted by <strong id="agencyRenewalSpan"></strong>.</span>
                        <br>
                    </div>
                </div>
                <div class="row" style=" margin-top:10px;">
                    <div class="col-xs-12" style="margin-top:20px;">
                        <div class="well">
                            <div class="row" style="font-size: smaller;text-align: center;font-weight: 500;">
                                <div class="col-xs-2">ID
                                </div>
                                <div class="col-xs-3">NAMED INSURED
                                </div>
                                <div class="col-xs-3">AGENCY
                                </div>
                                <div class="col-xs-3">ACTIVE (Y/N)
                                </div>
                            </div>
                            <div id="renewalMatchesContainer">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top: 20px;margin-bottom: 20px;">
                    <div class="col-xs-12" style="text-align: center;font-size: large;font-weight: 400;">
                        <span>Is this submission a renewal?</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="yesRenewalButton" type="button"  >Yes</button>
                <button class="btn btn-default" id="noRenewalButton" type="button"  >No</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="checkNamedInsuredModal" >
    <div class="modal-dialog" role="document" style="width: 820px;">
        <div class="modal-content">
            <div class="modal-header">

                <h4 class="modal-title">Name Conflict</h4>
            </div>
            <div class="modal-body" style="padding: 25px 40px;">
                <div class="row">
                    <div class="col-xs-12" style="text-align: center;margin-bottom: 10px;">
                        <h4 class="control-label">Your submission seems to match another recently submitted.</h4>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div id="conflictExistsDiv">
                            <div class="well">
                                <div class="row">
                                    <div class="col-xs-12" style="">
                                        <label class="col-xs-7 control-label" style="margin-bottom: 0px;">Named Insured</label>
                                        <label class="col-xs-5 control-label" style="margin-bottom: 0px;">Status</label>
                                    </div><div class="col-xs-12" id="matchingSubmissionsContainer" style="margin-bottom:10px;">
                                    <span class="col-xs-7" style="">Sample Named Insured LLC</span>
                                    <span class="col-xs-5" style="">Broker of Record Needed</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top:12px;margin-bottom:12px;">
                    <div class="col-xs-12" style="text-align: center;font-size: Larger;font-weight: 400;">
                        <span class="control-label">By continuing this submission for Named Insured you will be required to complete a BOR</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success pull-left" id="ignoreConflictBOR" type="button">UW Ignore BOR</button>
                <button class="btn btn-info" id="requestBORButton" type="button">Request BOR</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

</body>
</html>
