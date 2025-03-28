const sender = require('../config/email-config');
const { EMAIL_ID } = require('../config/serverConfig');
const TicketRepository = require('../repository/ticket-repository');

const repo = new TicketRepository();
const sendBasicEmail = async (mailTo, mailSubject, mailBody) =>{
    try {
        const response = sender.sendMail({
            from : EMAIL_ID,
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

const SubscribeEvents = async (payload)=>{
    let service = payload.service;
    let data = payload.data;
    console.log(payload.data);
    switch(service){
        case 'CREATE_TICKET' :
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL' :
            await sendBasicEmail(data.recepientEmail, data.subject, data.content);
            break;
        default :
            console.log('No valid event received');
            break;
    }
    
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    SubscribeEvents
}
/**
 * SMTP --> a@b.com
 * receive --> d@e.com
 * 
 * from:- support@nauti.com
 *  
 */