package portal

class RiskType {

    String riskTypeCode
    String riskTypeCategory
    String riskTypeName
    String bindingAuthority
    String coverages

    static constraints = {
        riskTypeCode(unique:true)
        riskTypeName(unique:true)
        riskTypeCategory(nullable: true)
        riskTypeCode(nullable: true)
        bindingAuthority(nullable: true)// temporary, until we get coverage codes
        coverages(nullable:true)


    }
}
