function capitalizeFirstLetters(originalString){
    var nameString = originalString;

    var words = [];

    //SPLIT STRING BY ANY WHITESPACE
    if(nameString.split(/\s+/g).length>0){
        words = nameString.split(/\s+/g);
    }
    else{
        words.push(nameString);
    }

    var output = "";
    var originalWord = "";
    for (i = 0; i < words.length; i++) {
        originalWord = words[i];
        lowerWord = words[i].toLowerCase();
        lowerWord = lowerWord.trim();

        //TEST IF THE SECOND OR THIRD LETTER IS CAPITALIZED, MIGHT BE A ALL CAPS WORD OR NAME LIKE 'McPherson'
        if (lowerWord.length > 1 && originalWord.slice(1, 2) == originalWord.slice(1, 2).toUpperCase()  ) {

            //DON'T CAPITALIZE
            capitalizedWord = originalWord.trim();
        }
        else if( lowerWord.length > 2 && originalWord.slice(2, 3) == originalWord.slice(2, 3).toUpperCase() ){
            //DON'T CAPITALIZE
            capitalizedWord = originalWord.trim();
        }
        else {

            //CAPITALIZE FIRST LETTER
            capitalizedWord = lowerWord.slice(0, 1).toUpperCase() + lowerWord.slice(1);
        }

        output += capitalizedWord;
        if (i != words.length - 1) {
            output += " ";
        }
    } //for
    // output[output.length - 1] = '';

    return output
}

function formatMoney(value) {
    // console.log("value=" + value);

    if(value !== undefined){
        if (isNaN(parseFloat(value))) {
            if(value.indexOf("incl") > -1 || value.indexOf("Incl") > -1){
                return value;
            }
            if (value.substring(0, 1) === "\$") {
                value = value.replace("$", "");
                value = ("$" + value + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                return value + "";
            }
            else {
                return value + "";
            }
        }
        else {
            if (("" + value).indexOf("%") > -1) {
                return value + "";
            }
            else {
                var floatValue = parseFloat(value);
                floatValue = Math.ceil(floatValue)
                return ("$" + floatValue + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    }
    else{
        return undefined
    }

}

function formatTaxAndFee(value) {
    if (isNaN(parseFloat(value))) {
        if (value.substring(0, 1) === "\$") {
            value = value.replace("$", "");
            value = ("$" + value + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            return value + "";
        }
        else {
            return value + "";
        }
    }
    else {
        if (("" + value).indexOf("%") > -1) {
            return value + "";
        }
        else {
            var floatValue = parseFloat(value);
            floatValue = floatValue.toFixed(2);
            return ("$" + floatValue + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}

function removeAllNonNumbersFromString(string){
    return string.replace(/\D/g,'');
}

function getIntValueOfMoney(moneyStringWithSignsAndCommas){
    var returnVal

    //CHECK IF STRING
    if(typeof moneyStringWithSignsAndCommas === "string"){
        //IF STRING IS NOT A NUMBER
        if(isNaN( moneyStringWithSignsAndCommas.replace(/\$|,/g, '') )){
            returnVal = "Error"
        }
        //IF STRING IS A NUMBER
        else{
            returnVal = parseInt(moneyStringWithSignsAndCommas.replace(/\$|,/g, ''))
        }
        returnVal = parseInt(moneyStringWithSignsAndCommas.replace(/\$|,/g, ''))
    }
    //CHECK IF INT
    else if(typeof moneyStringWithSignsAndCommas === "number"){
        if( Number.isInteger(moneyStringWithSignsAndCommas) ){
            returnVal = moneyStringWithSignsAndCommas
        }
        else{
            returnVal = parseInt(moneyStringWithSignsAndCommas)
        }
    }

    return returnVal
}

function getFloatValueOfMoney(moneyStringWithSignsAndCommas){
    var returnVal

    //CHECK IF STRING
    if(typeof moneyStringWithSignsAndCommas === "string"){
        //IF STRING IS NOT A NUMBER
        if(isNaN( moneyStringWithSignsAndCommas.replace(/\$|,/g, '') )){
            returnVal = "Error"
        }
        //IF STRING IS A NUMBER
        else{
            returnVal = parseFloat(moneyStringWithSignsAndCommas.replace(/\$|,/g, ''))
        }
        returnVal = parseFloat(moneyStringWithSignsAndCommas.replace(/\$|,/g, ''))
    }
    //CHECK IF NUMBER
    else if(typeof moneyStringWithSignsAndCommas === "number"){
        returnVal = parseFloat(moneyStringWithSignsAndCommas)
    }

    return returnVal
}

function getDoubleValueOfMoney(moneyStringWithSignsAndCommas){
    return parseFloat(moneyStringWithSignsAndCommas.replace(/\$|,/g, ''))
}

function getDoubleValueOfPercent(percentStringWithSign){
    return parseFloat(percentStringWithSign.replace('%', ''))
}

function splitByLine(string){
    var re=/\r\n|\n\r|\n|\r/g;

    return string.replace(re,"\n").split("\n");
}

function escapeDataAttributeValue(dataValueString){
    var escapedString = dataValueString
    //ESCAPE AMPERSANDS
    escapedString = escapedString.replace(/&/g,"&amp;")

    //ESCAPE DOUBLE QUOTES
    escapedString = escapedString.replace(/"/g, "&quot;")

    return escapedString
}

function replaceEachSpaceWith(originalString, charToReplaceSpace){
    //REPLACES EACH INSTANCE OF A WHITE SPACE WITH A CHAR OR STRING
    return originalString.replace(/\s/g, charToReplaceSpace)
}

function replaceAllSpacesWith(originalString, charToReplaceSpace){
    //REPLACES A SINGLE OR MULTIPEL WHITESPACE WITH A CHAR OR STRING
    return originalString.replace(/\s+/g, charToReplaceSpace)
}

function removeAllSpaces(originalString){
    return originalString.replace(/\s+/g, '')
}

function removeTrailingComma(string){
    return string.replace(/,\s*$/, "");
}

function isStringMoney(str){
    var origString = str.trim()

    //DOES THE STRING HAVE A DOLLAR SIGN
    if( origString.charAt(0) === '$' ){
        //IF STRING HAS LETTERS, RETURN FALSE
        if (origString.match(/[a-z]/i)) {
            return false
        }
        //IF INT VALUE OF MONEY STRING IS A NUMBER
        else if( isNaN(getIntValueOfMoney(origString)) === false ){
            return true
        }
    }
    else{
        return false
    }
}

function filterArrayForDuplicates(arrArg) {
    return arrArg.filter(function(elem, pos,arr) {
        return arr.indexOf(elem) == pos;
    });
};
