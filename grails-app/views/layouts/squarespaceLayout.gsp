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
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'squarespaceTheme.css')}" type="text/css">

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
<nav class="navbar navbar-squarespace" id="squarespaceNavBar">
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
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact Us</a></li>




                <li>
                    <button class="btn btn-sqspcLogin" type="submit">Log In</button>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<g:layoutBody/>



<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="${resource(dir: 'js', file: 'bootstrap.min.js')}"></script>
<script src="${resource(dir: 'js', file: 'jquery.maskedinput.js')}"></script>
<script src="${resource(dir: 'js', file: 'register.js')}"></script>
</body>
</html>
