# Economics Rescue AI Tutor — Cloudflare setup

The code is already included. You only need to connect the Pages project to Workers AI.

## 1. Add the binding
1. Open Cloudflare Dashboard.
2. Go to **Workers & Pages**.
3. Open the Economics Rescue Pages project.
4. Open **Settings**.
5. Under the relevant Pages environment, open **Bindings**.
6. Choose **Add → Workers AI**.
7. Set **Variable name** to exactly: `AI`
8. Save.
9. Redeploy the Pages project.

Cloudflare exposes that binding to `functions/api/tutor.js` as `context.env.AI`.

## 2. Test
After deploy, open any mission and click **Ask tutor**.

You can also visit `/api/tutor` in the deployed site. It should return JSON with `ai_bound: true`.

## Included modes
- Explain current lesson
- Check a written answer
- Review a mistake

## Model
`@cf/meta/llama-3.1-8b-instruct-fast`

No API key is placed in browser JavaScript.
