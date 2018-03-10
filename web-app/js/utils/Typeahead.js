/*
//TYPEAHEAD SETUP
var options = {
            element: $(".typeahead[data-ttid='questions']"),
            url: '/Data/typeaheadData_Questions',
            dataSearchKey:'questionText',
            displayKey: 'questionID',
            selectListener: function(typeaheadInputElement, event, dataObj, datasetName){
                $(typeaheadInputElement).typeahead('val', dataObj.questionID)
            }

        }
 new Typeahead(options)
 var placeHolderTypeAhead = new Typeahead(options)
 */

function Typeahead(options){
    //THIS OBJECT SHOULD STORE INFO ABOUT A INPUTS TYPEAHEAD INFO
    this.element = (options && options.element ? options.element : '' )
    this.data = (options && options.data ? options.data : [] )//SHOULD BE AN ARRAY OF OBJECTS
    this.dataSearchKey = (options && options.dataSearchKey ? options.dataSearchKey : '' ) //WHICH KEY TO USE IN SUGGESTIONS
    this.displayKey = (options && options.displayKey ? options.displayKey : '' ) //WHICH KEY TO USE AFTER SELECT AND IN THE INPUT
    this.url = (options && options.url ? options.url : '' )

    this.selectListener = (options && options.selectListener ? options.selectListener : '' ) //FUNCTION THAT RUNS ON SUGGESTION SELECT
    this.displayFunction = (options && options.selectListener ? options.selectListener : '' )

    var dataSearchKey = this.dataSearchKey

    this.setElement = function(element){
        this.element = element
    }
    this.setData = function(data){
        this.data = data
    }
    this.setUrl = function(url){
        this.url = url
    }

    this.typeAheadMatcher = function(objectArray) {
        var thisTypeahead = this
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
                matches = [];

            // regex used to determine if a string contains the substring `q`
            var substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array

            //ARRAY OF OBJECTS
            var stringToTest
            $.each(objectArray, function(index, dataObj) {
                //iterate over all objects
                stringToTest = dataObj[dataSearchKey]

                if (substrRegex.test(stringToTest)) {
                    // matches.push(str);
                    matches.push(dataObj)
                }
            });

            cb(matches);
        };
    }

    this.getData = function(doneFunction){
        var thisTypeahead = this

        $.ajax({
            method: "POST",
            url: this.url,
            data: {
            }
        })
            .done(function(msg) {
                if(msg === "Error"){
                }
                else{
                    thisTypeahead.data = jsonStringToObject(msg)
                    // thisTypeahead.filterData()
                    thisTypeahead.initTypeaheadInput()
                }
            });
    }
    this.filterData = function(){

        // for(var i=0;i<this.data.length;i++){
        //     var thisObject = this.data[i]
        //
        //     thisObject[this.displayKey] = thisObject[this.dataSearchKey]
        //
        //     this.data[i] = thisObject
        // }
    }


    this.initTypeaheadInput = function(options){
        var options = {
            hint: true,
            highlight: true,
            displayKey: this.dataSearchKey,
            minLength: 1,
            typeaheadObj: this
        }

        $(this.element).typeahead(options, {
            name: 'name',
            source: this.typeAheadMatcher(this.data),
            display: function(dataObj){
                return dataObj[dataSearchKey]
            }

        })
    }
    this.initListeners = function(){
        var thisTypeahead = this

        $(this.element).bind('typeahead:select', function(obj, datum, name) {
            thisTypeahead.selectListener(this, obj, datum, name) //RUN THIS TYPEAHEADS SELECT FUNCTION
        });
    }
    this.init = function(){
        this.getData()
    }


    //INIT
    this.init()
    this.initListeners()
}