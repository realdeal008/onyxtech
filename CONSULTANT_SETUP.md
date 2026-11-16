# OnyxTech project consultant setup

## Current implementation

The consultant interface is integrated into the existing Next.js App Router site. It includes a first-visit greeting, accessible launcher and responsive panel, starter prompts, streaming chat UI, session-only message state, draft pricing ranges, and an opt-in transfer of the visitor's notes to the existing project inquiry form.

The API route is prepared to call Groq's OpenAI-compatible Chat Completions endpoint using the model \`openai/gpt-oss-20b\`. The model ID and API endpoint follow Groq's current documentation:
- https://console.groq.com/docs/models
- https://console.groq.com/docs/openai
- https://console.groq.com/docs/api-reference

The model has a free-tier quota subject to organisation limits, and quotas can change. Check the live limits in the provider console before deployment. A 429 response is shown as a temporary free-quota limit; the application does not switch to a paid model.

## Important account eligibility

Groq's current Services Agreement says Cloud Services are for people aged 18 or older. Do not create or use a Groq developer account if you are under 18, and do not bypass this requirement. An eligible adult who is legally responsible for administering the website would need to review the agreement, privacy requirements, and applicable rules before configuring the provider.

Until an eligible administrator has reviewed and configured the integration, the chat will show a clear setup error and will not call the AI service.

## Configure the server environment

After the provider account and deployment are properly administered, add these values to the server environment (local \`.env.local\` or hosting platform settings):

\`\`\`dotenv
GROQ_API_KEY=your_server_side_key
GROQ_MODEL=openai/gpt-oss-20b
\`\`\`

Never commit a real API key and never prefix it with \`NEXT_PUBLIC_\`. The key is read only by the server route.

## Operational safeguards

- The route limits request bodies to 16 KB, the conversation to 12 messages, and each message to 1,800 characters.
- The provider response is streamed through the server route.
- The provider key is never returned to the browser.
- The client keeps the transcript in component state only; it does not persist the conversation in local storage or a database.
- Messages are sent to Groq when the server key is configured. Visitors should not submit sensitive or confidential information.
- Add a production-grade edge/server rate limiter, monitoring, and abuse controls before making the chat public. Provider quotas alone are not an application abuse-control strategy.
- Review Groq's current Services Agreement and privacy documentation before launch, especially because the site may be accessible to younger visitors.

## Price configuration

Edit \`app/config/consultant-pricing.ts\` to change the currency and the five illustrative ranges. They are draft examples requiring owner review; they are not confirmed OnyxTech rates or binding quotes. The AI instructions require scope discovery before suggesting a range.

## Lead handoff

The consultant can transfer the visitor's recent messages to the existing project inquiry form only after the visitor selects **Prepare project inquiry**. The notes are passed in memory through a browser event and are not stored by the consultant.

The existing form has no submission destination. Its submit control is therefore disabled and clearly labelled unavailable; it does not claim an inquiry was sent. Before accepting inquiries, configure a real email/CRM destination, validate and protect submissions, publish an appropriate privacy notice, and only then enable submission.

## Image generation

The consultant can propose a visual direction and write a detailed image-generation prompt. It does not generate or attach images. A real image-generation provider and separate owner approval would be required for that capability.
