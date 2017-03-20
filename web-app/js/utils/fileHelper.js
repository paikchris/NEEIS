function getFormDataWithAllAttachedFiles(){
    var formData = new FormData();
    var fileArray = [];
    $('input:file').each(function(){
        var file = $(this).get(0).files[0];
        var fileType = $(this).attr('id').replace("File", "").replace("PDF","");
        if(file){
            fileArray.push(file);
            formData.append(fileType, file);
        }
    });

    return formData;
}
