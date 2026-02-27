                                                                                                                                                                                  import React, { useMemo, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllTags,
  getAllDestinations,
  getTagCounts,
  getDestinationCounts,
  filterOffres,
} from "../data/offres";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import OffresFilters from "../components/OffresFilters";
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

const TAG_PARAM = "tag";
const DEST_PARAM = "destination";
const PAGE_PARAM = "page";

const DestinationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const tags = useMemo(() => ["Tous", ...getAllTags()], []);
  const destinations = useMemo(() => ["Toutes", ...getAllDestinations()], []);
  const tagCounts = useMemo(() => getTagCounts(), []);
  const destinationCounts = useMemo(() => getDestinationCounts(), []);
  const validTagsSet = useMemo(() => new Set(getAllTags()), []);
  const validDestinationsSet = useMemo(() => new Set(getAllDestinations()), []);

  const activeTags = useMemo(() => {
    const all = searchParams.getAll(TAG_PARAM);
    return all.filter((t) => validTagsSet.has(t));
  }, [searchParams, validTagsSet]);

  const activeDestinations = useMemo(() => {
    const all = searchParams.getAll(DEST_PARAM);
    return all.filter((d) => validDestinationsSet.has(d));
  }, [searchParams, validDestinationsSet]);

  const filteredOffres = useMemo(
    () => filterOffres({ tags: activeTags, destinations: activeDestinations }),
    [activeTags, activeDestinations]
  );

  const pageParam = searchParams.get(PAGE_PARAM);
  const rawPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const totalCount = filteredOffres.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(rawPage, totalPages);

  const displayedOffres = useMemo(
    () => filteredOffres.slice(0, page * PAGE_SIZE),
    [filteredOffres, page]
  );
  const hasMore = totalCount > page * PAGE_SIZE;
  const nextPage = page + 1;
  const allLoaded = !hasMore && displayedOffres.length > 0;

  const setPage = (p) => {
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete(PAGE_PARAM);
    else next.set(PAGE_PARAM, String(p));
    setSearchParams(next, { replace: true });
  };

  const setFilterTags = (newTags) => {
    const next = new URLSearchParams(searchParams);
    next.delete(TAG_PARAM);
    newTags.forEach((t) => next.append(TAG_PARAM, t));
    next.delete(PAGE_PARAM);
    setSearchParams(next, { replace: true });
  };

  const setFilterDestinations = (newDestinations) => {
    const next = new URLSearchParams(searchParams);
    next.delete(DEST_PARAM);
    newDestinations.forEach((d) => next.append(DEST_PARAM, d));
    next.delete(PAGE_PARAM);
    setSearchParams(next, { replace: true });
  };

  const clearAllFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete(TAG_PARAM);
    next.delete(DEST_PARAM);
    next.delete(PAGE_PARAM);
    setSearchParams(next, { replace: true });
  };

  const canonicalPath = useMemo(() => {
    const params = new URLSearchParams();
    activeTags.forEach((t) => params.append(TAG_PARAM, t));
    activeDestinations.forEach((d) => params.append(DEST_PARAM, d));
    if (page > 1) params.set(PAGE_PARAM, String(page));
    const qs = params.toString();
    return qs ? `/destinations?${qs}` : "/destinations";
  }, [activeTags, activeDestinations, page]);

  useEffect(() => {
    if (rawPage > totalPages && totalPages >= 1) {
      const next = new URLSearchParams(searchParams);
      if (totalPages <= 1) next.delete(PAGE_PARAM);
      else next.set(PAGE_PARAM, String(totalPages));
      setSearchParams(next, { replace: true });
    }
  }, [totalPages, rawPage, searchParams, setSearchParams]);

  useEffect(() => {
    document.querySelectorAll('link[rel="next"], link[rel="prev"]').forEach((el) => el.remove());
    const base = window.location.origin + window.location.pathname;
    if (page > 1) {
      const prevParams = new URLSearchParams(searchParams);
      if (page === 2) prevParams.delete(PAGE_PARAM);
      else prevParams.set(PAGE_PARAM, String(page - 1));
      const prevHref = prevParams.toString() ? `${base}?${prevParams}` : base;
      const prevLink = document.createElement("link");
      prevLink.rel = "prev";
      prevLink.href = prevHref;
      document.head.appendChild(prevLink);
    }
    if (hasMore) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set(PAGE_PARAM, String(nextPage));
      const nextLink = document.createElement("link");
      nextLink.rel = "next";
      nextLink.href = `${base}?${nextParams}`;
      document.head.appendChild(nextLink);
    }
    return () => document.querySelectorAll('link[rel="next"], link[rel="prev"]').forEach((el) => el.remove());
  }, [page, hasMore, nextPage, searchParams]);

  useEffect(() => {
    if (filtersModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersModalOpen]);

  useEffect(() => {
    if (!filtersModalOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") setFiltersModalOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [filtersModalOpen]);

  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="Destinations"
        description="Découvrez nos voyages d'exception : circuits, séjours sur mesure et destinations de rêve. Explorez le monde avec Attitude Voyages."
        canonical={canonicalPath}
        breadcrumbs={[{ label: "Accueil", path: "/" }, { label: "Destinations", path: "/destinations" }]}
      />
      <div className="page-container" style={{ paddingBottom: "6rem" }}>
        <Breadcrumb items={[{ label: "Accueil", path: "/" }, { label: "Destinations" }]} centered />
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

        <div className="destinations-layout">
          {/* Bouton Filtres : visible uniquement sur mobile, ouvre la modale */}
          <div className="destinations-filters-trigger-wrap">
            <button
              type="button"
              className="destinations-filters-trigger"
              onClick={() => setFiltersModalOpen(true)}
              aria-label="Ouvrir les filtres"
              aria-expanded={filtersModalOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Filtres</span>
              {(activeTags.length > 0 || activeDestinations.length > 0) && (
                <span className="destinations-filters-trigger-badge" aria-hidden="true">
                  {activeTags.length + activeDestinations.length}
                </span>
              )}
            </button>
          </div>

          <aside className="destinations-sidebar" aria-label="Filtres">
            <h2 className="destinations-sidebar__title">Filtres</h2>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <OffresFilters
                activeTags={activeTags}
                activeDestinations={activeDestinations}
                onTagsChange={setFilterTags}
                onDestinationsChange={setFilterDestinations}
                onClearAll={clearAllFilters}
                tags={tags}
                destinations={destinations}
                tagCounts={tagCounts}
                destinationCounts={destinationCounts}
                variant="sidebar"
              />
            </motion.div>
          </aside>

          <main className="destinations-main">
            {/* Barre résultats + filtres sélectionnés au-dessus de la grille (toujours affichée, même avec 0 résultat) */}
            <div className="destinations-results-bar">
              {activeTags.length > 0 || activeDestinations.length > 0 ? (
                <div className="offres-filters__active">
                  <span className="offres-filters__active-count" role="status">
                    {totalCount} {totalCount === 1 ? "offre" : "offres"}
                  </span>
                  <span className="offres-filters__active-label">Filtres :</span>
                  <div className="offres-filters__chips">
                    {activeTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="offres-filters__chip"
                        onClick={() => setFilterTags(activeTags.filter((t) => t !== tag))}
                        aria-label={`Retirer le filtre ${tag}`}
                      >
                        <span className="offres-filters__chip-text">{tag}</span>
                        <span className="offres-filters__chip-remove" aria-hidden="true">
                          ×
                        </span>
                      </button>
                    ))}
                    {activeDestinations.map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        className="offres-filters__chip"
                        onClick={() =>
                          setFilterDestinations(activeDestinations.filter((d) => d !== dest))
                        }
                        aria-label={`Retirer le filtre ${dest}`}
                      >
                        <span className="offres-filters__chip-text">{dest}</span>
                        <span className="offres-filters__chip-remove" aria-hidden="true">
                          ×
                        </span>
                      </button>
                    ))}
                    <button
                      type="button"
                      className="offres-filters__chip offres-filters__chip--clear"
                      onClick={clearAllFilters}
                      aria-label="Réinitialiser tous les filtres"
                    >
                      Tout effacer
                    </button>
                  </div>
                </div>
              ) : (
                <p className="offres-filters__results-only" role="status">
                  {totalCount} {totalCount === 1 ? "offre" : "offres"}
                </p>
              )}
            </div>

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
            className="destinations-no-results"
          >
            Aucune offre pour ce filtre.
          </motion.p>
        ) : null}
          </main>
        </div>

        {/* Modale filtres (mobile) */}
        <AnimatePresence>
          {filtersModalOpen && (
            <>
              <motion.div
                className="destinations-filters-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setFiltersModalOpen(false)}
                aria-label="Fermer les filtres"
              />
              <motion.div
                className="destinations-filters-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="destinations-filters-modal-title"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="destinations-filters-modal__header">
                  <h2 id="destinations-filters-modal-title" className="destinations-filters-modal__title">
                    Filtres
                  </h2>
                  <button
                    type="button"
                    className="destinations-filters-modal__close"
                    onClick={() => setFiltersModalOpen(false)}
                    aria-label="Fermer"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="destinations-filters-modal__body">
                  <OffresFilters
                    activeTags={activeTags}
                    activeDestinations={activeDestinations}
                    onTagsChange={setFilterTags}
                    onDestinationsChange={setFilterDestinations}
                    onClearAll={clearAllFilters}
                    tags={tags}
                    destinations={destinations}
                    tagCounts={tagCounts}
                    destinationCounts={destinationCounts}
                    variant="sidebar"
                  />
                </div>
                <div className="destinations-filters-modal__footer">
                  <button
                    type="button"
                    className="destinations-filters-modal__apply"
                    onClick={() => setFiltersModalOpen(false)}
                  >
                    Voir les résultats
                    {totalCount > 0 && (
                      <span className="destinations-filters-modal__apply-count">
                        ({totalCount})
                      </span>
                    )}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DestinationsPage;
