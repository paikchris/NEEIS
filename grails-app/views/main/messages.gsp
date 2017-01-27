<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'submissions.css')}" type="text/css">
    <style>
        .unreadMessageChain {font-weight: 600;}
        .currentSelectedChain {background: rgba(195, 235, 255, 0.55);}
        .messagePanelMe {background: rgba(5, 210, 255, 0.16);}
        .messagePanelOther{background: rgba(209, 255, 202, 0.39);}
    </style>
</head>

<body>
<div class="col-xs-12">

</div>

<br>
<div class="col-xs-12">
    <div class="col-xs-4">
        <h3 style=" color: rgba(0, 0, 0, 0.57); margin-top:0px; margin-bottom:0px;">Messages</h3>
        <g:if test="${user.userRole == "Broker"}">
            <span>Broker View</span>
        </g:if>
        <g:elseif test="${user.userRole == "Underwriter"}">
            <span>Underwriter View</span>
        </g:elseif>
    </div>
    <div class="col-xs-4 ">

    </div>
    <div class="col-xs-4">
        <button type="button" class="btn btn-default pull-right" aria-label="Left Align" id="newMessageButton">
            <span class="glyphicon glyphicon-envelope" aria-hidden="true" style="top: 0.2em"></span> New Message
        </button>
    </div>


</div>
<div class="form-group col-xs-4 col-xs-offset-4">
</div>

<div class="form-group col-xs-12">
    <div id="thisUserIs" style="display:none">${user.email}</div>
    <div id="initialMessageChainView" style="display:none">${initialChainView}</div>
    <div class="col-xs-4">
        <table class="table">
            <thead>
            <tr class="bg-primary" style="text-align: center; font-size: 14px; background-color: #405b6d;">
                <th>Subject</th>
                <th>From</th>
                %{--<th>Message</th>--}%
                <th>Time</th>
                <th><span class="glyphicon glyphicon-paperclip" aria-hidden="true" style="top: 0.2em"></span></th>

            </tr>
            </thead>

            %{--<tbody id="messageRows" style="font-size: 13px;">--}%
                <g:each in="${messageChains}" var="c" status="i">
                <tbody class="messageChainContainer">
                    <g:each in="${c}" var="m" status="j">
                        <g:if test="${j== 0}">

                        </g:if>
                        <g:elseif test="${j== 1}">
                            <g:if test="${m.unread == "true"}">
                                <tr class="messageRow unreadMessageChain" id="${m.messageChainID}_Row" style="cursor:pointer;">
                            </g:if>
                            <g:else>
                                <tr class="messageRow " id="${m.messageChainID}_Row" style="cursor:pointer;">
                            </g:else>

                                <td>
                                    <span class="subjectTD">${m.subject}</span>
                                    <g:if test="${m.messagesInChain > 1}">
                                        <span>(${m.messagesInChain})</span>
                                    </g:if>
                                </td>
                                <td class="conversationWithTD">${(messageChains[0])[0]}</td>
                                <td class="senderTD" style="display:none">${m.sender}</td>
                                <td class="messageBodyTD" style="display:none">${m.body}</td>
                                <td class="lastMessageSentDateTimeTD">${m.sentDateTime}</td>
                                <td>${m.attachments}</td>
                                <td class="messagesInChain" style="display:none">${m.messagesInChain}</td>
                                <td class="messageChainIDTD" style="display:none">${m.messageChainID}</td>
                                <td class="fullBody" style="display:none; white-space: pre-line">${m.body}</td>
                                <td class="recipientTD" style="display:none">${m.recipient}</td>
                                <td class="messageIDTD" style="display:none">${m.id}</td>
                                <td class="messageDateTimeTD" style="display:none">${m.sentDateTime}</td>
                                <td class="unreadTD" style="display:none">${m.unread}</td>
                            </tr>
                        </g:elseif>
                        <g:else>
                            <tr class="subMessageRow" style="cursor:pointer; display:none" >
                                <td>
                                <span class="subjectTD">${m.subject}</span>
                                <g:if test="${m.messagesInChain > 1}">
                                    <span>(${m.messagesInChain})</span>
                                </g:if>
                                </td>
                                <td class="senderTD">${m.sender}</td>
                                <td class="messageBodyTD" style="display:none">${m.body}</td>
                                <td>${m.sentDateTime}</td>
                                <td>${m.attachments}</td>
                                <td class="messagesInChain" style="display:none">${m.messagesInChain}</td>
                                <td class="messageChainIDTD" style="display:none">${m.messageChainID}</td>
                                <td class="fullBody" style="display:none; white-space: pre-wrap">${m.body}</td>
                                <td class="recipientTD" style="display:none">${m.recipient}</td>
                                <td class="messageIDTD" style="display:none">${m.id}</td>
                                <td class="messageDateTimeTD" style="display:none">${m.sentDateTime}</td>
                                <td class="unreadTD" style="display:none">${m.unread}</td>
                            </tr>
                        </g:else>
                    </g:each>
                </tbody>
            </g:each>
            %{--</tbody>--}%
        </table>
    </div>

    <div class="col-xs-8"  style="padding:0px">
        <div id="messageViewContainer">
            <div class="panel panel-default" >
                <div class="panel-body">
                    <div class="row" style="padding:0px;">
                        <div class="col-xs-12">
                            <span>From:</span>
                            <span class="messageViewSender">Sender</span>

                        </div>
                        <div class="col-xs-12">
                            <span>To:</span>
                            <span class="messageViewRecipient">Recipient</span>
                        </div>
                        <div class="col-xs-12">
                            <span class="messageViewSubject">Subject</span>
                        </div>
                        <div class="col-xs-12" style="margin-top:40px;">
                            <span class="messageViewMessageBody">Message Body</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-default" >
                <div class="panel-body">
                    <div class="row" style="padding:0px;">
                        <div class="col-xs-12">
                            <span>From:</span>
                            <span id="messageViewSender">Sender</span>

                        </div>
                        <div class="col-xs-12">
                            <span>To:</span>
                            <span id="messageViewRecipient">Recipient</span>
                        </div>
                        <div class="col-xs-12">
                            <span id="messageViewSubject">Subject</span>
                        </div>
                        <div class="col-xs-12" style="margin-top:40px;">
                            <span id="messageViewMessageBody">Message Body</span>
                        </div>
                    </div>
                    <div class="col-xs-6" style="padding:0px;">
                        %{--<button type="button" class="btn btn-default pull-right" aria-label="Left Align" id="newMesageButton">--}%
                        %{--<span class="glyphicon glyphicon-share-alt" aria-hidden="true" style="top: 0.2em;transform: scaleX(-1);--}%
                        %{---moz-transform: scaleX(-1);--}%
                        %{---webkit-transform: scaleX(-1);--}%
                        %{---ms-transform: scaleX(-1);"></span> Reply--}%
                        %{--</button>--}%
                    </div>
                </div>
            </div>
        </div>
        <div id="messageReplyContainer">
            <div class="col-xs-12" style="padding:0px;">
                <textarea class="form-control" rows="5" id="replyTextArea" style="resize: vertical; width:100%" placeholder="Send a Reply"></textarea>
            </div>
        </div>
            <div class="col-xs-12" style="margin-top: 10px; padding-right:0px;">
                <button type="button" class="btn btn-default pull-right"  id="sendReplyButton">Send
                </button>
            </div>


    </div>

</div>
</div>
<script src="${resource(dir: 'js', file: 'messages.js')}"></script>
<script src="${resource(dir: 'js', file: 'jquery.maskMoney.min.js')}"></script>
</body>