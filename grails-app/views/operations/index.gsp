
<%@ page import="portal.Operations" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'operations.label', default: 'Operations')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-operations" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-operations" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>
					
						<g:sortableColumn property="operationID" title="${message(code: 'operations.operationID.label', default: 'Operation ID')}" />
					
						<g:sortableColumn property="description" title="${message(code: 'operations.description.label', default: 'Description')}" />
					
						<g:sortableColumn property="coverages" title="${message(code: 'operations.coverages.label', default: 'Coverages')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${operationsInstanceList}" status="i" var="operationsInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${operationsInstance.id}">${fieldValue(bean: operationsInstance, field: "operationID")}</g:link></td>
					
						<td>${fieldValue(bean: operationsInstance, field: "description")}</td>
					
						<td>${fieldValue(bean: operationsInstance, field: "coverages")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${operationsInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
