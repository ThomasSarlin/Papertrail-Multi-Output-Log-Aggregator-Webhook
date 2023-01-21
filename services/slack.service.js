import { WebClient } from '@slack/web-api';

import { SLACKToken, SLACKChannel } from '../environment_variables.js'

let slackWebClient = null;


const SlackService = {
    init: () => {
        if(!!SLACKToken && !!SLACKChannel){
            slackWebClient = new WebClient(SLACKToken);
        }
    },
    isAvailable: () => {
        return !!slackWebClient?.chat;
    },
    sendSlackMessage: (message) => {
        return slackWebClient.chat.postMessage({
            text: message,
            channel: SLACKChannel,
        });
    }
}

export { SlackService }
