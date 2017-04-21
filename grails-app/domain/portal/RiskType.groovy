package portal

class RiskType {

    String riskTypeCode
    String riskTypeCategory
    String riskTypeName
    String bindingAuthority
    String coverages
    String subCategoryFlag
    String parentSubCategory
    String products
    String productsAvailable

    static constraints = {
        riskTypeCode(unique:true)
        riskTypeCategory(nullable: true)
        riskTypeCode(nullable: true)
        bindingAuthority(nullable: true)// temporary, until we get coverage codes
        coverages(nullable:true)
        subCategoryFlag(nullable:true)
        parentSubCategory(nullable:true)
        products(nullable:true)
        products(maxSize: 9000)
        productsAvailable(nullable: true)
    }
}
