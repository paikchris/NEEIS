package portal

class Producer {
    static isAimTable = true
    static aimPrimaryKey = 'ProducerID'
    static mysqlPrimaryKey = 'producerID'
    static columnMap = [
            "producerID": "ProducerID",
            "name": "Name",
            "statusID": "StatusID",
            "address1": "Address1",
            "address2": "Address2",
            "city": "City",
            "state": "State",
            "zip": "Zip",
            "phone": "Phone",
            "fax": "Fax",
            "acctRep": "Account_RepID",
            "mktRepID": "MktRepID",
            "commission": "Commission",
            "tax1099": "Tax1099",
            "email": "EMail",
            "license": "License",
            "mailAddress1": "MailAddress1",
            "mailAddress2": "MailAddress2",
            "mailCity": "MailCity",
            "mailState": "MailState",
            "mailZip": "MailZip",
            "website": "WebSite",
            "activeFlag": "ActiveFlag",
            "billToParent": "BillToParent",
            "comment": "Comment",
            "acctgAddress1": "AcctgAddress1",
            "acctgAddress2": "AcctgAddress2",
            "acctgCity": "AcctgCity",
            "acctgState": "AcctgState",
            "acctgZip": "AcctgZip",
            "acctgPhone": "AcctgPhone",
            "acctgFax": "AcctgFax",
            "acctgEmail": "AcctgEMail",
            "acctgContactKeyFK": "AcctgContactKey_FK",
            "csrID": "CsrID",
            "countyName": "CountyName"
    ]

    String producerID
    String name
    String statusID
    String address1
    String address2
    String city
    String state
    String zip
    String phone
    String fax
    String acctRep
    String mktRepID
    BigDecimal commission
    String tax1099
    String email
    String license
    String mailAddress1
    String mailAddress2
    String mailCity
    String mailState
    String mailZip
    String website
    String activeFlag
    String billToParent
    String comment
    String acctgAddress1
    String acctgAddress2
    String acctgCity
    String acctgState
    String acctgZip
    String acctgPhone
    String acctgFax
    String acctgEmail
    Integer acctgContactKeyFK
    String csrID
    String countyName
    Date licenseExpiration
    String eoPolicyNumber
    Date eoPolicyExpiration

    static constraints = {
        producerID unique: true
        name nullable: true, maxSize: 51
        statusID nullable: true, maxSize: 3
        address1 nullable: true, maxSize: 40
        address2 nullable: true, maxSize: 40
        city nullable: true, maxSize: 32
        state nullable: true, maxSize: 3
        zip nullable: true, maxSize: 12
        phone nullable: true, maxSize: 20
        fax nullable: true, maxSize: 20
        acctRep nullable: true, maxSize: 15
        mktRepID nullable: true, maxSize: 15
        commission nullable: true, scale: 4, maxSize:32
        tax1099 nullable: true, maxSize: 1
        email nullable: true, maxSize: 128
        license nullable:true, maxSize: 25
        mailAddress1 nullable: true, maxSize: 40
        mailAddress2 nullable: true, maxSize: 40
        mailCity nullable: true, maxSize: 32
        mailState nullable: true, maxSize: 3
        mailZip nullable: true, maxSize: 12
        website nullable: true, maxSize: 128
        activeFlag nullable: true, maxSize: 1
        billToParent nullable: true, maxSize: 1
        comment nullable: true
        acctgAddress1 nullable: true, maxSize: 40
        acctgAddress2 nullable: true, maxSize: 40
        acctgCity nullable: true, maxSize: 32
        acctgState nullable: true, maxSize: 3
        acctgZip nullable: true, maxSize: 12
        acctgPhone nullable: true, maxSize: 20
        acctgFax nullable: true, maxSize: 20
        acctgEmail nullable: true, maxSize: 128
        acctgContactKeyFK nullable: true, maxSize: 128
        csrID nullable: true, maxSize: 15
        countyName nullable: true, maxSize: 30
        licenseExpiration nullable: true
        eoPolicyNumber nullable: true
        eoPolicyExpiration nullable: true
    }

    static mapping = {
        comment type: 'text'
    }

    // form needs to display value of expiration dates

    def needsInfoUpdate() {
        def needsUpdate = false;
        def attributesToCheck = [this.mailAddress1, this.mailCity, this.mailZip, this.phone, this.eoPolicyNumber, this.licenseExpiration, this.eoPolicyExpiration].toArray()
        attributesToCheck.any { !it }
    }

}
