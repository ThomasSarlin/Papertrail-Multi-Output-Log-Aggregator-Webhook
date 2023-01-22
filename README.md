# Papertrail-Multi-Output-Log-Aggregator-Webhook

This repository provides a solution for grouping and counting logs from Papertrail using webhooks.
It allows you to send these aggregated logs either via email(SMTP) or Slack using a bot token and channel id, providing you with a convienent way to get an overview of your most common/urgent log messages.  
  
The aggregated logs are sent to the desired output channel with one line for each reoccuring message, sorted by the most common message.
The text is formatted as follows:
```
Aggregated result of your search {saved_search_name}:
[SEVERITY] "message", {message count} row(s). 
...
...
```

## Step 1: Deploy your application to your server.
Clone this repository to your server and install the dependenices by running
`npm install`

## Step 2: Choose output.
### Slack
To be able to send messages to a slack channel you need to create custom 
slack app and install this to your slack-workspace. 
On creation you will recieve a token to be assigned in the `.env` file,
the app also requires the Scope `chat:write` to work properly.
Read more on how to create a Slack app: [Basic app setup](https://api.slack.com/authentication/basics)


Open up the `.env` file and update the following variables:
```
SLACK_TOKEN=
SLACK_CHANNEL=
```
All variables are required for the initialization of the Slack service.



### Email (SMTP)
Open up the `.env` file and update the following variables:
```
SMTP_SERVER=
SMTP_PASSWORD=
SMTP_EMAIL_ADDRESS=
SMTP_TARGET_EMAIL_ADRESS=
```
All variables are required for the initialization of the email service.

## Step 3: Launch application
To start the application run
`npm run start`

## Step 4: Create a Papertrail saved search

1. Create a saved search in Papertrail with your desired search-term like 'warning' or 'error'.
2. Create a search alert (webhook) pointing to your deployed app pointing to `/submit`

To get more infor on Papertrail webhooks visit: [Papertrail webhooks](http://help.papertrailapp.com/kb/how-it-works/web-hooks)
