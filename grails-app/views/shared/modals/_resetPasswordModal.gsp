<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div class="modal fade" tabindex="-1" role="dialog" id="resetPasswordModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Change Password</h4>
            </div>
            <div class="modal-body" style="padding: 50px 100px; padding-top: 30px;">


                <div class="form-group" style="margin-bottom:40px;">
                    <label for="password">Current Password<span style="color:red; font-size:12px;">*</span> </label>
                    <g:passwordField type="password" class="form-control requiredResetPassword passwordInput" name="password" placeholder="Current Password" id="currentPassword" />
                    <span class="help-block"></span>
                </div>
                <div class="form-group" style="margin-bottom:10px;">
                    <label for="password">New Password<span style="color:red; font-size:12px;">*</span> <span style="font-weight: 300">(Must be at least 6 characters)</span></label>
                    <g:passwordField type="password" class="form-control requiredResetPassword passwordInput" name="newpassword" placeholder="New Password" id="newPassword" />
                    <span class="help-block"></span>
                </div>
                <div class="form-group" style="margin-bottom:25px;">
                    <label for="verifyPassword">Verify Password<span style="color:red; font-size:12px;">*</span></label>
                    <g:passwordField type="password" class="form-control requiredResetPassword passwordInput passwordVerify" name="newpasswordConfirm" placeholder="Confirm New Password" id="confirmNewPassword" />
                    <span class="help-block"></span>
                </div>

                <button type="button" class="btn btn-primary btn-lg btn-block" id="resetPasswordButton">Change Password</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->