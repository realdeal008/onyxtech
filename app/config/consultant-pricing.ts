/**
 * Owner-editable draft pricing examples for the OnyxTech consultant.
 * These are illustrative planning ranges, NOT confirmed OnyxTech prices or quotes.
 * Review and update this file before publishing the consultant.
 */
export const CONSULTANT_PRICING = {
  currency: "USD",
  currencyLabel: "USD",
  draftOnly: true,
  ranges: [
    { id: "landing", label: "Basic landing page", min: 500, max: 1500 },
    { id: "business", label: "Small business website", min: 1500, max: 5000 },
    { id: "commerce", label: "E-commerce website", min: 3000, max: 10000, plus: true },
    { id: "ai", label: "AI integration or chatbot", min: 2000, max: 8000, plus: true },
    { id: "application", label: "Custom web application", min: 3000, max: 12000, plus: true },
  ],
} as const;
