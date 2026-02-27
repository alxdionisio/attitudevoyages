import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

/**
 * Fil d'ariane accessible (nav + aria).
 * items: [{ label: "Accueil", path: "/" }, { label: "Page actuelle" }]
 * Le dernier item sans path est affiché en texte (page courante).
 */
const Breadcrumb = ({ items = [], centered = false }) => {
  if (!items.length) return null;

  return (
    <nav className={`breadcrumb${centered ? " breadcrumb--centered" : ""}`} aria-label="Fil d'Ariane">
      <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const href = item.path != null ? (item.path.startsWith("http") ? item.path : item.path) : null;

          const isInternal = href && !href.startsWith("http");
          return (
            <li
              key={index}
              className="breadcrumb-item"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast || !href ? (
                <span className="breadcrumb-current" itemProp="name" aria-current="page">
                  {item.label}
                </span>
              ) : isInternal ? (
                <Link to={href} className="breadcrumb-link" itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <a href={href} className="breadcrumb-link" itemProp="item" target="_blank" rel="noopener noreferrer">
                  <span itemProp="name">{item.label}</span>
                </a>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
