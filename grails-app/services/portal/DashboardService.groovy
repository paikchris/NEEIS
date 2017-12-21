package portal

import grails.transaction.Transactional

@Transactional
class DashboardService {
    def utilService


//UNDERWRITER DASHBOARD SUBMISSION TABLE Lists MYSQL Sumbissions table results / packaged as JSON Object / returned to MainController
    def getUnderwriterDashboardTableRows() {
//        log.info "SUBMISSION TABLE ROWS"
//        log.info params

        List <Submissions> submissionsResults = Submissions.list()
        String submissions = utilService.gormResultsToJSObject(submissionsResults)

//        log.info submissions
        return submissions
    }
}
