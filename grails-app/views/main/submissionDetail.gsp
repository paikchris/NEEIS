<!DOCTYPE html>
<html lang="en">
<head>
    <script src="${resource(dir: 'js', file: "submissionDetail.js?ts=" + new Date().getTime())}"></script>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'submissionDetail.css')}" type="text/css">

    <style>
    .submissionOptionButton{
        margin-left: 10px;
        margin-right: 10px;
    }
    table.table{
        font-size:13px;
    }
    table.table>tbody>tr.submissionRow:hover{
        background-color:rgba(123, 172, 190, 0.21);
    }
    table.table>tbody>tr.versionRow:hover{
        background-color:rgba(50, 174, 3, 0.26);
    }
    .statusChangeButton:disabled{
        cursor:default;
    }

    .fa{
        margin-right:4px;
    }
    .submissionQuickOptions{
    }

    .table>tbody>tr.versionRow>td, .table>tbody>tr.versionRow>th{
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 15px;
        font-size: 11px;
    }
    .table>tbody>tr.versionRow>td>span, .table>tbody>tr.versionRow>th>span{
        font-size: 11px;
    }
    .table>tbody>tr.versionRow{
        background-color: rgba(157, 198, 164, 0.26);
    }

    </style>

    <script>
        var qR = ${raw(quoteRecordJSON)}
        var vR = ${raw(versionRecordsJSON)}
        var dVR = ${raw(dvVersionRecordsJSON)}
        var dVV = ${raw(dvVersionViewJSON)}
        var sR = ${raw(submissionRecordJSON)}
        var vAM = ${raw(questionAnswerMapJSON)}
        var vAOM = ${raw(questionAnswerOrganizedMapJSON)}

    </script>
</head>

<body>
%{--HEADER--}%
<div class="row" style="margin-top:30px; margin-bottom:30px;">
    <div class="col-xs-4">
        <h3 style=" color: rgba(0, 0, 0, 0.57); margin-top:0px; margin-bottom:0px;">Submission Detail</h3>
        <g:if test="${user.userRole == "Broker"}">
            <span>Broker View</span>
        </g:if>
        <g:elseif test="${user.userRole == "Underwriter"}">
            <span>Underwriter View</span>
        </g:elseif>
    </div>
    <div class="col-xs-4 ">
    </div>
    <div class="col-xs-4">
    </div>
</div>

%{----}%
<div class="row" id="submissionBasicDetailContainer" >
    <div class="row">
        <div class="col-xs-12">
            <h2>${quoteRecord.NamedInsured}</h2>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-6">
            <div class="col-xs-3 infoLabel">
                <label>ID:</label>
            </div>
            <div class="col-xs-9">
                <span>${quoteRecord.QuoteID}</span>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="col-xs-3 infoLabel">
                <label>Status:</label>
            </div>
            <div class="col-xs-9">
                <span>${quoteRecord.StatusID}</span>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="col-xs-3 infoLabel">
                <label>Address:</label>
            </div>
            <div class="col-xs-9">
                <span>${quoteRecord.Address1}${quoteRecord.Address2}</span><br>
                <span>${quoteRecord.City}, ${quoteRecord.State} ${quoteRecord.Zip}</span>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="col-xs-3 infoLabel">
                <label>Attention:</label>
            </div>
            <div class="col-xs-9">
                <span>${quoteRecord.ProducerID} - ${quoteRecord.Attention}</span>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="col-xs-3 infoLabel">
                <label>Coverage:</label>
            </div>
            <div class="col-xs-9">
                <span>${quoteRecord.CoverageID}</span>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="col-xs-3 infoLabel">
                <label>Underwriter:</label>
            </div>
            <div class="col-xs-9">
                <span>${quoteRecord.AcctExec}</span>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="col-xs-3 infoLabel">
                <label>Operation:</label>
            </div>
            <div class="col-xs-9">
                <span>${submissionRecord.operationType}</span>
            </div>
        </div>
    </div>




