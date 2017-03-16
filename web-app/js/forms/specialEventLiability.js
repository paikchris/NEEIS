// VARIABLES FOR SPECIAL EVENTS RATING
// VARIABLES FOR SPECIAL EVENTS RATING
var riskChosen;
var classOne = 0.25
var classTwo = 0.35
var classThree = 0.50
var attendance
var totalPremium
var totalPremium5Below
var totalPremium6Above
var rate
var eventDays
var minimumPremium
var brokerFee

// TOTAL SALES
var totalSale
var commercialTotal
var alcoholTotal

// MINIMUM PREMIUMS UP TO 5 DAYS
var minimum5Premium100Class1 = 175
var minimum5Premium100Class2 = 250
var minimum5Premium100Class3 = 325

var minimum5Premium500Class1 = 225
var minimum5Premium500Class2 = 325
var minimum5Premium500Class3 = 400

var minimum5Premium1500Class1 = 325
var minimum5Premium1500Class2 = 425
var minimum5Premium1500Class3 = 525

var minimum5Premium3000Class1 = 450
var minimum5Premium3000Class2 = 550
var minimum5Premium3000Class3 = 650

var minimum5Premium5000Class1 = 575
var minimum5Premium5000Class2 = 675
var minimum5Premium5000Class3 = 775

var minimum5Premium5001Class1 = 700
var minimum5Premium5001Class2 = 800
var minimum5Premium5001Class3 = 900
// MINIMUM PREMIUMS UP TO 5 DAYS

// MINIMUM PREMIUMS 6 DAYS AND MORE
var minimum6Premium10Class1 = 250
var minimum6Premium10Class2 = 250
var minimum6Premium10Class3 = 325

var minimum6Premium20Class1 = 500
var minimum6Premium20Class2 = 500
var minimum6Premium20Class3 = 500

var minimum6Premium31Class1 = 750
var minimum6Premium31Class2 = 750
var minimum6Premium31Class3 = 750

var minimum6Premium45Class1 = 800
var minimum6Premium45Class2 = 800
var minimum6Premium45Class3 = 800

var minimum6Premium60Class1 = 850
var minimum6Premium60Class2 = 850
var minimum6Premium60Class3 = 850

var minimum6Premium75Class1 = 900
var minimum6Premium75Class2 = 900
var minimum6Premium75Class3 = 900

var minimum6Premium90Class1 = 950
var minimum6Premium90Class2 = 950
var minimum6Premium90Class3 = 950
// MINIMUM PREMIUM 6 DAYS AND MORE

// ALCOHOL PREMIUMS
// $25,000 and below
var liquorMinimum8Below25000 = 100
var liquorMinimum12Below25000 = 375
var liquorMinimum14Below25000 = 550
var liquorMinimum15Below25000 = 750
var liquorMinimum50Below25000 = 1000

// 25,000 and above
var liquorMinimum8Above25000 = 100
var liquorMinimum12Above25000 = 750
var liquorMinimum14Above25000 = 800
var liquorMinimum15Above25000 = 900
var liquorMinimum50Above25000 = 2500


var liquorRate
var liquorRatePremium
var liquorSale
var liquorTotalPremium
var liquorMinimumPremium
var liquorTotalPremiumBelow25000
var liquorTotalPremiumAbove25000
// VARIABLES FOR SPECIAL EVENTS RATING
// VARIABLES FOR SPECIAL EVENTS RATING


// ALCOHOL PREMIUMS

