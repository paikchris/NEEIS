package portal

class User {

    String firstName
    String lastName
    String company
    String email
    String password
    String userRole
    String phoneNumber


    String toString(){
        "$email"
    }

    static constraints = {
        email(email:true, unique:true)
        password(blank:true, password:true)
        userRole(role:true)

        company nullable:true
    }
}
