import nodemailer from 'nodemailer';
import { SMTPEmailAddress, SMTPTargetEmailAdress, SMTPPassword, SMTPServer } from '../environment_variables.js';

let nodemailerTransporter = null;

const EmailService = {
    init: async () => {
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

            return await nodemailerTransporter.verify().then(() => {
                console.log('[[----Email Service is ONLINE!----]]');
            }).catch(err => {
                nodemailerTransporter = null;
                console.log('[[----Email Service OFFLINE----]], SMTP verification returned the following error:'+ err);
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
