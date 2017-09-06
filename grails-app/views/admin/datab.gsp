<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'datab.css')}" type="text/css">
    <script src="${resource(dir: 'js/admin/', file: "data2.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "ratingHelper.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "stringUtils.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/vendor/', file: "numeral.min.js")}"></script>
    <script src="${resource(dir: 'js/vendor/', file: "math.js")}"></script>
    <script src="${resource(dir: 'js/utils/', file: "JSONHelper.js")}"></script>
    <script src="${resource(dir: 'js/newSubmissionUtils/', file: "questionHelper.js?ts=" + new Date().getTime())}"></script>
    <script src="${resource(dir: 'js/utils/', file: "multiRangePlugin.js?ts=" + new Date().getTime())}"></script>
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'multiRangePlugin.css?ts=' + new Date().getTime())}" type="text/css">

    %{--GROOVY OBJECTS TO JS OBJECTS--}%
    <script>
        var rC = ${raw(riskCategories)}
        var rT = ${raw(riskTypes)}
        var pr = ${raw(products)}
        var oT = ${raw(operations)}
        var cT = ${raw(coverages)}
        var cB = ${raw(conditionBasis)}
        var cO = ${raw(conditionOperators)}
        var qL = ${raw(questions)}
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
                    <a href="#operationsPage" id="operationsNavTab" aria-controls="operationsPage" role="tab" data-toggle="tab">Operations</a>
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

        </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="operationsPage">
                    %{--OPERATIONS SELECT--}%
                    <div class="row">
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
                            <button type="button" class="btn btn-sm btn-success" id="addNew_Operation_Button" style="margin-top:26px" disabled>
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                New Operation
                            </button>
                        </div>
                    </div>

                    %{--COVERAGES ALLOWED --}%
                    <div class="row" id="coveragesAllowedContainer">
                        <div class="col-xs-12">
                            <label class="control-label">Coverages Allowed</label>
                            %{--EACH COVERAGE OPTIONS--}%
                            <g:each var="coverage" in="${coverageResults}">
                                <div class="row coverageContainer checkboxAndHiddenDivContainer">
                                    <div class='col-xs-12 form-group checkboxContainer'>
                                        <p><input type='checkbox' class='coverageCheckbox checkboxHiddenDiv' data-covid='${coverage.coverageCode}' id='${coverage.coverageCode}_checkbox'/> ${coverage.coverageName}
                                        </p>
                                    </div>
                                    <div class="coverageQuestionsContainer hiddenContainer" style="display:none">

                                        %{--PRODUCT ALWAYS/WHEN CONDITION CONTAINER--}%
                                        <div class="row radioWithHiddenDiv_Container">
                                            <div class='col-xs-2 form-group radioWithHiddenDiv_RadioContainer'>
                                                <p><input type='radio' class='productConditionRadio radioWithHiddenDiv_Radio' name="${coverage.coverageCode}_radioGroup"
                                                          id='${coverage.coverageCode}radio_Always' value="Always" data-covid="${coverage.coverageCode}"/> Always
                                                </p>
                                            </div>
                                            <div class='col-xs-2 form-group radioWithHiddenDiv_RadioContainer'>
                                                <p><input type='radio' class='productConditionRadio radioWithHiddenDiv_Radio' name="${coverage.coverageCode}_radioGroup"
                                                          id='${coverage.coverageCode}radio_When' value="When" data-covid="${coverage.coverageCode}"/> When
                                                </p>
                                            </div>

                                            <div class="row radioWithHiddenDiv_HiddenDivContainer" style="display:none">
                                                <div class="col-xs-12 radioHiddenDiv" id="${coverage.coverageCode}_radioGroupContainer_Always">
                                                    <div class="col-xs-12 well ">
                                                        <div class="row">
                                                            <div class="col-xs-4">
                                                                <label>Product is always:</label>
                                                                <button type="button" class="btn btn-xs btn-info editProductsButton pull-right" >
                                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                                                    Edit Products
                                                                </button>
                                                            </div>
                                                            <div class="col-xs-2">

                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xs-4">
                                                                <select class="form-control productsForCoverageSelect" id="${coverage.coverageCode}_productsForCoverageSelect">
                                                                    <g:each var="product" in="${productResults.findAll{ it.coverage == coverage.coverageCode} }">
                                                                        <option value="${product.productID}">(${product.productID}) ${product.productName}</option>
                                                                    </g:each>
                                                                </select>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-xs-12 radioHiddenDiv" id="${coverage.coverageCode}_radioGroupContainer_When">
                                                    %{--PRODUCT CONDITIONS CONTAINER--}%
                                                    <div class="col-xs-12 well ">
                                                        <div class="row">
                                                            <div class="col-xs-4">
                                                                <label>Product is:</label>
                                                                <button type="button" class="btn btn-xs btn-info editProductsButton pull-right" id="" >
                                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                                                    Edit Products
                                                                </button>
                                                            </div>
                                                            <div class="col-xs-4">
                                                                <label></label>
                                                            </div>
                                                            <div class="col-xs-2">
                                                                <label></label>
                                                            </div>
                                                        </div>
                                                        <div class="productConditionsContainer">
                                                            <div class="row productConditionsRow">
                                                                <div class="col-xs-4">
                                                                    <select class="form-control productsForCoverageSelect">
                                                                        <g:each var="product" in="${productResults.findAll{ it.coverage == coverage.coverageCode} }">
                                                                            <option value="${product.productID}">(${product.productID}) ${product.productName}</option>
                                                                        </g:each>
                                                                    </select>
                                                                </div>
                                                                <div class="col-xs-1" styl>
                                                                    <h6 style="text-align: center">IF</h6>
                                                                </div>
                                                                <div class="col-xs-2">
                                                                    <select class="form-control productConditionBasis">
                                                                        <g:each var="conditionBasis" in="${conditionBasisResults}">
                                                                            <option value="${conditionBasis.conditionID}">${conditionBasis.description}</option>
                                                                        </g:each>
                                                                    </select>
                                                                </div>
                                                                <div class="col-xs-1">
                                                                    <select class="form-control productConditionOperator">
                                                                        <g:each var="conditionOperator" in="${conditionOperatorsResults}">
                                                                            <option value="${conditionOperator.conditionID}">${conditionOperator.description}</option>
                                                                        </g:each>
                                                                    </select>
                                                                </div>
                                                                <div class="col-xs-2">
                                                                    <div class="form-group">
                                                                        <input class="form-control conditionBasisValue maskMoney" type="text" placeholder="$">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xs-2">
                                                                    <button class="btn btn-sm btn-primary addProductConditionRow">
                                                                        <span>Add</span>
                                                                    </button>
                                                                    <button class="btn btn-sm btn-primary removeProductConditionRow" style="display:none">
                                                                        <span>Remove</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            %{--REQUIRED QUESTIONS CONTAINER--}%
                                            <div class="col-xs-12 well" id="${coverage.coverageCode}_RequiredQuestionsSection" style="display:none">
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <label>Required Questions for ${coverage.coverageName}</label>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <div class="col-xs-4">
                                                            <select class="form-control productConditionBasis" id="${coverage.coverageCode}_RequiredQuestionsDropdown">
                                                                <option value="invalid">Select One</option>
                                                                <g:each var="question" in="${questionResults}">
                                                                    <option value="${question.questionID}">${question.questionText} (${question.questionID})</option>
                                                                </g:each>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-2">
                                                            <button class="btn btn-sm btn-primary insertRequiredQuestionButton" data-covID="${coverage.coverageCode}">
                                                                <span>Insert</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row requiredQuestionsContainer" id="${coverage.coverageCode}_RequiredQuestionsContainer">
                                                    <div class="requiredQuestions" id="${coverage.coverageCode}_RequiredQuestions">
                                                    </div>
                                                </div>
                                            </div>
                                            %{--UW QUESTIONS CONTAINER--}%
                                            <div class="col-xs-12 well" id="${coverage.coverageCode}_UWQuestionsSection" style="display:none">
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <label>Under Writing Questions for ${coverage.coverageName}</label>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-12">
                                                        <div class="col-xs-4">
                                                            <select class="form-control productConditionBasis" id="${coverage.coverageCode}_UnderwriterQuestionsDropdown">
                                                                <option value="invalid">Select One</option>
                                                                <g:each var="question" in="${questionResults}">
                                                                    <option value="${question.questionID}">${question.questionText} (${question.questionID})</option>
                                                                </g:each>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-2">
                                                            <button class="btn btn-sm btn-primary insertUWQuestionButton" data-covID="${coverage.coverageCode}">
                                                                <span>Insert</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row underwritingQuestionsContainer" id="${coverage.coverageCode}_UnderwritingQuestionsContainer">
                                                    <div class="underwriterQuestions" id="${coverage.coverageCode}_UnderwriterQuestions">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </g:each>
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
                            <button class="btn btn-sm btn-primary" style="margin-top:26px" id="saveProductButton">
                                <span>SAVE</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-success" id="addNew_Product_Button" style="margin-top:26px" disabled>
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
                                        <input class="form-control" id="productIDInput" type="text">
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Product Name</h6>
                                        <input class="form-control" id="productNameInput" type="text">
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <h6>Coverage</h6>
                                        <select class="form-control"  id="productsPage_CoverageDropdown" required="required" >
                                            <option value="invalid" selected="selected">Select One</option>
                                            <g:each var="coverage" in="${coverageResults}">
                                                <option value="${coverage.coverageCode}">${coverage.coverageCode} - ${coverage.coverageName}</option>
                                            </g:each>
                                        </select>
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
                                        <select class="form-control"  id="productsPage_MarketCompanyDropdown" required="required" >
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
                                        <select class="form-control"  id="productsPage_RiskCompanyDropdown" required="required" >
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
                                            <div class="col-xs-4">
                                                <h6>Limit</h6>
                                            </div>
                                            <div class="col-xs-8">
                                                <h6>Description</h6>
                                            </div>
                                        </div>
                                        <div id="productPage_limitsContainer">
                                            <div class="row productPage_limitRow">
                                                <div class="col-xs-2">
                                                    <div class="form-group">
                                                        <span class="limitAmount"></span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-4">
                                                    <span class="limitDescription"></span>
                                                </div>
                                            </div>
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
                                            <div class="col-xs-2">
                                                <h6>Deductible</h6>
                                            </div>
                                            <div class="col-xs-4">
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
                                        <select class="form-control"  id="productsPage_ProductRateDropdown" required="required" >
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
                                            <select class="form-control" id="productPage_requiredQuestionsDropdown">
                                                <option value="invalid">Select One</option>
                                                <g:each var="question" in="${questionResults}">
                                                    <option value="${question.questionID}">${question.questionText} (${question.questionID})</option>
                                                </g:each>
                                            </select>
                                        </div>
                                        <div class="col-xs-2">
                                            <button class="btn btn-sm btn-primary" id="productPage_insertRequiredQuestion">
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
                                            <select class="form-control" id="productPage_uwQuestionsDropdown">
                                                <option value="invalid">Select One</option>
                                                <g:each var="question" in="${questionResults}">
                                                    <option value="${question.questionID}">${question.questionText} (${question.questionID})</option>
                                                </g:each>
                                            </select>
                                        </div>
                                        <div class="col-xs-2">
                                            <button class="btn btn-sm btn-primary" id="productPage_insertUWQuestion">
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
                                        <textarea class="form-control" cols='10' rows="10" id="productsPage_ProductTerms">

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
                        <div class="col-xs-12 formsHeader">
                            <div class="col-xs-3">
                                <h6>Form ID</h6>
                            </div>
                            <div class="col-xs-3">
                                <h6>Form Name</h6>
                            </div>
                        </div>

                        <div class="col-xs-7" id="productPageFormRowTemplate" style="display:none">
                            <div class="col-xs-12 productPageFormRow" >
                                <div class="row formRowSubContainer">
                                    <div class="col-xs-3">
                                        <span class="productPageFormID">

                                        </span>
                                    </div>
                                    <div class="col-xs-4">
                                        <span class="productPageFormName">

                                        </span>
                                    </div>
                                    <div class="col-xs-2">
                                        <button type="button" class="btn btn-xs btn-success addProductButton">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            Add Another Form
                                        </button>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="productPage_AddFormDropdownContainer" style="display:none">
                                            <div class="form-group">
                                                <select class="form-control productPage_AddFormDropdown" >
                                                    <option value="invalid">Select Form To Add</option>

                                                    <g:each var="form" in="${formResults}">
                                                        <option value="${form.formID}">${form.formID} - ${form.formName}</option>
                                                    </g:each>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type='button' class='close' aria-label='Close'>
                                    <span aria-hidden='true' style="margin-right:20px">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div class="col-xs-7" id="productPageFormsContainer">
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
                            <button class="btn btn-sm btn-primary" style="margin-top:26px" id="saveRateButton">
                                <span>SAVE</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-success" id="addNew_Rate_Button" style="margin-top:26px" disabled>
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                New Rate
                            </button>
                        </div>
                    </div>

                    %{--RATING BASIS DETAILS --}%
                    <div class="row" id="ratesDetailsContainer">
                        <div class="col-xs-6" id="ratesPageLeftColumn">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label class="control-label">Rate Details</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <h6>RateID</h6>
                                        <input class="form-control" id="rateIDInput" type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <h6>Rate Description</h6>
                                        <input class="form-control" id="rateDescriptionInput" type="text">
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
                                                    <select class="form-control productRatingBasis" id="ratePage_RatingBasisDropdown" >
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
                                                            <input class="form-control" id="ratesPage_RateValueInput" type="text">
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <div class="form-group">
                                                            <h6>Min Premium</h6>
                                                            <input class="form-control" id="ratesPage_MinPremiumInput" type="text">
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
                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <h6>Rate</h6>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6">
                                                        <h6>Limit Description (Must Match Exactly)</h6>
                                                    </div>
                                                    <div class="col-xs-2">
                                                        <div class="form-group">
                                                            <h6>Min Premium</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" id="ratesPage_limitRatingRowsContainer">
                                                    <div class="col-xs-12 limitRatingRow" >
                                                        <div class="col-xs-2">
                                                            <div class="form-group">
                                                                <input class="form-control ratesPage_LimitRateValueInput"  type="text">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <div class="form-group">
                                                                <input class="form-control ratesPage_LimitDescriptionInput" type="text">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-2">
                                                            <div class="form-group">
                                                                <input class="form-control ratesPage_LimitMinPremiumInput"  type="text">
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
                            <button class="btn btn-sm btn-primary" style="margin-top:26px" id="saveRatingBasisButton">
                                <span>SAVE</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-success" id="addNew_RatingBasis_Button" style="margin-top:26px" disabled>
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
                                        <input class="form-control" id="ratingBasisCodeInput" type="text">
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Rating Basis Description</h6>
                                        <input class="form-control" id="ratingBasisDescriptionInput" type="text">
                                    </div>
                                </div>
                                <div id="ratingBasisPage_RatingBasisQuestionContainer">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <h6>Question To Rate Against</h6>
                                        </div>
                                    </div>
                                    <div class="col-xs-12">
                                        <div class="row" id="questionPreviewContainer">
                                            <div class="col-xs-6">
                                                <select class="form-control" id="questionToRateDropdown">
                                                    <option value="invalid">Select One To Add</option>
                                                    <g:each var="question" in="${questionResults.findAll{it.questionID != null && it.questionID.trim().size() > 0} }">
                                                        <option value="${question.questionID}">${question.questionText} (${question.questionID})</option>
                                                    </g:each>
                                                </select>
                                            </div>
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
                    %{--QUESTION SELECT--}%
                    <div class="row">
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label class="control-label">Questions</label>
                                <select class="form-control productRatingBasis" id="questionPage_QuestionDropdown">
                                    <option value="invalid">Select One</option>
                                    <g:each var="question" in="${questionResults}">
                                        <option value="${question.questionID}">[${question.questionID}] ${question.questionText}</option>
                                    </g:each>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-sm btn-primary" style="margin-top:26px" id="saveQuestionButton">
                                <span>SAVE</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-success" id="addNew_Question_Button" style="margin-top:26px" disabled>
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                New Question
                            </button>
                        </div>
                    </div>

                    %{--QUESTION DETAILS --}%
                    <div class="row" id="questionBasicDetailsContainer">
                        <div class="col-xs-6" id="questionPageLeftColumn">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label class="control-label">Question Details</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-2">
                                    <div class="form-group">
                                        <h6>Question ID</h6>
                                        <input class="form-control" id="questionPage_QuestionIDInput" type="text">
                                    </div>
                                </div>
                                <div class="col-xs-2">
                                    <div class="form-group">
                                        <h6>Weight (0-1000)</h6>
                                        <input class="form-control" id="questionPage_WeightInput" type="text">
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <h6>Input Type</h6>
                                        <select class="form-control" id="questionPage_InputTypeDropdown">
                                            <option value="invalid">Select Input Type</option>
                                            <option value="text">Text</option>
                                            <option value="dropdown">Dropdown</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <h6>Question Text</h6>
                                        <input class="form-control" id="questionPage_QuestionTextInput" type="text" placeholder="The question being asked to the User">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6" id="questionPageRightColumn">

                        </div>

                    </div>
                    <br>
                    %{--TEXT QUESTION OPTIONS --}%
                    <div class="row" id="questionPage_TextOptionsContainer">
                        <div class="col-xs-12">
                            <div class="well">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <label>Text Options</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

        </div>
        </div>
    </div>

</g:if>

</body>