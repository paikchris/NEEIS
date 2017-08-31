package portal


//MIGHT BE DELETED AND REPLACED WITH UWQUESTIONS
class Questions {

    String questionID
    String questionText
    Integer weight


    //CONTAINER
    String gridSize
    String gridColumns
    String containerClass
    String containerDataAttr
    String containerStyle

    //FORM GROUP
    String formGroupClass
    String formGroupStyle
    String formGroupDataAttr

    //INPUT
    String inputClass
    String inputType
    String inputDataAttr
    String inputStyle
    String required
    String disabled

    //ICON
    String faIconLeft
    String faIconRight
    String faIconClass
    String faIconStyle

    String htmlInputName

    //checkboxes and radio
    String htmlInputValue
    String htmlCheckboxRadioText
    String defaultChecked

    String dropdownOptionsValText

    String htmlDataReviewName
    String htmlPlaceholder

    String attachments
    String category
    String questionGroup
    String questionHTML



    static constraints = {
        questionID(unique:true)
        questionText nullable:true
        weight nullable:false

        //CONTAINER
        gridSize nullable:false, inList: ["xs", "sm", "md", "lg"]
        gridColumns nullable:false, inList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        containerClass nullable:false
        containerDataAttr nullable:false
        containerStyle nullable:false

        //FORM GROUP
        formGroupClass nullable:false
        formGroupStyle nullable:false
        formGroupDataAttr nullable:false

        //INPUT
        inputClass nullable:false
        inputType nullable:false
        inputDataAttr nullable:false
        inputStyle nullable:false
        required nullable: false, inList: ['Y','N']
        disabled nullable: false, inList: ['Y','N']

        //ICON
        faIconLeft nullable:false, inList: ['Y','N']
        faIconRight nullable:false, inList: ['Y','N']
        faIconClass nullable:false
        faIconStyle nullable:false


        htmlInputName nullable:true
        htmlInputValue nullable:true
        htmlCheckboxRadioText nullable:true
        htmlDataReviewName nullable:true
        htmlPlaceholder nullable:true
        questionHTML nullable: true
        defaultChecked nullable:true
        required nullable:true
        attachments nullable:true
        dropdownOptionsValText nullable:true
        questionGroup nullable:true

    }

    static mapping = {
        weight defaultValue: 0

        //CONTAINER
        gridSize defaultValue:"'xs'"
        gridColumns defaultValue:"'3'"

        //INPUT
        inputType defaultValue:'text'
        required defaultValue: "'N'"
        disabled defaultValue: "'N'"

        //ICON
        faIconLeft defaultValue: "'N'"
        faIconRight defaultValue: "'N'"

        questionHTML type: 'text'
    }
}