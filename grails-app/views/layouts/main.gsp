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

	<!-- ANIMATE.CSS -->
	<link rel="stylesheet" href="${resource(dir: 'css', file: 'animate.min.css')}" type="text/css">

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



	%{--REQUIRE JS--}%
	%{--<script data-main="scripts/main" src="scripts/require.js"></script>--}%
	%{--<script src="js/vendor/require.js"></script>--}%
	%{--<script src="${resource(dir: 'js/vendor', file: 'require.js')}" ></script>--}%






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

	<script src="${resource(dir: 'js/utils', file: 'notifications.js')}" ></script>

	

	<script src="${resource(dir: 'js/utils', file: 'ajaxHandlers.js')}" ></script>

	<!-- Jquery Bootstrap Wizard Plugin-->
	%{--<link rel="stylesheet" href="${resource(dir: 'plugins/UI/bootstrap-wizard/css', file: 'smart_wizard.css')}" type="text/css">--}%
	%{--<link rel="stylesheet" href="${resource(dir: 'plugins/UI/bootstrap-wizard/css', file: 'smart_wizard_theme_arrows.css')}" type="text/css">--}%
	%{--<script src="${resource(dir: 'plugins/UI/bootstrap-wizard/js', file: 'jquery.smartWizard.min.js')}" ></script>--}%

	%{--GOOGLE ADDRESS HELPER--}%
	<script src="${resource(dir: 'js', file: "/newSubmissionUtils/googleAddressHelper.js?ts=" + new Date().getTime())}" async></script>

	<!-- DATE PICKER PLUGIN -->
	<script src="${resource(dir: 'js/vendor/', file: 'bootstrap-datepicker.js')}" ></script>
	<link rel="stylesheet" href="${resource(dir: 'css', file: 'bootstrap-datepicker3.css')}" type="text/css">

	<!-- TWITTER'S TYPEAHEAD PLUGIN-->
	<script src=	"${resource(dir: 'js/vendor/typeahead', file: 'bloodhound.min.js')}" ></script>
	<script src="${resource(dir: 'js/vendor/typeahead', file: 'typeahead.bundle.min.js')}" ></script>
	<script src="${resource(dir: 'js/vendor/typeahead', file: 'typeahead.jquery.min.js')}" ></script>
	<link rel="stylesheet" href="${resource(dir: 'css', file: 'typeaheadjs.css')}" type="text/css">


	<!-- Masking Inputs plugin -->
	<script src="${resource(dir: 'js', file: 'jquery.maskedinput.js')}" ></script>

	<!-- Masking Currency plugin -->
	<script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}"></script>

	<!-- Velocity Animations plugin-->
	<script src="${resource(dir: 'js/vendor', file: 'velocity.min.js')}" ></script>


	<script src="${resource(dir: 'test/jasmine/utils', file: 'testHelper.js?ts=' + new Date().getTime())}" ></script>
	

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

	%{--STORE.JS PLUGIN--}%

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
				<li class="dropdown" >
					<a href="#" class="dropdown-toggle" id="notificationDropdownToggle"  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						<span class="glyphicon glyphicon-bell" aria-hidden="true"></span>
						<span class="badge badge-notify" id="notificationCountSpan">3</span>
					</a>
					<ul class="dropdown-menu" id="notificationListContainer">
						<li><a href="#">Premium approved</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Document needs to be signed</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Policy Issued</a></li>
					</ul>
				</li>


				<li><a href="#" style="padding-right:2px; padding-top: 14px;"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" style="padding-left: 2px" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" id="loggedInUser">
						${user.firstName} ${user.lastName}
						<span id="userDetails-email" style="display:none">${user.email}</span>
						<span id="userDetails-company" style="display:none">${user.company}</span>
						<span id="userDetails-firstName" style="display:none">${user.firstName}</span>
						<span id="userDetails-lastName" style="display:none">${user.lastName}</span>
						<span id="userDetails-aimContactID" style="display:none">${user.aimContactID}</span>
						<span id="userDetails-phoneNumber" style="display:none">${user.phoneNumber}</span>
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#" id="myAccountButton">Account Settings</a></li>
						<g:if test="${user.admin == "true"}">
							<li><a href="./../admin/data" id="data">Data Management</a></li>
							<li><a href="./../admin/datab" id="data2">Data Management V2</a></li>
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
			<li>
				<a href="./../main/index.gsp"><span class="glyphicon glyphicon-th-large" aria-hidden="true"></span> Dashboard</a>
			</li>
			%{--<g:if test="${user.admin == "true"}">--}%
				<li>
					%{--<a href="./../main/newSubmission.gsp"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> New Policy</a>--}%
					<a href="./../main/newSubmissionV2.gsp"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> New Policy</a>
				</li>
			%{--</g:if>--}%
			<li>
				<a href="./../main/submissions.gsp"><span class="glyphicon glyphicon-file" aria-hidden="true"></span> My Submissions</a>
			</li>
			<li>
				<a href="./../main/messages.gsp"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Messages</a>
			</li>
			%{--<g:if test="${user.admin == "true"}">--}%
				%{--<li>--}%
					%{--<a href="./../main/newSubmissionV2.gsp"><span class="fa fa-wrench" aria-hidden="true"></span> New Policy V2</a>--}%
				%{--</li>--}%
			%{--</g:if>--}%
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

<!-- Neeis Global JS file-->
<script src="${resource(dir: 'js', file: 'global.js')}" ></script>
<g:render template="/shared/modals/myAccountModal" model="[user:user,agency:agency]"/>
<g:render template="/shared/modals/changePasswordModal" model=""/>
<g:render template="/shared/modals/alertMessageModal" model=""/>


<g:render template="/shared/modals/loadSaveModal" model=""/>
<g:render template="/shared/modals/settingsModal" model=""/>
<g:render template="/shared/modals/loadingModal" model=""/>
<g:render template="/shared/modals/progressBarModal" model=""/>
<g:render template="/shared/modals/newMessageModal" model=""/>

</body>
</html>
