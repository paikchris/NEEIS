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
    }
}
