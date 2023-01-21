import { WebClient } from '@slack/web-api';

import { SLACKToken, SLACKChannel } from '../environment_variables.js'

let slackWebClient = null;


const SlackService = {
    init: () => {
        console.log(SLACKChannel, SLACKToken);
        if(!!SLACKToken && !!SLACKChannel){
            console.log('Initializing slack integration');
            slackWebClient = new WebClient(SLACKToken);
        }
    },
    isAvailable: () => {
        console.log(slackWebClient);
        return !!slackWebClient?.chat;
    },
    sendSlackMessage: (message) => {
        console.log('sending slack message')
        return slackWebClient.chat.postMessage({
            text: message,
            channel: SLACKChannel,
        });
    }
}

export { SlackService }