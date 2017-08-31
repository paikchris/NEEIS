package portal

class Email {

    String emailID
    String subjectID
    String bodyID

    static constraints = {
        emailID(unique: true)
        subjectID nullable: true
        bodyID nullable: true
    }
}