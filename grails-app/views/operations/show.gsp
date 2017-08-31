
<%@ page import="portal.Operations" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'operations.label', default: 'Operations')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-operations" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-operations" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list operations">
			
				<g:if test="${operationsInstance?.operationID}">
				<li class="fieldcontain">
					<span id="operationID-label" class="property-label"><g:message code="operations.operationID.label" default="Operation ID" /></span>
					
						<span class="property-value" aria-labelledby="operationID-label"><g:fieldValue bean="${operationsInstance}" field="operationID"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${operationsInstance?.description}">
				<li class="fieldcontain">
					<span id="description-label" class="property-label"><g:message code="operations.description.label" default="Description" /></span>
					
						<span class="property-value" aria-labelledby="description-label"><g:fieldValue bean="${operationsInstance}" field="description"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${operationsInstance?.coverages}">
				<li class="fieldcontain">
					<span id="coverages-label" class="property-label"><g:message code="operations.coverages.label" default="Coverages" /></span>
					
						<span class="property-value" aria-labelledby="coverages-label"><g:fieldValue bean="${operationsInstance}" field="coverages"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form url="[resource:operationsInstance, action:'delete']" method="DELETE">
				<fieldset class="buttons">
					<g:link class="edit" action="edit" resource="${operationsInstance}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
