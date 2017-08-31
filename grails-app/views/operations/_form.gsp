<%@ page import="portal.Operations" %>



<div class="fieldcontain ${hasErrors(bean: operationsInstance, field: 'operationID', 'error')} required">
	<label for="operationID">
		<g:message code="operations.operationID.label" default="Operation ID" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="operationID" maxlength="3" required="" value="${operationsInstance?.operationID}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: operationsInstance, field: 'description', 'error')} required">
	<label for="description">
		<g:message code="operations.description.label" default="Description" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="description" maxlength="55" required="" value="${operationsInstance?.description}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: operationsInstance, field: 'coverages', 'error')} required">
	<label for="coverages">
		<g:message code="operations.coverages.label" default="Coverages" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="coverages" required="" value="${operationsInstance?.coverages}"/>

</div>

