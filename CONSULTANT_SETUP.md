# OnyxTech project consultant setup

## Current state

The consultant interface, first-visit greeting, editable draft price ranges, request validation, and contact-form handoff are implemented. The repository did not contain an AI SDK, provider adapter, AI credentials, or a working lead-submission destination when audited.

The API route at \`app/api/consultant/route.ts\` therefore validates requests and returns an explicit \`503 AI_PROVIDER_NOT_CONFIGURED\` response. It does not call a model, transmit visitor messages to an AI vendor, or incur AI usage.

## Before enabling AI responses

1. Choose the AI provider and model (for example, a provider with a supported server-side TypeScript SDK).
2. Review that provider's current SDK documentation and install only its required server-side package.
3. Add the provider API key to the hosting platform's server-side environment settings. Never use a \`NEXT_PUBLIC_\` variable for a secret.
4. Implement the provider adapter in the consultant Route Handler, including a system prompt grounded only in verified OnyxTech information, streaming, timeout handling, and provider-specific error handling.
5. Configure provider-side usage limits and abuse controls. The current route validates the JSON body, limits the conversation to 12 messages, and limits each message to 1,800 characters.
6. Test locally and in the deployment environment before enabling the feature publicly.

No provider or model has been selected in this implementation, and no provider credential is required for the preview UI.

## Price configuration

Edit \`app/config/consultant-pricing.ts\` to change the currency and the five illustrative ranges. They are explicitly marked as draft examples requiring owner review; they are not confirmed OnyxTech rates or binding quotes. Review them before launch.

## Lead handoff

The consultant can transfer the visitor's own recent chat notes to the existing project inquiry form only after the visitor selects **Prepare project inquiry**. The notes are passed in memory through a browser event and are not stored. The current form has no submission destination, so it is labelled as unavailable and does not claim that an inquiry was sent.

Before accepting inquiries, configure a real destination (for example, a server-side email or CRM integration), validate and protect submissions, publish a privacy notice, and only then enable the submit action.

## Image generation

The consultant does not generate or attach images. It can be extended to provide visual briefs or image-generation prompts once AI responses are enabled. A real image-generation provider, model, credentials, and any associated usage costs require a separate owner decision.
