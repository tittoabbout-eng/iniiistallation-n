# Final Handoff Notes

Use this version as the main handoff build.

## Safest files to edit
- `src/content/projects/*.json`
- `src/content/services/*.json`
- `src/content/areas/*.json`
- `src/content/global-content.json`
- `src/content/homepage-sections.json`
- `public/uploads/`

## Before each deploy
```bash
npm run check:content
npm run check:images
npm run build
```

## Main finish work left for you
- swap in your strongest final project photos
- fine-tune wording in the JSON content files
- connect GitHub + Netlify + domain
- run final manual QA on desktop and mobile
