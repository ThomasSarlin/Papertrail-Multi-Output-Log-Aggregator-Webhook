
import express from "express";
import bodyParser from "body-parser";
import { groupPaperTrailEventsByMessage, sortPaperTrailEventEntries, formatLogRowFromEvent } from "./utils/utils.js";

import { SlackService } from "./services/slack.service.js";
import { EmailService } from "./services/email.service.js";
import { PORT } from './environment_variables.js';
const app = express();

const STATUS = {
    OK: 200,
    BAD_REQUEST: 400
}

app.use(bodyParser.json());

SlackService.init();
EmailService.init();

app.post('/submit', (req, res) => {
    const events = req.body.payload.events;

    let message = '';
    let status = STATUS.OK;

    if(!events || !req.body.payload){
        message = 'Bad Request';
        status = STATUS.BAD_REQUEST;
    }
    else if (events.length === 0) {
        message = 'No event-logs available';
    }
    else {
        let eventLogAggregations = events.reduce(groupPaperTrailEventsByMessage, {});
        eventLogAggregations = Object.entries(eventLogAggregations).sort(sortPaperTrailEventEntries);

        if(req.body.payload.saved_search.name){
            message = `Aggregated result of your search "${req.body.payload.saved_search.name}":\n`;
        }

        message = message + eventGroups.map(formatLogRowFromEvent).join('\n');
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

