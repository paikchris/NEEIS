<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="layout" content="squarespaceLayout">
        <link href="../css/register.css" rel="stylesheet">

	</head>
	<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12" style=" color: white;"><h1>WELCOME TO OUR NEW SITE!</h1></div>
        </div>
        <div class="row">
            <div class="lead text-center col-xs-8 col-xs-offset-2" style=" color: white;">
                <p>If your agency is already appointed with us, simply create a new user account to get started. If you're not already doing business with New Empire, <a href="/auth/getAppointed">Get Appointed.</a></p>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-3">

            </div>
            <div class="col-xs-6">
                <div class="panel panel-default" style="background: rgba(255, 255, 255, 0.9);" >
                    <div class="panel-body" style=" padding: 22px;">
                    <g:if test="${registerError != null}">
                        <div class="alert alert-danger" role="alert">${registerError}</div>
                    </g:if>
                        <div class="alert alert-danger" role="alert" style="display:none"></div>
                        <g:form controller="auth" action="registerUser">
                            <div class="form-group has-feedback">
                                <label>Agency ID<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="agencyID" placeholder="Agency ID" id="agencyID"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                                <span class="agencyName"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label>Agency PIN<span style="color:red; font-size:12px;">*</span> </label>
                                <g:passwordField type="password" class="form-control required" name="agencyPIN" placeholder="Agency PIN" id="agencyPIN"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="email">Email Address<span style="color:red; font-size:12px;">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-addon">@</span>
                                    <g:textField type="email" class="form-control required emailInput" name="email" placeholder="Email Address" id="email"/>
                                </div>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
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
                            <br>
                            <div class="form-group has-feedback">
                                <label for="firstName">First Name<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="firstName" placeholder="First" id="firstName"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="lastName">Last Name<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="lastName" placeholder="Last" id="lastName"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="phoneNumber">Phone Number<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control phoneNumberMask required" name="phoneNumber" placeholder="(xxx)xxx-xxxx" id="phoneNumber"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <br>



                            <button type="submit" class="btn btn-primary btn-lg btn-block" id="submitButton" >Register</button>
                        </g:form>
                    </div>
                </div>
            </div>
            <div class="col-xs-3">

            </div>
        </div>

    </div>


	</body>

</html>