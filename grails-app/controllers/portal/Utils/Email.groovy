package portal.Utils

class Email {

    // emails to brokers
//    Submission of new policy received by underwriter from Broker
    def sendMessage(mailService, eMap){
        mailService.sendMail {
            to "${eMap.brokerEmail}"
            cc "johnkimsinbox@gmail.com"
            subject "${eMap.nameOfInsured} ${eMap.submissionID}"
            body "This is a notification to acknowledge that your submission has been received" +
                    "\n" +
                    "\n" +
                    "New Empire Online Underwriting Department\n" +
                    "\n" +
                    "\n" +
                    "Lic No 0G13492\n" +
                    "1216 Hermosa Avenue, Suite A\n" +
                    "Hermosa Beach, CA 90254\n" +
                    "\n" +
                    "Tel Line: (310) 265-3800\n" +
                    "Fax Line: (310) 265-3805\n" +
                    "service@neeis.com\n" +
                    "www.neeis.com\n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    "This communication (including any attachments) may contain privileged or confidential information intended for a specific individual and purpose,  and is protected by law.  If you are not the intended recipient, you should delete this communication and/or shred the materials and any attachments and are hereby notified that any disclosure, copying, or distribution of this communication, or the taking of any action based on it, is strictly prohibited.\n"
        }
    }
//    Submission for approval received by underwriter from Broker
    def sendMessageApproval(mailService, eMap){
        mailService.sendMail {
            to "${eMap.brokerEmail}"
            subject "${eMap.nameOfInsured} ${eMap.submissionID}"
            body "This is a notification to acknowledge that your request for approval has been received" +
                    "\n" +
                    "\n" +
                    "New Empire Online Underwriting Department\n" +
                    "\n" +
                    "\n" +
                    "Lic No 0G13492\n" +
                    "1216 Hermosa Avenue, Suite A\n" +
                    "Hermosa Beach, CA 90254\n" +
                    "\n" +
                    "Tel Line: (310) 265-3800\n" +
                    "Fax Line: (310) 265-3805\n" +
                    "service@neeis.com\n" +
                    "www.neeis.com\n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    "This communication (including any attachments) may contain privileged or confidential information intended for a specific individual and purpose,  and is protected by law.  If you are not the intended recipient, you should delete this communication and/or shred the materials and any attachments and are hereby notified that any disclosure, copying, or distribution of this communication, or the taking of any action based on it, is strictly prohibited.\n"
        }
    }
//    Submission for binding received by underwriter from Broker
    def sendMessageRequest(mailService, eMap){
        mailService.sendMail {
            to "${eMap.brokerEmail}"
            subject "${eMap.nameOfInsured} ${eMap.submissionID}"
            body "This is a notification to acknowledge that your request to bind has been received" +
                    "\n" +
                    "\n" +
                    "New Empire Online Underwriting Department\n" +
                    "\n" +
                    "\n" +
                    "Lic No 0G13492\n" +
                    "1216 Hermosa Avenue, Suite A\n" +
                    "Hermosa Beach, CA 90254\n" +
                    "\n" +
                    "Tel Line: (310) 265-3800\n" +
                    "Fax Line: (310) 265-3805\n" +
                    "service@neeis.com\n" +
                    "www.neeis.com\n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    "This communication (including any attachments) may contain privileged or confidential information intended for a specific individual and purpose,  and is protected by law.  If you are not the intended recipient, you should delete this communication and/or shred the materials and any attachments and are hereby notified that any disclosure, copying, or distribution of this communication, or the taking of any action based on it, is strictly prohibited.\n"
        }
    }


