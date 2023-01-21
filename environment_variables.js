
import dotEnv from "dotenv";
dotEnv.config();

export const PORT = process.env.PORT;

/**
 * Slack dependant variables, defined in .env or specified here.
 */

export const SLACKToken = process.env.SLACK_TOKEN;
export const SLACKChannel = process.env.SLACK_CHANNEL;



/**
 * Email (SMTP) dependant variables, defined in .env or specified here.
 */

export const SMTPServer = process.env.SMTP_SERVER;
export const SMTPUser = process.env.SMTP_USER;
export const SMTPPassword = process.env.SMTP_PASSWORD;
export const SMTPTargetEmailAdress = process.env.SMTP_TARGET_EMAIL_ADRESS;
export const SMTPEmailAddress = process.env.SMTP_EMAIL_ADDRESS;
