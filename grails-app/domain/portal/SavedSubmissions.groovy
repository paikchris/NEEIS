package portal

class SavedSubmissions {

    String saveName
    Integer user
    Date saveDateTime
    String autosaveFlag
    String saveData





    static constraints = {
        saveData(maxSize: 18000)
    }
}