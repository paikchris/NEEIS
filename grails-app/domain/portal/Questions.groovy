package portal


//MIGHT BE DELETED AND REPLACED WITH UWQUESTIONS
class Questions {

    String questionID
    String questionText
    Integer weight
    String hiddenFlag


    //CONTAINER
    String gridSize
    String gridColumns
    String containerClass
    String containerDataAttr
    String containerStyle
    String questionType

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
    String attachments
    String disabled
    String maxLength

    //ICON
    String faIconLeft
    String faIconRight
    String faIconClass
    String faIconStyle

    //INPUT GROUP ADD ONS
    String inputAddOnLeft
    String inputAddOnRight
    String inputButtonText
    String inputAddOnText

    //HIDDEN QUESTION STUFF
    String hiddenQuestionTriggerIDMap

    //MULTI COLUMN INPUT STUFF
    String multiColumnMap


    String htmlInputName

    //checkboxes and radio
    String htmlInputValue
    String htmlCheckboxRadioText
    String htmlCheckboxRadioValText
    String defaultChecked

    //DROPDOWNS
    String dropdownOptionsValText

    String htmlDataReviewName
    String htmlPlaceholder


    String category
    String questionGroup
    String questionHTML



    static constraints = {
        questionID(unique:true)
        questionText nullable:true
        weight nullable:false
        hiddenFlag nullable:false, inList: ['Y','N']
        questionType nullable:true

        //CONTAINER
        gridSize nullable:false, inList: ["xs", "sm", "md", "lg"]
        gridColumns nullable:false, inList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        containerClass nullable:true
        containerDataAttr nullable:true
        containerStyle nullable:true

        //FORM GROUP
        formGroupClass nullable:true
        formGroupStyle nullable:true
        formGroupDataAttr nullable:true

        //INPUT
        inputClass nullable:false
        inputType nullable:false
        inputDataAttr nullable:true
        inputStyle nullable:true
        required nullable: false, inList: ['Y','N']
        attachments nullable:false, inList: ['Y','N']
        disabled nullable: false, inList: ['Y','N']
        maxLength nullable: true

        //INPUT GROUP STUFF
        inputAddOnLeft nullable:false, inList: ['Y','N']
        inputAddOnRight nullable:false, inList: ['Y','N']
        inputButtonText nullable:true
        inputAddOnText nullable:true

        //HIDDEN QUESTION STUFF
        hiddenQuestionTriggerIDMap nullable: true //MAPS A INPUT VALUE TO THE QUESTION ID OR IDS IT WILL DISPLAY

        //MULTI COLUMN INPUT STUFF
        multiColumnMap nullable:true

        //ICON
        faIconLeft nullable:false, inList: ['Y','N']
        faIconRight nullable:false, inList: ['Y','N']
        faIconClass nullable:true
        faIconStyle nullable:true


        htmlInputName nullable:true
        htmlInputValue nullable:true
        htmlCheckboxRadioText nullable:true
        htmlCheckboxRadioValText nullable:true
        htmlDataReviewName nullable:true
        htmlPlaceholder nullable:true
        questionHTML nullable: true
        defaultChecked nullable:true
        dropdownOptionsValText nullable:true
        questionGroup nullable:true

    }

    static mapping = {
        weight defaultValue: 0
        hiddenFlag defaultValue: "'N'"

        //CONTAINER
        gridSize defaultValue:"'xs'"
        gridColumns defaultValue:"'3'"
        containerClass defaultValue: ""
        questionType defaultValue:"'text'"

        //INPUT
        inputType defaultValue:'text'
        required defaultValue: "'N'"
        disabled defaultValue: "'N'"
        attachments defaultValue: "'N'"
        htmlPlaceholder defaultValue: ''
        maxLength defaultValue: ''

        //INPUT GROUP STUFF
        inputAddOnLeft  defaultValue: "'N'"
        inputAddOnRight defaultValue: "'N'"
        inputButtonText defaultValue: ""
        inputAddOnText defaultValue: ""

        //HIDDEN QUESTION STUFF
        hiddenQuestionTriggerIDMap type:'text'

        //MULTI COLUMN INPUT STUFF
        multiColumnMap type:'text'

        //ICON
        faIconLeft defaultValue: "'N'"
        faIconRight defaultValue: "'N'"

        questionHTML type: 'text'
        htmlCheckboxRadioValText defaultValue: '', type:'text'
        dropdownOptionsValText type:'text'

    }
}