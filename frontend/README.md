# ShopMind AI — Full Next.js + React Frontend

## Routes
- `/` Home
- `/ai-search` AI Shopping Assistant
- `/compare` Product Comparison
- `/trending` Trending Products

## Run
```bash
npm install
npm run dev
```

Production check:
```bash
npm run build
npm start
```

PostCSS is configured in `postcss.config.js` with the required `plugins` key.

The AI response is currently simulated with React state. The next step is connecting the AI Search UI to a real LLM/FastAPI backend and permitted product APIs or feeds.
