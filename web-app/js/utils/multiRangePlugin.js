//MULTIRANGE PLUGIN
//Requires only a div with a class name
// <div class="multiRangeContainer money" >
//     </div>
//OR
// <div class="multiRangeContainer days" >
//     </div>
//OR
var numeralPlugin = numeral(1000)
var headerRowHTML =
    "<div class='headerRow col-xs-12' style='margin-bottom:-4px; font-size:11px; font-weight:300;'>" +
    "   <div class='row'>" +
    "       <div class='col-xs-3'>" +
    "           <span>Premium</span>" +
    "       </div> " +
    "       <div class='col-xs-3'>" +
    "           <span>From</span>" +
    "      </div> " +
    "       <div class='col-xs-3'> " +
    "           <span>To</span>" +
    "      </div> " +
    "       <div class='col-xs-2' style='padding-left: 0px; margin-left: -20px; font-size: 10px; text-align: center; line-height: 1em;'> " +
    "           <span>Term Length Condition</span>" +
    "      </div> " +
    "   </div>"+
    "</div>"
var moneyRangeInputHTML =
    "<div class='rangeRow col-xs-12' style='font-size:12px; line-height:3em;'>" +
    "   <div class='row rangeRateDiv'>" +
    "      <div class='col-xs-3'>" +
    "         <div class='input-group'>" +
    "            <div class='input-group-btn'> " +
    "               <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> " +
    "                  <span class='dropDownButtonText'><i class='fa fa-percent'></i></span> " +
    // "               <i class='fa fa-percent'></i>" +
    "                  <span class='caret' style=''></span> " +
    "               </button> " +
    "               <ul class='dropdown-menu dropdown-menu-auto'> " +
    "                  <li><a href='#' class='dropDownOption_percent'><i class='fa fa-percent'></i></a></li> " +
    "                  <li><a href='#' class='dropDownOption_money'><i class='fa fa-usd'></i></a></li> " +
    "               </ul> " +
    "            </div>" +
    "            <input class='form-control rateInput' type='text' value='0'>" +
    "         </div>" +
    "      </div> " +
    "      <div class='col-xs-3'>" +
    "         <div class='input-group'>" +
    "           <span class='input-group-addon' ><i class='fa fa-usd'></i></span>" +
    "           <input class='allRangeStart rangeStart rangeInput form-control moneyInput' type='text' value='0'>" +
    "         </div>" +
    "      </div> " +
    "      <div class='col-xs-3'> " +
    "         <div class='input-group'>" +
    "           <span class='input-group-addon' ><i class='fa fa-usd'></i></span>" +
    "           <input class='allRangeEnd rangeEnd rangeInput form-control moneyInput' type='text' value='Any'> " +
    "         </div>" +
    "      </div> " +
    "      <div class='col-xs-1' style='padding-left:0px; text-align:center'> " +
    "         <input class='termLengthConditionCheckbox' type='checkbox'>" +
    "      </div> " +
    "   </div>" +
    "</div>"

var daysRangeInputHTML =
    "<div class='rangeRow col-xs-12' style='font-size:12px;'>" +
    "   <div class='row rangeRateDiv'>" +
    "      <div class='col-xs-3'>" +
    "         <div class='input-group'>" +
    "            <div class='input-group-btn'> " +
    "               <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> " +
    "                  <span class='dropDownButtonText'><i class='fa fa-percent'></i></span> " +
    // "               <i class='fa fa-percent'></i>" +
    "                  <span class='caret' style=''></span> " +
    "               </button> " +
    "               <ul class='dropdown-menu dropdown-menu-auto'> " +
    "                  <li><a href='#' class='dropDownOption_percent'><i class='fa fa-percent'></i></a></li> " +
    "                  <li><a href='#' class='dropDownOption_money'><i class='fa fa-usd'></i></a></li> " +
    "               </ul> " +
    "            </div>" +
    "            <input class='form-control rateInput percentInput' type='text' value='0'>" +
    "         </div>" +
    "      </div> " +
    "      <div class='col-xs-3'>" +
    "         <div class='input-group'>" +
    // "           <span class='input-group-addon' ><i class='fa fa-calendar'></i></span>" +
    "           <span class='input-group-addon' >Days</span>" +
    "           <input class='allRangeStart rangeStart rangeInput form-control' type='text' value='0'>" +
    "         </div>" +
    "      </div> " +
    "      <div class='col-xs-3'> " +
    "         <div class='input-group'>" +
    "           <span class='input-group-addon' >Days</span>" +
    "         <input class='allRangeEnd rangeEnd rangeInput form-control' type='text' value='Any'> " +
    "         </div>" +
    "      </div> " +
    "      <div class='col-xs-1' style='padding-left:0px'> " +
    "         <span style='line-height: 2em;'>Days</span>" +
    "         <input class='dummyCheckBox' type='checkbox' style='display:none'>" +
    "      </div> " +
    "   </div>" +
    "</div>"

