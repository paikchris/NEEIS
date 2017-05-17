var attachedFileMap = {

}

function intializeFileAttachButtons(){
    $(document).on('click', '.attachButton', function() {
        //Make sure Add File Button has right number
        var num = 1;
        $('.fileRow').each(function(){
            var rowNum = parseInt($(this).attr('id').split("_")[1]);
            if(rowNum >= num){
                num = rowNum + 1;
            }
        });
        // alert(num);
        var newIDstring = "uploadFormFile_"+num


        $('#attachmentsModal').modal("show");
        $('.uploadButtonForm').last().attr("id", newIDstring)
    });

    $(document).on('click', '.attachFileButton', function() {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "file");

    });

    $(document).on('change', '.modalFile', function() {
        var htmlElem = this;
        fileUploadChangeHandler(this);
    });

    $(document).on('click', '.fileDeleteFAIcon', function() {
        var htmlElem = this;
        removeFileFromUploadList(htmlElem)
    });


    $(document).on('click', '.doneButtonAttachmentsModal', function() {
        $('#attachmentsModal').modal("hide");
    });

}

function addFileToUploadMap(uuid, fileName, fileSize, fileRowID){
    var tempFile = {}
    tempFile.uuid = uuid;
    tempFile.fileName = fileName;
    tempFile.fileSize = fileSize;
    tempFile.fileRowID = fileRowID;

    attachedFileMap[uuid] = tempFile;
    console.log(attachedFileMap);
}

function removeFileFromUploadList(htmlElem){
    var fileNum = parseInt($(htmlElem).closest(".fileRow").attr('id').split("_")[1])
    var fileUUID =  $("#fileRow_" + fileNum).attr('data-fileuuid');

    $("#fileRow_" + fileNum).remove();
    $("#uploadFormFile_" + fileNum).remove();

    calculateModalFileListTotalUploadSize();
    delete attachedFileMap[fileUUID]
    console.log(attachedFileMap);



    var formData = new FormData();
    console.log("#fileRow_" + fileNum )
    console.log(fileUUID)
    formData.append("fileUUID", fileUUID)

    $.ajax({
        method: "POST",
        url: "/async/removeTempFile",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
        .done(function(msg) {
            console.log(msg)
        });

}

function loadSavedAttachedFiles(savedAttachedFileMap){
    for (var key in savedAttachedFileMap) {
        var name = savedAttachedFileMap[key].fileName
        var size = savedAttachedFileMap[key].fileSize
        var ext  = name.split('.').pop().toLowerCase();
        var fileUUID = key;
        var fileRowID = savedAttachedFileMap[key].fileRowID

        addFileToUploadListHTML(fileRowID, getFileIconPath(ext), name, ext, size, fileUUID)
        $('#' + fileRowID).find('.fa-check').css("display", "");
    }
    calculateModalFileListTotalUploadSize();

}

function fileUploadChangeHandler(htmlElem){
    var file = htmlElem.files[0];

    var name = file.name;
    var size = file.size;
    var type = file.type;
    var ext = $(htmlElem).val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['zip', 'doc', 'docx', 'xlsx', 'xls', 'pdf', 'txt']) == -1) {
        alert('Only .zip, .doc, .docx, .xlsx, .xls, .pdf, .txt are permitted');
        $(htmlElem).val('');
    }
    else if(totalUploadSizeOverLimit()){
        alert('Total Upload exceeds 10MB');
        $(htmlElem).val('');
    }
    else {
        var iconFilePath = getFileIconPath(ext);

        var fileNum = parseInt($(htmlElem).closest('.uploadButtonForm').attr('id').split("_")[1]);
        var fileRowID = "fileRow_" + fileNum

        addFileToUploadListHTML(fileRowID, iconFilePath, name, ext, size, "");

        calculateModalFileListTotalUploadSize();
        startUploadIntoTempFolder(htmlElem, fileRowID);


        //HIDE FILE BUTTON AND CREATE NEW ONE
        var newButtonHtml =
            "<div class='uploadButtonForm' id='uploadFormFile_" + (fileNum + 1) + "'>" +
            "<form enctype='multipart/form-data'>" +
            "<div class='fileUpload btn btn-primary'>" +
            "<span>Add File</span>" +
            "<input class='file modalFile' name='file' type='file' class='file' style='width:120px'/>" +
            "</div>" +
            "<button class='btn btn-primary doneButtonAttachmentsModal' type='button'>Done</button>"
        "</form>" +
        "</div>";

        $(htmlElem).closest(".uploadButtonForm").css("display", "none");

        $('#uploadButtonsContainer').append(newButtonHtml);
    }


}

