package portal

class RiskCategory {

    String riskCategoryCode
    String riskCategoryName
    String description
    String imgFilePath


    static constraints = {
        riskCategoryName(unique:true)
        riskCategoryCode(unique:true)
        description(nullable:true)
        imgFilePath(nullable:true)
        description(maxSize: 600)


    }
}
