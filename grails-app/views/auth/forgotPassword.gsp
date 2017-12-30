<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="layout" content="squarespaceLayout">
        <link href="../css/login.css" rel="stylesheet">
	</head>
	<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 loginHeader"><h1>FORGOT PASSWORD</h1></div>
        </div>

        <div class="row">
            <div class="lead text-center col-xs-6 col-xs-offset-3" style=" color: white;">
                <p>Enter your email address, and we'll send you a link to reset your password.</p>
            </div>
        </div>

        <div class="row" style="margin-top: 50px">
            <div class="col-xs-6 col-xs-offset-3">
                <div class="panel panel-default" style="background: rgba(255, 255, 255, 0.9);">
                    <div class="panel-body">
                        <g:form controller="auth" action="sendPasswordResetEmail">
                            <g:if test="${flash.error}">
                                <div class="form-group alert alert-danger" role="alert" style="text-align: center;">
                                    ${flash.error}
                                </div>
                            </g:if>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <div class="input-group">
                                    <span class="input-group-addon">@</span>
                                    <g:textField type="email" class="form-control forgotPassword" name="email" placeholder="Email Address"/>
                                </div>
                                <span class="help-block"></span>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block" id="submitButton">Send Password Reset Link</button>
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