function addFileToUploadListHTML(fileRowID, iconFilePath, name, ext, size, fileUUID){
    $("#attachmentModalFileRowsContainer").append("" +
        "<div class='row fileRow' style='margin-top: 10px;' id='" + fileRowID + "' data-fileuuid='" + fileUUID + "'>" +
        "<div class='col-xs-10 col-xs-offset-1'>" +
        "<img src='/images/" + iconFilePath + "' height='32' width='32' style='margin-right:5px'>" +
        "<span style='max-width: 60%; overflow: hidden; display: inline-block; white-space: nowrap; text-overflow: ellipsis;'>" + name + "</span>" +
        "<i class='fa fa-spinner fa-spin pull-rightfa-fw' style='margin-top: 7px; color: rgba(43, 97, 183, 0.79); display:none'></i>"+
        "<i class='fa fa-check pull-right fa-fw' style='margin-top: 7px; color: rgba(4, 174, 49, 0.9); display:none'></i>"+
        "<i class='fa fa-times-circle pull-right fileDeleteFAIcon' aria-hidden='true' style=''></i>" +
        "<span class='fileSizeSpan pull-right' style='padding-top:4px;'>" + formatBytes(size) + "</span>" +
        "<span class='fileSizeSpanUnformatted pull-right' style='display:none; padding-top:4px;'>" + size + "</span>" +
        "</div>" +
        "</div>");
}

function getFileIconPath(ext){
    var path = "";
    if (ext == "zip") {
        path = "zipIcon.png"
    }
    else if (ext == "doc") {
        path = "docIcon.png"
    }
    else if (ext == "docx") {
        path = "docxIcon.png"
    }
    else if (ext == "xls") {
        path = "xlsIcon.png"
    }
    else if (ext == "xlsx") {
        path = "xlsxIcon.png"
    }
    else if (ext == "pdf") {
        path = "pdfIcon.png"
    }
    else if (ext == "txt") {
        path = "txtIcon.png"
    }
    else {
        path = "fileIcon.png"
    }

    return path;
}

function totalUploadSizeOverLimit(){
    var totalUploadSize = 0;
    $('input:file').each(function(){
        var file = $(this).get(0).files[0];
        if(file){
            totalUploadSize = totalUploadSize + file.size;
        }
    });
    // alert(totalUploadSize)


    if(totalUploadSize < 10485760){
        return false;
    }
    else{
        return true
    }
}

function calculateModalFileListTotalUploadSize(){
    var totalUploadSize = 0;
    $('.fileSizeSpanUnformatted').each(function(){
        totalUploadSize = totalUploadSize + parseInt($(this).html());
    });

    if(totalUploadSize < 10485760){
        $("#totalUploadSizeSpan").html(formatBytes(totalUploadSize))
        return true;
    }
    else{
        return false
    }


}

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

function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    var k = 1000,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function startUploadIntoTempFolder(htmlElem, fileRowID){
    var formData = new FormData();
    var fileUUID = generateUUID();

    var file = $(htmlElem).get(0).files[0];
    console.log(fileRowID)
    $('#' + fileRowID).find('.fa-spinner').css("display", "");


    if(file){
        formData.append("file", file);
        formData.append("fileUUID", fileUUID)
        formData.append("fileRealName", file.name)
        formData.append("fileSize", file.size)
        $.ajax({
            method: "POST",
            url: "/async/uploadAttachedFile",
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
            .done(function(msg) {
                // alert(msg)
                $('#' + fileRowID).find('.fa-spinner').css("display", "none");

                if(msg.startsWith("Upload Completed")){
                    $('#' + fileRowID).attr("data-fileuuid", fileUUID)
                }
                $('#' + fileRowID).find('.fa-check').css("display", "");
                addFileToUploadMap(fileUUID, file.name, file.size, fileRowID)
            });
    }



}

