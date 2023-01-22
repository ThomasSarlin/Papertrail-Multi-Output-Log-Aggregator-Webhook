import { WebClient } from '@slack/web-api';

import { SLACKToken, SLACKChannel } from '../environment_variables.js'

let slackWebClient = null;


const SlackService = {
    init: async () => {
        if(!!SLACKToken && !!SLACKChannel){
            slackWebClient = new WebClient(SLACKToken);

            return await slackWebClient.auth.test().then(() => {
                console.log('[[----Slack Service ONLINE!----]]');
            }).catch(err => {
                slackWebClient = null;
                console.log('[[----Slack Service OFFLINE---]], Slack auth returned the following error:'+ err);
            })
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
