# Interior Design Style Quiz (IDSQ)

A drop-in JavaScript quiz for Webflow that helps visitors discover their interior design style through an engaging, image-first experience guided by Clara, JL Coates' interior design expert.

## Features

- **Pure image-based rounds** – 4 rounds of selections with 3 options each, covering all 12 design styles
- **12 Design Styles** – Transitional, Organic Modern, Japandi, Wabi-Sabi, Modern Mediterranean, Scandinavian, Art Deco Revival, Eclectic Maximalism, Soft Industrial, Coastal Calm, Modern Farmhouse, Desert Modern
- **6 Space Types** – Living Room, Bedroom, Kitchen, Bathroom, Office, Whole Home
- **Word association slide** – Space-specific vocabulary with ~24 evocative words, randomized placement and sizing
- **Clara as guide** – Profile picture on intro; conversational tips throughout; personalized messaging
- **Milestone tips** – Contextual design tips shown between rounds 1-2, 2-3, and 3-4
- **Navigation** – Previous, Next (appears when selection made), and Start Over on every step
- **Name capture** – Optional name field with profanity filtering; "Continue without name" option
- **Lead capture** – Optional email and newsletter signup; auto-populates and persists when navigating back
- **Invited client support** – URL params `?rid=<RecordID>&cp=<ContactID>&name=<Name>` pre-fill data and skip newsletter
- **Final selection** – Shows all 4 selected styles in a 2x2 grid; user chooses final style
- **Style DNA** – Final reveal includes Style DNA bullet points with Clara's pro tip panel
- **Dynamic CTA** – "Ready to bring your [Style] vision to life in your [Space]?" with scheduling link
- **Webhook integration** – Sends quiz data to Make.com webhook upon final style selection
- **Session persistence** – Progress saved/restored via `localStorage`; "Start Over" clears session
- **Branding** – Montserrat font, dark gray buttons `#363636`, consistent typography, white background throughout
- **Responsive design** – Fully responsive with mobile-optimized layouts

## Project Structure

```
IDSQ/
  ├── README.md
  ├── ROUND-BREAKDOWN.md
  └── src/
      ├── idsq-quiz.js    # Core quiz logic, UI rendering, state, styles, webhook integration
      └── index.html      # Local demo file
```

## Quick Start (Local Demo)

1. Open `src/index.html` in any modern browser
2. Walk through the complete flow:
   - Intro → Name (Optional) → Space Selection → Word Association → 4 Image Rounds → Lead Capture (Optional) → Final Selection → Results
3. Test navigation: Use Previous, Next, and Start Over buttons
4. Test persistence: Refresh the page to restore progress
5. Test invitation: Add `?rid=xxx&cp=yyy&name=John` to URL

## Webflow Embedding

### Step 1: Add Container

Add a container where you want the quiz to appear:

```html
<div id="idsq-root"></div>
```

### Step 2: Load Script

Add the quiz script to your page (Embed element in Footer or Page settings):

```html
<script src="https://your-cdn.com/idsq-quiz.js"></script>
```

Or paste the contents of `src/idsq-quiz.js` directly into a Webflow Embed.

### Step 3: Initialize Quiz

Initialize the quiz after the container:

```html
<script>
  window.IDSQ.buildQuiz({
    mountSelector: '#idsq-root',
    brand: {
      primaryColor: '#363636',
      accentColor: '#006bea',
      fontFamily: "'Montserrat', sans-serif",
      fontUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap',
      // logoUrl: 'https://yourcdn.com/logo.svg' // Optional
    },
    webhook: {
      enable: true,
      url: 'https://hook.us1.make.com/your-webhook-url',
      headers: {
        'x-make-apikey': 'your-api-key'
      }
    },
    leadCapture: {
      enable: true
    },
    introVariant: 'guide-panel' // or 'classic'
  });
</script>
```

### Step 4: Configure Webhook

1. Set up your Make.com webhook scenario
2. Configure data structure (see `ROUND-BREAKDOWN.md` for payload structure)
3. Add webhook URL and API key to the config above

## Invited Client Support

For existing clients, append URL parameters to pre-fill data and skip newsletter signup:

```
https://yoursite.com/quiz?rid=reccfojeFsiQSKmP2&cp=1&name=John
```

- `rid` – Record ID from your system
- `cp` – Contact ID / Campaign parameter  
- `name` – Client's name (pre-fills name field)

Invited users will:
- Have their name pre-filled
- Skip the newsletter signup screen
- Have `invited: true` in the webhook payload

## Typography Standards

