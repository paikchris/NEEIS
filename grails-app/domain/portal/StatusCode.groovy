package portal

class StatusCode {
    static isAimTable = true
    static aimPrimaryKey = 'StatusID'
    static mysqlPrimaryKey = 'statusID'
    static columnMap = [
            "statusID": "StatusID",
            "description": "Description",
            "transDecript": "TransDecript",
            "document": "Document",
            "suspense": "Suspense",
            "systemReq": "SystemReq",
            "categoryID": "CategoryID",
            "documentID": "DocumentID",
            "statusDisplay": "StatusDisplay",
            "createdByID": "CreatedByID",
            "comments": "Comments",
            "activeFlag": "ActiveFlag"
    ]

    String statusID
    String description
    String transDecript
    String document
    String suspense
    String systemReq
    String categoryID
    String documentID
    String statusDisplay
    String createdByID
    String comments
    String activeFlag

    static constraints = {
        statusID unique:true, maxSize: 3
        description nullable:true, maxSize: 45
        transDecript nullable:true, maxSize: 55
        document nullable:true, maxSize: 8
        suspense nullable:true, maxSize: 1
        systemReq nullable:true, maxSize: 1
        categoryID nullable:true, maxSize: 3
        documentID nullable:true, maxSize: 15
        statusDisplay nullable:true, maxSize: 19
        createdByID nullable:true, maxSize: 15
        comments nullable:true
        activeFlag nullable:true, maxSize: 3
    }

    static mapping = {
        comments type: 'text'
    }
}
