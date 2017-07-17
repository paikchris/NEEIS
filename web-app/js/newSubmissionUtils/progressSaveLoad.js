var lastSaveTime


//CHECK IF SAVED SUBMISSIONS AVAILABLE, AND SHOW LOAD BUTTON IF EXISTS
//In Testing mode use parameter to set message manually
function checkForSavedSubmissions(testOptionMsg){
    // var savedSubmissions = Object.keys(Cookies.get()).filter(function(name) {
    //     return name.indexOf("saveData_") > -1;
    // });
    // // console.log(savedSubmissions.length + " Saved Submissions");
    // if (savedSubmissions.length > 0) {
    //     $('#loadProgress').css('display', '');
    // }
    // else {
    //     $('#loadProgress').css('display', 'none');
    // }

    if(testOptionMsg !== undefined){
        checkSavedSubmissionAJAXResponse(testOptionMsg)
    }
    else{
        $.ajax({
            method: "POST",
            url: "/Async/getSavedSubmissions",
            data: {
            }
        })
            .done(function(msg) {
                checkSavedSubmissionAJAXResponse(msg)
            });
    }
}

function checkSavedSubmissionAJAXResponse(msg){
    // console.log("checking message")
    // console.log(msg)
    try{
        var savedSubmissionsObjectArray = JSON.parse(msg)

        //CHECK THE LIST COMING BACK FROM DATABASE WITH ITEMS IN LOCAL STORAGE AND COOKIES
        //If it exists in the database list, delete from local and cookies
        checkAndClearLocalStorage(savedSubmissionsObjectArray)
        // console.log(savedSubmissionsObjectArray.length)
        if(savedSubmissionsObjectArray.length == 0 ){
            $('#previousSubmissionExistsAlert').css('display', 'none');
            $('#loadProgress').css('display', 'none');
        }
        else{
            for(var i=0; i< savedSubmissionsObjectArray.length; i++){
                // console.log(savedSubmissionsObjectArray[i])
                // console.log(savedSubmissionsObjectArray[i].autosaveFlag)
                if(savedSubmissionsObjectArray[i].autosaveFlag === "Y"){
                    //SHOW CONTINUE PREVIOUS SUBMISSION?

                    $('#previousSubmissionExistsAlert').css('display', '');
                    $('#loadProgress').css('display', '');
                }
            }
        }

    }
    catch(e){
        console.log(e)
        console.log(msg)
    }
}

function checkAndClearLocalStorage(dbObjectArray){
    // console.log("CLEARING LOCAL")
    try{
        for(var i=0; i<dbObjectArray.length; i++){
            //CHECK IF DB SAVED ITEM EXISTS IN LOCAL ITEMS
            if (localStorage.getItem(dbObjectArray[i].saveName) === null) { //IF IT DOESN'T EXIST, KEEP TO UPLOAD AT END

            }
            else{ //IF IT DOES EXIST IN DB LIST, DELETE FROM LOCAL LIST
                localStorage.removeItem(dbObjectArray[i].saveName)
            }
        }

        //UPLOAD REMAINING
        for(var i=0; i<localStorage.length; i++){
            var lsKey = localStorage.key(i)
            // console.log(localStorage.getItem(lsKey))
            var savedMap = JSON.parse(localStorage.getItem(lsKey))
            var isAutoSave = savedMap["isAutoSave"]
            var savedName = savedMap["saveName"]
            $.ajax({
                method: "POST",
                url: "/Async/saveSubmissionProgress",
                data: {
                    savedDataMap : JSON.stringify(savedMap),
                    autosave: isAutoSave,
                    saveName: savedName
                },
                lsKey: lsKey
            })
                .done(function(msg) {
                    if(msg === "Success"){
                        localStorage.removeItem(this.lsKey)
                    }
                });
        }

        // console.log("CLEARING COOKIES")
        for(var i=0; i<dbObjectArray.length; i++){
            //CHECK IF DB SAVED ITEM EXISTS IN LOCAL ITEMS
            if (Cookies.get(dbObjectArray[i].saveName) === undefined) { //IF IT DOESN'T EXIST, KEEP TO UPLOAD AT END

            }
            else{ //IF IT DOES EXIST IN DB LIST, DELETE FROM LOCAL LIST
                Cookies.remove(dbObjectArray[i].saveName)
            }
        }
        //UPLOAD REMAINING
        //LOOK AT COOKIES
        var cookieSaves = Object.keys(Cookies.get()).filter(function(name) {
            return name.indexOf("saveData_") > -1;
        });
        cookieSaves.forEach(function(name, i) {
            // console.log(i);
            var cookieKey = name
            // console.log(Cookies.get(cookieKey))
            var savedMap = JSON.parse(Cookies.get(cookieKey))
            var isAutoSave = savedMap["isAutoSave"]
            var savedName = savedMap["saveName"]
            $.ajax({
                method: "POST",
                url: "/Async/saveSubmissionProgress",
                data: {
                    savedDataMap: JSON.stringify(savedMap),
                    autosave: isAutoSave,
                    saveName: savedName
                },
                cookieKey: cookieKey
            })
                .done(function (msg) {
                    if (msg === "Success") {
                        Cookies.remove(this.cookieKey)
                    }
                });
        });
    }
    catch(e){
        console.log(e)
        console.log("Error Cleaning Local")
    }
}

