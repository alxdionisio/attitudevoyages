                                                                                                                                                                                  import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { offresData, getAllTags } from "../data/offres";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import "./Pages.css";

const PAGE_SIZE = 6;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

const DestinationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("Tous");
  const tags = useMemo(() => ["Tous", ...getAllTags()], []);

  const pageParam = searchParams.get("page");
  const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);

  const filteredOffres = useMemo(() => {
    if (filter === "Tous") return offresData;
    return offresData.filter((o) => o.tag === filter);
  }, [filter]);

  const displayedOffres = useMemo(
    () => filteredOffres.slice(0, page * PAGE_SIZE),
    [filteredOffres, page]
  );
  const totalCount = filteredOffres.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const hasMore = totalCount > page * PAGE_SIZE;
  const nextPage = page + 1;
  const allLoaded = !hasMore && displayedOffres.length > 0;

  const setPage = (p) => {
    if (p <= 1) {
      searchParams.delete("page");
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), page: String(p) }, { replace: true });
    }
  };


  const canonicalPath = page <= 1 ? "/destinations" : `/destinations?page=${page}`;

  useEffect(() => {
    document.querySelectorAll('link[rel="next"], link[rel="prev"]').forEach((el) => el.remove());
    const base = window.location.origin + window.location.pathname;
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      const prevParams = new URLSearchParams(searchParams);
      prevParams.set("page", String(page - 1));
      const prevLink = document.createElement("link");
      prevLink.rel = "prev";
      prevLink.href = page === 2 ? base : `${base}?${prevParams.toString()}`;
      document.head.appendChild(prevLink);
    }
    if (hasMore) {
      params.set("page", String(nextPage));
      const nextLink = document.createElement("link");
      nextLink.rel = "next";
      nextLink.href = `${base}?${params.toString()}`;
      document.head.appendChild(nextLink);
    }
    return () => document.querySelectorAll('link[rel="next"], link[rel="prev"]').forEach((el) => el.remove());
  }, [page, hasMore, nextPage, searchParams]);

  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="Destinations"
        description="Découvrez nos voyages d'exception : circuits, séjours sur mesure et destinations de rêve. Explorez le monde avec Attitude Voyages."
        canonical={canonicalPath}
        breadcrumbs={[{ label: "Accueil", path: "/" }, { label: "Destinations", path: "/destinations" }]}
      />
      <div className="page-container" style={{ paddingBottom: "6rem" }}>
        <Breadcrumb items={[{ label: "Accueil", path: "/" }, { label: "Destinations" }]} />
        <motion.header
          className="page-header"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="page-subtitle">Nos destinations</span>
          <h1 className="page-title">Explorez le Monde</h1>
          <p className="page-description">
            Découvrez notre sélection de voyages d'exception, conçus pour vous offrir des expériences uniques.
          </p>
        </motion.header>

        <motion.div
          className="destinations-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setFilter(tag);
                  setPage(1);
                }}
                className={`destinations-filter-btn ${filter === tag ? "destinations-filter-btn--active" : ""}`}
              >
                {tag}
              </button>
            ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {displayedOffres.length > 0 ? (
            <motion.div
              className="destinations-grid"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {displayedOffres.map((offre, index) => (
                <motion.article
                  key={offre.id}
                  variants={cardVariants}
                  custom={index}
                  className="destinations-card"
                >
                  <Link to={`/offre/${offre.slug}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                    <div className="destinations-card-image">
                      <img src={offre.image} alt={offre.title} />
                      <span className="destinations-card-tag">{offre.tag}</span>
                    </div>
                    <div className="destinations-card-body">
                      <h2 className="destinations-card-title">{offre.title}</h2>
                      <p className="destinations-card-destination">{offre.destination}</p>
                      <div className="destinations-card-highlights">
                        {offre.highlights.slice(0, 3).map((h) => (
                          <span key={h} className="destinations-card-highlight">
                            {h}
                          </span>
                        ))}
                      </div>
                      <div className="destinations-card-meta">
                        <span className="destinations-card-duration">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          {offre.duration}
                        </span>
                        <span className="destinations-card-price">
                          {offre.price === "Sur devis" ? offre.price : `À partir de ${offre.price}`}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="destinations-card-cta-wrap">
                    <Link to={`/offre/${offre.slug}`} className="destinations-card-cta">
                      Découvrir
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {displayedOffres.length > 0 && (
          <motion.div
            className="destinations-pagination-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {totalPages > 1 && (
              <nav className="destinations-pagination" aria-label="Pagination des offres">
                <ul className="destinations-pagination-list">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <li key={p}>
                      <button
                        type="button"
                        onClick={() => setPage(p)}
                        className={`destinations-pagination-btn ${p === page ? "destinations-pagination-btn--current" : ""}`}
                        aria-current={p === page ? "page" : undefined}
                        aria-label={`Page ${p}`}
                      >
                        {p}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {hasMore && (
              <div className="destinations-load-more">
                <button
                  type="button"
                  onClick={() => setPage(nextPage)}
                  className="destinations-load-more-btn"
                >
                  Afficher plus
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
            {allLoaded && (
              <p className="destinations-all-loaded" role="status">
                Toutes les offres sont chargées ({totalCount} {totalCount === 1 ? "offre" : "offres"}).
              </p>
            )}
          </motion.div>
        )}

        {filteredOffres.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", color: "#6b7280", padding: "4rem 0" }}
          >
            Aucune offre pour ce filtre.
          </motion.p>
        ) : null}
      </div>
    </div>
  );
};

export default DestinationsPage;
