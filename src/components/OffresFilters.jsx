import React, { useState } from "react";
import "./OffresFilters.css";

/**
 * Filtres offres : sélection multiple par type (tags) et destination.
 * En variant sidebar : dropdown par catégorie + pills pleine largeur.
 */
const OffresFilters = ({
  activeTags = [],
  activeDestinations = [],
  onTagsChange,
  onDestinationsChange,
  onClearAll,
  tags = [],
  destinations = [],
  tagCounts = {},
  destinationCounts = {},
  showCounts = false,
  showActiveChips = true,
  resultsCount = null,
  variant = "default",
  className = "",
}) => {
  const [openType, setOpenType] = useState(true);
  const [openDest, setOpenDest] = useState(true);

  const hasActiveFilters =
    (Array.isArray(activeTags) && activeTags.length > 0) ||
    (Array.isArray(activeDestinations) && activeDestinations.length > 0);

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    } else {
      onTagsChange?.([]);
      onDestinationsChange?.([]);
    }
  };

  const toggleTag = (tag) => {
    if (tag === "Tous") {
      onTagsChange?.([]);
      return;
    }
    const next = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag];
    onTagsChange?.(next);
  };

  const toggleDestination = (dest) => {
    if (dest === "Toutes") {
      onDestinationsChange?.([]);
      return;
    }
    const next = activeDestinations.includes(dest)
      ? activeDestinations.filter((d) => d !== dest)
      : [...activeDestinations, dest];
    onDestinationsChange?.(next);
  };

  const removeTag = (tag) => onTagsChange?.(activeTags.filter((t) => t !== tag));
  const removeDestination = (dest) =>
    onDestinationsChange?.(activeDestinations.filter((d) => d !== dest));

  const tagsList = Array.isArray(tags) ? tags : [];
  const destList = Array.isArray(destinations) ? destinations : [];
  const selectedTags = Array.isArray(activeTags) ? activeTags : [];
  const selectedDests = Array.isArray(activeDestinations) ? activeDestinations : [];

  return (
    <div
      className={`offres-filters ${variant === "sidebar" ? "offres-filters--sidebar" : ""} ${className}`.trim()}
      role="group"
      aria-label="Filtrer les offres"
    >
      {/* Catégorie Type de voyage */}
      <div className="offres-filters__group">
        <button
          type="button"
          className={`offres-filters__dropdown-trigger ${variant === "sidebar" && openType ? "offres-filters__dropdown-trigger--open" : ""}`}
          onClick={() => variant === "sidebar" && setOpenType((v) => !v)}
          aria-expanded={variant !== "sidebar" || openType}
          aria-controls="offres-filters-type-panel"
          id="offres-filters-type-label"
        >
          <span className="offres-filters__label">Type de voyage</span>
          {variant === "sidebar" && (
            <span className="offres-filters__dropdown-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          )}
        </button>
        <div
          id="offres-filters-type-panel"
          className="offres-filters__dropdown-panel"
          hidden={variant === "sidebar" && !openType}
          aria-labelledby="offres-filters-type-label"
        >
          <div className="offres-filters__pills">
            {tagsList.map((tag) => {
              const isActive = tag === "Tous" ? selectedTags.length === 0 : selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`offres-filters__pill ${isActive ? "offres-filters__pill--active" : ""}`}
                  aria-pressed={isActive}
                  aria-label={tag}
                >
                  <span className="offres-filters__pill-label">{tag}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Catégorie Destination */}
      <div className="offres-filters__group">
        <button
          type="button"
          className={`offres-filters__dropdown-trigger ${variant === "sidebar" && openDest ? "offres-filters__dropdown-trigger--open" : ""}`}
          onClick={() => variant === "sidebar" && setOpenDest((v) => !v)}
          aria-expanded={variant !== "sidebar" || openDest}
          aria-controls="offres-filters-dest-panel"
          id="offres-filters-dest-label"
        >
          <span className="offres-filters__label">Destination</span>
          {variant === "sidebar" && (
            <span className="offres-filters__dropdown-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          )}
        </button>
        <div
          id="offres-filters-dest-panel"
          className="offres-filters__dropdown-panel"
          hidden={variant === "sidebar" && !openDest}
          aria-labelledby="offres-filters-dest-label"
        >
          <div className="offres-filters__pills">
            {destList.map((dest) => {
              const isActive =
                dest === "Toutes" ? selectedDests.length === 0 : selectedDests.includes(dest);
              return (
                <button
                  key={dest}
                  type="button"
                  onClick={() => toggleDestination(dest)}
                  className={`offres-filters__pill ${isActive ? "offres-filters__pill--active" : ""}`}
                  aria-pressed={isActive}
                  aria-label={dest}
                >
                  <span className="offres-filters__pill-label">{dest}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filtres actifs + compteur : affichés dans la barre latérale uniquement en variant default (pas en sidebar) */}
      {variant !== "sidebar" && showActiveChips && hasActiveFilters && (
        <div className="offres-filters__active">
          {resultsCount != null && (
            <span className="offres-filters__active-count" role="status">
              {resultsCount} {resultsCount === 1 ? "offre" : "offres"}
            </span>
          )}
          <span className="offres-filters__active-label">Filtres :</span>
          <div className="offres-filters__chips">
            {selectedTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="offres-filters__chip"
                onClick={() => removeTag(tag)}
                aria-label={`Retirer le filtre ${tag}`}
              >
                <span className="offres-filters__chip-text">{tag}</span>
                <span className="offres-filters__chip-remove" aria-hidden="true">
                  ×
                </span>
              </button>
            ))}
            {selectedDests.map((dest) => (
              <button
                key={dest}
                type="button"
                className="offres-filters__chip"
                onClick={() => removeDestination(dest)}
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
              onClick={handleClearAll}
              aria-label="Réinitialiser tous les filtres"
            >
              Tout effacer
            </button>
          </div>
        </div>
      )}

      {variant !== "sidebar" && showActiveChips && !hasActiveFilters && resultsCount != null && (
        <p className="offres-filters__results-only" role="status">
          {resultsCount} {resultsCount === 1 ? "offre" : "offres"}
        </p>
      )}
    </div>
  );
};

export default OffresFilters;
