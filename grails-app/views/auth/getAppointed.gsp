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
                            <div>
                                <label>Agency Address</label>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="agencyStreet">Street<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="agencyStreet" placeholder="Agency Street" id="agencyStreet"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span> 
                            </div>
                            <div class="form-group has-feedback">
                                <label for="contactEmail">City<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="agencyCity" placeholder="Agency City" id="agencyCity"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div> 
                            <div class="form-group has-feedback">
                                <label for="contactEmail">State<span style="color:red; font-size:12px;">*</span></label>
                                <select class="form-control required" name="agencyState" id="agencyState">
                                    <option value="" selected="selected">State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="GU">Guam</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="PR">Puerto Rico</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VI">Virgin Islands</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                                <span class="help-block"></span> 
                            </div>
                            <div class="form-group has-feedback">
                                <label for="contactEmail">Zipcode<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="agencyZipCode" placeholder="Agency Zipcode" id="agencyZipCode"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="agencyPhone">Agency Phone Number<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="agencyPhone" placeholder="(xxx)xxx-xxxx" id="phoneNumberInput"/>
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
