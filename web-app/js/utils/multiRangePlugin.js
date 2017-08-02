//MULTIRANGE PLUGIN
//Requires only a div with a class name
// <div class="multiRangeContainer money" >
//     </div>
//OR
// <div class="multiRangeContainer days" >
//     </div>
//OR
var numeralPlugin = numeral(1000)

function headerRowHTML(){
    var headerRowHTML =
        "<div class='headerRow col-xs-12' >" +
        "   <div class='row'>" +
        "       <div class='col-xs-3 leftColumn'>" +
        "           <span>Premium</span>" +
        "       </div> " +
        "       <div class='col-xs-3 column'>" +
        "           <span>From</span>" +
        "      </div> " +
        "       <div class='col-xs-3 column'> " +
        "           <span>To</span>" +
        "      </div> " +
        "       <div class='col-xs-1 column'> " +
        "           <span>Min Prem</span>" +
        "      </div> " +
        "       <div class='col-xs-1 rightColumn_header'> " +
        "           <span>Term Length Condition</span>" +
        "      </div> " +
        "   </div>"+
        "</div>"

    return headerRowHTML
}

function extraConditionHeaderHTML(){
    var extraConditionHeaderHTML =
        "<div class='subHeaderRow col-xs-12' >" +
        "   <div class='row'>" +
        "       <div class='col-xs-6 column'>" +
        "           <span class='extraConditionLabel'>LABEL</span>" +
        "      </div> " +
        "   </div>"+
        "</div>"

    return extraConditionHeaderHTML
}

function headerRowHTML_Days(){
    var headerRowHTML_Days =
        "<div class='headerRow col-xs-12' >" +
        "   <div class='row'>" +
        "       <div class='col-xs-3 leftColumn'>" +
        "           <span>Premium</span>" +
        "       </div> " +
        "       <div class='col-xs-3 column'>" +
        "           <span>From</span>" +
        "      </div> " +
        "       <div class='col-xs-3 column'>" +
        "           <span>To</span>" +
        "      </div> " +
        "       <div class='col-xs-1 rightColumn_header'> " +
        "           <span>Min Prem</span>" +
        "      </div> " +
        "       <div class='col-xs-1 rightColumn_header'> " +
        "           <span></span>" +
        "      </div> " +
        "       <div class='col-xs-1 rightColumn_header'> " +
        "           <span></span>" +
        "      </div> " +
        "   </div>"+
        "</div>"

    return headerRowHTML_Days
}

function headerRowHTML_Limits(){
    var headerRowHTML_Limits =
        "<div class='headerRow col-xs-12' >" +
        "   <div class='row'>" +
        "       <div class='col-xs-3 leftColumn'>" +
        "           <span>Premium</span>" +
        "       </div> " +
        "       <div class='col-xs-3 column'>" +
        "           <span>From Limit</span>" +
        "      </div> " +
        "       <div class='col-xs-3 column'> " +
        "           <span>To Limit</span>" +
        "      </div> " +
        "       <div class='col-xs-1 column'> " +
        "           <span>Min Prem</span>" +
        "      </div> " +
        "       <div class='col-xs-1 rightColumn_header'> " +
        "           <span>Term Length Condition</span>" +
        "      </div> " +
        "   </div>"+
        "</div>"

    return headerRowHTML_Limits;
}

function moneyRangeInputHTML(){
    var moneyRangeInputHTML =
        "<div class='rangeRow col-xs-12'>" +
        "   <div class='row rangeRateDiv'>" +
        "      <div class='col-xs-3 leftColumn' >" +
        "         <div class='input-group'>" +
        "            <div class='input-group-btn'> " +
        "               <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' " +
        "                        aria-haspopup='true' aria-expanded='false'> " +
        "                  <span class='dropDownButtonText'>" +
        "                       <i class='fa fa-percent'></i>" +
        "                       <span class='dropDownOption_Description' data-rateType='percent' data-rateTypeDetail='percentOfGPC'>of GPC</span>" +
        "                   </span> " +
        "                  <span class='caret' ></span> " +
        "               </button> " +
        "               <ul class='dropdown-menu dropdown-menu-auto'> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_percent' >" +
        "                           <i class='fa fa-percent'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='percent' data-rateTypeDetail='percentOfGPC'>of GPC</span>" +
        "                       </a>" +
        "                   </li> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_money' >" +
        "                           <i class='fa fa-usd'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='premium' data-rateTypeDetail='premium'>Premium</span>" +
        "                       </a>" +
        "                   </li> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_custom' >" +
        "                           <i class='fa fa-pencil'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='custom' data-rateTypeDetail='custom'>Custom</span>" +
        "                       </a>" +
        "                   </li> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_custom' >" +
        "                           <i class='fa fa-pencil'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='custom' data-rateTypeDetail='custom'>Custom</span>" +
        "                       </a>" +
        "                   </li> " +
        "               </ul> " +
        "            </div>" +
        "            <input class='form-control rateInput percentInput detectProductChanges'  " +
        "                   type='text' value='0'>" +
        "         </div>" +
        "      </div> " +
        "      <div class='col-xs-3 column' >" +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon'><i class='fa fa-usd'></i></span>" +
        "           <input class='allRangeStart rangeStart rangeInput form-control moneyInput detectProductChanges'  " +
        "                   type='text' value='0'>" +
        "         </div>" +
        "      </div> " +
        "      <div class='col-xs-3 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon'><i class='fa fa-usd'></i></span>" +
        "           <input class='allRangeEnd rangeEnd rangeInput form-control moneyInput detectProductChanges'  " +
        "                  type='text' value='Any'> " +
        "         </div>" +
        "      </div> " +
        "      <div class='col-xs-1 column' > " +
        "         <input class='form-control minPremiumInput moneyInput detectProductChanges' type='text' value='None'>" +
        "      </div> " +
        "      <div class='col-xs-1 rightColumn extraConditionColumn' > " +
        "            <select class='form-control extraConditionInput'>" +
        "               <option value='none'>No Extra Conditions</option>" +
        "               <option value='termLength'>Term Length</option>" +
        "               <option value='budgetAggregate'>Budget (Aggregate)</option>" +
        "            </select>" +
        "      </div> " +
        "      <div class='col-xs-1 rightColumn removeButtonColumn ' > " +
        "      </div> " +
        "   </div>" +
        "</div>"

    return moneyRangeInputHTML;
}

function daysRangeInputHTML(){
    var daysRangeInputHTML =
        "<div class='rangeRow col-xs-12'>" +
        "   <div class='row rangeRateDiv'>" +
        "      <div class='col-xs-3 leftColumn' >" +
        "         <div class='input-group'>" +
        "            <div class='input-group-btn'> " +
        "               <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' " +
        "                        aria-haspopup='true' aria-expanded='false'> " +
        "                  <span class='dropDownButtonText'>" +
        "                       <i class='fa fa-percent'></i>" +
        "                       <span class='dropDownOption_Description' data-rateType='percent' data-rateTypeDetail='percentOfGPC'>of GPC</span>" +
        "                   </span> " +
        "                  <span class='caret' ></span> " +
        "               </button> " +
        "               <ul class='dropdown-menu dropdown-menu-auto'> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_percent' >" +
        "                           <i class='fa fa-percent'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='percent' data-rateTypeDetail='percentOfGPC'>of GPC</span>" +
        "                       </a>" +
        "                   </li> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_percent' >" +
        "                           <i class='fa fa-percent'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='percent' data-rateTypeDetail='percentOfLimit'>of Limit</span>" +
        "                       </a>" +
        "                   </li> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_money' >" +
        "                           <i class='fa fa-usd'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='premium' data-rateTypeDetail='premium'>Premium</span>" +
        "                       </a>" +
        "                   </li> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_custom' >" +
        "                           <i class='fa fa-pencil'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='custom' data-rateTypeDetail='custom'>Custom</span>" +
        "                       </a>" +
        "                   </li> " +
        "               </ul> " +
        "            </div>" +
        "            <input class='form-control rateInput percentInput detectProductChanges'   " +
        "                   type='text' value='0'>" +
        "         </div>" +
        "      </div> " +
        "      <div class='col-xs-3 column' >" +
        "         <div class='input-group'>" +
        // "           <span class='input-group-addon' ><i class='fa fa-calendar'></i></span>" +
        "           <span class='input-group-addon'  >Days</span>" +
        "           <input class='allRangeStart rangeStart rangeInput numberInput form-control detectProductChanges'   " +
        "                   type='text' value='0'>" +
        "         </div>" +
        "      </div> " +
        "      <div class='col-xs-3 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon'  >Days</span>" +
        "         <input class='allRangeEnd rangeEnd rangeInput numberInput form-control detectProductChanges'   " +
        "               type='text' value='Any'> " +
        "         </div>" +
        "      </div> " +
        "      <div class='col-xs-1 column' > " +
        "         <input class='form-control minPremiumInput moneyInput detectProductChanges' type='text' value='None'>" +
        "      </div> " +
        "      <div class='col-xs-1 rightColumn extraConditionColumn' > " +
        "            <select class='form-control extraConditionInput'>" +
        "               <option value='none'>No Extra Conditions</option>" +
        "               <option value='termLength'>Term Length</option>" +
        "               <option value='budgetAggregate'>Budget (Aggregate)</option>" +
        "            </select>" +
        "      </div> " +
        "      <div class='col-xs-1 rightColumn removeButtonColumn' > " +
        "      </div> " +
        "   </div>" +
        "</div>"

    return daysRangeInputHTML;
}

