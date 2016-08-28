package portal

class Products {

    String code
    String name
    String companyCode
    String coverageCode

    static constraints = {
        code(unique:true)
        name(unique:true)
        companyCode(nullable: true)// temporary, until we get company codes
        coverageCode(nullable: true)// temporary, until we get coverage codes

    }
}
