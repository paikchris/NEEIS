package portal
import groovy.sql.Sql
import helper.Utils;

class MainController {

    def beforeInterceptor = [action: this.&checkUser]
    def dataSource_aim

    def checkUser() {
        println "CHECK USER"
        println params
        AuthController ac = new AuthController()
        def test = ac.check()

        //println "TEST WASSSSS " + session.user;

    }

    def index() {

        [user: session.user ]
    }



    def newSubmission() {
        String[] operationTypes = ["sldfj", "slifjsdlkjf"];

        def riskCategories = portal.RiskType.list().unique { it.riskTypeCategory }.riskTypeCategory; //Retrieves list of Risk Categories from Database
        riskCategories.removeAll([null])
        log.info("CATEGORIES========================")
        log.info(riskCategories.toString())

        def riskTypes = portal.RiskType.list();
        riskTypes.removeAll([null])
        log.info("TYPE========================")
        log.info(riskTypes.get(1).riskTypeName)

        def ancillaryRiskTypes = RiskType.findAllWhere(riskTypeCategory: "Ancillary Entertainment Risk");

        log.info ancillaryRiskTypes
        def venueRiskTypes = RiskType.findAllWhere(riskTypeCategory: "Venue");
        def filmRiskTypes = RiskType.findAllWhere(riskTypeCategory: "Film Producer");
        def entertainerRiskTypes = RiskType.findAllWhere(riskTypeCategory: "Entertainer");
        def officeRiskTypes = RiskType.findAllWhere(riskTypeCategory: "Office");
        def specialeventRiskTypes = RiskType.findAllWhere(riskTypeCategory: "Special Event");
        def shellcorpRiskTypes = RiskType.findAllWhere(riskTypeCategory: "Shell Corporation");

        def coverages = "";
        Sql sql = new Sql(dataSource_aim)
        sql.eachRow( 'select CoverageID, Description from Coverage' ) {
//            log.info "$it.Zip -- ${it.City} --"
            coverages = coverages + it.CoverageID + ":" + it.Description + ";"
        }

        def marketCompanyList = "";
        sql.eachRow( "select CompanyID, Name, DefaultRiskCompanyID from Company where FlagMarket ='Y' order by Name") {
//            log.info "$it.Zip -- ${it.City} --"
            marketCompanyList = marketCompanyList + it.CompanyID + ";&#;" + it.Name + ";&#;" + it.DefaultRiskCompanyID + ";&;"
        }

        def riskCompanyList = "";
        sql.eachRow( "select CompanyID, Name, DefaultRiskCompanyID from Company where FlagRisk ='Y' order by Name") {
//            log.info "$it.Zip -- ${it.City} --"
            riskCompanyList = riskCompanyList + it.CompanyID + "," + it.Name + "," + it.DefaultRiskCompanyID + ";"
        }




        [user: session.user, riskCategories:riskCategories, riskTypes:riskTypes, coverages:coverages, marketCompanyList: marketCompanyList
         , riskCompanyList:riskCompanyList, ancillaryRiskTypes: ancillaryRiskTypes, venueRiskTypes:venueRiskTypes, filmRiskTypes:filmRiskTypes, entertainerRiskTypes:entertainerRiskTypes,
        officeRiskTypes:officeRiskTypes, specialeventRiskTypes:specialeventRiskTypes, shellcorpRiskTypes:shellcorpRiskTypes]
    }




    def submitSubmission(){
        //METHOD TO HANDLE SUBMITTING ALL SUBMISSION INFO TO AIM
        //WILL REDIRECT TO FINISH PAGE AFTER
        log.info("SUBMITTING INFO TO AIM")
        log.info(params);



        //TESTING AIM SQL INSERT
        Sql sql = new Sql(dataSource_aim)
        String query = "Select * from ZipCode"

//        def results = sql.execute(query)
        sql.eachRow( 'select * from ZipCode' ) { log.info "$it.Zip -- ${it.City} --" }
        def zipcodeTest = '99999'
        sql.execute("insert into ZipCode (ZipCode) values (${zipcodeTest})")
//        log.info( results )

        log.info("Test Complete")
//        sql.execute('delete from ZipCode where word_id = ?' , [5])



        redirect(controller:'main', action:'index')
    }

    def checkNamedInsured(){
        log.info ("CHECKING NAMED INSURED")
        log.info (params)

        Sql aimsql = new Sql(dataSource_aim)
        def countP = 0;
        def countM =0;

        aimsql.eachRow( "SELECT * FROM dvSearchInsured_v2 WITH (NOLOCK) WHERE (NamedInsured LIKE '%" + params.checkName + "%')" +
                " AND (Zip = '" + params.zipCodeMailing + "')") {

            //LEVENSHTEIN ALGORITHM TO DETERMINE HOW ALIKE TWO STRINGS ARE
            int lfd = Utils.levenshteinDistance(params.checkName, it.NamedInsured)
            String s1 = params.checkName;
            String s2 = it.NamedInsured;
            double ratio = ((double) lfd) / (Math.max(s1.length(), s2.length()));

//            log.info params.checkName + " - " + "$it.NamedInsured" + " " + ratio;
            if(ratio <0.2){
                countM++
            }

        }
        aimsql.eachRow( "SELECT * FROM dvSearchInsured_v2 WITH (NOLOCK) WHERE (NamedInsured LIKE '%" + params.checkName + "%')" +
                " AND (Zip = '" + params.zipCodePhysical + "')") {
            //LEVENSHTEIN ALGORITHM TO DETERMINE HOW ALIKE TWO STRINGS ARE
            int lfd = Utils.levenshteinDistance(params.checkName, it.NamedInsured)
            String s1 = params.checkName;
            String s2 = it.NamedInsured;
            double ratio = ((double) lfd) / (Math.max(s1.length(), s2.length()));

//            log.info params.checkName + " - " + "$it.NamedInsured" + " " + ratio;
            if(ratio <0.2){
                countP++
            }
        }
         //Implement this later
        if(countM > countP){
            render countM
        }
        else{
            render countP
        }

    }
    def sandbox() {
        log.info ("sandbox")
        log.info (params)

        [user: session.user]
    }
}
