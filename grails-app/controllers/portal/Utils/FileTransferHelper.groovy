package portal.Utils

import groovy.json.JsonSlurper
import groovy.sql.Sql
import sun.misc.BASE64Decoder
import groovy.xml.*
import wslite.soap.*
import wslite.http.auth.*
import org.apache.commons.net.ftp.FTPClient
import org.apache.commons.net.ftp.FTP;
import sun.misc.BASE64Decoder;
import portal.DAO.AIMSQL;
import grails.util.Environment

class FileTransferHelper {
    Random random = new Random();

    def saveAttachedFileToLocalPath(attachedFile, localFolderPath, fileName){
        log.info "SAVING ATTACHED FILE"
        File fileDest = new File(localFolderPath, fileName)
        def file = attachedFile
        try{
            file.transferTo(fileDest)
        }
        catch(Exception e){
            fileName = fileName + String.valueOf(random.nextInt(100));
            fileDest = new File(localFolderPath, fileName)
            file = attachedFile
            file.transferTo(fileDest)
        }

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
        log.info "INTELLEDOX QUOTE ID = " + quoteID
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
            if (Environment.current == Environment.DEVELOPMENT) {
                log.info("DEVELOPMENT")
            } else
            if (Environment.current == Environment.TEST) {
                // insert Test environment specific code here
            } else
            if (Environment.current == Environment.PRODUCTION) {
                log.info("PRODUCTION")
            }

            String remoteFilePath = "/AIMAPP/ATTACHTEST/${quoteID}/";
            // Creates a directory
            String dirToCreate = remoteFilePath;
            boolean success = ftpClient.makeDirectory(dirToCreate);
//            showServerReply(ftpClient);
            if (success) {
                log.info("Successfully created directory: " + dirToCreate);
            } else {
                log.info("Failed to create directory. See server's reply.");
            }


            String firstRemoteFile = "/AIMAPP/ATTACHTEST/${quoteID}/" + decodedFileName;
            InputStream inputStream = new FileInputStream(firstLocalFile);

            log.info("Start uploading first file " + firstRemoteFile);
            done = ftpClient.storeFile(firstRemoteFile, inputStream);
            inputStream.close();


            if (done) {
                log.info("The file is uploaded successfully.");
            }


        } catch (Exception ex) {
            log.info("Error: " + ex.getMessage());
            ex.printStackTrace();
            throw new IllegalStateException(ex.getMessage());

        } finally {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }




        }

        log.info "Upload Completed"

        aimHelper.logFileUpload(decodedFileName, localFolderPath, quoteID, dataSource_aim);
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
            String remoteFile2 = "/AIMAPP/ATTACHTEST/${quoteID}/${fileName.replaceAll("\\s", "\\ ")}";
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

