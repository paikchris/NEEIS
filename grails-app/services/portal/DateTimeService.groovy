package portal

import grails.transaction.Transactional
import grails.util.Holders

import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

@Transactional
class DateTimeService {
    def grailsApplication = Holders.grailsApplication

    ZoneId neeisTimeZone = ZoneId.of(grailsApplication.config.grails.neeisTimeZone)
    DateTimeFormatter standardDateTime = DateTimeFormatter.ofPattern("yyyy/MM/dd h:mm:ss a")
    ZonedDateTime neeisDateTime

//    DateTimeService(){
//
//    }

    def getNeeisLocalDateTime(){
        neeisDateTime = ZonedDateTime.of(LocalDateTime.now(), neeisTimeZone )


        return neeisDateTime.format(standardDateTime)
    }
}
