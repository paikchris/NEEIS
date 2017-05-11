
//////////////////////////
// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
    googleAutoAddress: 'short_name',
    googleAutoAddress: 'long_name',
    cityMailing: 'long_name',
    stateMailing: 'short_name',
    zipCodeMailing: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('googleAutoAddress')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    //console.log("FILLING IN ADDRESS");
    var place = autocomplete.getPlace();

    for (var component in componentForm) {

        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        //alert(addressType);
        if (addressType === "street_number") {
            document.getElementById('googleAutoAddress').value = place.address_components[i]['short_name'];
        }
        else if (addressType === "route") {
            var temp = document.getElementById('googleAutoAddress').value
            document.getElementById('googleAutoAddress').value = temp + " " + place.address_components[i]['long_name'];
        }
        else if (addressType === "locality") {
            document.getElementById('cityMailing').value = place.address_components[i]['long_name'];

            $("#cityMailing").attr('placeholder', "");
        }
        else if (addressType === "administrative_area_level_1") {
            //document.getElementById('stateMailing').value = place.address_components[i]['long_name'];
            var val = stateNameToAbbrevMAP[place.address_components[i]['long_name']];
            var sel = document.getElementById('stateMailing');
            var opts = sel.options;
            for (var opt, j = 0; opt = opts[j]; j++) {
                if (opt.value == val) {
                    sel.selectedIndex = j;
                    break;
                }
            }
            $("#stateMailing").trigger('change');
        }
        else if (addressType === "postal_code") {

            document.getElementById('zipCodeMailing').value = place.address_components[i]['long_name'];
            $("#zipCodeMailing").attr('placeholder', "");
            $("#zipCodeMailing").trigger('change');

        }
        //if (componentForm[addressType]) {
        //    var val = place.address_components[i][componentForm[addressType]];
        //    document.getElementById(addressType).value = val;
        //}
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}



var stateNameToAbbrevMAP = {
    "": "",
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "District of Columbia": "DC",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "Guam": "GU",
    "Puerto Rico'": "PR",
    "Virgin Islands": "VI"
}
