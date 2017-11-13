package portal.DAO

import grails.util.Environment
import java.io.IOException;
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

class PdfBox {
    def pdfService
    def pdf

    def createDoc(policyDataMapTest, pdfEndorsements) {
        // Loads file
        def templatePath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/docs/coverPage.pdf")
        File file = new File(templatePath);
        PDDocument document = PDDocument.load(file);
        PDDocumentCatalog pdCatalog = document.getDocumentCatalog();
        PDAcroForm pdAcroForm = pdCatalog.getAcroForm();
        PDFMergerUtility ut = new PDFMergerUtility();
        ut.addSource(file);

        pdfEndorsements.each {
//        SET UP A COUNT AND SEND ARRAY OF ENDORSEMENT NUMBERS TO REPLACE pdfBoxTest / REPEAT addSource(path+endorsementNumber+".pdf"
            def endorsementFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/docs/" + it + ".pdf")
            log.info endorsementFolderPath
            ut.addSource(endorsementFolderPath);
        }
// Save the NEWLY created document
//       Save merged pdf file
        def saveFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/")
        ut.setDestinationFileName(saveFolderPath + "testMergedFile.pdf");
        ut.mergeDocuments();
        log.info "Merged Document Saved"
        document.close();

        finalFile(policyDataMapTest)
        document.close();
    }

    def finalFile(policyDataMapTest) {

        def finalTemplatePath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temptestMergedFile.pdf")
        File finalFile = new File(finalTemplatePath);
        PDDocument document = PDDocument.load(finalFile);
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

        def finalSaveFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/")
        document.save(finalSaveFolderPath + "FINALtestMergedFile.pdf");
        document.close();
    }

    def createCert(){
        // Loads file
        def templatePath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/certificateTemp.pdf")
        File file = new File(templatePath);
        PDDocument document = PDDocument.load(file);
        PDDocumentCatalog pdCatalog = document.getDocumentCatalog();
        PDAcroForm pdAcroForm = pdCatalog.getAcroForm();
        PDFMergerUtility ut = new PDFMergerUtility();
        ut.addSource(file);

        def additionalInsuredPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/certificateAdditionalInsuredTemp.pdf")
        additonalInsuredFile = new File(additionalInsuredPath);
        document = PDDocument.load(additonalInsuredFile);
        ut.addSource(additonalInsuredFile);


//        pdfEndorsements.each {
////        SET UP A COUNT AND SEND ARRAY OF ENDORSEMENT NUMBERS TO REPLACE pdfBoxTest / REPEAT addSource(path+endorsementNumber+".pdf"
//            def endorsementFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/docs/" + it + ".pdf")
//            log.info endorsementFolderPath
//        }
// Save the NEWLY created document
//       Save merged pdf file
        def saveFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp/certificateTempSaved.pdf")
        ut.setDestinationFileName(saveFolderPath + "testMergedFile.pdf");
        ut.mergeDocuments();
        log.info "Merged Document Saved"
        document.close();

//        finalFile(policyDataMapTest)
//        document.close();
    }
}