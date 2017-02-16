<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="layout" content="squarespaceLayout">
        <link href="../css/register.css" rel="stylesheet">

	</head>
	<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12" style=" color: white;"><h1>REGISTER</h1></div>
        </div>

        <div class="row" style="margin-top: 50px">
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
                            <div class="form-group">
                                <label for="email">Email address<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="email" class="form-control required emailInput" name="email" placeholder="Email" id="email"/>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group">
                                <label for="password">Password<span style="color:red; font-size:12px;">*</span> <span style="font-weight: 300">(Must be at least 6 characters)</span></label>
                                <g:passwordField type="password" class="form-control required passwordInput" name="password" placeholder="Password" id="password"/>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group">
                                <label for="verifyPassword">Verify Password<span style="color:red; font-size:12px;">*</span></label>
                                <g:passwordField type="password" class="form-control required passwordVerify" name="verifyPassword" placeholder="Password" id="passwordVerify"/>
                                <span class="help-block"></span>
                            </div>
                            <br>
                            <div class="form-group">
                                <label for="firstName">First Name<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="firstName" placeholder="First" id="firstName"/>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="lastName" placeholder="Last" id="lastName"/>
                            </div>
                            <div class="form-group">
                                <label>Agency ID<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="agencyID" placeholder="AgencyID" id="agencyID"/>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group">
                                <label>Agency PIN<span style="color:red; font-size:12px;">*</span> </label>
                                <g:passwordField type="password" class="form-control required" name="agencyPIN" placeholder="PIN" id="agencyPIN"/>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber">Phone Number</label>
                                <g:textField type="text" class="form-control phoneNumberMask" name="phoneNumber" placeholder="(xxx)xxx-xxxx" id="phoneNumber"/>
                            </div>
                            <br>



                            <button type="submit" class="btn btn-primary btn-lg btn-block" id="submitButton">Register</button>
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