<!DOCTYPE html>
<html lang="en">
	<head>
        <meta name="layout" content="main">
        <link rel="stylesheet" href="${resource(dir: 'css', file: 'dashboard.css')}" type="text/css">
	</head>
	<body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <h3 style=" color: rgba(0, 0, 0, 0.57);">Wednesday December 12, 2016</h3>
                    <g:if test="${user.userRole == "Broker"}">
                        <span>Broker View</span>
                    </g:if>
                    <g:elseif test="${user.userRole == "Underwriter"}">
                        <span>Underwriter View</span>
                    </g:elseif>
                </div>

            </div>
            <div class="row">
                <div class="col-xs-4">
                    <div class="panel panel-default">
                        <div class="panel-body" style="background-color: rgb(59, 112, 159); color: white; padding-top:25px">
                            <div class="col-xs-12">
                                <span style=" font-size: 25px; font-weight: 500">
                                    <a href="./../main/messages.gsp" class="noStyleLink"> Messages</a>

                                        <g:if test="${messagesUnreadCount== 0}">

                                        </g:if>
                                        <g:else>
                                            <span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgb(19, 170, 142);">
                                                ${messagesUnreadCount}
                                            </span>
                                        </g:else>


                                </span>
                                <span class="glyphicon glyphicon-envelope pull-right"  style=" font-size:35px;" aria-hidden="true"></span>
                            </div>
                            <div class="col-xs-12 dashboardMessageContainer" style="padding-top:18px; font-weight: 400">
                                <g:each in="${messageChains}" var="c" status="i">
                                    <div class="messageChainContainer">
                                    <g:each in="${c}" var="m" status="j">
                                        <g:if test="${j== 0}">

                                        </g:if>
                                        <g:else>
                                            <g:if test="${j == 1}">
                                                <div class="dashboardMessageRow unreadMessageChain" id="${m.messageChainID}_Row" style="cursor:pointer;">
                                            </g:if>
                                            <g:else>
                                                <div class="dashboardMessageRow" id="${m.messageChainID}_Row" style="cursor:pointer; display:none">
                                            </g:else>
                                                    <div class="unreadDiv" style="display: none;">${m.unread}</div>
                                                    <div class="messageChainID" style="display: none;">${m.messageChainID}</div>
                                                    <div class="col-xs-2" style="overflow: hidden;" style="padding-left:0px;">
                                                        <span class="messageDate" style="white-space: nowrap">${m.sentDateTime}</span>
                                                    </div>
                                                    <div class="col-xs-6" style="overflow: hidden;" >
                                                        <span class="messageSubject" style="white-space: nowrap">${m.subject}</span>
                                                    </div>
                                                    <div class="col-xs-4" style="overflow: hidden;">
                                                        <span class="messageWith" style="white-space: nowrap">${m.sender}</span>
                                                    </div>
                                                </div>
                                        </g:else>
                                    </g:each>
                                    </div>
                                </g:each>


                            </div>

                        </div>
                    </div>

                </div>

                <div class="col-xs-4">
                    <div class="panel panel-default">
                        <div class="panel-body" style="background-color: rgb(45, 152, 124); color: white; padding-top:25px">
                            <div class="insuredView">

                            </div>
                            <g:if test="${user.userRole == "Broker"}">
                                <div class="brokerView">
                                    <div class="col-xs-12">
                                        <span style=" font-size: 25px; font-weight: 500">
                                            Policies
                                        </span>
                                        <span class="glyphicon glyphicon glyphicon-file pull-right"  style=" font-size:35px;" aria-hidden="true"></span>
                                    </div>
                                    <div class="col-xs-12" style="padding-top:18px; font-weight: 400;font-size: 15px;">
                                        <div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">
                                            <span>Recent Submissions</span>
                                            %{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">4</span>--}%
                                            <g:each in="${submissions}" var="s" status="i">
                                                <g:if test="${i <5}">
                                                    <div class="col-xs-12" style="margin-top:-4px;">
                                                        <span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>
                                                    </div>
                                                </g:if>


                                            </g:each>

                                        </div>
                                        <div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">
                                            Under Review
                                            <g:if test="${submissionsUnderReview.size > 0}">
                                                <span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">
                                                    ${submissionsUnderReview.size}
                                                </span>
                                            </g:if>
                                            <g:each in="${submissionsUnderReview}" var="s" status="i">
                                                <g:if test="${i <5}">
                                                    <div class="col-xs-12" style="margin-top:-4px;">
                                                        <span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>
                                                    </div>
                                                </g:if>

                                            </g:each>

                                        </div>
                                        <div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">
                                            Quoted
                                            <g:if test="${submissionsQuoted.size > 0}">
                                                <span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">
                                                    ${submissionsQuoted.size}
                                                </span>
                                            </g:if>
                                            <g:each in="${submissionsQuoted}" var="s" status="i">
                                                <g:if test="${i <5}">
                                                    <div class="col-xs-12" style="margin-top:-4px;">
                                                        <span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>
                                                    </div>
                                                </g:if>

                                            </g:each>
                                        </div>
                                        <div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">
                                            Bound Policies
                                            <span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">1</span>
                                        </div>

                                    </div>
                                </div>
                            </g:if>
                            <g:elseif test="${user.userRole == "Underwriter"}">
                                <div class="underwriterView">
                                    <div class="brokerView">
                                        <div class="col-xs-12">
                                            <span style=" font-size: 25px; font-weight: 500">
                                                Submissions
                                            </span>
                                            <span class="glyphicon glyphicon glyphicon-file pull-right"  style=" font-size:35px;" aria-hidden="true"></span>
                                        </div>
                                        <div class="col-xs-12" style="padding-top:18px; font-weight: 400;font-size: 15px;">
                                            <div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">
                                                <span>New Submissions</span>
                                            %{--<span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">4</span>--}%
                                                <g:each in="${submissions}" var="s" status="i">
                                                    <g:if test="${i <5}">
                                                        <div class="col-xs-12" style="margin-top:-4px;">
                                                            <span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>
                                                        </div>
                                                    </g:if>


                                                </g:each>

                                            </div>
                                            <div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">
                                                Under Review
                                                <g:if test="${submissionsUnderReview.size > 0}">
                                                    <span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">
                                                        ${submissionsUnderReview.size}
                                                    </span>
                                                </g:if>
                                                <g:each in="${submissionsUnderReview}" var="s" status="i">
                                                    <g:if test="${i <5}">
                                                        <div class="col-xs-12" style="margin-top:-4px;">
                                                            <span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>
                                                        </div>
                                                    </g:if>

                                                </g:each>

                                            </div>
                                            <div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">
                                                Quoted
                                                <g:if test="${submissionsQuoted.size > 0}">
                                                    <span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">
                                                        ${submissionsQuoted.size}
                                                    </span>
                                                </g:if>
                                                <g:each in="${submissionsQuoted}" var="s" status="i">
                                                    <g:if test="${i <5}">
                                                        <div class="col-xs-12" style="margin-top:-4px;">
                                                            <span style=" font-size: 13px; font-weight:300">${s.namedInsured}</span>
                                                        </div>
                                                    </g:if>

                                                </g:each>
                                            </div>
                                            <div class="col-xs-12" style="padding-left:0px; margin-bottom:4px;">
                                                Bound Policies
                                                <span class="badge" style=" font-size: 15px; font-weight: 500; margin-bottom: 4px; background-color: rgba(0, 0, 0, 0.34);">1</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </g:elseif>





                        </div>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="panel panel-default">
                        <div class="panel-body" style="background-color: rgb(60, 79, 89); color: white; padding-top:25px">
                            <div class="col-xs-12">
                                <span style=" font-size: 25px; font-weight: 500">
                                    Premiums
                                </span>
                                <span class="glyphicon glyphicon-usd pull-right"  style=" font-size:35px;" aria-hidden="true"></span>
                            </div>
                            <div class="col-xs-12" style="padding-top:18px; font-weight: 400">
                                <div class="col-xs-12" style="padding-left:0px;">
                                    <span>Named Insured Policy</span>
                                </div>
                                <div class="col-xs-12" style="padding-left:0px;">
                                    <span>Named Insured Policy</span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>

            <script src="${resource(dir: 'js', file: 'dashboard.js')}"></script>
	</body>

</html>