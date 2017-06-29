package portal.Utils

import groovy.json.JsonSlurper
import groovy.sql.Sql
import sun.misc.BASE64Decoder
import groovy.xml.*
import wslite.soap.*
import wslite.http.auth.*
import org.apache.commons.net.ftp.FTPClient
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.io.FilenameUtils;
import sun.misc.BASE64Decoder;
import portal.DAO.AIMSQL;
import grails.util.Environment

class FileTransferHelper {
    Random random = new Random();

    def saveAttachedFileToLocalPath(attachedFile, localFolderPath, fileName){
        log.info "SAVING ATTACHED FILE: " + fileName


        File fileDest = new File(localFolderPath, fileName)
        fileDest.mkdirs();
        def file = attachedFile
        file.transferTo(fileDest)
    }

    def deleteLocalTempFile(localFolderPath, fileName){
        String filename = "test.txt"
        // this deletes the file test.txt
        File file = new File(localFolderPath, fileName)
        boolean fileSuccessfullyDeleted =  file.delete()

        return fileSuccessfullyDeleted
    }

    def saveBinaryFileToLocalPath(binaryFile, localPath, fileName){ 
//        def quoteID = jsonSerial.getAt("allQuoteIDs").split(",")[0].split(";")[0]
//        def a = new XmlSlurper().parseText(response.text)
//        def nodeToSerialize = a."**".find {it.name() == 'BinaryFile'}

        try{
            def folder = new File (localPath)
            folder.mkdirs()

            def fullFilePath = localPath + "/" + fileName


            BASE64Decoder decoder = new BASE64Decoder();
            byte[] decodedBytes = decoder.decodeBuffer(binaryFile);

            InputStream is = new ByteArrayInputStream(decodedBytes );
            DataOutputStream out = new DataOutputStream(new  BufferedOutputStream(new FileOutputStream(new File(fullFilePath))));
            int c;
            while((c = is.read()) != -1) {
                out.writeByte(c);
            }
            out.close();
            is.close();
        }
        catch(Exception e){
            throw new IOException(e.getMessage());
        }

    }

    def ftpFileToAIMBULK(attachedFileMap, localFolderPath, quoteIDs, dataSource_aim){
        log.info("FTP FILEs TO AIM")
        log.info(attachedFileMap)
        log.info(quoteIDs)
        AIMSQL aimHelper = new AIMSQL();

        def fileName;
        def remoteFileName;

        def responseString = "";
        boolean done = false;

        String server = "47.180.31.157";
        int port = 21;
        String user = "web_ftp";
        String pass = "Get@4Files";

        FTPClient ftpClient = new FTPClient();


        try {

            ftpClient.connect(server, port);
            ftpClient.login(user, pass);
            ftpClient.enterLocalPassiveMode();

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            String remoteFolderPath
            String remoteFileFullPath

            //CREATE THE DIRECTORIES IN AIMSQL
            quoteIDs.split(",").each{
                def quoteID = it
                log.info "looping: " + it
                if (Environment.current == Environment.DEVELOPMENT) {
                    remoteFolderPath = "/AIMAPP/ATTACHTEST/${quoteID}/";

                }
                else if (Environment.current == Environment.PRODUCTION) {
                    remoteFolderPath = "/AIMAPP/ATTACH/${quoteID}/";
                }

                // Creates a directory
                String dirToCreate = remoteFolderPath;
                boolean success = ftpClient.makeDirectory(dirToCreate);
                if (success) {
                    log.info("Successfully created directory: " + dirToCreate);
                } else {
                    log.info("Did not create directory.");
                }

                attachedFileMap.each { key, value ->
                    log.info "key = " + key
                    log.info "value = " + value
//                def fileRealName = value.fileName
                    def tempFilename = value.uuid

                    fileName = tempFilename
                    remoteFileName = value.fileName
                    String decodedFileName = URLDecoder.decode(remoteFileName, "UTF-8");
                    remoteFileFullPath = remoteFolderPath + decodedFileName;


//              CHECK IF FILE EXISTS
                    boolean fileExists = true;
                    def fileCounter = 0;
                    def returnCode
                    while(fileExists) {
                        log.info("TRYING FILE PATH: " + remoteFileFullPath)
                        String tempString = remoteFolderPath
                        def filesInFolder = ftpClient.listNames(remoteFolderPath).toList();
                        log.info remoteFileFullPath
                        log.info filesInFolder
                        log.info filesInFolder.contains(remoteFileFullPath)
                        if(filesInFolder.contains(remoteFileFullPath)){
                            fileExists = true;
                            def baseName = FilenameUtils.getBaseName(decodedFileName)
                            def extension = FilenameUtils.getExtension(decodedFileName)
                            def fileNameSplit = baseName.split("-");
                            log.info("SPLIT: " + fileNameSplit)
                            def incrementString = fileNameSplit[fileNameSplit.length-1];
                            log.info("Increment: " + incrementString)
                            def incrementNumber
                            if(incrementString.isInteger()){
                                incrementNumber = (incrementString as int) + 1
                                fileNameSplit[fileNameSplit.length-1] = incrementNumber
                                decodedFileName = fileNameSplit.join("-") + "." + extension;
                            }
                            else{
                                incrementNumber = 1
                                decodedFileName = baseName + "-" + incrementNumber + "." + extension;
                            }


                            fileExists = true;
                            remoteFileFullPath = remoteFolderPath + decodedFileName;
                            log.info ("NEW FILE PATH: " + remoteFileFullPath)
                        }
                        else{
                            fileExists = false;
                        }

                    }


                    //NOW FILENAME SHOULD BE UNIQUE AND NOT EXIST IN AIMSQL
                    File localFile = new File(localFolderPath, fileName)
                    InputStream inputStream = new FileInputStream(localFile);

                    log.info("Start uploading first file " + remoteFileFullPath);
                    done = ftpClient.storeFile(remoteFileFullPath, inputStream);
                    inputStream.close();


                    if (done) {
                        log.info("The file is uploaded successfully.");
                        log.info "Upload Completed: " + decodedFileName

                        aimHelper.logFileUpload(decodedFileName, localFolderPath, quoteID, dataSource_aim);
                        log.info "Activity Logged: " + decodedFileName
                    }
                }

                responseString = "Success"
            }
        } catch (Exception e) {
            log.info "Connected to " + server + ".";
            log.info ftpClient.getReplyString();
            log.info ftpClient.getReplyCode();
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            responseString = "Error - " + exceptionAsString

        } finally {
            if (ftpClient.isConnected()) {
                ftpClient.logout();
                ftpClient.disconnect();
            }




        }


        return responseString
    }

