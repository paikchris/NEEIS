<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div class="row">
    <div class="alert alert-success alert-dismissible" id="previousSubmissionExistsAlert" role="alert" style="display:none;">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <span>Looks like you were working on a submission previously. Would you like to continue your previous submission?</span>
        <button class="btn btn-xs btn-danger pull-right" id="continuePreviousSubmissionNo" data-dismiss="alert"
                type="button" style="margin-left: 10px; margin-right: 10px; width:70px;">
            <span class="" style="">No</span>
        </button>
        <button class="btn btn-xs btn-success pull-right loadProgress" id="continuePreviousSubmissionYes" type="button" style="margin-left: 10px; margin-right: 10px; width:70px;">
            <span class="" style="">Yes</span>
        </button>
    </div>
</div>