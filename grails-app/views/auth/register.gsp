<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="layout" content="squarespaceLayout">
	</head>
	<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12"><h1>REGISTER</h1></div>
        </div>

        <div class="row" style="margin-top: 50px">
            <div class="col-xs-4">

            </div>
            <div class="col-xs-4">
                <div class="panel panel-default" >
                    <div class="panel-body">
                        <g:form controller="auth" action="registerUser">
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <g:textField type="text" class="form-control" name="firstName" placeholder="First"/>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <g:textField type="text" class="form-control" name="lastName" placeholder="Last"/>
                            </div>
                            <div class="form-group">
                                <label for="company">Company</label>
                                <g:textField type="text" class="form-control" name="company" placeholder="Company"/>
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber">Phone Number</label>
                                <g:textField type="text" class="form-control" name="phoneNumber" placeholder="(xxx)xxx-xxxx"/>
                            </div>
                            <br>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <g:textField type="email" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <g:passwordField type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <label for="verifyPassword">Verify Password</label>
                                <g:passwordField type="password" class="form-control" name="verifyPassword" placeholder="Password"/>
                            </div>

                            <button type="submit" class="btn btn-primary btn-lg btn-block">Register</button>
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