<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'datab.css')}" type="text/css">
    <script src="${resource(dir: 'js/admin/', file: "data2.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "logicConditionHelper.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "ratingHelper.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "stringUtils.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/vendor/', file: "numeral.min.js")}"></script>
    <script src="${resource(dir: 'js/vendor/', file: "math.js")}"></script>
    <script src="${resource(dir: 'js/utils/', file: "JSONHelper.js")}"></script>
    <script src="${resource(dir: 'js/newSubmissionUtils/', file: "questionHelper.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "multiRangePlugin.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js', file: "/utils/typeAheadHelper.js?ts=" + new Date().getTime())}" async></script>
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'multiRangePlugin.css?ts=' + new Date().getTime())}" type="text/css">

    %{--GROOVY OBJECTS TO JS OBJECTS--}%
    <script>
        var pr = ${raw(products)}
        var oC = ${raw(operationCategories)}
        var oT = ${raw(operations)}
        var cT = ${raw(coverages)}
        var cB = ${raw(conditionBasis)}
        var cO = ${raw(conditionOperators)}
        var qL = ${raw(questions)}
        var qC = ${raw(questionCategories)}
        var rB = ${raw(ratingBasis)}
        var rL = ${raw(rates)}
        var fL = ${raw(forms)}


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

            %{--SYNC BUTTONS--}%
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
            </div>
        </div>

    </div>
    <div class="row" id="dataManagementLoadingDiv">
        <div class="col-xs-3">
            <label>Loading Data...</label>
        </div>
    </div>
    <div class="col-xs-12 mainContentContainer" style="display:none">
        <div class="tabWizardContainer">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist" style="margin-bottom: 10px">
                <li role="presentation" class="active">
                    <a href="#operationsPage" id="operationsNavTab" aria-controls="operationsPage" role="tab" data-toggle="tab">Operations</a>
                </li>
                <li role="presentation" class="">
                    <a href="#coveragesPage" id="coveragesNavTab" aria-controls="coveragesPage" role="tab" data-toggle="tab">Coverages</a>
                </li>
                <li role="presentation" class="">
                    <a href="#productsPage" id="productsNavTab" aria-controls="productsPage" role="tab" data-toggle="tab">Products</a>
                </li>
                <li role="presentation" class="">
                    <a href="#ratesPage" id="ratesNavTab" aria-controls="ratesPage" role="tab" data-toggle="tab">Rates</a>
                </li>
                <li role="presentation" class="">
                    <a href="#ratingBasisPage" id="ratingBasisNavTab" aria-controls="ratingBasisPage" role="tab" data-toggle="tab">Rating Basis</a>
                </li>
                <li role="presentation" class="">
                    <a href="#questionsPage" id="questionsNavTab" aria-controls="questionsPage" role="tab" data-toggle="tab">Questions</a>
                </li>
                <li role="presentation" class="">
                    <a href="#formsPage" id="formsNavTab" aria-controls="formsPage" role="tab" data-toggle="tab">Forms</a>
                </li>

            </ul>

            <!-- Tab panes -->
            <div class="tab-content" style="margin-bottom: 30px;">
                <div role="tabpanel" class="tab-pane fade in active" id="operationsPage">
                    %{--OPERATIONS SELECT--}%
                    <div style="border-bottom: 1px solid rgba(150, 146, 141, 0.24);">
                        <div class="row" id="operationCategoryContainer" style="">
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label class="control-label">Operation Category</label>
                                    <select class="form-control " id="operationCategoryDropdown" required="required" >
                                        <option value="invalid" selected="selected">Select One</option>
                                        <option value="ALL">All Categories</option>
                                        <g:each var="operation" in="${operationCategoryResults}">
                                            <option value="${operation.description}">${operation.description}</option>
                                        </g:each>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <button type="button" class="btn btn-sm btn-success" id="addNew_Operation_Button" style="margin-top:26px" onclick="$('#createOperationModal').modal('show')">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                    New Operation
                                </button>
                            </div>
                        </div>
                        <div class="row" id="operationTypeDropdownContainer" style="display:none">
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label class="control-label">Operation Type</label>
                                    <select class="form-control " id="operationsDropdown" required="required" >
                                        <option value="invalid" selected="selected">Select One</option>
                                        <g:each var="operation" in="${operationResults}">
                                            <option value="${operation.operationID}">${operation.description}</option>
                                        </g:each>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <button class="btn btn-sm btn-primary" style="margin-top:26px" id="saveOperationButton">
                                    <span>SAVE</span>
                                </button>
                            </div>
                        </div>
                    </div>


                    %{--OPERATION DETAILS--}%
                    <div class="row" id="operationDetailsContainer" style="display:none; border-bottom: 1px solid rgba(150, 146, 141, 0.24);">
                        <div class="col-xs-12">
                            <h4>Operation Details</h4>
                        </div>
                        <div class="col-xs-4" style="margin-left:16px;">
                            <div class="form-group">
                                <label class="control-label">Operation ID</label>
                                <input class="form-control" type="text" id="operationPage_operationID" disabled>
                            </div>
                            <div class="form-group">
                                <label class="control-label">Operation Description</label>
                                <input class="form-control" type="text" id="operationPage_operationDescription" disabled>
                            </div>
                            <div class="form-group">
                                <label class="control-label">Active</label>
                                <br>
                                <label class="radioHorizontalLayout checkBoxLabel">
                                    <input type="radio" class="showReview hasHiddenDiv onChangeSaveOperation" name="operationActiveFlagRadioGroup" value="Y" id="operationPage_activeFlagYes">
                                    Yes
                                </label>
                                <label class="radioHorizontalLayout checkBoxLabel">
                                    <input type="radio" class="showReview hasHiddenDiv onChangeSaveOperation" name="operationActiveFlagRadioGroup" value="N" id="operationPage_activeFlagNo">
                                    No
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="control-label">Binding Authority</label>
                                <br>
                                <label class="radioHorizontalLayout checkBoxLabel">
                                    <input type="radio" class="showReview hasHiddenDiv onChangeSaveOperation" name="operationBindingAuthorityRadioGroup" value="Y" id="operationPage_bindingAuthorityYes">
                                    Yes
                                </label>
                                <label class="radioHorizontalLayout checkBoxLabel">
                                    <input type="radio" class="showReview hasHiddenDiv onChangeSaveOperation" name="operationBindingAuthorityRadioGroup" value="N" id="operationPage_bindingAuthorityNo">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>

                    %{--COVERAGES ALLOWED --}%
                    <div class="row" id="coveragesAllowedContainer" style="display:none">
                        <div class="col-xs-12">
                            <h4>Coverages Allowed</h4>
                        </div>
                        <div class="col-xs-12" style="margin-left: 16px;">
                            <h5>Packages:</h5>
                            %{--EACH PACKAGE OPTIONS--}%
                            <g:each var="coverage" in="${coverageResults.findAll{ it.packageFlag == 'Y' } }">
                                <div class="row coverageContainer packageContainer checkboxAndHiddenDivContainer" data-covid="${coverage.coverageCode}" style="margin-left: 0px; margin-right:0px;">
                                    <div class='col-xs-12 form-group checkboxContainer'>
                                        <g:if test="${coverage.activeFlag == 'N'}">
                                            <label class="checkBoxLabel" style="color:darkgrey">
                                                <input type='checkbox' class='coverageCheckbox checkboxHiddenDiv ' data-covid='${coverage.coverageCode}'
                                                       id='${coverage.coverageCode}_checkbox'
                                                       disabled="true"/> ${coverage.coverageName}
                                                <span class="label label-default" style="padding: .1em .4em .1em;background-color: rgba(119, 119, 119, 0.79)">Not Active</span>
                                            </label>
                                            <button type="button" class="btn btn-xs btn-info editCoverageButton"
                                                    id='${coverage.coverageCode}_EditCoverageButton'
                                                    data-covid='${coverage.coverageCode}'
                                                    style="padding: 0px 4px; font-size:10px;">
                                                <i class="fa fa-fw fa-pencil" aria-hidden="true"></i>
                                                Edit
                                            </button>
                                        </g:if>
                                        <g:else>
                                            <label class="checkBoxLabel">
                                                <input type='checkbox' class='coverageCheckbox checkboxHiddenDiv onChangeSaveOperation' data-covid='${coverage.coverageCode}'
                                                       id='${coverage.coverageCode}_checkbox'/> ${coverage.coverageName}
                                            </label>
                                            <button type="button" class="btn btn-xs btn-primary hideCoverageQuestions"
                                                    id='${coverage.coverageCode}_HideCoverageQuestionsButton'
                                                    data-covid='${coverage.coverageCode}'
                                                    style="padding: 0px 4px; display:none">
                                                <i class="fa fa-fw fa-eye-slash" aria-hidden="true"></i>
                                                Hide Details
                                            </button>
                                            <button type="button" class="btn btn-xs btn-primary showCoverageQuestions"
                                                    id='${coverage.coverageCode}_ShowCoverageQuestionsButton'
                                                    data-covid='${coverage.coverageCode}'
                                                    style="padding: 0px 4px; display:none">
                                                <i class="fa fa-fw fa-eye" aria-hidden="true"></i>
                                                Show Details
                                            </button>
                                            <button type="button" class="btn btn-xs btn-info editCoverageButton"
                                                    id='${coverage.coverageCode}_EditCoverageButton'
                                                    data-covid='${coverage.coverageCode}'
                                                    style="padding: 0px 4px; font-size:10px;">
                                                <i class="fa fa-fw fa-pencil" aria-hidden="true"></i>
                                                Edit
                                            </button>
                                        </g:else>
                                    </div>
                                    <div class="coverageQuestionsContainer hiddenContainer" id="${coverage.coverageCode}_CoverageQuestionsContainer" style="display:none">

                                       %{--PACKAGE OPTIONS--}%
                                        <div class="col-xs-12 well">
                                            <h5>Coverages available in this Package:</h5>
                                            <div style="color: rgb(175, 0, 0); margin-top: -10px;font-size:11px">
                                                <span>Package is automatically selected as a Submission's Product/Coverage when 2 OR MORE of the following are chosen by the broker </span>
                                            </div>
                                            <div style="color: rgb(175, 0, 0); margin-top: -10px;font-size:11px">
                                                <span>If no Coverages are selected, this package will be offered as clickable option </span>
                                            </div>


                                            <div class="row packageCoverageOptionsContainer "
                                                 id="${coverage.coverageCode}_PackageCoverageOptionsContainer"
                                                 style="padding:12px">
                                                <g:each var="packageCoverageOption" in="${coverageResults.findAll{ it.packageFlag == 'N' && it.activeFlag == 'Y' } }">
                                                    <div class="col-xs-2 form-group" style="margin-bottom: 0px; padding-left: 0px; padding-right: 0px;">
                                                        <label class="checkBoxLabel">
                                                            <input type='checkbox'
                                                                   class='packageProductCheckbox onChangeSaveOperation
                                                                            ${coverage.coverageCode}_packageCoverageOption
                                                                            ${packageCoverageOption.coverageCode}_PackageProductCheckbox'
                                                                   name="${coverage.coverageCode}_CheckboxGroup"
                                                                   value="${packageCoverageOption.coverageCode}" data-covid="${packageCoverageOption.coverageCode}"/>
                                                            ${packageCoverageOption.coverageCode} (${packageCoverageOption.coverageName})
                                                        </label>
                                                    </div>
                                                </g:each>
                                            </div>

                                            <div class="row allLOBDetailContainer" id="${coverage.coverageCode}_AllLOBDetailContainer" style="margin-top:40px;">

                                            </div>
                                        </div>

                                        %{--PRODUCT ALWAYS/WHEN CONDITION CONTAINER V2--}%
                                        <div class="col-xs-12 well">
                                            <h5>Which Product to Use</h5>
                                            <div class="row logicConditionRowsContainer rowContainer" id="${coverage.coverageCode}_LogicConditionRowsContainer">
                                                <div class="col-xs-12 logicConditionRow">
                                                    <div class="row mainLogicContainer" style="margin-left: -5px;">
                                                        <div class="col-xs-1" style="">
                                                            <select class="form-control rowConditionDropdown onChangeSaveOperation">
                                                                <option class="alwaysOption" value="ALWAYS">ALWAYS</option>
                                                                <option class="ifOption" value="IF">IF</option>
                                                                <option class="ifElseOption" value="IFELSE" >IF ELSE</option>
                                                                <option class="elseOption" value="ELSE" >ELSE</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-1" style="visibility:hidden">
                                                            <select class="form-control conditionBasis onChangeSaveOperation">
                                                                <g:each var="conditionBasis" in="${conditionBasisResults}">
                                                                    <option value="${conditionBasis.conditionID}">${conditionBasis.description}</option>
                                                                </g:each>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-1" style="visibility:hidden">
                                                            <select class="form-control conditionOperator onChangeSaveOperation">
                                                                <g:each var="conditionOperator" in="${conditionOperatorsResults}">
                                                                    <option value="${conditionOperator.conditionID}">${conditionOperator.description}</option>
                                                                </g:each>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-2" style="visibility:hidden">
                                                            <div class="form-group">
                                                                <input class="form-control conditionBasisValue maskMoney onChangeSaveOperation" type="text" data-precision="0" data-prefix="$">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-4">
                                                            <select class="form-control conditionOutput onChangeSaveOperation
                                                                    ${coverage.coverageCode}_ProductsForCoverageSelect"
                                                                    data-covid="${coverage.coverageCode}">
                                                                <g:each var="product" in="${productResults.findAll{ it.coverage == coverage.coverageCode && it.activeFlag == 'Y'} }">
                                                                    <option value="${product.productID}">(${product.productID}) ${product.productName}</option>
                                                                </g:each>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-3 buttonColumn" style="visibility:hidden">
                                                            <button class="btn btn-sm btn-primary pull-left addLogicConditionRow" style="margin-left:10px;">
                                                                <span>Add Row</span>
                                                            </button>
                                                            <button class="btn btn-sm pull-left addSubLogicConditionRow">
                                                                <span>Add Sub Logic</span>
                                                            </button>
                                                            <button class="btn btn-xs btn-success pull-left moveLogicRowDownButton onChangeSaveOperation" style="border-radius:20px; margin-left:10px;font-size:10px;">
                                                                <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                                            </button>
                                                            <button class="btn btn-xs btn-success pull-left moveLogicRowUpButton onChangeSaveOperation" style="border-radius:20px;  font-size:10px;">
                                                                <i class="fa fa-arrow-up" aria-hidden="true"></i>
                                                            </button>
                                                            <button class="btn btn-sm btn-danger pull-right removeLogicConditionRow onChangeSaveOperation" style="display:none">
                                                                <span>Remove</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        %{--REQUIRED QUESTIONS ALL CONTAINER--}%
                                        <div class="col-xs-12 well" id="${coverage.coverageCode}_RequiredQuestionsAllSection" style="display:">
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <label>Required Questions All ${coverage.coverageName}</label>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row requiredQuestionsAllContainer" >
                                                <div class="col-xs-12">
                                                    <div class="panel panel-primary requiredQuestionsPanel ${coverage.coverageCode}_RequiredQuestionsAllPanel"
                                                         style="">
                                                        <div class="panel-heading">
                                                            <h6 class="panel-title">Required Questions All</h6>
                                                        </div>
                                                        <div class="panel-body"
                                                             id="${coverage.coverageCode}_RequiredQuestionsAll">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        %{--UW QUESTIONS CONTAINER--}%
                                        <div class="col-xs-12 well" id="${coverage.coverageCode}_UWQuestionsSection" style="display:">
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <label>Under Writing Questions for ${coverage.coverageName}</label>
                                                </div>
                                            </div>
                                            <div class="row underwritingQuestionsContainer" id="${coverage.coverageCode}_UnderwritingQuestionsContainer">
                                                <g:each var="questionCategory" in="${questionCategoryResults.findAll{ it.coverageCategoryFlag == "N" || it.categoryCode == coverage.coverageCode  }}">
                                                    <div class="col-xs-12">
                                                        <div class="panel panel-primary uwQuestionCategoryPanel ${coverage.coverageCode}_uwQuestionCategoryPanel"
                                                             id="${coverage.coverageCode}_${questionCategory.categoryCode}_QuestionCategoryPanel"
                                                             data-questioncategorycode="${questionCategory.categoryCode}"
                                                             style="">
                                                            <div class="panel-heading">
                                                                <button type="button" class="btn btn-xs btn-info pull-right hideQuestionCategory"
                                                                        data-questionCategory="${questionCategory.categoryCode}" style="padding: 0px 4px; display:none">
                                                                    <i class="fa fa-fw fa-eye-slash" aria-hidden="true"></i>
                                                                    Hide Details
                                                                </button>
                                                                <button type="button" class="btn btn-xs btn-info pull-right showQuestionCategory"
                                                                        data-questionCategory="${questionCategory.categoryCode}" style="padding: 0px 4px;">
                                                                    <i class="fa fa-fw fa-eye" aria-hidden="true"></i>
                                                                    Show Details
                                                                </button>
                                                                <h6 class="panel-title">${questionCategory.categoryName}</h6>
                                                            </div>
                                                            <div class="panel-body"
                                                                 id="${coverage.coverageCode}_${questionCategory.categoryCode}_QuestionCategoryContainer"
                                                                 data-questioncategorycode="${questionCategory.categoryCode}"
                                                                 style="display: none">
                                                                <g:each var="question" in="${questionResults.findAll{ it.category == questionCategory.categoryCode && it.hiddenFlag == 'N'} }">
                                                                    <div class="col-xs-4 form-group ">
                                                                        <label>
                                                                            <input type="checkbox" class="uwQuestionCheckbox onChangeSaveOperation
                                                                            <g:if test="${question.questionGroup != null} ">
                                                                                questionGroup_${question.questionGroup} "
                                                                            </g:if>
                                                                                   id="${coverage.coverageCode}_${question.questionID}_QuestionCheckbox"
                                                                                   data-questionid="${question.questionID}"
                                                                                   data-questioncategorycode="${questionCategory.categoryCode}"
                                                                                   data-covid="${coverage.coverageCode}">
                                                                            ${question.questionText}
                                                                        </label>
                                                                    </div>
                                                                </g:each>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </g:each>
                                                <div class="underwriterQuestions" id="${coverage.coverageCode}_UnderwriterQuestions">
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </g:each>
                            <h5>Coverages:</h5>
                            %{--EACH COVERAGE OPTIONS--}%
                            <g:each var="coverage" in="${coverageResults.findAll{ it.packageFlag == 'N' && it.activeFlag == 'Y' } }">
                                <div class="row coverageContainer checkboxAndHiddenDivContainer" style="margin-left: 0px; margin-right:0px;">
                                    <div class='col-xs-12 form-group checkboxContainer'>
                                        <g:if test="${coverage.activeFlag == 'N'}">
                                            <label class="checkBoxLabel" style="color:darkgrey">
                                                <input type='checkbox' class='coverageCheckbox checkboxHiddenDiv' data-covid='${coverage.coverageCode}'
                                                    id='${coverage.coverageCode}_checkbox'
                                                    disabled="true"/> ${coverage.coverageName}
                                                <span class="label label-default"
                                                      style="padding: .1em .4em .1em;background-color: rgba(119, 119, 119, 0.79);margin-right:4px;">
                                                Not Active</span>
                                            </label>
                                            <button type="button" class="btn btn-xs btn-info editCoverageButton"
                                                    id='${coverage.coverageCode}_EditCoverageButton'
                                                    data-covid='${coverage.coverageCode}'
                                                    style="padding: 0px 4px; font-size:10px;">
                                                <i class="fa fa-fw fa-pencil" aria-hidden="true"></i>
                                                Edit
                                            </button>
                                        </g:if>
                                        <g:else>
                                            <label class="checkBoxLabel">
                                                <input type='checkbox' class='coverageCheckbox checkboxHiddenDiv onChangeSaveOperation' data-covid='${coverage.coverageCode}'
                                                       id='${coverage.coverageCode}_checkbox'/> ${coverage.coverageName}
                                            </label>
                                            <button type="button" class="btn btn-xs btn-primary hideCoverageQuestions"
                                                    id='${coverage.coverageCode}_HideCoverageQuestionsButton'
                                                    data-covid='${coverage.coverageCode}'
                                                    style="padding: 0px 4px; display:none; margin-right:4px;">
                                                <i class="fa fa-fw fa-eye-slash" aria-hidden="true"></i>
                                                Hide Details
                                            </button>
                                            <button type="button" class="btn btn-xs btn-primary showCoverageQuestions"
                                                    id='${coverage.coverageCode}_ShowCoverageQuestionsButton'
                                                    data-covid='${coverage.coverageCode}'
                                                    style="padding: 0px 4px; display:none; margin-right:4px;">
                                                <i class="fa fa-fw fa-eye" aria-hidden="true"></i>
                                                Show Details
                                            </button>
                                            <button type="button" class="btn btn-xs btn-info editCoverageButton"
                                                    id='${coverage.coverageCode}_EditCoverageButton'
                                                    data-covid='${coverage.coverageCode}'
                                                    style="padding: 0px 4px; font-size:10px;">
                                                <i class="fa fa-fw fa-pencil" aria-hidden="true"></i>
                                                Edit
                                            </button>
                                        </g:else>
                                    </div>
                                    <div class="coverageQuestionsContainer hiddenContainer" id="${coverage.coverageCode}_CoverageQuestionsContainer" style="display:none">
                                        %{--MONOLINE CHECKBOX--}%
                                        <div class="col-xs-12 well">
                                            <h5>Coverage Options</h5>
                                            <label class="checkBoxLabel">
                                                <input type="checkbox" class="monolineCheckbox onChangeSaveOperation" data-covid="${coverage.coverageCode}" id="${coverage.coverageCode}_monolineCheckbox"> Monoline Only
                                            </label>
                                        </div>
                                        %{--PRODUCT ALWAYS/WHEN CONDITION CONTAINER V2--}%
                                        <div class="col-xs-12 well">
                                            <h5>Which Product to Use</h5>
                                            <div class="row logicConditionRowsContainer rowContainer" id="${coverage.coverageCode}_LogicConditionRowsContainer">
                                                <div class="col-xs-12 logicConditionRow">
                                                    <div class="row mainLogicContainer" >
                                                        <div class="col-xs-1" style="">
                                                            <select class="form-control rowConditionDropdown">
                                                                <option class="alwaysOption" value="ALWAYS">ALWAYS</option>
                                                                <option class="ifOption" value="IF">IF</option>
                                                                <option class="ifElseOption" value="IFELSE" >IF ELSE</option>
                                                                <option class="elseOption" value="ELSE" >ELSE</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-1" style="display:none">
                                                            <select class="form-control conditionBasis">
                                                                <g:each var="conditionBasis" in="${conditionBasisResults}">
                                                                    <option value="${conditionBasis.conditionID}">${conditionBasis.description}</option>
                                                                </g:each>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-1" style="display:none">
                                                            <select class="form-control conditionOperator">
                                                                <g:each var="conditionOperator" in="${conditionOperatorsResults}">
                                                                    <option value="${conditionOperator.conditionID}">${conditionOperator.description}</option>
                                                                </g:each>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-2" style="display:none">
                                                            <div class="form-group">
                                                                <input class="form-control conditionBasisValue maskMoney" type="text" data-precision="0" data-prefix="$">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-4">
                                                            <select class="form-control conditionOutput ${coverage.coverageCode}_ProductsForCoverageSelect" data-covid="${coverage.coverageCode}">
                                                                <g:each var="product" in="${productResults.findAll{ it.coverage == coverage.coverageCode && it.activeFlag == 'Y'} }">
                                                                    <option value="${product.productID}">(${product.productID}) ${product.productName}</option>
                                                                </g:each>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-3 buttonColumn" style="display:none">
                                                            <button class="btn btn-sm btn-primary pull-left addLogicConditionRow" style="margin-left:10px;">
                                                                <span>Add Row</span>
                                                            </button>
                                                            <button class="btn btn-sm pull-left addSubLogicConditionRow">
                                                                <span>Add Sub Logic</span>
                                                            </button>
                                                            <button class="btn btn-xs btn-success pull-left moveLogicRowDownButton" style="border-radius:20px; margin-left:10px;font-size:10px;">
                                                                <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                                            </button>
                                                            <button class="btn btn-xs btn-success pull-left moveLogicRowUpButton" style="border-radius:20px;  font-size:10px;">
                                                                <i class="fa fa-arrow-up" aria-hidden="true"></i>
                                                            </button>
                                                            <button class="btn btn-sm btn-danger pull-right removeLogicConditionRow" style="display:none">
                                                                <span>Remove</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        %{--REQUIRED QUESTIONS ALL CONTAINER--}%
                                        <div class="col-xs-12 well" id="${coverage.coverageCode}_RequiredQuestionsAllSection" style="display:;">
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <label>Required Questions All ${coverage.coverageName}</label>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row requiredQuestionsAllContainer" >
                                                <div class="col-xs-12">
                                                    <div class="panel panel-primary requiredQuestionsPanel ${coverage.coverageCode}_RequiredQuestionsAllPanel"
                                                         style="">
                                                        <div class="panel-heading">
                                                            <h6 class="panel-title">Required Questions All</h6>
                                                        </div>
                                                        <div class="panel-body"
                                                             id="${coverage.coverageCode}_RequiredQuestionsAll">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        %{--UW QUESTIONS CONTAINER--}%
                                        <div class="col-xs-12 well" id="${coverage.coverageCode}_UWQuestionsSection" style="display:">
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <label>Under Writing Questions for ${coverage.coverageName}</label>
                                                </div>
                                            </div>
                                            <div class="row underwritingQuestionsContainer" id="${coverage.coverageCode}_UnderwritingQuestionsContainer">
                                                <g:each var="questionCategory" in="${questionCategoryResults.findAll{ it.coverageCategoryFlag == "N" || it.categoryCode == coverage.coverageCode  }}">
                                                    <div class="col-xs-12">
                                                        <div class="panel panel-primary uwQuestionCategoryPanel ${coverage.coverageCode}_uwQuestionCategoryPanel"
                                                             id="${coverage.coverageCode}_${questionCategory.categoryCode}_QuestionCategoryPanel"
                                                             data-questioncategorycode="${questionCategory.categoryCode}"
                                                             style="">
                                                            <div class="panel-heading">
                                                                <button type="button" class="btn btn-xs btn-info pull-right hideQuestionCategory"
                                                                        data-questionCategory="${questionCategory.categoryCode}" style="padding: 0px 4px; display:none">
                                                                    <i class="fa fa-fw fa-eye-slash" aria-hidden="true"></i>
                                                                    Hide Details
                                                                </button>
                                                                <button type="button" class="btn btn-xs btn-info pull-right showQuestionCategory"
                                                                        data-questionCategory="${questionCategory.categoryCode}" style="padding: 0px 4px;">
                                                                    <i class="fa fa-fw fa-eye" aria-hidden="true"></i>
                                                                    Show Details
                                                                </button>
                                                                <h6 class="panel-title">${questionCategory.categoryName}</h6>
                                                            </div>
                                                            <div class="panel-body"
                                                                 id="${coverage.coverageCode}_${questionCategory.categoryCode}_QuestionCategoryContainer"
                                                                 data-questioncategorycode="${questionCategory.categoryCode}"
                                                                style="display: none">
                                                                <g:each var="question" in="${questionResults.findAll{ it.category == questionCategory.categoryCode && it.hiddenFlag == 'N'} }">
                                                                    <div class="col-xs-4 form-group ">
                                                                        <label>
                                                                            <input type="checkbox" class="uwQuestionCheckbox
                                                                            <g:if test="${question.questionGroup != null} ">
                                                                                questionGroup_${question.questionGroup} "
                                                                            </g:if>
                                                                                   id="${coverage.coverageCode}_${question.questionID}_QuestionCheckbox"
                                                                                   data-questionid="${question.questionID}"
                                                                                   data-questioncategorycode="${questionCategory.categoryCode}"
                                                                                   data-covid="${coverage.coverageCode}">
                                                                            ${question.questionText}
                                                                        </label>
                                                                    </div>
                                                                </g:each>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </g:each>
                                                <div class="underwriterQuestions" id="${coverage.coverageCode}_UnderwriterQuestions">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </g:each>
                        </div>
                    </div>

                </div>

                <div role="tabpanel" class="tab-pane fade in" id="coveragesPage">
                    %{--PRODUCT SELECT--}%
                    <div class="row">
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label class="control-label">Coverages</label>
                                <select class="form-control" id="coveragesPage_coveragesDropdown">
                                    <option value="invalid">Select One</option>

                                    <g:each var="coverage" in="${coverageResults}">
                                        <option value="${coverage.coverageCode}">${coverage.coverageCode} - ${coverage.coverageName}</option>
                                    </g:each>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-sm btn-primary" style="margin-top:26px;display:none" id="saveCoverageButton">
                                <span>SAVE</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-success" id="addNew_Coverage_Button" style="margin-top:26px"
                                    onclick="$('#createCoverageModal').modal('show')">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                New Product
                            </button>
                        </div>
                    </div>

                    %{--PRODUCT DETAILS --}%
                    <div class="row" id="coverageDetailsContainer">
                        <div class="col-xs-4" id="coveragesPageLeftColumn">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label class="control-label">Coverage Details</label>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Coverage</h6>
                                        <input class="form-control onChangeSaveCoverage" id="coverageCodeInput" type="text" disabled>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Coverage Name</h6>
                                        <input class="form-control onChangeSaveCoverage" id="coverageNameInput" type="text">
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label">Active?</label>
                                        <br>
                                        <label class="radioHorizontalLayout checkBoxLabel">
                                            <input type="radio" class="showReview onChangeSaveCoverage" name="coverageDetails_coverageActiveFlagRadioGroup" value="Y" id="coverageDetails_activeFlagYes">
                                            Yes
                                        </label>
                                        <label class="radioHorizontalLayout checkBoxLabel">
                                            <input type="radio" class="showReview onChangeSaveCoverage" name="coverageDetails_coverageActiveFlagRadioGroup" value="N" id="coverageDetails_activeFlagNo">
                                            No
                                        </label>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label">Is Package?</label>
                                        <div style="margin-top: -10px; font-size: 11px; color: rgb(185, 0, 0); line-height: 1.2em; margin-bottom:7px">
                                            <span>If yes, It will not be shown as a option for brokers to select.
                                            Instead it will be automatically selected if the appropriate coverages are selected on the operations page</span>
                                        </div>
                                        <label class="radioHorizontalLayout checkBoxLabel">
                                            <input type="radio" class="showReview onChangeSaveCoverage" name="coverageDetails_coveragePackageFlagRadioGroup" value="Y" id="coverageDetails_packageFlagYes">
                                            Yes
                                        </label>
                                        <label class="radioHorizontalLayout checkBoxLabel">
                                            <input type="radio" class="showReview onChangeSaveCoverage" name="coverageDetails_coveragePackageFlagRadioGroup" value="N" id="coverageDetails_packageFlagNo">
                                            No
                                        </label>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label">Usages</label>
                                        <br>
                                        <span id="coverageUsagesSpan" style="white-space: pre;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4" id="coveragesPageRightColumn">

                        </div>
                        <div class="col-xs-4">

                        </div>
                    </div>

                </div>

                <div role="tabpanel" class="tab-pane fade in" id="productsPage">
                    %{--PRODUCT SELECT--}%
                    <div class="row">
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label class="control-label">Products</label>
                                <select class="form-control" id="productsPage_productsDropdown">
                                    <option value="invalid">Select One</option>

                                    <g:each var="product" in="${productResults}">
                                        <option value="${product.productID}">${product.productID} - ${product.productName}</option>
                                    </g:each>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-sm btn-primary" style="margin-top:26px;display:none" id="saveProductButton">
                                <span>SAVE</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-success" id="addNew_Product_Button" style="margin-top:26px"
                                    onclick="$('#createProductModal').modal('show')">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                New Product
                            </button>
                        </div>
                    </div>

                    %{--PRODUCT DETAILS --}%
                    <div class="row" id="productDetailsContainer">
                        <div class="col-xs-4" id="productsPageLeftColumn">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label class="control-label">Product Details</label>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Product ID</h6>
                                        <input class="form-control onChangeSaveProduct" id="productIDInput" type="text" disabled>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Coverage</h6>
                                        <select class="form-control onChangeSaveProduct"  id="productsPage_CoverageDropdown" required="required" >
                                            <option value="invalid" selected="selected">Select One</option>
                                            <g:each var="coverage" in="${coverageResults}">
                                                <option value="${coverage.coverageCode}">${coverage.coverageCode} - ${coverage.coverageName}</option>
                                            </g:each>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Product Name</h6>
                                        <input class="form-control onChangeSaveProduct" id="productNameInput" type="text">
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label">Active?</label>
                                        <br>
                                        <label class="radioHorizontalLayout checkBoxLabel">
                                            <input type="radio" class="showReview onChangeSaveProduct" name="productDetails_productActiveFlagRadioGroup" value="Y" id="productDetails_activeFlagYes">
                                            Yes
                                        </label>
                                        <label class="radioHorizontalLayout checkBoxLabel">
                                            <input type="radio" class="showReview onChangeSaveProduct" name="productDetails_productActiveFlagRadioGroup" value="N" id="productDetails_activeFlagNo">
                                            No
                                        </label>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="control-label">Usages</label>
                                        <br>
                                        <span id="productUsagesSpan" style="white-space: pre;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4" id="productsPageRightColumn">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label class="control-label">Product Details</label>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Market Company</h6>
                                        <select class="form-control onChangeSaveProduct" id="productsPage_MarketCompanyDropdown" required="required" >
                                            <option value="invalid" selected="selected">Select One</option>
                                            <g:each var="company" in="${companyResults}">
                                                <option value="${company.companyID}">${company.companyID} - ${company.name}</option>
                                            </g:each>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Risk Company</h6>
                                        <select class="form-control onChangeSaveProduct"  id="productsPage_RiskCompanyDropdown" required="required" >
                                            <option value="invalid" selected="selected">Select One</option>
                                            <g:each var="company" in="${companyResults}">
                                                <option value="${company.companyID}">${company.companyID} - ${company.name}</option>
                                            </g:each>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4">

                        </div>
                    </div>
                     <br>
                    <div class="row" id="productPage_LimitDeductibleDetailContainer">
                        <div class="col-xs-12">
                            <div class="well">
                                <div class="row">
                                    <div class="col-xs-6">
                                        %{--LIMITS--}%
                                        <div class="row">
                                            <div class="col-xs-4">
                                                <label>Limits</label>
                                            </div>
                                        </div>
                                        <div class="row" id="productPage_limitsHeaderRow">
                                            <div class="col-xs-3">
                                                <h6>Limit</h6>
                                            </div>
                                            <div class="col-xs-7">
                                                <h6>Description</h6>
                                            </div>
                                        </div>
                                        <div id="productPage_limitsContainer">

                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        %{--DEDUCTIBLES--}%
                                        <div class="row">
                                            <div class="col-xs-4">
                                                <label>Deductibles</label>
                                            </div>
                                        </div>
                                        <div class="row" id="productPage_deductsHeaderRow">
                                            <div class="col-xs-3">
                                                <h6>Deductible</h6>
                                            </div>
                                            <div class="col-xs-7">
                                                <h6>Description</h6>
                                            </div>
                                        </div>
                                        <div id="productPage_deductsContainer">
                                            <div class="row productPage_deductRow">
                                                <div class="col-xs-2">
                                                    <div class="form-group">
                                                        <span class="deductAmount"></span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-4">
                                                    <span class="deductDescription"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="productPage_ProductRateDetailContainer">
                        <div class="col-xs-11">
                            <div class="well">
                                <div class="row">
                                    <div class="col-xs-4">
                                        <label>Rating</label>
                                        <button type="button" class="btn btn-xs btn-info editRatesButton">
                                            <i class="fa fa-pencil" aria-hidden="true"></i>
                                            Edit Rates
                                        </button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-3">
                                        <h6>Rate ID</h6>
                                    </div>
                                    <div class="col-xs-1">
                                        <h6>Basis</h6>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-3">
                                        <select class="form-control onChangeSaveProduct"  id="productsPage_ProductRateDropdown" required="required" >
                                            <option value="invalid" selected="selected">Select One</option>
                                            <g:each var="rate" in="${rateResults}">
                                                <option value="${rate.rateID}">${rate.rateID} - ${rate.description}</option>
                                            </g:each>
                                        </select>
                                    </div>
                                    <div class="col-xs-1">
                                        <span id="productPage_RateBasisDisplay">Rate Basis</span>
                                    </div>
                                </div>
                                <div id="productPage_RatingStyleContainer">
                                    <div id="productPage_DefaultRatingContainer">
                                        <div class="row">
                                            <div class="col-xs-1">
                                                <h6>Rate</h6>
                                            </div>
                                            <div class="col-xs-1">
                                                <h6>Min Premium</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-1">
                                                <span id="productPage_RateValue">Rate</span>
                                            </div>
                                            <div class="col-xs-1">
                                                <span id="productPage_MinPremium">Min Premium </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="productPage_LimitRatingContainer">
                                        <div class="row">
                                            <div class="col-xs-4">
                                                <h6>Limit</h6>
                                            </div>
                                            <div class="col-xs-1">
                                                <h6>Rate</h6>
                                            </div>
                                            <div class="col-xs-1">
                                                <h6>Min Premium</h6>
                                            </div>
                                        </div>
                                        <div id="productPage_LimitRateRowsContainer">
                                            <div class="row productlimitRateRow">
                                                <div class="col-xs-4">
                                                    <span class="productPage_LimitDescription">Rate Basis</span>
                                                </div>
                                                <div class="col-xs-1">
                                                    <span class="productPage_LimitRateValue">Rate</span>
                                                </div>
                                                <div class="col-xs-1">
                                                    <span class="productPage_LimitMinPremium">Min Premium </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row" id="productPage_ProductAdditionalOptionsContainer">
                        <div class="col-xs-12">
                            <div class="well">
                                <div class="row">
                                    <div class="col-xs-4">
                                        <label>Additional Product Options</label>
                                    </div>
                                </div>
                                <div class="row additionalProductOptionsContainer">
                                    <div class="col-xs-12">
                                        <label class="checkBoxLabel">
                                            <input type="checkbox" class="additionalProductOptionCheckbox onChangeSaveProduct" id="BAI_checkbox" data-addoptionid="BAI"> Blanket Additional Insured
                                        </label>
                                    </div>
                                    <div class="col-xs-12">
                                        <label class="checkBoxLabel">
                                            <input type="checkbox" class="additionalProductOptionCheckbox onChangeSaveProduct" id="WOS_checkbox" data-addoptionid="WOS"> Waiver of Subrogation
                                        </label>
                                    </div>
                                    <div class="col-xs-12">
                                        <label class="checkBoxLabel">
                                            <input type="checkbox" class="additionalProductOptionCheckbox onChangeSaveProduct" id="EAI_checkbox" data-addoptionid="EAI"> Each Additional Insured
                                        </label>
                                    </div>
                                    <div class="col-xs-12">
                                        <label class="checkBoxLabel">
                                            <input type="checkbox" class="additionalProductOptionCheckbox onChangeSaveProduct" id="MED_checkbox" data-addoptionid="MED"> Medical Payments
                                        </label>
                                    </div>
                                    <div class="col-xs-12">
                                        <label class="checkBoxLabel">
                                            <input type="checkbox" class="additionalProductOptionCheckbox onChangeSaveProduct" id="INCAGG_checkbox" data-addoptionid="INCAGG"> Increase Aggregate Limit to 2 Million
                                        </label>
                                    </div>
                                    <div class="col-xs-12">
                                        <label class="checkBoxLabel">
                                            <input type="checkbox" class="additionalProductOptionCheckbox onChangeSaveProduct" id="CIVAUTH_checkbox" data-addoptionid="CIVAUTH"> Civil Authority
                                        </label>
                                    </div>
                                    <div class="col-xs-12">
                                        <label class="checkBoxLabel">
                                            <input type="checkbox" class="additionalProductOptionCheckbox onChangeSaveProduct" id="ANIMAL_checkbox" data-addoptionid="ANIMAL"> Animal Mortality
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row" id="productPage_QuestionDetailsContainer">
                        <div class="col-xs-12" id="productPage_requiredQuestionsSection">
                            <div class="well">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <label>Required Questions to Rate</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="col-xs-4">
                                            %{--<input class="typeahead form-control" id="productPage_RequiredQuestionTypeahead" type="text" data-typeahead_dataset="typeahead_questions">--}%
                                            <select class="form-control" id="productPage_RequiredQuestionDropdown">
                                                <option value="invalid">Select One</option>
                                                <g:each var="question" in="${questionResults}">
                                                    <option value="${question.questionID}">${question.questionText}</option>
                                                </g:each>
                                            </select>
                                        </div>
                                        <div class="col-xs-2">
                                            <button class="btn btn-sm btn-primary onChangeSaveProduct" id="productPage_insertRequiredQuestion">
                                                <span>Insert</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="productPage_requiredQuestionsContainer">
                                    <div class="" id="productPage_requiredQuestions">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12" id="productPage_uwQuestionsSection">
                            <div class="well">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <label>Under Writing Questions</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="col-xs-4">
                                            %{--<input class="typeahead form-control" id="productPage_UWQuestionTypeahead" type="text" data-typeahead_dataset="typeahead_questions">--}%
                                            <select class="form-control" id="productPage_UWQuestionDropdown">
                                                <option value="invalid">Select One</option>
                                                <g:each var="question" in="${questionResults}">
                                                    <option value="${question.questionID}">${question.questionText}</option>
                                                </g:each>
                                            </select>
                                        </div>
                                        <div class="col-xs-2">
                                            <button class="btn btn-sm btn-primary onChangeSaveProduct" id="productPage_insertUWQuestion">
                                                <span>Insert</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="productPage_uwQuestionsContainer">
                                    <div class="" id="productPage_uwQuestions">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="productPage_ProductTermsContainer">
                        <div class="col-xs-12">
                            <label>Terms</label>
                        </div>
                        <div class="col-xs-8">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <textarea class="form-control onChangeSaveProduct" cols='10' rows="10" id="productsPage_ProductTerms">

                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row" id="productPage_ProductFormDetailsContainer">
                        <div class="col-xs-12">
                            <label>Forms</label>
                        </div>
                        <div class="col-xs-12" id="productPageFormsContainer">
                            <label class="checkBoxLabel">
                                <input type="checkbox" class="additionalProductOptionCheckbox onChangeSaveProduct" id="" data-addoptionid="BAI"> Blanket Additional Insured
                            </label>
                        </div>

                    </div>

                </div>

                <div role="tabpanel" class="tab-pane fade in" id="ratesPage">
                    %{--RATES SELECT--}%
                    <div class="row">
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label class="control-label">Rate</label>
                                <select class="form-control" id="ratePage_RatesDropdown">
                                    <option value="invalid">Select One</option>

                                    <g:each var="rate" in="${rateResults}">
                                        <option value="${rate.rateID}">${rate.rateID} - ${rate.description}</option>
                                    </g:each>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-sm btn-primary" style="margin-top:26px; display:none" id="saveRateButton">
                                <span>SAVE</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-success" id="addNew_Rate_Button" style="margin-top:26px" onclick="$('#createRateModal').modal('show')">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                New Rate
                            </button>
                        </div>
                    </div>

                    %{--RATING BASIS DETAILS --}%
                    <div class="row" id="ratesDetailsContainer">
                        <div class="col-xs-12" id="ratesPageLeftColumn">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label class="control-label">Rate Details</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <h6>RateID</h6>
                                        <input class="form-control onChangeSaveRate" id="rateIDInput" type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <h6>Rate Description</h6>
                                        <input class="form-control onChangeSaveRate" id="rateDescriptionInput" type="text">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-12">
                                    %{--RATING BASIS CONTAINER--}%
                                    <div class="col-xs-12 well">
                                        <div class="row">
                                            <div class="col-xs-5">
                                                <label>Rating Basis Detail</label>
                                                <button type="button" class="btn btn-xs btn-info editRatingBasisButton">
                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                                    Edit Rating Basis
                                                </button>
                                            </div>
                                        </div>
                                        %{--RATING BASIS DROPDOWN--}%
                                        <div class="row">
                                            <div class="col-xs-4">
                                                <div class="form-group">
                                                    <h6>Rating Basis</h6>
                                                    <select class="form-control productRatingBasis onChangeSaveRate" id="ratePage_RatingBasisDropdown" >
                                                        <option value="invalid">Select One</option>
                                                        <g:each var="ratingBasis" in="${ratingBasisResults}">
                                                            <option value="${ratingBasis.basisID}">${ratingBasis.description}</option>
                                                        </g:each>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xs-1">
                                            </div>
                                        </div>
                                        %{--RATING STYLE CONTAINER--}%
                                        <div class="row">
                                            %{--DEFAULT RATING STYLE CONTAINER--}%
                                            <div id="ratePage_RateValueContainer">
                                                <div class="row col-xs-12">
                                                    <div class="col-xs-3">
                                                        <div class="form-group">
                                                            <h6>Rate</h6>
                                                            <input class="form-control onChangeSaveRate" id="ratesPage_RateValueInput" type="text">
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <div class="form-group">
                                                            <h6>Min Premium</h6>
                                                            <input class="form-control onChangeSaveRate" id="ratesPage_MinPremiumInput" type="text">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row col-xs-12">
                                                    <div class="col-xs-12">
                                                        <h6 class="ratingQuestionsTitle">Rating Preview</h6>
                                                    </div>
                                                </div>
                                                <div class="row col-xs-12">
                                                    <div class="col-xs-3" style="text-align: center">
                                                        <span id="ratePage_rateBasisQuestionPreview"></span>
                                                    </div>
                                                    <div class="col-xs-1" style="text-align: center">
                                                        <span>X</span>
                                                    </div>
                                                    <div class="col-xs-2" style="text-align: center">
                                                        <span id="ratePage_rateBasisRateValuePreview"></span>
                                                    </div>
                                                </div>
                                            </div>


                                            %{--LIMIT RATING STYLE CONTAINER--}%
                                            <div id="ratePage_LimitRateValuesContainer" style="display:none">
                                                <div class="row col-xs-12">
                                                    <div class="col-xs-1">
                                                        <div class="form-group">
                                                            <h6>Rate</h6>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <h6>Max Limit Allowed</h6>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-4">
                                                        <h6>Limit Description (Must Match Exactly)</h6>
                                                    </div>
                                                    <div class="col-xs-1">
                                                        <div class="form-group">
                                                            <h6>Min Premium</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" id="ratesPage_limitRatingRowsContainer">
                                                    <div class="col-xs-12 limitRatingRow" >
                                                        <div class="col-xs-1">
                                                            <div class="form-group">
                                                                <input class="form-control ratesPage_LimitRateValueInput onChangeSaveRate"  type="text">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-2">
                                                            <div class="form-group">
                                                                <input class="form-control ratesPage_LimitMaxValueInput onChangeSaveRate"  type="text">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-4">
                                                            <div class="form-group">
                                                                <input class="form-control ratesPage_LimitDescriptionInput onChangeSaveRate" type="text">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-1">
                                                            <div class="form-group">
                                                                <input class="form-control ratesPage_LimitMinPremiumInput onChangeSaveRate"  type="text">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-2">
                                                            <button type="button" class="btn btn-xs btn-success ratesPage_LimitRateAddButton" style="font-size:9px; margin-top: 6px;">
                                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-xs btn-danger ratesPage_LimitRateRemoveButton" style="font-size:9px; margin-top: 6px;">
                                                                <i class="fa fa-minus" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" id="ratesPage_limitEffectsLogicContainer">
                                                    <div class="col-xs-12" id="limitLogicEffectHeaderRow" style="margin-top:40px">
                                                    </div>
                                                    <div class="col-xs-12" id="limitLogicInitContainer">
                                                    </div>

                                                </div>
                                            </div>

                                            %{--BRACKET RATING STYLE CONTAINER--}%
                                            <div id="ratePage_BracketRateValuesContainer" style="display:none">
                                                <div class="row col-xs-12">
                                                    <div class="col-xs-3">
                                                        <div class="form-group">
                                                            <h6>Min Premium</h6>
                                                            <input class="form-control onChangeSaveRate" id="ratesPage_BracketRateMinPremium" type="text">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row col-xs-12">
                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <h6>Rate</h6>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6">
                                                        <h6>Up To</h6>
                                                    </div>
                                                </div>
                                                <div class="row" id="ratesPage_bracketRatingRowsContainer">
                                                    <div class="col-xs-12 bracketRatingRow" >
                                                        <div class="col-xs-2">
                                                            <div class="form-group">
                                                                <input class="form-control ratesPage_BracketRateValueInput onChangeSaveRate"  type="text">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <div class="form-group">
                                                                <input class="form-control ratesPage_BracketUpToInput maskMoney onChangeSaveRate" type="text" data-precision="0" data-prefix="$">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-2">
                                                            <button type="button" class="btn btn-xs btn-success ratesPage_BracketRateAddButton" style="font-size:9px; margin-top: 6px;">
                                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-xs btn-danger ratesPage_BracketRateRemoveButton" style="font-size:9px; margin-top: 6px;">
                                                                <i class="fa fa-minus" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            %{--DEFAULT RATING STYLE CONTAINER--}%
                                            <div id="ratePage_FlatRateValueContainer">
                                                <div class="row col-xs-12">
                                                    <div class="col-xs-3">
                                                        <div class="form-group">
                                                            <h6>Flat Premium</h6>
                                                            <input class="form-control onChangeSaveRate" id="ratesPage_FlatRateValueInput" type="text">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row col-xs-12">
                                                    <div class="col-xs-12">
                                                        <h6 class="ratingQuestionsTitle">Rating Preview</h6>
                                                    </div>
                                                </div>
                                                <div class="row col-xs-12">
                                                    <div class="col-xs-3" style="text-align: center">
                                                        <span id="ratePage_FlatRateBasisQuestionPreview"></span>
                                                    </div>
                                                    <div class="col-xs-1" style="text-align: center">
                                                        <span>X</span>
                                                    </div>
                                                    <div class="col-xs-2" style="text-align: center">
                                                        <span id="ratePage_FlatRateBasisRateValuePreview"></span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-xs-6" id="ratesPageRightColumn">

                        </div>

                    </div>

                </div>

                <div role="tabpanel" class="tab-pane fade in" id="ratingBasisPage">
                    %{--RATING BASIS SELECT--}%
                    <div class="row">
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label class="control-label">Rating Basis</label>
                                <select class="form-control productRatingBasis" id="ratingBasisPage_RatingBasisDropdown">
                                    <option value="invalid">Select One</option>

                                    <g:each var="ratingBasis" in="${ratingBasisResults}">
                                        <option value="${ratingBasis.basisID}">${ratingBasis.description}</option>
                                    </g:each>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-sm btn-primary" style="margin-top:26px;display:none" id="saveRatingBasisButton">
                                <span>SAVE</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-success" id="addNew_RatingBasis_Button" style="margin-top:26px"
                                    onclick="$('#createRatingBasisModal').modal('show')">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                New Rating Basis
                            </button>
                        </div>
                    </div>

                    %{--RATING BASIS DETAILS --}%
                    <div class="row" id="ratingBasisDetailsContainer">
                        <div class="col-xs-4" id="ratingBasisPageLeftColumn">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label class="control-label">Rating Basis Details</label>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Rating Basis ID</h6>
                                        <input class="form-control onChangeSaveRatingBasis" id="ratingBasisCodeInput" type="text">
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Rating Basis Description</h6>
                                        <input class="form-control onChangeSaveRatingBasis" id="ratingBasisDescriptionInput" type="text">
                                    </div>
                                </div>
                                <div id="ratingBasisPage_RatingBasisQuestionContainer">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <h6>Question To Rate Against</h6>
                                        </div>
                                    </div>
                                    <div class="col-xs-8">
                                        %{--<input class="typeahead form-control" id="ratingBasisPage_ratingBasisQuestionTypeahead" type="text" data-typeahead_dataset="typeahead_questions">--}%
                                        <select class="form-control" id="ratingBasisPage_ratingBasisQuestionDropdown">
                                            <option value="invalid">Select One</option>
                                            <g:each var="question" in="${questionResults}">
                                                <option value="${question.questionID}">${question.questionText}</option>
                                            </g:each>
                                        </select>
                                    </div>
                                    <div class="col-xs-2">
                                        <button class="btn btn-sm btn-primary onChangeSaveRatingBasis" id="ratingBasisPage_insertRatingBasisQuestionButton">
                                            <span>Insert</span>
                                        </button>
                                    </div>

                                    <div class="col-xs-12">
                                        <div class="row" id="questionPreviewContainer">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-8" id="ratingBasisPageRightColumn">

                        </div>

                    </div>
                </div>

                <div role="tabpanel" class="tab-pane fade in" id="questionsPage">
                    <div class="row">
                        <div class="col-xs-12" style="margin-top:10px;margin-bottom:10px;">
                            <button class="btn btn-sm btn-info" style="" id="addQuestionCategory" onclick="$('#createQuestionCategoryModal').modal('show')" >
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                <span>Create Category</span>
                            </button>
                            <button class="btn btn-sm btn-info" style="" id="addQuestionButton" onclick="$('#createQuestionModal').modal('show')">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                <span>Create Question</span>
                            </button>
                            <button class="btn btn-sm btn-primary" style="display:none" id="saveAllQuestionsButton">
                                <span>Save Category and Question Order</span>
                            </button>
                        </div>
                    </div>
                    <div id="questionCategoryRowsContainer">
                    <g:each var="questionCategory" in="${questionCategoryResults}">
                        <div class="row questionCategoryRow"
                             id="${questionCategory.categoryCode}_QuestionCategoryRow"
                             data-categorycode="${questionCategory.categoryCode}"
                             data-id="${questionCategory.id}">
                            <div class="col-xs-12">
                                <div class="panel panel-primary questionCategoryPanel">
                                    <div class="panel-heading" style="padding: 4px 10px;">
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <h6 class="panel-title questionCategoryHeader" style="font-size: 12px; padding-top:3px;"
                                                    data-id="${questionCategory.id}"
                                                    data-questioncategorycode="${questionCategory.categoryCode}"
                                                    data-questioncategoryname="${questionCategory.categoryName}">
                                                    ${questionCategory.categoryName} - ${questionCategory.categoryCode}
                                                </h6>
                                            </div>
                                            <div class="col-xs-6">
                                                <g:if test="${questionCategory.categoryCode == "NOCATEG"}">
                                                    <button class="btn btn-xs btn-info pull-right questionCategoryHideButton" style="display:none" >
                                                        <span>Hide Questions</span>
                                                    </button>
                                                    <button class="btn btn-xs btn-info pull-right questionCategoryShowButton" style="" >
                                                        <span>Show Questions</span>
                                                    </button>
                                                </g:if>
                                                <g:else>
                                                    <button class="btn btn-xs btn-danger pull-right deleteCategoryButton" style="display:none" >
                                                        <span>Delete Category</span>
                                                    </button>
                                                    <button class="btn btn-xs btn-success pull-right moveCategoryUpButton onChangeSaveQuestionOrder" style="border-radius:20px;" >
                                                        <i class="fa fa-arrow-up" aria-hidden="true"></i>
                                                    </button>
                                                    <button class="btn btn-xs btn-success pull-right moveCategoryDownButton onChangeSaveQuestionOrder" style="margin-left:10px; border-radius:20px;" >
                                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                                    </button>
                                                    <button class="btn btn-xs btn-info pull-right questionCategoryHideButton" style="display:none" >
                                                        <span>Hide Questions</span>
                                                    </button>
                                                    <button class="btn btn-xs btn-info pull-right questionCategoryShowButton" style="" >
                                                        <span>Show Questions</span>
                                                    </button>
                                                    <button class="btn btn-xs btn-info pull-right editQuestionCategoryButton" style="margin-right: 10px;" >
                                                        <span>Edit Category</span>
                                                    </button>
                                                    <button class="btn btn-xs btn-default pull-right doneQuestionCategoryButton" style="display:none" >
                                                        <span>Done</span>
                                                    </button>
                                                </g:else>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-body questionCategoryPanelBody"
                                         id="${questionCategory.categoryCode}_QuestionCategoryContainer"
                                         data-categorycode="${questionCategory.categoryCode}" style="display:none">
                                        <div class="row">
                                            <g:each var="question" in="${questionResults.findAll{ it.category == questionCategory.categoryCode && it.hiddenFlag == 'N'} }">
                                                <div class="questionEditRow" data-questionid="${question.questionID}" data-id="${question.id}">
                                                    <div class="row" >
                                                        <div class="col-xs-12">
                                                            <div class="form-group col-xs-6">
                                                                <label style="font-weight:300;">
                                                                    <input type="checkbox" class="questionEditCheckbox"
                                                                           data-questionid="${question.questionID}"
                                                                           data-id="${question.id}" >
                                                                    <span class="questionTextSpan">${question.questionText}</span>
                                                                </label>
                                                            </div>
                                                            <div class="form-group col-xs-6">
                                                                <button class="btn btn-xs btn-danger pull-right deleteQuestionButton onChangeSaveQuestionOrder" style="display:none; margin-left: 20px" >
                                                                    <span>Delete</span>
                                                                </button>
                                                                <button class="btn btn-xs btn-success pull-right moveQuestionUpButton onChangeSaveQuestionOrder" style="display:none; border-radius:20px;" >
                                                                    <i class="fa fa-arrow-up" aria-hidden="true"></i>
                                                                </button>
                                                                <button class="btn btn-xs btn-success pull-right moveQuestionDownButton onChangeSaveQuestionOrder" style="display:none; border-radius:20px;" >
                                                                    <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                                                </button>
                                                                <select class="form-control pull-right moveQuestionToCategoryDropdown onChangeSaveQuestionOrder"
                                                                        style="display:inline-block; width:40%; display:none; font-size: 12px;
                                                                        height: 22px">
                                                                    <option value="invalid">Change Question Category</option>
                                                                    <g:each var="qCategory" in="${questionCategoryResults}">
                                                                        <option value="${qCategory.categoryCode}">${qCategory.categoryName}</option>
                                                                    </g:each>
                                                                </select>
                                                                <button class="btn btn-xs btn-success pull-right editQuestionDetailsButton" style="display:none" >
                                                                    <span>Edit Question</span>
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row questionDetailContainer" id="${question.questionID}_QuestionDetailContainer"
                                                         data-questionid="${question.questionID}"
                                                         data-id="${question.id}"
                                                         style="display:none">
                                                        <div class="col-xs-6" >
                                                            <div class="col-xs-12">
                                                                <div class="form-group">
                                                                    <label>Question Type</label>
                                                                    <select class="form-control questionTypeDropdown onChangeSaveQuestion">
                                                                        <option value="invalid">Select One</option>
                                                                        <option value="basicText">Basic</option>
                                                                        <option value="textarea">Long Text</option>
                                                                        <option value="custom_mailingAddress">Address</option>
                                                                        <option value="datepicker">Date Picker</option>
                                                                        <option value="checkbox">Checkboxes</option>
                                                                        <option value="radio">Radio Buttons</option>
                                                                        <option value="dropdown">Dropdown</option>
                                                                        <option value="multiColumn">Multi Column</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div class="col-xs-12 inputTypeDetailSection ">
                                                                <div class="form-group allQuestionTypes">
                                                                    <label>Question ID</label>
                                                                    <input class="form-control questionIDInput" type="text" value="${question.questionID}" disabled>
                                                                </div>
                                                                <div class="form-group allQuestionTypes">
                                                                    <label>Question Text</label>
                                                                    <input class="form-control questionTextInput onChangeSaveQuestion" type="text" value="${question.questionText}">
                                                                </div>
                                                                <div class="form-group basicText_QuestionType longText_QuestionType multiColumn_QuestionType ">
                                                                    <label class="checkBoxLabel">
                                                                        <input type="checkbox" class="questionAttachmentsCheckbox onChangeSaveQuestion">
                                                                        Allow Attachments
                                                                    </label>
                                                                </div>
                                                                <div class="checkbox_QuestionType radio_QuestionType" style="">
                                                                    <div class="row">
                                                                        <div class="col-xs-12">
                                                                            <label>Checkbox Options</label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="checkboxRadioOptionsContainer">
                                                                        <div class="row checkboxRadioOptionRow">
                                                                            <div class="col-xs-8">
                                                                                <div class="form-group">
                                                                                    <input class="form-control input-xs checkboxOptionInput onChangeSaveQuestion" type="text">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xs-4">
                                                                                <div class="form-group">
                                                                                    <button class="btn btn-xs btn-success checkboxRadioAddRowButton" style="">
                                                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                                                    </button>
                                                                                    <button class="btn btn-xs btn-danger checkboxRadioRemoveRowButton onChangeSaveQuestion" style="">
                                                                                        <i class="fa fa-minus" aria-hidden="true"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="dropdown_QuestionType " style="margin-top:40px">
                                                                    <div class="row">
                                                                        <div class="col-xs-12">
                                                                            <label>Dropdown Options</label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xs-4">
                                                                            <label>ID</label>
                                                                        </div>
                                                                        <div class="col-xs-4">
                                                                            <label>Text</label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="dropdownOptionsContainer">
                                                                        <div class="row dropdownOptionRow">
                                                                            <div class="col-xs-8">
                                                                                <div class="form-group">
                                                                                    <input class="form-control input-xs dropdownOptionInput" type="text">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xs-4">
                                                                                <div class="form-group">
                                                                                    <button class="btn btn-xs btn-success dropdownOptionAddRowButton" style="">
                                                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                                                    </button>
                                                                                    <button class="btn btn-xs btn-danger dropdownOptionRemoveRowButton" style="">
                                                                                        <i class="fa fa-minus" aria-hidden="true"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="multiColumn_QuestionType multiColumnDetailsContainer" style="">
                                                                    <div class="row">
                                                                        <div class="col-xs-12">
                                                                            <label>MultiColumn Options</label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xs-6">
                                                                            <div class="form-group">
                                                                                <label># of Columns</label>
                                                                                <select class="form-control multiColumn_NumberOfColumnsDropdown">
                                                                                    <option value="1">1</option>
                                                                                    <option value="2">2</option>
                                                                                    <option value="3">3</option>
                                                                                    <option value="4">4</option>
                                                                                    <option value="6">6</option>
                                                                                    <option value="12">12</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row multiColumn_ColumnInputsContainer">
                                                                        <div class="col-xs-12 multiColumnDiv">
                                                                            <div class="form-group">
                                                                                <input class="form-control multiColumnInput" type="text" placeholder="Column Name" data-columnwidth="12">
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="col-xs-12">
                                                                <button class="btn btn-sm btn-primary saveQuestionDetailButton" style="">
                                                                    <span>Save Question</span>
                                                                </button>
                                                            </div>


                                                        </div>
                                                        <div class="col-xs-6 ">
                                                            <div class="row">
                                                                <div class="col-xs-12">
                                                                    <h4>Preview</h4>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="previewContainer ">

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </g:each>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </g:each>
                    </div>

                </div>

                <div role="tabpanel" class="tab-pane fade in" id="formsPage">
                    %{--FORMS HEADER--}%
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label class="control-label">Forms</label>
                                </div>
                            </div>
                        </div>

                    </div>

                    %{--FORMS LIST HEADER --}%
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label class="control-label">Form ID</label>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label class="control-label">Form Name</label>
                                </div>
                            </div>
                            <div class="col-xs-2">
                                <div class="form-group">
                                    <label class="control-label">View</label>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label class="control-label">Upload/Replace</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    %{--FORMS LIST ROWS --}%
                    <div class="row">
                    <g:each var="form" in="${formResults}">
                        <div class="col-xs-12 formEditRow" id="${form.id}_FormRow" data-id="${form.id}">
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <input class="form-control formIDInput onChangeSaveForm" type="text" value="${form.formID}">
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <input class="form-control formNameInput onChangeSaveForm" type="text" value="${form.formName}">
                                </div>
                            </div>
                            <div class="col-xs-2">
                                <g:link url="./../main/downloadForm?formID=${form.formID}" >
                                    <img src="/images/pdfIcon.png" height="32" width="32"> Download PDF</img>
                                </g:link>

                            </div>
                            <div class="col-xs-2">
                                <g:uploadForm action="uploadForm">
                                    <input type="file" name="formFile" id="${form.id}_FormUploadFileInput"/>
                                    <div style="display:none">
                                        <input type="text" name="formID" value="${form.formID}">
                                        <input type="submit" id="${form.id}_FormUploadSubmitButton"/>
                                    </div>

                                </g:uploadForm>
                            </div>
                            <div class="col-xs-1">
                                <i class="fa fa-lg fa-cloud-upload formUploadButton" aria-hidden="true" style="color: rgb(47, 164, 210); cursor:pointer">Upload</i>
                            </div>

                        </div>
                    </g:each>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div id="footer" style="position: fixed; bottom: 0; width: 100%; text-align: right; left: 0;">
        <span id="footerStatus" style="margin-right: 60px; padding-left:15px;
        padding-right:15px; background: rgba(255, 255, 255, 0.8); font-size: 16px; color: rgb(30, 146, 255);font-weight: 500;">
            UP TO DATE
        </span>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="createOperationModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Add New Operation</h4>
                </div>
                <div class="modal-body">
                        <div class="form-group">
                            <label>Operation ID (Max Length = 3)</label>
                            <input type="text" class="form-control noSpacesInput" id="newOperation_operationID" placeholder="Operation ID" style="text-transform: uppercase"
                                   maxlength="3">
                        </div>
                        <div class="form-group">
                            <label>Operation Description (Max Length = 55)</label>
                            <input type="text" class="form-control" id="newOperation_operationDescription" placeholder="Operation Description" maxlength="55">
                        </div>
                        <div class="form-group">
                            <label class="control-label">Active</label>
                            <br>
                            <label class="radioHorizontalLayout checkBoxLabel">
                                <input type="radio" class="showReview" name="newOperation_operationActiveFlagRadioGroup" value="Y" id="newOperation_activeFlagYes">
                                Yes
                            </label>
                            <label class="radioHorizontalLayout checkBoxLabel">
                                <input type="radio" class="showReview" name="newOperation_operationActiveFlagRadioGroup" value="N" id="newOperation_activeFlagNo">
                                No
                            </label>
                        </div>

                        <br>
                        <div class="row">
                            <div class="col-xs-4">
                            </div>
                            <div class="col-xs-2">

                            </div>
                            <div class="col-xs-6">
                                <button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px" onclick="createNewOperation()">Save Changes</button>
                                <button type="button" class="btn btn-primary pull-right" onclick="$('#createOperationModal').modal('hide')">Cancel</button>

                            </div>
                        </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="createCoverageModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Add New Coverage</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Coverage ID (Max Length = 8)</label>
                        <input type="text" class="form-control noSpacesInput" id="newCoverage_CoverageCode" placeholder="Coverage Code" style="text-transform: uppercase"
                               maxlength="8">
                    </div>
                    <div class="form-group">
                        <label>Coverage Name (Max Length = 55)</label>
                        <input type="text" class="form-control" id="newCoverage_CoverageName" placeholder="Coverage Name" maxlength="55">
                    </div>
                    <div class="form-group">
                        <label class="control-label">Active</label>
                        <br>
                        <label class="radioHorizontalLayout checkBoxLabel">
                            <input type="radio" class="showReview" name="newCoverage_coverageActiveFlagRadioGroup" value="Y" id="newCoverage_activeFlagYes">
                            Yes
                        </label>
                        <label class="radioHorizontalLayout checkBoxLabel">
                            <input type="radio" class="showReview" name="newCoverage_coverageActiveFlagRadioGroup" value="N" id="newCoverage_activeFlagNo">
                            No
                        </label>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-4">
                        </div>
                        <div class="col-xs-2">

                        </div>
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px" onclick="createNewCoverage()">Save Changes</button>
                            <button type="button" class="btn btn-primary pull-right" onclick="$('#createCoverageModal').modal('hide')">Cancel</button>

                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="createProductModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Add New Product</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Product ID (Max Length = 8)</label>
                        <input type="text" class="form-control noSpacesInput" id="newProduct_productID" placeholder="Product ID" style="text-transform: uppercase"
                               maxlength="8">
                    </div>
                    <div class="form-group">
                        <label>Product Name (Max Length = 55)</label>
                        <input type="text" class="form-control" id="newProduct_productName" placeholder="Product Name" maxlength="55">
                    </div>
                    <div class="form-group">
                        <label>Coverage</label>
                        <select class="form-control" id="newProduct_coverageCode">
                            <option value="invalid">Select Coverage</option>
                            <g:each var="coverage" in="${coverageResults}">
                                <option value="${coverage.coverageCode}">${coverage.coverageName}</option>
                            </g:each>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Company</label>
                        <select class="form-control" id="newProduct_companyID">
                            <option value="invalid">Select a Company</option>
                            <option value="NONE">None</option>
                            <g:each var="company" in="${companyResults}">
                                <option value="${company.companyID}">${company.name}</option>
                            </g:each>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Active</label>
                        <br>
                        <label class="radioHorizontalLayout checkBoxLabel">
                            <input type="radio" class="showReview" name="newProduct_productActiveFlagRadioGroup" value="Y" id="newProduct_activeFlagYes">
                            Yes
                        </label>
                        <label class="radioHorizontalLayout checkBoxLabel">
                            <input type="radio" class="showReview" name="newProduct_productActiveFlagRadioGroup" value="N" id="newProduct_activeFlagNo">
                            No
                        </label>
                    </div>

                    <br>
                    <div class="row">
                        <div class="col-xs-4">
                        </div>
                        <div class="col-xs-2">

                        </div>
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px" onclick="createNewProduct()">Save Changes</button>
                            <button type="button" class="btn btn-primary pull-right" onclick="$('#createProductModal').modal('hide')">Cancel</button>

                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="createRateModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Add New Rate</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Rate ID</label>
                        <input type="text" class="form-control noSpacesInput" id="newRate_rateID" placeholder="Rate ID" style="text-transform: uppercase" maxlength="255">
                    </div>
                    <div class="form-group">
                        <label>Rate Name</label>
                        <input type="text" class="form-control" id="newRate_rateName" placeholder="Rate Name" maxlength="255">
                    </div>
                    <div class="form-group">
                        <label>Rating Basis</label>
                        <select class="form-control" id="newRate_ratingBasis">
                            <option value="invalid">Select Rating Basis</option>
                            <g:each var="ratingBasis" in="${ratingBasisResults}">
                                <option value="${ratingBasis.basisID}">${ratingBasis.description}</option>
                            </g:each>
                        </select>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-4">
                        </div>
                        <div class="col-xs-2">

                        </div>
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px" onclick="createNewRate()">Save Changes</button>
                            <button type="button" class="btn btn-primary pull-right" onclick="$('#createRateModal').modal('hide')">Cancel</button>

                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="createRatingBasisModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Add New Rating Basis</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Rating Basis ID</label>
                        <input type="text" class="form-control noSpacesInput" id="newRatingBasis_ratingBasisID" placeholder="Rating Basis ID" style="text-transform: uppercase" maxlength="255">
                    </div>
                    <div class="form-group">
                        <label>Rating Basis Description</label>
                        <input type="text" class="form-control" id="newRatingBasis_ratingBasisName" placeholder="Rating Basis Name" maxlength="255">
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-4">
                        </div>
                        <div class="col-xs-2">

                        </div>
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px" onclick="createNewRatingBasis()">Save Changes</button>
                            <button type="button" class="btn btn-primary pull-right" onclick="$('#createRatingBasisModal').modal('hide')">Cancel</button>

                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="createQuestionModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Add Question</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Question ID</label>
                        <input type="text" class="form-control noSpacesInput" id="newQuestion_questionID" placeholder="Question ID" style="text-transform: uppercase" maxlength="255">
                    </div>
                    <div class="form-group">
                        <label>Question Text</label>
                        <input type="text" class="form-control" id="newQuestion_questionText" placeholder="Question being asked..." maxlength="255">
                    </div>
                    <div class="form-group">
                        <select class="form-control" id="newQuestion_questionCategory">
                            <option value="invalid">Question Category</option>
                            <g:each var="qCategory" in="${questionCategoryResults}">
                                <option value="${qCategory.categoryCode}">${qCategory.categoryName}</option>
                            </g:each>
                        </select>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-4">
                        </div>
                        <div class="col-xs-2">

                        </div>
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px" onclick="createNewQuestion()">Save Changes</button>
                            <button type="button" class="btn btn-primary pull-right" onclick="$('#createQuestionModal').modal('hide')">Cancel</button>

                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="createQuestionCategoryModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Add Question Category</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Category ID</label>
                        <input type="text" class="form-control noSpacesInput" id="newQuestionCategory_categoryID" placeholder="Category ID" style="text-transform: uppercase" maxlength="255">
                    </div>
                    <div class="form-group">
                        <label>Category Name</label>
                        <input type="text" class="form-control" id="newQuestionCategory_categoryName" placeholder="Category Name" maxlength="255">
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-4">
                        </div>
                        <div class="col-xs-2">

                        </div>
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px" onclick="createNewQuestionCategory()">Save Changes</button>
                            <button type="button" class="btn btn-primary pull-right" onclick="$('.modal').modal('hide')">Cancel</button>

                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="editQuestionCategoryModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Edit Question Category</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Category ID</label>
                        <input type="text" class="form-control noSpacesInput" id="editQuestionCategory_categoryID" placeholder="Category ID" style="text-transform: uppercase" maxlength="255">
                    </div>
                    <div class="form-group">
                        <label>Category Name</label>
                        <input type="text" class="form-control" id="editQuestionCategory_categoryName" placeholder="Category Name" maxlength="255">
                        <input type="text" id="editQuestionCategory_id" style="display:none" >
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-4">
                        </div>
                        <div class="col-xs-2">

                        </div>
                        <div class="col-xs-6">
                            <button type="submit" class="btn btn-primary pull-right" style="margin-left: 10px" onclick="saveQuestionCategoryChanges()">Save Changes</button>
                            <button type="button" class="btn btn-primary pull-right" onclick="$('.modal').modal('hide')">Cancel</button>

                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
</g:if>

</body>