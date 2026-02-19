import React, { useEffect, useRef, useMemo } from "react";
import { SITE_NAME, TITLE_SUFFIX, getBaseUrl } from "../config/site";

/**
 * Gère titre, meta description, canonical, noindex et données structurées (JSON-LD).
 * breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Destinations", path: "/destinations" }]
 */
const SEO = ({
  title,
  description,
  canonical: canonicalPath,
  noindex = false,
  jsonLd = [],
  breadcrumbs = [],
}) => {
  const jsonLdRef = useRef([]);

  const fullTitle = title ? (title.endsWith(SITE_NAME) ? title : `${title}${TITLE_SUFFIX}`) : SITE_NAME;
  const baseUrl = getBaseUrl();
  const canonical = canonicalPath ? `${baseUrl}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}` : null;

  useEffect(() => {
    document.title = fullTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || "";

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.rel = "canonical";
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;
    } else if (linkCanonical) {
      linkCanonical.remove();
    }

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!metaRobots) {
        metaRobots = document.createElement("meta");
        metaRobots.name = "robots";
        document.head.appendChild(metaRobots);
      }
      metaRobots.content = "noindex, nofollow";
    } else if (metaRobots) {
      metaRobots.remove();
    }

    return () => {
      // Optionnel : ne pas réinitialiser au démontage pour éviter flash
    };
  }, [fullTitle, description, canonical, noindex]);

  // BreadcrumbList JSON-LD
  const breadcrumbLd = useMemo(() => {
    if (breadcrumbs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: item.path ? `${baseUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}` : undefined,
      })),
    };
  }, [breadcrumbs, baseUrl]);

  const allJsonLd = useMemo(
    () => [breadcrumbLd, ...jsonLd].filter(Boolean),
    [breadcrumbLd, jsonLd]
  );
  const jsonLdKey = useMemo(() => JSON.stringify(allJsonLd), [allJsonLd]);

  useEffect(() => {
    jsonLdRef.current.forEach((s) => s.remove());
    jsonLdRef.current = [];

    allJsonLd.forEach((data) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      jsonLdRef.current.push(script);
    });

    return () => {
      jsonLdRef.current.forEach((s) => s.remove());
      jsonLdRef.current = [];
    };
  }, [jsonLdKey]);

  return null;
};

export default SEO;
