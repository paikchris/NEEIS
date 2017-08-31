<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'submissionView.css')}" type="text/css">

</head>

<body>
<div class="row">
    <div class="col-xs-12" style="margin-bottom: 20px;">
        <div class="btn-group " role="group" aria-label="...">
            <button type="button" id="submissionDetail_Button" class="btn btn-default submissionViewButton">Detail</button>
            <button type="button" id="submissionCoverages_Button" class="btn btn-default submissionViewButton">Coverages</button>
            <button type="button" id="submissionActivity_Button" class="btn btn-default submissionViewButton">Activity</button>
            <button type="button" id="submissionNotes_Button" class="btn btn-default submissionViewButton">Notes</button>
            <button type="button" id="submissionPolicy_Button" class="btn btn-default submissionViewButton">Policy Data</button>
            <button type="button" id="submissionAccounting_Button" class="btn btn-default submissionViewButton">Accounting</button>
        </div>
    </div>
</div>


<div class="panel panel-primary submissionViewPanel" id="submissionDetail_Panel">
    <div class="panel-heading">
        <h3 class="panel-title" style="font-size: 20px;">Submission Detail - #${record.QuoteID}</h3>
    </div>
    <div class="panel-body">
        <div class="col-xs-12">
            <div class="col-xs-3">
                <div class="form-group has-feedback">
                    <label>Policy ID</label>
                    <g:textField type="text"  class="form-control input-sm" id="policyNumber" name="policyNumber" value="${record.PolicyID}" disabled="true"/>
                </div>
            </div>
            <div class="col-xs-1">
                <div class="form-group">
                    <label>Version</label>
                    <g:textField type="text" class="form-control input-sm" name="policyVersion"  value="${record.PolicyVer}"/>
                </div>
            </div>
            <div class="col-xs-2">
                <div class="form-group">
                    <label>Effective</label>
                    <g:textField type="text" class="form-control input-sm" name="effective"  value="${record.Effective}"/>
                </div>
            </div>
            <div class="col-xs-2">
                <div class="form-group">
                    <label>Time</label>
                    <g:textField type="text" class="form-control input-sm" name="boundTime"  value="${record.BoundTime}"/>
                </div>
            </div>
            <div class="col-xs-2">
                <div class="form-group">
                    <label>Expiration</label>
                    <g:textField type="text" class="form-control input-sm" name="expiration"  value="${record.Expiration}"/>
                </div>
            </div>
            <div class="col-xs-1">
                <div class="form-group">
                    <label>Status</label>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.PolicyStatusID}"/>
                </div>
            </div>
        </div>

        <div class="col-xs-12" style="margin-bottom:20px;border-bottom: 1px solid">
        </div>


        <div class="col-xs-6">
            <div class="col-xs-6">
                <div class="form-group has-feedback">
                    <label>Retail Agent</label>
                    <g:textField type="text"  class="form-control input-sm" id="producerName" name="producerName" value="${record.ProducerName}" />
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group ">
                    <label>Attn</label>
                    <g:textField type="text"  class="form-control input-sm" id="attention" name="attention" value="${record.Attention}" />
                </div>
            </div>

            <div class="col-xs-12">
                <div class="form-group ">
                    <label>Named Insured</label>
                    <g:textField type="text"  class="form-control input-sm" id="namedInsured" name="namedInsured" value="${record.NamedInsured}" />
                </div>
            </div>

            <div class="col-xs-12">
                <div class="form-group ">
                    <label class="control-label">Mailing Address <span style="color:red;">*</span> </label>
                    <input class="form-control input-sm " type="text" placeholder="Street address" name="streetNameMailing" id="googleAutoAddress" onFocus="geolocate()" value="${record.MailAddress1}"/>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group">
                    <input class="form-control input-sm" type="text" placeholder = "City" name="cityMailing" id="cityMailing" value="${record.MailCity}"/>
                </div>
            </div>
            <div class="col-xs-3">
                <div class="form-group">
                    <input class="form-control input-sm" type="text" placeholder = "Zip Code" name="zipCodeMailing" id="zipCodeMailing" value="${record.MailZip}"/>
                </div>
            </div>
            <div class="col-xs-3">
                <div class="form-group">
                    <input class="form-control input-sm" type="text" placeholder = "State" name="stateMailing" id="stateMailing" value="${record.MailState}"/>
                </div>
            </div>
        </div>

        <div class="col-xs-6">
            <div class="col-xs-10">
                <div class="form-group ">
                    <label>Market Company</label>
                    <g:textField type="text"  class="form-control input-sm" id="marketName" name="marketName" value="${record.MarketName}" />
                </div>
            </div>
            <div class="col-xs-2">
                <div class="form-group ">
                    <label>Market ID</label>
                    <g:textField type="text"  class="form-control input-sm" id="marketID" name="marketID" value="${record.MarketID}" />
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group ">
                    <label>Coverage</label>
                    <g:textField type="text"  class="form-control input-sm" id="coverageName" name="coverageName" value="${record.CoverageName}" />
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group ">
                    <label>Operations</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.Description}" />
                </div>
            </div>

        </div>

        <div class="col-xs-12" style="margin-bottom:20px;border-bottom: 1px solid">
        </div>
        <br>

        <div class="col-xs-6">
            <div class="col-xs-6">
                <div class="form-group ">
                    <label>Received</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.Received}" />
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group ">
                    <label>Acknowledged</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.Acknowledged}" />
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group ">
                    <label>Quoted</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.Quoted}" />
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group ">
                    <label>Bound</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.Bound}" />
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group ">
                    <label>Policy Mailed</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.PolicyMailOut}" />
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group ">
                    <label>Invoiced</label>
                    <g:textField type="text"  class="form-control input-sm" id="invoicedDate" name="invoicedDate" value="${record.InvoiceDate}" />
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group ">
                    <label>Cancelled</label>
                    <g:textField type="text"  class="form-control input-sm" id="cancelTime" name="cancelTime" value="${record.CancelTime}" />
                </div>
            </div>
        </div>

        <div class="col-xs-6">
            <div class="col-xs-6">
                <div class="col-xs-12">
                    <div class="form-group ">
                        <label>Premium</label>
                        <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.BndPremium}" />
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group ">
                        <label>Fees</label>
                        <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.BndFee}" />
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group ">
                        <label>TRIA</label>
                        <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="" />
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group ">
                        <label>Taxes</label>
                        <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="" />
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group ">
                        <label>Total</label>
                        <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="" />
                    </div>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="col-xs-12">
                    <div class="form-group ">
                        <label>Gross</label>
                        <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.GrossComm}" />
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group ">
                        <label>Agt.</label>
                        <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.AgentComm}" />
                    </div>
                </div>
            </div>

        </div>

        <div class="col-xs-12" style="margin-bottom:20px;border-bottom: 1px solid">
        </div>
        <br>

        <div class="col-xs-12">
            <div class="col-xs-1">
                <div class="form-group ">
                    <label>Team Dept.</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.TeamID}" />
                </div>
            </div>
            <div class="col-xs-3">
                <div class="form-group ">
                    <label>Account Exec</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="${record.AcctExec}" />
                </div>
            </div>
            <div class="col-xs-3">
                <div class="form-group ">
                    <label>Mktg Rep</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="" />
                </div>
            </div>
            <div class="col-xs-3">
                <div class="form-group ">
                    <label>TA/CSR</label>
                    <g:textField type="text"  class="form-control input-sm" id="operations" name="operations" value="" />
                </div>
            </div>

        </div>



    </div>
