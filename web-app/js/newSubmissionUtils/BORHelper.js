
function initializeBORFunctions(){
      //FINDING BOR MATCH IN AIM
      var matchNum = 0;
      $("#namedInsured, #zipCodeMailing").bind("change", function() {
          console.log($(this).attr('id'))
          if ($(this).attr('id') === "namedInsured") {
              var originalName = $(this).val();
              var formattedName = capitalizeFirstLetters(originalName);
              $(this).val( formattedName );
              $("#nameOfProductionCompany").val(formattedName);
              $("#nameOfProductionCompany").attr('placeholder', '');
          }
          else if($(this).attr('id') === "zipCodeMailing"){
              if ($(this).val().trim().length != 5){
                  // alert("zipcode not correct")
                  $("#zipCodeMailing").closest(".form-group").removeClass("has-success");
                  $("#zipCodeMailing").closest(".form-group").addClass("has-error");
              }
              else{
                  $("#zipCodeMailing").closest(".form-group").removeClass("has-error");
              }

          }

          if (currentStep === 3) {
              checkNamedInsured();
          }

      });

      //BOR MODAL RESOLVE, REVIEW NEEDED
      $("#ignoreConflictBOR").on("click", function() {
          var result = prompt("Renewal BOR Bypass");
          if (result === "password") {
              $("#namedInsured").closest(".form-group").removeClass("has-success");
              $("#namedInsured").siblings(".glyphicon-ok").css("display", "none");

              $("#namedInsured").closest(".form-group").removeClass("has-error");
              $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
              $('#namedInsured').attr("data-original-title", "");


              $("#namedInsured").siblings(".glyphicon-list-alt").css("display", "none");

              $('#checkNamedInsuredModal').modal('hide');
              BORrequested = false;
              $('#BORRequestNotification').css('display', "none");
              namedInsuredConflict = false;
          }

      });

    //RENEWAL BUTTONS
    $("#yesRenewalButton").on("click", function() {
        $('#renewalModal').modal('hide');
        markNamedInsuredInputAsRenewal();
        markSubmissionAsRenewalRequested()

        namedInsuredConflict = false;
    });
    $("#noRenewalButton").on("click", function() {
        $('#renewalModal').modal('hide');
        $("#checkNamedInsuredModal").modal('show');
    });

    //BOR BUTTONS
    $("#requestBORButton").on("click", function() {
        $('#checkNamedInsuredModal').modal('hide');
        markSubmissionAsBORRequested();
        namedInsuredConflict = false;
    });

}

function checkNamedInsured(){
    var checkName = $("#namedInsured").val();
    var zipCodeMailing = $("#zipCodeMailing").val();
    var zipCodePhysical = $("#zipCodePhysical").val();

    if (checkName.length > 1 && (zipCodeMailing.length == 5)) {
        namedInsuredConflict = true;
        markNamedInsuredInputAsWarning();
        $('#checkNameSpinner').css('display', '');
        $.ajax({
            method: "POST",
            url: "/main/checkNamedInsured",
            data: {
                checkName: checkName,
                zipCodeMailing: zipCodeMailing,
                zipCodePhysical: zipCodePhysical,
            },
            tryCount : 0,
            retryLimit : 3,
            error : function(xhr, textStatus, errorThrown ) {
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        this.tryCount++;
                        console.log("Retrying")

                        $.ajax(this);
                        return;
                    }
                    return;
            }
        })
            .done(function(msg) {
                $('#checkNameSpinner').css('display', 'none');
                namedInsuredConflict = false;

                markNamedInsuredInputReset();
                // $("#zipCodeMailing").closest(".form-group").removeClass("has-error");

                clearRenewalAndBORFromSubmission();

                if(msg.startsWith("RENEWAL")){
                    namedInsuredConflict = true;
                    var matchingSubmissionsArray = msg.replace("RENEWAL&;;&" , "").split("&;;&");
                    console.log(matchingSubmissionsArray)
                    fillRenewalFields(matchingSubmissionsArray);
                    $("#renewalModal").modal('show');
                }
                else if(msg.startsWith("BOR")){
                    namedInsuredConflict = true;
                    var matchingnamesArray = msg.replace("BOR&;;&" , "").split("&;;&");

                    markNamedInsuredInputAsError();
                    //fill resolve Named Insured Modal
                    fillBORModalFields(matchingnamesArray);
                    $("#checkNamedInsuredModal").modal('show');
                }
                else if(msg.startsWith("OK")){
                    namedInsuredConflict = false;
                    $('#BORRequestNotification').css('display', "none");
                    markNamedInsuredInputAsOK()

                }

            });
    }
    else {
        clearRenewalAndBORFromSubmission();
        // if (checkName.length == 0){
        //     markNamedInsuredInputAsError();
        // }
        //

    }
}

