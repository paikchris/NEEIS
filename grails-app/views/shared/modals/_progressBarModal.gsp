<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>

<div class="modal fade" tabindex="-1" role="dialog" id="progressBarModal" style="pointer-events: none;">
    <div class="modal-dialog" role="document" style="margin-top:200px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="progressBarHeader">Please wait, your submission is being processed.</h4>
            </div>
            <div class="modal-body">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                        <span class="sr-only">60% Complete</span>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->