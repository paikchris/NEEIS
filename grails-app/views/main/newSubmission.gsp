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
    <form id="intelledox" role="form">
        </form>
            <div class="container">
                <h1>New Policy</h1>
                <br>
                <br>
                <div class="stepwizard">
                    <div class="stepwizard-row setup-panel">
                        <div class="stepwizard-step">
                            <a href="#step-1" type="button" class="btn btn-primary btn-circle">1</a>
                            <p>Select Risk</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-2" type="button" class="btn btn-default btn-circle" disabled="disabled">2</a>
                            <p>Select Coverages</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-3" type="button" class="btn btn-default btn-circle" disabled="disabled">3</a>
                            <p>Insured Info</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-4" type="button" class="btn btn-default btn-circle" id="reviewSubmitButton" disabled="disabled">4</a>
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

                                <div class="col-xs-6">
                                <ul class="nav nav-pills nav-stacked">
                                    <g:each status="i" var="r" in="${filmRiskTypes}">
                                        <g:if test="${i%(Math.round(filmRiskTypes.size()/3)) ==0 && i > 0}">
                                            </ul>
                                        </div>
                                            <div class="col-xs-6">
                                        <ul class="nav nav-pills nav-stacked">
                                        </g:if>
                                        <li role="presentation" class="inactive"><a href="" class="riskOptionLink" style="font-weight: 400">${r.riskTypeName}</a></li>
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
                                                <a href="" class="riskOptionLink riskOptionDropDown">
                                                    <div class="row" style="margin:0px">Promoter</div>
                                                    <div class="row" style="margin:0px">
                                                        <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                        margin-bottom: 10px;font-size: 25px;">
                                                            <option value="volvo" selected>Select One</option>
                                                            <option value="volvo">Concerts</option>
                                                            <option value="saab">Corporate Events</option>
                                                            <option value="mercedes">Event Planner</option>
                                                            <option value="audi">Special Events</option>
                                                            <option value="volvo">Theatrical</option>
                                                            <option value="saab">Trade Shows</option>
                                                            <option value="mercedes">Wedding Planner</option>
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
                                                    <div class="row" style="margin:0px">Special Event</div>
                                                    <div class="row" style="margin:0px">
                                                        <select class='riskTypeDropdown ' style="display:none; color:#337ab7; padding-left:20px;width: 100%;margin-top: 10px;
                                                        margin-bottom: 10px;font-size: 25px;">
                                                            <option value="volvo" selected>Select One</option>
                                                            <option value="volvo">Arts & Crafts Exhibit</option>
                                                            <option value="saab">Charitable</option>
                                                            <option value="mercedes">Corporate</option>
                                                            <option value="audi">Dance Competition</option>
                                                            <option value="volvo">Exhibitor</option>
                                                            <option value="saab">Fashion Shows</option>
                                                            <option value="mercedes">Festival</option>
                                                            <option value="audi">Fund Raising</option>
                                                            <option value="volvo">Ice Skating Shows</option>
                                                            <option value="saab">Laser Light Shows</option>
                                                            <option value="mercedes">Networking Meetings</option>
                                                            <option value="audi">Party</option>
                                                            <option value="volvo">Radio & Fundraising</option>
                                                            <option value="saab">Rally</option>
                                                            <option value="audi">Regligious Trade Show</option>
                                                            <option value="volvo">Sponsorship Only</option>
                                                            <option value="saab">Sporting</option>
                                                            <option value="mercedes">Trades & Exhibits</option>
                                                            <option value="audi">Wedding Planner</option>
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
                                            <img class="media-object media-object media-img" src="https://static1.squarespace.com/static/57b0d9b7ff7c50648d9e242f/t/57b19796f7e0ab6f35b421fe/1471256486892/?format=750w" alt="..." width="250px" height="150px">
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
                                                        <option value="volvo" selected>Select One</option>
                                                        <option value="volvo">Alternative Rock</option>
                                                        <option value="saab">Baby Band</option>
                                                        <option value="mercedes">Blues</option>
                                                        <option value="audi">Christian Music</option>
                                                        <option value="volvo">Classical</option>
                                                        <option value="saab">Country</option>
                                                        <option value="mercedes">DJ/Techno</option>
                                                        <option value="audi">Folk</option>
                                                        <option value="volvo">Hip-Hop</option>
                                                        <option value="saab">Jazz</option>
                                                        <option value="mercedes">Metal/Hard Rock</option>
                                                        <option value="audi">Pop</option>
                                                        <option value="volvo">Rhythm & Blues</option>
                                                        <option value="saab">Rock</option>
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
                                                        <option value="volvo" selected>Select One</option>
                                                        <option value="volvo">Broadway</option>
                                                        <option value="saab">Dance Company</option>
                                                        <option value="mercedes">Opera</option>
                                                        <option value="audi">Orchestra</option>
                                                        <option value="audi">Play</option>
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
                                            <img class="media-object media-object media-img" src="http://included.co/wp-content/uploads/formidable/Business_people_in_office-1.jpg" alt="..." width="250px" height="150px">
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
                                                            <option value="volvo" selected>Select One</option>
                                                            <option value="volvo">Accounting/Bookkeeping</option>
                                                            <option value="saab">Advertising Agency</option>
                                                            <option value="mercedes">Animation Company</option>
                                                            <option value="audi">Association</option>
                                                            <option value="audi">Attorney</option>
                                                            <option value="volvo">Business Manager</option>
                                                            <option value="saab">Consultants</option>
                                                            <option value="mercedes">Film Devt Distributor</option>
                                                            <option value="audi">Location Finders</option>
                                                            <option value="audi">Merchandising/Product Placement</option>
                                                            <option value="volvo">Music Publisher/Record Label Co.</option>
                                                            <option value="saab">Non Profit Organization</option>
                                                            <option value="mercedes">Payroll Service Co.</option>
                                                            <option value="audi">Premises Only</option>
                                                            <option value="audi">Production Office</option>
                                                            <option value="volvo">Radio/TV Broadcasting</option>
                                                            <option value="saab">Sales Service & Consulting</option>
                                                            <option value="mercedes">Security & Crowd Mgt</option>
                                                            <option value="audi">Talent Agency</option>
                                                            <option value="audi">Web Design & Devt</option>
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
                                            <img class="media-object media-object media-img" src="http://go2balkans.com/web2/wp-content/uploads/o-BUSINESS-MEETING-facebook1.jpg" alt="..." width="250px" height="150px">
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
                                                            <option value="volvo" selected>Select One</option>
                                                            <option value="volvo">Actor</option>
                                                            <option value="saab">Band Manager</option>
                                                            <option value="mercedes">Business/Tour Manager</option>
                                                            <option value="audi">Cameraman</option>
                                                            <option value="audi">Choreographer</option>
                                                            <option value="volvo">Cinematographer</option>
                                                            <option value="saab">Comedian</option>
                                                            <option value="mercedes">Creative Consultant</option>
                                                            <option value="audi">Voice Over Artist</option>
                                                            <option value="audi">Director</option>
                                                            <option value="volvo">Magician</option>
                                                            <option value="saab">Dance</option>
                                                            <option value="mercedes">Make-up Artist</option>
                                                            <option value="audi">Music Composer</option>
                                                            <option value="audi">Music Entertainer</option>
                                                            <option value="volvo">Music Producer</option>
                                                            <option value="saab">News Correspondent</option>
                                                            <option value="mercedes">Office</option>
                                                            <option value="audi">Personal Manager</option>
                                                            <option value="audi">Photographer</option>
                                                            <option value="volvo">Producer</option>
                                                            <option value="saab">Record Label/Producer</option>
                                                            <option value="mercedes">Screen Writer</option>
                                                            <option value="audi">Song Writer</option>
                                                            <option value="audi">Stage & Lighting Designer</option>
                                                            <option value="volvo">Talk Show Personality</option>
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
                                            <img class="media-object media-object media-img" src="https://www.caesars.com/content/cet-global/caesars-com/horseshoe-hammond/_jcr_content/root_content/cetcarousel/cet-slide-3/image.stdimg.uwide.xl.cover.jpg/1378929859901.jpg" alt="..." width="250px" height="150px">
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
                                                            <option value="volvo" selected>Select One</option>
                                                            <option value="volvo">Theater (99 Seats or Less)</option>
                                                            <option value="volvo">Theater (100-500 Seats)</option>
                                                            <option value="volvo">Theater (501-1,500 Seats)</option>
                                                            <option value="volvo">Theater (1,501-5,000 Seats)</option>
                                                            <option value="volvo">Theater (Over 5,000 Seats)</option>

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
                                            <img class="media-object media-object media-img" src="http://naabb.biz/ownerheaders/brokersites/broker2.jpg" alt="..." width="250px" height="150px">
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
                                                            <option value="volvo" selected>Select One</option>
                                                            <option value="volvo">Concessionaires, Food Only</option>
                                                            <option value="volvo">Concessionaires, Food And Merchandise</option>
                                                            <option value="volvo">Concessionaires with Liquor</option>


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
                                                            <option value="volvo" selected>Select One</option>
                                                            <option value="volvo">Audio-Visual</option>
                                                            <option value="saab">Costumes & Props</option>
                                                            <option value="mercedes">Staging</option>
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
                                                            <option value="volvo" selected>Select One</option>
                                                            <option value="volvo">Books or Magazines</option>
                                                            <option value="saab">Music</option>
                                                            <option value="mercedes">News</option>
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
                                                            <option value="volvo" selected>Select One</option>
                                                            <option value="volvo">Equipment Rental Only, No Installation</option>
                                                            <option value="volvo">Equipment Rental, With Installation</option>
                                                            <option value="volvo">Automobile Rental, No Operators</option>
                                                            <option value="volvo">Automobile Rental, With Operators</option>
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
                                                <div class="form-group"> <!-- Date input -->
                                                    <label class="control-label">Total Budget</label>
                                                    <input class="form-control" id="totalBudgetConfirm" name="totalBudgetConfirm" type="text" required="required">
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
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <label class="control-label">Please select the Coverages being requested:</label>
                                            </div>
                                        </div>
                                        <div id="coverageCheckboxesDiv">
                                        </div>
                                        <br><br>
                                        <div class="row">
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
                                                             placeholder="Name" data-toggle="tooltip" title="" required="required" />
                                                <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" style="top: 29px; display: none" ></span>
                                                <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" style="top: 29px; display: none" ></span>

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
                                                <select class="form-control showReview" name="interest"  data-reviewName="Interest" id="interestSelect">
                                                    <option value="invalid" selected="selected">Owner</option>
                                                    <option value="corporation" selected="selected">Leasee</option>
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




    <script src="${resource(dir: 'js', file: 'newSubmission.js')}"></script>
    <script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}"></script>
            </body>
        </html>