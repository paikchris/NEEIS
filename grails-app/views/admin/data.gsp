<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'submissions.css')}" type="text/css">
    <link rel="stylesheet" href="${resource(dir: 'plugins/fuelux/css', file: 'fuelux.min.css')}" type="text/css">
    <script src="${resource(dir: 'plugins/fuelux/js', file: "fuelux.min.js")}"></script>
    <script src="${resource(dir: 'js/admin/', file: "data.js")}"></script>
    <style>
    .riskCategory_ListItem {
        font-weight: 500;
    }

    a.subCategory_ListItem {
        font-size: smaller;
        font-weight: 500;
        /*height: 36px;*/
        padding: 4px 20px;
        margin-left: 40px;
    }

    a.riskType_ListItem {
        font-size: smaller;
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
        background-color: rgba(38, 83, 121, 0.7);
        border-color: rgba(38, 83, 121, 0.7);

    }

    .riskLI {
        margin: 6px;
    }

    .chip {
        display: inline-block;
        padding: 0 15px;
        height: 30px;
        font-size: 13px;
        line-height: 30px;
        border-radius: 25px;
        background-color: #f1f1f1;
        cursor:pointer
    }
    .chip:hover {
        background-color: rgba(166, 193, 219, 0.33)
    }
    .chip.active {
        background-color: rgba(93, 171, 219, 0.33)
    }

    .chip img {
        float: left;
        margin: 0 10px 0 -25px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
    .closebtn {
        padding-left: 10px;
        color: #888;
        font-weight: bold;
        line-height: 25px;
        float: right;
        font-size: 20px;
        cursor: pointer;
    }

    .closebtn:hover {
        color: #000;
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
                <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab"
                                                          data-toggle="tab">Risk Types</a></li>
                <li role="presentation"><a href="#profile" aria-controls="profile" role="tab"
                                           data-toggle="tab">stuff</a></li>
                <li role="presentation"><a href="#messages" aria-controls="messages" role="tab"
                                           data-toggle="tab">Messages</a></li>
                <li role="presentation"><a href="#settings" aria-controls="settings" role="tab"
                                           data-toggle="tab">Settings</a></li>
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
                                        <g:each var="column" in="${category.domainClass.persistentProperties*.name}">
                                            data-${column}="${category.getAt(column)}"
                                        </g:each>
                                       style="">
                                        ${category.riskCategoryName}
                                    </a>
                                    <g:each var="subcategory" in="${riskTypes}">%{--Loop through all--}%
                                        <g:if test="${subcategory.riskTypeCategory == category.riskCategoryCode}">
                                            <g:if test="${subcategory.subCategoryFlag == "Y"}">%{--Dropdown for risk--}%
                                                <a href="#" class="list-group-item riskLI subCategory_ListItem"
                                                    <g:each var="column"
                                                            in="${subcategory.domainClass.persistentProperties*.name}">
                                                        data-${column}="${subcategory.getAt(column)}"
                                                    </g:each>
                                                   style="display: none;">
                                                    ${subcategory.riskTypeName}
                                                </a>
                                                <g:each var="risktype" in="${riskTypes.findAll {
                                                    it.parentSubCategory == subcategory.riskTypeName
                                                }}">%{--Find all risks in subCategory--}%
                                                    <a href="#" class="list-group-item riskLI riskType_ListItem"
                                                        <g:each var="column"
                                                                in="${risktype.domainClass.persistentProperties*.name}">
                                                            data-${column}="${risktype.getAt(column)}"
                                                        </g:each>
                                                       style="display: none;">
                                                        ${risktype.riskTypeName}
                                                    </a>
                                                </g:each>
                                            </g:if>
                                            <g:elseif
                                                    test="${subcategory.subCategoryFlag == "N" && subcategory.parentSubCategory.trim() == ""}">
                                                <a href="#" class="list-group-item riskLI subCategory_ListItem"
                                                    <g:each var="column"
                                                            in="${subcategory.domainClass.persistentProperties*.name}">
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
                        <div id="riskTypeFields" style="display:none">
                            <div class="col-xs-12">
                                <h5>Risk Type Fields</h5>
                            </div>

                            <div class="col-xs-12">
                                <div class="row" style="margin-bottom:10px;">
                                    <div class="col-xs-6">
                                        <div class="form-group">
                                            <label>Risk Name</label>
                                            <input type="text" class="form-control fieldInput" id="riskTypeName_Input"
                                                   data-table="riskType" data-column="riskTypeName" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-xs-9">

                                    </div>
                                </div>
                                <div class="row" style="margin-left:-4px;margin-bottom: 40px;">
                                    <div class="col-xs-3">
                                        <label>Coverages</label>
                                        <button class="btn btn-xs btn-primary pull-right" id="" type="button" style="margin-left:20px;"
                                                onclick="$('#addCoverageModal').modal('show'); clearModalCoverageFields();">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="" style="font-size: 14px; font-weight: 500" > Add Coverage</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="row" style="margin-left:-4px;margin-bottom: 40px;">
                                    <div class="col-xs-3">
                                        <label>Products</label>
                                        <button class="btn btn-xs btn-primary pull-right" id="" type="button" style="margin-left:20px;"
                                                onclick="$('#addProductModal').modal('show'); clearModalProductFields();">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="" style="font-size: 14px; font-weight: 500" > Add Product</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="row"  style="margin-left:-4px; margin-top:10px; margin-bottom:10px">
                                    <div class="col-xs-12" id="riskProductsDiv">
                                    </div>

                                </div>
                                <div id="mainConditionContainer" style="margin-bottom: 40px;">
                                    <div class="row" style="margin-left:-4px;">
                                        <div class="col-xs-4">
                                            <label>Show Product When: </label>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:-4px;">
                                        <div class="col-xs-4">
                                            <p>
                                                <input type="checkbox"  class="productField productAvailabilityCheckbox" id="productAlwaysAvailableCheckBox"> Always
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:-4px;">
                                        <div class="col-xs-12">
                                            <p>
                                                <input type="checkbox" class="productField productAvailabilityCheckbox" id="productDependsOnBudget"> Budget is:
                                            </p>
                                        </div>
                                        <div class="col-xs-12" id="productDependsOnBudgetContainer" style="margin-left:25px;margin-bottom:30px; display:none">
                                            <div class="conditionContainer" id="budgetConditionsContainer">
                                                <div class="col-xs-12">
                                                    <select>
                                                        <option>Less Than </option>
                                                        <option>Less Than or Equal To </option>
                                                        <option>Equal To</option>
                                                        <option>Greater Than</option>
                                                        <option>Greater Than or Equal To </option>
                                                    </select>
                                                    <input class="currency" type="text" placeholder = "$"  style="margin-top:4px; margin-bottom:4px; margin-left:20px;"/>
                                                    <button class="btn btn-xs btn-success addCondition" id="" type="button" style="margin-left:20px;">
                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                        <span class="" style="font-size: 14px; font-weight: 500" > Add Another Condition</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:-4px;">
                                        <div class="col-xs-4">
                                            <p>
                                                <input type="checkbox"  class="productField productAvailabilityCheckbox" id="productDependsOnTermLength"> Term Length is:
                                            </p>
                                        </div>
                                        <div class="col-xs-12" id="productDependsOnTermLengthContainer" style="margin-left:25px;margin-bottom:30px; display:none">
                                            <div class="conditionContainer" id="termConditionsContainer">
                                                <div class="col-xs-12">
                                                    <select>
                                                        <option>Less Than </option>
                                                        <option>Less Than or Equal To </option>
                                                        <option>Equal To</option>
                                                        <option>Greater Than</option>
                                                        <option>Greater Than or Equal To </option>
                                                    </select>
                                                    <input class="" type="text" placeholder = "Days"  style="margin-top:4px; margin-bottom:4px; margin-left:20px; "/>
                                                    <button class="btn btn-xs btn-success addCondition" id="" type="button" style="margin-left:20px;">
                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                        <span class="" style="font-size: 14px; font-weight: 500" > Add Another Condition</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div id="riskCategoryFields" style="display:none">
                            <div class="col-xs-12">
                                <h5>Risk Category Fields</h5>
                            </div>

                            <div class="col-xs-12">
                                <div class="col-xs-3">
                                    <div class="form-group">
                                        <label>Risk Category Name</label>
                                        <input type="text" class="form-control fieldInput" id="riskCategoryName_Input" data-table="riskCategory" data-column="riskCategoryName"
                                               placeholder="">
                                    </div>
                                </div>

                                <div class="col-xs-9">
                                </div>

                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Risk Category Description</label>
                                        <textarea class="form-control fieldInput" id="riskTypeCategoryDescription_Input"rows="10" data-table="riskCategory"
                                            data-column="description"></textarea>
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
<div class="modal fade" tabindex="-1" role="dialog" id="addProductModal" style="">
    <div class="modal-dialog" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="">Select Product</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12">
                        <select id="productModalProductSelect">
                            <option value="invalid">Select a Product</option>
                            <g:each var="product" in="${products}">
                                <option value="${product.productID}">${product.productID}</option>
                            </g:each>
                        </select>
                    </div>
                </div>
                <div id="productModalConditionContainer">
                    <div class="row">
                        <div class="col-xs-4">
                            <label>Show Product When: </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">
                            <p>
                                <input type="checkbox"  class="productField productAvailabilityCheckbox" id="productAlwaysAvailableCheckBox"> Always
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <p>
                                <input type="checkbox" class="productField productAvailabilityCheckbox" id="productDependsOnBudget"> Budget is:
                            </p>
                        </div>
                        <div class="col-xs-12" id="productDependsOnBudgetContainer" style="margin-left:25px;margin-bottom:30px; display:none">
                            <div class="conditionContainer" id="budgetConditionsContainer">
                                <div class="col-xs-12">
                                    <select>
                                        <option>Less Than </option>
                                        <option>Less Than or Equal To </option>
                                        <option>Equal To</option>
                                        <option>Greater Than</option>
                                        <option>Greater Than or Equal To </option>
                                    </select>
                                    <input class="currency" type="text" placeholder = "$"  style="margin-top:4px; margin-bottom:4px; margin-left:20px;"/>
                                    <button class="btn btn-xs btn-success addCondition" id="" type="button" style="margin-left:20px;">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class="" style="font-size: 14px; font-weight: 500" > Add Another Condition</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">
                            <p>
                                <input type="checkbox"  class="productField productAvailabilityCheckbox" id="productDependsOnTermLength"> Term Length is:
                            </p>
                        </div>
                        <div class="col-xs-12" id="productDependsOnTermLengthContainer" style="margin-left:25px;margin-bottom:30px; display:none">
                            <div class="conditionContainer" id="termConditionsContainer">
                                <div class="col-xs-12">
                                    <select>
                                        <option>Less Than </option>
                                        <option>Less Than or Equal To </option>
                                        <option>Equal To</option>
                                        <option>Greater Than</option>
                                        <option>Greater Than or Equal To </option>
                                    </select>
                                    <input class="" type="text" placeholder = "Days"  style="margin-top:4px; margin-bottom:4px; margin-left:20px; "/>
                                    <button class="btn btn-xs btn-success addCondition" id="" type="button" style="margin-left:20px;">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class="" style="font-size: 14px; font-weight: 500" > Add Another Condition</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id='saveProductDetailModalButton' data-dismiss="modal" aria-label="Save">Save</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="addCoverageModal" style="">
    <div class="modal-dialog" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Select Product</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12">
                        <select id="coverageModalCoverageSelect">
                            <option value="invalid">Select a Coverage</option>
                            <g:each var="coverage" in="${coverages}">
                                <option value="${coverage.coverageCode}">${coverage.coverageCode} - ${coverage.coverageName}</option>
                            </g:each>
                        </select>
                    </div>
                </div>
                <div id="coverageModalConditionContainer">
                    <div class="row">
                        <div class="col-xs-4">
                            <label>Show Product When: </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">
                            <p>
                                <input type="checkbox"  class="productField productAvailabilityCheckbox" id="productAlwaysAvailableCheckBox"> Always
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <p>
                                <input type="checkbox" class="productField productAvailabilityCheckbox" id="productDependsOnBudget"> Budget is:
                            </p>
                        </div>
                        <div class="col-xs-12" id="productDependsOnBudgetContainer" style="margin-left:25px;margin-bottom:30px; display:none">
                            <div class="conditionContainer" id="budgetConditionsContainer">
                                <div class="col-xs-12">
                                    <select>
                                        <option>Less Than </option>
                                        <option>Less Than or Equal To </option>
                                        <option>Equal To</option>
                                        <option>Greater Than</option>
                                        <option>Greater Than or Equal To </option>
                                    </select>
                                    <input class="currency" type="text" placeholder = "$"  style="margin-top:4px; margin-bottom:4px; margin-left:20px;"/>
                                    <button class="btn btn-xs btn-success addCondition" id="" type="button" style="margin-left:20px;">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class="" style="font-size: 14px; font-weight: 500" > Add Another Condition</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">
                            <p>
                                <input type="checkbox"  class="productField productAvailabilityCheckbox" id="productDependsOnTermLength"> Term Length is:
                            </p>
                        </div>
                        <div class="col-xs-12" id="productDependsOnTermLengthContainer" style="margin-left:25px;margin-bottom:30px; display:none">
                            <div class="conditionContainer" id="termConditionsContainer">
                                <div class="col-xs-12">
                                    <select>
                                        <option>Less Than </option>
                                        <option>Less Than or Equal To </option>
                                        <option>Equal To</option>
                                        <option>Greater Than</option>
                                        <option>Greater Than or Equal To </option>
                                    </select>
                                    <input class="" type="text" placeholder = "Days"  style="margin-top:4px; margin-bottom:4px; margin-left:20px; "/>
                                    <button class="btn btn-xs btn-success addCondition" id="" type="button" style="margin-left:20px;">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class="" style="font-size: 14px; font-weight: 500" > Add Another Condition</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id='saveCoverageDetailModalButton' data-dismiss="modal" aria-label="Save">Save</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</body>