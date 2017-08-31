package portal

class ProductRates {

    String productRateID
    String productRateName
    String productRate
    String productID

    static constraints = {
        productRateID(unique:true)
        productRateName nullable:true
        productRate nullable:true
        productID nullable:true
    }
}