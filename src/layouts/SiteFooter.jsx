export default function SiteFooter({ navigate }) {
  return (
    <footer className="site-footer">
      <a className="wordmark footer-wordmark" href="#top" onClick={(event) => { event.preventDefault(); navigate('/'); }}>
        <span className="wordmark-icon">s.</span>sammi's furnishings<span className="wordmark-period">.</span>
      </a>
      <p>Good things are made together.</p>
      <span>Independent furniture, thoughtfully curated. © 2025 Sammi's Furnishings.</span>
      <a href="#top" onClick={(event) => { event.preventDefault(); navigate('/'); }}>Back to the good stuff ↑</a>
    </footer>
  );
}