function saveItemToSubmissionsTable(saveName, autoSaveMap, autosaveFlag){

}

//SET THE INTERVAL FOR THE SUBMISSION PAGE TO AUTOSAVE, EX. EVERY 10000 MS
function setIntervalToAutoSave(seconds){
    setInterval(function() {
        // method to be executed;
        if ($("li.active").length > 0 &&
            ($('#proposedEffectiveDate').val().length > 0 || $('#proposedExpirationDate').val().length > 0 || $('#totalBudgetConfirm').val().length > 1)) {
            autoSaveFunction();
        }
    }, seconds);
}

//SET SUBMISSION TO AUTOSAVE ON QUIT IF TRUE
function setSubmissionToAutoSaveOnQuit(saveOnQuit){

    if(saveOnQuit){
        window.onbeforeunload = function () {
            $(window).scrollTop(0);
            saveOnQuit();

        }
    }

}

function saveOnQuit(){
    var saveDisabled = checkIfRecentlySaved();

    //ONLY SAVE IF ALL NECESSARY FIRST FIELDS ARE FILLED OUT
    if ($("li.active").length > 0 &&
        ($('#proposedEffectiveDate').val().length > 0 || $('#proposedExpirationDate').val().length > 0 || $('#totalBudgetConfirm').val().length > 1) &&
        saveDisabled == false) {
        saveProgress("autosave")
    }
}

function initializeSubmissionSaveAndLoadButtons(){
    $(document).on('click', '#saveProgress', function() {
        $('#loadingModal').modal('show');

        saveProgress();
        setTimeout(function() {
            $('#loadingModal').modal('hide');
            $('#loadProgress').css('display', "")
        }, 2000);
    });
    $(document).on('click', '.loadProgress', function() {
        fillLoadModal();
    });
    $(document).on('click', '.savedSubmissionDataRow', function() {
        $('#loadSaveModal').modal('hide');
        var loadMap;
        if($(this).hasClass('database')){
            loadMap = JSON.parse($(this).attr('data-savedata'))
        }
        else if($(this).hasClass('cookies')){
            loadMap = JSON.parse($(this).attr('data-savedata'))
        }
        else if($(this).hasClass('localStorage')){
            loadMap = JSON.parse($(this).attr('data-savedata'))
        }
        // var loadName = $(this).html().trim();
        // var loadMap = Cookies.getJSON(loadName);

        loadSaveFunction(loadMap);
    });
}

//INITIALIZE BUTTON ON LOAD PROGRESS MODAL
function initializeAutoSaveLoadProgressButtons(){
    $(document).on('click', '#loadSaveOKButton', function() {
        loadedAutoSaveMap = Cookies.getJSON("autosaveData");
        loadSaveFunction(loadedAutoSaveMap);
    });
    $(document).on('click', '#loadSaveNOButton', function() {
        autoSaveMap = {};
        Cookies.remove('autosaveData');
    });
}

