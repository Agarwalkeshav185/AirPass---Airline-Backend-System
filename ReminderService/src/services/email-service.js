const sender = require('../config/email-config');
const TicketRepository = require('../repository/ticket-repository');

const repo = new TicketRepository();
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

const fetchPendingEmails = async (timeStamp) =>{
    try {
        const response = await repo.get({status : "PENDING"});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) =>{
    try {
        const ticket = await repo.create(data);
        return ticket;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateTicket = async(ticketId, data) =>{
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket
}
/**
 * SMTP --> a@b.com
 * receive --> d@e.com
 * 
 * from:- support@nauti.com
 *  
 */