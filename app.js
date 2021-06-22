// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command('start-chess')

app.command('/start-chess', async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();

   await say({
     callback_id: 'playerSelect',
      blocks: [
        {
			"type": "input",
			"element": {
				"type": "multi_users_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select users",
					"emoji": true
				},
				"action_id": "multi_users_select-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Start Game",
				"emoji": true
			}
		}
      ]
    });
});


app.view()
app.action('multi_users_select-action', async ({ ack, say }) => {
  // Acknowledge action request
  await ack();
  await say('Request approved 👍');
});


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
