<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div class="modal fade" tabindex="-1" role="dialog" id="checkNamedInsuredModal" >
    <div class="modal-dialog" role="document" style="width: 820px;">
        <div class="modal-content">
            <div class="modal-header">

                <h4 class="modal-title">Name Conflict</h4>
            </div>
            <div class="modal-body" style="padding: 25px 40px;">
                <div class="row">
                    <div class="col-xs-12" style="text-align: center;margin-bottom: 10px;">
                        <h4 class="control-label">Your submission seems to match another recently submitted.</h4>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div id="conflictExistsDiv">
                            <div class="well">
                                <div class="row">
                                    <div class="col-xs-12" style="">
                                        <label class="col-xs-7 control-label" style="margin-bottom: 0px;">Named Insured</label>
                                        <label class="col-xs-5 control-label" style="margin-bottom: 0px;">Status</label>
                                    </div><div class="col-xs-12" id="matchingSubmissionsContainer" style="margin-bottom:10px;">
                                    <span class="col-xs-7" style="">Sample Named Insured LLC</span>
                                    <span class="col-xs-5" style="">Broker of Record Needed</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top:12px;margin-bottom:12px;">
                    <div class="col-xs-12" style="text-align: center;font-size: Larger;font-weight: 400;">
                        <span class="control-label">By continuing this submission for Named Insured you will be required to complete a BOR</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success pull-left" id="ignoreConflictBOR" type="button">UW Ignore BOR</button>
                <button class="btn btn-info" id="requestBORButton" type="button">Request BOR</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>