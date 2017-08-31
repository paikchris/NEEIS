<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div class="modal fade" tabindex="-1" role="dialog" id="newMessageModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">New Message</h4>
            </div>
            <div class="modal-body">
                <div class="row" style="padding:4px;">
                    <div class="col-xs-3">
                        <label for="inputEmail3" class="control-label">To</label>
                    </div>
                    <div class="col-xs-4">
                        <select class="form-control" name="recipient" id="recipientSelect">
                            <option value="invalid">Select Recipient</option>
                        </select>
                    </div>
                </div>
                <div class="row" style="padding:4px;">
                    <div class="col-xs-3">
                        <label for="inputEmail3" class="control-label">Subject</label>

                    </div>
                    <div class="col-xs-9">
                        <div class="form-group">
                            <g:textField type="text" class="form-control" name="messageSubject" id="messageSubject" placeholder="Subject"  />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12" style="margin-top:25px;">
                        <textarea class="form-control" rows="5" id="messageTextArea" style="resize: vertical; width:100%" placeholder="Write a Message"></textarea>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="modalSendMessageButton">Send Message</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->