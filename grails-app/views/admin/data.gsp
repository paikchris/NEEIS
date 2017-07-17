<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'submissions.css')}" type="text/css">
    %{--<link rel="stylesheet" href="${resource(dir: 'plugins/fuelux/css', file: 'fuelux.min.css')}" type="text/css">--}%
    %{--<script src="${resource(dir: 'plugins/fuelux/js', file: "fuelux.min.js")}"></script>--}%
    <script src="${resource(dir: 'js/admin/', file: "data.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "stringUtils.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/vendor/', file: "numeral.min.js")}"></script>

    <script src="${resource(dir: 'js/utils/', file: "multiRangePlugin.js?ts=" + new Date().getTime())}"></script>



    <style>
        .riskCategory_ListItem, .productCategory_ListItem {
            font-weight: 500;
        }

        a.subCategory_ListItem{
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

        a.product_ListItem {
            font-size: smaller;
            /*padding-left:80px;*/
            padding: 4px 20px;
            margin-left: 40px;
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

        a.list-group-item.product_ListItem.active,
        .list-group-item.product_ListItem.active:focus,
        .list-group-item.product_ListItem.active:hover {
            background-color: rgba(38, 83, 121, 0.7);
            border-color: rgba(38, 83, 121, 0.7);
        }

        .riskLI, .productLI {
            margin: 6px;
        }

        p.checkboxContainer{
            margin-bottom:11px;
            padding-left:6px;
        }

        div.prodConditionDescription{
            margin-bottom: 6px;
            margin-top: -10px;
            font-size: 11px;
            padding-left: 35px;
            color: rgb(37, 66, 112);
            line-height:1.4em;
        }

        span.twitter-typeahead{
            width: 90%;
        }

        body span.twitter-typeahead .tt-menu, span.twitter-typeahead .tt-dropdown-menu{
            font-size:11px;
        }




    </style>
</head>

<body>
<g:if test="${user.admin == "true"}">
    <div class="col-xs-12 headerContainer" style="margin-top:30px;">
        <div class="col-xs-4 header-left">
            <h3 style=" color: rgba(0, 0, 0, 0.57); margin-top:0px; margin-bottom:0px;"
                id="pageTitle">Data Management</h3>
            <span id="userRoleDisplay">Admin</span>

            <div id="userRole" style="display:none">${user.userRole}</div>
        </div>

        <div class="col-xs-4 header-center">
            <button class="btn btn-xs btn-success" id="emergencyIndicationButton" type="button" style=""
                    onclick="emergencyIndication();">
                <span class="" style="">Indication Generate</span>
            </button>
        </div>

        <div class="col-xs-4 header-right">
        </div>
    </div>

    <div class="col-xs-12 mainContentContainer">

        <div class="tabWizardContainer">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#riskTypePanel" aria-controls="riskTypePanel" role="tab"
                                                          data-toggle="tab">Risk Types</a></li>
                <li role="presentation"><a href="#productsPanel" aria-controls="productsPanel" role="tab"
                                           data-toggle="tab">Products</a></li>
                <li role="presentation"><a href="#messages" aria-controls="messages" role="tab"
                                           data-toggle="tab">Messages</a></li>
                <li role="presentation"><a href="#settings" aria-controls="settings" role="tab"
                                           data-toggle="tab">Settings</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="riskTypePanel">
                    <div class="col-xs-3 panel-left">
                        <div class="col-xs-12 panel-left-header">
                            <h5>Risk Types</h5>
                        </div>

                        <div class="col-xs-12 panel-left-content">
                            <div class="list-group riskCategoryListContainer">

                            %{--BUILD LIST OF RISK CATEGORIES AND SUB CATEGORIES--}%
                                <g:each var="category" in="${riskCategories}">

                                %{--BUILD EACH CATEGORY INTO A LIST ITEM, WITH DATA ATTRIBUTES FROM MYSQL--}%
                                    <a href="#" class="list-group-item riskLI riskCategory_ListItem"
                                       data-id="${category.id}"
                                        <g:each var="column" in="${category.domainClass.persistentProperties*.name}">
                                            data-${column}="${category.getAt(column)}"
                                        </g:each>
                                       style="">
                                        ${category.riskCategoryName}
                                    </a>

                                %{--BUILD ALL THE SUBCATEGORIES FOR THE RISK CATEGORY, INITIALLY HIDDEN--}%
                                    <g:each var="subcategory" in="${riskTypes}">%{--Loop through all--}%
                                        <g:if test="${subcategory.riskTypeCategory == category.riskCategoryCode}">
                                            <g:if test="${subcategory.subCategoryFlag == "Y"}">%{--Dropdown for risk--}%
                                                <a href="#" class="list-group-item riskLI subCategory_ListItem"
                                                   data-id="${subcategory.id}"
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
                                                        data-id="${risktype.id}"
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
                                                   data-id="${subcategory.id}"
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

                    <div class="col-xs-5 panel-center" id="riskTypePanelContentContainer">
                        <div class="col-xs-12" id="riskTypeFields" style="display:none">

                            %{--RISK TYPE NAME--}%
                            <div class="row" id="riskTypeIDContainer" style="margin-bottom:0px; display:none">
                                <span id="riskTypeID"></span>
                            </div>

                            %{--RISK TYPE NAME--}%
                            <div class="row" id="riskTypeNameContainer" style="margin-bottom:0px;">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h4>Risk Name</h4>
                                        <input type="text" class="form-control fieldInput riskTypeField detectRiskTypeChanges" id="riskTypeName_Input"
                                               data-table="riskType" data-column="riskTypeName" placeholder="">
                                    </div>
                                </div>
                            </div>

                            %{--RISK TYPE CODE--}%
                            <div class="row" id="riskTypeCodeContainer" style="margin-bottom:20px;">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h5 style="margin-top:0px">Risk Type Code</h5>
                                        <input type="text" class="form-control fieldInput riskTypeField detectRiskTypeChanges" id="riskTypeCode_Input"
                                               data-table="riskType" data-column="riskTypeCode" placeholder="">
                                    </div>
                                </div>
                            </div>

                            %{--BUILD LIST OF PRODUCTS--}%
                            <div class="row" id="productsContainer" style="" >
                                <div class="col-xs-12" id="productList">
                                    <h4 style="margin:0px">Product Offerings</h4>
                                    <h6 style="margin-bottom: 4px; margin-top:4px">{AIM Product ID} - {Name}</h6>

                                    <div class="well">
                                        <div id="productOfferingsContainer">
                                        %{--<g:set var="coverageListArray" value="${[]}"/>--}%
                                            <% def coverageListArray = []%>
                                            <g:each var="product" in="${products}">
                                                <g:if test="${coverageListArray.contains(product.coverage)}">
                                                </g:if>
                                                <g:else>
                                                    <label style="padding-left:0px">${product.coverageLongName}</label>
                                                    <%
                                                        coverageListArray.push(product.coverage)
                                                    %>
                                                </g:else>

                                                <div class="productRow">
                                                    <p class="checkboxContainer" style="padding-left:6px;">
                                                        <input type="checkbox" class="productCheckbox detectRiskTypeChanges"
                                                               id="${product.productID}_Checkbox" name="productCheckbox"
                                                               value="${product.productID}"
                                                               data-productconditions=""> ${product.aimProductID} - ${product.productName}
                                                        <i class="fa fa-cog productSettingsIcon" id="${product.productID}_Settings" aria-hidden="true"
                                                           style="cursor:pointer; color: rgb(148, 204, 255); display:none"></i>
                                                    </p>
                                                    <div class="prodConditionDescription" style="display:"> </div>
                                                </div>




                                            </g:each>
                                        </div>
                                    </div>
                                </div>




                            </div>

                            <span class="statusMessage" id="riskTypeErrorMessage" style="display:none; color:red">Error, Check Form</span><br>
                            <span class="statusMessage" id="riskTypeSaveMessage" style="display:none; color:green">Saved</span><br>
                            <button class="btn btn-success" id="saveRiskType" type="button" style="" disabled="disabled">
                                <span class="" style="">Save</span>
                            </button>
                        </div>

                        <div id="riskCategoryFields" style="display:none">
                            <div class="col-xs-12">
                                <h5>Risk Category Fields</h5>
                            </div>

                            %{--RISK TYPE NAME--}%
                            <div class="row" id="riskCategoryIDContainer" style="margin-bottom:0px; display:none">
                                <span id="riskCategoryID"></span>
                            </div>


                            <div class="col-xs-12">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Risk Category Name</label>
                                        <input type="text" class="form-control fieldInput" id="riskCategoryName_Input"
                                               data-table="riskCategory" data-column="riskCategoryName"
                                               placeholder="">
                                    </div>
                                </div>


                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Risk Category Description</label>
                                        <textarea class="form-control fieldInput" id="riskTypeCategoryDescription_Input"
                                                  rows="10" data-table="riskCategory"
                                                  data-column="description"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-3 panel-right">
                        <div class="col-xs-12 settingsContainer" id="productSettingsContainer" style="display:none">
                            <div class="well">
                                <h4><span id="productSettings_ProductName"></span> for <span id="productSettings_RiskTypeName"></span></h4>
                                <span id="hiddenProductCode" style="display:none"></span>
                                <br>
                                <h5>Show Product when </h5>
                                <div class="conditionContainer" id="alwaysConditionContainer" >
                                    <h5><input type="radio" class="productConditionRadio detectProductSettingsChanges" id="alwaysBasisRadio"
                                               name="productConditionRadio" value="always"> Always</h5>
                                </div>
                                <div class="conditionContainer" id="budgetConditionContainer" >
                                    <h5><input type="radio" class="productConditionRadio detectProductSettingsChanges" id="budgetBasisRadio"
                                               name="productConditionRadio" value="budget"> Budget</h5>
                                    <div class="conditionOptionsContainer" style="padding-left:22px; display:none">
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="budgetOption_lessThan"
                                                  name="budgetCondition" value="lessThan"> is Less than
                                            <input type="text" class="conditionValue detectProductSettingsChanges moneyInput"
                                                   id="budgetOption_lessThan_value">
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="budgetOption_greaterThan"
                                                  name="budgetCondition" value="greaterThan"> is Greater than
                                            <input type="text" class="conditionValue detectProductSettingsChanges moneyInput"
                                                   id="budgetOption_greaterThan_value">
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="budgetOption_inbetween"
                                                  name="budgetCondition" value="inbetween"> is Inbetween
                                            <input type="text" class="conditionValue detectProductSettingsChanges moneyInput"
                                                   id="budgetOption_inbetween_value">
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="budgetOption_lessOrGreaterThan"
                                                  name="budgetCondition" value="lessOrGreaterThan"> is Less than or Greater than
                                            <input type="text" class="conditionValue detectProductSettingsChanges moneyInput"
                                                   id="budgetOption_lessOrGreaterThan_value">
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="budgetOption_equals"
                                                  name="budgetCondition" value="equals"> is Equal to
                                            <input type="text" class="conditionValue detectProductSettingsChanges moneyInput"
                                                   id="budgetOption_equals_value">
                                        </p>

                                    </div>
                                </div>
                                <div class="conditionContainer" id="durationConditionContainer" style="">
                                    <h5><input type="radio" class="productConditionRadio detectProductSettingsChanges" id="policyTermBasisRadio"
                                               name="productConditionRadio" value="policyTerm"> Policy Term </h5>
                                    <div class="conditionOptionsContainer" style="padding-left:22px; display:none">
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="policyTermOption_lessThan"
                                                  name="durationCondition" value="lessThan"> is Less than
                                            <input type="text" class="basisOptionRadio conditionValue detectProductSettingsChanges "
                                                    id="policyTermOption_lessThan_value"> Days
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="policyTermOption_greaterThan"
                                                  name="durationCondition" value="greaterThan"> is Greater than
                                            <input type="text" class="conditionValue detectProductSettingsChanges"
                                                   id="policyTermOption_greaterThan_value"> Days
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="policyTermOption_inbetween"
                                                  name="durationCondition" value="inbetween"> is Inbetween
                                            <input type="text" class="conditionValue detectProductSettingsChanges"
                                                   id="policyTermOption_inbetween_value"> Days
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="policyTermOption_lessOrGreaterThan"
                                                  name="durationCondition" value="lessOrGreaterThan"> is Less than or Greater than
                                            <input type="text" class="conditionValue detectProductSettingsChanges"
                                                   id="policyTermOption_lessOrGreaterThan_value"> Days
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="policyTermOption_equals"
                                                  name="durationCondition" value="equals"> is Equal to
                                            <input type="text" class="conditionValue detectProductSettingsChanges"
                                                   id="policyTermOption_equals_value"> Days
                                        </p>
                                    </div>
                                </div>

                                <div class="conditionContainer" id="dateConditionContainer" style="display:none">
                                    <h5><input type="radio" class="productConditionRadio detectProductSettingsChanges" id="dateBasisRadio"
                                               name="productConditionRadio" value="policyTerm"> Policy Term </h5>
                                    <div class="conditionOptionsContainer" style="padding-left:22px; display:none">
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="dateOption_lessThan"
                                                  name="durationCondition" value="lessThan"> is Less than
                                            <input type="text" class="conditionValue datepicker detectProductSettingsChanges"
                                                   id="dateOption_lessThan_value">
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="dateOption_greaterThan"
                                                  name="durationCondition" value="greaterThan"> is Greater than
                                            <input type="text" class="conditionValue datepicker detectProductSettingsChanges"
                                                   id="dateOption_greaterThan_value">
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="dateOption_inbetween"
                                                  name="durationCondition" value="inbetween"> is Inbetween
                                            <input type="text" class="conditionValue datepicker detectProductSettingsChanges"
                                                   id="dateOption_inbetween_value">
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="dateOption_lessOrGreaterThan"
                                                  name="durationCondition" value="lessOrGreaterThan"> is Less than or Greater than
                                            <input type="text" class="conditionValue datepicker detectProductSettingsChanges"
                                                   id="dateOption_lessOrGreaterThan_value">
                                        </p>
                                        <p><input type="radio" class="basisOptionRadio detectProductSettingsChanges" id="dateOption_equals"
                                                  name="durationCondition" value="equals"> is Equal to
                                            <input type="text" class="conditionValue datepicker detectProductSettingsChanges"
                                                   id="dateOption_equals_value">
                                        </p>
                                    </div>
                                </div>

                                <span class="statusMessage" id="productSettingErrorMessage" style="display:none; color:red">Error, Check Form</span><br>
                                <span class="statusMessage" id="productSettingSaveMessage" style="display:none; color:green">Updated</span><br>

                                <button class="btn btn-primary" id="updateProductSettingsButton" type="button" style="" disabled="disabled">
                                    <span class="" style="">Update</span>
                                </button>
                                <button class="btn btn-warning" id="cancelProductSettingsButton" type="button" style="">
                                    <span class="" style="">Cancel</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div role="tabpanel" class="tab-pane fade" id="productsPanel">
                    <div class="col-xs-3 panel-left">
                        <div class="col-xs-12 panel-left-header">
                            <h5>Products</h5>
                        </div>
                        <div class="col-xs-12 panel-left-content">
                            <div class="list-group riskCategoryListContainer">

                            %{--BUILD LIST OF RISK CATEGORIES AND SUB CATEGORIES--}%
                                <g:each var="productCategory" in="${productCategories}">

                                %{--BUILD EACH CATEGORY INTO A LIST ITEM, WITH DATA ATTRIBUTES FROM MYSQL--}%
                                    <a href="#" class="list-group-item productLI productCategory_ListItem"
                                       data-id=""
                                        <g:each var="column" in="${productCategory.domainClass.persistentProperties*.name}">
                                            data-${column}="${productCategory.getAt(column)}"
                                        </g:each>
                                       style="">
                                        ${productCategory.coverageLongName}
                                    </a>

                                %{--BUILD ALL THE SUBCATEGORIES FOR THE RISK CATEGORY, INITIALLY HIDDEN--}%
                                    <g:each var="product" in="${products.findAll {
                                        it.coverage == productCategory.coverage
                                    }}">%{--Find all products in category--}%
                                        <a href="#" class="list-group-item productLI product_ListItem"
                                           data-id="${product.id}"
                                            <g:each var="column"
                                                    in="${product.domainClass.persistentProperties*.name}">
                                                data-${column}="${product.getAt(column)}"
                                            </g:each>
                                           style="display: none;">
                                            ${product.productName}
                                        </a>
                                    </g:each>

                                </g:each>

                            </div>
                        </div>
                    </div>
                    <div class="col-xs-3 panel-center" id="productPanelContentContainer">
                        <div class="col-xs-12 panel-left-header">
                            <h5>Product Fields</h5>
                        </div>
                        <div class="col-xs-12" id="productInputFields" style="">
                            <g:each var="product" in="${products[0]}">
                                <g:each var="column"
                                        in="${product.getDisplayOrder()}">
                                %{--data-${column}="${product.getAt(column)}"--}%

                                %{--PRODUCT COLUMNS--}%
                                    <div class="row "  style="margin-bottom:0px;">
                                        <div class="col-xs-12">
                                            <div class="form-group">
                                                <h6>${product.getDisplayName(column)}</h6>
                                            <input type="text" class="form-control databound detectProductChanges"
                                                    data-table="product" data-column="${column}"
                                                    value="">

                                            </div>
                                        </div>
                                    </div>

                                </g:each>
                            </g:each>

                            <span class="statusMessage" id="productErrorMessage" style="display:none; color:red">Error, Check Form</span><br>
                            <span class="statusMessage" id="productSaveMessage" style="display:none; color:green">Saved</span><br>
                            <button class="btn btn-success" id="saveProductButton" type="button" style="" disabled="disabled">
                                <span class="" style="">Save</span>
                            </button>
                        </div>

                    </div>
                    <div class="col-xs-6 panel-right">
                        <div class="col-xs-12 " id="productDetailsContainer" style="">
                            <div class="tabWizardContainer">
                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#ratingTab" aria-controls="ratingTab" role="tab"
                                                           data-toggle="tab">Rating</a></li>
                                    <li role="presentation"><a href="#lobTab" aria-controls="lobTab" role="tab"
                                                                              data-toggle="tab">LOBS</a></li>
                                    <li role="presentation"><a href="#formsTab" aria-controls="formsTab" role="tab"
                                                               data-toggle="tab">Forms</a></li>
                                    <li role="presentation"><a href="#termsTab" aria-controls="termsTab" role="tab"
                                                               data-toggle="tab">Terms</a></li>
                                </ul>

                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane fade in active" id="ratingTab">
                                        <div class="well col-xs-12 ">
                                            <div class="primaryRatingBasisContainer" style="margin-bottom: 24px">
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <h4>Primary Rating Basis</h4>
                                                    </div>
                                                    <div class="col-xs-6">
                                                        <select id="primaryRateBasisSelect">
                                                            <option value="gpc">GPC</option>
                                                            <option value="flatRate">Flat Rate</option>
                                                            <option value="termLength">Term Length</option>
                                                            <option value="limits">Limits</option>
                                                            <option value="belowTheLine">Below The Line</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="basisOptionContainer" id="gpc_RatingOptionsContainer" style="">
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <h5 style='margin-top:4px; margin-bottom:2px;'>GPC Rates</h5>
                                                    </div>
                                                    <div class="col-xs-12">
                                                        <div class=" row multiRangeContainer money" style="margin-bottom:40px;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="basisOptionContainer" id="belowTheLine_RatingOptionsContainer" style="display:none">

                                            </div>
                                            <div class="basisOptionContainer" id="flatRate_RatingOptionsContainer" style="display:none">
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <h5 style='margin-top:4px; margin-bottom:2px;'>Flat Rate Options</h5>
                                                    </div>
                                                    <div class="col-xs-6">
                                                        <div class="input-group">
                                                            <div class="input-group-btn">
                                                                <button type="button" class="btn btn-default dropdown-toggle"
                                                                        data-toggle="dropdown" aria-haspopup="true"
                                                                        aria-expanded="false">
                                                                    <span class="dropDownButtonText">Flat Premium</span>
                                                                    <span class="caret"></span>
                                                                </button>
                                                                <ul class="dropdown-menu dropdown-menu-auto">
                                                                    <li><a href="#">Flat Premium</a></li>
                                                                    <li><a href="#">Flat Rate</a></li>
                                                                </ul>
                                                            </div><!-- /btn-group -->
                                                            <input class="form-control moneyInput" type="text" value="0">
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6">
                                                    </div>
                                                    <div class="col-xs-6">
                                                        <div class="input-group">
                                                            <span class="input-group-addon" >
                                                                Minimum Premium
                                                                %{--<i class="fa fa-percent"></i>--}%
                                                            </span>
                                                            <input class="form-control moneyInput" type="text" value="0">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="basisOptionContainer" id="termLength_RatingOptionsContainer" style="display:none">
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <h5 style='margin-top:4px; margin-bottom:2px;'>Term Length Rates</h5>
                                                    </div>
                                                    <div class="col-xs-12">
                                                        <div class=" row multiRangeContainer days" style="margin-bottom:40px;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="basisOptionContainer" id="limits_RatingOptionsContainer" style="display:none">
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <h5 style='margin-top:4px; margin-bottom:2px;'>Limit Rates</h5>
                                                    </div>
                                                    <div id="limitRatingLOBRangeContainer">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="lobTab">
                                        <div class="well col-xs-12">
                                            <h4>LOB Options</h4>
                                            <div class="" id="lobDetailContainer" style="">

                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="formsTab">
                                        <div class="well col-xs-12">
                                            <h4>Forms</h4>
                                            <div class="" id="formsDetailContainer" style="">

                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="termsTab">
                                        <div class="well col-xs-12">
                                            <h4>Terms</h4>
                                            <div class="" id="termsDetailContainer" style="">
                                                <div class="form-group">
                                                    <textarea class="form-control" rows="15" id="termsTextArea"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div role="tabpanel" class="tab-pane fade" id="messages">...</div>

                <div role="tabpanel" class="tab-pane fade" id="settings">...</div>
            </div>

        </div>
    </div>