function initMultiRange(){
    // $('.multiRangeContainer').css('margin-top','20px')
    // $('.multiRangeContainer').css('margin-bottom','20px')


    $('.multiRangeContainer').each(function(){
        var initialHTML = ""
        if( $(this).hasClass('money') ){
            initialHTML = moneyRangeInputHTML
        }
        else if( $(this).hasClass('days') ){
            initialHTML = daysRangeInputHTML
        }


        $(this).html(headerRowHTML + initialHTML)
        maskRate( $(this).find('.rateInput') )
    })

    $(document).on('change', '.rangeStart', function (e){
        if( $(this).val().trim().length === 0 ){
            $(this).val("0")
            addRemoveRangeButtons(this)
            cleanUpRanges(this)
        }
        else{
            rangeStartInputChangeAction(this)
            addRemoveRangeButtons(this)
            cleanUpRanges(this)
        }

    });

    $(document).on('change', '.rangeEnd', function (e){
        // console.log( $(this).val() )
        // console.log( typeof $(this).val() )
        if( $(this).val().trim().length === 0){
            alert("Invalid Range")
            $(this).val("Any")
            addRemoveRangeButtons(this)
            cleanUpRanges(this)
        }
        else if( isNaN( getIntValueOfMoney( $(this).val()) )  && $(this).val().trim().toLowerCase() != "any") {
            alert("Invalid Range. " + $(this).val() + " ")
            this.setSelectionRange(0, this.value.length)
        }
        else{



            rangeEndInputChangeAction(this)
            addRemoveRangeButtons(this)
            cleanUpRanges(this)
        }

    });
    $(document).on('focusin', '.rangeEnd', function (e){
        if(getRangeFormatClass(this) === "moneyInput"){
            if($(this).val().trim().toLowerCase() === "any"){
                $(this).removeClass('moneyInput')
                $(this).unbind()
            }
            else{
                $(this).addClass('moneyInput')
            }
        }

    });
    $(document).on('focusout', '.rangeEnd', function (e){
        if(getRangeFormatClass(this) === "moneyInput"){
            if($(this).val().trim().toLowerCase() === "any"){
            }
            else{
                $(this).addClass('moneyInput')
            }
        }

    });
    $(document).on('keydown', '.rangeEnd', function (e){
        if(getRangeFormatClass(this) === "moneyInput"){
            if( (e.charCode >= 48 && e.charCode <= 57) ||
                (e.charCode === 9) || //tab
                (e.charCode === 65) || //A
                (e.charCode === 78) || //N
                (e.charCode === 89) || //Y
                (e.charCode === 65+32) || //a
                (e.charCode === 78+32) || //n
                (e.charCode === 89+32) )  //y)
            {

            }
            else{
                $(this).maskMoney({prefix:'$', precision:"0"});
            }
        }


        if( $(this).hasClass('moneyInput') ){
            $(this).maskMoney({prefix:'$', precision:"0"});
        }
    });

    $(document).on('keypress', '.rangeInput', function (e){
        return (e.charCode >= 48 && e.charCode <= 57) ||
            (e.charCode === 9) || //tab
            (e.charCode === 65) || //A
            (e.charCode === 78) || //N
            (e.charCode === 89) || //Y
            (e.charCode === 65+32) || //a
            (e.charCode === 78+32) || //n
            (e.charCode === 89+32)  //y
    });
    $(document).on('click', '.rangeInput', function (e){
        this.setSelectionRange(0, this.value.length)
    });
    $(document).on('change', '.rangeInput', function (e){
        //RUN TESTS FOR NOW AFTER EVERY CHANGE
        runTests()
    });


    $(document).on('click', '.rateInput', function (e){
        this.setSelectionRange(0, this.value.length)
    });
    $(document).on('focusout', '.rateInput', function (e){
        // var value = $(this).val()
        // var formattedValue = numeral($(this).val()).format('0.0[0000]') + "%"
        // console.log(formattedValue)
        // $(this).val(formattedValue)

        maskRate($(this))
    });
    $(document).on('change', '.rateInput', function (e){
        maskRate($(this))
    });

    $(document).on('click', '.rangeRemoveButton', function (e){
        removeRangeButtonClickAction(this)
    });

    $(document).on('click', '.dropDownOption_percent', function (e){
        $(this).closest('.input-group').find('.rateInput').removeClass('moneyInput')
        $(this).closest('.input-group').find('.rateInput').unmask()
        $(this).closest('.input-group').find('.rateInput').addClass('percentInput')
    });

    $(document).on('click', '.dropDownOption_money', function (e){
        $(this).closest('.input-group').find('.rateInput').removeClass('percentInput')
        $(this).closest('.input-group').find('.rateInput').addClass('moneyInput')
        $(this).closest('.input-group').find('.rateInput').maskMoney({prefix:'$', precision:"0"});
    });


    $(document).on('change', '.termLengthConditionCheckbox', function (e) {
        var rangeRowContainer = $(this).closest('.rangeRow')

        if($(this).is(':checked')){
            var newMultiRangeContainer = $(
                "<div class='row additionalConditionDiv multiRangeContainer days' style='padding-top:8px; padding-bottom:16px;'>" +
                "</div> "
            );

            $(rangeRowContainer).append(newMultiRangeContainer)

            initializeNewMultiRange(newMultiRangeContainer, "days")

            var rateInputElement = $(rangeRowContainer).children('.rangeRateDiv').find('.rateInput')
            disableRateInput(rateInputElement)
        }
        else{
            //IF NOT CHECKED REMOVE AND DESTROY ADDITIONAL OPTIONS
            $(rangeRowContainer).find('.additionalConditionDiv').remove()
            var rateInputElement = $(rangeRowContainer).children('.rangeRateDiv').find('.rateInput')
            enableRateInput(rateInputElement)
        }
    });
}
function initializeNewMultiRange(multiRangeContainer, format){
    var newMultiRangeInput;

    if(format === "money"){
        newMultiRangeInput = $(moneyRangeInputHTML)
    }
    else if(format === "days"){
        newMultiRangeInput = $(daysRangeInputHTML)
    }

    //MAKE NEW INPUTS SMALLER
    newMultiRangeInput = applySmallerFormatToRow(newMultiRangeInput)

    //COPY RATE TO SUB RATE
    var rateVal = $(multiRangeContainer).siblings('.rangeRateDiv').find('.rateInput').val()
    $(newMultiRangeInput).find('.rateInput').val(rateVal)
    maskRate( $(newMultiRangeInput).find('.rateInput') )


    $(multiRangeContainer).append(newMultiRangeInput)

}

