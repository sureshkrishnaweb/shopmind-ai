from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routes import router

app=FastAPI(title="ShopMind AI API",version="1.0.0")
app.add_middleware(CORSMiddleware,allow_origins=[settings.FRONTEND_ORIGIN,"http://localhost:3000"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(router,prefix="/api")

@app.get("/health")
def health(): return {"status":"ok","service":"shopmind-ai-api"}
