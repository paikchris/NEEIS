package portal

class Forms {

    String formName
    String formID

    static constraints = {
        formID(unique:true)
    }
}