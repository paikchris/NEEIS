var submissionMap = {
    userCompany: $('#userDetails-company').html(),
    accountExec: "jason",
    accountExecName: "Jason DeBolt",
    attention: $('#userDetails-firstName').html() + " " + $('#userDetails-lastName').html(),
    aimContactID: $('#userDetails-aimContactID').html(),
    coverageCodes: "",
    riskChosen: getRiskTypeChosen(),
    riskCategory: getRiskCategoryChosen(),
    premiumAllLOBTotal: $('#premiumAllLOBTotal').html(),
    productID: "CGLSE00",


// QUESTIONS ON NEW SUBMISSION GSP
    premiumExpectedInputGroup: $("#premiumExpectedInputGroup").val(),
    proposedEffectiveDate: $("#proposedEffectiveDate").val(),
    proposedExpirationDate: $("#proposedExpirationDate").val(),
    proposedTermLength: parseInt($("#proposedTermLength").val().split(" ")),
    howManyDaysIsTheEvent: $("#howManyDaysIsTheEvent").val(),
    estimatedTotalAttendance: $("#estimatedTotalAttendance").val(),
    largestNumberAttendees: $("#largestNumberAttendees").val(),
    selectState: $("#selectState").val(),
    separatePolicy: $("#separatePolicy").val(),
    numberOfExhibitorsGroup: $("#numberOfExhibitorsGroup").val(),

    namedInsured: $("#namedInsured").val(),
    phoneNumber: $('#phoneNumber').val(),
    namedInsuredEmail: $('#namedInsuredEmail').val(),
    website: $('#website').val(),
    streetNameMailing: $('#googleAutoAddress').val(),
    cityMailing: $('#cityMailing').val(),
    stateMailing: $('#stateMailing').val(),
    zipCodeMailing: $('#zipCodeMailing').val(),
    numBuildings: $("#numBuildings").val(),
    habitationalUnits: $("#habitationalUnits").val(),
    commSqFt: $("#commSqFt").val(),
    interestSelect: $("#interestSelect").val(),
    FEINSSN: $('#FEINSSN').val(),
    businessStructure: $('#businessStructureSelect').val(),
    NCCI: $('#NCCI').val(),
    SIC: $('#SIC').val(),


// QUESTIONS ON SPECIAL EVENTS GSP
    nameOfPrincipal: $('#nameOfPrincipal').val()
    principalEmail: $('#principalEmail').val()
    principalPhone: $('#principalPhone').val()
    insuredContact: $('#insuredContact').val()
    insuredContactEmail: $('#insuredContactEmail').val()
    insuredContactPhone: $('#insuredContactPhone').val()
    whereEstablished: $('#whereEstablished').val()
    dbaName: $('#dbaName').val()
    numberOfYearsOfExperience: $('#numberOfYearsOfExperience').val()
    stateOfHireAndPayroll: $('#stateOfHireAndPayroll').val()
    namesOfficerTitleOwnership: $('#namesOfficerTitleOwnership').val()
    officersExcludedUnderWC: $('#officersExcludedUnderWC').val()
    totalNumEmployees: $('#totalNumEmployees').val()
    annualReceipts: $('#annualReceipts').val()
    annualPayroll: $('#annualPayroll').val()
    listOfPriorLosses: $('#listOfPriorLosses').val()
    costVehicles: $('#costVehicles').val()
    insuredCancelledExplain: $('#insuredCancelledExplain').val()
    descriptionOvernight: $('#descriptionOvernight').val()
    alcoholSales: $('#alcoholSales').val()
    descriptionOvernight: $('#descriptionOvernight').val()
    equipmentLimit: $('#equipmentLimit').val()
    equipmentSchedule: $('#equipmentSchedule').val()
    equipmentLocation: $('#equipmentLocation').val()
    equipmentSecurity: $('#equipmentSecurity').val()
    equipmentInventory: $('#equipmentInventory').val()
    brokerFeeInput: $('#brokerFeeInput').val()

// PREMIUM COSTS
    commercialGeneralLiabilityPremiumCost: $('#commercialGeneralLiabilityPremiumCost').html()
    alcoholSalePremiumCost: $('#alcoholSalePremiumCost').html()
    policyFeePremiumCost: $('#policyFeePremiumCost').html()
    totalSalePremiumCost: $('#totalSalePremiumCost').html()

// CHECK BOXES FOR HAZARDS
    pyrotechnicsCheckbox: $('#pyrotechnicsCheckbox').val()
    stuntsHazardousCheckbox: $('#stuntsHazardousCheckbox').val()


// CHECK BOXES Y/N
    promoter: $('input[name="promoter"]').val()
    workCompCoverageRequested: $('input[name="workCompCoverageRequested?"]').val()
    autoLiability: $('input[name="autoLiability"]').val()
    requireOwnedAutoCoverage: $('input[name="requireOwnedAutoCoverage"]').val()
    signingWaivers: $('input[name="signingWaivers"]').val()
    insuranceCancelled: $('input[name="insuranceCancelled"]').val()
    overnight: $('input[name="overnight"]').val()
    overnightChildren: $('input[name="overnightChildren"]').val()
    commercialGeneralLiabilityRequested: $('input[name="commercialGeneralLiabilityRequested"]').val()
    umbrellaLimitRequested: $('input[name="umbrellaLimitRequested"]').val()
    blanketInsured: $('input[name="blanketInsured"]').val()
    waiverSubrogation: $('input[name="waiverSubrogation"]').val()
    willAlcoholBeServed: $('input[name="willAlcoholBeServed"]').val()
    equipmentOwnedRented: $('input[name="equipmentOwnedRented"]').val()
    equipmentOR: $('input[name="equipmentOR"]').val()
    premisesResponsible: $('input[name="premisesResponsible"]').val()
    insuredContactPhone: $('input[name="equipmentOwnedRented"]').val()

    //BUILD LOB, LIMITS, DEDUCTS STRING
    //lobString = "Miscellaneous Rented Equipment ;&;$234,234 ;&;$2,500;&&;Extra Expense ;&;$234,234 ;&;$2,500;&&;Props, Sets & Wardrobe ;&;$234,234 ;&;$2,500;&&;Third Party Prop Damage Liab ;&;$234,234 ;&;$2,500;&&;"
    //limitsString = "$234,234\tEPKG:Miscellaneous Rented Equipment\n$234,234\tEPKG:Extra Expense\n$234,234\tEPKG:Props, Sets &amp; Wardrobe\n$234,234\tEPKG:Third Party Prop Damage Liab\n",
    //deductsString = "$2,500\tEPKG:Miscellaneous Rented Equipment\n$2,500\tEPKG:Extra Expense\n$2,500\tEPKG:Props, Sets &amp; Wardrobe\n$2,500\tEPKG:Third Party Prop Damage Liab\n",

submissionMap.lobString = ""
submissionMap.limitsString = ""
submissionMap.deductsString = ""

// TABLE WORKCOMP
    $('div#reviewLimitsDeducts div.tableWC div.lobRow').each(function() {
    submissionMap.lobString = submissionMap.lobString + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
        "" + "\n";
    submissionMap.limitsString = submissionMap.limitsString + $(this).find('.limitColumn').children().first().html() + "\tWC:" + $(this).find('.coverageColumn').children().first().html() + "\n";
    submissionMap.deductsString = submissionMap.deductsString + "" + "\tWC:" + $(this).find('.coverageColumn').children().first().html() + "\n";
});
// TABLE HIRED AND NON OWNED AUTO LIABILITY
$('div#reviewLimitsDeducts div.tableNOAL div.lobRow').each(function() {
    submissionMap.lobString = submissionMap.lobString + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
        "" + "\n";
    submissionMap.limitsString = submissionMap.limitsString + $(this).find('.limitColumn').children().first().html() + "\tNOAL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
    submissionMap.deductsString = submissionMap.deductsString + "" + "\tNOAL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
});
// TABLE COMMERCIAL GENERAL LIABILITY (CGL)
$('div#reviewLimitsDeducts div.tableCGL div.lobRow').each(function() {
    submissionMap.lobString = submissionMap.lobString + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
        "" + "\n";
    submissionMap.limitsString = submissionMap.limitsString + $(this).find('.limitColumn').children().first().html() + "\tCGL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
    submissionMap.deductsString = submissionMap.deductsString + "" + "\tCGL:" + $(this).find('.coverageColumn').children().first().html() + "\n";
});
// TABLE UMBRELLA LIABILITY
$('div#reviewLimitsDeducts div.tableCUMB div.lobRow').each(function() {
    submissionMap.lobString = submissionMap.lobString + $(this).find('.coverageColumn').children().first().html() + " \t" + $(this).find('.limitColumn').children().first().html() + " \t" +
        "" + "\n";
    submissionMap.limitsString = submissionMap.limitsString + $(this).find('.limitColumn').children().first().html() + "\tCUMB:" + $(this).find('.coverageColumn').children().first().html() + "\n";
    submissionMap.deductsString = submissionMap.deductsString + "" + "\tCUMB:" + $(this).find('.coverageColumn').children().first().html() + "\n";
});
