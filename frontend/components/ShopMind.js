'use client';

import { useState } from "react";

const products = [
  { store: "AMAZON", rating: "4.7", name: "ASUS TUF Gaming A15", desc: "Ryzen 7 · 16GB · RTX 3050", price: "₹68,990", old: "₹76,990", type: "laptop", badge: "AI PICK" },
  { store: "MYNTRA", rating: "4.6", name: "Nike Pegasus 41", desc: "Men's road running shoes", price: "₹4,995", old: "₹8,295", type: "shoe", badge: "TRENDING" },
  { store: "FLIPKART", rating: "4.5", name: "Nothing Phone (3a)", desc: "8GB · 128GB · 50MP camera", price: "₹24,999", old: "₹27,999", type: "phone", badge: "BEST VALUE" }
];

export default function ShopMind() {
  const [query, setQuery] = useState("");
  const [thinking, setThinking] = useState(false);

  const askAI = () => {
    if (!query.trim()) return;
    setThinking(true);
    setTimeout(() => setThinking(false), 2600);
  };

  const useSuggestion = (text) => setQuery(text);

  return (
    <>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="nav">
        <a className="brand" href="#">
          <span className="brand-mark">✦</span>
          <span>shop<span>mind</span></span>
          <small>AI</small>
        </a>

        <nav className="nav-links">
          <a href="#discover">Discover</a>
          <a href="/trending">Trending</a>
          <a href="/compare">Compare</a>
          <a href="#how">How it works</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn">⌕</button>
          <button className="cart-btn">Bag <b>2</b></button>
          <button className="profile">SK</button>
        </div>
      </header>

      <main>
        <section className="hero" id="discover">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span /> Your personal AI shopping agent</div>
            <h1>Don&apos;t search.<br /><em>Just ask.</em></h1>
            <p>
              Tell ShopMind what you need. Our AI understands your intent,
              compares products and finds the smartest choice across your favorite stores.
            </p>

            <div className="ai-search">
              <div className="search-icon">✦</div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && askAI()}
                placeholder="Try “Best laptop under ₹70,000 for coding & gaming”"
              />
              <button onClick={askAI}>Ask AI <span>→</span></button>
            </div>

            <div className="chips">
              {[
                "Best laptop under ₹70,000 for coding & gaming",
                "Running shoes under ₹5,000 with great reviews",
                "Best phone under ₹30,000 with a great camera"
              ].map((text) => (
                <button key={text} onClick={() => useSuggestion(text)}>
                  {text.startsWith("Best laptop") ? "Laptop for coding" :
                   text.startsWith("Running") ? "Running shoes" : "Phone under ₹30K"}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-orbit reveal">
            <div className="orbit-card orbit-back">
              <span>AI MATCH</span><strong>94%</strong><small>perfect fit</small>
            </div>
            <div className="orbital-ring ring-one" />
            <div className="orbital-ring ring-two" />

            <div className="hero-product">
              <div className="product-glow" />
              <div className="floating-tag">✦ AI PICK</div>
              <div className="laptop">
                <div className="screen"><div className="screen-lines" /></div>
                <div className="base" />
              </div>
              <div className="price-pill">₹68,990 <small>Best value</small></div>
            </div>

            <div className="mini-float float-one">⚡ Fast delivery</div>
            <div className="mini-float float-two">♡ 4.8 rating</div>
          </div>
        </section>

        <section className="stats reveal">
          <div><strong>2.4M+</strong><span>products indexed</span></div>
          <div><strong>18+</strong><span>shopping categories</span></div>
          <div><strong>94%</strong><span>AI match accuracy</span></div>
          <div><strong>1</strong><span>smart decision</span></div>
        </section>

        <section className="section" id="trending">
          <div className="section-head reveal">
            <div><span className="eyebrow">CURATED FOR YOU</span><h2>Trending right now.</h2></div>
            <a href="#trending">View all <span>→</span></a>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card reveal" key={product.name}>
                <div className={`product-image ${product.type}-bg`}>
                  <span className={`badge ${product.badge === "TRENDING" ? "dark" : ""}`}>{product.badge}</span>
                  {product.type === "laptop" && <div className="device laptop-small" />}
                  {product.type === "shoe" && <div className="shoe">◢</div>}
                  {product.type === "phone" && <div className="phone" />}
                </div>
                <div className="product-info">
                  <div className="store">{product.store} <span>•</span> {product.rating} ★</div>
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                  <div className="price">{product.price} <del>{product.old}</del></div>
                  <button className="outline-btn">View comparison</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-banner reveal" id="compare">
          <div className="ai-banner-copy">
            <span className="eyebrow">BUILT DIFFERENT</span>
            <h2>Shopping, but with<br /><em>a second brain.</em></h2>
            <p>
              ShopMind weighs price, specifications, reviews, delivery and your
              personal priorities before making a recommendation.
            </p>
            <button className="primary-btn" onClick={() => setThinking(true)}>
              Try an AI recommendation <span>→</span>
            </button>
          </div>

          <div className="recommendation">
            <div className="rec-top"><span>✦ AI RECOMMENDATION</span><b>92 / 100</b></div>
            <div className="rec-product">
              <div className="rec-avatar">ASUS</div>
              <div><strong>ASUS TUF Gaming A15</strong><small>Best match for coding + gaming</small></div>
            </div>
            {[
              ["Performance", "94%"],
              ["Value", "91%"],
              ["Reviews", "89%"]
            ].map(([label, width]) => (
              <div className="score-row" key={label}>
                <span>{label}</span><div><i style={{ width }} /></div><b>{width.replace("%","")}</b>
              </div>
            ))}
            <div className="why"><span>✦</span> “The strongest performance-to-price balance for your use case.”</div>
          </div>
        </section>

        <section className="section how" id="how">
          <div className="section-head reveal">
            <div><span className="eyebrow">HOW IT WORKS</span><h2>From thought to cart.</h2></div>
          </div>
          <div className="steps">
            {[
              ["01", "⌕", "Tell us", "Describe what you want in natural language. No filters. No endless scrolling."],
              ["02", "✦", "AI thinks", "Our agent understands your intent and evaluates the right products."],
              ["03", "↗", "Choose better", "Compare options and get one clear recommendation you can trust."]
            ].map(([number, icon, title, text]) => (
              <div className="step reveal" key={number}>
                <span>{number}</span><div className="step-icon">{icon}</div>
                <h3>{title}</h3><p>{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {thinking && (
        <div className="toast show">
          <span>✦</span>
          <div><strong>AI is thinking...</strong><small>Comparing products across stores</small></div>
        </div>
      )}

      <footer>
        <div className="brand"><span className="brand-mark">✦</span><span>shop<span>mind</span></span><small>AI</small></div>
        <p>Search less. Choose better.</p>
        <span>© 2026 ShopMind</span>
      </footer>
    </>
  );
}
