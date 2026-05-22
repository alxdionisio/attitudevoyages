import React, { useMemo } from "react";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import BookingWidget from "../components/BookingWidget";
import { getBaseUrl } from "../config/site";
import "./ReservationPage.css";

const ReservationPage = () => {
  const baseUrl = getBaseUrl();
  const reservationActionJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/reservation`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
        inLanguage: "fr-FR",
      },
      result: {
        "@type": "Reservation",
        reservationStatus: "https://schema.org/ReservationPending",
        provider: { "@id": `${baseUrl}/#organization` },
      },
    }),
    [baseUrl]
  );

  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="Réserver un rendez-vous"
        description="Prenez rendez-vous en ligne avec Annie ou Jade, conseillères chez Attitude Voyages. Premier contact, devis sur mesure ou bilan voyage — choisissez votre créneau."
        canonical="/reservation"
        breadcrumbs={[
          { label: "Accueil", path: "/" },
          { label: "Réserver", path: "/reservation" },
        ]}
        jsonLd={[reservationActionJsonLd]}
      />

      <section className="reservation-hero">
        <div className="reservation-hero-bg" aria-hidden="true" />
        <div className="reservation-hero-content">
          <span className="reservation-hero-eyebrow">Prise de rendez-vous</span>
          <h1 className="reservation-hero-title">
            Préparons votre prochain voyage,
            <br />
            ensemble.
          </h1>
          <p className="reservation-hero-lede">
            Choisissez un créneau qui vous arrange. Nous prenons le temps d'écouter
            votre projet avant de proposer un itinéraire.
          </p>
        </div>
      </section>

      <section className="reservation-section">
        <div className="page-container">
          <Breadcrumb
            items={[
              { label: "Accueil", path: "/" },
              { label: "Réserver" },
            ]}
          />

          <div className="reservation-grid">
            <aside className="reservation-aside" aria-label="Informations pratiques">
              <div className="reservation-info-card">
                <h2 className="reservation-info-title">Comment ça marche</h2>
                <ol className="reservation-steps">
                  <li>
                    <strong>Choisissez le type</strong> qui correspond à votre besoin
                    (premier contact, devis détaillé, bilan retour).
                  </li>
                  <li>
                    <strong>Choisissez un créneau</strong> dans la liste des disponibilités
                    (60 jours à l'avance, du mardi au vendredi).
                  </li>
                  <li>
                    <strong>Recevez la confirmation</strong> par email immédiatement et
                    nous nous appelons / rencontrons à la date choisie.
                  </li>
                </ol>
              </div>

              <div className="reservation-info-card">
                <h2 className="reservation-info-title">Préférer un autre canal&nbsp;?</h2>
                <ul className="reservation-channels">
                  <li>
                    <span className="reservation-channel-label">Téléphone</span>
                    <a href="tel:+33466374863" className="reservation-channel-link">
                      04&nbsp;66&nbsp;37&nbsp;48&nbsp;63
                    </a>
                  </li>
                  <li>
                    <span className="reservation-channel-label">E-mail</span>
                    <a
                      href="mailto:contact@attitude-voyages.fr"
                      className="reservation-channel-link"
                    >
                      contact@attitude-voyages.fr
                    </a>
                  </li>
                  <li>
                    <span className="reservation-channel-label">Sur place</span>
                    <span>1 Rue des Rolliers,<br />30820 Caveirac</span>
                  </li>
                  <li>
                    <span className="reservation-channel-label">Horaires</span>
                    <span>Lun–Ven&nbsp;9h30–12h · 14h–18h<br />Samedi, dimanche fermé</span>
                  </li>
                </ul>
              </div>
            </aside>

            <div className="reservation-widget-wrap">
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReservationPage;
