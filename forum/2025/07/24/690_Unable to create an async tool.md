# Unable to create an async tool

**Topic ID:** 690
**Created:** 2025-07-24 22:45:13
**URL:** https://forum.langchain.com/t/690

**Tags:** js-help

---

## Post #1 by @nigel
*Posted on 2025-07-24 22:45:13*

When I try and run my agent using `langgraph-cli dev` get an error saying I need this tool to be `async`. The error is:


```
`error:   ▪ TransformError: Transform failed with 1 error:
/Users/nigel/git/ambient-agents/06_deploy/tools/check_calendar_tool.ts:15:17: ERROR: "await" can only be used inside an "async" function
...
`
```

The code it is referencing is as follows:


```
`// Send an email
export const sendEmailTool = tool(
	async (input: {emailId: string; responseText: string; emailAddress: string; additionalRecipients: string[]}) => {
		try {
			const success = await sendEmail(input.emailId, input.responseText, input.emailAddress, input.additionalRecipients);

			return success ? `Email reply sent successfully to message ID: ${input.emailId}` : 'Failed to send email due to an API error';
		} catch(err) {
			return `Failed to send email: ${err}`;
		}
	},{
		name: 'send_email_tool',
		description: 'Send a reply to an existing email thread or create a new email in Gmail.',
		schema: z.object({
			emailId: z.string().describe(`Gmail message ID to reply to. This should be a valid Gmail message ID obtained from the fetch_emails_tool.
					 If creating a new email rather than replying, you can use any string identifier like "NEW_EMAIL"`),
			responseText: z.string().describe('Content of the reply or new email'),
			emailAddress: z.string().describe('Current user\'s email address (the sender)'),
			additionalRecipients: z.optional(z.array(z.string())).describe('Optional additional recipients to include')
		})
	}
);
`
```

I’m not sure why it suspects the `await` call is not in scope of the `async` declaration? Any advice is very welcome!

---
