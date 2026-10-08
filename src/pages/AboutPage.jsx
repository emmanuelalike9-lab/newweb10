import SiteHeader from '../layouts/SiteHeader';
import SiteFooter from '../layouts/SiteFooter';

export default function AboutPage({ query, setQuery, cartCount, user, onLogout, navigate }) {
  return (
    <div className="storefront">
      <div className="announcement">
        <span>GOOD THINGS, MADE CLOSE TO HOME</span>
        <span>Thoughtful furniture for everyday living</span>
      </div>

      <SiteHeader query={query} setQuery={setQuery} cartCount={cartCount} user={user} onLogout={onLogout} navigate={navigate} />

      <main className="info-page about-page">
        <section className="info-hero about-hero" aria-labelledby="about-title">
          <div className="info-hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A LITTLE MORE ABOUT US</p>
            <h1 id="about-title">A home is made<br />one <em>good thing</em><br />at a time.</h1>
            <p>Sammi's Furnishings is a thoughtful edit of furniture for the way we really live: pieces with purpose, character, and room to become part of your story.</p>
          </div>
          <figure className="about-image">
            <img src="/images/products/sf-006.jpeg" alt="A considered home workspace with a warm wooden desk" />
            <figcaption>MADE FOR EVERYDAY RITUALS</figcaption>
          </figure>
        </section>

        <section className="about-values" aria-label="What guides our collection">
          <div>
            <span>01</span>
            <h2>Choose with care.</h2>
            <p>We look for useful forms, honest materials, and details that make a space feel more like yours.</p>
          </div>
          <div>
            <span>02</span>
            <h2>Live with it.</h2>
            <p>Furniture should be part of everyday life: welcoming, comfortable, and made to be used.</p>
          </div>
          <div>
            <span>03</span>
            <h2>Keep what matters.</h2>
            <p>We favor pieces with lasting character over passing trends, so good things can stay with you.</p>
          </div>
        </section>

        <section className="about-note">
          <p className="eyebrow">THE SAMMI'S FURNISHINGS DIFFERENCE</p>
          <h2>Less filling a room.<br /><em>More making it yours.</em></h2>
          <a className="text-link" href="/shop">Explore the collection <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <SiteFooter navigate={navigate} />
    </div>
  );
}