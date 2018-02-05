package portal

class NotificationCodes {
    String code
    String displayText

    static constraints = {
        code unique:true, nullable:false
        displayText nullable: false
    }

    static mapping = {
    }

}