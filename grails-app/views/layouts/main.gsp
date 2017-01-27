<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
	<title>New Empire Portal</title>

	<!-- Bootstrap -->
	<link rel="stylesheet" href="${resource(dir: 'css', file: 'bootstrap.min.css')}" type="text/css">

	%{--CUSTOM STYLESHEET--}%
	<link rel="stylesheet" href="${resource(dir: 'css', file: 'neeisTheme.css')}" type="text/css">
	%{--<link rel="stylesheet" href="${resource(dir: 'css', file: 'squarespaceTheme.css')}" type="text/css">--}%

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

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
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#" id="myAccountButton">My Account</a></li>
						%{--<li><a href="#" id="settingsButton">Settings</a></li>--}%
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
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="${resource(dir: 'js', file: 'jquery.maskedinput.js')}"></script>
	<script src="${resource(dir: 'js', file: 'moment.js')}"></script>

		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="${resource(dir: 'js', file: 'bootstrap.min.js')}"></script>
		<script src="${resource(dir: 'js', file: 'global.js')}"></script>


		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>



		<script>
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
							<button type="button" class="btn btn-default">Reset Password</button>
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
			%{--<div class="modal-footer">--}%
			%{--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>--}%
			%{--<button type="submit" class="btn btn-primary">Save changes</button>--}%
			%{--</div>--}%
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
<div class="modal" id="loadingModal"><!-- Place at bottom of page --></div>

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
