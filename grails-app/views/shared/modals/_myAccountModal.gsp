<div class="modal fade" id="myAccountModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>

                </button>
                 <h4 class="modal-title" id="myModalLabel">Account Settings</h4>

            </div>
            <div class="modal-body">
                <div role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active personalTab"><a href="#personalSettings" aria-controls="personalSettings" role="tab" data-toggle="tab">Personal Settings</a>
                        </li>
                        <li role="presentation" class="agencyTab"><a href="#agencySettings" aria-controls="agencySettings" role="tab" data-toggle="tab">Agency Settings</a>
                        </li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="personalSettings">
                            <div class="form-group has-feedback">
                                <label for="email">Username / Email Address</label>
                                <div class="input-group">
                                    <span class="input-group-addon">@</span>
                                    <g:textField type="email" class="form-control emailInput" name="email" value="${user.email}" id="email" disabled="true"/>
                                </div>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="firstName">First Name<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="firstName" value="${user.firstName}" id="firstName"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="lastName">Last Name<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required" name="lastName" value="${user.lastName}" id="lastName"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group has-feedback">
                                <label for="phoneNumber">Phone Number<span style="color:red; font-size:12px;">*</span></label>
                                <g:textField type="text" class="form-control required phoneNumberInput" name="phoneNumber" value="${user.phoneNumber}" id="phoneNumberInput"/>
                                <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                <span class="help-block"></span>
                            </div>
                            <div>
                                <button type="button" class="btn btn-danger" id="openChangePasswordButton">Change Password</button>
                            </div>
                        </div>
                        
                        <div role="tabpanel" class="tab-pane" id="agencySettings">
                            <g:form controller="user" action="none" style="padding-top: 10px;">
                                <div class="row">
                                    <div class="col-xs-10 col-offset-xs-2">
                                        <p style="color:red;">Agency ID: ${agency.producerID} / Agency PIN: ${agencyPIN} </br>
                                            Please provide ID and PIN to agents needing to register with the site.
                                        </p>
                                    </div>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyName">Agency Name</label>
                                    <g:textField type="text" class="form-control" name="agencyName" placeholder="Agency Name" id="agencyName" value="${agency.name}" disabled="true"/>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyLicense">License Number</label>
                                    <g:textField type="text" class="form-control required" name="agencyLicense" value="${agency.license}" id="agencyLicense" disabled="true"/>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyLicenseExpiration">License Expiration Date</label>
                                    <div class="input-group date" data-provide="datepicker" data-date-container='#agencyLicenseExpiration' id="agencyLicenseExpiration" data-date-format="mm/dd/yyyy">
                                        <input type="text" class="form-control" name="agencyLicenseExpiration" value="${agencyLicenseExpiration}">
                                        <div class="input-group-addon">
                                            <span class="glyphicon glyphicon-th"></span>
                                        </div>
                                    </div>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyEOPolicy">E&O Policy Number</label>
                                    <g:textField type="text" class="form-control required" name="agencyEOPolicy" value="${agency.eoPolicyNumber}" id="agencyEOPolicy"/>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyEOPolicyExpiration">E&O Policy Expiration Date</label>
                                    <div class="input-group date" data-provide="datepicker" data-date-container='#agencyEOPolicyExpiration' id="agencyEOPolicyExpiration" data-date-format="mm/dd/yyyy">
                                        <input type="text" class="form-control" name="agencyEOPolicyExpiration" value="${agencyEOPolicyExpiration}">
                                        <div class="input-group-addon">
                                            <span class="glyphicon glyphicon-th"></span>
                                        </div>
                                    </div>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyPhoneNumber">Agency Phone Number</label>
                                    <g:textField type="text" class="form-control required phoneNumberInput" name="agencyPhoneNumber" value="${agency.phone}" id="agencyPhoneNumberInput"/>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyStreet">Street Address</label>
                                    <g:textField type="text" class="form-control required" name="agencyStreet" value="${agency.mailAddress1}" id="agencyStreet"/>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyCity">City</label>
                                    <g:textField type="text" class="form-control required" name="agencyCity" value="${agency.mailCity}" id="agencyCity"/>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyState">State</label>
                                    <g:textField type="text" class="form-control" name="agencyState" id="agencyState" value="${agency.mailState}" disabled="true"/>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="agencyZipCode">Zipcode</label>
                                    <g:textField type="text" class="form-control required" name="agencyZipCode" value="${agency.mailZip}" id="agencyZipCode"/>
                                    <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                    <span class="glyphicon glyphicon-remove form-control-feedback" style="display:none"></span>
                                    <span class="help-block"></span>
                                </div>
                            </g:form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary save" id="saveChangesButton">Save Changes</button>
            </div>
        </div>
    </div>
</div>