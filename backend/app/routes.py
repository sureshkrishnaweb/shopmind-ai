from fastapi import APIRouter, HTTPException
from .products import PRODUCTS,get_product
from .schemas import SearchRequest,ChatRequest,CompareRequest,RecommendRequest
from .search import search_products
from .ai import chat,recommend

router=APIRouter()

@router.get("/products")
def products(): return PRODUCTS

@router.get("/products/{product_id}")
def product(product_id):
    p=get_product(product_id)
    if not p: raise HTTPException(404,"Product not found")
    return p

@router.post("/search")
async def search(req: SearchRequest):
    products=search_products(req.query,req.limit)
    ai=await recommend(req.query,products)
    return {"query":req.query,"products":products,"ai_summary":ai["summary"],"ai_verdict":ai["winner_id"],"reasons":ai["reasons"]}

@router.post("/chat")
async def conversation(req: ChatRequest):
    return {"reply": await chat(req.query)}

@router.post("/recommend")
async def recommendation(req: RecommendRequest):
    q=req.query
    if req.category: q += " "+req.category
    if req.budget: q += f" under ₹{req.budget}"
    products=search_products(q,8)
    ai=await recommend(q,products)
    return {"query":req.query,"products":products,"winner_id":ai["winner_id"],"summary":ai["summary"],"reasons":ai["reasons"]}

@router.post("/compare")
async def compare(req: CompareRequest):
    products=[get_product(x) for x in req.product_ids]
    products=[x for x in products if x]
    if len(products)<2: raise HTTPException(400,"Select at least two valid products")
    ai=await recommend(req.user_query or "Compare these products and select the best overall value.",products)
    return {"products":products,"winner_id":ai["winner_id"],"verdict":ai["summary"],"reasons":ai["reasons"]}
