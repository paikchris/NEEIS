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
    </div>
    <div class="col-xs-4 ">
        %{--<g:link action="downloadPDF" style="" id="hiddenCertButton">--}%
            %{--<img src="/portal/images/pdfIcon.png" height="32" width="32"> Download Cert</img>--}%
        %{--</g:link>--}%
        <div class="input-group">
            <input type="text" class="form-control" id="submissionSearch" placeholder="Search">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button">Search</button>
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
                <li><a href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Submission Received</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-transfer" aria-hidden="true"></span> Processing / Binding</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-alert" aria-hidden="true"></span> Missing Information</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span> Approved</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Declined</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span> Expired</a></li>
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

                                    <th scope="row"><a href="./../main/submissionView?s=${s.aimQuoteID}" class="aimQuoteIDTD">${s.aimQuoteID}</a></th>
                                    <td class="namedInsuredTD">${s.namedInsured}</td>
                                    <td class="coveragesTD">${s.coverages}</td>
                                    <td  class="submittedByTD">${s.submittedBy}</td>
                                    <td  class="submitDateTD">${s.submitDate}</td>
                                    <td class="submissionStatusTD"><g:if test="${s.statusCode == "NBR"}">
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
                                        <g:elseif test="${s.statusCode == "BIF"}">
                                            Bound
                                        </g:elseif></td>


                                    <td class="underwriterTD"><g:if test="${user.userRole == "Broker"}">
                                        ${s.underwriter}
                                    </g:if>
                                    <g:elseif test="${user.userRole == "Underwriter"}">
                                        ${s.underwriter}
                                    </g:elseif>
                                    </td>
                                    <td><a href="./../web-app/attachments/testpdf.pdf">my link</a></td>

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
<script src="${resource(dir: 'js', file: 'submissions.js')}"></script>
<script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}"></script>
</body>