function fillLoadModal(){
    var savedSubmissionHtmlString = "";

    $.ajax({
        method: "POST",
        url: "/Async/getSavedSubmissions",
        data: {
        }
    })
        .done(function(msg) {
            // console.log(JSON.parse(msg))
            var savedSubmissionsObjectArray = JSON.parse(msg)

            for(var i=0; i < savedSubmissionsObjectArray.length; i++){

                if (true) {
                    // savedSubmissionHtmlString = savedSubmissionHtmlString +
                    //     " <a href='#' class='list-group-item' style='font-weight: 500'>" +
                    //     "<i class='fa fa-file-text-o' aria-hidden='true'></i>  " +
                    //     "<span class='rowLoadName database' data-saveID='" + savedSubmissionsObjectArray[i].id + "' data-saveData='" + savedSubmissionsObjectArray[i].saveData + "'> "
                    //     + savedSubmissionsObjectArray[i].saveName + "</span>" +
                    //     "</a>";

                    var riskTypeOfSave = savedSubmissionsObjectArray[i].saveName.split("saveData_")[1]
                    var nameOfInsured = savedSubmissionsObjectArray[i].saveName.split("saveData_")[2]
                    var timeOfSave = savedSubmissionsObjectArray[i].saveName.split("saveData_")[3]
                    var autoSaveText = ""
                    // console.log(savedSubmissionsObjectArray[i].isAutoSave)
                    if(savedSubmissionsObjectArray[i].autosaveFlag === "Y"){
                        autoSaveText = " (Autosaved)"
                    }

                    savedSubmissionHtmlString = savedSubmissionHtmlString +
                        "<div class='row savedSubmissionDataRow database' data-saveID='" + savedSubmissionsObjectArray[i].id + "' " +
                        "data-saveData='" + savedSubmissionsObjectArray[i].saveData + "'>" +
                            "<div class='col-xs-5'>" +
                                "<span>" + riskTypeOfSave + autoSaveText + "</span>" +
                            "</div>" +
                            "<div class='col-xs-4'>" +
                                "<span>" + nameOfInsured + "</span>" +
                            "</div>" +
                            "<div class='col-xs-3'>" +
                                "<span>" + timeOfSave.split(" ")[0] + "</span>" +
                            "</div>" +
                        "</div>"
                }
                else {

                }
            }

            //LOOK AT COOKIES
            var savedSubmissions = Object.keys(Cookies.get()).filter(function(name) {
                return name.indexOf("saveData_") > -1;
            });
            // console.log(savedSubmissions)

            savedSubmissions.forEach(function(name, i) {
                // console.log(i);
                if (true) {
                    // savedSubmissionHtmlString = savedSubmissionHtmlString +
                    //     " <a href='#' class='list-group-item' style='font-weight: 500'>" +
                    //     "<i class='fa fa-file-text-o' aria-hidden='true'></i>  " +
                    //     "<span class='rowLoadName cookies' data-saveID='" + name + "' data-saveData='" + Cookies.get(name) + "'> "
                    //     + name + "</span>" +
                    //     "</a>";


                    var riskTypeOfSave = name.split("saveData_")[1]
                    var nameOfInsured = name.split("saveData_")[2]
                    var timeOfSave = name.split("saveData_")[3]

                    var tempMap = JSON.parse(Cookies.get(name))
                    var autoSaveText = ""
                    if(tempMap.isAutoSave === "true"){
                        autoSaveText = "(Autosaved) "
                    }

                    savedSubmissionHtmlString = savedSubmissionHtmlString +
                        "<div class='row savedSubmissionDataRow cookies' data-saveID='" + name + "' " +
                        "data-saveData='" + Cookies.get(name) + "'>" +
                        "<div class='col-xs-5'>" +
                        "<span>" + riskTypeOfSave + autoSaveText + "</span>" +
                        "</div>" +
                        "<div class='col-xs-4'>" +
                        "<span>" + nameOfInsured + "</span>" +
                        "</div>" +
                        "<div class='col-xs-3'>" +
                        "<span>" + timeOfSave.split(" ")[0] + "</span>" +
                        "</div>" +
                        "</div>"
                }
                else {

                }
            });


            //LOOK AT LOCAL STORAGE
            for(var i=0; i<localStorage.length; i++){
                if(localStorage.key(i).indexOf("autosaveMap") > -1){
                    // savedSubmissionHtmlString = savedSubmissionHtmlString +
                    //     " <a href='#' class='list-group-item' style='font-weight: 500'>" +
                    //     "<i class='fa fa-file-text-o' aria-hidden='true'></i>  " +
                    //     "<span class='rowLoadName localStorage' data-saveID='" + localStorage.key(i) + "' data-saveData='" + localStorage.getItem(localStorage.key(i)) + "'> "
                    //     + localStorage.key(i) + "</span>" +
                    //     "</a>";

                    var riskTypeOfSave = localStorage.key(i).split("saveData_")[1]
                    var nameOfInsured = localStorage.key(i).split("saveData_")[2]
                    var timeOfSave = localStorage.key(i).split("saveData_")[3]

                    var tempMap = JSON.parse(localStorage.getItem(localStorage.key(i)))
                    var autoSaveText = ""
                    if(tempMap.isAutoSave === "true"){
                        autoSaveText = "(Autosaved) "
                    }

                    savedSubmissionHtmlString = savedSubmissionHtmlString +
                        "<div class='row savedSubmissionDataRow localStorage' data-saveID='" + localStorage.key(i) + "' " +
                        "data-saveData='" + localStorage.getItem(localStorage.key(i)) + "'>" +
                        "<div class='col-xs-5'>" +
                        "<span>" + riskTypeOfSave + autoSaveText + "</span>" +
                        "</div>" +
                        "<div class='col-xs-4'>" +
                        "<span>" + nameOfInsured + "</span>" +
                        "</div>" +
                        "<div class='col-xs-3'>" +
                        "<span>" + timeOfSave.split(" ")[0] + "</span>" +
                        "</div>" +
                        "</div>"
                }
            }

            $('#savedSubmissionsContainer').html(savedSubmissionHtmlString);
            $('#loadSaveModal').modal('show');
        });





}

