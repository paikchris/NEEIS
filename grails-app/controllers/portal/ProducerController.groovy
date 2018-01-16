package portal

import groovy.sql.Sql
import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.URLENC
import portal.DAO.*

class ProducerController {

    def dataSource_aim
    def bcryptService
    AIMSQL aimDAO = new AIMSQL();
    def timeZone = TimeZone.getTimeZone('PST')
    def dateFormat = 'yyyy-MM-dd HH:mm:ss.SSS'

    def update() {
        log.info("update action entered...");
        def producer = Producer.findByProducerID(session.user.company);
        try{
            def aimsql = new Sql(dataSource_aim)

            def now = new Date()
            def timestamp = now.format(dateFormat, timeZone)
            log.info("begin aimsql.execute update");
            log.info(params);
            aimsql.withTransaction {
                aimsql.execute "UPDATE Producer\n" +
                    "SET LicenseExpiration = '${params.agencyLicenseExpiration}',\n" +
                    "EO_PolicyID = '${params.agencyEOPolicy}',\n" +
                    "EO_Expiration = '${params.agencyEOPolicyExpiration}',\n" +
                    "Phone = '${params.agencyPhoneNumber}',\n" +
                    "Address1 = '${params.agencyStreet}',\n" +
                    "City = '${params.agencyCity}',\n" +
                    "Zip = '${params.agencyZipCode}'\n" +
                    "where ProducerID = '${session.user.company}';"
                log.info("ending aim execute. begin aim commit.")
                aimsql.commit();
                log.info("ending aim commit");
            }
        }
        catch(Exception e){
            log.info("exception caught: " + e);
            redirect(controller:'main', action:'index', params: [registerError: "Update failed."]);
        }

        producer.licenseExpiration = Date.parse("yyyy/MM/dd", params.agencyLicenseExpiration).clearTime();
        producer.eoPolicyExpiration = Date.parse("yyyy/MM/dd", params.agencyEOPolicyExpiration).clearTime();
        producer.eoPolicyNumber = params.agencyEOPolicy;
        producer.phone = params.agencyPhoneNumber;
        producer.address1 = params.agencyStreet;
        producer.city = params.agencyCity;
        producer.zip = params.agencyZipCode;
        producer.save(flush:true);
        render "Agency info updated.";
    }
}      