    //emails to underwriters
//    Notice of new policy submission received by Broker from underwriter
    def sendMessageNotice(mailService, eMap){
        mailService.sendMail {
            to "${eMap.underwriterEmail}"
            subject "${eMap.nameOfInsured} ${eMap.submissionID}"
            body "A submission has been created online" +
                    "\n ${eMap.brokerName}" +
                    "\n ${eMap.brokerPhone}" +
                    "\n ${eMap.brokerEmail}" +
                    "\n ${eMap.brokerAgency}" +
                    "\n" +
                    "\n" +
                    "New Empire Online Underwriting Department\n" +
                    "\n" +
                    "\n" +
                    "Lic No 0G13492\n" +
                    "1216 Hermosa Avenue, Suite A\n" +
                    "Hermosa Beach, CA 90254\n" +
                    "\n" +
                    "Tel Line: (310) 265-3800\n" +
                    "Fax Line: (310) 265-3805\n" +
                    "service@neeis.com\n" +
                    "www.neeis.com\n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    "This communication (including any attachments) may contain privileged or confidential information intended for a specific individual and purpose,  and is protected by law.  If you are not the intended recipient, you should delete this communication and/or shred the materials and any attachments and are hereby notified that any disclosure, copying, or distribution of this communication, or the taking of any action based on it, is strictly prohibited.\n"
        }
    }
//    Request for approval received from Broker to underwriter
    def sendMessageNoticeApproval(mailService, eMap){
        mailService.sendMail {
            to "${eMap.underwriterEmail}"
            subject "${eMap.nameOfInsured} ${eMap.submissionID}"
            body "Submission waiting for your approval" +
                    "\n ${eMap.brokerName}" +
                    "\n ${eMap.brokerPhone}" +
                    "\n ${eMap.brokerEmail}" +
                    "\n ${eMap.brokerAgency}" +
                    "\n" +
                    "\n" +
                    "New Empire Online Underwriting Department\n" +
                    "\n" +
                    "\n" +
                    "Lic No 0G13492\n" +
                    "1216 Hermosa Avenue, Suite A\n" +
                    "Hermosa Beach, CA 90254\n" +
                    "\n" +
                    "Tel Line: (310) 265-3800\n" +
                    "Fax Line: (310) 265-3805\n" +
                    "service@neeis.com\n" +
                    "www.neeis.com\n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    "This communication (including any attachments) may contain privileged or confidential information intended for a specific individual and purpose,  and is protected by law.  If you are not the intended recipient, you should delete this communication and/or shred the materials and any attachments and are hereby notified that any disclosure, copying, or distribution of this communication, or the taking of any action based on it, is strictly prohibited.\n"
        }
    }
//    Request for binding received from Broker to underwriter
    def sendMessageNoticeRequest(mailService, eMap){
        mailService.sendMail {
            to "${eMap.underwriterEmail}"
            subject "${eMap.nameOfInsured} ${eMap.submissionID}"
            body "Submission waiting for your approval to bind" +
                    "\n ${eMap.brokerName}" +
                    "\n ${eMap.brokerPhone}" +
                    "\n ${eMap.brokerEmail}" +
                    "\n ${eMap.brokerAgency}" +
                    "\n" +
                    "\n" +
                    "New Empire Online Underwriting Department\n" +
                    "\n" +
                    "\n" +
                    "Lic No 0G13492\n" +
                    "1216 Hermosa Avenue, Suite A\n" +
                    "Hermosa Beach, CA 90254\n" +
                    "\n" +
                    "Tel Line: (310) 265-3800\n" +
                    "Fax Line: (310) 265-3805\n" +
                    "service@neeis.com\n" +
                    "www.neeis.com\n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    "This communication (including any attachments) may contain privileged or confidential information intended for a specific individual and purpose,  and is protected by law.  If you are not the intended recipient, you should delete this communication and/or shred the materials and any attachments and are hereby notified that any disclosure, copying, or distribution of this communication, or the taking of any action based on it, is strictly prohibited.\n"
        }
    }

//    BOR CONFLICT EMAIL
    def sendBorConflict(mailService, eMap) {
        mailService.sendMail {
            to "${eMap.brokerEmail}"
            cc "jason@neeis.com"
            subject "NEEIS-Website Submission RE:" + "${eMap.nameOfInsured} ${eMap.submissionID}"
            body "Dear NEEIS;\n" +
                    "Thank you for your interest in doing business with New Empire Entertainment.\n" +
                    "NEW SUBMISSION:\n" +
                    "\n" +
                    "She's A Movement Media Group, \n" +
                    "LLC89 Mangum St SW #305\n" +
                    "Atlanta, GA 30313\n" +
                    "\n" +
                    "OPERATIONS: Film Producer - Specific Film with Title\n" +
                    "Your submission had a conflict with another submission. We will investigate and correct the conflict ASAP.\n" +
                    "Once this conflict is corrected, you will receive an email alerting you of the change in status.\n" +
                    "You will not be able to obtain any quotes or indications until this conflict is resolved.\n" +
                    "If I may be of any further assistance, please contact me\n" +
                    "\n" +
                    "\n" +
                    "Jason DeBolt\n" +
                    "jason@neeis.com\n" +
                    "310 265-3804\n" +
                    "www.neeis.com"
        }
    }

}