function rangeStartInputChangeAction(element){
    //ONLY PREPENDS RANGE ROWS WHEN THERE IS NO ROWS BEFORE
    var thisRangeRowElement = $(element).closest('.rangeRow')
    var thisRangeRowStartElement = $(thisRangeRowElement).find('.rangeStart')
    var thisRangeRowEndElement = $(thisRangeRowElement).find('.rangeEnd')
    var thisRangeRowStartValue = getIntValueOfMoney($(thisRangeRowStartElement).val().trim())
    var thisRangeRowEndValue = getIntValueOfMoney($(thisRangeRowEndElement).val().trim())

    console.log("start change")
    console.log(thisRangeRowStartValue)
    console.log(thisRangeRowEndValue)
    //CHECK FOR BLANK VALUE

    //MAKE SURE STARTING RANGE VALUE IS LESS THAN EXISTING RANGE ENDING VALUE
    //IF NEW RANGE START VALUE IS HIGHER OR EQUAL TO RANGE END VALUE, ADJUST END VALUE AND NEXT VALUES
    if(thisRangeRowStartValue < thisRangeRowEndValue || isNaN(thisRangeRowEndValue)){
        //IF NO RANGE ROW EXISTS BEFORE THIS ONE, PREPEND RANGE ROW TO THIS ROW
        //IF RANGE ROWS EXIST BEFORE THIS ONE, ADJUST THE RANGE NUMBERS BEFORE THIS ROW
        if( thisRangeRowElement.prev('.rangeRow').length === 0 ){
            if( $(element).val() == "0" || $(element).val().trim() == ""){
                setFirstAndLastRange(element)
            }
            else{
                prependRangeRow(element)
                setFirstAndLastRange(element)
            }
        }
        else{
            adjustPrevRangeRows(element)
        }
    }
    else{
        thisRangeRowEndElement.val(formatRangeNum(element,thisRangeRowStartValue + 1))
        adjustNextRangeRows(element)
        adjustPrevRangeRows(element)

        if( thisRangeRowElement.prev('.rangeRow').length === 0 ){
            if( $(element).val() == "0" || $(element).val().trim() == ""){
                setFirstAndLastRange(element)
            }
            else{
                prependRangeRow(element)
                setFirstAndLastRange(element)
            }
        }
        else{
            adjustPrevRangeRows(element)
        }

    }
}
function rangeEndInputChangeAction(element){
    //ONLY APPENDS RANGE ROWS WHEN THERE IS NO ROWS AFTER
    console.log("endChange")
    var thisRangeRowElement = $(element).closest('.rangeRow')
    var thisRangeRowStartElement = $(thisRangeRowElement).find('.rangeStart')
    var thisRangeRowEndElement = $(thisRangeRowElement).find('.rangeEnd')
    var thisRangeRowStartValue = getIntValueOfMoney($(thisRangeRowStartElement).val().trim())
    var thisRangeRowEndValue = getIntValueOfMoney($(thisRangeRowEndElement).val().trim())

    //MAKE SURE ENDING RANGE VALUE IS GREATER THAN EXISTING RANGE START VALUE
    //IF NEW ENDING RANGE VALUE IS LOWER OR EQUAL TO RANGE START VALUE, ADJUST START VALUE AND PREVIOUS VALUES
    if(thisRangeRowEndValue > thisRangeRowStartValue ){

    }
    else{
        thisRangeRowStartElement.val(formatRangeNum(element,thisRangeRowEndValue - 1))
        adjustPrevRangeRows(element)
    }

    if( thisRangeRowElement.next('.rangeRow').length === 0 ) {
        //IF NO RANGE ROW AFTER BEFORE THIS ONE
        if( $(element).val() === "Any" || $(element).val() === "any"){
            setFirstAndLastRange(element)
        }
        else{
            appendRangeRow(element)
            setFirstAndLastRange(element)
        }
    }
    else{
        adjustNextRangeRows(element)
    }

}
function prependRangeRow(element){
    var thisRangeRowElement = $(element).closest('.rangeRow')
    var thisRangeRowStartValue = getIntValueOfMoney($(thisRangeRowElement).find('.rangeStart').val().trim())
    // var rangeRowHTML = thisRangeRowElement.wrap('<p/>').parent().html();
    // thisRangeRowElement = thisRangeRowElement.unwrap()
    // $(thisRangeRowElement).before(rangeRowHTML)

    var newRow = getFreshRangeRow(element)

    //IF THIS CONTAINER IS A SUB CONTAINER, MAKE FORMATTING SMALLER
    if( $(element).closest('.multiRangeContainer').hasClass('additionalConditionDiv') ){
        newRow = applySmallerFormatToRow(newRow)
    }
    $(thisRangeRowElement).before(newRow)

    maskRate( $(newRow).find('.rateInput') )





    //SET NEW PREVIOUS ROWS ENDING RANGE TO ONE NUMBER BELOW THE START OF THIS ONE
    var newPrevRangeEndElement = $(thisRangeRowElement).prev().find('.rangeEnd')
    var newPrevRangeEndValue = formatRangeNum(element,thisRangeRowStartValue - 1)

    $(newPrevRangeEndElement).addClass(getRangeFormatClass(element))
    $(newPrevRangeEndElement).val(newPrevRangeEndValue)

    maskMoneyInputs()
}
function appendRangeRow(element){
    // console.log("appending")
    var thisRangeRowElement = $(element).closest('.rangeRow')

    var thisRangeRowEndValue = getIntValueOfMoney($(thisRangeRowElement).find('.rangeEnd').val().trim())
    // var rangeRowHTML = thisRangeRowElement.wrap('<p/>').parent().html();
    // thisRangeRowElement = thisRangeRowElement.unwrap()
    // $(thisRangeRowElement).after(rangeRowHTML)


    var newRow = getFreshRangeRow(element)

    //IF THIS CONTAINER IS A SUB CONTAINER, MAKE FORMATTING SMALLER
    if( $(element).closest('.multiRangeContainer').hasClass('additionalConditionDiv') ){
        newRow = applySmallerFormatToRow(newRow)
    }
    $(thisRangeRowElement).after(newRow)
    maskRate( $(newRow).find('.rateInput') )



    //SET NEW NEXT ROWS STARTING RANGE TO ONE NUMBER ABOVE THE END OF THIS ONE
    var newNextRangeStartElement = $(thisRangeRowElement).next().find('.rangeStart')
    var newNextRangeStartValue = formatRangeNum(element,thisRangeRowEndValue + 1)

    $(newNextRangeStartElement).addClass(getRangeFormatClass(element))
    $(newNextRangeStartElement).val(newNextRangeStartValue)

    maskMoneyInputs()
}
function adjustPrevRangeRows(element){
    var thisRangeRowElement = $(element).closest('.rangeRow')
    var thisRangeRowStartValue = getIntValueOfMoney($(thisRangeRowElement).children('.rangeRateDiv').find('.rangeStart').val().trim())

    if($(thisRangeRowElement).prev('.rangeRow').length > 0){
        var prevRangeRowRangeEndElement = $(thisRangeRowElement).prev('.rangeRow').children('.rangeRateDiv').find('.rangeEnd')
        var prevRangeRowRangeEndValue = getIntValueOfMoney( $(prevRangeRowRangeEndElement).val().trim() )

        if( thisRangeRowStartValue <= prevRangeRowRangeEndValue){
            //IF THIS RANGES NEW STARTING VALUE IS LOWER THAN PREVIOUS ROWS ENDING RANGE,
            //ADJUST PREVIOUS ROWS ENDING RANGE TO BE ONE LOWER THAN THE NEW STARTING RANGE
            var newPrevRangeEndValue = formatRangeNum(element,thisRangeRowStartValue - 1)
            prevRangeRowRangeEndElement.val(newPrevRangeEndValue)

            //ITERATE ALL PREVIOUS RANGES AND ADJUST RANGES
            var rangeRowElement = $(prevRangeRowRangeEndElement).closest('.rangeRow')
            var rangeRowEndValue = getIntValueOfMoney( $(prevRangeRowRangeEndElement).val().trim() )
            var rangeRowStartElement = $(rangeRowElement).children('.rangeRateDiv').find('.rangeStart')
            if( prevRangeRowRangeEndElement.hasClass('rangeEnd') && getIntValueOfMoney(rangeRowStartElement.val().trim()) != 0 ){
                var rangeRowStartValue = formatRangeNum(element,rangeRowEndValue-1)

                rangeRowStartElement.val(rangeRowStartValue)
                adjustPrevRangeRows(rangeRowStartElement)
            }
        }
        else if(thisRangeRowStartValue > prevRangeRowRangeEndValue){
            var newPrevRangeEndValue = formatRangeNum(element,thisRangeRowStartValue - 1)
            prevRangeRowRangeEndElement.val(newPrevRangeEndValue)
        }
    }

}
function adjustNextRangeRows(element){
    var thisRangeRowElement = $(element).closest('.rangeRow')
    var thisRangeRowEndValue = getIntValueOfMoney($(thisRangeRowElement).children('.rangeRateDiv').find('.rangeEnd').val().trim())


    if($(thisRangeRowElement).next('.rangeRow').length > 0){
        var nextRangeRowRangeStartElement = $(thisRangeRowElement).next('.rangeRow').children('.rangeRateDiv').find('.rangeStart')
        var nextRangeRowRangeStartValue = getIntValueOfMoney( $(nextRangeRowRangeStartElement).val().trim() )

        if( thisRangeRowEndValue <= nextRangeRowRangeStartValue){
            //IF THIS RANGES NEW STARTING VALUE IS LOWER THAN PREVIOUS ROWS ENDING RANGE,
            //ADJUST PREVIOUS ROWS ENDING RANGE TO BE ONE LOWER THAN THE NEW STARTING RANGE
            var newPrevRangeEndValue = formatRangeNum(element,thisRangeRowEndValue + 1)
            nextRangeRowRangeStartElement.val(newPrevRangeEndValue)

        }
        else if(thisRangeRowEndValue > nextRangeRowRangeStartValue){
            var newPrevRangeEndValue = formatRangeNum(element,thisRangeRowEndValue + 1)
            nextRangeRowRangeStartElement.val(newPrevRangeEndValue)

            //ITERATE ALL FOLLOWING RANGES AND ADJUST RANGES
            var rangeRowElement = $(nextRangeRowRangeStartElement).closest('.rangeRow')
            var rangeRowStartValue = getIntValueOfMoney( $(nextRangeRowRangeStartElement).val().trim() )
            var rangeRowEndElement = $(rangeRowElement).children('.rangeRateDiv').find('.rangeEnd')
            console.log("before recurse")
            console.log(rangeRowEndElement.val())
            if( nextRangeRowRangeStartElement.hasClass('rangeStart') && rangeRowEndElement.val() != "Any" ){
                console.log("in recurse")
                var rangeRowEndValue = formatRangeNum(element,rangeRowStartValue+1)
                console.log(rangeRowEndElement)
                rangeRowEndElement.val(rangeRowEndValue)
                adjustNextRangeRows(rangeRowEndElement)
            }
        }
    }


}
function setFirstAndLastRange(element){
    var multiRangeContainer = $(element).closest('.multiRangeContainer')

    $(multiRangeContainer).find('.allRangeStart').removeClass('allRangeStart')
    $(multiRangeContainer).find('.allRangeEnd').removeClass('allRangeEnd')

    $(multiRangeContainer).find('.rangeInput:first').addClass('allRangeStart')
    $(multiRangeContainer).find('.rangeInput:last').addClass('allRangeEnd')

    $(multiRangeContainer).find('.allRangeStart').val("0")
    $(multiRangeContainer).find('.allRangeEnd').val("Any")
}
function cleanUpRanges(element ){
    var multiRangeContainer = $(element).closest('.multiRangeContainer')

    // console.log("cleanup")
    $(multiRangeContainer).children('.rangeRow').each(function(i){
        var thisRow = $(this)
        var nextRow = $(this).next('.rangeRow')
        var prevRow = $(this).prev('.rangeRow')

        var rangeStartInputElement = $(this).children('.rangeRateDiv').find('.rangeStart')
        var rangeEndInputElement = $(this).children('.rangeRateDiv').find('.rangeEnd')
        var rateInputElement = $(this).children('.rangeRateDiv').find('.rateInput')
        var numberRows = $(multiRangeContainer).children('.rangeRow').length

        if(i===0){
            //FIRST RANGE ROW SHOULD HAVE THE CLASS ALLRANGESTART
            if(rangeStartInputElement.hasClass('allRangeStart')){

            }
            else{
                rangeStartInputElement.addClass('allRangeStart')
            }

            //IF THERE IS MORE THAN ONE ROW AND FIRST ROW HAS ALLRANGEEND
            //REMOVE ALLRANGEEND CLASS FROM FIRST ROW
            if( numberRows > 1  && rangeEndInputElement.hasClass('allRangeEnd')){
                rangeEndInputElement.removeClass('allRangeEnd')
            }

            //IF THERE IS MORE THAN ONE ROW AND FIRST ROW'S RANGE END IS 'ANY'
            //CHANGE 'ANY' TO
            if( numberRows > 1  && rangeEndInputElement.val().trim() === "Any"){
                //IF NEXT ROW START VALUE IS 1
                //DELETE THIS ROW AND SET NEXT ROW START VALUE TO 0 AND ALL RANGE START
                if( getIntValueOfMoney( $(nextRow).children('.rangeRateDiv').find('.rangeStart').val().trim() ) === 1){
                    $(nextRow).children('.rangeRateDiv').find('.rangeStart').val("0")
                    $(nextRow).children('.rangeRateDiv').find('.rangeStart').addClass('allRangeStart')
                    $(thisRow).remove()
                }
                //IF NEXT ROW START VALUE IS 0
                //DELETE THIS ROW AND SET NEXT ROW START VALUE TO 0 AND ALL RANGE START
                else if( getIntValueOfMoney( $(nextRow).children('.rangeRateDiv').find('.rangeStart').val().trim() ) === 0){
                    $(nextRow).children('.rangeRateDiv').find('.rangeStart').val("0")
                    $(nextRow).children('.rangeRateDiv').find('.rangeStart').addClass('allRangeStart')
                    $(thisRow).remove()
                }

                //IF ANY OTHER NUMBER
                //SET THIS END RANGE TO 1 MINUS THE NEXT START RANGE
                else{
                    //TO DO
                    var endRangeValue = getIntValueOfMoney( $(nextRow).children('.rangeRateDiv').find('.rangeStart').val() )
                    $(rangeEndInputElement).val( formatRangeNum(element, endRangeValue - 1 ) )
                }
            }
        }
        else if( i === (numberRows-1) ){
            //LAST RANGE ROW SHOULD HAVE THE CLASS ALLRANGEEND
            if(rangeEndInputElement.hasClass('allRangeEnd')){

            }
            else{
                rangeEndInputElement.addClass('allRangeEnd')
            }

            //IF THERE IS MORE THAN ONE ROW AND LAST ROW'S RANGE START IS '0'
            //CHANGE '0' TO
            if( numberRows > 1  && rangeStartInputElement.val().trim() === "0"){
                //IF PREV ROW END VALUE IS GREATER THAN 0
                //SET LAST ROW'S START VALUE TO 1 PLUS THE NUMBER
                console.log( $(prevRow).children('.rangeRateDiv').find('.rangeEnd').val() )
                console.log( getIntValueOfMoney( $(prevRow).children('.rangeRateDiv').find('.rangeEnd').val().trim() ) )
                if( getIntValueOfMoney( $(prevRow).children('.rangeRateDiv').find('.rangeEnd').val().trim() ) > 0){
                    var t = getIntValueOfMoney( $(prevRow).children('.rangeRateDiv').find('.rangeEnd').val().trim() )

                    var s = formatRangeNum(element,t + 1)
                    $(rangeStartInputElement).val(s)
                }
            }
        }
        else{
            //ALL INBETWEEN ROWS SHOULD HAVE A REMOVE BUTTON
            if( $(this).children('.rangeRateDiv').find('.rangeRemoveButton').length === 0){
                $(this).children('.rangeRateDiv').append(removeButtonHTML())
            }
        }

        //IF THERE IS A SUBRATE UNDER THIS ROW, DISABLE MAIN RATE SO ONLY THE SUBRATES ARE VALID
        if($(thisRow).children('.multiRangeContainer').length > 0 ){
            disableRateInput(rateInputElement)
        }
        else{
            if( $(rateInputElement).prop('disabled') === true){
                enableRateInput(rateInputElement)
            }

        }

        //IF THERE IS A NEXT ROW
        // LOOK AHEAD TO NEXT ROW
        //SEE IF THIS ROW'S END VALUE NEEDS TO BE UPDATED TO BE 1 - THE NEXT ROWS START VALUE
        if( $(nextRow).length > 0 ){
            var nextRowRangeStartValue = getIntValueOfMoney( $(nextRow).children('.rangeRateDiv').find('.rangeStart').val() )
            if( getIntValueOfMoney( $(rangeEndInputElement).val() ) === nextRowRangeStartValue-1 ){
                //NO ACTION NEEDED IF THIS ROWS LAST VALUE IS THE NEXT START VALUE MINUS 1
            }
            else{
                //IF THERE IS A GAP IN THE RANGES BETWEEN ROWS, THAN ADJUST THIS ROWS VALUE TO CLOSE THE GAP
                $(rangeEndInputElement).val( formatRangeNum(element, nextRowRangeStartValue-1 ) )
            }
        }




    })


    setFirstAndLastRange(element)

}
function removeButtonHTML(){
    var removeButtonString = "" +
        "<div class='col-xs-2'>" +
        "<button class='btn btn-xs btn-danger rangeRemoveButton' type='button' style=''> " +
        "<span class='' style=''>remove</span>" +
        "</button>" +
        "</div>"

    return removeButtonString
}
function addRemoveRangeButtons(element){
    var removeButtonString = removeButtonHTML()
    var multiRangeContainer = $(element).closest('.multiRangeContainer')

    // console.log( $(multiRangeContainer).children('.rangeRow').children('.rangeRateDiv') )
    $(multiRangeContainer).children('.rangeRow').children('.rangeRateDiv').each(function(i){
        if(i===0 || i === ( $(multiRangeContainer).children('.rangeRow').children('.rangeRateDiv').length - 1) ){

        }
        else{
            if( $(this).find('.rangeRemoveButton').length === 0 ){
                $(this).append(removeButtonString)


                //IF THIS IS A SUB RANGE, MAKE BUTTON SMALL
                if( $(multiRangeContainer).hasClass('additionalConditionDiv') ){
                    var removeButtonElement = $(this).find('.rangeRemoveButton')

                    applySmallerFormatToRemoveButton(removeButtonElement)
                }



            }
        }
    })
}
function removeRangeButtonClickAction(element){
    var container = $(element).closest('.multiRangeContainer')
    $(element).closest('.rangeRow').remove()

    cleanUpRanges($(container).children('.headerRow'))

}