</div>

<div class="panel panel-primary submissionViewPanel" id="submissionCoverages_Panel" style="display:none">
    <div class="panel-heading">
        <h3 class="panel-title" style="font-size: 20px;">Coverages - #${record.QuoteID}</h3>
    </div>
    <div class="panel-body">
        <div class="col-xs-6">
            <div class="col-xs-10">
                <div class="form-group has-feedback">
                    <label>Risk Company</label>
                    <g:textField type="text"  class="form-control input-sm" id="policyNumber" name="policyNumber" value="${record.CompanyName}" disabled="true"/>
                </div>
            </div>
            <div class="col-xs-2">
                <div class="form-group">
                    <label>ID</label>
                    <g:textField type="text" class="form-control input-sm" name="effective"  value="${record.VersionCompanyID}"/>
                </div>
            </div>
            <div class="col-xs-10">
                <div class="form-group">
                    <label>Product</label>
                    <g:textField type="text" class="form-control input-sm" name="policyVersion"  value="${record.CoverageName}"/>
                </div>
            </div>

            <div class="col-xs-2">
                <div class="form-group">
                    <label>ID</label>
                    <g:textField type="text" class="form-control input-sm" name="boundTime"  value="${record.ProductID}"/>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group">
                    <label>TRIA Coverage</label>
                    <g:textField type="text" class="form-control input-sm" name="expiration"  value="${record.TerrorActStatus}"/>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group">
                    <label>TRIA Premium</label>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.TerrorActPremium}"/>
                </div>
            </div>
        </div>

        <div class="col-xs-4">
            <div class="col-xs-12">
                <div class="form-group has-feedback">
                    <label>Rate</label>
                    <g:textField type="text"  class="form-control input-sm" id="policyNumber" name="policyNumber" value="${record.VersionRate}" disabled="true"/>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group has-feedback">
                    <label>Co-Insure</label>
                    <g:textField type="text"  class="form-control input-sm" id="policyNumber" name="policyNumber" value="${record.VersionCoInsure}" disabled="true"/>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group has-feedback">
                    <label>MEP</label>
                    <g:textField type="text"  class="form-control input-sm" id="policyNumber" name="policyNumber" value="${record.VersionMEP}" disabled="true"/>
                </div>
            </div>
        </div>
        <div class="col-xs-2">
            <div class="col-xs-12">
                <div class="form-group has-feedback">
                    <g:checkBox name="myCheckbox" value="${record.DirectBillFlag.equals("Y")}" /> <label>Direct Bill</label> <br>
                    <g:checkBox name="myCheckbox" value="${record.Brokerage.equals("Y")}" /> <label>Brokerage</label><br>
                    <g:checkBox name="myCheckbox" value="${record.Indicator.equals("Y")}" /> <label>Indication</label><br>
                    <g:checkBox name="myCheckbox" value="${record.FlagSubjectToAudit.equals("Y")}" /> <label>Audit</label><br>
                    <g:checkBox name="myCheckbox" value="${record.Taxed.equals("Y")}" /> <label>Taxed</label><br>
                    <g:checkBox name="myCheckbox" value="${record.ReinsuranceFlag.equals("Y")}" /> <label>Reinsurance</label><br>
                    <g:checkBox name="myCheckbox" value="${record.Financed.equals("Y")}" /> <label>Financed</label><br>
                    <g:checkBox name="myCheckbox" value="${record.Renewal.equals("Y")}" /> <label>Renewal</label><br>
                    <g:checkBox name="myCheckbox" value="${record.FlagRPG.equals("Y")}" /> <label>Risk Purchasing Group</label>
                </div>
            </div>

        </div>

        <div class="col-xs-12">
            %{--LIMITS--}%
            <div class="col-xs-2">
                <div class="form-group">
                    <label>Limits</label>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Limit1}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Limit2}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Limit3}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Limit4}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Limit5}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Limit6}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Limit7}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Limit8}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Limit9}"/>
                </div>
            </div>
            <div class="col-xs-4">
                <div class="form-group">
                    <label>-</label>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage1}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage2}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage3}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage4}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage5}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage6}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage7}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage8}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage9}"/>
                </div>
            </div>

            %{--DEDUCTIBLES--}%
            <div class="col-xs-2">
                <div class="form-group">
                    <label>Deductibles</label>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Deduct1}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Deduct2}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="?"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="?"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="?"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="?"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="?"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="?"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="?"/>
                </div>
            </div>
            <div class="col-xs-4">
                <div class="form-group">
                    <label>-</label>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_DeductType1}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_DeductType2}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage3}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage4}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage5}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage6}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage7}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage8}"/>
                    <g:textField type="text" class="form-control input-sm" name="policyStatus"  value="${record.LOB_Coverage9}"/>
                </div>
            </div>

            <div class="col-xs-12">
                <div class="form-group">
                    <label>Subject</label>
                    <textarea class="form-control" rows="5" id="comment" >${record.Subject}</textarea>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Endorsement</label>
                    <textarea class="form-control" rows="5" id="comment" >${record.Endorsement}</textarea>
                </div>
            </div>
        </div>

        <div class="col-xs-12" style="margin-bottom:20px;border-bottom: 1px solid">
        </div>

    </div>
