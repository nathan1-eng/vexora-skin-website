import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vexora Skin | LED Light Therapy Mask" },
      { name: "description", content: "Discover the Vexora Skin LED Light Therapy Mask and create a more intentional at-home skincare ritual." },
    ],
  }),
  component: Index,
});

type CartLine = { id: string; title: string; quantity: number; price: number | null; image: string };

const catalog = [
  {
    id: "led-mask",
    title: "LED Light Therapy Mask",
    category: "THE SIGNATURE DEVICE",
    description: "A distinctive nude-brown LED mask designed for your at-home skincare ritual.",
    price: null as number | null,
    priceLabel: "Price coming soon",
    image: "/assets/products/vexora-mask-front.png",
    available: true,
  },
  {
    id: "daily-serum",
    title: "Future Skincare Essential",
    category: "COMING SOON",
    description: "A new addition to the Vexora Skin collection, coming soon.",
    price: null as number | null,
    priceLabel: "Coming soon",
    image: "/assets/products/vexora-packaging.png",
    available: false,
  },
  {
    id: "skin-tools",
    title: "Beauty Tools",
    category: "COMING SOON",
    description: "More beauty essentials are in development.",
    price: null as number | null,
    priceLabel: "Coming soon",
    image: "/assets/products/vexora-mask-glow.png",
    available: false,
  },
];

const faqs = [
  { q: "How do I use the Vexora Skin mask?", a: "Start with clean, dry skin. Fit the mask comfortably, secure the straps, and follow the instructions supplied with your device. The product materials currently show a 10-minute session; always follow the final user manual for your exact model." },
  { q: "Can I use my usual skincare products?", a: "Keep your routine simple and follow the instructions for your device and skincare products. If you have a skin condition, are using photosensitising medication, or are unsure whether light therapy is suitable for you, ask a qualified healthcare professional before use." },
  { q: "When will the mask be available to order?", a: "We are preparing the Vexora Skin online store. Pricing, delivery details and checkout will be confirmed before orders open." },
  { q: "Will Vexora Skin offer more products?", a: "Yes. The store is designed to grow as we introduce additional skincare and beauty products. New items will be added to the shop when they are ready." },
];

