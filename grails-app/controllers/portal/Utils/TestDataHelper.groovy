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

class TestDataHelper {
    def saveParams(identifier, params){
        def d = new portal.DataRaw(identifier: identifier, params: params)
        d.save(flush: true, failOnError: true)
        log.info "TEST DATA LOGGED"

        return d;
    }


}
