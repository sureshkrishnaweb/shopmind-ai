# ShopMind AI Full Stack

## Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Frontend
Copy `frontend/.env.local.example` to `.env.local` in your existing Next.js project and copy `frontend/lib/api.js` into `lib/api.js`.

Then import:
```js
import { searchProducts, compareProducts } from "./lib/api";
```

The existing frontend can call the FastAPI backend for AI search and comparison.

## Architecture
Next.js UI → FastAPI → Product search/ranking → OpenAI (optional) → JSON → UI

The backend runs without an OpenAI key using local ranking, so development is possible immediately.