$(document).ready(function () {
// alert("more bananananas")
    if ($("li.active").length > 0) {
        riskChosen = getRiskTypeChosen();
    }
    else {
        alert("bananas")
    }
    console.log(riskChosen)

    if (riskChosen === "Anniversary Parties" ||
        riskChosen === "Antique Shows" ||
        riskChosen === "Arts & Crafts Exhibit" ||
        riskChosen === "Auto Shows-Auto Static Only Award Presentations" ||
        riskChosen === "Baby Shower" ||
        riskChosen === "Ballet or Other Classical Dance Shows Balloon Artist" ||
        riskChosen === "Banquets Baptism" ||
        riskChosen === "Bar Mitzvahs / Bat Mitzvahs Bazaars" ||
        riskChosen === "Beauty Pageants Belly Dancer Birthday Parties" ||
        riskChosen === "Boat Shows (Dry Dock only) Body Building Contests Book Signing" ||
        riskChosen === "Bridal Showers" ||
        riskChosen === "Business Meetings and Shows Business Parties" ||
        riskChosen === "Camera Shows Card Shows" ||
        riskChosen === "Caricature Sketching Carolers" ||
        riskChosen === "Cartoonist" ||
        riskChosen === "Casino Nights" ||
        riskChosen === "Chamber of Commerce Events" ||
        riskChosen === "Charity Benefits, Dances, Auctions, or Sales Choirs - indoor" ||
        riskChosen === "Church Services or Meetings Civic Club Meetings" ||
        riskChosen === "Classic Dance Shows Computer Shows Concerts - Celtic Music Concerts - Chamber Music" ||
        riskChosen === "Concerts - Classical Music - Indoors Concerts - Holiday Music" ||
        riskChosen === "Concerts - Instrumental Consumer Shows Conventions - Indoors Craft Shows" ||
        riskChosen === "Dance Competitions Dance Recital Debutant Balls Debuts" ||
        riskChosen === "Drill Team Exhibitions Educational Exhibitions Electronics Conventions Face Painters" ||
        riskChosen === "Fashion Shows" ||
        riskChosen === "Flower and Garden Shows Fund Raising Dinner Funeral Service Graduations" ||
        riskChosen === "Harvest Festivals - No Farm Implements or Equipment" ||
        riskChosen === "Holiday Events & Parties / Gift Exchanges Home Shows" ||
        riskChosen === "Jazz and Jam Concerts - Indoors Jewelry Maker" ||
        riskChosen === "Job Fairs Indoor Ladies Club Events Lectures Luncheons Meetings - Indoors Mime" ||
        riskChosen === "Mobile Home Shows Pageants" ||
        riskChosen === "Poetry Reading" ||
        riskChosen === "Professional and Amateur Association Meetings Puppeteer" ||
        riskChosen === "Quinceanera" ||
        riskChosen === "Recitals" ||
        riskChosen === "Reunions Indoors" ||
        riskChosen === "RV Shows" ||
        riskChosen === "Scouting Jamborees - No Overnight Camping Seances" ||
        riskChosen === "Seminars" ||
        riskChosen === "Social Receptions - Indoors Speaking Engagements Store Openings" ||
        riskChosen === "Story Teller Symphony Concerts Teleconferences Telethons" ||
        riskChosen === "Trade Shows - Indoors Vacation Shows Ventriloquist" ||
        riskChosen === "Voter Registration" ||
        riskChosen === "Weddings and Wedding Receptions Yodeler"
    ) {
        rate = classOne;
        // alert(rate)
    }
    else if (riskChosen === "Bingo Games" ||
        riskChosen === "Card Games - Blackjack Card Games - Poker" ||
        riskChosen === "Carnivals - School Events with No Mechanical Rides" ||
        riskChosen === "Chess Tournament Choirs - Outdoor Christmas Tree Lighting" ||
        riskChosen === "Clowns - No Motorized Vehicles" ||
        riskChosen === "Comedians" ||
        riskChosen === "Concerts - 50's, 60's, 70's or 80's Music" ||
        riskChosen === "Concerts - Blues Music" ||
        riskChosen === "Concerts - Classical Music - Outdoors Concerts - Country Music" ||
        riskChosen === "Concerts - Folk Music Concerts - Funk Music Concerts - Motown Concerts Soul Music" ||
        riskChosen === "Dog, Cat, Bird & Other Domestic Animal Show / Event" ||
        riskChosen === "Easter Egg Hunt" ||
        riskChosen === "Festival and Cultural Events - Indoors Fishing Events" ||
        riskChosen === "Impersonator - Celebrity or Holiday Character Impressionist" ||
        riskChosen === "Jazz and Jam Concerts - Outdoors Job Fairs Outdoors" ||
        riskChosen === "Jugglers (No Pyro) Magician Mariachi Band" ||
        riskChosen === "Math Tournament" ||
        riskChosen === "Meetings - Outdoors" ||
        riskChosen === "Menorah Lightning Picnics - No Pools or Lakes Reunions Outdoors" ||
        riskChosen === "School Band Competitions or Events Soap Box Derbies" ||
        riskChosen === "Social Receptions - Outdoors Trade Shows - Outdoors Union Meetings" ||
        riskChosen === "Video Game Contests"
    ) {
        rate = classTwo;
        // alert(rate)
    }
    else if (riskChosen === "Amateur Rodeo and Roping Events" ||
        riskChosen === "Baseball - Amateur Basketball - Amateur" ||
        riskChosen === "Bicycling - No Racing / Off-road" ||
        riskChosen === "Block Parties / Street Closures / Street Fairs - Under 5000 Spectators" ||
        riskChosen === "Bowling Tournaments" ||
        riskChosen === "Boxing, Wrestling, Hockey and Football Games - Amateur" ||
        riskChosen === "Casino and Lounge Shows Cheerleading Events / Competitions (no Pyramids)" ||
        riskChosen === "Comedy Shows" ||
        riskChosen === "Company or Corporate Retreats Concerts - Pop Cover Bands Cornfield Mazes" ||
        riskChosen === "Country & Western Events - No Rodeos or Rides" ||
        riskChosen === "Country Festivals and Fairs - No Rides" ||
        riskChosen === "Festival and Cultural Events - Outdoors" ||
        riskChosen === "Film Screenings Film Showings" ||
        riskChosen === "Golf Tournament - Daytime Grad Night" ||
        riskChosen === "Gymnastic Competitions - Spectators Only Halloween - Costume Contests" ||
        riskChosen === "Ice Skating Shows Junior Athletic Games Karate Meets Lacrosse" ||
        riskChosen === "Laser Tag (Indoors) Livestock Shows Magic Shows" ||
        riskChosen === "Marathons (Walking & Running) Marathons / Walkathons" ||
        riskChosen === "Mobile Homes / RV Shows - Professionally Managed" ||
        riskChosen === "Movie Release Party" ||
        riskChosen === "New Years Party (Private / by invite only)" ||
        riskChosen === "Old Timer Events" ||
        riskChosen === "Parades - Under 5000 Spectators Play Readings" ||
        riskChosen === "Plays" ||
        riskChosen === "Pool and / or Billiards Tournaments Proms" ||
        riskChosen === "Rugby Soccer" ||
        riskChosen === "Softball - Amateur" ||
        riskChosen === "Sporting Events - Indoors - Non-Professional" ||
        riskChosen === "Talent Show (no rap, hip hop, heavy metal shows)" ||
        riskChosen === "Tap Dancing" ||
        riskChosen === "Tennis Tournament" ||
        riskChosen === "Theatrical Stage Performances Volleyball - Amateur" ||
        riskChosen === "Wagon / Hayrides Walking / Hiking Tour" ||
        riskChosen === "Wine Tasting"
    ) {
        rate = classThree;
        // alert(rate)
    }

    // MONEY FORMAT
    $('.alcoholSales').maskMoney({prefix:'$', precision:"0"});
    $('.equipmentLimit').maskMoney({prefix:'$', precision:"0"});
    $('.brokerFeeInput').maskMoney({prefix:'$', precision:"0"});
    $('.costVehicles').maskMoney({prefix:'$', precision:"0"});
    $('.totalReceipts').maskMoney({prefix:'$', precision:"0"});
    $('.totalPayroll').maskMoney({prefix:'$', precision:"0"});

// TOTAL PREMIUM COST !@#

// STATE SELECT
    $("#selectState").change(function () {
        var state = this.value;
    // });
    // $(document.body).on('change', 'input[name="selectState"]', function () {
    //     alert(state)
        if (state ==  "DE" ||
            state ==   "KS" ||
            state ==   "MD" ||
            state ==   "NV" ||
            state ==   "SD" ||
            state ==   "VA") {
            liquorRate = 8
        }
        else if (state == "AR" ||
            state ==   "CA" ||
            state ==   "CO" ||
            state ==   "FL" ||
            state ==   "GA" ||
            state ==   "ID" ||
            state ==   "IL" ||
            state ==   "KY" ||
            state ==   "LA" ||
            state ==   "ME" ||
            state ==   "MN" ||
            state ==   "MS" ||
            state ==   "MO" ||
            state ==   "NE" ||
            state ==   "NJ" ||
            state ==   "OH" ||
            state ==   "OR" ||
            state ==   "TN") {
            liquorRate = 12
        }
        else if (state ==  "AZ" ||
            state ==   "IN" ||
            state ==   "MA" ||
            state ==   "MI" ||
            state ==   "MT" ||
            state ==   "NM" ||
            state ==   "NY" ||
            state ==   "NC" ||
            state ==   "ND" ||
            state ==   "OK" ||
            state ==   "RI" ||
            state ==   "SC" ||
            state ==   "TX" ||
            state ==   "UT" ||
            state ==   "WA") {
            liquorRate = 14
        }
        else if (state ==  "DC" ||
            state ==   "IA" ||
            state ==   "PA" ||
            state ==   "WV") {
            liquorRate = 15
        }
        else if (state ==  "AL" ||
            state ==   "VT") {
            liquorRate = 50
        }
        else if (state ==  "AK" ||
            state ==   "CT" ||
            state ==   "NH" ||
            state ==   "HI") {
            alert ("NOT ELIGIBLE STATE")
        }
        // alert ("LIQUOR RATE:" + liquorRate)
    });

// COMMERCIAL GENERAL LIABILITY FEE
    $(document.body).on('change', "#estimatedTotalAttendance,#howManyDaysIsTheEvent", function () {
        attendance = $("#estimatedTotalAttendance").val()
        // alert(attendance)
        eventDays = $("#howManyDaysIsTheEvent").val()
        // alert (eventDays)
        if (attendance.length > 0 && eventDays.length > 0) {
            var attendanceValue = parseFloat(attendance)
            var eventDaysValue = parseFloat(eventDays)
            var rateValue = parseFloat(rate)
            // alert (attendanceValue)
            // alert (eventDaysValue)
            // alert (rateValue)
            if (eventDaysValue < 6) {

                totalPremium5Below = attendanceValue * rateValue
                // alert("First: " + totalPremium5Below)
                if (attendanceValue >= 1 && attendanceValue <= 100) {
                    if (rate = classOne) {
                        minimumPremium = minimum5Premium100Class1
                        // alert("SECOND minimum5Prem" + minimum5Premium100Class1)
                        // alert("second: " + totalPremium5Below)
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                            // alert("THIRD totalPrem" + totalPremium)
                            // alert ("FORTH minimumPre"+ minimumPremium)
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum5Premium100Class2
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum5Premium100Class3
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                }

                else if (attendanceValue >= 101 && attendanceValue <= 500) {
                    if (rate = classOne) {
                        minimumPremium = minimum5Premium500Class1
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum5Premium500Class2
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum5Premium500Class3
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                }
                else if (attendanceValue >= 501 && attendanceValue <= 1500) {
                    if (rate = classOne) {
                        minimumPremium = minimum5Premium1500Class1
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum5Premium1500Class2
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum5Premium1500Class3
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                }
                else if (attendanceValue >= 1501 && attendanceValue <= 3000) {
                    if (rate = classOne) {
                        minimumPremium = minimum5Premium3000Class1
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum5Premium3000Class2
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum5Premium3000Class3
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                }
                else if (attendanceValue >= 3001 && attendanceValue <= 5000) {
                    if (rate = classOne) {
                        minimumPremium = minimum5Premium5000Class1
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum5Premium5000Class2
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum5Premium5000Class3
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                }
                else if (attendanceValue >= 5001) {
                    if (rate = classOne) {
                        minimumPremium = minimum5Premium5001Class1
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum5Premium5001Class2
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum5Premium5001Class3
                        if (minimumPremium < totalPremium5Below) {
                            totalPremium = totalPremium5Below
                        }
                        else if (minimumPremium > totalPremium5Below) {
                            totalPremium = minimumPremium
                        }
                    }
                }

            }

            else if (eventDaysValue > 5) {
                totalPremium6Above = eventDaysValue * rateValue

                if (eventDaysValue >= 6 && eventDaysValue <= 10) {
                    if (rate = classOne) {
                        minimumPremium = minimum6Premium10Class1
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum6Premium10Class2
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum6Premium10Class3
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                }
                else if (eventDaysValue >= 11 && eventDaysValue <= 20) {
                    if (rate = classOne) {
                        minimumPremium = minimum6Premium20Class1
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum6Premium20Class2
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum6Premium20Class3
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                }
                else if (eventDaysValue >= 21 && eventDaysValue <= 31) {
                    if (rate = classOne) {
                        minimumPremium = minimum6Premium31Class1
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum6Premium31Class2
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum6Premium31Class3
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                }
                else if (eventDaysValue >= 32 && eventDaysValue <= 45) {
                    if (rate = classOne) {
                        minimumPremium = minimum6Premium45Class1
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum6Premium45Class2
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum6Premium45Class3
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                }

                else if (eventDaysValue >= 46 && eventDaysValue <= 60) {
                    if (rate = classOne) {
                        minimumPremium = minimum6Premium60Class1
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum6Premium60Class2
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum6Premium60Class3
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                }

                else if (eventDaysValue >= 61 && eventDaysValue <= 75) {
                    if (rate = classOne) {
                        minimumPremium = minimum6Premium75Class1
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum6Premium75Class2
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum6Premium75Class3
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                }

                else if (eventDaysValue >= 76 && eventDaysValue <= 90) {
                    if (rate = classOne) {
                        minimumPremium = minimum6Premium90Class1
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classTwo) {
                        minimumPremium = minimum6Premium90Class2
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                    else if (rate = classThree) {
                        minimumPremium = minimum6Premium90Class3
                        if (minimumPremium < totalPremium6Above) {
                            totalPremium = totalPremium6Above
                        }
                        else if (minimumPremium > totalPremium6Above) {
                            totalPremium = minimumPremium
                        }
                    }
                }
            }
            $("#commercialGeneralLiabilityPremiumCost").html("$" + totalPremium);
        }
        // alert("LAST: " + totalPremium)




    });

// BROKER FEE
    $(document.body).on('change', "#brokerFeeInput", function () {
        brokerFee = $("#brokerFeeInput").val()
        // alert(attendance)

        brokerFee = brokerFee.replace('$','')

        if (brokerFee.length > 0) {
            var brokerFeeValue = parseFloat(brokerFee)
        }
        $("#brokerFeePremiumCost").html("$" + brokerFee);

    });

// POLICY FEE
    $(document.body).on('change', "#estimatedTotalAttendance,#howManyDaysIsTheEvent", function () {
            var policyFee = 25
        $("#policyFeePremiumCost").html("$" + policyFee);
        });

// ALCOHOL FEE
    $(document.body).on('change', "#alcoholSales", function () {

        var tempLiquorSale = $("#alcoholSales").val()
        eventDays = $("#howManyDaysIsTheEvent").val()
        attendance = $("#estimatedTotalAttendance").val()

        // alert("Step2" + liquorSale) removes $ from val
        liquorSale = tempLiquorSale.replace('$','').replace(',', '')
        // alert (liquorSale)

        var liquorSaleValue = parseFloat(liquorSale)
        var eventDaysValue = parseFloat(eventDays)
        var attendanceValue = parseFloat(attendance)

        alert("liquorSaleValue" + liquorSaleValue)
        alert("eventDatsValue" + eventDaysValue)
        alert ("LiqourRate" + liquorRate)

        if (liquorSaleValue > 0 && liquorSaleValue < 25000 && eventDaysValue > 0 && eventDaysValue <= 5) {

            if (liquorRate == 8) {
                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum8Below25000
                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }

            else if (liquorRate == 12) {

                // alert ("LIQUORRATE" + liquorRate)
                // alert ("LIQUORSALEVALUE" + liquorSaleValue)

                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum12Below25000

                // alert ("LIQUORPREMIUM" + liquorRatePremium)

                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }
            else if (liquorRate == 14) {
                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum14Below25000
                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }
            else if (liquorRate == 15) {
                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum15Below25000
                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }
            else if (liquorRate == 50) {
                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum50Below25000
                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }
        }
        else if (liquorSaleValue > 0 && eventDaysValue > 0) {

            if (liquorRate == 8) {
                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum8Above25000
                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }

            else if (liquorRate == 12) {
                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum12Above25000
                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }
            else if (liquorRate == 14) {
                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum14Above25000
                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }
            else if (liquorRate == 15) {
                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum15Above25000
                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }
            else if (liquorRate == 50) {
                liquorRatePremium = liquorRate * liquorSaleValue / 1000
                liquorMinimumPremium = liquorMinimum50Above25000
                if (liquorMinimumPremium < liquorRatePremium) {
                    liquorTotalPremium = liquorRatePremium
                }
                else if (liquorMinimumPremium > liquorRatePremium) {
                    liquorTotalPremium = liquorMinimumPremium
                }
            }
            alert("5Step" + liquorMinimumPremium)
            alert("6Step" + liquorRatePremium)
            alert("7Step" + liquorTotalPremium)
            $("#alcoholSalePremiumCost").html("$" + liquorTotalPremium);
        }
        $("#alcoholSalePremiumCost").html("$" + liquorTotalPremium);
    });

// TOTAL SALES
    $(document.body).on('change', ".effectsTotalPremium", function () {
        totalPremium = 0;

        $(".effectsTotal").each(function() {
            if($(this).html().length > 0 ){
                var tempVal = parseFloat($(this).html().replace('$',''));
                // var totalPremiumValue = parseFloat $(this)
                totalPremium = totalPremium + tempVal
                // alert (totalPremium)
            }

        });
        $("#totalSalePremiumCost").html("$" + totalPremium);
        // alert (totalPremium)

    });

// TOTAL PREMIUM COST !@#




// CGL TABLE
    $(document.body).on('change', 'input[name="commercialGeneralLiabilityRequested?"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#commercialGeneralLiabilityRequestedContainer").css('display', "");
            $("#commercialGeneralLiabilityRequestedExplain").css('display', "");
            $(".tableCGL").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $("#commercialGeneralLiabilityRequestedContainer").css('display', "none");
            $("#commercialGeneralLiabilityRequestedExplain").css('display', "none");
            $(".tableCGL").removeClass("showReviewTable");
        }
    });

// WORK COMP TABLE / ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="workCompCoverageRequested?"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#workCompCoverageRequestedContainer").css('display', "");
            $("#workCompCoverageRequestedExplain").css('display', "");
            $(".tableWC").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $("#workCompCoverageRequestedContainer").css('display', "none");
            $("#workCompCoverageRequestedExplain").css('display', "none");
            $(".tableWC").removeClass("showReviewTable");
        }
    });

// AUTO LIABILITY TABLE / ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="autoLiability"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $(".costRentedVehiclesContainer").css('display', "");
            $(".costRentedVehiclesExplain").css('display', "");
            $(".tableNOAL").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $(".costRentedVehiclesContainer").css('display', "none");
            $(".costRentedVehiclesExplain").css('display', "none");
            $(".tableNOAL").removeClass("showReviewTable");
        }
    });

// UMBRELLA TABLE
    $(document.body).on('change', 'input[name="umbrellaLimitRequested"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#umbrellaLimitRequestedContainer").css('display', "");
            $("#umbrellaLimitRequestedExplain").css('display', "");
            $(".tableCUMB").addClass("showReviewTable");
        }
        if ($(this).attr("value") == "No") {
            $("#umbrellaLimitRequestedContainer").css('display', "none");
            $("#umbrellaLimitRequestedExplain").css('display', "none");
            $(".tableCUMB").removeClass("showReviewTable");
        }
    });

// ALCOHOL TABLE / ADDITIONAL HIDDEN QUESTION / PREMIUMS
    $(document.body).on('change', 'input[name="willAlcoholBeServed"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $(".alcoholSaleContainer").css('display', "");
            $(".alcoholSaleExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $(".alcoholSaleContainer").css('display', "none");
            $(".alcoholSaleExplain").css('display', "none");
        }
    });

// EQUIPMENT TABLE / ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="equipmentOwnedRented"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#equipmentOwnedRentedContainer").css('display', "");
            $("#equipmentOwnedRentedExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#equipmentOwnedRentedContainer").css('display', "none");
            $("#equipmentOwnedRentedExplain").css('display', "none");
        }
    });

