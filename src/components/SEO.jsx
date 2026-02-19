import React, { useEffect, useRef, useMemo } from "react";
import { SITE_NAME, TITLE_SUFFIX, getBaseUrl, DEFAULT_OG_IMAGE_PATH } from "../config/site";

/**
 * Gère titre, meta description, canonical, noindex, Open Graph, Twitter Card et données structurées (JSON-LD).
 * breadcrumbs: [{ label: "Accueil", path: "/" }, { label: "Destinations", path: "/destinations" }]
 */
const SEO = ({
  title,
  description,
  canonical: canonicalPath,
  noindex = false,
  jsonLd = [],
  breadcrumbs = [],
  ogImage,
  ogType = "website",
}) => {
  const jsonLdRef = useRef([]);

  const fullTitle = title ? (title.endsWith(SITE_NAME) ? title : `${title}${TITLE_SUFFIX}`) : SITE_NAME;
  const baseUrl = getBaseUrl();
  const canonical = canonicalPath ? `${baseUrl}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}` : null;

  const ogTitle = fullTitle;
  const ogDescription = description || "";
  const ogUrl = canonical || baseUrl;
  const absoluteOgImage = ogImage
    ? (ogImage.startsWith("http") ? ogImage : `${baseUrl.replace(/\/$/, "")}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`)
    : baseUrl
      ? `${baseUrl.replace(/\/$/, "")}${DEFAULT_OG_IMAGE_PATH}`
      : null;

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

    const setMeta = (attr, value, content) => {
      const selector = attr === "property" ? `meta[property="${value}"]` : `meta[name="${value}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (attr === "property") el.setAttribute("property", value);
        else el.setAttribute("name", value);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (baseUrl) {
      setMeta("property", "og:title", ogTitle);
      setMeta("property", "og:description", ogDescription);
      setMeta("property", "og:type", ogType);
      setMeta("property", "og:locale", "fr_FR");
      setMeta("property", "og:site_name", SITE_NAME);
      if (ogUrl) setMeta("property", "og:url", ogUrl);
      if (absoluteOgImage) setMeta("property", "og:image", absoluteOgImage);

      setMeta("name", "twitter:card", "summary_large_image");
      setMeta("name", "twitter:title", ogTitle);
      setMeta("name", "twitter:description", ogDescription);
      if (absoluteOgImage) setMeta("name", "twitter:image", absoluteOgImage);
    }
  }, [fullTitle, description, canonical, noindex, ogTitle, ogDescription, ogUrl, absoluteOgImage, ogType, baseUrl]);

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
