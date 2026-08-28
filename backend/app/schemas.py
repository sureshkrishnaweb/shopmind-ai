from pydantic import BaseModel, Field
from typing import Optional

class SearchRequest(BaseModel):
    query: str = Field(min_length=2, max_length=500)
    limit: int = Field(default=8, ge=1, le=20)

class ChatRequest(BaseModel):
    query: str = Field(min_length=1, max_length=500)

class CompareRequest(BaseModel):
    product_ids: list[str] = Field(min_length=2, max_length=5)
    user_query: Optional[str] = None

class RecommendRequest(BaseModel):
    query: str = Field(min_length=2, max_length=500)
    budget: Optional[float] = None
    category: Optional[str] = None
