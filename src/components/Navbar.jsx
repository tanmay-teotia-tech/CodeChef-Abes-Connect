// src/components/Navbar.jsx
// Sticky top navigation bar with mobile hamburger collapse.

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  // controls whether the mobile menu is visible
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-name">&lt;/&gt; CodeChef</span>
          <span className="navbar__logo-sub">ABES Engineering College, Ghaziabad</span>
        </Link>

        {/* Desktop nav links */}
        <nav aria-label="Primary navigation">
          <ul className="navbar__links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "navbar__link" + (isActive ? " active" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  "navbar__link" + (isActive ? " active" : "")
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <Link to="/register" className="btn btn-primary navbar__cta">
                Register
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger button (mobile only) */}
        <button
          className="navbar__burger"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile dropdown */}
      <nav
        className={`navbar__mobile${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "navbar__link" + (isActive ? " active" : "")
          }
          onClick={closeMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            "navbar__link" + (isActive ? " active" : "")
          }
          onClick={closeMenu}
        >
          Events
        </NavLink>
        <Link
          to="/register"
          className="btn btn-primary"
          onClick={closeMenu}
          style={{ marginTop: "0.25rem", textAlign: "center" }}
        >
          Register
        </Link>
      </nav>
    </header>
  );
}