</div>



<div class="panel panel-primary submissionViewPanel" id="submissionActivity_Panel" style="display:none">
    <div class="panel-heading">
        <h3 class="panel-title" style="font-size: 20px;">Activty - #${record.QuoteID}</h3>
    </div>
    <div class="panel-body">
        <div class="col-xs-12">
            <div class="pull-right">
                %{--<div class="btn-group">--}%
                    %{--<button type="button" class="btn btn-default btn-filter" data-target="all">All</button>--}%
                    %{--<button type="button" class="btn btn-success btn-filter" data-target="E">Email</button>--}%
                    %{--<button type="button" class="btn btn-warning btn-filter" data-target="I">Invoice</button>--}%
                    %{--<button type="button" class="btn btn-danger btn-filter" data-target="M">Mail</button>--}%
                    %{--<button type="button" class="btn btn-default btn-filter" data-target="S">Suspense</button>--}%
                    %{--<button type="button" class="btn btn-default btn-filter" data-target="binders">Binders</button>--}%
                    %{--<button type="button" class="btn btn-default btn-filter" data-target="mktsubmits">Mkt Submits</button>--}%
                    %{--<button type="button" class="btn btn-default btn-filter" data-target="file">File Activity</button>--}%

                %{--</div>--}%
            </div>
        </div>
        <div class="col-xs-12">
            <div class="table-container pre-scrollable">
                <table class="table table-filter">
                    <thead class="thead-inverse">
                    <tr>
                        <th>TypeID</th>
                        <th>NoteIcon</th>
                        <th>AttachmentIcon</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>UserID</th>
                        <th>ImageID</th>
                        <th>Folder</th>
                        <th>StatusID</th>
                        <th>TypeID</th>
                        <th>ReferenceID</th>
                        <th>TransID</th>
                        <th>TemplateID</th>
                        <th>Email Date</th>
                        <th>FlagDist</th>
                        <th>QuoteVersion</th>
                        <th>ToNameKey</th>
                        <th>ServerDate</th>
                        <th>SortDate</th>
                    </tr>
                    </thead>
                    <tbody class="tableBody">
                    <g:each in="${activity}" var="a" status="i">
                        <tr data-status="${a.TypeID}">
                            <td class="typeID_TD">
                                ${a.TypeID}
                            </td>
                            <td class="noteIconID_TD">
                                ${a.NoteIconID}
                            </td>
                            <td class="attachmentIcon_TD">
                                ${a.AttachmentIcon}
                            </td>
                            <td class="date_TD">
                                ${a.Date}
                            </td>
                            <td class="description_TD">
                                ${a.Description}
                            </td>
                            <td class="userID_TD">
                                ${a.UserID}
                            </td>
                            <td class="imageID_TD">
                                ${a.ImageID}
                            </td>
                            <td class="folderName_TD">
                                ${a.Folder}
                            </td>
                            <td class="statusID_TD">
                                ${a.StatusID}
                            </td>
                            <td class="typeID_TD">
                                ${a.TypeID}
                            </td>
                            <td class="referenceID_TD">
                                ${a.ReferenceID}
                            </td>
                            <td class="transID_TD">
                                ${a.TransID}
                            </td>
                            <td class="docTemplateID_TD">
                                ${a.DocTemplateID}
                            </td>
                            <td class="sourceDateTime_TD">
                                ${a.SourceDateTime}
                            </td>
                            <td class="flagDistribution_TD">
                                ${a.FlagDistribution}
                            </td>
                            <td class="quoteVersion_TD">
                                ${a.QuoteVersion}
                            </td>
                            <td class="toNameKey_TD">
                                ${a.ToNameKey}
                            </td>
                            <td class="systemDate_TD">
                                ${a.SystemDate}
                            </td>
                            <td class="sortDate_TD">
                                ${a.SortDate}
                            </td>
                        </tr>
                    </g:each>


                    </tbody>
                </table>
            </div>
        </div>






    </div>
