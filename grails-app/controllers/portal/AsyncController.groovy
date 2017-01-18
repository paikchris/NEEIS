package portal

import groovy.xml.*
import wslite.soap.*
import wslite.http.auth.*
import com.google.gson.JsonObject
import groovy.sql.Sql
import helper.Utils;
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import groovy.json.JsonBuilder
import java.text.DecimalFormat
import portal.DAO.*
import java.text.SimpleDateFormat;
import org.apache.commons.net.ftp.FTPClient
import org.apache.commons.net.ftp.FTP;
import sun.misc.BASE64Decoder;

class AsyncController {
    def dataSource_aim
    AIMSQL aimDAO = new AIMSQL();

    def getProductsForCoverage() {
        //GETTING LIST OF PRODUCTS AVAILABLE FOR EACH COVERAGE AVAILABLE FOR SUBMISSION RISK TYPE

        log.info("GETTING PRODUCTS FOR COVERAGE")
        log.info(params);


        Sql aimsql = new Sql(dataSource_aim)

        def renderString = "";
        def riskCoverages = RiskType.findWhere(riskTypeName: params.riskType)
        def coveragesAvailableCodesArray
        def termLength = params.proposedTermLength.split(" ")[0]
        if (riskCoverages.coverages) {
            log.info ("ALL COVERAGES ==== " + riskCoverages.coverages);
            coveragesAvailableCodesArray = riskCoverages.coverages.split(",");
            log.info coveragesAvailableCodesArray;
            coveragesAvailableCodesArray.each {
                log.info "THIS COVERAGE === " + it
                def test = Coverages.findWhere(coverageCode: it);
                log.info test

                renderString = renderString + it + "&,&" + test.coverageName + "&;&"
                if (params.riskType == "Film Projects Without Cast (No Work Comp)" || params.riskType == "Specific Film Projects Test") {

                    if (it == "EPKG") {
//                        log.info "SPECIFIC FILM" + params.totalGrossBudget.toFloat()
                        if (params.totalGrossBudget.toFloat() <= 500000) {
                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct " +
                                    "WHERE (ProductID = 'PIP CHOI') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }
                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct " +
                                    "WHERE (ProductID = 'PIP 2') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }

                            if (params.totalGrossBudget.toFloat() <= 100000) {
                                aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                        "FROM lkpProduct " +
                                        "WHERE (ProductID = 'PIP 1') AND (ActiveFlag = 'Y')") {
                                    renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                                }
                            }
                            if ((params.totalGrossBudget.toFloat() >= 1 && params.totalGrossBudget.toFloat() <= 300000)) {
                                aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                        "FROM lkpProduct " +
                                        "WHERE (ProductID = 'PIP 3') AND (ActiveFlag = 'Y')") {
                                    renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                                }
                            }
                            if ((params.totalGrossBudget.toFloat() > 300000 && params.totalGrossBudget.toFloat() <= 400000)) {
                                aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                        "FROM lkpProduct " +
                                        "WHERE (ProductID = 'PIP 4') AND (ActiveFlag = 'Y')") {
                                    renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                                }
                            }
                            if ((params.totalGrossBudget.toFloat() > 400000 && params.totalGrossBudget.toFloat() <= 500000)) {
                                aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                        "FROM lkpProduct " +
                                        "WHERE (ProductID = 'PIP 5') AND (ActiveFlag = 'Y')") {
                                    renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                                }
                            }
                        }
                        else if (params.totalGrossBudget.toFloat() > 500000) {
                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct " +
                                    "WHERE (ProductID = 'PIP 5') AND (ActiveFlag = 'Y')") {
                                log.info("${it.CoverageID} : ${it.ProductID}")
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }

                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct " +
                                    "WHERE (ProductID = 'PIP CHOI') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }
                            aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                    "FROM lkpProduct " +
                                    "WHERE (ProductID = 'PIP 2') AND (ActiveFlag = 'Y')") {
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }


                        }

                    } else if (it == "CPK") {
                        aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                "FROM lkpProduct " +
                                "WHERE (CoverageID = '" + it + "') AND (ActiveFlag = 'Y')") {
                            if (it.ProductID.startsWith("BAR")) {
                                log.info "PRODUCTS BAR ======== " + it.ProductID
                                renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";
                            }

                        }
                    } else {
                        aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                                "FROM lkpProduct " +
                                "WHERE (CoverageID = '" + it + "') AND (ActiveFlag = 'Y')") {
                            log.info("${it.CoverageID} : ${it.ProductID}")

                            renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";


                        }
                    }

                }
                else {
                    aimsql.eachRow("SELECT ProductID, CompanyID, Description, CoverageID, ActiveFlag, BillToCompanyID, BillCompanyID " +
                            "FROM lkpProduct " +
                            "WHERE (CoverageID = '" + it + "') AND (ActiveFlag = 'Y')") {

                        renderString = renderString + it.ProductID + "&,&" + it.Description + "&,&" + it.BillCompanyID + "&;;&";


                    }
                }



                log.info renderString

                renderString = renderString + "&nextCoverage&";
            }
        }

        if (params.riskType == "Specific Film Projects" || params.riskType == "Specific Film Projects Test") {
            if (params.totalGrossBudget.toFloat() > 500000) {
                renderString = renderString + "DICE" + "&,&" + "DICE" + "&,&" + "DICE" + "&;;&" + "&nextCoverage&";
                renderString = renderString + "SPECIFICFILMPROD" + "&,&" + "SPECIFICFILMPROD" + "&,&" + "SPECIFICFILMPROD" + "&;;&";
            }

        }

        render renderString
    }


    def getLimitsDeductibles() {
        log.info("GETTING LIMITS AND DEDUCTIBLES FOR PRODUCT")
        log.info(params);

        Sql aimsql = new Sql(dataSource_aim)
        String renderString = ""
        aimsql.eachRow("SELECT Limits, Deduct, Subject, Endorse, LobDistrib, ActiveFlag " +
                "FROM Product " +
                "WHERE (ProductID = '" + params.productID + "') ") {
            renderString = renderString + it.Limits + ";####&&&&;" + it.Deduct + ";####&&&&;" + it.Subject + ";####&&&&;" + it.Endorse + ";####&&&&;" + it.LobDistrib + ";";
        }

        render renderString
    }

    def getAvailableCoveragesForRiskType() {
        log.info("GETTING AVAILABLE COVERAGES FOR RISK TYPE")
        log.info(params);

        def riskCoverages = RiskType.findWhere(riskTypeName: params.riskType)
        def coverageNames = "";
        riskCoverages.coverages.split(",").each {
            def coverage = Coverages.findWhere(coverageCode: it)
            coverageNames = coverageNames + coverage.coverageName + ","
        }


        String renderString = ""

        renderString = riskCoverages.coverages + ";&&;" + coverageNames;

        render renderString
    }

    def ajaxAttach() {
        log.info("CHECKING AJAX ATTACH BUTTON")
        log.info(params);
        def bioFile;
        def lossesFile;
        def pyroFile;
        def stuntsFile;
        def doodFile;
        def treatmentFile;
        def budgetFile;

        def webrootDir = servletContext.getRealPath("/attachments/") //app directory
        def fileName;

        boolean done = false;


        log.info(webrootDir)
        String server = "74.100.162.203";
        int port = 21;
        String user = "web_ftp";
        String pass = "Get@4Files";

        FTPClient ftpClient = new FTPClient();
        try {

            ftpClient.connect(server, port);
            ftpClient.login(user, pass);
            ftpClient.enterLocalPassiveMode();

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);


            if (params.bioFile != "undefined") {

                fileName = "bio - " + params.bioFile.getFileItem().name
                log.info params.bioFile.getFileItem().name
                File fileDest = new File(webrootDir, fileName)
                bioFile = params.bioFile
                bioFile.transferTo(fileDest)
                log.info fileName
                File firstLocalFile = new File("/universe/Neeis/web-app/attachments/", fileName)
                String firstRemoteFile = "/AIMAPP/TESTJOHN/" + fileName;
                InputStream inputStream = new FileInputStream(firstLocalFile);

                log.info("Start uploading first file");
                done = ftpClient.storeFile(firstRemoteFile, inputStream);
                inputStream.close();

            }

            if (params.lossesFile != "undefined") {
                fileName = "losses - " + params.lossesFile.getFileItem().name
                File fileDest = new File(webrootDir, fileName)
                lossesFile = params.lossesFile
                lossesFile.transferTo(fileDest)
                log.info fileName
                File firstLocalFile = new File("/universe/Neeis/web-app/attachments/", fileName)
                String firstRemoteFile = "/AIMAPP/TESTJOHN/" + fileName;
                InputStream inputStream = new FileInputStream(firstLocalFile);

                log.info("Start uploading first file");
                done = ftpClient.storeFile(firstRemoteFile, inputStream);
                inputStream.close();

            }

            if (params.pyroFile != "undefined") {
                fileName = "pyro - " + params.pyroFile.getFileItem().name
                File fileDest = new File(webrootDir, fileName)
                pyroFile = params.pyroFile
                pyroFile.transferTo(fileDest)
                log.info fileName
                File firstLocalFile = new File("/universe/Neeis/web-app/attachments/", fileName)
                String firstRemoteFile = "/AIMAPP/TESTJOHN/" + fileName;
                InputStream inputStream = new FileInputStream(firstLocalFile);

                log.info("Start uploading first file");
                done = ftpClient.storeFile(firstRemoteFile, inputStream);
                inputStream.close();

            }

            if (params.stuntsFile != "undefined") {
                fileName = "stunts - " + params.stuntsFile.getFileItem().name
                File fileDest = new File(webrootDir, fileName)
                stuntsFile = params.stuntsFile
                stuntsFile.transferTo(fileDest)
                log.info fileName
                File firstLocalFile = new File("/universe/Neeis/web-app/attachments/", fileName)
                String firstRemoteFile = "/AIMAPP/TESTJOHN/" + fileName;
                InputStream inputStream = new FileInputStream(firstLocalFile);

                log.info("Start uploading first file");
                done = ftpClient.storeFile(firstRemoteFile, inputStream);
                inputStream.close();

            }

            if (params.doodFile != "undefined") {
                fileName = "dood - " + params.doodFile.getFileItem().name
                File fileDest = new File(webrootDir, fileName)
                doodFile = params.doodFile
                doodFile.transferTo(fileDest)
                log.info fileName
                File firstLocalFile = new File("/universe/Neeis/web-app/attachments/", fileName)
                String firstRemoteFile = "/AIMAPP/TESTJOHN/" + fileName;
                InputStream inputStream = new FileInputStream(firstLocalFile);

                log.info("Start uploading first file");
                done = ftpClient.storeFile(firstRemoteFile, inputStream);
                inputStream.close();

            }

            if (params.treatmentFile != "undefined") {
                fileName = "treatment - " + params.treatmentFile.getFileItem().name
                File fileDest = new File(webrootDir, fileName)
                treatmentFile = params.treatmentFile
                treatmentFile.transferTo(fileDest)
                log.info fileName
                File firstLocalFile = new File("/universe/Neeis/web-app/attachments/", fileName)
                String firstRemoteFile = "/AIMAPP/TESTJOHN/" + fileName;
                InputStream inputStream = new FileInputStream(firstLocalFile);

                log.info("Start uploading first file");
                done = ftpClient.storeFile(firstRemoteFile, inputStream);
                inputStream.close();

            }

            if (params.budgetFile != "undefined") {
//            fileName= "budget"+System.nanoTime()
                fileName = "budget - " + params.budgetFile.getFileItem().name
                File fileDest = new File(webrootDir, fileName)
                budgetFile = params.budgetFile
                budgetFile.transferTo(fileDest)
                log.info fileName
                File firstLocalFile = new File("/universe/Neeis/web-app/attachments/", fileName)
                String firstRemoteFile = "/AIMAPP/TESTJOHN/" + fileName;
                InputStream inputStream = new FileInputStream(firstLocalFile);

                log.info("Start uploading first file");
                done = ftpClient.storeFile(firstRemoteFile, inputStream);
                inputStream.close();

            }
//        FTP for attachment files

//        new FTPClient().with {
//            connect "74.100.162.203"
////            enterLocalPassiveMode()
//            login "web_ftp", "Get@4Files"
//            changeWorkingDirectory "./AIMAPP/"
////            ftpClient.fileType = FTPClient.BINARY_FILE_TYPE
//            def incomingFile = new File(webrootDir, fileName)
//            incomingFile.withOutputStream { ostream -> retrieveFile "remotefilename", ostream }
//            disconnect()
//        }
//        FTP for attachment files

//        String server = "74.100.162.203";
//        int port = 21;
//        String user = "web_ftp";
//        String pass = "Get@4Files";
//
//        FTPClient ftpClient = new FTPClient();
//        try {
//
//            ftpClient.connect(server, port);
//            ftpClient.login(user, pass);
//            ftpClient.enterLocalPassiveMode();
//
//            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            // APPROACH #1: uploads first file using an InputStream
//            log.info fileName
//            File firstLocalFile = new File("/universe/Neeis/web-app/attachments/",fileName)
//            String firstRemoteFile = "/AIMAPP/TESTJOHN/" + fileName;
//            InputStream inputStream = new FileInputStream(firstLocalFile);
//
//            log.info("Start uploading first file");
//            boolean done = ftpClient.storeFile(firstRemoteFile, inputStream);
//            inputStream.close();
            if (done) {
                log.info("The first file is uploaded successfully.");
            }

//            // APPROACH #2: uploads second file using an OutputStream
//            File secondLocalFile = new File("E:/Test/Report.doc");
//            String secondRemoteFile = "test/Report.doc";
//            inputStream = new FileInputStream(secondLocalFile);
//
//            System.out.println("Start uploading second file");
//            OutputStream outputStream = ftpClient.storeFileStream(secondRemoteFile);
//            byte[] bytesIn = new byte[4096];
//            int read = 0;
//
//            while ((read = inputStream.read(bytesIn)) != -1) {
//                outputStream.write(bytesIn, 0, read);
//            }
//            inputStream.close();
//            outputStream.close();
//
//            boolean completed = ftpClient.completePendingCommand();
//            if (completed) {
//                System.out.println("The second file is uploaded successfully.");
//            }

        } catch (IOException ex) {
            log.info("Error: " + ex.getMessage());
            ex.printStackTrace();
        } finally {
            try {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }
            } catch (IOException ex) {
                log.info ex
                ex.printStackTrace();
            }
        }

        render "Upload Completed"
    }

    def ratePremiums() {
        log.info("RATING PREMIUMS")
        log.info(params);
        Sql aimsql = new Sql(dataSource_aim)

        def jsonResponse = "";
        def arrayOfCoverageDetails = [];
        def pipChoiceLimitsArray = params.pipChoiceLimits.split("&;;&");
        def pipChoiceLimitsMap = [:]
        def termLength = params.proposedTermLength.split(" ")[0].toInteger();

        if (params.pipChoiceLimits.length() > 1) {
            for (def i = 0; i < pipChoiceLimitsArray.size(); i++) {
                log.info pipChoiceLimitsArray[i]
                pipChoiceLimitsMap[pipChoiceLimitsArray[i].split("&;&")[0]] = pipChoiceLimitsArray[i].split("&;&")[1];
            }
        }


        if (params.riskType == "Film Projects Without Cast (No Work Comp)" || params.riskType == "Specific Film Projects Test") {
            def NOHALOB = "";
            def NOHALimitsMap = [:];
            def NOHADeductsMap = [:];
            def NOHAPremiumsMap = [:];
            params.productsSelected.split(",").each {
                if (it.length() > 1) {
                    log.info it.split(":")[1]
                    def productID = it.split(":")[1];
                    def coverageID = it.split(":")[0];

                    def detailsJSON = {};
                    def productTotalPremium = 0.0;

                    def coverageList = [];
                    def limitsMap = [:];
                    def deductsMap = [:];
                    def premiumsMap = [:];
                    def lobDistMap = [:];
                    def subjectString = "";
                    def endorseString = "";
                    def lobString = "";
                    def additionaLOBString = "";

                    //GET DEFAULT LIMITS, DEDUCTIBLES, AND TERMS FOR PRODUCT IN DMU AIM

                    String renderString = ""
                    aimsql.eachRow("SELECT Limits, Deduct, Subject, Endorse, LobDistrib, ActiveFlag " +
                            "FROM Product " +
                            "WHERE (ProductID = '" + productID + "') ") {
                        renderString = renderString + it.Limits + ";####&&&&;" + it.Deduct + ";####&&&&;" + it.Subject + ";####&&&&;" + it.Endorse + ";####&&&&;" + it.LobDistrib + ";";

                        //BUILD A LIST OF COVERAGES FOR THIS PRODUCT
                        it.Limits.split('\r').each {
                            if (it.contains(":")) {
                                def key = it.split('\t')[1].split(":")[1]
                                limitsMap[key] = it.split('\t')[0]
                            }
                        }
                        it.Deduct.split('\r').each {
                            if (it.contains(":")) {
                                def key = it.split('\t')[1].split(":")[1]
                                deductsMap[key] = it.split('\t')[0]
                            }
                        }
//                    limitsMap.each{ k, v ->
//                        log.info "${k}:${v}"
//                    }
//                    deductsMap.each{ k, v ->
//                        log.info "${k}:${v}"
//                    }
                        subjectString = it.Subject;
                        log.info subjectString
                        endorseString = it.Endorse;

                        lobString = it.LobDistrib;


                    }

                    if (coverageID == "EPKG") {
                        if (productID == "PIP CHOI") {
                            def premium = 0.0
                            def deductAmount = 0;
                            def miscRentedEquipRateMinPrem = [0.5, 100];
                            def propsSetWardrobeRateMinPrem = [0.5, 100];
                            def thirdPartyPropDamageRateMinPrem = [0.05, 100];
                            def extraExpenseRateMinPrem = [0.1, 100];
                            def tempLimit = 0;
                            def rate = miscRentedEquipRateMinPrem[0];
                            def minPremium = miscRentedEquipRateMinPrem[1];

                            //CUSTOM DEDUCTIBLES
                            def tempDeductiblesMap = [:];

                            tempDeductiblesMap["Extra Expense"] = "Up to \$1,000,000"
                            tempDeductiblesMap["Props, Sets & Wardrobe"] = "Up to \$1,000,000"
                            tempDeductiblesMap["Third Party Prop Damage Liab"] = "Up to \$1,000,000"

                            //CALCULATE IF MISC RENTED EQUIPMENT PREMIUM
                            if(params.pipChoiOptions.contains("PIPChoice_MiscRented")){
                                tempDeductiblesMap["Miscellaneous Rented Equipment"] = "Up to \$1,000,000"
                                rate = miscRentedEquipRateMinPrem[0];
                                minPremium = miscRentedEquipRateMinPrem[1];

                                log.info((params.totalBudget.toDouble() * rate))


                                if (pipChoiceLimitsMap["Miscellaneous Rented Equipment"]) {
                                    tempLimit = pipChoiceLimitsMap["Miscellaneous Rented Equipment"].toDouble();
                                } else {
                                    tempLimit = params.totalBudget.toDouble();

                                }

                                if(termLength <= 30){
                                    premium = ((premium/365) * termLength) * 10
                                }
                                else{
                                    premium = (tempLimit * rate) / 100;
                                }

                                if (premium > minPremium) {
//                                    premium = (tempLimit * rate) / 100;

                                } else {
                                    premium = minPremium
                                }

                                tempDeductiblesMap["Miscellaneous Rented Equipment"] = calcPIP3Deductibles(params.totalBudget.toDouble())
                                productTotalPremium = productTotalPremium + premium;
                                premiumsMap["Miscellaneous Rented Equipment"] = [rate, premium];
                            }
                            else{
                                limitsMap.remove("Miscellaneous Rented Equipment")
                                deductsMap.remove("Miscellaneous Rented Equipment")
                            }


                            //CALCULATE PROPS SET WARDROBE PREMIUM
                            if(params.pipChoiOptions.contains("PIPChoice_Props")){
                                rate = propsSetWardrobeRateMinPrem[0];
                                minPremium = propsSetWardrobeRateMinPrem[1];
                                if (((params.totalBudget.toDouble() * rate) / 100) > minPremium) {
                                    premium = (params.totalBudget.toDouble() * rate) / 100;
                                } else {
                                    premium = minPremium
                                }
                                tempDeductiblesMap["Props, Sets & Wardrobe"] = calcPIP3Deductibles(params.totalBudget.toDouble())
                                productTotalPremium = productTotalPremium + premium;
                                premiumsMap["Props, Sets & Wardrobe"] = [rate, premium];
                            }
                            else{
                                limitsMap.remove("Props, Sets & Wardrobe")
                                deductsMap.remove("Props, Sets & Wardrobe")
                            }


                            //CALCULATE THIRD PARTY PROPERTY DAMAGE PREMIUM
                            if(params.pipChoiOptions.contains("PIPChoice_ThirdParty")){
                                rate = thirdPartyPropDamageRateMinPrem[0];
                                minPremium = thirdPartyPropDamageRateMinPrem[1];
                                if (((params.totalBudget.toDouble() * rate) / 100) > minPremium) {
                                    premium = (params.totalBudget.toDouble() * rate) / 100;
                                } else {
                                    premium = minPremium
                                }
                                tempDeductiblesMap["Third Party Prop Damage Liab"] = calcPIP3Deductibles(params.totalBudget.toDouble())
                                productTotalPremium = productTotalPremium + premium;
                                premiumsMap["Third Party Prop Damage Liab"] = [rate, premium];
                            }
                            else{
                                limitsMap.remove("Third Party Prop Damage Liab")
                                deductsMap.remove("Third Party Prop Damage Liab")
                            }


                            //CALCULATE EXTRA EXPENSE PREMIUM
                            if(params.pipChoiOptions.contains("PIPChoice_ExtraExpense")){
                                rate = extraExpenseRateMinPrem[0];
                                minPremium = extraExpenseRateMinPrem[1];
                                if (((params.totalBudget.toDouble() * rate) / 100) > minPremium) {
                                    premium = (params.totalBudget.toDouble() * rate) / 100;
                                } else {
                                    premium = minPremium
                                }
                                tempDeductiblesMap["Extra Expense"] = calcPIP3Deductibles(params.totalBudget.toDouble())
                                productTotalPremium = productTotalPremium + premium;
                                premiumsMap["Extra Expense"] = [rate, premium];
                            }
                            else{
                                limitsMap.remove("Extra Expense")
                                deductsMap.remove("Extra Expense")
                            }


                            if (params.productsSelected.contains("NOHA")) {
                                def NOHARateMinPrem = ["flat", 750];

                                premiumsMap["Hired Auto Physical Damage"] = NOHARateMinPrem;
                                tempDeductiblesMap["Hired Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Hired Auto Physical Damage"] = "\$1,000,000"
                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired & Non-Owned Auto Physical Damage")
                            }
                            deductsMap = tempDeductiblesMap;

                        } else if (productID == "PIP 1") {
                            def negativeFilmVideoRateMinPrem = ["flat", "incl"];
                            def faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
                            def miscRentedEquipRateMinPrem = ["flat", "incl"];
                            def propsSetWardrobeRateMinPrem = ["flat", "incl"];
                            def thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
                            def extraExpenseRateMinPrem = ["flat", "incl"];

                            //PIP 1 Premium is a flat rate of 500
                            def premium = 500;
                            productTotalPremium = premium;

                            premiumsMap["Negative Film & Videotape"] = negativeFilmVideoRateMinPrem;
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;

                            if (params.productsSelected.contains("NOHA")) {
                                def NOHARateMinPrem = ["flat", 500];

                                premiumsMap["Hired Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Hired Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Hired Auto Physical Damage"] = "\$1,000,000"
                                productTotalPremium = productTotalPremium + NOHARateMinPrem[1]
                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired & Non-Owned Auto Physical Damage")
                            }
//                            if(params.productsSelected.contains("NOHA")){
//                                def NOHARateMinPrem = ["flat",500];
//
//                                limitsMap.remove("Hired Auto Physical Damage")
//                                deductsMap.remove("Hired & Non-Owned Auto Physical Damage")
//
//                                NOHAPremiumsMap["Hired Auto Physical Damage"] = NOHARateMinPrem
//                                NOHALimitsMap["Hired Auto Physical Damage"] =  "Up to \$1,000,000"
//                                NOHADeductsMap["Hired Auto Physical Damage"] = "10% of Loss (\$3,500 Min / \$10,000)"
//                                NOHALOB = "Hired Auto Physical Damage" + "\t" + 500 + "\t" + "-\t" + "-\r"
//                            }
//                            else{
//                                limitsMap.remove("Hired Auto Physical Damage")
//                                deductsMap.remove("Hired Auto Physical Damage")
//                            }
                        } else if (productID == "PIP 2") {
                            def PIP2premium = 1000;
                            def negativeFilmVideoRateMinPrem = ["flat", "incl"];
                            def faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
                            def miscRentedEquipRateMinPrem = ["flat", "incl"];
                            def propsSetWardrobeRateMinPrem = ["flat", "incl"];
                            def thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
                            def extraExpenseRateMinPrem = ["flat", "incl"];
                            def officeContentsRateMinPrem = ["flat", "incl"];

                            //PIP 2 Premium is a flat rate of 1000
                            def premium = PIP2premium;
                            productTotalPremium = premium;

                            premiumsMap["Negative Film & Videotape"] = negativeFilmVideoRateMinPrem;
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;
                            premiumsMap["Office Contents"] = officeContentsRateMinPrem;


                            if (params.productsSelected.contains("NOHA")) {
                                def NOHARateMinPrem = ["flat", 500];

                                premiumsMap["Hired Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Hired Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Hired Auto Physical Damage"] = "\$1,000,000"
                                productTotalPremium = productTotalPremium + NOHARateMinPrem[1]
                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired & Non-Owned Auto Physical Damage")
                            }
//                            if(params.productsSelected.contains("NOHA")){
//                                def NOHARateMinPrem = ["flat",500];
//
//                                limitsMap.remove("Hired Auto Physical Damage")
//                                deductsMap.remove("Hired & Non-Owned Auto Physical Damage")
//
//                                NOHAPremiumsMap["Hired Auto Physical Damage"] = NOHARateMinPrem
//                                NOHALimitsMap["Hired Auto Physical Damage"] =  "Up to \$1,000,000"
//                                NOHADeductsMap["Hired Auto Physical Damage"] = "10% of Loss (\$3,500 Min / \$10,000)"
//                                NOHALOB = "Hired Auto Physical Damage" + "\t" + 500 + "\t" + "-\t" + "-\r"
//                            }
//                            else{
//                                limitsMap.remove("Hired Auto Physical Damage")
//                                deductsMap.remove("Hired Auto Physical Damage")
//                            }
                        } else if (productID == "PIP 3") {
                            def premium = 0.0;
                            def negativeFilmVideoRateMinPrem = [0.6, 1500];
                            def faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
                            def miscRentedEquipRateMinPrem = ["flat", "incl"];
                            def propsSetWardrobeRateMinPrem = ["flat", "incl"];
                            def thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
                            def extraExpenseRateMinPrem = ["flat", "incl"];
                            def officeContentsRateMinPrem = ["flat", "incl"];

                            //CALCULATE IF MINIMUM PREMIUM IS MET
                            def rate = negativeFilmVideoRateMinPrem[0];
                            def minPremium = negativeFilmVideoRateMinPrem[1];
                            if (((params.totalBudget.toDouble().toDouble() * rate) / 100) > minPremium) {
                                premium = (params.totalBudget.toDouble().toDouble() * rate) / 100;
                            } else {
                                premium = minPremium
                            }
                            productTotalPremium = premium

                            premiumsMap["Negative Film & Videotape"] = [rate, "incl"];
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;
                            premiumsMap["Office Contents"] = officeContentsRateMinPrem;


                            if (true) {
                                def NOHARateMinPrem = ["flat", "incl"];

                                premiumsMap["Non-Owned Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Non-Owned Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Non-Owned Auto Physical Damage"] = "\$1,000,000"

                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")

                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")
                            }
                        } else if (productID == "PIP 4") {
                            def premium = 0.0
                            def negativeFilmVideoRateMinPrem = [0.6, 2000];
                            def faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
                            def miscRentedEquipRateMinPrem = ["flat", "incl"];
                            def propsSetWardrobeRateMinPrem = ["flat", "incl"];
                            def thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
                            def extraExpenseRateMinPrem = ["flat", "incl"];
                            def officeContentsRateMinPrem = ["flat", "incl"];

                            //CALCULATE IF MINIMUM PREMIUM IS MET
                            def rate = negativeFilmVideoRateMinPrem[0];
                            def minPremium = negativeFilmVideoRateMinPrem[1];

                            if (((params.totalBudget.toDouble() * rate) / 100) > minPremium) {
                                premium = (params.totalBudget.toDouble() * rate) / 100;
                            } else {
                                premium = minPremium
                            }
                            productTotalPremium = premium

                            premiumsMap["Negative Film & Videotape"] = [rate, "incl"];
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;
                            premiumsMap["Office Contents"] = officeContentsRateMinPrem;

                            if (true) {
                                def NOHARateMinPrem = ["flat", "incl"];

                                premiumsMap["Non-Owned Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Non-Owned Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Non-Owned Auto Physical Damage"] = "\$1,000,000"

                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")

                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")
                            }
                        } else if (productID == "PIP 5") {
                            def premium = 0.0
                            def negativeFilmVideoRateMinPrem = [0.6, 2500];
                            def faultyStockCameraProcessingRateMinPrem = ["flat", "incl"];
                            def miscRentedEquipRateMinPrem = ["flat", "incl"];
                            def propsSetWardrobeRateMinPrem = ["flat", "incl"];
                            def thirdPartyPropDamageRateMinPrem = ["flat", "incl"];
                            def extraExpenseRateMinPrem = ["flat", "incl"];
                            def officeContentsRateMinPrem = ["flat", "incl"];
                            def civilAuthority100Limit = ["flat", 250];
                            def civilAuthority500Limit = ["flat", 500];

                            //CALCULATE IF MINIMUM PREMIUM IS MET
                            def rate = negativeFilmVideoRateMinPrem[0];
                            def minPremium = negativeFilmVideoRateMinPrem[1];


                            productTotalPremium = (params.totalBudget.toDouble() * rate) / 100;

                            premiumsMap["Negative Film & Videotape"] = [rate, "incl"];
                            premiumsMap["Faulty Stock & Camera Processing"] = faultyStockCameraProcessingRateMinPrem;
                            premiumsMap["Miscellaneous Rented Equipment"] = miscRentedEquipRateMinPrem;
                            premiumsMap["Props, Sets & Wardrobe"] = propsSetWardrobeRateMinPrem;
                            premiumsMap["Third Party Prop Damage Liab"] = thirdPartyPropDamageRateMinPrem;
                            premiumsMap["Extra Expense"] = extraExpenseRateMinPrem;
                            premiumsMap["Office Contents"] = officeContentsRateMinPrem;



                            def tempDeductsMap = [:];


                            if (params.additionalProducts.contains("EPKGCIVIL100AdditionalCoverage")) {
                                premiumsMap["Civil Authority (US Only)"] = civilAuthority100Limit;
                                deductsMap["Civil Authority (US Only)"] = "\$3500";
                                limitsMap["Civil Authority (US Only)"] = "\$100000";
                                productTotalPremium = productTotalPremium + civilAuthority100Limit[1];
                            } else if (params.additionalProducts.contains("EPKGCIVIL500AdditionalCoverage")) {
                                premiumsMap["Civil Authority (US Only)"] = civilAuthority500Limit;
                                deductsMap["Civil Authority (US Only)"] = "\$5000";
                                limitsMap["Civil Authority (US Only)"] = "\$500000";
                                productTotalPremium = productTotalPremium + civilAuthority500Limit[1];
                            }

                            if (params.additionalProducts.contains("EPKGBirdsFishAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Domestic Birds/Fish)"] = ["flat", 100];
                                deductsMap["Animal Mortality Under Cast Insurance (Domestic Birds/Fish)"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Domestic Birds/Fish)"] = "\$25000";
                                productTotalPremium = productTotalPremium + 100;
                            }
                            if (params.additionalProducts.contains("EPKGDogsAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)"] = ["flat", 150];
                                deductsMap["Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Dogs w/ Breed Exceptions)"] = "\$25000";
                                productTotalPremium = productTotalPremium + 150;
                            }
                            if (params.additionalProducts.contains("EPKGReptilesAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))"] = ["flat", 150];
                                deductsMap["Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Reptiles (Non-Venomous))"] = "\$25000";
                                productTotalPremium = productTotalPremium + 150;
                            }
                            if (params.additionalProducts.contains("EPKGSmallOtherAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))"] = ["flat", 250];
                                deductsMap["Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Small Domestic Animals (Other))"] = "\$25000";
                                productTotalPremium = productTotalPremium + 200;
                            }
                            if (params.additionalProducts.contains("EPKGFarmAnimalsAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Farm Animals)"] = ["flat", 250];
                                deductsMap["Animal Mortality Under Cast Insurance (Farm Animals)"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Farm Animals)"] = "\$25000";
                                productTotalPremium = productTotalPremium + 250;
                            }
                            if (params.additionalProducts.contains("EPKGWildCatsAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (Wild Cats (Caged))"] = ["flat", 500];
                                deductsMap["Animal Mortality Under Cast Insurance (Wild Cats (Caged))"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (Wild Cats (Caged))"] = "\$25000";
                                productTotalPremium = productTotalPremium + 500;
                            }
                            if (params.additionalProducts.contains("EPKGOtherReferAdditionalCoverage")) {
                                premiumsMap["Animal Mortality Under Cast Insurance (All Others - Refer Only)"] = ["flat", "Refer"];
                                deductsMap["Animal Mortality Under Cast Insurance (All Others - Refer Only)"] = "\$1500";
                                limitsMap["Animal Mortality Under Cast Insurance (All Others - Refer Only)"] = "\$25000";

                            }

                            if (true) {
                                def NOHARateMinPrem = ["flat", "incl"];

                                premiumsMap["Non-Owned Auto Physical Damage"] = NOHARateMinPrem;
                                deductsMap["Non-Owned Auto Physical Damage"] = "10% of Loss (\$1,500 Min / \$10,000)";
                                limitsMap["Non-Owned Auto Physical Damage"] = "\$1,000,000"

                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")

                            } else {
                                limitsMap.remove("Hired Auto Physical Damage")
                                deductsMap.remove("Hired Auto Physical Damage")
                            }

                            if ( productTotalPremium > minPremium) {
                                productTotalPremium = productTotalPremium
                            } else {
                                productTotalPremium = minPremium
                            }


                        }
                    } else if (coverageID == "CGL" || coverageID == "CPK") {

                        def rate = 0.0
                        def premium = 0;
                        def minPremium = 0;

                        def tempLimitsMap = [:]
                        def tempDeductsMap = [:]
                        def tempPremiumsMap = [:]
                        if(termLength <= 60){
                            tempLimitsMap["Blanket Additional Insured Endorsement"] = "";
                            tempDeductsMap["Blanket Additional Insured Endorsement"] = "";
                        }
                        if (termLength <= 30) {
                            rate = 0.319
                            minPremium = 450

                            if (params.additionalProducts.contains("AGGAdditionalCoverage")) {
                                tempLimitsMap["General Aggregate Limit"] = "\$2000000"
                            }
                            else{
                                tempLimitsMap["General Aggregate Limit"] = "\$1000000"
                            }
                            tempLimitsMap["Products & Completed Operations"] = "\$1000000"
                            tempLimitsMap["Personal & Advertising Injury"] = "\$1000000"
                            tempLimitsMap["Each Occurrence"] = "\$1000000"
                            tempLimitsMap["Fire Damage (Any One Fire)"] = "\$100000"


                            tempDeductsMap["General Aggregate Limit"] = ""
                            tempDeductsMap["Products & Completed Operations"] = ""
                            tempDeductsMap["Personal & Advertising Injury"] = ""
                            tempDeductsMap["Each Occurrence"] = ""
                            tempDeductsMap["Fire Damage (Any One Fire)"] = "Nil"

                        } else {
                            rate = 0.324
                            minPremium = 1000

                            if (params.additionalProducts.contains("AGGAdditionalCoverage")) {
                                tempLimitsMap["General Aggregate Limit"] = "\$2000000"
                            }
                            else{
                                tempLimitsMap["General Aggregate Limit"] = "\$1000000"
                            }
                            tempLimitsMap["Products & Completed Operations"] = "\$1000000"
                            tempLimitsMap["Personal & Advertising Injury"] = "\$1000000"
                            tempLimitsMap["Each Occurrence"] = "\$1000000"
                            tempLimitsMap["Fire Damage (Any One Fire)"] = "\$100000"

                            tempDeductsMap["General Aggregate Limit"] = ""
                            tempDeductsMap["Products & Completed Operations"] = ""
                            tempDeductsMap["Personal & Advertising Injury"] = ""
                            tempDeductsMap["Each Occurrence"] = ""
                            tempDeductsMap["Fire Damage (Any One Fire)"] = "Nil"
                        }
                        log.info "RATE " + rate
                        log.info "params.totalBudget " + params.totalBudget

                        def totalBudget = params.totalBudget.toDouble();
                        def remainingBudget = totalBudget;
                        def premiumRunningTotal = 0.0;

                        //1ST $500,000 RATING
                        if(totalBudget > 500000){
                            remainingBudget = totalBudget - 500000;
                            premiumRunningTotal = (500000 * rate) / 100
                        }
                        else{
                            premiumRunningTotal = (totalBudget * rate) / 100;
                            remainingBudget = 0;
                        }

                        //SECOND $500,000 RATING
                        if(remainingBudget > 500000){
                            remainingBudget = remainingBudget - 500000;
                            premiumRunningTotal = premiumRunningTotal + ((500000 * 0.162) / 100)
                        }
                        else{
                            premiumRunningTotal =  premiumRunningTotal + (remainingBudget * 0.162) / 100;
                            remainingBudget = 0;
                        }

                        //NEXT $1 MILLION RATING
                        if(remainingBudget > 1000000){
                            remainingBudget = remainingBudget - 1000000;
                            premiumRunningTotal = premiumRunningTotal + ((1000000 * 0.101) / 100)
                        }
                        else{
                            premiumRunningTotal = premiumRunningTotal + (remainingBudget * 0.101) / 100;
                            remainingBudget = 0;
                        }

                        //NEXT $3 MILLION RATING
                        if(remainingBudget > 3000000){
                            remainingBudget = remainingBudget - 3000000;
                            premiumRunningTotal = premiumRunningTotal + ((3000000 * 0.077) / 100)
                        }
                        else{
                            premiumRunningTotal = premiumRunningTotal + (remainingBudget * 0.077) / 100;
                            remainingBudget = 0;
                        }

                        //NEXT $5 MILLION RATING
                        if(remainingBudget > 5000000){
                            remainingBudget = remainingBudget - 5000000;
                            premiumRunningTotal = premiumRunningTotal + ((5000000 * 0.056) / 100)
                        }
                        else{
                            premiumRunningTotal = premiumRunningTotal + (remainingBudget * 0.056) / 100;
                            remainingBudget = 0;
                        }

                        //NEXT $10 MILLION RATING
                        if(remainingBudget > 5000000){
                            remainingBudget = remainingBudget - 5000000;
                            premiumRunningTotal = premiumRunningTotal + ((5000000 * 0.044) / 100)
                        }
                        else{
                            premiumRunningTotal = premiumRunningTotal + (remainingBudget * 0.044) / 100;
                            remainingBudget = 0;
                        }

                        if ( premiumRunningTotal > minPremium) {
                            premium = premiumRunningTotal;
                        } else {
                            premium = minPremium
                        }

                        productTotalPremium = (double) premium



                        log.info "PREMIUMS " + Math.ceil(productTotalPremium)
                        log.info "PREMIUMS " + productTotalPremium.getClass()
//                        premium = String.format("%.2f", (double)premium);


                        tempPremiumsMap["General Aggregate Limit"] = [rate, Math.ceil(productTotalPremium)]
                        tempPremiumsMap["Products & Completed Operations"] = ["flat", "incl"]
                        tempPremiumsMap["Personal & Advertising Injury"] = ["flat", "incl"]
                        tempPremiumsMap["Each Occurrence"] = ["flat", "incl"]
                        tempPremiumsMap["Fire Damage (Any One Fire)"] = ["flat", "incl"]
                        tempPremiumsMap["Blanket Additional Insured Endorsement"] = ["flat", "incl"]
                        tempPremiumsMap["Medical Expense Limit (Any One Person)"] = ["flat", "incl"]

                        if(coverageID == "CGL"){
                            lobString = "Commercial General Liability" + "\t" + Math.ceil(productTotalPremium) + "\t" + "28\t" + "15\r"
                        }
                        else if(coverageID == "CPK"){
                            lobString = "Commercial Package" + "\t" + Math.ceil(productTotalPremium) + "\t" + "28\t" + "15\r"
                        }

                        log.info "PREMIUMS " + lobString

//                        if (params.productsSelected.contains("NOAL")) {
//                            def NOHARateMinPrem = [6.0, 500.0];
//                            if (termLength <= 30) {
//                                NOHARateMinPrem = [6.0, 450.0];
//                            } else {
//                                NOHARateMinPrem = [6.0, 550.0];
//                            }
//
//
//                            def NOHApremium = 0.0;
//
//                            def NOHArate = NOHARateMinPrem[0];
//                            def NOHAminPremium = NOHARateMinPrem[1];
//
//                            def costOfHire = 0;
//                            if (params.costOfHire.length() > 0) {
//                                costOfHire = params.costOfHire.toDouble()
//                            }
//                            if (((costOfHire * NOHArate) / 100) > NOHAminPremium) {
//                                NOHApremium = (double) (costOfHire * NOHArate) / 100;
//                            } else {
//                                NOHApremium = (double) NOHAminPremium
//                            }
//
//                            //NOAL:Aggregate Limit
//                            tempPremiumsMap["Non-Owned & Hired Auto Liability"] = [6.0, NOHApremium.round(2)];
//                            tempDeductsMap["Non-Owned & Hired Auto Liability"] = "";
//                            tempLimitsMap["Non-Owned & Hired Auto Liability"] = "Up to \$1,000,000"
//                            productTotalPremium = productTotalPremium + NOHApremium
//
//                            limitsMap.remove("Hired Auto Physical Damage")
//                            deductsMap.remove("Hired Auto Physical Damage")
//
//                        } else {
//                            limitsMap.remove("Hired Auto Physical Damage")
//                            deductsMap.remove("Hired Auto Physical Damage")
//                        }

                        if (params.additionalProducts) {
                            if (params.additionalProducts.contains("BAIAdditionalCoverage")) {
                                tempPremiumsMap["Blanket Additional Insured Endorsement"] = ["flat", 250];
                                tempDeductsMap["Blanket Additional Insured Endorsement"] = "";
                                tempLimitsMap["Blanket Additional Insured Endorsement"] = ""
                                productTotalPremium = productTotalPremium + 250
                            }
                            if (params.additionalProducts.contains("WOSAdditionalCoverage")) {
                                tempPremiumsMap["Waiver of Subrogation"] = ["flat", 100];
                                tempDeductsMap["Waiver of Subrogation"] = "";
                                tempLimitsMap["Waiver of Subrogation"] = ""
                                productTotalPremium = productTotalPremium + 100
                            }
                            if (params.additionalProducts.contains("EAIAdditionalCoverage")) {
                                tempPremiumsMap["Additional Charge to Include \$5,000 Medical Payments"] = ["flat", 100];
                                tempDeductsMap["Additional Charge to Include \$5,000 Medical Payments"] = "";
                                tempLimitsMap["Additional Charge to Include \$5,000 Medical Payments"] = ""
                                productTotalPremium = productTotalPremium + 100
                            }
                            if (params.additionalProducts.contains("MEDAdditionalCoverage")) {
                                tempPremiumsMap["\$5,000 Medical Payments (Per Person)"] = ["flat", 100];
                                tempDeductsMap["\$5,000 Medical Payments (Per Person)"] = "";
                                tempLimitsMap["\$5,000 Medical Payments (Per Person)"] = ""
                                productTotalPremium = productTotalPremium + 100
                            }
                            if (params.additionalProducts.contains("AGGAdditionalCoverage")) {
                                tempPremiumsMap["Increased Agg Limit"] = ["flat", 250];
                                tempDeductsMap["Increased Agg Limit"] = "";
                                tempLimitsMap["Increased Agg Limit"] = ""
                                productTotalPremium = productTotalPremium + 250
                            }

                        }
                        limitsMap = tempLimitsMap
                        deductsMap = tempDeductsMap
                        premiumsMap = tempPremiumsMap

                    } else if (coverageID == "NOHA" || coverageID == "NOAL") {
//                        def termLength = params.proposedTermLength.split(" ")[0].toInteger();
                        if (params.productsSelected.contains("CPK:")) {
                            def NOHARateMinPrem = [6.0, 500.0];
                            if (termLength <= 30) {
                                NOHARateMinPrem = [6.0, 450.0];
                            } else {
                                NOHARateMinPrem = [6.0, 550.0];
                            }


                            def NOHApremium = 0.0;

                            def NOHArate = NOHARateMinPrem[0];
                            def NOHAminPremium = NOHARateMinPrem[1];

                            def costOfHire = 0;
                            if (params.costOfHire.length() > 0) {
                                costOfHire = params.costOfHire.toDouble()
                            }
                            if (((costOfHire * NOHArate) / 100) > NOHAminPremium) {
                                NOHApremium = (double) (costOfHire * NOHArate) / 100;
                            } else {
                                NOHApremium = (double) NOHAminPremium
                            }

                            //NOAL:Aggregate Limit
                            premiumsMap["Non-Owned & Hired Auto Liability"] = [6.0, Math.ceil(NOHApremium)];
                            deductsMap["Non-Owned & Hired Auto Liability"] = "";
                            limitsMap["Non-Owned & Hired Auto Liability"] = "\$1,000,000"
                            productTotalPremium = productTotalPremium + NOHApremium

                            limitsMap.remove("Hired Auto Physical Damage")
                            deductsMap.remove("Hired Auto Physical Damage")
                        } else {

                        }


                    }


                    def updatedLobString = "";
                    if (lobString) {
                        log.info "LOB STRING = " + lobString
                        log.info "PREMIUM = " + productTotalPremium
                        log.info "PREMIUM = " + productTotalPremium.getClass()
                        log.info "Coverage ID = " + coverageID
                        productTotalPremium = (double) productTotalPremium
                        productTotalPremium = Math.ceil(productTotalPremium)
                        lobString.split('\r').each {
                            if (it.split('\t')[0].length() > 1) {
//                            log.info it
                                updatedLobString = updatedLobString + it.split('\t')[0] + "," + Math.ceil(productTotalPremium) + "," + it.split('\t')[2] + "," + it.split('\t')[3] + ";";
//                                if(coverageID == "CGL" || coverageID == "CPK"){
//                                    if(params.additionalProducts){
//                                        if(params.additionalProducts.contains("BAIAdditionalCoverage")){
//                                            updatedLobString = updatedLobString + "Blanket Additional Insured" + "," + "500" + "," + "," + ";"
//                                        }
//                                    }
//                                    if(params.additionalProducts){
//                                        if(params.additionalProducts.contains("EAIAdditionalCoverage")){
//                                            updatedLobString = updatedLobString + "Each Additional Insured" + "," + "100" + "," + "," + ";"
//                                        }
//                                    }
//                                    if(params.additionalProducts){
//                                        if(params.additionalProducts.contains("WOSAdditionalCoverage")){
//                                            updatedLobString = updatedLobString + "Waiver Of Subrogation" + "," + "100" + "," + "," + ";"
//                                        }
//                                    }
//                                }

                            }
                        }
                    } else {

                    }

                    lobDistMap[productID] = updatedLobString;
                    log.info "Updated LOB: " + updatedLobString
                    log.info "PRODUCT ID: " + productID
                    log.info deductsMap


                    def limitsMapJson = JsonOutput.toJson(limitsMap)
                    def deductsMapJson = JsonOutput.toJson(deductsMap)
                    def premiumsMapJson = JsonOutput.toJson(premiumsMap)
                    def lobDistMapJson = JsonOutput.toJson(lobDistMap)

                    def beginTerms ="";
                    //EDITING TERMS
                    if(subjectString!=null){
                        log.info subjectString
                        def endSearchString = "United States of America";
                        def beginCut = subjectString.indexOf("THIS INSURANCE IS UNDERWRITTEN BY UNDERWRITERS ");
                        def endCut = subjectString.indexOf(endSearchString);

                        if(endCut > -1){
                            beginTerms = subjectString.substring(0, endCut + endSearchString.length()) + "\n\n";
                            subjectString = subjectString.substring(endCut + endSearchString.length()).trim();
                        }
                    }



                    def coverageJson = JsonOutput.toJson(
                            coverageCode: coverageID,
                            productCode: productID,
                            productTotalPremium: productTotalPremium,
                            limits: new JsonSlurper().parseText(limitsMapJson),
                            deductibles: new JsonSlurper().parseText(deductsMapJson),
                            premiums: new JsonSlurper().parseText(premiumsMapJson),
                            lobDist: new JsonSlurper().parseText(lobDistMapJson),
                            terms: subjectString,
                            endorse: endorseString,
                            beginTerms: beginTerms
                    )
                    arrayOfCoverageDetails.add(new JsonSlurper().parseText(coverageJson))
                }

            }
        }

//        log.info jsonResponse
        jsonResponse = JsonOutput.toJson(
                coverages: arrayOfCoverageDetails

        )
        log.info JsonOutput.prettyPrint(jsonResponse)


        render JsonOutput.prettyPrint(jsonResponse)
    }

    def calcPIP3Deductibles(totalBudget) {
        def deductAmount = 0;
        if (params.totalBudget.toDouble() <= 250000) {
            deductAmount = 2500;
        } else if (params.totalBudget.toDouble() > 250000 && params.totalBudget.toDouble() <= 500000) {
            deductAmount = 2500;
        } else if (params.totalBudget.toDouble() > 500000) {
            deductAmount = 2500;
        }

        return deductAmount;
    }

    def saveSubmissionToAIM() {
        log.info "SAVING SUBMISSION TO AIMSQL"
        log.info JsonOutput.prettyPrint(params.jsonSerial)
        log.info params.jsonSerial.getClass();
        def jsonParams = new JsonSlurper().parseText(params.jsonSerial)
        def quoteID ="";

        def accountExec = "jason";
//        if(totalBudget > 416000){
//            accountExec = "shauna"
//        }
//        else{
//            accountExec = "jason"
//        }

        log.info session.user.firstName

        //SAVE INSURED
        try {
            def quoteIDCoverages = aimDAO.saveNewSubmission(params.jsonSerial, dataSource_aim, session.user, accountExec)
            log.info "QuoteID: " + quoteIDCoverages


            def now = new Date()
            def timestamp = now.toTimestamp()

            log.info jsonParams.getAt("namedInsured")

            Submissions s;

            quoteIDCoverages.split(",").each{
                quoteID = quoteID + it.split(";")[0] + ","

                s = new portal.Submissions(submittedBy: session.user.email, aimQuoteID: it.split(";")[0], namedInsured: jsonParams.getAt("namedInsured"), submitDate: timestamp,
                        coverages: it.split(";")[1], statusCode: "QO", underwriter: accountExec+"@neeis.com")
                s.save(flush: true, failOnError: true)
            }

            log.info "REDIRECTING"
            if (quoteID.endsWith(",")) {
                quoteID = quoteID.substring(0, quoteID.length() - 1);
            }
        }
        catch (Exception e) {
            log.info(e)
            quoteID = "Error Details - " + e
        }




        render quoteID
//        redirect(controller: 'main', action: 'newSubmissionConfirm', params: [quoteID: quoteID])

    }

    def getTaxInfo(){
        log.info "GETTING TAX INFO"
        log.info params

        Sql aimsql = new Sql(dataSource_aim)

        def resultsString = "";
        def taxCodes = [:];

                aimsql.eachRow("SELECT     TransCode, TransTypeID, Description, FlatAmount_Flag, Rate, CollectedBy, AllowOverRide, State, FlagUserSelected, AP_AccountID, IncludeFees, RoundingRule, \n" +
                "                      RecordKey_PK, PremiumBasis, BasisSection, FlatRateFlag, TaxValue, TaxCodeID, FlagFullyEarned, FlagPolicyOnly, TaxRate, MinAmount, MaxAmount, AppliesTo, \n" +
                "                      CompanyID, Municipality\n" +
                "FROM         dvTaxTable\n" +
                "WHERE     (State LIKE 'CA') AND (ISNULL(Municipality, '') = '') OR\n" +
                "                      (State LIKE 'CA') AND (Municipality = '')\n" +
                "ORDER BY Description") {

            taxCodes["${it.TransCode}"] =  it.Description;
        }

        aimsql.eachRow("SELECT     State, TaxValue, FlatRateFlag, Effective, Expiration, IncludeFees, PK_TaxID, CountyID, TaxCodeID, CompanyID, TaxValueNew, CollectedBy, PaidTo, AllowOverRide, \n" +
                "                      RoundingRule, TaxLine, TaxPercentange, CoverageID_Old, TaxPercentage, StateName, DateAdded, CreatedByID, SystemReq, RecordKey_PK, CoverageID, \n" +
                "                      FlagPolicyOnly, AdmittedTax, FlagFullyEarned, ZipCodeStart, ZipCodeEnd, FlagUserSelected, MinAmount, MaxAmount, PremiumBasis, BasisSection, \n" +
                "                      FlagNonResidentTax, AppliesTo, ExcludeTRIA, FlagUseEndorsementDate, Municipality, ExemptInsuredTax\n" +
                "FROM         TaxTable WITH (NOLOCK)\n" +
                "WHERE     (State = 'CA') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AppliesTo, 'ALL') = 'ALL') AND (ISNULL(AdmittedTax, 'N') = 'N') AND \n" +
                "                      (ISNULL(ExemptInsuredTax, 'N') = 'N') OR\n" +
                "                      (State = 'CA') AND ('11/27/2016' BETWEEN Effective AND Expiration) AND (ISNULL(AdmittedTax, 'N') = 'N') AND (ISNULL(ExemptInsuredTax, 'N') = 'N') AND \n" +
                "                      (AppliesTo = 'RES')\n" +
                "ORDER BY TaxLine, SUBSTRING(CoverageID, 1, 25)") {

            resultsString = resultsString + it.TaxCodeID + "&,&" + taxCodes["${it.TaxCodeID}"] + "&,&" + it.TaxValue +  "&;;&";
        }




        render resultsString
    }

    def searchSubmissions(){
        log.info "SEARCHING..."
        log.info params

        def resultsString = "";
        Sql aimsql = new Sql(dataSource_aim)
        def submissions;




        if(session.user.userRole == "Underwriter" || session.user.userRole == "Admin"){

//      WEBSITE SEARCH RESULTS
            submissions = Submissions.findAllByNamedInsuredIlike("%${params.searchString}%",[sort: "submitDate",order: "desc"])
            log.info(submissions)

            def submissionsAimQuoteID = Submissions.findAllByAimQuoteIDIlike("%${params.searchString}%",[sort: "submitDate",order: "desc"])
            log.info(submissionsAimQuoteID)
            def submissionsSubmittedBy = Submissions.findAllBySubmittedByIlike("%${params.searchString}%",[sort: "submitDate",order: "desc"])
            log.info(submissionsSubmittedBy)
            def submissionsCoverages = Submissions.findAllByCoveragesIlike("%${params.searchString}%",[sort: "submitDate",order: "desc"])
            log.info(submissionsCoverages)


            submissions.addAll(submissionsAimQuoteID)
            submissions.addAll(submissionsSubmittedBy)
            submissions.addAll(submissionsCoverages)

            //AIMSQL SEARCH RESULTS
            aimsql.eachRow("SELECT QuoteID, NamedInsured, CoverageID, Received\n" +
                    "FROM Quote\n" +
                    "WHERE (QuoteID LIKE '%${params.searchString}%') OR\n" +
                    "(NamedInsured LIKE '%${params.searchString}%') OR\n" +
                    "(CoverageID LIKE '%${params.searchString}%') \n" +
                    "ORDER BY Received DESC") {
                def row = [:]
                row['aimQuoteID'] = it.QuoteID;
                row['namedInsured'] = it.NamedInsured;
                row['coverages'] = it.CoverageID;
                row['submittedBy'] = "AIM";
                row['statusCode'] = it.StatusID;
                row['underwriter'] = it.AcctExec;
                row['submitDate'] = it.Received;
//            resultsString = resultsString + it.QuoteID + "&,&" + it.NamedInsured + "&,&" + it.CoverageID + "&,&" + " " + "&,&" + it.Received + "&;;&";
                submissions.add(row)
            }
        }
        else if(session.user.userRole == "Broker"){

            //BROKERS ONLY SEARCH WEB DATABASE ONLY, NOT AIM
            submissions = Submissions.findAllByNamedInsuredIlike("%${params.searchString}%","%${session.user.userRole}%",[sort: "submitDate",order: "asc"])

            def submissionsAimQuoteID = Submissions.findAllByAimQuoteIDIlike("%${params.searchString}%",[sort: "submitDate",order: "asc"])
            log.info(submissionsAimQuoteID)
            def submissionsSubmittedBy = Submissions.findAllBySubmittedByIlike("%${params.searchString}%",[sort: "submitDate",order: "asc"])
            log.info(submissionsSubmittedBy)
            def submissionsCoverages = Submissions.findAllByCoveragesIlike("%${params.searchString}%",[sort: "submitDate",order: "asc"])
            log.info(submissionsCoverages)


            submissions.addAll(submissionsAimQuoteID)
            submissions.addAll(submissionsSubmittedBy)
            submissions.addAll(submissionsCoverages)
            submissions.removeAll{
                it.submittedBy != session.user.email
            }
        }


        submissions = submissions.sort{it.aimQuoteID}
        submissions = submissions.reverse()
        submissions.each{
            resultsString = resultsString + it.aimQuoteID + "&,&" + it.namedInsured + "&,&" + it.coverages + "&,&" + it.submittedBy + "&,&" + it.submitDate +
                    "&,&" + it.statusCode + "&,&" + it.underwriter + "&;;&";
        }


        if (resultsString.endsWith("&;;&")) {
            resultsString = resultsString.substring(0, resultsString.length() - 4);
        }

        render resultsString
    }

    def checkAgencyID(){
        log.info "CHECKING AGENCY ID"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)
        def agencies =[];

        def string = "";
        aimsql.eachRow("SELECT     Name, ProducerID, StatusID, Prospect, AwardLvl, Address1, Address2, City, State, Zip, Prefix, Phone, Fax, Account_RepID, Tax_ID, Commission, CommissionLvl, \n" +
                "                      Max_Comm, Calc_Type, TypeID, Pmt_Type, TermsID, Tax1099, ParentID, ParentFlag, License, EO_Carrier, EO_PolicyID, EO_Limits, PrincipalID, CountyID, \n" +
                "                      MktTerritory, BranchID, ApplicationDate, TerminatedDate, Sub, Last_Visit, TargetVolume, CollectTax, MapToID, AcctingID, AutoKeyID, AwardDate, BestRating, \n" +
                "                      ConditionCd, EMail, Established, EO_Expiration, LegalName, MailAddress1, MailAddress2, MailCity, MailState, MailZip, MktgGroupID, PaymentTermsID, \n" +
                "                      PrimaryContactID, StructureID, WebSite, LicenseExpiration, ReferenceID, LastContactDate, ActiveFlag, AcuityKey, SpecialCodes, AllowRenewals, AllowAccounting, \n" +
                "                      AllowNewBusiness, AllowPolicyServicing, StatusNote, Comment, BillToParent, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgState, AcctgZip, AcctgPhone, AcctgFax, \n" +
                "                      DateProducerAgreement, DateProducerProfile, ServiceUWID, ClassCode, SourceOfLead, FlagAllowSubProducerPay, FlagPaidByStatement, Taxable, DateAdded, \n" +
                "                      DateModified, CreatedByID, ModifiedByID, MonthlySvcFee, PaymentMethod, PaidThrough, PaymentStart, Status, PriorAgency, PriorAgencyID, SuspenseReason, \n" +
                "                      SortName, TermDays, TermFrom, FlagOverRideComp, InvTranCode, NonPremium, FlagChargeServiceFee, IsCP, AvailableMarkets, Territory, CaptiveAgent, \n" +
                "                      ProfessionalAffiliation, MktRepID, CsrID, ProcessBatchKey_FK, AuthorizedTeams, LOBAccess, CountyName, RollbookDate, CommMethodID, FlagDisplayPopupNote, \n" +
                "                      AcctgEMail, AcctgContactKey_FK, ContactKey_FK, DateIRFileCreated, FinanceMapCode, FlagExportToFinance, CountryID, MailCountryID, AcctgCountryID, \n" +
                "                      MembershipKey_FK, MembershipExp, Membership2Key_FK, Membership2Exp, Membership3Key_FK, Membership3Exp, NPR, DandB\n" +
                "FROM         Producer\n" +
                "WHERE         ProducerID='${params.agencyID}'\n" +
                "ORDER BY Name") {
            log.info "Result: " + it.Name
            string = it.Name
        }
        render string;
    }

    def checkAgencyPIN(){
        log.info "CHECKING AGENCY PIN"
        log.info params
        Sql aimsql = new Sql(dataSource_aim)
        def agencies =[];

        def string = "";
        aimsql.eachRow("SELECT     Name, ProducerID, StatusID, Prospect, AwardLvl, Address1, Address2, City, State, Zip, Prefix, Phone, Fax, Account_RepID, Tax_ID, Commission, CommissionLvl, \n" +
                "                      Max_Comm, Calc_Type, TypeID, Pmt_Type, TermsID, Tax1099, ParentID, ParentFlag, License, EO_Carrier, EO_PolicyID, EO_Limits, PrincipalID, CountyID, \n" +
                "                      MktTerritory, BranchID, ApplicationDate, TerminatedDate, Sub, Last_Visit, TargetVolume, CollectTax, MapToID, AcctingID, AutoKeyID, AwardDate, BestRating, \n" +
                "                      ConditionCd, EMail, Established, EO_Expiration, LegalName, MailAddress1, MailAddress2, MailCity, MailState, MailZip, MktgGroupID, PaymentTermsID, \n" +
                "                      PrimaryContactID, StructureID, WebSite, LicenseExpiration, ReferenceID, LastContactDate, ActiveFlag, AcuityKey, SpecialCodes, AllowRenewals, AllowAccounting, \n" +
                "                      AllowNewBusiness, AllowPolicyServicing, StatusNote, Comment, BillToParent, AcctgAddress1, AcctgAddress2, AcctgCity, AcctgState, AcctgZip, AcctgPhone, AcctgFax, \n" +
                "                      DateProducerAgreement, DateProducerProfile, ServiceUWID, ClassCode, SourceOfLead, FlagAllowSubProducerPay, FlagPaidByStatement, Taxable, DateAdded, \n" +
                "                      DateModified, CreatedByID, ModifiedByID, MonthlySvcFee, PaymentMethod, PaidThrough, PaymentStart, Status, PriorAgency, PriorAgencyID, SuspenseReason, \n" +
                "                      SortName, TermDays, TermFrom, FlagOverRideComp, InvTranCode, NonPremium, FlagChargeServiceFee, IsCP, AvailableMarkets, Territory, CaptiveAgent, \n" +
                "                      ProfessionalAffiliation, MktRepID, CsrID, ProcessBatchKey_FK, AuthorizedTeams, LOBAccess, CountyName, RollbookDate, CommMethodID, FlagDisplayPopupNote, \n" +
                "                      AcctgEMail, AcctgContactKey_FK, ContactKey_FK, DateIRFileCreated, FinanceMapCode, FlagExportToFinance, CountryID, MailCountryID, AcctgCountryID, \n" +
                "                      MembershipKey_FK, MembershipExp, Membership2Key_FK, Membership2Exp, Membership3Key_FK, Membership3Exp, NPR, DandB\n" +
                "FROM         Producer\n" +
                "WHERE         ProducerID='${params.agencyID}'\n" +
                "ORDER BY Name") {
            log.info "Result: " + it.ReferenceID
            if(params.agencyPIN == ""+it.ReferenceID){
                log.info "Match: "
                string = it.ReferenceID
            }

        }
        render string;
    }

    def getQuestionsForRiskType() {
        log.info "GETTING QUESTIONS FOR RISK TYPE"
        log.info params

        def resultsString ="";

//        def questionCategories = portal.Questions.list().unique { it.category }.category;

        def questions

        if(params.questionCategory == "entertainer"){
            questions = Questions.findAllWhere(entertainer: "Y");
            log.info questions
        }
        else if(params.questionCategory == "specialEvents"){
            questions = Questions.findAllWhere(specialEvents: "Y");
            log.info questions
        }
        else if(params.questionCategory == "office"){
            questions = Questions.findAllWhere(office: "Y");
            log.info questions
        }
        else if(params.questionCategory == "shellCorp"){
            questions = Questions.findAllWhere(shellCorp: "Y");
            log.info questions
        }
        else if(params.questionCategory == "venueTenantUser"){
            questions = Questions.findAllWhere(venueTenantUser: "Y");
            log.info questions
        }
        else if(params.questionCategory == "ancillaryEntertainmentRisk"){
            questions = Questions.findAllWhere(ancillaryEntertainmentRisk: "Y");
            log.info questions
        }
        questions = questions.sort{it.weight}

        questions.each{
            resultsString = resultsString +
                    it.category + "&,&" +
                    it.htmlID + "&,&" +
                    it.htmlClass + "&,&" +
                    it.htmlInputType +"&,&" +
                    it.htmlInputName +"&,&" +
                    it.htmlInputValue +"&,&" +
                    it.htmlCheckboxRadioText +"&,&" +
                    it.defaultChecked +"&,&" +
                    it.dropdownOptionsValText +"&,&" +
                    it.htmlDataReviewName +"&,&" +
                    it.htmlPlaceholder +"&,&" +
                    it.questionText +"&,&" +
                    it.htmlStyle +"&,&" +
                    it.required +"&,&" +
                    it.attachments +"&,&" +
                    it.questionGroup +"&,&" +
                    it.weight + "&;&";
        }

//        def questionCategories = questions.unique{it.category}.category;
        def questionCategories = QuestionCategory.findAll();
        questionCategories = questionCategories.sort{it.weight}
//        questionCategories = questionCategories.reverse()
        resultsString = resultsString + "&;;&" + questionCategories.categoryName;

        log.info questionCategories.categoryName

        render resultsString



    }

    def sendMessage(){
        log.info "GETTING QUESTIONS FOR RISK TYPE"
        log.info params

        def now = new Date()
        def timestamp = now.toTimestamp()
        log.info timestamp

        try {
            NeeisMessages m;

            m = new portal.NeeisMessages(subject: params.subject,
                    messageType: params.messageType, //firstMessage, replyMessage,
                    body: params.messageBody,
                    sender: session.user.email,
                    recipient: params.recipient,
                    sentDateTime: timestamp,
                    attachments: "",
                    replyTo: params.replyTo,
                    messagesInChain: 0, //will be updated after insert
                    messageChainID: params.messageChainID,
                    unread: "true");

            m.save(flush: true, failOnError: true)
        }
        catch (Exception e) {
            log.info(e)
        }

        //Need to get and update number of messages in chain
        def allMessagesInChain = NeeisMessages.findAllByMessageChainID(params.messageChainID);

        def numMessagesInChain = allMessagesInChain[0].messagesInChain
        numMessagesInChain = allMessagesInChain.size();


        def updatedRecords = NeeisMessages.executeUpdate("update NeeisMessages set messagesInChain = ? where messageChainID = ?", [numMessagesInChain, Integer.parseInt(params.messageChainID)])


        render "good"
    }

    def markMessagesRead() {
        log.info "MARK MESSAGES READ"
        log.info params

        def updatedRecords = NeeisMessages.executeUpdate("update NeeisMessages set unread = ? where messageChainID = ?", ["false", Integer.parseInt(params.messageChainRead)])


        render "good;" + params.messageChainRead
    }
}