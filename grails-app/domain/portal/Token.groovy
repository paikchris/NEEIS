package portal
import java.util.UUID
 
class Token {
    String email
    String value = UUID.randomUUID().toString().replaceAll('-', '')
    Date expirationDate = new Date().plus(1)
 
    static mapping = {
    	table 'tokens'
    }
 
    static constraints = {
    }

    def isActive() {
    	Date today = new Date();
    	today < expirationDate;
    }

}