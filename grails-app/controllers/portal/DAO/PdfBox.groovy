package portal.DAO

import grails.util.Environment
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;

class PdfBox {
    def pdf

    def createDoc() {
    //Creating PDF document object
        PDDocument document = new PDDocument();

        def tempFolderPath = org.codehaus.groovy.grails.web.context.ServletContextHolder.getServletContext().getRealPath("/attachments/temp")
        //Saving the document
        document.save(tempFolderPath);

        log.info "PDF created"

        //Closing the document
        document.close();
    }

}
