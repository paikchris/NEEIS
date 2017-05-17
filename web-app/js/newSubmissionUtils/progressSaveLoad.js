
//CHECK IF SAVED SUBMISSIONS AVAILABLE, AND SHOW LOAD BUTTON IF EXISTS
function showLoadButtonIfSavedSubmissionsExist(){
    var savedSubmissions = Object.keys(Cookies.get()).filter(function(name) {
        return name.indexOf("saveData_") > -1;
    });
    // console.log(savedSubmissions.length + " Saved Submissions");
    if (savedSubmissions.length > 0) {
        $('#loadProgress').css('display', '');
    }
    else {
        $('#loadProgress').css('display', 'none');
    }
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
        $(window).on('beforeunload', function() {
            if ($("li.active").children("a.riskOptionLink").html().trim().length > 0 &&
                ($('#proposedEffectiveDate').val().length > 0 || $('#proposedExpirationDate').val().length > 0 || $('#totalBudgetConfirm').val().length > 1)) {
                autoSaveFunction();
            }
        });
    }

}

function initializeSubmissionSaveAndLoadButtons(){
    $(document).on('click', '#saveProgress', function() {
        $('#loadingModal').modal('show');

        saveProgress();
        setTimeout(function() {
            $('#loadingModal').modal('hide');
        }, 2000);
    });
    $(document).on('click', '#loadProgress', function() {
        savedSubmissions = Object.keys(Cookies.get()).filter(function(name) {
            return name.indexOf("saveData_") > -1;
        });
        var savedSubmissionHtmlString = "";
        savedSubmissions.forEach(function(name, i) {
            console.log(i);
            if (i < 10) {
                savedSubmissionHtmlString = savedSubmissionHtmlString +
                    " <a href='#' class='list-group-item' style='font-weight: 500'>" +
                    "<i class='fa fa-file-text-o' aria-hidden='true'></i>  <span class='rowLoadName'> " + name + "</span>" +
                    "</a>";
            }
            else {

            }
        });
        $('#savedSubmissionsContainer').html(savedSubmissionHtmlString);

        $('#loadSaveModal').modal('show');
    });
    $(document).on('click', '.rowLoadName', function() {
        $('#loadSaveModal').modal('hide');
        var loadName = $(this).html().trim();
        var loadMap = Cookies.getJSON(loadName);
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


function loadSaveFunction(loadMap) {
    $('#progressBarHeader').html("Loading saved submission")
    $('.progress-bar').attr('aria-valuenow', "0").css("width", "0%");
    $('#progressBarModal').modal('show');
    $('.progress-bar').attr('aria-valuenow', "75").animate({
        width: "75%"
    }, 3000);
    var value;
    riskChosen = loadMap['riskChosen'];

    $('a').each(function() {
        if ($(this).html() === loadMap['riskChosen']) {

            //alert("click " + $(this).html())
            var domObject = $(this);
            //console.log($(domObject).html())
            $(domObject).trigger('click');
        }
    });

    if (loadMap['proposedEffectiveDate'].length > 0) {
        $('#proposedEffectiveDate').val(loadMap['proposedEffectiveDate']);
        $("#proposedEffectiveDate").trigger("change");
    }
    if (loadMap['proposedExpirationDate'].length > 0) {
        $('#proposedExpirationDate').val(loadMap['proposedExpirationDate']);
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

    setTimeout(function() {
        //console.log("wait")
        Object.keys(loadMap).forEach(function(key) {

            value = loadMap[key];
            //console.log("COOKIE VALUE = " + key + "-" + value);
            var domObject = $('#' + key);
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
    }, 2000);







    //

}

function autoSaveFunction() {
    //$( "*").each(function () {
    //    autoSaveMap[$(this).attr('id')] = $(this).val();
    //    //alert(autoSaveMap);
    //
    //});
    //console.log("AUTOSAVING")
    autoSaveMap['riskChosen'] = getRiskTypeChosen();

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
                    //alert($(this).val());
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
    //console.log(JSON.stringify(autoSaveMap))
    Cookies.set("autosaveData", JSON.stringify(autoSaveMap), {
        expires: 7
    });
}

function saveProgress() {
    if(checkCookie()){
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


        // //SAVE ATTACHED FILES
        // var saveUUID = generateUUID();
        // autoSaveMap["saveUUID"] = saveUUID;
        // var formData = new FormData();
        // var formDataNew = getFormDataWithAllAttachedFilesNew();
        //
        // var submissionHasFile = false;
        // $('input:file').each(function(){
        //     var file = $(this).get(0).files[0];
        //     if(file){
        //         submissionHasFile = true;
        //         formData.append($(this).attr('id'), file);
        //     }
        // });
        //
        // if (submissionHasFile) {
        //     formData.append('uuid', saveUUID);
        //
        //     $.ajax({
        //         method: "POST",
        //         url: "/async/saveProgressStoreAttachedFiles",
        //         data: formData,
        //         cache: false,
        //         contentType: false,
        //         processData: false
        //     })
        //         .done(function(msg) {
        //             alert(msg)
        //         });
        // }

        autoSaveMap["attachedFiles"] = attachedFileMap;



        Cookies.set("saveData_" + autoSaveMap['riskChosen'] + "_" + moment().format('MM/DD/YY HH:mm'), JSON.stringify(autoSaveMap), {
            expires: 3
        });

        var test = Object.keys(Cookies.get()).filter(function(name) {
            return name.indexOf("saveData_") > -1;
        });
        console.log(test);
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
