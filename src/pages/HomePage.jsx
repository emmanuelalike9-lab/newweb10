import SiteHeader from '../layouts/SiteHeader';
import SiteFooter from '../layouts/SiteFooter';

export default function HomePage({
  query,
  setQuery,
  cartCount,
  user,
  onLogout,
  navigate,
}) {
  return (
    <div className="storefront">
      <div className="announcement">
        <span>GOOD THINGS, MADE CLOSE TO HOME</span>
        <span>Complimentary delivery on orders over ₦1,000,000</span>
      </div>

      <SiteHeader query={query} setQuery={setQuery} cartCount={cartCount} user={user} onLogout={onLogout} navigate={navigate} />

      <main id="top" className="page-shell">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A LITTLE MORE LOCAL</p>
            <h1 id="hero-title">Make room<br />for <em>good living.</em></h1>
            <p className="hero-description">Thoughtful furniture, made by independent hands. Find the pieces that feel like they’ve always belonged.</p>
            <a className="hero-link" href="/shop">Explore the collection <span aria-hidden="true">↘</span></a>
            <div className="hero-footnote"><span className="sparkle" aria-hidden="true">✳</span> Made slowly. Kept forever.</div>
          </div>

          <div className="hero-art" aria-label="A collection of thoughtfully made furniture">
            <div className="hero-photo hero-photo-main"><img src="/images/products/sf-003.jpeg" alt="Handmade pale linen loveseat by Fobath Studio" /></div>
            <div className="hero-photo hero-photo-small"><img src="/images/products/sf-010.jpeg" alt="Warm oak record console crafted by an independent maker" /></div>
            <div className="hero-stamp"><span>GOOD<br />BY DESIGN</span><span className="stamp-star">✳</span></div>
            <span className="photo-caption">THE SUNDAY LOVeseat <span>01 / 03</span></span>
            <span className="hero-asterisk" aria-hidden="true">✳</span>
          </div>
          <div className="hero-index"><span>01</span><span className="index-rule" /><span>03</span></div>
        </section>

        <section className="value-strip" id="values" aria-label="Our marketplace values">
          <p>NOT JUST FURNITURE.<br /><span>FAMILIAR SPACES.</span></p>
          <div className="value-note"><span className="value-dot" /> Thoughtful pieces, always</div>
          <div className="value-note"><span className="value-dot" /> Built for real life</div>
          <div className="value-note"><span className="value-dot" /> Made with a little more care</div>
          <a href="#story">The Sammi's Furnishings difference <span aria-hidden="true">↗</span></a>
        </section>

        <section className="story-feature" id="story">
          <div className="story-feature-image">
            <img src="/images/products/sf-006.jpeg" alt="A handmade desk and chair photographed in a warmly lit studio" />
            <span className="image-note">A GOOD DAY IN THE STUDIO · ACCRA</span>
          </div>
          <div className="story-feature-copy">
            <p className="eyebrow">A NOTE FROM HOME</p>
            <h2>Made for everyday rituals.<br /><em>Built to last.</em></h2>
            <p>Every piece on Sammi's Furnishings is chosen for how it feels in real life: useful, warm, and worth the room it takes up.</p>
            <a href="/shop" className="text-link">Browse the collection <span aria-hidden="true">↗</span></a>
            <span className="story-feature-mark" aria-hidden="true">s.</span>
          </div>
        </section>
      </main>

      <SiteFooter navigate={navigate} />
    </div>
  );
}
