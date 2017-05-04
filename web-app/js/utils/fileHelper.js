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

function getFormDataWithAllAttachedFilesNew(){
    var formData = new FormData();
    $('input:file').each(function(){
        var file = $(this).get(0).files[0];
        if(file){
            formData.append($(this).attr('id'), file);
        }
    });

    return formData;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};