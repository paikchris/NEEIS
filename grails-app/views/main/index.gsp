<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    %{--<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/dt-1.10.16/datatables.min.css"/>--}%

    %{--<script type="text/javascript" src="https://cdn.datatables.net/v/bs/dt-1.10.16/datatables.min.js"></script>--}%
    <link rel="stylesheet" href="${resource(dir: 'css/utils', file: 'datatables.css')}" type="text/css">
    <script src="${resource(dir: 'js/utils', file: 'datatables.js')}"></script>
    <script src="${resource(dir: 'js/utils', file: 'moments.js')}"></script>
    <script src="${resource(dir: 'js/utils', file: 'datetimemoments.js')}"></script>
    <script src="${resource(dir: 'js/utils', file: 'JSONHelper.js')}"></script>
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'dashboard.css')}" type="text/css">
    <script src="${resource(dir: 'js', file: 'dashboard.js')}"></script>
</head>

<body>
<div id="thisUserIs" style="display:none">${user.email}</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12">
            <h3 style=" color: rgba(0, 0, 0, 0.57);">${todaysDate}</h3>
            <g:if test="${user.userRole == "Broker"}">
                <span>Broker View</span>
            </g:if>
            <g:elseif test="${user.userRole == "Underwriter"}">
                <span>Underwriter View</span>
            </g:elseif>
            <div id="userRole" style="display:none">${user.userRole}</div>
        </div>

        <div class="col-xs-12 row">
            <div class="col-xs-8">
                <div class="row">

                    %{--submission table--}%
                    <div class="col-xs-12">
                        <div class="panel panel-primary">
                            <div class="panel-heading">Submissions</div>

                            <!-- Default panel contents -->
                            <div id="dashboardSubmissionTablePanel">
                                <table class="display table table-striped"
                                       id="table_id"
                                       class="table table-striped table-bordered" width="100%" cellspacing="">
                                    <div class="tableButton  col-xs-12">
                                        <div class="row pull-right">

                                        <div class="btn-group">
                                            <button type="button" class="btn-xs btn-primary dropdown-toggle submissionStatusButton"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Status Filter<span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li class="approval">Request Approval</li>
                                                <li class="binding">Request Binding</li>
                                                <li class="all">All</li>
                                            </ul>
                                        </div>
                                    </div>
                                </table>
                            </div>
                        </div>
                    </div>
                    %{--total sales graph--}%
                    <div class="row">
                        <div class="col-xs-12" id="dashboardBarGraph">
                            <div class="panel panel-primary">
                                <!-- Default panel contents -->
                                <div class="panel-heading">Sales</div>

                                <div class="skills">
                                    <ul class="lines">
                                        <li class="line l--0">
                                            <span class="line__label title">
                                                Sales:
                                            </span>
                                        </li>
                                        <li class="line l--25">
                                            <span class="line__label">
                                                Do you even lift?
                                            </span>
                                        </li>
                                        <li class="line l--50">
                                            <span class="line__label">
                                                50%
                                            </span>
                                        </li>
                                        <li class="line l--75">
                                            <span class="line__label">
                                                75%
                                            </span>
                                        </li>
                                        <li class="line l--100">
                                            <span class="line__label">
                                                100%
                                            </span>
                                        </li>
                                    </ul>

                                    <div class="charts">
                                        <div class="chart chart--dev">
                                            <span class="chart__title">Total Premiums</span>
                                            <ul class="chart--horiz">
                                                <li class="chart__bar" style="width: 98%;">
                                                    <span class="chart__label">
                                                        January
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 98%;">
                                                    <span class="chart__label">
                                                        February
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 70%;">
                                                    <span class="chart__label">
                                                        March
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 40%;">
                                                    <span class="chart__label">
                                                        April
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 40%;">
                                                    <span class="chart__label">
                                                        May
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 60%;">
                                                    <span class="chart__label">
                                                        June
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 55%;">
                                                    <span class="chart__label">
                                                        July
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 50%;">
                                                    <span class="chart__label">
                                                        August
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 40%;">
                                                    <span class="chart__label">
                                                        September
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 60%;">
                                                    <span class="chart__label">
                                                        October
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 60%;">
                                                    <span class="chart__label">
                                                        November
                                                    </span>
                                                </li>
                                                <li class="chart__bar" style="width: 60%;">
                                                    <span class="chart__label">
                                                        December
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            %{--ACTIVITY FEED--}%
            <div class="col-xs-4">
                <div class="panel panel-primary">
                    <!-- Default panel contents -->
                    <div class="panel-heading">This is not an Activity Feed</div>

                    <div id="dashboardActivityFeedPanel">
                        <div class="activity-feed">

                            %{--LOOP THIS--}%
                            %{--<div class="feed-item">--}%
                            %{--<div class="dashboardActivityDate"></div>--}%

                            %{--<div class="dashboardActivityText"></a>--}%
                            %{--</div>--}%
                            %{--</div>--}%


                            <div class="feed-item">
                                <div class="date">Dec 25</div>

                                <div class="text">Jason Approved <a href="single-need.php">“3928393”</a>
                                </div>
                            </div>

                            <div class="feed-item">
                                <div class="date">Dec 24</div>

                                <div class="text">Jessica Requested more information for <a
                                        href="single-need.php">“334533”</a></div>
                            </div>

                            <div class="feed-item">
                                <div class="date">Dec 23</div>

                                <div class="text">Shauna Bound <a href="single-need.php">“234222”</a></div>
                            </div>

                            <div class="feed-item">
                                <div class="date">Dec 21</div>

                                <div class="text">Emma Approved <a href="single-need.php">“234644”</a></div>
                            </div>

                            <div class="feed-item">
                                <div class="date">Dec 18</div>

                                <div class="text">Charles Bound <a href="single-need.php">“234263”</a></div>
                            </div>

                            <div class="feed-item">
                                <div class="date">Dec 17</div>

                                <div class="text">Travis Requested more information for <a
                                        href="single-need.php">“837272”</a></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

