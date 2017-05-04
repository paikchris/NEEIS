<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'newSubmissionConfirm.css')}" type="text/css">

</head>

<body>
<h1>Submitted</h1>
<br>
<div class="col-xs-6 col-xs-offset-3">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-3">
                    Submission ID
                </strong>
                <div class="col-xs-9">
                    <g:if test="${user.userRole == "Broker"}">
                        <g:each status="i" var="s" in="${submissionIDs.split(",")}">
                            <a href="#" class="quoteIDLink">${s}</a>
                            <br>
                        </g:each>
                    </g:if>
                    <g:elseif test="${user.userRole == "Underwriter"}">
                        <g:each status="i" var="s" in="${submissionIDs.split(",")}">
                            <a href="#" class="quoteIDLink">${s}</a>
                            <br>
                        </g:each>
                    </g:elseif>

                </div>
            </div>
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-3">
                    Coverages
                </strong>
                <div class="col-xs-9">
                    ${coverages}
                </div>
            </div>
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-3">
                    Named Insured
                </strong>
                <div class="col-xs-9">
                    ${submission[0].namedInsured}
                </div>
            </div>
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-3">
                    Submitted By
                </strong>
                <div class="col-xs-9">
                    ${submission[0].submittedBy}
                </div>
            </div>
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-3">
                    Date
                </strong>
                <div class="col-xs-9">
                    ${submission[0].submitDate}
                </div>
            </div>

            <div class="row" style="padding-bottom: 6px;">
                <g:if test="${pdfError == "true"}">
                </g:if>
                <g:else>
                    <strong class="col-xs-3">
                        PDF
                    </strong>
                    <div class="col-xs-9">
                    <g:link url="./../main/downloadPDF?q=${submissionIDs.split(",")[0]}" >
                        <img src="/images/pdfIcon.png" height="32" width="32"> Download PDF</img>
                    </g:link>
                    </div>
                </g:else>
            </div>

            <div class="row" id="attachmentRowsContainer" style="margin-top:30px;padding-bottom: 6px;">
                %{--<strong class="col-xs-3">--}%
                    %{--Attachments--}%
                %{--</strong>--}%
                %{--<div class="col-xs-9">--}%
                    %{--<div>--}%

                    %{--</div>--}%
                %{--</div>--}%
            </div>

            <div class="row" style="margin-top:50px;">
                <div class="col-xs-6 col-xs-offset-3">
                    <a href="./../main/submissions.gsp"><button class="btn btn-primary btn-lg nextBtn " type="button" id="nextButtonStep1" style="
                    width: 100%;">OK</button></a>

                </div>
            </div>


        </div>
    </div>
</div>

<script src="${resource(dir: 'js', file: 'newSubmissionConfirm.js')}"></script>
<script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}"></script>
</body>
