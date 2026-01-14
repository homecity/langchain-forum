# Problem running LangGraph.JS Studio on Mac/Safari

**Topic ID:** 232
**Created:** 2025-07-03 23:13:46
**URL:** https://forum.langchain.com/t/232

**Tags:** ambient-agents-with-

---

## Post #1 by @nigel
*Posted on 2025-07-03 23:13:46*

I’m following the Ambient Agents with LangGraph course but I’m converting it to JS (I’m a JS 1st dev). In the LangGraph 101 it’s been great until I tried out the deploy. I set up my test code, `langgraph.json` and ran it using the command `npx @langchain/langgraph-cli dev`. This appears to run just fine and I get the following output:


```
`
          Welcome to

╦  ┌─┐┌┐┌┌─┐╔═╗┬─┐┌─┐┌─┐┬ ┬
║  ├─┤││││ ┬║ ╦├┬┘├─┤├─┘├─┤
╩═╝┴ ┴┘└┘└─┘╚═╝┴└─┴ ┴┴  ┴ ┴.js

- 🚀 API: http://localhost:2024
- 🎨 Studio UI: https://smith.langchain.com/studio?baseUrl=http://localhost:2024

This in-memory server is designed for development and testing.
For production use, please use LangGraph Cloud.


info:    ▪ Starting server...
info:    ▪ Initializing storage...
info:    ▪ Registering graphs from /Users/nigel/git/ambient-agents/01_LangGraph_101
info:    ┏ Registering graph with id 'deploy'
info:    ┗ [1] { graph_id: 'deploy' }
info:    ▪ Starting 10 workers
info:    ▪ Server running at ::1:2024
`
```

It then opens Safari and things go wrong  I get the message:

*Using Safari?

Safari blocks access to `localhost` via `http` protocol by default. Please consider using a different browser or relaunch the server with `--tunnel` flag.[https://langchain-ai.github.io/langgraph/troubleshooting/studio/](Read more)*

When I look at the docs [https://langchain-ai.github.io/langgraph/troubleshooting/studio/](here) it suggests I don’t need the `--tunnel` flag. I tried it any way and I get a Cloudflare URL. For example it tried to open the URL:


```
`https://smith.langchain.com/studio/thread?baseUrl=https%3A%2F%2Feagle-you-niagara-personally.trycloudflare.com&organizationId=******************************************************&mode=graph
`
```

But I still get the same error message in Safari saying use `--tunnel`.

This is my first time trying out LangGraph deploy so I may have missed something important here!

So, just to help, below are the files I’m using:

**07_deploy.ts**


```
`import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { StateGraph, MessagesAnnotation, START, END } from "@langchain/langgraph";

/////////////// Setup ///////////////
// Let's set up a model that can do something for us
const llm = new ChatOpenAI({model: 'gpt-4.1', temperature: 0});

// Now let's set up an 'email' sending tool (used in a node)
const writeEmail = tool((input) => {
	// Note this is a placeholder, in reality we would send an email.
	return `Email sent to ${input.to} with subject ${input.subject} and content: ${input.content}`;
}, {
	name: 'write_email',
	description: 'Write and send an email.',
	schema: z.object({
		to: z.string().describe('The email address of the recipient.'),
		subject: z.string().describe('A title describing the email\'s subject.'),
		content: z.string().describe('The full text of the email.')
	})
});

// Finally let's bind the tool we just defined to an LLM (also used in a node)
const modelWithTools = llm.bindTools([writeEmail]);

/////////////// Nodes ///////////////
// This node interacts with the LLM
async function callLLM(state: MessagesAnnotation) {
	// Call the LLM with knowledge of the write email tool
	const output = await modelWithTools.invoke(state.messages);

	return {messages: output};
}

// This node runs the tool the LLM selected
async function runTool(state: MessagesAnnotation) {
	let result = [];

	// Make a tool Call based on the previous message
	for (const toolCall of state.messages[state.messages.length-1].tool_calls) {
		const observation = writeEmail.invoke(toolCall.args);
		result.push({role: 'tool', content: observation, tool_call_id: toolCall.id});
	}

	return {messages: result}
}

/////////////// Edges ///////////////
// This edge is where we decide if we call a tool or finish
function shouldContinue(state: MessagesAnnotation) {
	let result = null;

	// Get the previous message
	const messages = state.messages;
	const lastMessage = messages[messages.length-1];

	// If the last message is a tool call we're done
	if (lastMessage.tool_calls) {
		result = 'run_tool';
	} else {
		result = END;
	}

	return result;
}

/////////////// Graph ///////////////
// Here we export the app so that the build can find it, note that app was the name we used in the langraph.json
export const app = new StateGraph(MessagesAnnotation)
	.addNode('call_llm', callLLM)
	.addNode('run_tool', runTool)
	.addEdge(START, 'call_llm')
	.addConditionalEdges('call_llm', shouldContinue, {'run_tool': 'run_tool', END: END})
	.addEdge('run_tool', END)
	.compile();
`
```

**langgraph.json**


```
`{
  "graphs": {
	"deploy": "./07_deploy.ts:app"
  }
}
`
```

---

## Post #2 by @andrew
*Posted on 2025-07-04 14:55:42*

Here’s a screenshot of the error in Safari:

[/uploads/short-url/6iS8yObpBEJLtOfUOrqDaw2Q22X.png?dl=1](Screenshot 2025-07-04 at 07.54.362276×358 38.8 KB)

---

## Post #3 by @andrew
*Posted on 2025-07-04 15:08:23*

Double checking: Does the page load when you try on Chrome?

---

## Post #4 by @nigel
*Posted on 2025-07-04 16:38:50*

I ran the chain up without the `--tunnel` flag and I could open it correctly in Opera. It just seems to fail in Safari but then fail when attempting to follow the advice to make it work

---

## Post #5 by @bapuku
*Posted on 2025-08-10 23:52:49*

Same issues and it works well when switching to chrome!

---
