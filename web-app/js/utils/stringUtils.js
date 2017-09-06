
function capitalizeFirstLetters(originalString){
    var nameString = originalString;
    //nameString = $(this).val().charAt(0).toUpperCase() + nameString.slice(1);
    var words = [];

    if(nameString.split(" ").length>0){
        words = nameString.split(" ");
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
        //console.log(lowerWord)
        if (originalWord.slice(1, 2) == originalWord.slice(1, 2).toUpperCase() || originalWord.slice(2, 3) == originalWord.slice(2, 3).toUpperCase()) {
            //console.log(lowerWord.slice(1,2) + "-" + lowerWord)
            capitalizedWord = originalWord.trim();
        }
        else {
            capitalizedWord = lowerWord.slice(0, 1).toUpperCase() + lowerWord.slice(1);
        }

        output += capitalizedWord;
        if (i != words.length - 1) {
            output += " ";
        }
    } //for
    output[output.length - 1] = '';

    return output
}

function formatMoney(value) {
    // console.log("value=" + value);

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