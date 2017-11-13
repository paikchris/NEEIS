/*
typeahead.js is a fast and fully-featured autocomplete library http://twitter.github.com/typeahead.js/

Inspired by twitter.com's autocomplete search functionality, typeahead.js is a flexible JavaScript library that
provides a strong foundation for building robust typeaheads.

The typeahead.js library consists of 2 components: the suggestion engine, Bloodhound, and the UI view, Typeahead.
The suggestion engine is responsible for computing suggestions for a given query. The UI view is responsible for
rendering suggestions and handling DOM interactions. Both components can be used separately, but when used together,
they can provide a rich typeahead experience.
 */

/*
CUSTOMIZATIONS:
1. ALL TYPE AHEAD INPUTS SHOULD HAVE THE CLASS NAME 'typeahead'
    example: <input class="typeahead" type="text">

2. ALL TYPEAHEAD INPUTS SHOULD HAVE A DATA ATTRIBUTE WITH THE NAME OF THE DATASET ARRAY TO USE
    example: <input class="typeahead" type="text" data-typeahead_dataset="variableName">
 */



var typeAheadDataSetMap = {}


var typeAheadMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        var substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
}



function typeAheadInit(){
    var options = {
        hint: true,
        highlight: true,
        minLength: 1
    }


    $('input.typeahead').each(function(){
        var typeaheadInputID = $(this).attr('id')

        //ADD GIVEN DATASET TO GLOBAL DATASET MAP
        addInputDataset(this)

        //INITIALIZE TYPEAHEAD INPUT
        $(this).typeahead(options, {
            source: typeAheadMatcher(typeAheadDataSetMap[typeaheadInputID])
        });

    });

}

function addInputDataset(inputElement){
    var typeaheadInputID = $(inputElement).attr('id')
    var datasetString = $(inputElement).data('typeahead_dataset')

    var buildDatasetArray = window[datasetString]
    typeAheadDataSetMap[typeaheadInputID] = buildDatasetArray
}