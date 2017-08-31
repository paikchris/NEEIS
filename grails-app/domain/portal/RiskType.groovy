package portal

class RiskType {

    String riskTypeCode
    String riskTypeCategory
    String riskTypeName
    String bindingAuthority
    String coverages
    String subCategoryFlag
    String parentSubCategory
    String parentSubCategoryCode
    String products
    String productsAvailable
    String productConditions
    String activeFlag

    String noticeLabel
    String noticeText

    String productQuestions //LIST OF ALL QUESTIONS THAT AFFECT WHICH PRODUCTS ARE AVAILABLE
    String productQuestionsRequired //LIST OF ALL REQUIRED QUESTIONS BEFORE PRODUCTS CAN BE AVAILABLE

    String premiumQuestions //LIST OF ALL QUESTIONS THAT AFFECT PREMIUM RATING
    String premiumQuestionsRequired //LIST OF ALL REQUIRED QUESTIONS BEFORE PREMIUM CAN BE RATED

    String questionTemplateID //NAME OF GSP FILE WHERE QUESTIONS ARE LOCATED

    static constraints = {
        riskTypeCode(unique:true)
        riskTypeCategory(nullable: true)
        productConditions(nullable: true)
        bindingAuthority(nullable: true)// temporary, until we get coverage codes
        coverages(nullable:true)
        subCategoryFlag(nullable:true)
        parentSubCategory(nullable:true)
        parentSubCategoryCode nullable: true
        products(nullable:true)
        products(maxSize: 300)
        productsAvailable(nullable: true)
        activeFlag nullable: true,  maxSize: 1, inList: ['Y','N', null]
        noticeLabel nullable: true, maxSize:255
        noticeText nullable:true, maxSize: 25

        productQuestions nullable:true
        productQuestionsRequired nullable:true

        premiumQuestions nullable: true
        premiumQuestionsRequired nullable:true

        questionTemplateID nullable: true
    }
}
