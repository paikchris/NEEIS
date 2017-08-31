<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link href="../css/login.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-xs-12 loginHeader"><h1>CHANGE PASSWORD</h1></div>
    </div>

    <div class="row" style="margin-top: 50px">
        <div class="col-xs-4">

        </div>
        <div class="col-xs-4">
            <div class="panel panel-default" style="background: rgba(255, 255, 255, 0.9);">
                <div class="panel-body" style="padding:25px;">
                    <g:form controller="auth" action="resetPassword">
                        <div class="form-group" style="margin-bottom:40px;">
                            <g:passwordField type="password" class="form-control" name="password" placeholder="Current Password"/>
                        </div>
                        <div class="form-group" style="margin-bottom:10px;">
                            <g:passwordField type="password" class="form-control" name="newpassword" placeholder="New Password"/>
                        </div>
                        <div class="form-group" style="margin-bottom:25px;">
                            <g:passwordField type="password" class="form-control" name="newpasswordConfirm" placeholder="Confirm New Password"/>
                        </div>

                        <button type="submit" class="btn btn-primary btn-lg btn-block">Change Password</button>
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