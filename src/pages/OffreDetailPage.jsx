import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getOffreBySlug } from "../data/offres";
import { getBaseUrl } from "../config/site";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import "./Pages.css";

const iconMap = {
  sunset: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  boat: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M5 7h14l-2 6H7L5 7z" />
    </svg>
  ),
  culture: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  relax: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  wildlife: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935" />
    </svg>
  ),
  landscape: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  beach: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  guide: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  temple: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h3m-3 4h3m4-4h3m-3 4h3" />
    </svg>
  ),
  food: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  nature: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  wellness: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  road: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  canyon: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
    </svg>
  ),
  desert: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  nightlife: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  aurora: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  hotspring: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
  glacier: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  waterfall: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  medina: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h3m-3 4h3m4-4h3m-3 4h3" />
    </svg>
  ),
  ocean: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935" />
    </svg>
  ),
  hike: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-3 3m-6 2l2.5-2.5M9 17l-2.5-2.5M9 17h4" />
    </svg>
  ),
};

const defaultIcon = (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const OffreDetailPage = () => {
  const { slug } = useParams();
  const offre = getOffreBySlug(slug);

  if (!offre) return <Navigate to="/destinations" replace />;

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Destinations", path: "/destinations" },
    { label: offre.title },
  ];

  const offerJsonLd = useMemo(() => {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl.replace(/\/$/, "")}/offre/${offre.slug}`;
    const priceStr = offre.price && offre.price !== "Sur devis"
      ? offre.price.replace(/\s/g, "").replace(",", ".").replace(/[^\d.]/g, "")
      : "";
    const priceNum = priceStr ? parseFloat(priceStr, 10) : NaN;
    const hasValidPrice = Number.isFinite(priceNum) && priceNum > 0;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: offre.title,
      description: offre.shortDescription || `${offre.destination} - ${offre.duration}. ${offre.title}.`,
      image: offre.image,
      url,
      brand: { "@type": "Brand", name: "Attitude Voyages" },
      ...(hasValidPrice
        ? {
            offers: {
              "@type": "Offer",
              price: priceNum,
              priceCurrency: "EUR",
              url,
            },
          }
        : {}),
    };
  }, [offre]);

  return (
    <div className="offre-detail">
      <SEO
        title={offre.title}
        description={offre.shortDescription || `${offre.destination} - ${offre.duration}. ${offre.title} par Attitude Voyages.`}
        canonical={`/offre/${offre.slug}`}
        breadcrumbs={breadcrumbItems}
        ogImage={offre.image}
        jsonLd={[offerJsonLd]}
      />
      <section className="offre-detail-hero">
        <div className="offre-detail-hero-bg">
          <img src={offre.image} alt={offre.title} />
          <div className="offre-detail-hero-overlay" />
        </div>
        <div className="offre-detail-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "var(--color-white)" }}
          >
            <span className="offre-detail-hero-meta">
              {offre.destination} · {offre.duration}
            </span>
            <h1 className="offre-detail-hero-title">{offre.title}</h1>
            <p className="offre-detail-hero-desc">{offre.shortDescription}</p>
            {offre.promoNote && (
              <p className="offre-detail-hero-promo-note">{offre.promoNote}</p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="offre-detail-body">
        <div className="offre-detail-body__main">
          <Breadcrumb items={breadcrumbItems} />

          {offre.descriptionSejour && (
            <motion.section
              className="offre-detail-section offre-detail-block offre-detail-block--description"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="offre-detail-block__title">Description du lieu</h2>
              <p className="offre-detail-prose">{offre.descriptionSejour}</p>
            </motion.section>
          )}

          <motion.section
            className="offre-detail-section"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Points forts</h2>
            <div className="offre-detail-points">
              {offre.pointsForts.map((pf, i) => (
                <div key={i} className="offre-detail-point">
                  <div className="offre-detail-point-icon">
                    {iconMap[pf.icon] || defaultIcon}
                  </div>
                  <div>
                    <h3>{pf.title}</h3>
                    <p>{pf.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {offre.hebergementTitre && (
            <motion.section
              className="offre-detail-section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>{offre.hebergementTitre}</h2>
              {offre.hebergementNom && <h3 className="offre-detail-h3">{offre.hebergementNom}</h3>}
              {offre.hebergementDescription && (
                <div className="offre-detail-prose offre-detail-prose--multiline">
                  {offre.hebergementDescription.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {offre.hebergementPrevu && (
                <>
                  <h3 className="offre-detail-h3">Les hôtels prévus (ou similaires)</h3>
                  <p className="offre-detail-prose">{offre.hebergementPrevu}</p>
                </>
              )}
              {offre.classificationNote && (
                <>
                  <h3 className="offre-detail-h3">Classification hôtelière</h3>
                  <p className="offre-detail-prose">{offre.classificationNote}</p>
                </>
              )}
            </motion.section>
          )}

          <motion.section
            className="offre-detail-section"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {offre.programmeActivites?.length > 0 ? (
              <>
                <h2>Au programme</h2>
                {offre.itineraireNote && (
                  <p className="offre-detail-itinerary-note">{offre.itineraireNote}</p>
                )}
                <ul className="offre-detail-activites" role="list">
                  {offre.programmeActivites.map((activite, i) => (
                    <motion.li
                      key={i}
                      className="offre-detail-activite"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                    >
                      <span className="offre-detail-activite-marker" aria-hidden="true" />
                      <div className="offre-detail-activite-body">
                        <span className="offre-detail-activite-titre">{activite.titre}</span>
                        {activite.description && <p>{activite.description}</p>}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2>Itinéraire</h2>
                {offre.itineraireNote && (
                  <p className="offre-detail-itinerary-note">{offre.itineraireNote}</p>
                )}
                <div className="offre-detail-timeline">
                  <div className="offre-detail-timeline-line" aria-hidden="true" />
                  {offre.itineraire?.map((step) => (
                    <div key={step.jour} className="offre-detail-timeline-item">
                      <div className="offre-detail-timeline-day">{step.jour}</div>
                      <div className="offre-detail-timeline-content">
                        <h3>Jour {step.jour} · {step.titre}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.section>

          {offre.prixComprend && offre.prixComprend.length > 0 && (
            <motion.section
              className="offre-detail-section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Ce prix comprend</h2>
              <ul className="offre-detail-list offre-detail-list--check">
                {offre.prixComprend.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {offre.prixComprendNote && (
                <p className="offre-detail-block-note">{offre.prixComprendNote}</p>
              )}
            </motion.section>
          )}

          {offre.prixNeComprendPas && offre.prixNeComprendPas.length > 0 && (
            <motion.section
              className="offre-detail-section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Ce prix ne comprend pas</h2>
              <ul className="offre-detail-list offre-detail-list--cross">
                {offre.prixNeComprendPas.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.section>
          )}

          {offre.bonASavoir && (
            <motion.section
              className="offre-detail-section offre-detail-block offre-detail-block--info"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="offre-detail-block__title">Bon à savoir</h2>
              <div className="offre-detail-prose offre-detail-prose--multiline">
                {offre.bonASavoir.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.section>
          )}

          {offre.attention && (
            <motion.section
              className="offre-detail-section offre-detail-block offre-detail-block--warning"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="offre-detail-block__title">Attention</h2>
              <p className="offre-detail-prose">{offre.attention}</p>
            </motion.section>
          )}
        </div>

        <div className="offre-detail-body__sidebar">
          <motion.aside
            className="offre-detail-sidebar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="offre-detail-booking">
              <div className="offre-detail-booking-header">
                {offre.promoLabel && (
                  <p className="offre-detail-booking-promo">{offre.promoLabel}</p>
                )}
                <p className="offre-detail-booking-duration">{offre.duration}</p>
                {offre.price !== "Sur devis" && (
                  <>
                    <span className="offre-detail-booking-price-label">à partir de</span>
                    <p className="offre-detail-booking-price-value">
                      {offre.priceBefore && (
                        <span className="offre-detail-booking-price-before">{offre.priceBefore}</span>
                      )}
                      {offre.price}
                    </p>
                    {offre.promoDiscountPercent && offre.promoDiscountUntil && (
                      <p className="offre-detail-booking-discount">
                        Remise {offre.promoDiscountPercent} pour toute réservation avant le{" "}
                        {offre.promoDiscountUntil}
                      </p>
                    )}
                  </>
                )}
                {offre.dateDebut && !offre.dateFin && (
                  <p className="offre-detail-booking-depart">Départ au {offre.dateDebut}</p>
                )}
                {offre.dateDebut && offre.dateFin && (
                  <p className="offre-detail-booking-dates">
                    du {offre.dateDebut} au {offre.dateFin}
                  </p>
                )}
                {offre.departDe && (
                  <p className="offre-detail-booking-depart">de {offre.departDe}</p>
                )}
              </div>
              <Link to="/contact" className="offre-detail-booking-cta">
                Demander un devis
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/contact#rdv" className="offre-detail-booking-phone">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Prendre rendez-vous
              </Link>
              <p className="offre-detail-booking-note">
                Prix par personne, base double. Vols et assurances non inclus selon offre.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default OffreDetailPage;
