const API_URL=process.env.NEXT_PUBLIC_API_URL||(process.env.NODE_ENV==="production"?"/api/backend":"http://localhost:8000/api");

async function request(path,options={}){
 const r=await fetch(API_URL+path,{headers:{"Content-Type":"application/json",...(options.headers||{})},...options});
 if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e.detail||"API request failed");}
 return r.json();
}
export const searchProducts=(query,limit=8)=>request("/search",{method:"POST",body:JSON.stringify({query,limit})});
export const chatMessage=(query)=>request("/chat",{method:"POST",body:JSON.stringify({query})});
export const recommend=(query,budget=null,category=null)=>request("/recommend",{method:"POST",body:JSON.stringify({query,budget,category})});
export const compareProducts=(product_ids,user_query=null)=>request("/compare",{method:"POST",body:JSON.stringify({product_ids,user_query})});
export const getProducts=()=>request("/products");
