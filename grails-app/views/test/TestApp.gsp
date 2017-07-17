<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="layout" content="SpecLayout">
    <title>Jasmine Spec Runner v2.5.2</title>

    <script>
        var versionMode = false;
        <g:if test="${versionMode == true}">
        versionMode= true;
        </g:if>
    </script>

    <link rel="stylesheet" href="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.6.2/jasmine_favicon.png')}" type="image/png">
    <link rel="stylesheet" href="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.6.2/jasmine.css')}" type="text/css">

    <style>
    .jasmine_html-reporter{
        margin-left:50px;
    }
    </style>

    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.6.2/jasmine.js')}"></script>
    <script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.6.2/jasmine-html.js')}"></script>
    <script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.6.2/boot.js')}"></script>
    <script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.6.2/jasmine-jquery.js')}"></script>
    <script src="${resource(dir: 'test/jasmine/', file: 'lib/jasmine-2.6.2/mock-ajax.js')}"></script>


    <link rel="stylesheet" href="${resource(dir: 'css', file: 'newSubmission.css')}" type="text/css">

    <script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}" async></script>
    <script src="${resource(dir: 'js', file: 'jquery.maskedinput.js')}" ></script>
    <script src="${resource(dir: 'js', file: 'moment.js')}" ></script>
    <script src="${resource(dir: 'js', file: 'js.cookie.js')}" ></script>
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
    <script src="${resource(dir: 'js/utils/', file: 'randomGenerator.js')}" ></script>
    <script src="${resource(dir: 'js/utils/', file: 'fileHelper.js')}" ></script>

    <script src="${resource(dir: 'test/jasmine/', file: 'utils/testHelper.js'+"?ts=" + new Date().getTime())}"></script>


    %{--<link rel="stylesheet" href="${resource(dir: 'css', file: 'newSubmission.css')}" type="text/css">--}%


    %{--<script src="${resource(dir: 'js/admin/', file: 'data.js')}" ></script>--}%

    %{--<script src="${resource(dir: 'js/forms/', file: 'specFilm.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/forms/', file: 'specialEventLiability.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/forms/', file: 'specialEventVendor.js')}" ></script>--}%

    %{--<script src="${resource(dir: 'js/newSubmissionUtils/', file: 'AIMHelper.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/newSubmissionUtils/', file: 'BORHelper.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/newSubmissionUtils/', file: 'dateHelper.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/newSubmissionUtils/', file: 'formValidation.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/newSubmissionUtils/', file: 'googleAddressHelper.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/newSubmissionUtils/', file: 'progressSaveLoad.js')}" ></script>--}%

    %{--<script src="${resource(dir: 'js/utils/', file: 'ajaxHandlers.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/utils/', file: 'fileHelper.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/utils/', file: 'randomGenerator.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/utils/', file: 'stringUtils.js')}" ></script>--}%

    %{--<script src="${resource(dir: 'js/', file: 'dashboard.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/', file: 'messages.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/', file: 'newSubmission.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/', file: 'newSubmissionConfirm.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/', file: 'npm.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/', file: 'register.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/', file: 'sandbox.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/', file: 'submissions.js')}" ></script>--}%
    %{--<script src="${resource(dir: 'js/', file: 'submissionView.js')}" ></script>--}%








    <!-- include source files here... -->
    %{--<script src="${resource(dir: 'test/jasmine/', file: 'utils/testHelper.js'+"?ts=" + new Date().getTime())}"></script>--}%


    <!-- include spec files here... -->
    <script src="${resource(dir: 'test/jasmine/', file: 'spec/TestAppSpec.js'+"?ts=" + new Date().getTime())}"></script>


</head>

<body>
<div id="scriptDiv"></div>
<div id="fixtureDiv"></div>
</body>
</html>
