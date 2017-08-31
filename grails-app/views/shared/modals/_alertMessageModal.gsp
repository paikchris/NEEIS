<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div class="modal fade" tabindex="-1" role="dialog" id="alertMessageModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top:-10px;margin-right:-6px;"><span aria-hidden="true">&times;</span></button>
                <p id="alertMessageContent" style=" margin-top: 30px; text-align:center; font-size:16px;">Something</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="alertMessageModalButton">OK</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->