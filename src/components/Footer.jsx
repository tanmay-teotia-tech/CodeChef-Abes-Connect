// src/components/Footer.jsx
// Simple footer with club branding and quick links.

import { Link } from "react-router-dom";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          {/* Brand side */}
          <div>
            <div className="footer__brand-name">&lt;/&gt; CodeChef</div>
            <div className="footer__brand-college">
              ABES Engineering College, Ghaziabad
            </div>
            <div className="footer__tagline">// Code. Compete. Create.</div>
          </div>

          {/* Quick links */}
          <div>
            <div className="footer__links-title">// quick_links</div>
            <ul className="footer__links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/events">All Events</Link>
              </li>
              <li>
                <Link to="/register">Register for Event</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          © {CURRENT_YEAR} CodeChef Chapter — ABES Engineering College &nbsp;|&nbsp;
          Built with ❤️ by club members
        </div>
      </div>
    </footer>
  );
}
