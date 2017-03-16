


function initializeBORFunctions(){
      //FINDING BOR MATCH IN AIM
      var matchNum = 0;
      var matchingnamesArray = "";
      $("#namedInsured, #zipCodeMailing, #googleAutoAddress").bind("change focusout", function() {
          console.log($(this).attr('id'))
          if ($(this).attr('id') === "namedInsured") {
              capitalizeFirstLetters($(this));
          }
          var checkName = $("#namedInsured").val();
          var zipCodeMailing = $("#zipCodeMailing").val();
          var zipCodePhysical = $("#zipCodePhysical").val();
          //alert(currentStep);
          console.log(checkName.length + "," + zipCodeMailing.length + "," + currentStep)
          if (currentStep === 3) {
              if (checkName.length > 1 && (zipCodeMailing.length == 5)) {
                  $.ajax({
                          method: "POST",
                          url: "/portal/main/checkNamedInsured",
                          data: {
                              checkName: checkName,
                              zipCodeMailing: zipCodeMailing,
                              zipCodePhysical: zipCodePhysical
                          }
                      })
                      .done(function(msg) {
                          matchNum = 0;
                          matchingnamesArray = "";
                          //MSG RETURNS THE NUMBER OF MATCHES IN NAMEDINSURED AND ZIPCODE
                          matchNum = msg.split("&;&")[0];
                          matchingnamesArray = msg.split("&;&")[1].split("&,&");
                          if (parseInt(matchNum) > 0) { //if THERE IS AT LEAST ONE MATCH
                              namedInsuredConflict = true;
                              //console.log("check show error")

                              $("#namedInsured").closest(".form-group").addClass("has-error");
                              $("#namedInsured").siblings(".glyphicon-remove").css("display", "");

                              $("#namedInsured").closest(".form-group").removeClass("has-success");
                              $("#namedInsured").siblings(".glyphicon-ok").css("display", "none");
                              $("#namedInsured").siblings(".glyphicon-list-alt").css("display", "none");

                              $('#namedInsured').attr("data-original-title", "Named Insured already exists");


                              //fill resolve Named Insured Modal
                              //alert($('#googleAutoAddress').val())
                              $('#resolveNamedInsured').val($('#namedInsured').val())
                              $('#resolveStreet').val($('#googleAutoAddress').val());
                              $('#resolveCity').val($('#cityMailing').val());
                              $('#resolveState').val($('#stateMailing').val());
                              $('#resolveZip').val($('#zipCodeMailing').val());

                              var htmlString = "";
                              for (var i = 0; i < matchingnamesArray.length; i++) {
                                  if (matchingnamesArray[i].trim().length > 0) {
                                      htmlString = htmlString + "<div class='row col-xs-12'><span class='col-xs-8' style='color:red'>" + matchingnamesArray[i] + "</span>" +
                                          "<span class='col-xs-4' style='color:red'>Broker of Record Needed</span></div>";
                                  }

                              }
                              $('#matchingSubmissionsContainer').html(htmlString);

                              if (currentStep == 3) {
                                  $('#checkNamedInsuredModal').modal({
                                      backdrop: 'static',
                                      keyboard: false
                                  });
                                  $("#resolveNamedInsured").trigger('change');
                              }

                          }
                          else if (parseInt(matchNum) == 0) { //IF NAME IS GOOD AND UNIQUE
                              //console.log("check no error")

                              $("#namedInsured").closest(".form-group").removeClass("has-error");
                              $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
                              $("#namedInsured").siblings(".glyphicon-list-alt").css("display", "none");


                              $("#namedInsured").closest(".form-group").addClass("has-success");
                              $("#namedInsured").siblings(".glyphicon-ok").css("display", "");
                              $('#namedInsured').attr("data-original-title", "Name is unique");
                              BORrequested = false;
                              $('#BORRequestNotification').css('display', "none");
                              namedInsuredConflict = false;
                          }
                      });
              }
              else {
                  console.log("check remove all")

                  $("#namedInsured").closest(".form-group").removeClass("has-success");
                  $("#namedInsured").siblings(".glyphicon-ok").css("display", "none");

                  $("#namedInsured").closest(".form-group").removeClass("has-error");
                  $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
                  $("#namedInsured").siblings(".glyphicon-list-alt").css("display", "none");

                  $('#namedInsured').attr("data-original-title", "");
                  BORrequested = false;
                  $('#BORRequestNotification').css('display', "none");
                  namedInsuredConflict = false;

              }
          }

      });

      //BOR MODAL NAME RESOLVE NOT NEEDED?
      $("#resolveNamedInsured, #resolveZip").bind("change focusout", function() {
          var checkName = $("#resolveNamedInsured").val();
          var resolveZip = $("#resolveZip").val();
          //console.log(checkName.length + "," + resolveZip.length + "," + currentStep)

          if (currentStep === 3) {
              if (checkName.length > 1 && (resolveZip.length == 5)) {
                  $.ajax({
                          method: "POST",
                          url: "/portal/main/checkNamedInsured",
                          data: {
                              checkName: checkName,
                              zipCodeMailing: resolveZip,
                              zipCodePhysical: ""
                          }
                      })
                      .done(function(msg) {
                          namedInsuredConflict = true;
                          matchNum = 0;
                          matchingnamesArray = "";
                          //MSG RETURNS THE NUMBER OF MATCHES IN NAMEDINSURED AND ZIPCODE
                          matchNum = msg.split("&;&")[0];
                          matchingnamesArray = msg.split("&;&")[1].split("&,&");
                          if (parseInt(matchNum) > 0) { //if THERE IS AT LEAST ONE MATCH
                              //console.log("resolve show error")
                              $("#resolveNamedInsured").closest(".form-group").addClass("has-error");
                              $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display", "");

                              $("#resolveNamedInsured").closest(".form-group").removeClass("has-success");
                              $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display", "none");
                              $('#resolveNamedInsured').attr("data-original-title", "Named Insured already exists");

                              var htmlString = "";
                              for (var i = 0; i < matchingnamesArray.length; i++) {
                                  if (matchingnamesArray[i].trim().length > 0) {
                                      htmlString = htmlString + "<div class='row col-xs-12'><span class='col-xs-8' style='color:red'>" + matchingnamesArray[i] + "</span>" +
                                          "<span class='col-xs-4' style='color:red'>Broker of Record Needed</span></div>";
                                  }

                              }
                              $('#matchingSubmissionsContainer').html(htmlString);
                              $('#conflictExistsDiv').css('display', '');
                              document.getElementById("resolveConflictBOR").disabled = false;


                          }
                          else if (parseInt(matchNum) == 0) { //IF NAME IS GOOD AND UNIQUE
                              //console.log("resolve no error")
                              $("#resolveNamedInsured").closest(".form-group").removeClass("has-error");
                              $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display", "none");

                              $("#resolveNamedInsured").closest(".form-group").addClass("has-success");
                              $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display", "");
                              $('#resolveNamedInsured').attr("data-original-title", "Name is unique");

                              $('#matchingSubmissionsContainer').html("");
                              $('#conflictExistsDiv').css('display', 'none');
                              BORrequested = false;
                              $('#BORRequestNotification').css('display', "none");
                              namedInsuredConflict = false;
                              document.getElementById("resolveConflictBOR").disabled = true;

                          }
                      });
              }
              else {
                  console.log("resolve remove all")
                  $("#resolveNamedInsured").closest(".form-group").removeClass("has-success");
                  $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display", "none");

                  $("#resolveNamedInsured").closest(".form-group").removeClass("has-error");
                  $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display", "none");
                  $('#resolveNamedInsured').attr("data-original-title", "");
                  BORrequested = false;
                  $('#BORRequestNotification').css('display', "none");
                  namedInsuredConflict = false;

              }

          }

      });

      //BOR MODAL RESOLVER FUNCTION, NEEDED?
      $("#resolveConflictContinue").on("click", function() {
          document.getElementById("resolveConflictBOR").disabled = true;
          var checkName = $("#resolveNamedInsured").val();
          var resolveZip = $("#resolveZip").val();
          //console.log(checkName.length + "," + resolveZip.length + "," + currentStep)

          if (checkName.length > 1 && (resolveZip.length == 5)) {
              $.ajax({
                      method: "POST",
                      url: "/portal/main/checkNamedInsured",
                      data: {
                          checkName: checkName,
                          zipCodeMailing: resolveZip,
                          zipCodePhysical: ""
                      }
                  })
                  .done(function(msg) {
                      matchNum = 0;
                      matchingnamesArray = "";
                      //MSG RETURNS THE NUMBER OF MATCHES IN NAMEDINSURED AND ZIPCODE
                      matchNum = msg.split("&;&")[0];
                      matchingnamesArray = msg.split("&;&")[1].split("&,&");
                      if (parseInt(msg) > 0) { //if THERE IS AT LEAST ONE MATCH
                          //console.log("resolve show error")
                          namedInsuredConflict = true;
                          $("#resolveNamedInsured").closest(".form-group").addClass("has-error");
                          $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display", "");

                          $("#resolveNamedInsured").closest(".form-group").removeClass("has-success");
                          $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display", "none");
                          $('#resolveNamedInsured').attr("data-original-title", "Named Insured already exists");

                          var htmlString = "";
                          for (var i = 0; i < matchingnamesArray.length; i++) {
                              if (matchingnamesArray[i].trim().length > 0) {
                                  htmlString = htmlString + "<div class='row col-xs-12'><span class='col-xs-8' style='color:red'>" + matchingnamesArray[i] + "</span>" +
                                      "<span class='col-xs-4' style='color:red'>Broker of Record Needed</span></div>";
                              }

                          }
                          $('#matchingSubmissionsContainer').html(htmlString);
                          $('#conflictExistsDiv').css('display', '');


                          $('#resolveNamedInsured').focus();

                      }
                      else if (parseInt(msg) == 0) { //IF NAME IS GOOD AND UNIQUE
                          $("#resolveNamedInsured").closest(".form-group").removeClass("has-success");
                          $("#resolveNamedInsured").siblings(".glyphicon-ok").css("display", "none");

                          $("#resolveNamedInsured").closest(".form-group").removeClass("has-error");
                          $("#resolveNamedInsured").siblings(".glyphicon-remove").css("display", "none");
                          $('#resolveNamedInsured').attr("data-original-title", "");
                          $('#namedInsured').val($("#resolveNamedInsured").val());
                          $('#googleAutoAddress').val($("#resolveStreet").val());
                          $('#cityMailing').val($("#resolveCity").val());
                          $('#stateMailing').val($("#resolveState").val());
                          $('#zipCodeMailing').val($("#resolveZip").val());
                          $('#namedInsured').trigger('change');
                          $('#checkNamedInsuredModal').modal('hide');
                          BORrequested = false;
                          $('#BORRequestNotification').css('display', "none");
                          namedInsuredConflict = false;

                      }
                      document.getElementById("resolveConflictBOR").disabled = false;
                  });
          }

      });

      //BOR MODAL RESOLVER FUNCTION, REVIEW NEEDED
      $("#resolveConflictBOR").on("click", function() {
          $("#namedInsured").closest(".form-group").removeClass("has-success");
          $("#namedInsured").siblings(".glyphicon-ok").css("display", "none");

          $("#namedInsured").closest(".form-group").removeClass("has-error");
          $("#namedInsured").siblings(".glyphicon-remove").css("display", "none");
          $('#namedInsured').attr("data-original-title", "");


          $("#namedInsured").siblings(".glyphicon-list-alt").css("display", "");

          $('#checkNamedInsuredModal').modal('hide');
          $('#BORRequestNotification').css('display', "");
          BORrequested = true;
          namedInsuredConflict = false;
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


}
