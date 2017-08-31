package portal

class Coverages {
    static isAimTable = true
    static aimPrimaryKey = 'CoverageID'
    static mysqlPrimaryKey = 'coverageCode'
    static columnMap = [
            'coverageCode' : 'CoverageID',
            'coverageName': 'Description',
            'activeFlag': 'ActiveFlag',
            'listTypeID': 'ListTypeID'
    ]

    String coverageCode
    String coverageName
    String activeFlag
    String listTypeID //B = Both, C = Coverage Drop Down Only, L = LOB Drop Down Only
    String coverageOffered
    Integer coverageOfferedDisplayOrder

    static constraints = {
        coverageCode unique:true, maxSize: 6, validator:{ it.toUpperCase() == it }

        coverageName maxSize: 55

        activeFlag maxSize: 1, inList: ["N", "Y"], validator:{ it.toUpperCase() == it }

        coverageOffered maxSize: 1, inList: ["N", "Y"], validator:{ it.toUpperCase() == it }

        coverageOfferedDisplayOrder nullable: true

        listTypeID nullable: true, maxSize: 1, validator:{ it.toUpperCase() == it }, inList: ["B", "C", "L", null]
    }



}