function limitRangeInputHTML(){
    var limitRangeInputHTML =
        "<div class='rangeRow col-xs-12'>" +
        "   <div class='row rangeRateDiv'>" +
        "      <div class='col-xs-3 leftColumn' >" +
        "         <div class='input-group'>" +
        "            <div class='input-group-btn'> " +
        "               <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' " +
        "                        aria-haspopup='true' aria-expanded='false'> " +
        "                  <span class='dropDownButtonText'>" +
        "                       <i class='fa fa-percent'></i>" +
        "                       <span class='dropDownOption_Description' data-rateType='percent' data-rateTypeDetail='percentOfGPC'>of GPC</span>" +
        "                   </span> " +
        "                  <span class='caret' ></span> " +
        "               </button> " +
        "               <ul class='dropdown-menu dropdown-menu-auto'> " +
        "                   <li><a href='#' class='multiRange_RateOption dropDownOption_percent' >" +
        "                           <i class='fa fa-percent'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='percent' data-rateTypeDetail='percentOfGPC'>of GPC</span>" +
        "                       </a>" +
        "                   </li> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_percent' >" +
        "                           <i class='fa fa-percent'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='percent' data-rateTypeDetail='percentOfLimit'>of Limit</span>" +
        "                       </a>" +
        "                   </li> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_money' >" +
        "                           <i class='fa fa-usd'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='premium' data-rateTypeDetail='premium'>Premium</span>" +
        "                       </a>" +
        "                   </li> " +
        "                  <li><a href='#' class='multiRange_RateOption dropDownOption_custom' >" +
        "                           <i class='fa fa-pencil'></i>" +
        "                           <span class='dropDownOption_Description' data-rateType='custom' data-rateTypeDetail='custom'>Custom</span>" +
        "                       </a>" +
        "                   </li> " +
        "               </ul> " +
        "            </div>" +
        "            <input class='form-control rateInput percentInput detectProductChanges'  " +
        "                   type='text' value='0'>" +
        "         </div>" +
        "      </div> " +
        "      <div class='col-xs-3 column' >" +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon' ><i class='fa fa-usd'></i></span>" +
        "           <input class='allRangeStart rangeStart rangeInput form-control moneyInput detectProductChanges'  " +
        "                   type='text' value='0'>" +
        "         </div>" +
        "      </div> " +
        "      <div class='col-xs-3 column' > " +
        "         <div class='input-group'>" +
        "           <span class='input-group-addon'  ><i class='fa fa-usd'></i></span>" +
        "           <input class='allRangeEnd rangeEnd rangeInput form-control moneyInput detectProductChanges'  " +
        "                  type='text' value='Any'> " +
        "         </div>" +
        "      </div> " +
        "      <div class='col-xs-1 column' > " +
        "         <input class='form-control minPremiumInput moneyInput detectProductChanges' type='text' value='None'>" +
        "      </div> " +
        "      <div class='col-xs-1 rightColumn extraConditionColumn' > " +
        "            <select class='form-control extraConditionInput'>" +
        "               <option value='none'>No Extra Conditions</option>" +
        "               <option value='termLength'>Term Length</option>" +
        "               <option value='budgetAggregate'>Budget (Aggregate)</option>" +
        "            </select>" +
        "      </div> " +
        "      <div class='col-xs-1 rightColumn removeButtonColumn ' > " +
        "      </div> " +
        "   </div>" +
        "</div>"

    return limitRangeInputHTML
}