function disableRateInput(rateInputElement){
    $(rateInputElement).val("-")
    $(rateInputElement).prop('disabled', true)
}
function enableRateInput(rateInputElement){
    $(rateInputElement).val("0")
    maskRate( $(rateInputElement) )

    $(rateInputElement).prop('disabled', false)
}


function formatRangeNum(element, i){
    var multiRangeContainer = $(element).closest('.multiRangeContainer')

    if($(multiRangeContainer).hasClass('money') ){
        return formatMoney(i)
    }
    else if( $(multiRangeContainer).hasClass('days') ){
        return i
    }
}

function getRangeFormatClass(element){
    var multiRangeContainer = $(element).closest('.multiRangeContainer')

    if($(multiRangeContainer).hasClass('money') ){
        return 'moneyInput'
    }
    else if( $(multiRangeContainer).hasClass('days') ){
        return ''
    }
}
function getFreshRangeRow(element){
    var multiRangeContainer = $(element).closest('.multiRangeContainer')

    var freshRow

    if($(multiRangeContainer).hasClass('money') ){
        freshRow = $(moneyRangeInputHTML)
        $(freshRow).find('.allRangeStart').removeClass('allRangeStart')
        $(freshRow).find('.allRangeEnd').removeClass('allRangeEnd')



        return freshRow
    }
    else if( $(multiRangeContainer).hasClass('days') ){
        freshRow = $(daysRangeInputHTML)
        $(freshRow).find('.allRangeStart').removeClass('allRangeStart')
        $(freshRow).find('.allRangeEnd').removeClass('allRangeEnd')



        return freshRow
    }
}
function applySmallerFormatToRow(newMultiRangeRow){
    $(newMultiRangeRow).find('input').addClass('input-sm')
    $(newMultiRangeRow).find('.rangeRow').css('font-size', '10px')
    $(newMultiRangeRow).find('input').css('height', '24px')
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-addon').css('font-size', '10px')
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-btn .dropdown-toggle').css('font-size', '10px')
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-btn .dropdown-toggle').css('height', '24px')
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-btn .dropdown-toggle').css('padding', '0px')
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-btn ').css('line-height', '0')



    //MAKE TEXT AND OTHER DIVS SMALLER
    $(newMultiRangeRow).children('.rangeRateDiv').children('.div').css('height', '24px')
    $(newMultiRangeRow).children('.rangeRateDiv').children('div.col-xs-1').css('line-height', '2em')
    $(newMultiRangeRow).children('.rangeRateDiv').children('div.col-xs-1').css('font-size', '11px')


    //ADD PADDING TO FIRST INPUT ON LEFT TO SHOW INDENT
    $(newMultiRangeRow).children('.rangeRateDiv').children().first().css('padding-left', '35px')
    $(newMultiRangeRow).children('.rangeRateDiv').children('.col-xs-3').css('padding-left', '35px')
    $(newMultiRangeRow).children('.rangeRateDiv').children().first().find('input').css('font-size', '11px')
    $(newMultiRangeRow).children('.rangeRateDiv').children().first().find('input').css('padding', '5px')

    return newMultiRangeRow
}
function applySmallerFormatToRemoveButton(removeButton){
    $(removeButton).css('font-size', '10px')
    $(removeButton).parent().css('line-height', '2em')


    return removeButton
}
function maskRate(jqueryObject){
    //ONLY FORMAT IF NO PERCENT SIGN
    if( $(jqueryObject).hasClass('percentInput')){
        if($(jqueryObject).val().indexOf("%") === -1){
            $(jqueryObject).val(numeral($(jqueryObject).val()).format('0.0[0000]') + "%")
        }

    }
}




