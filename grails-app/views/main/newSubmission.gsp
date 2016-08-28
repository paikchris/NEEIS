<%@ page import="portal.Coverage" %>
<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="layout" content="main">
        <link rel="stylesheet" href="${resource(dir: 'css', file: 'newSubmission.css')}" type="text/css">
	</head>
	<body>
            <div class="container">
                <h1>New Submission</h1>
                <br>
                <br>
                <br>
                <div class="stepwizard">
                    <div class="stepwizard-row setup-panel">
                        <div class="stepwizard-step">
                            <a href="#step-1" type="button" class="btn btn-primary btn-circle">1</a>
                            <p>Step 1</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-2" type="button" class="btn btn-default btn-circle" disabled="disabled">2</a>
                            <p>Step 2</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-3" type="button" class="btn btn-default btn-circle" disabled="disabled">3</a>
                            <p>Step 3</p>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-4" type="button" class="btn btn-default btn-circle" disabled="disabled">4</a>
                            <p>Step 4</p>
                        </div>
                    </div>
                </div>
                <form role="form">
                    <div class="row setup-content" id="step-1">
                        <div class="col-xs-12">
                            <div class="col-md-12">
                                <h3> Step 1</h3>
                                <div class="form-group">
                                    <label class="control-label">Operation Type</label>
                                    <p><g:select name="operationTypeSelect"
                                              from="${portal.Coverage.list()}"
                                                  optionValue="coverageName"
                                              optionKey="id" /></p>
                                </div>
                                %{--<div class="form-group">--}%
                                    %{--<label class="control-label">Policy Type (Select One)</label>--}%
                                    %{--<g:radioGroup name="policyType"--}%
                                                  %{--labels="['Producer of Documentaries, Industrial Productions, Commercials, or Educational Productions (DICE), including Music Videos, Corporate Videos, Infomercials and Interstitials.',--}%
                                                           %{--'Film Production - other than DICE, including Television Series, Pilots and Specials, up to 1,000,000 Gross Production Cost. Excludes Reality TV.']"--}%
                                                  %{--values="[1,2]"--}%
                                                    %{--value="1">--}%
                                        %{--<p>${it.radio} ${it.label} </p>--}%
                                    %{--</g:radioGroup>--}%
                                %{--</div>--}%
                                %{--<div class="form-group">--}%
                                    %{--<label class="control-label">Named Insured</label>--}%
                                    %{--<input type="text" required="required" class="form-control" name="namedInsured" placeholder="Named Insured" />--}%
                                %{--</div>--}%
                                %{--<div class="form-group">--}%
                                    %{--<label class="control-label">DBA</label>--}%
                                    %{--<input type="text" required="required" class="form-control" name="DBA" placeholder="DBA" />--}%
                                %{--</div>--}%
                                %{--<br><br>--}%
                                %{--<div class="form-group">--}%
                                    %{--<label class="control-label">Address 1</label>--}%
                                    %{--<input type="text" required="required" class="form-control" name="address1" placeholder="" />--}%
                                %{--</div>--}%
                                %{--<div class="form-group">--}%
                                    %{--<label class="control-label">Address 2</label>--}%
                                    %{--<input type="text" required="required" class="form-control" name="address2" placeholder="" />--}%
                                %{--</div>--}%
                                %{--<div class="form-group">--}%
                                    %{--<label class="control-label">City</label>--}%
                                    %{--<input type="text" required="required" class="form-control" name="city" placeholder="" />--}%
                                %{--</div>--}%
                                %{--<div class="form-group">--}%
                                    %{--<label class="control-label">State</label>--}%
                                    %{--<input type="text" required="required" class="form-control" name="state" placeholder="" />--}%
                                %{--</div>--}%
                                %{--<div class="form-group">--}%
                                    %{--<label class="control-label">Zipcode</label>--}%
                                    %{--<input type="text" required="required" class="form-control" name="zipcdoe" placeholder="" />--}%
                                %{--</div>--}%

                                <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" >Next</button>
                            </div>
                        </div>
                    </div>
                    <div class="row setup-content" id="step-2">
                        <div class="col-xs-12">
                            <div class="col-md-12">
                                <h3> Coverage Options</h3>
                                <div class="form-group">
                                    <label class="control-label">Select Coverage Level</label>

                                        <p><input type="radio" name="policyType" value="1" checked="true" /> Silver </p>
                                        <p><input type="radio" name="policyType" value="2" /> Gold </p>
                                        <p><input type="radio" name="policyType" value="3" /> Platinum </p>
                                    <a href="#">Compare Coverages</a>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Policy Term</label>
                                    <p><input type="radio" name="policyTermType" value="Days" checked="true"/> Days </p>
                                    <p><input maxlength="3" type="number" step=".01" required="required" class="form-control" name="policyTermDays" placeholder="30"  /></p>
                                    <p><input type="radio" name="policyTermType" value="Annual" /> Annual </p>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Gross Production Cost</label>
                                    <input maxlength="20" type="number" step=".01" required="required" class="form-control" placeholder="$"  />
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Coverage Options</label>
                                    <p><input type="checkbox" name="generalLiability" /> General Liability </p>
                                    <p><input type="checkbox" name="blanketAdditionalInsured" /> Blanket Additional Insured</p>
                                    <p><input type="checkbox" name="waiverOfSubrogation" /> Waiver of Subrogation </p>
                                    <p><input type="checkbox" name="medicalExpense" /> $5,000 Medical Expense</p>
                                    <p><input type="checkbox" name="medicalExpenseIncrease" /> Increase Medical Expense Limit to $ 5,000 </p>
                                    <p><input type="checkbox" name="aggregateLimit Increase" /> Increase Aggregate Limit to $ 2,000,000</p>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Coverage Options</label>
                                    <p><input type="checkbox" name="entertainmentPackage" /> Entertainment Package </p>
                                    <p><input type="checkbox" name="noha" /> Non Owned & Hired Auto Liability </p>
                                    <p><input type="checkbox" name="primaryWorkersComp" /> Primary Workers Compensation </p>
                                    <p><input type="checkbox" name="contingentWorkersComp" /> Contingent Workers Compensation </p>
                                    <p><input type="checkbox" name="umbrella" /> Umbrella/Excess Liability </p>
                                    <p><input type="checkbox" name="terrorism" /> Terrorism Coverage </p>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Agent Fee</label>
                                    <input maxlength="20" type="number" step=".01" required="required" class="form-control" placeholder="$"  />
                                </div>
                                <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                                <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" >Next</button>
                            </div>
                        </div>
                    </div>
                    <div class="row setup-content" id="step-3">
                        <div class="col-xs-12">
                            <div class="col-md-12">
                                <h3> Step 3</h3>

                                <div class="form-group">
                                    <label class="control-label">Comment</label>
                                    <textarea class="form-control" placeholder="Enter Comment" ></textarea>
                                </div>
                                <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                                <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" >Next</button>
                            </div>
                        </div>
                    </div>
                    <div class="row setup-content" id="step-4">
                        <div class="col-xs-12">
                            <div class="col-md-12">
                                <h3> Step 4</h3>
                                <button class="btn btn-default prevBtn btn-lg pull-left" type="button" >Prev</button>
                                <button class="btn btn-success btn-lg pull-right" type="submit">Finish!</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>





	</body>
</html>