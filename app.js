
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

    if(!req.body.events || !req.body.payload.events)
        return res.status(STATUS.BAD_REQUEST).send('Bad request');

    const events = req.body.events || req.body.payload.events;
    const searchName = req.body.saved_search.name || req.body.payload.saved_search.name;

    let message = getMessageFromEventLogs(events, searchName);

    if(SlackService.isAvailable())
        SlackService.sendSlackMessage(message)
            .catch(err => console.error(err));

    if(EmailService.isAvailable())
        EmailService.sendMail(message)
            .catch(err => console.error(err));

    return res.status(STATUS.OK).send(message);
})



app.listen(PORT, () => console.log(`Papertrail Log Aggregator Webhook service running on ${PORT}, submit payloads to '/submit'`));