</div>
</body>
%{--<body>--}%
%{--<div id="thisUserIs" style="display:none">${user.email}</div>--}%
%{--<div class="container-fluid">--}%
%{--<div class="row">--}%
%{--<div class="col-xs-12">--}%
%{--<h3 style=" color: rgba(0, 0, 0, 0.57);">${todaysDate}</h3>--}%
%{--<g:if test="${user.userRole == "Broker"}">--}%
%{--<span>Broker View</span>--}%
%{--</g:if>--}%
%{--<g:elseif test="${user.userRole == "Underwriter"}">--}%
%{--<span>Underwriter View</span>--}%
%{--</g:elseif>--}%
%{--</div>--}%

%{--</div>--}%
%{--<div class="row">--}%
%{--<div class="col-xs-4">--}%
%{--<div class="panel panel-default">--}%
%{--<div class="panel-body" style="background-color: rgb(59, 112, 159); color: white; padding-top:25px">--}%
%{--<div class="col-xs-12">--}%
%{--<span style=" font-size: 25px; font-weight: 500">--}%
%{--<a href="./../main/messages.gsp" class="noStyleLink"> Messages</a>--}%

%{--<g:if test="${messagesUnreadCount== 0}">--}%

%{--</g:if>--}%
%{--<g:else>--}%
%{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgb(19, 170, 142);">--}%
%{--${messagesUnreadCount}--}%
%{--</span>--}%
%{--</g:else>--}%


%{--</span>--}%
%{--<span class="glyphicon glyphicon-envelope pull-right"  style=" font-size:35px;" aria-hidden="true"></span>--}%
%{--</div>--}%
%{--<div class="col-xs-12 dashboardMessageContainer" style="padding-top:18px; font-weight: 400">--}%
%{--<g:each in="${messageChains}" var="c" status="i">--}%
%{--<div class="messageChainContainer">--}%
%{--<g:each in="${c}" var="m" status="j">--}%
%{--<g:if test="${j== 0}">--}%

%{--</g:if>--}%
%{--<g:else>--}%
%{--<g:if test="${j == 1}">--}%
%{--<div class="dashboardMessageRow" id="${m.messageChainID}_Row" style="cursor:pointer;">--}%
%{--</g:if>--}%
%{--<g:else>--}%
%{--<div class="dashboardMessageRow" id="${m.messageChainID}_Row" style="cursor:pointer; display:none">--}%
%{--</g:else>--}%
%{--<div class="unreadDiv" style="display: none;">${m.unread}</div>--}%
%{--<div class="messageChainID" style="display: none;">${m.messageChainID}</div>--}%
%{--<div class="col-xs-2" style="overflow: hidden; padding-left:0px;" style="padding-left:0px;">--}%
%{--<span class="messageDate" style="white-space: nowrap">${m.sentDateTime}</span>--}%
%{--</div>--}%
%{--<div class="col-xs-6" style="overflow: hidden;" >--}%
%{--<span class="messageSubject" style="white-space: nowrap">${m.subject}</span>--}%
%{--</div>--}%
%{--<div class="col-xs-4" style="overflow: hidden; padding-right: 0px;">--}%
%{--<span class="messageWith" style="white-space: nowrap">${m.sender}</span>--}%
%{--</div>--}%
%{--</div>--}%
%{--</g:else>--}%
%{--</g:each>--}%
%{--</div>--}%
%{--</g:each>--}%


%{--</div>--}%

%{--</div>--}%
%{--</div>--}%

%{--</div>--}%

%{--<div class="col-xs-4">--}%
%{--<div class="panel panel-default">--}%
%{--<div class="panel-body" style="background-color: rgb(45, 152, 124); color: white; padding-top:25px">--}%
%{--<div class="insuredView">--}%

%{--</div>--}%
%{--<g:if test="${user.userRole == "Broker"}">--}%
%{--<div class="brokerView">--}%
%{--<div class="col-xs-12">--}%
%{--<span style=" font-size: 25px; font-weight: 500">--}%
%{--Policies--}%
%{--</span>--}%
%{--<span class="glyphicon glyphicon glyphicon-file pull-right"  style=" font-size:35px;" aria-hidden="true"></span>--}%
%{--</div>--}%
%{--<div class="col-xs-12" style="padding-top:18px; font-weight: 400;font-size: 15px;">--}%
%{--<div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">--}%
%{--<span>Recent Submissions</span>--}%
%{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">4</span>--}%
%{--<g:each in="${submissions}" var="s" status="i">--}%
%{--<g:if test="${i <5}">--}%
%{--<div class="col-xs-12" style="margin-top:-4px;">--}%
%{--<span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>--}%
%{--</div>--}%
%{--</g:if>--}%


%{--</g:each>--}%

%{--</div>--}%
%{--<div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">--}%
%{--Under Review--}%
%{--<g:if test="${submissionsUnderReview.size > 0}">--}%
%{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">--}%
%{--${submissionsUnderReview.size}--}%
%{--</span>--}%
%{--</g:if>--}%
%{--<g:each in="${submissionsUnderReview}" var="s" status="i">--}%
%{--<g:if test="${i <5}">--}%
%{--<div class="col-xs-12" style="margin-top:-4px;">--}%
%{--<span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>--}%
%{--</div>--}%
%{--</g:if>--}%

%{--</g:each>--}%

%{--</div>--}%
%{--<div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">--}%
%{--Quoted--}%
%{--<g:if test="${submissionsQuoted.size > 0}">--}%
%{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">--}%
%{--${submissionsQuoted.size}--}%
%{--</span>--}%
%{--</g:if>--}%
%{--<g:each in="${submissionsQuoted}" var="s" status="i">--}%
%{--<g:if test="${i <5}">--}%
%{--<div class="col-xs-12" style="margin-top:-4px;">--}%
%{--<span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>--}%
%{--</div>--}%
%{--</g:if>--}%

%{--</g:each>--}%
%{--</div>--}%
%{--<div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">--}%
%{--Bound Policies--}%
%{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">1</span>--}%
%{--</div>--}%

%{--</div>--}%
%{--</div>--}%
%{--</g:if>--}%
%{--<g:elseif test="${user.userRole == "Underwriter"}">--}%
%{--<div class="underwriterView">--}%
%{--<div class="brokerView">--}%
%{--<div class="col-xs-12">--}%
%{--<span style=" font-size: 25px; font-weight: 500">--}%
%{--Submissions--}%
%{--</span>--}%
%{--<span class="glyphicon glyphicon glyphicon-file pull-right"  style=" font-size:35px;" aria-hidden="true"></span>--}%
%{--</div>--}%
%{--<div class="col-xs-12" style="padding-top:18px; font-weight: 400;font-size: 15px;">--}%
%{--<div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">--}%
%{--<span>New Submissions</span>--}%
%{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">4</span>--}%
%{--<g:each in="${submissions}" var="s" status="i">--}%
%{--<g:if test="${i <5}">--}%
%{--<div class="col-xs-12" style="margin-top:-4px;">--}%
%{--<span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>--}%
%{--</div>--}%
%{--</g:if>--}%


%{--</g:each>--}%

%{--</div>--}%
%{--<div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">--}%
%{--Under Review--}%
%{--<g:if test="${submissionsUnderReview.size > 0}">--}%
%{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">--}%
%{--${submissionsUnderReview.size}--}%
%{--</span>--}%
%{--</g:if>--}%
%{--<g:each in="${submissionsUnderReview}" var="s" status="i">--}%
%{--<g:if test="${i <5}">--}%
%{--<div class="col-xs-12" style="margin-top:-4px;">--}%
%{--<span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>--}%
%{--</div>--}%
%{--</g:if>--}%

%{--</g:each>--}%

%{--</div>--}%
%{--<div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">--}%
%{--Quoted--}%
%{--<g:if test="${submissionsQuoted.size > 0}">--}%
%{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">--}%
%{--${submissionsQuoted.size}--}%
%{--</span>--}%
%{--</g:if>--}%
%{--<g:each in="${submissionsQuoted}" var="s" status="i">--}%
%{--<g:if test="${i <5}">--}%
%{--<div class="col-xs-12" style="margin-top:-4px;">--}%
%{--<span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>--}%
%{--</div>--}%
%{--</g:if>--}%

%{--</g:each>--}%
%{--</div>--}%
%{--<div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">--}%
%{--Bound Policies--}%
%{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">1</span>--}%
%{--</div>--}%

%{--</div>--}%
%{--</div>--}%
%{--</div>--}%
%{--</g:elseif>--}%





%{--</div>--}%
%{--</div>--}%
%{--</div>--}%
%{--<div class="col-xs-4">--}%
%{--<div class="panel panel-default">--}%
%{--<div class="panel-body" style="background-color: rgb(60, 79, 89); color: white; padding-top:25px">--}%
%{--<div class="col-xs-12">--}%
%{--<span style=" font-size: 25px; font-weight: 500">--}%
%{--Premiums--}%
%{--</span>--}%
%{--<span class="glyphicon glyphicon-usd pull-right"  style=" font-size:35px;" aria-hidden="true"></span>--}%
%{--</div>--}%
%{--<div class="col-xs-12" style="padding-top:18px; font-weight: 400">--}%
%{--<div class="col-xs-12" style="padding-left:0px;">--}%
%{--<span>Named Insured Policy</span>--}%
%{--</div>--}%
%{--<div class="col-xs-12" style="padding-left:0px;">--}%
%{--<span>Named Insured Policy</span>--}%
%{--</div>--}%

%{--</div>--}%

%{--</div>--}%
%{--</div>--}%
%{--</div>--}%
%{--</div>--}%


%{--</div>--}%
%{--</div>--}%
%{--</body>--}%

</html>