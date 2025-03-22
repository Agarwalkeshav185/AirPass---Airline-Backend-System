const sender = require('../config/email-config');

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) =>{
    try {
        const response = sender.sendMail({
            from :mailFrom, 
            to : mailTo,
            subject : mailSubject,
            text : mailBody 
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendBasicEmail,

}
/**
 * SMTP --> a@b.com
 * receive --> d@e.com
 * 
 * from:- support@nauti.com
 *  
 */