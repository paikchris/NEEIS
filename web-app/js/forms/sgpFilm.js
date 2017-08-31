$(document).ready(function() {
    $('.currency').maskMoney({
        prefix: '$',
        precision: "0"
    });

    //universal Show and Hide for Radio and Checkboxes
    $(document.body).on('change', 'input:checkbox, input:radio' ,function(){
        //Hide Other Radio Containers
        if ($(this).is(':radio')){
            var radioName = $(this).attr('name')
            $("input:radio[name='" + radioName + "']").each(function(){
                if($(this).is(":checked")){
                    $(this).closest(".selectionContainer").children().css('display', '');
                }
                else{
                    $(this).closest(".selectionContainer").children(':not(:first-child)').css('display', 'none');
                    $(this).css('display', '');
                }
            });
        }
        else{
            if($(this).is(":checked")){
                $(this).closest(".selectionContainer").children().css('display', '');
            }
            else{
                $(this).closest(".selectionContainer").children(':not(:first-child)').css('display', 'none');
                $(this).css('display', '');
            }
        }
    });


    //PRIMARY AND CONTINGENT WORKERS COMP SELECTION CONTROL (ONLY ONE CAN BE SELECTED AT A TIME)
    $(document.body).on('change', '.sgpSilver_WCOption' ,function(){
        var changedElem = this;
        $('.sgpSilver_WCOption').each(function(){
            if(this != changedElem){
                $(this).prop('checked', false);
                $(this).closest(".selectionContainer").children(':not(:first-child)').css('display', 'none');
                $(this).css('display', '');
            }
            else{

            }
        });
    });
    $(document.body).on('change', '.sgpGold_WCOption' ,function(){
        var changedElem = this;
        $('.sgpGold_WCOption').each(function(){
            if(this != changedElem){
                $(this).prop('checked', false);
                $(this).closest(".selectionContainer").children(':not(:first-child)').css('display', 'none');
                $(this).css('display', '');
            }
            else{

            }
        });
    });
    $(document.body).on('change', '.sgpPlatinum_WCOption' ,function(){
        var changedElem = this;
        $('.sgpGold_WCOption').each(function(){
            if(this != changedElem){
                $(this).prop('checked', false);
                $(this).closest(".selectionContainer").children(':not(:first-child)').css('display', 'none');
                $(this).css('display', '');
            }
            else{

            }
        });
    });

    $(document.body).on('change', '#productChoicesDiv :input', function() {
        //console.log("CALL FROM COST OF HIRE")
        ratePremiums(this);
    });
});