//CHECK IF RECENTLY SAVED, IF TOO RECENT RETURNS SAVE DISABLED
function checkIfRecentlySaved(){
    var saveDisabled = false;

    //check last save time. If last save time was 0 minutes ago don't Save again.
    if (lastSaveTime != undefined) {
        var diff = Math.abs(lastSaveTime - new Date());
        var minutes = Math.floor((diff / 1000) / 60);
        if (minutes == 0) {
            saveDisabled = true
        }
        else {
            saveDisabled = false
        }
    }
    else {
        saveDisabled = false
    }

    return saveDisabled
}

function loadSaveFunction(loadMap) {
    loadingSaveInProgress = true;
    loadedSubmissionMap = loadMap;
    var loadingStep = 1;
    currentStep = 1;


    $('#progressBarHeader').html("Loading saved submission")
    $('.progress-bar').attr('aria-valuenow', "0").css("width", "0%");
    $('#progressBarModal').modal('show');
    $('.progress-bar').attr('aria-valuenow', "75").animate({
        width: "75%"
    }, 5000);
    var value;
    riskChosen = loadMap['riskChosen'];

    $('a').each(function() {
        if ($(this).html() === loadMap['riskChosen']) {

            // alert("click " + $(this).html())
            var domObject = $(this);
            // console.log($(domObject).html())
            $(domObject).trigger('click');
        }
    });


    if (loadMap['proposedEffectiveDate'].length > 0) {
        var dateTemp = loadMap['proposedEffectiveDate']
        var monthsTemp = parseInt(dateTemp.split("/")[0])
        var daysTemp = parseInt(dateTemp.split("/")[1])
        var yearsTemp = parseInt(dateTemp.split("/")[2])
        if(monthsTemp < 10){
            monthsTemp = '0' + monthsTemp;

        }
        if(daysTemp < 10 ){
            daysTemp = '0' + daysTemp;
        }
        var finalDateString = monthsTemp + "/" + daysTemp + "/" + yearsTemp
         $('#proposedEffectiveDate').val(finalDateString);
        $("#proposedEffectiveDate").trigger("change");

    }
    if (loadMap['proposedExpirationDate'].length > 0) {
        var dateTemp = loadMap['proposedExpirationDate']
        var monthsTemp = parseInt(dateTemp.split("/")[0])
        var daysTemp = parseInt(dateTemp.split("/")[1])
        var yearsTemp = parseInt(dateTemp.split("/")[2])
        if(monthsTemp < 10){
            monthsTemp = '0' + monthsTemp;
        }
        if(daysTemp < 10 ){
            daysTemp = '0' + daysTemp;
        }
        var finalDateString = monthsTemp + "/" + daysTemp + "/" + yearsTemp

        $('#proposedExpirationDate').val(finalDateString);
        $("#proposedExpirationDate").trigger("change");

    }
    if (loadMap['proposedTermLength'].length > 0) {
        $('#proposedTermLength').val(loadMap['proposedTermLength']);
        //$("#proposedTermLength").trigger("change");
    }
    if (loadMap['totalBudgetConfirm'].length > 0) {

        $('#totalBudgetConfirm').val(loadMap['totalBudgetConfirm']);
        $("#totalBudgetConfirm").trigger("change");

    }

    if(loadMap['attachedFiles']){
        attachedFileMap = loadMap['attachedFiles']
        loadSavedAttachedFiles(loadMap['attachedFiles']);
    }


    // simulateClickNext(2)
    //
    // $('#coverageOptionsReview').html(loadedSubmissionMap["coverageOptionsDiv"])
    // console.log(loadedSubmissionMap["coverageOptionsDiv"])


    setTimeout(function() {
        // console.log("spec films loaded: " + specFilmsScriptLoaded)
        Object.keys(loadMap).forEach(function(key) {

            value = loadMap[key];
            var domObject = $('#' + key);
            // console.log($(domObject).attr('id') + " == " + $(domObject).val())
            if ($(domObject).css("display") != "none") {
                $(domObject).css('display', '');
            }

            if ($(domObject).is("select")) {
                $(domObject).val(value);
                //console.log("SELECT TYPE = " + domObject);
                $(domObject).trigger("change");
            }
            else if ($(domObject).is(':checkbox')) {
                //console.log("CHECKBOX TYPE = " + domObject);
                if (value === true) {
                    $(domObject).prop("checked", true);

                }
                else {
                    $(domObject).prop("checked", false);
                }
                $(domObject).trigger("change");

            }
            else if ($(domObject).is(':radio')) {
                //console.log("RADIO TYPE = " + domObject);
                if (value === true) {
                    $(domObject).prop("checked", true);
                }
                else {
                    //$(domObject).prop("checked", false);
                }
                $(domObject).trigger("change");

            }
            else if ($(domObject).is(':file')) {
                //console.log("RADIO TYPE = " + domObject);
                // $(domObject).get(0).files.push(value);

            }
            else {
                //console.log("ELSE TYPE = " + domObject);
                $(domObject).val(value);
                $(domObject).trigger("change");

            }

        });

        if (loadMap['proposedEffectiveDate'].length == 0) {
            $('#proposedEffectiveDate').val("");
            //$("#proposedEffectiveDate").trigger("change");

        }
        if (loadMap['proposedExpirationDate'].length == 0) {
            $('#proposedExpirationDate').val("");
            //$("#proposedExpirationDate").trigger("change");
        }
        $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
        $('#progressBarModal').modal('hide');
        loadingSaveInProgress = false;
    }, 3000);
}

