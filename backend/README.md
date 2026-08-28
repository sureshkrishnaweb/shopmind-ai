# ShopMind AI Backend

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and set your `GEMINI_API_KEY`.

Run:

```bash
uvicorn app.main:app --reload --port 8000
```

Open `http://localhost:8000/docs`.

If `GEMINI_API_KEY` is empty, the backend still works using a local ranking/recommendation fallback.

## APIs

POST `/api/search`
```json
{"query":"best laptop under ₹70000 for coding and gaming","limit":8}
```

POST `/api/recommend`
```json
{"query":"best phone for camera","budget":30000,"category":"phone"}
```

POST `/api/compare`
```json
{"product_ids":["asus-tuf-a15","lenovo-loq","hp-victus"],"user_query":"best laptop for coding and gaming"}
```

The product catalog is demo data. For real Amazon/Flipkart/Myntra-style aggregation, connect authorized affiliate/product APIs or merchant feeds rather than unauthorized scraping.