</g:if>

%{--MODALS--}%
<div class="modal fade" tabindex="-1" role="dialog" id="addProductModal" style="">
    <div class="modal-dialog" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="">Select Product</h4>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-6 col-xs-offset-3">
                        <select class="form-control" id="productModalProductSelect">
                            <option value="invalid">Select a Product</option>
                            <g:each var="product" in="${products}">
                                <option value="${product.productID}">${product.productID}</option>
                            </g:each>
                        </select>
                    </div>

                </div>

                <div id="productModalConditionContainer" style="margin: 24px; display: none">
                    <div class="row">
                        <div class="col-xs-4">
                            <label>Show Product When:</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4">
                            <p>
                                <input type="checkbox" class="productField productAvailabilityCheckbox"
                                       id="productAlwaysAvailableCheckBox"> Always
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <p>
                                <input type="checkbox" class="productField productAvailabilityCheckbox"
                                       id="productDependsOnBudget"> Budget is:
                            </p>
                        </div>

                        <div class="col-xs-12" id="productDependsOnBudgetContainer"
                             style="margin-left:25px;margin-bottom:30px; display:none">
                            <div class="conditionContainer" id="budgetConditionsContainer">
                                <div class="col-xs-12">
                                    <select>
                                        <option>Less Than</option>
                                        <option>Less Than or Equal To</option>
                                        <option>Equal To</option>
                                        <option>Greater Than</option>
                                        <option>Greater Than or Equal To</option>
                                    </select>
                                    <input class="currency" type="text" placeholder="$"
                                           style="margin-top:4px; margin-bottom:4px; margin-left:20px;"/>
                                    <button class="btn btn-xs btn-success addCondition" id="" type="button"
                                            style="margin-left:20px;">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class=""
                                              style="font-size: 14px; font-weight: 500">Add Another Condition</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4">
                            <p>
                                <input type="checkbox" class="productField productAvailabilityCheckbox"
                                       id="productDependsOnTermLength"> Term Length is:
                            </p>
                        </div>

                        <div class="col-xs-12" id="productDependsOnTermLengthContainer"
                             style="margin-left:25px;margin-bottom:30px; display:none">
                            <div class="conditionContainer" id="termConditionsContainer">
                                <div class="col-xs-12">
                                    <select>
                                        <option>Less Than</option>
                                        <option>Less Than or Equal To</option>
                                        <option>Equal To</option>
                                        <option>Greater Than</option>
                                        <option>Greater Than or Equal To</option>
                                    </select>
                                    <input class="" type="text" placeholder="Days"
                                           style="margin-top:4px; margin-bottom:4px; margin-left:20px; "/>
                                    <button class="btn btn-xs btn-success addCondition" id="" type="button"
                                            style="margin-left:20px;">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class=""
                                              style="font-size: 14px; font-weight: 500">Add Another Condition</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id='addProductModalAddButton' data-dismiss="modal"
                        aria-label="Add">Add</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="addCoverageModal" style="">
    <div class="modal-dialog" role="document" style="">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="">Select Coverage</h4>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-6 col-xs-offset-3">
                        <select class="form-control" id="coverageModalCoverageSelect">
                            <option value="invalid">Select a Coverage</option>
                            <g:each var="coverage" in="${coverages}">
                                <option value="${coverage.coverageCode}">${coverage.coverageName}</option>
                            </g:each>
                        </select>
                    </div>

                </div>

                <div id="coverageModalConditionContainer" style="margin: 24px; display: none">
                    <div class="row">
                        <div class="col-xs-4">
                            <label>Show Coverage When:</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4">
                            <p>
                                <input type="checkbox" class="coverageField coverageAvailabilityCheckbox"
                                       id="coverageAlwaysAvailableCheckBox"> Always
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <p>
                                <input type="checkbox" class="coverageField coverageAvailabilityCheckbox"
                                       id="coverageDependsOnBudget"> Budget is:
                            </p>
                        </div>

                        <div class="col-xs-12" id="coverageDependsOnBudgetContainer"
                             style="margin-left:25px;margin-bottom:30px; display:none">
                            <div class="conditionContainer" id="">
                                <div class="col-xs-12">
                                    <select>
                                        <option>Less Than</option>
                                        <option>Less Than or Equal To</option>
                                        <option>Equal To</option>
                                        <option>Greater Than</option>
                                        <option>Greater Than or Equal To</option>
                                    </select>
                                    <input class="currency" type="text" placeholder="$"
                                           style="margin-top:4px; margin-bottom:4px; margin-left:20px;"/>
                                    <button class="btn btn-xs btn-success addCondition" id="" type="button"
                                            style="margin-left:20px;">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class=""
                                              style="font-size: 14px; font-weight: 500">Add Another Condition</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4">
                            <p>
                                <input type="checkbox" class="coverageField coverageAvailabilityCheckbox"
                                       id="coverageDependsOnTermLength"> Term Length is:
                            </p>
                        </div>

                        <div class="col-xs-12" id="coverageDependsOnTermLengthContainer"
                             style="margin-left:25px;margin-bottom:30px; display:none">
                            <div class="conditionContainer" id="">
                                <div class="col-xs-12">
                                    <select>
                                        <option>Less Than</option>
                                        <option>Less Than or Equal To</option>
                                        <option>Equal To</option>
                                        <option>Greater Than</option>
                                        <option>Greater Than or Equal To</option>
                                    </select>
                                    <input class="" type="text" placeholder="Days"
                                           style="margin-top:4px; margin-bottom:4px; margin-left:20px; "/>
                                    <button class="btn btn-xs btn-success addCondition" id="" type="button"
                                            style="margin-left:20px;">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <span class=""
                                              style="font-size: 14px; font-weight: 500">Add Another Condition</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id='addCoverageModalAddButton' data-dismiss="modal"
                        aria-label="Add">Add</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</body>