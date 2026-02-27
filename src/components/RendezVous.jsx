import React from "react";
import { InlineWidget } from "react-calendly";
import { CALENDLY_URL } from "../config/calendly";
import "./RendezVous.css";

const RendezVous = () => {
  return (
    <section className="rendez-vous" id="rendez-vous">
      <div className="container">
        <div className="rdv-content">
          <div className="rdv-info">
            <span className="section-subtitle">Rencontrons-nous</span>
            <h2 className="section-title">
              Réservez votre
              <br />
              rendez-vous
            </h2>

            <p className="rdv-description">
              Choisissez une date puis un créneau parmi les disponibilités
              affichées. Discutons de votre projet de voyage autour d'un café.
            </p>

            <div className="rdv-details">
              <div className="detail-item">
                <div className="detail-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Adresse</h4>
                  <p>
                    1 Rue des Rolliers
                    <br />
                    30820 Caveirac
                  </p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92V19.92C22 20.4728 21.5523 20.9208 21 20.92C9.95 20.47 2 12.52 2 1.5C2 0.947715 2.44772 0.5 3 0.5H6C6.55228 0.5 7 0.947715 7 1.5C7 3.24 7.56 4.86 8.5 6.2C8.66 6.41 8.61 6.72 8.41 6.88L6.5 8.38C7.81 11.21 10.29 13.69 13.12 14.99L14.62 13.09C14.78 12.89 15.09 12.84 15.3 13C16.64 13.94 18.26 14.5 20 14.5C20.5523 14.5 21 14.9477 21 15.5V18.5C21 19.0523 20.5523 19.5 20 19.5H17C16.4477 19.5 16 19.0523 16 18.5V17.08"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Téléphone</h4>
                  <p>04 66 37 48 63</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Horaires</h4>
                  <p>
                    Lun - Ven : 9h30 - 12h, 14h - 18h
                    <br />
                    Sam - Dim : Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rdv-calendly-wrapper">
            <InlineWidget
              url={CALENDLY_URL}
              styles={{ height: "100%", width: "100%", minHeight: "950px" }}
              locale="fr"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RendezVous;
