# Whop Task

Prototype UI for **Whop Tasks** — earners browse paid tasks; business owners post programs and view metrics. Strategy doc: [`Tasks-Strategy.md`](./Tasks-Strategy.md).

## Repository

**https://github.com/RodriguesJohn/whop-task**

```bash
git clone https://github.com/RodriguesJohn/whop-task.git
cd whop-task
npm install
npm run dev
```

## Scripts

| Command        | Description        |
|----------------|--------------------|
| `npm run dev`  | Vite dev server    |
| `npm run build`| Production build   |
| `npm run preview` | Preview production build |
| `npm run generate:images` | Generate `public/feed/*.png` for the home feed (needs `OPENAI_API_KEY` in `.env`) |

## Environment

Copy `.env.example` to `.env` and set `OPENAI_API_KEY` for local image generation (`npm run generate:images`). Keys stay in Node only — not shipped to the browser. For production, prefer a server or serverless proxy instead of `VITE_*` client env vars.

## License

Private / all rights reserved unless you add a license file.
