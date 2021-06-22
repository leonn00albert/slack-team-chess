// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});



app.command("/start-chess", async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();

  await say({
    callback_id: "playerSelect",
    blocks: [
      {
        block_id: "playerBlock",
        type: "input",
        element: {
          type: "multi_users_select",
          placeholder: {
            type: "plain_text",
            text: "Select users",
            emoji: true
          },
          action_id: "multi_users_select-action"
        },
        label: {
          type: "plain_text",
          text: "Start Game",
          emoji: true
        }
      },
      		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Start",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "actionId-0"
				}
			]
		}
    ]
  });
});



app.action('actionId-0', async ({ ack, say }) => {
  
  await ack();
  await say('hello');
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