function Index() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: (typeof catalog)[number]) => {
    if (!product.available) return;
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { id: product.id, title: product.title, quantity: 1, price: product.price, image: product.image }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (id: string, delta: number) => {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
  };

  return (
    <main className="vexora-site">
      <header className="vexora-nav">
        <a className="vexora-wordmark" href="#top" aria-label="Vexora Skin home">
          <span className="vexora-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M8 7 20 32 32 7"/><path d="M12 7 20 24 28 7"/></svg></span>
          <span>VEXORA <small>SKIN</small></span>
        </a>
        <nav className="vexora-links" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#technology">The technology</a>
          <a href="#ritual">How to use</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="nav-bag" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${cartCount} items`}>
          <span>Bag</span><span className="bag-count">{cartCount}</span>
        </button>
      </header>

      <div id="top" className="hero-intro">
        <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />
      </div>

      <section className="product-feature section-wrap" id="technology">
        <div className="feature-copy">
          <h2>Beauty technology, made personal.</h2>
          <p className="body-copy">Meet the Vexora Skin LED Light Therapy Mask. Its sculpted nude-brown design and built-in red LED lights bring a modern beauty-device experience into your own space.</p>
          <p className="body-copy subtle-copy">Designed for at-home routines, it is a simple way to set aside a little time for yourself. Follow the supplied instructions and make it part of the skincare ritual that works for you.</p>
          <a className="feature-link" href="#shop">Explore the mask <span aria-hidden="true">↗</span></a>
        </div>
        <div className="feature-visual">
          <img src="/assets/products/vexora-mask-glow.png" alt="Vexora Skin LED Light Therapy Mask illuminated with red LEDs" loading="lazy" />
          <div className="visual-note"><span>VEXORA SKIN</span><span>LED LIGHT THERAPY MASK</span></div>
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-wrap shop-heading">
          <div><p className="eyebrow">THE VEXORA EDIT</p><h2>Meet your new ritual.</h2></div>
          <p className="body-copy">Thoughtfully presented skincare technology, with more essentials to come.</p>
        </div>
        <div className="product-grid section-wrap">
          {catalog.map((product, index) => (
            <article className={`product-card ${!product.available ? "product-card--soon" : ""}`} id={product.id === "led-mask" ? "product-detail" : undefined} key={product.id}>
              <a className="product-image" href={product.available ? "#product-detail" : "#shop"} aria-label={`View ${product.title}`}>
                <img src={product.image} alt={product.available ? "Vexora Skin LED mask product view" : "Vexora Skin product packaging and brand detail"} loading="lazy" />
                {!product.available ? <span className="soon-stamp">COMING SOON</span> : <span className="image-arrow" aria-hidden="true">↗</span>}
              </a>
              <div className="product-info">
                <div><p className="product-category">{product.category}</p><h3>{product.title}</h3></div>
                <p className="product-price">{product.priceLabel}</p>
              </div>
              <p className="product-description">{product.description}</p>
              {product.available ? <button className="add-button" onClick={() => addToCart(product)}>Add to bag <span aria-hidden="true">+</span></button> : <span className="coming-note">A new ritual is in the making.</span>}
            </article>
          ))}
        </div>
      </section>

      <section className="ritual-section" id="ritual">
        <div className="ritual-image"><img src="/assets/products/vexora-how-to-use.png" alt="Illustrated guide showing how to prepare and wear the Vexora Skin LED mask" loading="lazy" /></div>
        <div className="ritual-copy">
          <h2>Simple steps. A slower moment.</h2>
          <ol className="ritual-steps">
            <li><span>01</span><div><h3>Prepare your skin</h3><p>Start with a clean, dry face before each session.</p></div></li>
            <li><span>02</span><div><h3>Fit the mask</h3><p>Place the mask comfortably and secure the straps without over-tightening.</p></div></li>
            <li><span>03</span><div><h3>Settle into your ritual</h3><p>Follow the instructions supplied with your exact device and relax during the session.</p></div></li>
          </ol>
          <p className="safety-note">Use only as directed in the final product manual. Stop use if you experience discomfort and seek professional advice if you are unsure whether LED light therapy is suitable for you.</p>
        </div>
      </section>

      <section className="spec-section">
        <div className="section-wrap spec-inner">
          <div className="spec-lead"><h2>Designed around your routine.</h2></div>
          <div className="spec-list">
            <div><span>01</span><strong>Red LED light</strong><p>Built-in red lights across the face-shaped mask.</p></div>
            <div><span>02</span><strong>At-home use</strong><p>A device designed to fit into your personal skincare routine.</p></div>
            <div><span>03</span><strong>10-minute session*</strong><p>The supplied product artwork lists a 10-minute session. Confirm against your final manual.</p></div>
          </div>
        </div>
      </section>

      <section className="faq-section section-wrap" id="faq">
        <div className="faq-heading"><p className="eyebrow">GOOD TO KNOW</p><h2>Your questions, answered.</h2><p className="body-copy">The essentials about bringing Vexora Skin into your routine.</p></div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={faq.q}>
              <button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{faq.q}</span><span className="faq-symbol" aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button>
              {openFaq === index && <p>{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="closing-band" id="contact">
        <div className="closing-orbit" aria-hidden="true"></div>
        <h2>Glow with confidence.</h2>
        <p>Make space for your skincare ritual.</p>
        <p className="contact-soon">Store and contact details will be added before launch.</p>
        <a className="closing-link" href="#faq">Explore the FAQs <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="vexora-footer">
        <a className="footer-wordmark" href="#top">VEXORA <small>SKIN</small></a>
        <span>Beauty technology for your at-home ritual.</span>
        <div><a href="#shop">Shop</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
        <small>© {new Date().getFullYear()} Vexora Skin. All rights reserved.</small>
      </footer>

      {cartOpen && <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2 id="cart-title">Your bag <span>({cartCount})</span></h2></div><button className="drawer-close" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button></div>
          {cart.length === 0 ? <div className="empty-bag"><span className="empty-mark">V</span><h3>Your bag is waiting.</h3><p>Explore the Vexora Skin LED Light Therapy Mask and start your ritual.</p><button className="drawer-shop" onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the shop <span>↗</span></button></div> : <>
            <div className="cart-lines">{cart.map((item) => <div className="cart-line" key={item.id}><img src={item.image} alt=""/><div className="cart-line-copy"><strong>{item.title}</strong><span>{item.price === null ? "Price coming soon" : `€${item.price.toFixed(2)}`}</span><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.title}`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.title}`}>+</button></div></div><button className="remove-line" onClick={() => setCart((current) => current.filter((line) => line.id !== item.id))} aria-label={`Remove ${item.title}`}>Remove</button></div>)}</div>
            <div className="cart-summary"><p><span>Subtotal</span><strong>{cart.some((item) => item.price === null) ? "Price to be confirmed" : `€${cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0).toFixed(2)}`}</strong></p><small>Shipping and final pricing will be shown once the store is configured.</small><button className="checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Continue <span>↗</span></button></div>
          </>}
        </aside>
      </div>}

      {checkoutOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false) }}>
        <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <button className="drawer-close modal-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">×</button>
          <p className="eyebrow">THE FINAL STEP</p><h2 id="checkout-title">Your ritual starts here.</h2>
          <p className="body-copy">The storefront design is in place, but online checkout is not connected yet. Before accepting real orders, add final product prices, a payment provider, shipping rates and order confirmation emails.</p>
          <div className="checkout-notice">No payment or order will be submitted from this preview.</div>
          <button className="checkout-button" onClick={() => { setCheckoutOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Back to the shop <span>↗</span></button>
        </section>
      </div>}
    </main>
  );
}
