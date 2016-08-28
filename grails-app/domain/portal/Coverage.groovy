package portal

class Coverage {

    String coverageCode
    String coverageName;
    String bindingAuthority;

    static constraints = {
        coverageName(unique:true)
        coverageCode(unique:true)
        bindingAuthority(nullable: true)
    }
}
