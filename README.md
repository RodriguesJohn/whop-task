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

## Environment

Copy `.env.example` to `.env` and set `OPENAI_API_KEY` if you add image-generation (use a server or serverless proxy — do not expose keys in client-only `VITE_*` bundles for production).

## License

Private / all rights reserved unless you add a license file.
