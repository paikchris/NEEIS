<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'dataManagement.css')}" type="text/css">
    <script src="${resource(dir: 'js/admin/', file: "data.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "ratingHelper.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "stringUtils.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/vendor/', file: "numeral.min.js")}"></script>
    <script src="${resource(dir: 'js/vendor/', file: "math.js")}"></script>

    <script src="${resource(dir: 'js/utils/', file: "multiRangePlugin.js?ts=" + new Date().getTime())}"></script>
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'multiRangePlugin.css?ts=' + new Date().getTime())}" type="text/css">

    %{--GROOVY OBJECTS TO JS OBJECTS--}%
    <script>
        <g:each var="x" in="${pageScope.variables}">
            %{--var pageScope_${x.key} = ${raw(x.value)}--}%
            %{--console.log(pageScope_${x.key})--}%
        </g:each>
        var forms = ${raw(forms)}
        console.log(forms)

    </script>
</head>

<body>
<g:if test="${user.admin == "true"}">
    <div class="col-xs-12 headerContainer" style="margin-top:30px; margin-bottom:20px">
        <div class="row">
            <div class="col-xs-4 header-left">
                <g:render template="/shared/html/pageHeader" model="[user: user, pageTitle: 'Data Management']"/>
            </div>

            <div class="col-xs-4 header-center">

            </div>

            <div class="col-xs-4 header-right">
                <div class="row">
                    <div class="col-xs-6">

                    </div>
                    <div class="col-xs-6">
                        <button class="btn btn-sm btn-primary pull-right" id="syncAllWithDMU">
                            <span>Import From DMU</span>
                        </button>
                        <button class="btn btn-sm btn-primary pull-right" id="checkSyncWithDMU">
                            <span>Check For Updates</span>
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">

                    </div>
                    <div class="col-xs-6">

                    </div>

                </div>

            </div>
        </div>

    </div>

    <div class="col-xs-12 mainContentContainer">
        <div class="tabWizardContainer">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                    <a href="#riskTypePanel" id="riskTypePanelButton"
                       aria-controls="riskTypePanel" role="tab" data-toggle="tab">Risk Types</a>
                </li>
                <li role="presentation">
                    <a href="#productsPanel" id="productsPanelButton"
                       aria-controls="productsPanel" role="tab" data-toggle="tab">Products</a>
                </li>
                <li role="presentation">
                    <a href="#messages" id=""
                       aria-controls="messages" role="tab" data-toggle="tab">Messages</a>
                </li>
                <li role="presentation"><a href="#settings" aria-controls="settings" role="tab"
                                           data-toggle="tab">Settings</a>
                </li>
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
                                                    <label style="padding-left:0px"></label>
                                                    <%
                                                        coverageListArray.push(product.coverage)
                                                    %>
                                                </g:else>

                                                <div class="productRow">
                                                    <p class="checkboxContainer" style="padding-left:6px;">
                                                        <input type="checkbox" class="productCheckbox detectRiskTypeChanges"
                                                               id="${product.productID}_Checkbox" name="productCheckbox"
                                                               value="${product.productID}"
                                                               data-productconditions=""> ${product.productID} - ${product.productName}
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
                    <div class="col-xs-2 panel-left" style="padding-left:0px; padding-right:0px">
                        <div class="col-xs-12 panel-left-header">
                            <h5>Products</h5>
                        </div>
                        <div class="col-xs-12 panel-left-content">
                            <div class="list-group riskCategoryListContainer">

                                %{--BUILD LIST OF RISK CATEGORIES AND SUB CATEGORIES--}%
                                <g:each var="coverageClass" in="${coverageClasses}">
                                    <div class="coverageClassContainer">
                                        %{--BUILD EACH CATEGORY INTO A LIST ITEM, WITH DATA ATTRIBUTES FROM MYSQL--}%
                                        <a href="#" class="list-group-item productLI productCategory_ListItem"
                                           data-id="${coverageClass.id}"
                                            <g:each var="column" in="${coverageClass.domainClass.persistentProperties*.name}">
                                                data-${column}="${coverageClass.getAt(column)}"
                                            </g:each>
                                           style="">
                                            ${coverageClass.coverageName}
                                        </a>

                                        <div class="productsInCoverageClassContainer" style="display:none">
                                            %{--BUILD ALL THE SUBCATEGORIES FOR THE RISK CATEGORY, INITIALLY HIDDEN--}%
                                            <g:each var="product" in="${products.findAll {
                                                it.coverage == coverageClass.coverageCode
                                            }}">%{--Find all products in category--}%
                                                <a href="#" class="list-group-item productLI product_ListItem"
                                                   data-id="${product.id}"
                                                    <g:each var="column"
                                                            in="${product.domainClass.persistentProperties*.name}">
                                                        data-${column}="${product.getAt(column)}"
                                                    </g:each>
                                                   style="">
                                                    ${product.productID}-${product.productName}
                                                </a>
                                            </g:each>
                                            <button type="button" class="btn btn-success addProductButton">
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                                Add ${coverageClass.coverageCode} Product
                                            </button>
                                        </div>
                                    </div>
                                </g:each>
                                <button type="button" class="btn btn-primary addCoverageClassButton">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                    Add Coverage Class
                                </button>

                            </div>
                        </div>
                    </div>
                    <div class="col-xs-10 panel-right" style="padding-left:0px; padding-right:0px">
                        <div class="row" style="padding: 4px 0px;">
                            <div class="col-xs-6 panel-left-header">
                                <h5 id="productNameHeader">...</h5>
                            </div>
                            <div class="col-xs-6 pull-right">
                                <div style="float:right; width: 20%; position:relative; top: 46px; z-index: 1">
                                    <span class="statusMessage productErrorMessage" style="display:none; color:red">Error, Check Form</span>
                                    <span class="statusMessage productSaveMessage" style="display:none; color:green">Saved</span>
                                    <button class="btn btn-sm btn-success saveProductButton" type="button" style="width:70%" disabled="disabled">
                                        <span class="" style="">Save</span>
                                    </button>
                                    <button class="btn btn-sm btn-primary saveNewProductButton" type="button" style="width:70%; display:none" disabled="disabled">
                                        <span class="" style="">Save New Product</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12 " id="productDetailsContainer" style="">
                                <div class="tabWizardContainer">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li role="presentation" class="active"><a href="#detailTab" aria-controls="detailTab" role="tab"
                                                                                  data-toggle="tab">Details</a></li>
                                        <li role="presentation"><a href="#ratingTab" aria-controls="ratingTab" role="tab"
                                                                   data-toggle="tab">Rating</a></li>
                                        <li role="presentation"><a href="#covLimitTab" aria-controls="covLimitTab" role="tab"
                                                                   data-toggle="tab">Coverage Limits</a></li>
                                        <li role="presentation"><a href="#formsTab" aria-controls="formsTab" role="tab"
                                                                   data-toggle="tab">Forms</a></li>
                                        <li role="presentation"><a href="#termsTab" aria-controls="termsTab" role="tab"
                                                                   data-toggle="tab">Terms</a></li>
                                        <li role="presentation"><a href="#previewProductTab" aria-controls="previewProductTab" role="tab"
                                                                   data-toggle="tab" id="productPreviewTabButton">Preview</a></li>
                                    </ul>

                                    <!-- Tab panes -->
                                    <div class="tab-content">
                                        <div role="tabpanel" class="tab-pane fade in active" id="detailTab">
                                            <div class="well col-xs-12 ">
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <h4>Product Fields</h4>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div id="productPanelContentContainer" >
                                                        <div class="col-xs-12" id="productInputFields" style="">
                                                            <g:each var="product" in="${products[0]}">
                                                                    <g:each var="column"
                                                                            in="${product.getDisplayOrder()}">
                                                                    %{--data-${column}="${product.getAt(column)}"--}%

                                                                    %{--PRODUCT COLUMNS--}%
                                                                        <div class="row "  style="margin-bottom:0px;">
                                                                            <div class="col-xs-4">
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

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="tabpanel" class="tab-pane fade" id="ratingTab">
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
                                                            <div class=" row multiRangeContainer money" id="gpc_multiRangeContainer" style="margin-bottom:40px;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="testRatingContainer">
                                                        <div class="row">
                                                            <div class="col-xs-12">
                                                                <h5 style="margin-top:4px; margin-bottom:2px;">Test Rate</h5>
                                                            </div>
                                                            <div class="col-xs-6">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon">
                                                                        <span>GPC</span>
                                                                    </span>
                                                                    <input class="form-control moneyInput rateTestRun detectProductChanges" id="gpc_TestInput" type="text" value="0">
                                                                </div>
                                                                <div class="input-group">
                                                                    <span class="input-group-addon">
                                                                        <span>Term Length</span>
                                                                    </span>
                                                                    <input class="form-control rateTestRun numberInput detectProductChanges" id="gpc_TermLengthInput" type="text" value="0">
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-6" style="">
                                                                <span id="gpc_PremiumPreview"
                                                                      style="font-size: 11px;white-space: pre-wrap">-</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="basisOptionContainer" id="belowTheLine_RatingOptionsContainer" style="display:none">

                                                </div>
                                                <div class="basisOptionContainer" id="flatRate_RatingOptionsContainer" style="display:none">
                                                    <div class="row" style="margin-bottom:40px;">
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
                                                                        <li><a href="#" class="multiRange_RateOption dropDownOption_money">Flat Premium</a></li>
                                                                        <li><a href="#" class="multiRange_RateOption dropDownOption_percent">Flat Rate</a></li>
                                                                    </ul>
                                                                </div><!-- /btn-group -->
                                                                <input class="form-control moneyInput rateInput rateTestRun detectProductChanges" id="flatRate_FlatValue" type="text" value="0">
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
                                                                <input class="form-control moneyInput minPremiumInput rateTestRun detectProductChanges" id="flatRate_MinPremium" type="text" value="0" disabled="true">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="testRatingContainer">
                                                        <div class="row">
                                                            <div class="col-xs-12">
                                                                <h5 style="margin-top:4px; margin-bottom:2px;">Test Rate</h5>
                                                            </div>
                                                            <div class="col-xs-6">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon">
                                                                        <span>GPC</span>
                                                                    </span>
                                                                    <input class="form-control moneyInput rateTestRun detectProductChanges" id="flatRate_TestInput" type="text" value="0">
                                                                </div>
                                                                <div class="input-group">
                                                                    <span class="input-group-addon">
                                                                        <span>Term Length</span>
                                                                    </span>
                                                                    <input class="form-control rateTestRun numberInput detectProductChanges" id="flatRate_TermLengthInput" type="text" value="0">
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-6" style="">
                                                                <span id="flatRate_PremiumPreview"
                                                                      style="font-size: 11px;white-space: pre-wrap">-</span>
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
                                                            <div class=" row multiRangeContainer days"  id="termLength_multiRangeContainer" style="margin-bottom:40px;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="testRatingContainer">
                                                        <div class="row">
                                                            <div class="col-xs-12">
                                                                <h5 style="margin-top:4px; margin-bottom:2px;">Test Rate</h5>
                                                            </div>
                                                            <div class="col-xs-6">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon">
                                                                        <span>GPC</span>
                                                                    </span>
                                                                    <input class="form-control moneyInput rateTestRun detectProductChanges" id="termLength_TestInput" type="text" value="0">
                                                                </div>
                                                                <div class="input-group">
                                                                    <span class="input-group-addon">
                                                                        <span>Term Length</span>
                                                                    </span>
                                                                    <input class="form-control rateTestRun numberInput detectProductChanges" id="termLength_TermLengthInput" type="text" value="0">
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-6" style="">
                                                                <span id="termLength_PremiumPreview"
                                                                      style="font-size: 11px;white-space: pre-wrap">-</span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="basisOptionContainer" id="limits_RatingOptionsContainer" style="display:none">

                                                    <div class="row">
                                                        <div class="col-xs-12">
                                                            <h5 style='margin-top:4px; margin-bottom:2px;'>Limit Rates</h5>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xs-3" style="margin-left: 15px; margin-right: 15px; padding-top: 6px">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon" >
                                                                        Total Min Premium
                                                                    </span>
                                                                    <input class="form-control moneyInput rateTestRun detectProductChanges" id="limits_TotalMinPremium" type="text" value="0" >
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="limitRatingCovLimitRangeContainer">
                                                        </div>
                                                    </div>
                                                    <div class="testRatingContainer">
                                                        <div class="row">
                                                            <div class="col-xs-12">
                                                                <h5 style="margin-top:4px; margin-bottom:2px;">Test Rate</h5>
                                                            </div>
                                                            <div class="col-xs-6" >
                                                                <div class="input-group">
                                                                    <span class="input-group-addon">
                                                                        <span>GPC</span>
                                                                    </span>
                                                                    <input class="form-control moneyInput rateTestRun detectProductChanges" id="limits_TestInput" type="text" value="0">
                                                                </div>
                                                                <div class="input-group">
                                                                    <span class="input-group-addon">
                                                                        <span>Term Length</span>
                                                                    </span>
                                                                    <input class="form-control rateTestRun numberInput detectProductChanges" id="limits_TermLengthInput" type="text" value="0">
                                                                </div>
                                                                <div id="previewInputsDiv" style="padding-top:12px">

                                                                </div>
                                                            </div>
                                                            <div class="col-xs-6" style="">
                                                                <span id="limits_PremiumPreview"
                                                                      style="font-size: 11px;white-space: pre-wrap">-</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="testStuffContainer">
                                                    <div class="row">
                                                        <div class="col-xs-12">
                                                            <textarea id="testStuffTextArea" cols="100" rows="25" style="display:none">

                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                        <div role="tabpanel" class="tab-pane fade" id="covLimitTab">
                                            <div class="well col-xs-12">
                                                <h4>Coverage Limits</h4>
                                                <div class="" id="covLimitDetailContainer" style="">

                                                </div>
                                                <br>
                                                <h5>Additional Options</h5>
                                                <div class="" id="covLimitAdditionalCoveragesContainer" style="">
                                                    
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
                                        <div role="tabpanel" class="tab-pane fade" id="previewProductTab">
                                            <div class="well col-xs-12">
                                                <h4>Preview</h4>
                                                <div class="" id="previewProductContainer" style="">
                                                    <h6>Primary Rating Basis: </h6>
                                                    <span>Rate Info:</span>
                                                    <span>Rate Test:</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <div style="width: 28%; margin: auto;">
                                    <span class="statusMessage productErrorMessage" style="display:none; color:red">Error, Check Form</span>
                                    <span class="statusMessage productSaveMessage" style="display:none; color:green">Saved</span>
                                    <button class="btn btn-sm btn-success saveProductButton" type="button" style="width:70%" disabled="disabled">
                                        <span class="" style="">Save</span>
                                    </button>
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

</body>