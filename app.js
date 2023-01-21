
import express from "express";
import bodyParser from "body-parser";

import { getMessageFromEventLogs } from "./utils/utils.js";
import { SlackService } from "./services/slack.service.js";
import { EmailService } from "./services/email.service.js";
import { PORT } from './environment_variables.js';

const STATUS = {
    OK: 200,
    BAD_REQUEST: 400
}


const app = express();
app.use(bodyParser.json());

SlackService.init();
EmailService.init();


app.post('/submit', (req, res) => {
    const events = req.body.payload.events;
    const searchName = req.body.payload.saved_search.name;

    let message = '';
    let status = STATUS.OK;

    if(!events || !req.body.payload){
        message = 'Bad Request';
        status = STATUS.BAD_REQUEST;
    }
    else if (events.length === 0) {
        message = `No event-logs available for your search ${searchName}`;
    }
    else {
        message = getMessageFromEventLogs(events, searchName);
    }

    if(status === STATUS.OK && SlackService.isAvailable())
        SlackService.sendSlackMessage(message)
            .catch(err => console.error(err));

    if(status === STATUS.OK && EmailService.isAvailable())
        EmailService.sendMail(message)
            .catch(err => console.error(err));

    return res.status(status).send({response: message});
})



app.listen(PORT, () => console.log(`Papertrail Log Aggregator Webhook service running on ${PORT}, submit payloads to '/submit'`));

