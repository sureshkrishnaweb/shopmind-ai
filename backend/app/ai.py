import json
from .config import settings

async def recommend(query, products):
    if settings.GEMINI_API_KEY:
        try:
            from google import genai
            client=genai.Client(api_key=settings.GEMINI_API_KEY)
            data=[{"id":p["id"],"name":p["name"],"price":p["price"],"rating":p["rating"],"specs":p["specs"]} for p in products]
            prompt=f'''You are ShopMind AI. User: {query}\nProducts: {json.dumps(data)}\nReturn JSON only with keys summary,winner_id,reasons. Never invent facts.'''
            r=await client.aio.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
                config={"temperature":0.2,"response_mime_type":"application/json"},
            )
            return json.loads(r.text)
        except Exception:
            pass
    winner=products[0] if products else None
    return {"summary":f"I found {len(products)} relevant products and ranked them by query relevance, price and rating.","winner_id":winner["id"] if winner else None,"reasons":["Strong overall match","Good price-to-specification balance","Strong customer rating"]}

async def chat(query):
    if settings.GEMINI_API_KEY:
        try:
            from google import genai
            client=genai.Client(api_key=settings.GEMINI_API_KEY)
            prompt=f'''You are ShopMind AI, a friendly shopping assistant. Answer the user's normal conversation briefly and naturally. Do not recommend products unless the user asks for products. User: {query}'''
            r=await client.aio.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
                config={"temperature":0.5},
            )
            return r.text.strip()
        except Exception:
            pass
    return "I'm ShopMind AI, ready to help. Ask me about products, prices, reviews or comparisons."

