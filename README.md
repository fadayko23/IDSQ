# Interior Design Style Quiz (IDSQ)

This repository provides a drop-in JavaScript quiz that you can embed on a Webflow website to help visitors uncover their interior design style. The quiz walks users through three rounds of image-based selections, captures contact details, and records the final results in Airtable.

## Features

- **Image association flow** – Users choose their favorite look from three curated images across three rounds.
- **Style showdown finale** – The three most selected styles are showcased for a final pick with a mini-gallery for each.
- **Lead capture** – Optional name/email form before the final reveal.
- **Airtable integration** – Send quiz responses directly to your Airtable base using the REST API.
- **Brand-friendly** – Customize colors, fonts, copy, and content without any build tools.

## Project structure

```
src/
  idsq-quiz.js    # Core quiz logic, UI rendering, and Airtable client
  index.html       # Minimal demo that mounts the quiz for local testing
```

## Quick start (local demo)

1. Open `src/index.html` in any modern browser. The page loads the quiz using the default configuration and disables Airtable submissions for safety.
2. Interact with the quiz to experience the flow and review the UI.

## Embedding in Webflow

1. Upload your quiz assets:
   - Copy the contents of `src/idsq-quiz.js` into a new **Embed** component inside Webflow or host the file on your preferred CDN and reference it with a `<script>` tag.
   - Add a container element where the quiz should render, for example a `div` with the ID `idsq-root`.
2. Initialize the quiz with custom settings by adding a short script right after loading the quiz file:

   ```html
   <script>
     window.IDSQ.buildQuiz({
       mountSelector: '#idsq-root',
       brand: {
         primaryColor: '#0F172A',
         accentColor: '#F97316',
         fontFamily: "'Poppins', sans-serif",
         logoUrl: 'https://yourcdn.com/logo.svg',
       },
       airtable: {
         enable: true,
         apiKey: 'YOUR_AIRTABLE_API_KEY',
         baseId: 'YOUR_AIRTABLE_BASE_ID',
         tableName: 'Responses',
       },
       steps: [
         /* Replace with your own slides and images */
       ],
       styleLibrary: {
         /* Extend or override style metadata shown in the finale */
       },
     });
   </script>
   ```

3. Publish your Webflow site. The quiz initializes as soon as the page loads.

### Recommended Webflow settings

- Place the embed inside a section with generous padding to mimic the demo styling.
- Ensure the `idsq-quiz.js` script is loaded **after** the `div` that will host the quiz.
- Use Webflow’s CMS or Assets panel to manage your imagery if you prefer not to reference external URLs.

## Configuring Airtable

1. Create an Airtable base (or use an existing one) and add a table (e.g. `Responses`).
2. Add the following fields (names can be changed if you also update the `mapFields` function):
   - `Name` (Single line text)
   - `Email` (Email)
   - `Slide 1 Choice`
   - `Slide 2 Choice`
   - `Slide 3 Choice`
   - `Final Style`
   - `Final Style Score` (Number)
   - `Chosen Styles JSON` (Long text)
   - `Timestamp` (Date)
3. Visit your Airtable account to create a [personal access token](https://airtable.com/developers/web/api/introduction) with read/write access to the base.
4. Update the `airtable` block in the quiz configuration with your API key, base ID, and table name.
5. (Optional) Modify `airtable.mapFields` inside `idsq-quiz.js` to map quiz data to your schema.

> **Security tip:** When embedding on Webflow, avoid hard-coding the Airtable API key in client-side JavaScript if the site is public. Instead, create a lightweight proxy endpoint (e.g., using Webflow Logic or a serverless function) that injects the API key securely.

## Customization guide

- **Slides & options** – Each `step` entry contains a prompt and three `options`. Swap in your own images and style IDs.
- **Style library** – The `styleLibrary` object powers the finale cards and success screen. Add images, copy, and descriptions that feel on-brand.
- **Copy & labels** – Adjust texts via the `copy` property (intro headline, button labels, error messages, etc.).
- **Branding** – Colors, fonts, and optional logos are centralized in the `brand` config.
- **Lead capture** – Disable the lead form by setting `leadCapture.enable` to `false` when calling `buildQuiz`.

## Deployment checklist

- [ ] Replace Unsplash demo imagery with your licensed assets.
- [ ] Confirm Airtable tokens and schema match your configuration.
- [ ] Test on desktop and mobile breakpoints.
- [ ] Validate email delivery or follow-up automation tied to Airtable records.

## License

This project is provided as-is under the MIT License. Customize freely for your business needs.
