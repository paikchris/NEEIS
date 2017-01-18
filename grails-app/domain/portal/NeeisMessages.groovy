package portal

class NeeisMessages {

    String subject
    String messageType //firstMessage, replyMessage,
    String body
    String sender
    String recipient
    String sentDateTime
    String attachments

    String replyTo
    Integer messagesInChain
    Integer messageChainID
    String unread






    static constraints = {
//        htmlID(unique:true)

        subject nullable:true
        attachments nullable:true
        replyTo nullable:true
        body nullable:true

    }
}