//QUICK TESTS TO RUN AFTER EVERY CHANGE OR UPDATE
function runTests(){
    var testsPassed = true;
    try{
        //LOOK FOR ALL MULTI RANGE INSTANCES
        var multiRangeContainers = $('.multiRangeContainer')

        //LOOP THROUGH EACH MULTI RANGE CONTAINERS
        $(multiRangeContainers).each(function(i){

            var thisContainer = $(this)

            //EACH CONTAINER SHOULD HAVE ONE HEADER ROW
            if($(thisContainer).children('.headerRow').length > 1){
                testsPassed = false;
                console.log("ERROR: MORE THAN ONE HEADER ROW FOR CONTAINER FOUND")
                console.log($(thisContainer).children('.headerRow').length)
            }

            //LOOP THROUGH ROWS IN THIS CONTAINER
            var thisContainerRangeRows = $(thisContainer).children('.rangeRow')
            $(thisContainerRangeRows).each(function(j){
                var thisRangeRow = $(this)

                //MAKE SURE THE FIRST RANGE STARTS WITH 0
                if(j===0){
                    var firstVal = getIntValueOfMoney( $(thisRangeRow).children('.rangeRateDiv').find('.rangeStart.allRangeStart').val() )
                    if(firstVal != 0 ){
                        testsPassed = false;
                        console.log("ERROR: FIRST RANGE VALUE OF ALL RANGES SHOULD BE 0")
                        console.log(firstVal)
                    }
                }

                //IF LAST ROW IT SHOULD END WITH ANY
                if(j=== ($(thisContainerRangeRows).length -1) ){
                    var lastVal = $(thisRangeRow).children('.rangeRateDiv').find('.rangeEnd.allRangeEnd').val()
                    if(lastVal.toLowerCase() != "any" ){
                        testsPassed = false;
                        console.log("ERROR: LAST RANGE VALUE OF ALL RANGES SHOULD BE ANY")
                        console.log(firstVal)
                    }
                }


                //IF THERE IS A NEXT ROW MAKE SURE VALUES LEAVE NO GAP
                var nextRow = $(thisRangeRow).next('.rangeRow')
                var rangeEndInputElement = $(thisRangeRow).children('.rangeRateDiv').find('.rangeEnd')
                if( $(nextRow).length > 0 ){
                    var nextRowRangeStartValue = getIntValueOfMoney( $(nextRow).children('.rangeRateDiv').find('.rangeStart').val() )
                    if( getIntValueOfMoney( $(rangeEndInputElement).val() ) === nextRowRangeStartValue-1 ){
                        //NO ACTION NEEDED IF THIS ROWS LAST VALUE IS THE NEXT START VALUE MINUS 1
                    }
                    else{
                        //IF THERE IS A GAP IN THE RANGES BETWEEN ROWS
                        testsPassed = false;
                        console.log("ERROR: RANGE GAP")
                        console.log(getIntValueOfMoney( $(rangeEndInputElement).val() ) + " AND " + (nextRowRangeStartValue-1) )
                        console.log( thisRangeRow)
                    }
                }


            })


        })
        if(testsPassed){
            console.log("TESTS PASSED")
        }
        else{
            console.error("TESTS FAILED")
        }

    }
    catch(e){
        console.error("MULTIRANGE TEST FAIL")
        console.error("Error", e.stack);
        console.error("Error", e.name);
        console.error("Error", e.message);
    }

}