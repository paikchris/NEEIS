package portal

class FormsController {

    def beforeInterceptor = [action: this.&checkUser]


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



    def specFilm() {

    }

    def specFilmNew() {

    }

    def specialEventLiability(){

    }

    def specialEventVendor(){

    }
    def entertainerForm() {

    }

    def office() {

    }

    def shellCorp() {

    }
    
    def otherForm(){
        log.info "DELIVER OTHER FORM"
        log.info params
    }

    def blanketFilmProduction(){
        
    }

    def rate(){
        log.info("RATING SUBMISSION")
        log.info(params);

       

        render "good"

    }
}
