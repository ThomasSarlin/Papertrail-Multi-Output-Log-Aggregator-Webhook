import nodemailer from 'nodemailer';
import { SMTPEmailAddress, SMTPTargetEmailAdress, SMTPPassword, SMTPServer } from '../environment_variables.js';

let nodemailerTransporter = null;

const EmailService = {
    init: () => {
        if(!!SMTPServer && !!SMTPEmailAddress && !!SMTPPassword && !!SMTPTargetEmailAdress) {
            nodemailerTransporter = nodemailer.createTransport({
                host: SMTPServer,
                port: 587,
                secure: false,
                auth: {
                    user: SMTPEmailAddress,
                    pass: SMTPPassword
                }
            });
        }
    },
    sendMail: (message) => {
        return nodemailerTransporter.sendMail({
            from: SMTPEmailAddress,
            to: SMTPTargetEmailAdress,
            subject: 'Aggreagated Papertrail webhook logs',
            text: message
        });
    },
    isAvailable: () => {
        return !!nodemailerTransporter;
    }
}






export { EmailService }