- **Headers/Titles**: `font-size: 38px`, `line-height: 50px`, `font-weight: 900`
- **Body/Subtitles**: `font-size: 16px`, `line-height: 30px`, `font-weight: 500`
- **Buttons**: `font-size: clamp(1rem, 2.4vw, 1.25rem)`, `font-weight: 900`, `line-height: 1`

## Button Styles

- **Primary**: Dark gray background `#363636`, white text, shadow on hover
- **Secondary**: White background, dark gray border/text, shadow on hover
- **Hover Effect**: Enhanced box-shadow only (no transform/jump)

## Quiz Flow

1. **Intro** – Clara introduction with guide panel
2. **Name Capture** – Optional name field (pre-filled for invited users)
3. **Space Selection** – Choose one of 6 space types
4. **Word Association** – Select one word from space-specific vocabulary (~24 words)
5. **Image Rounds** – 4 rounds of 3 image selections each
   - Round 1: Transitional, Organic Modern, Japandi
   - Round 2: Wabi-Sabi, Modern Mediterranean, Scandinavian
   - Round 3: Art Deco Revival, Eclectic Maximalism, Soft Industrial
   - Round 4: Coastal Calm, Modern Farmhouse, Desert Modern
6. **Milestone Tips** – Appear between rounds 1-2, 2-3, and 3-4
7. **Lead Capture** (Optional) – Email and newsletter signup (skipped for invited users or if already filled)
8. **Final Selection** – View all 4 selected styles in 2x2 grid, choose final style
9. **Results** – Final style reveal with description, Style DNA, images, and CTA

## Webhook Payload Structure

The webhook sends a JSON payload with:

```json
{
  "meta": {
    "quizId": "idsq-v1",
    "version": "1.0.0",
    "timestampIso": "2025-10-31T15:26:37.136Z",
    "sessionId": "unique-session-id"
  },
  "participant": {
    "name": "John",
    "email": "john@example.com",
    "newsletter": true,
    "invited": false,
    "rid": null,
    "cp": null
  },
  "context": {
    "spaceId": "living-room",
    "spaceName": "Living Room",
    "wordAssociation": {
      "word": "Serene",
      "styleIds": []
    }
  },
  "selections": {
    "rounds": [
      {
        "round": 1,
        "optionId": "transitional-1-1",
        "styleId": "transitional",
        "styleName": "Transitional",
        "imageUrl": "https://..."
      }
      // ... rounds 2, 3, 4
    ]
  },
  "results": {
    "finalStyle": {
      "styleId": "transitional",
      "styleName": "Transitional",
      "description": "...",
      "dna": ["Palette: ...", "Materials: ...", "Silhouettes: ..."],
      "images": ["https://...", "https://...", "https://..."]
    }
  }
}
```

## Customization

- **Images** – Replace all image URLs in `styleLibrary` with your own licensed assets (216 images total: 12 styles × 18 images)
- **Copy** – Update `copy` entries for prompts, CTAs, and messaging
- **Brand** – Customize colors, fonts, and optional logo via the `brand` config block
- **Lead Capture** – Set `leadCapture.enable: false` to skip entirely
- **Tips** – Extend milestone tips in the `getMilestoneMessage` function

## Image Requirements

- **Format**: WebP (recommended for optimal performance)
- **Quality**: 80-85% for optimal balance
- **Count**: 18 images per style for all 12 styles
  - 6 `_3` images in `finalImages` (one per room: living-room, bedroom, kitchen, bathroom, office, whole-home)
  - 12 images in `imagesByRoom` (`_1` and `_2` for each of the 6 rooms)
- **Dimensions**: Minimum 900px width, aspect ratio maintained

## Deployment Checklist

- [ ] Replace all demo imagery with your own licensed images
  - 18 images each for all 12 styles = 216 images total
- [ ] Configure Make.com webhook with correct URL and API key
- [ ] Test invited client flow with `?rid=xxx&cp=yyy&name=Name` parameters
- [ ] Verify session persistence (refresh and Start Over)
- [ ] Test navigation (Previous, Next, Start Over on all steps)
- [ ] Validate mobile layout and responsive breakpoints
- [ ] Confirm webhook payload structure matches your Make.com scenario
- [ ] Test newsletter signup persistence when navigating back
- [ ] Verify all 12 styles appear in quiz rounds

## Browser Support

Modern browsers with:
- ES6+ JavaScript support
- CSS Grid and Flexbox
- localStorage API
- Fetch API

Tested on: Chrome, Firefox, Safari, Edge (latest versions)

## License

This project is provided as-is under the MIT License. Customize freely for your business needs.
