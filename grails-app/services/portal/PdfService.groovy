package portal

import grails.util.Environment
import java.io.IOException;
import grails.transaction.Transactional
import grails.util.Holders
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.multipdf.PDFMergerUtility
import org.apache.pdfbox.pdmodel.PDDocumentCatalog
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm
import org.apache.pdfbox.pdmodel.interactive.form.PDField
import org.apache.pdfbox.pdmodel.interactive.form.PDTextField
import org.apache.pdfbox.pdmodel.encryption.AccessPermission
import org.apache.pdfbox.pdmodel.interactive.form.PDTerminalField
import org.apache.pdfbox.pdmodel.interactive.form.PDVariableText
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import groovy.json.JsonSlurper
import groovy.json.JsonOutput
import org.apache.pdfbox.multipdf.PDFMergerUtility
import portal.Utils.FileTransferHelper
import org.apache.pdfbox.pdmodel.graphics.PDXObject
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject

@Transactional
class PdfService {
    def grailsApplication = Holders.grailsApplication
    def dataSource_aim
    def aimSqlService
    def mySqlService
    def dateTimeService
    def utilService
    def syncLog
    def jsonOutput = new JsonOutput()
    def jsonSlurper = new JsonSlurper()


    //DEFAULT FONT STYLES
    PDFont defaultFont = PDType1Font.HELVETICA
    PDFont defaultBoldFont = PDType1Font.HELVETICA_BOLD

    //DEFAULT FONT SIZES
    def defaultFontSize = 8
    def headerFontSize = 8
    def titleFontSize = 16
    def sectionHeaderFontSize = 10

    //LINE SPACING
    def newLinePadding = 2
    Double leadingDefault = 1.0

    //MARGINS
    float marginTop = 60
    float marginLeft = 20
    float marginRight = 20
    float marginBottom = 60

    //HEADER POSITIONS
    float headerLeftX, headerLeftY
    float headerRightX, headerRightY


    //TAB STRING
    String tabString = "     "

    //COLUMN POSITIONS
    float defaultColumn = marginLeft
    float twoColumn1, twoColumn2, twoColumnWidth
    float threeColumn1, threeColumn2, threeColumn3, threeColumnWidth

    //CURSOR VARIABLES
    PDFont cursorFont = defaultFont
    def cursorFontSize = defaultFontSize
    float cursorX = 0
    float cursorY = 0
    PDPage page
    PDDocument doc
    PDPageContentStream contents

    //SAVE DIRECTORY
    def indicationTemplatesDir = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/IndicationTemplates/")
    def attachmentsTempDir = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/")
    def attachmentsDir = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/")
    def logoDir = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/images/logos/Barbican.png")