function loadVersionFunction(loadMap) {
    loadingSaveInProgress = true;
    loadedSubmissionMap = loadMap;
    var loadingStep = 1;
    currentStep = 1;


    $('#progressBarHeader').html("Loading Version")
    $('.progress-bar').attr('aria-valuenow', "0").css("width", "0%");
    $('#progressBarModal').modal('show');
    $('.progress-bar').attr('aria-valuenow', "75").animate({
        width: "75%"
    }, 5000);
    var value;
    riskChosen = loadMap['riskChosen'];

    $('a').each(function() {
        if ($(this).html() === loadMap['riskChosen']) {

            // alert("click " + $(this).html())
            var domObject = $(this);
            // console.log($(domObject).html())
            $(domObject).trigger('click');
        }
    });


    if (loadMap['proposedEffectiveDate'].length > 0) {
        var dateTemp = loadMap['proposedEffectiveDate']
        var monthsTemp = parseInt(dateTemp.split("/")[0])
        var daysTemp = parseInt(dateTemp.split("/")[1])
        var yearsTemp = parseInt(dateTemp.split("/")[2])
        if(monthsTemp < 10){
            monthsTemp = '0' + monthsTemp;

        }
        if(daysTemp < 10 ){
            daysTemp = '0' + daysTemp;
        }
        var finalDateString = monthsTemp + "/" + daysTemp + "/" + yearsTemp
        $('#proposedEffectiveDate').val(finalDateString);
        $("#proposedEffectiveDate").trigger("change");

    }
    if (loadMap['proposedExpirationDate'].length > 0) {
        var dateTemp = loadMap['proposedExpirationDate']
        var monthsTemp = parseInt(dateTemp.split("/")[0])
        var daysTemp = parseInt(dateTemp.split("/")[1])
        var yearsTemp = parseInt(dateTemp.split("/")[2])
        if(monthsTemp < 10){
            monthsTemp = '0' + monthsTemp;
        }
        if(daysTemp < 10 ){
            daysTemp = '0' + daysTemp;
        }
        var finalDateString = monthsTemp + "/" + daysTemp + "/" + yearsTemp

        $('#proposedExpirationDate').val(finalDateString);
        $("#proposedExpirationDate").trigger("change");

    }
    if (loadMap['proposedTermLength'].length > 0) {
        $('#proposedTermLength').val(loadMap['proposedTermLength']);
        //$("#proposedTermLength").trigger("change");
    }
    if (loadMap['totalBudgetConfirm'].length > 0) {

        $('#totalBudgetConfirm').val(loadMap['totalBudgetConfirm']);
        $("#totalBudgetConfirm").trigger("change");

    }

    enableCoverageOptionsContainer()


    setTimeout(function() {
        // console.log("spec films loaded: " + specFilmsScriptLoaded)
        Object.keys(loadMap).forEach(function(key) {

            value = loadMap[key];
            var domObject = $('#' + key);
            // console.log($(domObject).attr('id') + " == " + $(domObject).val())
            if ($(domObject).css("display") != "none") {
                $(domObject).css('display', '');
            }

            if ($(domObject).is("select")) {
                $(domObject).val(value);
                //console.log("SELECT TYPE = " + domObject);
                // $(domObject).trigger("change");
            }
            else if ($(domObject).is(':checkbox')) {
                //console.log("CHECKBOX TYPE = " + domObject);
                if (value === true) {
                    $(domObject).prop("checked", true);

                }
                else {
                    $(domObject).prop("checked", false);
                }
                // $(domObject).trigger("change");

            }
            else if ($(domObject).is(':radio')) {
                //console.log("RADIO TYPE = " + domObject);
                if (value === true) {
                    $(domObject).prop("checked", true);
                }
                else {
                    //$(domObject).prop("checked", false);
                }
                // $(domObject).trigger("change");

            }
            else if ($(domObject).is(':file')) {
                //console.log("RADIO TYPE = " + domObject);
                // $(domObject).get(0).files.push(value);

            }
            else {
                //console.log("ELSE TYPE = " + domObject);
                $(domObject).val(value);
                // $(domObject).trigger("change");

            }

        });

        if (loadMap['proposedEffectiveDate'].length == 0) {
            $('#proposedEffectiveDate').val("");
            //$("#proposedEffectiveDate").trigger("change");

        }
        if (loadMap['proposedExpirationDate'].length == 0) {
            $('#proposedExpirationDate').val("");
            //$("#proposedExpirationDate").trigger("change");
        }
        $('.progress-bar').attr('aria-valuenow', "100").css("width", "100%");
        $('#progressBarModal').modal('hide');
        loadingSaveInProgress = false;
        // ratePremiums()
    }, 3000);
}

