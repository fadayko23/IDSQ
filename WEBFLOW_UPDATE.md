# Update Webflow CDN URL to Latest Version

The jsDelivr CDN is caching the old `@main` version. You need to update your Webflow Embed code to use the latest commit hash to force a fresh cache.

## Current Webflow Embed Code (Uses Cached `@main`):
```html
<script src="https://cdn.jsdelivr.net/gh/fadayko23/IDSQ@main/src/idsq-quiz.min.js"></script>
<script>
window.IDSQ.buildQuiz({
  webhook: {
    url: 'https://hook.us1.make.com/mcd4xny5t7i089ep8slgzy8him3amay3',
    headers: { 'x-make-apikey': 'b23f5a9d1e7a40a5c9d817d89e8d47f2' },
    enable: true
  },
  introVariant: 'guide-panel'
});
</script>
```

## Updated Webflow Embed Code (Latest Commit `41343b2`):
```html
<script src="https://cdn.jsdelivr.net/gh/fadayko23/IDSQ@41343b2/src/idsq-quiz.min.js"></script>
<script>
window.IDSQ.buildQuiz({
  webhook: {
    url: 'https://hook.us1.make.com/mcd4xny5t7i089ep8slgzy8him3amay3',
    headers: { 'x-make-apikey': 'b23f5a9d1e7a40a5c9d817d89e8d47f2' },
    enable: true
  },
  introVariant: 'guide-panel'
});
</script>
```

## What Changed:
- `@main` → `@41343b2` 
- This forces jsDelivr to fetch the latest commit, bypassing cache

## Instructions:
1. Open your Webflow project
2. Find the Embed element with the quiz code
3. Replace `@main` with `@41343b2` in the CDN URL
4. Publish the site
5. Test the quiz - all text should now be styled correctly with Webflow's `--IDSQ-Font` variable

## Future Updates:
Each time we make CSS changes, you'll need to update the commit hash in Webflow OR wait 24 hours for jsDelivr's `@main` cache to expire.

