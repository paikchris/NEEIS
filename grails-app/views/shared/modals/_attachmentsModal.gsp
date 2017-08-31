<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div class="modal fade" tabindex="-1" role="dialog" id="attachmentsModal">
    <div class="modal-dialog" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Files To Be Uploaded</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1" >
                        <small>File types are limited to only .zip, .doc, .docx, .xlsx, .xls, .pdf, .txt</small>
                        <br>
                        <small>Total upload size limit is limited to 20MB</small>
                    </div>
                </div>
                <div id="attachmentModalFileRowsContainer" style="padding-top:10px;">
                </div>
                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1" >
                        <div class="pull-right" style="margin-right: 30px;">
                            <strong>Total: </strong><strong id="totalUploadSizeSpan"></strong>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <div id="uploadButtonsContainer">
                    <div class="uploadButtonForm" id="uploadFormFile_1">
                        <form enctype="multipart/form-data">
                            <div class="fileUpload btn btn-primary">
                                <span>Add File</span>
                                <input class="file modalFile" name="file" type="file" class="file"
                                       style="width:120px"/>
                            </div>
                            <button class="btn btn-primary doneButtonAttachmentsModal" type="button">Done</button>
                        </form>
                    </div>
                </div>


            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->