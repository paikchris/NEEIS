<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'submissions.css')}" type="text/css">

    <style>
        .submissionOptionButton{
            margin-left: 10px;
            margin-right: 10px;
        }

        .statusChangeButton:disabled{
            cursor:default;
        }

        .fa{
            margin-right:4px;
        }
        .submissionQuickOptions{
        }
    </style>
</head>

<body>
    <div class="col-xs-12">

    </div>

<br>
<div class="col-xs-12">
    <div class="col-xs-4">
        <h3 style=" color: rgba(0, 0, 0, 0.57); margin-top:0px; margin-bottom:0px;">My Submissions</h3>
        <g:if test="${user.userRole == "Broker"}">
            <span>Broker View</span>
        </g:if>
        <g:elseif test="${user.userRole == "Underwriter"}">
            <span>Underwriter View</span>
        </g:elseif>
        <div id="userRole" style="display:none">${user.userRole}</div>
        <div id="additionalInsuredListHidden" style="display:none">${additionalInsuredList}</div>
        <div id="neeisUWListHidden" style="display:none">${neeisUWList}</div>
    </div>
    <div class="col-xs-4 ">
        %{--<g:link action="downloadPDF" style="" id="hiddenCertButton">--}%
            %{--<img src="/portal/images/pdfIcon.png" height="32" width="32"> Download Cert</img>--}%
        %{--</g:link>--}%
        <div class="input-group">
            <input type="text" class="form-control" id="submissionSearch" placeholder="Search">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button" id="searchButton">Search</button>
            </span>
        </div><!-- /input-group -->

    </div>
    <div class="col-xs-4">
        <div class="dropdown">
            <button class="btn btn-default dropdown-toggle pull-right" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Filter
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                <li><a href="#" class="filterButton" data-filterOption="none"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> No Filter</a></li>
                <li><a href="#" class="filterButton" data-filterOption="WRA"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Approval Requested</a></li>
                <li><a href="#" class="filterButton" data-filterOption="BND"><span class="glyphicon glyphicon-transfer" aria-hidden="true"></span> Bound</a></li>
                <li><a href="#" class="filterButton" data-filterOption="QO"><span class="glyphicon glyphicon-alert" aria-hidden="true"></span> Quoted</a></li>
                <li><a href="#" class="filterButton" data-filterOption="WB3"><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span> Approved</a></li>
                <li><a href="#" class="filterButton" data-filterOption="WB5"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Declined</a></li>
            </ul>
        </div>
    </div>


</div>
    <div class="form-group col-xs-4 col-xs-offset-4">
    </div>

    <div class="form-group col-xs-12">

        <div class="col-xs-12">
            <table class="table table-striped">
                <thead>
                    <tr class="bg-primary" style="text-align: center; font-size: 14px; background-color: #405b6d;">
                        <th></th>
                        <th>Submission ID</th>
                        <th>Named Insured</th>
                        <th>Coverages</th>
                        <th>Submitted By</th>
                        <th>Submit Date</th>
                        <th>Status</th>
                        <th>Underwriter</th>
                        <th>Attachments</th>
                    </tr>
                </thead>

                <tbody id="submissionRows" style="font-size: 13px;">
                        <g:each in="${submissions}" var="s" status="i">
                            <div>
                                <g:if test="${s.seenByUW == "Y"}">
                                    <tr class="submissionRow" style="cursor:pointer">
                                </g:if>
                                <g:elseif test="${s.seenByUW == "N"}">
                                    %{--<tr style="font-weight: 500; background-color: rgba(21, 142, 71, 0.32)">--}%
                                    <tr class="submissionRow" style="cursor:pointer">
                                </g:elseif>
                                <g:else>
                                    <tr class="submissionRow" style="cursor:pointer">
                                </g:else>

                                <g:if test="${user.userRole == "Broker"}">
                                    <td><span class="" aria-hidden="" style="color: rgba(146, 221, 237, 1);font-size: 14px;"></span></td>
                                </g:if>
                                <g:elseif test="${user.userRole == "Underwriter"}">
                                    <g:if test="${s.web == "true"}">
                                        <td><span class="glyphicon glyphicon-cloud" aria-hidden="true" style="color: rgba(146, 221, 237, 1);font-size: 14px;"></span></td>
                                    </g:if>
                                    <g:else>
                                        <td><span class="" aria-hidden="" style="color: rgba(146, 221, 237, 1);font-size: 14px;"></span></td>
                                    </g:else>
                                </g:elseif>

                                <g:if test="${user.userRole == "Broker"}">
                                    <th scope="row"><a href="#" class="aimQuoteIDTD">${s.aimQuoteID}</a></th>
                                </g:if>
                                <g:elseif test="${user.userRole == "Underwriter"}">
                                    <th scope="row"><a href="./../main/submissionView?s=${s.aimQuoteID}" class="aimQuoteIDTD">${s.aimQuoteID}</a></th>
                                </g:elseif>

                                    <td class="namedInsuredTD">${s.namedInsured}</td>
                                    <td class="coveragesTD">${s.coverages}</td>
                                    <td  class="submittedByTD">${s.submittedBy}</td>
                                    <g:if test="${user.userRole == "Broker"}">
                                        <td  class="brokerEmail" style="display:none">${session.user.email}</td>
                                    </g:if>
                                    <g:elseif test="${user.userRole == "Underwriter"}">
                                        <td  class="brokerEmail" style="display:none">${s.brokerEmail}</td>
                                    </g:elseif>

                                    <td  class="submitDateTD">${s.submitDate}</td>
                                    <td class="submissionStatusTD">
                                        <g:if test="${s.statusCode == "NBR"}">
                                        New Submission Received
                                        </g:if>
                                        <g:elseif test="${s.statusCode == "QO"}">
                                            Quoted
                                        </g:elseif>
                                        <g:elseif test="${s.statusCode == "WRA"}">
                                            Approval Requested
                                        </g:elseif>
                                        <g:elseif test="${s.statusCode == "WB3"}">
                                            Approved
                                        </g:elseif>
                                        <g:elseif test="${s.statusCode == "BRQ"}">
                                            Bind Requested
                                        </g:elseif>
                                        <g:elseif test="${s.statusCode == "BND"}">
                                            Bound
                                        </g:elseif>
                                        <g:elseif test="${s.statusCode == "WB5"}">
                                            Declined
                                        </g:elseif>
                                        <g:else>
                                            ${s.statusCode}
                                        </g:else>
                                    </td>


                                    <td class="underwriterTD">
                                        <g:if test="${user.userRole == "Broker"}">
                                            ${s.underwriter}
                                        </g:if>
                                        <g:elseif test="${user.userRole == "Underwriter"}">
                                            ${s.underwriter}
                                        </g:elseif>
                                    </td>

                                    <td><a class="attachmentsLink">Attachments</a></td>

                                    %{--HIDDEN TDS--}%
                                    <td class="statusCode" style="display:none">
                                        ${s.statusCode}
                                    </td>
                                </tr>
                            </div>
                        </g:each>
                </tbody>
            </table>
        </div>
                </div>
    </div>