function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function simulateClickNext(toStep){
    loadingStep = toStep;
    currentStep = toStep;
    var curStepLoad = $("#buttonCircleStep" + loadingStep).closest(".setup-content"),
        curStepBtnLoad = curStepLoad.attr("id"),
        nextStepWizardLoad = $('div.setup-panel div a[href="#step-' + curStepBtnLoad + '"]').parent().next().children("a"),
        curInputsLoad = curStepLoad.find("input[type='text'],input[type='url']")
    var $target = $($("#buttonCircleStep" + loadingStep).attr('href')),
        $item = $(this);
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');
    allWells.hide();
    navListItems.removeClass('btn-primary').addClass('btn-default');
    $("#buttonCircleStep" + loadingStep).addClass('btn-primary');
    allWells.hide();
    $target.show();
    $target.find('input:eq(0)').focus();

    $('html,body').scrollTop(0);
}

function autoSaveFunction() {

    autoSaveMap['riskChosen'] = getRiskTypeChosen();

    $("input, select").each(function() {
        if ($(this).css("display") != "none") {
            if ($(this).is("select")) {
                autoSaveMap[$(this).attr('id')] = $(this).val();
            }
            else if ($(this).is(':checkbox')) {
                if ($(this).is(":checked")) {
                    //alert($(this).val());
                    autoSaveMap[$(this).attr('id')] = true;
                }
            }
            else if ($(this).is(':radio')) {
                if ($(this).is(":checked")) {
                    autoSaveMap[$(this).attr('id')] = true;
                }
            }
            else if ($(this).is(':file')) {
            }
            else {
                autoSaveMap[$(this).attr('id')] = $(this).val();
            }
        }
    });

    autoSaveMap["attachedFiles"] = attachedFileMap;

    //console.log(JSON.stringify(autoSaveMap))
    // Cookies.set("autosaveData", JSON.stringify(autoSaveMap), {
    //     expires: 2
    // });

    // $.ajax({
    //     method: "POST",
    //     url: "/Async/autoSaveProgress",
    //     data: {
    //         savedDataMap : JSON.stringify(autoSaveMap)
    //     }
    // })
    //     .done(function(msg) {
    //
    //     });
}