    def createIndicationDocBACKUPDONTUSE() {
        // Loads file
        def firstPagePath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/indicationCoverPage.pdf")
        File file = new File(firstPagePath);
        PDDocument document = PDDocument.load(file);
        PDDocumentCatalog pdCatalog = document.getDocumentCatalog();
        PDAcroForm pdAcroForm = pdCatalog.getAcroForm();
        PDFMergerUtility ut = new PDFMergerUtility();
        ut.addSource(file);

        createBlankPDF()

        def lastPagePath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/IndicationLastPage.pdf")
        File lastFile = new File(lastPagePath);
        PDDocument lastDocument = PDDocument.load(lastFile);
        PDDocumentCatalog lastPdCatalog = lastDocument.getDocumentCatalog();
        PDAcroForm lastPdAcroForm = lastPdCatalog.getAcroForm();
        ut.addSource(lastFile);

        // Save the NEWLY created document
        // Save merged pdf file

        def saveFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/")
        ut.setDestinationFileName(saveFolderPath + "/testIndicationMergedFile.pdf");
        ut.mergeDocuments();
        log.info "Merged Document Saved"
        document.close();

        //finalFile(policyDataMapTest)
        //document.close();
    }
    def createIndicationDoc(submissionMap, productDetailArray){
        log.info "CREATING INDICATION"
        productDetailArray.quoteID.each {
            PDFMergerUtility merger = new PDFMergerUtility()

            //COVER PAGE
            File coverPageFile = new File( indicationTemplatesDir + "/indicationCoverPage.pdf")

            byte[] newCoverByteArray= addImageLogo(coverPageFile);
            merger.addSource(new ByteArrayInputStream(newCoverByteArray))

            //CREATED INDICIATION
            byte[] newIndicationByteArray= createBlankPDF(submissionMap, productDetailArray);
            merger.addSource(new ByteArrayInputStream(newIndicationByteArray))

            //LAST PAGE
            File lastPageFile = new File( indicationTemplatesDir + "/IndicationLastPage.pdf")
            merger.addSource(lastPageFile)


            log.info "Merged Document Saved"


            //TRANSFER FILES TO AIM AND CORRECT QUOTE FOLDERS
            FileTransferHelper fileHelper = new FileTransferHelper()


            def quoteID = it
            def folderPath = attachmentsDir + "/${quoteID}/"
            def fileName = "Indication ${submissionMap.versionLetter}.pdf"
            def fullPath = folderPath + fileName

            //CREATE FOLDER FOR QUOTE
            def folder = new File (folderPath)
            folder.mkdirs()

            merger.setDestinationFileName(fullPath)
            merger.mergeDocuments()
//            log.info fullPath

            fileHelper.ftpFileToAIM(fileName, folderPath, quoteID, dataSource_aim);
        }

    }
    def addImageLogo(coverPageFile){
        doc = PDDocument.load(coverPageFile);
        //Retrieving the page
        page = doc.getPage(0);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            //Creating PDImageXObject object
            PDImageXObject pdImage = PDImageXObject.createFromFile(logoDir, doc);

            //creating the PDPageContentStream object
            contents = new PDPageContentStream(doc, page, true, true);

            //INITIALIZE CONTENT STREAM
            contents.setLeading(leadingDefault)

            //HEADER
            insertCoverHeader()
            //Drawing the image in the PDF document
            contents.drawImage(pdImage, 10, 720, 125, 50);

            log.info ("Image inserted");

            //Closing the PDPageContentStream object
            contents.close();
            doc.save(outputStream);

        }
        catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            statusMsg = "Error"
        }
        finally {
            doc.close()
        }

        return outputStream.toByteArray();
    }
    def createBlankPDF(submissionMap, productDetailArray){
        def statusMsg = "Success"
        PDFMergerUtility ut = new PDFMergerUtility();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        doc = new PDDocument()
        page = new PDPage()

        try{
            doc.addPage(page);

            //INITIALIZE CURSOR
            initCursor(page)
            initColumnPositions(page)
            initHeaderPositions()

            //INITIALIZE CONTENT STREAM
            contents = new PDPageContentStream(doc, page)
            contents.setLeading(leadingDefault)

            //HEADER
            insertHeader()





            //POLICY SUMMARY HEADER
            insertTitle( "Policy Summary")
            newLine()
            //DRAW LINE
            drawLine()





            //NAMED INSURED HEADER
            newLine()
            insertSectionHeader("Named Insured")
            newLine()
            drawLine()
            newLine()

            //NAMED INSURED SECTION TEXT
            insertTwoColumnLine(submissionMap.namedInsured, "Contact: ${submissionMap.namedInsuredContact}")
            newLine()
            insertTwoColumnLine(submissionMap.streetAddressMailing, "Email: ${submissionMap.namedInsuredEmail}")
            newLine()
            insertTwoColumnLine("${submissionMap.cityMailing}, ${submissionMap.stateMailing}, ${submissionMap.zipCodeMailing}", "Phone: ${submissionMap.namedInsuredPhone}")
            newLine()
            newLine()




            //INSURANCE COMPANY HEADER
            newLine()
            insertSectionHeader("Insurance Company")
            newLine()
            drawLine()
            newLine()

            //INSURANCE COMPANY SECTION
            insertText("Fireman's Fund Ins Co/Allianz Global, Lloyd's of London / Barbican Syndicate 1955")
            newLine()
            newLine()



            //POLICY TERM HEADER
            newLine()
            insertSectionHeader("Policy Term")
            newLine()
            drawLine()
            newLine()

            //POLICY TERM SECTION
            insertText("Policy Term: ${submissionMap.proposedTermLength}")
            newLine()
            insertText("Proposed Effective: ${submissionMap.proposedEffective} - ${submissionMap.proposedExpiration}")
            newLine()



            //PREMIUM SUMMARY HEADER
            newLine()
            insertSectionHeader("Premium Summary Header")
            newLine()
            drawLine()
            newLine()

            insertPremiumSummary(submissionMap)




            //LIMITS AND DEDUCTIBLE HEADER
            newLine()
            insertSectionHeader("Limits and Deductibles")
            newLine()
            drawLine()
            newLine()

            insertLimitDeductibleSection(submissionMap)

            contents.close()
            page = new PDPage()
            doc.addPage(page);
            contents = new PDPageContentStream(doc, page)
            contents.setLeading(leadingDefault)

            initCursor(page)
            initColumnPositions(page)
            initHeaderPositions()
            insertHeader()

            //TERMS
            newLine()
            insertTitle("Terms")
            newLine()
            drawLine()
            newLine()

            insertTerms(submissionMap)


            //POLICY FORMS
            newLine()
            insertTitle("Policy Forms / Endorsement")
            newLine()
            drawLine()
            newLine()
            insertText("The following forms will be attached to any policy issued")
            newLine()
            newLine()
            insertSectionHeader("FORM")
            newLine()
            drawLine()
            newLine()

//            insertLimitDeductibleSection()





            contents.close()
            page = new PDPage()
            doc.addPage(page);
            contents = new PDPageContentStream(doc, page)
            contents.setLeading(leadingDefault)

            initCursor(page)
            initColumnPositions(page)
            initHeaderPositions()
            insertHeader()

            //UNDERWRITING INFORMATIN SUBMITTED
            newLine()
            insertTitle("Underwriting Information Submitted")
            newLine()
            drawLine()
            newLine()

            insertUWQuestionsSection(submissionMap)





            checkAndCreateNewPage()

            //RATING
            newLine()
            insertSectionHeader("Rating")
            newLine()
            drawLine()
            newLine()

//            insertLimitDeductibleSection(submissionMap)

            newLine()
            drawLine()
            newLine()
            insertText("This proposal is valid for 30 days from the sate of issuance and is strictly conditioned upon no material change in the risk occurring between the date of this letter")
            newLine()
            insertText("and the inception date of the proposed policy. Should there be any material changes in exposures or other hazards, we recommend that you submit the details of")
            newLine()
            insertText("this information immediately, so that we may submit to the insurance carrier in order to complete the underwriting process")
            newLine()
            newLine()
            insertText("This letter does not amend or otherwise affect the terms, conditions, or coverage of any insurance policy issued by Underwriters at Lloyd’s of London / Barbican. ")
            newLine()
            insertText("It is not a representation that coverage does or does not exist for any particular claim or loss, or type of claim or loss, under any such policy. Whether coverage does")
            newLine()
            insertText("not exist for any particular claim or loss under the policy depends on the facts and circumstances involved in the claim or loss and all applicable policy wording. ")





            contents.close()
//            doc.save(attachmentsTempDir + "/IndicationTest.pdf")

            doc.save(outputStream);

        }
        catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            log.info("Error Details - " + exceptionAsString)
            statusMsg = "Error"
        }
        finally {

            doc.close()

        }

        return outputStream.toByteArray();
    }


    //DIMENSION FUNCTIONS
    float getPageTotalWidth(PDPage page){
        return (float) page.getMediaBox().getWidth()
    }
    float getPageTotalHeight(PDPage page){
        return (float) page.getMediaBox().getHeight()
    }
    float getPageInnerWidth(PDPage page){
        float w = (float) page.getMediaBox().getWidth() - marginLeft - marginRight
        return w
    }
    float getPageInnerHeight(PDPage page){
        float h = (float) page.getMediaBox().getHeight() - marginTop - marginBottom
        return h
    }

    //PAGE FUNCTIONS
    def checkAndCreateNewPage(){
        if(cursorY <= marginBottom){
            contents.close()
            page = new PDPage()
            doc.addPage(page);
            contents = new PDPageContentStream(doc, page)
            contents.setLeading(leadingDefault)
            initCursor(page)
            initColumnPositions(page)
            initHeaderPositions()
            insertHeader()
        }
    }
    //HEADER FUNCTIONS
    def insertCoverHeader(){
        cursorFontSize = headerFontSize
        cursorFont = defaultFont

        //INITIALIZE CURSOR
        initCursor(page)
        initColumnPositions(page)
        initHeaderPositions()

        float coverHeaderLeftX = 160
        float coverHeaderRightX = 260

        //LEFT HEADER SECTION
        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(coverHeaderLeftX, headerLeftY);
        contents.showText("New Empire - Personal Lines");
        contents.newLineAtOffset(coverHeaderRightX, 0)
        contents.showText("Date: MM/DD/YYYY");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(coverHeaderLeftX, headerLeftY);
        contents.showText("1611 S Catalina Ave #208");
        contents.newLineAtOffset(coverHeaderRightX, 0)
        contents.showText("Submission ID:");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(coverHeaderLeftX, headerLeftY);
        contents.showText("Redondo Beach ,CA 90277");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(coverHeaderLeftX, headerLeftY);
        contents.showText("(310) 265-3800");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(coverHeaderLeftX, headerLeftY);
        contents.showText("Agent: Andee Abad");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(coverHeaderLeftX, headerLeftY);
        contents.showText("CALicNo:");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(coverHeaderLeftX, headerLeftY);
        contents.showText("Email: andee@neeis.com");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(coverHeaderLeftX, headerLeftY);
        contents.showText("Phone:");
        contents.endText();





        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
    }

    //HEADER FUNCTIONS
    def insertHeader(){
        cursorFontSize = headerFontSize
        cursorFont = defaultFont


        //LEFT HEADER SECTION
        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(headerLeftX, headerLeftY);
        contents.showText("New Empire - Personal Lines");
        contents.newLineAtOffset(headerRightX, 0)
        contents.showText("Agent: Andee Abad");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(headerLeftX, headerLeftY);
        contents.showText("1611 S Catalina Ave #208");
        contents.newLineAtOffset(headerRightX, 0)
        contents.showText("CALicNo:");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(headerLeftX, headerLeftY);
        contents.showText("Redondo Beach ,CA 90277");
        contents.newLineAtOffset(headerRightX, 0)
        contents.showText("Email: andee@neeis.com");
        contents.endText();

        headerLeftY = headerLeftY - cursorFontSize - newLinePadding

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(headerLeftX, headerLeftY);
        contents.showText("(310) 265-3800");
        contents.newLineAtOffset(headerRightX, 0)
        contents.showText("Phone:");
        contents.endText();





        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
    }
    //CONTENT FUNCTIONS
    def drawLineAt(float y){
        float startX = marginRight
        float lineY = (float) y + 6
        contents.moveTo(startX, (float) lineY)
        float endX = getPageTotalWidth(page) - marginRight
        contents.lineTo(endX, lineY)
        contents.stroke()
    }
    def drawLine(){
        float startX = marginRight
        float lineY = (float) cursorY + 6
        contents.moveTo(startX, (float) lineY)
        float endX = getPageTotalWidth(page) - marginRight
        contents.lineTo(endX, lineY)
        contents.stroke()
    }
    def insertTitle(text){
        def cleanedString = cleanString(text)
        cursorFontSize = titleFontSize
        cursorFont = defaultFont

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(cursorX, cursorY);
        contents.showText(cleanedString);
        contents.endText();

        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
    }
    def insertSectionHeader(text){
        cursorFontSize = sectionHeaderFontSize
        cursorFont = defaultBoldFont

        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)
        contents.newLineAtOffset(cursorX, cursorY);
        contents.showText(text);
        contents.endText();

        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
    }
    def insertText(text){
        //SPLITS ALL OF TEXT STRING BY ANY NEW LINE CHARACTERS INTO ARRAY
        def lines = []
        if(text.contains("\n") || text.contains("\\n") ||
                text.contains("\r") || text.contains("\\r") ){
            lines = text.split("\\r\\n|\\n|\\r")
        }
        else{
            lines << text
        }

        //LOOP OVER ARRAY TO PRINT LINE INDIVIDUALLY
        def numLines = lines.size()
        lines.each{
            def thisLine =  it
            def thisLineIsTabbed = false;
            if(thisLine.contains("\t")){
                thisLine = thisLine.replaceAll("\t", tabString)
                thisLineIsTabbed = true
            }

            float eachLetterWidth = 3.65
            float lineLength = thisLine.size() * eachLetterWidth

            float maxLineLengthAllowed = getPageInnerWidth(page)
            Integer maxCharactersAllowedInLine = (maxLineLengthAllowed/eachLetterWidth).toInteger()

            if(lineLength > maxLineLengthAllowed ){
//                log.info "LINE CONTENT ==== " + thisLine
//                log.info "LINE LENGTH ==== " + lineLength
//                log.info "INNER PAGE WIDTH ===== " + maxLineLengthAllowed
                def wrappedLinesArray = splitStringEvery(thisLine, maxCharactersAllowedInLine)

                wrappedLinesArray.eachWithIndex{ wrappedLine, index ->
                    if(index > 0){
                        wrappedLine = wrappedLine + tabString
                    }
                    cursorFontSize = defaultFontSize
                    cursorFont = defaultFont
                    contents.beginText();
                    contents.setFont(cursorFont, cursorFontSize)
                    contents.newLineAtOffset(cursorX, cursorY);
                    contents.showText(wrappedLine);
                    contents.endText();

                    cursorFontSize = defaultFontSize
                    cursorFont = defaultFont

                    newLine()
                }
            }
            else{
                cursorFontSize = defaultFontSize
                cursorFont = defaultFont
                contents.beginText();
                contents.setFont(cursorFont, cursorFontSize)
                contents.newLineAtOffset(cursorX, cursorY);
                contents.showText(thisLine);
                contents.endText();

                cursorFontSize = defaultFontSize
                cursorFont = defaultFont

                if(numLines > 1){
                    newLine()
                }
            }









        }
    }
    def insertTwoColumnLine(column1Text, column2Text){
        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)

        contents.newLineAtOffset(cursorX, cursorY);
        contents.showText(column1Text);
        contents.newLineAtOffset(twoColumnWidth, 0)
        contents.showText(column2Text);

        contents.endText();
        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
    }
    def insertThreeColumnLine(column1Text, column2Text, column3Text){
        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)

        contents.newLineAtOffset(cursorX, cursorY);
        contents.showText(column1Text);
        contents.newLineAtOffset(threeColumnWidth, 0)
        contents.showText(column2Text);
        contents.newLineAtOffset(threeColumnWidth, 0)
        contents.showText(column3Text);

        contents.endText();
        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
    }
    def insertLimDeductCoverageHeader(column1Text, column2Text, column3Text){
        cursorFontSize = defaultFontSize
        cursorFont = defaultBoldFont
        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)

        contents.newLineAtOffset(cursorX, cursorY);
        contents.showText(column1Text);
        contents.newLineAtOffset(threeColumnWidth, 0)
        contents.showText(column2Text);
        contents.newLineAtOffset(75, 0)
        contents.showText(column3Text);

        contents.endText();
        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
    }
    def insertLimDeductLine(column1Text, column2Text, column3Text){
        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
        contents.beginText();
        contents.setFont(cursorFont, cursorFontSize)

        contents.newLineAtOffset(cursorX, cursorY);
        contents.showText(column1Text);
        contents.newLineAtOffset(threeColumnWidth, 0)
        contents.showText(column2Text);
        contents.newLineAtOffset(75, 0)
        contents.showText(column3Text);

        contents.endText();
        cursorFontSize = defaultFontSize
        cursorFont = defaultFont
    }


    //COMPLEX SECTION FUNCTIONS
    def insertPremiumSummary(submissionMap){
        //COVERAGES AND THEIR PREMIUMS
        submissionMap.coverages.each{
            def covID = it
            def coverageName = submissionMap.premiumMap[covID].coverageName
            def coveragePremium = utilService.floatToMoneyString(submissionMap.premiumMap[covID].premium)

            insertTwoColumnLine(coverageName, coveragePremium)
            newLine()
        }

        //TAX LINES
        submissionMap.premiumMap.taxLines.each{
            def taxMap = it
            def taxName = taxMap.name
            def taxAmount = utilService.floatToMoneyString(taxMap.value)

            insertTwoColumnLine(taxName, taxAmount)
            newLine()
        }


        //POLICY FEE LINE
        def totalPolicyFeeString = utilService.floatToMoneyString(submissionMap['totalPolicyFee'])

        insertTwoColumnLine("Policy Fee", totalPolicyFeeString)
        newLine()

    }

    def insertLimitDeductibleSection(submissionMap){
        submissionMap.coveragesAndProducts.each { k,v ->
            def covID = k
            def productMap = v
            def productID = productMap.productID
            def coverageName = submissionMap.premiumMap[covID].coverageName

//            for (item in productID){
//                if (productID.length > 45 && productID.charAt(46) == " "){
//                    productID.charAt(46) == newLine()
//                }
//
//                else if (productID.length > 45  && productID.charAt(46) != " "){
//                    def pos = 0;
//                    while(productID.length < 45) {
//                        pos = productID.lastIndexOf(" ")
//                    }
//                    productID.charAt(pos) == newLine()
//                }
//            }


            insertLimDeductCoverageHeader(coverageName, "Limits", "Deductibles")
            newLine()
            drawLine()
            newLine()

            submissionMap.limitDeductMap[productID].each{
                def description = it.description
                def limitValue = ""
                def deductValue = ""

                if(it.limitValue){
                    limitValue = it.limitValue
                }
                if(it.deductValue){
                    deductValue = it.deductValue
                }

                insertLimDeductLine(description, limitValue, deductValue)
                newLine()

            }

            newLine()
            newLine()

        }
    }
    def insertTerms(submissionMap){
        insertText(submissionMap.terms)
        newLine()
    }
    def insertUWQuestionsSection(submissionMap){
        submissionMap.uwQuestionForIndicationArray.each{

            insertSectionHeader(it.categoryName)
            newLine()

            it.questionsArray.each{

                insertTwoColumnLine("${it.questionText}", "${it.questionAnswer}")
                newLine()

            }


            newLine()
        }

    }


    //CURSOR FUNCTIONS
    def initCursor(page){
        cursorX = marginRight
        cursorY = getPageTotalHeight(page) - marginTop
    }
    def changeCursorFont(PDFont font){

    }
    def changeCursor(fontSize){

    }
    def newLine(){
        checkAndCreateNewPage()
        cursorY = cursorY - cursorFontSize - newLinePadding
    }


    //HEADER POSITION FUNCTIONS
    def initHeaderPositions(){
        headerLeftX = marginLeft
        headerLeftY = getPageTotalHeight(page)- 10

        headerRightX = (getPageInnerWidth(page)/5)*4
        headerRightY = getPageTotalHeight(page)- 10
    }
    //COLUMN POSITIONS
    def initColumnPositions(page){
        twoColumn1 = marginLeft
        twoColumn2 = getPageInnerWidth(page)/2
        twoColumnWidth = getPageInnerWidth(page)/2

        threeColumn1 = marginLeft
        threeColumn2 = getPageInnerWidth(page)/3
        threeColumn3 = (getPageInnerWidth(page)/3) + (getPageInnerWidth(page)/3)
        threeColumnWidth = (getPageInnerWidth(page)/3)


    }
    //STRING CLEANING
    def cleanString(string){
        def returnString = string
        if(returnString.contains("\n") || returnString.contains("\\n") ||
                returnString.contains("\r") || returnString.contains("\\r") ){
            returnString = returnString.replaceAll("\\r|\\n", "")
        }

        return returnString
    }

    String[] splitStringEvery(String s, int interval) {
        int arrayLength = (int) Math.ceil(((s.length() / (double)interval)));
        String[] result = new String[arrayLength];

        int j = 0;
        int lastIndex = result.length - 1;
        for (int i = 0; i < lastIndex; i++) {
            result[i] = s.substring(j, j + interval);
            j += interval;
        } //Add the last bit
        result[lastIndex] = s.substring(j);

        return result;
    }



    def createCert(){
        // Loads file
        def templatePath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/certificateTemp.pdf")
        File file = new File(templatePath);
        PDDocument document = PDDocument.load(file);
        PDDocumentCatalog pdCatalog = document.getDocumentCatalog();
        PDAcroForm pdAcroForm = pdCatalog.getAcroForm();
        PDTextField textBox = new PDTextField(pdAcroForm);
        PDFMergerUtility ut = new PDFMergerUtility();

        //list of all inputs / values
        for (PDField pdField : pdAcroForm.getFields()) {
            def pdfValue = pdField.getValue()
            def pdfName = pdField.getFullyQualifiedName()
            def value = policyDataMapTest[pdfName]
//                pdField.setDefaultAppearance("/Helv 0 Tf 0 g ");

            log.info pdField.getDefaultAppearance()
            pdField.setValue(value)
        }
        for (PDField pdField : pdAcroForm.getFields()) {
            log.info(pdField.getValue())
            log.info(pdField.getFullyQualifiedName())
            pdField.setReadOnly(true);
        }
        def saveFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/")
        ut.setDestinationFileName(saveFolderPath + "/certificateTempSaved.pdf");
        ut.mergeDocuments();
        log.info "Merged Document Saved"
        document.close();

//        finalFile(policyDataMapTest)
//        document.close();
    }

    def createSLA(){
        // Loads file
        def templatePath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/SL2Form.pdf")
        File file = new File(templatePath);
        PDDocument document = PDDocument.load(file);
        PDDocumentCatalog pdCatalog = document.getDocumentCatalog();
        PDAcroForm pdAcroForm = pdCatalog.getAcroForm();
        PDFMergerUtility ut = new PDFMergerUtility();
        ut.addSource(file);

// Save the NEWLY created document
//       Save merged pdf file
        def saveFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/")
        ut.setDestinationFileName(saveFolderPath + "/SL2SavedFile.pdf");
        ut.mergeDocuments();
        log.info "Merged Document Saved"
        document.close();

//        finalFile(policyDataMapTest)
//        document.close();
    }

//    def createBindingConfirmation(){
//        // Loads file
//        def templatePath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/BindingConfirmation.pdf")
//        File file = new File(templatePath);
//        PDDocument document = PDDocument.load(file);
//        PDDocumentCatalog pdCatalog = document.getDocumentCatalog();
//        PDAcroForm pdAcroForm = pdCatalog.getAcroForm();
//        PDFMergerUtility ut = new PDFMergerUtility();
//        ut.addSource(file);
//
//// Save the NEWLY created document
////       Save merged pdf file
//        def saveFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/")
//        ut.setDestinationFileName(saveFolderPath + "/BindingConfirmationSavedFile.pdf");
//        ut.mergeDocuments();
//        log.info "Merged Document Saved"
//        document.close();
//
////        finalFile(policyDataMapTest)
////        document.close();
//    }
}