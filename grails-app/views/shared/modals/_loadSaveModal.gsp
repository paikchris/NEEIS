<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div class="modal fade" tabindex="-1" role="dialog" id="loadSaveModal">
    <div class="modal-dialog" role="document" style="width:800px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Load Previous Submission</h4>
            </div>
            <div class="modal-body">
                <div class="row savedSubmissionDataHeaderRow">
                    <div class="col-xs-10 col-xs-offset-1">
                        <div class="row">
                            <div class="col-xs-5">
                                <label> Risk</label>
                            </div>
                            <div class="col-xs-4">
                                <label> Name</label>
                            </div>
                            <div class="col-xs-3">
                                <label> Time</label>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1" >
                        <div class="list-group" id="savedSubmissionsContainer" style="font-size: 12px;">
                            <a href="#" class="list-group-item">
                                Cras justo odio
                            </a>
                            <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
                            <a href="#" class="list-group-item">Morbi leo risus</a>
                            <a href="#" class="list-group-item">Porta ac consectetur ac</a>
                            <a href="#" class="list-group-item">Vestibulum at eros</a>
                        </div>
                    </div>
                </div>
            </div>
            %{--<div class="modal-footer">--}%
            %{--<button class="btn btn-primary" id="loadSubmissionButton" type="button"  >Load</button>--}%
            %{--</div>--}%
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->