function fillRenewalFields(matchingSubmissionsArray){
    $('#namedInsuredRenewalSpan').html($('#namedInsured').val());
    $('#agencyRenewalSpan').html($('#userDetails-company').html().trim());

    var matchHtmlString = "";
    for(var i=0; i< matchingSubmissionsArray.length; i++){
        if(matchingSubmissionsArray[i].split("&;&").length > 1 ){
            matchHtmlString = matchHtmlString + "<div class='row' style='font-size: smaller;text-align: center;'>" +
                "<div class='col-xs-2'>" + matchingSubmissionsArray[i].split("&;&")[0] + "</div>" +
                "<div class='col-xs-3'>" + matchingSubmissionsArray[i].split("&;&")[1] + "</div>" +
            "<div class='col-xs-3'>" + matchingSubmissionsArray[i].split("&;&")[2] + "</div>" +
                "<div class='col-xs-3'>" + matchingSubmissionsArray[i].split("&;&")[3] + "</div>" +
            "</div>";
        }

    }

    $('#renewalMatchesContainer').html(matchHtmlString);

}

function fillBORModalFields(matchingSubmissionsArray){
    $('#resolveNamedInsured').val($('#namedInsured').val())
    $('#resolveStreet').val($('#googleAutoAddress').val());
    $('#resolveCity').val($('#cityMailing').val());
    $('#resolveState').val($('#stateMailing').val());
    $('#resolveZip').val($('#zipCodeMailing').val());


    var htmlString = "";
    for (var i = 0; i < matchingSubmissionsArray.length; i++) {
        if (matchingSubmissionsArray[i].trim().length > 0) {
            htmlString = htmlString + "<div class='row col-xs-12'><span class='col-xs-8' style='color:red'>" + matchingSubmissionsArray[i] + "</span>" +
                "<span class='col-xs-4' style='color:red'>Broker of Record Needed</span></div>";
        }
    }
    $('#matchingSubmissionsContainer').html(htmlString);
    //
    // if (currentStep == 3) {
    //     $('#checkNamedInsuredModal').modal({
    //         backdrop: 'static',
    //         keyboard: false
    //     });
    //     $("#resolveNamedInsured").trigger('change');
    // }
}

function clearRenewalAndBORFromSubmission(){
    BORrequested = false;
    renewalRequested = false;

    $('#BORRequestNotification').css('display', "none");
    $('#renewalNotification').css('display', "none");
    $("#namedInsured").siblings(".glyphicon-list-alt").css("display", "none");

    markNamedInsuredInputReset();
}

function markSubmissionAsBORRequested(){
    markNamedInsuredInputReset();
    clearRenewalAndBORFromSubmission();

    BORrequested = true;
    $('#BORRequestNotification').css('display', "");

    markNamedInsuredInputAsBOR();
}

function markSubmissionAsRenewalRequested(){
    markNamedInsuredInputReset();
    clearRenewalAndBORFromSubmission();

    renewalRequested = true;
    $('#renewalNotification').css('display', "");

    markNamedInsuredInputAsRenewal();
}

function markNamedInsuredInputAsError(){
    markNamedInsuredInputReset();

    $("#namedInsured").closest(".form-group").addClass("has-error");
    $("#namedInsured").siblings(".glyphicon-remove").css("display", "");
}

function markNamedInsuredInputAsWarning(){
    markNamedInsuredInputReset();

    $("#namedInsured").closest(".form-group").addClass("has-warning");
}

function markNamedInsuredInputAsOK(){
    markNamedInsuredInputReset();

    $("#namedInsured").closest(".form-group").addClass("has-success");
    $("#namedInsured").siblings(".glyphicon-ok").css("display", "");
}

function markNamedInsuredInputAsBOR(){
    markNamedInsuredInputReset();

    $("#namedInsured").closest(".form-group").addClass("has-bor");
    $("#namedInsured").siblings(".glyphicon-list-alt").css("display", "");
}

function markNamedInsuredInputAsRenewal(){
    markNamedInsuredInputReset();

    $("#namedInsured").closest(".form-group").addClass("has-success");
    $("#namedInsured").siblings(".renewIcon").css("display", "");
}

function markNamedInsuredInputReset(){
    $("#namedInsured").closest(".form-group").removeClass("has-success");
    $("#namedInsured").closest(".form-group").removeClass("has-error");
    $("#namedInsured").closest(".form-group").removeClass("has-warning");
    $("#namedInsured").closest(".form-group").removeClass("has-bor");


    $("#namedInsured").siblings(".glyphicon").css("display", "none");
    $("#namedInsured").siblings(".namedInsuredIcon").css("display", "none");

}

