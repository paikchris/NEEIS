<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'newSubmissionConfirm.css')}" type="text/css">

</head>

<body>
<h1>Submitted</h1>
<br>
<div class="col-xs-4 col-xs-offset-4">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-4">
                    Submission ID
                </strong>
                <div class="col-xs-8">
                    <g:if test="${user.userRole == "Broker"}">
                        <g:each status="i" var="s" in="${submissionIDs.split(",")}">
                            <a href="#">${s}</a>
                            <br>
                        </g:each>
                    </g:if>
                    <g:elseif test="${user.userRole == "Underwriter"}">
                        <g:each status="i" var="s" in="${submissionIDs.split(",")}">
                            <a href="./../main/submissionView?s=${s}">${s}</a>
                            <br>
                        </g:each>
                    </g:elseif>

                </div>
            </div>
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-4">
                    Coverages
                </strong>
                <div class="col-xs-8">
                    ${coverages}
                </div>
            </div>
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-4">
                    Named Insured
                </strong>
                <div class="col-xs-8">
                    ${submission[0].namedInsured}
                </div>
            </div>
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-4">
                    Submitted By
                </strong>
                <div class="col-xs-8">
                    ${submission[0].submittedBy}
                </div>
            </div>
            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-4">
                    Date
                </strong>
                <div class="col-xs-8">
                    ${submission[0].submitDate}
                </div>
            </div>

            <div class="row" style="padding-bottom: 6px;">
                <strong class="col-xs-4">
                    PDF
                </strong>
                <div class="col-xs-8">
                    <g:link url="./../main/downloadPDF?q=${submissionIDs.split(",")[0]}" >
                        <img src="/portal/images/pdfIcon.png" height="32" width="32"> Download PDF</img>
                    </g:link>
                </div>
            </div>
            <div class="row" style="margin-top:50px;">
                <div class="col-xs-12 ">
                    <a href="./../main/submissions.gsp"><button class="btn btn-primary nextBtn pull-right" type="button" id="nextButtonStep1">OK</button></a>

                </div>
            </div>


        </div>
    </div>
</div>

<script src="${resource(dir: 'js', file: 'newSubmissionConfirm.js')}"></script>
<script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}"></script>
</body>