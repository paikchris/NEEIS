<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="layout" content="squarespaceLayout">
        <link href="../css/login.css" rel="stylesheet">
	</head>
	<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 loginHeader"><h1>LOG IN</h1></div>
        </div>

        <div class="row" style="margin-top: 50px">
            <div class="col-xs-4">

            </div>
            <div class="col-xs-4">
                <div class="panel panel-default" style="background: rgba(255, 255, 255, 0.9);">
                    <div class="panel-body">
                        <g:form controller="auth" action="login">
                            <g:if test="${flash.error}">
                                <div class="form-group alert alert-danger" role="alert" style="text-align: center;">
                                    ${flash.error}
                                </div>
                            </g:if>
                            <g:if test="${flash.message}">
                                <div class="form-group alert alert-info" role="alert" style="text-align: center;">
                                    ${flash.message}
                                </div>
                            </g:if>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <g:textField type="email" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <g:passwordField type="password" class="form-control" name="password" placeholder="Password"/>
                                <a href="/auth/forgotPassword" style="color: red; margin-top: 5px;">Forgot Password</a>
                            </div>

                            <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>
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