    def ftpFileToAIM(localFileName, localFolderPath, quoteID, dataSource_aim){
        log.info("FTP FILE TO AIM")
        AIMSQL aimHelper = new AIMSQL();

        def fileName;
        boolean done = false;
//        Sql aimsql = new Sql(dataSource_aim)


//        log.info(webrootDir)
        String server = "47.180.31.157";
        int port = 21;
        String user = "web_ftp";
        String pass = "Get@4Files";

        FTPClient ftpClient = new FTPClient();
        fileName = localFileName
        String decodedFileName = URLDecoder.decode(fileName, "UTF-8");

//            File fileDest = new File(webrootDir, fileName)
        File firstLocalFile = new File(localFolderPath, fileName)
        try {

            ftpClient.connect(server, port);
            ftpClient.login(user, pass);
            ftpClient.enterLocalPassiveMode();

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            String remoteFolderPath
            String remoteFileFullPath
            if (Environment.current == Environment.DEVELOPMENT) {
                remoteFolderPath = "/AIMAPP/ATTACHTEST/${quoteID}/";

            }
            else if (Environment.current == Environment.PRODUCTION) {
                remoteFolderPath = "/AIMAPP/ATTACH/${quoteID}/";
            }
            remoteFileFullPath = remoteFolderPath + decodedFileName;

            // Creates a directory
            String dirToCreate = remoteFolderPath;
            boolean success = ftpClient.makeDirectory(dirToCreate);
//            showServerReply(ftpClient);
            if (success) {
                log.info("Successfully created directory: " + dirToCreate);
            } else {
                log.info("Did not create directory.");
            }

//          CHECK IF FILE EXISTS
            boolean fileExists = true;
            def fileCounter = 0;
            def returnCode
            while(fileExists) {
                log.info("TRYING FILE PATH: " + remoteFileFullPath)
                String tempString = remoteFolderPath
                def filesInFolder = ftpClient.listNames(remoteFolderPath).toList();
                log.info remoteFileFullPath
                log.info filesInFolder
                log.info filesInFolder.contains(remoteFileFullPath)
                if(filesInFolder.contains(remoteFileFullPath)){
                    fileExists = true;
                    def baseName = FilenameUtils.getBaseName(decodedFileName)
                    def extension = FilenameUtils.getExtension(decodedFileName)
                    def fileNameSplit = baseName.split("-");
                    log.info("SPLIT: " + fileNameSplit)
                    def incrementString = fileNameSplit[fileNameSplit.length-1];
                    log.info("Increment: " + incrementString)
                    def incrementNumber
                    if(incrementString.isInteger()){
                        incrementNumber = (incrementString as int) + 1
                        fileNameSplit[fileNameSplit.length-1] = incrementNumber
                        decodedFileName = fileNameSplit.join("-") + "." + extension;

                    }
                    else{
                        incrementNumber = 1
                        decodedFileName = baseName + "-" + incrementNumber + "." + extension;
                    }


                    fileExists = true;
                    remoteFileFullPath = remoteFolderPath + decodedFileName;
                    log.info ("NEW FILE PATH: " + remoteFileFullPath)
                }
                else{
                    fileExists = false;

                }

            }



            InputStream inputStream = new FileInputStream(firstLocalFile);

            log.info("Start uploading first file " + remoteFileFullPath);
            done = ftpClient.storeFile(remoteFileFullPath, inputStream);
            inputStream.close();


            if (done) {
                log.info("The file is uploaded successfully.");
            }


        } catch (Exception e) {
            log.info "Connected to " + server + ".";
            log.info ftpClient.getReplyString();
            log.info ftpClient.getReplyCode();
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)

        } finally {
            if (ftpClient.isConnected()) {
                ftpClient.logout();
                ftpClient.disconnect();
            }




        }