function saveProgress() {
    var autosave = false;

    lastSaveTime = new Date();
    if(arguments[0] === "autosave"){
        autosave = true;
    }
    if(true){
        console.log("Saving Progress")
        autoSaveMap['riskChosen'] = getRiskTypeChosen();

        //GET CURRENT STEP
        var saveStep = currentStep;

        autoSaveMap['saveStep'] = saveStep;

        //ALL VISIBLE INPUTS
        $("input, select").each(function() {
            if ($(this).css("display") != "none") {
                if ($(this).is("select")) {
                    autoSaveMap[$(this).attr('id')] = $(this).val();
                }
                else if ($(this).is(':checkbox')) {
                    if ($(this).is(":checked")) {
                        //alert($(this).val());
                        autoSaveMap[$(this).attr('id')] = true;
                    }
                }
                else if ($(this).is(':radio')) {
                    if ($(this).is(":checked")) {
                        autoSaveMap[$(this).attr('id')] = true;
                    }
                }
                else if ($(this).is(':file')) {
                }
                else {
                    autoSaveMap[$(this).attr('id')] = $(this).val();
                }
            }
        });

        autoSaveMap["attachedFiles"] = attachedFileMap;

        var saveName = "saveData_" + autoSaveMap['riskChosen'] + "saveData_" + autoSaveMap['namedInsured'] + "saveData_" + moment().format('MM/DD/YY HH:mm');
        autoSaveMap["saveName"] = saveName
        autoSaveMap["isAutoSave"] = autosave
        //autoSaveMap["coverageOptionsDiv"] = $('#coverageOptionsReview').html()


        //SAVE TO LOCAL STORAGE FIRST JUST IN CASE
        if(autosave){
            try {
                localStorage.setItem(saveName, JSON.stringify(autoSaveMap))
            } catch(e) {
                if(checkCookie()){
                    Cookies.set(saveName, JSON.stringify(autoSaveMap), {
                        expires: 3
                    });
                }
                else{

                }

            }

        }

        $.ajax({
            method: "POST",
            url: "/Async/saveSubmissionProgress",
            data: {
                savedDataMap : JSON.stringify(autoSaveMap),
                autosave: autosave,
                saveName: saveName
            }
        })
            .done(function(msg) {
                if(msg === "Error"){
                    try {
                        localStorage.setItem(saveName, JSON.stringify(autoSaveMap))
                    } catch(e) {
                        if(checkCookie()){
                            Cookies.set(saveName, JSON.stringify(autoSaveMap), {
                                expires: 3
                            });
                        }
                        else{
                            alert("Save Not Successful")
                        }

                    }

                }
            });
    }
}

function checkCookie(){
    var cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled){
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
    }
    return cookieEnabled || showCookieFail();
}

function showCookieFail(){
    alert("Please enable browser cookies for this feature.")
}
