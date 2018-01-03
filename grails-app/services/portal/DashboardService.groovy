package portal

import grails.transaction.Transactional
import groovy.json.JsonOutput

@Transactional
class DashboardService {
    def utilService
    def aimSqlService
    def jsonOutput = new JsonOutput()



    def getUnderwriterDashboardTableRows() {
//        log.info "SUBMISSION TABLE ROWS"
//        log.info params

        List <Submissions> submissionsResults = Submissions.list()
        String submissions = utilService.gormResultsToJSObject(submissionsResults)

//        log.info submissions
        return submissions
    }

    def getSubmissionPremiumDataGraph(){

        def aimSQLSubmissions = aimSqlService.aimSelectQuery("SELECT Received, BndPremium, StatusID FROM Quote WHERE Received >= '1/1/2010' ORDER BY Received ASC")
//        SUM(BndPremium) AS MonthlyPremiumTotal
//        from Quote
//        where (StatusID = 'BIF' or StatusID = 'PIF' or StatusID = 'ACK') and (MONTH(Received) = 4 AND YEAR(Received) = 2009)

        String aimSQLSubmissionString = jsonOutput.toJson(aimSQLSubmissions)
        log.info aimSQLSubmissionString
        return aimSQLSubmissionString

    }
}