        log.info "Upload Completed: " + decodedFileName

        aimHelper.logFileUpload(decodedFileName, localFolderPath, quoteID, dataSource_aim);
        log.info "Activity Logged: " + decodedFileName
        return decodedFileName
    }

    def getFileList(quoteID){
        log.info("GET FILE LIST")

        AIMSQL aimHelper = new AIMSQL();

        boolean done = false;

        String server = "47.180.31.157";
        int port = 21;
        String user = "web_ftp";
        String pass = "Get@4Files";

        FTPClient ftpClient = new FTPClient();
        def filesInFolder;
        def listOfFiles = "";
        try {

            ftpClient.connect(server, port);
            ftpClient.login(user, pass);
            ftpClient.enterLocalPassiveMode();

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            def remoteFolderPath;
            if (Environment.current == Environment.DEVELOPMENT) {
                remoteFolderPath = "/AIMAPP/ATTACHTEST/${quoteID}/";

            }
            else if (Environment.current == Environment.PRODUCTION) {
                remoteFolderPath = "/AIMAPP/ATTACH/${quoteID}/";
            }

            String tempString = remoteFolderPath
            filesInFolder = ftpClient.listNames(remoteFolderPath).toList();
            log.info filesInFolder

            filesInFolder.each{
                File f = new File(it);
                System.out.println(f.getName());
                listOfFiles = listOfFiles + f.getName() + "&;&";
            }

            if (done) {
                log.info("The file is uploaded successfully.");
            }


        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)

        } finally {
            if (ftpClient.isConnected()) {
                ftpClient.logout();
                ftpClient.disconnect();
            }
        }

        return listOfFiles
    }


    def getAIMAttachment(quoteID, fileName){
//        def fileName;
//        log.info "INTELLEDOX QUOTE ID = " + quoteID
        boolean done = false;
//        Sql aimsql = new Sql(dataSource_aim)

        String server = "47.180.31.157";
        int port = 21;
        String user = "web_ftp";
        String pass = "Get@4Files";
        byte[] bytesArray;

        FTPClient ftpClient = new FTPClient();
        try {

            ftpClient.connect(server, port);
            ftpClient.login(user, pass);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);


            // APPROACH #2: using InputStream retrieveFileStream(String)
            String decodedFileName = URLDecoder.decode(fileName, "UTF-8");

            String remoteFile2
            if (Environment.current == Environment.DEVELOPMENT) {
                remoteFile2 = "/AIMAPP/ATTACHTEST/${quoteID}/${fileName.replaceAll("\\s", "\\ ")}";
            }
            else if (Environment.current == Environment.PRODUCTION) {
                remoteFile2 = "/AIMAPP/ATTACH/${quoteID}/${fileName.replaceAll("\\s", "\\ ")}";
            }
            log.info "remoteFile: " + remoteFile2
            InputStream inputStream = ftpClient.retrieveFileStream(remoteFile2);

            int returnCode = ftpClient.getReplyCode();
            log.info "RETURN CODE: " + returnCode
//            if (returnCode == 550) {
//                // file/directory is unavailable
//            }
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();

            int nRead;
            byte[] data = new byte[16384];

            while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }

            buffer.flush();

            bytesArray = buffer.toByteArray();


        } catch (Exception ex) {
            log.info("Error: " + ex.getMessage());
            ex.printStackTrace();
            throw new IllegalStateException(ex.getMessage());
        } finally {
            try {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        log.info bytesArray
//        return result;
        return bytesArray
    }
}
