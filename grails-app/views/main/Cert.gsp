%{--<%@ page import="portal.Coverage" %>--}%
<!DOCTYPE html>
<html lang="en">
<body>


%{--Additional Insureds ListAdditional Insureds ListAdditional Insureds ListAdditional Insureds ListAdditional Insureds ListAdditional Insureds List--}%


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

                <div class="form-group col-xs-12">
                    <label class="control-label"></label>
                    <select class="form-control showReview" name="additionalInsured" data-reviewName="additionalInsured"
                            id="additionalInsuredList">
                        <option value="newEmpire" selected="selected">NewEmpire</option>
                        <option value="prosight" selected="selected">Prosight</option>
                    </select>
                </div>

                <div class="form-group col-xs-12">
                    <input type="radio" name="all"
                           class=""
                           value="All"
                           id="all"
                           checked="checked"> All
                    <input type="radio" name="rentalHouse"
                           class=""
                           value="Rental House"
                           id="rentalHouse">Rental House
                    <input type="radio" name="privateFacility"
                           class=""
                           value="Private Facility"
                           id="privateFacility"> Private Facility
                    <input type="radio" name="municipalState"
                           class=""
                           value="Municipal/State"
                           id="municipalState">Municipal/State
                    <input type="radio" name="other"
                           class=""
                           value="Other"
                           id="other"> Other
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
                    <g:textField type="text" class="form-control showReview" name="operation"
                                 data-reviewName="Operations"
                                 id="operation"
                                 value="The County of Los Angeles, its Special Districts, Elected Officials, Officers, Agents, Employees, and Volunteers are added as Additional Insured."/>
                </div>

                <div class="form-group col-xs-12">
                    <input type="radio" name="stdLossPayee"
                           class=""
                           value="stdLossPayee"
                           id="stdLossPayee"> stdLossPayee
                    <input type="radio" name="userDefined"
                           class=""
                           value="User Defined"
                           id="userDefined"
                           checked="checked"> User Defined
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
                    <g:textField type="text" class="form-control showReview" name="operation"
                                 data-reviewName="Operations"
                                 id="operation"
                                 value="The County of Los Angeles, its Special Districts, Elected Officials, Officers, Agents, Employees, and Volunteers are added as Additional Insured."/>
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
                   checked="checked"> Attach Summary
            <input type="radio" name="useAcordForm"
                   class=""
                   value="useAcordForm"
                   id="useAcordForm">Use ACORD form(s) for AI or Waiver
        </div>
    </div>
</div>

<div class="row">
    <div class="col-xs-12">
        <button class="btn btn-primary" id="saveCert" type="button" value="Upload" >Save</button>
        <button class="btn btn-primary" id="createCert" type="button" value="Upload" >Create Certificate</button>
        <button class="btn btn-primary" id="cancelCert" type="button" value="Upload" >Cancel</button>

    </div>
</div>
</body>