import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <h3>Attitude Voyages</h3>
              <p className="footer-tagline">Votre agence de voyage à Caveirac</p>
            </Link>
            <p className="footer-description">
              Depuis 2009, nous créons des voyages sur mesure qui transforment 
              vos rêves d'évasion en souvenirs inoubliables.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/attitudevoyages/" aria-label="Facebook" className="social-link" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M20 10C20 4.48 15.52 0 10 0S0 4.48 0 10c0 4.84 3.44 8.87 8 9.8V13H6v-3h2V8c0-2 1-3 3-3h2v3h-1c-.55 0-1 .45-1 1v1h2v3h-2v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/attitudevoyages/?hl=fr" aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C7.28 0 6.94 0 5.88 0.05C2.8 0.22 0.22 2.8 0.05 5.88C0 6.94 0 7.28 0 10s0 3.06 0.05 4.12c0.17 3.08 2.75 5.66 5.83 5.83C6.94 20 7.28 20 10 20s3.06 0 4.12-0.05c3.07-0.17 5.66-2.75 5.83-5.83C20 13.06 20 12.72 20 10s0-3.06-0.05-4.12C19.78 2.8 17.2 0.22 14.12 0.05C13.06 0 12.72 0 10 0zm0 1.8c2.67 0 2.99 0.01 4.04 0.06 2.28 0.1 3.99 1.82 4.09 4.09 0.05 1.05 0.06 1.37 0.06 4.04s-0.01 2.99-0.06 4.04c-0.1 2.27-1.81 3.99-4.09 4.09-1.05 0.05-1.37 0.06-4.04 0.06s-2.99-0.01-4.04-0.06c-2.28-0.1-3.99-1.82-4.09-4.09C1.81 12.99 1.8 12.67 1.8 10s0.01-2.99 0.06-4.04c0.1-2.27 1.82-3.99 4.09-4.09C7 1.81 7.33 1.8 10 1.8zm0 3.04c-2.84 0-5.16 2.32-5.16 5.16s2.32 5.16 5.16 5.16 5.16-2.32 5.16-5.16-2.32-5.16-5.16-5.16zm0 8.52c-1.85 0-3.36-1.51-3.36-3.36s1.51-3.36 3.36-3.36 3.36 1.51 3.36 3.36-1.51 3.36-3.36 3.36zm5.38-9.72c-.66 0-1.2.54-1.2 1.2s.54 1.2 1.2 1.2 1.2-.54 1.2-1.2-.54-1.2-1.2-1.2z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/a-propos">À propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/contact">Prendre RDV</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Nos offres</h4>
            <ul className="footer-links">
              <li><Link to="/offre/circuit-sri-lanka-eveil-des-sens">Sri Lanka – Éveil des sens</Link></li>
              <li><Link to="/offre/sejour-albanie-tout-inclus">Albanie – Tout inclus</Link></li>
              <li><Link to="/offre/sejour-sanur-bali">Bali – Prama Sanur 5*</Link></li>
              <li><Link to="/offre/sejour-jimbaran-bali">Bali – Anja Jimbaran 4*</Link></li>
              <li><Link to="/offre/circuit-bali-lombok-privatif">Circuit Bali & Lombok</Link></li>
              <li><Link to="/offre/croisiere-kuoni-royal-clipper-perles-de-mediterranee">Royal Clipper (Kuoni) – Perles de Méditerranée</Link></li>
              <li><Link to="/destinations">Toutes nos destinations</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Informations</h4>
            <ul className="footer-links">
              <li><Link to="/cgv">CGV</Link></li>
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
              <li><Link to="/politique-confidentialite">Politique de confidentialité</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-certifications">
            <span className="certification-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              N° SIRET 51168923400017
            </span>
            <span className="certification-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Licence IM 030 100 020
            </span>
            <span className="certification-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 5.5L15 6.5L11.5 10L12.5 15L8 12.5L3.5 15L4.5 10L1 6.5L6 5.5L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              Assurance RCP HISCOX
            </span>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} - Attitude Voyages. 
            Conçu avec passion par <a href="https://bymodule.com" target="_blank" rel="noopener noreferrer">Module</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
