export function SiteFooter({ copy, workHref, bookHref }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand brand-link" href="index.html">
            <img className="logo-img" src="assets/logo-transparent.png" alt="Ruzo Tech logo" />
            <div className="logo-type">
              <span className="logo-name">Ruzo Tech</span>
              <span className="logo-tag">Websites & Apps</span>
            </div>
          </a>
          <p className="footer-copy">{copy}</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-title">Explore</p>
            <a href="services.html">Services</a>
            <a href="about.html">About us</a>
            <a href={workHref}>Work</a>
          </div>
          <div>
            <p className="footer-title">Contact</p>
            <a href="mailto:contact@ruzotech.com">contact@ruzotech.com</a>
            <a href={bookHref}>Book a call</a>
          </div>
          <div>
            <p className="footer-title">Legal</p>
            <a href="terms.html">Terms of Service</a>
            <a href="privacy.html">Privacy Policy</a>
            <a href="cookies.html">Cookie Policy</a>
          </div>
        </div>
        <div className="footer-meta">
          <p>Based worldwide. Working with founders and product teams.</p>
        </div>
      </div>
    </footer>
  );
}