</div>
<div class="row" id="submissionVersionsContainer">
    <div class="row">
        <div class="col-xs-12">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist" style="">
                <g:each var="version" in="${versionRecords}" status="index">
                    <li role="presentation" class=" <g:if test="${index == 0}"> active </g:if>">
                        <a href="#version${version.Version}Page" aria-controls="version${version.Version}Page" role="tab" data-toggle="tab">Version ${version.Version}</a>
                    </li>
                </g:each>

            </ul>

            <!-- Tab panes -->
            <div class="tab-content" style="background: rgba(27, 110, 170, 0.11); border-radius:6px">
                <g:each var="version" in="${versionRecords}" status="index">
                    <div role="tabpanel" class="tab-pane fade in <g:if test="${index == 0}"> active </g:if>" id="version${version.Version}Page"
                        style="padding-top:24px; padding-bottom:24px">
                        <div class="row" style="padding-bottom:24px">
                            <div class="col-xs-12">
                                <div class="col-xs-12">
                                    <button type="button" class="btn btn-sm btn-success createNewVersionButton"  style=""
                                            onclick="" data-versionid="${version.Version}">
                                        <i class="fa fa-file-o" aria-hidden="true"></i>
                                        Create New Version Using Version ${version.Version}
                                    </button>
                                    <button type="button" class="btn btn-sm btn-primary" id="" style=""
                                            onclick="">
                                        <i class="fa fa-check" aria-hidden="true"></i>
                                        Approve Version ${version.Version} Indication
                                    </button>
                                    <button type="button" class="btn btn-sm btn-primary" id="" style=""
                                            onclick="">
                                        <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                                        Approve Version ${version.Version} Quote
                                    </button>
                                    <button type="button" class="btn btn-sm btn-primary" id="" style=""
                                            onclick="">
                                        <i class="fa fa-handshake-o" aria-hidden="true"></i>
                                        Bind Version ${version.Version}
                                    </button>
                                    <button type="button" class="btn btn-sm btn-primary" id="" style=""
                                            onclick="">
                                        <i class="fa fa-handshake-o" aria-hidden="true"></i>
                                        Bind Version ${version.Version}
                                    </button>
                                </div>
                            </div>
                        </div>

                        %{--VERISION BASIC DETAILS--}%
                        <div class="row">
                            <div class="col-xs-6">
                                <div class="col-xs-3 infoLabel">
                                    <label>Term Length:</label>
                                </div>
                                <div class="col-xs-9">
                                    <span>${version.PolicyTerm}</span>
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="col-xs-3 infoLabel">
                                    <label>Product:</label>
                                </div>
                                <div class="col-xs-9">
                                    <span>${version.ProductID}</span>
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="col-xs-3 infoLabel">
                                    <label>Status:</label>
                                </div>
                                <div class="col-xs-9">
                                    <span>${version.StatusID}</span>
                                </div>
                            </div>
                        </div>
                        %{--VERSION PREMIUM SUMMARY--}%
                        <div class="row" style="padding-top:20px;">
                            <div class="col-xs-12">
                                <div class="col-xs-12">
                                    <h4>Premium Summary</h4>
                                </div>
                            </div>
                            %{--VERSION COVERAGE PREMIUM--}%
                            <div class="col-xs-12">
                                <div class="col-xs-6">
                                    <span>${dvVersionRecords[index].CoverageName}</span>
                                </div>
                                <div class="col-xs-6">
                                    <span>${dvVersionRecords[index].Premium}</span>
                                </div>
                            </div>
                            %{--TAX LINES--}%
                            <g:if test="${version.Tax1Name.size() > 0}">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        <span>${version.Tax1Name}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span>${dvVersionRecords[index].Tax1}</span>
                                    </div>
                                </div>
                            </g:if>
                            <g:if test="${version.Tax2Name.size() > 0}">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        <span>${version.Tax2Name}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span>${dvVersionRecords[index].Tax2}</span>
                                    </div>
                                </div>
                            </g:if>
                            <g:if test="${version.Tax3Name.size() > 0}">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        <span>${version.Tax3Name}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span>${dvVersionRecords[index].Tax3}</span>
                                    </div>
                                </div>
                            </g:if>
                            <g:if test="${version.Tax4Name.size() > 0}">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        <span>${version.Tax4Name}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span>${dvVersionRecords[index].Tax4}</span>
                                    </div>
                                </div>
                            </g:if>
                            <g:if test="${version.Tax5Name.size() > 0}">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        <span>${version.Tax5Name}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span>${dvVersionRecords[index].Tax5}</span>
                                    </div>
                                </div>
                            </g:if>
                            <g:if test="${version.Tax6Name.size() > 0}">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        <span>${version.Tax6Name}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span>${dvVersionRecords[index].Tax6}</span>
                                    </div>
                                </div>
                            </g:if>
                            <g:if test="${version.Tax7Name.size() > 0}">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        <span>${version.Tax7Name}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span>${dvVersionRecords[index].Tax7}</span>
                                    </div>
                                </div>
                            </g:if>
                            <g:if test="${version.Tax8Name.size() > 0}">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        <span>${version.Tax8Name}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span>${dvVersionRecords[index].Tax8}</span>
                                    </div>
                                </div>
                            </g:if>
                            %{--POLICY FEES--}%
                            <g:if test="${version.FeeSchedule.size() > 0}">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        <span>${version.FeeSchedule.split("\n")[0].split("\t")[0]}</span>
                                    </div>
                                    <div class="col-xs-6">
                                        <span>${version.FeeSchedule.split("\n")[0].split("\t")[1]}</span>
                                    </div>
                                </div>
                            </g:if>
                            %{--POLICY TOTAL--}%
                            <div class="col-xs-12">
                                <div class="col-xs-6">
                                    <span style="font-weight:700">Total</span>
                                </div>
                                <div class="col-xs-6">
                                    <span style="font-weight:700">${dvVersionRecords[index].Total}</span>
                                </div>
                            </div>
                        </div>
                        %{--VERSION TOTALS--}%
                        <div class="row" style="padding-top:20px;">
                            <div class="col-xs-12">
                                <div class="col-xs-12">
                                    <h4>Totals</h4>
                                </div>
                            </div>
                            %{--VERSION COVERAGE PREMIUM--}%
                            <div class="col-xs-12">
                                <div class="col-xs-6">
                                    <span>Premium</span>
                                </div>
                                <div class="col-xs-6">
                                    <span>${version.Premium}</span>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div class="col-xs-6">
                                    <span>Tax</span>
                                </div>
                                <div class="col-xs-6">
                                    <span>${dvVersionView[index].TotalTax}</span>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div class="col-xs-6">
                                    <span>Fees</span>
                                </div>
                                <div class="col-xs-6">
                                    <span>${dvVersionView[index].TotalFees}</span>
                                </div>
                            </div>

                        </div>
                        %{--COVERAGE DETAIL--}%
                        <div class="row" style="padding-top:20px;">
                            <div class="col-xs-12">
                                <div class="col-xs-12">
                                    <h4>${dvVersionView[index].CoverageName} - ${dvVersionView[index].ProductID} - ${dvVersionView[index].Premium} </h4>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div class="col-xs-12">
                                    <span style="font-weight:700">Limits </span>
                                </div>
                            </div>
                            %{--COVERAGE LIMITS--}%
                            <g:each var="limit" in="${dvVersionRecords[index].Limits.split("\n")}" status="limitIndex">
                                <g:if test="${limit.trim().size() >0}">
                                    <div class="col-xs-12">
                                        <div class="col-xs-6">
                                            <span>${limit.split("\t")[0]}</span>
                                        </div>
                                        <div class="col-xs-6">
                                            <span>${limit.split("\t")[1]}</span>
                                        </div>
                                    </div>
                                </g:if>
                            </g:each>
                            %{--COVERAGE DEDUCTIBLES--}%
                            <div class="col-xs-12" style="margin-top:20px">
                                <div class="col-xs-12">
                                    <span style="font-weight:700">Deductibles </span>
                                </div>
                            </div>
                            <g:each var="deduct" in="${dvVersionRecords[index].Deductible.split("\n")}" status="deductIndex">
                                <g:if test="${deduct.trim().size() >0}">
                                    <div class="col-xs-12">
                                        <div class="col-xs-6">
                                            <span>${deduct.split("\t")[0]}</span>
                                        </div>
                                        <div class="col-xs-6">
                                            <span>${deduct.split("\t")[1]}</span>
                                        </div>
                                    </div>
                                </g:if>
                            </g:each>
                            %{--COVERAGE TERMS--}%
                            <div class="col-xs-12" style="margin-top:20px">
                                <div class="col-xs-12">
                                    <span style="font-weight:700">Terms </span>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div class="col-xs-12">
                                    <span style="white-space: pre-line">${version.Subject}</span>
                                </div>
                            </div>
                            %{--COVERAGE FORMS--}%
                            <div class="col-xs-12" style="margin-top:20px">
                                <div class="col-xs-12">
                                    <span style="font-weight:700">Forms </span>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div class="col-xs-12">
                                    <span style="white-space: pre-line">${version.Endorsement}</span>
                                </div>
                            </div>
                            %{--COVERAGE RATE INFO--}%
                            <div class="col-xs-12" style="margin-top:20px">
                                <div class="col-xs-12">
                                    <span style="font-weight:700">Rating </span>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div class="col-xs-12">
                                    <span style="white-space: pre-line">${version.Endorsement}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </g:each>

            </div>
        </div>
    </div>


</div>


</body>