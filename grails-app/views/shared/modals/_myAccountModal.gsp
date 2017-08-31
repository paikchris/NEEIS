<%--
  Created by IntelliJ IDEA.
  User: paikchris
  Date: 8/3/17
  Time: 1:15 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<div class="modal fade" tabindex="-1" role="dialog" id="myAccountModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Account</h4>
            </div>
            <div class="modal-body">
                <g:form controller="auth" action="registerUser">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <g:textField type="text" class="form-control" name="firstName" placeholder="First" value="${user.firstName}"/>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <g:textField type="text" class="form-control" name="lastName" placeholder="Last" value="${user.lastName}"/>
                    </div>
                    <div class="form-group">
                        <label for="company">Company</label>
                        <g:textField type="text" class="form-control" name="company" placeholder="Company" value="${user.company}"/>
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <g:textField type="email" class="form-control" name="email" placeholder="Email" value="${user.email}"/>
                    </div>

                    <br>
                    <div class="row">
                        <div class="col-xs-4">
                            <button type="button" class="btn btn-default" id="openResetPasswordButton">Change Password</button>
                        </div>
                        <div class="col-xs-2">

                        </div>
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px">Save Changes</button>
                            <button type="button" class="btn btn-primary pull-right">Cancel</button>

                        </div>
                    </div>

                </g:form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->