function initMultiRange(){
    // $('.multiRangeContainer').css('margin-top','20px')
    // $('.multiRangeContainer').css('margin-bottom','20px')
    $('.multiRangeContainer').each(function(){
        var initialHTML = ""
        if( $(this).hasClass('money') ){
            initialHTML = headerRowHTML() + moneyRangeInputHTML()
        }
        else if( $(this).hasClass('days') ){
            initialHTML = headerRowHTML_Days() + daysRangeInputHTML()
        }
        else if( $(this).hasClass('limits') ){
            initialHTML = headerRowHTML_Limits() + limitRangeInputHTML()
        }


        $(this).html(initialHTML)
        maskRate( $(this).find('.rateInput') )
    })

    $(document).on('keypress', '.rangeInput', function (e){
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode
        
        return (charCode >= 48 && charCode <= 57) ||
            (charCode === 3) || (charCode === 99) ||  //ctrl copy
            (charCode === 22) || (charCode === 118) ||  //ctrl paste
            (charCode === 26) || (charCode === 122) ||  //ctrl Z
            (charCode === 9) || //tab
            (charCode === 65) || //A
            (charCode === 78) || //N
            (charCode === 89) || //Y
            (charCode === 65+32) || //a
            (charCode === 78+32) || //n
            (charCode === 89+32)  //y
    });
    $(document).on('click', '.rangeInput', function (e){
        this.setSelectionRange(0, this.value.length)
    });
    $(document).on('change', '.rangeInput', function (e){
        //RUN TESTS FOR NOW AFTER EVERY CHANGE
    });

    $(document).on('change', '.rangeStart', function    (e){
        //console.log("CHANGE start")
        //console.log( $(this).val() )
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
        //console.log("rangeEnd change")
        //console.log($(this).val())

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
            //console.log("ELSE")
            //console.log($(this).val())
            rangeEndInputChangeAction(this)

            //console.log($(this).val())
            addRemoveRangeButtons(this)

            //console.log($(this).val())
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
    $(document).on('keypress', '.rangeEnd', function (e){
        //console.log("rangeEnd keypress")
        //console.log($(this).val())

        if(getRangeFormatClass(this) === "moneyInput"){
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode
            if( (charCode >= 48 && charCode <= 57) ||
                (charCode === 3) || (charCode === 99) ||  //ctrl copy
                (charCode === 22) || (charCode === 118) ||  //ctrl paste
                (charCode === 26) || (charCode === 122) ||  //ctrl Z
                (charCode === 9) || //tab
                (charCode === 65) || //A
                (charCode === 78) || //N
                (charCode === 89) || //Y
                (charCode === 65+32) || //a
                (charCode === 78+32) || //n
                (charCode === 89+32) )  //y)
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

    $(document).on('change', '.moneyInput', function (e){
        //console.log("MONEY CHANGE")
        if( $(this).val().trim().length === 0){
            $(this).val("$0")
        }
        else{
            $(this).maskMoney('mask')
            //console.log("CHANGE MONEY")
            //console.log($(this).val())
        }
    });

    $(document).on('change', '.numberInput', function (e){
        if( isNaN($(this).val()) && $(this).val().toLowerCase().trim() != "any" ){
            $(this).val("0")
            alert("Not a valid range")
        }
        else{
            $(this).val( parseInt( $(this).val() ))
        }
    });

    $(document).on('click', '.rateInput', function (e){
        this.setSelectionRange(0, this.value.length)
        // e.preventDefault();
    });

    $(document).on('focusout', '.percentInput', function (e){
        // var value = $(this).val()
        // var formattedValue = numeral($(this).val()).format('0.0[0000]') + "%"
        // console.log(formattedValue)
        // $(this).val(formattedValue)

        maskRate($(this))
    });
    $(document).on('change', '.percentInput', function (e){
        maskRate($(this))
    });

    $(document).on('keypress', '.customInput', function (e){
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode
        
        return (charCode >= 48 && charCode <= 57) || //ANY NUMBER
            (charCode === 3) || (charCode === 99) ||  //ctrl copy
            (charCode === 22) || (charCode === 118) ||  //ctrl paste
            (charCode === 26) || (charCode === 122) ||  //ctrl Z
            (charCode === 46) || //.
            (charCode === 9) || //tab
            (charCode === 76) || //L for Limit
            (charCode === 71) || //G for GPC
            (charCode === 68+32) || //d for policy duration
            (charCode === 40) || //( for parantheses
            (charCode === 41) || //) for parantheses
            (charCode === 42) || //* multiply
            (charCode === 43) || //+ add
            (charCode === 45) || //- subtract
            (charCode === 47)  /// divide
    });
    $(document).on('focusout', '.customInput', function (e){
        var scope = {
            L:1,
            G:1,
            d:1
        }
        try{
            if($(this).val().trim().length === 0){
                $(this).val("0")
            }
            else{
                math.eval($(this).val(), scope)
            }
        }
        catch(e){
            alert("Invalid Expression")
            $(this).val("0")
        }

    });

    $(document).on('change', '.rateTestRun, .rateInput, .rangeInput, .extraConditionInput, #primaryRateBasisSelect, .minPremiumInput', function (e){
        //console.log("running rate Preview")
        //console.log($(this).val())
        //RE RUN TESTS FOR RATE
        // runTests()
        runRatePreview()
    });

    $(document).on('click', '.minPremiumInput', function (e){
        $(this).removeClass('moneyInput')
        $(this).unbind()
        this.setSelectionRange(0, this.value.length)
    });
    $(document).on('focusout', '.minPremiumInput', function (e){
        //console.log($(this).val())
        if( $(this).val() === "$0" || $(this).val() === "0" || $(this).val().trim().length === 0){
            $(this).val("None")
        }
        else{
            $(this).addClass('moneyInput')
            $(this).maskMoney({prefix:'$', precision:"0"});
        }
    });
    $(document).on('keypress', '.minPremiumInput', function (e){
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode
        //console.log("MIN PREM")
        //console.log(charCode)
        //console.log(e.which)
        return (charCode >= 48 && charCode <= 57) ||
            (charCode === 78) || (charCode === 110) ||  //N
            (charCode === 79) || (charCode === 111) ||  //o
            (charCode === 69) || (charCode === 101) ||  //e
            (charCode === 3) || (charCode === 99) ||  //ctrl copy
            (charCode === 22) || (charCode === 118) ||  //ctrl paste
            (charCode === 26) || (charCode === 122) ||  //ctrl Z
            (charCode === 9)

    });

    $(document).on('click', '.rangeRemoveButton', function (e){
        removeRangeButtonClickAction(this)
    });

    $(document).on('change', '.extraConditionInput', function (e) {
        extraConditionInputChangeAction(this)
    });

    $(document).on('change', '#primaryRateBasisSelect', function (e) {
        showRatingContainerForValue($(this).val())
    });

    $(document).on('click', 'a.multiRange_RateOption', function (e) {
        //REPLACE ADDON TEXT
        $(this).closest('.input-group-btn').find('.dropdown-toggle').find('.dropDownButtonText').html( $(this).html() )

        //CLEAR PREVIOUS RATE VALUES
        $(this).closest('.input-group').find('input').val("")

        //FLAT RATE FUNCTIONS
        if($(this).html().trim() === "Flat Premium"){
            $('#flatRate_MinPremium').prop('disabled', true)
        }
        else if($(this).html().trim() === "Flat Rate"){
            $('#flatRate_MinPremium').prop('disabled',false)
        }

        //CHANGE INPUT CLASS APPROPRIATELY
        if( $(this).hasClass('dropDownOption_percent') ){
            $(this).closest('.input-group').find('.rateInput').removeClass('moneyInput')
            $(this).closest('.input-group').find('.rateInput').removeClass('customInput')
            $(this).closest('.input-group').find('.rateInput').maskMoney('destroy')
            $(this).closest('.input-group').find('.rateInput').addClass('percentInput')
            maskRate($(this).closest('.input-group').find('.rateInput'))
        }
        else if( $(this).hasClass('dropDownOption_money') ){
            $(this).closest('.input-group').find('.rateInput').removeClass('percentInput')
            $(this).closest('.input-group').find('.rateInput').removeClass('customInput')
            $(this).closest('.input-group').find('.rateInput').addClass('moneyInput')
            $(this).closest('.input-group').find('.rateInput').maskMoney({prefix:'$', precision:"0"});
            $(this).closest('.input-group').find('.rateInput').maskMoney('mask')
        }
        else if( $(this).hasClass('dropDownOption_custom') ){
            $(this).closest('.input-group').find('.rateInput').removeClass('percentInput')
            $(this).closest('.input-group').find('.rateInput').removeClass('moneyInput')
            $(this).closest('.input-group').find('.rateInput').addClass('customInput')
            $(this).closest('.input-group').find('.rateInput').val("0")
        }

        //PREVENT JUMP TO TOP
        e.preventDefault();
    });

    $(document).on('change', '#limits_TestInput', function (e) {
        $('.lobLimitInput').val( $(this).val() )
    });

    $(document).on('change', '#flatRate_FlatValue', function (e) {
        var inputButtonText = $('#flatRate_RatingOptionsContainer .dropDownButtonText').html().trim()

        //console.log(inputButtonText)
        if(inputButtonText === "Flat Premium"){
            //console.log("SETTING MIN PREM TO 0 ")
            $('#flatRate_MinPremium').val("0")
        }
        else if( inputButtonText === "Flat Rate"){

        }
    });

}
function initializeNewMultiRange(multiRangeContainer, format, extraConditionVal){
    var newMultiRangeInput;

    if(format === "money"){
        newMultiRangeInput = $(moneyRangeInputHTML())
    }
    else if(format === "days"){
        newMultiRangeInput = $(daysRangeInputHTML())
    }
    else if(format === "limits"){
        newMultiRangeInput = $(limitRangeInputHTML())
    }

    var headerRow = $(extraConditionHeaderHTML())
    headerRow.find('.extraConditionLabel').html(extraConditionVal.toUpperCase() + " CONDITION: ")

    //MAKE NEW INPUTS SMALLER
    newMultiRangeInput = applySmallerFormatToRow(newMultiRangeInput)

    //COPY RATE TO SUB RATE
    var rateVal = $(multiRangeContainer).siblings('.rangeRateDiv').find('.rateInput').val()
    $(newMultiRangeInput).find('.rateInput').val(rateVal)
    maskRate( $(newMultiRangeInput).find('.rateInput') )

    $(multiRangeContainer).append(headerRow)
    $(multiRangeContainer).append(newMultiRangeInput)

}
function recreateRateRangesFromMap(rateInfoMap){
    if(rateInfoMap.basisName === "gpc"){
        var rateRangeRowsArray = rateInfoMap.rateInfo

        var multiRangeContainer = $('#gpc_multiRangeContainer')

        //MAKE SURE RANGE CONTAINER IS EMPTY, TO RECREATE FROM SCRATCH
        multiRangeContainer.empty()
        //SETUP HEADER ROW
        multiRangeContainer.html(headerRowHTML())

        //RECREATE MULTI RANGE ROWS
        for(var i = 0; i<rateRangeRowsArray.length; i++){
            var thisRowMap = rateRangeRowsArray[i]
            var rangeRow = $(moneyRangeInputHTML())

            var rateTypeDropdownOptions = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropdown-menu')
            var rateTypeButtonText = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropDownButtonText')
            var rateInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rateInput')
            var fromInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeStart')
            var toInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeEnd')
            var minPremInput = rangeRow.children('.rangeRateDiv').children('div').find('.minPremiumInput')
            var extraConditionInput = rangeRow.children('.rangeRateDiv').children('div').find('.extraConditionInput')

            //SET VALUES FOR RANGE ROW
            if(thisRowMap.hasOwnProperty('rateTypeDetail')){
                var buttonTextString = rateTypeDropdownOptions.find(".dropDownOption_Description[data-ratetypedetail='" + thisRowMap.rateTypeDetail + "']").closest('a').html()
                rateTypeButtonText.html(buttonTextString)
            }
            rateInput.val(thisRowMap.rateValue)
            fromInput.val(thisRowMap.from)
            toInput.val(thisRowMap.to)
            //console.log("RATE INFO MIN PREMIUM")
            //console.log(thisRowMap.minPrem)
            minPremInput.val(thisRowMap.minPrem)
            extraConditionInput.val(thisRowMap.extraCondition)


            //IF ADDITIONAL CONDITIONS EXIST FOR THIS LOB
            if(thisRowMap.hasOwnProperty('additionalRate')){
                //CHECK THE TERM LENGTH CONDITION
                // termLengthCheckbox.prop('checked', true)

                //RUN CHECKBOX CHANGE FUNCTION, TO CREATE ADDITIONAL CONDITION CONTAINER
                extraConditionInputChangeAction(extraConditionInput)
                var additionalConditionDiv = rangeRow.children('.additionalConditionDiv')

                //MAKE SURE CONTAINER IS EMPTY
                additionalConditionDiv.empty()

                disableRangeRateDiv(rateInput.closest('.rangeRateDiv'))

                //LOOP OVER ALL ADDITIONAL ROWS
                //console.log("ADDITIONAL ROWS")
                //console.log("DISABLE")
                //console.log(rateInput.closest('.rangeRateDiv'))

                var additionalRateRowsArray = thisRowMap.additionalRate[0].rateInfo
                for(var a=0; a<additionalRateRowsArray.length; a++){
                    var additionalRateInfoMap = additionalRateRowsArray[a]

                    //console.log(additionalRateInfoMap)

                    //GET NEW ROW AND APPLY SMALLER FORMATTING
                    var newRow = getFreshRangeRow(additionalConditionDiv)
                    newRow = applySmallerFormatToRow(newRow)

                    var rateTypeDropdownOptions = newRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropdown-menu')
                    var rateTypeButtonText = newRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropDownButtonText')
                    var rateInput = newRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rateInput')
                    var fromInput = newRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeStart')
                    var toInput = newRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeEnd')
                    var minPremInput = newRow.children('.rangeRateDiv').children('div').children('.minPremiumInput')
                    var extraConditionInput = newRow.children('.rangeRateDiv').children('div').find('.extraConditionInput')

                    //SET VALUES FOR RANGE ROW
                    if(additionalRateInfoMap.hasOwnProperty('rateTypeDetail')){
                        var buttonTextString = rateTypeDropdownOptions.find(".dropDownOption_Description[data-ratetypedetail='" + additionalRateInfoMap.rateTypeDetail + "']").closest('a').html()
                        //console.log(buttonTextString)
                        rateTypeButtonText.html(buttonTextString)
                    }
                    rateInput.val(additionalRateInfoMap.rateValue)
                    fromInput.val(additionalRateInfoMap.from)
                    toInput.val(additionalRateInfoMap.to)
                    minPremInput.val(additionalRateInfoMap.minPrem)

                    //APPEND NEW ROW TO SUB CONTAINER
                    additionalConditionDiv.append(newRow)
                }
                addRemoveRangeButtons(additionalConditionDiv)


                //FINALLY
                rangeRow.append(additionalConditionDiv)


            }

            multiRangeContainer.append(rangeRow)
        }
        addRemoveRangeButtons(multiRangeContainer)
    }
    else if(rateInfoMap.basisName === "termLength"){
        var rateRangeRowsArray = rateInfoMap.rateInfo

        var multiRangeContainer = $('#termLength_multiRangeContainer')

        //MAKE SURE RANGE CONTAINER IS EMPTY, TO RECREATE FROM SCRATCH
        multiRangeContainer.empty()
        //SETUP HEADER ROW
        multiRangeContainer.html(headerRowHTML_Days())

        //RECREATE MULTI RANGE ROWS
        for(var i = 0; i<rateRangeRowsArray.length; i++){
            var thisRowMap = rateRangeRowsArray[i]
            var rangeRow = $(moneyRangeInputHTML())

            var rateTypeDropdownOptions = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropdown-menu')
            var rateTypeButtonText = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropDownButtonText')
            var rateInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rateInput')
            var fromInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeStart')
            var toInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeEnd')
            var minPremInput = rangeRow.children('.rangeRateDiv').children('div').find('.minPremiumInput')
            var extraConditionInput = rangeRow.children('.rangeRateDiv').children('div').find('.extraConditionInput')

            //SET VALUES FOR RANGE ROW
            if(thisRowMap.hasOwnProperty('rateTypeDetail')){
                var buttonTextString = rateTypeDropdownOptions.find(".dropDownOption_Description[data-ratetypedetail='" + thisRowMap.rateTypeDetail + "']").closest('a').html()
                rateTypeButtonText.html(buttonTextString)
            }
            rateInput.val(thisRowMap.rateValue)
            fromInput.val(thisRowMap.from)
            toInput.val(thisRowMap.to)
            minPremInput.val(thisRowMap.minPrem)
            extraConditionInput.val(thisRowMap.extraCondition)


            //IF ADDITIONAL CONDITIONS EXIST FOR THIS LOB
            if(thisRowMap.hasOwnProperty('additionalRate')){
                //CHECK THE TERM LENGTH CONDITION
                // termLengthCheckbox.prop('checked', true)

                //RUN CHECKBOX CHANGE FUNCTION, TO CREATE ADDITIONAL CONDITION CONTAINER
                extraConditionInputChangeAction(extraConditionInput)
                var additionalConditionDiv = rangeRow.children('.additionalConditionDiv')

                //MAKE SURE CONTAINER IS EMPTY
                additionalConditionDiv.empty()

                disableRangeRateDiv(rateInput.closest('.rangeRateDiv'))

                //LOOP OVER ALL ADDITIONAL ROWS
                var additionalRateRowsArray = thisRowMap.additionalRate[0].rateInfo
                for(var a=0; a<additionalRateRowsArray.length; a++){
                    var additionalRateInfoMap = additionalRateRowsArray[a]

                    //console.log(additionalRateInfoMap)

                    //GET NEW ROW AND APPLY SMALLER FORMATTING
                    var newRow = getFreshRangeRow(additionalConditionDiv)
                    newRow = applySmallerFormatToRow(newRow)

                    var rateTypeDropdownOptions = newRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropdown-menu')
                    var rateTypeButtonText = newRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropDownButtonText')
                    var rateInput = newRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rateInput')
                    var fromInput = newRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeStart')
                    var toInput = newRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeEnd')
                    var minPremInput = newRow.children('.rangeRateDiv').children('div').children('.minPremiumInput')
                    var extraConditionInput = newRow.children('.rangeRateDiv').children('div').find('.extraConditionInput')

                    //SET VALUES FOR RANGE ROW
                    if(additionalRateInfoMap.hasOwnProperty('rateTypeDetail')){
                        var buttonTextString = rateTypeDropdownOptions.find(".dropDownOption_Description[data-ratetypedetail='" + additionalRateInfoMap.rateTypeDetail + "']").closest('a').html()
                        //console.log(buttonTextString)
                        rateTypeButtonText.html(buttonTextString)
                    }
                    rateInput.val(additionalRateInfoMap.rateValue)
                    fromInput.val(additionalRateInfoMap.from)
                    toInput.val(additionalRateInfoMap.to)
                    minPremInput.val(additionalRateInfoMap.minPrem)

                    //APPEND NEW ROW TO SUB CONTAINER
                    additionalConditionDiv.append(newRow)
                }
                addRemoveRangeButtons(additionalConditionDiv)


                //FINALLY
                rangeRow.append(additionalConditionDiv)


            }

            multiRangeContainer.append(rangeRow)
        }
        addRemoveRangeButtons(multiRangeContainer)
    }
    else if(rateInfoMap.basisName === "limits"){
        //LOOP THROUGH ALL LOB RATE INFOS
        $('#limits_TotalMinPremium').val(rateInfoMap.totalMinPrem)
        for (var property in rateInfoMap) {
            if (property.indexOf('lobRateInfo_') > -1 && rateInfoMap.hasOwnProperty(property)) {
                var tempMap = rateInfoMap[property]
                var lobName = tempMap.lobName
                var lobRateRangeRowsArray = tempMap.rateInfo
                var lobID = property.split('_')[1]

                //console.log(lobName)
                //console.log(tempMap)

                var lobRangeContainer = $('#rangeContainerLOB_' + lobID)

                //MAKE SURE RANGE CONTAINER IS EMPTY, TO RECREATE FROM SCRATCH
                lobRangeContainer.empty()
                //SETUP HEADER ROW
                lobRangeContainer.html(headerRowHTML_Limits())



                //RECREATE MAIN RANGE ROWS
                for(var i=0; i<lobRateRangeRowsArray.length; i++){
                    //console.log(lobRateRangeRowsArray[i])
                    var thisRowMap = lobRateRangeRowsArray[i]
                    var rangeRow = $(limitRangeInputHTML())

                    var rateTypeDropdownOptions = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropdown-menu')
                    var rateTypeButtonText = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropDownButtonText')
                    var rateInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rateInput')
                    var fromInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeStart')
                    var toInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeEnd')
                    var minPremInput = rangeRow.children('.rangeRateDiv').children('div').children('.input-group').children('.minPremiumInput')
                    var extraConditionInput = rangeRow.children('.rangeRateDiv').children('div').find('.extraConditionInput')

                    //SET VALUES FOR RANGE ROW
                    if(thisRowMap.hasOwnProperty('rateTypeDetail')){
                        var buttonTextString = rateTypeDropdownOptions.find(".dropDownOption_Description[data-ratetypedetail='" + thisRowMap.rateTypeDetail + "']").closest('a').html()
                        rateTypeButtonText.html(buttonTextString)
                    }
                    rateInput.val(thisRowMap.rateValue)
                    fromInput.val(thisRowMap.from)
                    toInput.val(thisRowMap.to)
                    minPremInput.val(thisRowMap.minPrem)
                    extraConditionInput.val(thisRowMap.extraCondition)

                    //IF ADDITIONAL CONDITIONS EXIST FOR THIS LOB
                    if(thisRowMap.hasOwnProperty('additionalRate')){
                        //CHECK THE TERM LENGTH CONDITION
                        // termLengthCheckbox.prop('checked', true)

                        //RUN CHECKBOX CHANGE FUNCTION, TO CREATE ADDITIONAL CONDITION CONTAINER
                        extraConditionInputChangeAction(extraConditionInput)
                        var additionalConditionDiv = rangeRow.children('.additionalConditionDiv')

                        //MAKE SURE CONTAINER IS EMPTY
                        additionalConditionDiv.empty()

                        disableRangeRateDiv(rateInput.closest('.rangeRateDiv'))

                        //LOOP OVER ALL ADDITIONAL ROWS
                        //console.log("ADDITIONAL ROWS")
                        //console.log("DISABLE")
                        //console.log(rateInput.closest('.rangeRateDiv'))

                        var additionalRateRowsArray = thisRowMap.additionalRate[0].rateInfo
                        for(var a=0; a<additionalRateRowsArray.length; a++){
                            var additionalRateInfoMap = additionalRateRowsArray[a]

                            //console.log(additionalRateInfoMap)

                            //GET NEW ROW AND APPLY SMALLER FORMATTING
                            var newRow = getFreshRangeRow(additionalConditionDiv)
                            newRow = applySmallerFormatToRow(newRow)

                            var rateTypeDropdownOptions = newRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropdown-menu')
                            var rateTypeButtonText = newRow.children('.rangeRateDiv').children('div').children('.input-group').find('.dropDownButtonText')
                            var rateInput = newRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rateInput')
                            var fromInput = newRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeStart')
                            var toInput = newRow.children('.rangeRateDiv').children('div').children('.input-group').children('.rangeEnd')
                            var minPremInput = newRow.children('.rangeRateDiv').children('div').children('.minPremiumInput')
                            var extraConditionInput = newRow.children('.rangeRateDiv').children('div').find('.extraConditionInput')

                            //SET VALUES FOR RANGE ROW
                            if(additionalRateInfoMap.hasOwnProperty('rateTypeDetail')){
                                var buttonTextString = rateTypeDropdownOptions.find(".dropDownOption_Description[data-ratetypedetail='" + additionalRateInfoMap.rateTypeDetail + "']").closest('a').html()
                                //console.log(buttonTextString)
                                rateTypeButtonText.html(buttonTextString)
                            }
                            rateInput.val(additionalRateInfoMap.rateValue)
                            fromInput.val(additionalRateInfoMap.from)
                            toInput.val(additionalRateInfoMap.to)
                            minPremInput.val(additionalRateInfoMap.minPrem)

                            //APPEND NEW ROW TO SUB CONTAINER
                            additionalConditionDiv.append(newRow)
                        }
                        addRemoveRangeButtons(additionalConditionDiv)


                        //FINALLY
                        rangeRow.append(additionalConditionDiv)


                    }

                    lobRangeContainer.append(rangeRow)

                }
                addRemoveRangeButtons(lobRangeContainer)

            }
        }

    }
    else if(rateInfoMap.basisName === "flatRate"){
        //console.log("FLAT RATE RATING")
        //console.log(rateInfoMap.rateInfo[0])

        var flatRateInfoMap = rateInfoMap.rateInfo[0]
        var flatRateType = flatRateInfoMap.rateType
        var flatRateValue = flatRateInfoMap.rateValue
        var rateTypeButtonText = $('#flatRate_FlatValue').siblings('.input-group-btn').find('.dropDownButtonText')

        var minPremiumVal = flatRateInfoMap.minPrem

        //console.log(flatRateType)
        rateTypeButtonText.html(flatRateType)
        $('#flatRate_FlatValue').val(flatRateValue)
        $('#flatRate_MinPremium').val(minPremiumVal)
    }
}

function rangeStartInputChangeAction(element){
    //ONLY PREPENDS RANGE ROWS WHEN THERE IS NO ROWS BEFORE
    var thisRangeRowElement = $(element).closest('.rangeRow')
    var thisRangeRowStartElement = $(thisRangeRowElement).find('.rangeStart')
    var thisRangeRowEndElement = $(thisRangeRowElement).find('.rangeEnd')
    var thisRangeRowStartValue = getIntValueOfMoney($(thisRangeRowStartElement).val().trim())
    var thisRangeRowEndValue = getIntValueOfMoney($(thisRangeRowEndElement).val().trim())

    //console.log("start change")
    //console.log(thisRangeRowStartValue)
    //console.log(thisRangeRowEndValue)
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

    var thisRangeRowElement = $(element).closest('.rangeRow')
    var thisRangeRowStartElement = $(thisRangeRowElement).find('.rangeStart')
    var thisRangeRowEndElement = $(thisRangeRowElement).find('.rangeEnd')
    var thisRangeRowStartValue = getIntValueOfMoney($(thisRangeRowStartElement).val().trim())
    var thisRangeRowEndValue = getIntValueOfMoney($(thisRangeRowEndElement).val().trim())


    //MAKE SURE ENDING RANGE VALUE IS GREATER THAN EXISTING RANGE START VALUE
    //IF NEW ENDING RANGE VALUE IS LOWER OR EQUAL TO RANGE START VALUE, ADJUST START VALUE AND PREVIOUS VALUES
    if(thisRangeRowEndValue > thisRangeRowStartValue ||
        $(thisRangeRowEndElement).val().toLowerCase().trim() === "any"){

    }
    else{
        thisRangeRowStartElement.val(formatRangeNum(element,thisRangeRowEndValue - 1))
        adjustPrevRangeRows(element)
    }

    //IF NO RANGE ROW AFTER THIS ONE
    if( thisRangeRowElement.next('.rangeRow').length === 0 ) {

        //IF THE CHANGED "RANGE END INPUT" IS "ANY", SET THE FIRST AND LAST RANGE INPUTS TO '0' AND 'ANY'
        if( $(element).val() === "Any" || $(element).val() === "any"){
            setFirstAndLastRange(element)
        }
        //IF NOT, ADD ANOTHER ROW AFTER THIS
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
        newRow.children('.rangeRateDiv').find('.extraConditionInput').remove()
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
        newRow.children('.rangeRateDiv').find('.extraConditionInput').remove()
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
           //console.log("before recurse")
           //console.log(rangeRowEndElement.val())
            if( nextRangeRowRangeStartElement.hasClass('rangeStart') && rangeRowEndElement.val() != "Any" ){
               //console.log("in recurse")
                var rangeRowEndValue = formatRangeNum(element,rangeRowStartValue+1)
               //console.log(rangeRowEndElement)
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

    //console.log("Clean UP")
    //console.log(multiRangeContainer)
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
               //console.log( $(prevRow).children('.rangeRateDiv').find('.rangeEnd').val() )
               //console.log( getIntValueOfMoney( $(prevRow).children('.rangeRateDiv').find('.rangeEnd').val().trim() ) )
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
                $(this).children('.rangeRateDiv').find('.removeButtonColumn').html(removeButtonHTML())
            }
        }

        //IF THERE IS A SUBRATE UNDER THIS ROW, DISABLE MAIN RATE SO ONLY THE SUBRATES ARE VALID
        if($(thisRow).children('.multiRangeContainer').length > 0 ){
            disableRangeRateDiv(rateInputElement.closest('.rangeRateDiv'))
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
    // var removeButtonString = "" +
    //     "<button class='btn btn-xs btn-danger rangeRemoveButton' type='button' style=''> " +
    //     "<span class='' style=''>remove</span>" +
    //     "</button>"

    var removeButtonString = "" +
        "<button class='btn btn-xs rangeRemoveButton close' aria-label='Close'><span aria-hidden='true'>×</span></button>"
    return removeButtonString
}
function addRemoveRangeButtons(element){
    var removeButtonString = removeButtonHTML()
    var multiRangeContainer = $(element).closest('.multiRangeContainer')

    ////console.log( $(multiRangeContainer).children('.rangeRow').children('.rangeRateDiv') )
    $(multiRangeContainer).children('.rangeRow').children('.rangeRateDiv').each(function(i){
        if(i===0
            // || i === ( $(multiRangeContainer).children('.rangeRow').children('.rangeRateDiv').length - 1)
        ){

        }
        else{
            if( $(this).find('.rangeRemoveButton').length === 0 ){
                $(this).find('.removeButtonColumn').html(removeButtonString)
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
    //console.log("REMOVVE")
    //console.log(container)

    $(element).closest('.rangeRow').remove()

    cleanUpRanges($(container))

}

function disableRateInput(rateInputElement){
    $(rateInputElement).val("-")
    $(rateInputElement).prop('disabled', true)
}

function disableRangeRateDiv(thisRangeRateDiv){
    var rateInput = $(thisRangeRateDiv).children('div').children('.input-group').find('.rateInput')
    var rangeStartInput = $(thisRangeRateDiv).children('div').children('.input-group').find('.rangeStart')
    var rangeEndInput = $(thisRangeRateDiv).children('div').children('.input-group').find('.rangeEnd')
    var minPremInput = $(thisRangeRateDiv).children('div').children('.minPremiumInput')

    rateInput.val("-")
    $(rateInput).prop('disabled', true)

    minPremInput.val("None")
    $(minPremInput).prop('disabled', true)

}
function enableRateInput(rateInputElement){
    $(rateInputElement).val("0")
    maskRate( $(rateInputElement) )

    $(rateInputElement).prop('disabled', false)
}

function extraConditionInputChangeAction(element){
    var rangeRowContainer = $(element).closest('.rangeRow')

    $(rangeRowContainer).find('.additionalConditionDiv').remove()

    if($(element).val() === 'termLength' || $(element).val() === 'Term Length'){
        if( $(rangeRowContainer).children('.additionalConditionDiv').length === 0 ){
            var newMultiRangeContainer

            if( $(element).closest('.multiRangeContainer').hasClass('limits') ){
                var lobID = $(element).closest('.multiRangeContainer.limits').attr('data-lobid')
                var lobName = $(element).closest('.multiRangeContainer.limits').attr('data-lobname')
                newMultiRangeContainer = $(
                    "<div class='row additionalConditionDiv multiRangeContainer days' id='additionalRangeContainerLOB_" + lobID + "' " +
                    "       data-lobid='" + lobID + "' data-lobname='" + lobName + "' style='padding-top:8px; padding-bottom:16px;'>" +
                    "</div> "
                );
            }
            else{
                newMultiRangeContainer = $(
                    "<div class='row additionalConditionDiv multiRangeContainer days' style='padding-top:8px; padding-bottom:16px;'>" +
                    "</div> "
                );
            }

            $(rangeRowContainer).append(newMultiRangeContainer)

            initializeNewMultiRange(newMultiRangeContainer, "days", $(element).val())

            var rateInputElement = $(rangeRowContainer).children('.rangeRateDiv').find('.rateInput')
            disableRangeRateDiv(rateInputElement.closest('.rangeRateDiv'))

            $(newMultiRangeContainer).children('.rangeRow').children('.rangeRateDiv').find('.extraConditionInput').remove()
        }

    }
    else if($(element).val() === 'budgetAggregate' || $(element).val() === 'Budget (Aggregate)'){
        var rangeRowContainer = $(element).closest('.rangeRow')

        if( $(rangeRowContainer).children('.additionalConditionDiv').length === 0 ){
            var newMultiRangeContainer

            if( $(element).closest('.multiRangeContainer').hasClass('limits') ){
                var lobID = $(element).closest('.multiRangeContainer.limits').attr('data-lobid')
                var lobName = $(element).closest('.multiRangeContainer.limits').attr('data-lobname')
                newMultiRangeContainer = $(
                    "<div class='row additionalConditionDiv multiRangeContainer money' id='additionalRangeContainerLOB_" + lobID + "' " +
                    "       data-lobid='" + lobID + "' data-lobname='" + lobName + "' style='padding-top:8px; padding-bottom:16px;'>" +
                    "</div> "
                );
            }
            else{
                newMultiRangeContainer = $(
                    "<div class='row additionalConditionDiv multiRangeContainer money' style='padding-top:8px; padding-bottom:16px;'>" +
                    "</div> "
                );
            }

            $(rangeRowContainer).append(newMultiRangeContainer)

            initializeNewMultiRange(newMultiRangeContainer, "money", $(element).val())

            var rateInputElement = $(rangeRowContainer).children('.rangeRateDiv').find('.rateInput')
            disableRangeRateDiv(rateInputElement.closest('.rangeRateDiv'))

            $(newMultiRangeContainer).children('.rangeRow').children('.rangeRateDiv').find('.extraConditionInput').remove()
        }
    }
    else{
        //IF NOT CHECKED REMOVE AND DESTROY ADDITIONAL OPTIONS
        $(rangeRowContainer).find('.additionalConditionDiv').remove()
        var rateInputElement = $(rangeRowContainer).children('.rangeRateDiv').find('.rateInput')
        enableRateInput(rateInputElement)
    }


}

function formatRangeNum(element, i){
    var multiRangeContainer = $(element).closest('.multiRangeContainer')

    if($(multiRangeContainer).hasClass('money') ){
        //console.log(i)
        return formatMoney(i)
    }
    else if( $(multiRangeContainer).hasClass('days') ){
        return i
    }
    else if( $(multiRangeContainer).hasClass('limits') ){
        return formatMoney(i)
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
    else if( $(multiRangeContainer).hasClass('limits') ){
        return 'moneyInput'
    }
}
function getFreshRangeRow(element){
    var multiRangeContainer = $(element).closest('.multiRangeContainer')

    var freshRow

    if($(multiRangeContainer).hasClass('money') ){
        freshRow = $(moneyRangeInputHTML())
        $(freshRow).find('.allRangeStart').removeClass('allRangeStart')
        $(freshRow).find('.allRangeEnd').removeClass('allRangeEnd')

        return freshRow
    }
    else if( $(multiRangeContainer).hasClass('limits') ){
        freshRow = $(limitRangeInputHTML())
        $(freshRow).find('.allRangeStart').removeClass('allRangeStart')
        $(freshRow).find('.allRangeEnd').removeClass('allRangeEnd')

        return freshRow
    }
    else if( $(multiRangeContainer).hasClass('days') ){
        freshRow = $(daysRangeInputHTML())
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
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-addon').css('height', '24px')
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-btn .dropdown-toggle').css('font-size', '10px')
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-btn .dropdown-toggle').css('height', '24px')
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-btn .dropdown-toggle').css('padding', '2px 4px')
    $(newMultiRangeRow).children('.rangeRateDiv').find('.input-group-btn ').css('line-height', '0')



    //MAKE TEXT AND OTHER DIVS SMALLER
    $(newMultiRangeRow).children('.rangeRateDiv').children('.div').css('height', '24px')
    $(newMultiRangeRow).children('.rangeRateDiv').children('div.col-xs-1').css('line-height', '2em')
    $(newMultiRangeRow).children('.rangeRateDiv').children('div.col-xs-1').css('font-size', '11px')


    //ADD PADDING TO FIRST INPUT ON LEFT TO SHOW INDENT
    $(newMultiRangeRow).children('.rangeRateDiv').children('.col-xs-3').css('padding-left', '2px')

    $(newMultiRangeRow).children('.rangeRateDiv').children().first().css('padding-left', '35px')
    $(newMultiRangeRow).children('.rangeRateDiv').children().first().find('input').css('font-size', '11px')
    $(newMultiRangeRow).children('.rangeRateDiv').children().first().find('input').css('padding', '5px')

    return newMultiRangeRow
}
function applySmallerFormatToRemoveButton(removeButton){
    // $(removeButton).css('font-size', '10px')
    // $(removeButton).parent().css('line-height', '2em')


    return removeButton
}
function maskRate(jqueryObject){
   //console.log("masking percent")
   //console.log()
    //ONLY FORMAT IF NO PERCENT SIGN
    if( $(jqueryObject).hasClass('percentInput')){
        if($(jqueryObject).val().indexOf("%") != $(jqueryObject).val().length-1){
            $(jqueryObject).val(numeral($(jqueryObject).val()).format('0.0[0000]') + "%")
        }

    }
}


function buildRateInfoMap(rangeContainer, basis){
    var rateInfoMap = {}
    var rateInfoArray = []
    var multiRangeContainer;

    rateInfoMap.basisName = basis

    if(basis === "gpc" || basis === "termLength" || basis === "budgetAgg"){
        //FIND ACTUAL RATE CONTAINER
        if ( $(rangeContainer).hasClass('multiRangeContainer') ){
            multiRangeContainer = $(rangeContainer)
        }
        else{
            multiRangeContainer = $(rangeContainer).find('.multiRangeContainer').first()
        }


        //LOOP THROUGH EACH RANGE ROW
        $(multiRangeContainer).children('.rangeRow').each(function(){
            var thisRangeRateInfo = {}
            var thisRowRangeRateDiv = $(this).children('.rangeRateDiv')
            var thisRangeRowStartValue = $(thisRowRangeRateDiv).find('.rangeStart').val()
            var thisRangeRowEndValue = $(thisRowRangeRateDiv).find('.rangeEnd').val()
            var thisRangeRowRateValue = $(thisRowRangeRateDiv).find('.rateInput').val()
            var thisRangeRowMinPrem = $(thisRowRangeRateDiv).find('.minPremiumInput').val()
            var thisRangeRowRateType = $(thisRowRangeRateDiv).find('.dropDownOption_Description').attr('data-ratetype')
            var thisRangeRowRateTypeDetail = $(thisRowRangeRateDiv).find('.dropDownOption_Description').attr('data-ratetypedetail')
            var thisRangeRowExtraCondition = $(thisRowRangeRateDiv).find('.extraConditionInput').val()
            if(thisRangeRowExtraCondition === undefined){
                thisRangeRowExtraCondition = "none"
            }
            else if(thisRangeRowExtraCondition.trim() === "Term Length"){
                thisRangeRowExtraCondition = "termLength"
            }
            else if(thisRangeRowExtraCondition.trim() === "Budget (Aggregate)"){
                thisRangeRowExtraCondition = "budgetAgg"
            }

            // if( $(thisRowRangeRateDiv).find('.dropDownOption_Description').hasClass('fa-usd') ){
            //     thisRangeRowRateType = "premium"
            // }
            // else if( $(thisRowRangeRateDiv).find('.dropDownButtonText i').hasClass('fa-percent') ){
            //     thisRangeRowRateType = "percent"
            // }
            // else if( $(thisRowRangeRateDiv).find('.dropDownButtonText i').hasClass('fa-pencil') ){
            //     thisRangeRowRateType = "custom"
            // }

            thisRangeRateInfo.from = thisRangeRowStartValue
            thisRangeRateInfo.to = thisRangeRowEndValue
            thisRangeRateInfo.rateValue = thisRangeRowRateValue
            thisRangeRateInfo.rateType = thisRangeRowRateType
            thisRangeRateInfo.rateTypeDetail = thisRangeRowRateTypeDetail
            thisRangeRateInfo.minPrem = thisRangeRowMinPrem
            thisRangeRateInfo.extraCondition = thisRangeRowExtraCondition


            //IF THIS IS A LOB LIMIT ADDITIONAL CONDITION
            if( typeof $(rangeContainer).attr('data-lobid') !== typeof undefined && $(rangeContainer).attr('data-lobid') !== false ){
                var lobID = $(rangeContainer).attr('data-lobid')
                var lobName = $(rangeContainer).attr('data-lobname')

                thisRangeRateInfo.lobID = lobID
            }

            //IF THIS RANGERATE HAS ADDITIONAL RATING OPTIONS
            if($(this).children('.additionalConditionDiv').length > 0){
                var additionalRateRangeContainer = $(this).children('.additionalConditionDiv')
                //console.log("Additional:")
                //console.log(additionalRateRangeContainer)
                var tempArray = []
                //console.log("BUILD RATE INFO EXTRA CONDITION")
                //console.log(thisRangeRowExtraCondition)
                $(additionalRateRangeContainer).each(function(){
                    tempArray.push(buildRateInfoMap(this, thisRangeRowExtraCondition))
                })
                thisRangeRateInfo.additionalRate = tempArray
            }
            rateInfoArray.push(thisRangeRateInfo)
        })

        rateInfoMap.rateInfo = rateInfoArray
    }
    else if(basis === "flatRate"){
        var rateMap = {}
        rateMap.rateType = $('#flatRate_RatingOptionsContainer .dropDownButtonText').html().trim()
        if(rateMap.rateType === "Flat Rate"){
            rateMap.rateValue = $('#flatRate_FlatValue').val()
            rateMap.minPrem = $('#flatRate_MinPremium').val()
        }
        else if(rateMap.rateType === "Flat Premium"){
            rateMap.rateValue = $('#flatRate_FlatValue').val()
            rateMap.minPrem = $('#flatRate_MinPremium').val()

        }
        rateInfoArray.push(rateMap)

        rateInfoMap.rateInfo = rateInfoArray
    }
    else if(basis === "limits"){
        //FIND ALL MULTIRANGE CONTAINERS
        rateInfoMap.totalMinPrem = $('#limits_TotalMinPremium').val()
        $('#limitRatingLOBRangeContainer > div > div.col-xs-12 > .multiRangeContainer').each(function(c){
            var thisRateInfoArray = []
            var multiRangeContainer = $(this)
            var lobName = $(this).closest('.lobRateInfoContainer').find('.lobStringDisplay').html().trim()
            var lobID = $(this).attr('data-lobid')

            var limit_RateInfoMap = {}
            limit_RateInfoMap.lobName = lobName

            //LOOP THROUGH EACH RANGE ROW
            $(multiRangeContainer).children('.rangeRow').each(function(){
                var thisRangeRateInfo = {}
                var thisRowRangeRateDiv = $(this).children('.rangeRateDiv')
                var thisRangeRowStartValue = $(thisRowRangeRateDiv).find('.rangeStart').val()
                var thisRangeRowEndValue = $(thisRowRangeRateDiv).find('.rangeEnd').val()
                var thisRangeRowRateValue = $(thisRowRangeRateDiv).find('.rateInput').val()
                var thisRangeRowMinPrem = $(thisRowRangeRateDiv).find('.minPremiumInput').val()
                var thisRangeRowRateType = $(thisRowRangeRateDiv).find('.dropDownOption_Description').attr('data-ratetype')
                var thisRangeRowRateTypeDetail = $(thisRowRangeRateDiv).find('.dropDownOption_Description').attr('data-ratetypedetail')
                var thisRangeRowExtraCondition = $(thisRowRangeRateDiv).find('.extraConditionInput').val()
                if(thisRangeRowExtraCondition === undefined){
                    thisRangeRowExtraCondition = "none"
                }
                else if(thisRangeRowExtraCondition.trim() === "Term Length"){
                    thisRangeRowExtraCondition = "termLength"
                }
                else if(thisRangeRowExtraCondition.trim() === "Budget (Aggregate)"){
                    thisRangeRowExtraCondition = "budgetAgg"
                }

                if( $(thisRowRangeRateDiv).find('.dropDownButtonText i').hasClass('fa-usd') ){
                    thisRangeRowRateType = "premium"
                }
                else if( $(thisRowRangeRateDiv).find('.dropDownButtonText i').hasClass('fa-percent') ){
                    thisRangeRowRateType = "percent"
                }
                else if( $(thisRowRangeRateDiv).find('.dropDownButtonText i').hasClass('fa-pencil') ){
                    thisRangeRowRateType = "custom"
                }

                thisRangeRateInfo.from = thisRangeRowStartValue
                thisRangeRateInfo.to = thisRangeRowEndValue
                thisRangeRateInfo.rateValue = thisRangeRowRateValue
                thisRangeRateInfo.rateType = thisRangeRowRateType
                thisRangeRateInfo.rateTypeDetail = thisRangeRowRateTypeDetail
                thisRangeRateInfo.minPrem = thisRangeRowMinPrem
                thisRangeRateInfo.lobID = lobID
                thisRangeRateInfo.extraCondition = thisRangeRowExtraCondition

                //IF THIS RANGERATE HAS ADDITIONAL RATING OPTIONS
                if($(this).children('.additionalConditionDiv').length > 0){
                    var additionalRateRangeContainer = $(this).children('.additionalConditionDiv')
                    //console.log("Additional:")
                    //console.log(additionalRateRangeContainer)
                    var tempArray = []
                    $(additionalRateRangeContainer).each(function(){
                        tempArray.push(buildRateInfoMap(this, "termLength"))
                    })
                    thisRangeRateInfo.additionalRate = tempArray
                }
                thisRateInfoArray.push(thisRangeRateInfo)
            })

            limit_RateInfoMap.rateInfo = thisRateInfoArray
            rateInfoMap['lobRateInfo_' + lobID] = limit_RateInfoMap
        })
    }







    //console.log("RATING INFO MAP")
    //console.log(rateInfoMap)

    return rateInfoMap
}

function runRatePreview(){
    //GET PRIMARY RATING BASIS
    var primaryRatingBasis = $('#primaryRateBasisSelect').val()

    //GET RATE INFO AND FORMAT IT
    var rateContainer = $('#' + primaryRatingBasis + "_RatingOptionsContainer")
    var rateInfoMap = buildRateInfoMap(rateContainer, primaryRatingBasis)

    //GET TEST POLICY BUDGET AND TERM INFO
    var policyInfoMap = {}
    policyInfoMap.gpc = getIntValueOfMoney($('#' + primaryRatingBasis + '_TestInput').val())
    policyInfoMap.termLength = parseInt( $('#' + primaryRatingBasis + '_TermLengthInput').val() )

    if(primaryRatingBasis === "limits"){
        $('.lobLimitInput').each(function(){
            var tempMap = {}
            tempMap.lobID = $(this).attr('data-lobID')
            tempMap.limitValue = $(this).val()
            tempMap.limitName = $(this).attr('data-lobName')
            tempMap.gpc = policyInfoMap.gpc
            tempMap.termLength = policyInfoMap.termLength

            policyInfoMap['lob_' + $(this).attr('data-lobID')] = tempMap
        })
    }


    var isPrimary = true
    var totalPremiumAndDetail = getTotalPremiumAndDetail(rateInfoMap, policyInfoMap, isPrimary);
    // $('#gpc_rateActualDisplay').html(additionalRate/100)
    $('#' + primaryRatingBasis + '_PremiumPreview').html(formatMoney(totalPremiumAndDetail.detail))
}

//QUICK TESTS TO RUN AFTER EVERY CHANGE OR UPDATE
function runTests(){
    var testsPassed = true;
    try{
        //LOOK FOR ALL MULTI RANGE INSTANCES
        var multiRangeContainers = $('.multiRangeContainer:visible')

        //LOOP THROUGH EACH MULTI RANGE CONTAINERS
        $(multiRangeContainers).each(function(i){

            var thisContainer = $(this)

            //EACH CONTAINER SHOULD HAVE ONE HEADER ROW
            if($(thisContainer).children('.headerRow').length > 1){
                testsPassed = false;
                //console.log("ERROR: MORE THAN ONE HEADER ROW FOR CONTAINER FOUND")
                //console.log($(thisContainer).children('.headerRow').length)
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
                        //console.log("ERROR: FIRST RANGE VALUE OF ALL RANGES SHOULD BE 0")
                        //console.log(firstVal)
                    }
                }

                //IF LAST ROW IT SHOULD END WITH ANY
                if(j=== ($(thisContainerRangeRows).length -1) ){
                    var lastVal = $(thisRangeRow).children('.rangeRateDiv').find('.rangeEnd.allRangeEnd').val()
                    //console.log(lastVal)
                    if(lastVal.toLowerCase() != "any" ){
                        testsPassed = false;
                        //console.log("ERROR: LAST RANGE VALUE OF ALL RANGES SHOULD BE ANY")
                        //console.log(firstVal)
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
                        //console.log("ERROR: RANGE GAP")
                        //console.log(getIntValueOfMoney( $(rangeEndInputElement).val() ) + " AND " + (nextRowRangeStartValue-1) )
                        //console.log( thisRangeRow)
                    }
                }


            })


        })
        if(testsPassed){
            //console.log("TESTS PASSED")
        }
        else{
            //console.error("TESTS FAILED")
        }

    }
    catch(e){
        //console.error("MULTIRANGE TEST FAIL")
        //console.error("Error", e.stack);
        //console.error("Error", e.name);
        //console.error("Error", e.message);
    }

}