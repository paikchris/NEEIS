
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

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

function initAutocomplete() {

    var addressAutoCompleteInputs = document.getElementsByClassName("addressAutoCompleteInput");



    for (var i = 0; i < addressAutoCompleteInputs.length; i++) {
        var autocomplete = new google.maps.places.Autocomplete(addressAutoCompleteInputs[i]);
        autocomplete.inputId = addressAutoCompleteInputs[i].id;

        google.maps.event.addListener(autocomplete, 'place_changed', function(){
            // Get the place details from the autocomplete object.
            var place = autocomplete.getPlace();


            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            var autoCompleteContainer = $('#' + this.inputId).closest('.addressAutoCompleteContainer')

            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];

                if (addressType === "street_number") {
                    $(autoCompleteContainer).find('.addressAutoCompleteInput').val(place.address_components[i]['short_name'])
                }
                else if (addressType === "route") {

                    var temp = $(autoCompleteContainer).find('.addressAutoCompleteInput').val()
                    $(autoCompleteContainer).find('.addressAutoCompleteInput').val(temp + ' ' + place.address_components[i]['long_name'])

                }
                else if (addressType === "locality") {
                    $(autoCompleteContainer).find('.autoCompleteCity').val( place.address_components[i]['long_name'] )

                    $(autoCompleteContainer).find('.autoCompleteCity').attr('placeholder', "");
                    $(autoCompleteContainer).find('.autoCompleteCity').trigger('change');
                }
                else if (addressType === "administrative_area_level_1") {
                    var val = stateNameToAbbrevMAP[place.address_components[i]['long_name']];

                    $(autoCompleteContainer).find('.autoCompleteState').val(val)
                    $(autoCompleteContainer).find('.autoCompleteState').trigger('change');
                }
                else if (addressType === "postal_code") {
                    $(autoCompleteContainer).find('.autoCompleteZipcode').val(place.address_components[i]['long_name'])
                    $(autoCompleteContainer).find('.autoCompleteZipcode').attr('placeholder', "");
                    $(autoCompleteContainer).find('.autoCompleteZipcode').trigger('change');

                }
            }
        });
    }
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

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