// OVERNIGHT EVENTS ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="overnight"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#overnightContainer").css('display', "");
            $("#overnightExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#overnightContainer").css('display', "none");
            $("#overnightExplain").css('display', "none");
        }
    });

// PYRO ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', '#pyrotechnicsCheckbox' ,function(){
        if($("#pyrotechnicsCheckbox").is(':checked')) {
            $('#pyrotechnicsAttachContainer').css("display", "");
        }
        else{
            $('#pyrotechnicsAttachContainer').css("display", "none");
        }
    });

// STUNTS HAZARDOUS EVENTS ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', '#stuntsHazardousCheckbox' ,function(){
        if($("#stuntsHazardousCheckbox").is(':checked')) {
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "");
            $('#stuntCoordinatorName').css("display", "");
            $('#participantsSigningWaivers').css("display", "");
        }
        else{
            $('#stuntsHazardousActivitiesAttachContainer').css("display", "none");
            $('#stuntCoordinatorName').css("display", "none");
            $('#participantsSigningWaivers').css("display", "none");

        }
    });

// INSURANCE BEEN CANCELLED ADDITIONAL HIDDEN QUESTIONS
    $(document.body).on('change', 'input[name="insuranceCancelled"]', function () {
        //alert();
        if ($(this).attr("value") == "Yes") {
            $("#insuranceCancelledContainer").css('display', "");
            $("#insuranceCancelledExplain").css('display', "");
        }
        if ($(this).attr("value") == "No") {
            $("#insuranceCancelledContainer").css('display', "none");
            $("#insuranceCancelledExplain").css('display', "none");
        }
    });

// PHONE NUMBER FORMAT
    $(document.body).on('focus', '.phoneNumberMask' ,function(){
        //this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3');
        //alert ("OK");
        $(".phoneNumberMask").mask("(999) 999-9999");
    });

// BROKER FEE HIDDEN PREMIUM
    $(document.body).on('change', '.brokerFeeInput', function () {
        //alert();
        var brokerFeeCostTemp = $(".brokerFeeInput").val()
        var brokerFeeCost = brokerFeeCostTemp.replace('$','').replace(',', '')
        var brokerFeeCostValue = parseFloat(brokerFeeCost)

        if (brokerFeeCostValue > 0){
            $("#brokerFeePremiumContainer").css('display', "");
            $("#brokerFeePremiumExplain").css('display', "");
        }
        else if (brokerFeeCostValue <= 0){
            $("#brokerFeePremiumContainer").css('display', "none");
            $("#brokerFeePremiumExplain").css('display', "none");
        }
    });


})
;