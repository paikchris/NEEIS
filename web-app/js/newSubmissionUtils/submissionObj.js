function Submission1(){
    this.operationID = function(){ return getSelectedOperationID() }
    this.coverages = function(){ return getCoveragesSelectedArray() }
    this.products = function(){ return getProductsSelectedArray() }
    this.coveragesAndProducts = function(){ return buildCoverageAndProductSelectedMap() }

    
    this.getObject = function() {
        var n = {}

        for(var i=0; i < Object.keys(this).length; i++){
            var propertyName = Object.keys(this)[i]

            if(propertyName === 'getObject'){
                //SKIP SELF
            }
            else if (typeof this[propertyName] === "function" ) {
                n[propertyName] = this[propertyName]()
            }
            else{
                n[propertyName] = this[propertyName]
            }
        }

        return n
    }

}