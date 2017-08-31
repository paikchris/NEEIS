//IMPORT HTML AND QUESTIONS FOR CHOSEN RISK TYPE. TEMPLATES ARE LOCATED IN /views/forms/.
// IF TEMPLATE IS NOT IMPORTING CORRECTLY MAKE SURE TO ADD NECESSARY METHOD IN THE FORMS CONTROLLER


var closeButton = "<button type='button' class='close' aria-label='Close'>" +
    "<span aria-hidden='true'>&times;</span></button>"



function importQuestionsForRisk(riskTypeID){
    //GET HTML FOR EACH MAJOR PANEL

    var tempDiv = $("<div></div>").load("./../forms/film", function () {
        //GET HTML FOR EACH MAJOR PANEL
        if( $(this).find('#coverageDatesPanelBody').length > 0){
            $('#coverageDatesPanelBody').html( $(this).find('#coverageDatesPanelBody').html() )

            datePickerInit()
            maskMoneyInit()
            showStep(2)
        }
    });
}
function getQuestionObjectByID(qID){
    for(var i=0;i<questions.length;i++){
        if(questions[i].questionID != null){
            if(questions[i].questionID === qID){
                return questions[i]
            }
        }
    }
}

function getQuestionHTML(qID, options){
    var question = getQuestionObjectByID(qID)


    var questionText = (typeof options.questionText === 'undefined') ? question.questionText : options.questionText

    //DIV CONTAINER
    var gridSize = (typeof options.gridSize === 'undefined') ? question.gridSize : options.gridSize
    var gridColumns = (typeof options.gridColumns === 'undefined') ? question.gridColumns : options.gridColumns
    var containerClass = (typeof options.containerClass === 'undefined') ? question.containerClass : options.containerClass
    var containerDataAttr = (typeof options.containerDataAttr === 'undefined') ? question.containerDataAttr : options.containerDataAttr
    var containerStyle = (typeof options.containerStyle === 'undefined') ? question.containerStyle : options.containerStyle

    //FORM GROUP
    var formGroupClass = (typeof options.formGroupClass === 'undefined') ? question.formGroupClass : options.formGroupClass
    var formGroupStyle = (typeof options.formGroupStyle === 'undefined') ? question.formGroupStyle : options.formGroupStyle
    var formGroupDataAttr = (typeof options.formGroupDataAttr === 'undefined') ? question.formGroupDataAttr : options.formGroupDataAttr

    //INPUT
    var inputType = (typeof options.inputType === 'undefined') ? question.inputType : options.inputType
    var inputClass = (typeof options.inputClass === 'undefined') ? question.inputClass : options.inputClass
    var inputDataAttr = (typeof options.inputDataAttr === 'undefined') ? question.inputDataAttr : options.inputDataAttr
    var inputStyle = (typeof options.inputStyle === 'undefined') ? question.inputStyle : options.inputStyle
    var required = (typeof options.required === 'undefined' || options.required === false) ? '' : "required"
    var disabled = (typeof options.disabled === 'undefined' || options.disabled === false) ? '' : "disabled"


    //ICON
    var faIconLeft = (typeof options.faIconLeft === 'undefined') ? false : options.faIconLeft
    if(faIconLeft === false && question.faIconLeft === 'Y'){
        faIconLeft = true
    }

    var faIconRight = (typeof options.faIconRight === 'undefined') ? false : options.faIconRight
    if(faIconRight === false && question.faIconRight === 'Y'){
        faIconRight = true
    }
    var faIconClass = (typeof options.faIconClass === 'undefined') ? question.faIconClass : options.faIconClass
    var faIconStyle = (typeof options.faIconStyle === 'undefined') ? question.faIconStyle : options.faIconStyle

    var questionHTML =
        "<div class='col-" + gridSize + "-" + gridColumns + " " +
        "" + containerClass + "' " +
        "" + containerDataAttr + "" +
        "style='" + containerStyle + "'" +
        ">"

    questionHTML = questionHTML +
            //FORM GROUP
        "   <div class='form-group " + formGroupClass + "' style='" + formGroupStyle + "' " + formGroupDataAttr + "> "

    if(faIconLeft){
        questionHTML = questionHTML +
            "<i class='fa fa-" + faIconClass + "' aria-hidden='true'  style='" + faIconStyle + "'></i>"
    }

    questionHTML = questionHTML +
                //LABEL
        "       <label class='questionText'>" + questionText + "</label> "

    questionHTML = questionHTML +
                //INPUT
        "       <input class='" + inputClass + "' " +
                    "type='" + inputType + "' " +
                    inputDataAttr + " " +
                    "style='" + inputStyle + "' " +
                    "id='" + qID + "' " +
                    "> "

    if(faIconRight){
        questionHTML = questionHTML +
            "<i class='fa fa-" + faIconClass + "' aria-hidden='true'  style='" + faIconStyle + "'></i>"
    }

    questionHTML = questionHTML +
        "       </div>"
    if(options.closeButton){
        questionHTML = questionHTML + closeButton
    }

    questionHTML = questionHTML +
        "   </div>"

    console.log(questionHTML)
    return questionHTML
}


//QUESTION BUILDERS FOR DATA MANAGEMENT PAGE
function getRequiredQuestionHTML(qID){
    if(getQuestionObjectByID(qID)){
        var options = {
            gridColumns: "2",
            containerClass: "requiredQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'",
            closeButton: true,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)
        return stringHTML
    }
}
function getUWQuestionHTML(qID){
    if(getQuestionObjectByID(qID)) {

        var options = {
            gridColumns: "2",
            containerClass: "uwQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'",
            closeButton: true,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)
        return stringHTML
    }
}
function getRequiredQuestionHTML_noCloseButton(qID){
    if(getQuestionObjectByID(qID)) {

        var options = {
            gridColumns: "2",
            containerClass: "requiredQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'",
            closeButton: false,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)
        return stringHTML
    }
}
function getUWQuestionHTML_noClosebutton(qID){
    if(getQuestionObjectByID(qID)) {

        var options = {
            gridColumns: "2",
            containerClass: "uwQuestion " + qID + "",
            containerDataAttr: "data-questionid='" + qID + "' data-weight='" + getQuestionObjectByID(qID).weight + "'",
            closeButton: false,
            required: true
        }

        var stringHTML = getQuestionHTML(qID, options)
        return stringHTML
    }
}
