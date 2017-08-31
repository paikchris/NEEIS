package portal

class RiskCategory {

    String riskCategoryCode
    String riskCategoryName
    String description
    String imgFilePath
    String activeFlag
    Integer cardColumns


    static constraints = {
        riskCategoryName(unique:true)
        riskCategoryCode(unique:true)
        description(nullable:true)
        imgFilePath(nullable:true)
        description(maxSize: 600)
        activeFlag nullable: true, maxSize: 1, inList: ['Y','N', null]
        cardColumns nullable: true, range: 1..12
    }

    def getDisplayOrder(){
        def order = [
                "riskCategoryName",
                "riskCategoryCode",
                "description"
        ]
    }

    def getDisplayName(column){
        def names = [
                "riskCategoryName": "Risk Category Name",
                "riskCategoryCode": "Risk Category Code",
                "description": "Description"
        ]

        return names[column]
    }

    def getInputHTML(column){
        def inputHTML = [
                "riskCategoryName": '<input type="text" class="form-control" ' +
                        'data-table="' + this.getDomainClass().getShortName() + '"' +
                        'data-column="' + column + ' value="">',
                "riskCategoryCode": '<input type="text" class="form-control" ' +
                        'data-table="' + this.getDomainClass().getShortName() + '"' +
                        'data-column="' + column + ' value="">',
                "description": '<textarea class="form-control" ' +
                        'rows="10" ' +
                        'data-table="' + this.getDomainClass().getShortName() + '"' +
                        'data-column="' + column + ' value=""> </textarea>',
        ]

        return inputHTML[column]
    }

}