</div>

<div class="panel panel-primary submissionViewPanel" id="submissionNotes_Panel" style="display:none">
    <div class="panel-heading">
        <h3 class="panel-title" style="font-size: 20px;">Notes - #${record.QuoteID}</h3>
    </div>
    <div class="panel-body">
        <div class="col-xs-12">
            <div class="pull-right">
                %{--<div class="btn-group">--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="all">All</button>--}%
                %{--<button type="button" class="btn btn-success btn-filter" data-target="E">Email</button>--}%
                %{--<button type="button" class="btn btn-warning btn-filter" data-target="I">Invoice</button>--}%
                %{--<button type="button" class="btn btn-danger btn-filter" data-target="M">Mail</button>--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="S">Suspense</button>--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="binders">Binders</button>--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="mktsubmits">Mkt Submits</button>--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="file">File Activity</button>--}%

                %{--</div>--}%
            </div>
        </div>
        <div class="col-xs-12">
            <div class="table-container pre-scrollable">
                <table class="table table-filter">
                    <thead class="thead-inverse">
                    <tr>
                        <th>Date/Time</th>
                        <th>User ID</th>
                        <th>Subject</th>
                        <th>Note</th>
                        <th>Reference ID</th>
                    </tr>
                    </thead>
                    <tbody class="tableBody">
                    <g:each in="${notes}" var="n" status="i">
                        <tr data-status="">
                            <td class="DateTime_TD">
                                ${n.DateTime}
                            </td>
                            <td class="UserID_TD">
                                ${n.UserID}
                            </td>
                            <td class="subject_TD">
                                ${n.Subject}
                            </td>
                            <td class="note_TD">
                                ${n.Note}
                            </td>
                            <td class="referenceID_TD">
                                ${n.ReferenceID}
                            </td>
                        </tr>
                    </g:each>


                    </tbody>
                </table>
            </div>
        </div>






    </div>
