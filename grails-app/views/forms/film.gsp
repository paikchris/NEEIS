<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/17/17
  Time: 2:34 PM

  THIS FILE WILL BE USED TO IMPORT THE CORRECT HTML FOR DIFFERENT RISK TYPES
  SURROUND ALL HTML TO BE IMPORTED WITH A DIV AND AN ID.
  THE ID WILL BE USED TO FIND THE APPROPRIATE TO INSERT THE HTML
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div id="coverageDatesPanelBody">
    <div class="row">
        <div class="col-xs-3">
            <div class="form-group"> <!-- Date input -->
                <label class="control-label">Proposed Effective Date</label>
                <input class="form-control" type="text" placeholder = "Hidden Text Field To Adjust Focus off Date" name="hiddenField" style="display: none;"/>
                <input class="form-control datepicker mandatoryForProduct" id="proposedEffectiveDate" name="proposedEffectiveDate" placeholder="MM/DD/YYYY" type="text"
                       data-object="submission" data-key="proposedEffectiveDate"  required/>
            </div>
        </div>
        <div class="col-xs-3">
            <div class="form-group"> <!-- Date input -->
                <label class="control-label">Proposed Expiration Date</label>
                <input class="form-control datepicker mandatoryForProduct" id="proposedExpirationDate" name="proposedExpirationDate" placeholder="MM/DD/YYYY" type="text"
                       data-object="submission" data-key="proposedExpirationDate"  required/>
            </div>
        </div>
        <div class="col-xs-3">
            <div class="form-group"> <!-- Date input -->
                <label class="control-label">Proposed Term Length</label>
                <input class="form-control mandatoryForProduct" id="proposedTermLength" name="proposedTermLength" type="text" style="color: black; background: white;"
                       data-object="submission" data-key="proposedTermLength" required/>
            </div>
        </div>
        <div class="col-xs-3">
            <div class="form-group" id="totalBudgetConfirmGroup"> <!-- Date input -->
                <label class="control-label">Total Budget</label>
                <input class="form-control maskMoney mandatoryForProduct" id="totalBudgetConfirm" name="totalBudgetConfirm"
                       type="text" data-prefix='$' data-precision='0'
                       data-object="submission" data-key="totalBudget" required>
            </div>

        </div>
    </div>
</div>
