package portal

class Questions {

    String htmlID
    String htmlClass
    String htmlInputType
    String htmlInputName

    //checkboxes and radio
    String htmlInputValue
    String htmlCheckboxRadioText
    String defaultChecked

    String dropdownOptionsValText

    String htmlDataReviewName
    String htmlPlaceholder

    String questionText

    String htmlStyle
    String required
    String attachments

    String filmWithoutCast
    String filmWithCast
    String filmWithWC
    String filmWithoutWC
    String specialEvents
    String entertainer
    String office
    String shellCorp
    String venueTenantUser
    String ancillaryEntertainmentRisk

    String category
    String questionGroup
    Integer weight





    static constraints = {
        htmlID(unique:true)

        htmlClass nullable:true
        htmlInputType nullable:true
        htmlInputName nullable:true
        htmlInputValue nullable:true
        htmlCheckboxRadioText nullable:true
        htmlDataReviewName nullable:true
        htmlPlaceholder nullable:true
        questionText nullable:true
        defaultChecked nullable:true
        htmlStyle nullable:true
        required nullable:true
        attachments nullable:true
        dropdownOptionsValText nullable:true
        weight nullable:true
        questionGroup nullable:true

    }
}