import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPathWithoutBasename } from "../config/site";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // état initial au changement de page
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const pathWithoutBase = getPathWithoutBasename(location.pathname);
  const isHomeAtTop = pathWithoutBase === "/" && !scrolled;
  const useWhiteHeader = !isHomeAtTop;

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/destinations", label: "Destinations" },
    { to: "/a-propos", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`header ${useWhiteHeader ? "header--glass" : ""} ${mobileMenuOpen ? "header--menu-open" : ""}`}
      role="banner"
    >
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img
              src={`${import.meta.env.BASE_URL}Logo%20Attitude%20Voyages${(useWhiteHeader || mobileMenuOpen) ? "" : "%20blanc"}.png`}
              alt="Attitude Voyages"
              className="logo-image"
            />
          </Link>

          <nav className={`nav ${mobileMenuOpen ? "nav--open" : ""}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${pathWithoutBase === link.to ? "nav-link--active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact#rdv" className="nav-link nav-link--cta">
              Prendre RDV
            </Link>
          </nav>

          <button
            type="button"
            className={`mobile-menu-toggle ${mobileMenuOpen ? "mobile-menu-toggle--open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
