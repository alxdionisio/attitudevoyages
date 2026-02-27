import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { offresData } from "../data/offres";
import "./Offres.css";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  }),
};

const Offres = () => {
  const offresToShow = offresData.slice(0, 6);

  return (
    <section className="offres" id="offres">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle">Nos destinations</span>
          <h2 className="section-title">Offres du moment</h2>
          <p className="section-description">
            Découvrez notre sélection de voyages exceptionnels,
            soigneusement préparés pour vous offrir des expériences uniques.
          </p>
        </motion.div>

        <div className="offres-grid">
          {offresToShow.map((offre, index) => (
            <motion.article
              key={offre.id}
              className="offre-card"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <Link to={`/offre/${offre.slug}`} className="offre-card-link">
                <div className="offre-image-wrapper">
                  <img src={offre.image} alt={offre.title} className="offre-image" />
                  <span className="offre-tag">{offre.tag}</span>
                </div>

                <div className="offre-content">
                  <div className="offre-header">
                    <h3 className="offre-title">{offre.title}</h3>
                    <span className="offre-destination">{offre.destination}</span>
                  </div>

                  <div className="offre-highlights">
                    {offre.highlights.map((highlight, idx) => (
                      <span key={idx} className="highlight-badge">
                        {highlight}
                      </span>
                    ))}
                  </div>

                    <div className="offre-footer">
                    <div className="offre-info offre-info--duration">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span>{offre.duration}</span>
                    </div>
                    <div className="offre-price">
                      {offre.price !== "Sur devis" && <span className="price-label">À partir de</span>}
                      <span className="price-value">{offre.price}</span>
                    </div>
                  </div>

                  <span className="offre-btn">
                    Découvrir
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="offres-voir-toutes"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/destinations" className="offres-voir-toutes-btn">
            Voir toutes nos offres
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          className="offres-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p>Vous avez un projet de voyage en tête ?</p>
          <Link to="/contact" className="btn-primary">
            Parlons-en ensemble
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Offres;
