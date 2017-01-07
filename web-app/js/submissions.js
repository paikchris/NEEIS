/**
 * Created by paikchris on 8/23/16.
 */


$(document).ready(function () {

    $("#submissionSearch").on('input', function() {
        $(this).val();

        $.ajax({
            method: "POST",
            url: "/portal/Async/searchSubmissions",
            data: {riskType:  "",
                searchString :  $(this).val()

            }
        })
            .done(function (msg) {
                //alert(msg);
                console.log(msg);

                var htmlString = "";
                var submissionsArray = msg.split("&;;&");
                var aimQuoteID = "";
                var namedInsured = "";
                var coverages = "";
                var submittedBy = "";
                var submitDate = "";
                var statusCode = "";
                var underwriter = "";


                submissionsArray.forEach(function(it) {
                    var aimQuoteID = it.split("&,&")[0];
                    var namedInsured = it.split("&,&")[1];
                    var coverages = it.split("&,&")[2];
                    var submittedBy = it.split("&,&")[3];
                    var submitDate = it.split("&,&")[4];
                    var statusCode = it.split("&,&")[5];
                    if(statusCode === "QO"){
                        statusCode = "Quoted";
                    }

                    var underwriter = it.split("&,&")[6];
                    if(underwriter == "null"){
                        underwriter = "";
                    }

                    htmlString = htmlString + "<tr>" +
                    "<th scope='row'><a href='./../main/submissionView?s=${s.aimQuoteID}'>" + aimQuoteID + "</a></th>" +
                    "<td>" + namedInsured + "</td>" +
                    "<td>" + coverages + "</td>" +
                    "<td>" + submittedBy + "</td>" +
                    "<td>" + submitDate + "</td>" +
                        "<td>" + statusCode + "</td>" +
                        "<td>" + underwriter + "</td>" +
                    "<td><a href='./../web-app/attachments/testpdf.pdf'>my link</a></td>" +
                    "</tr>";
                });

                $('#submissionRows').html(htmlString);
            });
    });

    ////////////////////////////////////////
    $(document).on('click', '.submissionRow', function () {
        //if($(this).next(".submissionQuickOptions").is(":visible") ){
        //    $(this).next(".submissionQuickOptions").css("display", "none");
        //}
        //else{
        //    $(this).next(".submissionQuickOptions").css("display", "");
        //}
        if($(this).next().hasClass("submissionQuickOptions")){
            $(this).next().remove();
        }
        else{
            var htmlString = "<tr class='submissionQuickOptions' style='background: rgba(132, 204, 210, 0.21);'>" +
                "<td colspan='8'>" +
                "<div class='col-xs-6'>" +

                "</div>" +
                "<div class='col-xs-6'>" +
                "<button type='button' class='btn btn-sm btn-default'> Contact Insured </button>" +
                "<button type='button' class='btn btn-sm btn-default'> Change Status To </button>" +
                "<button type='button' class='btn btn-sm btn-default'>Bind</button>" +
                "<button type='button' class='btn btn-sm btn-default'> Request More Info </button>" +
                "<button type='button' class='btn btn-sm btn-default'> Approve </button>" +
                "</div>" +
                "</td>" +
                "</tr>";
            $(this).after(htmlString);
        }


    });


});