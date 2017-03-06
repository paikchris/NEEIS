<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'submissions.css')}" type="text/css">
    <link rel="stylesheet" href="${resource(dir: 'plugins/fuelux/css', file: 'fuelux.min.css')}" type="text/css">
    <script src="${resource(dir: 'plugins/fuelux/js', file: "fuelux.min.js")}"></script>
    <script src="${resource(dir: 'js/admin/', file: "data.js")}"></script>
    <style>
        .riskCategory_ListItem{
            font-weight:500;
        }
        a.subCategory_ListItem{
             font-size:smaller;
             font-weight:500;
             /*height: 36px;*/
             padding: 4px 20px;
            margin-left:40px;
         }
        a.riskType_ListItem{
            font-size:smaller;
            /*padding-left:80px;*/
            padding: 4px 20px;
            margin-left: 80px;
        }
        a.list-group-item.subCategory_ListItem.active,
        .list-group-item.subCategory_ListItem.active:focus,
        .list-group-item.subCategory_ListItem.active:hover {
            background-color: #405b6d;
            border-color: #405b6d;
        }

        a.list-group-item.riskType_ListItem.active,
        .list-group-item.riskType_ListItem.active:focus,
        .list-group-item.riskType_ListItem.active:hover {
            background-color:  rgba(38, 83, 121, 0.7);
            border-color:  rgba(38, 83, 121, 0.7);

        }
        .riskLI{
            margin:6px;
        }
    </style>
</head>

<body class="fuelux">
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
                        <div class="col-xs-3">
                            <div class="col-xs-12">
                                <h5>Risk Types</h5>
                            </div>
                            <div class="col-xs-12">
                                <div class="list-group">
                                    <g:each var="category" in="${riskCategories}">
                                        <a href="#" class="list-group-item riskLI riskCategory_ListItem"
                                            <g:each  var="column" in="${category.domainClass.persistentProperties*.name}">
                                                data-${column}="${category.getAt(column)}"
                                            </g:each>
                                            style="">
                                            ${category.riskCategoryName}
                                        </a>
                                        <g:each  var="subcategory" in="${riskTypes}">%{--Loop through all--}%
                                            <g:if test="${subcategory.riskTypeCategory == category.riskCategoryCode}">
                                                <g:if test="${subcategory.subCategoryFlag == "Y"}">%{--Dropdown for risk--}%
                                                    <a href="#" class="list-group-item riskLI subCategory_ListItem"
                                                        <g:each  var="column" in="${subcategory.domainClass.persistentProperties*.name}">
                                                            data-${column}="${subcategory.getAt(column)}"
                                                        </g:each>
                                                       style="display: none;">
                                                        ${subcategory.riskTypeName}
                                                    </a>
                                                    <g:each  var="risktype" in="${riskTypes.findAll{it.parentSubCategory == subcategory.riskTypeName}}"> %{--Find all risks in subCategory--}%
                                                        <a href="#" class="list-group-item riskLI riskType_ListItem"
                                                            <g:each  var="column" in="${risktype.domainClass.persistentProperties*.name}">
                                                                data-${column}="${risktype.getAt(column)}"
                                                            </g:each>
                                                           style="display: none;">
                                                            ${risktype.riskTypeName}
                                                        </a>
                                                    </g:each>
                                                </g:if>
                                                <g:elseif test="${subcategory.subCategoryFlag == "N" && subcategory.parentSubCategory.trim() == "" }">
                                                    <a href="#" class="list-group-item riskLI subCategory_ListItem"
                                                        <g:each  var="column" in="${subcategory.domainClass.persistentProperties*.name}">
                                                            data-${column}="${subcategory.getAt(column)}"
                                                        </g:each>
                                                       style="display: none;">
                                                        ${subcategory.riskTypeName}
                                                    </a>
                                                </g:elseif>
                                            </g:if>
                                        </g:each>
                                    </g:each>

                                </div>
                            </div>
                        </div>

                        <div class="col-xs-9">
                            <div id="riskTypeFields">
                                <div class="col-xs-12">
                                    <h5>Risk Type Fields</h5>
                                </div>
                                <div class="col-xs-12">
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Risk Name</label>
                                            <input type="text" class="form-control fieldInput" id="riskTypeName_Input" data-fieldName="riskTypeName" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Risk Category </label>
                                            <input type="text" class="form-control fieldInput" id="riskTypeCategory_Input" data-fieldName="riskTypeCategory" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Sub Category </label>
                                            <input type="text" class="form-control fieldInput" id="parentSubCategory_Input" data-fieldName="parentSubCategory" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Is a Sub Category? (Y/N) </label>
                                            <input type="text" class="form-control fieldInput" id="subCategoryFlag_Input" data-fieldName="subCategoryFlag" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Coverages </label>
                                            <input type="text" class="form-control fieldInput" id="coverages_Input" data-fieldName="riskTypeCategory" placeholder="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="riskCategoryFields">
                                <div class="col-xs-12">
                                    <h5>Risk Category Fields</h5>
                                </div>
                                <div class="col-xs-12">
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Risk Category</label>
                                            <input type="text" class="form-control fieldInput" id="riskCategoryName_Input" data-fieldName="riskTypeCategory" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Risk Category </label>
                                            <input type="text" class="form-control fieldInput" id="riskTypeCategory_Input" data-fieldName="riskTypeCategory" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Sub Category </label>
                                            <input type="text" class="form-control fieldInput" id="parentSubCategory_Input" data-fieldName="riskTypeCategory" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Is a Sub Category? (Y/N) </label>
                                            <input type="text" class="form-control fieldInput" id="subCategoryFlag_Input" data-fieldName="riskTypeCategory" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                            <label>Coverages </label>
                                            <input type="text" class="form-control fieldInput" id="coverages_Input" data-fieldName="riskTypeCategory"placeholder="">
                                        </div>
                                    </div>
                                </div>
                            </div>
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