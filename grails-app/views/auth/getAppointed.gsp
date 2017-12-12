<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="layout" content="squarespaceLayout">
        <link href="../css/getAppointed.css" rel="stylesheet">

    </head>
    <body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12" style=" color: white;"><h1>GET APPOINTED</h1></div>
        </div>

        <div class="row">
            <div class="lead text-center col-xs-8 col-xs-offset-2" style="color: white;">
                <p>Doing business with New Empire is simple and straight forward.</br>To begin the process, please submit the following information.</br>You will receive an email from us with instructions on how to proceed.</p>
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
                        <g:form controller="auth" action="sendGetAppointedEmail">
                            <div class="form-group has-feedback">
                                <label for="agency">Agency Name<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField class="form-control required" name="agency" placeholder="Agency Name" id="agency"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="agencyContact">Agency Contact<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="agencyContact" placeholder="Agency Contact" id="agencyContact"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="contactEmail">Contact Email<span style="color:red; font-size:12px;">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-addon">@</span>
                                    <g:textField type="email" class="form-control required emailInput" name="contactEmail" placeholder="Contact Email" id="contactEmail"/>
                                </div>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <br>

                            <button type="submit" class="btn btn-primary btn-lg btn-block" id="getAppointedButton">Get Appointed</button>
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
