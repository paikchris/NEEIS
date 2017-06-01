var fixture;
var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

describe('Testing Entire App', function() {

    beforeAll(function () {
    });

    describe('Testing newSubmission.js', function() {
        describe('Checking Functions', function() {
            it('load fixture', function(done) {
                $("#insuredInfoInsert").load("./../../../../js/forms/specFilm #fixture", function () {
                    expect(true).toBe(true);
                    done();

                });
            });
        });
    });






    afterAll(function () {
    });


});
