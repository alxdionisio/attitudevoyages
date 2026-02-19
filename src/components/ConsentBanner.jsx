import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getConsent,
  setConsent,
  pushConsentAccepted,
  pushConsentRefused,
} from "../utils/tracking";
import { updateConsent } from "../utils/ga4";
import "./ConsentBanner.css";

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === null) setVisible(true);
  }, []);

  const handleAccept = () => {
    setConsent(true);
    pushConsentAccepted();
    updateConsent(true);
    setVisible(false);
  };

  const handleRefuse = () => {
    setConsent(false);
    pushConsentRefused();
    updateConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="consent-banner" role="dialog" aria-label="Choix des cookies et du suivi">
      <div className="consent-banner-inner">
        <p className="consent-banner-text">
          Nous utilisons des cookies et des outils de mesure d'audience pour améliorer votre expérience et notre site.
          En acceptant, vous autorisez le suivi conforme à notre{" "}
          <Link to="/politique-confidentialite" className="consent-banner-link">
            politique de confidentialité
          </Link>
          .
        </p>
        <div className="consent-banner-actions">
          <button
            type="button"
            onClick={handleRefuse}
            className="consent-banner-btn consent-banner-btn--refuse"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="consent-banner-btn consent-banner-btn--accept"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