<script src="${resource(dir: 'js', file: "submissions.js?ts=" + new Date().getTime())}"></script>


<div class="modal fade" tabindex="-1" role="dialog" id="attachmentsViewModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Attachments</h4>
            </div>
            <div class="modal-body" id="attachmentRowsContainer">
                <div class="row fileRow" style="margin-top:10px; margin-bottom: 10px;">
                    <div class="col-xs-12">
                        <button class="downloadFileButton btn btn-primary " style="margin-right:20px; margin-left:15px;">Download</button>
                        <img src='/images/pdfIcon.png' height='16' width='16' style='margin-right:5px'/>
                        <span class="fileDescriptionSpan " style="line-height: 30px;">Indication.pdf</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                %{--<g:link controller="Async" action="ajaxDownloadAttachment" >--}%
                %{--<button>Test</button>--}%
                %{--</g:link>--}%
                <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Done</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" tabindex="-1" role="dialog" id="reviewModal">
    <style>
        .tab-pane{
            padding:20px 0px;
        }
        .tab-pane dt{
            width: 150px;
            margin-bottom: 4px;
            font-weight: 500
        }
        .tab-pane dd{
            margin-left: 170px;
            margin-bottom: 4px;
        }
        .tab-pane > div.infoContainer{
            margin-bottom:20px;
        }
        .tab-pane > div.infoContainer > div.infoGroup{
            display: inline-block;
            margin-right:40px;
            vertical-align: top;
        }
        .tab-pane > div.infoContainer > div > *{
            display: block;
        }
        .tab-pane > div.infoContainer > div > label{
            margin-bottom:0px;
        }

        .tab-pane > div.inlineInfo > div > label{
            margin-right: 10px;;
        }

        .tab-pane > div.inlineInfo > div > div.inlineRowQuestion{
            margin-top:5px;
            margin-bottom:5px;
        }



        .panelHeader{
            padding:0px;
        }
        .tab-pane > div.infoContainer > span{
            padding-left:0px;
        }

    </style>
    <div class="modal-dialog" role="document" style="width: 75%;;">
        <div class="modal-content">
            <div class="modal-body" style="padding: 25px 25px;">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position: relative;top: -20px;right: -15px">
                    <span aria-hidden="true">&times;</span>
                </button>
                %{--<span id="reviewQuoteID" style="float:right"></span>--}%
                <div class="col-xs-4 panelHeader" style=" line-height: 1.5">
                    <div>
                        <span class="DAOspan " id="reviewQuoteID" data-daoName="Quote-QuoteID" style="display: none"></span>
                        <span class="modal-title DAOspan" data-daoName="Quote-NamedInsured" style="font-size: 24px; font-weight: 500;line-height: .1"></span>
                        <span class="label label-success DAOspan Status-Description" data-daoName="Status-Description" style="position: relative;top: -3px;font-size: 9px;margin-left: 2px;"></span><br>
                        <span class="DAOspan " data-daoName="Quote-Address1" ></span><br>
                        <span class="DAOspan " data-daoName="Quote-City" ></span> <span class="DAOspan " data-daoName="Quote-State" ></span> <span class="DAOspan " data-daoName="Quote-Zip" ></span><br>

                    </div>
                </div>
                <div class="col-xs-4 panelHeader" style="font-size:smaller; line-height: 1.5">
                    <div>
                        <span style="font-weight:500">Policy #: </span><span class="DAOspan " data-daoName="Quote-PolicyID" ></span><br>
                        <span><span style="font-weight:500">Policy Term: </span><span class="DAOspan dateDAO" data-daoName="Quote-Effective" ></span> - <span class="DAOspan dateDAO" data-daoName="Quote-Effective" ></span></span><br>
                        <span><span style="font-weight:500">Coverage: </span><span class="DAOspan " data-daoName="Quote-CoverageID" ></span></span><br>
                        <span><span style="font-weight:500">Risk Type: </span><span class="DAOspan " data-daoName="Quote-Description" ></span></span>
                    </div>
                </div>
                <div class="col-xs-3 panelHeader" style="font-size:smaller; line-height: 1.5">
                    <div>
                        <span style="font-weight:500">Market Co: </span><span class="DAOspan  uwonly" data-daoName="Version-MarketName" ></span><br>
                        <span style="font-weight:500">Market ID: </span><span class="DAOspan  uwonly" data-daoName="Version-MarketID" ></span>
                    </div>
                </div>

                <div class="col-xs-12" style="padding-bottom: 18px;padding-top:14px;padding-left:0px;padding-right:0px;">
                    <button class="btn btn-default reviewMessageButton" type="submit">
                        <span class="glyphicon glyphicon-envelope" aria-hidden="true" style="top: 3px; margin-right: 4px;"></span>
                        <g:if test="${user.userRole == "Broker"}">
                            <span class="DAOspan " data-daoName="Quote-AcctExec" style="font-size: 14px; font-weight: 500"></span>
                        </g:if>
                        <g:elseif test="${user.userRole == "Underwriter"}">
                            <span class="DAOspan " data-daoName="Quote-Attention" style="font-size: 14px; font-weight: 500"></span>
                        </g:elseif>
                    </button>
                    <g:if test="${user.userRole == "Underwriter"}">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                <span class="DAOspan " data-daoName="Quote-AcctExec" id='acctExecName'style="font-size: 14px; font-weight: 500"></span>
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <g:each in="${neeisUWList}" var="s" status="i">
                                    <li><a href="#" class="switchUWOption">${s}</a></li>
                                </g:each>
                            </ul>
                        </div>

                        <button class="btn btn-primary bindOptionsButton" id="" type="button" style="margin-left:20px;">
                            <i class="fa fa-handshake-o" aria-hidden="true"></i>
                            <span class="" id="bindOptionsButtonSpan" style="font-size: 14px; font-weight: 500" > Assign Policy Number</span>
                        </button>
                    </g:if>

                    <span></span>

                    <button class="btn btn-success pull-right reviewStatusChangeButton" id="reviewStatusChangeButton" type="button" data-currentStatusCode="" data-nextStatus=''
                            data-nextButtonText=''>
                        <i class="fa fa-flag" aria-hidden="true"></i>
                        <span class="" id="reviewStatusButtonSpan" style="font-size: 14px; font-weight: 500" > Approve</span>
                    </button>

                     %{--(<span class="DAOspan Quote-ProducerName" style="font-style: italic;">Truman Van Dyke</span>)<br>--}%
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active"><a class="reviewTab " href="#overview" aria-controls="overview" role="tab" data-toggle="tab" id="overviewTabButton">Overview</a></li>
                            <li role="presentation"><a class="reviewTab " href="#forms" aria-controls="forms" role="tab" data-toggle="tab">Forms</a></li>
                        <li role="presentation"><a class="reviewTab " href="#insured" aria-controls="profile" role="tab" data-toggle="tab">Insured</a></li>
                        <li role="presentation"><a class="reviewTab " href="#underwriting" aria-controls="messages" role="tab" data-toggle="tab">Underwriting</a></li>

                        <g:if test="${user.userRole == "Broker"}">
                        </g:if>
                        <g:elseif test="${user.userRole == "Underwriter"}">
                            %{--<li role="presentation"><a class="reviewTab " href="#rating" aria-controls="rating" role="tab" data-toggle="tab">Rating</a></li>--}%
                            <li role="presentation"><a class="reviewTab " href="#bind" aria-controls="bind" role="tab" data-toggle="tab" id="bindReviewTabButton">Bind</a></li>
                        </g:elseif>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane fade in active" id="overview">
                                <div class="row">
                                    <div class="col-xs-3 leftPanel">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <span style="font-weight:500">Submitted By</span><br>
                                                <i class="fa fa-user-o" aria-hidden="true"></i>
                                                <span class="DAOspan " data-daoName="Quote-Attention" > JonPaul Evans</span>
                                                <br>
                                                <i class="fa fa-building-o" aria-hidden="true"></i>
                                                <span class="DAOspan " data-daoName="Quote-ProducerName" > Truman Van Dyke</span>
                                                <br>
                                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                <span class="DAOspan " data-daoName="Insured-Phone" >323-323-2333</span>
                                                <br>
                                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                                <span class="DAOspan datetimeDAO" data-daoName="Quote-Received" >10/19/2016 23:40</span>
                                                <br>
                                                <br>
                                                <span style="font-weight:500">NEEIS Underwriter</span><br>
                                                <i class="fa fa-user-o" aria-hidden="true"></i>
                                                <span class="DAOspan " data-daoName="Quote-AcctExec" > Jason</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3 rightPanel">
                                        <div class="row">
                                            <div class="col-xs-12" id="reviewProposedDates">
                                                <span style="font-weight:500">Proposed Dates</span><br>
                                                <i class="fa fa-calendar" aria-hidden="true"></i>
                                                <span class="DAOspan dateDAO proposedEffective" data-daoName="Version-ProposedEffective" >10/19/2016</span> - <span class="DAOspan dateDAO proposedExpiration" data-daoName="Version-ProposedExpiration" >10/29/2016</span>
                                                <br>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 otherPanel">
                                        <div class="row">
                                            <div class="col-xs-3">
                                                <span style="font-weight:500">Limit</span>
                                            </div>
                                            <div class="col-xs-6">
                                                <span style="font-weight:500">Coverage</span>
                                            </div>
                                            <div class="col-xs-3">
                                                <span style="font-weight:500">Deductible</span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div id="limitsDeductOverview" style="font-size:12px; text-overflow: ellipsis ;">
                                                <span class="DAOspan limits" data-daoName="Version-Limits" style="white-space: pre-line"></span>
                                                <span class="DAOspan " data-daoName="Version-Deductible" style="white-space: pre-line"></span>
                                            </div>
                                        </div>
                                        <br><br>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <span style="font-weight:500">Premium Breakdown</span><br>
                                                %{--<br>--}%
                                            </div>
                                            <div id="premiumBreakdownOverview">
                                                <span class="DAOspan " data-daoName="Version-LobDistribSched" style="white-space: pre-line"></span><br>
                                                <span class="DAOspan " data-daoName="Version-FeeSchedule" style="white-space: pre-line"></span><br>
                                                <span class="DAOspan " data-daoName="Version-Tax1Name"></span> <span class="DAOspan " data-daoName="Version-Tax1" ></span><br>
                                                <span class="DAOspan " data-daoName="Version-Tax2Name"></span> <span class="DAOspan " data-daoName="Version-Tax2" ></span><br>
                                                <span class="DAOspan " data-daoName="Version-Tax3Name"></span> <span class="DAOspan " data-daoName="Version-Tax3" ></span><br>
                                                <span class="DAOspan " data-daoName="Version-Tax4Name"></span> <span class="DAOspan " data-daoName="Version-Tax4" ></span><br>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="forms">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <span class="DAOspan" data-daoName="Quote-CoverageID" style="font-weight:500"></span><br>
                                        <div id="termsReview" style="line-height: 1.5;font-size:12px;">
                                            <span class="DAOspan" data-daoName="Version-Subject" style="white-space: pre-line;"></span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12">
                                        <span class="DAOspan" data-daoName="Quote-CoverageID" style="font-weight:500"></span><br>
                                        <div id="formsReview" style="line-height: 1.5;font-size:12px;">
                                            <span class="DAOspan" data-daoName="Version-Endorsement" style="white-space: pre-line;"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="insured">Under Development</div>
                            <div role="tabpanel" class="tab-pane fade" id="underwriting">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div id="uwQuestionsReview">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        <g:if test="${user.userRole == "Underwriter"}">
                            %{--
                            <div role="tabpanel" class="tab-pane fade" id="rating">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-heading">
                                                <h3 class="panel-title" style="font-size: 14px;">Coverage Dates</h3>
                                            </div>

                                            <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-xs-3">
                                                        <div class="form-group"><!-- Date input -->
                                                            <label class="control-label"
                                                                   style=" font-size:10px;">Proposed Effective Date</label>
                                                            <input class="form-control" type="text"
                                                                   placeholder="Hidden Text Field To Adjust Focus off Date"
                                                                   name="hiddenField" style="display: none;"/>
                                                            <input class="form-control datepicker"
                                                                   id="proposedEffectiveDate"
                                                                   name="proposedEffectiveDate" placeholder="MM/DD/YYY"
                                                                   type="text" required/>
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-3">
                                                        <div class="form-group"><!-- Date input -->
                                                            <label class="control-label"
                                                                   style=" font-size:10px;">Proposed Expiration Date</label>
                                                            <input class="form-control datepicker"
                                                                   id="proposedExpirationDate"
                                                                   name="proposedExpirationDate" placeholder="MM/DD/YYY"
                                                                   type="text" required/>
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-3">
                                                        <div class="form-group"><!-- Date input -->
                                                            <label class="control-label"
                                                                   style=" font-size:10px;">Proposed Term Length</label>
                                                            <input class="form-control" id="proposedTermLength"
                                                                   name="proposedTermLength" type="text"
                                                                   style="color: black; background: white;"/>
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-3">
                                                        <div class="form-group"><!-- Date input -->
                                                            <label class="control-label"
                                                                   style=" font-size:10px;">Total Budget</label>
                                                            <input class="form-control" id="totalBudgetConfirm"
                                                                   name="totalBudgetConfirm" type="text"
                                                                   required="required">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-md-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-heading" style="padding: 4px 10px;">
                                                <h3 class="panel-title" style="font-size: 14px;">Rates</h3>
                                            </div>

                                            <div class="panel-body" id="rateContainer">
                                                <div class="row" id="PIPCHOIRatesRow" style="display:none">
                                                    <div class="col-xs-12"><span
                                                            style="font-size:20px; font-weight:500;">PIP Choice</span>
                                                    </div>

                                                    <div class="col-xs-2" style="margin-left:20px;">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Misc Equip Rate</label>
                                                            <input class="form-control" id="PIPCHOI_miscRate"
                                                                   name="PIPCHOI_miscRate" type="text">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Misc Equip MP</label>
                                                            <input class="form-control" id="PIPCHOI_miscMP"
                                                                   name="PIPCHOI_miscMP" type="text">
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Props, Set, Wardrobe Rate</label>
                                                            <input class="form-control" id="PIPCHOI_propsRate"
                                                                   name="PIPCHOI_propsRate" type="text">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Props, Set, Wardrobe MP</label>
                                                            <input class="form-control" id="PIPCHOI_propsMP"
                                                                   name="PIPCHOI_propsMP" type="text">
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Third Party Prop Rate</label>
                                                            <input class="form-control" id="PIPCHOI_thirdRate"
                                                                   name="PIPCHOI_thirdRate" type="text">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Third Party Prop MP</label>
                                                            <input class="form-control" id="PIPCHOI_thirdMP"
                                                                   name="PIPCHOI_thirdMP" type="text">
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Extra Expense Rate</label>
                                                            <input class="form-control" id="PIPCHOI_extraRate"
                                                                   name="PIPCHOI_extraRate" type="text">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Extra Expense MP</label>
                                                            <input class="form-control" id="PIPCHOI_extraMP"
                                                                   name="PIPCHOI_extraMP" type="text">
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">NOHA Rate</label>
                                                            <input class="form-control" id="PIPCHOI_NOHARate"
                                                                   name="PIPCHOI_NOHARate" type="text">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">NOHA MP</label>
                                                            <input class="form-control" id="PIPCHOI_NOHAMP"
                                                                   name="PIPCHOI_NOHAMP" type="text">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" id="PIP1RatesRow" style="display:none">
                                                    <div class="col-xs-12"><span
                                                            style="font-size:20px; font-weight:500;">PIP 1</span></div>

                                                    <div class="col-xs-2" style="margin-left:20px;">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 1 Rate</label>
                                                            <input class="form-control" id="PIP1_Rate" name="PIP1_Rate"
                                                                   type="text" placeholder="Flat" disabled>
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 1 MP</label>
                                                            <input class="form-control" id="PIP1_MP" name="PIP1_MP"
                                                                   type="text">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" id="PIP2RatesRow" style="display:none">
                                                    <div class="col-xs-12"><span
                                                            style="font-size:20px; font-weight:500;">PIP 2</span></div>

                                                    <div class="col-xs-2" style="margin-left:20px;">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 2 Rate</label>
                                                            <input class="form-control" id="PIP2_Rate" name="PIP2_Rate"
                                                                   type="text" placeholder="Flat" disabled>
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 2 MP</label>
                                                            <input class="form-control" id="PIP2_MP" name="PIP2_MP"
                                                                   type="text">
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">NOHA Rate</label>
                                                            <input class="form-control" id="PIP2_NOHARate"
                                                                   name="PIP2_NOHARate" type="text" placeholder="Flat"
                                                                   disabled>
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">NOHA MP</label>
                                                            <input class="form-control" id="PIP2_NOHAMP"
                                                                   name="PIP2_NOHAMP" type="text">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" id="PIP3RatesRow" style="display:none">
                                                    <div class="col-xs-12"><span
                                                            style="font-size:20px; font-weight:500;">PIP 3</span></div>

                                                    <div class="col-xs-2" style="margin-left:20px;">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 3 Rate</label>
                                                            <input class="form-control" id="PIP3_Rate" name="PIP3_Rate"
                                                                   type="text">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 3 MP</label>
                                                            <input class="form-control" id="PIP3_MP" name="PIP3_MP"
                                                                   type="text">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" id="PIP4RatesRow" style="display:none">
                                                    <div class="col-xs-12"><span
                                                            style="font-size:20px; font-weight:500;">PIP 4</span></div>

                                                    <div class="col-xs-2" style="margin-left:20px;">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 4 Rate</label>
                                                            <input class="form-control" id="PIP4_Rate" name="PIP4_Rate"
                                                                   type="text">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 4 MP</label>
                                                            <input class="form-control" id="PIP4_MP" name="PIP4_MP"
                                                                   type="text">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" id="PIP5RatesRow" style="display:none">
                                                    <div class="col-xs-12"><span
                                                            style="font-size:20px; font-weight:500;">PIP 5</span></div>

                                                    <div class="col-xs-2" style="margin-left:20px;">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 5 Rate</label>
                                                            <input class="form-control" id="PIP5_Rate" name="PIP5_Rate"
                                                                   type="text">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">PIP 5 MP</label>
                                                            <input class="form-control" id="PIP5_MP" name="PIP5_MP"
                                                                   type="text">
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Civil Auth 100 Rate</label>
                                                            <input class="form-control" id="PIP5_civil100Rate"
                                                                   name="PIP5_civil100Rate" type="text"
                                                                   placeholder="Flat" disabled>
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Civil Auth 100 MP</label>
                                                            <input class="form-control" id="PIP5_civil100MP"
                                                                   name="PIP5_civil100MP" type="text">
                                                        </div>
                                                    </div>

                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Civil Auth 500 Rate</label>
                                                            <input class="form-control" id="PIP5_civil500Rate"
                                                                   name="PIP5_civil500Rate" type="text"
                                                                   placeholder="Flat" disabled>
                                                            <label class="control-label"
                                                                   style=" font-size:10px; margin-bottom: 0px;">Civil Auth 500 MP</label>
                                                            <input class="form-control" id="PIP5_civil500MP"
                                                                   name="PIP5_civil500MP" type="text">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row col-xs-12">
                                                    <button class="btn btn-primary pull-right" type="button"
                                                            value="Upload" id="runRatesButton">Run Rates</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-md-12" style="color:rgba(31, 31, 31, 0.35)">
                                        <div class="panel panel-default" id="coverageOptionsReview" style="">
                                            <div class="panel-heading">
                                                <h3 class="panel-title"
                                                    style="font-size: 14px; color:rgba(31, 31, 31, 0.35)"
                                                    id="coverageOptionsTitle">Coverage Options</h3>
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

                                                <div class='row TaxHeaderRow'
                                                     style='font-weight: 500; margin-top:10px;'>
                                                    <div class='col-xs-4'>
                                                        <span class='lineOfBusinessSpan'>Taxes & Fees</span>
                                                    </div>

                                                    <div class='col-xs-3'>
                                                        <span class='totalPremiumSpan'></span>
                                                    </div>

                                                    <div class='col-xs-3'>
                                                        <span class='agentPercentSpan'></span>
                                                    </div>
                                                </div>

                                                <div id="taxRows" style="">

                                                </div>

                                                <div class='row TotalPremiumRow' style='font-weight: 500'>
                                                    <div class='col-xs-4'>
                                                        <span class='lineOfBusinessSpan'>Total</span>
                                                    </div>

                                                    <div class='col-xs-3'>
                                                        <span class='totalPremiumSpan' id='premiumAllLOBTotal'></span>
                                                    </div>

                                                    <div class='col-xs-3'>
                                                        <span class='agentPercentSpan'></span>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-xs-9" id="disclaimerInsert"
                                                         style="padding-top: 10px;padding-bottom:40px;font-size: 13px;color: red;">

                                                    </div>

                                                </div>

                                                <div class="row">

                                                    <div class="col-xs-12">
                                                        <h5>Terms</h5>
                                                        <span id="termsInsert"
                                                              style="font-size: 12px; white-space: pre-line"></span>
                                                    </div>

                                                </div>
                                                <br>

                                                <div class="row">

                                                    <div class="col-xs-12">
                                                        <h5>Endorse</h5>
                                                        <span id="endorseInsert"
                                                              style="font-size: 12px; white-space: pre-line"></span>
                                                    </div>

                                                </div>
                                                <br>

                                                <div class="row">
                                                    <div class="form-group col-xs-2">
                                                        <label class="control-label">Broker Fee</label>
                                                        <input class="form-control" id="brokerFeeInput" type="text"
                                                               placeholder="$" name="brokerFee"/>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xs-12">
                                        <button class="btn btn-default prevBtn btn-lg pull-left"
                                                type="button">Prev</button>
                                        <button class="btn btn-primary nextBtn btn-lg pull-right" type="button"
                                                id="nextButtonStep2">Next</button>
                                    </div>
                                </div>
                            </div>
                            --}%
                            <div role="tabpanel" class="tab-pane fade" id="bind">
                                <style>
                                    .policyNumberOptionButtonRow{
                                        margin-top:12px;
                                        margin-bottom:12px;
                                    }

                                    .policyNumberOptionButtonRow .btn.disabled,
                                    .policyNumberOptionButtonRow .btn[disabled],
                                    .policyNumberOptionButtonRow fieldset[disabled] .btn{
                                        color: darkgray;
                                    }
                                    .policyRow{
                                        background-color: rgba(17, 80, 53, 1);
                                        color: white;
                                        border-radius: 4px;
                                        padding:4px;
                                        margin-bottom: 14px;
                                        cursor:pointer;
                                    }
                                    .card {
                                    }

                                    .card {
                                        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                                        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
                                    }

                                    .card:hover {
                                        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                                    }
                                </style>
                                <div class="row">
                                    <div class="col-xs-12" style="padding:9px 80px;">
                                        <div  class="sw-theme-arrows" id="smartwizard">
                                            <ul>
                                                <li><a href="#step-1">Policy Number Options<br /><small>Select Bind Method</small></a></li>
                                                <li><a href="#step-2">Available Policy Numbers<br /><small>Select a Policy Number</small></a></li>
                                                <li><a href="#step-3">Review<br /><small>Step description</small></a></li>
                                                <li><a href="#step-4">Bind<br /><small>Step description</small></a></li>
                                            </ul>

                                            <div>
                                                <div id="step-1" class="" style="">
                                                    <div class="row policyNumberOptionButtonRow">
                                                        <div class="col-xs-4 col-xs-offset-4">
                                                            <button class="btn btn-primary form-control"
                                                                    type="button" id="getPolicyFromRegisterButton">Get Policy Number From Register</button>
                                                        </div>
                                                    </div>
                                                    <div class="row policyNumberOptionButtonRow">
                                                        <div class="col-xs-4 col-xs-offset-4">
                                                            <button class="btn btn-primary form-control"
                                                                    type="button" disabled="disabled">Issue Binder, Policy Number TBD</button>
                                                        </div>
                                                    </div>
                                                    <div class="row policyNumberOptionButtonRow">
                                                        <div class="col-xs-4 col-xs-offset-4">
                                                            <button class="btn btn-primary form-control"
                                                                    type="button" disabled="disabled">Enter Policy Number From Company</button>
                                                        </div>
                                                    </div>
                                                    <div class="row policyNumberOptionButtonRow">
                                                        <div class="col-xs-4 col-xs-offset-4">
                                                            <button class="btn btn-primary form-control"
                                                                    type="button" disabled="disabled">Issue Binder With Master Policy Number</button>
                                                        </div>
                                                    </div>
                                                    <div class="row policyNumberOptionButtonRow">
                                                        <div class="col-xs-4 col-xs-offset-4">
                                                            <button class="btn btn-primary form-control"
                                                                    type="button" disabled="disabled">Issue Renewal Certificate</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="step-2" class="" style="display:none">
                                                    <h5>Select a Policy Number</h5>
                                                    <div class="policyNumbersContainer" style="padding: 10px 20px">
                                                        <div id="policyKeyID" style="display:none"></div>
                                                        <div class="row">
                                                            <div class="col-xs-2">
                                                                <label>Policy Number</label>
                                                            </div>
                                                            <div class="col-xs-2 ">
                                                                <label>Type</label>
                                                            </div>
                                                            <div class="col-xs-2 ">
                                                                <label>Comp Cd</label>
                                                            </div>
                                                            <div class="col-xs-2 ">
                                                                <label>Company</label>
                                                            </div>
                                                            <div class="col-xs-2 ">
                                                                <label>Product ID</label>
                                                            </div>
                                                            <div class="col-xs-2 ">
                                                                <label>Register</label>
                                                            </div>
                                                        </div>
                                                        <div id="policyNumberTable" >

                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="step-3" class="" style="display:none">
                                                    <h4 id="policyNumberHeader"> </h4>
                                                    <br>
                                                    <div class="col-xs-6">
                                                        <div class="col-xs-12">
                                                            <div class="col-xs-12">
                                                                <span style="font-weight:500">Premium Breakdown</span>
                                                            </div>

                                                        </div>
                                                        <div class="col-xs-12">
                                                            <div id="premiumBreakdownOverviewForBind">
                                                            </div>
                                                        </div>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <div class="col-xs-12">
                                                            <div class="col-xs-3">
                                                                <span style="font-weight:500">Limit</span>
                                                            </div>
                                                            <div class="col-xs-6">
                                                                <span style="font-weight:500">Coverage</span>
                                                            </div>
                                                            <div class="col-xs-3">
                                                                <span style="font-weight:500">Deductible</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12">
                                                            <div id="limitsDeductOverviewForBind" style="font-size:12px; text-overflow: ellipsis ;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6">
                                                        <div class="col-xs-12" id="proposedDatesForBind">

                                                        </div>
                                                    </div>




                                                </div>
                                                <div id="step-4" class="" style="display:none">
                                                    <div class="col-xs-12">
                                                        <div class="col-xs-6">
                                                            <h4 id="submitBindPolicyNumber"></h4>
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <h4 id="submitBindNamedInsured"></h4>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-12">
                                                        <div class="col-xs-9" style="margin-bottom:40px;">
                                                            <div class="col-xs-12">
                                                                <span style="font-weight:500">Company</span><br>
                                                                <i class="fa fa-building" aria-hidden="true"></i>
                                                                <span class="DAOspan " data-daoName="Company-Name" >Company Name</span>
                                                                <br>
                                                                <span style="font-weight:500">Product</span><br>
                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                <span class="DAOspan" data-daoName="Product-Description" >Product Desc</span>
                                                            </div>
                                                            <div class="col-xs-6">
                                                                <span style="font-weight:500">Proposed Dates</span><br>
                                                                <i class="fa fa-calendar" aria-hidden="true"></i>
                                                                <span class="DAOspan dateDAO proposedEffective" data-daoName="Version-ProposedEffective" >10/19/2016</span> - <span class="DAOspan dateDAO proposedExpiration" data-daoName="Version-ProposedExpiration" >10/29/2016</span>
                                                            </div>
                                                            <div class="col-xs-2">
                                                                <span style="font-weight:500">Term</span><br>
                                                                <span class="DAOspan" data-daoName="Version-Term" >Term</span>
                                                            </div>
                                                            <div class="col-xs-2">
                                                                <span style="font-weight:500">Time</span><br>
                                                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                                                <span class="">12:01 AM</span>
                                                            </div>
                                                            <div class="col-xs-2">
                                                                <span style="font-weight:500">Binder Expires</span><br>
                                                                <span class="">Input</span>
                                                            </div>
                                                            <div class="col-xs-6">
                                                                <span style="font-weight:500">Billing Method</span><br>
                                                                <i class="fa fa-university" aria-hidden="true"></i>
                                                                <span class="">Input: (Agency Billed) / (Direct Bill / Insured Bill) / (Direct Bill / Company to Insured) / (Hybrid Bill)</span>
                                                            </div>
                                                            <div class="col-xs-6">
                                                                <span style="font-weight:500">Agent License</span><br>
                                                                <i class="fa fa-suitcase" aria-hidden="true"></i>
                                                                <span class="">Input</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3" style="margin-bottom:40px;">
                                                            <div class="col-xs-12">
                                                                <span style="font-weight:500">Premium</span><br>
                                                                <span class="DAOspan" data-daoName="Version-Premium" >$$$</span>
                                                                <br>
                                                                <span style="font-weight:500">TRIA</span><br>
                                                                <span class="DAOspan" data-daoName="Version-TerrorActStatus">Status</span>
                                                                <br>
                                                                <span style="font-weight:500">Fee (Taxable)</span><br>
                                                                <span class="DAOspan" data-daoName="Version-Non_Premium" >Fees</span>
                                                                <br>
                                                                <span style="font-weight:500">Fee (Non-Taxable)</span><br>
                                                                <span class="DAOspan" data-daoName="Version-NonTax_Premium" >Taxable Fee</span>
                                                                <br>
                                                                <span style="font-weight:500">Taxes</span><br>
                                                                <span class="DAOspan " data-daoName="Version-Tax1Name"></span> <span class="DAOspan " data-daoName="Version-Tax1" ></span><br>
                                                                <span class="DAOspan " data-daoName="Version-Tax2Name"></span> <span class="DAOspan " data-daoName="Version-Tax2" ></span><br>
                                                                %{--<span class="DAOspan " data-daoName="Version-Tax3Name"></span> <span class="DAOspan " data-daoName="Version-Tax3" ></span><br>--}%
                                                                %{--<span class="DAOspan " data-daoName="Version-Tax4Name"></span> <span class="DAOspan " data-daoName="Version-Tax4" ></span><br>--}%
                                                                %{--<br>--}%
                                                                <span style="font-weight:500">Premium Finance Fee</span><br>
                                                                <span class="" data-daoName="" >$$$$</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-9">
                                                            <div class="col-xs-4">
                                                                <span style="font-weight:500">Loc Info</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-4">
                                                                <span style="font-weight:500">EC</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-4">
                                                                <span style="font-weight:500">RE Cat</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-8">
                                                                <span style="font-weight:500">SIC</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-4">
                                                                <span style="font-weight:500">SIC ID</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-8">
                                                                <span style="font-weight:500">Finance Co</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-4">
                                                                <span style="font-weight:500">Finance Co ID</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-8">
                                                                <span style="font-weight:500">Contract Nbr</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-4">
                                                                <span style="font-weight:500">Contract ID</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-8">
                                                                <span style="font-weight:500">ISO Code</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                            <div class="col-xs-4">
                                                                <span style="font-weight:500">SLA</span><br>
                                                                <span>TBD</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <div class="col-xs-12">
                                                                <label>
                                                                    <input type="checkbox"> Order Inspection
                                                                </label>
                                                                <br>
                                                                <label>
                                                                    <input type="checkbox"> Rewrite
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox"> Subject to Audit
                                                                </label>
                                                                <br>
                                                                <label>
                                                                    <input type="checkbox"> Issue Confirmation
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox"> Courtesy - Invoice Taxes Only
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-10 col-xs-offset-1" style="margin-top:40px">
                                                        <div class="col-xs-4 col-xs-offset-4">
                                                            <button class="btn btn-primary form-control"
                                                                    type="button" id="bindFinalButton">Bind</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </g:if>
                        </div>
                    </div>

                </div>






            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-xs btn-danger pull-left reviewStatusChangeButton" data-currentStatusCode="" data-nextStatus=''
                        data-nextButtonText='Decline' id="reviewDeclineButton" >Decline</button>
                <button class="btn btn-default"  type="button" value="Close" data-dismiss="modal">Close</button>
                <button class="btn btn-primary"  type="button" value="Upload" >Save</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="certsModal">
    <div class="modal-dialog" role="document" style="width: 820px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Certificates</h4>
                <div id="certificateQuoteID" style="display:none"></div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title" style="font-size: 20px;">Additional Insureds List</h3>
                            </div>

                            <div class="panel-body">
                                <div class="row">
                                    <div id="additionalInsuredsList">
                                        <div class="col-xs-12">
                                            <div class="form-group">
                                                <label for="additionalInsuredsList">Select common Additional Insureds from the list below. The List includes the known certificate
                                                requirements for the listed entities. You may add to this list. Once you have successfully generated
                                                a correct certificate, click 'Save' and it will be added to the list below:</label>
                                            </div>
                                        </div>

                                        <div class="form-group col-xs-6">
                                            <label class="control-label"></label>
                                            <select class="form-control showReview" name="additionalInsured" data-reviewName="additionalInsured"
                                                    id="additionalInsuredList">
                                                <option value="invalid" selected="selected">Select Additional Insured</option>
                                                <g:each in="${additionalInsuredList}" var="a" status="i">
                                                    <option value="${a.id}" >${a.description}</option>
                                                </g:each>
                                            </select>
                                        </div>

                                        <div class="form-group col-xs-12">

                                            <input type="radio" name="additionalInsuredFilter"
                                                   class=""
                                                   value="All"
                                                   id="all"
                                                   checked="checked"> All
                                            <input type="radio" name="additionalInsuredFilter"
                                                   class=""
                                                   value="Rental House"
                                                   id="rentalHouse"
                                                   style="margin-left:10px;"> Rental House
                                            <input type="radio" name="additionalInsuredFilter"
                                                   class=""
                                                   value="Private Facility"
                                                   id="privateFacility"
                                                   style="margin-left:10px;"> Private Facility
                                            <input type="radio" name="additionalInsuredFilter"
                                                   class=""
                                                   value="Municipal/State"
                                                   id="municipalState"
                                                   style="margin-left:10px;"> Municipal/State
                                            <input type="radio" name="additionalInsuredFilter"
                                                   class=""
                                                   value="Other"
                                                   id="other"
                                                   style="margin-left:10px;"> Other
                                        </div>

                                        <div class="col-xs-12">
                                            <button type="button" class="btn btn-default" id="addInsuredButton">Add New Additional Insured</button>
                                        </div>
                                        <div class="col-xs-12" style="display:none" id="addInsuredDiv">
                                            <br>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <div class="form-group">
                                                        <label>Description</label>
                                                        <input class="form-control" type="text" id="descriptionInput" data-fieldName="description" placeholder="Description">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <div class="form-group">
                                                        <label>Operations</label>
                                                        <textarea class="form-control" rows="5" id="operationsInput" data-fieldName="ops" placeholder="Operations"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <div class="form-group">
                                                        <label>Additional Insured</label>
                                                        <textarea class="form-control" rows="5" id="additionaInsuredInput" data-fieldName="additionalInsured" placeholder="Additional Insured Name"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <button type="button" class="btn btn-primary" id="saveInsuredButton">Save</button>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        %{--OPERATIONSOPERATIONSOPERATIONSOPERATIONSOPERATIONSOPERATIONSOPERATIONSOPERATIONSOPERATIONS--}%


                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title" style="font-size: 20px;">Operations</h3>
                            </div>

                            <div class="panel-body">
                                <div id="operations">
                                    <div class="row">
                                        <div class="form-group col-xs-12">
                                            <textarea class="form-control" rows="5" id="operationTextArea">The certificate holder is named as an Additional Insured but solely as respects to claims arising out of negligence of the Named Insured and is Loss Payee for rented property as their interests may appear.
                                            </textarea>
                                        </div>

                                        <div class="form-group col-xs-12">
                                            <input type="radio" name="opsRadio"
                                                   class=""
                                                   value="stdLossPayee"
                                                   id="stdLossPayee"
                                                   checked="checked"> Std Loss Payee
                                            <input type="radio" name="opsRadio"
                                                   class=""
                                                   value="userDefined"
                                                   id="userDefined"
                                                   style="margin-left:10px;"> User Defined
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        %{--Additional InsuredAdditional InsuredAdditional InsuredAdditional InsuredAdditional InsuredAdditional InsuredAdditional InsuredAdditional Insured--}%


                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title" style="font-size: 20px;">Additional Insured</h3>
                            </div>

                            <div class="panel-body">
                                <div id="additionalInsured">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <div class="form-group">
                                                <p class="control-label"><input type="checkbox" class="evidenceOfInsuranceCheckbox showReview"
                                                                                data-reviewName="Evidence Of Insurance" name="evidenceOfInsurance"
                                                                                value="Evidence of Insurance"
                                                                                id="evidenceOfInsurance"/> Evidence of Insurance</p>
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12">
                                            <textarea class="form-control" rows="5" id="AITextArea"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        %{--Certificate FormatCertificate FormatCertificate FormatCertificate FormatCertificate FormatCertificate FormatCertificate FormatCertificate FormatCertificate Format--}%


                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title" style="font-size: 20px;">Certificate Format</h3>
                            </div>

                            <div class="panel-body">
                                <div class="form-group col-xs-12">
                                    <input type="radio" name="attachSummary"
                                           class=""
                                           value="attachSummary"
                                           id="attachSummary"
                                           checked="checked"
                                           style="margin-left:10px;"> Attach Summary
                                    <input type="checkbox" name="useAcordForm"
                                           class=""
                                           value="useAcordForm"
                                           id="useAcordForm"
                                           style="margin-left:10px;"
                                            checked="checked"> Use ACORD form(s) for AI or Waiver
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Done</button>
                <button class="btn btn-primary" id="createCertButton" type="button" value="Upload" >Create Certificate</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="progressBarModal_cert" style="pointer-events: none;">
    <div class="modal-dialog" role="document" style="margin-top:200px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="progressBarHeader_cert">Please wait, your submission is being processed.</h4>
            </div>
            <div class="modal-body">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                        <span class="sr-only">60% Complete</span>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</body>