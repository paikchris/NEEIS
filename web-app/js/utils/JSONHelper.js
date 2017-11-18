

function jsonStringToObject(stringJSON){
    var returnJSON
    //TEST IF THIS LEVEL IS JSON ARRAY OR JSON MAP

    var arrayOrMap
    try {
        arrayOrMap = JSON.parse(stringJSON)
    }
    catch(e){
        return stringJSON
    }

    if(Array.isArray(arrayOrMap)){
        returnJSON = []
        var jsonArray = arrayOrMap

        //IF THE STRING GIVEN WAS AN ARRAY IT SHOULD HOLD OBJECTS/MAPS ONLY. ITERATE THROUGH THE ARRAY
        for(var i=0; i<jsonArray.length; i++){
            var map = jsonArray[i]

            try{
                returnJSON.push(map)
            }
            catch(e){
                returnJSON.push( map)
            }

        }
    }
    else{
        returnJSON = {}
        var jsonMap = arrayOrMap
        var keysArray = Object.keys(jsonMap)

        for(var j=0; j<keysArray.length; j++){
            var property = keysArray[j]
            var value = jsonMap[ keysArray[j] ]

            try{
                returnJSON[property] = value
            }
            catch(e){
                returnJSON[property] = value
            }

        }
    }

    return returnJSON

}