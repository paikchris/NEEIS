<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div class="modal fade" tabindex="-1" role="dialog" id="renewalModal">
    <div class="modal-dialog" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Name Conflict</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12">
                        <span>"<strong id="namedInsuredRenewalSpan"></strong>" matches existing Policies in our system.
                        Submitted by <strong id="agencyRenewalSpan"></strong>.</span>
                        <br>
                    </div>
                </div>
                <div class="row" style=" margin-top:10px;">
                    <div class="col-xs-12" style="margin-top:20px;">
                        <div class="well">
                            <div class="row" style="font-size: smaller;text-align: center;font-weight: 500;">
                                <div class="col-xs-2">ID
                                </div>
                                <div class="col-xs-3">NAMED INSURED
                                </div>
                                <div class="col-xs-3">AGENCY
                                </div>
                                <div class="col-xs-3">ACTIVE (Y/N)
                                </div>
                            </div>
                            <div id="renewalMatchesContainer">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top: 20px;margin-bottom: 20px;">
                    <div class="col-xs-12" style="text-align: center;font-size: large;font-weight: 400;">
                        <span>Is this submission a renewal?</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="yesRenewalButton" type="button"  >Yes</button>
                <button class="btn btn-default" id="noRenewalButton" type="button"  >No</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->