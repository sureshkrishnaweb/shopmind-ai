import re
from .products import PRODUCTS

def search_products(query, limit=8):
    q=query.lower()
    category_aliases={
        "laptop":"laptop", "notebook":"laptop", "computer":"laptop",
        "phone":"phone", "mobile":"phone", "smartphone":"phone",
        "shoe":"shoes", "shoes":"shoes", "running":"shoes",
        "headphone":"headphones", "headphones":"headphones",
        "earbud":"earbuds", "earbuds":"earbuds", "airpod":"earbuds", "airpods":"earbuds",
    }
    requested_category=next((category for word,category in category_aliases.items() if re.search(rf"\b{word}s?\b",q)),None)
    terms=[x for x in re.findall(r"[a-zA-Z0-9]+",q) if x not in {"best","for","the","and","with","under","show","me","a","an","in","is","to"}]
    budget=None
    m=re.search(r"(?:under|below|less than)\s*₹?\s*([\d,]+)",q)
    if m: budget=float(m.group(1).replace(",",""))
    scored=[]
    for p in PRODUCTS:
        if requested_category and p["category"] != requested_category:
            continue
        if budget is not None and p["price"] > budget:
            continue
        text=" ".join([p["name"],p["store"],p["category"]," ".join(p["tags"])," ".join(map(str,p["specs"].values()))]).lower()
        score=sum((5 if t in p["name"].lower() else 3 if t in text else 0) for t in terms)
        score += p["rating"]*.5
        if budget is not None: score += 4
        scored.append((score,p))
    return [p for score,p in sorted(scored,key=lambda x:x[0],reverse=True) if score > 0][:limit]
