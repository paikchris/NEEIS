<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="google-site-verification" content="gPZot81P_RcO5zhJN4DNKLra618gqM11Z2NeJ0MWPVo" />
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

	<title>New Empire Portal</title>

	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
	<meta name="viewport" content="width=device-width" />

	<link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png" />
	<link rel="icon" type="image/png" href="assets/img/favicon.png" />

	<!-- Bootstrap -->
	<link rel="stylesheet" href="${resource(dir: 'css', file: 'bootstrap.min.css')}" type="text/css">

	<!-- Font Awesome -->
	<link rel="stylesheet" href="${resource(dir: 'font-awesome-4.7.0', file: '/css/font-awesome.min.css')}" type="text/css">

	%{--Neeis Custom Style Sheet--}%
	<link rel="stylesheet" href="${resource(dir: 'css', file: "neeisTheme.css?ts=" + new Date().getTime())}" type="text/css">

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		  <script type="text/javascript">
		   	alert("IE Compatibility is currently limited while development is ongoing. We apologize for any inconveniences.");
			</script>
		<![endif]-->
	<!--[if IE]>
	<![endif]-->
	<!--[if lt IE 11]>
		  <script type="text/javascript">
		   	alert("IE Compatibility is currently limited while development is ongoing. We apologize for any inconveniences.");
			</script>
		<![endif]-->
	<!--[if IE]>
	<![endif]-->

	<!-- Google Analytics Script -->
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-91154540-1', 'auto');
		ga('send', 'pageview');
	</script>


	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	%{--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>--}%
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	%{--<script src="https://code.jquery.com/jquery-migrate-3.0.0.js"></script>--}%

	%{--SENTRY--}%
	<script src="https://cdn.ravenjs.com/3.12.1/raven.min.js" crossorigin="anonymous"></script>
	%{--<script>--}%
	%{--<g:if env="development">--}%
		%{--Raven.config('https://dbc11c2801a349afb0be298fe227925e@sentry.io/145737', {--}%
			%{--environment: 'development',--}%
			%{--release: '1.0',--}%
%{--//			whitelistUrls: [--}%
%{--//				/disqus\.com/,--}%
%{--//				/getsentry\.com/--}%
%{--//			],--}%
%{--//			ignoreErrors: [--}%
%{--//				'fb_xd_fragment',--}%
%{--//				/ReferenceError:.*/--}%
%{--//			],--}%
			%{--includePaths: [--}%
				%{--/https?:\/\/(www\.)?104.236.23.128\.com/--}%
			%{--]--}%
		%{--}).install();--}%
	%{--</g:if>--}%
	%{--<g:elseif env="production">--}%
		%{--Raven.config('https://6ac7da9b8eba444fad37c91e68b560e0@sentry.io/145672', {--}%
			%{--environment: 'production',--}%
			%{--release: '1.0',--}%
%{--//            whitelistUrls: [--}%
%{--//                /disqus\.com/,--}%
%{--//                /getsentry\.com/--}%
%{--//            ],--}%
%{--//            ignoreErrors: [--}%
%{--//                'fb_xd_fragment',--}%
%{--//                /ReferenceError:.*/--}%
%{--//            ],--}%
            %{--includePaths: [--}%
                %{--/https?:\/\/(www\.)?104.131.41.129\.com/--}%
            %{--]--}%
        %{--}).install();--}%
	%{--</g:elseif>--}%
		%{--Raven.setUserContext({--}%
			%{--email: '${user.email}',--}%
			%{--role: '${user.userRole}'--}%
		%{--});--}%
		%{--$(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {--}%
			%{--Raven.captureMessage(thrownError || jqXHR.statusText, {--}%
				%{--extra: {--}%
					%{--type: ajaxSettings.type,--}%
					%{--url: ajaxSettings.url,--}%
					%{--data: ajaxSettings.data,--}%
					%{--status: jqXHR.status,--}%
					%{--error: thrownError || jqXHR.statusText,--}%
					%{--response: jqXHR.responseText.substring(0, 100)--}%
				%{--}--}%
			%{--});--}%
		%{--});--}%

	%{--</script>--}%

	<!-- //////////////////////////////////////////////////////////////////////////// -->
	<!-- Include all compiled plugins (below), or include individual files as needed -->

	<!-- Moment plugin for Dates/Times -->
	<script src="${resource(dir: 'js', file: 'moment.js')}" ></script>

	<!-- Browser Cookie plugin -->
	<script src="${resource(dir: 'js', file: 'js.cookie.js')}" ></script>

	<!-- Bootstrap JS file-->
	<script src="${resource(dir: 'js', file: 'bootstrap.min.js')}" ></script>

	<!-- Neeis Global JS file-->
	<script src="${resource(dir: 'js', file: 'global.js')}" ></script>

	<!-- Jquery Bootstrap Wizard Plugin-->
	<link rel="stylesheet" href="${resource(dir: 'plugins/UI/bootstrap-wizard/css', file: 'smart_wizard.css')}" type="text/css">
	<link rel="stylesheet" href="${resource(dir: 'plugins/UI/bootstrap-wizard/css', file: 'smart_wizard_theme_arrows.css')}" type="text/css">
	<script src="${resource(dir: 'plugins/UI/bootstrap-wizard/js', file: 'jquery.smartWizard.min.js')}" ></script>



	<!-- DATE PICKER PLUGIN -->
	<script src="${resource(dir: 'js/vendor/', file: 'bootstrap-datepicker.js')}" ></script>
	<link rel="stylesheet" href="${resource(dir: 'css', file: 'bootstrap-datepicker3.css')}" type="text/css">



	<!-- Masking Inputs plugin -->
	<script src="${resource(dir: 'js', file: 'jquery.maskedinput.js')}" ></script>

	<!-- Masking Currency plugin -->
	<script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}"></script>


	<script >
		$("#sidebar-wrapper").hover(function(e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
		});

		$( "#myAccountButton" ).click(function() {
			$('#myAccountModal').modal('show');
		});
		$( "#settingsButton" ).click(function() {
			$('#settingsModal').modal('show');
		});


	</script>






	<title><g:layoutTitle default="Grails"/></title>
	%{--<asset:javascript src="application.js"/>--}%
	<g:layoutHead/>
</head>
<body>
<nav class="navbar navbar-squarespace navbar-fixed-top" id="squarespaceNavBar">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" id="squarespaceBrandText" href="https://christopher-paik.squarespace.com">NEW EMPIRE</a>
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

			<ul class="nav navbar-nav navbar-right">
				%{--<li class="dropdown">--}%
				%{--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">--}%
				%{--<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>--}%
				%{--<span class="badge badge-notify">3</span>--}%
				%{--</a>--}%
				%{--<ul class="dropdown-menu">--}%
				%{--<li><a href="#">Mail From Andee</a></li>--}%
				%{--<li role="separator" class="divider"></li>--}%
				%{--<li><a href="#">Mail From Andee</a></li>--}%
				%{--<li role="separator" class="divider"></li>--}%
				%{--<li><a href="#">Mail From Chris</a></li>--}%
				%{--</ul>--}%
				%{--</li>--}%

				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						<span class="glyphicon glyphicon-bell" aria-hidden="true"></span>
						<span class="badge badge-notify">3</span>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#">Premium approved</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Document needs to be signed</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Policy Issued</a></li>
					</ul>
				</li>


				<li><a href="#" style="padding-right:2px; padding-top: 14px;"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" style="padding-left: 2px" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						${user.firstName} ${user.lastName}
						<span id="userDetails-email" style="display:none">${user.email}</span>
						<span id="userDetails-company" style="display:none">${user.company}</span>
						<span id="userDetails-firstName" style="display:none">${user.firstName}</span>
						<span id="userDetails-lastName" style="display:none">${user.lastName}</span>
						<span id="userDetails-aimContactID" style="display:none">${user.aimContactID}</span>

						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#" id="myAccountButton">My Account</a></li>
						<g:if test="${user.admin == "true"}">
							<li><a href="./../admin/data" id="data">Data Management</a></li>
						</g:if>
						%{--<li><a href="#">Something else here</a></li>--}%
						%{--<li role="separator" class="divider"></li>--}%
						%{--<li><a href="#">Separated link</a></li>--}%
						<li role="separator" class="divider"></li>
						<li><a href="./../auth/logout" id="logoutButton">Logout</a></li>
					</ul>
				</li>
			</ul>
		</div><!-- /.navbar-collapse -->
	</div><!-- /.container-fluid -->
</nav>


<div id="wrapper">

	<!-- Sidebar -->
	<div id="sidebar-wrapper">
		<ul class="sidebar-nav">
			<br>
			%{--<div class="row">--}%
			%{--<div class="col-xs-12">--}%
			%{--<button class="btn btn-default pull-right" style="background: transparent;"><span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span></button>--}%
			%{--</div>--}%
			%{--</div>--}%
			<li>
				<a href="./../main/index.gsp"><span class="glyphicon glyphicon-th-large" aria-hidden="true"></span> Dashboard</a>
			</li>
			<li>
				<a href="./../main/newSubmission.gsp"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> New Policy</a>
			</li>

			<li>
				<a href="./../main/submissions.gsp"><span class="glyphicon glyphicon-file" aria-hidden="true"></span> My Submissions</a>
			</li>
			<li>
				<a href="./../main/messages.gsp"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Messages</a>
			</li>
			%{--<li>--}%
			%{--<a href="#"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Events</a>--}%
			%{--</li>--}%
			%{--<li>--}%
			%{--<a href="#"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> About</a>--}%
			%{--</li>--}%
			%{--<li>--}%
			%{--<a href="#"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Services</a>--}%
			%{--</li>--}%
			%{--<li>--}%
			%{--<a href="#"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Contact</a>--}%
			%{--</li>--}%
		</ul>
	</div>
	<!-- /#sidebar-wrapper -->

	<!-- Page Content -->
	<div id="page-content-wrapper">

		<g:layoutBody/>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_6p9r1leoPGIFggBpprGfLVsLVxea5ZI&libraries=places&callback=initAutocomplete"
				async defer></script>
	</div>
	<!-- /#page-content-wrapper -->

</div>


<div class="modal fade" tabindex="-1" role="dialog" id="myAccountModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Account</h4>
			</div>
			<div class="modal-body">
				<g:form controller="auth" action="registerUser">
					<div class="form-group">
						<label for="firstName">First Name</label>
						<g:textField type="text" class="form-control" name="firstName" placeholder="First" value="${user.firstName}"/>
					</div>
					<div class="form-group">
						<label for="lastName">Last Name</label>
						<g:textField type="text" class="form-control" name="lastName" placeholder="Last" value="${user.lastName}"/>
					</div>
					<div class="form-group">
						<label for="company">Company</label>
						<g:textField type="text" class="form-control" name="company" placeholder="Company" value="${user.company}"/>
					</div>
					<br>
					<div class="form-group">
						<label for="email">Email address</label>
						<g:textField type="email" class="form-control" name="email" placeholder="Email" value="${user.email}"/>
					</div>




					<br>
					<div class="row">
						<div class="col-xs-4">
							<button type="button" class="btn btn-default" id="openChangePasswordButton">Change Password</button>
						</div>
						<div class="col-xs-2">

						</div>
						<div class="col-xs-6">
							<button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px">Save Changes</button>
							<button type="button" class="btn btn-primary pull-right">Cancel</button>

						</div>
					</div>

				</g:form>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" tabindex="-1" role="dialog" id="changePasswordModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Change Password</h4>
			</div>
			<div class="modal-body" style="padding: 50px 100px; padding-top: 30px;">


					<div class="form-group" style="margin-bottom:40px;">
						<label for="password">Current Password<span style="color:red; font-size:12px;">*</span> </label>
						<g:passwordField type="password" class="form-control requiredChangePassword passwordInput" name="password" placeholder="Current Password" id="currentPassword" />
						<span class="help-block"></span>
					</div>
					<div class="form-group" style="margin-bottom:10px;">
						<label for="password">New Password<span style="color:red; font-size:12px;">*</span> <span style="font-weight: 300">(Must be at least 6 characters)</span></label>
						<g:passwordField type="password" class="form-control requiredChangePassword passwordInput" name="newpassword" placeholder="New Password" id="newPassword" />
						<span class="help-block"></span>
					</div>
					<div class="form-group" style="margin-bottom:25px;">
						<label for="verifyPassword">Verify Password<span style="color:red; font-size:12px;">*</span></label>
						<g:passwordField type="password" class="form-control requiredChangePassword passwordInput passwordVerify" name="newpasswordConfirm" placeholder="Confirm New Password" id="confirmNewPassword" />
						<span class="help-block"></span>
					</div>

					<button type="button" class="btn btn-primary btn-lg btn-block" id="changePasswordButton">Change Password</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" tabindex="-1" role="dialog" id="alertMessageModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-body">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top:-10px;margin-right:-6px;"><span aria-hidden="true">&times;</span></button>
				<p id="alertMessageContent" style=" margin-top: 30px; text-align:center; font-size:16px;">Something</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="alertMessageModalButton">OK</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="loadSaveModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-body">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top:-10px;margin-right:-6px;"><span aria-hidden="true">&times;</span></button>
				<p style=" margin-top: 30px; text-align:center; font-size:16px;">Seems like you were working on a Submission. Would you like to continue where you left off?</p>
			</div>
			<div class="modal-footer">
				<div class="" style="text-align: center">
					<button type="button" class="btn btn-default " data-dismiss="modal" id="loadSaveNOButton" style="width: 75px;">No</button>

					<button type="button" class="btn btn-primary " data-dismiss="modal" id="loadSaveOKButton" style="width: 75px;">Yes</button>
				</div>


			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" tabindex="-1" role="dialog" id="settingsModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Settings</h4>
			</div>
			<div class="modal-body">
				<p>Something</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Save changes</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="loadingModal">
	<div class="loader">
		<div class="double-bounce1"></div>
		<div class="double-bounce2"></div>
	</div>

</div>

<div class="modal fade" tabindex="-1" role="dialog" id="attachmentsViewModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Attachments</h4>
			</div>
			<div class="modal-body" id="attachmentRowsContainer">
				<div class="row fileRow" style="margin-top:10px; margin-bottom: 10px;">
					<div class="col-xs-12">
						<button class="downloadFileButton btn btn-primary " style="margin-right:20px; margin-left:15px;">Download</button>
						<img src='/images/pdfIcon.png' height='16' width='16' style='margin-right:5px'/>
						<span class="fileDescriptionSpan " style="line-height: 30px;">Indication.pdf</span>
					</div>
				</div>
				<div class="row fileRow" style="margin-top:10px; margin-bottom: 10px;">
					<div class="col-xs-12">
						<button class="downloadFileButton btn btn-primary " style="margin-right:20px; margin-left:15px;">Download</button>
						<span class="fileDescriptionSpan " style="line-height: 30px;">Indication.pdf</span>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				%{--<g:link controller="Async" action="ajaxDownloadAttachment" >--}%
					%{--<button>Test</button>--}%
				%{--</g:link>--}%
				<button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Done</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="progressBarModal" style="pointer-events: none;">
	<div class="modal-dialog" role="document" style="margin-top:200px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="progressBarHeader">Please wait, your submission is being processed.</h4>
			</div>
			<div class="modal-body">
				<div class="progress">
					<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
						<span class="sr-only">60% Complete</span>
					</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="newMessageModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">New Message</h4>
			</div>
			<div class="modal-body">
				<div class="row" style="padding:4px;">
					<div class="col-xs-3">
						<label for="inputEmail3" class="control-label">To</label>
					</div>
					<div class="col-xs-4">
						<select class="form-control" name="recipient" id="recipientSelect">
							<option value="invalid">Select Recipient</option>
						</select>
					</div>
				</div>
				<div class="row" style="padding:4px;">
					<div class="col-xs-3">
						<label for="inputEmail3" class="control-label">Subject</label>

					</div>
					<div class="col-xs-9">
						<div class="form-group">
							<g:textField type="text" class="form-control" name="messageSubject" id="messageSubject" placeholder="Subject"  />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12" style="margin-top:25px;">
						<textarea class="form-control" rows="5" id="messageTextArea" style="resize: vertical; width:100%" placeholder="Write a Message"></textarea>
					</div>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
				<button type="button" class="btn btn-primary" id="modalSendMessageButton">Send Message</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

</body>
</html>
