'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { chatMessage, searchProducts } from '../lib/api';

export default function AISearch(){
 const [query,setQuery]=useState(''); const [messages,setMessages]=useState([]); const [result,setResult]=useState(null); const [loading,setLoading]=useState(false); const [error,setError]=useState(''); const [history,setHistory]=useState([]);
 useEffect(()=>{try{setHistory(JSON.parse(localStorage.getItem('shopmind-chat-history')||'[]'));}catch{setHistory([]);}},[]);
 useEffect(()=>{localStorage.setItem('shopmind-chat-history',JSON.stringify(history));},[history]);
 const clearChat=()=>{setMessages([]);setResult(null);setQuery('');setError('');};
 const newChat=()=>{if(messages.length){setHistory(h=>[{id:Date.now(),title:messages.find(m=>m.type==='user')?.text||'New conversation',messages,result},...h].slice(0,12));}clearChat();};
 const openChat=(chat)=>{setMessages(chat.messages);setResult(chat.result||null);setQuery('');setError('');};
 const search=async()=>{if(!query.trim()||loading)return;const q=query.trim();setMessages(m=>[...m,{type:'user',text:q}]);setQuery('');setError('');
   const casualReplies=[
    [/^(hi|hello|hey|hai)\b[!. ]*$/i,'Hi! I\'m ShopMind AI. Tell me what you\'re shopping for, and I\'ll help you find the best options.'],
    [/^how are (you|u)\??$/i,'I\'m doing great and ready to help you shop smarter. What product are you looking for?'],
    [/^(thanks|thank you)\b[!. ]*$/i,'You\'re welcome! Tell me what you\'d like to shop for next.'],
    [/^(who are you|what can you do)\??$/i,'I\'m ShopMind AI. I compare products, prices, reviews and specifications to help you choose better.'],
   ];
  const casualReply=casualReplies.find(([pattern])=>pattern.test(q));
  setLoading(true);try{
   if(casualReply){setResult(null);setMessages(m=>[...m,{type:'ai',text:casualReply[1]}]);return;}
   const productIntent=/\b(laptop|phone|mobile|smartphone|shoes?|running|headphones?|earbuds?|airpods?|tablet|camera|gaming|product|price|under|buy|compare|recommend)\b/i.test(q);
   if(productIntent){const data=await searchProducts(q);setResult(data);setMessages(m=>[...m,{type:'ai',text:data.ai_summary}]);}
   else{setResult(null);const data=await chatMessage(q);setMessages(m=>[...m,{type:'ai',text:data.reply}]);}
  }catch(e){setError(e.message||'Unable to reach the shopping service.');}finally{setLoading(false)}};
 return <><style jsx global>{`@media (max-width: 900px) { .ai-sidebar { display: block; border-right: 0; border-bottom: 1px solid #deddd7; padding: 16px 18px; } .history-title { margin: 20px 0 8px; } .history-item { display: inline-block; width: calc(50% - 5px); margin-right: 5px; padding: 9px 6px; } }`}</style><main className="ai-page">
  <header className="ai-header"><Link href="/" className="ai-logo"><span>✦</span>shopmind<small>AI</small></Link><Link href="/" className="back-link">← Back to Shop</Link></header>
  <section className="ai-layout">
  <aside className="ai-sidebar"><button className="new-search" onClick={newChat}>+ New Chat</button><button className="clear-chat" onClick={clearChat}>Clear chat</button><div className="history-title">CHAT HISTORY</div>{history.length===0&&<p className="empty-history">Your chats will appear here.</p>}{history.map(chat=><button className="history-item" key={chat.id} onClick={()=>openChat(chat)} title={chat.title}>{chat.title}</button>)}</aside>
   <section className="ai-chat">
    <div className="chat-header"><div className="ai-avatar">✦</div><div><h1>AI Shopping Assistant</h1><p>Your personal shopping intelligence</p></div><div className="chat-tools"><button onClick={newChat}>+ New Chat</button><button onClick={clearChat}>Clear</button></div><div className="online"><span/> Online</div></div>
    <div className="chat-content">
     {messages.length===0&&<div className="welcome"><div className="big-ai">✦</div><h2>What are you looking for?</h2><p>Tell me what you need and I&apos;ll find, compare and recommend the best products.</p><div className="suggestions"><button onClick={()=>setQuery('Best laptop under ₹70,000 for coding and gaming')}>💻 Laptop for coding</button><button onClick={()=>setQuery('Best phone under ₹30,000 with a good camera')}>📱 Phone under ₹30K</button><button onClick={()=>setQuery('Best running shoes under ₹5,000')}>👟 Running shoes</button></div></div>}
     {messages.map((m,i)=><div key={i} className={'message '+m.type}>{m.type==='ai'&&<div className="message-avatar">✦</div>}<div className="message-bubble">{m.text}</div></div>)}
     {loading&&<div className="message ai"><div className="message-avatar">✦</div><div className="typing"><span/><span/><span/></div></div>}
    {error&&<div className="message ai"><div className="message-bubble">{error}</div></div>}
    {result&&<div className="results"><div className="results-header"><div><span className="eyebrow">AI MATCHED</span><h3>Best matches for you</h3></div><span>{result.products.length} results</span></div><div className="ai-products">{result.products.map(p=><article className="ai-product" key={p.id}><div className="ai-product-image"><span className="match">AI Match</span><div className="fake-laptop"><div/></div></div><div className="ai-product-body"><span className="store">{p.store}</span><h4>{p.name}</h4><p>{Object.values(p.specs||{}).join(' · ')}</p><div className="product-bottom"><strong>₹{p.price.toLocaleString('en-IN')}</strong><span>⭐ {p.rating}</span></div><div className="product-actions"><Link href={'/compare?product='+p.id} className="compare-btn">Compare</Link><a href={p.url} target="_blank" rel="noreferrer" className="compare-btn dark-action">View →</a></div></div></article>)}</div><div className="ai-verdict"><div className="verdict-icon">✦</div><div><span>AI VERDICT</span><h4>{result.ai_verdict||'No single winner'}</h4><p>{result.reasons?.join(' · ')}</p></div><strong>AI</strong></div></div>}
    </div>
    <div className="chat-input-wrapper"><div className="chat-input"><span>✦</span><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder="Ask anything about products..."/><button onClick={search}>→</button></div><small>ShopMind AI can make mistakes. Check product details before purchasing.</small></div>
   </section>
  </section>
 </main></>
}
