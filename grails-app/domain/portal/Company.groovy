package portal

class Company {
    static isAimTable = true
    static aimPrimaryKey = 'CompanyID'
    static mysqlPrimaryKey = 'companyID'
    static columnMap = [
            "companyID": "CompanyID",
            "name": "Name",
            "address1": "Address1",
            "address2": "Address2",
            "city": "City",
            "state":"State",
            "zipcode": "Zip",
            "phone": "Phone",
            "fax": "Fax",
            "parentCompID":"ParentCompID",
            "naic":"NAIC",
            "license":"License",
            "type": "Type",
            "statusID": "StatusID",
            "billCompanyID":"BillCompanyID",
            "activeFlag": "ActiveFlag",
            "mailAddress1": "MailAddress1",
            "mailAddress2": "MailAddress2",
            "mailCity": "MailCity",
            "mailState": "MailState",
            "mailZip": "MailZip",
            "flagMarket": "FlagMarket",
            "flagRisk": "FlagRisk",
            "comment": "Comment",
            "website": "WebSite",
            "acctgAddress1": "AcctgAddress1",
            "acctgAddress2": "AcctgAddress2",
            "acctgCity": "AcctgCity",
            "acctgState": "AcctgState",
            "acctgZip": "AcctgZip"
    ]

    String companyID
    String name
    String address1
    String address2
    String city
    String state
    String zipcode
    String phone
    String fax
    String parentCompID
    String naic
    String license
    String type
    String statusID
    String billCompanyID
    String activeFlag
    String mailAddress1
    String mailAddress2
    String mailCity
    String mailState
    String mailZip
    String flagMarket
    String flagRisk
    String comment
    String website
    String acctgAddress1
    String acctgAddress2
    String acctgCity
    String acctgState
    String acctgZip



    static constraints = {
        companyID unique: true, maxSize: 8
        name nullable: false, maxSize: 51
        address1 nullable: true, maxSize: 40
        address2 nullable: true, maxSize: 40
        city nullable: true, maxSize: 32
        state nullable: true, maxSize: 3
        zipcode nullable: true, maxSize: 12
        phone nullable: true, maxSize: 20
        fax nullable: true, maxSize: 20
        parentCompID nullable: true, maxSize: 8
        naic nullable: true, maxSize: 9
        license nullable: true, maxSize: 25
        type nullable: true, maxSize: 3
        statusID nullable: true, maxSize: 3
        billCompanyID nullable:true, maxSize: 8
        activeFlag nullable: true, maxSize: 1
        mailAddress1 nullable: true, maxSize: 40
        mailAddress2 nullable: true, maxSize: 40
        mailCity nullable: true, maxSize: 32
        mailState nullable: true, maxSize: 3
        mailZip nullable: true, maxSize: 12
        flagMarket nullable: true, maxSize: 1
        flagRisk nullable: true, maxSize: 1
        comment nullable: true
        website nullable: true, maxSize: 128
        acctgAddress1 nullable: true, maxSize: 40
        acctgAddress2 nullable: true, maxSize: 40
        acctgCity nullable: true, maxSize: 32
        acctgState nullable: true, maxSize: 3
        acctgZip nullable: true, maxSize: 12
    }

    static mapping = {
        comment type: 'text'
    }
}