</div>

<div class="panel panel-primary submissionViewPanel" id="submissionAccounting_Panel" style="display:none">
    <div class="panel-heading">
        <h3 class="panel-title" style="font-size: 20px;">Accounting - #${record.QuoteID}</h3>
    </div>
    <div class="panel-body">
        <div class="col-xs-12">
            <div class="pull-right">
                %{--<div class="btn-group">--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="all">All</button>--}%
                %{--<button type="button" class="btn btn-success btn-filter" data-target="E">Email</button>--}%
                %{--<button type="button" class="btn btn-warning btn-filter" data-target="I">Invoice</button>--}%
                %{--<button type="button" class="btn btn-danger btn-filter" data-target="M">Mail</button>--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="S">Suspense</button>--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="binders">Binders</button>--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="mktsubmits">Mkt Submits</button>--}%
                %{--<button type="button" class="btn btn-default btn-filter" data-target="file">File Activity</button>--}%

                %{--</div>--}%
            </div>
        </div>
        <div class="col-xs-12">
            <div class="table-container pre-scrollable">
                <table class="table table-filter">
                    <thead class="thead-inverse">
                    <tr>
                        <th>Invoice</th>
                        <th>Description</th>
                        <th>STA.</th>
                        <th>Mailed Out</th>
                        <th>Type</th>
                        <th>Total Amount</th>
                        <th>Acctg Eff</th>
                        <th>RB/Agt Comm</th>
                        <th>Agt Comm %</th>
                        <th>Total Due</th>
                        <th>Policy</th>
                        <th>Install</th>
                        <th>Reversed</th>
                        <th>ProducerID</th>
                        <th>Held</th>
                        <th>Billing Type</th>
                        <th>BillToCode</th>
                        <th>Non_Premium</th>
                        <th>Premium</th>
                        <th>Misc_Premium</th>
                        <th>QuoteID</th>
                        <th>NonTax_Premium</th>
                        <th>Effective</th>
                        <th>Tax1</th>
                        <th>Tax2</th>
                        <th>Tax3</th>
                        <th>Tax4</th>
                        <th>STA.</th>
                        <th>InvoiceTypeID</th>
                        <th>TaxState</th>
                        <th>BillToAddressID</th>
                        <th>PaymentToAddressID</th>
                        <th>MemoToInvoiceFlag</th>
                        <th>DirectBillFlag</th>
                        <th>InstallmentPlanID</th>
                        <th>NumberOfPayments</th>
                        <th>TotalPremium</th>
                        <th>TotalGrossComm</th>
                        <th>TotalNetDueCompany</th>
                        <th>TotalFeeRevenue</th>
                        <th>TotalPayable</th>
                        <th>AgencyCollectedTaxes</th>
                        <th>GrossComm</th>
                        <th>CompanyCollectedFees</th>
                        <th>AgencyCollectedFees</th>
                        <th>InstallmentID</th>
                        <th>PayableID</th>
                        <th>Taxed</th>
                        <th>DefaultPayableID</th>
                        <th>AcuityStatusID</th>
                        <th>InvoiceDate</th>
                        <th>AcuityTargetCompanyID</th>
                        <th>InvoicedByID</th>
                        <th>TeamID</th>
                        <th>InsuredID</th>
                        <th>Invoice</th>
                        <th>InsuredKey_PK</th>
                        <th>PolicyKey_FK</th>
                        <th>DueDate</th>
                        <th>PostDate</th>
                        <th>Suppress</th>
                        <th>Effective Date</th>
                        <th>Expiration</th>
                    </tr>
                    </thead>
                    <tbody class="tableBody">
                    <g:each in="${invoiceHeader}" var="n" status="i">
                        <tr data-status="">
                            <td class="">
                                ${n.InvoiceID}
                            </td>
                            <td class="">
                                ${n.Description}
                            </td>
                            <td class="">
                                ${n.StatusID}
                            </td>
                            <td class="">
                                ${n.FlagMailedOut}
                            </td>
                            <td class="">
                                ${n.InvTypeID}
                            </td>
                            <td class="">
                                ${n.InvoiceTotal}
                            </td>
                            <td class="">
                                ${n.AccountingEffectiveDate}
                            </td>
                            <td class="">
                                ${n.TotalAgentComm}
                            </td>
                            <td class="">
                                ${n.AgentComm}
                            </td>
                            <td class="">
                                ${n.TotalDue}
                            </td>
                            <td class="">
                                ${n.PolicyID}
                            </td>
                            <td class="">
                                ${n.InstallmentFlag}
                            </td>
                            <td class="">
                                ${n.ReversedFlag}
                            </td>
                            <td class="">
                                ${n.ProducerID}
                            </td>
                            <td class="">
                                ${n.HeldSuspenseKey}
                            </td>
                            <td class="">
                                ${n.BillingType}
                            </td>
                            <td class="">
                                ${n.BillToCode}
                            </td>
                            <td class="">
                                ${n.Non_Premium}
                            </td>
                            <td class="">
                                ${n.Premium}
                            </td>
                            <td class="">
                                ${n.Misc_Premium}
                            </td>
                            <td class="">
                                ${n.QuoteID}
                            </td>
                            <td class="">
                                ${n.NonTax_Premium}
                            </td>
                            <td class="">
                                ${n.Effective}
                            </td>
                            <td class="">
                                ${n.Tax1}
                            </td>
                            <td class="">
                                ${n.Tax2}
                            </td>
                            <td class="">
                                ${n.Tax3}
                            </td>
                            <td class="">
                                ${n.Tax4}
                            </td>
                            <td class="">
                                ${n.InvoiceTypeID}
                            </td>
                            <td class="">
                                ${n.TaxState}
                            </td>
                            <td class="">
                                ${n.BillToAddressID}
                            </td>
                            <td class="">
                                ${n.PaymentToAddressID}
                            </td>
                            <td class="">
                                ${n.MemoInvoiceFlag}
                            </td>
                            <td class="">
                                ${n.DirectBillFlag}
                            </td>
                            <td class="">
                                ${n.InstallmentPlanID}
                            </td>
                            <td class="">
                                ${n.NumberOfPayments}
                            </td>
                            <td class="">
                                ${n.TotalPremium}
                            </td>
                            <td class="">
                                ${n.TotalGrossComm}
                            </td>
                            <td class="">
                                ${n.TotalNetDueCompany}
                            </td>
                            <td class="">
                                ${n.TotalFeeRevenue}
                            </td>
                            <td class="">
                                ${n.TotalPayable}
                            </td>
                            <td class="">
                                ${n.AgencyCollectedFees}
                            </td>
                            <td class="">
                                ${n.GrossComm}
                            </td>
                            <td class="">
                                ${n.CompanyCollectedFees}
                            </td>
                            <td class="">
                                ${n.AgencyCollectedFees}
                            </td>
                            <td class="">
                                ${n.InstallmentID}
                            </td>
                            <td class="">
                                ${n.PayableID}
                            </td>
                            <td class="">
                                ${n.Taxed}
                            </td>
                            <td class="">
                                ${n.DefaultPayableID}
                            </td>
                            <td class="">
                                ${n.AcuityStatusID}
                            </td>
                            <td class="">
                                ${n.InvoiceDate}
                            </td>
                            <td class="">
                                ${n.AcuityTargetCompanyID}
                            </td>
                            <td class="">
                                ${n.InvoicedByID}
                            </td>
                            <td class="">
                                ${n.TeamID}
                            </td>
                            <td class="">
                                ${n.InsuredID}
                            </td>
                            <td class="">
                                ${n.InvoiceKey_PK}
                            </td>
                            <td class="">
                                ${n.PolicyKey_FK}
                            </td>
                            <td class="">
                                ${n.DueDate}
                            </td>
                            <td class="">
                                ${n.FlagSuppress}
                            </td>
                            <td class="">
                                ${n.EffectiveDate}
                            </td>
                            <td class="">
                                ${n.Expiration}
                            </td>
                        </tr>
                    </g:each>


                    </tbody>
                </table>
            </div>
        </div>






    </div>
</div>
%{--<g:each in="${record}" var="r" status="i">--}%
    %{--<h3>${i+1}. ${r}</h3>--}%
    %{--<p>--}%
        %{--Age: ${r.Version}--}%
    %{--</p>--}%
    %{--<br/>--}%
%{--</g:each>--}%
<script src="${resource(dir: 'js', file: 'submissionView.js')}"></script>
</body>