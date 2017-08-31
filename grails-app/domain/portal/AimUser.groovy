package portal

class AimUser {
    static isAimTable = true
    static aimPrimaryKey = 'UserID'
    static mysqlPrimaryKey = 'userID'
    static columnMap = [
            "userID": "UserID",
            "name": "Name",
            "statusID": "StatusID",
            "authority": "Authority",
            "teamID": "TeamID",
            "divisionID": "DivisionID",
            "workPhone": "Wk_Phone",
            "workFax": "Wk_Fax",
            "email": "EMail",
            "activeFlag": "ActiveFlag",
            "title": "Title",
            "createdByID": "CreatedByID",
            "acctExecFlag": "AcctExecFlag",
            "mktRepFlag": "MktRepFlag"
    ]

    String userID
    String name
    String teamID
    String divisionID
    String workPhone
    String workFax
    String email
    Short authority
    String statusID
    String title
    String acctExecFlag
    String mktRepFlag
    String activeFlag
    String createdByID


    static constraints = {
        userID unique: true, maxSize: 8
        name nullable: true, maxSize: 35
        statusID nullable: true, maxSize: 3
        authority nullable: true, maxSize: 10
        teamID nullable: true, maxSize: 8
        divisionID nullable: true, maxSize: 8
        workPhone nullable: true, maxSize: 20
        workFax nullable: true, maxSize: 20
        email nullable: true, maxSize: 128
        title nullable: true, maxSize: 55
        acctExecFlag nullable: true, maxSize: 1
        mktRepFlag nullable: true, maxSize: 1
        activeFlag nullable: true, maxSize: 1
        createdByID nullable: true, maxSize: 15
    }
}
