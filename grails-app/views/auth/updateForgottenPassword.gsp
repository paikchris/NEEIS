<!DOCTYPE html>
<html lang="en">
  <head>
        <meta name="layout" content="squarespaceLayout">
        <link href="../css/login.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 loginHeader"><h1>NEW PASSWORD</h1></div>
        </div>

        <div class="row">
            <div class="lead text-center col-xs-6 col-xs-offset-3" style=" color: white;">
                <p>Enter a new password to update your account.</p>
            </div>
        </div>

        <div class="row" style="margin-top: 50px">
            <div class="col-xs-6 col-xs-offset-3">
                <div class="panel panel-default" style="background: rgba(255, 255, 255, 0.9);">
                    <div class="panel-body">
                        <g:form controller="auth" action="emailPasswordResetLink">
                            <div class="form-group has-feedback">
                                <label for="password">Password<span style="color:red; font-size:12px;">*</span> <span style="font-weight: 300">(Must be at least 6 characters)</span></label>
                                <g:passwordField type="password" class="form-control required passwordInput" name="password" placeholder="Password" id="password"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="verifyPassword">Verify Password<span style="color:red; font-size:12px;">*</span></label>
                                <g:passwordField type="password" class="form-control required passwordVerify" name="verifyPassword" placeholder="Password" id="passwordVerify"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block" id="submitButton">Update Password</button>
                        </g:form>
                    </div>
                </div>
            </div>
            <div class="col-xs-4">

            </div>
        </div>

    </div>


  </body>
</html>