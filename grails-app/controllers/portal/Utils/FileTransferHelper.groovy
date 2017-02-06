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

    def ftpFileToAIM(localFileName, localFolderPath, quoteID, dataSource_aim){
        log.info("FTP FILE TO AIM")

        AIMSQL aimHelper = new AIMSQL();


//        def webrootDir = request.getSession().getServletContext().getRealPath("/")
//        def webrootDir = getClass().getProtectionDomain().getCodeSource().getLocation().getFile().replace(getClass().getSimpleName() + ".class", "").substring(1);
//        log.info "WEBROOT DIR = " + webrootDir
        def fileName;
        boolean done = false;
//        Sql aimsql = new Sql(dataSource_aim)


//        log.info(webrootDir)
        String server = "74.100.162.203";
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



//                InputStream inputStreamFileExists = ftpClient.retrieveFileStream(remoteFileFullPath);
//                returnCode = ftpClient.getReplyCode();
//                log.info ("RETURN CODE = " + returnCode)
//                if (inputStreamFileExists == null || returnCode == 550) {
//                    fileExists = false;
//                    ftpClient.completePendingCommand();
////                    if(returnCode == 550){
////                        inputStreamFileExists.close();
////                    }
////
//                }
//                else{
//                    fileCounter++;
//
//                    inputStreamFileExists.close();
//                }

            }



            InputStream inputStream = new FileInputStream(firstLocalFile);

            log.info("Start uploading first file " + remoteFileFullPath);
            done = ftpClient.storeFile(remoteFileFullPath, inputStream);
            inputStream.close();


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

        log.info "Upload Completed: " + decodedFileName

        aimHelper.logFileUpload(decodedFileName, localFolderPath, quoteID, dataSource_aim);
        log.info "Activity Logged: " + decodedFileName
        return decodedFileName
    }

    def getAIMAttachment(quoteID, fileName){
//        def fileName;
//        log.info "INTELLEDOX QUOTE ID = " + quoteID
        boolean done = false;
//        Sql aimsql = new Sql(dataSource_aim)

        String server = "74.100.162.203";
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
            log.info remoteFile2
            InputStream inputStream = ftpClient.retrieveFileStream(remoteFile2);

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

