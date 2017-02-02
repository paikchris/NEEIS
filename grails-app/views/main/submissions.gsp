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
        <div id="additionalInsuredListHidden" style="display:none">${additionalInsuredList}</div>
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
                                <g:if test="${user.userRole == "Broker"}">
                                    <th scope="row"><a href="#" class="aimQuoteIDTD">${s.aimQuoteID}</a></th>
                                </g:if>
                                <g:elseif test="${user.userRole == "Underwriter"}">
                                    <th scope="row"><a href="./../main/submissionView?s=${s.aimQuoteID}" class="aimQuoteIDTD">${s.aimQuoteID}</a></th>
                                </g:elseif>

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

<script src="${resource(dir: 'js', file: 'submissions.js')}"></script>
<script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}"></script>
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
                                                                                value="Evidence of Insurance"/> Evidence of Insurance</p>
                                            </div>
                                        </div>
                                        <div class="form-group col-xs-12">
                                            <textarea class="form-control" rows="5" id="AITextArea">The certificate holder is named as an Additional Insured but solely as respects to claims arising out of negligence of the Named Insured and is Loss Payee for rented property as their interests may appear.
                                            </textarea>
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
                                           style="margin-left:10px;"> Use ACORD form(s) for AI or Waiver
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary">Done</button>
                <button class="btn btn-primary" id="createCertButton" type="button" value="Upload" >Create Certificate</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</body>