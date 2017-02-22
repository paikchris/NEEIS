<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'submissions.css')}" type="text/css">

</head>

<body>
<g:if test="${user.admin == "true"}">
    <div class="col-xs-12">

    </div>

    <br>
    <div class="col-xs-12">
        <div class="col-xs-4">
            <h3 style=" color: rgba(0, 0, 0, 0.57); margin-top:0px; margin-bottom:0px;">Data Management</h3>

                <span>Admin</span>

            <div id="userRole" style="display:none">${user.userRole}</div>
        </div>
        <div class="col-xs-4 ">
        </div>
        <div class="col-xs-4">
        </div>
    </div>
        <div class="col-xs-12">
            <div>
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Risk Types</a></li>
                    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">stuff</a></li>
                    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
                    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane fade in active" id="home">
                        <div class="col-xs-12">

                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="profile">...</div>
                    <div role="tabpanel" class="tab-pane fade" id="messages">...</div>
                    <div role="tabpanel" class="tab-pane fade" id="settings">...</div>
                </div>

            </div>
        </div>



</g:if>
</body>