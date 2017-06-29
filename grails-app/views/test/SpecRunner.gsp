<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Jasmine Spec Runner v2.5.2</title>

    <link rel="stylesheet" href="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/jasmine_favicon.png')}" type="image/png">
    <link rel="stylesheet" href="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/jasmine.css')}" type="text/css">

    <style>
    .jasmine_html-reporter{
        margin-left:50px;
    }
    </style>

    <script src="${resource(dir: 'test/jasmine/', file: 'vendor/jquery/jquery.js')}"></script>
    <script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/jasmine.js')}"></script>
    <script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/jasmine-html.js')}"></script>
    <script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/boot.js')}"></script>
    <script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.5.2/jasmine-jquery.js')}"></script>



    <link rel="stylesheet" href="${resource(dir: 'css', file: 'newSubmission.css')}" type="text/css">

    <script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}" async></script>
    %{--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>--}%
    <script src="${resource(dir: 'js', file: 'jquery.maskedinput.js')}" ></script>
    <script src="${resource(dir: 'js', file: 'moment.js')}" ></script>
    <script src="${resource(dir: 'js', file: 'js.cookie.js')}" ></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="${resource(dir: 'js', file: 'bootstrap.min.js')}" ></script>
    <script src="${resource(dir: 'js', file: 'global.js')}" ></script>
    <script src="${resource(dir: 'js', file: 'jquery.autotype.js')}" ></script>
    <script src="${resource(dir: 'js/vendor/', file: 'bootstrap-datepicker.js')}" ></script>
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'bootstrap-datepicker3.css')}" type="text/css">


    <script src="${resource(dir: 'js/newSubmissionUtils/', file: 'AIMHelper.js')}" ></script>
    <script src="${resource(dir: 'js/newSubmissionUtils/', file: 'BORHelper.js')}" ></script>
    <script src="${resource(dir: 'js/newSubmissionUtils/', file: 'dateHelper.js')}" ></script>
    <script src="${resource(dir: 'js/newSubmissionUtils/', file: 'formValidation.js')}" ></script>
    <script src="${resource(dir: 'js/newSubmissionUtils/', file: 'googleAddressHelper.js')}" ></script>
    <script src="${resource(dir: 'js/newSubmissionUtils/', file: 'progressSaveLoad.js')}" ></script>
    <script src="${resource(dir: 'js/utils/', file: 'stringUtils.js')}" ></script>



    <!-- include source files here... -->

    <!-- include spec files here... -->
    <script src="${resource(dir: 'test/jasmine/', file: 'spec/UINewSubmissionSpec.js'+"?ts=" + new Date().getTime())}"></script>

</head>

<body>

<div id="fixtureToBeTested"></div>
</body>
</html>
