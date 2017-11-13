package portal

class User {

    String firstName
    String lastName
    String company
    String email
    String password
    String userRole
    String phoneNumber
    String defaultUnderwriter
    String admin
    String aimContactID //
    String autoSaveData
    String notificationMap


    String toString(){
        "$email"
    }

    static constraints = {
        email(email:true, unique:true)
        password(blank:true, password:true)
        userRole(role:true)
        defaultUnderwriter(nullable:true)
        company nullable:true
        phoneNumber nullable:true
        admin nullable:true
        aimContactID nullable:true
        autoSaveData nullable:true
        notificationMap nullable:true
    }

    static mapping = {
        notificationMap type: 'text'
    }

}
